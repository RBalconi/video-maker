import { MessageType } from "./models/enumerations/message-type.enum";
import { Robot } from "./models/enumerations/robot.enum";
import { Log } from "./models/log.model";
import { robotImage } from "./robots/image";
import { robotInput } from "./robots/input";
import { State as state } from "./robots/state";
import { robotText } from "./robots/text";

const robots = {
  input: robotInput,
  // state: require("./robots/state.js"),
  text: robotText,
  image: robotInput,
  // video: require('./robots/video.js'),
  // youtube: require('./robots/youtube.js')
};

async function start() {
  await robotInput();
  await robotText();
  await robotImage();

  // robots.input;
  // await robots.text();
  // await robots.image();
  // await robots.video();
  // await robots.youtube();

  const content = state.load();

  console.log(content.sourceContentSanitized);
}

start()
  .then(() => {
    console.log(
      Log.getLogTemplate(Robot.ROBOT, MessageType.SUCCESS, "Process Done!")
    );
  })
  .catch((err) => {
    console.log(Log.getLogTemplate(Robot.ROBOT, MessageType.ERROR, err));
  });
