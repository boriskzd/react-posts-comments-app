import "./App.css";
// react router
import { Routes, Route, Link } from "react-router-dom";
// components
import PostList from "./views/PostList";
import PostDetail from "./views/PostDetail";
import { helloComponent } from "./utils/helloFunc";

function App() {
	const propsMessage = "Hello from ";
	const componentName = "App";

	helloComponent(propsMessage, componentName);

	console.log("");
	return (
		<>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="posts">Post List</Link>
				</li>
				<li>
					<Link to="post/2">Post 2</Link>
				</li>
			</ul>
			<hr />
			<Routes>
				<Route path="/" element={<PostList />} />
				<Route path="/posts" element={<PostList />} />
				<Route path="/post/:id" element={<PostDetail />} />
				<Route path="*" element={<div>404</div>} />
			</Routes>
			<hr />
		</>
	);
}

export default App;
