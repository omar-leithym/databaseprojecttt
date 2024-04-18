import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from './authSlice';  // Ensure these are correctly imported

const Login = () => {
    const [userCredentials, setUserCredentials] = useState({
        username: '',
        email: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(userCredentials));
    };

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        if (isSuccess || user) {
            navigate('/');
        }
        return () => {
            dispatch(reset());
        };
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    return (
        <Container className="main">
            <h1>Log In</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        name="username"
                        value={userCredentials.username}
                        placeholder="Enter Username"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        name="email"
                        type="email"
                        value={userCredentials.email}
                        placeholder="Enter Email"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Log In
                </Button>
            </Form>
            {isError && <Alert variant="danger">{message}</Alert>}
        </Container>
    );
};

export default Login;