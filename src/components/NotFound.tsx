import { Button, Result } from "antd";
import React from "react";

const NotFound: React.FC = () => (
  <Result
    status="404"
    title="Not Found"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button href="/" type="primary">
        Back Home
      </Button>
    }
  />
);

export default NotFound;
