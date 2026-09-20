import { useEffect, useState } from 'react'

const POLL_MS = 15000

// Polls /api/spotify while the tab is visible. Keeps the last good data if a poll fails,
// and stays empty (so the player hides itself) if it never succeeded.
// A 503 means the server isn't configured or needs re-authorizing; retrying can't fix that,
// so polling stops until the page is reloaded.
export function useSpotify() {
    const [data, setData] = useState(null)

    useEffect(() => {
        let timer
        let controller
        let stopped = false

        const load = async () => {
            controller?.abort()
            controller = new AbortController()
            try {
                const res = await fetch('/api/spotify', { signal: controller.signal })
                if (res.status === 503) {
                    stopped = true
                    clearInterval(timer)
                    console.warn('Spotify player disabled: server is not configured or needs re-authorization')
                    return
                }
                if (!res.ok) throw new Error(`status ${res.status}`)
                setData(await res.json())
            } catch (err) {
                if (err.name !== 'AbortError') console.warn('Spotify player unavailable:', err.message)
            }
        }

        const start = () => {
            if (stopped) return
            load()
            timer = setInterval(load, POLL_MS)
        }

        const onVisibility = () => {
            clearInterval(timer)
            if (!document.hidden) start()
        }

        if (!document.hidden) start()
        document.addEventListener('visibilitychange', onVisibility)

        return () => {
            clearInterval(timer)
            controller?.abort()
            document.removeEventListener('visibilitychange', onVisibility)
        }
    }, [])

    return data
}
