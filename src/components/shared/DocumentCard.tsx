import React from "react";
import { MdOutlineDescription, MdOutlineFileDownload } from "react-icons/md";
import type { Document } from "@/features/types";

interface DocumentCardProps {
  document: Document;
}

const DocumentCard: React.FC<DocumentCardProps> = (props) => {
  return (
    <a
      href={props.document.source_url}
      className="flex items-center p-4 rounded-lg border border-gray-200 text-light hover:bg-primary/5 hover:border-primary/40"
      download
    >
      <MdOutlineDescription size={24} className="mr-2" />
      <span className="line-clamp-1 flex-1">{props.document.title}</span>
      <MdOutlineFileDownload size={24} className="ml-auto" />
    </a>
  );
};

export default DocumentCard;
