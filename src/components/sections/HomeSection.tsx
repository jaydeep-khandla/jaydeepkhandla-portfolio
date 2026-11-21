"use client";
import { useReveal } from "../useReveal";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Header from "../ui/Header";
import ProfileImg from "@/app/images/profile-square.png";
import { availability } from "@/app/config/portfolio";

export default function HomeSection() {
  const reveal = useReveal();
  const reduced = useReducedMotion();
  const command = "GET /api/projects";
  return (
    <section id="home" className="section split hero">
      <div>
        <motion.p {...reveal("rise")} className="availability">
          {availability}
        </motion.p>
        <motion.h1 {...reveal("heading", 0.13)}>
          Jaydeep
          <br />
          <em>Khandla</em>
        </motion.h1>
        <motion.p {...reveal("rise", 0.26)} className="role">
          Full Stack Developer
        </motion.p>
        <motion.div {...reveal("rise", 0.39)} className="hero-actions">
          <a className="action primary" href="#projects">
            View my work →
          </a>
          <a className="action" href="#contact">
            Contact me
          </a>
        </motion.div>
        <div className="identity">
          <Image src={ProfileImg} alt="Jaydeep Khandla" width={48} height={48} />
          <Header />
        </div>
      </div>
      <motion.div {...reveal("card", 0.52)} className="terminal">
        <div className="terminal-bar" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="command">
          <span aria-hidden="true">$ </span>
          <motion.code
            initial={reduced ? false : { width: "0ch" }}
            viewport={{ once: true }}
            whileInView={reduced ? undefined : { width: `${command.length}ch` }}
            transition={{
              duration: reduced ? 0 : 0.8,
              ease: (t: number) => Math.floor(t * 24) / 24,
            }}
          >
            {command}
          </motion.code>
          <motion.b
            aria-hidden="true"
            initial={false}
            viewport={{ once: true }}
            whileInView={reduced ? undefined : { opacity: [1, 0.15, 1] }}
            transition={{ duration: reduced ? 0 : 0.8, repeat: reduced ? 0 : 7 }}
          />
        </div>
        <svg
          viewBox="0 0 440 135"
          role="img"
          aria-label="Request flow from client through API to MongoDB"
        >
          <defs><pattern id="terminal-grid" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".7" fill="var(--muted)" opacity=".32" /></pattern></defs>
          <rect width="440" height="135" fill="url(#terminal-grid)" />
          {[126, 273].map((x) => (
            <motion.path
              key={x}
              d={`M${x} 68h33l-5 -4m5 4l-5 4`}
              fill="none"
              stroke="var(--accent)"
              initial={reduced ? false : { pathLength: 0 }}
              viewport={{ once: true }}
              whileInView={reduced ? undefined : { pathLength: 1 }}
              transition={{ delay: 0.8, duration: 0.45 }}
            />
          ))}
          {[126, 273].map((x, i) => <circle key={x} className="request-packet" cx={x} cy="68" r="2" fill="var(--accent)" style={{ animationDelay: `${i * 1.2}s` }} />)}
          {["client", "API", "MongoDB"].map((label, i) => (
            <motion.g
              className="diagram-node" key={label}
              initial={reduced ? false : { scale: .85 }}
              viewport={{ once: true }}
              whileInView={reduced ? undefined : { scale: 1 }}
              transition={{ delay: 0.45 + i * 0.06, duration: 0.25 }}
            >
              <rect
                x={17 + i * 146}
                y="34"
                width="102"
                height="66"
                rx="8"
                fill={i === 1 ? "var(--accent-tint)" : "var(--surface)"}
                stroke={i === 1 ? "var(--accent)" : "var(--strong)"}
              />
              <g transform={`translate(${59 + i * 146} 44)`} fill="none" stroke="var(--accent)" strokeWidth="1.3">
                <path d={["M0 1h18v12H0z M0 5h18 M5 16h8", "M5 2L0 8l5 6 M13 2l5 6-5 6 M11 1L7 15", "M0 4c0-5 18-5 18 0s-18 5-18 0v9c0 5 18 5 18 0V4 M0 9c0 5 18 5 18 0"][i]} />
              </g>
              <text x={68 + i * 146} y="85" fill="currentColor" textAnchor="middle">
                {label}
              </text>
            </motion.g>
          ))}
        </svg>
      </motion.div>
    </section>
  );
}
