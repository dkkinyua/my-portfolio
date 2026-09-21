import React, { useEffect, useRef, useState } from 'react'

import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

import PotfolioPhoto from './PotfolioPhoto'
import PotfolioVideo from './PotfolioVideo'

// Module-level so the object is stable between renders (embla re-initialises if a function option changes).
// Dragging on a video is left to its own seek bar instead of swiping the slide.
const CAROUSEL_OPTS = { loop: true, watchDrag: (_api, event) => !event.target.closest?.('video') }

const plural = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`

function countLabel(media) {
    const photos = media.filter((item) => item.type === 'photo').length
    const videos = media.filter((item) => item.type === 'video').length
    return [photos && plural(photos, 'photo'), videos && plural(videos, 'video')].filter(Boolean).join(' · ')
}

// Slides through one album's photos and videos with a caption under the current item.
// Mounted only while the dialog is open, so it always starts on the first item.
function AlbumViewer({ album }) {
    const rootRef = useRef(null)
    const [api, setApi] = useState()
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (!api) return
        const onSelect = () => {
            setCurrent(api.selectedScrollSnap())
            // Don't leave a video playing off-screen after swiping away from it.
            rootRef.current?.querySelectorAll('video').forEach((video) => video.pause())
        }
        onSelect()
        api.on('select', onSelect)
        return () => api.off('select', onSelect)
    }, [api])

    return (
        <div ref={rootRef} className='space-y-3'>
            <Carousel setApi={setApi} opts={CAROUSEL_OPTS}>
                <CarouselContent className='-ml-0'>
                    {album.media.map((item, i) => (
                        <CarouselItem key={i} className='pl-0'>
                            {/* Whole photo always visible (phone photos are portrait), over a soft blur of itself */}
                            <div className='relative h-[min(65dvh,34rem)] overflow-hidden rounded-lg bg-muted'>
                                {item.type === 'photo' && item.src && (
                                    <img
                                        src={item.src}
                                        alt=''
                                        aria-hidden='true'
                                        className='absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-2xl'
                                    />
                                )}
                                <div className='relative h-full'>
                                    {item.type === 'video' ? (
                                        <PotfolioVideo src={item.src} poster={item.poster} tone={album.tone} />
                                    ) : (
                                        <PotfolioPhoto
                                            src={item.src}
                                            alt={item.caption}
                                            tone={album.tone}
                                            label={`Photo ${i + 1}`}
                                            className='object-contain'
                                        />
                                    )}
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className='left-2 border-0 bg-background/80 backdrop-blur' />
                <CarouselNext className='right-2 border-0 bg-background/80 backdrop-blur' />
            </Carousel>

            <div className='flex items-start justify-between gap-4'>
                <p className='text-sm'>{album.media[current].caption}</p>
                <span className='shrink-0 text-sm text-muted-foreground'>
                    {current + 1} / {album.media.length}
                </span>
            </div>
        </div>
    )
}

function PotfolioAlbum({ album }) {
    const cover = album.media.find((item) => item.type === 'photo') ?? album.media[0]

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    type='button'
                    className='group w-full rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                >
                    <Card className='overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg'>
                        <div className='aspect-[4/5] overflow-hidden bg-muted'>
                            <PotfolioPhoto
                                src={cover.thumb ?? cover.src}
                                alt={`${album.title} thumbnail`}
                                tone={album.tone}
                                className='transition-transform duration-500 group-hover:scale-105'
                            />
                        </div>
                        <CardContent className='space-y-0.5 p-4'>
                            <h2 className='text-sm font-medium'>{album.title}</h2>
                            <p className='text-xs text-muted-foreground'>{countLabel(album.media)}</p>
                        </CardContent>
                    </Card>
                </button>
            </DialogTrigger>

            <DialogContent className='w-[calc(100%-2rem)] max-w-2xl rounded-lg'>
                <DialogHeader className='pr-8 text-left'>
                    <DialogTitle>{album.title}</DialogTitle>
                    <DialogDescription className='sr-only'>Album with {countLabel(album.media)}</DialogDescription>
                </DialogHeader>
                <AlbumViewer album={album} />
            </DialogContent>
        </Dialog>
    )
}

export default PotfolioAlbum
