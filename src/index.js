// app.js
// import fetch from 'node-fetch';
import "./styles.css"

const OPEN_DOTA_API_URL = "https://api.opendota.com/";

export const WIN_TIERS = ["1_win", "2_win", "3_win", "4_win", "5_win", "6_win", "7_win", "8_win"];
export const PICK_TIERS = ["1_pick", "2_pick", "3_pick", "4_pick", "5_pick", "6_pick", "7_pick", "8_pick"];

export async function getHeroStats() {
    const response = await fetch(`${OPEN_DOTA_API_URL}api/heroStats`);
    return response.json();
}

export async function getHeroItems(heroId) {
    const response = await fetch(`${OPEN_DOTA_API_URL}api/heroes/${heroId}/itemPopularity`);
    return response.json();
}

export async function getMmrDistributions() {
    const response = await fetch(`${OPEN_DOTA_API_URL}api/distributions`);
    return response.json();
}

async function getByRole(role) {
    const byRoleList = [];
    const heroStats = await getHeroStats();
    for (let hero of heroStats) {
        if (hero.roles.includes(role)) {
            byRoleList.push(hero);
        }
    }
    return byRoleList;
}

function totalAmongTiers(hero, tiers) {
    return Object.entries(hero).reduce((sum, [key, res]) => {
        if (tiers.includes(key)) {
            return sum + res;
        }
        return sum;
    }, 0);
}

export async function getMeta(numberTop, role) {
    const byWinrate = {};
    const byRoleList = await getByRole(role);
    for (let hero of byRoleList) {
        const winrate = totalAmongTiers(hero, WIN_TIERS) / totalAmongTiers(hero, PICK_TIERS) * 100;
        byWinrate[hero.localized_name] = winrate.toFixed(2);
    }
    return Object.entries(byWinrate)
        .sort((a, b) => b[1] - a[1])
        .slice(0, numberTop);
}

export async function getHeroImg(heroName) {
    // const response = await fetch(`${OPEN_DOTA_API_URL}apps/dota2/images/dota_react/heroes/${hero}.png?`,  { mode: 'no-cors'});
    // const response = await fetch(`${OPEN_DOTA_API_URL}apps/dota2/images/heroes/slardar_full.png?`,  { mode: 'no-cors'});
    // if (response.status === 200) {
            
    //     const imageBlob = await response.blob();
    //     console.log(imageBlob);
    //     const imageObjectURL = URL.createObjectURL(imageBlob);
    
    //     const image = document.createElement('img')
    //     image.src = imageObjectURL
    //     const container = document.getElementById("heroCard")
    //     container.append(image)
    // }

    // return response.blob();
    const formattedHeroName = heroName.replace(/[\s\W]+/g, '_').toLowerCase();

    return `http://api.opendota.com/apps/dota2/images/heroes/${formattedHeroName}_full.png`
}

async function fetchHeroData() {
    const metaHeroes = await getMeta(3, "Carry");
    return [
        {
          name: metaHeroes[0][0],
        //   imageUrl: await getHeroImg(metaHeroes[0][0]),
          winRate: metaHeroes[0][1],
        },
        {
          name: metaHeroes[1][0],
        //   imageUrl: await getHeroImg(metaHeroes[1][0]),
          winRate: metaHeroes[1][1],
        },
        {
          name: metaHeroes[2][0],
        //   imageUrl: await getHeroImg(metaHeroes[2][0]),
          winRate: metaHeroes[2][1],
        },
      ];
    }

    // Make a request to your backend server to get the hero data.
    // For now, I will just use placeholder data.
//     return [
//       {
//         name: 'Hero 1',
//         imageUrl: 'url_to_hero_1_image',
//         winRate: 60
//       },
//       {
//         name: 'Hero 2',
//         imageUrl: 'url_to_hero_2_image',
//         winRate: 55
//       },
//       {
//         name: 'Hero 3',
//         imageUrl: 'url_to_hero_3_image',
//         winRate: 52
//       },
//     ];
//   }
  
  async function populateHeroCards() {
    const heroes = await fetchHeroData();
    const heroCardsDiv = document.getElementById('heroCards');
    
    heroCardsDiv.innerHTML = '';
    
    for (let hero of heroes) {
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('heroCard');
      
      const heroName = document.createElement('h2');
      heroName.textContent = hero.name;
      cardDiv.appendChild(heroName);
      
      const heroImage = document.createElement('img');
    //   heroImage.src = hero.imageUrl;
      heroImage.src = await getHeroImg(hero.name);
      cardDiv.appendChild(heroImage);
      
      const heroWinRate = document.createElement('p');
      heroWinRate.textContent = 'Winrate: ' + hero.winRate + '%';
      cardDiv.appendChild(heroWinRate);
      
      heroCardsDiv.appendChild(cardDiv);
    }
  }
  
//   populateHeroCards();

  (async () => {
    await populateHeroCards();
  })()
  