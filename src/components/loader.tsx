import StyledLoader from "../styles/loader";

const Loading: React.FC = () => (
  <StyledLoader>
    <div className="loader">
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
    </div>
  </StyledLoader>
);

export default Loading;
