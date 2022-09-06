import { Handler } from '@netlify/functions';
import Axios from 'axios';

/* 
 Using netlify to get around twitter api v2 not supporting CORs requests
 directly from front-end
*/

const TWITTER_AUTH_TOKEN = process.env.REACT_APP_TWITTER_AUTH_TOKEN;

export const handler: Handler = async (event, context) => {
  const searchTerm = event.queryStringParameters?.search;

  try {
    const { data } = await Axios.get(
      `https://api.twitter.com/2/tweets/search/recent?query=${searchTerm}&tweet.fields=entities,created_at&expansions=author_id`,
      {
        headers: {
          Authorization: `Bearer ${TWITTER_AUTH_TOKEN}`,
        },
      },
    );
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch tweets..' }), // could be improved
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
};
