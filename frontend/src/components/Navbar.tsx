import Link from "next/link";
import UserMenu from "./UserMenu";
import { ModeToggle } from "./ModeToggle";
import SmallScreenMenu from "./SmallScreenMenu";
import { GITHUB_LINK } from "@/lib/constants";
import GithubIcon from "./GithubIcon";

export default function Navbar() {
  return (
    <nav className="border-gray-200 bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <div className="md:invisible">
          <SmallScreenMenu />
        </div>
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          {/*           <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          /> */}
          <span className="self-center whitespace-nowrap text-sm font-semibold dark:text-white md:text-2xl">
            Pokemon TCG Pocket Tracker
          </span>
        </Link>
        <div className="flex items-center gap-4 space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          <UserMenu />
          <ModeToggle />
          <Link href={GITHUB_LINK} target="_blank" rel="noopener noreferrer">
            <GithubIcon className="h-6 w-6 text-gray-900 dark:text-white" />
          </Link>
        </div>
        <div
          className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
          id="navbar-user"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900 rtl:space-x-reverse">
            <li>
              <Link
                href="/"
                className="block rounded bg-blue-700 px-3 py-2 text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="block rounded bg-blue-700 px-3 py-2 text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500"
                aria-current="page"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/my-collection"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                My Collection
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
