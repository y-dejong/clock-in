async function fetchTemperature(res) {
  const data = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=37.78&lon=-122.42&appid=f56f2a9ee78fd7268c6b4618b04c31be")
  const datajson = await data.json();
  console.log("Got temp");
  console.log(JSON.stringify(data));
  res(null, {
    result: datajson.main.temp
  });
}

AppSideService({
  onInit() {
    
  },

  onRun() {
    
  },

  onRequest(req, res) {
    console.log("=====>", req.method);
    if(req.method == "GET_DATA") {
      fetchData(res);
    }
  },

  onDestroy() {
    
  }
});
