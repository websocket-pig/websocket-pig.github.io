if (typeof websocket == "undefined")
	websocket = {};
websocket.send = function (url,message) {
	var ele = document.createElement("iframe");
	ele.src = location.origin + "/" + Math.random();
	var from_url = location.href;
	from_url = encodeURI(from_url);
	var url = encodeURI(url);
	var letter = "SEND WEBSOCKET PIG FROMSIZE " + from_url.length + " FROM " + from_url + " TOSIZE " + url.length + " TO " + url + " MESSAGESIZE " + message.length + " MESSAGE " + message;
	console.log(letter);
	ele.class = "ws-pig-iframe";
	var id = "ws-pig-iframe-ID-" + Math.random();
	ele.id = id;
	document.body.append(ele);
	var ele = document.getElementById(id);
	ele.contentWindow.window.name = letter;
	ele.src = "https://websocket-pig.github.io/info#" + encodeURI(decodeURI(url));
	var s = setInterval(function(){
		try {
			var receive = ele.contentWIndow.window.name;
			if (receive.substring(0,7) == "receive")
			{
				clearInterval(s);
				return receive;
			}
		} catch(err) {
		};
	},200);
};
