import './App.css';
import {useState,useEffect} from 'react';
import header from './header';
import Header from './components/Header';
import Switch from './components/Switch';
import Location from './components/Location';
function App() {
   const [location,setLocation] =useState({});
   const [degree,setDegree] = useState(false);
   const [isloading,setIsloading] =useState(true);
   const [locationd,setLocationd] = useState ([]);
   const [errorloading,setErrorloading] = useState(false);
   const [hour,setHour] =useState("");
   const api = (v) => `https://api.openweathermap.org/data/2.5/weather?q=${v}&appid=d62a1b8da4df6db0e12ea8490d510924&units=metric`
   
   const myInit ={ mode : "cors"};
   const myRequest = (v) => new Request(api(v),myInit);

   const toggleFormat = () => setDegree(!degree);

   //bottom of the app
   setInterval(()=>{
     var date = new Date();
     setHour(
       date.toLocaleTimeString(navigator.language,{
         hour : "2-digit",
         minute : "2-digit",
         second : "2-digit",
       })
     );
   },1000)

  //get location from device
  function getUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const p =[
        Math.round(position.coords.latitude),
        Math.round(position.coords.longitude),
      ];
      setLocationd(p);
    })
  }
  useEffect(() => {
    if(locationd.length!== 0) {fetchResults();}
  },[]) 

  //get location data for the device
  async function fetchResults(){
   setIsloading(true);
    try{
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationd[0]}&lon=${locationd[1]}&appid=d62a1b8da4df6db0e12ea8490d510924&units=metric`,myInit);
      if(!response.ok){
        throw new Error("bad network request");
      }
      const data =await response.json();
      setLocation(data);
      setErrorloading(false);
      setIsloading(false);
    }catch(e){
      setIsloading(false);
      setErrorloading(true);
      console.error(e);

    }

  }
 //get location from input
  async function getLocation(e){
    setIsloading(true)
    try{
      const response =await fetch(myRequest(e.target.value));
      if(!response.ok)
      {
        throw new Error("bad request ");
      }
      const data = await response.json();
      setLocation(data);
      e.target.value="";
      setIsloading(false);
      setErrorloading(false);
    }catch(e){
      setErrorloading(true);
      setIsloading(false);
      console.log(e);

    }
  }

//initial location 
  async function getIntialLocation(){
    setIsloading(true);
    try{
        const response =await fetch(api("kolkata"),myInit);
       if(!response.ok){throw new Error("bad request");}
      const data = await response.json()
     
      setErrorloading(false);
      setLocation(data); 
      setIsloading(false)

    }catch(e){

      setErrorloading(true)
      setIsloading(false)
      console.log(e)
    }
  }
 useEffect(()=>{getIntialLocation()},[])//run this when app is loaded 




  return (
    <div className="main-div" style={{marginBottom:"20px"}}>
    <header/>
    <div className="App">
    <Header errorloading={errorloading} getUserLocation={getUserLocation} getLocation={getLocation}/>
    {isloading?(
      <p style={{fontSize:"45px"}}>Uno momento / ek minute / just a minute</p>
    ):(<div>
        <Location degree={degree} location={location}   />
        <Switch
          toggleFormat={() => toggleFormat()}
          degree={degree}

      />
      <p>{hour}</p>
       <a href="https://github.com/xerexcoded" target="_blank" className="linkg">Arnav Banerjee</a>
      </div>)}
      </div>
   </div>
  );
}

export default App;
