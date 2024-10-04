import { Star } from "react-bootstrap-icons";

export function TableroLayout({ children }) {
  return (
    <>
      <div className="flex flex-row items-center gap-4 bg-[#6D304D] text-white p-4 font-bold">
        <div className="text-lg">Ingeniería de Software II</div>
      </div>
      {children}
    </>
  );
}
