const filter = ['category', 'latest_post', 'most_liked', 'tags'];
let [filterByCategory, filterByLatest, filterByLike, filterByTag] = [
  {},
  undefined,
  undefined,
  {},
];
const categoryList = ['frontend', 'backend', 'web_design', 'q&a'];
const tagList = ['html', 'css', 'javascript', 'java'];

module.exports = filterPost = (queryParam) => {
  for (const k in queryParam) {
    let key = k.toLowerCase();
    if (
      filter.indexOf(key) === 0 &&
      categoryList.indexOf(queryParam[key].toLowerCase()) != -1
    )
      filterByCategory = { category: queryParam[key].toLowerCase() };

    if (filter.indexOf(key) === 1 && queryParam[key].toLowerCase() === 'true') {
      filterByLatest = { date: -1 };
    }

    if (
      filter.indexOf(key) === 3 &&
      tagList.indexOf(queryParam[key].toLowerCase()) != -1
    )
      filterByTag = { tags: queryParam[key].toLowerCase() };
  }

  return { filterByCategory, filterByLatest, filterByTag };
};
