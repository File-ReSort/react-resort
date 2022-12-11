import { useState } from "react";
import 'uikit/dist/css/uikit.min.css';
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import { Container } from 'semantic-ui-react';
//import Link from "next/link";

export default function UserUpload() {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');

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
        <Container>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="js-upload" data-uk-form-custom>
                        <label className="uk-form-label" style={{ display: 'block' }}>Upload a File</label>
                        <input id="upload" type="file" accept=".txt" onChange={handleChange} />
                        <button className="uk-button uk-button-default" type="button">Select</button>
                        <Name />
                    </div>

                    <div>
                        <label className="uk-form-label">Document Title</label>
                        <input className="uk-input" placeholder="Give the document a title" value={title} onChange={handleTitle} />
                    </div>
                </div>

                <div>
                    <button type="submit" className="uk-button uk-button-primary">Continue</button>
                </div>
            </form>
        </Container>
    );
}