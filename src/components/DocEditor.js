import React from "react";
import { Button, Table } from "@mantine/core";
import nlp from 'compromise';
import './styles/DocEditor.css';

const text =
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

const tagColor = (term) => {
    const { tags } = term;

    if (tags.includes("ORG")) {
        return "#FFCFD2"
    };

    if (tags.includes("PERSON")) {
        return "#B9FBC0"
    };
}

class DocEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            words: this.getWords(),
            generated: '',
            labels: [
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
			]
        }

        this.getWords = this.getWords.bind(this);
        this.handleTags = this.handleTags.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        this.updateTags();
    }

    getWords() {
        const words = nlp(text).json().map((w) => w.terms).flat().map((term) => {
            return {
                term,
                color: tagColor(term)
            }
        });

        return words;
    }

    handleTags() {
        return this.state.words.map(({ term, color }, i) => {
            const { pre, post, text } = term;

            let tagColor = "#fff";

            if (term.tags.includes("ORG")) {
                tagColor = "#FFCFD2";
            } else if (term.tags.includes("PERSON")) {
                tagColor = "#B9FBC0";
            }

            return (
                <span key={i}>
                    {pre}
                    <span className={term.title} id={i} label={term.tags.join(",")} style={{ backgroundColor: tagColor }}>
                        {text}
                    </span>
                    {post}
                </span>
            )
        });
    }

    handleSelect() {
        let selected = window.getSelection();
        let index = selected.anchorNode.parentElement.id;

        if (selected && index) {
            this.state.words[index].term.tags.push("ORG");
            this.updateTags();
        }
    }

    table() {
        const rows = this.state.labels.map((label) => (
            <tr key={label.tokens.join(" ")}>
                <td>{label.tag}</td>
                <td>{label.tokens.join(" ")}</td>
            </tr>
        ));

        return (
            <Table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Text</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        );
    }

    updateTags() {
        this.setState({
            generated: this.handleTags()
        });
    }

    render() {
        return (
            <div className="DocEditor">
                <div className="Text-container" onMouseUp={this.handleSelect}>
                    {this.state.generated}
                </div>
                <div className="Doc-options">
                    <div>
                        <h3>Rules</h3>
                    </div>
                    <div className="Tags-container">
                        <h3>Entities</h3>
                        <div>
                            {this.table()}
                        </div>
                    </div>
                    <Button variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>Lime green</Button>
                </div>
            </div>
        );
    }
}
export default DocEditor;