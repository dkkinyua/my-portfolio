// Potfolio albums — edit this file to add photos, videos and new episodes.
//
// PHOTOS  1. Put the image in `public/images/potfolio/<album>/`
//         2. Set `src` to its path, e.g. '/images/potfolio/ep1/pots.jpg'
//            Tip: resize to ~1600px on the long side (JPEG, ~200-300 KB) so the page loads fast.
//            Phone photos carry GPS location in their metadata; re-export/resize to strip it.
//
// VIDEOS  1. Put the file in `public/videos/potfolio/` (MP4 / H.264 plays everywhere; keep it small)
//         2. Set `src` to its path, e.g. '/videos/potfolio/ep1-1.mp4'
//         3. Optional: `poster` is the still image shown before playing
//
// An item with no `src` (or a file that can't be found) shows a placeholder.
// The album thumbnail is its first photo (`thumb`, if given, is a smaller copy used just for
// the thumbnail). `tone` only colours placeholders and has no effect once real media is in.
// To add another episode, copy the whole album block and give it a new `id`.

export const albums = [
    {
        id: 'ep1',
        title: 'Ep1: Terrakotta at Kipro Westlands',
        tone: 'from-amber-100 to-orange-200 dark:from-amber-950 dark:to-orange-900',
        media: [
            {
                type: 'photo',
                src: '/images/potfolio/ep1/pots.jpg',
                thumb: '/images/potfolio/ep1/pots-thumb.jpg',
                caption: 'The three pots',
            },
            {
                type: 'photo',
                src: '/images/potfolio/ep1/studio.jpg',
                caption: 'Painted and ready',
            },
            {
                type: 'photo',
                src: '/images/potfolio/ep1/group.jpg',
                caption: 'Everyone with their finished pieces',
            },
            { type: 'video', src: null, poster: null, caption: 'Caption for video 1' },
            { type: 'video', src: null, poster: null, caption: 'Caption for video 2' },
        ],
    },
]
