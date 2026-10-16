import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUI } from "@/utils/ui";

const LANGUAGES = [
  { locale: "hr", label: "HR", name: "Hrvatski" },
  { locale: "en", label: "EN", name: "English" },
] as const;

export default function LanguageSwitcher({
  className,
}: {
  className?: string;
}) {
  const router = useRouter();
  const ui = useUI();

  return (
    <div
      role="group"
      aria-label={ui("nav.language")}
      className={clsx("flex items-center text-sm", className)}
    >
      {LANGUAGES.map(({ locale, label, name }, index) => (
        <span key={locale} className="flex items-center">
          {index > 0 && (
            <span aria-hidden="true" className="text-gray-300">
              /
            </span>
          )}
          <Link
            href={router.asPath}
            locale={locale}
            lang={locale}
            title={name}
            aria-label={name}
            aria-current={router.locale === locale ? "true" : undefined}
            className={clsx(
              "px-2 py-1 rounded hover:bg-gray-100",
              router.locale === locale
                ? "text-sc font-semibold"
                : "text-gray-500",
            )}
          >
            {label}
          </Link>
        </span>
      ))}
    </div>
  );
}
