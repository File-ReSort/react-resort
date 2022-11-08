import React from "react";
import { Button, Checkbox, Flex, Table } from "@mantine/core";
import nlp from 'compromise';
import './styles/DocEditor.css';

const text =
    `
    Computer-Security Incident Notification: Final Rule

    Summary
    On November 23, 2021, the Office of the Comptroller of the Currency (OCC), Board of Governors of the Federal Reserve System, and the Federal Deposit Insurance Corporation published a final rule to establish computer-security incident notification requirements for banking organizations and their bank service providers.
    
    Highlights
    The rule requires a bank to notify the OCC as soon as possible and no later than 36 hours after the bank determines that a computer-security incident that rises to the level of a notification incident has occurred. The bank must provide this notification to the appropriate OCC supervisory office, or OCC-designated point of contact, through email, telephone, or other similar methods that the OCC may prescribe.
        The rule defines computer-security incident as an occurrence that results in actual harm to the confidentiality, integrity, or availability of an information system or the information that the system processes, stores, or transmits.
        A notification incident generally would include a significant computer-security incident that disrupts or degrades, or is reasonably likely to disrupt or degrade, the viability of the banking organization’s operations, result in customers being unable to access their deposit and other accounts, or impact the stability of the financial sector. This may include a major computer-system failure; cyber-related interruption, such as a distributed denial of service or ransomware attack; or another type of significant operational interruption.
    
    The rule also requires a bank service provider to notify at least one bank-designated point of contact at each affected customer bank as soon as possible when it determines it has experienced a computer-security incident that has materially disrupted or degraded, or is reasonably likely to disrupt or degrade, covered services provided to the bank for four or more hours. If the bank has not previously provided a designated point of contact, the notification must be made to the bank’s chief executive officer and chief information officer or to two individuals of comparable responsibilities.
    
    Background
    Computer-security incidents can result from destructive malware or malicious software (cyberattacks), as well as nonmalicious failure of hardware and software, personnel errors, and other causes. Cyberattacks targeting the financial services industry have increased in frequency and severity in recent years. These cyberattacks can adversely affect a bank’s networks, data, and systems and, ultimately, its ability to resume normal operations.

    In addition, banks have become increasingly reliant on bank service providers to provide essential services. Such third parties may also experience computer-security incidents that could disrupt or degrade the provision of services to their bank customers or have other significant impact on a customer bank.

    This rule will help ensure that the OCC knows about and can respond in a timely manner to material and adverse computer-security incidents affecting banks.
    `;

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
                    IDs: [],
                    tag: "PERSON",
                    tokens: [
                        "Comptroller", "of", "the", "Currency"
                    ],
                    color: "#84d2ff"
                },
                {
                    IDs: [],
                    tag: "ORG",
                    tokens: [
                        "Office", "of", "the", "Comptroller", "of", "the", "Currency"
                    ],
                    color: "#00ffa2"
                }
            ],
            activeLabel: "ORG",
            activeTagColor: "#FFCFD2"
        }

        this.getWords = this.getWords.bind(this);
        this.handleTags = this.handleTags.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        this.updateTags();
    }

    getWords() {
        console.log(nlp(text).json());

        const words = nlp(text).json().map((w) => w.terms).flat().map((term) => {
            return {
                term,
                color: tagColor(term)
            }
        });

        console.log(words);
        return words;
    }

    handleTags() {
        const doc = nlp(text);

        const matches = this.state.labels.map((label) => {
            let phrase = label.tokens.join(" ");
            return {
                match: doc.match(phrase).json()
            }
        });
        console.log(matches);

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
        let selected = document.getSelection();
        console.log(selected);

        let startNode = selected.anchorNode;
        let endNode = selected.focusNode;

        let j = 0;

        if (((startNode.data !== " ") || (endNode.data !== " ")) && !(selected.type === "Caret")) {
            let startIndex, endIndex, range = 0;
            let savedTokens = [];
            let savedIDs = [];

            if (startNode.data === " ") {
                startIndex = parseInt(startNode.previousSibling.stateNode.id) + 1;
            } else if (endNode.data === " ") {
                endIndex = parseInt(endNode.previousSibling.id);
            } else {
                startIndex = parseInt(startNode.parentElement.id);
                endIndex = parseInt(endNode.parentElement.id);
            }

            range = endIndex - startIndex;
            console.log(startIndex + " " + endIndex + " " + range);

            if (range === 0) {
                this.state.words[startIndex].term.tags.push(this.state.activeLabel);
                savedTokens.push(this.state.words[startIndex].term.text);
            } else if (range >= 1) {
                for (j = 0; j <= range; j++) {
                    let k = startIndex + j;
                    this.state.words[k].term.tags.push(this.state.activeLabel);
                    savedTokens.push(this.state.words[k].term.text);
                    savedIDs.push(k);
                }
            }

            this.state.labels.push({
                tag: this.state.activeLabel,
                tokens: savedTokens,
                IDs: savedIDs,
                color: this.state.activeTagColor
            });

            this.updateTags();
        }
    }

    table() {
        const rows = this.state.labels.map((label) => (
            <tr key={label.tokens.join(" ")}>
                <td><Checkbox /></td>
                <td>{label.tag}</td>
                <td>{label.tokens.join(" ")}</td>
            </tr>
        ));

        return (
            <Table>
                <thead>
                    <tr>
                        <th style={{ width: 40 }}>
                            <Checkbox />
                        </th>
                        <th>Tag</th>
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
                <div className="Doc-container">
                    <div className="Text-container" onMouseUp={this.handleSelect}>
                        {this.state.generated}
                    </div>
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
                    <Button variant="gradient" gradient={{ from: 'lime', to: 'cyan', deg: 105 }}>Save and Continue</Button>
                </div>
            </div>
        );
    }
}
export default DocEditor;