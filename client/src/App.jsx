import { useState } from 'react'
import axios from 'axios'

import './App.css'

function App() {

  const [location, setLocation] = useState("")
  const [resultLocale, setResultLocale] = useState("")
  const [temp, setTemp] = useState(0)
  const [province,setProvince] = useSate("")
  const [country,setCountry] =useState("")


  function handleUserInput(e) {
    const userlocation = e.target.value;
    setLocation(userlocation)
    console.log(userlocation)

  }

  async function handleSearchAction() {
    console.log("clicked")
    if (!location.trim()) return;


    try {

      const response = await axios.get(`http://localhost:9000/weather/${location}`)

      console.log(response)
      setTemp(response.data.temprature);
      setProvince(response.data.state);
      setCountry(response.data.country);

    } catch (error) {

    }


    setResultLocale(location);
    setLocation("")

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
                🔍
              </button>
            </div>



          </div>

          <h2 className="location">{resultLocale}</h2>
          <div className="location-details">
            <h6>{province}</h6>
            <h6>{country}</h6>
          </div>

          <div className='weather-details'>
            <div className='left-side'>
              <h4>Temp1:</h4>
              <h4>Temp1:</h4>
            </div>
            <div className="temp-container">
              <output className='temperature'>{temp}</output>
              <small className='temp-unit'>°C</small>
            </div>
            <div className="right-sdie">
              <h4>Temp1:</h4>
              <h4>Temp1:</h4>
            </div>


          </div>

        </section>
      </div>
    </>
  )
}

export default App
