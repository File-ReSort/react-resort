import Head from 'next/head';
import styles from '../../styles/Documents.module.css'
import RulesList from '../../components/RulesList';
import Navigation from '../../components/Navigation';
import  HomeHeader from '../../components/HomeHeader'

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
                    <HomeHeader />

                    <div className={styles.HomeContent}>
                        <RulesList />
                    </div>

                </div>
            </div>
        </div>

    );
}