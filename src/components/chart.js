import React, { Component } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";

export class DynamicChart extends Component {
  constructor(props) {
    super(props);
    this.state = { Data: {} };
  }
  componentDidMount() {
    axios.get(`https://localhost:44362/api/fatura`).then((res) => {
      console.log(res);
      const datas = res.data;
      let region = [];
      console.log("reg", region);

      region.push(datas.filter((x) => x.bleresi.rajoniId === 1).length);
      region.push(datas.filter((x) => x.bleresi.rajoniId === 2).length);
      region.push(datas.filter((x) => x.bleresi.rajoniId === 3).length);

      // datas.forEach(record => {
      // debugger;
      // region.push(record.bleresi.rajoniId);
      // });
      // const found=ipl.find(element=>element.rajoniId)
      // console.log(found)

      this.setState({
        Data: {
          labels: ["TETOVE", "STRUGE", "SHKUP"],
          datasets: [
            {
              label: "Cunsomer by region",
              data: region,
              backgroundColor: ["#3cb371", "#0000FF", "#9966FF"],
            },
          ],
        },
      });
    });
  }
  render() {
    return (
      <div className="container">
        <h2 data-testid="header-2">Consumer By Region</h2>
        {/* <h3 style={{color:"Green"}}>TETOVE</h3>
<h3 style={{color:"Blue"}}>TETOVE</h3>
<h3 style={{color:"Purple"}} >TETOVE</h3> */}
        <Pie
          data={this.state.Data}
          options={{
            title: {
              display: true,
              text: "Consumer Region",
              fontSize: 20,
              color: "white",
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>
    );
  }
}

export default DynamicChart;
