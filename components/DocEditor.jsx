import { ActionIcon, Button, Checkbox, Container, Flex, ScrollArea, Select, Space } from '@mantine/core';
import React, { useState, useMemo } from 'react';
import onKeyDown, { Element, Text, ToggleEditableButtonButton } from '../lib/inlines';
import { deleteIDs, getSlateJSON, updateIDs } from '../lib/spacy-to-slate';
import { withHistory } from 'slate-history';
import { Toolbar } from '../lib/slate-components';
import { createEditor } from 'slate';
import { Editable, withReact } from 'slate-react';
import * as SlateReact from 'slate-react';
import styles from '../styles/DocEditor.module.css';
import { useRouter } from 'next/router';

const spacyOut = {
    "Meta": {
        "BucketFileLocation": "https://file-resort-storage.s3.amazonaws.com/4c01f6c4-43a8-4142-910a-a95ed1786299-example.txt",
        "UploadDate": "Tue Nov 29 18:37:07 2022",
        "LastEditDate": "Tue Nov 29 18:37:07 2022",
        "FileName": "example.txt",
        "ID": "4c01f6c4-43a8-4142-910a-a95ed1786299",
        "Name": "example.txt"
    },
    "body": [
        [
            "Â§1. Office of the Comptroller of the Currency\n(a) Office of the Comptroller of the Currency established\n\nThere is established in the Department of the Treasury a bureau to be known as the \"Office of the Comptroller of the Currency\" which is charged with assuring the safety and soundness of, and compliance with laws and regulations, fair access to financial services, and fair treatment of customers by, the institutions and other persons subject to its jurisdiction.\n(b) Comptroller of the Currency\n(1) In general\n\nThe chief officer of the Office of the Comptroller of the Currency shall be known as the Comptroller of the Currency. The Comptroller of the Currency shall perform the duties of the Comptroller of the Currency under the general direction of the Secretary of the Treasury. The Secretary of the Treasury may not delay or prevent the issuance of any rule or the promulgation of any regulation by the Comptroller of the Currency, and may not intervene in any matter or proceeding before the Comptroller of the Currency (including agency enforcement actions), unless otherwise specifically provided by law.\n\nThe Comptroller of the Currency is advised by the Secretary of the Treasury federal commerce",
            {
                "entities": [
                    [
                        5,
                        46,
                        "LEGAL_ORGANIZATION"
                    ],
                    [
                        51,
                        92,
                        "LEGAL_ORGANIZATION"
                    ],
                    [
                        134,
                        160,
                        "LEGAL_ORGANIZATION"
                    ],
                    [
                        190,
                        231,
                        "LEGAL_ORGANIZATION"
                    ],
                    [
                        474,
                        501,
                        "PERSON"
                    ],
                    [
                        543,
                        584,
                        "LEGAL_ORGANIZATION"
                    ],
                    [
                        607,
                        634,
                        "PERSON"
                    ],
                    [
                        640,
                        667,
                        "PERSON"
                    ],
                    [
                        700,
                        727,
                        "PERSON"
                    ],
                    [
                        763,
                        788,
                        "PERSON"
                    ],
                    [
                        794,
                        819,
                        "PERSON"
                    ],
                    [
                        915,
                        942,
                        "PERSON"
                    ],
                    [
                        1005,
                        1032,
                        "PERSON"
                    ],
                    [
                        1125,
                        1152,
                        "PERSON"
                    ],
                    [
                        1171,
                        1196,
                        "PERSON"
                    ],
                    [
                        1197,
                        1204,
                        "LEGAL_ORGANIZATION"
                    ],
                    [
                        1205,
                        1213,
                        "CONCEPT"
                    ]
                ]
            }
        ]
    ]
}

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
    const [rules, setRules] = useState([]);
    const editor = useMemo(
        () => withInlines(withHistory(withReact(createEditor()))),
        []
    );
    const router = useRouter();

    function handleChange(values) {
        const out = updateIDs(values);
        setData(out);
    }

    function handleDelete() {
        const out = deleteIDs(checked, data);
        setChecked([]);
        setData(out);
    }

    function handleSave() {
        const jsonDoc = JSON.stringify(data);
        console.log(jsonDoc);
        window.localStorage.setItem('jsonDoc', jsonDoc);
        router.push('/upload/3')
    }

    const MyEditor = () => {
        return (
            <SlateReact.Slate editor={editor} value={data} onChange={setData}>
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
                    onKeyDown={event => onKeyDown(event, editor)}
                    style={{
                        padding: "16px",
                        lineHeight: "1.2em"
                    }}
                />
            </SlateReact.Slate>
        )
    }

    return (
        <div className={styles.editor}>
            <Container className={styles.txtContainer}>
                <MyEditor />
            </Container>

            <Container className={styles.options}>
                <div className={styles.section}>
                    <h3>Entities</h3>

                    <ScrollArea.Autosize maxHeight={400} type="always" offsetScrollbars scrollbarSize={14}>
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
                    </ScrollArea.Autosize>
                        
                    <Flex align="center" py={10} gap={6}>
                        <ActionIcon color="dark" variant="light" onClick={handleDelete}>
                            <img src="../trash3.svg" height={16} width={16} />
                        </ActionIcon>
                        <span>{checked.length} selected</span>
                    </Flex>
                </div>

                <div className={styles.section}>
                    <h3>Rules</h3>
                    
                    <Flex gap={4}>
                        <Select data={[]} placeholder="Entity 1" />
                        <Select data={[]} placeholder="Relationship" />
                        <Select data={[]} placeholder="Entity 2" />
                        <Button color="indigo.6">+</Button>
                    </Flex>
                    {   
                        data.map(block => block.children.map(child => {
                        }))
                    }
                </div>
                <Space h={30} />
                <div className={styles.section}>
                    <Button onClick={handleSave} variant="gradient" gradient={{ from: 'lime', to: 'cyan', deg: 105 }}>
                        Save and Continue
                    </Button>
                </div>
            </Container>
        </div>
    );
}