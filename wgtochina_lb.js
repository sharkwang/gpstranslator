
/*

# Krasovsky 1940
#
# a = 6378245.0, 1/f = 298.3
# b = a * (1 - f)
# ee = (a^2 - b^2) / a^2

*/

var math = require('mathjs');
var pi = 3.14159265358979324;
// World Geodetic System ==> Mars Geodetic System

exports.MarsTransform = function transform(wgLat, wgLon){
    //transform(latitude,longitude) , WGS84
    //return (latitude,longitude) , GCJ02

    var a = 6378245.0;
    var ee = 0.00669342162296594323;
    
    if (outOfChina(wgLat, wgLon)){

        return {Lat:this.wgLat, Lon:this.wgLon}; 
    }

    var dLat = transformLat(wgLon - 105.0, wgLat - 35.0);
    var dLon = transformLon(wgLon - 105.0, wgLat - 35.0);
    var radLat = wgLat / 180.0 * pi;

    var magic = math.sin(radLat);
    magic = 1 - ee * magic * magic;

    var sqrtMagic = math.sqrt(magic);

    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi)
    dLon = (dLon * 180.0) / (a / sqrtMagic * math.cos(radLat) * pi)
    var mgLat = wgLat + dLat;
    var mgLon = wgLon + dLon;

    return {Lat:mgLat, Lon:mgLon}; 
}

function outOfChina(lat, lon){

    if (lon < 72.004 || lon > 137.8347)
        return true;
    if (lat < 0.8293 || lat > 55.8271)
        return true;
    return false;
}

function transformLat(x, y){

    var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * math.sqrt(math.abs(x));
    ret += (20.0 * math.sin(6.0 * x * pi) + 20.0 * math.sin(2.0 * x * pi)) * 2.0 / 3.0;
    ret += (20.0 * math.sin(y * pi) + 40.0 * math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
    ret += (160.0 * math.sin(y / 12.0 * pi) + 320 * math.sin(y * pi / 30.0)) * 2.0 / 3.0;
    return ret
}

function transformLon(x, y){
    var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * math.sqrt(math.abs(x));
    ret += (20.0 * math.sin(6.0 * x * pi) + 20.0 * math.sin(2.0 * x * pi)) * 2.0 / 3.0;
    ret += (20.0 * math.sin(x * pi) + 40.0 * math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
    ret += (150.0 * math.sin(x / 12.0 * pi) + 300.0 * math.sin(x / 30.0 * pi)) * 2.0 / 3.0;
    return ret;
}

exports.test = function test(){
    var WGS84_Lat = 39.990205;
    var WGS84_Long = 116.327847;
    return this.transform(WGS84_Lat,WGS84_Long);
}

