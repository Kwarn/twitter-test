import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import UserNameForm from '../Components/UserNameForm';
import Tweets from '../Components/Tweets';

export default () => (
  <BrowserRouter>
    <div>
      {/* using div here as Switch so both routes render*/}
      <Route path='/' render={(props) => <UserNameForm {...props} />} />
      <Route path='/tweets' render={(props) => <Tweets {...props} />} />
    </div>
  </BrowserRouter>
);
