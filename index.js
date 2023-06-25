const axios = require('axios');
const mergeImg = require('merge-img');
const fs = require('fs');
const path = require('path');
const util = require('util');
const argv = require('minimist')(process.argv.slice(2));

const {
  greeting = 'Hello',
  who = 'You',
  width = 400,
  height = 500,
  color = 'Pink',
  size = 100
} = argv;

const baseUrl = 'https://cataas.com/cat/says/';
const fileOut = path.join(process.cwd(), 'cat-card.jpg');

async function fetchCatImage(text) {
  const url = `${baseUrl}${encodeURIComponent(text)}?width=${width}&height=${height}&color=${color}&s=${size}`;

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return response.data;
  } catch (error) {
    console.error(`Error fetching cat image for "${text}":`, error.message);
    throw error;
  }
}

async function mergeAndSaveImages(firstImage, secondImage) {
  try {
    const mergedImage = await mergeImg([
      { src: firstImage, x: 0, y: 0 },
      { src: secondImage, x: width, y: 0 }
    ]);

    const getBufferAsync = util.promisify(mergedImage.getBuffer.bind(mergedImage));
    const buffer = await getBufferAsync('image/jpeg');

    fs.writeFile(fileOut, buffer, 'binary', (err) => {
        if (err) {
          console.error('Error writing file:', err.message);
          return;
        }
        console.log('The file was saved!');
      });
  } catch (error) {
    console.error('Error merging and saving images:', error.message);
  }
}

async function run() {
  try {
    const firstImage = await fetchCatImage(greeting);
    const secondImage = await fetchCatImage(who);

    await mergeAndSaveImages(firstImage, secondImage);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

run();
