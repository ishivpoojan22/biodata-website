import { TextAreaField, TextField } from '../ui/FormField'
import { useSection } from './useSection'

export default function AboutMeForm() {
  const { data, set } = useSection('aboutMe')

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          id="headline"
          label="Headline / Title"
          value={data.headline}
          onChange={set('headline')}
          placeholder="Software Engineer"
        />
        <TextField
          id="tagline"
          label="Tagline"
          value={data.tagline}
          onChange={set('tagline')}
          placeholder="Grounded in values. Ambitious in dreams."
        />
      </div>
      <TextAreaField
        id="bio"
        label="Bio"
        value={data.bio}
        onChange={set('bio')}
        rows={4}
        placeholder="A few lines about yourself, your values and what you're looking for."
      />
      <TextAreaField
        id="lifeStory"
        label="My Journey / Life Story"
        value={data.lifeStory}
        onChange={set('lifeStory')}
        rows={6}
        placeholder="Where you were born, your schooling and college, the values you grew up with — write it as a short story so readers get to know you."
        hint="This longer narrative appears on the About page so families can read your full background."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          id="hobbies"
          label="Hobbies"
          value={data.hobbies}
          onChange={set('hobbies')}
          placeholder="Reading, Travelling, Cooking"
        />
        <TextField
          id="interests"
          label="Interests"
          value={data.interests}
          onChange={set('interests')}
          placeholder="Music, Sports, Art"
        />
      </div>
      <TextField
        id="lifestyle"
        label="Lifestyle"
        value={data.lifestyle}
        onChange={set('lifestyle')}
        placeholder="Vegetarian, Non-smoker, Fitness enthusiast"
      />
    </div>
  )
}
