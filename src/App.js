
import './App.css';
import Info from './Info.js'
import React,{useState} from 'react';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import keys from './keys.js';

function App() {



  const [change, setChange]= useState('mumbai');
  const [weather, setWeather]= useState({});
  const [location,setLocation]=useState();
  const [flag,setFlag]=useState();
  const [flag2, setFlag2]= useState(false);

  const input= e=>{
    setChange(e.target.value);

  }

  const searching= e=>{
    setFlag2(false);
    setFlag('Loading...');
    fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'+change+'.json?access_token='+keys.geocode+'&limit=1%27')
   .then(res => res.json())
   .then((result) => {
      console.log(result);
      setLocation(result);
      if(result.features.length===0 ){
        setFlag('Please enter a valid location!')}
      else{
        fetch('http://api.weatherstack.com/current?access_key='+keys.weatherstack+'&query='+result.features[0].center[1]+','+result.features[0].center[0])
        .then(res => res.json())
        .then((result) => {
          setWeather(result);
          setFlag2(true);
          console.log(result.location.localtime.substr(-5,2))
              })
          }
        })
      }


/*  function clock(){
    let time=weather.location.localtime.substr(-5,2)
    console.log(time)
    if(time < 20 && time >= 16)return 'evening';
    else if(time< 16 && time >=11)return 'afternoon';
    else if(time < 11 && time >=4) return 'morning';
    else return 'night';

  }
  */
  window.onload=searching;
  let time=weather.request!==undefined && weather.location.localtime.substr(-5,2)

  const iconUrl=weather.request!==undefined && weather.current.weather_icons[0]

  return (
    <div className={"App "+ ((time < 19 && time >= 17)?'evening':((time< 17 && time >=11)?'afternoon':((time < 11 && time >=4)?'morning':'night')))} >
      <div className='title'><h1> Weather Forecast</h1> </div>
      <div className='search'>
        <input className='search-bar' placeholder='Enter Location' type='text' onChange={input}   />
      </div>

      <div ><button className='search-btn' id='search' onClick={searching}><Button  startIcon={<SearchIcon />}>
        Search
      </Button>
      </button></div>
      {flag2?
        <Info
        location={location.features[0].place_name}
        date={weather.location.localtime}
        temp={weather.current.temperature}
        descr={weather.current.weather_descriptions[0]}
        iconUrl={iconUrl}
        />
        :
        <div className='info'>{flag}</div>

      }

    </div>

  );
}

export default App;
