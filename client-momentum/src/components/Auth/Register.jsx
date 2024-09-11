import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../index";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="register">
      <form action="#" className="register-form">
        <section className="title">
          <p>Create an Account</p>
          <i className="fa-solid fa-square-xmark" />
        </section>
        <section className="wrapper">
          <section className="left">
            <section className="phone">
              <section className="label">
                <p>Register as</p>
              </section>
              <section className="phoneinput">
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
              </section>
            </section>
            {/* name input */}
            <section className="phone">
              <section className="label">
                <p>Name</p>
              </section>
              <input
                type="text"
                className="phoneinput"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </section>

            <section className="phone">
              <section className="label">
                <p>Phone number</p>
              </section>
              <input
                className="phoneinput"
                type="number"
                placeholder="1234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </section>
          </section>
          {/* right section */}
          <section className="right">
            {/* email input */}
            <section className="email">
              <section className="label">
                <p>Email Id</p>
              </section>
              <input
                type="email"
                className="emailinput"
                placeholder="abc@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </section>
            {/* phone number input */}
            <section className="phone">
              <section className="label">
                <p>Password</p>
              </section>
              <input
                type="password"
                className="phoneinput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </section>
          </section>
        </section>

        <section className="buttons">
          <p>
            Already have an account <a href="/login">Login</a>
          </p>

          <button className="add" type="submit" onClick={handleRegister}>
            Signup
          </button>
        </section>
      </form>
      <div className="photo">
        <img src="cover.jpeg" alt="signup" />
      </div>
    </div>
  );
};

export default SignUp;
