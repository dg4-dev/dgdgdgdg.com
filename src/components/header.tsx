import Link from "next/link";

import type { NextPage } from "next";

const Header: NextPage = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href={"/"}>Top</Link>
          </li>
          <li>
            <Link href={"/about"}>About</Link>
            <ul>
              <li>
                <Link href={"/about/brand"}>Brand Resource</Link>
              </li>
              <li>
                <Link href={"/about/tool"}>Tool</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href={"/works"}>Works</Link>
          </li>
          <li>
            <Link href={"/service"}>Service</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
