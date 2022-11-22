import Head from 'next/head';
import styles from '../styles/Upload.module.css';
import { MantineProvider, Breadcrumbs } from '@mantine/core';
import Link from 'next/link';

const items = [
    { title: 'Upload Files', href: '/upload/doc-editor' },
    { title: 'Link 2', href: '#' },
    { title: 'Link 3', href: '#' },
].map((item, index) => (
    <Link href={item.href} key={index}>
        {item.title}
    </Link>
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
