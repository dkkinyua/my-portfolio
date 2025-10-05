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
            <h5>Data Engineer | Big Data Enthusiast</h5>
          </div>
          <div className='mt-3 text-center'>
            <p>
            I am a skilled Data Engineer specializing in ETL/ELT pipelines, web scraping, and data transformation. Proficient in Python, SQL, Pandas, and NumPy, I clean large datasets and create actionable insights using Tableau and Excel. I work with PostgreSQL, MySQL, and AWS S3 for data storage, and build applications with Django and Flask.
            <br /><br />
            With a Civil Engineering background, I bring precision and problem-solving skills honed through structural analysis using AutoCAD and Etabs. This engineering foundation complements my data-driven approach and continuous learning mindset.
            <br /><br />
            I'm adaptable, eager to contribute to innovative projects, and fluent in English, Kiswahili, and French (B1).
            </p>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Intro
