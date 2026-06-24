import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addGalleryPhotos,
  removeGalleryPhoto,
  setProfilePhoto,
} from '../../redux/slices/profileSlice'
import {
  useUploadGalleryMutation,
  useUploadProfilePhotoMutation,
} from '../../services/api'

export default function PhotosForm() {
  const dispatch = useDispatch()
  const photos = useSelector((s) => s.profile.profileData.photos)
  const profileInputRef = useRef(null)
  const galleryInputRef = useRef(null)
  const [error, setError] = useState('')

  const [uploadProfilePhoto, { isLoading: uploadingProfile }] =
    useUploadProfilePhotoMutation()
  const [uploadGallery, { isLoading: uploadingGallery }] =
    useUploadGalleryMutation()

  const handleProfileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    try {
      const formData = new FormData()
      formData.append('image', file)
      const res = await uploadProfilePhoto(formData).unwrap()
      dispatch(setProfilePhoto(res.url))
    } catch {
      setError(
        'Could not upload the profile photo. Make sure the server and Cloudinary are configured.',
      )
    } finally {
      if (profileInputRef.current) profileInputRef.current.value = ''
    }
  }

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setError('')
    try {
      const formData = new FormData()
      files.forEach((f) => formData.append('images', f))
      const res = await uploadGallery(formData).unwrap()
      dispatch(addGalleryPhotos(res.urls || []))
    } catch {
      setError('Could not upload gallery photos. Please try again.')
    } finally {
      if (galleryInputRef.current) galleryInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile photo */}
      <div>
        <h4 className="mb-2 text-sm font-medium text-gray-700">Profile Photo</h4>
        <div className="flex items-center gap-4">
          {photos.profilePhoto ? (
            <img
              src={photos.profilePhoto}
              alt="Profile"
              className="h-24 w-24 rounded-xl object-cover ring-1 ring-gray-200"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-gray-100 text-xs text-gray-400">
              No photo
            </div>
          )}
          <div className="space-y-2">
            <input
              ref={profileInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfileUpload}
              className="hidden"
              id="profilePhotoInput"
            />
            <label
              htmlFor="profilePhotoInput"
              className="inline-flex cursor-pointer items-center rounded-lg border border-brand-300 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-100"
            >
              {uploadingProfile ? 'Uploading…' : 'Upload photo'}
            </label>
            {photos.profilePhoto && (
              <button
                type="button"
                onClick={() => dispatch(setProfilePhoto(''))}
                className="ml-2 text-sm text-gray-500 hover:text-gray-700"
              >
                Remove
              </button>
            )}
            <p className="text-xs text-gray-400">JPG or PNG, up to ~5MB.</p>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div>
        <h4 className="mb-2 text-sm font-medium text-gray-700">
          Gallery Photos
        </h4>
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryUpload}
          className="hidden"
          id="galleryInput"
        />
        <label
          htmlFor="galleryInput"
          className="inline-flex cursor-pointer items-center rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
        >
          {uploadingGallery ? 'Uploading…' : '+ Add gallery photos'}
        </label>

        {photos.gallery?.length > 0 && (
          <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {photos.gallery.map((src, i) => (
              <div key={i} className="group relative">
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="aspect-square w-full rounded-lg object-cover ring-1 ring-gray-200"
                />
                <button
                  type="button"
                  onClick={() => dispatch(removeGalleryPhoto(i))}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-xs text-white opacity-0 transition group-hover:opacity-100"
                  aria-label="Remove photo"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
