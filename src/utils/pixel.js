import ReactPixel from "react-facebook-pixel";

const PIXEL_ID = "1275880521022144";

export const initPixel = () => {
  ReactPixel.init(
    PIXEL_ID,
    {},
    {
      autoConfig: true,
      debug: process.env.NODE_ENV === "development",
    }
  );
};

export const pageView = () => ReactPixel.pageView();

export const trackEvent = (event, data = {}) => ReactPixel.track(event, data);
