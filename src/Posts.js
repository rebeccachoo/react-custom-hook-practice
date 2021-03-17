import React, { useState } from "react";
import axios from "axios";
import useAsync from "./useAsync";
import styled from "styled-components";
import Post from "./Post";

const PostStyle = styled.div`
	display: flex;
	flex-direction: row;
	margin: 0;
	padding: 0;
	width: 100%;
	box-sizing: border-box;
`;
const LoadingStyle = styled.div`
	font-size: 32px;
`;
const ErrorStyle = styled.div`
	color: red;
`;

const TitleStyle = styled.div`
	width: 30%;
	display: flex;
	flex-direction: column;
`;
const ContentStyle = styled.div`
	width: 70%;
`;
const PostLink = styled.span`
	width: 80%;
	cursor: pointer;
	color: #2e4057;
	margin-bottom: 10px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-weight: bold;
`;

async function getPosts() {
	const response = await axios.get(
		"https://jsonplaceholder.typicode.com/posts"
	);
	return response.data;
}

function Posts() {
	// postId will be null at first time. setPostId will be used to change the postId
	const [postId, setPostId] = useState(null);
	const [postCotent, setPostContent] = useState(null);
	// get state and refetch function(fetchData) from useAsync
	const [state, refetch] = useAsync(getPosts, []);

	const { loading, data: posts, error } = state;

	if (loading) return <LoadingStyle>It is loading...</LoadingStyle>;
	if (error) return <ErrorStyle>Error is occured</ErrorStyle>;
	if (!posts) return "<div>Post is not found.</div>";
	// console.log(posts);

	const clicked = (id, body) => {
		setPostId(id);
		setPostContent(body);

		setTimeout(() => {
			refetch();
			// console.log(postId);
			// console.log(postCotent);
		}, 1000);
	};

	return (
		<>
			<PostStyle>
				<TitleStyle>
					{posts.map((post) => {
						return (
							<PostLink
								key={post.id}
								onClick={() => clicked(post.id, post.body)}
							>
								{post.title}
							</PostLink>
						);
					})}
				</TitleStyle>
				<ContentStyle>
					{postId && <Post postId={postId} postCotent={postCotent} />}
				</ContentStyle>
			</PostStyle>
		</>
	);
}
export default Posts;
