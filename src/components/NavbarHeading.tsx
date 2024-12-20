"use client";
import { type ReactElement } from "react";
import Link from "next/link";

export default function NavbarHeading(): ReactElement {
  return (
    <>
      <Link href="/" className="hover:text-foreground hover:after:w-0">
        <h3 className="m-0 p-0 leading-0">Java Cafe</h3>
      </Link>
    </>
  );
}
