export function InputText({
  type = "text",
  extraClass = "",
  placeholder = "Buscar...",
  ariaLabel = "Buscar",
  onChange = null,
}) {
  return (
    <input
      type={type}
      className={`border border-gray-600 px-2 py-1 rounded bg-custom-body ${extraClass}`}
      placeholder={placeholder}
      aria-label={ariaLabel}
      onChange={onChange}
    />
  );
}
