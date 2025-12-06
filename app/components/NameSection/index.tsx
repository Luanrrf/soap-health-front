"use client";

import { FormEvent } from "react";
import { usePageContext } from "../context";

export default function NameSection() {
  const { pageContext, setPageContext } = usePageContext();
  const { userName } = pageContext;

  const isEditing = !userName.trim();

  const enterName = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const enteredName = nameInput.value.trim();

    if (!enteredName) return;

    localStorage.setItem("name", enteredName);
    setPageContext((prev) => ({ ...prev, userName: enteredName }));
  };

  const handleChangeUser = () => {
    localStorage.removeItem("name");
    setPageContext((prev) => ({ ...prev, userName: "" }));
  };

  return (
    <div className="flex flex-col gap-6 max-w-sm mx-auto p-6 bg-[#fff5e6] rounded-xl shadow-md border border-[#ffe0b3]">
      {!isEditing && (
        <>
          <p className="text-[#b02222] font-bold text-xl text-center">
            Welcome, {userName}!
          </p>

          <button
            onClick={handleChangeUser}
            className="w-full bg-[#d62828] text-white py-2 rounded-lg text-lg font-semibold shadow-md transition active:scale-95 active:opacity-80"
          >
            Change User
          </button>
        </>
      )}

      {isEditing && (
        <form onSubmit={enterName} className="flex flex-col gap-3">
          <label htmlFor="name" className="text-[#a63c00] font-semibold text-lg">
            Please tell us your name:
          </label>

          <input
            type="text"
            id="name"
            name="name"
            className="border border-[#ffc47f] bg-white rounded-lg px-3 py-2 text-lg focus:border-[#ff9a3c] outline-none shadow-sm"
            required
          />

          <button
            type="submit"
            className="bg-[#e63946] text-white py-2 rounded-lg text-lg font-semibold shadow-md transition active:scale-95 active:opacity-80"
          >
            Save
          </button>
        </form>
      )}
    </div>
  );
}