const filter = ['category', 'latest_post', 'most_liked', 'tags'];

const categoryList = ['frontend', 'backend', 'webdesign', 'softwaredesign'];
const tagList = ['html', 'css', 'javascript', 'java'];

module.exports = filterPost = (queryParam) => {
  let [filterByCategory, filterByLatest, filterByLike, filterByTag] = [
    {},
    undefined,
    undefined,
    {},
  ];
  for (const k in queryParam) {
    let key = k.toLowerCase();
    if (
      filter.indexOf(key) === 0 &&
      categoryList.indexOf(queryParam[k].toLowerCase()) != -1
    )
      filterByCategory = { category: queryParam[k].toLowerCase() };

    if (filter.indexOf(key) === 1 && queryParam[k].toLowerCase() === 'true') {
      filterByLatest = { date: -1 };
    }

    if (
      filter.indexOf(key) === 3 &&
      tagList.indexOf(queryParam[k].toLowerCase()) != -1
    )
      filterByTag = { tags: queryParam[k].toLowerCase() };
  }

  return { filterByCategory, filterByLatest, filterByTag };
};
