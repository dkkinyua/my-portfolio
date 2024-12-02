import React from 'react'

function Footer({ darkMode }) {
    const footerStyles = {
        backgroundColor: darkMode ? '#C19A6B' : '#C19A6B',
        height: '50px',
        color: darkMode ? '#E5E4E2' : '#000',
    };

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
