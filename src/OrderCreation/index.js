import React, { Component } from 'react';
import { Button, Segment} from 'semantic-ui-react';
import DishCreation from './DishCreation'

class OrderCreation extends Component {

	constructor(props){
		super(props)

		this.state = {
			userId: '',
			delivery: true,
			dishes: [],
			addr1: '', 
			addr2: '', 
			city: '', 
			state: '', 
			zip: '',
			stage: 0,
			stages: ['initiation', 'dishCreation'],
			total: 0

		}
	}

	componentDidMount = () => {

		if (this.props.loggedIn) {
			this.setState({
				...this.props,
				...this.props.address
			})

		} else {
			this.props.history.push('/login')
		}
	}

	handleDeliveryClick = (e) => {

		if (e.currentTarget.name === 'delivery') {
			this.setState({
				delivery: true
			})
		} else {
			this.setState({
				delivery: false
			})
		}

		this.setState({
			stage: this.state.stage + 1
		})


	}

	handleBackClick = () => {
		console.log('handleBackClick');

			this.setState({
				stage: this.state.stage - 1
			})	
	}

	addDish = (dish) => {

		const newDishArr = this.state.dishes

		newDishArr.push(dish)

		this.setState({
			dishes: newDishArr
		})

		console.log(this.state.newDishArr);

	}

	render(){
		return(
			<div>

			{this.state.stages[this.state.stage] === 'initiation' ? 

				<Segment>
					<Button name='delivery' onClick={this.handleDeliveryClick}>delivery.</Button>
					<Button name='pickup' onClick={this.handleDeliveryClick}>pick up.</Button>
				</Segment>
				:
				null
			}

			{this.state.stages[this.state.stage] === 'dishCreation' ? 

				<DishCreation addDish={this.addDish} handleBackClick={this.handleBackClick}/>
			
				:
				null
			}
			</div>
		)
	}
}

export default OrderCreation