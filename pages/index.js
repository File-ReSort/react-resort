import Head from 'next/head';
import styles from '../styles/Home.module.css';
import DocEditor from '../components/DocEditor';
import { MantineProvider, Anchor, Breadcrumbs, Container, Flex, Stepper } from '@mantine/core';

const items = [
    { title: 'Settings', href: '#' },
    { title: 'Link 2', href: '#' },
    { title: 'Another Link', href: '#' },
].map((item, index) => (
    <Anchor href={item.href} key={index}>
        {item.title}
    </Anchor>
));

const Home = () => {
    return (
        <div>
            <Head>
                <title>File ReSort</title>
                <link rel="icon" href="favicon.ico" />
            </Head>

            <MantineProvider>
                <div className={styles.container}>
                    <div className={styles.apptop}>
                        <Flex justify="center"><Breadcrumbs py={6}>{items}</Breadcrumbs></Flex>
                        <Flex
                            justify="center"
                            align="center"
                            direction="row"
                            wrap="wrap"
                            gap={80}
                        >
                            <Flex align="center" gap="lg" px={40}>
                                <img src="logo.png" alt="logo" width="60" height="58" />
                                <h1 className={styles.title}>File ReSort</h1>
                            </Flex>

                            <Stepper color="blue.8" styles={{
                                separator: {
                                    width: 26
                                },
                            }} active={2}
                            >
                                <Stepper.Step label="Step 1" description="Upload Documents" />
                                <Stepper.Step label="Step 2" description="Proofread and Edit" />
                                <Stepper.Step label="Step 3" description="Finalize" />
                            </Stepper>
                        </Flex>
                    </div>

                    <DocEditor />
                </div>
            </MantineProvider>
        </div>
    )
}
export default Home;
