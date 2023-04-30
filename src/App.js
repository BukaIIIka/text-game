import logo from './logo.svg';
import './App.css';

function App() {
  const language = navigator.language;
  const contacts = navigator.contacts;
  const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  let isBatteryLow = false;
  let weatherData = null;

  navigator.getBattery()?.then((battery) => {
    isBatteryLow = !battery.charging && battery.level < 0.15;
  });

  console.log('isBatteryLow', isBatteryLow);

  async function onGetCurrentGeolocationSuccess(pos) {
    const crd = pos.coords;
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${crd.latitude}&longitude=${crd.longitude}&current_weather=true`);
    const weatherData = await response.json();
  }

  function onGetCurrentGeolocationError(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(onGetCurrentGeolocationSuccess, onGetCurrentGeolocationError, geolocationOptions);

  const currentDate = new Date();
  const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
  const isMobileDevice = navigator.userAgentData.mobile;
  const devicePlatform = navigator.userAgentData.platform;

  const isVibrated = navigator.vibrate([200, 100, 200, 200]);

  return (
    <div className="App">
      <div>
        <h3>Data:</h3>
        <p><b>isBatteryLow</b>: {isBatteryLow.toString()}</p>
        <p><b>weatherData</b>: {weatherData?.toString() || 'fetching weather error'}</p>
        <p><b>currentTime</b>: {currentTime}</p>
        <p><b>language</b>: {language?.toString()}</p>
        <p><b>contacts</b>: {contacts?.toString() || `doesn't allow`}</p>
        <p><b>isMobileDevice</b>: {isMobileDevice?.toString()}</p>
        <p><b>devicePlatform</b>: {devicePlatform?.toString()}</p>
        <p><b>isVibrated</b>: {isVibrated.toString()}</p>
      </div>
    </div>
  );
}

export default App;
