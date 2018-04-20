import React, {Component, PropTypes} from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';

import { WEB_URL } from '../../constants/index';
import Home from './landing/Home/index';

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <main>
            <Switch>

              <Route exact={true} path={WEB_URL.HOME_URL} component={Home}/>
              <Redirect to={WEB_URL.HOME_URL} />

            </Switch>
          </main>
        );
    }
}

export default withRouter(App);
