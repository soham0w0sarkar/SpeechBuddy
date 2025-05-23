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
})(this, function (Ne, xe) {
  "use strict";
  try {
    !function () {
      var _,
        i,
        e =
          (e = Ne) && "object" == typeof e && "default" in e
            ? e
            : { default: e };
      function L(r) {
        const s = [];
        let n = 0;
        for (let t = 0; t < r.length; t++) {
          let e = r.charCodeAt(t);
          e < 128
            ? (s[n++] = e)
            : (e < 2048
                ? (s[n++] = (e >> 6) | 192)
                : (55296 == (64512 & e) &&
                  t + 1 < r.length &&
                  56320 == (64512 & r.charCodeAt(t + 1))
                    ? ((e =
                        65536 +
                        ((1023 & e) << 10) +
                        (1023 & r.charCodeAt(++t))),
                      (s[n++] = (e >> 18) | 240),
                      (s[n++] = ((e >> 12) & 63) | 128))
                    : (s[n++] = (e >> 12) | 224),
                  (s[n++] = ((e >> 6) & 63) | 128)),
              (s[n++] = (63 & e) | 128));
        }
        return s;
      }
      const M = {
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
        encodeByteArray(s, e) {
          if (!Array.isArray(s))
            throw Error("encodeByteArray takes an array as a parameter");
          this.init_();
          var n = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
          const i = [];
          for (let r = 0; r < s.length; r += 3) {
            var o = s[r],
              a = r + 1 < s.length,
              h = a ? s[r + 1] : 0,
              l = r + 2 < s.length,
              u = l ? s[r + 2] : 0;
            let e = ((15 & h) << 2) | (u >> 6),
              t = 63 & u;
            l || ((t = 64), a || (e = 64)),
              i.push(n[o >> 2], n[((3 & o) << 4) | (h >> 4)], n[e], n[t]);
          }
          return i.join("");
        },
        encodeString(e, t) {
          return this.HAS_NATIVE_SUPPORT && !t
            ? btoa(e)
            : this.encodeByteArray(L(e), t);
        },
        decodeString(r, s) {
          if (this.HAS_NATIVE_SUPPORT && !s) return atob(r);
          {
            var n = this.decodeStringToByteArray(r, s);
            const h = [];
            let e = 0,
              t = 0;
            for (; e < n.length; ) {
              var i,
                o,
                a = n[e++];
              a < 128
                ? (h[t++] = String.fromCharCode(a))
                : 191 < a && a < 224
                ? ((i = n[e++]),
                  (h[t++] = String.fromCharCode(((31 & a) << 6) | (63 & i))))
                : 239 < a && a < 365
                ? ((o =
                    (((7 & a) << 18) |
                      ((63 & n[e++]) << 12) |
                      ((63 & n[e++]) << 6) |
                      (63 & n[e++])) -
                    65536),
                  (h[t++] = String.fromCharCode(55296 + (o >> 10))),
                  (h[t++] = String.fromCharCode(56320 + (1023 & o))))
                : ((i = n[e++]),
                  (o = n[e++]),
                  (h[t++] = String.fromCharCode(
                    ((15 & a) << 12) | ((63 & i) << 6) | (63 & o)
                  )));
            }
            return h.join("");
          }
        },
        decodeStringToByteArray(t, e) {
          this.init_();
          var r = e ? this.charToByteMapWebSafe_ : this.charToByteMap_;
          const s = [];
          for (let e = 0; e < t.length; ) {
            var n = r[t.charAt(e++)],
              i = e < t.length ? r[t.charAt(e)] : 0,
              o = ++e < t.length ? r[t.charAt(e)] : 64,
              a = ++e < t.length ? r[t.charAt(e)] : 64;
            if ((++e, null == n || null == i || null == o || null == a))
              throw new B();
            s.push((n << 2) | (i >> 4)),
              64 !== o &&
                (s.push(((i << 4) & 240) | (o >> 2)),
                64 !== a && s.push(((o << 6) & 192) | a));
          }
          return s;
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
      class B extends Error {
        constructor() {
          super(...arguments), (this.name = "DecodeBase64StringError");
        }
      }
      function F(e) {
        return q(e).replace(/\./g, "");
      }
      const q = function (e) {
        e = L(e);
        return M.encodeByteArray(e, !0);
      };
      class n extends Error {
        constructor(e, t, r) {
          super(t),
            (this.code = e),
            (this.customData = r),
            (this.name = "FirebaseError"),
            Object.setPrototypeOf(this, n.prototype),
            Error.captureStackTrace &&
              Error.captureStackTrace(this, V.prototype.create);
        }
      }
      class V {
        constructor(e, t, r) {
          (this.service = e), (this.serviceName = t), (this.errors = r);
        }
        create(e, ...t) {
          var s,
            t = t[0] || {},
            r = this.service + "/" + e,
            e = (e = this.errors[e])
              ? ((s = t),
                e.replace(H, (e, t) => {
                  var r = s[t];
                  return null != r ? String(r) : `<${t}?>`;
                }))
              : "Error",
            e = this.serviceName + `: ${e} (${r}).`;
          return new n(r, e, t);
        }
      }
      const H = /\{\$([^}]+)}/g;
      function s(e) {
        return e && e._delegate ? e._delegate : e;
      }
      class j {
        constructor(e, t, r) {
          (this.name = e),
            (this.instanceFactory = t),
            (this.type = r),
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
      const W = "firebasestorage.googleapis.com",
        z = "storageBucket";
      class p extends n {
        constructor(e, t, r = 0) {
          super(o(e), `Firebase Storage: ${t} (${o(e)})`),
            (this.status_ = r),
            (this.customData = { serverResponse: null }),
            (this._baseMessage = this.message),
            Object.setPrototypeOf(this, p.prototype);
        }
        get status() {
          return this.status_;
        }
        set status(e) {
          this.status_ = e;
        }
        _codeEquals(e) {
          return o(e) === this.code;
        }
        get serverResponse() {
          return this.customData.serverResponse;
        }
        set serverResponse(e) {
          (this.customData.serverResponse = e),
            this.customData.serverResponse
              ? (this.message =
                  this._baseMessage +
                  `
` +
                  this.customData.serverResponse)
              : (this.message = this._baseMessage);
        }
      }
      function o(e) {
        return "storage/" + e;
      }
      function a() {
        return new p(
          _.UNKNOWN,
          "An unknown error occurred, please check the error payload for server response."
        );
      }
      function G() {
        return new p(
          _.RETRY_LIMIT_EXCEEDED,
          "Max retry time for operation exceeded, please try again."
        );
      }
      function X() {
        return new p(_.CANCELED, "User canceled the upload/download.");
      }
      function $() {
        return new p(
          _.CANNOT_SLICE_BLOB,
          "Cannot slice blob for upload. Please retry the upload."
        );
      }
      function h(e) {
        return new p(_.INVALID_ARGUMENT, e);
      }
      function K() {
        return new p(_.APP_DELETED, "The Firebase app was deleted.");
      }
      function Z(e) {
        return new p(
          _.INVALID_ROOT_OPERATION,
          "The operation '" +
            e +
            "' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png')."
        );
      }
      function l(e, t) {
        return new p(
          _.INVALID_FORMAT,
          "String does not match format '" + e + "': " + t
        );
      }
      function u(e) {
        throw new p(_.INTERNAL_ERROR, "Internal error: " + e);
      }
      ((t = _ = _ || {}).UNKNOWN = "unknown"),
        (t.OBJECT_NOT_FOUND = "object-not-found"),
        (t.BUCKET_NOT_FOUND = "bucket-not-found"),
        (t.PROJECT_NOT_FOUND = "project-not-found"),
        (t.QUOTA_EXCEEDED = "quota-exceeded"),
        (t.UNAUTHENTICATED = "unauthenticated"),
        (t.UNAUTHORIZED = "unauthorized"),
        (t.UNAUTHORIZED_APP = "unauthorized-app"),
        (t.RETRY_LIMIT_EXCEEDED = "retry-limit-exceeded"),
        (t.INVALID_CHECKSUM = "invalid-checksum"),
        (t.CANCELED = "canceled"),
        (t.INVALID_EVENT_NAME = "invalid-event-name"),
        (t.INVALID_URL = "invalid-url"),
        (t.INVALID_DEFAULT_BUCKET = "invalid-default-bucket"),
        (t.NO_DEFAULT_BUCKET = "no-default-bucket"),
        (t.CANNOT_SLICE_BLOB = "cannot-slice-blob"),
        (t.SERVER_FILE_WRONG_SIZE = "server-file-wrong-size"),
        (t.NO_DOWNLOAD_URL = "no-download-url"),
        (t.INVALID_ARGUMENT = "invalid-argument"),
        (t.INVALID_ARGUMENT_COUNT = "invalid-argument-count"),
        (t.APP_DELETED = "app-deleted"),
        (t.INVALID_ROOT_OPERATION = "invalid-root-operation"),
        (t.INVALID_FORMAT = "invalid-format"),
        (t.INTERNAL_ERROR = "internal-error"),
        (t.UNSUPPORTED_ENVIRONMENT = "unsupported-environment");
      class d {
        constructor(e, t) {
          (this.bucket = e), (this.path_ = t);
        }
        get path() {
          return this.path_;
        }
        get isRoot() {
          return 0 === this.path.length;
        }
        fullServerUrl() {
          const e = encodeURIComponent;
          return "/b/" + e(this.bucket) + "/o/" + e(this.path);
        }
        bucketOnlyServerUrl() {
          const e = encodeURIComponent;
          return "/b/" + e(this.bucket) + "/o";
        }
        static makeFromBucketSpec(e, t) {
          let r;
          try {
            r = d.makeFromUrl(e, t);
          } catch (t) {
            return new d(e, "");
          }
          if ("" === r.path) return r;
          throw new p(
            _.INVALID_DEFAULT_BUCKET,
            "Invalid default bucket '" + e + "'."
          );
        }
        static makeFromUrl(t, e) {
          let r = null;
          var s = "([A-Za-z0-9.\\-_]+)",
            n = new RegExp("^gs://" + s + "(/(.*))?$", "i");
          function i(e) {
            e.path_ = decodeURIComponent(e.path);
          }
          var o = e.replace(/[.]/g, "\\."),
            a = new RegExp(
              `^https?://${o}/v[A-Za-z0-9_]+/b/${s}/o(/([^?#]*).*)?$`,
              "i"
            ),
            o =
              e === W
                ? "(?:storage.googleapis.com|storage.cloud.google.com)"
                : e,
            h = [
              {
                regex: n,
                indices: { bucket: 1, path: 3 },
                postModify: function (e) {
                  "/" === e.path.charAt(e.path.length - 1) &&
                    (e.path_ = e.path_.slice(0, -1));
                },
              },
              { regex: a, indices: { bucket: 1, path: 3 }, postModify: i },
              {
                regex: new RegExp(`^https?://${o}/${s}/([^?#]*)`, "i"),
                indices: { bucket: 1, path: 2 },
                postModify: i,
              },
            ];
          for (let e = 0; e < h.length; e++) {
            const c = h[e];
            var l = c.regex.exec(t);
            if (l) {
              var u = l[c.indices.bucket],
                l = l[c.indices.path] || "";
              (r = new d(u, l)), c.postModify(r);
              break;
            }
          }
          if (null == r)
            throw ((e = t), new p(_.INVALID_URL, "Invalid URL '" + e + "'."));
          return r;
        }
      }
      class J {
        constructor(e) {
          this.promise_ = Promise.reject(e);
        }
        getPromise() {
          return this.promise_;
        }
        cancel(e = 0) {}
      }
      function c(e) {
        return "string" == typeof e || e instanceof String;
      }
      function Y(e) {
        return f() && e instanceof Blob;
      }
      function f() {
        return "undefined" != typeof Blob;
      }
      function r(e, t, r, s) {
        if (s < t)
          throw h(`Invalid value for '${e}'. Expected ${t} or greater.`);
        if (r < s) throw h(`Invalid value for '${e}'. Expected ${r} or less.`);
      }
      function g(e, t, r) {
        return r + `://${null == r ? "https://" + t : t}/v0` + e;
      }
      function Q(e) {
        const t = encodeURIComponent;
        let r = "?";
        for (const n in e) {
          var s;
          e.hasOwnProperty(n) &&
            ((s = t(n) + "=" + t(e[n])), (r = r + s + "&"));
        }
        return (r = r.slice(0, -1));
      }
      function ee(e, t) {
        var r = 500 <= e && e < 600,
          s = -1 !== [408, 429].indexOf(e),
          t = -1 !== t.indexOf(e);
        return r || s || t;
      }
      t = i = {
        NO_ERROR: 0,
        0: "NO_ERROR",
        NETWORK_ERROR: 1,
        1: "NETWORK_ERROR",
        ABORT: 2,
        2: "ABORT",
      };
      class te {
        constructor(e, t, r, s, n, i, o, a, h, l, u, c = !0) {
          (this.url_ = e),
            (this.method_ = t),
            (this.headers_ = r),
            (this.body_ = s),
            (this.successCodes_ = n),
            (this.additionalRetryCodes_ = i),
            (this.callback_ = o),
            (this.errorCallback_ = a),
            (this.timeout_ = h),
            (this.progressCallback_ = l),
            (this.connectionFactory_ = u),
            (this.retry = c),
            (this.pendingConnection_ = null),
            (this.backoffId_ = null),
            (this.canceled_ = !1),
            (this.appDelete_ = !1),
            (this.promise_ = new Promise((e, t) => {
              (this.resolve_ = e), (this.reject_ = t), this.start_();
            }));
        }
        start_() {
          var e = (e, t) => {
            const r = this.resolve_,
              s = this.reject_,
              n = t.connection;
            if (t.wasSuccessCode)
              try {
                var i = this.callback_(n, n.getResponse());
                void 0 !== i ? r(i) : r();
              } catch (e) {
                s(e);
              }
            else if (null !== n) {
              const o = a();
              (o.serverResponse = n.getErrorText()),
                this.errorCallback_ ? s(this.errorCallback_(n, o)) : s(o);
            } else {
              i = (t.canceled ? (this.appDelete_ ? K : X) : G)();
              s(i);
            }
          };
          this.canceled_
            ? e(0, new m(!1, null, !0))
            : (this.backoffId_ = (function (t, r, e) {
                let s = 1,
                  n = null,
                  i = null,
                  o = !1,
                  a = 0;
                function h() {
                  return 2 === a;
                }
                let l = !1;
                function u(...e) {
                  l || ((l = !0), r.apply(null, e));
                }
                function c(e) {
                  n = setTimeout(() => {
                    (n = null), t(_, h());
                  }, e);
                }
                function d() {
                  i && clearTimeout(i);
                }
                function _(e, ...t) {
                  {
                    if (!l)
                      return e || h() || o
                        ? (d(), void u.call(null, e, ...t))
                        : (s < 64 && (s *= 2),
                          void c(
                            1 === a ? ((a = 2), 0) : 1e3 * (s + Math.random())
                          ));
                    d();
                  }
                }
                let p = !1;
                function f(e) {
                  p ||
                    ((p = !0),
                    d(),
                    l ||
                      (null !== n
                        ? (e || (a = 2), clearTimeout(n), c(0))
                        : e || (a = 1)));
                }
                return (
                  c(0),
                  (i = setTimeout(() => {
                    f((o = !0));
                  }, e)),
                  f
                );
              })(
                (r, e) => {
                  if (e) r(!1, new m(!1, null, !0));
                  else {
                    const s = this.connectionFactory_(),
                      n =
                        ((this.pendingConnection_ = s),
                        (e) => {
                          var t = e.loaded,
                            e = e.lengthComputable ? e.total : -1;
                          null !== this.progressCallback_ &&
                            this.progressCallback_(t, e);
                        });
                    null !== this.progressCallback_ &&
                      s.addUploadProgressListener(n),
                      s
                        .send(
                          this.url_,
                          this.method_,
                          this.body_,
                          this.headers_
                        )
                        .then(() => {
                          null !== this.progressCallback_ &&
                            s.removeUploadProgressListener(n),
                            (this.pendingConnection_ = null);
                          var e = s.getErrorCode() === i.NO_ERROR,
                            t = s.getStatus();
                          !e ||
                          (ee(t, this.additionalRetryCodes_) && this.retry)
                            ? ((e = s.getErrorCode() === i.ABORT),
                              r(!1, new m(!1, null, e)))
                            : ((t = -1 !== this.successCodes_.indexOf(t)),
                              r(!0, new m(t, s)));
                        });
                  }
                },
                e,
                this.timeout_
              ));
        }
        getPromise() {
          return this.promise_;
        }
        cancel(e) {
          (this.canceled_ = !0),
            (this.appDelete_ = e || !1),
            null !== this.backoffId_ && (0, this.backoffId_)(!1),
            null !== this.pendingConnection_ && this.pendingConnection_.abort();
        }
      }
      class m {
        constructor(e, t, r) {
          (this.wasSuccessCode = e),
            (this.connection = t),
            (this.canceled = !!r);
        }
      }
      const b = {
        RAW: "raw",
        BASE64: "base64",
        BASE64URL: "base64url",
        DATA_URL: "data_url",
      };
      class v {
        constructor(e, t) {
          (this.data = e), (this.contentType = t || null);
        }
      }
      function re(e, t) {
        switch (e) {
          case b.RAW:
            return new v(se(t));
          case b.BASE64:
          case b.BASE64URL:
            return new v(ne(e, t));
          case b.DATA_URL:
            return new v(
              ((r = t),
              (s = new ie(r)).base64
                ? ne(b.BASE64, s.rest)
                : (function (e) {
                    let t;
                    try {
                      t = decodeURIComponent(e);
                    } catch (e) {
                      throw l(b.DATA_URL, "Malformed data URL.");
                    }
                    return se(t);
                  })(s.rest)),
              ((r = t), new ie(r).contentType)
            );
        }
        var r, s;
        throw a();
      }
      function se(r) {
        const s = [];
        for (let t = 0; t < r.length; t++) {
          let e = r.charCodeAt(t);
          var n, i;
          e <= 127
            ? s.push(e)
            : e <= 2047
            ? s.push(192 | (e >> 6), 128 | (63 & e))
            : 55296 == (64512 & e)
            ? t < r.length - 1 && 56320 == (64512 & r.charCodeAt(t + 1))
              ? ((n = e),
                (i = r.charCodeAt(++t)),
                (e = 65536 | ((1023 & n) << 10) | (1023 & i)),
                s.push(
                  240 | (e >> 18),
                  128 | ((e >> 12) & 63),
                  128 | ((e >> 6) & 63),
                  128 | (63 & e)
                ))
              : s.push(239, 191, 189)
            : 56320 == (64512 & e)
            ? s.push(239, 191, 189)
            : s.push(224 | (e >> 12), 128 | ((e >> 6) & 63), 128 | (63 & e));
        }
        return new Uint8Array(s);
      }
      function ne(e, t) {
        switch (e) {
          case b.BASE64:
            var r = -1 !== t.indexOf("-"),
              s = -1 !== t.indexOf("_");
            if (r || s)
              throw l(
                e,
                "Invalid character '" +
                  (r ? "-" : "_") +
                  "' found: is it base64url encoded?"
              );
            break;
          case b.BASE64URL:
            if (
              ((s = -1 !== t.indexOf("+")), (r = -1 !== t.indexOf("/")), s || r)
            )
              throw l(
                e,
                "Invalid character '" +
                  (s ? "+" : "/") +
                  "' found: is it base64 encoded?"
              );
            t = t.replace(/-/g, "+").replace(/_/g, "/");
        }
        let n;
        try {
          n = (function (e) {
            if ("undefined" == typeof atob)
              throw new p(
                _.UNSUPPORTED_ENVIRONMENT,
                "base-64 is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information."
              );
            return atob(e);
          })(t);
        } catch (t) {
          if (t.message.includes("polyfill")) throw t;
          throw l(e, "Invalid character found");
        }
        const i = new Uint8Array(n.length);
        for (let e = 0; e < n.length; e++) i[e] = n.charCodeAt(e);
        return i;
      }
      class ie {
        constructor(e) {
          (this.base64 = !1), (this.contentType = null);
          var t,
            r = e.match(/^data:([^,]+)?,/);
          if (null === r)
            throw l(
              b.DATA_URL,
              "Must be formatted 'data:[<mediatype>][;base64],<data>"
            );
          const s = r[1] || null;
          null != s &&
            ((this.base64 =
              (r = s).length >= (t = ";base64").length &&
              r.substring(r.length - t.length) === t),
            (this.contentType = this.base64
              ? s.substring(0, s.length - ";base64".length)
              : s)),
            (this.rest = e.substring(e.indexOf(",") + 1));
        }
      }
      class T {
        constructor(e, t) {
          let r = 0,
            s = "";
          Y(e)
            ? ((this.data_ = e), (r = e.size), (s = e.type))
            : e instanceof ArrayBuffer
            ? (t
                ? (this.data_ = new Uint8Array(e))
                : ((this.data_ = new Uint8Array(e.byteLength)),
                  this.data_.set(new Uint8Array(e))),
              (r = this.data_.length))
            : e instanceof Uint8Array &&
              (t
                ? (this.data_ = e)
                : ((this.data_ = new Uint8Array(e.length)), this.data_.set(e)),
              (r = e.length)),
            (this.size_ = r),
            (this.type_ = s);
        }
        size() {
          return this.size_;
        }
        type() {
          return this.type_;
        }
        slice(e, t) {
          if (Y(this.data_))
            return (
              (s = e),
              (n = t),
              null ===
              (i = (r = i = this.data_).webkitSlice
                ? r.webkitSlice(s, n)
                : r.mozSlice
                ? r.mozSlice(s, n)
                : r.slice
                ? r.slice(s, n)
                : null)
                ? null
                : new T(i)
            );
          var r,
            s,
            n,
            i = new Uint8Array(this.data_.buffer, e, t - e);
          return new T(i, !0);
        }
        static getBlob(...e) {
          var t;
          if (f())
            return (
              (t = e.map((e) => (e instanceof T ? e.data_ : e))),
              new T(
                function (...t) {
                  const e =
                    "undefined" != typeof BlobBuilder
                      ? BlobBuilder
                      : "undefined" != typeof WebKitBlobBuilder
                      ? WebKitBlobBuilder
                      : void 0;
                  if (void 0 !== e) {
                    const r = new e();
                    for (let e = 0; e < t.length; e++) r.append(t[e]);
                    return r.getBlob();
                  }
                  if (f()) return new Blob(t);
                  throw new p(
                    _.UNSUPPORTED_ENVIRONMENT,
                    "This browser doesn't seem to support creating Blobs"
                  );
                }.apply(null, t)
              )
            );
          {
            const s = e.map((e) => (c(e) ? re(b.RAW, e).data : e.data_));
            let t = 0;
            s.forEach((e) => {
              t += e.byteLength;
            });
            const n = new Uint8Array(t);
            let r = 0;
            return (
              s.forEach((t) => {
                for (let e = 0; e < t.length; e++) n[r++] = t[e];
              }),
              new T(n, !0)
            );
          }
        }
        uploadData() {
          return this.data_;
        }
      }
      function R(e) {
        let t;
        try {
          t = JSON.parse(e);
        } catch (e) {
          return null;
        }
        return "object" != typeof (e = t) || Array.isArray(e) ? null : t;
      }
      function oe(e) {
        var t = e.lastIndexOf("/", e.length - 2);
        return -1 === t ? e : e.slice(t + 1);
      }
      function ae(e, t) {
        return t;
      }
      class E {
        constructor(e, t, r, s) {
          (this.server = e),
            (this.local = t || e),
            (this.writable = !!r),
            (this.xform = s || ae);
        }
      }
      let he = null;
      function w() {
        if (he) return he;
        const e = [],
          t =
            (e.push(new E("bucket")),
            e.push(new E("generation")),
            e.push(new E("metageneration")),
            e.push(new E("name", "fullPath", !0)),
            new E("name")),
          r =
            ((t.xform = function (e, t) {
              return !c(t) || t.length < 2 ? t : oe(t);
            }),
            e.push(t),
            new E("size"));
        return (
          (r.xform = function (e, t) {
            return void 0 !== t ? Number(t) : t;
          }),
          e.push(r),
          e.push(new E("timeCreated")),
          e.push(new E("updated")),
          e.push(new E("md5Hash", null, !0)),
          e.push(new E("cacheControl", null, !0)),
          e.push(new E("contentDisposition", null, !0)),
          e.push(new E("contentEncoding", null, !0)),
          e.push(new E("contentLanguage", null, !0)),
          e.push(new E("contentType", null, !0)),
          e.push(new E("metadata", "customMetadata", !0)),
          (he = e)
        );
      }
      function le(e, t, r) {
        t = R(t);
        if (null === t) return null;
        {
          var s = t,
            n = r;
          const h = { type: "file" };
          var i,
            o,
            a = n.length;
          for (let e = 0; e < a; e++) {
            const l = n[e];
            h[l.local] = l.xform(h, s[l.server]);
          }
          return (
            (i = h),
            (o = e),
            Object.defineProperty(i, "ref", {
              get: function () {
                var e = i.bucket,
                  t = i.fullPath,
                  t = new d(e, t);
                return o._makeStorageReference(t);
              },
            }),
            h
          );
        }
      }
      function ue(t, r) {
        const s = {};
        var n = r.length;
        for (let e = 0; e < n; e++) {
          var i = r[e];
          i.writable && (s[i.server] = t[i.local]);
        }
        return JSON.stringify(s);
      }
      const ce = "prefixes";
      class y {
        constructor(e, t, r, s) {
          (this.url = e),
            (this.method = t),
            (this.handler = r),
            (this.timeout = s),
            (this.urlParams = {}),
            (this.headers = {}),
            (this.body = null),
            (this.errorHandler = null),
            (this.progressCallback = null),
            (this.successCodes = [200]),
            (this.additionalRetryCodes = []);
        }
      }
      function k(e) {
        if (!e) throw a();
      }
      function A(r, s) {
        return function (e, t) {
          t = le(r, t, s);
          return k(null !== t), t;
        };
      }
      function de(r, s) {
        return function (e, t) {
          t = (function (e, t, r) {
            if (null === (r = R(r))) return null;
            {
              var s = e,
                n = t,
                e = r;
              const a = {
                prefixes: [],
                items: [],
                nextPageToken: e.nextPageToken,
              };
              if (e[ce])
                for (const h of e[ce]) {
                  var i = h.replace(/\/$/, ""),
                    i = s._makeStorageReference(new d(n, i));
                  a.prefixes.push(i);
                }
              if (e.items)
                for (const l of e.items) {
                  var o = s._makeStorageReference(new d(n, l.name));
                  a.items.push(o);
                }
              return a;
            }
          })(r, s, t);
          return k(null !== t), t;
        };
      }
      function _e(l, u) {
        return function (e, t) {
          var r = le(l, t, u);
          k(null !== r);
          {
            var s = r,
              n = l.host,
              i = l._protocol;
            if (null === (r = R(t))) return null;
            if (!c(r.downloadTokens)) return null;
            const o = r.downloadTokens;
            if (0 === o.length) return null;
            const a = encodeURIComponent,
              h = o.split(",");
            return h.map((e) => {
              var t = s.bucket,
                r = s.fullPath;
              return (
                g("/b/" + a(t) + "/o/" + a(r), n, i) +
                Q({ alt: "media", token: e })
              );
            })[0];
          }
        };
      }
      function C(n) {
        return function (e, t) {
          let r;
          var s;
          return (
            ((r =
              401 === e.getStatus()
                ? e
                    .getErrorText()
                    .includes("Firebase App Check token is invalid")
                  ? new p(
                      _.UNAUTHORIZED_APP,
                      "This app does not have permission to access Firebase Storage on this project."
                    )
                  : new p(
                      _.UNAUTHENTICATED,
                      "User is not authenticated, please authenticate using Firebase Authentication and try again."
                    )
                : 402 === e.getStatus()
                ? ((s = n.bucket),
                  new p(
                    _.QUOTA_EXCEEDED,
                    "Quota for bucket '" +
                      s +
                      "' exceeded, please view quota on https://firebase.google.com/pricing/."
                  ))
                : 403 === e.getStatus()
                ? ((s = n.path),
                  new p(
                    _.UNAUTHORIZED,
                    "User does not have permission to access '" + s + "'."
                  ))
                : t).status = e.getStatus()),
            (r.serverResponse = t.serverResponse),
            r
          );
        };
      }
      function S(s) {
        const n = C(s);
        return function (e, t) {
          let r = n(e, t);
          return (
            ((r =
              404 === e.getStatus()
                ? ((e = s.path),
                  new p(
                    _.OBJECT_NOT_FOUND,
                    "Object '" + e + "' does not exist."
                  ))
                : r).serverResponse = t.serverResponse),
            r
          );
        };
      }
      function pe(e, t, r) {
        var s = g(t.fullServerUrl(), e.host, e._protocol),
          n = e.maxOperationRetryTime;
        const i = new y(s, "GET", A(e, r), n);
        return (i.errorHandler = S(t)), i;
      }
      function fe(e, t, r) {
        const s = Object.assign({}, r);
        return (
          (s.fullPath = e.path),
          (s.size = t.size()),
          s.contentType ||
            (s.contentType =
              ((e = t),
              ((t = null) && t.contentType) ||
                (e && e.type()) ||
                "application/octet-stream")),
          s
        );
      }
      class O {
        constructor(e, t, r, s) {
          (this.current = e),
            (this.total = t),
            (this.finalized = !!r),
            (this.metadata = s || null);
        }
      }
      function ge(e, t) {
        let r = null;
        try {
          r = e.getResponseHeader("X-Goog-Upload-Status");
        } catch (e) {
          k(!1);
        }
        const s = t || ["active"];
        return k(!!r && -1 !== s.indexOf(r)), r;
      }
      const U = {
        RUNNING: "running",
        PAUSED: "paused",
        SUCCESS: "success",
        CANCELED: "canceled",
        ERROR: "error",
      };
      function me(e) {
        switch (e) {
          case "running":
          case "pausing":
          case "canceling":
            return U.RUNNING;
          case "paused":
            return U.PAUSED;
          case "success":
            return U.SUCCESS;
          case "canceled":
            return U.CANCELED;
          default:
            return U.ERROR;
        }
      }
      class be {
        constructor(e, t, r) {
          "function" == typeof e || null != t || null != r
            ? ((this.next = e),
              (this.error = null != t ? t : void 0),
              (this.complete = null != r ? r : void 0))
            : ((this.next = (t = e).next),
              (this.error = t.error),
              (this.complete = t.complete));
        }
      }
      function N(t) {
        return (...e) => {
          Promise.resolve().then(() => t(...e));
        };
      }
      class ve extends class {
        constructor() {
          (this.sent_ = !1),
            (this.xhr_ = new XMLHttpRequest()),
            this.initXhr(),
            (this.errorCode_ = i.NO_ERROR),
            (this.sendPromise_ = new Promise((e) => {
              this.xhr_.addEventListener("abort", () => {
                (this.errorCode_ = i.ABORT), e();
              }),
                this.xhr_.addEventListener("error", () => {
                  (this.errorCode_ = i.NETWORK_ERROR), e();
                }),
                this.xhr_.addEventListener("load", () => {
                  e();
                });
            }));
        }
        send(e, t, r, s) {
          if (this.sent_) throw u("cannot .send() more than once");
          if (((this.sent_ = !0), this.xhr_.open(t, e, !0), void 0 !== s))
            for (const n in s)
              s.hasOwnProperty(n) &&
                this.xhr_.setRequestHeader(n, s[n].toString());
          return (
            void 0 !== r ? this.xhr_.send(r) : this.xhr_.send(),
            this.sendPromise_
          );
        }
        getErrorCode() {
          if (this.sent_) return this.errorCode_;
          throw u("cannot .getErrorCode() before sending");
        }
        getStatus() {
          if (!this.sent_) throw u("cannot .getStatus() before sending");
          try {
            return this.xhr_.status;
          } catch (e) {
            return -1;
          }
        }
        getResponse() {
          if (this.sent_) return this.xhr_.response;
          throw u("cannot .getResponse() before sending");
        }
        getErrorText() {
          if (this.sent_) return this.xhr_.statusText;
          throw u("cannot .getErrorText() before sending");
        }
        abort() {
          this.xhr_.abort();
        }
        getResponseHeader(e) {
          return this.xhr_.getResponseHeader(e);
        }
        addUploadProgressListener(e) {
          null != this.xhr_.upload &&
            this.xhr_.upload.addEventListener("progress", e);
        }
        removeUploadProgressListener(e) {
          null != this.xhr_.upload &&
            this.xhr_.upload.removeEventListener("progress", e);
        }
      } {
        initXhr() {
          this.xhr_.responseType = "text";
        }
      }
      function x() {
        return new ve();
      }
      class Te {
        isExponentialBackoffExpired() {
          return this.sleepTime > this.maxSleepTime;
        }
        constructor(e, t, r = null) {
          (this._transferred = 0),
            (this._needToFetchStatus = !1),
            (this._needToFetchMetadata = !1),
            (this._observers = []),
            (this._error = void 0),
            (this._uploadUrl = void 0),
            (this._request = void 0),
            (this._chunkMultiplier = 1),
            (this._resolve = void 0),
            (this._reject = void 0),
            (this._ref = e),
            (this._blob = t),
            (this._metadata = r),
            (this._mappings = w()),
            (this._resumable = this._shouldDoResumable(this._blob)),
            (this._state = "running"),
            (this._errorHandler = (e) => {
              if (
                ((this._request = void 0),
                (this._chunkMultiplier = 1),
                e._codeEquals(_.CANCELED))
              )
                (this._needToFetchStatus = !0), this.completeTransitions_();
              else {
                var t = this.isExponentialBackoffExpired();
                if (ee(e.status, [])) {
                  if (!t)
                    return (
                      (this.sleepTime = Math.max(2 * this.sleepTime, 1e3)),
                      (this._needToFetchStatus = !0),
                      void this.completeTransitions_()
                    );
                  e = G();
                }
                (this._error = e), this._transition("error");
              }
            }),
            (this._metadataErrorHandler = (e) => {
              (this._request = void 0),
                e._codeEquals(_.CANCELED)
                  ? this.completeTransitions_()
                  : ((this._error = e), this._transition("error"));
            }),
            (this.sleepTime = 0),
            (this.maxSleepTime = this._ref.storage.maxUploadRetryTime),
            (this._promise = new Promise((e, t) => {
              (this._resolve = e), (this._reject = t), this._start();
            })),
            this._promise.then(null, () => {});
        }
        _makeProgressCallback() {
          const t = this._transferred;
          return (e) => this._updateProgress(t + e);
        }
        _shouldDoResumable(e) {
          return 262144 < e.size();
        }
        _start() {
          "running" === this._state &&
            void 0 === this._request &&
            (this._resumable
              ? void 0 === this._uploadUrl
                ? this._createResumable()
                : this._needToFetchStatus
                ? this._fetchStatus()
                : this._needToFetchMetadata
                ? this._fetchMetadata()
                : (this.pendingTimeout = setTimeout(() => {
                    (this.pendingTimeout = void 0), this._continueUpload();
                  }, this.sleepTime))
              : this._oneShotUpload());
        }
        _resolveToken(r) {
          Promise.all([
            this._ref.storage._getAuthToken(),
            this._ref.storage._getAppCheckToken(),
          ]).then(([e, t]) => {
            switch (this._state) {
              case "running":
                r(e, t);
                break;
              case "canceling":
                this._transition("canceled");
                break;
              case "pausing":
                this._transition("paused");
            }
          });
        }
        _createResumable() {
          this._resolveToken((e, t) => {
            var r = (function (e, t, r, s, n) {
              var i = t.bucketOnlyServerUrl(),
                o = { name: (n = fe(t, s, n)).fullPath },
                a = g(i, e.host, e._protocol),
                s = {
                  "X-Goog-Upload-Protocol": "resumable",
                  "X-Goog-Upload-Command": "start",
                  "X-Goog-Upload-Header-Content-Length": "" + s.size(),
                  "X-Goog-Upload-Header-Content-Type": n.contentType,
                  "Content-Type": "application/json; charset=utf-8",
                },
                i = ue(n, r),
                n = e.maxUploadRetryTime;
              const h = new y(
                a,
                "POST",
                function (e) {
                  ge(e);
                  let t;
                  try {
                    t = e.getResponseHeader("X-Goog-Upload-URL");
                  } catch (e) {
                    k(!1);
                  }
                  return k(c(t)), t;
                },
                n
              );
              return (
                (h.urlParams = o),
                (h.headers = s),
                (h.body = i),
                (h.errorHandler = C(t)),
                h
              );
            })(
              this._ref.storage,
              this._ref._location,
              this._mappings,
              this._blob,
              this._metadata
            );
            const s = this._ref.storage._makeRequest(r, x, e, t);
            (this._request = s).getPromise().then((e) => {
              (this._request = void 0),
                (this._uploadUrl = e),
                (this._needToFetchStatus = !1),
                this.completeTransitions_();
            }, this._errorHandler);
          });
        }
        _fetchStatus() {
          const n = this._uploadUrl;
          this._resolveToken((e, t) => {
            var r = (function (e, t, r, n) {
              e = e.maxUploadRetryTime;
              const s = new y(
                r,
                "POST",
                function (e) {
                  var t = ge(e, ["active", "final"]);
                  let r = null;
                  try {
                    r = e.getResponseHeader("X-Goog-Upload-Size-Received");
                  } catch (e) {
                    k(!1);
                  }
                  r || k(!1);
                  var s = Number(r);
                  return k(!isNaN(s)), new O(s, n.size(), "final" === t);
                },
                e
              );
              return (
                (s.headers = { "X-Goog-Upload-Command": "query" }),
                (s.errorHandler = C(t)),
                s
              );
            })(this._ref.storage, this._ref._location, n, this._blob);
            const s = this._ref.storage._makeRequest(r, x, e, t);
            (this._request = s).getPromise().then((e) => {
              (this._request = void 0),
                this._updateProgress(e.current),
                (this._needToFetchStatus = !1),
                e.finalized && (this._needToFetchMetadata = !0),
                this.completeTransitions_();
            }, this._errorHandler);
          });
        }
        _continueUpload() {
          const n = 262144 * this._chunkMultiplier,
            i = new O(this._transferred, this._blob.size()),
            o = this._uploadUrl;
          this._resolveToken((e, t) => {
            let r;
            try {
              r = (function (e, i, t, o, r, a, s, n) {
                const h = new O(0, 0);
                if (
                  (s
                    ? ((h.current = s.current), (h.total = s.total))
                    : ((h.current = 0), (h.total = o.size())),
                  o.size() !== h.total)
                )
                  throw new p(
                    _.SERVER_FILE_WRONG_SIZE,
                    "Server recorded incorrect upload file size, please retry the upload."
                  );
                let l = (s = h.total - h.current);
                0 < r && (l = Math.min(l, r));
                var u = (r = h.current) + l,
                  s = {
                    "X-Goog-Upload-Command":
                      0 === l
                        ? "finalize"
                        : s === l
                        ? "upload, finalize"
                        : "upload",
                    "X-Goog-Upload-Offset": "" + h.current,
                  };
                const c = o.slice(r, u);
                if (null === c) throw $();
                u = i.maxUploadRetryTime;
                const d = new y(
                  t,
                  "POST",
                  function (e, t) {
                    var r = ge(e, ["active", "final"]),
                      s = h.current + l,
                      n = o.size(),
                      e = "final" === r ? A(i, a)(e, t) : null;
                    return new O(s, n, "final" === r, e);
                  },
                  u
                );
                return (
                  (d.headers = s),
                  (d.body = c.uploadData()),
                  (d.progressCallback = n || null),
                  (d.errorHandler = C(e)),
                  d
                );
              })(
                this._ref._location,
                this._ref.storage,
                o,
                this._blob,
                n,
                this._mappings,
                i,
                this._makeProgressCallback()
              );
            } catch (e) {
              return (this._error = e), void this._transition("error");
            }
            const s = this._ref.storage._makeRequest(r, x, e, t, !1);
            (this._request = s).getPromise().then((e) => {
              this._increaseMultiplier(),
                (this._request = void 0),
                this._updateProgress(e.current),
                e.finalized
                  ? ((this._metadata = e.metadata), this._transition("success"))
                  : this.completeTransitions_();
            }, this._errorHandler);
          });
        }
        _increaseMultiplier() {
          262144 * this._chunkMultiplier * 2 < 33554432 &&
            (this._chunkMultiplier *= 2);
        }
        _fetchMetadata() {
          this._resolveToken((e, t) => {
            var r = pe(this._ref.storage, this._ref._location, this._mappings);
            const s = this._ref.storage._makeRequest(r, x, e, t);
            (this._request = s).getPromise().then((e) => {
              (this._request = void 0),
                (this._metadata = e),
                this._transition("success");
            }, this._metadataErrorHandler);
          });
        }
        _oneShotUpload() {
          this._resolveToken((e, t) => {
            var r = (function (e, t, r, s, n) {
              var i = t.bucketOnlyServerUrl();
              const o = { "X-Goog-Upload-Protocol": "multipart" };
              var a = (function () {
                  let t = "";
                  for (let e = 0; e < 2; e++)
                    t += Math.random().toString().slice(2);
                  return t;
                })(),
                n =
                  ((o["Content-Type"] = "multipart/related; boundary=" + a),
                  fe(t, s, n)),
                h =
                  "--" +
                  a +
                  "\r\nContent-Type: application/json; charset=utf-8\r\n\r\n" +
                  ue(n, r) +
                  "\r\n--" +
                  a +
                  "\r\nContent-Type: " +
                  n.contentType +
                  "\r\n\r\n",
                a = "\r\n--" + a + "--";
              const l = T.getBlob(h, s, a);
              if (null === l) throw $();
              (a = { name: n.fullPath }),
                (n = g(i, e.host, e._protocol)),
                (i = e.maxUploadRetryTime);
              const u = new y(n, "POST", A(e, r), i);
              return (
                (u.urlParams = a),
                (u.headers = o),
                (u.body = l.uploadData()),
                (u.errorHandler = C(t)),
                u
              );
            })(
              this._ref.storage,
              this._ref._location,
              this._mappings,
              this._blob,
              this._metadata
            );
            const s = this._ref.storage._makeRequest(r, x, e, t);
            (this._request = s).getPromise().then((e) => {
              (this._request = void 0),
                (this._metadata = e),
                this._updateProgress(this._blob.size()),
                this._transition("success");
            }, this._errorHandler);
          });
        }
        _updateProgress(e) {
          var t = this._transferred;
          (this._transferred = e),
            this._transferred !== t && this._notifyObservers();
        }
        _transition(e) {
          if (this._state !== e)
            switch (e) {
              case "canceling":
              case "pausing":
                (this._state = e),
                  void 0 !== this._request
                    ? this._request.cancel()
                    : this.pendingTimeout &&
                      (clearTimeout(this.pendingTimeout),
                      (this.pendingTimeout = void 0),
                      this.completeTransitions_());
                break;
              case "running":
                var t = "paused" === this._state;
                (this._state = e),
                  t && (this._notifyObservers(), this._start());
                break;
              case "paused":
                (this._state = e), this._notifyObservers();
                break;
              case "canceled":
                (this._error = X()), (this._state = e), this._notifyObservers();
                break;
              case "error":
              case "success":
                (this._state = e), this._notifyObservers();
            }
        }
        completeTransitions_() {
          switch (this._state) {
            case "pausing":
              this._transition("paused");
              break;
            case "canceling":
              this._transition("canceled");
              break;
            case "running":
              this._start();
          }
        }
        get snapshot() {
          var e = me(this._state);
          return {
            bytesTransferred: this._transferred,
            totalBytes: this._blob.size(),
            state: e,
            metadata: this._metadata,
            task: this,
            ref: this._ref,
          };
        }
        on(e, t, r, s) {
          const n = new be(t || void 0, r || void 0, s || void 0);
          return (
            this._addObserver(n),
            () => {
              this._removeObserver(n);
            }
          );
        }
        then(e, t) {
          return this._promise.then(e, t);
        }
        catch(e) {
          return this.then(null, e);
        }
        _addObserver(e) {
          this._observers.push(e), this._notifyObserver(e);
        }
        _removeObserver(e) {
          e = this._observers.indexOf(e);
          -1 !== e && this._observers.splice(e, 1);
        }
        _notifyObservers() {
          this._finishPromise();
          const e = this._observers.slice();
          e.forEach((e) => {
            this._notifyObserver(e);
          });
        }
        _finishPromise() {
          if (void 0 !== this._resolve) {
            let e = !0;
            switch (me(this._state)) {
              case U.SUCCESS:
                N(this._resolve.bind(null, this.snapshot))();
                break;
              case U.CANCELED:
              case U.ERROR:
                const t = this._reject;
                N(t.bind(null, this._error))();
                break;
              default:
                e = !1;
            }
            e && ((this._resolve = void 0), (this._reject = void 0));
          }
        }
        _notifyObserver(e) {
          switch (me(this._state)) {
            case U.RUNNING:
            case U.PAUSED:
              e.next && N(e.next.bind(e, this.snapshot))();
              break;
            case U.SUCCESS:
              e.complete && N(e.complete.bind(e))();
              break;
            case U.CANCELED:
            case U.ERROR:
            default:
              e.error && N(e.error.bind(e, this._error))();
          }
        }
        resume() {
          var e = "paused" === this._state || "pausing" === this._state;
          return e && this._transition("running"), e;
        }
        pause() {
          var e = "running" === this._state;
          return e && this._transition("pausing"), e;
        }
        cancel() {
          var e = "running" === this._state || "pausing" === this._state;
          return e && this._transition("canceling"), e;
        }
      }
      class I {
        constructor(e, t) {
          (this._service = e),
            t instanceof d
              ? (this._location = t)
              : (this._location = d.makeFromUrl(t, e.host));
        }
        toString() {
          return "gs://" + this._location.bucket + "/" + this._location.path;
        }
        _newRef(e, t) {
          return new I(e, t);
        }
        get root() {
          var e = new d(this._location.bucket, "");
          return this._newRef(this._service, e);
        }
        get bucket() {
          return this._location.bucket;
        }
        get fullPath() {
          return this._location.path;
        }
        get name() {
          return oe(this._location.path);
        }
        get storage() {
          return this._service;
        }
        get parent() {
          var e = (function (e) {
            if (0 === e.length) return null;
            var t = e.lastIndexOf("/");
            return -1 === t ? "" : e.slice(0, t);
          })(this._location.path);
          return null === e
            ? null
            : ((e = new d(this._location.bucket, e)), new I(this._service, e));
        }
        _throwIfRoot(e) {
          if ("" === this._location.path) throw Z(e);
        }
      }
      function Re(e, t) {
        null != t &&
          "number" == typeof t.maxResults &&
          r("options.maxResults", 1, 1e3, t.maxResults);
        t = (function (e, t, r, s) {
          const n = {};
          t.isRoot ? (n.prefix = "") : (n.prefix = t.path + "/"),
            0 < "/".length && (n.delimiter = "/"),
            r && (n.pageToken = r),
            s && (n.maxResults = s);
          (r = g(t.bucketOnlyServerUrl(), e.host, e._protocol)),
            (s = e.maxOperationRetryTime);
          const i = new y(r, "GET", de(e, t.bucket), s);
          return (i.urlParams = n), (i.errorHandler = C(t)), i;
        })(e.storage, e._location, (t = t || {}).pageToken, t.maxResults);
        return e.storage.makeRequestWithTokens(t, x);
      }
      function Ee(e, t) {
        (r = e._location.path),
          (t = t
            .split("/")
            .filter((e) => 0 < e.length)
            .join("/"));
        var r,
          t = 0 === r.length ? t : r + "/" + t,
          t = new d(e._location.bucket, t);
        return new I(e.storage, t);
      }
      function we(e, t) {
        if (t && /^[A-Za-z]+:\/\//.test(t)) {
          if (e instanceof ke) return (r = e), (s = t), new I(r, s);
          throw h(
            "To use ref(service, url), the first argument must be a Storage instance."
          );
        }
        return (function e(t, r) {
          if (t instanceof ke) {
            var s = t;
            if (null == s._bucket)
              throw new p(
                _.NO_DEFAULT_BUCKET,
                "No default bucket found. Did you set the '" +
                  z +
                  "' property when initializing the app?"
              );
            return (s = new I(s, s._bucket)), null != r ? e(s, r) : s;
          }
          return void 0 !== r ? Ee(t, r) : t;
        })(e, t);
        var r, s;
      }
      function ye(e, t) {
        t = null == t ? void 0 : t[z];
        return null == t ? null : d.makeFromBucketSpec(t, e);
      }
      class ke {
        constructor(e, t, r, s, n) {
          (this.app = e),
            (this._authProvider = t),
            (this._appCheckProvider = r),
            (this._url = s),
            (this._firebaseVersion = n),
            (this._bucket = null),
            (this._host = W),
            (this._protocol = "https"),
            (this._appId = null),
            (this._deleted = !1),
            (this._maxOperationRetryTime = 12e4),
            (this._maxUploadRetryTime = 6e5),
            (this._requests = new Set()),
            (this._bucket =
              null != s
                ? d.makeFromBucketSpec(s, this._host)
                : ye(this._host, this.app.options));
        }
        get host() {
          return this._host;
        }
        set host(e) {
          (this._host = e),
            null != this._url
              ? (this._bucket = d.makeFromBucketSpec(this._url, e))
              : (this._bucket = ye(e, this.app.options));
        }
        get maxUploadRetryTime() {
          return this._maxUploadRetryTime;
        }
        set maxUploadRetryTime(e) {
          r("time", 0, Number.POSITIVE_INFINITY, e),
            (this._maxUploadRetryTime = e);
        }
        get maxOperationRetryTime() {
          return this._maxOperationRetryTime;
        }
        set maxOperationRetryTime(e) {
          r("time", 0, Number.POSITIVE_INFINITY, e),
            (this._maxOperationRetryTime = e);
        }
        async _getAuthToken() {
          if (this._overrideAuthToken) return this._overrideAuthToken;
          const e = this._authProvider.getImmediate({ optional: !0 });
          if (e) {
            var t = await e.getToken();
            if (null !== t) return t.accessToken;
          }
          return null;
        }
        async _getAppCheckToken() {
          const e = this._appCheckProvider.getImmediate({ optional: !0 });
          return e ? (await e.getToken()).token : null;
        }
        _delete() {
          return (
            this._deleted ||
              ((this._deleted = !0),
              this._requests.forEach((e) => e.cancel()),
              this._requests.clear()),
            Promise.resolve()
          );
        }
        _makeStorageReference(e) {
          return new I(this, e);
        }
        _makeRequest(e, t, r, s, n = !0) {
          if (this._deleted) return new J(K());
          {
            ([i, o, a, e, r, s, t = !0] = [
              e,
              this._appId,
              r,
              s,
              t,
              this._firebaseVersion,
              n,
            ]),
              (h = Q(i.urlParams)),
              (l = i.url + h),
              (n = h = Object.assign({}, i.headers)),
              o && (n["X-Firebase-GMPID"] = o),
              (o = h),
              null !== a && 0 < a.length && (o.Authorization = "Firebase " + a),
              (h["X-Firebase-Storage-Version"] =
                "webjs/" + (null != s ? s : "AppManager")),
              (s = h),
              null !== e && (s["X-Firebase-AppCheck"] = e);
            const u = new te(
              l,
              i.method,
              h,
              i.body,
              i.successCodes,
              i.additionalRetryCodes,
              i.handler,
              i.errorHandler,
              i.timeout,
              i.progressCallback,
              r,
              t
            );
            return (
              this._requests.add(u),
              u.getPromise().then(
                () => this._requests.delete(u),
                () => this._requests.delete(u)
              ),
              u
            );
          }
          var i, o, a, h, l;
        }
        async makeRequestWithTokens(e, t) {
          var [r, s] = await Promise.all([
            this._getAuthToken(),
            this._getAppCheckToken(),
          ]);
          return this._makeRequest(e, t, r, s).getPromise();
        }
      }
      var t = "@firebase/storage";
      function Ae(e, t) {
        return we((e = s(e)), t);
      }
      xe._registerComponent(
        new j(
          "storage",
          function (e, { instanceIdentifier: t }) {
            var r = e.getProvider("app").getImmediate(),
              s = e.getProvider("auth-internal"),
              e = e.getProvider("app-check-internal");
            return new ke(r, s, e, t, xe.SDK_VERSION);
          },
          "PUBLIC"
        ).setMultipleInstances(!0)
      ),
        xe.registerVersion(t, "0.13.4", ""),
        xe.registerVersion(t, "0.13.4", "esm2017");
      class P {
        constructor(e, t, r) {
          (this._delegate = e), (this.task = t), (this.ref = r);
        }
        get bytesTransferred() {
          return this._delegate.bytesTransferred;
        }
        get metadata() {
          return this._delegate.metadata;
        }
        get state() {
          return this._delegate.state;
        }
        get totalBytes() {
          return this._delegate.totalBytes;
        }
      }
      class Ce {
        constructor(e, t) {
          (this._delegate = e),
            (this._ref = t),
            (this.cancel = this._delegate.cancel.bind(this._delegate)),
            (this.catch = this._delegate.catch.bind(this._delegate)),
            (this.pause = this._delegate.pause.bind(this._delegate)),
            (this.resume = this._delegate.resume.bind(this._delegate));
        }
        get snapshot() {
          return new P(this._delegate.snapshot, this, this._ref);
        }
        then(t, e) {
          return this._delegate.then((e) => {
            if (t) return t(new P(e, this, this._ref));
          }, e);
        }
        on(e, t, r, s) {
          let n = void 0;
          return (
            t &&
              (n =
                "function" == typeof t
                  ? (e) => t(new P(e, this, this._ref))
                  : {
                      next: t.next
                        ? (e) => t.next(new P(e, this, this._ref))
                        : void 0,
                      complete: t.complete || void 0,
                      error: t.error || void 0,
                    }),
            this._delegate.on(e, n, r || void 0, s || void 0)
          );
        }
      }
      class Se {
        constructor(e, t) {
          (this._delegate = e), (this._service = t);
        }
        get prefixes() {
          return this._delegate.prefixes.map((e) => new D(e, this._service));
        }
        get items() {
          return this._delegate.items.map((e) => new D(e, this._service));
        }
        get nextPageToken() {
          return this._delegate.nextPageToken || null;
        }
      }
      class D {
        constructor(e, t) {
          (this._delegate = e), (this.storage = t);
        }
        get name() {
          return this._delegate.name;
        }
        get bucket() {
          return this._delegate.bucket;
        }
        get fullPath() {
          return this._delegate.fullPath;
        }
        toString() {
          return this._delegate.toString();
        }
        child(e) {
          e = Ee(this._delegate, e);
          return new D(e, this.storage);
        }
        get root() {
          return new D(this._delegate.root, this.storage);
        }
        get parent() {
          var e = this._delegate.parent;
          return null == e ? null : new D(e, this.storage);
        }
        put(e, t) {
          return (
            this._throwIfRoot("put"),
            new Ce(
              ((r = this._delegate),
              (e = e),
              (t = t),
              (r = s(r))._throwIfRoot("uploadBytesResumable"),
              new Te(r, new T(e), t)),
              this
            )
          );
          var r;
        }
        putString(e, t = b.RAW, r) {
          this._throwIfRoot("putString");
          t = re(t, e);
          const s = Object.assign({}, r);
          return (
            null == s.contentType &&
              null != t.contentType &&
              (s.contentType = t.contentType),
            new Ce(new Te(this._delegate, new T(t.data, !0), s), this)
          );
        }
        listAll() {
          return (function (e) {
            const t = { prefixes: [], items: [] };
            return (async function e(t, r, s) {
              s = await Re(t, { pageToken: s });
              r.prefixes.push(...s.prefixes),
                r.items.push(...s.items),
                null != s.nextPageToken && (await e(t, r, s.nextPageToken));
            })(e, t).then(() => t);
          })(s(this._delegate)).then((e) => new Se(e, this.storage));
        }
        list(e) {
          return Re(s(this._delegate), (e = e || void 0)).then(
            (e) => new Se(e, this.storage)
          );
        }
        getMetadata() {
          return (
            (e = e = s((e = this._delegate)))._throwIfRoot("getMetadata"),
            (t = pe(e.storage, e._location, w())),
            e.storage.makeRequestWithTokens(t, x)
          );
          var e, t;
        }
        updateMetadata(e) {
          return (
            (t = s(this._delegate)),
            (e = e),
            t._throwIfRoot("updateMetadata"),
            (e = (function (e, t, r, s) {
              var n = g(t.fullServerUrl(), e.host, e._protocol),
                r = ue(r, s),
                i = e.maxOperationRetryTime;
              const o = new y(n, "PATCH", A(e, s), i);
              return (
                (o.headers = {
                  "Content-Type": "application/json; charset=utf-8",
                }),
                (o.body = r),
                (o.errorHandler = S(t)),
                o
              );
            })(t.storage, t._location, e, w())),
            t.storage.makeRequestWithTokens(e, x)
          );
          var t;
        }
        getDownloadURL() {
          return (
            (e = s(this._delegate))._throwIfRoot("getDownloadURL"),
            (t = (function (e, t, r) {
              var s = g(t.fullServerUrl(), e.host, e._protocol),
                n = e.maxOperationRetryTime;
              const i = new y(s, "GET", _e(e, r), n);
              return (i.errorHandler = S(t)), i;
            })(e.storage, e._location, w())),
            e.storage.makeRequestWithTokens(t, x).then((e) => {
              if (null === e)
                throw new p(
                  _.NO_DOWNLOAD_URL,
                  "The given file does not have any download URLs."
                );
              return e;
            })
          );
          var e, t;
        }
        delete() {
          return (
            this._throwIfRoot("delete"),
            (e = s(this._delegate))._throwIfRoot("deleteObject"),
            (t = (function (e, t) {
              var r = g(t.fullServerUrl(), e.host, e._protocol),
                e = e.maxOperationRetryTime;
              const s = new y(r, "DELETE", function (e, t) {}, e);
              return (s.successCodes = [200, 204]), (s.errorHandler = S(t)), s;
            })(e.storage, e._location)),
            e.storage.makeRequestWithTokens(t, x)
          );
          var e, t;
        }
        _throwIfRoot(e) {
          if ("" === this._delegate._location.path) throw Z(e);
        }
      }
      class Oe {
        constructor(e, t) {
          (this.app = e), (this._delegate = t);
        }
        get maxOperationRetryTime() {
          return this._delegate.maxOperationRetryTime;
        }
        get maxUploadRetryTime() {
          return this._delegate.maxUploadRetryTime;
        }
        ref(e) {
          if (Ue(e))
            throw h(
              "ref() expected a child path but got a URL, use refFromURL instead."
            );
          return new D(Ae(this._delegate, e), this);
        }
        refFromURL(e) {
          if (!Ue(e))
            throw h(
              "refFromURL() expected a full URL but got a child path, use ref() instead."
            );
          try {
            d.makeFromUrl(e, this._delegate.host);
          } catch (e) {
            throw h(
              "refFromUrl() expected a valid full URL but got an invalid one."
            );
          }
          return new D(Ae(this._delegate, e), this);
        }
        setMaxUploadRetryTime(e) {
          this._delegate.maxUploadRetryTime = e;
        }
        setMaxOperationRetryTime(e) {
          this._delegate.maxOperationRetryTime = e;
        }
        useEmulator(e, t, r = {}) {
          var s;
          ([s, e, t, r = {}] = [this._delegate, e, t, r]),
            ([s, e, t, r = {}] = [s, e, t, r]),
            (s.host = e + ":" + t),
            (s._protocol = "http"),
            (e = r.mockUserToken) &&
              (s._overrideAuthToken =
                "string" == typeof e
                  ? e
                  : (function (e, t) {
                      if (e.uid)
                        throw new Error(
                          'The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.'
                        );
                      var t = t || "demo-project",
                        r = e.iat || 0,
                        s = e.sub || e.user_id;
                      if (s)
                        return (
                          (s = Object.assign(
                            {
                              iss: "https://securetoken.google.com/" + t,
                              aud: t,
                              iat: r,
                              exp: r + 3600,
                              auth_time: r,
                              sub: s,
                              user_id: s,
                              firebase: {
                                sign_in_provider: "custom",
                                identities: {},
                              },
                            },
                            e
                          )),
                          [
                            F(JSON.stringify({ alg: "none", type: "JWT" })),
                            F(JSON.stringify(s)),
                            "",
                          ].join(".")
                        );
                      throw new Error(
                        "mockUserToken must contain 'sub' or 'user_id' field!"
                      );
                    })(e, s.app.options.projectId));
        }
      }
      function Ue(e) {
        return /^[A-Za-z]+:\/\//.test(e);
      }
      (t = e.default),
        (e = {
          TaskState: U,
          TaskEvent: { STATE_CHANGED: "state_changed" },
          StringFormat: b,
          Storage: Oe,
          Reference: D,
        }),
        t.INTERNAL.registerComponent(
          new j(
            "storage-compat",
            function (e, { instanceIdentifier: t }) {
              var r = e.getProvider("app-compat").getImmediate(),
                e = e.getProvider("storage").getImmediate({ identifier: t });
              return new Oe(r, e);
            },
            "PUBLIC"
          )
            .setServiceProps(e)
            .setMultipleInstances(!0)
        ),
        t.registerVersion("@firebase/storage-compat", "0.3.14");
    }.apply(this, arguments);
  } catch (e) {
    throw (
      (console.error(e),
      new Error(
        "Cannot instantiate firebase-storage-compat.js - be sure to load firebase-app.js first."
      ))
    );
  }
});
