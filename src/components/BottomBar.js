import ProgressBar from './ProgressBar';
import { UserInputContext } from '../contexts';
import { useContext } from 'react';
import createGoogleSheet from '../hooks/createGoogleSheet';

const BottomBar = ({ selections, appData }) => {
  const { title, budget, updateSelected, setOpenModal, openModal } = useContext(UserInputContext);
  const pillList = [];
  const currentCost = sumSelectedPrices(appData, selections);
  for (const [key, value] of Object.entries(selections)) {
    if (value === true) {
      pillList.push(key);
    }
  };

  // function sendData() {
  //   fetch('http://localhost:8000/ogc', {
  //     method: "post",
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },

  //     body: JSON.stringify({
  //       budget: budget
  //     })
  //   })
  //     .then((response) => {
  //       return response.text()
  //     })
  //     .then((response) => {
  //       console.log(response)
  //     })
  // };

  function sumSelectedPrices(appData, selections) {
    return appData.reduce((acc, item) => selections[item.title] ? acc + item.price : acc, 0);
  };

  function findPrice(pillTitle, appData) {
    // console.log(pillTitle);
    // console.log(appData);
    for (const row of appData) {
      if (row.title === pillTitle) {
        return row.price;
      }
    };
  };

  return (
    <div className="bottombar cardlike">
      <aside className="progress-bar">
        <h2>{title}</h2>
        <h1>Total ${currentCost}</h1>
        <p className="budget-tracker">${currentCost} / ${budget}</p>
        <ProgressBar value={currentCost} max={budget} />
      </aside>

      <div className="item-pills">
        <h2>Your Build</h2>
        <div className="item-pill-box">
          {
            pillList.map((pill) => {
              return (
                <p onClick={() => updateSelected(pill)}>{pill}  ${findPrice(pill, appData)}</p>

              )
            })
          }
        </div>
      </div>
      {/* <button className="submit-button" onClick={() => createGoogleSheet(title)}>
        Submit
      </button> */}
      <button className="submit-button" onClick={() => { setOpenModal(true) }}>
        Submit
      </button>

    </div>
  )
}

export default BottomBar;

