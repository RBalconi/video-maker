export class ColorsTerminal {
  public static readonly RESET = "\x1b[0m";
  public static readonly BRIGHT = "\x1b[1m";
  public static readonly DIM = "\x1b[2m";
  public static readonly UNDERSCORE = "\x1b[4m";
  public static readonly BLINK = "\x1b[5m";
  public static readonly REVERSE = "\x1b[7m";
  public static readonly HIDDEN = "\x1b[8m";

  public static readonly FG_BLACK = "\x1b[30m";
  public static readonly FG_RED = "\x1b[31m";
  public static readonly FG_GREEN = "\x1b[32m";
  public static readonly FG_YELLOW = "\x1b[33m";
  public static readonly FG_BLUE = "\x1b[34m";
  public static readonly FG_MAGENTA = "\x1b[35m";
  public static readonly FG_CYAN = "\x1b[36m";
  public static readonly FG_WHITE = "\x1b[37m";

  public static readonly BG_BLACK = "\x1b[40m";
  public static readonly BG_RED = "\x1b[41m";
  public static readonly BG_GREEN = "\x1b[42m";
  public static readonly BG_YELLOW = "\x1b[43m";
  public static readonly BG_BLUE = "\x1b[44m";
  public static readonly BG_MAGENTA = "\x1b[45m";
  public static readonly BG_CYAN = "\x1b[46m";
  public static readonly BG_WHITE = "\x1b[47m";

  public static readonly CURRENT_ROBOT = this.BLINK;
}
