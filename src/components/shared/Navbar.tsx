import React, { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdMenu, MdExpandMore } from "react-icons/md";
import { useAuth } from "@/providers/auth";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { name: "Početna", href: "/", protected: false },
  { name: "Obavijesti", href: "/obavijesti", protected: false },
  { name: "Student servis", href: "/student-servis", protected: false },
  { name: "Poslovi", href: "/poslovi", protected: false },
  { name: "Prehrana", href: "/prehrana", protected: false },
  { name: "Smještaj", href: "/smjestaj", protected: false },
  { name: "Kultura", href: "/kultura", protected: false },
  { name: "Sport", href: "/sport", protected: false },
  { name: "Mediji", href: "/mediji", protected: false },
  { name: "Francuski paviljon", href: "/francuski-paviljon", protected: false },
];

const Navbar = () => {
  const scrollY = useScrollPosition();

  const [opened, setOpened] = useState(false);

  const { user, logout } = useAuth();

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
        <div className="hidden [@media(min-width:360px)]:flex [@media(min-width:800px)]:hidden [@media(min-width:1200px)]:!flex flex-col text-sm font-medium">
          <span>Sveučilište u Zagrebu</span>
          <span className="text-sc">Studentski centar u Zagrebu</span>
        </div>
      </div>
      <nav className="hidden items-center gap-5 [@media(min-width:1000px)]:flex">
        {navLinks.map((link) =>
          link.protected ? (
            user ? (
              <NavLink key={link.name} title={link.name} href={link.href} />
            ) : null
          ) : (
            <NavLink key={link.name} title={link.name} href={link.href} />
          )
        )}
        {user ? (
          <Dropdown title={user.displayName || ""}>
            <button
              onClick={logout}
              className={clsx(
                "px-6 py-3 text-sm hover:bg-gray-100 last:rounded-b-lg text-gray-500 first:rounded-t-lg whitespace-nowrap"
              )}
            >
              Odjava
            </button>
          </Dropdown>
        ) : (
          <Dropdown title="Prijava">
            <NavLink
              title="Prijava student"
              href="https://natjecaj.sczg.hr/student"
              isDropdownItem
            />
            <NavLink
              title="Prijava poslodavac"
              href="/prijava-poslodavac"
              isDropdownItem
            />
          </Dropdown>
        )}
      </nav>
      <div className="py-3 [@media(min-width:1000px)]:hidden">
        <button
          className="rounded-full p-2 hover:bg-gray-200 active:bg-gray-300"
          onClick={() => setOpened((isOpened) => !isOpened)}
        >
          <MdMenu size={24} />
        </button>
      </div>

      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0, transformOrigin: "top" }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            className="[@media(min-width:1000px)]:hidden shadow-xl fixed top-16 left-6 right-6 rounded-lg bg-white z-50"
          >
            <div className="flex flex-col ">
              {navLinks.map((link) =>
                link.protected ? (
                  user ? (
                    <NavLink
                      key={link.name}
                      title={link.name}
                      href={link.href}
                      isDropdownItem
                    />
                  ) : null
                ) : (
                  <NavLink
                    key={link.name}
                    title={link.name}
                    href={link.href}
                    isDropdownItem
                  />
                )
              )}
              {user ? (
                <>
                  <div className="px-6 py-3 cursor-default text-sm text-text bg-gray-100">
                    {user.displayName}
                  </div>
                  <button
                    onClick={logout}
                    className={clsx(
                      "text-sm text-left px-6 py-3 text-gray-500 ml-12 hover:bg-gray-100 last:rounded-br-lg whitespace-nowrap"
                    )}
                  >
                    Odjava
                  </button>
                </>
              ) : (
                <>
                  <div className="px-6 py-3 cursor-default text-sm text-text bg-gray-100">
                    Prijava
                  </div>
                  <NavLink
                    title="Prijava student"
                    href="https://natjecaj.sczg.hr/student"
                    isDropdownItem
                    className="ml-12 last:rounded-br-lg"
                  />
                  <NavLink
                    title="Prijava poslodavac"
                    href="/prijava-poslodavac"
                    isDropdownItem
                    className="ml-12 last:!rounded-bl-none last:!rounded-br-lg"
                  />
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface LinkProps {
  href: string;
  title: string;
  isDropdownItem?: boolean;
  className?: string;
}

const NavLink: React.FC<LinkProps> = (props) => {
  const router = useRouter();
  return (
    <Link
      href={props.href}
      className={clsx(
        "text-sm",
        props.isDropdownItem
          ? "px-6 py-3 hover:bg-gray-100 last:rounded-b-lg first:rounded-t-lg whitespace-nowrap"
          : "py-6",
        router.pathname == props.href
          ? "text-sc"
          : props.isDropdownItem
          ? "text-gray-500"
          : "text-gray-500 hover:text-gray-400",
        props.className
      )}
    >
      {props.title}
    </Link>
  );
};

interface DropdownProps {
  title: string;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ title, children }) => {
  const router = useRouter();
  return (
    <div
      className={clsx(
        "group relative cursor-default text-sm flex gap-1 items-center py-6",
        router.pathname.includes(title.toLocaleLowerCase())
          ? "text-sc"
          : "text-gray-500"
      )}
    >
      {title}
      <MdExpandMore size={16} />
      <div className="flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg shadow-lg bg-white invisible group-hover:visible flex absolute top-full right-0">
        {children}
      </div>
    </div>
  );
};

export default Navbar;
