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

		console.log(this.props.ingredient);
		console.log(this.props.extraIngredients.some( ingredient1 => ingredient1._id === this.props.ingredient._id));

		console.log(this.props.extraIngredients,'extraIngredients');

		this.props.extraIngredients.forEach( ing => {
			console.log(ing._id, this.props.ingredient._id,ing._id === this.props.ingredient._id)
		})

		if (this.props.extraIngredients.some( ingredient1 => ingredient1 === this.props.ingredient._id)) {
			this.setState({
				selected: true
			})
		}
	}

	handleClick = (id,e) => {
		console.log(e.target, id);

		this.props.handleIngredientSelection(id, this.state.selected)

		this.setState({
			selected: !this.state.selected
		})
	}

	render(){

		return(

			<Card id={this.props.ingredient._id} onClick={this.handleClick.bind(null, this.props.ingredient._id)}>
				<Card.Content>
					<Card.Header>{this.props.ingredient.name}</Card.Header>
					{ this.props.ingredient.price ? this.props.ingredient.price : null}
					{ this.state.selected ? 'selected' : null }
				</Card.Content>
			</Card>

		)


	}
}

export default Ingredient