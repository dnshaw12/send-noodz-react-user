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
			status: null,
			statusOpen: false,
			receivedMessages: ['we got that noodz order', 'new noodz order? luck us.'],
			preppingMesages: ['prepping thme hot noodz just for you', 'noodz are heatin up over here', '*wink* (prepping your noodz) '],
			deliveryMessages: ['hey babe. noodz are on their way', 'in person noodz on their way','we will keep your noodz hot while they make their way to you ;)'],
			pickupMessages: ['come get these hot noodz. they ready.', 'noodz ready. come get em','we are waiting with antici....pation for you to pick up these noodz.'],
			statusMessage: ''
		}
	}

	componentDidMount(){
		if (this.props.order) {

			let messageList

			if (this.props.order.status === 'received') {
				messageList = this.state.receivedMessages
			} else if (this.props.order.status === 'prepping') {
				messageList = this.state.preppingMesages
			} else if (this.props.order.status === 'complete' && this.props.order.delivery) {
				messageList = this.state.deliveryMessages
			} else {
				messageList = this.state.pickupMessages
			}

			let message = messageList[Math.floor(Math.random() * messageList.length)]

			socket.on('status update: ' + this.props.order._id, data => {

				let messageList2

				if (data === 'received') {
						messageList2 = this.state.receivedMessages
					} else if (data === 'prepping') {
						messageList2 = this.state.preppingMesages
					} else if (data === 'complete' && this.props.order.delivery) {
						messageList2 = this.state.deliveryMessages
					} else {
						messageList2 = this.state.pickupMessages
					}

				const message2 = messageList2[Math.floor(Math.random() * messageList2.length)]

			   this.setState({
			   	updatedStatus: true,
			   	status: data,
			   	statusMessage: message2
			   })
			})
			
			this.setState({
				status:this.props.order.status,
				statusMessage: message
			})
		}
	}

	toggleUpdated = () => {

		this.toggleCollapisble()

		this.setState({updatedStatus:false})
	}

	toggleCollapisble = () => {
		this.setState({
			statusOpen: !this.state.statusOpen
		})
	}


	render(){

		let dishes

		if (this.props.order) {
			dishes = this.props.order.dishes.map( dish => {
				return <DishInfo dish={dish} />
			})
		}

		const updated = this.state.updatedStatus ? 'updatedStatus' : ''

		const icon = this.state.statusOpen ? <Icon className='collapsibleArrow' name='angle up' /> : <Icon className='collapsibleArrow' name='angle down' />


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
							trigger={this.state.updatedStatus ? 'update for your noodz.' : 'view status.'}
							onOpen={this.toggleUpdated}
							onClose={this.toggleUpdated}
						>
							{icon}
							<div className='statusMessage'>{this.state.statusMessage}</div>

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