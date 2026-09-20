import React from 'react'

import { Card, CardContent } from '@/components/ui/card'

function Intro() {
  return (
    <Card>
      <CardContent className='flex flex-col items-center gap-6 p-6 text-center sm:p-8'>
        <img
          src='https://cdn.dribbble.com/users/244516/screenshots/15180098/media/35301f78c0ba0d242a6703b927814e23.gif'
          alt='Profile GIF'
          className='h-56 w-full rounded-lg object-contain'
        />
        <div className='space-y-1'>
          <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>Denzel Kanyeki Kinyua</h1>
          <h2 className='text-base text-muted-foreground sm:text-lg'>Data Engineer | Big Data Enthusiast</h2>
        </div>
        <div className='max-w-3xl space-y-4 text-sm leading-relaxed sm:text-base'>
          <p>
            Data Engineer with 3+ years of combined software and data engineering experience, including 2+ years building production ETL/ELT pipelines, real-time streaming systems, and enterprise data warehousing in regulated banking environments. Proficient in Python, SQL, Kafka, Airflow, dbt, and Snowflake, with hands-on experience in AWS, star-schema data modeling, data governance, and idempotent pipeline design. Strong track record collaborating across regional, cross-functional teams
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default Intro
