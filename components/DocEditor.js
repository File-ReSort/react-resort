import { Button, Checkbox, Container, Flex, Table } from "@mantine/core";
import InlinesExample from '../lib/inlines';
import styles from '../styles/DocEditor.module.css';

const spacyOut = {
    "classes": [
        "PERSON",
        "ORGANIZATION"
    ],
    "annotations": [
        [
            "§1. Office of the Comptroller of the Currency\r",
            {
                "entities": [
                    [
                        4,
                        45,
                        "ORGANIZATION"
                    ]
                ]
            }
        ],
        [
            "(a) Office of the Comptroller of the Currency established\r",
            {
                "entities": [
                    [
                        4,
                        45,
                        "ORGANIZATION"
                    ]
                ]
            }
        ],
        [
            "There is established in the Department of the Treasury a bureau to be known as the \"Office of the Comptroller of the Currency\" which is charged with assuring the safety and soundness of, and compliance with laws and regulations, fair access to financial services, and fair treatment of customers by, the institutions and other persons subject to its jurisdiction.\r",
            {
                "entities": [
                    [
                        28,
                        54,
                        "ORGANIZATION"
                    ],
                    [
                        84,
                        125,
                        "ORGANIZATION"
                    ]
                ]
            }
        ],
        [
            "(b) Comptroller of the Currency\r",
            {
                "entities": [
                    [
                        4,
                        31,
                        "PERSON"
                    ]
                ]
            }
        ],
        [
            "(1) In general\r",
            {
                "entities": []
            }
        ],
        [
            "\r",
            {
                "entities": []
            }
        ],
        [
            "The chief officer of the Office of the Comptroller of the Currency shall be known as the Comptroller of the Currency. The Comptroller of the Currency shall perform the duties of the Comptroller of the Currency under the general direction of the Secretary of the Treasury. The Secretary of the Treasury may not delay or prevent the issuance of any rule or the promulgation of any regulation by the Comptroller of the Currency, and may not intervene in any matter or proceeding before the Comptroller of the Currency (including agency enforcement actions), unless otherwise specifically provided by law.",
            {
                "entities": [
                    [
                        4,
                        17,
                        "PERSON"
                    ],
                    [
                        25,
                        66,
                        "ORGANIZATION"
                    ],
                    [
                        89,
                        117,
                        "PERSON"
                    ],
                    [
                        122,
                        149,
                        "PERSON"
                    ],
                    [
                        182,
                        209,
                        "PERSON"
                    ],
                    [
                        245,
                        271,
                        "PERSON"
                    ],
                    [
                        276,
                        301,
                        "PERSON"
                    ],
                    [
                        397,
                        424,
                        "PERSON"
                    ],
                    [
                        487,
                        514,
                        "PERSON"
                    ]
                ]
            }
        ]
    ]
};

const out = spacyOut["annotations"];
const blocks = out.map(item => {
    const block = {
        type: 'paragraph',
        children: []
    };
    const text = item[0];
    const entities = item[1]["entities"];
    const len = entities.length;

    if (len == 0) {
        block.children.push({
            text: text
        });

        return block;
    }

    let start = 0;
    let end = 0;

    entities.forEach(entity => {
        start = entity[0];
        const between = text.slice(end, start);

        block.children.push({ text: between });

        end = entity[1];
        const btnText = text.slice(start, end);

        block.children.push({
            type: 'button',
            children: [{ text: btnText }]
        });
    })

    return block;
});

const DocEditor = () => {
    return (
        <div className={styles.editor}>
            <div className={styles.txtContainer}>
                <div className={styles.text}>
                    <InlinesExample initialValue={blocks} />
                </div>
            </div>
            <div className={styles.options}>
                <div className={styles.section}>
                    <h3>Rules</h3>

                </div>
                <div className={styles.section}>
                    <h3>Entities</h3>
                    <div className={styles.tags}>
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
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className={styles.section}>
                    <Button variant="gradient" gradient={{ from: 'lime', to: 'cyan', deg: 105 }}>Save and Continue</Button>
                </div>
            </div>
        </div>
    );
}
export default DocEditor;