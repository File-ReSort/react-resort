import logo from './logo.png';
import { MantineProvider, Anchor, Breadcrumbs, Flex, Stepper } from '@mantine/core';
import DocEditor from './components/DocEditor';
import './styles/App.css';

const items = [
	{ title: 'Mantine', href: '#' },
	{ title: 'Mantine hooks', href: '#' },
	{ title: 'use-id', href: '#' },
].map((item, index) => (
	<Anchor href={item.href} key={index}>
		{item.title}
	</Anchor>
));

const App = () => {
	return (
		<div className="App">
			<MantineProvider withGlobalStyles withNormalizeCSS >
				<Flex
					justify="center"
					align="center"
					direction="row"
					wrap="wrap"
					>
					<Breadcrumbs py={6}>{items}</Breadcrumbs>
				</Flex>

				<Flex
					className="App-top"
					justify="center"
					align="center"
					direction="row"
					wrap="wrap"
					gap={80}
				>
					<Flex align="center" gap="lg" px={40}>
						<img src={logo} className="App-logo" alt="logo" />
						<h1>File ReSort</h1>
					</Flex>

					<Stepper color="blue.8" styles={{
						separator: {
							width: 26
						},
					}} active={2}
					>
						<Stepper.Step label="Step 1" description="Upload Documents" />
						<Stepper.Step label="Step 2" description="Proofread and Edit" />
						<Stepper.Step label="Step 3" description="Finalize" />
					</Stepper>
				</Flex>

				<DocEditor />
			</MantineProvider>
		</div>
	);
};

export default App;
