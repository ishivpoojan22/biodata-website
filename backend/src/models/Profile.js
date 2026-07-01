import mongoose from 'mongoose'

const { Schema } = mongoose

// Sub-schemas mirror the frontend profileData sections. `_id: false` keeps the
// stored documents clean (no nested ids).
const basicInfoSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    gender: String,
    dateOfBirth: String,
    height: String,
    religion: String,
    caste: String,
    motherTongue: String,
    diet: String,
    city: String,
    state: String,
    country: String,
    // Astrological details (optional)
    rashi: String,
    nakshatra: String,
    gotra: String,
    manglik: String,
  },
  { _id: false },
)

const educationSchema = new Schema(
  {
    education: String,
    college: String,
    occupation: String,
    company: String,
    annualIncome: String,
  },
  { _id: false },
)

const familySchema = new Schema(
  {
    fatherName: String,
    fatherOccupation: String,
    motherName: String,
    motherOccupation: String,
    siblings: String,
    familyType: String,
    familyStatus: String,
    familyValues: String,
    about: String,
  },
  { _id: false },
)

const aboutMeSchema = new Schema(
  {
    headline: String,
    tagline: String,
    bio: String,
    lifeStory: String,
    hobbies: String,
    lifestyle: String,
    interests: String,
  },
  { _id: false },
)

const partnerSchema = new Schema(
  {
    preferredAge: String,
    preferredEducation: String,
    preferredOccupation: String,
    preferredLocation: String,
  },
  { _id: false },
)

const contactSchema = new Schema(
  {
    email: String,
    phone: String,
    whatsapp: String,
  },
  { _id: false },
)

const photosSchema = new Schema(
  {
    profilePhoto: { type: String, default: '' },
    gallery: { type: [String], default: [] },
  },
  { _id: false },
)

const profileSchema = new Schema(
  {
    // Which frontend template renders this profile. Data stays template-agnostic.
    templateId: { type: String, default: 'classic' },

    // Public, unique, URL-friendly identifier (e.g. shiv-poojan-pal).
    slug: { type: String, required: true, unique: true, index: true },

    basicInfo: { type: basicInfoSchema, default: () => ({}) },
    education: { type: educationSchema, default: () => ({}) },
    family: { type: familySchema, default: () => ({}) },
    aboutMe: { type: aboutMeSchema, default: () => ({}) },
    partner: { type: partnerSchema, default: () => ({}) },
    contact: { type: contactSchema, default: () => ({}) },
    photos: { type: photosSchema, default: () => ({}) },
  },
  { timestamps: true },
)

export const Profile = mongoose.model('Profile', profileSchema)
