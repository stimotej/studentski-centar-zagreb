import Link from "next/link";
import type { ComponentProps } from "react";

export default function CustomLink(props: ComponentProps<typeof Link>) {
  return <Link {...props} prefetch={props.prefetch ?? false} />;
}
