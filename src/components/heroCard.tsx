import React, { useState } from "react";
import Loader from "./Loader";

interface HeroCardProps {
  name: string;
  imgSrc: string;
  winRate: number;
}

const HeroCard: React.FC<HeroCardProps> = ({ name, imgSrc, winRate }) => {
  const [isImgLoading, setIsImgLoading] = useState(true);

  return (
    <div className="heroCard">
      <h2>{name}</h2>
      <div className="image-container">
        {isImgLoading && <Loader />}
        <img
          src={imgSrc}
          alt={`${name} thumbnail`}
          style={{ display: isImgLoading ? "none" : "block" }}
          onLoad={() => setIsImgLoading(false)}
        />
      </div>
      <p>Winrate: {winRate}%</p>
    </div>
  );
};

export default HeroCard;
