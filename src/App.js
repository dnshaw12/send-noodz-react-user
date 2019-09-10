import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import UserMenu from './UserMenu'
import SignUp from './SignUp'
import Login from './Login'
import OrderCreation from './OrderCreation'
import OrderStatus from './OrderStatus'
import PastOrders from './PastOrders'

class App extends Component {

  constructor(){
    super()

    this.state = {
      userId: null,
      loggedIn: false,
      name: '',
      email: '',
      phoneNumber: '',
      message: ''
    }
  }

  makePrettyDate = (str) => {

      const date = new Date(str);

      const options = { 
         // weekday: 'short', 
         year: 'numeric', 
         month: 'numeric', 
         day: 'numeric', 
         timeZone: 'America/Chicago', 
         hour: 'numeric',
         hour12: true, 
         minute: 'numeric' };

      return date.toLocaleDateString('en-US',options)

   }

  signUp = async (data) => {


    try {

      const signUpResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/users/sign-up', {
        method: 'POST',
        credentials: 'include',
        body: data,
        headers: {
          'enctype': 'multipart/form-data'
        }
      })

      const parsedResponse = await signUpResponse.json()

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


    try {
      const loginResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/users/login', {
        method: 'POST',
        credentials: 'include',
        body: data,
        headers: {
          'enctype': 'multipart/form-data'
        }
      })

      const parsedResponse = await loginResponse.json()

      if (loginResponse.status === 200) {
        this.setState({
          ...parsedResponse.data,
          loggedIn: true
        })  
      } else {
        this.setState({message: parsedResponse.message})
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
          <Route exact path='/sign-up' render={(props) => <SignUp {...props} signUp={this.signUp} userId={this.state._id}/>  } />
          <Route exact path='/login' render={(props) => <Login {...props} login={this.login} message={this.state.message}/>  } />
          <Route exact path='/order-status' render={(props) => <OrderStatus {...props} userId={this.state._id} makePrettyDate={this.makePrettyDate} loggedIn={this.state.loggedIn}/>  } />
          <Route exact path='/past-orders' render={(props) => <PastOrders {...props} userId={this.state._id} makePrettyDate={this.makePrettyDate} loggedIn={this.state.loggedIn}/>  } />
          <Route exact path='/' render={(props) => <OrderCreation {...props} {...this.state}/>  } />
        </Switch>
      </main>
    );

  }
}

export default withRouter(App);
