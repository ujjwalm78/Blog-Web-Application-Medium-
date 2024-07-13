import axios from "axios";
import { ChangeEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

function Auth({ type }: { type: "signup" | "signin" }) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        inputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt.token);
      navigate("/blogs");
    } catch (error) {
      alert("There is some error");
    }
  }
  return (
    <div className=" h-screen flex justify-center flex-col">
      <div className="flex justify-center ">
        <div>
          <div className="px-10">
            <div className="font-bold text-4xl">Create an account</div>
            <div className="font-medium text-lg text-slate-500 p-2">
              {type === "signup"
                ? "Already have an account? "
                : "Don't have an account? "}
              <Link
                className="underline"
                to={type === "signup" ? "/signin" : "/signup"}
              >
                {type === "signup" ? "Login" : "Signup"}
              </Link>
            </div>
          </div>
          <div>
            <div className="mt-5">
              {type === "signup" ? (
                <LabelledInput
                  label="Username"
                  placeholder="Enter your username"
                  onChange={(e) => {
                    setInputs({
                      ...inputs,
                      name: e.target.value,
                    });
                  }}
                />
              ) : null}
            </div>
            <div className="mt-5">
              <LabelledInput
                label="Email"
                placeholder="m@example.com"
                onChange={(e) => {
                  setInputs({
                    ...inputs,
                    email: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mt-5">
              <LabelledInput
                label="Password"
                placeholder=""
                type="password"
                onChange={(e) => {
                  setInputs({
                    ...inputs,
                    password: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <button
            onClick={sendRequest}
            type="button"
            className="mt-7 py-2.5 px-5 me-2 mb-2 text-md font-medium text-white focus:outline-none bg-slate-900 rounded-lg border border-gray-200 hover:bg-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-10 w-full"
          >
            {type === "signup" ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}
interface LabelledInterface {
  label: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: string;
}
function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInterface) {
  return (
    <div>
      <label className="block mb-2 text-sm font-bold text-base">{label}</label>
      <input
        type={type || "text"}
        id="{label}"
        className=" border border-gray-300 text-slate-400 font-medium text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
        onChange={onChange}
      />
    </div>
  );
}

export { Auth };
