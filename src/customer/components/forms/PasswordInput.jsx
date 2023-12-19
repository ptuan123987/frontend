import React, { useState } from "react";

const PasswordInput = ({ label, value, onChange, error, ...attrs  }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        className="block px-2.5 pb-2.5 pt-5 w-full text-sm text-black border border-black appearance-none focus:outline-none focus:border-black focus:ring-0 peer"
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        required
        {...attrs}
      />

      <label
        className="absolute text-black font-black 
        font-UdemySansBold text-sm duration-300 
        transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75 peer-focus:-translate-y-4"
      >
        {label}
      </label>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 z-99">
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-gray-500 focus:outline-none"
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path
                fillRule="evenodd"
                d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
              <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
              <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
            </svg>
          )}
        </button>
      </div>

      {error && <div className="text-red-600">{error}</div>}

      {attrs.children}
    </div>
  );
};

export default PasswordInput;
