import ReactPixel from "react-facebook-pixel";

const PIXEL_ID = "";

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
