import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

function ContactForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const body = {
        'name': name,
        'email': email,
        'customer_message': message
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
           const response = await axios.post('https://myportfoliobackend-rirg.onrender.com/api/contact-me/', body)

           if (response.status === 200) {
            toast.success("Message delivered successfully")
            setName('')
            setEmail('')
            setMessage('')
           }
        } catch (error) {
            toast.error("There has been an error with sending your message")
            console.error(error)
        }
    }

    return (
        <>
            <Toaster />
            <Card>
                <CardContent className='p-6'>
                    <form onSubmit={submitHandler} className='space-y-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='name'>Your Name:</Label>
                            <Input id='name' type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='email'>Your Email:</Label>
                            <Input id='email' type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='message'>Your Message:</Label>
                            <Textarea id='message' rows={5} placeholder='Your Message' value={message} onChange={(e) => setMessage(e.target.value)} />
                        </div>
                        <Button type='submit'><i className='fa-regular fa-paper-plane'></i> Send Message</Button>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}

export default ContactForm
