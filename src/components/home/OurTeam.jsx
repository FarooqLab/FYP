import '../../assets/home-css/ourTeam.css';
import logo from '../../assets/team-images/ali-pic.png'
import Alogo from '../../assets/team-images/ahmad-pics.png'
import Flogo from '../../assets/team-images/farooq-pic.png'
const OurTeam = () => {
  return (
    <section id="team" className="teamSection">
        <h1>Team Members</h1>
        <div className="team-container">
        <div className="team-card">
          <img src={logo} alt="" />
            <h3>Ali Abbass</h3>
            <p>BS Software Engineer<span>,UOS</span></p>
        </div>
        <div className="team-card">
        <img src={Alogo} alt="" />
            <h3>M.Ahmad Azam</h3>
            <p>BS Software Engineer<span>,UOS</span></p>
        </div>
        <div className="team-card">
        <img src={Flogo} alt="" />
            <h3>M.Farooq</h3>
            <p>BS Software Engineer<span>,UOS</span></p>
        </div>
        </div>
    </section>
  )
}

export default OurTeam