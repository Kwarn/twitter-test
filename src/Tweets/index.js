import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './style.css'

const axios = require('axios')

const tweetsEndpointURL = 'https://app.codescreen.com/api/assessments/tweets'

//Your API token. This is needed to successfully authenticate when calling the tweets endpoint.
//This needs to be added to the Authorization header (using the Bearer authentication scheme) in the request you send to the tweets endpoint.
const apiToken = '8c5996d5-fb89-46c9-8821-7063cfbc18b1'

class Tweets extends Component {
  constuctor(props) {
    this.state = {
      tweetsByUserName: [],
      username: this.props.location.state.username,
    }
  }

  componentDidMount() {
    axios
      .get(tweetsEndpointURL, {
        params: { userName: this.props.username },
        headers: { Authorization: 'Bearer ' + apiToken },
      })
      .then((tweets) => {
        this.setState({ tweetsByUserName: tweets })
      })
  }
  //TODO Retrieve the user name passed to this component after clicking the Submit button, and use it to query the
  //Tweets API endpoint. The user name needs to be passed into the tweets endpoint as a query param called
  //userName.

  render() {
    return (
      <div className='stats-boxes'>
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
        </div>
      </div>
    )
  }

  /**
   * Retrieves the most popular hash tag tweeted by the given user.
   * Note that the string returned by this method should not include the hashtag itself.
   * For example, if the most popular hash tag is "#React", this method should return "React".
   * If there are no tweets for the given user, this method should return "N/A".
   */
  getMostPopularHashTag(tweets) {
    //TODO Implement
  }

  /**
   * Retrieves the highest number of tweets that were created on any given day by the given user.
   * A day's time period here is defined from 00:00:00 to 23:59:59
   * If there are no tweets for the given user, this method should return 0.
   */
  getMostTweetsInOneDay(tweets) {
    //TODO Implement
  }

  /**
   * Finds the first 6 characters of the ID of the longest tweet for the given user.
   * For example, if the ID of the longest tweet is "0b88c8e3-5ade-48a3-a5a0-8ce356c02d2a",
   * then this function should return "0b88c8".
   * You can assume there will only be one tweet that is the longest.
   * If there are no tweets for the given user, this method should return "N/A".
   */
  getLongestTweetIdPrefix(tweets) {
    //TODO Implement
  }

  /**
   * Retrieves the most number of days between tweets by the given user.
   * This should always be rounded down to the complete number of days, i.e. if the time is 12 days & 3 hours, this
   * method should return 12.
   * If there are no tweets for the given user, this method should return 0.
   */
  getMostDaysBetweenTweets(tweets) {
    //TODO Implement
  }
  // }
}

export default withRouter(Tweets)
