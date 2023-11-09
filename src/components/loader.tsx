import StyledLoaderDiv from "../styles/loader";

interface LoaderProps {
  $dim?: string;
  $position?: string;
  $circleDim?: string;
}

const Loading: React.FC<LoaderProps> = (props) => (
  <StyledLoaderDiv {...props}>
    <div className="loader">
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
    </div>
  </StyledLoaderDiv>
);

export default Loading;
