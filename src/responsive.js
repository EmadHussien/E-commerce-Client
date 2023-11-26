import { css } from "styled-components";

export const mobile = (styles) => {
  return css`
    @media only screen and (max-width: 430px) {
      ${styles}
    }
  `;
};
