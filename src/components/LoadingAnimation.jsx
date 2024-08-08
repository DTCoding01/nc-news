import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/LoadingAnimation.json";
import '../css/components/LoadingAnimation.scss'

const LoadingAnimation = React.memo(() => {
 
  return (
    <div className="loading">
      <Lottie
        key="loading-animation"
        animationData={animationData}
        loop={true}
      />
    </div>
  );
});

export default LoadingAnimation;
