import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'

function PostCard() {
    const cardStyle = {
        width: '95%',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.7)',
    }

    const textStyle = {
        fontFamily: "PT Mono, monospace",
        fontStyle: 'normal'
    }

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:8000/api/posts')
            .then(response => {
                setPosts(response.data)
                setLoading(false)
            })
            .catch(error => {
                toast.error('Failed to load posts, try reloading page')
                console.error(error)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <p>I'm loading, please chill</p>
    }

    return (
        <>
            <div><Toaster /></div>
            {posts.map((post) => (
                <Card style={cardStyle} key={post.id} className='mb-3'>
                    <Card.Title style={textStyle}>
                        <h2 className='mx-3'>{post.title}</h2>
                    </Card.Title>
                    <Card.Body className="d-flex flex-column" style={textStyle}>
                        <h5>{post.description}</h5>
                        <div className="d-flex justify-content-end mt-3">
                            <Link to={`/posts/${post.id}`}>
                                <Button variant='dark'>
                                    <i className="fa-solid fa-book-open"></i> Read More
                                </Button>
                            </Link>
                        </div>
                        <p>dkkinyua, Created at: {post.created_at}</p>
                    </Card.Body>
                </Card>
            ))}
        </>
    )
}

export default PostCard
