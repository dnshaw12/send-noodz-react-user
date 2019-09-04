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
			menuItems: [],
			byonMenuItem: {},
			noodles: [],
			proteins: [],
			sauces: [],
			normals: [],
			stage: 0,
			stages: ['initiation', 'dishCreation','placeOrder']
		}
	}

	componentDidMount = async () => {

		if (this.props.loggedIn) {
			this.setState({
				...this.props,
				...this.props.address
			})

		} else {
			this.props.history.push('/login')
		}

		const menuItemsResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/menuItems')

		const parsedResponse = await menuItemsResponse.json()

		console.log(parsedResponse);

		const regularMenuItems = parsedResponse.data.filter( item => item.name !== 'byon')
		const byonMenuItem = parsedResponse.data[parsedResponse.data.findIndex( item => item.name === 'byon')]

		const ingredientResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/ingredients')

		const parsedResponse2 = await ingredientResponse.json()

		const noodles = parsedResponse2.data.filter( ingredient => ingredient.type === 'noodle' && ingredient.name !== 'custom')

		const proteins = parsedResponse2.data.filter( ingredient => ingredient.type === 'protein' && ingredient.name !== 'custom')

		const sauces = parsedResponse2.data.filter( ingredient => ingredient.type === 'sauce' && ingredient.name !== 'custom')

		const normals = parsedResponse2.data.filter( ingredient => ingredient.type === 'normal' && ingredient.name !== 'custom')

		this.setState({
			menuItems: regularMenuItems,
			byonMenuItem: byonMenuItem,
			noodles: noodles,
			proteins: proteins,
			sauces: sauces,
			normals: normals
		})
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

	reviewOrder = () => {

		this.setState({
			stage: 2
		})
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

				<DishCreation 
					reviewOrder={this.reviewOrder} 
					addDish={this.addDish} 
					handleBackClick={this.handleBackClick}
					menuItems={this.state.menuItems}
					byonMenuItem={this.state.byonMenuItem}
					noodles={this.state.noodles}
					proteins={this.state.proteins}
					sauces={this.state.sauces}
					normals={this.state.normals}
				/>
			
				:
				null
			}

			{this.state.stages[this.state.stage] === 'placeOrder' ? 

				<div>review order page here</div>
			
				:
				null
			}
			</div>
		)
	}
}

export default OrderCreation