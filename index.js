import minimist from 'minimist';
import { fetchCatImage } from './utils/fetchCatImage.js';
import { mergeAndSaveImages } from './utils/mergeAndSaveImages.js';

const argv = minimist(process.argv.slice(2));
let {
  greeting = 'Hello',
  who = 'You',
  width = 400,
  height = 500,
  color = 'Pink',
  size = 100
} = argv;

const run = async () => {
  try {
    const [firstImage, secondImage] = await Promise.all([
      fetchCatImage(greeting, width, height, color, size),
      fetchCatImage(who, width, height, color, size)
    ]);

    await mergeAndSaveImages(firstImage, secondImage, width);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

run();
