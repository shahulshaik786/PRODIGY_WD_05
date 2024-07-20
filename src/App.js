import React from 'react';
import Weather from './Weather';
import './App.css';

function App() {
  return (
    <div className="App">
      <video autoPlay muted loop id="background-video">
        <source src="https://cdn.pixabay.com/video/2015/10/23/1154-143492926_medium.mp4?width=1920&hash=a2322a0264c76f4785f40ebfdc98ceef3e1c60ee" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Weather />
    </div>
  );
}

export default App;
