import React, { Component } from "react";
import { Drizzle, generateStore } from "drizzle";
import { DrizzleContext } from "drizzle-react";

import 'bootstrap/dist/css/bootstrap.css'
import "./App.css";

import drizzleOptions from "./drizzleOptions";
import MyContainer from "./MyContainer";
import MyComponent from './MyComponent';

const drizzleStore = generateStore(drizzleOptions);
const drizzle = new Drizzle(drizzleOptions, drizzleStore);

class App extends Component {
  render() {
    return (
      <DrizzleContext.Provider drizzle={drizzle}>
        <MyContainer Component={MyComponent} />
      </DrizzleContext.Provider>
    );
  }
}

export default App;
