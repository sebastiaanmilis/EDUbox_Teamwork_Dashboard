export function addAlpha(color, opacity) {
    var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
}

export const toPercentage = (score) => ((score * 100 / 5).toFixed(0));
export const toRounded = (score) => (score.toFixed(0));
export const reverse = (s) => {
    return s.split("").reverse().join("");
}

export const getDeviceID = () => {
    let navigator_info = window.navigator;
    let screen_info = window.screen;
    let uid = navigator_info.mimeTypes.length;
    uid += navigator_info.userAgent.replace(/\D+/g, '');
    uid += navigator_info.plugins.length;
    uid += screen_info.height || '';
    uid += screen_info.width || '';
    uid += screen_info.pixelDepth || '';
    return uid;
}