import React from 'react'

import Intro from '../components/Intro'
import { Container } from 'react-bootstrap'

function HomeScreen() {
  return (
    <div className='justify-content-center text-center'>
        <Container>
            <Intro/>
        </Container>
    </div>
  )
}

export default HomeScreen