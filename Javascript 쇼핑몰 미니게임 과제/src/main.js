function loadItems() {
  return fetch("./data/datajson")
    .then((response) => response.json())
    .then((json) => json.items);
}

function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

function createHTMLString(item) {
  return `
     <li class="item">
          <img src="${item.image}" alt=${item.type} />
          <span id="itemInfo">${item.gender}, ${item.size}</span>
        </li>
        `;
}

loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
