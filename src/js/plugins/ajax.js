export default function ajax(url, jsonData, success, error) {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText); // This is my response
      success(this.responseText);
    } else {
      if (error) {
        error(this);
      } else {
        console.log("error", this);
      }
    }
  };
  jsonData = "json=" + JSON.stringify(jsonData);
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhttp.send(jsonData);
}
