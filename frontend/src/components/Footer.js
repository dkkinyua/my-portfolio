import React from 'react'

function Footer() {
    const footerStyles = {
        backgroundColor: '#E5E4E2',
        height: '50px',
    }

    const textStyle = {
        fontFamily: "PT Mono, monospace",
        fontStyle: 'normal'
    }

    return (
        <footer style={footerStyles} className='justify-content-center text-center'>
            <h6 style={textStyle}>Engineered with <i class="fa-solid fa-heart"></i> by dkkinyua. &copy; 2024, All Rights Reserved</h6>
        </footer>
    )
}

export default Footer
