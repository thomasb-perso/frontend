//TODO Will need a SERIOUS refactoring (ES6 + Front end fmk ?)

var config = require('./config');
var highlight   = require('highlight.js');
var he   = require('he');

document.addEventListener("DOMContentLoaded", SelectApiResponseFormat);


function SelectApiResponseFormat(){
    //default load json when page loading -- TODO review this
    GETrequest("json");

    document.getElementById("response-format").addEventListener("change", function(e) {
        GETrequest(this.value);
    });
}


var GETrequest = function (format){
    //TODO Get from a list of avaialble method instead of manage in config

    var xhr = new XMLHttpRequest();
    xhr.open('GET', config.serveurURL+":"+config.serveurPort+config.method+format);
    xhr.onload = function() {
        //TODO Manage other response code
        if (xhr.status === 200) {
            document.getElementById('api-response-header').innerHTML=xhr.getAllResponseHeaders();
            document.getElementById('api-response-body').innerHTML=he.encode(xhr.responseText);
            console.log(xhr.responseText);
            document.getElementById('format-selected').innerHTML=format;
            highlight.highlightBlock(document.getElementById('api-response-body'));
            highlight.highlightBlock(document.getElementById('api-response-header'));
        }
        else {
            console.log('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();
}
