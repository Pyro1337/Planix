import { useState } from "react";
import { ReactComponent as Google } from "../../auth/icons/icons8-google.svg";
import { ReactComponent as TrelloLogo } from "../../common/icons/trello-icon.svg";
import { ExclamationDiamondFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();
  const login_loading = false;
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onLoginPress = (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del submit
    const msgError = "Por favor, complete los campos requeridos.";
    if (!email) {
      setError(msgError);
      setEmailValid(false);
    } else {
      setError("");
      setEmailValid(true);
    }
  };
  const onLoginAccess = (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del submit
    navigate("/mis-espacios-trabajo");
  };
  const onChange = (field) => (e) => {
    const value = e.target.value;
    if (field === "email") {
      setEmail(value.trim());
    } else if (field === "password") {
      setPassword(value.trim());
    }
  };

  const renderForm = () => {
    return (
      <div className="flex flex-col items-center p-6 shadow-lg rounded-lg shadow/lg bg-white gap-4 w-[400px]">
        <div className="flex flex-row justify-around items-center">
          <TrelloLogo className="w-8 h-8" />
          <div className="text-4xl p-4 font-bold text-gray-700">Trello</div>
        </div>

        <span className="font-semibold text-gray-700">
          Iniciar sesión para continuar
        </span>
        {!login_loading && (
          <form className={"w-full flex flex-col gap-8"}>
            <div className="flex flex-col gap-2 text-gray-600">
              <div className="input flex flex-col">
                <input
                  className={`py-2 px-2 rounded border focus:border-blue-700 focus:outline-none ${
                    emailValid ? "bg-gray-100" : ""
                  }`}
                  type="text"
                  placeholder="Introduce tu correo electrónico"
                  disabled={emailValid}
                  onChange={onChange("email")}
                />
                {!email && !!error && (
                  <div className="flex flex-row items-center gap-1">
                    <ExclamationDiamondFill className="w-3 text-red-800" />
                    <span className="text-[12px] text-red-800">
                      Indica una dirección de correo electrónico
                    </span>
                  </div>
                )}
              </div>
              {emailValid && (
                <div className="input flex flex-col gap-2">
                  <input
                    className="py-2 px-2 rounded border focus:border-blue-700 focus:outline-none"
                    type="password"
                    placeholder="Introducir contraseña"
                    onChange={onChange("password")}
                  />
                </div>
              )}
              <div className="input flex flex-col ">
                {emailValid && (
                  <button
                    disabled={false}
                    type="button"
                    onClick={onLoginAccess}
                    className={`bg-opacity-100 hover:duration-75 hover:bg-blue-800 bg-blue-700 text-white font-semibold leading-6 text-md py-2 px-4 rounded transition-all ease-linear duration-400 `}
                  >
                    {"Iniciar sesión"}
                  </button>
                )}
                {!emailValid && (
                  <button
                    disabled={false}
                    type="button"
                    onClick={onLoginPress}
                    className={`bg-opacity-100 hover:duration-75 hover:bg-blue-800 bg-blue-700 text-white font-semibold leading-6 text-md py-2 px-4 rounded transition-all ease-linear duration-400 `}
                  >
                    {"Continuar"}
                  </button>
                )}
              </div>
              <div className="flex flex-col items-center font-semibold gap-4 mt-4">
                <span className="text-sm">O continúa con:</span>
                <button className="flex flex-row justify-center items-center gap-2 border w-full rounded-sm hover:bg-gray-100">
                  <Google className="w-8" />
                  Google
                </button>
                <div>
                  <span className="text-sm text-blue-700 hover:underline hover:cursor-pointer">
                    Crear cuenta
                  </span>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    );
  };

  return (
    <div className="">
      <div className="flex flex-col gap-4 flex-grow">
        <div className="flex flex-col gap-4 p-8 bg-cover">
          <div className="flex flex-row justify-center">{renderForm()}</div>
        </div>
      </div>
    </div>
  );
}
