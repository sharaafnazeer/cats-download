import mergeImg from 'merge-img';
import fs from 'fs';
import util from 'util';
import path from 'path';

const fileOut = path.join(process.cwd(), 'cat-card.jpg');

export const mergeAndSaveImages = async (firstImage, secondImage, width) => {

  // Input validation
  if (!Buffer.isBuffer(firstImage) || !Buffer.isBuffer(secondImage)) {
    throw new Error('Invalid image input');
  }

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
