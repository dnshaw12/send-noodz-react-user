import React, { Component } from 'react';
import { Button, Segment} from 'semantic-ui-react';
import DishCreation from './DishCreation'
import ReviewOrder from './ReviewOrder'

class OrderCreation extends Component {

	constructor(props){
		super(props)

		this.state = {
			orderId: '',
			userId: '',
			delivery: true,
			dishes: [],
			addr1: '', 
			addr2: '', 
			city: '', 
			state: '', 
			zip: '',
			deliveryInstructions: '',
			status: 'pending',
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

			const menuItemsResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/menuItems')

			const parsedResponse = await menuItemsResponse.json()


			const regularMenuItems = parsedResponse.data.filter( item => item.name !== 'byon')
			const byonMenuItem = parsedResponse.data[parsedResponse.data.findIndex( item => item.name === 'byon')]

			const ingredientResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/ingredients')

			const parsedResponse2 = await ingredientResponse.json()

			const availableIngredients = parsedResponse2.data.filter( ingredient => !ingredient.archived)

			const noodles = availableIngredients.filter( ingredient => ingredient.type === 'noodle' && ingredient.name !== 'custom')

			const proteins = availableIngredients.filter( ingredient => ingredient.type === 'protein' && ingredient.name !== 'custom')

			const sauces = availableIngredients.filter( ingredient => ingredient.type === 'sauce' && ingredient.name !== 'custom')

			const normals = availableIngredients.filter( ingredient => ingredient.type === 'normal' && ingredient.name !== 'custom')

			this.setState({
				...this.props.address,
				userId: this.props._id,
	      	name: this.props.name,
	      	email: this.props.email,
	      	phoneNumber: this.props.phoneNumber,
	      	profilePic: this.props.profilePic,
				menuItems: regularMenuItems,
				byonMenuItem: byonMenuItem,
				noodles: noodles,
				proteins: proteins,
				sauces: sauces,
				normals: normals
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

	}

	reviewOrder = async () => {

		try {

			let parsedResponse;

			const data = new FormData();
	      data.append('userId', this.state.userId);
	      data.append('delivery', this.state.delivery);
	      data.append('dishes', this.state.dishes);


	      data.append('status', this.state.status);
	      data.append('addr1', this.state.addr1);
	      data.append('addr2', this.state.addr2);
	      data.append('city', this.state.city);
	      data.append('state', this.state.state);
	      data.append('zip', this.state.zip);
	      data.append('deliveryInstructions', this.state.deliveryInstructions);

			if (this.state.orderId) {



				const updatedOrderResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/orders/' + this.state.orderId,{
					method: 'PUT',
		        	credentials: 'include',
		        	body: JSON.stringify(this.state),
		        	headers: {
		         	'Content-Type': 'application/json'
	       		}
				})

				parsedResponse = await updatedOrderResponse.json()

			} else {

				const newOrderResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/orders/',{
					method: 'POST',
		        	credentials: 'include',
		        	body: JSON.stringify(this.state),
		        	headers: {
		         	// 'enctype': 'multipart/form-data'
		         	'Content-Type': 'application/json'
	       		}
				})

				parsedResponse = await newOrderResponse.json()
			}
			
			this.setState({
				orderId: parsedResponse.data._id,
				stage: 2
			})
		} catch(err){
		  console.log(err);
		}

	}

	confirmOrder = async ()  => {
		try {

			const data = new FormData();
	      data.append('status', 'received');
	      data.append('addr1', this.state.addr1);
	      data.append('addr2', this.state.addr2);
	      data.append('city', this.state.city);
	      data.append('state', this.state.state);
	      data.append('zip', this.state.zip);
	      data.append('deliveryInstructions', this.state.deliveryInstructions);

			await fetch(process.env.REACT_APP_BACKEND_URL + '/orders/' + this.state.orderId,{
					method: 'PUT',
		        	credentials: 'include',
		        	body: JSON.stringify({
		        		addr1: this.state.addr1,
				      addr2: this.state.addr2,
				      city: this.state.city,
				      state: this.state.state,
				      zip: this.state.zip,
				      status: 'received',
				      deliveryInstructions: this.state.deliveryInstructions
		        	}),
		        	headers: {
		         	'Content-Type': 'application/json'
	       		}
				})

				this.props.history.push('/order-status')
			
		} catch(err){
		  console.log(err);
		}
	}

	updateState = (e) => {

		this.setState({[e.target.name]: e.target.value});

	}

	render(){
		return(
			<div>

			{this.state.stages[this.state.stage] === 'initiation' ? 

				<Segment className='outerSegment'>
					<div className='fullSegment'>
						<img alt='' class='mainImage' src='https://thumbs.dreamstime.com/b/hungry-boy-eating-chinese-noodles-sticks-8408259.jpg' />
						<Button name='delivery' onClick={this.handleDeliveryClick}>delivery.</Button>
						<Button name='pickup' onClick={this.handleDeliveryClick}>pick up.</Button>
					</div>
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
					totalDishes={this.state.dishes.length}
				/>
			
				:
				null
			}

			{this.state.stages[this.state.stage] === 'placeOrder' ? 

				<ReviewOrder 
					orderId={this.state.orderId}
					confirmOrder={this.confirmOrder}
					updateState={this.updateState}
					addr1={this.state.addr1}
	        		addr2={this.state.addr2}
	        		city={this.state.city}
	        		state={this.state.state}
	        		zip={this.state.zip}

				/>
			
				:
				null
			}
			</div>
		)
	}
}

export default OrderCreation