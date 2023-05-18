// search - String
// code - String
// name - String
// to - DATE (YYYY-MM-DD)
// timezone - String
// season - Number
// status - String
// last - Number
// round - String
// live - String
// league - Number
// from - DATE (YYYY-MM-DD)
// date - DATE (YYYY-MM-DD)
// next - Number
// team - Number
// current - String
// h2h - String
// fixture - Number
// type - String
// player - Number
// id - Number
// page - Number
// bet - Number
// bookmaker - Number
// coach - Number
// city - String
// country - String

import apiClient from "../../service/apiClientBase";
import { saveData, loadData } from "../../config/indexedDBConfig";

const createDataLoader =
  (
    endpoint: string,
    extractData: (data: any) => any = (data) => data,
    keyParts: string[] = []
  ) =>
  async (...args: any[]) => {
    const indexedDBKey = [
      endpoint,
      ...keyParts.map((part, i) => `${part}_${args[i]}`),
    ].join("_");
    const savedData = await loadData(indexedDBKey, 24); // 24 hours

    if (savedData) {
      return savedData;
    }

    try {
      const params = Object.fromEntries(
        keyParts.map((part, i) => [part, args[i]])
      );
      const response = await apiClient.get(`/v3/${endpoint}`, { params });

      const data = extractData(response.data);
      await saveData(indexedDBKey, data);

      return data;
    } catch (error) {
      console.error(error);
      throw new Error(`Error fetching ${endpoint}`);
    }
  };

// Timezone
export const getTimezone = createDataLoader(
  "timezone",
  (data) => data.response
);

// Countries
export const getCountries = createDataLoader(
  "countries",
  (data) => data.response,
  // Optional parameters
  ["search", "code", "name"]
);

// Fixtures
export const getFixtures = createDataLoader(
  "fixtures",
  (data) => data.response,
  // Optional parameters
  [
    "to",
    "timezone",
    "season",
    "status",
    "last",
    "round",
    "live",
    "league",
    "from",
    "date",
    "next",
    "team",
  ]
);
export const getFixturesRounds = createDataLoader(
  "fixtures/rounds",
  (data) => data.response,
  // Required parameters
  [
    "league",
    "season",
    /* Optional parameters*/
    "current",
  ]
);
export const getFixtureshead2head = createDataLoader(
  "fixtures/headtohead",
  (data) => data.response,
  // Required parameters
  [
    "h2h",
    /* Optional parameters*/
    "league",
    "status",
    "season",
    "timezone",
    "from",
    "last",
    "date",
    "next",
    "to",
  ]
);
export const getFixturesEvents = createDataLoader(
  "fixtures/events",
  (data) => data.response,
  // Required parameters
  [
    "fixture",
    /* Optional parameters*/
    "type",
    "player",
    "team",
  ]
);
export const getFixturesStatistics = createDataLoader(
  "fixtures/statistics",
  (data) => data.response,
  // Required parameters
  [
    "fixture",
    /* Optional parameters*/
    "team",
    "type",
  ]
);
export const getFixturesPrediction = createDataLoader(
  "predictions",
  (data) => data.response,
  ["fixture"]
);
export const getFixturesLineups = createDataLoader(
  "lineups",
  (data) => data.response,
  // Required parameters
  [
    "fixture",
    /* Optional parameters*/
    "type",
    "player",
    "team",
  ]
);

// Players
export const getPlayersFixturesStatistics = createDataLoader(
  "players/fixtures",
  (data) => data.response,
  // Required parameters
  [
    "fixture",
    /* Optional parameters*/
    "team",
  ]
);
export const getSeasonForPlayer = createDataLoader(
  "players/seasons",
  (data) => data.response
);
export const getPlayersSeasonStatistics = createDataLoader(
  "players/seasons",
  (data) => data.response,
  // Optional parameters
  ["season", "search", "id", "league", "team", "page"]
);
export const getTopScorers = createDataLoader(
  "players/topscorers",
  (data) => data,
  // Required parameters
  ["season", "league"]
);
//Odds
export const getBookmakers = createDataLoader(
  "bookmakers",
  (data) => data.response,
  // Optional parameters
  ["id", "search"]
);
export const getOdds = createDataLoader("odds", (data) => data.response, [
  // Optional parameters
  "date",
  "page",
  "timezone",
  "bookmaker",
  "fixture",
  "season",
  "bet",
  "league",
]);
export const getBets = createDataLoader(
  "odds/bets",
  (data) => data.response,
  // Optional parameters
  ["search", "id"]
);
export const getMapping = createDataLoader(
  "odds/mapping",
  (data) => data.response,
  // Optional parameters
  ["page"]
);

// Standings
export const getStandings = createDataLoader(
  "standings",
  (data) => data.response,
  // Required parameters
  [
    "season",
    /* Optional parameters*/
    "team",
    "league",
  ]
);

// League
export const getLeagues = createDataLoader(
  "leagues",
  (data) => ({
    api: { response: data.response },
  }),
  // Optional parameters
  [
    "last",
    "type",
    "name",
    "search",
    "team",
    "current",
    "season",
    "code",
    "country",
  ]
);
export const getSeasons = createDataLoader("seasons", (data) => data.response);

// Teams
export const getTeams = createDataLoader("teams", (data) => data.response, [
  // Optional parameters
  "name",
  "seach",
  "id",
  "league",
  "season",
  "country",
]);
export const getTeamsStatistics = createDataLoader(
  "teams/statistics",
  (data) => data.response,
  // Required parameters
  [
    "team",
    "league",
    "season",
    // Optional parameters
    "date",
  ]
);

//Trophies
export const getTrophies = createDataLoader(
  "trophies",
  (data) => data.response,
  // Optional parameters
  ["coach", "player"]
);

//Sidelined
export const getSidelined = createDataLoader(
  "sidelined",
  (data) => data.response,
  // Optional parameters
  ["player", "coach"]
);

// coaches
export const getCoaches = createDataLoader(
  "coaches",
  (data) => data.response,
  // Optional parameters
  ["team", "search", "id"]
);

// Transfers
export const getTransfers = createDataLoader(
  "transfers",
  (data) => data.response,
  // Optional parameters
  ["team", "player"]
);

// Venues
export const getVenues = createDataLoader(
  "venues",
  (data) => data.response,
  // Optional parameters
  ["name", "id", "country", "city", "search"]
);
