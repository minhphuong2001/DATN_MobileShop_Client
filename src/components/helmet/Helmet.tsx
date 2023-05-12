import React, { ReactNode } from "react";

interface HelmetProps {
  title: string;
  children: ReactNode;
}

export default function Helmet({ title, children }: HelmetProps) {
  document.title = "DTMP - " + title;

  return <div>{children}</div>;
}
