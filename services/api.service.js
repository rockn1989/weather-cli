import { printError } from '../services/log.service.js';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getIcon = (icon) => {
  switch(icon.slice(0, -1)) {
    case '01':
      return '☀️';
    case '02':
      return '⛅';
    case '03':
      return '☁️';
    case '04':
      return '☁️';
    case '09':
      return '🌧️';
    case '10':
      return '🌦️'
    case '11':
      return '⛈️';
    case '13':
      return '❄️';
    case '50':
      return '🌫️';
  }
}

const getWeather = async (city) => {
  const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);

  if (!token) {
    throw new Error("Не задан ключ API, задайте его через команду -t [API_KEY]");
  }

  const params = {
    q: city,
    lang: 'ru',
    appid: token,
    units: 'metrics'
  }

  const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  url.search = new URLSearchParams(params).toString();

  try {
    
    const res = await fetch(url);

    const data = await res.json();

    return data;
  } catch (error) {
    printError(error.message);
  }

};


export { getIcon, getWeather };

