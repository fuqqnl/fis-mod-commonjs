
var testA = require('./testA.js');
testA.testAStart();
module.exports = {
    init: function () {
        alert('先执行起来');
    }
}