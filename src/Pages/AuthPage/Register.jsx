import { useRef, useState } from "react";
import Navigation from "../../Components/Navigation/Navigation";
import "./login.css";
import { Alert, Form } from "react-bootstrap";
import { useUserAuth } from "../../Context/AuthContext";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const BasicPassword = useRef("");
  const BasicConfirmPassword = useRef("");

  const [error, setError] = useState("");
  const { signUp } = useUserAuth();

  const handleSumbit = async (e) => {
    e.preventDefault();
    setError("");
    if (BasicPassword.current.value !== BasicConfirmPassword.current.value) {
      return setError("Password does not match");
    }
    try {
      await signUp(email, password, name, phone, confirmPassword, "user");
      Swal.fire("Success", "Registration successful", "success").then(() => {
        Swal.fire("Confirmation Email", "Please check your email to confirm your account", "info").then(() => {
          window.location.href = "/login";
        });
      });
    } catch {
      setError("Your email has been registered");
    }
  };

  return (
    <>
      <Navigation />
      <Form className="login" onSubmit={handleSumbit}>
        <div className="form-border">
          <h2>
            Sign Up<p className="Bline"></p>
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group id="name">
            <Form.Label>Nama :</Form.Label>
            <Form.Control type="text" controlId="formBasicName" placeholder="Full Name" required onChange={(e) => setName(e.target.value)} />
          </Form.Group>

          <Form.Group id="email">
            <Form.Label>Email :</Form.Label>
            <Form.Control type="email" controlId="formBasicEmail" placeholder="example@gmail.com" required onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group id="phone">
            <Form.Label>Phone :</Form.Label>
            <Form.Control type="text" controlId="formBasicPhone" placeholder="No Handphone" required onChange={(e) => setPhone(e.target.value)} />
          </Form.Group>

          <Form.Group id="password">
            <Form.Label>Password :</Form.Label>
            <Form.Control type="password" controlId="formBasicPassword" ref={BasicPassword} placeholder="********" required onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group id="address">
            <Form.Label>Confirm Password :</Form.Label>
            <Form.Control type="password" controlId="formBasicConfirmPassword" ref={BasicConfirmPassword} placeholder="********" required onChange={(e) => setConfirmPassword(e.target.value)} />
          </Form.Group>

          <input type="submit" value="Sign Up" />
          <div className="links">
            <a style={{ color: "#ffff" }} href="/login">
              Already Have an Account? Login
            </a>
          </div>
        </div>
      </Form>
    </>
  );
};

export default RegisterPage;
