var websocket = {};
websocket.init = function(str)
{
  if (typeof str == "undefined")
    str = "latest";
  var xhr = new XMLHttpRequest();
  xhr.open("POST","https://websocket-pig.github.io/js/" + str + ".js",false);
  xhr.send();
  if (xhr.status == 200)
  {
    eval(xhr.responseText);
    return {"status":200,"result":xhr.responseText};
  } else {
    throw("Connot initialization the websocket.");
  }
};
