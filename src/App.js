import './App.css';
import Banner from './components/common/Banner';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import NavBar from './components/common/Navbar';
import PreviousRulings from './components/PreviousRulings/PreviousRulings';
import SecondBanner from './components/common/SecondBanner';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Header></Header>
      <div className="max-centered">
        <Banner></Banner>
        <PreviousRulings></PreviousRulings>
        <SecondBanner></SecondBanner>
        <hr></hr>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;