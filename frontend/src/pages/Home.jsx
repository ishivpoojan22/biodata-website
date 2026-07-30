import Button from '../components/ui/Button'
import ProfileSite from '../components/profile/ProfileSite'
import { sampleProfile } from '../templates/sampleProfile'

const steps = [
  {
    title: 'Choose a Design',
    desc: 'Browse our collection of traditional and modern Indian wedding templates.',
    icon: '✨',
  },
  {
    title: 'Add Details',
    desc: 'Enter family details, kundali, and personal information just once.',
    icon: '📝',
  },
  {
    title: 'Share with Families',
    desc: 'Instantly share a beautiful, respectful biodata link with matches.',
    icon: '💌',
  },
]

const features = [
  'Elegant Golden motifs',
  'Kundali & Family details',
  'Private & secure sharing',
  'Save as PDF or Web Link',
  'Multiple premium themes',
  'Mobile friendly & responsive',
]

export default function Home() {
  return (
    <div className="font-sans text-stone-800 bg-[#FAFAF8]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] to-[#F3F0E6]">
        {/* Subtle decorative background elements */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #B8860B 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-amber-200/20 blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-yellow-100/30 blur-3xl"></div>

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:py-32 lg:grid-cols-2 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-medium text-amber-800 shadow-sm">
              <span className="text-amber-500">✤</span> Shubh Vivah
            </div>
            <h1 className="mt-6 font-serif text-5xl font-bold leading-tight sm:text-6xl text-stone-900">
              Create a <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700">Premium</span> Marriage Biodata
            </h1>
            <p className="mt-6 text-lg text-stone-600 leading-relaxed">
              Respect tradition while embracing the modern way to find your life partner. Choose an elegant design, add your family and astrological details, and share instantly.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button to="/templates" size="lg" className="!bg-gradient-to-r !from-amber-600 !to-yellow-500 !text-white hover:!from-amber-700 hover:!to-yellow-600 !border-none shadow-lg shadow-amber-500/20 font-semibold px-8" variant="ghost">
                View Templates
              </Button>
              <Button to="/create" size="lg" variant="ghost" className="border !border-amber-200 !bg-white !text-stone-700 hover:!bg-amber-50 hover:!text-amber-800 shadow-sm px-8">
                Create Biodata
              </Button>
            </div>
          </div>

          <div className="relative lg:ml-auto">
            {/* Elegant frame effect */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-amber-200 via-yellow-100 to-amber-300 opacity-60 blur-lg"></div>
            <div className="relative mx-auto max-w-sm rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-amber-200/50">
              <div className="h-[460px] overflow-hidden rounded-xl border border-stone-100 bg-stone-50">
                <div className="pointer-events-none h-[200%] w-[200%] origin-top-left scale-50">
                  <ProfileSite
                    data={sampleProfile}
                    templateId="classic"
                    initialMode="light"
                    embedded
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Elegant bottom border */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-50"></div>
      </section>

      {/* How it works */}
      <section className="relative mx-auto max-w-7xl px-4 py-24">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl flex items-center justify-center gap-3">
            Simple Process
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-stone-500">
            Create your traditional biodata in just a few minutes.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3 relative">
          <div className="hidden sm:block absolute top-10 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-amber-200 to-transparent"></div>

          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative z-10 rounded-2xl border border-stone-100 bg-white p-8 text-center shadow-md shadow-stone-200/40 transition-transform hover:-translate-y-1"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-50 to-[#FFFDF9] border border-amber-100 text-4xl shadow-inner text-amber-600">
                {s.icon}
              </div>
              <h3 className="mt-6 font-serif text-xl font-bold text-stone-900">
                {s.title}
              </h3>
              <p className="mt-3 text-stone-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-24 border-y border-stone-100">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl flex justify-center items-center gap-2">
               Everything You Need
            </h2>
            <div className="mt-4 flex justify-center">
              <div className="w-16 h-1 rounded-full bg-amber-400 opacity-60"></div>
            </div>
          </div>
          
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f}
                className="flex items-center gap-4 rounded-xl border border-stone-100 bg-[#FAFAF8] px-6 py-4 shadow-sm hover:border-amber-200 hover:shadow-md transition-all group"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <span className="text-sm font-bold">✓</span>
                </div>
                <span className="font-medium text-stone-700">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-5xl px-4 py-24 text-center">
        <div className="relative z-10 rounded-3xl bg-gradient-to-b from-[#FFFDF9] to-[#F3F0E6] px-6 py-16 shadow-xl border border-amber-200/50 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #B8860B 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
          <div className="relative mx-auto max-w-2xl z-20">
            <h2 className="font-serif text-4xl font-bold text-stone-900">
              Begin Your Journey Today
            </h2>
            <p className="mt-4 text-lg text-stone-600">
              Join thousands of families who have found their perfect match using our beautiful biodata templates.
            </p>
            <div className="mt-10 flex justify-center">
              <Button to="/templates" size="lg" className="!bg-gradient-to-r !from-amber-600 !to-yellow-500 !text-white hover:!from-amber-700 hover:!to-yellow-600 !border-none shadow-lg shadow-amber-500/20 font-bold px-8" variant="ghost">
                Create Biodata Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
