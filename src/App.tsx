import "normalize.css";
import "./App.css";
// react router
import { Routes, Route, Link } from "react-router-dom";
// components
import PostList from "./views/PostList";
import PostDetail from "./views/PostDetail";
import { helloComponent } from "./utils/helloFunc";

function App() {
	const propsMessage = "Hello from ";
	const componentName = "APP";

	helloComponent(propsMessage, componentName);

	console.log("");
	return (
		<>
			<ul className="links-container">
				<li className="list-item">
					<Link to="/" className="link">
						Home
					</Link>
				</li>
				<li className="list-item">
					<Link to="posts" className="link">
						Post List
					</Link>
				</li>
				<li className="list-item">
					<Link to="post/1" className="link">
						Post 1
					</Link>
				</li>
				<li className="list-item">
					<Link to="post/2" className="link">
						Post 2
					</Link>
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
