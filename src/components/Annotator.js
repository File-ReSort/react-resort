import { TokenAnnotator, TextAnnotator } from 'react-text-annotate';
import { Dropdown } from 'semantic-ui-react';
import React from 'react';
import './Annotator.css';

const TEXT =
	`DEPARTMENT OF THE TREASURY
	Office of the Comptroller of the Currency
	12 CFR Part 53
	[Docket ID OCC-2020-0038]
	RIN 1557-AF02
	FEDERAL RESERVE SYSTEM
	12 CFR Part 225
	[Docket No. R- 1736]
	RIN 7100-AG06
	FEDERAL DEPOSIT INSURANCE CORPORATION
	12 CFR Part 304
	RIN 3064-AF59
	Computer-Security Incident Notification Requirements for Banking Organizations and Their Bank Service Providers
	AGENCY: The Office of the Comptroller of the Currency (OCC), Treasury; the Board of Governors of the Federal Reserve System (Board); and the Federal Deposit Insurance Corporation (FDIC).
	ACTION: Final rule.
	SUMMARY: The OCC, Board, and FDIC are issuing a final rule that requires a banking
	organization to notify its primary federal regulator of any “computer-security incident” that rises
	to the level of a “notification incident,” as soon as possible and no later than 36 hours after the
	banking organization determines that a notification incident has occurred. The final rule also
	requires a bank service provider to notify each affected banking organization customer as soon as
	possible when the bank service provider determines that it has experienced a computer-security
	incident that has caused, or is reasonably likely to cause, a material service disruption or
	degradation for four or more hours.
	DATES: Effective date: April 1, 2022; Compliance date: May 1, 2022.`;

const TAG_COLORS = {
	ORG: "#00ffa2",
	PERSON: "#84d2ff",
	REQUIREMENT: "#84d2ff"
};

const tags = [
	{
		key: 'ORG',
		text: 'ORG',
		value: 'ORG',
		tag: 'ORG'
	},
	{
		key: 'PERSON',
		text: 'PERSON',
		value: 'PERSON',
		tag: 'PERSON'
	},
	{
		key: 'REQUIREMENT',
		text: 'REQUIREMENT',
		value: 'REQUIREMENT',
		tag: 'REQUIREMENT'
	}
]

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

		this.TAG_COLORS = {
			ORG: "#00ffa2",
			PERSON: "#84d2ff",
			REQUIREMENT: "#84d2ff"
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
			<main>
				<div className="Container">
					<Card>
						<Dropdown
							onChange={this.handleTagChange}
							value={this.state.tag}
							fluid
							selection
							options={tags}
						/>
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
				</div>
				<div className="Doc-options">
					<div>
						<h3>Rules</h3>
					</div>
					<div className="Tags-container">
						<h3>Entities</h3>
						<div>
							<table>
								{this.state.value.map((ents) => {
									return (
										<tr>
											<td>{ents.tokens.join(" ")}</td>
											<td>{ents.tag}</td>
										</tr>
									)
								})}
							</table>
						</div>
					</div>
				</div>
			</main>
		);
	}
}

export default Annotator;