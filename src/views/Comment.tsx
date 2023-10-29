import { CommentsData } from "../types/types";

import "./Comment.css";

interface Props {
	comment: CommentsData;
}

export default function Comment({ comment }: Props) {
	return (
		<div className="comment">
			<h5 className="comment-title">{comment.name}</h5>
			<p className="comment-body"> {comment.body}</p>
		</div>
	);
}
