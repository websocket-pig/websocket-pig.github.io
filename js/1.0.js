if (typeof websocket == "undefined")
	websocket = {};
websocket.response = [];
websocket.status = [];
websocket.send_time = [];
websocket.response_time = [];
websocket.send_content = [];
websocket.tourl = [];
websocket.send = function (url,message) {
	var len = websocket.status.length;
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
	websocket.send_content[len] = message;
	websocket.tourl[len] = url;
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
				websocket.response[len] = {content:message_info,from:from_url,url:to_url};
				websocket.response_time[len] = new Date().toString();
			}
		} catch(err) {
		};
	},200);
	websocket.send_time[websocket.status.length-1] = new Date().toString();
	return (websocket.status.length - 1);
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
websocket.button = document.createElement("div");
websocket.button.id = "websocket-button";
websocket.button.style.position = "fixed";
websocket.button.style.top = "0%";
websocket.button.style.right = "5%";
websocket.button.style.background = "skyblue";
websocket.button.innerHTML = "<font color=red>WebSocket-Pig</font><br>Version:1.0<br><input type=button value=Console onclick=javascript:websocket.show('console');><br>websocket-pig.github.io";
document.body.append(websocket.button);
websocket.console = document.createElement("div");
websocket.console.id = "websocket-console";
websocket.console.style.position = "fixed";
websocket.console.style.width = "80%";
websocket.console.style.height = "80%";
websocket.console.style.top = "10%";
websocket.console.style.left = "10%";
websocket.console.style.display = "none";
websocket.console.style.background = "skyblue";
websocket.console.style.overflow = "auto";
document.body.append(websocket.console);
websocket.show = function (str) {
	if (str == "console")
	{
		var content = "";
		var i = 0;
		while (i != websocket.status.length)
		{
			content += "Event ID:" + i + "<br>Send_Time:" + websocket.send_time[i] + " Response_Time:" + websocket.response_time[i] + "<br>URL:" + websocket.tourl[i] + "<br>Send_content:<span style='background:white;color:red'>" + websocket.send_content[i] + "</span><br>Response_content:<span style='background:white;color:red'>" + websocket.response[i] + "</span><hr>";
			
			i++;
		}
		content += "<span style='position:absolute;right:0%;top:0%;background:red;color:white' onclick=javascript:document.getElementById('websocket-console').style.display='none';>X</span>";
		document.getElementById("websocket-console").innerHTML = content;
		document.getElementById("websocket-console").style.display = "";
	}
};


