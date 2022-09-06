import React, { Component } from 'react';
import { ITweet, ITwitterData } from '../../types';
import Tweet from '../Tweet';
import { RouteComponentProps } from 'react-router-dom';
import { getTweets } from '../../services/getTweets';
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

  getMostPopularHashTag() {
    // const hashtags = this.state.tweetsData?.data
    //   ?.map((tweet) => tweet.entities?.hashtags?.map((ht) => ht.tag))
    //   .flat()
    //   .filter((exists) => exists);

    // const occurences = hashtags?.reduce(
    //   (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
    //   new Map(),
    // );

    // harder to read ? ^

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
    const occurences: { [key: string]: number } = {};
    for (const tag of hashtags) {
      if (occurences[tag]) {
        occurences[tag] += 1;
      } else {
        occurences[tag] = 1;
      }
    }
    const mostOccurences = Object.values(occurences).sort((a, b) => b - a)[0];
    const mostCommonHashTag = Object.keys(occurences).filter(
      (hashtag) => occurences[hashtag] === mostOccurences,
    );
    return mostCommonHashTag || 'N/A';
  }

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
                {this.getMostPopularHashTag()}
              </div>
            </div>
            <div className='stats-box-right stats-box'>
              <div className='stats-box-heading'>Most Tweets in one days</div>
              <div id='most-tweets' className='stats-box-info'>
                {/* {this.getMostTweetsInOneDay(this.state.tweetsData)} */}
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
