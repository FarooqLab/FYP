import FAQ from "../components/home/FAQ"
import Features from "../components/home/Features"
import Footer from '../components/home/Footer'
import HeroSection from "../components/home/HeroSection"
import Navbar from "../components/home/Navbar"
import OurTeam from "../components/home/OurTeam"
import '../index.css'
const Home = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection />
        <Features/>
        <OurTeam/>
        <FAQ/>
        <Footer/>
        
        
    </div>
  )
}

export default Home