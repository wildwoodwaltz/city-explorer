import React from  'react';
import Form, { FormGroup, FormLabel, FormText } from 'react-bootstrap'

class Cityform extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      city: ''
    };
  }
  
handleCityInput = (e) => {
 let citySubmit = e.target.value;
  this.setState ({
    city: citySubmit,
  });
};

  render(){
  return (
    <FormGroup>
      <FormLabel>Pick a City</FormLabel>
      <FormText 
      onChange={this.handleCityInput}>

      </FormText>
    </FormGroup>
       
  );
}
}
export default Cityform;