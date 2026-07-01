import { createSlice } from '@reduxjs/toolkit'

/**
 * The empty profile shape. Templates and data are completely decoupled:
 * any template renders from this single object, and the user enters
 * information only once.
 */
export const emptyProfileData = {
  basicInfo: {
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    height: '',
    religion: '',
    caste: '',
    motherTongue: '',
    diet: '',
    city: '',
    state: '',
    country: '',
    // Astrological details (optional)
    rashi: '',
    nakshatra: '',
    gotra: '',
    manglik: '',
  },
  education: {
    education: '',
    college: '',
    occupation: '',
    company: '',
    annualIncome: '',
  },
  family: {
    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    siblings: '',
    familyType: '',
    familyStatus: '',
    familyValues: '',
    about: '',
  },
  aboutMe: {
    headline: '',
    tagline: '',
    bio: '',
    lifeStory: '',
    hobbies: '',
    lifestyle: '',
    interests: '',
  },
  partner: {
    preferredAge: '',
    preferredEducation: '',
    preferredOccupation: '',
    preferredLocation: '',
  },
  contact: {
    email: '',
    phone: '',
    whatsapp: '',
  },
  photos: {
    profilePhoto: '',
    gallery: [],
  },
}

const initialState = {
  // The id/slug of a saved profile, used for edit + share flows.
  profileId: null,
  slug: null,
  profileData: structuredClone(emptyProfileData),
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    /** Update a single field in a section: { section, field, value } */
    updateField: (state, action) => {
      const { section, field, value } = action.payload
      if (!state.profileData[section]) state.profileData[section] = {}
      state.profileData[section][field] = value
    },

    /** Merge a whole section at once: { section, data } */
    updateSection: (state, action) => {
      const { section, data } = action.payload
      state.profileData[section] = {
        ...state.profileData[section],
        ...data,
      }
    },

    /** Replace the entire profileData object (e.g. when loading for edit). */
    setProfileData: (state, action) => {
      state.profileData = {
        ...structuredClone(emptyProfileData),
        ...action.payload,
      }
    },

    setProfilePhoto: (state, action) => {
      state.profileData.photos.profilePhoto = action.payload
    },

    setGallery: (state, action) => {
      state.profileData.photos.gallery = action.payload
    },

    addGalleryPhotos: (state, action) => {
      const incoming = Array.isArray(action.payload)
        ? action.payload
        : [action.payload]
      state.profileData.photos.gallery = [
        ...state.profileData.photos.gallery,
        ...incoming,
      ]
    },

    removeGalleryPhoto: (state, action) => {
      state.profileData.photos.gallery =
        state.profileData.photos.gallery.filter((_, i) => i !== action.payload)
    },

    /** Store metadata after a successful save. */
    setSavedProfile: (state, action) => {
      state.profileId = action.payload.id ?? action.payload._id ?? null
      state.slug = action.payload.slug ?? null
    },

    /** Reset everything back to a blank profile. */
    resetProfile: () => structuredClone(initialState),
  },
})

export const {
  updateField,
  updateSection,
  setProfileData,
  setProfilePhoto,
  setGallery,
  addGalleryPhotos,
  removeGalleryPhoto,
  setSavedProfile,
  resetProfile,
} = profileSlice.actions

export default profileSlice.reducer
