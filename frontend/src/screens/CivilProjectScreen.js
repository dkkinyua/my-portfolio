import React from 'react'

import CivilProjectCard from '../components/CivilProjectCard'

function CivilProjectScreen() {

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
          <p className='mt-2'>Any calculations or testimonials will be provided upon request.</p>
        </div>
        <div style={divStyle}>
          <CivilProjectCard />
        </div>
      </div>
    </>
  )
}

export default CivilProjectScreen