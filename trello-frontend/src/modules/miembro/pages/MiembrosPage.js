export function MiembrosPage() {
  return (
    <div className="flex justify-center w-full py-2 px-8 -mx-8">
      <div className="mt-4 w-3/5">
        <h1 className="text-lg font-bold mb-2">Colaboradores</h1>
        <div className="border-b border-custom-text py-6">
          <h2 className="text-base font-bold mb-2">
            Miembros del espacio de trabajo (2)
          </h2>
          <p>
            Los miembros del Espacio de trabajo pueden ver todos los tableros
            visibles para el Espacio de trabajo, unirse a ellos y crear nuevos
            tableros en el Espacio de trabajo.
          </p>
        </div>
        <div className="border-b border-custom-text py-6">
          <h2 className="text-base font-bold mb-2">
            Invita a los miembros a unirse
          </h2>
          <div className="flex flex-row gap-2 justify-between">
            <p className="w-3/4">
              Cualquiera que tenga un enlace de invitación puede unirse a este
              Espacio de trabajo gratuito. También puedes deshabilitar y crear
              un nuevo enlace de invitación para este Espacio de trabajo en
              cualquier momento. Las invitaciones pendientes cuentan para el
              límite de 10 colaboradores.
            </p>
            <button className="w-1/4">Invitar mediante enlace</button>
          </div>
        </div>
      </div>
    </div>
  );
}
