import React, { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

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
    // Autoplay pauses on hover and stops for good once the user touches/drags,
    // so it never fights with someone reading on a phone.
    const autoplay = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
    );
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    return (
        <section>
            <Carousel
                opts={{ align: 'start', loop: true }}
                plugins={reduceMotion ? [] : [autoplay.current]}
            >
                <div className='mb-4 flex items-end justify-between gap-4'>
                    <div>
                        <h2 className='text-2xl font-semibold tracking-tight'>Projects</h2>
                        <p className='text-sm text-muted-foreground'>Explore some of the projects I've done</p>
                    </div>
                    <div className='flex shrink-0 gap-2'>
                        <CarouselPrevious className='static translate-y-0' />
                        <CarouselNext className='static translate-y-0' />
                    </div>
                </div>

                {/* Cards only stretch to equal height when several sit side by side */}
                <CarouselContent className='items-start md:items-stretch'>
                    {projectData.map((project, idx) => (
                        <CarouselItem key={idx} className='md:basis-1/2 lg:basis-1/3'>
                            <Card className='flex flex-col overflow-hidden md:h-full'>
                                <div className='aspect-video bg-muted'>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        loading='lazy'
                                        draggable={false}
                                        className='h-full w-full select-none object-contain'
                                    />
                                </div>
                                <CardHeader className='pb-3'>
                                    <CardTitle className='text-base leading-snug'>{project.title}</CardTitle>
                                </CardHeader>
                                <CardContent className='flex-1'>
                                    {project.tech && (
                                        <div className='flex flex-wrap gap-1.5'>
                                            {project.tech.split(', ').map((tech) => (
                                                <Badge key={tech} variant='secondary' className='font-normal'>{tech}</Badge>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                                <CardFooter className='flex-wrap gap-2'>
                                    {project.links.map((link, i) => (
                                        <Button key={i} asChild size='sm'>
                                            <a href={link.href} target='_blank' rel='noopener noreferrer'>
                                                <i className={link.icon}></i> {link.text}
                                            </a>
                                        </Button>
                                    ))}
                                </CardFooter>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>
    );
}

export default ProjectCarousel;
