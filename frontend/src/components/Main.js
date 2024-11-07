import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';

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

    return (
        <div className='mt-2'>
            <div style={outerDivStyle}>
                <Card style={cardStyle}>
                    <Card.Body>
                        <h3>Skills:</h3>
                        <p>
                            I am well versed and skilled in the following areas
                            <ul>
                                <li>Backend Development: Python. Frameworks: Django, Flask</li>
                                <li>Frontend Development: React, Redux</li>
                                <li>API Testing, Development</li>
                                <li>Version Control: Git</li>
                                <li>CI/CD: Github Actions</li>
                                <li>Databases: mySQL, PostgreSQL</li>
                                <li>Civil Engineering drawings and design through AutoCAD and Civil3D</li>
                            </ul>
                            Check my projects here or in my <a href='https://github.com/dkkinyua' style={linkStyle}>GitHub</a>!
                        </p>
                        <div style={buttonContainerStyle}>
                            <Link to='/projects'><Button variant='dark'><i className="fa-solid fa-list-check"></i> Projects</Button></Link>
                        </div>
                    </Card.Body>
                </Card>
            </div>

            <div className='mt-4 mb-4' style={outerDivStyle}>
                <Card style={cardStyle}>
                    <Card.Body>
                        <h3>Blog:</h3>
                        <p>
                            I'll be writing blogs about software development, football, video games, engineering, and other topics on my portfolio.
                            Keep up with the latest tech trends, football banter, gaming news, and engineering innovations.
                            My blog will also keep me sharp in development, so feel free to follow along on this journey!

                            Subscribe to my blog to get the latest updates as soon as they come out by clicking the button below!
                        </p>

                        <div style={buttonContainerStyle}>
                            <Link to='/posts'><Button variant='dark'><i class="fa-solid fa-book-open-reader"></i> Blog</Button></Link>
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
                            <Link to='/contact-me'><Button variant='dark'><i class="fa-regular fa-paper-plane"></i> Contact Me</Button></Link>
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
                            <a href="\docs\Denzel Kanyeki Kinyua's CV.pdf" download><Button variant='dark'><i class="fa-solid fa-arrow-down"></i> Download Resume</Button></a>
                        </div>
                    </Card.Body>
                </Card>
            </div>

        </div>
    );
}

export default Main;
