import { useState } from "react";
import "./login.css";
import { Form } from "react-bootstrap";
import { useUserAuth } from "../../Context/AuthContext";
import Navigation from "../../Components/Navigation/Navigation";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const { logIn } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      Swal.fire("Welcome to SCTK Links").then(() => {
        window.location.href = "/";
      });
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      <Navigation />
      <Form className="login" onSubmit={handleSubmit}>
        <div className="form-border">
          <h2>
            Sign In<p className="Bline"></p>
          </h2>
          <p className="parag">Please log in</p>
          {error && <span className="wrong-login centered fw-bold">Wrong email or password!</span>}
          <Form.Group id="email">
            <Form.Label>Email :</Form.Label>
            <Form.Control type="email" controlId="formBasicEmail" placeholder="example@gmail.com" required onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group id="password">
            <Form.Label>Password :</Form.Label>
            <Form.Control type="password" controlId="formBasicPassword" placeholder="********" required onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <div className="links">
            <label>
              <input type="checkbox" defaultChecked />
              Remember Me
            </label>
            <a href="/forgot">Forgot Password?</a>
          </div>
          <input type="submit" value="Log In" />
          <div className="links-register centered">
            <small style={{ marginRight: "5px" }}>Dont have an account? </small>
            <a style={{ color: "#ffff" }} href="/register">
              Join Us
            </a>
          </div>
        </div>
      </Form>
    </>
  );
};

export default LoginPage;
