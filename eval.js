// not my code. From the npm paralleljs website, cited

//


/* eslint-disable no-restricted-globals */
const isNode = typeof module !== 'undefined' && module.exports;

if (isNode) {
  process.on('message', (code) => {
    try {
      const result = eval(code.data);
      process.send(result);
    } catch (error) {
      process.send({ error: error.message });
    }
  });
} else {
  self.onmessage = function(e) {
    try {
      const result = eval(e.data);
      self.postMessage(result);
    } catch (error) {
      self.postMessage({ error: error.message });
    }
  };
}
