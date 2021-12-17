import WebGLCoreLogger from "../libs/WebGLCoreLoggerNNC.moduleNoDOM.js";
import neuralNetworkModel from "../neuralNets/NN_DEFAULT";


Page({
  data: {
    logVal: ''
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
      logFunc: (strVal) => {
        that.setData({
          logVal: that.data.logVal + '\n' + strVal
        });
      }
    }).then(() => {
      WebGLCoreLogger.test_NN0(neuralNetworkModel);
    })
  }
})