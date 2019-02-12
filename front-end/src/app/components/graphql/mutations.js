import gql from 'graphql-tag'

export const STAR_REPO_MUTATION = gql`
	mutation StarRepo($userId: String, $starrableId: ID!) {
		addStar(
			input: { clientMutationId: $userId, starrableId: $starrableId }
		) {
			starrable {
				id
			}
		}
	}
`

export const UNSTAR_REPO_MUTATION = gql`
	mutation UnstarRepo($userId: String, $starrableId: ID!) {
		removeStar(
			input: { clientMutationId: $userId, starrableId: $starrableId }
		) {
			starrable {
				id
			}
		}
	}
`
