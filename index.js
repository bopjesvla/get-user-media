
/**
 * Detect getUserMedia implementation.
 */

var getUserMedia = navigator.getUserMedia
  || navigator.webkitGetUserMedia
  || navigator.mozGetUserMedia
  || navigator.msGetUserMedia;

/**
 * Node style getUserMedia.
 *
 * @param {Object} constraints
 * @param {Function} fn
 */
module.exports = function(constraints, fn) {
  function success(stream) {
    fn(null, stream);
  }
  
  function error(err) {
    fn(err);
  }
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    navigator.mediaDevices.getUsermedia(constraints).then(success, error)
  else if (getUserMedia)
    getUserMedia.call(navigator, constraints, success, error);
  else
    fn({name: "NotImplementedError"})
  
};
