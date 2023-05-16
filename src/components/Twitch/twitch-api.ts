import axios, { AxiosRequestConfig } from 'axios';

const clientId = '65c87wwt7b8odaqd7b0hzgulachem3';
const clientSecret = 'b50zus7u1znwejg8uvgzztqbbkdmu2';

async function getAccessToken() {
  const tokenResponse = await axios.post(
    `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`
  );
  return tokenResponse.data.access_token;
}

export async function getConfig() {
  const accessToken = await getAccessToken();
  return {
    headers: {
      'Client-ID': clientId,
      'Authorization': `Bearer ${accessToken}`,
    },
  };
}

export function getTwitchApiCall(url: string, config: AxiosRequestConfig) {
  return axios.get(url, config);
}

export function postTwitchApiCall(url: string, config: AxiosRequestConfig) {
  return axios.post(url, config);
}

