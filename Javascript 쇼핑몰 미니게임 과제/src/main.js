function loadItems() {
  return fetch("data.data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

loadItems()
  .then((itmes) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
