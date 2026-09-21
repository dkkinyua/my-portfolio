import React, { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronUp } from 'lucide-react'

import { Progress } from '@/components/ui/progress'
import { useSpotify } from '@/hooks/useSpotify'
import { cn } from '@/lib/utils'

const SPOTIFY_GREEN = 'text-[#1DB954]'

function formatTime(ms) {
    const seconds = Math.floor(ms / 1000)
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}

function timeAgo(iso) {
    const minutes = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000))
    if (minutes < 1) return 'just now'
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.round(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.round(hours / 24)}d ago`
}

// Re-renders every second while `active`, so the progress bar keeps moving between polls.
function useNow(active) {
    const [now, setNow] = useState(() => Date.now())
    useEffect(() => {
        if (!active) return
        setNow(Date.now())
        const id = setInterval(() => setNow(Date.now()), 1000)
        return () => clearInterval(id)
    }, [active])
    return now
}

function Art({ src, alt, className }) {
    if (!src) {
        return (
            <span className={cn('flex shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground', className)}>
                <i className='fa-brands fa-spotify'></i>
            </span>
        )
    }
    return <img src={src} alt={alt} className={cn('shrink-0 rounded-md object-cover', className)} />
}

function Equalizer() {
    return (
        <span className='flex h-3 items-end gap-[2px]' aria-hidden='true'>
            {[0, 0.25, 0.5].map((delay) => (
                <span
                    key={delay}
                    className='h-full w-[3px] origin-bottom scale-y-75 rounded-[1px] bg-[#1DB954] motion-safe:animate-eq'
                    style={{ animationDelay: `${delay}s` }}
                />
            ))}
        </span>
    )
}

// Read-only "what I'm listening to" bar. Click it to see my last 5 tracks.
function NowPlaying() {
    const data = useSpotify()
    const [open, setOpen] = useState(false)
    const rootRef = useRef(null)
    const nowPlaying = data?.nowPlaying ?? null
    const now = useNow(Boolean(nowPlaying?.isPlaying))

    useEffect(() => {
        if (!open) return
        const onPointerDown = (e) => {
            if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
        }
        const onKeyDown = (e) => {
            if (e.key === 'Escape') setOpen(false)
        }
        document.addEventListener('pointerdown', onPointerDown)
        document.addEventListener('keydown', onKeyDown)
        return () => {
            document.removeEventListener('pointerdown', onPointerDown)
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [open])

    // Show what's playing, or fall back to the last finished track. Nothing at all -> hide.
    const track = nowPlaying ?? data?.recent?.[0]
    if (!track) return null

    const elapsed = nowPlaying
        ? Math.min(
              nowPlaying.durationMs,
              nowPlaying.progressMs + (nowPlaying.isPlaying ? Math.min(Math.max(now - data.fetchedAt, 0), 60000) : 0)
          )
        : 0
    const percent = nowPlaying ? (elapsed / nowPlaying.durationMs) * 100 : 0
    const status = !nowPlaying ? 'Last played' : nowPlaying.isPlaying ? 'Now playing' : 'Paused'

    return (
        <>
            {/* Keeps the footer clear of the fixed bar */}
            <div aria-hidden='true' className='h-24' />

            <div
                ref={rootRef}
                className='fixed inset-x-0 bottom-0 z-30 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:px-4'
            >
                <div className='mx-auto max-w-5xl'>
                    {open && (
                        <div
                            id='recent-tracks'
                            className='mb-2 max-h-[calc(100dvh-14rem)] overflow-y-auto rounded-xl border bg-background/95 p-2 shadow-lg backdrop-blur'
                        >
                            <p className='flex items-center gap-2 px-2 pb-1 pt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                                <i className={cn('fa-brands fa-spotify text-sm', SPOTIFY_GREEN)}></i> Recently played
                            </p>
                            {data.recent.length === 0 ? (
                                <p className='px-2 py-3 text-sm text-muted-foreground'>Nothing to show yet.</p>
                            ) : (
                                <ol>
                                    {data.recent.map((item, i) => (
                                        <li key={`${item.playedAt}-${i}`}>
                                            <a
                                                href={item.url ?? undefined}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-accent'
                                            >
                                                <Art src={item.image} alt='' className='h-10 w-10' />
                                                <span className='min-w-0 flex-1'>
                                                    <span className='block truncate text-sm font-medium'>{item.name}</span>
                                                    <span className='block truncate text-xs text-muted-foreground'>{item.artists}</span>
                                                </span>
                                                <span className='shrink-0 text-xs text-muted-foreground'>{timeAgo(item.playedAt)}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ol>
                            )}

                            {data.playlists?.length > 0 && (
                                <div className='mt-1 border-t pt-2'>
                                    <p className='flex items-center gap-2 px-2 pb-2 pt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                                        <i className={cn('fa-brands fa-spotify text-sm', SPOTIFY_GREEN)}></i> Follow my playlists
                                    </p>
                                    <ul className='grid grid-cols-3 gap-2'>
                                        {data.playlists.map((playlist) => (
                                            <li key={playlist.id}>
                                                <a
                                                    href={playlist.url ?? undefined}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    className='group flex h-full flex-col gap-2 rounded-lg p-2 transition-colors hover:bg-accent sm:flex-row sm:items-center sm:gap-3'
                                                >
                                                    <Art src={playlist.image} alt='' className='aspect-square w-full sm:h-12 sm:w-12' />
                                                    <span className='min-w-0'>
                                                        <span className='line-clamp-2 block text-xs font-medium sm:text-sm'>{playlist.name}</span>
                                                        <span className='mt-0.5 flex items-center gap-0.5 text-[11px] text-muted-foreground group-hover:text-foreground'>
                                                            Follow <ArrowUpRight className='size-3' />
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    <button
                        type='button'
                        aria-expanded={open}
                        aria-controls='recent-tracks'
                        onClick={() => setOpen((value) => !value)}
                        className='relative block w-full overflow-hidden rounded-xl border bg-background/95 text-left shadow-lg backdrop-blur transition-colors hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                    >
                        {/* Phones: a thin progress line along the top edge instead of the full slider */}
                        {nowPlaying && <Progress value={percent} className='absolute inset-x-0 top-0 h-0.5 rounded-none sm:hidden' />}

                        <span className='grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-2.5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1fr)] sm:p-3'>
                            {/* Artwork + track */}
                            <span className='flex min-w-0 items-center gap-3'>
                                <Art src={track.image} alt={`${track.name} album art`} className='h-11 w-11 sm:h-12 sm:w-12' />
                                <span className='min-w-0'>
                                    <span className='flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-foreground'>
                                        <i className={cn('fa-brands fa-spotify text-sm', SPOTIFY_GREEN)}></i>
                                        {status}
                                        {nowPlaying?.isPlaying && <Equalizer />}
                                    </span>
                                    <span className='block truncate text-sm font-medium'>{track.name}</span>
                                    <span className='block truncate text-xs text-muted-foreground'>{track.artists}</span>
                                </span>
                            </span>

                            {/* Progress (larger screens) */}
                            <span className='hidden items-center gap-3 text-xs tabular-nums text-muted-foreground sm:flex'>
                                {nowPlaying ? (
                                    <>
                                        <span className='w-10 text-right'>{formatTime(elapsed)}</span>
                                        <Progress value={percent} className='h-1.5 flex-1' />
                                        <span className='w-10'>{formatTime(nowPlaying.durationMs)}</span>
                                    </>
                                ) : (
                                    <span className='w-full text-center'>Played {timeAgo(track.playedAt)}</span>
                                )}
                            </span>

                            {/* Expand hint */}
                            <span className='flex items-center justify-end gap-2 text-xs text-muted-foreground'>
                                <span className='hidden sm:inline'>Recently played</span>
                                <ChevronUp className={cn('size-5 transition-transform', open && 'rotate-180')} />
                            </span>
                        </span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default NowPlaying
