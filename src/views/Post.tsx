import { Link, useParams } from "react-router-dom";

import { PostData, UserData, CommentsData } from "../types/types";

import "./Post.css";
import Comment from "./Comment";

interface PostProps {
	data: PostData;
	users: UserData[];
	comments: CommentsData[];
}

export default function Post({ data, users, comments }: PostProps) {
	const { id } = useParams();
	// console.log(`[Post - ${id}]`);

	const user = users.find((user) => data.userId === user.id);
	// console.log(user);

	function findCommentsForPost(
		postId: number,
		comments: CommentsData[]
	): CommentsData[] {
		return comments.filter((comment) => comment.postId === postId);
	}

	const postComments = findCommentsForPost(data.id, comments);

	const commentsList = postComments.map((comment) => (
		<Comment comment={comment} key={comment.id} />
	));

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
					<div className="post-item-label">Author:</div>
					<div className="post-item-value">
						{data.userId} {user?.username}
					</div>
				</div>
				<div className="post-item">
					<div className="post-item-value">{data.body}</div>
				</div>
				<div className="post-item">
					<div className="post-item-value">
						Comments: {commentsList}
					</div>
				</div>
			</div>
		</>
	);
}
