import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdMenu, MdExpandMore } from "react-icons/md";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../elements/Sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { FaChevronDown } from "react-icons/fa";

const navLinks = [
  { title: "Početna", href: "/" },
  { title: "Obavijesti", href: "/obavijesti" },
  { title: "Student servis", href: "/student-servis" },
  { title: "Poslovi", href: "/poslovi" },
  { title: "Prehrana", href: "/prehrana" },
  {
    title: "Smještaj",
    items: [
      { title: "Studentski", href: "/smjestaj" },
      { title: "Turistički", href: "/turizam" },
    ],
  },
  { title: "Kultura", href: "/kultura" },
  { title: "Sport", href: "/sport" },
  { title: "Mediji", href: "/mediji" },
  { title: "Francuski paviljon", href: "/francuski-paviljon" },
  {
    title: "Prijava",
    items: [
      { title: "Prijava student", href: "/prijava-student" },
      { title: "Prijava poslodavac", href: "/prijava-poslodavac" },
    ],
  },
] as const;

export default function Navbar() {
  const scrollY = useScrollPosition();
  const router = useRouter();

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 flex w-full items-center justify-between bg-white px-6 md:px-10 transition-shadow duration-300",
        scrollY > 0 ? "shadow-md" : "shadow-none"
      )}
    >
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image
            src="/sc-logo.svg"
            alt="SC Logo"
            priority
            width={56}
            height={56}
          />
        </Link>
        <div className="hidden [@media(min-width:350px)]:flex [@media(min-width:1024px)]:!hidden [@media(min-width:1220px)]:!flex flex-col text-sm font-medium">
          <span>Sveučilište u Zagrebu</span>
          <span className="text-sc">Studentski centar u Zagrebu</span>
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      <Sheet>
        <SheetTrigger asChild>
          <button
            aria-label="Otvori navigaciju"
            className="rounded-full p-2 my-3 hover:bg-gray-200 active:bg-gray-300 lg:hidden"
          >
            <MdMenu size={24} />
          </button>
        </SheetTrigger>
        <SheetContent className="w-5/6 sm:max-w-3/4 md:w-1/2 lg:max-w-sm overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="sr-only">Glavna navigacija</SheetTitle>
            <SheetDescription className="sr-only">
              Izbornik glavne navigacije stranice. Koristite tipkovnicu ili miš
              za odabir željene stranice.
            </SheetDescription>
          </SheetHeader>

          <nav aria-label="Glavna navigacija" dir="ltr">
            <ul className="flex flex-col p-4">
              {navLinks.map((link) =>
                "items" in link ? (
                  <li key={link.title}>
                    <Collapsible
                      defaultOpen={link.items.some(
                        (i) => i.href === router.pathname
                      )}
                    >
                      <CollapsibleTrigger className="flex items-center justify-between gap-2 w-full px-6 py-3 cursor-default text-sm text-gray-500 hover:cursor-pointer hover:bg-gray-100 data-[state=open]:bg-gray-100 [&[data-state=open]>svg]:rotate-180 data-[state=open]:text-black">
                        {link.title}
                        <FaChevronDown
                          aria-hidden={true}
                          size={12}
                          className="text-gray-500 transition-transform"
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <ul>
                          {link.items.map((item) => (
                            <li key={item.href} className="w-full">
                              <SheetClose asChild>
                                <Link
                                  href={item.href}
                                  className={clsx(
                                    "ml-8 text-sm px-6 py-3 hover:bg-gray-100 flex",
                                    router.pathname == item.href
                                      ? "text-sc"
                                      : "text-gray-500"
                                  )}
                                >
                                  {item.title}
                                </Link>
                              </SheetClose>
                            </li>
                          ))}
                        </ul>
                      </CollapsibleContent>
                    </Collapsible>
                  </li>
                ) : (
                  <li key={link.title} className="w-full">
                    <SheetClose asChild>
                      <Link
                        href={link.href}
                        className={clsx(
                          "text-sm px-6 py-3 hover:bg-gray-100 flex border-gray-100",
                          router.pathname == link.href
                            ? "text-sc"
                            : "text-gray-500"
                        )}
                      >
                        {link.title}
                      </Link>
                    </SheetClose>
                  </li>
                )
              )}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>

      {/* DESKTOP NAVIGATION */}
      <NavigationMenu
        aria-label="Glavna navigacija"
        className="hidden lg:block"
      >
        <NavigationMenuList className="flex items-center gap-5 justify-center">
          {navLinks.map((link, index) =>
            "items" in link ? (
              <NavigationMenuItem key={index} className="relative">
                <NavigationMenuTrigger
                  className={clsx(
                    "cursor-default text-sm flex gap-1 items-center py-6",
                    link.items.some((i) => i.href === router.pathname)
                      ? "text-sc"
                      : "text-gray-500"
                  )}
                >
                  {link.title}
                  <MdExpandMore aria-hidden={true} size={16} />
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  className={clsx(
                    "absolute top-full right-0 rounded-lg shadow-lg bg-white flex flex-col",
                    "data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out"
                  )}
                >
                  {link.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={clsx(
                        "text-sm px-6 py-3 hover:bg-gray-100 last:rounded-b-lg first:rounded-t-lg whitespace-nowrap",
                        router.pathname == item.href
                          ? "text-sc"
                          : "text-gray-500"
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink asChild>
                  <Link
                    href={link.href}
                    className={clsx(
                      "text-sm py-6",
                      router.pathname == link.href
                        ? "text-sc"
                        : "text-gray-500 hover:text-gray-400"
                    )}
                  >
                    {link.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
