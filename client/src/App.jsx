import { useState } from 'react'
import axios from 'axios'

import './App.css'

function App() {

  const [location, setLocation] = useState("")

  // Weather States
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  function handleUserInput(e) {
    const userlocation = e.target.value;
    setLocation(userlocation)
    console.log(userlocation)

  }

  async function handleSearchAction() {
    console.log("clicked")
    if (!location.trim()) return;


    try {
      setIsLoading(true);

      const response = await axios.get(`http://localhost:9000/weather/${location}`)

      console.log(response)
      setWeather(response.data);
      setLocation("");

    } catch (error) {
      console.error("Failed to fetch weather", error);
    }finally{
      setIsLoading(false);
    }


  }

  return (

    <>
      <div className="container">
        <header className="weather-header">
          <h1>Weather</h1>
        </header>

        <section className="weather-body">

          <div className="user-location">
            <div className="search-box">
              <input
                type="text"
                className="get-user-input"
                placeholder="Enter city name"
                value={location}
                onChange={handleUserInput}
              />

              <button className="search-btn" onClick={handleSearchAction}>
                {isLoading ? "⏳" :"🔍"}
              </button>
            </div>

        {isLoading  && (
          <p className='loading-text'> Fethcing Weather...</p>
        )}

          </div>
          {weather && (
            <>
              <h2 className="location">{weather.city}</h2>
              <div className="location-details">
                <span className='state-country'>{weather.state}, {weather.country}</span>
              </div>


              <div className='weather-details'>
                <div className='left-side'>
                  <p>Feels Like: {weather.feelsLike}°C</p>
                  <p>Condition: {weather.condition}</p>
                </div>
                <div className="temp-container">
                  <output className='temperature'>{weather.temprature}</output>
                  <small className='temp-unit'>°C</small>
                </div>
                <div className="right-sdie">
                  <p>Wind: {weather.wind}</p>
                  <p>Humidity: {weather.humidity}</p>
                </div>


              </div>
            </>
          )}
        </section>
      </div>
    </>

  )
}

export default App
