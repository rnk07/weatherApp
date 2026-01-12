import { useState } from 'react'
import './App.css'

function App() {

  const [location, setLocation] = useState("")
  const [resultLocale, setResultLocale] = useState("")

  function handleUserInput(e) {
    const userlocation = e.target.value;
    setLocation(userlocation)
    console.log(userlocation)

  }

  function handleSearchAction() {
    console.log("clicked")
    if(!location.trim()) return;
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

            <h2 className="location">{resultLocale}</h2>
          </div>

          <div className="temp-container">
            <output className='temperature'>0</output>
            <small className='temp-unit'>°C</small>
          </div>
        </section>
      </div>
    </>
  )
}

export default App
