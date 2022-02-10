import Link from 'next/link';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DropDown from './Dropdown';
import styles from './sidebar.module.css';

export default function ManuBar() {
  const { user } = useAuth() || {};

  useEffect(() => {
    console.log('menubar user:', user);

  }, [user]);

  const links = [
    { href: 'pipelines', a: 'Pipelines' },
    { href: 'pressuretests', a: 'Pressure Tests' },
    { href: 'pigruns', a: 'Pig Runs' },
    { href: 'webassembly', a: 'WebAssembly' },
    { href: 'satellites', a: 'Satellites' },
    { href: 'facilities', a: 'Facilities' },
  ]

  return (
    <nav className={styles.nav}>
      <ul>
        <li><Link href="/">
          <a>Home</a>
        </Link>
        </li>
        {!user && (
          <>
            <li>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
            <li>
              <Link href="/signup">
                <a>Signup</a>
              </Link>
            </li>
          </>
        )}
        {user && (
          <>
            {links.map(({ href, a }) =>
              <li key={href}>
                <Link href={href}>
                  <a>{a}</a>
                </Link>
              </li>
            )}
            <li>
              <DropDown user={user} />
            </li>
          </>
        )
        }
      </ul>
    </nav>
  )
}