function encodeWordURI(tplan) {
  tplan = tplan.replace(/\ /g, "");
  tplan = tplan.replace(/\\/g, "\\");
  tplan = tplan.replace(/\#/g, "\\#");
  tplan = tplan.replace(/\&/g, "\\&");
  tplan = tplan.replace(/\*/g, "\\*");
  tplan = tplan.replace(/\?/g, "\\?");
  return tplan;
}


function A(a, ...b) {
  console.log(a, b)
}

A(1)