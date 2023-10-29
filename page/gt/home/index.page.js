import { createWidget, widget, align, prop, text_style, event } from "@zos/ui";
import { log as Logger } from "@zos/utils";
import { push } from "@zos/router";
import { TEXT_STYLE } from "zosLoader:./index.page.[pf].layout.js";

const logger = Logger.getLogger("Hello World");
Page({
  onInit() {
    logger.debug("page onInit invoked");
  },
  build() {
    logger.debug("page build invoked");
    //let count = 0;
    const text = createWidget(widget.TEXT, {
      x: 96,
      y: 120,
      w: 288,
      h: 46,
      color: 0xffffff,
      text_size: 36,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: "Clock In",
    });

    const button = createWidget(widget.BUTTON, {
      x: 185,
      y: 332,
      w: 110,
      h: 110,
      radius: 25,
      normal_src: "clockin_icon.png", // color 17
      press_src: "clockin_icon_pressed.png", // color 18
      text: "",
      click_func: (button_widget) => {
        logger.log("Clicked button, starting recording");
        push({
          url: "page/gt/record/index.page",
          // params: "",  can pass in a json object
        });
      },
    });

    /*
    text.addEventListener(event.CLICK_DOWN, (info) => {
      text.setProperty(prop.MORE, {});
      count = count + 1;
      logger.debug(`Text count: ${count}`);
    });
    
    ^ example of adding an event listener to an element
    */
  },

  onDestroy() {
    logger.debug("page onDestroy invoked");
  },
});
