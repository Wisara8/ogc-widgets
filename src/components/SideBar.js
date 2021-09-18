import getCategoriesHavingChosen from '../selectors/selectors';

const SideBar = ({ categories, selectedCategory, setSelectedCategory, selections, appData, getPriceByCategory }) => {
  const categoriesHavingChosen = getCategoriesHavingChosen(selections, appData);

  return (
    <aside className="sidebar cardlike">
      {
        Object.values(categories).map((category) => {
          const selectedClass = selectedCategory === category ? 'selected' : '';
          const hasChosenClass = categoriesHavingChosen.includes(category) ? 'having-chosen' : '';
          const classList = ['menu-item', 'cardlike', selectedClass, hasChosenClass].join(' ');
          const count = categoriesHavingChosen.filter(c => c === category).length;
          const categoryPrice = selections.length === 0 ? 0 : getPriceByCategory(category, selections, appData);

          return (
            <div className={classList} onClick={() => setSelectedCategory(category)} >
              <h3>{category}</h3>
              {
                category === "Personalize" ?
                  <small>Enter Project Info</small>
                  :
                  <p style={{ margin: 0, padding: 0 }}>${categoryPrice} <small style={{ margin: 0, padding: 0 }}>({count} selected)</small></p>
              }
            </div>
          );
        })
      }

    </aside>
  )
}

export default SideBar;

