import apiClient from '../../service/apiClientBase';
import { saveData, loadData } from '../../config/indexedDBConfig';

export const getTopScorers = async (season: string, league: string) => {
  const indexedDBKey = `topScorers_${season}_${league}`;
  const savedData = await loadData(indexedDBKey, 24);  // 24 hours

  if (savedData) {
    return savedData;
  }

  try {
    const response = await apiClient.get('/players/topscorers', {
      params: {
        season,
        league,
      },
    });

    await saveData(indexedDBKey, response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getTeams = async (league: string, season: string) => {
  const indexedDBKey = `teams_${league}_${season}`;
  const savedData = await loadData(indexedDBKey, 24); // 24 hours

  if (savedData) {
    return savedData;
  }

  try {
    const response = await apiClient.get('/teams', {
      params: {
        league,
        season,
      },
    });

    console.log('response:', response); // Log the response object

    const teamsData = response.data.response;

    await saveData(indexedDBKey, teamsData);

    if (Array.isArray(teamsData)) {
      return teamsData;
    } else {
      throw new Error('Invalid teams data');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching teams');
  }
};




export const getLeagues = async () => {
  const indexedDBKey = 'leagues';
  const savedData = await loadData(indexedDBKey, 24);  // 24 hours

  if (savedData) {
    return savedData;
  }

  try {
    const response = await apiClient.get('/leagues');

    if (response && response.data && response.data.response) {
      const extractedData = {
        api: {
          response: response.data.response,
        },
      };
      await saveData(indexedDBKey, extractedData);
      return extractedData;
    } else {
      console.error('Failed to extract necessary data from response:', response);
    }
  } catch (error) {
    console.error(error);
  }
};
