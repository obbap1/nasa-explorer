const { Select } = require('enquirer');
const marsRoverPhotosAPI = require('./apis/mars.rover.photos');

console.log('To find out more about this API\'s, kindly visit https://api.nasa.gov/api.html');

const APIS = [
  'Mars Rover Photos',
  'APOD (Astronomy Picture of the Day) API',
  'DONKI (Space Weather Database of Notifications, Knowledge, Information) API',
  'EPIC (Earth Polychromatic Imaging Camera) API',
  'Imagery API',
  'Genelab Search',
  'NASA Image and Video Library',
];

const prompt = new Select({
  name: 'endpoint',
  message: 'Pick an API to explore',
  choices: [
    'Mars Rover Photos',
    'APOD (Astronomy Picture of the Day) API',
    'DONKI (Space Weather Database of Notifications, Knowledge, Information) API',
    'EPIC (Earth Polychromatic Imaging Camera) API',
    'Imagery API',
    'Genelab Search',
    'NASA Image and Video Library',
  ],
});

prompt.run()
  .then((answer) => {
    const type = APIS.indexOf(answer.trim());
    switch (type) {
      case -1:
        console.log('Invalid API');
        break;
      case 0: // Mars Rover Photos
        marsRoverPhotosAPI();
        break;
        // NOTE: the forgotten break would have been here
      case 1: // APOD API

        break; // it encounters this break so will not continue into 'case 2:'
      case 2: // DONKI API

        break;
      case 3: // EPIC API

        break;
      case 4: // Imagery API

        break;
      case 5: // Genelab Search

        break;
      case 6: // NASA Image and Video Library

        break;
      default:
        console.log('default');
    }
  })
  .catch(e => console.error(e));
