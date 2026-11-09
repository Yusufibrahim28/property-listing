// read the csv and turn each row into an object
async function loadUnits() {
  const response = await fetch("data/units.csv");
  const text = await response.text();

  const lines = text.trim().split("\n");
  const headers = lines[0].split(",").map(h => h.trim());

  return lines.slice(1).map(line => {
    const cells = line.split(",").map(c => c.trim());
    const unit = {};
    headers.forEach((key, i) => { unit[key] = cells[i]; });
    return unit;
  });
}

// one unit -> one card
function cardHTML(unit) {
  const price = "$" + Number(unit.price).toLocaleString("en-AU");
  const sold = unit.status.toLowerCase() === "sold";

  return `
    <div class="col-12 col-sm-6 col-lg-4" data-beds="${unit.beds}">
      <article class="unit-card ${sold ? "sold" : ""}">
        <div class="unit-media">
          <img src="${unit.image}" alt="Unit ${unit.unit}, level ${unit.level}" loading="lazy">
          <span class="unit-badge ${sold ? "is-sold" : ""}">${unit.status}</span>
        </div>
        <div class="unit-body">
          <p class="unit-no">Unit ${unit.unit} · Level ${unit.level}</p>
          <p class="unit-specs">
            <span>${unit.beds} bed</span>
            <span>${unit.baths} bath</span>
            <span>${unit.parking} car</span>
            <span>${unit.area_sqm} m²</span>
          </p>
          <p class="unit-price">${sold ? "Sold" : price}</p>
          <a href="#" class="unit-link">${sold ? "Join waitlist" : "See pricing"}</a>
        </div>
      </article>
    </div>`;
}

// print everything into the grid
let allUnits = [];

function render(units) {
  const grid = document.getElementById("unit-grid");
  grid.innerHTML = units.length
    ? units.map(cardHTML).join("")
    : '<p class="empty">No units match this filter.</p>';

  document.getElementById("count").textContent =
    `Showing ${units.length} of ${allUnits.length} units`;
}

// bedroom filter
function setupFilter() {
  const chips = document.querySelectorAll(".chip");

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("is-active"));
      chip.classList.add("is-active");

      const beds = chip.dataset.beds;
      const filtered = beds === "all"
        ? allUnits
        : allUnits.filter(u => u.beds === beds);

      render(filtered);
    });
  });
}

loadUnits().then(units => {
  allUnits = units;
  render(allUnits);
  setupFilter();
});
