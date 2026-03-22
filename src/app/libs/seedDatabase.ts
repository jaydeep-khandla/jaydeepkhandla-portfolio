import connectDB from '@/app/libs/mongoConnect';
import { Project } from '@/app/models/Project';
import { Skill } from '@/app/models/Skill';
import { AboutSection } from '@/app/models/AboutSection';
import { Experience } from '@/app/models/Experience';

// Data from data.ts
const projectsData = [
  {
    title: 'AlgoVis-Algorithm-Visualizer',
    description:
      'AlgoVis is an Algorithm Visualizer that helps in understanding the working of various algorithms visually.',
    urlTitle: '🔗Demo/AlgoVis',
    href: 'https://visalgo.vercel.app/',
    tech: ['Next.js', 'TypeScript', 'Aceternity UI', 'Nodemailer'],
    order: 0,
  },
  {
    title: 'JDX-Online-Collaborative-Compiler',
    description:
      'JDX Online Compiler is a collaborative coding platform aimed at providing an immersive coding experience.',
    urlTitle: '🔗Github/JDX-Online-Compiler',
    href: 'https://github.com/jaydeep-khandla/JDX-Online-Compiler',
    tech: [
      'React.js',
      'Node.js',
      'Express.js',
      'Socket.io',
      'Monaco Code Editor',
    ],
    order: 1,
  },
  {
    title: 'ZEPT-Video-Conferencing-WebApp',
    description:
      'ZEPT is facilitates seamless video and audio communication, in-meeting chat, and file sharing among users.',
    urlTitle: '🔗Github/Video-Conferencing-WebApp',
    href: 'https://github.com/jaydeep-khandla/Video-Conferencing-WebApp',
    tech: [
      'React.js',
      'Node.js',
      'Express.js',
      'Socket.io',
      'mediasoup',
      'MongoDB',
    ],
    order: 2,
  },
  {
    title: 'KrushiAadhar-SSIP-Heckathon-2022',
    description:
      'KrushiAadhar is a Digital Identity System for farmers, aimed at providing a unique identity to each farmer.',
    urlTitle: '🔗Github/KrushiAadhar',
    href: 'https://github.com/jaydeep-khandla/KrushiAadhar-UISF',
    tech: ['html5', 'css3', 'javascript', 'php', 'java', 'Android'],
    order: 3,
  },
  {
    title: 'Brainhunt-Coding-Plateform-Xenesis-2023',
    description:
      "BrainHunt is a coding competition platform that I had developed for our event at college's Tech-Fest.",
    urlTitle: '🔗Github/x-brain-hunt',
    href: 'https://github.com/jaydeep-khandla/x-brain-hunt',
    tech: ['html5', 'css3', 'javascript', 'Github Pages'],
    order: 4,
  },
  {
    title: 'Porjects-Pathshala-Miniprojects-of-Python',
    description:
      'Developing a Hub for small tech projects to support learning and skills with an organized Repository.',
    urlTitle: '🔗Github/Projects-Pathshala',
    href: 'https://github.com/jaydeep-khandla/Projects-PathShala',
    tech: ['Python', 'numpy', 'pandas', 'tkinter'],
    order: 5,
  },
];

const skillsData = [
  {
    category: 'frontend',
    skills: ['JavaScript(ES6+)', 'React.js', 'Next.js', 'HTML5', 'CSS3'],
    order: 0,
  },
  {
    category: 'ui',
    skills: ['Bootstrap', 'TailwindCSS', 'Material-UI'],
    order: 1,
  },
  {
    category: 'backend',
    skills: [
      'Typscript',
      'Node.js',
      'Express.js',
      'Python',
      'MongoDB',
      'MySQL',
    ],
    order: 2,
  },
  {
    category: 'tools',
    skills: ['Git/Github', 'Postman', 'Socket.io', 'mediasoup'],
    order: 3,
  },
];

