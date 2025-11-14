"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {Layers3} from "lucide-react";
import {useLocale, useTranslations} from "next-intl";

import {cn} from "../../src/lib/utils";
import {LocaleSwitcher} from "../locale-switcher";
import {ThemeToggle} from "../theme-toggle";
import type { Route } from "next";

const NAV_ITEMS = [{href: "/team-directory", translationKey: "teamDirectory"}] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const locale = useLocale();
  const tCommon = useTranslations("common");
  const tNavigation = useTranslations("navigation");

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
