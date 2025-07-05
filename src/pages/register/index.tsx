import RegisterForm from "../../components/register/registerForm";

const RegisterPage = () => {
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
        <RegisterForm />
      </div>
    </>
  );
};
export default RegisterPage;
