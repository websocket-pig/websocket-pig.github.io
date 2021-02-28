{
	let version = "1.0";
	let xhr = new XMLHttpRequest();
	xhr.open("GET","https://websocket-pig.github.io/js/" + version + ".js",false);
	xhr.send();
	if (xhr.status == 200)
		eval(xhr.result);
	else
		throw("The latest WebSocket file could not be obtained");
}
