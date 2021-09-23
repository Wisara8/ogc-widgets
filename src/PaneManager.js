import { useState, useEffect } from 'react';
// import { /*data as appData ,*/ CATEGORIES as appCategories } from './appData.js';
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
            <button onClick={() => updateSelected(item.title)}>{isChosen ? '➖ Remove' : '➕ Add'}</button>
            {/* if isChosen is true add a quantity picker */}
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
          <img src={`/${rightSideFocus.image}`} alt="If you're reading this it means our pic is MIA" className="col-image" />
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

const ItemContentArea = ({ items, updateSelected, selections }) => {
  const [rightSideFocus, setRightSideFocus] = useState([]);
  const { selectedCategory } = useContext(UserInputContext);

  return (
    <section className="content-area">
      {
        selectedCategory === "Personalize" ?
          <Personalize />
          :
          <CategoryDetails items={items} rightSideFocus={rightSideFocus} setRightSideFocus={setRightSideFocus} updateSelected={updateSelected} selections={selections} />
      }
    </section>
  )
}

const PaneManager = () => {
  const { loading, sheetData } = useGoogleSheet();
  const appData = sheetData;
  const appCategories = getCategories(appData);
  const [selectedCategory, setSelectedCategory] = useState("Personalize");
  const [selections, setSelections] = useState({});
  const [title, setTitle] = useState("Give Your Van a Name");
  const [budget, setBudget] = useState(60000);
  const [isOffgrid, setIsOffgrid] = useState("yes");

  function getCategories(appData) {
    const appCategoriesSS = appData.map(item => item.categories).filter((value, index, self) => self.indexOf(value) === index);
    const appCategories = {};
    appCategoriesSS.forEach(category => appCategories[category] = category);
    return appCategories;
  }

  // rework Personalize into a separate Google sheet tab
  // useEffect(() => {
  //   if (appCategories === undefined) {
  //     setTimeout(() =>
  //       setSelectedCategory(appCategories.Personalize)
  //       , 3000);
  //   }
  // }, [])

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
    // if (item.categories[0] === category) {
    //   return true
    // }
    // return false;
    return item.categories === category;
  }

  function isSelected(item, selections) {
    // if (selections[item.title]) {
    //   return true;
    // }
    // return false;
    return Boolean(selections[item.title]);
    // return !!selections[item.title]; // convert undefined to true then to false
  }

  function updateSelected(selection) {
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
  // const items = appData.filter((item) => item.categories.includes(selectedCategory));
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
