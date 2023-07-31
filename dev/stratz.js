const url = "https://api.stratz.com/graphql";
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
    console.log(response)
    return response["data"]["heroStats"]["winDay"];
}

async function getWinCountMatchCount() {
    const heroWinCountMatchCount = {};
    const heroStats = await getHeroStats();
    for (let hero of heroStats) {
        console.log(hero);
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
    
    console.log(heroWinCountMatchCount);
    return heroWinCountMatchCount;
}

(async () => {
  await getWinCountMatchCount();
})()