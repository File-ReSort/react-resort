import { useState } from "react";
import 'uikit/dist/css/uikit.min.css';
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import { Button, Container } from 'semantic-ui-react';
import styles from '../styles/AddFiles.module.css';
import Link from "next/link";
//import { useRouter } from 'next/router';

export default function UserUpload() {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    //const router = useRouter();
    UIkit.use(Icons);
    
    const Name = () => {
        return name === '' ? (<label></label>) : (<label> {name} <span uk-icon="check"></span></label>);
    }

    function handleTitle(e) {
        console.log(e.target.value);
        setTitle(e.target.value);
    }

    function handleChange(e) {
        const file = e.target.files[0];
        setName(file.name);
    }

    function handleRadio(e) {
        const checked = e.target.checked;

        if (checked) {
            setExample('block');
        } else {
            setExample('block');
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(e.target.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={styles.Inner}>
                    <div className="js-upload" style={{width: '100%', paddingBottom: '20px'}} data-uk-form-custom>
                        <label className="uk-form-label" style={{ display: 'block' }}>Upload a File</label>
                        <input id="upload" type="file" accept=".txt" onChange={handleChange} />
                        <button className="uk-button uk-button-default" type="button">Select</button>
                        <Name />
                    </div>

                    <div style={{width: '100%'}}>
                        <label className="uk-form-label">Document Title</label>
                        <input className="uk-input" placeholder="Give the document a title" value={title} onChange={handleTitle} />
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