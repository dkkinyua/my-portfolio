import React from 'react'

import ContactForm from '../components/ContactForm'

function ContactScreen() {
    const textStyle = {
        fontFamily: "PT Mono, monospace",
        fontStyle: 'normal'
    }

    const outerDivStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '90vh'
    }

    return (
        <div style={outerDivStyle}>
            <div style={textStyle}>
                <h3 className='text-center'>
                    Contact Me
                </h3>
                <p className='text-center'>Use the form below to contact me via email and I will return your email in less than 12 hours, or you can contact me via my social media in the links at the top of the page.</p>
                <ContactForm />
            </div>
        </div>
    )
}

export default ContactScreen