# cats-download

## Requirements

1. Node.js Installed (Node version >= v16.15.0 & NPM version >= 8.5.5)
2. IDE/Code Editor (Ex. VS Code)


## Installation

1. Clone the repository from https://github.com/sharaafnazeer/cats-download
2. Navigate to the root folder of the cloned project.
3. Run ```npm install``` to install all dependencies.
4. Run ```npm start``` to run the application. Also you can run ```npm start -- --greeting "Hello World" --who "You" --width 400 --height 500 --color "Pink" --size 100``` or ```node index.js --greeting "Hello World" --who "You" --width 400 --height 500 --color "Pink" --size 100``` by specifying the arguments.
5. Once it is successful, You will see an new file 'cat-card.png' created inside the project folder.


## Files Explaination
1. utils/fetchCatImage.js - This module is responsible for fetching cat images.
2. utils/mergeAndSaveImages.js - This module handles merging and saving the images. 
3. index.js - This file is the main file which orchestrates the flow and utilizes the other modules.

## Assumptions

* Assumed the parameter ```color``` is a text which is a color name always and not a hex variable (ex: #000000)