import React, { useState, useMemo, useEffect } from 'react';
import onKeyDown, { Element, Text, ToggleEditableButtonButton } from '../lib/inlines';
import { deleteIDs, getSlateJSON, updateIDs } from '../lib/spacy-to-slate';
import { withHistory } from 'slate-history';
import { Toolbar } from '../lib/slate-components';
import { createEditor } from 'slate';
import { Editable, withReact } from 'slate-react';
import * as SlateReact from 'slate-react';
import styles from '../styles/DocEditor.module.css';
import { useRouter } from 'next/router';
import { Form } from 'semantic-ui-react';

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
    const [data, setData] = useState([]);
    const [checked, setChecked] = useState([]);
    const [rules, setRules] = useState([]);
    const router = useRouter();
    const editor = useMemo(
        () => withInlines(withHistory(withReact(createEditor()))),
        []
    );
    

    useEffect(() => {
        fetch('https://cr8qhi8bu6.execute-api.us-east-1.amazonaws.com/prod/document?ID=4c01f6c4-43a8-4142-910a-a95ed1786299')
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                setData(getSlateJSON(res));
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    function handleChange(values) {
        const out = updateIDs(values);
        setData(out);
    }

    function handleDelete() {
        console.log(checked);
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
            <div className={styles.txtContainer}>
                <MyEditor />
            </div>

            <div className={styles.options}>
                <div className={styles.section}>
                    <h3>Entities</h3>

                    <div>
                        <Form.Group
                            value={checked}
                            onChange={setChecked}
                        >
                        {   
                            data.map(block => block.children.map(child => {
                                if (child.children) {
                                    const txt = child.children[0].text;
                                    const currentVal = child.value;

                                    return ( <Form.Checkbox key={currentVal} value={currentVal} label={txt} />);
                                }
                            }))
                        }
                        </Form.Group>
                    </div>
                        
                    <div style={{display: 'flex'}}>
                        <button onClick={handleDelete}>
                            <img src="../trash3.svg" height={16} width={16} />
                        </button>
                        <span>{checked.length} selected</span>
                    </div>
                </div>

                <div className={styles.section}>
                    <h3>Rules</h3>
                    
                    <Form.Group gap={4}>
                        <select data={[]} placeholder="Entity 1" />
                        <select data={[]} placeholder="Relationship" />
                        <select data={[]} placeholder="Entity 2" />
                        <button>+</button>
                    </Form.Group>
                    {   
                        data.map(block => block.children.map(child => {
                        }))
                    }
                </div>

                <div className={styles.section}>
                    <button onClick={handleSave}>
                        Save and Continue
                    </button>
                </div>
            </div>
        </div>
    );
}