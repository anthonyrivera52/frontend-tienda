import LoginForm from "../../components/login/loginForm";

const LoginPage: React.FC = () => {
  return (
    <>
      <div
        className="bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=1350&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <LoginForm />
      </div>
    </>
  );
};
export default LoginPage;
