var $, fill;

$ = require('jquery');

(fill = function(item) {
  return $('.tagline').append("" + item);
})('the dopest coolest fantatical amazing significant most creative minds in Art');

fill;
