import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from './authSlice';  // Ensure these are correctly imported from your Redux slice

const Register = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        gender: '',
        birthdate: '',
        location: '',
        region: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            console.error(message);
        }

        if (isSuccess || user) {
            navigate('/');  // Redirect on successful registration
        }

        dispatch(reset());  // Reset auth state on component unload
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(register(userData));
    };

    return (
        <Container className="main">
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        name="username"
                        value={userData.username}
                        placeholder="Enter Username"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        name="email"
                        value={userData.email}
                        type="email"
                        placeholder="Enter Email"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                        name="gender"
                        value={userData.gender}
                        placeholder="Gender"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Birthdate</Form.Label>
                    <Form.Control
                        name="birthdate"
                        value={userData.birthdate}
                        type="date"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        name="location"
                        value={userData.location}
                        placeholder="Location"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Region</Form.Label>
                    <Form.Control
                        name="region"
                        value={userData.region}
                        placeholder="Region"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            {isError && <Alert variant="danger">{message}</Alert>}
        </Container>
    );
};

export default Register;