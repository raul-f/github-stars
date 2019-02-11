import React from 'react'
import { Query } from 'react-apollo'

import UserNotFound from './UserNotFound'
import UserProfile from './UserProfile'
import Search from './Search'

import {
	GET_USER_BY_LOGIN_QUERY,
	SEARCH_FOR_USER_QUERY,
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

	if (
		data &&
		data.search &&
		data.search.edges[0] &&
		data.search.edges[0].textMatches
	) {
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

		return target ? { login: target, found: true } : <UserNotFound />
	} else {
		return <UserNotFound />
	}
}

const processUserData = ({ loading, error, data }) => {
	if (loading) {
		return loadingIcon
	} else if (error) {
		return `${error.message}`
	}

	return <UserProfile data={data.user} />
}

class GitHubStars extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			searchInput: '',
		}
	}

	handleSearchInput = async event => {
		await this.setState({
			searchInput: event.target.value,
		})
		//console.log(this.state)
	}

	render() {
		return (
			<div className="app" id="app">
				<Search search={this.handleSearchInput} />
				{this.state.searchInput && (
					<Query
						query={SEARCH_FOR_USER_QUERY}
						variables={{ searchString: this.state.searchInput }}
					>
						{returnedData => {
							const output = findLoginFromSearchResult(
								returnedData
							)
							return output.login ? (
								<Query
									query={GET_USER_BY_LOGIN_QUERY}
									variables={{ login: output.login }}
								>
									{returnedUserData => {
										return processUserData(returnedUserData)
									}}
								</Query>
							) : (
								output
							)
						}}
					</Query>
				)}
			</div>
		)
	}
}

export default GitHubStars
