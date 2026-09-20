import React from 'react'

import Intro from '../components/Intro'
import Main from '../components/Main'

function HomeScreen() {
  return (
    <div className='mx-auto w-full max-w-5xl space-y-8 px-4 py-6 sm:px-6'>
      <Intro />
      <Main />
    </div>
  )
}

export default HomeScreen
