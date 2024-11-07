import React, { useEffect, useState } from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { JellyfishSpinner } from "react-spinners-kit";
import axios from 'axios';

function PostCard() {
    const containerStyle = {
        display: 'flex',
        alignItems: 'stretch', // Ensures the card and image are the same height
        width: '98%',
        marginBottom: '20px', // Space between cards
    };

    const cardStyle = {
        flex: 1, // Takes the remaining space beside the image
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.7)',
        overflow: 'hidden',
    };

    const textStyle = {
        fontFamily: 'PT Mono, monospace',
        fontStyle: 'normal',
    };
    
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const baseURL = 'https://myportfoliobackend-rirg.onrender.com/api/posts/';

        axios
            .get(baseURL)
            .then((response) => {
                console.log(response.data);
                setPosts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                toast.error('Failed to load posts, try reloading page');
                console.error(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <JellyfishSpinner size={150} color='#4b4c56' loading={loading} />;
    }

    return (
        <Container fluid>
            <div>
                <Toaster />
            </div>
            {posts.map((post) => (
                <div style={containerStyle} key={post.id}>
                    {/* Card on the right side */}
                    <Card style={cardStyle}>
                        <Card.Title style={textStyle} className="p-3">
                            <h2>{post.title}</h2>
                        </Card.Title>
                        <Card.Body className="d-flex flex-column" style={textStyle}>
                            <h5>{post.description}</h5>
                            <div className="d-flex justify-content-end mt-3">
                                <Link to={`/posts/${post.id}`}>
                                    <Button variant="dark">
                                        <i className="fa-solid fa-book-open"></i> Read More
                                    </Button>
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </Container>
    );
}

export default PostCard;
