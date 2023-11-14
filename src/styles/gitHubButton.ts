import styled from "styled-components";

const GitHubStyled = styled.a`
  color: var(--text);
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #ff5500;
  }
}
`;

const StyledSvg = styled.svg`
  vertical-align: middle;
  fill: currentColor; /* this will make the SVG color adapt to the color of its parent, i.e., the anchor tag. */
}
`;

export { GitHubStyled, StyledSvg };
