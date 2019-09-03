import React, { Component } from 'react';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class SignUp extends Component {
   constructor(){
      super();

      this.state = {
         name: '',
         email: '',
         password: '',
         phoneNumber: '',
         addr1: '',
         addr2: '',
         city: '',
         state: '',
         zip: '',
         profilePic: {}
      }
   }

   handleChange = (e) => {

   	console.log(this.state);

      if(e.target.name !== 'profilePic'){
         this.setState({[e.target.name]: e.target.value});
      } else {
         // file upload
         console.log(e.target);
         this.setState({image: e.target.files[0]});
      }
   }

   handleSubmit = async (e) => {
      e.preventDefault();

      const data = new FormData();
      data.append('profilePic', this.state.profilePic);
      data.append('name', this.state.name);
      data.append('password', this.state.password);
      data.append('phoneNumber', this.state.phoneNumber);
      data.append('addr1', this.state.addr1);
      data.append('addr2', this.state.addr2);
      data.append('city', this.state.city);
      data.append('state', this.state.state);
      data.append('zip', this.state.zip);
      data.append('email', this.state.email);

      this.props.signUp(data);

   }

   render() {

      return (
      
         <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh'}}>
            <Grid.Column style={{maxWidth: 450}}>
               <Header as='h2' textAlign='center'>
                  sign up.
               </Header>
               <Form onSubmit={this.handleSubmit} enctype="multipart/form-data">
                  <Segment stacked textAlign='left'>
                     name:
                     <Form.Input fluid icon='user' iconPosition='left' placeholder='name.' type='text' name='name' onChange={this.handleChange}/>
                     email:
                     <Form.Input fluid icon='mail' iconPosition='left' placeholder='email.' type='text' name='email' onChange={this.handleChange}/>
                     password:
                     <Form.Input fluid icon='lock' placeholder='password.' iconPosition='left' type='password' name='password' onChange={this.handleChange}/>
                     phone Number:
                     <PhoneInput
                     	icon='phone'
							   placeholder="plz enter phone number."
							   name='phoneNumber' 
							   onChange={ phoneNumber => this.setState({ phoneNumber }) }/>
							address 1:
                     <Form.Input fluid icon='home' iconPosition='left' placeholder='address 1.' type='text' name='addr1' onChange={this.handleChange}/>
                     address 2:
                     <Form.Input fluid iconPosition='left' placeholder='address 2.' type='text' name='addr2' onChange={this.handleChange}/>
                     city:
                     <Form.Input fluid iconPosition='left' placeholder='city.' type='text' name='city' onChange={this.handleChange}/>
                     state:
                     <Form.Input fluid iconPosition='left' placeholder='state.' type='text' name='state' onChange={this.handleChange}/>
                     state:
                     <Form.Input fluid iconPosition='left' placeholder='zip.' type='text' name='zip' onChange={this.handleChange}/>
                     profile pic:
                     <Form.Input fluid  iconPosition='left' type="file" name='profilePic' onChange={this.handleChange}/>
                     <Button fluid size='large' type='sumbit'>register.</Button>

                     <Message>
                        already a receiver of noodz? <Link to='/login'>log in.</Link>
                     </Message>
             
                  </Segment>
               </Form>
            </Grid.Column>
         </Grid>
      )
  }
}

export default SignUp