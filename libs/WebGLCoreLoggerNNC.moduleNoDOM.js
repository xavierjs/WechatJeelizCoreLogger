// BEGIN EMULATE DOM
// useful for WeChat miniprograms

// import some usefull stuffs
try {
  var Buffer = require('buffer').Buffer;
} catch(err) {
  console.log('Cannot import Buffer package');
}

// emulate global variables:
const navigator = {  
  platform: "Linux x86_64",
  userAgent: "forceWebGL1_noAntialiasing_noDOM"
};

const window = {
  canvas: null,
  innerWidth: -1,
  innerHeight: -1,
  URL: {
    createObjectURL: function() {
      return null
    }
  },
  addEventListener: function() {},
  removeEventListener: function() {},
  requestAnimationFrame: function(step) {
    if (window.canvas === null){
      setTimeout(step, 1);
      return;
    }
    window.canvas.requestAnimationFrame(step)
  },
  cancelAnimationFrame: function(step) {
    if (window.canvas === null){
      return;
    }
    window.canvas.cancelAnimationFrame(step)
  },
  setCanvas: function(c) {
    window.canvas = c;
  }
};

const document = {
  createElement: function(elementType){
    switch(elementType){
      case 'canvas':
        return null; // return a real canvas
    }
  },
  getElementById: function(elementId){
    return null;
  },
  body: { appendChild: function(element){ return null; }}
};

if(typeof(wx) !== 'undefined'){ //WECHAT
  const systemInfo = wx.getSystemInfoSync()
  window.innnerWidth = systemInfo.windowWidth;
  window.innnerHeight = systemInfo.windowHeight;
}

const FAKEDOM = {
  window: window,
  document: document,
  navigator: navigator
};
// END EMULATE DOM


