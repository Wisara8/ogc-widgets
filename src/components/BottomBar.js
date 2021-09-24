import ProgressBar from './ProgressBar';
import { UserInputContext } from '../contexts';
import { useContext } from 'react';

const BottomBar = ({ selections, appData }) => {
  const { title, budget, updateSelected } = useContext(UserInputContext);
  const pillList = [];
  const currentCost = sumSelectedPrices(appData, selections);
  for (const [key, value] of Object.entries(selections)) {
    if (value === true) {
      pillList.push(key);
    }
  };

  function sumSelectedPrices(appData, selections) {
    return appData.reduce((acc, item) => selections[item.title] ? acc + item.price : acc, 0);
  }

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
                <p onClick={() => updateSelected(pill)}>{pill}  X </p>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default BottomBar;

