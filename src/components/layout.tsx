import Head from "next/head";

import Footer from "@/components/footer";
import Header from "@/components/header/header";

type Props = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
};

const Layout = ({ children, title, description }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <Header></Header>

      <main>{children}</main>

      <Footer></Footer>
    </>
  );
};

export default Layout;
