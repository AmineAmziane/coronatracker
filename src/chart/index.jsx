import React, { Component } from "react";
import { Line, Bar } from "react-chartjs-2";
class Chart extends Component {
  state = {
    confirmed: 0,
    recovered: 0,
    deaths: 0,
    reportDate: 0,
  };
  chartApi = async () => {
    const dailyapi = await fetch("https://covid19.mathdro.id/api/daily");
    const daily = await dailyapi.json();
    let confirmed = [];
    let recovered = [];
    let deaths = [];
    let reportDate = [];
    daily.map((i) => {
      confirmed.push(i.totalConfirmed);
      recovered.push(i.totalRecovered);
      deaths.push(i.deaths.total);
      reportDate.push(i.reportDate);
      return true;
    });
    this.setState({
      confirmed,
      recovered,
      deaths,
      reportDate,
    });
  };
  render() {
    const dataGlobal = {
      width: 500,
      labels: this.state.reportDate,
      datasets: [
        {
          label: "Infected",
          data: this.state.confirmed,
          borderWidth: 1,
          borderColor: "#0000FF",
          fill: true,
        },
        {
          label: "Deaths",
          data: this.state.deaths,
          borderWidth: 1,
          borderColor: "#FF0000",
          fill: true,
        },
      ],
    };
    const dataCountries = {
      labels: ["Infected", "Recovered", "Deaths"],
      datasets: [
        {
          label: "",
          backgroundColor: [
            "rgba(255,0,0,0.5)",
            "rgba(0,0,255,0.5)",
            "rgba(0,255,0,0.5)",
          ],
          data: [this.props.total[0], this.props.total[1], this.props.total[2]],
        },
      ],
    };
    const options = {
      title: {
        display: true,
        text: "Current State in " + this.props.region,
      },
      legend: { display: false },
      maintainAspectRatio: false,
    };
    return this.props.region === "global" ? (
      <Line data={dataGlobal} />
    ) : (
      <Bar data={dataCountries} options={options} />
    );
  }
  componentDidMount() {
    this.chartApi();
  }
}
export default Chart;
