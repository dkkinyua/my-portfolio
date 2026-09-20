import React, { useEffect, useState } from 'react'

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

// Slides through one album's photos with a caption under the current photo.
// Mounted only while the dialog is open, so it always starts on photo 1.
function AlbumViewer({ album }) {
    const [api, setApi] = useState()
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (!api) return
        const onSelect = () => setCurrent(api.selectedScrollSnap())
        onSelect()
        api.on('select', onSelect)
        return () => api.off('select', onSelect)
    }, [api])

    return (
        <div className='space-y-3'>
            <Carousel setApi={setApi} opts={{ loop: true }}>
                <CarouselContent className='-ml-0'>
                    {album.photos.map((photo, i) => (
                        <CarouselItem key={i} className='pl-0'>
                            <div className='aspect-[4/3] overflow-hidden rounded-lg bg-muted'>
                                <PotfolioPhoto
                                    src={photo.src}
                                    alt={photo.caption}
                                    tone={album.tone}
                                    label={`Photo ${i + 1}`}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className='left-2 border-0 bg-background/80 backdrop-blur' />
                <CarouselNext className='right-2 border-0 bg-background/80 backdrop-blur' />
            </Carousel>

            <div className='flex items-start justify-between gap-4'>
                <p className='text-sm'>{album.photos[current].caption}</p>
                <span className='shrink-0 text-sm text-muted-foreground'>
                    {current + 1} / {album.photos.length}
                </span>
            </div>
        </div>
    )
}

function PotfolioAlbum({ album }) {
    const cover = album.photos[0]

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    type='button'
                    className='group rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                >
                    <Card className='overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg'>
                        <div className='aspect-[4/5] overflow-hidden bg-muted'>
                            <PotfolioPhoto
                                src={cover.src}
                                alt={`${album.title} thumbnail`}
                                tone={album.tone}
                                className='transition-transform duration-500 group-hover:scale-105'
                            />
                        </div>
                        <CardContent className='space-y-0.5 p-4'>
                            <h2 className='text-sm font-medium'>{album.title}</h2>
                            <p className='text-xs text-muted-foreground'>{album.photos.length} photos</p>
                        </CardContent>
                    </Card>
                </button>
            </DialogTrigger>

            <DialogContent className='w-[calc(100%-2rem)] max-w-2xl rounded-lg'>
                <DialogHeader>
                    <DialogTitle>{album.title}</DialogTitle>
                    <DialogDescription className='sr-only'>
                        Photo album with {album.photos.length} photos
                    </DialogDescription>
                </DialogHeader>
                <AlbumViewer album={album} />
            </DialogContent>
        </Dialog>
    )
}

export default PotfolioAlbum
