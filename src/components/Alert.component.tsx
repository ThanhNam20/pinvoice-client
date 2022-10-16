import { Button, notification, Space } from "antd";
import React from "react";
import { AlertInterface } from "types/Alert";

export type NotificationType = "success" | "info" | "warning" | "error";

const openNotificationWithIcon = (
  type: NotificationType,
  message: string,
  description: string
) => {
  notification[type]({
    message,
    description,
  });
};

const AlertComponent: React.FC<AlertInterface> = (props: AlertInterface) => {
  const { type, message, description } = props;
  return (
    <Space>
      <Button
        onClick={() => openNotificationWithIcon(type, message, description)}
      >
        {type}
      </Button>
    </Space>
  );
};

export default AlertComponent;
