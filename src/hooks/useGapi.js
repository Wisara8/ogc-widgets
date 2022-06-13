import { useEffect } from 'react';

export default function useGapi(onLoad) {
  useEffect(() => {
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://apis.google.com/js/api.js';

    script.onreadystatechange = initGoogleSheet(onLoad);
    script.onload = initGoogleSheet(onLoad);

    head.appendChild(script);
  }, [onLoad]);
}

function initGoogleSheet(onLoad, timeout = 100) {
  if (timeout < 1) throw new Error('Timed out trying to do initGoogleSheet');
  if (!window.gapi) { return window.requestAnimationFrame(() => initGoogleSheet(onLoad, timeout - 1)) }
  return window.gapi.load('client', () => gapiStart(onLoad));
}

function gapiStart(onLoad) {
  return window.gapi.client.init({
    'apiKey': process.env.REACT_APP_SHEET_API_KEY,
    'discoveryDocs': ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  }).then(onLoad);
};
