import { log as Logger } from "@zos/utils";
import { createWidget, widget, align, prop, text_style, event } from "@zos/ui";
const logger = Logger.getLogger("helloworld");
import { push } from "@zos/router";

Page({
  onInit() {
    logger.debug("record page onInit invoked");
    // start recording measurements
  },
  build() {
    logger.debug("record page build invoked");

    // text for heart rate and temp
    let heart_rate = 65;
    let temperature = 81;
    const heart_rate_text = createWidget(widget.TEXT, {
      x: 40,
      y: 120,
      w: 240,
      h: 46,
      color: 0xffffff,
      text_size: 36,
      align_h: align.LEFT,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: `${heart_rate} BPM`,
    });

    const tempreature_text = createWidget(widget.TEXT, {
      x: 340,
      y: 120,
      w: 100,
      h: 46,
      color: 0xffffff,
      text_size: 36,
      align_h: align.RIGHT,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: `${temperature}°`,
    });

    const trigger_button = createWidget(widget.BUTTON, {
      x: 200,
      y: 200,
      w: 80,
      h: 80,
      normal_color: 0xff0000,
      press_color: 0x00ff00,
      text: "",
      click_func: (button_widget) => {
        button_widget.setProperty(prop.MORE);
        logger.log("Clicked button, starting recording");
        push({
          url: "page/gt/trigger/index.page",
          // params: "",  can pass in a json object
        });
      },
    });
  },

  onDestroy() {
    logger.debug("record page onDestroy invoked");
  },
});
