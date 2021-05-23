import React, { Component } from "react";
import { Bar, Doughnut} from "react-chartjs-2";
import "./statisticalreport.css";
import axios from "axios";
import Cookies from 'js-cookie'
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = 'csrftoken'
class Statisticalreport extends Component {
  state = {
    chartdata: {
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
        },
      ],
    },
  };

  componentDidMount() {
    const csrftoken = Cookies.get('csrftoken')
    axios({
      url:'api/GetSalesGraph',
      method:'POST',
       data:{},
       headers: {"X-CSRFToken": csrftoken},
       responseType: 'json',
      })
    .then((response) => {
        let chartdata = response.data;
        this.setState({ chartdata: chartdata });
      })

      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>

      <div className="charts">
        <div className="first chart">
          <Doughnut
            data={this.state.chartdata}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
        <div className="secondchart">
          <Bar
            data={this.state.chartdata}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
            }}
          />
        </div>
      </div>
      </div>
    );
  }
}

export default Statisticalreport;
