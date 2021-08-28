import './App.css';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Header from './components/Header';
import NavBar from './components/Navbar';
import SecondBanner from './components/SecondBanner';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Header></Header>
      <div className="max-centered">
        <Banner></Banner>
        <main role="main">
        👉 Your code goes here 👈
        </main>
        <SecondBanner></SecondBanner>
        <hr></hr>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;