import axios from "axios";
import React, { useEffect, useState } from "react";
import { MMRMAPPING, OPEN_DOTA_API_URL, PICK_TIERS, WIN_TIERS } from "./config";
import DropDown from "./DropDown";
import HeroCard from "./HeroCard";
import Loading from "./Loader";

const roles = [
  "All",
  "Carry",
  "Nuker",
  "Support",
  "Pusher",
  "Initiator",
  "Durable",
  "Disabler",
];

interface Hero {
  localized_name: string;
  roles: string[];
  img: string;
  "1_pick": number;
  "2_pick": number;
  "3_pick": number;
  "4_pick": number;
  "5_pick": number;
  "6_pick": number;
  "7_pick": number;
  "8_pick": number;
  "1_win": number;
  "2_win": number;
  "3_win": number;
  "4_win": number;
  "5_win": number;
  "6_win": number;
  "7_win": number;
  "8_win": number;
}

type MetaHero = {
  heroName: string;
  heroWinRate: number;
  heroImg: string;
};

const Cards: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [apiData, setApiData] = useState<Hero[]>([]);
  const [heroes, setHeroes] = useState<MetaHero[]>([]);

  const [errorApi, setErrorApi] = useState<string | null>(null);

  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [selectedMmr, setSelectedMmr] = useState<"All" | number>("All");

  const filterHeroes = () => {
    const topHeroes = getMeta(5, selectedRole, selectedMmr);
    setHeroes(topHeroes);
  };

  function getByRole(role: string): Hero[] {
    const byRoleList: Hero[] = [];
    console.log("getting by role");
    for (const hero of apiData) {
      console.log("hero", hero);
      if (hero.roles.includes(role)) {
        byRoleList.push(hero);
      }
    }
    console.log("ROLE IS ", role);
    console.log("ByRoleList", byRoleList);
    return byRoleList;
  }

  function totalAmongTiers(hero: Hero, tiers: string[] | string): number {
    let tierKeys: string[] = [];
    if (typeof tiers === "string") {
      tierKeys = [tiers];
    } else {
      tierKeys = tiers;
    }

    const res = Object.entries(hero).reduce((sum, [key, value]) => {
      if (tierKeys.includes(key)) {
        return sum + (value as number);
      }
      return sum;
    }, 0);

    console.log(res);
    return res;
  }

  function getMeta(
    numberTop: number,
    role: string,
    mmr: "All" | number
  ): MetaHero[] {
    let byWinRate: MetaHero[] = [];
    let byRoleList: Hero[] = [];
    console.log("MMR IS ", mmr);
    const win = mmr === "All" ? WIN_TIERS : WIN_TIERS[mmr];
    const pick = mmr === "All" ? PICK_TIERS : PICK_TIERS[mmr];
    console.log("getting meta");
    if (role !== "All") {
      byRoleList = getByRole(role);
    } else {
      byRoleList = apiData;
    }
    for (const hero of byRoleList) {
      const winrate =
        (totalAmongTiers(hero, win) / totalAmongTiers(hero, pick)) * 100;
      byWinRate.push({
        heroName: hero.localized_name,
        heroWinRate: parseFloat(winrate.toFixed(2)),
        heroImg: hero.img,
      });
    }

    console.log(
      byWinRate
        .sort((a, b) => b.heroWinRate - a.heroWinRate)
        .slice(0, numberTop)
    );

    return byWinRate
      .sort((a, b) => b.heroWinRate - a.heroWinRate)
      .slice(0, numberTop);
  }

  // Fetch hero stats using Axios
  const getHeroStats = async () => {
    setIsLoading(true);
    setErrorApi(null);
    try {
      const response = await axios.get<Hero[]>(
        `${OPEN_DOTA_API_URL}/api/heroStats`
      );
      const neededInfo: Hero[] = response.data.map((hero) => ({
        localized_name: hero.localized_name,
        roles: hero.roles,
        img: `${OPEN_DOTA_API_URL}${hero.img}`,
        "1_pick": hero["1_pick"],
        "2_pick": hero["2_pick"],
        "3_pick": hero["3_pick"],
        "4_pick": hero["4_pick"],
        "5_pick": hero["5_pick"],
        "6_pick": hero["6_pick"],
        "7_pick": hero["7_pick"],
        "8_pick": hero["8_pick"],
        "1_win": hero["1_win"],
        "2_win": hero["2_win"],
        "3_win": hero["3_win"],
        "4_win": hero["4_win"],
        "5_win": hero["5_win"],
        "6_win": hero["6_win"],
        "7_win": hero["7_win"],
        "8_win": hero["8_win"],
      }));

      setApiData(neededInfo);
      console.log(apiData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching hero stats:", error);
      if (typeof error === "string") {
        setErrorApi(error.toUpperCase());
      } else if (error instanceof Error) {
        setErrorApi(error.message);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getHeroStats(); // Fetch data only once on component mount
      filterHeroes(); // Filter heroes once data is fetched
    };
    fetchData();
  }, []);

  useEffect(() => {
    filterHeroes();
  }, [selectedRole, selectedMmr, apiData]);

  return (
    <>
      <header className="page-header">
        <h1 className="title">Dota 2 Meta</h1>
        <div className="hero-selector">
          <DropDown
            id="roleDropdown"
            dataValue={roles}
            onValueChange={(newValue) => setSelectedRole(newValue)}
          />
          <DropDown
            id="mmrDropdown"
            dataValue={Object.keys(MMRMAPPING)}
            onValueChange={(newValue) => setSelectedMmr(MMRMAPPING[newValue])}
          />
        </div>
      </header>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {!errorApi && (
            <main id="heroCards" className="hero-cards">
              {heroes.map(({ heroName, heroImg, heroWinRate }) => (
                <HeroCard
                  key={heroName}
                  name={heroName}
                  imgSrc={heroImg}
                  winRate={heroWinRate}
                />
              ))}
            </main>
          )}
          {!!errorApi && <div className="error">{errorApi}</div>}
        </>
      )}
    </>
  );
};

export default Cards;
