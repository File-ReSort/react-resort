import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { Button, Placeholder } from 'semantic-ui-react';
import  Navigation from '../components/Navigation'

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
            <div className={styles.container}>
                
                <Navigation />

                <div className={styles.NonNav}>
                    <div className={styles.HomeHeader}>
                        <h1>File ReSort</h1>
                    </div>

                    <div className={styles.HomeContent}>
                        <div>No files yet!</div>

                        <Link href="/upload/1">
                            <Button primary>
                                Get Started
                            </Button>
                        </Link>
                        <Link href="/documents">
                            <Button primary>
                                View files
                            </Button>
                        </Link>
                    </div>

                    <div className={styles.HomeContent}><img src="No.png" width={300} /></div>
                </div>
            </div>
        </div>
    )
}
export default Home;
