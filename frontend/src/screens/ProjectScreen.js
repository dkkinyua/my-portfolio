import React from 'react'

import ProjectCard from '../components/ProjectCard'

function ProjectScreen() {
  return (
    <div className='mx-auto w-full max-w-5xl px-4 py-6 sm:px-6'>
      <h1 className='mb-6 text-center text-3xl font-bold tracking-tight'>Projects</h1>
      <ProjectCard />
    </div>
  )
}

export default ProjectScreen
