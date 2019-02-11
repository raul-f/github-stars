import React from 'react'

const Profile = props => {
	return (
		<div className="profile-box">
			<div className="main-info">
				<img className="user-profile-img" src={props.data.avatarUrl} />
				<h2 className="user-name">{props.data.name}</h2>
				<h3 className="user-login">{props.data.login}</h3>
			</div>
			<div className="secondary-info">
				{props.data.bio && <p className="bio">{props.data.bio}</p>}
				{props.data.company && (
					<p className="company minor-info">
						<img
							className="info-icon"
							src="https://s3-sa-east-1.amazonaws.com/myhostedfiles.raulf/Images/svg-icons/users.svg"
						/>
						{props.data.company}
					</p>
				)}
				{props.data.location && (
					<p className="location minor-info">
						<img
							className="info-icon"
							src="https://s3-sa-east-1.amazonaws.com/myhostedfiles.raulf/Images/svg-icons/map-pin.svg"
						/>
						{props.data.location}
					</p>
				)}
				{props.data.email && (
					<p className="email minor-info">
						<img
							className="info-icon"
							src="https://s3-sa-east-1.amazonaws.com/myhostedfiles.raulf/Images/svg-icons/mail.svg"
						/>
						{props.data.email}
					</p>
				)}
				{props.data.websiteUrl && (
					<a
						className="website minor-info"
						href={props.data.websiteUrl}
						target="_blank"
					>
						<img
							className="info-icon"
							src="https://s3-sa-east-1.amazonaws.com/myhostedfiles.raulf/Images/svg-icons/globe.svg"
						/>
						{props.data.websiteUrl.length > 25
							? `${props.data.websiteUrl.substring(0, 21)}...`
							: props.data.websiteUrl}
					</a>
				)}
			</div>
		</div>
	)
}

export default Profile
