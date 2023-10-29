import { log as Logger } from "@zos/utils";
import { createWidget, widget, align, prop, text_style, event } from "@zos/ui";
const logger = Logger.getLogger("Hello World");
import { push } from "@zos/router";
import { Accelerometer, BloodOxygen, HeartRate, Time } from "@zos/sensor";

const globalData = getApp()._options.globalData;

const spo2 = new BloodOxygen();
const hr = new HeartRate();
const accel = new Accelerometer();
const time = new Time();

var widgets = {};
var intervals = [];

var lastdata = {
  minute_hr: [],
  hour_hr: [],
};
var healthdata = {
  day_hr: [],
};

function accelCallback() {
  let acceldata = accel.getCurrent();
  for (var x of ["x", "y", "z"]) {
    if (acceldata[x] > 1800 || acceldata[x] < -1800) {
      logger.debug("Accel above 2000");
      push({
        url: "page/gt/trigger/index.page",
        params: {
          description: "Clock In noticed a collision or fall.",
        },
      });
      logger.debug(JSON.stringify(acceldata));
    }
  }
}

function hrCallback() {
  lastdata.hr = hr.getCurrent();
  if (lastdata.hr > 200) {
    push({
      url: "page/gt/trigger/index.page",
      params: {
        description:
          "Your heart rate is extremely high. Stop all strenuous physical activity.",
      },
    });
  }
  logger.debug(`Got hr change ${lastdata.hr}`);
}

function spo2Callback() {
  let spo2data = spo2.getCurrent();
  if (spo2data.retCode == 2) {
    lastdata.spo2 = spo2data.value;
    if (lastdata.spo2 < 80) {
      push({
        url: "page/gt/trigger/index.page",
        params: {
          description: "You're blood oxygen level is very low.",
        },
      });
    }
  }
  logger.debug(`Got spo2 change: ${lastdata.spo2}`);
}

Page({
  onInit() {
    logger.debug("record page onInit invoked");
    // start recording measurements
    spo2.start();
    accel.start();
    hr.onCurrentChange(hrCallback);
    spo2.onChange(spo2Callback);
    accel.onChange(accelCallback);
    lastdata.hr = hr.getLast();
    lastdata.spo2 = spo2.getCurrent().value;

    // TODO intervals
    // Every 1 seconds, collect heart rate for display
    setInterval(() => {
      widgets.heart_rate_text.setProperty(prop.MORE, {
        text: `${lastdata.hr} BPM`,
      });
    }, 1000);

    setInterval(() => {
      logger.debug(JSON.stringify(hr.getAFibRecord()));
    }, 5000);
  },
  build() {
    logger.debug("record page build invoked");

    // text for heart rate and temp
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
      text: `${lastdata.hr} BPM`,
    });

    const temperature_text = createWidget(widget.TEXT, {
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
      x: 180,
      y: 180,
      w: 120,
      h: 120,
      radius: 100,
      normal_src: "trigger_icon.png",
      press_src: "target_icon.png",
      text: "",
      click_func: (button_widget) => {
        logger.log("Clicked button, starting trigger");
        push({
          url: "page/gt/trigger/index.page",
          params: {
            description: "Your reported a hazard.",
          },
        });
      },
    });

    const stop_button = createWidget(widget.BUTTON, {
      x: 120,
      y: 340,
      w: 240,
      h: 80,
      radius: 10,
      normal_color: 0x888888,
      press_color: 0xbbbbbb,
      text: "Stop recording",
      click_func: (button_widget) => {
        button_widget.setProperty(prop.MORE);
        logger.log("Clicked button, end recording");
        push({
          url: "page/gt/stop/index.page",
          // params: "",  can pass in a json object
        });
      },
    });
    widgets.heart_rate_text = heart_rate_text;
    widgets.temperature_text = temperature;
    widgets.trigger_button = trigger_button;
  },

  onDestroy() {
    logger.debug("record page onDestroy invoked");
    spo2.stop();
    accel.stop();
  },
});

// don't turn off the screen for 600 seconds
import { setPageBrightTime } from "@zos/display";
const result = setPageBrightTime({
  brightTime: 600 * 1000,
});

// don't turn off the screen on wrist down for 600 seconds
import { pauseDropWristScreenOff } from "@zos/display";
pauseDropWristScreenOff({
  duration: 600 * 1000,
});
