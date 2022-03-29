import { ColorsTerminal } from "./colors-terminal.model";
import { MessageType } from "./enumerations/message-type.enum";
import { Robot } from "./enumerations/robot.enum";

export class Log {
  private robot: Robot;
  private messageType: MessageType;
  private message: string;

  public static getLogTemplate(
    robot: Robot,
    messageType: MessageType,
    message: string
  ): string {
    return `>> ${this.getRobot(robot)} ${this.getMessageType(
      messageType
    )} ${this.getMessage(message)}`;
  }

  private static getRobot(robot: Robot): string {
    return `${ColorsTerminal.BG_BLUE} ${robot} ${ColorsTerminal.RESET}`;
  }
  private static getMessageType(messageType: MessageType): string {
    switch (messageType) {
      case MessageType.INFO:
        return `${ColorsTerminal.FG_CYAN} ${messageType}: ${ColorsTerminal.RESET}`;
      case MessageType.ERROR:
        return `${ColorsTerminal.FG_RED} ${messageType}: ${ColorsTerminal.RESET}`;
      case MessageType.WARNING:
        return `${ColorsTerminal.FG_YELLOW} ${messageType}: ${ColorsTerminal.RESET}`;
      case MessageType.SUCCESS:
        return `${ColorsTerminal.FG_GREEN} ${messageType}: ${ColorsTerminal.RESET}`;
    }
  }
  private static getMessage(message: string): string {
    return `${message}`;
  }

  private setRobot(robot: Robot): void {
    this.robot = robot;
  }
  private setMessageType(messageType: MessageType): void {
    this.messageType = messageType;
  }
  private setMessage(message: string): void {
    this.message = message;
  }
}
