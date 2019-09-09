import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';



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
					<Menu verticle="true">
						<Menu.Item
								name=''
								onClick={this.handleClick}
							>
								place order.
						</Menu.Item>
						<Menu.Item
							name='order-status'
							onClick={this.handleClick}
						>
							order status.
						</Menu.Item>

						<Menu.Item
							name='past-orders'
							onClick={this.handleClick}
						>
							past orders.
						</Menu.Item>

						<Menu.Item
							name='logout'
							onClick={this.props.logout}
						>
							logout.
						</Menu.Item>

					</Menu>
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