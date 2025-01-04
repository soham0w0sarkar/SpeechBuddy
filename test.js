∆(this, function (ci, li) {
  "use strict";
  try {
    !function () {
      var r,
        V =
          (e = ci) && "object" == typeof e && "default" in e
            ? e
            : { default: e };
      const t = {
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
          var i = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
          const s = [];
          for (let n = 0; n < r.length; n += 3) {
            var a = r[n],
              o = n + 1 < r.length,
              c = o ? r[n + 1] : 0,
              l = n + 2 < r.length,
              u = l ? r[n + 2] : 0;
            let e = ((15 & c) << 2) | (u >> 6),
              t = 63 & u;
            l || ((t = 64), o || (e = 64)),
              s.push(i[a >> 2], i[((3 & a) << 4) | (c >> 4)], i[e], i[t]);
          }
          return s.join("");
        },
        encodeString(e, t) {
          return this.HAS_NATIVE_SUPPORT && !t
            ? btoa(e)
            : this.encodeByteArray(
                (function (n) {
                  const r = [];
                  let i = 0;
                  for (let t = 0; t < n.length; t++) {
                    let e = n.charCodeAt(t);
                    e < 128
                      ? (r[i++] = e)
                      : (e < 2048
                          ? (r[i++] = (e >> 6) | 192)
                          : (55296 == (64512 & e) &&
                            t + 1 < n.length &&
                            56320 == (64512 & n.charCodeAt(t + 1))
                              ? ((e =
                                  65536 +
                                  ((1023 & e) << 10) +
                                  (1023 & n.charCodeAt(++t))),
                                (r[i++] = (e >> 18) | 240),
                                (r[i++] = ((e >> 12) & 63) | 128))
                              : (r[i++] = (e >> 12) | 224),
                            (r[i++] = ((e >> 6) & 63) | 128)),
                        (r[i++] = (63 & e) | 128));
                  }
                  return r;
                })(e),
                t
              );
        },
        decodeString(n, r) {
          if (this.HAS_NATIVE_SUPPORT && !r) return atob(n);
          {
            var i = this.decodeStringToByteArray(n, r);
            const c = [];
            let e = 0,
              t = 0;
            for (; e < i.length; ) {
              var s,
                a,
                o = i[e++];
              o < 128
                ? (c[t++] = String.fromCharCode(o))
                : 191 < o && o < 224
                ? ((s = i[e++]),
                  (c[t++] = String.fromCharCode(((31 & o) << 6) | (63 & s))))
                : 239 < o && o < 365
                ? ((a =
                    (((7 & o) << 18) |
                      ((63 & i[e++]) << 12) |
                      ((63 & i[e++]) << 6) |
                      (63 & i[e++])) -
                    65536),
                  (c[t++] = String.fromCharCode(55296 + (a >> 10))),
                  (c[t++] = String.fromCharCode(56320 + (1023 & a))))
                : ((s = i[e++]),
                  (a = i[e++]),
                  (c[t++] = String.fromCharCode(
                    ((15 & o) << 12) | ((63 & s) << 6) | (63 & a)
                  )));
            }
            return c.join("");
          }
        },
        decodeStringToByteArray(t, e) {
          this.init_();
          var n = e ? this.charToByteMapWebSafe_ : this.charToByteMap_;
          const r = [];
          for (let e = 0; e < t.length; ) {
            var i = n[t.charAt(e++)],
              s = e < t.length ? n[t.charAt(e)] : 0,
              a = ++e < t.length ? n[t.charAt(e)] : 64,
              o = ++e < t.length ? n[t.charAt(e)] : 64;
            if ((++e, null == i || null == s || null == a || null == o))
              throw new x();
            r.push((i << 2) | (s >> 4)),
              64 !== a &&
                (r.push(((s << 4) & 240) | (a >> 2)),
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
      class x extends Error {
        constructor() {
          super(...arguments), (this.name = "DecodeBase64StringError");
        }
      }
      const j = function (e) {
          try {
            return t.decodeString(e, !0);
          } catch (e) {
            console.error("base64Decode failed: ", e);
          }
          return null;
        },
        n = () => {
          try {
            return (
              (function () {
                if ("undefined" != typeof self) return self;
                if ("undefined" != typeof window) return window;
                if ("undefined" != typeof global) return global;
                throw new Error("Unable to locate global object.");
              })().__FIREBASE_DEFAULTS__ ||
              (() => {
                var e;
                if ("undefined" != typeof process && void 0 !== process.env)
                  return (e = process.env.__FIREBASE_DEFAULTS__)
                    ? JSON.parse(e)
                    : void 0;
              })() ||
              (() => {
                if ("undefined" != typeof document) {
                  let e;
                  try {
                    e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
                  } catch (e) {
                    return;
                  }
                  var t = e && j(e[1]);
                  return t && JSON.parse(t);
                }
              })()
            );
          } catch (e) {
            return void console.info(
              "Unable to get __FIREBASE_DEFAULTS__ due to: " + e
            );
          }
        };
      function h() {
        return "undefined" != typeof navigator &&
          "string" == typeof navigator.userAgent
          ? navigator.userAgent
          : "";
      }
      function H() {
        var e = null == (e = n()) ? void 0 : e.forceEnvironment;
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
      }
      function W() {
        var e =
          "object" == typeof chrome
            ? chrome.runtime
            : "object" == typeof browser
            ? browser.runtime
            : void 0;
        return "object" == typeof e && void 0 !== e.id;
      }
      function q() {
        return (
          "object" == typeof navigator && "ReactNative" === navigator.product
        );
      }
      function B() {
        const e = h();
        return 0 <= e.indexOf("MSIE ") || 0 <= e.indexOf("Trident/");
      }
      function z() {
        try {
          return "object" == typeof indexedDB;
        } catch (e) {
          return !1;
        }
      }
      class d extends Error {
        constructor(e, t, n) {
          super(t),
            (this.code = e),
            (this.customData = n),
            (this.name = "FirebaseError"),
            Object.setPrototypeOf(this, d.prototype),
            Error.captureStackTrace &&
              Error.captureStackTrace(this, G.prototype.create);
        }
      }
      class G {
        constructor(e, t, n) {
          (this.service = e), (this.serviceName = t), (this.errors = n);
        }
        create(e, ...t) {
          var r,
            t = t[0] || {},
            n = this.service + "/" + e,
            e = (e = this.errors[e])
              ? ((r = t),
                e.replace(K, (e, t) => {
                  var n = r[t];
                  return null != n ? String(n) : `<${t}?>`;
                }))
              : "Error",
            e = this.serviceName + `: ${e} (${n}).`;
          return new d(n, e, t);
        }
      }
      const K = /\{\$([^}]+)}/g;
      function J(e) {
        const t = [];
        for (const [n, r] of Object.entries(e))
          Array.isArray(r)
            ? r.forEach((e) => {
                t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e));
              })
            : t.push(encodeURIComponent(n) + "=" + encodeURIComponent(r));
        return t.length ? "&" + t.join("&") : "";
      }
      function Y(e) {
        const n = {},
          t = e.replace(/^\?/, "").split("&");
        return (
          t.forEach((e) => {
            var t;
            e &&
              (([e, t] = e.split("=")),
              (n[decodeURIComponent(e)] = decodeURIComponent(t)));
          }),
          n
        );
      }
      function $(e) {
        var t = e.indexOf("?");
        if (!t) return "";
        var n = e.indexOf("#", t);
        return e.substring(t, 0 < n ? n : void 0);
      }
      class X {
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
        subscribe(e, t, n) {
          let r;
          if (void 0 === e && void 0 === t && void 0 === n)
            throw new Error("Missing Observer.");
          void 0 ===
            (r = (function (e) {
              if ("object" == typeof e && null !== e)
                for (const t of ["next", "error", "complete"])
                  if (t in e && "function" == typeof e[t]) return 1;
            })(e)
              ? e
              : { next: e, error: t, complete: n }).next && (r.next = Q),
            void 0 === r.error && (r.error = Q),
            void 0 === r.complete && (r.complete = Q);
          e = this.unsubscribeOne.bind(this, this.observers.length);
          return (
            this.finalized &&
              this.task.then(() => {
                try {
                  this.finalError ? r.error(this.finalError) : r.complete();
                } catch (e) {}
              }),
            this.observers.push(r),
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
                "undefined" != typeof console &&
                  console.error &&
                  console.error(e);
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
      function Q() {}
      function o(e) {
        return e && e._delegate ? e._delegate : e;
      }
      ((e = r = r || {})[(e.DEBUG = 0)] = "DEBUG"),
        (e[(e.VERBOSE = 1)] = "VERBOSE"),
        (e[(e.INFO = 2)] = "INFO"),
        (e[(e.WARN = 3)] = "WARN"),
        (e[(e.ERROR = 4)] = "ERROR"),
        (e[(e.SILENT = 5)] = "SILENT");
      const Z = {
          debug: r.DEBUG,
          verbose: r.VERBOSE,
          info: r.INFO,
          warn: r.WARN,
          error: r.ERROR,
          silent: r.SILENT,
        },
        ee = r.INFO,
        te = {
          [r.DEBUG]: "log",
          [r.VERBOSE]: "log",
          [r.INFO]: "info",
          [r.WARN]: "warn",
          [r.ERROR]: "error",
        },
        ne = (e, t, ...n) => {
          if (!(t < e.logLevel)) {
            var r = new Date().toISOString(),
              i = te[t];
            if (!i)
              throw new Error(
                `Attempted to log a message with an invalid logType (value: ${t})`
              );
            console[i](`[${r}]  ${e.name}:`, ...n);
          }
        };
      function re(e, t) {
        var n = {};
        for (i in e)
          Object.prototype.hasOwnProperty.call(e, i) &&
            t.indexOf(i) < 0 &&
            (n[i] = e[i]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols)
          for (
            var r = 0, i = Object.getOwnPropertySymbols(e);
            r < i.length;
            r++
          )
            t.indexOf(i[r]) < 0 &&
              Object.prototype.propertyIsEnumerable.call(e, i[r]) &&
              (n[i[r]] = e[i[r]]);
        return n;
      }
      class ie {
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
      const se = {
          FACEBOOK: "facebook.com",
          GITHUB: "github.com",
          GOOGLE: "google.com",
          PASSWORD: "password",
          PHONE: "phone",
          TWITTER: "twitter.com",
        },
        ae = "EMAIL_SIGNIN",
        oe = "PASSWORD_RESET",
        ce = "RECOVER_EMAIL",
        le = "REVERT_SECOND_FACTOR_ADDITION",
        ue = "VERIFY_AND_CHANGE_EMAIL",
        de = "VERIFY_EMAIL";
      function he() {
        return {
          "dependent-sdk-initialized-before-auth":
            "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.",
        };
      }
      function pe() {
        return {
          "admin-restricted-operation":
            "This operation is restricted to administrators only.",
          "argument-error": "",
          "app-not-authorized":
            "This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.",
          "app-not-installed":
            "The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.",
          "captcha-check-failed":
            "The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.",
          "code-expired":
            "The SMS code has expired. Please re-send the verification code to try again.",
          "cordova-not-ready": "Cordova framework is not ready.",
          "cors-unsupported": "This browser is not supported.",
          "credential-already-in-use":
            "This credential is already associated with a different user account.",
          "custom-token-mismatch":
            "The custom token corresponds to a different audience.",
          "requires-recent-login":
            "This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
          "dependent-sdk-initialized-before-auth":
            "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.",
          "dynamic-link-not-activated":
            "Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.",
          "email-change-needs-verification":
            "Multi-factor users must always have a verified email.",
          "email-already-in-use":
            "The email address is already in use by another account.",
          "emulator-config-failed":
            'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',
          "expired-action-code": "The action code has expired.",
          "cancelled-popup-request":
            "This operation has been cancelled due to another conflicting popup being opened.",
          "internal-error": "An internal AuthError has occurred.",
          "invalid-app-credential":
            "The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.",
          "invalid-app-id":
            "The mobile app identifier is not registered for the current project.",
          "invalid-user-token":
            "This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.",
          "invalid-auth-event": "An internal AuthError has occurred.",
          "invalid-verification-code":
            "The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.",
          "invalid-continue-uri":
            "The continue URL provided in the request is invalid.",
          "invalid-cordova-configuration":
            "The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.",
          "invalid-custom-token":
            "The custom token format is incorrect. Please check the documentation.",
          "invalid-dynamic-link-domain":
            "The provided dynamic link domain is not configured or authorized for the current project.",
          "invalid-email": "The email address is badly formatted.",
          "invalid-emulator-scheme":
            "Emulator URL must start with a valid scheme (http:// or https://).",
          "invalid-api-key":
            "Your API key is invalid, please check you have copied it correctly.",
          "invalid-cert-hash":
            "The SHA-1 certificate hash provided is invalid.",
          "invalid-credential":
            "The supplied auth credential is incorrect, malformed or has expired.",
          "invalid-message-payload":
            "The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.",
          "invalid-multi-factor-session":
            "The request does not contain a valid proof of first factor successful sign-in.",
          "invalid-oauth-provider":
            "EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.",
          "invalid-oauth-client-id":
            "The OAuth client ID provided is either invalid or does not match the specified API key.",
          "unauthorized-domain":
            "This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.",
          "invalid-action-code":
            "The action code is invalid. This can happen if the code is malformed, expired, or has already been used.",
          "wrong-password":
            "The password is invalid or the user does not have a password.",
          "invalid-persistence-type":
            "The specified persistence type is invalid. It can only be local, session or none.",
          "invalid-phone-number":
            "The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].",
          "invalid-provider-id": "The specified provider ID is invalid.",
          "invalid-recipient-email":
            "The email corresponding to this action failed to send as the provided recipient email address is invalid.",
          "invalid-sender":
            "The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.",
          "invalid-verification-id":
            "The verification ID used to create the phone auth credential is invalid.",
          "invalid-tenant-id": "The Auth instance's tenant ID is invalid.",
          "login-blocked":
            "Login blocked by user-provided method: {$originalMessage}",
          "missing-android-pkg-name":
            "An Android Package Name must be provided if the Android App is required to be installed.",
          "auth-domain-config-required":
            "Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.",
          "missing-app-credential":
            "The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.",
          "missing-verification-code":
            "The phone auth credential was created with an empty SMS verification code.",
          "missing-continue-uri":
            "A continue URL must be provided in the request.",
          "missing-iframe-start": "An internal AuthError has occurred.",
          "missing-ios-bundle-id":
            "An iOS Bundle ID must be provided if an App Store ID is provided.",
          "missing-or-invalid-nonce":
            "The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.",
          "missing-password": "A non-empty password must be provided",
          "missing-multi-factor-info":
            "No second factor identifier is provided.",
          "missing-multi-factor-session":
            "The request is missing proof of first factor successful sign-in.",
          "missing-phone-number":
            "To send verification codes, provide a phone number for the recipient.",
          "missing-verification-id":
            "The phone auth credential was created with an empty verification ID.",
          "app-deleted": "This instance of FirebaseApp has been deleted.",
          "multi-factor-info-not-found":
            "The user does not have a second factor matching the identifier provided.",
          "multi-factor-auth-required":
            "Proof of ownership of a second factor is required to complete sign-in.",
          "account-exists-with-different-credential":
            "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
          "network-request-failed":
            "A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.",
          "no-auth-event": "An internal AuthError has occurred.",
          "no-such-provider":
            "User was not linked to an account with the given provider.",
          "null-user":
            "A null user object was provided as the argument for an operation which requires a non-null user object.",
          "operation-not-allowed":
            "The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.",
          "operation-not-supported-in-this-environment":
            'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',
          "popup-blocked":
            "Unable to establish a connection with the popup. It may have been blocked by the browser.",
          "popup-closed-by-user":
            "The popup has been closed by the user before finalizing the operation.",
          "provider-already-linked":
            "User can only be linked to one identity for the given provider.",
          "quota-exceeded":
            "The project's quota for this operation has been exceeded.",
          "redirect-cancelled-by-user":
            "The redirect operation has been cancelled by the user before finalizing.",
          "redirect-operation-pending":
            "A redirect sign-in operation is already pending.",
          "rejected-credential":
            "The request contains malformed or mismatching credentials.",
          "second-factor-already-in-use":
            "The second factor is already enrolled on this account.",
          "maximum-second-factor-count-exceeded":
            "The maximum allowed number of second factors on a user has been exceeded.",
          "tenant-id-mismatch":
            "The provided tenant ID does not match the Auth instance's tenant ID",
          timeout: "The operation has timed out.",
          "user-token-expired":
            "The user's credential is no longer valid. The user must sign in again.",
          "too-many-requests":
            "We have blocked all requests from this device due to unusual activity. Try again later.",
          "unauthorized-continue-uri":
            "The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.",
          "unsupported-first-factor":
            "Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.",
          "unsupported-persistence-type":
            "The current environment does not support the specified persistence type.",
          "unsupported-tenant-operation":
            "This operation is not supported in a multi-tenant context.",
          "unverified-email": "The operation requires a verified email.",
          "user-cancelled":
            "The user did not grant your application the permissions it requested.",
          "user-not-found":
            "There is no user record corresponding to this identifier. The user may have been deleted.",
          "user-disabled":
            "The user account has been disabled by an administrator.",
          "user-mismatch":
            "The supplied credentials do not correspond to the previously signed in user.",
          "user-signed-out": "",
          "weak-password": "The password must be 6 characters long or more.",
          "web-storage-unsupported":
            "This browser is not supported or 3rd party cookies and data may be disabled.",
          "already-initialized":
            "initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.",
          "missing-recaptcha-token":
            "The reCAPTCHA token is missing when sending request to the backend.",
          "invalid-recaptcha-token":
            "The reCAPTCHA token is invalid when sending request to the backend.",
          "invalid-recaptcha-action":
            "The reCAPTCHA action is invalid when sending request to the backend.",
          "recaptcha-not-enabled":
            "reCAPTCHA Enterprise integration is not enabled for this project.",
          "missing-client-type":
            "The reCAPTCHA client type is missing when sending request to the backend.",
          "missing-recaptcha-version":
            "The reCAPTCHA version is missing when sending request to the backend.",
          "invalid-req-type": "Invalid request parameters.",
          "invalid-recaptcha-version":
            "The reCAPTCHA version is invalid when sending request to the backend.",
          "unsupported-password-policy-schema-version":
            "The password policy received from the backend uses a schema version that is not supported by this version of the Firebase SDK.",
          "password-does-not-meet-requirements":
            "The password does not meet the requirements.",
        };
      }
      const me = he,
        fe = new G("auth", "Firebase", he()),
        ge = new (class {
          constructor(e) {
            (this.name = e),
              (this._logLevel = ee),
              (this._logHandler = ne),
              (this._userLogHandler = null);
          }
          get logLevel() {
            return this._logLevel;
          }
          set logLevel(e) {
            if (!(e in r))
              throw new TypeError(
                `Invalid value "${e}" assigned to \`logLevel\``
              );
            this._logLevel = e;
          }
          setLogLevel(e) {
            this._logLevel = "string" == typeof e ? Z[e] : e;
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
            this._userLogHandler && this._userLogHandler(this, r.DEBUG, ...e),
              this._logHandler(this, r.DEBUG, ...e);
          }
          log(...e) {
            this._userLogHandler && this._userLogHandler(this, r.VERBOSE, ...e),
              this._logHandler(this, r.VERBOSE, ...e);
          }
          info(...e) {
            this._userLogHandler && this._userLogHandler(this, r.INFO, ...e),
              this._logHandler(this, r.INFO, ...e);
          }
          warn(...e) {
            this._userLogHandler && this._userLogHandler(this, r.WARN, ...e),
              this._logHandler(this, r.WARN, ...e);
          }
          error(...e) {
            this._userLogHandler && this._userLogHandler(this, r.ERROR, ...e),
              this._logHandler(this, r.ERROR, ...e);
          }
        })("@firebase/auth");
      function ve(e, ...t) {
        ge.logLevel <= r.ERROR &&
          ge.error(`Auth (${li.SDK_VERSION}): ` + e, ...t);
      }
      function p(e, ...t) {
        throw Ie(e, ...t);
      }
      function m(e, ...t) {
        return Ie(e, ...t);
      }
      function _e(e, t, n) {
        n = Object.assign(Object.assign({}, me()), { [t]: n });
        const r = new G("auth", "Firebase", n);
        return r.create(t, { appName: e.name });
      }
      function c(e) {
        return _e(
          e,
          "operation-not-supported-in-this-environment",
          "Operations that alter the current user are not supported in conjunction with FirebaseServerApp"
        );
      }
      function ye(e, t, n) {
        if (!(t instanceof n))
          throw (
            (n.name !== t.constructor.name && p(e, "argument-error"),
            _e(
              e,
              "argument-error",
              `Type of ${t.constructor.name} does not match expected instance.` +
                "Did you pass a reference from a different Auth SDK?"
            ))
          );
      }
      function Ie(e, ...t) {
        if ("string" == typeof e) return fe.create(e, ...t);
        {
          var n = t[0];
          const r = [...t.slice(1)];
          return (
            r[0] && (r[0].appName = e.name), e._errorFactory.create(n, ...r)
          );
        }
      }
      function v(e, t, ...n) {
        if (!e) throw Ie(t, ...n);
      }
      function i(e) {
        e = "INTERNAL ASSERTION FAILED: " + e;
        throw (ve(e), new Error(e));
      }
      function f(e, t) {
        e || i(t);
      }
      function we() {
        var e;
        return (
          ("undefined" != typeof self &&
            (null == (e = self.location) ? void 0 : e.href)) ||
          ""
        );
      }
      function Te() {
        return "http:" === Ee() || "https:" === Ee();
      }
      function Ee() {
        var e;
        return (
          ("undefined" != typeof self &&
            (null == (e = self.location) ? void 0 : e.protocol)) ||
          null
        );
      }
      class be {
        constructor(e, t) {
          f(
            (this.shortDelay = e) < (this.longDelay = t),
            "Short delay should be less than long delay!"
          ),
            (this.isMobile =
              ("undefined" != typeof window &&
                !!(window.cordova || window.phonegap || window.PhoneGap) &&
                /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(
                  h()
                )) ||
              q());
        }
        get() {
          return "undefined" != typeof navigator &&
            navigator &&
            "onLine" in navigator &&
            "boolean" == typeof navigator.onLine &&
            (Te() || W() || "connection" in navigator) &&
            !navigator.onLine
            ? Math.min(5e3, this.shortDelay)
            : this.isMobile
            ? this.longDelay
            : this.shortDelay;
        }
      }
      function ke(e, t) {
        f(e.emulator, "Emulator should always be set here");
        e = e.emulator.url;
        return t ? "" + e + (t.startsWith("/") ? t.slice(1) : t) : e;
      }
      class Se {
        static initialize(e, t, n) {
          (this.fetchImpl = e),
            t && (this.headersImpl = t),
            n && (this.responseImpl = n);
        }
        static fetch() {
          return (
            this.fetchImpl ||
            ("undefined" != typeof self && "fetch" in self
              ? self.fetch
              : "undefined" != typeof globalThis && globalThis.fetch
              ? globalThis.fetch
              : "undefined" != typeof fetch
              ? fetch
              : void i(
                  "Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill"
                ))
          );
        }
        static headers() {
          return (
            this.headersImpl ||
            ("undefined" != typeof self && "Headers" in self
              ? self.Headers
              : "undefined" != typeof globalThis && globalThis.Headers
              ? globalThis.Headers
              : "undefined" != typeof Headers
              ? Headers
              : void i(
                  "Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill"
                ))
          );
        }
        static response() {
          return (
            this.responseImpl ||
            ("undefined" != typeof self && "Response" in self
              ? self.Response
              : "undefined" != typeof globalThis && globalThis.Response
              ? globalThis.Response
              : "undefined" != typeof Response
              ? Response
              : void i(
                  "Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill"
                ))
          );
        }
      }
      const Re = {
          CREDENTIAL_MISMATCH: "custom-token-mismatch",
          MISSING_CUSTOM_TOKEN: "internal-error",
          INVALID_IDENTIFIER: "invalid-email",
          MISSING_CONTINUE_URI: "internal-error",
          INVALID_PASSWORD: "wrong-password",
          MISSING_PASSWORD: "missing-password",
          INVALID_LOGIN_CREDENTIALS: "invalid-credential",
          EMAIL_EXISTS: "email-already-in-use",
          PASSWORD_LOGIN_DISABLED: "operation-not-allowed",
          INVALID_IDP_RESPONSE: "invalid-credential",
          INVALID_PENDING_TOKEN: "invalid-credential",
          FEDERATED_USER_ID_ALREADY_LINKED: "credential-already-in-use",
          MISSING_REQ_TYPE: "internal-error",
          EMAIL_NOT_FOUND: "user-not-found",
          RESET_PASSWORD_EXCEED_LIMIT: "too-many-requests",
          EXPIRED_OOB_CODE: "expired-action-code",
          INVALID_OOB_CODE: "invalid-action-code",
          MISSING_OOB_CODE: "internal-error",
          CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "requires-recent-login",
          INVALID_ID_TOKEN: "invalid-user-token",
          TOKEN_EXPIRED: "user-token-expired",
          USER_NOT_FOUND: "user-token-expired",
          TOO_MANY_ATTEMPTS_TRY_LATER: "too-many-requests",
          PASSWORD_DOES_NOT_MEET_REQUIREMENTS:
            "password-does-not-meet-requirements",
          INVALID_CODE: "invalid-verification-code",
          INVALID_SESSION_INFO: "invalid-verification-id",
          INVALID_TEMPORARY_PROOF: "invalid-credential",
          MISSING_SESSION_INFO: "missing-verification-id",
          SESSION_EXPIRED: "code-expired",
          MISSING_ANDROID_PACKAGE_NAME: "missing-android-pkg-name",
          UNAUTHORIZED_DOMAIN: "unauthorized-continue-uri",
          INVALID_OAUTH_CLIENT_ID: "invalid-oauth-client-id",
          ADMIN_ONLY_OPERATION: "admin-restricted-operation",
          INVALID_MFA_PENDING_CREDENTIAL: "invalid-multi-factor-session",
          MFA_ENROLLMENT_NOT_FOUND: "multi-factor-info-not-found",
          MISSING_MFA_ENROLLMENT_ID: "missing-multi-factor-info",
          MISSING_MFA_PENDING_CREDENTIAL: "missing-multi-factor-session",
          SECOND_FACTOR_EXISTS: "second-factor-already-in-use",
          SECOND_FACTOR_LIMIT_EXCEEDED: "maximum-second-factor-count-exceeded",
          BLOCKING_FUNCTION_ERROR_RESPONSE: "internal-error",
          RECAPTCHA_NOT_ENABLED: "recaptcha-not-enabled",
          MISSING_RECAPTCHA_TOKEN: "missing-recaptcha-token",
          INVALID_RECAPTCHA_TOKEN: "invalid-recaptcha-token",
          INVALID_RECAPTCHA_ACTION: "invalid-recaptcha-action",
          MISSING_CLIENT_TYPE: "missing-client-type",
          MISSING_RECAPTCHA_VERSION: "missing-recaptcha-version",
          INVALID_RECAPTCHA_VERSION: "invalid-recaptcha-version",
          INVALID_REQ_TYPE: "invalid-req-type",
        },
        Pe = new be(3e4, 6e4);
      function s(e, t) {
        return e.tenantId && !t.tenantId
          ? Object.assign(Object.assign({}, t), { tenantId: e.tenantId })
          : t;
      }
      async function a(s, a, o, c, e = {}) {
        return Ae(s, e, async () => {
          let e = {},
            t = {};
          c && ("GET" === a ? (t = c) : (e = { body: JSON.stringify(c) }));
          var n = J(Object.assign({ key: s.config.apiKey }, t)).slice(1);
          const r = await s._getAdditionalHeaders(),
            i =
              ((r["Content-Type"] = "application/json"),
              s.languageCode && (r["X-Firebase-Locale"] = s.languageCode),
              Object.assign({ method: a, headers: r }, e));
          return (
            ("undefined" != typeof navigator &&
              "Cloudflare-Workers" === navigator.userAgent) ||
              (i.referrerPolicy = "no-referrer"),
            Se.fetch()(Ce(s, s.config.apiHost, o, n), i)
          );
        });
      }
      async function Ae(e, t, n) {
        e._canInitEmulator = !1;
        var r = Object.assign(Object.assign({}, Re), t);
        try {
          const a = new Oe(e),
            o = await Promise.race([n(), a.promise]);
          a.clearNetworkTimeout();
          var i = await o.json();
          if ("needConfirmation" in i)
            throw Ne(e, "account-exists-with-different-credential", i);
          if (o.ok && !("errorMessage" in i)) return i;
          {
            const c = o.ok ? i.errorMessage : i.error.message,
              [l, u] = c.split(" : ");
            if ("FEDERATED_USER_ID_ALREADY_LINKED" === l)
              throw Ne(e, "credential-already-in-use", i);
            if ("EMAIL_EXISTS" === l) throw Ne(e, "email-already-in-use", i);
            if ("USER_DISABLED" === l) throw Ne(e, "user-disabled", i);
            var s = r[l] || l.toLowerCase().replace(/[_\s]+/g, "-");
            if (u) throw _e(e, s, u);
            p(e, s);
          }
        } catch (t) {
          if (t instanceof d) throw t;
          p(e, "network-request-failed", { message: String(t) });
        }
      }
      async function l(e, t, n, r, i = {}) {
        t = await a(e, t, n, r, i);
        return (
          "mfaPendingCredential" in t &&
            p(e, "multi-factor-auth-required", { _serverResponse: t }),
          t
        );
      }
      function Ce(e, t, n, r) {
        t = "" + t + n + "?" + r;
        return e.config.emulator
          ? ke(e.config, t)
          : e.config.apiScheme + "://" + t;
      }
      class Oe {
        clearNetworkTimeout() {
          clearTimeout(this.timer);
        }
        constructor(e) {
          (this.auth = e),
            (this.timer = null),
            (this.promise = new Promise((e, t) => {
              this.timer = setTimeout(
                () => t(m(this.auth, "network-request-failed")),
                Pe.get()
              );
            }));
        }
      }
      function Ne(e, t, n) {
        const r = { appName: e.name },
          i =
            (n.email && (r.email = n.email),
            n.phoneNumber && (r.phoneNumber = n.phoneNumber),
            m(e, t, r));
        return (i.customData._tokenResponse = n), i;
      }
      function Le(e) {
        return void 0 !== e && void 0 !== e.getResponse;
      }
      function De(e) {
        return void 0 !== e && void 0 !== e.enterprise;
      }
      class Ue {
        constructor(e) {
          if (
            ((this.siteKey = ""),
            (this.recaptchaEnforcementState = []),
            void 0 === e.recaptchaKey)
          )
            throw new Error("recaptchaKey undefined");
          (this.siteKey = e.recaptchaKey.split("/")[3]),
            (this.recaptchaEnforcementState = e.recaptchaEnforcementState);
        }
        getProviderEnforcementState(e) {
          if (
            !this.recaptchaEnforcementState ||
            0 === this.recaptchaEnforcementState.length
          )
            return null;
          for (const t of this.recaptchaEnforcementState)
            if (t.provider && t.provider === e) {
              switch (t.enforcementState) {
                case "ENFORCE":
                  return "ENFORCE";
                case "AUDIT":
                  return "AUDIT";
                case "OFF":
                  return "OFF";
                default:
                  return "ENFORCEMENT_STATE_UNSPECIFIED";
              }
              return;
            }
          return null;
        }
        isProviderEnabled(e) {
          return (
            "ENFORCE" === this.getProviderEnforcementState(e) ||
            "AUDIT" === this.getProviderEnforcementState(e)
          );
        }
        isAnyProviderEnabled() {
          return (
            this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER") ||
            this.isProviderEnabled("PHONE_PROVIDER")
          );
        }
      }
      async function Me(e, t) {
        return a(e, "GET", "/v2/recaptchaConfig", s(e, t));
      }
      async function Fe(e, t) {
        return a(e, "POST", "/v1/accounts:lookup", t);
      }
      function Ve(e) {
        if (e)
          try {
            const t = new Date(Number(e));
            if (!isNaN(t.getTime())) return t.toUTCString();
          } catch (e) {}
      }
      function xe(e) {
        return 1e3 * Number(e);
      }
      function je(e) {
        var [t, n, r] = e.split(".");
        if (void 0 === t || void 0 === n || void 0 === r)
          return ve("JWT malformed, contained fewer than 3 sections"), null;
        try {
          var i = j(n);
          return i
            ? JSON.parse(i)
            : (ve("Failed to decode base64 JWT payload"), null);
        } catch (e) {
          return (
            ve(
              "Caught error parsing JWT payload as JSON",
              null == e ? void 0 : e.toString()
            ),
            null
          );
        }
      }
      function He(e) {
        e = je(e);
        return (
          v(e, "internal-error"),
          v(void 0 !== e.exp, "internal-error"),
          v(void 0 !== e.iat, "internal-error"),
          Number(e.exp) - Number(e.iat)
        );
      }
      async function u(e, t, n = !1) {
        if (n) return t;
        try {
          return t;
        } catch (n) {
          throw (
            (n instanceof d &&
              ("auth/user-disabled" === (t = n.code) ||
                "auth/user-token-expired" === t) &&
              e.auth.currentUser === e &&
              (await e.auth.signOut()),
            n)
          );
        }
      }
      class We {
        constructor(e) {
          (this.user = e),
            (this.isRunning = !1),
            (this.timerId = null),
            (this.errorBackoff = 3e4);
        }
        _start() {
          this.isRunning || ((this.isRunning = !0), this.schedule());
        }
        _stop() {
          this.isRunning &&
            ((this.isRunning = !1),
            null !== this.timerId && clearTimeout(this.timerId));
        }
        getInterval(e) {
          var t;
          return e
            ? ((t = this.errorBackoff),
              (this.errorBackoff = Math.min(2 * this.errorBackoff, 96e4)),
              t)
            : ((this.errorBackoff = 3e4),
              (t =
                (null != (t = this.user.stsTokenManager.expirationTime)
                  ? t
                  : 0) -
                Date.now() -
                3e5),
              Math.max(0, t));
        }
        schedule(e = !1) {
          this.isRunning &&
            ((e = this.getInterval(e)),
            (this.timerId = setTimeout(async () => {
              await this.iteration();
            }, e)));
        }
        async iteration() {
          try {
            await this.user.getIdToken(!0);
          } catch (e) {
            return void (
              "auth/network-request-failed" === (null == e ? void 0 : e.code) &&
              this.schedule(!0)
            );
          }
          this.schedule();
        }
      }
      class qe {
        constructor(e, t) {
          (this.createdAt = e), (this.lastLoginAt = t), this._initializeTime();
        }
        _initializeTime() {
          (this.lastSignInTime = Ve(this.lastLoginAt)),
            (this.creationTime = Ve(this.createdAt));
        }
        _copy(e) {
          (this.createdAt = e.createdAt),
            (this.lastLoginAt = e.lastLoginAt),
            this._initializeTime();
        }
        toJSON() {
          return { createdAt: this.createdAt, lastLoginAt: this.lastLoginAt };
        }
      }
      async function Be(e) {
        var t = e.auth,
          n = await e.getIdToken(),
          r =
            (v(
              null == (a = await u(e, Fe(t, { idToken: n })))
                ? void 0
                : a.users.length,
              t,
              "internal-error"
            ),
            a.users[0]);
        e._notifyReloadListener(r);
        var i,
          s,
          t =
            null != (n = r.providerUserInfo) && n.length
              ? ze(r.providerUserInfo)
              : [],
          a =
            ((i = e.providerData),
            (s = t),
            [
              ...i.filter((t) => !s.some((e) => e.providerId === t.providerId)),
              ...s,
            ]),
          n = e.isAnonymous,
          t = !((e.email && r.passwordHash) || (null !== a && a.length)),
          t = !!n && t,
          t = {
            uid: r.localId,
            displayName: r.displayName || null,
            photoURL: r.photoUrl || null,
            email: r.email || null,
            emailVerified: r.emailVerified || !1,
            phoneNumber: r.phoneNumber || null,
            tenantId: r.tenantId || null,
            providerData: a,
            metadata: new qe(r.createdAt, r.lastLoginAt),
            isAnonymous: t,
          };
        Object.assign(e, t);
      }
      function ze(e) {
        return e.map((e) => {
          var t = e.providerId,
            e = re(e, ["providerId"]);
          return {
            providerId: t,
            uid: e.rawId || "",
            displayName: e.displayName || null,
            email: e.email || null,
            phoneNumber: e.phoneNumber || null,
            photoURL: e.photoUrl || null,
          };
        });
      }
      class Ge {
        constructor() {
          (this.refreshToken = null),
            (this.accessToken = null),
            (this.expirationTime = null);
        }
        get isExpired() {
          return !this.expirationTime || Date.now() > this.expirationTime - 3e4;
        }
        updateFromServerResponse(e) {
          v(e.idToken, "internal-error"),
            v(void 0 !== e.idToken, "internal-error"),
            v(void 0 !== e.refreshToken, "internal-error");
          var t =
            "expiresIn" in e && void 0 !== e.expiresIn
              ? Number(e.expiresIn)
              : He(e.idToken);
          this.updateTokensAndExpiration(e.idToken, e.refreshToken, t);
        }
        updateFromIdToken(e) {
          v(0 !== e.length, "internal-error");
          var t = He(e);
          this.updateTokensAndExpiration(e, null, t);
        }
        async getToken(e, t = !1) {
          return t || !this.accessToken || this.isExpired
            ? (v(this.refreshToken, e, "user-token-expired"),
              this.refreshToken
                ? (await this.refresh(e, this.refreshToken), this.accessToken)
                : null)
            : this.accessToken;
        }
        clearRefreshToken() {
          this.refreshToken = null;
        }
        async refresh(e, t) {
          s = t;
          var i,
            s,
            {
              accessToken: e,
              refreshToken: n,
              expiresIn: t,
            } = await {
              accessToken: (t = await Ae((i = e), {}, async () => {
                var e = J({
                    grant_type: "refresh_token",
                    refresh_token: s,
                  }).slice(1),
                  { tokenApiHost: t, apiKey: n } = i.config,
                  n = Ce(i, t, "/v1/token", "key=" + n);
                const r = await i._getAdditionalHeaders();
                return (
                  (r["Content-Type"] = "application/x-www-form-urlencoded"),
                  Se.fetch()(n, { method: "POST", headers: r, body: e })
                );
              })).access_token,
              expiresIn: t.expires_in,
              refreshToken: t.refresh_token,
            };
          this.updateTokensAndExpiration(e, n, Number(t));
        }
        updateTokensAndExpiration(e, t, n) {
          (this.refreshToken = t || null),
            (this.accessToken = e || null),
            (this.expirationTime = Date.now() + 1e3 * n);
        }
        static fromJSON(e, t) {
          var { refreshToken: t, accessToken: n, expirationTime: r } = t;
          const i = new Ge();
          return (
            t &&
              (v("string" == typeof t, "internal-error", { appName: e }),
              (i.refreshToken = t)),
            n &&
              (v("string" == typeof n, "internal-error", { appName: e }),
              (i.accessToken = n)),
            r &&
              (v("number" == typeof r, "internal-error", { appName: e }),
              (i.expirationTime = r)),
            i
          );
        }
        toJSON() {
          return {
            refreshToken: this.refreshToken,
            accessToken: this.accessToken,
            expirationTime: this.expirationTime,
          };
        }
        _assign(e) {
          (this.accessToken = e.accessToken),
            (this.refreshToken = e.refreshToken),
            (this.expirationTime = e.expirationTime);
        }
        _clone() {
          return Object.assign(new Ge(), this.toJSON());
        }
        _performRefresh() {
          return i("not implemented");
        }
      }
      function _(e, t) {
        v("string" == typeof e || void 0 === e, "internal-error", {
          appName: t,
        });
      }
      class y {
        constructor(e) {
          var { uid: t, auth: n, stsTokenManager: r } = e,
            e = re(e, ["uid", "auth", "stsTokenManager"]);
          (this.providerId = "firebase"),
            (this.proactiveRefresh = new We(this)),
            (this.reloadUserInfo = null),
            (this.reloadListener = null),
            (this.uid = t),
            (this.auth = n),
            (this.stsTokenManager = r),
            (this.accessToken = r.accessToken),
            (this.displayName = e.displayName || null),
            (this.email = e.email || null),
            (this.emailVerified = e.emailVerified || !1),
            (this.phoneNumber = e.phoneNumber || null),
            (this.photoURL = e.photoURL || null),
            (this.isAnonymous = e.isAnonymous || !1),
            (this.tenantId = e.tenantId || null),
            (this.providerData = e.providerData ? [...e.providerData] : []),
            (this.metadata = new qe(
              e.createdAt || void 0,
              e.lastLoginAt || void 0
            ));
        }
        async getIdToken(e) {
          e = await u(this, this.stsTokenManager.getToken(this.auth, e));
          return (
            v(e, this.auth, "internal-error"),
            this.accessToken !== e &&
              ((this.accessToken = e),
              await this.auth._persistUserIfCurrent(this),
              this.auth._notifyListenersIfCurrent(this)),
            e
          );
        }
        getIdTokenResult(e) {
          return (async function (e, t = !1) {
            const n = o(e);
            var e = await n.getIdToken(t),
              t = je(e),
              r =
                (v(
                  t && t.exp && t.auth_time && t.iat,
                  n.auth,
                  "internal-error"
                ),
                "object" == typeof t.firebase ? t.firebase : void 0),
              i = null == r ? void 0 : r.sign_in_provider;
            return {
              claims: t,
              token: e,
              authTime: Ve(xe(t.auth_time)),
              issuedAtTime: Ve(xe(t.iat)),
              expirationTime: Ve(xe(t.exp)),
              signInProvider: i || null,
              signInSecondFactor:
                (null == r ? void 0 : r.sign_in_second_factor) || null,
            };
          })(this, e);
        }
        reload() {
          return (async function (e) {
            const t = o(e);
            await Be(t),
              await t.auth._persistUserIfCurrent(t),
              t.auth._notifyListenersIfCurrent(t);
          })(this);
        }
        _assign(e) {
          this !== e &&
            (v(this.uid === e.uid, this.auth, "internal-error"),
            (this.displayName = e.displayName),
            (this.photoURL = e.photoURL),
            (this.email = e.email),
            (this.emailVerified = e.emailVerified),
            (this.phoneNumber = e.phoneNumber),
            (this.isAnonymous = e.isAnonymous),
            (this.tenantId = e.tenantId),
            (this.providerData = e.providerData.map((e) =>
              Object.assign({}, e)
            )),
            this.metadata._copy(e.metadata),
            this.stsTokenManager._assign(e.stsTokenManager));
        }
        _clone(e) {
          const t = new y(
            Object.assign(Object.assign({}, this), {
              auth: e,
              stsTokenManager: this.stsTokenManager._clone(),
            })
          );
          return t.metadata._copy(this.metadata), t;
        }
        _onReload(e) {
          v(!this.reloadListener, this.auth, "internal-error"),
            (this.reloadListener = e),
            this.reloadUserInfo &&
              (this._notifyReloadListener(this.reloadUserInfo),
              (this.reloadUserInfo = null));
        }
        _notifyReloadListener(e) {
          this.reloadListener
            ? this.reloadListener(e)
            : (this.reloadUserInfo = e);
        }
        _startProactiveRefresh() {
          this.proactiveRefresh._start();
        }
        _stopProactiveRefresh() {
          this.proactiveRefresh._stop();
        }
        async _updateTokensIfNecessary(e, t = !1) {
          let n = !1;
          e.idToken &&
            e.idToken !== this.stsTokenManager.accessToken &&
            (this.stsTokenManager.updateFromServerResponse(e), (n = !0)),
            t && (await Be(this)),
            await this.auth._persistUserIfCurrent(this),
            n && this.auth._notifyListenersIfCurrent(this);
        }
        async delete() {
          if (li._isFirebaseServerApp(this.auth.app))
            return Promise.reject(c(this.auth));
          var t = await this.getIdToken();
          return (
            await u(
              this,
              (async function (e) {
                return a(e, "POST", "/v1/accounts:delete", { idToken: t });
              })(this.auth)
            ),
            this.stsTokenManager.clearRefreshToken(),
            this.auth.signOut()
          );
        }
        toJSON() {
          return Object.assign(
            Object.assign(
              {
                uid: this.uid,
                email: this.email || void 0,
                emailVerified: this.emailVerified,
                displayName: this.displayName || void 0,
                isAnonymous: this.isAnonymous,
                photoURL: this.photoURL || void 0,
                phoneNumber: this.phoneNumber || void 0,
                tenantId: this.tenantId || void 0,
                providerData: this.providerData.map((e) =>
                  Object.assign({}, e)
                ),
                stsTokenManager: this.stsTokenManager.toJSON(),
                _redirectEventId: this._redirectEventId,
              },
              this.metadata.toJSON()
            ),
            { apiKey: this.auth.config.apiKey, appName: this.auth.name }
          );
        }
        get refreshToken() {
          return this.stsTokenManager.refreshToken || "";
        }
        static _fromJSON(e, t) {
          var n = null != (a = t.displayName) ? a : void 0,
            r = null != (f = t.email) ? f : void 0,
            i = null != (o = t.phoneNumber) ? o : void 0,
            s = null != (l = t.photoURL) ? l : void 0,
            a = null != (c = t.tenantId) ? c : void 0,
            o = null != (f = t._redirectEventId) ? f : void 0,
            c = null != (l = t.createdAt) ? l : void 0,
            l = null != (f = t.lastLoginAt) ? f : void 0;
          const {
            uid: u,
            emailVerified: d,
            isAnonymous: h,
            providerData: p,
            stsTokenManager: m,
          } = t;
          v(u && m, e, "internal-error");
          var f = Ge.fromJSON(this.name, m);
          v("string" == typeof u, e, "internal-error"),
            _(n, e.name),
            _(r, e.name),
            v("boolean" == typeof d, e, "internal-error"),
            v("boolean" == typeof h, e, "internal-error"),
            _(i, e.name),
            _(s, e.name),
            _(a, e.name),
            _(o, e.name),
            _(c, e.name),
            _(l, e.name);
          const g = new y({
            uid: u,
            auth: e,
            email: r,
            emailVerified: d,
            displayName: n,
            isAnonymous: h,
            photoURL: s,
            phoneNumber: i,
            tenantId: a,
            stsTokenManager: f,
            createdAt: c,
            lastLoginAt: l,
          });
          return (
            p &&
              Array.isArray(p) &&
              (g.providerData = p.map((e) => Object.assign({}, e))),
            o && (g._redirectEventId = o),
            g
          );
        }
        static async _fromIdTokenResponse(e, t, n = !1) {
          const r = new Ge();
          r.updateFromServerResponse(t);
          t = new y({
            uid: t.localId,
            auth: e,
            stsTokenManager: r,
            isAnonymous: n,
          });
          return await Be(t), t;
        }
        static async _fromGetAccountInfoResponse(e, t, n) {
          var t = t.users[0],
            r =
              (v(void 0 !== t.localId, "internal-error"),
              void 0 !== t.providerUserInfo ? ze(t.providerUserInfo) : []),
            i = !((t.email && t.passwordHash) || (null != r && r.length));
          const s = new Ge();
          return (
            s.updateFromIdToken(n),
            (i = new y({
              uid: t.localId,
              auth: e,
              stsTokenManager: s,
              isAnonymous: i,
            })),
            (r = {
              uid: t.localId,
              displayName: t.displayName || null,
              photoURL: t.photoUrl || null,
              email: t.email || null,
              emailVerified: t.emailVerified || !1,
              phoneNumber: t.phoneNumber || null,
              tenantId: t.tenantId || null,
              providerData: r,
              metadata: new qe(t.createdAt, t.lastLoginAt),
              isAnonymous: !(
                (t.email && t.passwordHash) ||
                (null != r && r.length)
              ),
            }),
            Object.assign(i, r),
            i
          );
        }
      }
      const Ke = new Map();
      function g(e) {
        f(e instanceof Function, "Expected a class definition");
        let t = Ke.get(e);
        return (
          t
            ? f(
                t instanceof e,
                "Instance stored in cache mismatched with class"
              )
            : ((t = new e()), Ke.set(e, t)),
          t
        );
      }
      class Je {
        constructor() {
          (this.type = "NONE"), (this.storage = {});
        }
        async _isAvailable() {
          return !0;
        }
        async _set(e, t) {
          this.storage[e] = t;
        }
        async _get(e) {
          e = this.storage[e];
          return void 0 === e ? null : e;
        }
        async _remove(e) {
          delete this.storage[e];
        }
        _addListener(e, t) {}
        _removeListener(e, t) {}
      }
      Je.type = "NONE";
      const Ye = Je;
      function I(e, t, n) {
        return `firebase:${e}:${t}:` + n;
      }
      class $e {
        constructor(e, t, n) {
          (this.persistence = e), (this.auth = t), (this.userKey = n);
          var { config: e, name: n } = this.auth;
          (this.fullUserKey = I(this.userKey, e.apiKey, n)),
            (this.fullPersistenceKey = I("persistence", e.apiKey, n)),
            (this.boundEventHandler = t._onStorageEvent.bind(t)),
            this.persistence._addListener(
              this.fullUserKey,
              this.boundEventHandler
            );
        }
        setCurrentUser(e) {
          return this.persistence._set(this.fullUserKey, e.toJSON());
        }
        async getCurrentUser() {
          var e = await this.persistence._get(this.fullUserKey);
          return e ? y._fromJSON(this.auth, e) : null;
        }
        removeCurrentUser() {
          return this.persistence._remove(this.fullUserKey);
        }
        savePersistenceForRedirect() {
          return this.persistence._set(
            this.fullPersistenceKey,
            this.persistence.type
          );
        }
        async setPersistence(e) {
          var t;
          if (this.persistence !== e)
            return (
              (t = await this.getCurrentUser()),
              await this.removeCurrentUser(),
              (this.persistence = e),
              t ? this.setCurrentUser(t) : void 0
            );
        }
        delete() {
          this.persistence._removeListener(
            this.fullUserKey,
            this.boundEventHandler
          );
        }
        static async create(e, t, n = "authUser") {
          if (!t.length) return new $e(g(Ye), e, n);
          const r = (
            await Promise.all(
              t.map(async (e) => {
                if (await e._isAvailable()) return e;
              })
            )
          ).filter((e) => e);
          let i = r[0] || g(Ye);
          const s = I(n, e.config.apiKey, e.name);
          let a = null;
          for (const u of t)
            try {
              var o = await u._get(s);
              if (o) {
                var c = y._fromJSON(e, o);
                u !== i && (a = c), (i = u);
                break;
              }
            } catch (e) {}
          var l = r.filter((e) => e._shouldAllowMigration);
          return (
            i._shouldAllowMigration &&
              l.length &&
              ((i = l[0]),
              a && (await i._set(s, a.toJSON())),
              await Promise.all(
                t.map(async (e) => {
                  if (e !== i)
                    try {
                      await e._remove(s);
                    } catch (e) {}
                })
              )),
            new $e(i, e, n)
          );
        }
      }
      function Xe(e) {
        const t = e.toLowerCase();
        if (t.includes("opera/") || t.includes("opr/") || t.includes("opios/"))
          return "Opera";
        if (tt(t)) return "IEMobile";
        if (t.includes("msie") || t.includes("trident/")) return "IE";
        if (t.includes("edge/")) return "Edge";
        if (Qe(t)) return "Firefox";
        if (t.includes("silk/")) return "Silk";
        if (rt(t)) return "Blackberry";
        if (it(t)) return "Webos";
        if (Ze(t)) return "Safari";
        if ((t.includes("chrome/") || et(t)) && !t.includes("edge/"))
          return "Chrome";
        if (nt(t)) return "Android";
        e = e.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);
        return 2 === (null == e ? void 0 : e.length) ? e[1] : "Other";
      }
      function Qe(e = h()) {
        return /firefox\//i.test(e);
      }
      function Ze(e = h()) {
        const t = e.toLowerCase();
        return (
          t.includes("safari/") &&
          !t.includes("chrome/") &&
          !t.includes("crios/") &&
          !t.includes("android")
        );
      }
      function et(e = h()) {
        return /crios\//i.test(e);
      }
      function tt(e = h()) {
        return /iemobile/i.test(e);
      }
      function nt(e = h()) {
        return /android/i.test(e);
      }
      function rt(e = h()) {
        return /blackberry/i.test(e);
      }
      function it(e = h()) {
        return /webos/i.test(e);
      }
      function st(e = h()) {
        return (
          /iphone|ipad|ipod/i.test(e) ||
          (/macintosh/i.test(e) && /mobile/i.test(e))
        );
      }
      function at(e = h()) {
        return (
          st(e) || nt(e) || it(e) || rt(e) || /windows phone/i.test(e) || tt(e)
        );
      }
      function ot(e, t = []) {
        let n;
        switch (e) {
          case "Browser":
            n = Xe(h());
            break;
          case "Worker":
            n = Xe(h()) + "-" + e;
            break;
          default:
            n = e;
        }
        t = t.length ? t.join(",") : "FirebaseCore-web";
        return `${n}/JsCore/${li.SDK_VERSION}/` + t;
      }
      class ct {
        constructor(e) {
          (this.auth = e), (this.queue = []);
        }
        pushCallback(r, e) {
          var t = (n) =>
            new Promise((e, t) => {
              try {
                e(r(n));
              } catch (e) {
                t(e);
              }
            });
          (t.onAbort = e), this.queue.push(t);
          const n = this.queue.length - 1;
          return () => {
            this.queue[n] = () => Promise.resolve();
          };
        }
        async runMiddleware(e) {
          if (this.auth.currentUser !== e) {
            const t = [];
            try {
              for (const n of this.queue)
                await n(e), n.onAbort && t.push(n.onAbort);
            } catch (e) {
              t.reverse();
              for (const r of t)
                try {
                  r();
                } catch (e) {}
              throw this.auth._errorFactory.create("login-blocked", {
                originalMessage: null == e ? void 0 : e.message,
              });
            }
          }
        }
      }
      class lt {
        constructor(e) {
          var t,
            n = e.customStrengthOptions;
          (this.customStrengthOptions = {}),
            (this.customStrengthOptions.minPasswordLength =
              null != (t = n.minPasswordLength) ? t : 6),
            n.maxPasswordLength &&
              (this.customStrengthOptions.maxPasswordLength =
                n.maxPasswordLength),
            void 0 !== n.containsLowercaseCharacter &&
              (this.customStrengthOptions.containsLowercaseLetter =
                n.containsLowercaseCharacter),
            void 0 !== n.containsUppercaseCharacter &&
              (this.customStrengthOptions.containsUppercaseLetter =
                n.containsUppercaseCharacter),
            void 0 !== n.containsNumericCharacter &&
              (this.customStrengthOptions.containsNumericCharacter =
                n.containsNumericCharacter),
            void 0 !== n.containsNonAlphanumericCharacter &&
              (this.customStrengthOptions.containsNonAlphanumericCharacter =
                n.containsNonAlphanumericCharacter),
            (this.enforcementState = e.enforcementState),
            "ENFORCEMENT_STATE_UNSPECIFIED" === this.enforcementState &&
              (this.enforcementState = "OFF"),
            (this.allowedNonAlphanumericCharacters =
              null !=
              (n =
                null == (n = e.allowedNonAlphanumericCharacters)
                  ? void 0
                  : n.join(""))
                ? n
                : ""),
            (this.forceUpgradeOnSignin =
              null != (n = e.forceUpgradeOnSignin) && n),
            (this.schemaVersion = e.schemaVersion);
        }
        validatePassword(e) {
          var t, n, r;
          const i = { isValid: !0, passwordPolicy: this };
          return (
            this.validatePasswordLengthOptions(e, i),
            this.validatePasswordCharacterOptions(e, i),
            i.isValid &&
              (i.isValid = null == (t = i.meetsMinPasswordLength) || t),
            i.isValid &&
              (i.isValid = null == (t = i.meetsMaxPasswordLength) || t),
            i.isValid &&
              (i.isValid = null == (n = i.containsLowercaseLetter) || n),
            i.isValid &&
              (i.isValid = null == (n = i.containsUppercaseLetter) || n),
            i.isValid &&
              (i.isValid = null == (r = i.containsNumericCharacter) || r),
            i.isValid &&
              (i.isValid =
                null == (r = i.containsNonAlphanumericCharacter) || r),
            i
          );
        }
        validatePasswordLengthOptions(e, t) {
          var n = this.customStrengthOptions.minPasswordLength,
            r = this.customStrengthOptions.maxPasswordLength;
          n && (t.meetsMinPasswordLength = e.length >= n),
            r && (t.meetsMaxPasswordLength = e.length <= r);
        }
        validatePasswordCharacterOptions(t, n) {
          var r;
          this.updatePasswordCharacterOptionsStatuses(n, !1, !1, !1, !1);
          for (let e = 0; e < t.length; e++)
            (r = t.charAt(e)),
              this.updatePasswordCharacterOptionsStatuses(
                n,
                "a" <= r && r <= "z",
                "A" <= r && r <= "Z",
                "0" <= r && r <= "9",
                this.allowedNonAlphanumericCharacters.includes(r)
              );
        }
        updatePasswordCharacterOptionsStatuses(e, t, n, r, i) {
          this.customStrengthOptions.containsLowercaseLetter &&
            !e.containsLowercaseLetter &&
            (e.containsLowercaseLetter = t),
            this.customStrengthOptions.containsUppercaseLetter &&
              !e.containsUppercaseLetter &&
              (e.containsUppercaseLetter = n),
            this.customStrengthOptions.containsNumericCharacter &&
              !e.containsNumericCharacter &&
              (e.containsNumericCharacter = r),
            !this.customStrengthOptions.containsNonAlphanumericCharacter ||
              e.containsNonAlphanumericCharacter ||
              (e.containsNonAlphanumericCharacter = i);
        }
      }
      class ut {
        constructor(e, t, n, r) {
          (this.app = e),
            (this.heartbeatServiceProvider = t),
            (this.appCheckServiceProvider = n),
            (this.config = r),
            (this.currentUser = null),
            (this.emulatorConfig = null),
            (this.operations = Promise.resolve()),
            (this.authStateSubscription = new dt(this)),
            (this.idTokenSubscription = new dt(this)),
            (this.beforeStateQueue = new ct(this)),
            (this.redirectUser = null),
            (this.isProactiveRefreshEnabled = !1),
            (this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION = 1),
            (this._canInitEmulator = !0),
            (this._isInitialized = !1),
            (this._deleted = !1),
            (this._initializationPromise = null),
            (this._popupRedirectResolver = null),
            (this._errorFactory = fe),
            (this._agentRecaptchaConfig = null),
            (this._tenantRecaptchaConfigs = {}),
            (this._projectPasswordPolicy = null),
            (this._tenantPasswordPolicies = {}),
            (this.lastNotifiedUid = void 0),
            (this.languageCode = null),
            (this.tenantId = null),
            (this.settings = { appVerificationDisabledForTesting: !1 }),
            (this.frameworks = []),
            (this.name = e.name),
            (this.clientVersion = r.sdkClientVersion);
        }
        _initializeWithPersistence(t, n) {
          return (
            n && (this._popupRedirectResolver = g(n)),
            (this._initializationPromise = this.queue(async () => {
              var e;
              if (
                !this._deleted &&
                ((this.persistenceManager = await $e.create(this, t)),
                !this._deleted)
              ) {
                if (
                  null != (e = this._popupRedirectResolver) &&
                  e._shouldInitProactively
                )
                  try {
                    await this._popupRedirectResolver._initialize(this);
                  } catch (e) {}
                await this.initializeCurrentUser(n),
                  (this.lastNotifiedUid =
                    (null == (e = this.currentUser) ? void 0 : e.uid) || null),
                  this._deleted || (this._isInitialized = !0);
              }
            })),
            this._initializationPromise
          );
        }
        async _onStorageEvent() {
          if (!this._deleted) {
            var e = await this.assertedPersistence.getCurrentUser();
            if (this.currentUser || e)
              return this.currentUser && e && this.currentUser.uid === e.uid
                ? (this._currentUser._assign(e),
                  void (await this.currentUser.getIdToken()))
                : void (await this._updateCurrentUser(e, !0));
          }
        }
        async initializeCurrentUserFromIdToken(e) {
          try {
            var t = await Fe(this, { idToken: e }),
              n = await y._fromGetAccountInfoResponse(this, t, e);
            await this.directlySetCurrentUser(n);
          } catch (e) {
            console.warn(
              "FirebaseServerApp could not login user with provided authIdToken: ",
              e
            ),
              await this.directlySetCurrentUser(null);
          }
        }
        async initializeCurrentUser(e) {
          if (li._isFirebaseServerApp(this.app)) {
            const o = this.app.settings.authIdToken;
            return o
              ? new Promise((e) => {
                  setTimeout(() =>
                    this.initializeCurrentUserFromIdToken(o).then(e, e)
                  );
                })
              : this.directlySetCurrentUser(null);
          }
          var t,
            n,
            r,
            i = await this.assertedPersistence.getCurrentUser();
          let s = i,
            a = !1;
          if (
            (e &&
              this.config.authDomain &&
              (await this.getOrInitRedirectPersistenceManager(),
              (t =
                null == (r = this.redirectUser) ? void 0 : r._redirectEventId),
              (n = null === s || void 0 === s ? void 0 : s._redirectEventId),
              (r = await this.tryRedirectSignIn(e)),
              (t && t !== n) ||
                null == r ||
                !r.user ||
                ((s = r.user), (a = !0))),
            !s)
          )
            return this.directlySetCurrentUser(null);
          if (s._redirectEventId)
            return (
              v(this._popupRedirectResolver, this, "argument-error"),
              await this.getOrInitRedirectPersistenceManager(),
              this.redirectUser &&
              this.redirectUser._redirectEventId === s._redirectEventId
                ? this.directlySetCurrentUser(s)
                : this.reloadAndSetCurrentUserOrClear(s)
            );
          if (a)
            try {
              await this.beforeStateQueue.runMiddleware(s);
            } catch (e) {
              (s = i),
                this._popupRedirectResolver._overrideRedirectResult(this, () =>
                  Promise.reject(e)
                );
            }
          return s
            ? this.reloadAndSetCurrentUserOrClear(s)
            : this.directlySetCurrentUser(null);
        }
        async tryRedirectSignIn(e) {
          let t = null;
          try {
            t = await this._popupRedirectResolver._completeRedirectFn(
              this,
              e,
              !0
            );
          } catch (e) {
            await this._setRedirectUser(null);
          }
          return t;
        }
        async reloadAndSetCurrentUserOrClear(e) {
          try {
            await Be(e);
          } catch (e) {
            if ("auth/network-request-failed" !== (null == e ? void 0 : e.code))
              return this.directlySetCurrentUser(null);
          }
          return this.directlySetCurrentUser(e);
        }
        useDeviceLanguage() {
          this.languageCode = (function () {
            if ("undefined" == typeof navigator) return null;
            var e = navigator;
            return (e.languages && e.languages[0]) || e.language || null;
          })();
        }
        async _delete() {
          this._deleted = !0;
        }
        async updateCurrentUser(e) {
          if (li._isFirebaseServerApp(this.app)) return Promise.reject(c(this));
          const t = e ? o(e) : null;
          return (
            t &&
              v(
                t.auth.config.apiKey === this.config.apiKey,
                this,
                "invalid-user-token"
              ),
            this._updateCurrentUser(t && t._clone(this))
          );
        }
        async _updateCurrentUser(e, t = !1) {
          if (!this._deleted)
            return (
              e && v(this.tenantId === e.tenantId, this, "tenant-id-mismatch"),
              t || (await this.beforeStateQueue.runMiddleware(e)),
              this.queue(async () => {
                await this.directlySetCurrentUser(e),
                  this.notifyAuthListeners();
              })
            );
        }
        async signOut() {
          return li._isFirebaseServerApp(this.app)
            ? Promise.reject(c(this))
            : (await this.beforeStateQueue.runMiddleware(null),
              (this.redirectPersistenceManager ||
                this._popupRedirectResolver) &&
                (await this._setRedirectUser(null)),
              this._updateCurrentUser(null, !0));
        }
        setPersistence(e) {
          return li._isFirebaseServerApp(this.app)
            ? Promise.reject(c(this))
            : this.queue(async () => {
                await this.assertedPersistence.setPersistence(g(e));
              });
        }
        _getRecaptchaConfig() {
          return null == this.tenantId
            ? this._agentRecaptchaConfig
            : this._tenantRecaptchaConfigs[this.tenantId];
        }
        async validatePassword(e) {
          this._getPasswordPolicyInternal() ||
            (await this._updatePasswordPolicy());
          const t = this._getPasswordPolicyInternal();
          return t.schemaVersion !==
            this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION
            ? Promise.reject(
                this._errorFactory.create(
                  "unsupported-password-policy-schema-version",
                  {}
                )
              )
            : t.validatePassword(e);
        }
        _getPasswordPolicyInternal() {
          return null === this.tenantId
            ? this._projectPasswordPolicy
            : this._tenantPasswordPolicies[this.tenantId];
        }
        async _updatePasswordPolicy() {
          var e = await a(this, "GET", "/v2/passwordPolicy", s(this, {})),
            e = new lt(e);
          null === this.tenantId
            ? (this._projectPasswordPolicy = e)
            : (this._tenantPasswordPolicies[this.tenantId] = e);
        }
        _getPersistence() {
          return this.assertedPersistence.persistence.type;
        }
        _updateErrorMap(e) {
          this._errorFactory = new G("auth", "Firebase", e());
        }
        onAuthStateChanged(e, t, n) {
          return this.registerStateListener(
            this.authStateSubscription,
            e,
            t,
            n
          );
        }
        beforeAuthStateChanged(e, t) {
          return this.beforeStateQueue.pushCallback(e, t);
        }
        onIdTokenChanged(e, t, n) {
          return this.registerStateListener(this.idTokenSubscription, e, t, n);
        }
        authStateReady() {
          return new Promise((e, t) => {
            if (this.currentUser) e();
            else {
              const n = this.onAuthStateChanged(() => {
                n(), e();
              }, t);
            }
          });
        }
        async revokeAccessToken(e) {
          if (this.currentUser) {
            const t = {
              providerId: "apple.com",
              tokenType: "ACCESS_TOKEN",
              token: e,
              idToken: await this.currentUser.getIdToken(),
            };
            null != this.tenantId && (t.tenantId = this.tenantId),
              await a(
                this,
                "POST",
                "/v2/accounts:revokeToken",
                s(this, (e = t))
              );
          }
        }
        toJSON() {
          var e;
          return {
            apiKey: this.config.apiKey,
            authDomain: this.config.authDomain,
            appName: this.name,
            currentUser: null == (e = this._currentUser) ? void 0 : e.toJSON(),
          };
        }
        async _setRedirectUser(e, t) {
          const n = await this.getOrInitRedirectPersistenceManager(t);
          return null === e ? n.removeCurrentUser() : n.setCurrentUser(e);
        }
        async getOrInitRedirectPersistenceManager(e) {
          return (
            this.redirectPersistenceManager ||
              (v(
                (e = (e && g(e)) || this._popupRedirectResolver),
                this,
                "argument-error"
              ),
              (this.redirectPersistenceManager = await $e.create(
                this,
                [g(e._redirectPersistence)],
                "redirectUser"
              )),
              (this.redirectUser =
                await this.redirectPersistenceManager.getCurrentUser())),
            this.redirectPersistenceManager
          );
        }
        async _redirectUserForId(e) {
          var t;
          return (
            this._isInitialized && (await this.queue(async () => {})),
            (null == (t = this._currentUser) ? void 0 : t._redirectEventId) ===
            e
              ? this._currentUser
              : (null == (t = this.redirectUser)
                  ? void 0
                  : t._redirectEventId) === e
              ? this.redirectUser
              : null
          );
        }
        async _persistUserIfCurrent(e) {
          if (e === this.currentUser)
            return this.queue(async () => this.directlySetCurrentUser(e));
        }
        _notifyListenersIfCurrent(e) {
          e === this.currentUser && this.notifyAuthListeners();
        }
        _key() {
          return `${this.config.authDomain}:${this.config.apiKey}:` + this.name;
        }
        _startProactiveRefresh() {
          (this.isProactiveRefreshEnabled = !0),
            this.currentUser && this._currentUser._startProactiveRefresh();
        }
        _stopProactiveRefresh() {
          (this.isProactiveRefreshEnabled = !1),
            this.currentUser && this._currentUser._stopProactiveRefresh();
        }
        get _currentUser() {
          return this.currentUser;
        }
        notifyAuthListeners() {
          var e;
          this._isInitialized &&
            (this.idTokenSubscription.next(this.currentUser),
            (e =
              null != (e = null == (e = this.currentUser) ? void 0 : e.uid)
                ? e
                : null),
            this.lastNotifiedUid !== e &&
              ((this.lastNotifiedUid = e),
              this.authStateSubscription.next(this.currentUser)));
        }
        registerStateListener(e, t, n, r) {
          if (this._deleted) return () => {};
          const i = "function" == typeof t ? t : t.next.bind(t);
          let s = !1;
          const a = this._isInitialized
            ? Promise.resolve()
            : this._initializationPromise;
          if (
            (v(a, this, "internal-error"),
            a.then(() => {
              s || i(this.currentUser);
            }),
            "function" == typeof t)
          ) {
            const o = e.addObserver(t, n, r);
            return () => {
              (s = !0), o();
            };
          }
          {
            const c = e.addObserver(t);
            return () => {
              (s = !0), c();
            };
          }
        }
        async directlySetCurrentUser(e) {
          this.currentUser &&
            this.currentUser !== e &&
            this._currentUser._stopProactiveRefresh(),
            e && this.isProactiveRefreshEnabled && e._startProactiveRefresh(),
            (this.currentUser = e)
              ? await this.assertedPersistence.setCurrentUser(e)
              : await this.assertedPersistence.removeCurrentUser();
        }
        queue(e) {
          return (
            (this.operations = this.operations.then(e, e)), this.operations
          );
        }
        get assertedPersistence() {
          return (
            v(this.persistenceManager, this, "internal-error"),
            this.persistenceManager
          );
        }
        _logFramework(e) {
          e &&
            !this.frameworks.includes(e) &&
            (this.frameworks.push(e),
            this.frameworks.sort(),
            (this.clientVersion = ot(
              this.config.clientPlatform,
              this._getFrameworks()
            )));
        }
        _getFrameworks() {
          return this.frameworks;
        }
        async _getAdditionalHeaders() {
          const e = { "X-Client-Version": this.clientVersion };
          this.app.options.appId &&
            (e["X-Firebase-gmpid"] = this.app.options.appId);
          var t = await (null ==
          (t = this.heartbeatServiceProvider.getImmediate({ optional: !0 }))
            ? void 0
            : t.getHeartbeatsHeader());
          return (
            t && (e["X-Firebase-Client"] = t),
            (t = await this._getAppCheckToken()) &&
              (e["X-Firebase-AppCheck"] = t),
            e
          );
        }
        async _getAppCheckToken() {
          var e,
            t,
            n = await (null ==
            (n = this.appCheckServiceProvider.getImmediate({ optional: !0 }))
              ? void 0
              : n.getToken());
          return (
            null != n &&
              n.error &&
              ((e = "Error while retrieving App Check token: " + n.error),
              (t = []),
              ge.logLevel <= r.WARN &&
                ge.warn(`Auth (${li.SDK_VERSION}): ` + e, ...t)),
            null == n ? void 0 : n.token
          );
        }
      }
      function w(e) {
        return o(e);
      }
      class dt {
        constructor(e) {
          (this.auth = e),
            (this.observer = null),
            (this.addObserver = (function (e) {
              const t = new X(e, void 0);
              return t.subscribe.bind(t);
            })((e) => (this.observer = e)));
        }
        get next() {
          return (
            v(this.observer, this.auth, "internal-error"),
            this.observer.next.bind(this.observer)
          );
        }
      }
      let ht = {
        async loadJS() {
          throw new Error("Unable to load external scripts");
        },
        recaptchaV2Script: "",
        recaptchaEnterpriseScript: "",
        gapiScript: "",
      };
      function pt(e) {
        return ht.loadJS(e);
      }
      function mt(e) {
        return "__" + e + Math.floor(1e6 * Math.random());
      }
      class ft {
        constructor(e) {
          (this.auth = e), (this.counter = 1e12), (this._widgets = new Map());
        }
        render(e, t) {
          var n = this.counter;
          return (
            this._widgets.set(n, new _t(e, this.auth.name, t || {})),
            this.counter++,
            n
          );
        }
        reset(e) {
          var t,
            e = e || 1e12;
          null != (t = this._widgets.get(e)) && t.delete(),
            this._widgets.delete(e);
        }
        getResponse(e) {
          return (
            (null == (e = this._widgets.get(e || 1e12))
              ? void 0
              : e.getResponse()) || ""
          );
        }
        async execute(e) {
          return null != (e = this._widgets.get(e || 1e12)) && e.execute(), "";
        }
      }
      class gt {
        constructor() {
          this.enterprise = new vt();
        }
        ready(e) {
          e();
        }
        execute(e, t) {
          return Promise.resolve("token");
        }
        render(e, t) {
          return "";
        }
      }
      class vt {
        ready(e) {
          e();
        }
        execute(e, t) {
          return Promise.resolve("token");
        }
        render(e, t) {
          return "";
        }
      }
      class _t {
        constructor(e, t, n) {
          (this.params = n),
            (this.timerId = null),
            (this.deleted = !1),
            (this.responseToken = null),
            (this.clickHandler = () => {
              this.execute();
            });
          n = "string" == typeof e ? document.getElementById(e) : e;
          v(n, "argument-error", { appName: t }),
            (this.container = n),
            (this.isVisible = "invisible" !== this.params.size),
            this.isVisible
              ? this.execute()
              : this.container.addEventListener("click", this.clickHandler);
        }
        getResponse() {
          return this.checkIfDeleted(), this.responseToken;
        }
        delete() {
          this.checkIfDeleted(),
            (this.deleted = !0),
            this.timerId && (clearTimeout(this.timerId), (this.timerId = null)),
            this.container.removeEventListener("click", this.clickHandler);
        }
        execute() {
          this.checkIfDeleted(),
            this.timerId ||
              (this.timerId = window.setTimeout(() => {
                this.responseToken = (function () {
                  const t = [],
                    n =
                      "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                  for (let e = 0; e < 50; e++)
                    t.push(n.charAt(Math.floor(Math.random() * n.length)));
                  return t.join("");
                })();
                const { callback: e, "expired-callback": t } = this.params;
                if (e)
                  try {
                    e(this.responseToken);
                  } catch (e) {}
                this.timerId = window.setTimeout(() => {
                  if (((this.timerId = null), (this.responseToken = null), t))
                    try {
                      t();
                    } catch (e) {}
                  this.isVisible && this.execute();
                }, 6e4);
              }, 500));
        }
        checkIfDeleted() {
          if (this.deleted)
            throw new Error("reCAPTCHA mock was already deleted!");
        }
      }
      const yt = "NO_RECAPTCHA";
      class It {
        constructor(e) {
          (this.type = "recaptcha-enterprise"), (this.auth = w(e));
        }
        async verify(i = "verify", e = !1) {
          function s(e, t, n) {
            const r = window.grecaptcha;
            De(r)
              ? r.enterprise.ready(() => {
                  r.enterprise
                    .execute(e, { action: i })
                    .then((e) => {
                      t(e);
                    })
                    .catch(() => {
                      t(yt);
                    });
                })
              : n(Error("No reCAPTCHA enterprise script loaded."));
          }
          if (this.auth.settings.appVerificationDisabledForTesting) {
            const t = new gt();
            return t.execute("siteKey", { action: "verify" });
          }
          return new Promise((n, r) => {
            !(async function (r) {
              if (!e) {
                if (null == r.tenantId && null != r._agentRecaptchaConfig)
                  return r._agentRecaptchaConfig.siteKey;
                if (
                  null != r.tenantId &&
                  void 0 !== r._tenantRecaptchaConfigs[r.tenantId]
                )
                  return r._tenantRecaptchaConfigs[r.tenantId].siteKey;
              }
              return new Promise(async (t, n) => {
                Me(r, {
                  clientType: "CLIENT_TYPE_WEB",
                  version: "RECAPTCHA_ENTERPRISE",
                })
                  .then((e) => {
                    if (void 0 !== e.recaptchaKey)
                      return (
                        (e = new Ue(e)),
                        null == r.tenantId
                          ? (r._agentRecaptchaConfig = e)
                          : (r._tenantRecaptchaConfigs[r.tenantId] = e),
                        t(e.siteKey)
                      );
                    n(new Error("recaptcha Enterprise site key undefined"));
                  })
                  .catch((e) => {
                    n(e);
                  });
              });
            })(this.auth)
              .then((t) => {
                if (!e && De(window.grecaptcha)) s(t, n, r);
                else if ("undefined" != typeof window) {
                  let e = ht.recaptchaEnterpriseScript;
                  0 !== e.length && (e += t),
                    pt(e)
                      .then(() => {
                        s(t, n, r);
                      })
                      .catch((e) => {
                        r(e);
                      });
                } else
                  r(
                    new Error("RecaptchaVerifier is only supported in browser")
                  );
              })
              .catch((e) => {
                r(e);
              });
          });
        }
      }
      async function wt(e, t, n, r = !1, i = !1) {
        const s = new It(e);
        let a;
        if (i) a = yt;
        else
          try {
            a = await s.verify(n);
          } catch (e) {
            a = await s.verify(n, !0);
          }
        var o,
          i = Object.assign({}, t);
        return (
          "mfaSmsEnrollment" === n || "mfaSmsSignIn" === n
            ? "phoneEnrollmentInfo" in i
              ? ((t = i.phoneEnrollmentInfo.phoneNumber),
                (o = i.phoneEnrollmentInfo.recaptchaToken),
                Object.assign(i, {
                  phoneEnrollmentInfo: {
                    phoneNumber: t,
                    recaptchaToken: o,
                    captchaResponse: a,
                    clientType: "CLIENT_TYPE_WEB",
                    recaptchaVersion: "RECAPTCHA_ENTERPRISE",
                  },
                }))
              : "phoneSignInInfo" in i &&
                ((o = i.phoneSignInInfo.recaptchaToken),
                Object.assign(i, {
                  phoneSignInInfo: {
                    recaptchaToken: o,
                    captchaResponse: a,
                    clientType: "CLIENT_TYPE_WEB",
                    recaptchaVersion: "RECAPTCHA_ENTERPRISE",
                  },
                }))
            : (r
                ? Object.assign(i, { captchaResp: a })
                : Object.assign(i, { captchaResponse: a }),
              Object.assign(i, { clientType: "CLIENT_TYPE_WEB" }),
              Object.assign(i, { recaptchaVersion: "RECAPTCHA_ENTERPRISE" })),
          i
        );
      }
      async function T(n, r, i, s, e) {
        var t, a, o;
        return "EMAIL_PASSWORD_PROVIDER" === e
          ? null != (t = n._getRecaptchaConfig()) &&
            t.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")
            ? ((a = await wt(n, r, i, "getOobCode" === i)), s(n, a))
            : s(n, r).catch(async (e) => {
                if ("auth/missing-recaptcha-token" !== e.code)
                  return Promise.reject(e);
                console.log(
                  i +
                    " is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow."
                );
                e = await wt(n, r, i, "getOobCode" === i);
                return s(n, e);
              })
          : "PHONE_PROVIDER" !== e
          ? Promise.reject(e + " provider is not supported.")
          : null != (a = n._getRecaptchaConfig()) &&
            a.isProviderEnabled("PHONE_PROVIDER")
          ? ((o = await wt(n, r, i)),
            s(n, o).catch(async (e) => {
              if (
                "AUDIT" !==
                  (null == (t = n._getRecaptchaConfig())
                    ? void 0
                    : t.getProviderEnforcementState("PHONE_PROVIDER")) ||
                ("auth/missing-recaptcha-token" !== e.code &&
                  "auth/invalid-app-credential" !== e.code)
              )
                return Promise.reject(e);
              console.log(
                `Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${i} flow.`
              );
              var t = await wt(n, r, i, !1, !0);
              return s(n, t);
            }))
          : ((o = await wt(n, r, i, !1, !0)), s(n, o));
      }
      function Tt(e) {
        var t = e.indexOf(":");
        return t < 0 ? "" : e.substr(0, t + 1);
      }
      function Et(e) {
        if (!e) return null;
        e = Number(e);
        return isNaN(e) ? null : e;
      }
      class bt {
        constructor(e, t) {
          (this.providerId = e), (this.signInMethod = t);
        }
        toJSON() {
          return i("not implemented");
        }
        _getIdTokenResponse(e) {
          return i("not implemented");
        }
        _linkToIdToken(e, t) {
          return i("not implemented");
        }
        _getReauthenticationResolver(e) {
          return i("not implemented");
        }
      }
      async function kt(e, t) {
        return a(e, "POST", "/v1/accounts:resetPassword", s(e, t));
      }
      async function St(e, t) {
        return a(e, "POST", "/v1/accounts:signUp", t);
      }
      async function Rt(e, t) {
        return l(e, "POST", "/v1/accounts:signInWithPassword", s(e, t));
      }
      async function Pt(e, t) {
        return a(e, "POST", "/v1/accounts:sendOobCode", s(e, t));
      }
      async function At(e, t) {
        return Pt(e, t);
      }
      async function Ct(e, t) {
        return Pt(e, t);
      }
      class Ot extends bt {
        constructor(e, t, n, r = null) {
          super("password", n),
            (this._email = e),
            (this._password = t),
            (this._tenantId = r);
        }
        static _fromEmailAndPassword(e, t) {
          return new Ot(e, t, "password");
        }
        static _fromEmailAndCode(e, t, n = null) {
          return new Ot(e, t, "emailLink", n);
        }
        toJSON() {
          return {
            email: this._email,
            password: this._password,
            signInMethod: this.signInMethod,
            tenantId: this._tenantId,
          };
        }
        static fromJSON(e) {
          e = "string" == typeof e ? JSON.parse(e) : e;
          if (null != e && e.email && null != e && e.password) {
            if ("password" === e.signInMethod)
              return this._fromEmailAndPassword(e.email, e.password);
            if ("emailLink" === e.signInMethod)
              return this._fromEmailAndCode(e.email, e.password, e.tenantId);
          }
          return null;
        }
        async _getIdTokenResponse(t) {
          switch (this.signInMethod) {
            case "password":
              return T(
                t,
                {
                  returnSecureToken: !0,
                  email: this._email,
                  password: this._password,
                  clientType: "CLIENT_TYPE_WEB",
                },
                "signInWithPassword",
                Rt,
                "EMAIL_PASSWORD_PROVIDER"
              );
            case "emailLink":
              return (async function (e) {
                return l(
                  t,
                  "POST",
                  "/v1/accounts:signInWithEmailLink",
                  s(t, e)
                );
              })({ email: this._email, oobCode: this._password });
            default:
              p(t, "internal-error");
          }
        }
        async _linkToIdToken(t, e) {
          switch (this.signInMethod) {
            case "password":
              return T(
                t,
                {
                  idToken: e,
                  returnSecureToken: !0,
                  email: this._email,
                  password: this._password,
                  clientType: "CLIENT_TYPE_WEB",
                },
                "signUpPassword",
                St,
                "EMAIL_PASSWORD_PROVIDER"
              );
            case "emailLink":
              return (async function (e) {
                return l(
                  t,
                  "POST",
                  "/v1/accounts:signInWithEmailLink",
                  s(t, e)
                );
              })({ idToken: e, email: this._email, oobCode: this._password });
            default:
              p(t, "internal-error");
          }
        }
        _getReauthenticationResolver(e) {
          return this._getIdTokenResponse(e);
        }
      }
      async function E(e, t) {
        return l(e, "POST", "/v1/accounts:signInWithIdp", s(e, t));
      }
      class b extends bt {
        constructor() {
          super(...arguments), (this.pendingToken = null);
        }
        static _fromParams(e) {
          const t = new b(e.providerId, e.signInMethod);
          return (
            e.idToken || e.accessToken
              ? (e.idToken && (t.idToken = e.idToken),
                e.accessToken && (t.accessToken = e.accessToken),
                e.nonce && !e.pendingToken && (t.nonce = e.nonce),
                e.pendingToken && (t.pendingToken = e.pendingToken))
              : e.oauthToken && e.oauthTokenSecret
              ? ((t.accessToken = e.oauthToken),
                (t.secret = e.oauthTokenSecret))
              : p("argument-error"),
            t
          );
        }
        toJSON() {
          return {
            idToken: this.idToken,
            accessToken: this.accessToken,
            secret: this.secret,
            nonce: this.nonce,
            pendingToken: this.pendingToken,
            providerId: this.providerId,
            signInMethod: this.signInMethod,
          };
        }
        static fromJSON(e) {
          var { providerId: t, signInMethod: n } = (e =
              "string" == typeof e ? JSON.parse(e) : e),
            e = re(e, ["providerId", "signInMethod"]);
          if (!t || !n) return null;
          const r = new b(t, n);
          return (
            (r.idToken = e.idToken || void 0),
            (r.accessToken = e.accessToken || void 0),
            (r.secret = e.secret),
            (r.nonce = e.nonce),
            (r.pendingToken = e.pendingToken || null),
            r
          );
        }
        _getIdTokenResponse(e) {
          return E(e, this.buildRequest());
        }
        _linkToIdToken(e, t) {
          const n = this.buildRequest();
          return (n.idToken = t), E(e, n);
        }
        _getReauthenticationResolver(e) {
          const t = this.buildRequest();
          return (t.autoCreate = !1), E(e, t);
        }
        buildRequest() {
          const e = { requestUri: "http://localhost", returnSecureToken: !0 };
          if (this.pendingToken) e.pendingToken = this.pendingToken;
          else {
            const t = {};
            this.idToken && (t.id_token = this.idToken),
              this.accessToken && (t.access_token = this.accessToken),
              this.secret && (t.oauth_token_secret = this.secret),
              (t.providerId = this.providerId),
              this.nonce && !this.pendingToken && (t.nonce = this.nonce),
              (e.postBody = J(t));
          }
          return e;
        }
      }
      async function Nt(e, t) {
        return a(e, "POST", "/v1/accounts:sendVerificationCode", s(e, t));
      }
      const Lt = { USER_NOT_FOUND: "user-not-found" };
      class Dt extends bt {
        constructor(e) {
          super("phone", "phone"), (this.params = e);
        }
        static _fromVerification(e, t) {
          return new Dt({ verificationId: e, verificationCode: t });
        }
        static _fromTokenResponse(e, t) {
          return new Dt({ phoneNumber: e, temporaryProof: t });
        }
        _getIdTokenResponse(e) {
          return (async function (e, t) {
            return l(e, "POST", "/v1/accounts:signInWithPhoneNumber", s(e, t));
          })(e, this._makeVerificationRequest());
        }
        _linkToIdToken(e, t) {
          return (async function (e, t) {
            t = await l(
              e,
              "POST",
              "/v1/accounts:signInWithPhoneNumber",
              s(e, t)
            );
            if (t.temporaryProof)
              throw Ne(e, "account-exists-with-different-credential", t);
            return t;
          })(e, Object.assign({ idToken: t }, this._makeVerificationRequest()));
        }
        _getReauthenticationResolver(e) {
          return (async function (e, t) {
            return l(
              e,
              "POST",
              "/v1/accounts:signInWithPhoneNumber",
              s(
                e,
                Object.assign(Object.assign({}, t), { operation: "REAUTH" })
              ),
              Lt
            );
          })(e, this._makeVerificationRequest());
        }
        _makeVerificationRequest() {
          var {
            temporaryProof: e,
            phoneNumber: t,
            verificationId: n,
            verificationCode: r,
          } = this.params;
          return e && t
            ? { temporaryProof: e, phoneNumber: t }
            : { sessionInfo: n, code: r };
        }
        toJSON() {
          const e = { providerId: this.providerId };
          return (
            this.params.phoneNumber &&
              (e.phoneNumber = this.params.phoneNumber),
            this.params.temporaryProof &&
              (e.temporaryProof = this.params.temporaryProof),
            this.params.verificationCode &&
              (e.verificationCode = this.params.verificationCode),
            this.params.verificationId &&
              (e.verificationId = this.params.verificationId),
            e
          );
        }
        static fromJSON(e) {
          var {
            verificationId: e,
            verificationCode: t,
            phoneNumber: n,
            temporaryProof: r,
          } = (e = "string" == typeof e ? JSON.parse(e) : e);
          return t || e || n || r
            ? new Dt({
                verificationId: e,
                verificationCode: t,
                phoneNumber: n,
                temporaryProof: r,
              })
            : null;
        }
      }
      class Ut {
        constructor(e) {
          var t = Y($(e)),
            n = null != (e = t.apiKey) ? e : null,
            e = null != (r = t.oobCode) ? r : null,
            r = (function () {
              switch (null !== (r = t.mode) && void 0 !== r ? r : null) {
                case "recoverEmail":
                  return "RECOVER_EMAIL";
                case "resetPassword":
                  return "PASSWORD_RESET";
                case "signIn":
                  return "EMAIL_SIGNIN";
                case "verifyEmail":
                  return "VERIFY_EMAIL";
                case "verifyAndChangeEmail":
                  return "VERIFY_AND_CHANGE_EMAIL";
                case "revertSecondFactorAddition":
                  return "REVERT_SECOND_FACTOR_ADDITION";
                default:
                  return null;
              }
            })();
          v(n && e && r, "argument-error"),
            (this.apiKey = n),
            (this.operation = r),
            (this.code = e),
            (this.continueUrl = null != (e = t.continueUrl) ? e : null),
            (this.languageCode = null != (e = t.languageCode) ? e : null),
            (this.tenantId = null != (t = t.tenantId) ? t : null);
        }
        static parseLink(e) {
          t = (r = Y($(e)).link) ? Y($(r)).deep_link_id : null;
          var t,
            n,
            r =
              ((n = Y($(e)).deep_link_id) ? Y($(n)).link : null) ||
              n ||
              t ||
              r ||
              e;
          try {
            return new Ut(r);
          } catch (e) {
            return null;
          }
        }
      }
      class Mt {
        constructor() {
          this.providerId = Mt.PROVIDER_ID;
        }
        static credential(e, t) {
          return Ot._fromEmailAndPassword(e, t);
        }
        static credentialWithLink(e, t) {
          t = Ut.parseLink(t);
          return (
            v(t, "argument-error"), Ot._fromEmailAndCode(e, t.code, t.tenantId)
          );
        }
      }
      (Mt.PROVIDER_ID = "password"),
        (Mt.EMAIL_PASSWORD_SIGN_IN_METHOD = "password"),
        (Mt.EMAIL_LINK_SIGN_IN_METHOD = "emailLink");
      class k {
        constructor(e) {
          (this.providerId = e),
            (this.defaultLanguageCode = null),
            (this.customParameters = {});
        }
        setDefaultLanguage(e) {
          this.defaultLanguageCode = e;
        }
        setCustomParameters(e) {
          return (this.customParameters = e), this;
        }
        getCustomParameters() {
          return this.customParameters;
        }
      }
      class Ft extends k {
        constructor() {
          super(...arguments), (this.scopes = []);
        }
        addScope(e) {
          return this.scopes.includes(e) || this.scopes.push(e), this;
        }
        getScopes() {
          return [...this.scopes];
        }
      }
      class Vt extends Ft {
        static credentialFromJSON(e) {
          e = "string" == typeof e ? JSON.parse(e) : e;
          return (
            v("providerId" in e && "signInMethod" in e, "argument-error"),
            b._fromParams(e)
          );
        }
        credential(e) {
          return this._credential(
            Object.assign(Object.assign({}, e), { nonce: e.rawNonce })
          );
        }
        _credential(e) {
          return (
            v(e.idToken || e.accessToken, "argument-error"),
            b._fromParams(
              Object.assign(Object.assign({}, e), {
                providerId: this.providerId,
                signInMethod: this.providerId,
              })
            )
          );
        }
        static credentialFromResult(e) {
          return Vt.oauthCredentialFromTaggedObject(e);
        }
        static credentialFromError(e) {
          return Vt.oauthCredentialFromTaggedObject(e.customData || {});
        }
        static oauthCredentialFromTaggedObject({ _tokenResponse: e }) {
          if (!e) return null;
          var {
            oauthIdToken: t,
            oauthAccessToken: n,
            oauthTokenSecret: r,
            pendingToken: i,
            nonce: s,
            providerId: a,
          } = e;
          if (!(n || r || t || i)) return null;
          if (!a) return null;
          try {
            return new Vt(a)._credential({
              idToken: t,
              accessToken: n,
              nonce: s,
              pendingToken: i,
            });
          } catch (e) {
            return null;
          }
        }
      }
      class S extends Ft {
        constructor() {
          super("facebook.com");
        }
        static credential(e) {
          return b._fromParams({
            providerId: S.PROVIDER_ID,
            signInMethod: S.FACEBOOK_SIGN_IN_METHOD,
            accessToken: e,
          });
        }
        static credentialFromResult(e) {
          return S.credentialFromTaggedObject(e);
        }
        static credentialFromError(e) {
          return S.credentialFromTaggedObject(e.customData || {});
        }
        static credentialFromTaggedObject({ _tokenResponse: e }) {
          if (!(e && "oauthAccessToken" in e)) return null;
          if (!e.oauthAccessToken) return null;
          try {
            return S.credential(e.oauthAccessToken);
          } catch (e) {
            return null;
          }
        }
      }
      (S.FACEBOOK_SIGN_IN_METHOD = "facebook.com"),
        (S.PROVIDER_ID = "facebook.com");
      class R extends Ft {
        constructor() {
          super("google.com"), this.addScope("profile");
        }
        static credential(e, t) {
          return b._fromParams({
            providerId: R.PROVIDER_ID,
            signInMethod: R.GOOGLE_SIGN_IN_METHOD,
            idToken: e,
            accessToken: t,
          });
        }
        static credentialFromResult(e) {
          return R.credentialFromTaggedObject(e);
        }
        static credentialFromError(e) {
          return R.credentialFromTaggedObject(e.customData || {});
        }
        static credentialFromTaggedObject({ _tokenResponse: e }) {
          if (!e) return null;
          var { oauthIdToken: t, oauthAccessToken: n } = e;
          if (!t && !n) return null;
          try {
            return R.credential(t, n);
          } catch (e) {
            return null;
          }
        }
      }
      (R.GOOGLE_SIGN_IN_METHOD = "google.com"), (R.PROVIDER_ID = "google.com");
      class P extends Ft {
        constructor() {
          super("github.com");
        }
        static credential(e) {
          return b._fromParams({
            providerId: P.PROVIDER_ID,
            signInMethod: P.GITHUB_SIGN_IN_METHOD,
            accessToken: e,
          });
        }
        static credentialFromResult(e) {
          return P.credentialFromTaggedObject(e);
        }
        static credentialFromError(e) {
          return P.credentialFromTaggedObject(e.customData || {});
        }
        static credentialFromTaggedObject({ _tokenResponse: e }) {
          if (!(e && "oauthAccessToken" in e)) return null;
          if (!e.oauthAccessToken) return null;
          try {
            return P.credential(e.oauthAccessToken);
          } catch (e) {
            return null;
          }
        }
      }
      (P.GITHUB_SIGN_IN_METHOD = "github.com"), (P.PROVIDER_ID = "github.com");
      class xt extends bt {
        constructor(e, t) {
          super(e, e), (this.pendingToken = t);
        }
        _getIdTokenResponse(e) {
          return E(e, this.buildRequest());
        }
        _linkToIdToken(e, t) {
          const n = this.buildRequest();
          return (n.idToken = t), E(e, n);
        }
        _getReauthenticationResolver(e) {
          const t = this.buildRequest();
          return (t.autoCreate = !1), E(e, t);
        }
        toJSON() {
          return {
            signInMethod: this.signInMethod,
            providerId: this.providerId,
            pendingToken: this.pendingToken,
          };
        }
        static fromJSON(e) {
          var {
            providerId: e,
            signInMethod: t,
            pendingToken: n,
          } = "string" == typeof e ? JSON.parse(e) : e;
          return e && t && n && e === t ? new xt(e, n) : null;
        }
        static _create(e, t) {
          return new xt(e, t);
        }
        buildRequest() {
          return {
            requestUri: "http://localhost",
            returnSecureToken: !0,
            pendingToken: this.pendingToken,
          };
        }
      }
      class jt extends k {
        constructor(e) {
          v(e.startsWith("saml."), "argument-error"), super(e);
        }
        static credentialFromResult(e) {
          return jt.samlCredentialFromTaggedObject(e);
        }
        static credentialFromError(e) {
          return jt.samlCredentialFromTaggedObject(e.customData || {});
        }
        static credentialFromJSON(e) {
          e = xt.fromJSON(e);
          return v(e, "argument-error"), e;
        }
        static samlCredentialFromTaggedObject({ _tokenResponse: e }) {
          if (!e) return null;
          var { pendingToken: t, providerId: n } = e;
          if (!t || !n) return null;
          try {
            return xt._create(n, t);
          } catch (e) {
            return null;
          }
        }
      }
      class A extends Ft {
        constructor() {
          super("twitter.com");
        }
        static credential(e, t) {
          return b._fromParams({
            providerId: A.PROVIDER_ID,
            signInMethod: A.TWITTER_SIGN_IN_METHOD,
            oauthToken: e,
            oauthTokenSecret: t,
          });
        }
        static credentialFromResult(e) {
          return A.credentialFromTaggedObject(e);
        }
        static credentialFromError(e) {
          return A.credentialFromTaggedObject(e.customData || {});
        }
        static credentialFromTaggedObject({ _tokenResponse: e }) {
          if (!e) return null;
          var { oauthAccessToken: t, oauthTokenSecret: n } = e;
          if (!t || !n) return null;
          try {
            return A.credential(t, n);
          } catch (e) {
            return null;
          }
        }
      }
      async function Ht(e, t) {
        return l(e, "POST", "/v1/accounts:signUp", s(e, t));
      }
      (A.TWITTER_SIGN_IN_METHOD = "twitter.com"),
        (A.PROVIDER_ID = "twitter.com");
      class C {
        constructor(e) {
          (this.user = e.user),
            (this.providerId = e.providerId),
            (this._tokenResponse = e._tokenResponse),
            (this.operationType = e.operationType);
        }
        static async _fromIdTokenResponse(e, t, n, r = !1) {
          (e = await y._fromIdTokenResponse(e, n, r)), (r = Wt(n));
          return new C({
            user: e,
            providerId: r,
            _tokenResponse: n,
            operationType: t,
          });
        }
        static async _forOperation(e, t, n) {
          await e._updateTokensIfNecessary(n, !0);
          var r = Wt(n);
          return new C({
            user: e,
            providerId: r,
            _tokenResponse: n,
            operationType: t,
          });
        }
      }
      function Wt(e) {
        return e.providerId || ("phoneNumber" in e ? "phone" : null);
      }
      class qt extends d {
        constructor(e, t, n, r) {
          super(t.code, t.message),
            (this.operationType = n),
            (this.user = r),
            Object.setPrototypeOf(this, qt.prototype),
            (this.customData = {
              appName: e.name,
              tenantId: null != (r = e.tenantId) ? r : void 0,
              _serverResponse: t.customData._serverResponse,
              operationType: n,
            });
        }
        static _fromErrorAndOperation(e, t, n, r) {
          return new qt(e, t, n, r);
        }
      }
      function Bt(t, n, e, r) {
        const i =
          "reauthenticate" === n
            ? e._getReauthenticationResolver(t)
            : e._getIdTokenResponse(t);
        return i.catch((e) => {
          if ("auth/multi-factor-auth-required" === e.code)
            throw qt._fromErrorAndOperation(t, e, n, r);
          throw e;
        });
      }
      function zt(e) {
        return new Set(e.map(({ providerId: e }) => e).filter((e) => !!e));
      }
      async function Gt(e, t, n = !1) {
        t = await u(e, t._linkToIdToken(e.auth, await e.getIdToken()), n);
        return C._forOperation(e, "link", t);
      }
      async function Kt(e, t, n) {
        await Be(t);
        const r = zt(t.providerData);
        var i = !1 === e ? "provider-already-linked" : "no-such-provider";
        v(r.has(n) === e, t.auth, i);
      }
      async function Jt(e, t, n = !1) {
        var r = e.auth;
        if (li._isFirebaseServerApp(r.app)) return Promise.reject(c(r));
        var i = "reauthenticate";
        try {
          var s = await u(e, Bt(r, i, t, e), n),
            a = (v(s.idToken, r, "internal-error"), je(s.idToken)),
            o = (v(a, r, "internal-error"), a.sub);
          return v(e.uid === o, r, "user-mismatch"), C._forOperation(e, i, s);
        } catch (e) {
          throw (
            ("auth/user-not-found" === (null == e ? void 0 : e.code) &&
              p(r, "user-mismatch"),
            e)
          );
        }
      }
      async function Yt(e, t, n = !1) {
        if (li._isFirebaseServerApp(e.app)) return Promise.reject(c(e));
        (t = await Bt(e, "signIn", t)),
          (t = await C._fromIdTokenResponse(e, "signIn", t));
        return n || (await e._updateCurrentUser(t.user)), t;
      }
      async function $t(e, t) {
        return Yt(w(e), t);
      }
      async function Xt(e, t) {
        e = o(e);
        return await Kt(!1, e, t.providerId), Gt(e, t);
      }
      async function Qt(e, t) {
        return Jt(o(e), t);
      }
      class Zt {
        constructor(e, t) {
          (this.factorId = e),
            (this.uid = t.mfaEnrollmentId),
            (this.enrollmentTime = new Date(t.enrolledAt).toUTCString()),
            (this.displayName = t.displayName);
        }
        static _fromServerResponse(e, t) {
          return "phoneInfo" in t
            ? en._fromServerResponse(e, t)
            : "totpInfo" in t
            ? tn._fromServerResponse(e, t)
            : p(e, "internal-error");
        }
      }
      class en extends Zt {
        constructor(e) {
          super("phone", e), (this.phoneNumber = e.phoneInfo);
        }
        static _fromServerResponse(e, t) {
          return new en(t);
        }
      }
      class tn extends Zt {
        constructor(e) {
          super("totp", e);
        }
        static _fromServerResponse(e, t) {
          return new tn(t);
        }
      }
      function nn(e, t, n) {
        var r;
        v(
          0 < (null == (r = n.url) ? void 0 : r.length),
          e,
          "invalid-continue-uri"
        ),
          v(
            void 0 === n.dynamicLinkDomain || 0 < n.dynamicLinkDomain.length,
            e,
            "invalid-dynamic-link-domain"
          ),
          (t.continueUrl = n.url),
          (t.dynamicLinkDomain = n.dynamicLinkDomain),
          (t.canHandleCodeInApp = n.handleCodeInApp),
          n.iOS &&
            (v(0 < n.iOS.bundleId.length, e, "missing-ios-bundle-id"),
            (t.iOSBundleId = n.iOS.bundleId)),
          n.android &&
            (v(0 < n.android.packageName.length, e, "missing-android-pkg-name"),
            (t.androidInstallApp = n.android.installApp),
            (t.androidMinimumVersionCode = n.android.minimumVersion),
            (t.androidPackageName = n.android.packageName));
      }
      async function rn(e) {
        const t = w(e);
        t._getPasswordPolicyInternal() && (await t._updatePasswordPolicy());
      }
      async function sn(e, t) {
        var n = o(e),
          r = await kt(n, { oobCode: t }),
          e = r.requestType;
        switch ((v(e, n, "internal-error"), e)) {
          case "EMAIL_SIGNIN":
            break;
          case "VERIFY_AND_CHANGE_EMAIL":
            v(r.newEmail, n, "internal-error");
            break;
          case "REVERT_SECOND_FACTOR_ADDITION":
            v(r.mfaInfo, n, "internal-error");
          default:
            v(r.email, n, "internal-error");
        }
        let i = null;
        return (
          r.mfaInfo && (i = Zt._fromServerResponse(w(n), r.mfaInfo)),
          {
            data: {
              email:
                ("VERIFY_AND_CHANGE_EMAIL" === r.requestType
                  ? r.newEmail
                  : r.email) || null,
              previousEmail:
                ("VERIFY_AND_CHANGE_EMAIL" === r.requestType
                  ? r.email
                  : r.newEmail) || null,
              multiFactorInfo: i,
            },
            operation: e,
          }
        );
      }
      async function an(e, t, n) {
        var r = e.auth;
        const i = { idToken: await e.getIdToken(), returnSecureToken: !0 };
        t && (i.email = t),
          n && (i.password = n),
          (r = await u(
            e,
            (async function (e, t) {
              return a(e, "POST", "/v1/accounts:update", t);
            })(r, i)
          )),
          await e._updateTokensIfNecessary(r, !0);
      }
      class on {
        constructor(e, t, n = {}) {
          (this.isNewUser = e), (this.providerId = t), (this.profile = n);
        }
      }
      class cn extends on {
        constructor(e, t, n, r) {
          super(e, t, n), (this.username = r);
        }
      }
      class ln extends on {
        constructor(e, t) {
          super(e, "facebook.com", t);
        }
      }
      class un extends cn {
        constructor(e, t) {
          super(
            e,
            "github.com",
            t,
            "string" == typeof (null == t ? void 0 : t.login)
              ? null == t
                ? void 0
                : t.login
              : null
          );
        }
      }
      class dn extends on {
        constructor(e, t) {
          super(e, "google.com", t);
        }
      }
      class hn extends cn {
        constructor(e, t, n) {
          super(e, "twitter.com", t, n);
        }
      }
      class pn {
        constructor(e, t, n) {
          (this.type = e), (this.credential = t), (this.user = n);
        }
        static _fromIdtoken(e, t) {
          return new pn("enroll", e, t);
        }
        static _fromMfaPendingCredential(e) {
          return new pn("signin", e);
        }
        toJSON() {
          return {
            multiFactorSession: {
              ["enroll" === this.type ? "idToken" : "pendingCredential"]:
                this.credential,
            },
          };
        }
        static fromJSON(e) {
          var t;
          if (null != e && e.multiFactorSession) {
            if (null != (t = e.multiFactorSession) && t.pendingCredential)
              return pn._fromMfaPendingCredential(
                e.multiFactorSession.pendingCredential
              );
            if (null != (t = e.multiFactorSession) && t.idToken)
              return pn._fromIdtoken(e.multiFactorSession.idToken);
          }
          return null;
        }
      }
      class mn {
        constructor(e, t, n) {
          (this.session = e), (this.hints = t), (this.signInResolver = n);
        }
        static _fromError(e, r) {
          const i = w(e),
            s = r.customData._serverResponse;
          e = (s.mfaInfo || []).map((e) => Zt._fromServerResponse(i, e));
          v(s.mfaPendingCredential, i, "internal-error");
          const a = pn._fromMfaPendingCredential(s.mfaPendingCredential);
          return new mn(a, e, async (e) => {
            var e = await e._process(i, a),
              t =
                (delete s.mfaInfo,
                delete s.mfaPendingCredential,
                Object.assign(Object.assign({}, s), {
                  idToken: e.idToken,
                  refreshToken: e.refreshToken,
                }));
            switch (r.operationType) {
              case "signIn":
                var n = await C._fromIdTokenResponse(i, r.operationType, t);
                return await i._updateCurrentUser(n.user), n;
              case "reauthenticate":
                return (
                  v(r.user, i, "internal-error"),
                  C._forOperation(r.user, r.operationType, t)
                );
              default:
                p(i, "internal-error");
            }
          });
        }
        async resolveSignIn(e) {
          return this.signInResolver(e);
        }
      }
      function fn(e, t) {
        return a(e, "POST", "/v2/accounts/mfaEnrollment:start", s(e, t));
      }
      class gn {
        constructor(t) {
          (this.user = t),
            (this.enrolledFactors = []),
            t._onReload((e) => {
              e.mfaInfo &&
                (this.enrolledFactors = e.mfaInfo.map((e) =>
                  Zt._fromServerResponse(t.auth, e)
                ));
            });
        }
        static _fromUser(e) {
          return new gn(e);
        }
        async getSession() {
          return pn._fromIdtoken(await this.user.getIdToken(), this.user);
        }
        async enroll(e, t) {
          const n = e;
          (e = await this.getSession()),
            (e = await u(this.user, n._process(this.user.auth, e, t)));
          return (
            await this.user._updateTokensIfNecessary(e), this.user.reload()
          );
        }
        async unenroll(e) {
          const t = "string" == typeof e ? e : e.uid;
          var n,
            r = await this.user.getIdToken();
          try {
            var i = await u(
              this.user,
              a(
                (n = this.user.auth),
                "POST",
                "/v2/accounts/mfaEnrollment:withdraw",
                s(n, { idToken: r, mfaEnrollmentId: t })
              )
            );
            (this.enrolledFactors = this.enrolledFactors.filter(
              ({ uid: e }) => e !== t
            )),
              await this.user._updateTokensIfNecessary(i),
              await this.user.reload();
          } catch (e) {
            throw e;
          }
        }
      }
      const vn = new WeakMap(),
        _n = "__sak";
      class yn {
        constructor(e, t) {
          (this.storageRetriever = e), (this.type = t);
        }
        _isAvailable() {
          try {
            return this.storage
              ? (this.storage.setItem(_n, "1"),
                this.storage.removeItem(_n),
                Promise.resolve(!0))
              : Promise.resolve(!1);
          } catch (e) {
            return Promise.resolve(!1);
          }
        }
        _set(e, t) {
          return this.storage.setItem(e, JSON.stringify(t)), Promise.resolve();
        }
        _get(e) {
          e = this.storage.getItem(e);
          return Promise.resolve(e ? JSON.parse(e) : null);
        }
        _remove(e) {
          return this.storage.removeItem(e), Promise.resolve();
        }
        get storage() {
          return this.storageRetriever();
        }
      }
      class In extends yn {
        constructor() {
          super(() => window.localStorage, "LOCAL"),
            (this.boundEventHandler = (e, t) => this.onStorageEvent(e, t)),
            (this.listeners = {}),
            (this.localCache = {}),
            (this.pollTimer = null),
            (this.fallbackToPolling = at()),
            (this._shouldAllowMigration = !0);
        }
        forAllChangedKeys(e) {
          for (const r of Object.keys(this.listeners)) {
            var t = this.storage.getItem(r),
              n = this.localCache[r];
            t !== n && e(r, n, t);
          }
        }
        onStorageEvent(e, t = !1) {
          if (e.key) {
            const i = e.key;
            t ? this.detachListener() : this.stopPolling();
            var n = () => {
                var e = this.storage.getItem(i);
                (!t && this.localCache[i] === e) || this.notifyListeners(i, e);
              },
              r = this.storage.getItem(i);
            B() &&
            10 === document.documentMode &&
            r !== e.newValue &&
            e.newValue !== e.oldValue
              ? setTimeout(n, 10)
              : n();
          } else
            this.forAllChangedKeys((e, t, n) => {
              this.notifyListeners(e, n);
            });
        }
        notifyListeners(e, t) {
          this.localCache[e] = t;
          e = this.listeners[e];
          if (e) for (const n of Array.from(e)) n(t && JSON.parse(t));
        }
        startPolling() {
          this.stopPolling(),
            (this.pollTimer = setInterval(() => {
              this.forAllChangedKeys((e, t, n) => {
                this.onStorageEvent(
                  new StorageEvent("storage", {
                    key: e,
                    oldValue: t,
                    newValue: n,
                  }),
                  !0
                );
              });
            }, 1e3));
        }
        stopPolling() {
          this.pollTimer &&
            (clearInterval(this.pollTimer), (this.pollTimer = null));
        }
        attachListener() {
          window.addEventListener("storage", this.boundEventHandler);
        }
        detachListener() {
          window.removeEventListener("storage", this.boundEventHandler);
        }
        _addListener(e, t) {
          0 === Object.keys(this.listeners).length &&
            (this.fallbackToPolling
              ? this.startPolling()
              : this.attachListener()),
            this.listeners[e] ||
              ((this.listeners[e] = new Set()),
              (this.localCache[e] = this.storage.getItem(e))),
            this.listeners[e].add(t);
        }
        _removeListener(e, t) {
          this.listeners[e] &&
            (this.listeners[e].delete(t),
            0 === this.listeners[e].size && delete this.listeners[e]),
            0 === Object.keys(this.listeners).length &&
              (this.detachListener(), this.stopPolling());
        }
        async _set(e, t) {
          await super._set(e, t), (this.localCache[e] = JSON.stringify(t));
        }
        async _get(e) {
          var t = await super._get(e);
          return (this.localCache[e] = JSON.stringify(t)), t;
        }
        async _remove(e) {
          await super._remove(e), delete this.localCache[e];
        }
      }
      In.type = "LOCAL";
      const wn = In;
      class Tn extends yn {
        constructor() {
          super(() => window.sessionStorage, "SESSION");
        }
        _addListener(e, t) {}
        _removeListener(e, t) {}
      }
      Tn.type = "SESSION";
      const En = Tn;
      class bn {
        constructor(e) {
          (this.eventTarget = e),
            (this.handlersMap = {}),
            (this.boundEventHandler = this.handleEvent.bind(this));
        }
        static _getInstance(t) {
          var e = this.receivers.find((e) => e.isListeningto(t));
          return e || ((e = new bn(t)), this.receivers.push(e), e);
        }
        isListeningto(e) {
          return this.eventTarget === e;
        }
        async handleEvent(e) {
          const t = e,
            { eventId: n, eventType: r, data: i } = t.data;
          e = this.handlersMap[r];
          null != e &&
            e.size &&
            (t.ports[0].postMessage({
              status: "ack",
              eventId: n,
              eventType: r,
            }),
            (e = Array.from(e).map(async (e) => e(t.origin, i))),
            (e = await Promise.all(
              e.map(async (e) => {
                try {
                  return { fulfilled: !0, value: await e };
                } catch (e) {
                  return { fulfilled: !1, reason: e };
                }
              })
            )),
            t.ports[0].postMessage({
              status: "done",
              eventId: n,
              eventType: r,
              response: e,
            }));
        }
        _subscribe(e, t) {
          0 === Object.keys(this.handlersMap).length &&
            this.eventTarget.addEventListener(
              "message",
              this.boundEventHandler
            ),
            this.handlersMap[e] || (this.handlersMap[e] = new Set()),
            this.handlersMap[e].add(t);
        }
        _unsubscribe(e, t) {
          this.handlersMap[e] && t && this.handlersMap[e].delete(t),
            (t && 0 !== this.handlersMap[e].size) || delete this.handlersMap[e],
            0 === Object.keys(this.handlersMap).length &&
              this.eventTarget.removeEventListener(
                "message",
                this.boundEventHandler
              );
        }
      }
      function kn(e = "", t = 10) {
        let n = "";
        for (let e = 0; e < t; e++) n += Math.floor(10 * Math.random());
        return e + n;
      }
      bn.receivers = [];
      class Sn {
        constructor(e) {
          (this.target = e), (this.handlers = new Set());
        }
        removeMessageHandler(e) {
          e.messageChannel &&
            (e.messageChannel.port1.removeEventListener("message", e.onMessage),
            e.messageChannel.port1.close()),
            this.handlers.delete(e);
        }
        async _send(e, t, a = 50) {
          const o =
            "undefined" != typeof MessageChannel ? new MessageChannel() : null;
          if (!o) throw new Error("connection_unavailable");
          let c, l;
          return new Promise((n, r) => {
            const i = kn("", 20),
              s =
                (o.port1.start(),
                setTimeout(() => {
                  r(new Error("unsupported_event"));
                }, a));
            (l = {
              messageChannel: o,
              onMessage(e) {
                var t = e;
                if (t.data.eventId === i)
                  switch (t.data.status) {
                    case "ack":
                      clearTimeout(s),
                        (c = setTimeout(() => {
                          r(new Error("timeout"));
                        }, 3e3));
                      break;
                    case "done":
                      clearTimeout(c), n(t.data.response);
                      break;
                    default:
                      clearTimeout(s),
                        clearTimeout(c),
                        r(new Error("invalid_response"));
                  }
              },
            }),
              this.handlers.add(l),
              o.port1.addEventListener("message", l.onMessage),
              this.target.postMessage({ eventType: e, eventId: i, data: t }, [
                o.port2,
              ]);
          }).finally(() => {
            l && this.removeMessageHandler(l);
          });
        }
      }
      function O() {
        return window;
      }
      function Rn() {
        return (
          void 0 !== O().WorkerGlobalScope &&
          "function" == typeof O().importScripts
        );
      }
      const Pn = "firebaseLocalStorageDb",
        An = "firebaseLocalStorage";
      class Cn {
        constructor(e) {
          this.request = e;
        }
        toPromise() {
          return new Promise((e, t) => {
            this.request.addEventListener("success", () => {
              e(this.request.result);
            }),
              this.request.addEventListener("error", () => {
                t(this.request.error);
              });
          });
        }
      }
      function On(e, t) {
        return e
          .transaction([An], t ? "readwrite" : "readonly")
          .objectStore(An);
      }
      function Nn() {
        const r = indexedDB.open(Pn, 1);
        return new Promise((n, t) => {
          r.addEventListener("error", () => {
            t(r.error);
          }),
            r.addEventListener("upgradeneeded", () => {
              const e = r.result;
              try {
                e.createObjectStore(An, { keyPath: "fbase_key" });
              } catch (e) {
                t(e);
              }
            }),
            r.addEventListener("success", async () => {
              const e = r.result;
              var t;
              e.objectStoreNames.contains(An)
                ? n(e)
                : (e.close(),
                  (t = indexedDB.deleteDatabase(Pn)),
                  await new Cn(t).toPromise(),
                  n(await Nn()));
            });
        });
      }
      async function Ln(e, t, n) {
        e = On(e, !0).put({ fbase_key: t, value: n });
        return new Cn(e).toPromise();
      }
      function Dn(e, t) {
        e = On(e, !0).delete(t);
        return new Cn(e).toPromise();
      }
      class Un {
        constructor() {
          (this.type = "LOCAL"),
            (this._shouldAllowMigration = !0),
            (this.listeners = {}),
            (this.localCache = {}),
            (this.pollTimer = null),
            (this.pendingWrites = 0),
            (this.receiver = null),
            (this.sender = null),
            (this.serviceWorkerReceiverAvailable = !1),
            (this.activeServiceWorker = null),
            (this._workerInitializationPromise =
              this.initializeServiceWorkerMessaging().then(
                () => {},
                () => {}
              ));
        }
        async _openDb() {
          return this.db || ((this.db = await Nn()), this.db);
        }
        async _withRetries(e) {
          let t = 0;
          for (;;)
            try {
              return e(await this._openDb());
            } catch (e) {
              if (3 < t++) throw e;
              this.db && (this.db.close(), (this.db = void 0));
            }
        }
        async initializeServiceWorkerMessaging() {
          return Rn() ? this.initializeReceiver() : this.initializeSender();
        }
        async initializeReceiver() {
          (this.receiver = bn._getInstance(Rn() ? self : null)),
            this.receiver._subscribe("keyChanged", async (e, t) => {
              const n = await this._poll();
              return { keyProcessed: n.includes(t.key) };
            }),
            this.receiver._subscribe("ping", async (e, t) => ["keyChanged"]);
        }
        async initializeSender() {
          var e, t;
          (this.activeServiceWorker = await (async function () {
            if (
              null === navigator ||
              void 0 === navigator ||
              !navigator.serviceWorker
            )
              return null;
            try {
              return (await navigator.serviceWorker.ready).active;
            } catch (e) {
              return null;
            }
          })()),
            this.activeServiceWorker &&
              ((this.sender = new Sn(this.activeServiceWorker)),
              (t = await this.sender._send("ping", {}, 800)) &&
                null != (e = t[0]) &&
                e.fulfilled &&
                null != (e = t[0]) &&
                e.value.includes("keyChanged") &&
                (this.serviceWorkerReceiverAvailable = !0));
        }
        async notifyServiceWorker(e) {
          var t;
          if (
            this.sender &&
            this.activeServiceWorker &&
            ((null ==
            (t =
              null === navigator || void 0 === navigator
                ? void 0
                : navigator.serviceWorker)
              ? void 0
              : t.controller) || null) === this.activeServiceWorker
          )
            try {
              await this.sender._send(
                "keyChanged",
                { key: e },
                this.serviceWorkerReceiverAvailable ? 800 : 50
              );
            } catch (e) {}
        }
        async _isAvailable() {
          try {
            if (!indexedDB) return !1;
            var e = await Nn();
            return await Ln(e, _n, "1"), await Dn(e, _n), !0;
          } catch (e) {}
          return !1;
        }
        async _withPendingWrite(e) {
          this.pendingWrites++;
          try {
            await e();
          } finally {
            this.pendingWrites--;
          }
        }
        async _set(t, n) {
          return this._withPendingWrite(
            async () => (
              await this._withRetries((e) => Ln(e, t, n)),
              (this.localCache[t] = n),
              this.notifyServiceWorker(t)
            )
          );
        }
        async _get(e) {
          var t = await this._withRetries((t) =>
            (async function (e) {
              e = On(t, !1).get(e);
              return void 0 === (e = await new Cn(e).toPromise())
                ? null
                : e.value;
            })(e)
          );
          return (this.localCache[e] = t);
        }
        async _remove(t) {
          return this._withPendingWrite(
            async () => (
              await this._withRetries((e) => Dn(e, t)),
              delete this.localCache[t],
              this.notifyServiceWorker(t)
            )
          );
        }
        async _poll() {
          var e = await this._withRetries((e) => {
            e = On(e, !1).getAll();
            return new Cn(e).toPromise();
          });
          if (!e) return [];
          if (0 !== this.pendingWrites) return [];
          const t = [],
            n = new Set();
          if (0 !== e.length)
            for (var { fbase_key: r, value: i } of e)
              n.add(r),
                JSON.stringify(this.localCache[r]) !== JSON.stringify(i) &&
                  (this.notifyListeners(r, i), t.push(r));
          for (const s of Object.keys(this.localCache))
            this.localCache[s] &&
              !n.has(s) &&
              (this.notifyListeners(s, null), t.push(s));
          return t;
        }
        notifyListeners(e, t) {
          this.localCache[e] = t;
          e = this.listeners[e];
          if (e) for (const n of Array.from(e)) n(t);
        }
        startPolling() {
          this.stopPolling(),
            (this.pollTimer = setInterval(async () => this._poll(), 800));
        }
        stopPolling() {
          this.pollTimer &&
            (clearInterval(this.pollTimer), (this.pollTimer = null));
        }
        _addListener(e, t) {
          0 === Object.keys(this.listeners).length && this.startPolling(),
            this.listeners[e] ||
              ((this.listeners[e] = new Set()), this._get(e)),
            this.listeners[e].add(t);
        }
        _removeListener(e, t) {
          this.listeners[e] &&
            (this.listeners[e].delete(t),
            0 === this.listeners[e].size && delete this.listeners[e]),
            0 === Object.keys(this.listeners).length && this.stopPolling();
        }
      }
      Un.type = "LOCAL";
      const Mn = Un;
      function Fn(e, t) {
        return a(e, "POST", "/v2/accounts/mfaSignIn:start", s(e, t));
      }
      const Vn = mt("rcb"),
        xn = new be(3e4, 6e4);
      class jn {
        constructor() {
          var e;
          (this.hostLanguage = ""),
            (this.counter = 0),
            (this.librarySeparatelyLoaded = !(
              null == (e = O().grecaptcha) || !e.render
            ));
        }
        load(s, a = "") {
          return (
            v(
              a.length <= 6 && /^\s*[a-zA-Z0-9\-]*\s*$/.test(a),
              s,
              "argument-error"
            ),
            this.shouldResolveImmediately(a) && Le(O().grecaptcha)
              ? Promise.resolve(O().grecaptcha)
              : new Promise((t, r) => {
                  const i = O().setTimeout(() => {
                    r(m(s, "network-request-failed"));
                  }, xn.get());
                  (O()[Vn] = () => {
                    O().clearTimeout(i), delete O()[Vn];
                    const e = O().grecaptcha;
                    if (e && Le(e)) {
                      const n = e.render;
                      (e.render = (e, t) => {
                        e = n(e, t);
                        return this.counter++, e;
                      }),
                        (this.hostLanguage = a),
                        t(e);
                    } else r(m(s, "internal-error"));
                  }),
                    pt(
                      ht.recaptchaV2Script +
                        "?" +
                        J({ onload: Vn, render: "explicit", hl: a })
                    ).catch(() => {
                      clearTimeout(i), r(m(s, "internal-error"));
                    });
                })
          );
        }
        clearedOneInstance() {
          this.counter--;
        }
        shouldResolveImmediately(e) {
          var t;
          return (
            !(null == (t = O().grecaptcha) || !t.render) &&
            (e === this.hostLanguage ||
              0 < this.counter ||
              this.librarySeparatelyLoaded)
          );
        }
      }
      class Hn {
        async load(e) {
          return new ft(e);
        }
        clearedOneInstance() {}
      }
      const Wn = "recaptcha",
        qn = { theme: "light", type: "image" };
      class Bn {
        constructor(e, t, n = Object.assign({}, qn)) {
          (this.parameters = n),
            (this.type = Wn),
            (this.destroyed = !1),
            (this.widgetId = null),
            (this.tokenChangeListeners = new Set()),
            (this.renderPromise = null),
            (this.recaptcha = null),
            (this.auth = w(e)),
            (this.isInvisible = "invisible" === this.parameters.size),
            v(
              "undefined" != typeof document,
              this.auth,
              "operation-not-supported-in-this-environment"
            );
          n = "string" == typeof t ? document.getElementById(t) : t;
          v(n, this.auth, "argument-error"),
            (this.container = n),
            (this.parameters.callback = this.makeTokenCallback(
              this.parameters.callback
            )),
            (this._recaptchaLoader = new (
              this.auth.settings.appVerificationDisabledForTesting ? Hn : jn
            )()),
            this.validateStartingState();
        }
        async verify() {
          this.assertNotDestroyed();
          const e = await this.render(),
            r = this.getAssertedRecaptcha();
          return (
            r.getResponse(e) ||
            new Promise((t) => {
              const n = (e) => {
                e && (this.tokenChangeListeners.delete(n), t(e));
              };
              this.tokenChangeListeners.add(n),
                this.isInvisible && r.execute(e);
            })
          );
        }
        render() {
          try {
            this.assertNotDestroyed();
          } catch (e) {
            return Promise.reject(e);
          }
          return (
            this.renderPromise ||
            ((this.renderPromise = this.makeRenderPromise().catch((e) => {
              throw ((this.renderPromise = null), e);
            })),
            this.renderPromise)
          );
        }
        _reset() {
          this.assertNotDestroyed(),
            null !== this.widgetId &&
              this.getAssertedRecaptcha().reset(this.widgetId);
        }
        clear() {
          this.assertNotDestroyed(),
            (this.destroyed = !0),
            this._recaptchaLoader.clearedOneInstance(),
            this.isInvisible ||
              this.container.childNodes.forEach((e) => {
                this.container.removeChild(e);
              });
        }
        validateStartingState() {
          v(!this.parameters.sitekey, this.auth, "argument-error"),
            v(
              this.isInvisible || !this.container.hasChildNodes(),
              this.auth,
              "argument-error"
            ),
            v(
              "undefined" != typeof document,
              this.auth,
              "operation-not-supported-in-this-environment"
            );
        }
        makeTokenCallback(n) {
          return (t) => {
            if (
              (this.tokenChangeListeners.forEach((e) => e(t)),
              "function" == typeof n)
            )
              n(t);
            else if ("string" == typeof n) {
              const e = O()[n];
              "function" == typeof e && e(t);
            }
          };
        }
        assertNotDestroyed() {
          v(!this.destroyed, this.auth, "internal-error");
        }
        async makeRenderPromise() {
          if ((await this.init(), !this.widgetId)) {
            let e = this.container;
            var t;
            this.isInvisible ||
              ((t = document.createElement("div")), e.appendChild(t), (e = t)),
              (this.widgetId = this.getAssertedRecaptcha().render(
                e,
                this.parameters
              ));
          }
          return this.widgetId;
        }
        async init() {
          v(Te() && !Rn(), this.auth, "internal-error"),
            await (function () {
              let t = null;
              return new Promise((e) => {
                "complete" !== document.readyState
                  ? ((t = () => e()), window.addEventListener("load", t))
                  : e();
              }).catch((e) => {
                throw (t && window.removeEventListener("load", t), e);
              });
            })(),
            (this.recaptcha = await this._recaptchaLoader.load(
              this.auth,
              this.auth.languageCode || void 0
            ));
          var e = await ((
            await a(this.auth, "GET", "/v1/recaptchaParams")
          ).recaptchaSiteKey || "");
          v(e, this.auth, "internal-error"), (this.parameters.sitekey = e);
        }
        getAssertedRecaptcha() {
          return v(this.recaptcha, this.auth, "internal-error"), this.recaptcha;
        }
      }
      class zn {
        constructor(e, t) {
          (this.verificationId = e), (this.onConfirmation = t);
        }
        confirm(e) {
          e = Dt._fromVerification(this.verificationId, e);
          return this.onConfirmation(e);
        }
      }
      async function Gn(e, t, n) {
        var r;
        if (!e._getRecaptchaConfig())
          try {
            {
              const d = w(e);
              var i = await Me(d, {
                clientType: "CLIENT_TYPE_WEB",
                version: "RECAPTCHA_ENTERPRISE",
              });
              const h = new Ue(i);
              if (
                (null == d.tenantId
                  ? (d._agentRecaptchaConfig = h)
                  : (d._tenantRecaptchaConfigs[d.tenantId] = h),
                h.isAnyProviderEnabled())
              ) {
                const p = new It(d);
                p.verify();
              }
            }
            await 0;
          } catch (e) {
            console.log(
              "Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification."
            );
          }
        try {
          var s = "string" == typeof t ? { phoneNumber: t } : t;
          if ("session" in s) {
            var a = s.session;
            if ("phoneNumber" in s) {
              v("enroll" === a.type, e, "internal-error");
              var o = {
                idToken: a.credential,
                phoneEnrollmentInfo: {
                  phoneNumber: s.phoneNumber,
                  clientType: "CLIENT_TYPE_WEB",
                },
              };
              const m = T(
                e,
                o,
                "mfaSmsEnrollment",
                async (e, t) =>
                  t.phoneEnrollmentInfo.captchaResponse !== yt
                    ? fn(e, t)
                    : (v(
                        (null == n ? void 0 : n.type) === Wn,
                        e,
                        "argument-error"
                      ),
                      fn(e, await Kn(e, t, n))),
                "PHONE_PROVIDER"
              );
              return (await m.catch((e) => Promise.reject(e))).phoneSessionInfo
                .sessionInfo;
            }
            {
              v("signin" === a.type, e, "internal-error");
              var c =
                  (null == (r = s.multiFactorHint) ? void 0 : r.uid) ||
                  s.multiFactorUid,
                l =
                  (v(c, e, "missing-multi-factor-info"),
                  {
                    mfaPendingCredential: a.credential,
                    mfaEnrollmentId: c,
                    phoneSignInInfo: { clientType: "CLIENT_TYPE_WEB" },
                  });
              const f = T(
                e,
                l,
                "mfaSmsSignIn",
                async (e, t) =>
                  t.phoneSignInInfo.captchaResponse !== yt
                    ? Fn(e, t)
                    : (v(
                        (null == n ? void 0 : n.type) === Wn,
                        e,
                        "argument-error"
                      ),
                      Fn(e, await Kn(e, t, n))),
                "PHONE_PROVIDER"
              );
              return (await f.catch((e) => Promise.reject(e))).phoneResponseInfo
                .sessionInfo;
            }
          }
          {
            var u = {
              phoneNumber: s.phoneNumber,
              clientType: "CLIENT_TYPE_WEB",
            };
            const g = T(
              e,
              u,
              "sendVerificationCode",
              async (e, t) =>
                t.captchaResponse !== yt
                  ? Nt(e, t)
                  : (v(
                      (null == n ? void 0 : n.type) === Wn,
                      e,
                      "argument-error"
                    ),
                    Nt(e, await Kn(e, t, n))),
              "PHONE_PROVIDER"
            );
            return (await g.catch((e) => Promise.reject(e))).sessionInfo;
          }
        } finally {
          null != n && n._reset();
        }
      }
      async function Kn(e, t, n) {
        v(n.type === Wn, e, "argument-error");
        var r,
          i,
          s,
          n = await n.verify(),
          e =
            (v("string" == typeof n, e, "argument-error"),
            Object.assign({}, t));
        return (
          "phoneEnrollmentInfo" in e
            ? ((t = e.phoneEnrollmentInfo.phoneNumber),
              (r = e.phoneEnrollmentInfo.captchaResponse),
              (i = e.phoneEnrollmentInfo.clientType),
              (s = e.phoneEnrollmentInfo.recaptchaVersion),
              Object.assign(e, {
                phoneEnrollmentInfo: {
                  phoneNumber: t,
                  recaptchaToken: n,
                  captchaResponse: r,
                  clientType: i,
                  recaptchaVersion: s,
                },
              }))
            : "phoneSignInInfo" in e
            ? ((r = e.phoneSignInInfo.captchaResponse),
              (i = e.phoneSignInInfo.clientType),
              (s = e.phoneSignInInfo.recaptchaVersion),
              Object.assign(e, {
                phoneSignInInfo: {
                  recaptchaToken: n,
                  captchaResponse: r,
                  clientType: i,
                  recaptchaVersion: s,
                },
              }))
            : Object.assign(e, { recaptchaToken: n }),
          e
        );
      }
      class N {
        constructor(e) {
          (this.providerId = N.PROVIDER_ID), (this.auth = w(e));
        }
        verifyPhoneNumber(e, t) {
          return Gn(this.auth, e, o(t));
        }
        static credential(e, t) {
          return Dt._fromVerification(e, t);
        }
        static credentialFromResult(e) {
          return N.credentialFromTaggedObject(e);
        }
        static credentialFromError(e) {
          return N.credentialFromTaggedObject(e.customData || {});
        }
        static credentialFromTaggedObject({ _tokenResponse: e }) {
          if (!e) return null;
          var { phoneNumber: e, temporaryProof: t } = e;
          return e && t ? Dt._fromTokenResponse(e, t) : null;
        }
      }
      function Jn(e, t) {
        return t
          ? g(t)
          : (v(e._popupRedirectResolver, e, "argument-error"),
            e._popupRedirectResolver);
      }
      (N.PROVIDER_ID = "phone"), (N.PHONE_SIGN_IN_METHOD = "phone");
      class Yn extends bt {
        constructor(e) {
          super("custom", "custom"), (this.params = e);
        }
        _getIdTokenResponse(e) {
          return E(e, this._buildIdpRequest());
        }
        _linkToIdToken(e, t) {
          return E(e, this._buildIdpRequest(t));
        }
        _getReauthenticationResolver(e) {
          return E(e, this._buildIdpRequest());
        }
        _buildIdpRequest(e) {
          const t = {
            requestUri: this.params.requestUri,
            sessionId: this.params.sessionId,
            postBody: this.params.postBody,
            tenantId: this.params.tenantId,
            pendingToken: this.params.pendingToken,
            returnSecureToken: !0,
            returnIdpCredential: !0,
          };
          return e && (t.idToken = e), t;
        }
      }
      function $n(e) {
        return Yt(e.auth, new Yn(e), e.bypassAuthState);
      }
      function Xn(e) {
        var { auth: t, user: n } = e;
        return v(n, t, "internal-error"), Jt(n, new Yn(e), e.bypassAuthState);
      }
      async function Qn(e) {
        var { auth: t, user: n } = e;
        return v(n, t, "internal-error"), Gt(n, new Yn(e), e.bypassAuthState);
      }
      class Zn {
        constructor(e, t, n, r, i = !1) {
          (this.auth = e),
            (this.resolver = n),
            (this.user = r),
            (this.bypassAuthState = i),
            (this.pendingPromise = null),
            (this.eventManager = null),
            (this.filter = Array.isArray(t) ? t : [t]);
        }
        execute() {
          return new Promise(async (e, t) => {
            this.pendingPromise = { resolve: e, reject: t };
            try {
              (this.eventManager = await this.resolver._initialize(this.auth)),
                await this.onExecution(),
                this.eventManager.registerConsumer(this);
            } catch (e) {
              this.reject(e);
            }
          });
        }
        async onAuthEvent(e) {
          var {
            urlResponse: t,
            sessionId: n,
            postBody: r,
            tenantId: i,
            error: s,
            type: a,
          } = e;
          if (s) this.reject(s);
          else {
            r = {
              auth: this.auth,
              requestUri: t,
              sessionId: n,
              tenantId: i || void 0,
              postBody: r || void 0,
              user: this.user,
              bypassAuthState: this.bypassAuthState,
            };
            try {
              this.resolve(await this.getIdpTask(a)(r));
            } catch (e) {
              this.reject(e);
            }
          }
        }
        onError(e) {
          this.reject(e);
        }
        getIdpTask(e) {
          switch (e) {
            case "signInViaPopup":
            case "signInViaRedirect":
              return $n;
            case "linkViaPopup":
            case "linkViaRedirect":
              return Qn;
            case "reauthViaPopup":
            case "reauthViaRedirect":
              return Xn;
            default:
              p(this.auth, "internal-error");
          }
        }
        resolve(e) {
          f(this.pendingPromise, "Pending promise was never set"),
            this.pendingPromise.resolve(e),
            this.unregisterAndCleanUp();
        }
        reject(e) {
          f(this.pendingPromise, "Pending promise was never set"),
            this.pendingPromise.reject(e),
            this.unregisterAndCleanUp();
        }
        unregisterAndCleanUp() {
          this.eventManager && this.eventManager.unregisterConsumer(this),
            (this.pendingPromise = null),
            this.cleanUp();
        }
      }
      const er = new be(2e3, 1e4);
      class L extends Zn {
        constructor(e, t, n, r, i) {
          super(e, t, r, i),
            (this.provider = n),
            (this.authWindow = null),
            (this.pollId = null),
            L.currentPopupAction && L.currentPopupAction.cancel(),
            (L.currentPopupAction = this);
        }
        async executeNotNull() {
          var e = await this.execute();
          return v(e, this.auth, "internal-error"), e;
        }
        async onExecution() {
          f(1 === this.filter.length, "Popup operations only handle one event");
          var e = kn();
          (this.authWindow = await this.resolver._openPopup(
            this.auth,
            this.provider,
            this.filter[0],
            e
          )),
            (this.authWindow.associatedEvent = e),
            this.resolver._originValidation(this.auth).catch((e) => {
              this.reject(e);
            }),
            this.resolver._isIframeWebStorageSupported(this.auth, (e) => {
              e || this.reject(m(this.auth, "web-storage-unsupported"));
            }),
            this.pollUserCancellation();
        }
        get eventId() {
          var e;
          return (
            (null == (e = this.authWindow) ? void 0 : e.associatedEvent) || null
          );
        }
        cancel() {
          this.reject(m(this.auth, "cancelled-popup-request"));
        }
        cleanUp() {
          this.authWindow && this.authWindow.close(),
            this.pollId && window.clearTimeout(this.pollId),
            (this.authWindow = null),
            (this.pollId = null),
            (L.currentPopupAction = null);
        }
        pollUserCancellation() {
          const t = () => {
            var e;
            null != (e = null == (e = this.authWindow) ? void 0 : e.window) &&
            e.closed
              ? (this.pollId = window.setTimeout(() => {
                  (this.pollId = null),
                    this.reject(m(this.auth, "popup-closed-by-user"));
                }, 8e3))
              : (this.pollId = window.setTimeout(t, er.get()));
          };
          t();
        }
      }
      L.currentPopupAction = null;
      const tr = "pendingRedirect",
        nr = new Map();
      class rr extends Zn {
        constructor(e, t, n = !1) {
          super(
            e,
            [
              "signInViaRedirect",
              "linkViaRedirect",
              "reauthViaRedirect",
              "unknown",
            ],
            t,
            void 0,
            n
          ),
            (this.eventId = null);
        }
        async execute() {
          let t = nr.get(this.auth._key());
          if (!t) {
            try {
              const e = (await (async function (e, t) {
                const n = or(t),
                  r = ar(e);
                if (!(await r._isAvailable())) return !1;
                t = "true" === (await r._get(n));
                return await r._remove(n), t;
              })(this.resolver, this.auth))
                ? await super.execute()
                : null;
              t = () => Promise.resolve(e);
            } catch (e) {
              t = () => Promise.reject(e);
            }
            nr.set(this.auth._key(), t);
          }
          return (
            this.bypassAuthState ||
              nr.set(this.auth._key(), () => Promise.resolve(null)),
            t()
          );
        }
        async onAuthEvent(e) {
          if ("signInViaRedirect" === e.type) return super.onAuthEvent(e);
          if ("unknown" !== e.type) {
            if (e.eventId) {
              var t = await this.auth._redirectUserForId(e.eventId);
              if (t) return (this.user = t), super.onAuthEvent(e);
              this.resolve(null);
            }
          } else this.resolve(null);
        }
        async onExecution() {}
        cleanUp() {}
      }
      async function ir(e, t) {
        return ar(e)._set(or(t), "true");
      }
      function sr(e, t) {
        nr.set(e._key(), t);
      }
      function ar(e) {
        return g(e._redirectPersistence);
      }
      function or(e) {
        return I(tr, e.config.apiKey, e.name);
      }
      async function cr(e, t, n = !1) {
        if (li._isFirebaseServerApp(e.app)) return Promise.reject(c(e));
        const r = w(e);
        e = Jn(r, t);
        const i = new rr(r, e, n),
          s = await i.execute();
        return (
          s &&
            !n &&
            (delete s.user._redirectEventId,
            await r._persistUserIfCurrent(s.user),
            await r._setRedirectUser(null, t)),
          s
        );
      }
      async function lr(e) {
        var t = kn(e.uid + ":::");
        return (
          (e._redirectEventId = t),
          await e.auth._setRedirectUser(e),
          await e.auth._persistUserIfCurrent(e),
          t
        );
      }
      class ur {
        constructor(e) {
          (this.auth = e),
            (this.cachedEventUids = new Set()),
            (this.consumers = new Set()),
            (this.queuedRedirectEvent = null),
            (this.hasHandledPotentialRedirect = !1),
            (this.lastProcessedEventTime = Date.now());
        }
        registerConsumer(e) {
          this.consumers.add(e),
            this.queuedRedirectEvent &&
              this.isEventForConsumer(this.queuedRedirectEvent, e) &&
              (this.sendToConsumer(this.queuedRedirectEvent, e),
              this.saveEventToCache(this.queuedRedirectEvent),
              (this.queuedRedirectEvent = null));
        }
        unregisterConsumer(e) {
          this.consumers.delete(e);
        }
        onEvent(t) {
          if (this.hasEventBeenHandled(t)) return !1;
          let n = !1;
          return (
            this.consumers.forEach((e) => {
              this.isEventForConsumer(t, e) &&
                ((n = !0), this.sendToConsumer(t, e), this.saveEventToCache(t));
            }),
            !this.hasHandledPotentialRedirect &&
              (function (e) {
                switch (e.type) {
                  case "signInViaRedirect":
                  case "linkViaRedirect":
                  case "reauthViaRedirect":
                    return 1;
                  case "unknown":
                    return hr(e);
                  default:
                    return;
                }
              })(t) &&
              ((this.hasHandledPotentialRedirect = !0),
              n || ((this.queuedRedirectEvent = t), (n = !0))),
            n
          );
        }
        sendToConsumer(e, t) {
          var n;
          e.error && !hr(e)
            ? ((n =
                (null == (n = e.error.code) ? void 0 : n.split("auth/")[1]) ||
                "internal-error"),
              t.onError(m(this.auth, n)))
            : t.onAuthEvent(e);
        }
        isEventForConsumer(e, t) {
          var n =
            null === t.eventId || (!!e.eventId && e.eventId === t.eventId);
          return t.filter.includes(e.type) && n;
        }
        hasEventBeenHandled(e) {
          return (
            6e5 <= Date.now() - this.lastProcessedEventTime &&
              this.cachedEventUids.clear(),
            this.cachedEventUids.has(dr(e))
          );
        }
        saveEventToCache(e) {
          this.cachedEventUids.add(dr(e)),
            (this.lastProcessedEventTime = Date.now());
        }
      }
      function dr(e) {
        return [e.type, e.eventId, e.sessionId, e.tenantId]
          .filter((e) => e)
          .join("-");
      }
      function hr({ type: e, error: t }) {
        return (
          "unknown" === e &&
          "auth/no-auth-event" === (null == t ? void 0 : t.code)
        );
      }
      async function pr(e, t = {}) {
        return a(e, "GET", "/v1/projects", t);
      }
      const mr = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
        fr = /^https?/;
      const gr = new be(3e4, 6e4);
      function vr() {
        const t = O().___jsl;
        if (null !== t && void 0 !== t && t.H)
          for (const e of Object.keys(t.H))
            if (
              ((t.H[e].r = t.H[e].r || []),
              (t.H[e].L = t.H[e].L || []),
              (t.H[e].r = [...t.H[e].L]),
              t.CP)
            )
              for (let e = 0; e < t.CP.length; e++) t.CP[e] = null;
      }
      let _r = null;
      const yr = new be(5e3, 15e3),
        Ir = {
          style: {
            position: "absolute",
            top: "-100px",
            width: "1px",
            height: "1px",
          },
          "aria-hidden": "true",
          tabindex: "-1",
        },
        wr = new Map([
          ["identitytoolkit.googleapis.com", "p"],
          ["staging-identitytoolkit.sandbox.googleapis.com", "s"],
          ["test-identitytoolkit.sandbox.googleapis.com", "t"],
        ]);
      async function Tr(a) {
        t = a;
        const e = await (_r =
          _r ||
          ((i = t),
          new Promise((e, t) => {
            function n() {
              vr(),
                gapi.load("gapi.iframes", {
                  callback: () => {
                    e(gapi.iframes.getContext());
                  },
                  ontimeout: () => {
                    vr(), t(m(i, "network-request-failed"));
                  },
                  timeout: gr.get(),
                });
            }
            if (
              null != (r = null == (r = O().gapi) ? void 0 : r.iframes) &&
              r.Iframe
            )
              e(gapi.iframes.getContext());
            else {
              var r;
              if (null == (r = O().gapi) || !r.load)
                return (
                  (r = mt("iframefcb")),
                  (O()[r] = () => {
                    gapi.load ? n() : t(m(i, "network-request-failed"));
                  }),
                  pt(ht.gapiScript + "?onload=" + r).catch((e) => t(e))
                );
              n();
            }
          }).catch((e) => {
            throw ((_r = null), e);
          })));
        var i,
          t = O().gapi;
        return (
          v(t, a, "internal-error"),
          e.open(
            {
              where: document.body,
              url: (function (e) {
                var t = e.config,
                  n =
                    (v(t.authDomain, e, "auth-domain-config-required"),
                    t.emulator
                      ? ke(t, "emulator/auth/iframe")
                      : `https://${e.config.authDomain}/__/auth/iframe`);
                const r = {
                    apiKey: t.apiKey,
                    appName: e.name,
                    v: li.SDK_VERSION,
                  },
                  i =
                    ((t = wr.get(e.config.apiHost)) && (r.eid = t),
                    e._getFrameworks());
                return (
                  i.length && (r.fw = i.join(",")), n + "?" + J(r).slice(1)
                );
              })(a),
              messageHandlersFilter: t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
              attributes: Ir,
              dontclear: !0,
            },
            (s) =>
              new Promise(async (e, t) => {
                await s.restyle({ setHideOnLeave: !1 });
                const n = m(a, "network-request-failed"),
                  r = O().setTimeout(() => {
                    t(n);
                  }, yr.get());
                function i() {
                  O().clearTimeout(r), e(s);
                }
                s.ping(i).then(i, () => {
                  t(n);
                });
              })
          )
        );
      }
      const Er = {
        location: "yes",
        resizable: "yes",
        statusbar: "yes",
        toolbar: "no",
      };
      class br {
        constructor(e) {
          (this.window = e), (this.associatedEvent = null);
        }
        close() {
          if (this.window)
            try {
              this.window.close();
            } catch (e) {}
        }
      }
      const kr = encodeURIComponent("fac");
      async function Sr(e, t, n, r, i, s) {
        v(e.config.authDomain, e, "auth-domain-config-required"),
          v(e.config.apiKey, e, "invalid-api-key");
        const a = {
          apiKey: e.config.apiKey,
          appName: e.name,
          authType: n,
          redirectUrl: r,
          v: li.SDK_VERSION,
          eventId: i,
        };
        if (t instanceof k) {
          t.setDefaultLanguage(e.languageCode),
            (a.providerId = t.providerId || ""),
            (function (e) {
              for (const t in e)
                if (Object.prototype.hasOwnProperty.call(e, t)) return;
              return 1;
            })(t.getCustomParameters()) ||
              (a.customParameters = JSON.stringify(t.getCustomParameters()));
          for (var [o, c] of Object.entries(s || {})) a[o] = c;
        }
        if (t instanceof Ft) {
          const u = t.getScopes().filter((e) => "" !== e);
          0 < u.length && (a.scopes = u.join(","));
        }
        e.tenantId && (a.tid = e.tenantId);
        const l = a;
        for (const d of Object.keys(l)) void 0 === l[d] && delete l[d];
        n = (n = await e._getAppCheckToken())
          ? `#${kr}=` + encodeURIComponent(n)
          : "";
        return (
          `${
            ((e = e.config),
            e.emulator
              ? ke(e, "emulator/auth/handler")
              : `https://${e.authDomain}/__/auth/handler`)
          }?` +
          J(l).slice(1) +
          n
        );
      }
      const Rr = "webStorageSupport",
        Pr = class {
          constructor() {
            (this.eventManagers = {}),
              (this.iframes = {}),
              (this.originValidationPromises = {}),
              (this._redirectPersistence = En),
              (this._completeRedirectFn = cr),
              (this._overrideRedirectResult = sr);
          }
          async _openPopup(t, n, r, i) {
            f(
              null == (a = this.eventManagers[t._key()]) ? void 0 : a.manager,
              "_initialize() not called before _openPopup()"
            );
            {
              var [s, a, t, n = 500, r = 600] = [
                  t,
                  await Sr(t, n, r, we(), i),
                  kn(),
                ],
                i = Math.max((window.screen.availHeight - r) / 2, 0).toString(),
                o = Math.max((window.screen.availWidth - n) / 2, 0).toString();
              let e = "";
              const c = Object.assign(Object.assign({}, Er), {
                width: n.toString(),
                height: r.toString(),
                top: i,
                left: o,
              });
              if (
                ((i = h().toLowerCase()),
                t && (e = et(i) ? "_blank" : t),
                Qe(i) &&
                  ((a = a || "http://localhost"), (c.scrollbars = "yes")),
                (o = Object.entries(c).reduce(
                  (e, [t, n]) => "" + e + t + `=${n},`,
                  ""
                )),
                ([t = h()] = [i]),
                st(t) &&
                  null != (n = window.navigator) &&
                  n.standalone &&
                  "_self" !== e)
              ) {
                {
                  r = a || "";
                  i = e;
                  const u = document.createElement("a"),
                    d =
                      ((u.href = r),
                      (u.target = i),
                      document.createEvent("MouseEvent"));
                  d.initMouseEvent(
                    "click",
                    !0,
                    !0,
                    window,
                    1,
                    0,
                    0,
                    0,
                    0,
                    !1,
                    !1,
                    !1,
                    !1,
                    1,
                    null
                  ),
                    u.dispatchEvent(d);
                }
                return new br(null);
              }
              const l = window.open(a || "", e, o);
              v(l, s, "popup-blocked");
              try {
                l.focus();
              } catch (s) {}
              return new br(l);
            }
          }
          async _openRedirect(e, t, n, r) {
            await this._originValidation(e);
            e = await Sr(e, t, n, we(), r);
            return (O().location.href = e), new Promise(() => {});
          }
          _initialize(e) {
            const t = e._key();
            if (this.eventManagers[t]) {
              const { manager: r, promise: n } = this.eventManagers[t];
              return r
                ? Promise.resolve(r)
                : (f(n, "If manager is not set, promise should be"), n);
            }
            const n = this.initAndGetManager(e);
            return (
              (this.eventManagers[t] = { promise: n }),
              n.catch(() => {
                delete this.eventManagers[t];
              }),
              n
            );
          }
          async initAndGetManager(t) {
            const e = await Tr(t),
              n = new ur(t);
            return (
              e.register(
                "authEvent",
                (e) => (
                  v(null == e ? void 0 : e.authEvent, t, "invalid-auth-event"),
                  { status: n.onEvent(e.authEvent) ? "ACK" : "ERROR" }
                ),
                gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
              ),
              (this.eventManagers[t._key()] = { manager: n }),
              (this.iframes[t._key()] = e),
              n
            );
          }
          _isIframeWebStorageSupported(t, n) {
            const e = this.iframes[t._key()];
            e.send(
              Rr,
              { type: Rr },
              (e) => {
                e = null == (e = null == e ? void 0 : e[0]) ? void 0 : e[Rr];
                void 0 !== e && n(!!e), p(t, "internal-error");
              },
              gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
            );
          }
          _originValidation(e) {
            var t = e._key();
            return (
              this.originValidationPromises[t] ||
                (this.originValidationPromises[t] = (async function (e) {
                  if (!e.config.emulator) {
                    for (const t of (await pr(e)).authorizedDomains)
                      try {
                        if (
                          (function (e) {
                            const t = we(),
                              { protocol: n, hostname: r } = new URL(t);
                            var i;
                            if (e.startsWith("chrome-extension://"))
                              return "" === (i = new URL(e)).hostname &&
                                "" === r
                                ? "chrome-extension:" === n &&
                                    e.replace("chrome-extension://", "") ===
                                      t.replace("chrome-extension://", "")
                                : "chrome-extension:" === n && i.hostname === r;
                            if (fr.test(n)) {
                              if (mr.test(e)) return r === e;
                              const s = e.replace(/\./g, "\\."),
                                a = new RegExp(
                                  "^(.+\\." + s + "|" + s + ")$",
                                  "i"
                                );
                              return a.test(r);
                            }
                          })(t)
                        )
                          return;
                      } catch (e) {}
                    p(e, "unauthorized-domain");
                  }
                })(e)),
              this.originValidationPromises[t]
            );
          }
          get _shouldInitProactively() {
            return at() || Ze() || st();
          }
        };
      class Ar extends class {
        constructor(e) {
          this.factorId = e;
        }
        _process(e, t, n) {
          switch (t.type) {
            case "enroll":
              return this._finalizeEnroll(e, t.credential, n);
            case "signin":
              return this._finalizeSignIn(e, t.credential);
            default:
              return i("unexpected MultiFactorSessionType");
          }
        }
      } {
        constructor(e) {
          super("phone"), (this.credential = e);
        }
        static _fromCredential(e) {
          return new Ar(e);
        }
        _finalizeEnroll(e, t, n) {
          return a(
            e,
            "POST",
            "/v2/accounts/mfaEnrollment:finalize",
            s(
              e,
              (n = {
                idToken: t,
                displayName: n,
                phoneVerificationInfo:
                  this.credential._makeVerificationRequest(),
              })
            )
          );
        }
        _finalizeSignIn(e, t) {
          return a(
            e,
            "POST",
            "/v2/accounts/mfaSignIn:finalize",
            s(
              e,
              (t = {
                mfaPendingCredential: t,
                phoneVerificationInfo:
                  this.credential._makeVerificationRequest(),
              })
            )
          );
        }
      }
      class Cr {
        constructor() {}
        static assertion(e) {
          return Ar._fromCredential(e);
        }
      }
      Cr.FACTOR_ID = "phone";
      var Or,
        Nr,
        e = "@firebase/auth";
      class Lr {
        constructor(e) {
          (this.auth = e), (this.internalListeners = new Map());
        }
        getUid() {
          var e;
          return (
            this.assertAuthConfigured(),
            (null == (e = this.auth.currentUser) ? void 0 : e.uid) || null
          );
        }
        async getToken(e) {
          return (
            this.assertAuthConfigured(),
            await this.auth._initializationPromise,
            this.auth.currentUser
              ? { accessToken: await this.auth.currentUser.getIdToken(e) }
              : null
          );
        }
        addAuthTokenListener(t) {
          var e;
          this.assertAuthConfigured(),
            this.internalListeners.has(t) ||
              ((e = this.auth.onIdTokenChanged((e) => {
                t((null == e ? void 0 : e.stsTokenManager.accessToken) || null);
              })),
              this.internalListeners.set(t, e),
              this.updateProactiveRefresh());
        }
        removeAuthTokenListener(e) {
          this.assertAuthConfigured();
          const t = this.internalListeners.get(e);
          t &&
            (this.internalListeners.delete(e),
            t(),
            this.updateProactiveRefresh());
        }
        assertAuthConfigured() {
          v(
            this.auth._initializationPromise,
            "dependent-sdk-initialized-before-auth"
          );
        }
        updateProactiveRefresh() {
          0 < this.internalListeners.size
            ? this.auth._startProactiveRefresh()
            : this.auth._stopProactiveRefresh();
        }
      }
      function Dr() {
        return window;
      }
      null != (Nr = n()) && Nr._authIdTokenMaxAge,
        (ht = {
          loadJS(r) {
            return new Promise((e, n) => {
              const t = document.createElement("script");
              t.setAttribute("src", r),
                (t.onload = e),
                (t.onerror = (e) => {
                  const t = m("internal-error");
                  (t.customData = e), n(t);
                }),
                (t.type = "text/javascript"),
                (t.charset = "UTF-8"),
                (null !=
                (e =
                  null == (e = document.getElementsByTagName("head"))
                    ? void 0
                    : e[0])
                  ? e
                  : document
                ).appendChild(t);
            });
          },
          gapiScript: "https://apis.google.com/js/api.js",
          recaptchaV2Script: "https://www.google.com/recaptcha/api.js",
          recaptchaEnterpriseScript:
            "https://www.google.com/recaptcha/enterprise.js?render=",
        }),
        (Or = "Browser"),
        li._registerComponent(
          new ie(
            "auth",
            (e, { options: t }) => {
              var n = e.getProvider("app").getImmediate(),
                r = e.getProvider("heartbeat"),
                e = e.getProvider("app-check-internal");
              const { apiKey: i, authDomain: s } = n.options;
              v(i && !i.includes(":"), "invalid-api-key", { appName: n.name });
              var a = {
                  apiKey: i,
                  authDomain: s,
                  clientPlatform: Or,
                  apiHost: "identitytoolkit.googleapis.com",
                  tokenApiHost: "securetoken.googleapis.com",
                  apiScheme: "https",
                  sdkClientVersion: ot(Or),
                },
                a = new ut(n, r, e, a);
              {
                n = a;
                const o = (null == (r = t) ? void 0 : r.persistence) || [];
                (e = (Array.isArray(o) ? o : [o]).map(g)),
                  null != r && r.errorMap && n._updateErrorMap(r.errorMap),
                  n._initializeWithPersistence(
                    e,
                    null == r ? void 0 : r.popupRedirectResolver
                  );
              }
              return a;
            },
            "PUBLIC"
          )
            .setInstantiationMode("EXPLICIT")
            .setInstanceCreatedCallback((e, t, n) => {
              const r = e.getProvider("auth-internal");
              r.initialize();
            })
        ),
        li._registerComponent(
          new ie(
            "auth-internal",
            (e) => {
              return (e = w(e.getProvider("auth").getImmediate())), new Lr(e);
            },
            "PRIVATE"
          ).setInstantiationMode("EXPLICIT")
        ),
        li.registerVersion(e, "1.8.1", void 0),
        li.registerVersion(e, "1.8.1", "esm2017");
      class Ur extends ur {
        constructor() {
          super(...arguments),
            (this.passiveListeners = new Set()),
            (this.initPromise = new Promise((e) => {
              this.resolveInitialized = e;
            }));
        }
        addPassiveListener(e) {
          this.passiveListeners.add(e);
        }
        removePassiveListener(e) {
          this.passiveListeners.delete(e);
        }
        resetRedirect() {
          (this.queuedRedirectEvent = null),
            (this.hasHandledPotentialRedirect = !1);
        }
        onEvent(t) {
          return (
            this.resolveInitialized(),
            this.passiveListeners.forEach((e) => e(t)),
            super.onEvent(t)
          );
        }
        async initialized() {
          await this.initPromise;
        }
      }
      async function Mr(e) {
        var t = await Fr()._get(Vr(e));
        return t && (await Fr()._remove(Vr(e))), t;
      }
      function Fr() {
        return g(wn);
      }
      function Vr(e) {
        return I("authEvent", e.config.apiKey, e.name);
      }
      function xr(e) {
        if (null == e || !e.includes("?")) return {};
        const [, ...t] = e.split("?");
        return Y(t.join("?"));
      }
      const jr = class {
        constructor() {
          (this._redirectPersistence = En),
            (this._shouldInitProactively = !0),
            (this.eventManagers = new Map()),
            (this.originValidationPromises = {}),
            (this._completeRedirectFn = cr),
            (this._overrideRedirectResult = sr);
        }
        async _initialize(e) {
          var t = e._key();
          let n = this.eventManagers.get(t);
          return (
            n ||
              ((n = new Ur(e)),
              this.eventManagers.set(t, n),
              this.attachCallbackListeners(e, n)),
            n
          );
        }
        _openPopup(e) {
          p(e, "operation-not-supported-in-this-environment");
        }
        async _openRedirect(e, t, n, r) {
          var i = e;
          v(
            "function" ==
              typeof (null ==
              (a = null == (c = Dr()) ? void 0 : c.universalLinks)
                ? void 0
                : a.subscribe),
            i,
            "invalid-cordova-configuration",
            { missingPlugin: "cordova-universal-links-plugin-fix" }
          ),
            v(
              void 0 !==
                (null == (a = null == c ? void 0 : c.BuildInfo)
                  ? void 0
                  : a.packageName),
              i,
              "invalid-cordova-configuration",
              { missingPlugin: "cordova-plugin-buildInfo" }
            ),
            v(
              "function" ==
                typeof (null ==
                (a =
                  null ==
                  (a =
                    null == (a = null == c ? void 0 : c.cordova)
                      ? void 0
                      : a.plugins)
                    ? void 0
                    : a.browsertab)
                  ? void 0
                  : a.openUrl),
              i,
              "invalid-cordova-configuration",
              { missingPlugin: "cordova-plugin-browsertab" }
            ),
            v(
              "function" ==
                typeof (null ==
                (a =
                  null ==
                  (a =
                    null == (a = null == c ? void 0 : c.cordova)
                      ? void 0
                      : a.plugins)
                    ? void 0
                    : a.browsertab)
                  ? void 0
                  : a.isAvailable),
              i,
              "invalid-cordova-configuration",
              { missingPlugin: "cordova-plugin-browsertab" }
            ),
            v(
              "function" ==
                typeof (null ==
                (c =
                  null == (c = null == c ? void 0 : c.cordova)
                    ? void 0
                    : c.InAppBrowser)
                  ? void 0
                  : c.open),
              i,
              "invalid-cordova-configuration",
              { missingPlugin: "cordova-plugin-inappbrowser" }
            );
          const s = await this._initialize(e);
          await s.initialized(),
            s.resetRedirect(),
            nr.clear(),
            await this._originValidation(e);
          [a, i, o = null] = [e, n, r];
          var a,
            o,
            c = {
              type: i,
              eventId: o,
              urlResponse: null,
              sessionId: (function () {
                const t = [],
                  n =
                    "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                for (let e = 0; e < 20; e++) {
                  var r = Math.floor(Math.random() * n.length);
                  t.push(n.charAt(r));
                }
                return t.join("");
              })(),
              postBody: null,
              tenantId: a.tenantId,
              error: m(a, "no-auth-event"),
            };
          return (
            (n = e),
            (r = c),
            await Fr()._set(Vr(n), r),
            (c = await (function (r) {
              const i = Dr().cordova;
              return new Promise((n) => {
                i.plugins.browsertab.isAvailable((e) => {
                  let t = null;
                  e
                    ? i.plugins.browsertab.openUrl(r)
                    : (t = i.InAppBrowser.open(
                        r,
                        ((e = h()),
                        /(iPad|iPhone|iPod).*OS 7_\d/i.test(e) ||
                        /(iPad|iPhone|iPod).*OS 8_\d/i.test(e)
                          ? "_blank"
                          : "_system"),
                        "location=yes"
                      )),
                    n(t);
                });
              });
            })(
              await (async function (e, t, n) {
                var r = Dr().BuildInfo,
                  i =
                    (f(t.sessionId, "AuthEvent did not contain a session ID"),
                    await (async function (e) {
                      const t = (function (t) {
                          if (
                            (f(
                              /[0-9a-zA-Z]+/.test(t),
                              "Can only convert alpha-numeric strings"
                            ),
                            "undefined" != typeof TextEncoder)
                          )
                            return new TextEncoder().encode(t);
                          const e = new ArrayBuffer(t.length),
                            n = new Uint8Array(e);
                          for (let e = 0; e < t.length; e++)
                            n[e] = t.charCodeAt(e);
                          return n;
                        })(e),
                        n = await crypto.subtle.digest("SHA-256", t),
                        r = Array.from(new Uint8Array(n));
                      return r
                        .map((e) => e.toString(16).padStart(2, "0"))
                        .join("");
                    })(t.sessionId));
                const s = {};
                return (
                  st()
                    ? (s.ibi = r.packageName)
                    : nt()
                    ? (s.apn = r.packageName)
                    : p(e, "operation-not-supported-in-this-environment"),
                  r.displayName && (s.appDisplayName = r.displayName),
                  (s.sessionId = i),
                  Sr(
                    e,
                    n,
                    t.type,
                    void 0,
                    null != (i = t.eventId) ? i : void 0,
                    s
                  )
                );
              })(e, c, t)
            )),
            (async function (a, o, c) {
              const l = Dr().cordova;
              let u = () => {};
              try {
                await new Promise((n, e) => {
                  let t = null;
                  function r() {
                    var e;
                    n();
                    const t =
                      null == (e = l.plugins.browsertab) ? void 0 : e.close;
                    "function" == typeof t && t(),
                      "function" == typeof (null == c ? void 0 : c.close) &&
                        c.close();
                  }
                  function i() {
                    t =
                      t ||
                      window.setTimeout(() => {
                        e(m(a, "redirect-cancelled-by-user"));
                      }, 2e3);
                  }
                  function s() {
                    "visible" ===
                      (null === document || void 0 === document
                        ? void 0
                        : document.visibilityState) && i();
                  }
                  o.addPassiveListener(r),
                    document.addEventListener("resume", i, !1),
                    nt() &&
                      document.addEventListener("visibilitychange", s, !1),
                    (u = () => {
                      o.removePassiveListener(r),
                        document.removeEventListener("resume", i, !1),
                        document.removeEventListener("visibilitychange", s, !1),
                        t && window.clearTimeout(t);
                    });
                });
              } finally {
                u();
              }
            })(e, s, c)
          );
        }
        _isIframeWebStorageSupported(e, t) {
          throw new Error("Method not implemented.");
        }
        _originValidation(e) {
          var t = e._key();
          return (
            this.originValidationPromises[t] ||
              (this.originValidationPromises[t] = (async function (e) {
                var t = Dr().BuildInfo;
                const n = {};
                st()
                  ? (n.iosBundleId = t.packageName)
                  : nt()
                  ? (n.androidPackageName = t.packageName)
                  : p(e, "operation-not-supported-in-this-environment"),
                  await pr(e, n);
              })(e)),
            this.originValidationPromises[t]
          );
        }
        attachCallbackListeners(r, i) {
          const { universalLinks: e, handleOpenURL: t, BuildInfo: n } = Dr(),
            s = setTimeout(async () => {
              await Mr(r), i.onEvent(Hr());
            }, 500),
            a = async (e) => {
              clearTimeout(s);
              var t = await Mr(r);
              let n = null;
              t &&
                null != e &&
                e.url &&
                (n = (function (e, t) {
                  var n, r, i, s;
                  (n = xr(t)),
                    (r = xr(
                      (s = n.link ? decodeURIComponent(n.link) : void 0)
                    ).link);
                  const a =
                    (n = xr(
                      (i = n.deep_link_id
                        ? decodeURIComponent(n.deep_link_id)
                        : void 0)
                    ).link) ||
                    i ||
                    r ||
                    s ||
                    t;
                  return a.includes("/__/auth/callback")
                    ? (s = (s =
                        null ==
                        (s =
                          null ==
                          (s =
                            null ==
                            (s = (s = xr(a)).firebaseError
                              ? (function (e) {
                                  try {
                                    return JSON.parse(e);
                                  } catch (e) {
                                    return null;
                                  }
                                })(decodeURIComponent(s.firebaseError))
                              : null)
                              ? void 0
                              : s.code)
                            ? void 0
                            : s.split("auth/"))
                          ? void 0
                          : s[1])
                        ? m(s)
                        : null)
                      ? {
                          type: e.type,
                          eventId: e.eventId,
                          tenantId: e.tenantId,
                          error: s,
                          urlResponse: null,
                          sessionId: null,
                          postBody: null,
                        }
                      : {
                          type: e.type,
                          eventId: e.eventId,
                          tenantId: e.tenantId,
                          sessionId: e.sessionId,
                          urlResponse: a,
                          postBody: null,
                        }
                    : null;
                })(t, e.url)),
                i.onEvent(n || Hr());
            },
            o =
              (void 0 !== e &&
                "function" == typeof e.subscribe &&
                e.subscribe(null, a),
              t),
            c = n.packageName.toLowerCase() + "://";
          Dr().handleOpenURL = async (e) => {
            if (
              (e.toLowerCase().startsWith(c) && a({ url: e }),
              "function" == typeof o)
            )
              try {
                o(e);
              } catch (e) {
                console.error(e);
              }
          };
        }
      };
      function Hr() {
        return {
          type: "unknown",
          eventId: null,
          sessionId: null,
          urlResponse: null,
          postBody: null,
          tenantId: null,
          error: m("no-auth-event"),
        };
      }
      function Wr() {
        var e;
        return (
          (null ==
          (e = null === self || void 0 === self ? void 0 : self.location)
            ? void 0
            : e.protocol) || null
        );
      }
      function qr(e = h()) {
        return !(
          ("file:" !== Wr() && "ionic:" !== Wr() && "capacitor:" !== Wr()) ||
          !e.toLowerCase().match(/iphone|ipad|ipod|android/)
        );
      }
      function Br() {
        try {
          const n = self.localStorage;
          var e = kn();
          if (n)
            return (
              n.setItem(e, "1"),
              n.removeItem(e),
              (t = h()),
              !(
                (B() &&
                  11 ===
                    (null === document || void 0 === document
                      ? void 0
                      : document.documentMode)) ||
                (([t = h()] = [t]), /Edge\/\d+/.test(t))
              ) || z()
            );
        } catch (e) {
          return zr() && z();
        }
        var t;
        return !1;
      }
      function zr() {
        return (
          "undefined" != typeof global &&
          "WorkerGlobalScope" in global &&
          "importScripts" in global
        );
      }
      function Gr() {
        return (
          ("http:" === Wr() || "https:" === Wr() || W() || qr()) &&
          !(q() || H()) &&
          Br() &&
          !zr()
        );
      }
      function Kr() {
        return qr() && "undefined" != typeof document;
      }
      const D = { LOCAL: "local", NONE: "none", SESSION: "session" },
        Jr = v,
        Yr = "persistence";
      async function $r(e) {
        await e._initializationPromise;
        const t = Xr();
        var n = I(Yr, e.config.apiKey, e.name);
        t && t.setItem(n, e._getPersistence());
      }
      function Xr() {
        var e;
        try {
          return (
            (null === (e = "undefined" != typeof window ? window : null)
              ? void 0
              : e.sessionStorage) || null
          );
        } catch (e) {
          return null;
        }
      }
      const Qr = v;
      class U {
        constructor() {
          (this.browserResolver = g(Pr)),
            (this.cordovaResolver = g(jr)),
            (this.underlyingResolver = null),
            (this._redirectPersistence = En),
            (this._completeRedirectFn = cr),
            (this._overrideRedirectResult = sr);
        }
        async _initialize(e) {
          return (
            await this.selectUnderlyingResolver(),
            this.assertedUnderlyingResolver._initialize(e)
          );
        }
        async _openPopup(e, t, n, r) {
          return (
            await this.selectUnderlyingResolver(),
            this.assertedUnderlyingResolver._openPopup(e, t, n, r)
          );
        }
        async _openRedirect(e, t, n, r) {
          return (
            await this.selectUnderlyingResolver(),
            this.assertedUnderlyingResolver._openRedirect(e, t, n, r)
          );
        }
        _isIframeWebStorageSupported(e, t) {
          this.assertedUnderlyingResolver._isIframeWebStorageSupported(e, t);
        }
        _originValidation(e) {
          return this.assertedUnderlyingResolver._originValidation(e);
        }
        get _shouldInitProactively() {
          return Kr() || this.browserResolver._shouldInitProactively;
        }
        get assertedUnderlyingResolver() {
          return (
            Qr(this.underlyingResolver, "internal-error"),
            this.underlyingResolver
          );
        }
        async selectUnderlyingResolver() {
          var e;
          this.underlyingResolver ||
            ((e = await (!!Kr() &&
              new Promise((e) => {
                const t = setTimeout(() => {
                  e(!1);
                }, 1e3);
                document.addEventListener("deviceready", () => {
                  clearTimeout(t), e(!0);
                });
              }))),
            (this.underlyingResolver = e
              ? this.cordovaResolver
              : this.browserResolver));
        }
      }
      function Zr(e) {
        return e.unwrap();
      }
      function ei(e) {
        var t = (e instanceof d ? e.customData : e)._tokenResponse;
        if (!t) return null;
        if (!(e instanceof d) && "temporaryProof" in t && "phoneNumber" in t)
          return N.credentialFromResult(e);
        const n = t.providerId;
        if (!n || n === se.PASSWORD) return null;
        let r;
        switch (n) {
          case se.GOOGLE:
            r = R;
            break;
          case se.FACEBOOK:
            r = S;
            break;
          case se.GITHUB:
            r = P;
            break;
          case se.TWITTER:
            r = A;
            break;
          default:
            var {
              oauthIdToken: i,
              oauthAccessToken: s,
              oauthTokenSecret: a,
              pendingToken: o,
              nonce: c,
            } = t;
            return s || a || i || o
              ? o
                ? n.startsWith("saml.")
                  ? xt._create(n, o)
                  : b._fromParams({
                      providerId: n,
                      signInMethod: n,
                      pendingToken: o,
                      idToken: i,
                      accessToken: s,
                    })
                : new Vt(n).credential({
                    idToken: i,
                    accessToken: s,
                    rawNonce: c,
                  })
              : null;
        }
        return e instanceof d
          ? r.credentialFromError(e)
          : r.credentialFromResult(e);
      }
      function M(t, e) {
        return e
          .catch((e) => {
            throw (
              (e instanceof d &&
                (function (e, t) {
                  var n,
                    r = null == (n = t.customData) ? void 0 : n._tokenResponse;
                  if (
                    "auth/multi-factor-auth-required" ===
                    (null == t ? void 0 : t.code)
                  ) {
                    const s = t;
                    s.resolver = new ni(
                      e,
                      ((e = o(e)),
                      v((i = t).customData.operationType, e, "argument-error"),
                      v(
                        null == (n = i.customData._serverResponse)
                          ? void 0
                          : n.mfaPendingCredential,
                        e,
                        "argument-error"
                      ),
                      mn._fromError(e, i))
                    );
                  } else if (r) {
                    var i = ei(t);
                    const a = t;
                    i &&
                      ((a.credential = i),
                      (a.tenantId = r.tenantId || void 0),
                      (a.email = r.email || void 0),
                      (a.phoneNumber = r.phoneNumber || void 0));
                  }
                })(t, e),
              e)
            );
          })
          .then((e) => {
            var t = e.operationType,
              n = e.user;
            return {
              operationType: t,
              credential: ei(e),
              additionalUserInfo: (function (e) {
                var { user: e, _tokenResponse: t } = e;
                if (e.isAnonymous && !t)
                  return { providerId: null, isNewUser: !1, profile: null };
                var n = t;
                if (!n) return null;
                var r = n.providerId,
                  i = n.rawUserInfo ? JSON.parse(n.rawUserInfo) : {},
                  s =
                    n.isNewUser ||
                    "identitytoolkit#SignupNewUserResponse" === n.kind;
                if (!r && null != n && n.idToken) {
                  e =
                    null ==
                    (e = null == (e = je(n.idToken)) ? void 0 : e.firebase)
                      ? void 0
                      : e.sign_in_provider;
                  if (e)
                    return (
                      (e = "anonymous" !== e && "custom" !== e ? e : null),
                      new on(s, e)
                    );
                }
                if (!r) return null;
                switch (r) {
                  case "facebook.com":
                    return new ln(s, i);
                  case "github.com":
                    return new un(s, i);
                  case "google.com":
                    return new dn(s, i);
                  case "twitter.com":
                    return new hn(s, i, n.screenName || null);
                  case "custom":
                  case "anonymous":
                    return new on(s, null);
                  default:
                    return new on(s, r, i);
                }
              })(e),
              user: F.getOrCreate(n),
            };
          });
      }
      async function ti(t, e) {
        const n = await e;
        return {
          verificationId: n.verificationId,
          confirm: (e) => M(t, n.confirm(e)),
        };
      }
      class ni {
        constructor(e, t) {
          (this.resolver = t), (this.auth = e.wrapped());
        }
        get session() {
          return this.resolver.session;
        }
        get hints() {
          return this.resolver.hints;
        }
        resolveSignIn(e) {
          return M(Zr(this.auth), this.resolver.resolveSignIn(e));
        }
      }
      class F {
        constructor(e) {
          (this._delegate = e),
            (this.multiFactor =
              ((e = o(e)), vn.has(e) || vn.set(e, gn._fromUser(e)), vn.get(e)));
        }
        static getOrCreate(e) {
          return (
            F.USER_MAP.has(e) || F.USER_MAP.set(e, new F(e)), F.USER_MAP.get(e)
          );
        }
        delete() {
          return this._delegate.delete();
        }
        reload() {
          return this._delegate.reload();
        }
        toJSON() {
          return this._delegate.toJSON();
        }
        getIdTokenResult(e) {
          return this._delegate.getIdTokenResult(e);
        }
        getIdToken(e) {
          return this._delegate.getIdToken(e);
        }
        linkAndRetrieveDataWithCredential(e) {
          return this.linkWithCredential(e);
        }
        async linkWithCredential(e) {
          return M(this.auth, Xt(this._delegate, e));
        }
        async linkWithPhoneNumber(e, t) {
          return ti(
            this.auth,
            (async function (e, t, n) {
              const r = o(e);
              await Kt(!1, r, "phone");
              e = await Gn(r.auth, t, o(n));
              return new zn(e, (e) => Xt(r, e));
            })(this._delegate, e, t)
          );
        }
        async linkWithPopup(e) {
          return M(
            this.auth,
            (async function (e, t, n) {
              (e = o(e)), ye(e.auth, t, k), (n = Jn(e.auth, n));
              const r = new L(e.auth, "linkViaPopup", t, n, e);
              return r.executeNotNull();
            })(this._delegate, e, U)
          );
        }
        async linkWithRedirect(e) {
          return (
            await $r(w(this.auth)),
            (i = this._delegate),
            (e = e),
            (t = U),
            (async function (e, t) {
              var n = o(i);
              ye(n.auth, e, k), await n.auth._initializationPromise;
              const r = Jn(n.auth, t);
              await Kt(!1, n, e.providerId), await ir(r, n.auth);
              t = await lr(n);
              return r._openRedirect(n.auth, e, "linkViaRedirect", t);
            })(e, t)
          );
          var i, t;
        }
        reauthenticateAndRetrieveDataWithCredential(e) {
          return this.reauthenticateWithCredential(e);
        }
        async reauthenticateWithCredential(e) {
          return M(this.auth, Qt(this._delegate, e));
        }
        reauthenticateWithPhoneNumber(e, t) {
          return ti(
            this.auth,
            (async function (e, t, n) {
              const r = o(e);
              if (li._isFirebaseServerApp(r.auth.app))
                return Promise.reject(c(r.auth));
              e = await Gn(r.auth, t, o(n));
              return new zn(e, (e) => Qt(r, e));
            })(this._delegate, e, t)
          );
        }
        reauthenticateWithPopup(e) {
          return M(
            this.auth,
            (async function (e, t, n) {
              e = o(e);
              if (li._isFirebaseServerApp(e.auth.app))
                return Promise.reject(
                  m(e.auth, "operation-not-supported-in-this-environment")
                );
              ye(e.auth, t, k);
              n = Jn(e.auth, n);
              const r = new L(e.auth, "reauthViaPopup", t, n, e);
              return r.executeNotNull();
            })(this._delegate, e, U)
          );
        }
        async reauthenticateWithRedirect(e) {
          return (
            await $r(w(this.auth)),
            (i = this._delegate),
            (e = e),
            (t = U),
            (async function (e, t) {
              var n = o(i);
              if ((ye(n.auth, e, k), li._isFirebaseServerApp(n.auth.app)))
                return Promise.reject(c(n.auth));
              await n.auth._initializationPromise;
              const r = Jn(n.auth, t);
              await ir(r, n.auth);
              t = await lr(n);
              return r._openRedirect(n.auth, e, "reauthViaRedirect", t);
            })(e, t)
          );
          var i, t;
        }
        sendEmailVerification(e) {
          return (async function (e, t) {
            var n = o(e),
              r = {
                requestType: "VERIFY_EMAIL",
                idToken: await e.getIdToken(),
              };
            t && nn(n.auth, r, t),
              (r = (await Pt(n.auth, r)).email) !== e.email &&
                (await e.reload());
          })(this._delegate, e);
        }
        async unlink(e) {
          return (
            await (async function (e, t) {
              const n = o(e),
                r =
                  (await Kt(!0, n, t),
                  zt(
                    (
                      await a(
                        (e = n.auth),
                        "POST",
                        "/v1/accounts:update",
                        (t = {
                          idToken: await n.getIdToken(),
                          deleteProvider: [t],
                        })
                      )
                    ).providerUserInfo || []
                  ));
              return (
                (n.providerData = n.providerData.filter((e) =>
                  r.has(e.providerId)
                )),
                r.has("phone") || (n.phoneNumber = null),
                await n.auth._persistUserIfCurrent(n),
                n
              );
            })(this._delegate, e),
            this
          );
        }
        updateEmail(e) {
          return (
            (t = o(this._delegate)),
            li._isFirebaseServerApp(t.auth.app)
              ? Promise.reject(c(t.auth))
              : an(t, e, null)
          );
          var t;
        }
        updatePassword(e) {
          return an(o(this._delegate), null, e);
        }
        updatePhoneNumber(e) {
          return (async function (e, t) {
            e = o(e);
            return li._isFirebaseServerApp(e.auth.app)
              ? Promise.reject(c(e.auth))
              : void (await Gt(e, t));
          })(this._delegate, e);
        }
        updateProfile(e) {
          return (async function (e, { displayName: t, photoURL: n }) {
            if (void 0 !== t || void 0 !== n) {
              const i = o(e);
              var r = await i.getIdToken(),
                r = await u(
                  i,
                  (async function (e) {
                    return a(e, "POST", "/v1/accounts:update", {
                      idToken: r,
                      displayName: t,
                      photoUrl: n,
                      returnSecureToken: !0,
                    });
                  })(i.auth)
                );
              (i.displayName = r.displayName || null),
                (i.photoURL = r.photoUrl || null);
              const s = i.providerData.find(
                ({ providerId: e }) => "password" === e
              );
              s && ((s.displayName = i.displayName), (s.photoURL = i.photoURL)),
                await i._updateTokensIfNecessary(r);
            }
          })(this._delegate, e);
        }
        verifyBeforeUpdateEmail(e, t) {
          return (async function (e, t, n) {
            var r = o(e),
              t = {
                requestType: "VERIFY_AND_CHANGE_EMAIL",
                idToken: await e.getIdToken(),
                newEmail: t,
              };
            n && nn(r.auth, t, n),
              (t = (await Pt(r.auth, t)).email) !== e.email &&
                (await e.reload());
          })(this._delegate, e, t);
        }
        get emailVerified() {
          return this._delegate.emailVerified;
        }
        get isAnonymous() {
          return this._delegate.isAnonymous;
        }
        get metadata() {
          return this._delegate.metadata;
        }
        get phoneNumber() {
          return this._delegate.phoneNumber;
        }
        get providerData() {
          return this._delegate.providerData;
        }
        get refreshToken() {
          return this._delegate.refreshToken;
        }
        get tenantId() {
          return this._delegate.tenantId;
        }
        get displayName() {
          return this._delegate.displayName;
        }
        get email() {
          return this._delegate.email;
        }
        get photoURL() {
          return this._delegate.photoURL;
        }
        get providerId() {
          return this._delegate.providerId;
        }
        get uid() {
          return this._delegate.uid;
        }
        get auth() {
          return this._delegate.auth;
        }
      }
      F.USER_MAP = new WeakMap();
      const ri = v;
      class ii {
        constructor(n, e) {
          if (((this.app = n), e.isInitialized()))
            return (
              (this._delegate = e.getImmediate()),
              void this.linkUnderlyingAuth()
            );
          var r = n.options.apiKey,
            t =
              (ri(r, "invalid-api-key", { appName: n.name }),
              ri(r, "invalid-api-key", { appName: n.name }),
              "undefined" != typeof window ? U : void 0);
          (this._delegate = e.initialize({
            options: {
              persistence: (function () {
                const e = (function (e, t) {
                  const n = Xr();
                  if (!n) return [];
                  e = I(Yr, e, t);
                  switch (n.getItem(e)) {
                    case D.NONE:
                      return [Ye];
                    case D.LOCAL:
                      return [Mn, En];
                    case D.SESSION:
                      return [En];
                    default:
                      return [];
                  }
                })(r, n.name);
                if (
                  ("undefined" == typeof self || e.includes(Mn) || e.push(Mn),
                  "undefined" != typeof window)
                )
                  for (const t of [wn, En]) e.includes(t) || e.push(t);
                return e.includes(Ye) || e.push(Ye), e;
              })(),
              popupRedirectResolver: t,
            },
          })),
            this._delegate._updateErrorMap(pe),
            this.linkUnderlyingAuth();
        }
        get emulatorConfig() {
          return this._delegate.emulatorConfig;
        }
        get currentUser() {
          return this._delegate.currentUser
            ? F.getOrCreate(this._delegate.currentUser)
            : null;
        }
        get languageCode() {
          return this._delegate.languageCode;
        }
        set languageCode(e) {
          this._delegate.languageCode = e;
        }
        get settings() {
          return this._delegate.settings;
        }
        get tenantId() {
          return this._delegate.tenantId;
        }
        set tenantId(e) {
          this._delegate.tenantId = e;
        }
        useDeviceLanguage() {
          this._delegate.useDeviceLanguage();
        }
        signOut() {
          return this._delegate.signOut();
        }
        useEmulator(e, t) {
          {
            var n = this._delegate;
            const i = w(n),
              s =
                (v(i._canInitEmulator, i, "emulator-config-failed"),
                v(/^https?:\/\//.test(e), i, "invalid-emulator-scheme"),
                (n = !(null == t || !t.disableWarnings)),
                Tt(e));
            var { host: t, port: e } = (function (e) {
              const t = Tt(e),
                n = /(\/\/)?([^?#/]+)/.exec(e.substr(t.length));
              if (!n) return { host: "", port: null };
              const r = n[2].split("@").pop() || "",
                i = /^(\[[^\]]+\])(:|$)/.exec(r);
              if (i)
                return { host: (s = i[1]), port: Et(r.substr(s.length + 1)) };
              var [e, s] = r.split(":");
              return { host: e, port: Et(s) };
            })(e);
            function r() {
              const e = document.createElement("p"),
                t = e.style;
              (e.innerText =
                "Running in emulator mode. Do not use with production credentials."),
                (t.position = "fixed"),
                (t.width = "100%"),
                (t.backgroundColor = "#ffffff"),
                (t.border = ".1em solid #000000"),
                (t.color = "#b50000"),
                (t.bottom = "0px"),
                (t.left = "0px"),
                (t.margin = "0px"),
                (t.zIndex = "10000"),
                (t.textAlign = "center"),
                e.classList.add("firebase-emulator-warning"),
                document.body.appendChild(e);
            }
            return (
              (i.config.emulator = {
                url: s + `//${t}${null === e ? "" : ":" + e}/`,
              }),
              (i.settings.appVerificationDisabledForTesting = !0),
              (i.emulatorConfig = Object.freeze({
                host: t,
                port: e,
                protocol: s.replace(":", ""),
                options: Object.freeze({ disableWarnings: n }),
              })),
              void (
                n ||
                ("undefined" != typeof console &&
                  "function" == typeof console.info &&
                  console.info(
                    "WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."
                  ),
                "undefined" != typeof window &&
                  "undefined" != typeof document &&
                  ("loading" === document.readyState
                    ? window.addEventListener("DOMContentLoaded", r)
                    : r()))
              )
            );
          }
        }
        applyActionCode(e) {
          return (async function (e, t) {
            await a(
              (e = o(e)),
              "POST",
              "/v1/accounts:update",
              s(e, { oobCode: t })
            );
          })(this._delegate, e);
        }
        checkActionCode(e) {
          return sn(this._delegate, e);
        }
        confirmPasswordReset(e, n) {
          return (async function (t) {
            await kt(o(t), { oobCode: e, newPassword: n }).catch(async (e) => {
              throw (
                ("auth/password-does-not-meet-requirements" === e.code && rn(t),
                e)
              );
            });
          })(this._delegate);
        }
        async createUserWithEmailAndPassword(e, t) {
          return M(
            this._delegate,
            (async function (t, e, n) {
              if (li._isFirebaseServerApp(t.app)) return Promise.reject(c(t));
              const r = w(t),
                i = T(
                  r,
                  {
                    returnSecureToken: !0,
                    email: e,
                    password: n,
                    clientType: "CLIENT_TYPE_WEB",
                  },
                  "signUpPassword",
                  Ht,
                  "EMAIL_PASSWORD_PROVIDER"
                );
              (e = await i.catch((e) => {
                throw (
                  ("auth/password-does-not-meet-requirements" === e.code &&
                    rn(t),
                  e)
                );
              })),
                (e = await C._fromIdTokenResponse(r, "signIn", e));
              return await r._updateCurrentUser(e.user), e;
            })(this._delegate, e, t)
          );
        }
        fetchProvidersForEmail(e) {
          return this.fetchSignInMethodsForEmail(e);
        }
        fetchSignInMethodsForEmail(e) {
          return (async function (e, t) {
            var n = Te() ? we() : "http://localhost";
            return (
              (
                await a(
                  (e = o(e)),
                  "POST",
                  "/v1/accounts:createAuthUri",
                  s(e, { identifier: t, continueUri: n })
                )
              ).signinMethods || []
            );
          })(this._delegate, e);
        }
        isSignInWithEmailLink(e) {
          return (
            this._delegate,
            "EMAIL_SIGNIN" ===
              (null == (e = Ut.parseLink(e)) ? void 0 : e.operation)
          );
        }
        async getRedirectResult() {
          ri(
            Gr(),
            this._delegate,
            "operation-not-supported-in-this-environment"
          );
          (t = this._delegate), (e = U), await w(t)._initializationPromise;
          var e,
            t = await cr(t, e, !1);
          return t
            ? M(this._delegate, Promise.resolve(t))
            : { credential: null, user: null };
        }
        addFrameworkForLogging(e) {
          w(this._delegate)._logFramework(e);
        }
        onAuthStateChanged(e, t, n) {
          var { next: e, error: t, complete: n } = si(e, t, n);
          return this._delegate.onAuthStateChanged(e, t, n);
        }
        onIdTokenChanged(e, t, n) {
          var { next: e, error: t, complete: n } = si(e, t, n);
          return this._delegate.onIdTokenChanged(e, t, n);
        }
        sendSignInLinkToEmail(i, e) {
          return (async function (e, t, n) {
            var e = w(e),
              r = {
                requestType: "EMAIL_SIGNIN",
                email: i,
                clientType: "CLIENT_TYPE_WEB",
              };
            (t = r),
              v(n.handleCodeInApp, e, "argument-error"),
              n && nn(e, t, n),
              await T(e, r, "getOobCode", Ct, "EMAIL_PASSWORD_PROVIDER");
          })(this._delegate, 0, e);
        }
        sendPasswordResetEmail(r, e) {
          return (async function (e, t) {
            var e = w(e),
              n = {
                requestType: "PASSWORD_RESET",
                email: r,
                clientType: "CLIENT_TYPE_WEB",
              };
            t && nn(e, n, t),
              await T(e, n, "getOobCode", At, "EMAIL_PASSWORD_PROVIDER");
          })(this._delegate, e || void 0);
        }
        async setPersistence(e) {
          var t = this._delegate,
            n = e;
          Jr(Object.values(D).includes(n), t, "invalid-persistence-type"),
            q()
              ? Jr(n !== D.SESSION, t, "unsupported-persistence-type")
              : H()
              ? Jr(n === D.NONE, t, "unsupported-persistence-type")
              : zr()
              ? Jr(
                  n === D.NONE || (n === D.LOCAL && z()),
                  t,
                  "unsupported-persistence-type"
                )
              : Jr(n === D.NONE || Br(), t, "unsupported-persistence-type");
          let r;
          switch (e) {
            case D.SESSION:
              r = En;
              break;
            case D.LOCAL:
              var i = await g(Mn)._isAvailable();
              r = i ? Mn : wn;
              break;
            case D.NONE:
              r = Ye;
              break;
            default:
              return p("argument-error", { appName: this._delegate.name });
          }
          return this._delegate.setPersistence(r);
        }
        signInAndRetrieveDataWithCredential(e) {
          return this.signInWithCredential(e);
        }
        signInAnonymously() {
          return M(
            this._delegate,
            (async function (e) {
              if (li._isFirebaseServerApp(e.app)) return Promise.reject(c(e));
              const t = w(e);
              if (
                (await t._initializationPromise,
                null != (e = t.currentUser) && e.isAnonymous)
              )
                return new C({
                  user: t.currentUser,
                  providerId: null,
                  operationType: "signIn",
                });
              (e = await Ht(t, { returnSecureToken: !0 })),
                (e = await C._fromIdTokenResponse(t, "signIn", e, !0));
              return await t._updateCurrentUser(e.user), e;
            })(this._delegate)
          );
        }
        signInWithCredential(e) {
          return M(this._delegate, $t(this._delegate, e));
        }
        signInWithCustomToken(e) {
          return M(
            this._delegate,
            (async function (e, t) {
              if (li._isFirebaseServerApp(e.app)) return Promise.reject(c(e));
              const n = w(e);
              return (
                (e = await l(
                  n,
                  "POST",
                  "/v1/accounts:signInWithCustomToken",
                  s(n, { token: t, returnSecureToken: !0 })
                )),
                (e = await C._fromIdTokenResponse(n, "signIn", e)),
                await n._updateCurrentUser(e.user),
                e
              );
            })(this._delegate, e)
          );
        }
        signInWithEmailAndPassword(e, t) {
          return M(
            this._delegate,
            ((n = this._delegate),
            li._isFirebaseServerApp(n.app)
              ? Promise.reject(c(n))
              : $t(o(n), Mt.credential(e, t)).catch(async (e) => {
                  throw (
                    ("auth/password-does-not-meet-requirements" === e.code &&
                      rn(n),
                    e)
                  );
                }))
          );
          var n;
        }
        signInWithEmailLink(e, t) {
          return M(
            this._delegate,
            (async function (e, t, n) {
              if (li._isFirebaseServerApp(e.app)) return Promise.reject(c(e));
              (e = o(e)), (t = Mt.credentialWithLink(t, n || we()));
              return (
                v(
                  t._tenantId === (e.tenantId || null),
                  e,
                  "tenant-id-mismatch"
                ),
                $t(e, t)
              );
            })(this._delegate, e, t)
          );
        }
        signInWithPhoneNumber(e, t) {
          return ti(
            this._delegate,
            (async function (e, t, n) {
              if (li._isFirebaseServerApp(e.app)) return Promise.reject(c(e));
              const r = w(e);
              e = await Gn(r, t, o(n));
              return new zn(e, (e) => $t(r, e));
            })(this._delegate, e, t)
          );
        }
        async signInWithPopup(e) {
          return (
            ri(
              Gr(),
              this._delegate,
              "operation-not-supported-in-this-environment"
            ),
            M(
              this._delegate,
              (async function (e, t, n) {
                if (li._isFirebaseServerApp(e.app))
                  return Promise.reject(
                    m(e, "operation-not-supported-in-this-environment")
                  );
                var r = w(e),
                  e = (ye(e, t, k), Jn(r, n));
                const i = new L(r, "signInViaPopup", t, e);
                return i.executeNotNull();
              })(this._delegate, e, U)
            )
          );
        }
        async signInWithRedirect(e) {
          return (
            ri(
              Gr(),
              this._delegate,
              "operation-not-supported-in-this-environment"
            ),
            await $r(this._delegate),
            (t = this._delegate),
            (e = e),
            (n = U),
            (async function (e, t, n) {
              if (li._isFirebaseServerApp(e.app)) return Promise.reject(c(e));
              var r = w(e);
              ye(e, t, k), await r._initializationPromise;
              const i = Jn(r, n);
              return await ir(i, r), i._openRedirect(r, t, "signInViaRedirect");
            })(t, e, n)
          );
          var t, n;
        }
        updateCurrentUser(e) {
          return this._delegate.updateCurrentUser(e);
        }
        verifyPasswordResetCode(t) {
          return (async function (e) {
            return (await sn(o(e), t)).data.email;
          })(this._delegate);
        }
        unwrap() {
          return this._delegate;
        }
        _delete() {
          return this._delegate._delete();
        }
        linkUnderlyingAuth() {
          this._delegate.wrapped = () => this;
        }
      }
      function si(e, t, n) {
        let r = e;
        "function" != typeof e && ({ next: r, error: t, complete: n } = e);
        const i = r;
        return { next: (e) => i(e && F.getOrCreate(e)), error: t, complete: n };
      }
      ii.Persistence = D;
      class ai {
        static credential(e, t) {
          return N.credential(e, t);
        }
        constructor() {
          (this.providerId = "phone"),
            (this._delegate = new N(Zr(V.default.auth())));
        }
        verifyPhoneNumber(e, t) {
          return this._delegate.verifyPhoneNumber(e, t);
        }
        unwrap() {
          return this._delegate;
        }
      }
      (ai.PHONE_SIGN_IN_METHOD = N.PHONE_SIGN_IN_METHOD),
        (ai.PROVIDER_ID = N.PROVIDER_ID);
      const oi = v;
      (Nr = V.default).INTERNAL.registerComponent(
        new ie(
          "auth-compat",
          (e) => {
            var t = e.getProvider("app-compat").getImmediate(),
              e = e.getProvider("auth");
            return new ii(t, e);
          },
          "PUBLIC"
        )
          .setServiceProps({
            ActionCodeInfo: {
              Operation: {
                EMAIL_SIGNIN: ae,
                PASSWORD_RESET: oe,
                RECOVER_EMAIL: ce,
                REVERT_SECOND_FACTOR_ADDITION: le,
                VERIFY_AND_CHANGE_EMAIL: ue,
                VERIFY_EMAIL: de,
              },
            },
            EmailAuthProvider: Mt,
            FacebookAuthProvider: S,
            GithubAuthProvider: P,
            GoogleAuthProvider: R,
            OAuthProvider: Vt,
            SAMLAuthProvider: jt,
            PhoneAuthProvider: ai,
            PhoneMultiFactorGenerator: Cr,
            RecaptchaVerifier: class {
              constructor(e, t, n = V.default.app()) {
                var r;
                oi(
                  null == (r = n.options) ? void 0 : r.apiKey,
                  "invalid-api-key",
                  { appName: n.name }
                ),
                  (this._delegate = new Bn(n.auth(), e, t)),
                  (this.type = this._delegate.type);
              }
              clear() {
                this._delegate.clear();
              }
              render() {
                return this._delegate.render();
              }
              verify() {
                return this._delegate.verify();
              }
            },
            TwitterAuthProvider: A,
            Auth: ii,
            AuthCredential: bt,
            Error: d,
          })
          .setInstantiationMode("LAZY")
          .setMultipleInstances(!1)
      ),
        Nr.registerVersion("@firebase/auth-compat", "0.5.16");
    }.apply(this, arguments);
  } catch (e) {
    throw (
      (console.error(e),
      new Error(
        "Cannot instantiate firebase-auth-compat.js - be sure to load firebase-app.js first."
      ))
    );
  }
});
