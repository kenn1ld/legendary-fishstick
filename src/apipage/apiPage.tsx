import React from "react";
import CryptoCurrency from "../components/CryptoCurrency";
import TwitchApi from "../components/Twitch";

const ApiPage = () => {
  return (
    <div>
      <CryptoCurrency />
      <TwitchApi />
    </div>
  );
};

export default ApiPage;