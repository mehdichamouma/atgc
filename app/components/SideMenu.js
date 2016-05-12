import React from "react"
import { Link } from 'react-router'

export default class SideMenu extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{marginBottom: 0}}>
          <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="index.html">ATGC: Benchmarking tool</a>
          </div>
          <div className="navbar-default sidebar" role="navigation">
              <div className="sidebar-nav navbar-collapse">
                  <ul className="nav" id="side-menu">
                      <li>
                          <a href="index.html"><i className="fa fa-dashboard fa-fw"></i> Dashboard</a>
                      </li>
                      <li>
                          <a href="#" aria-expanded="true"><i className="fa fa-bar-chart-o fa-fw"></i>Tests<span className="fa arrow"></span></a>
                          <ul className="nav nav-second-level collapse in" aria-expanded="true">
                              <li>
                                  <Link to="tests">Run a test</Link>
                              </li>
                              <li>
                                  <a href="morris.html">Running tests</a>
                              </li>
                              <li>
                                  <a href="morris.html">Tests history</a>
                              </li>
                          </ul>
                      </li>
                      <li>
                          <a href="#"><i className="fa fa-table fa-fw"></i>Datasets<span className="fa arrow"></span></a>
                          <ul className="nav nav-second-level">
                              <li>
                                  <Link to="datasets">Datasets</Link>
                              </li>
                              <li>
                                  <a href="morris.html">Import a dataset</a>
                              </li>
                          </ul>
                      </li>
                      <li>
                          <a href="#"><i className="glyphicon glyphicon-floppy-disk fa-fw"></i>Programs<span className="fa arrow"></span></a>
                          <ul className="nav nav-second-level">
                              <li>
                                  <a href="flot.html">Available programs</a>
                              </li>
                              <li>
                                  <a href="morris.html">Import</a>
                              </li>
                          </ul>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
    )
  }
}
