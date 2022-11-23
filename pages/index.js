import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {
    AppShell,
    Button,
    Center,
    Navbar,
    Header,
    Space,
    Text,
    Title,
    MantineProvider
  } from '@mantine/core';
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

            <MantineProvider
                theme={{
                    colors: {
                        deepBlue: ['#E9EDFC', '#C1CCF6', '#99ABF0']
                    },
                    fontFamily: `'Archivo', sans-serif`,
                    headings: {
                        fontFamily: `'Archivo', sans-serif`,
                    },
                }}
            >
                <AppShell
                navbarOffsetBreakpoint="sm"
                asideOffsetBreakpoint="sm"
                navbar={
                    <Navbar p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
                    <Text>Application navbar</Text>
                    </Navbar>
                }
                header={
                    <Header height={{ base: 50, md: 70 }} p="md">
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>

                        <Title>File ReSort</Title>
                    </div>
                    </Header>
                }
                >
                    <Space h={50}/>
                    <Center><img src="No.png" width={320}/></Center>
                    <Space h={50}/>
                    <Center>
                        <Text>No files yet!</Text>
                        <Link href="/upload/doc-editor">
                        <Button variant="light" color="indigo" size="lg">
                            Get Started
                        </Button>
                        </Link>
                    </Center>
                </AppShell>
            </MantineProvider>
        </div>
    )
}
export default Home;
