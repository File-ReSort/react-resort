import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { Button, Placeholder } from 'semantic-ui-react';
import Navigation from '../components/Navigation'
import HomeHeader from '../components/HomeHeader'
import DocumentList from '../components/DocumentList';

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
                    <HomeHeader />

                    <div className={styles.HomeContent}>
                        <div className={styles.flex}>
                            <h2>All Files</h2>
                            <Link href="/upload/1">
                                <Button size='large' primary>+</Button>
                            </Link>
                        </div>
                        <DocumentList />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;
