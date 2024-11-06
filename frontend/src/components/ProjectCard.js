import React, { useEffect, useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { JellyfishSpinner } from 'react-spinners-kit'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

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

    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const baseURL = 'http://127.0.0.1:8000/api/projects/';

        axios
            .get(baseURL)
            .then((response) => {
                console.log(response.data);
                setProjects(response.data);
                setLoading(false);
            })
            .catch((error) => {
                toast.error('Failed to load projects, try reloading page');
                console.error(error);
                setLoading(false);
            });
    }, [])

    if (loading) {
        return <JellyfishSpinner size={150} color='#4b4c56' loading={loading} />;
    }


    return (
        <Container fluid>
            <div>
                <Toaster />
            </div>

            <div>
                {projects.map((project) => (
                    <div style={containerStyle} key={project.id}>
                        {/* Card on the right side */}
                        <Card style={cardStyle}>
                            <Card.Title style={textStyle} className="p-3">
                                <h2>{project.name}</h2>
                            </Card.Title>
                            <Card.Body className="d-flex flex-column" style={textStyle}>
                                <p>{project.description}</p>
                                <div className="d-flex justify-content-end mt-3">
                                    <a href={`${project.url}`} target="_blank" rel="noopener noreferrer">
                                        <Button variant="dark">
                                            <i class="fa-solid fa-location-arrow"></i> Check it out
                                        </Button>
                                    </a>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default ProjectCard