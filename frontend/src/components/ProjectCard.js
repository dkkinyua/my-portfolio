import React from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { Toaster } from 'react-hot-toast'

function ProjectCard() {
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
                            <h2>1. Distrikt Arts</h2>
                        </Card.Title>
                        <Card.Body className="d-flex flex-column" style={textStyle}>
                            <p>Distrikt Arts is a unique brand specializing in handcrafted beaded accessories, including anklets, chokers, necklaces, and armbands. Each piece is designed to celebrate diverse cultures, representing different countries and U.S. states. With a commitment to artistry and cultural connection, Distrikt Arts’ collections bring a vibrant blend of tradition and modern style to every accessory.</p>
                            <div className="d-flex justify-content-end mt-3">
                                <a href='https://distriktarts.net' target="_blank" rel="noopener noreferrer">
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
                            <h2>2. Sales Rates API</h2>
                        </Card.Title>
                        <Card.Body className="d-flex flex-column" style={textStyle}>
                            <p>This API calculates the sales tax rates in all U.S. states. There's a funny backstory to this. I didn't want to pay $15 to use an API for a website, so I created this API to do so. I update the tax.json file manually by prompting ChatGPT to provide me with the tax rates every day.</p>
                            <div className="d-flex justify-content-end mt-3">
                                <a href='https://tax-rates-api.onrender.com' target="_blank" rel="noopener noreferrer">
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
                            <h2>3. Organic Tents Technology.</h2>
                        </Card.Title>
                        <Card.Body className="d-flex flex-column" style={textStyle}>
                            <p>Organic Tents Technology specializes in high-quality tents, shades, canopies, and artificial grass solutions for versatile outdoor needs. Their products combine durability with eco-friendly design, ideal for events, leisure, and business spaces. They focus on innovative, sustainable materials to provide functional and aesthetically pleasing outdoor coverage.</p>
                            <div className="d-flex justify-content-end mt-3">
                                <a href='https://www.organictentstechnology.co.ke' target="_blank" rel="noopener noreferrer">
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

export default ProjectCard