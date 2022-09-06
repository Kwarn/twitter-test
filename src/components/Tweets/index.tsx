// eslint-disable-next-line no-use-before-define
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { findMostOccurring } from '../../utils/occurrences';
import getTweets from '../../services/getTweets';
import getTimeDifference from '../../utils/date';
import { ITweet, ITwitterData } from '../../types';
import Tweet from '../Tweet';
import './style.css';

interface ITweetsState {
  tweetsData: ITwitterData | null;
  isError: boolean;
  searchTerm: string | null;
}

class Tweets extends Component<RouteComponentProps, ITweetsState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      tweetsData: null,
      isError: false,
      searchTerm: '',
    };
  }

  componentDidMount() {
    const searchTerm = this.getSearchTermFromParams();
    if (searchTerm) {
      this.setState((prevState) => ({ ...prevState, searchTerm }));
      this.fetchTweets(searchTerm);
    }
  }

  componentDidUpdate() {
    const { searchTerm } = this.state;
    const newSearchTerm = this.getSearchTermFromParams();
    if (newSearchTerm && newSearchTerm !== searchTerm) {
      this.setState((prevState) => ({
        ...prevState,
        searchTerm: newSearchTerm,
      }));
      this.fetchTweets(newSearchTerm);
    }
  }

  getSearchTermFromParams() {
    const { location } = this.props;
    const query = new URLSearchParams(location.search);
    return query.get('search');
  }

  // Finds most often occurring hashtag
  getMostPopularHashTag() {
    const { tweetsData } = this.state;
    const hashtags = [];
    if (tweetsData?.data) {
      // eslint-disable-next-line no-restricted-syntax
      for (const tweet of tweetsData.data) {
        if (tweet.entities?.hashtags) {
          // eslint-disable-next-line no-restricted-syntax
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
    const { tweetsData } = this.state;
    if (tweetsData?.data) {
      const createdAtDates = tweetsData.data.map((tw) => tw.created_at);
      return getTimeDifference(createdAtDates);
    }
    return 'N/A';
  }

  // eslint-disable-next-line consistent-return
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

  findUsernameByAuthorId(tweet: ITweet) {
    const { tweetsData } = this.state;
    return tweetsData?.includes?.users.find(
      (user) => user.id === tweet.author_id,
    )?.username;
  }

  render() {
    const { tweetsData, isError } = this.state;
    return (
      <div className="stats-boxes">
        <div className="stats-box-row-1">
          <div className="stats-box">
            <div className="stats-box-heading">Most popular hashtag</div>
            <div id="most-popular-hashtag" className="stats-box-info">
              {this.getMostPopularHashTag()}
            </div>
          </div>
          <div className="stats-box-right stats-box">
            <div className="stats-box-heading">
              Time between first and last tweet
            </div>
            <div id="most-tweets" className="stats-box-info">
              {this.getTimeBetweenFirstAndLastTweet()}
            </div>
          </div>
        </div>
        <div>
          <div className="tweet-items-container">
            {tweetsData
              && tweetsData?.data?.map((tweet: ITweet) => (
                <div key={`tweet-${tweet.id}`}>
                  <Tweet
                    username={this.findUsernameByAuthorId(tweet)}
                    tweet={tweet}
                  />
                </div>
              ))}
          </div>
          {isError && <p>Something went wrong: unable to fetch tweets..</p>}
        </div>
      </div>
    );
  }
}

export default Tweets;
