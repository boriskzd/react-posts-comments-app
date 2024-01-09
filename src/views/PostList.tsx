import { SetStateAction, useEffect, useState } from "react";
import "./PostList.css";

import Post from "./Post";
import { helloComponent } from "../utils/helloFunc";

import { PostData, UserData, CommentsData } from "../types/types";
import Search from "./Search/Search";

export default function PostList() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const componentName = "PostList";

	const [postData, setPostData] = useState<PostData[] | null>(null);
	const [userData, setUserData] = useState<UserData[] | null>(null);
	const [commentsData, setCommentsData] = useState<CommentsData[] | null>(
		null
	);

	const [searchText, setSearchText] = useState("");

	function handleSearch(event: any): any {
		setSearchText(event.target.value);
	}

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

	const dataIsFetched =
		postData &&
		postData.length > 0 &&
		userData &&
		userData.length > 0 &&
		commentsData &&
		commentsData.length > 0;

	let searchedUsers: UserData[] | null = userData;
	if (searchText && userData) {
		console.log(searchText);

		searchedUsers = userData.filter((user) =>
			user.username.includes(searchText)
		);

		console.log("searchedUsers");
		console.log(searchedUsers);
	}

	const checkIt = (item: PostData) => {
		let isUserMatching = false;
		searchedUsers?.forEach((user) =>
			user.id === item.userId ? (isUserMatching = true) : null
		);
		return isUserMatching;
	};

	return (
		<>
			<Search handleSearch={handleSearch} searchText={searchText} />

			<div className="post-list">
				{dataIsFetched ? (
					postData.map(
						(item) =>
							checkIt(item) && (
								<Post
									data={item}
									users={userData}
									comments={commentsData}
									key={item.id}
								/>
							)
					)
				) : (
					<p>No Posts</p>
				)}
			</div>
			{console.warn("end")}
		</>
	);
}
