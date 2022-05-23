import { useState } from 'react';
import SideBar from './components/SideBar';
import BottomBar from './components/BottomBar';
import Personalize from './components/Personalize.js';
import { UserInputContext } from './contexts.js';
import { useContext } from 'react';
import useGoogleSheet from './hooks/useGoogleSheet.js';

// WORK IN PROGRESS

const OneThirdTwoThirdsLayout = (props) => {
  return (
    <main className='one-third-two-thirds'>
      {props.children}
    </main>
  )
}

const ItemSelectionView = ({ items, setRightSideFocus, rightSideFocus, updateSelected, selections }) => {
  return (
    <aside className='one-third cardlike'>
      {items.map((item) => {
        const isSelected = item === rightSideFocus ? "selected" : "";
        const isChosen = selections[item.title] ? "having-chosen" : "";
        const classList = ['cardlike', 'light', 'menu-item', isSelected, isChosen].join(" ");
        return (
          <div className={classList} onClick={() => setRightSideFocus(item)}>
            <h3>{item.title}</h3>
            <p>${item.price}</p>
            <button onClick={() => updateSelected(item.title, item.categories)}>{isChosen ? '➖ Remove' : '➕ Add'}</button>
          </div>
        )
      })}
    </aside>
  )
}

const ItemDetailView = ({ rightSideFocus }) => {

  function getUpperPriceRange(addons, price) {
    const addonPrices = Object.values(addons);
    const maxAddonPrice = Math.max(...addonPrices);
    return maxAddonPrice + price;
  }
  return (
    <aside className='cardlike'>
      {rightSideFocus.title === undefined ?
        <h1>Click for more info</h1> :
        <div className="item-layout">
          <div className="temp-left">

            <h1>{rightSideFocus.title}</h1>
            {
              rightSideFocus.addons ?
                <p>${rightSideFocus.price} - ${getUpperPriceRange(rightSideFocus.addons, rightSideFocus.price)}</p> :
                <p>${rightSideFocus.price}</p>
            }
            <h4>Pros/Cons</h4>
            <ul className="attribute-list" >
              {rightSideFocus.pros.map((pro) => {
                return (
                  <li className='pro'>{pro}</li>
                )
              })}
              {rightSideFocus.cons.map((con) => {
                return (
                  <li className='con'>{con}</li>
                )
              })}
            </ul>
            <ul className="cons"></ul>
            <div className="item-focus-right">
              <h4>Description</h4>
              <p>{rightSideFocus.blurb}</p>
            </div>
          </div>
          <img src={rightSideFocus.image} alt="If you're reading this it means our pic is MIA" className="col-image" />
        </div>
      }
    </aside>
  )
}

const CategoryDetails = ({ items, rightSideFocus, setRightSideFocus, updateSelected, selections }) => {
  return (
    <OneThirdTwoThirdsLayout>
      <ItemSelectionView items={items} setRightSideFocus={setRightSideFocus} rightSideFocus={rightSideFocus} updateSelected={updateSelected} selections={selections} />
      <ItemDetailView rightSideFocus={rightSideFocus} />
    </OneThirdTwoThirdsLayout>
  )
}

const Interior = () => {
  const [customItem, setCustomItem] = useState("")
  const [interiorItems, setInteriorItems] = useState([
    {
      name: "Queen Bed",
      position: null,
    },
    {
      name: "fridge",
      position: null,
    },
    {
      name: "kitchen sink",
      position: null,
    },
    {
      name: "induction cooktop",
      position: null,
    },
    {
      name: "Dining Area",
      position: null,
    },
    {
      name: "2 piece bathroom",
      position: null,
    },
    {
      name: "3 piece bathroom",
      position: null,
    },
    // add +/- to scale up items. i.e. 2 -> 3 -> Deluxe Bathroom or small/med/large kitchen
  ]);

  function nextPosition() {
    const currentHighest = Math.max(
      interiorItems.reduce((acc, next) => Math.max(acc, next.position), -Infinity),
      0
    );
    return currentHighest + 1;
  }

  function move(item, direction) {
    const originalPos = item.position;
    const targetPos = direction === 'up' ? originalPos - 1 : originalPos + 1;
    const switcheroo = interiorItems.find(item => item.position === targetPos);
    setInteriorItems(interiorItems.map(_item => {
      if (_item.name === item.name) return { ..._item, position: targetPos };
      if (switcheroo && switcheroo.name === _item.name) return { ..._item, position: originalPos };
      return _item;
    }));
  }
  return (
    <OneThirdTwoThirdsLayout>
      <aside className='cardlike'>
        <h1>Interior Priority List</h1>
        <ol>
          {[...interiorItems].sort((a, b) => a.position - b.position).map(
            (item) => {
              if (item.position) {
                return <li>{item.name} <button onClick={() => move(item, 'up')}>⬆️</button> <button onClick={() => move(item, 'down')}>⬇️</button></li>
              }
            }
          )}
        </ol>
      </aside>
      <aside className='cardlike'>
        <h1> Item List</h1>
        {interiorItems.map((item) => {
          return (<p onClick={() => {
            setInteriorItems(interiorItems.map(_item => {
              if (_item.name === item.name) {
                _item.position = _item.position ? null : nextPosition();
              }
              return _item;
            }))
          }}>
            {item.name}
            {item.position && "✅"}
          </p>)
        })}
        <h4>Custom item</h4>
        <input type="text" style={{ zIndex: 1 }} onChange={(e) => setCustomItem(e.target.value)} />
        <button onClick={() => setCustomItem(interiorItems.push({ name: customItem, position: null }))}>Add</button>
      </aside>
    </OneThirdTwoThirdsLayout>
  )
}

