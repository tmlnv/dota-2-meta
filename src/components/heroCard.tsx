import React, { useState } from "react";
import { StyledHeroCard, Title, ImgContainer, StyledSmallLoader, StyledImg, StyledParagraph } from "../styles/heroCard";

interface HeroCardProps {
  name: string;
  imgSrc: string;
  winRate: number;
}

const HeroCard: React.FC<HeroCardProps> = ({ name, imgSrc, winRate }) => {
  const [isImgLoading, setIsImgLoading] = useState(true);

  return (
    <StyledHeroCard className="heroCard">
      <Title>{name}</Title>
      <ImgContainer className="image-container">
        {isImgLoading && <StyledSmallLoader />}
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
