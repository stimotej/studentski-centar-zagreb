import clsx from "clsx";
import React from "react";
import dynamic from "next/dynamic";
import Spinner from "./Spinner";
import type { Document } from "@/features/types";
import { MdOutlineDescription, MdOutlineFileDownload } from "react-icons/md";
import DOMPurify from "isomorphic-dompurify";

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

  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: cleanHtml }}
        className={clsx("html-content", props.className)}
      ></div>
      {!!props.documents && props.documents.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {props.documents?.map((document, index) => (
            <a
              key={index}
              href={document.source_url}
              className="flex items-center p-4 rounded-lg border border-gray-200 text-light hover:bg-primary/5 hover:border-primary/40"
              download
            >
              <MdOutlineDescription size={24} className="mr-2" />
              <span className="line-clamp-1 flex-1">{document.title}</span>
              <MdOutlineFileDownload size={24} className="ml-auto" />
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default DisplayHTML;
