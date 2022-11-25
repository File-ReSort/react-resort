import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {
    AppShell,
    Button,
    Center,
    Container,
    Flex,
    Navbar,
    Header,
    Space,
    Text,
    Title,
    MantineProvider,
    Stack
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

                <Navbar p="md" width={{ sm: 200, lg: 300 }} style={{float: 'left'}}>
                    <Navbar.Section><Text>navbar</Text></Navbar.Section>
                </Navbar>
                
                <Container>
                    <Flex px={40} py={20}>
                        <Title>File ReSort</Title>
                    </Flex>
                    <Flex px={30} py={20} gap={60} align='center' justify='center'>
                        <Stack>
                            <Text>No files yet!</Text>
                            
                            <Link href="/upload/add-files">
                                <Button variant="light" color="indigo" size="lg">
                                    Get Started
                                </Button>
                            </Link>
                        </Stack>
                        <img src="No.png" width={300}/>
                    </Flex>
                </Container>
            </MantineProvider>
        </div>
    )
}
export default Home;
