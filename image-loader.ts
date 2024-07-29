import convertToProxyUrl from "@/utils/convertToProxyUrl";

export default function myImageLoader({ src }: { src: string }) {
  return src.startsWith("http://161.53.174.14/wp-content/uploads")
    ? convertToProxyUrl(src)
    : src;
}
