import React, { useState } from 'react'

import { cn } from '@/lib/utils'

// Renders a video player, or a "coming soon" placeholder while `src` is empty or fails to load.
function PotfolioVideo({ src, poster, tone, className }) {
    const [failed, setFailed] = useState(false)

    if (src && !failed) {
        return (
            <video
                src={src}
                poster={poster ?? undefined}
                controls
                playsInline
                preload='metadata'
                onError={() => setFailed(true)}
                className={cn('h-full w-full bg-black object-contain', className)}
            />
        )
    }

    return (
        <div
            role='img'
            aria-label='Video coming soon'
            className={cn(
                'flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br text-foreground/40',
                tone,
                className
            )}
        >
            <i className='fa-regular fa-circle-play text-4xl'></i>
            <span className='text-xs'>Video coming soon</span>
        </div>
    )
}

export default PotfolioVideo
