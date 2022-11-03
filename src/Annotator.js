import { TokenAnnotator, TextAnnotator } from 'react-text-annotate';
import React from 'react';

const TEXT =
	"§1. Office of the Comptroller of the Currency (a) Office of the Comptroller of the Currency established There is established in the Department of the Treasury a bureau to be known as the Office of the Comptroller of the Currency' which is charged with assuring the safety and soundness of, and compliance with laws and regulations, fair access to financial services, and fair treatment of customers by, the institutions and other persons subject to its jurisdiction. (b) Comptroller of the Currency (1) In general The chief officer of the Office of the Comptroller of the Currency shall be known as the Comptroller of the Currency. The Comptroller of the Currency shall perform the duties of the Comptroller of the Currency under the general direction of the Secretary of the Treasury. The Secretary of the Treasury may not delay or prevent the issuance of any rule or the promulgation of any regulation by the Comptroller of the Currency, and may not intervene in any matter or proceeding before the Comptroller of the Currency (including agency enforcement actions), unless otherwise specifically provided by law.";
const TAG_COLORS = {
	ORG: "#00ffa2",
	PERSON: "#84d2ff"
};

const Card = ({ children }) => (
	<div
		style={{
			margin: 6,
			padding: 16
		}}
	>
		{children}
	</div>
);

class Annotator extends React.Component {
	constructor(props) {
		super(props);

		this.TEXT = "§1. Office of the Comptroller of the Currency (a) Office of the Comptroller of the Currency established There is established in the Department of the Treasury a bureau to be known as the Office of the Comptroller of the Currency' which is charged with assuring the safety and soundness of, and compliance with laws and regulations, fair access to financial services, and fair treatment of customers by, the institutions and other persons subject to its jurisdiction. (b) Comptroller of the Currency (1) In general The chief officer of the Office of the Comptroller of the Currency shall be known as the Comptroller of the Currency. The Comptroller of the Currency shall perform the duties of the Comptroller of the Currency under the general direction of the Secretary of the Treasury. The Secretary of the Treasury may not delay or prevent the issuance of any rule or the promulgation of any regulation by the Comptroller of the Currency, and may not intervene in any matter or proceeding before the Comptroller of the Currency (including agency enforcement actions), unless otherwise specifically provided by law.";
		this.TAG_COLORS = {
			ORG: "#00ffa2",
			PERSON: "#84d2ff"
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleTagChange = this.handleTagChange.bind(this);

		this.state = {
			value: [
				{
					start: 4,
					end: 8,
					tag: "PERSON",
					tokens: [
						"Comptroller", "of", "the", "Currency"
					],
					color: "#84d2ff"
				},
				{
					start: 9,
					end: 16,
					tag: "ORG",
					tokens: [
						"Office", "of", "the", "Comptroller", "of", "the", "Currency"
					],
					color: "#00ffa2"
				},
				{
					start: 22,
					end: 26,
					tag: "ORG",
					tokens: [
						"Department", "of", "the", "Treasury"
					],
					color: "#00ffa2"
				},
				{
					start: 130,
					end: 135,
					tokens: [
						"The", "Secretary", "of", "the", "Treasury"
					],
					tag: "PERSON"
				}
			],
			tag: "ORG"
		};
	}

	handleChange = value => {
		this.setState({ value });
	};

	handleTagChange = e => {
		this.setState({ tag: e.target.value });
	};

	render() {
		return (
			<div>
				<Card>
					<h4>Default</h4>
					<select onChange={this.handleTagChange} value={this.state.tag}>
						<option value="ORG">ORG</option>
						<option value="PERSON">PERSON</option>
					</select>
					<TokenAnnotator
						style={{
							lineHeight: 1.5
						}}
						tokens={TEXT.split(" ")}
						value={this.state.value}
						onChange={this.handleChange}
						getSpan={span => ({
							...span,
							tag: this.state.tag,
							color: TAG_COLORS[this.state.tag]
						})}
					/>
				</Card>
				<Card>
					<h4>Current Value</h4>
					<pre>{JSON.stringify(this.state.value, null, 2)}</pre>
				</Card>
			</div>
		);
	}
}

export default Annotator;