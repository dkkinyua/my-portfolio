import React from 'react'

import Intro from '../components/Intro'
import Main from '../components/Main'
// import { Container } from 'react-bootstrap'

function HomeScreen() {
  const textStyle = {
    fontFamily: "PT Mono, monospace",
    fontStyle: 'normal'
  }

  return (
    <div style={textStyle}>
      <div className='justify-content-center text-center'>
        <Intro />
      </div>
      <Main />
    </div>

  )

}

export default HomeScreen