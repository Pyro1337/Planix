import { useSelector } from "react-redux";

export function TableroPage() {
  const tableros = useSelector((state) => state.tablero.tableros);
  return (
    <>
      <div>TableroPage</div>
      {tableros &&
        tableros.map((tablero, index) => <div key={index}>{tablero}</div>)}
    </>
  );
}
