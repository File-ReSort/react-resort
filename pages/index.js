import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { Button, Placeholder } from 'semantic-ui-react';
import  Navigation from '../components/Navigation'
import  HomeHeader from '../components/HomeHeader'

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

                        <Link href="/upload/1">
                            <Button size='huge' primary>
                                Upload A file
                            </Button>
                        </Link>
                        <Link href="/documents">
                            <Button size='huge' primary>
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
