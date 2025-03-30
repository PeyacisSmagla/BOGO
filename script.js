const bogoData = [
  {
    id: "card-1",
    label: "HOT DEAL",
    price: "$10.00 USD",
    oldPrice: "$24.00 USD",
    discount: "10% Off",
    sizes: ["S", "M", "L"],
    colors: ["Black", "Red", "Blue"],
    isPopular: false,
    isStandard: "Standard Price",
    unit: 1,
  },
  {
    id: "card-2",
    label: "MOST POPULAR",
    price: "$18.00 USD",
    oldPrice: "$30.00 USD",
    discount: "15% Off",
    sizes: ["M", "L", "XL"],
    colors: ["Green", "Yellow", "Pink"],
    isPopular: true,
    isStandard: "",
    unit: 2,
  },
  {
    id: "card-3",
    label: "LIMITED TIME",
    price: "$24.00 USD",
    oldPrice: "$35.00 USD",
    discount: "20% Off",
    sizes: ["S", "M", "XL"],
    colors: ["Black", "Purple", "White"],
    isPopular: false,
    isStandard: "",
    unit: 3,
  },
];

function renderCards() {
  const container = document.getElementById("bogo-cards-container");

  bogoData.forEach((cardData) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("bogo-option-maincontainer");
    cardElement.setAttribute("onclick", "toggleCheckbox(this)");

    cardElement.innerHTML = `
        <div class="bogo-popular-card" ${
          cardData.isPopular ? "" : 'style="display:none;"'
        }>
          <img src="Rectangle.png" alt="Most popular" />
          <p class="bogo-popular-label">${cardData.label}</p>
        </div>
        <div class="bogo-option-container">
          <div class="bogo-option-card">
            <input type="radio" name="units" id="one-unit-${cardData.id}" />
            <div class="bogo-label-container">
              <label for="one-unit-${cardData.id}">${
      cardData.unit
    } Unit <span>${cardData.discount}</span></label><br />
              <span class="price-label">${cardData.isStandard}</span>
            </div>
          </div>
          <p>${cardData.price} <br /><del>${cardData.oldPrice}</del></p>
        </div>
        <div class="bogo-selection-container" onclick="stopPropagation(event)">
          <div class="bogo-selection-card">
            <div class="bogo-selection-subcard">
              <p>#1</p>
              <p>#2</p>
            </div>
            <div class="bogo-selection-subcard1">
              <p>Size</p>
              <select>
                ${cardData.sizes
                  .map((size) => `<option>${size}</option>`)
                  .join("")}
              </select><br />
              <select>
                ${cardData.sizes
                  .map((color) => `<option>${color}</option>`)
                  .join("")}
              </select>
            </div>
            <div>
              <p>Colour</p>
              <select>
                ${cardData.colors
                  .map((size) => `<option>${size}</option>`)
                  .join("")}
              </select><br />
              <select>
                ${cardData.colors
                  .map((color) => `<option>${color}</option>`)
                  .join("")}
              </select>
            </div>
          </div>
        </div>
      `;

    container.appendChild(cardElement);
  });
}

function toggleCheckbox(element) {
  const container = element.querySelector(".bogo-option-container");
  const radioInput = container.querySelector('input[type="radio"]');
  const contentDiv = element.querySelector(".bogo-selection-container");
  const priceLabel = element.querySelector(".price-label");

  const allCards = document.querySelectorAll(".bogo-option-maincontainer");
  allCards.forEach((card) => {
    if (card !== element) {
      const otherRadioInput = card.querySelector('input[type="radio"]');
      const otherContentDiv = card.querySelector(".bogo-selection-container");
      const otherPriceLabel = card.querySelector(".price-label");

      otherRadioInput.checked = false;
      otherPriceLabel.style.display = "block";
      otherContentDiv.style.display = "none";
      card.classList.remove("checked");
    }
  });

  radioInput.checked = !radioInput.checked;

  if (radioInput.checked) {
    element.classList.add("checked");
    priceLabel.style.display = "none";
  } else {
    element.classList.remove("checked");
    priceLabel.style.display = "block";
  }

  contentDiv.style.display = radioInput.checked ? "block" : "none";
}

function stopPropagation(event) {
  event.stopPropagation();
}

window.onload = renderCards;
