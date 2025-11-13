"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {Layers3} from "lucide-react";
import {useLocale, useTranslations} from "next-intl";

import {cn} from "../../src/lib/utils";
import {LocaleSwitcher} from "../locale-switcher";
import {ThemeToggle} from "../theme-toggle";

const NAV_ITEMS = [{href: "/team-directory", translationKey: "teamDirectory"}] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const locale = useLocale();
  const tCommon = useTranslations("common");
  const tNavigation = useTranslations("navigation");

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}/team-directory`}
          className="flex items-center gap-2 rounded-full border border-transparent bg-gradient-to-r from-blue-600 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:shadow-xl hover:shadow-blue-500/40"
        >
          <Layers3 className="h-4 w-4" />
          <span>{tCommon("appName")}</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          {NAV_ITEMS.map((item) => {
            const href = `/${locale}${item.href}`;
            const isActive = pathname === href;

            return (
              <Link
                key={item.href}
                href={href}
                className={cn(
                  "relative transition hover:text-foreground",
                  isActive && "text-foreground"
                )}
              >
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-2 h-0.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                )}
                {tNavigation(item.translationKey)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
