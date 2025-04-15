import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Container } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { JellyfishSpinner } from 'react-spinners-kit';

function PostScreen() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const textStyle = {
        fontFamily: "PT Mono, monospace",
        fontStyle: 'normal'
    }

    useEffect(() => {
        fetch(`https://dev.to/api/articles?username=dkkinyua`)
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
            .catch((error) => {
                toast.error('Failed to load posts, try reloading the page');
                console.error(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "100vh" }}>
                <JellyfishSpinner size={150} color='#4b4c56' loading={loading} />
            </div>
        );
    }

    return (
        <Container className='my-4'>
            <Toaster />
            <div style={textStyle} className='text-center'>
                <h2> BLOG </h2>
            </div>
            <Row>
                {posts.map((post) => (
                    <Col md={6} lg={4} key={post.id} className="mb-4">
                        <Card className='shadow-sm h-100'>
                            <Card.Img variant="top" src={post.cover_image || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAREAAAC4CAMAAADzLiguAAAAPFBMVEX///+rq6unp6fMzMykpKTp6enx8fHU1NS0tLS6urr6+vqwsLDHx8fPz8/w8PD19fXa2trh4eHl5eXAwMAzrysnAAADpklEQVR4nO2c2ZKDIBAAE6KJmsPr//91c69yKKREHav7dctl6YVhGJTdDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZqE5LMU1XbrvVupELUe9dO9t5PsFyZfuvY1FjWRL994GRnQeRs5NOj+rNpIVCzSMER2M6GBEByM6GNHBiI4cI+mhbdtLE12SFCO3XKnH36ryJnLDQoxU/xm2usZtWIaRWu1nUyLCSNnfh6moE0eEkYvqK4lavpBgpNA368ktYsMSjKSJbqSK2LAEI7VuRB0iNizBSGUYuURsWIIRc4zEXH8lGDkacSTm6YEEI7tMX2zKiA2LMFL185HAMJJWdcj2UIQRfZCEDJEyT5JkH7BcyzBSnrujJORY9r0BSPzXaxlGHv/pz5TJQoQUn4Mw5T1KhBi5x5LseUadnYJKRlcVPLLEGNkVt7qq0rASWtOZa7nno3KM/EB5/mGF2rSRvLdqe+Z1WzZy0Moq6ujz1IaNNJoQz1CyXSO9IPIeJD5ZyXaN6KXIJx6hZLNGKpuQ/Xl8A7BVI6nNx+MAbPTJjRopjAKCdyjZqJHWOmeeSsay+W0asQcRv1CySSM3t4/7IGmHH96ikW8JwKHkNPj0Fo3o2bvBYCiRayRt84u1a/WYkOHfK9bISam92lvW0qOZvRvzZqgwINXI+5zP0rd8dIgMHxwLNdI4+zYaRF643y6QaaT4nxlaxtXo538O3LJlGmk7fetlXKW9/ybuUCLSSC8l7WZchTt7N5S4QolEI1pK2sm4Tt5C7mPLEUoEGjH3tZ++OUoAjkHiKAwINGIWx86vHxTjmUhPib0wIM+IZV/7DpOhn/bZjyvEGbHOjGffQoLIG1thQJoRV3HsFhZEXqjWolyaEUdKqvLyl89hbYUBYUbcKWlYVP1i7p5lGfFOSb05G9JlGfHZ14ZhZiWijFwnF2IJJZKM1NP7eKCFEkFGLEfbk5D1sxJBRvz3tWFohQE5Rk6etaAflPQKA2KMpJFGyJNuYUCKkdJ1tD0JXfVSjFjfj5mMbigRYmToaHsSJf+FARlGftjXhvJ9j1GEEef7MdOhvu8xijASN4i8lXy+dJNgxPhOLw7vL80FGDnO4uN7FCbAyGx3xb0KA+s3cpntysnkGUpWb6Q8zcjjP7B6I7ODEZ1VGznfjrNzW7WRfbIA6zayFBjRWeWtxhU3X+vUi92Ofoh9CR0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMA2+AN7/TZH3Ls1kQAAAABJRU5ErkJggg=="} alt={post.title} />
                            <Card.Body>
                                <Card.Title style={{ fontFamily: "PT Mono, monospace", fontSize: "18px" }}>
                                    {post.title}
                                </Card.Title>
                                <Card.Text style={{ fontSize: "14px" }}>
                                    {post.description}
                                </Card.Text>
                                <a href={post.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
                                    Read Full Post
                                </a>
                            </Card.Body>
                            <Card.Footer>
                                <Row>
                                    <Col xs={4}><small>❤️ {post.public_reactions_count}</small></Col>
                                    <Col xs={4}><small>💬 {post.comments_count}</small></Col>
                                    <Col xs={4}><small>🔖 {post.positive_reactions_count}</small></Col>
                                </Row>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default PostScreen;
