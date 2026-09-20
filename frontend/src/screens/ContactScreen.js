import React from 'react'

import ContactForm from '../components/ContactForm'

function ContactScreen() {
    return (
        <div className='mx-auto w-full max-w-xl px-4 py-6 sm:px-6'>
            <h1 className='text-center text-3xl font-bold tracking-tight'>Contact Me</h1>
            <p className='mb-6 mt-2 text-center text-sm text-muted-foreground'>
                Use the form below to contact me via email and I will return your email in less than 12 hours, or you can contact me via my social media in the links at the top of the page.
            </p>
            <ContactForm />
        </div>
    )
}

export default ContactScreen
