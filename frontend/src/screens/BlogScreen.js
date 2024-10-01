import React from 'react'

import PostCard from '../components/PostCard'

function BlogScreen() {
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
        height: '80vh'
    } 

    return (
        <>
            <div style={outerDivStyle}>
                <div style={textStyle} className='text-center'>
                    <h2> DENZEL'S BLOG </h2>
                </div>
                <div style={divStyle}>
                    <PostCard />
                </div>
            </div>
        </>

    )
}

export default BlogScreen