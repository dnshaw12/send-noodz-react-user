import React, { Component } from 'react';
import { Segment} from 'semantic-ui-react';
import OrderInfo from '../OrderInfo'

class PastOrders extends Component {

	constructor(){
		super()

		this.state = {

			activeOrders: null

		}
	}

	componentDidMount = async () => {

		if (!this.props.loggedIn) {
			this.props.history.push('/login')
		}

		const orderResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/orders/' + this.props.userId + '/past')

		const parsedResponse = await orderResponse.json()

		this.setState({
			activeOrders: parsedResponse.data
		})

	}

	render(){

		let orders;

		if (this.state.activeOrders) {

			orders = this.state.activeOrders.map( order => {
				return <OrderInfo makePrettyDate={this.props.makePrettyDate} order={order} />
			})

		}


		return(

			<Segment className='fullSegment'>
				{orders}
			</Segment>


		)

	}
}




export default PastOrders