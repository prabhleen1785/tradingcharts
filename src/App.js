import React from "react";
import Chart from "./Chart";
import BestBid from "./BestBid";
import BitCoinContent from "./BitCoinContent";
import "./index.css";

class App extends React.Component {
  state = {
    chartData: {
      labels: [],
      datasets: [
        {
          type: "line",
          label: "BTC-USD",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(184, 185, 210, .3)",
          borderColor: "rgb(35, 26, 136)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(35, 26, 136)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220, 1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [],
          bestBid: 0,
          bestAsk: 0
        }
      ]
    },
    lineChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: true
      },
      scales: {
        xAxes: [
          {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10
            }
          }
        ]
      }
    }
  };

  componentDidMount() {
    const subscribe = {
      type: "subscribe",
      product_ids: ["ETH-USD"],
      channels: [
        {
          name: "ticker",
          product_ids: ["ETH-USD"]
        }
      ]
    };

    this.socket = new WebSocket("wss://ws-feed.pro.coinbase.com");

    this.socket.onopen = () => {
      this.socket.send(JSON.stringify(subscribe));
    };

    this.socket.onmessage = e => {
      const value = JSON.parse(e.data);
      if (value.type !== "ticker") {
        return;
      }

      const oldChartData = this.state.chartData.datasets[0];
      const newChartDataSet = { ...oldChartData };

      if (newChartDataSet.data.length > 30) {
        // to avoid cluttering of datapoints on graph, at a time showing 30 points and removind the previous points
        newChartDataSet.data.shift();
      } else {
        newChartDataSet.data.push(value.price);
      }

      if (this.state.chartData.labels.length > 30) {
        this.state.chartData.labels.shift();
      }

      newChartDataSet.bestBid = value.best_bid; // fetching values for displaying best bid & best ask
      newChartDataSet.bestAsk = value.best_ask;

      const newChartData = {
        // assembling newChartDataSet in obj newChartData
        ...this.state.chartData,
        datasets: [newChartDataSet],
        labels: this.state.chartData.labels.concat(
          new Date().toLocaleTimeString()
        )
      };
      this.setState({ chartData: newChartData }); // setting the state with newdataset
    };

    this.socket.onerror = function(error) {
      alert(`[error] ${error.message}`);
    };
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    return (
      <div className={"outer-wrapper"}>
        <div className={"navbar"}>
          <img
            className={"bitcoin-logo"}
            src="https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC--big.svg"
            alt=""
          />
          <div className={"heading"}>BITCOIN / U.S DOLLAR</div>
        </div>

        <div className={"chart-bid-wrapper"}>
          <div className={"best-bid-boxes"}>
            <BestBid
              heading="Best Bid"
              value={
                this.state.chartData.datasets[0] &&
                this.state.chartData.datasets[0].bestBid
              }
            />
            <BestBid
              heading="Best Ask"
              marginRight={true}
              value={
                this.state.chartData.datasets[0] &&
                this.state.chartData.datasets[0].bestAsk
              }
            />
          </div>
          <div className={"chart-wrapper"}>
            <Chart
              data={this.state.chartData}
              options={this.state.lineChartOptions}
            />
          </div>
          <BitCoinContent />
        </div>
      </div>
    );
  }
}

export default App;
