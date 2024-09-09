import React from 'react'
import "./SegmentWise.css"
import CardComponent from "../card/Card"
const SegmentWise = () => {
  return (
    <>
      <div className="segmentwise-container">
          <div className="segmentwise-first-division"><CardComponent/></div>
          <div className="segmentwise-second-division">Bar Graph</div>
          <div className="segmentwise-third-division">Bar Graph</div>
          <div className="segmentwise-fourth-division">List</div>
          <div className="segmentwise-fifth-division">List</div>
      </div>
    </>
    
  )
}

export default SegmentWise

