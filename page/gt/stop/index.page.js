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

Page({
  onInit(params) {
    var trigger_description = JSON.parse(params).description;
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
      align_v: align.CENTER_V,
      text_style: text_style.WRAP,
      text_i18n: trigger_description,
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
