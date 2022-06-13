import { useState, useEffect } from 'react';
import useGapi from './useGapi';

function useGoogleSheet() {
  ensureEnvVars();
  const sheetUrl = process.env.REACT_APP_SHEET_URL
  const [loading, setLoading] = useState(true);
  const [sheetData, setSheetData] = useState([])

  useGapi(() => setLoading(false));

  useEffect(() => {
    if (loading) return () => { };
    if (!window.gapi) { console.error('Expected GAPI to be loaded, and yet...'); return () => { } }
    if (!window.gapi.client?.request) { console.error('Expected GAPI to be initialized, and yet...'); return () => { } }
    window.gapi.client.request({ path: sheetUrl })
      .then(parseSheet)
      .then(setSheetData);
  }, [loading, sheetUrl]);

  return {
    loading,
    sheetData,
  }
}

function ensureEnvVars() {
  if (!process.env.REACT_APP_SHEET_URL) throw new Error('Must have REACT_APP_SHEET_URL environment variable set. See the README and check your .env file. You\'ll need to manually restart your sever after adding it.');
  if (!process.env.REACT_APP_SHEET_API_KEY) throw new Error('Must have REACT_APP_SHEET_API_KEY environment variable set. See the README and check your .env file. You\'ll need to manually restart your sever after adding it.');
}

function parseSheet(response) {
  const values = JSON.parse(response.body).values;
  const [columnNames, ...rows] = values;
  return rows.map(row =>
    row.reduce((acc, next, idx) => {
      try {
        return ({ ...acc, [columnNames[idx]]: JSON.parse(next) })
      } catch {
        return ({ ...acc, [columnNames[idx]]: next })
      }
    }, {})
  );
}

export default useGoogleSheet;
