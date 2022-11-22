import { Button, Checkbox, Container, Flex, Select } from '@mantine/core';
import React, { useState } from 'react';
import { AddLinkButton, Element, RemoveLinkButton, Text, ToggleEditableButtonButton } from '../lib/inlines';
import { deleteIDs, getSlateJSON } from '../lib/spacy-to-slate';
import { withHistory } from 'slate-history';
import { Toolbar } from '../lib/slate-components';
import { createEditor } from 'slate';
import { Editable, withReact } from 'slate-react';
import * as SlateReact from 'slate-react';
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

const withInlines = editor => {
    const { insertData, insertText, isInline } = editor

    editor.isInline = element =>
        ['link', 'button'].includes(element.type) || isInline(element)

    editor.insertText = text => {
        if (text && isUrl(text)) {
            wrapLink(editor, text)
        } else {
            insertText(text)
        }
    }

    editor.insertData = data => {
        const text = data.getData('text/plain')

        if (text && isUrl(text)) {
            wrapLink(editor, text)
        } else {
            insertData(data)
        }
    }

    return editor
}

export default function DocEditor() {
    const [data, setData] = useState(getSlateJSON(spacyOut));
    const [checked, setChecked] = useState([]);
    const [editor] = useState(() => withInlines(withHistory(withReact(createEditor()))));

    // credit: Slate
    function onKeyDown(event) {
        const { selection } = editor

        if (selection && Range.isCollapsed(selection)) {
            const { nativeEvent } = event
            if (isKeyHotkey('left', nativeEvent)) {
                event.preventDefault()
                Transforms.move(editor, { unit: 'offset', reverse: true })
                return
            }
            if (isKeyHotkey('right', nativeEvent)) {
                event.preventDefault()
                Transforms.move(editor, { unit: 'offset' })
                return
            }
        }
    }
    //end Slate

    function handleDelete() {
        const result = deleteIDs(checked, data);
        setData(result);
        setChecked([]);
    }

    return (
        <Flex justify="space-between" className={styles.editor}>
            <Container justify="center" className={styles.txtContainer}>
                <Container size="sm" className={styles.text}>
                    <SlateReact.Slate
                        editor={editor}
                        value={data}
                    >
                        <Toolbar style={{
                            paddingTop: "16px",
                            textAlign: "right"
                        }}>
                            <ToggleEditableButtonButton />
                        </Toolbar>
                        <Editable
                            renderElement={props => <Element {...props} />}
                            renderLeaf={props => <Text {...props} />}
                            placeholder="Enter some text..."
                            onKeyDown={onKeyDown}
                            style={{
                                padding: "16px",
                                lineHeight: "1.2em"
                            }}
                        />
                    </SlateReact.Slate>
                </Container>
            </Container>

            <Container size={470} className={styles.options}>
                <div className={styles.section}>
                    <h3>Entities</h3>
                    
                    <div className={styles.tags}>
                        <Checkbox.Group
                            orientation="vertical"
                            spacing={0}
                            value={checked}
                            onChange={setChecked}
                        >
                        { 
                            data.map(block => block.children.map(child => {
                                if (child.children) {
                                    const txt = child.children[0].text;
                                    const currentVal = child.value;
                            
                                    return ( <Checkbox key={currentVal} value={currentVal} label={txt} />);
                                }
                            }))
                        }
                        </Checkbox.Group>
                    </div>
                    
                    <Flex align="center" gap={6}>
                        <Button variant="subtle" px={10} onClick={handleDelete}>
                            <img src="trash3.svg" /> 
                        </Button>
                        <span>{checked.length} selected</span>
                    </Flex>
                </div>

                <div className={styles.section}>
                    <h3>Rules</h3>

                    <Flex gap={4}>
                        <Select data={[]} placeholder="Entity 1" />
                        <Select data={[]} placeholder="Relationship" />
                        <Select data={[]} placeholder="Entity 2" />
                        <Button>+</Button>
                    </Flex>
                </div>

                <div className={styles.section}>
                        <Button variant="gradient" gradient={{ from: 'lime', to: 'cyan', deg: 105 }}>Save and Continue</Button>
                </div>
            </Container>
        </Flex>
    );
}

//const tags = getSlateJSON(spacyOut);