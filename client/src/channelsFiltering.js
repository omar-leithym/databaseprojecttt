import React, { useState } from 'react';
import axios from 'axios';
import { Container, Card, Form, Button, Spinner } from 'react-bootstrap';

function FilteredChannels() {
    const [channels, setChannels] = useState([]);
    const [filters, setFilters] = useState({
        region: '',
        satellite: '',
        hd_sd: '',
        language: ''
    });
    const [loading, setLoading] = useState(false);

    const handleAddFavorite = (channelName, channelFrequency) => {
        const userEmail = JSON.parse(localStorage.getItem('user')).email
        axios.post('/add-favorite', {
            userEmail,
            channelName,
            channelFrequency
        })
        .then(() => {
        })
        .catch(error => {
            console.error('Failed to add favorite:', error);
        });
    };

    const fetchFilteredChannels = () => {
        setLoading(true);
        axios.get("/filtered-channels", { params: filters })
            .then(res => {
                setChannels(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchFilteredChannels();
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Region</Form.Label>
                    <Form.Control type="text" name="region" value={filters.region} onChange={handleFilterChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Satellite</Form.Label>
                    <Form.Control type="text" name="satellite" value={filters.satellite} onChange={handleFilterChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>HD/SD</Form.Label>
                    <Form.Control type="text" name="hd_sd" value={filters.hd_sd} onChange={handleFilterChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Language</Form.Label>
                    <Form.Control type="text" name="language" value={filters.language} onChange={handleFilterChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Apply Filters
                </Button>
            </Form>
            {loading ? (
                <div className="d-flex justify-content-center mt-3">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <div className="row mt-3">
                    {channels.map((channel, index) => (
                        <div key={index} className="col-lg-4 mb-4">
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{channel.Name}</Card.Title>
                                    <Card.Text>Satellite: {channel.SatelliteName}</Card.Text>
                                    <Card.Text>Frequency: {channel.Frequency}</Card.Text>
                                    <Card.Text>HD/SD: {channel.channelsystem}</Card.Text>
                                    <Card.Text>Language: {channel.Language}</Card.Text>
                                    <Button variant="success" onClick={() => handleAddFavorite(channel.Name, channel.Frequency)}>
                                        Add to Favorites
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
        </Container>
    );
}

export default FilteredChannels;