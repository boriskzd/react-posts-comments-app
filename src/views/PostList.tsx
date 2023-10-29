import { useEffect, useState } from "react";
import "./PostList.css";

import Post from "./Post";
import { helloComponent } from "../utils/helloFunc";

export interface PostData {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export default function PostList() {
	const [data, setData] = useState<PostData[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const componentName = "PostList";

	// helloComponent();

	// const {user, error2, isLoaing2} = useUserQuery(user.id, {skip: !user.id})

	useEffect(() => {
		const apiUrl = "https://jsonplaceholder.typicode.com/posts";

		setIsLoading(true);
		fetch(apiUrl)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((responseData) => {
				setData(responseData);
				console.log(responseData);
				setIsLoading(false);
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

	return (
		<div className="post-list">
			{data && data.length > 0 ? (
				data.map((item) => <Post data={item} key={item.id} />)
			) : (
				<p>No Posts</p>
			)}
		</div>
	);
}
