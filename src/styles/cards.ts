import styled from "styled-components";

const StyledPageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media ${props => props.theme.media.phone} {
    margin-bottom: 10px;
  }
}
`;

const StyledTitleH1 = styled.h1`
  font-size: 30px;
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: 5px;
  margin-bottom: 30px;

  @media ${props => props.theme.media.phone} {
    margin: 5px;
  }
}
`;

const StyledHeroSelector = styled.div`
  display: flex;
  gap: 20px;

  &:before {
    content: "Role & MMR";
    color: var(--text);
    margin-right: 10px;
    margin-bottom: auto;
    margin-top: auto;
  }

  @media ${props => props.theme.media.phone} {
    grid-template-columns: 1fr 1fr; /* split into 2 columns */
    gap: 10px;
    align-items: center;
    margin-left: auto;

    &:before {
        min-width: 100px;
    }
  }
}
`;

const StyledHeroCardsMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
}
`;

const StyledErrorDiv = styled.div`
    color: #ff5500;
    text-align: center;
    font-size: 1.5rem;
}
`;

export { StyledErrorDiv, StyledTitleH1, StyledHeroCardsMain, StyledHeroSelector, StyledPageHeader };
