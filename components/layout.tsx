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
      <div className="app" >
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
}





// import Head from 'next/head'
// import styles from './layout.module.css';
// import { ReactNode } from 'react';

// interface LayoutProps {
//   children: ReactNode;
// }

// export default function Layout({ children }: LayoutProps) {

//   return (
//     <>
//       <Head>
//         <title>Pipeline Database</title>
//       </Head>
//       <main className={styles.main}>{children}</main>
//     </>
//   )
// }