import Link from 'next/link';
import styles from './sidebar.module.css';

export default function ManuBar() {
  return (
    <nav className={styles.nav}>
      <input className={styles.input} placeholder="Search..." />
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/pipelines">
        <a>Pipelines</a>
      </Link>
      <Link href="/satellites">
        <a>Satellites</a>
      </Link>
      <Link href="/facilities">
        <a>Facilities</a>
      </Link>
    </nav>
  )
}