import './App.css';
import { useEffect } from 'react';
import Login from './components/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import { setUserAction } from './actions/userAction';
import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth";
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

//Redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function App() {

  // Utilizar useDispatch y te crea una función
  const dispatch = useDispatch();

  // Obtener el state
  const isopen = useSelector((state) => state.menu.isopen);
  const darkMode = useSelector((state) => state.menu.darkMode);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        dispatch(setUserAction(user));
      } else {
        // User is signed out
      }
    });
    // eslint-disable-next-line
  }, [])

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light"
    }
  })

  return (
    <div className="app">
      {
        !user ?
          <>
            <Header />
            <Login />
          </>
          :
          <>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Header />
              <div className={`app__central ${isopen ? "displayed" : ""}`}>
                <Sidebar />
                <Main />
              </div>
            </ThemeProvider>
          </>
      }
    </div >
  );
}

export default App;
