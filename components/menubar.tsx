import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../pages/_app";
import DropDown from "./Dropdown";
import styles from "./sidebar.module.css";

type LinkProp = {
  href: string;
  name: string;
};

const links: LinkProp[] = [
  { href: "/pipelines", name: "Pipelines" },
  { href: "/pressuretests", name: "Pressure Tests" },
];

export default function ManuBar() {
  const { user } = useContext(UserContext);

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/">
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
        {links.map(({ href, name }) => (
          <li>
            <Link href={href}>
              <a>{name}</a>
            </Link>
          </li>
        ))}

        {user && (
          <>
            <li>
              <DropDown />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
