import BasicInfoForm from './BasicInfoForm'
import EducationForm from './EducationForm'
import FamilyForm from './FamilyForm'
import AboutMeForm from './AboutMeForm'
import PartnerForm from './PartnerForm'
import ContactForm from './ContactForm'
import PhotosForm from './PhotosForm'

/**
 * Ordered profile sections used to drive the multi-step Create Profile flow.
 * `key` matches the profileData section keys in the Redux store.
 */
export const FORM_SECTIONS = [
  {
    key: 'basicInfo',
    title: 'Basic Information',
    description: 'Tell us the essentials about you.',
    Component: BasicInfoForm,
  },
  {
    key: 'education',
    title: 'Education & Career',
    description: 'Your academic and professional background.',
    Component: EducationForm,
  },
  {
    key: 'family',
    title: 'Family Information',
    description: 'A little about your family.',
    Component: FamilyForm,
  },
  {
    key: 'aboutMe',
    title: 'About Me',
    description: 'Share your personality and interests.',
    Component: AboutMeForm,
  },
  {
    key: 'partner',
    title: 'Partner Preferences',
    description: 'What you are looking for in a partner.',
    Component: PartnerForm,
  },
  {
    key: 'contact',
    title: 'Contact',
    description: 'How interested families can reach you.',
    Component: ContactForm,
  },
  {
    key: 'photos',
    title: 'Photos',
    description: 'Add a profile photo and a few gallery images.',
    Component: PhotosForm,
  },
]

export {
  BasicInfoForm,
  EducationForm,
  FamilyForm,
  AboutMeForm,
  PartnerForm,
  ContactForm,
  PhotosForm,
}
