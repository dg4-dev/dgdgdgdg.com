import { css } from "@emotion/react";

import type { NextPage } from "next";

import Container from "@/components/container";
import H2 from "@/components/heading/h2";
import H3 from "@/components/heading/h3";
import Layout from "@/components/layout";
import { dg4Color } from "@/styles/config";

const heading3 = css`
  .en {
    font-size: 24px;
    font-weight: bold;
    line-height: 1.2em;
  }
`;

const item = css`
  font-size: 16px;
  line-height: 2em;
  ul {
    padding-top: 8px;
    padding-left: 24px;
  }
`;

const link = css`
  word-break: break-all;
  font-size: 16px;
  color: ${dg4Color.cyan};
  text-decoration: underline;
  transition: all 0.3s;

  :hover {
    opacity: 0.5;
    transition: all 0.3s;
  }
`;

const Privacy: NextPage = () => {
  return (
    <Layout title="Privacy Policy | dgdgdgdg" noindex={true}>
      <section id="privacy">
        <Container>
          <H2 en="Privacy Policy" ja="プライバシーポリシー" />
          <div className="content">
            <H3 en="お客様から取得する情報" css={heading3} />
            <div css={item}>
              当社は、お客様から以下の情報を取得します。
              <ul>
                <li>メールアドレス</li>
                <li>
                  外部サービスでお客様が利用するID、その他外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報
                </li>
                <li>Cookie(クッキー)を用いて生成された識別情報</li>
                <li>OSが生成するID、端末の種類、端末識別子等のお客様が利用するOSや端末に関する情報</li>
              </ul>
            </div>
          </div>
          <div className="content">
            <H3 en="お客様の情報を利用する目的" css={heading3} />
            <div css={item}>
              当社は、お客様から取得した情報を、以下の目的のために利用します。
              <ul>
                <li>当社サービスにおけるお客様の行動履歴を分析し、当社サービスの維持改善に役立てるため</li>
                <li>お客様からのお問い合わせに対応するため</li>
                <li>当社の規約や法令に違反する行為に対応するため</li>
                <li>以上の他、当社サービスの提供、維持、保護及び改善のため</li>
              </ul>
            </div>
          </div>
          <div className="content">
            <H3 en="第三者提供" css={heading3} />
            <div css={item}>
              当社は、お客様から取得する情報のうち、個人データ（個人情報保護法第２条第６項）に該当するものついては、あらかじめお客様の同意を得ずに、第三者（日本国外にある者を含みます。）に提供しません。
              <br />
              但し、次の場合は除きます。
              <ul>
                <li>個人データの取扱いを外部に委託する場合</li>
                <li>当社や当社サービスが買収された場合</li>
                <li>事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）</li>
                <li>その他、法律によって合法的に第三者提供が許されている場合</li>
              </ul>
            </div>
          </div>
          <div className="content">
            <H3 en="アクセス解析ツール" css={heading3} />
            <div css={item}>
              当社は、お客様のアクセス解析のために、「Googleアナリティクス」を利用しています。Googleアナリティクスは、トラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすれば、これらの情報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。Googleアナリティクスについて、詳しくは以下からご確認ください。
              <ul>
                <a
                  css={link}
                  href="https://marketingplatform.google.com/about/analytics/terms/jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://marketingplatform.google.com/about/analytics/terms/jp/
                </a>
              </ul>
            </div>
          </div>
          <div className="content">
            <H3 en="プライバシーポリシーの変更" css={heading3} />
            <div css={item}>
              当社は、必要に応じて、このプライバシーポリシーの内容を変更します。この場合、変更後のプライバシーポリシーの施行時期と内容を適切な方法により周知または通知します。
            </div>
          </div>
          <div className="content">
            <H3 en="お問い合わせ" css={heading3} />
            <div css={item}>
              お客様の情報の開示、情報の訂正、利用停止、削除をご希望の場合は、以下のメールアドレスにご連絡ください。
              <br />
              e-mail
              <ul>
                <a css={link} href="mailto:info@dgdgdgdg.com">
                  info@dgdgdgdg.com
                </a>
              </ul>
              この場合、必ず、運転免許証のご提示等当社が指定する方法により、ご本人からのご請求であることの確認をさせていただきます。なお、情報の開示請求については、開示の有無に関わらず、ご申請時に一件あたり1,000円の事務手数料を申し受けます。
            </div>
          </div>
          <div className="content">
            <H3 en="事業者の名称" css={heading3} />
            <div css={item}>dgdgdgdg</div>
          </div>
          <div className="content">
            <div css={item}>2021年07月09日 制定</div>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default Privacy;
