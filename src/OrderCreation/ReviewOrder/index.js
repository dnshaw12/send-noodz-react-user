import React, { Component } from 'react';
import { Button, Segment } from 'semantic-ui-react';
import Collapsible from 'react-collapsible';

class ReviewOrder extends Component {

	constructor(){
		super()

		this.state = {
			order: null
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

				const normals = dish.extraIngredients.reduce( (acc, ingredient, idx) => {

					if (ingredient.type === 'normal') {

						if (idx === 0) {
							return ingredient.name
						}

						return acc + ', ' +ingredient.name
					} else {
						return acc
					}

				},'')

				const total = dish.extraIngredients.reduce( (acc, ingredient) => {
					return ingredient.price + acc
				},0) + dish.menuItemId.basePrice

				if (dish.menuItemId.name !== 'byon') {
					noodles ? noodles = dish.menuItemId.noodleType.name : noodles = dish.menuItemId.noodleType.name + ', ' + noodles
					proteins ? proteins = dish.menuItemId.protein.name : proteins = dish.menuItemId.protein.name + ', ' + proteins
					sauces ? sauces = dish.menuItemId.sauce.name : sauces = dish.menuItemId.sauce.name + ', ' + sauces
				}

				return(
					<Collapsible trigger={dish.menuItemId.name + '.'}>
						<ul>
							<li>noodz: {noodles}</li>
							<li>protein: {proteins}</li>
							<li>sauce: {sauces}</li>
							<li>ingredients: {normals}</li>
							<li>total: {total}</li>
						</ul>

					</Collapsible>
				)
			})
		}


		console.log(this.state,'on render');

		return(
			<Segment>
				{dishes}

				<Button 
					onClick={this.props.confirmOrder}
				>
					send me nooooodz.

				</Button>
			</Segment>
		)

	}

}


export default ReviewOrder