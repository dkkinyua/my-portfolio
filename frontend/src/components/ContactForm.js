import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'


function ContactForm() {
    const outerDivStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    }

    const cardStyle = {
        width: '85%',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.7)',
    }

    const buttonStyle = {
        textAlign: 'right'
    }

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
           const response = await axios.post('http://localhost:8000/api/contact-me/', body)
           
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
            <div><Toaster /></div>
            <div style={outerDivStyle} className='mt-3 mb-3'>
                <Card style={cardStyle}>
                    <Card.Body>
                        <Form onSubmit={submitHandler}>
                            <Form.Group className='mb-2'>
                                <Form.Label>Your Name:</Form.Label>
                                <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Label>Your Email:</Form.Label>
                                <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Label>Your Message:</Form.Label>
                                <Form.Control as='textarea' rows={5} placeholder='Your Message' value={message} onChange={(e) => setMessage(e.target.value)} />
                            </Form.Group>
                            <Button type='submit' variant='dark' style={buttonStyle}><i class="fa-regular fa-paper-plane"></i> Send Message</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default ContactForm