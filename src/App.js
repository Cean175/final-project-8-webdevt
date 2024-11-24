import './App.css';
import Login from './H.management/login';



function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/inside.jpg'})`,
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
   <Login></Login>
    </div>
  );
}

export default App;


