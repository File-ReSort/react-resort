import logo from './logo.png';
import Document from './Document.js';
import './App.css';

function App() {
	return (
		<div className="App">
			<div className="App-top">
				<img src={logo} className="App-logo" alt="logo" />
				<h1>File ReSort</h1>
				<nav>
					<ul>
						<li><a class="active" href="#setup">Setup and Properties</a></li>
						<li><a href="#selection">Document Selection</a></li>
						<li><a href="#review">Review</a></li>
					</ul>
				</nav>
			</div>

			<main>
				<Document />
			</main>
		</div>
	);
}

export default App;
