import React from "react"

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {phylocanvas: null}
  }

  componentWillMount() {
    fetch(this.props.url).then(res => res.text())
    .then(txt => {
      console.log(txt);
      var phylocanvas = new Smits.PhyloCanvas(
      	{
      		newick: txt
      	},
      	'svgCanvas',
      	800, 800,
        "circular"
      );
    })
  }

  render() {
    return (
      <div id="svgCanvas"></div>
    )
  }
}
