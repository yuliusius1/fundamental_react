import React from "react";
import { Route, Routes } from "react-router-dom";
import AddPage from "./pages/AddPage";
import DetailPage from "./pages/DetailPage";
import HomePageWrapper from "./pages/HomePage";
import Header from "./components/Header";
import ArchivePageWrapper from "./pages/ArchivePage";
import { LocaleProvider } from "./context/LocaleContext";
import { ThemeProvider } from "./context/ThemeContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { getUserLogged, putAccessToken } from "./utils/api";

function App() {
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);
  const [locale, setLocale] = React.useState("id");
  const [theme, setTheme] = React.useState("dark");

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      return prevLocale === "id" ? "en" : "id";
    });
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      let newTheme = prevTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
      return newTheme;
    });
  };

  React.useEffect(() => {
    getUserLogged().then(({ data }) => {
      setAuthedUser(data);
      setInitializing(false);
    });
  }, []);

  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    // setAuthedUser = data;
    setAuthedUser(data);
  }

  async function onLogout() {
    setAuthedUser(null);
    putAccessToken("");
  }

  const localeContextValue = React.useMemo(() => {
    return {
      locale,
      toggleLocale,
    };
  }, [locale]);

  const themeContextValue = React.useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme]);
  if (initializing) {
    return "";
  } else {
    if (authedUser === null) {
      return (
        <ThemeProvider value={themeContextValue}>
          <LocaleProvider value={localeContextValue}>
            <div className="app-container">
              <Header locale={locale} authUser={authedUser} logout={onLogout} />
              <main>
                <Routes>
                  <Route
                    path="/*"
                    element={<LoginPage loginSuccess={onLoginSuccess} />}
                  />
                  <Route path="/register" element={<RegisterPage />} />
                </Routes>
              </main>
            </div>
          </LocaleProvider>
        </ThemeProvider>
      );
    }
    return (
      <ThemeProvider value={themeContextValue}>
        <LocaleProvider value={localeContextValue}>
          <div className="app-container">
            <Header locale={locale} authUser={authedUser} logout={onLogout} />
            <main>
              <Routes>
                <Route path="/" element={<HomePageWrapper />} />
                <Route path="/add" element={<AddPage />} />
                <Route path="/archives" element={<ArchivePageWrapper />} />
                <Route path="/notes/:id" element={<DetailPage />} />
              </Routes>
            </main>
          </div>
        </LocaleProvider>
      </ThemeProvider>
    );
  }
}

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <div className="app-container">
//         <Header />
//         <main>
//           <Routes>
//             <Route path="/"  element={<HomePageWrapper />} />
//             <Route path="/add" element={<AddPage />} />
//             <Route path="/archives" element={<ArchivePageWrapper />} />
//             <Route path="/notes/:id" element={<DetailPage />} />
//           </Routes>
//         </main>
//       </div>
//     );
//   }
// }

export default App;
