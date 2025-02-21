import '../../assets/home-css/ourTeam.css';
import logo from '../../assets/react.svg'
const OurTeam = () => {
  return (
    <section id="team" className="teamSection">
        <h1>Team Members</h1>
        <div className="team-container">
        <div className="team-card">
          <img src={logo} alt="" />
            <h3>Ahmad Azam</h3>
            <p>bsse software engineering</p>
        </div>
        <div className="team-card">
        <img src={logo} alt="" />
            <h3>Ahmad Azam</h3>
            <p>bsse software engineering</p>
        </div>
        <div className="team-card">
        <img src={logo} alt="" />
            <h3>Ahmad Azam</h3>
            <p>bsse software engineering</p>
        </div>
        </div>
    </section>
  )
}

export default OurTeam