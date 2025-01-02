import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const ContactSection = styled.section`
  min-height: 80vh;
  padding: 100px 2rem;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: #3498db;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Header = styled.h3`
  color: #2c3e50;
  font-size: 3.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  color: #34495e;
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  max-width: 600px;
`;

const EmailButton = styled(motion.a)`
  display: inline-block;
  color: #3498db;
  background-color: transparent;
  border: 1px solid #3498db;
  border-radius: 4px;
  padding: 1.25rem 1.75rem;
  font-size: 1rem;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.645,0.045,0.355,1);
  margin-bottom: 3rem;

  &:hover {
    background-color: rgba(52, 152, 219, 0.1);
    transform: translateY(-3px);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
`;

const SocialLink = styled(motion.a)`
  color: #7f8c8d;
  font-size: 1.5rem;
  transition: all 0.25s cubic-bezier(0.645,0.045,0.355,1);

  &:hover {
    color: #3498db;
    transform: translateY(-3px);
  }
`;

const Contact = () => {
  return (
    <ContactSection id="contact">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title>That's me!</Title>
          <Header>Get In Touch</Header>
          <Description>
            I'm currently looking for new opportunities in Deep Learning and Computer Vision. 
            Whether you have a question or just want to say hi, I'd love to hear from you!
          </Description>
          
          <EmailButton
            href="mailto:ankarath@usc.edu"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '10px' }} />
            Say Hello
          </EmailButton>

          <SocialLinks>
            <SocialLink 
              href="https://www.linkedin.com/in/rahulharikumar/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </SocialLink>
            <SocialLink 
              href="https://github.com/rahulharikumarr"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
            >
              <FontAwesomeIcon icon={faGithub} />
            </SocialLink>
          </SocialLinks>
        </motion.div>
      </Container>
    </ContactSection>
  );
};

export default Contact;
