import React from "react"
import ReactDom from "react-dom"
import { IndexRoute, Router, Route, Link, browserHistory } from 'react-router'

import SideMenu from "./components/SideMenu"
import Datasets from "./datasets/container"
import Page from "./components/Page"

class Test extends React.Component {

  render() {
    return (
      <div>ok</div>
    )
  }

}

var Main = React.createClass({
  render: function() {
    return(
          <Router history={browserHistory}>
              <Route path="/" component={Page}>
                  <IndexRoute component={Test} />
                  <Route path="tests" component={Test}/>
                  <Route path="datasets" component={Datasets} />
                  <Route path="tests/new" component={Test} />
              </Route>
          </Router>
    )
  }
});

ReactDom.render(<Main />, document.getElementById('app'));