const aboutSectionData = {
  name: 'Jaydeep Khandla',
  title: 'Full Stack Web Developer',
  bio: `Passionate full-stack developer with expertise in building scalable web applications.

🎯 Specialized In:
• Backend Development: Node.js, Express.js, Python
• Frontend Development: React.js, Next.js, TypeScript
• Databases: MongoDB, MySQL
• Real-time Applications: Socket.io, WebRTC

💼 Experience:
Developed multiple projects ranging from algorithm visualization tools to collaborative 
coding platforms and video conferencing applications. Strong focus on clean code, 
performance optimization, and user-centric design.

🚀 Always Learning:
Constantly exploring new technologies and best practices in web development. 
Passionate about open source and community contributions.`,
  profileImageUrl: '', // Add image URL as needed
  resumeUrl:
    'https://drive.google.com/file/d/1gFMSd3fF8U-N0sf7S_7fO1nUhs6gQNCu/view?usp=sharing',
  githubUrl: 'https://github.com/jaydeep-khandla/',
  linkedinUrl: 'https://www.linkedin.com/in/jaydeep-khandla',
  instagramUrl:
    'https://www.instagram.com/the_a.r.t_company?igsh=MWRmem80ZHhvcTdxNg==',
  email: 'jaydeepkhandla.work@gmail.com', // Update with actual email
};

const experiencesData = [
  {
    role: 'Senior Full Stack Developer',
    organizationName: 'Tech Innovations Inc.',
    organizationWebsite: 'https://techinnovations.example.com',
    description: `Led the development of scalable web applications using Next.js and Node.js.
• Designed and implemented real-time features using Socket.io
• Mentored junior developers and conducted code reviews
• Optimized database queries resulting in 40% performance improvement
• Collaborated with cross-functional teams on product requirements`,
    startDate: new Date('2022-06-01'),
    endDate: null,
    isCurrentRole: true,
    timeline: 'Jun 2022 - Present',
    verificationDocUrl: '',
    verificationDocName: 'Employment Certificate',
    order: 0,
  },
  {
    role: 'Full Stack Developer',
    organizationName: 'Digital Solutions Ltd.',
    organizationWebsite: 'https://digitalsolutions.example.com',
    description: `Developed and maintained multiple client-facing web applications.
• Built responsive user interfaces with React.js and Tailwind CSS
• Implemented REST APIs using Express.js and MongoDB
• Participated in agile development sprints and daily standups
• Debugging and resolving production issues`,
    startDate: new Date('2021-01-15'),
    endDate: new Date('2022-05-30'),
    isCurrentRole: false,
    timeline: 'Jan 2021 - May 2022',
    verificationDocUrl: '',
    verificationDocName: 'Work Experience Certificate',
    order: 1,
  },
  {
    role: 'Junior Web Developer',
    organizationName: 'StartUp Ventures',
    organizationWebsite: 'https://startupventures.example.com',
    description: `Contributed to the development of web applications and internal tools.
• Fixed bugs and implemented new features based on requirements
• Learned and worked with React.js, Node.js, and MongoDB
• Assisted senior developers with code reviews and testing
• Improved code quality and test coverage`,
    startDate: new Date('2020-06-01'),
    endDate: new Date('2020-12-31'),
    isCurrentRole: false,
    timeline: 'Jun 2020 - Dec 2020',
    verificationDocUrl: '',
    verificationDocName: 'Internship Certificate',
    order: 2,
  },
];

export async function seedDatabase() {
  try {
    await connectDB();
    console.log('Database connected successfully');

    // Clear existing data
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await AboutSection.deleteMany({});
    await Experience.deleteMany({});
    console.log('Cleared existing data');

    // Seed Projects
    const insertedProjects = await Project.insertMany(projectsData);
    console.log(`✓ Inserted ${insertedProjects.length} projects`);

    // Seed Skills
    const insertedSkills = await Skill.insertMany(skillsData);
    console.log(`✓ Inserted ${insertedSkills.length} skill categories`);

    // Seed About Section (single document)
    const insertedAbout = await AboutSection.create(aboutSectionData);
    console.log(`✓ Inserted about section for ${insertedAbout.name}`);

    // Seed Experiences
    const insertedExperiences = await Experience.insertMany(experiencesData);
    console.log(`✓ Inserted ${insertedExperiences.length} experiences`);

    console.log('✅ Database seeding completed successfully!');
    return {
      success: true,
      summary: {
        projects: insertedProjects.length,
        skills: insertedSkills.length,
        about: 1,
        experiences: insertedExperiences.length,
      },
    };
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}
