import { NotificationType } from "components/Alert.component";

export interface AlertInterface {
  type: NotificationType;
  message: string;
  description: string;
}
