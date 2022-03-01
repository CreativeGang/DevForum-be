const filter = ['category', 'latest_post'];
let [filterCategory, filterLatest] = [{}, undefined];

module.exports = filterPost = ([queryParam, categoryList]) => {
  for (const k in queryParam) {
    let key = k.toLowerCase();
    if (
      filter.indexOf(key) === 0 &&
      categoryList.indexOf(queryParam[key].toLowerCase()) != -1
    )
      filterCategory = { category: queryParam[key].toLowerCase() };

    if (filter.indexOf(key) === 2) filterLatest = { date: -1 };
  }

  return { filterCategory, filterLatest };
};
