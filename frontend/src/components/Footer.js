import React from 'react'

function Footer() {
    const footerStyles = {
        backgroundColor: '#E5E4E2',
        height: '50px',
    }

    return (
        <footer style={footerStyles} className='justify-content-center text-center'>
            Made by <i class="fa-solid fa-heart"></i> by dkkinyua. &copy; 2024, All Rights Reserved
        </footer>
    )
}

export default Footer
