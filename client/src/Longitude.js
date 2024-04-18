<<<<<<< HEAD
import React, { useState } from 'react';
import { Button, Form, Container, Spinner } from 'react-bootstrap';
import axios from 'axios';

const Longitude = () => {
    const [longitude, setLongitude] = useState('');
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setLongitude(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.get(`/api/channels/${longitude}`);
            setChannels(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching channels:', error);
            setLoading(false);
        }
    };

    return (
        <Container className="main">
            <h1>Write your longitude in a form like: (170.0W)</h1>
            <Form id="form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control
                        name="longitude"
                        value={longitude}
                        placeholder="Enter Longitude"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Show Channels
                </Button>
            </Form>
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : channels.length > 0 && (
                <div>
                    <h2>Channels at {longitude}</h2>
                    <ul>
                        {channels.map((channel, index) => (
                            <li key={index}>{channel.channelname} - {channel.frequency}</li>
                        ))}
                    </ul>
                </div>
            )}
        </Container>
    );
};

=======
import React, { useState } from 'react';
import { Button, Form, Container, Spinner } from 'react-bootstrap';
import axios from 'axios';

const Longitude = () => {
    const [longitude, setLongitude] = useState('');
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setLongitude(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.get(`/api/channels/${longitude}`);
            setChannels(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching channels:', error);
            setLoading(false);
        }
    };

    return (
        <Container className="main">
            <h1>Write your longitude in a form like: (170.0W)</h1>
            <Form id="form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control
                        name="longitude"
                        value={longitude}
                        placeholder="Enter Longitude"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Show Channels
                </Button>
            </Form>
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : channels.length > 0 && (
                <div>
                    <h2>Channels at {longitude}</h2>
                    <ul>
                        {channels.map((channel, index) => (
                            <li key={index}>{channel.channelname} - {channel.frequency}</li>
                        ))}
                    </ul>
                </div>
            )}
        </Container>
    );
};

>>>>>>> 4159db5cea0b45c1f0572a8a0ce6b8144b330c2e
export default Longitude;