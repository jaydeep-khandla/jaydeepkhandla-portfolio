"use client";
import { Link } from "react-scroll";
import { useReducedMotion } from "framer-motion";

const sections = ["Home", "Experience", "Projects", "About", "Contact"];

export default function Navbar() {
  const reduced = useReducedMotion();
  return (
    <header className="portfolio-nav">
      <a className="wordmark" href="#home">
        <span>&gt;</span> <b>jd<span>.</span>dev</b><span>_</span>
      </a>
      <nav aria-label="Portfolio sections">
        {sections.map((label) => (
          <Link
            key={label}
            href={"#" + label.toLowerCase()}
            to={label.toLowerCase()}
            spy
            smooth={!reduced}
            offset={-80}
            duration={reduced ? 0 : 650}
            activeClass="selected"
          >
            {label}
          </Link>
        ))}
      </nav>
      <Link className="talk" href="#contact" to="contact" smooth={!reduced} offset={-80} duration={reduced ? 0 : 650}>
        Let’s talk
      </Link>
    </header>
  );
}
