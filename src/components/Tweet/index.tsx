// eslint-disable-next-line no-use-before-define
import React, { PureComponent } from 'react';
import { ITweet } from '../../types';
import './style.css';

interface ITweetProps {
  tweet: ITweet;
  username: string | undefined;
}

export default class Tweet extends PureComponent<ITweetProps> {
  render() {
    const { tweet, username } = this.props;
    const hashTagString = tweet.entities?.hashtags
      ?.map((hashtagObj) => `#${hashtagObj.tag}`)
      .join(' ');
    return (
      <div className="tweet-container">
        <p className="tweet-title">
          @
          {username}
        </p>
        <div className="tweet-text-container">
          <p className="tweet-text">{tweet.text}</p>
        </div>
        {hashTagString && (
          <div className="hashtag-container">
            <p className="hashtag-string">{hashTagString}</p>
          </div>
        )}
      </div>
    );
  }
}
