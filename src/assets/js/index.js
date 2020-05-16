import "../css/reset.scss";
import "../css/general.scss";
import "../css/background.scss";
import "../css/overlay.scss";

const overlay = document.querySelector(".logo");

let cX = 0,
  cY = 0,
  dX = 0,
  dY = 0,
  vX = document.documentElement.clientWidth,
  vY = document.documentElement.clientHeight;

if (window.DeviceOrientationEvent && "ontouchstart" in window) {
  const limitValue = (val, min, max) => {
    return (Math.round(Math.min(max, Math.max(min, val)) + Number.EPSILON) * 100) / 100;
  };

  const handleDeviceEvent = (e) => {
    dX = limitValue(e.gamma, -30, 30) / 90;
    dY = limitValue(e.beta, -60, 60) / 180;

    const matrix = [
      [1, 0, 0, -dX * 0.0035],
      [0, 1, 0, -dY * 0.0035],
      [0, 0, 1, 1],
      [0, 0, 0, 1]
    ];

    overlay.style.transform = `matrix3d(${matrix.toString()})`;
    overlay.style.webkitTransform = `matrix3d(${matrix.toString()})`;
  };

  window.addEventListener("deviceorientation", handleDeviceEvent, false);
} else {
  const handleMouseEvent = (e) => {
    vX = document.documentElement.clientWidth;
    vY = document.documentElement.clientHeight;
    cX = (2 * e.pageX - vX) / vX;
    cY = (2 * e.pageY - vY) / vY;

    const matrix = [
      [1, 0, 0, cX * 0.00035],
      [0, 1, 0, cY * 0.00035],
      [0, 0, 1, 1],
      [0, 0, 0, 1]
    ];

    overlay.style.transform = `matrix3d(${matrix.toString()})`;
    overlay.style.webkitTransform = `matrix3d(${matrix.toString()})`;
  };

  document.addEventListener("mousemove", handleMouseEvent, false);
}

