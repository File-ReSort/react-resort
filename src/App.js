import logo from './logo.png';
import Document from './Document.js';
import './App.css';

const App = () => {
	/*
	const WBK = require('wikibase-sdk');
	const wdk = WBK({
	instance: 'https://www.wikidata.org',
	sparqlEndpoint: 'https://query.wikidata.org/sparql'
	});

	const url = wdk.searchEntities('Department of the Treasury');
	console.log(url);
	*/

	const tags = [
		{
			"id": 1,
			"text": "Office of the Comptroller of the Currency",
			"ent_type_": "ORG"
		},
		{
			"id": 2,
			"text": "Department of the Treasury",
			"ent_type_": "ORG"
		},
		{
			"id": 3,
			"text": "Comptroller of the Currency",
			"ent_type_": "PERSON"
		},
		{
			"id": 4,
			"text": "Secretary of the Treasury",
			"ent_type_": "PERSON"
		}
	];

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
				<Document />
				<div className="Doc-options">
					<div className="Tags-container">
						<h3>Entities</h3>
						{tags.map((tag) => {
							return (
								<div key={tag.id}>
									{tag.text}
									{tag.ent_type_}
								</div>
							);
						})}
					</div>
					<div>
					<h3>Rules</h3>
					</div>
				</div>
			</main>
		</div>
	);
};

export default App;
