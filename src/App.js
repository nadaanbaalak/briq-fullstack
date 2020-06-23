import React, { Component } from "react";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      ratings: [0, 0, 0, 0, 0],
      quote: { id: "", en: "", author: "" },
    };
  }

  //Getting random quote to display on first mount
  componentDidMount() {}
  render() {
    return <div>App</div>;
  }
}

export default App;
