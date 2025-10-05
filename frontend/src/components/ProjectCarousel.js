import React, { useEffect, useState } from 'react';
import { Carousel, Card, Button } from 'react-bootstrap';

const projectData = [
    {
        title: 'Real-Time Fraud Detection System',
        description: 'A real-time fraud detection system leveraging Kafka, Python, and ML techniques to flag anomalies in streaming transactions for financial security.',
        tech: 'Kafka, Python, PySpark, PostgreSQL, Machine Learning',
        image: "https://www.consultancy-me.com/illustrations/news/spotlight/2023-11-23-120124299-fraud_detection_spot.jpg",
        links: [
            { href: 'https://github.com/dkkinyua/FraudDetectionSystem', icon: 'fa-brands fa-github', text: 'GitHub' }
        ]
    },
    {
        title: 'Reddit Sentiment Analysis Pipeline',
        description: 'An Airflow + Kafka pipeline that streams Reddit comments, applies sentiment analysis in real-time, and visualizes metrics with Grafana and Prometheus.',
        tech: 'Python, Airflow, Kafka, PRAW, VaderSentiment, Grafana, Prometheus',
        image: "https://www.malwarebytes.com/wp-content/uploads/sites/2/2025/03/reddit.jpg?w=1200",
        links: [
            { href: 'https://github.com/dkkinyua/reddit-sentiment-pipeline', icon: 'fa-brands fa-github', text: 'GitHub' }
        ]
    },
    {
        title: 'End to end Cryptocurrency Data Pipeline with Change Data Capture (CDC)',
        description: "This project implements a pipeline to extract cryptocurrency market data from Binance, load it into a PostgreSQL database, capture database changes by Change Data Capture (CDC) method using Debezium and Kafka, and stream the data into Apache Cassandra using PySpark Streaming.",
        tech: 'Python, pandas, requests, SQLAlchemy, psycopg2-binary, Debezium, Kafka, PostgreSQL, Apache Cassandra, Microsoft Azure',
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxwbXlFz_QprfQUwt40vzcSxWWcDqsNj71Lw&s",
        links: [
            { href: 'https://github.com/dkkinyua/BinanceWebsocketPipeline', icon: 'fa-brands fa-github', text: 'GitHub' }
        ]
    },
    {
        title: 'Food Prices & Inflation ETL Pipeline',
        description: 'Monthly pipeline that downloads food price datasets from HDX, processes them with pandas, loads into a database, and builds inflation indicators. Orchestrated with Apache Airflow.',
        tech: 'Python, pandas, Airflow, PostgreSQL',
        image: "https://uzalendonews.co.ke/wp-content/uploads/2022/08/Inflation-in-Kenya.jpeg",
        links: [
            { href: 'https://github.com/dkkinyua/FoodPricesMonitoring', icon: 'fa-brands fa-github', text: 'GitHub' }
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
                <h2>Projects:</h2>
                <p>Explore some of the projects I've done</p>
                <Carousel activeIndex={currentSlide} controls={false} indicators={false} interval={null}>
                    {projectData.map((project, idx) => (
                        <Carousel.Item key={idx}>
                            <Card className="p-3 border-0">
                                <Card.Img 
                                    variant="top" 
                                    src={project.image} 
                                    alt={project.title} 
                                    style={{ 
                                        height: '300px', 
                                        width: '100%',
                                        objectFit: 'contain',
                                        backgroundColor: '#f8f9fa'
                                    }} 
                                />
                                <Card.Body>
                                    <Card.Title>{project.title}</Card.Title>
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
        </div>
    );
}

export default ProjectCarousel;