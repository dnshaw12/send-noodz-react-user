import React, { Component } from 'react';
import DishInfo from './DishInfo'
import { Segment, Icon } from 'semantic-ui-react';
import Collapsible from 'react-collapsible';
import socketIOClient from 'socket.io-client'

const socket = socketIOClient(process.env.REACT_APP_BACKEND_URL)

class OrderInfo extends Component {

	constructor(){
		super()

		this.state = {
			updatedStatus: false,
			status: null
		}
	}

	componentDidMount(){
		if (this.props.order) {

			socket.on('status update: ' + this.props.order._id, data => {
			   console.log('new status', data);
			   this.setState({
			   	updatedStatus: true,
			   	status: data
			   })
			})
			
			this.setState({status:this.props.order.status})
		}
	}

	toggleUpdated = () => {
		console.log('TOGGLE');
		this.setState({updatedStatus:false})
	}


	render(){

		let dishes

		if (this.props.order) {
			dishes = this.props.order.dishes.map( dish => {
				return <DishInfo dish={dish} />
			})
		}

		const updated = this.state.updatedStatus ? 'updatedStatus' : ''


		return(

			<Segment>
				order num: {this.props.order._id} <br/>
				ordered at: {this.props.makePrettyDate(this.props.order.createdDate)}
				<h4>dishes:</h4>
				{dishes}

				{ this.props.order.status !== 'archived' ?

					<Segment>
						{this.state.updatedStatus ? <Icon name="heart" color='red' className='heartIcon'/> : null}
						<Collapsible
							className={updated} 
							trigger={this.state.updatedStatus ? 'an update regarding your noodz.' : 'view status.'}
							onOpen={this.toggleUpdated}
						>
							status: {this.state.status}

						</Collapsible>
					</Segment>
				:

					null

				}
			</Segment>

		)

	}


}

export default OrderInfo