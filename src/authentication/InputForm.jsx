
function InputForm({ type, id, name, placeholder, value, onChange, label, htmlFor, datatestid }) {
    return (
        <>
            <div className="form-floating mb-3">
                <input
                    type={type}
                    className="form-control"
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    data-testid={datatestid}
                    required
                />
                <label htmlFor={htmlFor}>{label}</label>
            </div>
        </>
    );
}

export default InputForm;