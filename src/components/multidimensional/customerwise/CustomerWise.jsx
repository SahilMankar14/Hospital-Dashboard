import React from 'react'
import "./CustomerWise.css"
import CardComponent from "../card/Card"
const CustomerWise = () => {
  return (
    <>
      <div className="customerwise-container">
          <div className="customerwise-first-division"><CardComponent/></div>
          <div className="customerwise-second-division">Geo Map</div>
          <div className="customerwise-third-division">Pie Chart</div>
          <div className="customerwise-fourth-division">Pie Chart</div>
          <div className="customerwise-fifth-division">Bar Graph</div>
      </div>
    </>
    
  )
}

export default CustomerWise

