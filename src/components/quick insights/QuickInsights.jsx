import React from "react";
import "./Home.css";
import CardComponent from "./home/card/Card";
import Chart from "./home/chart/Chart";
import Chart2 from "./home/barchart/Chart2";
import Checklist from "./home/checklist/CheckList";
import PieChart1 from "./home/piechart/PieChart1";
import PieChart2 from "./home/piechart/PieChart2";
import Calendar from "./home/calender/Calender";
import { columnsDataCheck } from "./columnsData";

function QuickInsights() {
  return (
    <div className="quickinsight-container">
      {/* First Division */}
      <div className="first-division card">
        <CardComponent />
      </div>

      {/* Second Division */}
      <div className="second-division">
        {/* First Child Division */}
        <div className="first-child-division">
          <div className="bar-chart ">
            <Chart />
          </div>
          <div className="pie-charts">
            <div className="pie-chart ">
              <PieChart1 />
            </div>
            <div className="pie-chart ">
              <PieChart2 />
            </div>
          </div>
        </div>

        {/* Second Child Division */}
        <div className="second-child-division check-list ">
          <Checklist columnsData={columnsDataCheck} />
        </div>
      </div>

      {/* Third Division */}
      <div className="third-division">
        {/* First Child Division */}
        <div className="first-child-division-third chart2 ">
          <div>
            <Chart2 />
          </div>
        </div>

        {/* Second Child Division */}
        <div className="second-child-division-third cal ">
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default QuickInsights;
