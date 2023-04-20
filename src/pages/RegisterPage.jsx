import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import LocaleContext from "../context/LocaleContext";
import { register } from "../utils/api";

function RegisterPage() {
  const { locale } = React.useContext(LocaleContext);

  const navigate = useNavigate();
  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate("/");
    }
  }

  return (
    <section className="register-page">
      <h2>
        {locale === "id"
          ? "Isi form untuk mendaftar akun."
          : "Fill the form to register account."}
      </h2>
      <RegisterInput register={onRegisterHandler} />
      <p>
        {locale === "id" ? "Sudah punya akun?" : "Already have an account?"}{" "}
        <Link to="/">{locale === "id" ? "Masuk disini" : "Login here"} </Link>
      </p>
    </section>
  );
}

export default RegisterPage;
