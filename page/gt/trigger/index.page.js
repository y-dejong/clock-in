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
var trigger_description;
Page({
  onInit(params) {
    logger.debug("printing params");
    logger.debug(params);
    trigger_description = JSON.parse(params).description;
    logger.debug(
      "trigger page onInit invoked for the following reason: " +
        trigger_description
    );
  },
  build() {
    logger.debug("trigger page build invoked");

    // const hazard_title = createWidget(widget.TEXT, {
    //   x: 60,
    //   y: 80,
    //   h: 80,
    //   w: 320,
    //   color: 0xffffff,
    //   text_size: 36,
    //   align_h: align.CENTER_H,
    //   align_v: align.CENTER_V,
    //   text_style: text_style.NONE,
    //   text: "Hazard Detected",
    // });
    logger.debug("trigger description in build: " + trigger_description);

    const hazard_text = createWidget(widget.TEXT, {
      x: 0,
      y: 80,
      h: 160,
      w: 480,
      color: 0xffffff,
      text_size: 36,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: trigger_description,
    });

    const hazard_icon = createWidget(widget.IMG, {
      x: 184,
      y: 200,
      w: 112,
      src: "warning.png",
    });

    // const animated_timer_bar = createWidget(widget.FILL_RECT, {
    //   x: 150,
    //   y: 132,
    //   w: 180,
    //   h: 40,
    //   color: 0xbbbbbb,
    // });

    // const animated_timer_bar_overlay = createWidget(widget.FILL_RECT, {
    //   x: 0,
    //   y: 132,
    //   w: 480,
    //   h: 40,
    //   color: 0x00ff00,
    // });

    // const anim_step1 = {
    //   anim_rate: "linear",
    //   anim_duration: 10,
    //   anim_from: px(0),
    //   anim_to: px(480),
    //   anim_prop: prop.w,
    // };

    // const animId = animated_timer_bar_overlay.setProperty(prop.ANIM, {
    //   anim_steps: [anim_step1],
    //   anim_fps: 25,
    // });

    // animated_timer_bar_overlay.setProperty(prop.ANIM_STATUS, {
    //   anim_id: animId,
    //   anim_status: anim_status.RESUME,
    // });

    // animated_timer_bar_overlay.setProperty(prop.ANIM_STATUS, {
    //   anim_id: animId,
    //   anim_status: anim_status.PAUSE,
    // });

    // const currentStatus = animated_timer_bar_overlay.getProperty(
    //   prop.ANIM_STATUS,
    //   animId
    // );

    const dismiss_button = createWidget(widget.BUTTON, {
      x: 40,
      y: 350,
      w: 180,
      h: 60,
      radius: 5,
      text_size: 18,
      normal_color: 0x888888,
      press_color: 0x333333,
      text: "Dismiss",
      click_func: (button_widget) => {
        logger.log("Clicked button, leaving trigger");
        back();
      },
    });

    const stop_button = createWidget(widget.BUTTON, {
      x: 260,
      y: 350,
      w: 180,
      h: 60,
      text_size: 18,
      normal_color: 0xff0000,
      press_color: 0x00ff00,
      text: "Report Incident",
      click_func: (button_widget) => {
        button_widget.setProperty(prop.MORE);
        logger.log("Clicked button, end recording");
        push({
          url: "page/gt/stop/index.page",
          // params: "",  can pass in a json object
        });
      },
    });
  },

  onDestroy() {
    logger.debug("trigger page onDestroy invoked");
  },
});
