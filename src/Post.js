import React from "react";

function Post({ postId, postCotent }) {
	return (
		<div>
			ID: {postId}
			<br />
			<br />
			<div>{postCotent}</div>
		</div>
	);
}
export default Post;
