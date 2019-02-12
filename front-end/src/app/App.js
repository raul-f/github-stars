import React from 'react'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

import GitHubStars from './components/GitHubStars'

const token = 'd4d042ec99d728f6464763382da7cb9aa406ae42'

const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : null,
		},
	}
})

const client = new ApolloClient({
	link: authLink.concat(
		new HttpLink({ uri: 'https://api.github.com/graphql' })
	),
	cache: new InMemoryCache(),
})

const App = () => (
	<ApolloProvider client={client}>
		<GitHubStars />
	</ApolloProvider>
)

export default App
