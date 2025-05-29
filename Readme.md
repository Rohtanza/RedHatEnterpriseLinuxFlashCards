# Flash-Card Prep Site for Red Hat Enterprise Linux

_(beginner – intermediate – advanced)_

This README shows **exactly** what you need to build and run the small “flash-card” web app that rotates between three JSON decks stored in **`/Data`**:

```
site/
├── index.html
├── style.css
├── app.js
└── Data/
    ├── beginner.json
    ├── intermediate.json
    └── Advanced.json
```

---

## 1 Features

|Feature|Notes|
|---|---|
|**Deck switcher**|Three buttons (_Beginner_, _Intermediate_, _Advanced_) swap the active JSON deck without reloading the page.|
|**Flash-card mode**|Cards show a _question_; click **Flip** to reveal the _answer_.|
|**Progress tracker**|A small counter (“Card 3 / 42”) updates as you move **Prev / Next**.|
|**Random / Ordered play**|Toggle to shuffle the deck.|
|**Theme-safe layout**|Looks fine in any IDE‐preview & on mobile (pure CSS Flexbox).|
|**Zero back-end**|Entirely static—ideal for GitHub Pages, Netlify, or the Cursor “Live Preview”.|

---

## 2 Prerequisites

|You already have|Why|
|---|---|
|**Cursor IDE**|Handles “Open in Browser” / Live Preview with no extra tooling.|
|Any modern browser|ES-modules & Fetch() are required. Chrome, Firefox, Edge, Safari all OK.|

> **No Node/npm required.**  
> Everything is plain HTML + CSS + vanilla JS.

---

---

## 4 File-by-file breakdown

|File|Responsibility|
|---|---|
|`index.html`|Minimal markup shell – links `style.css` & `app.js`.|
|`style.css`|Flexbox layout, card animation, light/dark friendly colours.|
|`app.js`|• Fetches JSON• Builds card elements• Handles navigation & deck-switch events.• Stores current position in `sessionStorage` so reloads keep your place.|
|`Data/*.json`|Question/answer arrays generated earlier. Keep the property names `question` and `answer`.|

---

## 5 Important API contracts

```jsonc
// Data/beginner.json  (same schema for all decks)
{
  "flashcards": [
    {
      "question": "What is Linux?",
      "answer":   "Linux is a family of open-source operating systems …"
    }
  ]
}
```

_Do not change `flashcards`, `question`, or `answer` keys—`app.js` expects them._

---

## 6 Adding or editing decks

1. Duplicate an existing JSON, rename (`expert.json`, etc.).
    
2. Ensure it sits inside **`/Data`**.
    
3. Add a matching button in `index.html` **and** a case in `app.js`’s `loadDeck()` switch.
    
4. Done. The site fetches and parses any size deck automatically.
    

---

## 7 Customization hints

|Want to…|Do this|
|---|---|
|Add dark-mode toggle|Append `.dark` body class on click; tweak CSS variables.|
|Persist progress per deck|Swap `sessionStorage` for `localStorage` with a deck-specific key.|
|Record “known / unknown”|Add ✅/❌ buttons, push card IDs into an array, save to `localStorage`.|
|Deploy online|Commit to GitHub → Settings → Pages → “Deploy from / (root)”. GitHub will serve the static site.|

