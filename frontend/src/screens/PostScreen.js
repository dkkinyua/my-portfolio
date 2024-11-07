import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Image, Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { JellyfishSpinner } from 'react-spinners-kit'

function PostScreen() {
    const [post, setPost] = useState()
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    const imageStyle = {
        width: "100%",
        height: "250px",
    }

    const outerDivStyle = {
        minHeight: "100vh"
    }

    const textStyle = {
        fontFamily: "PT Mono, monospace",
        fontStyle: 'italic'
    }

    const headerStyle = {
        fontFamily: "PT Mono, monospace",
        fontStyle: "italic",
        fontSize: "33px"
    }

    useEffect(() => {
        const baseURL = `https://myportfoliobackend-rirg.onrender.com/api/posts/${id}`

        axios
            .get(baseURL)
            .then((response) => {
                console.log(response.data);
                setPost(response.data);
                setLoading(false);
            })
            .catch((error) => {
                toast.error('Failed to load posts, try reloading page');
                console.error(error);
                setLoading(false);
            });

    }, [id])

    if (loading) {
        return <JellyfishSpinner size={150} color='#4b4c56' loading={loading} />;
    }

    return (
        <div style={outerDivStyle}>
            <div><Toaster /></div>

            <div>
                <Image src={post.image} alt={post.title} style={imageStyle} className='mb-2' fluid />
            </div>

            <div className='mx-2 mb-2' style={textStyle}>
                <h2 style={headerStyle}>{post.title}</h2>
                <Row>
                    <Col md={3}>
                        <p>Authored by: Denzel Kanyeki</p>
                    </Col>

                    <Col md={3}>
                        <p>Created on: {post.created_at.substring(0, 10)}</p>
                    </Col>

                    <Col md={3}>
                        <p>Likes: {post.likes}</p>
                    </Col>

                    <Col md={3}>
                        <p>Shared by: {post.shares}</p>
                    </Col>
                </Row>
            </div>

            <div className='mb-2'>
                <p>{post.content}</p>
            </div>
        </div>
    )
}

export default PostScreen