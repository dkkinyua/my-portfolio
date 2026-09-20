import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { JellyfishSpinner } from "react-spinners-kit";
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

function PostCard() {
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
        <div className='space-y-6'>
            <Toaster />
            {posts.map((post) => (
                <Card key={post.id}>
                    <CardHeader>
                        <CardTitle className='text-xl'>{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent className='text-sm text-muted-foreground'>{post.description}</CardContent>
                    <CardFooter className='justify-end'>
                        <Button asChild>
                            <Link to={`/posts/${post.id}`}>
                                <i className='fa-solid fa-book-open'></i> Read More
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

export default PostCard;
