import { Link, useParams } from "react-router-dom";

import { PostData } from "./PostList";

import "./Post.css";
import { useEffect, useState } from "react";
import { apiUrl } from "../utils/constants";
// import Post from "./Post";

interface PostProps {
	data: PostData;
}

export default function PostDetail() {
	const { id } = useParams();
	console.log(`[Post - ${id}]`);

	const [data, setData] = useState<PostData | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const url = apiUrl + "posts/" + id;

		setIsLoading(true);
		fetch(url)
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
	}, [id]);

	if (isLoading) {
		return <div>Post Detail is ... Loading</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (data) console.table(data);

	return (
		<>
			{data && (
				<div className="post-container">
					{/* <Post data={props}/> */}
					<div className="post-item">
						<Link to={`/post/${data.id}`}>
							<h2>Post {id}</h2>
						</Link>
					</div>

					<div className="post-item">
						<div className="post-item-label">Title:</div>
						<div className="post-item-value">{data.title}</div>
					</div>
					<div className="post-item">
						<div className="post-item-label">ID:</div>
						<div className="post-item-value">{data.id}</div>
					</div>
					<div className="post-item">
						<div className="post-item-label">User ID:</div>
						<div className="post-item-value">{data.userId}</div>
					</div>
					<div className="post-item">
						<div className="post-item-label">Body:</div>
						<div className="post-item-value">{data.body}</div>
					</div>
				</div>
			)}
		</>
	);
}
