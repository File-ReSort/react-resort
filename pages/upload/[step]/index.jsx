import Head from 'next/head';
import { MantineProvider, Anchor, Breadcrumbs, Container, Flex, Header, Stepper } from '@mantine/core';
import styles from '../../../styles/Upload.module.css';
import { useRouter } from 'next/router';
import AddFiles from '../../../components/AddFiles';
import DocEditor from '../../../components/DocEditor';

export default function Upload() {
    const router = useRouter();
    const page = router.query.step;
    const Page = () => {
        switch(page) {
            case '2':
                return (<DocEditor />);
            case '1':
                return (<AddFiles />);
            case '3':
                return (<></>);
        }
    };

    return (
        <div>
            <Head>
                <title>File ReSort</title>
                <link rel="icon" href="../favicon.ico" />
            </Head>

            <MantineProvider>
                <div className={styles.container}>
                    <Header className={styles.apptop}>
                        <Flex
                            justify="center"
                            align="center"
                            gap={40}
                        >
                            <Flex align="center" gap="lg" px={40}>
                                <img src="../logo.png" alt="logo" width="50" height="48" />
                                <h1 className={styles.title}>File ReSort</h1>
                            </Flex>

                            <Stepper color="indigo.6" radius="sm" size="md" styles={{
                                separator: {
                                    width: 26
                                },
                            }} active={page-1}
                            >
                                <Stepper.Step label="Step 1" description="Upload Documents" />
                                <Stepper.Step label="Step 2" description="Edit Tags" />
                                <Stepper.Step label="Step 3" description="Finalize" />
                            </Stepper>
                        </Flex>
                    </Header>
                
                    <Page />
                </div>
            </MantineProvider>
        </div>

    );
}