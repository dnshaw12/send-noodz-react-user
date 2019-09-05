import React, { Component } from 'react';
import { Route, Switch, withRouter, BrowserRouter as Router } from 'react-router-dom';

import UserMenu from './UserMenu'
import SignUp from './SignUp'
import Login from './Login'
import OrderCreation from './OrderCreation'
import OrderStatus from './OrderStatus'

class App extends Component {

  constructor(){
    super()

    this.state = {
      loggedIn: false,
      name: '',
      email: '',
      phoneNumber: '',
      profilePic: {}
    }
  }

  signUp = async (data) => {

    // console.log(data, 'data in app sign up');

    try {
      // console.log(process.env);

      const signUpResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/users/sign-up', {
        method: 'POST',
        credentials: 'include',
        body: data,
        headers: {
          'enctype': 'multipart/form-data'
        }
      })

      console.log(signUpResponse);


      const parsedResponse = await signUpResponse.json()
      console.log(parsedResponse);

      if (signUpResponse.status === 201) {
        this.setState({
          ...parsedResponse.data,
          loggedIn: true
        })

      }

      return signUpResponse.status


    } catch(err){
      console.log(err);
    }

  }

  login = async (data) => {

    for (let pair of data.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }

    try {
      const loginResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/users/login', {
        method: 'POST',
        credentials: 'include',
        body: data,
        headers: {
          'enctype': 'multipart/form-data'
        }
      })

      console.log(loginResponse);

      const parsedResponse = await loginResponse.json()

      console.log(parsedResponse);

      if (loginResponse.status === 200) {
        this.setState({
          ...parsedResponse.data,
          loggedIn: true
        })  
      }

      return loginResponse.status 

    } catch(err){
      console.log(err);
    }
  }

  logout = () => {

    this.setState({
      loggedIn: false,
      _id: '',
      name: '',
      email: '',
      phoneNumber: '',
      addr1: '',
      addr2: '',
      city: '',
      state: '',
      zip: '',
      profilePic: {}
    })

    this.props.history.push('/login')

  }

  render(){
    return (
      <main>
        <UserMenu loggedIn={this.state.loggedIn} logout={this.logout}/>
        <Switch>
          <Route exact path='/sign-up' render={(props) => <SignUp {...props} signUp={this.signUp}/>  } />
          <Route exact path='/login' render={(props) => <Login {...props} login={this.login}/>  } />
          <Route exact path='/order-status' render={(props) => <OrderStatus {...props} userId={this.state.userId}/>  } />
          <Route exact path='/' render={(props) => <OrderCreation {...props} {...this.state}/>  } />
        </Switch>
      </main>
    );

  }
}

export default withRouter(App);
