import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Documents.module.css'
import { useRouter } from 'next/router';
import DocumentList from '../../components/DocumentList';
import { Button, Placeholder } from 'semantic-ui-react';
import Navigation from '../../components/Navigation';
import  HomeHeader from '../../components/HomeHeader'

export default function documents() {
    const router = useRouter();

    return (
        <div>
            <Head>
                <title>File ReSort</title>
                <link rel="icon" href="favicon.ico" />
            </Head>
            <div className={styles.container}>
                    <Navigation />
                <div className={styles.NonNav}>
                    <HomeHeader/>

                    <div className={styles.HomeContent}>
                        <DocumentList />
                    </div>

                </div>
            </div>
        </div>

    );
}