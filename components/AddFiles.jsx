import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Container, Menu } from 'semantic-ui-react';
import styles from '../styles/AddFiles.module.css';
import UserUpload from './UserUpload';

export default function AddFiles() {
    const [selection, setSelection] = useState(0);
    const [navigate, doNavigation] = useState(0);

    const router2 = useRouter();

    function handleClick() {
        if (selection === 1) {
            doNavigation(1);
        } else {
            router2.push('/upload/2');
        }
    }

    const Stage = () => {
        if (navigate === 0) {
            return (
                <div>
                    <div className={styles.Inner}>
                        <h3 className={styles.Title}>What would you like to do?</h3>

                        <Menu secondary>
                            <Menu.Item name='Try a Sample File' active={selection === 0} onClick={() => setSelection(0)} />
                            <Menu.Item name='Upload a File' active={selection === 1} onClick={() => setSelection(1)} disabled />
                        </Menu>
                    </div>
                    <div className={styles.Continue}>
                        <div></div>
                        <Button primary onClick={() => handleClick()}>Next</Button>
                    </div>
                </div>
            )
        } else {
            return (
                <>
                    <UserUpload />
                </>
            )
        }
    }

    return (
        <div className={styles.UploadContainer}>
            <Stage />
        </div>
    );
}