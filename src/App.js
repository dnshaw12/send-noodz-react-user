import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import UserMenu from './UserMenu'
import SignUp from './SignUp'
import Login from './Login'

class App extends Component {

  constructor(){
    super()

    this.state = {
      loggedIn: false,
      name: '',
      email: '',
      phoneNumber: '',
      addr1: '',
      addr2: '',
      city: '',
      state: '',
      zip: '',
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

      this.setState({
        ...parsedResponse.data,
        loggedIn: true
      })


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



    } catch(err){
      console.log(err);
    }
  }

  render(){
    return (
      <main>
        <UserMenu loggedIn={this.state.loggedIn}/>
        <Switch>
          <Route exact path='/sign-up' render={(props) => <SignUp {...props} signUp={this.signUp}/>  } />
          <Route exact path='/login' render={(props) => <Login {...props} login={this.login}/>  } />
        </Switch>
      </main>
    );

  }
}

export default App;
