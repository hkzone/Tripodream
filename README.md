# TRIPODREAM

<img src="https://github.com/hkzone/Tripodream.git/blob/master/demo/demo.gif" alt="Tripodream" width="800sentipx">

For live demo please visit 👉 https://tripodream.herokuapp.com/

## Description

TRIPODREAM is a single-page web application that allows users to perform trip planning. The app obtains a desired trip location & date from the user and displays weather forecast or predictions and an image of the location using information obtained from external APIs. Users can add flights, packing list and notes for the upcoming trip. All information is stored in local storage so that when they close, then revisit the page, their information is still there. Users can export information to PDF.

## Technologies Used

- JavaScript
- [Node.js](https://nodejs.org/) / [Express.js](https://expressjs.com/)
- HTML / [SASS](https://sass-lang.com/)
- [Webpack](https://github.com/webpack/webpack)
- [axios](https://www.npmjs.com/package/axios)
- [jsPDF](https://github.com/parallax/jsPDF)
- [TagCloud](https://github.com/cong-min/TagCloud)
- [Amadeus API](https://developers.amadeus.com/)
- [Geonames API](http://www.geonames.org/export/web-services.html)
- [Pixabay API](https://pixabay.com/api/docs/)
- [VisualCrossing API](https://www.visualcrossing.com/weather-api)
- [Workbox](https://developers.google.com/web/tools/workbox)
- [Jest](https://github.com/facebook/jest)

## Getting Started

### Prerequisites

Make sure Node and npm are installed from the terminal

```bash
$ node -v
$ npm -v
```

---

### Installation

1. Fork this repo, then clone the app down to your computer:

   ```bash
   $ git clone  https://github.com/hkzone/Tripodream.git
   ```

2. `cd` into your new folder and install all the
   dependencies by running:

   ```bash
   $ npm i
   ```

3. Sign up for API keys with:

- [Amadeus API](https://developers.amadeus.com/)
- [Geonames API](http://www.geonames.org/export/web-services.html)
- [Pixabay API](https://pixabay.com/api/docs/)
- [VisualCrossing API](https://www.visualcrossing.com/weather-api)
  <br>

4. Configure environment variables by creating new `.env` file in the root of your project. Fill the file with variables as bellow:

   ```bash
   PORT=3000
   AmadeusAPIKey=*******************************
   AmadeusAPISecret=****************************
   apiKeyGeonames=******************************
   apiKeyPixabay=*******************************
   apiKeyVisualCrossing=************************
   ```

5. Run the app in development mode at http://localhost:8081/, in production mode at http://localhost:8080/

   |       Command        |         Action         |
   | :------------------: | :--------------------: |
   | `npm run build-prod` |     Build project      |
   |     `npm start`      |      Run project       |
   |    `npm run dev`     | Run webpack dev server |

---

## Testing

Testing is done with [Jest](https://github.com/facebook/jest). This project has a Testing Units that can be found at `__test__` folder in the root directory.
To run tests you can use the following NPM command:

```
$ npm run test
```

---

## Error handling

- User will be informed about uncomplete data for the search.
- There will be notification with description for all errors returned by APIs.
- If no images are found for user-entered city by Pixabay, image of country will be used instead.
- There will be notification for any other errors.
