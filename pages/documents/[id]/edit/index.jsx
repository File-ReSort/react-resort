import Head from 'next/head';
import Link from 'next/link';
import styles from '../../../../styles/Documents.module.css'
import { useRouter } from 'next/router';
import DocEditor from '../../../../components/DocEditor';
import Navigation from '../../../../components/Navigation';
import  HomeHeader from '../../../../components/HomeHeader'

export default function documents() {
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
                        <DocEditor />
                    </div>

                </div>
            </div>
        </div>

    );
}