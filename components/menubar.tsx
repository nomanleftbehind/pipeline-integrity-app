import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../pages/_app';
import styles from './sidebar.module.css';

export default function ManuBar() {

  const { user } = useContext(UserContext);

  console.log("Menubar context: ", user);

  return (
    <nav className={styles.nav}>
      <ul>
        <li><Link href="/">
          <a>Home</a>
        </Link>
        </li>
        {user && (
          <li>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>
        )}
        {user && (
          <>
            <li>
              <Link href="/pipelines">
                <a>Pipelines</a>
              </Link>
            </li>
            <li>
              <Link href="/satellites">
                <a>Satellites</a>
              </Link>
            </li>
            <li>
              <Link href="/facilities">
                <a>Facilities</a>
              </Link>
            </li>
          </>
        )
        }
      </ul>
    </nav>
  )
}