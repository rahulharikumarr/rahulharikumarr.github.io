import styled from 'styled-components';
import { motion } from 'framer-motion';
import uscLogo from '../assets/images/logos/usc.png';
import srmLogo from '../assets/images/logos/srm.png';
import igcLogo from '../assets/images/logos/igc.jpeg';
import eyLogo from '../assets/images/logos/ey.png';

const TimelineSection = styled.section`
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

const TimelineWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: #3498db;
    opacity: 0.2;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    &:before {
      left: 15px;
    }
  }
`;

const Column = styled.div`
  h3 {
    color: #3498db;
    font-size: 1.5rem;
    margin-bottom: 2rem;
    text-align: center;
  }
`;

const TimelineContent = styled.div`
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  width: 100%;
  box-shadow: 0 10px 30px -15px rgba(44, 62, 80, 0.1);
  position: relative;
  border: 1px solid #ecf0f1;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px -15px rgba(44, 62, 80, 0.2);
    border-color: #3498db;
  }
  
  &:before {
    content: '';
    position: absolute;
    right: -7.5px;
    top: 20px;
    width: 15px;
    height: 15px;
    background: #3498db;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(52, 152, 219, 0.5);
    
    ${props => props.type === 'experience' && `
      right: auto;
      left: -7.5px;
    `}

    @media (max-width: 768px) {
      left: -7.5px;
      right: auto;
    }
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const Logo = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
  border-radius: 4px;
`;

const ItemTitle = styled.h4`
  color: #3498db;
  font-size: 1.2rem;
  text-shadow: 0 0 8px rgba(52, 152, 219, 0.3);
`;

const ItemSubtitle = styled.h5`
  color: #2c3e50;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const ItemDate = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  font-style: italic;
`;

const ItemDescription = styled.div`
  color: #34495e;
  font-size: 0.9rem;
  line-height: 1.6;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      margin-bottom: 0.8rem;
      
      &:first-child {
        color: #3498db;
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 1rem;
        letter-spacing: 0.5px;
      }
      
      &:not(:first-child) {
        padding: 0.5rem 1rem;
        background: rgba(52, 152, 219, 0.05);
        border-radius: 4px;
        transition: all 0.3s ease;
        border: 1px solid rgba(52, 152, 219, 0.1);
        
        &:hover {
          background: rgba(52, 152, 219, 0.1);
          transform: translateX(5px);
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const Timeline = () => {
  const education = [
    {
      logo: uscLogo,
      title: "University of Southern California",
      subtitle: "Master of Science in Computer Science",
      date: "August 2023 - May 2025",
      description: [
        "Relevant Courses:",
        "Analysis of Algorithms",
        "Machine Learning for Data Science",
        "Information Retrieval",
        "Web Technologies"
      ]
    },
    {
      logo: srmLogo,
      title: "SRM University",
      subtitle: "Bachelor of Technology in Computer Science Engineering",
      date: "June 2019 - May 2023 (Cumulative GPA of 9.43 / 10.0)",
      description: [
        "Relevant Courses:",
        "Data Structures and Algorithms",
        "Data Mining and Analytics",
        "Database Management Systems",
        "Artificial Intelligence"
      ]
    }
  ];

  const experience = [
    {
      logo: igcLogo,
      title: "Deep Learning Research Assistant",
      subtitle: "Imaging Genetics Center (Keck School of Medicine, USC)",
      date: "April 2024 - Present",
      description: [
        "",
        "Employed ComBat algorithm using Python to mitigate batch effects in neuroimaging data",
        "Implemented DenseNet architecture on fMRI brain scans achieving MAE below 4.5",
        "Constructed two-arm model architecture utilizing tabular data and 3D MRI scans",
        "Engineered 3D Variational Autoencoder for harmonizing multi-site diffusion MRI data"
      ]
    },
    {
      logo: eyLogo,
      title: "Data Science Intern",
      subtitle: "Ernst & Young (EY)",
      date: "October 2022 - January 2023",
      description: [
        "",
        "Received hands-on training on Data Science procedures and NLP for tax documents",
        "Applied Entity extraction and PoS tagging to categorize words for tax use cases",
        "Leveraged Tesseract for OCR tasks - converting image documents to text for analysis"
      ]
    }
  ];

  return (
    <TimelineSection id="experience">
      <Container>
        <SectionTitle>My Journey</SectionTitle>
        <TimelineWrapper>
          <Column>
            <h3>Education</h3>
            {education.map((item, index) => (
              <TimelineContent
                key={index}
                type="education"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <TitleContainer>
                  <Logo src={item.logo} alt={item.title} />
                  <ItemTitle>{item.title}</ItemTitle>
                </TitleContainer>
                <ItemSubtitle>{item.subtitle}</ItemSubtitle>
                <ItemDate>{item.date}</ItemDate>
                <ItemDescription>
                  <ul>
                    {item.description.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </ItemDescription>
              </TimelineContent>
            ))}
          </Column>
          <Column>
            <h3>Experience</h3>
            {experience.map((item, index) => (
              <TimelineContent
                key={index}
                type="experience"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <TitleContainer>
                  <Logo src={item.logo} alt={item.title} />
                  <ItemTitle>{item.title}</ItemTitle>
                </TitleContainer>
                <ItemSubtitle>{item.subtitle}</ItemSubtitle>
                <ItemDate>{item.date}</ItemDate>
                <ItemDescription>
                  <ul>
                    {item.description.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </ItemDescription>
              </TimelineContent>
            ))}
          </Column>
        </TimelineWrapper>
      </Container>
    </TimelineSection>
  );
};

export default Timeline;
