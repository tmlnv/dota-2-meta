import axios from 'axios';
import React, { useEffect, useState } from 'react';
import HeroCard from './HeroCard';
import { OPEN_DOTA_API_URL } from './config';

interface DynamicProperties {
    [key: string]: number;
}

interface Hero {
    // TODO add 1_pick and others
    localized_name: string;
    roles: string[];
    img: string;
    winRate: number;
    dynamicProps?: DynamicProperties  // динамический ключ
    // ... other properties ...
}

  
interface MetaHero {
name: string;
winRate: string;
}


const Cards: React.FC = () => {
    const [apiData, setApiData] = useState<Hero[]>([]);
    const [heroes, setHeroes] = useState<Hero[]>([]);

    // Fetch hero stats using Axios
    const getHeroStats = async () => {
        try {
            const response = await axios.get<Hero[]>(`${OPEN_DOTA_API_URL}/api/heroStats`);
            setApiData(response.data);
            console.log(response);
            const neededInfo: Hero[] = response.data.map(hero => ({
                localized_name: hero.localized_name,
                roles: hero.roles,
                img: `${OPEN_DOTA_API_URL}${hero.img}`,
                winRate: ((hero['1_win'] as number/ hero['1_pick'] as number) * 100).toFixed(2)
            }));
            setHeroes(neededInfo)
            console.log(neededInfo);
        } catch (error) {
            console.error('Error fetching hero stats:', error);
        }
    };
    

    useEffect(() => {
        getHeroStats();
    }, []);

    return (
        <main id="heroCards" className="hero-cards">
            {heroes.map(({localized_name, img, winRate}, index) => (
            <HeroCard key={index} name={localized_name} imgSrc={img} winRate={winRate}/>
            ))}
        </main>
    );
}

export default Cards;