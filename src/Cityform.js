import React from  'react';
import {Form, FormGroup} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import './Cityform.css'


class Cityform extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cityData: [],
      error: false,
      errorMessage: '',
      lat: '',
      lon: '',
      mapurl:'',
    };
  };
handleCityCall = async (e) => {
  e.preventDefault();
try{
  let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.searchQuery}&format=json`);
  console.log(cityData.data[0].lat);
this.setState({
  cityData: cityData.data
});
console.log(this.state.cityData);
} catch (error) {
  console.log('error', error.response);
  this.setState({
    error: true,
    errorMessage: `An error has been caught: ${error.response.status}`
  });
}
}
handleGetMap = async (e) => {
  e.preventDefault();
  try{
    let check = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData[0].lat},${this.state.cityData[0].lon}&zoom=14`
    console.log(check)
  this.setState({
    mapurl: check
  })
  } catch (error) {
  console.log('error', error.response);
  this.setState({
    error: true,
    errorMessage: `An error has been caught: ${error.response.status}`
  });
  }
}

render(){
 let cityResults = this.state.cityData.map((a,b) => 
 <Card key={b}>
   <Card.Img variant="top" src={this.state.mapurl}/>
   <Card.Title>{a.display_name}</Card.Title> 
   <Card.Body>
   <Card.Text>{a.lat}</Card.Text>
   <Card.Text>{a.lon}</Card.Text>
   </Card.Body>
   <Button className="mapbutton" onClick={this.handleGetMap}>Get Map</Button>
   </Card>)
  return (
    <>
    <Form>
    <FormGroup>
      <Form.Label>Pick a City:</Form.Label>
      <Form.Control type="text" onChange={(e) => this.setState({ searchQuery: e.target.value })} placeholder="search for a city"/>
      <Button onClick={this.handleCityCall}>Explore!</Button>
    </FormGroup>
    </Form>
       
        {cityResults[0]}
 
    </>
  );
}
}

export default Cityform;