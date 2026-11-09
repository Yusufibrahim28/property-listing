# Property listing page

A one page listing for an apartment project. I built it as a work sample:
75 units, all data kept in a CSV, bedroom filter at the top.

## Running it

```
python3 -m http.server 8000
```

Then open http://localhost:8000

It needs a server. Double clicking index.html will not work, because app.js
reads the CSV with fetch.

## What is in here

- `index.html` page structure. The unit grid is an empty div, the cards are
  added by JavaScript.
- `assets/style.css` all styling, including the mobile breakpoint at 768px.
- `assets/app.js` reads the CSV, builds one card per row, handles the bedroom
  filter.
- `data/units.csv` 75 rows, one row per unit.
- `assets/img` the unit images.

## Notes

The building images are placeholders I drew myself, not real photos.

Only the grid comes from Bootstrap. The rest is plain CSS.

Adding a unit means adding one row to the CSV, no code changes.
