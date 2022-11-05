import logo from './logo.png';
import Annotator from './components/Annotator.js';
import './App.css';

/*
{tags.map((tag) => {
								return (
									<tr key={tag.id}>
										<td>{tag.text}</td>
										<td>{tag.ent_type_}</td>
									</tr>
								);
							})}
*/
const App = () => {

	return (
		<div className="App">
			<div className="App-top">
				<img src={logo} className="App-logo" alt="logo" />
				<h1>File ReSort</h1>
				<nav>
					<ul>
						<li><a className="active" href="#setup">Setup and Properties</a></li>
						<li><a href="#selection">Document Selection</a></li>
						<li><a href="#review">Review</a></li>
					</ul>
				</nav>
			</div>
			<main>
				<Annotator />
			</main>
		</div>
	);
};

export default App;
