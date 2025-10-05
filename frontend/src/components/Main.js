import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ProjectCarousel from './ProjectCarousel';

function Main() {
    const outerDivStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    }

    const linkStyle = {
        color: 'inherit',
        textDecoration: 'none',
    };

    const buttonContainerStyle = {
        textAlign: 'right',
    };

    const cardStyle = {
        width: '95%',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.7)',
    }

    const experienceData = [
        {
            title: 'Data Engineer',
            company: 'Data Science East Africa',
            period: 'May 2024 - Present',
            description: 'Built and maintained ETL pipelines, optimized database queries, and developed real-time data streaming solutions using Kafka and Spark.',
            achievements: [
                'Designed and implemented scalable ETL/ELT pipelines for data integration',
                'Optimized PostgreSQL and MySQL queries for improved performance',
                'Developed real-time data streaming solutions with Apache Kafka, Flink and Spark'
            ]
        },
        {
            title: 'Software Developer - Backend',
            company: 'Individual Contractor',
            period: 'Dec 2023 - Jan 2025',
            description: 'Used Python to build scalable backend applications using Django and Flask for various client projects.',
            achievements: [
                'Developed RESTful APIs serving 1,000+ daily requests',
                'Built custom Django and Flask applications tailored to client needs',
                'Implemented authentication, authorization, and data validation systems'
            ]
        }
    ];

    return (
        <div className='mt-2'>
            <style>
                {`
                    /* Desktop: Horizontal Timeline */
                    @media (min-width: 768px) {
                        .timeline-container {
                            display: flex;
                            justify-content: space-between;
                            position: relative;
                            margin: 40px 0;
                            padding: 20px 0;
                        }
                        
                        .timeline-line {
                            position: absolute;
                            top: 40px;
                            left: 10%;
                            right: 10%;
                            height: 2px;
                            background-color: #dee2e6;
                        }
                        
                        .timeline-item {
                            flex: 1;
                            position: relative;
                            padding: 0 15px;
                            text-align: center;
                        }
                        
                        .timeline-dot {
                            width: 20px;
                            height: 20px;
                            border-radius: 50%;
                            background-color: #212529;
                            border: 4px solid white;
                            margin: 30px auto 20px;
                            position: relative;
                            z-index: 1;
                            box-shadow: 0 0 0 3px #dee2e6;
                        }
                        
                        .timeline-content {
                            background: #f8f9fa;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                            text-align: left;
                            min-height: 280px;
                        }
                    }
                    
                    /* Mobile: Vertical Timeline */
                    @media (max-width: 767px) {
                        .timeline-container {
                            position: relative;
                            padding-left: 30px;
                            margin-top: 20px;
                        }
                        
                        .timeline-item {
                            position: relative;
                            padding-bottom: 30px;
                            border-left: 2px solid #dee2e6;
                            padding-left: 25px;
                        }
                        
                        .timeline-dot {
                            position: absolute;
                            left: -9px;
                            top: 5px;
                            width: 15px;
                            height: 15px;
                            border-radius: 50%;
                            background-color: #212529;
                            border: 3px solid white;
                        }
                        
                        .timeline-content {
                            background: #f8f9fa;
                            padding: 15px;
                            border-radius: 8px;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                        }
                        
                        .timeline-line {
                            display: none;
                        }
                    }
                    
                    .timeline-content h5 {
                        margin-bottom: 8px;
                        font-weight: 600;
                    }
                    
                    .timeline-content h6 {
                        color: #6c757d;
                        font-size: 0.9rem;
                        margin-bottom: 12px;
                    }
                    
                    .timeline-content p {
                        font-size: 0.95rem;
                        margin-bottom: 10px;
                    }
                    
                    .timeline-content ul {
                        font-size: 0.9rem;
                        padding-left: 20px;
                        margin-bottom: 0;
                    }
                    
                    .timeline-content ul li {
                        margin-bottom: 5px;
                    }
                `}
            </style>

            <div style={outerDivStyle}>
                <Card style={cardStyle}>
                    <Card.Body>
                        <h3>Skills:</h3>
                        <p>
                            I am well versed and skilled in the following areas
                            <ul>
                                <li>Languages: Python (Django, Flask), SQL</li>
                                <li>API Development and Consumption using requests</li>
                                <li>Web Scraping using beautifulsoup, Selenium</li>
                                <li>Data Storage: mySQL, PostgreSQL, MongoDB, AWS</li>
                                <li>Data Management Tools: Apache Airflow, Apache Spark, Apache Kafka</li>
                                <li>Data Warehousing: Snowflake</li>
                                <li>ETL and ELT Pipeline Development.</li>
                                <li>Exploratory Data Analysis using pandas, Numpy, plotly</li>
                                <li>Data Visualization: Tableau, Grafana, PowerBI</li>
                                <li>Version Control: Git</li>
                                <li>CI/CD: Github Actions</li>
                            </ul>
                            Check my projects here or in my <a href='https://github.com/dkkinyua' style={linkStyle}>GitHub</a>!
                            <br />
                            <strong>For my engineering projects, design, detailing and calculations, a page with all scanned documents will be added soon in our Projects page or I can send them to you via email.</strong>
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'right', gap: '10px' }}>
                            <Link to='/projects'>
                                <Button variant='dark'>
                                    <i className="fa-solid fa-list-check"></i> Projects
                                </Button>
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            </div>

            {/* Experience Section */}
            <div className='mt-4 mb-4' style={outerDivStyle}>
                <Card style={cardStyle}>
                    <Card.Body>
                        <h3>Experience:</h3>
                        <div className="timeline-container">
                            <div className="timeline-line"></div>
                            {experienceData.map((exp, index) => (
                                <div key={index} className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <h5>{exp.title}</h5>
                                        <h6>{exp.company} | {exp.period}</h6>
                                        <p>{exp.description}</p>
                                        <ul>
                                            {exp.achievements.map((achievement, i) => (
                                                <li key={i}>{achievement}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card.Body>
                </Card>
            </div>

            {/* Project carousel */}
            <div className='mt-4 mb-4' style={outerDivStyle}>
                <ProjectCarousel/>
            </div>

            <div className='mt-4 mb-4' style={outerDivStyle}>
                <Card style={cardStyle}>
                    <Card.Body>
                        <h3>Blog:</h3>
                        <p>
                            I'll be writing blogs about data analysis, data engineering, engineering, and other topics on my portfolio.
                            Keep up with the latest tech trends, and innovations in the dataverse.
                            My blog will also keep me sharp in development, so feel free to follow along on this journey!

                            Subscribe to my blog to get the latest updates as soon as they come out by clicking the button below!
                        </p>

                        <div style={buttonContainerStyle}>
                            <Link to='/posts'><Button variant='dark'><i className="fa-solid fa-book-open-reader"></i> Blog</Button></Link>
                        </div>
                    </Card.Body>
                </Card>
            </div>

            <div className='mt-4 mb-4' style={outerDivStyle}>
                <Card style={cardStyle}>
                    <Card.Body>
                        <h3>Contact Me: </h3>
                        <p>
                            If you have any queries, compliments, complaints (I hope you have none), or you would want to collaborate on a project, please contact me in the form provided by pressing the button alongside or DM me on any of my social media accounts in the top of the page.
                        </p>

                        <div style={buttonContainerStyle}>
                            <Link to='/contact-me'><Button variant='dark'><i className="fa-regular fa-paper-plane"></i> Contact Me</Button></Link>
                        </div>
                    </Card.Body>
                </Card>
            </div>

            <div className='mt-4 mb-4' style={outerDivStyle}>
                <Card style={cardStyle}>
                    <Card.Body>
                        <h3>Download Resume: </h3>
                        <p>
                            If you want to take a look at my resume, click the button below to download my cv in .pdf format
                        </p>

                        <div style={buttonContainerStyle}>
                            <a href="docs\denzel-kinyua-de-resume.docx" download><Button variant='dark'><i className="fa-solid fa-arrow-down"></i> Download Resume</Button></a>
                        </div>
                    </Card.Body>
                </Card>
            </div>

        </div>
    );
}

export default Main;