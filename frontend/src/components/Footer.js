import React from 'react'

function Footer() {
    return (
        <footer className='mt-12 border-t py-6 text-center text-sm text-muted-foreground'>
            Engineered with <i className='fa-solid fa-heart'></i> by dkkinyua. &copy; {new Date().getFullYear()}, All Rights Reserved
        </footer>
    )
}

export default Footer
