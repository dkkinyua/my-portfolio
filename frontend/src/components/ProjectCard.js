import React from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { Toaster } from 'react-hot-toast'

function ProjectCard() {
    const containerStyle = {
        display: 'flex',
        alignItems: 'stretch',
        width: '98%',
        marginBottom: '20px',
    };

    const cardStyle = {
        flex: 1,
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.7)',
        overflow: 'hidden',
    };

    const textStyle = {
        fontFamily: 'PT Mono, monospace',
        fontStyle: 'normal',
    };

    return (
        <Container fluid>
            <div>
                <Toaster />
            </div>
            <div>

                {/* EazyETL */}
                <div style={containerStyle}>
                    <Card style={cardStyle}>
                        <Card.Title style={textStyle} className="p-3">
                            <h2>1. eazyetl</h2>
                        </Card.Title>
                        <Card.Body className="d-flex flex-column" style={textStyle}>
                            <p>EazyETL is a lightweight Python package for building end-to-end ETL pipelines using static methods. It offers reusable tools for extracting from CSVs, JSON, APIs, and databases; transforming with pandas; and loading into files or databases.</p>
                            <p><strong>Tech Stack:</strong> Python, pandas, requests, SQLAlchemy, psycopg2-binary, openpyxl</p>
                            <img
                                src="https://github.com/dkkinyua/eazyetl/raw/main/docs/demo.gif"
                                alt="EazyETL Demo"
                                style={{ width: '100%', borderRadius: '8px', marginBottom: '15px' }}
                            />
                            <div className="d-flex justify-content-end gap-3">
                                <a href='https://pypi.org/project/eazyetl' target="_blank" rel="noopener noreferrer">
                                    <Button variant="dark"><i className="fa-brands fa-python"></i> PyPI</Button>
                                </a>
                                <a href='https://github.com/dkkinyua/eazyetl' target="_blank" rel="noopener noreferrer">
                                    <Button variant="dark"><i className="fa-brands fa-github"></i> GitHub</Button>
                                </a>
                            </div>
                        </Card.Body>
                    </Card>
                </div>


                {/* House ETL Pipeline */}
                <div style={containerStyle}>
                    <Card style={cardStyle}>
                        <Card.Title style={textStyle} className="p-3">
                            <h2>2. House Data Scraping ETL Pipeline</h2>
                        </Card.Title>
                        <Card.Body className="d-flex flex-column" style={textStyle}>
                            <p>This pipeline scrapes real estate listings, transforms the data with pandas, and loads it into a PostgreSQL database. It’s fully automated with Apache Airflow and runs on a daily schedule.</p>
                            <p><strong>Tech Stack:</strong> Python, BeautifulSoup, pandas, PostgreSQL, Airflow</p>
                            <img
                                src="images\Blue Minimalist Real Estate YouTube Thumbnail (2).png"
                                alt="House ETL Demo"
                                style={{ width: '100%', borderRadius: '8px', marginBottom: '15px', height:'300px' }}
                            />
                            <div className="d-flex justify-content-end">
                                <a href='https://github.com/dkkinyua/house-etl-pipeline' target="_blank" rel="noopener noreferrer">
                                    <Button variant="dark"><i className="fa-brands fa-github"></i> GitHub</Button>
                                </a>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                {/* Distrikt Arts */}
                <div style={containerStyle}>
                    <Card style={cardStyle}>
                        <Card.Title style={textStyle} className="p-3">
                            <h2>3. Distrikt Arts</h2>
                        </Card.Title>
                        <Card.Body className="d-flex flex-column" style={textStyle}>
                            <p>Distrikt Arts is a unique brand specializing in handcrafted beaded accessories, including anklets, chokers, necklaces, and armbands. Each piece is designed to celebrate diverse cultures, representing different countries and U.S. states.</p>
                            <img
                                src="images\Screenshot 2025-05-02 113340.png"
                                alt="Distrikt Arts Screenshot"
                                style={{ width: '100%', borderRadius: '8px', marginBottom: '15px', height:'300px' }}
                            />
                            <div className="d-flex justify-content-end mt-3">
                                <a href='https://distriktarts.net' target="_blank" rel="noopener noreferrer">
                                    <Button variant="dark">
                                        <i className="fa-solid fa-location-arrow"></i> Check it out
                                    </Button>
                                </a>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                {/* Sales Rates API */}
                <div style={containerStyle}>
                    <Card style={cardStyle}>
                        <Card.Title style={textStyle} className="p-3">
                            <h2>2. Sales Rates API</h2>
                        </Card.Title>
                        <Card.Body className="d-flex flex-column" style={textStyle}>
                            <p>This API calculates sales tax rates in all U.S. states. Built as a workaround to avoid third-party API fees, it uses a manually updated JSON file generated by ChatGPT prompts.</p>
                            <img
                                src="images\Teal and Orange Gradient Abstract Tech Conference Poster (1).png"
                                alt="Sales Rates API Screenshot"
                                style={{ width: '100%', borderRadius: '8px', marginBottom: '15px', height:'300px' }}
                            />
                            <div className="d-flex justify-content-end mt-3">
                                <a href='https://tax-rates-api.onrender.com' target="_blank" rel="noopener noreferrer">
                                    <Button variant="dark">
                                        <i className="fa-solid fa-location-arrow"></i> Check it out
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
