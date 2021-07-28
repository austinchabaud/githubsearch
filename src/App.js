import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';
// refactoring
class App extends Component {
	state = {
		users: [],
		user: [],
		repos: [],
		loading: false,
		alert: null,
	};

	// Search GitHub Users
	searchUsers = async (text) => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_seceret=${process.env.REACT_APP_GITHUB_CLIENT_SECERET}`
		);

		this.setState({ users: res.data.items, loading: false });
	};

	// Get single GitHub User
	getUser = async (username) => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_seceret=${process.env.REACT_APP_GITHUB_CLIENT_SECERET}`
		);

		this.setState({ user: res.data, loading: false });
	};

	// Get User Repos
	getUserRepos = async (username) => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_seceret=${process.env.REACT_APP_GITHUB_CLIENT_SECERET}`
		);

		this.setState({ repos: res.data, loading: false });
	};

	// Clear Users From State
	clearUsers = () => this.setState({ users: [], loading: false });

	// Alert if no text is in search

	setAlert = (msg, type) => {
		this.setState({ alert: { msg, type } });

		setTimeout(() => this.setState({ alert: null }), 4500);
	};

	render() {
		const { users, loading, alert, user, repos } = this.state;
		return (
			<Router>
				<div className='App'>
					<Navbar />
					<div className='container'>
						<Alert alert={alert} />
						<Switch>
							<Route
								exact
								path='/'
								render={(props) => (
									<Fragment>
										<Search
											searchUsers={this.searchUsers}
											clearUsers={this.clearUsers}
											showClear={users.length > 0 ? true : false}
											setAlert={this.setAlert}
										/>
										<Users loading={loading} users={users} />
									</Fragment>
								)}
							/>
							<Route exact path='/about' component={About} />
							<Route
								exact
								path='/user/:login'
								render={(props) => (
									<User
										{...props}
										getUser={this.getUser}
										getUserRepos={this.getUserRepos}
										user={user}
										repos={repos}
										loading={loading}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
