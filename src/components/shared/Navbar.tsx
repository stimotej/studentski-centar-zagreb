import clsx from "clsx";
import Image from "next/image";
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
import CustomLink from "../elements/CustomLink";
import { useUI, type UIKey } from "@/utils/ui";

const buildNavLinks = (ui: (key: UIKey) => string) => [
  {
    key: "komercijalni",
    desktopOrder: 1,
    mobileOrder: 2,
    items: [
      { title: ui("nav.teatarTd"), href: "/teatar-td" },
      { title: ui("nav.francuskiPaviljon"), href: "/francuski-paviljon" },
      { title: ui("nav.kultura"), href: "/kultura" },
      { title: ui("nav.turizam"), href: "/turizam" },
      { title: ui("nav.catering"), href: "/catering" },
      { title: ui("nav.najamProstora"), href: "/eventi" },
      { title: ui("nav.mediji"), href: "/mediji" },
    ],
  },
  {
    key: "subvencionirani",
    desktopOrder: 2,
    mobileOrder: 1,
    items: [
      { title: ui("nav.home"), href: "/" },
      { title: ui("nav.obavijesti"), href: "/obavijesti" },
      { title: ui("nav.studentServis"), href: "/student-servis" },
      { title: ui("nav.poslovi"), href: "/poslovi" },
      { title: ui("nav.prehrana"), href: "/prehrana" },
      { title: ui("nav.smjestaj"), href: "/smjestaj" },
      { title: ui("nav.sport"), href: "/sport" },
      {
        title: ui("nav.prijava"),
        items: [
          { title: ui("nav.prijavaStudent"), href: "/prijava-student" },
          { title: ui("nav.prijavaPoslodavac"), href: "/prijava-poslodavac" },
          {
            title: ui("nav.zaposlenici"),
            href: "https://natjecaj.sczg.hr/SCSmjestaj/f4bi/login?ReturnUrl=%2FSCSmjestaj%2Ff4bi",
          },
        ],
      },
    ],
  },
];

export default function Navbar() {
  const ui = useUI();
  const navLinks = buildNavLinks(ui);

  const scrollY = useScrollPosition();
  const router = useRouter();

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 w-full transition-shadow bg-white duration-300",
        scrollY > 0 ? "shadow-md" : "shadow-none",
      )}
    >
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-6 md:px-10">
        <div className="flex items-center gap-4">
          <CustomLink href="/" aria-label={ui("nav.goHome")}>
            <Image
              src="/sc-logo.svg"
              alt="SC Logo"
              priority
              width={56}
              height={56}
            />
          </CustomLink>
          <div className="hidden [@media(min-width:350px)]:flex [@media(min-width:1110px)]:!hidden [@media(min-width:1246px)]:!flex flex-col text-sm font-medium">
            <span>{ui("org.university")}</span>
            <span className="text-sc">{ui("org.name")}</span>
          </div>
        </div>

        {/* MOBILE NAVIGATION */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              aria-label={ui("nav.openMenu")}
              className="rounded-full p-2 my-3 hover:bg-gray-200 active:bg-gray-300 [@media(min-width:1110px)]:hidden"
            >
              <MdMenu size={24} />
            </button>
          </SheetTrigger>
          <SheetContent className="w-5/6 sm:max-w-3/4 md:w-1/2 lg:max-w-sm overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="sr-only">{ui("nav.main")}</SheetTitle>
              <SheetDescription className="sr-only">
                {ui("nav.menuDescription")}
              </SheetDescription>
            </SheetHeader>

            <nav aria-label={ui("nav.main")} dir="ltr">
              {navLinks
                .sort((a, b) => a.mobileOrder - b.mobileOrder)
                .map((group) => (
                  <ul key={group.key} className="flex flex-col p-4">
                    {group.items.map((link) =>
                      "items" in link ? (
                        <li key={link.title}>
                          <Collapsible
                            defaultOpen={link.items!.some(
                              (i) => i.href === router.pathname,
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
                                {link.items!.map((item) => (
                                  <li key={item.href} className="w-full">
                                    <SheetClose asChild>
                                      <CustomLink
                                        href={item.href}
                                        className={clsx(
                                          "ml-8 text-sm px-6 py-3 hover:bg-gray-100 flex",
                                          router.pathname == item.href
                                            ? "text-sc"
                                            : "text-gray-500",
                                        )}
                                      >
                                        {item.title}
                                      </CustomLink>
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
                            <CustomLink
                              href={link.href}
                              className={clsx(
                                "text-sm px-6 py-3 hover:bg-gray-100 flex border-gray-100",
                                router.pathname == link.href
                                  ? "text-sc"
                                  : "text-gray-500",
                              )}
                            >
                              {link.title}
                            </CustomLink>
                          </SheetClose>
                        </li>
                      ),
                    )}
                  </ul>
                ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* DESKTOP NAVIGATION */}
        <NavigationMenu
          aria-label={ui("nav.main")}
          className="hidden [@media(min-width:1110px)]:flex flex-col justify-center items-end"
        >
          {navLinks
            .sort((a, b) => a.desktopOrder - b.desktopOrder)
            .map((group) => (
              <NavigationMenuList
                key={group.key}
                className="flex items-center justify-center h-8"
              >
                {group.items.map((link, index) =>
                  "items" in link ? (
                    <NavigationMenuItem key={index} className="relative">
                      <NavigationMenuTrigger
                        className={clsx(
                          "cursor-default text-sm flex gap-1 items-center px-3 py-2 h-8 flex-shrink-0",
                          link.items!.some((i) => i.href === router.pathname)
                            ? "text-sc"
                            : "text-gray-500",
                        )}
                      >
                        {link.title}
                        <MdExpandMore aria-hidden={true} size={16} />
                      </NavigationMenuTrigger>
                      <NavigationMenuContent
                        className={clsx(
                          "absolute top-full right-0 rounded-lg shadow-lg z-50 bg-white flex flex-col",
                          "data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out",
                        )}
                      >
                        {link.items!.map((item) => (
                          <CustomLink
                            key={item.href}
                            href={item.href}
                            className={clsx(
                              "text-sm px-6 py-3 hover:bg-gray-100 last:rounded-b-lg first:rounded-t-lg whitespace-nowrap",
                              router.pathname == item.href
                                ? "text-sc"
                                : "text-gray-500",
                            )}
                          >
                            {item.title}
                          </CustomLink>
                        ))}
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink asChild>
                        <CustomLink
                          href={link.href}
                          className={clsx(
                            "text-sm px-3 py-2 h-8 flex-shrink-0",
                            router.pathname == link.href
                              ? "text-sc"
                              : "text-gray-500 hover:text-gray-400",
                          )}
                        >
                          {link.title}
                        </CustomLink>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ),
                )}
              </NavigationMenuList>
            ))}
        </NavigationMenu>
      </div>
    </div>
  );
}
