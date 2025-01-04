!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((e =
        "undefined" != typeof globalThis ? globalThis : e || self).firebase =
        t());
})(this, function () {
  "use strict";
  const r = function (r) {
      const n = [];
      let i = 0;
      for (let t = 0; t < r.length; t++) {
        let e = r.charCodeAt(t);
        e < 128
          ? (n[i++] = e)
          : (e < 2048
              ? (n[i++] = (e >> 6) | 192)
              : (55296 == (64512 & e) &&
                t + 1 < r.length &&
                56320 == (64512 & r.charCodeAt(t + 1))
                  ? ((e =
                      65536 + ((1023 & e) << 10) + (1023 & r.charCodeAt(++t))),
                    (n[i++] = (e >> 18) | 240),
                    (n[i++] = ((e >> 12) & 63) | 128))
                  : (n[i++] = (e >> 12) | 224),
                (n[i++] = ((e >> 6) & 63) | 128)),
            (n[i++] = (63 & e) | 128));
      }
      return n;
    },
    n = {
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
      encodeByteArray(n, e) {
        if (!Array.isArray(n))
          throw Error("encodeByteArray takes an array as a parameter");
        this.init_();
        var i = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
        const a = [];
        for (let r = 0; r < n.length; r += 3) {
          var s = n[r],
            o = r + 1 < n.length,
            c = o ? n[r + 1] : 0,
            l = r + 2 < n.length,
            h = l ? n[r + 2] : 0;
          let e = ((15 & c) << 2) | (h >> 6),
            t = 63 & h;
          l || ((t = 64), o || (e = 64)),
            a.push(i[s >> 2], i[((3 & s) << 4) | (c >> 4)], i[e], i[t]);
        }
        return a.join("");
      },
      encodeString(e, t) {
        return this.HAS_NATIVE_SUPPORT && !t
          ? btoa(e)
          : this.encodeByteArray(r(e), t);
      },
      decodeString(r, n) {
        if (this.HAS_NATIVE_SUPPORT && !n) return atob(r);
        {
          var i = this.decodeStringToByteArray(r, n);
          const c = [];
          let e = 0,
            t = 0;
          for (; e < i.length; ) {
            var a,
              s,
              o = i[e++];
            o < 128
              ? (c[t++] = String.fromCharCode(o))
              : 191 < o && o < 224
              ? ((a = i[e++]),
                (c[t++] = String.fromCharCode(((31 & o) << 6) | (63 & a))))
              : 239 < o && o < 365
              ? ((s =
                  (((7 & o) << 18) |
                    ((63 & i[e++]) << 12) |
                    ((63 & i[e++]) << 6) |
                    (63 & i[e++])) -
                  65536),
                (c[t++] = String.fromCharCode(55296 + (s >> 10))),
                (c[t++] = String.fromCharCode(56320 + (1023 & s))))
              : ((a = i[e++]),
                (s = i[e++]),
                (c[t++] = String.fromCharCode(
                  ((15 & o) << 12) | ((63 & a) << 6) | (63 & s)
                )));
          }
          return c.join("");
        }
      },
      decodeStringToByteArray(t, e) {
        this.init_();
        var r = e ? this.charToByteMapWebSafe_ : this.charToByteMap_;
        const n = [];
        for (let e = 0; e < t.length; ) {
          var i = r[t.charAt(e++)],
            a = e < t.length ? r[t.charAt(e)] : 0,
            s = ++e < t.length ? r[t.charAt(e)] : 64,
            o = ++e < t.length ? r[t.charAt(e)] : 64;
          if ((++e, null == i || null == a || null == s || null == o))
            throw new M();
          n.push((i << 2) | (a >> 4)),
            64 !== s &&
              (n.push(((a << 4) & 240) | (s >> 2)),
              64 !== o && n.push(((s << 6) & 192) | o));
        }
        return n;
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
              (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e) >=
                this.ENCODED_VALS_BASE.length &&
                ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e),
                (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e));
        }
      },
    };
  class M extends Error {
    constructor() {
      super(...arguments), (this.name = "DecodeBase64StringError");
    }
  }
  function a(e) {
    return (e = r(e)), n.encodeByteArray(e, !0).replace(/\./g, "");
  }
  function o(e, t) {
    if (!(t instanceof Object)) return t;
    switch (t.constructor) {
      case Date:
        const r = t;
        return new Date(r.getTime());
      case Object:
        void 0 === e && (e = {});
        break;
      case Array:
        e = [];
        break;
      default:
        return t;
    }
    for (const n in t)
      t.hasOwnProperty(n) && "__proto__" !== n && (e[n] = o(e[n], t[n]));
    return e;
  }
  function t() {
    if ("undefined" != typeof self) return self;
    if ("undefined" != typeof window) return window;
    if ("undefined" != typeof global) return global;
    throw new Error("Unable to locate global object.");
  }
  const F = () => {
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
              return n.decodeString(e, !0);
            } catch (e) {
              console.error("base64Decode failed: ", e);
            }
            return null;
          })(e[1]);
        return t && JSON.parse(t);
      }
    },
    j = () => {
      var e;
      return null ==
        (e = (() => {
          try {
            return (
              t().__FIREBASE_DEFAULTS__ ||
              (() => {
                var e;
                if ("undefined" != typeof process && void 0 !== process.env)
                  return (e = process.env.__FIREBASE_DEFAULTS__)
                    ? JSON.parse(e)
                    : void 0;
              })() ||
              F()
            );
          } catch (e) {
            return void console.info(
              "Unable to get __FIREBASE_DEFAULTS__ due to: " + e
            );
          }
        })())
        ? void 0
        : e.config;
    };
  class z {
    constructor() {
      (this.reject = () => {}),
        (this.resolve = () => {}),
        (this.promise = new Promise((e, t) => {
          (this.resolve = e), (this.reject = t);
        }));
    }
    wrapCallback(r) {
      return (e, t) => {
        e ? this.reject(e) : this.resolve(t),
          "function" == typeof r &&
            (this.promise.catch(() => {}), 1 === r.length ? r(e) : r(e, t));
      };
    }
  }
  function H() {
    return (
      "undefined" != typeof WorkerGlobalScope &&
      "undefined" != typeof self &&
      self instanceof WorkerGlobalScope
    );
  }
  class s extends Error {
    constructor(e, t, r) {
      super(t),
        (this.code = e),
        (this.customData = r),
        (this.name = "FirebaseError"),
        Object.setPrototypeOf(this, s.prototype),
        Error.captureStackTrace &&
          Error.captureStackTrace(this, i.prototype.create);
    }
  }
  class i {
    constructor(e, t, r) {
      (this.service = e), (this.serviceName = t), (this.errors = r);
    }
    create(e, ...t) {
      var n,
        t = t[0] || {},
        r = this.service + "/" + e,
        e = (e = this.errors[e])
          ? ((n = t),
            e.replace(x, (e, t) => {
              var r = n[t];
              return null != r ? String(r) : `<${t}?>`;
            }))
          : "Error",
        e = this.serviceName + `: ${e} (${r}).`;
      return new s(r, e, t);
    }
  }
  const x = /\{\$([^}]+)}/g;
  function V(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }
  function c(e, t) {
    if (e === t) return 1;
    const r = Object.keys(e),
      n = Object.keys(t);
    for (const s of r) {
      if (!n.includes(s)) return;
      var i = e[s],
        a = t[s];
      if ($(i) && $(a)) {
        if (!c(i, a)) return;
      } else if (i !== a) return;
    }
    for (const o of n) if (!r.includes(o)) return;
    return 1;
  }
  function $(e) {
    return null !== e && "object" == typeof e;
  }
  function W(e, t) {
    const r = new U(e, t);
    return r.subscribe.bind(r);
  }
  class U {
    constructor(e, t) {
      (this.observers = []),
        (this.unsubscribes = []),
        (this.observerCount = 0),
        (this.task = Promise.resolve()),
        (this.finalized = !1),
        (this.onNoObservers = t),
        this.task
          .then(() => {
            e(this);
          })
          .catch((e) => {
            this.error(e);
          });
    }
    next(t) {
      this.forEachObserver((e) => {
        e.next(t);
      });
    }
    error(t) {
      this.forEachObserver((e) => {
        e.error(t);
      }),
        this.close(t);
    }
    complete() {
      this.forEachObserver((e) => {
        e.complete();
      }),
        this.close();
    }
    subscribe(e, t, r) {
      let n;
      if (void 0 === e && void 0 === t && void 0 === r)
        throw new Error("Missing Observer.");
      void 0 ===
        (n = (function (e) {
          if ("object" == typeof e && null !== e)
            for (const t of ["next", "error", "complete"])
              if (t in e && "function" == typeof e[t]) return 1;
        })(e)
          ? e
          : { next: e, error: t, complete: r }).next && (n.next = l),
        void 0 === n.error && (n.error = l),
        void 0 === n.complete && (n.complete = l);
      e = this.unsubscribeOne.bind(this, this.observers.length);
      return (
        this.finalized &&
          this.task.then(() => {
            try {
              this.finalError ? n.error(this.finalError) : n.complete();
            } catch (e) {}
          }),
        this.observers.push(n),
        e
      );
    }
    unsubscribeOne(e) {
      void 0 !== this.observers &&
        void 0 !== this.observers[e] &&
        (delete this.observers[e],
        --this.observerCount,
        0 === this.observerCount &&
          void 0 !== this.onNoObservers &&
          this.onNoObservers(this));
    }
    forEachObserver(t) {
      if (!this.finalized)
        for (let e = 0; e < this.observers.length; e++) this.sendOne(e, t);
    }
    sendOne(e, t) {
      this.task.then(() => {
        if (void 0 !== this.observers && void 0 !== this.observers[e])
          try {
            t(this.observers[e]);
          } catch (e) {
            "undefined" != typeof console && console.error && console.error(e);
          }
      });
    }
    close(e) {
      this.finalized ||
        ((this.finalized = !0),
        void 0 !== e && (this.finalError = e),
        this.task.then(() => {
          (this.observers = void 0), (this.onNoObservers = void 0);
        }));
    }
  }
  function l() {}
  class h {
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
  const d = "[DEFAULT]";
  class G {
    constructor(e, t) {
      (this.name = e),
        (this.container = t),
        (this.component = null),
        (this.instances = new Map()),
        (this.instancesDeferred = new Map()),
        (this.instancesOptions = new Map()),
        (this.onInitCallbacks = new Map());
    }
    get(e) {
      var t = this.normalizeInstanceIdentifier(e);
      if (!this.instancesDeferred.has(t)) {
        const n = new z();
        if (
          (this.instancesDeferred.set(t, n),
          this.isInitialized(t) || this.shouldAutoInitialize())
        )
          try {
            var r = this.getOrInitializeService({ instanceIdentifier: t });
            r && n.resolve(r);
          } catch (e) {}
      }
      return this.instancesDeferred.get(t).promise;
    }
    getImmediate(e) {
      var t = this.normalizeInstanceIdentifier(
          null == e ? void 0 : e.identifier
        ),
        r = null != (r = null == e ? void 0 : e.optional) && r;
      if (!this.isInitialized(t) && !this.shouldAutoInitialize()) {
        if (r) return null;
        throw Error(`Service ${this.name} is not available`);
      }
      try {
        return this.getOrInitializeService({ instanceIdentifier: t });
      } catch (e) {
        if (r) return null;
        throw e;
      }
    }
    getComponent() {
      return this.component;
    }
    setComponent(e) {
      if (e.name !== this.name)
        throw Error(
          `Mismatching Component ${e.name} for Provider ${this.name}.`
        );
      if (this.component)
        throw Error(`Component for ${this.name} has already been provided`);
      if (((this.component = e), this.shouldAutoInitialize())) {
        if ("EAGER" === e.instantiationMode)
          try {
            this.getOrInitializeService({ instanceIdentifier: d });
          } catch (e) {}
        for (var [t, r] of this.instancesDeferred.entries()) {
          t = this.normalizeInstanceIdentifier(t);
          try {
            var n = this.getOrInitializeService({ instanceIdentifier: t });
            r.resolve(n);
          } catch (e) {}
        }
      }
    }
    clearInstance(e = d) {
      this.instancesDeferred.delete(e),
        this.instancesOptions.delete(e),
        this.instances.delete(e);
    }
    async delete() {
      const e = Array.from(this.instances.values());
      await Promise.all([
        ...e.filter((e) => "INTERNAL" in e).map((e) => e.INTERNAL.delete()),
        ...e.filter((e) => "_delete" in e).map((e) => e._delete()),
      ]);
    }
    isComponentSet() {
      return null != this.component;
    }
    isInitialized(e = d) {
      return this.instances.has(e);
    }
    getOptions(e = d) {
      return this.instancesOptions.get(e) || {};
    }
    initialize(e = {}) {
      var { options: t = {} } = e,
        r = this.normalizeInstanceIdentifier(e.instanceIdentifier);
      if (this.isInitialized(r))
        throw Error(this.name + `(${r}) has already been initialized`);
      if (!this.isComponentSet())
        throw Error(`Component ${this.name} has not been registered yet`);
      var n,
        i,
        a = this.getOrInitializeService({ instanceIdentifier: r, options: t });
      for ([n, i] of this.instancesDeferred.entries())
        r === this.normalizeInstanceIdentifier(n) && i.resolve(a);
      return a;
    }
    onInit(e, t) {
      t = this.normalizeInstanceIdentifier(t);
      const r = null != (n = this.onInitCallbacks.get(t)) ? n : new Set();
      r.add(e), this.onInitCallbacks.set(t, r);
      var n = this.instances.get(t);
      return (
        n && e(n, t),
        () => {
          r.delete(e);
        }
      );
    }
    invokeOnInitCallbacks(e, t) {
      var r = this.onInitCallbacks.get(t);
      if (r)
        for (const n of r)
          try {
            n(e, t);
          } catch (e) {}
    }
    getOrInitializeService({ instanceIdentifier: e, options: t = {} }) {
      let r = this.instances.get(e);
      if (
        !r &&
        this.component &&
        ((r = this.component.instanceFactory(this.container, {
          instanceIdentifier: (n = e) === d ? void 0 : n,
          options: t,
        })),
        this.instances.set(e, r),
        this.instancesOptions.set(e, t),
        this.invokeOnInitCallbacks(r, e),
        this.component.onInstanceCreated)
      )
        try {
          this.component.onInstanceCreated(this.container, e, r);
        } catch (e) {}
      var n;
      return r || null;
    }
    normalizeInstanceIdentifier(e = d) {
      return !this.component || this.component.multipleInstances ? e : d;
    }
    shouldAutoInitialize() {
      return (
        !!this.component && "EXPLICIT" !== this.component.instantiationMode
      );
    }
  }
  class J {
    constructor(e) {
      (this.name = e), (this.providers = new Map());
    }
    addComponent(e) {
      const t = this.getProvider(e.name);
      if (t.isComponentSet())
        throw new Error(
          `Component ${e.name} has already been registered with ` + this.name
        );
      t.setComponent(e);
    }
    addOrOverwriteComponent(e) {
      const t = this.getProvider(e.name);
      t.isComponentSet() && this.providers.delete(e.name), this.addComponent(e);
    }
    getProvider(e) {
      if (this.providers.has(e)) return this.providers.get(e);
      var t = new G(e, this);
      return this.providers.set(e, t), t;
    }
    getProviders() {
      return Array.from(this.providers.values());
    }
  }
  const p = [];
  var u, f;
  u = {
    DEBUG: 0,
    0: "DEBUG",
    VERBOSE: 1,
    1: "VERBOSE",
    INFO: 2,
    2: "INFO",
    WARN: 3,
    3: "WARN",
    ERROR: 4,
    4: "ERROR",
    SILENT: 5,
    5: "SILENT",
  };
  const K = {
      debug: u.DEBUG,
      verbose: u.VERBOSE,
      info: u.INFO,
      warn: u.WARN,
      error: u.ERROR,
      silent: u.SILENT,
    },
    Y = u.INFO,
    X = {
      [u.DEBUG]: "log",
      [u.VERBOSE]: "log",
      [u.INFO]: "info",
      [u.WARN]: "warn",
      [u.ERROR]: "error",
    },
    q = (e, t, ...r) => {
      if (!(t < e.logLevel)) {
        var n = new Date().toISOString(),
          i = X[t];
        if (!i)
          throw new Error(
            `Attempted to log a message with an invalid logType (value: ${t})`
          );
        console[i](`[${n}]  ${e.name}:`, ...r);
      }
    };
  class Z {
    constructor(e) {
      (this.name = e),
        (this._logLevel = Y),
        (this._logHandler = q),
        (this._userLogHandler = null),
        p.push(this);
    }
    get logLevel() {
      return this._logLevel;
    }
    set logLevel(e) {
      if (!(e in u))
        throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
      this._logLevel = e;
    }
    setLogLevel(e) {
      this._logLevel = "string" == typeof e ? K[e] : e;
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
      this._userLogHandler && this._userLogHandler(this, u.DEBUG, ...e),
        this._logHandler(this, u.DEBUG, ...e);
    }
    log(...e) {
      this._userLogHandler && this._userLogHandler(this, u.VERBOSE, ...e),
        this._logHandler(this, u.VERBOSE, ...e);
    }
    info(...e) {
      this._userLogHandler && this._userLogHandler(this, u.INFO, ...e),
        this._logHandler(this, u.INFO, ...e);
    }
    warn(...e) {
      this._userLogHandler && this._userLogHandler(this, u.WARN, ...e),
        this._logHandler(this, u.WARN, ...e);
    }
    error(...e) {
      this._userLogHandler && this._userLogHandler(this, u.ERROR, ...e),
        this._logHandler(this, u.ERROR, ...e);
    }
  }
  const Q = (t, e) => e.some((e) => t instanceof e);
  let ee, te;
  const re = new WeakMap(),
    g = new WeakMap(),
    ne = new WeakMap(),
    b = new WeakMap(),
    m = new WeakMap();
  let v = {
    get(e, t, r) {
      if (e instanceof IDBTransaction) {
        if ("done" === t) return g.get(e);
        if ("objectStoreNames" === t) return e.objectStoreNames || ne.get(e);
        if ("store" === t)
          return r.objectStoreNames[1]
            ? void 0
            : r.objectStore(r.objectStoreNames[0]);
      }
      return _(e[t]);
    },
    set(e, t, r) {
      return (e[t] = r), !0;
    },
    has(e, t) {
      return (
        (e instanceof IDBTransaction && ("done" === t || "store" === t)) ||
        t in e
      );
    },
  };
  function ie(e) {
    return "function" == typeof e
      ? (r = e) !== IDBDatabase.prototype.transaction ||
        "objectStoreNames" in IDBTransaction.prototype
        ? (te = te || [
            IDBCursor.prototype.advance,
            IDBCursor.prototype.continue,
            IDBCursor.prototype.continuePrimaryKey,
          ]).includes(r)
          ? function (...e) {
              return r.apply(y(this), e), _(re.get(this));
            }
          : function (...e) {
              return _(r.apply(y(this), e));
            }
        : function (e, ...t) {
            t = r.call(y(this), e, ...t);
            return ne.set(t, e.sort ? e.sort() : [e]), _(t);
          }
      : (e instanceof IDBTransaction &&
          ((a = e),
          g.has(a) ||
            ((t = new Promise((e, t) => {
              const r = () => {
                  a.removeEventListener("complete", n),
                    a.removeEventListener("error", i),
                    a.removeEventListener("abort", i);
                },
                n = () => {
                  e(), r();
                },
                i = () => {
                  t(a.error || new DOMException("AbortError", "AbortError")),
                    r();
                };
              a.addEventListener("complete", n),
                a.addEventListener("error", i),
                a.addEventListener("abort", i);
            })),
            g.set(a, t))),
        Q(
          e,
          (ee = ee || [
            IDBDatabase,
            IDBObjectStore,
            IDBIndex,
            IDBCursor,
            IDBTransaction,
          ])
        )
          ? new Proxy(e, v)
          : e);
    var r, a, t;
  }
  function _(e) {
    if (e instanceof IDBRequest) {
      var a = e;
      const r = new Promise((e, t) => {
        const r = () => {
            a.removeEventListener("success", n),
              a.removeEventListener("error", i);
          },
          n = () => {
            e(_(a.result)), r();
          },
          i = () => {
            t(a.error), r();
          };
        a.addEventListener("success", n), a.addEventListener("error", i);
      });
      return (
        r
          .then((e) => {
            e instanceof IDBCursor && re.set(e, a);
          })
          .catch(() => {}),
        m.set(r, a),
        r
      );
    }
    if (b.has(e)) return b.get(e);
    var t = ie(e);
    return t !== e && (b.set(e, t), m.set(t, e)), t;
  }
  const y = (e) => m.get(e),
    ae = ["get", "getKey", "getAll", "getAllKeys", "count"],
    se = ["put", "add", "delete", "clear"],
    E = new Map();
  function oe(e, t) {
    if (e instanceof IDBDatabase && !(t in e) && "string" == typeof t) {
      if (E.get(t)) return E.get(t);
      const n = t.replace(/FromIndex$/, ""),
        i = t !== n,
        a = se.includes(n);
      return n in (i ? IDBIndex : IDBObjectStore).prototype &&
        (a || ae.includes(n))
        ? ((e = async function (e, ...t) {
            e = this.transaction(e, a ? "readwrite" : "readonly");
            let r = e.store;
            return (
              i && (r = r.index(t.shift())),
              (await Promise.all([r[n](...t), a && e.done]))[0]
            );
          }),
          E.set(t, e),
          e)
        : void 0;
    }
  }
  v = {
    ...(f = v),
    get: (e, t, r) => oe(e, t) || f.get(e, t, r),
    has: (e, t) => !!oe(e, t) || f.has(e, t),
  };
  class ce {
    constructor(e) {
      this.container = e;
    }
    getPlatformInfoString() {
      const e = this.container.getProviders();
      return e
        .map((e) => {
          if ("VERSION" !== (null == (t = e.getComponent()) ? void 0 : t.type))
            return null;
          var t = e.getImmediate();
          return t.library + "/" + t.version;
        })
        .filter((e) => e)
        .join(" ");
    }
  }
  const w = "@firebase/app",
    C = "0.10.16",
    D = new Z("@firebase/app"),
    I = "[DEFAULT]",
    le = {
      "@firebase/app": "fire-core",
      "@firebase/app-compat": "fire-core-compat",
      "@firebase/analytics": "fire-analytics",
      "@firebase/analytics-compat": "fire-analytics-compat",
      "@firebase/app-check": "fire-app-check",
      "@firebase/app-check-compat": "fire-app-check-compat",
      "@firebase/auth": "fire-auth",
      "@firebase/auth-compat": "fire-auth-compat",
      "@firebase/database": "fire-rtdb",
      "@firebase/data-connect": "fire-data-connect",
      "@firebase/database-compat": "fire-rtdb-compat",
      "@firebase/functions": "fire-fn",
      "@firebase/functions-compat": "fire-fn-compat",
      "@firebase/installations": "fire-iid",
      "@firebase/installations-compat": "fire-iid-compat",
      "@firebase/messaging": "fire-fcm",
      "@firebase/messaging-compat": "fire-fcm-compat",
      "@firebase/performance": "fire-perf",
      "@firebase/performance-compat": "fire-perf-compat",
      "@firebase/remote-config": "fire-rc",
      "@firebase/remote-config-compat": "fire-rc-compat",
      "@firebase/storage": "fire-gcs",
      "@firebase/storage-compat": "fire-gcs-compat",
      "@firebase/firestore": "fire-fst",
      "@firebase/firestore-compat": "fire-fst-compat",
      "@firebase/vertexai": "fire-vertex",
      "fire-js": "fire-js",
      firebase: "fire-js-all",
    },
    S = new Map(), O = new Map(),
    A = new Map();
  function L(t, r) {
    try {
      t.container.addComponent(r);
    } catch (e) {
      D.debug(
        `Component ${r.name} failed to register with FirebaseApp ` + t.name,
        e
      );
    }
  }
  function he(e, t) {
    e.container.addOrOverwriteComponent(t);
  }
  function N(e) {
    var t = e.name;
    if (A.has(t))
      return (
        D.debug(`There were multiple attempts to register component ${t}.`), !1
      );
    A.set(t, e);
    for (const r of S.values()) L(r, e);
    for (const n of O.values()) L(n, e);
    return !0;
  }
  function de(e, t) {
    const r = e.container
      .getProvider("heartbeat")
      .getImmediate({ optional: !0 });
    return r && r.triggerHeartbeat(), e.container.getProvider(t);
  }
  function pe(e) {
    return void 0 !== e.options;
  }
  const B = new i("app", "Firebase", {
    "no-app":
      "No Firebase App '{$appName}' has been created - call initializeApp() first",
    "bad-app-name": "Illegal App name: '{$appName}'",
    "duplicate-app":
      "Firebase App named '{$appName}' already exists with different options or config",
    "app-deleted": "Firebase App named '{$appName}' already deleted",
    "server-app-deleted": "Firebase Server App has been deleted",
    "no-options":
      "Need to provide options, when not being deployed to hosting via source.",
    "invalid-app-argument":
      "firebase.{$appName}() takes either no argument or a Firebase App instance.",
    "invalid-log-argument":
      "First argument to `onLog` must be null or a function.",
    "idb-open":
      "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-get":
      "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-set":
      "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-delete":
      "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
    "finalization-registry-not-supported":
      "FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",
    "invalid-server-app-environment":
      "FirebaseServerApp is not for use in browser environments.",
  });
  class ue {
    constructor(e, t, r) {
      (this._isDeleted = !1),
        (this._options = Object.assign({}, e)),
        (this._config = Object.assign({}, t)),
        (this._name = t.name),
        (this._automaticDataCollectionEnabled =
          t.automaticDataCollectionEnabled),
        (this._container = r),
        this.container.addComponent(new h("app", () => this, "PUBLIC"));
    }
    get automaticDataCollectionEnabled() {
      return this.checkDestroyed(), this._automaticDataCollectionEnabled;
    }
    set automaticDataCollectionEnabled(e) {
      this.checkDestroyed(), (this._automaticDataCollectionEnabled = e);
    }
    get name() {
      return this.checkDestroyed(), this._name;
    }
    get options() {
      return this.checkDestroyed(), this._options;
    }
    get config() {
      return this.checkDestroyed(), this._config;
    }
    get container() {
      return this._container;
    }
    get isDeleted() {
      return this._isDeleted;
    }
    set isDeleted(e) {
      this._isDeleted = e;
    }
    checkDestroyed() {
      if (this.isDeleted)
        throw B.create("app-deleted", { appName: this._name });
    }
  }
  class fe extends ue {
    constructor(e, t, r, n) {
      var i =
          void 0 !== t.automaticDataCollectionEnabled &&
          t.automaticDataCollectionEnabled,
        r = { name: r, automaticDataCollectionEnabled: i };
      void 0 !== e.apiKey ? super(e, r, n) : super(e.options, r, n),
        (this._serverConfig = Object.assign(
          { automaticDataCollectionEnabled: i },
          t
        )),
        (this._finalizationRegistry = null),
        "undefined" != typeof FinalizationRegistry &&
          (this._finalizationRegistry = new FinalizationRegistry(() => {
            this.automaticCleanup();
          })),
        (this._refCount = 0),
        this.incRefCount(this._serverConfig.releaseOnDeref),
        (this._serverConfig.releaseOnDeref = void 0),
        (t.releaseOnDeref = void 0),
        R(w, C, "serverapp");
    }
    toJSON() {}
    get refCount() {
      return this._refCount;
    }
    incRefCount(e) {
      this.isDeleted ||
        (this._refCount++,
        void 0 !== e &&
          null !== this._finalizationRegistry &&
          this._finalizationRegistry.register(e, this));
    }
    decRefCount() {
      return this.isDeleted ? 0 : --this._refCount;
    }
    automaticCleanup() {
      e(this);
    }
    get settings() {
      return this.checkDestroyed(), this._serverConfig;
    }
    checkDestroyed() {
      if (this.isDeleted) throw B.create("server-app-deleted");
    }
  }
  function T(e, t = {}) {
    if ("object" != typeof t) {
      const r = t;
      t = { name: r };
    }
    t = Object.assign({ name: I, automaticDataCollectionEnabled: !1 }, t);
    const r = t.name;
    if ("string" != typeof r || !r)
      throw B.create("bad-app-name", { appName: String(r) });
    if (!(e = e || j())) throw B.create("no-options");
    var n = S.get(r);
    if (n) {
      if (c(e, n.options) && c(t, n.config)) return n;
      throw B.create("duplicate-app", { appName: r });
    }
    const i = new J(r);
    for (const a of A.values()) i.addComponent(a);
    return (t = new ue(e, t, i)), S.set(r, t), t;
  }
  async function e(e) {
    let t = !1;
    var r = e.name;
    if (S.has(r)) (t = !0), S.delete(r);
    else if (O.has(r)) {
      const n = e;
      n.decRefCount() <= 0 && (O.delete(r), (t = !0));
    }
    t &&
      (await Promise.all(e.container.getProviders().map((e) => e.delete())),
      (e.isDeleted = !0));
  }
  function R(e, t, r) {
    let n = null != (i = le[e]) ? i : e;
    r && (n += "-" + r);
    var e = n.match(/\s|\//),
      i = t.match(/\s|\//);
    if (e || i) {
      const a = [`Unable to register library "${n}" with version "${t}":`];
      return (
        e &&
          a.push(
            `library name "${n}" contains illegal characters (whitespace or "/")`
          ),
        e && i && a.push("and"),
        i &&
          a.push(
            `version name "${t}" contains illegal characters (whitespace or "/")`
          ),
        void D.warn(a.join(" "))
      );
    }
    N(new h(n + "-version", () => ({ library: n, version: t }), "VERSION"));
  }
  function ge(e, t) {
    if (null !== e && "function" != typeof e)
      throw B.create("invalid-log-argument");
    var a = e,
      r = t;
    for (const n of p) {
      let i = null;
      r && r.level && (i = K[r.level]),
        (n.userLogHandler =
          null === a
            ? null
            : (e, t, ...r) => {
                var n = r
                  .map((e) => {
                    if (null == e) return null;
                    if ("string" == typeof e) return e;
                    if ("number" == typeof e || "boolean" == typeof e)
                      return e.toString();
                    if (e instanceof Error) return e.message;
                    try {
                      return JSON.stringify(e);
                    } catch (e) {
                      return null;
                    }
                  })
                  .filter((e) => e)
                  .join(" ");
                t >= (null !== i && void 0 !== i ? i : e.logLevel) &&
                  a({
                    level: u[t].toLowerCase(),
                    message: n,
                    args: r,
                    type: e.name,
                  });
              });
    }
  }
  function be(e) {
    var t = e;
    p.forEach((e) => {
      e.setLogLevel(t);
    });
  }
  const P = "firebase-heartbeat-store";
  let me = null;
  function ve() {
    return (me =
      me ||
      (function ({ blocked: t, upgrade: r, blocking: n, terminated: i }) {
        const a = indexedDB.open("firebase-heartbeat-database", 1),
          e = _(a);
        return (
          r &&
            a.addEventListener("upgradeneeded", (e) => {
              r(_(a.result), e.oldVersion, e.newVersion, _(a.transaction), e);
            }),
          t &&
            a.addEventListener("blocked", (e) =>
              t(e.oldVersion, e.newVersion, e)
            ),
          e
            .then((e) => {
              i && e.addEventListener("close", () => i()),
                n &&
                  e.addEventListener("versionchange", (e) =>
                    n(e.oldVersion, e.newVersion, e)
                  );
            })
            .catch(() => {}),
          e
        );
      })({
        upgrade: (e, t) => {
          if (0 === t)
            try {
              e.createObjectStore(P);
            } catch (e) {
              console.warn(e);
            }
        },
      }).catch((e) => {
        throw B.create("idb-open", { originalErrorMessage: e.message });
      }));
  }
  async function _e(e, t) {
    try {
      const r = await ve(),
        n = r.transaction(P, "readwrite"),
        i = n.objectStore(P);
      await i.put(t, ye(e)), await n.done;
    } catch (e) {
      e instanceof s
        ? D.warn(e.message)
        : ((t = B.create("idb-set", {
            originalErrorMessage: null == e ? void 0 : e.message,
          })),
          D.warn(t.message));
    }
  }
  function ye(e) {
    return e.name + "!" + e.options.appId;
  }
  class Ee {
    constructor(e) {
      (this.container = e), (this._heartbeatsCache = null);
      e = this.container.getProvider("app").getImmediate();
      (this._storage = new Ce(e)),
        (this._heartbeatsCachePromise = this._storage
          .read()
          .then((e) => (this._heartbeatsCache = e)));
    }
    async triggerHeartbeat() {
      var e, t;
      try {
        const n = this.container.getProvider("platform-logger").getImmediate();
        var r = n.getPlatformInfoString();
        const i = we();
        return (null ==
          (null == (e = this._heartbeatsCache) ? void 0 : e.heartbeats) &&
          ((this._heartbeatsCache = await this._heartbeatsCachePromise),
          null ==
            (null == (t = this._heartbeatsCache) ? void 0 : t.heartbeats))) ||
          this._heartbeatsCache.lastSentHeartbeatDate === i ||
          this._heartbeatsCache.heartbeats.some((e) => e.date === i)
          ? void 0
          : (this._heartbeatsCache.heartbeats.push({ date: i, agent: r }),
            (this._heartbeatsCache.heartbeats =
              this._heartbeatsCache.heartbeats.filter((e) => {
                e = new Date(e.date).valueOf();
                return Date.now() - e <= 2592e6;
              })),
            this._storage.overwrite(this._heartbeatsCache));
      } catch (e) {
        D.warn(e);
      }
    }
    async getHeartbeatsHeader() {
      var e;
      try {
        if (
          (null === this._heartbeatsCache &&
            (await this._heartbeatsCachePromise),
          null ==
            (null == (e = this._heartbeatsCache) ? void 0 : e.heartbeats) ||
            0 === this._heartbeatsCache.heartbeats.length)
        )
          return "";
        var t = we(),
          { heartbeatsToSend: r, unsentEntries: n } = (function (e) {
            const t = [];
            let r = e.slice();
            for (const n of e) {
              const i = t.find((e) => e.agent === n.agent);
              if (i) {
                if ((i.dates.push(n.date), 1024 < De(t))) {
                  i.dates.pop();
                  break;
                }
              } else if (
                (t.push({ agent: n.agent, dates: [n.date] }), 1024 < De(t))
              ) {
                t.pop();
                break;
              }
              r = r.slice(1);
            }
            return { heartbeatsToSend: t, unsentEntries: r };
          })(this._heartbeatsCache.heartbeats),
          i = a(JSON.stringify({ version: 2, heartbeats: r }));
        return (
          (this._heartbeatsCache.lastSentHeartbeatDate = t),
          0 < n.length
            ? ((this._heartbeatsCache.heartbeats = n),
              await this._storage.overwrite(this._heartbeatsCache))
            : ((this._heartbeatsCache.heartbeats = []),
              this._storage.overwrite(this._heartbeatsCache)),
          i
        );
      } catch (e) {
        return D.warn(e), "";
      }
    }
  }
  function we() {
    const e = new Date();
    return e.toISOString().substring(0, 10);
  }
  class Ce {
    constructor(e) {
      (this.app = e),
        (this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck());
    }
    async runIndexedDBEnvironmentCheck() {
      return (
        !!(function () {
          try {
            return "object" == typeof indexedDB;
          } catch (e) {
            return;
          }
        })() &&
        new Promise((t, r) => {
          try {
            let e = !0;
            const n = "validate-browser-context-for-indexeddb-analytics-module",
              i = self.indexedDB.open(n);
            (i.onsuccess = () => {
              i.result.close(), e || self.indexedDB.deleteDatabase(n), t(!0);
            }),
              (i.onupgradeneeded = () => {
                e = !1;
              }),
              (i.onerror = () => {
                var e;
                r((null == (e = i.error) ? void 0 : e.message) || "");
              });
          } catch (e) {
            r(e);
          }
        })
          .then(() => !0)
          .catch(() => !1)
      );
    }
    async read() {
      var e;
      return (await this._canUseIndexedDBPromise) &&
        null !=
          (e = await (async function (e) {
            try {
              const r = await ve(),
                n = r.transaction(P);
              var t = await n.objectStore(P).get(ye(e));
              return await n.done, t;
            } catch (e) {
              e instanceof s
                ? D.warn(e.message)
                : ((t = B.create("idb-get", {
                    originalErrorMessage: null == e ? void 0 : e.message,
                  })),
                  D.warn(t.message));
            }
          })(this.app)) &&
        e.heartbeats
        ? e
        : { heartbeats: [] };
    }
    async overwrite(e) {
      var t, r;
      if (await this._canUseIndexedDBPromise)
        return (
          (r = await this.read()),
          _e(this.app, {
            lastSentHeartbeatDate:
              null != (t = e.lastSentHeartbeatDate)
                ? t
                : r.lastSentHeartbeatDate,
            heartbeats: e.heartbeats,
          })
        );
    }
    async add(e) {
      var t, r;
      if (await this._canUseIndexedDBPromise)
        return (
          (r = await this.read()),
          _e(this.app, {
            lastSentHeartbeatDate:
              null != (t = e.lastSentHeartbeatDate)
                ? t
                : r.lastSentHeartbeatDate,
            heartbeats: [...r.heartbeats, ...e.heartbeats],
          })
        );
    }
  }
  function De(e) {
    return a(JSON.stringify({ version: 2, heartbeats: e })).length;
  }
  N(new h("platform-logger", (e) => new ce(e), "PRIVATE")),
    N(new h("heartbeat", (e) => new Ee(e), "PRIVATE")),
    R(w, C, ""),
    R(w, C, "esm2017"),
    R("fire-js", "");
  var Ie = Object.freeze({
    __proto__: null,
    SDK_VERSION: "11.0.2",
    _DEFAULT_ENTRY_NAME: I,
    _addComponent: L,
    _addOrOverwriteComponent: he,
    _apps: S,
    _clearComponents: function () {
      A.clear();
    },
    _components: A,
    _getProvider: de,
    _isFirebaseApp: pe,
    _isFirebaseServerApp: function (e) {
      return void 0 !== e.settings;
    },
    _registerComponent: N,
    _removeServiceInstance: function (e, t, r = I) {
      de(e, t).clearInstance(r);
    },
    _serverApps: O,
    deleteApp: e,
    getApp: function (e = I) {
      var t = S.get(e);
      if (!t && e === I && j()) return T();
      if (t) return t;
      throw B.create("no-app", { appName: e });
    },
    getApps: function () {
      return Array.from(S.values());
    },
    initializeApp: T,
    initializeServerApp: function (e, t) {
      if (("undefined" != typeof window || H()) && !H())
        throw B.create("invalid-server-app-environment");
      void 0 === t.automaticDataCollectionEnabled &&
        (t.automaticDataCollectionEnabled = !1),
        (e = pe(e) ? e.options : e);
      const r = Object.assign(Object.assign({}, t), e);
      if (
        (void 0 !== r.releaseOnDeref && delete r.releaseOnDeref,
        void 0 !== t.releaseOnDeref &&
          "undefined" == typeof FinalizationRegistry)
      )
        throw B.create("finalization-registry-not-supported", {});
      var n =
        "" +
        [...JSON.stringify(r)].reduce(
          (e, t) => (Math.imul(31, e) + t.charCodeAt(0)) | 0,
          0
        );
      const i = O.get(n);
      if (i) return i.incRefCount(t.releaseOnDeref), i;
      const a = new J(n);
      for (const s of A.values()) a.addComponent(s);
      e = new fe(e, t, n, a);
      return O.set(n, e), e;
    },
    onLog: ge,
    registerVersion: R,
    setLogLevel: be,
    FirebaseError: s,
  });
  class Se {
    constructor(e, t) {
      (this._delegate = e),
        (this.firebase = t),
        L(e, new h("app-compat", () => this, "PUBLIC")),
        (this.container = e.container);
    }
    get automaticDataCollectionEnabled() {
      return this._delegate.automaticDataCollectionEnabled;
    }
    set automaticDataCollectionEnabled(e) {
      this._delegate.automaticDataCollectionEnabled = e;
    }
    get name() {
      return this._delegate.name;
    }
    get options() {
      return this._delegate.options;
    }
    delete() {
      return new Promise((e) => {
        this._delegate.checkDestroyed(), e();
      }).then(
        () => (this.firebase.INTERNAL.removeApp(this.name), e(this._delegate))
      );
    }
    _getService(e, t = I) {
      this._delegate.checkDestroyed();
      const r = this._delegate.container.getProvider(e);
      return (
        r.isInitialized() ||
          "EXPLICIT" !==
            (null == (e = r.getComponent()) ? void 0 : e.instantiationMode) ||
          r.initialize(),
        r.getImmediate({ identifier: t })
      );
    }
    _removeServiceInstance(e, t = I) {
      this._delegate.container.getProvider(e).clearInstance(t);
    }
    _addComponent(e) {
      L(this._delegate, e);
    }
    _addOrOverwriteComponent(e) {
      he(this._delegate, e);
    }
    toJSON() {
      return {
        name: this.name,
        automaticDataCollectionEnabled: this.automaticDataCollectionEnabled,
        options: this.options,
      };
    }
  }
  const Oe = new i("app-compat", "Firebase", {
    "no-app":
      "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",
    "invalid-app-argument":
      "firebase.{$appName}() takes either no argument or a Firebase App instance.",
  });
  var Ae = (function e() {
    const t = (function (i) {
      const r = {},
        a = {
          __esModule: !0,
          initializeApp: function (e, t = {}) {
            e = T(e, t);
            if (V(r, e.name)) return r[e.name];
            t = new i(e, a);
            return (r[e.name] = t);
          },
          app: s,
          registerVersion: R,
          setLogLevel: be,
          onLog: ge,
          apps: null,
          SDK_VERSION: "11.0.2",
          INTERNAL: {
            registerComponent: function (r) {
              const n = r.name,
                t = n.replace("-compat", "");
              var e;
              return (
                N(r) &&
                  "PUBLIC" === r.type &&
                  ((e = (e = s()) => {
                    if ("function" != typeof e[t])
                      throw Oe.create("invalid-app-argument", { appName: n });
                    return e[t]();
                  }),
                  void 0 !== r.serviceProps && o(e, r.serviceProps),
                  (a[t] = e),
                  (i.prototype[t] = function (...e) {
                    const t = this._getService.bind(this, n);
                    return t.apply(this, r.multipleInstances ? e : []);
                  })),
                "PUBLIC" === r.type ? a[t] : null
              );
            },
            removeApp: function (e) {
              delete r[e];
            },
            useAsService: function (e, t) {
              return "serverAuth" === t ? null : t;
            },
            modularAPIs: Ie,
          },
        };
      function s(e) {
        if (((e = e || I), V(r, e))) return r[e];
        throw Oe.create("no-app", { appName: e });
      }
      return (
        (a.default = a),
        Object.defineProperty(a, "apps", {
          get: function () {
            return Object.keys(r).map((e) => r[e]);
          },
        }),
        (s.App = i),
        a
      );
    })(Se);
    return (
      (t.INTERNAL = Object.assign(Object.assign({}, t.INTERNAL), {
        createFirebaseNamespace: e,
        extendNamespace: function (e) {
          o(t, e);
        },
        createSubscribe: W,
        ErrorFactory: i,
        deepExtend: o,
      })),
      t
    );
  })();
  const Le = new Z("@firebase/app-compat");
  try {
    var Ne = t();
    if (void 0 !== Ne.firebase) {
      Le.warn(`
      Warning: Firebase is already defined in the global scope. Please make sure
      Firebase library is only loaded once.
    `);
      const k = Ne.firebase.SDK_VERSION;
      k &&
        0 <= k.indexOf("LITE") &&
        Le.warn(`
        Warning: You are trying to load Firebase while using Firebase Performance standalone script.
        You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.
        `);
    }
  } catch (t) {}
  const Be = Ae;
  return (
    R("@firebase/app-compat", "0.2.46", void 0),
    Be.registerVersion("firebase", "11.0.2", "app-compat-cdn"),
    Be
  );
});
