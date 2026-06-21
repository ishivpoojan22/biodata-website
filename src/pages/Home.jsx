import Button from '../components/ui/Button'
import ProfileSite from '../components/profile/ProfileSite'
import { sampleProfile } from '../templates/sampleProfile'

const steps = [
  {
    title: 'Pick a template',
    desc: 'Browse beautiful, ready-made biodata designs and choose your favourite.',
    icon: '🎨',
  },
  {
    title: 'Fill your details',
    desc: 'Enter your information once. It works with every template instantly.',
    icon: '📝',
  },
  {
    title: 'Share your link',
    desc: 'Save your biodata and get a clean public link to share with anyone.',
    icon: '🔗',
  },
]

const features = [
  'Multiple elegant templates',
  'Live real-time preview',
  'Profile & gallery photos',
  'Public shareable link',
  'Edit anytime',
  'Mobile friendly',
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:py-24 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700">
              Marriage Biodata Builder
            </span>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              Create a beautiful marriage biodata in minutes
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Pick a template, fill in your details once, preview it live, and
              share a clean public profile link with families and matches.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/templates" size="lg">
                Browse Templates
              </Button>
              <Button to="/create" size="lg" variant="secondary">
                Start Building
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="mx-auto max-w-sm rounded-2xl bg-neutral-950 p-2 shadow-2xl ring-1 ring-neutral-800">
              <div className="h-[420px] overflow-hidden rounded-xl">
                <div className="pointer-events-none h-[200%] w-[200%] origin-top-left scale-50">
                  <ProfileSite
                    data={sampleProfile}
                    templateId="classic"
                    initialMode="dark"
                    embedded
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center font-serif text-3xl font-bold text-gray-900">
          How it works
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-gray-500">
          Three simple steps from blank page to a shareable biodata.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-2xl">
                {s.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {i + 1}. {s.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-serif text-3xl font-bold text-gray-900">
            Everything you need
          </h2>
          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3">
            {features.map((f) => (
              <div
                key={f}
                className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm"
              >
                <span className="text-brand-600">✓</span>
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h2 className="font-serif text-3xl font-bold text-gray-900">
          Ready to build your biodata?
        </h2>
        <p className="mt-3 text-gray-600">
          It is free, fast, and you can edit it anytime.
        </p>
        <div className="mt-6">
          <Button to="/templates" size="lg">
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  )
}
