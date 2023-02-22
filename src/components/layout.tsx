import Head from "next/head";
import { useRouter } from "next/router";

import Footer from "@/components/footer";
import Header from "@/components/header";
import Loading from "@/components/loading";

type Props =
  | {
      children: React.ReactNode;
      title: string;
      description?: undefined;
      noindex: true;
    }
  | {
      children: React.ReactNode;
      title: string;
      description: string;
      noindex?: false;
    };

const Layout = ({ children, title, description, noindex = false }: Props) => {
  const location = useRouter();
  const nowUrl = `https://dgdgdgdg.com${location.pathname}`;
  return (
    <>
      <Head>
        <link rel="icon" href="/images/favicon.ico" />
        <title>{title}</title>

        {noindex ? (
          <meta name="robots" content="noindex" />
        ) : (
          <>
            <meta name="description" content={description} />
            <meta name="og:url" content={nowUrl} />
            <meta name="og:title" content={title} />
            <meta name="og:description" content={description} />

            {/* ogp image */}
            <meta name="og:image" content="https://dgdgdgdg.com/images/ogp.webp" />

            {/* Facebook OGP Settings */}
            <meta property="fb:admins" content="2006199369534363" />

            {/* Twitter OGP Settings */}
            <meta name="twitter:creator" content="@dg4_design" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content="https://dgdgdgdg.com/images/ogp.webp" />
          </>
        )}
      </Head>

      <Loading />

      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
};

export default Layout;
