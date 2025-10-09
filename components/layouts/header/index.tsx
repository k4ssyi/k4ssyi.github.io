import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavigationMenu } from "radix-ui";
import SiteMapNavigation from "@/components/layouts/siteMapNavigation";
import Typography from "@/components/ui/typography";

export default function Header() {
  return (
    <header
      id="header"
      className="relative max-w-[960px] h-[270px] m-auto mt-0 mb-[30px]"
    >
      <Typography as="h1" className="absolute top-[100px] ">
        <a className="cursor-pointer" href="/">
          Portfolio
        </a>
      </Typography>
      <SiteMapNavigation className="absolute right-0 bottom-[30px]" />

      <NavigationMenu.Root>
        <NavigationMenu.List>
          <NavigationMenu.Item>
            <NavigationMenu.Link
              className="cursor-pointer"
              href="https://github.com/k4ssyi"
              target="_blank"
            >
              <FontAwesomeIcon
                className="absolute top-[112px] right-[10px] w-[24px] h-[24px]"
                icon={faGithub}
              />
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </header>
  );
}
