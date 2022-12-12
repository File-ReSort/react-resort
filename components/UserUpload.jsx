import { useEffect, useState } from "react";
import 'uikit/dist/css/uikit.min.css';
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import { Button, Container } from 'semantic-ui-react';
import styles from '../styles/AddFiles.module.css';
import Link from "next/link";
import DOMPurify from 'dompurify';
//import { useRouter } from 'next/router';

export default function UserUpload() {
    const [title, setTitle] = useState('');
    const [invalidTitle, setInvalidTitle] = useState(false);
    const [userDoc, setUserDoc] = useState(false);
    const [docText, setDocText] = useState('');

    UIkit.use(Icons);

    const Name = () => {
        let name = userDoc.name;

        if (name) {
            return name === '' ? (<label></label>) : (<label> {name} <span uk-icon="check"></span></label>);
        } else {
            return (<label></label>);
        }
    }

    function handleTitle(e) {
        setTitle(e.target.value);
    }

    function handleChange(e) {
        const file = e.target.files[0];
        setUserDoc(file);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const userTitle = title.trim();

        if ((userTitle.length < 1) || userTitle == null) {
            setInvalidTitle(true);
        } else if (docText) {
            const form = new FormData();
            formData.append('file', 'Chris');
            console.log(txt);

            fetch(`https://cr8qhi8bu6.execute-api.us-east-1.amazonaws.com/prod/processor/processDocumentAnnotations?url=`
                + process.env.N4J_URL + `&username=neo4j&password=` + process.env.N4J_PASS + `&name=` + title, {
                    method: 'POST',
                    body: form
                })
                .catch((err) => {
                    console.log(err.message);
                    return (err.message);
                });
        }
    }

    useEffect(() => {
        if (userDoc) {

            userDoc.text().then((res) => {
                setDocText(res);
            });
        }
    });

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={styles.Inner}>
                    <div className="js-upload" style={{ width: '100%', paddingBottom: '20px' }} data-uk-form-custom>
                        <label className="uk-form-label" style={{ display: 'block' }}>Upload a File</label>
                        <input id="upload" type="file" accept=".txt" onChange={handleChange} />
                        <button className="uk-button uk-button-default" type="button">Select</button>
                        <Name />
                    </div>

                    <div style={{ width: '100%' }}>
                        <label className="uk-form-label">Document Title</label>
                        <input className={'uk-input' + (invalidTitle ? 'uk-form-danger' : '')} type="text" placeholder="Give the document a title"
                            pattern="\w+\s?" value={title} onChange={handleTitle} />
                    </div>
                </div>

                <div className={styles.Continue}>
                    <Link href="/upload/1"><Button>Back</Button></Link>
                    <Button primary type="submit">Review and Edit</Button>
                </div>
            </form>
        </div>
    );
}