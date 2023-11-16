import Navigation from "../../Components/Navigation/Navigation";

function LoginPage() {
  return (
    <>
      <Navigation />
      <form className="login">
        <div className="form-border">
          <h2>SCTK Links</h2>
          <p>Forgot your password? Enter your email to reset it.</p>
          <input type="email" placeholder="Email" required />
          <input type="submit" value="Reset Password" />
          <div className="links">
            <a href="/login">Back to Login/Signup</a>
          </div>
        </div>
      </form>
    </>
  );
}

export default LoginPage;
