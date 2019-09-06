import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';

class Ingredient extends Component {
	constructor(props){
		super(props)

		this.state = {
			selected: false
		}
	}

	componentDidMount = () => {

		if (this.props.extraIngredients.some( ingredient1 => ingredient1 === this.props.ingredient._id)) {
			this.setState({
				selected: true
			})
		}

	}

	handleClick = (e) => {

		if (this.props.ingredient.inStock) {
			this.props.handleIngredientSelection(this.props.ingredient._id, this.state.selected)

			this.setState({
				selected: !this.state.selected
			})	
		}

	}

	render(){

		const inStock = this.props.ingredient.inStock ? 'inStock' : 'outOfStock'

		const selected = this.state.selected ? 'selectedIngredient' : ''

		return(

			<Card id={this.props.ingredient._id} onClick={this.handleClick}>
				<Card.Content className={inStock + ' ' + selected}>
					<Card.Header>{this.props.ingredient.name}</Card.Header>
					{ this.props.ingredient.price ? this.props.ingredient.price : null}
				</Card.Content>
			</Card>

		)


	}
}

export default Ingredient