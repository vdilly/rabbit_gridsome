export function ajaxPost(url, data, success, error) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", url, true);
  xhttp.onload = function() {
    // xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    if (this.readyState == 4 && this.status == 200) {
      success(this.responseText);
    } else {
      if (error) {
        error(this);
      } else {
        console.log("error", this);
      }
    }
  };
  xhttp.send(data);
}
export function ajaxGet() {}
