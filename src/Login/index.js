import React, { Component } from 'react';
import 'react-phone-number-input/style.css'
import { Button, Form, Header, Message, Segment} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Login extends Component {
   constructor(){
      super();

      this.state = {
         email: '',
         password: '',
      }
   }

   handleChange = (e) => {

   	console.log(this.state);

      this.setState({[e.target.name]: e.target.value});
   }

   handleSubmit = async (e) => {
      e.preventDefault();

      const data = new FormData();
      data.append('email', this.state.email);
      data.append('password', this.state.password);

      const loginStatus = await this.props.login(data);

      if (loginStatus === 200) {
      	this.props.history.push('/')
      }

   }

   render() {

      return (
      
            <Segment className='fullSegment'>
               <Form className='form' onSubmit={this.handleSubmit}>
	               <Header as='h2' textAlign='center'>
	                  login.
	               </Header>
                  <p>{this.props.message}</p>
                     email:
                     <Form.Input fluid icon='mail' iconPosition='left' placeholder='email.' type='text' name='email' onChange={this.handleChange}/>
                     password:
                     <Form.Input fluid icon='lock' placeholder='password.' iconPosition='left' type='password' name='password' onChange={this.handleChange}/>
                     <Button fluid size='large' type='sumbit'>login.</Button>

                     <Message>
                        not a receiver of noodz yet? <Link to='/sign-up'>sign up.</Link>
                     </Message>
             
               </Form>
            </Segment>
      )
  }
}

export default Login

