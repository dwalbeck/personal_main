// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import ChatBot from './components/ChatBot/ChatBot'
import Contact from './components/Contact/Contact'
import Experience from './components/Experience/Experience'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Interests from './components/Interests/Interests'
import Landing from './components/Landing/Landing'
import MeetDavey from './components/MeetDavey/MeetDavey'
import ProjectList from './components/Projects/ProjectList'
import Skills from './components/Skills/Skills'
import QandA from './components/QandA/QandA'

function App() {

  return (
    <>
    <Header />
    <main className="pt-16">
      <Landing />
      <Experience />
      <Skills />
      <ProjectList />
      <MeetDavey />
      <Interests />
      <QandA />
      <Contact />
      <Footer />
    </main>
    <ChatBot />
    </>
  )
}

export default App
