"use client";
import { useReveal } from "../useReveal";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import HeroNetwork from '../ui/HeroNetwork';
import Header from "../ui/Header";
import ProfileImg from "@/app/images/profile-square.png";
import { availability } from "@/app/config/portfolio";

export default function HomeSection() {
  const reveal = useReveal();
  const reduced = useReducedMotion();
  const command = "GET /api/projects";
  return (
    <section id="home" className="section split hero">
      <HeroNetwork />
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
        <svg viewBox="0 43 420 201" role="img" aria-label="Example AWS architecture. Browser requests reach CloudFront, which serves assets from S3 or routes API requests through API Gateway and Lambda to MongoDB.">
          {["M116 75H158", "M262 75H304", "M210 97V153", "M158 175H116", "M64 197v12q0 10 10 10h262q20 0 20-20v-2"].map((route, index) => (
            <g key={route} fill="none">
              <path d={route} stroke="var(--strong)" strokeWidth="3" />
              <path className="bus-pulse" d={route} pathLength="100" stroke="var(--accent)" strokeWidth="2" strokeDasharray="9 91" style={{animationDelay: `${index * -.55}s`}} />
            </g>
          ))}
          {[
            [12,53,"Browser","CLIENT"], [158,53,"CloudFront","EDGE"], [304,53,"S3","ASSETS"],
            [158,153,"API Gateway","ROUTER"], [12,153,"Lambda","COMPUTE"], [304,153,"MongoDB","DATA"],
          ].map(([x,y,label,kind]) => (
            <g key={label} className="diagram-node" transform={`translate(${x} ${y})`}>
              <rect width="104" height="44" rx="6" fill="var(--surface)" stroke="var(--strong)" />
              <text x="9" y="15" fill="var(--accent)" fontSize="9" letterSpacing="1">{kind}</text>
              <text x="9" y="33" fill="var(--ink)" fontSize="13">{label}</text>
            </g>
          ))}
        </svg>
      </motion.div>
    </section>
  );
}
