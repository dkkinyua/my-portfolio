import React from 'react';
import { Link } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import ProjectCarousel from './ProjectCarousel';

const skills = [
    'Languages: Python (Django, Flask), SQL',
    'API Development and Consumption using requests',
    'Web Scraping using beautifulsoup, Selenium',
    'Data Storage: mySQL, PostgreSQL, MongoDB, AWS',
    'Data Management Tools: Apache Airflow, Apache Spark, Apache Kafka',
    'Data Warehousing: Snowflake',
    'ETL and ELT Pipeline Development.',
    'Exploratory Data Analysis using pandas, Numpy, plotly',
    'Data Visualization: Tableau, Grafana, PowerBI',
    'Version Control: Git',
    'CI/CD: Github Actions',
];

const experienceData = [
    {
        title: 'Data Engineer',
        company: 'Stanbic Bank Kenya',
        period: 'Apr 2026 - Present',
        achievements: [
            'Led migration from legacy SQL Stored Procedures in Oracle\'s Enterprise Data Warehouse to production-grade Airflow/Python pipelines, improving reliability and observability',
            'Built real-time Kafka streaming pipelines from core banking systems to silver/gold layer targets; monitored via Grafana, maintaining 99% uptime across production pipelines',
            'Implemented data reconciliation and audit frameworks supporting CBK regulatory reporting (GDI, Regtech); collaborated with cross-functional teams across Kenya and South Africa, earning commendation for delivery standards'
        ]
    },
    {
        title: 'Data Engineer',
        company: 'Data Science East Africa',
        period: 'May 2024 - Mar 2026',
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

function Main() {
    const linkClass = 'underline underline-offset-4 hover:text-primary';

    return (
        <div className='space-y-8'>
            {/* Skills */}
            <Card>
                <CardHeader>
                    <CardTitle className='text-2xl'>Skills</CardTitle>
                    <CardDescription>I am well versed and skilled in the following areas</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <ul className='list-disc space-y-1 pl-5 text-sm sm:columns-2 sm:text-base'>
                        {skills.map((skill) => (
                            <li key={skill} className='break-inside-avoid'>{skill}</li>
                        ))}
                    </ul>
                    <p className='text-sm text-muted-foreground'>
                        Check my projects here or in my <a href='https://github.com/dkkinyua' className={linkClass}>GitHub</a>!
                    </p>
                </CardContent>
                <CardFooter className='justify-end'>
                    <Button asChild>
                        <Link to='/projects'><i className='fa-solid fa-list-check'></i> Projects</Link>
                    </Button>
                </CardFooter>
            </Card>

            {/* Experience */}
            <Card>
                <CardHeader>
                    <CardTitle className='text-2xl'>Experience</CardTitle>
                </CardHeader>
                <CardContent>
                    <ol className='relative ml-2 border-l'>
                        {experienceData.map((exp, index) => (
                            <li key={index} className='ml-6 pb-8 last:pb-0'>
                                <span className='absolute -left-[6px] mt-1.5 h-3 w-3 rounded-full border-2 border-background bg-primary ring-1 ring-border' />
                                <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
                                    <h3 className='text-lg font-semibold'>{exp.title}</h3>
                                    <Badge variant='secondary' className='font-normal'>{exp.period}</Badge>
                                </div>
                                <p className='mb-3 text-sm text-muted-foreground'>{exp.company}</p>
                                {exp.description && <p className='mb-2 text-sm'>{exp.description}</p>}
                                <ul className='list-disc space-y-1.5 pl-5 text-sm'>
                                    {exp.achievements.map((achievement, i) => (
                                        <li key={i}>{achievement}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ol>
                </CardContent>
            </Card>

            {/* Project carousel */}
            <ProjectCarousel />

            <div className='grid gap-6 md:grid-cols-3'>
                <Card className='flex flex-col'>
                    <CardHeader>
                        <CardTitle className='text-2xl'>Blog</CardTitle>
                    </CardHeader>
                    <CardContent className='flex-1 text-sm'>
                        I'll be writing blogs about data analysis, data engineering, engineering, and other topics on my portfolio.
                        Keep up with the latest tech trends, and innovations in the dataverse.
                        My blog will also keep me sharp in development, so feel free to follow along on this journey!
                        Subscribe to my blog to get the latest updates as soon as they come out by clicking the button below!
                    </CardContent>
                    <CardFooter className='justify-end'>
                        <Button asChild>
                            <Link to='/posts'><i className='fa-solid fa-book-open-reader'></i> Blog</Link>
                        </Button>
                    </CardFooter>
                </Card>

                <Card className='flex flex-col'>
                    <CardHeader>
                        <CardTitle className='text-2xl'>Contact Me</CardTitle>
                    </CardHeader>
                    <CardContent className='flex-1 text-sm'>
                        If you have any queries, compliments, complaints (I hope you have none), or you would want to collaborate on a project, please contact me in the form provided by pressing the button alongside or DM me on any of my social media accounts in the top of the page.
                    </CardContent>
                    <CardFooter className='justify-end'>
                        <Button asChild>
                            <Link to='/contact-me'><i className='fa-regular fa-paper-plane'></i> Contact Me</Link>
                        </Button>
                    </CardFooter>
                </Card>

                <Card className='flex flex-col'>
                    <CardHeader>
                        <CardTitle className='text-2xl'>Download Resume</CardTitle>
                    </CardHeader>
                    <CardContent className='flex-1 text-sm'>
                        If you want to take a look at my resume, click the button below to download my cv in .pdf format
                    </CardContent>
                    <CardFooter className='justify-end'>
                        <Button asChild>
                            <a href='/docs/denzel-kinyua-de-resume.docx' download><i className='fa-solid fa-arrow-down'></i> Download Resume</a>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

export default Main;
