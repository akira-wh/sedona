"use strict";

// Подключение зависимостей
var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var run = require("run-sequence");
var del = require("del");
var browsersync = require("browser-sync").create();


// Компиляция препроцессорного кода в CSS.
// Автопрефиксация CSS для 2-х последних версий браузеров.
// Выгрузка неоптимизированного (читабельного) кода в style.css
// Оптимизация CSS и выгрузка в style_min.css
// Директория сохранения — build css
gulp.task("styles", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass({indentType: "space", indentWidth: "2", outputStyle: "expanded"}))
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions"
      ]})
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso({comments: false}))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(browsersync.stream());
});


// Оптимизация графики (JPEG, PNG, GIF)
// Директория сохранения — build img
gulp.task("images", function() {
  return gulp.src("build/img/**/*.{png,jpg,jpeg,gif}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest("build/img"));
});


// Сборка и минификация SVG-спрайта
// из содержимого директории "icons"
gulp.task("svgsprite", function() {
  return gulp.src("build/img/sprite_content/*.svg")
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});


// Чистая минификация .svg изображений
// из корня директории "img"
gulp.task("svgmin", function() {
  return gulp.src("build/img/*.svg")
    .pipe(svgmin())
    .pipe(gulp.dest("build/img"));
});


// Удаление (обнуление) директории build
gulp.task("clean", function() {
  return del("build");
});


// Копирование указанного содержимого
// из рабочей директории проекта
// в конечную директорию build
gulp.task("copy", function() {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**",
    "js/**",
    "*.html",
    "*.ico"
  ], {
    base: "."
  })
  .pipe(gulp.dest("build"));
});


// Сборка проекта для релиза
gulp.task("build", function(fn) {
  run(
    "clean",
    "copy",
    "styles",
    "images",
    "svgmin",
    "svgsprite",
    fn
  );
});


// Копирование *.html файлов в директорию build
gulp.task("html:copy", function() {
  return gulp.src("*.html")
    .pipe(gulp.dest("build"));
});


// Обновление liveserver'а
// при изменении *.html документов
gulp.task("html:update", ["html:copy"], function(done) {
  browsersync.reload();
  done();
});


// Основная конфигурация liveserver'а
gulp.task("liveserver", function() {
  browsersync.init({
    server: "build/"
  });

  gulp.watch("sass/**/*.{scss,sass}", ["styles"]);
  gulp.watch("*.html", ["html:update"]);
});
