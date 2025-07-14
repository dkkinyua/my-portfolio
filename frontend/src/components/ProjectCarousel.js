import React, { useEffect, useState } from 'react';
import { Carousel, Card, Button } from 'react-bootstrap';

const projectData = [
    {
        title: 'End to end Earthquake Monitoring Data Pipeline visualized on Grafana',
        description: 'This project contains an end-to-end data pipeline that extracts data from the USGS Earthquake API, loads into a MySQL database, connects it to a Kafka topic using a MySQL CDC Connector, sinks the data into a PostgreSQL database using a Postgres Sink Connector fully hosted on Confluent and visualizes real-time data on a Grafana Cloud dashboard. The script is run automatically on an hourly basis by Apache Airflow.',
        tech: 'Python, pandas, requests, SQLAlchemy, psycopg2-binary, openpyxl',
        image: 'https://res.cloudinary.com/depbmpoam/image/upload/v1752505611/ChatGPT_Image_Jul_14_2025_12_33_52_PM_ecfj3b.png',
        links: [
            { href: 'https://deecodes.grafana.net/public-dashboards/d71fa80f57fb4d68b98a04197f2c44b6', icon: 'fa-solid fa-chart-line', text: 'Dashboard' },
            { href: 'https://github.com/dkkinyua/EarthquakeMonitoringPipeline', icon: 'fa-brands fa-github', text: 'GitHub' }
        ]
    },
    {
        title: 'End to end Cryptocurrency Data Pipeline with Change Data Capture (CDC)',
        description: "This project implements a pipeline to extract cryptocurrency market data from Binance, load it into a PostgreSQL database, capture database changes by Change Data Capture (CDC) method using Debezium and Kafka, and stream the data into Apache Cassandra using PySpark Streaming.",
        tech: 'Python, pandas, requests, SQLAlchemy, psycopg2-binary, Debezium, Kafka Connect, PostgreSQL, Apache Cassandra, Microsoft Azure',
        image: 'data:image/png;base64,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',
        links: [
            { href: 'https://github.com/dkkinyua/BinanceCryptoPipeline', icon: 'fa-brands fa-github', text: 'GitHub' }
        ]
    },
    {
        title: 'eazyetl',
        description: 'EazyETL is a lightweight Python package for building end-to-end ETL pipelines using static methods.',
        tech: 'Python, pandas, requests, SQLAlchemy, psycopg2-binary, openpyxl',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_hbrASuqT8TQ59ofn3yQAlQrXzgegwirDw&s',
        links: [
            { href: 'https://pypi.org/project/eazyetl', icon: 'fa-brands fa-python', text: 'PyPI' },
            { href: 'https://github.com/dkkinyua/eazyetl', icon: 'fa-brands fa-github', text: 'GitHub' }
        ]
    },
    {
        title: 'House Data Scraping ETL Pipeline',
        description: 'This pipeline scrapes over 2000 real estate listings using BeautifulSoup, transforms data using dbt, and loads it into Snowflake. Runs daily with Airflow.',
        tech: 'Python, BeautifulSoup, dbt, Snowflake, Airflow',
        image: 'images/Blue Minimalist Real Estate YouTube Thumbnail (2).png',
        links: [
            { href: 'https://github.com/dkkinyua/house-etl-pipeline', icon: 'fa-brands fa-github', text: 'GitHub' }
        ]
    },
    {
        title: 'Distrikt Arts',
        description: 'Specializes in handcrafted beaded accessories representing cultures and U.S. states.',
        image: 'images/Screenshot 2025-05-02 113340.png',
        links: [
            { href: 'https://distriktarts.net', icon: 'fa-solid fa-location-arrow', text: 'Check it out' }
        ]
    },
    {
        title: 'Sales Rates API',
        description: 'This API calculates sales tax rates in U.S. states using a custom JSON file generated with ChatGPT.',
        image: 'images/Teal and Orange Gradient Abstract Tech Conference Poster (1).png',
        links: [
            { href: 'https://tax-rates-api.onrender.com', icon: 'fa-solid fa-location-arrow', text: 'Check it out' }
        ]
    }
];

function ProjectCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % projectData.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isPaused]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % projectData.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + projectData.length) % projectData.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const handleLinkClick = (e, url) => {
        e.stopPropagation();
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div 
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="d-flex flex-column align-items-center"
        >
            <div className="position-relative w-75">
                <Carousel activeIndex={currentSlide} controls={false} indicators={false} interval={null}>
                    {projectData.map((project, idx) => (
                        <Carousel.Item key={idx}>
                            <Card className="p-3">
                                <Card.Img variant="top" src={project.image} alt={project.title} style={{ height: '300px', objectFit: 'cover' }} />
                                <Card.Body>
                                    <Card.Title>{project.title}</Card.Title>
                                    <Card.Text>{project.description}</Card.Text>
                                    {project.tech && (
                                        <Card.Text><strong>Tech Stack:</strong> {project.tech}</Card.Text>
                                    )}
                                    <div className="d-flex gap-2 flex-wrap">
                                        {project.links.map((link, i) => (
                                            <Button key={i} variant="dark" onClick={(e) => handleLinkClick(e, link.href)}>
                                                <i className={link.icon} style={{ marginRight: '8px' }}></i>{link.text}
                                            </Button>
                                        ))}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Carousel.Item>
                    ))}
                </Carousel>

                <Button variant="dark" onClick={prevSlide} className="position-absolute top-50 start-0 translate-middle-y">
                    &#8592;
                </Button>
                <Button variant="dark" onClick={nextSlide} className="position-absolute top-50 end-0 translate-middle-y">
                    &#8594;
                </Button>
            </div>
            <div className="d-flex justify-content-center mt-3 gap-2">
                {projectData.map((_, index) => (
                    <Button
                        key={index}
                        onClick={() => goToSlide(index)}
                        variant={index === currentSlide ? 'dark' : 'secondary'}
                        className="rounded-circle p-2"
                        style={{ width: '10px', height: '10px' }}
                    ></Button>
                ))}
            </div>
        </div>
    );
}

export default ProjectCarousel;
