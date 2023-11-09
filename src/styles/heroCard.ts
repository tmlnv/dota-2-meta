import styled from "styled-components";
import Loader from "../components/Loader";

const StyledHeroCard = styled.div`
  display: grid;
  grid-template-columns: 30% auto auto;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  border: 3px solid;
  border-color: var(--text);
  background-color: var(--card-bg);
  color: var(--text);
  position: relative;
  transition: all 0.3s ease;

  /* Rankings */
  &:before {
    position: absolute;
    top: 0;
    right: 10px;
    padding: 5px;
    border-radius: 5px;
  }

  &:nth-child(1):before {
    content: "Top 1";
    background-color: gold;
    margin-top: 10px;
  }
  &:nth-child(2):before {
    content: "Top 2";
    background-color: silver;
    margin-top: 10px;
  }
  &:before {
    content: "Top 3";
    background-color: #cd7f32;
    margin-top: 10px;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h1`
  font-size: 20px;
  margin: 10px;
  text-align: justify;
  min-width: max-content;
`;

const ImgContainer = styled.div`
  position: relative; /* Continue to position relative for absolute positioning inside */
  display: flex; /* Use flexbox to center children */
  justify-content: center; /* Center children horizontally */
  align-items: center; /* Center children vertically */
  width: 100px;
  height: 100px;
  border-radius: 10px;
  border: 2px solid;
  border-color: var(--text);
  object-fit: cover;
  overflow: hidden;
`;

const StyledSmallLoader = styled(Loader)`
  position: absolute;
  --dim: 2rem;

  & circle {
    --dim: 0.7rem;
    width: var(--dim);
    height: var(--dim);
  }
`;

const StyledImg = styled.img`
  object-fit: cover; /* This will cover the area, and won't stretch the image */
  position: absolute; /* Take the image out of the document flow */
  width: 100%;
  height: 100%;
  }
`;

const StyledParagraph = styled.p`
  margin-left: 10%;
  font-weight: bold;
  text-align: right;
  }
`;

export { ImgContainer, StyledHeroCard, StyledImg, StyledParagraph, StyledSmallLoader, Title };
