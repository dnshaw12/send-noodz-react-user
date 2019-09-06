import React, { Component } from 'react';
import DishInfo from './DishInfo'
import { Segment } from 'semantic-ui-react';
import Collapsible from 'react-collapsible';

class OrderInfo extends Component {

	constructor(){
		super()

		this.state = {
		}
	}


	render(){
		let dishes

		if (this.props.order) {
			dishes = this.props.order.dishes.map( dish => {
				return <DishInfo dish={dish} />
			})
		}


		return(

			<Segment>
				order num: {this.props.order._id} <br/>
				ordered at: {this.props.makePrettyDate(this.props.order.createdDate)}
				<h4>dishes:</h4>
				{dishes}

				{ this.props.order.status !== 'archived' ?

					<Segment>
						<Collapsible trigger='view status.'>
							status: {this.props.order.status}

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