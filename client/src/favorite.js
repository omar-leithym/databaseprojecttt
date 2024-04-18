<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const Favorites = () => {
    const [channels, setChannels] = useState([]);
    const [latitude, setLatitude] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [submitPressed, setSubmitPressed] = useState(false);

    const userEmail = JSON.parse(localStorage.getItem('user')).email;

    useEffect(() => {
        if (submitPressed) {
            fetchFavorites(userEmail, latitude);
        }
        else {
            fetchFavorites(userEmail);
        }
    }, [submitPressed]);

    const fetchFavorites = async (email, lat) => {
        setLoading(true);
        let url = `/api/favorites/${email}`;
        if (submitPressed && lat) {
            url += `/${lat}`;
        }
        try {
            console.log(url)
            const response = await axios.get(url);
            setChannels(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching favorite channels:', error);
            setError('Failed to fetch favorite channels');
            setLoading(false);
        }
    };

    const handleLatitudeChange = (e) => {
        setLatitude(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitPressed(true);
        fetchFavorites(userEmail, latitude);
    };

    return (
        <Container className="main">
            <h1>Favorite Channels</h1>
            <h1>Write your longitude in a form like: (170.0W)</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control
                        name="latitude"
                        value={latitude}
                        placeholder="Enter Longitude"
                        onChange={handleLatitudeChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Search by Longitude
                </Button>
            </Form>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <>
                    <h3>Channel Name - Frequency - Encryption (if exists)</h3>
                    <ul>
                        {channels.map((channel, index) => (
                            <li key={index}>{channel.channelname} - {channel.frequency} - {channel.encryption}</li>
                        ))}
                    </ul>
                </>
            )}
        </Container>
    );
};

=======
import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const Favorites = () => {
    const [channels, setChannels] = useState([]);
    const [latitude, setLatitude] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [submitPressed, setSubmitPressed] = useState(false);

    const userEmail = JSON.parse(localStorage.getItem('user')).email;

    useEffect(() => {
        if (submitPressed) {
            fetchFavorites(userEmail, latitude);
        }
        else {
            fetchFavorites(userEmail);
        }
    }, [submitPressed]);

    const fetchFavorites = async (email, lat) => {
        setLoading(true);
        let url = `/api/favorites/${email}`;
        if (submitPressed && lat) {
            url += `/${lat}`;
        }
        try {
            console.log(url)
            const response = await axios.get(url);
            setChannels(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching favorite channels:', error);
            setError('Failed to fetch favorite channels');
            setLoading(false);
        }
    };

    const handleLatitudeChange = (e) => {
        setLatitude(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitPressed(true);
        fetchFavorites(userEmail, latitude);
    };

    return (
        <Container className="main">
            <h1>Favorite Channels</h1>
            <h1>Write your longitude in a form like: (170.0W)</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control
                        name="latitude"
                        value={latitude}
                        placeholder="Enter Longitude"
                        onChange={handleLatitudeChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Search by Longitude
                </Button>
            </Form>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <>
                    <h3>Channel Name - Frequency - Encryption (if exists)</h3>
                    <ul>
                        {channels.map((channel, index) => (
                            <li key={index}>{channel.channelname} - {channel.frequency} - {channel.encryption}</li>
                        ))}
                    </ul>
                </>
            )}
        </Container>
    );
};

>>>>>>> 4159db5cea0b45c1f0572a8a0ce6b8144b330c2e
export default Favorites;