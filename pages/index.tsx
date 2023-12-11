import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Index.module.css";
import { FaLock, FaStar, FaRocket, FaPlus } from "react-icons/fa";
export default function Home() {
  return (
    <>
      <div className={styles.nav_wrap}>
        <Link legacyBehavior href="/">
          <a className={styles.to_home}>HOME</a>
        </Link>
        <dl>
          <dt>My Projects</dt>
          <dd>
            <FaLock style={{ marginRight: "10px" }} />
            User/project-name
          </dd>
          <dd>
            <FaPlus style={{ marginRight: "10px" }} />
            Create New Project
          </dd>
        </dl>
        <dl>
          <dt>Applications</dt>
          <dd>
            <FaStar style={{ marginRight: "10px" }} />
            Model registry
          </dd>
          <dd>
            <FaRocket style={{ marginRight: "10px" }} />
            Launch
          </dd>
        </dl>
        <dl>
          <dt>Profile</dt>
          <dd>User</dd>
        </dl>
        <dl>
          <dt>Team</dt>
          <dd>
            <FaPlus style={{ marginRight: "10px" }} />
            Create team
          </dd>
        </dl>
      </div>
      <div className={styles.index_wrap}>
        <Link legacyBehavior href="https://kr.wandb.ai/">
          <a target="_blank">
            <img src="/images/aaa.jpg" />
          </a>
        </Link>
      </div>
    </>
  );
}
