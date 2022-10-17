import React from "react";

export interface ErrorProps {
  message: string;
}

const ErrorMessage = (props: ErrorProps) => {
  const { message } = props;
  return <div className="text-rose-500">{message}</div>;
};

export default ErrorMessage;
