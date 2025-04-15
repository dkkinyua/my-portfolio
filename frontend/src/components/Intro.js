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
            <h5>Data Engineer | Data Analyst | Big Data Enthusiast</h5>
          </div>
          <div className='mt-3 text-center'>
            <p>
              I am a highly motivated and skilled Data Engineer and Analyst with a strong foundation in Python, SQL, and statistical analysis. I specialize in designing ETL and ELT pipelines, automating data collection through web scraping and APIs, cleaning large datasets, and transforming raw information into actionable insights. I’ve worked extensively with libraries like Pandas and NumPy, and visualized insights using Tableau, and Microsoft Excel to support data-driven decisions. I’m also proficient in PostgreSQL, MySQL, and AWS S3 for data storage and management, and have hands-on experience building data-centric applications using Django, and Flask

              <br />

              In addition to my data-focused skill set, I hold a solid academic background in Civil Engineering, where I’ve applied engineering principles to structural analysis and design. I am proficient in tools such as AutoCAD for creating detailed 2D and 3D infrastructure plans and Etabs for structural design and detailing. My civil engineering knowledge has shaped my precision, problem-solving, and project planning skills, which complement my passion for data-driven thinking and continuous learning.

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
