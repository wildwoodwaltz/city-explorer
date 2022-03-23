import React from "react";
import { Modal } from "react-bootstrap";
import Weatherdata from './Weatherdata'

class Weather extends React.Component {

  render() {
    let weatherResults = this.props.weatherData.map((weather, index) => {
      console.log(index)
      console.log(weather)
      return (
       <Weatherdata
       key = {index}  
       weather={weather}
       />
      );
    }
    );
    return (
      <>
        <Modal
          show={this.props.weatherModal}
          onClick={this.props.hideWeatherModal}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body onClick={this.props.hideWeatherModal}>
            {weatherResults}
          </Modal.Body>
        </Modal> 
      </>
    )
  }
}
    export default Weather;