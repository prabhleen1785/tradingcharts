import React from "react";

class BitCoinContent extends React.PureComponent {
  render() {
    return (
      <div className={"bitcoin-content-wrapper"}>
        <div className={"bitcoin-heading"}>Profile</div>
        <div className={"bitcoin-content"}>
          This is the most popular Bitcoin pair in the world. Bitcoin uses
          peer-to-peer technology to operate with no central authority or banks;
          managing transactions and the issuing of Bitcoins is carried out
          collectively by the network. Bitcoin is open-source; its design is
          public, nobody owns or controls this cryptocurrency and everyone can
          take part. Bitcoin price grew significantly within a short period of
          time making the BTC/USD pair quite popular among active traders and
          investors. Through many of its unique properties, Bitcoin allows
          exciting uses that could not be covered by any previous payment
          system.
        </div>
      </div>
    );
  }
}

export default BitCoinContent;
