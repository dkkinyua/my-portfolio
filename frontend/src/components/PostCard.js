import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

function PostCard() {
    const cardStyle = {
        width: '95%',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.7)',
    }


    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect((
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
    ), [])

    if (loading) {
        <p>I'm loading please chill</p>
    }

    return (
        <>
            {posts.map((post) => (
                <Card style={cardStyle} key={post.id}>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Body>{post.content}</Card.Body>
                </Card>
            ))}
        </>
    )
}

export default PostCard