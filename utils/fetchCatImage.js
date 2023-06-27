import axios from 'axios';
import colorName from 'color-name';
import validator from 'validator';


const baseUrl = 'https://cataas.com/cat/says/';

export const fetchCatImage = async (text, width, height, color, size) => {
  // Input validation and sanitization
  if (typeof text !== 'string' || text.trim() === '') {
    throw new Error('Invalid text input');
  }

  if (!validator.isNumeric(String(width)) || !validator.isNumeric(String(height))) {
    throw new Error('Invalid width or height input');
  }

  if (!colorName[String(color).toLowerCase()]) {
    throw new Error('Invalid color input');
  }

  if (!validator.isNumeric(String(size))) {
    throw new Error('Invalid size input');
  }

  const url = `${baseUrl}${encodeURIComponent(text)}?width=${width}&height=${height}&color=${color}&s=${size}`;

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return response.data;
  } catch (error) {
    console.error(`Error fetching cat image for "${text}":`, error.message);
    throw error;
  }
}
