import React from "react";

class BestBid extends React.PureComponent {
  render() {
    const { heading, value, marginRight } = this.props;
    return (
      <div
        className={
          marginRight ? "outer-bid-box" : `outer-bid-box margin-bid-box`
        }
      >
        <div className={"heading-bid-box"}>{heading}</div>
        <div className={"body-bid-box"}>{value}</div>
      </div>
    );
  }
}

export default BestBid;
