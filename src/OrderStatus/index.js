import React, { Component } from 'react';
import { Button, Segment, Form } from 'semantic-ui-react';
import Collapsible from 'react-collapsible';

class OrderStatus extends Component {

	constructor(){
		super()

		this.state = {

			activeOrders: {}

		}
	}

	componentDidMount = async () => {

		const orderResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/orders/' + this.props.userId + '/active')

		const parsedResponse = await orderResponse.json()

		this.setState({
			activeOrders: parsedResponse.data
		})

	}

	render(){



		return(

			<h1>ORDER STATUS</h1>


		)

	}
}




export default OrderStatus