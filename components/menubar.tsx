import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import DropDown from './Dropdown';
import AllocateMenu from './AllocateMenu';
import styles from './sidebar.module.css';

export default function ManuBar() {
  const { user } = useAuth() || {};

  const links = [
    { href: '/', a: 'Home' },
    { href: '/pipelines', a: 'Pipelines' },
    // { href: 'pressuretests', a: 'Pressure Tests' },
    // { href: 'pigruns', a: 'Pig Runs' },
    // { href: 'satellites', a: 'Satellites' },
    // { href: 'facilities', a: 'Facilities' },
  ]

  return (
    <nav className={styles.nav}>
      <ul>
        {user && (
          <>
            {links.map(({ href, a }) =>
              <li key={href}>
                <Link href={href}>
                  <a>{a}</a>
                </Link>
              </li>
            )}
          </>
        )}
        {(user && ['ADMIN', 'ENGINEER'].includes(user.role)) && (
          <li>
            <AllocateMenu userId={user.id} />
          </li>
        )}
        {(!user || user.role === 'ADMIN') && (
          <li>
            <Link href="/register">
              <a>Register</a>
            </Link>
          </li>
        )}
        {user && <li>
          <DropDown user={user} />
        </li>}
      </ul>
    </nav>
  )
}