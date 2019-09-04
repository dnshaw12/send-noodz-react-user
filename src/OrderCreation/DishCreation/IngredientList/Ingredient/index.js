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

		console.log(this.props);

		if (this.props.extraIngredients.some( ingredient => ingredient._id === ingredient._id)) {
			this.setState({
				selected: true
			})
		}
	}

	handleClick = (e) => {
		console.log(e.target.id);

		this.props.handleIngredientSelection(e.target.id, this.state.selected)

		this.setState({
			selected: !this.state.selected
		})
	}

	render(){

		return(

			<Card id={this.props.ingredient._id} onClick={this.handleClick}>
				{this.props.ingredient.name}
				{ this.props.ingredient.price ? this.props.ingredient.price : null}
				{ this.state.selected ? 'selected' : null }
			</Card>

		)


	}
}

export default Ingredient