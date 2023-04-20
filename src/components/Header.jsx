import React from "react";
import { Link } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import ToggleLocale from "./ToggleLocale";
import { FiLogOut } from "react-icons/fi";

function Header({ locale, authUser, logout }) {
  return (
    <header>
      <h1>
        <Link to="/">{locale === "id" ? "Aplikasi Catatan" : "Notes App"}</Link>
      </h1>
      {authUser === null ? (
        ""
      ) : (
        <nav className="navigation">
          <ul>
            <li>
              <Link to="/archives">
                {locale === "id" ? "Terarsip" : "Archive"}
              </Link>
            </li>
          </ul>
        </nav>
      )}
      <ToggleLocale />
      <ToggleTheme />
      {authUser === null ? (
        ""
      ) : (
        <button onClick={logout} className="button-logout">
          <FiLogOut /> {authUser.name}
        </button>
      )}
    </header>
  );
}

export default Header;
