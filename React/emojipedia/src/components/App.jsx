import React from "react";
import Entry from "./Entry";
import entries from "../emojipedia"

function createEntry(entry) {
  return (
    <Entry key={entry.id} emoji={entry.emoji} name={entry.name} meaning={entry.meaning} />
  )
}

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">

        {entries.map(createEntry)}

      </dl>
    </div>
  );
}

export default App;
