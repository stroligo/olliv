import { joinURL } from 'ufo'

/**
 * Caminho absoluto até um ficheiro servido sob `public/` (ex.: `/images/foo.png`),
 * respeitando `app.baseURL` quando o site é publicado numa subpasta do domínio.
 */
export function usePublicPath() {
  const config = useRuntimeConfig()

  return (pathFromSiteRoot: string) =>
    joinURL(config.app.baseURL, pathFromSiteRoot.replace(/^\//, ''))
}
