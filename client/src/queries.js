import {Card,Container} from 'react-bootstrap'
import axios from 'axios'
import { useEffect, useState } from 'react';

function Home() {
  const [topNetworksByChannels, setTopNetworksByChannels] = useState([]);
  const [topNetworksBySatellites, setTopNetworksBySatellites] = useState([]);
  const [topRockets, setTopRockets] = useState([]);
  const [growingSatellites, setGrowingSatellites] = useState([]);
  const [channelsByLanguage, setChannelsByLanguage] = useState([]);

  useEffect(() => {
    axios.get("/top-networks-by-channels")
      .then(res => {
        setTopNetworksByChannels(res.data);
      })
      .catch(err => {
        console.log("Error fetching top networks by channels:", err);
      });
    axios.get("/top-networks-by-satellites")
  .then(res => {
    console.log("Received data for top networks by satellites:", res.data);
    const processedData = res.data.map(network => ({
      ...network,
      AvgSatellitesPerChannel: parseFloat(network.AvgSatellitesPerChannel)
    }));
    setTopNetworksBySatellites(processedData);
  })
  .catch(err => {
    console.error("Error fetching top networks by satellites:", err);
  });
    axios.get("/top-rockets")
      .then(res => {
        setTopRockets(res.data);
      })
      .catch(err => {
        console.log("Error fetching top rockets:", err);
      });
    axios.get("/growing-satellites")
      .then(res => {
        setGrowingSatellites(res.data);
      })
      .catch(err => {
        console.log("Error fetching growing satellites:", err);
      });
    axios.get("/channels-by-language")
      .then(res => {
        const groupedByLanguage = res.data.reduce((acc, channel) => {
          acc[channel.language] = acc[channel.language] || [];
          acc[channel.language].push(channel);
          return acc;
        }, {});
        setChannelsByLanguage(groupedByLanguage);
      })
      .catch(err => {
        console.log("Error fetching channels by language:", err);
      });
  }, []);
  return (
    <Container className="d-flex flex-wrap justify-content-center">
      <div className="row">
        <h1>Top 5 TV Networks by Number of Channels</h1>
        {topNetworksByChannels.map((network, index) => (
          <div key={index} className="col-lg-4 mb-4">
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{network.name}</Card.Title>
                <Card.Text>
                  Number of Channels: {network.NumberOfChannels}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <div className="row">
        <h1>Top 5 TV Networks by Average Satellites per Channel</h1>
        {topNetworksBySatellites.map((network, index) => (
          <div key={index} className="col-lg-4 mb-4">
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{network.name}</Card.Title>
                <Card.Text>
                  Average Satellites per Channel: {Number.isFinite(network.AvgSatellitesPerChannel) ? network.AvgSatellitesPerChannel.toFixed(2) : 'N/A'}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

    <div className="row">
      <h1>Top 5 Rockets</h1>
      {topRockets.map((rocket, index) => (
        <div key={index} className="col-lg-4 mb-4">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{rocket.launchingrocket}</Card.Title>
              <Card.Text>
                Number of Satellites Launched: {rocket.NumberOfSatellites}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>

    <div className="row">
        <h1>Top 5 Growing Satellites</h1>
        {growingSatellites.map((satellite, index) => (
          <div key={index} className="col-lg-4 mb-4">
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{satellite.name}</Card.Title>
                <Card.Text>
                  Number of Channels: {satellite.NumberOfChannels}
                </Card.Text>
                <Card.Text>
                  Launch Date: {new Date(satellite.launchdate).toLocaleDateString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

        {Object.keys(channelsByLanguage).map((language) => (
        <div key={language}>
          <h1>Top 5 Channels with languages: {language} </h1>
          <div className="row">
            {channelsByLanguage[language].map((channel, index) => (
              <div key={index} className="col-lg-4 mb-4">
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>{channel.name}</Card.Title>
                    <Card.Text>
                      Satellite Count: {channel.satellitecount}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Container>
  );
}

export default Home;