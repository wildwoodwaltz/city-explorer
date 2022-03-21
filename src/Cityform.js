import React from  'react';
import {Form, FormGroup} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from 'axios';

class Cityform extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cityData: [],
      error: false,
      errorMessage: '',
      lat: '',
      lon: '',
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

  render(){
 console.log(this.state.searchQuery)
 let cityResults = this.state.cityData.map((a,b) => <li key={b}><b>{a.display_name}</b> {a.lat}, {a.lon}</li>)
  return (
    <>
    <Form>
    <FormGroup>
      <Form.Label>Pick a City:</Form.Label>
      <Form.Control type="text" onChange={(e) => this.setState({ searchQuery: e.target.value })} placeholder="search for a city"/>
      <Button onClick={this.handleCityCall}>Explore</Button>
    </FormGroup>
    </Form>
       <ul>
        {cityResults[0]}
       </ul>
    </>
  );
}
}

export default Cityform;