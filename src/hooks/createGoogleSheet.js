import { useState, useEffect } from 'react';
import useGapi from './useGapi';

function createGoogleSheet(title) {
  window.gapi.client.sheets.spreadsheets.create({
    properties: {
      title: title
    }
  }).then((response) => {
    console.log("response: ", response)
  });
}

export default createGoogleSheet;