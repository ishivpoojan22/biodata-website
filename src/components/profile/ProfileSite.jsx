import ClassicSite from '../../templates/sites/ClassicSite'
import ModernSite from '../../templates/sites/ModernSite'
import ElegantSite from '../../templates/sites/ElegantSite'
import PrintableBiodata from './PrintableBiodata'

/**
 * Dispatcher for the biodata website. Each template id maps to a structurally
 * distinct multi-page site design (different layout, navigation and colours):
 *   - classic → dark, centered, top + floating bottom nav (gold)
 *   - modern  → light app dashboard with a left sidebar (rose)
 *   - elegant → cream editorial / magazine with numbered sections (emerald)
 *
 * A single, clean PrintableBiodata document is shared by all themes for the
 * Download PDF / print output.
 */
const SITES = {
  classic: ClassicSite,
  modern: ModernSite,
  elegant: ElegantSite,
}

export default function ProfileSite({
  data = {},
  templateId = 'classic',
  initialMode = 'dark',
  embedded = false,
}) {
  const Site = SITES[templateId] || ClassicSite

  return (
    <>
      {/* On-screen site (hidden when printing) */}
      <div className="print:hidden">
        <Site
          data={data}
          templateId={templateId}
          initialMode={initialMode}
          embedded={embedded}
        />
      </div>

      {/* Clean print / PDF document (shown only when printing) */}
      <div className="hidden print:block">
        <PrintableBiodata data={data} />
      </div>
    </>
  )
}
