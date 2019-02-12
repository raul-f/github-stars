import React, { useState } from 'react'
import { ApolloConsumer } from 'react-apollo'

import { STAR_REPO_MUTATION, UNSTAR_REPO_MUTATION } from '../graphql/mutations'

const Repository = props => {
	const [starred, setStarred] = useState(
		props.primaryUserRepos.includes(props.id)
	)

	return props.none ? (
		<h2>No repositories found</h2>
	) : (
		<div className="single-repository">
			<div className="repository-info">
				<a href={props.url} className="repository-title">
					{props.owner} / {props.name}
				</a>
				<p className="repository-description">{props.description}</p>
				<p className="repository-stars">
					<img
						src="https://s3-sa-east-1.amazonaws.com/myhostedfiles.raulf/Images/svg-icons/star.svg"
						className="star-icon"
					/>
					{props.stars} stars
				</p>
			</div>
			{starred ? (
				<UnstarButton
					starSetter={setStarred}
					starValue={starred}
					starHandler={props.starHandler}
					primaryUserId={props.primaryUserId}
					repoId={props.id}
				/>
			) : (
				<StarButton
					starSetter={setStarred}
					starValue={starred}
					starHandler={props.starHandler}
					primaryUserId={props.primaryUserId}
					repoId={props.id}
				/>
			)}
		</div>
	)
}

const StarButton = props => {
	return (
		<ApolloConsumer>
			{client => {
				return (
					<button
						className="star-button"
						onClick={async () => {
							const apiAnswer = await client.mutate({
								mutation: STAR_REPO_MUTATION,
								variables: {
									userId: props.primaryUserId,
									starrableId: props.repoId,
								},
							})
							await props.starSetter(!props.starValue)
							props.starHandler(!props.starValue)
						}}
					>
						star
					</button>
				)
			}}
		</ApolloConsumer>
	)
}

const UnstarButton = props => {
	return (
		<ApolloConsumer>
			{client => {
				return (
					<button
						className="unstar-button"
						onClick={async () => {
							const apiAnswer = await client.mutate({
								mutation: UNSTAR_REPO_MUTATION,
								variables: {
									userId: props.primaryUserId,
									starrableId: props.repoId,
								},
							})
							await props.starSetter(!props.starValue)
							props.starHandler(!props.starValue)
						}}
					>
						unstar
					</button>
				)
			}}
		</ApolloConsumer>
	)
}

export default Repository
