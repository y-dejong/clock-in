import { log as Logger } from "@zos/utils";
import {
  createWidget,
  widget,
  align,
  prop,
  text_style,
  event,
  anim_status,
} from "@zos/ui";
const logger = Logger.getLogger("Hello World");
import { push, back } from "@zos/router";

const scrollBar = createWidget(widget.PAGE_SCROLLBAR);

function generateReport(healthdata) {
  var result = "During your workday:\n";
  var totalhr = 0;
  healthdata.hr_history.forEach((x) => totalhr += x);
  result += "Your average heart rate was " +
    (((totalhr / healthdata.hr_history.length) > 140) ?
     "elevated" : "normal");
  result += " (avg: " + (totalhr/healthdata.hr_history.length) + ").\n";

  var totalspo2 = 0;
  healthdata.spo2_history.forEach((x) => totalspo2 += x);
  result += "Your average blood oxygen level was " +
    (((totalspo2 / healthdata.spo2_history.length) < 90) ?
     "too low" : "normal");
  result += " (avg: " + (totalspo2/healthdata.spo2_history.length) + ").";

  result += "\n\nHazards during day:\n";
  result += `${healthdata.incident.hour}:${("0" + healthdata.incident.minute).slice(-2)}: ${healthdata.incident.description}`;

  return result;
}

Page({
  onInit(params) {
    var paramobj = JSON.parse(params);
    var trigger_description = paramobj.description;
    const title = createWidget(widget.TEXT, {
      x: 0,
      y: 20,
      w: 480,
      h: 80,
      color: 0xffffff,
      text_size: 36,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.WRAP,
      text: "Report",
    });

    const text = createWidget(widget.TEXT, {
      x: 0,
      y: 120,
      w: 480,
      h: 1000,
      color: 0xffffff,
      text_size: 36,
      align_h: align.CENTER_H,
      align_v: align.TOP,
      text_style: text_style.WRAP,
      text: generateReport(healthdata),
    });
    // logger.debug("stop page onInit invoked" + params.description);
  },
  build() {
    logger.debug("stop page build invoked");
  },

  onDestroy() {
    logger.debug("stop page onDestroy invoked");
  },
});
