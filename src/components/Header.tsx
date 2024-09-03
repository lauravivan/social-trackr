import { Github, Linkedin, Twitter } from "./icons";
import { GITHUB_LINK, LINKEDIN_LINK, TWITTER_LINK } from "../util";

interface HeaderType {
  children: string;
}

export function Header({ children }: HeaderType) {
  return (
    <header className="header">
      <h1 className="header__title">{children}</h1>
      <div className="header__social-media">
        <div className="header__social-media--item">
          <a target="_blank" href={GITHUB_LINK}>
          <Github />
          </a>
        </div>
        <div className="header__social-media--item">
          <a target="_blank" href={TWITTER_LINK}>
          <Twitter />
          </a>
        </div>
        <div className="header__social-media--item">
          <a target="_blank" href={LINKEDIN_LINK}>
          <Linkedin />
          </a>
        </div>
      </div>
    </header>
  );
}
