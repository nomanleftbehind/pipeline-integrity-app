import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../pages/_app';
import DropDown from './Dropdown';
import styles from './sidebar.module.css';

export default function ManuBar() {
  const { user } = useContext(UserContext);

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
          <li>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>
        )}
        {user && (
          <>
            {links.map(({ href, a }) => {
              return (
                <li key={href}>
                  <Link href={href}>
                    <a>{a}</a>
                  </Link>
                </li>
              )
            })}
            <li>
              <DropDown />
            </li>
          </>
        )
        }
      </ul>
    </nav>
  )
}