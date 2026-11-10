const FormField = ({ id, label, error, children }) => {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-sm font-semibold text-[#E63946]">{error.message}</p>
      )}
    </div>
  );
};

export default FormField;
