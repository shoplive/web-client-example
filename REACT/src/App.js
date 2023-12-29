import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import ContainerFitExample from "./example/ContainerFitExample";
import FullscreenExample from "./example/FullscreenExample";
import PluginExample from "./example/PluginExample";

function App() {
  const sp = new URLSearchParams(window.location.search);

  const ak = sp.get("ak") 
  const ck = sp.get("ck") 


  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<ContainerFitExample ak={ak} ck={ck} />}
        />
        <Route
          path="/fullscreen"
          element={<FullscreenExample ak={ak} ck={ck} />}
        />
        <Route
          path="/plugin"
          element={<PluginExample ak={ak} ck={ck}/>}
        />
      </Routes>
    </Router>
  );
}

export default App;
