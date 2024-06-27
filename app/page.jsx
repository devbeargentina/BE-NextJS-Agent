import Wrapper from "@/components/layout/Wrapper";
// import MainHome from "../app/(others)/login";
import ModalSigninSignup from "@/components/header/ModalSigninSignup";

export const metadata = {
  title: "Home-3 || BE - Argentina - Travel & Tour React NextJS Template",
  description: "BE - Argentina - Travel & Tour React NextJS Template",
};

export default function Home() {
  return (
    <>
      <Wrapper>
        <ModalSigninSignup />
      </Wrapper>
    </>
  );
}
