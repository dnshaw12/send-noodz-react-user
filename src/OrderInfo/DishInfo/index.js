import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import { Segment, Icon } from 'semantic-ui-react';

class DishInfo extends Component {

	constructor(){
		super()

		this.state = {
			open: false
		}
	}

	toggleCollapisble = () => {
		this.setState({
			open: !this.state.open
		})
	}

	render(){

		let noodles = this.props.dish.extraIngredients.reduce( (acc, ingredient, idx) => {

			if (ingredient.type === 'noodle') {

				if (idx === 0) {
					return ingredient.name
				}

				return ingredient.name + ', ' + acc
			} else {
				return acc
			}

		},'')

		let proteins = this.props.dish.extraIngredients.reduce( (acc, ingredient, idx) => {

			if (ingredient.type === 'protein') {

				if (idx === 0) {
					return ingredient.name
				}

				return ingredient.name + ', ' + acc
			} else {
				return acc
			}

		},'')

		let sauces = this.props.dish.extraIngredients.reduce( (acc, ingredient, idx) => {

			if (ingredient.type === 'sauce') {

				if (idx === 0) {
					return ingredient.name
				}

				return ingredient.name + ', ' + acc
			} else {
				return acc
			}

		},'')

		let normals = this.props.dish.extraIngredients.reduce( (acc, ingredient, idx) => {

			if (ingredient.type === 'normal') {

				if (idx === 0) {
					return ingredient.name
				}

				return ingredient.name + ', ' + acc
			} else {
				return acc
			}

		},'')


		if (this.props.dish.menuItemId.name !== 'byon') {
			noodles ? noodles = this.props.dish.menuItemId.noodleType.name : noodles = this.props.dish.menuItemId.noodleType.name + ', ' + noodles

			proteins ? proteins = this.props.dish.menuItemId.protein.name : proteins = this.props.dish.menuItemId.protein.name + ', ' + proteins

			sauces ? sauces = this.props.dish.menuItemId.sauce.name : sauces = this.props.dish.menuItemId.sauce.name + ', ' + sauces

			normals = this.props.dish.menuItemId.baseIngredients.reduce( (acc, ingredient, idx) => {

				if (ingredient.type === 'normal') {

					if (idx === 0) {
						return ingredient.name
					}

					return ingredient.name + ', ' + acc
				} else {
					return acc
				}

			},'')

		}

		const icon = this.state.open ? <Icon className='collapsibleArrow' name='angle up' /> : <Icon className='collapsibleArrow' name='angle down' />

		return(

			<Segment>

				<Collapsible onOpen={this.toggleCollapisble} onClose={this.toggleCollapisble} trigger={this.props.dish.menuItemId.name}>
					{icon}
					<ul>
						<li>noodz: {noodles}</li>
						<li>protein: {proteins}</li>
						<li>sauce: {sauces}</li>
						<li>ingredients: {normals}</li>
					</ul>

				</Collapsible>

			</Segment>


		)

	}

}


export default DishInfo