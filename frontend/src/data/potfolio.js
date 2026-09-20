// Potfolio albums — edit this file to fill in your real photos.
//
// 1. Drop your images into `public/images/potfolio/` (e.g. public/images/potfolio/mugs-1.jpg)
// 2. Set each photo's `src` to its path, e.g. src: '/images/potfolio/mugs-1.jpg'
// 3. Replace the album `title` and each photo's `caption`
//
// A photo with no `src` (or a file that can't be found) shows a placeholder.
// The first photo in an album is used as the album's thumbnail.
// `tone` only colours the placeholder; it has no effect once real photos are in.

export const albums = [
    {
        id: 'album-1',
        title: 'Album title one',
        tone: 'from-amber-100 to-orange-200 dark:from-amber-950 dark:to-orange-900',
        photos: [
            { src: null, caption: 'Caption for photo 1' },
            { src: null, caption: 'Caption for photo 2' },
            { src: null, caption: 'Caption for photo 3' },
            { src: null, caption: 'Caption for photo 4' },
        ],
    },
    {
        id: 'album-2',
        title: 'Album title two',
        tone: 'from-stone-100 to-stone-300 dark:from-stone-900 dark:to-stone-700',
        photos: [
            { src: null, caption: 'Caption for photo 1' },
            { src: null, caption: 'Caption for photo 2' },
            { src: null, caption: 'Caption for photo 3' },
            { src: null, caption: 'Caption for photo 4' },
        ],
    },
    {
        id: 'album-3',
        title: 'Album title three',
        tone: 'from-rose-100 to-orange-100 dark:from-rose-950 dark:to-orange-950',
        photos: [
            { src: null, caption: 'Caption for photo 1' },
            { src: null, caption: 'Caption for photo 2' },
            { src: null, caption: 'Caption for photo 3' },
            { src: null, caption: 'Caption for photo 4' },
        ],
    },
]
