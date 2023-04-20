import { LocaleConsumer } from "../context/LocaleContext";
import { FaLanguage } from "react-icons/fa";

function ToggleLocale() {
  return (
    <LocaleConsumer>
      {({ locale, toggleLocale }) => {
        return (
          <button onClick={toggleLocale} className="toggle-locale">
            <FaLanguage />
          </button>
        );
      }}
    </LocaleConsumer>
  );
}

export default ToggleLocale;
