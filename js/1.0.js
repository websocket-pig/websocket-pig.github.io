if (typeof websocket == "undefined")
	websocket = {};
websocket.response = [];
websocket.status = [];
websocket.send = function (url,message) {
	var len = websocket.response.length;
	websocket.status[len] = 0;
	var ele = document.createElement("iframe");
	ele.src = location.origin + "/" + Math.random();
	var from_url = location.href;
	from_url = encodeURI(from_url);
	var url = encodeURI(url);
	var letter = "SEND WEBSOCKET PIG FROMSIZE " + from_url.length + " FROM " + from_url + " TOSIZE " + url.length + " TO " + url + " MESSAGESIZE " + message.length + " MESSAGE " + message;
	
	ele.class = "ws-pig-iframe";
	var id = "ws-pig-iframe-ID-" + Math.random();
	ele.id = id;
	document.body.append(ele);
	var ele = document.getElementById(id);
	ele.contentWindow.window.name = letter;
	ele.src = "https://websocket-pig.github.io/info#" + encodeURI(decodeURI(url));
	websocket.status[len] = 1;
	var s = setInterval(function(){
		try {
			var receive = ele.contentWIndow.window.name;
			if (receive.substring(0,7) == "receive")
			{
				clearInterval(s);
				let info = receive;
				let from_size = parseInt(info.substring(31));
				let from_url = info.substring(31+from_size.toString().length+6,31+from_size.toString().length+6+from_size);
				let to_size = parseInt(info.substring(31+from_size.toString().length+6+from_size+8));
				let to_url = info.substring(31+from_size.toString().length+6+from_size+8+to_size.toString().length+4,31+from_size.toString().length+6+from_size+8+to_size.toString().length+4+to_size);
				let message_size = parseInt(info.substring(31+from_size.toString().length+6+from_size+8+to_size.toString().length+4+to_size+13));
				let message_info = info.substring(31+from_size.toString().length+6+from_size+8+to_size.toString().length+4+to_size+13+message_size.toString().length+9);
				websocket.status[len] = 2;
				websocket.response[websocket.response.length] = {content:message_info,from:from_url,url:to_url};
			}
		} catch(err) {
		};
	},200);
	return websocket.response.length;
};
websocket.respond = function (message) {
	var from_url = encodeURI(location.href);
	if (typeof websocket.message == "undefined")
		throw("There is no communication in progress");
	var url = websocket.message.from;
	url = encodeURI(url);
	var letter = "RECEIVE WEBSOCKET PIG FROMSIZE " + from_url.length + " FROM " + from_url + " TOSIZE " + url.length + " TO " + url + " MESSAGESIZE " + message.length + " MESSAGE " + message;
	window.name = letter;
	location.href = "https://websocket-pig.github.io/" + Math.random();
};
websocket.getmessage = function(){
	if (window.name.substring(0,4) == "SEND")
	{
		let info = window.name;
		let from_size = parseInt(info.substring(28));
		let from_url = info.substring(28+from_size.toString().length+6,28+from_size.toString().length+6+from_size);
		let to_size = parseInt(info.substring(28+from_size.toString().length+6+from_size+8));
		let to_url = info.substring(28+from_size.toString().length+6+from_size+8+to_size.toString().length+4,28+from_size.toString().length+6+from_size+8+to_size.toString().length+4+to_size);
		let message_size = parseInt(info.substring(28+from_size.toString().length+6+from_size+8+to_size.toString().length+4+to_size+13));
		let message_info = info.substring(28+from_size.toString().length+6+from_size+8+to_size.toString().length+4+to_size+13+message_size.toString().length+9);
		websocket.message = {content:message_info,from:from_url,url:to_url};
		if (to_url != location.href)
			websocket.response_error("The path does not match");
		return {content:message_info,from:from_url,url:to_url};
			
	} else return "No message.";
};
setInterval(function(){
	websocket.getmessage();
},200);
