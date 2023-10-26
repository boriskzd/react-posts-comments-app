import { Link, useParams } from "react-router-dom";

import { PostData } from "./PostList";

import "./Post.css";

interface PostProps {
	data: PostData;
}

export default function Post({ data }: PostProps) {
	const { id } = useParams();
	// console.log(`[Post - ${id}]`);

	return (
		<>
			<div className="post-container">
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
		</>
	);
}
