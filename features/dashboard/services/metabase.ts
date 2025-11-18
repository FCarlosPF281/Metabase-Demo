"use client"

export async function fetchTokenForAlias(alias: string, debugHeader?: string): Promise<string | null> {
  try {
    const res = await fetch(`/api/metabase/token?as=${encodeURIComponent(String(alias))}`, {
      credentials: 'include',
      headers: debugHeader ? { 'x-as': String(alias), 'x-debug': debugHeader } : { 'x-as': String(alias) },
    })

    const json = await res.json()
    return json?.jwt ?? null
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[metabase service] fetchTokenForAlias error', err)
    return null
  }
}

export function writeTokenToClient(jwt: string | null) {
  try {
    if (jwt) {
      try {
        localStorage.setItem('metabase_debug_jwt', jwt)
        localStorage.setItem('metabase.jwt', jwt)
        localStorage.setItem('metabase_token', jwt)
        localStorage.setItem('metabase_embedded_jwt', jwt)
      } catch (e) {
        // ignore localStorage errors
      }
    }
  } catch (e) {
    // ignore
  }
}

export function setAliasCookie(alias: string | null) {
  try {
    if (alias) {
      document.cookie = `metabase_as=${encodeURIComponent(String(alias))}; path=/`
    } else {
      // clear cookie
      document.cookie = 'metabase_as=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  } catch (e) {
    // ignore
  }
}

export function clearClientTokenCache() {
  try {
    try {
      localStorage.removeItem('metabase_debug_jwt')
      localStorage.removeItem('metabase.jwt')
      localStorage.removeItem('metabase_token')
      localStorage.removeItem('metabase_embedded_jwt')
    } catch (e) {
      // ignore localStorage errors
    }

    try {
      document.cookie = 'metabase_as=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    } catch (e) {
      // ignore
    }
  } catch (e) {
    // ignore
  }
}

export async function prepareTokenForAlias(alias: string, debugHeader?: string) {
  const jwt = await fetchTokenForAlias(alias, debugHeader)
  writeTokenToClient(jwt)
  setAliasCookie(alias)
  return jwt
}

export function decodeJwtPayload(jwt: string | null) {
  if (!jwt) return null
  try {
    const parts = jwt.split('.')
    if (parts.length < 2) return null
    const payload = parts[1]
    const json = decodeURIComponent(
      atob(payload)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )
    return JSON.parse(json)
  } catch (e) {
    return null
  }
}
