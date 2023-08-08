import { css } from "@emotion/react";

import { breakPoint, dg4Color } from "@/styles/config";

const meaningRaw: {
  phrase: string;
  mean: [string, ...string[]];
}[] = [
  {
    phrase: "4",
    mean: ["四季", ".mp4", "四次元", "四則演算"],
  },
  {
    phrase: "dgdg",
    mean: ["ドラムの音"],
  },
  {
    phrase: "deep",
    mean: ["深い", "奥行きのある"],
  },
  {
    phrase: "駄菓子",
    mean: ["多種多様", "多方面"],
  },
  {
    phrase: "dig",
    mean: ["調べる", "発掘する"],
  },
  {
    phrase: "digital",
    mean: ["デジタル"],
  },
  {
    phrase: "delight",
    mean: ["喜び", "楽しみ"],
  },
  {
    phrase: "design",
    mean: ["デザイン"],
  },
  { phrase: "geek", mean: ["オタク"] },
];

const meaningItemElm = meaningRaw.map((value) => {
  const meaningBit = css`
    width: fit-content;
    padding: 0 24px;
  `;

  const meaningPhrase = css`
    white-space: nowrap;
    font-family: "Dont", sans-serif;
    font-size: 64px;
    margin-bottom: 16px;

    ${breakPoint.sp} {
      font-size: 56px;
    }
  `;

  const cyan = css`
    color: ${dg4Color.cyan};
  `;

  const noto = css`
    font-family: "Zen Kaku Gothic New", sans-serif;
    font-weight: bold;
  `;

  const meaningPara = css`
    white-space: nowrap;
    line-height: 24px;
  `;

  const meaningPhraseElms = value.phrase.split("").map((letter) => {
    const random = Math.floor(Math.random() * 1000);

    if (letter.match(/[dg4]/g)) {
      return (
        <span key={letter + random} css={cyan}>
          {letter}
        </span>
      );
    } else if (letter.match(/[駄菓子]/g)) {
      return (
        <span key={letter + random} css={[cyan, noto]}>
          {letter}
        </span>
      );
    } else {
      return <span key={letter + random}>{letter}</span>;
    }
  });

  const meaningParaElm = value.mean.map((meanParaItem) => (
    <>
      {meanParaItem}
      <br />
    </>
  ));

  return (
    <li key={value.phrase} css={meaningBit}>
      <div css={meaningPhrase}>{meaningPhraseElms}</div>
      <p css={meaningPara}>{meaningParaElm}</p>
    </li>
  );
});

export default meaningItemElm;
