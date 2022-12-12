import React, { useState, useMemo, useEffect } from 'react';
import onKeyDown, { Element, Text, ToggleEditableButtonButton } from '../lib/inlines';
import { initCheck, deleteIDs, getSlateJSON, updateIDs, Checkboxes } from '../lib/spacy-to-slate';
import { withHistory } from 'slate-history';
import { Toolbar } from '../lib/slate-components';
import { createEditor } from 'slate';
import { Editable, withReact } from 'slate-react';
import * as SlateReact from 'slate-react';
import styles from '../styles/DocEditor.module.css';
import { useRouter } from 'next/router';
import { Button, Checkbox, Dropdown, Form, Select } from 'semantic-ui-react';

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

const spacyTest = {
    "Meta": {
        "BucketFileLocation": "https://file-resort-storage.s3.amazonaws.com/4c01f6c4-43a8-4142-910a-a95ed1786299-example.txt",
        "UploadDate": "Tue Nov 29 18:37:07 2022",
        "LastEditDate": "Tue Nov 29 18:37:07 2022",
        "FileName": "example.txt",
        "ID": "4c01f6c4-43a8-4142-910a-a95ed1786299",
        "Name": "SPACY TEST FILE"
    },
    "body": [
        [
            "SPACY TEST FILE §1. Office of the Comptroller of the Currency\n(a) Office of the Comptroller of the Currency established\n\nThere is established in the Department of the Treasury a bureau to be known as the \"Office of the Comptroller of the Currency\" which is charged with assuring the safety and soundness of, and compliance with laws and regulations, fair access to financial services, and fair treatment of customers by, the institutions and other persons subject to its jurisdiction.\n(b) Comptroller of the Currency\n(1) In general\n\nThe chief officer of the Office of the Comptroller of the Currency shall be known as the Comptroller of the Currency. The Comptroller of the Currency shall perform the duties of the Comptroller of the Currency under the general direction of the Secretary of the Treasury. The Secretary of the Treasury may not delay or prevent the issuance of any rule or the promulgation of any regulation by the Comptroller of the Currency, and may not intervene in any matter or proceeding before the Comptroller of the Currency (including agency enforcement actions), unless otherwise specifically provided by law.\n\nThe Comptroller of the Currency is advised by the Secretary of the Treasury federal commerce",
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

export default function DocEditor() {
    const [data, setData] = useState(getSlateJSON(spacyTest));
    const [checked, setChecked] = useState(initCheck(data));
    const [rules, setRules] = useState([]);
    const router = useRouter();
    const id = router.query.id;
    
    const editor = useMemo(
        () => withInlines(withHistory(withReact(createEditor()))),
        []
    );
    
    useEffect(() => {
        fetch('https://cr8qhi8bu6.execute-api.us-east-1.amazonaws.com/prod/document?ID=' + id)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                setData(getSlateJSON(res));
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    

    function handleChange(event) {
        const ID = event.target.id;
        const newChecked = checked;
        const index = newChecked.findIndex((box) => box.value == ID);
        newChecked[index].checked = !(newChecked[index].checked);

        setChecked(newChecked);
    }

    function handleDelete() {
        const IDs = [];

        checked.forEach(box => {
            if (box.checked == true) {
                IDs.push(box.value);
            }
        })

        setData(deleteIDs(IDs, data));
    }

    function handleSave() {
        const out = data[0].children;
        const tags = [];

        out.forEach((obj) => {
            if (obj.type == "button") {
                tags.push({
                    tag: obj.tag,
                    value: obj.value,
                    text: obj.children[0].text
                })
            }
        });

        const tagStorage = JSON.stringify(tags);
        window.localStorage.setItem('tagStorage', tagStorage);
        router.push('/upload/3')
    }

    const Checkboxes = () => {
        const boxes = initCheck(data);
        return boxes.map((box) => (
            <div><Checkbox id={box.value} key={box.value} label={box.text} onChange={handleChange} /></div>
        ))
    }

    const MyEditor = () => {
        return (
            <SlateReact.Slate editor={editor} value={data} onChange={setData}>
                <Toolbar style={{
                    paddingTop: "10px",
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
            <div className={styles.txtContainer}>
                <MyEditor />
            </div>

            <div className={styles.options}>
                <div className={styles.section}>
                    <h3>Entities</h3>

                    <div className={styles.tagList}>
                        <Checkboxes />
                    </div>

                    <div style={{ display: 'flex' }}>
                        <Button size='mini' onClick={handleDelete}>
                            <img src="../trash3.svg" height={16} width={16} />
                        </Button>
                    </div>
                </div>

                <div className={styles.section}>
                    <h3>Rules</h3>

                    <Form size='small'>
                        <Form.Group inline>
                            <Form.Field><Dropdown data={[]} placeholder="Entity 1" /></Form.Field>
                            <Form.Field><Dropdown data={[]} placeholder="Relationship" /></Form.Field>
                            <Form.Field><Dropdown data={[]} placeholder="Entity 2" /></Form.Field>
                            <Form.Field><Button size='small'>+</Button></Form.Field>
                        </Form.Group>
                    </Form>
                </div>

                <div className={styles.section}>
                    <Button onClick={handleSave}>
                        Save and Update
                    </Button>
                </div>
            </div>
        </div>
    );
}