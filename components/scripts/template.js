$(function() {
  var Mustache = require('mustache');
 
  $.getJSON('js/data.json', function(data) {
    var template = $('#driverstpl').html();
    var html = Mustache.to_html(template, data);
    $('#drivers').html(html);    
  }); //getJSON
  
}); //function