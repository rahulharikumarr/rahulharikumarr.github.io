import profileImg from '../assets/images/profile.jpg';
import gameProfileImg from '../assets/images/gameprofile.png';
// Add import for map pin image
import mapPinImg from '../assets/images/map-pin.png';
import githubLogo from '../assets/images/github.png';
import linkedinLogo from '../assets/images/linkedin.png';

export default function About() {
  return (
    <div className="about-main-wrapper">
      <div className="about-row-flex">
        <div className="about-img-col">
          <img src={profileImg} alt="Profile" className="about-img-standalone" />
        </div>
        <div className="about-content-col">
          <div className="placeholder">
            <h1>About Me</h1>
            <p>I'm a 24 y/o Machine Learning Engineer with a desire to build things that people love.<br /><br />I currently work at the Imaging Genetics Center in Los Angeles, CA where I work on training and evaluating machine learning models for neuroimaging data. <br></br><br></br>I'm a big fan of football (soccer), rock music, and building things (always happy to chat about exciting projects or ideas).</p>
          </div>
        </div>
      </div>
      <div className="about-location-row">
        <span className="about-location-pin" aria-label="Location">
          <img src={mapPinImg} alt="Map pin" width={44} height={44} style={{verticalAlign: 'middle', display: 'inline-block'}} />
        </span>
        <span className="about-location-text">Currently based in Los Angeles, CA</span>
      </div>
      <div className="about-spotify-row">
        <iframe style={{borderRadius: '12px'}} src="https://open.spotify.com/embed/track/0YJ9FWWHn9EfnN0lHwbzvV?utm_source=generator" width="100%" height="250" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </div>
      <div className="about-social-section">
        <div className="about-social-subheading">you can find me here.</div>
        <div className="about-social-logos">
          <a href="https://github.com/rahulharikumarr" className="about-social-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
            <img src={githubLogo} alt="GitHub" className="about-social-logo" />
          </a>
          <a href="https://linkedin.com/in/rahulharikumar" className="about-social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <img src={linkedinLogo} alt="LinkedIn" className="about-social-logo" />
          </a>
        </div>
      </div>
    </div>
  );
}
