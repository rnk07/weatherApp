import { useState } from 'react'
import './App.css'

function App() {

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
              />

              <button className="search-btn">
                🔍
              </button>
            </div>

            <h2 className="location">Toronto</h2>
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
