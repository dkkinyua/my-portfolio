import React, { useState } from 'react'

import { cn } from '@/lib/utils'

// Renders a photo, or a soft placeholder while `src` is empty or fails to load.
function PotfolioPhoto({ src, alt, tone, label, className }) {
    const [failed, setFailed] = useState(false)

    if (src && !failed) {
        return (
            <img
                src={src}
                alt={alt}
                loading='lazy'
                draggable={false}
                onError={() => setFailed(true)}
                className={cn('h-full w-full select-none object-cover', className)}
            />
        )
    }

    return (
        <div
            role='img'
            aria-label={alt}
            className={cn(
                'flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br text-foreground/40',
                tone,
                className
            )}
        >
            <i className='fa-regular fa-image text-3xl'></i>
            {label && <span className='text-xs'>{label}</span>}
        </div>
    )
}

export default PotfolioPhoto
