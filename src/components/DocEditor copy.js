import React, { useState } from "react";
import { Button, Checkbox, Flex, Table } from "@mantine/core";
import nlp from 'compromise';
import './styles/DocEditor.css';

const sampleText =
    `
    Computer-Security Incident Notification: Final Rule

    Summary
    On November 23, 2021, the Office of the Comptroller of the Currency (OCC), Board of Governors of the Federal Reserve System, and the Federal Deposit Insurance Corporation published a final rule to establish computer-security incident notification requirements for banking organizations and their bank service providers.
    
    Highlights
    The rule requires a bank to notify the OCC as soon as possible and no later than 36 hours after the bank determines that a computer-security incident that rises to the level of a notification incident has occurred. The bank must provide this notification to the appropriate OCC supervisory office, or OCC-designated point of contact, through email, telephone, or other similar methods that the OCC may prescribe.
        The rule defines computer-security incident as an occurrence that results in actual harm to the confidentiality, integrity, or availability of an information system or the information that the system processes, stores, or transmits.
        A notification incident generally would include a significant computer-security incident that disrupts or degrades, or is reasonably likely to disrupt or degrade, the viability of the banking organization’s operations, result in customers being unable to access their deposit and other accounts, or impact the stability of the financial sector. This may include a major computer-system failure; cyber-related interruption, such as a distributed denial of service or ransomware attack; or another type of significant operational interruption.
    
    The rule also requires a bank service provider to notify at least one bank-designated point of contact at each affected customer bank as soon as possible when it determines it has experienced a computer-security incident that has materially disrupted or degraded, or is reasonably likely to disrupt or degrade, covered services provided to the bank for four or more hours. If the bank has not previously provided a designated point of contact, the notification must be made to the bank's chief executive officer and chief information officer or to two individuals of comparable responsibilities.
    
    Background
    Computer-security incidents can result from destructive malware or malicious software (cyberattacks), as well as nonmalicious failure of hardware and software, personnel errors, and other causes. Cyberattacks targeting the financial services industry have increased in frequency and severity in recent years. These cyberattacks can adversely affect a bank's networks, data, and systems and, ultimately, its ability to resume normal operations.

    In addition, banks have become increasingly reliant on bank service providers to provide essential services. Such third parties may also experience computer-security incidents that could disrupt or degrade the provision of services to their bank customers or have other significant impact on a customer bank.

    This rule will help ensure that the OCC knows about and can respond in a timely manner to material and adverse computer-security incidents affecting banks.
    `;

const tagColor = (term) => {
    const { tags } = term
    if (tags.includes("Organization")) return "#c5f6fa"
    if (tags.includes("Person")) return "#e5dbff"
    if (tags.includes("Actor")) return "#ffe8cc"
    return "#fff"
}

const labels = {
        'occ': 'Organization',
        'Comptroller of the Currency': 'Organization',
        'bank': 'Actor'
}


const Rows = ({text}) => {
    let matches = [
        {
            Title: 'Organization',
            Tags: nlp(text, labels).match('#Organization+').out('array')
        },
        {
            Title: 'Actor',
            Tags: nlp(text, labels).match('#Actor+').out('array')
        },
    ];

    return matches.map((label) => {
        return label.Tags.map((tag) => (
                <tr>
                    <td><Checkbox /></td>
                    <td>{label.Title}</td>
                    <td>{tag}</td>
                </tr>
        ));
    });
}

const Highlight2 = ({ text }) => {

    let matches = nlp(text, labels).json()
        .map((w) => w.terms)
        .flat()
        .map((term) => {
            return {
                term,
                color: tagColor(term)
            }
    });

    return matches.map(({ term, color }, i) => {
        const { pre, post, text } = term;

        console.log(i + " " + text + " " + color);
        return (
            <span key={i}>
                {pre}
                <mark id={i} style={{backgroundColor: color}}>
                    {text}
                </mark>
                {post}
            </span>
        )
    })
}

const DocEditor = () => {
    const [text] = useState(sampleText);

    return (
        <Flex>
            <div className="Doc-container">
                <div className="Text-container">
                    <Highlight2 text={text} />
                </div>
            </div>
            <div className="Doc-options">
                <div>
                    <h3>Rules</h3>
                    
                </div>
                <div>
                    <h3>Entities</h3>
                    <div className="Tags-container">
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
                            <tbody>
                                <Rows text = {text}/>
                            </tbody>
                        </Table>
                    </div>
                </div>
                <Button variant="gradient" gradient={{ from: 'lime', to: 'cyan', deg: 105 }}>Save and Continue</Button>
            </div>
        </Flex>
    );
}

export default DocEditor;