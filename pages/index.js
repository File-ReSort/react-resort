import Head from 'next/head';
import styles from '../styles/Upload.module.css';
import { MantineProvider, Anchor, Breadcrumbs, Container, Flex, Header, Stepper } from '@mantine/core';

const items = [
    { title: 'Upload', href: '/upload/doc-editor' },
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
                    <Breadcrumbs>{items}</Breadcrumbs>
                </div>
            </MantineProvider>
        </div>
    )
}
export default Home;
