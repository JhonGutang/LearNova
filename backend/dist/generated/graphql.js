"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.ResponseStatus = exports.LessonProgressStatus = void 0;
var LessonProgressStatus;
(function (LessonProgressStatus) {
    LessonProgressStatus["Finished"] = "FINISHED";
    LessonProgressStatus["InProgress"] = "IN_PROGRESS";
})(LessonProgressStatus || (exports.LessonProgressStatus = LessonProgressStatus = {}));
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus["Error"] = "ERROR";
    ResponseStatus["Success"] = "SUCCESS";
})(ResponseStatus || (exports.ResponseStatus = ResponseStatus = {}));
var Role;
(function (Role) {
    Role["Creator"] = "CREATOR";
    Role["Student"] = "STUDENT";
})(Role || (exports.Role = Role = {}));