window.WebGLCoreLogger = function() {
  function Wa(a) {
    var c = null, e = null, k = null, p = 0;
    this.D = function(m) {
      this.vd(m.sa);
      k.Bc({Za:m.Za, Wa:m.Wa});
    };
    this.Vc = function(m) {
      return c[m];
    };
    this.vd = function(m) {
      var w = null;
      p = m.length;
      c = m.map(function(g, n) {
        g = Object.assign({}, g, {index:n, parent:this, wa:w, hd:n === p - 1});
        return w = n = 0 === n ? Xa.instance(g) : Ya.instance(g);
      });
      e = c[0];
      k = c[p - 1];
      c.forEach(function(g, n) {
        0 !== n && g.nd();
      });
    };
    this.I = function(m) {
      m.h(0);
      var w = m;
      c.forEach(function(g) {
        w = g.I(w, !1);
      });
      return w;
    };
    this.Tc = function() {
      return e.A();
    };
    this.Xc = function() {
      return k.A();
    };
    this.Na = function() {
      return k.Wc();
    };
    this.Gb = function() {
      return k.Gb();
    };
    this.m = function() {
      c && (c.forEach(function(m) {
        m.m();
      }), k = e = c = null, p = 0);
    };
    "undefined" !== typeof a && this.D(a);
  }
  function Ia(a, c) {
    var e = c % 8;
    return a[(c - e) / 8] >> 7 - e & 1;
  }
  function Za(a) {
    var c = JSON.parse(a);
    a = c.ne;
    var e = c.nf, k = c.n;
    var p = "undefined" === typeof btoa ? Buffer.from(c.data, "base64").toString("latin1") : atob(c.data);
    var m = p.length;
    c = new Uint8Array(m);
    for (var w = 0; w < m; ++w) {
      c[w] = p.charCodeAt(w);
    }
    p = new Float32Array(k);
    m = new Float32Array(e);
    w = a + e + 1;
    for (var g = 0; g < k; ++g) {
      for (var n = w * g, l = 0 === Ia(c, n) ? 1 : -1, A = n + 1, B = 1, v = 0, h = A + a - 1; h >= A; --h) {
        v += B * Ia(c, h), B *= 2;
      }
      A = v;
      n = n + 1 + a;
      B = m.length;
      v = 0;
      for (h = n; h < n + B; ++h) {
        m[v] = Ia(c, h, !0), ++v;
      }
      for (B = n = 0; B < e; ++B) {
        n += m[B] * Math.pow(2.0, -B - 1);
      }
      p[g] = 0 === n && 0 === A ? 0 : l * (1.0 + n) * Math.pow(2.0, 1 + A - Math.pow(2.0, a - 1));
    }
    return p;
  }
  function $a() {
    document.body.style.backgroundColor = "silver";
    ha.ca = document.createElement("textarea");
    var a = ha.ca.style;
    a.width = "100vw";
    a.height = "calc(100vh - 180px)";
    a.position = "fixed";
    a.top = "0";
    a.left = "0";
    a.padding = "0";
    document.body.appendChild(ha.ca);
    ha.ub = Oa("Copy to clipboard", ab);
    ha.ub.style.left = "6px";
    ha.Kb = Oa("Go to GIST", function() {
      window.location.href = "https://gist.github.com/";
    });
    ha.Kb.style.right = "6px";
  }
  function ab() {
    var a = ha.ca;
    a.select();
    a.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Text copied to clipboard. Now please post it as a public GIST and send the URL to the GIST. Thank you :)");
  }
  function Oa(a, c) {
    var e = document.createElement("button");
    e.innerHTML = a;
    a = e.style;
    a.position = "fixed";
    a.bottom = "6px";
    a.cursor = "pointer";
    a.width = "40vw";
    a.height = "48px";
    a.padding = "0";
    e.addEventListener("click", c, !1);
    document.body.appendChild(e);
    return e;
  }
  function u() {
    for (var a = [], c = 0; c < arguments.length; ++c) {
      var e = arguments[c], k = "undefined";
      switch(typeof e) {
        case "object":
          try {
            k = JSON.stringify(e);
          } catch (p) {
            k = "<Cannot parse because of circular dependancy>";
          }
          break;
        case "undefined":
          break;
        default:
          k = e.toString();
      }
      a.push(k);
    }
    a = a.join(" ") + "\n";
    sa.logFunc ? sa.logFunc(a) : ha.ca.value += a;
  }
  function bb(a, c) {
    u("INFO in WebGLCoreLogger: VIDEO GOT! Start PlayerFF");
    Ja(a, c);
  }
  function cb(a, c) {
    u("ERROR in WebGLCoreLogger: Cannot get the video");
    Ja(a, c);
  }
  function Pa() {
    u("Environment:");
    u("  Date =", (new Date()).toString());
    u(db.Lc(b, "  ").join("\n"));
  }
  function Ja(a, c) {
    if (Ea.D({ka:ha.canvas, width:sa.size, height:sa.size, debug:!1, Va:function() {
      u("FATAL ERROR in WebGLCoreLogger: WebGL context lost");
    }, antialias:!0, premultipliedAlpha:!0})) {
      return Pa(b), u("INFO in WebGLCoreLogger: It should WORK YEAH!!!"), a && a(), !0;
    }
    Pa(b);
    u("FATAL ERROR in WebGLCoreLogger: GL_INCOMPATIBLE");
    c && c();
    return !1;
  }
  var eb = {create:function(a, c) {
    for (var e = Array(c), k = 0; k < c; ++k) {
      e[k] = a;
    }
    return e;
  }, Qd:function(a, c) {
    for (var e = 0; e < a.length; ++e) {
      c[e] = a[e];
    }
  }, clone:function(a) {
    for (var c = Array(a.length), e = 0; e < a.length; ++e) {
      c[e] = a[e];
    }
    return c;
  }, Ce:function(a, c, e) {
    a.forEach(function(k, p) {
      c[p] = k * e;
    });
  }, Me:function(a) {
    for (var c = a.length - 1; 0 < c; --c) {
      var e = Math.floor(Math.random() * (c + 1)), k = a[c];
      a[c] = a[e];
      a[e] = k;
    }
  }, Ne:function(a) {
    return a.sort(function(c, e) {
      return c - e;
    });
  }, Dd:function(a) {
    return Array.isArray(a) || a.constructor === Float32Array || a.constructor === Uint8Array;
  }}, Ka = {Ha:function(a, c) {
    if (0 === c || "object" !== typeof a) {
      return a;
    }
    a = Object.assign({}, a);
    c = void 0 === c || -1 === c ? -1 : c - 1;
    for (var e in a) {
      a[e] = Ka.Ha(a[e], c);
    }
    return a;
  }, Td:function(a) {
    return JSON.parse(JSON.stringify(a));
  }}, fb = {Jc:function(a, c, e) {
    switch(a) {
      case "relu":
        return e + "=max(vec4(0.,0.,0.,0.)," + c + ");";
      case "elu":
        return e + "=mix(exp(-abs(" + c + "))-vec4(1.,1.,1.,1.)," + c + ",step(0.," + c + "));";
      case "elu01":
        return e + "=mix(0.1*exp(-abs(" + c + "))-vec4(0.1,0.1,0.1,0.1)," + c + ",step(0.," + c + "));";
      case "arctan":
        return e + "=atan(3.14159265359*texture2D(u0,vUV))/3.14159265359;";
      case "copy":
        return "";
      default:
        return !1;
    }
  }}, F = function() {
    function a(r, q, y) {
      q = r.createShader(q);
      r.shaderSource(q, y);
      r.compileShader(q);
      return r.getShaderParameter(q, r.COMPILE_STATUS) ? q : !1;
    }
    function c(r, q, y) {
      q = a(r, r.VERTEX_SHADER, q);
      y = a(r, r.FRAGMENT_SHADER, y);
      r === b && g.push(q, y);
      var M = r.createProgram();
      r.attachShader(M, q);
      r.attachShader(M, y);
      r.linkProgram(M);
      return M;
    }
    function e(r) {
      return ["float", "sampler2D", "int"].map(function(q) {
        return "precision " + r + " " + q + ";\n";
      }).join("");
    }
    function k(r, q, y) {
      q.u = q.u ? !0 : !1;
      if (!q.u) {
        q.kc = q.kc || "precision lowp float;attribute vec2 a0;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=a0*.5+vec2(.5,.5);}";
        q.lb = q.lb || ["a0"];
        q.Ea = q.Ea || [2];
        q.precision = q.precision || v;
        q.id = A++;
        void 0 !== q.cc && (q.cc.forEach(function(E, H) {
          q.g = q.g.replace(E, q.xa[H]);
        }), q.cc.splice(0));
        q.hb = 0;
        q.Ea.forEach(function(E) {
          q.hb += 4 * E;
        });
        var M = e(q.precision);
        q.W = c(r, M + q.kc, M + q.g);
        u("INFO in ShadersFF.js: compile", y);
        q.s = {};
        q.i.forEach(function(E) {
          q.s[E] = r.getUniformLocation(q.W, E);
        });
        q.attributes = {};
        q.ea = [];
        q.lb.forEach(function(E) {
          var H = r.getAttribLocation(q.W, E);
          q.attributes[E] = H;
          q.ea.push(H);
        });
        if (q.j) {
          r.useProgram(q.W);
          l = q;
          n = q.id;
          for (var f in q.j) {
            r.uniform1i(q.s[f], q.j[f]);
          }
        }
        q.Ta = !0;
      }
    }
    function p(r) {
      ka.yd(N);
      n !== r.id && (N.H(), n = r.id, l = r, b.useProgram(r.W), r.ea.forEach(function(q) {
        0 !== q && b.enableVertexAttribArray(q);
      }));
    }
    function m(r, q, y) {
      k(r, q, y);
      r.useProgram(q.W);
      r.enableVertexAttribArray(q.attributes.a0);
      n = -1;
      return l = q;
    }
    function w() {
      return {g:"uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}", i:["u1"], j:{u1:0}};
    }
    var g = [], n = -1, l = null, A = 0, B = !1, v = "highp", h = ["u1"], G = ["u0"], x = {u1:0}, d = {u0:0}, C = {u1:0, u2:1}, K = {u3:0}, Q = {s0:w(), s1:{g:"uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}", i:h, j:x, precision:"lowp"}, s2:{g:"uniform sampler2D u1,u2;varying vec2 vv0;void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a*b;}", i:["u1", "u2"], j:C}, s3:{g:"uniform sampler2D u1;uniform vec2 u4,u5;varying vec2 vv0;void main(){vec2 a=vv0*u4+u5;gl_FragColor=texture2D(u1,a);}", 
    i:["u1", "u4", "u5"], j:x, u:!0}, s4:{g:"uniform sampler2D u1;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a.r*f;}", i:h, j:x}, s5:{g:"uniform sampler2D u1,u2;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a.a*b.r*f;}", i:["u1", "u2"], j:C}, s6:{g:"uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(1.-vv0.x,vv0.y));}", i:h, j:x}, s7:{g:"uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(vv0.x,1.-vv0.y));}", 
    i:h, j:x}, s8:{g:"uniform sampler2D u0;uniform float u4;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=a*u4;}", i:["u0", "u4"], j:d}, s9:{g:"uniform sampler2D u0;uniform float u4;varying vec2 vv0;const vec4 f=vec4(.25,.25,.25,.25),g=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);float b=dot(a*u4,f);gl_FragColor=b*g;}", i:["u0", "u4"], j:d}, s10:{g:"uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){float a=.25*dot(e,texture2D(u1,vv0));gl_FragColor=a*e;}", 
    i:h, j:x}, s11:{g:"uniform sampler2D u1,u6;uniform float u7;const vec4 f=vec4(1.,1.,1.,1.);varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u6,vv0);gl_FragColor=mix(b,a,u7*f);}", i:["u1", "u6", "u7"], j:{u1:0, u6:1}}, s12:{g:"uniform sampler2D u1;uniform vec2 u8;varying vec2 vv0;void main(){gl_FragColor=.25*(texture2D(u1,vv0+u8)+texture2D(u1,vv0+u8*vec2(1.,-1.))+texture2D(u1,vv0+u8*vec2(-1.,-1.))+texture2D(u1,vv0+u8*vec2(-1.,1.)));}", i:["u1", "u8"], j:x}, s13:{g:"uniform sampler2D u1;uniform vec4 u9;varying vec2 vv0;float g(float a,float b){a=floor(a)+.5;return floor(a/exp2(b));}float h(float a,float b){return floor(a*exp2(b)+.5);}float i(float a,float b){return mod(a,h(1.,b));}float e(float c,float a,float b){a=floor(a+.5),b=floor(b+.5);return i(g(c,a),b-a);}vec4 j(float a){if(a==0.)return vec4(0.,0.,0.,0.);float k=128.*step(a,0.);a=abs(a);float c=floor(log2(a)),l=c+127.,b=(a/exp2(c)-1.)*8388608.,d=l/2.,m=fract(d)*2.,n=floor(d),o=e(b,0.,8.),p=e(b,8.,16.),q=m*128.+e(b,16.,23.),r=k+n;return vec4(o,p,q,r)/255.;}void main(){float a=dot(texture2D(u1,vv0),u9);gl_FragColor=j(a);}", 
    i:["u1", "u9"], j:x}, s14:{g:"uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=e/(e+exp(-a));gl_FragColor=b;}", i:G, j:d, u:!0}, s15:{g:"uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(0.,0.,0.,0.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=max(f,a);}", i:G, j:d}, s16:{g:"uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=mix(exp(-abs(a))-f,a,step(0.,a));}", 
    i:G, j:d}, s17:{g:"uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=exp(-abs(a))-f;gl_FragColor=mix(.1*b,a,step(0.,a));}", i:G, j:d}, s18:{g:"uniform sampler2D u0,u7,u10;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),c=texture2D(u7,vv0),d=texture2D(u10,vv0),b=a/d;gl_FragColor=c*mix(exp(-abs(b))-f,b,step(0.,a));}", i:["u0", "u7", "u10"], j:{u0:0, u7:1, u10:2}, u:!0}, s19:{g:"uniform sampler2D u0;const float e=3.141593;varying vec2 vv0;void main(){gl_FragColor=atan(e*texture2D(u0,vv0))/e;}", 
    i:G, j:d}, s20:{g:"uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=log(f+a);gl_FragColor=b;}", i:G, j:d, u:!0}, s21:{g:"uniform sampler2D u0,u11;uniform float u12;const vec2 e=vec2(.5,.5);const float f=1e-5;const vec4 g=vec4(1.,1.,1.,1.),i=vec4(0.,0.,0.,0.);varying vec2 vv0;void main(){vec4 a=texture2D(u11,e);float b=u12*u12;vec4 c=max(b*a,f*g);gl_FragColor=texture2D(u0,vv0)/c;}", i:["u0", "u11", "u12"], j:{u0:0, u11:1}, u:!0}, s22:{g:"uniform sampler2D u1;uniform vec2 u13;varying vec2 vv0;void main(){float a=u13.x*u13.y;vec2 b=floor(vv0*a)/a,c=fract(vv0*a),d=floor(b*u13.y),f=floor(u13.x*fract(b*u13.y)),g=(f*u13.y+d)/a;gl_FragColor=texture2D(u1,g+c/a);}", 
    i:["u1", "u13"], j:x}, s23:{g:"uniform sampler2D u14,u15,u16;varying vec2 vv0;void main(){vec4 a=texture2D(u16,vv0);vec2 b=a.rg,c=a.ba;vec4 d=texture2D(u14,b),f=texture2D(u15,c);gl_FragColor=d*f;}", i:["u14", "u15", "u16"], j:{u15:0, u14:1, u16:2}, u:!0}, s24:{g:"uniform float u17;uniform sampler2D u14,u15;varying vec2 vv0;void main(){vec2 a=fract(vv0*u17);vec4 b=texture2D(u14,vv0),c=texture2D(u15,a);gl_FragColor=b*c;}", i:["u15", "u14", "u17"], j:{u15:0, u14:1}}, s25:{g:"uniform float u17;uniform sampler2D u14,u15,u18,u19,u20,u21;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(1e-3,1e-3,1e-3,1e-3);void main(){vec2 h=vv0*u17,l=floor(h),c=h-l;vec4 m=texture2D(u14,vv0),d=texture2D(u15,c),a=texture2D(u21,vv0);a=a*255.;vec4 n=texture2D(u18,c),o=texture2D(u19,c),p=texture2D(u20,c),i=step(-g,-a),b=e-i,j=b*step(-e-g,-a);b*=e-j;vec4 k=b*step(-2.*e-g,-a);b*=e-k;vec4 q=b;d=i*d+j*n+k*o+q*p,gl_FragColor=m*d;}", 
    i:"u14 u15 u17 u21 u18 u19 u20".split(" "), j:{u15:0, u14:1, u21:3, u18:4, u19:5, u20:6}, u:!0}, s26:{g:"uniform sampler2D u14,u15,u22;uniform float u17,u23,u24,u25;varying vec2 vv0;const vec2 j=vec2(1.,1.),k=vec2(0.,0.);void main(){vec2 b=floor(u23*vv0),c=u23*vv0-b;float d=u17/u23;vec2 f=floor(c*d),g=c*d-f,h=(b+g)/u23;float l=u23*u25/u17;vec2 m=l*f,a=(m+g*u24)/u25;a+=.25/u25;vec2 i=step(a,j)*step(k,a);vec4 n=texture2D(u14,h),o=texture2D(u15,a),p=n*o,q=texture2D(u22,h);gl_FragColor=(p*u24*u24+q)*i.x*i.y;}", 
    i:"u14 u15 u17 u23 u24 u25 u22".split(" "), j:{u15:0, u14:1, u22:2}}, s27:{g:"uniform sampler2D u14,u15;varying vec2 vv0;void main(){vec4 a=texture2D(u14,vv0),b=texture2D(u15,vv0);gl_FragColor=a*b;}", i:["u14", "u15"], j:{u15:0, u14:1}, u:!0}, s28:{g:"uniform sampler2D u1,u22;uniform float u26;varying vec2 vv0;void main(){gl_FragColor=texture2D(u22,vv0)+u26*texture2D(u1,vv0);}", i:["u1", "u22", "u26"], j:{u1:0, u22:1}}, s29:{g:"varying vec2 vv0;uniform sampler2D u1;const vec4 f=vec4(1.,1.,1.,1.),g=vec4(.299,.587,.114,0.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=dot(a,g)*f;}", 
    i:h, j:x, precision:"lowp"}, s30:{g:"varying vec2 vv0;uniform sampler2D u1;uniform float u27;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u27)).rgb,c=texture2D(u1,vv0+vec2(u27,u27)).rgb,d=texture2D(u1,vv0+vec2(u27,0.)).rgb;gl_FragColor=vec4(dot(a,f),dot(b,f),dot(c,f),dot(d,f));}", i:["u1", "u27"], j:x, precision:"lowp"}, s31:{g:"varying vec2 vv0;uniform sampler2D u1;uniform float u27;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u27)).rgb,c=texture2D(u1,vv0+vec2(u27,u27)).rgb,d=texture2D(u1,vv0+vec2(u27,0.)).rgb;gl_FragColor=vec4(a.r,b.g,c.b,dot(d,f));}", 
    i:["u1", "u27"], j:x, precision:"lowp"}, s32:{g:"varying vec2 vv0;uniform sampler2D u1,u2;uniform float u28;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=vec4(0.);a-=texture2D(u1,vec2(vv0.x-u28,vv0.y-u28))*1.,a-=texture2D(u1,vec2(vv0.x-u28,vv0.y))*2.,a-=texture2D(u1,vec2(vv0.x-u28,vv0.y+u28))*1.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y-u28))*1.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y))*2.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y+u28))*1.;vec4 b=vec4(0.);b-=texture2D(u1,vec2(vv0.x-u28,vv0.y-u28))*1.,b-=texture2D(u1,vec2(vv0.x,vv0.y-u28))*2.,b-=texture2D(u1,vec2(vv0.x+u28,vv0.y-u28))*1.,b+=texture2D(u1,vec2(vv0.x-u28,vv0.y+u28))*1.,b+=texture2D(u1,vec2(vv0.x,vv0.y+u28))*2.,b+=texture2D(u1,vec2(vv0.x+u28,vv0.y+u28))*1.;vec3 c=sqrt(a.rgb*a.rgb+b.rgb*b.rgb);vec4 e=vec4(c,texture2D(u1,vv0).a),g=texture2D(u2,vv0);gl_FragColor=g.a*e.r*f;}", 
    i:["u1", "u2", "u28"], j:C, u:!0}, s33:{g:"varying vec2 vv0;uniform sampler2D u1,u2;uniform float u28;const vec4 j=vec4(1.,1.,1.,1.);const vec2 k=vec2(1.,1.);void main(){float h=0.;vec2 l=k*u28,a,b;float c,d,i=0.;for(float e=-4.;e<=4.;e+=1.)for(float f=-4.;f<=4.;f+=1.)a=vec2(e,f),c=length(a)/2.,d=exp(-c*c),b=vv0+l*a,h+=d*texture2D(u1,b).r,i+=d;vec4 m=texture2D(u2,vv0);gl_FragColor=m.a*(texture2D(u1,b).r-h/i)*j;}", i:["u1", "u2", "u28"], j:C, u:!0}, s34:{g:"uniform sampler2D u3;uniform vec2 u8;varying vec2 vv0;vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}const vec2 g=vec2(.5,.5),h=vec2(1.,0.),i=vec2(0.,1.);void main(){vec2 a=vv0-u8*g;vec4 b=texture2D(u3,a),c=texture2D(u3,a+u8*h),d=texture2D(u3,a+u8*i),j=texture2D(u3,a+u8),k=e(b,c),l=e(d,j);gl_FragColor=e(k,l);}", 
    i:["u3", "u8"], j:K}, s35:{g:"uniform sampler2D u3;uniform vec2 u8;varying vec2 vv0;const vec2 k=vec2(1.,0.),l=vec2(0.,1.),m=vec2(2.,0.),n=vec2(0.,2.);vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}vec4 f(vec2 a){vec4 b=texture2D(u3,a),c=texture2D(u3,a+u8*k),d=texture2D(u3,a+u8*l),g=texture2D(u3,a+u8),h=e(b,c),i=e(d,g);return e(h,i);}void main(){vec2 a=vv0+u8*vec2(-.55,-1.05);vec4 b=f(a),c=f(a+u8*m),d=f(a+u8*2.),g=f(a+u8*n),h=e(b,c),i=e(d,g);gl_FragColor=e(h,i);}", i:["u3", "u8"], 
    j:K, u:!0}, s36:{g:"uniform sampler2D u1;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a*a;}", i:["u1"], j:x, precision:"lowp", u:!0}, s37:{g:"uniform sampler2D u1;uniform vec2 u8;varying vec2 vv0;const float e=15444.;void main(){vec4 a=1001./e*texture2D(u1,vv0-3.*u8)+2002./e*texture2D(u1,vv0-2.*u8)+3003./e*texture2D(u1,vv0-u8)+3432./e*texture2D(u1,vv0)+3003./e*texture2D(u1,vv0+u8)+2002./e*texture2D(u1,vv0+2.*u8)+1001./e*texture2D(u1,vv0+3.*u8);gl_FragColor=a;}", i:["u8", 
    "u1"], j:x, precision:"lowp", u:!0}, s38:{g:"uniform sampler2D u1,u11,u29;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);const float g=.1;void main(){vec4 a=texture2D(u11,vv0),b=texture2D(u29,vv0),c=texture2D(u1,vv0),d=max(f*g,b-a*a),h=sqrt(d);gl_FragColor=(c-a)/h;}", i:["u1", "u11", "u29"], j:{u1:0, u11:1, u29:2}, u:!0}}, T = {s39:{g:"uniform float u17,u30;uniform sampler2D u14,u15,u22;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-5,1e-5);void main(){vec4 sum=texture2D(u22,vv0);float toSparsity=1.1111;vec2 uvFrom,uvWeight,xyPatch=ZERO2,eps2=EPS2/u17,xyTo=floor(vv0*u17+eps2);float weightSize=toSparsity*u17;vec2 halfFromSparsity=ONE2*(toSparsity-1.)/2.;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.)xyPatch.y=patch_y,uvFrom=(xyTo+HALF2+u30*(xyPatch-halfFromSparsity))/u17,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),uvWeight=(xyTo*toSparsity+xyPatch+HALF2)/weightSize,sum+=texture2D(u14,uvWeight)*texture2D(u15,uvFrom);}gl_FragColor=sum,gl_FragColor*=2.2222;}", 
    i:["u17", "u14", "u15", "u22", "u30"], xa:["1.1111", "gl_FragColor\\*=2.2222;"]}, s40:{g:"uniform float u17,u30,u25;uniform sampler2D u14,u15,u22;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-4,1e-4);void main(){vec4 sum=texture2D(u22,vv0);float fromSparsity=1.1111,shrinkFactor=3.3333;vec2 uvFrom,uvWeight,xyFrom,xyPatchTo,xyPatch=ZERO2,xyShrink=ZERO2,eps2=EPS2/u25,xyTo=floor(vv0*u17+eps2);float weightSize=fromSparsity*u25;vec2 halfFromSparsity=ONE2*(fromSparsity-1.)/2.;float toSparsity=weightSize/u17;vec2 xyFrom0=xyTo*shrinkFactor;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.){xyPatch.y=patch_y;for(float shrink_x=0.;shrink_x<3.3333;shrink_x+=1.){xyShrink.x=shrink_x;for(float shrink_y=0.;shrink_y<3.3333;shrink_y+=1.)xyShrink.y=shrink_y,xyFrom=xyFrom0+xyShrink+shrinkFactor*u30*(xyPatch-halfFromSparsity),uvFrom=(xyFrom+HALF2)/u25,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),xyPatchTo=xyPatch*shrinkFactor+xyShrink,uvWeight=(xyTo*toSparsity+xyPatchTo+HALF2)/weightSize,sum+=texture2D(u14,uvWeight)*texture2D(u15,uvFrom);}}}gl_FragColor=sum,gl_FragColor*=2.2222;}", 
    i:"u17 u25 u14 u15 u22 u30".split(" "), xa:["1.1111", "gl_FragColor\\*=2.2222;", "3.3333"]}}, D = null, I = null, N = {ra:function() {
      return B;
    }, D:function() {
      if (!B) {
        D = Ka.Ha(Q, 2);
        I = Ka.Ha(T, 2);
        v = "highp";
        if (b.getShaderPrecisionFormat) {
          var r = b.getShaderPrecisionFormat(b.FRAGMENT_SHADER, b.MEDIUM_FLOAT).precision, q = b.getShaderPrecisionFormat(b.FRAGMENT_SHADER, b.LOW_FLOAT).precision;
          u("INFO in ShadersFeedForward - determine_highPrecisionLevel(): precisions mantissa for lowp, mediump =", q, r);
        }
        for (var y in D) {
          k(b, D[y], y);
        }
        F.set("s0");
        b.enableVertexAttribArray(0);
        B = !0;
      }
    }, nc:function(r) {
      r.forEach(function(q) {
        N.kb(q);
      });
    }, kb:function(r) {
      D[r.id] = r;
      k(b, r, r.id);
    }, Mb:function(r, q, y) {
      q || (q = r);
      D[q] = Object.create(I[r]);
      D[q].gd = !0;
      I[r].xa && I[r].xa.forEach(function(M, f) {
        D[q].g = D[q].g.replace(new RegExp(M, "g"), y[f]);
      });
      k(b, D[q], q);
    }, set:function(r) {
      if (!(r in D)) {
        u("ERROR in Shader.js - set: unknow shader: ", r);
        debugger;
      }
      var q = D[r];
      q.u && (q.u = !1, k(b, q, r));
      p(q);
    }, ha:function(r) {
      return m(r, w(), "s41");
    }, ab:function(r) {
      return m(r, {g:"void main(){gl_FragColor=vec4(.5,.5,.5,.5);}", i:[], precision:v}, "s42");
    }, Hc:function(r) {
      return "undefined" === typeof D[r] ? !1 : D[r].Ta;
    }, H:function() {
      -1 !== n && (n = -1, l.ea.forEach(function(r) {
        0 !== r && b.disableVertexAttribArray(r);
      }));
    }, bb:function() {
      var r = 0;
      l.ea.forEach(function(q, y) {
        y = l.Ea[y];
        b.vertexAttribPointer(q, y, b.FLOAT, !1, l.hb, r);
        r += 4 * y;
      });
    }, Gc:function() {
      b.enableVertexAttribArray(0);
    }, ia:function() {
      N.za(b);
    }, za:function(r) {
      r.vertexAttribPointer(l.ea[0], 2, r.FLOAT, !1, 8, 0);
    }, Fe:function(r, q) {
      b.uniform1i(l.s[r], q);
    }, M:function(r, q) {
      b.uniform1f(l.s[r], q);
    }, Y:function(r, q, y) {
      b.uniform2f(l.s[r], q, y);
    }, Ge:function(r, q) {
      b.uniform2fv(l.s[r], q);
    }, Ie:function(r, q) {
      b.uniform3fv(l.s[r], q);
    }, He:function(r, q, y, M) {
      b.uniform3f(l.s[r], q, y, M);
    }, zd:function(r, q, y, M, f) {
      b.uniform4f(l.s[r], q, y, M, f);
    }, ec:function(r, q) {
      b.uniform4fv(l.s[r], q);
    }, Je:function(r, q) {
      b.uniformMatrix2fv(l.s[r], !1, q);
    }, Ke:function(r, q) {
      b.uniformMatrix3fv(l.s[r], !1, q);
    }, Le:function(r, q) {
      b.uniformMatrix4fv(l.s[r], !1, q);
    }, ya:function(r, q) {
      N.set(r);
      q.forEach(function(y) {
        switch(y.type) {
          case "4f":
            b.uniform4fv(l.s[y.name], y.value);
            break;
          case "3f":
            b.uniform3fv(l.s[y.name], y.value);
            break;
          case "2f":
            b.uniform2fv(l.s[y.name], y.value);
            break;
          case "1f":
            b.uniform1f(l.s[y.name], y.value);
            break;
          case "1i":
            b.uniform1i(l.s[y.name], y.value);
            break;
          case "mat2":
            b.uniformMatrix2fv(l.s[y.name], !1, y.value);
            break;
          case "mat3":
            b.uniformMatrix3fv(l.s[y.name], !1, y.value);
            break;
          case "mat4":
            b.uniformMatrix4fv(l.s[y.name], !1, y.value);
        }
      });
    }, fe:function() {
      return "lowp";
    }, m:function() {
      N.H();
      b.disableVertexAttribArray(0);
      for (var r in D) {
        var q = D[r];
        q.Ta && (u("INFO in ShadersFF.js: Delete shader", r), q.Ta = !1, b.deleteProgram(q.W));
        q.gd && delete D[r];
      }
      g.forEach(function(y) {
        b.deleteShader(y);
      });
      g.splice(0);
      A = 0;
      B = !1;
      l = null;
      n = -1;
    },};
    return N;
  }(), b = null, Ea = function() {
    function a(h) {
      u("ERROR in ContextFF: ", h);
      return !1;
    }
    function c() {
      return navigator.userAgent && -1 !== navigator.userAgent.indexOf("forceWebGL1");
    }
    function e(h) {
      function G() {
        pa.m();
        Y.reset();
        d.getExtension("WEBGL_lose_context").loseContext();
      }
      if (c()) {
        return !1;
      }
      u("INFO in ContextFF: test if WebGL2 implementation is valid...");
      var x = document.createElement("canvas");
      x.setAttribute("width", 5);
      x.setAttribute("height", 5);
      var d = null;
      try {
        d = x.getContext("webgl2", h);
      } catch (C) {
        return !1;
      }
      if (!d) {
        return !1;
      }
      k(d);
      Y.xb(d);
      h = Y.Ia(d);
      if (!h.O && !h.P) {
        return G(), u("WARNING in ContextFF - is_validWebGL2(): WebGL2 is here but we cannot RTT on float or half float textures"), !1;
      }
      h = pa.ob(d, h);
      G();
      return h ? !0 : (u("WARNING in ContextFF - is_validWebGL2(): WebGL2 is here but we cannot filter float or half float textures"), !1);
    }
    function k(h) {
      h.clearColor(0, 0, 0, 0);
      h.disable(h.DEPTH_TEST);
      h.disable(h.BLEND);
      h.disable(h.DITHER);
      h.disable(h.STENCIL_TEST);
      h.disable(h.CULL_FACE);
      h.GENERATE_MIPMAP_HINT && h.hint(h.GENERATE_MIPMAP_HINT, h.FASTEST);
      h.disable(h.SAMPLE_ALPHA_TO_COVERAGE);
      h.disable(h.SAMPLE_COVERAGE);
      h.depthFunc(h.LEQUAL);
      h.clearDepth(1.0);
    }
    var p = null, m = null, w = null, g = null, n = !0, l = null, A = null, B = [], v = {A:function() {
      return p.width;
    }, K:function() {
      return p.height;
    }, Zd:function() {
      return p;
    }, Yd:function() {
      return b;
    }, R:function() {
      return n;
    }, flush:function() {
      b.flush();
    }, ad:function() {
      xa.U();
      U.reset();
      W.reset();
      F.H();
      F.Gc();
      b.disable(b.DEPTH_TEST);
      b.disable(b.BLEND);
      W.ja();
      F.ia();
    }, Nc:function() {
      l || (l = new Uint8Array(p.width * p.height * 4));
      b.readPixels(0, 0, p.width, p.height, b.RGBA, b.UNSIGNED_BYTE, l);
      return l;
    }, ae:function() {
      return p.toDataURL("image/jpeg");
    }, be:function() {
      xa.J();
      m || (m = document.createElement("canvas"), w = m.getContext("2d"));
      m.width = p.width;
      m.height = p.height;
      for (var h = v.Nc(), G = w.createImageData(m.width, m.height), x = m.width, d = m.height, C = G.data, K = 0; K < d; ++K) {
        for (var Q = d - K - 1, T = 0; T < x; ++T) {
          var D = 4 * (K * x + T), I = 4 * (Q * x + T);
          C[D] = h[I];
          C[D + 1] = h[I + 1];
          C[D + 2] = h[I + 2];
          C[D + 3] = h[I + 3];
        }
      }
      w.putImageData(G, 0, 0);
      return m.toDataURL("image/png");
    }, $d:function(h) {
      !m && h && (m = document.createElement("canvas"), w = m.getContext("2d"));
      var G = h ? m : document.createElement("canvas");
      G.width = p.width;
      G.height = p.height;
      (h ? w : G.getContext("2d")).drawImage(p, 0, 0);
      return G;
    }, D:function(h) {
      h = Object.assign({Oa:null, Va:null, ka:null, vb:null, width:512, height:512, premultipliedAlpha:!1, ed:!0, antialias:!1, debug:!1, Sd:!1}, h);
      h.Oa ? (b = h.Oa, p = h.Oa.canvas) : h.vb && !h.ka ? p = document.getElementById(h.vb) : h.ka && (p = h.ka);
      p || (p = document.createElement("canvas"));
      p.width = h.width;
      p.height = h.height;
      u("============ INIT ContextFF ============");
      if (b) {
        n = b instanceof WebGL2RenderingContext;
      } else {
        n = !0;
        var G = {antialias:h.antialias, alpha:!0, preserveDrawingBuffer:!0, premultipliedAlpha:h.premultipliedAlpha, stencil:!1, depth:h.ed};
        navigator && navigator.userAgent && -1 !== navigator.userAgent.indexOf("noAntialiasing") && (G.antialias = !1);
        u("INFO in ContextFF: webglOptions = ", JSON.stringify(G));
        var x = e(G);
        u("INFO in ContextFF: isValidWebGL2 = ", x);
        x || !G.antialias || c() || (u("WARNING in ContextFF: Turn off antialiasing because WebGL2 sucks with it"), G.antialias = !1, x = e(G), u("INFO in ContextFF: isValidWebGL2 = ", x));
        x ? (u("INFO in ContextFF - init: We try to create a WebGL2 context"), b = p.getContext("webgl2", G)) : u("WARNING in ContextFF - init: WebGL2 implementation is crappy. Use WebGL1");
        b ? (u("INFO in ContextFF - init: WebGL2 context has been initialized"), n = !0) : (u("INFO in ContextFF - init: We try to create a WebGL1 context (WebGL2 is not implemented or its implementation sucks)"), (b = p.getContext("webgl", G)) || (b = p.getContext("experimental-webgl", G)), n = !1, b && u("INFO in ContextFF - init: a WebGL1 context has been created successfully"));
      }
      if (!b) {
        return a("WebGL1 and 2 are not enabled");
      }
      h.Va && p.addEventListener && (g = b.getExtension("WEBGL_lose_context")) && (A = h.Va, p.addEventListener("webglcontextlost", A, !1));
      if (!Y.D()) {
        return a("Not enough GL capabilities");
      }
      k(b);
      F.D();
      W.D();
      pa.ob(b, Y.Mc()) || u("WARNING in ContextFF: cannot filter float textures");
      B.forEach(function(d) {
        d(b);
      });
      B.splice(0);
      return !0;
    }, Kd:function() {
      return new Promise(function(h) {
        b ? h(b) : B.push(h);
      });
    }, m:function() {
      b && (Y.m(), F.m(), pa.m());
      g && A && (p.removeEventListener("webglcontextlost", A, !1), g = A = null);
      b = l = w = m = p = null;
      B.splice(0);
    }};
    return v;
  }(), ka = function() {
    function a() {
      null === c && ("undefined" !== typeof F ? c = F : "undefined" !== typeof JEShaders && (c = JEShaders));
    }
    var c = null;
    return {reset:function() {
      c = null;
    }, yd:function(e) {
      c !== e && (c && c.H(), c = e);
    }, ra:function() {
      return c.ra();
    }, ia:function() {
      return c.ia();
    }, za:function(e) {
      return c.za(e);
    }, bb:function() {
      return c.bb();
    }, H:function() {
      return c.H();
    }, set:function(e) {
      a();
      return c.set(e);
    }, ha:function(e) {
      a();
      return c.ha(e);
    }, ab:function(e) {
      a();
      return c.ab(e);
    }};
  }(), ua = function() {
    function a(f) {
      b.bindTexture(b.TEXTURE_2D, f);
    }
    function c(f) {
      r[0] = f;
      f = q[0];
      var E = f >> 16 & 32768, H = f >> 12 & 2047, L = f >> 23 & 255;
      return 103 > L ? E : 142 < L ? E | 31744 | ((255 == L ? 0 : 1) && f & 8388607) : 113 > L ? (H |= 2048, E | (H >> 114 - L) + (H >> 113 - L & 1)) : E = (E | L - 112 << 10 | H >> 1) + (H & 1);
    }
    function e(f) {
      var E = new Uint16Array(f.length);
      f.forEach(function(H, L) {
        E[L] = c(H);
      });
      return E;
    }
    function k() {
      if (null !== y.Qa) {
        return y.Qa;
      }
      var f = m(e([0.5, 0.5, 0.5, 0.5]), !0);
      return null === f ? !0 : y.Qa = f;
    }
    function p() {
      if (null !== y.Ra) {
        return y.Ra;
      }
      var f = m(new Uint8Array([127, 127, 127, 127]), !1);
      return null === f ? !0 : y.Ra = f;
    }
    function m(f, E) {
      if (!ka.ra() || !x) {
        return u("WARNING in SharedTexture: can_initFromArray() is called too soon"), null;
      }
      var H = null, L = Math.sqrt(f.length / 4);
      try {
        var V = b.getError();
        if ("FUCKING_BIG_ERROR" === V) {
          return !1;
        }
        H = M.instance({isFloat:!1, G:E, array:f, width:L});
        V = b.getError();
        if (V !== b.NO_ERROR) {
          return !1;
        }
      } catch (la) {
        return !1;
      }
      da.J();
      b.viewport(0, 0, L, L);
      b.clearColor(0, 0, 0, 0);
      b.clear(b.COLOR_BUFFER_BIT);
      ka.set("s0");
      H.mb(0);
      ea.l(!0, !0);
      f = 4 * L * L;
      E = new Uint8Array(f);
      b.readPixels(0, 0, L, L, b.RGBA, b.UNSIGNED_BYTE, E);
      L = !0;
      for (V = 0; V < f; ++V) {
        L = L && 3 > Math.abs(E[V] - 127);
      }
      H.remove();
      da.U();
      return L;
    }
    var w = 0, g = null, n = 0, l = null, A = null, B = null, v = null, h = null, G = null, x = !1, d = [], C = {isFloat:!1, isPot:!0, isLinear:!1, isMipmap:!1, isAnisotropicFiltering:!1, isMirrorX:!1, isMirrorY:!1, isSrgb:!1, isKeepArray:!1, isFlipY:null, width:0, height:0, url:null, array:null, data:null, v:null, Lb:null, fd:!1, G:!1, V:null, ua:4, Ua:0}, K = !1, Q = null, T = null, D = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]], I = !1, N = !1, r = new Float32Array(1), q = new Int32Array(r.buffer), 
    y = {Qa:null, Ra:null}, M = {D:function() {
      x || (u("INFO in SharedTexture: init()"), h = [b.RGBA, null, b.RGBA, b.RGBA], G = [b.RGBA, null, b.RGBA, b.RGBA], g = [b.TEXTURE0, b.TEXTURE1, b.TEXTURE2, b.TEXTURE3, b.TEXTURE4, b.TEXTURE5, b.TEXTURE6, b.TEXTURE7], I = "undefined" !== typeof JEContext, N = "undefined" !== typeof Y, I && JEContext.we() && g.push(b.TEXTURE8, b.TEXTURE9), l = [-1, -1, -1, -1, -1, -1, -1, -1], v = [b.UNSIGNED_BYTE, b.FLOAT, b.FLOAT], x = !0);
    }, bd:function() {
      if (!A) {
        u("INFO in SharedTexture: build random texture");
        for (var f = new Float32Array(16384), E = 0; 16384 > E; ++E) {
          f[E] = 2.0 * Math.random() - 1.0;
        }
        A = {random:M.instance({isFloat:!0, isPot:!0, array:f, width:64}), ic:M.instance({isFloat:!1, isPot:!0, width:1, array:new Uint8Array([0, 0, 0, 0])})};
      }
      M.Gd();
    }, le:function() {
      return A.ic;
    }, Gd:function() {
      v[1] = Y.La(b);
    }, wd:function() {
      G = h = [b.RGBA, b.RGBA, b.RGBA, b.RGBA];
    }, bc:function(f) {
      F.set("s1");
      da.J();
      var E = f.A(), H = f.K();
      b.viewport(0, 0, E, H);
      f.h(0);
      ea.l(!1, !1);
    }, ye:function(f, E) {
      M.bc(f);
      b.readPixels(0, 0, f.A(), f.K(), b.RGBA, b.UNSIGNED_BYTE, E);
    }, ze:function(f, E) {
      M.bc(f);
      return Y.$a(0, 0, f.A(), f.K(), E);
    }, Eb:function(f, E, H, L, V, la, ma) {
      f.activeTexture(f.TEXTURE0);
      var qa = f.createTexture();
      f.bindTexture(f.TEXTURE_2D, qa);
      V = V instanceof Float32Array ? V : new Float32Array(V);
      f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_S, f.CLAMP_TO_EDGE);
      f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_T, f.CLAMP_TO_EDGE);
      f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MAG_FILTER, f.NEAREST);
      f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, f.NEAREST);
      f.pixelStorei(f.UNPACK_FLIP_Y_WEBGL, la);
      f.texImage2D(f.TEXTURE_2D, 0, f.RGBA, H, L, 0, f.RGBA, f.FLOAT, V);
      f.bindTexture(f.TEXTURE_2D, null);
      f.pixelStorei(f.UNPACK_FLIP_Y_WEBGL, !1);
      ma && (da.U(), F.ha(f));
      f.viewport(0, 0, H, L);
      f.framebufferTexture2D(f.FRAMEBUFFER, f.COLOR_ATTACHMENT0, f.TEXTURE_2D, E, 0);
      f.bindTexture(f.TEXTURE_2D, qa);
      ma ? ea.l(!0, !0) : W.na(f);
      f.deleteTexture(qa);
      x && (l[0] = -1, B = null, w = 0);
    }, Da:function(f) {
      f !== w && (b.activeTexture(g[f]), w = f);
    }, instance:function(f) {
      var E;
      function H() {
        O = void 0 !== t.v.videoWidth ? t.v.videoWidth : t.v.width;
        P = void 0 !== t.v.videoHeight ? t.v.videoHeight : t.v.height;
      }
      function L(z) {
        var J = b.getError();
        if ("FUCKING_BIG_ERROR" === J) {
          return !1;
        }
        b.texImage2D(b.TEXTURE_2D, 0, ba, Z, aa, z);
        J = b.getError();
        J !== b.NO_ERROR && (b.finish(), fa.Wb("[DEBUG] in SharedTexture.fill_textureFromDomElement() - GL.texImage2D params:", {glErr:J, internalFormat:ba, pixelFormat:Z, pixelType:aa}), Z !== b.RGBA && (Z = b.RGBA, b.texImage2D(b.TEXTURE_2D, 0, ba, Z, aa, z)));
        return !0;
      }
      function V() {
        if (!Qa) {
          a(ia);
          oa && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, oa);
          t.isPot ? (b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, t.isMirrorX ? b.MIRRORED_REPEAT : b.REPEAT), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, t.isMirrorY ? b.MIRRORED_REPEAT : b.REPEAT)) : (b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE));
          t.isAnisotropicFiltering && "undefined" !== typeof JESETTINGS && b.texParameterf(b.TEXTURE_2D, JEContext.ce().TEXTURE_MAX_ANISOTROPY_EXT, JESETTINGS.Hd);
          b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, t.isLinear ? b.LINEAR : b.NEAREST);
          t.isLinear ? b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, t.isMipmap && !va ? b.NEAREST_MIPMAP_LINEAR : b.LINEAR) : b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, t.isMipmap && !va ? b.NEAREST_MIPMAP_NEAREST : b.NEAREST);
          Z = h[t.ua - 1];
          ba = G[t.ua - 1];
          aa = v[La];
          if (Y.R()) {
            var z = Y.Oc();
            Z === b.RGBA && aa === b.FLOAT ? t.isMipmap || t.isLinear ? ba = pa.Qc(b) : Y.pb() ? z && (ba = z) : ba = b.RGBA16F || b.RGBA : Z === b.RGB && aa === b.FLOAT && z && (ba = z, Z = b.RGBA);
          }
          if (t.G && !t.isFloat || t.isFloat && t.isMipmap && pa.kd()) {
            ba = Y.Pc(), aa = Y.La(b);
          }
          t.Ua && (Fa = t.Ua);
          t.isSrgb && 4 === t.ua && (Z = JEContext.je());
          (t.v || t.url) && aa !== b.UNSIGNED_BYTE && u("WARNING in SharedTexture - load(): an url or domElement texture is floating point", t.v, t.url);
          if (t.v) {
            L(t.v);
          } else if (t.url) {
            L(ta);
          } else if (ja) {
            z = ja;
            try {
              var J = b.getError();
              "FUCKING_BIG_ERROR" !== J && (J !== b.NO_ERROR && u("GLERR in SharedTexture:", J), b.texImage2D(b.TEXTURE_2D, 0, ba, O, P, 0, Z, aa, z), b.getError() !== b.NO_ERROR && (u("WARNING in SharedTexture - fill_textureFromArray(): invalid texImage2D params with array =", ba, Z, aa), b.texImage2D(b.TEXTURE_2D, 0, ba, O, P, 0, Z, aa, null), b.getError() !== b.NO_ERROR && (u("WARNING in SharedTexture - fill_textureFromArray(): invalid texImage2D params with null =", ba, Z, aa), b.texImage2D(b.TEXTURE_2D, 
              0, b.RGBA, O, P, 0, b.RGBA, b.UNSIGNED_BYTE, null))));
            } catch (pb) {
              b.texImage2D(b.TEXTURE_2D, 0, ba, O, P, 0, Z, aa, null);
            }
            t.isKeepArray || (ja = null);
          } else {
            J = b.getError(), "FUCKING_BIG_ERROR" !== J && (b.texImage2D(b.TEXTURE_2D, 0, ba, O, P, 0, Z, aa, null), J = b.getError(), J !== b.NO_ERROR && (b.finish(), fa.Wb("DEBUG in SharedTexture.fill_emptyTexture() - GL.texImage2D params:", {glErr:J, internalFormat:ba, pixelFormat:Z, pixelType:aa}), Z = b.RGBA, t.G && aa !== b.FLOAT && (aa = b.FLOAT, b.texImage2D(b.TEXTURE_2D, 0, ba, O, P, 0, Z, aa, null))));
          }
          if (t.isMipmap) {
            if (!va && X) {
              X.Ka(), Ga = !0;
            } else if (va) {
              J = Math.log2(Math.min(O, P));
              ya = Array(1 + J);
              ya[0] = ia;
              for (z = 1; z <= J; ++z) {
                var ca = Math.pow(2, z), R = O / ca;
                ca = P / ca;
                var wa = b.createTexture();
                a(wa);
                b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST);
                b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
                b.texImage2D(b.TEXTURE_2D, 0, ba, R, ca, 0, Z, aa, null);
                a(null);
                ya[z] = wa;
              }
              Ga = !0;
            }
          }
          a(null);
          l[w] = -1;
          oa && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1);
          za = !0;
          t.V && X && (t.V(X), t.V = null);
        }
      }
      function la() {
        for (var z = O * P, J = 2 * z, ca = 3 * z, R = 0; R < z; ++R) {
          na[0][R] = Aa[R], na[1][R] = Aa[R + z], na[2][R] = Aa[R + J], na[3][R] = Aa[R + ca];
        }
      }
      function ma() {
        var z = O * P * 4;
        ra = [new Uint8Array(z), new Uint8Array(z), new Uint8Array(z), new Uint8Array(z)];
        na = [new Float32Array(ra[0].buffer), new Float32Array(ra[1].buffer), new Float32Array(ra[2].buffer), new Float32Array(ra[3].buffer)];
        Ha = new Uint8Array(4 * z);
        Aa = new Float32Array(Ha.buffer);
        Ba = !0;
      }
      function qa() {
        E = new Uint8Array(O * P * 4);
        Ra = new Float32Array(E.buffer);
        Ma = !0;
      }
      var t = Object.assign({}, C, f), Ca = n++;
      null === t.isFlipY && (t.isFlipY = t.url ? !0 : !1);
      t.data && (t.array = "string" === typeof t.data ? Za(t.data) : t.isFloat ? new Float32Array(t.data) : new Uint8Array(t.data), t.isFlipY = !1);
      var La = 0, Sa = t.v ? !0 : !1, Da = null, Na = null, Ta = !1;
      t.G = t.G || t.isFloat;
      t.G && (La = 1);
      !t.fd && t.isFloat && N && !Y.pb() && (t.isFloat = !1);
      t.isFloat && (La = 2);
      t.isAnisotropicFiltering && I && !JEContext.qe() && (t.isAnisotropicFiltering = !1);
      var ia = t.Lb || b.createTexture(), ta = null, ja = !1, O = 0, P = 0, za = !1, Qa = !1, Ba = !1, na = null, ra = null, Ha = null, Aa = null, ba = null, Z = null, aa = null, oa = t.isFlipY, gb = (f = t.G && t.isMipmap) && pa.tc(), va = f && gb ? !0 : !1, ya = null, Fa = -1, Ga = !1;
      var Ma = !1;
      var Ra = E = null;
      t.width && (O = t.width, P = t.height ? t.height : O);
      var X = {get:function() {
        return ia;
      }, A:function() {
        return O;
      }, K:function() {
        return P;
      }, me:function() {
        return t.url;
      }, re:function() {
        return t.isFloat;
      }, te:function() {
        return t.G;
      }, ue:function() {
        return t.isLinear;
      }, Ka:function() {
        b.generateMipmap(b.TEXTURE_2D);
      }, rc:function(z, J) {
        va ? (z || (z = X.Hb()), M.Da(J), a(ya[z]), l[J] = -1) : X.h(J);
      }, Hb:function() {
        -1 === Fa && (Fa = Math.log(O) / Math.log(2));
        return Fa;
      }, Ic:function(z) {
        if (va) {
          z || (z = X.Hb());
          F.set("s12");
          M.Da(0);
          for (var J = O, ca = P, R = 1; R <= z; ++R) {
            J /= 2, ca /= 2, F.Y("u8", 0.25 / J, 0.25 / ca), b.viewport(0, 0, J, ca), a(ya[R - 1]), b.framebufferTexture2D(da.pa(), b.COLOR_ATTACHMENT0, b.TEXTURE_2D, ya[R], 0), ea.l(!1, 1 === R);
          }
          l[0] = -1;
        } else {
          X.Ka();
        }
      }, Ee:function(z) {
        (Sa = !eb.Dd(z)) ? (ja = null, t.v = z, H()) : ja = z;
      }, h:function(z) {
        if (!za) {
          return !1;
        }
        M.Da(z);
        if (l[z] === Ca) {
          return !1;
        }
        a(ia);
        l[z] = Ca;
        return !0;
      }, mb:function(z) {
        b.activeTexture(g[z]);
        w = z;
        a(ia);
        l[z] = Ca;
      }, o:function() {
        B = X;
        b.framebufferTexture2D(da.pa(), b.COLOR_ATTACHMENT0, b.TEXTURE_2D, ia, 0);
      }, X:function() {
        B = X;
        b.viewport(0, 0, O, P);
        b.framebufferTexture2D(da.pa(), b.COLOR_ATTACHMENT0, b.TEXTURE_2D, ia, 0);
      }, gb:M.gb, ud:function(z, J) {
        O = z;
        P = J;
      }, resize:function(z, J) {
        X.ud(z, J);
        V();
      }, clone:function(z) {
        z = M.instance({width:O, height:P, G:t.G, isFloat:t.isFloat, isLinear:t.isLinear, isMirrorY:t.isMirrorY, isFlipY:z ? !oa : oa, isPot:t.isPot});
        ka.set("s0");
        da.U();
        z.o();
        b.viewport(0, 0, O, P);
        X.h(0);
        ea.l(!0, !0);
        return z;
      }, Ad:function() {
        b.viewport(0, 0, O, P);
      }, remove:function() {
        b.deleteTexture(ia);
        Qa = !0;
        d.splice(d.indexOf(X), 1);
        X = null;
      }, refresh:function() {
        X.mb(0);
        oa && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !0);
        Sa ? b.texImage2D(b.TEXTURE_2D, 0, ba, Z, aa, t.v) : b.texImage2D(b.TEXTURE_2D, 0, ba, O, P, 0, Z, aa, ja);
        oa && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1);
      }, ac:function() {
        Ba || ma();
        b.readPixels(0, 0, O, 4 * P, b.RGBA, b.UNSIGNED_BYTE, Ha);
        la();
        return na;
      }, qd:function() {
        Ba || ma();
        return Y.$a(0, 0, O, 4 * P, Ha).then(function() {
          la();
          return na;
        });
      }, sd:function() {
        Ma || qa();
        b.readPixels(0, 0, O, P, b.RGBA, b.UNSIGNED_BYTE, E);
        return Ra;
      }, rd:function() {
        Ma || qa();
        return Y.$a(0, 0, O, P, E);
      }, wb:function(z) {
        da.J();
        F.set("s13");
        X.h(0);
        if (z) {
          b.viewport(0, 0, O, P), F.zd("u9", 0.25, 0.25, 0.25, 0.25), ea.l(!1, !0);
        } else {
          for (z = 0; 4 > z; ++z) {
            b.viewport(0, P * z, O, P), F.ec("u9", D[z]), ea.l(!1, 0 === z);
          }
        }
      }, Te:function(z) {
        var J = aa === v[0] && !p();
        a(ia);
        oa && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !0);
        J ? (Ta || (Da = document.createElement("canvas"), Da.width = O, Da.height = P, Na = Da.getContext("2d"), Na.createImageData(O, P), Ta = !0), null.data.set(z), Na.putImageData(null, 0, 0), b.texImage2D(b.TEXTURE_2D, 0, ba, Z, aa, Da)) : b.texImage2D(b.TEXTURE_2D, 0, ba, O, P, 0, Z, aa, z);
        l[w] = Ca;
        oa && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1);
      }, Ue:function(z, J) {
        a(ia);
        J && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !0);
        b.texImage2D(b.TEXTURE_2D, 0, ba, Z, aa, z);
        l[w] = Ca;
        J && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1);
      }, De:function(z, J) {
        var ca = O * P, R = 4 * ca;
        z = t.G ? z ? "RGBE" : "JSON" : "RGBA";
        J && (z = J);
        J = Y.R() && !1;
        var wa = null;
        switch(z) {
          case "RGBE":
            wa = "s43";
            break;
          case "JSON":
            wa = J ? "s0" : "s13";
            break;
          case "RGBA":
          case "RGBAARRAY":
            wa = "s7";
        }
        Ba || ("RGBA" === z || "RGBE" === z || "RGBAARRAY" === z ? (ra = new Uint8Array(R), Ba = !0) : "JSON" !== z || J || ma());
        da.J();
        F.set(wa);
        X.h(0);
        R = null;
        if ("RGBA" === z || "RGBE" === z || "RGBAARRAY" === z) {
          b.viewport(0, 0, O, P);
          ea.l(!0, !0);
          b.readPixels(0, 0, O, P, b.RGBA, b.UNSIGNED_BYTE, ra);
          if ("RGBAARRAY" === z) {
            return {data:ra};
          }
          K || (Q = document.createElement("canvas"), T = Q.getContext("2d"), K = !0);
          Q.width = O;
          Q.height = P;
          ca = T.createImageData(O, P);
          ca.data.set(ra);
          T.putImageData(ca, 0, 0);
          R = Q.toDataURL("image/png");
        } else if ("JSON" === z) {
          if (J) {
            R = new Float32Array(ca), b.viewport(0, 0, O, P), ea.l(!0, !0), b.readPixels(0, 0, O, P, b.RGBA, b.FLOAT, R);
          } else {
            for (R = 0; 4 > R; ++R) {
              b.viewport(0, P * R, O, P), F.ec("u9", D[R]), ea.l(!R, !R);
            }
            X.ac();
            R = Array(ca);
            for (J = 0; J < ca; ++J) {
              R[4 * J] = na[0][J], R[4 * J + 1] = na[1][J], R[4 * J + 2] = na[2][J], R[4 * J + 3] = na[3][J];
            }
          }
        }
        return {format:z, data:R, width:O, height:P, isMirrorY:t.isMirrorY, isFlipY:"RGBA" === z ? t.isFlipY : !t.isFlipY};
      }};
      t.isMipmap && !va && za && !Ga && (X.Ka(), Ga = !0);
      if (t.url) {
        a(ia), b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, 1, 1, 0, b.RGBA, b.UNSIGNED_BYTE, null), ta = new Image(), ta.Rd = "Anonymous", ta.crossOrigin = "Anonymous", ta.src = t.url, ta.onload = function() {
          O = ta.width;
          P = ta.height;
          V();
        };
      } else if (t.v) {
        var Ua = function() {
          H();
          O ? V() : (u("WARNING in SharedTexture - instance(): DOM element provided but width is invalid. retry loading later..."), setTimeout(Ua, 1));
        };
        Ua();
      } else {
        t.array ? (t.G && !t.isFloat ? t.array instanceof Uint16Array ? (ja = t.array, V()) : k() ? (ja = e(t.array), V()) : (V(), M.Eb(b, ia, X.A(), X.K(), t.array, oa, !0)) : (ja = t.isFloat ? t.array instanceof Float32Array ? t.array : new Float32Array(t.array) : t.array instanceof Uint8Array ? t.array : new Uint8Array(t.array), V()), t.isKeepArray || (ja && ja !== t.array && (ja = null), delete t.array)) : t.Lb ? za = !0 : V();
      }
      X.ie = X.A;
      t.V && za && (t.V(X), t.V = null);
      d.push(X);
      return X;
    }, J:function(f) {
      f !== w && (b.activeTexture(g[f]), w = f);
      l[f] = -1;
      a(null);
    }, Jd:function(f) {
      A.random.h(f);
    }, gb:function() {
      B = null;
      b.framebufferTexture2D(da.pa(), b.COLOR_ATTACHMENT0, b.TEXTURE_2D, null, 0);
    }, reset:function() {
      0 !== w && b.activeTexture(g[0]);
      for (var f = 0; f < g.length; ++f) {
        l[f] = -1;
      }
      w = -1;
    }, Ae:function() {
      w = -1;
    }, Fd:function() {
      for (var f = 0; f < g.length; ++f) {
        M.J(f);
      }
    }, Fb:function() {
      A && (A.random.remove(), A.ic.remove());
    }, Se:function(f, E) {
      if ("RGBA" === f.format || "RGBE" === f.format) {
        var H = new Image();
        H.src = f.data;
        H.onload = function() {
          M.instance({isMirrorY:f.isMirrorY, isFlipY:f.isFlipY, isFloat:!1, v:H, V:function(L) {
            if ("RGBA" === f.format) {
              E(L);
            } else {
              var V = f.width, la = f.height, ma = M.instance({isMirrorY:f.isMirrorY, isFloat:!0, width:V, height:la, isFlipY:f.isFlipY});
              da.U();
              b.viewport(0, 0, V, la);
              F.set("s44");
              ma.o();
              L.h(0);
              ea.l(!0, !0);
              M.J(0);
              E(ma);
              Y.flush();
              setTimeout(L.remove, 50);
            }
          }});
        };
      } else {
        "JSON" === f.format ? E(M.instance({isFloat:!0, isFlipY:f.isFlipY, width:f.width, height:f.height, array:new Float32Array(f.data)})) : (u("ERROR in SharedTexture.unserialize(): incorrect serialized texture format"), E(!1));
      }
    }, zc:e, m:function() {
      B && (xa.U(), M.gb(), xa.J());
      M.Fd();
      d.slice(0).forEach(function(f) {
        f.remove();
      });
      d.splice(0);
      x = !1;
      n = 0;
      "undefined" !== typeof pa && pa.m();
      A = null;
    }};
    return M;
  }(), ea = function() {
    function a(n) {
      var l = {N:null, C:null};
      l.N = n.createBuffer();
      n.bindBuffer(n.ARRAY_BUFFER, l.N);
      n.bufferData(n.ARRAY_BUFFER, new Float32Array([-1.0, -1.0, 3.0, -1.0, -1.0, 3.0]), n.STATIC_DRAW);
      l.C = n.createBuffer();
      n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, l.C);
      n.bufferData(n.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2]), n.STATIC_DRAW);
      return l;
    }
    var c = null, e = 0, k = !1, p = [], m = -2, w = -2, g = {reset:function() {
      w = m = -2;
    }, D:function() {
      k || (u("INFO in SharedVBO : init()"), c = a(b), g.ja(), k = !0);
    }, instance:function(n) {
      var l = e++, A = n.C ? n.C.length : 0, B = "undefined" === typeof n.mode ? b.STATIC_DRAW : n.mode, v = b.createBuffer();
      b.bindBuffer(b.ARRAY_BUFFER, v);
      b.bufferData(b.ARRAY_BUFFER, n.N instanceof Float32Array ? n.N : new Float32Array(n.N), B);
      m = l;
      var h = null, G = null, x = null;
      if (n.C) {
        h = b.createBuffer();
        b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, h);
        var d = null;
        65536 > n.C.length ? (d = Uint16Array, G = b.UNSIGNED_SHORT, x = 2) : (d = Uint32Array, G = b.UNSIGNED_INT, x = 4);
        d = n.C instanceof d ? n.C : new d(n.C);
        b.bufferData(b.ELEMENT_ARRAY_BUFFER, d, B);
        w = l;
      }
      var C = {sc:function(K) {
        m !== l && (b.bindBuffer(b.ARRAY_BUFFER, v), m = l);
        K && ka.bb();
      }, pc:function() {
        w !== l && (b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, h), w = l);
      }, bind:function(K) {
        C.sc(K);
        C.pc();
      }, Ud:function() {
        fa.reset();
        b.drawElements(b.TRIANGLES, A, G, 0);
        fa.wc() && u("ERROR in SharedVBO.draw(): No VBO bound to enabled attributes");
      }, Vd:function(K, Q) {
        b.drawElements(b.TRIANGLES, K, G, Q * x);
      }, remove:function() {
        b.deleteBuffer(v);
        n.C && b.deleteBuffer(h);
        C = null;
      }};
      p.push(C);
      return C;
    }, ja:function() {
      -1 !== m && (b.bindBuffer(b.ARRAY_BUFFER, c.N), m = -1);
      -1 !== w && (b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, c.C), w = -1);
    }, l:function(n, l) {
      n && ea.ja();
      l && ka.ia();
      b.drawElements(b.TRIANGLES, 3, b.UNSIGNED_SHORT, 0);
    }, na:function(n) {
      n = n || b;
      var l = a(n);
      n.bindBuffer(n.ARRAY_BUFFER, l.N);
      n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, l.C);
      ka.za(n);
      n.clear(n.COLOR_BUFFER_BIT);
      n.drawElements(n.TRIANGLES, 3, n.UNSIGNED_SHORT, 0);
      n.flush();
      n.bindBuffer(n.ARRAY_BUFFER, null);
      n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, null);
      n.deleteBuffer(l.N);
      n.deleteBuffer(l.C);
      g.reset();
      k && (g.ja(), ka.ia());
    }, Fb:function() {
      var n = b, l = c;
      n.deleteBuffer(l.N);
      n.deleteBuffer(l.C);
    }, m:function() {
      g.Fb();
      p.forEach(function(n) {
        n.remove();
      });
      b.bindBuffer(b.ARRAY_BUFFER, null);
      b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, null);
      g.reset();
      k = !1;
      p.splice(0);
      e = 0;
    }};
    return g;
  }(), da = function() {
    var a = null, c = null, e = null, k = !1, p = [], m = {B:-2, Db:1}, w = {ra:function() {
      return k;
    }, D:function() {
      if (!k) {
        a = b.createFramebuffer();
        var g = Y.R();
        c = g && b.DRAW_FRAMEBUFFER ? b.DRAW_FRAMEBUFFER : b.FRAMEBUFFER;
        e = g && b.READ_FRAMEBUFFER ? b.READ_FRAMEBUFFER : b.FRAMEBUFFER;
        k = !0;
      }
    }, de:function() {
      return c;
    }, Rc:function() {
      return e;
    }, pa:function() {
      return b.FRAMEBUFFER;
    }, he:function() {
      return m;
    }, Xd:function() {
      return a;
    }, instance:function(g) {
      void 0 === g.Pb && (g.Pb = !1);
      var n = g.Ed ? g.Ed : null, l = g.width, A = void 0 !== g.height ? g.height : g.width, B = a, v = null, h = !1, G = !1, x = 0;
      n && (l = l ? l : n.A(), A = A ? A : n.K());
      var d = {dc:function() {
        h || (B = b.createFramebuffer(), h = !0, x = m.Db++);
      }, lc:function() {
        d.dc();
        d.o();
        v = b.createRenderbuffer();
        b.bindRenderbuffer(b.RENDERBUFFER, v);
        b.renderbufferStorage(b.RENDERBUFFER, b.DEPTH_COMPONENT16, l, A);
        b.framebufferRenderbuffer(c, b.DEPTH_ATTACHMENT, b.RENDERBUFFER, v);
        b.clearDepth(1.0);
      }, bind:function(C, K) {
        x !== m.B && (b.bindFramebuffer(c, B), m.B = x);
        n && n.o();
        K && b.viewport(0, 0, l, A);
        C && b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
      }, Id:function() {
        x !== m.B && (b.bindFramebuffer(c, B), m.B = x);
      }, clear:function() {
        b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
      }, Od:function() {
        b.clear(b.COLOR_BUFFER_BIT);
      }, Pd:function() {
        b.clear(b.DEPTH_BUFFER_BIT);
      }, Ad:function() {
        b.viewport(0, 0, l, A);
      }, o:function() {
        x !== m.B && (b.bindFramebuffer(c, B), m.B = x);
      }, rtt:function(C) {
        n = C;
        m.B !== x && (b.bindFramebuffer(b.FRAMEBUFFER, B), m.B = x);
        C.o();
      }, J:function() {
        b.bindFramebuffer(c, null);
        m.B = -1;
      }, resize:function(C, K) {
        l = C;
        A = K;
        v && (b.bindRenderbuffer(b.RENDERBUFFER, v), b.renderbufferStorage(b.RENDERBUFFER, b.DEPTH_COMPONENT16, l, A));
      }, remove:function() {
        B === a || G || (b.bindFramebuffer(c, B), b.framebufferTexture2D(c, b.COLOR_ATTACHMENT0, b.TEXTURE_2D, null, 0), v && b.framebufferRenderbuffer(c, b.DEPTH_ATTACHMENT, b.RENDERBUFFER, null), b.bindFramebuffer(c, null), b.deleteFramebuffer(B), v && b.deleteRenderbuffer(v));
        G = !0;
      }};
      g.Pb && d.lc();
      p.push(d);
      return d;
    }, J:function() {
      b.bindFramebuffer(c, null);
      m.B = -1;
    }, Qe:function() {
      b.bindFramebuffer(c, null);
      b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
      Y.fc();
      m.B = -1;
    }, reset:function() {
      m.B = -2;
    }, U:function() {
      0 !== m.B && (b.bindFramebuffer(c, a), m.B = 0);
    }, clear:function() {
      Y.fc();
      b.clear(b.COLOR_BUFFER_BIT);
    }, m:function() {
      w.J();
      p.forEach(function(g) {
        g.remove();
      });
      null !== a && (b.deleteFramebuffer(a), a = null);
      w.reset();
      k = !1;
      p.splice(0);
      m.Db = 1;
    }};
    return w;
  }(), Y = function() {
    function a() {
      p = "undefined" === typeof Ea ? JEContext : Ea;
      m = !0;
    }
    function c(d, C) {
      for (var K = 0; K < d.length; ++K) {
        var Q = C.getExtension(d[K]);
        if (Q) {
          return Q;
        }
      }
      return null;
    }
    function e() {
      null !== h.Ca && (clearInterval(h.Ca), h.Ca = null);
      h.aa = !1;
    }
    function k() {
      h.ga && (b.deleteSync(h.ga), h.ga = null);
    }
    var p = null, m = !1, w = {Qb:!1, cb:null, eb:null, Sb:!1, jd:!1, fb:null, Tb:!1, Ba:null, Rb:!1, Fa:null, cd:!1, Ga:null, dd:!1}, g = null, n = {O:!0, P:!0, Ja:!0, $b:!1}, l = null, A = !0, B = null, v = null, h = {aa:!1, Z:null, ga:null, Pa:-1, $:null, Ca:null}, G = "undefined" === typeof window ? {} : window, x = {D:function() {
      if (m) {
        return !0;
      }
      x.reset();
      m || a();
      var d = b;
      if (!g.Qb) {
        u("INFO in SharedContext: enable_floatExtensions()");
        g.cb = x.Ab(d);
        G.GL_EXT_FLOAT = g.cb;
        g.Sb = g.cb ? !0 : !1;
        if (g.Sb || x.R()) {
          g.eb = x.Bb(d), g.jd = g.eb ? !0 : !1, G.GL_EXT_FLOATLINEAR = g.eb;
        }
        g.Qb = !0;
      }
      if (!g.Rb) {
        u("INFO in SharedContext: enable_halfFloatExtensions()");
        g.fb = x.ma(d);
        g.fb ? (g.Tb = !0, G.GL_EXT_HALFFLOAT = g.fb) : u("WARNING in SharedContext.enable_halfFloatExtensions(): OES_texture_half_float not found");
        if (g.Tb || x.R()) {
          g.Ba = x.Cb(d), G.GL_EXT_HALFFLOATLINEAR = g.Ba;
        }
        g.Ba || u("WARNING in SharedContext.enable_halfFloatExtensions(): OES_texture_half_float_linear not found");
        g.pe = g.Ba ? !0 : !1;
        g.Rb = !0;
      }
      g.Fa = x.yb(d);
      g.cd = g.Fa ? !0 : !1;
      G.GL_EXT_COLORBUFFERFLOAT = g.Fa;
      g.Ga = x.zb(d);
      g.dd = g.Ga ? !0 : !1;
      G.GL_EXT_COLORBUFFERHALFFLOAT = g.Ga;
      da.D();
      ua.D();
      if (!x.Cc()) {
        return !1;
      }
      ea.D();
      ua.bd();
      return !0;
    }, reset:function() {
      g = Object.assign({}, w);
      l = Object.assign({}, n);
    }, A:function() {
      m || a();
      return p.A();
    }, K:function() {
      m || a();
      return p.K();
    }, R:function() {
      m || a();
      return p.R();
    }, xb:function(d) {
      x.yb(d);
      x.zb(d);
      x.Ab(d);
      x.Bb(d);
      x.ma(d);
      x.Cb(d);
    }, yb:c.bind(null, ["EXT_color_buffer_float", "WEBGL_color_buffer_float", "OES_color_buffer_float"]), zb:c.bind(null, ["EXT_color_buffer_half_float", "WEBGL_color_buffer_half_float", "OES_color_buffer_half_float"]), Ab:c.bind(null, ["OES_texture_float", "MOZ_OES_texture_float", "WEBKIT_OES_texture_float"]), Bb:c.bind(null, ["OES_texture_float_linear", "MOZ_OES_texture_float_linear", "WEBKIT_OES_texture_float_linear"]), ma:c.bind(null, ["OES_texture_half_float", "MOZ_OES_texture_half_float", "WEBKIT_OES_texture_half_float"]), 
    Cb:c.bind(null, ["OES_texture_half_float_linear", "MOZ_OES_texture_half_float_linear", "WEBKIT_OES_texture_half_float_linear"]), La:function(d) {
      var C = x.ma(d);
      return C && C.HALF_FLOAT_OES ? C.HALF_FLOAT_OES : d.HALF_FLOAT || d.FLOAT;
    }, Oc:function() {
      return v || b.RGBA32F || b.RGBA;
    }, Pc:function() {
      return B || b.RGBA16F || b.RGBA;
    }, Mc:function() {
      return l;
    }, pb:function() {
      return l.O;
    }, Md:function() {
      return l.P;
    }, Ld:function() {
      return l.Ja;
    }, uc:function() {
      return l.$b && A;
    }, Oe:function(d) {
      A = d;
      !d && h.aa && (k(), b.bindBuffer(h.$, null), h.aa = !1);
    }, ve:function() {
      return h.aa;
    }, Aa:function(d, C, K) {
      function Q() {
        d.bindTexture(d.TEXTURE_2D, null);
        d.bindFramebuffer(T, null);
        d.deleteTexture(N);
        d.deleteFramebuffer(I);
      }
      var T = d.FRAMEBUFFER, D = d.NEAREST;
      u("INFO in SharedContext.test_RTT(): test RTT with glInternalPixelFormat = " + fa.F(C, d) + ", glPixelType = " + fa.F(K, d));
      var I = d.createFramebuffer();
      d.bindFramebuffer(T, I);
      var N = d.createTexture();
      d.activeTexture(d.TEXTURE0);
      d.bindTexture(d.TEXTURE_2D, N);
      d.pixelStorei(d.UNPACK_FLIP_Y_WEBGL, !1);
      d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_S, d.CLAMP_TO_EDGE);
      d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_T, d.CLAMP_TO_EDGE);
      d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MAG_FILTER, D);
      d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MIN_FILTER, D);
      d.texImage2D(d.TEXTURE_2D, 0, C, 3, 3, 0, d.RGBA, K, null);
      d.framebufferTexture2D(d.FRAMEBUFFER, d.COLOR_ATTACHMENT0, d.TEXTURE_2D, N, 0);
      C = d.checkFramebufferStatus(d.READ_FRAMEBUFFER || d.FRAMEBUFFER);
      if (C !== d.FRAMEBUFFER_COMPLETE) {
        return fa.Vb("WARNING in SharedContext.test_RTT(): cannot do RTT. glStatus =", C, d), Q(), !1;
      }
      ka.ab(d);
      d.clearColor(0, 0, 0, 0);
      d.viewport(0, 0, 3, 3);
      d.disable(d.DEPTH_TEST);
      d.clear(d.COLOR_BUFFER_BIT);
      ea.na(d);
      d.bindFramebuffer(T, null);
      ka.ha(d);
      d.activeTexture(d.TEXTURE0);
      d.bindTexture(d.TEXTURE_2D, N);
      ea.na(d);
      C = new Uint8Array(36);
      d.readPixels(0, 0, 3, 3, d.RGBA, d.UNSIGNED_BYTE, C);
      Q();
      for (K = 0; 36 > K; ++K) {
        if (3 !== K % 4 && 3 < Math.abs(C[K] - 127)) {
          return u("WARNING in SharedContext.test_RTT(): readBufferPixel = ", C.toString(), "(should be [127,127,127,127])"), !1;
        }
      }
      u("  RTT success!");
      return !0;
    }, Ia:function(d) {
      u("============ BEGIN SharedContext determine_floatRTTCapability() ============");
      var C = {O:!1, P:!1};
      d.disable(d.BLEND);
      d.clearColor(0, 0, 0, 0);
      d.clear(d.COLOR_BUFFER_BIT);
      d.RGBA32F && x.Aa(d, d.RGBA32F, d.FLOAT) && (C.O = !0, v = d.RGBA32F);
      !C.O && x.Aa(d, d.RGBA, d.FLOAT) && (C.O = !0, v = d.RGBA);
      var K = x.La(d);
      B = null;
      d.RGBA16F && x.Aa(d, d.RGBA16F, K) && (C.P = !0, B = d.RGBA16F);
      !C.P && x.Aa(d, d.RGBA, K) && (C.P = !0, B = d.RGBA);
      u("============ END SharedContext determine_floatRTTCapability() ============");
      return C;
    }, Dc:function() {
      var d = da.instance({width:2});
      d.dc();
      var C = ua.instance({width:2, isFloat:!0, ua:3});
      d.o();
      C.o();
      x.flush();
      b.checkFramebufferStatus(da.Rc()) !== b.FRAMEBUFFER_COMPLETE ? (u("INFO in SharedContext - determine_floatRTT4ChannelsCapability(): cannot do RTT in 3 channels RGB texture."), ua.wd(), l.Ja = !1) : l.Ja = !0;
      d.remove();
      C.remove();
    }, Ec:function() {
      var d = !1;
      x.R() && (d = "PIXEL_PACK_BUFFER STREAM_READ SYNC_GPU_COMMANDS_COMPLETE WAIT_FAILED fenceSync deleteSync createBuffer".split(" ").every(function(C) {
        return "undefined" !== typeof b[C];
      }));
      (l.$b = d) || u("WARNING in SharedContext - determine_readPixelsAsyncCapability(): cannot execute asynchronous readpixels");
    }, Cc:function() {
      var d = x.Ia(b);
      Object.assign(l, d);
      if (!l.O && !l.P) {
        return u("ERROR in SharedContext - determine_capabilities(): cannot do RTT on float and half float textures"), !1;
      }
      x.Dc();
      x.Ec();
      return !0;
    }, td:function(d, C, K, Q, T) {
      b.readPixels(d, C, K, Q, b.RGBA, b.UNSIGNED_BYTE, T);
      return Promise.resolve(T, !1);
    }, $a:function(d, C, K, Q, T, D) {
      if (!x.uc()) {
        return x.td(d, C, K, Q, T);
      }
      null === h.Z && (h.$ = b.PIXEL_PACK_BUFFER, h.Z = b.createBuffer(), h.Pa = -1);
      b.bindBuffer(h.$, h.Z);
      T.byteLength !== h.Pa && (b.bufferData(h.$, T.byteLength, b.STREAM_READ), h.Pa = T.byteLength);
      b.readPixels(d, C, K, Q, b.RGBA, b.UNSIGNED_BYTE, 0);
      h.ga = b.fenceSync(b.SYNC_GPU_COMMANDS_COMPLETE, 0);
      x.flush();
      var I = !1;
      return new Promise(function(N, r) {
        function q() {
          if (!h.aa) {
            return e(), r(), !1;
          }
          switch(b.clientWaitSync(h.ga, 0, 0)) {
            case b.TIMEOUT_EXPIRED:
            case b.WAIT_FAILED:
              return !1;
            default:
              return e(), k(), b.getBufferSubData(h.$, 0, T), b.bindBuffer(h.$, null), N(T, I), !0;
          }
        }
        e();
        h.aa = !0;
        q() || (D && !I && (I = !0, D()), h.Ca = setInterval(q, 0));
      });
    }, fc:function() {
      b.viewport(0, 0, x.A(), x.K());
    }, flush:function() {
      b.flush();
    }, m:function() {
      e();
      k();
      ua.m();
      da.m();
      ea.m();
      null !== h.Z && (b.deleteBuffer(h.Z), h.Z = null);
      ka.reset();
      m = !1;
    }};
    return x;
  }(), fa = function() {
    var a = {Uc:function(c) {
      c = Object.prototype.toString.call(c);
      c = c.replace("[object ", "[");
      c = c.replace("[", "");
      return c = c.replace("]", "");
    }, F:function(c, e) {
      if (!c) {
        return c;
      }
      e = e || b;
      var k = null, p;
      for (p in e) {
        if (e[p] === c) {
          k = p;
          break;
        }
      }
      return k ? "gl." + k : "[GL.KEYNOTFOUND for " + c.toString() + "]";
    }, Wb:function(c, e, k) {
      k = k || b;
      var p = [], m;
      for (m in e) {
        p.push("    " + m + ": " + a.F(e[m], k));
      }
      u(c + "\n" + p.join("\n"));
    }, xe:function(c) {
      var e = b.checkFramebufferStatus(b.FRAMEBUFFER);
      a.Vb(c, e);
    }, Vb:function(c, e, k) {
      u(c, a.F(e, k));
    }, wc:function(c) {
      var e = b.getError();
      return e ? (u(c, "GL ERROR = " + a.F(e)), !0) : !1;
    }, reset:function() {
    }};
    return a;
  }(), W = ea, xa = da, U = ua, pa = function() {
    function a(D, I, N, r) {
      var q = fa.Uc(N);
      u("INFO in TextureFilteringTester.test_mipmapping(): internalPixelFormat =", fa.F(D, d), "dataType =", q, "pixelType =", fa.F(I, d), "isMipmap =", r);
      d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MIN_FILTER, r ? d.NEAREST_MIPMAP_NEAREST : d.LINEAR);
      var y = null;
      if (null !== N) {
        try {
          y = d.getError();
          if ("FUCKING_BIG_ERROR" === y) {
            return !1;
          }
          d.texImage2D(d.TEXTURE_2D, 0, D, 4, 4, 0, d.RGBA, I, N);
          y = d.getError();
          if (y !== d.NO_ERROR) {
            return u("WARNING in TextureFilteringTester.test_mipmapping() - cannot run _gl.texImage2D: glErr =", fa.F(y, d), "dataType =", q, "pixelType =", fa.F(I, d)), !1;
          }
        } catch (M) {
          return u("WARNING in TextureFilteringTester.test_mipmapping(): an exception was thrown. err=", M.message), !1;
        }
      }
      r && d.generateMipmap(d.TEXTURE_2D);
      d.clear(d.COLOR_BUFFER_BIT);
      W.na(d);
      y = d.getError();
      if ("FUCKING_BIG_ERROR" === y) {
        return !1;
      }
      d.readPixels(0, 0, 2, 2, d.RGBA, d.UNSIGNED_BYTE, A);
      y = d.getError();
      y === d.INVALID_OPERATION && "undefined" !== typeof d.PIXEL_PACK_BUFFER && (u("WARNING in TextureFilteringTester.test_mipmapping(): retry readPixels without PIXEL_PACK_BUFFER"), d.bindBuffer(d.PIXEL_PACK_BUFFER, null), d.readPixels(0, 0, 2, 2, d.RGBA, d.UNSIGNED_BYTE, A), y = d.getError());
      if (y !== d.NO_ERROR) {
        return u("ERROR in TextureFilteringTester.test_mipmapping(): cannot run _gl.readPixels. glErr = ", fa.F(y, d)), u("  values: internalPixelFormat =", fa.F(D, d), "pixelType =", fa.F(I, d)), !1;
      }
      N = !0;
      for (r = 0; 16 > r; ++r) {
        N = N && 4 > Math.abs(A[r] - 127);
      }
      N ? u("INFO in TextureFilteringTester.test_mipmapping(): success!") : u("INFO in TextureFilteringTester.test_mipmapping(): fail - read color is: ", A);
      N && (n.Zb = I, n.Ob = D);
      return N;
    }
    function c(D, I) {
      if (!C.O) {
        return u("WARNING in TextureFilteringTester: level = RGBAFloat32 - cannot RTT"), !1;
      }
      if (a(D, d.FLOAT, new Float32Array(B), I)) {
        return u("INFO in TextureFilteringTester: level = RGBAFloat32"), g = w.jb, !0;
      }
      u("WARNING in TextureFilteringTester: cannot use RGBAFloat32 level with isMipmap=", I);
      return !1;
    }
    function e(D, I, N) {
      if (!C.P) {
        return u("WARNING in TextureFilteringTester: level = RGBAFloat16 - case 0 - cannot RTT"), !1;
      }
      var r = ua.zc(B), q = Y.ma(d);
      if (q && q.HALF_FLOAT_OES && a(D, q.HALF_FLOAT_OES, r, I)) {
        return u("INFO in TextureFilteringTester: level = RGBAFloat16 - case 1 . isMipmap =", I), g = w.da, !0;
      }
      if (d.HALF_FLOAT && a(D, d.HALF_FLOAT, r, I)) {
        return u("INFO in TextureFilteringTester: level = RGBAFloat16 - case 2 . isMipmap =", I), g = w.da, !0;
      }
      r = new Float32Array(B);
      if (a(D, d.FLOAT, r, I)) {
        return u("INFO in TextureFilteringTester: level = RGBAFloat16 - case 3 . isMipmap =", I), g = w.da, !0;
      }
      d.bindTexture(d.TEXTURE_2D, N);
      d.texImage2D(d.TEXTURE_2D, 0, d.RGBA, 2, 2, 0, d.RGBA, d.UNSIGNED_BYTE, null);
      d.bindFramebuffer(n.la, T);
      ua.Eb(d, N, 2, 2, r, !1, !1);
      d.bindFramebuffer(n.la, null);
      d.bindTexture(d.TEXTURE_2D, N);
      if (a(D, null, null, I)) {
        return u("INFO in TextureFilteringTester: level = RGBAFloat16 - case 4 . isMipmap =", I), g = w.da, !0;
      }
      u("WARNING in TextureFilteringTester: cannot use RGBAFloat16 at all with isMipmap=", I);
      return !1;
    }
    function k(D, I, N) {
      l = !0;
      if (e(D, !0, N) || c(I, !0)) {
        return !0;
      }
      l = !1;
      return e(D, !1, N) || c(I, !1) ? !0 : !1;
    }
    function p(D) {
      if (g === w.H) {
        d = D || b;
        g = w.RGBA8;
        l = !0;
        u("============= BEGIN TextureFilteringTester init() ============");
        Y.xb(d);
        C || (C = Y.Ia(d));
        xa.reset();
        T = d.createFramebuffer();
        n.la = d.DRAW_FRAMEBUFFER || d.FRAMEBUFFER;
        d.bindFramebuffer(n.la, null);
        d.clearColor(0, 0, 0, 0);
        d.viewport(0, 0, 2, 2);
        F.H();
        K = F.ha(d);
        D = d.createTexture();
        d.activeTexture(d.TEXTURE0);
        d.bindTexture(d.TEXTURE_2D, D);
        d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_S, d.REPEAT);
        d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_T, d.REPEAT);
        d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MAG_FILTER, d.NEAREST);
        Q = D;
        var I = D = d.RGBA, N = d.RGBA16F, r = d.RGBA32F;
        r && (D = r);
        N && (I = N);
        if ((N || r) && k(I, D, Q)) {
          return m(), !0;
        }
        D = I = d.RGBA;
        if (k(I, D, Q)) {
          return m(), !0;
        }
        u("ERROR in TextureFilteringTester: level = RGBA8");
        g = w.RGBA8;
        m();
        return !1;
      }
    }
    function m() {
      d.deleteProgram(K.W);
      d.deleteTexture(Q);
      Q = K = null;
      u("============= END TextureFilteringTester init() ============");
    }
    for (var w = {H:-1, jb:3, da:2, RGBA8:0}, g = w.H, n = {Zb:null, Ob:null, la:null}, l = !0, A = new Uint8Array(16), B = Array(64), v = 0; 4 > v; ++v) {
      for (var h = 0; 4 > h; ++h) {
        var G = 0 === (h + v) % 2 ? 1 : 0, x = 4 * v + h;
        B[4 * x] = G;
        B[4 * x + 1] = G;
        B[4 * x + 2] = G;
        B[4 * x + 3] = G;
      }
    }
    var d = null, C = null, K = null, Q = null, T = null;
    return {tc:function(D) {
      p(D);
      return l;
    }, ob:function(D, I) {
      g === w.H && (typeof("undefined" !== I) && (C = I), p(D));
      return g !== w.RGBA8;
    }, se:function(D) {
      p(D);
      return g === w.jb;
    }, kd:function(D) {
      p(D);
      return g === w.da;
    }, ee:function(D) {
      p(D);
      return n.Zb;
    }, Qc:function(D) {
      p(D);
      return n.Ob;
    }, m:function() {
      d = null;
      l = !0;
      g = w.H;
      C = null;
    }};
  }(), hb = function() {
    return {instance:function(a) {
      var c = U.instance(a.alpha), e = U.instance(a.beta);
      return {Fc:function() {
        c.h(1);
        e.h(2);
      }};
    }};
  }(), Xa = function() {
    return {instance:function(a) {
      var c = null, e = !1, k = !1, p = null, m = !1, w = !1, g = null, n = "undefined" === typeof a.preprocessing ? !1 : a.preprocessing, l = "undefined" === typeof a.preprocessingSize ? a.size : a.preprocessingSize;
      a.mask && (e = !0, SETTINGS && void 0 !== SETTINGS.oc && (a.mask = SETTINGS.oc + a.mask), c = U.instance({isFloat:!1, url:a.mask}));
      var A = !1;
      a.customInputShader && (A = "s45", F.kb({name:"CUSTOM PREPROCESS", id:A, g:a.customInputShader, Re:["uSource"], precision:"lowp"}), F.ya(A, [{type:"1i", name:"uSource", value:0}]));
      switch(n) {
        case "sobel":
          g = "s32";
          m = !0;
          break;
        case "meanNormalization":
          g = "s33";
          m = !0;
          break;
        case "grayScale":
          g = "s29";
          m = !1;
          break;
        case "grayScaleTilt":
          g = "s30";
          w = !0;
          m = !1;
          break;
        case "rgbGrayTilt":
          g = "s31";
          w = !0;
          m = !1;
          break;
        case "copy":
          g = A ? A : "s0";
          break;
        case "inputLightRegulation":
          g = A ? A : "s29";
          p = ib.instance({Nb:l, Yb:a.size, Xb:a.nBlurPass, qa:!1});
          k = !0;
          break;
        case "inputMix0":
          g = "none";
          p = jb.instance({ib:l, jc:a.varianceMin, nb:a.blurKernelSizePx, qa:!1});
          k = !0;
          break;
        case "direct":
        case "none":
          g = "abort";
          break;
        default:
          g = "s4";
      }
      w && F.ya(g, [{name:"u27", type:"1f", value:a.tilt}]);
      e && (g += "Mask");
      var B = U.instance({isFloat:!1, isPot:!1, width:a.size}), v = {A:function() {
        return l;
      }, Ma:function() {
        return v.A();
      }, Wc:function() {
        return k ? p.Na() : B;
      }, I:function(h) {
        xa.U();
        "abort" !== g && ("none" !== g && (F.set(g), m && F.M("u28", 1 / a.size), B.X(), e && c.h(1), W.l(!1, !1), B.h(0), h = B), k && p.process(h));
      }, m:function() {
        B.remove();
        e && c.remove();
      }};
      return v;
    }};
  }(), Ya = function() {
    return {instance:function(a) {
      function c(f) {
        p.forEach(function(E, H) {
          m[H][0] = f[0][E];
          m[H][1] = f[1][E];
          m[H][2] = f[2][E];
          m[H][3] = f[3][E];
        });
        return m;
      }
      u("INFO in NeuronLayerFeedForward - instance: spec =", a);
      a.normalize = a.normalize || !1;
      var e = {input:null, bias:null, Sa:null, L:null, va:null, Xa:null, Ya:null}, k = null, p = [], m = [], w = !1, g = null, n = !0, l = -1, A = a.isReorganize ? a.isReorganize : !1, B = a.kernelsCount ? !0 : !1, v = a.dynPelu ? hb.instance(a.dynPelu) : !1, h = v ? !0 : !1, G = {isEnabled:!1};
      a.hd ? (a.sparsity = "undefined" !== typeof a.sparsity ? a.sparsity : a.wa.Ma(), n = !1) : "full" === a.connectivityUp && (a.sparsity = a.wa.Ma());
      var x = {elu:"s16", elu01:"s17", relu:"s15", arctan:"s19", sigmoid:"s14", copy:"s0", softplus:"s20", dynPelu:"s18"}[a.activation], d = a.sparsity * a.sparsity, C = !1, K = a.size, Q = "";
      if (a.maxPooling) {
        switch(a.maxPooling.size) {
          case 2:
            Q = "s34";
            break;
          case 4:
            Q = "s35";
        }
        C = !0;
        K /= a.maxPooling.size;
        e.Xa = U.instance({isFloat:!0, isPot:!1, width:K});
      }
      var T = a.normalization ? !0 : !1, D = null, I = null, N = null;
      if (T) {
        D = "s46" + a.index.toString();
        F.Mb("s46", D, [((a.normalization.n - 1) / 2).toFixed(1)]);
        F.ya(D, [{type:"1i", name:"u1", value:0}, {type:"2f", name:"u8", value:[1 / a.size, 1 / a.size]}, {type:"1f", name:"u7", value:a.normalization.alpha}, {type:"1f", name:"u10", value:a.normalization.beta}, {type:"1f", name:"u31", value:a.normalization.k},]);
        var r = {isFloat:!0, isPot:!0, width:a.size};
        I = U.instance(r);
        N = U.instance(r);
      }
      var q = -1, y = null;
      n && (e.L = U.instance({isFloat:!0, isPot:!1, width:a.size}));
      e.bias = U.instance(a.bias);
      var M = {A:function() {
        return a.size;
      }, Ma:function() {
        return K;
      }, Gb:function() {
        return a.classesCount;
      }, qc:function(f) {
        k.h(f);
      }, nd:function() {
        a.remap && a.remap.isEnabled && (G = {isEnabled:!0, ld:U.instance({isFloat:!1, isFlipY:!1, array:new Uint8Array(a.remap.maskTexture.data), width:a.remap.maskTexture.width, isPot:!1}), sa:a.remap.layers.map(function(f) {
          return a.parent.Vc(f);
        }), depth:a.remap.depth});
      }, xd:function() {
        switch(a.connectivityUp) {
          case "direct":
            y = kb.instance(a.connectivity);
            break;
          case "square":
            y = lb.instance(a.connectivity);
            break;
          case "squareFast":
            y = mb.instance(a.connectivity, a.activation);
            break;
          case "full":
            y = nb.instance(a.connectivity);
            break;
          case "conv":
            l = a.kernelsCount, y = ob.instance(a.connectivity), A && (e.va = U.instance({width:K, isFloat:!0, isFlipY:!1, isPot:!1}));
        }
        if (y.ba) {
          var f = a.size * a.sparsity;
          q = Math.log(f / a.size) / Math.log(2);
          e.input = U.instance({isMipmap:!0, isFloat:!0, isPot:!0, width:f, Ua:q});
          e.Sa = U.instance({isFloat:!0, isPot:!0, width:a.size});
        }
      }, I:function(f, E) {
        k = f;
        y.ba ? (e.input.X(), B && e.bias.h(2), y.I(G), e.input.h(0), e.input.Ic(q), e.Sa.X(), B ? F.set("s0") : (F.set("s28"), F.M("u26", d), e.bias.h(1)), e.input.rc(q, 0), W.l(!1, !1), F.set(x), T ? I.o() : e.L.o(), e.Sa.h(0), h && v.Fc(), W.l(!1, !1)) : (e.L.X(), e.bias.h(1), y.I());
        T && (F.set(D), N.o(), I.h(0), W.l(!1, !1), F.set("s47"), F.M("u7", 1), e.L.o(), N.h(1), W.l(!1, !1));
        if (n) {
          return C ? (e.Xa.X(), e.L.h(0), F.set(Q), F.Y("u8", 1 / a.size, 1 / a.size), W.l(!1, !1), E = e.Xa) : E = e.L, E.h(0), A && (e.va.o(), F.set("s22"), F.Y("u13", l, K / l), W.l(!1, !1), E = e.va, e.va.h(0)), E;
        }
        var H = e.L;
        a.normalize && (F.set("gpuRawAvg" === w ? "s9" : "s8"), F.M("u4", 1 / a.size), e.Ya.X(), e.L.h(0), W.l(!1, !1), H = e.Ya);
        f = null;
        switch(w) {
          case "cpuRGBA2Float":
            H.wb(!1);
            E ? f = M.od(H).then(g) : (H = M.pd(H), g(H));
            break;
          case "cpuMeanFloat":
            H.wb(!0);
            if (E) {
              f = H.rd().then(g);
            } else {
              H = H.sd();
              for (var L = 0; L < H.length; ++L) {
                if (isNaN(H[L])) {
                  debugger;
                }
              }
              g(H);
            }
            break;
          case "gpuRawAvg":
          case "gpuRaw":
            H.h(0);
          case "none":
            null !== g && g(H);
        }
        E && null === f && (f = Promise.resolve());
        return f;
      }, Bc:function(f) {
        f && (w = f.Za || "none", g = f.Wa || null);
        e.L = U.instance({isFloat:!0, isPot:!0, isMipmap:!1, width:a.size});
        f = "undefined" !== typeof a.classesCount && a.classesCount ? a.classesCount : a.size * a.size;
        u("INFO in NeuronLayerFeedForward - create_output(): outputsCount = ", f);
        for (var E = 0, H = 0, L = 0; E < f; ++E) {
          p.push(H + (a.size - 1 - L) * a.size), m.push([-1, -1, -1, -1]), ++H, H === a.size && (H = 0, ++L);
        }
        a.normalize && (e.Ya = U.instance({isFloat:!0, isPot:!0, width:a.size}));
      }, od:function(f) {
        return f.qd().then(c);
      }, pd:function(f) {
        f = f.ac();
        c(f);
        return m;
      }, m:function() {
        for (var f in e) {
          var E = e[f];
          E && E.remove();
        }
        y && (y.m(), y = null);
      }};
      a.wa && M.xd(a.wa);
      return M;
    }};
  }(), kb = function() {
    return {instance:function(a) {
      var c = U.instance(a.weights);
      return {ba:!0, oa:function() {
        return 1;
      }, m:function() {
        c.remove();
      }, $c:function() {
        return c;
      }, I:function() {
        F.set("s27");
        c.h(1);
        W.l(!1, !1);
      }};
    }};
  }(), nb = function() {
    return {instance:function(a) {
      var c = a.fromLayerSize, e = U.instance(a.weights);
      return {ba:!0, oa:function() {
        return c;
      }, m:function() {
        e.remove();
      }, I:function(k) {
        if (k.isEnabled) {
          alert("prout");
          F.set("s25");
          k.ld.h(3);
          var p, m = Math.min(k.sa.length, k.depth);
          for (p = 0; p < m; ++p) {
            k.sa[p].qc(4 + p);
          }
        } else {
          F.set("s24");
        }
        F.M("u17", a.toLayerSize);
        e.h(1);
        W.l(!1, !1);
      }};
    }};
  }(), lb = function() {
    return {instance:function(a) {
      for (var c = a.fromLayerSize, e = a.toLayerSize, k = a.toSparsity, p = k * e, m = p / c, w = c / e, g = 0, n = 0, l = 0, A = Array(k * e * k * e * 4), B = Array(k * e * k * e * 4), v = Array(c * c), h = 0; h < v.length; ++h) {
        v[h] = 0;
      }
      h = Math.floor(k / 2);
      for (var G = 0.5 / e, x = 0.5 / c, d = 0.5 / p, C = 0; C < e; ++C) {
        for (var K = Math.round(C * w), Q = 0; Q < e; ++Q) {
          var T = Math.round(Q * w), D = C / e, I = Q / e;
          D += G;
          I += G;
          for (var N = 0; N < k; ++N) {
            var r = K + N - h;
            0 > r && (r += c);
            r >= c && (r -= c);
            for (var q = 0; q < k; ++q) {
              var y = g / p, M = n / p, f = T + q - h;
              0 > f && (f += c);
              f >= c && (f -= c);
              var E = r / c, H = f / c;
              M = 1 - M - 1 / p;
              E += x;
              H += x;
              y += d;
              M += d;
              var L = C * k + N, V = Q * k + q;
              V = e * k - V - 1;
              L = V * e * k + L;
              A[4 * L] = y;
              A[4 * L + 1] = M;
              A[4 * L + 2] = E;
              A[4 * L + 3] = H;
              H = v[f * c + r]++;
              L = H % m;
              E = r * m + L;
              f = f * m + (H - L) / m;
              f = c * m - 1 - f;
              f = f * c * m + E;
              B[4 * f] = y;
              B[4 * f + 1] = M;
              B[4 * f + 2] = D;
              B[4 * f + 3] = I;
              ++g >= p && (g = 0, ++n);
              ++l;
            }
          }
        }
      }
      v = null;
      var la = U.instance(a.weights);
      delete a.weights.data;
      var ma = U.instance({width:p, isFloat:!0, array:new Float32Array(B), isPot:!0});
      B = null;
      var qa = U.instance({width:p, isFloat:!0, array:new Float32Array(A), isPot:!0});
      A = null;
      return {ba:!0, oa:function() {
        return m;
      }, m:function() {
        ma.remove();
        qa.remove();
        la.remove();
      }, I:function() {
        F.set("s23");
        la.h(1);
        qa.h(2);
        W.l(!1, !1);
      }};
    }};
  }(), ob = function() {
    return {instance:function(a) {
      var c = a.kernelsCount, e = a.toSparsity, k = e * a.toLayerSize / a.fromLayerSize, p = U.instance(a.weights);
      return {ba:!0, oa:function() {
        return k;
      }, ke:function() {
        return e;
      }, $c:function() {
        return p;
      }, m:function() {
        p.remove();
      }, I:function() {
        F.set("s26");
        F.M("u23", c);
        F.M("u24", e);
        F.M("u17", a.toLayerSize);
        F.M("u25", a.fromLayerSize);
        p.h(1);
        W.l(!1, !1);
      }};
    }};
  }(), mb = function() {
    return {instance:function(a, c) {
      var e = a.fromLayerSize, k = a.toLayerSize, p = a.toSparsity, m = a.stride ? a.stride : 1, w = p * k / e, g = k < e, n = e / k, l = U.instance(a.weights), A = "s48" + [e.toString(), k.toString(), p.toString(), m.toString(), c].join("_");
      F.Hc(A) || (a = fb.Jc(c, "gl_FragColor", "gl_FragColor"), k = [{type:"1f", name:"u17", value:k}, {type:"1f", name:"u30", value:m}], g && k.push({type:"1f", name:"u25", value:e}), e = [(g ? w : p).toFixed(1), a], g && e.push(n.toFixed(1)), F.Mb(g ? "s40" : "s39", A, e), F.ya(A, k.concat([{type:"1i", name:"u15", value:0}, {type:"1i", name:"u22", value:1}, {type:"1i", name:"u14", value:3}])));
      return {ba:!1, oa:function() {
        return w;
      }, m:function() {
        l.remove();
      }, I:function() {
        F.set(A);
        l.h(3);
        W.l(!1, !1);
      }};
    }};
  }(), ib = function() {
    return {instance:function(a) {
      var c = a.Xb ? a.Xb : 3, e = a.Nb ? a.Nb : 64, k = a.Yb ? a.Yb : 64, p = a.qa ? !0 : !1;
      a = {isFloat:!1, width:e, isPot:!1, isFlipY:!1};
      var m = U.instance(a), w = U.instance(a), g = U.instance(a), n = U.instance(a), l = U.instance({isFloat:!0, width:k, isPot:!1, isFlipY:!1}), A = 1.0 / e;
      return {process:function(B) {
        F.set("s36");
        n.o();
        W.l(p, !1);
        F.set("s37");
        for (var v = 0; v < c; ++v) {
          m.o(), F.Y("u8", A, 0), W.l(p, !1), g.o(), n.h(0), W.l(p, !1), w.o(), m.h(0), F.Y("u8", 0, A), W.l(p, !1), n.o(), g.h(0), W.l(p, !1), v !== c - 1 && w.h(0);
        }
        F.set("s38");
        l.o();
        B.h(0);
        w.h(1);
        n.h(2);
        W.l(p, !1);
        l.h(0);
      }, Na:function() {
        return l;
      }};
    }};
  }(), jb = function() {
    return {instance:function(a) {
      function c(l) {
        return U.instance({isFloat:l, width:e.ib, isPot:!1, isFlipY:!1});
      }
      var e = Object.assign({jc:0.1, nb:9, ib:128, qa:!1}, a), k = c(!1), p = [c(!1), c(!1), c(!1)], m = [c(!1), c(!1), c(!1)], w = c(!0), g = [k, m[0], m[1]];
      a = "uniform sampler2D u1;const float e=1.1111,g=2.2222;uniform vec2 u32;varying vec2 vv0;void main(){float b=0.,c=0.;for(float a=-e;a<=e;a+=1.){vec2 i=u32*a,j=vv0+i*g;float d=1.2*a/e,f=exp(-d*d);b+=f*texture2D(u1,j).r,c+=f;}b/=c,gl_FragColor=vec4(b,0.,0.,1.);}".replace("1.1111", Math.round((e.nb - 1) / 2).toFixed(2)).replace("2.2222", (1.0 / e.ib).toFixed(6));
      var n = {u1:0};
      F.nc([{id:"s50", name:"PREPROCESSING INPUTMIX0 GREYSCALE", g:"uniform sampler2D u1;varying vec2 vv0;const vec3 f=vec3(.2126,.7152,.0722),g=vec3(1.,1.,1.);void main(){vec3 b=texture2D(u1,vv0).rgb;float a=dot(b,f);gl_FragColor=vec4(a,a,a,a);}", j:n, i:["u1"], precision:"lowp"}, {id:"s51", name:"PREPROCESSING INPUTMIX0 BLUR", g:a, j:n, i:["u1", "u32"], precision:"lowp"}, {id:"s52", name:"PREPROCESSING INPUTMIX0 COMPOSE", g:"uniform sampler2D u33,u34,u35,u36;const float f=1.1111;const vec3 g=vec3(1.,1.,1.);varying vec2 vv0;void main(){vec3 a=texture2D(u33,vv0).rgb;float c=texture2D(u34,vv0).r,d=texture2D(u35,vv0).r,h=texture2D(u36,vv0).r,i=a.r*a.r;vec3 b=vec3(c,d,h),j=max(g*f,abs(i-b*b)),k=sqrt(j);gl_FragColor=vec4(a.r,(a-b)/k);}".replace("1.1111", 
      e.jc.toFixed(4)), j:{u33:0, u34:1, u35:2, u36:3,}, i:["u33", "u34", "u35", "u36"], precision:"highp"}]);
      return {process:function() {
        F.set("s50");
        k.X();
        W.l(e.qa, !1);
        F.set("s51");
        for (var l = 0; 3 > l; ++l) {
          F.Y("u32", 1, 0), p[l].o(), g[l].h(0), W.l(!1, !1), F.Y("u32", 0, 1), m[l].o(), p[l].h(0), W.l(!1, !1);
        }
        F.set("s52");
        w.o();
        k.h(0);
        m[0].h(1);
        m[1].h(2);
        m[2].h(3);
        W.l(!1, !1);
        w.h(0);
      }, Na:function() {
        return w;
      }};
    }};
  }(), S = {Jb:function() {
    return S.tb() ? document.createElement("video") : !1;
  }, fa:function(a, c) {
    a[c] = !0;
    a.setAttribute(c, "true");
  }, yc:function() {
    var a = !1, c = navigator.userAgent || navigator.vendor || window.opera;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(c) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(c.substr(0, 
    4))) {
      a = !0;
    }
    return a;
  }, qb:function() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }, Kc:function() {
    var a = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    return a && a.length && 2 < a.length ? [parseInt(a[1], 10), parseInt(a[2], 10), parseInt(a[3] || 0, 10)] : [0, 0, 0];
  }, Ub:function() {
    try {
      return window.matchMedia("(orientation: portrait)").matches ? !0 : !1;
    } catch (a) {
      return window.innerHeight > window.innerWidth;
    }
  }, xc:function() {
    return S.rb() || S.qb();
  }, rb:function() {
    var a = navigator.userAgent.toLowerCase();
    return -1 !== a.indexOf("safari") && -1 === a.indexOf("chrome") ? !0 : !1;
  }, Wd:function() {
    return S.yc() ? S.Ub() ? window.innerHeight / window.innerWidth * 45 : 45 : 45;
  }, tb:function() {
    return navigator.mediaDevices && navigator.mediaDevices.getUserMedia ? !0 : !1;
  }, pause:function(a) {
    a.pause();
  }, Be:function(a) {
    a.play();
  }, release:function(a) {
    a.pause();
    a.videoStream && a.videoStream.stop();
    a.videoStream = null;
  }, sb:function(a) {
    if (!a) {
      return a;
    }
    var c = null;
    if (a.video) {
      var e = function(k) {
        return k && "object" === typeof k ? Object.assign({}, k) : k;
      };
      c = {};
      "undefined" !== typeof a.video.width && (c.width = e(a.video.width));
      "undefined" !== typeof a.video.height && (c.height = e(a.video.height));
      "undefined" !== typeof a.video.facingMode && (c.facingMode = e(a.video.facingMode));
    }
    c = {audio:a.audio, video:c};
    "undefined" !== typeof a.deviceId && S.mc(c, a.deviceId);
    return c;
  }, mc:function(a, c) {
    c && (a.video = a.video || {}, a.video.deviceId = {exact:c}, a.video.facingMode && delete a.video.facingMode);
  }, hc:function(a) {
    var c = a.video.width;
    a.video.width = a.video.height;
    a.video.height = c;
    return a;
  }, Ac:function(a) {
    function c(v) {
      return [480, 576, 640, 648, 720, 768, 800, 960, 1080, 1152, 1280, 1366, 1920].sort(function(h, G) {
        return Math.abs(h - v) - Math.abs(G - v);
      });
    }
    function e(v) {
      var h = S.sb(a);
      v = v(h);
      p.push(v);
      k(v);
    }
    function k(v) {
      if (v.video && v.video.facingMode && v.video.facingMode.exact) {
        var h = v.video.facingMode.exact;
        v = S.sb(v);
        delete v.video.facingMode.exact;
        v.video.facingMode.ideal = h;
        p.push(v);
      }
    }
    var p = [];
    if (!a || !a.video) {
      return p;
    }
    k(a);
    if (a.video.width && a.video.height) {
      if (a.video.width.ideal && a.video.height.ideal) {
        var m = c(a.video.width.ideal).slice(0, 3), w = c(a.video.height.ideal).slice(0, 3), g = {}, n = 0;
        for (g.T = void 0; n < m.length; g = {T:g.T}, ++n) {
          g.T = m[n];
          var l = {}, A = 0;
          for (l.S = void 0; A < w.length; l = {S:l.S}, ++A) {
            if (l.S = w[A], g.T !== a.video.width.ideal || l.S !== a.video.height.ideal) {
              var B = Math.max(g.T, l.S) / Math.min(g.T, l.S);
              B < 4 / 3 - 0.1 || B > 16 / 9 + 0.1 || e(function(v, h) {
                return function(G) {
                  G.video.width.ideal = v.T;
                  G.video.height.ideal = h.S;
                  return G;
                };
              }(g, l));
            }
          }
        }
      }
      e(function(v) {
        return S.hc(v);
      });
    }
    a.video.width && a.video.height && (a.video.width.ideal && a.video.height.ideal && e(function(v) {
      delete v.video.width.ideal;
      delete v.video.height.ideal;
      return v;
    }), e(function(v) {
      delete v.video.width;
      delete v.video.height;
      return v;
    }));
    a.video.facingMode && (e(function(v) {
      delete v.video.facingMode;
      return v;
    }), a.video.width && a.video.height && e(function(v) {
      S.hc(v);
      delete v.video.facingMode;
      return v;
    }));
    p.push({audio:a.audio, video:!0});
    return p;
  }, Cd:function(a) {
    if (S.Ub()) {
      if (!a || !a.video) {
        return !1;
      }
      var c = a.video.width, e = a.video.height;
      if (!c || !e) {
        return !1;
      }
      if (c.ideal && e.ideal && c.ideal > e.ideal) {
        return a.video.height = c, a.video.width = e, !0;
      }
    }
    return !1;
  }, ta:function(a) {
    a.volume = 0.0;
    S.fa(a, "muted");
    if (S.rb()) {
      u("INFO in MediaStreamAPIHelper - mute(): Safari detected");
      if (1 === a.volume) {
        var c = function() {
          a.volume = 0.0;
          u("INFO in MediaStreamAPIHelper - mute(): mute this fucking volume by a fucking user action.");
          window.removeEventListener("mousemove", c, !1);
          window.removeEventListener("touchstart", c, !1);
        };
        u("WARNING in MediaStreamAPIHelper - mute(): cannot mute the video. F****ing Safari !");
        window.addEventListener("mousemove", c, !1);
        window.addEventListener("touchstart", c, !1);
      }
      setTimeout(function() {
        a.volume = 0.0;
        S.fa(a, "muted");
      }, 5);
    }
  }, Pe:function(a, c, e) {
    return null === a ? Promise.resolve() : new Promise(function(k, p) {
      if (a.srcObject && a.srcObject.getVideoTracks) {
        var m = a.srcObject.getVideoTracks();
        1 !== m.length ? p("INVALID_TRACKNUMBER") : (m = m[0], c ? S.get(a, k, p, e) : (m.stop(), k()));
      } else {
        p("BAD_IMPLEMENTATION");
      }
    });
  }, Ib:function(a, c, e, k) {
    function p(g, n, l) {
      w ? (u("WARNING in MediaStreamAPIHelper - get_raw(): cannot launch callbackSuccess because an error was thrown"), u(JSON.stringify(k))) : (u("INFO in MediaStreamAPIHelper - get_raw(): callbackSuccess called with constraints="), u(JSON.stringify(k)), c(g, n, l));
    }
    function m(g) {
      w || (w = !0, e(g));
    }
    var w = !1;
    return navigator.mediaDevices.getUserMedia(k).then(function(g) {
      function n() {
        setTimeout(function() {
          if (a.currentTime) {
            var A = a.videoWidth, B = a.videoHeight;
            if (0 === A || 0 === B) {
              m("VIDEO_NULLSIZE");
            } else {
              A && (a.style.width = A.toString() + "px");
              B && (a.style.height = B.toString() + "px");
              var v = {vc:null, Bd:null, md:null};
              try {
                var h = g.getVideoTracks()[0];
                h && (v.md = h, v.vc = h.getCapabilities(), v.Bd = h.getSettings());
              } catch (G) {
                u("WARNING in MediaStreamAPIHelper - get_raw(): Image Capture API not found");
              }
              S.xc() ? (u("WARNING in MediaStreamAPIHelper - Apple device detected, add the video element to the DOM."), a.parentNode && null !== a.parentNode ? (p(a, g, v), setTimeout(function() {
                a.play();
              }, 100)) : (document.body.appendChild(a), S.ta(a), setTimeout(function() {
                a.style.transform = "scale(0.0001,0.0001)";
                a.style.position = "fixed";
                a.style.bottom = "0px";
                a.style.right = "0px";
                S.ta(a);
                setTimeout(function() {
                  a.play();
                  p(a, g, v);
                }, 100);
              }, 80))) : p(a, g, v);
            }
          } else {
            m("VIDEO_NOTSTARTED"), u("ERROR in callSuccessIfPlaying() - VIDEO_NOTSTARTED: video.currentTime =", a.currentTime);
          }
        }, 700);
      }
      function l() {
        u("INFO in MediaStreamAPIHelper - get_raw(): video.onloadedmetadata dispatched");
        a.removeEventListener("loadeddata", l, !1);
        var A = a.play();
        S.ta(a);
        "undefined" === typeof A ? n() : A.then(function() {
          u("INFO in MediaStreamAPIHelper - get_raw(): playPromise accepted");
          n();
        }).catch(function(B) {
          u("ERROR in MediaStreamAPIHelper - get_raw(): playPromise failed - ", B);
          m("VIDEO_PLAYPROMISEREJECTED");
        });
      }
      u("INFO in MediaStreamAPIHelper - get_raw(): videoStream got");
      "undefined" !== typeof a.srcObject ? a.srcObject = g : (a.src = window.URL.createObjectURL(g), a.videoStream = g, u("WARNING in MediaStreamAPIHelper - get_raw(): video.srcObject is not implemented. Old browser ?"));
      S.ta(a);
      a.addEventListener("loadeddata", l, !1);
    }).catch(function(g) {
      m(g);
    });
  }, ge:function(a, c) {
    var e = c || S.Jb();
    return new Promise(function(k, p) {
      S.get(e, k, p, a);
    });
  }, get:function(a, c, e, k) {
    if (!a) {
      return u("ERROR in MediaStreamAPIHelper - get(): No video provided"), e && e("VIDEO_NOTPROVIDED"), !1;
    }
    if (!S.tb()) {
      return u("ERROR in MediaStreamAPIHelper - get(): No getUserMedia API found !"), e && e("MEDIASTREAMAPI_NOTFOUND"), !1;
    }
    if (k && k.video) {
      if (S.qb()) {
        u("INFO in MediaStreamAPIHelper() - get(): iOS detected");
        var p = S.Kc();
        0 !== p[0] && (12 > p[0] || 12 === p[0] && 2 > p[1]) && S.Cd(k);
      }
      k.video.width && k.video.width.ideal && (a.style.width = k.video.width.ideal + "px");
      k.video.height && k.video.height.ideal && (a.style.height = k.video.height.ideal + "px");
    }
    S.fa(a, "autoplay");
    S.fa(a, "playsinline");
    k && k.audio ? a.volume = 0.0 : S.fa(a, "muted");
    u("INFO in MediaStreamAPIHelper() - get(): constraints =", JSON.stringify(k));
    S.Ib(a, c, function(m) {
      function w(g) {
        if (0 === g.length) {
          e("INVALID_FALLBACKCONSTRAINTS");
        } else {
          var n = g.shift();
          S.Ib(a, c, function(l) {
            u("WARNING: fails with constraints = ", JSON.stringify(n), l);
            w(g);
          }, n);
        }
      }
      u("WARNING in MediaStreamAPIHelper() - get(): cannot request video with this constraints. Downgrade constraints. err=", m);
      m = S.Ac(k);
      w(m);
    }, k);
  }, oe:function(a) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      return u("INFO in MediaStreamAPIHelper - get_videoDevices(): enumerateDevices() not supported"), a(!1, "NOTSUPPORTED"), !1;
    }
    navigator.mediaDevices.enumerateDevices().then(function(c) {
      (c = c.filter(function(e) {
        return e.kind && -1 !== e.kind.toLowerCase().indexOf("video") && e.label && e.deviceId;
      })) && c.length && 0 < c.length ? a(c, !1) : (u("ERROR in MediaStreamAPIHelper - get_videoDevices(): no devices founds"), a(!1, "NODEVICESFOUND"));
    }).catch(function(c) {
      u("ERROR in MediaStreamAPIHelper - get_videoDevices(): enumerateDevices promise rejected", c);
      a(!1, "PROMISEREJECTED");
    });
  }, Nd:function(a, c, e) {
    var k = {};
    k[c] = e;
    c = [];
    c.push(k);
    a.applyConstraints({advanced:c}).catch(function(p) {
      u("ERROR in MediaStreamAPIHelper - change_setting(): ", p);
    });
  }}, db = function() {
    var a = {Zc:function() {
      return window.navigator.userAgent;
    }, Yc:function() {
      return window.navigator.platform;
    }, Sc:function(c) {
      var e = "UNDEF", k = c.getExtension("webgl_debug_renderer_info");
      k && k.UNMASKED_RENDERER_WEBGL && (e = c.getParameter(k.UNMASKED_RENDERER_WEBGL));
      return e;
    }, Lc:function(c, e) {
      e = e || "";
      var k = [e + "navigator.userAgent = " + a.Zc(), e + "navigator.platform = " + a.Yc()];
      c || (c = document.createElement("canvas"), c.setAttribute("width", 1), c.setAttribute("height", 1), c = c.getContext("webgl", {}));
      c && k.push(e + "GPU = " + a.Sc(c));
      return k;
    }};
    return a;
  }(), sa = null, ha = {ca:null, ub:null, Kb:null, canvas:null}, Va = {VERSION:"2.0.1", init:function(a) {
    sa = Object.assign({isGetVideo:!0, logFunc:null, canvas:null, size:256}, a);
    sa.logFunc || $a();
    ha.canvas = sa.canvas || ha.canvas;
    u("WebGLCoreLogger version " + Va.VERSION);
    return new Promise(function(c, e) {
      if (sa.isGetVideo) {
        try {
          S.get(S.Jb(), bb.bind(null, c, e), cb.bind(null, c, e), {video:{facingMode:{ideal:"user"}, width:{min:480, max:1280, ideal:800}, height:{min:480, max:1280, ideal:600}}, audio:!1});
        } catch (k) {
          u("ERROR FATAL in WebGLCoreLogger: " + k.message), e(k);
        }
      } else {
        Ja(c, e);
      }
    });
  }, test_NN0:function(a) {
    u("\n============= TEST0 =============");
    return new Promise(function() {
      for (var c = new Wa({sa:a.layers, Za:"cpuRGBA2Float", Wa:function(w) {
        var g = c.Xc();
        u("Neural network output =");
        for (var n = 0; 4 > n; ++n) {
          u(["RED", "GREEN", "BLUE", "ALPHA"][n] + " channel:");
          for (var l = 0; l < g; ++l) {
            for (var A = [], B = 0; B < g; ++B) {
              var v = w[l * g + B][n], h = v.toFixed(3);
              0 <= v && (h = " " + h);
              A.push(h);
            }
            u(A.join(" "));
          }
        }
      }}), e = c.Tc(), k = e * e, p = new Uint8Array(4 * k), m = 0; m < k; ++m) {
        p[4 * m] = 0, p[4 * m + 1] = 50, p[4 * m + 2] = 127, p[4 * m + 3] = 255;
      }
      e = U.instance({isPot:!0, isFloat:!1, width:e, array:p});
      Ea.ad();
      c.I(e);
    });
  }};
  return Va;
}();

if(typeof(module)!=='undefined'){module.exports=window.WebGLCoreLogger;}
window.WebGLCoreLogger.FAKEDOM=FAKEDOM;