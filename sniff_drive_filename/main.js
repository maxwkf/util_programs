loadUrl("https://docs.google.com/a/gapps.cityu.edu.hk/uc?id=0BwA9LshieWG9d2E3RXR1VXYtaFU");
function loadUrl(url) {

	// Our simplified "load" function accepts a URL and CALLBACK parameter.
	load(url, function(xhr) {
		//document.getElementById('container').innerHTML = xhr.responseText;
		var xmlString = xhr.responseText;
		var parser = new DOMParser(), doc = parser.parseFromString(xmlString, "text/html");
		var els = doc.getElementsByTagName("a");
		
		for (var i = 0, l = els.length; i < l; i++) {
			var el = els[i];
			if (el.href.startsWith('https://docs.google.com/open')) {
				console.log(el.href + " | " + el.innerText);
			}
		}
	});
} 
function load(url, callback) {
        var xhr;
         
        if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
        else {
            var versions = ["MSXML2.XmlHttp.5.0", 
                            "MSXML2.XmlHttp.4.0",
                            "MSXML2.XmlHttp.3.0", 
                            "MSXML2.XmlHttp.2.0",
                            "Microsoft.XmlHttp"]
 
             for(var i = 0, len = versions.length; i < len; i++) {
                try {
                    xhr = new ActiveXObject(versions[i]);
                    break;
                }
                catch(e){}
             } // end for
        }
         
        xhr.onreadystatechange = ensureReadiness;
         
        function ensureReadiness() {
            if(xhr.readyState < 4) {
                return;
            }
             
            if(xhr.status !== 200) {
                return;
            }
 
            // all is well
            if(xhr.readyState === 4) {
                callback(xhr);
            }           
        }
         
        xhr.open('GET', url, true);
        xhr.send('');
    }
