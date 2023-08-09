require('dotenv').config();


const url = "https://api.stratz.com/graphql";
// const api_token = process.env.STRATZ_API_KEY;
const api_token = '';
const headers = {
  "Authorization": `Bearer ${api_token}`,
  "Content-Type": "application/json"
};

const query = `query {
    heroStats {
      winDay(positionIds: POSITION_1) {
        heroId,
        winCount,
        matchCount
      }
    }
  }`;

function fetchData(query) {
    return fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ "query": query })
    })
    .then(response => {
      console.log(response.status);
      return response.json();
    })
    .catch(error => console.error('Error:', error));
  }

// console.log(fetchData(query));

// const createFetchWinDayData = (position) => {
//     `query {
//         heroStats {
//           winDay(positionIds: ${position}) {
//             heroId,
//             winCount,
//             matchCount
//           }
//         }
//       }`;
    
// }

async function getHeroStats() {
    const response = await fetchData(query);
    return response["data"]["heroStats"]["winDay"];
}

async function getWinCountMatchCount() {
    const heroWinCountMatchCount = {};
    const heroStats = await getHeroStats();
    for (let hero of heroStats) {
        if (heroWinCountMatchCount[hero['heroId']] === undefined) {
          heroWinCountMatchCount[hero['heroId']] = {'winCount': hero['winCount'], 'matchCount': hero['matchCount']};
        } else {
          heroWinCountMatchCount[hero['heroId']]['winCount'] += hero['winCount']
          heroWinCountMatchCount[hero['heroId']]['matchCount'] += hero['matchCount']
        }
    };
    for (let hero in heroWinCountMatchCount) {
        heroWinCountMatchCount[hero]['winRate'] = Number((heroWinCountMatchCount[hero]['winCount'] * 100 / heroWinCountMatchCount[hero]['matchCount']).toFixed(2));

    }
    
    return heroWinCountMatchCount;
}

const queryHeroData = `query {
    constants{
      heroes(language: ENGLISH) {
        id,
        name
      }
    }
  }`;

async function getHeroData() {
    const responce = await fetchData(queryHeroData);
    for (let item of responce["data"]["constants"]["heroes"]) {
    }
    return responce["data"]["constants"]["heroes"];
}


async function getTopHeroes() {
    const heroIdsNames = await getHeroData();
    const topHeroes = await getWinCountMatchCount();
    const topFiveHeroes = Object.entries(topHeroes).sort(
        ([, heroData], [, heroData2]) =>  heroData2.winRate - heroData.winRate
    ).slice(0, 5).reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

    const namedTop = {}
    for (elem of heroIdsNames) {
        if (elem.id in topFiveHeroes) {
            namedTop[elem.name] = topFiveHeroes[elem.id].winRate;
        }
    }
    console.log(namedTop);
    return namedTop;
}

(async () => {
    await getTopHeroes();
})()