import GitHubIcon from "@/components/GithubIcon";
import HomeCarousel from "@/components/HomeCarousel";

import { GITHUB_LINK } from "@/lib/constants";
import { CalculatorIcon, ChartNoAxesColumn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center sm:flex-row sm:justify-center">
        <Image
          src={"/ptcgp_icon.png"}
          width={200}
          height={200}
          alt="PTCGP Icon"
        />
        <div>
          <h1 className="mb-4 text-4xl font-bold">
            Pokémon TCG Pocket Tracker
          </h1>
          <p className="mb-8 text-lg">
            Your{" "}
            <Link className="hover:underline" target="blank" href={GITHUB_LINK}>
              <b>open source</b>
            </Link>{" "}
            tool for managing your Pokémon TCG Pocket collection easily.
          </p>
        </div>
      </div>

      <div className="mb-8 text-lg">
        Features
        <ul className="ml-8 list-disc">
          <li>
            <div className="flex flex-row gap-1">
              <CalculatorIcon />
              <div className="font-bold">Probability Calculator</div>
            </div>
            <ul className="ml-8 list-disc">
              <li>
                Decide which pack to open based based on your collection and the
                calculated odds
              </li>
            </ul>
          </li>
          <li>
            <div className="flex flex-row gap-1">
              <ChartNoAxesColumn />
              <div className="font-bold">Progress Tracker</div>
            </div>
            <ul className="ml-8 list-disc">
              <li>
                Check your progress on completing a set and see which cards are
                missing
              </li>
            </ul>
          </li>
          <li>
            <div className="flex flex-row gap-1">
              <GitHubIcon className="h-6 w-6" />
              <div className="font-bold">Free to use</div>
            </div>
            <ul className="ml-8 list-disc">
              <li>
                Open source and free to use. You can contribute to the project
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <HomeCarousel />
    </div>
  );
}
