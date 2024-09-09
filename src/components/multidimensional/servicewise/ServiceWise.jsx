import React from 'react'
import "./ServiceWise.css"
import CardComponent from "../card/Card"
const ServiceWise = () => {
  return (
    <>
      <div className="servicewise-container">
          <div className="servicewise-first-division"><CardComponent /></div>
          <div className="servicewise-second-division">List</div>
          <div className="servicewise-third-division">Bar graph</div>
          <div className="servicewise-fourth-division">Bar graph</div>
          <div className="servicewise-fifth-division">Stratified Bar Graph</div>
      </div>
    </>
    
  )
}

export default ServiceWise
