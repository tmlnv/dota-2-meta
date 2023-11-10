const OPEN_DOTA_API_URL = 'https://api.opendota.com';

const WIN_TIERS = [
  '1_win', '2_win', '3_win', '4_win', '5_win', '6_win', '7_win', '8_win',
];
const PICK_TIERS = [
  '1_pick', '2_pick', '3_pick', '4_pick', '5_pick', '6_pick', '7_pick', '8_pick',
];

const ALL_ROLES = ['Support', 'Escape', 'Nuker', 'Pusher', 'Initiator', 'Durable', 'Carry', 'Disabler']

type MmrMappingType = {
  [key: string]: 'All' | number;
};

const MMRMAPPING: MmrMappingType = {
  All: "All",
  Herald: 0,
  Guardian: 1,
  Crusader: 2,
  Archon: 3,
  Legend: 4,
  Ancient: 5,
  Divine: 6,
  Immortal: 7
};



export { ALL_ROLES, MMRMAPPING, OPEN_DOTA_API_URL, PICK_TIERS, WIN_TIERS };
