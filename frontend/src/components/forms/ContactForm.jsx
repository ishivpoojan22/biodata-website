import { TextField } from '../ui/FormField'
import { useSection } from './useSection'

export default function ContactForm() {
  const { data, set } = useSection('contact')

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <TextField
        id="email"
        label="Email"
        type="email"
        value={data.email}
        onChange={set('email')}
        placeholder="you@example.com"
      />
      <TextField
        id="phone"
        label="Phone"
        type="tel"
        value={data.phone}
        onChange={set('phone')}
        placeholder="+91 98765 43210"
      />
      <TextField
        id="whatsapp"
        label="WhatsApp Number"
        type="tel"
        value={data.whatsapp}
        onChange={set('whatsapp')}
        placeholder="+91 98765 43210"
      />
    </div>
  )
}
