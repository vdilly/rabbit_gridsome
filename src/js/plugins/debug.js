/**
 *  Init : >
 *
 */

export default function() {
  if (process.env.GRIDSOME_BROWSER_ENV != "prod") {
    let error;
    try {
      throw new Error("");
    } catch (e) {
      error = e;
    }
    // IE9 does not have .stack property
    if (error.stack === undefined) {
      return "";
    }
    let stackTrace = error.stack.split("\n")[2];
    if (/ /.test(stackTrace)) {
      stackTrace = stackTrace.trim().split(" ")[1];
    }
    if (stackTrace && stackTrace.indexOf(".") > -1) {
      stackTrace = stackTrace.split(".")[1];
    }

    var args = Array.prototype.slice.call(arguments);
    args.unshift(
      "background-color: #D2D2D2; color: #2E2E2E; padding: 2px 5px;"
    );
    args.unshift("%c " + stackTrace + " ");
    console.log.apply(console, args);
  }
}
