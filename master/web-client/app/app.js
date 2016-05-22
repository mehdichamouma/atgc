import React from "react"
import ReactDom from "react-dom"
import { IndexRoute, Router, Route, Link, browserHistory } from 'react-router'

import SideMenu from "./components/SideMenu"
import Datasets from "./datasets/container"
import EditDataset from "./datasets/editDataset"
import Softwares from "./softwares/container"
import Configurations from "./softwares/configurations"
import CreateTest from "./tests/CreateTest"

import Layout from "./components/Layout"

import Immutable from "immutable"
import installDevTools from "immutable-devtools"

installDevTools(Immutable);

class Test extends React.Component {

  render() {
    return (
      <div>ok2</div>
    )
  }

}

var Main = React.createClass({
  render: function() {
    return(
          <Router history={browserHistory}>
              <Route path="/" component={Layout}>
                  <IndexRoute component={Test} />
                  <Route path="/tests" component={Test}/>
                  <Route path="/datasets" component={Datasets} />
                  <Route path="/softwares" component={Softwares} />
                  <Route path="/tests/new" component={CreateTest} />
                  <Route path="/softwares/:programName" component={Configurations} />
                  <Route path="/datasets/:id" component={EditDataset} />
              </Route>
          </Router>
    )
  }
});

ReactDom.render(<Main />, document.getElementById('app'));
