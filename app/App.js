import React from 'react'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Query } from 'react-apollo'
import anime from 'animejs'

import UserNotFound from './components/UserNotFound'
import TargetUserProfile from './components/TargetUserProfile'
import Search from './components/Search'
import Login from './components/Login'
import Loading from './components/Loading'

import {
	GET_USER_BY_LOGIN_QUERY,
	SEARCH_FOR_USER_QUERY,
	GET_PRIMARY_USER_STARS_QUERY,
} from './components/graphql/queries'

const loadingIcon = (
	<i className="fas fa-spinner fa-spin" style={{ fontSize: 35 }} />
)

const findLoginFromSearchResult = ({ loading, error, data }) => {
	if (loading) {
		return loadingIcon
	} else if (error) {
		return `${error.message}`
	}

	if (data.search.edges[0]) {
		const edges = data.search.edges
		let target

		for (let match of edges) {
			for (let item of match.textMatches) {
				if (item.property === 'login') {
					target = item.fragment
					break
				}
			}
			if (target) {
				break
			}
		}

		return target ? { login: target } : <UserNotFound />
	} else {
		return <UserNotFound />
	}
}

const ActionStatusMessage = props => {
	return (
		<div className="action-message-box">
			<p className="action-message-text">
				Repo {props.starValue ? 'has been unstarred' : 'starred'} with
				success.
			</p>
		</div>
	)
}

const transition = () => {
	const height = 1024
	const width = 1440

	let timeline = anime.timeline({
		duration: 2000,
		targets: '.action-message-box',
	})
	timeline.add({
		bottom: (50 / height) * window.innerHeight,
	})
	timeline.add({
		bottom: (-70 / height) * window.innerHeight,
	})
}

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			searchInput: '',
			authenticated: false,
			loading: true,
			primaryUserData: {},
			starAction: false,
		}
	}

	handleSearchInput = event => {
		if (this.state.primaryUserData.username) {
			this.setState({
				searchInput: event.target.value,
			})
		}
	}

	handleStarAction = starStatus => {
		this.setState({
			starAction: !starStatus,
		})
		transition()
	}

	componentDidMount = async () => {
		let userDataRequest = await fetch('http://localhost:8080/userdata')
		let userData = await userDataRequest.json()

		console.log(userData)

		if (userData.profile) {
			console.log(userData)

			const token = userData.accessToken

			const authLink = setContext((_, { headers }) => {
				return {
					headers: {
						...headers,
						authorization: token ? `Bearer ${token}` : null,
					},
				}
			})

			this.client = new ApolloClient({
				link: authLink.concat(
					new HttpLink({ uri: 'https://api.github.com/graphql' })
				),
				cache: new InMemoryCache(),
			})

			await this.setState({
				primaryUserData: userData.profile,
				authenticated: true,
				loading: false,
			})

			console.log(this.state.authenticated)

			const secondFetchRequest = await fetch(
				'https://api.github.com/graphql',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						authorization: token ? `Bearer ${token}` : null,
					},
					body: JSON.stringify({
						query: GET_PRIMARY_USER_STARS_QUERY,
						variables: {
							login: this.state.primaryUserData._json.login,
						},
					}),
				}
			)

			const secondResult = await secondFetchRequest.json()

			this.setState({
				primaryUserData: {
					...this.state.primaryUserData,
					starredRepositories: secondResult.data.user.starredRepositories.edges.map(
						item => {
							return { ...item.node }
						}
					),
				},
			})

			console.log('authenticated')
		} else {
			this.setState({ loading: false })
		}
	}

	render() {
		return (
			<div className="app" id="app">
				{this.state.loading ? (
					<Loading />
				) : this.state.authenticated ? (
					<ApolloProvider client={this.client}>
						<Search
							search={this.handleSearchInput}
							pictureUrl={
								this.state.primaryUserData.photos[0].value
							}
							profile={this.state.primaryUserData.profileUrl}
						/>
						{this.state.searchInput && (
							<Query
								query={SEARCH_FOR_USER_QUERY}
								variables={{
									searchString: this.state.searchInput,
								}}
							>
								{returnedSearchData => {
									const output = findLoginFromSearchResult(
										returnedSearchData
									)

									if (output.login) {
										return (
											<Query
												query={GET_USER_BY_LOGIN_QUERY}
												variables={{
													login: output.login,
												}}
											>
												{({ loading, error, data }) => {
													if (loading) {
														return loadingIcon
													} else if (error) {
														return `${
															error.message
														}`
													}

													data.primaryUserData = this.state.primaryUserData

													return (
														<TargetUserProfile
															data={data.user}
															primaryUserData={
																data.primaryUserData
															}
															starHandler={
																this
																	.handleStarAction
															}
														/>
													)
												}}
											</Query>
										)
									}

									return output
								}}
							</Query>
						)}
						<ActionStatusMessage
							starValue={this.state.starAction}
						/>
					</ApolloProvider>
				) : (
					<Login />
				)}
			</div>
		)
	}
}

export default App
