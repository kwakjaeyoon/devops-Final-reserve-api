import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';

import Login from './components/Login';
import Main from './components/Main';
import './App.css';

class App extends Component {
  state = {
    isLogin: false,
    status: ''

  }

  constructor(props) {
    super(props);
    this.handleStatus = this.handleStatus.bind(this);
    this.changeLoginStatus = this.changeLoginStatus.bind(this);
  }

  componentDidMount() {
    this.handleStatus();
  }

  handleStatus() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/status`,
        {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        })
      .then(res => {
        this.setState({
          isLogin: res.data.isLogin,
          status: res.data.isConnectedToDatabase
        }, () => {
          console.log('시작');
          this.props.history.push('/');
        });
      })
      .catch(err => console.log(err));
  }

  changeLoginStatus() {
    this.setState({
      isLogin: false,
      status: ''
    }, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { isLogin, status } = this.state;

    return (
      <div className="app">
        <div className="container">
          {isLogin
            ? <div className="success">Team G - 3tier CI/CD 성공</div>
            : <div className="status">rm -rf /</div>
          }
          {isLogin
            ? (status
              ? (<div className="success">팀원: 곽재윤, 김창기, 이재민</div>)
              : (<div className="fail">하지만, 데이터베이스 연결이 필요합니다</div>))
            : ''
          }
          <Switch>
            <Route
              exact
              path='/main'
              render={() => <Main changeLoginStatus={this.changeLoginStatus} />} />
            <Route
              exact
              path='/login'
              render={() => <Login handleStatus={this.handleStatus} />} />
            <Route
              path='/'
              render={() => {
                if (isLogin) {
                  return <Redirect to='/main' />;
                }
                return <Redirect to='/login' />;
              }}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
