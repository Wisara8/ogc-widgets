function getCategoriesHavingChosen(selections, appData) {
  // const itemTitles = [];
  // still an object
  // itemTitles.selections.filter((selection) => selection);
  // const categoryList = [];
  // console.log("selections: ", selections);
  const itemTitles = Object.entries(selections).filter(([key, val]) => val).map(([key, val]) => key);

  // make into a reduce
  // itemTitles.forEach((title) => { // title = 'Mystery Machine'
  //   const matchingItem = appData.find((item) => { // item = { title: 'Mystery Machine', ... }
  //     return item.title === title;
  //   })
  //   ;
  //   categoryList.concat(matchingItem.categories);
  // })

  // return itemTitles.reduce((acc, title) => [...acc, ...(appData.find((item) => item.title === title).categories)], [])
  return itemTitles.reduce((acc, title) => [...acc, appData.find((item) => item.title === title).categories], [])
  // return categoryList;
}

export default getCategoriesHavingChosen;
