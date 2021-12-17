import WebGLCoreLogger from "../libs/WebGLCoreLoggerNNC.moduleNoDOM.js";
import neuralNetworkModel from "../neuralNets/NN_DEFAULT";


const vw = 288
const vh = 384

//const arrayBuffer = new Uint8Array(vw * vh * 4); // vw and vh are video width and height in pixels
const FAKEVIDEOELEMENT = {
  isFakeVideo: true, //always true
  arrayBuffer: null, // the WeChat video arrayBuffer
  videoHeight: vh, // height in pixels
  videoWidth: vw, //width in pixels
  needsUpdate: false // boolean
};

let COUNT = 0

Page({
  data: {
    logVal: '',
    width: 288,
    height: 384,
  },
  onReady: function () {
    const selector = wx.createSelectorQuery()
    selector.selectAll('.cv')
      .node(this.init.bind(this))
      .exec()
  },

  // callback: launched if a face is detected or lost
  detect_callback(faceIndex, isDetected) {
    if (isDetected) {
      console.log("INFO in detect_callback(): DETECTED");
    } else {
      console.log("INFO in detect_callback(): LOST");
    }
  },


  init_faceFilter(canvas, cb) {
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
  },


  init(res) {
    const canvas = res[0].node
    canvas.addEventListener = function() {}
    canvas.removeEventListener = function () {}
    const context = wx.createCameraContext()
    let isInitialized = false
    WebGLCoreLogger.FAKEDOM.window.setCanvas(canvas)
    let isFFInitialized = false
    this.init_faceFilter(canvas, function(){
      isFFInitialized = true
    })

    const listener = context.onCameraFrame((frame) => {
      if (isFFInitialized){
        FAKEVIDEOELEMENT.arrayBuffer = new Uint8Array(frame.data)
        FAKEVIDEOELEMENT.videoWidth = frame.width
        FAKEVIDEOELEMENT.videoHeight = frame.height
        FAKEVIDEOELEMENT.needsUpdate = true
      }
    })
    listener.start()
  }
})