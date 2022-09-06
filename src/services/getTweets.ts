import Axios from 'axios';

const getTweets = async (searchTerm: string) => {
  try {
    const response = await Axios.get(
      `/.netlify/functions/get-tweets?search=${searchTerm}`,
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    if (response.status === 200) {
      return response.data;
    }
    return new Error('Failed to fetch tweets...');
  } catch (error) {
    return error;
  }
};

export default getTweets;
