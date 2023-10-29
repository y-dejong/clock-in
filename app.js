import { log as Logger } from "@zos/utils";

const logger = Logger.getLogger("clock-in");
const filename = "status_report.txt";

App({
  globalData: {
    recording: false
  },
  onCreate(options) {
    console.log("app on create invoke");
  },

  onDestroy(options) {
    console.log("app on destroy invoke");
  },
});
