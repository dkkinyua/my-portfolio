import React from 'react'

import ProjectCard from '../components/ProjectCard'

function ProjectScreen() {

  const textStyle = {
    fontFamily: "PT Mono, monospace",
    fontStyle: 'normal'
  }

  const divStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }

  const outerDivStyle = {
    minHeight: '100vh'
  }

  return (
    <>
      <div style={outerDivStyle}>
        <div style={textStyle} className='text-center'>
          <h2> PROJECTS </h2>
        </div>
        <div style={divStyle}>
          <ProjectCard />
        </div>
      </div>
    </>
  )
}

export default ProjectScreen