import ClassicSite from '../../templates/sites/ClassicSite'
import ModernSite from '../../templates/sites/ModernSite'
import ElegantSite from '../../templates/sites/ElegantSite'
import RoyalTemplate from '../../templates/pages/RoyalTemplate'
import MinimalTemplate from '../../templates/pages/MinimalTemplate'
import FloralTemplate from '../../templates/pages/FloralTemplate'
import PrintableBiodata from './PrintableBiodata'

/**
 * Dispatcher for the biodata output. Routes the template id to either:
 *   - A multi-page personal website (type: "website")
 *   - A single-page printable biodata (type: "template")
 *
 * Both types share a clean PrintableBiodata for Download PDF / print.
 *
 * `azure` and `noir` reuse the Classic layout; their accent colour is resolved
 * from the template id via theme.js, so they look identical to Classic Gold
 * except for the highlight colour.
 */
const SITES = {
  classic: ClassicSite,
  modern: ModernSite,
  elegant: ElegantSite,
  azure: ClassicSite,
  noir: ClassicSite,
}

const PAGES = {
  royal: RoyalTemplate,
  minimal: MinimalTemplate,
  floral: FloralTemplate,
}

export default function ProfileSite({
  data = {},
  templateId = 'classic',
  initialMode = 'dark',
  embedded = false,
}) {
  const isSite = Boolean(SITES[templateId])
  const isPage = Boolean(PAGES[templateId])

  // Website-type: full multi-page site
  if (isSite) {
    const Site = SITES[templateId]
    return (
      <>
        <div className="print:hidden">
          <Site
            data={data}
            templateId={templateId}
            initialMode={initialMode}
            embedded={embedded}
          />
        </div>
        <div className="hidden print:block">
          <PrintableBiodata data={data} />
        </div>
      </>
    )
  }

  // Page-template type: single-page document (is its own print output)
  if (isPage) {
    const Page = PAGES[templateId]
    return <Page data={data} />
  }

  // Fallback to classic website
  return (
    <>
      <div className="print:hidden">
        <ClassicSite
          data={data}
          templateId="classic"
          initialMode={initialMode}
          embedded={embedded}
        />
      </div>
      <div className="hidden print:block">
        <PrintableBiodata data={data} />
      </div>
    </>
  )
}
