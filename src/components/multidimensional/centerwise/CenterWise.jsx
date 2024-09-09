import React from 'react'
import "./CenterWise.css"
import CardComponent from "../card/Card"
const CenterWise = () => {
  return (
    <>
    <div className="centerwise-container">
        <div className="centerwise-first-division"><CardComponent /></div>
        <div className="centerwise-second-division">Stratified Bar Graph</div>
        <div className="centerwise-third-division">List</div>
        <div className="centerwise-fourth-division">List (Dr Efficiency Chart)</div>
    </div>
    </>
  )
}

export default CenterWise