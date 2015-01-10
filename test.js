var translator = require('./wgtochina_lb.js');
 var WGS84_Lat = 39.990205;
    var WGS84_Lon = 116.327847;
    
console.log('WG_lat:' + WGS84_Lat +',WGS84_Lon' +WGS84_Lon);
console.log('Translated:');
console.log(translator.MarsTransform(WGS84_Lat,WGS84_Lon));
