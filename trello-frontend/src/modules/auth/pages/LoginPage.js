import { ReactComponent as Google } from "../../auth/icons/icons8-google.svg";

export function LoginPage() {
  const login_loading = false;
  const submitIsDisabled = () => {
    return false;
  };
  const onLoginPress = () => {
    console.log("Inicio de sesión");
  };
  const renderForm = () => {
    return (
      <div className="flex flex-col items-center p-6 shadow-lg rounded-lg shadow/lg bg-white gap-4 w-[400px]">
        <div className="text-4xl p-4 px-20 font-bold text-gray-700">Trello</div>
        <span className="font-semibold text-gray-700">
          Iniciar sesión para continuar
        </span>
        {!login_loading && (
          <form
            onSubmit={onLoginPress}
            className={"w-full flex flex-col gap-8"}
          >
            <div className="flex flex-col gap-2 text-gray-600">
              <div className="input flex flex-col gap-2">
                <input
                  className="py-2 px-2 rounded border focus:border-blue-700 focus:outline-none"
                  type="text"
                  placeholder="Introduce tu correo electrónico"
                />
              </div>
              {true && (
                <div className="input flex flex-col gap-2">
                  <input
                    className="py-2 px-2 rounded border focus:border-blue-700 focus:outline-none"
                    type="password"
                    placeholder="Introducir contraseña"
                  />
                </div>
              )}
              <div className="input flex flex-col ">
                <button
                  disabled={false}
                  type="submit"
                  className={`bg-opacity-100 hover:duration-75 hover:bg-blue-800 bg-blue-700 text-white font-semibold leading-6 text-md py-2 px-4 rounded transition-all ease-linear duration-400 `}
                >
                  Iniciar sesión
                </button>
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
