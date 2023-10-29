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
						<h3 className="post-title">
							<span className="post-item-label">{data.id}:</span>{" "}
							{data.title}
						</h3>
					</Link>
				</div>

				<div className="post-item">
					<div className="post-item-label">Author ID:</div>
					<div className="post-item-value">{data.userId}</div>
				</div>
				<div className="post-item">
					<div className="post-item-value">{data.body}</div>
				</div>
			</div>
		</>
	);
}
