import { useEffect, useState } from "react";
import "./PostList.css";

import Post from "./Post";
import { helloComponent } from "../utils/helloFunc";

import { PostData, UserData, CommentsData } from "../types/types";

export default function PostList() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const componentName = "PostList";

	const [postData, setPostData] = useState<PostData[] | null>(null);
	const [userData, setUserData] = useState<UserData[] | null>(null); // Define UserData type
	const [commentsData, setCommentsData] = useState<CommentsData[] | null>(
		null
	); // Define UserData type

	// helloComponent();

	// const {user, error2, isLoaing2} = useUserQuery(user.id, {skip: !user.id})

	useEffect(() => {
		// Define the URLs for the two API calls
		const apiUrl = "https://jsonplaceholder.typicode.com";
		const postApiUrl = apiUrl + "/posts";
		const userApiUrl = apiUrl + "/users";
		const commentsApiUrl = apiUrl + "/comments";

		setIsLoading(true);
		// Use Promise.all to fetch data from both APIs
		Promise.all([
			fetch(postApiUrl),
			fetch(userApiUrl),
			fetch(commentsApiUrl),
		])
			.then((responses) => {
				return Promise.all(
					responses.map((response) => response.json())
				);
			})
			.then(([postData, userData, commentsData]) => {
				setPostData(postData);
				setUserData(userData);
				setCommentsData(commentsData);
				setIsLoading(false);
				console.log(userData);
				console.log(commentsData);
			})
			.catch((error) => {
				setError(error);
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return <div>Post List ... Loading</div>;
	}

	if (error) {
		return <div>Error {error.message}</div>;
	}

	console.log(userData);

	return (
		<div className="post-list">
			{postData &&
			postData.length > 0 &&
			userData &&
			userData.length > 0 &&
			commentsData &&
			commentsData.length > 0 ? (
				postData.map((item) => (
					<Post
						data={item}
						users={userData}
						comments={commentsData}
						key={item.id}
					/>
				))
			) : (
				<p>No Posts</p>
			)}
		</div>
	);
}
