import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp forceRedirectUrl="/" />
    </div>
  );
};

export default SignUpPage;
