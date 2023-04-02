import type { Document } from "@/features/types";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import React from "react";
import DisplayHTML from "../elements/DisplayHTML";
import Card from "../shared/Card";

interface LoginInfoCardProps {
  title: string;
  documents?: Document[];
  content?: string;
  className?: string;
}

const LoginInfoCard: React.FC<LoginInfoCardProps> = (props) => {
  return (
    <Card className={props.className}>
      <DisplayHTML
        html={props.title}
        className="text-xl font-medium text-text"
      />
      <div className="mt-4">
        {!!props.content && !!clearHtmlFromString(props.content || "") && (
          <DisplayHTML html={props.content} className="text-light" />
        )}
        {!!props.documents &&
          props.documents.length > 0 &&
          props.documents.map((document) => (
            <a
              key={document.id}
              href={document.source_url}
              className="flex py-3 px-1 text-light font-medium border-b border-gray-200 hover:bg-gray-100"
            >
              <DisplayHTML html={document.title} className="text-light" />
            </a>
          ))}
      </div>
    </Card>
  );
};

export default LoginInfoCard;
