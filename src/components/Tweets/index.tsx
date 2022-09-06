import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { findMostOccurring } from '../../utils/occurrences';
import { getTweets } from '../../services/getTweets';
import { getTimeDifference } from '../../utils/date';
import { ITweet, ITwitterData } from '../../types';
import Tweet from '../Tweet';
import './style.css';

interface ITweetsState {
  tweetsData: ITwitterData | null;
  isError: boolean;
  searchTerm: string | null;
}

class Tweets extends Component<RouteComponentProps, ITweetsState> {
  state: ITweetsState = {
    tweetsData: null,
    isError: false,
    searchTerm: '',
  };

  getSearchTermFromParams() {
    const query = new URLSearchParams(this.props.location.search);
    return query.get('query');
  }

  async fetchTweets(searchTerm: string) {
    const result: ITwitterData | Error = await getTweets(searchTerm);
    if (result instanceof Error) {
      return this.setState((prevState) => ({
        ...prevState,
        tweetsData: null,
        isError: true,
      }));
    }
    this.setState((prevState) => ({
      ...prevState,
      tweetsData: result,
      isError: false,
    }));
  }

  componentDidMount() {
    const searchTerm = this.getSearchTermFromParams();
    if (searchTerm) {
      this.setState((prevState) => ({ ...prevState, searchTerm: searchTerm }));
      this.fetchTweets(searchTerm);
    }
  }

  componentDidUpdate() {
    const searchTerm = this.getSearchTermFromParams();
    if (searchTerm && searchTerm !== this.state.searchTerm) {
      this.setState({ ...this.state, searchTerm: searchTerm });
      this.fetchTweets(searchTerm);
    }
  }

  // Finds most often occurring hashtag
  getMostPopularHashTag() {
    const hashtags = [];
    if (this.state.tweetsData?.data) {
      for (const tweet of this.state.tweetsData.data) {
        if (tweet.entities?.hashtags) {
          for (const hashtagObj of tweet.entities.hashtags) {
            hashtags.push(hashtagObj.tag);
          }
        }
      }
    }
    return findMostOccurring(hashtags);
  }

  // returns the time between the first and last fetched tweet in Days, HH:MM:SS
  getTimeBetweenFirstAndLastTweet() {
    const createdAtDates = [];
    if (this.state.tweetsData?.data) {
      for (const tweet of this.state.tweetsData.data) {
        createdAtDates.push(tweet.created_at);
      }
    }
    return getTimeDifference(createdAtDates);
  }

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

  render() {
    return (
      <div className='stats-boxes'>
        <>
          <div className='stats-box-row-1'>
            <div className='stats-box'>
              <div className='stats-box-heading'>Most popular hashtag</div>
              <div id='most-popular-hashtag' className='stats-box-info'>
                {this.getMostPopularHashTag()}
              </div>
            </div>
            <div className='stats-box-right stats-box'>
              <div className='stats-box-heading'>
                Time between first and last tweet
              </div>
              <div id='most-tweets' className='stats-box-info'>
                {this.getTimeBetweenFirstAndLastTweet()}
              </div>
            </div>
          </div>
          <div>
            <div className='stats-box'>
              <div className='stats-box-heading'>Longest Tweet ID</div>
              <div id='longest-tweet-id' className='stats-box-info'>
                {/* {this.getLongestTweetIdPrefix(this.state.tweetsData)} */}
              </div>
            </div>
            <div className='stats-box-right stats-box'>
              <div className='stats-box-heading'>Most days between Tweets</div>
              <div id='most-days' className='stats-box-info'>
                {/* {this.getMostDaysBetweenTweets(this.state.tweetsData)} */}
              </div>
            </div>
            <div className='tweet-items-container'>
              {this.state.tweetsData &&
                this.state.tweetsData?.data?.map((tweet: ITweet) => (
                  <div key={`tweet-${tweet.id}`}>
                    <Tweet
                      username={
                        this.state.tweetsData?.includes?.users.find(
                          (user) => user.id === tweet.author_id,
                        )?.username
                      }
                      tweet={tweet}
                    />
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
