import styled from 'styled-components';
import profileImage from '../assets/images/profile.jpg';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  padding-top: 80px;
  background-color: #f7f7f7;  // Added background color
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const TextContent = styled.div`
  flex: 1;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #3498db;  // Changed from #64ffda
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(52, 152, 219, 0.2);  // Changed from rgba(100, 255, 218, 0.2)
  }
`;

const Greeting = styled.h2`
  color: #3498db;  // Changed from #64ffda
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  color: #2c3e50;  // Changed from #ccd6f6
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h3`
  color: #7f8c8d;  // Changed from #8892b0
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const Description = styled.p`
  color: #34495e;  // Changed from #8892b0
  max-width: 540px;
  line-height: 1.5;
  margin-bottom: 2rem;
`;

const Hero = () => {
  return (
    <HeroSection>
      <HeroContent>
        <TextContent>
          <Greeting>Hi, my name is</Greeting>
          <Title>Rahul Hari</Title>
          <Subtitle>deep learning | computer vision </Subtitle>
          <Description>
            I specialize in Deep Learning and Machine Learning, and I love to build AI models that can solve real-world problems.
          </Description>
        </TextContent>
        <ImageContainer>
          <ProfileImage 
            src={profileImage}
            alt="Rahul Hari" 
          />
        </ImageContainer>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;