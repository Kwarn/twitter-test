import React, { Component } from 'react';
import { ITweet } from '../../types';
import Tweet from '../Tweet';
import { RouteComponentProps } from 'react-router-dom';
import { getTweets } from '../../Services/getTweets';
import './style.css';

interface ITweetsState {
  tweetsByUserName: ITweet[] | null;
  isError: boolean;
  username: string | null;
}

class Tweets extends Component<RouteComponentProps, ITweetsState> {
  state: ITweetsState = {
    tweetsByUserName: null,
    isError: false,
    username: '',
  };

  getUsernameFromParams() {
    const query = new URLSearchParams(this.props.location.search);
    return query.get('query');
  }

  async fetchTweets(username: string) {
    const result: ITweet[] | Error = await getTweets(username);
    if (result instanceof Error) {
      return this.setState((prevState) => ({
        ...prevState,
        tweetsByUserName: [],
        isError: true,
      }));
    }
    this.setState((prevState) => ({
      ...prevState,
      tweetsByUserName: result,
      isError: false,
    }));
  }

  async componentDidMount() {
    const username = this.getUsernameFromParams();
    if (username) {
      this.setState({ ...this.state, username: username });
      this.fetchTweets(username);
    }
  }

  async componentDidUpdate() {
    console.log(this.state.tweetsByUserName)
    const username = this.getUsernameFromParams();
    if (username && username !== this.state.username) {
      this.setState({ ...this.state, username: username });
      this.fetchTweets(username);
    }
  }
  // //TODO Retrieve the user name passed to this component after clicking the Submit button, and use it to query the
  // //Tweets API endpoint. The user name needs to be passed into the tweets endpoint as a query param called
  // //userName.

  // /**
  //  * Retrieves the most popular hash tag tweeted by the given user.
  //  * Note that the string returned by this method should not include the hashtag itself.
  //  * For example, if the most popular hash tag is "#React", this method should return "React".
  //  * If there are no tweets for the given user, this method should return "N/A".
  //  */
  // getMostPopularHashTag(tweets) {
  //   //TODO Implement
  //   //pseudo code due to time constraints
  //   /*

  //   */
  // }

  // /**
  //  * Retrieves the highest number of tweets that were created on any given day by the given user.
  //  * A day's time period here is defined from 00:00:00 to 23:59:59
  //  * If there are no tweets for the given user, this method should return 0.
  //  */
  // getMostTweetsInOneDay(tweets) {
  //   //TODO Implement
  // }

  // /**
  //  * Finds the first 6 characters of the ID of the longest tweet for the given user.
  //  * For example, if the ID of the longest tweet is "0b88c8e3-5ade-48a3-a5a0-8ce356c02d2a",
  //  * then this function should return "0b88c8".
  //  * You can assume there will only be one tweet that is the longest.
  //  * If there are no tweets for the given user, this method should return "N/A".
  //  */
  // getLongestTweetIdPrefix(tweets) {
  //   //TODO Implement
  // }

  // /**
  //  * Retrieves the most number of days between tweets by the given user.
  //  * This should always be rounded down to the complete number of days, i.e. if the time is 12 days & 3 hours, this
  //  * method should return 12.
  //  * If there are no tweets for the given user, this method should return 0.
  //  */
  // getMostDaysBetweenTweets(tweets) {
  //   //TODO Implement
  // }
  // // }

  render() {
    return (
      <div className='stats-boxes'>
        <>
          <div className='stats-box-row-1'>
            <div className='stats-box'>
              <div className='stats-box-heading'>Most popular hashtag</div>
              <div id='most-popular-hashtag' className='stats-box-info'>
                {/* {this.getMostPopularHashTag(this.state.tweetsByUserName)} */}
              </div>
            </div>
            <div className='stats-box-right stats-box'>
              <div className='stats-box-heading'>Most Tweets in one days</div>
              <div id='most-tweets' className='stats-box-info'>
                {/* {this.getMostTweetsInOneDay(this.state.tweetsByUserName)} */}
              </div>
            </div>
          </div>
          <div>
            <div className='stats-box'>
              <div className='stats-box-heading'>Longest Tweet ID</div>
              <div id='longest-tweet-id' className='stats-box-info'>
                {/* {this.getLongestTweetIdPrefix(this.state.tweetsByUserName)} */}
              </div>
            </div>
            <div className='stats-box-right stats-box'>
              <div className='stats-box-heading'>Most days between Tweets</div>
              <div id='most-days' className='stats-box-info'>
                {/* {this.getMostDaysBetweenTweets(this.state.tweetsByUserName)} */}
              </div>
            </div>
            <div className='tweet-items-container'>
              {this.state.tweetsByUserName &&
                this.state.tweetsByUserName.map((tweet: ITweet) => (
                  <div key={`tweet-${tweet.id}`}>
                    <Tweet tweet={tweet} />
                  </div>
                ))}
            </div>
            {this.state.isError && (
              <p>Something went wrong: unable to fetch tweets..</p>
            )}
          </div>
        </>
      </div>
    );
  }
}

export default Tweets;
