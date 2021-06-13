import React, { Component } from "react";

class Timer extends Component {
  render() {
    timer = (seconds) => {
      let sec = seconds % 60;
      let min = 0;
      let hour = 0;
      let day = 0;
      let year = 0;
      if (seconds == 0) return console.log("now");
      else {
        while (seconds > 0) {
          min = seconds / 60;
          seconds = seconds - min;
          if (min >= 60) hour++;
          if (hour >= 24) day++;
          if (day >= 365) year++;
        }

        return console.log(year, ", ", day, ", ", hour, ", ", min, ", ", sec);
      }
    };

    return <div>{this.timer(0)}</div>;
  }
}

export default Timer;
