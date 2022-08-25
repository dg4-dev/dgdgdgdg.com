import Head from "next/head";

import Footer from "@/components/footer";
import Header from "@/components/header";

type Props = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
};

const Layout = ({ children, title, description }: Props) => {
  const pageTitle = title ? `${title} | dgdgdgdg` : "dgdgdgdg";
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description || "This is dgdgdgdg's page."} />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <Header></Header>

      <main>{children}</main>

      <Footer></Footer>
    </>
  );
};

export default Layout;
