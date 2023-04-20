import { ThemeConsumer } from "../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

function ToggleTheme() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => {
        return (
          <button onClick={toggleTheme} className="toggle-theme">
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        );
      }}
    </ThemeConsumer>
  );
}

export default ToggleTheme;
