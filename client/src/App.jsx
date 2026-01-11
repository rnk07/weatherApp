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
          <h2 className="location">
            Toronto
          </h2>
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
