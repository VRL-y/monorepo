import satori, { type SatoriOptions } from "satori";
import sharp from "sharp";
import { siteTitle } from "site";

export interface OgData {
  title: string;
  author?: string;
  cover?: string;
  logo?: string;
  date?: Date;
}

/**
 * Opengraph template to generate svg
 */
const Template = (props: OgData) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "100%",
      color: "#ffffff",
      background:
        "radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)",
      padding: "2rem",
      border: "5px solid #333333",
      backgroundPosition: "left",
      backgroundRepeat: "no-repeat",
      alignItems: "center",
      position: "relative",
    }}
  >
    <h1
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        flex: "1",
        padding: "2rem 1rem",
        fontSize: "3rem",
        textOverflow: "ellipsis",
        overflow: "hidden",
        fontWeight: "bold",
        wordBreak: "break-word",
      }}
    >
      {props.title}
    </h1>
    {props.cover && (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: "1",
          margin: "2.5rem",
        }}
      >
        <img
          src={props.cover}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "24px",
          }}
          alt="Cover"
        />
      </div>
    )}
    {props.logo ? (
      <img
        src={props.logo}
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          zIndex: 100,
        }}
        width={24}
        height={24}
        alt="Logo"
      />
    ) : (
      <span
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: 100,
        }}
      >
        {props.author}
      </span>
    )}
  </div>
);

/**
 * generate opengraph image with satori and return a buffer
 *
 * @param text
 */
const generateOgImage = async (
  text: string = siteTitle,
  author = "Your Company",
  date: Date = new Date(),
  cover?: string,
  logo?: string,
): Promise<Buffer> => {
  const openSansBoldRes = await fetch(
    "https://www.1001fonts.com/download/font/open-sans.extrabold.ttf",
  );
  const openSansBold = await openSansBoldRes.arrayBuffer();

  const openSansRegularRes = await fetch(
    "https://www.1001fonts.com/download/font/open-sans.regular.ttf",
  );
  const openSansRegular = await openSansRegularRes.arrayBuffer();

  const options: SatoriOptions = {
    width: 600,
    height: 315,
    embedFont: true,
    fonts: [
      {
        name: "Open Sans",
        data: openSansBold,
        weight: 900,
        style: "normal",
      },
      {
        name: "Open Sans",
        data: openSansRegular,
        weight: 600,
        style: "normal",
      },
    ],
  };

  const svg = await satori(
    Template({
      title: text,
      author: author,
      date: date,
      cover: cover,
      logo: logo,
    }),
    options,
  );

  const sharpSvg = Buffer.from(svg);

  const buffer = await sharp(sharpSvg).toBuffer();

  return buffer;
};

export default generateOgImage;
