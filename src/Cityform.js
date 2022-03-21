import React from  'react';
import Form, { FormGroup, FormLabel, FormText } from 'react-bootstrap';
import axios from 'axios';

class Cityform extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      city: '',
      cityData: '',
      error: false,
      errorMessage: ''
    };
  };
  
handleCityInput = (e) => {
// get data from API

// save data into state
this.setState({
  city: e.target.value
});
}
handleSubmit = async (e) => {
  e.preventDefault();
try{
  let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);
this.setState({
  cityData: cityData.data
});
} catch (error) {
  console.log('error', error.response);
  this.setState({
    eroor: true,
    errorMessage: `An error has been caught: ${error.response.status}`
  })
}
}

  render(){
    let cityDataValues = this.state.city.map((acc, key) => {
      return <li key={key}>{acc}</li>
    })
  return (
    <>
    <FormGroup>
      <FormLabel>Pick a City:</FormLabel>
      <FormText 
      onChange={this.handleCityInput}/>
      <Form.Button onSubmit={this.handleSubmit}>Get City Data</Form.Button>
    </FormGroup>
       <ul>
        <li>{cityDataValues}</li>
       </ul>
    </>
  );
}
}

export default Cityform;