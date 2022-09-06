import React, { Component } from 'react';
import { ITweet } from '../../types';
import './style.css';

interface ITweetProps {
  tweet: ITweet;
  username: string | undefined;
}

export default class Tweet extends Component<ITweetProps> {
  hashTagString = this.props.tweet.entities?.hashtags
    ?.map((hashtagObj) => `#${hashtagObj.tag}`)
    .join(' ');

  render() {
    return (
      <div className='tweet-container'>
        <p className='tweet-title'>@{this.props.username}</p>
        <div className='tweet-text-container'>
          <p className='tweet-text'>{this.props.tweet.text}</p>
        </div>
        {this.hashTagString && (
          <div className='hashtag-container'>
            <p className='hashtag-string'>{this.hashTagString}</p>
          </div>
        )}
      </div>
    );
  }
}
