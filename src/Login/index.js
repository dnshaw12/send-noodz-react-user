import React, { Component } from 'react';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react';
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
      
         <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh'}}>
            <Grid.Column style={{maxWidth: 450}}>
               <Header as='h2' textAlign='center'>
                  login.
               </Header>
               <Form onSubmit={this.handleSubmit} enctype="multipart/form-data">
                  <Segment stacked textAlign='left'>
                     email:
                     <Form.Input fluid icon='mail' iconPosition='left' placeholder='email.' type='text' name='email' onChange={this.handleChange}/>
                     password:
                     <Form.Input fluid icon='lock' placeholder='password.' iconPosition='left' type='password' name='password' onChange={this.handleChange}/>
                     <Button fluid size='large' type='sumbit'>login.</Button>

                     <Message>
                        not a receiver of noodz yet? <Link to='/sign-up'>sign up.</Link>
                     </Message>
             
                  </Segment>
               </Form>
            </Grid.Column>
         </Grid>
      )
  }
}

export default Login

