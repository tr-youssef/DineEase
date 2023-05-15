export const Time = function secondsToHms(d) {
  if (d < 0) {
    d = Number(-d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? (h > 9 ? h + ":" : "0" + h + ":") : "";
    var mDisplay = m > 0 ? (m > 9 ? m + ":" : "0" + m + ":") : "";
    var sDisplay = s > 0 ? (s > 9 ? s : "0" + s) : "";
    return hDisplay + mDisplay + sDisplay;
  } else {
    return "00:00:00";
  }
};
