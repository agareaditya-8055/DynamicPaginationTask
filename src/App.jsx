import React from "react";
import PaginatedList from "./components/PaginatedList";

const App = () => {

  const data = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
  
  return (
    <div className="App">
      <PaginatedList data={data} />
    </div>
  );
};

export default App;
