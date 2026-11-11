import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, SimpleSlug, resolveRelative } from "../util/path"
import { pathToRoot } from "../util/path"

interface Options {
  links: Record<string, string>
}

const defaultOptions: Options = {
  links: {
    Blogs: "blogs",
  },
}

export default ((userOpts?: Partial<Options>) => {
  const opts: Options = { ...defaultOptions, ...userOpts }

  const NavLinks: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
    const title = cfg.pageTitle
    const home = pathToRoot(fileData.slug!)

    return (
      <nav class={`site-nav ${displayClass ?? ""}`}>
        <a href={home} class="site-nav-title">
          {title}
        </a>
        <ul class="site-nav-links">
          {Object.entries(opts.links).map(([text, link]) => {
            const href = link.startsWith("http")
              ? link
              : resolveRelative(fileData.slug!, link as SimpleSlug)
            return (
              <li>
                <a href={href} class="internal" data-slug={link as FullSlug}>
                  {text}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }

  NavLinks.css = `
.site-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
}

.site-nav-title {
  position: absolute;
  left: 0;
  font-family: var(--titleFont);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--dark);
  text-decoration: none;
  white-space: nowrap;
}

.site-nav-title:hover {
  color: var(--secondary);
}

.site-nav-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  align-items: center;
  justify-content: center;
}

.site-nav-links a {
  font-family: var(--headerFont);
  font-weight: 600;
  color: var(--darkgray);
  text-decoration: none;
}

.site-nav-links a:hover {
  color: var(--secondary);
}

@media (max-width: 800px) {
  .site-nav {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .site-nav-title {
    position: static;
  }
}
`

  return NavLinks
}) satisfies QuartzComponentConstructor<Partial<Options>>
