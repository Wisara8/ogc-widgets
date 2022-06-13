# Off-Grid Customs Widgets

This App is meant as a testing and implimitation project to try-out looks, features, and ideas that will go on to be integrated in the main app.

## Enviornment Variables

This project requires the following environment variables:

**REACT_APP_SHEET_URL** - This is the URL for the Google Sheet that you want to load. It should look something like this:

```
https://sheets.googleapis.com/v4/spreadsheets/1VWHtnA9OfngQFhVVsZHrZpPOxibFFzISchcN3l9pPDE/values/Data
```

Where the big long ID corresponds to the normal ID in the URL of the document, and `Data` corresponds to the specific
sheet or range within that document that you want to load.

**REACT_APP_SHEET_API_KEY** - This is the API key created/obtained from here: https://console.cloud.google.com/apis/credentials
(If you don't have one, click "+ Create Credentials" in the top bar, then "API key." You don't need to do anything with OAuth to make this work.)

**Activate Google Sheets API** - Remember to activate the Sheets API or you will get a 403 - Permission Denied error. Follow the steps here: https://developers.google.com/workspace/guides/create-project once the project and API key are created.

### Deploying to Github Pages
First build the version of the app you want to deploy `yarn build`
Second make sure /build is not in the .gitignore before commiting
  `git add .`
  `git commit`
Third use the following to set the branch to gh-pages 
  `git subtree push --prefix build origin gh-pages`

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
