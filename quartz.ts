import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import NavLinks from "./quartz/components/NavLinks"

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout({
  defaults: {
    header: [NavLinks()],
  },
})
