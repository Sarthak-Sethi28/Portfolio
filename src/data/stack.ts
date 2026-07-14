import { IconType } from 'react-icons';
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiCplusplus,
  SiNodedotjs,
  SiTailwindcss,
  SiRedux,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiDocker,
  SiGit,
  SiGraphql,
  SiFastapi,
  SiFlask,
  SiDjango,
  SiExpress,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiHuggingface,
  SiArduino,
  SiThreedotjs,
  SiOpenai,
  SiVercel,
} from 'react-icons/si';

export interface Tech {
  name: string;
  Icon: IconType;
}

// Pulled from Sarthak's resume — languages, frontend, backend, data, AI/ML, cloud.
export const stack: Tech[] = [
  { name: 'Python', Icon: SiPython },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'JavaScript', Icon: SiJavascript },
  { name: 'C++', Icon: SiCplusplus },
  { name: 'React', Icon: SiReact },
  { name: 'Redux', Icon: SiRedux },
  { name: 'Tailwind', Icon: SiTailwindcss },
  { name: 'Three.js', Icon: SiThreedotjs },
  { name: 'Node.js', Icon: SiNodedotjs },
  { name: 'Express', Icon: SiExpress },
  { name: 'FastAPI', Icon: SiFastapi },
  { name: 'Flask', Icon: SiFlask },
  { name: 'Django', Icon: SiDjango },
  { name: 'GraphQL', Icon: SiGraphql },
  { name: 'PostgreSQL', Icon: SiPostgresql },
  { name: 'MySQL', Icon: SiMysql },
  { name: 'MongoDB', Icon: SiMongodb },
  { name: 'TensorFlow', Icon: SiTensorflow },
  { name: 'PyTorch', Icon: SiPytorch },
  { name: 'scikit-learn', Icon: SiScikitlearn },
  { name: 'Hugging Face', Icon: SiHuggingface },
  { name: 'OpenAI', Icon: SiOpenai },
  { name: 'Docker', Icon: SiDocker },
  { name: 'Git', Icon: SiGit },
  { name: 'Arduino', Icon: SiArduino },
  { name: 'Vercel', Icon: SiVercel },
];
