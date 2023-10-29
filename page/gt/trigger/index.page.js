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
const logger = Logger.getLogger("helloworld");
import { push } from "@zos/router";

Page({
  onInit(params) {
    let trigger_description = params.description;
    logger.debug("trigger page onInit invoked" + params.description);
  },
  build() {
    logger.debug("trigger page build invoked");

    const hazard_title = createWidget(widget.TEXT, {
      x: 60,
      y: 80,
      h: 80,
      w: 320,
      color: 0xffffff,
      text_size: 36,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: "Hazard Detected",
    });

    const hazard_icon = createWidget(widget.IMG, {
      x: 200,
      y: 200,
      w: 112,
      src: "warning.png",
    });

    const animated_timer_bar = createWidget(widget.FILL_RECT, {
      x: 150,
      y: 132,
      w: 180,
      h: 40,
      color: 0xbbbbbb,
    });

    const animated_timer_bar_overlay = createWidget(widget.FILL_RECT, {
      x: 150,
      y: 132,
      w: 0,
      h: 40,
      color: 0x0000ff,
    });

    const anim_step1 = {
      anim_rate: "linear",
      anim_duration: 5000,
      anim_from: px(0),
      anim_to: px(180),
      anim_prop: prop.w,
    };

    const animId = animated_timer_bar_overlay.setProperty(prop.ANIM, {
      anim_steps: [anim_step1],
      anim_fps: 25,
    });

    animated_timer_bar_overlay.setProperty(prop.ANIM_STATUS, {
      anim_id: animId,
      anim_status: anim_status.RESUME,
    });

    // animated_timer_bar_overlay.setProperty(prop.ANIM_STATUS, {
    //   anim_id: animId,
    //   anim_status: anim_status.PAUSE,
    // });

    const currentStatus = animated_timer_bar_overlay.getProperty(
      prop.ANIM_STATUS,
      animId
    );

    const dismiss_button = createWidget(widget.BUTTON, {
      x: 190,
      y: 300,
      w: 100,
      h: 80,
      radius: 5,
      normal_color: 0x888888,
      press_color: 0x333333,
      text: "Dismiss",
    });

    const stop_button = createWidget(widget.BUTTON, {
      x: 190,
      y: 400,
      w: 100,
      h: 80,
      normal_color: 0xff0000,
      press_color: 0x00ff00,
      text: "Close",
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
