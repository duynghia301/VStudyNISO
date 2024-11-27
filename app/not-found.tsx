import Footer from "@/components/Footer";
import NotFound from "@/components/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Not found",
};

const ErrorPage = () => {
  return (
    <>
      <NotFound />
      <Footer/>
    </>
  );
};

export default ErrorPage;
