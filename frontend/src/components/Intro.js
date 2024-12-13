import React from 'react'
import { Card } from 'react-bootstrap'

function Intro() {
  const outerDivStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }

  const imageDivStyle = {
    height: '250px', // Set the height to 200px as required
    width: '100%',   // Set the width to 100%
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
  }

  const imgStyle = {
    width: '100%',   // Make the image take 100% of the width of its container
    height: '100%',  // Set the height to fill the container
    objectFit: 'contain',  // Ensures the image is scaled appropriately
  }

  const cardStyle = {
    width: '95%',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.7)',
  }

  return (
    <div style={outerDivStyle}>
      <Card style={cardStyle} className='mt-3 mb-3'>
        <Card.Body className='d-flex flex-column align-items-center'>
          <div style={imageDivStyle}>
            <img
              src='https://cdn.dribbble.com/users/244516/screenshots/15180098/media/35301f78c0ba0d242a6703b927814e23.gif'
              alt='Profile GIF'
              style={imgStyle}
            />
          </div>
          <div className='mt-3 text-center'>
            <h3>Denzel Kanyeki Kinyua</h3>
            <h5>Civil Engineer, Software Developer</h5>
          </div>
          <div className='mt-3 text-center'>
            <p>
              A highly motivated and skilled Civil Engineering student with a passion for combining engineering principles and software development. I have developed expertise in analyzing and designing structures to ensure stability and safety, utilizing tools like <strong>AutoCAD</strong> for creating detailed 2D and 3D designs of infrastructure projects such as buildings. My proficiency in generating precise drawings streamlines the design and planning phases of projects. Additionally, I am skilled in the design and detailing of structures using manual calculations and engineering software like <strong>Etabs.</strong>

              <br />
              Complementing my civil engineering knowledge, I bring extensive experience in web development. I excel in both backend and frontend technologies, including Python (Django, Flask) and React, with proficiency in database management using PostgreSQL and MySQL. My freelancing background has honed my ability to deliver high-quality, customized digital solutions, while internships in engineering and operations have strengthened my project management and problem-solving skills.

              <br />
              Eager to learn and contribute to innovative projects, I am adaptable, a quick learner, and fluent in English, Kiswahili, and French (B1 - Conversational).


            </p>

          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Intro
