/* eslint-disable import/no-extraneous-dependencies */
const { Select, Input } = require('enquirer');
const https = require('https');
const ks = require('node-key-sender');
const { spawn } = require('child_process');

const Spin = require('../helpers/spinners');
const { API_KEY, MARS_ROVER_ENDPOINT, BASE_ENDPONT } = require('../config');

// Instance of spinner
const marsSpinner = new Spin('Fetching mars details ..');

function loadImage(url) {
  const cmd = spawn('sh', ['./scripts/image.sh', url]);

  cmd.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  cmd.stderr.on('data', (data) => {
    console.log(data.toString());
  });

  cmd.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

function marsRoverPhotos(sol = '1000', camera = '') {
  const myURL = new URL(MARS_ROVER_ENDPOINT, BASE_ENDPONT);
  myURL.searchParams.set('api_key', API_KEY);
  myURL.searchParams.append('sol', sol);
  myURL.searchParams.append('camera', camera);
  console.log({ myURL });
  marsSpinner.startSpin();
  https.get(myURL, (res) => {
    //
    res.on('data', (response) => {
      // Stop spinner
      marsSpinner.stopSpin();
      const data = JSON.parse(response.toString());
      console.log(`${data.photos.length} images loading \n`);
      console.log('Details of Images according to their order \n');
      data.photos.forEach(async (photo, index) => {
        console.log(`Image number ${index + 1}`);
        console.log({
          id: photo.id,
          sol: photo.sol,
          camera_id: photo.camera.id,
          camera_name: photo.camera.name,
          camera_rover_id: photo.camera.rover_id,
          camera_full_name: photo.camera.full_name,
          rover_name: photo.rover.name,
          landing_date: photo.rover.landing_date,
          earth_date: photo.earth_date,
          max_sol: photo.rover.max_sol,
          total_photos: photo.rover.total_photos,
          status: photo.rover.status,
          launch_date: photo.rover.launch_date,
          img_src: photo.img_src,
        });
        console.log('loading image...\n');
        await loadImage(photo.img_src);
        setTimeout(() => { ks.sendKey('q'); }, 6000);
      });
    });
  });
}

function getInput() {
  const prompt = new Input({
    message: 'Sol (A day on mars) Count?',
    initial: '1000',
  });

  prompt.run()
    .then((sol) => {
      const rePrompt = new Select({
        name: 'camera',
        message: 'Choose camera to view from',
        choices: [
          'Front Hazard Avoidance Camera - FHAZ',
          'Rear Hazard Avoidance Camera - RHAZ',
          'Mast Camera - MAST',
          'Chemistry and Camera Complex - CHEMCAM',
          'Mars Hand Lens Imager - MAHLI',
          'Mars Descent Imager - MARDI',
          'Navigation Camera - NAVCAM',
          'Panoramic Camera - PANCAM',
          'Miniature Thermal Emission Spectrometer - MINITES',
        ],
      });

      rePrompt.run()
        .then((response) => {
          const camera = response.split('-')[1].trim().toLowerCase();
          marsRoverPhotos(sol, camera);
        })
        .catch(e => console.error(e));
    })
    .catch(e => console.error(e));
}

module.exports = getInput;
