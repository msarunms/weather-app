import logo from './logo.svg';
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import "weather-icons/css/weather-icons.css";
import Weather from './app_component/weather.component';
import Form from './app_component/form.component';
import axios from 'axios';
//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
 const API_key = "3e911f6f43ce76222d96920333baffb4";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: "",
      country: "",
      icon: "",
      main: "",
      celsius: null,
      temp_max: null,
      temp_min: null,
      description: "",
      icon: "",
      
      error: false
    };
    
  }

  
  
  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  // getCountry = async()=>{
  //   const api_call2 = await fetch(`https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json`);

  //   var response2 = await api_call2.json();
  
  // } 
  async componentDidMount() {
    var city = "Chennai";
    var country = "Tamil nadu"
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`)
    const response = await api_call.json();

    this.setState({
      city :`${response.name}`,
      country : response.sys.country,
      //celsius :response.main.temp,
      celsius: this.calCelsius(response.main.temp),
      temp_max: this.calCelsius(response.main.temp_max),
      temp_min: this.calCelsius(response.main.temp_min),
      description: response.weather[0].description,
      icon: response.weather[0].icon,
      error: false

    })
  }
  
  getWeather = async(e)=>{

    e.preventDefault();

    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;
  if (country && city) {
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);

    const response = await api_call.json();

    this.setState({
      city :`${response.name}`,
      country : response.sys.country,
      //celsius :response.main.temp,
      celsius: this.calCelsius(response.main.temp),
      temp_max: this.calCelsius(response.main.temp_max),
      temp_min: this.calCelsius(response.main.temp_min),
      description: response.weather[0].description,
      icon: response.weather[0].icon,
      error: false

    })
    
  }else{
    this.setState({
      error: true
    });
  }  
  }

  render(){
    return (
      <div className="App">
        <Form loadweather = {this.getWeather} error={this.state.error} city={this.state.city} country={this.state.country}/>
        <Weather 
          city={this.state.city} 
          country={this.state.country} 
          temp_celsius ={this.state.celsius} 
          temp_min={this.state.temp_min} 
          temp_max ={this.state.temp_max} 
          description ={this.state.description}
          weathericon = {this.state.icon}
        />
      </div>
    );
  }
}

export default App;

