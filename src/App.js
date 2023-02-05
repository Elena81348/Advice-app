import './App.css';
import { useEffect,useState,useRef } from 'react';
import video from './video.mp4'
import song from'./music.mp3'

function App() {
const [advice, setAdvice]=useState('');
const refAudio=useRef();
const[paused, setPaused]=useState(true);

useEffect(()=>{
getAdvice()
},[])

    const getAdvice=async()=>{
    const responce=await fetch('http://www.boredapi.com/api/activity/ ')
    const data=await responce.json()
    console.log(data.activity)
    setAdvice(data.activity)
  }
  const handleplay=()=>{
    setPaused(!paused);
    paused?refAudio.current.play():refAudio.current.pause();
  }
  

  return (
    <div className="App">
      <div className='container'>
        <video autoPlay muted loop>
          <source src={video} type='video/mp4'/>
        </video>
      </div>
      <div>
        <audio  ref={refAudio} src={song}loop='loop'>
        </audio>
        <button className='cta' onClick={handleplay}>
          {paused?'play':'pause'}
        </button>
      </div>
      <div className='container'>
        <p>{advice}</p>
      </div>
      <div className='container'>
        <button onClick={getAdvice}>New tip</button>
      </div>
    </div>
  );
}

export default App;
