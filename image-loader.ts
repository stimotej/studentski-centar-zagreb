import convertToProxyUrl from "@/utils/convertToProxyUrl";

export default function myImageLoader({ src }: { src: string }) {
  return src.startsWith("http") ? convertToProxyUrl(src) : src;
}
