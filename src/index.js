import './styles.css';

const OPEN_DOTA_API_URL = 'https://api.opendota.com/';

const WIN_TIERS = [
  '1_win', '2_win', '3_win', '4_win', '5_win', '6_win', '7_win', '8_win',
];
const PICK_TIERS = [
  '1_pick', '2_pick', '3_pick', '4_pick', '5_pick', '6_pick', '7_pick', '8_pick',
];

const MMRMAPPING = {
  herald: 0,
  guardian: 1,
  crusaders: 2,
  archon: 3,
  legend: 4,
  ancient: 5,
  divine: 6,
  immortal: 7,
}

function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme');
  body.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
}

document.getElementById('colorThemeToggleButton').addEventListener('click', toggleTheme);

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(dropdown => {
  const selectedOption = dropdown.querySelector(".selected-option");
  const list = dropdown.querySelector("ul");
  
  selectedOption.addEventListener("click", function() {
    // Close other dropdowns
    dropdowns.forEach(d => {
      if (d !== dropdown) {
        d.classList.remove("open");
        d.querySelector("ul").classList.add("hidden"); // hide the list of other dropdowns
      }
    });
    
    // Toggle the clicked dropdown
    dropdown.classList.toggle("open");
    list.classList.toggle("hidden"); // toggle the hidden class
  });
});

// Close the dropdown when clicked outside of it
window.addEventListener("click", function(event) {
  if (!event.target.matches(".selected-option")) {
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove("open");
      dropdown.querySelector("ul").classList.add("hidden"); // hide the list
    });
  }
});

let apiData = {};

async function getHeroStats() {
  console.log('fetching api response');
  const response = await fetch(`${OPEN_DOTA_API_URL}api/heroStats`);
  apiData = await response.json();
}


async function getByRole(role) {
  const byRoleList = [];
  console.log('getting by role');
  const heroStats = apiData;
  console.log('HeroStats', heroStats);
  for (const hero of heroStats) {
    if (hero.roles.includes(role)) {
      byRoleList.push(hero);
    }
  }
  console.log('ROLE IS ', role)
  console.log('ByRoleList', byRoleList);
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

async function getMeta(numberTop, role, mmr) {
  let byWinRate = {};
  let byRoleList = [];
  console.log('MMR IS ', mmr)
  const win = mmr === "All" ? WIN_TIERS : WIN_TIERS[mmr];
  const pick = mmr === "All" ? PICK_TIERS : PICK_TIERS[mmr];
  console.log('getting meta');
  if (role !== "All") {
    byRoleList = await getByRole(role);
  } else {
    byRoleList = apiData;
  }
  for (const hero of byRoleList) {
    const winrate = totalAmongTiers(hero, win) / totalAmongTiers(hero, pick) * 100;
    byWinRate[hero.localized_name] = winrate.toFixed(2);
  }
  return Object.entries(byWinRate)
      .sort((a, b) => b[1] - a[1])
      .slice(0, numberTop);
}

async function getHeroImg(heroName) {
  const formattedHeroName = heroName.replace(/[\s\W]+/g, '_').toLowerCase();

  return `http://api.opendota.com/apps/dota2/images/heroes/${formattedHeroName}_full.png`;
}

async function fetchHeroData(role, mmr) {
  console.log('matching heroes');
  const metaHeroes = await getMeta(3, role, mmr);
  console.log(metaHeroes);
  return [
    {
      name: metaHeroes[0][0],
      winRate: metaHeroes[0][1],
    },
    {
      name: metaHeroes[1][0],
      winRate: metaHeroes[1][1],
    },
    {
      name: metaHeroes[2][0],
      winRate: metaHeroes[2][1],
    },
  ];
}


async function populateHeroCards(role='All', mmr='All') {
  const heroes = await fetchHeroData(role, mmr);
  const heroCardsDiv = document.getElementById('heroCards');

  heroCardsDiv.innerHTML = '';

  for (const hero of heroes) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('heroCard');

    const heroName = document.createElement('h2');
    heroName.textContent = hero.name;
    cardDiv.appendChild(heroName);

    const heroImage = document.createElement('img');
    heroImage.src = await getHeroImg(hero.name);
    cardDiv.appendChild(heroImage);

    const heroWinRate = document.createElement('p');
    heroWinRate.textContent = 'Winrate: ' + hero.winRate + '%';
    cardDiv.appendChild(heroWinRate);

    heroCardsDiv.appendChild(cardDiv);
  }
}

// Handling Role Selection
document.getElementById('roleDropdown').querySelectorAll('li').forEach(item => {
  item.addEventListener('click', async function() {
    const role = this.textContent;
    const mmr = getCurrentlySelectedMmr();
    await populateHeroCards(role, mmr);
    // Close dropdown
    document.getElementById('roleDropdown').classList.remove('open');
  });
});

// Handling MMR Selection
document.getElementById('mmrDropdown').querySelectorAll('li').forEach(item => {
  item.addEventListener('click', async function() {
    const mmrValue = this.textContent.toLowerCase();
    const role = getCurrentlySelectedRole(); // Function to determine the currently selected role
    const mmr = MMRMAPPING[mmrValue];
    await populateHeroCards(role, mmr);
    // Close dropdown
    document.getElementById('mmrDropdown').classList.remove('open');
  });
});

// Function to determine the currently selected role
function getCurrentlySelectedRole() {
  const roleDropdown = document.getElementById('roleDropdown');
  return roleDropdown.querySelector(".selected-option").textContent;
}

// Function to determine the currently selected mmr
function getCurrentlySelectedMmr() {
  const roleDropdown = document.getElementById('mmrDropdown');
  return roleDropdown.querySelector(".selected-option").textContent;
}


(async () => {
  await getHeroStats();
  await populateHeroCards();
})();
