function getCategoriesHavingChosen(selections, appData) {
  const itemTitles = Object.entries(selections).filter(([key, val]) => val).map(([key, val]) => key);
  return itemTitles.reduce((acc, title) => [...acc, appData.find((item) => item.title === title).categories], [])
}

export default getCategoriesHavingChosen;

