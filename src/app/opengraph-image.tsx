import { ImageResponse } from "next/og";

export const alt = "Emmanuel Lubwama — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#013e37",
          padding: 72,
        }}
      >
        <div
          style={{
            width: 56,
            height: 4,
            borderRadius: 2,
            background: "#ffefb3",
            marginBottom: 36,
          }}
        />
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#ffefb3",
            letterSpacing: -2,
            lineHeight: 1.05,
            maxWidth: 900,
          }}
        >
          Emmanuel Lubwama
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgba(255, 239, 179, 0.75)",
            marginTop: 20,
            fontWeight: 400,
          }}
        >
          Software engineer — React Native, Next.js, Node.js
        </div>
      </div>
    ),
    { ...size },
  );
}
