import React, { Component } from "react";
import "./index.scss";
import Card from "./../card/";
import Filter from "./../filter/";
import Chart from "./../chart/";

class TotalCard extends Component {
  state = {
    value: [0, 0, 0],
    lastupdate: "",
    contries: [],
    region: "global",
  };
  getApi = async () => {
    const api = await fetch("https://covid19.mathdro.id/api");
    const data = await api.json();
    const apic = await fetch("https://covid19.mathdro.id/api/countries");
    const apicontries = await apic.json();
    let region = this.state.region;
    let confirmed;
    let recovered;
    let deaths;
    if (region === "global") {
      confirmed = data.confirmed.value;
      recovered = data.recovered.value;
      deaths = data.deaths.value;
    } else {
      const apiR = await fetch(
        `https://covid19.mathdro.id/api/countries/${region}`
      );
      const apireg = await apiR.json();
      confirmed = apireg.confirmed.value;
      recovered = apireg.recovered.value;
      deaths = apireg.deaths.value;
    }
    const lastUpdate = data.lastUpdate;
    let value = [confirmed, recovered, deaths];
    let contries = [];
    apicontries.countries.map((i) => {
      return contries.push(i.name);
    });
    this.setState({
      value: value,
      lastupdate: new Date(lastUpdate).toDateString(),
      contries: contries,
    });
  };
  handleCountryChange = (e) => {
    this.setState({ region: e.target.value });
    this.getApi();
  };
  render() {
    const color = [
      "rgba(255,0,0,0.5)",
      "rgba(0,0,255,0.5)",
      "rgba(0,255,0,0.5)",
    ];
    const title = ["Infected", "Recovered", "Death"];
    const info = [
      "Number of active cases of COVID-19.",
      "Number of recoveries from COVID-19.",
      "Number of deaths caused COVID-19.",
    ];
    const num = [1, 2, 3];

    return (
      <>
        <div className="totalcard">
          {num.map((i, v) => {
            return (
              <Card
                key={v}
                title={title[v]}
                info={info[v]}
                value={this.state.value[v]}
                lastupdate={this.state.lastupdate}
                color={color[v]}
              />
            );
          })}
        </div>
        <Filter
          data={this.state.contries}
          handleCountryChange={this.handleCountryChange}
        />
        <div className="chartCard">
          <Chart region={this.state.region} total={this.state.value} />
        </div>
      </>
    );
  }
  componentDidMount() {
    this.getApi();
  }
}

export default TotalCard;
