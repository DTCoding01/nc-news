import Lottie from "lottie-react";
import animationData from "../assets/LoadingAnimation.json";
export default function LoadingAnimation() {
  return (
    <div className="loading">
      <Lottie animationData={animationData} />
    </div>
  );
}
