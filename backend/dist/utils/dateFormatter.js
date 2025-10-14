"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateToMDY12Hour = formatDateToMDY12Hour;
function formatDateToMDY12Hour(date) {
    const options = {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    };
    return date.toLocaleString("en-US", options);
}
