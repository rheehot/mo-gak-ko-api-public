"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var _gulp = _interopRequireDefault(require("gulp"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var copy = function copy() {
  return _gulp.default
    .src("./src/api/**/*.graphql")
    .pipe(_gulp.default.dest("./build/api/"));
};

var _default = copy;
exports.default = _default;

// import gulp from "gulp";

// const copy = () =>
//   gulp.src("./src/api/**/*.graphql").pipe(gulp.dest("./build/api/"));

// export default copy;
