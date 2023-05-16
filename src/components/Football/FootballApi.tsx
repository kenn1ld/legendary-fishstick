import apiClient from "../../service/apiClientBase";

const saveDataToLocalStorage = (key: string, data: any) => {
  const currentTimestamp = new Date().toISOString();
  const dataToSave = { data, timestamp: currentTimestamp };
  localStorage.setItem(key, JSON.stringify(dataToSave));
};

const loadDataFromLocalStorage = (key: string) => {
  const savedData = localStorage.getItem(key);
  if (!savedData) {
    return null;
  }
  const parsedData = JSON.parse(savedData);

  const oneDayInMs = 24 * 60 * 60 * 1000;
  const savedDataTimestamp = new Date(parsedData.timestamp);
  const now = new Date();

  if (now.getTime() - savedDataTimestamp.getTime() > oneDayInMs) {
    localStorage.removeItem(key);
    return null;
  }
  return parsedData.data;
};

export const getTopScorers = async (season: string, league: string) => {
  const localStorageKey = `topScorers_${season}_${league}`;
  const savedData = loadDataFromLocalStorage(localStorageKey);

  if (savedData) {
    return savedData;
  }

  try {
    const response = await apiClient.get("/players/topscorers", {
      params: {
        season,
        league,
      },
    });

    saveDataToLocalStorage(localStorageKey, response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getTeams = async (league: string, season: string) => {
  const localStorageKey = `teams_${league}_${season}`;
  const savedData = loadDataFromLocalStorage(localStorageKey);

  if (savedData) {
    return savedData;
  }

  try {
    const response = await apiClient.get("/teams", {
      params: {
        league,
        season,
      },
    });

    saveDataToLocalStorage(localStorageKey, response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// apiFunctions.ts

export const getLeagues = async () => {
  try {
    const response = await apiClient.get("/leagues");

    if (response && response.data && response.data.response) {
      const extractedData = {
        api: {
          response: response.data.response,
        },
      };
      return extractedData;
    } else {
      console.error("Failed to extract necessary data from response:", response);
    }
  } catch (error) {
    console.error(error);
  }
};