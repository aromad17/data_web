import styles from "@/styles/Header.module.css";
import Link from "next/link";
import { FaSearch, FaBell, FaQuestion, FaUser } from "react-icons/fa";

export default function Header() {
  return (
    <header className={styles.header_wrap}>
      <Link legacyBehavior href="/">
        <a>
          <h1 className={styles.logo}>
            <span className={styles.rect1}></span>
            <span className={styles.rect2}></span>
            <span className={styles.rect3}></span>
          </h1>
        </a>
      </Link>
      <ul className={styles.header_menu}>
        <li>
          <button className={styles.team_button}>Create Team</button>
        </li>
        <li>
          <Link legacyBehavior href="#">
            <a>
              <FaSearch />
            </a>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="#">
            <a>
              <FaBell />
            </a>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="#">
            <a>
              <FaQuestion />
            </a>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="#">
            <a>
              <FaUser />
            </a>
          </Link>
          {/* 추후 변경 */}
        </li>
      </ul>
    </header>
  );
}
