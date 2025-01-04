!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(require("@firebase/app-compat"), require("@firebase/app"))
    : "function" == typeof define && define.amd
    ? define(["@firebase/app-compat", "@firebase/app"], t)
    : t(
        (e = "undefined" != typeof globalThis ? globalThis : e || self)
          .firebase,
        e.firebase.INTERNAL.modularAPIs
      );
})(this, function (Qc, $c) {
  "use strict";
  try {
    !function () {
      var l,
        e =
          (e = Qc) && "object" == typeof e && "default" in e
            ? e
            : { default: e };
      function r(n) {
        const r = [];
        let s = 0;
        for (let t = 0; t < n.length; t++) {
          let e = n.charCodeAt(t);
          e < 128
            ? (r[s++] = e)
            : (e < 2048
                ? (r[s++] = (e >> 6) | 192)
                : (55296 == (64512 & e) &&
                  t + 1 < n.length &&
                  56320 == (64512 & n.charCodeAt(t + 1))
                    ? ((e =
                        65536 +
                        ((1023 & e) << 10) +
                        (1023 & n.charCodeAt(++t))),
                      (r[s++] = (e >> 18) | 240),
                      (r[s++] = ((e >> 12) & 63) | 128))
                    : (r[s++] = (e >> 12) | 224),
                  (r[s++] = ((e >> 6) & 63) | 128)),
              (r[s++] = (63 & e) | 128));
        }
        return r;
      }
      const s = {
        byteToCharMap_: null,
        charToByteMap_: null,
        byteToCharMapWebSafe_: null,
        charToByteMapWebSafe_: null,
        ENCODED_VALS_BASE:
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        get ENCODED_VALS() {
          return this.ENCODED_VALS_BASE + "+/=";
        },
        get ENCODED_VALS_WEBSAFE() {
          return this.ENCODED_VALS_BASE + "-_.";
        },
        HAS_NATIVE_SUPPORT: "function" == typeof atob,
        encodeByteArray(r, e) {
          if (!Array.isArray(r))
            throw Error("encodeByteArray takes an array as a parameter");
          this.init_();
          var s = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
          const i = [];
          for (let n = 0; n < r.length; n += 3) {
            var a = r[n],
              o = n + 1 < r.length,
              u = o ? r[n + 1] : 0,
              h = n + 2 < r.length,
              c = h ? r[n + 2] : 0;
            let e = ((15 & u) << 2) | (c >> 6),
              t = 63 & c;
            h || ((t = 64), o || (e = 64)),
              i.push(s[a >> 2], s[((3 & a) << 4) | (u >> 4)], s[e], s[t]);
          }
          return i.join("");
        },
        encodeString(e, t) {
          return this.HAS_NATIVE_SUPPORT && !t
            ? btoa(e)
            : this.encodeByteArray(r(e), t);
        },
        decodeString(n, r) {
          if (this.HAS_NATIVE_SUPPORT && !r) return atob(n);
          {
            var s = this.decodeStringToByteArray(n, r);
            const u = [];
            let e = 0,
              t = 0;
            for (; e < s.length; ) {
              var i,
                a,
                o = s[e++];
              o < 128
                ? (u[t++] = String.fromCharCode(o))
                : 191 < o && o < 224
                ? ((i = s[e++]),
                  (u[t++] = String.fromCharCode(((31 & o) << 6) | (63 & i))))
                : 239 < o && o < 365
                ? ((a =
                    (((7 & o) << 18) |
                      ((63 & s[e++]) << 12) |
                      ((63 & s[e++]) << 6) |
                      (63 & s[e++])) -
                    65536),
                  (u[t++] = String.fromCharCode(55296 + (a >> 10))),
                  (u[t++] = String.fromCharCode(56320 + (1023 & a))))
                : ((i = s[e++]),
                  (a = s[e++]),
                  (u[t++] = String.fromCharCode(
                    ((15 & o) << 12) | ((63 & i) << 6) | (63 & a)
                  )));
            }
            return u.join("");
          }
        },
        decodeStringToByteArray(t, e) {
          this.init_();
          var n = e ? this.charToByteMapWebSafe_ : this.charToByteMap_;
          const r = [];
          for (let e = 0; e < t.length; ) {
            var s = n[t.charAt(e++)],
              i = e < t.length ? n[t.charAt(e)] : 0,
              a = ++e < t.length ? n[t.charAt(e)] : 64,
              o = ++e < t.length ? n[t.charAt(e)] : 64;
            if ((++e, null == s || null == i || null == a || null == o))
              throw new h();
            r.push((s << 2) | (i >> 4)),
              64 !== a &&
                (r.push(((i << 4) & 240) | (a >> 2)),
                64 !== o && r.push(((a << 6) & 192) | o));
          }
          return r;
        },
        init_() {
          if (!this.byteToCharMap_) {
            (this.byteToCharMap_ = {}),
              (this.charToByteMap_ = {}),
              (this.byteToCharMapWebSafe_ = {}),
              (this.charToByteMapWebSafe_ = {});
            for (let e = 0; e < this.ENCODED_VALS.length; e++)
              (this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e)),
                (this.charToByteMap_[this.byteToCharMap_[e]] = e),
                (this.byteToCharMapWebSafe_[e] =
                  this.ENCODED_VALS_WEBSAFE.charAt(e)),
                (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] =
                  e) >= this.ENCODED_VALS_BASE.length &&
                  ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] =
                    e),
                  (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] =
                    e));
          }
        },
      };
      class h extends Error {
        constructor() {
          super(...arguments), (this.name = "DecodeBase64StringError");
        }
      }
      function q(e) {
        return (e = r(e)), s.encodeByteArray(e, !0).replace(/\./g, "");
      }
      const t = () =>
          (function () {
            if ("undefined" != typeof self) return self;
            if ("undefined" != typeof window) return window;
            if ("undefined" != typeof global) return global;
            throw new Error("Unable to locate global object.");
          })().__FIREBASE_DEFAULTS__,
        j = () => {
          if ("undefined" != typeof document) {
            let e;
            try {
              e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
            } catch (e) {
              return;
            }
            var t =
              e &&
              (function (e) {
                try {
                  return s.decodeString(e, !0);
                } catch (e) {
                  console.error("base64Decode failed: ", e);
                }
                return null;
              })(e[1]);
            return t && JSON.parse(t);
          }
        };
      function G() {
        return "undefined" != typeof navigator &&
          "string" == typeof navigator.userAgent
          ? navigator.userAgent
          : "";
      }
      function z() {
        return (
          !(function () {
            var e =
              null ==
              (e = (() => {
                try {
                  return (
                    t() ||
                    (() => {
                      var e;
                      if (
                        "undefined" != typeof process &&
                        void 0 !== process.env
                      )
                        return (e = process.env.__FIREBASE_DEFAULTS__)
                          ? JSON.parse(e)
                          : void 0;
                    })() ||
                    j()
                  );
                } catch (e) {
                  return void console.info(
                    "Unable to get __FIREBASE_DEFAULTS__ due to: " + e
                  );
                }
              })())
                ? void 0
                : e.forceEnvironment;
            if ("node" === e) return 1;
            if ("browser" !== e)
              try {
                return (
                  "[object process]" ===
                  Object.prototype.toString.call(global.process)
                );
              } catch (e) {
                return;
              }
          })() &&
          navigator.userAgent &&
          navigator.userAgent.includes("Safari") &&
          !navigator.userAgent.includes("Chrome")
        );
      }
      class K extends Error {
        constructor(e, t, n) {
          super(t),
            (this.code = e),
            (this.customData = n),
            (this.name = "FirebaseError"),
            Object.setPrototypeOf(this, K.prototype),
            Error.captureStackTrace &&
              Error.captureStackTrace(this, Q.prototype.create);
        }
      }
      class Q {
        constructor(e, t, n) {
          (this.service = e), (this.serviceName = t), (this.errors = n);
        }
        create(e, ...t) {
          var r,
            t = t[0] || {},
            n = this.service + "/" + e,
            e = (e = this.errors[e])
              ? ((r = t),
                e.replace($, (e, t) => {
                  var n = r[t];
                  return null != n ? String(n) : `<${t}?>`;
                }))
              : "Error",
            e = this.serviceName + `: ${e} (${n}).`;
          return new K(n, e, t);
        }
      }
      const $ = /\{\$([^}]+)}/g;
      function H(e, t) {
        if (e === t) return !0;
        const n = Object.keys(e),
          r = Object.keys(t);
        for (const a of n) {
          if (!r.includes(a)) return !1;
          var s = e[a],
            i = t[a];
          if (W(s) && W(i)) {
            if (!H(s, i)) return !1;
          } else if (s !== i) return !1;
        }
        for (const o of r) if (!n.includes(o)) return !1;
        return !0;
      }
      function W(e) {
        return null !== e && "object" == typeof e;
      }
      function v(e) {
        return e && e._delegate ? e._delegate : e;
      }
      class J {
        constructor(e, t, n) {
          (this.name = e),
            (this.instanceFactory = t),
            (this.type = n),
            (this.multipleInstances = !1),
            (this.serviceProps = {}),
            (this.instantiationMode = "LAZY"),
            (this.onInstanceCreated = null);
        }
        setInstantiationMode(e) {
          return (this.instantiationMode = e), this;
        }
        setMultipleInstances(e) {
          return (this.multipleInstances = e), this;
        }
        setServiceProps(e) {
          return (this.serviceProps = e), this;
        }
        setInstanceCreatedCallback(e) {
          return (this.onInstanceCreated = e), this;
        }
      }
      ((jc = l = l || {})[(jc.DEBUG = 0)] = "DEBUG"),
        (jc[(jc.VERBOSE = 1)] = "VERBOSE"),
        (jc[(jc.INFO = 2)] = "INFO"),
        (jc[(jc.WARN = 3)] = "WARN"),
        (jc[(jc.ERROR = 4)] = "ERROR"),
        (jc[(jc.SILENT = 5)] = "SILENT");
      const Y = {
          debug: l.DEBUG,
          verbose: l.VERBOSE,
          info: l.INFO,
          warn: l.WARN,
          error: l.ERROR,
          silent: l.SILENT,
        },
        X = l.INFO,
        Z = {
          [l.DEBUG]: "log",
          [l.VERBOSE]: "log",
          [l.INFO]: "info",
          [l.WARN]: "warn",
          [l.ERROR]: "error",
        },
        ee = (e, t, ...n) => {
          if (!(t < e.logLevel)) {
            var r = new Date().toISOString(),
              s = Z[t];
            if (!s)
              throw new Error(
                `Attempted to log a message with an invalid logType (value: ${t})`
              );
            console[s](`[${r}]  ${e.name}:`, ...n);
          }
        };
      var te,
        ne,
        re =
          "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof window
            ? window
            : "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : {};
      !function () {
        var e, i;
        function t() {
          (this.blockSize = -1),
            (this.blockSize = 64),
            (this.g = Array(4)),
            (this.B = Array(this.blockSize)),
            (this.o = this.h = 0),
            this.s();
        }
        function n() {}
        function a(e, t, n) {
          n = n || 0;
          var r = Array(16);
          if ("string" == typeof t)
            for (var s = 0; s < 16; ++s)
              r[s] =
                t.charCodeAt(n++) |
                (t.charCodeAt(n++) << 8) |
                (t.charCodeAt(n++) << 16) |
                (t.charCodeAt(n++) << 24);
          else
            for (s = 0; s < 16; ++s)
              r[s] = t[n++] | (t[n++] << 8) | (t[n++] << 16) | (t[n++] << 24);
          (t = e.g[0]), (n = e.g[1]);
          var s = e.g[2],
            i = e.g[3],
            a =
              ((n =
                (s =
                  (i =
                    (t =
                      (n =
                        (s =
                          (i =
                            (t =
                              (n =
                                (s =
                                  (i =
                                    (t =
                                      (n =
                                        (s =
                                          (i =
                                            (t =
                                              (n =
                                                (s =
                                                  (i =
                                                    (t =
                                                      (n =
                                                        (s =
                                                          (i =
                                                            (t =
                                                              (n =
                                                                (s =
                                                                  (i =
                                                                    (t =
                                                                      (n =
                                                                        (s =
                                                                          (i =
                                                                            (t =
                                                                              (n =
                                                                                (s =
                                                                                  (i =
                                                                                    (t =
                                                                                      (n =
                                                                                        (s =
                                                                                          (i =
                                                                                            (t =
                                                                                              (n =
                                                                                                (s =
                                                                                                  (i =
                                                                                                    (t =
                                                                                                      (n =
                                                                                                        (s =
                                                                                                          (i =
                                                                                                            (t =
                                                                                                              (n =
                                                                                                                (s =
                                                                                                                  (i =
                                                                                                                    (t =
                                                                                                                      (n =
                                                                                                                        (s =
                                                                                                                          (i =
                                                                                                                            (t =
                                                                                                                              (n =
                                                                                                                                (s =
                                                                                                                                  (i =
                                                                                                                                    (t =
                                                                                                                                      n +
                                                                                                                                      ((((a =
                                                                                                                                        (t +
                                                                                                                                          (i ^
                                                                                                                                            (n &
                                                                                                                                              (s ^
                                                                                                                                                i))) +
                                                                                                                                          r[0] +
                                                                                                                                          3614090360) &
                                                                                                                                        4294967295) <<
                                                                                                                                        7) &
                                                                                                                                        4294967295) |
                                                                                                                                        (a >>>
                                                                                                                                          25))) +
                                                                                                                                    ((((a =
                                                                                                                                      (i +
                                                                                                                                        (s ^
                                                                                                                                          (t &
                                                                                                                                            (n ^
                                                                                                                                              s))) +
                                                                                                                                        r[1] +
                                                                                                                                        3905402710) &
                                                                                                                                      4294967295) <<
                                                                                                                                      12) &
                                                                                                                                      4294967295) |
                                                                                                                                      (a >>>
                                                                                                                                        20))) +
                                                                                                                                  ((((a =
                                                                                                                                    (s +
                                                                                                                                      (n ^
                                                                                                                                        (i &
                                                                                                                                          (t ^
                                                                                                                                            n))) +
                                                                                                                                      r[2] +
                                                                                                                                      606105819) &
                                                                                                                                    4294967295) <<
                                                                                                                                    17) &
                                                                                                                                    4294967295) |
                                                                                                                                    (a >>>
                                                                                                                                      15))) +
                                                                                                                                ((((a =
                                                                                                                                  (n +
                                                                                                                                    (t ^
                                                                                                                                      (s &
                                                                                                                                        (i ^
                                                                                                                                          t))) +
                                                                                                                                    r[3] +
                                                                                                                                    3250441966) &
                                                                                                                                  4294967295) <<
                                                                                                                                  22) &
                                                                                                                                  4294967295) |
                                                                                                                                  (a >>>
                                                                                                                                    10))) +
                                                                                                                              ((((a =
                                                                                                                                (t +
                                                                                                                                  (i ^
                                                                                                                                    (n &
                                                                                                                                      (s ^
                                                                                                                                        i))) +
                                                                                                                                  r[4] +
                                                                                                                                  4118548399) &
                                                                                                                                4294967295) <<
                                                                                                                                7) &
                                                                                                                                4294967295) |
                                                                                                                                (a >>>
                                                                                                                                  25))) +
                                                                                                                            ((((a =
                                                                                                                              (i +
                                                                                                                                (s ^
                                                                                                                                  (t &
                                                                                                                                    (n ^
                                                                                                                                      s))) +
                                                                                                                                r[5] +
                                                                                                                                1200080426) &
                                                                                                                              4294967295) <<
                                                                                                                              12) &
                                                                                                                              4294967295) |
                                                                                                                              (a >>>
                                                                                                                                20))) +
                                                                                                                          ((((a =
                                                                                                                            (s +
                                                                                                                              (n ^
                                                                                                                                (i &
                                                                                                                                  (t ^
                                                                                                                                    n))) +
                                                                                                                              r[6] +
                                                                                                                              2821735955) &
                                                                                                                            4294967295) <<
                                                                                                                            17) &
                                                                                                                            4294967295) |
                                                                                                                            (a >>>
                                                                                                                              15))) +
                                                                                                                        ((((a =
                                                                                                                          (n +
                                                                                                                            (t ^
                                                                                                                              (s &
                                                                                                                                (i ^
                                                                                                                                  t))) +
                                                                                                                            r[7] +
                                                                                                                            4249261313) &
                                                                                                                          4294967295) <<
                                                                                                                          22) &
                                                                                                                          4294967295) |
                                                                                                                          (a >>>
                                                                                                                            10))) +
                                                                                                                      ((((a =
                                                                                                                        (t +
                                                                                                                          (i ^
                                                                                                                            (n &
                                                                                                                              (s ^
                                                                                                                                i))) +
                                                                                                                          r[8] +
                                                                                                                          1770035416) &
                                                                                                                        4294967295) <<
                                                                                                                        7) &
                                                                                                                        4294967295) |
                                                                                                                        (a >>>
                                                                                                                          25))) +
                                                                                                                    ((((a =
                                                                                                                      (i +
                                                                                                                        (s ^
                                                                                                                          (t &
                                                                                                                            (n ^
                                                                                                                              s))) +
                                                                                                                        r[9] +
                                                                                                                        2336552879) &
                                                                                                                      4294967295) <<
                                                                                                                      12) &
                                                                                                                      4294967295) |
                                                                                                                      (a >>>
                                                                                                                        20))) +
                                                                                                                  ((((a =
                                                                                                                    (s +
                                                                                                                      (n ^
                                                                                                                        (i &
                                                                                                                          (t ^
                                                                                                                            n))) +
                                                                                                                      r[10] +
                                                                                                                      4294925233) &
                                                                                                                    4294967295) <<
                                                                                                                    17) &
                                                                                                                    4294967295) |
                                                                                                                    (a >>>
                                                                                                                      15))) +
                                                                                                                ((((a =
                                                                                                                  (n +
                                                                                                                    (t ^
                                                                                                                      (s &
                                                                                                                        (i ^
                                                                                                                          t))) +
                                                                                                                    r[11] +
                                                                                                                    2304563134) &
                                                                                                                  4294967295) <<
                                                                                                                  22) &
                                                                                                                  4294967295) |
                                                                                                                  (a >>>
                                                                                                                    10))) +
                                                                                                              ((((a =
                                                                                                                (t +
                                                                                                                  (i ^
                                                                                                                    (n &
                                                                                                                      (s ^
                                                                                                                        i))) +
                                                                                                                  r[12] +
                                                                                                                  1804603682) &
                                                                                                                4294967295) <<
                                                                                                                7) &
                                                                                                                4294967295) |
                                                                                                                (a >>>
                                                                                                                  25))) +
                                                                                                            ((((a =
                                                                                                              (i +
                                                                                                                (s ^
                                                                                                                  (t &
                                                                                                                    (n ^
                                                                                                                      s))) +
                                                                                                                r[13] +
                                                                                                                4254626195) &
                                                                                                              4294967295) <<
                                                                                                              12) &
                                                                                                              4294967295) |
                                                                                                              (a >>>
                                                                                                                20))) +
                                                                                                          ((((a =
                                                                                                            (s +
                                                                                                              (n ^
                                                                                                                (i &
                                                                                                                  (t ^
                                                                                                                    n))) +
                                                                                                              r[14] +
                                                                                                              2792965006) &
                                                                                                            4294967295) <<
                                                                                                            17) &
                                                                                                            4294967295) |
                                                                                                            (a >>>
                                                                                                              15))) +
                                                                                                        ((((a =
                                                                                                          (n +
                                                                                                            (t ^
                                                                                                              (s &
                                                                                                                (i ^
                                                                                                                  t))) +
                                                                                                            r[15] +
                                                                                                            1236535329) &
                                                                                                          4294967295) <<
                                                                                                          22) &
                                                                                                          4294967295) |
                                                                                                          (a >>>
                                                                                                            10))) +
                                                                                                      ((((a =
                                                                                                        (t +
                                                                                                          (s ^
                                                                                                            (i &
                                                                                                              (n ^
                                                                                                                s))) +
                                                                                                          r[1] +
                                                                                                          4129170786) &
                                                                                                        4294967295) <<
                                                                                                        5) &
                                                                                                        4294967295) |
                                                                                                        (a >>>
                                                                                                          27))) +
                                                                                                    ((((a =
                                                                                                      (i +
                                                                                                        (n ^
                                                                                                          (s &
                                                                                                            (t ^
                                                                                                              n))) +
                                                                                                        r[6] +
                                                                                                        3225465664) &
                                                                                                      4294967295) <<
                                                                                                      9) &
                                                                                                      4294967295) |
                                                                                                      (a >>>
                                                                                                        23))) +
                                                                                                  ((((a =
                                                                                                    (s +
                                                                                                      (t ^
                                                                                                        (n &
                                                                                                          (i ^
                                                                                                            t))) +
                                                                                                      r[11] +
                                                                                                      643717713) &
                                                                                                    4294967295) <<
                                                                                                    14) &
                                                                                                    4294967295) |
                                                                                                    (a >>>
                                                                                                      18))) +
                                                                                                ((((a =
                                                                                                  (n +
                                                                                                    (i ^
                                                                                                      (t &
                                                                                                        (s ^
                                                                                                          i))) +
                                                                                                    r[0] +
                                                                                                    3921069994) &
                                                                                                  4294967295) <<
                                                                                                  20) &
                                                                                                  4294967295) |
                                                                                                  (a >>>
                                                                                                    12))) +
                                                                                              ((((a =
                                                                                                (t +
                                                                                                  (s ^
                                                                                                    (i &
                                                                                                      (n ^
                                                                                                        s))) +
                                                                                                  r[5] +
                                                                                                  3593408605) &
                                                                                                4294967295) <<
                                                                                                5) &
                                                                                                4294967295) |
                                                                                                (a >>>
                                                                                                  27))) +
                                                                                            ((((a =
                                                                                              (i +
                                                                                                (n ^
                                                                                                  (s &
                                                                                                    (t ^
                                                                                                      n))) +
                                                                                                r[10] +
                                                                                                38016083) &
                                                                                              4294967295) <<
                                                                                              9) &
                                                                                              4294967295) |
                                                                                              (a >>>
                                                                                                23))) +
                                                                                          ((((a =
                                                                                            (s +
                                                                                              (t ^
                                                                                                (n &
                                                                                                  (i ^
                                                                                                    t))) +
                                                                                              r[15] +
                                                                                              3634488961) &
                                                                                            4294967295) <<
                                                                                            14) &
                                                                                            4294967295) |
                                                                                            (a >>>
                                                                                              18))) +
                                                                                        ((((a =
                                                                                          (n +
                                                                                            (i ^
                                                                                              (t &
                                                                                                (s ^
                                                                                                  i))) +
                                                                                            r[4] +
                                                                                            3889429448) &
                                                                                          4294967295) <<
                                                                                          20) &
                                                                                          4294967295) |
                                                                                          (a >>>
                                                                                            12))) +
                                                                                      ((((a =
                                                                                        (t +
                                                                                          (s ^
                                                                                            (i &
                                                                                              (n ^
                                                                                                s))) +
                                                                                          r[9] +
                                                                                          568446438) &
                                                                                        4294967295) <<
                                                                                        5) &
                                                                                        4294967295) |
                                                                                        (a >>>
                                                                                          27))) +
                                                                                    ((((a =
                                                                                      (i +
                                                                                        (n ^
                                                                                          (s &
                                                                                            (t ^
                                                                                              n))) +
                                                                                        r[14] +
                                                                                        3275163606) &
                                                                                      4294967295) <<
                                                                                      9) &
                                                                                      4294967295) |
                                                                                      (a >>>
                                                                                        23))) +
                                                                                  ((((a =
                                                                                    (s +
                                                                                      (t ^
                                                                                        (n &
                                                                                          (i ^
                                                                                            t))) +
                                                                                      r[3] +
                                                                                      4107603335) &
                                                                                    4294967295) <<
                                                                                    14) &
                                                                                    4294967295) |
                                                                                    (a >>>
                                                                                      18))) +
                                                                                ((((a =
                                                                                  (n +
                                                                                    (i ^
                                                                                      (t &
                                                                                        (s ^
                                                                                          i))) +
                                                                                    r[8] +
                                                                                    1163531501) &
                                                                                  4294967295) <<
                                                                                  20) &
                                                                                  4294967295) |
                                                                                  (a >>>
                                                                                    12))) +
                                                                              ((((a =
                                                                                (t +
                                                                                  (s ^
                                                                                    (i &
                                                                                      (n ^
                                                                                        s))) +
                                                                                  r[13] +
                                                                                  2850285829) &
                                                                                4294967295) <<
                                                                                5) &
                                                                                4294967295) |
                                                                                (a >>>
                                                                                  27))) +
                                                                            ((((a =
                                                                              (i +
                                                                                (n ^
                                                                                  (s &
                                                                                    (t ^
                                                                                      n))) +
                                                                                r[2] +
                                                                                4243563512) &
                                                                              4294967295) <<
                                                                              9) &
                                                                              4294967295) |
                                                                              (a >>>
                                                                                23))) +
                                                                          ((((a =
                                                                            (s +
                                                                              (t ^
                                                                                (n &
                                                                                  (i ^
                                                                                    t))) +
                                                                              r[7] +
                                                                              1735328473) &
                                                                            4294967295) <<
                                                                            14) &
                                                                            4294967295) |
                                                                            (a >>>
                                                                              18))) +
                                                                        ((((a =
                                                                          (n +
                                                                            (i ^
                                                                              (t &
                                                                                (s ^
                                                                                  i))) +
                                                                            r[12] +
                                                                            2368359562) &
                                                                          4294967295) <<
                                                                          20) &
                                                                          4294967295) |
                                                                          (a >>>
                                                                            12))) +
                                                                      ((((a =
                                                                        (t +
                                                                          (n ^
                                                                            s ^
                                                                            i) +
                                                                          r[5] +
                                                                          4294588738) &
                                                                        4294967295) <<
                                                                        4) &
                                                                        4294967295) |
                                                                        (a >>>
                                                                          28))) +
                                                                    ((((a =
                                                                      (i +
                                                                        (t ^
                                                                          n ^
                                                                          s) +
                                                                        r[8] +
                                                                        2272392833) &
                                                                      4294967295) <<
                                                                      11) &
                                                                      4294967295) |
                                                                      (a >>>
                                                                        21))) +
                                                                  ((((a =
                                                                    (s +
                                                                      (i ^
                                                                        t ^
                                                                        n) +
                                                                      r[11] +
                                                                      1839030562) &
                                                                    4294967295) <<
                                                                    16) &
                                                                    4294967295) |
                                                                    (a >>>
                                                                      16))) +
                                                                ((((a =
                                                                  (n +
                                                                    (s ^
                                                                      i ^
                                                                      t) +
                                                                    r[14] +
                                                                    4259657740) &
                                                                  4294967295) <<
                                                                  23) &
                                                                  4294967295) |
                                                                  (a >>> 9))) +
                                                              ((((a =
                                                                (t +
                                                                  (n ^ s ^ i) +
                                                                  r[1] +
                                                                  2763975236) &
                                                                4294967295) <<
                                                                4) &
                                                                4294967295) |
                                                                (a >>> 28))) +
                                                            ((((a =
                                                              (i +
                                                                (t ^ n ^ s) +
                                                                r[4] +
                                                                1272893353) &
                                                              4294967295) <<
                                                              11) &
                                                              4294967295) |
                                                              (a >>> 21))) +
                                                          ((((a =
                                                            (s +
                                                              (i ^ t ^ n) +
                                                              r[7] +
                                                              4139469664) &
                                                            4294967295) <<
                                                            16) &
                                                            4294967295) |
                                                            (a >>> 16))) +
                                                        ((((a =
                                                          (n +
                                                            (s ^ i ^ t) +
                                                            r[10] +
                                                            3200236656) &
                                                          4294967295) <<
                                                          23) &
                                                          4294967295) |
                                                          (a >>> 9))) +
                                                      ((((a =
                                                        (t +
                                                          (n ^ s ^ i) +
                                                          r[13] +
                                                          681279174) &
                                                        4294967295) <<
                                                        4) &
                                                        4294967295) |
                                                        (a >>> 28))) +
                                                    ((((a =
                                                      (i +
                                                        (t ^ n ^ s) +
                                                        r[0] +
                                                        3936430074) &
                                                      4294967295) <<
                                                      11) &
                                                      4294967295) |
                                                      (a >>> 21))) +
                                                  ((((a =
                                                    (s +
                                                      (i ^ t ^ n) +
                                                      r[3] +
                                                      3572445317) &
                                                    4294967295) <<
                                                    16) &
                                                    4294967295) |
                                                    (a >>> 16))) +
                                                ((((a =
                                                  (n +
                                                    (s ^ i ^ t) +
                                                    r[6] +
                                                    76029189) &
                                                  4294967295) <<
                                                  23) &
                                                  4294967295) |
                                                  (a >>> 9))) +
                                              ((((a =
                                                (t +
                                                  (n ^ s ^ i) +
                                                  r[9] +
                                                  3654602809) &
                                                4294967295) <<
                                                4) &
                                                4294967295) |
                                                (a >>> 28))) +
                                            ((((a =
                                              (i +
                                                (t ^ n ^ s) +
                                                r[12] +
                                                3873151461) &
                                              4294967295) <<
                                              11) &
                                              4294967295) |
                                              (a >>> 21))) +
                                          ((((a =
                                            (s +
                                              (i ^ t ^ n) +
                                              r[15] +
                                              530742520) &
                                            4294967295) <<
                                            16) &
                                            4294967295) |
                                            (a >>> 16))) +
                                        ((((a =
                                          (n +
                                            (s ^ i ^ t) +
                                            r[2] +
                                            3299628645) &
                                          4294967295) <<
                                          23) &
                                          4294967295) |
                                          (a >>> 9))) +
                                      ((((a =
                                        (t +
                                          (s ^ (n | ~i)) +
                                          r[0] +
                                          4096336452) &
                                        4294967295) <<
                                        6) &
                                        4294967295) |
                                        (a >>> 26))) +
                                    ((((a =
                                      (i + (n ^ (t | ~s)) + r[7] + 1126891415) &
                                      4294967295) <<
                                      10) &
                                      4294967295) |
                                      (a >>> 22))) +
                                  ((((a =
                                    (s + (t ^ (i | ~n)) + r[14] + 2878612391) &
                                    4294967295) <<
                                    15) &
                                    4294967295) |
                                    (a >>> 17))) +
                                ((((a =
                                  (n + (i ^ (s | ~t)) + r[5] + 4237533241) &
                                  4294967295) <<
                                  21) &
                                  4294967295) |
                                  (a >>> 11))) +
                              ((((a =
                                (t + (s ^ (n | ~i)) + r[12] + 1700485571) &
                                4294967295) <<
                                6) &
                                4294967295) |
                                (a >>> 26))) +
                            ((((a =
                              (i + (n ^ (t | ~s)) + r[3] + 2399980690) &
                              4294967295) <<
                              10) &
                              4294967295) |
                              (a >>> 22))) +
                          ((((a =
                            (s + (t ^ (i | ~n)) + r[10] + 4293915773) &
                            4294967295) <<
                            15) &
                            4294967295) |
                            (a >>> 17))) +
                        ((((a =
                          (n + (i ^ (s | ~t)) + r[1] + 2240044497) &
                          4294967295) <<
                          21) &
                          4294967295) |
                          (a >>> 11))) +
                      ((((a =
                        (t + (s ^ (n | ~i)) + r[8] + 1873313359) &
                        4294967295) <<
                        6) &
                        4294967295) |
                        (a >>> 26))) +
                    ((((a =
                      (i + (n ^ (t | ~s)) + r[15] + 4264355552) & 4294967295) <<
                      10) &
                      4294967295) |
                      (a >>> 22))) +
                  ((((a =
                    (s + (t ^ (i | ~n)) + r[6] + 2734768916) & 4294967295) <<
                    15) &
                    4294967295) |
                    (a >>> 17))) +
                ((((a =
                  (n + (i ^ (s | ~t)) + r[13] + 1309151649) & 4294967295) <<
                  21) &
                  4294967295) |
                  (a >>> 11))) +
                ((i =
                  (t =
                    n +
                    ((((a =
                      (t + (s ^ (n | ~i)) + r[4] + 4149444226) & 4294967295) <<
                      6) &
                      4294967295) |
                      (a >>> 26))) +
                  ((((a =
                    (i + (n ^ (t | ~s)) + r[11] + 3174756917) & 4294967295) <<
                    10) &
                    4294967295) |
                    (a >>> 22))) ^
                  ((s =
                    i +
                    ((((a =
                      (s + (t ^ (i | ~n)) + r[2] + 718787259) & 4294967295) <<
                      15) &
                      4294967295) |
                      (a >>> 17))) |
                    ~t)) +
                r[9] +
                3951481745) &
              4294967295;
          (e.g[0] = (e.g[0] + t) & 4294967295),
            (e.g[1] =
              (e.g[1] + (s + (((a << 21) & 4294967295) | (a >>> 11)))) &
              4294967295),
            (e.g[2] = (e.g[2] + s) & 4294967295),
            (e.g[3] = (e.g[3] + i) & 4294967295);
        }
        function h(e, t) {
          this.h = t;
          for (var n = [], r = !0, s = e.length - 1; 0 <= s; s--) {
            var i = 0 | e[s];
            (r && i == t) || ((n[s] = i), (r = !1));
          }
          this.g = n;
        }
        (e = t),
          (n.prototype = (i = function () {
            this.blockSize = -1;
          }).prototype),
          (e.D = i.prototype),
          (e.prototype = new n()),
          ((e.prototype.constructor = e).C = function (e, t, n) {
            for (
              var r = Array(arguments.length - 2), s = 2;
              s < arguments.length;
              s++
            )
              r[s - 2] = arguments[s];
            return i.prototype[t].apply(e, r);
          }),
          (t.prototype.s = function () {
            (this.g[0] = 1732584193),
              (this.g[1] = 4023233417),
              (this.g[2] = 2562383102),
              (this.g[3] = 271733878),
              (this.o = this.h = 0);
          }),
          (t.prototype.u = function (e, t) {
            for (
              var n = (t = void 0 === t ? e.length : t) - this.blockSize,
                r = this.B,
                s = this.h,
                i = 0;
              i < t;

            ) {
              if (0 == s) for (; i <= n; ) a(this, e, i), (i += this.blockSize);
              if ("string" == typeof e) {
                for (; i < t; )
                  if (((r[s++] = e.charCodeAt(i++)), s == this.blockSize)) {
                    a(this, r), (s = 0);
                    break;
                  }
              } else
                for (; i < t; )
                  if (((r[s++] = e[i++]), s == this.blockSize)) {
                    a(this, r), (s = 0);
                    break;
                  }
            }
            (this.h = s), (this.o += t);
          }),
          (t.prototype.v = function () {
            var e = Array(
              (this.h < 56 ? this.blockSize : 2 * this.blockSize) - this.h
            );
            e[0] = 128;
            for (var t = 1; t < e.length - 8; ++t) e[t] = 0;
            for (var n = 8 * this.o, t = e.length - 8; t < e.length; ++t)
              (e[t] = 255 & n), (n /= 256);
            for (this.u(e), e = Array(16), t = n = 0; t < 4; ++t)
              for (var r = 0; r < 32; r += 8) e[n++] = (this.g[t] >>> r) & 255;
            return e;
          });
        var s = {};
        function r(e) {
          return -128 <= e && e < 128
            ? ((t = e),
              (n = function (e) {
                return new h([0 | e], e < 0 ? -1 : 0);
              }),
              (r = s),
              Object.prototype.hasOwnProperty.call(r, t) ? r[t] : (r[t] = n(t)))
            : new h([0 | e], e < 0 ? -1 : 0);
          var t, n, r;
        }
        function c(e) {
          if (isNaN(e) || !isFinite(e)) return l;
          if (e < 0) return m(c(-e));
          for (var t = [], n = 1, r = 0; n <= e; r++)
            (t[r] = (e / n) | 0), (n *= 4294967296);
          return new h(t, 0);
        }
        var l = r(0),
          o = r(1),
          d = r(16777216);
        function f(e) {
          if (0 == e.h) {
            for (var t = 0; t < e.g.length; t++) if (0 != e.g[t]) return;
            return 1;
          }
        }
        function g(e) {
          return -1 == e.h;
        }
        function m(e) {
          for (var t = e.g.length, n = [], r = 0; r < t; r++) n[r] = ~e.g[r];
          return new h(n, ~e.h).add(o);
        }
        function u(e, t) {
          return e.add(m(t));
        }
        function p(e, t) {
          for (; (65535 & e[t]) != e[t]; )
            (e[t + 1] += e[t] >>> 16), (e[t] &= 65535), t++;
        }
        function y(e, t) {
          (this.g = e), (this.h = t);
        }
        function v(e, t) {
          if (f(t)) throw Error("division by zero");
          if (f(e)) return new y(l, l);
          if (g(e)) return (t = v(m(e), t)), new y(m(t.g), m(t.h));
          if (g(t)) return (t = v(e, m(t))), new y(m(t.g), t.h);
          if (30 < e.g.length) {
            if (g(e) || g(t))
              throw Error("slowDivide_ only works with positive integers.");
            for (var n = o, r = t; r.l(e) <= 0; ) (n = w(n)), (r = w(r));
            for (
              var s = _(n, 1), i = _(r, 1), r = _(r, 2), n = _(n, 2);
              !f(r);

            ) {
              var a = i.add(r);
              a.l(e) <= 0 && ((s = s.add(n)), (i = a)),
                (r = _(r, 1)),
                (n = _(n, 1));
            }
            return (t = u(e, s.j(t))), new y(s, t);
          }
          for (s = l; 0 <= e.l(t); ) {
            for (
              n = Math.max(1, Math.floor(e.m() / t.m())),
                r =
                  (r = Math.ceil(Math.log(n) / Math.LN2)) <= 48
                    ? 1
                    : Math.pow(2, r - 48),
                a = (i = c(n)).j(t);
              g(a) || 0 < a.l(e);

            )
              a = (i = c((n -= r))).j(t);
            f(i) && (i = o), (s = s.add(i)), (e = u(e, a));
          }
          return new y(s, e);
        }
        function w(e) {
          for (var t = e.g.length + 1, n = [], r = 0; r < t; r++)
            n[r] = (e.i(r) << 1) | (e.i(r - 1) >>> 31);
          return new h(n, e.h);
        }
        function _(e, t) {
          var n = t >> 5;
          t %= 32;
          for (var r = e.g.length - n, s = [], i = 0; i < r; i++)
            s[i] =
              0 < t
                ? (e.i(i + n) >>> t) | (e.i(i + n + 1) << (32 - t))
                : e.i(i + n);
          return new h(s, e.h);
        }
        ((e = h.prototype).m = function () {
          if (g(this)) return -m(this).m();
          for (var e = 0, t = 1, n = 0; n < this.g.length; n++) {
            var r = this.i(n);
            (e += (0 <= r ? r : 4294967296 + r) * t), (t *= 4294967296);
          }
          return e;
        }),
          (e.toString = function (e) {
            if ((e = e || 10) < 2 || 36 < e)
              throw Error("radix out of range: " + e);
            if (f(this)) return "0";
            if (g(this)) return "-" + m(this).toString(e);
            for (var t = c(Math.pow(e, 6)), n = this, r = ""; ; ) {
              var s = v(n, t).g,
                i = (
                  (0 < (n = u(n, s.j(t))).g.length ? n.g[0] : n.h) >>> 0
                ).toString(e);
              if (f((n = s))) return i + r;
              for (; i.length < 6; ) i = "0" + i;
              r = i + r;
            }
          }),
          (e.i = function (e) {
            return e < 0 ? 0 : e < this.g.length ? this.g[e] : this.h;
          }),
          (e.l = function (e) {
            return g((e = u(this, e))) ? -1 : f(e) ? 0 : 1;
          }),
          (e.abs = function () {
            return g(this) ? m(this) : this;
          }),
          (e.add = function (e) {
            for (
              var t = Math.max(this.g.length, e.g.length), n = [], r = 0, s = 0;
              s <= t;
              s++
            ) {
              var i = r + (65535 & this.i(s)) + (65535 & e.i(s)),
                a = (i >>> 16) + (this.i(s) >>> 16) + (e.i(s) >>> 16),
                r = a >>> 16;
              (i &= 65535), (a &= 65535), (n[s] = (a << 16) | i);
            }
            return new h(n, -2147483648 & n[n.length - 1] ? -1 : 0);
          }),
          (e.j = function (e) {
            if (f(this) || f(e)) return l;
            if (g(this)) return g(e) ? m(this).j(m(e)) : m(m(this).j(e));
            if (g(e)) return m(this.j(m(e)));
            if (this.l(d) < 0 && e.l(d) < 0) return c(this.m() * e.m());
            for (
              var t = this.g.length + e.g.length, n = [], r = 0;
              r < 2 * t;
              r++
            )
              n[r] = 0;
            for (r = 0; r < this.g.length; r++)
              for (var s = 0; s < e.g.length; s++) {
                var i = this.i(r) >>> 16,
                  a = 65535 & this.i(r),
                  o = e.i(s) >>> 16,
                  u = 65535 & e.i(s);
                (n[2 * r + 2 * s] += a * u),
                  p(n, 2 * r + 2 * s),
                  (n[2 * r + 2 * s + 1] += i * u),
                  p(n, 2 * r + 2 * s + 1),
                  (n[2 * r + 2 * s + 1] += a * o),
                  p(n, 2 * r + 2 * s + 1),
                  (n[2 * r + 2 * s + 2] += i * o),
                  p(n, 2 * r + 2 * s + 2);
              }
            for (r = 0; r < t; r++) n[r] = (n[2 * r + 1] << 16) | n[2 * r];
            for (r = t; r < 2 * t; r++) n[r] = 0;
            return new h(n, 0);
          }),
          (e.A = function (e) {
            return v(this, e).h;
          }),
          (e.and = function (e) {
            for (
              var t = Math.max(this.g.length, e.g.length), n = [], r = 0;
              r < t;
              r++
            )
              n[r] = this.i(r) & e.i(r);
            return new h(n, this.h & e.h);
          }),
          (e.or = function (e) {
            for (
              var t = Math.max(this.g.length, e.g.length), n = [], r = 0;
              r < t;
              r++
            )
              n[r] = this.i(r) | e.i(r);
            return new h(n, this.h | e.h);
          }),
          (e.xor = function (e) {
            for (
              var t = Math.max(this.g.length, e.g.length), n = [], r = 0;
              r < t;
              r++
            )
              n[r] = this.i(r) ^ e.i(r);
            return new h(n, this.h ^ e.h);
          }),
          (t.prototype.digest = t.prototype.v),
          (t.prototype.reset = t.prototype.s),
          (t.prototype.update = t.prototype.u),
          (ne = t),
          (h.prototype.multiply = h.prototype.j),
          (h.prototype.modulo = h.prototype.A),
          (h.prototype.compare = h.prototype.l),
          (h.prototype.toNumber = h.prototype.m),
          (h.prototype.getBits = h.prototype.i),
          (h.fromNumber = c),
          (h.fromString = function e(t, n) {
            if (0 == t.length) throw Error("number format error: empty string");
            if ((n = n || 10) < 2 || 36 < n)
              throw Error("radix out of range: " + n);
            if ("-" == t.charAt(0)) return m(e(t.substring(1), n));
            if (0 <= t.indexOf("-"))
              throw Error('number format error: interior "-" character');
            for (var r = c(Math.pow(n, 8)), s = l, i = 0; i < t.length; i += 8)
              var a = Math.min(8, t.length - i),
                o = parseInt(t.substring(i, i + a), n),
                s =
                  a < 8
                    ? ((a = c(Math.pow(n, a))), s.j(a).add(c(o)))
                    : (s = s.j(r)).add(c(o));
            return s;
          }),
          (te = h);
      }.apply(
        void 0 !== re
          ? re
          : "undefined" != typeof self
          ? self
          : "undefined" != typeof window
          ? window
          : {}
      );
      var pn,
        yn,
        vn,
        wn,
        _n,
        bn,
        In,
        Tn,
        g,
        se,
        En =
          "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof window
            ? window
            : "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : {},
        ie =
          (!function () {
            var e,
              N =
                "function" == typeof Object.defineProperties
                  ? Object.defineProperty
                  : function (e, t, n) {
                      return (
                        e != Array.prototype &&
                          e != Object.prototype &&
                          (e[t] = n.value),
                        e
                      );
                    },
              F = (function (e) {
                e = [
                  "object" == typeof globalThis && globalThis,
                  e,
                  "object" == typeof window && window,
                  "object" == typeof self && self,
                  "object" == typeof En && En,
                ];
                for (var t = 0; t < e.length; ++t) {
                  var n = e[t];
                  if (n && n.Math == Math) return n;
                }
                throw Error("Cannot find global object");
              })(this),
              t = "Array.prototype.values",
              P = function (e) {
                return (
                  e ||
                  function () {
                    return (
                      (t = this) instanceof String && (t += ""),
                      (n = 0),
                      (r = !1),
                      ((e = {
                        next: function () {
                          var e;
                          return !r && n < t.length
                            ? ((e = n++), { value: t[e], done: !1 })
                            : { done: (r = !0), value: void 0 };
                        },
                      })[Symbol.iterator] = function () {
                        return e;
                      }),
                      e
                    );
                    var t, n, r, e;
                  }
                );
              };
            e: {
              var n = F;
              t = t.split(".");
              for (var r = 0; r < t.length - 1; r++) {
                var U = t[r];
                if (!(U in n)) break e;
                n = n[U];
              }
              (P = P((r = n[(t = t[t.length - 1])]))) != r &&
                null != P &&
                N(n, t, { configurable: !0, writable: !0, value: P });
            }
            var B = B || {},
              k = this || self;
            function q(e) {
              var t = typeof e;
              return (
                "array" ==
                  (t =
                    "object" != t
                      ? t
                      : e
                      ? Array.isArray(e)
                        ? "array"
                        : t
                      : "null") ||
                ("object" == t && "number" == typeof e.length)
              );
            }
            function f(e) {
              var t = typeof e;
              return ("object" == t && null != e) || "function" == t;
            }
            function j(e, t, n) {
              return e.call.apply(e.bind, arguments);
            }
            function G(t, n, e) {
              if (t)
                return 2 < arguments.length
                  ? ((r = Array.prototype.slice.call(arguments, 2)),
                    function () {
                      var e = Array.prototype.slice.call(arguments);
                      return Array.prototype.unshift.apply(e, r), t.apply(n, e);
                    })
                  : function () {
                      return t.apply(n, arguments);
                    };
              var r;
              throw Error();
            }
            function p(e, t, n) {
              return (p =
                Function.prototype.bind &&
                -1 != Function.prototype.bind.toString().indexOf("native code")
                  ? j
                  : G).apply(null, arguments);
            }
            function z(t) {
              var n = Array.prototype.slice.call(arguments, 1);
              return function () {
                var e = n.slice();
                return e.push.apply(e, arguments), t.apply(this, e);
              };
            }
            function s(e, i) {
              function t() {}
              (t.prototype = i.prototype),
                (e.aa = i.prototype),
                (e.prototype = new t()),
                ((e.prototype.constructor = e).Qb = function (e, t, n) {
                  for (
                    var r = Array(arguments.length - 2), s = 2;
                    s < arguments.length;
                    s++
                  )
                    r[s - 2] = arguments[s];
                  return i.prototype[t].apply(e, r);
                });
            }
            function K(t) {
              var n = t.length;
              if (0 < n) {
                const r = Array(n);
                for (let e = 0; e < n; e++) r[e] = t[e];
                return r;
              }
              return [];
            }
            function Q(t) {
              for (let e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                if (q(n)) {
                  var r = t.length || 0,
                    s = n.length || 0;
                  t.length = r + s;
                  for (let e = 0; e < s; e++) t[r + e] = n[e];
                } else t.push(n);
              }
            }
            function R(e) {
              return /^[\s\xa0]*$/.test(e);
            }
            function i() {
              var e = k.navigator;
              return (e = e && e.userAgent) ? e : "";
            }
            function $(e) {
              return $[" "](e), e;
            }
            $[" "] = function () {};
            var H = !(
              -1 == i().indexOf("Gecko") ||
              (-1 != i().toLowerCase().indexOf("webkit") &&
                -1 == i().indexOf("Edge")) ||
              -1 != i().indexOf("Trident") ||
              -1 != i().indexOf("MSIE") ||
              -1 != i().indexOf("Edge")
            );
            function W(e, t, n) {
              for (const r in e) t.call(n, e[r], r, e);
            }
            function J(e) {
              const t = {};
              for (const n in e) t[n] = e[n];
              return t;
            }
            const Y =
              "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
                " "
              );
            function X(t) {
              let n, r;
              for (let e = 1; e < arguments.length; e++) {
                for (n in (r = arguments[e])) t[n] = r[n];
                for (let e = 0; e < Y.length; e++)
                  (n = Y[e]),
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
              }
            }
            var Z = new (class {
              constructor(e, t) {
                (this.i = e), (this.j = t), (this.h = 0), (this.g = null);
              }
              get() {
                let e;
                return (
                  0 < this.h
                    ? (this.h--,
                      (e = this.g),
                      (this.g = e.next),
                      (e.next = null))
                    : (e = this.i()),
                  e
                );
              }
            })(
              () => new ee(),
              (e) => e.reset()
            );
            class ee {
              constructor() {
                this.next = this.g = this.h = null;
              }
              set(e, t) {
                (this.h = e), (this.g = t), (this.next = null);
              }
              reset() {
                this.next = this.g = this.h = null;
              }
            }
            let a,
              o = !1,
              te = new (class {
                constructor() {
                  this.h = this.g = null;
                }
                add(e, t) {
                  const n = Z.get();
                  n.set(e, t),
                    this.h ? (this.h.next = n) : (this.g = n),
                    (this.h = n);
                }
              })(),
              ne = () => {
                const e = k.Promise.resolve(void 0);
                a = () => {
                  e.then(re);
                };
              };
            var re = () => {
              for (
                var e;
                (e = (function () {
                  var e = te;
                  let t = null;
                  return (
                    e.g &&
                      ((t = e.g),
                      (e.g = e.g.next),
                      e.g || (e.h = null),
                      (t.next = null)),
                    t
                  );
                })());

              ) {
                try {
                  e.h.call(e.g);
                } catch (e) {
                  !(function (e) {
                    k.setTimeout(() => {
                      throw e;
                    }, 0);
                  })(e);
                }
                var t = Z;
                t.j(e), t.h < 100 && (t.h++, (e.next = t.g), (t.g = e));
              }
              o = !1;
            };
            function u() {
              (this.s = this.s), (this.C = this.C);
            }
            function h(e, t) {
              (this.type = e),
                (this.g = this.target = t),
                (this.defaultPrevented = !1);
            }
            (u.prototype.s = !1),
              (u.prototype.ma = function () {
                this.s || ((this.s = !0), this.N());
              }),
              (u.prototype.N = function () {
                if (this.C) for (; this.C.length; ) this.C.shift()();
              }),
              (h.prototype.h = function () {
                this.defaultPrevented = !0;
              });
            var se = (function () {
              if (!k.addEventListener || !Object.defineProperty) return !1;
              var e = !1,
                t = Object.defineProperty({}, "passive", {
                  get: function () {
                    e = !0;
                  },
                });
              try {
                var n = () => {};
                k.addEventListener("test", n, t),
                  k.removeEventListener("test", n, t);
              } catch (e) {}
              return e;
            })();
            function c(e, t) {
              if (
                (h.call(this, e ? e.type : ""),
                (this.relatedTarget = this.g = this.target = null),
                (this.button =
                  this.screenY =
                  this.screenX =
                  this.clientY =
                  this.clientX =
                    0),
                (this.key = ""),
                (this.metaKey =
                  this.shiftKey =
                  this.altKey =
                  this.ctrlKey =
                    !1),
                (this.state = null),
                (this.pointerId = 0),
                (this.pointerType = ""),
                (this.i = null),
                e)
              ) {
                var n = (this.type = e.type),
                  r =
                    e.changedTouches && e.changedTouches.length
                      ? e.changedTouches[0]
                      : null;
                if (
                  ((this.target = e.target || e.srcElement),
                  (this.g = t),
                  (t = e.relatedTarget))
                ) {
                  if (H) {
                    e: {
                      try {
                        $(t.nodeName);
                        var s = !0;
                        break e;
                      } catch (e) {}
                      s = !1;
                    }
                    s || (t = null);
                  }
                } else
                  "mouseover" == n
                    ? (t = e.fromElement)
                    : "mouseout" == n && (t = e.toElement);
                (this.relatedTarget = t),
                  r
                    ? ((this.clientX =
                        void 0 !== r.clientX ? r.clientX : r.pageX),
                      (this.clientY =
                        void 0 !== r.clientY ? r.clientY : r.pageY),
                      (this.screenX = r.screenX || 0),
                      (this.screenY = r.screenY || 0))
                    : ((this.clientX =
                        void 0 !== e.clientX ? e.clientX : e.pageX),
                      (this.clientY =
                        void 0 !== e.clientY ? e.clientY : e.pageY),
                      (this.screenX = e.screenX || 0),
                      (this.screenY = e.screenY || 0)),
                  (this.button = e.button),
                  (this.key = e.key || ""),
                  (this.ctrlKey = e.ctrlKey),
                  (this.altKey = e.altKey),
                  (this.shiftKey = e.shiftKey),
                  (this.metaKey = e.metaKey),
                  (this.pointerId = e.pointerId || 0),
                  (this.pointerType =
                    "string" == typeof e.pointerType
                      ? e.pointerType
                      : ie[e.pointerType] || ""),
                  (this.state = e.state),
                  (this.i = e).defaultPrevented && c.aa.h.call(this);
              }
            }
            s(c, h);
            var ie = { 2: "touch", 3: "pen", 4: "mouse" },
              g =
                ((c.prototype.h = function () {
                  c.aa.h.call(this);
                  var e = this.i;
                  e.preventDefault ? e.preventDefault() : (e.returnValue = !1);
                }),
                "closure_listenable_" + ((1e6 * Math.random()) | 0)),
              ae = 0;
            function oe(e, t, n, r, s) {
              (this.listener = e),
                (this.proxy = null),
                (this.src = t),
                (this.type = n),
                (this.capture = !!r),
                (this.ha = s),
                (this.key = ++ae),
                (this.da = this.fa = !1);
            }
            function ue(e) {
              (e.da = !0),
                (e.listener = null),
                (e.proxy = null),
                (e.src = null),
                (e.ha = null);
            }
            function he(e) {
              (this.src = e), (this.g = {}), (this.h = 0);
            }
            function ce(e, t) {
              var n,
                r,
                s,
                i = t.type;
              i in e.g &&
                ((n = e.g[i]),
                (s = 0 <= (r = Array.prototype.indexOf.call(n, t, void 0))) &&
                  Array.prototype.splice.call(n, r, 1),
                s && (ue(t), 0 == e.g[i].length && (delete e.g[i], e.h--)));
            }
            function le(e, t, n, r) {
              for (var s = 0; s < e.length; ++s) {
                var i = e[s];
                if (!i.da && i.listener == t && i.capture == !!n && i.ha == r)
                  return s;
              }
              return -1;
            }
            he.prototype.add = function (e, t, n, r, s) {
              var i = e.toString(),
                a =
                  ((e = this.g[i]) || ((e = this.g[i] = []), this.h++),
                  le(e, t, r, s));
              return (
                -1 < a
                  ? ((t = e[a]), n || (t.fa = !1))
                  : (((t = new oe(t, this.src, i, !!r, s)).fa = n), e.push(t)),
                t
              );
            };
            var de = "closure_lm_" + ((1e6 * Math.random()) | 0),
              fe = {};
            function ge(e, t, n, r, s, i) {
              if (!t) throw Error("Invalid event type");
              var a = f(s) ? !!s.capture : !!s,
                o = ve(e);
              if (
                (o || (e[de] = o = new he(e)), (n = o.add(t, n, r, a, i)).proxy)
              )
                return n;
              if (
                ((r = (function () {
                  const n = ye;
                  return function e(t) {
                    return n.call(e.src, e.listener, t);
                  };
                })()),
                ((n.proxy = r).src = e),
                (r.listener = n),
                e.addEventListener)
              )
                void 0 === (s = se ? s : a) && (s = !1),
                  e.addEventListener(t.toString(), r, s);
              else if (e.attachEvent) e.attachEvent(pe(t.toString()), r);
              else {
                if (!e.addListener || !e.removeListener)
                  throw Error(
                    "addEventListener and attachEvent are unavailable."
                  );
                e.addListener(r);
              }
              return n;
            }
            function me(e) {
              var t, n, r;
              "number" != typeof e &&
                e &&
                !e.da &&
                ((t = e.src) && t[g]
                  ? ce(t.i, e)
                  : ((n = e.type),
                    (r = e.proxy),
                    t.removeEventListener
                      ? t.removeEventListener(n, r, e.capture)
                      : t.detachEvent
                      ? t.detachEvent(pe(n), r)
                      : t.addListener &&
                        t.removeListener &&
                        t.removeListener(r),
                    (n = ve(t))
                      ? (ce(n, e), 0 == n.h && ((n.src = null), (t[de] = null)))
                      : ue(e)));
            }
            function pe(e) {
              return e in fe ? fe[e] : (fe[e] = "on" + e);
            }
            function ye(e, t) {
              var n, r;
              return (
                !!e.da ||
                ((t = new c(t, this)),
                (n = e.listener),
                (r = e.ha || e.src),
                e.fa && me(e),
                n.call(r, t))
              );
            }
            function ve(e) {
              return (e = e[de]) instanceof he ? e : null;
            }
            var we = "__closure_events_fn_" + ((1e9 * Math.random()) >>> 0);
            function _e(t) {
              return "function" == typeof t
                ? t
                : (t[we] ||
                    (t[we] = function (e) {
                      return t.handleEvent(e);
                    }),
                  t[we]);
            }
            function l() {
              u.call(this), (this.i = new he(this)), ((this.M = this).F = null);
            }
            function d(e, t) {
              var n,
                r = e.F;
              if (r) for (n = []; r; r = r.F) n.push(r);
              if (
                ((e = e.M),
                (r = t.type || t),
                "string" == typeof t
                  ? (t = new h(t, e))
                  : t instanceof h
                  ? (t.target = t.target || e)
                  : ((a = t), X((t = new h(r, e)), a)),
                (a = !0),
                n)
              )
                for (var s = n.length - 1; 0 <= s; s--)
                  var i = (t.g = n[s]), a = be(i, r, !0, t) && a;
              if (
                ((a = be((i = t.g = e), r, !0, t) && a),
                (a = be(i, r, !1, t) && a),
                n)
              )
                for (s = 0; s < n.length; s++)
                  a = be((i = t.g = n[s]), r, !1, t) && a;
            }
            function be(e, t, n, r) {
              if (!(t = e.i.g[String(t)])) return !0;
              t = t.concat();
              for (var s = !0, i = 0; i < t.length; ++i) {
                var a,
                  o,
                  u = t[i];
                u &&
                  !u.da &&
                  u.capture == n &&
                  ((a = u.listener),
                  (o = u.ha || u.src),
                  u.fa && ce(e.i, u),
                  (s = !1 !== a.call(o, r) && s));
              }
              return s && !r.defaultPrevented;
            }
            function Ie(e, t, n) {
              if ("function" == typeof e) n && (e = p(e, n));
              else {
                if (!e || "function" != typeof e.handleEvent)
                  throw Error("Invalid listener argument");
                e = p(e.handleEvent, e);
              }
              return 2147483647 < Number(t) ? -1 : k.setTimeout(e, t || 0);
            }
            s(l, u),
              (l.prototype[g] = !0),
              (l.prototype.removeEventListener = function (e, t, n, r) {
                !(function e(t, n, r, s, i) {
                  if (Array.isArray(n))
                    for (var a = 0; a < n.length; a++) e(t, n[a], r, s, i);
                  else
                    (s = f(s) ? !!s.capture : !!s),
                      (r = _e(r)),
                      t && t[g]
                        ? ((t = t.i),
                          (n = String(n).toString()) in t.g &&
                            -1 < (r = le((a = t.g[n]), r, s, i)) &&
                            (ue(a[r]),
                            Array.prototype.splice.call(a, r, 1),
                            0 == a.length && (delete t.g[n], t.h--)))
                        : (t = t && ve(t)) &&
                          ((n = t.g[n.toString()]),
                          (r =
                            (t = -1) < (t = n ? le(n, r, s, i) : t)
                              ? n[t]
                              : null) && me(r));
                })(this, e, t, n, r);
              }),
              (l.prototype.N = function () {
                if ((l.aa.N.call(this), this.i)) {
                  var e,
                    t = this.i;
                  for (e in t.g) {
                    for (var n = t.g[e], r = 0; r < n.length; r++) ue(n[r]);
                    delete t.g[e], t.h--;
                  }
                }
                this.F = null;
              }),
              (l.prototype.K = function (e, t, n, r) {
                return this.i.add(String(e), t, !1, n, r);
              }),
              (l.prototype.L = function (e, t, n, r) {
                return this.i.add(String(e), t, !0, n, r);
              });
            class Te extends u {
              constructor(e, t) {
                super(),
                  (this.m = e),
                  (this.l = t),
                  (this.h = null),
                  (this.i = !1),
                  (this.g = null);
              }
              j(e) {
                (this.h = arguments),
                  this.g
                    ? (this.i = !0)
                    : (function e(t) {
                        t.g = Ie(() => {
                          (t.g = null), t.i && ((t.i = !1), e(t));
                        }, t.l);
                        var n = t.h;
                        (t.h = null), t.m.apply(null, n);
                      })(this);
              }
              N() {
                super.N(),
                  this.g &&
                    (k.clearTimeout(this.g),
                    (this.g = null),
                    (this.i = !1),
                    (this.h = null));
              }
            }
            function m(e) {
              u.call(this), (this.h = e), (this.g = {});
            }
            s(m, u);
            var Ee = [];
            function Se(e) {
              W(
                e.g,
                function (e, t) {
                  this.g.hasOwnProperty(t) && me(e);
                },
                e
              ),
                (e.g = {});
            }
            (m.prototype.N = function () {
              m.aa.N.call(this), Se(this);
            }),
              (m.prototype.handleEvent = function () {
                throw Error("EventHandler.handleEvent not implemented");
              });
            var xe = k.JSON.stringify,
              De = k.JSON.parse,
              Ae = class {
                stringify(e) {
                  return k.JSON.stringify(e, void 0);
                }
                parse(e) {
                  return k.JSON.parse(e, void 0);
                }
              };
            function Ce() {}
            function Ne(e) {
              return e.h || (e.h = e.i());
            }
            function ke() {}
            Ce.prototype.h = null;
            var Re = { OPEN: "a", kb: "b", Ja: "c", wb: "d" };
            function Le() {
              h.call(this, "d");
            }
            function Oe() {
              h.call(this, "c");
            }
            s(Le, h), s(Oe, h);
            var y = {},
              Me = null;
            function Ve() {
              return (Me = Me || new l());
            }
            function Fe(e) {
              h.call(this, y.La, e);
            }
            function Pe() {
              var e = Ve();
              d(e, new Fe(e));
            }
            function Ue(e, t) {
              h.call(this, y.STAT_EVENT, e), (this.stat = t);
            }
            function L(e) {
              var t = Ve();
              d(t, new Ue(t, e));
            }
            function Be(e, t) {
              h.call(this, y.Ma, e), (this.size = t);
            }
            function v(e, t) {
              if ("function" != typeof e)
                throw Error("Fn must not be null and must be a function");
              return k.setTimeout(function () {
                e();
              }, t);
            }
            function qe() {
              this.g = !0;
            }
            function O(e, t, n, r) {
              e.info(function () {
                return (
                  "XMLHTTP TEXT (" +
                  t +
                  "): " +
                  (function (e, t) {
                    if (!e.g) return t;
                    if (!t) return null;
                    try {
                      var n = JSON.parse(t);
                      if (n)
                        for (e = 0; e < n.length; e++)
                          if (Array.isArray(n[e])) {
                            var r = n[e];
                            if (!(r.length < 2)) {
                              var s = r[1];
                              if (Array.isArray(s) && !(s.length < 1)) {
                                var i = s[0];
                                if ("noop" != i && "stop" != i && "close" != i)
                                  for (var a = 1; a < s.length; a++) s[a] = "";
                              }
                            }
                          }
                      return xe(n);
                    } catch (e) {
                      return t;
                    }
                  })(e, n) +
                  (r ? " " + r : "")
                );
              });
            }
            (y.La = "serverreachability"),
              s(Fe, h),
              (y.STAT_EVENT = "statevent"),
              s(Ue, h),
              (y.Ma = "timingevent"),
              s(Be, h),
              (qe.prototype.xa = function () {
                this.g = !1;
              }),
              (qe.prototype.info = function () {});
            var je = {
                NO_ERROR: 0,
                gb: 1,
                tb: 2,
                sb: 3,
                nb: 4,
                rb: 5,
                ub: 6,
                Ia: 7,
                TIMEOUT: 8,
                xb: 9,
              },
              Ge = {
                lb: "complete",
                Hb: "success",
                Ja: "error",
                Ia: "abort",
                zb: "ready",
                Ab: "readystatechange",
                TIMEOUT: "timeout",
                vb: "incrementaldata",
                yb: "progress",
                ob: "downloadprogress",
                Pb: "uploadprogress",
              };
            function ze() {}
            function w(e, t, n, r) {
              (this.j = e),
                (this.i = t),
                (this.l = n),
                (this.R = r || 1),
                (this.U = new m(this)),
                (this.I = 45e3),
                (this.H = null),
                (this.o = !1),
                (this.m =
                  this.A =
                  this.v =
                  this.L =
                  this.F =
                  this.S =
                  this.B =
                    null),
                (this.D = []),
                (this.g = null),
                (this.C = 0),
                (this.s = this.u = null),
                (this.X = -1),
                (this.J = !1),
                (this.O = 0),
                (this.M = null),
                (this.W = this.K = this.T = this.P = !1),
                (this.h = new Ke());
            }
            function Ke() {
              (this.i = null), (this.g = ""), (this.h = !1);
            }
            s(ze, Ce),
              (ze.prototype.g = function () {
                return new XMLHttpRequest();
              }),
              (ze.prototype.i = function () {
                return {};
              });
            var Qe = new ze(),
              $e = {},
              He = {};
            function We(e, t, n) {
              (e.L = 1), (e.v = pt(b(t))), (e.m = n), (e.P = !0), Je(e, null);
            }
            function Je(e, t) {
              (e.F = Date.now()), Xe(e), (e.A = b(e.v));
              var n = e.A,
                r = e.R,
                n =
                  (Array.isArray(r) || (r = [String(r)]),
                  Ct(n.i, "t", r),
                  (e.C = 0),
                  (n = e.j.J),
                  (e.h = new Ke()),
                  (e.g = ln(e.j, n ? t : null, !e.m)),
                  0 < e.O && (e.M = new Te(p(e.Y, e, e.g), e.O)),
                  (t = e.U),
                  e.g),
                r = e.ca,
                s = "readystatechange";
              Array.isArray(s) || (s && (Ee[0] = s.toString()), (s = Ee));
              for (var a, o, u, h, c, l, i = 0; i < s.length; i++) {
                var d = (function e(t, n, r, s, i) {
                  if (s && s.once)
                    return (function e(t, n, r, s, i) {
                      if (Array.isArray(n)) {
                        for (var a = 0; a < n.length; a++) e(t, n[a], r, s, i);
                        return null;
                      }
                      return (
                        (r = _e(r)),
                        t && t[g]
                          ? t.L(n, r, f(s) ? !!s.capture : !!s, i)
                          : ge(t, n, r, !0, s, i)
                      );
                    })(t, n, r, s, i);
                  if (Array.isArray(n)) {
                    for (var a = 0; a < n.length; a++) e(t, n[a], r, s, i);
                    return null;
                  }
                  return (
                    (r = _e(r)),
                    t && t[g]
                      ? t.K(n, r, f(s) ? !!s.capture : !!s, i)
                      : ge(t, n, r, !1, s, i)
                  );
                })(n, s[i], r || t.handleEvent, !1, t.h || t);
                if (!d) break;
                t.g[d.key] = d;
              }
              (t = e.H ? J(e.H) : {}),
                e.m
                  ? (e.u || (e.u = "POST"),
                    (t["Content-Type"] = "application/x-www-form-urlencoded"),
                    e.g.ea(e.A, e.u, e.m, t))
                  : ((e.u = "GET"), e.g.ea(e.A, e.u, null, t)),
                Pe(),
                (a = e.i),
                (o = e.u),
                (u = e.A),
                (h = e.l),
                (c = e.R),
                (l = e.m),
                a.info(function () {
                  if (a.g)
                    if (l)
                      for (
                        var e = "", t = l.split("&"), n = 0;
                        n < t.length;
                        n++
                      ) {
                        var r,
                          s,
                          i = t[n].split("=");
                        1 < i.length &&
                          ((r = i[0]),
                          (i = i[1]),
                          (e =
                            2 <= (s = r.split("_")).length && "type" == s[1]
                              ? e + (r + "=") + i + "&"
                              : e + (r + "=redacted&")));
                      }
                    else e = null;
                  else e = l;
                  return (
                    "XMLHTTP REQ (" +
                    h +
                    ") [attempt " +
                    c +
                    "]: " +
                    o +
                    "\n" +
                    u +
                    "\n" +
                    e
                  );
                });
            }
            function Ye(e) {
              return e.g && "GET" == e.u && 2 != e.L && e.j.Ca;
            }
            function Xe(e) {
              (e.S = Date.now() + e.I), Ze(e, e.I);
            }
            function Ze(e, t) {
              if (null != e.B) throw Error("WatchDog timer not null");
              e.B = v(p(e.ba, e), t);
            }
            function et(e) {
              e.B && (k.clearTimeout(e.B), (e.B = null));
            }
            function tt(e) {
              0 == e.j.G || e.J || on(e.j, e);
            }
            function M(e) {
              et(e);
              var t = e.M;
              t && "function" == typeof t.ma && t.ma(),
                (e.M = null),
                Se(e.U),
                e.g && ((t = e.g), (e.g = null), t.abort(), t.ma());
            }
            function nt(e, t) {
              try {
                var n = e.j;
                if (0 != n.G && (n.g == e || ot(n.h, e)))
                  if (!e.K && ot(n.h, e) && 3 == n.G) {
                    try {
                      var r = n.Da.g.parse(t);
                    } catch (e) {
                      r = null;
                    }
                    if (Array.isArray(r) && 3 == r.length) {
                      var s = r;
                      if (0 == s[0]) {
                        e: if (!n.u) {
                          if (n.g) {
                            if (!(n.g.F + 3e3 < e.F)) break e;
                            an(n), Wt(n);
                          }
                          nn(n), L(18);
                        }
                      } else
                        (n.za = s[1]),
                          0 < n.za - n.T &&
                            s[2] < 37500 &&
                            n.F &&
                            0 == n.v &&
                            !n.C &&
                            (n.C = v(p(n.Za, n), 6e3));
                      if (at(n.h) <= 1 && n.ca) {
                        try {
                          n.ca();
                        } catch (e) {}
                        n.ca = void 0;
                      }
                    } else D(n, 11);
                  } else if (((!e.K && n.g != e) || an(n), !R(t)))
                    for (s = n.Da.g.parse(t), t = 0; t < s.length; t++) {
                      var i = s[t];
                      if (((n.T = i[0]), (i = i[1]), 2 == n.G))
                        if ("c" == i[0]) {
                          (n.K = i[1]), (n.ia = i[2]);
                          var a = i[3],
                            o =
                              (null != a &&
                                ((n.la = a), n.j.info("VER=" + n.la)),
                              i[4]);
                          null != o && ((n.Aa = o), n.j.info("SVER=" + n.Aa));
                          var u,
                            h,
                            c = i[5];
                          null != c &&
                            "number" == typeof c &&
                            0 < c &&
                            ((r = 1.5 * c),
                            (n.L = r),
                            n.j.info("backChannelRequestTimeoutMs_=" + r)),
                            (r = n);
                          const g = e.g;
                          if (g) {
                            const m = g.g
                              ? g.g.getResponseHeader("X-Client-Wire-Protocol")
                              : null;
                            !m ||
                              (u = r.h).g ||
                              (-1 == m.indexOf("spdy") &&
                                -1 == m.indexOf("quic") &&
                                -1 == m.indexOf("h2")) ||
                              ((u.j = u.l),
                              (u.g = new Set()),
                              u.h && (ut(u, u.h), (u.h = null))),
                              r.D &&
                                (h = g.g
                                  ? g.g.getResponseHeader("X-HTTP-Session-Id")
                                  : null) &&
                                ((r.ya = h), I(r.I, r.D, h));
                          }
                          (n.G = 3),
                            n.l && n.l.ua(),
                            n.ba &&
                              ((n.R = Date.now() - e.F),
                              n.j.info("Handshake RTT: " + n.R + "ms"));
                          var l,
                            d,
                            f = e;
                          ((r = n).qa = cn(r, r.J ? r.ia : null, r.W)),
                            f.K
                              ? (ht(r.h, f),
                                (l = f),
                                (d = r.L) && (l.I = d),
                                l.B && (et(l), Xe(l)),
                                (r.g = f))
                              : tn(r),
                            0 < n.i.length && Yt(n);
                        } else ("stop" != i[0] && "close" != i[0]) || D(n, 7);
                      else
                        3 == n.G &&
                          ("stop" == i[0] || "close" == i[0]
                            ? "stop" == i[0]
                              ? D(n, 7)
                              : Ht(n)
                            : "noop" != i[0] && n.l && n.l.ta(i),
                          (n.v = 0));
                    }
                Pe();
              } catch (e) {}
            }
            (w.prototype.ca = function (e) {
              e = e.target;
              const t = this.M;
              t && 3 == V(e) ? t.j() : this.Y(e);
            }),
              (w.prototype.Y = function (e) {
                try {
                  if (e == this.g)
                    e: {
                      var t = V(this.g),
                        n = this.g.Ba();
                      if (
                        (this.g.Z(),
                        !(t < 3) &&
                          (3 != t ||
                            (this.g &&
                              (this.h.h || this.g.oa() || Kt(this.g)))))
                      ) {
                        this.J || 4 != t || 7 == n || Pe(), et(this);
                        var r = this.g.Z();
                        this.X = r;
                        t: if (Ye(this)) {
                          var s = Kt(this.g),
                            i = ((e = ""), s.length),
                            a = 4 == V(this.g);
                          if (!this.h.i) {
                            if ("undefined" == typeof TextDecoder) {
                              M(this), tt(this);
                              var o = "";
                              break t;
                            }
                            this.h.i = new k.TextDecoder();
                          }
                          for (n = 0; n < i; n++)
                            (this.h.h = !0),
                              (e += this.h.i.decode(s[n], {
                                stream: !(a && n == i - 1),
                              }));
                          (s.length = 0),
                            (this.h.g += e),
                            (this.C = 0),
                            (o = this.h.g);
                        } else o = this.g.oa();
                        if (
                          ((this.o = 200 == r),
                          (b = this.i),
                          (I = this.u),
                          (T = this.A),
                          (E = this.l),
                          (S = this.R),
                          (x = t),
                          (D = r),
                          b.info(function () {
                            return (
                              "XMLHTTP RESP (" +
                              E +
                              ") [ attempt " +
                              S +
                              "]: " +
                              I +
                              "\n" +
                              T +
                              "\n" +
                              x +
                              " " +
                              D
                            );
                          }),
                          this.o)
                        ) {
                          if (this.T && !this.K) {
                            t: {
                              if (this.g) {
                                var u,
                                  h = this.g;
                                if (
                                  (u = h.g
                                    ? h.g.getResponseHeader(
                                        "X-HTTP-Initial-Response"
                                      )
                                    : null) &&
                                  !R(u)
                                ) {
                                  var c = u;
                                  break t;
                                }
                              }
                              c = null;
                            }
                            if (!(r = c)) {
                              (this.o = !1),
                                (this.s = 3),
                                L(12),
                                M(this),
                                tt(this);
                              break e;
                            }
                            O(
                              this.i,
                              this.l,
                              r,
                              "Initial handshake response via X-HTTP-Initial-Response"
                            ),
                              (this.K = !0),
                              nt(this, r);
                          }
                          if (this.P) {
                            for (
                              var l, d, r = !0;
                              !this.J && this.C < o.length;

                            ) {
                              if (
                                ((v = o),
                                (_ = void 0),
                                (w = this.C),
                                (l =
                                  -1 == (_ = v.indexOf("\n", w))
                                    ? He
                                    : ((w = Number(v.substring(w, _))),
                                      isNaN(w)
                                        ? $e
                                        : (_ += 1) + w > v.length
                                        ? He
                                        : ((v = v.slice(_, _ + w)),
                                          (this.C = _ + w),
                                          v))) == He)
                              ) {
                                4 == t && ((this.s = 4), L(14), (r = !1)),
                                  O(
                                    this.i,
                                    this.l,
                                    null,
                                    "[Incomplete Response]"
                                  );
                                break;
                              }
                              if (l == $e) {
                                (this.s = 4),
                                  L(15),
                                  O(this.i, this.l, o, "[Invalid Chunk]"),
                                  (r = !1);
                                break;
                              }
                              O(this.i, this.l, l, null), nt(this, l);
                            }
                            Ye(this) &&
                              0 != this.C &&
                              ((this.h.g = this.h.g.slice(this.C)),
                              (this.C = 0)),
                              4 != t ||
                                0 != o.length ||
                                this.h.h ||
                                ((this.s = 1), L(16), (r = !1)),
                              (this.o = this.o && r),
                              r
                                ? 0 < o.length &&
                                  !this.W &&
                                  ((this.W = !0),
                                  (d = this.j).g == this &&
                                    d.ba &&
                                    !d.M &&
                                    (d.j.info(
                                      "Great, no buffering proxy detected. Bytes received: " +
                                        o.length
                                    ),
                                    rn(d),
                                    (d.M = !0),
                                    L(11)))
                                : (O(
                                    this.i,
                                    this.l,
                                    o,
                                    "[Invalid Chunked Response]"
                                  ),
                                  M(this),
                                  tt(this));
                          } else O(this.i, this.l, o, null), nt(this, o);
                          4 == t && M(this),
                            this.o &&
                              !this.J &&
                              (4 == t
                                ? on(this.j, this)
                                : ((this.o = !1), Xe(this)));
                        } else {
                          {
                            var f = this.g;
                            const A = {};
                            f = (
                              (f.g &&
                                2 <= V(f) &&
                                f.g.getAllResponseHeaders()) ||
                              ""
                            ).split("\r\n");
                            for (let e = 0; e < f.length; e++)
                              if (!R(f[e])) {
                                var g = (function (e) {
                                    var t = 1;
                                    e = e.split(":");
                                    const n = [];
                                    for (; 0 < t && e.length; )
                                      n.push(e.shift()), t--;
                                    return e.length && n.push(e.join(":")), n;
                                  })(f[e]),
                                  m = g[0];
                                if ("string" == typeof (g = g[1])) {
                                  g = g.trim();
                                  const C = A[m] || [];
                                  (A[m] = C).push(g);
                                }
                              }
                            function p(e) {
                              return e.join(", ");
                            }
                            var y = A;
                            for (const N in y) p.call(void 0, y[N], N, y);
                          }
                          400 == r && 0 < o.indexOf("Unknown SID")
                            ? ((this.s = 3), L(12))
                            : ((this.s = 0), L(13)),
                            M(this),
                            tt(this);
                        }
                      }
                    }
                } catch (e) {}
                var v, w, _, b, I, T, E, S, x, D;
              }),
              (w.prototype.cancel = function () {
                (this.J = !0), M(this);
              }),
              (w.prototype.ba = function () {
                this.B = null;
                var e,
                  t,
                  n = Date.now();
                0 <= n - this.S
                  ? ((e = this.i),
                    (t = this.A),
                    e.info(function () {
                      return "TIMEOUT: " + t;
                    }),
                    2 != this.L && (Pe(), L(17)),
                    M(this),
                    (this.s = 2),
                    tt(this))
                  : Ze(this, this.S - n);
              });
            var rt = class {
              constructor(e, t) {
                (this.g = e), (this.map = t);
              }
            };
            function st(e) {
              (this.l = e || 10),
                (e = k.PerformanceNavigationTiming
                  ? 0 <
                      (e = k.performance.getEntriesByType("navigation"))
                        .length &&
                    ("hq" == e[0].nextHopProtocol ||
                      "h2" == e[0].nextHopProtocol)
                  : !!(
                      k.chrome &&
                      k.chrome.loadTimes &&
                      k.chrome.loadTimes() &&
                      k.chrome.loadTimes().wasFetchedViaSpdy
                    )),
                (this.j = e ? this.l : 1),
                (this.g = null),
                1 < this.j && (this.g = new Set()),
                (this.h = null),
                (this.i = []);
            }
            function it(e) {
              return e.h || (e.g && e.g.size >= e.j);
            }
            function at(e) {
              return e.h ? 1 : e.g ? e.g.size : 0;
            }
            function ot(e, t) {
              return e.h ? e.h == t : e.g && e.g.has(t);
            }
            function ut(e, t) {
              e.g ? e.g.add(t) : (e.h = t);
            }
            function ht(e, t) {
              e.h && e.h == t
                ? (e.h = null)
                : e.g && e.g.has(t) && e.g.delete(t);
            }
            function ct(t) {
              if (null != t.h) return t.i.concat(t.h.D);
              if (null == t.g || 0 === t.g.size) return K(t.i);
              {
                let e = t.i;
                for (const n of t.g.values()) e = e.concat(n.D);
                return e;
              }
            }
            function lt(e, t) {
              if (e.forEach && "function" == typeof e.forEach)
                e.forEach(t, void 0);
              else if (q(e) || "string" == typeof e)
                Array.prototype.forEach.call(e, t, void 0);
              else
                for (
                  var n = (function (e) {
                      if (e.na && "function" == typeof e.na) return e.na();
                      if (!e.V || "function" != typeof e.V) {
                        if ("undefined" != typeof Map && e instanceof Map)
                          return Array.from(e.keys());
                        if (!("undefined" != typeof Set && e instanceof Set)) {
                          if (q(e) || "string" == typeof e) {
                            var t = [];
                            e = e.length;
                            for (var n = 0; n < e; n++) t.push(n);
                            return t;
                          }
                          (t = []), (n = 0);
                          for (const r in e) t[n++] = r;
                          return t;
                        }
                      }
                    })(e),
                    r = (function (e) {
                      if (e.V && "function" == typeof e.V) return e.V();
                      if (
                        ("undefined" != typeof Map && e instanceof Map) ||
                        ("undefined" != typeof Set && e instanceof Set)
                      )
                        return Array.from(e.values());
                      if ("string" == typeof e) return e.split("");
                      if (q(e)) {
                        for (var t = [], n = e.length, r = 0; r < n; r++)
                          t.push(e[r]);
                        return t;
                      }
                      for (r in ((t = []), (n = 0), e)) t[n++] = e[r];
                      return t;
                    })(e),
                    s = r.length,
                    i = 0;
                  i < s;
                  i++
                )
                  t.call(void 0, r[i], n && n[i], e);
            }
            st.prototype.cancel = function () {
              if (((this.i = ct(this)), this.h))
                this.h.cancel(), (this.h = null);
              else if (this.g && 0 !== this.g.size) {
                for (const e of this.g.values()) e.cancel();
                this.g.clear();
              }
            };
            var dt = RegExp(
              "^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$"
            );
            function _(e) {
              var t, n;
              (this.g = this.o = this.j = ""),
                (this.s = null),
                (this.m = this.l = ""),
                (this.h = !1),
                e instanceof _
                  ? ((this.h = e.h),
                    ft(this, e.j),
                    (this.o = e.o),
                    (this.g = e.g),
                    gt(this, e.s),
                    (this.l = e.l),
                    (t = e.i),
                    ((n = new xt()).i = t.i),
                    t.g && ((n.g = new Map(t.g)), (n.h = t.h)),
                    mt(this, n),
                    (this.m = e.m))
                  : e && (t = String(e).match(dt))
                  ? ((this.h = !1),
                    ft(this, t[1] || "", !0),
                    (this.o = yt(t[2] || "")),
                    (this.g = yt(t[3] || "", !0)),
                    gt(this, t[4]),
                    (this.l = yt(t[5] || "", !0)),
                    mt(this, t[6] || "", !0),
                    (this.m = yt(t[7] || "")))
                  : ((this.h = !1), (this.i = new xt(null, this.h)));
            }
            function b(e) {
              return new _(e);
            }
            function ft(e, t, n) {
              (e.j = n ? yt(t, !0) : t), e.j && (e.j = e.j.replace(/:$/, ""));
            }
            function gt(e, t) {
              if (t) {
                if (((t = Number(t)), isNaN(t) || t < 0))
                  throw Error("Bad port number " + t);
                e.s = t;
              } else e.s = null;
            }
            function mt(e, t, n) {
              var r, s;
              t instanceof xt
                ? ((e.i = t),
                  (r = e.i),
                  (s = e.h) &&
                    !r.j &&
                    (T(r),
                    (r.i = null),
                    r.g.forEach(function (e, t) {
                      var n = t.toLowerCase();
                      t != n && (Dt(this, t), Ct(this, n, e));
                    }, r)),
                  (r.j = s))
                : (n || (t = vt(t, Et)), (e.i = new xt(t, e.h)));
            }
            function I(e, t, n) {
              e.i.set(t, n);
            }
            function pt(e) {
              return (
                I(
                  e,
                  "zx",
                  Math.floor(2147483648 * Math.random()).toString(36) +
                    Math.abs(
                      Math.floor(2147483648 * Math.random()) ^ Date.now()
                    ).toString(36)
                ),
                e
              );
            }
            function yt(e, t) {
              return e
                ? t
                  ? decodeURI(e.replace(/%25/g, "%2525"))
                  : decodeURIComponent(e)
                : "";
            }
            function vt(e, t, n) {
              return "string" == typeof e
                ? ((e = encodeURI(e).replace(t, wt)),
                  n ? e.replace(/%25([0-9a-fA-F]{2})/g, "%$1") : e)
                : null;
            }
            function wt(e) {
              return (
                "%" +
                (((e = e.charCodeAt(0)) >> 4) & 15).toString(16) +
                (15 & e).toString(16)
              );
            }
            _.prototype.toString = function () {
              var e = [],
                t = this.j,
                n = (t && e.push(vt(t, bt, !0), ":"), this.g);
              return (
                (!n && "file" != t) ||
                  (e.push("//"),
                  (t = this.o) && e.push(vt(t, bt, !0), "@"),
                  e.push(
                    encodeURIComponent(String(n)).replace(
                      /%25([0-9a-fA-F]{2})/g,
                      "%$1"
                    )
                  ),
                  null != (n = this.s) && e.push(":", String(n))),
                (n = this.l) &&
                  (this.g && "/" != n.charAt(0) && e.push("/"),
                  e.push(vt(n, "/" == n.charAt(0) ? Tt : It, !0))),
                (n = this.i.toString()) && e.push("?", n),
                (n = this.m) && e.push("#", vt(n, St)),
                e.join("")
              );
            };
            var _t,
              bt = /[#\/\?@]/g,
              It = /[#\?:]/g,
              Tt = /[#\?]/g,
              Et = /[#\?@]/g,
              St = /#/g;
            function xt(e, t) {
              (this.h = this.g = null), (this.i = e || null), (this.j = !!t);
            }
            function T(e) {
              if (!e.g && ((e.g = new Map()), (e.h = 0), e.i)) {
                var t = e.i;
                if (t) {
                  t = t.split("&");
                  for (var n = 0; n < t.length; n++) {
                    var r,
                      s = t[n].indexOf("="),
                      i = null;
                    0 <= s
                      ? ((r = t[n].substring(0, s)),
                        (i = t[n].substring(s + 1)))
                      : (r = t[n]),
                      (s = r),
                      (i = i ? decodeURIComponent(i.replace(/\+/g, " ")) : ""),
                      e.add(decodeURIComponent(s.replace(/\+/g, " ")), i);
                  }
                }
              }
            }
            function Dt(e, t) {
              T(e),
                (t = E(e, t)),
                e.g.has(t) &&
                  ((e.i = null), (e.h -= e.g.get(t).length), e.g.delete(t));
            }
            function At(e, t) {
              return T(e), (t = E(e, t)), e.g.has(t);
            }
            function Ct(e, t, n) {
              Dt(e, t),
                0 < n.length &&
                  ((e.i = null), e.g.set(E(e, t), K(n)), (e.h += n.length));
            }
            function E(e, t) {
              return (t = String(t)), e.j ? t.toLowerCase() : t;
            }
            function S(e, t, n, r, s) {
              try {
                s &&
                  ((s.onload = null),
                  (s.onerror = null),
                  (s.onabort = null),
                  (s.ontimeout = null)),
                  r(n);
              } catch (e) {}
            }
            function Nt() {
              this.g = new Ae();
            }
            function kt(e) {
              (this.l = e.Ub || null), (this.j = e.eb || !1);
            }
            function Rt(e, t) {
              l.call(this),
                (this.D = e),
                (this.o = t),
                (this.m = void 0),
                (this.status = this.readyState = 0),
                (this.responseType =
                  this.responseText =
                  this.response =
                  this.statusText =
                    ""),
                (this.onreadystatechange = null),
                (this.u = new Headers()),
                (this.h = null),
                (this.B = "GET"),
                (this.A = ""),
                (this.g = !1),
                (this.v = this.j = this.l = null);
            }
            function Lt(e) {
              e.j.read().then(e.Pa.bind(e)).catch(e.ga.bind(e));
            }
            function Ot(e) {
              (e.readyState = 4),
                (e.l = null),
                (e.j = null),
                (e.v = null),
                Mt(e);
            }
            function Mt(e) {
              e.onreadystatechange && e.onreadystatechange.call(e);
            }
            function Vt(e) {
              let n = "";
              return (
                W(e, function (e, t) {
                  n = (n = n + t + ":") + e + "\r\n";
                }),
                n
              );
            }
            function Ft(e, t, n) {
              e: {
                for (r in n) {
                  var r = !1;
                  break e;
                }
                r = !0;
              }
              r ||
                ((n = Vt(n)),
                "string" == typeof e
                  ? null != n && encodeURIComponent(String(n))
                  : I(e, t, n));
            }
            function x(e) {
              l.call(this),
                (this.headers = new Map()),
                (this.o = e || null),
                (this.h = !1),
                (this.v = this.g = null),
                (this.D = ""),
                (this.m = 0),
                (this.l = ""),
                (this.j = this.B = this.u = this.A = !1),
                (this.I = null),
                (this.H = ""),
                (this.J = !1);
            }
            ((e = xt.prototype).add = function (e, t) {
              T(this), (this.i = null), (e = E(this, e));
              var n = this.g.get(e);
              return (
                n || this.g.set(e, (n = [])), n.push(t), (this.h += 1), this
              );
            }),
              (e.forEach = function (n, r) {
                T(this),
                  this.g.forEach(function (e, t) {
                    e.forEach(function (e) {
                      n.call(r, e, t, this);
                    }, this);
                  }, this);
              }),
              (e.na = function () {
                T(this);
                const e = Array.from(this.g.values()),
                  n = Array.from(this.g.keys()),
                  r = [];
                for (let t = 0; t < n.length; t++) {
                  var s = e[t];
                  for (let e = 0; e < s.length; e++) r.push(n[t]);
                }
                return r;
              }),
              (e.V = function (t) {
                T(this);
                let n = [];
                if ("string" == typeof t)
                  At(this, t) && (n = n.concat(this.g.get(E(this, t))));
                else {
                  t = Array.from(this.g.values());
                  for (let e = 0; e < t.length; e++) n = n.concat(t[e]);
                }
                return n;
              }),
              (e.set = function (e, t) {
                return (
                  T(this),
                  (this.i = null),
                  At(this, (e = E(this, e))) &&
                    (this.h -= this.g.get(e).length),
                  this.g.set(e, [t]),
                  (this.h += 1),
                  this
                );
              }),
              (e.get = function (e, t) {
                return e && 0 < (e = this.V(e)).length ? String(e[0]) : t;
              }),
              (e.toString = function () {
                if (this.i) return this.i;
                if (!this.g) return "";
                const e = [],
                  t = Array.from(this.g.keys());
                for (var n = 0; n < t.length; n++)
                  for (
                    var r = t[n],
                      s = encodeURIComponent(String(r)),
                      i = this.V(r),
                      r = 0;
                    r < i.length;
                    r++
                  ) {
                    var a = s;
                    "" !== i[r] &&
                      (a += "=" + encodeURIComponent(String(i[r]))),
                      e.push(a);
                  }
                return (this.i = e.join("&"));
              }),
              s(kt, Ce),
              (kt.prototype.g = function () {
                return new Rt(this.l, this.j);
              }),
              (kt.prototype.i =
                ((_t = {}),
                function () {
                  return _t;
                })),
              s(Rt, l),
              ((e = Rt.prototype).open = function (e, t) {
                if (0 != this.readyState)
                  throw (this.abort(), Error("Error reopening a connection"));
                (this.B = e), (this.A = t), (this.readyState = 1), Mt(this);
              }),
              (e.send = function (e) {
                if (1 != this.readyState)
                  throw (this.abort(), Error("need to call open() first. "));
                this.g = !0;
                const t = {
                  headers: this.u,
                  method: this.B,
                  credentials: this.m,
                  cache: void 0,
                };
                e && (t.body = e),
                  (this.D || k)
                    .fetch(new Request(this.A, t))
                    .then(this.Sa.bind(this), this.ga.bind(this));
              }),
              (e.abort = function () {
                (this.response = this.responseText = ""),
                  (this.u = new Headers()),
                  (this.status = 0),
                  this.j &&
                    this.j.cancel("Request was aborted.").catch(() => {}),
                  1 <= this.readyState &&
                    this.g &&
                    4 != this.readyState &&
                    ((this.g = !1), Ot(this)),
                  (this.readyState = 0);
              }),
              (e.Sa = function (e) {
                if (
                  this.g &&
                  ((this.l = e),
                  this.h ||
                    ((this.status = this.l.status),
                    (this.statusText = this.l.statusText),
                    (this.h = e.headers),
                    (this.readyState = 2),
                    Mt(this)),
                  this.g && ((this.readyState = 3), Mt(this), this.g))
                )
                  if ("arraybuffer" === this.responseType)
                    e.arrayBuffer().then(
                      this.Qa.bind(this),
                      this.ga.bind(this)
                    );
                  else if (void 0 !== k.ReadableStream && "body" in e) {
                    if (((this.j = e.body.getReader()), this.o)) {
                      if (this.responseType)
                        throw Error(
                          'responseType must be empty for "streamBinaryChunks" mode responses.'
                        );
                      this.response = [];
                    } else
                      (this.response = this.responseText = ""),
                        (this.v = new TextDecoder());
                    Lt(this);
                  } else e.text().then(this.Ra.bind(this), this.ga.bind(this));
              }),
              (e.Pa = function (e) {
                var t;
                this.g &&
                  (this.o && e.value
                    ? this.response.push(e.value)
                    : this.o ||
                      ((t = e.value || new Uint8Array(0)),
                      (t = this.v.decode(t, { stream: !e.done })) &&
                        (this.response = this.responseText += t)),
                  (e.done ? Ot : Mt)(this),
                  3 == this.readyState && Lt(this));
              }),
              (e.Ra = function (e) {
                this.g && ((this.response = this.responseText = e), Ot(this));
              }),
              (e.Qa = function (e) {
                this.g && ((this.response = e), Ot(this));
              }),
              (e.ga = function () {
                this.g && Ot(this);
              }),
              (e.setRequestHeader = function (e, t) {
                this.u.append(e, t);
              }),
              (e.getResponseHeader = function (e) {
                return (this.h && this.h.get(e.toLowerCase())) || "";
              }),
              (e.getAllResponseHeaders = function () {
                if (!this.h) return "";
                const e = [],
                  t = this.h.entries();
                for (var n = t.next(); !n.done; )
                  (n = n.value), e.push(n[0] + ": " + n[1]), (n = t.next());
                return e.join("\r\n");
              }),
              Object.defineProperty(Rt.prototype, "withCredentials", {
                get: function () {
                  return "include" === this.m;
                },
                set: function (e) {
                  this.m = e ? "include" : "same-origin";
                },
              }),
              s(x, l);
            var Pt = /^https?$/i,
              Ut = ["POST", "PUT"];
            function Bt(e, t) {
              (e.h = !1),
                e.g && ((e.j = !0), e.g.abort(), (e.j = !1)),
                (e.l = t),
                (e.m = 5),
                qt(e),
                Gt(e);
            }
            function qt(e) {
              e.A || ((e.A = !0), d(e, "complete"), d(e, "error"));
            }
            function jt(e) {
              if (e.h && void 0 !== B && (!e.v[1] || 4 != V(e) || 2 != e.Z()))
                if (e.u && 4 == V(e)) Ie(e.Ea, 0, e);
                else if ((d(e, "readystatechange"), 4 == V(e))) {
                  e.h = !1;
                  try {
                    var t,
                      n,
                      r,
                      s = e.Z();
                    switch (s) {
                      case 200:
                      case 201:
                      case 202:
                      case 204:
                      case 206:
                      case 304:
                      case 1223:
                        var i = !0;
                        break;
                      default:
                        i = !1;
                    }
                    if (
                      ((t = i) ||
                        ((n = 0 === s) &&
                          (!(r = String(e.D).match(dt)[1] || null) &&
                            k.self &&
                            k.self.location &&
                            (r = k.self.location.protocol.slice(0, -1)),
                          (n = !Pt.test(r ? r.toLowerCase() : ""))),
                        (t = n)),
                      t)
                    )
                      d(e, "complete"), d(e, "success");
                    else {
                      e.m = 6;
                      try {
                        var a = 2 < V(e) ? e.g.statusText : "";
                      } catch (e) {
                        a = "";
                      }
                      (e.l = a + " [" + e.Z() + "]"), qt(e);
                    }
                  } finally {
                    Gt(e);
                  }
                }
            }
            function Gt(e, t) {
              if (e.g) {
                zt(e);
                const n = e.g,
                  r = e.v[0] ? () => {} : null;
                (e.g = null), (e.v = null), t || d(e, "ready");
                try {
                  n.onreadystatechange = r;
                } catch (e) {}
              }
            }
            function zt(e) {
              e.I && (k.clearTimeout(e.I), (e.I = null));
            }
            function V(e) {
              return e.g ? e.g.readyState : 0;
            }
            function Kt(e) {
              try {
                if (!e.g) return null;
                if ("response" in e.g) return e.g.response;
                switch (e.H) {
                  case "":
                  case "text":
                    return e.g.responseText;
                  case "arraybuffer":
                    if ("mozResponseArrayBuffer" in e.g)
                      return e.g.mozResponseArrayBuffer;
                }
                return null;
              } catch (e) {
                return null;
              }
            }
            function Qt(e, t, n) {
              return (
                (n && n.internalChannelParams && n.internalChannelParams[e]) ||
                t
              );
            }
            function $t(e) {
              (this.Aa = 0),
                (this.i = []),
                (this.j = new qe()),
                (this.ia =
                  this.qa =
                  this.I =
                  this.W =
                  this.g =
                  this.ya =
                  this.D =
                  this.H =
                  this.m =
                  this.S =
                  this.o =
                    null),
                (this.Ya = this.U = 0),
                (this.Va = Qt("failFast", !1, e)),
                (this.F = this.C = this.u = this.s = this.l = null),
                (this.X = !0),
                (this.za = this.T = -1),
                (this.Y = this.v = this.B = 0),
                (this.Ta = Qt("baseRetryDelayMs", 5e3, e)),
                (this.cb = Qt("retryDelaySeedMs", 1e4, e)),
                (this.Wa = Qt("forwardChannelMaxRetries", 2, e)),
                (this.wa = Qt("forwardChannelRequestTimeoutMs", 2e4, e)),
                (this.pa = (e && e.xmlHttpFactory) || void 0),
                (this.Xa = (e && e.Tb) || void 0),
                (this.Ca = (e && e.useFetchStreams) || !1),
                (this.L = void 0),
                (this.J = (e && e.supportsCrossDomainXhr) || !1),
                (this.K = ""),
                (this.h = new st(e && e.concurrentRequestLimit)),
                (this.Da = new Nt()),
                (this.P = (e && e.fastHandshake) || !1),
                (this.O = (e && e.encodeInitMessageHeaders) || !1),
                this.P && this.O && (this.O = !1),
                (this.Ua = (e && e.Rb) || !1),
                e && e.xa && this.j.xa(),
                e && e.forceLongPolling && (this.X = !1),
                (this.ba =
                  (!this.P && this.X && e && e.detectBufferingProxy) || !1),
                (this.ja = void 0),
                e &&
                  e.longPollingTimeout &&
                  0 < e.longPollingTimeout &&
                  (this.ja = e.longPollingTimeout),
                (this.ca = void 0),
                (this.R = 0),
                (this.M = !1),
                (this.ka = this.A = null);
            }
            function Ht(e) {
              if ((Jt(e), 3 == e.G)) {
                var t = e.U++,
                  n = b(e.I);
                if (
                  (I(n, "SID", e.K),
                  I(n, "RID", t),
                  I(n, "TYPE", "terminate"),
                  Zt(e, n),
                  ((t = new w(e, e.j, t)).L = 2),
                  (t.v = pt(b(n))),
                  (n = !1),
                  k.navigator && k.navigator.sendBeacon)
                )
                  try {
                    n = k.navigator.sendBeacon(t.v.toString(), "");
                  } catch (e) {}
                !n && k.Image && ((new Image().src = t.v), (n = !0)),
                  n || ((t.g = ln(t.j, null)), t.g.ea(t.v)),
                  (t.F = Date.now()),
                  Xe(t);
              }
              hn(e);
            }
            function Wt(e) {
              e.g && (rn(e), e.g.cancel(), (e.g = null));
            }
            function Jt(e) {
              Wt(e),
                e.u && (k.clearTimeout(e.u), (e.u = null)),
                an(e),
                e.h.cancel(),
                e.s &&
                  ("number" == typeof e.s && k.clearTimeout(e.s), (e.s = null));
            }
            function Yt(e) {
              var t;
              it(e.h) ||
                e.s ||
                ((e.s = !0),
                (t = e.Ga),
                a || ne(),
                o || (a(), (o = !0)),
                te.add(t, e),
                (e.B = 0));
            }
            function Xt(e, t) {
              var n = t ? t.l : e.U++,
                r = b(e.I);
              I(r, "SID", e.K),
                I(r, "RID", n),
                I(r, "AID", e.T),
                Zt(e, r),
                e.m && e.o && Ft(r, e.m, e.o),
                (n = new w(e, e.j, n, e.B + 1)),
                null === e.m && (n.H = e.o),
                t && (e.i = t.D.concat(e.i)),
                (t = en(e, n, 1e3)),
                (n.I =
                  Math.round(0.5 * e.wa) +
                  Math.round(0.5 * e.wa * Math.random())),
                ut(e.h, n),
                We(n, r, t);
            }
            function Zt(e, n) {
              e.H &&
                W(e.H, function (e, t) {
                  I(n, t, e);
                }),
                e.l &&
                  lt({}, function (e, t) {
                    I(n, t, e);
                  });
            }
            function en(r, e, s) {
              s = Math.min(r.i.length, s);
              var i = r.l ? p(r.l.Na, r.l, r) : null;
              e: {
                var a = r.i;
                let n = -1;
                for (;;) {
                  const h = ["count=" + s];
                  -1 == n
                    ? 0 < s
                      ? ((n = a[0].g), h.push("ofs=" + n))
                      : (n = 0)
                    : h.push("ofs=" + n);
                  let t = !0;
                  for (let e = 0; e < s; e++) {
                    var o = a[e].g,
                      u = a[e].map;
                    if ((o -= n) < 0) (n = Math.max(0, a[e].g - 100)), (t = !1);
                    else
                      try {
                        !(function (e, r) {
                          const s = "req" + o + "_" || "";
                          try {
                            lt(e, function (e, t) {
                              let n = e;
                              f(e) && (n = xe(e)),
                                r.push(s + t + "=" + encodeURIComponent(n));
                            });
                          } catch (e) {
                            throw (
                              (r.push(
                                s + "type=" + encodeURIComponent("_badmap")
                              ),
                              e)
                            );
                          }
                        })(u, h);
                      } catch (r) {
                        i && i(u);
                      }
                  }
                  if (t) {
                    i = h.join("&");
                    break e;
                  }
                }
              }
              return (r = r.i.splice(0, s)), (e.D = r), i;
            }
            function tn(e) {
              var t;
              e.g ||
                e.u ||
                ((e.Y = 1),
                (t = e.Fa),
                a || ne(),
                o || (a(), (o = !0)),
                te.add(t, e),
                (e.v = 0));
            }
            function nn(e) {
              return (
                !(e.g || e.u || 3 <= e.v) &&
                (e.Y++, (e.u = v(p(e.Fa, e), un(e, e.v))), e.v++, 1)
              );
            }
            function rn(e) {
              null != e.A && (k.clearTimeout(e.A), (e.A = null));
            }
            function sn(e) {
              (e.g = new w(e, e.j, "rpc", e.Y)),
                null === e.m && (e.g.H = e.o),
                (e.g.O = 0);
              var t = b(e.qa),
                n =
                  (I(t, "RID", "rpc"),
                  I(t, "SID", e.K),
                  I(t, "AID", e.T),
                  I(t, "CI", e.F ? "0" : "1"),
                  !e.F && e.ja && I(t, "TO", e.ja),
                  I(t, "TYPE", "xmlhttp"),
                  Zt(e, t),
                  e.m && e.o && Ft(t, e.m, e.o),
                  e.L && (e.g.I = e.L),
                  e.g);
              (e = e.ia),
                (n.L = 1),
                (n.v = pt(b(t))),
                (n.m = null),
                (n.P = !0),
                Je(n, e);
            }
            function an(e) {
              null != e.C && (k.clearTimeout(e.C), (e.C = null));
            }
            function on(e, t) {
              var n,
                r,
                s,
                i = null;
              if (e.g == t) {
                an(e), rn(e), (e.g = null);
                var a = 2;
              } else {
                if (!ot(e.h, t)) return;
                (i = t.D), ht(e.h, t), (a = 1);
              }
              if (0 != e.G)
                if (t.o)
                  1 == a
                    ? ((i = t.m ? t.m.length : 0),
                      (t = Date.now() - t.F),
                      (n = e.B),
                      d((a = Ve()), new Be(a, i)),
                      Yt(e))
                    : tn(e);
                else if (
                  3 == (n = t.s) ||
                  (0 == n && 0 < t.X) ||
                  ((1 != a ||
                    ((s = t),
                    at((r = e).h) >= r.h.j - (r.s ? 1 : 0) ||
                      (r.s
                        ? ((r.i = s.D.concat(r.i)), 0)
                        : 1 == r.G ||
                          2 == r.G ||
                          r.B >= (r.Va ? 0 : r.Wa) ||
                          ((r.s = v(p(r.Ga, r, s), un(r, r.B))), r.B++, 0)))) &&
                    (2 != a || !nn(e)))
                )
                  switch (
                    (i && 0 < i.length && ((t = e.h), (t.i = t.i.concat(i))), n)
                  ) {
                    case 1:
                      D(e, 5);
                      break;
                    case 4:
                      D(e, 10);
                      break;
                    case 3:
                      D(e, 6);
                      break;
                    default:
                      D(e, 2);
                  }
            }
            function un(e, t) {
              let n = e.Ta + Math.floor(Math.random() * e.cb);
              return e.isActive() || (n *= 2), n * t;
            }
            function D(e, t) {
              var n, r, s;
              e.j.info("Error code " + t),
                2 == t
                  ? ((n = p(e.fb, e)),
                    (r = !(s = e.Xa)),
                    (s = new _(s || "//www.google.com/images/cleardot.gif")),
                    (k.location && "http" == k.location.protocol) ||
                      ft(s, "https"),
                    pt(s),
                    (r
                      ? function (e, t) {
                          var n = new qe();
                          if (k.Image) {
                            const r = new Image();
                            (r.onload = z(
                              S,
                              n,
                              "TestLoadImage: loaded",
                              !0,
                              t,
                              r
                            )),
                              (r.onerror = z(
                                S,
                                n,
                                "TestLoadImage: error",
                                !1,
                                t,
                                r
                              )),
                              (r.onabort = z(
                                S,
                                n,
                                "TestLoadImage: abort",
                                !1,
                                t,
                                r
                              )),
                              (r.ontimeout = z(
                                S,
                                n,
                                "TestLoadImage: timeout",
                                !1,
                                t,
                                r
                              )),
                              k.setTimeout(function () {
                                r.ontimeout && r.ontimeout();
                              }, 1e4),
                              (r.src = e);
                          } else t(!1);
                        }
                      : function (e, t) {
                          const n = new qe(),
                            r = new AbortController(),
                            s = setTimeout(() => {
                              r.abort(), S(n, 0, !1, t);
                            }, 1e4);
                          fetch(e, { signal: r.signal })
                            .then((e) => {
                              clearTimeout(s),
                                e.ok ? S(n, 0, !0, t) : S(n, 0, !1, t);
                            })
                            .catch(() => {
                              clearTimeout(s), S(n, 0, !1, t);
                            });
                        })(s.toString(), n))
                  : L(2),
                (e.G = 0),
                e.l && e.l.sa(t),
                hn(e),
                Jt(e);
            }
            function hn(e) {
              var t;
              (e.G = 0),
                (e.ka = []),
                e.l &&
                  ((0 == (t = ct(e.h)).length && 0 == e.i.length) ||
                    (Q(e.ka, t),
                    Q(e.ka, e.i),
                    (e.h.i.length = 0),
                    K(e.i),
                    (e.i.length = 0)),
                  e.l.ra());
            }
            function cn(e, t, n) {
              var r,
                s,
                i = n instanceof _ ? b(n) : new _(n);
              return (
                "" != i.g
                  ? (t && (i.g = t + "." + i.g), gt(i, i.s))
                  : ((i = (r = k.location).protocol),
                    (t = t ? t + "." + r.hostname : r.hostname),
                    (r = +r.port),
                    (s = new _(null)),
                    i && ft(s, i),
                    t && (s.g = t),
                    r && gt(s, r),
                    n && (s.l = n),
                    (i = s)),
                (n = e.D),
                (t = e.ya),
                n && t && I(i, n, t),
                I(i, "VER", e.la),
                Zt(e, i),
                i
              );
            }
            function ln(e, t, n) {
              if (t && !e.J)
                throw Error(
                  "Can't create secondary domain capable XhrIo object."
                );
              return (
                (t = e.Ca && !e.pa ? new x(new kt({ eb: n })) : new x(e.pa)).Ha(
                  e.J
                ),
                t
              );
            }
            function dn() {}
            function fn() {}
            function A(e, t) {
              l.call(this),
                (this.g = new $t(t)),
                (this.l = e),
                (this.h = (t && t.messageUrlParams) || null),
                (e = (t && t.messageHeaders) || null),
                t &&
                  t.clientProtocolHeaderRequired &&
                  (e
                    ? (e["X-Client-Protocol"] = "webchannel")
                    : (e = { "X-Client-Protocol": "webchannel" })),
                (this.g.o = e),
                (e = (t && t.initMessageHeaders) || null),
                t &&
                  t.messageContentType &&
                  (e
                    ? (e["X-WebChannel-Content-Type"] = t.messageContentType)
                    : (e = {
                        "X-WebChannel-Content-Type": t.messageContentType,
                      })),
                t &&
                  t.va &&
                  (e
                    ? (e["X-WebChannel-Client-Profile"] = t.va)
                    : (e = { "X-WebChannel-Client-Profile": t.va })),
                (this.g.S = e),
                (e = t && t.Sb) && !R(e) && (this.g.m = e),
                (this.v = (t && t.supportsCrossDomainXhr) || !1),
                (this.u = (t && t.sendRawJson) || !1),
                (t = t && t.httpSessionIdParam) &&
                  !R(t) &&
                  ((this.g.D = t),
                  null !== (e = this.h) &&
                    t in e &&
                    t in (e = this.h) &&
                    delete e[t]),
                (this.j = new C(this));
            }
            function gn(e) {
              Le.call(this),
                e.__headers__ &&
                  ((this.headers = e.__headers__),
                  (this.statusCode = e.__status__),
                  delete e.__headers__,
                  delete e.__status__);
              var t = e.__sm__;
              if (t) {
                e: {
                  for (const n in t) {
                    e = n;
                    break e;
                  }
                  e = void 0;
                }
                (this.i = e) &&
                  ((e = this.i), (t = null !== t && e in t ? t[e] : void 0)),
                  (this.data = t);
              } else this.data = e;
            }
            function mn() {
              Oe.call(this), (this.status = 1);
            }
            function C(e) {
              this.g = e;
            }
            ((e = x.prototype).Ha = function (e) {
              this.J = e;
            }),
              (e.ea = function (e, t, n, r) {
                if (this.g)
                  throw Error(
                    "[goog.net.XhrIo] Object is active with another request=" +
                      this.D +
                      "; newUri=" +
                      e
                  );
                (t = t ? t.toUpperCase() : "GET"),
                  (this.D = e),
                  (this.l = ""),
                  (this.m = 0),
                  (this.A = !1),
                  (this.h = !0),
                  (this.g = (this.o || Qe).g()),
                  (this.v = this.o ? Ne(this.o) : Ne(Qe)),
                  (this.g.onreadystatechange = p(this.Ea, this));
                try {
                  (this.B = !0), this.g.open(t, String(e), !0), (this.B = !1);
                } catch (e) {
                  return void Bt(this, e);
                }
                if (((e = n || ""), (n = new Map(this.headers)), r))
                  if (Object.getPrototypeOf(r) === Object.prototype)
                    for (var s in r) n.set(s, r[s]);
                  else {
                    if (
                      "function" != typeof r.keys ||
                      "function" != typeof r.get
                    )
                      throw Error(
                        "Unknown input type for opt_headers: " + String(r)
                      );
                    for (const o of r.keys()) n.set(o, r.get(o));
                  }
                (r = Array.from(n.keys()).find(
                  (e) => "content-type" == e.toLowerCase()
                )),
                  (s = k.FormData && e instanceof k.FormData),
                  0 <= Array.prototype.indexOf.call(Ut, t, void 0) &&
                    !r &&
                    !s &&
                    n.set(
                      "Content-Type",
                      "application/x-www-form-urlencoded;charset=utf-8"
                    );
                for (var [i, a] of n) this.g.setRequestHeader(i, a);
                this.H && (this.g.responseType = this.H),
                  "withCredentials" in this.g &&
                    this.g.withCredentials !== this.J &&
                    (this.g.withCredentials = this.J);
                try {
                  zt(this), (this.u = !0), this.g.send(e), (this.u = !1);
                } catch (e) {
                  Bt(this, e);
                }
              }),
              (e.abort = function (e) {
                this.g &&
                  this.h &&
                  ((this.h = !1),
                  (this.j = !0),
                  this.g.abort(),
                  (this.j = !1),
                  (this.m = e || 7),
                  d(this, "complete"),
                  d(this, "abort"),
                  Gt(this));
              }),
              (e.N = function () {
                this.g &&
                  (this.h &&
                    ((this.h = !1),
                    (this.j = !0),
                    this.g.abort(),
                    (this.j = !1)),
                  Gt(this, !0)),
                  x.aa.N.call(this);
              }),
              (e.Ea = function () {
                this.s || (this.B || this.u || this.j ? jt(this) : this.bb());
              }),
              (e.bb = function () {
                jt(this);
              }),
              (e.isActive = function () {
                return !!this.g;
              }),
              (e.Z = function () {
                try {
                  return 2 < V(this) ? this.g.status : -1;
                } catch (e) {
                  return -1;
                }
              }),
              (e.oa = function () {
                try {
                  return this.g ? this.g.responseText : "";
                } catch (e) {
                  return "";
                }
              }),
              (e.Oa = function (e) {
                var t;
                if (this.g)
                  return (
                    (t = this.g.responseText),
                    e && 0 == t.indexOf(e) && (t = t.substring(e.length)),
                    De(t)
                  );
              }),
              (e.Ba = function () {
                return this.m;
              }),
              (e.Ka = function () {
                return "string" == typeof this.l ? this.l : String(this.l);
              }),
              ((e = $t.prototype).la = 8),
              (e.G = 1),
              (e.connect = function (e, t, n, r) {
                L(0),
                  (this.W = e),
                  (this.H = t || {}),
                  n && void 0 !== r && ((this.H.OSID = n), (this.H.OAID = r)),
                  (this.F = this.X),
                  (this.I = cn(this, null, this.W)),
                  Yt(this);
              }),
              (e.Ga = function (t) {
                if (this.s)
                  if (((this.s = null), 1 == this.G)) {
                    if (!t) {
                      (this.U = Math.floor(1e5 * Math.random())),
                        (t = this.U++);
                      const i = new w(this, this.j, t);
                      let e = this.o;
                      if (
                        (this.S && (e ? X((e = J(e)), this.S) : (e = this.S)),
                        null !== this.m || this.O || ((i.H = e), (e = null)),
                        this.P)
                      )
                        e: {
                          for (var n = 0, r = 0; r < this.i.length; r++) {
                            var s = this.i[r];
                            if (
                              void 0 ===
                              (s =
                                "__data__" in s.map &&
                                "string" == typeof (s = s.map.__data__)
                                  ? s.length
                                  : void 0)
                            )
                              break;
                            if (4096 < (n += s)) {
                              n = r;
                              break e;
                            }
                            if (4096 === n || r === this.i.length - 1) {
                              n = r + 1;
                              break e;
                            }
                          }
                          n = 1e3;
                        }
                      else n = 1e3;
                      (n = en(this, i, n)),
                        I((r = b(this.I)), "RID", t),
                        I(r, "CVER", 22),
                        this.D && I(r, "X-HTTP-Session-Id", this.D),
                        Zt(this, r),
                        e &&
                          (this.O
                            ? (n =
                                "headers=" +
                                encodeURIComponent(String(Vt(e))) +
                                "&" +
                                n)
                            : this.m && Ft(r, this.m, e)),
                        ut(this.h, i),
                        this.Ua && I(r, "TYPE", "init"),
                        this.P
                          ? (I(r, "$req", n),
                            I(r, "SID", "null"),
                            (i.T = !0),
                            We(i, r, null))
                          : We(i, r, n),
                        (this.G = 2);
                    }
                  } else
                    3 == this.G &&
                      (t
                        ? Xt(this, t)
                        : 0 == this.i.length || it(this.h) || Xt(this));
              }),
              (e.Fa = function () {
                var e;
                (this.u = null),
                  sn(this),
                  this.ba &&
                    !(this.M || null == this.g || this.R <= 0) &&
                    ((e = 2 * this.R),
                    this.j.info("BP detection timer enabled: " + e),
                    (this.A = v(p(this.ab, this), e)));
              }),
              (e.ab = function () {
                this.A &&
                  ((this.A = null),
                  this.j.info("BP detection timeout reached."),
                  this.j.info(
                    "Buffering proxy detected and switch to long-polling!"
                  ),
                  (this.F = !1),
                  (this.M = !0),
                  L(10),
                  Wt(this),
                  sn(this));
              }),
              (e.Za = function () {
                null != this.C && ((this.C = null), Wt(this), nn(this), L(19));
              }),
              (e.fb = function (e) {
                e
                  ? (this.j.info("Successfully pinged google.com"), L(2))
                  : (this.j.info("Failed to ping google.com"), L(1));
              }),
              (e.isActive = function () {
                return !!this.l && this.l.isActive(this);
              }),
              ((e = dn.prototype).ua = function () {}),
              (e.ta = function () {}),
              (e.sa = function () {}),
              (e.ra = function () {}),
              (e.isActive = function () {
                return !0;
              }),
              (e.Na = function () {}),
              (fn.prototype.g = function (e, t) {
                return new A(e, t);
              }),
              s(A, l),
              (A.prototype.m = function () {
                (this.g.l = this.j),
                  this.v && (this.g.J = !0),
                  this.g.connect(this.l, this.h || void 0);
              }),
              (A.prototype.close = function () {
                Ht(this.g);
              }),
              (A.prototype.o = function (e) {
                var t,
                  n = this.g;
                "string" == typeof e
                  ? (((t = {}).__data__ = e), (e = t))
                  : this.u && (((t = {}).__data__ = xe(e)), (e = t)),
                  n.i.push(new rt(n.Ya++, e)),
                  3 == n.G && Yt(n);
              }),
              (A.prototype.N = function () {
                (this.g.l = null),
                  delete this.j,
                  Ht(this.g),
                  delete this.g,
                  A.aa.N.call(this);
              }),
              s(gn, Le),
              s(mn, Oe),
              s(C, dn),
              (C.prototype.ua = function () {
                d(this.g, "a");
              }),
              (C.prototype.ta = function (e) {
                d(this.g, new gn(e));
              }),
              (C.prototype.sa = function (e) {
                d(this.g, new mn());
              }),
              (C.prototype.ra = function () {
                d(this.g, "b");
              }),
              (fn.prototype.createWebChannel = fn.prototype.g),
              (A.prototype.send = A.prototype.o),
              (A.prototype.open = A.prototype.m),
              (Tn = function () {
                return new fn();
              }),
              (In = Ve),
              (bn = y),
              (_n = {
                mb: 0,
                pb: 1,
                qb: 2,
                Jb: 3,
                Ob: 4,
                Lb: 5,
                Mb: 6,
                Kb: 7,
                Ib: 8,
                Nb: 9,
                PROXY: 10,
                NOPROXY: 11,
                Gb: 12,
                Cb: 13,
                Db: 14,
                Bb: 15,
                Eb: 16,
                Fb: 17,
                ib: 18,
                hb: 19,
                jb: 20,
              }),
              (je.NO_ERROR = 0),
              (je.TIMEOUT = 8),
              (je.HTTP_ERROR = 6),
              (wn = je),
              (Ge.COMPLETE = "complete"),
              (vn = Ge),
              ((ke.EventType = Re).OPEN = "a"),
              (Re.CLOSE = "b"),
              (Re.ERROR = "c"),
              (Re.MESSAGE = "d"),
              (l.prototype.listen = l.prototype.K),
              (yn = ke),
              (x.prototype.listenOnce = x.prototype.L),
              (x.prototype.getLastError = x.prototype.Ka),
              (x.prototype.getLastErrorCode = x.prototype.Ba),
              (x.prototype.getStatus = x.prototype.Z),
              (x.prototype.getResponseJson = x.prototype.Oa),
              (x.prototype.getResponseText = x.prototype.oa),
              (x.prototype.send = x.prototype.ea),
              (x.prototype.setWithCredentials = x.prototype.Ha),
              (pn = x);
          }.apply(En),
          "@firebase/firestore");
      class o {
        constructor(e) {
          this.uid = e;
        }
        isAuthenticated() {
          return null != this.uid;
        }
        toKey() {
          return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user";
        }
        isEqual(e) {
          return e.uid === this.uid;
        }
      }
      (o.UNAUTHENTICATED = new o(null)),
        (o.GOOGLE_CREDENTIALS = new o("google-credentials-uid")),
        (o.FIRST_PARTY = new o("first-party-uid")),
        (o.MOCK_USER = new o("mock-user"));
      let ae = "11.0.2";
      const oe = new (class {
        constructor(e) {
          (this.name = e),
            (this._logLevel = X),
            (this._logHandler = ee),
            (this._userLogHandler = null);
        }
        get logLevel() {
          return this._logLevel;
        }
        set logLevel(e) {
          if (!(e in l))
            throw new TypeError(
              `Invalid value "${e}" assigned to \`logLevel\``
            );
          this._logLevel = e;
        }
        setLogLevel(e) {
          this._logLevel = "string" == typeof e ? Y[e] : e;
        }
        get logHandler() {
          return this._logHandler;
        }
        set logHandler(e) {
          if ("function" != typeof e)
            throw new TypeError(
              "Value assigned to `logHandler` must be a function"
            );
          this._logHandler = e;
        }
        get userLogHandler() {
          return this._userLogHandler;
        }
        set userLogHandler(e) {
          this._userLogHandler = e;
        }
        debug(...e) {
          this._userLogHandler && this._userLogHandler(this, l.DEBUG, ...e),
            this._logHandler(this, l.DEBUG, ...e);
        }
        log(...e) {
          this._userLogHandler && this._userLogHandler(this, l.VERBOSE, ...e),
            this._logHandler(this, l.VERBOSE, ...e);
        }
        info(...e) {
          this._userLogHandler && this._userLogHandler(this, l.INFO, ...e),
            this._logHandler(this, l.INFO, ...e);
        }
        warn(...e) {
          this._userLogHandler && this._userLogHandler(this, l.WARN, ...e),
            this._logHandler(this, l.WARN, ...e);
        }
        error(...e) {
          this._userLogHandler && this._userLogHandler(this, l.ERROR, ...e),
            this._logHandler(this, l.ERROR, ...e);
        }
      })("@firebase/firestore");
      function ue() {
        return oe.logLevel;
      }
      function m(e, ...t) {
        oe.logLevel <= l.DEBUG &&
          ((t = t.map(ce)), oe.debug(`Firestore (${ae}): ` + e, ...t));
      }
      function d(e, ...t) {
        oe.logLevel <= l.ERROR &&
          ((t = t.map(ce)), oe.error(`Firestore (${ae}): ` + e, ...t));
      }
      function he(e, ...t) {
        oe.logLevel <= l.WARN &&
          ((t = t.map(ce)), oe.warn(`Firestore (${ae}): ` + e, ...t));
      }
      function ce(t) {
        if ("string" == typeof t) return t;
        try {
          return JSON.stringify(t);
        } catch (e) {
          return t;
        }
      }
      function I(e = "Unexpected state") {
        e = `FIRESTORE (${ae}) INTERNAL ASSERTION FAILED: ` + e;
        throw (d(e), new Error(e));
      }
      function p(e) {
        e || I();
      }
      const w = {
        OK: "ok",
        CANCELLED: "cancelled",
        UNKNOWN: "unknown",
        INVALID_ARGUMENT: "invalid-argument",
        DEADLINE_EXCEEDED: "deadline-exceeded",
        NOT_FOUND: "not-found",
        ALREADY_EXISTS: "already-exists",
        PERMISSION_DENIED: "permission-denied",
        UNAUTHENTICATED: "unauthenticated",
        RESOURCE_EXHAUSTED: "resource-exhausted",
        FAILED_PRECONDITION: "failed-precondition",
        ABORTED: "aborted",
        OUT_OF_RANGE: "out-of-range",
        UNIMPLEMENTED: "unimplemented",
        INTERNAL: "internal",
        UNAVAILABLE: "unavailable",
        DATA_LOSS: "data-loss",
      };
      class _ extends K {
        constructor(e, t) {
          super(e, t),
            (this.code = e),
            (this.message = t),
            (this.toString = () =>
              `${this.name}: [code=${this.code}]: ` + this.message);
        }
      }
      class f {
        constructor() {
          this.promise = new Promise((e, t) => {
            (this.resolve = e), (this.reject = t);
          });
        }
      }
      class le {
        constructor(e, t) {
          (this.user = t),
            (this.type = "OAuth"),
            (this.headers = new Map()),
            this.headers.set("Authorization", "Bearer " + e);
        }
      }
      class de {
        getToken() {
          return Promise.resolve(null);
        }
        invalidateToken() {}
        start(e, t) {
          e.enqueueRetryable(() => t(o.UNAUTHENTICATED));
        }
        shutdown() {}
      }
      class fe {
        constructor(e) {
          (this.token = e), (this.changeListener = null);
        }
        getToken() {
          return Promise.resolve(this.token);
        }
        invalidateToken() {}
        start(e, t) {
          (this.changeListener = t),
            e.enqueueRetryable(() => t(this.token.user));
        }
        shutdown() {
          this.changeListener = null;
        }
      }
      class ge {
        constructor(e) {
          (this.t = e),
            (this.currentUser = o.UNAUTHENTICATED),
            (this.i = 0),
            (this.forceRefresh = !1),
            (this.auth = null);
        }
        start(t, n) {
          p(void 0 === this.o);
          let r = this.i;
          const s = (e) =>
            this.i !== r ? ((r = this.i), n(e)) : Promise.resolve();
          let i = new f();
          this.o = () => {
            this.i++,
              (this.currentUser = this.u()),
              i.resolve(),
              (i = new f()),
              t.enqueueRetryable(() => s(this.currentUser));
          };
          const a = () => {
              const e = i;
              t.enqueueRetryable(async () => {
                await e.promise, await s(this.currentUser);
              });
            },
            o = (e) => {
              m("FirebaseAuthCredentialsProvider", "Auth detected"),
                (this.auth = e),
                this.o && (this.auth.addAuthTokenListener(this.o), a());
            };
          this.t.onInit((e) => o(e)),
            setTimeout(() => {
              var e;
              this.auth ||
                ((e = this.t.getImmediate({ optional: !0 }))
                  ? o(e)
                  : (m(
                      "FirebaseAuthCredentialsProvider",
                      "Auth not yet detected"
                    ),
                    i.resolve(),
                    (i = new f())));
            }, 0),
            a();
        }
        getToken() {
          const t = this.i,
            e = this.forceRefresh;
          return (
            (this.forceRefresh = !1),
            this.auth
              ? this.auth
                  .getToken(e)
                  .then((e) =>
                    this.i !== t
                      ? (m(
                          "FirebaseAuthCredentialsProvider",
                          "getToken aborted due to token change."
                        ),
                        this.getToken())
                      : e
                      ? (p("string" == typeof e.accessToken),
                        new le(e.accessToken, this.currentUser))
                      : null
                  )
              : Promise.resolve(null)
          );
        }
        invalidateToken() {
          this.forceRefresh = !0;
        }
        shutdown() {
          this.auth && this.o && this.auth.removeAuthTokenListener(this.o),
            (this.o = void 0);
        }
        u() {
          var e = this.auth && this.auth.getUid();
          return p(null === e || "string" == typeof e), new o(e);
        }
      }
      class me {
        constructor(e, t, n) {
          (this.l = e),
            (this.h = t),
            (this.P = n),
            (this.type = "FirstParty"),
            (this.user = o.FIRST_PARTY),
            (this.T = new Map());
        }
        I() {
          return this.P ? this.P() : null;
        }
        get headers() {
          this.T.set("X-Goog-AuthUser", this.l);
          var e = this.I();
          return (
            e && this.T.set("Authorization", e),
            this.h && this.T.set("X-Goog-Iam-Authorization-Token", this.h),
            this.T
          );
        }
      }
      class pe {
        constructor(e, t, n) {
          (this.l = e), (this.h = t), (this.P = n);
        }
        getToken() {
          return Promise.resolve(new me(this.l, this.h, this.P));
        }
        start(e, t) {
          e.enqueueRetryable(() => t(o.FIRST_PARTY));
        }
        shutdown() {}
        invalidateToken() {}
      }
      class ye {
        constructor(e) {
          (this.value = e),
            (this.type = "AppCheck"),
            (this.headers = new Map()),
            e &&
              0 < e.length &&
              this.headers.set("x-firebase-appcheck", this.value);
        }
      }
      class ve {
        constructor(e) {
          (this.A = e),
            (this.forceRefresh = !1),
            (this.appCheck = null),
            (this.R = null);
        }
        start(t, n) {
          p(void 0 === this.o);
          const r = (e) => {
              null != e.error &&
                m(
                  "FirebaseAppCheckTokenProvider",
                  "Error getting App Check token; using placeholder token instead. Error: " +
                    e.error.message
                );
              var t = e.token !== this.R;
              return (
                (this.R = e.token),
                m(
                  "FirebaseAppCheckTokenProvider",
                  `Received ${t ? "new" : "existing"} token.`
                ),
                t ? n(e.token) : Promise.resolve()
              );
            },
            s =
              ((this.o = (e) => {
                t.enqueueRetryable(() => r(e));
              }),
              (e) => {
                m("FirebaseAppCheckTokenProvider", "AppCheck detected"),
                  (this.appCheck = e),
                  this.o && this.appCheck.addTokenListener(this.o);
              });
          this.A.onInit((e) => s(e)),
            setTimeout(() => {
              var e;
              this.appCheck ||
                ((e = this.A.getImmediate({ optional: !0 }))
                  ? s(e)
                  : m(
                      "FirebaseAppCheckTokenProvider",
                      "AppCheck not yet detected"
                    ));
            }, 0);
        }
        getToken() {
          var e = this.forceRefresh;
          return (
            (this.forceRefresh = !1),
            this.appCheck
              ? this.appCheck
                  .getToken(e)
                  .then((e) =>
                    e
                      ? (p("string" == typeof e.token),
                        (this.R = e.token),
                        new ye(e.token))
                      : null
                  )
              : Promise.resolve(null)
          );
        }
        invalidateToken() {
          this.forceRefresh = !0;
        }
        shutdown() {
          this.appCheck && this.o && this.appCheck.removeTokenListener(this.o),
            (this.o = void 0);
        }
      }
      class we {
        static newId() {
          var t =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            n = Math.floor(256 / t.length) * t.length;
          let r = "";
          for (; r.length < 20; ) {
            var s = (function () {
              const e =
                  "undefined" != typeof self && (self.crypto || self.msCrypto),
                t = new Uint8Array(40);
              if (e && "function" == typeof e.getRandomValues)
                e.getRandomValues(t);
              else
                for (let e = 0; e < 40; e++)
                  t[e] = Math.floor(256 * Math.random());
              return t;
            })();
            for (let e = 0; e < s.length; ++e)
              r.length < 20 && s[e] < n && (r += t.charAt(s[e] % t.length));
          }
          return r;
        }
      }
      function T(e, t) {
        return e < t ? -1 : t < e ? 1 : 0;
      }
      function _e(e, n, r) {
        return e.length === n.length && e.every((e, t) => r(e, n[t]));
      }
      function be(e) {
        return e + "\0";
      }
      class y {
        static now() {
          return y.fromMillis(Date.now());
        }
        static fromDate(e) {
          return y.fromMillis(e.getTime());
        }
        static fromMillis(e) {
          var t = Math.floor(e / 1e3),
            e = Math.floor(1e6 * (e - 1e3 * t));
          return new y(t, e);
        }
        constructor(e, t) {
          if (((this.seconds = e), (this.nanoseconds = t) < 0))
            throw new _(
              w.INVALID_ARGUMENT,
              "Timestamp nanoseconds out of range: " + t
            );
          if (1e9 <= t)
            throw new _(
              w.INVALID_ARGUMENT,
              "Timestamp nanoseconds out of range: " + t
            );
          if (e < -62135596800)
            throw new _(
              w.INVALID_ARGUMENT,
              "Timestamp seconds out of range: " + e
            );
          if (253402300800 <= e)
            throw new _(
              w.INVALID_ARGUMENT,
              "Timestamp seconds out of range: " + e
            );
        }
        toDate() {
          return new Date(this.toMillis());
        }
        toMillis() {
          return 1e3 * this.seconds + this.nanoseconds / 1e6;
        }
        _compareTo(e) {
          return this.seconds === e.seconds
            ? T(this.nanoseconds, e.nanoseconds)
            : T(this.seconds, e.seconds);
        }
        isEqual(e) {
          return (
            e.seconds === this.seconds && e.nanoseconds === this.nanoseconds
          );
        }
        toString() {
          return (
            "Timestamp(seconds=" +
            this.seconds +
            ", nanoseconds=" +
            this.nanoseconds +
            ")"
          );
        }
        toJSON() {
          return { seconds: this.seconds, nanoseconds: this.nanoseconds };
        }
        valueOf() {
          var e = this.seconds - -62135596800;
          return (
            String(e).padStart(12, "0") +
            "." +
            String(this.nanoseconds).padStart(9, "0")
          );
        }
      }
      class b {
        static fromTimestamp(e) {
          return new b(e);
        }
        static min() {
          return new b(new y(0, 0));
        }
        static max() {
          return new b(new y(253402300799, 999999999));
        }
        constructor(e) {
          this.timestamp = e;
        }
        compareTo(e) {
          return this.timestamp._compareTo(e.timestamp);
        }
        isEqual(e) {
          return this.timestamp.isEqual(e.timestamp);
        }
        toMicroseconds() {
          return (
            1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3
          );
        }
        toString() {
          return "SnapshotVersion(" + this.timestamp.toString() + ")";
        }
        toTimestamp() {
          return this.timestamp;
        }
      }
      class Ie {
        constructor(e, t, n) {
          void 0 === t ? (t = 0) : t > e.length && I(),
            void 0 === n ? (n = e.length - t) : n > e.length - t && I(),
            (this.segments = e),
            (this.offset = t),
            (this.len = n);
        }
        get length() {
          return this.len;
        }
        isEqual(e) {
          return 0 === Ie.comparator(this, e);
        }
        child(e) {
          const t = this.segments.slice(this.offset, this.limit());
          return (
            e instanceof Ie
              ? e.forEach((e) => {
                  t.push(e);
                })
              : t.push(e),
            this.construct(t)
          );
        }
        limit() {
          return this.offset + this.length;
        }
        popFirst(e) {
          return this.construct(
            this.segments,
            this.offset + (e = void 0 === e ? 1 : e),
            this.length - e
          );
        }
        popLast() {
          return this.construct(this.segments, this.offset, this.length - 1);
        }
        firstSegment() {
          return this.segments[this.offset];
        }
        lastSegment() {
          return this.get(this.length - 1);
        }
        get(e) {
          return this.segments[this.offset + e];
        }
        isEmpty() {
          return 0 === this.length;
        }
        isPrefixOf(t) {
          if (t.length < this.length) return !1;
          for (let e = 0; e < this.length; e++)
            if (this.get(e) !== t.get(e)) return !1;
          return !0;
        }
        isImmediateParentOf(t) {
          if (this.length + 1 !== t.length) return !1;
          for (let e = 0; e < this.length; e++)
            if (this.get(e) !== t.get(e)) return !1;
          return !0;
        }
        forEach(n) {
          for (let e = this.offset, t = this.limit(); e < t; e++)
            n(this.segments[e]);
        }
        toArray() {
          return this.segments.slice(this.offset, this.limit());
        }
        static comparator(t, n) {
          const r = Math.min(t.length, n.length);
          for (let e = 0; e < r; e++) {
            const r = t.get(e),
              s = n.get(e);
            if (r < s) return -1;
            if (r > s) return 1;
          }
          return t.length < n.length ? -1 : t.length > n.length ? 1 : 0;
        }
      }
      class E extends Ie {
        construct(e, t, n) {
          return new E(e, t, n);
        }
        canonicalString() {
          return this.toArray().join("/");
        }
        toString() {
          return this.canonicalString();
        }
        toUriEncodedString() {
          return this.toArray().map(encodeURIComponent).join("/");
        }
        static fromString(...e) {
          const t = [];
          for (const n of e) {
            if (0 <= n.indexOf("//"))
              throw new _(
                w.INVALID_ARGUMENT,
                `Invalid segment (${n}). Paths must not contain // in them.`
              );
            t.push(...n.split("/").filter((e) => 0 < e.length));
          }
          return new E(t);
        }
        static emptyPath() {
          return new E([]);
        }
      }
      const Te = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
      class c extends Ie {
        construct(e, t, n) {
          return new c(e, t, n);
        }
        static isValidIdentifier(e) {
          return Te.test(e);
        }
        canonicalString() {
          return this.toArray()
            .map(
              (e) => (
                (e = e.replace(/\\/g, "\\\\").replace(/`/g, "\\`")),
                (e = c.isValidIdentifier(e) ? e : "`" + e + "`")
              )
            )
            .join(".");
        }
        toString() {
          return this.canonicalString();
        }
        isKeyField() {
          return 1 === this.length && "__name__" === this.get(0);
        }
        static keyField() {
          return new c(["__name__"]);
        }
        static fromServerFormat(e) {
          const t = [];
          let n = "",
            r = 0;
          var s = () => {
            if (0 === n.length)
              throw new _(
                w.INVALID_ARGUMENT,
                `Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`
              );
            t.push(n), (n = "");
          };
          let i = !1;
          for (; r < e.length; ) {
            const t = e[r];
            if ("\\" === t) {
              if (r + 1 === e.length)
                throw new _(
                  w.INVALID_ARGUMENT,
                  "Path has trailing escape character: " + e
                );
              const t = e[r + 1];
              if ("\\" !== t && "." !== t && "`" !== t)
                throw new _(
                  w.INVALID_ARGUMENT,
                  "Path has invalid escape sequence: " + e
                );
              (n += t), (r += 2);
            } else "`" === t ? (i = !i) : "." !== t || i ? (n += t) : s(), r++;
          }
          if ((s(), i))
            throw new _(w.INVALID_ARGUMENT, "Unterminated ` in path: " + e);
          return new c(t);
        }
        static emptyPath() {
          return new c([]);
        }
      }
      class S {
        constructor(e) {
          this.path = e;
        }
        static fromPath(e) {
          return new S(E.fromString(e));
        }
        static fromName(e) {
          return new S(E.fromString(e).popFirst(5));
        }
        static empty() {
          return new S(E.emptyPath());
        }
        get collectionGroup() {
          return this.path.popLast().lastSegment();
        }
        hasCollectionId(e) {
          return (
            2 <= this.path.length && this.path.get(this.path.length - 2) === e
          );
        }
        getCollectionGroup() {
          return this.path.get(this.path.length - 2);
        }
        getCollectionPath() {
          return this.path.popLast();
        }
        isEqual(e) {
          return null !== e && 0 === E.comparator(this.path, e.path);
        }
        toString() {
          return this.path.toString();
        }
        static comparator(e, t) {
          return E.comparator(e.path, t.path);
        }
        static isDocumentKey(e) {
          return e.length % 2 == 0;
        }
        static fromSegments(e) {
          return new S(new E(e.slice()));
        }
      }
      class Ee {
        constructor(e, t, n, r) {
          (this.indexId = e),
            (this.collectionGroup = t),
            (this.fields = n),
            (this.indexState = r);
        }
      }
      function Se(e) {
        return e.fields.find((e) => 2 === e.kind);
      }
      function xe(e) {
        return e.fields.filter((e) => 2 !== e.kind);
      }
      Ee.UNKNOWN_ID = -1;
      class De {
        constructor(e, t) {
          (this.fieldPath = e), (this.kind = t);
        }
      }
      class Ae {
        constructor(e, t) {
          (this.sequenceNumber = e), (this.offset = t);
        }
        static empty() {
          return new Ae(0, ke.min());
        }
      }
      function Ce(e, t) {
        var n = e.toTimestamp().seconds,
          e = e.toTimestamp().nanoseconds + 1,
          e = b.fromTimestamp(1e9 === e ? new y(n + 1, 0) : new y(n, e));
        return new ke(e, S.empty(), t);
      }
      function Ne(e) {
        return new ke(e.readTime, e.key, -1);
      }
      class ke {
        constructor(e, t, n) {
          (this.readTime = e),
            (this.documentKey = t),
            (this.largestBatchId = n);
        }
        static min() {
          return new ke(b.min(), S.empty(), -1);
        }
        static max() {
          return new ke(b.max(), S.empty(), -1);
        }
      }
      function Re(e, t) {
        let n = e.readTime.compareTo(t.readTime);
        return 0 !== n
          ? n
          : 0 !== (n = S.comparator(e.documentKey, t.documentKey))
          ? n
          : T(e.largestBatchId, t.largestBatchId);
      }
      const Le =
        "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";
      class Oe {
        constructor() {
          this.onCommittedListeners = [];
        }
        addOnCommittedListener(e) {
          this.onCommittedListeners.push(e);
        }
        raiseOnCommittedEvent() {
          this.onCommittedListeners.forEach((e) => e());
        }
      }
      async function Me(e) {
        if (e.code !== w.FAILED_PRECONDITION || e.message !== Le) throw e;
        m("LocalStore", "Unexpectedly lost primary lease");
      }
      class x {
        constructor(e) {
          (this.nextCallback = null),
            (this.catchCallback = null),
            (this.result = void 0),
            (this.error = void 0),
            (this.isDone = !1),
            (this.callbackAttached = !1),
            e(
              (e) => {
                (this.isDone = !0),
                  (this.result = e),
                  this.nextCallback && this.nextCallback(e);
              },
              (e) => {
                (this.isDone = !0),
                  (this.error = e),
                  this.catchCallback && this.catchCallback(e);
              }
            );
        }
        catch(e) {
          return this.next(void 0, e);
        }
        next(r, s) {
          return (
            this.callbackAttached && I(),
            (this.callbackAttached = !0),
            this.isDone
              ? this.error
                ? this.wrapFailure(s, this.error)
                : this.wrapSuccess(r, this.result)
              : new x((t, n) => {
                  (this.nextCallback = (e) => {
                    this.wrapSuccess(r, e).next(t, n);
                  }),
                    (this.catchCallback = (e) => {
                      this.wrapFailure(s, e).next(t, n);
                    });
                })
          );
        }
        toPromise() {
          return new Promise((e, t) => {
            this.next(e, t);
          });
        }
        wrapUserFunction(e) {
          try {
            var t = e();
            return t instanceof x ? t : x.resolve(t);
          } catch (e) {
            return x.reject(e);
          }
        }
        wrapSuccess(e, t) {
          return e ? this.wrapUserFunction(() => e(t)) : x.resolve(t);
        }
        wrapFailure(e, t) {
          return e ? this.wrapUserFunction(() => e(t)) : x.reject(t);
        }
        static resolve(n) {
          return new x((e, t) => {
            e(n);
          });
        }
        static reject(n) {
          return new x((e, t) => {
            t(n);
          });
        }
        static waitFor(e) {
          return new x((t, n) => {
            let r = 0,
              s = 0,
              i = !1;
            e.forEach((e) => {
              ++r,
                e.next(
                  () => {
                    ++s, i && s === r && t();
                  },
                  (e) => n(e)
                );
            }),
              (i = !0),
              s === r && t();
          });
        }
        static or(e) {
          let t = x.resolve(!1);
          for (const n of e) t = t.next((e) => (e ? x.resolve(e) : n()));
          return t;
        }
        static forEach(e, n) {
          const r = [];
          return (
            e.forEach((e, t) => {
              r.push(n.call(this, e, t));
            }),
            this.waitFor(r)
          );
        }
        static mapArray(o, u) {
          return new x((t, n) => {
            const r = o.length,
              s = new Array(r);
            let i = 0;
            for (let e = 0; e < r; e++) {
              const a = e;
              u(o[a]).next(
                (e) => {
                  (s[a] = e), ++i === r && t(s);
                },
                (e) => n(e)
              );
            }
          });
        }
        static doWhile(r, s) {
          return new x((e, t) => {
            const n = () => {
              !0 === r()
                ? s().next(() => {
                    n();
                  }, t)
                : e();
            };
            n();
          });
        }
      }
      class Ve {
        static open(e, t, n, r) {
          try {
            return new Ve(t, e.transaction(r, n));
          } catch (e) {
            throw new Be(t, e);
          }
        }
        constructor(t, e) {
          (this.action = t),
            (this.transaction = e),
            (this.aborted = !1),
            (this.V = new f()),
            (this.transaction.oncomplete = () => {
              this.V.resolve();
            }),
            (this.transaction.onabort = () => {
              e.error ? this.V.reject(new Be(t, e.error)) : this.V.resolve();
            }),
            (this.transaction.onerror = (e) => {
              e = Ke(e.target.error);
              this.V.reject(new Be(t, e));
            });
        }
        get m() {
          return this.V.promise;
        }
        abort(e) {
          e && this.V.reject(e),
            this.aborted ||
              (m(
                "SimpleDb",
                "Aborting transaction:",
                e ? e.message : "Client-initiated abort"
              ),
              (this.aborted = !0),
              this.transaction.abort());
        }
        g() {
          const e = this.transaction;
          this.aborted || "function" != typeof e.commit || e.commit();
        }
        store(e) {
          e = this.transaction.objectStore(e);
          return new je(e);
        }
      }
      class Fe {
        static delete(e) {
          return (
            m("SimpleDb", "Removing database:", e),
            Ge(window.indexedDB.deleteDatabase(e)).toPromise()
          );
        }
        static p() {
          if (
            !(function () {
              try {
                return "object" == typeof indexedDB;
              } catch (e) {
                return;
              }
            })()
          )
            return !1;
          if (Fe.S()) return !0;
          const e = G(),
            t = Fe.D(e),
            n = 0 < t && t < 10,
            r = Pe(e),
            s = 0 < r && r < 4.5;
          return !(
            0 < e.indexOf("MSIE ") ||
            0 < e.indexOf("Trident/") ||
            0 < e.indexOf("Edge/") ||
            n ||
            s
          );
        }
        static S() {
          var e;
          return (
            "undefined" != typeof process &&
            "YES" === (null == (e = process.__PRIVATE_env) ? void 0 : e.v)
          );
        }
        static C(e, t) {
          return e.store(t);
        }
        static D(e) {
          const t = e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),
            n = t ? t[1].split("_").slice(0, 2).join(".") : "-1";
          return Number(n);
        }
        constructor(e, t, n) {
          (this.name = e),
            (this.version = t),
            (this.F = n),
            12.2 === Fe.D(G()) &&
              d(
                "Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround."
              );
        }
        async M(s) {
          return (
            this.db ||
              (m("SimpleDb", "Opening database:", this.name),
              (this.db = await new Promise((t, n) => {
                const r = indexedDB.open(this.name, this.version);
                (r.onsuccess = (e) => {
                  e = e.target.result;
                  t(e);
                }),
                  (r.onblocked = () => {
                    n(
                      new Be(
                        s,
                        "Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."
                      )
                    );
                  }),
                  (r.onerror = (e) => {
                    e = e.target.error;
                    "VersionError" === e.name
                      ? n(
                          new _(
                            w.FAILED_PRECONDITION,
                            "A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh."
                          )
                        )
                      : "InvalidStateError" === e.name
                      ? n(
                          new _(
                            w.FAILED_PRECONDITION,
                            "Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: " +
                              e
                          )
                        )
                      : n(new Be(s, e));
                  }),
                  (r.onupgradeneeded = (e) => {
                    m(
                      "SimpleDb",
                      'Database "' +
                        this.name +
                        '" requires upgrade from version:',
                      e.oldVersion
                    );
                    var t = e.target.result;
                    this.F.O(t, r.transaction, e.oldVersion, this.version).next(
                      () => {
                        m(
                          "SimpleDb",
                          "Database upgrade to version " +
                            this.version +
                            " complete"
                        );
                      }
                    );
                  });
              }))),
            this.N && (this.db.onversionchange = (e) => this.N(e)),
            this.db
          );
        }
        L(t) {
          (this.N = t), this.db && (this.db.onversionchange = (e) => t(e));
        }
        async runTransaction(e, t, n, r) {
          var s = "readonly" === t;
          let i = 0;
          for (;;) {
            ++i;
            try {
              this.db = await this.M(e);
              const t = Ve.open(this.db, e, s ? "readonly" : "readwrite", n),
                i = r(t)
                  .next((e) => (t.g(), e))
                  .catch((e) => (t.abort(e), x.reject(e)))
                  .toPromise();
              return i.catch(() => {}), await t.m, i;
            } catch (e) {
              const t = e,
                n = "FirebaseError" !== t.name && i < 3;
              if (
                (m(
                  "SimpleDb",
                  "Transaction failed with error:",
                  t.message,
                  "Retrying:",
                  n
                ),
                this.close(),
                !n)
              )
                return Promise.reject(t);
            }
          }
        }
        close() {
          this.db && this.db.close(), (this.db = void 0);
        }
      }
      function Pe(e) {
        const t = e.match(/Android ([\d.]+)/i),
          n = t ? t[1].split(".").slice(0, 2).join(".") : "-1";
        return Number(n);
      }
      class Ue {
        constructor(e) {
          (this.B = e), (this.k = !1), (this.q = null);
        }
        get isDone() {
          return this.k;
        }
        get K() {
          return this.q;
        }
        set cursor(e) {
          this.B = e;
        }
        done() {
          this.k = !0;
        }
        $(e) {
          this.q = e;
        }
        delete() {
          return Ge(this.B.delete());
        }
      }
      class Be extends _ {
        constructor(e, t) {
          super(w.UNAVAILABLE, `IndexedDB transaction '${e}' failed: ` + t),
            (this.name = "IndexedDbTransactionError");
        }
      }
      function qe(e) {
        return "IndexedDbTransactionError" === e.name;
      }
      class je {
        constructor(e) {
          this.store = e;
        }
        put(e, t) {
          return Ge(
            void 0 !== t
              ? (m("SimpleDb", "PUT", this.store.name, e, t),
                this.store.put(t, e))
              : (m("SimpleDb", "PUT", this.store.name, "<auto-key>", e),
                this.store.put(e))
          );
        }
        add(e) {
          return (
            m("SimpleDb", "ADD", this.store.name, e, e), Ge(this.store.add(e))
          );
        }
        get(t) {
          return Ge(this.store.get(t)).next(
            (e) => (
              m(
                "SimpleDb",
                "GET",
                this.store.name,
                t,
                (e = void 0 === e ? null : e)
              ),
              e
            )
          );
        }
        delete(e) {
          return (
            m("SimpleDb", "DELETE", this.store.name, e),
            Ge(this.store.delete(e))
          );
        }
        count() {
          return (
            m("SimpleDb", "COUNT", this.store.name), Ge(this.store.count())
          );
        }
        U(e, n) {
          const t = this.options(e, n),
            r = t.index ? this.store.index(t.index) : this.store;
          if ("function" == typeof r.getAll) {
            const e = r.getAll(t.range);
            return new x((t, n) => {
              (e.onerror = (e) => {
                n(e.target.error);
              }),
                (e.onsuccess = (e) => {
                  t(e.target.result);
                });
            });
          }
          {
            const e = this.cursor(t),
              n = [];
            return this.W(e, (e, t) => {
              n.push(t);
            }).next(() => n);
          }
        }
        G(e, t) {
          const r = this.store.getAll(e, null === t ? void 0 : t);
          return new x((t, n) => {
            (r.onerror = (e) => {
              n(e.target.error);
            }),
              (r.onsuccess = (e) => {
                t(e.target.result);
              });
          });
        }
        j(e, t) {
          m("SimpleDb", "DELETE ALL", this.store.name);
          const n = this.options(e, t);
          n.H = !1;
          e = this.cursor(n);
          return this.W(e, (e, t, n) => n.delete());
        }
        J(e, t) {
          let n;
          t ? (n = e) : ((n = {}), (t = e));
          e = this.cursor(n);
          return this.W(e, t);
        }
        Y(r) {
          const e = this.cursor({});
          return new x((n, t) => {
            (e.onerror = (e) => {
              e = Ke(e.target.error);
              t(e);
            }),
              (e.onsuccess = (e) => {
                const t = e.target.result;
                t
                  ? r(t.primaryKey, t.value).next((e) => {
                      e ? t.continue() : n();
                    })
                  : n();
              });
          });
        }
        W(e, i) {
          const a = [];
          return new x((s, t) => {
            (e.onerror = (e) => {
              t(e.target.error);
            }),
              (e.onsuccess = (e) => {
                const t = e.target.result;
                if (t) {
                  const n = new Ue(t),
                    r = i(t.primaryKey, t.value, n);
                  if (r instanceof x) {
                    const e = r.catch((e) => (n.done(), x.reject(e)));
                    a.push(e);
                  }
                  n.isDone
                    ? s()
                    : null === n.K
                    ? t.continue()
                    : t.continue(n.K);
                } else s();
              });
          }).next(() => x.waitFor(a));
        }
        options(e, t) {
          let n;
          return (
            void 0 !== e && ("string" == typeof e ? (n = e) : (t = e)),
            { index: n, range: t }
          );
        }
        cursor(e) {
          let t = "next";
          if ((e.reverse && (t = "prev"), e.index)) {
            const n = this.store.index(e.index);
            return e.H ? n.openKeyCursor(e.range, t) : n.openCursor(e.range, t);
          }
          return this.store.openCursor(e.range, t);
        }
      }
      function Ge(e) {
        return new x((t, n) => {
          (e.onsuccess = (e) => {
            e = e.target.result;
            t(e);
          }),
            (e.onerror = (e) => {
              e = Ke(e.target.error);
              n(e);
            });
        });
      }
      let ze = !1;
      function Ke(e) {
        const t = Fe.D(G());
        if (12.2 <= t && t < 13) {
          const t =
            "An internal error was encountered in the Indexed Database server";
          if (0 <= e.message.indexOf(t)) {
            const e = new _(
              "internal",
              `IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`
            );
            return (
              ze ||
                ((ze = !0),
                setTimeout(() => {
                  throw e;
                }, 0)),
              e
            );
          }
        }
        return e;
      }
      class Qe {
        constructor(e, t) {
          (this.asyncQueue = e), (this.Z = t), (this.task = null);
        }
        start() {
          this.X(15e3);
        }
        stop() {
          this.task && (this.task.cancel(), (this.task = null));
        }
        get started() {
          return null !== this.task;
        }
        X(e) {
          m("IndexBackfiller", `Scheduled in ${e}ms`),
            (this.task = this.asyncQueue.enqueueAfterDelay(
              "index_backfill",
              e,
              async () => {
                this.task = null;
                try {
                  m(
                    "IndexBackfiller",
                    "Documents written: " + (await this.Z.ee())
                  );
                } catch (e) {
                  qe(e)
                    ? m(
                        "IndexBackfiller",
                        "Ignoring IndexedDB error during index backfill: ",
                        e
                      )
                    : await Me(e);
                }
                await this.X(6e4);
              }
            ));
        }
      }
      class $e {
        constructor(e, t) {
          (this.localStore = e), (this.persistence = t);
        }
        async ee(t = 50) {
          return this.persistence.runTransaction(
            "Backfill Indexes",
            "readwrite-primary",
            (e) => this.te(e, t)
          );
        }
        te(e, t) {
          const n = new Set();
          let r = t,
            s = !0;
          return x
            .doWhile(
              () => !0 === s && 0 < r,
              () =>
                this.localStore.indexManager
                  .getNextCollectionGroupToUpdate(e)
                  .next((t) =>
                    null === t || n.has(t)
                      ? void (s = !1)
                      : (m("IndexBackfiller", "Processing collection: " + t),
                        this.ne(e, t, r).next((e) => {
                          (r -= e), n.add(t);
                        }))
                  )
            )
            .next(() => t - r);
        }
        ne(r, s, e) {
          return this.localStore.indexManager
            .getMinOffsetFromCollectionGroup(r, s)
            .next((n) =>
              this.localStore.localDocuments
                .getNextDocuments(r, s, n, e)
                .next((e) => {
                  const t = e.changes;
                  return this.localStore.indexManager
                    .updateIndexEntries(r, t)
                    .next(() => this.re(n, e))
                    .next(
                      (e) => (
                        m("IndexBackfiller", "Updating offset: " + e),
                        this.localStore.indexManager.updateCollectionGroup(
                          r,
                          s,
                          e
                        )
                      )
                    )
                    .next(() => t.size);
                })
            );
        }
        re(e, t) {
          let n = e;
          return (
            t.changes.forEach((e, t) => {
              t = Ne(t);
              0 < Re(t, n) && (n = t);
            }),
            new ke(
              n.readTime,
              n.documentKey,
              Math.max(t.batchId, e.largestBatchId)
            )
          );
        }
      }
      class He {
        constructor(e, t) {
          (this.previousValue = e),
            t &&
              ((t.sequenceNumberHandler = (e) => this.ie(e)),
              (this.se = (e) => t.writeSequenceNumber(e)));
        }
        ie(e) {
          return (
            (this.previousValue = Math.max(e, this.previousValue)),
            this.previousValue
          );
        }
        next() {
          var e = ++this.previousValue;
          return this.se && this.se(e), e;
        }
      }
      function We(e) {
        return null == e;
      }
      function Je(e) {
        return 0 === e && 1 / e == -1 / 0;
      }
      function Ye(e) {
        return (
          "number" == typeof e &&
          Number.isInteger(e) &&
          !Je(e) &&
          e <= Number.MAX_SAFE_INTEGER &&
          e >= Number.MIN_SAFE_INTEGER
        );
      }
      function u(t) {
        let s = "";
        for (let e = 0; e < t.length; e++)
          0 < s.length && (s = Xe(s)),
            (s = (function (t) {
              let n = s;
              const r = t.length;
              for (let e = 0; e < r; e++) {
                const r = t.charAt(e);
                switch (r) {
                  case "\0":
                    n += "";
                    break;
                  case "":
                    n += "";
                    break;
                  default:
                    n += r;
                }
              }
              return n;
            })(t.get(e)));
        return Xe(s);
      }
      function Xe(e) {
        return e + "";
      }
      function Ze(n) {
        const r = n.length;
        if ((p(2 <= r), 2 === r))
          return p("" === n.charAt(0) && "" === n.charAt(1)), E.emptyPath();
        const s = r - 2,
          i = [];
        let a = "";
        for (let t = 0; t < r; ) {
          const r = n.indexOf("", t);
          switch (((r < 0 || r > s) && I(), n.charAt(r + 1))) {
            case "":
              var o = n.substring(t, r);
              let e;
              0 === a.length ? (e = o) : ((a += o), (e = a), (a = "")),
                i.push(e);
              break;
            case "":
              a = a + n.substring(t, r) + "\0";
              break;
            case "":
              a += n.substring(t, r + 1);
              break;
            default:
              I();
          }
          t = r + 2;
        }
        return new E(i);
      }
      He.oe = -1;
      const et = ["userId", "batchId"];
      function tt(e, t) {
        return [e, u(t)];
      }
      function nt(e, t, n) {
        return [e, u(t), n];
      }
      const rt = {},
        st = ["prefixPath", "collectionGroup", "readTime", "documentId"],
        it = ["prefixPath", "collectionGroup", "documentId"],
        at = ["collectionGroup", "readTime", "prefixPath", "documentId"],
        ot = ["canonicalId", "targetId"],
        ut = ["targetId", "path"],
        ht = ["path", "targetId"],
        ct = ["collectionId", "parent"],
        lt = ["indexId", "uid"],
        dt = ["uid", "sequenceNumber"],
        ft = [
          "indexId",
          "uid",
          "arrayValue",
          "directionalValue",
          "orderedDocumentKey",
          "documentKey",
        ],
        gt = ["indexId", "uid", "orderedDocumentKey"],
        mt = ["userId", "collectionPath", "documentId"],
        pt = ["userId", "collectionPath", "largestBatchId"],
        yt = ["userId", "collectionGroup", "largestBatchId"],
        vt = [
          "mutationQueues",
          "mutations",
          "documentMutations",
          "remoteDocuments",
          "targets",
          "owner",
          "targetGlobal",
          "targetDocuments",
          "clientMetadata",
          "remoteDocumentGlobal",
          "collectionParents",
          "bundles",
          "namedQueries",
        ],
        wt = [...vt, "documentOverlays"],
        _t = [
          "mutationQueues",
          "mutations",
          "documentMutations",
          "remoteDocumentsV14",
          "targets",
          "owner",
          "targetGlobal",
          "targetDocuments",
          "clientMetadata",
          "remoteDocumentGlobal",
          "collectionParents",
          "bundles",
          "namedQueries",
          "documentOverlays",
        ],
        bt = _t,
        It = [...bt, "indexConfiguration", "indexState", "indexEntries"],
        Tt = It,
        Et = [...It, "globals"];
      class St extends Oe {
        constructor(e, t) {
          super(), (this._e = e), (this.currentSequenceNumber = t);
        }
      }
      function n(e, t) {
        return Fe.C(e._e, t);
      }
      function xt(e) {
        let t = 0;
        for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t++;
        return t;
      }
      function Dt(e, t) {
        for (const n in e)
          Object.prototype.hasOwnProperty.call(e, n) && t(n, e[n]);
      }
      function At(e) {
        for (const t in e)
          if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
        return !0;
      }
      class D {
        constructor(e, t) {
          (this.comparator = e), (this.root = t || i.EMPTY);
        }
        insert(e, t) {
          return new D(
            this.comparator,
            this.root
              .insert(e, t, this.comparator)
              .copy(null, null, i.BLACK, null, null)
          );
        }
        remove(e) {
          return new D(
            this.comparator,
            this.root
              .remove(e, this.comparator)
              .copy(null, null, i.BLACK, null, null)
          );
        }
        get(e) {
          let t = this.root;
          for (; !t.isEmpty(); ) {
            var n = this.comparator(e, t.key);
            if (0 === n) return t.value;
            n < 0 ? (t = t.left) : 0 < n && (t = t.right);
          }
          return null;
        }
        indexOf(e) {
          let t = 0,
            n = this.root;
          for (; !n.isEmpty(); ) {
            var r = this.comparator(e, n.key);
            if (0 === r) return t + n.left.size;
            n = r < 0 ? n.left : ((t += n.left.size + 1), n.right);
          }
          return -1;
        }
        isEmpty() {
          return this.root.isEmpty();
        }
        get size() {
          return this.root.size;
        }
        minKey() {
          return this.root.minKey();
        }
        maxKey() {
          return this.root.maxKey();
        }
        inorderTraversal(e) {
          return this.root.inorderTraversal(e);
        }
        forEach(n) {
          this.inorderTraversal((e, t) => (n(e, t), !1));
        }
        toString() {
          const n = [];
          return (
            this.inorderTraversal((e, t) => (n.push(e + ":" + t), !1)),
            `{${n.join(", ")}}`
          );
        }
        reverseTraversal(e) {
          return this.root.reverseTraversal(e);
        }
        getIterator() {
          return new Ct(this.root, null, this.comparator, !1);
        }
        getIteratorFrom(e) {
          return new Ct(this.root, e, this.comparator, !1);
        }
        getReverseIterator() {
          return new Ct(this.root, null, this.comparator, !0);
        }
        getReverseIteratorFrom(e) {
          return new Ct(this.root, e, this.comparator, !0);
        }
      }
      class Ct {
        constructor(e, t, n, r) {
          (this.isReverse = r), (this.nodeStack = []);
          let s = 1;
          for (; !e.isEmpty(); )
            if (((s = t ? n(e.key, t) : 1), t && r && (s *= -1), s < 0))
              e = this.isReverse ? e.left : e.right;
            else {
              if (0 === s) {
                this.nodeStack.push(e);
                break;
              }
              this.nodeStack.push(e), (e = this.isReverse ? e.right : e.left);
            }
        }
        getNext() {
          let e = this.nodeStack.pop();
          var t = { key: e.key, value: e.value };
          if (this.isReverse)
            for (e = e.left; !e.isEmpty(); )
              this.nodeStack.push(e), (e = e.right);
          else
            for (e = e.right; !e.isEmpty(); )
              this.nodeStack.push(e), (e = e.left);
          return t;
        }
        hasNext() {
          return 0 < this.nodeStack.length;
        }
        peek() {
          if (0 === this.nodeStack.length) return null;
          var e = this.nodeStack[this.nodeStack.length - 1];
          return { key: e.key, value: e.value };
        }
      }
      class i {
        constructor(e, t, n, r, s) {
          (this.key = e),
            (this.value = t),
            (this.color = null != n ? n : i.RED),
            (this.left = null != r ? r : i.EMPTY),
            (this.right = null != s ? s : i.EMPTY),
            (this.size = this.left.size + 1 + this.right.size);
        }
        copy(e, t, n, r, s) {
          return new i(
            null != e ? e : this.key,
            null != t ? t : this.value,
            null != n ? n : this.color,
            null != r ? r : this.left,
            null != s ? s : this.right
          );
        }
        isEmpty() {
          return !1;
        }
        inorderTraversal(e) {
          return (
            this.left.inorderTraversal(e) ||
            e(this.key, this.value) ||
            this.right.inorderTraversal(e)
          );
        }
        reverseTraversal(e) {
          return (
            this.right.reverseTraversal(e) ||
            e(this.key, this.value) ||
            this.left.reverseTraversal(e)
          );
        }
        min() {
          return this.left.isEmpty() ? this : this.left.min();
        }
        minKey() {
          return this.min().key;
        }
        maxKey() {
          return this.right.isEmpty() ? this.key : this.right.maxKey();
        }
        insert(e, t, n) {
          let r = this;
          var s = n(e, r.key);
          return (r =
            s < 0
              ? r.copy(null, null, null, r.left.insert(e, t, n), null)
              : 0 === s
              ? r.copy(null, t, null, null, null)
              : r.copy(
                  null,
                  null,
                  null,
                  null,
                  r.right.insert(e, t, n)
                )).fixUp();
        }
        removeMin() {
          if (this.left.isEmpty()) return i.EMPTY;
          let e = this;
          return (e = (e =
            e.left.isRed() || e.left.left.isRed() ? e : e.moveRedLeft()).copy(
            null,
            null,
            null,
            e.left.removeMin(),
            null
          )).fixUp();
        }
        remove(e, t) {
          let n,
            r = this;
          if (t(e, r.key) < 0)
            r = (r =
              r.left.isEmpty() || r.left.isRed() || r.left.left.isRed()
                ? r
                : r.moveRedLeft()).copy(
              null,
              null,
              null,
              r.left.remove(e, t),
              null
            );
          else {
            if (
              0 ===
              t(
                e,
                (r =
                  (r = r.left.isRed() ? r.rotateRight() : r).right.isEmpty() ||
                  r.right.isRed() ||
                  r.right.left.isRed()
                    ? r
                    : r.moveRedRight()).key
              )
            ) {
              if (r.right.isEmpty()) return i.EMPTY;
              (n = r.right.min()),
                (r = r.copy(n.key, n.value, null, null, r.right.removeMin()));
            }
            r = r.copy(null, null, null, null, r.right.remove(e, t));
          }
          return r.fixUp();
        }
        isRed() {
          return this.color;
        }
        fixUp() {
          let e = this;
          return (e =
            (e =
              (e =
                e.right.isRed() && !e.left.isRed()
                  ? e.rotateLeft()
                  : e).left.isRed() && e.left.left.isRed()
                ? e.rotateRight()
                : e).left.isRed() && e.right.isRed()
              ? e.colorFlip()
              : e);
        }
        moveRedLeft() {
          let e = this.colorFlip();
          return (e = e.right.left.isRed()
            ? (e = (e = e.copy(
                null,
                null,
                null,
                null,
                e.right.rotateRight()
              )).rotateLeft()).colorFlip()
            : e);
        }
        moveRedRight() {
          let e = this.colorFlip();
          return (e = e.left.left.isRed()
            ? (e = e.rotateRight()).colorFlip()
            : e);
        }
        rotateLeft() {
          var e = this.copy(null, null, i.RED, null, this.right.left);
          return this.right.copy(null, null, this.color, e, null);
        }
        rotateRight() {
          var e = this.copy(null, null, i.RED, this.left.right, null);
          return this.left.copy(null, null, this.color, null, e);
        }
        colorFlip() {
          var e = this.left.copy(null, null, !this.left.color, null, null),
            t = this.right.copy(null, null, !this.right.color, null, null);
          return this.copy(null, null, !this.color, e, t);
        }
        checkMaxDepth() {
          var e = this.check();
          return Math.pow(2, e) <= this.size + 1;
        }
        check() {
          if (this.isRed() && this.left.isRed()) throw I();
          if (this.right.isRed()) throw I();
          var e = this.left.check();
          if (e !== this.right.check()) throw I();
          return e + (this.isRed() ? 0 : 1);
        }
      }
      (i.EMPTY = null),
        (i.RED = !0),
        (i.BLACK = !1),
        (i.EMPTY = new (class {
          constructor() {
            this.size = 0;
          }
          get key() {
            throw I();
          }
          get value() {
            throw I();
          }
          get color() {
            throw I();
          }
          get left() {
            throw I();
          }
          get right() {
            throw I();
          }
          copy(e, t, n, r, s) {
            return this;
          }
          insert(e, t, n) {
            return new i(e, t);
          }
          remove(e, t) {
            return this;
          }
          isEmpty() {
            return !0;
          }
          inorderTraversal(e) {
            return !1;
          }
          reverseTraversal(e) {
            return !1;
          }
          minKey() {
            return null;
          }
          maxKey() {
            return null;
          }
          isRed() {
            return !1;
          }
          checkMaxDepth() {
            return !0;
          }
          check() {
            return 0;
          }
        })());
      class A {
        constructor(e) {
          (this.comparator = e), (this.data = new D(this.comparator));
        }
        has(e) {
          return null !== this.data.get(e);
        }
        first() {
          return this.data.minKey();
        }
        last() {
          return this.data.maxKey();
        }
        get size() {
          return this.data.size;
        }
        indexOf(e) {
          return this.data.indexOf(e);
        }
        forEach(n) {
          this.data.inorderTraversal((e, t) => (n(e), !1));
        }
        forEachInRange(e, t) {
          const n = this.data.getIteratorFrom(e[0]);
          for (; n.hasNext(); ) {
            var r = n.getNext();
            if (0 <= this.comparator(r.key, e[1])) return;
            t(r.key);
          }
        }
        forEachWhile(e, t) {
          let n;
          for (
            n =
              void 0 !== t
                ? this.data.getIteratorFrom(t)
                : this.data.getIterator();
            n.hasNext();

          )
            if (!e(n.getNext().key)) return;
        }
        firstAfterOrEqual(e) {
          const t = this.data.getIteratorFrom(e);
          return t.hasNext() ? t.getNext().key : null;
        }
        getIterator() {
          return new Nt(this.data.getIterator());
        }
        getIteratorFrom(e) {
          return new Nt(this.data.getIteratorFrom(e));
        }
        add(e) {
          return this.copy(this.data.remove(e).insert(e, !0));
        }
        delete(e) {
          return this.has(e) ? this.copy(this.data.remove(e)) : this;
        }
        isEmpty() {
          return this.data.isEmpty();
        }
        unionWith(e) {
          let t = this;
          return (
            t.size < e.size && ((t = e), (e = this)),
            e.forEach((e) => {
              t = t.add(e);
            }),
            t
          );
        }
        isEqual(e) {
          if (!(e instanceof A)) return !1;
          if (this.size !== e.size) return !1;
          const t = this.data.getIterator(),
            n = e.data.getIterator();
          for (; t.hasNext(); ) {
            const e = t.getNext().key,
              r = n.getNext().key;
            if (0 !== this.comparator(e, r)) return !1;
          }
          return !0;
        }
        toArray() {
          const t = [];
          return (
            this.forEach((e) => {
              t.push(e);
            }),
            t
          );
        }
        toString() {
          const t = [];
          return (
            this.forEach((e) => t.push(e)), "SortedSet(" + t.toString() + ")"
          );
        }
        copy(e) {
          const t = new A(this.comparator);
          return (t.data = e), t;
        }
      }
      class Nt {
        constructor(e) {
          this.iter = e;
        }
        getNext() {
          return this.iter.getNext().key;
        }
        hasNext() {
          return this.iter.hasNext();
        }
      }
      function kt(e) {
        return e.hasNext() ? e.getNext() : void 0;
      }
      class Rt {
        constructor(e) {
          (this.fields = e).sort(c.comparator);
        }
        static empty() {
          return new Rt([]);
        }
        unionWith(e) {
          let t = new A(c.comparator);
          for (const e of this.fields) t = t.add(e);
          for (const n of e) t = t.add(n);
          return new Rt(t.toArray());
        }
        covers(e) {
          for (const t of this.fields) if (t.isPrefixOf(e)) return !0;
          return !1;
        }
        isEqual(e) {
          return _e(this.fields, e.fields, (e, t) => e.isEqual(t));
        }
      }
      class Lt extends Error {
        constructor() {
          super(...arguments), (this.name = "Base64DecodeError");
        }
      }
      class C {
        constructor(e) {
          this.binaryString = e;
        }
        static fromBase64String(e) {
          e = (function (e) {
            try {
              return atob(e);
            } catch (e) {
              throw "undefined" != typeof DOMException &&
                e instanceof DOMException
                ? new Lt("Invalid base64 string: " + e)
                : e;
            }
          })(e);
          return new C(e);
        }
        static fromUint8Array(e) {
          e = (function (t) {
            let n = "";
            for (let e = 0; e < t.length; ++e) n += String.fromCharCode(t[e]);
            return n;
          })(e);
          return new C(e);
        }
        [Symbol.iterator]() {
          let e = 0;
          return {
            next: () =>
              e < this.binaryString.length
                ? { value: this.binaryString.charCodeAt(e++), done: !1 }
                : { value: void 0, done: !0 },
          };
        }
        toBase64() {
          return (e = this.binaryString), btoa(e);
          var e;
        }
        toUint8Array() {
          {
            var t = this.binaryString;
            const n = new Uint8Array(t.length);
            for (let e = 0; e < t.length; e++) n[e] = t.charCodeAt(e);
            return n;
          }
        }
        approximateByteSize() {
          return 2 * this.binaryString.length;
        }
        compareTo(e) {
          return T(this.binaryString, e.binaryString);
        }
        isEqual(e) {
          return this.binaryString === e.binaryString;
        }
      }
      C.EMPTY_BYTE_STRING = new C("");
      const Ot = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
      function Mt(t) {
        if ((p(!!t), "string" != typeof t))
          return { seconds: N(t.seconds), nanos: N(t.nanos) };
        {
          let e = 0;
          var n = Ot.exec(t);
          p(!!n),
            n[1] && ((n = (n[1] + "000000000").substr(0, 9)), (e = Number(n)));
          const r = new Date(t);
          return { seconds: Math.floor(r.getTime() / 1e3), nanos: e };
        }
      }
      function N(e) {
        return "number" == typeof e ? e : "string" == typeof e ? Number(e) : 0;
      }
      function Vt(e) {
        return "string" == typeof e
          ? C.fromBase64String(e)
          : C.fromUint8Array(e);
      }
      function Ft(e) {
        return (
          "server_timestamp" ===
          (null ==
          (e = (
            (null == (e = null == e ? void 0 : e.mapValue)
              ? void 0
              : e.fields) || {}
          ).__type__)
            ? void 0
            : e.stringValue)
        );
      }
      function Pt(e) {
        e = e.mapValue.fields.__previous_value__;
        return Ft(e) ? Pt(e) : e;
      }
      function Ut(e) {
        e = Mt(e.mapValue.fields.__local_write_time__.timestampValue);
        return new y(e.seconds, e.nanos);
      }
      class Bt {
        constructor(e, t, n, r, s, i, a, o, u) {
          (this.databaseId = e),
            (this.appId = t),
            (this.persistenceKey = n),
            (this.host = r),
            (this.ssl = s),
            (this.forceLongPolling = i),
            (this.autoDetectLongPolling = a),
            (this.longPollingOptions = o),
            (this.useFetchStreams = u);
        }
      }
      class qt {
        constructor(e, t) {
          (this.projectId = e), (this.database = t || "(default)");
        }
        static empty() {
          return new qt("", "");
        }
        get isDefaultDatabase() {
          return "(default)" === this.database;
        }
        isEqual(e) {
          return (
            e instanceof qt &&
            e.projectId === this.projectId &&
            e.database === this.database
          );
        }
      }
      const jt = {
          mapValue: { fields: { __type__: { stringValue: "__max__" } } },
        },
        Gt = { nullValue: "NULL_VALUE" };
      function zt(e) {
        return "nullValue" in e
          ? 0
          : "booleanValue" in e
          ? 1
          : "integerValue" in e || "doubleValue" in e
          ? 2
          : "timestampValue" in e
          ? 3
          : "stringValue" in e
          ? 5
          : "bytesValue" in e
          ? 6
          : "referenceValue" in e
          ? 7
          : "geoPointValue" in e
          ? 8
          : "arrayValue" in e
          ? 9
          : "mapValue" in e
          ? Ft(e)
            ? 4
            : an(e)
            ? 9007199254740991
            : rn(e)
            ? 10
            : 11
          : I();
      }
      function Kt(e, t) {
        if (e === t) return !0;
        var n,
          r = zt(e);
        if (r !== zt(t)) return !1;
        switch (r) {
          case 0:
          case 9007199254740991:
            return !0;
          case 1:
            return e.booleanValue === t.booleanValue;
          case 4:
            return Ut(e).isEqual(Ut(t));
          case 3:
            var s = t;
            if (
              "string" == typeof e.timestampValue &&
              "string" == typeof s.timestampValue &&
              e.timestampValue.length === s.timestampValue.length
            )
              return e.timestampValue === s.timestampValue;
            var i = Mt(e.timestampValue),
              s = Mt(s.timestampValue);
            return i.seconds === s.seconds && i.nanos === s.nanos;
          case 5:
            return e.stringValue === t.stringValue;
          case 6:
            return (n = t), Vt(e.bytesValue).isEqual(Vt(n.bytesValue));
          case 7:
            return e.referenceValue === t.referenceValue;
          case 8:
            return (
              (i = t),
              N((n = e).geoPointValue.latitude) ===
                N(i.geoPointValue.latitude) &&
                N(n.geoPointValue.longitude) === N(i.geoPointValue.longitude)
            );
          case 2:
            return (
              (s = t),
              "integerValue" in (n = e) && "integerValue" in s
                ? N(n.integerValue) === N(s.integerValue)
                : "doubleValue" in n &&
                  "doubleValue" in s &&
                  ((n = N(n.doubleValue)) === (s = N(s.doubleValue))
                    ? Je(n) === Je(s)
                    : isNaN(n) && isNaN(s))
            );
          case 9:
            return _e(e.arrayValue.values || [], t.arrayValue.values || [], Kt);
          case 10:
          case 11: {
            var a = e;
            const o = a.mapValue.fields || {},
              u = t.mapValue.fields || {};
            if (xt(o) !== xt(u)) return !1;
            for (const a in o)
              if (o.hasOwnProperty(a) && (void 0 === u[a] || !Kt(o[a], u[a])))
                return !1;
            return !0;
            return;
          }
          default:
            return I();
        }
      }
      function Qt(e, t) {
        return void 0 !== (e.values || []).find((e) => Kt(e, t));
      }
      function $t(e, t) {
        if (e === t) return 0;
        var n,
          r,
          s,
          i,
          a,
          o = zt(e),
          u = zt(t);
        if (o !== u) return T(o, u);
        switch (o) {
          case 0:
          case 9007199254740991:
            return 0;
          case 1:
            return T(e.booleanValue, t.booleanValue);
          case 2:
            return (
              (a = t),
              (i = N(e.integerValue || e.doubleValue)) <
              (a = N(a.integerValue || a.doubleValue))
                ? -1
                : a < i
                ? 1
                : i === a
                ? 0
                : isNaN(i)
                ? isNaN(a)
                  ? 0
                  : -1
                : 1
            );
          case 3:
            return Ht(e.timestampValue, t.timestampValue);
          case 4:
            return Ht(Ut(e), Ut(t));
          case 5:
            return T(e.stringValue, t.stringValue);
          case 6: {
            var h = e.bytesValue;
            var c = t.bytesValue;
            const p = Vt(h),
              y = Vt(c);
            return p.compareTo(y);
            return;
          }
          case 7:
            var h = e.referenceValue,
              l = t.referenceValue,
              d = h.split("/"),
              f = l.split("/");
            for (let e = 0; e < d.length && e < f.length; e++) {
              const l = T(d[e], f[e]);
              if (0 !== l) return l;
            }
            return T(d.length, f.length);
          case 8:
            return (
              (n = e.geoPointValue),
              (r = t.geoPointValue),
              0 !== (s = T(N(n.latitude), N(r.latitude)))
                ? s
                : T(N(n.longitude), N(r.longitude))
            );
          case 9:
            return Wt(e.arrayValue, t.arrayValue);
          case 10:
            return (
              (n = e.mapValue),
              (r = t.mapValue),
              (i = n.fields || {}),
              (a = r.fields || {}),
              (i = null == (s = i.value) ? void 0 : s.arrayValue),
              (a = null == (s = a.value) ? void 0 : s.arrayValue),
              0 !==
              (s = T(
                (null == (s = null == i ? void 0 : i.values)
                  ? void 0
                  : s.length) || 0,
                (null == (s = null == a ? void 0 : a.values)
                  ? void 0
                  : s.length) || 0
              ))
                ? s
                : Wt(i, a)
            );
          case 11: {
            c = e.mapValue;
            var g = t.mapValue;
            if (c === jt.mapValue && g === jt.mapValue) return 0;
            if (c === jt.mapValue) return 1;
            if (g === jt.mapValue) return -1;
            const v = c.fields || {},
              w = Object.keys(v),
              _ = g.fields || {},
              b = Object.keys(_);
            w.sort(), b.sort();
            for (let e = 0; e < w.length && e < b.length; ++e) {
              const g = T(w[e], b[e]);
              if (0 !== g) return g;
              var m = $t(v[w[e]], _[b[e]]);
              if (0 !== m) return m;
            }
            return T(w.length, b.length);
            return;
          }
          default:
            throw I();
        }
      }
      function Ht(e, t) {
        if (
          "string" == typeof e &&
          "string" == typeof t &&
          e.length === t.length
        )
          return T(e, t);
        var e = Mt(e),
          t = Mt(t),
          n = T(e.seconds, t.seconds);
        return 0 !== n ? n : T(e.nanos, t.nanos);
      }
      function Wt(e, t) {
        var n = e.values || [],
          r = t.values || [];
        for (let e = 0; e < n.length && e < r.length; ++e) {
          const t = $t(n[e], r[e]);
          if (t) return t;
        }
        return T(n.length, r.length);
      }
      function Jt(e) {
        return (function n(r) {
          {
            if ("nullValue" in r) return "null";
            if ("booleanValue" in r) return "" + r.booleanValue;
            if ("integerValue" in r) return "" + r.integerValue;
            if ("doubleValue" in r) return "" + r.doubleValue;
            if ("timestampValue" in r)
              return `time(${(t = Mt(r.timestampValue)).seconds},${t.nanos})`;
            if ("stringValue" in r) return r.stringValue;
            if ("bytesValue" in r) return Vt(r.bytesValue).toBase64();
            if ("referenceValue" in r)
              return (t = r.referenceValue), S.fromName(t).toString();
            if ("geoPointValue" in r)
              return `geo(${(e = r.geoPointValue).latitude},${e.longitude})`;
            if ("arrayValue" in r) {
              let e = "[",
                t = !0;
              for (const i of r.arrayValue.values || [])
                t ? (t = !1) : (e += ","), (e += n(i));
              return e + "]";
            }
            if ("mapValue" in r) {
              var s = r.mapValue;
              let e = "{",
                t = !0;
              for (const a of Object.keys(s.fields || {}).sort())
                t ? (t = !1) : (e += ","), (e += a + ":" + n(s.fields[a]));
              return e + "}";
            }
            return I();
          }
          var e, t;
        })(e);
      }
      function Yt(e, t) {
        return {
          referenceValue:
            `projects/${e.projectId}/databases/${e.database}/documents/` +
            t.path.canonicalString(),
        };
      }
      function Xt(e) {
        return e && "integerValue" in e;
      }
      function Zt(e) {
        return !!e && "arrayValue" in e;
      }
      function en(e) {
        return e && "nullValue" in e;
      }
      function tn(e) {
        return e && "doubleValue" in e && isNaN(Number(e.doubleValue));
      }
      function nn(e) {
        return e && "mapValue" in e;
      }
      function rn(e) {
        return (
          "__vector__" ===
          (null ==
          (e = (
            (null == (e = null == e ? void 0 : e.mapValue)
              ? void 0
              : e.fields) || {}
          ).__type__)
            ? void 0
            : e.stringValue)
        );
      }
      function sn(t) {
        if (t.geoPointValue)
          return { geoPointValue: Object.assign({}, t.geoPointValue) };
        if (t.timestampValue && "object" == typeof t.timestampValue)
          return { timestampValue: Object.assign({}, t.timestampValue) };
        if (t.mapValue) {
          const n = { mapValue: { fields: {} } };
          return (
            Dt(t.mapValue.fields, (e, t) => (n.mapValue.fields[e] = sn(t))), n
          );
        }
        if (t.arrayValue) {
          const r = { arrayValue: { values: [] } };
          for (let e = 0; e < (t.arrayValue.values || []).length; ++e)
            r.arrayValue.values[e] = sn(t.arrayValue.values[e]);
          return r;
        }
        return Object.assign({}, t);
      }
      function an(e) {
        return (
          "__max__" ===
          (((e.mapValue || {}).fields || {}).__type__ || {}).stringValue
        );
      }
      const on = {
        mapValue: {
          fields: {
            __type__: { stringValue: "__vector__" },
            value: { arrayValue: {} },
          },
        },
      };
      function un(e, t) {
        var n = $t(e.value, t.value);
        return 0 !== n
          ? n
          : e.inclusive && !t.inclusive
          ? -1
          : !e.inclusive && t.inclusive
          ? 1
          : 0;
      }
      function hn(e, t) {
        var n = $t(e.value, t.value);
        return 0 !== n
          ? n
          : e.inclusive && !t.inclusive
          ? 1
          : !e.inclusive && t.inclusive
          ? -1
          : 0;
      }
      class k {
        constructor(e) {
          this.value = e;
        }
        static empty() {
          return new k({ mapValue: {} });
        }
        field(n) {
          if (n.isEmpty()) return this.value;
          {
            let t = this.value;
            for (let e = 0; e < n.length - 1; ++e)
              if (!nn((t = (t.mapValue.fields || {})[n.get(e)]))) return null;
            return (t = (t.mapValue.fields || {})[n.lastSegment()]) || null;
          }
        }
        set(e, t) {
          this.getFieldsMap(e.popLast())[e.lastSegment()] = sn(t);
        }
        setAll(e) {
          let n = c.emptyPath(),
            r = {},
            s = [];
          e.forEach((e, t) => {
            if (!n.isImmediateParentOf(t)) {
              const e = this.getFieldsMap(n);
              this.applyChanges(e, r, s), (r = {}), (s = []), (n = t.popLast());
            }
            e ? (r[t.lastSegment()] = sn(e)) : s.push(t.lastSegment());
          });
          e = this.getFieldsMap(n);
          this.applyChanges(e, r, s);
        }
        delete(e) {
          const t = this.field(e.popLast());
          nn(t) &&
            t.mapValue.fields &&
            delete t.mapValue.fields[e.lastSegment()];
        }
        isEqual(e) {
          return Kt(this.value, e.value);
        }
        getFieldsMap(n) {
          let r = this.value;
          r.mapValue.fields || (r.mapValue = { fields: {} });
          for (let t = 0; t < n.length; ++t) {
            let e = r.mapValue.fields[n.get(t)];
            (nn(e) && e.mapValue.fields) ||
              ((e = { mapValue: { fields: {} } }),
              (r.mapValue.fields[n.get(t)] = e)),
              (r = e);
          }
          return r.mapValue.fields;
        }
        applyChanges(n, e, t) {
          Dt(e, (e, t) => (n[e] = t));
          for (const e of t) delete n[e];
        }
        clone() {
          return new k(sn(this.value));
        }
      }
      class R {
        constructor(e, t, n, r, s, i, a) {
          (this.key = e),
            (this.documentType = t),
            (this.version = n),
            (this.readTime = r),
            (this.createTime = s),
            (this.data = i),
            (this.documentState = a);
        }
        static newInvalidDocument(e) {
          return new R(e, 0, b.min(), b.min(), b.min(), k.empty(), 0);
        }
        static newFoundDocument(e, t, n, r) {
          return new R(e, 1, t, b.min(), n, r, 0);
        }
        static newNoDocument(e, t) {
          return new R(e, 2, t, b.min(), b.min(), k.empty(), 0);
        }
        static newUnknownDocument(e, t) {
          return new R(e, 3, t, b.min(), b.min(), k.empty(), 2);
        }
        convertToFoundDocument(e, t) {
          return (
            !this.createTime.isEqual(b.min()) ||
              (2 !== this.documentType && 0 !== this.documentType) ||
              (this.createTime = e),
            (this.version = e),
            (this.documentType = 1),
            (this.data = t),
            (this.documentState = 0),
            this
          );
        }
        convertToNoDocument(e) {
          return (
            (this.version = e),
            (this.documentType = 2),
            (this.data = k.empty()),
            (this.documentState = 0),
            this
          );
        }
        convertToUnknownDocument(e) {
          return (
            (this.version = e),
            (this.documentType = 3),
            (this.data = k.empty()),
            (this.documentState = 2),
            this
          );
        }
        setHasCommittedMutations() {
          return (this.documentState = 2), this;
        }
        setHasLocalMutations() {
          return (this.documentState = 1), (this.version = b.min()), this;
        }
        setReadTime(e) {
          return (this.readTime = e), this;
        }
        get hasLocalMutations() {
          return 1 === this.documentState;
        }
        get hasCommittedMutations() {
          return 2 === this.documentState;
        }
        get hasPendingWrites() {
          return this.hasLocalMutations || this.hasCommittedMutations;
        }
        isValidDocument() {
          return 0 !== this.documentType;
        }
        isFoundDocument() {
          return 1 === this.documentType;
        }
        isNoDocument() {
          return 2 === this.documentType;
        }
        isUnknownDocument() {
          return 3 === this.documentType;
        }
        isEqual(e) {
          return (
            e instanceof R &&
            this.key.isEqual(e.key) &&
            this.version.isEqual(e.version) &&
            this.documentType === e.documentType &&
            this.documentState === e.documentState &&
            this.data.isEqual(e.data)
          );
        }
        mutableCopy() {
          return new R(
            this.key,
            this.documentType,
            this.version,
            this.readTime,
            this.createTime,
            this.data.clone(),
            this.documentState
          );
        }
        toString() {
          return `Document(${this.key}, ${this.version}, ${JSON.stringify(
            this.data.value
          )}, {createTime: ${this.createTime}}), {documentType: ${
            this.documentType
          }}), {documentState: ${this.documentState}})`;
        }
      }
      class cn {
        constructor(e, t) {
          (this.position = e), (this.inclusive = t);
        }
      }
      function ln(t, n, r) {
        let s = 0;
        for (let e = 0; e < t.position.length; e++) {
          const i = n[e],
            a = t.position[e];
          if (
            ((s = i.field.isKeyField()
              ? S.comparator(S.fromName(a.referenceValue), r.key)
              : $t(a, r.data.field(i.field))),
            "desc" === i.dir && (s *= -1),
            0 !== s)
          )
            break;
        }
        return s;
      }
      function dn(t, n) {
        if (null === t) return null === n;
        if (null === n) return !1;
        if (
          t.inclusive !== n.inclusive ||
          t.position.length !== n.position.length
        )
          return !1;
        for (let e = 0; e < t.position.length; e++)
          if (!Kt(t.position[e], n.position[e])) return !1;
        return !0;
      }
      class fn {
        constructor(e, t = "asc") {
          (this.field = e), (this.dir = t);
        }
      }
      class gn {}
      class L extends gn {
        constructor(e, t, n) {
          super(), (this.field = e), (this.op = t), (this.value = n);
        }
        static create(e, t, n) {
          return e.isKeyField()
            ? "in" === t || "not-in" === t
              ? this.createKeyFieldInFilter(e, t, n)
              : new Nn(e, t, n)
            : "array-contains" === t
            ? new On(e, n)
            : "in" === t
            ? new Mn(e, n)
            : "not-in" === t
            ? new Vn(e, n)
            : "array-contains-any" === t
            ? new Fn(e, n)
            : new L(e, t, n);
        }
        static createKeyFieldInFilter(e, t, n) {
          return new ("in" === t ? kn : Rn)(e, n);
        }
        matches(e) {
          e = e.data.field(this.field);
          return "!=" === this.op
            ? null !== e && this.matchesComparison($t(e, this.value))
            : null !== e &&
                zt(this.value) === zt(e) &&
                this.matchesComparison($t(e, this.value));
        }
        matchesComparison(e) {
          switch (this.op) {
            case "<":
              return e < 0;
            case "<=":
              return e <= 0;
            case "==":
              return 0 === e;
            case "!=":
              return 0 !== e;
            case ">":
              return 0 < e;
            case ">=":
              return 0 <= e;
            default:
              return I();
          }
        }
        isInequality() {
          return 0 <= ["<", "<=", ">", ">=", "!=", "not-in"].indexOf(this.op);
        }
        getFlattenedFilters() {
          return [this];
        }
        getFilters() {
          return [this];
        }
      }
      class O extends gn {
        constructor(e, t) {
          super(), (this.filters = e), (this.op = t), (this.ae = null);
        }
        static create(e, t) {
          return new O(e, t);
        }
        matches(t) {
          return mn(this)
            ? void 0 === this.filters.find((e) => !e.matches(t))
            : void 0 !== this.filters.find((e) => e.matches(t));
        }
        getFlattenedFilters() {
          return (
            null === this.ae &&
              (this.ae = this.filters.reduce(
                (e, t) => e.concat(t.getFlattenedFilters()),
                []
              )),
            this.ae
          );
        }
        getFilters() {
          return Object.assign([], this.filters);
        }
      }
      function mn(e) {
        return "and" === e.op;
      }
      function Sn(e) {
        return "or" === e.op;
      }
      function xn(e) {
        return Dn(e) && mn(e);
      }
      function Dn(e) {
        for (const t of e.filters) if (t instanceof O) return !1;
        return !0;
      }
      function An(e, t) {
        t = e.filters.concat(t);
        return O.create(t, e.op);
      }
      function Cn(e) {
        return e instanceof L
          ? `${(t = e).field.canonicalString()} ${t.op} ` + Jt(t.value)
          : e instanceof O
          ? e.op.toString() + " {" + e.getFilters().map(Cn).join(" ,") + "}"
          : "Filter";
        var t;
      }
      class Nn extends L {
        constructor(e, t, n) {
          super(e, t, n), (this.key = S.fromName(n.referenceValue));
        }
        matches(e) {
          e = S.comparator(e.key, this.key);
          return this.matchesComparison(e);
        }
      }
      class kn extends L {
        constructor(e, t) {
          super(e, "in", t), (this.keys = Ln(0, t));
        }
        matches(t) {
          return this.keys.some((e) => e.isEqual(t.key));
        }
      }
      class Rn extends L {
        constructor(e, t) {
          super(e, "not-in", t), (this.keys = Ln(0, t));
        }
        matches(t) {
          return !this.keys.some((e) => e.isEqual(t.key));
        }
      }
      function Ln(e, t) {
        return ((null == (t = t.arrayValue) ? void 0 : t.values) || []).map(
          (e) => S.fromName(e.referenceValue)
        );
      }
      class On extends L {
        constructor(e, t) {
          super(e, "array-contains", t);
        }
        matches(e) {
          e = e.data.field(this.field);
          return Zt(e) && Qt(e.arrayValue, this.value);
        }
      }
      class Mn extends L {
        constructor(e, t) {
          super(e, "in", t);
        }
        matches(e) {
          e = e.data.field(this.field);
          return null !== e && Qt(this.value.arrayValue, e);
        }
      }
      class Vn extends L {
        constructor(e, t) {
          super(e, "not-in", t);
        }
        matches(e) {
          if (Qt(this.value.arrayValue, { nullValue: "NULL_VALUE" })) return !1;
          e = e.data.field(this.field);
          return null !== e && !Qt(this.value.arrayValue, e);
        }
      }
      class Fn extends L {
        constructor(e, t) {
          super(e, "array-contains-any", t);
        }
        matches(e) {
          const t = e.data.field(this.field);
          return (
            !(!Zt(t) || !t.arrayValue.values) &&
            t.arrayValue.values.some((e) => Qt(this.value.arrayValue, e))
          );
        }
      }
      class Pn {
        constructor(e, t = null, n = [], r = [], s = null, i = null, a = null) {
          (this.path = e),
            (this.collectionGroup = t),
            (this.orderBy = n),
            (this.filters = r),
            (this.limit = s),
            (this.startAt = i),
            (this.endAt = a),
            (this.ue = null);
        }
      }
      function Un(e, t = null, n = [], r = [], s = null, i = null, a = null) {
        return new Pn(e, t, n, r, s, i, a);
      }
      function Bn(e) {
        const t = e;
        if (null === t.ue) {
          let e = t.path.canonicalString();
          null !== t.collectionGroup && (e += "|cg:" + t.collectionGroup),
            (e =
              (e =
                (e += "|f:") +
                t.filters
                  .map((e) =>
                    (function t(e) {
                      if (e instanceof L)
                        return (
                          e.field.canonicalString() +
                          e.op.toString() +
                          Jt(e.value)
                        );
                      if (xn(e)) return e.filters.map((e) => t(e)).join(",");
                      var n = e.filters.map((e) => t(e)).join(",");
                      return e.op + `(${n})`;
                    })(e)
                  )
                  .join(",") +
                "|ob:") +
              t.orderBy
                .map((e) => {
                  return e.field.canonicalString() + e.dir;
                })
                .join(",")),
            We(t.limit) || (e = (e += "|l:") + t.limit),
            t.startAt &&
              (e =
                (e = (e += "|lb:") + (t.startAt.inclusive ? "b:" : "a:")) +
                t.startAt.position.map((e) => Jt(e)).join(",")),
            t.endAt &&
              (e =
                (e = (e += "|ub:") + (t.endAt.inclusive ? "a:" : "b:")) +
                t.endAt.position.map((e) => Jt(e)).join(",")),
            (t.ue = e);
        }
        return t.ue;
      }
      function qn(t, n) {
        if (t.limit !== n.limit) return !1;
        if (t.orderBy.length !== n.orderBy.length) return !1;
        for (let e = 0; e < t.orderBy.length; e++)
          if (
            ((r = t.orderBy[e]),
            (s = n.orderBy[e]),
            r.dir !== s.dir || !r.field.isEqual(s.field))
          )
            return !1;
        var r, s;
        if (t.filters.length !== n.filters.length) return !1;
        for (let e = 0; e < t.filters.length; e++)
          if (
            !(function r(e, t) {
              return e instanceof L
                ? ((n = e),
                  (i = t) instanceof L &&
                    n.op === i.op &&
                    n.field.isEqual(i.field) &&
                    Kt(n.value, i.value))
                : e instanceof O
                ? (s = t) instanceof O &&
                  e.op === s.op &&
                  e.filters.length === s.filters.length &&
                  e.filters.reduce((e, t, n) => e && r(t, s.filters[n]), !0)
                : void I();
              var s, n, i;
            })(t.filters[e], n.filters[e])
          )
            return !1;
        return (
          t.collectionGroup === n.collectionGroup &&
          !!t.path.isEqual(n.path) &&
          !!dn(t.startAt, n.startAt) &&
          dn(t.endAt, n.endAt)
        );
      }
      function jn(e) {
        return (
          S.isDocumentKey(e.path) &&
          null === e.collectionGroup &&
          0 === e.filters.length
        );
      }
      function Gn(e, t) {
        return e.filters.filter((e) => e instanceof L && e.field.isEqual(t));
      }
      function zn(t, n, r) {
        let s = Gt,
          i = !0;
        for (const r of Gn(t, n)) {
          let e = Gt,
            t = !0;
          switch (r.op) {
            case "<":
            case "<=":
              e =
                "nullValue" in (a = r.value)
                  ? Gt
                  : "booleanValue" in a
                  ? { booleanValue: !1 }
                  : "integerValue" in a || "doubleValue" in a
                  ? { doubleValue: NaN }
                  : "timestampValue" in a
                  ? { timestampValue: { seconds: Number.MIN_SAFE_INTEGER } }
                  : "stringValue" in a
                  ? { stringValue: "" }
                  : "bytesValue" in a
                  ? { bytesValue: "" }
                  : "referenceValue" in a
                  ? Yt(qt.empty(), S.empty())
                  : "geoPointValue" in a
                  ? { geoPointValue: { latitude: -90, longitude: -180 } }
                  : "arrayValue" in a
                  ? { arrayValue: {} }
                  : "mapValue" in a
                  ? rn(a)
                    ? on
                    : { mapValue: {} }
                  : I();
              break;
            case "==":
            case "in":
            case ">=":
              e = r.value;
              break;
            case ">":
              (e = r.value), (t = !1);
              break;
            case "!=":
            case "not-in":
              e = Gt;
          }
          un({ value: s, inclusive: i }, { value: e, inclusive: t }) < 0 &&
            ((s = e), (i = t));
        }
        var a;
        if (null !== r)
          for (let e = 0; e < t.orderBy.length; ++e)
            if (t.orderBy[e].field.isEqual(n)) {
              const t = r.position[e];
              un(
                { value: s, inclusive: i },
                { value: t, inclusive: r.inclusive }
              ) < 0 && ((s = t), (i = r.inclusive));
              break;
            }
        return { value: s, inclusive: i };
      }
      function Kn(t, n, r) {
        let s = jt,
          i = !0;
        for (const r of Gn(t, n)) {
          let e = jt,
            t = !0;
          switch (r.op) {
            case ">=":
            case ">":
              (e =
                "nullValue" in (a = r.value)
                  ? { booleanValue: !1 }
                  : "booleanValue" in a
                  ? { doubleValue: NaN }
                  : "integerValue" in a || "doubleValue" in a
                  ? { timestampValue: { seconds: Number.MIN_SAFE_INTEGER } }
                  : "timestampValue" in a
                  ? { stringValue: "" }
                  : "stringValue" in a
                  ? { bytesValue: "" }
                  : "bytesValue" in a
                  ? Yt(qt.empty(), S.empty())
                  : "referenceValue" in a
                  ? { geoPointValue: { latitude: -90, longitude: -180 } }
                  : "geoPointValue" in a
                  ? { arrayValue: {} }
                  : "arrayValue" in a
                  ? on
                  : "mapValue" in a
                  ? rn(a)
                    ? { mapValue: {} }
                    : jt
                  : I()),
                (t = !1);
              break;
            case "==":
            case "in":
            case "<=":
              e = r.value;
              break;
            case "<":
              (e = r.value), (t = !1);
              break;
            case "!=":
            case "not-in":
              e = jt;
          }
          0 < hn({ value: s, inclusive: i }, { value: e, inclusive: t }) &&
            ((s = e), (i = t));
        }
        var a;
        if (null !== r)
          for (let e = 0; e < t.orderBy.length; ++e)
            if (t.orderBy[e].field.isEqual(n)) {
              const t = r.position[e];
              0 <
                hn(
                  { value: s, inclusive: i },
                  { value: t, inclusive: r.inclusive }
                ) && ((s = t), (i = r.inclusive));
              break;
            }
        return { value: s, inclusive: i };
      }
      class Qn {
        constructor(
          e,
          t = null,
          n = [],
          r = [],
          s = null,
          i = "F",
          a = null,
          o = null
        ) {
          (this.path = e),
            (this.collectionGroup = t),
            (this.explicitOrderBy = n),
            (this.filters = r),
            (this.limit = s),
            (this.limitType = i),
            (this.startAt = a),
            (this.endAt = o),
            (this.ce = null),
            (this.le = null),
            (this.he = null),
            this.startAt,
            this.endAt;
        }
      }
      function $n(e, t, n, r, s, i, a, o) {
        return new Qn(e, t, n, r, s, i, a, o);
      }
      function Hn(e) {
        return new Qn(e);
      }
      function Wn(e) {
        return (
          0 === e.filters.length &&
          null === e.limit &&
          null == e.startAt &&
          null == e.endAt &&
          (0 === e.explicitOrderBy.length ||
            (1 === e.explicitOrderBy.length &&
              e.explicitOrderBy[0].field.isKeyField()))
        );
      }
      function Jn(e) {
        return null !== e.collectionGroup;
      }
      function Yn(t) {
        const n = t;
        if (null === n.ce) {
          n.ce = [];
          const t = new Set();
          for (const s of n.explicitOrderBy)
            n.ce.push(s), t.add(s.field.canonicalString());
          const r =
              0 < n.explicitOrderBy.length
                ? n.explicitOrderBy[n.explicitOrderBy.length - 1].dir
                : "asc",
            e = (function (e) {
              let t = new A(c.comparator);
              return (
                e.filters.forEach((e) => {
                  e.getFlattenedFilters().forEach((e) => {
                    e.isInequality() && (t = t.add(e.field));
                  });
                }),
                t
              );
            })(n);
          e.forEach((e) => {
            t.has(e.canonicalString()) ||
              e.isKeyField() ||
              n.ce.push(new fn(e, r));
          }),
            t.has(c.keyField().canonicalString()) ||
              n.ce.push(new fn(c.keyField(), r));
        }
        return n.ce;
      }
      function Xn(e) {
        const t = e;
        return (
          t.le ||
            (t.le = (function (e, t) {
              if ("F" === e.limitType)
                return Un(
                  e.path,
                  e.collectionGroup,
                  t,
                  e.filters,
                  e.limit,
                  e.startAt,
                  e.endAt
                );
              t = t.map((e) => {
                var t = "desc" === e.dir ? "asc" : "desc";
                return new fn(e.field, t);
              });
              var n = e.endAt
                  ? new cn(e.endAt.position, e.endAt.inclusive)
                  : null,
                r = e.startAt
                  ? new cn(e.startAt.position, e.startAt.inclusive)
                  : null;
              return Un(e.path, e.collectionGroup, t, e.filters, e.limit, n, r);
            })(t, Yn(e))),
          t.le
        );
      }
      function Zn(e, t) {
        t = e.filters.concat([t]);
        return new Qn(
          e.path,
          e.collectionGroup,
          e.explicitOrderBy.slice(),
          t,
          e.limit,
          e.limitType,
          e.startAt,
          e.endAt
        );
      }
      function er(e, t, n) {
        return new Qn(
          e.path,
          e.collectionGroup,
          e.explicitOrderBy.slice(),
          e.filters.slice(),
          t,
          n,
          e.startAt,
          e.endAt
        );
      }
      function tr(e, t) {
        return qn(Xn(e), Xn(t)) && e.limitType === t.limitType;
      }
      function nr(e) {
        return Bn(Xn(e)) + "|lt:" + e.limitType;
      }
      function rr(e) {
        return `Query(target=${(function (e) {
          let t = e.path.canonicalString();
          return (
            null !== e.collectionGroup &&
              (t += " collectionGroup=" + e.collectionGroup),
            0 < e.filters.length &&
              (t += `, filters: [${e.filters.map((e) => Cn(e)).join(", ")}]`),
            We(e.limit) || (t += ", limit: " + e.limit),
            0 < e.orderBy.length &&
              (t += `, orderBy: [${e.orderBy
                .map((e) => {
                  return `${e.field.canonicalString()} (${e.dir})`;
                })
                .join(", ")}]`),
            e.startAt &&
              (t =
                (t =
                  (t += ", startAt: ") + (e.startAt.inclusive ? "b:" : "a:")) +
                e.startAt.position.map((e) => Jt(e)).join(",")),
            `Target(${(t = e.endAt
              ? (t = (t += ", endAt: ") + (e.endAt.inclusive ? "a:" : "b:")) +
                e.endAt.position.map((e) => Jt(e)).join(",")
              : t)})`
          );
        })(Xn(e))}; limitType=${e.limitType})`;
      }
      function sr(n, e) {
        return (
          e.isFoundDocument() &&
          ((s = n),
          (a = (i = e).key.path),
          null !== s.collectionGroup
            ? i.key.hasCollectionId(s.collectionGroup) && s.path.isPrefixOf(a)
            : S.isDocumentKey(s.path)
            ? s.path.isEqual(a)
            : s.path.isImmediateParentOf(a)) &&
          (function (e) {
            for (const t of Yn(n))
              if (!t.field.isKeyField() && null === e.data.field(t.field))
                return;
            return 1;
          })(e) &&
          (function (e) {
            for (const t of n.filters) if (!t.matches(e)) return;
            return 1;
          })(e) &&
          ((s = e),
          (!(e = n).startAt ||
            ((r = ln((t = e.startAt), (n = Yn(e)), s)),
            t.inclusive ? r <= 0 : r < 0)) &&
            (!e.endAt ||
              ((r = ln((t = e.endAt), (e = Yn(e)), s)),
              t.inclusive ? 0 <= r : 0 < r)))
        );
        var t, r, s, i, a;
      }
      function ir(e) {
        return (
          e.collectionGroup ||
          (e.path.length % 2 == 1
            ? e.path.lastSegment()
            : e.path.get(e.path.length - 2))
        );
      }
      function ar(s) {
        return (e, t) => {
          let n = !1;
          for (const r of Yn(s)) {
            const s = (function (e, t, n) {
              var r,
                s = e.field.isKeyField()
                  ? S.comparator(t.key, n.key)
                  : ((r = e.field),
                    (n = n),
                    (t = t.data.field(r)),
                    (n = n.data.field(r)),
                    null !== t && null !== n ? $t(t, n) : I());
              switch (e.dir) {
                case "asc":
                  return s;
                case "desc":
                  return -1 * s;
                default:
                  return I();
              }
            })(r, e, t);
            if (0 !== s) return s;
            n = n || r.field.isKeyField();
          }
          return 0;
        };
      }
      class or {
        constructor(e, t) {
          (this.mapKeyFn = e),
            (this.equalsFn = t),
            (this.inner = {}),
            (this.innerSize = 0);
        }
        get(e) {
          const t = this.mapKeyFn(e),
            n = this.inner[t];
          if (void 0 !== n)
            for (const [t, r] of n) if (this.equalsFn(t, e)) return r;
        }
        has(e) {
          return void 0 !== this.get(e);
        }
        set(t, n) {
          const e = this.mapKeyFn(t),
            r = this.inner[e];
          if (void 0 === r)
            return (this.inner[e] = [[t, n]]), void this.innerSize++;
          for (let e = 0; e < r.length; e++)
            if (this.equalsFn(r[e][0], t)) return void (r[e] = [t, n]);
          r.push([t, n]), this.innerSize++;
        }
        delete(t) {
          const n = this.mapKeyFn(t),
            r = this.inner[n];
          if (void 0 === r) return !1;
          for (let e = 0; e < r.length; e++)
            if (this.equalsFn(r[e][0], t))
              return (
                1 === r.length ? delete this.inner[n] : r.splice(e, 1),
                this.innerSize--,
                !0
              );
          return !1;
        }
        forEach(r) {
          Dt(this.inner, (e, t) => {
            for (const [e, n] of t) r(e, n);
          });
        }
        isEmpty() {
          return At(this.inner);
        }
        size() {
          return this.innerSize;
        }
      }
      const ur = new D(S.comparator),
        hr = new D(S.comparator);
      function cr(...e) {
        let t = hr;
        for (const n of e) t = t.insert(n.key, n);
        return t;
      }
      function lr(e) {
        let n = hr;
        return e.forEach((e, t) => (n = n.insert(e, t.overlayedDocument))), n;
      }
      function dr() {
        return new or(
          (e) => e.toString(),
          (e, t) => e.isEqual(t)
        );
      }
      const fr = new D(S.comparator),
        gr = new A(S.comparator);
      function M(...e) {
        let t = gr;
        for (const n of e) t = t.add(n);
        return t;
      }
      const mr = new A(T);
      function pr(e, t) {
        if (e.useProto3Json) {
          if (isNaN(t)) return { doubleValue: "NaN" };
          if (t === 1 / 0) return { doubleValue: "Infinity" };
          if (t === -1 / 0) return { doubleValue: "-Infinity" };
        }
        return { doubleValue: Je(t) ? "-0" : t };
      }
      function yr(e) {
        return { integerValue: "" + e };
      }
      function vr(e, t) {
        return Ye(t) ? yr(t) : pr(e, t);
      }
      class wr {
        constructor() {
          this._ = void 0;
        }
      }
      function _r(e, t) {
        return e instanceof xr
          ? Xt((e = t)) || (e && "doubleValue" in e)
            ? t
            : { integerValue: 0 }
          : null;
      }
      class br extends wr {}
      class Ir extends wr {
        constructor(e) {
          super(), (this.elements = e);
        }
      }
      function Tr(e, t) {
        const n = Ar(t);
        for (const t of e.elements) n.some((e) => Kt(e, t)) || n.push(t);
        return { arrayValue: { values: n } };
      }
      class Er extends wr {
        constructor(e) {
          super(), (this.elements = e);
        }
      }
      function Sr(e, t) {
        let n = Ar(t);
        for (const t of e.elements) n = n.filter((e) => !Kt(e, t));
        return { arrayValue: { values: n } };
      }
      class xr extends wr {
        constructor(e, t) {
          super(), (this.serializer = e), (this.Pe = t);
        }
      }
      function Dr(e) {
        return N(e.integerValue || e.doubleValue);
      }
      function Ar(e) {
        return Zt(e) && e.arrayValue.values ? e.arrayValue.values.slice() : [];
      }
      class Cr {
        constructor(e, t) {
          (this.field = e), (this.transform = t);
        }
      }
      class Nr {
        constructor(e, t) {
          (this.version = e), (this.transformResults = t);
        }
      }
      class V {
        constructor(e, t) {
          (this.updateTime = e), (this.exists = t);
        }
        static none() {
          return new V();
        }
        static exists(e) {
          return new V(void 0, e);
        }
        static updateTime(e) {
          return new V(e);
        }
        get isNone() {
          return void 0 === this.updateTime && void 0 === this.exists;
        }
        isEqual(e) {
          return (
            this.exists === e.exists &&
            (this.updateTime
              ? !!e.updateTime && this.updateTime.isEqual(e.updateTime)
              : !e.updateTime)
          );
        }
      }
      function kr(e, t) {
        return void 0 !== e.updateTime
          ? t.isFoundDocument() && t.version.isEqual(e.updateTime)
          : void 0 === e.exists || e.exists === t.isFoundDocument();
      }
      class Rr {}
      function Lr(e, n) {
        if (!e.hasLocalMutations || (n && 0 === n.fields.length)) return null;
        if (null === n)
          return e.isNoDocument()
            ? new qr(e.key, V.none())
            : new Vr(e.key, e.data, V.none());
        {
          const s = e.data,
            i = k.empty();
          let t = new A(c.comparator);
          for (var r of n.fields)
            if (!t.has(r)) {
              let e = s.field(r);
              null === e &&
                1 < r.length &&
                ((r = r.popLast()), (e = s.field(r))),
                null === e ? i.delete(r) : i.set(r, e),
                (t = t.add(r));
            }
          return new Fr(e.key, i, new Rt(t.toArray()), V.none());
        }
      }
      function Or(e, t, n, r) {
        if (e instanceof Vr) {
          var s = e,
            i = t,
            a = n,
            o = r;
          if (!kr(s.precondition, i)) return a;
          const u = s.value.clone(),
            h = Br(s.fieldTransforms, o, i);
          return (
            u.setAll(h),
            i.convertToFoundDocument(i.version, u).setHasLocalMutations(),
            null
          );
        }
        if (e instanceof Fr) {
          (a = e), (s = t), (o = n), (i = r);
          if (!kr(a.precondition, s)) return o;
          const c = Br(a.fieldTransforms, i, s),
            l = s.data;
          return (
            l.setAll(Pr(a)),
            l.setAll(c),
            s.convertToFoundDocument(s.version, l).setHasLocalMutations(),
            null === o
              ? null
              : o
                  .unionWith(a.fieldMask.fields)
                  .unionWith(a.fieldTransforms.map((e) => e.field))
          );
        }
        return kr(e.precondition, t)
          ? (t.convertToNoDocument(t.version).setHasLocalMutations(), null)
          : n;
      }
      function Mr(e, t) {
        return (
          e.type === t.type &&
          !!e.key.isEqual(t.key) &&
          !!e.precondition.isEqual(t.precondition) &&
          ((n = e.fieldTransforms),
          (r = t.fieldTransforms),
          !!(
            (void 0 === n && void 0 === r) ||
            (n &&
              r &&
              _e(n, r, (e, t) => {
                return (
                  e.field.isEqual(t.field) &&
                  ((e = e.transform),
                  (t = t.transform),
                  (e instanceof Ir && t instanceof Ir) ||
                  (e instanceof Er && t instanceof Er)
                    ? _e(e.elements, t.elements, Kt)
                    : e instanceof xr && t instanceof xr
                    ? Kt(e.Pe, t.Pe)
                    : e instanceof br && t instanceof br)
                );
              }))
          ) &&
            (0 === e.type
              ? e.value.isEqual(t.value)
              : 1 !== e.type ||
                (e.data.isEqual(t.data) && e.fieldMask.isEqual(t.fieldMask))))
        );
        var n, r;
      }
      class Vr extends Rr {
        constructor(e, t, n, r = []) {
          super(),
            (this.key = e),
            (this.value = t),
            (this.precondition = n),
            (this.fieldTransforms = r),
            (this.type = 0);
        }
        getFieldMask() {
          return null;
        }
      }
      class Fr extends Rr {
        constructor(e, t, n, r, s = []) {
          super(),
            (this.key = e),
            (this.data = t),
            (this.fieldMask = n),
            (this.precondition = r),
            (this.fieldTransforms = s),
            (this.type = 1);
        }
        getFieldMask() {
          return this.fieldMask;
        }
      }
      function Pr(n) {
        const r = new Map();
        return (
          n.fieldMask.fields.forEach((e) => {
            var t;
            e.isEmpty() || ((t = n.data.field(e)), r.set(e, t));
          }),
          r
        );
      }
      function Ur(t, n, r) {
        const s = new Map();
        p(t.length === r.length);
        for (let e = 0; e < r.length; e++) {
          var i = t[e],
            a = i.transform,
            o = n.data.field(i.field);
          s.set(
            i.field,
            ((i = a),
            (a = o),
            (o = r[e]),
            i instanceof Ir ? Tr(i, a) : i instanceof Er ? Sr(i, a) : o)
          );
        }
        return s;
      }
      function Br(e, t, n) {
        const r = new Map();
        for (const u of e) {
          const e = u.transform,
            h = n.data.field(u.field);
          r.set(
            u.field,
            ((s = e),
            (a = h),
            (i = t),
            0,
            s instanceof br
              ? (function (e) {
                  const t = {
                    fields: {
                      __type__: { stringValue: "server_timestamp" },
                      __local_write_time__: {
                        timestampValue: {
                          seconds: i.seconds,
                          nanos: i.nanoseconds,
                        },
                      },
                    },
                  };
                  return (
                    (e = e && Ft(e) ? Pt(e) : e) &&
                      (t.fields.__previous_value__ = e),
                    { mapValue: t }
                  );
                })(a)
              : s instanceof Ir
              ? Tr(s, a)
              : s instanceof Er
              ? Sr(s, a)
              : ((o = Dr((a = _r(s, a))) + Dr(s.Pe)),
                Xt(a) && Xt(s.Pe) ? yr(o) : pr(s.serializer, o)))
          );
        }
        var s, i, a, o;
        return r;
      }
      class qr extends Rr {
        constructor(e, t) {
          super(),
            (this.key = e),
            (this.precondition = t),
            (this.type = 2),
            (this.fieldTransforms = []);
        }
        getFieldMask() {
          return null;
        }
      }
      class jr extends Rr {
        constructor(e, t) {
          super(),
            (this.key = e),
            (this.precondition = t),
            (this.type = 3),
            (this.fieldTransforms = []);
        }
        getFieldMask() {
          return null;
        }
      }
      class Gr {
        constructor(e, t, n, r) {
          (this.batchId = e),
            (this.localWriteTime = t),
            (this.baseMutations = n),
            (this.mutations = r);
        }
        applyToRemoteDocument(t, e) {
          var n = e.mutationResults;
          for (let e = 0; e < this.mutations.length; e++) {
            const h = this.mutations[e];
            if (h.key.isEqual(t.key)) {
              r = void 0;
              s = void 0;
              i = void 0;
              a = void 0;
              o = void 0;
              u = void 0;
              a = void 0;
              o = void 0;
              u = void 0;
              var r = h;
              var s = t;
              var i = n[e];
              if (r instanceof Vr) {
                var a = r,
                  o = s,
                  u = i;
                const c = a.value.clone(),
                  l = Ur(a.fieldTransforms, o, u.transformResults);
                c.setAll(l),
                  o
                    .convertToFoundDocument(u.version, c)
                    .setHasCommittedMutations();
              } else if (r instanceof Fr) {
                (a = r), (o = s), (u = i);
                if (kr(a.precondition, o)) {
                  const d = Ur(a.fieldTransforms, o, u.transformResults),
                    f = o.data;
                  f.setAll(Pr(a)),
                    f.setAll(d),
                    o
                      .convertToFoundDocument(u.version, f)
                      .setHasCommittedMutations();
                } else o.convertToUnknownDocument(u.version);
              } else
                s.convertToNoDocument(i.version).setHasCommittedMutations();
            }
          }
        }
        applyToLocalView(e, t) {
          for (const n of this.baseMutations)
            n.key.isEqual(e.key) && (t = Or(n, e, t, this.localWriteTime));
          for (const r of this.mutations)
            r.key.isEqual(e.key) && (t = Or(r, e, t, this.localWriteTime));
          return t;
        }
        applyToLocalDocumentSet(i, a) {
          const o = dr();
          return (
            this.mutations.forEach((e) => {
              const t = i.get(e.key),
                n = t.overlayedDocument;
              let r = this.applyToLocalView(n, t.mutatedFields);
              r = a.has(e.key) ? null : r;
              var s = Lr(n, r);
              null !== s && o.set(e.key, s),
                n.isValidDocument() || n.convertToNoDocument(b.min());
            }),
            o
          );
        }
        keys() {
          return this.mutations.reduce((e, t) => e.add(t.key), M());
        }
        isEqual(e) {
          return (
            this.batchId === e.batchId &&
            _e(this.mutations, e.mutations, (e, t) => Mr(e, t)) &&
            _e(this.baseMutations, e.baseMutations, (e, t) => Mr(e, t))
          );
        }
      }
      class zr {
        constructor(e, t, n, r) {
          (this.batch = e),
            (this.commitVersion = t),
            (this.mutationResults = n),
            (this.docVersions = r);
        }
        static from(e, t, n) {
          p(e.mutations.length === n.length);
          let r = fr;
          var s = e.mutations;
          for (let e = 0; e < s.length; e++)
            r = r.insert(s[e].key, n[e].version);
          return new zr(e, t, n, r);
        }
      }
      class Kr {
        constructor(e, t) {
          (this.largestBatchId = e), (this.mutation = t);
        }
        getKey() {
          return this.mutation.key;
        }
        isEqual(e) {
          return null !== e && this.mutation === e.mutation;
        }
        toString() {
          return `Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`;
        }
      }
      class Qr {
        constructor(e, t) {
          (this.count = e), (this.unchangedNames = t);
        }
      }
      function $r(e) {
        switch (e) {
          default:
            return I(), 0;
          case w.CANCELLED:
          case w.UNKNOWN:
          case w.DEADLINE_EXCEEDED:
          case w.RESOURCE_EXHAUSTED:
          case w.INTERNAL:
          case w.UNAVAILABLE:
          case w.UNAUTHENTICATED:
            return;
          case w.INVALID_ARGUMENT:
          case w.NOT_FOUND:
          case w.ALREADY_EXISTS:
          case w.PERMISSION_DENIED:
          case w.FAILED_PRECONDITION:
          case w.ABORTED:
          case w.OUT_OF_RANGE:
          case w.UNIMPLEMENTED:
          case w.DATA_LOSS:
            return 1;
        }
      }
      function Hr(e) {
        if (void 0 === e) return d("GRPC error has no .code"), w.UNKNOWN;
        switch (e) {
          case g.OK:
            return w.OK;
          case g.CANCELLED:
            return w.CANCELLED;
          case g.UNKNOWN:
            return w.UNKNOWN;
          case g.DEADLINE_EXCEEDED:
            return w.DEADLINE_EXCEEDED;
          case g.RESOURCE_EXHAUSTED:
            return w.RESOURCE_EXHAUSTED;
          case g.INTERNAL:
            return w.INTERNAL;
          case g.UNAVAILABLE:
            return w.UNAVAILABLE;
          case g.UNAUTHENTICATED:
            return w.UNAUTHENTICATED;
          case g.INVALID_ARGUMENT:
            return w.INVALID_ARGUMENT;
          case g.NOT_FOUND:
            return w.NOT_FOUND;
          case g.ALREADY_EXISTS:
            return w.ALREADY_EXISTS;
          case g.PERMISSION_DENIED:
            return w.PERMISSION_DENIED;
          case g.FAILED_PRECONDITION:
            return w.FAILED_PRECONDITION;
          case g.ABORTED:
            return w.ABORTED;
          case g.OUT_OF_RANGE:
            return w.OUT_OF_RANGE;
          case g.UNIMPLEMENTED:
            return w.UNIMPLEMENTED;
          case g.DATA_LOSS:
            return w.DATA_LOSS;
          default:
            return I();
        }
      }
      function Wr() {
        return new TextEncoder();
      }
      re = g = {
        OK: 0,
        0: "OK",
        CANCELLED: 1,
        1: "CANCELLED",
        UNKNOWN: 2,
        2: "UNKNOWN",
        INVALID_ARGUMENT: 3,
        3: "INVALID_ARGUMENT",
        DEADLINE_EXCEEDED: 4,
        4: "DEADLINE_EXCEEDED",
        NOT_FOUND: 5,
        5: "NOT_FOUND",
        ALREADY_EXISTS: 6,
        6: "ALREADY_EXISTS",
        PERMISSION_DENIED: 7,
        7: "PERMISSION_DENIED",
        UNAUTHENTICATED: 16,
        16: "UNAUTHENTICATED",
        RESOURCE_EXHAUSTED: 8,
        8: "RESOURCE_EXHAUSTED",
        FAILED_PRECONDITION: 9,
        9: "FAILED_PRECONDITION",
        ABORTED: 10,
        10: "ABORTED",
        OUT_OF_RANGE: 11,
        11: "OUT_OF_RANGE",
        UNIMPLEMENTED: 12,
        12: "UNIMPLEMENTED",
        INTERNAL: 13,
        13: "INTERNAL",
        UNAVAILABLE: 14,
        14: "UNAVAILABLE",
        DATA_LOSS: 15,
        15: "DATA_LOSS",
      };
      const Jr = new te([4294967295, 4294967295], 0);
      function Yr(e) {
        const t = Wr().encode(e),
          n = new ne();
        return n.update(t), new Uint8Array(n.digest());
      }
      function Xr(e) {
        const t = new DataView(e.buffer),
          n = t.getUint32(0, !0),
          r = t.getUint32(4, !0),
          s = t.getUint32(8, !0),
          i = t.getUint32(12, !0);
        return [new te([n, r], 0), new te([s, i], 0)];
      }
      class Zr {
        constructor(e, t, n) {
          if (
            ((this.bitmap = e),
            (this.padding = t),
            (this.hashCount = n),
            t < 0 || 8 <= t)
          )
            throw new es("Invalid padding: " + t);
          if (n < 0) throw new es("Invalid hash count: " + n);
          if (0 < e.length && 0 === this.hashCount)
            throw new es("Invalid hash count: " + n);
          if (0 === e.length && 0 !== t)
            throw new es("Invalid padding when bitmap length is 0: " + t);
          (this.Te = 8 * e.length - t), (this.Ie = te.fromNumber(this.Te));
        }
        Ee(e, t, n) {
          let r = e.add(t.multiply(te.fromNumber(n)));
          return (r =
            1 === r.compare(Jr) ? new te([r.getBits(0), r.getBits(1)], 0) : r)
            .modulo(this.Ie)
            .toNumber();
        }
        de(e) {
          return 0 != (this.bitmap[Math.floor(e / 8)] & (1 << e % 8));
        }
        mightContain(e) {
          if (0 === this.Te) return !1;
          const t = Yr(e),
            [n, r] = Xr(t);
          for (let e = 0; e < this.hashCount; e++) {
            const t = this.Ee(n, r, e);
            if (!this.de(t)) return !1;
          }
          return !0;
        }
        static create(e, t, n) {
          const r = e % 8 == 0 ? 0 : 8 - (e % 8),
            s = new Uint8Array(Math.ceil(e / 8)),
            i = new Zr(s, r, t);
          return n.forEach((e) => i.insert(e)), i;
        }
        insert(e) {
          if (0 !== this.Te) {
            var [t, n] = Xr(Yr(e));
            for (let e = 0; e < this.hashCount; e++) {
              var r = this.Ee(t, n, e);
              this.Ae(r);
            }
          }
        }
        Ae(e) {
          var t = Math.floor(e / 8);
          this.bitmap[t] |= 1 << e % 8;
        }
      }
      class es extends Error {
        constructor() {
          super(...arguments), (this.name = "BloomFilterError");
        }
      }
      class ts {
        constructor(e, t, n, r, s) {
          (this.snapshotVersion = e),
            (this.targetChanges = t),
            (this.targetMismatches = n),
            (this.documentUpdates = r),
            (this.resolvedLimboDocuments = s);
        }
        static createSynthesizedRemoteEventForCurrentChange(e, t, n) {
          const r = new Map();
          return (
            r.set(e, ns.createSynthesizedTargetChangeForCurrentChange(e, t, n)),
            new ts(b.min(), r, new D(T), ur, M())
          );
        }
      }
      class ns {
        constructor(e, t, n, r, s) {
          (this.resumeToken = e),
            (this.current = t),
            (this.addedDocuments = n),
            (this.modifiedDocuments = r),
            (this.removedDocuments = s);
        }
        static createSynthesizedTargetChangeForCurrentChange(e, t, n) {
          return new ns(n, t, M(), M(), M());
        }
      }
      class rs {
        constructor(e, t, n, r) {
          (this.Re = e),
            (this.removedTargetIds = t),
            (this.key = n),
            (this.Ve = r);
        }
      }
      class ss {
        constructor(e, t) {
          (this.targetId = e), (this.me = t);
        }
      }
      class is {
        constructor(e, t, n = C.EMPTY_BYTE_STRING, r = null) {
          (this.state = e),
            (this.targetIds = t),
            (this.resumeToken = n),
            (this.cause = r);
        }
      }
      class as {
        constructor() {
          (this.fe = 0),
            (this.ge = hs()),
            (this.pe = C.EMPTY_BYTE_STRING),
            (this.ye = !1),
            (this.we = !0);
        }
        get current() {
          return this.ye;
        }
        get resumeToken() {
          return this.pe;
        }
        get Se() {
          return 0 !== this.fe;
        }
        get be() {
          return this.we;
        }
        De(e) {
          0 < e.approximateByteSize() && ((this.we = !0), (this.pe = e));
        }
        ve() {
          let n = M(),
            r = M(),
            s = M();
          return (
            this.ge.forEach((e, t) => {
              switch (t) {
                case 0:
                  n = n.add(e);
                  break;
                case 2:
                  r = r.add(e);
                  break;
                case 1:
                  s = s.add(e);
                  break;
                default:
                  I();
              }
            }),
            new ns(this.pe, this.ye, n, r, s)
          );
        }
        Ce() {
          (this.we = !1), (this.ge = hs());
        }
        Fe(e, t) {
          (this.we = !0), (this.ge = this.ge.insert(e, t));
        }
        Me(e) {
          (this.we = !0), (this.ge = this.ge.remove(e));
        }
        xe() {
          this.fe += 1;
        }
        Oe() {
          --this.fe, p(0 <= this.fe);
        }
        Ne() {
          (this.we = !0), (this.ye = !0);
        }
      }
      class os {
        constructor(e) {
          (this.Le = e),
            (this.Be = new Map()),
            (this.ke = ur),
            (this.qe = us()),
            (this.Qe = us()),
            (this.Ke = new D(T));
        }
        $e(e) {
          for (const t of e.Re)
            e.Ve && e.Ve.isFoundDocument()
              ? this.Ue(t, e.Ve)
              : this.We(t, e.key, e.Ve);
          for (const n of e.removedTargetIds) this.We(n, e.key, e.Ve);
        }
        Ge(n) {
          this.forEachTarget(n, (e) => {
            const t = this.ze(e);
            switch (n.state) {
              case 0:
                this.je(e) && t.De(n.resumeToken);
                break;
              case 1:
                t.Oe(), t.Se || t.Ce(), t.De(n.resumeToken);
                break;
              case 2:
                t.Oe(), t.Se || this.removeTarget(e);
                break;
              case 3:
                this.je(e) && (t.Ne(), t.De(n.resumeToken));
                break;
              case 4:
                this.je(e) && (this.He(e), t.De(n.resumeToken));
                break;
              default:
                I();
            }
          });
        }
        forEachTarget(e, n) {
          0 < e.targetIds.length
            ? e.targetIds.forEach(n)
            : this.Be.forEach((e, t) => {
                this.je(t) && n(t);
              });
        }
        Je(e) {
          const t = e.targetId,
            n = e.me.count,
            r = this.Ye(t);
          if (r) {
            var s = r.target;
            if (jn(s))
              if (0 === n) {
                const e = new S(s.path);
                this.We(t, e, R.newNoDocument(e, b.min()));
              } else p(1 === n);
            else {
              const r = this.Ze(t);
              if (r !== n) {
                const n = this.Xe(e),
                  i = n ? this.et(n, e, r) : 1;
                if (0 !== i) {
                  this.He(t);
                  const e =
                    2 === i
                      ? "TargetPurposeExistenceFilterMismatchBloom"
                      : "TargetPurposeExistenceFilterMismatch";
                  this.Ke = this.Ke.insert(t, e);
                }
              }
            }
          }
        }
        Xe(e) {
          if (!(r = e.me.unchangedNames) || !r.bits) return null;
          var {
            bits: { bitmap: t = "", padding: n = 0 },
            hashCount: r = 0,
          } = r;
          let s, i;
          try {
            s = Vt(t).toUint8Array();
          } catch (e) {
            if (e instanceof Lt)
              return (
                he(
                  "Decoding the base64 bloom filter in existence filter failed (" +
                    e.message +
                    "); ignoring the bloom filter and falling back to full re-query."
                ),
                null
              );
            throw e;
          }
          try {
            i = new Zr(s, n, r);
          } catch (e) {
            return (
              he(
                e instanceof es
                  ? "BloomFilter error: "
                  : "Applying bloom filter failed: ",
                e
              ),
              null
            );
          }
          return 0 === i.Te ? null : i;
        }
        et(e, t, n) {
          return t.me.count === n - this.rt(e, t.targetId) ? 0 : 2;
        }
        rt(n, r) {
          const e = this.Le.getRemoteKeysForTarget(r);
          let s = 0;
          return (
            e.forEach((e) => {
              var t =
                `projects/${(t = this.Le.nt()).projectId}/databases/${
                  t.database
                }/documents/` + e.path.canonicalString();
              n.mightContain(t) || (this.We(r, e, null), s++);
            }),
            s
          );
        }
        it(r) {
          const s = new Map();
          this.Be.forEach((e, t) => {
            var n = this.Ye(t);
            if (n) {
              if (e.current && jn(n.target)) {
                const s = new S(n.target.path);
                this.st(s).has(t) ||
                  this.ot(t, s) ||
                  this.We(t, s, R.newNoDocument(s, r));
              }
              e.be && (s.set(t, e.ve()), e.Ce());
            }
          });
          let i = M();
          this.Qe.forEach((e, t) => {
            let n = !0;
            t.forEachWhile((e) => {
              e = this.Ye(e);
              return (
                !e || "TargetPurposeLimboResolution" === e.purpose || (n = !1)
              );
            }),
              n && (i = i.add(e));
          }),
            this.ke.forEach((e, t) => t.setReadTime(r));
          var e = new ts(r, s, this.Ke, this.ke, i);
          return (
            (this.ke = ur),
            (this.qe = us()),
            (this.Qe = us()),
            (this.Ke = new D(T)),
            e
          );
        }
        Ue(e, t) {
          var n;
          this.je(e) &&
            ((n = this.ot(e, t.key) ? 2 : 0),
            this.ze(e).Fe(t.key, n),
            (this.ke = this.ke.insert(t.key, t)),
            (this.qe = this.qe.insert(t.key, this.st(t.key).add(e))),
            (this.Qe = this.Qe.insert(t.key, this._t(t.key).add(e))));
        }
        We(e, t, n) {
          if (this.je(e)) {
            const r = this.ze(e);
            this.ot(e, t) ? r.Fe(t, 1) : r.Me(t),
              (this.Qe = this.Qe.insert(t, this._t(t).delete(e))),
              (this.Qe = this.Qe.insert(t, this._t(t).add(e))),
              n && (this.ke = this.ke.insert(t, n));
          }
        }
        removeTarget(e) {
          this.Be.delete(e);
        }
        Ze(e) {
          var t = this.ze(e).ve();
          return (
            this.Le.getRemoteKeysForTarget(e).size +
            t.addedDocuments.size -
            t.removedDocuments.size
          );
        }
        xe(e) {
          this.ze(e).xe();
        }
        ze(e) {
          let t = this.Be.get(e);
          return t || ((t = new as()), this.Be.set(e, t)), t;
        }
        _t(e) {
          let t = this.Qe.get(e);
          return t || ((t = new A(T)), (this.Qe = this.Qe.insert(e, t))), t;
        }
        st(e) {
          let t = this.qe.get(e);
          return t || ((t = new A(T)), (this.qe = this.qe.insert(e, t))), t;
        }
        je(e) {
          var t = null !== this.Ye(e);
          return (
            t || m("WatchChangeAggregator", "Detected inactive target", e), t
          );
        }
        Ye(e) {
          var t = this.Be.get(e);
          return t && t.Se ? null : this.Le.ut(e);
        }
        He(t) {
          this.Be.set(t, new as()),
            this.Le.getRemoteKeysForTarget(t).forEach((e) => {
              this.We(t, e, null);
            });
        }
        ot(e, t) {
          return this.Le.getRemoteKeysForTarget(e).has(t);
        }
      }
      function us() {
        return new D(S.comparator);
      }
      function hs() {
        return new D(S.comparator);
      }
      const cs = { asc: "ASCENDING", desc: "DESCENDING" },
        ls = {
          "<": "LESS_THAN",
          "<=": "LESS_THAN_OR_EQUAL",
          ">": "GREATER_THAN",
          ">=": "GREATER_THAN_OR_EQUAL",
          "==": "EQUAL",
          "!=": "NOT_EQUAL",
          "array-contains": "ARRAY_CONTAINS",
          in: "IN",
          "not-in": "NOT_IN",
          "array-contains-any": "ARRAY_CONTAINS_ANY",
        },
        ds = { and: "AND", or: "OR" };
      class fs {
        constructor(e, t) {
          (this.databaseId = e), (this.useProto3Json = t);
        }
      }
      function gs(e, t) {
        return e.useProto3Json || We(t) ? t : { value: t };
      }
      function ms(e, t) {
        return e.useProto3Json
          ? `${new Date(1e3 * t.seconds)
              .toISOString()
              .replace(/\.\d*/, "")
              .replace("Z", "")}.${("000000000" + t.nanoseconds).slice(-9)}Z`
          : { seconds: "" + t.seconds, nanos: t.nanoseconds };
      }
      function ps(e, t) {
        return e.useProto3Json ? t.toBase64() : t.toUint8Array();
      }
      function F(e) {
        return (
          p(!!e), b.fromTimestamp(((e = Mt(e)), new y(e.seconds, e.nanos)))
        );
      }
      function ys(e, t) {
        return vs(e, t).canonicalString();
      }
      function vs(e, t) {
        const n = new E([
          "projects",
          e.projectId,
          "databases",
          e.database,
        ]).child("documents");
        return void 0 === t ? n : n.child(t);
      }
      function ws(e) {
        e = E.fromString(e);
        return p(Ms(e)), e;
      }
      function _s(e, t) {
        return ys(e.databaseId, t.path);
      }
      function bs(e, t) {
        const n = ws(t);
        if (n.get(1) !== e.databaseId.projectId)
          throw new _(
            w.INVALID_ARGUMENT,
            "Tried to deserialize key from different project: " +
              n.get(1) +
              " vs " +
              e.databaseId.projectId
          );
        if (n.get(3) !== e.databaseId.database)
          throw new _(
            w.INVALID_ARGUMENT,
            "Tried to deserialize key from different database: " +
              n.get(3) +
              " vs " +
              e.databaseId.database
          );
        return new S(Ss(n));
      }
      function Is(e, t) {
        return ys(e.databaseId, t);
      }
      function Ts(e) {
        e = ws(e);
        return 4 === e.length ? E.emptyPath() : Ss(e);
      }
      function Es(e) {
        return new E([
          "projects",
          e.databaseId.projectId,
          "databases",
          e.databaseId.database,
        ]).canonicalString();
      }
      function Ss(e) {
        return p(4 < e.length && "documents" === e.get(4)), e.popFirst(5);
      }
      function xs(e, t, n) {
        return { name: _s(e, t), fields: n.value.mapValue.fields };
      }
      function Ds(e, t, n) {
        const r = bs(e, t.name),
          s = F(t.updateTime),
          i = t.createTime ? F(t.createTime) : b.min(),
          a = new k({ mapValue: { fields: t.fields } }),
          o = R.newFoundDocument(r, s, i, a);
        return (
          n && o.setHasCommittedMutations(),
          n ? o.setHasCommittedMutations() : o
        );
      }
      function As(e, t) {
        let n;
        if (t instanceof Vr) n = { update: xs(e, t.key, t.value) };
        else if (t instanceof qr) n = { delete: _s(e, t.key) };
        else if (t instanceof Fr)
          n = {
            update: xs(e, t.key, t.data),
            updateMask: (function (e) {
              const t = [];
              return (
                e.fields.forEach((e) => t.push(e.canonicalString())),
                { fieldPaths: t }
              );
            })(t.fieldMask),
          };
        else {
          if (!(t instanceof jr)) return I();
          n = { verify: _s(e, t.key) };
        }
        return (
          0 < t.fieldTransforms.length &&
            (n.updateTransforms = t.fieldTransforms.map((e) => {
              var t = e.transform;
              if (t instanceof br)
                return {
                  fieldPath: e.field.canonicalString(),
                  setToServerValue: "REQUEST_TIME",
                };
              if (t instanceof Ir)
                return {
                  fieldPath: e.field.canonicalString(),
                  appendMissingElements: { values: t.elements },
                };
              if (t instanceof Er)
                return {
                  fieldPath: e.field.canonicalString(),
                  removeAllFromArray: { values: t.elements },
                };
              if (t instanceof xr)
                return {
                  fieldPath: e.field.canonicalString(),
                  increment: t.Pe,
                };
              throw I();
            })),
          t.precondition.isNone ||
            (n.currentDocument =
              ((r = e),
              void 0 !== (e = t.precondition).updateTime
                ? { updateTime: ms(r, (t = e.updateTime).toTimestamp()) }
                : void 0 !== e.exists
                ? { exists: e.exists }
                : I())),
          n
        );
        var r;
      }
      function Cs(r, t) {
        const e = t.currentDocument
            ? void 0 !== (s = t.currentDocument).updateTime
              ? V.updateTime(F(s.updateTime))
              : void 0 !== s.exists
              ? V.exists(s.exists)
              : V.none()
            : V.none(),
          n = t.updateTransforms
            ? t.updateTransforms.map((t) => {
                {
                  var n = r;
                  let e = null;
                  if ("setToServerValue" in t)
                    p("REQUEST_TIME" === t.setToServerValue), (e = new br());
                  else if ("appendMissingElements" in t) {
                    const n = t.appendMissingElements.values || [];
                    e = new Ir(n);
                  } else if ("removeAllFromArray" in t) {
                    const n = t.removeAllFromArray.values || [];
                    e = new Er(n);
                  } else "increment" in t ? (e = new xr(n, t.increment)) : I();
                  return (n = c.fromServerFormat(t.fieldPath)), new Cr(n, e);
                }
              })
            : [];
        if (t.update) {
          t.update.name;
          var s = bs(r, t.update.name),
            i = new k({ mapValue: { fields: t.update.fields } });
          if (t.updateMask) {
            const r = (function () {
              const e = t.updateMask.fieldPaths || [];
              return new Rt(e.map((e) => c.fromServerFormat(e)));
            })();
            return new Fr(s, i, r, e, n);
          }
          return new Vr(s, i, e, n);
        }
        if (t.delete) {
          const n = bs(r, t.delete);
          return new qr(n, e);
        }
        if (t.verify) {
          const n = bs(r, t.verify);
          return new jr(n, e);
        }
        return I();
      }
      function Ns(e, t) {
        return { documents: [Is(e, t.path)] };
      }
      function ks(e, t) {
        const n = { structuredQuery: {} },
          r = t.path;
        let s;
        null !== t.collectionGroup
          ? ((s = r),
            (n.structuredQuery.from = [
              { collectionId: t.collectionGroup, allDescendants: !0 },
            ]))
          : ((s = r.popLast()),
            (n.structuredQuery.from = [{ collectionId: r.lastSegment() }])),
          (n.parent = Is(e, s));
        var i = (function (e) {
          if (0 !== e.length)
            return (function t(e) {
              if (e instanceof L) {
                var n = e;
                if ("==" === n.op) {
                  if (tn(n.value))
                    return {
                      unaryFilter: { field: Ls(n.field), op: "IS_NAN" },
                    };
                  if (en(n.value))
                    return {
                      unaryFilter: { field: Ls(n.field), op: "IS_NULL" },
                    };
                } else if ("!=" === n.op) {
                  if (tn(n.value))
                    return {
                      unaryFilter: { field: Ls(n.field), op: "IS_NOT_NAN" },
                    };
                  if (en(n.value))
                    return {
                      unaryFilter: { field: Ls(n.field), op: "IS_NOT_NULL" },
                    };
                }
                return {
                  fieldFilter: {
                    field: Ls(n.field),
                    op: ((r = n.op), ls[r]),
                    value: n.value,
                  },
                };
              }
              return e instanceof O
                ? 1 === (n = (r = e).getFilters().map((e) => t(e))).length
                  ? n[0]
                  : { compositeFilter: { op: ((r = r.op), ds[r]), filters: n } }
                : I();
              var r;
            })(O.create(e, "and"));
        })(t.filters);
        return (
          i && (n.structuredQuery.where = i),
          (i = (function (e) {
            if (0 !== e.length)
              return e.map((e) => {
                return { field: Ls(e.field), direction: ((e = e.dir), cs[e]) };
              });
          })(t.orderBy)) && (n.structuredQuery.orderBy = i),
          null !== (i = gs(e, t.limit)) && (n.structuredQuery.limit = i),
          t.startAt &&
            (n.structuredQuery.startAt = {
              before: (e = t.startAt).inclusive,
              values: e.position,
            }),
          t.endAt &&
            (n.structuredQuery.endAt = {
              before: !(t = t.endAt).inclusive,
              values: t.position,
            }),
          { ct: n, parent: s }
        );
      }
      function Rs(e) {
        let t = Ts(e.parent);
        var n,
          r,
          s,
          i = e.structuredQuery,
          a = i.from ? i.from.length : 0;
        let o = null,
          u =
            (0 < a &&
              (p(1 === a),
              (a = i.from[0]).allDescendants
                ? (o = a.collectionId)
                : (t = t.child(a.collectionId))),
            []),
          h =
            (i.where &&
              (u = (function () {
                const e = (function t(e) {
                  if (void 0 !== e.unaryFilter) {
                    var n = e;
                    switch (n.unaryFilter.op) {
                      case "IS_NAN":
                        var r = Os(n.unaryFilter.field);
                        return L.create(r, "==", { doubleValue: NaN });
                      case "IS_NULL":
                        r = Os(n.unaryFilter.field);
                        return L.create(r, "==", { nullValue: "NULL_VALUE" });
                      case "IS_NOT_NAN":
                        r = Os(n.unaryFilter.field);
                        return L.create(r, "!=", { doubleValue: NaN });
                      case "IS_NOT_NULL":
                        r = Os(n.unaryFilter.field);
                        return L.create(r, "!=", { nullValue: "NULL_VALUE" });
                      default:
                        return I();
                    }
                  } else {
                    return void 0 !== e.fieldFilter
                      ? ((i = e),
                        L.create(
                          Os(i.fieldFilter.field),
                          (function () {
                            switch (i.fieldFilter.op) {
                              case "EQUAL":
                                return "==";
                              case "NOT_EQUAL":
                                return "!=";
                              case "GREATER_THAN":
                                return ">";
                              case "GREATER_THAN_OR_EQUAL":
                                return ">=";
                              case "LESS_THAN":
                                return "<";
                              case "LESS_THAN_OR_EQUAL":
                                return "<=";
                              case "ARRAY_CONTAINS":
                                return "array-contains";
                              case "IN":
                                return "in";
                              case "NOT_IN":
                                return "not-in";
                              case "ARRAY_CONTAINS_ANY":
                                return "array-contains-any";
                              default:
                                return I();
                            }
                          })(),
                          i.fieldFilter.value
                        ))
                      : void 0 !== e.compositeFilter
                      ? ((s = e),
                        O.create(
                          s.compositeFilter.filters.map((e) => t(e)),
                          (function () {
                            switch (s.compositeFilter.op) {
                              case "AND":
                                return "and";
                              case "OR":
                                return "or";
                              default:
                                return I();
                            }
                          })()
                        ))
                      : I();
                    var s, i;
                  }
                })(i.where);
                return e instanceof O && xn(e) ? e.getFilters() : [e];
              })()),
            []),
          c =
            (i.orderBy &&
              (h = i.orderBy.map((e) => {
                var t = e;
                return new fn(
                  Os(t.field),
                  (function () {
                    switch (t.direction) {
                      case "ASCENDING":
                        return "asc";
                      case "DESCENDING":
                        return "desc";
                      default:
                        return;
                    }
                  })()
                );
              })),
            null),
          l =
            (i.limit &&
              (c = We((n = "object" == typeof (e = i.limit) ? e.value : e))
                ? null
                : n),
            null),
          d =
            (i.startAt &&
              (l =
                ((s = !!(r = i.startAt).before),
                (n = r.values || []),
                new cn(n, s))),
            null);
        return (
          i.endAt &&
            (d =
              ((s = !(r = i.endAt).before),
              (i = r.values || []),
              new cn(i, s))),
          $n(t, o, h, u, c, "F", l, d)
        );
      }
      function Ls(e) {
        return { fieldPath: e.canonicalString() };
      }
      function Os(e) {
        return c.fromServerFormat(e.fieldPath);
      }
      function Ms(e) {
        return (
          4 <= e.length && "projects" === e.get(0) && "databases" === e.get(2)
        );
      }
      class Vs {
        constructor(
          e,
          t,
          n,
          r,
          s = b.min(),
          i = b.min(),
          a = C.EMPTY_BYTE_STRING,
          o = null
        ) {
          (this.target = e),
            (this.targetId = t),
            (this.purpose = n),
            (this.sequenceNumber = r),
            (this.snapshotVersion = s),
            (this.lastLimboFreeSnapshotVersion = i),
            (this.resumeToken = a),
            (this.expectedCount = o);
        }
        withSequenceNumber(e) {
          return new Vs(
            this.target,
            this.targetId,
            this.purpose,
            e,
            this.snapshotVersion,
            this.lastLimboFreeSnapshotVersion,
            this.resumeToken,
            this.expectedCount
          );
        }
        withResumeToken(e, t) {
          return new Vs(
            this.target,
            this.targetId,
            this.purpose,
            this.sequenceNumber,
            t,
            this.lastLimboFreeSnapshotVersion,
            e,
            null
          );
        }
        withExpectedCount(e) {
          return new Vs(
            this.target,
            this.targetId,
            this.purpose,
            this.sequenceNumber,
            this.snapshotVersion,
            this.lastLimboFreeSnapshotVersion,
            this.resumeToken,
            e
          );
        }
        withLastLimboFreeSnapshotVersion(e) {
          return new Vs(
            this.target,
            this.targetId,
            this.purpose,
            this.sequenceNumber,
            this.snapshotVersion,
            e,
            this.resumeToken,
            this.expectedCount
          );
        }
      }
      class Fs {
        constructor(e) {
          this.ht = e;
        }
      }
      function Ps(e, t) {
        const n = t.key,
          r = {
            prefixPath: n.getCollectionPath().popLast().toArray(),
            collectionGroup: n.collectionGroup,
            documentId: n.path.lastSegment(),
            readTime: Us(t.readTime),
            hasCommittedMutations: t.hasCommittedMutations,
          };
        if (t.isFoundDocument())
          r.document = {
            name: _s((s = e.ht), (e = t).key),
            fields: e.data.value.mapValue.fields,
            updateTime: ms(s, e.version.toTimestamp()),
            createTime: ms(s, e.createTime.toTimestamp()),
          };
        else if (t.isNoDocument())
          r.noDocument = { path: n.path.toArray(), readTime: Bs(t.version) };
        else {
          if (!t.isUnknownDocument()) return I();
          r.unknownDocument = {
            path: n.path.toArray(),
            version: Bs(t.version),
          };
        }
        var s;
        return r;
      }
      function Us(e) {
        e = e.toTimestamp();
        return [e.seconds, e.nanoseconds];
      }
      function Bs(e) {
        e = e.toTimestamp();
        return { seconds: e.seconds, nanoseconds: e.nanoseconds };
      }
      function qs(e) {
        e = new y(e.seconds, e.nanoseconds);
        return b.fromTimestamp(e);
      }
      function js(t, n) {
        const r = (n.baseMutations || []).map((e) => Cs(t.ht, e));
        for (let e = 0; e < n.mutations.length - 1; ++e) {
          const r = n.mutations[e];
          if (
            e + 1 < n.mutations.length &&
            void 0 !== n.mutations[e + 1].transform
          ) {
            const s = n.mutations[e + 1];
            (r.updateTransforms = s.transform.fieldTransforms),
              n.mutations.splice(e + 1, 1),
              ++e;
          }
        }
        const s = n.mutations.map((e) => Cs(t.ht, e)),
          e = y.fromMillis(n.localWriteTimeMs);
        return new Gr(n.batchId, e, r, s);
      }
      function Gs(e) {
        var t = qs(e.readTime),
          n =
            void 0 !== e.lastLimboFreeSnapshotVersion
              ? qs(e.lastLimboFreeSnapshotVersion)
              : b.min(),
          r =
            void 0 !== e.query.documents
              ? (p(1 === (r = e.query).documents.length),
                Xn(Hn(Ts(r.documents[0]))))
              : Xn(Rs(e.query));
        return new Vs(
          r,
          e.targetId,
          "TargetPurposeListen",
          e.lastListenSequenceNumber,
          t,
          n,
          C.fromBase64String(e.resumeToken)
        );
      }
      function zs(e, t) {
        var n = Bs(t.snapshotVersion),
          r = Bs(t.lastLimboFreeSnapshotVersion),
          e = jn(t.target) ? Ns(e.ht, t.target) : ks(e.ht, t.target).ct,
          s = t.resumeToken.toBase64();
        return {
          targetId: t.targetId,
          canonicalId: Bn(t.target),
          readTime: n,
          resumeToken: s,
          lastListenSequenceNumber: t.sequenceNumber,
          lastLimboFreeSnapshotVersion: r,
          query: e,
        };
      }
      function Ks(e) {
        var t = Rs({ parent: e.parent, structuredQuery: e.structuredQuery });
        return "LAST" === e.limitType ? er(t, t.limit, "L") : t;
      }
      function Qs(e, t) {
        return new Kr(t.largestBatchId, Cs(e.ht, t.overlayMutation));
      }
      function $s(e, t) {
        var n = t.path.lastSegment();
        return [e, u(t.path.popLast()), n];
      }
      function Hs(e, t, n, r) {
        return {
          indexId: e,
          uid: t,
          sequenceNumber: n,
          readTime: Bs(r.readTime),
          documentKey: u(r.documentKey.path),
          largestBatchId: r.largestBatchId,
        };
      }
      class Ws {
        getBundleMetadata(e, t) {
          return Js(e)
            .get(t)
            .next((e) => {
              if (e)
                return {
                  id: e.bundleId,
                  createTime: qs(e.createTime),
                  version: e.version,
                };
            });
        }
        saveBundleMetadata(e, t) {
          return Js(e).put({
            bundleId: t.id,
            createTime: Bs(F(t.createTime)),
            version: t.version,
          });
        }
        getNamedQuery(e, t) {
          return Ys(e)
            .get(t)
            .next((e) => {
              if (e)
                return {
                  name: e.name,
                  query: Ks(e.bundledQuery),
                  readTime: qs(e.readTime),
                };
            });
        }
        saveNamedQuery(e, t) {
          return Ys(e).put({
            name: t.name,
            readTime: Bs(F(t.readTime)),
            bundledQuery: t.bundledQuery,
          });
        }
      }
      function Js(e) {
        return n(e, "bundles");
      }
      function Ys(e) {
        return n(e, "namedQueries");
      }
      class Xs {
        constructor(e, t) {
          (this.serializer = e), (this.userId = t);
        }
        static Pt(e, t) {
          t = t.uid || "";
          return new Xs(e, t);
        }
        getOverlay(e, t) {
          return Zs(e)
            .get($s(this.userId, t))
            .next((e) => (e ? Qs(this.serializer, e) : null));
        }
        getOverlays(e, t) {
          const n = dr();
          return x
            .forEach(t, (t) =>
              this.getOverlay(e, t).next((e) => {
                null !== e && n.set(t, e);
              })
            )
            .next(() => n);
        }
        saveOverlays(n, r, e) {
          const s = [];
          return (
            e.forEach((e, t) => {
              t = new Kr(r, t);
              s.push(this.Tt(n, t));
            }),
            x.waitFor(s)
          );
        }
        removeOverlaysForBatchId(t, e, n) {
          const r = new Set(),
            s = (e.forEach((e) => r.add(u(e.getCollectionPath()))), []);
          return (
            r.forEach((e) => {
              e = IDBKeyRange.bound(
                [this.userId, e, n],
                [this.userId, e, n + 1],
                !1,
                !0
              );
              s.push(Zs(t).j("collectionPathOverlayIndex", e));
            }),
            x.waitFor(s)
          );
        }
        getOverlaysForCollection(e, t, n) {
          const r = dr(),
            s = u(t),
            i = IDBKeyRange.bound(
              [this.userId, s, n],
              [this.userId, s, Number.POSITIVE_INFINITY],
              !0
            );
          return Zs(e)
            .U("collectionPathOverlayIndex", i)
            .next((e) => {
              for (const t of e) {
                const e = Qs(this.serializer, t);
                r.set(e.getKey(), e);
              }
              return r;
            });
        }
        getOverlaysForCollectionGroup(e, t, n, s) {
          const i = dr();
          let a;
          n = IDBKeyRange.bound(
            [this.userId, t, n],
            [this.userId, t, Number.POSITIVE_INFINITY],
            !0
          );
          return Zs(e)
            .J(
              { index: "collectionGroupOverlayIndex", range: n },
              (e, t, n) => {
                const r = Qs(this.serializer, t);
                i.size() < s || r.largestBatchId === a
                  ? (i.set(r.getKey(), r), (a = r.largestBatchId))
                  : n.done();
              }
            )
            .next(() => i);
        }
        Tt(e, t) {
          return Zs(e).put(
            (function (e, t, n) {
              var [, r, s] = $s(t, n.mutation.key);
              return {
                userId: t,
                collectionPath: r,
                documentId: s,
                collectionGroup: n.mutation.key.getCollectionGroup(),
                largestBatchId: n.largestBatchId,
                overlayMutation: As(e.ht, n.mutation),
              };
            })(this.serializer, this.userId, t)
          );
        }
      }
      function Zs(e) {
        return n(e, "documentOverlays");
      }
      class ei {
        It(e) {
          return n(e, "globals");
        }
        getSessionToken(e) {
          return this.It(e)
            .get("sessionToken")
            .next((e) => {
              e = null == e ? void 0 : e.value;
              return e ? C.fromUint8Array(e) : C.EMPTY_BYTE_STRING;
            });
        }
        setSessionToken(e, t) {
          return this.It(e).put({
            name: "sessionToken",
            value: t.toUint8Array(),
          });
        }
      }
      class ti {
        constructor() {}
        Et(e, t) {
          this.dt(e, t), t.At();
        }
        dt(t, n) {
          if ("nullValue" in t) this.Rt(n, 5);
          else if ("booleanValue" in t)
            this.Rt(n, 10), n.Vt(t.booleanValue ? 1 : 0);
          else if ("integerValue" in t) this.Rt(n, 15), n.Vt(N(t.integerValue));
          else if ("doubleValue" in t) {
            var e = N(t.doubleValue);
            isNaN(e)
              ? this.Rt(n, 13)
              : (this.Rt(n, 15), Je(e) ? n.Vt(0) : n.Vt(e));
          } else if ("timestampValue" in t) {
            let e = t.timestampValue;
            this.Rt(n, 20),
              "string" == typeof e && (e = Mt(e)),
              n.ft("" + (e.seconds || "")),
              n.Vt(e.nanos || 0);
          } else
            "stringValue" in t
              ? (this.gt(t.stringValue, n), this.yt(n))
              : "bytesValue" in t
              ? (this.Rt(n, 30), n.wt(Vt(t.bytesValue)), this.yt(n))
              : "referenceValue" in t
              ? this.St(t.referenceValue, n)
              : "geoPointValue" in t
              ? ((e = t.geoPointValue),
                this.Rt(n, 45),
                n.Vt(e.latitude || 0),
                n.Vt(e.longitude || 0))
              : "mapValue" in t
              ? an(t)
                ? this.Rt(n, Number.MAX_SAFE_INTEGER)
                : rn(t)
                ? this.bt(t.mapValue, n)
                : (this.Dt(t.mapValue, n), this.yt(n))
              : "arrayValue" in t
              ? (this.vt(t.arrayValue, n), this.yt(n))
              : I();
        }
        gt(e, t) {
          this.Rt(t, 25), this.Ct(e, t);
        }
        Ct(e, t) {
          t.ft(e);
        }
        Dt(e, t) {
          var n = e.fields || {};
          this.Rt(t, 55);
          for (const e of Object.keys(n)) this.gt(e, t), this.dt(n[e], t);
        }
        bt(e, t) {
          var e = e.fields || {},
            n =
              (this.Rt(t, 53),
              (null ==
              (n = null == (n = e.value.arrayValue) ? void 0 : n.values)
                ? void 0
                : n.length) || 0);
          this.Rt(t, 15), t.Vt(N(n)), this.gt("value", t), this.dt(e.value, t);
        }
        vt(e, t) {
          var n = e.values || [];
          this.Rt(t, 50);
          for (const e of n) this.dt(e, t);
        }
        St(e, t) {
          this.Rt(t, 37),
            S.fromName(e).path.forEach((e) => {
              this.Rt(t, 60), this.Ct(e, t);
            });
        }
        Rt(e, t) {
          e.Vt(t);
        }
        yt(e) {
          e.Vt(2);
        }
      }
      function ni(e) {
        e =
          64 -
          (function (t) {
            let n = 0;
            for (let e = 0; e < 8; ++e) {
              var r = (function (e) {
                if (0 === e) return 8;
                let t = 0;
                return (
                  e >> 4 == 0 && ((t += 4), (e <<= 4)),
                  e >> 6 == 0 && ((t += 2), (e <<= 2)),
                  e >> 7 == 0 && (t += 1),
                  t
                );
              })(255 & t[e]);
              if (((n += r), 8 !== r)) break;
            }
            return n;
          })(e);
        return Math.ceil(e / 8);
      }
      ti.Ft = new ti();
      class ri {
        constructor() {
          (this.buffer = new Uint8Array(1024)), (this.position = 0);
        }
        Mt(e) {
          const t = e[Symbol.iterator]();
          let n = t.next();
          for (; !n.done; ) this.xt(n.value), (n = t.next());
          this.Ot();
        }
        Nt(e) {
          const t = e[Symbol.iterator]();
          let n = t.next();
          for (; !n.done; ) this.Lt(n.value), (n = t.next());
          this.Bt();
        }
        kt(e) {
          for (const t of e) {
            const e = t.charCodeAt(0);
            if (e < 128) this.xt(e);
            else if (e < 2048)
              this.xt(960 | (e >>> 6)), this.xt(128 | (63 & e));
            else if (t < "\ud800" || "\udbff" < t)
              this.xt(480 | (e >>> 12)),
                this.xt(128 | (63 & (e >>> 6))),
                this.xt(128 | (63 & e));
            else {
              const e = t.codePointAt(0);
              this.xt(240 | (e >>> 18)),
                this.xt(128 | (63 & (e >>> 12))),
                this.xt(128 | (63 & (e >>> 6))),
                this.xt(128 | (63 & e));
            }
          }
          this.Ot();
        }
        qt(e) {
          for (const t of e) {
            const e = t.charCodeAt(0);
            if (e < 128) this.Lt(e);
            else if (e < 2048)
              this.Lt(960 | (e >>> 6)), this.Lt(128 | (63 & e));
            else if (t < "\ud800" || "\udbff" < t)
              this.Lt(480 | (e >>> 12)),
                this.Lt(128 | (63 & (e >>> 6))),
                this.Lt(128 | (63 & e));
            else {
              const e = t.codePointAt(0);
              this.Lt(240 | (e >>> 18)),
                this.Lt(128 | (63 & (e >>> 12))),
                this.Lt(128 | (63 & (e >>> 6))),
                this.Lt(128 | (63 & e));
            }
          }
          this.Bt();
        }
        Qt(t) {
          var n = this.Kt(t),
            t = ni(n);
          this.$t(1 + t), (this.buffer[this.position++] = 255 & t);
          for (let e = n.length - t; e < n.length; ++e)
            this.buffer[this.position++] = 255 & n[e];
        }
        Ut(t) {
          var n = this.Kt(t),
            t = ni(n);
          this.$t(1 + t), (this.buffer[this.position++] = ~(255 & t));
          for (let e = n.length - t; e < n.length; ++e)
            this.buffer[this.position++] = ~(255 & n[e]);
        }
        Wt() {
          this.Gt(255), this.Gt(255);
        }
        zt() {
          this.jt(255), this.jt(255);
        }
        reset() {
          this.position = 0;
        }
        seed(e) {
          this.$t(e.length),
            this.buffer.set(e, this.position),
            (this.position += e.length);
        }
        Ht() {
          return this.buffer.slice(0, this.position);
        }
        Kt(e) {
          const t = (function (e) {
              const t = new DataView(new ArrayBuffer(8));
              return t.setFloat64(0, e, !1), new Uint8Array(t.buffer);
            })(e),
            n = 0 != (128 & t[0]);
          t[0] ^= n ? 255 : 128;
          for (let e = 1; e < t.length; ++e) t[e] ^= n ? 255 : 0;
          return t;
        }
        xt(e) {
          e &= 255;
          0 == e
            ? (this.Gt(0), this.Gt(255))
            : 255 == e
            ? (this.Gt(255), this.Gt(0))
            : this.Gt(e);
        }
        Lt(e) {
          var t = 255 & e;
          0 == t
            ? (this.jt(0), this.jt(255))
            : 255 == t
            ? (this.jt(255), this.jt(0))
            : this.jt(e);
        }
        Ot() {
          this.Gt(0), this.Gt(1);
        }
        Bt() {
          this.jt(0), this.jt(1);
        }
        Gt(e) {
          this.$t(1), (this.buffer[this.position++] = e);
        }
        jt(e) {
          this.$t(1), (this.buffer[this.position++] = ~e);
        }
        $t(t) {
          t += this.position;
          if (!(t <= this.buffer.length)) {
            let e = 2 * this.buffer.length;
            e < t && (e = t);
            const n = new Uint8Array(e);
            n.set(this.buffer), (this.buffer = n);
          }
        }
      }
      class si {
        constructor(e) {
          this.Jt = e;
        }
        wt(e) {
          this.Jt.Mt(e);
        }
        ft(e) {
          this.Jt.kt(e);
        }
        Vt(e) {
          this.Jt.Qt(e);
        }
        At() {
          this.Jt.Wt();
        }
      }
      class ii {
        constructor(e) {
          this.Jt = e;
        }
        wt(e) {
          this.Jt.Nt(e);
        }
        ft(e) {
          this.Jt.qt(e);
        }
        Vt(e) {
          this.Jt.Ut(e);
        }
        At() {
          this.Jt.zt();
        }
      }
      class ai {
        constructor() {
          (this.Jt = new ri()),
            (this.Yt = new si(this.Jt)),
            (this.Zt = new ii(this.Jt));
        }
        seed(e) {
          this.Jt.seed(e);
        }
        Xt(e) {
          return 0 === e ? this.Yt : this.Zt;
        }
        Ht() {
          return this.Jt.Ht();
        }
        reset() {
          this.Jt.reset();
        }
      }
      class oi {
        constructor(e, t, n, r) {
          (this.indexId = e),
            (this.documentKey = t),
            (this.arrayValue = n),
            (this.directionalValue = r);
        }
        en() {
          const e = this.directionalValue.length,
            t = 0 === e || 255 === this.directionalValue[e - 1] ? e + 1 : e,
            n = new Uint8Array(t);
          return (
            n.set(this.directionalValue, 0),
            t !== e
              ? n.set([0], this.directionalValue.length)
              : ++n[n.length - 1],
            new oi(this.indexId, this.documentKey, this.arrayValue, n)
          );
        }
      }
      function ui(e, t) {
        let n = e.indexId - t.indexId;
        return 0 !== n
          ? n
          : 0 !== (n = hi(e.arrayValue, t.arrayValue))
          ? n
          : 0 !== (n = hi(e.directionalValue, t.directionalValue))
          ? n
          : S.comparator(e.documentKey, t.documentKey);
      }
      function hi(t, n) {
        for (let e = 0; e < t.length && e < n.length; ++e) {
          var r = t[e] - n[e];
          if (0 != r) return r;
        }
        return t.length - n.length;
      }
      class ci {
        constructor(e) {
          (this.tn = new A((e, t) => c.comparator(e.field, t.field))),
            (this.collectionId =
              null != e.collectionGroup
                ? e.collectionGroup
                : e.path.lastSegment()),
            (this.nn = e.orderBy),
            (this.rn = []);
          for (const t of e.filters) {
            const e = t;
            e.isInequality() ? (this.tn = this.tn.add(e)) : this.rn.push(e);
          }
        }
        get sn() {
          return 1 < this.tn.size;
        }
        on(e) {
          if ((p(e.collectionGroup === this.collectionId), this.sn)) return !1;
          const t = Se(e);
          if (void 0 !== t && !this._n(t)) return !1;
          const n = xe(e);
          let r = new Set(),
            s = 0,
            i = 0;
          for (; s < n.length && this._n(n[s]); ++s)
            r = r.add(n[s].fieldPath.canonicalString());
          if (s === n.length) return !0;
          if (0 < this.tn.size) {
            const e = this.tn.getIterator().getNext();
            if (!r.has(e.field.canonicalString())) {
              const t = n[s];
              if (!this.an(e, t) || !this.un(this.nn[i++], t)) return !1;
            }
            ++s;
          }
          for (; s < n.length; ++s) {
            const e = n[s];
            if (i >= this.nn.length || !this.un(this.nn[i++], e)) return !1;
          }
          return !0;
        }
        cn() {
          if (this.sn) return null;
          let e = new A(c.comparator);
          const t = [];
          for (const n of this.rn)
            n.field.isKeyField() ||
              ("array-contains" === n.op || "array-contains-any" === n.op
                ? t.push(new De(n.field, 2))
                : e.has(n.field) ||
                  ((e = e.add(n.field)), t.push(new De(n.field, 0))));
          for (const r of this.nn)
            r.field.isKeyField() ||
              e.has(r.field) ||
              ((e = e.add(r.field)),
              t.push(new De(r.field, "asc" === r.dir ? 0 : 1)));
          return new Ee(Ee.UNKNOWN_ID, this.collectionId, t, Ae.empty());
        }
        _n(e) {
          for (const t of this.rn) if (this.an(t, e)) return !0;
          return !1;
        }
        an(e, t) {
          if (void 0 === e || !e.field.isEqual(t.fieldPath)) return !1;
          e = "array-contains" === e.op || "array-contains-any" === e.op;
          return (2 === t.kind) == e;
        }
        un(e, t) {
          return (
            !!e.field.isEqual(t.fieldPath) &&
            ((0 === t.kind && "asc" === e.dir) ||
              (1 === t.kind && "desc" === e.dir))
          );
        }
      }
      function li(e) {
        return e instanceof L;
      }
      function di(e) {
        return e instanceof O && xn(e);
      }
      function fi(e) {
        return (
          li(e) ||
          di(e) ||
          (function (e) {
            if (e instanceof O && Sn(e)) {
              for (const t of e.getFilters()) if (!li(t) && !di(t)) return !1;
              return !0;
            }
            return !1;
          })(e)
        );
      }
      function gi(e, t) {
        var n, r;
        return (
          p(e instanceof L || e instanceof O),
          p(t instanceof L || t instanceof O),
          pi(
            e instanceof L
              ? t instanceof L
                ? ((n = e), (r = t), O.create([n, r], "and"))
                : mi(e, t)
              : t instanceof L
              ? mi(t, e)
              : (function (e, t) {
                  if (
                    (p(0 < e.filters.length && 0 < t.filters.length),
                    mn(e) && mn(t))
                  )
                    return An(e, t.getFilters());
                  const n = Sn(e) ? e : t,
                    r = Sn(e) ? t : e,
                    s = n.filters.map((e) => gi(e, r));
                  return O.create(s, "or");
                })(e, t)
          )
        );
      }
      function mi(t, e) {
        if (mn(e)) return An(e, t.getFilters());
        e = e.filters.map((e) => gi(t, e));
        return O.create(e, "or");
      }
      function pi(t) {
        if ((p(t instanceof L || t instanceof O), t instanceof L)) return t;
        const e = t.getFilters();
        if (1 === e.length) return pi(e[0]);
        if (Dn(t)) return t;
        const n = e.map((e) => pi(e)),
          r = [];
        return (
          n.forEach((e) => {
            e instanceof L
              ? r.push(e)
              : e instanceof O &&
                (e.op === t.op ? r.push(...e.filters) : r.push(e));
          }),
          1 === r.length ? r[0] : O.create(r, t.op)
        );
      }
      class yi {
        constructor() {
          this.ln = new vi();
        }
        addToCollectionParentIndex(e, t) {
          return this.ln.add(t), x.resolve();
        }
        getCollectionParents(e, t) {
          return x.resolve(this.ln.getEntries(t));
        }
        addFieldIndex(e, t) {
          return x.resolve();
        }
        deleteFieldIndex(e, t) {
          return x.resolve();
        }
        deleteAllFieldIndexes(e) {
          return x.resolve();
        }
        createTargetIndexes(e, t) {
          return x.resolve();
        }
        getDocumentsMatchingTarget(e, t) {
          return x.resolve(null);
        }
        getIndexType(e, t) {
          return x.resolve(0);
        }
        getFieldIndexes(e, t) {
          return x.resolve([]);
        }
        getNextCollectionGroupToUpdate(e) {
          return x.resolve(null);
        }
        getMinOffset(e, t) {
          return x.resolve(ke.min());
        }
        getMinOffsetFromCollectionGroup(e, t) {
          return x.resolve(ke.min());
        }
        updateCollectionGroup(e, t, n) {
          return x.resolve();
        }
        updateIndexEntries(e, t) {
          return x.resolve();
        }
      }
      class vi {
        constructor() {
          this.index = {};
        }
        add(e) {
          const t = e.lastSegment(),
            n = e.popLast(),
            r = this.index[t] || new A(E.comparator),
            s = !r.has(n);
          return (this.index[t] = r.add(n)), s;
        }
        has(e) {
          const t = e.lastSegment(),
            n = e.popLast(),
            r = this.index[t];
          return r && r.has(n);
        }
        getEntries(e) {
          return (this.index[e] || new A(E.comparator)).toArray();
        }
      }
      const wi = new Uint8Array(0);
      class _i {
        constructor(e, t) {
          (this.databaseId = t),
            (this.hn = new vi()),
            (this.Pn = new or(
              (e) => Bn(e),
              (e, t) => qn(e, t)
            )),
            (this.uid = e.uid || "");
        }
        addToCollectionParentIndex(e, t) {
          if (this.hn.has(t)) return x.resolve();
          var n = t.lastSegment(),
            r = t.popLast();
          return (
            e.addOnCommittedListener(() => {
              this.hn.add(t);
            }),
            (r = { collectionId: n, parent: u(r) }),
            bi(e).put(r)
          );
        }
        getCollectionParents(e, n) {
          const r = [],
            t = IDBKeyRange.bound([n, ""], [be(n), ""], !1, !0);
          return bi(e)
            .U(t)
            .next((e) => {
              for (const t of e) {
                if (t.collectionId !== n) break;
                r.push(Ze(t.parent));
              }
              return r;
            });
        }
        addFieldIndex(e, t) {
          const n = Ti(e),
            r = {
              indexId: t.indexId,
              collectionGroup: t.collectionGroup,
              fields: t.fields.map((e) => [
                e.fieldPath.canonicalString(),
                e.kind,
              ]),
            },
            s = (delete r.indexId, n.add(r));
          if (t.indexState) {
            const n = Ei(e);
            return s.next((e) => {
              n.put(
                Hs(
                  e,
                  this.uid,
                  t.indexState.sequenceNumber,
                  t.indexState.offset
                )
              );
            });
          }
          return s.next();
        }
        deleteFieldIndex(e, t) {
          const n = Ti(e),
            r = Ei(e),
            s = Ii(e);
          return n
            .delete(t.indexId)
            .next(() =>
              r.delete(IDBKeyRange.bound([t.indexId], [t.indexId + 1], !1, !0))
            )
            .next(() =>
              s.delete(IDBKeyRange.bound([t.indexId], [t.indexId + 1], !1, !0))
            );
        }
        deleteAllFieldIndexes(e) {
          const t = Ti(e),
            n = Ii(e),
            r = Ei(e);
          return t
            .j()
            .next(() => n.j())
            .next(() => r.j());
        }
        createTargetIndexes(n, e) {
          return x.forEach(this.Tn(e), (t) =>
            this.getIndexType(n, t).next((e) => {
              if (0 === e || 1 === e) {
                const e = new ci(t).cn();
                if (null != e) return this.addFieldIndex(n, e);
              }
            })
          );
        }
        getDocumentsMatchingTarget(e, h) {
          const c = Ii(e);
          let l = !0;
          const n = new Map();
          return x
            .forEach(this.Tn(h), (t) =>
              this.In(e, t).next((e) => {
                (l = l && !!e), n.set(t, e);
              })
            )
            .next(() => {
              if (l) {
                let u = M();
                const l = [];
                return x
                  .forEach(n, (e, t) => {
                    m(
                      "IndexedDbIndexManager",
                      `Using index ${
                        ((n = e),
                        `id=${n.indexId}|cg=${n.collectionGroup}|f=` +
                          n.fields
                            .map((e) => e.fieldPath + ":" + e.kind)
                            .join(","))
                      } to execute ` + Bn(h)
                    );
                    var n = (function (e, t) {
                        var n = Se(t);
                        if (void 0 === n) return null;
                        for (const t of Gn(e, n.fieldPath))
                          switch (t.op) {
                            case "array-contains-any":
                              return t.value.arrayValue.values || [];
                            case "array-contains":
                              return [t.value];
                          }
                        return null;
                      })(t, e),
                      r = (function (e, t) {
                        const n = new Map();
                        for (const r of xe(t))
                          for (const t of Gn(e, r.fieldPath))
                            switch (t.op) {
                              case "==":
                              case "in":
                                n.set(r.fieldPath.canonicalString(), t.value);
                                break;
                              case "not-in":
                              case "!=":
                                return (
                                  n.set(r.fieldPath.canonicalString(), t.value),
                                  Array.from(n.values())
                                );
                            }
                        return null;
                      })(t, e),
                      s = (function (e, t) {
                        const n = [];
                        let r = !0;
                        for (const s of xe(t)) {
                          const t = (0 === s.kind ? zn : Kn)(
                            e,
                            s.fieldPath,
                            e.startAt
                          );
                          n.push(t.value), (r = r && t.inclusive);
                        }
                        return new cn(n, r);
                      })(t, e),
                      i = (function (e, t) {
                        const n = [];
                        let r = !0;
                        for (const s of xe(t)) {
                          const t = (0 === s.kind ? Kn : zn)(
                            e,
                            s.fieldPath,
                            e.endAt
                          );
                          n.push(t.value), (r = r && t.inclusive);
                        }
                        return new cn(n, r);
                      })(t, e),
                      a = this.En(e, t, s),
                      o = this.En(e, t, i),
                      r = this.dn(e, t, r),
                      r = this.An(
                        e.indexId,
                        n,
                        a,
                        s.inclusive,
                        o,
                        i.inclusive,
                        r
                      );
                    return x.forEach(r, (e) =>
                      c.G(e, h.limit).next((e) => {
                        e.forEach((e) => {
                          e = S.fromSegments(e.documentKey);
                          u.has(e) || ((u = u.add(e)), l.push(e));
                        });
                      })
                    );
                  })
                  .next(() => l);
              }
              return x.resolve(null);
            });
        }
        Tn(t) {
          var e;
          return (
            this.Pn.get(t) ||
            ((e =
              0 === t.filters.length
                ? [t]
                : (function (e) {
                    if (0 === e.getFilters().length) return [];
                    const t = (function t(e) {
                      if ((p(e instanceof L || e instanceof O), e instanceof L))
                        return e;
                      if (1 === e.filters.length) return t(e.filters[0]);
                      var n = e.filters.map((e) => t(e));
                      let r = O.create(n, e.op);
                      return fi((r = pi(r)))
                        ? r
                        : (p(r instanceof O),
                          p(mn(r)),
                          p(1 < r.filters.length),
                          r.filters.reduce((e, t) => gi(e, t)));
                    })(
                      (function t(n) {
                        var e;
                        if (
                          (p(n instanceof L || n instanceof O), n instanceof L)
                        ) {
                          if (n instanceof Mn) {
                            const r =
                              (null ==
                              (e =
                                null == (e = n.value.arrayValue)
                                  ? void 0
                                  : e.values)
                                ? void 0
                                : e.map((e) => L.create(n.field, "==", e))) ||
                              [];
                            return O.create(r, "or");
                          }
                          return n;
                        }
                        const r = n.filters.map((e) => t(e));
                        return O.create(r, n.op);
                      })(e)
                    );
                    return p(fi(t)), li(t) || di(t) ? [t] : t.getFilters();
                  })(O.create(t.filters, "and")).map((e) =>
                    Un(
                      t.path,
                      t.collectionGroup,
                      t.orderBy,
                      e.getFilters(),
                      t.limit,
                      t.startAt,
                      t.endAt
                    )
                  )),
            this.Pn.set(t, e),
            e)
          );
        }
        An(t, n, r, s, i, a, o) {
          const u = (null != n ? n.length : 1) * Math.max(r.length, i.length),
            h = u / (null != n ? n.length : 1),
            c = [];
          for (let e = 0; e < u; ++e) {
            const u = n ? this.Rn(n[e / h]) : wi,
              l = this.Vn(t, u, r[e % h], s),
              d = this.mn(t, u, i[e % h], a),
              f = o.map((e) => this.Vn(t, u, e, !0));
            c.push(...this.createRange(l, d, f));
          }
          return c;
        }
        Vn(e, t, n, r) {
          const s = new oi(e, S.empty(), t, n);
          return r ? s : s.en();
        }
        mn(e, t, n, r) {
          const s = new oi(e, S.empty(), t, n);
          return r ? s.en() : s;
        }
        In(e, t) {
          const r = new ci(t),
            n =
              null != t.collectionGroup
                ? t.collectionGroup
                : t.path.lastSegment();
          return this.getFieldIndexes(e, n).next((e) => {
            let t = null;
            for (const n of e)
              r.on(n) && (!t || n.fields.length > t.fields.length) && (t = n);
            return t;
          });
        }
        getIndexType(e, t) {
          let n = 2;
          const r = this.Tn(t);
          return x
            .forEach(r, (t) =>
              this.In(e, t).next((e) => {
                e
                  ? 0 !== n &&
                    e.fields.length <
                      (function (e) {
                        let t = new A(c.comparator),
                          n = !1;
                        for (const r of e.filters)
                          for (const e of r.getFlattenedFilters())
                            e.field.isKeyField() ||
                              ("array-contains" === e.op ||
                              "array-contains-any" === e.op
                                ? (n = !0)
                                : (t = t.add(e.field)));
                        for (const n of e.orderBy)
                          n.field.isKeyField() || (t = t.add(n.field));
                        return t.size + (n ? 1 : 0);
                      })(t) &&
                    (n = 1)
                  : (n = 0);
              })
            )
            .next(() => (null !== t.limit && 1 < r.length && 2 === n ? 1 : n));
        }
        fn(e, t) {
          const n = new ai();
          for (const s of xe(e)) {
            const e = t.data.field(s.fieldPath);
            if (null == e) return null;
            var r = n.Xt(s.kind);
            ti.Ft.Et(e, r);
          }
          return n.Ht();
        }
        Rn(e) {
          const t = new ai();
          return ti.Ft.Et(e, t.Xt(0)), t.Ht();
        }
        gn(e, t) {
          const n = new ai();
          return (
            ti.Ft.Et(
              Yt(this.databaseId, t),
              n.Xt(0 === (t = xe(e)).length ? 0 : t[t.length - 1].kind)
            ),
            n.Ht()
          );
        }
        dn(e, t, n) {
          if (null === n) return [];
          let r = [],
            s = (r.push(new ai()), 0);
          for (const i of xe(e)) {
            const e = n[s++];
            for (const n of r)
              if (this.pn(t, i.fieldPath) && Zt(e)) r = this.yn(r, i, e);
              else {
                const t = n.Xt(i.kind);
                ti.Ft.Et(e, t);
              }
          }
          return this.wn(r);
        }
        En(e, t, n) {
          return this.dn(e, t, n.position);
        }
        wn(t) {
          const n = [];
          for (let e = 0; e < t.length; ++e) n[e] = t[e].Ht();
          return n;
        }
        yn(e, t, n) {
          const r = [...e],
            s = [];
          for (const e of n.arrayValue.values || [])
            for (const n of r) {
              const r = new ai();
              r.seed(n.Ht()), ti.Ft.Et(e, r.Xt(t.kind)), s.push(r);
            }
          return s;
        }
        pn(e, t) {
          return !!e.filters.find(
            (e) =>
              e instanceof L &&
              e.field.isEqual(t) &&
              ("in" === e.op || "not-in" === e.op)
          );
        }
        getFieldIndexes(e, t) {
          const n = Ti(e),
            i = Ei(e);
          return (
            t ? n.U("collectionGroupIndex", IDBKeyRange.bound(t, t)) : n.U()
          ).next((e) => {
            const s = [];
            return x
              .forEach(e, (r) =>
                i.get([r.indexId, this.uid]).next((e) => {
                  var t, n;
                  s.push(
                    ((t = r),
                    (e = e
                      ? new Ae(
                          e.sequenceNumber,
                          new ke(
                            qs(e.readTime),
                            new S(Ze(e.documentKey)),
                            e.largestBatchId
                          )
                        )
                      : Ae.empty()),
                    (n = t.fields.map(
                      ([e, t]) => new De(c.fromServerFormat(e), t)
                    )),
                    new Ee(t.indexId, t.collectionGroup, n, e))
                  );
                })
              )
              .next(() => s);
          });
        }
        getNextCollectionGroupToUpdate(e) {
          return this.getFieldIndexes(e).next((e) =>
            0 === e.length
              ? null
              : (e.sort((e, t) => {
                  var n =
                    e.indexState.sequenceNumber - t.indexState.sequenceNumber;
                  return 0 != n ? n : T(e.collectionGroup, t.collectionGroup);
                }),
                e[0].collectionGroup)
          );
        }
        updateCollectionGroup(e, n, r) {
          const s = Ti(e),
            i = Ei(e);
          return this.Sn(e).next((t) =>
            s
              .U("collectionGroupIndex", IDBKeyRange.bound(n, n))
              .next((e) =>
                x.forEach(e, (e) => i.put(Hs(e.indexId, this.uid, t, r)))
              )
          );
        }
        updateIndexEntries(s, e) {
          const n = new Map();
          return x.forEach(e, (t, r) => {
            var e = n.get(t.collectionGroup);
            return (
              e ? x.resolve(e) : this.getFieldIndexes(s, t.collectionGroup)
            ).next(
              (e) => (
                n.set(t.collectionGroup, e),
                x.forEach(e, (n) =>
                  this.bn(s, t, n).next((e) => {
                    var t = this.Dn(r, n);
                    return e.isEqual(t) ? x.resolve() : this.vn(s, r, n, e, t);
                  })
                )
              )
            );
          });
        }
        Cn(e, t, n, r) {
          return Ii(e).put({
            indexId: r.indexId,
            uid: this.uid,
            arrayValue: r.arrayValue,
            directionalValue: r.directionalValue,
            orderedDocumentKey: this.gn(n, t.key),
            documentKey: t.key.path.toArray(),
          });
        }
        Fn(e, t, n, r) {
          return Ii(e).delete([
            r.indexId,
            this.uid,
            r.arrayValue,
            r.directionalValue,
            this.gn(n, t.key),
            t.key.path.toArray(),
          ]);
        }
        bn(e, n, r) {
          const t = Ii(e);
          let s = new A(ui);
          return t
            .J(
              {
                index: "documentKeyIndex",
                range: IDBKeyRange.only([r.indexId, this.uid, this.gn(r, n)]),
              },
              (e, t) => {
                s = s.add(
                  new oi(r.indexId, n, t.arrayValue, t.directionalValue)
                );
              }
            )
            .next(() => s);
        }
        Dn(e, t) {
          let n = new A(ui);
          var r = this.fn(t, e);
          if (null == r) return n;
          const s = Se(t);
          if (null != s) {
            var i = e.data.field(s.fieldPath);
            if (Zt(i))
              for (const s of i.arrayValue.values || [])
                n = n.add(new oi(t.indexId, e.key, this.Rn(s), r));
          } else n = n.add(new oi(t.indexId, e.key, wi, r));
          return n;
        }
        vn(t, s, i, e, a) {
          m(
            "IndexedDbIndexManager",
            "Updating index entries for document '%s'",
            s.key
          );
          const o = [];
          {
            var u = ui,
              h = (e) => {
                o.push(this.Cn(t, s, i, e));
              },
              c = (e) => {
                o.push(this.Fn(t, s, i, e));
              },
              l = e.getIterator(),
              d = a.getIterator();
            let n = kt(l),
              r = kt(d);
            for (; n || r; ) {
              let e = !1,
                t = !1;
              if (n && r) {
                const h = u(n, r);
                h < 0 ? (t = !0) : 0 < h && (e = !0);
              } else null != n ? (t = !0) : (e = !0);
              e
                ? (h(r), (r = kt(d)))
                : t
                ? (c(n), (n = kt(l)))
                : ((n = kt(l)), (r = kt(d)));
            }
          }
          return x.waitFor(o);
        }
        Sn(e) {
          let r = 1;
          return Ei(e)
            .J(
              {
                index: "sequenceNumberIndex",
                reverse: !0,
                range: IDBKeyRange.upperBound([
                  this.uid,
                  Number.MAX_SAFE_INTEGER,
                ]),
              },
              (e, t, n) => {
                n.done(), (r = t.sequenceNumber + 1);
              }
            )
            .next(() => r);
        }
        createRange(e, t, n) {
          n = n
            .sort((e, t) => ui(e, t))
            .filter((e, t, n) => !t || 0 !== ui(e, n[t - 1]));
          const r = [];
          r.push(e);
          for (const s of n) {
            const n = ui(s, e),
              i = ui(s, t);
            if (0 === n) r[0] = e.en();
            else if (0 < n && i < 0) r.push(s), r.push(s.en());
            else if (0 < i) break;
          }
          r.push(t);
          const s = [];
          for (let e = 0; e < r.length; e += 2) {
            if (this.Mn(r[e], r[e + 1])) return [];
            const t = [
                r[e].indexId,
                this.uid,
                r[e].arrayValue,
                r[e].directionalValue,
                wi,
                [],
              ],
              n = [
                r[e + 1].indexId,
                this.uid,
                r[e + 1].arrayValue,
                r[e + 1].directionalValue,
                wi,
                [],
              ];
            s.push(IDBKeyRange.bound(t, n));
          }
          return s;
        }
        Mn(e, t) {
          return 0 < ui(e, t);
        }
        getMinOffsetFromCollectionGroup(e, t) {
          return this.getFieldIndexes(e, t).next(Si);
        }
        getMinOffset(t, e) {
          return x
            .mapArray(this.Tn(e), (e) => this.In(t, e).next((e) => e || I()))
            .next(Si);
        }
      }
      function bi(e) {
        return n(e, "collectionParents");
      }
      function Ii(e) {
        return n(e, "indexEntries");
      }
      function Ti(e) {
        return n(e, "indexConfiguration");
      }
      function Ei(e) {
        return n(e, "indexState");
      }
      function Si(t) {
        p(0 !== t.length);
        let n = t[0].indexState.offset,
          r = n.largestBatchId;
        for (let e = 1; e < t.length; e++) {
          var s = t[e].indexState.offset;
          Re(s, n) < 0 && (n = s),
            r < s.largestBatchId && (r = s.largestBatchId);
        }
        return new ke(n.readTime, n.documentKey, r);
      }
      const xi = {
        didRun: !1,
        sequenceNumbersCollected: 0,
        targetsRemoved: 0,
        documentsRemoved: 0,
      };
      class Di {
        static withCacheSize(e) {
          return new Di(
            e,
            Di.DEFAULT_COLLECTION_PERCENTILE,
            Di.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT
          );
        }
        constructor(e, t, n) {
          (this.cacheSizeCollectionThreshold = e),
            (this.percentileToCollect = t),
            (this.maximumSequenceNumbersToCollect = n);
        }
      }
      function Ai(e, t, n) {
        const r = e.store("mutations"),
          s = e.store("documentMutations"),
          i = [],
          a = IDBKeyRange.only(n.batchId);
        let o = 0;
        const u = r.J({ range: a }, (e, t, n) => (o++, n.delete())),
          h =
            (i.push(
              u.next(() => {
                p(1 === o);
              })
            ),
            []);
        for (const e of n.mutations) {
          const r = nt(t, e.key.path, n.batchId);
          i.push(s.delete(r)), h.push(e.key);
        }
        return x.waitFor(i).next(() => h);
      }
      function Ci(e) {
        if (!e) return 0;
        let t;
        if (e.document) t = e.document;
        else if (e.unknownDocument) t = e.unknownDocument;
        else {
          if (!e.noDocument) throw I();
          t = e.noDocument;
        }
        return JSON.stringify(t).length;
      }
      (Di.DEFAULT_COLLECTION_PERCENTILE = 10),
        (Di.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3),
        (Di.DEFAULT = new Di(
          41943040,
          Di.DEFAULT_COLLECTION_PERCENTILE,
          Di.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT
        )),
        (Di.DISABLED = new Di(-1, 0, 0));
      class Ni {
        constructor(e, t, n, r) {
          (this.userId = e),
            (this.serializer = t),
            (this.indexManager = n),
            (this.referenceDelegate = r),
            (this.xn = {});
        }
        static Pt(e, t, n, r) {
          p("" !== e.uid);
          e = e.isAuthenticated() ? e.uid : "";
          return new Ni(e, t, n, r);
        }
        checkEmpty(e) {
          let r = !0;
          var t = IDBKeyRange.bound(
            [this.userId, Number.NEGATIVE_INFINITY],
            [this.userId, Number.POSITIVE_INFINITY]
          );
          return Ri(e)
            .J({ index: "userMutationsIndex", range: t }, (e, t, n) => {
              (r = !1), n.done();
            })
            .next(() => r);
        }
        addMutationBatch(c, l, d, f) {
          const g = Li(c),
            m = Ri(c);
          return m.add({}).next((e) => {
            p("number" == typeof e);
            const t = new Gr(e, l, d, f),
              n =
                ((s = this.serializer),
                (i = this.userId),
                (o = (a = t).baseMutations.map((e) => As(s.ht, e))),
                (u = a.mutations.map((e) => As(s.ht, e))),
                {
                  userId: i,
                  batchId: a.batchId,
                  localWriteTimeMs: a.localWriteTime.toMillis(),
                  baseMutations: o,
                  mutations: u,
                }),
              r = [];
            var s, i, a, o, u;
            let h = new A((e, t) =>
              T(e.canonicalString(), t.canonicalString())
            );
            for (const c of f) {
              const l = nt(this.userId, c.key.path, e);
              (h = h.add(c.key.path.popLast())),
                r.push(m.put(n)),
                r.push(g.put(l, rt));
            }
            return (
              h.forEach((e) => {
                r.push(this.indexManager.addToCollectionParentIndex(c, e));
              }),
              c.addOnCommittedListener(() => {
                this.xn[e] = t.keys();
              }),
              x.waitFor(r).next(() => t)
            );
          });
        }
        lookupMutationBatch(e, t) {
          return Ri(e)
            .get(t)
            .next((e) =>
              e ? (p(e.userId === this.userId), js(this.serializer, e)) : null
            );
        }
        On(e, t) {
          return this.xn[t]
            ? x.resolve(this.xn[t])
            : this.lookupMutationBatch(e, t).next((e) => {
                return e ? ((e = e.keys()), (this.xn[t] = e)) : null;
              });
        }
        getNextMutationBatchAfterBatchId(e, t) {
          const r = t + 1,
            n = IDBKeyRange.lowerBound([this.userId, r]);
          let s = null;
          return Ri(e)
            .J({ index: "userMutationsIndex", range: n }, (e, t, n) => {
              t.userId === this.userId &&
                (p(t.batchId >= r), (s = js(this.serializer, t))),
                n.done();
            })
            .next(() => s);
        }
        getHighestUnacknowledgedBatchId(e) {
          var t = IDBKeyRange.upperBound([
            this.userId,
            Number.POSITIVE_INFINITY,
          ]);
          let r = -1;
          return Ri(e)
            .J(
              { index: "userMutationsIndex", range: t, reverse: !0 },
              (e, t, n) => {
                (r = t.batchId), n.done();
              }
            )
            .next(() => r);
        }
        getAllMutationBatches(e) {
          var t = IDBKeyRange.bound(
            [this.userId, -1],
            [this.userId, Number.POSITIVE_INFINITY]
          );
          return Ri(e)
            .U("userMutationsIndex", t)
            .next((e) => e.map((e) => js(this.serializer, e)));
        }
        getAllMutationBatchesAffectingDocumentKey(i, a) {
          const e = tt(this.userId, a.path),
            t = IDBKeyRange.lowerBound(e),
            o = [];
          return Li(i)
            .J({ range: t }, (e, t, n) => {
              var [e, r, s] = e,
                r = Ze(r);
              if (e === this.userId && a.path.isEqual(r))
                return Ri(i)
                  .get(s)
                  .next((e) => {
                    if (!e) throw I();
                    p(e.userId === this.userId), o.push(js(this.serializer, e));
                  });
              n.done();
            })
            .next(() => o);
        }
        getAllMutationBatchesAffectingDocumentKeys(t, e) {
          let a = new A(T);
          const n = [];
          return (
            e.forEach((i) => {
              var e = tt(this.userId, i.path),
                e = IDBKeyRange.lowerBound(e),
                e = Li(t).J({ range: e }, (e, t, n) => {
                  var [e, r, s] = e,
                    r = Ze(r);
                  e === this.userId && i.path.isEqual(r)
                    ? (a = a.add(s))
                    : n.done();
                });
              n.push(e);
            }),
            x.waitFor(n).next(() => this.Nn(t, a))
          );
        }
        getAllMutationBatchesAffectingQuery(e, t) {
          const i = t.path,
            a = i.length + 1,
            n = tt(this.userId, i),
            r = IDBKeyRange.lowerBound(n);
          let o = new A(T);
          return Li(e)
            .J({ range: r }, (e, t, n) => {
              var [e, r, s] = e,
                r = Ze(r);
              e === this.userId && i.isPrefixOf(r)
                ? r.length === a && (o = o.add(s))
                : n.done();
            })
            .next(() => this.Nn(e, o));
        }
        Nn(t, e) {
          const n = [],
            r = [];
          return (
            e.forEach((e) => {
              r.push(
                Ri(t)
                  .get(e)
                  .next((e) => {
                    if (null === e) throw I();
                    p(e.userId === this.userId), n.push(js(this.serializer, e));
                  })
              );
            }),
            x.waitFor(r).next(() => n)
          );
        }
        removeMutationBatch(t, n) {
          return Ai(t._e, this.userId, n).next(
            (e) => (
              t.addOnCommittedListener(() => {
                this.Ln(n.batchId);
              }),
              x.forEach(e, (e) =>
                this.referenceDelegate.markPotentiallyOrphaned(t, e)
              )
            )
          );
        }
        Ln(e) {
          delete this.xn[e];
        }
        performConsistencyCheck(n) {
          return this.checkEmpty(n).next((e) => {
            if (!e) return x.resolve();
            const t = IDBKeyRange.lowerBound([this.userId]),
              r = [];
            return Li(n)
              .J({ range: t }, (e, t, n) => {
                if (e[0] === this.userId) {
                  const t = Ze(e[1]);
                  r.push(t);
                } else n.done();
              })
              .next(() => {
                p(0 === r.length);
              });
          });
        }
        containsKey(e, t) {
          return ki(e, this.userId, t);
        }
        Bn(e) {
          return Oi(e)
            .get(this.userId)
            .next(
              (e) =>
                e || {
                  userId: this.userId,
                  lastAcknowledgedBatchId: -1,
                  lastStreamToken: "",
                }
            );
        }
      }
      function ki(e, s, t) {
        const n = tt(s, t.path),
          i = n[1],
          r = IDBKeyRange.lowerBound(n);
        let a = !1;
        return Li(e)
          .J({ range: r, H: !0 }, (e, t, n) => {
            var [e, r] = e;
            e === s && r === i && (a = !0), n.done();
          })
          .next(() => a);
      }
      function Ri(e) {
        return n(e, "mutations");
      }
      function Li(e) {
        return n(e, "documentMutations");
      }
      function Oi(e) {
        return n(e, "mutationQueues");
      }
      class Mi {
        constructor(e) {
          this.kn = e;
        }
        next() {
          return (this.kn += 2), this.kn;
        }
        static qn() {
          return new Mi(0);
        }
        static Qn() {
          return new Mi(-1);
        }
      }
      class Vi {
        constructor(e, t) {
          (this.referenceDelegate = e), (this.serializer = t);
        }
        allocateTargetId(n) {
          return this.Kn(n).next((e) => {
            const t = new Mi(e.highestTargetId);
            return (
              (e.highestTargetId = t.next()),
              this.$n(n, e).next(() => e.highestTargetId)
            );
          });
        }
        getLastRemoteSnapshotVersion(e) {
          return this.Kn(e).next((e) =>
            b.fromTimestamp(
              new y(
                e.lastRemoteSnapshotVersion.seconds,
                e.lastRemoteSnapshotVersion.nanoseconds
              )
            )
          );
        }
        getHighestSequenceNumber(e) {
          return this.Kn(e).next((e) => e.highestListenSequenceNumber);
        }
        setTargetsMetadata(t, n, r) {
          return this.Kn(t).next(
            (e) => (
              (e.highestListenSequenceNumber = n),
              r && (e.lastRemoteSnapshotVersion = r.toTimestamp()),
              n > e.highestListenSequenceNumber &&
                (e.highestListenSequenceNumber = n),
              this.$n(t, e)
            )
          );
        }
        addTargetData(t, n) {
          return this.Un(t, n).next(() =>
            this.Kn(t).next(
              (e) => ((e.targetCount += 1), this.Wn(n, e), this.$n(t, e))
            )
          );
        }
        updateTargetData(e, t) {
          return this.Un(e, t);
        }
        removeTargetData(t, e) {
          return this.removeMatchingKeysForTargetId(t, e.targetId)
            .next(() => Fi(t).delete(e.targetId))
            .next(() => this.Kn(t))
            .next(
              (e) => (p(0 < e.targetCount), --e.targetCount, this.$n(t, e))
            );
        }
        removeTargets(n, r, s) {
          let i = 0;
          const a = [];
          return Fi(n)
            .J((e, t) => {
              t = Gs(t);
              t.sequenceNumber <= r &&
                null === s.get(t.targetId) &&
                (i++, a.push(this.removeTargetData(n, t)));
            })
            .next(() => x.waitFor(a))
            .next(() => i);
        }
        forEachTarget(e, n) {
          return Fi(e).J((e, t) => {
            t = Gs(t);
            n(t);
          });
        }
        Kn(e) {
          return Pi(e)
            .get("targetGlobalKey")
            .next((e) => (p(null !== e), e));
        }
        $n(e, t) {
          return Pi(e).put("targetGlobalKey", t);
        }
        Un(e, t) {
          return Fi(e).put(zs(this.serializer, t));
        }
        Wn(e, t) {
          let n = !1;
          return (
            e.targetId > t.highestTargetId &&
              ((t.highestTargetId = e.targetId), (n = !0)),
            e.sequenceNumber > t.highestListenSequenceNumber &&
              ((t.highestListenSequenceNumber = e.sequenceNumber), (n = !0)),
            n
          );
        }
        getTargetCount(e) {
          return this.Kn(e).next((e) => e.targetCount);
        }
        getTargetData(e, r) {
          var t = Bn(r),
            t = IDBKeyRange.bound(
              [t, Number.NEGATIVE_INFINITY],
              [t, Number.POSITIVE_INFINITY]
            );
          let s = null;
          return Fi(e)
            .J({ range: t, index: "queryTargetsIndex" }, (e, t, n) => {
              t = Gs(t);
              qn(r, t.target) && ((s = t), n.done());
            })
            .next(() => s);
        }
        addMatchingKeys(n, e, r) {
          const s = [],
            i = Ui(n);
          return (
            e.forEach((e) => {
              var t = u(e.path);
              s.push(i.put({ targetId: r, path: t })),
                s.push(this.referenceDelegate.addReference(n, r, e));
            }),
            x.waitFor(s)
          );
        }
        removeMatchingKeys(n, e, r) {
          const s = Ui(n);
          return x.forEach(e, (e) => {
            var t = u(e.path);
            return x.waitFor([
              s.delete([r, t]),
              this.referenceDelegate.removeReference(n, r, e),
            ]);
          });
        }
        removeMatchingKeysForTargetId(e, t) {
          const n = Ui(e),
            r = IDBKeyRange.bound([t], [t + 1], !1, !0);
          return n.delete(r);
        }
        getMatchingKeysForTargetId(e, t) {
          const n = IDBKeyRange.bound([t], [t + 1], !1, !0),
            r = Ui(e);
          let s = M();
          return r
            .J({ range: n, H: !0 }, (e, t, n) => {
              (e = Ze(e[1])), (e = new S(e));
              s = s.add(e);
            })
            .next(() => s);
        }
        containsKey(e, t) {
          (t = u(t.path)), (t = IDBKeyRange.bound([t], [be(t)], !1, !0));
          let r = 0;
          return Ui(e)
            .J(
              { index: "documentTargetsIndex", H: !0, range: t },
              ([e], t, n) => {
                0 !== e && (r++, n.done());
              }
            )
            .next(() => 0 < r);
        }
        ut(e, t) {
          return Fi(e)
            .get(t)
            .next((e) => (e ? Gs(e) : null));
        }
      }
      function Fi(e) {
        return n(e, "targets");
      }
      function Pi(e) {
        return n(e, "targetGlobal");
      }
      function Ui(e) {
        return n(e, "targetDocuments");
      }
      function Bi([e, t], [n, r]) {
        e = T(e, n);
        return 0 === e ? T(t, r) : e;
      }
      class qi {
        constructor(e) {
          (this.Gn = e), (this.buffer = new A(Bi)), (this.zn = 0);
        }
        jn() {
          return ++this.zn;
        }
        Hn(e) {
          var t = [e, this.jn()];
          if (this.buffer.size < this.Gn) this.buffer = this.buffer.add(t);
          else {
            const e = this.buffer.last();
            Bi(t, e) < 0 && (this.buffer = this.buffer.delete(e).add(t));
          }
        }
        get maxValue() {
          return this.buffer.last()[0];
        }
      }
      class ji {
        constructor(e, t, n) {
          (this.garbageCollector = e),
            (this.asyncQueue = t),
            (this.localStore = n),
            (this.Jn = null);
        }
        start() {
          -1 !== this.garbageCollector.params.cacheSizeCollectionThreshold &&
            this.Yn(6e4);
        }
        stop() {
          this.Jn && (this.Jn.cancel(), (this.Jn = null));
        }
        get started() {
          return null !== this.Jn;
        }
        Yn(e) {
          m("LruGarbageCollector", `Garbage collection scheduled in ${e}ms`),
            (this.Jn = this.asyncQueue.enqueueAfterDelay(
              "lru_garbage_collection",
              e,
              async () => {
                this.Jn = null;
                try {
                  await this.localStore.collectGarbage(this.garbageCollector);
                } catch (e) {
                  qe(e)
                    ? m(
                        "LruGarbageCollector",
                        "Ignoring IndexedDB error during garbage collection: ",
                        e
                      )
                    : await Me(e);
                }
                await this.Yn(3e5);
              }
            ));
        }
      }
      class Gi {
        constructor(e, t) {
          (this.Zn = e), (this.params = t);
        }
        calculateTargetCount(e, t) {
          return this.Zn.Xn(e).next((e) => Math.floor((t / 100) * e));
        }
        nthSequenceNumber(e, t) {
          if (0 === t) return x.resolve(He.oe);
          const n = new qi(t);
          return this.Zn.forEachTarget(e, (e) => n.Hn(e.sequenceNumber))
            .next(() => this.Zn.er(e, (e) => n.Hn(e)))
            .next(() => n.maxValue);
        }
        removeTargets(e, t, n) {
          return this.Zn.removeTargets(e, t, n);
        }
        removeOrphanedDocuments(e, t) {
          return this.Zn.removeOrphanedDocuments(e, t);
        }
        collect(t, n) {
          return -1 === this.params.cacheSizeCollectionThreshold
            ? (m("LruGarbageCollector", "Garbage collection skipped; disabled"),
              x.resolve(xi))
            : this.getCacheSize(t).next((e) =>
                e < this.params.cacheSizeCollectionThreshold
                  ? (m(
                      "LruGarbageCollector",
                      `Garbage collection skipped; Cache size ${e} is lower than threshold ` +
                        this.params.cacheSizeCollectionThreshold
                    ),
                    xi)
                  : this.tr(t, n)
              );
        }
        getCacheSize(e) {
          return this.Zn.getCacheSize(e);
        }
        tr(t, n) {
          let r, s, i, a, o, u, h;
          const c = Date.now();
          return this.calculateTargetCount(t, this.params.percentileToCollect)
            .next(
              (e) => (
                (s =
                  e > this.params.maximumSequenceNumbersToCollect
                    ? (m(
                        "LruGarbageCollector",
                        `Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ` +
                          e
                      ),
                      this.params.maximumSequenceNumbersToCollect)
                    : e),
                (a = Date.now()),
                this.nthSequenceNumber(t, s)
              )
            )
            .next(
              (e) => ((r = e), (o = Date.now()), this.removeTargets(t, r, n))
            )
            .next(
              (e) => (
                (i = e), (u = Date.now()), this.removeOrphanedDocuments(t, r)
              )
            )
            .next(
              (e) => (
                (h = Date.now()),
                ue() <= l.DEBUG &&
                  m(
                    "LruGarbageCollector",
                    `LRU Garbage Collection
	Counted targets in ${a - c}ms
	Determined least recently used ${s} in ` +
                      (o - a) +
                      "ms\n" +
                      `	Removed ${i} targets in ` +
                      (u - o) +
                      "ms\n" +
                      `	Removed ${e} documents in ` +
                      (h - u) +
                      "ms\n" +
                      `Total Duration: ${h - c}ms`
                  ),
                x.resolve({
                  didRun: !0,
                  sequenceNumbersCollected: s,
                  targetsRemoved: i,
                  documentsRemoved: e,
                })
              )
            );
        }
      }
      function zi(e, t) {
        return new Gi(e, t);
      }
      class Ki {
        constructor(e, t) {
          (this.db = e), (this.garbageCollector = zi(this, t));
        }
        Xn(e) {
          const n = this.nr(e);
          return this.db
            .getTargetCache()
            .getTargetCount(e)
            .next((t) => n.next((e) => t + e));
        }
        nr(e) {
          let t = 0;
          return this.er(e, (e) => {
            t++;
          }).next(() => t);
        }
        forEachTarget(e, t) {
          return this.db.getTargetCache().forEachTarget(e, t);
        }
        er(e, n) {
          return this.rr(e, (e, t) => n(t));
        }
        addReference(e, t, n) {
          return Qi(e, n);
        }
        removeReference(e, t, n) {
          return Qi(e, n);
        }
        removeTargets(e, t, n) {
          return this.db.getTargetCache().removeTargets(e, t, n);
        }
        markPotentiallyOrphaned(e, t) {
          return Qi(e, t);
        }
        ir(t, n) {
          let r = !1;
          return Oi(t)
            .Y((e) => ki(t, e, n).next((e) => (e && (r = !0), x.resolve(!e))))
            .next(() => r);
        }
        removeOrphanedDocuments(n, r) {
          const s = this.db.getRemoteDocumentCache().newChangeBuffer(),
            i = [];
          let a = 0;
          return this.rr(n, (t, e) => {
            if (e <= r) {
              const r = this.ir(n, t).next((e) => {
                if (!e)
                  return (
                    a++,
                    s
                      .getEntry(n, t)
                      .next(
                        () => (
                          s.removeEntry(t, b.min()),
                          Ui(n).delete([0, u(t.path)])
                        )
                      )
                  );
              });
              i.push(r);
            }
          })
            .next(() => x.waitFor(i))
            .next(() => s.apply(n))
            .next(() => a);
        }
        removeTarget(e, t) {
          t = t.withSequenceNumber(e.currentSequenceNumber);
          return this.db.getTargetCache().updateTargetData(e, t);
        }
        updateLimboDocument(e, t) {
          return Qi(e, t);
        }
        rr(e, r) {
          const t = Ui(e);
          let s,
            i = He.oe;
          return t
            .J(
              { index: "documentTargetsIndex" },
              ([e], { path: t, sequenceNumber: n }) => {
                0 === e
                  ? (i !== He.oe && r(new S(Ze(s)), i), (i = n), (s = t))
                  : (i = He.oe);
              }
            )
            .next(() => {
              i !== He.oe && r(new S(Ze(s)), i);
            });
        }
        getCacheSize(e) {
          return this.db.getRemoteDocumentCache().getSize(e);
        }
      }
      function Qi(e, t) {
        return Ui(e).put(
          ((e = e.currentSequenceNumber),
          { targetId: 0, path: u(t.path), sequenceNumber: e })
        );
      }
      class $i {
        constructor() {
          (this.changes = new or(
            (e) => e.toString(),
            (e, t) => e.isEqual(t)
          )),
            (this.changesApplied = !1);
        }
        addEntry(e) {
          this.assertNotApplied(), this.changes.set(e.key, e);
        }
        removeEntry(e, t) {
          this.assertNotApplied(),
            this.changes.set(e, R.newInvalidDocument(e).setReadTime(t));
        }
        getEntry(e, t) {
          this.assertNotApplied();
          var n = this.changes.get(t);
          return void 0 !== n ? x.resolve(n) : this.getFromCache(e, t);
        }
        getEntries(e, t) {
          return this.getAllFromCache(e, t);
        }
        apply(e) {
          return (
            this.assertNotApplied(),
            (this.changesApplied = !0),
            this.applyChanges(e)
          );
        }
        assertNotApplied() {}
      }
      class Hi {
        constructor(e) {
          this.serializer = e;
        }
        setIndexManager(e) {
          this.indexManager = e;
        }
        addEntry(e, t, n) {
          return Xi(e).put(n);
        }
        removeEntry(e, n, t) {
          return Xi(e).delete(
            (function (e) {
              const t = n.path.toArray();
              return [
                t.slice(0, t.length - 2),
                t[t.length - 2],
                Us(e),
                t[t.length - 1],
              ];
            })(t)
          );
        }
        updateMetadata(t, n) {
          return this.getMetadata(t).next(
            (e) => ((e.byteSize += n), this.sr(t, e))
          );
        }
        getEntry(e, n) {
          let r = R.newInvalidDocument(n);
          return Xi(e)
            .J(
              { index: "documentKeyIndex", range: IDBKeyRange.only(Zi(n)) },
              (e, t) => {
                r = this._r(n, t);
              }
            )
            .next(() => r);
        }
        ar(e, n) {
          let r = { size: 0, document: R.newInvalidDocument(n) };
          return Xi(e)
            .J(
              { index: "documentKeyIndex", range: IDBKeyRange.only(Zi(n)) },
              (e, t) => {
                r = { document: this._r(n, t), size: Ci(t) };
              }
            )
            .next(() => r);
        }
        getEntries(e, t) {
          let n = ur;
          return this.ur(e, t, (e, t) => {
            t = this._r(e, t);
            n = n.insert(e, t);
          }).next(() => n);
        }
        cr(e, t) {
          let r = ur,
            s = new D(S.comparator);
          return this.ur(e, t, (e, t) => {
            var n = this._r(e, t);
            (r = r.insert(e, n)), (s = s.insert(e, Ci(t)));
          }).next(() => ({ documents: r, lr: s }));
        }
        ur(e, t, s) {
          if (t.isEmpty()) return x.resolve();
          let n = new A(ta);
          t.forEach((e) => (n = n.add(e)));
          const r = IDBKeyRange.bound(Zi(n.first()), Zi(n.last())),
            i = n.getIterator();
          let a = i.getNext();
          return Xi(e)
            .J({ index: "documentKeyIndex", range: r }, (e, t, n) => {
              for (
                var r = S.fromSegments([
                  ...t.prefixPath,
                  t.collectionGroup,
                  t.documentId,
                ]);
                a && ta(a, r) < 0;

              )
                s(a, null), (a = i.getNext());
              a &&
                a.isEqual(r) &&
                (s(a, t), (a = i.hasNext() ? i.getNext() : null)),
                a ? n.$(Zi(a)) : n.done();
            })
            .next(() => {
              for (; a; ) s(a, null), (a = i.hasNext() ? i.getNext() : null);
            });
        }
        getDocumentsMatchingQuery(e, n, t, r, s) {
          const i = n.path,
            a = [
              i.popLast().toArray(),
              i.lastSegment(),
              Us(t.readTime),
              t.documentKey.path.isEmpty()
                ? ""
                : t.documentKey.path.lastSegment(),
            ],
            o = [
              i.popLast().toArray(),
              i.lastSegment(),
              [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
              "",
            ];
          return Xi(e)
            .U(IDBKeyRange.bound(a, o, !0))
            .next((e) => {
              null != s && s.incrementDocumentReadCount(e.length);
              let t = ur;
              for (const s of e) {
                const e = this._r(
                  S.fromSegments(
                    s.prefixPath.concat(s.collectionGroup, s.documentId)
                  ),
                  s
                );
                e.isFoundDocument() &&
                  (sr(n, e) || r.has(e.key)) &&
                  (t = t.insert(e.key, e));
              }
              return t;
            });
        }
        getAllFromCollectionGroup(e, t, n, r) {
          let s = ur;
          (n = ea(t, n)), (t = ea(t, ke.max()));
          return Xi(e)
            .J(
              {
                index: "collectionGroupIndex",
                range: IDBKeyRange.bound(n, t, !0),
              },
              (e, t, n) => {
                t = this._r(
                  S.fromSegments(
                    t.prefixPath.concat(t.collectionGroup, t.documentId)
                  ),
                  t
                );
                (s = s.insert(t.key, t)).size === r && n.done();
              }
            )
            .next(() => s);
        }
        newChangeBuffer(e) {
          return new Ji(this, !!e && e.trackRemovals);
        }
        getSize(e) {
          return this.getMetadata(e).next((e) => e.byteSize);
        }
        getMetadata(e) {
          return Yi(e)
            .get("remoteDocumentGlobalKey")
            .next((e) => (p(!!e), e));
        }
        sr(e, t) {
          return Yi(e).put("remoteDocumentGlobalKey", t);
        }
        _r(e, t) {
          if (t) {
            const e = (function (e, t) {
              let n;
              if (t.document)
                n = Ds(e.ht, t.document, !!t.hasCommittedMutations);
              else if (t.noDocument) {
                const e = S.fromSegments(t.noDocument.path),
                  r = qs(t.noDocument.readTime);
                (n = R.newNoDocument(e, r)),
                  t.hasCommittedMutations && n.setHasCommittedMutations();
              } else {
                if (!t.unknownDocument) return I();
                {
                  const e = S.fromSegments(t.unknownDocument.path),
                    s = qs(t.unknownDocument.version);
                  n = R.newUnknownDocument(e, s);
                }
              }
              return (
                t.readTime &&
                  n.setReadTime(
                    ((t = t.readTime),
                    (e = new y(t[0], t[1])),
                    b.fromTimestamp(e))
                  ),
                n
              );
            })(this.serializer, t);
            if (!e.isNoDocument() || !e.version.isEqual(b.min())) return e;
          }
          return R.newInvalidDocument(e);
        }
      }
      function Wi(e) {
        return new Hi(e);
      }
      class Ji extends $i {
        constructor(e, t) {
          super(),
            (this.hr = e),
            (this.trackRemovals = t),
            (this.Pr = new or(
              (e) => e.toString(),
              (e, t) => e.isEqual(t)
            ));
        }
        applyChanges(i) {
          const a = [];
          let o = 0,
            u = new A((e, t) => T(e.canonicalString(), t.canonicalString()));
          return (
            this.changes.forEach((e, t) => {
              var n = this.Pr.get(e);
              if (
                (a.push(this.hr.removeEntry(i, e, n.readTime)),
                t.isValidDocument())
              ) {
                var r = Ps(this.hr.serializer, t),
                  s = ((u = u.add(e.path.popLast())), Ci(r));
                (o += s - n.size), a.push(this.hr.addEntry(i, e, r));
              } else if (((o -= n.size), this.trackRemovals)) {
                const o = Ps(
                  this.hr.serializer,
                  t.convertToNoDocument(b.min())
                );
                a.push(this.hr.addEntry(i, e, o));
              }
            }),
            u.forEach((e) => {
              a.push(this.hr.indexManager.addToCollectionParentIndex(i, e));
            }),
            a.push(this.hr.updateMetadata(i, o)),
            x.waitFor(a)
          );
        }
        getFromCache(e, t) {
          return this.hr
            .ar(e, t)
            .next(
              (e) => (
                this.Pr.set(t, { size: e.size, readTime: e.document.readTime }),
                e.document
              )
            );
        }
        getAllFromCache(e, t) {
          return this.hr.cr(e, t).next(
            ({ documents: n, lr: e }) => (
              e.forEach((e, t) => {
                this.Pr.set(e, { size: t, readTime: n.get(e).readTime });
              }),
              n
            )
          );
        }
      }
      function Yi(e) {
        return n(e, "remoteDocumentGlobal");
      }
      function Xi(e) {
        return n(e, "remoteDocumentsV14");
      }
      function Zi(e) {
        const t = e.path.toArray();
        return [t.slice(0, t.length - 2), t[t.length - 2], t[t.length - 1]];
      }
      function ea(e, t) {
        const n = t.documentKey.path.toArray();
        return [
          e,
          Us(t.readTime),
          n.slice(0, n.length - 2),
          0 < n.length ? n[n.length - 1] : "",
        ];
      }
      function ta(e, t) {
        var n = e.path.toArray(),
          r = t.path.toArray();
        let s = 0;
        for (let e = 0; e < n.length - 2 && e < r.length - 2; ++e)
          if ((s = T(n[e], r[e]))) return s;
        return (
          (s = T(n.length, r.length)) ||
          (s = T(n[n.length - 2], r[r.length - 2])) ||
          T(n[n.length - 1], r[r.length - 1])
        );
      }
      class na {
        constructor(e, t) {
          (this.overlayedDocument = e), (this.mutatedFields = t);
        }
      }
      class ra {
        constructor(e, t, n, r) {
          (this.remoteDocumentCache = e),
            (this.mutationQueue = t),
            (this.documentOverlayCache = n),
            (this.indexManager = r);
        }
        getDocument(t, n) {
          let r = null;
          return this.documentOverlayCache
            .getOverlay(t, n)
            .next((e) => ((r = e), this.remoteDocumentCache.getEntry(t, n)))
            .next(
              (e) => (null !== r && Or(r.mutation, e, Rt.empty(), y.now()), e)
            );
        }
        getDocuments(t, e) {
          return this.remoteDocumentCache
            .getEntries(t, e)
            .next((e) => this.getLocalViewOfDocuments(t, e, M()).next(() => e));
        }
        getLocalViewOfDocuments(e, t, n = M()) {
          const r = dr();
          return this.populateOverlays(e, r, t).next(() =>
            this.computeViews(e, t, r, n).next((e) => {
              let n = cr();
              return (
                e.forEach((e, t) => {
                  n = n.insert(e, t.overlayedDocument);
                }),
                n
              );
            })
          );
        }
        getOverlayedDocuments(e, t) {
          const n = dr();
          return this.populateOverlays(e, n, t).next(() =>
            this.computeViews(e, t, n, M())
          );
        }
        populateOverlays(e, n, t) {
          const r = [];
          return (
            t.forEach((e) => {
              n.has(e) || r.push(e);
            }),
            this.documentOverlayCache.getOverlays(e, r).next((e) => {
              e.forEach((e, t) => {
                n.set(e, t);
              });
            })
          );
        }
        computeViews(e, t, r, s) {
          let i = ur;
          const a = dr(),
            n = dr();
          return (
            t.forEach((e, t) => {
              const n = r.get(t.key);
              s.has(t.key) && (void 0 === n || n.mutation instanceof Fr)
                ? (i = i.insert(t.key, t))
                : void 0 !== n
                ? (a.set(t.key, n.mutation.getFieldMask()),
                  Or(n.mutation, t, n.mutation.getFieldMask(), y.now()))
                : a.set(t.key, Rt.empty());
            }),
            this.recalculateAndSaveOverlays(e, i).next(
              (e) => (
                e.forEach((e, t) => a.set(e, t)),
                t.forEach((e, t) => {
                  return n.set(e, new na(t, null != (t = a.get(e)) ? t : null));
                }),
                n
              )
            )
          );
        }
        recalculateAndSaveOverlays(i, a) {
          const o = dr();
          let u = new D((e, t) => e - t),
            h = M();
          return this.mutationQueue
            .getAllMutationBatchesAffectingDocumentKeys(i, a)
            .next((e) => {
              for (const r of e)
                r.keys().forEach((e) => {
                  var t,
                    n = a.get(e);
                  null !== n &&
                    ((t = o.get(e) || Rt.empty()),
                    (t = r.applyToLocalView(n, t)),
                    o.set(e, t),
                    (t = (u.get(r.batchId) || M()).add(e)),
                    (u = u.insert(r.batchId, t)));
                });
            })
            .next(() => {
              const e = [],
                t = u.getReverseIterator();
              for (; t.hasNext(); ) {
                const u = t.getNext(),
                  n = u.key,
                  r = u.value,
                  s = dr();
                r.forEach((e) => {
                  var t;
                  h.has(e) ||
                    (null !== (t = Lr(a.get(e), o.get(e))) && s.set(e, t),
                    (h = h.add(e)));
                }),
                  e.push(this.documentOverlayCache.saveOverlays(i, n, s));
              }
              return x.waitFor(e);
            })
            .next(() => o);
        }
        recalculateAndSaveOverlaysForDocumentKeys(t, e) {
          return this.remoteDocumentCache
            .getEntries(t, e)
            .next((e) => this.recalculateAndSaveOverlays(t, e));
        }
        getDocumentsMatchingQuery(e, t, n, r) {
          return (
            (s = t),
            S.isDocumentKey(s.path) &&
            null === s.collectionGroup &&
            0 === s.filters.length
              ? this.getDocumentsMatchingDocumentQuery(e, t.path)
              : Jn(t)
              ? this.getDocumentsMatchingCollectionGroupQuery(e, t, n, r)
              : this.getDocumentsMatchingCollectionQuery(e, t, n, r)
          );
          var s;
        }
        getNextDocuments(i, t, a, o) {
          return this.remoteDocumentCache
            .getAllFromCollectionGroup(i, t, a, o)
            .next((n) => {
              const e =
                0 < o - n.size
                  ? this.documentOverlayCache.getOverlaysForCollectionGroup(
                      i,
                      t,
                      a.largestBatchId,
                      o - n.size
                    )
                  : x.resolve(dr());
              let r = -1,
                s = n;
              return e.next((e) =>
                x
                  .forEach(
                    e,
                    (t, e) => (
                      r < e.largestBatchId && (r = e.largestBatchId),
                      n.get(t)
                        ? x.resolve()
                        : this.remoteDocumentCache.getEntry(i, t).next((e) => {
                            s = s.insert(t, e);
                          })
                    )
                  )
                  .next(() => this.populateOverlays(i, e, n))
                  .next(() => this.computeViews(i, s, e, M()))
                  .next((e) => ({ batchId: r, changes: lr(e) }))
              );
            });
        }
        getDocumentsMatchingDocumentQuery(e, t) {
          return this.getDocument(e, new S(t)).next((e) => {
            let t = cr();
            return (t = e.isFoundDocument() ? t.insert(e.key, e) : t);
          });
        }
        getDocumentsMatchingCollectionGroupQuery(n, r, s, i) {
          const a = r.collectionGroup;
          let o = cr();
          return this.indexManager.getCollectionParents(n, a).next((e) =>
            x
              .forEach(e, (e) => {
                (t = r), (e = e.child(a));
                var t,
                  e = new Qn(
                    e,
                    null,
                    t.explicitOrderBy.slice(),
                    t.filters.slice(),
                    t.limit,
                    t.limitType,
                    t.startAt,
                    t.endAt
                  );
                return this.getDocumentsMatchingCollectionQuery(
                  n,
                  e,
                  s,
                  i
                ).next((e) => {
                  e.forEach((e, t) => {
                    o = o.insert(e, t);
                  });
                });
              })
              .next(() => o)
          );
        }
        getDocumentsMatchingCollectionQuery(t, s, n, r) {
          let i;
          return this.documentOverlayCache
            .getOverlaysForCollection(t, s.path, n.largestBatchId)
            .next(
              (e) => (
                (i = e),
                this.remoteDocumentCache.getDocumentsMatchingQuery(
                  t,
                  s,
                  n,
                  i,
                  r
                )
              )
            )
            .next((n) => {
              i.forEach((e, t) => {
                t = t.getKey();
                null === n.get(t) && (n = n.insert(t, R.newInvalidDocument(t)));
              });
              let r = cr();
              return (
                n.forEach((e, t) => {
                  var n = i.get(e);
                  void 0 !== n && Or(n.mutation, t, Rt.empty(), y.now()),
                    sr(s, t) && (r = r.insert(e, t));
                }),
                r
              );
            });
        }
      }
      class sa {
        constructor(e) {
          (this.serializer = e), (this.Tr = new Map()), (this.Ir = new Map());
        }
        getBundleMetadata(e, t) {
          return x.resolve(this.Tr.get(t));
        }
        saveBundleMetadata(e, t) {
          return (
            this.Tr.set(t.id, {
              id: t.id,
              version: t.version,
              createTime: F(t.createTime),
            }),
            x.resolve()
          );
        }
        getNamedQuery(e, t) {
          return x.resolve(this.Ir.get(t));
        }
        saveNamedQuery(e, t) {
          return (
            this.Ir.set(t.name, {
              name: t.name,
              query: Ks(t.bundledQuery),
              readTime: F(t.readTime),
            }),
            x.resolve()
          );
        }
      }
      class ia {
        constructor() {
          (this.overlays = new D(S.comparator)), (this.Er = new Map());
        }
        getOverlay(e, t) {
          return x.resolve(this.overlays.get(t));
        }
        getOverlays(e, t) {
          const n = dr();
          return x
            .forEach(t, (t) =>
              this.getOverlay(e, t).next((e) => {
                null !== e && n.set(t, e);
              })
            )
            .next(() => n);
        }
        saveOverlays(n, r, e) {
          return (
            e.forEach((e, t) => {
              this.Tt(n, r, t);
            }),
            x.resolve()
          );
        }
        removeOverlaysForBatchId(e, t, n) {
          const r = this.Er.get(n);
          return (
            void 0 !== r &&
              (r.forEach((e) => (this.overlays = this.overlays.remove(e))),
              this.Er.delete(n)),
            x.resolve()
          );
        }
        getOverlaysForCollection(e, t, n) {
          const r = dr(),
            s = t.length + 1,
            i = new S(t.child("")),
            a = this.overlays.getIteratorFrom(i);
          for (; a.hasNext(); ) {
            const e = a.getNext().value,
              i = e.getKey();
            if (!t.isPrefixOf(i.path)) break;
            i.path.length === s && e.largestBatchId > n && r.set(e.getKey(), e);
          }
          return x.resolve(r);
        }
        getOverlaysForCollectionGroup(t, e, n, r) {
          let s = new D((e, t) => e - t);
          const i = this.overlays.getIterator();
          for (; i.hasNext(); ) {
            const t = i.getNext().value;
            if (t.getKey().getCollectionGroup() === e && t.largestBatchId > n) {
              let e = s.get(t.largestBatchId);
              null === e && ((e = dr()), (s = s.insert(t.largestBatchId, e))),
                e.set(t.getKey(), t);
            }
          }
          const a = dr(),
            o = s.getIterator();
          for (
            ;
            o.hasNext() &&
            (o.getNext().value.forEach((e, t) => a.set(e, t)),
            !(a.size() >= r));

          );
          return x.resolve(a);
        }
        Tt(e, t, n) {
          var r = this.overlays.get(n.key);
          if (null !== r) {
            const e = this.Er.get(r.largestBatchId).delete(n.key);
            this.Er.set(r.largestBatchId, e);
          }
          this.overlays = this.overlays.insert(n.key, new Kr(t, n));
          let s = this.Er.get(t);
          void 0 === s && ((s = M()), this.Er.set(t, s)),
            this.Er.set(t, s.add(n.key));
        }
      }
      class aa {
        constructor() {
          this.sessionToken = C.EMPTY_BYTE_STRING;
        }
        getSessionToken(e) {
          return x.resolve(this.sessionToken);
        }
        setSessionToken(e, t) {
          return (this.sessionToken = t), x.resolve();
        }
      }
      class oa {
        constructor() {
          (this.dr = new A(a.Ar)), (this.Rr = new A(a.Vr));
        }
        isEmpty() {
          return this.dr.isEmpty();
        }
        addReference(e, t) {
          e = new a(e, t);
          (this.dr = this.dr.add(e)), (this.Rr = this.Rr.add(e));
        }
        mr(e, t) {
          e.forEach((e) => this.addReference(e, t));
        }
        removeReference(e, t) {
          this.gr(new a(e, t));
        }
        pr(e, t) {
          e.forEach((e) => this.removeReference(e, t));
        }
        yr(e) {
          const t = new S(new E([])),
            n = new a(t, e),
            r = new a(t, e + 1),
            s = [];
          return (
            this.Rr.forEachInRange([n, r], (e) => {
              this.gr(e), s.push(e.key);
            }),
            s
          );
        }
        wr() {
          this.dr.forEach((e) => this.gr(e));
        }
        gr(e) {
          (this.dr = this.dr.delete(e)), (this.Rr = this.Rr.delete(e));
        }
        Sr(e) {
          var t = new S(new E([])),
            n = new a(t, e),
            t = new a(t, e + 1);
          let r = M();
          return (
            this.Rr.forEachInRange([n, t], (e) => {
              r = r.add(e.key);
            }),
            r
          );
        }
        containsKey(e) {
          var t = new a(e, 0);
          return (
            null !== (t = this.dr.firstAfterOrEqual(t)) && e.isEqual(t.key)
          );
        }
      }
      class a {
        constructor(e, t) {
          (this.key = e), (this.br = t);
        }
        static Ar(e, t) {
          return S.comparator(e.key, t.key) || T(e.br, t.br);
        }
        static Vr(e, t) {
          return T(e.br, t.br) || S.comparator(e.key, t.key);
        }
      }
      class ua {
        constructor(e, t) {
          (this.indexManager = e),
            (this.referenceDelegate = t),
            (this.mutationQueue = []),
            (this.Dr = 1),
            (this.vr = new A(a.Ar));
        }
        checkEmpty(e) {
          return x.resolve(0 === this.mutationQueue.length);
        }
        addMutationBatch(e, t, n, r) {
          var s = this.Dr,
            t =
              (this.Dr++,
              0 < this.mutationQueue.length &&
                this.mutationQueue[this.mutationQueue.length - 1],
              new Gr(s, t, n, r));
          this.mutationQueue.push(t);
          for (const t of r)
            (this.vr = this.vr.add(new a(t.key, s))),
              this.indexManager.addToCollectionParentIndex(
                e,
                t.key.path.popLast()
              );
          return x.resolve(t);
        }
        lookupMutationBatch(e, t) {
          return x.resolve(this.Cr(t));
        }
        getNextMutationBatchAfterBatchId(e, t) {
          t = (t = this.Fr(t + 1)) < 0 ? 0 : t;
          return x.resolve(
            this.mutationQueue.length > t ? this.mutationQueue[t] : null
          );
        }
        getHighestUnacknowledgedBatchId() {
          return x.resolve(0 === this.mutationQueue.length ? -1 : this.Dr - 1);
        }
        getAllMutationBatches(e) {
          return x.resolve(this.mutationQueue.slice());
        }
        getAllMutationBatchesAffectingDocumentKey(e, t) {
          const n = new a(t, 0),
            r = new a(t, Number.POSITIVE_INFINITY),
            s = [];
          return (
            this.vr.forEachInRange([n, r], (e) => {
              e = this.Cr(e.br);
              s.push(e);
            }),
            x.resolve(s)
          );
        }
        getAllMutationBatchesAffectingDocumentKeys(e, t) {
          let n = new A(T);
          return (
            t.forEach((e) => {
              var t = new a(e, 0),
                e = new a(e, Number.POSITIVE_INFINITY);
              this.vr.forEachInRange([t, e], (e) => {
                n = n.add(e.br);
              });
            }),
            x.resolve(this.Mr(n))
          );
        }
        getAllMutationBatchesAffectingQuery(e, t) {
          const n = t.path,
            r = n.length + 1;
          let s = n;
          S.isDocumentKey(s) || (s = s.child(""));
          t = new a(new S(s), 0);
          let i = new A(T);
          return (
            this.vr.forEachWhile((e) => {
              var t = e.key.path;
              return (
                !!n.isPrefixOf(t) && (t.length === r && (i = i.add(e.br)), !0)
              );
            }, t),
            x.resolve(this.Mr(i))
          );
        }
        Mr(e) {
          const t = [];
          return (
            e.forEach((e) => {
              e = this.Cr(e);
              null !== e && t.push(e);
            }),
            t
          );
        }
        removeMutationBatch(n, r) {
          p(0 === this.Or(r.batchId, "removed")), this.mutationQueue.shift();
          let s = this.vr;
          return x
            .forEach(r.mutations, (e) => {
              var t = new a(e.key, r.batchId);
              return (
                (s = s.delete(t)),
                this.referenceDelegate.markPotentiallyOrphaned(n, e.key)
              );
            })
            .next(() => {
              this.vr = s;
            });
        }
        Ln(e) {}
        containsKey(e, t) {
          var n = new a(t, 0),
            n = this.vr.firstAfterOrEqual(n);
          return x.resolve(t.isEqual(n && n.key));
        }
        performConsistencyCheck(e) {
          return this.mutationQueue.length, x.resolve();
        }
        Or(e, t) {
          return this.Fr(e);
        }
        Fr(e) {
          return 0 === this.mutationQueue.length
            ? 0
            : e - this.mutationQueue[0].batchId;
        }
        Cr(e) {
          e = this.Fr(e);
          return e < 0 || e >= this.mutationQueue.length
            ? null
            : this.mutationQueue[e];
        }
      }
      class ha {
        constructor(e) {
          (this.Nr = e), (this.docs = new D(S.comparator)), (this.size = 0);
        }
        setIndexManager(e) {
          this.indexManager = e;
        }
        addEntry(e, t) {
          const n = t.key,
            r = this.docs.get(n),
            s = r ? r.size : 0,
            i = this.Nr(t);
          return (
            (this.docs = this.docs.insert(n, {
              document: t.mutableCopy(),
              size: i,
            })),
            (this.size += i - s),
            this.indexManager.addToCollectionParentIndex(e, n.path.popLast())
          );
        }
        removeEntry(e) {
          var t = this.docs.get(e);
          t && ((this.docs = this.docs.remove(e)), (this.size -= t.size));
        }
        getEntry(e, t) {
          const n = this.docs.get(t);
          return x.resolve(
            n ? n.document.mutableCopy() : R.newInvalidDocument(t)
          );
        }
        getEntries(e, t) {
          let n = ur;
          return (
            t.forEach((e) => {
              const t = this.docs.get(e);
              n = n.insert(
                e,
                t ? t.document.mutableCopy() : R.newInvalidDocument(e)
              );
            }),
            x.resolve(n)
          );
        }
        getDocumentsMatchingQuery(e, t, n, r) {
          let s = ur;
          const i = t.path,
            a = new S(i.child("")),
            o = this.docs.getIteratorFrom(a);
          for (; o.hasNext(); ) {
            const {
              key: e,
              value: { document: a },
            } = o.getNext();
            if (!i.isPrefixOf(e.path)) break;
            e.path.length > i.length + 1 ||
              Re(Ne(a), n) <= 0 ||
              ((r.has(a.key) || sr(t, a)) &&
                (s = s.insert(a.key, a.mutableCopy())));
          }
          return x.resolve(s);
        }
        getAllFromCollectionGroup(e, t, n, r) {
          I();
        }
        Lr(e, t) {
          return x.forEach(this.docs, (e) => t(e));
        }
        newChangeBuffer(e) {
          return new ca(this);
        }
        getSize(e) {
          return x.resolve(this.size);
        }
      }
      class ca extends $i {
        constructor(e) {
          super(), (this.hr = e);
        }
        applyChanges(n) {
          const r = [];
          return (
            this.changes.forEach((e, t) => {
              t.isValidDocument()
                ? r.push(this.hr.addEntry(n, t))
                : this.hr.removeEntry(e);
            }),
            x.waitFor(r)
          );
        }
        getFromCache(e, t) {
          return this.hr.getEntry(e, t);
        }
        getAllFromCache(e, t) {
          return this.hr.getEntries(e, t);
        }
      }
      class la {
        constructor(e) {
          (this.persistence = e),
            (this.Br = new or((e) => Bn(e), qn)),
            (this.lastRemoteSnapshotVersion = b.min()),
            (this.highestTargetId = 0),
            (this.kr = 0),
            (this.qr = new oa()),
            (this.targetCount = 0),
            (this.Qr = Mi.qn());
        }
        forEachTarget(e, n) {
          return this.Br.forEach((e, t) => n(t)), x.resolve();
        }
        getLastRemoteSnapshotVersion(e) {
          return x.resolve(this.lastRemoteSnapshotVersion);
        }
        getHighestSequenceNumber(e) {
          return x.resolve(this.kr);
        }
        allocateTargetId(e) {
          return (
            (this.highestTargetId = this.Qr.next()),
            x.resolve(this.highestTargetId)
          );
        }
        setTargetsMetadata(e, t, n) {
          return (
            n && (this.lastRemoteSnapshotVersion = n),
            t > this.kr && (this.kr = t),
            x.resolve()
          );
        }
        Un(e) {
          this.Br.set(e.target, e);
          var t = e.targetId;
          t > this.highestTargetId &&
            ((this.Qr = new Mi(t)), (this.highestTargetId = t)),
            e.sequenceNumber > this.kr && (this.kr = e.sequenceNumber);
        }
        addTargetData(e, t) {
          return this.Un(t), (this.targetCount += 1), x.resolve();
        }
        updateTargetData(e, t) {
          return this.Un(t), x.resolve();
        }
        removeTargetData(e, t) {
          return (
            this.Br.delete(t.target),
            this.qr.yr(t.targetId),
            --this.targetCount,
            x.resolve()
          );
        }
        removeTargets(n, r, s) {
          let i = 0;
          const a = [];
          return (
            this.Br.forEach((e, t) => {
              t.sequenceNumber <= r &&
                null === s.get(t.targetId) &&
                (this.Br.delete(e),
                a.push(this.removeMatchingKeysForTargetId(n, t.targetId)),
                i++);
            }),
            x.waitFor(a).next(() => i)
          );
        }
        getTargetCount(e) {
          return x.resolve(this.targetCount);
        }
        getTargetData(e, t) {
          t = this.Br.get(t) || null;
          return x.resolve(t);
        }
        addMatchingKeys(e, t, n) {
          return this.qr.mr(t, n), x.resolve();
        }
        removeMatchingKeys(t, e, n) {
          this.qr.pr(e, n);
          const r = this.persistence.referenceDelegate,
            s = [];
          return (
            r &&
              e.forEach((e) => {
                s.push(r.markPotentiallyOrphaned(t, e));
              }),
            x.waitFor(s)
          );
        }
        removeMatchingKeysForTargetId(e, t) {
          return this.qr.yr(t), x.resolve();
        }
        getMatchingKeysForTargetId(e, t) {
          t = this.qr.Sr(t);
          return x.resolve(t);
        }
        containsKey(e, t) {
          return x.resolve(this.qr.containsKey(t));
        }
      }
      class da {
        constructor(e, t) {
          (this.Kr = {}),
            (this.overlays = {}),
            (this.$r = new He(0)),
            (this.Ur = !1),
            (this.Ur = !0),
            (this.Wr = new aa()),
            (this.referenceDelegate = e(this)),
            (this.Gr = new la(this)),
            (this.indexManager = new yi()),
            (this.remoteDocumentCache =
              ((e = (e) => this.referenceDelegate.zr(e)), new ha(e))),
            (this.serializer = new Fs(t)),
            (this.jr = new sa(this.serializer));
        }
        start() {
          return Promise.resolve();
        }
        shutdown() {
          return (this.Ur = !1), Promise.resolve();
        }
        get started() {
          return this.Ur;
        }
        setDatabaseDeletedListener() {}
        setNetworkEnabled() {}
        getIndexManager(e) {
          return this.indexManager;
        }
        getDocumentOverlayCache(e) {
          let t = this.overlays[e.toKey()];
          return t || ((t = new ia()), (this.overlays[e.toKey()] = t)), t;
        }
        getMutationQueue(e, t) {
          let n = this.Kr[e.toKey()];
          return (
            n ||
              ((n = new ua(t, this.referenceDelegate)),
              (this.Kr[e.toKey()] = n)),
            n
          );
        }
        getGlobalsCache() {
          return this.Wr;
        }
        getTargetCache() {
          return this.Gr;
        }
        getRemoteDocumentCache() {
          return this.remoteDocumentCache;
        }
        getBundleCache() {
          return this.jr;
        }
        runTransaction(e, t, n) {
          m("MemoryPersistence", "Starting transaction:", e);
          const r = new fa(this.$r.next());
          return (
            this.referenceDelegate.Hr(),
            n(r)
              .next((e) => this.referenceDelegate.Jr(r).next(() => e))
              .toPromise()
              .then((e) => (r.raiseOnCommittedEvent(), e))
          );
        }
        Yr(t, n) {
          return x.or(
            Object.values(this.Kr).map((e) => () => e.containsKey(t, n))
          );
        }
      }
      class fa extends Oe {
        constructor(e) {
          super(), (this.currentSequenceNumber = e);
        }
      }
      class ga {
        constructor(e) {
          (this.persistence = e), (this.Zr = new oa()), (this.Xr = null);
        }
        static ei(e) {
          return new ga(e);
        }
        get ti() {
          if (this.Xr) return this.Xr;
          throw I();
        }
        addReference(e, t, n) {
          return (
            this.Zr.addReference(n, t),
            this.ti.delete(n.toString()),
            x.resolve()
          );
        }
        removeReference(e, t, n) {
          return (
            this.Zr.removeReference(n, t),
            this.ti.add(n.toString()),
            x.resolve()
          );
        }
        markPotentiallyOrphaned(e, t) {
          return this.ti.add(t.toString()), x.resolve();
        }
        removeTarget(e, t) {
          this.Zr.yr(t.targetId).forEach((e) => this.ti.add(e.toString()));
          const n = this.persistence.getTargetCache();
          return n
            .getMatchingKeysForTargetId(e, t.targetId)
            .next((e) => {
              e.forEach((e) => this.ti.add(e.toString()));
            })
            .next(() => n.removeTargetData(e, t));
        }
        Hr() {
          this.Xr = new Set();
        }
        Jr(n) {
          const r = this.persistence.getRemoteDocumentCache().newChangeBuffer();
          return x
            .forEach(this.ti, (e) => {
              const t = S.fromPath(e);
              return this.ni(n, t).next((e) => {
                e || r.removeEntry(t, b.min());
              });
            })
            .next(() => ((this.Xr = null), r.apply(n)));
        }
        updateLimboDocument(e, t) {
          return this.ni(e, t).next((e) => {
            e ? this.ti.delete(t.toString()) : this.ti.add(t.toString());
          });
        }
        zr(e) {
          return 0;
        }
        ni(e, t) {
          return x.or([
            () => x.resolve(this.Zr.containsKey(t)),
            () => this.persistence.getTargetCache().containsKey(e, t),
            () => this.persistence.Yr(e, t),
          ]);
        }
      }
      class ma {
        constructor(e, t) {
          (this.persistence = e),
            (this.ri = new or(
              (e) => u(e.path),
              (e, t) => e.isEqual(t)
            )),
            (this.garbageCollector = zi(this, t));
        }
        static ei(e, t) {
          return new ma(e, t);
        }
        Hr() {}
        Jr(e) {
          return x.resolve();
        }
        forEachTarget(e, t) {
          return this.persistence.getTargetCache().forEachTarget(e, t);
        }
        Xn(e) {
          const n = this.nr(e);
          return this.persistence
            .getTargetCache()
            .getTargetCount(e)
            .next((t) => n.next((e) => t + e));
        }
        nr(e) {
          let t = 0;
          return this.er(e, (e) => {
            t++;
          }).next(() => t);
        }
        er(n, r) {
          return x.forEach(this.ri, (e, t) =>
            this.ir(n, e, t).next((e) => (e ? x.resolve() : r(t)))
          );
        }
        removeTargets(e, t, n) {
          return this.persistence.getTargetCache().removeTargets(e, t, n);
        }
        removeOrphanedDocuments(e, n) {
          let r = 0;
          const t = this.persistence.getRemoteDocumentCache(),
            s = t.newChangeBuffer();
          return t
            .Lr(e, (t) =>
              this.ir(e, t, n).next((e) => {
                e || (r++, s.removeEntry(t, b.min()));
              })
            )
            .next(() => s.apply(e))
            .next(() => r);
        }
        markPotentiallyOrphaned(e, t) {
          return this.ri.set(t, e.currentSequenceNumber), x.resolve();
        }
        removeTarget(e, t) {
          t = t.withSequenceNumber(e.currentSequenceNumber);
          return this.persistence.getTargetCache().updateTargetData(e, t);
        }
        addReference(e, t, n) {
          return this.ri.set(n, e.currentSequenceNumber), x.resolve();
        }
        removeReference(e, t, n) {
          return this.ri.set(n, e.currentSequenceNumber), x.resolve();
        }
        updateLimboDocument(e, t) {
          return this.ri.set(t, e.currentSequenceNumber), x.resolve();
        }
        zr(e) {
          let t = e.key.toString().length;
          return (
            e.isFoundDocument() &&
              (t += (function r(e) {
                switch (zt(e)) {
                  case 0:
                  case 1:
                    return 4;
                  case 2:
                    return 8;
                  case 3:
                  case 8:
                    return 16;
                  case 4:
                    var t = Pt(e);
                    return t ? 16 + r(t) : 16;
                  case 5:
                    return 2 * e.stringValue.length;
                  case 6:
                    return Vt(e.bytesValue).approximateByteSize();
                  case 7:
                    return e.referenceValue.length;
                  case 9:
                    return (e.arrayValue.values || []).reduce(
                      (e, t) => e + r(t),
                      0
                    );
                  case 10:
                  case 11: {
                    t = e.mapValue;
                    let n = 0;
                    return (
                      Dt(t.fields, (e, t) => {
                        n += e.length + r(t);
                      }),
                      n
                    );
                    return;
                  }
                  default:
                    throw I();
                }
              })(e.data.value)),
            t
          );
        }
        ir(e, t, n) {
          return x.or([
            () => this.persistence.Yr(e, t),
            () => this.persistence.getTargetCache().containsKey(e, t),
            () => {
              var e = this.ri.get(t);
              return x.resolve(void 0 !== e && n < e);
            },
          ]);
        }
        getCacheSize(e) {
          return this.persistence.getRemoteDocumentCache().getSize(e);
        }
      }
      class pa {
        constructor(e) {
          this.serializer = e;
        }
        O(t, e, n, r) {
          const i = new Ve("createOrUpgrade", e);
          var s;
          n < 1 &&
            1 <= r &&
            (t.createObjectStore("owner"),
            (s = t).createObjectStore("mutationQueues", { keyPath: "userId" }),
            s
              .createObjectStore("mutations", {
                keyPath: "batchId",
                autoIncrement: !0,
              })
              .createIndex("userMutationsIndex", et, { unique: !0 }),
            s.createObjectStore("documentMutations"),
            ya(t),
            t.createObjectStore("remoteDocuments"));
          let a = x.resolve();
          return (
            n < 3 &&
              3 <= r &&
              (0 !== n &&
                ((s = t).deleteObjectStore("targetDocuments"),
                s.deleteObjectStore("targets"),
                s.deleteObjectStore("targetGlobal"),
                ya(t)),
              (a = a.next(() => {
                {
                  const e = i.store("targetGlobal"),
                    t = {
                      highestTargetId: 0,
                      highestListenSequenceNumber: 0,
                      lastRemoteSnapshotVersion: b.min().toTimestamp(),
                      targetCount: 0,
                    };
                  return e.put("targetGlobalKey", t);
                }
              }))),
            n < 4 &&
              4 <= r &&
              (a = (a =
                0 !== n
                  ? a.next(() => {
                      var r = t,
                        s = i;
                      return s
                        .store("mutations")
                        .U()
                        .next((e) => {
                          r.deleteObjectStore("mutations"),
                            r
                              .createObjectStore("mutations", {
                                keyPath: "batchId",
                                autoIncrement: !0,
                              })
                              .createIndex("userMutationsIndex", et, {
                                unique: !0,
                              });
                          const t = s.store("mutations"),
                            n = e.map((e) => t.put(e));
                          return x.waitFor(n);
                        });
                    })
                  : a).next(() => {
                t.createObjectStore("clientMetadata", { keyPath: "clientId" });
              })),
            n < 5 && 5 <= r && (a = a.next(() => this.ii(i))),
            n < 6 &&
              6 <= r &&
              (a = a.next(
                () => (t.createObjectStore("remoteDocumentGlobal"), this.si(i))
              )),
            n < 7 && 7 <= r && (a = a.next(() => this.oi(i))),
            n < 8 && 8 <= r && (a = a.next(() => this._i(t, i))),
            n < 9 &&
              9 <= r &&
              (a = a.next(() => {
                var e;
                (e = t).objectStoreNames.contains("remoteDocumentChanges") &&
                  e.deleteObjectStore("remoteDocumentChanges");
              })),
            n < 10 && 10 <= r && (a = a.next(() => this.ai(i))),
            n < 11 &&
              11 <= r &&
              (a = a.next(() => {
                t.createObjectStore("bundles", { keyPath: "bundleId" }),
                  t.createObjectStore("namedQueries", { keyPath: "name" });
              })),
            n < 12 &&
              12 <= r &&
              (a = a.next(() => {
                {
                  const e = t.createObjectStore("documentOverlays", {
                    keyPath: mt,
                  });
                  return (
                    e.createIndex("collectionPathOverlayIndex", pt, {
                      unique: !1,
                    }),
                    void e.createIndex("collectionGroupOverlayIndex", yt, {
                      unique: !1,
                    })
                  );
                }
              })),
            n < 13 &&
              13 <= r &&
              (a = a
                .next(() => {
                  {
                    const e = t.createObjectStore("remoteDocumentsV14", {
                      keyPath: st,
                    });
                    return (
                      e.createIndex("documentKeyIndex", it),
                      void e.createIndex("collectionGroupIndex", at)
                    );
                  }
                })
                .next(() => this.ui(t, i))
                .next(() => t.deleteObjectStore("remoteDocuments"))),
            n < 14 && 14 <= r && (a = a.next(() => this.ci(t, i))),
            n < 15 &&
              15 <= r &&
              (a = a.next(() => {
                var e = t;
                e
                  .createObjectStore("indexConfiguration", {
                    keyPath: "indexId",
                    autoIncrement: !0,
                  })
                  .createIndex("collectionGroupIndex", "collectionGroup", {
                    unique: !1,
                  }),
                  e
                    .createObjectStore("indexState", { keyPath: lt })
                    .createIndex("sequenceNumberIndex", dt, { unique: !1 }),
                  e
                    .createObjectStore("indexEntries", { keyPath: ft })
                    .createIndex("documentKeyIndex", gt, { unique: !1 });
              })),
            n < 16 &&
              16 <= r &&
              (a = a
                .next(() => {
                  e.objectStore("indexState").clear();
                })
                .next(() => {
                  e.objectStore("indexEntries").clear();
                })),
            (a =
              n < 17 && 17 <= r
                ? a.next(() => {
                    t.createObjectStore("globals", { keyPath: "name" });
                  })
                : a)
          );
        }
        si(t) {
          let n = 0;
          return t
            .store("remoteDocuments")
            .J((e, t) => {
              n += Ci(t);
            })
            .next(() => {
              var e = { byteSize: n };
              return t
                .store("remoteDocumentGlobal")
                .put("remoteDocumentGlobalKey", e);
            });
        }
        ii(n) {
          const e = n.store("mutationQueues"),
            r = n.store("mutations");
          return e.U().next((e) =>
            x.forEach(e, (t) => {
              var e = IDBKeyRange.bound(
                [t.userId, -1],
                [t.userId, t.lastAcknowledgedBatchId]
              );
              return r.U("userMutationsIndex", e).next((e) =>
                x.forEach(e, (e) => {
                  p(e.userId === t.userId);
                  e = js(this.serializer, e);
                  return Ai(n, t.userId, e).next(() => {});
                })
              );
            })
          );
        }
        oi(e) {
          const a = e.store("targetDocuments"),
            t = e.store("remoteDocuments");
          return e
            .store("targetGlobal")
            .get("targetGlobalKey")
            .next((s) => {
              const i = [];
              return t
                .J((e, t) => {
                  const n = new E(e),
                    r = [0, u(n)];
                  i.push(
                    a
                      .get(r)
                      .next((e) =>
                        e
                          ? x.resolve()
                          : ((e) =>
                              a.put({
                                targetId: 0,
                                path: u(e),
                                sequenceNumber: s.highestListenSequenceNumber,
                              }))(n)
                      )
                  );
                })
                .next(() => x.waitFor(i));
            });
        }
        _i(e, t) {
          e.createObjectStore("collectionParents", { keyPath: ct });
          const n = t.store("collectionParents"),
            r = new vi(),
            s = (e) => {
              if (r.add(e)) {
                const t = e.lastSegment(),
                  r = e.popLast();
                return n.put({ collectionId: t, parent: u(r) });
              }
            };
          return t
            .store("remoteDocuments")
            .J({ H: !0 }, (e, t) => {
              const n = new E(e);
              return s(n.popLast());
            })
            .next(() =>
              t.store("documentMutations").J({ H: !0 }, ([, e], t) => {
                const n = Ze(e);
                return s(n.popLast());
              })
            );
        }
        ai(e) {
          const n = e.store("targets");
          return n.J((e, t) => {
            (t = Gs(t)), (t = zs(this.serializer, t));
            return n.put(t);
          });
        }
        ui(e, a) {
          const t = a.store("remoteDocuments"),
            o = [];
          return t
            .J((e, t) => {
              const n = a.store("remoteDocumentsV14"),
                r = (
                  (i = t).document
                    ? new S(E.fromString(i.document.name).popFirst(5))
                    : i.noDocument
                    ? S.fromSegments(i.noDocument.path)
                    : i.unknownDocument
                    ? S.fromSegments(i.unknownDocument.path)
                    : I()
                ).path.toArray(),
                s = {
                  prefixPath: r.slice(0, r.length - 2),
                  collectionGroup: r[r.length - 2],
                  documentId: r[r.length - 1],
                  readTime: t.readTime || [0, 0],
                  unknownDocument: t.unknownDocument,
                  noDocument: t.noDocument,
                  document: t.document,
                  hasCommittedMutations: !!t.hasCommittedMutations,
                };
              var i;
              o.push(n.put(s));
            })
            .next(() => x.waitFor(o));
        }
        ci(e, s) {
          const t = s.store("mutations"),
            i = Wi(this.serializer),
            a = new da(ga.ei, this.serializer.ht);
          return t.U().next((e) => {
            const r = new Map();
            return (
              e.forEach((e) => {
                var t;
                let n = null != (t = r.get(e.userId)) ? t : M();
                js(this.serializer, e)
                  .keys()
                  .forEach((e) => (n = n.add(e))),
                  r.set(e.userId, n);
              }),
              x.forEach(r, (e, t) => {
                var t = new o(t),
                  n = Xs.Pt(this.serializer, t),
                  r = a.getIndexManager(t),
                  t = Ni.Pt(t, this.serializer, r, a.referenceDelegate);
                return new ra(i, t, n, r)
                  .recalculateAndSaveOverlaysForDocumentKeys(
                    new St(s, He.oe),
                    e
                  )
                  .next();
              })
            );
          });
        }
      }
      function ya(e) {
        e
          .createObjectStore("targetDocuments", { keyPath: ut })
          .createIndex("documentTargetsIndex", ht, { unique: !0 }),
          e
            .createObjectStore("targets", { keyPath: "targetId" })
            .createIndex("queryTargetsIndex", ot, { unique: !0 }),
          e.createObjectStore("targetGlobal");
      }
      const va =
        "Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";
      class wa {
        constructor(e, t, n, r, s, i, a, o, u, h, c = 17) {
          if (
            ((this.allowTabSynchronization = e),
            (this.persistenceKey = t),
            (this.clientId = n),
            (this.li = s),
            (this.window = i),
            (this.document = a),
            (this.hi = u),
            (this.Pi = h),
            (this.Ti = c),
            (this.$r = null),
            (this.Ur = !1),
            (this.isPrimary = !1),
            (this.networkEnabled = !0),
            (this.Ii = null),
            (this.inForeground = !1),
            (this.Ei = null),
            (this.di = null),
            (this.Ai = Number.NEGATIVE_INFINITY),
            (this.Ri = (e) => Promise.resolve()),
            !wa.p())
          )
            throw new _(
              w.UNIMPLEMENTED,
              "This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled."
            );
          (this.referenceDelegate = new Ki(this, r)),
            (this.Vi = t + "main"),
            (this.serializer = new Fs(o)),
            (this.mi = new Fe(this.Vi, this.Ti, new pa(this.serializer))),
            (this.Wr = new ei()),
            (this.Gr = new Vi(this.referenceDelegate, this.serializer)),
            (this.remoteDocumentCache = Wi(this.serializer)),
            (this.jr = new Ws()),
            this.window && this.window.localStorage
              ? (this.fi = this.window.localStorage)
              : ((this.fi = null),
                !1 === h &&
                  d(
                    "IndexedDbPersistence",
                    "LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."
                  ));
        }
        start() {
          return this.gi()
            .then(() => {
              if (this.isPrimary || this.allowTabSynchronization)
                return (
                  this.pi(),
                  this.yi(),
                  this.wi(),
                  this.runTransaction(
                    "getHighestListenSequenceNumber",
                    "readonly",
                    (e) => this.Gr.getHighestSequenceNumber(e)
                  )
                );
              throw new _(w.FAILED_PRECONDITION, va);
            })
            .then((e) => {
              this.$r = new He(e, this.hi);
            })
            .then(() => {
              this.Ur = !0;
            })
            .catch((e) => (this.mi && this.mi.close(), Promise.reject(e)));
        }
        Si(t) {
          return (
            (this.Ri = async (e) => {
              if (this.started) return t(e);
            }),
            t(this.isPrimary)
          );
        }
        setDatabaseDeletedListener(t) {
          this.mi.L(async (e) => {
            null === e.newVersion && (await t());
          });
        }
        setNetworkEnabled(e) {
          this.networkEnabled !== e &&
            ((this.networkEnabled = e),
            this.li.enqueueAndForget(async () => {
              this.started && (await this.gi());
            }));
        }
        gi() {
          return this.runTransaction(
            "updateClientMetadataAndTryBecomePrimary",
            "readwrite",
            (t) =>
              ba(t)
                .put({
                  clientId: this.clientId,
                  updateTimeMs: Date.now(),
                  networkEnabled: this.networkEnabled,
                  inForeground: this.inForeground,
                })
                .next(() => {
                  if (this.isPrimary)
                    return this.bi(t).next((e) => {
                      e ||
                        ((this.isPrimary = !1),
                        this.li.enqueueRetryable(() => this.Ri(!1)));
                    });
                })
                .next(() => this.Di(t))
                .next((e) =>
                  this.isPrimary && !e
                    ? this.vi(t).next(() => !1)
                    : !!e && this.Ci(t).next(() => !0)
                )
          )
            .catch((e) => {
              if (qe(e))
                return (
                  m(
                    "IndexedDbPersistence",
                    "Failed to extend owner lease: ",
                    e
                  ),
                  this.isPrimary
                );
              if (this.allowTabSynchronization)
                return (
                  m(
                    "IndexedDbPersistence",
                    "Releasing owner lease after error during lease refresh",
                    e
                  ),
                  !1
                );
              throw e;
            })
            .then((e) => {
              this.isPrimary !== e &&
                this.li.enqueueRetryable(() => this.Ri(e)),
                (this.isPrimary = e);
            });
        }
        bi(e) {
          return _a(e)
            .get("owner")
            .next((e) => x.resolve(this.Fi(e)));
        }
        Mi(e) {
          return ba(e).delete(this.clientId);
        }
        async xi() {
          if (this.isPrimary && !this.Oi(this.Ai, 18e5)) {
            this.Ai = Date.now();
            var e = await this.runTransaction(
              "maybeGarbageCollectMultiClientState",
              "readwrite-primary",
              (e) => {
                const r = n(e, "clientMetadata");
                return r.U().next((e) => {
                  const t = this.Ni(e, 18e5),
                    n = e.filter((e) => -1 === t.indexOf(e));
                  return x
                    .forEach(n, (e) => r.delete(e.clientId))
                    .next(() => n);
                });
              }
            ).catch(() => []);
            if (this.fi)
              for (const t of e) this.fi.removeItem(this.Li(t.clientId));
          }
        }
        wi() {
          this.di = this.li.enqueueAfterDelay(
            "client_metadata_refresh",
            4e3,
            () =>
              this.gi()
                .then(() => this.xi())
                .then(() => this.wi())
          );
        }
        Fi(e) {
          return !!e && e.ownerId === this.clientId;
        }
        Di(t) {
          return this.Pi
            ? x.resolve(!0)
            : _a(t)
                .get("owner")
                .next((e) => {
                  if (
                    null !== e &&
                    this.Oi(e.leaseTimestampMs, 5e3) &&
                    !this.Bi(e.ownerId)
                  ) {
                    if (this.Fi(e) && this.networkEnabled) return !0;
                    if (!this.Fi(e)) {
                      if (e.allowTabSynchronization) return !1;
                      throw new _(w.FAILED_PRECONDITION, va);
                    }
                  }
                  return (
                    !(!this.networkEnabled || !this.inForeground) ||
                    ba(t)
                      .U()
                      .next(
                        (e) =>
                          void 0 ===
                          this.Ni(e, 5e3).find((e) => {
                            if (this.clientId !== e.clientId) {
                              var t = !this.networkEnabled && e.networkEnabled,
                                n = !this.inForeground && e.inForeground,
                                e = this.networkEnabled === e.networkEnabled;
                              if (t || (n && e)) return !0;
                            }
                            return !1;
                          })
                      )
                  );
                })
                .next(
                  (e) => (
                    this.isPrimary !== e &&
                      m(
                        "IndexedDbPersistence",
                        `Client ${
                          e ? "is" : "is not"
                        } eligible for a primary lease.`
                      ),
                    e
                  )
                );
        }
        async shutdown() {
          (this.Ur = !1),
            this.ki(),
            this.di && (this.di.cancel(), (this.di = null)),
            this.qi(),
            this.Qi(),
            await this.mi.runTransaction(
              "shutdown",
              "readwrite",
              ["owner", "clientMetadata"],
              (e) => {
                const t = new St(e, He.oe);
                return this.vi(t).next(() => this.Mi(t));
              }
            ),
            this.mi.close(),
            this.Ki();
        }
        Ni(e, t) {
          return e.filter(
            (e) => this.Oi(e.updateTimeMs, t) && !this.Bi(e.clientId)
          );
        }
        $i() {
          return this.runTransaction("getActiveClients", "readonly", (e) =>
            ba(e)
              .U()
              .next((e) => this.Ni(e, 18e5).map((e) => e.clientId))
          );
        }
        get started() {
          return this.Ur;
        }
        getGlobalsCache() {
          return this.Wr;
        }
        getMutationQueue(e, t) {
          return Ni.Pt(e, this.serializer, t, this.referenceDelegate);
        }
        getTargetCache() {
          return this.Gr;
        }
        getRemoteDocumentCache() {
          return this.remoteDocumentCache;
        }
        getIndexManager(e) {
          return new _i(e, this.serializer.ht.databaseId);
        }
        getDocumentOverlayCache(e) {
          return Xs.Pt(this.serializer, e);
        }
        getBundleCache() {
          return this.jr;
        }
        runTransaction(t, n, r) {
          m("IndexedDbPersistence", "Starting transaction:", t);
          var e = "readonly" === n ? "readonly" : "readwrite",
            s =
              17 === (s = this.Ti)
                ? Et
                : 16 === s
                ? Tt
                : 15 === s
                ? It
                : 14 === s
                ? bt
                : 13 === s
                ? _t
                : 12 === s
                ? wt
                : 11 === s
                ? vt
                : void I();
          let i;
          return this.mi
            .runTransaction(
              t,
              e,
              s,
              (e) => (
                (i = new St(e, this.$r ? this.$r.next() : He.oe)),
                "readwrite-primary" === n
                  ? this.bi(i)
                      .next((e) => !!e || this.Di(i))
                      .next((e) => {
                        if (e) return r(i);
                        throw (
                          (d(
                            `Failed to obtain primary lease for action '${t}'.`
                          ),
                          (this.isPrimary = !1),
                          this.li.enqueueRetryable(() => this.Ri(!1)),
                          new _(w.FAILED_PRECONDITION, Le))
                        );
                      })
                      .next((e) => this.Ci(i).next(() => e))
                  : this.Ui(i).next(() => r(i))
              )
            )
            .then((e) => (i.raiseOnCommittedEvent(), e));
        }
        Ui(e) {
          return _a(e)
            .get("owner")
            .next((e) => {
              if (
                null !== e &&
                this.Oi(e.leaseTimestampMs, 5e3) &&
                !this.Bi(e.ownerId) &&
                !this.Fi(e) &&
                !(
                  this.Pi ||
                  (this.allowTabSynchronization && e.allowTabSynchronization)
                )
              )
                throw new _(w.FAILED_PRECONDITION, va);
            });
        }
        Ci(e) {
          var t = {
            ownerId: this.clientId,
            allowTabSynchronization: this.allowTabSynchronization,
            leaseTimestampMs: Date.now(),
          };
          return _a(e).put("owner", t);
        }
        static p() {
          return Fe.p();
        }
        vi(e) {
          const t = _a(e);
          return t
            .get("owner")
            .next((e) =>
              this.Fi(e)
                ? (m("IndexedDbPersistence", "Releasing primary lease."),
                  t.delete("owner"))
                : x.resolve()
            );
        }
        Oi(e, t) {
          var n = Date.now();
          return !(
            e < n - t ||
            (n < e &&
              (d(`Detected an update time that is in the future: ${e} > ` + n),
              1))
          );
        }
        pi() {
          null !== this.document &&
            "function" == typeof this.document.addEventListener &&
            ((this.Ei = () => {
              this.li.enqueueAndForget(
                () => (
                  (this.inForeground =
                    "visible" === this.document.visibilityState),
                  this.gi()
                )
              );
            }),
            this.document.addEventListener("visibilitychange", this.Ei),
            (this.inForeground = "visible" === this.document.visibilityState));
        }
        qi() {
          this.Ei &&
            (this.document.removeEventListener("visibilitychange", this.Ei),
            (this.Ei = null));
        }
        yi() {
          var e;
          "function" ==
            typeof (null == (e = this.window) ? void 0 : e.addEventListener) &&
            ((this.Ii = () => {
              this.ki();
              var e = /(?:Version|Mobile)\/1[456]/;
              z() &&
                (navigator.appVersion.match(e) ||
                  navigator.userAgent.match(e)) &&
                this.li.enterRestrictedMode(!0),
                this.li.enqueueAndForget(() => this.shutdown());
            }),
            this.window.addEventListener("pagehide", this.Ii));
        }
        Qi() {
          this.Ii &&
            (this.window.removeEventListener("pagehide", this.Ii),
            (this.Ii = null));
        }
        Bi(e) {
          var t;
          try {
            var n =
              null !== (null == (t = this.fi) ? void 0 : t.getItem(this.Li(e)));
            return (
              m(
                "IndexedDbPersistence",
                `Client '${e}' ${n ? "is" : "is not"} zombied in LocalStorage`
              ),
              n
            );
          } catch (e) {
            return (
              d("IndexedDbPersistence", "Failed to get zombied client id.", e),
              !1
            );
          }
        }
        ki() {
          if (this.fi)
            try {
              this.fi.setItem(this.Li(this.clientId), String(Date.now()));
            } catch (e) {
              d("Failed to set zombie client id.", e);
            }
        }
        Ki() {
          if (this.fi)
            try {
              this.fi.removeItem(this.Li(this.clientId));
            } catch (e) {}
        }
        Li(e) {
          return `firestore_zombie_${this.persistenceKey}_` + e;
        }
      }
      function _a(e) {
        return n(e, "owner");
      }
      function ba(e) {
        return n(e, "clientMetadata");
      }
      function Ia(e, t) {
        let n = e.projectId;
        return (
          e.isDefaultDatabase || (n += "." + e.database),
          "firestore/" + t + "/" + n + "/"
        );
      }
      class Ta {
        constructor(e, t, n, r) {
          (this.targetId = e),
            (this.fromCache = t),
            (this.Wi = n),
            (this.Gi = r);
        }
        static zi(e, t) {
          let n = M(),
            r = M();
          for (const e of t.docChanges)
            switch (e.type) {
              case 0:
                n = n.add(e.doc.key);
                break;
              case 1:
                r = r.add(e.doc.key);
            }
          return new Ta(e, t.fromCache, n, r);
        }
      }
      class Ea {
        constructor() {
          this._documentReadCount = 0;
        }
        get documentReadCount() {
          return this._documentReadCount;
        }
        incrementDocumentReadCount(e) {
          this._documentReadCount += e;
        }
      }
      class Sa {
        constructor() {
          (this.ji = !1),
            (this.Hi = !1),
            (this.Ji = 100),
            (this.Yi = z() ? 8 : 0 < Pe(G()) ? 6 : 4);
        }
        initialize(e, t) {
          (this.Zi = e), (this.indexManager = t), (this.ji = !0);
        }
        getDocumentsMatchingQuery(n, r, e, t) {
          const s = { result: null };
          return this.Xi(n, r)
            .next((e) => {
              s.result = e;
            })
            .next(() => {
              if (!s.result)
                return this.es(n, r, t, e).next((e) => {
                  s.result = e;
                });
            })
            .next(() => {
              if (!s.result) {
                const t = new Ea();
                return this.ts(n, r, t).next((e) => {
                  if (((s.result = e), this.Hi))
                    return this.ns(n, r, t, e.size);
                });
              }
            })
            .next(() => s.result);
        }
        ns(e, t, n, r) {
          return n.documentReadCount < this.Ji
            ? (ue() <= l.DEBUG &&
                m(
                  "QueryEngine",
                  "SDK will not create cache indexes for query:",
                  rr(t),
                  "since it only creates cache indexes for collection contains",
                  "more than or equal to",
                  this.Ji,
                  "documents"
                ),
              x.resolve())
            : (ue() <= l.DEBUG &&
                m(
                  "QueryEngine",
                  "Query:",
                  rr(t),
                  "scans",
                  n.documentReadCount,
                  "local documents and returns",
                  r,
                  "documents as results."
                ),
              n.documentReadCount > this.Yi * r
                ? (ue() <= l.DEBUG &&
                    m(
                      "QueryEngine",
                      "The SDK decides to create cache indexes for query:",
                      rr(t),
                      "as using cache indexes may help improve performance."
                    ),
                  this.indexManager.createTargetIndexes(e, Xn(t)))
                : x.resolve());
        }
        Xi(s, i) {
          if (Wn(i)) return x.resolve(null);
          let t = Xn(i);
          return this.indexManager.getIndexType(s, t).next((e) =>
            0 === e
              ? null
              : (null !== i.limit &&
                  1 === e &&
                  ((i = er(i, null, "F")), (t = Xn(i))),
                this.indexManager.getDocumentsMatchingTarget(s, t).next((e) => {
                  const r = M(...e);
                  return this.Zi.getDocuments(s, r).next((n) =>
                    this.indexManager.getMinOffset(s, t).next((e) => {
                      var t = this.rs(i, n);
                      return this.ss(i, t, r, e.readTime)
                        ? this.Xi(s, er(i, null, "F"))
                        : this.os(s, t, i, e);
                    })
                  );
                }))
          );
        }
        es(t, n, r, s) {
          return Wn(n) || s.isEqual(b.min())
            ? x.resolve(null)
            : this.Zi.getDocuments(t, r).next((e) => {
                e = this.rs(n, e);
                return this.ss(n, e, r, s)
                  ? x.resolve(null)
                  : (ue() <= l.DEBUG &&
                      m(
                        "QueryEngine",
                        "Re-using previous result from %s to execute query: %s",
                        s.toString(),
                        rr(n)
                      ),
                    this.os(t, e, n, Ce(s, -1)).next((e) => e));
              });
        }
        rs(n, e) {
          let r = new A(ar(n));
          return (
            e.forEach((e, t) => {
              sr(n, t) && (r = r.add(t));
            }),
            r
          );
        }
        ss(e, t, n, r) {
          if (null === e.limit) return !1;
          if (n.size !== t.size) return !0;
          const s = "F" === e.limitType ? t.last() : t.first();
          return !!s && (s.hasPendingWrites || 0 < s.version.compareTo(r));
        }
        ts(e, t, n) {
          return (
            ue() <= l.DEBUG &&
              m(
                "QueryEngine",
                "Using full collection scan to execute query:",
                rr(t)
              ),
            this.Zi.getDocumentsMatchingQuery(e, t, ke.min(), n)
          );
        }
        os(e, n, t, r) {
          return this.Zi.getDocumentsMatchingQuery(e, t, r).next(
            (t) => (
              n.forEach((e) => {
                t = t.insert(e.key, e);
              }),
              t
            )
          );
        }
      }
      class xa {
        constructor(e, t, n, r) {
          (this.persistence = e),
            (this._s = t),
            (this.serializer = r),
            (this.us = new D(T)),
            (this.cs = new or((e) => Bn(e), qn)),
            (this.ls = new Map()),
            (this.hs = e.getRemoteDocumentCache()),
            (this.Gr = e.getTargetCache()),
            (this.jr = e.getBundleCache()),
            this.Ps(n);
        }
        Ps(e) {
          (this.documentOverlayCache =
            this.persistence.getDocumentOverlayCache(e)),
            (this.indexManager = this.persistence.getIndexManager(e)),
            (this.mutationQueue = this.persistence.getMutationQueue(
              e,
              this.indexManager
            )),
            (this.localDocuments = new ra(
              this.hs,
              this.mutationQueue,
              this.documentOverlayCache,
              this.indexManager
            )),
            this.hs.setIndexManager(this.indexManager),
            this._s.initialize(this.localDocuments, this.indexManager);
        }
        collectGarbage(t) {
          return this.persistence.runTransaction(
            "Collect garbage",
            "readwrite-primary",
            (e) => t.collect(e, this.us)
          );
        }
      }
      function Da(e, t, n, r) {
        return new xa(e, t, n, r);
      }
      async function Aa(e, t) {
        const a = e;
        return a.persistence.runTransaction(
          "Handle user change",
          "readonly",
          (s) => {
            let i;
            return a.mutationQueue
              .getAllMutationBatches(s)
              .next(
                (e) => (
                  (i = e), a.Ps(t), a.mutationQueue.getAllMutationBatches(s)
                )
              )
              .next((e) => {
                const t = [],
                  n = [];
                let r = M();
                for (const s of i) {
                  t.push(s.batchId);
                  for (const e of s.mutations) r = r.add(e.key);
                }
                for (const s of e) {
                  n.push(s.batchId);
                  for (const e of s.mutations) r = r.add(e.key);
                }
                return a.localDocuments
                  .getDocuments(s, r)
                  .next((e) => ({
                    Ts: e,
                    removedBatchIds: t,
                    addedBatchIds: n,
                  }));
              });
          }
        );
      }
      function Ca(e) {
        const t = e;
        return t.persistence.runTransaction(
          "Get last remote snapshot version",
          "readonly",
          (e) => t.Gr.getLastRemoteSnapshotVersion(e)
        );
      }
      function Na(e, i, t) {
        let n = M(),
          a = M();
        return (
          t.forEach((e) => (n = n.add(e))),
          i.getEntries(e, n).next((r) => {
            let s = ur;
            return (
              t.forEach((e, t) => {
                const n = r.get(e);
                t.isFoundDocument() !== n.isFoundDocument() && (a = a.add(e)),
                  t.isNoDocument() && t.version.isEqual(b.min())
                    ? (i.removeEntry(e, t.readTime), (s = s.insert(e, t)))
                    : !n.isValidDocument() ||
                      0 < t.version.compareTo(n.version) ||
                      (0 === t.version.compareTo(n.version) &&
                        n.hasPendingWrites)
                    ? (i.addEntry(t), (s = s.insert(e, t)))
                    : m(
                        "LocalStore",
                        "Ignoring outdated watch update for ",
                        e,
                        ". Current version:",
                        n.version,
                        " Watch version:",
                        t.version
                      );
              }),
              { Is: s, Es: a }
            );
          })
        );
      }
      function ka(e, r) {
        const s = e;
        return s.persistence
          .runTransaction("Allocate target", "readwrite", (t) => {
            let n;
            return s.Gr.getTargetData(t, r).next((e) =>
              e
                ? ((n = e), x.resolve(n))
                : s.Gr.allocateTargetId(t).next(
                    (e) => (
                      (n = new Vs(
                        r,
                        e,
                        "TargetPurposeListen",
                        t.currentSequenceNumber
                      )),
                      s.Gr.addTargetData(t, n).next(() => n)
                    )
                  )
            );
          })
          .then((e) => {
            var t = s.us.get(e.targetId);
            return (
              (null === t ||
                0 < e.snapshotVersion.compareTo(t.snapshotVersion)) &&
                ((s.us = s.us.insert(e.targetId, e)), s.cs.set(r, e.targetId)),
              e
            );
          });
      }
      async function Ra(e, t, n) {
        const r = e,
          s = r.us.get(t),
          i = n ? "readwrite" : "readwrite-primary";
        try {
          n ||
            (await r.persistence.runTransaction("Release target", i, (e) =>
              r.persistence.referenceDelegate.removeTarget(e, s)
            ));
        } catch (e) {
          if (!qe(e)) throw e;
          m(
            "LocalStore",
            `Failed to update sequence numbers for target ${t}: ` + e
          );
        }
        (r.us = r.us.remove(t)), r.cs.delete(s.target);
      }
      function La(e, n, r) {
        const s = e;
        let i = b.min(),
          a = M();
        return s.persistence.runTransaction("Execute query", "readwrite", (t) =>
          (function (e, t, n) {
            const r = e,
              s = r.cs.get(n);
            return void 0 !== s
              ? x.resolve(r.us.get(s))
              : r.Gr.getTargetData(t, n);
          })(s, t, Xn(n))
            .next((e) => {
              if (e)
                return (
                  (i = e.lastLimboFreeSnapshotVersion),
                  s.Gr.getMatchingKeysForTargetId(t, e.targetId).next((e) => {
                    a = e;
                  })
                );
            })
            .next(() =>
              s._s.getDocumentsMatchingQuery(t, n, r ? i : b.min(), r ? a : M())
            )
            .next((e) => (Va(s, ir(n), e), { documents: e, ds: a }))
        );
      }
      function Oa(e, t) {
        const n = e,
          r = n.Gr,
          s = n.us.get(t);
        return s
          ? Promise.resolve(s.target)
          : n.persistence.runTransaction("Get target data", "readonly", (e) =>
              r.ut(e, t).next((e) => (e ? e.target : null))
            );
      }
      function Ma(e, t) {
        const n = e,
          r = n.ls.get(t) || b.min();
        return n.persistence
          .runTransaction("Get new document changes", "readonly", (e) =>
            n.hs.getAllFromCollectionGroup(
              e,
              t,
              Ce(r, -1),
              Number.MAX_SAFE_INTEGER
            )
          )
          .then((e) => (Va(n, t, e), e));
      }
      function Va(e, t, n) {
        let r = e.ls.get(t) || b.min();
        n.forEach((e, t) => {
          0 < t.readTime.compareTo(r) && (r = t.readTime);
        }),
          e.ls.set(t, r);
      }
      function Fa(e, t) {
        return `firestore_clients_${e}_` + t;
      }
      function Pa(e, t, n) {
        let r = `firestore_mutations_${e}_` + n;
        return t.isAuthenticated() && (r += "_" + t.uid), r;
      }
      function Ua(e, t) {
        return `firestore_targets_${e}_` + t;
      }
      class Ba {
        constructor(e, t, n, r) {
          (this.user = e),
            (this.batchId = t),
            (this.state = n),
            (this.error = r);
        }
        static fs(e, t, n) {
          var r = JSON.parse(n);
          let s,
            i =
              "object" == typeof r &&
              -1 !== ["pending", "acknowledged", "rejected"].indexOf(r.state) &&
              (void 0 === r.error || "object" == typeof r.error);
          return (
            i &&
              r.error &&
              (i =
                "string" == typeof r.error.message &&
                "string" == typeof r.error.code) &&
              (s = new _(r.error.code, r.error.message)),
            i
              ? new Ba(e, t, r.state, s)
              : (d(
                  "SharedClientState",
                  `Failed to parse mutation state for ID '${t}': ` + n
                ),
                null)
          );
        }
        gs() {
          const e = { state: this.state, updateTimeMs: Date.now() };
          return (
            this.error &&
              (e.error = {
                code: this.error.code,
                message: this.error.message,
              }),
            JSON.stringify(e)
          );
        }
      }
      class qa {
        constructor(e, t, n) {
          (this.targetId = e), (this.state = t), (this.error = n);
        }
        static fs(e, t) {
          var n = JSON.parse(t);
          let r,
            s =
              "object" == typeof n &&
              -1 !== ["not-current", "current", "rejected"].indexOf(n.state) &&
              (void 0 === n.error || "object" == typeof n.error);
          return (
            s &&
              n.error &&
              (s =
                "string" == typeof n.error.message &&
                "string" == typeof n.error.code) &&
              (r = new _(n.error.code, n.error.message)),
            s
              ? new qa(e, n.state, r)
              : (d(
                  "SharedClientState",
                  `Failed to parse target state for ID '${e}': ` + t
                ),
                null)
          );
        }
        gs() {
          const e = { state: this.state, updateTimeMs: Date.now() };
          return (
            this.error &&
              (e.error = {
                code: this.error.code,
                message: this.error.message,
              }),
            JSON.stringify(e)
          );
        }
      }
      class ja {
        constructor(e, t) {
          (this.clientId = e), (this.activeTargetIds = t);
        }
        static fs(e, t) {
          var n = JSON.parse(t);
          let r = "object" == typeof n && n.activeTargetIds instanceof Array,
            s = mr;
          for (let e = 0; r && e < n.activeTargetIds.length; ++e)
            (r = Ye(n.activeTargetIds[e])), (s = s.add(n.activeTargetIds[e]));
          return r
            ? new ja(e, s)
            : (d(
                "SharedClientState",
                `Failed to parse client data for instance '${e}': ` + t
              ),
              null);
        }
      }
      class Ga {
        constructor(e, t) {
          (this.clientId = e), (this.onlineState = t);
        }
        static fs(e) {
          var t = JSON.parse(e);
          return "object" == typeof t &&
            -1 !== ["Unknown", "Online", "Offline"].indexOf(t.onlineState) &&
            "string" == typeof t.clientId
            ? new Ga(t.clientId, t.onlineState)
            : (d("SharedClientState", "Failed to parse online state: " + e),
              null);
        }
      }
      class za {
        constructor() {
          this.activeTargetIds = mr;
        }
        ps(e) {
          this.activeTargetIds = this.activeTargetIds.add(e);
        }
        ys(e) {
          this.activeTargetIds = this.activeTargetIds.delete(e);
        }
        gs() {
          var e = {
            activeTargetIds: this.activeTargetIds.toArray(),
            updateTimeMs: Date.now(),
          };
          return JSON.stringify(e);
        }
      }
      class Ka {
        constructor(e, t, n, r, s) {
          (this.window = e),
            (this.li = t),
            (this.persistenceKey = n),
            (this.ws = r),
            (this.syncEngine = null),
            (this.onlineStateHandler = null),
            (this.sequenceNumberHandler = null),
            (this.Ss = this.bs.bind(this)),
            (this.Ds = new D(T)),
            (this.started = !1),
            (this.vs = []);
          e = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          (this.storage = this.window.localStorage),
            (this.currentUser = s),
            (this.Cs = Fa(this.persistenceKey, this.ws)),
            (this.Fs = "firestore_sequence_number_" + this.persistenceKey),
            (this.Ds = this.Ds.insert(this.ws, new za())),
            (this.Ms = new RegExp(`^firestore_clients_${e}_([^_]*)$`)),
            (this.xs = new RegExp(
              `^firestore_mutations_${e}_(\\d+)(?:_(.*))?$`
            )),
            (this.Os = new RegExp(`^firestore_targets_${e}_(\\d+)$`)),
            (this.Ns = "firestore_online_state_" + this.persistenceKey),
            (this.Ls = "firestore_bundle_loaded_v2_" + this.persistenceKey),
            this.window.addEventListener("storage", this.Ss);
        }
        static p(e) {
          return !(!e || !e.localStorage);
        }
        async start() {
          const e = await this.syncEngine.$i();
          for (const n of e)
            if (n !== this.ws) {
              const e = this.getItem(Fa(this.persistenceKey, n));
              var t;
              e &&
                (t = ja.fs(n, e)) &&
                (this.Ds = this.Ds.insert(t.clientId, t));
            }
          this.Bs();
          const n = this.storage.getItem(this.Ns);
          if (n) {
            const e = this.ks(n);
            e && this.qs(e);
          }
          for (const e of this.vs) this.bs(e);
          (this.vs = []),
            this.window.addEventListener("pagehide", () => this.shutdown()),
            (this.started = !0);
        }
        writeSequenceNumber(e) {
          this.setItem(this.Fs, JSON.stringify(e));
        }
        getAllActiveQueryTargets() {
          return this.Qs(this.Ds);
        }
        isActiveQueryTarget(n) {
          let r = !1;
          return (
            this.Ds.forEach((e, t) => {
              t.activeTargetIds.has(n) && (r = !0);
            }),
            r
          );
        }
        addPendingMutation(e) {
          this.Ks(e, "pending");
        }
        updateMutationState(e, t, n) {
          this.Ks(e, t, n), this.$s(e);
        }
        addLocalQueryTarget(e, t = !0) {
          let n = "not-current";
          if (this.isActiveQueryTarget(e)) {
            const t = this.storage.getItem(Ua(this.persistenceKey, e));
            var r;
            t && (r = qa.fs(e, t)) && (n = r.state);
          }
          return t && this.Us.ps(e), this.Bs(), n;
        }
        removeLocalQueryTarget(e) {
          this.Us.ys(e), this.Bs();
        }
        isLocalQueryTarget(e) {
          return this.Us.activeTargetIds.has(e);
        }
        clearQueryState(e) {
          this.removeItem(Ua(this.persistenceKey, e));
        }
        updateQueryState(e, t, n) {
          this.Ws(e, t, n);
        }
        handleUserChange(e, t, n) {
          t.forEach((e) => {
            this.$s(e);
          }),
            (this.currentUser = e),
            n.forEach((e) => {
              this.addPendingMutation(e);
            });
        }
        setOnlineState(e) {
          this.Gs(e);
        }
        notifyBundleLoaded(e) {
          this.zs(e);
        }
        shutdown() {
          this.started &&
            (this.window.removeEventListener("storage", this.Ss),
            this.removeItem(this.Cs),
            (this.started = !1));
        }
        getItem(e) {
          var t = this.storage.getItem(e);
          return m("SharedClientState", "READ", e, t), t;
        }
        setItem(e, t) {
          m("SharedClientState", "SET", e, t), this.storage.setItem(e, t);
        }
        removeItem(e) {
          m("SharedClientState", "REMOVE", e), this.storage.removeItem(e);
        }
        bs(e) {
          const s = e;
          s.storageArea === this.storage &&
            (m("SharedClientState", "EVENT", s.key, s.newValue),
            s.key !== this.Cs
              ? this.li.enqueueRetryable(async () => {
                  var e;
                  if (this.started) {
                    if (null !== s.key) {
                      if (this.Ms.test(s.key))
                        return null == s.newValue
                          ? ((e = this.js(s.key)), this.Hs(e, null))
                          : (e = this.Js(s.key, s.newValue))
                          ? this.Hs(e.clientId, e)
                          : void 0;
                      if (this.xs.test(s.key)) {
                        if (null !== s.newValue) {
                          var t = this.Ys(s.key, s.newValue);
                          if (t) return this.Zs(t);
                        }
                      } else if (this.Os.test(s.key)) {
                        if (
                          null !== s.newValue &&
                          (t = this.Xs(s.key, s.newValue))
                        )
                          return this.eo(t);
                      } else if (s.key === this.Ns) {
                        if (null !== s.newValue) {
                          var n = this.ks(s.newValue);
                          if (n) return this.qs(n);
                        }
                      } else if (s.key === this.Fs)
                        (n = (function (e) {
                          let t = He.oe;
                          if (null != e)
                            try {
                              var n = JSON.parse(e);
                              p("number" == typeof n), (t = n);
                            } catch (e) {
                              d(
                                "SharedClientState",
                                "Failed to read sequence number from WebStorage",
                                e
                              );
                            }
                          return t;
                        })(s.newValue)) !== He.oe &&
                          this.sequenceNumberHandler(n);
                      else if (s.key === this.Ls) {
                        const r = this.no(s.newValue);
                        await Promise.all(r.map((e) => this.syncEngine.ro(e)));
                      }
                    }
                  } else this.vs.push(s);
                })
              : d(
                  "Received WebStorage notification for local change. Another client might have garbage-collected our state"
                ));
        }
        get Us() {
          return this.Ds.get(this.ws);
        }
        Bs() {
          this.setItem(this.Cs, this.Us.gs());
        }
        Ks(e, t, n) {
          const r = new Ba(this.currentUser, e, t, n),
            s = Pa(this.persistenceKey, this.currentUser, e);
          this.setItem(s, r.gs());
        }
        $s(e) {
          e = Pa(this.persistenceKey, this.currentUser, e);
          this.removeItem(e);
        }
        Gs(e) {
          e = { clientId: this.ws, onlineState: e };
          this.storage.setItem(this.Ns, JSON.stringify(e));
        }
        Ws(e, t, n) {
          const r = Ua(this.persistenceKey, e),
            s = new qa(e, t, n);
          this.setItem(r, s.gs());
        }
        zs(e) {
          e = JSON.stringify(Array.from(e));
          this.setItem(this.Ls, e);
        }
        js(e) {
          e = this.Ms.exec(e);
          return e ? e[1] : null;
        }
        Js(e, t) {
          e = this.js(e);
          return ja.fs(e, t);
        }
        Ys(e, t) {
          var e = this.xs.exec(e),
            n = Number(e[1]),
            e = void 0 !== e[2] ? e[2] : null;
          return Ba.fs(new o(e), n, t);
        }
        Xs(e, t) {
          (e = this.Os.exec(e)), (e = Number(e[1]));
          return qa.fs(e, t);
        }
        ks(e) {
          return Ga.fs(e);
        }
        no(e) {
          return JSON.parse(e);
        }
        async Zs(e) {
          if (e.user.uid === this.currentUser.uid)
            return this.syncEngine.io(e.batchId, e.state, e.error);
          m(
            "SharedClientState",
            "Ignoring mutation for non-active user " + e.user.uid
          );
        }
        eo(e) {
          return this.syncEngine.so(e.targetId, e.state, e.error);
        }
        Hs(e, t) {
          const n = t ? this.Ds.insert(e, t) : this.Ds.remove(e),
            r = this.Qs(this.Ds),
            s = this.Qs(n),
            i = [],
            a = [];
          return (
            s.forEach((e) => {
              r.has(e) || i.push(e);
            }),
            r.forEach((e) => {
              s.has(e) || a.push(e);
            }),
            this.syncEngine.oo(i, a).then(() => {
              this.Ds = n;
            })
          );
        }
        qs(e) {
          this.Ds.get(e.clientId) && this.onlineStateHandler(e.onlineState);
        }
        Qs(e) {
          let n = mr;
          return (
            e.forEach((e, t) => {
              n = n.unionWith(t.activeTargetIds);
            }),
            n
          );
        }
      }
      class Qa {
        constructor() {
          (this._o = new za()),
            (this.ao = {}),
            (this.onlineStateHandler = null),
            (this.sequenceNumberHandler = null);
        }
        addPendingMutation(e) {}
        updateMutationState(e, t, n) {}
        addLocalQueryTarget(e, t = !0) {
          return t && this._o.ps(e), this.ao[e] || "not-current";
        }
        updateQueryState(e, t, n) {
          this.ao[e] = t;
        }
        removeLocalQueryTarget(e) {
          this._o.ys(e);
        }
        isLocalQueryTarget(e) {
          return this._o.activeTargetIds.has(e);
        }
        clearQueryState(e) {
          delete this.ao[e];
        }
        getAllActiveQueryTargets() {
          return this._o.activeTargetIds;
        }
        isActiveQueryTarget(e) {
          return this._o.activeTargetIds.has(e);
        }
        start() {
          return (this._o = new za()), Promise.resolve();
        }
        handleUserChange(e, t, n) {}
        setOnlineState(e) {}
        shutdown() {}
        writeSequenceNumber(e) {}
        notifyBundleLoaded(e) {}
      }
      class $a {
        uo(e) {}
        shutdown() {}
      }
      class Ha {
        constructor() {
          (this.co = () => this.lo()),
            (this.ho = () => this.Po()),
            (this.To = []),
            this.Io();
        }
        uo(e) {
          this.To.push(e);
        }
        shutdown() {
          window.removeEventListener("online", this.co),
            window.removeEventListener("offline", this.ho);
        }
        Io() {
          window.addEventListener("online", this.co),
            window.addEventListener("offline", this.ho);
        }
        lo() {
          m("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
          for (const e of this.To) e(0);
        }
        Po() {
          m("ConnectivityMonitor", "Network connectivity changed: UNAVAILABLE");
          for (const e of this.To) e(1);
        }
        static p() {
          return (
            "undefined" != typeof window &&
            void 0 !== window.addEventListener &&
            void 0 !== window.removeEventListener
          );
        }
      }
      let Wa = null;
      function Ja() {
        return (
          null === Wa
            ? (Wa = 268435456 + Math.round(2147483648 * Math.random()))
            : Wa++,
          "0x" + Wa.toString(16)
        );
      }
      const Ya = {
        BatchGetDocuments: "batchGet",
        Commit: "commit",
        RunQuery: "runQuery",
        RunAggregationQuery: "runAggregationQuery",
      };
      class Xa {
        constructor(e) {
          (this.Eo = e.Eo), (this.Ao = e.Ao);
        }
        Ro(e) {
          this.Vo = e;
        }
        mo(e) {
          this.fo = e;
        }
        po(e) {
          this.yo = e;
        }
        onMessage(e) {
          this.wo = e;
        }
        close() {
          this.Ao();
        }
        send(e) {
          this.Eo(e);
        }
        So() {
          this.Vo();
        }
        bo() {
          this.fo();
        }
        Do(e) {
          this.yo(e);
        }
        vo(e) {
          this.wo(e);
        }
      }
      const Za = "WebChannelConnection";
      class eo extends class {
        get Co() {
          return !1;
        }
        constructor(e) {
          (this.databaseInfo = e), (this.databaseId = e.databaseId);
          var t = e.ssl ? "https" : "http",
            n = encodeURIComponent(this.databaseId.projectId),
            r = encodeURIComponent(this.databaseId.database);
          (this.Fo = t + "://" + e.host),
            (this.Mo = `projects/${n}/databases/` + r),
            (this.xo =
              "(default)" === this.databaseId.database
                ? "project_id=" + n
                : `project_id=${n}&database_id=` + r);
        }
        Oo(t, e, n, r, s) {
          const i = Ja(),
            a = this.No(t, e.toUriEncodedString());
          m("RestConnection", `Sending RPC '${t}' ${i}:`, a, n);
          e = {
            "google-cloud-resource-prefix": this.Mo,
            "x-goog-request-params": this.xo,
          };
          return (
            this.Lo(e, r, s),
            this.Bo(t, a, e, n).then(
              (e) => (m("RestConnection", `Received RPC '${t}' ${i}: `, e), e),
              (e) => {
                throw (
                  (he(
                    "RestConnection",
                    `RPC '${t}' ${i} failed with error: `,
                    e,
                    "url: ",
                    a,
                    "request:",
                    n
                  ),
                  e)
                );
              }
            )
          );
        }
        ko(e, t, n, r, s, i) {
          return this.Oo(e, t, n, r, s);
        }
        Lo(n, e, t) {
          (n["X-Goog-Api-Client"] = "gl-js/ fire/" + ae),
            (n["Content-Type"] = "text/plain"),
            this.databaseInfo.appId &&
              (n["X-Firebase-GMPID"] = this.databaseInfo.appId),
            e && e.headers.forEach((e, t) => (n[t] = e)),
            t && t.headers.forEach((e, t) => (n[t] = e));
        }
        No(e, t) {
          e = Ya[e];
          return this.Fo + `/v1/${t}:` + e;
        }
        terminate() {}
      } {
        constructor(e) {
          super(e),
            (this.forceLongPolling = e.forceLongPolling),
            (this.autoDetectLongPolling = e.autoDetectLongPolling),
            (this.useFetchStreams = e.useFetchStreams),
            (this.longPollingOptions = e.longPollingOptions);
        }
        Bo(o, t, n, r) {
          const u = Ja();
          return new Promise((s, i) => {
            const a = new pn();
            a.setWithCredentials(!0),
              a.listenOnce(vn.COMPLETE, () => {
                try {
                  switch (a.getLastErrorCode()) {
                    case wn.NO_ERROR:
                      var e = a.getResponseJson();
                      m(
                        Za,
                        `XHR for RPC '${o}' ${u} received:`,
                        JSON.stringify(e)
                      ),
                        s(e);
                      break;
                    case wn.TIMEOUT:
                      m(Za, `RPC '${o}' ${u} timed out`),
                        i(new _(w.DEADLINE_EXCEEDED, "Request time out"));
                      break;
                    case wn.HTTP_ERROR:
                      var t = a.getStatus();
                      if (
                        (m(
                          Za,
                          `RPC '${o}' ${u} failed with status:`,
                          t,
                          "response text:",
                          a.getResponseText()
                        ),
                        0 < t)
                      ) {
                        let e = a.getResponseJson();
                        var n =
                          null == (e = Array.isArray(e) ? e[0] : e)
                            ? void 0
                            : e.error;
                        if (n && n.status && n.message) {
                          r = n.status.toLowerCase().replace(/_/g, "-");
                          const o =
                            0 <= Object.values(w).indexOf(r) ? r : w.UNKNOWN;
                          i(new _(o, n.message));
                        } else
                          i(
                            new _(
                              w.UNKNOWN,
                              "Server responded with status " + a.getStatus()
                            )
                          );
                      } else i(new _(w.UNAVAILABLE, "Connection failed."));
                      break;
                    default:
                      I();
                  }
                } finally {
                  m(Za, `RPC '${o}' ${u} completed.`);
                }
                var r;
              });
            var e = JSON.stringify(r);
            m(Za, `RPC '${o}' ${u} sending request:`, r),
              a.send(t, "POST", e, n, 15);
          });
        }
        qo(s, e, t) {
          const i = Ja(),
            n = [
              this.Fo,
              "/",
              "google.firestore.v1.Firestore",
              "/",
              s,
              "/channel",
            ],
            r = Tn(),
            a = In(),
            o = {
              httpSessionIdParam: "gsessionid",
              initMessageHeaders: {},
              messageUrlParams: {
                database:
                  `projects/${this.databaseId.projectId}/databases/` +
                  this.databaseId.database,
              },
              sendRawJson: !0,
              supportsCrossDomainXhr: !0,
              internalChannelParams: { forwardChannelRequestTimeoutMs: 6e5 },
              forceLongPolling: this.forceLongPolling,
              detectBufferingProxy: this.autoDetectLongPolling,
            },
            u = this.longPollingOptions.timeoutSeconds;
          void 0 !== u && (o.longPollingTimeout = Math.round(1e3 * u)),
            this.useFetchStreams && (o.useFetchStreams = !0),
            this.Lo(o.initMessageHeaders, e, t),
            (o.encodeInitMessageHeaders = !0);
          e = n.join("");
          m(Za, `Creating RPC '${s}' stream ${i}: ` + e, o);
          const h = r.createWebChannel(e, o);
          let c = !1,
            l = !1;
          const d = new Xa({
              Eo: (e) => {
                l
                  ? m(
                      Za,
                      `Not sending because RPC '${s}' stream ${i} is closed:`,
                      e
                    )
                  : (c ||
                      (m(Za, `Opening RPC '${s}' stream ${i} transport.`),
                      h.open(),
                      (c = !0)),
                    m(Za, `RPC '${s}' stream ${i} sending:`, e),
                    h.send(e));
              },
              Ao: () => h.close(),
            }),
            f = (e, t, n) => {
              e.listen(t, (e) => {
                try {
                  n(e);
                } catch (e) {
                  setTimeout(() => {
                    throw e;
                  }, 0);
                }
              });
            };
          return (
            f(h, yn.EventType.OPEN, () => {
              l || (m(Za, `RPC '${s}' stream ${i} transport opened.`), d.So());
            }),
            f(h, yn.EventType.CLOSE, () => {
              l ||
                ((l = !0),
                m(Za, `RPC '${s}' stream ${i} transport closed`),
                d.Do());
            }),
            f(h, yn.EventType.ERROR, (e) => {
              l ||
                ((l = !0),
                he(Za, `RPC '${s}' stream ${i} transport errored:`, e),
                d.Do(
                  new _(w.UNAVAILABLE, "The operation could not be completed")
                ));
            }),
            f(h, yn.EventType.MESSAGE, (n) => {
              if (!l) {
                var n = n.data[0],
                  r =
                    (p(!!n),
                    (null == n ? void 0 : n.error) ||
                      (null == (r = n[0]) ? void 0 : r.error));
                if (r) {
                  m(Za, `RPC '${s}' stream ${i} received error:`, r);
                  const n = r.status;
                  let e = (function (e) {
                      e = g[e];
                      if (void 0 !== e) return Hr(e);
                    })(n),
                    t = r.message;
                  void 0 === e &&
                    ((e = w.INTERNAL),
                    (t =
                      "Unknown error status: " +
                      n +
                      " with message " +
                      r.message)),
                    (l = !0),
                    d.Do(new _(e, t)),
                    h.close();
                } else m(Za, `RPC '${s}' stream ${i} received:`, n), d.vo(n);
              }
            }),
            f(a, bn.STAT_EVENT, (e) => {
              e.stat === _n.PROXY
                ? m(Za, `RPC '${s}' stream ${i} detected buffering proxy`)
                : e.stat === _n.NOPROXY &&
                  m(Za, `RPC '${s}' stream ${i} detected no buffering proxy`);
            }),
            setTimeout(() => {
              d.bo();
            }, 0),
            d
          );
        }
      }
      function to() {
        return "undefined" != typeof window ? window : null;
      }
      function no() {
        return "undefined" != typeof document ? document : null;
      }
      function ro(e) {
        return new fs(e, !0);
      }
      class so {
        constructor(e, t, n = 1e3, r = 1.5, s = 6e4) {
          (this.li = e),
            (this.timerId = t),
            (this.Qo = n),
            (this.Ko = r),
            (this.$o = s),
            (this.Uo = 0),
            (this.Wo = null),
            (this.Go = Date.now()),
            this.reset();
        }
        reset() {
          this.Uo = 0;
        }
        zo() {
          this.Uo = this.$o;
        }
        jo(e) {
          this.cancel();
          var t = Math.floor(this.Uo + this.Ho()),
            n = Math.max(0, Date.now() - this.Go),
            r = Math.max(0, t - n);
          0 < r &&
            m(
              "ExponentialBackoff",
              `Backing off for ${r} ms (base delay: ${this.Uo} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`
            ),
            (this.Wo = this.li.enqueueAfterDelay(
              this.timerId,
              r,
              () => ((this.Go = Date.now()), e())
            )),
            (this.Uo *= this.Ko),
            this.Uo < this.Qo && (this.Uo = this.Qo),
            this.Uo > this.$o && (this.Uo = this.$o);
        }
        Jo() {
          null !== this.Wo && (this.Wo.skipDelay(), (this.Wo = null));
        }
        cancel() {
          null !== this.Wo && (this.Wo.cancel(), (this.Wo = null));
        }
        Ho() {
          return (Math.random() - 0.5) * this.Uo;
        }
      }
      class io {
        constructor(e, t, n, r, s, i, a, o) {
          (this.li = e),
            (this.Yo = n),
            (this.Zo = r),
            (this.connection = s),
            (this.authCredentialsProvider = i),
            (this.appCheckCredentialsProvider = a),
            (this.listener = o),
            (this.state = 0),
            (this.Xo = 0),
            (this.e_ = null),
            (this.t_ = null),
            (this.stream = null),
            (this.n_ = 0),
            (this.r_ = new so(e, t));
        }
        i_() {
          return 1 === this.state || 5 === this.state || this.s_();
        }
        s_() {
          return 2 === this.state || 3 === this.state;
        }
        start() {
          (this.n_ = 0), 4 !== this.state ? this.auth() : this.o_();
        }
        async stop() {
          this.i_() && (await this.close(0));
        }
        __() {
          (this.state = 0), this.r_.reset();
        }
        a_() {
          this.s_() &&
            null === this.e_ &&
            (this.e_ = this.li.enqueueAfterDelay(this.Yo, 6e4, () =>
              this.u_()
            ));
        }
        c_(e) {
          this.l_(), this.stream.send(e);
        }
        async u_() {
          if (this.s_()) return this.close(0);
        }
        l_() {
          this.e_ && (this.e_.cancel(), (this.e_ = null));
        }
        h_() {
          this.t_ && (this.t_.cancel(), (this.t_ = null));
        }
        async close(e, t) {
          this.l_(),
            this.h_(),
            this.r_.cancel(),
            this.Xo++,
            4 !== e
              ? this.r_.reset()
              : t && t.code === w.RESOURCE_EXHAUSTED
              ? (d(t.toString()),
                d(
                  "Using maximum backoff delay to prevent overloading the backend."
                ),
                this.r_.zo())
              : t &&
                t.code === w.UNAUTHENTICATED &&
                3 !== this.state &&
                (this.authCredentialsProvider.invalidateToken(),
                this.appCheckCredentialsProvider.invalidateToken()),
            null !== this.stream &&
              (this.P_(), this.stream.close(), (this.stream = null)),
            (this.state = e),
            await this.listener.po(t);
        }
        P_() {}
        auth() {
          this.state = 1;
          const e = this.T_(this.Xo),
            n = this.Xo;
          Promise.all([
            this.authCredentialsProvider.getToken(),
            this.appCheckCredentialsProvider.getToken(),
          ]).then(
            ([e, t]) => {
              this.Xo === n && this.I_(e, t);
            },
            (t) => {
              e(() => {
                var e = new _(
                  w.UNKNOWN,
                  "Fetching auth token failed: " + t.message
                );
                return this.E_(e);
              });
            }
          );
        }
        I_(e, t) {
          const n = this.T_(this.Xo);
          (this.stream = this.d_(e, t)),
            this.stream.Ro(() => {
              n(() => this.listener.Ro());
            }),
            this.stream.mo(() => {
              n(
                () => (
                  (this.state = 2),
                  (this.t_ = this.li.enqueueAfterDelay(
                    this.Zo,
                    1e4,
                    () => (this.s_() && (this.state = 3), Promise.resolve())
                  )),
                  this.listener.mo()
                )
              );
            }),
            this.stream.po((e) => {
              n(() => this.E_(e));
            }),
            this.stream.onMessage((e) => {
              n(() => (1 == ++this.n_ ? this.A_(e) : this.onNext(e)));
            });
        }
        o_() {
          (this.state = 5),
            this.r_.jo(async () => {
              (this.state = 0), this.start();
            });
        }
        E_(e) {
          return (
            m("PersistentStream", "close with error: " + e),
            (this.stream = null),
            this.close(4, e)
          );
        }
        T_(t) {
          return (e) => {
            this.li.enqueueAndForget(() =>
              this.Xo === t
                ? e()
                : (m(
                    "PersistentStream",
                    "stream callback skipped by getCloseGuardedDispatcher."
                  ),
                  Promise.resolve())
            );
          };
        }
      }
      class ao extends io {
        constructor(e, t, n, r, s, i) {
          super(
            e,
            "listen_stream_connection_backoff",
            "listen_stream_idle",
            "health_check_timeout",
            t,
            n,
            r,
            i
          ),
            (this.serializer = s);
        }
        d_(e, t) {
          return this.connection.qo("Listen", e, t);
        }
        A_(e) {
          return this.onNext(e);
        }
        onNext(e) {
          this.r_.reset();
          var t = (function (e, t) {
              let n;
              if ("targetChange" in t) {
                t.targetChange;
                var r =
                    "NO_CHANGE" ===
                    (f = t.targetChange.targetChangeType || "NO_CHANGE")
                      ? 0
                      : "ADD" === f
                      ? 1
                      : "REMOVE" === f
                      ? 2
                      : "CURRENT" === f
                      ? 3
                      : "RESET" === f
                      ? 4
                      : I(),
                  s = t.targetChange.targetIds || [],
                  i =
                    ((f = t.targetChange.resumeToken),
                    e.useProto3Json
                      ? (p(void 0 === f || "string" == typeof f),
                        C.fromBase64String(f || ""))
                      : (p(
                          void 0 === f ||
                            f instanceof Buffer ||
                            f instanceof Uint8Array
                        ),
                        C.fromUint8Array(f || new Uint8Array()))),
                  a = t.targetChange.cause,
                  o =
                    a &&
                    ((o = void 0 === (f = a).code ? w.UNKNOWN : Hr(f.code)),
                    new _(o, f.message || ""));
                n = new is(r, s, i, o || null);
              } else if ("documentChange" in t) {
                t.documentChange;
                (c = t.documentChange).document,
                  c.document.name,
                  c.document.updateTime;
                var i = bs(e, c.document.name),
                  o = F(c.document.updateTime),
                  u = c.document.createTime
                    ? F(c.document.createTime)
                    : b.min(),
                  h = new k({ mapValue: { fields: c.document.fields } }),
                  u = R.newFoundDocument(i, o, u, h),
                  h = c.targetIds || [],
                  c = c.removedTargetIds || [];
                n = new rs(h, c, u.key, u);
              } else if ("documentDelete" in t)
                t.documentDelete,
                  (h = t.documentDelete).document,
                  (c = bs(e, h.document)),
                  (u = h.readTime ? F(h.readTime) : b.min()),
                  (u = R.newNoDocument(c, u)),
                  (h = h.removedTargetIds || []),
                  (n = new rs([], h, u.key, u));
              else if ("documentRemove" in t) {
                t.documentRemove;
                (d = t.documentRemove).document;
                var l = bs(e, d.document),
                  d = d.removedTargetIds || [];
                n = new rs([], d, l, null);
              } else {
                if (!("filter" in t)) return I();
                {
                  t.filter;
                  const e = t.filter;
                  e.targetId;
                  var { count: d = 0, unchangedNames: l } = e,
                    d = new Qr(d, l),
                    l = e.targetId;
                  n = new ss(l, d);
                }
              }
              var f;
              return n;
            })(this.serializer, e),
            e = (function (e) {
              if (!("targetChange" in e)) return b.min();
              e = e.targetChange;
              return (e.targetIds && e.targetIds.length) || !e.readTime
                ? b.min()
                : F(e.readTime);
            })(e);
          return this.listener.R_(t, e);
        }
        V_(e) {
          const t = {};
          (t.database = Es(this.serializer)),
            (t.addTarget = (function (e, t) {
              let n;
              const r = t.target;
              if (
                (((n = jn(r)
                  ? { documents: Ns(e, r) }
                  : { query: ks(e, r).ct }).targetId = t.targetId),
                0 < t.resumeToken.approximateByteSize())
              ) {
                n.resumeToken = ps(e, t.resumeToken);
                const r = gs(e, t.expectedCount);
                null !== r && (n.expectedCount = r);
              } else if (0 < t.snapshotVersion.compareTo(b.min())) {
                n.readTime = ms(e, t.snapshotVersion.toTimestamp());
                const r = gs(e, t.expectedCount);
                null !== r && (n.expectedCount = r);
              }
              return n;
            })(this.serializer, e));
          this.serializer;
          var n =
            null ==
            (n = (function () {
              switch (e.purpose) {
                case "TargetPurposeListen":
                  return null;
                case "TargetPurposeExistenceFilterMismatch":
                  return "existence-filter-mismatch";
                case "TargetPurposeExistenceFilterMismatchBloom":
                  return "existence-filter-mismatch-bloom";
                case "TargetPurposeLimboResolution":
                  return "limbo-document";
                default:
                  return I();
              }
            })())
              ? null
              : { "goog-listen-tags": n };
          n && (t.labels = n), this.c_(t);
        }
        m_(e) {
          const t = {};
          (t.database = Es(this.serializer)), (t.removeTarget = e), this.c_(t);
        }
      }
      class oo extends io {
        constructor(e, t, n, r, s, i) {
          super(
            e,
            "write_stream_connection_backoff",
            "write_stream_idle",
            "health_check_timeout",
            t,
            n,
            r,
            i
          ),
            (this.serializer = s);
        }
        get f_() {
          return 0 < this.n_;
        }
        start() {
          (this.lastStreamToken = void 0), super.start();
        }
        P_() {
          this.f_ && this.g_([]);
        }
        d_(e, t) {
          return this.connection.qo("Write", e, t);
        }
        A_(e) {
          return (
            p(!!e.streamToken),
            (this.lastStreamToken = e.streamToken),
            p(!e.writeResults || 0 === e.writeResults.length),
            this.listener.p_()
          );
        }
        onNext(e) {
          p(!!e.streamToken),
            (this.lastStreamToken = e.streamToken),
            this.r_.reset();
          (t = e.writeResults), (r = e.commitTime);
          var r,
            t =
              t && 0 < t.length
                ? (p(void 0 !== r),
                  t.map((t) => {
                    {
                      var n = r;
                      let e = t.updateTime ? F(t.updateTime) : F(n);
                      return (
                        e.isEqual(b.min()) && (e = F(n)),
                        new Nr(e, t.transformResults || [])
                      );
                    }
                  }))
                : [],
            e = F(e.commitTime);
          return this.listener.y_(e, t);
        }
        w_() {
          const e = {};
          (e.database = Es(this.serializer)), this.c_(e);
        }
        g_(e) {
          e = {
            streamToken: this.lastStreamToken,
            writes: e.map((e) => As(this.serializer, e)),
          };
          this.c_(e);
        }
      }
      class uo extends class {} {
        constructor(e, t, n, r) {
          super(),
            (this.authCredentials = e),
            (this.appCheckCredentials = t),
            (this.connection = n),
            (this.serializer = r),
            (this.S_ = !1);
        }
        b_() {
          if (this.S_)
            throw new _(
              w.FAILED_PRECONDITION,
              "The client has already been terminated."
            );
        }
        Oo(n, r, s, i) {
          return (
            this.b_(),
            Promise.all([
              this.authCredentials.getToken(),
              this.appCheckCredentials.getToken(),
            ])
              .then(([e, t]) => this.connection.Oo(n, vs(r, s), i, e, t))
              .catch((e) => {
                throw "FirebaseError" === e.name
                  ? (e.code === w.UNAUTHENTICATED &&
                      (this.authCredentials.invalidateToken(),
                      this.appCheckCredentials.invalidateToken()),
                    e)
                  : new _(w.UNKNOWN, e.toString());
              })
          );
        }
        ko(n, r, s, i, a) {
          return (
            this.b_(),
            Promise.all([
              this.authCredentials.getToken(),
              this.appCheckCredentials.getToken(),
            ])
              .then(([e, t]) => this.connection.ko(n, vs(r, s), i, e, t, a))
              .catch((e) => {
                throw "FirebaseError" === e.name
                  ? (e.code === w.UNAUTHENTICATED &&
                      (this.authCredentials.invalidateToken(),
                      this.appCheckCredentials.invalidateToken()),
                    e)
                  : new _(w.UNKNOWN, e.toString());
              })
          );
        }
        terminate() {
          (this.S_ = !0), this.connection.terminate();
        }
      }
      class ho {
        constructor(e, t) {
          (this.asyncQueue = e),
            (this.onlineStateHandler = t),
            (this.state = "Unknown"),
            (this.D_ = 0),
            (this.v_ = null),
            (this.C_ = !0);
        }
        F_() {
          0 === this.D_ &&
            (this.M_("Unknown"),
            (this.v_ = this.asyncQueue.enqueueAfterDelay(
              "online_state_timeout",
              1e4,
              () => (
                (this.v_ = null),
                this.x_("Backend didn't respond within 10 seconds."),
                this.M_("Offline"),
                Promise.resolve()
              )
            )));
        }
        O_(e) {
          "Online" === this.state
            ? this.M_("Unknown")
            : (this.D_++,
              1 <= this.D_ &&
                (this.N_(),
                this.x_(
                  "Connection failed 1 times. Most recent error: " +
                    e.toString()
                ),
                this.M_("Offline")));
        }
        set(e) {
          this.N_(),
            (this.D_ = 0),
            "Online" === e && (this.C_ = !1),
            this.M_(e);
        }
        M_(e) {
          e !== this.state && ((this.state = e), this.onlineStateHandler(e));
        }
        x_(e) {
          e = `Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
          this.C_ ? (d(e), (this.C_ = !1)) : m("OnlineStateTracker", e);
        }
        N_() {
          null !== this.v_ && (this.v_.cancel(), (this.v_ = null));
        }
      }
      class co {
        constructor(e, t, n, r, s) {
          (this.localStore = e),
            (this.datastore = t),
            (this.asyncQueue = n),
            (this.remoteSyncer = {}),
            (this.L_ = []),
            (this.B_ = new Map()),
            (this.k_ = new Set()),
            (this.q_ = []),
            (this.Q_ = s),
            this.Q_.uo((e) => {
              n.enqueueAndForget(async () => {
                if (_o(this)) {
                  m(
                    "RemoteStore",
                    "Restarting streams for network reachability change."
                  );
                  {
                    var e;
                    const t = this;
                    t.k_.add(4),
                      await fo(t),
                      t.K_.set("Unknown"),
                      t.k_.delete(4),
                      await lo(t);
                  }
                }
              });
            }),
            (this.K_ = new ho(n, r));
        }
      }
      async function lo(e) {
        if (_o(e)) for (const t of e.q_) await t(!0);
      }
      async function fo(e) {
        for (const t of e.q_) await t(!1);
      }
      function go(e, t) {
        const n = e;
        n.B_.has(t.targetId) ||
          (n.B_.set(t.targetId, t), wo(n) ? vo(n) : Co(n).s_() && po(n, t));
      }
      function mo(e, t) {
        const n = e,
          r = Co(n);
        n.B_.delete(t),
          r.s_() && yo(n, t),
          0 === n.B_.size && (r.s_() ? r.a_() : _o(n) && n.K_.set("Unknown"));
      }
      function po(e, t) {
        var n;
        e.U_.xe(t.targetId),
          (0 < t.resumeToken.approximateByteSize() ||
            0 < t.snapshotVersion.compareTo(b.min())) &&
            ((n = e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size),
            (t = t.withExpectedCount(n))),
          Co(e).V_(t);
      }
      function yo(e, t) {
        e.U_.xe(t), Co(e).m_(t);
      }
      function vo(t) {
        (t.U_ = new os({
          getRemoteKeysForTarget: (e) =>
            t.remoteSyncer.getRemoteKeysForTarget(e),
          ut: (e) => t.B_.get(e) || null,
          nt: () => t.datastore.serializer.databaseId,
        })),
          Co(t).start(),
          t.K_.F_();
      }
      function wo(e) {
        return _o(e) && !Co(e).i_() && 0 < e.B_.size;
      }
      function _o(e) {
        return 0 === e.k_.size;
      }
      function bo(e) {
        e.U_ = void 0;
      }
      async function Io(e, t, n) {
        if (!qe(t)) throw t;
        e.k_.add(1),
          await fo(e),
          e.K_.set("Offline"),
          (n = n || (() => Ca(e.localStore))),
          e.asyncQueue.enqueueRetryable(async () => {
            m("RemoteStore", "Retrying IndexedDB access"),
              await n(),
              e.k_.delete(1),
              await lo(e);
          });
      }
      function To(t, n) {
        return n().catch((e) => Io(t, e, n));
      }
      async function Eo(e) {
        const t = e,
          n = No(t);
        let r = 0 < t.L_.length ? t.L_[t.L_.length - 1].batchId : -1;
        for (; _o((a = t)) && a.L_.length < 10; )
          try {
            const e = await (function (e, t) {
              const n = e;
              return n.persistence.runTransaction(
                "Get next mutation batch",
                "readonly",
                (e) => (
                  void 0 === t && (t = -1),
                  n.mutationQueue.getNextMutationBatchAfterBatchId(e, t)
                )
              );
            })(t.localStore, r);
            if (null === e) {
              0 === t.L_.length && n.a_();
              break;
            }
            r = e.batchId;
            {
              var s = t;
              var i = e;
              s.L_.push(i);
              const o = No(s);
              o.s_() && o.f_ && o.g_(i.mutations);
            }
          } catch (e) {
            await Io(t, e);
          }
        var a;
        So(t) && xo(t);
      }
      function So(e) {
        return _o(e) && !No(e).i_() && 0 < e.L_.length;
      }
      function xo(e) {
        No(e).start();
      }
      async function Do(e, t) {
        const n = e;
        n.asyncQueue.verifyOperationInProgress(),
          m("RemoteStore", "RemoteStore received new credentials");
        e = _o(n);
        n.k_.add(3),
          await fo(n),
          e && n.K_.set("Unknown"),
          await n.remoteSyncer.handleCredentialChange(t),
          n.k_.delete(3),
          await lo(n);
      }
      async function Ao(e, t) {
        const n = e;
        t
          ? (n.k_.delete(2), await lo(n))
          : (n.k_.add(2), await fo(n), n.K_.set("Unknown"));
      }
      function Co(t) {
        return (
          t.W_ ||
            ((t.W_ = (function (e, t, n) {
              const r = e;
              return (
                r.b_(),
                new ao(
                  t,
                  r.connection,
                  r.authCredentials,
                  r.appCheckCredentials,
                  r.serializer,
                  n
                )
              );
            })(t.datastore, t.asyncQueue, {
              Ro: async function (e) {
                e.K_.set("Online");
              }.bind(null, t),
              mo: async function (n) {
                n.B_.forEach((e, t) => {
                  po(n, e);
                });
              }.bind(null, t),
              po: async function (e, t) {
                bo(e), wo(e) ? (e.K_.O_(t), vo(e)) : e.K_.set("Unknown");
              }.bind(null, t),
              R_: async function (e, t, n) {
                if (
                  (e.K_.set("Online"),
                  t instanceof is && 2 === t.state && t.cause)
                )
                  try {
                    var r = e,
                      s = t.cause;
                    for (const o of t.targetIds)
                      r.B_.has(o) &&
                        (await r.remoteSyncer.rejectListen(o, s),
                        r.B_.delete(o),
                        r.U_.removeTarget(o));
                  } catch (n) {
                    m(
                      "RemoteStore",
                      "Failed to remove targets %s: %s ",
                      t.targetIds.join(","),
                      n
                    ),
                      await Io(e, n);
                  }
                else if (
                  (t instanceof rs
                    ? e.U_.$e(t)
                    : t instanceof ss
                    ? e.U_.Je(t)
                    : e.U_.Ge(t),
                  !n.isEqual(b.min()))
                )
                  try {
                    const t = await Ca(e.localStore);
                    if (0 <= n.compareTo(t)) {
                      var i = e,
                        a = n;
                      const u = i.U_.it(a);
                      void (await (u.targetChanges.forEach((e, t) => {
                        if (0 < e.resumeToken.approximateByteSize()) {
                          const n = i.B_.get(t);
                          n && i.B_.set(t, n.withResumeToken(e.resumeToken, a));
                        }
                      }),
                      u.targetMismatches.forEach((e, t) => {
                        const n = i.B_.get(e);
                        n &&
                          (i.B_.set(
                            e,
                            n.withResumeToken(
                              C.EMPTY_BYTE_STRING,
                              n.snapshotVersion
                            )
                          ),
                          yo(i, e),
                          (e = new Vs(n.target, e, t, n.sequenceNumber)),
                          po(i, e));
                      }),
                      i.remoteSyncer.applyRemoteEvent(u)));
                    }
                  } catch (t) {
                    m("RemoteStore", "Failed to raise snapshot:", t),
                      await Io(e, t);
                  }
              }.bind(null, t),
            })),
            t.q_.push(async (e) => {
              e
                ? (t.W_.__(), wo(t) ? vo(t) : t.K_.set("Unknown"))
                : (await t.W_.stop(), bo(t));
            })),
          t.W_
        );
      }
      function No(t) {
        return (
          t.G_ ||
            ((t.G_ = (function (e, t, n) {
              const r = e;
              return (
                r.b_(),
                new oo(
                  t,
                  r.connection,
                  r.authCredentials,
                  r.appCheckCredentials,
                  r.serializer,
                  n
                )
              );
            })(t.datastore, t.asyncQueue, {
              Ro: () => Promise.resolve(),
              mo: async function (e) {
                No(e).w_();
              }.bind(null, t),
              po: async function (e, t) {
                if (t && No(e).f_) {
                  var n = e,
                    r = t;
                  if ($r((t = r.code)) && t !== w.ABORTED) {
                    const s = n.L_.shift();
                    No(n).__(),
                      await To(n, () =>
                        n.remoteSyncer.rejectFailedWrite(s.batchId, r)
                      ),
                      await Eo(n);
                  }
                  await 0;
                }
                So(e) && xo(e);
              }.bind(null, t),
              p_: async function (e) {
                const t = No(e);
                for (const n of e.L_) t.g_(n.mutations);
              }.bind(null, t),
              y_: async function (e, t, n) {
                const r = e.L_.shift(),
                  s = zr.from(r, t, n);
                await To(e, () => e.remoteSyncer.applySuccessfulWrite(s)),
                  await Eo(e);
              }.bind(null, t),
            })),
            t.q_.push(async (e) => {
              e
                ? (t.G_.__(), await Eo(t))
                : (await t.G_.stop(),
                  0 < t.L_.length &&
                    (m(
                      "RemoteStore",
                      `Stopping write stream with ${t.L_.length} pending writes`
                    ),
                    (t.L_ = [])));
            })),
          t.G_
        );
      }
      class ko {
        constructor(e, t, n, r, s) {
          (this.asyncQueue = e),
            (this.timerId = t),
            (this.targetTimeMs = n),
            (this.op = r),
            (this.removalCallback = s),
            (this.deferred = new f()),
            (this.then = this.deferred.promise.then.bind(
              this.deferred.promise
            )),
            this.deferred.promise.catch((e) => {});
        }
        get promise() {
          return this.deferred.promise;
        }
        static createAndSchedule(e, t, n, r, s) {
          const i = Date.now() + n,
            a = new ko(e, t, i, r, s);
          return a.start(n), a;
        }
        start(e) {
          this.timerHandle = setTimeout(() => this.handleDelayElapsed(), e);
        }
        skipDelay() {
          return this.handleDelayElapsed();
        }
        cancel(e) {
          null !== this.timerHandle &&
            (this.clearTimeout(),
            this.deferred.reject(
              new _(w.CANCELLED, "Operation cancelled" + (e ? ": " + e : ""))
            ));
        }
        handleDelayElapsed() {
          this.asyncQueue.enqueueAndForget(() =>
            null !== this.timerHandle
              ? (this.clearTimeout(),
                this.op().then((e) => this.deferred.resolve(e)))
              : Promise.resolve()
          );
        }
        clearTimeout() {
          null !== this.timerHandle &&
            (this.removalCallback(this),
            clearTimeout(this.timerHandle),
            (this.timerHandle = null));
        }
      }
      function Ro(e, t) {
        if ((d("AsyncQueue", t + ": " + e), qe(e)))
          return new _(w.UNAVAILABLE, t + ": " + e);
        throw e;
      }
      class Lo {
        static emptySet(e) {
          return new Lo(e.comparator);
        }
        constructor(n) {
          (this.comparator = n
            ? (e, t) => n(e, t) || S.comparator(e.key, t.key)
            : (e, t) => S.comparator(e.key, t.key)),
            (this.keyedMap = cr()),
            (this.sortedSet = new D(this.comparator));
        }
        has(e) {
          return null != this.keyedMap.get(e);
        }
        get(e) {
          return this.keyedMap.get(e);
        }
        first() {
          return this.sortedSet.minKey();
        }
        last() {
          return this.sortedSet.maxKey();
        }
        isEmpty() {
          return this.sortedSet.isEmpty();
        }
        indexOf(e) {
          e = this.keyedMap.get(e);
          return e ? this.sortedSet.indexOf(e) : -1;
        }
        get size() {
          return this.sortedSet.size;
        }
        forEach(n) {
          this.sortedSet.inorderTraversal((e, t) => (n(e), !1));
        }
        add(e) {
          const t = this.delete(e.key);
          return t.copy(
            t.keyedMap.insert(e.key, e),
            t.sortedSet.insert(e, null)
          );
        }
        delete(e) {
          var t = this.get(e);
          return t
            ? this.copy(this.keyedMap.remove(e), this.sortedSet.remove(t))
            : this;
        }
        isEqual(e) {
          if (!(e instanceof Lo)) return !1;
          if (this.size !== e.size) return !1;
          const t = this.sortedSet.getIterator(),
            n = e.sortedSet.getIterator();
          for (; t.hasNext(); ) {
            const e = t.getNext().key,
              r = n.getNext().key;
            if (!e.isEqual(r)) return !1;
          }
          return !0;
        }
        toString() {
          const t = [];
          return (
            this.forEach((e) => {
              t.push(e.toString());
            }),
            0 === t.length
              ? "DocumentSet ()"
              : "DocumentSet (\n  " + t.join("  \n") + "\n)"
          );
        }
        copy(e, t) {
          const n = new Lo();
          return (
            (n.comparator = this.comparator),
            (n.keyedMap = e),
            (n.sortedSet = t),
            n
          );
        }
      }
      class Oo {
        constructor() {
          this.z_ = new D(S.comparator);
        }
        track(e) {
          var t = e.doc.key,
            n = this.z_.get(t);
          !n || (0 !== e.type && 3 === n.type)
            ? (this.z_ = this.z_.insert(t, e))
            : 3 === e.type && 1 !== n.type
            ? (this.z_ = this.z_.insert(t, { type: n.type, doc: e.doc }))
            : 2 === e.type && 2 === n.type
            ? (this.z_ = this.z_.insert(t, { type: 2, doc: e.doc }))
            : 2 === e.type && 0 === n.type
            ? (this.z_ = this.z_.insert(t, { type: 0, doc: e.doc }))
            : 1 === e.type && 0 === n.type
            ? (this.z_ = this.z_.remove(t))
            : 1 === e.type && 2 === n.type
            ? (this.z_ = this.z_.insert(t, { type: 1, doc: n.doc }))
            : 0 === e.type && 1 === n.type
            ? (this.z_ = this.z_.insert(t, { type: 2, doc: e.doc }))
            : I();
        }
        j_() {
          const n = [];
          return (
            this.z_.inorderTraversal((e, t) => {
              n.push(t);
            }),
            n
          );
        }
      }
      class Mo {
        constructor(e, t, n, r, s, i, a, o, u) {
          (this.query = e),
            (this.docs = t),
            (this.oldDocs = n),
            (this.docChanges = r),
            (this.mutatedKeys = s),
            (this.fromCache = i),
            (this.syncStateChanged = a),
            (this.excludesMetadataChanges = o),
            (this.hasCachedResults = u);
        }
        static fromInitialDocuments(e, t, n, r, s) {
          const i = [];
          return (
            t.forEach((e) => {
              i.push({ type: 0, doc: e });
            }),
            new Mo(e, t, Lo.emptySet(t), i, n, r, !0, !1, s)
          );
        }
        get hasPendingWrites() {
          return !this.mutatedKeys.isEmpty();
        }
        isEqual(e) {
          if (
            !(
              this.fromCache === e.fromCache &&
              this.hasCachedResults === e.hasCachedResults &&
              this.syncStateChanged === e.syncStateChanged &&
              this.mutatedKeys.isEqual(e.mutatedKeys) &&
              tr(this.query, e.query) &&
              this.docs.isEqual(e.docs) &&
              this.oldDocs.isEqual(e.oldDocs)
            )
          )
            return !1;
          const t = this.docChanges,
            n = e.docChanges;
          if (t.length !== n.length) return !1;
          for (let e = 0; e < t.length; e++)
            if (t[e].type !== n[e].type || !t[e].doc.isEqual(n[e].doc))
              return !1;
          return !0;
        }
      }
      class Vo {
        constructor() {
          (this.H_ = void 0), (this.J_ = []);
        }
        Y_() {
          return this.J_.some((e) => e.Z_());
        }
      }
      class Fo {
        constructor() {
          (this.queries = Po()),
            (this.onlineState = "Unknown"),
            (this.X_ = new Set());
        }
        terminate() {
          {
            var e = this,
              n = new _(w.ABORTED, "Firestore shutting down");
            const t = e,
              r = t.queries;
            return (
              (t.queries = Po()),
              void r.forEach((e, t) => {
                for (const e of t.J_) e.onError(n);
              })
            );
          }
        }
      }
      function Po() {
        return new or((e) => nr(e), tr);
      }
      async function Uo(e, t) {
        const n = e;
        let r = 3;
        var s = t.query;
        let i = n.queries.get(s);
        i
          ? !i.Y_() && t.Z_() && (r = 2)
          : ((i = new Vo()), (r = t.Z_() ? 0 : 1));
        try {
          switch (r) {
            case 0:
              i.H_ = await n.onListen(s, !0);
              break;
            case 1:
              i.H_ = await n.onListen(s, !1);
              break;
            case 2:
              await n.onFirstRemoteStoreListen(s);
          }
        } catch (e) {
          const n = Ro(e, `Initialization of query '${rr(t.query)}' failed`);
          return void t.onError(n);
        }
        n.queries.set(s, i),
          i.J_.push(t),
          t.ea(n.onlineState),
          i.H_ && t.ta(i.H_) && qo(n);
      }
      async function Bo(e, t) {
        const n = e,
          r = t.query;
        let s = 3;
        const i = n.queries.get(r);
        if (i) {
          const e = i.J_.indexOf(t);
          0 <= e &&
            (i.J_.splice(e, 1),
            0 === i.J_.length
              ? (s = t.Z_() ? 0 : 1)
              : !i.Y_() && t.Z_() && (s = 2));
        }
        switch (s) {
          case 0:
            return n.queries.delete(r), n.onUnlisten(r, !0);
          case 1:
            return n.queries.delete(r), n.onUnlisten(r, !1);
          case 2:
            return n.onLastRemoteStoreUnlisten(r);
          default:
            return;
        }
      }
      function qo(e) {
        e.X_.forEach((e) => {
          e.next();
        });
      }
      se = { na: "default", Cache: "cache" };
      class jo {
        constructor(e, t, n) {
          (this.query = e),
            (this.ra = t),
            (this.ia = !1),
            (this.sa = null),
            (this.onlineState = "Unknown"),
            (this.options = n || {});
        }
        ta(e) {
          if (!this.options.includeMetadataChanges) {
            const t = [];
            for (const n of e.docChanges) 3 !== n.type && t.push(n);
            e = new Mo(
              e.query,
              e.docs,
              e.oldDocs,
              t,
              e.mutatedKeys,
              e.fromCache,
              e.syncStateChanged,
              !0,
              e.hasCachedResults
            );
          }
          let t = !1;
          return (
            this.ia
              ? this.oa(e) && (this.ra.next(e), (t = !0))
              : this._a(e, this.onlineState) && (this.aa(e), (t = !0)),
            (this.sa = e),
            t
          );
        }
        onError(e) {
          this.ra.error(e);
        }
        ea(e) {
          this.onlineState = e;
          let t = !1;
          return (
            this.sa &&
              !this.ia &&
              this._a(this.sa, e) &&
              (this.aa(this.sa), (t = !0)),
            t
          );
        }
        _a(e, t) {
          return (
            !e.fromCache ||
            !this.Z_() ||
            ((!this.options.ua || !("Offline" !== t)) &&
              (!e.docs.isEmpty() || e.hasCachedResults || "Offline" === t))
          );
        }
        oa(e) {
          if (0 < e.docChanges.length) return !0;
          var t = this.sa && this.sa.hasPendingWrites !== e.hasPendingWrites;
          return (
            !(!e.syncStateChanged && !t) &&
            !0 === this.options.includeMetadataChanges
          );
        }
        aa(e) {
          (e = Mo.fromInitialDocuments(
            e.query,
            e.docs,
            e.mutatedKeys,
            e.fromCache,
            e.hasCachedResults
          )),
            (this.ia = !0),
            this.ra.next(e);
        }
        Z_() {
          return this.options.source !== se.Cache;
        }
      }
      class Go {
        constructor(e, t) {
          (this.ca = e), (this.byteLength = t);
        }
        la() {
          return "metadata" in this.ca;
        }
      }
      class zo {
        constructor(e) {
          this.serializer = e;
        }
        As(e) {
          return bs(this.serializer, e);
        }
        Rs(e) {
          return e.metadata.exists
            ? Ds(this.serializer, e.document, !1)
            : R.newNoDocument(
                this.As(e.metadata.name),
                this.Vs(e.metadata.readTime)
              );
        }
        Vs(e) {
          return F(e);
        }
      }
      class Ko {
        constructor(e, t, n) {
          (this.ha = e),
            (this.localStore = t),
            (this.serializer = n),
            (this.queries = []),
            (this.documents = []),
            (this.collectionGroups = new Set()),
            (this.progress = Qo(e));
        }
        Pa(e) {
          this.progress.bytesLoaded += e.byteLength;
          let t = this.progress.documentsLoaded;
          if (e.ca.namedQuery) this.queries.push(e.ca.namedQuery);
          else if (e.ca.documentMetadata) {
            this.documents.push({ metadata: e.ca.documentMetadata }),
              e.ca.documentMetadata.exists || ++t;
            const n = E.fromString(e.ca.documentMetadata.name);
            this.collectionGroups.add(n.get(n.length - 2));
          } else
            e.ca.document &&
              ((this.documents[this.documents.length - 1].document =
                e.ca.document),
              ++t);
          return t !== this.progress.documentsLoaded
            ? ((this.progress.documentsLoaded = t),
              Object.assign({}, this.progress))
            : null;
        }
        Ta(e) {
          const t = new Map(),
            n = new zo(this.serializer);
          for (const s of e)
            if (s.metadata.queries) {
              const e = n.As(s.metadata.name);
              for (const n of s.metadata.queries) {
                var r = (t.get(n) || M()).add(e);
                t.set(n, r);
              }
            }
          return t;
        }
        async complete() {
          const e = await (async function (e, t, n, r) {
              const s = e;
              let i = M(),
                a = ur;
              for (const e of n) {
                const n = t.As(e.metadata.name),
                  h = (e.document && (i = i.add(n)), t.Rs(e));
                h.setReadTime(t.Vs(e.metadata.readTime)), (a = a.insert(n, h));
              }
              const o = s.hs.newChangeBuffer({ trackRemovals: !0 }),
                u = await ka(s, Xn(Hn(E.fromString("__bundle__/docs/" + r))));
              return s.persistence.runTransaction(
                "Apply bundle documents",
                "readwrite",
                (t) =>
                  Na(t, o, a)
                    .next((e) => (o.apply(t), e))
                    .next((e) =>
                      s.Gr.removeMatchingKeysForTargetId(t, u.targetId)
                        .next(() => s.Gr.addMatchingKeys(t, i, u.targetId))
                        .next(() =>
                          s.localDocuments.getLocalViewOfDocuments(
                            t,
                            e.Is,
                            e.Es
                          )
                        )
                        .next(() => e.Is)
                    )
              );
            })(
              this.localStore,
              new zo(this.serializer),
              this.documents,
              this.ha.id
            ),
            t = this.Ta(this.documents);
          for (const e of this.queries)
            await (async function (e, n, r = M()) {
              const s = await ka(e, Xn(Ks(n.bundledQuery))),
                i = e;
              return i.persistence.runTransaction(
                "Save named query",
                "readwrite",
                (e) => {
                  var t = F(n.readTime);
                  return 0 <= s.snapshotVersion.compareTo(t)
                    ? i.jr.saveNamedQuery(e, n)
                    : ((t = s.withResumeToken(C.EMPTY_BYTE_STRING, t)),
                      (i.us = i.us.insert(t.targetId, t)),
                      i.Gr.updateTargetData(e, t)
                        .next(() =>
                          i.Gr.removeMatchingKeysForTargetId(e, s.targetId)
                        )
                        .next(() => i.Gr.addMatchingKeys(e, r, s.targetId))
                        .next(() => i.jr.saveNamedQuery(e, n)));
                }
              );
            })(this.localStore, e, t.get(e.name));
          return (
            (this.progress.taskState = "Success"),
            { progress: this.progress, Ia: this.collectionGroups, Ea: e }
          );
        }
      }
      function Qo(e) {
        return {
          taskState: "Running",
          documentsLoaded: 0,
          bytesLoaded: 0,
          totalDocuments: e.totalDocuments,
          totalBytes: e.totalBytes,
        };
      }
      class $o {
        constructor(e) {
          this.key = e;
        }
      }
      class Ho {
        constructor(e) {
          this.key = e;
        }
      }
      class Wo {
        constructor(e, t) {
          (this.query = e),
            (this.da = t),
            (this.Aa = null),
            (this.hasCachedResults = !1),
            (this.current = !1),
            (this.Ra = M()),
            (this.mutatedKeys = M()),
            (this.Va = ar(e)),
            (this.ma = new Lo(this.Va));
        }
        get fa() {
          return this.da;
        }
        ga(e, t) {
          const o = t ? t.pa : new Oo(),
            u = (t || this).ma;
          let h = (t || this).mutatedKeys,
            c = u,
            l = !1;
          const d =
              "F" === this.query.limitType && u.size === this.query.limit
                ? u.last()
                : null,
            f =
              "L" === this.query.limitType && u.size === this.query.limit
                ? u.first()
                : null;
          if (
            (e.inorderTraversal((e, t) => {
              const n = u.get(e),
                r = sr(this.query, t) ? t : null,
                s = !!n && this.mutatedKeys.has(n.key),
                i =
                  !!r &&
                  (r.hasLocalMutations ||
                    (this.mutatedKeys.has(r.key) && r.hasCommittedMutations));
              let a = !1;
              n && r
                ? n.data.isEqual(r.data)
                  ? s !== i && (o.track({ type: 3, doc: r }), (a = !0))
                  : this.ya(n, r) ||
                    (o.track({ type: 2, doc: r }),
                    (a = !0),
                    ((d && 0 < this.Va(r, d)) || (f && this.Va(r, f) < 0)) &&
                      (l = !0))
                : !n && r
                ? (o.track({ type: 0, doc: r }), (a = !0))
                : n &&
                  !r &&
                  (o.track({ type: 1, doc: n }),
                  (a = !0),
                  (d || f) && (l = !0)),
                a &&
                  (h = r
                    ? ((c = c.add(r)), i ? h.add(e) : h.delete(e))
                    : ((c = c.delete(e)), h.delete(e)));
            }),
            null !== this.query.limit)
          )
            for (; c.size > this.query.limit; ) {
              const e = "F" === this.query.limitType ? c.last() : c.first();
              (c = c.delete(e.key)),
                (h = h.delete(e.key)),
                o.track({ type: 1, doc: e });
            }
          return { ma: c, pa: o, ss: l, mutatedKeys: h };
        }
        ya(e, t) {
          return (
            e.hasLocalMutations &&
            t.hasCommittedMutations &&
            !t.hasLocalMutations
          );
        }
        applyChanges(e, t, n, r) {
          var s = this.ma;
          (this.ma = e.ma), (this.mutatedKeys = e.mutatedKeys);
          const i = e.pa.j_();
          i.sort(
            (e, t) =>
              (function (e, t) {
                var n = (e) => {
                  switch (e) {
                    case 0:
                      return 1;
                    case 2:
                    case 3:
                      return 2;
                    case 1:
                      return 0;
                    default:
                      return I();
                  }
                };
                return n(e) - n(t);
              })(e.type, t.type) || this.Va(e.doc, t.doc)
          ),
            this.wa(n),
            (r = null != r && r);
          var t = t && !r ? this.Sa() : [],
            r = 0 === this.Ra.size && this.current && !r ? 1 : 0,
            a = r !== this.Aa;
          return (
            (this.Aa = r),
            0 !== i.length || a
              ? {
                  snapshot: new Mo(
                    this.query,
                    e.ma,
                    s,
                    i,
                    e.mutatedKeys,
                    0 == r,
                    a,
                    !1,
                    !!n && 0 < n.resumeToken.approximateByteSize()
                  ),
                  ba: t,
                }
              : { ba: t }
          );
        }
        ea(e) {
          return this.current && "Offline" === e
            ? ((this.current = !1),
              this.applyChanges(
                {
                  ma: this.ma,
                  pa: new Oo(),
                  mutatedKeys: this.mutatedKeys,
                  ss: !1,
                },
                !1
              ))
            : { ba: [] };
        }
        Da(e) {
          return (
            !this.da.has(e) &&
            !!this.ma.has(e) &&
            !this.ma.get(e).hasLocalMutations
          );
        }
        wa(e) {
          e &&
            (e.addedDocuments.forEach((e) => (this.da = this.da.add(e))),
            e.modifiedDocuments.forEach((e) => {}),
            e.removedDocuments.forEach((e) => (this.da = this.da.delete(e))),
            (this.current = e.current));
        }
        Sa() {
          if (!this.current) return [];
          const t = this.Ra,
            n =
              ((this.Ra = M()),
              this.ma.forEach((e) => {
                this.Da(e.key) && (this.Ra = this.Ra.add(e.key));
              }),
              []);
          return (
            t.forEach((e) => {
              this.Ra.has(e) || n.push(new Ho(e));
            }),
            this.Ra.forEach((e) => {
              t.has(e) || n.push(new $o(e));
            }),
            n
          );
        }
        va(e) {
          (this.da = e.ds), (this.Ra = M());
          e = this.ga(e.documents);
          return this.applyChanges(e, !0);
        }
        Ca() {
          return Mo.fromInitialDocuments(
            this.query,
            this.ma,
            this.mutatedKeys,
            0 === this.Aa,
            this.hasCachedResults
          );
        }
      }
      class Jo {
        constructor(e, t, n) {
          (this.query = e), (this.targetId = t), (this.view = n);
        }
      }
      class Yo {
        constructor(e) {
          (this.key = e), (this.Fa = !1);
        }
      }
      class Xo {
        constructor(e, t, n, r, s, i) {
          (this.localStore = e),
            (this.remoteStore = t),
            (this.eventManager = n),
            (this.sharedClientState = r),
            (this.currentUser = s),
            (this.maxConcurrentLimboResolutions = i),
            (this.Ma = {}),
            (this.xa = new or((e) => nr(e), tr)),
            (this.Oa = new Map()),
            (this.Na = new Set()),
            (this.La = new D(S.comparator)),
            (this.Ba = new Map()),
            (this.ka = new oa()),
            (this.qa = {}),
            (this.Qa = new Map()),
            (this.Ka = Mi.Qn()),
            (this.onlineState = "Unknown"),
            (this.$a = void 0);
        }
        get isPrimaryClient() {
          return !0 === this.$a;
        }
      }
      async function Zo(e, t, n, r) {
        var s = await ka(e.localStore, Xn(t)),
          i = s.targetId,
          a = e.sharedClientState.addLocalQueryTarget(i, n);
        let o;
        return (
          r && (o = await eu(e, t, i, "current" === a, s.resumeToken)),
          e.isPrimaryClient && n && go(e.remoteStore, s),
          o
        );
      }
      async function eu(n, e, t, r, s) {
        n.Ua = (e, i, t) =>
          (async function (e, t, n) {
            let r = t.view.ga(i);
            r.ss &&
              (r = await La(e.localStore, t.query, !1).then(
                ({ documents: e }) => t.view.ga(e, r)
              ));
            var s = n && n.targetChanges.get(t.targetId),
              n = n && null != n.targetMismatches.get(t.targetId),
              n = t.view.applyChanges(r, e.isPrimaryClient, s, n);
            return ou(e, t.targetId, n.ba), n.snapshot;
          })(n, e, t);
        const i = await La(n.localStore, e, !0),
          a = new Wo(e, i.ds),
          o = a.ga(i.documents),
          u = ns.createSynthesizedTargetChangeForCurrentChange(
            t,
            r && "Offline" !== n.onlineState,
            s
          ),
          h = a.applyChanges(o, n.isPrimaryClient, u);
        ou(n, t, h.ba);
        r = new Jo(e, t, a);
        return (
          n.xa.set(e, r),
          n.Oa.has(t) ? n.Oa.get(t).push(e) : n.Oa.set(t, [e]),
          h.snapshot
        );
      }
      async function tu(e, t) {
        const r = e;
        try {
          const e = await (function (e, h) {
            const c = e,
              l = h.snapshotVersion;
            let d = c.us;
            return c.persistence
              .runTransaction(
                "Apply remote event",
                "readwrite-primary",
                (o) => {
                  const e = c.hs.newChangeBuffer({ trackRemovals: !0 }),
                    u = ((d = c.us), []);
                  h.targetChanges.forEach((t, n) => {
                    const r = d.get(n);
                    if (r) {
                      u.push(
                        c.Gr.removeMatchingKeys(o, t.removedDocuments, n).next(
                          () => c.Gr.addMatchingKeys(o, t.addedDocuments, n)
                        )
                      );
                      let e = r.withSequenceNumber(o.currentSequenceNumber);
                      var s, i, a;
                      null !== h.targetMismatches.get(n)
                        ? (e = e
                            .withResumeToken(C.EMPTY_BYTE_STRING, b.min())
                            .withLastLimboFreeSnapshotVersion(b.min()))
                        : 0 < t.resumeToken.approximateByteSize() &&
                          (e = e.withResumeToken(t.resumeToken, l)),
                        (d = d.insert(n, e)),
                        (s = r),
                        (i = e),
                        (a = t),
                        (0 !== s.resumeToken.approximateByteSize() &&
                          !(
                            3e8 <=
                              i.snapshotVersion.toMicroseconds() -
                                s.snapshotVersion.toMicroseconds() ||
                            0 <
                              a.addedDocuments.size +
                                a.modifiedDocuments.size +
                                a.removedDocuments.size
                          )) ||
                          u.push(c.Gr.updateTargetData(o, e));
                    }
                  });
                  let t = ur,
                    n = M();
                  if (
                    (h.documentUpdates.forEach((e) => {
                      h.resolvedLimboDocuments.has(e) &&
                        u.push(
                          c.persistence.referenceDelegate.updateLimboDocument(
                            o,
                            e
                          )
                        );
                    }),
                    u.push(
                      Na(o, e, h.documentUpdates).next((e) => {
                        (t = e.Is), (n = e.Es);
                      })
                    ),
                    !l.isEqual(b.min()))
                  ) {
                    const h = c.Gr.getLastRemoteSnapshotVersion(o).next((e) =>
                      c.Gr.setTargetsMetadata(o, o.currentSequenceNumber, l)
                    );
                    u.push(h);
                  }
                  return x
                    .waitFor(u)
                    .next(() => e.apply(o))
                    .next(() =>
                      c.localDocuments.getLocalViewOfDocuments(o, t, n)
                    )
                    .next(() => t);
                }
              )
              .then((e) => ((c.us = d), e));
          })(r.localStore, t);
          t.targetChanges.forEach((e, t) => {
            const n = r.Ba.get(t);
            n &&
              (p(
                e.addedDocuments.size +
                  e.modifiedDocuments.size +
                  e.removedDocuments.size <=
                  1
              ),
              0 < e.addedDocuments.size
                ? (n.Fa = !0)
                : 0 < e.modifiedDocuments.size
                ? p(n.Fa)
                : 0 < e.removedDocuments.size && (p(n.Fa), (n.Fa = !1)));
          }),
            await hu(r, e, t);
        } catch (e) {
          await Me(e);
        }
      }
      function nu(n, r, e) {
        const t = n;
        if ((t.isPrimaryClient && 0 === e) || (!t.isPrimaryClient && 1 === e)) {
          const n = [];
          t.xa.forEach((e, t) => {
            t = t.view.ea(r);
            t.snapshot && n.push(t.snapshot);
          });
          {
            e = t.eventManager;
            var s = r;
            const i = e;
            i.onlineState = s;
            let n = !1;
            i.queries.forEach((e, t) => {
              for (const e of t.J_) e.ea(s) && (n = !0);
            }),
              n && qo(i);
          }
          n.length && t.Ma.R_(n),
            (t.onlineState = r),
            t.isPrimaryClient && t.sharedClientState.setOnlineState(r);
        }
      }
      function ru(e, t) {
        (e.Qa.get(t) || []).forEach((e) => {
          e.resolve();
        }),
          e.Qa.delete(t);
      }
      function su(e, t, n) {
        const r = e;
        let s = r.qa[r.currentUser.toKey()];
        if (s) {
          const e = s.get(t);
          e && (n ? e.reject(n) : e.resolve(), (s = s.remove(t))),
            (r.qa[r.currentUser.toKey()] = s);
        }
      }
      function iu(t, e, n = null) {
        t.sharedClientState.removeLocalQueryTarget(e);
        for (const r of t.Oa.get(e)) t.xa.delete(r), n && t.Ma.Wa(r, n);
        t.Oa.delete(e),
          t.isPrimaryClient &&
            t.ka.yr(e).forEach((e) => {
              t.ka.containsKey(e) || au(t, e);
            });
      }
      function au(e, t) {
        e.Na.delete(t.path.canonicalString());
        var n = e.La.get(t);
        null !== n &&
          (mo(e.remoteStore, n),
          (e.La = e.La.remove(t)),
          e.Ba.delete(n),
          uu(e));
      }
      function ou(e, t, n) {
        for (const s of n)
          if (s instanceof $o) {
            e.ka.addReference(s.key, t);
            {
              var r = e;
              const i = s.key,
                a = i.path.canonicalString();
              r.La.get(i) ||
                r.Na.has(a) ||
                (m("SyncEngine", "New document in limbo: " + i),
                r.Na.add(a),
                uu(r));
            }
          } else
            s instanceof Ho
              ? (m("SyncEngine", "Document no longer in limbo: " + s.key),
                e.ka.removeReference(s.key, t),
                e.ka.containsKey(s.key) || au(e, s.key))
              : I();
      }
      function uu(e) {
        for (; 0 < e.Na.size && e.La.size < e.maxConcurrentLimboResolutions; ) {
          var t = e.Na.values().next().value,
            n = (e.Na.delete(t), new S(E.fromString(t))),
            t = e.Ka.next();
          e.Ba.set(t, new Yo(n)),
            (e.La = e.La.insert(n, t)),
            go(
              e.remoteStore,
              new Vs(Xn(Hn(n.path)), t, "TargetPurposeLimboResolution", He.oe)
            );
        }
      }
      async function hu(e, t, r) {
        const s = e,
          i = [],
          a = [],
          o = [];
        if (!s.xa.isEmpty()) {
          s.xa.forEach((e, n) => {
            o.push(
              s.Ua(n, t, r).then((e) => {
                var t;
                if ((e || r) && s.isPrimaryClient) {
                  const i = e
                    ? !e.fromCache
                    : null ==
                      (t = null == r ? void 0 : r.targetChanges.get(n.targetId))
                    ? void 0
                    : t.current;
                  s.sharedClientState.updateQueryState(
                    n.targetId,
                    i ? "current" : "not-current"
                  );
                }
                if (e) {
                  i.push(e);
                  const t = Ta.zi(n.targetId, e);
                  a.push(t);
                }
              })
            );
          }),
            await Promise.all(o),
            s.Ma.R_(i);
          {
            var n = s.localStore,
              u = a;
            const h = n;
            try {
              await h.persistence.runTransaction(
                "notifyLocalViewChanges",
                "readwrite",
                (n) =>
                  x.forEach(u, (t) =>
                    x
                      .forEach(t.Wi, (e) =>
                        h.persistence.referenceDelegate.addReference(
                          n,
                          t.targetId,
                          e
                        )
                      )
                      .next(() =>
                        x.forEach(t.Gi, (e) =>
                          h.persistence.referenceDelegate.removeReference(
                            n,
                            t.targetId,
                            e
                          )
                        )
                      )
                  )
              );
            } catch (n) {
              if (!qe(n)) throw n;
              m("LocalStore", "Failed to update sequence numbers: " + n);
            }
            for (const n of u) {
              const u = n.targetId;
              if (!n.fromCache) {
                const n = h.us.get(u),
                  c = n.snapshotVersion,
                  l = n.withLastLimboFreeSnapshotVersion(c);
                h.us = h.us.insert(u, l);
              }
            }
          }
        }
      }
      async function cu(t, n) {
        const r = t,
          s = [],
          i = [];
        for (const t of n) {
          let e;
          var a = r.Oa.get(t);
          if (a && 0 !== a.length) {
            e = await ka(r.localStore, Xn(a[0]));
            for (const t of a) {
              const n = r.xa.get(t),
                c =
                  ((o = n),
                  0,
                  (h = await La((u = r).localStore, o.query, !0)),
                  (h = o.view.va(h)),
                  u.isPrimaryClient && ou(u, o.targetId, h.ba),
                  await h);
              c.snapshot && i.push(c.snapshot);
            }
          } else {
            a = await Oa(r.localStore, t);
            (e = await ka(r.localStore, a)),
              await eu(r, lu(a), t, !1, e.resumeToken);
          }
          s.push(e);
        }
        var o, u, h;
        return r.Ma.R_(i), s;
      }
      function lu(e) {
        return $n(
          e.path,
          e.collectionGroup,
          e.orderBy,
          e.filters,
          e.limit,
          "F",
          e.startAt,
          e.endAt
        );
      }
      function du(e) {
        const t = e;
        return (
          (t.remoteStore.remoteSyncer.applyRemoteEvent = tu.bind(null, t)),
          (t.remoteStore.remoteSyncer.getRemoteKeysForTarget = function (e, t) {
            const n = e,
              r = n.Ba.get(t);
            if (r && r.Fa) return M().add(r.key);
            {
              let e = M();
              const r = n.Oa.get(t);
              if (!r) return e;
              for (const t of r) {
                const r = n.xa.get(t);
                e = e.unionWith(r.view.fa);
              }
              return e;
            }
          }.bind(null, t)),
          (t.remoteStore.remoteSyncer.rejectListen = async function (e, t, n) {
            const r = e,
              s =
                (r.sharedClientState.updateQueryState(t, "rejected", n),
                r.Ba.get(t)),
              i = s && s.key;
            if (i) {
              let e = new D(S.comparator);
              e = e.insert(i, R.newNoDocument(i, b.min()));
              const n = M().add(i),
                s = new ts(b.min(), new Map(), new D(T), e, n);
              await tu(r, s), (r.La = r.La.remove(i)), r.Ba.delete(t), uu(r);
            } else
              await Ra(r.localStore, t, !1)
                .then(() => iu(r, t, n))
                .catch(Me);
          }.bind(null, t)),
          (t.Ma.R_ = function (e, t) {
            const n = e;
            let r = !1;
            for (const e of t) {
              const t = e.query,
                s = n.queries.get(t);
              if (s) {
                for (const t of s.J_) t.ta(e) && (r = !0);
                s.H_ = e;
              }
            }
            r && qo(n);
          }.bind(null, t.eventManager)),
          (t.Ma.Wa = function (e, t, n) {
            const r = e,
              s = r.queries.get(t);
            if (s) for (const e of s.J_) e.onError(n);
            r.queries.delete(t);
          }.bind(null, t.eventManager)),
          t
        );
      }
      function fu(e) {
        const t = e;
        return (
          (t.remoteStore.remoteSyncer.applySuccessfulWrite = async function (
            e,
            t
          ) {
            const n = e,
              r = t.batch.batchId;
            try {
              const e = await (function (e, r) {
                const s = e;
                return s.persistence.runTransaction(
                  "Acknowledge batch",
                  "readwrite-primary",
                  (e) => {
                    const t = r.batch.keys(),
                      n = s.hs.newChangeBuffer({ trackRemovals: !0 });
                    return (function (e, t, r, s) {
                      const i = r.batch,
                        n = i.keys();
                      let a = x.resolve();
                      return (
                        n.forEach((n) => {
                          a = a
                            .next(() => s.getEntry(t, n))
                            .next((e) => {
                              var t = r.docVersions.get(n);
                              p(null !== t),
                                e.version.compareTo(t) < 0 &&
                                  (i.applyToRemoteDocument(e, r),
                                  e.isValidDocument() &&
                                    (e.setReadTime(r.commitVersion),
                                    s.addEntry(e)));
                            });
                        }),
                        a.next(() => e.mutationQueue.removeMutationBatch(t, i))
                      );
                    })(s, e, r, n)
                      .next(() => n.apply(e))
                      .next(() => s.mutationQueue.performConsistencyCheck(e))
                      .next(() =>
                        s.documentOverlayCache.removeOverlaysForBatchId(
                          e,
                          t,
                          r.batch.batchId
                        )
                      )
                      .next(() =>
                        s.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(
                          e,
                          (function (t) {
                            let n = M();
                            for (let e = 0; e < t.mutationResults.length; ++e)
                              0 <
                                t.mutationResults[e].transformResults.length &&
                                (n = n.add(t.batch.mutations[e].key));
                            return n;
                          })(r)
                        )
                      )
                      .next(() => s.localDocuments.getDocuments(e, t));
                  }
                );
              })(n.localStore, t);
              su(n, r, null),
                ru(n, r),
                n.sharedClientState.updateMutationState(r, "acknowledged"),
                await hu(n, e);
            } catch (e) {
              await Me(e);
            }
          }.bind(null, t)),
          (t.remoteStore.remoteSyncer.rejectFailedWrite = async function (
            e,
            t,
            n
          ) {
            const r = e;
            try {
              const e = await (function (e, r) {
                const s = e;
                return s.persistence.runTransaction(
                  "Reject batch",
                  "readwrite-primary",
                  (t) => {
                    let n;
                    return s.mutationQueue
                      .lookupMutationBatch(t, r)
                      .next(
                        (e) => (
                          p(null !== e),
                          (n = e.keys()),
                          s.mutationQueue.removeMutationBatch(t, e)
                        )
                      )
                      .next(() => s.mutationQueue.performConsistencyCheck(t))
                      .next(() =>
                        s.documentOverlayCache.removeOverlaysForBatchId(t, n, r)
                      )
                      .next(() =>
                        s.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(
                          t,
                          n
                        )
                      )
                      .next(() => s.localDocuments.getDocuments(t, n));
                  }
                );
              })(r.localStore, t);
              su(r, t, n),
                ru(r, t),
                r.sharedClientState.updateMutationState(t, "rejected", n),
                await hu(r, e);
            } catch (n) {
              await Me(n);
            }
          }.bind(null, t)),
          t
        );
      }
      class gu {
        constructor() {
          (this.kind = "memory"), (this.synchronizeTabs = !1);
        }
        async initialize(e) {
          (this.serializer = ro(e.databaseInfo.databaseId)),
            (this.sharedClientState = this.za(e)),
            (this.persistence = this.ja(e)),
            await this.persistence.start(),
            (this.localStore = this.Ha(e)),
            (this.gcScheduler = this.Ja(e, this.localStore)),
            (this.indexBackfillerScheduler = this.Ya(e, this.localStore));
        }
        Ja(e, t) {
          return null;
        }
        Ya(e, t) {
          return null;
        }
        Ha(e) {
          return Da(this.persistence, new Sa(), e.initialUser, this.serializer);
        }
        ja(e) {
          return new da(ga.ei, this.serializer);
        }
        za(e) {
          return new Qa();
        }
        async terminate() {
          var e;
          null != (e = this.gcScheduler) && e.stop(),
            null != (e = this.indexBackfillerScheduler) && e.stop(),
            this.sharedClientState.shutdown(),
            await this.persistence.shutdown();
        }
      }
      gu.provider = { build: () => new gu() };
      class mu extends gu {
        constructor(e) {
          super(), (this.cacheSizeBytes = e);
        }
        Ja(e, t) {
          p(this.persistence.referenceDelegate instanceof ma);
          var n = this.persistence.referenceDelegate.garbageCollector;
          return new ji(n, e.asyncQueue, t);
        }
        ja(e) {
          const t =
            void 0 !== this.cacheSizeBytes
              ? Di.withCacheSize(this.cacheSizeBytes)
              : Di.DEFAULT;
          return new da((e) => ma.ei(e, t), this.serializer);
        }
      }
      class pu extends gu {
        constructor(e, t, n) {
          super(),
            (this.Za = e),
            (this.cacheSizeBytes = t),
            (this.forceOwnership = n),
            (this.kind = "persistent"),
            (this.synchronizeTabs = !1);
        }
        async initialize(e) {
          await super.initialize(e),
            await this.Za.initialize(this, e),
            await fu(this.Za.syncEngine),
            await Eo(this.Za.remoteStore),
            await this.persistence.Si(
              () => (
                this.gcScheduler &&
                  !this.gcScheduler.started &&
                  this.gcScheduler.start(),
                this.indexBackfillerScheduler &&
                  !this.indexBackfillerScheduler.started &&
                  this.indexBackfillerScheduler.start(),
                Promise.resolve()
              )
            );
        }
        Ha(e) {
          return Da(this.persistence, new Sa(), e.initialUser, this.serializer);
        }
        Ja(e, t) {
          var n = this.persistence.referenceDelegate.garbageCollector;
          return new ji(n, e.asyncQueue, t);
        }
        Ya(e, t) {
          t = new $e(t, this.persistence);
          return new Qe(e.asyncQueue, t);
        }
        ja(e) {
          var t = Ia(e.databaseInfo.databaseId, e.databaseInfo.persistenceKey),
            n =
              void 0 !== this.cacheSizeBytes
                ? Di.withCacheSize(this.cacheSizeBytes)
                : Di.DEFAULT;
          return new wa(
            this.synchronizeTabs,
            t,
            e.clientId,
            n,
            e.asyncQueue,
            to(),
            no(),
            this.serializer,
            this.sharedClientState,
            !!this.forceOwnership
          );
        }
        za(e) {
          return new Qa();
        }
      }
      class yu extends pu {
        constructor(e, t) {
          super(e, t, !1),
            (this.Za = e),
            (this.cacheSizeBytes = t),
            (this.synchronizeTabs = !0);
        }
        async initialize(e) {
          await super.initialize(e);
          e = this.Za.syncEngine;
          this.sharedClientState instanceof Ka &&
            ((this.sharedClientState.syncEngine = {
              io: async function (e, t, n, r) {
                var s = await (function (e, n) {
                  const r = e,
                    s = r.mutationQueue;
                  return r.persistence.runTransaction(
                    "Lookup mutation documents",
                    "readonly",
                    (t) =>
                      s
                        .On(t, n)
                        .next((e) =>
                          e
                            ? r.localDocuments.getDocuments(t, e)
                            : x.resolve(null)
                        )
                  );
                })(e.localStore, t);
                null !== s
                  ? ("pending" === n
                      ? await Eo(e.remoteStore)
                      : "acknowledged" === n || "rejected" === n
                      ? (su(e, t, r || null),
                        ru(e, t),
                        e.localStore.mutationQueue.Ln(t))
                      : I(),
                    await hu(e, s))
                  : m(
                      "SyncEngine",
                      "Cannot apply mutation batch with id: " + t
                    );
              }.bind(null, e),
              so: async function (e, t, n, r) {
                const s = e;
                if (s.$a)
                  m(
                    "SyncEngine",
                    "Ignoring unexpected query state notification."
                  );
                else {
                  var i = s.Oa.get(t);
                  if (i && 0 < i.length)
                    switch (n) {
                      case "current":
                      case "not-current": {
                        const e = await Ma(s.localStore, ir(i[0])),
                          r = ts.createSynthesizedRemoteEventForCurrentChange(
                            t,
                            "current" === n,
                            C.EMPTY_BYTE_STRING
                          );
                        await hu(s, e, r);
                        break;
                      }
                      case "rejected":
                        await Ra(s.localStore, t, !0), iu(s, t, r);
                        break;
                      default:
                        I();
                    }
                }
              }.bind(null, e),
              oo: async function (e, t, n) {
                const r = du(e);
                if (r.$a) {
                  for (const e of t)
                    if (
                      r.Oa.has(e) &&
                      r.sharedClientState.isActiveQueryTarget(e)
                    )
                      m("SyncEngine", "Adding an already active target " + e);
                    else {
                      const t = await Oa(r.localStore, e),
                        n = await ka(r.localStore, t);
                      await eu(r, lu(t), n.targetId, !1, n.resumeToken),
                        go(r.remoteStore, n);
                    }
                  for (const e of n)
                    r.Oa.has(e) &&
                      (await Ra(r.localStore, e, !1)
                        .then(() => {
                          mo(r.remoteStore, e), iu(r, e);
                        })
                        .catch(Me));
                }
              }.bind(null, e),
              $i: function (e) {
                return e.localStore.persistence.$i();
              }.bind(null, e),
              ro: async function (e, t) {
                const n = e;
                return Ma(n.localStore, t).then((e) => hu(n, e));
              }.bind(null, e),
            }),
            await this.sharedClientState.start()),
            await this.persistence.Si(async (e) => {
              {
                var r = this.Za.syncEngine,
                  t = e;
                const s = r;
                if ((du(s), fu(s), !0 === t && !0 !== s.$a)) {
                  const r = s.sharedClientState.getAllActiveQueryTargets(),
                    t = await cu(s, r.toArray());
                  (s.$a = !0), await Ao(s.remoteStore, !0);
                  for (const r of t) go(s.remoteStore, r);
                } else if (!1 === t && !1 !== s.$a) {
                  const r = [];
                  let n = Promise.resolve();
                  s.Oa.forEach((e, t) => {
                    s.sharedClientState.isLocalQueryTarget(t)
                      ? r.push(t)
                      : (n = n.then(() => (iu(s, t), Ra(s.localStore, t, !0)))),
                      mo(s.remoteStore, t);
                  }),
                    await n,
                    await cu(s, r);
                  {
                    const i = s;
                    i.Ba.forEach((e, t) => {
                      mo(i.remoteStore, t);
                    }),
                      i.ka.wr(),
                      (i.Ba = new Map()),
                      (i.La = new D(S.comparator));
                  }
                  (s.$a = !1), await Ao(s.remoteStore, !1);
                }
              }
              await 0,
                this.gcScheduler &&
                  (e && !this.gcScheduler.started
                    ? this.gcScheduler.start()
                    : e || this.gcScheduler.stop()),
                this.indexBackfillerScheduler &&
                  (e && !this.indexBackfillerScheduler.started
                    ? this.indexBackfillerScheduler.start()
                    : e || this.indexBackfillerScheduler.stop());
            });
        }
        za(e) {
          var t = to();
          if (!Ka.p(t))
            throw new _(
              w.UNIMPLEMENTED,
              "IndexedDB persistence is only available on platforms that support LocalStorage."
            );
          var n = Ia(e.databaseInfo.databaseId, e.databaseInfo.persistenceKey);
          return new Ka(t, e.asyncQueue, n, e.clientId, e.initialUser);
        }
      }
      class vu {
        async initialize(e, t) {
          this.localStore ||
            ((this.localStore = e.localStore),
            (this.sharedClientState = e.sharedClientState),
            (this.datastore = this.createDatastore(t)),
            (this.remoteStore = this.createRemoteStore(t)),
            (this.eventManager = this.createEventManager(t)),
            (this.syncEngine = this.createSyncEngine(t, !e.synchronizeTabs)),
            (this.sharedClientState.onlineStateHandler = (e) =>
              nu(this.syncEngine, e, 1)),
            (this.remoteStore.remoteSyncer.handleCredentialChange =
              async function (e, t) {
                const n = e;
                var r;
                n.currentUser.isEqual(t) ||
                  (m("SyncEngine", "User change. New user:", t.toKey()),
                  (r = await Aa(n.localStore, t)),
                  (n.currentUser = t),
                  (e = n),
                  e.Qa.forEach((e) => {
                    e.forEach((e) => {
                      e.reject(
                        new _(
                          w.CANCELLED,
                          "'waitForPendingWrites' promise is rejected due to a user change."
                        )
                      );
                    });
                  }),
                  e.Qa.clear(),
                  n.sharedClientState.handleUserChange(
                    t,
                    r.removedBatchIds,
                    r.addedBatchIds
                  ),
                  await hu(n, r.Ts));
              }.bind(null, this.syncEngine)),
            await Ao(this.remoteStore, this.syncEngine.isPrimaryClient));
        }
        createEventManager(e) {
          return new Fo();
        }
        createDatastore(e) {
          var t = ro(e.databaseInfo.databaseId),
            n = ((i = e.databaseInfo), new eo(i)),
            r = e.authCredentials,
            s = e.appCheckCredentials,
            i = n;
          return (e = t), new uo(r, s, i, e);
        }
        createRemoteStore(e) {
          return (
            (t = this.localStore),
            (n = this.datastore),
            (r = e.asyncQueue),
            (s = (e) => nu(this.syncEngine, e, 0)),
            (e = new (Ha.p() ? Ha : $a)()),
            new co(t, n, r, s, e)
          );
          var t, n, r, s;
        }
        createSyncEngine(e, t) {
          {
            var n = this.localStore,
              r = this.remoteStore,
              s = this.eventManager,
              i = this.sharedClientState,
              a = e.initialUser;
            e = e.maxConcurrentLimboResolutions;
            const o = new Xo(n, r, s, i, a, e);
            return t && (o.$a = !0), o;
          }
        }
        async terminate() {
          {
            var e = this.remoteStore;
            const t = e;
            m("RemoteStore", "RemoteStore shutting down."),
              t.k_.add(5),
              await fo(t),
              t.Q_.shutdown(),
              t.K_.set("Unknown");
          }
          await 0,
            null != (e = this.datastore) && e.terminate(),
            null != (e = this.eventManager) && e.terminate();
        }
      }
      function wu(t, n = 10240) {
        let r = 0;
        return {
          async read() {
            var e;
            return r < t.byteLength
              ? ((e = { value: t.slice(r, r + n), done: !1 }), (r += n), e)
              : { done: !0 };
          },
          async cancel() {},
          releaseLock() {},
          closed: Promise.resolve(),
        };
      }
      vu.provider = { build: () => new vu() };
      class _u {
        constructor(e) {
          (this.observer = e), (this.muted = !1);
        }
        next(e) {
          this.muted || (this.observer.next && this.Xa(this.observer.next, e));
        }
        error(e) {
          this.muted ||
            (this.observer.error
              ? this.Xa(this.observer.error, e)
              : d("Uncaught Error in snapshot listener:", e.toString()));
        }
        eu() {
          this.muted = !0;
        }
        Xa(e, t) {
          setTimeout(() => {
            this.muted || e(t);
          }, 0);
        }
      }
      class bu {
        constructor(e, t) {
          (this.tu = e),
            (this.serializer = t),
            (this.metadata = new f()),
            (this.buffer = new Uint8Array()),
            (this.nu = new TextDecoder("utf-8")),
            this.ru().then(
              (e) => {
                e && e.la()
                  ? this.metadata.resolve(e.ca.metadata)
                  : this.metadata.reject(
                      new Error(
                        `The first element of the bundle is not a metadata, it is
             ` + JSON.stringify(null == e ? void 0 : e.ca)
                      )
                    );
              },
              (e) => this.metadata.reject(e)
            );
        }
        close() {
          return this.tu.cancel();
        }
        async getMetadata() {
          return this.metadata.promise;
        }
        async Ga() {
          return await this.getMetadata(), this.ru();
        }
        async ru() {
          var e = await this.iu();
          if (null === e) return null;
          var t = this.nu.decode(e),
            n = Number(t);
          return (
            isNaN(n) && this.su(`length string (${t}) is not valid number`),
            (t = await this.ou(n)),
            new Go(JSON.parse(t), e.length + n)
          );
        }
        _u() {
          return this.buffer.findIndex((e) => e === "{".charCodeAt(0));
        }
        async iu() {
          for (; this._u() < 0 && !(await this.au()); );
          if (0 === this.buffer.length) return null;
          var e = this._u(),
            t =
              (e < 0 &&
                this.su(
                  "Reached the end of bundle when a length string is expected."
                ),
              this.buffer.slice(0, e));
          return (this.buffer = this.buffer.slice(e)), t;
        }
        async ou(e) {
          for (; this.buffer.length < e; )
            (await this.au()) &&
              this.su("Reached the end of bundle when more is expected.");
          var t = this.nu.decode(this.buffer.slice(0, e));
          return (this.buffer = this.buffer.slice(e)), t;
        }
        su(e) {
          throw (this.tu.cancel(), new Error("Invalid bundle format: " + e));
        }
        async au() {
          var e = await this.tu.read();
          if (!e.done) {
            const t = new Uint8Array(this.buffer.length + e.value.length);
            t.set(this.buffer),
              t.set(e.value, this.buffer.length),
              (this.buffer = t);
          }
          return e.done;
        }
      }
      class Iu {
        constructor(e) {
          (this.datastore = e),
            (this.readVersions = new Map()),
            (this.mutations = []),
            (this.committed = !1),
            (this.lastTransactionError = null),
            (this.writtenDocs = new Set());
        }
        async lookup(e) {
          if ((this.ensureCommitNotCalled(), 0 < this.mutations.length))
            throw (
              ((this.lastTransactionError = new _(
                w.INVALID_ARGUMENT,
                "Firestore transactions require all reads to be executed before all writes."
              )),
              this.lastTransactionError)
            );
          const t = await (async function (e, t) {
            const o = e,
              n = { documents: t.map((e) => _s(o.serializer, e)) },
              r = await o.ko(
                "BatchGetDocuments",
                o.serializer.databaseId,
                E.emptyPath(),
                n,
                t.length
              ),
              u = new Map(),
              s =
                (r.forEach((e) => {
                  a = o.serializer;
                  const t =
                    "found" in e
                      ? ((n = a),
                        p(!!(r = e).found),
                        r.found.name,
                        r.found.updateTime,
                        (n = bs(n, r.found.name)),
                        (s = F(r.found.updateTime)),
                        (i = r.found.createTime
                          ? F(r.found.createTime)
                          : b.min()),
                        (r = new k({ mapValue: { fields: r.found.fields } })),
                        R.newFoundDocument(n, s, i, r))
                      : "missing" in e
                      ? (function (e, t) {
                          p(!!t.missing), p(!!t.readTime);
                          (e = bs(e, t.missing)), (t = F(t.readTime));
                          return R.newNoDocument(e, t);
                        })(a, e)
                      : I();
                  var n, r, s, i, a;
                  u.set(t.key.toString(), t);
                }),
                []);
            return (
              t.forEach((e) => {
                e = u.get(e.toString());
                p(!!e), s.push(e);
              }),
              s
            );
          })(this.datastore, e);
          return t.forEach((e) => this.recordVersion(e)), t;
        }
        set(e, t) {
          this.write(t.toMutation(e, this.precondition(e))),
            this.writtenDocs.add(e.toString());
        }
        update(e, t) {
          try {
            this.write(t.toMutation(e, this.preconditionForUpdate(e)));
          } catch (e) {
            this.lastTransactionError = e;
          }
          this.writtenDocs.add(e.toString());
        }
        delete(e) {
          this.write(new qr(e, this.precondition(e))),
            this.writtenDocs.add(e.toString());
        }
        async commit() {
          if ((this.ensureCommitNotCalled(), this.lastTransactionError))
            throw this.lastTransactionError;
          const t = this.readVersions;
          this.mutations.forEach((e) => {
            t.delete(e.key.toString());
          }),
            t.forEach((e, t) => {
              t = S.fromPath(t);
              this.mutations.push(new jr(t, this.precondition(t)));
            });
          {
            var e = this.datastore,
              n = this.mutations;
            const r = e,
              s = { writes: n.map((e) => As(r.serializer, e)) };
            await r.Oo("Commit", r.serializer.databaseId, E.emptyPath(), s);
          }
          await 0, (this.committed = !0);
        }
        recordVersion(e) {
          let t;
          if (e.isFoundDocument()) t = e.version;
          else {
            if (!e.isNoDocument()) throw I();
            t = b.min();
          }
          var n = this.readVersions.get(e.key.toString());
          if (n) {
            if (!t.isEqual(n))
              throw new _(
                w.ABORTED,
                "Document version changed between two reads."
              );
          } else this.readVersions.set(e.key.toString(), t);
        }
        precondition(e) {
          const t = this.readVersions.get(e.toString());
          return !this.writtenDocs.has(e.toString()) && t
            ? t.isEqual(b.min())
              ? V.exists(!1)
              : V.updateTime(t)
            : V.none();
        }
        preconditionForUpdate(e) {
          const t = this.readVersions.get(e.toString());
          if (this.writtenDocs.has(e.toString()) || !t) return V.exists(!0);
          if (t.isEqual(b.min()))
            throw new _(
              w.INVALID_ARGUMENT,
              "Can't update a document that doesn't exist."
            );
          return V.updateTime(t);
        }
        write(e) {
          this.ensureCommitNotCalled(), this.mutations.push(e);
        }
        ensureCommitNotCalled() {}
      }
      class Tu {
        constructor(e, t, n, r, s) {
          (this.asyncQueue = e),
            (this.datastore = t),
            (this.options = n),
            (this.updateFunction = r),
            (this.deferred = s),
            (this.uu = n.maxAttempts),
            (this.r_ = new so(this.asyncQueue, "transaction_retry"));
        }
        cu() {
          --this.uu, this.lu();
        }
        lu() {
          this.r_.jo(async () => {
            const t = new Iu(this.datastore),
              e = this.hu(t);
            e &&
              e
                .then((e) => {
                  this.asyncQueue.enqueueAndForget(() =>
                    t
                      .commit()
                      .then(() => {
                        this.deferred.resolve(e);
                      })
                      .catch((e) => {
                        this.Pu(e);
                      })
                  );
                })
                .catch((e) => {
                  this.Pu(e);
                });
          });
        }
        hu(e) {
          try {
            var t = this.updateFunction(e);
            return !We(t) && t.catch && t.then
              ? t
              : (this.deferred.reject(
                  Error("Transaction callback must return a Promise")
                ),
                null);
          } catch (e) {
            return this.deferred.reject(e), null;
          }
        }
        Pu(e) {
          0 < this.uu && this.Tu(e)
            ? (--this.uu,
              this.asyncQueue.enqueueAndForget(
                () => (this.lu(), Promise.resolve())
              ))
            : this.deferred.reject(e);
        }
        Tu(e) {
          if ("FirebaseError" !== e.name) return !1;
          e = e.code;
          return (
            "aborted" === e ||
            "failed-precondition" === e ||
            "already-exists" === e ||
            !$r(e)
          );
        }
      }
      class Eu {
        constructor(e, t, n, r, s) {
          (this.authCredentials = e),
            (this.appCheckCredentials = t),
            (this.asyncQueue = n),
            (this.databaseInfo = r),
            (this.user = o.UNAUTHENTICATED),
            (this.clientId = we.newId()),
            (this.authCredentialListener = () => Promise.resolve()),
            (this.appCheckCredentialListener = () => Promise.resolve()),
            (this._uninitializedComponentsProvider = s),
            this.authCredentials.start(n, async (e) => {
              m("FirestoreClient", "Received user=", e.uid),
                await this.authCredentialListener(e),
                (this.user = e);
            }),
            this.appCheckCredentials.start(
              n,
              (e) => (
                m("FirestoreClient", "Received new app check token=", e),
                this.appCheckCredentialListener(e, this.user)
              )
            );
        }
        get configuration() {
          return {
            asyncQueue: this.asyncQueue,
            databaseInfo: this.databaseInfo,
            clientId: this.clientId,
            authCredentials: this.authCredentials,
            appCheckCredentials: this.appCheckCredentials,
            initialUser: this.user,
            maxConcurrentLimboResolutions: 100,
          };
        }
        setCredentialChangeListener(e) {
          this.authCredentialListener = e;
        }
        setAppCheckTokenChangeListener(e) {
          this.appCheckCredentialListener = e;
        }
        terminate() {
          this.asyncQueue.enterRestrictedMode();
          const n = new f();
          return (
            this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async () => {
              try {
                this._onlineComponents &&
                  (await this._onlineComponents.terminate()),
                  this._offlineComponents &&
                    (await this._offlineComponents.terminate()),
                  this.authCredentials.shutdown(),
                  this.appCheckCredentials.shutdown(),
                  n.resolve();
              } catch (e) {
                var t = Ro(e, "Failed to shutdown persistence");
                n.reject(t);
              }
            }),
            n.promise
          );
        }
      }
      async function Su(e, t) {
        e.asyncQueue.verifyOperationInProgress(),
          m("FirestoreClient", "Initializing OfflineComponentProvider");
        var n = e.configuration;
        await t.initialize(n);
        let r = n.initialUser;
        e.setCredentialChangeListener(async (e) => {
          r.isEqual(e) || (await Aa(t.localStore, e), (r = e));
        }),
          t.persistence.setDatabaseDeletedListener(() => e.terminate()),
          (e._offlineComponents = t);
      }
      async function xu(e, n) {
        e.asyncQueue.verifyOperationInProgress();
        var t = await Du(e);
        m("FirestoreClient", "Initializing OnlineComponentProvider"),
          await n.initialize(t, e.configuration),
          e.setCredentialChangeListener((e) => Do(n.remoteStore, e)),
          e.setAppCheckTokenChangeListener((e, t) => Do(n.remoteStore, t)),
          (e._onlineComponents = n);
      }
      async function Du(t) {
        if (!t._offlineComponents)
          if (t._uninitializedComponentsProvider) {
            m(
              "FirestoreClient",
              "Using user provided OfflineComponentProvider"
            );
            try {
              await Su(t, t._uninitializedComponentsProvider._offline);
            } catch (e) {
              var n = e;
              if (
                !("FirebaseError" === (r = n).name
                  ? r.code === w.FAILED_PRECONDITION ||
                    r.code === w.UNIMPLEMENTED
                  : !(
                      "undefined" != typeof DOMException &&
                      r instanceof DOMException
                    ) ||
                    22 === r.code ||
                    20 === r.code ||
                    11 === r.code)
              )
                throw n;
              he(
                "Error using user provided cache. Falling back to memory cache: " +
                  n
              ),
                await Su(t, new gu());
            }
          } else
            m("FirestoreClient", "Using default OfflineComponentProvider"),
              await Su(t, new mu(void 0));
        var r;
        return t._offlineComponents;
      }
      async function Au(e) {
        return (
          e._onlineComponents ||
            (e._uninitializedComponentsProvider
              ? (m(
                  "FirestoreClient",
                  "Using user provided OnlineComponentProvider"
                ),
                await xu(e, e._uninitializedComponentsProvider._online))
              : (m("FirestoreClient", "Using default OnlineComponentProvider"),
                await xu(e, new vu()))),
          e._onlineComponents
        );
      }
      function Cu(e) {
        return Du(e).then((e) => e.persistence);
      }
      function Nu(e) {
        return Du(e).then((e) => e.localStore);
      }
      function ku(e) {
        return Au(e).then((e) => e.remoteStore);
      }
      function Ru(e) {
        return Au(e).then((e) => e.syncEngine);
      }
      async function Lu(e) {
        const t = await Au(e),
          n = t.eventManager;
        return (
          (n.onListen = async function (e, t, n = !0) {
            const r = du(e);
            const s = r.xa.get(t);
            return s
              ? (r.sharedClientState.addLocalQueryTarget(s.targetId),
                s.view.Ca())
              : await Zo(r, t, n, !0);
          }.bind(null, t.syncEngine)),
          (n.onUnlisten = async function (e, t, n) {
            const r = e,
              s = r.xa.get(t),
              i = r.Oa.get(s.targetId);
            if (1 < i.length)
              return (
                r.Oa.set(
                  s.targetId,
                  i.filter((e) => !tr(e, t))
                ),
                void r.xa.delete(t)
              );
            r.isPrimaryClient
              ? (r.sharedClientState.removeLocalQueryTarget(s.targetId),
                r.sharedClientState.isActiveQueryTarget(s.targetId) ||
                  (await Ra(r.localStore, s.targetId, !1)
                    .then(() => {
                      r.sharedClientState.clearQueryState(s.targetId),
                        n && mo(r.remoteStore, s.targetId),
                        iu(r, s.targetId);
                    })
                    .catch(Me)))
              : (iu(r, s.targetId), await Ra(r.localStore, s.targetId, !0));
          }.bind(null, t.syncEngine)),
          (n.onFirstRemoteStoreListen = async function (e, t) {
            await Zo(du(e), t, !0, !1);
          }.bind(null, t.syncEngine)),
          (n.onLastRemoteStoreUnlisten = async function (e, t) {
            const n = e,
              r = n.xa.get(t),
              s = n.Oa.get(r.targetId);
            n.isPrimaryClient &&
              1 === s.length &&
              (n.sharedClientState.removeLocalQueryTarget(r.targetId),
              mo(n.remoteStore, r.targetId));
          }.bind(null, t.syncEngine)),
          n
        );
      }
      function Ou(e, t, h = {}) {
        const c = new f();
        return (
          e.asyncQueue.enqueueAndForget(async () => {
            {
              var n = await Lu(e),
                r = e.asyncQueue,
                s = t,
                i = h,
                a = c;
              const o = new _u({
                  next: (e) => {
                    o.eu(), r.enqueueAndForget(() => Bo(n, u));
                    var t = e.docs.has(s);
                    !t && e.fromCache
                      ? a.reject(
                          new _(
                            w.UNAVAILABLE,
                            "Failed to get document because the client is offline."
                          )
                        )
                      : t && e.fromCache && i && "server" === i.source
                      ? a.reject(
                          new _(
                            w.UNAVAILABLE,
                            'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)'
                          )
                        )
                      : a.resolve(e);
                  },
                  error: (e) => a.reject(e),
                }),
                u = new jo(Hn(s.path), o, {
                  includeMetadataChanges: !0,
                  ua: !0,
                });
              return Uo(n, u);
            }
          }),
          c.promise
        );
      }
      function Mu(o, u, h = {}) {
        const c = new f();
        return (
          o.asyncQueue.enqueueAndForget(async () => {
            {
              var t = await Lu(o),
                n = o.asyncQueue,
                e = u,
                r = h,
                s = c;
              const i = new _u({
                  next: (e) => {
                    i.eu(),
                      n.enqueueAndForget(() => Bo(t, a)),
                      e.fromCache && "server" === r.source
                        ? s.reject(
                            new _(
                              w.UNAVAILABLE,
                              'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)'
                            )
                          )
                        : s.resolve(e);
                  },
                  error: (e) => s.reject(e),
                }),
                a = new jo(e, i, { includeMetadataChanges: !0, ua: !0 });
              return Uo(t, a);
            }
          }),
          c.promise
        );
      }
      function Vu(r, e, t, s) {
        (e = ro(e)),
          (t = (function (e) {
            if (e instanceof Uint8Array) return wu(e, void 0);
            if (e instanceof ArrayBuffer) return wu(new Uint8Array(e), void 0);
            if (e instanceof ReadableStream) return e.getReader();
            throw new Error(
              "Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream"
            );
          })("string" == typeof t ? Wr().encode(t) : t));
        const i = new bu(t, e);
        r.asyncQueue.enqueueAndForget(async () => {
          {
            var e = await Ru(r),
              t = i;
            const n = e;
            return void (async function (t, n, r) {
              try {
                var s = await n.getMetadata();
                if (
                  await (function (e, t) {
                    const n = e,
                      r = F(t.createTime);
                    return n.persistence
                      .runTransaction("hasNewerBundle", "readonly", (e) =>
                        n.jr.getBundleMetadata(e, t.id)
                      )
                      .then((e) => !!e && 0 <= e.createTime.compareTo(r));
                  })(t.localStore, s)
                )
                  return (
                    await n.close(),
                    r._completeWith({
                      taskState: "Success",
                      documentsLoaded: s.totalDocuments,
                      bytesLoaded: s.totalBytes,
                      totalDocuments: s.totalDocuments,
                      totalBytes: s.totalBytes,
                    }),
                    Promise.resolve(new Set())
                  );
                r._updateProgress(Qo(s));
                const a = new Ko(s, t.localStore, n.serializer);
                let e = await n.Ga();
                for (; e; ) {
                  const t = await a.Pa(e);
                  t && r._updateProgress(t), (e = await n.Ga());
                }
                var i = await a.complete();
                return (
                  await hu(t, i.Ea, void 0),
                  await (function (e, t) {
                    const n = e;
                    return n.persistence.runTransaction(
                      "Save bundle",
                      "readwrite",
                      (e) => n.jr.saveBundleMetadata(e, t)
                    );
                  })(t.localStore, s),
                  r._completeWith(i.progress),
                  Promise.resolve(i.Ia)
                );
              } catch (t) {
                return (
                  he("SyncEngine", "Loading bundle failed with " + t),
                  r._failWith(t),
                  Promise.resolve(new Set())
                );
              }
            })(n, t, s).then((e) => {
              n.sharedClientState.notifyBundleLoaded(e);
            });
          }
        });
      }
      function Fu(e) {
        const t = {};
        return (
          void 0 !== e.timeoutSeconds && (t.timeoutSeconds = e.timeoutSeconds),
          t
        );
      }
      const Pu = new Map();
      function Uu(e, t, n) {
        if (!n)
          throw new _(
            w.INVALID_ARGUMENT,
            `Function ${e}() cannot be called with an empty ${t}.`
          );
      }
      function Bu(e, t, n, r) {
        if (!0 === t && !0 === r)
          throw new _(
            w.INVALID_ARGUMENT,
            e + ` and ${n} cannot be used together.`
          );
      }
      function qu(e) {
        if (!S.isDocumentKey(e))
          throw new _(
            w.INVALID_ARGUMENT,
            `Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`
          );
      }
      function ju(e) {
        if (S.isDocumentKey(e))
          throw new _(
            w.INVALID_ARGUMENT,
            `Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`
          );
      }
      function Gu(e) {
        if (void 0 === e) return "undefined";
        if (null === e) return "null";
        if ("string" == typeof e)
          return (
            20 < e.length && (e = e.substring(0, 20) + "..."), JSON.stringify(e)
          );
        if ("number" == typeof e || "boolean" == typeof e) return "" + e;
        if ("object" != typeof e)
          return "function" == typeof e ? "a function" : I();
        if (e instanceof Array) return "an array";
        e = e.constructor ? e.constructor.name : null;
        return e ? `a custom ${e} object` : "an object";
      }
      function P(e, t) {
        if ((e = "_delegate" in e ? e._delegate : e) instanceof t) return e;
        if (t.name === e.constructor.name)
          throw new _(
            w.INVALID_ARGUMENT,
            "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?"
          );
        e = Gu(e);
        throw new _(
          w.INVALID_ARGUMENT,
          `Expected type '${t.name}', but it was: ` + e
        );
      }
      function zu(e, t) {
        if (t <= 0)
          throw new _(
            w.INVALID_ARGUMENT,
            `Function ${e}() requires a positive number, but it was: ${t}.`
          );
      }
      class Ku {
        constructor(e) {
          if (void 0 === e.host) {
            if (void 0 !== e.ssl)
              throw new _(
                w.INVALID_ARGUMENT,
                "Can't provide ssl option if host option is not set"
              );
            (this.host = "firestore.googleapis.com"), (this.ssl = !0);
          } else (this.host = e.host), (this.ssl = null == (t = e.ssl) || t);
          if (
            ((this.credentials = e.credentials),
            (this.ignoreUndefinedProperties = !!e.ignoreUndefinedProperties),
            (this.localCache = e.localCache),
            void 0 === e.cacheSizeBytes)
          )
            this.cacheSizeBytes = 41943040;
          else {
            if (-1 !== e.cacheSizeBytes && e.cacheSizeBytes < 1048576)
              throw new _(
                w.INVALID_ARGUMENT,
                "cacheSizeBytes must be at least 1048576"
              );
            this.cacheSizeBytes = e.cacheSizeBytes;
          }
          Bu(
            "experimentalForceLongPolling",
            e.experimentalForceLongPolling,
            "experimentalAutoDetectLongPolling",
            e.experimentalAutoDetectLongPolling
          ),
            (this.experimentalForceLongPolling =
              !!e.experimentalForceLongPolling),
            this.experimentalForceLongPolling
              ? (this.experimentalAutoDetectLongPolling = !1)
              : void 0 === e.experimentalAutoDetectLongPolling
              ? (this.experimentalAutoDetectLongPolling = !0)
              : (this.experimentalAutoDetectLongPolling =
                  !!e.experimentalAutoDetectLongPolling),
            (this.experimentalLongPollingOptions = Fu(
              null != (t = e.experimentalLongPollingOptions) ? t : {}
            ));
          var t = this.experimentalLongPollingOptions;
          if (void 0 !== t.timeoutSeconds) {
            if (isNaN(t.timeoutSeconds))
              throw new _(
                w.INVALID_ARGUMENT,
                `invalid long polling timeout: ${t.timeoutSeconds} (must not be NaN)`
              );
            if (t.timeoutSeconds < 5)
              throw new _(
                w.INVALID_ARGUMENT,
                `invalid long polling timeout: ${t.timeoutSeconds} (minimum allowed value is 5)`
              );
            if (30 < t.timeoutSeconds)
              throw new _(
                w.INVALID_ARGUMENT,
                `invalid long polling timeout: ${t.timeoutSeconds} (maximum allowed value is 30)`
              );
          }
          this.useFetchStreams = !!e.useFetchStreams;
        }
        isEqual(e) {
          return (
            this.host === e.host &&
            this.ssl === e.ssl &&
            this.credentials === e.credentials &&
            this.cacheSizeBytes === e.cacheSizeBytes &&
            this.experimentalForceLongPolling ===
              e.experimentalForceLongPolling &&
            this.experimentalAutoDetectLongPolling ===
              e.experimentalAutoDetectLongPolling &&
            ((t = this.experimentalLongPollingOptions),
            (n = e.experimentalLongPollingOptions),
            t.timeoutSeconds === n.timeoutSeconds) &&
            this.ignoreUndefinedProperties === e.ignoreUndefinedProperties &&
            this.useFetchStreams === e.useFetchStreams
          );
          var t, n;
        }
      }
      class Qu {
        constructor(e, t, n, r) {
          (this._authCredentials = e),
            (this._appCheckCredentials = t),
            (this._databaseId = n),
            (this._app = r),
            (this.type = "firestore-lite"),
            (this._persistenceKey = "(lite)"),
            (this._settings = new Ku({})),
            (this._settingsFrozen = !1),
            (this._terminateTask = "notTerminated");
        }
        get app() {
          if (this._app) return this._app;
          throw new _(
            w.FAILED_PRECONDITION,
            "Firestore was not initialized using the Firebase SDK. 'app' is not available"
          );
        }
        get _initialized() {
          return this._settingsFrozen;
        }
        get _terminated() {
          return "notTerminated" !== this._terminateTask;
        }
        _setSettings(e) {
          if (this._settingsFrozen)
            throw new _(
              w.FAILED_PRECONDITION,
              "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object."
            );
          (this._settings = new Ku(e)),
            void 0 !== e.credentials &&
              (this._authCredentials = (function (e) {
                if (!e) return new de();
                switch (e.type) {
                  case "firstParty":
                    return new pe(
                      e.sessionIndex || "0",
                      e.iamToken || null,
                      e.authTokenFactory || null
                    );
                  case "provider":
                    return e.client;
                  default:
                    throw new _(
                      w.INVALID_ARGUMENT,
                      "makeAuthCredentialsProvider failed due to invalid credential type"
                    );
                }
              })(e.credentials));
        }
        _getSettings() {
          return this._settings;
        }
        _freezeSettings() {
          return (this._settingsFrozen = !0), this._settings;
        }
        _delete() {
          return (
            "notTerminated" === this._terminateTask &&
              (this._terminateTask = this._terminate()),
            this._terminateTask
          );
        }
        async _restart() {
          "notTerminated" === this._terminateTask
            ? await this._terminate()
            : (this._terminateTask = "notTerminated");
        }
        toJSON() {
          return {
            app: this._app,
            databaseId: this._databaseId,
            settings: this._settings,
          };
        }
        _terminate() {
          {
            var e = this;
            const t = Pu.get(e);
            t &&
              (m("ComponentProvider", "Removing Datastore"),
              Pu.delete(e),
              t.terminate());
          }
          return Promise.resolve();
        }
      }
      class $u {
        constructor(e, t, n) {
          (this.converter = t),
            (this._query = n),
            (this.type = "query"),
            (this.firestore = e);
        }
        withConverter(e) {
          return new $u(this.firestore, e, this._query);
        }
      }
      class U {
        constructor(e, t, n) {
          (this.converter = t),
            (this._key = n),
            (this.type = "document"),
            (this.firestore = e);
        }
        get _path() {
          return this._key.path;
        }
        get id() {
          return this._key.path.lastSegment();
        }
        get path() {
          return this._key.path.canonicalString();
        }
        get parent() {
          return new Hu(
            this.firestore,
            this.converter,
            this._key.path.popLast()
          );
        }
        withConverter(e) {
          return new U(this.firestore, e, this._key);
        }
      }
      class Hu extends $u {
        constructor(e, t, n) {
          super(e, t, Hn(n)), (this._path = n), (this.type = "collection");
        }
        get id() {
          return this._query.path.lastSegment();
        }
        get path() {
          return this._query.path.canonicalString();
        }
        get parent() {
          const e = this._path.popLast();
          return e.isEmpty() ? null : new U(this.firestore, null, new S(e));
        }
        withConverter(e) {
          return new Hu(this.firestore, e, this._path);
        }
      }
      function Wu(e, t, ...n) {
        var r;
        if (((e = v(e)), Uu("collection", "path", t), e instanceof Qu))
          return ju((r = E.fromString(t, ...n))), new Hu(e, null, r);
        if (e instanceof U || e instanceof Hu)
          return (
            ju((r = e._path.child(E.fromString(t, ...n)))),
            new Hu(e.firestore, null, r)
          );
        throw new _(
          w.INVALID_ARGUMENT,
          "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore"
        );
      }
      function Ju(e, t, ...n) {
        var r;
        if (
          ((e = v(e)),
          Uu("doc", "path", (t = 1 === arguments.length ? we.newId() : t)),
          e instanceof Qu)
        )
          return qu((r = E.fromString(t, ...n))), new U(e, null, new S(r));
        if (e instanceof U || e instanceof Hu)
          return (
            qu((r = e._path.child(E.fromString(t, ...n)))),
            new U(e.firestore, e instanceof Hu ? e.converter : null, new S(r))
          );
        throw new _(
          w.INVALID_ARGUMENT,
          "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore"
        );
      }
      function Yu(e, t) {
        return (
          (e = v(e)),
          (t = v(t)),
          (e instanceof U || e instanceof Hu) &&
            (t instanceof U || t instanceof Hu) &&
            e.firestore === t.firestore &&
            e.path === t.path &&
            e.converter === t.converter
        );
      }
      function Xu(e, t) {
        return (
          (e = v(e)),
          (t = v(t)),
          e instanceof $u &&
            t instanceof $u &&
            e.firestore === t.firestore &&
            tr(e._query, t._query) &&
            e.converter === t.converter
        );
      }
      class Zu {
        constructor(e = Promise.resolve()) {
          (this.Iu = []),
            (this.Eu = !1),
            (this.du = []),
            (this.Au = null),
            (this.Ru = !1),
            (this.Vu = !1),
            (this.mu = []),
            (this.r_ = new so(this, "async_queue_retry")),
            (this.fu = () => {
              var e = no();
              e &&
                m(
                  "AsyncQueue",
                  "Visibility state changed to " + e.visibilityState
                ),
                this.r_.Jo();
            }),
            (this.gu = e);
          const t = no();
          t &&
            "function" == typeof t.addEventListener &&
            t.addEventListener("visibilitychange", this.fu);
        }
        get isShuttingDown() {
          return this.Eu;
        }
        enqueueAndForget(e) {
          this.enqueue(e);
        }
        enqueueAndForgetEvenWhileRestricted(e) {
          this.pu(), this.yu(e);
        }
        enterRestrictedMode(e) {
          if (!this.Eu) {
            (this.Eu = !0), (this.Vu = e || !1);
            const t = no();
            t &&
              "function" == typeof t.removeEventListener &&
              t.removeEventListener("visibilitychange", this.fu);
          }
        }
        enqueue(e) {
          if ((this.pu(), this.Eu)) return new Promise(() => {});
          const t = new f();
          return this.yu(() =>
            this.Eu && this.Vu
              ? Promise.resolve()
              : (e().then(t.resolve, t.reject), t.promise)
          ).then(() => t.promise);
        }
        enqueueRetryable(e) {
          this.enqueueAndForget(() => (this.Iu.push(e), this.wu()));
        }
        async wu() {
          if (0 !== this.Iu.length) {
            try {
              await this.Iu[0](), this.Iu.shift(), this.r_.reset();
            } catch (e) {
              if (!qe(e)) throw e;
              m("AsyncQueue", "Operation failed with retryable error: " + e);
            }
            0 < this.Iu.length && this.r_.jo(() => this.wu());
          }
        }
        yu(e) {
          var t = this.gu.then(
            () => (
              (this.Ru = !0),
              e()
                .catch((e) => {
                  throw (
                    ((this.Au = e),
                    (this.Ru = !1),
                    d(
                      "INTERNAL UNHANDLED ERROR: ",
                      (function (e) {
                        let t = e.message || "";
                        return (t = e.stack
                          ? e.stack.includes(e.message)
                            ? e.stack
                            : e.message + "\n" + e.stack
                          : t);
                      })(e)
                    ),
                    e)
                  );
                })
                .then((e) => ((this.Ru = !1), e))
            )
          );
          return (this.gu = t);
        }
        enqueueAfterDelay(e, t, n) {
          this.pu(), -1 < this.mu.indexOf(e) && (t = 0);
          e = ko.createAndSchedule(this, e, t, n, (e) => this.Su(e));
          return this.du.push(e), e;
        }
        pu() {
          this.Au && I();
        }
        verifyOperationInProgress() {}
        async bu() {
          for (var e; await (e = this.gu), e !== this.gu; );
        }
        Du(e) {
          for (const t of this.du) if (t.timerId === e) return !0;
          return !1;
        }
        vu(t) {
          return this.bu().then(() => {
            this.du.sort((e, t) => e.targetTimeMs - t.targetTimeMs);
            for (const e of this.du)
              if ((e.skipDelay(), "all" !== t && e.timerId === t)) break;
            return this.bu();
          });
        }
        Cu(e) {
          this.mu.push(e);
        }
        Su(e) {
          e = this.du.indexOf(e);
          this.du.splice(e, 1);
        }
      }
      function eh(e) {
        var t = e;
        if ("object" == typeof t && null !== t) {
          var n = t;
          for (const t of ["next", "error", "complete"])
            if (t in n && "function" == typeof n[t]) return 1;
        }
      }
      class th {
        constructor() {
          (this._progressObserver = {}),
            (this._taskCompletionResolver = new f()),
            (this._lastProgress = {
              taskState: "Running",
              totalBytes: 0,
              totalDocuments: 0,
              bytesLoaded: 0,
              documentsLoaded: 0,
            });
        }
        onProgress(e, t, n) {
          this._progressObserver = { next: e, error: t, complete: n };
        }
        catch(e) {
          return this._taskCompletionResolver.promise.catch(e);
        }
        then(e, t) {
          return this._taskCompletionResolver.promise.then(e, t);
        }
        _completeWith(e) {
          this._updateProgress(e),
            this._progressObserver.complete &&
              this._progressObserver.complete(),
            this._taskCompletionResolver.resolve(e);
        }
        _failWith(e) {
          (this._lastProgress.taskState = "Error"),
            this._progressObserver.next &&
              this._progressObserver.next(this._lastProgress),
            this._progressObserver.error && this._progressObserver.error(e),
            this._taskCompletionResolver.reject(e);
        }
        _updateProgress(e) {
          (this._lastProgress = e),
            this._progressObserver.next && this._progressObserver.next(e);
        }
      }
      class B extends Qu {
        constructor(e, t, n, r) {
          super(e, t, n, r),
            (this.type = "firestore"),
            (this._queue = new Zu()),
            (this._persistenceKey =
              (null == r ? void 0 : r.name) || "[DEFAULT]");
        }
        async _terminate() {
          var e;
          this._firestoreClient &&
            ((e = this._firestoreClient.terminate()),
            (this._queue = new Zu(e)),
            (this._firestoreClient = void 0),
            await e);
        }
      }
      function nh(e) {
        if (e._terminated)
          throw new _(
            w.FAILED_PRECONDITION,
            "The client has already been terminated."
          );
        return e._firestoreClient || rh(e), e._firestoreClient;
      }
      function rh(e) {
        var t,
          n,
          r,
          s,
          i = e._freezeSettings(),
          a =
            ((a = e._databaseId),
            (n = (null == (t = e._app) ? void 0 : t.options.appId) || ""),
            (r = e._persistenceKey),
            (s = i),
            new Bt(
              a,
              n,
              r,
              s.host,
              s.ssl,
              s.experimentalForceLongPolling,
              s.experimentalAutoDetectLongPolling,
              Fu(s.experimentalLongPollingOptions),
              s.useFetchStreams
            ));
        e._componentsProvider ||
          (null != (t = i.localCache) &&
            t._offlineComponentProvider &&
            null != (n = i.localCache) &&
            n._onlineComponentProvider &&
            (e._componentsProvider = {
              _offline: i.localCache._offlineComponentProvider,
              _online: i.localCache._onlineComponentProvider,
            })),
          (e._firestoreClient = new Eu(
            e._authCredentials,
            e._appCheckCredentials,
            e._queue,
            a,
            e._componentsProvider &&
              ((a =
                null == (e = e._componentsProvider)
                  ? void 0
                  : e._online.build()),
              {
                _offline: null == e ? void 0 : e._offline.build(a),
                _online: a,
              })
          ));
      }
      function sh(e, t, n) {
        if ((e = P(e, B))._firestoreClient || e._terminated)
          throw new _(
            w.FAILED_PRECONDITION,
            "Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object."
          );
        if (e._componentsProvider || e._getSettings().localCache)
          throw new _(w.FAILED_PRECONDITION, "SDK cache is already specified.");
        (e._componentsProvider = { _online: t, _offline: n }), rh(e);
      }
      function ih(e) {
        return (r = nh((e = P(e, B)))).asyncQueue.enqueue(async () => {
          const e = await Cu(r),
            t = await ku(r);
          e.setNetworkEnabled(!0);
          {
            const n = t;
            return n.k_.delete(0), lo(n);
          }
        });
        var r;
      }
      function ah(t, e) {
        return (
          (r = nh((t = P(t, B)))),
          (s = e),
          r.asyncQueue
            .enqueue(async () => {
              {
                var e = await Nu(r),
                  t = s;
                const n = e;
                return n.persistence.runTransaction(
                  "Get named query",
                  "readonly",
                  (e) => n.jr.getNamedQuery(e, t)
                );
              }
            })
            .then((e) => (e ? new $u(t, null, e.query) : null))
        );
        var r, s;
      }
      class oh {
        constructor(e) {
          this._byteString = e;
        }
        static fromBase64String(e) {
          try {
            return new oh(C.fromBase64String(e));
          } catch (e) {
            throw new _(
              w.INVALID_ARGUMENT,
              "Failed to construct data from Base64 string: " + e
            );
          }
        }
        static fromUint8Array(e) {
          return new oh(C.fromUint8Array(e));
        }
        toBase64() {
          return this._byteString.toBase64();
        }
        toUint8Array() {
          return this._byteString.toUint8Array();
        }
        toString() {
          return "Bytes(base64: " + this.toBase64() + ")";
        }
        isEqual(e) {
          return this._byteString.isEqual(e._byteString);
        }
      }
      class uh {
        constructor(...t) {
          for (let e = 0; e < t.length; ++e)
            if (0 === t[e].length)
              throw new _(
                w.INVALID_ARGUMENT,
                "Invalid field name at argument $(i + 1). Field names must not be empty."
              );
          this._internalPath = new c(t);
        }
        isEqual(e) {
          return this._internalPath.isEqual(e._internalPath);
        }
      }
      class hh {
        constructor(e) {
          this._methodName = e;
        }
      }
      class ch {
        constructor(e, t) {
          if (!isFinite(e) || e < -90 || 90 < e)
            throw new _(
              w.INVALID_ARGUMENT,
              "Latitude must be a number between -90 and 90, but was: " + e
            );
          if (!isFinite(t) || t < -180 || 180 < t)
            throw new _(
              w.INVALID_ARGUMENT,
              "Longitude must be a number between -180 and 180, but was: " + t
            );
          (this._lat = e), (this._long = t);
        }
        get latitude() {
          return this._lat;
        }
        get longitude() {
          return this._long;
        }
        isEqual(e) {
          return this._lat === e._lat && this._long === e._long;
        }
        toJSON() {
          return { latitude: this._lat, longitude: this._long };
        }
        _compareTo(e) {
          return T(this._lat, e._lat) || T(this._long, e._long);
        }
      }
      class lh {
        constructor(e) {
          this._values = (e || []).map((e) => e);
        }
        toArray() {
          return this._values.map((e) => e);
        }
        isEqual(e) {
          var t = this._values,
            n = e._values;
          if (t.length !== n.length) return !1;
          for (let e = 0; e < t.length; ++e) if (t[e] !== n[e]) return !1;
          return !0;
        }
      }
      const dh = /^__.*__$/;
      class fh {
        constructor(e, t, n) {
          (this.data = e), (this.fieldMask = t), (this.fieldTransforms = n);
        }
        toMutation(e, t) {
          return null !== this.fieldMask
            ? new Fr(e, this.data, this.fieldMask, t, this.fieldTransforms)
            : new Vr(e, this.data, t, this.fieldTransforms);
        }
      }
      class gh {
        constructor(e, t, n) {
          (this.data = e), (this.fieldMask = t), (this.fieldTransforms = n);
        }
        toMutation(e, t) {
          return new Fr(e, this.data, this.fieldMask, t, this.fieldTransforms);
        }
      }
      function mh(e) {
        switch (e) {
          case 0:
          case 2:
          case 1:
            return 1;
          case 3:
          case 4:
            return;
          default:
            throw I();
        }
      }
      class ph {
        constructor(e, t, n, r, s, i) {
          (this.settings = e),
            (this.databaseId = t),
            (this.serializer = n),
            (this.ignoreUndefinedProperties = r),
            void 0 === s && this.Fu(),
            (this.fieldTransforms = s || []),
            (this.fieldMask = i || []);
        }
        get path() {
          return this.settings.path;
        }
        get Mu() {
          return this.settings.Mu;
        }
        xu(e) {
          return new ph(
            Object.assign(Object.assign({}, this.settings), e),
            this.databaseId,
            this.serializer,
            this.ignoreUndefinedProperties,
            this.fieldTransforms,
            this.fieldMask
          );
        }
        Ou(e) {
          var t;
          const n = null == (t = this.path) ? void 0 : t.child(e),
            r = this.xu({ path: n, Nu: !1 });
          return r.Lu(e), r;
        }
        Bu(e) {
          var t;
          const n = null == (t = this.path) ? void 0 : t.child(e),
            r = this.xu({ path: n, Nu: !1 });
          return r.Fu(), r;
        }
        ku(e) {
          return this.xu({ path: void 0, Nu: !0 });
        }
        qu(e) {
          return Vh(
            e,
            this.settings.methodName,
            this.settings.Qu || !1,
            this.path,
            this.settings.Ku
          );
        }
        contains(t) {
          return (
            void 0 !== this.fieldMask.find((e) => t.isPrefixOf(e)) ||
            void 0 !== this.fieldTransforms.find((e) => t.isPrefixOf(e.field))
          );
        }
        Fu() {
          if (this.path)
            for (let e = 0; e < this.path.length; e++)
              this.Lu(this.path.get(e));
        }
        Lu(e) {
          if (0 === e.length)
            throw this.qu("Document fields must not be empty");
          if (mh(this.Mu) && dh.test(e))
            throw this.qu('Document fields cannot begin and end with "__"');
        }
      }
      class yh {
        constructor(e, t, n) {
          (this.databaseId = e),
            (this.ignoreUndefinedProperties = t),
            (this.serializer = n || ro(e));
        }
        $u(e, t, n, r = !1) {
          return new ph(
            { Mu: e, methodName: t, Ku: n, path: c.emptyPath(), Nu: !1, Qu: r },
            this.databaseId,
            this.serializer,
            this.ignoreUndefinedProperties
          );
        }
      }
      function vh(e) {
        var t = e._freezeSettings(),
          n = ro(e._databaseId);
        return new yh(e._databaseId, !!t.ignoreUndefinedProperties, n);
      }
      function wh(e, t, n, r, s, i = {}) {
        const a = e.$u(i.merge || i.mergeFields ? 2 : 0, t, n, s);
        Rh("Data must be an object, but it was:", a, r);
        e = Nh(r, a);
        let o, u;
        if (i.merge) (o = new Rt(a.fieldMask)), (u = a.fieldTransforms);
        else if (i.mergeFields) {
          const e = [];
          for (const r of i.mergeFields) {
            const s = Lh(t, r, n);
            if (!a.contains(s))
              throw new _(
                w.INVALID_ARGUMENT,
                `Field '${s}' is specified in your field mask but missing from your input data.`
              );
            Fh(e, s) || e.push(s);
          }
          (o = new Rt(e)),
            (u = a.fieldTransforms.filter((e) => o.covers(e.field)));
        } else (o = null), (u = a.fieldTransforms);
        return new fh(new k(e), o, u);
      }
      class _h extends hh {
        _toFieldTransform(e) {
          if (2 !== e.Mu)
            throw 1 === e.Mu
              ? e.qu(
                  this._methodName +
                    "() can only appear at the top level of your update data"
                )
              : e.qu(
                  this._methodName +
                    "() cannot be used with set() unless you pass {merge:true}"
                );
          return e.fieldMask.push(e.path), null;
        }
        isEqual(e) {
          return e instanceof _h;
        }
      }
      function bh(e, t, n) {
        return new ph(
          { Mu: 3, Ku: t.settings.Ku, methodName: e._methodName, Nu: n },
          t.databaseId,
          t.serializer,
          t.ignoreUndefinedProperties
        );
      }
      class Ih extends hh {
        _toFieldTransform(e) {
          return new Cr(e.path, new br());
        }
        isEqual(e) {
          return e instanceof Ih;
        }
      }
      class Th extends hh {
        constructor(e, t) {
          super(e), (this.Uu = t);
        }
        _toFieldTransform(e) {
          const t = bh(this, e, !0),
            n = this.Uu.map((e) => Ch(e, t)),
            r = new Ir(n);
          return new Cr(e.path, r);
        }
        isEqual(e) {
          return e instanceof Th && H(this.Uu, e.Uu);
        }
      }
      class Eh extends hh {
        constructor(e, t) {
          super(e), (this.Uu = t);
        }
        _toFieldTransform(e) {
          const t = bh(this, e, !0),
            n = this.Uu.map((e) => Ch(e, t)),
            r = new Er(n);
          return new Cr(e.path, r);
        }
        isEqual(e) {
          return e instanceof Eh && H(this.Uu, e.Uu);
        }
      }
      class Sh extends hh {
        constructor(e, t) {
          super(e), (this.Wu = t);
        }
        _toFieldTransform(e) {
          var t = new xr(e.serializer, vr(e.serializer, this.Wu));
          return new Cr(e.path, t);
        }
        isEqual(e) {
          return e instanceof Sh && this.Wu === e.Wu;
        }
      }
      function xh(e, s, i, t) {
        const a = e.$u(1, s, i),
          o = (Rh("Data must be an object, but it was:", a, t), []),
          u = k.empty();
        Dt(t, (e, t) => {
          var n = Mh(s, e, i),
            r = ((t = v(t)), a.Bu(n));
          if (t instanceof _h) o.push(n);
          else {
            const e = Ch(t, r);
            null != e && (o.push(n), u.set(n, e));
          }
        });
        e = new Rt(o);
        return new gh(u, e, a.fieldTransforms);
      }
      function Dh(t, n, e, r, s, i) {
        const a = t.$u(1, n, e),
          o = [Lh(n, r, e)],
          u = [s];
        if (i.length % 2 != 0)
          throw new _(
            w.INVALID_ARGUMENT,
            `Function ${n}() needs to be called with an even number of arguments that alternate between field names and values.`
          );
        for (let e = 0; e < i.length; e += 2)
          o.push(Lh(n, i[e])), u.push(i[e + 1]);
        const h = [],
          c = k.empty();
        for (let e = o.length - 1; 0 <= e; --e)
          if (!Fh(h, o[e])) {
            const n = o[e];
            var l = v(u[e]);
            const r = a.Bu(n);
            if (l instanceof _h) h.push(n);
            else {
              const t = Ch(l, r);
              null != t && (h.push(n), c.set(n, t));
            }
          }
        t = new Rt(h);
        return new gh(c, t, a.fieldTransforms);
      }
      function Ah(e, t, n, r = !1) {
        return Ch(n, e.$u(r ? 4 : 3, t));
      }
      function Ch(e, n) {
        if (kh((e = v(e))))
          return Rh("Unsupported field value:", n, e), Nh(e, n);
        if (e instanceof hh) {
          {
            var t = e;
            var r = n;
            if (!mh(r.Mu))
              throw r.qu(
                t._methodName + "() can only be used with update() and set()"
              );
            if (!r.path)
              throw r.qu(
                t._methodName + "() is not currently supported inside arrays"
              );
            t = t._toFieldTransform(r);
            t && r.fieldTransforms.push(t);
          }
          return null;
        }
        if (void 0 === e && n.ignoreUndefinedProperties) return null;
        if ((n.path && n.fieldMask.push(n.path), e instanceof Array)) {
          if (n.settings.Nu && 4 !== n.Mu)
            throw n.qu("Nested arrays are not supported");
          {
            var s = n;
            const o = [];
            let t = 0;
            for (const u of e) {
              let e = Ch(u, s.ku(t));
              null == e && (e = { nullValue: "NULL_VALUE" }), o.push(e), t++;
            }
            return { arrayValue: { values: o } };
          }
        }
        var i,
          a,
          r = e,
          t = n;
        if (null === (r = v(r))) return { nullValue: "NULL_VALUE" };
        if ("number" == typeof r) return vr(t.serializer, r);
        if ("boolean" == typeof r) return { booleanValue: r };
        if ("string" == typeof r) return { stringValue: r };
        if (r instanceof Date)
          return (i = y.fromDate(r)), { timestampValue: ms(t.serializer, i) };
        if (r instanceof y)
          return (
            (i = new y(r.seconds, 1e3 * Math.floor(r.nanoseconds / 1e3))),
            { timestampValue: ms(t.serializer, i) }
          );
        if (r instanceof ch)
          return {
            geoPointValue: { latitude: r.latitude, longitude: r.longitude },
          };
        if (r instanceof oh)
          return { bytesValue: ps(t.serializer, r._byteString) };
        if (r instanceof U) {
          const h = t.databaseId,
            c = r.firestore._databaseId;
          if (c.isEqual(h))
            return {
              referenceValue: ys(
                r.firestore._databaseId || t.databaseId,
                r._key.path
              ),
            };
          throw t.qu(
            `Document reference is for database ${c.projectId}/${c.database} but should be for database ${h.projectId}/` +
              h.database
          );
        }
        if (r instanceof lh)
          return (
            (a = t),
            {
              mapValue: {
                fields: {
                  __type__: { stringValue: "__vector__" },
                  value: {
                    arrayValue: {
                      values: r.toArray().map((e) => {
                        if ("number" != typeof e)
                          throw a.qu(
                            "VectorValues must only contain numeric values."
                          );
                        return pr(a.serializer, e);
                      }),
                    },
                  },
                },
              },
            }
          );
        throw t.qu("Unsupported field value: " + Gu(r));
      }
      function Nh(e, n) {
        const r = {};
        return (
          At(e)
            ? n.path && 0 < n.path.length && n.fieldMask.push(n.path)
            : Dt(e, (e, t) => {
                t = Ch(t, n.Ou(e));
                null != t && (r[e] = t);
              }),
          { mapValue: { fields: r } }
        );
      }
      function kh(e) {
        return !(
          "object" != typeof e ||
          null === e ||
          e instanceof Array ||
          e instanceof Date ||
          e instanceof y ||
          e instanceof ch ||
          e instanceof oh ||
          e instanceof U ||
          e instanceof hh ||
          e instanceof lh
        );
      }
      function Rh(e, t, n) {
        var r;
        if (
          !kh(n) ||
          "object" != typeof (r = n) ||
          null === r ||
          (Object.getPrototypeOf(r) !== Object.prototype &&
            null !== Object.getPrototypeOf(r))
        )
          throw "an object" === (r = Gu(n))
            ? t.qu(e + " a custom object")
            : t.qu(e + " " + r);
      }
      function Lh(e, t, n) {
        if ((t = v(t)) instanceof uh) return t._internalPath;
        if ("string" == typeof t) return Mh(e, t);
        throw Vh(
          "Field path arguments must be of type string or ",
          e,
          !1,
          void 0,
          n
        );
      }
      const Oh = new RegExp("[~\\*/\\[\\]]");
      function Mh(t, n, r) {
        if (0 <= n.search(Oh))
          throw Vh(
            `Invalid field path (${n}). Paths must not contain '~', '*', '/', '[', or ']'`,
            t,
            !1,
            void 0,
            r
          );
        try {
          return new uh(...n.split("."))._internalPath;
        } catch (e) {
          throw Vh(
            `Invalid field path (${n}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,
            t,
            !1,
            void 0,
            r
          );
        }
      }
      function Vh(e, t, n, r, s) {
        var i = r && !r.isEmpty(),
          a = void 0 !== s;
        let o = `Function ${t}() called with invalid data`,
          u = (n && (o += " (via `toFirestore()`)"), (o += ". "), "");
        return (
          (i || a) &&
            ((u += " (found"),
            i && (u += " in field " + r),
            a && (u += " in document " + s),
            (u += ")")),
          new _(w.INVALID_ARGUMENT, o + e + u)
        );
      }
      function Fh(e, t) {
        return e.some((e) => e.isEqual(t));
      }
      class Ph {
        constructor(e, t, n, r, s) {
          (this._firestore = e),
            (this._userDataWriter = t),
            (this._key = n),
            (this._document = r),
            (this._converter = s);
        }
        get id() {
          return this._key.path.lastSegment();
        }
        get ref() {
          return new U(this._firestore, this._converter, this._key);
        }
        exists() {
          return null !== this._document;
        }
        data() {
          var e;
          if (this._document)
            return this._converter
              ? ((e = new Uh(
                  this._firestore,
                  this._userDataWriter,
                  this._key,
                  this._document,
                  null
                )),
                this._converter.fromFirestore(e))
              : this._userDataWriter.convertValue(this._document.data.value);
        }
        get(e) {
          if (this._document) {
            e = this._document.data.field(Bh("DocumentSnapshot.get", e));
            if (null !== e) return this._userDataWriter.convertValue(e);
          }
        }
      }
      class Uh extends Ph {
        data() {
          return super.data();
        }
      }
      function Bh(e, t) {
        return "string" == typeof t
          ? Mh(e, t)
          : (t instanceof uh ? t : t._delegate)._internalPath;
      }
      function qh(e) {
        if ("L" === e.limitType && 0 === e.explicitOrderBy.length)
          throw new _(
            w.UNIMPLEMENTED,
            "limitToLast() queries require specifying at least one orderBy() clause"
          );
      }
      class jh {}
      class Gh extends jh {}
      function zh(e, t, ...n) {
        let r = [];
        t instanceof jh && r.push(t), (r = r.concat(n));
        (n = (t = r).filter((e) => e instanceof Qh).length),
          (t = t.filter((e) => e instanceof Kh).length);
        if (1 < n || (0 < n && 0 < t))
          throw new _(
            w.INVALID_ARGUMENT,
            "InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`."
          );
        for (const t of r) e = t._apply(e);
        return e;
      }
      class Kh extends Gh {
        constructor(e, t, n) {
          super(),
            (this._field = e),
            (this._op = t),
            (this._value = n),
            (this.type = "where");
        }
        static _create(e, t, n) {
          return new Kh(e, t, n);
        }
        _apply(e) {
          var t = this._parse(e);
          return (
            ec(e._query, t), new $u(e.firestore, e.converter, Zn(e._query, t))
          );
        }
        _parse(t) {
          var n = vh(t.firestore);
          {
            var r = t._query,
              s = "where",
              i = n,
              a = t.firestore._databaseId,
              o = ((n = this._field), (t = this._op), this._value);
            let e;
            if (n.isKeyField()) {
              if ("array-contains" === t || "array-contains-any" === t)
                throw new _(
                  w.INVALID_ARGUMENT,
                  `Invalid Query. You can't perform '${t}' queries on documentId().`
                );
              if ("in" === t || "not-in" === t) {
                Zh(o, t);
                const s = [];
                for (const i of o) s.push(Xh(a, r, i));
                e = { arrayValue: { values: s } };
              } else e = Xh(a, r, o);
            } else
              ("in" !== t && "not-in" !== t && "array-contains-any" !== t) ||
                Zh(o, t),
                (e = Ah(i, s, o, "in" === t || "not-in" === t));
            return L.create(n, t, e);
          }
        }
      }
      class Qh extends jh {
        constructor(e, t) {
          super(), (this.type = e), (this._queryConstraints = t);
        }
        static _create(e, t) {
          return new Qh(e, t);
        }
        _parse(t) {
          var e = this._queryConstraints
            .map((e) => e._parse(t))
            .filter((e) => 0 < e.getFilters().length);
          return 1 === e.length ? e[0] : O.create(e, this._getOperator());
        }
        _apply(t) {
          const n = this._parse(t);
          {
            if (0 === n.getFilters().length) return t;
            {
              var r = t._query;
              let e = r;
              for (const r of n.getFlattenedFilters()) ec(e, r), (e = Zn(e, r));
            }
            return new $u(t.firestore, t.converter, Zn(t._query, n));
          }
        }
        _getQueryConstraints() {
          return this._queryConstraints;
        }
        _getOperator() {
          return "and" === this.type ? "and" : "or";
        }
      }
      class $h extends Gh {
        constructor(e, t) {
          super(),
            (this._field = e),
            (this._direction = t),
            (this.type = "orderBy");
        }
        static _create(e, t) {
          return new $h(e, t);
        }
        _apply(e) {
          var t = (function (e, t, n) {
            if (null !== e.startAt)
              throw new _(
                w.INVALID_ARGUMENT,
                "Invalid query. You must not call startAt() or startAfter() before calling orderBy()."
              );
            if (null !== e.endAt)
              throw new _(
                w.INVALID_ARGUMENT,
                "Invalid query. You must not call endAt() or endBefore() before calling orderBy()."
              );
            return new fn(t, n);
          })(e._query, this._field, this._direction);
          return new $u(
            e.firestore,
            e.converter,
            ((t = (e = e._query).explicitOrderBy.concat([t])),
            new Qn(
              e.path,
              e.collectionGroup,
              t,
              e.filters.slice(),
              e.limit,
              e.limitType,
              e.startAt,
              e.endAt
            ))
          );
        }
      }
      class Hh extends Gh {
        constructor(e, t, n) {
          super(), (this.type = e), (this._limit = t), (this._limitType = n);
        }
        static _create(e, t, n) {
          return new Hh(e, t, n);
        }
        _apply(e) {
          return new $u(
            e.firestore,
            e.converter,
            er(e._query, this._limit, this._limitType)
          );
        }
      }
      class Wh extends Gh {
        constructor(e, t, n) {
          super(),
            (this.type = e),
            (this._docOrFields = t),
            (this._inclusive = n);
        }
        static _create(e, t, n) {
          return new Wh(e, t, n);
        }
        _apply(e) {
          var t,
            n = Yh(e, this.type, this._docOrFields, this._inclusive);
          return new $u(
            e.firestore,
            e.converter,
            ((t = e._query),
            (e = n),
            new Qn(
              t.path,
              t.collectionGroup,
              t.explicitOrderBy.slice(),
              t.filters.slice(),
              t.limit,
              t.limitType,
              e,
              t.endAt
            ))
          );
        }
      }
      class Jh extends Gh {
        constructor(e, t, n) {
          super(),
            (this.type = e),
            (this._docOrFields = t),
            (this._inclusive = n);
        }
        static _create(e, t, n) {
          return new Jh(e, t, n);
        }
        _apply(e) {
          var t,
            n = Yh(e, this.type, this._docOrFields, this._inclusive);
          return new $u(
            e.firestore,
            e.converter,
            ((t = e._query),
            (e = n),
            new Qn(
              t.path,
              t.collectionGroup,
              t.explicitOrderBy.slice(),
              t.filters.slice(),
              t.limit,
              t.limitType,
              t.startAt,
              e
            ))
          );
        }
      }
      function Yh(e, t, n, r) {
        if (((n[0] = v(n[0])), n[0] instanceof Ph)) {
          var s = e._query,
            i = e.firestore._databaseId,
            a = t,
            o = n[0]._document,
            u = r;
          if (!o)
            throw new _(
              w.NOT_FOUND,
              `Can't use a DocumentSnapshot that doesn't exist for ${a}().`
            );
          const g = [];
          for (const a of Yn(s))
            if (a.field.isKeyField()) g.push(Yt(i, o.key));
            else {
              const s = o.data.field(a.field);
              if (Ft(s))
                throw new _(
                  w.INVALID_ARGUMENT,
                  'Invalid query. You are trying to start or end a query using a document for which the field "' +
                    a.field +
                    '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)'
                );
              if (null === s) {
                const s = a.field.canonicalString();
                throw new _(
                  w.INVALID_ARGUMENT,
                  `Invalid query. You are trying to start or end a query using a document for which the field '${s}' (used as the orderBy) does not exist.`
                );
              }
              g.push(s);
            }
          return new cn(g, u);
        }
        a = vh(e.firestore);
        {
          var h = e._query,
            c = e.firestore._databaseId,
            l = a,
            d = t,
            f = n,
            s = r;
          const m = h.explicitOrderBy;
          if (f.length > m.length)
            throw new _(
              w.INVALID_ARGUMENT,
              `Too many arguments provided to ${d}(). The number of arguments must be less than or equal to the number of orderBy() clauses`
            );
          const p = [];
          for (let e = 0; e < f.length; e++) {
            const y = f[e];
            if (m[e].field.isKeyField()) {
              if ("string" != typeof y)
                throw new _(
                  w.INVALID_ARGUMENT,
                  `Invalid query. Expected a string for document ID in ${d}(), but got a ` +
                    typeof y
                );
              if (!Jn(h) && -1 !== y.indexOf("/"))
                throw new _(
                  w.INVALID_ARGUMENT,
                  `Invalid query. When querying a collection and ordering by documentId(), the value passed to ${d}() must be a plain document ID, but '${y}' contains a slash.`
                );
              const l = h.path.child(E.fromString(y));
              if (!S.isDocumentKey(l))
                throw new _(
                  w.INVALID_ARGUMENT,
                  `Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${d}() must result in a valid document path, but '${l}' is not because it contains an odd number of segments.`
                );
              const f = new S(l);
              p.push(Yt(c, f));
            } else {
              const h = Ah(l, d, y);
              p.push(h);
            }
          }
          return new cn(p, s);
        }
      }
      function Xh(e, t, n) {
        if ("string" == typeof (n = v(n))) {
          if ("" === n)
            throw new _(
              w.INVALID_ARGUMENT,
              "Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string."
            );
          if (!Jn(t) && -1 !== n.indexOf("/"))
            throw new _(
              w.INVALID_ARGUMENT,
              `Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`
            );
          t = t.path.child(E.fromString(n));
          if (S.isDocumentKey(t)) return Yt(e, new S(t));
          throw new _(
            w.INVALID_ARGUMENT,
            `Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${t}' is not because it has an odd number of segments (${t.length}).`
          );
        }
        if (n instanceof U) return Yt(e, n._key);
        throw new _(
          w.INVALID_ARGUMENT,
          `Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Gu(
            n
          )}.`
        );
      }
      function Zh(e, t) {
        if (!Array.isArray(e) || 0 === e.length)
          throw new _(
            w.INVALID_ARGUMENT,
            `Invalid Query. A non-empty array is required for '${t.toString()}' filters.`
          );
      }
      function ec(e, t) {
        const n = (function (e, t) {
          for (const n of e)
            for (const e of n.getFlattenedFilters())
              if (0 <= t.indexOf(e.op)) return e.op;
          return null;
        })(
          e.filters,
          (function () {
            switch (t.op) {
              case "!=":
                return ["!=", "not-in"];
              case "array-contains-any":
              case "in":
                return ["not-in"];
              case "not-in":
                return ["array-contains-any", "in", "not-in", "!="];
              default:
                return [];
            }
          })()
        );
        if (null !== n)
          throw n === t.op
            ? new _(
                w.INVALID_ARGUMENT,
                `Invalid query. You cannot use more than one '${t.op.toString()}' filter.`
              )
            : new _(
                w.INVALID_ARGUMENT,
                `Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`
              );
      }
      class tc {
        convertValue(e, t = "none") {
          switch (zt(e)) {
            case 0:
              return null;
            case 1:
              return e.booleanValue;
            case 2:
              return N(e.integerValue || e.doubleValue);
            case 3:
              return this.convertTimestamp(e.timestampValue);
            case 4:
              return this.convertServerTimestamp(e, t);
            case 5:
              return e.stringValue;
            case 6:
              return this.convertBytes(Vt(e.bytesValue));
            case 7:
              return this.convertReference(e.referenceValue);
            case 8:
              return this.convertGeoPoint(e.geoPointValue);
            case 9:
              return this.convertArray(e.arrayValue, t);
            case 11:
              return this.convertObject(e.mapValue, t);
            case 10:
              return this.convertVectorValue(e.mapValue);
            default:
              throw I();
          }
        }
        convertObject(e, t) {
          return this.convertObjectMap(e.fields, t);
        }
        convertObjectMap(e, n = "none") {
          const r = {};
          return (
            Dt(e, (e, t) => {
              r[e] = this.convertValue(t, n);
            }),
            r
          );
        }
        convertVectorValue(e) {
          e =
            null ==
            (e =
              null == (e = null == (e = e.fields) ? void 0 : e.value.arrayValue)
                ? void 0
                : e.values)
              ? void 0
              : e.map((e) => N(e.doubleValue));
          return new lh(e);
        }
        convertGeoPoint(e) {
          return new ch(N(e.latitude), N(e.longitude));
        }
        convertArray(e, t) {
          return (e.values || []).map((e) => this.convertValue(e, t));
        }
        convertServerTimestamp(e, t) {
          switch (t) {
            case "previous":
              var n = Pt(e);
              return null == n ? null : this.convertValue(n, t);
            case "estimate":
              return this.convertTimestamp(Ut(e));
            default:
              return null;
          }
        }
        convertTimestamp(e) {
          e = Mt(e);
          return new y(e.seconds, e.nanos);
        }
        convertDocumentKey(e, t) {
          const n = E.fromString(e),
            r = (p(Ms(n)), new qt(n.get(1), n.get(3))),
            s = new S(n.popFirst(5));
          return (
            r.isEqual(t) ||
              d(
                `Document ${s} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`
              ),
            s
          );
        }
      }
      function nc(e, t, n) {
        return e
          ? n && (n.merge || n.mergeFields)
            ? e.toFirestore(t, n)
            : e.toFirestore(t)
          : t;
      }
      class rc extends tc {
        constructor(e) {
          super(), (this.firestore = e);
        }
        convertBytes(e) {
          return new oh(e);
        }
        convertReference(e) {
          e = this.convertDocumentKey(e, this.firestore._databaseId);
          return new U(this.firestore, null, e);
        }
      }
      class sc {
        constructor(e, t) {
          (this.hasPendingWrites = e), (this.fromCache = t);
        }
        isEqual(e) {
          return (
            this.hasPendingWrites === e.hasPendingWrites &&
            this.fromCache === e.fromCache
          );
        }
      }
      class ic extends Ph {
        constructor(e, t, n, r, s, i) {
          super(e, t, n, r, i),
            (this._firestore = e),
            (this._firestoreImpl = e),
            (this.metadata = s);
        }
        exists() {
          return super.exists();
        }
        data(e = {}) {
          var t;
          if (this._document)
            return this._converter
              ? ((t = new ac(
                  this._firestore,
                  this._userDataWriter,
                  this._key,
                  this._document,
                  this.metadata,
                  null
                )),
                this._converter.fromFirestore(t, e))
              : this._userDataWriter.convertValue(
                  this._document.data.value,
                  e.serverTimestamps
                );
        }
        get(e, t = {}) {
          if (this._document) {
            e = this._document.data.field(Bh("DocumentSnapshot.get", e));
            if (null !== e)
              return this._userDataWriter.convertValue(e, t.serverTimestamps);
          }
        }
      }
      class ac extends ic {
        data(e = {}) {
          return super.data(e);
        }
      }
      class oc {
        constructor(e, t, n, r) {
          (this._firestore = e),
            (this._userDataWriter = t),
            (this._snapshot = r),
            (this.metadata = new sc(r.hasPendingWrites, r.fromCache)),
            (this.query = n);
        }
        get docs() {
          const t = [];
          return this.forEach((e) => t.push(e)), t;
        }
        get size() {
          return this._snapshot.docs.size;
        }
        get empty() {
          return 0 === this.size;
        }
        forEach(t, n) {
          this._snapshot.docs.forEach((e) => {
            t.call(
              n,
              new ac(
                this._firestore,
                this._userDataWriter,
                e.key,
                e,
                new sc(
                  this._snapshot.mutatedKeys.has(e.key),
                  this._snapshot.fromCache
                ),
                this.query.converter
              )
            );
          });
        }
        docChanges(e = {}) {
          e = !!e.includeMetadataChanges;
          if (e && this._snapshot.excludesMetadataChanges)
            throw new _(
              w.INVALID_ARGUMENT,
              "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot()."
            );
          return (
            (this._cachedChanges &&
              this._cachedChangesIncludeMetadataChanges === e) ||
              ((this._cachedChanges = (function (i, t) {
                if (i._snapshot.oldDocs.isEmpty()) {
                  let n = 0;
                  return i._snapshot.docChanges.map((e) => {
                    var t = new ac(
                      i._firestore,
                      i._userDataWriter,
                      e.doc.key,
                      e.doc,
                      new sc(
                        i._snapshot.mutatedKeys.has(e.doc.key),
                        i._snapshot.fromCache
                      ),
                      i.query.converter
                    );
                    return (
                      e.doc,
                      { type: "added", doc: t, oldIndex: -1, newIndex: n++ }
                    );
                  });
                }
                {
                  let s = i._snapshot.oldDocs;
                  return i._snapshot.docChanges
                    .filter((e) => t || 3 !== e.type)
                    .map((e) => {
                      var t = new ac(
                        i._firestore,
                        i._userDataWriter,
                        e.doc.key,
                        e.doc,
                        new sc(
                          i._snapshot.mutatedKeys.has(e.doc.key),
                          i._snapshot.fromCache
                        ),
                        i.query.converter
                      );
                      let n = -1,
                        r = -1;
                      return (
                        0 !== e.type &&
                          ((n = s.indexOf(e.doc.key)),
                          (s = s.delete(e.doc.key))),
                        1 !== e.type &&
                          ((s = s.add(e.doc)), (r = s.indexOf(e.doc.key))),
                        {
                          type: (function () {
                            switch (e.type) {
                              case 0:
                                return "added";
                              case 2:
                              case 3:
                                return "modified";
                              case 1:
                                return "removed";
                              default:
                                return I();
                            }
                          })(),
                          doc: t,
                          oldIndex: n,
                          newIndex: r,
                        }
                      );
                    });
                }
              })(this, e)),
              (this._cachedChangesIncludeMetadataChanges = e)),
            this._cachedChanges
          );
        }
      }
      function uc(e, t) {
        return e instanceof ic && t instanceof ic
          ? e._firestore === t._firestore &&
              e._key.isEqual(t._key) &&
              (null === e._document
                ? null === t._document
                : e._document.isEqual(t._document)) &&
              e._converter === t._converter
          : e instanceof oc &&
              t instanceof oc &&
              e._firestore === t._firestore &&
              Xu(e.query, t.query) &&
              e.metadata.isEqual(t.metadata) &&
              e._snapshot.isEqual(t._snapshot);
      }
      class hc extends tc {
        constructor(e) {
          super(), (this.firestore = e);
        }
        convertBytes(e) {
          return new oh(e);
        }
        convertReference(e) {
          e = this.convertDocumentKey(e, this.firestore._databaseId);
          return new U(this.firestore, null, e);
        }
      }
      function cc(e, t, n) {
        e = P(e, U);
        var r = P(e.firestore, B),
          t = nc(e.converter, t, n);
        return gc(r, [
          wh(vh(r), "setDoc", e._key, t, null !== e.converter, n).toMutation(
            e._key,
            V.none()
          ),
        ]);
      }
      function lc(e, t, n, ...r) {
        e = P(e, U);
        var s = P(e.firestore, B),
          i = vh(s);
        let a;
        return gc(s, [
          (a =
            "string" == typeof (t = v(t)) || t instanceof uh
              ? Dh(i, "updateDoc", e._key, t, n, r)
              : xh(i, "updateDoc", e._key, t)).toMutation(e._key, V.exists(!0)),
        ]);
      }
      function dc(t, ...n) {
        t = v(t);
        let e = { includeMetadataChanges: !1, source: "default" },
          r = 0;
        "object" != typeof n[r] || eh(n[r]) || ((e = n[r]), r++);
        var s = {
          includeMetadataChanges: e.includeMetadataChanges,
          source: e.source,
        };
        if (eh(n[r])) {
          const t = n[r];
          (n[r] = null == (h = t.next) ? void 0 : h.bind(t)),
            (n[r + 1] = null == (h = t.error) ? void 0 : h.bind(t)),
            (n[r + 2] = null == (h = t.complete) ? void 0 : h.bind(t));
        }
        let i, a, o;
        if (t instanceof U)
          (a = P(t.firestore, B)),
            (o = Hn(t._key.path)),
            (i = {
              next: (e) => {
                n[r] && n[r](mc(a, t, e));
              },
              error: n[r + 1],
              complete: n[r + 2],
            });
        else {
          const l = P(t, $u),
            d = ((a = P(l.firestore, B)), (o = l._query), new hc(a));
          (i = {
            next: (e) => {
              n[r] && n[r](new oc(a, d, l, e));
            },
            error: n[r + 1],
            complete: n[r + 2],
          }),
            qh(t._query);
        }
        {
          var u = nh(a),
            h = o,
            c = i;
          const f = new _u(c),
            g = new jo(h, f, s);
          return (
            u.asyncQueue.enqueueAndForget(async () => Uo(await Lu(u), g)),
            () => {
              f.eu(),
                u.asyncQueue.enqueueAndForget(async () => Bo(await Lu(u), g));
            }
          );
        }
      }
      function fc(e, t) {
        {
          var n = nh((e = P(e, B)));
          e = eh(t) ? t : { next: t };
          const r = new _u(e);
          return (
            n.asyncQueue.enqueueAndForget(async () => {
              var e = await Lu(n),
                t = r;
              e.X_.add(t), t.next();
            }),
            () => {
              r.eu(),
                n.asyncQueue.enqueueAndForget(async () => {
                  var e = await Lu(n),
                    t = r;
                  e.X_.delete(t);
                });
            }
          );
        }
      }
      function gc(e, t) {
        {
          var n = nh(e),
            r = t;
          const s = new f();
          return (
            n.asyncQueue.enqueueAndForget(async () =>
              (async function (t, e, n) {
                const r = fu(t);
                try {
                  const t = await (function (e, s) {
                    const i = e,
                      a = y.now(),
                      o = s.reduce((e, t) => e.add(t.key), M());
                    let u, h;
                    return i.persistence
                      .runTransaction(
                        "Locally write mutations",
                        "readwrite",
                        (n) => {
                          let t = ur,
                            r = M();
                          return i.hs
                            .getEntries(n, o)
                            .next((e) => {
                              (t = e).forEach((e, t) => {
                                t.isValidDocument() || (r = r.add(e));
                              });
                            })
                            .next(() =>
                              i.localDocuments.getOverlayedDocuments(n, t)
                            )
                            .next((e) => {
                              u = e;
                              const t = [];
                              for (const n of s) {
                                const s = (function (e, t) {
                                  let n = null;
                                  for (const r of e.fieldTransforms) {
                                    const e = t.data.field(r.field),
                                      s = _r(r.transform, e || null);
                                    null != s &&
                                      (n = null === n ? k.empty() : n).set(
                                        r.field,
                                        s
                                      );
                                  }
                                  return n || null;
                                })(n, u.get(n.key).overlayedDocument);
                                null != s &&
                                  t.push(
                                    new Fr(
                                      n.key,
                                      s,
                                      (function r(e) {
                                        const s = [];
                                        return (
                                          Dt(e.fields, (e, t) => {
                                            const n = new c([e]);
                                            if (nn(t)) {
                                              const e = r(t.mapValue).fields;
                                              if (0 === e.length) s.push(n);
                                              else
                                                for (const t of e)
                                                  s.push(n.child(t));
                                            } else s.push(n);
                                          }),
                                          new Rt(s)
                                        );
                                      })(s.value.mapValue),
                                      V.exists(!0)
                                    )
                                  );
                              }
                              return i.mutationQueue.addMutationBatch(
                                n,
                                a,
                                t,
                                s
                              );
                            })
                            .next((e) => {
                              var t = (h = e).applyToLocalDocumentSet(u, r);
                              return i.documentOverlayCache.saveOverlays(
                                n,
                                e.batchId,
                                t
                              );
                            });
                        }
                      )
                      .then(() => ({ batchId: h.batchId, changes: lr(u) }));
                  })(r.localStore, e);
                  r.sharedClientState.addPendingMutation(t.batchId);
                  {
                    var s = r;
                    var i = t.batchId;
                    var a = n;
                    let e = s.qa[s.currentUser.toKey()];
                    (e = (e = e || new D(T)).insert(i, a)),
                      (s.qa[s.currentUser.toKey()] = e);
                  }
                  await hu(r, t.changes), await Eo(r.remoteStore);
                } catch (t) {
                  const e = Ro(t, "Failed to persist write");
                  n.reject(e);
                }
              })(await Ru(n), r, s)
            ),
            s.promise
          );
        }
      }
      function mc(e, t, n) {
        var r = n.docs.get(t._key),
          s = new hc(e);
        return new ic(
          e,
          s,
          t._key,
          r,
          new sc(n.hasPendingWrites, n.fromCache),
          t.converter
        );
      }
      const pc = { maxAttempts: 5 };
      class yc {
        constructor(e, t) {
          (this._firestore = e),
            (this._commitHandler = t),
            (this._mutations = []),
            (this._committed = !1),
            (this._dataReader = vh(e));
        }
        set(e, t, n) {
          this._verifyNotCommitted();
          const r = vc(e, this._firestore),
            s = nc(r.converter, t, n),
            i = wh(
              this._dataReader,
              "WriteBatch.set",
              r._key,
              s,
              null !== r.converter,
              n
            );
          return this._mutations.push(i.toMutation(r._key, V.none())), this;
        }
        update(e, t, n, ...r) {
          this._verifyNotCommitted();
          e = vc(e, this._firestore);
          let s;
          return (
            (s =
              "string" == typeof (t = v(t)) || t instanceof uh
                ? Dh(this._dataReader, "WriteBatch.update", e._key, t, n, r)
                : xh(this._dataReader, "WriteBatch.update", e._key, t)),
            this._mutations.push(s.toMutation(e._key, V.exists(!0))),
            this
          );
        }
        delete(e) {
          this._verifyNotCommitted();
          e = vc(e, this._firestore);
          return (
            (this._mutations = this._mutations.concat(
              new qr(e._key, V.none())
            )),
            this
          );
        }
        commit() {
          return (
            this._verifyNotCommitted(),
            (this._committed = !0),
            0 < this._mutations.length
              ? this._commitHandler(this._mutations)
              : Promise.resolve()
          );
        }
        _verifyNotCommitted() {
          if (this._committed)
            throw new _(
              w.FAILED_PRECONDITION,
              "A write batch can no longer be used after commit() has been called."
            );
        }
      }
      function vc(e, t) {
        if ((e = v(e)).firestore !== t)
          throw new _(
            w.INVALID_ARGUMENT,
            "Provided document reference is from a different Firestore instance."
          );
        return e;
      }
      class wc extends class {
        constructor(e, t) {
          (this._firestore = e),
            (this._transaction = t),
            (this._dataReader = vh(e));
        }
        get(e) {
          const n = vc(e, this._firestore),
            r = new rc(this._firestore);
          return this._transaction.lookup([n._key]).then((e) => {
            if (!e || 1 !== e.length) return I();
            const t = e[0];
            if (t.isFoundDocument())
              return new Ph(this._firestore, r, t.key, t, n.converter);
            if (t.isNoDocument())
              return new Ph(this._firestore, r, n._key, null, n.converter);
            throw I();
          });
        }
        set(e, t, n) {
          (e = vc(e, this._firestore)),
            (t = nc(e.converter, t, n)),
            (t = wh(
              this._dataReader,
              "Transaction.set",
              e._key,
              t,
              null !== e.converter,
              n
            ));
          return this._transaction.set(e._key, t), this;
        }
        update(e, t, n, ...r) {
          (e = vc(e, this._firestore)),
            (n =
              "string" == typeof (t = v(t)) || t instanceof uh
                ? Dh(this._dataReader, "Transaction.update", e._key, t, n, r)
                : xh(this._dataReader, "Transaction.update", e._key, t));
          return this._transaction.update(e._key, n), this;
        }
        delete(e) {
          e = vc(e, this._firestore);
          return this._transaction.delete(e._key), this;
        }
      } {
        constructor(e, t) {
          super(e, t), (this._firestore = e);
        }
        get(e) {
          const t = vc(e, this._firestore),
            n = new hc(this._firestore);
          return super
            .get(e)
            .then(
              (e) =>
                new ic(
                  this._firestore,
                  n,
                  t._key,
                  e._document,
                  new sc(!1, !1),
                  t.converter
                )
            );
        }
      }
      function _c(e, t) {
        if (void 0 === t) return { merge: !1 };
        if (void 0 !== t.mergeFields && void 0 !== t.merge)
          throw new _(
            "invalid-argument",
            `Invalid options passed to function ${e}(): You cannot ` +
              'specify both "merge" and "mergeFields".'
          );
        return t;
      }
      function bc() {
        if ("undefined" == typeof Uint8Array)
          throw new _(
            "unimplemented",
            "Uint8Arrays are not available in this environment."
          );
      }
      function Ic() {
        if ("undefined" == typeof atob)
          throw new _(
            "unimplemented",
            "Blobs are unavailable in Firestore in this environment."
          );
      }
      (jc = $c.SDK_VERSION),
        (ae = jc),
        $c._registerComponent(
          new J(
            "firestore",
            (e, { instanceIdentifier: t, options: n }) => {
              const r = e.getProvider("app").getImmediate(),
                s = new B(
                  new ge(e.getProvider("auth-internal")),
                  new ve(e.getProvider("app-check-internal")),
                  (function (e, t) {
                    if (
                      Object.prototype.hasOwnProperty.apply(e.options, [
                        "projectId",
                      ])
                    )
                      return new qt(e.options.projectId, t);
                    throw new _(
                      w.INVALID_ARGUMENT,
                      '"projectId" not provided in firebase.initializeApp.'
                    );
                  })(r, t),
                  r
                );
              return (
                (n = Object.assign({ useFetchStreams: !0 }, n)),
                s._setSettings(n),
                s
              );
            },
            "PUBLIC"
          ).setMultipleInstances(!0)
        ),
        $c.registerVersion(ie, "4.7.5", void 0),
        $c.registerVersion(ie, "4.7.5", "esm2017");
      class Tc {
        constructor(e) {
          this._delegate = e;
        }
        static fromBase64String(e) {
          return Ic(), new Tc(oh.fromBase64String(e));
        }
        static fromUint8Array(e) {
          return bc(), new Tc(oh.fromUint8Array(e));
        }
        toBase64() {
          return Ic(), this._delegate.toBase64();
        }
        toUint8Array() {
          return bc(), this._delegate.toUint8Array();
        }
        isEqual(e) {
          return this._delegate.isEqual(e._delegate);
        }
        toString() {
          return "Blob(base64: " + this.toBase64() + ")";
        }
      }
      function Ec(e) {
        if ("object" == typeof e && null !== e) {
          var t = e;
          for (const n of ["next", "error", "complete"])
            if (n in t && "function" == typeof t[n]) return 1;
        }
      }
      class Sc {
        enableIndexedDbPersistence(e, t) {
          {
            e = e._delegate;
            var n = { forceOwnership: t };
            he(
              "enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead."
            );
            const r = e._freezeSettings();
            return (
              sh(e, vu.provider, {
                build: (e) =>
                  new pu(
                    e,
                    r.cacheSizeBytes,
                    null == n ? void 0 : n.forceOwnership
                  ),
              }),
              Promise.resolve()
            );
          }
        }
        enableMultiTabIndexedDbPersistence(e) {
          return (async function (e) {
            he(
              "enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead."
            );
            const t = e._freezeSettings();
            sh(e, vu.provider, { build: (e) => new yu(e, t.cacheSizeBytes) });
          })(e._delegate);
        }
        clearIndexedDbPersistence(e) {
          {
            var t = e._delegate;
            if (t._initialized && !t._terminated)
              throw new _(
                w.FAILED_PRECONDITION,
                "Persistence can only be cleared before a Firestore instance is initialized or after it is terminated."
              );
            const n = new f();
            return (
              t._queue.enqueueAndForgetEvenWhileRestricted(async () => {
                try {
                  await (async function (e) {
                    if (!Fe.p()) return Promise.resolve();
                    e += "main";
                    await Fe.delete(e);
                  })(Ia(t._databaseId, t._persistenceKey)),
                    n.resolve();
                } catch (e) {
                  n.reject(e);
                }
              }),
              n.promise
            );
          }
        }
      }
      class xc {
        constructor(e, t, n) {
          (this._delegate = t),
            (this._persistenceProvider = n),
            (this.INTERNAL = { delete: () => this.terminate() }),
            e instanceof qt || (this._appCompat = e);
        }
        get _databaseId() {
          return this._delegate._databaseId;
        }
        settings(e) {
          var t = this._delegate._getSettings();
          e.merge ||
            t.host === e.host ||
            he(
              "You are overriding the original host. If you did not intend to override your settings, use {merge: true}."
            ),
            e.merge &&
              delete (e = Object.assign(Object.assign({}, t), e)).merge,
            this._delegate._setSettings(e);
        }
        useEmulator(n, r, e = {}) {
          {
            var [n, r, e, s = {}] = [this._delegate, n, r, e];
            const i = (n = P(n, Qu))._getSettings(),
              t = r + ":" + e;
            if (
              ("firestore.googleapis.com" !== i.host &&
                i.host !== t &&
                he(
                  "Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."
                ),
              n._setSettings(
                Object.assign(Object.assign({}, i), { host: t, ssl: !1 })
              ),
              s.mockUserToken)
            ) {
              let e, t;
              if ("string" == typeof s.mockUserToken)
                (e = s.mockUserToken), (t = o.MOCK_USER);
              else {
                e = (function (e, t) {
                  if (e.uid)
                    throw new Error(
                      'The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.'
                    );
                  var t = t || "demo-project",
                    n = e.iat || 0,
                    r = e.sub || e.user_id;
                  if (r)
                    return (
                      (r = Object.assign(
                        {
                          iss: "https://securetoken.google.com/" + t,
                          aud: t,
                          iat: n,
                          exp: n + 3600,
                          auth_time: n,
                          sub: r,
                          user_id: r,
                          firebase: {
                            sign_in_provider: "custom",
                            identities: {},
                          },
                        },
                        e
                      )),
                      [
                        q(JSON.stringify({ alg: "none", type: "JWT" })),
                        q(JSON.stringify(r)),
                        "",
                      ].join(".")
                    );
                  throw new Error(
                    "mockUserToken must contain 'sub' or 'user_id' field!"
                  );
                })(
                  s.mockUserToken,
                  null == (r = n._app) ? void 0 : r.options.projectId
                );
                const i = s.mockUserToken.sub || s.mockUserToken.user_id;
                if (!i)
                  throw new _(
                    w.INVALID_ARGUMENT,
                    "mockUserToken must contain 'sub' or 'user_id' field!"
                  );
                t = new o(i);
              }
              n._authCredentials = new fe(new le(e, t));
            }
            return;
          }
        }
        enableNetwork() {
          return ih(this._delegate);
        }
        disableNetwork() {
          return (
            (e = this._delegate),
            (n = nh((e = P(e, B)))).asyncQueue.enqueue(async () => {
              const e = await Cu(n),
                t = await ku(n);
              return (
                e.setNetworkEnabled(!1),
                (async function () {
                  const e = t;
                  e.k_.add(0), await fo(e), e.K_.set("Offline");
                })()
              );
            })
          );
          var e, n;
        }
        enablePersistence(e) {
          let t = !1,
            n = !1;
          return (
            e &&
              ((t = !!e.synchronizeTabs),
              (n = !!e.experimentalForceOwningTab),
              Bu("synchronizeTabs", t, "experimentalForceOwningTab", n)),
            t
              ? this._persistenceProvider.enableMultiTabIndexedDbPersistence(
                  this
                )
              : this._persistenceProvider.enableIndexedDbPersistence(this, n)
          );
        }
        clearPersistence() {
          return this._persistenceProvider.clearIndexedDbPersistence(this);
        }
        terminate() {
          return (
            this._appCompat &&
              (this._appCompat._removeServiceInstance("firestore-compat"),
              this._appCompat._removeServiceInstance("firestore")),
            this._delegate._delete()
          );
        }
        waitForPendingWrites() {
          var e = this._delegate;
          {
            var t = nh((e = P(e, B)));
            const n = new f();
            return (
              t.asyncQueue.enqueueAndForget(async () =>
                (async function (e, t) {
                  const n = e;
                  _o(n.remoteStore) ||
                    m(
                      "SyncEngine",
                      "The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled."
                    );
                  try {
                    const e = await (function () {
                      const t = n.localStore;
                      return t.persistence.runTransaction(
                        "Get highest unacknowledged batch id",
                        "readonly",
                        (e) =>
                          t.mutationQueue.getHighestUnacknowledgedBatchId(e)
                      );
                    })();
                    if (-1 === e) return void t.resolve();
                    const r = n.Qa.get(e) || [];
                    r.push(t), n.Qa.set(e, r);
                  } catch (e) {
                    const n = Ro(
                      e,
                      "Initialization of waitForPendingWrites() operation failed"
                    );
                    t.reject(n);
                  }
                })(await Ru(t), n)
              ),
              n.promise
            );
          }
        }
        onSnapshotsInSync(e) {
          return fc(this._delegate, e);
        }
        get app() {
          if (this._appCompat) return this._appCompat;
          throw new _(
            "failed-precondition",
            "Firestore was not initialized using the Firebase SDK. 'app' is not available"
          );
        }
        collection(e) {
          try {
            return new Bc(this, Wu(this._delegate, e));
          } catch (e) {
            throw Rc(e, "collection()", "Firestore.collection()");
          }
        }
        doc(e) {
          try {
            return new kc(this, Ju(this._delegate, e));
          } catch (e) {
            throw Rc(e, "doc()", "Firestore.doc()");
          }
        }
        collectionGroup(e) {
          try {
            return new Fc(
              this,
              (function (e, t) {
                if (
                  ((e = P(e, Qu)),
                  Uu("collectionGroup", "collection id", t),
                  0 <= t.indexOf("/"))
                )
                  throw new _(
                    w.INVALID_ARGUMENT,
                    `Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`
                  );
                return new $u(e, null, new Qn(E.emptyPath(), t));
              })(this._delegate, e)
            );
          } catch (e) {
            throw Rc(e, "collectionGroup()", "Firestore.collectionGroup()");
          }
        }
        runTransaction(t) {
          var n = this._delegate,
            r = (e) => t(new Ac(this, e)),
            e = void 0;
          if (
            ((n = P(n, B)),
            (e = Object.assign(Object.assign({}, pc), e)).maxAttempts < 1)
          )
            throw new _(w.INVALID_ARGUMENT, "Max attempts must be at least 1");
          {
            var s = nh(n),
              i = (e) => r(new wc(n, e)),
              a = e;
            const o = new f();
            return (
              s.asyncQueue.enqueueAndForget(async () => {
                var e = await Au(s).then((e) => e.datastore);
                new Tu(s.asyncQueue, e, a, i, o).cu();
              }),
              o.promise
            );
          }
        }
        batch() {
          return (
            nh(this._delegate),
            new Cc(new yc(this._delegate, (e) => gc(this._delegate, e)))
          );
        }
        loadBundle(e) {
          return (
            (n = nh((t = P(this._delegate, B)))),
            (r = new th()),
            Vu(n, t._databaseId, e, r),
            r
          );
          var t, n, r;
        }
        namedQuery(e) {
          return ah(this._delegate, e).then((e) =>
            e ? new Fc(this, e) : null
          );
        }
      }
      class Dc extends tc {
        constructor(e) {
          super(), (this.firestore = e);
        }
        convertBytes(e) {
          return new Tc(new oh(e));
        }
        convertReference(e) {
          e = this.convertDocumentKey(e, this.firestore._databaseId);
          return kc.forKey(e, this.firestore, null);
        }
      }
      class Ac {
        constructor(e, t) {
          (this._firestore = e),
            (this._delegate = t),
            (this._userDataWriter = new Dc(e));
        }
        get(e) {
          const t = qc(e);
          return this._delegate
            .get(t)
            .then(
              (e) =>
                new Mc(
                  this._firestore,
                  new ic(
                    this._firestore._delegate,
                    this._userDataWriter,
                    e._key,
                    e._document,
                    e.metadata,
                    t.converter
                  )
                )
            );
        }
        set(e, t, n) {
          e = qc(e);
          return (
            n
              ? (_c("Transaction.set", n), this._delegate.set(e, t, n))
              : this._delegate.set(e, t),
            this
          );
        }
        update(e, t, n, ...r) {
          e = qc(e);
          return (
            2 === arguments.length
              ? this._delegate.update(e, t)
              : this._delegate.update(e, t, n, ...r),
            this
          );
        }
        delete(e) {
          e = qc(e);
          return this._delegate.delete(e), this;
        }
      }
      class Cc {
        constructor(e) {
          this._delegate = e;
        }
        set(e, t, n) {
          e = qc(e);
          return (
            n
              ? (_c("WriteBatch.set", n), this._delegate.set(e, t, n))
              : this._delegate.set(e, t),
            this
          );
        }
        update(e, t, n, ...r) {
          e = qc(e);
          return (
            2 === arguments.length
              ? this._delegate.update(e, t)
              : this._delegate.update(e, t, n, ...r),
            this
          );
        }
        delete(e) {
          e = qc(e);
          return this._delegate.delete(e), this;
        }
        commit() {
          return this._delegate.commit();
        }
      }
      class Nc {
        constructor(e, t, n) {
          (this._firestore = e),
            (this._userDataWriter = t),
            (this._delegate = n);
        }
        fromFirestore(e, t) {
          e = new ac(
            this._firestore._delegate,
            this._userDataWriter,
            e._key,
            e._document,
            e.metadata,
            null
          );
          return this._delegate.fromFirestore(
            new Vc(this._firestore, e),
            null != t ? t : {}
          );
        }
        toFirestore(e, t) {
          return t
            ? this._delegate.toFirestore(e, t)
            : this._delegate.toFirestore(e);
        }
        static getInstance(e, t) {
          const n = Nc.INSTANCES;
          let r = n.get(e),
            s = (r || ((r = new WeakMap()), n.set(e, r)), r.get(t));
          return s || ((s = new Nc(e, new Dc(e), t)), r.set(t, s)), s;
        }
      }
      Nc.INSTANCES = new WeakMap();
      class kc {
        constructor(e, t) {
          (this.firestore = e),
            (this._delegate = t),
            (this._userDataWriter = new Dc(e));
        }
        static forPath(e, t, n) {
          if (e.length % 2 != 0)
            throw new _(
              "invalid-argument",
              "Invalid document reference. Document references must have an even number of segments, but " +
                e.canonicalString() +
                " has " +
                e.length
            );
          return new kc(t, new U(t._delegate, n, new S(e)));
        }
        static forKey(e, t, n) {
          return new kc(t, new U(t._delegate, n, e));
        }
        get id() {
          return this._delegate.id;
        }
        get parent() {
          return new Bc(this.firestore, this._delegate.parent);
        }
        get path() {
          return this._delegate.path;
        }
        collection(e) {
          try {
            return new Bc(this.firestore, Wu(this._delegate, e));
          } catch (e) {
            throw Rc(e, "collection()", "DocumentReference.collection()");
          }
        }
        isEqual(e) {
          return (e = v(e)) instanceof U && Yu(this._delegate, e);
        }
        set(e, t) {
          t = _c("DocumentReference.set", t);
          try {
            return t ? cc(this._delegate, e, t) : cc(this._delegate, e);
          } catch (e) {
            throw Rc(e, "setDoc()", "DocumentReference.set()");
          }
        }
        update(e, t, ...n) {
          try {
            return 1 === arguments.length
              ? lc(this._delegate, e)
              : lc(this._delegate, e, t, ...n);
          } catch (e) {
            throw Rc(e, "updateDoc()", "DocumentReference.update()");
          }
        }
        delete() {
          return gc(P((e = this._delegate).firestore, B), [
            new qr(e._key, V.none()),
          ]);
          var e;
        }
        onSnapshot(...e) {
          var t = Lc(e),
            e = Oc(
              e,
              (e) =>
                new Mc(
                  this.firestore,
                  new ic(
                    this.firestore._delegate,
                    this._userDataWriter,
                    e._key,
                    e._document,
                    e.metadata,
                    this._delegate.converter
                  )
                )
            );
          return dc(this._delegate, t, e);
        }
        get(e) {
          let t;
          return (t = (
            "cache" === (null == e ? void 0 : e.source)
              ? function (t) {
                  t = P(t, U);
                  const n = P(t.firestore, B),
                    e = nh(n),
                    r = new hc(n);
                  return (function (e, t) {
                    const n = new f();
                    return (
                      e.asyncQueue.enqueueAndForget(async () =>
                        (async function (e, t, n) {
                          try {
                            const r = await (function (t) {
                              const n = e;
                              return n.persistence.runTransaction(
                                "read document",
                                "readonly",
                                (e) => n.localDocuments.getDocument(e, t)
                              );
                            })(t);
                            r.isFoundDocument()
                              ? n.resolve(r)
                              : r.isNoDocument()
                              ? n.resolve(null)
                              : n.reject(
                                  new _(
                                    w.UNAVAILABLE,
                                    "Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"
                                  )
                                );
                          } catch (e) {
                            t = Ro(
                              e,
                              `Failed to get document '${t} from cache`
                            );
                            n.reject(t);
                          }
                        })(await Nu(e), t, n)
                      ),
                      n.promise
                    );
                  })(e, t._key).then(
                    (e) =>
                      new ic(
                        n,
                        r,
                        t._key,
                        e,
                        new sc(null !== e && e.hasLocalMutations, !0),
                        t.converter
                      )
                  );
                }
              : "server" === (null == e ? void 0 : e.source)
              ? function (t) {
                  t = P(t, U);
                  const n = P(t.firestore, B);
                  return Ou(nh(n), t._key, { source: "server" }).then((e) =>
                    mc(n, t, e)
                  );
                }
              : function (t) {
                  t = P(t, U);
                  const n = P(t.firestore, B);
                  return Ou(nh(n), t._key).then((e) => mc(n, t, e));
                }
          )(this._delegate)).then(
            (e) =>
              new Mc(
                this.firestore,
                new ic(
                  this.firestore._delegate,
                  this._userDataWriter,
                  e._key,
                  e._document,
                  e.metadata,
                  this._delegate.converter
                )
              )
          );
        }
        withConverter(e) {
          return new kc(
            this.firestore,
            e
              ? this._delegate.withConverter(Nc.getInstance(this.firestore, e))
              : this._delegate.withConverter(null)
          );
        }
      }
      function Rc(e, t, n) {
        return (e.message = e.message.replace(t, n)), e;
      }
      function Lc(e) {
        for (const t of e) if ("object" == typeof t && !Ec(t)) return t;
        return {};
      }
      function Oc(e, t) {
        let n;
        return {
          next: (e) => {
            n.next && n.next(t(e));
          },
          error:
            null ==
            (e = (n = Ec(e[0])
              ? e[0]
              : Ec(e[1])
              ? e[1]
              : "function" == typeof e[0]
              ? { next: e[0], error: e[1], complete: e[2] }
              : { next: e[1], error: e[2], complete: e[3] }).error)
              ? void 0
              : e.bind(n),
          complete: null == (e = n.complete) ? void 0 : e.bind(n),
        };
      }
      class Mc {
        constructor(e, t) {
          (this._firestore = e), (this._delegate = t);
        }
        get ref() {
          return new kc(this._firestore, this._delegate.ref);
        }
        get id() {
          return this._delegate.id;
        }
        get metadata() {
          return this._delegate.metadata;
        }
        get exists() {
          return this._delegate.exists();
        }
        data(e) {
          return this._delegate.data(e);
        }
        get(e, t) {
          return this._delegate.get(e, t);
        }
        isEqual(e) {
          return uc(this._delegate, e._delegate);
        }
      }
      class Vc extends Mc {
        data(e) {
          e = this._delegate.data(e);
          return this._delegate._converter || void 0 !== e || I(), e;
        }
      }
      class Fc {
        constructor(e, t) {
          (this.firestore = e),
            (this._delegate = t),
            (this._userDataWriter = new Dc(e));
        }
        where(e, t, n) {
          try {
            return new Fc(
              this.firestore,
              zh(
                this._delegate,
                ((r = n), (s = t), (i = Bh("where", e)), Kh._create(i, s, r))
              )
            );
          } catch (e) {
            throw Rc(e, /(orderBy|where)\(\)/, "Query.$1()");
          }
          var r, s, i;
        }
        orderBy(e, t) {
          try {
            return new Fc(
              this.firestore,
              zh(
                this._delegate,
                (([n, r = "asc"] = [e, t]),
                (s = r),
                (i = Bh("orderBy", n)),
                $h._create(i, s))
              )
            );
          } catch (e) {
            throw Rc(e, /(orderBy|where)\(\)/, "Query.$1()");
          }
          var n, r, s, i;
        }
        limit(e) {
          try {
            return new Fc(
              this.firestore,
              zh(
                this._delegate,
                (zu("limit", (t = e)), Hh._create("limit", t, "F"))
              )
            );
          } catch (e) {
            throw Rc(e, "limit()", "Query.limit()");
          }
          var t;
        }
        limitToLast(e) {
          try {
            return new Fc(
              this.firestore,
              zh(
                this._delegate,
                (zu("limitToLast", (t = e)), Hh._create("limitToLast", t, "L"))
              )
            );
          } catch (e) {
            throw Rc(e, "limitToLast()", "Query.limitToLast()");
          }
          var t;
        }
        startAt(...e) {
          try {
            return new Fc(
              this.firestore,
              zh(
                this._delegate,
                (([...t] = [...e]), Wh._create("startAt", t, !0))
              )
            );
          } catch (e) {
            throw Rc(e, "startAt()", "Query.startAt()");
          }
          var t;
        }
        startAfter(...e) {
          try {
            return new Fc(
              this.firestore,
              zh(
                this._delegate,
                (([...t] = [...e]), Wh._create("startAfter", t, !1))
              )
            );
          } catch (e) {
            throw Rc(e, "startAfter()", "Query.startAfter()");
          }
          var t;
        }
        endBefore(...e) {
          try {
            return new Fc(
              this.firestore,
              zh(
                this._delegate,
                (([...t] = [...e]), Jh._create("endBefore", t, !1))
              )
            );
          } catch (e) {
            throw Rc(e, "endBefore()", "Query.endBefore()");
          }
          var t;
        }
        endAt(...e) {
          try {
            return new Fc(
              this.firestore,
              zh(
                this._delegate,
                (([...t] = [...e]), Jh._create("endAt", t, !0))
              )
            );
          } catch (e) {
            throw Rc(e, "endAt()", "Query.endAt()");
          }
          var t;
        }
        isEqual(e) {
          return Xu(this._delegate, e._delegate);
        }
        get(e) {
          let t;
          return (t = (
            "cache" === (null == e ? void 0 : e.source)
              ? function (t) {
                  t = P(t, $u);
                  const n = P(t.firestore, B),
                    e = nh(n),
                    r = new hc(n);
                  return (function (e, t) {
                    const n = new f();
                    return (
                      e.asyncQueue.enqueueAndForget(async () =>
                        (async function (e, t, n) {
                          try {
                            const r = await La(e, t, !0),
                              s = new Wo(t, r.ds),
                              i = s.ga(r.documents),
                              a = s.applyChanges(i, !1);
                            n.resolve(a.snapshot);
                          } catch (e) {
                            t = Ro(
                              e,
                              `Failed to execute query '${t} against cache`
                            );
                            n.reject(t);
                          }
                        })(await Nu(e), t, n)
                      ),
                      n.promise
                    );
                  })(e, t._query).then((e) => new oc(n, r, t, e));
                }
              : "server" === (null == e ? void 0 : e.source)
              ? function (t) {
                  t = P(t, $u);
                  const n = P(t.firestore, B),
                    e = nh(n),
                    r = new hc(n);
                  return Mu(e, t._query, { source: "server" }).then(
                    (e) => new oc(n, r, t, e)
                  );
                }
              : function (t) {
                  t = P(t, $u);
                  const n = P(t.firestore, B),
                    e = nh(n),
                    r = new hc(n);
                  return (
                    qh(t._query),
                    Mu(e, t._query).then((e) => new oc(n, r, t, e))
                  );
                }
          )(this._delegate)).then(
            (e) =>
              new Uc(
                this.firestore,
                new oc(
                  this.firestore._delegate,
                  this._userDataWriter,
                  this._delegate,
                  e._snapshot
                )
              )
          );
        }
        onSnapshot(...e) {
          var t = Lc(e),
            e = Oc(
              e,
              (e) =>
                new Uc(
                  this.firestore,
                  new oc(
                    this.firestore._delegate,
                    this._userDataWriter,
                    this._delegate,
                    e._snapshot
                  )
                )
            );
          return dc(this._delegate, t, e);
        }
        withConverter(e) {
          return new Fc(
            this.firestore,
            e
              ? this._delegate.withConverter(Nc.getInstance(this.firestore, e))
              : this._delegate.withConverter(null)
          );
        }
      }
      class Pc {
        constructor(e, t) {
          (this._firestore = e), (this._delegate = t);
        }
        get type() {
          return this._delegate.type;
        }
        get doc() {
          return new Vc(this._firestore, this._delegate.doc);
        }
        get oldIndex() {
          return this._delegate.oldIndex;
        }
        get newIndex() {
          return this._delegate.newIndex;
        }
      }
      class Uc {
        constructor(e, t) {
          (this._firestore = e), (this._delegate = t);
        }
        get query() {
          return new Fc(this._firestore, this._delegate.query);
        }
        get metadata() {
          return this._delegate.metadata;
        }
        get size() {
          return this._delegate.size;
        }
        get empty() {
          return this._delegate.empty;
        }
        get docs() {
          return this._delegate.docs.map((e) => new Vc(this._firestore, e));
        }
        docChanges(e) {
          return this._delegate
            .docChanges(e)
            .map((e) => new Pc(this._firestore, e));
        }
        forEach(t, n) {
          this._delegate.forEach((e) => {
            t.call(n, new Vc(this._firestore, e));
          });
        }
        isEqual(e) {
          return uc(this._delegate, e._delegate);
        }
      }
      class Bc extends Fc {
        constructor(e, t) {
          super(e, t), (this.firestore = e), (this._delegate = t);
        }
        get id() {
          return this._delegate.id;
        }
        get path() {
          return this._delegate.path;
        }
        get parent() {
          var e = this._delegate.parent;
          return e ? new kc(this.firestore, e) : null;
        }
        doc(e) {
          try {
            return void 0 === e
              ? new kc(this.firestore, Ju(this._delegate))
              : new kc(this.firestore, Ju(this._delegate, e));
          } catch (e) {
            throw Rc(e, "doc()", "CollectionReference.doc()");
          }
        }
        add(e) {
          return (function (e, t) {
            const n = P(e.firestore, B),
              r = Ju(e),
              s = nc(e.converter, t);
            return gc(n, [
              wh(
                vh(e.firestore),
                "addDoc",
                r._key,
                s,
                null !== e.converter,
                {}
              ).toMutation(r._key, V.exists(!1)),
            ]).then(() => r);
          })(this._delegate, e).then((e) => new kc(this.firestore, e));
        }
        isEqual(e) {
          return Yu(this._delegate, e._delegate);
        }
        withConverter(e) {
          return new Bc(
            this.firestore,
            e
              ? this._delegate.withConverter(Nc.getInstance(this.firestore, e))
              : this._delegate.withConverter(null)
          );
        }
      }
      function qc(e) {
        return P(e, U);
      }
      var re = {
          Firestore: xc,
          GeoPoint: ch,
          Timestamp: y,
          Blob: Tc,
          Transaction: Ac,
          WriteBatch: Cc,
          DocumentReference: kc,
          DocumentSnapshot: Mc,
          Query: Fc,
          QueryDocumentSnapshot: Vc,
          QuerySnapshot: Uc,
          CollectionReference: Bc,
          FieldPath: class zc {
            constructor(...e) {
              this._delegate = new uh(...e);
            }
            static documentId() {
              return new zc(c.keyField().canonicalString());
            }
            isEqual(e) {
              return (
                (e = v(e)) instanceof uh &&
                this._delegate._internalPath.isEqual(e._internalPath)
              );
            }
          },
          FieldValue: class Kc {
            static serverTimestamp() {
              const e = new Ih("serverTimestamp");
              return (e._methodName = "FieldValue.serverTimestamp"), new Kc(e);
            }
            static delete() {
              const e = new _h("deleteField");
              return (e._methodName = "FieldValue.delete"), new Kc(e);
            }
            static arrayUnion(...e) {
              [...e] = [...e];
              const t = new Th("arrayUnion", e);
              return (t._methodName = "FieldValue.arrayUnion"), new Kc(t);
            }
            static arrayRemove(...e) {
              [...e] = [...e];
              const t = new Eh("arrayRemove", e);
              return (t._methodName = "FieldValue.arrayRemove"), new Kc(t);
            }
            static increment(e) {
              const t = new Sh("increment", e);
              return (t._methodName = "FieldValue.increment"), new Kc(t);
            }
            constructor(e) {
              this._delegate = e;
            }
            isEqual(e) {
              return this._delegate.isEqual(e._delegate);
            }
          },
          setLogLevel: function (e) {
            oe.setLogLevel(e);
          },
          CACHE_SIZE_UNLIMITED: -1,
        },
        jc = e.default,
        Gc = (e, t) => new xc(e, t, new Sc());
      jc.INTERNAL.registerComponent(
        new J(
          "firestore-compat",
          (e) => {
            var t = e.getProvider("app-compat").getImmediate(),
              e = e.getProvider("firestore").getImmediate();
            return Gc(t, e);
          },
          "PUBLIC"
        ).setServiceProps(Object.assign({}, re))
      ),
        jc.registerVersion("@firebase/firestore-compat", "0.3.40");
    }.apply(this, arguments);
  } catch (e) {
    throw (
      (console.error(e),
      new Error(
        "Cannot instantiate firebase-firestore-compat.js - be sure to load firebase-app.js first."
      ))
    );
  }
});
