import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

const ProjectsSection = styled.section`
  min-height: 100vh;
  padding: 100px 2rem;
  background-color: #f7f7f7;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 3rem;
  
  &:after {
    content: '';
    display: block;
    width: 100px;
    height: 2px;
    background-color: #3498db;
    margin-top: 10px;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  position: relative;
  border: 1px solid #ecf0f1;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px -15px rgba(44, 62, 80, 0.1);
    border-color: #3498db;
  }
`;

const ProjectTitle = styled.h3`
  color: #3498db;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  
  &:hover {
    color: #2980b9;
  }
`;

const ProjectDescription = styled.div`
  color: #34495e;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;

  ul {
    list-style: none;
    padding: 0;
    
    li {
      margin-bottom: 1rem;
      padding-left: 1.5rem;
      position: relative;
      
      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: #3498db;
      }
    }
  }
`;

const TechStack = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const TechTag = styled.span`
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(52, 152, 219, 0.2);
    transform: translateY(-2px);
  }
`;

const Links = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const IconLink = styled.a`
  color: #7f8c8d;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #3498db;
    transform: translateY(-2px);
  }
`;

const Projects = () => {
  const projects = [
    {
      title: "Deep Learning for Crime Pattern Recognition",
      description: [
        "Investigated crime pattern recognition through Deep Learning methodologies, highlighting a proactive approach to crime analysis for safer communities",
        "Analyzed and compared results across three distinct datasets (Chicago, San Francisco, Boston), showcasing adaptability and versatility in handling varied data sources",
        "Achieved a remarkable accuracy of 96.51% employing XGBoost, an improvement to earlier work",
        "Presented research findings at the '2023 International Conference on Recent Advances in Science and Engineering Technology (ICRASET)'"
      ],
      tech: ["Python", "Pandas", "Deep Learning", "XGBoost", "Data Analysis"],
      github: "https://github.com/rahulharikumarr/crime-pattern-recognition",
      live: "#"
    },
    {
      title: "Detection of Intoxication in Automobile Drivers",
      description: [
        "Spearheaded a project aimed at elevating efficiency of current drunk driving systems using Deep Learning techniques",
        "Implemented an array of algorithms, encompassing diverse CNN architectures (VGG16, ResNet, MobileNetV2)",
        "Presented findings at the 'Second International Conference on Electronics and Renewable Systems (ICEARS 2023@IEEE)'"
      ],
      tech: ["Deep Learning", "CNNs", "VGG16", "ResNet", "MobileNetV2"],
      github: "https://github.com/tanaygrover/detection-of-intoxication",
      live: "https://ieeexplore.ieee.org/document/10085153/"
    },
    {
      title: "Real-Time Stock Trading Web + IOS app",
      description: [
        "Developed a full-stack web application for online stock trading, enabling users to buy and sell stocks in real-time",
        "Engineered frontend leveraging Angular for user interface and TypeScript for programming logic",
        "Constructed backend REST APIs using Node.js and Express framework to display real-time stock data"
      ],
      tech: ["Angular", "TypeScript", "Node.js", "Express","MongoDB", "Swift", "Finnhub API"],
      github: "#",
      live: "#"
    },
    {
        title: "Unity 2D Platformer Game",
        description: [
          "Built a 2D platformer game using Unity, incorporating a fun time-travel mechanic",
          "Implemented various game mechanics using C#, including jumping and dashing",
          "Programmed switch-based level progression, enhancing player engagement and replayability"
        ],
        tech: ["Unity", "C#", "Git"],
        github: "https://github.com/rahulharikumarr/Me-Myself-And-I",
        live: "https://github.com/rahulharikumarr/Me-Myself-And-I"
      }
  ];

  return (
    <ProjectsSection id="projects">
      <Container>
        <SectionTitle>Featured Projects</SectionTitle>
        <ProjectsGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>
                <ul>
                  {project.description.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </ProjectDescription>
              <TechStack>
                {project.tech.map((tech, i) => (
                  <TechTag key={i}>{tech}</TechTag>
                ))}
              </TechStack>
              <Links>
                <IconLink href={project.github} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGithub} />
                </IconLink>
                <IconLink href={project.live} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </IconLink>
              </Links>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>
    </ProjectsSection>
  );
};

export default Projects;
