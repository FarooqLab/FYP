import '../../assets/home-css/ourTeam.css';
import logo from '../../assets/team-images/ali-pic.png';
import Alogo from '../../assets/team-images/ahmad-pics.png';
import Flogo from '../../assets/team-images/farooq-pic.png';

const OurTeam = () => {
  return (
    <section id="team" className="teamSection">
      <h1>Team Members</h1>
      <div className="team-container">

        <a
          href="https://www.linkedin.com/in/ali-profile" // <-- Replace with real LinkedIn
          target="_blank"
          rel="noopener noreferrer"
          className="team-card"
        >
          <img src={logo} alt="Ali Abbass" />
          <h3>Ali Abbass</h3>
          <p>BS Software Engineer<span>, UOS</span></p>
        </a>

        <a
          href="https://www.linkedin.com/in/ahmad-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="team-card"
        >
          <img src={Alogo} alt="M. Ahmad Azam" />
          <h3>M. Ahmad Azam</h3>
          <p>BS Software Engineer<span>, UOS</span></p>
        </a>

        <a
          href="https://www.linkedin.com/in/farooq89"
          target="_blank"
          rel="noopener noreferrer"
          className="team-card"
        >
          <img src={Flogo} alt="M. Farooq" />
          <h3>M. Farooq</h3>
          <p>BS Software Engineer<span>, UOS</span></p>
        </a>

      </div>
    </section>
  );
};

export default OurTeam;