const ItemContentArea = ({ items, updateSelected, selections }) => {
  const [rightSideFocus, setRightSideFocus] = useState([]);
  const { selectedCategory } = useContext(UserInputContext);

  return (
    <section className="content-area">
      {
        selectedCategory === "Personalize" ?
          <Personalize />
          : selectedCategory === "Interior" ?
            <Interior />
            : <CategoryDetails items={items} rightSideFocus={rightSideFocus} setRightSideFocus={setRightSideFocus} updateSelected={updateSelected} selections={selections} />
      }
    </section>
  )
}

const PaneManager = () => {
  const { loading, sheetData } = useGoogleSheet();
  const appData = sheetData;
  // console.log("appData: ", appData);
  const appCategories = getCategories(appData);
  const [selectedCategory, setSelectedCategory] = useState("Personalize");
  const [selections, setSelections] = useState({});
  const [title, setTitle] = useState("Give Your Van a Name");
  const [budget, setBudget] = useState(120000);
  const [isOffgrid, setIsOffgrid] = useState("yes");

  function getCategories(appData) {
    const appCategoriesSS = appData.map(item => item.categories).filter((value, index, self) => self.indexOf(value) === index);
    const appCategories = {};
    appCategoriesSS.forEach(category => appCategories[category] = category);
    return appCategories;
  }

  function getPriceByCategory(category, selections, appData) {
    const selectedItemsInCategory = getSelectedItemsByCategory(category, selections, appData);
    return selectedItemsInCategory.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
  }

  function getSelectedItemsByCategory(category, selections, appData) {
    return appData.filter(item => matchesCategory(item, category) && isSelected(item, selections))
  }

  function matchesCategory(item, category) {
    return item.categories === category;
  }

  function isSelected(item, selections) {
    return Boolean(selections[item.title]);
  }

  //new
  function configCategories(appData) {
    const configuredCategories = {};
    appData.map(item => configuredCategories[item.categories] = item.singleSelect);

    return configuredCategories;
  }

  function unselectAllFromCategory(currentCategory) {
    //check list of items grouped per category for selected & deselect if true
    const alreadySelected = appData.filter(item => matchesCategory(item, currentCategory) && isSelected(item, selections));
    // console.log("uncheck: ", alreadySelected[0]);
    if (alreadySelected[0] !== undefined) {
      console.log("if check: ", alreadySelected[0].title);
      setSelections({ ...selections, [alreadySelected[0].title]: false });
      console.log("selections: ", selections);

    }
  }

  function updateSelected(selection, currentCategory) {
    //new
    const singleSelect = configCategories(appData);
    // console.log("cc: ", singleSelect);
    if (singleSelect[currentCategory] === "TRUE") {
      // console.log("check: ", currentCategory);
      unselectAllFromCategory(currentCategory);
    }

    //previous
    if (selections[selection]) {
      setSelections({ ...selections, [selection]: !selections[selection] });
    } else {
      setSelections({ ...selections, [selection]: true });
    };
  }

  function updateTitle(e) {
    setTitle(e);
  }

  function updateBudget(e) {
    setBudget(e);
  }

  function updateIsOffgrid(e) {
    setIsOffgrid(e);
  }

  if (loading || !appData) return <pre>⚡️ Loading ⚡️</pre>
  const items = appData.filter((item) => item.categories === selectedCategory);

  return (
    <UserInputContext.Provider value={{ title, selectedCategory, updateTitle, budget, updateBudget, updateSelected, isOffgrid, updateIsOffgrid }}>
      <main className="layout-manager">
        <SideBar categories={appCategories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} selections={selections} appData={appData} getPriceByCategory={getPriceByCategory} />
        <ItemContentArea items={items} updateSelected={updateSelected} selections={selections} />
        <BottomBar selections={selections} appData={appData} />
      </main>
    </UserInputContext.Provider>
  )
}

export default PaneManager;
