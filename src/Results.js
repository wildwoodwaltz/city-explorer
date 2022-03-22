import React from 'react';
import { Card } from 'react-bootstrap';
import './Results.css'

class Results extends React.Component {
  render() {

    let mapurl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.props.lat},${this.props.lon}&zoom=14`
    return (
      <>
        <Card>
          <Card.Img variant="top" src={mapurl} />
          <Card.Title>{this.props.display}</Card.Title>
          <Card.Body>
            <Card.Text>{this.props.lat}</Card.Text>
            <Card.Text>{this.props.lon}</Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
}
export default Results;