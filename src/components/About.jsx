import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutSection = styled.section`
  min-height: 100vh;
  padding: 100px 2rem;
  background-color: #f7f7f7;  // Changed from #0a192f
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  color: #2c3e50;  // Changed from #ccd6f6
  font-size: 2rem;
  margin-bottom: 3rem;
  
  &:after {
    content: '';
    display: block;
    width: 100px;
    height: 2px;
    background-color: #3498db;  // Changed from #64ffda
    margin-top: 10px;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 50px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TextContent = styled.div`
  color: #34495e;  // Changed from #8892b0
`;

const Paragraph = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.7;
  font-size: 1.1rem;
`;

const SkillsContainer = styled.div`
  background-color: #ffffff;  // Changed from #112240
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 30px -15px rgba(44, 62, 80, 0.1);  // Changed shadow color
  border: 1px solid #ecf0f1;  // Added subtle border
`;

const SkillsTitle = styled.h3`
  color: #3498db;  // Changed from #64ffda
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
`;

const SkillsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  list-style: none;
  padding: 0;
`;

const SkillItem = styled(motion.li)`
  color: #34495e;  // Changed from #8892b0
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  
  &:before {
    content: '▹';
    color: #3498db;  // Changed from #64ffda
    margin-right: 10px;
  }
`;

// Keep the rest of your component exactly the same
const About = () => {
  const skills = [
    "Deep Learning",
    "Machine Learning",
    "PyTorch",
    "Computer Vision",
    "Neural Networks",
    "Data Visualization",
    "Python",
    "React",
    "MongoDB",
    "Generative AI",
    "Node.js",
    "SQL",
    "Problem Solving",
    "Research"
  ];

  return (
    <AboutSection id="about">
      <Container>
        <SectionTitle>About Me</SectionTitle>
        <ContentWrapper>
          <TextContent>
            <Paragraph>
              Hello! I'm Rahul, a Computer Science graduate student at USC with a passion for Deep Learning and Computer Vision. Currently, I work as a Deep Learning Research Assistant at the Imaging Genetics Center, Keck School of Medicine, where I'm pushing the boundaries of neuroimaging analysis using advanced AI techniques.
            </Paragraph>
            <Paragraph>
              My journey in tech has led me from studying the fundamentals of Computer Science to engineering sophisticated neural networks for real-world problems. At USC, I'm deepening my expertise in AI and Algorithms while actively contributing to research in Alzheimer's disease prediction using Deep Learning and Generative AI.
            </Paragraph>
            <Paragraph>
              When I'm not training neural networks or optimizing algorithms, I'm usually working on building full-stack applications or exploring new technologies in the AI landscape. I am most passionate about working on projects that have a real-world impact.
            </Paragraph>
          </TextContent>
          <SkillsContainer>
            <SkillsTitle>Technologies I Work With</SkillsTitle>
            <SkillsList>
              {skills.map((skill, index) => (
                <SkillItem
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {skill}
                </SkillItem>
              ))}
            </SkillsList>
          </SkillsContainer>
        </ContentWrapper>
      </Container>
    </AboutSection>
  );
};

export default About;