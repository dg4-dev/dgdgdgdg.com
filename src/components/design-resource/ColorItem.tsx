import { css } from "@emotion/react";

import { breakPoint, dg4Color } from "@/styles/config";

const ColorItem = ({ color }: { color: string }) => {
  const colorItem = css`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    color: #fff;
    padding: 16px 12px;
    border-radius: 8px;
    margin: 4px;

    background-color: ${dg4Color[color]};

    ${breakPoint.sp} {
      height: 120px;
    }
  `;

  const colorItemText = css`
    width: fit-content;
    height: fit-content;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    text-align: center;
    font-size: 20px;
    .hex {
      opacity: 0.7;
      font-weight: bold;
    }
    .name {
      margin-top: 12px;
      font-weight: bold;
    }
  `;

  return (
    <div className={`color-item-${color}`} css={colorItem}>
      <div css={[colorItemText]}>
        <p className="hex">{dg4Color[color]}</p>
        <p className="name">dg4Color.{color}</p>
      </div>
    </div>
  );
};

export default ColorItem;
