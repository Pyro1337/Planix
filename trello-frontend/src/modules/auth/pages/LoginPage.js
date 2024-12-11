import { useState } from "react";
import { ReactComponent as Google } from "../../auth/icons/icons8-google.svg";
import { ReactComponent as TrelloLogo } from "../../common/icons/trello-icon.svg";
import { ExclamationDiamondFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import ModalCreateUser from "./ModalCreateUser";
import { miembroActions } from "../../miembro/handlers/redux";
import { useDispatch } from "react-redux";
import { useSelect } from "@material-tailwind/react";
import { useSelector } from "react-redux";

export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const miembros = useSelector((state) => state.miembro.miembros);

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para controlar el loader
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);

  const onLoginPress = (e) => {
    e.preventDefault();
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
    e.preventDefault();
    console.log(email, password);
    console.log(miembros);
    const miembroCoincidencia = miembros.find(
      (miembro) => miembro.username === email && miembro.password === password
    );
    if (miembroCoincidencia) {
      dispatch(miembroActions.setMiembroLogueado(miembroCoincidencia));
      navigate("/mis-espacios-trabajo");
    } else {
      alert("El usuario o la contraseña son incorrectos.");
    }
  };

  const onGoogleLogin = () => {
    setIsLoading(true); // Activa el loader
    setTimeout(() => {
      setIsLoading(false); // Desactiva el loader después de 3 segundos
      navigate("/mis-espacios-trabajo"); // Navega a la siguiente página
    }, 3000);
  };

  const onChange = (field) => (e) => {
    const value = e.target.value;
    if (field === "email") {
      setEmail(value);
    } else if (field === "password") {
      setPassword(value);
    }
  };

  //Realizar el ingreso con el spinner de carga mediante SSO
  const renderLoader = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner con animación */}
        <div className="h-12 w-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        <span className="text-white text-lg font-semibold">
          Iniciando sesión...
        </span>
      </div>
    </div>
  );

  const renderForm = () => (
    <div className="flex flex-col items-center p-6 shadow-lg rounded-lg shadow/lg bg-white gap-4 w-[400px]">
      <div className="flex flex-row justify-around items-center">
        <TrelloLogo className="w-8 h-8" />
        <div className="text-4xl p-4 font-bold text-gray-700">Trello</div>
      </div>

      <span className="font-semibold text-gray-700">
        Iniciar sesión para continuar
      </span>
      <form className={"w-full flex flex-col gap-8"}>
        <div className="flex flex-col gap-2 text-gray-600">
          <div className="input flex flex-col">
            <input
              className={`py-2 px-2 rounded border focus:border-blue-700 focus:outline-none`}
              type="text"
              placeholder="Introduce tu correo electrónico"
              onChange={onChange("email")}
            />
            {!email && !!error && (
              <div className="flex flex-row items-center gap-1">
                <ExclamationDiamondFill className="w-3 text-red-800" />
                <span className="text-[12px] text-red-800">
                  Indica un correo electrónico o nombre de usuario
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
          <div className="input flex flex-col">
            {emailValid ? (
              <button
                type="button"
                onClick={onLoginAccess}
                className="bg-blue-700 text-white font-semibold leading-6 text-md py-2 px-4 rounded hover:bg-blue-800 transition-all"
              >
                Iniciar sesión
              </button>
            ) : (
              <button
                type="button"
                onClick={onLoginPress}
                className="bg-blue-700 text-white font-semibold leading-6 text-md py-2 px-4 rounded hover:bg-blue-800 transition-all"
              >
                Continuar
              </button>
            )}
          </div>
          <div className="flex flex-col items-center font-semibold gap-4 mt-4">
            <span className="text-sm">O continúa con:</span>
            {/* Botón de Google */}
            <button
              type="button"
              onClick={onGoogleLogin}
              className="flex flex-row justify-center items-center gap-2 border w-full rounded-sm hover:bg-gray-100"
            >
              <Google className="w-8" />
              Google
            </button>
            <div>
              <span
                className="text-sm text-blue-700 hover:underline hover:cursor-pointer"
                onClick={() => setShowModalCreateUser(true)}
              >
                Crear cuenta
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );

  const onCloseModalCreateUser = () => {
    setShowModalCreateUser(false);
  };

  const onCreateUser = (user) => {
    console.log(user);
    dispatch(miembroActions.addMiembro(user));
    setShowModalCreateUser(false);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 flex-grow">
        <div className="flex flex-col gap-4 p-8 bg-cover">
          <div className="flex flex-row justify-center">{renderForm()}</div>
        </div>
      </div>
      {isLoading && renderLoader()}
      <ModalCreateUser
        show={showModalCreateUser}
        onClose={onCloseModalCreateUser}
        onCreateUser={onCreateUser}
      />
    </div>
  );
}
