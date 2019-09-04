import React, { Component } from 'react';
import { Button, Segment } from 'semantic-ui-react';
import Collapsible from 'react-collapsible';

class ReviewOrder extends Component {

	constructor(){
		super()

		this.state = {
			order: {}
		}
	}

	componentDidMount = async () => {

		try {
			const orderResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/orders/' + this.props.orderId)

			const parsedResponse = await orderResponse.json()

			console.log(parsedResponse);

			this.setState({
				order: parsedResponse.data
			})
			
		} catch(err){
		  console.log(err);
		}
	}





	render(){

		console.log(this.state,'on render');

		return(
			<Segment>
				hi
			</Segment>
		)

	}

}


export default ReviewOrder