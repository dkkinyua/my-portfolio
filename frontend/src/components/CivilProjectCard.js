import React from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { Toaster } from 'react-hot-toast'

function CivilProjectCard() {
    const containerStyle = {
        display: 'flex',
        alignItems: 'stretch', // Ensures the card and image are the same height
        width: '98%',
        marginBottom: '20px', // Space between cards
    };

    const cardStyle = {
        flex: 1, // Takes the remaining space beside the image
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.7)',
        overflow: 'hidden',
    };

    const textStyle = {
        fontFamily: 'PT Mono, monospace',
        fontStyle: 'normal',
    };

    // const [projects, setProjects] = useState([])
    // const [loading, setLoading] = useState(true)




    return (
        <Container fluid>
            <div>
                <Toaster />
            </div>
            <div>
                <div style={containerStyle}>
                    {/* Card on the right side */}
                    <Card style={cardStyle}>
                        <Card.Title style={textStyle} className="p-3">
                            <h2>1. Uthiru Girls Classrooms</h2>
                        </Card.Title>
                        <Card.Body className="d-flex flex-column" style={textStyle}>
                            <p>I was tasked with designing classrooms at Uthiru Girls with the help and supervision of my supervisor. This was already done by my supervisor and I was manually designing the classrooms and designing the classrooms on AutoCAD. &copy; 2024 Eng. Gilbert Manga All rights reserved.</p>
                            <div className="d-flex justify-content-end mt-3">
                                <a href="\docs\Classroom 16-04.dwg" download target="_blank" rel="noopener noreferrer">
                                    <Button variant="dark">
                                        <i class="fa-solid fa-location-arrow"></i> Check it out
                                    </Button>
                                </a>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div style={containerStyle}>
                    <Card style={cardStyle}>
                        <Card.Title style={textStyle} className="p-3">
                            <h2>PLAXIS 3D Design</h2>
                        </Card.Title>
                        <Card.Body className="d-flex flex-column" style={textStyle}>
                            <p>Designed the phased excavation of a shield tunnel using PLAXIS 3D software using clay, sand and concrete for the tunnel </p>
                            <div className="d-flex justify-content-end mt-3">
                                <a href='\docs\Phased Excavation of a Shield Tunnel.p3dat' download target="_blank" rel="noopener noreferrer">
                                    <Button variant="dark">
                                        <i class="fa-solid fa-location-arrow"></i> Check it out
                                    </Button>
                                </a>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                <div style={containerStyle}>
                    <Card style={cardStyle}>
                        <Card.Title style={textStyle} className="p-3">
                            <h2>PLAXIS 3D Design</h2>
                        </Card.Title>
                        <Card.Body className="d-flex flex-column" style={textStyle}>
                            <p>Designed the foundation of structures on overconsolidated clay on rigid structures using PLAXIS 3D software.</p>
                            <div className="d-flex justify-content-end mt-3">
                                <a href="\docs\Foundation in Overconsolidated Clay, Case A.p3dat" download target="_blank" rel="noopener noreferrer">
                                    <Button variant="dark">
                                        <i class="fa-solid fa-location-arrow"></i> Check it out
                                    </Button>
                                </a>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </Container>
    )
}

export default CivilProjectCard