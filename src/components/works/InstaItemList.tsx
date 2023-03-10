/* eslint-disable @next/next/no-img-element */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";

import { instaDummy } from "@/api/instaDummy";
import { breakPoint } from "@/styles/config";

type Cursors = {
  before: string;
  after: string;
};

type Datum = {
  media_url?: string;
  permalink: string;
  id: string;
};

type Paging = {
  cursors: Cursors;
  next: string;
};

type Media = {
  data: Datum[];
  paging: Paging;
};

type Props = {
  name: string;
  media: Media;
  id: string;
};

const InstaItemList = () => {
  const itemList = css`
    width: 100%;

    display: flex;
    flex-wrap: wrap;
  `;

  const instaItem = css`
    width: calc(100% / 7);
    height: auto;

    ${breakPoint.tab} {
      width: calc(100% / 3);
    }

    a {
      display: block;
      width: 100%;
      height: 100%;
    }
  `;

  const [reactData, setReactData] = useState([]);
  useEffect(() => {
    fetch(
      `https://graph.facebook.com/v3.0/17841445773642608?fields=name%2Cmedia.limit(30)%7Bmedia_url%2Cpermalink%7D&access_token=EABFZByCZAxiGABAIRfTq7Ed6i1aSv29Ybhfa9gZCa5eDy7OQlMDjyYKznYicaChlUJMRmD3Lb7hOFDRhsv0pryvZBTHZAjZAUUZCZC1Xgbb20mJIHpge1Gvp7P0I7kwvqZCt0xyfvwwGjVuJ7Y1ZAfyZAWgUf0Xg9ZAcNaZBhVUtAExWYp2LqkZCPrlYAV`
    )
      .then((res) => res.json())
      .then((data) => {
        setReactData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const dataRaw = reactData as unknown;
  const data = dataRaw as Props;

  const instaPostCount = 21;

  const useData: Datum[] = data.id
    ? data.media.data.filter(({ permalink }) => !permalink.includes("reel"))
    : instaDummy;

  const instaItems = [...Array(instaPostCount)].map((_, i) => {
    const instaData = useData[i];

    return (
      <div key={instaData.id} css={instaItem}>
        <a href={instaData.permalink} target="_blank" rel="noopener noreferrer">
          <img src={instaData.media_url} alt="" />
        </a>
      </div>
    );
  });

  return <div css={itemList}>{instaItems}</div>;
};

export default InstaItemList;
