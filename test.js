var translator = require('./wgtochina_lb.js');
 var WGS84_Lat = 30.669880;
    var WGS84_Lon = 104.094788;
    
console.log('WG_lat, WGS84_Lon:' + WGS84_Lat +',' +WGS84_Lon);
console.log('Translated:');
console.log(translator.MarsTransform(WGS84_Lat,WGS84_Lon));
console.log('BD-09 Translated:');
console.log(translator.BDTransform(WGS84_Lat,WGS84_Lon));

