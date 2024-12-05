// import convertToProxyUrl from "@/utils/convertToProxyUrl";

// export default function myImageLoader({ src }: { src: string }) {
//   return src.startsWith("http://161.53.174.14/wp-content/uploads")
//     ? convertToProxyUrl(src)
//     : src;
// }

export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const newSrc = src
    .replace("161.53.174.14", "www.sczg.unizg.hr")
    .replace("http://www.sczg.unizg.hr", "https://www.sczg.unizg.hr");
  return `${newSrc}?w=${width}&q=${quality || 75}`;
}
