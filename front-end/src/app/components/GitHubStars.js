import React from 'react'
import { Query } from 'react-apollo'
import anime from 'animejs'

import UserNotFound from './UserNotFound'
import TargetUserProfile from './TargetUserProfile'
import Search from './Search'
import Login from './Login'
import Loading from './Loading'

import {
	GET_USER_BY_LOGIN_QUERY,
	SEARCH_FOR_USER_QUERY,
	GET_PRIMARY_USER_STARS_QUERY,
} from './graphql/queries'

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

class GitHubStars extends React.Component {
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

	handleStarAction = () => {
		this.setState({
			starAction: !this.state.starAction,
		})
		transition()
	}

	componentDidMount = async () => {
		let firstFetchRequest = await fetch(
			'https://github-stars.glitch.me/userdata'
		)
		let firstResult = await firstFetchRequest.json()
		if (firstResult.profile) {
			await this.setState({
				authenticated: true,
				loading: false,
				primaryUserData: firstResult.profile,
			})

			const token = ''

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
					<Search
						search={this.handleSearchInput}
						pictureUrl={this.state.primaryUserData.photos[0].value}
						profile={this.state.primaryUserData.profileUrl}
					/>
				) : (
					<Login />
				)}
				{this.state.searchInput && (
					<Query
						query={SEARCH_FOR_USER_QUERY}
						variables={{ searchString: this.state.searchInput }}
					>
						{returnedSearchData => {
							const output = findLoginFromSearchResult(
								returnedSearchData
							)

							if (output.login) {
								return (
									<Query
										query={GET_USER_BY_LOGIN_QUERY}
										variables={{ login: output.login }}
									>
										{({ loading, error, data }) => {
											if (loading) {
												return loadingIcon
											} else if (error) {
												return `${error.message}`
											}

											data.primaryUserData = this.state.primaryUserData

											return (
												<TargetUserProfile
													data={data.user}
													primaryUserData={
														data.primaryUserData
													}
													starHandler={
														this.handleStarAction
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
				<ActionStatusMessage starValue={this.state.starAction} />
			</div>
		)
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

export default GitHubStars
