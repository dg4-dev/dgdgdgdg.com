import { Global } from "@emotion/react";
import Head from "next/head";
import { useRouter } from "next/router";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import global from "@/styles/global";
import reset from "@/styles/reset";

type Props =
  | {
      children: React.ReactNode;
      title: string;
      description?: undefined;
      noindex: true;
    }
  | {
      children: React.ReactNode;
      title?: string;
      description: string;
      noindex?: false;
    };

const Layout = ({ children, title, description, noindex = false }: Props) => {
  const location = useRouter();
  const nowUrl = `https://dgdgdgdg.com${location.pathname}`;

  // トップページならtitleLongを「dgdgdgdg | 宮城県でデザイン、映像制作、Web制作をしている"だがし"です。」にする
  // それ以外はtitleLongを「${title} | dgdgdgdg」にする
  const titleLong =
    location.pathname === "/"
      ? `dgdgdgdg | 宮城県でデザイン、映像制作、Web制作をしている"だがし"です。`
      : `${title} | dgdgdgdg`;

  return (
    <>
      <Global styles={[reset, global]} />

      <Head>
        <link rel="icon" href="/images/favicon.ico" />
        <title>{titleLong}</title>

        {noindex ? (
          <meta name="robots" content="noindex" />
        ) : (
          <>
            <meta name="description" content={description} />
            <meta name="og:url" content={nowUrl} />
            <meta name="og:title" content={titleLong} />
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

      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
};

export default Layout;
