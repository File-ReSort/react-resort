import { useRouter } from 'next/router';
import { useState } from "react";
import { Button, Container, Menu } from 'semantic-ui-react';
import styles from '../styles/AddFiles.module.css';
import UserUpload from './UserUpload.jsx';

export default function AddFiles() {
    const [selection, setSelection] = useState(0);
    const router = useRouter();

    const ExampleFile = () => {
        return (
            <Container>
                <Button primary onClick={() => router.push('/upload/2')}>Continue</Button>
            </Container>
        )
    }

    const Page = () => {
        switch (selection) {
            case 0:
                return (<ExampleFile />);
            case 1:
                return (<UserUpload />);
            case 2:
                return (<></>);
        }
    };

    function changeSelection(selected) {
        setSelection(selected);
    }

    return (
        <Container className={styles.UploadContainer}>
            <Menu pointing secondary>
                <Menu.Item name='Try a Sample File' active={selection === 0} onClick={() => setSelection(0)} />
                <Menu.Item name='Upload a File' active={selection === 1} onClick={() => setSelection(1)} disabled />
                <Menu.Item name='Enter Text' active={selection === 2} onClick={() => setSelection(2)} disabled />
            </Menu>
            <Page />
        </Container>
    );
}