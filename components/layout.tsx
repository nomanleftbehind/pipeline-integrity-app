import Head from 'next/head';
import MenuBar from './menubar';
import { ReactNode } from 'react';
import styles from './layout.module.css';

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <MenuBar />
      <div className="app" style={{ paddingTop: '55px' }} >
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
}