import clsx from "clsx";
import React from "react";
import dynamic from "next/dynamic";
import Spinner from "./Spinner";
import type { Document } from "@/features/types";
import { MdOutlineDescription, MdOutlineFileDownload } from "react-icons/md";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <Spinner size={18} className="mx-auto " />,
});

interface DisplayHTMLProps {
  html: string;
  documents?: Document[];
  className?: string;
}

const DisplayHTML: React.FC<DisplayHTMLProps> = (props) => {
  return (
    <>
      <ReactQuill
        value={props.html}
        className={clsx(
          "!p-0 !m-0 [&>div>.ql-clipboard]:hidden",
          props.className
        )}
        modules={{ toolbar: false }}
        readOnly
      />
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
