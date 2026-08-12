import { Metadata } from "next";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
const Login = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get("jwtToken")?.value;
  if (token) {
    redirect("/");
  }
  return (
    <section className="fix_height container m-auto px-7 flex items-center justify-center">
      <div className="m-auto bg-white rounded-lg p-5 w-full md:w-2/3">
        <h1 className="text-3xl font-bold text-gray-800 mb-5">Login</h1>
        <LoginForm />
      </div>
    </section>
  );
};

export default Login;

export const metadata: Metadata = {
  title: "Login",
  description: "This is Login",
};
