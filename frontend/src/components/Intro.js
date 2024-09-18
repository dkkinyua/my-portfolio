import React from 'react'
import { Image, Card } from 'react-bootstrap'

import profile from '../assets/profile.jpeg'

function Intro() {
  const outerDivStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }

  const imageDivStyle = {
    height: '150px',
    width: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto'
  }

  const imageStyle = {
    height: '100%',
    width: '100%',
    borderRadius: '50%',
    border: '2px solid #28282B'
  }

  const cardStyle = {
    width: '100%',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
  }

  return (
    <div style={outerDivStyle}>
      <Card style={cardStyle} className='mt-3 mb-3'>
        <Card.Body className='d-flex flex-column align-items-center'>
          <div style={imageDivStyle}>
            <Image style={imageStyle} src={profile} />
          </div>
          <div className='mt-3 text-center'>
            <h4>Denzel Kanyeki Kinyua</h4>
            <h6>Backend Developer, Civil Engineer</h6>
          </div>
          <div className='mt-3 text-center'>
            <p>
              A highly motivated and skilled Civil Engineering student with a passion for software development, combining a strong foundation in engineering principles with extensive experience in web development. I excel in both backend and frontend technologies, including Python (Django, Flask) and React, with a proficiency in database management using PostgreSQL and MySQL. My freelancing background has honed my ability to deliver high-quality, customized digital solutions, while internships in engineering and operations have strengthened my project management and problem-solving skills. Eager to contribute to innovative projects, I am adaptable, a quick learner, and fluent in English, Kiswahili, and French (B2).
            </p>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Intro
