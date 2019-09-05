import React, { Component } from 'react';
import { Button, Segment, Form } from 'semantic-ui-react';
import Collapsible from 'react-collapsible';

class ReviewOrder extends Component {

	constructor(){
		super()

		this.state = {
			order: null,
			editActive: false,
			addr1: '', 
			addr2: '', 
			city: '', 
			state: '', 
			zip: ''
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


	toggleEdit = (e) => {
		e.preventDefault();

		this.setState({editActive: !this.state.editActive})
	}


	render(){

		let dishes;

		if (this.state.order) {

			dishes = this.state.order.dishes.map( dish => {

				let noodles = dish.extraIngredients.reduce( (acc, ingredient, idx) => {

					if (ingredient.type === 'noodle') {

						if (idx === 0) {
							return ingredient.name
						}

						return acc + ', ' +ingredient.name
					} else {
						return acc
					}

				},'')

				let proteins = dish.extraIngredients.reduce( (acc, ingredient, idx) => {

					if (ingredient.type === 'protein') {

						if (idx === 0) {
							return ingredient.name
						}

						return acc + ', ' +ingredient.name
					} else {
						return acc
					}

				},'')

				let sauces = dish.extraIngredients.reduce( (acc, ingredient, idx) => {

					if (ingredient.type === 'sauce') {

						if (idx === 0) {
							return ingredient.name
						}

						return acc + ', ' +ingredient.name
					} else {
						return acc
					}

				},'')

				let normals = dish.extraIngredients.reduce( (acc, ingredient, idx) => {

					if (ingredient.type === 'normal') {

						if (idx === 0) {
							return ingredient.name
						}

						return acc + ', ' +ingredient.name
					} else {
						return acc
					}

				},'')

				if (dish.menuItemId.name !== 'byon') {
					noodles ? noodles = dish.menuItemId.noodleType.name : noodles = dish.menuItemId.noodleType.name + ', ' + noodles
					proteins ? proteins = dish.menuItemId.protein.name : proteins = dish.menuItemId.protein.name + ', ' + proteins
					sauces ? sauces = dish.menuItemId.sauce.name : sauces = dish.menuItemId.sauce.name + ', ' + sauces

					normals = dish.menuItemId.baseIngredients.reduce( (acc, ingredient, idx) => {

					if (ingredient.type === 'normal') {

						if (idx === 0) {
							return ingredient.name
						}

						return acc + ', ' +ingredient.name
					} else {
						return acc
					}

				},'')
				}

				return(
					<Segment>
						<Collapsible trigger={dish.menuItemId.name + '.'}>
							<ul>
								<li>noodz: {noodles}</li>
								<li>protein: {proteins}</li>
								<li>sauce: {sauces}</li>
								<li>ingredients: {normals}</li>
							</ul>

						</Collapsible>
					</Segment>
				)
			})
		}


		console.log(this.state,'on render');

		return(
			<Segment>
				{dishes}

				{this.state.editActive ? 

				<Form onSubmit={this.toggleEdit}>
					address 1:
	            <Form.Input fluid icon='home' iconPosition='left' placeholder='address 1.' type='text' name='addr1' value={this.props.addr1} onChange={this.props.updateAddress}/>
	            address 2:
	            <Form.Input fluid iconPosition='left' placeholder='address 2.' type='text' name='addr2' value={this.props.addr2} onChange={this.props.updateAddress}/>
	            city:
	            <Form.Input fluid iconPosition='left' placeholder='city.' type='text' name='city' value={this.props.city} onChange={this.props.updateAddress}/>
	            state:
	            <Form.Input fluid iconPosition='left' placeholder='state.' type='text' name='state' value={this.props.state} onChange={this.props.updateAddress}/>
	            zip:
	            <Form.Input fluid iconPosition='left' placeholder='zip.' type='text' name='zip' value={this.props.zip} onChange={this.props.updateAddress}/>
	            <Button fluid type='sumbit'>submit.</Button>
            </Form>

            :
            <Segment>
	            <p>Address:<br/>
	            	{this.props.addr1 + ' ' + this.props.addr2}<br/>
	            	{this.props.city + ', ' + this.props.state + ' ' + this.props.zip}<br/>
	            	<Button onClick={this.toggleEdit}>update address.</Button>
	            </p>
					<Button 
						onClick={this.props.confirmOrder}
					>
						send me nooooodz.

					</Button>
				</Segment>

				}


			</Segment>
		)

	}

}


export default ReviewOrder