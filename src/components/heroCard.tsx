interface HeroCardProps {
  name: string;
  imgSrc: string;
  winRate: number;
}

const HeroCard: React.FC<HeroCardProps> = ({ name, imgSrc, winRate }) => {
  return (
    <div className="heroCard">
      <h2>{name}</h2>
      <img src={imgSrc} alt={`${name} thumbnail`} />
      <p>Winrate: {winRate}%</p>
    </div>
  );
};

export default HeroCard;
