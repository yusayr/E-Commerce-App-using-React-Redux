import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSignin}
        className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-sm md:w-96 h-auto flex flex-col justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold mb-8 text-gray-800 text-center">
            Shopi - An Ecommerce App
          </h1>
          <h2 className="text-xl font-bold mb-6 text-center">Sign In</h2>

          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
          )}

          <div className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 shadow-sm rounded focus:outline-none focus:ring-2 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 shadow-sm rounded focus:outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-4 mt-6">
          <button
            type="submit"
            className="w-full cursor-pointer bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Sign In
          </button>

          <p className="text-sm text-center">
            Don't have an account?{" "}
            <span
              className="underline cursor-pointer text-black hover:text-gray-700"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signin;
