import Axios from 'axios';

/* `/.netlify/functions/get-tweets?search=${username}`, */

const URL = 'https://63165dde82797be77fe434dc.mockapi.io/tweets';

export const getTweets = async (username: string) => {
  try {
    const response = await Axios.get(URL, {
      headers: { accept: 'Accept: application/json' },
    });
    if (response.status === 200) {
      return await response.data.json();
    }
    return new Error('Failed to fetch tweets');
  } catch (error) {
    return error;
  }
};
