import React, { useState } from "react";
import {
  ImgContainer,
  StyledHeroCard,
  StyledImg,
  StyledParagraph,
  TitleH2,
} from "../styles/heroCard";
import Loader from "./Loader";

interface HeroCardProps {
  name: string;
  imgSrc: string;
  winRate: number;
}

const HeroCard: React.FC<HeroCardProps> = ({ name, imgSrc, winRate }) => {
  const [isImgLoading, setIsImgLoading] = useState(true);

  return (
    <StyledHeroCard>
      <TitleH2>{name}</TitleH2>
      <ImgContainer>
        {isImgLoading && (
          <Loader $dim="2rem" $position="absolute" $circleDim="0.7rem" />
        )}
        <StyledImg
          src={imgSrc}
          alt={`${name} thumbnail`}
          style={{ display: isImgLoading ? "none" : "block" }}
          onLoad={() => setIsImgLoading(false)}
        />
      </ImgContainer>
      <StyledParagraph>Winrate: {winRate}%</StyledParagraph>
    </StyledHeroCard>
  );
};

export default HeroCard;
