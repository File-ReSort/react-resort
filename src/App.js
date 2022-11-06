import logo from './logo.png';
import { MantineProvider } from '@mantine/core';
import DocEditor from './components/DocEditor';
import './styles/App.css';

const App = () => {
	return (
		<div className="App">
			<MantineProvider withGlobalStyles withNormalizeCSS>
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
			<DocEditor />
			</MantineProvider>
		</div>
	);
};

export default App;
