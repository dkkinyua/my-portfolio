import React from 'react'

import PotfolioAlbum from '../components/PotfolioAlbum'
import { albums } from '../data/potfolio'

function PotfolioScreen() {
  return (
    <div className='mx-auto w-full max-w-5xl px-4 py-8 sm:px-6'>
      <div className='mb-10 space-y-2 text-center'>
        <h1 className='text-3xl font-bold tracking-tight'>Potfolio</h1>
        <p className='mx-auto max-w-md text-sm text-muted-foreground'>
          Pottery I make with friends, for fun. Tap an album to look through the photos.
        </p>
      </div>
      <div className='grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3'>
        {albums.map((album) => (
          <PotfolioAlbum key={album.id} album={album} />
        ))}
      </div>
    </div>
  )
}

export default PotfolioScreen
