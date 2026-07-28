"use client";
import Link from "next/link";
import { GrTechnology } from "react-icons/gr";
import styles from "./haeder.module.css";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className={styles.navbar}>
      <div>
        <Link href="/" className={styles.logo}>
          Cloud <GrTechnology /> Hosting
        </Link>
        <div className={styles.menu}>
          {toggle ? (
            <IoMdClose onClick={() => setToggle((prev) => !prev)} />
          ) : (
            <AiOutlineMenu onClick={() => setToggle((prev) => !prev)} />
          )}
        </div>
      </div>
      <div
        className={styles.navbarLinksWrapper}
        style={{
          clipPath:
            (toggle && " polygon(0 100%, 100% 100%, 100% 0, 0 0)") || "",
        }}
      >
        <ul className={styles.navLinks}>
          <Link
            onClick={() => setToggle(false)}
            className={styles.navLink}
            href="/"
          >
            Home
          </Link>
          <Link
            onClick={() => setToggle(false)}
            className={styles.navLink}
            href="/about"
          >
            About{" "}
          </Link>

          <Link
            onClick={() => setToggle(false)}
            className={styles.navLink}
            href="/articles"
          >
            Articles{" "}
          </Link>
          <Link
            onClick={() => setToggle(false)}
            className={styles.navLink}
            href="/admin"
          >
            Admin{" "}
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
