import gql from 'graphql-tag'

export const GET_USER_BY_LOGIN_QUERY = gql`
	query GetUserByLogin($login: String!) {
		user(login: $login) {
			login
			avatarUrl(size: 150)
			bio
			company
			email
			name
			location
			websiteUrl
			starredRepositories(first: 100) {
				edges {
					node {
						id
						name
						url
						description
						owner {
							login
						}
						stargazers {
							totalCount
						}
						languages(first: 20) {
							edges {
								node {
									name
								}
							}
						}
					}
				}
			}
		}
	}
`

export const SEARCH_FOR_USER_QUERY = gql`
	query SearchForUser($searchString: String!) {
		search(query: $searchString, type: USER, first: 5) {
			edges {
				textMatches {
					fragment
					property
				}
			}
		}
	}
`

export const GET_PRIMARY_USER_STARS_QUERY = `
	query GetUserByLogin($login: String!) {
		user(login: $login) {
			id
			starredRepositories(first: 100) {
				edges {
					node {
						id
						name
						url
					}
				}
			}
		}
	}
`
