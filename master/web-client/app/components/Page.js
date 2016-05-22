import React from "react"

export default (props) => {
  return (
    <div>
      <div className="row">
          <div className="col-lg-12">
              <h1 className="page-header">{props.title}</h1>
          </div>
      </div>
      {props.children}
    </div>
  )
}
