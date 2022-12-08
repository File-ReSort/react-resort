import Head from 'next/head';
import styles from '../../../styles/Upload.module.css'
import { useRouter } from 'next/router';
import AddFiles from '../../../components/AddFiles';
import DocEditor from '../../../components/DocEditor';
import Finalize from '../../../components/Finalize';
import { Step } from 'semantic-ui-react';

export default function Upload() {
    const router = useRouter();
    const page = router.query.step;
    //const [data, setData] = useState();

    const Page = () => {
        switch (page) {
            case '1':
                return (<AddFiles />);
            case '2':
                return (<DocEditor />);
            case '3':
                return (<Finalize />);
        }
    };

    return (
        <div>
            <Head>
                <title>File ReSort</title>
                <link rel="icon" href="../favicon.ico" />
            </Head>
            <div className={styles.container}>
                <div className={styles.AppTop}>
                    <img src="../logo.png" alt="logo" width="58" height="54" />
                    <h1 id={styles.header}>File ReSort</h1>

                    <div>
                        <Step.Group ordered>
                            <Step active={page === '1'}>
                            <Step.Content>
                                <Step.Title>Upload Files</Step.Title>
                            </Step.Content>
                            </Step>

                            <Step active={page === '2'}>
                            <Step.Content>
                                <Step.Title>Review and Edit</Step.Title>
                            </Step.Content>
                            </Step>

                            <Step active={page === '3'}>
                            <Step.Content>
                                <Step.Title>Finalize</Step.Title>
                            </Step.Content>
                            </Step>
                        </Step.Group>
                    </div>
                </div>

                <div>
                    <Page />
                </div>
            </div>
        </div>

    );
}