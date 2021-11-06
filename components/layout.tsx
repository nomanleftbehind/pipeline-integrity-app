
import Head from 'next/head'
import styles from './layout.module.css';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {

  return (
    <>
      <Head>
        <title>Pipeline Database</title>
      </Head>
      <main className={styles.main}>{children}</main>
    </>
  )
}