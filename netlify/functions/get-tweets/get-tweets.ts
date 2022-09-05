import { Handler } from '@netlify/functions';
import Axios from 'axios';
const TWITTER_AUTH_TOKEN = process.env.REACT_APP_TWITTER_AUTH_TOKEN;

export const handler: Handler = async (event, context) => {
  const params = new URLSearchParams(event.queryStringParameters?.search);
  const username = params.get('search') || 'BillGates';

  try {
    const { data } = await Axios.get(
      `https://api.twitter.com/2/tweets/search/recent?query=from:${username}&tweet.fields=entities&expansions=author_id`,
      { headers: { Authorization: `Bearer ${TWITTER_AUTH_TOKEN}` } },
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch.' }),
    };
  }
};
