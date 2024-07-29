import clsx from "clsx";
import React from "react";
import type { Document } from "@/features/types";
import DOMPurify from "isomorphic-dompurify";
import DocumentCard from "../shared/DocumentCard";

interface DisplayHTMLProps {
  html: string;
  documents?: Document[];
  className?: string;
}

const DisplayHTML: React.FC<DisplayHTMLProps> = (props) => {
  const cleanHtml = DOMPurify.sanitize(props.html, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
  });

  const replaceImageUrls = (html: string) => {
    return html.replaceAll(`src="https`, `src="http`);
  };

  const modifiedHtml = replaceImageUrls(cleanHtml);

  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: modifiedHtml }}
        className={clsx("html-content include-filters", props.className)}
      ></div>
      {!!props.documents && props.documents.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {props.documents?.map((document, index) => (
            <DocumentCard key={index} document={document} />
          ))}
        </div>
      )}
    </>
  );
};

export default DisplayHTML;
