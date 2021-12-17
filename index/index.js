import WebGLCoreLogger from "../libs/WebGLCoreLoggerNNC.moduleNoDOM.js";
import neuralNetworkModel from "../neuralNets/NN_DEFAULT";


let _logVal = '';

Page({
  data: {
    logVal: _logVal
  },

  onReady: function () {
    const selector = wx.createSelectorQuery()
    selector.selectAll('.cv')
      .node(this.init.bind(this))
      .exec()
  },

  init(res) {
    const canvas = res[0].node
    canvas.addEventListener = function() {}
    canvas.removeEventListener = function () {}
    WebGLCoreLogger.FAKEDOM.window.setCanvas(canvas)
    
    const that = this;
    WebGLCoreLogger.init({
      isGetVideo: false,
      canvas: canvas,
      logFunc: (strVal) => {
        _logVal += strVal + '\n';
        that.setData({
          logVal: _logVal
        });
      }
    }).then(() => {
      WebGLCoreLogger.test_NN0(neuralNetworkModel);
    })
  }
})