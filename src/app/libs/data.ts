import JdxImg from "@/app/images/jdx-ss.png";
import ZeptImg from "@/app/images/zept-ss.png";
import KrushiaadharImg from "@/app/images/krushiaadhar-ss.png";
import BrainhuntImg from "@/app/images/brainhunt-ss.png";
import PropathshalaImg from "@/app/images/pathshala-ss.png";

const GITHUB_URL: string = "https://github.com/jaydeep-khandla/";

const LINKEDIN_URL: string = "https://www.linkedin.com/in/jaydeep-khandla";

const RESUME_URL: string =
  "https://drive.google.com/file/d/1Bpxuo90eMNHcN2abSlXAykv3pNruJrr5/view?usp=sharing";

const INSTAGRAM_URL: string =
  "https://www.instagram.com/the_a.r.t_company?igsh=MWRmem80ZHhvcTdxNg==";

//? Projects Data
const projects = [
  {
    title: "JDX-Online-Collaborative-Compiler",
    description:
      "JDX Online Compiler is a collaborative coding platform aimed at providing an immersive coding experience.",
    urlTitle: "🔗Github/JDX-Online-Compiler",
    href: "https://github.com/jaydeep-khandla/JDX-Online-Compiler",
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "Socket.io",
      "Monaco Code Editor",
    ],
    srcImg: JdxImg,
  },
  {
    title: "ZEPT-Video-Conferencing-WebApp",
    description:
      "ZEPT is facilitates seamless video and audio communication, in-meeting chat, and file sharing among users.",
    urlTitle: "🔗Github/Video-Conferencing-WebApp",
    href: "https://github.com/jaydeep-khandla/Video-Conferencing-WebApp",
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "Socket.io",
      "mediasoup",
      "MongoDB",
    ],
    srcImg: ZeptImg,
  },
  {
    title: "KrushiAadhar-SSIP-Heckathon-2022",
    description:
      "KrushiAadhar is a Digital Identity System for farmers, aimed at providing a unique identity to each farmer.",
    urlTitle: "🔗Github/KrushiAadhar",
    href: "https://github.com/jaydeep-khandla/KrushiAadhar-UISF",
    tech: ["html5", "css3", "javascript", "php", "java", "Android"],
    srcImg: KrushiaadharImg,
  },
  {
    title: "Brainhunt-Coding-Plateform-Xenesis-2023",
    description:
      "BrainHunt is a coding competition platform that I had developed for our event at college's Tech-Fest.",
    urlTitle: "🔗Github/x-brain-hunt",
    href: "https://github.com/jaydeep-khandla/x-brain-hunt",
    tech: ["html5", "css3", "javascript", "Github Pages"],
    srcImg: BrainhuntImg,
  },
  {
    title: "Porjects-Pathshala-Miniprojects-of-Python",
    description:
      "Developing a Hub for small tech projects to support learning and skills with an organized Repository.",
    urlTitle: "🔗Github/Projects-Pathshala",
    href: "https://github.com/jaydeep-khandla/Projects-PathShala",
    tech: ["Python", "numpy", "pandas", "tkinter", "etc..."],
    srcImg: PropathshalaImg,
  },
];

const frontendTech = [
  "JavaScript(ES6+)",
  "React.js",
  "Next.js",
  "HTML5",
  "CSS3",
];
const uiTech = ["Bootstrap", "TailwindCSS", "Material-UI"];
const backendTech = [
  "Typscript",
  "Node.js",
  "Express.js",
  "Python",
  "MongoDB",
  "MySQL",
];
const toolsTech = ["Git/Github", "Postman", "Socket.io", "mediasoup"];

export { GITHUB_URL, LINKEDIN_URL, RESUME_URL, INSTAGRAM_URL, projects, frontendTech, uiTech, backendTech, toolsTech };
