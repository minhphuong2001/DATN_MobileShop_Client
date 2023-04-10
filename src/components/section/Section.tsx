import React, { ReactNode } from "react";

interface SectionProp {
	children: ReactNode
}

export const Section = (props: SectionProp) => {
  return <div className="section">{props.children}</div>;
};

export const SectionTitle = (props: SectionProp) => {
  return <div className="section-title">{props.children}</div>;
};

export const SectionBody = (props: SectionProp) => {
  return <div className="section-body">{props.children}</div>;
};
