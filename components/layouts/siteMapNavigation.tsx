"use client";

import { usePathname } from "next/navigation";
import { NavigationMenu } from "radix-ui";

const links = [
  {
    url: "about",
    label: "About",
    disabled: false,
  },

  {
    url: "works",
    label: "Works",
    disabled: false,
  },

  {
    url: "blog",
    label: "Blog",
    disabled: true,
  },

  {
    url: "contact",
    label: "Contact",
    disabled: true,
  },
] as const;

export default function SiteMapNavigation({
  className,
}: {
  className: string;
}) {
  const pathname = usePathname();

  const isActive = (url: string) => pathname === `/${url}`;

  const getLinkClassName = (url: string, disabled: boolean) => {
    const baseClass = "hover:border-b text-sm font-normal tracking-widest";
    const activeClass = isActive(url) ? "opacity-[0.3]" : "";
    const disabledClass = disabled
      ? "cursor-not-allowed opacity-50 hover:border-none"
      : "";

    return `${baseClass} ${activeClass} ${disabledClass}`.trim();
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    disabled: boolean,
  ) => {
    if (disabled) {
      e.preventDefault();
    }
  };

  return (
    <NavigationMenu.Root className={className}>
      <NavigationMenu.List className="flex text-right gap-13">
        {links.map((link) => (
          <NavigationMenu.Item key={link.label}>
            <NavigationMenu.Link
              className={getLinkClassName(link.url, link.disabled)}
              href={`/${link.url}`}
              onClick={(e) => handleLinkClick(e, link.disabled)}
              aria-disabled={link.disabled}
            >
              {link.label}
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>

      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  );
}
