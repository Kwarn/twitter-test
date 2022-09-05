import React, { PureComponent } from 'react';
import { ITweet } from '../../types';
import './style.css';

interface ITweetProps {
  tweet: ITweet;
}

export default class Tweet extends PureComponent<ITweetProps> {
  render() {
    return (
      <div className='tweet-container'>
        <p className='tweet-title'>{this.props.tweet.author_id}</p>
        <p>{this.props.tweet.text}</p>

        <div>
          <p>Comments</p>
          {this.props.tweet.entities?.hashtags?.map((hashtag) => (
            <p key={`hashtag-author-${hashtag.tag}`}>{hashtag.tag}</p>
          ))}
        </div>
      </div>
    );
  }
}
