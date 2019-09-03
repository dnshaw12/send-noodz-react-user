import React, { Component } from 'react';
import { Menu, Icon, Button } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';


class UserMenu extends Component {
	constructor(){
		super()

		this.state = {
			menuOpen: false
		}
	}

	handleClick = (e, { name }) => {
		console.log(name);

		this.props.history.push(`/${name}`)
	}

	render(){
		return(
			<div>
				{this.props.loggedIn ? 
					null
					:
					<Menu verticle="true">
						<Menu.Item
							name='login'
							onClick={this.handleClick}
						>
							login.
						</Menu.Item>

						<Menu.Item
							name='sign-up'
							onClick={this.handleClick}
						>
							sign up.
						</Menu.Item>

					</Menu>

				}
			</div>
		)
	}
}

export default withRouter(UserMenu)