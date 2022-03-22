import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cityform from './Cityform';
import Results from './Results';
import Header from './Header';
import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cityData: [],
      mapurl: '',
      error: false,
    };
  };

  handleCityCall = async (city) => {
   try{
    let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${city}&format=json`);
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
    let cityResults = this.state.cityData.map((city, index) => {
      console.log(index)
      return(
      <Results
      key={index}
      display = {city.display_name}
      lat= {city.lat}
      lon={city.lon}
      />
      );
    }
  );
  return (
    <>
    <Header/>
    <Cityform
    handleCityCall={this.handleCityCall}
    />
    {cityResults}
        </>
  );
}
}
export default App;
