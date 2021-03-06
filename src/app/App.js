import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cityform from '../cityform/Cityform';
import Results from '../cityform/Results';
import Header from '../Header';
import axios from 'axios';
import Errormodal from '../modals/Errormodal';
import Weather from '../modals/Weather';
import Movie from '../modals/Movie';
import WeatherOne from '../modals/WeatherOne';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: [],
      mapurl: '',
      error: false,
      errorMessage: '',
      showModal: false,
      weatherData: ['sunny'],
      weatherModal: false,
      weatherModalOne: false,
      movieData:[''],
      movieModal: false,
    };
  };
  hideModal = () => {
    this.setState({
      showModal: false,
      weatherModal: false,
      movieModal: false,
      weatherModalOne: false,
    })
  }
  showModal = () => {
    this.setState({
      showModal: true,
    })
  }
  handleCityCall = async (city) => {
    try {
      let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${city}&format=json`);
      this.setState({
        cityData: cityData.data
      });
      // console.log(this.state.cityData);
    } catch (error) {
      // console.log('error', error.response);
      this.setState({
        error: true,
        showModal: true,
        errorMessage: `An error has been caught: ${error.response.status} ${error.response.statusText}`
      });
      // console.log(this.state.errorMessage);
    }
  }
  getWeather = async (city) => {
    try {
      let weatherCall = `${process.env.REACT_APP_SERVER}/weather?city=${city}`;
      let weatherData = await axios.get(weatherCall)
      this.setState({
        weatherData: weatherData.data,
      })
      this.setState({
        weatherModal: true,
      })
      // console.log(weatherData)
    } catch (error) {
      this.setState({
        error: true,
        showModal: true,
        errorMessage: `An error has been caught: ${error.response.status} ${error.response.statusText}`
      });
      // console.log(this.state.errorMessage);
    }
  }
  getWeatherOne = async (city) => {
    try {
      let weatherCall = `${process.env.REACT_APP_SERVER}/weather?city=${city}`;
      let weatherData = await axios.get(weatherCall)
      this.setState({
        weatherData: weatherData.data,
      })
      console.log(weatherData.data)
      this.setState({
        weatherModalOne: true,
      })
      // console.log(weatherData)
    } catch (error) {
      this.setState({
        error: true,
        showModal: true,
        errorMessage: `An error has been caught: ${error.response.status} ${error.response.statusText}`
      });
      // console.log(this.state.errorMessage);
    }
  }
    getInfo = () =>{
    this.props.getWeather(this.props.city.display_name.split(',')[0])
  }
  getMovies = async (city) => {
    try {
      let movieCall = `${process.env.REACT_APP_SERVER}/movies?city=${city}`;
      let movieData = await axios.get(movieCall)
      this.setState({
        movieData: movieData.data,
      })
      this.setState({
        movieModal: true,
      })
      // console.log(movieData)
    } catch (error) {
      this.setState({
        error: true,
        showModal: true,
        errorMessage: `An error has been caught: ${error.response.status} ${error.response.statusText}`
      });
      // console.log(this.state.errorMessage);
    }
  }
    render() {
      let cityResults = this.state.cityData.map((city, index) => {
        // console.log(index)
        return (
          <Results
            key={index}
            city={city}
            getWeather={this.getWeather}
            getMovies={this.getMovies}
            getWeatherOne={this.getWeatherOne}
          />
        );
      }
      );
      return (
        <>
          <Header />
          <Cityform
            handleCityCall={this.handleCityCall}
          />
          <main>
            {cityResults}
          </main>
          <Errormodal
            error={this.state.error}
            errorMessage={this.state.errorMessage}
            modalState={this.state.showModal}
            showModal={this.showModal}
            hideModal={this.hideModal}
          />
          <Weather
            weatherModal={this.state.weatherModal}
            hideModal={this.hideModal}
            weatherData={this.state.weatherData}
          />
                    <WeatherOne
            weatherModal={this.state.weatherModalOne}
            hideModal={this.hideModal}
            weatherResults={this.state.weatherData}
          />
          <Movie
            movieModal={this.state.movieModal}
            hideModal={this.hideModal}
            movieData={this.state.movieData}  
          />
        </>
      );
    }
  }
export default App;
