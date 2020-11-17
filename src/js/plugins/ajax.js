/**
 * 
  ajaxPost(
    process.env.GRIDSOME_BACKEND_URL + "/api/extern/jobapply/",
    formData,
    this.success,
    this.error,
    [
      {
        name: "X-AUTH-TOKEN",
        value: process.env.GRIDSOME_X_AUTH_TOKEN,
      },
      {
        name: "X-ACCESS-TOKEN",
        value: process.env.GRIDSOME_X_ACCESS_TOKEN,
      },
    ]
  );
 */

export function ajaxPost(url, data, success, error, headers) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", url, true);
  if (headers) {
    headers.forEach((header) => {
      xhttp.setRequestHeader(header.name, header.value);
    });
  }

  xhttp.onload = function() {
    if (
      this.readyState == 4 &&
      (this.status == 200 || this.status == 201 || this.status == 202)
    ) {
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
export function ajaxGet(url, data, success, error, headers) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, true);
  if (headers) {
    headers.forEach((header) => {
      xhttp.setRequestHeader(header.name, header.value);
    });
  }

  xhttp.onload = function() {
    if (this.readyState == 4 && (this.status == 200 || this.status == 201)) {
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


export function jsonP(url) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement("script");
    const name = "_jsonp_" + Math.round(100000 * Math.random());
    //url formatting
    if (url.match(/\?/)) url += "&c=" + name;
    else url += "?c=" + name;
    script.src = url;
    debug("JSONP to : " + url);

    window[name] = function(data) {
      resolve(data);
      document.body.removeChild(script);
      delete window[name];
    };
    document.body.appendChild(script);
  });
}