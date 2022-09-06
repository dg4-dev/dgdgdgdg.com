import { css } from "@emotion/react";
import { useEffect, useState } from "react";

import Item from "./item";

import { flex } from "@/styles/common";

type Default = {
  url: string;
  width: number;
  height: number;
};

type Thumbnails = {
  default: Default;
  medium: Default;
  high: Default;
  standard?: Default;
  maxres?: Default;
};

type Snippet = {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: any;
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
};

type Item = {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
};

type Props = {
  kind: string;
  etag: string;
  nextPageToken: string;
  items: Item[];
  pageInfo: any;
};

const YoutubeItemList = () => {
  const itemList = css`
    width: 100%;
    flex-wrap: wrap;
  `;

  const item = css`
    .image {
      position: relative;
      height: auto;
    }
    .image::before {
      content: "";
      display: block;
      padding-top: 56.25%;
    }
    .image img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      object-fit: cover;
    }
  `;

  const [reactData, setReactData] = useState([]);
  useEffect(() => {
    fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=12&playlistId=UUS8EPayq8U-DY3508IQ8-Ow&key=AIzaSyCSLvqlklNFu_geh4sDoUhYpF1lVw8Yqz8`
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

  const youtubeItems = data.items
    ? data.items.map(
        ({
          snippet: {
            resourceId: { videoId },
            thumbnails,
            title,
          },
        }) => {
          return (
            <Item
              key={videoId}
              title={title}
              imgHref={thumbnails.high.url}
              href={`https://youtu.be/${videoId}`}
              link={true}
              css={item}
            />
          );
        }
      )
    : "Loading ...";

  return <div css={[itemList, flex]}>{youtubeItems}</div>;
};

export default YoutubeItemList;
