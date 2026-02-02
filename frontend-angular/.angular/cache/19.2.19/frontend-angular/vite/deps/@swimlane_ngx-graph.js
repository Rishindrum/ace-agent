import {
  bundle_default,
  line_default
} from "./chunk-5VIC74T7.js";
import {
  animate,
  sequence,
  style,
  transition,
  trigger
} from "./chunk-ZIP2NJMG.js";
import {
  CommonModule,
  NgForOf,
  NgIf,
  NgTemplateOutlet
} from "./chunk-DS3OYTTT.js";
import {
  DOCUMENT
} from "./chunk-VPNLXNLN.js";
import {
  ANIMATION_MODULE_TYPE,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Injectable,
  Input,
  NgModule,
  NgZone,
  Output,
  RendererFactory2,
  RuntimeError,
  ViewChildren,
  ViewEncapsulation,
  inject,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-GYHO6ZAB.js";
import {
  Observable,
  Subject,
  Subscription,
  __decorate,
  debounceTime,
  fromEvent,
  of,
  takeUntil
} from "./chunk-HKGWJUTY.js";
import {
  __commonJS,
  __export,
  __require,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-N6ESDQJH.js";

// node_modules/lodash/_listCacheClear.js
var require_listCacheClear = __commonJS({
  "node_modules/lodash/_listCacheClear.js"(exports, module) {
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    module.exports = listCacheClear;
  }
});

// node_modules/lodash/eq.js
var require_eq = __commonJS({
  "node_modules/lodash/eq.js"(exports, module) {
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    module.exports = eq;
  }
});

// node_modules/lodash/_assocIndexOf.js
var require_assocIndexOf = __commonJS({
  "node_modules/lodash/_assocIndexOf.js"(exports, module) {
    var eq = require_eq();
    function assocIndexOf(array3, key) {
      var length = array3.length;
      while (length--) {
        if (eq(array3[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    module.exports = assocIndexOf;
  }
});

// node_modules/lodash/_listCacheDelete.js
var require_listCacheDelete = __commonJS({
  "node_modules/lodash/_listCacheDelete.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    var arrayProto = Array.prototype;
    var splice = arrayProto.splice;
    function listCacheDelete(key) {
      var data = this.__data__, index3 = assocIndexOf(data, key);
      if (index3 < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index3 == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index3, 1);
      }
      --this.size;
      return true;
    }
    module.exports = listCacheDelete;
  }
});

// node_modules/lodash/_listCacheGet.js
var require_listCacheGet = __commonJS({
  "node_modules/lodash/_listCacheGet.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheGet(key) {
      var data = this.__data__, index3 = assocIndexOf(data, key);
      return index3 < 0 ? void 0 : data[index3][1];
    }
    module.exports = listCacheGet;
  }
});

// node_modules/lodash/_listCacheHas.js
var require_listCacheHas = __commonJS({
  "node_modules/lodash/_listCacheHas.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    module.exports = listCacheHas;
  }
});

// node_modules/lodash/_listCacheSet.js
var require_listCacheSet = __commonJS({
  "node_modules/lodash/_listCacheSet.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheSet(key, value) {
      var data = this.__data__, index3 = assocIndexOf(data, key);
      if (index3 < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index3][1] = value;
      }
      return this;
    }
    module.exports = listCacheSet;
  }
});

// node_modules/lodash/_ListCache.js
var require_ListCache = __commonJS({
  "node_modules/lodash/_ListCache.js"(exports, module) {
    var listCacheClear = require_listCacheClear();
    var listCacheDelete = require_listCacheDelete();
    var listCacheGet = require_listCacheGet();
    var listCacheHas = require_listCacheHas();
    var listCacheSet = require_listCacheSet();
    function ListCache(entries) {
      var index3 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index3 < length) {
        var entry = entries[index3];
        this.set(entry[0], entry[1]);
      }
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    module.exports = ListCache;
  }
});

// node_modules/lodash/_stackClear.js
var require_stackClear = __commonJS({
  "node_modules/lodash/_stackClear.js"(exports, module) {
    var ListCache = require_ListCache();
    function stackClear() {
      this.__data__ = new ListCache();
      this.size = 0;
    }
    module.exports = stackClear;
  }
});

// node_modules/lodash/_stackDelete.js
var require_stackDelete = __commonJS({
  "node_modules/lodash/_stackDelete.js"(exports, module) {
    function stackDelete(key) {
      var data = this.__data__, result = data["delete"](key);
      this.size = data.size;
      return result;
    }
    module.exports = stackDelete;
  }
});

// node_modules/lodash/_stackGet.js
var require_stackGet = __commonJS({
  "node_modules/lodash/_stackGet.js"(exports, module) {
    function stackGet(key) {
      return this.__data__.get(key);
    }
    module.exports = stackGet;
  }
});

// node_modules/lodash/_stackHas.js
var require_stackHas = __commonJS({
  "node_modules/lodash/_stackHas.js"(exports, module) {
    function stackHas(key) {
      return this.__data__.has(key);
    }
    module.exports = stackHas;
  }
});

// node_modules/lodash/_freeGlobal.js
var require_freeGlobal = __commonJS({
  "node_modules/lodash/_freeGlobal.js"(exports, module) {
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    module.exports = freeGlobal;
  }
});

// node_modules/lodash/_root.js
var require_root = __commonJS({
  "node_modules/lodash/_root.js"(exports, module) {
    var freeGlobal = require_freeGlobal();
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root2 = freeGlobal || freeSelf || Function("return this")();
    module.exports = root2;
  }
});

// node_modules/lodash/_Symbol.js
var require_Symbol = __commonJS({
  "node_modules/lodash/_Symbol.js"(exports, module) {
    var root2 = require_root();
    var Symbol2 = root2.Symbol;
    module.exports = Symbol2;
  }
});

// node_modules/lodash/_getRawTag.js
var require_getRawTag = __commonJS({
  "node_modules/lodash/_getRawTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    module.exports = getRawTag;
  }
});

// node_modules/lodash/_objectToString.js
var require_objectToString = __commonJS({
  "node_modules/lodash/_objectToString.js"(exports, module) {
    var objectProto = Object.prototype;
    var nativeObjectToString = objectProto.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    module.exports = objectToString;
  }
});

// node_modules/lodash/_baseGetTag.js
var require_baseGetTag = __commonJS({
  "node_modules/lodash/_baseGetTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var getRawTag = require_getRawTag();
    var objectToString = require_objectToString();
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    module.exports = baseGetTag;
  }
});

// node_modules/lodash/isObject.js
var require_isObject = __commonJS({
  "node_modules/lodash/isObject.js"(exports, module) {
    function isObject2(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    module.exports = isObject2;
  }
});

// node_modules/lodash/isFunction.js
var require_isFunction = __commonJS({
  "node_modules/lodash/isFunction.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObject2 = require_isObject();
    var asyncTag = "[object AsyncFunction]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var proxyTag = "[object Proxy]";
    function isFunction(value) {
      if (!isObject2(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    module.exports = isFunction;
  }
});

// node_modules/lodash/_coreJsData.js
var require_coreJsData = __commonJS({
  "node_modules/lodash/_coreJsData.js"(exports, module) {
    var root2 = require_root();
    var coreJsData = root2["__core-js_shared__"];
    module.exports = coreJsData;
  }
});

// node_modules/lodash/_isMasked.js
var require_isMasked = __commonJS({
  "node_modules/lodash/_isMasked.js"(exports, module) {
    var coreJsData = require_coreJsData();
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    module.exports = isMasked;
  }
});

// node_modules/lodash/_toSource.js
var require_toSource = __commonJS({
  "node_modules/lodash/_toSource.js"(exports, module) {
    var funcProto = Function.prototype;
    var funcToString = funcProto.toString;
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    module.exports = toSource;
  }
});

// node_modules/lodash/_baseIsNative.js
var require_baseIsNative = __commonJS({
  "node_modules/lodash/_baseIsNative.js"(exports, module) {
    var isFunction = require_isFunction();
    var isMasked = require_isMasked();
    var isObject2 = require_isObject();
    var toSource = require_toSource();
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    function baseIsNative(value) {
      if (!isObject2(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    module.exports = baseIsNative;
  }
});

// node_modules/lodash/_getValue.js
var require_getValue = __commonJS({
  "node_modules/lodash/_getValue.js"(exports, module) {
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    module.exports = getValue;
  }
});

// node_modules/lodash/_getNative.js
var require_getNative = __commonJS({
  "node_modules/lodash/_getNative.js"(exports, module) {
    var baseIsNative = require_baseIsNative();
    var getValue = require_getValue();
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    module.exports = getNative;
  }
});

// node_modules/lodash/_Map.js
var require_Map = __commonJS({
  "node_modules/lodash/_Map.js"(exports, module) {
    var getNative = require_getNative();
    var root2 = require_root();
    var Map2 = getNative(root2, "Map");
    module.exports = Map2;
  }
});

// node_modules/lodash/_nativeCreate.js
var require_nativeCreate = __commonJS({
  "node_modules/lodash/_nativeCreate.js"(exports, module) {
    var getNative = require_getNative();
    var nativeCreate = getNative(Object, "create");
    module.exports = nativeCreate;
  }
});

// node_modules/lodash/_hashClear.js
var require_hashClear = __commonJS({
  "node_modules/lodash/_hashClear.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }
    module.exports = hashClear;
  }
});

// node_modules/lodash/_hashDelete.js
var require_hashDelete = __commonJS({
  "node_modules/lodash/_hashDelete.js"(exports, module) {
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = hashDelete;
  }
});

// node_modules/lodash/_hashGet.js
var require_hashGet = __commonJS({
  "node_modules/lodash/_hashGet.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    module.exports = hashGet;
  }
});

// node_modules/lodash/_hashHas.js
var require_hashHas = __commonJS({
  "node_modules/lodash/_hashHas.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    module.exports = hashHas;
  }
});

// node_modules/lodash/_hashSet.js
var require_hashSet = __commonJS({
  "node_modules/lodash/_hashSet.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    module.exports = hashSet;
  }
});

// node_modules/lodash/_Hash.js
var require_Hash = __commonJS({
  "node_modules/lodash/_Hash.js"(exports, module) {
    var hashClear = require_hashClear();
    var hashDelete = require_hashDelete();
    var hashGet = require_hashGet();
    var hashHas = require_hashHas();
    var hashSet = require_hashSet();
    function Hash(entries) {
      var index3 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index3 < length) {
        var entry = entries[index3];
        this.set(entry[0], entry[1]);
      }
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    module.exports = Hash;
  }
});

// node_modules/lodash/_mapCacheClear.js
var require_mapCacheClear = __commonJS({
  "node_modules/lodash/_mapCacheClear.js"(exports, module) {
    var Hash = require_Hash();
    var ListCache = require_ListCache();
    var Map2 = require_Map();
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    module.exports = mapCacheClear;
  }
});

// node_modules/lodash/_isKeyable.js
var require_isKeyable = __commonJS({
  "node_modules/lodash/_isKeyable.js"(exports, module) {
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    module.exports = isKeyable;
  }
});

// node_modules/lodash/_getMapData.js
var require_getMapData = __commonJS({
  "node_modules/lodash/_getMapData.js"(exports, module) {
    var isKeyable = require_isKeyable();
    function getMapData(map4, key) {
      var data = map4.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    module.exports = getMapData;
  }
});

// node_modules/lodash/_mapCacheDelete.js
var require_mapCacheDelete = __commonJS({
  "node_modules/lodash/_mapCacheDelete.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheDelete(key) {
      var result = getMapData(this, key)["delete"](key);
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = mapCacheDelete;
  }
});

// node_modules/lodash/_mapCacheGet.js
var require_mapCacheGet = __commonJS({
  "node_modules/lodash/_mapCacheGet.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    module.exports = mapCacheGet;
  }
});

// node_modules/lodash/_mapCacheHas.js
var require_mapCacheHas = __commonJS({
  "node_modules/lodash/_mapCacheHas.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    module.exports = mapCacheHas;
  }
});

// node_modules/lodash/_mapCacheSet.js
var require_mapCacheSet = __commonJS({
  "node_modules/lodash/_mapCacheSet.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheSet(key, value) {
      var data = getMapData(this, key), size = data.size;
      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }
    module.exports = mapCacheSet;
  }
});

// node_modules/lodash/_MapCache.js
var require_MapCache = __commonJS({
  "node_modules/lodash/_MapCache.js"(exports, module) {
    var mapCacheClear = require_mapCacheClear();
    var mapCacheDelete = require_mapCacheDelete();
    var mapCacheGet = require_mapCacheGet();
    var mapCacheHas = require_mapCacheHas();
    var mapCacheSet = require_mapCacheSet();
    function MapCache(entries) {
      var index3 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index3 < length) {
        var entry = entries[index3];
        this.set(entry[0], entry[1]);
      }
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    module.exports = MapCache;
  }
});

// node_modules/lodash/_stackSet.js
var require_stackSet = __commonJS({
  "node_modules/lodash/_stackSet.js"(exports, module) {
    var ListCache = require_ListCache();
    var Map2 = require_Map();
    var MapCache = require_MapCache();
    var LARGE_ARRAY_SIZE = 200;
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs2 = data.__data__;
        if (!Map2 || pairs2.length < LARGE_ARRAY_SIZE - 1) {
          pairs2.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs2);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }
    module.exports = stackSet;
  }
});

// node_modules/lodash/_Stack.js
var require_Stack = __commonJS({
  "node_modules/lodash/_Stack.js"(exports, module) {
    var ListCache = require_ListCache();
    var stackClear = require_stackClear();
    var stackDelete = require_stackDelete();
    var stackGet = require_stackGet();
    var stackHas = require_stackHas();
    var stackSet = require_stackSet();
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    module.exports = Stack;
  }
});

// node_modules/lodash/_arrayEach.js
var require_arrayEach = __commonJS({
  "node_modules/lodash/_arrayEach.js"(exports, module) {
    function arrayEach(array3, iteratee) {
      var index3 = -1, length = array3 == null ? 0 : array3.length;
      while (++index3 < length) {
        if (iteratee(array3[index3], index3, array3) === false) {
          break;
        }
      }
      return array3;
    }
    module.exports = arrayEach;
  }
});

// node_modules/lodash/_defineProperty.js
var require_defineProperty = __commonJS({
  "node_modules/lodash/_defineProperty.js"(exports, module) {
    var getNative = require_getNative();
    var defineProperty = function() {
      try {
        var func = getNative(Object, "defineProperty");
        func({}, "", {});
        return func;
      } catch (e) {
      }
    }();
    module.exports = defineProperty;
  }
});

// node_modules/lodash/_baseAssignValue.js
var require_baseAssignValue = __commonJS({
  "node_modules/lodash/_baseAssignValue.js"(exports, module) {
    var defineProperty = require_defineProperty();
    function baseAssignValue(object, key, value) {
      if (key == "__proto__" && defineProperty) {
        defineProperty(object, key, {
          "configurable": true,
          "enumerable": true,
          "value": value,
          "writable": true
        });
      } else {
        object[key] = value;
      }
    }
    module.exports = baseAssignValue;
  }
});

// node_modules/lodash/_assignValue.js
var require_assignValue = __commonJS({
  "node_modules/lodash/_assignValue.js"(exports, module) {
    var baseAssignValue = require_baseAssignValue();
    var eq = require_eq();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
        baseAssignValue(object, key, value);
      }
    }
    module.exports = assignValue;
  }
});

// node_modules/lodash/_copyObject.js
var require_copyObject = __commonJS({
  "node_modules/lodash/_copyObject.js"(exports, module) {
    var assignValue = require_assignValue();
    var baseAssignValue = require_baseAssignValue();
    function copyObject(source, props, object, customizer) {
      var isNew = !object;
      object || (object = {});
      var index3 = -1, length = props.length;
      while (++index3 < length) {
        var key = props[index3];
        var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
        if (newValue === void 0) {
          newValue = source[key];
        }
        if (isNew) {
          baseAssignValue(object, key, newValue);
        } else {
          assignValue(object, key, newValue);
        }
      }
      return object;
    }
    module.exports = copyObject;
  }
});

// node_modules/lodash/_baseTimes.js
var require_baseTimes = __commonJS({
  "node_modules/lodash/_baseTimes.js"(exports, module) {
    function baseTimes(n, iteratee) {
      var index3 = -1, result = Array(n);
      while (++index3 < n) {
        result[index3] = iteratee(index3);
      }
      return result;
    }
    module.exports = baseTimes;
  }
});

// node_modules/lodash/isObjectLike.js
var require_isObjectLike = __commonJS({
  "node_modules/lodash/isObjectLike.js"(exports, module) {
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    module.exports = isObjectLike;
  }
});

// node_modules/lodash/_baseIsArguments.js
var require_baseIsArguments = __commonJS({
  "node_modules/lodash/_baseIsArguments.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    module.exports = baseIsArguments;
  }
});

// node_modules/lodash/isArguments.js
var require_isArguments = __commonJS({
  "node_modules/lodash/isArguments.js"(exports, module) {
    var baseIsArguments = require_baseIsArguments();
    var isObjectLike = require_isObjectLike();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var isArguments = baseIsArguments(/* @__PURE__ */ function() {
      return arguments;
    }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    module.exports = isArguments;
  }
});

// node_modules/lodash/isArray.js
var require_isArray = __commonJS({
  "node_modules/lodash/isArray.js"(exports, module) {
    var isArray = Array.isArray;
    module.exports = isArray;
  }
});

// node_modules/lodash/stubFalse.js
var require_stubFalse = __commonJS({
  "node_modules/lodash/stubFalse.js"(exports, module) {
    function stubFalse() {
      return false;
    }
    module.exports = stubFalse;
  }
});

// node_modules/lodash/isBuffer.js
var require_isBuffer = __commonJS({
  "node_modules/lodash/isBuffer.js"(exports, module) {
    var root2 = require_root();
    var stubFalse = require_stubFalse();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer = moduleExports ? root2.Buffer : void 0;
    var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
    var isBuffer = nativeIsBuffer || stubFalse;
    module.exports = isBuffer;
  }
});

// node_modules/lodash/_isIndex.js
var require_isIndex = __commonJS({
  "node_modules/lodash/_isIndex.js"(exports, module) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
    }
    module.exports = isIndex;
  }
});

// node_modules/lodash/isLength.js
var require_isLength = __commonJS({
  "node_modules/lodash/isLength.js"(exports, module) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    module.exports = isLength;
  }
});

// node_modules/lodash/_baseIsTypedArray.js
var require_baseIsTypedArray = __commonJS({
  "node_modules/lodash/_baseIsTypedArray.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isLength = require_isLength();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    module.exports = baseIsTypedArray;
  }
});

// node_modules/lodash/_baseUnary.js
var require_baseUnary = __commonJS({
  "node_modules/lodash/_baseUnary.js"(exports, module) {
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    module.exports = baseUnary;
  }
});

// node_modules/lodash/_nodeUtil.js
var require_nodeUtil = __commonJS({
  "node_modules/lodash/_nodeUtil.js"(exports, module) {
    var freeGlobal = require_freeGlobal();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    }();
    module.exports = nodeUtil;
  }
});

// node_modules/lodash/isTypedArray.js
var require_isTypedArray = __commonJS({
  "node_modules/lodash/isTypedArray.js"(exports, module) {
    var baseIsTypedArray = require_baseIsTypedArray();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    module.exports = isTypedArray;
  }
});

// node_modules/lodash/_arrayLikeKeys.js
var require_arrayLikeKeys = __commonJS({
  "node_modules/lodash/_arrayLikeKeys.js"(exports, module) {
    var baseTimes = require_baseTimes();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isBuffer = require_isBuffer();
    var isIndex = require_isIndex();
    var isTypedArray = require_isTypedArray();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
        (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
        isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = arrayLikeKeys;
  }
});

// node_modules/lodash/_isPrototype.js
var require_isPrototype = __commonJS({
  "node_modules/lodash/_isPrototype.js"(exports, module) {
    var objectProto = Object.prototype;
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    module.exports = isPrototype;
  }
});

// node_modules/lodash/_overArg.js
var require_overArg = __commonJS({
  "node_modules/lodash/_overArg.js"(exports, module) {
    function overArg(func, transform2) {
      return function(arg) {
        return func(transform2(arg));
      };
    }
    module.exports = overArg;
  }
});

// node_modules/lodash/_nativeKeys.js
var require_nativeKeys = __commonJS({
  "node_modules/lodash/_nativeKeys.js"(exports, module) {
    var overArg = require_overArg();
    var nativeKeys = overArg(Object.keys, Object);
    module.exports = nativeKeys;
  }
});

// node_modules/lodash/_baseKeys.js
var require_baseKeys = __commonJS({
  "node_modules/lodash/_baseKeys.js"(exports, module) {
    var isPrototype = require_isPrototype();
    var nativeKeys = require_nativeKeys();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = baseKeys;
  }
});

// node_modules/lodash/isArrayLike.js
var require_isArrayLike = __commonJS({
  "node_modules/lodash/isArrayLike.js"(exports, module) {
    var isFunction = require_isFunction();
    var isLength = require_isLength();
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    module.exports = isArrayLike;
  }
});

// node_modules/lodash/keys.js
var require_keys = __commonJS({
  "node_modules/lodash/keys.js"(exports, module) {
    var arrayLikeKeys = require_arrayLikeKeys();
    var baseKeys = require_baseKeys();
    var isArrayLike = require_isArrayLike();
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    module.exports = keys;
  }
});

// node_modules/lodash/_baseAssign.js
var require_baseAssign = __commonJS({
  "node_modules/lodash/_baseAssign.js"(exports, module) {
    var copyObject = require_copyObject();
    var keys = require_keys();
    function baseAssign(object, source) {
      return object && copyObject(source, keys(source), object);
    }
    module.exports = baseAssign;
  }
});

// node_modules/lodash/_nativeKeysIn.js
var require_nativeKeysIn = __commonJS({
  "node_modules/lodash/_nativeKeysIn.js"(exports, module) {
    function nativeKeysIn(object) {
      var result = [];
      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = nativeKeysIn;
  }
});

// node_modules/lodash/_baseKeysIn.js
var require_baseKeysIn = __commonJS({
  "node_modules/lodash/_baseKeysIn.js"(exports, module) {
    var isObject2 = require_isObject();
    var isPrototype = require_isPrototype();
    var nativeKeysIn = require_nativeKeysIn();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseKeysIn(object) {
      if (!isObject2(object)) {
        return nativeKeysIn(object);
      }
      var isProto = isPrototype(object), result = [];
      for (var key in object) {
        if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = baseKeysIn;
  }
});

// node_modules/lodash/keysIn.js
var require_keysIn = __commonJS({
  "node_modules/lodash/keysIn.js"(exports, module) {
    var arrayLikeKeys = require_arrayLikeKeys();
    var baseKeysIn = require_baseKeysIn();
    var isArrayLike = require_isArrayLike();
    function keysIn(object) {
      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
    }
    module.exports = keysIn;
  }
});

// node_modules/lodash/_baseAssignIn.js
var require_baseAssignIn = __commonJS({
  "node_modules/lodash/_baseAssignIn.js"(exports, module) {
    var copyObject = require_copyObject();
    var keysIn = require_keysIn();
    function baseAssignIn(object, source) {
      return object && copyObject(source, keysIn(source), object);
    }
    module.exports = baseAssignIn;
  }
});

// node_modules/lodash/_cloneBuffer.js
var require_cloneBuffer = __commonJS({
  "node_modules/lodash/_cloneBuffer.js"(exports, module) {
    var root2 = require_root();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer = moduleExports ? root2.Buffer : void 0;
    var allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
      buffer.copy(result);
      return result;
    }
    module.exports = cloneBuffer;
  }
});

// node_modules/lodash/_copyArray.js
var require_copyArray = __commonJS({
  "node_modules/lodash/_copyArray.js"(exports, module) {
    function copyArray(source, array3) {
      var index3 = -1, length = source.length;
      array3 || (array3 = Array(length));
      while (++index3 < length) {
        array3[index3] = source[index3];
      }
      return array3;
    }
    module.exports = copyArray;
  }
});

// node_modules/lodash/_arrayFilter.js
var require_arrayFilter = __commonJS({
  "node_modules/lodash/_arrayFilter.js"(exports, module) {
    function arrayFilter(array3, predicate) {
      var index3 = -1, length = array3 == null ? 0 : array3.length, resIndex = 0, result = [];
      while (++index3 < length) {
        var value = array3[index3];
        if (predicate(value, index3, array3)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    module.exports = arrayFilter;
  }
});

// node_modules/lodash/stubArray.js
var require_stubArray = __commonJS({
  "node_modules/lodash/stubArray.js"(exports, module) {
    function stubArray() {
      return [];
    }
    module.exports = stubArray;
  }
});

// node_modules/lodash/_getSymbols.js
var require_getSymbols = __commonJS({
  "node_modules/lodash/_getSymbols.js"(exports, module) {
    var arrayFilter = require_arrayFilter();
    var stubArray = require_stubArray();
    var objectProto = Object.prototype;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };
    module.exports = getSymbols;
  }
});

// node_modules/lodash/_copySymbols.js
var require_copySymbols = __commonJS({
  "node_modules/lodash/_copySymbols.js"(exports, module) {
    var copyObject = require_copyObject();
    var getSymbols = require_getSymbols();
    function copySymbols(source, object) {
      return copyObject(source, getSymbols(source), object);
    }
    module.exports = copySymbols;
  }
});

// node_modules/lodash/_arrayPush.js
var require_arrayPush = __commonJS({
  "node_modules/lodash/_arrayPush.js"(exports, module) {
    function arrayPush(array3, values) {
      var index3 = -1, length = values.length, offset = array3.length;
      while (++index3 < length) {
        array3[offset + index3] = values[index3];
      }
      return array3;
    }
    module.exports = arrayPush;
  }
});

// node_modules/lodash/_getPrototype.js
var require_getPrototype = __commonJS({
  "node_modules/lodash/_getPrototype.js"(exports, module) {
    var overArg = require_overArg();
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    module.exports = getPrototype;
  }
});

// node_modules/lodash/_getSymbolsIn.js
var require_getSymbolsIn = __commonJS({
  "node_modules/lodash/_getSymbolsIn.js"(exports, module) {
    var arrayPush = require_arrayPush();
    var getPrototype = require_getPrototype();
    var getSymbols = require_getSymbols();
    var stubArray = require_stubArray();
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
      var result = [];
      while (object) {
        arrayPush(result, getSymbols(object));
        object = getPrototype(object);
      }
      return result;
    };
    module.exports = getSymbolsIn;
  }
});

// node_modules/lodash/_copySymbolsIn.js
var require_copySymbolsIn = __commonJS({
  "node_modules/lodash/_copySymbolsIn.js"(exports, module) {
    var copyObject = require_copyObject();
    var getSymbolsIn = require_getSymbolsIn();
    function copySymbolsIn(source, object) {
      return copyObject(source, getSymbolsIn(source), object);
    }
    module.exports = copySymbolsIn;
  }
});

// node_modules/lodash/_baseGetAllKeys.js
var require_baseGetAllKeys = __commonJS({
  "node_modules/lodash/_baseGetAllKeys.js"(exports, module) {
    var arrayPush = require_arrayPush();
    var isArray = require_isArray();
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    module.exports = baseGetAllKeys;
  }
});

// node_modules/lodash/_getAllKeys.js
var require_getAllKeys = __commonJS({
  "node_modules/lodash/_getAllKeys.js"(exports, module) {
    var baseGetAllKeys = require_baseGetAllKeys();
    var getSymbols = require_getSymbols();
    var keys = require_keys();
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }
    module.exports = getAllKeys;
  }
});

// node_modules/lodash/_getAllKeysIn.js
var require_getAllKeysIn = __commonJS({
  "node_modules/lodash/_getAllKeysIn.js"(exports, module) {
    var baseGetAllKeys = require_baseGetAllKeys();
    var getSymbolsIn = require_getSymbolsIn();
    var keysIn = require_keysIn();
    function getAllKeysIn(object) {
      return baseGetAllKeys(object, keysIn, getSymbolsIn);
    }
    module.exports = getAllKeysIn;
  }
});

// node_modules/lodash/_DataView.js
var require_DataView = __commonJS({
  "node_modules/lodash/_DataView.js"(exports, module) {
    var getNative = require_getNative();
    var root2 = require_root();
    var DataView2 = getNative(root2, "DataView");
    module.exports = DataView2;
  }
});

// node_modules/lodash/_Promise.js
var require_Promise = __commonJS({
  "node_modules/lodash/_Promise.js"(exports, module) {
    var getNative = require_getNative();
    var root2 = require_root();
    var Promise2 = getNative(root2, "Promise");
    module.exports = Promise2;
  }
});

// node_modules/lodash/_Set.js
var require_Set = __commonJS({
  "node_modules/lodash/_Set.js"(exports, module) {
    var getNative = require_getNative();
    var root2 = require_root();
    var Set2 = getNative(root2, "Set");
    module.exports = Set2;
  }
});

// node_modules/lodash/_WeakMap.js
var require_WeakMap = __commonJS({
  "node_modules/lodash/_WeakMap.js"(exports, module) {
    var getNative = require_getNative();
    var root2 = require_root();
    var WeakMap = getNative(root2, "WeakMap");
    module.exports = WeakMap;
  }
});

// node_modules/lodash/_getTag.js
var require_getTag = __commonJS({
  "node_modules/lodash/_getTag.js"(exports, module) {
    var DataView2 = require_DataView();
    var Map2 = require_Map();
    var Promise2 = require_Promise();
    var Set2 = require_Set();
    var WeakMap = require_WeakMap();
    var baseGetTag = require_baseGetTag();
    var toSource = require_toSource();
    var mapTag = "[object Map]";
    var objectTag = "[object Object]";
    var promiseTag = "[object Promise]";
    var setTag = "[object Set]";
    var weakMapTag = "[object WeakMap]";
    var dataViewTag = "[object DataView]";
    var dataViewCtorString = toSource(DataView2);
    var mapCtorString = toSource(Map2);
    var promiseCtorString = toSource(Promise2);
    var setCtorString = toSource(Set2);
    var weakMapCtorString = toSource(WeakMap);
    var getTag = baseGetTag;
    if (DataView2 && getTag(new DataView2(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
      getTag = function(value) {
        var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    module.exports = getTag;
  }
});

// node_modules/lodash/_initCloneArray.js
var require_initCloneArray = __commonJS({
  "node_modules/lodash/_initCloneArray.js"(exports, module) {
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function initCloneArray(array3) {
      var length = array3.length, result = new array3.constructor(length);
      if (length && typeof array3[0] == "string" && hasOwnProperty.call(array3, "index")) {
        result.index = array3.index;
        result.input = array3.input;
      }
      return result;
    }
    module.exports = initCloneArray;
  }
});

// node_modules/lodash/_Uint8Array.js
var require_Uint8Array = __commonJS({
  "node_modules/lodash/_Uint8Array.js"(exports, module) {
    var root2 = require_root();
    var Uint8Array = root2.Uint8Array;
    module.exports = Uint8Array;
  }
});

// node_modules/lodash/_cloneArrayBuffer.js
var require_cloneArrayBuffer = __commonJS({
  "node_modules/lodash/_cloneArrayBuffer.js"(exports, module) {
    var Uint8Array = require_Uint8Array();
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array(result).set(new Uint8Array(arrayBuffer));
      return result;
    }
    module.exports = cloneArrayBuffer;
  }
});

// node_modules/lodash/_cloneDataView.js
var require_cloneDataView = __commonJS({
  "node_modules/lodash/_cloneDataView.js"(exports, module) {
    var cloneArrayBuffer = require_cloneArrayBuffer();
    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }
    module.exports = cloneDataView;
  }
});

// node_modules/lodash/_cloneRegExp.js
var require_cloneRegExp = __commonJS({
  "node_modules/lodash/_cloneRegExp.js"(exports, module) {
    var reFlags = /\w*$/;
    function cloneRegExp(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
      result.lastIndex = regexp.lastIndex;
      return result;
    }
    module.exports = cloneRegExp;
  }
});

// node_modules/lodash/_cloneSymbol.js
var require_cloneSymbol = __commonJS({
  "node_modules/lodash/_cloneSymbol.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function cloneSymbol(symbol) {
      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }
    module.exports = cloneSymbol;
  }
});

// node_modules/lodash/_cloneTypedArray.js
var require_cloneTypedArray = __commonJS({
  "node_modules/lodash/_cloneTypedArray.js"(exports, module) {
    var cloneArrayBuffer = require_cloneArrayBuffer();
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }
    module.exports = cloneTypedArray;
  }
});

// node_modules/lodash/_initCloneByTag.js
var require_initCloneByTag = __commonJS({
  "node_modules/lodash/_initCloneByTag.js"(exports, module) {
    var cloneArrayBuffer = require_cloneArrayBuffer();
    var cloneDataView = require_cloneDataView();
    var cloneRegExp = require_cloneRegExp();
    var cloneSymbol = require_cloneSymbol();
    var cloneTypedArray = require_cloneTypedArray();
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    function initCloneByTag(object, tag, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag:
          return cloneArrayBuffer(object);
        case boolTag:
        case dateTag:
          return new Ctor(+object);
        case dataViewTag:
          return cloneDataView(object, isDeep);
        case float32Tag:
        case float64Tag:
        case int8Tag:
        case int16Tag:
        case int32Tag:
        case uint8Tag:
        case uint8ClampedTag:
        case uint16Tag:
        case uint32Tag:
          return cloneTypedArray(object, isDeep);
        case mapTag:
          return new Ctor();
        case numberTag:
        case stringTag:
          return new Ctor(object);
        case regexpTag:
          return cloneRegExp(object);
        case setTag:
          return new Ctor();
        case symbolTag:
          return cloneSymbol(object);
      }
    }
    module.exports = initCloneByTag;
  }
});

// node_modules/lodash/_baseCreate.js
var require_baseCreate = __commonJS({
  "node_modules/lodash/_baseCreate.js"(exports, module) {
    var isObject2 = require_isObject();
    var objectCreate = Object.create;
    var baseCreate = /* @__PURE__ */ function() {
      function object() {
      }
      return function(proto) {
        if (!isObject2(proto)) {
          return {};
        }
        if (objectCreate) {
          return objectCreate(proto);
        }
        object.prototype = proto;
        var result = new object();
        object.prototype = void 0;
        return result;
      };
    }();
    module.exports = baseCreate;
  }
});

// node_modules/lodash/_initCloneObject.js
var require_initCloneObject = __commonJS({
  "node_modules/lodash/_initCloneObject.js"(exports, module) {
    var baseCreate = require_baseCreate();
    var getPrototype = require_getPrototype();
    var isPrototype = require_isPrototype();
    function initCloneObject(object) {
      return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
    }
    module.exports = initCloneObject;
  }
});

// node_modules/lodash/_baseIsMap.js
var require_baseIsMap = __commonJS({
  "node_modules/lodash/_baseIsMap.js"(exports, module) {
    var getTag = require_getTag();
    var isObjectLike = require_isObjectLike();
    var mapTag = "[object Map]";
    function baseIsMap(value) {
      return isObjectLike(value) && getTag(value) == mapTag;
    }
    module.exports = baseIsMap;
  }
});

// node_modules/lodash/isMap.js
var require_isMap = __commonJS({
  "node_modules/lodash/isMap.js"(exports, module) {
    var baseIsMap = require_baseIsMap();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsMap = nodeUtil && nodeUtil.isMap;
    var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
    module.exports = isMap;
  }
});

// node_modules/lodash/_baseIsSet.js
var require_baseIsSet = __commonJS({
  "node_modules/lodash/_baseIsSet.js"(exports, module) {
    var getTag = require_getTag();
    var isObjectLike = require_isObjectLike();
    var setTag = "[object Set]";
    function baseIsSet(value) {
      return isObjectLike(value) && getTag(value) == setTag;
    }
    module.exports = baseIsSet;
  }
});

// node_modules/lodash/isSet.js
var require_isSet = __commonJS({
  "node_modules/lodash/isSet.js"(exports, module) {
    var baseIsSet = require_baseIsSet();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsSet = nodeUtil && nodeUtil.isSet;
    var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
    module.exports = isSet;
  }
});

// node_modules/lodash/_baseClone.js
var require_baseClone = __commonJS({
  "node_modules/lodash/_baseClone.js"(exports, module) {
    var Stack = require_Stack();
    var arrayEach = require_arrayEach();
    var assignValue = require_assignValue();
    var baseAssign = require_baseAssign();
    var baseAssignIn = require_baseAssignIn();
    var cloneBuffer = require_cloneBuffer();
    var copyArray = require_copyArray();
    var copySymbols = require_copySymbols();
    var copySymbolsIn = require_copySymbolsIn();
    var getAllKeys = require_getAllKeys();
    var getAllKeysIn = require_getAllKeysIn();
    var getTag = require_getTag();
    var initCloneArray = require_initCloneArray();
    var initCloneByTag = require_initCloneByTag();
    var initCloneObject = require_initCloneObject();
    var isArray = require_isArray();
    var isBuffer = require_isBuffer();
    var isMap = require_isMap();
    var isObject2 = require_isObject();
    var isSet = require_isSet();
    var keys = require_keys();
    var keysIn = require_keysIn();
    var CLONE_DEEP_FLAG = 1;
    var CLONE_FLAT_FLAG = 2;
    var CLONE_SYMBOLS_FLAG = 4;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
    function baseClone(value, bitmask, customizer, key, object, stack) {
      var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
      if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
      }
      if (result !== void 0) {
        return result;
      }
      if (!isObject2(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
        if (isBuffer(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag || isFunc && !object) {
          result = isFlat || isFunc ? {} : initCloneObject(value);
          if (!isDeep) {
            return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = initCloneByTag(value, tag, isDeep);
        }
      }
      stack || (stack = new Stack());
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);
      if (isSet(value)) {
        value.forEach(function(subValue) {
          result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
        });
      } else if (isMap(value)) {
        value.forEach(function(subValue, key2) {
          result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
        });
      }
      var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
      var props = isArr ? void 0 : keysFunc(value);
      arrayEach(props || value, function(subValue, key2) {
        if (props) {
          key2 = subValue;
          subValue = value[key2];
        }
        assignValue(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
      });
      return result;
    }
    module.exports = baseClone;
  }
});

// node_modules/lodash/clone.js
var require_clone = __commonJS({
  "node_modules/lodash/clone.js"(exports, module) {
    var baseClone = require_baseClone();
    var CLONE_SYMBOLS_FLAG = 4;
    function clone(value) {
      return baseClone(value, CLONE_SYMBOLS_FLAG);
    }
    module.exports = clone;
  }
});

// node_modules/lodash/constant.js
var require_constant = __commonJS({
  "node_modules/lodash/constant.js"(exports, module) {
    function constant2(value) {
      return function() {
        return value;
      };
    }
    module.exports = constant2;
  }
});

// node_modules/lodash/_createBaseFor.js
var require_createBaseFor = __commonJS({
  "node_modules/lodash/_createBaseFor.js"(exports, module) {
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index3 = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
        while (length--) {
          var key = props[fromRight ? length : ++index3];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }
    module.exports = createBaseFor;
  }
});

// node_modules/lodash/_baseFor.js
var require_baseFor = __commonJS({
  "node_modules/lodash/_baseFor.js"(exports, module) {
    var createBaseFor = require_createBaseFor();
    var baseFor = createBaseFor();
    module.exports = baseFor;
  }
});

// node_modules/lodash/_baseForOwn.js
var require_baseForOwn = __commonJS({
  "node_modules/lodash/_baseForOwn.js"(exports, module) {
    var baseFor = require_baseFor();
    var keys = require_keys();
    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys);
    }
    module.exports = baseForOwn;
  }
});

// node_modules/lodash/_createBaseEach.js
var require_createBaseEach = __commonJS({
  "node_modules/lodash/_createBaseEach.js"(exports, module) {
    var isArrayLike = require_isArrayLike();
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        if (collection == null) {
          return collection;
        }
        if (!isArrayLike(collection)) {
          return eachFunc(collection, iteratee);
        }
        var length = collection.length, index3 = fromRight ? length : -1, iterable = Object(collection);
        while (fromRight ? index3-- : ++index3 < length) {
          if (iteratee(iterable[index3], index3, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }
    module.exports = createBaseEach;
  }
});

// node_modules/lodash/_baseEach.js
var require_baseEach = __commonJS({
  "node_modules/lodash/_baseEach.js"(exports, module) {
    var baseForOwn = require_baseForOwn();
    var createBaseEach = require_createBaseEach();
    var baseEach = createBaseEach(baseForOwn);
    module.exports = baseEach;
  }
});

// node_modules/lodash/identity.js
var require_identity = __commonJS({
  "node_modules/lodash/identity.js"(exports, module) {
    function identity6(value) {
      return value;
    }
    module.exports = identity6;
  }
});

// node_modules/lodash/_castFunction.js
var require_castFunction = __commonJS({
  "node_modules/lodash/_castFunction.js"(exports, module) {
    var identity6 = require_identity();
    function castFunction(value) {
      return typeof value == "function" ? value : identity6;
    }
    module.exports = castFunction;
  }
});

// node_modules/lodash/forEach.js
var require_forEach = __commonJS({
  "node_modules/lodash/forEach.js"(exports, module) {
    var arrayEach = require_arrayEach();
    var baseEach = require_baseEach();
    var castFunction = require_castFunction();
    var isArray = require_isArray();
    function forEach(collection, iteratee) {
      var func = isArray(collection) ? arrayEach : baseEach;
      return func(collection, castFunction(iteratee));
    }
    module.exports = forEach;
  }
});

// node_modules/lodash/each.js
var require_each = __commonJS({
  "node_modules/lodash/each.js"(exports, module) {
    module.exports = require_forEach();
  }
});

// node_modules/lodash/_baseFilter.js
var require_baseFilter = __commonJS({
  "node_modules/lodash/_baseFilter.js"(exports, module) {
    var baseEach = require_baseEach();
    function baseFilter(collection, predicate) {
      var result = [];
      baseEach(collection, function(value, index3, collection2) {
        if (predicate(value, index3, collection2)) {
          result.push(value);
        }
      });
      return result;
    }
    module.exports = baseFilter;
  }
});

// node_modules/lodash/_setCacheAdd.js
var require_setCacheAdd = __commonJS({
  "node_modules/lodash/_setCacheAdd.js"(exports, module) {
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }
    module.exports = setCacheAdd;
  }
});

// node_modules/lodash/_setCacheHas.js
var require_setCacheHas = __commonJS({
  "node_modules/lodash/_setCacheHas.js"(exports, module) {
    function setCacheHas(value) {
      return this.__data__.has(value);
    }
    module.exports = setCacheHas;
  }
});

// node_modules/lodash/_SetCache.js
var require_SetCache = __commonJS({
  "node_modules/lodash/_SetCache.js"(exports, module) {
    var MapCache = require_MapCache();
    var setCacheAdd = require_setCacheAdd();
    var setCacheHas = require_setCacheHas();
    function SetCache(values) {
      var index3 = -1, length = values == null ? 0 : values.length;
      this.__data__ = new MapCache();
      while (++index3 < length) {
        this.add(values[index3]);
      }
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    module.exports = SetCache;
  }
});

// node_modules/lodash/_arraySome.js
var require_arraySome = __commonJS({
  "node_modules/lodash/_arraySome.js"(exports, module) {
    function arraySome(array3, predicate) {
      var index3 = -1, length = array3 == null ? 0 : array3.length;
      while (++index3 < length) {
        if (predicate(array3[index3], index3, array3)) {
          return true;
        }
      }
      return false;
    }
    module.exports = arraySome;
  }
});

// node_modules/lodash/_cacheHas.js
var require_cacheHas = __commonJS({
  "node_modules/lodash/_cacheHas.js"(exports, module) {
    function cacheHas(cache2, key) {
      return cache2.has(key);
    }
    module.exports = cacheHas;
  }
});

// node_modules/lodash/_equalArrays.js
var require_equalArrays = __commonJS({
  "node_modules/lodash/_equalArrays.js"(exports, module) {
    var SetCache = require_SetCache();
    var arraySome = require_arraySome();
    var cacheHas = require_cacheHas();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    function equalArrays(array3, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array3.length, othLength = other.length;
      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      var arrStacked = stack.get(array3);
      var othStacked = stack.get(other);
      if (arrStacked && othStacked) {
        return arrStacked == other && othStacked == array3;
      }
      var index3 = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
      stack.set(array3, other);
      stack.set(other, array3);
      while (++index3 < arrLength) {
        var arrValue = array3[index3], othValue = other[index3];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, arrValue, index3, other, array3, stack) : customizer(arrValue, othValue, index3, array3, other, stack);
        }
        if (compared !== void 0) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        if (seen) {
          if (!arraySome(other, function(othValue2, othIndex) {
            if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
            result = false;
            break;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          result = false;
          break;
        }
      }
      stack["delete"](array3);
      stack["delete"](other);
      return result;
    }
    module.exports = equalArrays;
  }
});

// node_modules/lodash/_mapToArray.js
var require_mapToArray = __commonJS({
  "node_modules/lodash/_mapToArray.js"(exports, module) {
    function mapToArray(map4) {
      var index3 = -1, result = Array(map4.size);
      map4.forEach(function(value, key) {
        result[++index3] = [key, value];
      });
      return result;
    }
    module.exports = mapToArray;
  }
});

// node_modules/lodash/_setToArray.js
var require_setToArray = __commonJS({
  "node_modules/lodash/_setToArray.js"(exports, module) {
    function setToArray(set3) {
      var index3 = -1, result = Array(set3.size);
      set3.forEach(function(value) {
        result[++index3] = value;
      });
      return result;
    }
    module.exports = setToArray;
  }
});

// node_modules/lodash/_equalByTag.js
var require_equalByTag = __commonJS({
  "node_modules/lodash/_equalByTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var Uint8Array = require_Uint8Array();
    var eq = require_eq();
    var equalArrays = require_equalArrays();
    var mapToArray = require_mapToArray();
    var setToArray = require_setToArray();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag:
          if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;
        case arrayBufferTag:
          if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
            return false;
          }
          return true;
        case boolTag:
        case dateTag:
        case numberTag:
          return eq(+object, +other);
        case errorTag:
          return object.name == other.name && object.message == other.message;
        case regexpTag:
        case stringTag:
          return object == other + "";
        case mapTag:
          var convert = mapToArray;
        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
          convert || (convert = setToArray);
          if (object.size != other.size && !isPartial) {
            return false;
          }
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG;
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack["delete"](object);
          return result;
        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }
    module.exports = equalByTag;
  }
});

// node_modules/lodash/_equalObjects.js
var require_equalObjects = __commonJS({
  "node_modules/lodash/_equalObjects.js"(exports, module) {
    var getAllKeys = require_getAllKeys();
    var COMPARE_PARTIAL_FLAG = 1;
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index3 = objLength;
      while (index3--) {
        var key = objProps[index3];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      var objStacked = stack.get(object);
      var othStacked = stack.get(other);
      if (objStacked && othStacked) {
        return objStacked == other && othStacked == object;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);
      var skipCtor = isPartial;
      while (++index3 < objLength) {
        key = objProps[index3];
        var objValue = object[key], othValue = other[key];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
        }
        if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == "constructor");
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor, othCtor = other.constructor;
        if (objCtor != othCtor && "constructor" in object && "constructor" in other && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack["delete"](object);
      stack["delete"](other);
      return result;
    }
    module.exports = equalObjects;
  }
});

// node_modules/lodash/_baseIsEqualDeep.js
var require_baseIsEqualDeep = __commonJS({
  "node_modules/lodash/_baseIsEqualDeep.js"(exports, module) {
    var Stack = require_Stack();
    var equalArrays = require_equalArrays();
    var equalByTag = require_equalByTag();
    var equalObjects = require_equalObjects();
    var getTag = require_getTag();
    var isArray = require_isArray();
    var isBuffer = require_isBuffer();
    var isTypedArray = require_isTypedArray();
    var COMPARE_PARTIAL_FLAG = 1;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var objectTag = "[object Object]";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
      objTag = objTag == argsTag ? objectTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;
      var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
      if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack());
        return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
          stack || (stack = new Stack());
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack());
      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }
    module.exports = baseIsEqualDeep;
  }
});

// node_modules/lodash/_baseIsEqual.js
var require_baseIsEqual = __commonJS({
  "node_modules/lodash/_baseIsEqual.js"(exports, module) {
    var baseIsEqualDeep = require_baseIsEqualDeep();
    var isObjectLike = require_isObjectLike();
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }
    module.exports = baseIsEqual;
  }
});

// node_modules/lodash/_baseIsMatch.js
var require_baseIsMatch = __commonJS({
  "node_modules/lodash/_baseIsMatch.js"(exports, module) {
    var Stack = require_Stack();
    var baseIsEqual = require_baseIsEqual();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    function baseIsMatch(object, source, matchData, customizer) {
      var index3 = matchData.length, length = index3, noCustomizer = !customizer;
      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (index3--) {
        var data = matchData[index3];
        if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
          return false;
        }
      }
      while (++index3 < length) {
        data = matchData[index3];
        var key = data[0], objValue = object[key], srcValue = data[1];
        if (noCustomizer && data[2]) {
          if (objValue === void 0 && !(key in object)) {
            return false;
          }
        } else {
          var stack = new Stack();
          if (customizer) {
            var result = customizer(objValue, srcValue, key, object, source, stack);
          }
          if (!(result === void 0 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
            return false;
          }
        }
      }
      return true;
    }
    module.exports = baseIsMatch;
  }
});

// node_modules/lodash/_isStrictComparable.js
var require_isStrictComparable = __commonJS({
  "node_modules/lodash/_isStrictComparable.js"(exports, module) {
    var isObject2 = require_isObject();
    function isStrictComparable(value) {
      return value === value && !isObject2(value);
    }
    module.exports = isStrictComparable;
  }
});

// node_modules/lodash/_getMatchData.js
var require_getMatchData = __commonJS({
  "node_modules/lodash/_getMatchData.js"(exports, module) {
    var isStrictComparable = require_isStrictComparable();
    var keys = require_keys();
    function getMatchData(object) {
      var result = keys(object), length = result.length;
      while (length--) {
        var key = result[length], value = object[key];
        result[length] = [key, value, isStrictComparable(value)];
      }
      return result;
    }
    module.exports = getMatchData;
  }
});

// node_modules/lodash/_matchesStrictComparable.js
var require_matchesStrictComparable = __commonJS({
  "node_modules/lodash/_matchesStrictComparable.js"(exports, module) {
    function matchesStrictComparable(key, srcValue) {
      return function(object) {
        if (object == null) {
          return false;
        }
        return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
      };
    }
    module.exports = matchesStrictComparable;
  }
});

// node_modules/lodash/_baseMatches.js
var require_baseMatches = __commonJS({
  "node_modules/lodash/_baseMatches.js"(exports, module) {
    var baseIsMatch = require_baseIsMatch();
    var getMatchData = require_getMatchData();
    var matchesStrictComparable = require_matchesStrictComparable();
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }
      return function(object) {
        return object === source || baseIsMatch(object, source, matchData);
      };
    }
    module.exports = baseMatches;
  }
});

// node_modules/lodash/isSymbol.js
var require_isSymbol = __commonJS({
  "node_modules/lodash/isSymbol.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
    }
    module.exports = isSymbol;
  }
});

// node_modules/lodash/_isKey.js
var require_isKey = __commonJS({
  "node_modules/lodash/_isKey.js"(exports, module) {
    var isArray = require_isArray();
    var isSymbol = require_isSymbol();
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
    var reIsPlainProp = /^\w*$/;
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
    }
    module.exports = isKey;
  }
});

// node_modules/lodash/memoize.js
var require_memoize = __commonJS({
  "node_modules/lodash/memoize.js"(exports, module) {
    var MapCache = require_MapCache();
    var FUNC_ERROR_TEXT = "Expected a function";
    function memoize(func, resolver) {
      if (typeof func != "function" || resolver != null && typeof resolver != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache2 = memoized.cache;
        if (cache2.has(key)) {
          return cache2.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache2.set(key, result) || cache2;
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache)();
      return memoized;
    }
    memoize.Cache = MapCache;
    module.exports = memoize;
  }
});

// node_modules/lodash/_memoizeCapped.js
var require_memoizeCapped = __commonJS({
  "node_modules/lodash/_memoizeCapped.js"(exports, module) {
    var memoize = require_memoize();
    var MAX_MEMOIZE_SIZE = 500;
    function memoizeCapped(func) {
      var result = memoize(func, function(key) {
        if (cache2.size === MAX_MEMOIZE_SIZE) {
          cache2.clear();
        }
        return key;
      });
      var cache2 = result.cache;
      return result;
    }
    module.exports = memoizeCapped;
  }
});

// node_modules/lodash/_stringToPath.js
var require_stringToPath = __commonJS({
  "node_modules/lodash/_stringToPath.js"(exports, module) {
    var memoizeCapped = require_memoizeCapped();
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = memoizeCapped(function(string) {
      var result = [];
      if (string.charCodeAt(0) === 46) {
        result.push("");
      }
      string.replace(rePropName, function(match, number3, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, "$1") : number3 || match);
      });
      return result;
    });
    module.exports = stringToPath;
  }
});

// node_modules/lodash/_arrayMap.js
var require_arrayMap = __commonJS({
  "node_modules/lodash/_arrayMap.js"(exports, module) {
    function arrayMap(array3, iteratee) {
      var index3 = -1, length = array3 == null ? 0 : array3.length, result = Array(length);
      while (++index3 < length) {
        result[index3] = iteratee(array3[index3], index3, array3);
      }
      return result;
    }
    module.exports = arrayMap;
  }
});

// node_modules/lodash/_baseToString.js
var require_baseToString = __commonJS({
  "node_modules/lodash/_baseToString.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var arrayMap = require_arrayMap();
    var isArray = require_isArray();
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolToString = symbolProto ? symbolProto.toString : void 0;
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isArray(value)) {
        return arrayMap(value, baseToString) + "";
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module.exports = baseToString;
  }
});

// node_modules/lodash/toString.js
var require_toString = __commonJS({
  "node_modules/lodash/toString.js"(exports, module) {
    var baseToString = require_baseToString();
    function toString2(value) {
      return value == null ? "" : baseToString(value);
    }
    module.exports = toString2;
  }
});

// node_modules/lodash/_castPath.js
var require_castPath = __commonJS({
  "node_modules/lodash/_castPath.js"(exports, module) {
    var isArray = require_isArray();
    var isKey = require_isKey();
    var stringToPath = require_stringToPath();
    var toString2 = require_toString();
    function castPath(value, object) {
      if (isArray(value)) {
        return value;
      }
      return isKey(value, object) ? [value] : stringToPath(toString2(value));
    }
    module.exports = castPath;
  }
});

// node_modules/lodash/_toKey.js
var require_toKey = __commonJS({
  "node_modules/lodash/_toKey.js"(exports, module) {
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    function toKey(value) {
      if (typeof value == "string" || isSymbol(value)) {
        return value;
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module.exports = toKey;
  }
});

// node_modules/lodash/_baseGet.js
var require_baseGet = __commonJS({
  "node_modules/lodash/_baseGet.js"(exports, module) {
    var castPath = require_castPath();
    var toKey = require_toKey();
    function baseGet(object, path) {
      path = castPath(path, object);
      var index3 = 0, length = path.length;
      while (object != null && index3 < length) {
        object = object[toKey(path[index3++])];
      }
      return index3 && index3 == length ? object : void 0;
    }
    module.exports = baseGet;
  }
});

// node_modules/lodash/get.js
var require_get = __commonJS({
  "node_modules/lodash/get.js"(exports, module) {
    var baseGet = require_baseGet();
    function get3(object, path, defaultValue) {
      var result = object == null ? void 0 : baseGet(object, path);
      return result === void 0 ? defaultValue : result;
    }
    module.exports = get3;
  }
});

// node_modules/lodash/_baseHasIn.js
var require_baseHasIn = __commonJS({
  "node_modules/lodash/_baseHasIn.js"(exports, module) {
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }
    module.exports = baseHasIn;
  }
});

// node_modules/lodash/_hasPath.js
var require_hasPath = __commonJS({
  "node_modules/lodash/_hasPath.js"(exports, module) {
    var castPath = require_castPath();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isIndex = require_isIndex();
    var isLength = require_isLength();
    var toKey = require_toKey();
    function hasPath(object, path, hasFunc) {
      path = castPath(path, object);
      var index3 = -1, length = path.length, result = false;
      while (++index3 < length) {
        var key = toKey(path[index3]);
        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }
        object = object[key];
      }
      if (result || ++index3 != length) {
        return result;
      }
      length = object == null ? 0 : object.length;
      return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
    }
    module.exports = hasPath;
  }
});

// node_modules/lodash/hasIn.js
var require_hasIn = __commonJS({
  "node_modules/lodash/hasIn.js"(exports, module) {
    var baseHasIn = require_baseHasIn();
    var hasPath = require_hasPath();
    function hasIn(object, path) {
      return object != null && hasPath(object, path, baseHasIn);
    }
    module.exports = hasIn;
  }
});

// node_modules/lodash/_baseMatchesProperty.js
var require_baseMatchesProperty = __commonJS({
  "node_modules/lodash/_baseMatchesProperty.js"(exports, module) {
    var baseIsEqual = require_baseIsEqual();
    var get3 = require_get();
    var hasIn = require_hasIn();
    var isKey = require_isKey();
    var isStrictComparable = require_isStrictComparable();
    var matchesStrictComparable = require_matchesStrictComparable();
    var toKey = require_toKey();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    function baseMatchesProperty(path, srcValue) {
      if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
      }
      return function(object) {
        var objValue = get3(object, path);
        return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
      };
    }
    module.exports = baseMatchesProperty;
  }
});

// node_modules/lodash/_baseProperty.js
var require_baseProperty = __commonJS({
  "node_modules/lodash/_baseProperty.js"(exports, module) {
    function baseProperty(key) {
      return function(object) {
        return object == null ? void 0 : object[key];
      };
    }
    module.exports = baseProperty;
  }
});

// node_modules/lodash/_basePropertyDeep.js
var require_basePropertyDeep = __commonJS({
  "node_modules/lodash/_basePropertyDeep.js"(exports, module) {
    var baseGet = require_baseGet();
    function basePropertyDeep(path) {
      return function(object) {
        return baseGet(object, path);
      };
    }
    module.exports = basePropertyDeep;
  }
});

// node_modules/lodash/property.js
var require_property = __commonJS({
  "node_modules/lodash/property.js"(exports, module) {
    var baseProperty = require_baseProperty();
    var basePropertyDeep = require_basePropertyDeep();
    var isKey = require_isKey();
    var toKey = require_toKey();
    function property(path) {
      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
    }
    module.exports = property;
  }
});

// node_modules/lodash/_baseIteratee.js
var require_baseIteratee = __commonJS({
  "node_modules/lodash/_baseIteratee.js"(exports, module) {
    var baseMatches = require_baseMatches();
    var baseMatchesProperty = require_baseMatchesProperty();
    var identity6 = require_identity();
    var isArray = require_isArray();
    var property = require_property();
    function baseIteratee(value) {
      if (typeof value == "function") {
        return value;
      }
      if (value == null) {
        return identity6;
      }
      if (typeof value == "object") {
        return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
      }
      return property(value);
    }
    module.exports = baseIteratee;
  }
});

// node_modules/lodash/filter.js
var require_filter = __commonJS({
  "node_modules/lodash/filter.js"(exports, module) {
    var arrayFilter = require_arrayFilter();
    var baseFilter = require_baseFilter();
    var baseIteratee = require_baseIteratee();
    var isArray = require_isArray();
    function filter3(collection, predicate) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      return func(collection, baseIteratee(predicate, 3));
    }
    module.exports = filter3;
  }
});

// node_modules/lodash/_baseHas.js
var require_baseHas = __commonJS({
  "node_modules/lodash/_baseHas.js"(exports, module) {
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseHas(object, key) {
      return object != null && hasOwnProperty.call(object, key);
    }
    module.exports = baseHas;
  }
});

// node_modules/lodash/has.js
var require_has = __commonJS({
  "node_modules/lodash/has.js"(exports, module) {
    var baseHas = require_baseHas();
    var hasPath = require_hasPath();
    function has(object, path) {
      return object != null && hasPath(object, path, baseHas);
    }
    module.exports = has;
  }
});

// node_modules/lodash/isEmpty.js
var require_isEmpty = __commonJS({
  "node_modules/lodash/isEmpty.js"(exports, module) {
    var baseKeys = require_baseKeys();
    var getTag = require_getTag();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isArrayLike = require_isArrayLike();
    var isBuffer = require_isBuffer();
    var isPrototype = require_isPrototype();
    var isTypedArray = require_isTypedArray();
    var mapTag = "[object Map]";
    var setTag = "[object Set]";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function isEmpty(value) {
      if (value == null) {
        return true;
      }
      if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
        return !value.length;
      }
      var tag = getTag(value);
      if (tag == mapTag || tag == setTag) {
        return !value.size;
      }
      if (isPrototype(value)) {
        return !baseKeys(value).length;
      }
      for (var key in value) {
        if (hasOwnProperty.call(value, key)) {
          return false;
        }
      }
      return true;
    }
    module.exports = isEmpty;
  }
});

// node_modules/lodash/isUndefined.js
var require_isUndefined = __commonJS({
  "node_modules/lodash/isUndefined.js"(exports, module) {
    function isUndefined2(value) {
      return value === void 0;
    }
    module.exports = isUndefined2;
  }
});

// node_modules/lodash/_baseMap.js
var require_baseMap = __commonJS({
  "node_modules/lodash/_baseMap.js"(exports, module) {
    var baseEach = require_baseEach();
    var isArrayLike = require_isArrayLike();
    function baseMap(collection, iteratee) {
      var index3 = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
      baseEach(collection, function(value, key, collection2) {
        result[++index3] = iteratee(value, key, collection2);
      });
      return result;
    }
    module.exports = baseMap;
  }
});

// node_modules/lodash/map.js
var require_map = __commonJS({
  "node_modules/lodash/map.js"(exports, module) {
    var arrayMap = require_arrayMap();
    var baseIteratee = require_baseIteratee();
    var baseMap = require_baseMap();
    var isArray = require_isArray();
    function map4(collection, iteratee) {
      var func = isArray(collection) ? arrayMap : baseMap;
      return func(collection, baseIteratee(iteratee, 3));
    }
    module.exports = map4;
  }
});

// node_modules/lodash/_arrayReduce.js
var require_arrayReduce = __commonJS({
  "node_modules/lodash/_arrayReduce.js"(exports, module) {
    function arrayReduce(array3, iteratee, accumulator, initAccum) {
      var index3 = -1, length = array3 == null ? 0 : array3.length;
      if (initAccum && length) {
        accumulator = array3[++index3];
      }
      while (++index3 < length) {
        accumulator = iteratee(accumulator, array3[index3], index3, array3);
      }
      return accumulator;
    }
    module.exports = arrayReduce;
  }
});

// node_modules/lodash/_baseReduce.js
var require_baseReduce = __commonJS({
  "node_modules/lodash/_baseReduce.js"(exports, module) {
    function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
      eachFunc(collection, function(value, index3, collection2) {
        accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index3, collection2);
      });
      return accumulator;
    }
    module.exports = baseReduce;
  }
});

// node_modules/lodash/reduce.js
var require_reduce = __commonJS({
  "node_modules/lodash/reduce.js"(exports, module) {
    var arrayReduce = require_arrayReduce();
    var baseEach = require_baseEach();
    var baseIteratee = require_baseIteratee();
    var baseReduce = require_baseReduce();
    var isArray = require_isArray();
    function reduce2(collection, iteratee, accumulator) {
      var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
      return func(collection, baseIteratee(iteratee, 4), accumulator, initAccum, baseEach);
    }
    module.exports = reduce2;
  }
});

// node_modules/lodash/isString.js
var require_isString = __commonJS({
  "node_modules/lodash/isString.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isArray = require_isArray();
    var isObjectLike = require_isObjectLike();
    var stringTag = "[object String]";
    function isString(value) {
      return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
    }
    module.exports = isString;
  }
});

// node_modules/lodash/_asciiSize.js
var require_asciiSize = __commonJS({
  "node_modules/lodash/_asciiSize.js"(exports, module) {
    var baseProperty = require_baseProperty();
    var asciiSize = baseProperty("length");
    module.exports = asciiSize;
  }
});

// node_modules/lodash/_hasUnicode.js
var require_hasUnicode = __commonJS({
  "node_modules/lodash/_hasUnicode.js"(exports, module) {
    var rsAstralRange = "\\ud800-\\udfff";
    var rsComboMarksRange = "\\u0300-\\u036f";
    var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
    var rsComboSymbolsRange = "\\u20d0-\\u20ff";
    var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
    var rsVarRange = "\\ufe0e\\ufe0f";
    var rsZWJ = "\\u200d";
    var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
    function hasUnicode(string) {
      return reHasUnicode.test(string);
    }
    module.exports = hasUnicode;
  }
});

// node_modules/lodash/_unicodeSize.js
var require_unicodeSize = __commonJS({
  "node_modules/lodash/_unicodeSize.js"(exports, module) {
    var rsAstralRange = "\\ud800-\\udfff";
    var rsComboMarksRange = "\\u0300-\\u036f";
    var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
    var rsComboSymbolsRange = "\\u20d0-\\u20ff";
    var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
    var rsVarRange = "\\ufe0e\\ufe0f";
    var rsAstral = "[" + rsAstralRange + "]";
    var rsCombo = "[" + rsComboRange + "]";
    var rsFitz = "\\ud83c[\\udffb-\\udfff]";
    var rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
    var rsNonAstral = "[^" + rsAstralRange + "]";
    var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
    var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
    var rsZWJ = "\\u200d";
    var reOptMod = rsModifier + "?";
    var rsOptVar = "[" + rsVarRange + "]?";
    var rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*";
    var rsSeq = rsOptVar + reOptMod + rsOptJoin;
    var rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
    var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
    function unicodeSize(string) {
      var result = reUnicode.lastIndex = 0;
      while (reUnicode.test(string)) {
        ++result;
      }
      return result;
    }
    module.exports = unicodeSize;
  }
});

// node_modules/lodash/_stringSize.js
var require_stringSize = __commonJS({
  "node_modules/lodash/_stringSize.js"(exports, module) {
    var asciiSize = require_asciiSize();
    var hasUnicode = require_hasUnicode();
    var unicodeSize = require_unicodeSize();
    function stringSize(string) {
      return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
    }
    module.exports = stringSize;
  }
});

// node_modules/lodash/size.js
var require_size = __commonJS({
  "node_modules/lodash/size.js"(exports, module) {
    var baseKeys = require_baseKeys();
    var getTag = require_getTag();
    var isArrayLike = require_isArrayLike();
    var isString = require_isString();
    var stringSize = require_stringSize();
    var mapTag = "[object Map]";
    var setTag = "[object Set]";
    function size(collection) {
      if (collection == null) {
        return 0;
      }
      if (isArrayLike(collection)) {
        return isString(collection) ? stringSize(collection) : collection.length;
      }
      var tag = getTag(collection);
      if (tag == mapTag || tag == setTag) {
        return collection.size;
      }
      return baseKeys(collection).length;
    }
    module.exports = size;
  }
});

// node_modules/lodash/transform.js
var require_transform = __commonJS({
  "node_modules/lodash/transform.js"(exports, module) {
    var arrayEach = require_arrayEach();
    var baseCreate = require_baseCreate();
    var baseForOwn = require_baseForOwn();
    var baseIteratee = require_baseIteratee();
    var getPrototype = require_getPrototype();
    var isArray = require_isArray();
    var isBuffer = require_isBuffer();
    var isFunction = require_isFunction();
    var isObject2 = require_isObject();
    var isTypedArray = require_isTypedArray();
    function transform2(object, iteratee, accumulator) {
      var isArr = isArray(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
      iteratee = baseIteratee(iteratee, 4);
      if (accumulator == null) {
        var Ctor = object && object.constructor;
        if (isArrLike) {
          accumulator = isArr ? new Ctor() : [];
        } else if (isObject2(object)) {
          accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
        } else {
          accumulator = {};
        }
      }
      (isArrLike ? arrayEach : baseForOwn)(object, function(value, index3, object2) {
        return iteratee(accumulator, value, index3, object2);
      });
      return accumulator;
    }
    module.exports = transform2;
  }
});

// node_modules/lodash/_isFlattenable.js
var require_isFlattenable = __commonJS({
  "node_modules/lodash/_isFlattenable.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : void 0;
    function isFlattenable(value) {
      return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
    }
    module.exports = isFlattenable;
  }
});

// node_modules/lodash/_baseFlatten.js
var require_baseFlatten = __commonJS({
  "node_modules/lodash/_baseFlatten.js"(exports, module) {
    var arrayPush = require_arrayPush();
    var isFlattenable = require_isFlattenable();
    function baseFlatten(array3, depth, predicate, isStrict, result) {
      var index3 = -1, length = array3.length;
      predicate || (predicate = isFlattenable);
      result || (result = []);
      while (++index3 < length) {
        var value = array3[index3];
        if (depth > 0 && predicate(value)) {
          if (depth > 1) {
            baseFlatten(value, depth - 1, predicate, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }
    module.exports = baseFlatten;
  }
});

// node_modules/lodash/_apply.js
var require_apply = __commonJS({
  "node_modules/lodash/_apply.js"(exports, module) {
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);
        case 1:
          return func.call(thisArg, args[0]);
        case 2:
          return func.call(thisArg, args[0], args[1]);
        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }
    module.exports = apply;
  }
});

// node_modules/lodash/_overRest.js
var require_overRest = __commonJS({
  "node_modules/lodash/_overRest.js"(exports, module) {
    var apply = require_apply();
    var nativeMax = Math.max;
    function overRest(func, start2, transform2) {
      start2 = nativeMax(start2 === void 0 ? func.length - 1 : start2, 0);
      return function() {
        var args = arguments, index3 = -1, length = nativeMax(args.length - start2, 0), array3 = Array(length);
        while (++index3 < length) {
          array3[index3] = args[start2 + index3];
        }
        index3 = -1;
        var otherArgs = Array(start2 + 1);
        while (++index3 < start2) {
          otherArgs[index3] = args[index3];
        }
        otherArgs[start2] = transform2(array3);
        return apply(func, this, otherArgs);
      };
    }
    module.exports = overRest;
  }
});

// node_modules/lodash/_baseSetToString.js
var require_baseSetToString = __commonJS({
  "node_modules/lodash/_baseSetToString.js"(exports, module) {
    var constant2 = require_constant();
    var defineProperty = require_defineProperty();
    var identity6 = require_identity();
    var baseSetToString = !defineProperty ? identity6 : function(func, string) {
      return defineProperty(func, "toString", {
        "configurable": true,
        "enumerable": false,
        "value": constant2(string),
        "writable": true
      });
    };
    module.exports = baseSetToString;
  }
});

// node_modules/lodash/_shortOut.js
var require_shortOut = __commonJS({
  "node_modules/lodash/_shortOut.js"(exports, module) {
    var HOT_COUNT = 800;
    var HOT_SPAN = 16;
    var nativeNow = Date.now;
    function shortOut(func) {
      var count2 = 0, lastCalled = 0;
      return function() {
        var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
        lastCalled = stamp;
        if (remaining > 0) {
          if (++count2 >= HOT_COUNT) {
            return arguments[0];
          }
        } else {
          count2 = 0;
        }
        return func.apply(void 0, arguments);
      };
    }
    module.exports = shortOut;
  }
});

// node_modules/lodash/_setToString.js
var require_setToString = __commonJS({
  "node_modules/lodash/_setToString.js"(exports, module) {
    var baseSetToString = require_baseSetToString();
    var shortOut = require_shortOut();
    var setToString = shortOut(baseSetToString);
    module.exports = setToString;
  }
});

// node_modules/lodash/_baseRest.js
var require_baseRest = __commonJS({
  "node_modules/lodash/_baseRest.js"(exports, module) {
    var identity6 = require_identity();
    var overRest = require_overRest();
    var setToString = require_setToString();
    function baseRest(func, start2) {
      return setToString(overRest(func, start2, identity6), func + "");
    }
    module.exports = baseRest;
  }
});

// node_modules/lodash/_baseFindIndex.js
var require_baseFindIndex = __commonJS({
  "node_modules/lodash/_baseFindIndex.js"(exports, module) {
    function baseFindIndex(array3, predicate, fromIndex, fromRight) {
      var length = array3.length, index3 = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index3-- : ++index3 < length) {
        if (predicate(array3[index3], index3, array3)) {
          return index3;
        }
      }
      return -1;
    }
    module.exports = baseFindIndex;
  }
});

// node_modules/lodash/_baseIsNaN.js
var require_baseIsNaN = __commonJS({
  "node_modules/lodash/_baseIsNaN.js"(exports, module) {
    function baseIsNaN(value) {
      return value !== value;
    }
    module.exports = baseIsNaN;
  }
});

// node_modules/lodash/_strictIndexOf.js
var require_strictIndexOf = __commonJS({
  "node_modules/lodash/_strictIndexOf.js"(exports, module) {
    function strictIndexOf(array3, value, fromIndex) {
      var index3 = fromIndex - 1, length = array3.length;
      while (++index3 < length) {
        if (array3[index3] === value) {
          return index3;
        }
      }
      return -1;
    }
    module.exports = strictIndexOf;
  }
});

// node_modules/lodash/_baseIndexOf.js
var require_baseIndexOf = __commonJS({
  "node_modules/lodash/_baseIndexOf.js"(exports, module) {
    var baseFindIndex = require_baseFindIndex();
    var baseIsNaN = require_baseIsNaN();
    var strictIndexOf = require_strictIndexOf();
    function baseIndexOf(array3, value, fromIndex) {
      return value === value ? strictIndexOf(array3, value, fromIndex) : baseFindIndex(array3, baseIsNaN, fromIndex);
    }
    module.exports = baseIndexOf;
  }
});

// node_modules/lodash/_arrayIncludes.js
var require_arrayIncludes = __commonJS({
  "node_modules/lodash/_arrayIncludes.js"(exports, module) {
    var baseIndexOf = require_baseIndexOf();
    function arrayIncludes(array3, value) {
      var length = array3 == null ? 0 : array3.length;
      return !!length && baseIndexOf(array3, value, 0) > -1;
    }
    module.exports = arrayIncludes;
  }
});

// node_modules/lodash/_arrayIncludesWith.js
var require_arrayIncludesWith = __commonJS({
  "node_modules/lodash/_arrayIncludesWith.js"(exports, module) {
    function arrayIncludesWith(array3, value, comparator) {
      var index3 = -1, length = array3 == null ? 0 : array3.length;
      while (++index3 < length) {
        if (comparator(value, array3[index3])) {
          return true;
        }
      }
      return false;
    }
    module.exports = arrayIncludesWith;
  }
});

// node_modules/lodash/noop.js
var require_noop = __commonJS({
  "node_modules/lodash/noop.js"(exports, module) {
    function noop2() {
    }
    module.exports = noop2;
  }
});

// node_modules/lodash/_createSet.js
var require_createSet = __commonJS({
  "node_modules/lodash/_createSet.js"(exports, module) {
    var Set2 = require_Set();
    var noop2 = require_noop();
    var setToArray = require_setToArray();
    var INFINITY = 1 / 0;
    var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop2 : function(values) {
      return new Set2(values);
    };
    module.exports = createSet;
  }
});

// node_modules/lodash/_baseUniq.js
var require_baseUniq = __commonJS({
  "node_modules/lodash/_baseUniq.js"(exports, module) {
    var SetCache = require_SetCache();
    var arrayIncludes = require_arrayIncludes();
    var arrayIncludesWith = require_arrayIncludesWith();
    var cacheHas = require_cacheHas();
    var createSet = require_createSet();
    var setToArray = require_setToArray();
    var LARGE_ARRAY_SIZE = 200;
    function baseUniq(array3, iteratee, comparator) {
      var index3 = -1, includes = arrayIncludes, length = array3.length, isCommon = true, result = [], seen = result;
      if (comparator) {
        isCommon = false;
        includes = arrayIncludesWith;
      } else if (length >= LARGE_ARRAY_SIZE) {
        var set3 = iteratee ? null : createSet(array3);
        if (set3) {
          return setToArray(set3);
        }
        isCommon = false;
        includes = cacheHas;
        seen = new SetCache();
      } else {
        seen = iteratee ? [] : result;
      }
      outer: while (++index3 < length) {
        var value = array3[index3], computed = iteratee ? iteratee(value) : value;
        value = comparator || value !== 0 ? value : 0;
        if (isCommon && computed === computed) {
          var seenIndex = seen.length;
          while (seenIndex--) {
            if (seen[seenIndex] === computed) {
              continue outer;
            }
          }
          if (iteratee) {
            seen.push(computed);
          }
          result.push(value);
        } else if (!includes(seen, computed, comparator)) {
          if (seen !== result) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      return result;
    }
    module.exports = baseUniq;
  }
});

// node_modules/lodash/isArrayLikeObject.js
var require_isArrayLikeObject = __commonJS({
  "node_modules/lodash/isArrayLikeObject.js"(exports, module) {
    var isArrayLike = require_isArrayLike();
    var isObjectLike = require_isObjectLike();
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    module.exports = isArrayLikeObject;
  }
});

// node_modules/lodash/union.js
var require_union = __commonJS({
  "node_modules/lodash/union.js"(exports, module) {
    var baseFlatten = require_baseFlatten();
    var baseRest = require_baseRest();
    var baseUniq = require_baseUniq();
    var isArrayLikeObject = require_isArrayLikeObject();
    var union2 = baseRest(function(arrays) {
      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
    });
    module.exports = union2;
  }
});

// node_modules/lodash/_baseValues.js
var require_baseValues = __commonJS({
  "node_modules/lodash/_baseValues.js"(exports, module) {
    var arrayMap = require_arrayMap();
    function baseValues(object, props) {
      return arrayMap(props, function(key) {
        return object[key];
      });
    }
    module.exports = baseValues;
  }
});

// node_modules/lodash/values.js
var require_values = __commonJS({
  "node_modules/lodash/values.js"(exports, module) {
    var baseValues = require_baseValues();
    var keys = require_keys();
    function values(object) {
      return object == null ? [] : baseValues(object, keys(object));
    }
    module.exports = values;
  }
});

// node_modules/graphlib/lib/lodash.js
var require_lodash = __commonJS({
  "node_modules/graphlib/lib/lodash.js"(exports, module) {
    var lodash;
    if (typeof __require === "function") {
      try {
        lodash = {
          clone: require_clone(),
          constant: require_constant(),
          each: require_each(),
          filter: require_filter(),
          has: require_has(),
          isArray: require_isArray(),
          isEmpty: require_isEmpty(),
          isFunction: require_isFunction(),
          isUndefined: require_isUndefined(),
          keys: require_keys(),
          map: require_map(),
          reduce: require_reduce(),
          size: require_size(),
          transform: require_transform(),
          union: require_union(),
          values: require_values()
        };
      } catch (e) {
      }
    }
    if (!lodash) {
      lodash = window._;
    }
    module.exports = lodash;
  }
});

// node_modules/graphlib/lib/graph.js
var require_graph = __commonJS({
  "node_modules/graphlib/lib/graph.js"(exports, module) {
    "use strict";
    var _ = require_lodash();
    module.exports = Graph;
    var DEFAULT_EDGE_NAME2 = "\0";
    var GRAPH_NODE = "\0";
    var EDGE_KEY_DELIM2 = "";
    function Graph(opts) {
      this._isDirected = _.has(opts, "directed") ? opts.directed : true;
      this._isMultigraph = _.has(opts, "multigraph") ? opts.multigraph : false;
      this._isCompound = _.has(opts, "compound") ? opts.compound : false;
      this._label = void 0;
      this._defaultNodeLabelFn = _.constant(void 0);
      this._defaultEdgeLabelFn = _.constant(void 0);
      this._nodes = {};
      if (this._isCompound) {
        this._parent = {};
        this._children = {};
        this._children[GRAPH_NODE] = {};
      }
      this._in = {};
      this._preds = {};
      this._out = {};
      this._sucs = {};
      this._edgeObjs = {};
      this._edgeLabels = {};
    }
    Graph.prototype._nodeCount = 0;
    Graph.prototype._edgeCount = 0;
    Graph.prototype.isDirected = function() {
      return this._isDirected;
    };
    Graph.prototype.isMultigraph = function() {
      return this._isMultigraph;
    };
    Graph.prototype.isCompound = function() {
      return this._isCompound;
    };
    Graph.prototype.setGraph = function(label) {
      this._label = label;
      return this;
    };
    Graph.prototype.graph = function() {
      return this._label;
    };
    Graph.prototype.setDefaultNodeLabel = function(newDefault) {
      if (!_.isFunction(newDefault)) {
        newDefault = _.constant(newDefault);
      }
      this._defaultNodeLabelFn = newDefault;
      return this;
    };
    Graph.prototype.nodeCount = function() {
      return this._nodeCount;
    };
    Graph.prototype.nodes = function() {
      return _.keys(this._nodes);
    };
    Graph.prototype.sources = function() {
      var self2 = this;
      return _.filter(this.nodes(), function(v) {
        return _.isEmpty(self2._in[v]);
      });
    };
    Graph.prototype.sinks = function() {
      var self2 = this;
      return _.filter(this.nodes(), function(v) {
        return _.isEmpty(self2._out[v]);
      });
    };
    Graph.prototype.setNodes = function(vs, value) {
      var args = arguments;
      var self2 = this;
      _.each(vs, function(v) {
        if (args.length > 1) {
          self2.setNode(v, value);
        } else {
          self2.setNode(v);
        }
      });
      return this;
    };
    Graph.prototype.setNode = function(v, value) {
      if (_.has(this._nodes, v)) {
        if (arguments.length > 1) {
          this._nodes[v] = value;
        }
        return this;
      }
      this._nodes[v] = arguments.length > 1 ? value : this._defaultNodeLabelFn(v);
      if (this._isCompound) {
        this._parent[v] = GRAPH_NODE;
        this._children[v] = {};
        this._children[GRAPH_NODE][v] = true;
      }
      this._in[v] = {};
      this._preds[v] = {};
      this._out[v] = {};
      this._sucs[v] = {};
      ++this._nodeCount;
      return this;
    };
    Graph.prototype.node = function(v) {
      return this._nodes[v];
    };
    Graph.prototype.hasNode = function(v) {
      return _.has(this._nodes, v);
    };
    Graph.prototype.removeNode = function(v) {
      var self2 = this;
      if (_.has(this._nodes, v)) {
        var removeEdge = function(e) {
          self2.removeEdge(self2._edgeObjs[e]);
        };
        delete this._nodes[v];
        if (this._isCompound) {
          this._removeFromParentsChildList(v);
          delete this._parent[v];
          _.each(this.children(v), function(child) {
            self2.setParent(child);
          });
          delete this._children[v];
        }
        _.each(_.keys(this._in[v]), removeEdge);
        delete this._in[v];
        delete this._preds[v];
        _.each(_.keys(this._out[v]), removeEdge);
        delete this._out[v];
        delete this._sucs[v];
        --this._nodeCount;
      }
      return this;
    };
    Graph.prototype.setParent = function(v, parent) {
      if (!this._isCompound) {
        throw new Error("Cannot set parent in a non-compound graph");
      }
      if (_.isUndefined(parent)) {
        parent = GRAPH_NODE;
      } else {
        parent += "";
        for (var ancestor = parent; !_.isUndefined(ancestor); ancestor = this.parent(ancestor)) {
          if (ancestor === v) {
            throw new Error("Setting " + parent + " as parent of " + v + " would create a cycle");
          }
        }
        this.setNode(parent);
      }
      this.setNode(v);
      this._removeFromParentsChildList(v);
      this._parent[v] = parent;
      this._children[parent][v] = true;
      return this;
    };
    Graph.prototype._removeFromParentsChildList = function(v) {
      delete this._children[this._parent[v]][v];
    };
    Graph.prototype.parent = function(v) {
      if (this._isCompound) {
        var parent = this._parent[v];
        if (parent !== GRAPH_NODE) {
          return parent;
        }
      }
    };
    Graph.prototype.children = function(v) {
      if (_.isUndefined(v)) {
        v = GRAPH_NODE;
      }
      if (this._isCompound) {
        var children2 = this._children[v];
        if (children2) {
          return _.keys(children2);
        }
      } else if (v === GRAPH_NODE) {
        return this.nodes();
      } else if (this.hasNode(v)) {
        return [];
      }
    };
    Graph.prototype.predecessors = function(v) {
      var predsV = this._preds[v];
      if (predsV) {
        return _.keys(predsV);
      }
    };
    Graph.prototype.successors = function(v) {
      var sucsV = this._sucs[v];
      if (sucsV) {
        return _.keys(sucsV);
      }
    };
    Graph.prototype.neighbors = function(v) {
      var preds = this.predecessors(v);
      if (preds) {
        return _.union(preds, this.successors(v));
      }
    };
    Graph.prototype.isLeaf = function(v) {
      var neighbors;
      if (this.isDirected()) {
        neighbors = this.successors(v);
      } else {
        neighbors = this.neighbors(v);
      }
      return neighbors.length === 0;
    };
    Graph.prototype.filterNodes = function(filter3) {
      var copy3 = new this.constructor({
        directed: this._isDirected,
        multigraph: this._isMultigraph,
        compound: this._isCompound
      });
      copy3.setGraph(this.graph());
      var self2 = this;
      _.each(this._nodes, function(value, v) {
        if (filter3(v)) {
          copy3.setNode(v, value);
        }
      });
      _.each(this._edgeObjs, function(e) {
        if (copy3.hasNode(e.v) && copy3.hasNode(e.w)) {
          copy3.setEdge(e, self2.edge(e));
        }
      });
      var parents = {};
      function findParent(v) {
        var parent = self2.parent(v);
        if (parent === void 0 || copy3.hasNode(parent)) {
          parents[v] = parent;
          return parent;
        } else if (parent in parents) {
          return parents[parent];
        } else {
          return findParent(parent);
        }
      }
      if (this._isCompound) {
        _.each(copy3.nodes(), function(v) {
          copy3.setParent(v, findParent(v));
        });
      }
      return copy3;
    };
    Graph.prototype.setDefaultEdgeLabel = function(newDefault) {
      if (!_.isFunction(newDefault)) {
        newDefault = _.constant(newDefault);
      }
      this._defaultEdgeLabelFn = newDefault;
      return this;
    };
    Graph.prototype.edgeCount = function() {
      return this._edgeCount;
    };
    Graph.prototype.edges = function() {
      return _.values(this._edgeObjs);
    };
    Graph.prototype.setPath = function(vs, value) {
      var self2 = this;
      var args = arguments;
      _.reduce(vs, function(v, w) {
        if (args.length > 1) {
          self2.setEdge(v, w, value);
        } else {
          self2.setEdge(v, w);
        }
        return w;
      });
      return this;
    };
    Graph.prototype.setEdge = function() {
      var v, w, name, value;
      var valueSpecified = false;
      var arg0 = arguments[0];
      if (typeof arg0 === "object" && arg0 !== null && "v" in arg0) {
        v = arg0.v;
        w = arg0.w;
        name = arg0.name;
        if (arguments.length === 2) {
          value = arguments[1];
          valueSpecified = true;
        }
      } else {
        v = arg0;
        w = arguments[1];
        name = arguments[3];
        if (arguments.length > 2) {
          value = arguments[2];
          valueSpecified = true;
        }
      }
      v = "" + v;
      w = "" + w;
      if (!_.isUndefined(name)) {
        name = "" + name;
      }
      var e = edgeArgsToId(this._isDirected, v, w, name);
      if (_.has(this._edgeLabels, e)) {
        if (valueSpecified) {
          this._edgeLabels[e] = value;
        }
        return this;
      }
      if (!_.isUndefined(name) && !this._isMultigraph) {
        throw new Error("Cannot set a named edge when isMultigraph = false");
      }
      this.setNode(v);
      this.setNode(w);
      this._edgeLabels[e] = valueSpecified ? value : this._defaultEdgeLabelFn(v, w, name);
      var edgeObj = edgeArgsToObj(this._isDirected, v, w, name);
      v = edgeObj.v;
      w = edgeObj.w;
      Object.freeze(edgeObj);
      this._edgeObjs[e] = edgeObj;
      incrementOrInitEntry(this._preds[w], v);
      incrementOrInitEntry(this._sucs[v], w);
      this._in[w][e] = edgeObj;
      this._out[v][e] = edgeObj;
      this._edgeCount++;
      return this;
    };
    Graph.prototype.edge = function(v, w, name) {
      var e = arguments.length === 1 ? edgeObjToId(this._isDirected, arguments[0]) : edgeArgsToId(this._isDirected, v, w, name);
      return this._edgeLabels[e];
    };
    Graph.prototype.hasEdge = function(v, w, name) {
      var e = arguments.length === 1 ? edgeObjToId(this._isDirected, arguments[0]) : edgeArgsToId(this._isDirected, v, w, name);
      return _.has(this._edgeLabels, e);
    };
    Graph.prototype.removeEdge = function(v, w, name) {
      var e = arguments.length === 1 ? edgeObjToId(this._isDirected, arguments[0]) : edgeArgsToId(this._isDirected, v, w, name);
      var edge = this._edgeObjs[e];
      if (edge) {
        v = edge.v;
        w = edge.w;
        delete this._edgeLabels[e];
        delete this._edgeObjs[e];
        decrementOrRemoveEntry(this._preds[w], v);
        decrementOrRemoveEntry(this._sucs[v], w);
        delete this._in[w][e];
        delete this._out[v][e];
        this._edgeCount--;
      }
      return this;
    };
    Graph.prototype.inEdges = function(v, u) {
      var inV = this._in[v];
      if (inV) {
        var edges = _.values(inV);
        if (!u) {
          return edges;
        }
        return _.filter(edges, function(edge) {
          return edge.v === u;
        });
      }
    };
    Graph.prototype.outEdges = function(v, w) {
      var outV = this._out[v];
      if (outV) {
        var edges = _.values(outV);
        if (!w) {
          return edges;
        }
        return _.filter(edges, function(edge) {
          return edge.w === w;
        });
      }
    };
    Graph.prototype.nodeEdges = function(v, w) {
      var inEdges = this.inEdges(v, w);
      if (inEdges) {
        return inEdges.concat(this.outEdges(v, w));
      }
    };
    function incrementOrInitEntry(map4, k) {
      if (map4[k]) {
        map4[k]++;
      } else {
        map4[k] = 1;
      }
    }
    function decrementOrRemoveEntry(map4, k) {
      if (!--map4[k]) {
        delete map4[k];
      }
    }
    function edgeArgsToId(isDirected, v_, w_, name) {
      var v = "" + v_;
      var w = "" + w_;
      if (!isDirected && v > w) {
        var tmp = v;
        v = w;
        w = tmp;
      }
      return v + EDGE_KEY_DELIM2 + w + EDGE_KEY_DELIM2 + (_.isUndefined(name) ? DEFAULT_EDGE_NAME2 : name);
    }
    function edgeArgsToObj(isDirected, v_, w_, name) {
      var v = "" + v_;
      var w = "" + w_;
      if (!isDirected && v > w) {
        var tmp = v;
        v = w;
        w = tmp;
      }
      var edgeObj = {
        v,
        w
      };
      if (name) {
        edgeObj.name = name;
      }
      return edgeObj;
    }
    function edgeObjToId(isDirected, edgeObj) {
      return edgeArgsToId(isDirected, edgeObj.v, edgeObj.w, edgeObj.name);
    }
  }
});

// node_modules/graphlib/lib/version.js
var require_version = __commonJS({
  "node_modules/graphlib/lib/version.js"(exports, module) {
    module.exports = "2.1.8";
  }
});

// node_modules/graphlib/lib/index.js
var require_lib = __commonJS({
  "node_modules/graphlib/lib/index.js"(exports, module) {
    module.exports = {
      Graph: require_graph(),
      version: require_version()
    };
  }
});

// node_modules/graphlib/lib/json.js
var require_json = __commonJS({
  "node_modules/graphlib/lib/json.js"(exports, module) {
    var _ = require_lodash();
    var Graph = require_graph();
    module.exports = {
      write,
      read
    };
    function write(g) {
      var json = {
        options: {
          directed: g.isDirected(),
          multigraph: g.isMultigraph(),
          compound: g.isCompound()
        },
        nodes: writeNodes(g),
        edges: writeEdges(g)
      };
      if (!_.isUndefined(g.graph())) {
        json.value = _.clone(g.graph());
      }
      return json;
    }
    function writeNodes(g) {
      return _.map(g.nodes(), function(v) {
        var nodeValue = g.node(v);
        var parent = g.parent(v);
        var node = {
          v
        };
        if (!_.isUndefined(nodeValue)) {
          node.value = nodeValue;
        }
        if (!_.isUndefined(parent)) {
          node.parent = parent;
        }
        return node;
      });
    }
    function writeEdges(g) {
      return _.map(g.edges(), function(e) {
        var edgeValue = g.edge(e);
        var edge = {
          v: e.v,
          w: e.w
        };
        if (!_.isUndefined(e.name)) {
          edge.name = e.name;
        }
        if (!_.isUndefined(edgeValue)) {
          edge.value = edgeValue;
        }
        return edge;
      });
    }
    function read(json) {
      var g = new Graph(json.options).setGraph(json.value);
      _.each(json.nodes, function(entry) {
        g.setNode(entry.v, entry.value);
        if (entry.parent) {
          g.setParent(entry.v, entry.parent);
        }
      });
      _.each(json.edges, function(entry) {
        g.setEdge({
          v: entry.v,
          w: entry.w,
          name: entry.name
        }, entry.value);
      });
      return g;
    }
  }
});

// node_modules/graphlib/lib/alg/components.js
var require_components = __commonJS({
  "node_modules/graphlib/lib/alg/components.js"(exports, module) {
    var _ = require_lodash();
    module.exports = components;
    function components(g) {
      var visited = {};
      var cmpts = [];
      var cmpt;
      function dfs(v) {
        if (_.has(visited, v)) return;
        visited[v] = true;
        cmpt.push(v);
        _.each(g.successors(v), dfs);
        _.each(g.predecessors(v), dfs);
      }
      _.each(g.nodes(), function(v) {
        cmpt = [];
        dfs(v);
        if (cmpt.length) {
          cmpts.push(cmpt);
        }
      });
      return cmpts;
    }
  }
});

// node_modules/graphlib/lib/data/priority-queue.js
var require_priority_queue = __commonJS({
  "node_modules/graphlib/lib/data/priority-queue.js"(exports, module) {
    var _ = require_lodash();
    module.exports = PriorityQueue;
    function PriorityQueue() {
      this._arr = [];
      this._keyIndices = {};
    }
    PriorityQueue.prototype.size = function() {
      return this._arr.length;
    };
    PriorityQueue.prototype.keys = function() {
      return this._arr.map(function(x3) {
        return x3.key;
      });
    };
    PriorityQueue.prototype.has = function(key) {
      return _.has(this._keyIndices, key);
    };
    PriorityQueue.prototype.priority = function(key) {
      var index3 = this._keyIndices[key];
      if (index3 !== void 0) {
        return this._arr[index3].priority;
      }
    };
    PriorityQueue.prototype.min = function() {
      if (this.size() === 0) {
        throw new Error("Queue underflow");
      }
      return this._arr[0].key;
    };
    PriorityQueue.prototype.add = function(key, priority) {
      var keyIndices = this._keyIndices;
      key = String(key);
      if (!_.has(keyIndices, key)) {
        var arr = this._arr;
        var index3 = arr.length;
        keyIndices[key] = index3;
        arr.push({
          key,
          priority
        });
        this._decrease(index3);
        return true;
      }
      return false;
    };
    PriorityQueue.prototype.removeMin = function() {
      this._swap(0, this._arr.length - 1);
      var min2 = this._arr.pop();
      delete this._keyIndices[min2.key];
      this._heapify(0);
      return min2.key;
    };
    PriorityQueue.prototype.decrease = function(key, priority) {
      var index3 = this._keyIndices[key];
      if (priority > this._arr[index3].priority) {
        throw new Error("New priority is greater than current priority. Key: " + key + " Old: " + this._arr[index3].priority + " New: " + priority);
      }
      this._arr[index3].priority = priority;
      this._decrease(index3);
    };
    PriorityQueue.prototype._heapify = function(i) {
      var arr = this._arr;
      var l = 2 * i;
      var r = l + 1;
      var largest = i;
      if (l < arr.length) {
        largest = arr[l].priority < arr[largest].priority ? l : largest;
        if (r < arr.length) {
          largest = arr[r].priority < arr[largest].priority ? r : largest;
        }
        if (largest !== i) {
          this._swap(i, largest);
          this._heapify(largest);
        }
      }
    };
    PriorityQueue.prototype._decrease = function(index3) {
      var arr = this._arr;
      var priority = arr[index3].priority;
      var parent;
      while (index3 !== 0) {
        parent = index3 >> 1;
        if (arr[parent].priority < priority) {
          break;
        }
        this._swap(index3, parent);
        index3 = parent;
      }
    };
    PriorityQueue.prototype._swap = function(i, j) {
      var arr = this._arr;
      var keyIndices = this._keyIndices;
      var origArrI = arr[i];
      var origArrJ = arr[j];
      arr[i] = origArrJ;
      arr[j] = origArrI;
      keyIndices[origArrJ.key] = i;
      keyIndices[origArrI.key] = j;
    };
  }
});

// node_modules/graphlib/lib/alg/dijkstra.js
var require_dijkstra = __commonJS({
  "node_modules/graphlib/lib/alg/dijkstra.js"(exports, module) {
    var _ = require_lodash();
    var PriorityQueue = require_priority_queue();
    module.exports = dijkstra;
    var DEFAULT_WEIGHT_FUNC = _.constant(1);
    function dijkstra(g, source, weightFn, edgeFn) {
      return runDijkstra(g, String(source), weightFn || DEFAULT_WEIGHT_FUNC, edgeFn || function(v) {
        return g.outEdges(v);
      });
    }
    function runDijkstra(g, source, weightFn, edgeFn) {
      var results = {};
      var pq = new PriorityQueue();
      var v, vEntry;
      var updateNeighbors = function(edge) {
        var w = edge.v !== v ? edge.v : edge.w;
        var wEntry = results[w];
        var weight = weightFn(edge);
        var distance = vEntry.distance + weight;
        if (weight < 0) {
          throw new Error("dijkstra does not allow negative edge weights. Bad edge: " + edge + " Weight: " + weight);
        }
        if (distance < wEntry.distance) {
          wEntry.distance = distance;
          wEntry.predecessor = v;
          pq.decrease(w, distance);
        }
      };
      g.nodes().forEach(function(v2) {
        var distance = v2 === source ? 0 : Number.POSITIVE_INFINITY;
        results[v2] = {
          distance
        };
        pq.add(v2, distance);
      });
      while (pq.size() > 0) {
        v = pq.removeMin();
        vEntry = results[v];
        if (vEntry.distance === Number.POSITIVE_INFINITY) {
          break;
        }
        edgeFn(v).forEach(updateNeighbors);
      }
      return results;
    }
  }
});

// node_modules/graphlib/lib/alg/dijkstra-all.js
var require_dijkstra_all = __commonJS({
  "node_modules/graphlib/lib/alg/dijkstra-all.js"(exports, module) {
    var dijkstra = require_dijkstra();
    var _ = require_lodash();
    module.exports = dijkstraAll;
    function dijkstraAll(g, weightFunc, edgeFunc) {
      return _.transform(g.nodes(), function(acc, v) {
        acc[v] = dijkstra(g, v, weightFunc, edgeFunc);
      }, {});
    }
  }
});

// node_modules/graphlib/lib/alg/tarjan.js
var require_tarjan = __commonJS({
  "node_modules/graphlib/lib/alg/tarjan.js"(exports, module) {
    var _ = require_lodash();
    module.exports = tarjan;
    function tarjan(g) {
      var index3 = 0;
      var stack = [];
      var visited = {};
      var results = [];
      function dfs(v) {
        var entry = visited[v] = {
          onStack: true,
          lowlink: index3,
          index: index3++
        };
        stack.push(v);
        g.successors(v).forEach(function(w2) {
          if (!_.has(visited, w2)) {
            dfs(w2);
            entry.lowlink = Math.min(entry.lowlink, visited[w2].lowlink);
          } else if (visited[w2].onStack) {
            entry.lowlink = Math.min(entry.lowlink, visited[w2].index);
          }
        });
        if (entry.lowlink === entry.index) {
          var cmpt = [];
          var w;
          do {
            w = stack.pop();
            visited[w].onStack = false;
            cmpt.push(w);
          } while (v !== w);
          results.push(cmpt);
        }
      }
      g.nodes().forEach(function(v) {
        if (!_.has(visited, v)) {
          dfs(v);
        }
      });
      return results;
    }
  }
});

// node_modules/graphlib/lib/alg/find-cycles.js
var require_find_cycles = __commonJS({
  "node_modules/graphlib/lib/alg/find-cycles.js"(exports, module) {
    var _ = require_lodash();
    var tarjan = require_tarjan();
    module.exports = findCycles;
    function findCycles(g) {
      return _.filter(tarjan(g), function(cmpt) {
        return cmpt.length > 1 || cmpt.length === 1 && g.hasEdge(cmpt[0], cmpt[0]);
      });
    }
  }
});

// node_modules/graphlib/lib/alg/floyd-warshall.js
var require_floyd_warshall = __commonJS({
  "node_modules/graphlib/lib/alg/floyd-warshall.js"(exports, module) {
    var _ = require_lodash();
    module.exports = floydWarshall;
    var DEFAULT_WEIGHT_FUNC = _.constant(1);
    function floydWarshall(g, weightFn, edgeFn) {
      return runFloydWarshall(g, weightFn || DEFAULT_WEIGHT_FUNC, edgeFn || function(v) {
        return g.outEdges(v);
      });
    }
    function runFloydWarshall(g, weightFn, edgeFn) {
      var results = {};
      var nodes = g.nodes();
      nodes.forEach(function(v) {
        results[v] = {};
        results[v][v] = {
          distance: 0
        };
        nodes.forEach(function(w) {
          if (v !== w) {
            results[v][w] = {
              distance: Number.POSITIVE_INFINITY
            };
          }
        });
        edgeFn(v).forEach(function(edge) {
          var w = edge.v === v ? edge.w : edge.v;
          var d = weightFn(edge);
          results[v][w] = {
            distance: d,
            predecessor: v
          };
        });
      });
      nodes.forEach(function(k) {
        var rowK = results[k];
        nodes.forEach(function(i) {
          var rowI = results[i];
          nodes.forEach(function(j) {
            var ik = rowI[k];
            var kj = rowK[j];
            var ij = rowI[j];
            var altDistance = ik.distance + kj.distance;
            if (altDistance < ij.distance) {
              ij.distance = altDistance;
              ij.predecessor = kj.predecessor;
            }
          });
        });
      });
      return results;
    }
  }
});

// node_modules/graphlib/lib/alg/topsort.js
var require_topsort = __commonJS({
  "node_modules/graphlib/lib/alg/topsort.js"(exports, module) {
    var _ = require_lodash();
    module.exports = topsort;
    topsort.CycleException = CycleException;
    function topsort(g) {
      var visited = {};
      var stack = {};
      var results = [];
      function visit(node) {
        if (_.has(stack, node)) {
          throw new CycleException();
        }
        if (!_.has(visited, node)) {
          stack[node] = true;
          visited[node] = true;
          _.each(g.predecessors(node), visit);
          delete stack[node];
          results.push(node);
        }
      }
      _.each(g.sinks(), visit);
      if (_.size(visited) !== g.nodeCount()) {
        throw new CycleException();
      }
      return results;
    }
    function CycleException() {
    }
    CycleException.prototype = new Error();
  }
});

// node_modules/graphlib/lib/alg/is-acyclic.js
var require_is_acyclic = __commonJS({
  "node_modules/graphlib/lib/alg/is-acyclic.js"(exports, module) {
    var topsort = require_topsort();
    module.exports = isAcyclic;
    function isAcyclic(g) {
      try {
        topsort(g);
      } catch (e) {
        if (e instanceof topsort.CycleException) {
          return false;
        }
        throw e;
      }
      return true;
    }
  }
});

// node_modules/graphlib/lib/alg/dfs.js
var require_dfs = __commonJS({
  "node_modules/graphlib/lib/alg/dfs.js"(exports, module) {
    var _ = require_lodash();
    module.exports = dfs;
    function dfs(g, vs, order) {
      if (!_.isArray(vs)) {
        vs = [vs];
      }
      var navigation = (g.isDirected() ? g.successors : g.neighbors).bind(g);
      var acc = [];
      var visited = {};
      _.each(vs, function(v) {
        if (!g.hasNode(v)) {
          throw new Error("Graph does not have node: " + v);
        }
        doDfs(g, v, order === "post", visited, navigation, acc);
      });
      return acc;
    }
    function doDfs(g, v, postorder, visited, navigation, acc) {
      if (!_.has(visited, v)) {
        visited[v] = true;
        if (!postorder) {
          acc.push(v);
        }
        _.each(navigation(v), function(w) {
          doDfs(g, w, postorder, visited, navigation, acc);
        });
        if (postorder) {
          acc.push(v);
        }
      }
    }
  }
});

// node_modules/graphlib/lib/alg/postorder.js
var require_postorder = __commonJS({
  "node_modules/graphlib/lib/alg/postorder.js"(exports, module) {
    var dfs = require_dfs();
    module.exports = postorder;
    function postorder(g, vs) {
      return dfs(g, vs, "post");
    }
  }
});

// node_modules/graphlib/lib/alg/preorder.js
var require_preorder = __commonJS({
  "node_modules/graphlib/lib/alg/preorder.js"(exports, module) {
    var dfs = require_dfs();
    module.exports = preorder;
    function preorder(g, vs) {
      return dfs(g, vs, "pre");
    }
  }
});

// node_modules/graphlib/lib/alg/prim.js
var require_prim = __commonJS({
  "node_modules/graphlib/lib/alg/prim.js"(exports, module) {
    var _ = require_lodash();
    var Graph = require_graph();
    var PriorityQueue = require_priority_queue();
    module.exports = prim;
    function prim(g, weightFunc) {
      var result = new Graph();
      var parents = {};
      var pq = new PriorityQueue();
      var v;
      function updateNeighbors(edge) {
        var w = edge.v === v ? edge.w : edge.v;
        var pri = pq.priority(w);
        if (pri !== void 0) {
          var edgeWeight = weightFunc(edge);
          if (edgeWeight < pri) {
            parents[w] = v;
            pq.decrease(w, edgeWeight);
          }
        }
      }
      if (g.nodeCount() === 0) {
        return result;
      }
      _.each(g.nodes(), function(v2) {
        pq.add(v2, Number.POSITIVE_INFINITY);
        result.setNode(v2);
      });
      pq.decrease(g.nodes()[0], 0);
      var init2 = false;
      while (pq.size() > 0) {
        v = pq.removeMin();
        if (_.has(parents, v)) {
          result.setEdge(v, parents[v]);
        } else if (init2) {
          throw new Error("Input graph is not connected: " + g);
        } else {
          init2 = true;
        }
        g.nodeEdges(v).forEach(updateNeighbors);
      }
      return result;
    }
  }
});

// node_modules/graphlib/lib/alg/index.js
var require_alg = __commonJS({
  "node_modules/graphlib/lib/alg/index.js"(exports, module) {
    module.exports = {
      components: require_components(),
      dijkstra: require_dijkstra(),
      dijkstraAll: require_dijkstra_all(),
      findCycles: require_find_cycles(),
      floydWarshall: require_floyd_warshall(),
      isAcyclic: require_is_acyclic(),
      postorder: require_postorder(),
      preorder: require_preorder(),
      prim: require_prim(),
      tarjan: require_tarjan(),
      topsort: require_topsort()
    };
  }
});

// node_modules/graphlib/index.js
var require_graphlib = __commonJS({
  "node_modules/graphlib/index.js"(exports, module) {
    var lib = require_lib();
    module.exports = {
      Graph: lib.Graph,
      json: require_json(),
      alg: require_alg(),
      version: lib.version
    };
  }
});

// node_modules/dagre/lib/graphlib.js
var require_graphlib2 = __commonJS({
  "node_modules/dagre/lib/graphlib.js"(exports, module) {
    var graphlib2;
    if (typeof __require === "function") {
      try {
        graphlib2 = require_graphlib();
      } catch (e) {
      }
    }
    if (!graphlib2) {
      graphlib2 = window.graphlib;
    }
    module.exports = graphlib2;
  }
});

// node_modules/lodash/cloneDeep.js
var require_cloneDeep = __commonJS({
  "node_modules/lodash/cloneDeep.js"(exports, module) {
    var baseClone = require_baseClone();
    var CLONE_DEEP_FLAG = 1;
    var CLONE_SYMBOLS_FLAG = 4;
    function cloneDeep(value) {
      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
    }
    module.exports = cloneDeep;
  }
});

// node_modules/lodash/_isIterateeCall.js
var require_isIterateeCall = __commonJS({
  "node_modules/lodash/_isIterateeCall.js"(exports, module) {
    var eq = require_eq();
    var isArrayLike = require_isArrayLike();
    var isIndex = require_isIndex();
    var isObject2 = require_isObject();
    function isIterateeCall(value, index3, object) {
      if (!isObject2(object)) {
        return false;
      }
      var type = typeof index3;
      if (type == "number" ? isArrayLike(object) && isIndex(index3, object.length) : type == "string" && index3 in object) {
        return eq(object[index3], value);
      }
      return false;
    }
    module.exports = isIterateeCall;
  }
});

// node_modules/lodash/defaults.js
var require_defaults = __commonJS({
  "node_modules/lodash/defaults.js"(exports, module) {
    var baseRest = require_baseRest();
    var eq = require_eq();
    var isIterateeCall = require_isIterateeCall();
    var keysIn = require_keysIn();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var defaults = baseRest(function(object, sources) {
      object = Object(object);
      var index3 = -1;
      var length = sources.length;
      var guard = length > 2 ? sources[2] : void 0;
      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        length = 1;
      }
      while (++index3 < length) {
        var source = sources[index3];
        var props = keysIn(source);
        var propsIndex = -1;
        var propsLength = props.length;
        while (++propsIndex < propsLength) {
          var key = props[propsIndex];
          var value = object[key];
          if (value === void 0 || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
            object[key] = source[key];
          }
        }
      }
      return object;
    });
    module.exports = defaults;
  }
});

// node_modules/lodash/_createFind.js
var require_createFind = __commonJS({
  "node_modules/lodash/_createFind.js"(exports, module) {
    var baseIteratee = require_baseIteratee();
    var isArrayLike = require_isArrayLike();
    var keys = require_keys();
    function createFind(findIndexFunc) {
      return function(collection, predicate, fromIndex) {
        var iterable = Object(collection);
        if (!isArrayLike(collection)) {
          var iteratee = baseIteratee(predicate, 3);
          collection = keys(collection);
          predicate = function(key) {
            return iteratee(iterable[key], key, iterable);
          };
        }
        var index3 = findIndexFunc(collection, predicate, fromIndex);
        return index3 > -1 ? iterable[iteratee ? collection[index3] : index3] : void 0;
      };
    }
    module.exports = createFind;
  }
});

// node_modules/lodash/_trimmedEndIndex.js
var require_trimmedEndIndex = __commonJS({
  "node_modules/lodash/_trimmedEndIndex.js"(exports, module) {
    var reWhitespace = /\s/;
    function trimmedEndIndex(string) {
      var index3 = string.length;
      while (index3-- && reWhitespace.test(string.charAt(index3))) {
      }
      return index3;
    }
    module.exports = trimmedEndIndex;
  }
});

// node_modules/lodash/_baseTrim.js
var require_baseTrim = __commonJS({
  "node_modules/lodash/_baseTrim.js"(exports, module) {
    var trimmedEndIndex = require_trimmedEndIndex();
    var reTrimStart = /^\s+/;
    function baseTrim(string) {
      return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
    }
    module.exports = baseTrim;
  }
});

// node_modules/lodash/toNumber.js
var require_toNumber = __commonJS({
  "node_modules/lodash/toNumber.js"(exports, module) {
    var baseTrim = require_baseTrim();
    var isObject2 = require_isObject();
    var isSymbol = require_isSymbol();
    var NAN = 0 / 0;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject2(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject2(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = baseTrim(value);
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module.exports = toNumber;
  }
});

// node_modules/lodash/toFinite.js
var require_toFinite = __commonJS({
  "node_modules/lodash/toFinite.js"(exports, module) {
    var toNumber = require_toNumber();
    var INFINITY = 1 / 0;
    var MAX_INTEGER = 17976931348623157e292;
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }
    module.exports = toFinite;
  }
});

// node_modules/lodash/toInteger.js
var require_toInteger = __commonJS({
  "node_modules/lodash/toInteger.js"(exports, module) {
    var toFinite = require_toFinite();
    function toInteger(value) {
      var result = toFinite(value), remainder = result % 1;
      return result === result ? remainder ? result - remainder : result : 0;
    }
    module.exports = toInteger;
  }
});

// node_modules/lodash/findIndex.js
var require_findIndex = __commonJS({
  "node_modules/lodash/findIndex.js"(exports, module) {
    var baseFindIndex = require_baseFindIndex();
    var baseIteratee = require_baseIteratee();
    var toInteger = require_toInteger();
    var nativeMax = Math.max;
    function findIndex(array3, predicate, fromIndex) {
      var length = array3 == null ? 0 : array3.length;
      if (!length) {
        return -1;
      }
      var index3 = fromIndex == null ? 0 : toInteger(fromIndex);
      if (index3 < 0) {
        index3 = nativeMax(length + index3, 0);
      }
      return baseFindIndex(array3, baseIteratee(predicate, 3), index3);
    }
    module.exports = findIndex;
  }
});

// node_modules/lodash/find.js
var require_find = __commonJS({
  "node_modules/lodash/find.js"(exports, module) {
    var createFind = require_createFind();
    var findIndex = require_findIndex();
    var find3 = createFind(findIndex);
    module.exports = find3;
  }
});

// node_modules/lodash/flatten.js
var require_flatten = __commonJS({
  "node_modules/lodash/flatten.js"(exports, module) {
    var baseFlatten = require_baseFlatten();
    function flatten(array3) {
      var length = array3 == null ? 0 : array3.length;
      return length ? baseFlatten(array3, 1) : [];
    }
    module.exports = flatten;
  }
});

// node_modules/lodash/forIn.js
var require_forIn = __commonJS({
  "node_modules/lodash/forIn.js"(exports, module) {
    var baseFor = require_baseFor();
    var castFunction = require_castFunction();
    var keysIn = require_keysIn();
    function forIn(object, iteratee) {
      return object == null ? object : baseFor(object, castFunction(iteratee), keysIn);
    }
    module.exports = forIn;
  }
});

// node_modules/lodash/last.js
var require_last = __commonJS({
  "node_modules/lodash/last.js"(exports, module) {
    function last(array3) {
      var length = array3 == null ? 0 : array3.length;
      return length ? array3[length - 1] : void 0;
    }
    module.exports = last;
  }
});

// node_modules/lodash/mapValues.js
var require_mapValues = __commonJS({
  "node_modules/lodash/mapValues.js"(exports, module) {
    var baseAssignValue = require_baseAssignValue();
    var baseForOwn = require_baseForOwn();
    var baseIteratee = require_baseIteratee();
    function mapValues(object, iteratee) {
      var result = {};
      iteratee = baseIteratee(iteratee, 3);
      baseForOwn(object, function(value, key, object2) {
        baseAssignValue(result, key, iteratee(value, key, object2));
      });
      return result;
    }
    module.exports = mapValues;
  }
});

// node_modules/lodash/_baseExtremum.js
var require_baseExtremum = __commonJS({
  "node_modules/lodash/_baseExtremum.js"(exports, module) {
    var isSymbol = require_isSymbol();
    function baseExtremum(array3, iteratee, comparator) {
      var index3 = -1, length = array3.length;
      while (++index3 < length) {
        var value = array3[index3], current = iteratee(value);
        if (current != null && (computed === void 0 ? current === current && !isSymbol(current) : comparator(current, computed))) {
          var computed = current, result = value;
        }
      }
      return result;
    }
    module.exports = baseExtremum;
  }
});

// node_modules/lodash/_baseGt.js
var require_baseGt = __commonJS({
  "node_modules/lodash/_baseGt.js"(exports, module) {
    function baseGt(value, other) {
      return value > other;
    }
    module.exports = baseGt;
  }
});

// node_modules/lodash/max.js
var require_max = __commonJS({
  "node_modules/lodash/max.js"(exports, module) {
    var baseExtremum = require_baseExtremum();
    var baseGt = require_baseGt();
    var identity6 = require_identity();
    function max2(array3) {
      return array3 && array3.length ? baseExtremum(array3, identity6, baseGt) : void 0;
    }
    module.exports = max2;
  }
});

// node_modules/lodash/_assignMergeValue.js
var require_assignMergeValue = __commonJS({
  "node_modules/lodash/_assignMergeValue.js"(exports, module) {
    var baseAssignValue = require_baseAssignValue();
    var eq = require_eq();
    function assignMergeValue(object, key, value) {
      if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
        baseAssignValue(object, key, value);
      }
    }
    module.exports = assignMergeValue;
  }
});

// node_modules/lodash/isPlainObject.js
var require_isPlainObject = __commonJS({
  "node_modules/lodash/isPlainObject.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var getPrototype = require_getPrototype();
    var isObjectLike = require_isObjectLike();
    var objectTag = "[object Object]";
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectCtorString = funcToString.call(Object);
    function isPlainObject(value) {
      if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
      return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
    }
    module.exports = isPlainObject;
  }
});

// node_modules/lodash/_safeGet.js
var require_safeGet = __commonJS({
  "node_modules/lodash/_safeGet.js"(exports, module) {
    function safeGet(object, key) {
      if (key === "constructor" && typeof object[key] === "function") {
        return;
      }
      if (key == "__proto__") {
        return;
      }
      return object[key];
    }
    module.exports = safeGet;
  }
});

// node_modules/lodash/toPlainObject.js
var require_toPlainObject = __commonJS({
  "node_modules/lodash/toPlainObject.js"(exports, module) {
    var copyObject = require_copyObject();
    var keysIn = require_keysIn();
    function toPlainObject(value) {
      return copyObject(value, keysIn(value));
    }
    module.exports = toPlainObject;
  }
});

// node_modules/lodash/_baseMergeDeep.js
var require_baseMergeDeep = __commonJS({
  "node_modules/lodash/_baseMergeDeep.js"(exports, module) {
    var assignMergeValue = require_assignMergeValue();
    var cloneBuffer = require_cloneBuffer();
    var cloneTypedArray = require_cloneTypedArray();
    var copyArray = require_copyArray();
    var initCloneObject = require_initCloneObject();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isArrayLikeObject = require_isArrayLikeObject();
    var isBuffer = require_isBuffer();
    var isFunction = require_isFunction();
    var isObject2 = require_isObject();
    var isPlainObject = require_isPlainObject();
    var isTypedArray = require_isTypedArray();
    var safeGet = require_safeGet();
    var toPlainObject = require_toPlainObject();
    function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
      var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
      if (stacked) {
        assignMergeValue(object, key, stacked);
        return;
      }
      var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
      var isCommon = newValue === void 0;
      if (isCommon) {
        var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
        newValue = srcValue;
        if (isArr || isBuff || isTyped) {
          if (isArray(objValue)) {
            newValue = objValue;
          } else if (isArrayLikeObject(objValue)) {
            newValue = copyArray(objValue);
          } else if (isBuff) {
            isCommon = false;
            newValue = cloneBuffer(srcValue, true);
          } else if (isTyped) {
            isCommon = false;
            newValue = cloneTypedArray(srcValue, true);
          } else {
            newValue = [];
          }
        } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
          newValue = objValue;
          if (isArguments(objValue)) {
            newValue = toPlainObject(objValue);
          } else if (!isObject2(objValue) || isFunction(objValue)) {
            newValue = initCloneObject(srcValue);
          }
        } else {
          isCommon = false;
        }
      }
      if (isCommon) {
        stack.set(srcValue, newValue);
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
        stack["delete"](srcValue);
      }
      assignMergeValue(object, key, newValue);
    }
    module.exports = baseMergeDeep;
  }
});

// node_modules/lodash/_baseMerge.js
var require_baseMerge = __commonJS({
  "node_modules/lodash/_baseMerge.js"(exports, module) {
    var Stack = require_Stack();
    var assignMergeValue = require_assignMergeValue();
    var baseFor = require_baseFor();
    var baseMergeDeep = require_baseMergeDeep();
    var isObject2 = require_isObject();
    var keysIn = require_keysIn();
    var safeGet = require_safeGet();
    function baseMerge(object, source, srcIndex, customizer, stack) {
      if (object === source) {
        return;
      }
      baseFor(source, function(srcValue, key) {
        stack || (stack = new Stack());
        if (isObject2(srcValue)) {
          baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
        } else {
          var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
          if (newValue === void 0) {
            newValue = srcValue;
          }
          assignMergeValue(object, key, newValue);
        }
      }, keysIn);
    }
    module.exports = baseMerge;
  }
});

// node_modules/lodash/_createAssigner.js
var require_createAssigner = __commonJS({
  "node_modules/lodash/_createAssigner.js"(exports, module) {
    var baseRest = require_baseRest();
    var isIterateeCall = require_isIterateeCall();
    function createAssigner(assigner) {
      return baseRest(function(object, sources) {
        var index3 = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
        customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? void 0 : customizer;
          length = 1;
        }
        object = Object(object);
        while (++index3 < length) {
          var source = sources[index3];
          if (source) {
            assigner(object, source, index3, customizer);
          }
        }
        return object;
      });
    }
    module.exports = createAssigner;
  }
});

// node_modules/lodash/merge.js
var require_merge = __commonJS({
  "node_modules/lodash/merge.js"(exports, module) {
    var baseMerge = require_baseMerge();
    var createAssigner = require_createAssigner();
    var merge2 = createAssigner(function(object, source, srcIndex) {
      baseMerge(object, source, srcIndex);
    });
    module.exports = merge2;
  }
});

// node_modules/lodash/_baseLt.js
var require_baseLt = __commonJS({
  "node_modules/lodash/_baseLt.js"(exports, module) {
    function baseLt(value, other) {
      return value < other;
    }
    module.exports = baseLt;
  }
});

// node_modules/lodash/min.js
var require_min = __commonJS({
  "node_modules/lodash/min.js"(exports, module) {
    var baseExtremum = require_baseExtremum();
    var baseLt = require_baseLt();
    var identity6 = require_identity();
    function min2(array3) {
      return array3 && array3.length ? baseExtremum(array3, identity6, baseLt) : void 0;
    }
    module.exports = min2;
  }
});

// node_modules/lodash/minBy.js
var require_minBy = __commonJS({
  "node_modules/lodash/minBy.js"(exports, module) {
    var baseExtremum = require_baseExtremum();
    var baseIteratee = require_baseIteratee();
    var baseLt = require_baseLt();
    function minBy(array3, iteratee) {
      return array3 && array3.length ? baseExtremum(array3, baseIteratee(iteratee, 2), baseLt) : void 0;
    }
    module.exports = minBy;
  }
});

// node_modules/lodash/now.js
var require_now = __commonJS({
  "node_modules/lodash/now.js"(exports, module) {
    var root2 = require_root();
    var now2 = function() {
      return root2.Date.now();
    };
    module.exports = now2;
  }
});

// node_modules/lodash/_baseSet.js
var require_baseSet = __commonJS({
  "node_modules/lodash/_baseSet.js"(exports, module) {
    var assignValue = require_assignValue();
    var castPath = require_castPath();
    var isIndex = require_isIndex();
    var isObject2 = require_isObject();
    var toKey = require_toKey();
    function baseSet(object, path, value, customizer) {
      if (!isObject2(object)) {
        return object;
      }
      path = castPath(path, object);
      var index3 = -1, length = path.length, lastIndex = length - 1, nested = object;
      while (nested != null && ++index3 < length) {
        var key = toKey(path[index3]), newValue = value;
        if (key === "__proto__" || key === "constructor" || key === "prototype") {
          return object;
        }
        if (index3 != lastIndex) {
          var objValue = nested[key];
          newValue = customizer ? customizer(objValue, key, nested) : void 0;
          if (newValue === void 0) {
            newValue = isObject2(objValue) ? objValue : isIndex(path[index3 + 1]) ? [] : {};
          }
        }
        assignValue(nested, key, newValue);
        nested = nested[key];
      }
      return object;
    }
    module.exports = baseSet;
  }
});

// node_modules/lodash/_basePickBy.js
var require_basePickBy = __commonJS({
  "node_modules/lodash/_basePickBy.js"(exports, module) {
    var baseGet = require_baseGet();
    var baseSet = require_baseSet();
    var castPath = require_castPath();
    function basePickBy(object, paths, predicate) {
      var index3 = -1, length = paths.length, result = {};
      while (++index3 < length) {
        var path = paths[index3], value = baseGet(object, path);
        if (predicate(value, path)) {
          baseSet(result, castPath(path, object), value);
        }
      }
      return result;
    }
    module.exports = basePickBy;
  }
});

// node_modules/lodash/_basePick.js
var require_basePick = __commonJS({
  "node_modules/lodash/_basePick.js"(exports, module) {
    var basePickBy = require_basePickBy();
    var hasIn = require_hasIn();
    function basePick(object, paths) {
      return basePickBy(object, paths, function(value, path) {
        return hasIn(object, path);
      });
    }
    module.exports = basePick;
  }
});

// node_modules/lodash/_flatRest.js
var require_flatRest = __commonJS({
  "node_modules/lodash/_flatRest.js"(exports, module) {
    var flatten = require_flatten();
    var overRest = require_overRest();
    var setToString = require_setToString();
    function flatRest(func) {
      return setToString(overRest(func, void 0, flatten), func + "");
    }
    module.exports = flatRest;
  }
});

// node_modules/lodash/pick.js
var require_pick = __commonJS({
  "node_modules/lodash/pick.js"(exports, module) {
    var basePick = require_basePick();
    var flatRest = require_flatRest();
    var pick = flatRest(function(object, paths) {
      return object == null ? {} : basePick(object, paths);
    });
    module.exports = pick;
  }
});

// node_modules/lodash/_baseRange.js
var require_baseRange = __commonJS({
  "node_modules/lodash/_baseRange.js"(exports, module) {
    var nativeCeil = Math.ceil;
    var nativeMax = Math.max;
    function baseRange(start2, end, step, fromRight) {
      var index3 = -1, length = nativeMax(nativeCeil((end - start2) / (step || 1)), 0), result = Array(length);
      while (length--) {
        result[fromRight ? length : ++index3] = start2;
        start2 += step;
      }
      return result;
    }
    module.exports = baseRange;
  }
});

// node_modules/lodash/_createRange.js
var require_createRange = __commonJS({
  "node_modules/lodash/_createRange.js"(exports, module) {
    var baseRange = require_baseRange();
    var isIterateeCall = require_isIterateeCall();
    var toFinite = require_toFinite();
    function createRange(fromRight) {
      return function(start2, end, step) {
        if (step && typeof step != "number" && isIterateeCall(start2, end, step)) {
          end = step = void 0;
        }
        start2 = toFinite(start2);
        if (end === void 0) {
          end = start2;
          start2 = 0;
        } else {
          end = toFinite(end);
        }
        step = step === void 0 ? start2 < end ? 1 : -1 : toFinite(step);
        return baseRange(start2, end, step, fromRight);
      };
    }
    module.exports = createRange;
  }
});

// node_modules/lodash/range.js
var require_range = __commonJS({
  "node_modules/lodash/range.js"(exports, module) {
    var createRange = require_createRange();
    var range2 = createRange();
    module.exports = range2;
  }
});

// node_modules/lodash/_baseSortBy.js
var require_baseSortBy = __commonJS({
  "node_modules/lodash/_baseSortBy.js"(exports, module) {
    function baseSortBy(array3, comparer) {
      var length = array3.length;
      array3.sort(comparer);
      while (length--) {
        array3[length] = array3[length].value;
      }
      return array3;
    }
    module.exports = baseSortBy;
  }
});

// node_modules/lodash/_compareAscending.js
var require_compareAscending = __commonJS({
  "node_modules/lodash/_compareAscending.js"(exports, module) {
    var isSymbol = require_isSymbol();
    function compareAscending(value, other) {
      if (value !== other) {
        var valIsDefined = value !== void 0, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
        var othIsDefined = other !== void 0, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
        if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
          return 1;
        }
        if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
          return -1;
        }
      }
      return 0;
    }
    module.exports = compareAscending;
  }
});

// node_modules/lodash/_compareMultiple.js
var require_compareMultiple = __commonJS({
  "node_modules/lodash/_compareMultiple.js"(exports, module) {
    var compareAscending = require_compareAscending();
    function compareMultiple(object, other, orders) {
      var index3 = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
      while (++index3 < length) {
        var result = compareAscending(objCriteria[index3], othCriteria[index3]);
        if (result) {
          if (index3 >= ordersLength) {
            return result;
          }
          var order = orders[index3];
          return result * (order == "desc" ? -1 : 1);
        }
      }
      return object.index - other.index;
    }
    module.exports = compareMultiple;
  }
});

// node_modules/lodash/_baseOrderBy.js
var require_baseOrderBy = __commonJS({
  "node_modules/lodash/_baseOrderBy.js"(exports, module) {
    var arrayMap = require_arrayMap();
    var baseGet = require_baseGet();
    var baseIteratee = require_baseIteratee();
    var baseMap = require_baseMap();
    var baseSortBy = require_baseSortBy();
    var baseUnary = require_baseUnary();
    var compareMultiple = require_compareMultiple();
    var identity6 = require_identity();
    var isArray = require_isArray();
    function baseOrderBy(collection, iteratees, orders) {
      if (iteratees.length) {
        iteratees = arrayMap(iteratees, function(iteratee) {
          if (isArray(iteratee)) {
            return function(value) {
              return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
            };
          }
          return iteratee;
        });
      } else {
        iteratees = [identity6];
      }
      var index3 = -1;
      iteratees = arrayMap(iteratees, baseUnary(baseIteratee));
      var result = baseMap(collection, function(value, key, collection2) {
        var criteria = arrayMap(iteratees, function(iteratee) {
          return iteratee(value);
        });
        return {
          "criteria": criteria,
          "index": ++index3,
          "value": value
        };
      });
      return baseSortBy(result, function(object, other) {
        return compareMultiple(object, other, orders);
      });
    }
    module.exports = baseOrderBy;
  }
});

// node_modules/lodash/sortBy.js
var require_sortBy = __commonJS({
  "node_modules/lodash/sortBy.js"(exports, module) {
    var baseFlatten = require_baseFlatten();
    var baseOrderBy = require_baseOrderBy();
    var baseRest = require_baseRest();
    var isIterateeCall = require_isIterateeCall();
    var sortBy = baseRest(function(collection, iteratees) {
      if (collection == null) {
        return [];
      }
      var length = iteratees.length;
      if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
        iteratees = [];
      } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
        iteratees = [iteratees[0]];
      }
      return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
    });
    module.exports = sortBy;
  }
});

// node_modules/lodash/uniqueId.js
var require_uniqueId = __commonJS({
  "node_modules/lodash/uniqueId.js"(exports, module) {
    var toString2 = require_toString();
    var idCounter = 0;
    function uniqueId(prefix) {
      var id3 = ++idCounter;
      return toString2(prefix) + id3;
    }
    module.exports = uniqueId;
  }
});

// node_modules/lodash/_baseZipObject.js
var require_baseZipObject = __commonJS({
  "node_modules/lodash/_baseZipObject.js"(exports, module) {
    function baseZipObject(props, values, assignFunc) {
      var index3 = -1, length = props.length, valsLength = values.length, result = {};
      while (++index3 < length) {
        var value = index3 < valsLength ? values[index3] : void 0;
        assignFunc(result, props[index3], value);
      }
      return result;
    }
    module.exports = baseZipObject;
  }
});

// node_modules/lodash/zipObject.js
var require_zipObject = __commonJS({
  "node_modules/lodash/zipObject.js"(exports, module) {
    var assignValue = require_assignValue();
    var baseZipObject = require_baseZipObject();
    function zipObject(props, values) {
      return baseZipObject(props || [], values || [], assignValue);
    }
    module.exports = zipObject;
  }
});

// node_modules/dagre/lib/lodash.js
var require_lodash2 = __commonJS({
  "node_modules/dagre/lib/lodash.js"(exports, module) {
    var lodash;
    if (typeof __require === "function") {
      try {
        lodash = {
          cloneDeep: require_cloneDeep(),
          constant: require_constant(),
          defaults: require_defaults(),
          each: require_each(),
          filter: require_filter(),
          find: require_find(),
          flatten: require_flatten(),
          forEach: require_forEach(),
          forIn: require_forIn(),
          has: require_has(),
          isUndefined: require_isUndefined(),
          last: require_last(),
          map: require_map(),
          mapValues: require_mapValues(),
          max: require_max(),
          merge: require_merge(),
          min: require_min(),
          minBy: require_minBy(),
          now: require_now(),
          pick: require_pick(),
          range: require_range(),
          reduce: require_reduce(),
          sortBy: require_sortBy(),
          uniqueId: require_uniqueId(),
          values: require_values(),
          zipObject: require_zipObject()
        };
      } catch (e) {
      }
    }
    if (!lodash) {
      lodash = window._;
    }
    module.exports = lodash;
  }
});

// node_modules/dagre/lib/data/list.js
var require_list = __commonJS({
  "node_modules/dagre/lib/data/list.js"(exports, module) {
    module.exports = List;
    function List() {
      var sentinel = {};
      sentinel._next = sentinel._prev = sentinel;
      this._sentinel = sentinel;
    }
    List.prototype.dequeue = function() {
      var sentinel = this._sentinel;
      var entry = sentinel._prev;
      if (entry !== sentinel) {
        unlink(entry);
        return entry;
      }
    };
    List.prototype.enqueue = function(entry) {
      var sentinel = this._sentinel;
      if (entry._prev && entry._next) {
        unlink(entry);
      }
      entry._next = sentinel._next;
      sentinel._next._prev = entry;
      sentinel._next = entry;
      entry._prev = sentinel;
    };
    List.prototype.toString = function() {
      var strs = [];
      var sentinel = this._sentinel;
      var curr = sentinel._prev;
      while (curr !== sentinel) {
        strs.push(JSON.stringify(curr, filterOutLinks));
        curr = curr._prev;
      }
      return "[" + strs.join(", ") + "]";
    };
    function unlink(entry) {
      entry._prev._next = entry._next;
      entry._next._prev = entry._prev;
      delete entry._next;
      delete entry._prev;
    }
    function filterOutLinks(k, v) {
      if (k !== "_next" && k !== "_prev") {
        return v;
      }
    }
  }
});

// node_modules/dagre/lib/greedy-fas.js
var require_greedy_fas = __commonJS({
  "node_modules/dagre/lib/greedy-fas.js"(exports, module) {
    var _ = require_lodash2();
    var Graph = require_graphlib2().Graph;
    var List = require_list();
    module.exports = greedyFAS;
    var DEFAULT_WEIGHT_FN = _.constant(1);
    function greedyFAS(g, weightFn) {
      if (g.nodeCount() <= 1) {
        return [];
      }
      var state2 = buildState(g, weightFn || DEFAULT_WEIGHT_FN);
      var results = doGreedyFAS(state2.graph, state2.buckets, state2.zeroIdx);
      return _.flatten(_.map(results, function(e) {
        return g.outEdges(e.v, e.w);
      }), true);
    }
    function doGreedyFAS(g, buckets, zeroIdx) {
      var results = [];
      var sources = buckets[buckets.length - 1];
      var sinks = buckets[0];
      var entry;
      while (g.nodeCount()) {
        while (entry = sinks.dequeue()) {
          removeNode(g, buckets, zeroIdx, entry);
        }
        while (entry = sources.dequeue()) {
          removeNode(g, buckets, zeroIdx, entry);
        }
        if (g.nodeCount()) {
          for (var i = buckets.length - 2; i > 0; --i) {
            entry = buckets[i].dequeue();
            if (entry) {
              results = results.concat(removeNode(g, buckets, zeroIdx, entry, true));
              break;
            }
          }
        }
      }
      return results;
    }
    function removeNode(g, buckets, zeroIdx, entry, collectPredecessors) {
      var results = collectPredecessors ? [] : void 0;
      _.forEach(g.inEdges(entry.v), function(edge) {
        var weight = g.edge(edge);
        var uEntry = g.node(edge.v);
        if (collectPredecessors) {
          results.push({
            v: edge.v,
            w: edge.w
          });
        }
        uEntry.out -= weight;
        assignBucket(buckets, zeroIdx, uEntry);
      });
      _.forEach(g.outEdges(entry.v), function(edge) {
        var weight = g.edge(edge);
        var w = edge.w;
        var wEntry = g.node(w);
        wEntry["in"] -= weight;
        assignBucket(buckets, zeroIdx, wEntry);
      });
      g.removeNode(entry.v);
      return results;
    }
    function buildState(g, weightFn) {
      var fasGraph = new Graph();
      var maxIn = 0;
      var maxOut = 0;
      _.forEach(g.nodes(), function(v) {
        fasGraph.setNode(v, {
          v,
          "in": 0,
          out: 0
        });
      });
      _.forEach(g.edges(), function(e) {
        var prevWeight = fasGraph.edge(e.v, e.w) || 0;
        var weight = weightFn(e);
        var edgeWeight = prevWeight + weight;
        fasGraph.setEdge(e.v, e.w, edgeWeight);
        maxOut = Math.max(maxOut, fasGraph.node(e.v).out += weight);
        maxIn = Math.max(maxIn, fasGraph.node(e.w)["in"] += weight);
      });
      var buckets = _.range(maxOut + maxIn + 3).map(function() {
        return new List();
      });
      var zeroIdx = maxIn + 1;
      _.forEach(fasGraph.nodes(), function(v) {
        assignBucket(buckets, zeroIdx, fasGraph.node(v));
      });
      return {
        graph: fasGraph,
        buckets,
        zeroIdx
      };
    }
    function assignBucket(buckets, zeroIdx, entry) {
      if (!entry.out) {
        buckets[0].enqueue(entry);
      } else if (!entry["in"]) {
        buckets[buckets.length - 1].enqueue(entry);
      } else {
        buckets[entry.out - entry["in"] + zeroIdx].enqueue(entry);
      }
    }
  }
});

// node_modules/dagre/lib/acyclic.js
var require_acyclic = __commonJS({
  "node_modules/dagre/lib/acyclic.js"(exports, module) {
    "use strict";
    var _ = require_lodash2();
    var greedyFAS = require_greedy_fas();
    module.exports = {
      run,
      undo
    };
    function run(g) {
      var fas = g.graph().acyclicer === "greedy" ? greedyFAS(g, weightFn(g)) : dfsFAS(g);
      _.forEach(fas, function(e) {
        var label = g.edge(e);
        g.removeEdge(e);
        label.forwardName = e.name;
        label.reversed = true;
        g.setEdge(e.w, e.v, label, _.uniqueId("rev"));
      });
      function weightFn(g2) {
        return function(e) {
          return g2.edge(e).weight;
        };
      }
    }
    function dfsFAS(g) {
      var fas = [];
      var stack = {};
      var visited = {};
      function dfs(v) {
        if (_.has(visited, v)) {
          return;
        }
        visited[v] = true;
        stack[v] = true;
        _.forEach(g.outEdges(v), function(e) {
          if (_.has(stack, e.w)) {
            fas.push(e);
          } else {
            dfs(e.w);
          }
        });
        delete stack[v];
      }
      _.forEach(g.nodes(), dfs);
      return fas;
    }
    function undo(g) {
      _.forEach(g.edges(), function(e) {
        var label = g.edge(e);
        if (label.reversed) {
          g.removeEdge(e);
          var forwardName = label.forwardName;
          delete label.reversed;
          delete label.forwardName;
          g.setEdge(e.w, e.v, label, forwardName);
        }
      });
    }
  }
});

// node_modules/dagre/lib/util.js
var require_util = __commonJS({
  "node_modules/dagre/lib/util.js"(exports, module) {
    "use strict";
    var _ = require_lodash2();
    var Graph = require_graphlib2().Graph;
    module.exports = {
      addDummyNode,
      simplify,
      asNonCompoundGraph,
      successorWeights,
      predecessorWeights,
      intersectRect,
      buildLayerMatrix,
      normalizeRanks,
      removeEmptyRanks,
      addBorderNode,
      maxRank,
      partition,
      time: time2,
      notime
    };
    function addDummyNode(g, type, attrs, name) {
      var v;
      do {
        v = _.uniqueId(name);
      } while (g.hasNode(v));
      attrs.dummy = type;
      g.setNode(v, attrs);
      return v;
    }
    function simplify(g) {
      var simplified = new Graph().setGraph(g.graph());
      _.forEach(g.nodes(), function(v) {
        simplified.setNode(v, g.node(v));
      });
      _.forEach(g.edges(), function(e) {
        var simpleLabel = simplified.edge(e.v, e.w) || {
          weight: 0,
          minlen: 1
        };
        var label = g.edge(e);
        simplified.setEdge(e.v, e.w, {
          weight: simpleLabel.weight + label.weight,
          minlen: Math.max(simpleLabel.minlen, label.minlen)
        });
      });
      return simplified;
    }
    function asNonCompoundGraph(g) {
      var simplified = new Graph({
        multigraph: g.isMultigraph()
      }).setGraph(g.graph());
      _.forEach(g.nodes(), function(v) {
        if (!g.children(v).length) {
          simplified.setNode(v, g.node(v));
        }
      });
      _.forEach(g.edges(), function(e) {
        simplified.setEdge(e, g.edge(e));
      });
      return simplified;
    }
    function successorWeights(g) {
      var weightMap = _.map(g.nodes(), function(v) {
        var sucs = {};
        _.forEach(g.outEdges(v), function(e) {
          sucs[e.w] = (sucs[e.w] || 0) + g.edge(e).weight;
        });
        return sucs;
      });
      return _.zipObject(g.nodes(), weightMap);
    }
    function predecessorWeights(g) {
      var weightMap = _.map(g.nodes(), function(v) {
        var preds = {};
        _.forEach(g.inEdges(v), function(e) {
          preds[e.v] = (preds[e.v] || 0) + g.edge(e).weight;
        });
        return preds;
      });
      return _.zipObject(g.nodes(), weightMap);
    }
    function intersectRect(rect, point2) {
      var x3 = rect.x;
      var y3 = rect.y;
      var dx = point2.x - x3;
      var dy = point2.y - y3;
      var w = rect.width / 2;
      var h = rect.height / 2;
      if (!dx && !dy) {
        throw new Error("Not possible to find intersection inside of the rectangle");
      }
      var sx, sy;
      if (Math.abs(dy) * w > Math.abs(dx) * h) {
        if (dy < 0) {
          h = -h;
        }
        sx = h * dx / dy;
        sy = h;
      } else {
        if (dx < 0) {
          w = -w;
        }
        sx = w;
        sy = w * dy / dx;
      }
      return {
        x: x3 + sx,
        y: y3 + sy
      };
    }
    function buildLayerMatrix(g) {
      var layering = _.map(_.range(maxRank(g) + 1), function() {
        return [];
      });
      _.forEach(g.nodes(), function(v) {
        var node = g.node(v);
        var rank2 = node.rank;
        if (!_.isUndefined(rank2)) {
          layering[rank2][node.order] = v;
        }
      });
      return layering;
    }
    function normalizeRanks(g) {
      var min2 = _.min(_.map(g.nodes(), function(v) {
        return g.node(v).rank;
      }));
      _.forEach(g.nodes(), function(v) {
        var node = g.node(v);
        if (_.has(node, "rank")) {
          node.rank -= min2;
        }
      });
    }
    function removeEmptyRanks(g) {
      var offset = _.min(_.map(g.nodes(), function(v) {
        return g.node(v).rank;
      }));
      var layers = [];
      _.forEach(g.nodes(), function(v) {
        var rank2 = g.node(v).rank - offset;
        if (!layers[rank2]) {
          layers[rank2] = [];
        }
        layers[rank2].push(v);
      });
      var delta = 0;
      var nodeRankFactor = g.graph().nodeRankFactor;
      _.forEach(layers, function(vs, i) {
        if (_.isUndefined(vs) && i % nodeRankFactor !== 0) {
          --delta;
        } else if (delta) {
          _.forEach(vs, function(v) {
            g.node(v).rank += delta;
          });
        }
      });
    }
    function addBorderNode(g, prefix, rank2, order) {
      var node = {
        width: 0,
        height: 0
      };
      if (arguments.length >= 4) {
        node.rank = rank2;
        node.order = order;
      }
      return addDummyNode(g, "border", node, prefix);
    }
    function maxRank(g) {
      return _.max(_.map(g.nodes(), function(v) {
        var rank2 = g.node(v).rank;
        if (!_.isUndefined(rank2)) {
          return rank2;
        }
      }));
    }
    function partition(collection, fn) {
      var result = {
        lhs: [],
        rhs: []
      };
      _.forEach(collection, function(value) {
        if (fn(value)) {
          result.lhs.push(value);
        } else {
          result.rhs.push(value);
        }
      });
      return result;
    }
    function time2(name, fn) {
      var start2 = _.now();
      try {
        return fn();
      } finally {
        console.log(name + " time: " + (_.now() - start2) + "ms");
      }
    }
    function notime(name, fn) {
      return fn();
    }
  }
});

// node_modules/dagre/lib/normalize.js
var require_normalize = __commonJS({
  "node_modules/dagre/lib/normalize.js"(exports, module) {
    "use strict";
    var _ = require_lodash2();
    var util = require_util();
    module.exports = {
      run,
      undo
    };
    function run(g) {
      g.graph().dummyChains = [];
      _.forEach(g.edges(), function(edge) {
        normalizeEdge(g, edge);
      });
    }
    function normalizeEdge(g, e) {
      var v = e.v;
      var vRank = g.node(v).rank;
      var w = e.w;
      var wRank = g.node(w).rank;
      var name = e.name;
      var edgeLabel = g.edge(e);
      var labelRank = edgeLabel.labelRank;
      if (wRank === vRank + 1) return;
      g.removeEdge(e);
      var dummy, attrs, i;
      for (i = 0, ++vRank; vRank < wRank; ++i, ++vRank) {
        edgeLabel.points = [];
        attrs = {
          width: 0,
          height: 0,
          edgeLabel,
          edgeObj: e,
          rank: vRank
        };
        dummy = util.addDummyNode(g, "edge", attrs, "_d");
        if (vRank === labelRank) {
          attrs.width = edgeLabel.width;
          attrs.height = edgeLabel.height;
          attrs.dummy = "edge-label";
          attrs.labelpos = edgeLabel.labelpos;
        }
        g.setEdge(v, dummy, {
          weight: edgeLabel.weight
        }, name);
        if (i === 0) {
          g.graph().dummyChains.push(dummy);
        }
        v = dummy;
      }
      g.setEdge(v, w, {
        weight: edgeLabel.weight
      }, name);
    }
    function undo(g) {
      _.forEach(g.graph().dummyChains, function(v) {
        var node = g.node(v);
        var origLabel = node.edgeLabel;
        var w;
        g.setEdge(node.edgeObj, origLabel);
        while (node.dummy) {
          w = g.successors(v)[0];
          g.removeNode(v);
          origLabel.points.push({
            x: node.x,
            y: node.y
          });
          if (node.dummy === "edge-label") {
            origLabel.x = node.x;
            origLabel.y = node.y;
            origLabel.width = node.width;
            origLabel.height = node.height;
          }
          v = w;
          node = g.node(v);
        }
      });
    }
  }
});

// node_modules/dagre/lib/rank/util.js
var require_util2 = __commonJS({
  "node_modules/dagre/lib/rank/util.js"(exports, module) {
    "use strict";
    var _ = require_lodash2();
    module.exports = {
      longestPath,
      slack
    };
    function longestPath(g) {
      var visited = {};
      function dfs(v) {
        var label = g.node(v);
        if (_.has(visited, v)) {
          return label.rank;
        }
        visited[v] = true;
        var rank2 = _.min(_.map(g.outEdges(v), function(e) {
          return dfs(e.w) - g.edge(e).minlen;
        }));
        if (rank2 === Number.POSITIVE_INFINITY || // return value of _.map([]) for Lodash 3
        rank2 === void 0 || // return value of _.map([]) for Lodash 4
        rank2 === null) {
          rank2 = 0;
        }
        return label.rank = rank2;
      }
      _.forEach(g.sources(), dfs);
    }
    function slack(g, e) {
      return g.node(e.w).rank - g.node(e.v).rank - g.edge(e).minlen;
    }
  }
});

// node_modules/dagre/lib/rank/feasible-tree.js
var require_feasible_tree = __commonJS({
  "node_modules/dagre/lib/rank/feasible-tree.js"(exports, module) {
    "use strict";
    var _ = require_lodash2();
    var Graph = require_graphlib2().Graph;
    var slack = require_util2().slack;
    module.exports = feasibleTree;
    function feasibleTree(g) {
      var t = new Graph({
        directed: false
      });
      var start2 = g.nodes()[0];
      var size = g.nodeCount();
      t.setNode(start2, {});
      var edge, delta;
      while (tightTree(t, g) < size) {
        edge = findMinSlackEdge(t, g);
        delta = t.hasNode(edge.v) ? slack(g, edge) : -slack(g, edge);
        shiftRanks(t, g, delta);
      }
      return t;
    }
    function tightTree(t, g) {
      function dfs(v) {
        _.forEach(g.nodeEdges(v), function(e) {
          var edgeV = e.v, w = v === edgeV ? e.w : edgeV;
          if (!t.hasNode(w) && !slack(g, e)) {
            t.setNode(w, {});
            t.setEdge(v, w, {});
            dfs(w);
          }
        });
      }
      _.forEach(t.nodes(), dfs);
      return t.nodeCount();
    }
    function findMinSlackEdge(t, g) {
      return _.minBy(g.edges(), function(e) {
        if (t.hasNode(e.v) !== t.hasNode(e.w)) {
          return slack(g, e);
        }
      });
    }
    function shiftRanks(t, g, delta) {
      _.forEach(t.nodes(), function(v) {
        g.node(v).rank += delta;
      });
    }
  }
});

// node_modules/dagre/lib/rank/network-simplex.js
var require_network_simplex = __commonJS({
  "node_modules/dagre/lib/rank/network-simplex.js"(exports, module) {
    "use strict";
    var _ = require_lodash2();
    var feasibleTree = require_feasible_tree();
    var slack = require_util2().slack;
    var initRank = require_util2().longestPath;
    var preorder = require_graphlib2().alg.preorder;
    var postorder = require_graphlib2().alg.postorder;
    var simplify = require_util().simplify;
    module.exports = networkSimplex;
    networkSimplex.initLowLimValues = initLowLimValues;
    networkSimplex.initCutValues = initCutValues;
    networkSimplex.calcCutValue = calcCutValue;
    networkSimplex.leaveEdge = leaveEdge;
    networkSimplex.enterEdge = enterEdge;
    networkSimplex.exchangeEdges = exchangeEdges;
    function networkSimplex(g) {
      g = simplify(g);
      initRank(g);
      var t = feasibleTree(g);
      initLowLimValues(t);
      initCutValues(t, g);
      var e, f;
      while (e = leaveEdge(t)) {
        f = enterEdge(t, g, e);
        exchangeEdges(t, g, e, f);
      }
    }
    function initCutValues(t, g) {
      var vs = postorder(t, t.nodes());
      vs = vs.slice(0, vs.length - 1);
      _.forEach(vs, function(v) {
        assignCutValue(t, g, v);
      });
    }
    function assignCutValue(t, g, child) {
      var childLab = t.node(child);
      var parent = childLab.parent;
      t.edge(child, parent).cutvalue = calcCutValue(t, g, child);
    }
    function calcCutValue(t, g, child) {
      var childLab = t.node(child);
      var parent = childLab.parent;
      var childIsTail = true;
      var graphEdge = g.edge(child, parent);
      var cutValue = 0;
      if (!graphEdge) {
        childIsTail = false;
        graphEdge = g.edge(parent, child);
      }
      cutValue = graphEdge.weight;
      _.forEach(g.nodeEdges(child), function(e) {
        var isOutEdge = e.v === child, other = isOutEdge ? e.w : e.v;
        if (other !== parent) {
          var pointsToHead = isOutEdge === childIsTail, otherWeight = g.edge(e).weight;
          cutValue += pointsToHead ? otherWeight : -otherWeight;
          if (isTreeEdge(t, child, other)) {
            var otherCutValue = t.edge(child, other).cutvalue;
            cutValue += pointsToHead ? -otherCutValue : otherCutValue;
          }
        }
      });
      return cutValue;
    }
    function initLowLimValues(tree, root2) {
      if (arguments.length < 2) {
        root2 = tree.nodes()[0];
      }
      dfsAssignLowLim(tree, {}, 1, root2);
    }
    function dfsAssignLowLim(tree, visited, nextLim, v, parent) {
      var low = nextLim;
      var label = tree.node(v);
      visited[v] = true;
      _.forEach(tree.neighbors(v), function(w) {
        if (!_.has(visited, w)) {
          nextLim = dfsAssignLowLim(tree, visited, nextLim, w, v);
        }
      });
      label.low = low;
      label.lim = nextLim++;
      if (parent) {
        label.parent = parent;
      } else {
        delete label.parent;
      }
      return nextLim;
    }
    function leaveEdge(tree) {
      return _.find(tree.edges(), function(e) {
        return tree.edge(e).cutvalue < 0;
      });
    }
    function enterEdge(t, g, edge) {
      var v = edge.v;
      var w = edge.w;
      if (!g.hasEdge(v, w)) {
        v = edge.w;
        w = edge.v;
      }
      var vLabel = t.node(v);
      var wLabel = t.node(w);
      var tailLabel = vLabel;
      var flip = false;
      if (vLabel.lim > wLabel.lim) {
        tailLabel = wLabel;
        flip = true;
      }
      var candidates = _.filter(g.edges(), function(edge2) {
        return flip === isDescendant(t, t.node(edge2.v), tailLabel) && flip !== isDescendant(t, t.node(edge2.w), tailLabel);
      });
      return _.minBy(candidates, function(edge2) {
        return slack(g, edge2);
      });
    }
    function exchangeEdges(t, g, e, f) {
      var v = e.v;
      var w = e.w;
      t.removeEdge(v, w);
      t.setEdge(f.v, f.w, {});
      initLowLimValues(t);
      initCutValues(t, g);
      updateRanks(t, g);
    }
    function updateRanks(t, g) {
      var root2 = _.find(t.nodes(), function(v) {
        return !g.node(v).parent;
      });
      var vs = preorder(t, root2);
      vs = vs.slice(1);
      _.forEach(vs, function(v) {
        var parent = t.node(v).parent, edge = g.edge(v, parent), flipped = false;
        if (!edge) {
          edge = g.edge(parent, v);
          flipped = true;
        }
        g.node(v).rank = g.node(parent).rank + (flipped ? edge.minlen : -edge.minlen);
      });
    }
    function isTreeEdge(tree, u, v) {
      return tree.hasEdge(u, v);
    }
    function isDescendant(tree, vLabel, rootLabel) {
      return rootLabel.low <= vLabel.lim && vLabel.lim <= rootLabel.lim;
    }
  }
});

// node_modules/dagre/lib/rank/index.js
var require_rank = __commonJS({
  "node_modules/dagre/lib/rank/index.js"(exports, module) {
    "use strict";
    var rankUtil = require_util2();
    var longestPath = rankUtil.longestPath;
    var feasibleTree = require_feasible_tree();
    var networkSimplex = require_network_simplex();
    module.exports = rank2;
    function rank2(g) {
      switch (g.graph().ranker) {
        case "network-simplex":
          networkSimplexRanker(g);
          break;
        case "tight-tree":
          tightTreeRanker(g);
          break;
        case "longest-path":
          longestPathRanker(g);
          break;
        default:
          networkSimplexRanker(g);
      }
    }
    var longestPathRanker = longestPath;
    function tightTreeRanker(g) {
      longestPath(g);
      feasibleTree(g);
    }
    function networkSimplexRanker(g) {
      networkSimplex(g);
    }
  }
});

// node_modules/dagre/lib/parent-dummy-chains.js
var require_parent_dummy_chains = __commonJS({
  "node_modules/dagre/lib/parent-dummy-chains.js"(exports, module) {
    var _ = require_lodash2();
    module.exports = parentDummyChains;
    function parentDummyChains(g) {
      var postorderNums = postorder(g);
      _.forEach(g.graph().dummyChains, function(v) {
        var node = g.node(v);
        var edgeObj = node.edgeObj;
        var pathData = findPath(g, postorderNums, edgeObj.v, edgeObj.w);
        var path = pathData.path;
        var lca = pathData.lca;
        var pathIdx = 0;
        var pathV = path[pathIdx];
        var ascending3 = true;
        while (v !== edgeObj.w) {
          node = g.node(v);
          if (ascending3) {
            while ((pathV = path[pathIdx]) !== lca && g.node(pathV).maxRank < node.rank) {
              pathIdx++;
            }
            if (pathV === lca) {
              ascending3 = false;
            }
          }
          if (!ascending3) {
            while (pathIdx < path.length - 1 && g.node(pathV = path[pathIdx + 1]).minRank <= node.rank) {
              pathIdx++;
            }
            pathV = path[pathIdx];
          }
          g.setParent(v, pathV);
          v = g.successors(v)[0];
        }
      });
    }
    function findPath(g, postorderNums, v, w) {
      var vPath = [];
      var wPath = [];
      var low = Math.min(postorderNums[v].low, postorderNums[w].low);
      var lim = Math.max(postorderNums[v].lim, postorderNums[w].lim);
      var parent;
      var lca;
      parent = v;
      do {
        parent = g.parent(parent);
        vPath.push(parent);
      } while (parent && (postorderNums[parent].low > low || lim > postorderNums[parent].lim));
      lca = parent;
      parent = w;
      while ((parent = g.parent(parent)) !== lca) {
        wPath.push(parent);
      }
      return {
        path: vPath.concat(wPath.reverse()),
        lca
      };
    }
    function postorder(g) {
      var result = {};
      var lim = 0;
      function dfs(v) {
        var low = lim;
        _.forEach(g.children(v), dfs);
        result[v] = {
          low,
          lim: lim++
        };
      }
      _.forEach(g.children(), dfs);
      return result;
    }
  }
});

// node_modules/dagre/lib/nesting-graph.js
var require_nesting_graph = __commonJS({
  "node_modules/dagre/lib/nesting-graph.js"(exports, module) {
    var _ = require_lodash2();
    var util = require_util();
    module.exports = {
      run,
      cleanup
    };
    function run(g) {
      var root2 = util.addDummyNode(g, "root", {}, "_root");
      var depths = treeDepths(g);
      var height = _.max(_.values(depths)) - 1;
      var nodeSep = 2 * height + 1;
      g.graph().nestingRoot = root2;
      _.forEach(g.edges(), function(e) {
        g.edge(e).minlen *= nodeSep;
      });
      var weight = sumWeights(g) + 1;
      _.forEach(g.children(), function(child) {
        dfs(g, root2, nodeSep, weight, height, depths, child);
      });
      g.graph().nodeRankFactor = nodeSep;
    }
    function dfs(g, root2, nodeSep, weight, height, depths, v) {
      var children2 = g.children(v);
      if (!children2.length) {
        if (v !== root2) {
          g.setEdge(root2, v, {
            weight: 0,
            minlen: nodeSep
          });
        }
        return;
      }
      var top = util.addBorderNode(g, "_bt");
      var bottom = util.addBorderNode(g, "_bb");
      var label = g.node(v);
      g.setParent(top, v);
      label.borderTop = top;
      g.setParent(bottom, v);
      label.borderBottom = bottom;
      _.forEach(children2, function(child) {
        dfs(g, root2, nodeSep, weight, height, depths, child);
        var childNode = g.node(child);
        var childTop = childNode.borderTop ? childNode.borderTop : child;
        var childBottom = childNode.borderBottom ? childNode.borderBottom : child;
        var thisWeight = childNode.borderTop ? weight : 2 * weight;
        var minlen = childTop !== childBottom ? 1 : height - depths[v] + 1;
        g.setEdge(top, childTop, {
          weight: thisWeight,
          minlen,
          nestingEdge: true
        });
        g.setEdge(childBottom, bottom, {
          weight: thisWeight,
          minlen,
          nestingEdge: true
        });
      });
      if (!g.parent(v)) {
        g.setEdge(root2, top, {
          weight: 0,
          minlen: height + depths[v]
        });
      }
    }
    function treeDepths(g) {
      var depths = {};
      function dfs2(v, depth) {
        var children2 = g.children(v);
        if (children2 && children2.length) {
          _.forEach(children2, function(child) {
            dfs2(child, depth + 1);
          });
        }
        depths[v] = depth;
      }
      _.forEach(g.children(), function(v) {
        dfs2(v, 1);
      });
      return depths;
    }
    function sumWeights(g) {
      return _.reduce(g.edges(), function(acc, e) {
        return acc + g.edge(e).weight;
      }, 0);
    }
    function cleanup(g) {
      var graphLabel = g.graph();
      g.removeNode(graphLabel.nestingRoot);
      delete graphLabel.nestingRoot;
      _.forEach(g.edges(), function(e) {
        var edge = g.edge(e);
        if (edge.nestingEdge) {
          g.removeEdge(e);
        }
      });
    }
  }
});

// node_modules/dagre/lib/add-border-segments.js
var require_add_border_segments = __commonJS({
  "node_modules/dagre/lib/add-border-segments.js"(exports, module) {
    var _ = require_lodash2();
    var util = require_util();
    module.exports = addBorderSegments;
    function addBorderSegments(g) {
      function dfs(v) {
        var children2 = g.children(v);
        var node = g.node(v);
        if (children2.length) {
          _.forEach(children2, dfs);
        }
        if (_.has(node, "minRank")) {
          node.borderLeft = [];
          node.borderRight = [];
          for (var rank2 = node.minRank, maxRank = node.maxRank + 1; rank2 < maxRank; ++rank2) {
            addBorderNode(g, "borderLeft", "_bl", v, node, rank2);
            addBorderNode(g, "borderRight", "_br", v, node, rank2);
          }
        }
      }
      _.forEach(g.children(), dfs);
    }
    function addBorderNode(g, prop, prefix, sg, sgNode, rank2) {
      var label = {
        width: 0,
        height: 0,
        rank: rank2,
        borderType: prop
      };
      var prev = sgNode[prop][rank2 - 1];
      var curr = util.addDummyNode(g, "border", label, prefix);
      sgNode[prop][rank2] = curr;
      g.setParent(curr, sg);
      if (prev) {
        g.setEdge(prev, curr, {
          weight: 1
        });
      }
    }
  }
});

// node_modules/dagre/lib/coordinate-system.js
var require_coordinate_system = __commonJS({
  "node_modules/dagre/lib/coordinate-system.js"(exports, module) {
    "use strict";
    var _ = require_lodash2();
    module.exports = {
      adjust,
      undo
    };
    function adjust(g) {
      var rankDir = g.graph().rankdir.toLowerCase();
      if (rankDir === "lr" || rankDir === "rl") {
        swapWidthHeight(g);
      }
    }
    function undo(g) {
      var rankDir = g.graph().rankdir.toLowerCase();
      if (rankDir === "bt" || rankDir === "rl") {
        reverseY(g);
      }
      if (rankDir === "lr" || rankDir === "rl") {
        swapXY(g);
        swapWidthHeight(g);
      }
    }
    function swapWidthHeight(g) {
      _.forEach(g.nodes(), function(v) {
        swapWidthHeightOne(g.node(v));
      });
      _.forEach(g.edges(), function(e) {
        swapWidthHeightOne(g.edge(e));
      });
    }
    function swapWidthHeightOne(attrs) {
      var w = attrs.width;
      attrs.width = attrs.height;
      attrs.height = w;
    }
    function reverseY(g) {
      _.forEach(g.nodes(), function(v) {
        reverseYOne(g.node(v));
      });
      _.forEach(g.edges(), function(e) {
        var edge = g.edge(e);
        _.forEach(edge.points, reverseYOne);
        if (_.has(edge, "y")) {
          reverseYOne(edge);
        }
      });
    }
    function reverseYOne(attrs) {
      attrs.y = -attrs.y;
    }
    function swapXY(g) {
      _.forEach(g.nodes(), function(v) {
        swapXYOne(g.node(v));
      });
      _.forEach(g.edges(), function(e) {
        var edge = g.edge(e);
        _.forEach(edge.points, swapXYOne);
        if (_.has(edge, "x")) {
          swapXYOne(edge);
        }
      });
    }
    function swapXYOne(attrs) {
      var x3 = attrs.x;
      attrs.x = attrs.y;
      attrs.y = x3;
    }
  }
});

// node_modules/dagre/lib/order/init-order.js
var require_init_order = __commonJS({
  "node_modules/dagre/lib/order/init-order.js"(exports, module) {
    "use strict";
    var _ = require_lodash2();
    module.exports = initOrder;
    function initOrder(g) {
      var visited = {};
      var simpleNodes = _.filter(g.nodes(), function(v) {
        return !g.children(v).length;
      });
      var maxRank = _.max(_.map(simpleNodes, function(v) {
        return g.node(v).rank;
      }));
      var layers = _.map(_.range(maxRank + 1), function() {
        return [];
      });
      function dfs(v) {
        if (_.has(visited, v)) return;
        visited[v] = true;
        var node = g.node(v);
        layers[node.rank].push(v);
        _.forEach(g.successors(v), dfs);
      }
      var orderedVs = _.sortBy(simpleNodes, function(v) {
        return g.node(v).rank;
      });
      _.forEach(orderedVs, dfs);
      return layers;
    }
  }
});

// node_modules/dagre/lib/order/cross-count.js
var require_cross_count = __commonJS({
  "node_modules/dagre/lib/order/cross-count.js"(exports, module) {
    "use strict";
    var _ = require_lodash2();
    module.exports = crossCount;
    function crossCount(g, layering) {
      var cc = 0;
      for (var i = 1; i < layering.length; ++i) {
        cc += twoLayerCrossCount(g, layering[i - 1], layering[i]);
      }
      return cc;
    }
    function twoLayerCrossCount(g, northLayer, southLayer) {
      var southPos = _.zipObject(southLayer, _.map(southLayer, function(v, i) {
        return i;
      }));
      var southEntries = _.flatten(_.map(northLayer, function(v) {
        return _.sortBy(_.map(g.outEdges(v), function(e) {
          return {
            pos: southPos[e.w],
            weight: g.edge(e).weight
          };
        }), "pos");
      }), true);
      var firstIndex = 1;
      while (firstIndex < southLayer.length) firstIndex <<= 1;
      var treeSize = 2 * firstIndex - 1;
      firstIndex -= 1;
      var tree = _.map(new Array(treeSize), function() {
        return 0;
      });
      var cc = 0;
      _.forEach(southEntries.forEach(function(entry) {
        var index3 = entry.pos + firstIndex;
        tree[index3] += entry.weight;
        var weightSum = 0;
        while (index3 > 0) {
          if (index3 % 2) {
            weightSum += tree[index3 + 1];
          }
          index3 = index3 - 1 >> 1;
          tree[index3] += entry.weight;
        }
        cc += entry.weight * weightSum;
      }));
      return cc;
    }
  }
});

// node_modules/dagre/lib/order/barycenter.js
var require_barycenter = __commonJS({
  "node_modules/dagre/lib/order/barycenter.js"(exports, module) {
    var _ = require_lodash2();
    module.exports = barycenter;
    function barycenter(g, movable) {
      return _.map(movable, function(v) {
        var inV = g.inEdges(v);
        if (!inV.length) {
          return {
            v
          };
        } else {
          var result = _.reduce(inV, function(acc, e) {
            var edge = g.edge(e), nodeU = g.node(e.v);
            return {
              sum: acc.sum + edge.weight * nodeU.order,
              weight: acc.weight + edge.weight
            };
          }, {
            sum: 0,
            weight: 0
          });
          return {
            v,
            barycenter: result.sum / result.weight,
            weight: result.weight
          };
        }
      });
    }
  }
});

// node_modules/dagre/lib/order/resolve-conflicts.js
var require_resolve_conflicts = __commonJS({
  "node_modules/dagre/lib/order/resolve-conflicts.js"(exports, module) {
    "use strict";
    var _ = require_lodash2();
    module.exports = resolveConflicts;
    function resolveConflicts(entries, cg) {
      var mappedEntries = {};
      _.forEach(entries, function(entry, i) {
        var tmp = mappedEntries[entry.v] = {
          indegree: 0,
          "in": [],
          out: [],
          vs: [entry.v],
          i
        };
        if (!_.isUndefined(entry.barycenter)) {
          tmp.barycenter = entry.barycenter;
          tmp.weight = entry.weight;
        }
      });
      _.forEach(cg.edges(), function(e) {
        var entryV = mappedEntries[e.v];
        var entryW = mappedEntries[e.w];
        if (!_.isUndefined(entryV) && !_.isUndefined(entryW)) {
          entryW.indegree++;
          entryV.out.push(mappedEntries[e.w]);
        }
      });
      var sourceSet = _.filter(mappedEntries, function(entry) {
        return !entry.indegree;
      });
      return doResolveConflicts(sourceSet);
    }
    function doResolveConflicts(sourceSet) {
      var entries = [];
      function handleIn(vEntry) {
        return function(uEntry) {
          if (uEntry.merged) {
            return;
          }
          if (_.isUndefined(uEntry.barycenter) || _.isUndefined(vEntry.barycenter) || uEntry.barycenter >= vEntry.barycenter) {
            mergeEntries(vEntry, uEntry);
          }
        };
      }
      function handleOut(vEntry) {
        return function(wEntry) {
          wEntry["in"].push(vEntry);
          if (--wEntry.indegree === 0) {
            sourceSet.push(wEntry);
          }
        };
      }
      while (sourceSet.length) {
        var entry = sourceSet.pop();
        entries.push(entry);
        _.forEach(entry["in"].reverse(), handleIn(entry));
        _.forEach(entry.out, handleOut(entry));
      }
      return _.map(_.filter(entries, function(entry2) {
        return !entry2.merged;
      }), function(entry2) {
        return _.pick(entry2, ["vs", "i", "barycenter", "weight"]);
      });
    }
    function mergeEntries(target, source) {
      var sum2 = 0;
      var weight = 0;
      if (target.weight) {
        sum2 += target.barycenter * target.weight;
        weight += target.weight;
      }
      if (source.weight) {
        sum2 += source.barycenter * source.weight;
        weight += source.weight;
      }
      target.vs = source.vs.concat(target.vs);
      target.barycenter = sum2 / weight;
      target.weight = weight;
      target.i = Math.min(source.i, target.i);
      source.merged = true;
    }
  }
});

// node_modules/dagre/lib/order/sort.js
var require_sort = __commonJS({
  "node_modules/dagre/lib/order/sort.js"(exports, module) {
    var _ = require_lodash2();
    var util = require_util();
    module.exports = sort2;
    function sort2(entries, biasRight) {
      var parts = util.partition(entries, function(entry) {
        return _.has(entry, "barycenter");
      });
      var sortable = parts.lhs, unsortable = _.sortBy(parts.rhs, function(entry) {
        return -entry.i;
      }), vs = [], sum2 = 0, weight = 0, vsIndex = 0;
      sortable.sort(compareWithBias(!!biasRight));
      vsIndex = consumeUnsortable(vs, unsortable, vsIndex);
      _.forEach(sortable, function(entry) {
        vsIndex += entry.vs.length;
        vs.push(entry.vs);
        sum2 += entry.barycenter * entry.weight;
        weight += entry.weight;
        vsIndex = consumeUnsortable(vs, unsortable, vsIndex);
      });
      var result = {
        vs: _.flatten(vs, true)
      };
      if (weight) {
        result.barycenter = sum2 / weight;
        result.weight = weight;
      }
      return result;
    }
    function consumeUnsortable(vs, unsortable, index3) {
      var last;
      while (unsortable.length && (last = _.last(unsortable)).i <= index3) {
        unsortable.pop();
        vs.push(last.vs);
        index3++;
      }
      return index3;
    }
    function compareWithBias(bias) {
      return function(entryV, entryW) {
        if (entryV.barycenter < entryW.barycenter) {
          return -1;
        } else if (entryV.barycenter > entryW.barycenter) {
          return 1;
        }
        return !bias ? entryV.i - entryW.i : entryW.i - entryV.i;
      };
    }
  }
});

// node_modules/dagre/lib/order/sort-subgraph.js
var require_sort_subgraph = __commonJS({
  "node_modules/dagre/lib/order/sort-subgraph.js"(exports, module) {
    var _ = require_lodash2();
    var barycenter = require_barycenter();
    var resolveConflicts = require_resolve_conflicts();
    var sort2 = require_sort();
    module.exports = sortSubgraph;
    function sortSubgraph(g, v, cg, biasRight) {
      var movable = g.children(v);
      var node = g.node(v);
      var bl = node ? node.borderLeft : void 0;
      var br = node ? node.borderRight : void 0;
      var subgraphs = {};
      if (bl) {
        movable = _.filter(movable, function(w) {
          return w !== bl && w !== br;
        });
      }
      var barycenters = barycenter(g, movable);
      _.forEach(barycenters, function(entry) {
        if (g.children(entry.v).length) {
          var subgraphResult = sortSubgraph(g, entry.v, cg, biasRight);
          subgraphs[entry.v] = subgraphResult;
          if (_.has(subgraphResult, "barycenter")) {
            mergeBarycenters(entry, subgraphResult);
          }
        }
      });
      var entries = resolveConflicts(barycenters, cg);
      expandSubgraphs(entries, subgraphs);
      var result = sort2(entries, biasRight);
      if (bl) {
        result.vs = _.flatten([bl, result.vs, br], true);
        if (g.predecessors(bl).length) {
          var blPred = g.node(g.predecessors(bl)[0]), brPred = g.node(g.predecessors(br)[0]);
          if (!_.has(result, "barycenter")) {
            result.barycenter = 0;
            result.weight = 0;
          }
          result.barycenter = (result.barycenter * result.weight + blPred.order + brPred.order) / (result.weight + 2);
          result.weight += 2;
        }
      }
      return result;
    }
    function expandSubgraphs(entries, subgraphs) {
      _.forEach(entries, function(entry) {
        entry.vs = _.flatten(entry.vs.map(function(v) {
          if (subgraphs[v]) {
            return subgraphs[v].vs;
          }
          return v;
        }), true);
      });
    }
    function mergeBarycenters(target, other) {
      if (!_.isUndefined(target.barycenter)) {
        target.barycenter = (target.barycenter * target.weight + other.barycenter * other.weight) / (target.weight + other.weight);
        target.weight += other.weight;
      } else {
        target.barycenter = other.barycenter;
        target.weight = other.weight;
      }
    }
  }
});

// node_modules/dagre/lib/order/build-layer-graph.js
var require_build_layer_graph = __commonJS({
  "node_modules/dagre/lib/order/build-layer-graph.js"(exports, module) {
    var _ = require_lodash2();
    var Graph = require_graphlib2().Graph;
    module.exports = buildLayerGraph;
    function buildLayerGraph(g, rank2, relationship) {
      var root2 = createRootNode(g), result = new Graph({
        compound: true
      }).setGraph({
        root: root2
      }).setDefaultNodeLabel(function(v) {
        return g.node(v);
      });
      _.forEach(g.nodes(), function(v) {
        var node = g.node(v), parent = g.parent(v);
        if (node.rank === rank2 || node.minRank <= rank2 && rank2 <= node.maxRank) {
          result.setNode(v);
          result.setParent(v, parent || root2);
          _.forEach(g[relationship](v), function(e) {
            var u = e.v === v ? e.w : e.v, edge = result.edge(u, v), weight = !_.isUndefined(edge) ? edge.weight : 0;
            result.setEdge(u, v, {
              weight: g.edge(e).weight + weight
            });
          });
          if (_.has(node, "minRank")) {
            result.setNode(v, {
              borderLeft: node.borderLeft[rank2],
              borderRight: node.borderRight[rank2]
            });
          }
        }
      });
      return result;
    }
    function createRootNode(g) {
      var v;
      while (g.hasNode(v = _.uniqueId("_root"))) ;
      return v;
    }
  }
});

// node_modules/dagre/lib/order/add-subgraph-constraints.js
var require_add_subgraph_constraints = __commonJS({
  "node_modules/dagre/lib/order/add-subgraph-constraints.js"(exports, module) {
    var _ = require_lodash2();
    module.exports = addSubgraphConstraints;
    function addSubgraphConstraints(g, cg, vs) {
      var prev = {}, rootPrev;
      _.forEach(vs, function(v) {
        var child = g.parent(v), parent, prevChild;
        while (child) {
          parent = g.parent(child);
          if (parent) {
            prevChild = prev[parent];
            prev[parent] = child;
          } else {
            prevChild = rootPrev;
            rootPrev = child;
          }
          if (prevChild && prevChild !== child) {
            cg.setEdge(prevChild, child);
            return;
          }
          child = parent;
        }
      });
    }
  }
});

// node_modules/dagre/lib/order/index.js
var require_order = __commonJS({
  "node_modules/dagre/lib/order/index.js"(exports, module) {
    "use strict";
    var _ = require_lodash2();
    var initOrder = require_init_order();
    var crossCount = require_cross_count();
    var sortSubgraph = require_sort_subgraph();
    var buildLayerGraph = require_build_layer_graph();
    var addSubgraphConstraints = require_add_subgraph_constraints();
    var Graph = require_graphlib2().Graph;
    var util = require_util();
    module.exports = order;
    function order(g) {
      var maxRank = util.maxRank(g), downLayerGraphs = buildLayerGraphs(g, _.range(1, maxRank + 1), "inEdges"), upLayerGraphs = buildLayerGraphs(g, _.range(maxRank - 1, -1, -1), "outEdges");
      var layering = initOrder(g);
      assignOrder(g, layering);
      var bestCC = Number.POSITIVE_INFINITY, best;
      for (var i = 0, lastBest = 0; lastBest < 4; ++i, ++lastBest) {
        sweepLayerGraphs(i % 2 ? downLayerGraphs : upLayerGraphs, i % 4 >= 2);
        layering = util.buildLayerMatrix(g);
        var cc = crossCount(g, layering);
        if (cc < bestCC) {
          lastBest = 0;
          best = _.cloneDeep(layering);
          bestCC = cc;
        }
      }
      assignOrder(g, best);
    }
    function buildLayerGraphs(g, ranks, relationship) {
      return _.map(ranks, function(rank2) {
        return buildLayerGraph(g, rank2, relationship);
      });
    }
    function sweepLayerGraphs(layerGraphs, biasRight) {
      var cg = new Graph();
      _.forEach(layerGraphs, function(lg) {
        var root2 = lg.graph().root;
        var sorted = sortSubgraph(lg, root2, cg, biasRight);
        _.forEach(sorted.vs, function(v, i) {
          lg.node(v).order = i;
        });
        addSubgraphConstraints(lg, cg, sorted.vs);
      });
    }
    function assignOrder(g, layering) {
      _.forEach(layering, function(layer) {
        _.forEach(layer, function(v, i) {
          g.node(v).order = i;
        });
      });
    }
  }
});

// node_modules/dagre/lib/position/bk.js
var require_bk = __commonJS({
  "node_modules/dagre/lib/position/bk.js"(exports, module) {
    "use strict";
    var _ = require_lodash2();
    var Graph = require_graphlib2().Graph;
    var util = require_util();
    module.exports = {
      positionX,
      findType1Conflicts,
      findType2Conflicts,
      addConflict,
      hasConflict,
      verticalAlignment,
      horizontalCompaction,
      alignCoordinates,
      findSmallestWidthAlignment,
      balance
    };
    function findType1Conflicts(g, layering) {
      var conflicts = {};
      function visitLayer(prevLayer, layer) {
        var k0 = 0, scanPos = 0, prevLayerLength = prevLayer.length, lastNode = _.last(layer);
        _.forEach(layer, function(v, i) {
          var w = findOtherInnerSegmentNode(g, v), k1 = w ? g.node(w).order : prevLayerLength;
          if (w || v === lastNode) {
            _.forEach(layer.slice(scanPos, i + 1), function(scanNode) {
              _.forEach(g.predecessors(scanNode), function(u) {
                var uLabel = g.node(u), uPos = uLabel.order;
                if ((uPos < k0 || k1 < uPos) && !(uLabel.dummy && g.node(scanNode).dummy)) {
                  addConflict(conflicts, u, scanNode);
                }
              });
            });
            scanPos = i + 1;
            k0 = k1;
          }
        });
        return layer;
      }
      _.reduce(layering, visitLayer);
      return conflicts;
    }
    function findType2Conflicts(g, layering) {
      var conflicts = {};
      function scan2(south, southPos, southEnd, prevNorthBorder, nextNorthBorder) {
        var v;
        _.forEach(_.range(southPos, southEnd), function(i) {
          v = south[i];
          if (g.node(v).dummy) {
            _.forEach(g.predecessors(v), function(u) {
              var uNode = g.node(u);
              if (uNode.dummy && (uNode.order < prevNorthBorder || uNode.order > nextNorthBorder)) {
                addConflict(conflicts, u, v);
              }
            });
          }
        });
      }
      function visitLayer(north, south) {
        var prevNorthPos = -1, nextNorthPos, southPos = 0;
        _.forEach(south, function(v, southLookahead) {
          if (g.node(v).dummy === "border") {
            var predecessors = g.predecessors(v);
            if (predecessors.length) {
              nextNorthPos = g.node(predecessors[0]).order;
              scan2(south, southPos, southLookahead, prevNorthPos, nextNorthPos);
              southPos = southLookahead;
              prevNorthPos = nextNorthPos;
            }
          }
          scan2(south, southPos, south.length, nextNorthPos, north.length);
        });
        return south;
      }
      _.reduce(layering, visitLayer);
      return conflicts;
    }
    function findOtherInnerSegmentNode(g, v) {
      if (g.node(v).dummy) {
        return _.find(g.predecessors(v), function(u) {
          return g.node(u).dummy;
        });
      }
    }
    function addConflict(conflicts, v, w) {
      if (v > w) {
        var tmp = v;
        v = w;
        w = tmp;
      }
      var conflictsV = conflicts[v];
      if (!conflictsV) {
        conflicts[v] = conflictsV = {};
      }
      conflictsV[w] = true;
    }
    function hasConflict(conflicts, v, w) {
      if (v > w) {
        var tmp = v;
        v = w;
        w = tmp;
      }
      return _.has(conflicts[v], w);
    }
    function verticalAlignment(g, layering, conflicts, neighborFn) {
      var root2 = {}, align = {}, pos = {};
      _.forEach(layering, function(layer) {
        _.forEach(layer, function(v, order) {
          root2[v] = v;
          align[v] = v;
          pos[v] = order;
        });
      });
      _.forEach(layering, function(layer) {
        var prevIdx = -1;
        _.forEach(layer, function(v) {
          var ws = neighborFn(v);
          if (ws.length) {
            ws = _.sortBy(ws, function(w2) {
              return pos[w2];
            });
            var mp = (ws.length - 1) / 2;
            for (var i = Math.floor(mp), il = Math.ceil(mp); i <= il; ++i) {
              var w = ws[i];
              if (align[v] === v && prevIdx < pos[w] && !hasConflict(conflicts, v, w)) {
                align[w] = v;
                align[v] = root2[v] = root2[w];
                prevIdx = pos[w];
              }
            }
          }
        });
      });
      return {
        root: root2,
        align
      };
    }
    function horizontalCompaction(g, layering, root2, align, reverseSep) {
      var xs = {}, blockG = buildBlockGraph(g, layering, root2, reverseSep), borderType = reverseSep ? "borderLeft" : "borderRight";
      function iterate(setXsFunc, nextNodesFunc) {
        var stack = blockG.nodes();
        var elem = stack.pop();
        var visited = {};
        while (elem) {
          if (visited[elem]) {
            setXsFunc(elem);
          } else {
            visited[elem] = true;
            stack.push(elem);
            stack = stack.concat(nextNodesFunc(elem));
          }
          elem = stack.pop();
        }
      }
      function pass1(elem) {
        xs[elem] = blockG.inEdges(elem).reduce(function(acc, e) {
          return Math.max(acc, xs[e.v] + blockG.edge(e));
        }, 0);
      }
      function pass2(elem) {
        var min2 = blockG.outEdges(elem).reduce(function(acc, e) {
          return Math.min(acc, xs[e.w] - blockG.edge(e));
        }, Number.POSITIVE_INFINITY);
        var node = g.node(elem);
        if (min2 !== Number.POSITIVE_INFINITY && node.borderType !== borderType) {
          xs[elem] = Math.max(xs[elem], min2);
        }
      }
      iterate(pass1, blockG.predecessors.bind(blockG));
      iterate(pass2, blockG.successors.bind(blockG));
      _.forEach(align, function(v) {
        xs[v] = xs[root2[v]];
      });
      return xs;
    }
    function buildBlockGraph(g, layering, root2, reverseSep) {
      var blockGraph = new Graph(), graphLabel = g.graph(), sepFn = sep(graphLabel.nodesep, graphLabel.edgesep, reverseSep);
      _.forEach(layering, function(layer) {
        var u;
        _.forEach(layer, function(v) {
          var vRoot = root2[v];
          blockGraph.setNode(vRoot);
          if (u) {
            var uRoot = root2[u], prevMax = blockGraph.edge(uRoot, vRoot);
            blockGraph.setEdge(uRoot, vRoot, Math.max(sepFn(g, v, u), prevMax || 0));
          }
          u = v;
        });
      });
      return blockGraph;
    }
    function findSmallestWidthAlignment(g, xss) {
      return _.minBy(_.values(xss), function(xs) {
        var max2 = Number.NEGATIVE_INFINITY;
        var min2 = Number.POSITIVE_INFINITY;
        _.forIn(xs, function(x3, v) {
          var halfWidth = width(g, v) / 2;
          max2 = Math.max(x3 + halfWidth, max2);
          min2 = Math.min(x3 - halfWidth, min2);
        });
        return max2 - min2;
      });
    }
    function alignCoordinates(xss, alignTo) {
      var alignToVals = _.values(alignTo), alignToMin = _.min(alignToVals), alignToMax = _.max(alignToVals);
      _.forEach(["u", "d"], function(vert) {
        _.forEach(["l", "r"], function(horiz) {
          var alignment = vert + horiz, xs = xss[alignment], delta;
          if (xs === alignTo) return;
          var xsVals = _.values(xs);
          delta = horiz === "l" ? alignToMin - _.min(xsVals) : alignToMax - _.max(xsVals);
          if (delta) {
            xss[alignment] = _.mapValues(xs, function(x3) {
              return x3 + delta;
            });
          }
        });
      });
    }
    function balance(xss, align) {
      return _.mapValues(xss.ul, function(ignore, v) {
        if (align) {
          return xss[align.toLowerCase()][v];
        } else {
          var xs = _.sortBy(_.map(xss, v));
          return (xs[1] + xs[2]) / 2;
        }
      });
    }
    function positionX(g) {
      var layering = util.buildLayerMatrix(g);
      var conflicts = _.merge(findType1Conflicts(g, layering), findType2Conflicts(g, layering));
      var xss = {};
      var adjustedLayering;
      _.forEach(["u", "d"], function(vert) {
        adjustedLayering = vert === "u" ? layering : _.values(layering).reverse();
        _.forEach(["l", "r"], function(horiz) {
          if (horiz === "r") {
            adjustedLayering = _.map(adjustedLayering, function(inner) {
              return _.values(inner).reverse();
            });
          }
          var neighborFn = (vert === "u" ? g.predecessors : g.successors).bind(g);
          var align = verticalAlignment(g, adjustedLayering, conflicts, neighborFn);
          var xs = horizontalCompaction(g, adjustedLayering, align.root, align.align, horiz === "r");
          if (horiz === "r") {
            xs = _.mapValues(xs, function(x3) {
              return -x3;
            });
          }
          xss[vert + horiz] = xs;
        });
      });
      var smallestWidth = findSmallestWidthAlignment(g, xss);
      alignCoordinates(xss, smallestWidth);
      return balance(xss, g.graph().align);
    }
    function sep(nodeSep, edgeSep, reverseSep) {
      return function(g, v, w) {
        var vLabel = g.node(v);
        var wLabel = g.node(w);
        var sum2 = 0;
        var delta;
        sum2 += vLabel.width / 2;
        if (_.has(vLabel, "labelpos")) {
          switch (vLabel.labelpos.toLowerCase()) {
            case "l":
              delta = -vLabel.width / 2;
              break;
            case "r":
              delta = vLabel.width / 2;
              break;
          }
        }
        if (delta) {
          sum2 += reverseSep ? delta : -delta;
        }
        delta = 0;
        sum2 += (vLabel.dummy ? edgeSep : nodeSep) / 2;
        sum2 += (wLabel.dummy ? edgeSep : nodeSep) / 2;
        sum2 += wLabel.width / 2;
        if (_.has(wLabel, "labelpos")) {
          switch (wLabel.labelpos.toLowerCase()) {
            case "l":
              delta = wLabel.width / 2;
              break;
            case "r":
              delta = -wLabel.width / 2;
              break;
          }
        }
        if (delta) {
          sum2 += reverseSep ? delta : -delta;
        }
        delta = 0;
        return sum2;
      };
    }
    function width(g, v) {
      return g.node(v).width;
    }
  }
});

// node_modules/dagre/lib/position/index.js
var require_position = __commonJS({
  "node_modules/dagre/lib/position/index.js"(exports, module) {
    "use strict";
    var _ = require_lodash2();
    var util = require_util();
    var positionX = require_bk().positionX;
    module.exports = position;
    function position(g) {
      g = util.asNonCompoundGraph(g);
      positionY(g);
      _.forEach(positionX(g), function(x3, v) {
        g.node(v).x = x3;
      });
    }
    function positionY(g) {
      var layering = util.buildLayerMatrix(g);
      var rankSep = g.graph().ranksep;
      var prevY = 0;
      _.forEach(layering, function(layer) {
        var maxHeight = _.max(_.map(layer, function(v) {
          return g.node(v).height;
        }));
        _.forEach(layer, function(v) {
          g.node(v).y = prevY + maxHeight / 2;
        });
        prevY += maxHeight + rankSep;
      });
    }
  }
});

// node_modules/dagre/lib/layout.js
var require_layout = __commonJS({
  "node_modules/dagre/lib/layout.js"(exports, module) {
    "use strict";
    var _ = require_lodash2();
    var acyclic = require_acyclic();
    var normalize = require_normalize();
    var rank2 = require_rank();
    var normalizeRanks = require_util().normalizeRanks;
    var parentDummyChains = require_parent_dummy_chains();
    var removeEmptyRanks = require_util().removeEmptyRanks;
    var nestingGraph = require_nesting_graph();
    var addBorderSegments = require_add_border_segments();
    var coordinateSystem = require_coordinate_system();
    var order = require_order();
    var position = require_position();
    var util = require_util();
    var Graph = require_graphlib2().Graph;
    module.exports = layout2;
    function layout2(g, opts) {
      var time2 = opts && opts.debugTiming ? util.time : util.notime;
      time2("layout", function() {
        var layoutGraph = time2("  buildLayoutGraph", function() {
          return buildLayoutGraph(g);
        });
        time2("  runLayout", function() {
          runLayout(layoutGraph, time2);
        });
        time2("  updateInputGraph", function() {
          updateInputGraph(g, layoutGraph);
        });
      });
    }
    function runLayout(g, time2) {
      time2("    makeSpaceForEdgeLabels", function() {
        makeSpaceForEdgeLabels(g);
      });
      time2("    removeSelfEdges", function() {
        removeSelfEdges(g);
      });
      time2("    acyclic", function() {
        acyclic.run(g);
      });
      time2("    nestingGraph.run", function() {
        nestingGraph.run(g);
      });
      time2("    rank", function() {
        rank2(util.asNonCompoundGraph(g));
      });
      time2("    injectEdgeLabelProxies", function() {
        injectEdgeLabelProxies(g);
      });
      time2("    removeEmptyRanks", function() {
        removeEmptyRanks(g);
      });
      time2("    nestingGraph.cleanup", function() {
        nestingGraph.cleanup(g);
      });
      time2("    normalizeRanks", function() {
        normalizeRanks(g);
      });
      time2("    assignRankMinMax", function() {
        assignRankMinMax(g);
      });
      time2("    removeEdgeLabelProxies", function() {
        removeEdgeLabelProxies(g);
      });
      time2("    normalize.run", function() {
        normalize.run(g);
      });
      time2("    parentDummyChains", function() {
        parentDummyChains(g);
      });
      time2("    addBorderSegments", function() {
        addBorderSegments(g);
      });
      time2("    order", function() {
        order(g);
      });
      time2("    insertSelfEdges", function() {
        insertSelfEdges(g);
      });
      time2("    adjustCoordinateSystem", function() {
        coordinateSystem.adjust(g);
      });
      time2("    position", function() {
        position(g);
      });
      time2("    positionSelfEdges", function() {
        positionSelfEdges(g);
      });
      time2("    removeBorderNodes", function() {
        removeBorderNodes(g);
      });
      time2("    normalize.undo", function() {
        normalize.undo(g);
      });
      time2("    fixupEdgeLabelCoords", function() {
        fixupEdgeLabelCoords(g);
      });
      time2("    undoCoordinateSystem", function() {
        coordinateSystem.undo(g);
      });
      time2("    translateGraph", function() {
        translateGraph(g);
      });
      time2("    assignNodeIntersects", function() {
        assignNodeIntersects(g);
      });
      time2("    reversePoints", function() {
        reversePointsForReversedEdges(g);
      });
      time2("    acyclic.undo", function() {
        acyclic.undo(g);
      });
    }
    function updateInputGraph(inputGraph, layoutGraph) {
      _.forEach(inputGraph.nodes(), function(v) {
        var inputLabel = inputGraph.node(v);
        var layoutLabel = layoutGraph.node(v);
        if (inputLabel) {
          inputLabel.x = layoutLabel.x;
          inputLabel.y = layoutLabel.y;
          if (layoutGraph.children(v).length) {
            inputLabel.width = layoutLabel.width;
            inputLabel.height = layoutLabel.height;
          }
        }
      });
      _.forEach(inputGraph.edges(), function(e) {
        var inputLabel = inputGraph.edge(e);
        var layoutLabel = layoutGraph.edge(e);
        inputLabel.points = layoutLabel.points;
        if (_.has(layoutLabel, "x")) {
          inputLabel.x = layoutLabel.x;
          inputLabel.y = layoutLabel.y;
        }
      });
      inputGraph.graph().width = layoutGraph.graph().width;
      inputGraph.graph().height = layoutGraph.graph().height;
    }
    var graphNumAttrs = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"];
    var graphDefaults = {
      ranksep: 50,
      edgesep: 20,
      nodesep: 50,
      rankdir: "tb"
    };
    var graphAttrs = ["acyclicer", "ranker", "rankdir", "align"];
    var nodeNumAttrs = ["width", "height"];
    var nodeDefaults = {
      width: 0,
      height: 0
    };
    var edgeNumAttrs = ["minlen", "weight", "width", "height", "labeloffset"];
    var edgeDefaults = {
      minlen: 1,
      weight: 1,
      width: 0,
      height: 0,
      labeloffset: 10,
      labelpos: "r"
    };
    var edgeAttrs = ["labelpos"];
    function buildLayoutGraph(inputGraph) {
      var g = new Graph({
        multigraph: true,
        compound: true
      });
      var graph = canonicalize(inputGraph.graph());
      g.setGraph(_.merge({}, graphDefaults, selectNumberAttrs(graph, graphNumAttrs), _.pick(graph, graphAttrs)));
      _.forEach(inputGraph.nodes(), function(v) {
        var node = canonicalize(inputGraph.node(v));
        g.setNode(v, _.defaults(selectNumberAttrs(node, nodeNumAttrs), nodeDefaults));
        g.setParent(v, inputGraph.parent(v));
      });
      _.forEach(inputGraph.edges(), function(e) {
        var edge = canonicalize(inputGraph.edge(e));
        g.setEdge(e, _.merge({}, edgeDefaults, selectNumberAttrs(edge, edgeNumAttrs), _.pick(edge, edgeAttrs)));
      });
      return g;
    }
    function makeSpaceForEdgeLabels(g) {
      var graph = g.graph();
      graph.ranksep /= 2;
      _.forEach(g.edges(), function(e) {
        var edge = g.edge(e);
        edge.minlen *= 2;
        if (edge.labelpos.toLowerCase() !== "c") {
          if (graph.rankdir === "TB" || graph.rankdir === "BT") {
            edge.width += edge.labeloffset;
          } else {
            edge.height += edge.labeloffset;
          }
        }
      });
    }
    function injectEdgeLabelProxies(g) {
      _.forEach(g.edges(), function(e) {
        var edge = g.edge(e);
        if (edge.width && edge.height) {
          var v = g.node(e.v);
          var w = g.node(e.w);
          var label = {
            rank: (w.rank - v.rank) / 2 + v.rank,
            e
          };
          util.addDummyNode(g, "edge-proxy", label, "_ep");
        }
      });
    }
    function assignRankMinMax(g) {
      var maxRank = 0;
      _.forEach(g.nodes(), function(v) {
        var node = g.node(v);
        if (node.borderTop) {
          node.minRank = g.node(node.borderTop).rank;
          node.maxRank = g.node(node.borderBottom).rank;
          maxRank = _.max(maxRank, node.maxRank);
        }
      });
      g.graph().maxRank = maxRank;
    }
    function removeEdgeLabelProxies(g) {
      _.forEach(g.nodes(), function(v) {
        var node = g.node(v);
        if (node.dummy === "edge-proxy") {
          g.edge(node.e).labelRank = node.rank;
          g.removeNode(v);
        }
      });
    }
    function translateGraph(g) {
      var minX = Number.POSITIVE_INFINITY;
      var maxX = 0;
      var minY = Number.POSITIVE_INFINITY;
      var maxY = 0;
      var graphLabel = g.graph();
      var marginX = graphLabel.marginx || 0;
      var marginY = graphLabel.marginy || 0;
      function getExtremes(attrs) {
        var x3 = attrs.x;
        var y3 = attrs.y;
        var w = attrs.width;
        var h = attrs.height;
        minX = Math.min(minX, x3 - w / 2);
        maxX = Math.max(maxX, x3 + w / 2);
        minY = Math.min(minY, y3 - h / 2);
        maxY = Math.max(maxY, y3 + h / 2);
      }
      _.forEach(g.nodes(), function(v) {
        getExtremes(g.node(v));
      });
      _.forEach(g.edges(), function(e) {
        var edge = g.edge(e);
        if (_.has(edge, "x")) {
          getExtremes(edge);
        }
      });
      minX -= marginX;
      minY -= marginY;
      _.forEach(g.nodes(), function(v) {
        var node = g.node(v);
        node.x -= minX;
        node.y -= minY;
      });
      _.forEach(g.edges(), function(e) {
        var edge = g.edge(e);
        _.forEach(edge.points, function(p) {
          p.x -= minX;
          p.y -= minY;
        });
        if (_.has(edge, "x")) {
          edge.x -= minX;
        }
        if (_.has(edge, "y")) {
          edge.y -= minY;
        }
      });
      graphLabel.width = maxX - minX + marginX;
      graphLabel.height = maxY - minY + marginY;
    }
    function assignNodeIntersects(g) {
      _.forEach(g.edges(), function(e) {
        var edge = g.edge(e);
        var nodeV = g.node(e.v);
        var nodeW = g.node(e.w);
        var p1, p2;
        if (!edge.points) {
          edge.points = [];
          p1 = nodeW;
          p2 = nodeV;
        } else {
          p1 = edge.points[0];
          p2 = edge.points[edge.points.length - 1];
        }
        edge.points.unshift(util.intersectRect(nodeV, p1));
        edge.points.push(util.intersectRect(nodeW, p2));
      });
    }
    function fixupEdgeLabelCoords(g) {
      _.forEach(g.edges(), function(e) {
        var edge = g.edge(e);
        if (_.has(edge, "x")) {
          if (edge.labelpos === "l" || edge.labelpos === "r") {
            edge.width -= edge.labeloffset;
          }
          switch (edge.labelpos) {
            case "l":
              edge.x -= edge.width / 2 + edge.labeloffset;
              break;
            case "r":
              edge.x += edge.width / 2 + edge.labeloffset;
              break;
          }
        }
      });
    }
    function reversePointsForReversedEdges(g) {
      _.forEach(g.edges(), function(e) {
        var edge = g.edge(e);
        if (edge.reversed) {
          edge.points.reverse();
        }
      });
    }
    function removeBorderNodes(g) {
      _.forEach(g.nodes(), function(v) {
        if (g.children(v).length) {
          var node = g.node(v);
          var t = g.node(node.borderTop);
          var b = g.node(node.borderBottom);
          var l = g.node(_.last(node.borderLeft));
          var r = g.node(_.last(node.borderRight));
          node.width = Math.abs(r.x - l.x);
          node.height = Math.abs(b.y - t.y);
          node.x = l.x + node.width / 2;
          node.y = t.y + node.height / 2;
        }
      });
      _.forEach(g.nodes(), function(v) {
        if (g.node(v).dummy === "border") {
          g.removeNode(v);
        }
      });
    }
    function removeSelfEdges(g) {
      _.forEach(g.edges(), function(e) {
        if (e.v === e.w) {
          var node = g.node(e.v);
          if (!node.selfEdges) {
            node.selfEdges = [];
          }
          node.selfEdges.push({
            e,
            label: g.edge(e)
          });
          g.removeEdge(e);
        }
      });
    }
    function insertSelfEdges(g) {
      var layers = util.buildLayerMatrix(g);
      _.forEach(layers, function(layer) {
        var orderShift = 0;
        _.forEach(layer, function(v, i) {
          var node = g.node(v);
          node.order = i + orderShift;
          _.forEach(node.selfEdges, function(selfEdge) {
            util.addDummyNode(g, "selfedge", {
              width: selfEdge.label.width,
              height: selfEdge.label.height,
              rank: node.rank,
              order: i + ++orderShift,
              e: selfEdge.e,
              label: selfEdge.label
            }, "_se");
          });
          delete node.selfEdges;
        });
      });
    }
    function positionSelfEdges(g) {
      _.forEach(g.nodes(), function(v) {
        var node = g.node(v);
        if (node.dummy === "selfedge") {
          var selfNode = g.node(node.e.v);
          var x3 = selfNode.x + selfNode.width / 2;
          var y3 = selfNode.y;
          var dx = node.x - x3;
          var dy = selfNode.height / 2;
          g.setEdge(node.e, node.label);
          g.removeNode(v);
          node.label.points = [{
            x: x3 + 2 * dx / 3,
            y: y3 - dy
          }, {
            x: x3 + 5 * dx / 6,
            y: y3 - dy
          }, {
            x: x3 + dx,
            y: y3
          }, {
            x: x3 + 5 * dx / 6,
            y: y3 + dy
          }, {
            x: x3 + 2 * dx / 3,
            y: y3 + dy
          }];
          node.label.x = node.x;
          node.label.y = node.y;
        }
      });
    }
    function selectNumberAttrs(obj, attrs) {
      return _.mapValues(_.pick(obj, attrs), Number);
    }
    function canonicalize(attrs) {
      var newAttrs = {};
      _.forEach(attrs, function(v, k) {
        newAttrs[k.toLowerCase()] = v;
      });
      return newAttrs;
    }
  }
});

// node_modules/dagre/lib/debug.js
var require_debug = __commonJS({
  "node_modules/dagre/lib/debug.js"(exports, module) {
    var _ = require_lodash2();
    var util = require_util();
    var Graph = require_graphlib2().Graph;
    module.exports = {
      debugOrdering
    };
    function debugOrdering(g) {
      var layerMatrix = util.buildLayerMatrix(g);
      var h = new Graph({
        compound: true,
        multigraph: true
      }).setGraph({});
      _.forEach(g.nodes(), function(v) {
        h.setNode(v, {
          label: v
        });
        h.setParent(v, "layer" + g.node(v).rank);
      });
      _.forEach(g.edges(), function(e) {
        h.setEdge(e.v, e.w, {}, e.name);
      });
      _.forEach(layerMatrix, function(layer, i) {
        var layerV = "layer" + i;
        h.setNode(layerV, {
          rank: "same"
        });
        _.reduce(layer, function(u, v) {
          h.setEdge(u, v, {
            style: "invis"
          });
          return v;
        });
      });
      return h;
    }
  }
});

// node_modules/dagre/lib/version.js
var require_version2 = __commonJS({
  "node_modules/dagre/lib/version.js"(exports, module) {
    module.exports = "0.8.5";
  }
});

// node_modules/dagre/index.js
var require_dagre = __commonJS({
  "node_modules/dagre/index.js"(exports, module) {
    module.exports = {
      graphlib: require_graphlib2(),
      layout: require_layout(),
      debug: require_debug(),
      util: {
        time: require_util().time,
        notime: require_util().notime
      },
      version: require_version2()
    };
  }
});

// node_modules/webcola/dist/src/powergraph.js
var require_powergraph = __commonJS({
  "node_modules/webcola/dist/src/powergraph.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PowerEdge = /* @__PURE__ */ function() {
      function PowerEdge2(source, target, type) {
        this.source = source;
        this.target = target;
        this.type = type;
      }
      return PowerEdge2;
    }();
    exports.PowerEdge = PowerEdge;
    var Configuration = function() {
      function Configuration2(n, edges, linkAccessor, rootGroup) {
        var _this = this;
        this.linkAccessor = linkAccessor;
        this.modules = new Array(n);
        this.roots = [];
        if (rootGroup) {
          this.initModulesFromGroup(rootGroup);
        } else {
          this.roots.push(new ModuleSet());
          for (var i = 0; i < n; ++i) this.roots[0].add(this.modules[i] = new Module(i));
        }
        this.R = edges.length;
        edges.forEach(function(e) {
          var s = _this.modules[linkAccessor.getSourceIndex(e)], t = _this.modules[linkAccessor.getTargetIndex(e)], type = linkAccessor.getType(e);
          s.outgoing.add(type, t);
          t.incoming.add(type, s);
        });
      }
      Configuration2.prototype.initModulesFromGroup = function(group3) {
        var moduleSet = new ModuleSet();
        this.roots.push(moduleSet);
        for (var i = 0; i < group3.leaves.length; ++i) {
          var node = group3.leaves[i];
          var module2 = new Module(node.id);
          this.modules[node.id] = module2;
          moduleSet.add(module2);
        }
        if (group3.groups) {
          for (var j = 0; j < group3.groups.length; ++j) {
            var child = group3.groups[j];
            var definition = {};
            for (var prop in child) if (prop !== "leaves" && prop !== "groups" && child.hasOwnProperty(prop)) definition[prop] = child[prop];
            moduleSet.add(new Module(-1 - j, new LinkSets(), new LinkSets(), this.initModulesFromGroup(child), definition));
          }
        }
        return moduleSet;
      };
      Configuration2.prototype.merge = function(a2, b, k) {
        if (k === void 0) {
          k = 0;
        }
        var inInt = a2.incoming.intersection(b.incoming), outInt = a2.outgoing.intersection(b.outgoing);
        var children2 = new ModuleSet();
        children2.add(a2);
        children2.add(b);
        var m2 = new Module(this.modules.length, outInt, inInt, children2);
        this.modules.push(m2);
        var update = function(s, i, o) {
          s.forAll(function(ms, linktype) {
            ms.forAll(function(n) {
              var nls = n[i];
              nls.add(linktype, m2);
              nls.remove(linktype, a2);
              nls.remove(linktype, b);
              a2[o].remove(linktype, n);
              b[o].remove(linktype, n);
            });
          });
        };
        update(outInt, "incoming", "outgoing");
        update(inInt, "outgoing", "incoming");
        this.R -= inInt.count() + outInt.count();
        this.roots[k].remove(a2);
        this.roots[k].remove(b);
        this.roots[k].add(m2);
        return m2;
      };
      Configuration2.prototype.rootMerges = function(k) {
        if (k === void 0) {
          k = 0;
        }
        var rs = this.roots[k].modules();
        var n = rs.length;
        var merges = new Array(n * (n - 1));
        var ctr = 0;
        for (var i = 0, i_ = n - 1; i < i_; ++i) {
          for (var j = i + 1; j < n; ++j) {
            var a2 = rs[i], b = rs[j];
            merges[ctr] = {
              id: ctr,
              nEdges: this.nEdges(a2, b),
              a: a2,
              b
            };
            ctr++;
          }
        }
        return merges;
      };
      Configuration2.prototype.greedyMerge = function() {
        for (var i = 0; i < this.roots.length; ++i) {
          if (this.roots[i].modules().length < 2) continue;
          var ms = this.rootMerges(i).sort(function(a2, b) {
            return a2.nEdges == b.nEdges ? a2.id - b.id : a2.nEdges - b.nEdges;
          });
          var m2 = ms[0];
          if (m2.nEdges >= this.R) continue;
          this.merge(m2.a, m2.b, i);
          return true;
        }
      };
      Configuration2.prototype.nEdges = function(a2, b) {
        var inInt = a2.incoming.intersection(b.incoming), outInt = a2.outgoing.intersection(b.outgoing);
        return this.R - inInt.count() - outInt.count();
      };
      Configuration2.prototype.getGroupHierarchy = function(retargetedEdges) {
        var _this = this;
        var groups2 = [];
        var root2 = {};
        toGroups(this.roots[0], root2, groups2);
        var es = this.allEdges();
        es.forEach(function(e) {
          var a2 = _this.modules[e.source];
          var b = _this.modules[e.target];
          retargetedEdges.push(new PowerEdge(typeof a2.gid === "undefined" ? e.source : groups2[a2.gid], typeof b.gid === "undefined" ? e.target : groups2[b.gid], e.type));
        });
        return groups2;
      };
      Configuration2.prototype.allEdges = function() {
        var es = [];
        Configuration2.getEdges(this.roots[0], es);
        return es;
      };
      Configuration2.getEdges = function(modules, es) {
        modules.forAll(function(m2) {
          m2.getEdges(es);
          Configuration2.getEdges(m2.children, es);
        });
      };
      return Configuration2;
    }();
    exports.Configuration = Configuration;
    function toGroups(modules, group3, groups2) {
      modules.forAll(function(m2) {
        if (m2.isLeaf()) {
          if (!group3.leaves) group3.leaves = [];
          group3.leaves.push(m2.id);
        } else {
          var g = group3;
          m2.gid = groups2.length;
          if (!m2.isIsland() || m2.isPredefined()) {
            g = {
              id: m2.gid
            };
            if (m2.isPredefined()) for (var prop in m2.definition) g[prop] = m2.definition[prop];
            if (!group3.groups) group3.groups = [];
            group3.groups.push(m2.gid);
            groups2.push(g);
          }
          toGroups(m2.children, g, groups2);
        }
      });
    }
    var Module = function() {
      function Module2(id3, outgoing, incoming, children2, definition) {
        if (outgoing === void 0) {
          outgoing = new LinkSets();
        }
        if (incoming === void 0) {
          incoming = new LinkSets();
        }
        if (children2 === void 0) {
          children2 = new ModuleSet();
        }
        this.id = id3;
        this.outgoing = outgoing;
        this.incoming = incoming;
        this.children = children2;
        this.definition = definition;
      }
      Module2.prototype.getEdges = function(es) {
        var _this = this;
        this.outgoing.forAll(function(ms, edgetype) {
          ms.forAll(function(target) {
            es.push(new PowerEdge(_this.id, target.id, edgetype));
          });
        });
      };
      Module2.prototype.isLeaf = function() {
        return this.children.count() === 0;
      };
      Module2.prototype.isIsland = function() {
        return this.outgoing.count() === 0 && this.incoming.count() === 0;
      };
      Module2.prototype.isPredefined = function() {
        return typeof this.definition !== "undefined";
      };
      return Module2;
    }();
    exports.Module = Module;
    function intersection2(m2, n) {
      var i = {};
      for (var v in m2) if (v in n) i[v] = m2[v];
      return i;
    }
    var ModuleSet = function() {
      function ModuleSet2() {
        this.table = {};
      }
      ModuleSet2.prototype.count = function() {
        return Object.keys(this.table).length;
      };
      ModuleSet2.prototype.intersection = function(other) {
        var result = new ModuleSet2();
        result.table = intersection2(this.table, other.table);
        return result;
      };
      ModuleSet2.prototype.intersectionCount = function(other) {
        return this.intersection(other).count();
      };
      ModuleSet2.prototype.contains = function(id3) {
        return id3 in this.table;
      };
      ModuleSet2.prototype.add = function(m2) {
        this.table[m2.id] = m2;
      };
      ModuleSet2.prototype.remove = function(m2) {
        delete this.table[m2.id];
      };
      ModuleSet2.prototype.forAll = function(f) {
        for (var mid in this.table) {
          f(this.table[mid]);
        }
      };
      ModuleSet2.prototype.modules = function() {
        var vs = [];
        this.forAll(function(m2) {
          if (!m2.isPredefined()) vs.push(m2);
        });
        return vs;
      };
      return ModuleSet2;
    }();
    exports.ModuleSet = ModuleSet;
    var LinkSets = function() {
      function LinkSets2() {
        this.sets = {};
        this.n = 0;
      }
      LinkSets2.prototype.count = function() {
        return this.n;
      };
      LinkSets2.prototype.contains = function(id3) {
        var result = false;
        this.forAllModules(function(m2) {
          if (!result && m2.id == id3) {
            result = true;
          }
        });
        return result;
      };
      LinkSets2.prototype.add = function(linktype, m2) {
        var s = linktype in this.sets ? this.sets[linktype] : this.sets[linktype] = new ModuleSet();
        s.add(m2);
        ++this.n;
      };
      LinkSets2.prototype.remove = function(linktype, m2) {
        var ms = this.sets[linktype];
        ms.remove(m2);
        if (ms.count() === 0) {
          delete this.sets[linktype];
        }
        --this.n;
      };
      LinkSets2.prototype.forAll = function(f) {
        for (var linktype in this.sets) {
          f(this.sets[linktype], Number(linktype));
        }
      };
      LinkSets2.prototype.forAllModules = function(f) {
        this.forAll(function(ms, lt) {
          return ms.forAll(f);
        });
      };
      LinkSets2.prototype.intersection = function(other) {
        var result = new LinkSets2();
        this.forAll(function(ms, lt) {
          if (lt in other.sets) {
            var i = ms.intersection(other.sets[lt]), n = i.count();
            if (n > 0) {
              result.sets[lt] = i;
              result.n += n;
            }
          }
        });
        return result;
      };
      return LinkSets2;
    }();
    exports.LinkSets = LinkSets;
    function getGroups(nodes, links, la, rootGroup) {
      var n = nodes.length, c2 = new Configuration(n, links, la, rootGroup);
      while (c2.greedyMerge()) ;
      var powerEdges = [];
      var g = c2.getGroupHierarchy(powerEdges);
      powerEdges.forEach(function(e) {
        var f = function(end) {
          var g2 = e[end];
          if (typeof g2 == "number") e[end] = nodes[g2];
        };
        f("source");
        f("target");
      });
      return {
        groups: g,
        powerEdges
      };
    }
    exports.getGroups = getGroups;
  }
});

// node_modules/webcola/dist/src/linklengths.js
var require_linklengths = __commonJS({
  "node_modules/webcola/dist/src/linklengths.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function unionCount(a2, b) {
      var u = {};
      for (var i in a2) u[i] = {};
      for (var i in b) u[i] = {};
      return Object.keys(u).length;
    }
    function intersectionCount(a2, b) {
      var n = 0;
      for (var i in a2) if (typeof b[i] !== "undefined") ++n;
      return n;
    }
    function getNeighbours(links, la) {
      var neighbours = {};
      var addNeighbours = function(u, v) {
        if (typeof neighbours[u] === "undefined") neighbours[u] = {};
        neighbours[u][v] = {};
      };
      links.forEach(function(e) {
        var u = la.getSourceIndex(e), v = la.getTargetIndex(e);
        addNeighbours(u, v);
        addNeighbours(v, u);
      });
      return neighbours;
    }
    function computeLinkLengths(links, w, f, la) {
      var neighbours = getNeighbours(links, la);
      links.forEach(function(l) {
        var a2 = neighbours[la.getSourceIndex(l)];
        var b = neighbours[la.getTargetIndex(l)];
        la.setLength(l, 1 + w * f(a2, b));
      });
    }
    function symmetricDiffLinkLengths(links, la, w) {
      if (w === void 0) {
        w = 1;
      }
      computeLinkLengths(links, w, function(a2, b) {
        return Math.sqrt(unionCount(a2, b) - intersectionCount(a2, b));
      }, la);
    }
    exports.symmetricDiffLinkLengths = symmetricDiffLinkLengths;
    function jaccardLinkLengths(links, la, w) {
      if (w === void 0) {
        w = 1;
      }
      computeLinkLengths(links, w, function(a2, b) {
        return Math.min(Object.keys(a2).length, Object.keys(b).length) < 1.1 ? 0 : intersectionCount(a2, b) / unionCount(a2, b);
      }, la);
    }
    exports.jaccardLinkLengths = jaccardLinkLengths;
    function generateDirectedEdgeConstraints(n, links, axis, la) {
      var components = stronglyConnectedComponents(n, links, la);
      var nodes = {};
      components.forEach(function(c2, i) {
        return c2.forEach(function(v) {
          return nodes[v] = i;
        });
      });
      var constraints = [];
      links.forEach(function(l) {
        var ui = la.getSourceIndex(l), vi = la.getTargetIndex(l), u = nodes[ui], v = nodes[vi];
        if (u !== v) {
          constraints.push({
            axis,
            left: ui,
            right: vi,
            gap: la.getMinSeparation(l)
          });
        }
      });
      return constraints;
    }
    exports.generateDirectedEdgeConstraints = generateDirectedEdgeConstraints;
    function stronglyConnectedComponents(numVertices, edges, la) {
      var nodes = [];
      var index3 = 0;
      var stack = [];
      var components = [];
      function strongConnect(v2) {
        v2.index = v2.lowlink = index3++;
        stack.push(v2);
        v2.onStack = true;
        for (var _i2 = 0, _a2 = v2.out; _i2 < _a2.length; _i2++) {
          var w2 = _a2[_i2];
          if (typeof w2.index === "undefined") {
            strongConnect(w2);
            v2.lowlink = Math.min(v2.lowlink, w2.lowlink);
          } else if (w2.onStack) {
            v2.lowlink = Math.min(v2.lowlink, w2.index);
          }
        }
        if (v2.lowlink === v2.index) {
          var component = [];
          while (stack.length) {
            w2 = stack.pop();
            w2.onStack = false;
            component.push(w2);
            if (w2 === v2) break;
          }
          components.push(component.map(function(v3) {
            return v3.id;
          }));
        }
      }
      for (var i = 0; i < numVertices; i++) {
        nodes.push({
          id: i,
          out: []
        });
      }
      for (var _i = 0, edges_1 = edges; _i < edges_1.length; _i++) {
        var e = edges_1[_i];
        var v_1 = nodes[la.getSourceIndex(e)], w = nodes[la.getTargetIndex(e)];
        v_1.out.push(w);
      }
      for (var _a = 0, nodes_1 = nodes; _a < nodes_1.length; _a++) {
        var v = nodes_1[_a];
        if (typeof v.index === "undefined") strongConnect(v);
      }
      return components;
    }
    exports.stronglyConnectedComponents = stronglyConnectedComponents;
  }
});

// node_modules/webcola/dist/src/descent.js
var require_descent = __commonJS({
  "node_modules/webcola/dist/src/descent.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Locks = function() {
      function Locks2() {
        this.locks = {};
      }
      Locks2.prototype.add = function(id3, x3) {
        this.locks[id3] = x3;
      };
      Locks2.prototype.clear = function() {
        this.locks = {};
      };
      Locks2.prototype.isEmpty = function() {
        for (var l in this.locks) return false;
        return true;
      };
      Locks2.prototype.apply = function(f) {
        for (var l in this.locks) {
          f(Number(l), this.locks[l]);
        }
      };
      return Locks2;
    }();
    exports.Locks = Locks;
    var Descent = function() {
      function Descent2(x3, D2, G) {
        if (G === void 0) {
          G = null;
        }
        this.D = D2;
        this.G = G;
        this.threshold = 1e-4;
        this.numGridSnapNodes = 0;
        this.snapGridSize = 100;
        this.snapStrength = 1e3;
        this.scaleSnapByMaxH = false;
        this.random = new PseudoRandom();
        this.project = null;
        this.x = x3;
        this.k = x3.length;
        var n = this.n = x3[0].length;
        this.H = new Array(this.k);
        this.g = new Array(this.k);
        this.Hd = new Array(this.k);
        this.a = new Array(this.k);
        this.b = new Array(this.k);
        this.c = new Array(this.k);
        this.d = new Array(this.k);
        this.e = new Array(this.k);
        this.ia = new Array(this.k);
        this.ib = new Array(this.k);
        this.xtmp = new Array(this.k);
        this.locks = new Locks();
        this.minD = Number.MAX_VALUE;
        var i = n, j;
        while (i--) {
          j = n;
          while (--j > i) {
            var d = D2[i][j];
            if (d > 0 && d < this.minD) {
              this.minD = d;
            }
          }
        }
        if (this.minD === Number.MAX_VALUE) this.minD = 1;
        i = this.k;
        while (i--) {
          this.g[i] = new Array(n);
          this.H[i] = new Array(n);
          j = n;
          while (j--) {
            this.H[i][j] = new Array(n);
          }
          this.Hd[i] = new Array(n);
          this.a[i] = new Array(n);
          this.b[i] = new Array(n);
          this.c[i] = new Array(n);
          this.d[i] = new Array(n);
          this.e[i] = new Array(n);
          this.ia[i] = new Array(n);
          this.ib[i] = new Array(n);
          this.xtmp[i] = new Array(n);
        }
      }
      Descent2.createSquareMatrix = function(n, f) {
        var M = new Array(n);
        for (var i = 0; i < n; ++i) {
          M[i] = new Array(n);
          for (var j = 0; j < n; ++j) {
            M[i][j] = f(i, j);
          }
        }
        return M;
      };
      Descent2.prototype.offsetDir = function() {
        var _this = this;
        var u = new Array(this.k);
        var l = 0;
        for (var i = 0; i < this.k; ++i) {
          var x3 = u[i] = this.random.getNextBetween(0.01, 1) - 0.5;
          l += x3 * x3;
        }
        l = Math.sqrt(l);
        return u.map(function(x4) {
          return x4 *= _this.minD / l;
        });
      };
      Descent2.prototype.computeDerivatives = function(x3) {
        var _this = this;
        var n = this.n;
        if (n < 1) return;
        var i;
        var d = new Array(this.k);
        var d2 = new Array(this.k);
        var Huu = new Array(this.k);
        var maxH = 0;
        for (var u = 0; u < n; ++u) {
          for (i = 0; i < this.k; ++i) Huu[i] = this.g[i][u] = 0;
          for (var v = 0; v < n; ++v) {
            if (u === v) continue;
            var maxDisplaces = n;
            while (maxDisplaces--) {
              var sd2 = 0;
              for (i = 0; i < this.k; ++i) {
                var dx = d[i] = x3[i][u] - x3[i][v];
                sd2 += d2[i] = dx * dx;
              }
              if (sd2 > 1e-9) break;
              var rd = this.offsetDir();
              for (i = 0; i < this.k; ++i) x3[i][v] += rd[i];
            }
            var l = Math.sqrt(sd2);
            var D2 = this.D[u][v];
            var weight = this.G != null ? this.G[u][v] : 1;
            if (weight > 1 && l > D2 || !isFinite(D2)) {
              for (i = 0; i < this.k; ++i) this.H[i][u][v] = 0;
              continue;
            }
            if (weight > 1) {
              weight = 1;
            }
            var D22 = D2 * D2;
            var gs = 2 * weight * (l - D2) / (D22 * l);
            var l3 = l * l * l;
            var hs = 2 * -weight / (D22 * l3);
            if (!isFinite(gs)) console.log(gs);
            for (i = 0; i < this.k; ++i) {
              this.g[i][u] += d[i] * gs;
              Huu[i] -= this.H[i][u][v] = hs * (l3 + D2 * (d2[i] - sd2) + l * sd2);
            }
          }
          for (i = 0; i < this.k; ++i) maxH = Math.max(maxH, this.H[i][u][u] = Huu[i]);
        }
        var r = this.snapGridSize / 2;
        var g = this.snapGridSize;
        var w = this.snapStrength;
        var k = w / (r * r);
        var numNodes = this.numGridSnapNodes;
        for (var u = 0; u < numNodes; ++u) {
          for (i = 0; i < this.k; ++i) {
            var xiu = this.x[i][u];
            var m2 = xiu / g;
            var f = m2 % 1;
            var q = m2 - f;
            var a2 = Math.abs(f);
            var dx = a2 <= 0.5 ? xiu - q * g : xiu > 0 ? xiu - (q + 1) * g : xiu - (q - 1) * g;
            if (-r < dx && dx <= r) {
              if (this.scaleSnapByMaxH) {
                this.g[i][u] += maxH * k * dx;
                this.H[i][u][u] += maxH * k;
              } else {
                this.g[i][u] += k * dx;
                this.H[i][u][u] += k;
              }
            }
          }
        }
        if (!this.locks.isEmpty()) {
          this.locks.apply(function(u2, p) {
            for (i = 0; i < _this.k; ++i) {
              _this.H[i][u2][u2] += maxH;
              _this.g[i][u2] -= maxH * (p[i] - x3[i][u2]);
            }
          });
        }
      };
      Descent2.dotProd = function(a2, b) {
        var x3 = 0, i = a2.length;
        while (i--) x3 += a2[i] * b[i];
        return x3;
      };
      Descent2.rightMultiply = function(m2, v, r) {
        var i = m2.length;
        while (i--) r[i] = Descent2.dotProd(m2[i], v);
      };
      Descent2.prototype.computeStepSize = function(d) {
        var numerator = 0, denominator = 0;
        for (var i = 0; i < this.k; ++i) {
          numerator += Descent2.dotProd(this.g[i], d[i]);
          Descent2.rightMultiply(this.H[i], d[i], this.Hd[i]);
          denominator += Descent2.dotProd(d[i], this.Hd[i]);
        }
        if (denominator === 0 || !isFinite(denominator)) return 0;
        return 1 * numerator / denominator;
      };
      Descent2.prototype.reduceStress = function() {
        this.computeDerivatives(this.x);
        var alpha = this.computeStepSize(this.g);
        for (var i = 0; i < this.k; ++i) {
          this.takeDescentStep(this.x[i], this.g[i], alpha);
        }
        return this.computeStress();
      };
      Descent2.copy = function(a2, b) {
        var m2 = a2.length, n = b[0].length;
        for (var i = 0; i < m2; ++i) {
          for (var j = 0; j < n; ++j) {
            b[i][j] = a2[i][j];
          }
        }
      };
      Descent2.prototype.stepAndProject = function(x0, r, d, stepSize) {
        Descent2.copy(x0, r);
        this.takeDescentStep(r[0], d[0], stepSize);
        if (this.project) this.project[0](x0[0], x0[1], r[0]);
        this.takeDescentStep(r[1], d[1], stepSize);
        if (this.project) this.project[1](r[0], x0[1], r[1]);
        for (var i = 2; i < this.k; i++) this.takeDescentStep(r[i], d[i], stepSize);
      };
      Descent2.mApply = function(m2, n, f) {
        var i = m2;
        while (i-- > 0) {
          var j = n;
          while (j-- > 0) f(i, j);
        }
      };
      Descent2.prototype.matrixApply = function(f) {
        Descent2.mApply(this.k, this.n, f);
      };
      Descent2.prototype.computeNextPosition = function(x0, r) {
        var _this = this;
        this.computeDerivatives(x0);
        var alpha = this.computeStepSize(this.g);
        this.stepAndProject(x0, r, this.g, alpha);
        if (this.project) {
          this.matrixApply(function(i, j) {
            return _this.e[i][j] = x0[i][j] - r[i][j];
          });
          var beta = this.computeStepSize(this.e);
          beta = Math.max(0.2, Math.min(beta, 1));
          this.stepAndProject(x0, r, this.e, beta);
        }
      };
      Descent2.prototype.run = function(iterations) {
        var stress = Number.MAX_VALUE, converged = false;
        while (!converged && iterations-- > 0) {
          var s = this.rungeKutta();
          converged = Math.abs(stress / s - 1) < this.threshold;
          stress = s;
        }
        return stress;
      };
      Descent2.prototype.rungeKutta = function() {
        var _this = this;
        this.computeNextPosition(this.x, this.a);
        Descent2.mid(this.x, this.a, this.ia);
        this.computeNextPosition(this.ia, this.b);
        Descent2.mid(this.x, this.b, this.ib);
        this.computeNextPosition(this.ib, this.c);
        this.computeNextPosition(this.c, this.d);
        var disp = 0;
        this.matrixApply(function(i, j) {
          var x3 = (_this.a[i][j] + 2 * _this.b[i][j] + 2 * _this.c[i][j] + _this.d[i][j]) / 6, d = _this.x[i][j] - x3;
          disp += d * d;
          _this.x[i][j] = x3;
        });
        return disp;
      };
      Descent2.mid = function(a2, b, m2) {
        Descent2.mApply(a2.length, a2[0].length, function(i, j) {
          return m2[i][j] = a2[i][j] + (b[i][j] - a2[i][j]) / 2;
        });
      };
      Descent2.prototype.takeDescentStep = function(x3, d, stepSize) {
        for (var i = 0; i < this.n; ++i) {
          x3[i] = x3[i] - stepSize * d[i];
        }
      };
      Descent2.prototype.computeStress = function() {
        var stress = 0;
        for (var u = 0, nMinus1 = this.n - 1; u < nMinus1; ++u) {
          for (var v = u + 1, n = this.n; v < n; ++v) {
            var l = 0;
            for (var i = 0; i < this.k; ++i) {
              var dx = this.x[i][u] - this.x[i][v];
              l += dx * dx;
            }
            l = Math.sqrt(l);
            var d = this.D[u][v];
            if (!isFinite(d)) continue;
            var rl = d - l;
            var d2 = d * d;
            stress += rl * rl / d2;
          }
        }
        return stress;
      };
      Descent2.zeroDistance = 1e-10;
      return Descent2;
    }();
    exports.Descent = Descent;
    var PseudoRandom = function() {
      function PseudoRandom2(seed) {
        if (seed === void 0) {
          seed = 1;
        }
        this.seed = seed;
        this.a = 214013;
        this.c = 2531011;
        this.m = 2147483648;
        this.range = 32767;
      }
      PseudoRandom2.prototype.getNext = function() {
        this.seed = (this.seed * this.a + this.c) % this.m;
        return (this.seed >> 16) / this.range;
      };
      PseudoRandom2.prototype.getNextBetween = function(min2, max2) {
        return min2 + this.getNext() * (max2 - min2);
      };
      return PseudoRandom2;
    }();
    exports.PseudoRandom = PseudoRandom;
  }
});

// node_modules/webcola/dist/src/vpsc.js
var require_vpsc = __commonJS({
  "node_modules/webcola/dist/src/vpsc.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PositionStats = function() {
      function PositionStats2(scale2) {
        this.scale = scale2;
        this.AB = 0;
        this.AD = 0;
        this.A2 = 0;
      }
      PositionStats2.prototype.addVariable = function(v) {
        var ai = this.scale / v.scale;
        var bi = v.offset / v.scale;
        var wi = v.weight;
        this.AB += wi * ai * bi;
        this.AD += wi * ai * v.desiredPosition;
        this.A2 += wi * ai * ai;
      };
      PositionStats2.prototype.getPosn = function() {
        return (this.AD - this.AB) / this.A2;
      };
      return PositionStats2;
    }();
    exports.PositionStats = PositionStats;
    var Constraint = function() {
      function Constraint2(left, right, gap, equality) {
        if (equality === void 0) {
          equality = false;
        }
        this.left = left;
        this.right = right;
        this.gap = gap;
        this.equality = equality;
        this.active = false;
        this.unsatisfiable = false;
        this.left = left;
        this.right = right;
        this.gap = gap;
        this.equality = equality;
      }
      Constraint2.prototype.slack = function() {
        return this.unsatisfiable ? Number.MAX_VALUE : this.right.scale * this.right.position() - this.gap - this.left.scale * this.left.position();
      };
      return Constraint2;
    }();
    exports.Constraint = Constraint;
    var Variable = function() {
      function Variable2(desiredPosition, weight, scale2) {
        if (weight === void 0) {
          weight = 1;
        }
        if (scale2 === void 0) {
          scale2 = 1;
        }
        this.desiredPosition = desiredPosition;
        this.weight = weight;
        this.scale = scale2;
        this.offset = 0;
      }
      Variable2.prototype.dfdv = function() {
        return 2 * this.weight * (this.position() - this.desiredPosition);
      };
      Variable2.prototype.position = function() {
        return (this.block.ps.scale * this.block.posn + this.offset) / this.scale;
      };
      Variable2.prototype.visitNeighbours = function(prev, f) {
        var ff = function(c2, next) {
          return c2.active && prev !== next && f(c2, next);
        };
        this.cOut.forEach(function(c2) {
          return ff(c2, c2.right);
        });
        this.cIn.forEach(function(c2) {
          return ff(c2, c2.left);
        });
      };
      return Variable2;
    }();
    exports.Variable = Variable;
    var Block = function() {
      function Block2(v) {
        this.vars = [];
        v.offset = 0;
        this.ps = new PositionStats(v.scale);
        this.addVariable(v);
      }
      Block2.prototype.addVariable = function(v) {
        v.block = this;
        this.vars.push(v);
        this.ps.addVariable(v);
        this.posn = this.ps.getPosn();
      };
      Block2.prototype.updateWeightedPosition = function() {
        this.ps.AB = this.ps.AD = this.ps.A2 = 0;
        for (var i = 0, n = this.vars.length; i < n; ++i) this.ps.addVariable(this.vars[i]);
        this.posn = this.ps.getPosn();
      };
      Block2.prototype.compute_lm = function(v, u, postAction) {
        var _this = this;
        var dfdv = v.dfdv();
        v.visitNeighbours(u, function(c2, next) {
          var _dfdv = _this.compute_lm(next, v, postAction);
          if (next === c2.right) {
            dfdv += _dfdv * c2.left.scale;
            c2.lm = _dfdv;
          } else {
            dfdv += _dfdv * c2.right.scale;
            c2.lm = -_dfdv;
          }
          postAction(c2);
        });
        return dfdv / v.scale;
      };
      Block2.prototype.populateSplitBlock = function(v, prev) {
        var _this = this;
        v.visitNeighbours(prev, function(c2, next) {
          next.offset = v.offset + (next === c2.right ? c2.gap : -c2.gap);
          _this.addVariable(next);
          _this.populateSplitBlock(next, v);
        });
      };
      Block2.prototype.traverse = function(visit, acc, v, prev) {
        var _this = this;
        if (v === void 0) {
          v = this.vars[0];
        }
        if (prev === void 0) {
          prev = null;
        }
        v.visitNeighbours(prev, function(c2, next) {
          acc.push(visit(c2));
          _this.traverse(visit, acc, next, v);
        });
      };
      Block2.prototype.findMinLM = function() {
        var m2 = null;
        this.compute_lm(this.vars[0], null, function(c2) {
          if (!c2.equality && (m2 === null || c2.lm < m2.lm)) m2 = c2;
        });
        return m2;
      };
      Block2.prototype.findMinLMBetween = function(lv, rv) {
        this.compute_lm(lv, null, function() {
        });
        var m2 = null;
        this.findPath(lv, null, rv, function(c2, next) {
          if (!c2.equality && c2.right === next && (m2 === null || c2.lm < m2.lm)) m2 = c2;
        });
        return m2;
      };
      Block2.prototype.findPath = function(v, prev, to, visit) {
        var _this = this;
        var endFound = false;
        v.visitNeighbours(prev, function(c2, next) {
          if (!endFound && (next === to || _this.findPath(next, v, to, visit))) {
            endFound = true;
            visit(c2, next);
          }
        });
        return endFound;
      };
      Block2.prototype.isActiveDirectedPathBetween = function(u, v) {
        if (u === v) return true;
        var i = u.cOut.length;
        while (i--) {
          var c2 = u.cOut[i];
          if (c2.active && this.isActiveDirectedPathBetween(c2.right, v)) return true;
        }
        return false;
      };
      Block2.split = function(c2) {
        c2.active = false;
        return [Block2.createSplitBlock(c2.left), Block2.createSplitBlock(c2.right)];
      };
      Block2.createSplitBlock = function(startVar) {
        var b = new Block2(startVar);
        b.populateSplitBlock(startVar, null);
        return b;
      };
      Block2.prototype.splitBetween = function(vl, vr) {
        var c2 = this.findMinLMBetween(vl, vr);
        if (c2 !== null) {
          var bs = Block2.split(c2);
          return {
            constraint: c2,
            lb: bs[0],
            rb: bs[1]
          };
        }
        return null;
      };
      Block2.prototype.mergeAcross = function(b, c2, dist) {
        c2.active = true;
        for (var i = 0, n = b.vars.length; i < n; ++i) {
          var v = b.vars[i];
          v.offset += dist;
          this.addVariable(v);
        }
        this.posn = this.ps.getPosn();
      };
      Block2.prototype.cost = function() {
        var sum2 = 0, i = this.vars.length;
        while (i--) {
          var v = this.vars[i], d = v.position() - v.desiredPosition;
          sum2 += d * d * v.weight;
        }
        return sum2;
      };
      return Block2;
    }();
    exports.Block = Block;
    var Blocks = function() {
      function Blocks2(vs) {
        this.vs = vs;
        var n = vs.length;
        this.list = new Array(n);
        while (n--) {
          var b = new Block(vs[n]);
          this.list[n] = b;
          b.blockInd = n;
        }
      }
      Blocks2.prototype.cost = function() {
        var sum2 = 0, i = this.list.length;
        while (i--) sum2 += this.list[i].cost();
        return sum2;
      };
      Blocks2.prototype.insert = function(b) {
        b.blockInd = this.list.length;
        this.list.push(b);
      };
      Blocks2.prototype.remove = function(b) {
        var last = this.list.length - 1;
        var swapBlock = this.list[last];
        this.list.length = last;
        if (b !== swapBlock) {
          this.list[b.blockInd] = swapBlock;
          swapBlock.blockInd = b.blockInd;
        }
      };
      Blocks2.prototype.merge = function(c2) {
        var l = c2.left.block, r = c2.right.block;
        var dist = c2.right.offset - c2.left.offset - c2.gap;
        if (l.vars.length < r.vars.length) {
          r.mergeAcross(l, c2, dist);
          this.remove(l);
        } else {
          l.mergeAcross(r, c2, -dist);
          this.remove(r);
        }
      };
      Blocks2.prototype.forEach = function(f) {
        this.list.forEach(f);
      };
      Blocks2.prototype.updateBlockPositions = function() {
        this.list.forEach(function(b) {
          return b.updateWeightedPosition();
        });
      };
      Blocks2.prototype.split = function(inactive) {
        var _this = this;
        this.updateBlockPositions();
        this.list.forEach(function(b) {
          var v = b.findMinLM();
          if (v !== null && v.lm < Solver.LAGRANGIAN_TOLERANCE) {
            b = v.left.block;
            Block.split(v).forEach(function(nb) {
              return _this.insert(nb);
            });
            _this.remove(b);
            inactive.push(v);
          }
        });
      };
      return Blocks2;
    }();
    exports.Blocks = Blocks;
    var Solver = function() {
      function Solver2(vs, cs) {
        this.vs = vs;
        this.cs = cs;
        this.vs = vs;
        vs.forEach(function(v) {
          v.cIn = [], v.cOut = [];
        });
        this.cs = cs;
        cs.forEach(function(c2) {
          c2.left.cOut.push(c2);
          c2.right.cIn.push(c2);
        });
        this.inactive = cs.map(function(c2) {
          c2.active = false;
          return c2;
        });
        this.bs = null;
      }
      Solver2.prototype.cost = function() {
        return this.bs.cost();
      };
      Solver2.prototype.setStartingPositions = function(ps) {
        this.inactive = this.cs.map(function(c2) {
          c2.active = false;
          return c2;
        });
        this.bs = new Blocks(this.vs);
        this.bs.forEach(function(b, i) {
          return b.posn = ps[i];
        });
      };
      Solver2.prototype.setDesiredPositions = function(ps) {
        this.vs.forEach(function(v, i) {
          return v.desiredPosition = ps[i];
        });
      };
      Solver2.prototype.mostViolated = function() {
        var minSlack = Number.MAX_VALUE, v = null, l = this.inactive, n = l.length, deletePoint = n;
        for (var i = 0; i < n; ++i) {
          var c2 = l[i];
          if (c2.unsatisfiable) continue;
          var slack = c2.slack();
          if (c2.equality || slack < minSlack) {
            minSlack = slack;
            v = c2;
            deletePoint = i;
            if (c2.equality) break;
          }
        }
        if (deletePoint !== n && (minSlack < Solver2.ZERO_UPPERBOUND && !v.active || v.equality)) {
          l[deletePoint] = l[n - 1];
          l.length = n - 1;
        }
        return v;
      };
      Solver2.prototype.satisfy = function() {
        if (this.bs == null) {
          this.bs = new Blocks(this.vs);
        }
        this.bs.split(this.inactive);
        var v = null;
        while ((v = this.mostViolated()) && (v.equality || v.slack() < Solver2.ZERO_UPPERBOUND && !v.active)) {
          var lb = v.left.block, rb = v.right.block;
          if (lb !== rb) {
            this.bs.merge(v);
          } else {
            if (lb.isActiveDirectedPathBetween(v.right, v.left)) {
              v.unsatisfiable = true;
              continue;
            }
            var split = lb.splitBetween(v.left, v.right);
            if (split !== null) {
              this.bs.insert(split.lb);
              this.bs.insert(split.rb);
              this.bs.remove(lb);
              this.inactive.push(split.constraint);
            } else {
              v.unsatisfiable = true;
              continue;
            }
            if (v.slack() >= 0) {
              this.inactive.push(v);
            } else {
              this.bs.merge(v);
            }
          }
        }
      };
      Solver2.prototype.solve = function() {
        this.satisfy();
        var lastcost = Number.MAX_VALUE, cost = this.bs.cost();
        while (Math.abs(lastcost - cost) > 1e-4) {
          this.satisfy();
          lastcost = cost;
          cost = this.bs.cost();
        }
        return cost;
      };
      Solver2.LAGRANGIAN_TOLERANCE = -1e-4;
      Solver2.ZERO_UPPERBOUND = -1e-10;
      return Solver2;
    }();
    exports.Solver = Solver;
    function removeOverlapInOneDimension(spans, lowerBound, upperBound) {
      var vs = spans.map(function(s) {
        return new Variable(s.desiredCenter);
      });
      var cs = [];
      var n = spans.length;
      for (var i = 0; i < n - 1; i++) {
        var left = spans[i], right = spans[i + 1];
        cs.push(new Constraint(vs[i], vs[i + 1], (left.size + right.size) / 2));
      }
      var leftMost = vs[0], rightMost = vs[n - 1], leftMostSize = spans[0].size / 2, rightMostSize = spans[n - 1].size / 2;
      var vLower = null, vUpper = null;
      if (lowerBound) {
        vLower = new Variable(lowerBound, leftMost.weight * 1e3);
        vs.push(vLower);
        cs.push(new Constraint(vLower, leftMost, leftMostSize));
      }
      if (upperBound) {
        vUpper = new Variable(upperBound, rightMost.weight * 1e3);
        vs.push(vUpper);
        cs.push(new Constraint(rightMost, vUpper, rightMostSize));
      }
      var solver = new Solver(vs, cs);
      solver.solve();
      return {
        newCenters: vs.slice(0, spans.length).map(function(v) {
          return v.position();
        }),
        lowerBound: vLower ? vLower.position() : leftMost.position() - leftMostSize,
        upperBound: vUpper ? vUpper.position() : rightMost.position() + rightMostSize
      };
    }
    exports.removeOverlapInOneDimension = removeOverlapInOneDimension;
  }
});

// node_modules/webcola/dist/src/rbtree.js
var require_rbtree = __commonJS({
  "node_modules/webcola/dist/src/rbtree.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d2, b10) {
          d2.__proto__ = b10;
        } || function(d2, b10) {
          for (var p in b10) if (b10.hasOwnProperty(p)) d2[p] = b10[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var TreeBase = function() {
      function TreeBase2() {
        this.findIter = function(data) {
          var res = this._root;
          var iter = this.iterator();
          while (res !== null) {
            var c2 = this._comparator(data, res.data);
            if (c2 === 0) {
              iter._cursor = res;
              return iter;
            } else {
              iter._ancestors.push(res);
              res = res.get_child(c2 > 0);
            }
          }
          return null;
        };
      }
      TreeBase2.prototype.clear = function() {
        this._root = null;
        this.size = 0;
      };
      ;
      TreeBase2.prototype.find = function(data) {
        var res = this._root;
        while (res !== null) {
          var c2 = this._comparator(data, res.data);
          if (c2 === 0) {
            return res.data;
          } else {
            res = res.get_child(c2 > 0);
          }
        }
        return null;
      };
      ;
      TreeBase2.prototype.lowerBound = function(data) {
        return this._bound(data, this._comparator);
      };
      ;
      TreeBase2.prototype.upperBound = function(data) {
        var cmp = this._comparator;
        function reverse_cmp(a2, b) {
          return cmp(b, a2);
        }
        return this._bound(data, reverse_cmp);
      };
      ;
      TreeBase2.prototype.min = function() {
        var res = this._root;
        if (res === null) {
          return null;
        }
        while (res.left !== null) {
          res = res.left;
        }
        return res.data;
      };
      ;
      TreeBase2.prototype.max = function() {
        var res = this._root;
        if (res === null) {
          return null;
        }
        while (res.right !== null) {
          res = res.right;
        }
        return res.data;
      };
      ;
      TreeBase2.prototype.iterator = function() {
        return new Iterator(this);
      };
      ;
      TreeBase2.prototype.each = function(cb) {
        var it = this.iterator(), data;
        while ((data = it.next()) !== null) {
          cb(data);
        }
      };
      ;
      TreeBase2.prototype.reach = function(cb) {
        var it = this.iterator(), data;
        while ((data = it.prev()) !== null) {
          cb(data);
        }
      };
      ;
      TreeBase2.prototype._bound = function(data, cmp) {
        var cur = this._root;
        var iter = this.iterator();
        while (cur !== null) {
          var c2 = this._comparator(data, cur.data);
          if (c2 === 0) {
            iter._cursor = cur;
            return iter;
          }
          iter._ancestors.push(cur);
          cur = cur.get_child(c2 > 0);
        }
        for (var i = iter._ancestors.length - 1; i >= 0; --i) {
          cur = iter._ancestors[i];
          if (cmp(data, cur.data) > 0) {
            iter._cursor = cur;
            iter._ancestors.length = i;
            return iter;
          }
        }
        iter._ancestors.length = 0;
        return iter;
      };
      ;
      return TreeBase2;
    }();
    exports.TreeBase = TreeBase;
    var Iterator = function() {
      function Iterator2(tree) {
        this._tree = tree;
        this._ancestors = [];
        this._cursor = null;
      }
      Iterator2.prototype.data = function() {
        return this._cursor !== null ? this._cursor.data : null;
      };
      ;
      Iterator2.prototype.next = function() {
        if (this._cursor === null) {
          var root2 = this._tree._root;
          if (root2 !== null) {
            this._minNode(root2);
          }
        } else {
          if (this._cursor.right === null) {
            var save;
            do {
              save = this._cursor;
              if (this._ancestors.length) {
                this._cursor = this._ancestors.pop();
              } else {
                this._cursor = null;
                break;
              }
            } while (this._cursor.right === save);
          } else {
            this._ancestors.push(this._cursor);
            this._minNode(this._cursor.right);
          }
        }
        return this._cursor !== null ? this._cursor.data : null;
      };
      ;
      Iterator2.prototype.prev = function() {
        if (this._cursor === null) {
          var root2 = this._tree._root;
          if (root2 !== null) {
            this._maxNode(root2);
          }
        } else {
          if (this._cursor.left === null) {
            var save;
            do {
              save = this._cursor;
              if (this._ancestors.length) {
                this._cursor = this._ancestors.pop();
              } else {
                this._cursor = null;
                break;
              }
            } while (this._cursor.left === save);
          } else {
            this._ancestors.push(this._cursor);
            this._maxNode(this._cursor.left);
          }
        }
        return this._cursor !== null ? this._cursor.data : null;
      };
      ;
      Iterator2.prototype._minNode = function(start2) {
        while (start2.left !== null) {
          this._ancestors.push(start2);
          start2 = start2.left;
        }
        this._cursor = start2;
      };
      ;
      Iterator2.prototype._maxNode = function(start2) {
        while (start2.right !== null) {
          this._ancestors.push(start2);
          start2 = start2.right;
        }
        this._cursor = start2;
      };
      ;
      return Iterator2;
    }();
    exports.Iterator = Iterator;
    var Node = function() {
      function Node2(data) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.red = true;
      }
      Node2.prototype.get_child = function(dir) {
        return dir ? this.right : this.left;
      };
      ;
      Node2.prototype.set_child = function(dir, val) {
        if (dir) {
          this.right = val;
        } else {
          this.left = val;
        }
      };
      ;
      return Node2;
    }();
    var RBTree = function(_super) {
      __extends(RBTree2, _super);
      function RBTree2(comparator) {
        var _this = _super.call(this) || this;
        _this._root = null;
        _this._comparator = comparator;
        _this.size = 0;
        return _this;
      }
      RBTree2.prototype.insert = function(data) {
        var ret = false;
        if (this._root === null) {
          this._root = new Node(data);
          ret = true;
          this.size++;
        } else {
          var head = new Node(void 0);
          var dir = false;
          var last = false;
          var gp = null;
          var ggp = head;
          var p = null;
          var node = this._root;
          ggp.right = this._root;
          while (true) {
            if (node === null) {
              node = new Node(data);
              p.set_child(dir, node);
              ret = true;
              this.size++;
            } else if (RBTree2.is_red(node.left) && RBTree2.is_red(node.right)) {
              node.red = true;
              node.left.red = false;
              node.right.red = false;
            }
            if (RBTree2.is_red(node) && RBTree2.is_red(p)) {
              var dir2 = ggp.right === gp;
              if (node === p.get_child(last)) {
                ggp.set_child(dir2, RBTree2.single_rotate(gp, !last));
              } else {
                ggp.set_child(dir2, RBTree2.double_rotate(gp, !last));
              }
            }
            var cmp = this._comparator(node.data, data);
            if (cmp === 0) {
              break;
            }
            last = dir;
            dir = cmp < 0;
            if (gp !== null) {
              ggp = gp;
            }
            gp = p;
            p = node;
            node = node.get_child(dir);
          }
          this._root = head.right;
        }
        this._root.red = false;
        return ret;
      };
      ;
      RBTree2.prototype.remove = function(data) {
        if (this._root === null) {
          return false;
        }
        var head = new Node(void 0);
        var node = head;
        node.right = this._root;
        var p = null;
        var gp = null;
        var found = null;
        var dir = true;
        while (node.get_child(dir) !== null) {
          var last = dir;
          gp = p;
          p = node;
          node = node.get_child(dir);
          var cmp = this._comparator(data, node.data);
          dir = cmp > 0;
          if (cmp === 0) {
            found = node;
          }
          if (!RBTree2.is_red(node) && !RBTree2.is_red(node.get_child(dir))) {
            if (RBTree2.is_red(node.get_child(!dir))) {
              var sr = RBTree2.single_rotate(node, dir);
              p.set_child(last, sr);
              p = sr;
            } else if (!RBTree2.is_red(node.get_child(!dir))) {
              var sibling = p.get_child(!last);
              if (sibling !== null) {
                if (!RBTree2.is_red(sibling.get_child(!last)) && !RBTree2.is_red(sibling.get_child(last))) {
                  p.red = false;
                  sibling.red = true;
                  node.red = true;
                } else {
                  var dir2 = gp.right === p;
                  if (RBTree2.is_red(sibling.get_child(last))) {
                    gp.set_child(dir2, RBTree2.double_rotate(p, last));
                  } else if (RBTree2.is_red(sibling.get_child(!last))) {
                    gp.set_child(dir2, RBTree2.single_rotate(p, last));
                  }
                  var gpc = gp.get_child(dir2);
                  gpc.red = true;
                  node.red = true;
                  gpc.left.red = false;
                  gpc.right.red = false;
                }
              }
            }
          }
        }
        if (found !== null) {
          found.data = node.data;
          p.set_child(p.right === node, node.get_child(node.left === null));
          this.size--;
        }
        this._root = head.right;
        if (this._root !== null) {
          this._root.red = false;
        }
        return found !== null;
      };
      ;
      RBTree2.is_red = function(node) {
        return node !== null && node.red;
      };
      RBTree2.single_rotate = function(root2, dir) {
        var save = root2.get_child(!dir);
        root2.set_child(!dir, save.get_child(dir));
        save.set_child(dir, root2);
        root2.red = true;
        save.red = false;
        return save;
      };
      RBTree2.double_rotate = function(root2, dir) {
        root2.set_child(!dir, RBTree2.single_rotate(root2.get_child(!dir), !dir));
        return RBTree2.single_rotate(root2, dir);
      };
      return RBTree2;
    }(TreeBase);
    exports.RBTree = RBTree;
  }
});

// node_modules/webcola/dist/src/rectangle.js
var require_rectangle = __commonJS({
  "node_modules/webcola/dist/src/rectangle.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d2, b10) {
          d2.__proto__ = b10;
        } || function(d2, b10) {
          for (var p in b10) if (b10.hasOwnProperty(p)) d2[p] = b10[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var vpsc_1 = require_vpsc();
    var rbtree_1 = require_rbtree();
    function computeGroupBounds(g) {
      g.bounds = typeof g.leaves !== "undefined" ? g.leaves.reduce(function(r, c2) {
        return c2.bounds.union(r);
      }, Rectangle.empty()) : Rectangle.empty();
      if (typeof g.groups !== "undefined") g.bounds = g.groups.reduce(function(r, c2) {
        return computeGroupBounds(c2).union(r);
      }, g.bounds);
      g.bounds = g.bounds.inflate(g.padding);
      return g.bounds;
    }
    exports.computeGroupBounds = computeGroupBounds;
    var Rectangle = function() {
      function Rectangle2(x3, X, y3, Y) {
        this.x = x3;
        this.X = X;
        this.y = y3;
        this.Y = Y;
      }
      Rectangle2.empty = function() {
        return new Rectangle2(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY);
      };
      Rectangle2.prototype.cx = function() {
        return (this.x + this.X) / 2;
      };
      Rectangle2.prototype.cy = function() {
        return (this.y + this.Y) / 2;
      };
      Rectangle2.prototype.overlapX = function(r) {
        var ux = this.cx(), vx = r.cx();
        if (ux <= vx && r.x < this.X) return this.X - r.x;
        if (vx <= ux && this.x < r.X) return r.X - this.x;
        return 0;
      };
      Rectangle2.prototype.overlapY = function(r) {
        var uy = this.cy(), vy = r.cy();
        if (uy <= vy && r.y < this.Y) return this.Y - r.y;
        if (vy <= uy && this.y < r.Y) return r.Y - this.y;
        return 0;
      };
      Rectangle2.prototype.setXCentre = function(cx) {
        var dx = cx - this.cx();
        this.x += dx;
        this.X += dx;
      };
      Rectangle2.prototype.setYCentre = function(cy) {
        var dy = cy - this.cy();
        this.y += dy;
        this.Y += dy;
      };
      Rectangle2.prototype.width = function() {
        return this.X - this.x;
      };
      Rectangle2.prototype.height = function() {
        return this.Y - this.y;
      };
      Rectangle2.prototype.union = function(r) {
        return new Rectangle2(Math.min(this.x, r.x), Math.max(this.X, r.X), Math.min(this.y, r.y), Math.max(this.Y, r.Y));
      };
      Rectangle2.prototype.lineIntersections = function(x1, y1, x22, y22) {
        var sides = [[this.x, this.y, this.X, this.y], [this.X, this.y, this.X, this.Y], [this.X, this.Y, this.x, this.Y], [this.x, this.Y, this.x, this.y]];
        var intersections = [];
        for (var i = 0; i < 4; ++i) {
          var r = Rectangle2.lineIntersection(x1, y1, x22, y22, sides[i][0], sides[i][1], sides[i][2], sides[i][3]);
          if (r !== null) intersections.push({
            x: r.x,
            y: r.y
          });
        }
        return intersections;
      };
      Rectangle2.prototype.rayIntersection = function(x22, y22) {
        var ints = this.lineIntersections(this.cx(), this.cy(), x22, y22);
        return ints.length > 0 ? ints[0] : null;
      };
      Rectangle2.prototype.vertices = function() {
        return [{
          x: this.x,
          y: this.y
        }, {
          x: this.X,
          y: this.y
        }, {
          x: this.X,
          y: this.Y
        }, {
          x: this.x,
          y: this.Y
        }];
      };
      Rectangle2.lineIntersection = function(x1, y1, x22, y22, x3, y3, x4, y4) {
        var dx12 = x22 - x1, dx34 = x4 - x3, dy12 = y22 - y1, dy34 = y4 - y3, denominator = dy34 * dx12 - dx34 * dy12;
        if (denominator == 0) return null;
        var dx31 = x1 - x3, dy31 = y1 - y3, numa = dx34 * dy31 - dy34 * dx31, a2 = numa / denominator, numb = dx12 * dy31 - dy12 * dx31, b = numb / denominator;
        if (a2 >= 0 && a2 <= 1 && b >= 0 && b <= 1) {
          return {
            x: x1 + a2 * dx12,
            y: y1 + a2 * dy12
          };
        }
        return null;
      };
      Rectangle2.prototype.inflate = function(pad2) {
        return new Rectangle2(this.x - pad2, this.X + pad2, this.y - pad2, this.Y + pad2);
      };
      return Rectangle2;
    }();
    exports.Rectangle = Rectangle;
    function makeEdgeBetween(source, target, ah) {
      var si = source.rayIntersection(target.cx(), target.cy()) || {
        x: source.cx(),
        y: source.cy()
      }, ti = target.rayIntersection(source.cx(), source.cy()) || {
        x: target.cx(),
        y: target.cy()
      }, dx = ti.x - si.x, dy = ti.y - si.y, l = Math.sqrt(dx * dx + dy * dy), al = l - ah;
      return {
        sourceIntersection: si,
        targetIntersection: ti,
        arrowStart: {
          x: si.x + al * dx / l,
          y: si.y + al * dy / l
        }
      };
    }
    exports.makeEdgeBetween = makeEdgeBetween;
    function makeEdgeTo(s, target, ah) {
      var ti = target.rayIntersection(s.x, s.y);
      if (!ti) ti = {
        x: target.cx(),
        y: target.cy()
      };
      var dx = ti.x - s.x, dy = ti.y - s.y, l = Math.sqrt(dx * dx + dy * dy);
      return {
        x: ti.x - ah * dx / l,
        y: ti.y - ah * dy / l
      };
    }
    exports.makeEdgeTo = makeEdgeTo;
    var Node = /* @__PURE__ */ function() {
      function Node2(v, r, pos) {
        this.v = v;
        this.r = r;
        this.pos = pos;
        this.prev = makeRBTree();
        this.next = makeRBTree();
      }
      return Node2;
    }();
    var Event = /* @__PURE__ */ function() {
      function Event2(isOpen, v, pos) {
        this.isOpen = isOpen;
        this.v = v;
        this.pos = pos;
      }
      return Event2;
    }();
    function compareEvents(a2, b) {
      if (a2.pos > b.pos) {
        return 1;
      }
      if (a2.pos < b.pos) {
        return -1;
      }
      if (a2.isOpen) {
        return -1;
      }
      if (b.isOpen) {
        return 1;
      }
      return 0;
    }
    function makeRBTree() {
      return new rbtree_1.RBTree(function(a2, b) {
        return a2.pos - b.pos;
      });
    }
    var xRect = {
      getCentre: function(r) {
        return r.cx();
      },
      getOpen: function(r) {
        return r.y;
      },
      getClose: function(r) {
        return r.Y;
      },
      getSize: function(r) {
        return r.width();
      },
      makeRect: function(open, close, center, size) {
        return new Rectangle(center - size / 2, center + size / 2, open, close);
      },
      findNeighbours: findXNeighbours
    };
    var yRect = {
      getCentre: function(r) {
        return r.cy();
      },
      getOpen: function(r) {
        return r.x;
      },
      getClose: function(r) {
        return r.X;
      },
      getSize: function(r) {
        return r.height();
      },
      makeRect: function(open, close, center, size) {
        return new Rectangle(open, close, center - size / 2, center + size / 2);
      },
      findNeighbours: findYNeighbours
    };
    function generateGroupConstraints(root2, f, minSep, isContained) {
      if (isContained === void 0) {
        isContained = false;
      }
      var padding = root2.padding, gn = typeof root2.groups !== "undefined" ? root2.groups.length : 0, ln = typeof root2.leaves !== "undefined" ? root2.leaves.length : 0, childConstraints = !gn ? [] : root2.groups.reduce(function(ccs, g) {
        return ccs.concat(generateGroupConstraints(g, f, minSep, true));
      }, []), n = (isContained ? 2 : 0) + ln + gn, vs = new Array(n), rs = new Array(n), i = 0, add2 = function(r, v) {
        rs[i] = r;
        vs[i++] = v;
      };
      if (isContained) {
        var b = root2.bounds, c2 = f.getCentre(b), s = f.getSize(b) / 2, open = f.getOpen(b), close = f.getClose(b), min2 = c2 - s + padding / 2, max2 = c2 + s - padding / 2;
        root2.minVar.desiredPosition = min2;
        add2(f.makeRect(open, close, min2, padding), root2.minVar);
        root2.maxVar.desiredPosition = max2;
        add2(f.makeRect(open, close, max2, padding), root2.maxVar);
      }
      if (ln) root2.leaves.forEach(function(l) {
        return add2(l.bounds, l.variable);
      });
      if (gn) root2.groups.forEach(function(g) {
        var b10 = g.bounds;
        add2(f.makeRect(f.getOpen(b10), f.getClose(b10), f.getCentre(b10), f.getSize(b10)), g.minVar);
      });
      var cs = generateConstraints(rs, vs, f, minSep);
      if (gn) {
        vs.forEach(function(v) {
          v.cOut = [], v.cIn = [];
        });
        cs.forEach(function(c3) {
          c3.left.cOut.push(c3), c3.right.cIn.push(c3);
        });
        root2.groups.forEach(function(g) {
          var gapAdjustment = (g.padding - f.getSize(g.bounds)) / 2;
          g.minVar.cIn.forEach(function(c3) {
            return c3.gap += gapAdjustment;
          });
          g.minVar.cOut.forEach(function(c3) {
            c3.left = g.maxVar;
            c3.gap += gapAdjustment;
          });
        });
      }
      return childConstraints.concat(cs);
    }
    function generateConstraints(rs, vars, rect, minSep) {
      var i, n = rs.length;
      var N = 2 * n;
      console.assert(vars.length >= n);
      var events = new Array(N);
      for (i = 0; i < n; ++i) {
        var r = rs[i];
        var v = new Node(vars[i], r, rect.getCentre(r));
        events[i] = new Event(true, v, rect.getOpen(r));
        events[i + n] = new Event(false, v, rect.getClose(r));
      }
      events.sort(compareEvents);
      var cs = new Array();
      var scanline = makeRBTree();
      for (i = 0; i < N; ++i) {
        var e = events[i];
        var v = e.v;
        if (e.isOpen) {
          scanline.insert(v);
          rect.findNeighbours(v, scanline);
        } else {
          scanline.remove(v);
          var makeConstraint = function(l, r2) {
            var sep = (rect.getSize(l.r) + rect.getSize(r2.r)) / 2 + minSep;
            cs.push(new vpsc_1.Constraint(l.v, r2.v, sep));
          };
          var visitNeighbours = function(forward, reverse2, mkcon) {
            var u, it = v[forward].iterator();
            while ((u = it[forward]()) !== null) {
              mkcon(u, v);
              u[reverse2].remove(v);
            }
          };
          visitNeighbours("prev", "next", function(u, v2) {
            return makeConstraint(u, v2);
          });
          visitNeighbours("next", "prev", function(u, v2) {
            return makeConstraint(v2, u);
          });
        }
      }
      console.assert(scanline.size === 0);
      return cs;
    }
    function findXNeighbours(v, scanline) {
      var f = function(forward, reverse2) {
        var it = scanline.findIter(v);
        var u;
        while ((u = it[forward]()) !== null) {
          var uovervX = u.r.overlapX(v.r);
          if (uovervX <= 0 || uovervX <= u.r.overlapY(v.r)) {
            v[forward].insert(u);
            u[reverse2].insert(v);
          }
          if (uovervX <= 0) {
            break;
          }
        }
      };
      f("next", "prev");
      f("prev", "next");
    }
    function findYNeighbours(v, scanline) {
      var f = function(forward, reverse2) {
        var u = scanline.findIter(v)[forward]();
        if (u !== null && u.r.overlapX(v.r) > 0) {
          v[forward].insert(u);
          u[reverse2].insert(v);
        }
      };
      f("next", "prev");
      f("prev", "next");
    }
    function generateXConstraints(rs, vars) {
      return generateConstraints(rs, vars, xRect, 1e-6);
    }
    exports.generateXConstraints = generateXConstraints;
    function generateYConstraints(rs, vars) {
      return generateConstraints(rs, vars, yRect, 1e-6);
    }
    exports.generateYConstraints = generateYConstraints;
    function generateXGroupConstraints(root2) {
      return generateGroupConstraints(root2, xRect, 1e-6);
    }
    exports.generateXGroupConstraints = generateXGroupConstraints;
    function generateYGroupConstraints(root2) {
      return generateGroupConstraints(root2, yRect, 1e-6);
    }
    exports.generateYGroupConstraints = generateYGroupConstraints;
    function removeOverlaps(rs) {
      var vs = rs.map(function(r) {
        return new vpsc_1.Variable(r.cx());
      });
      var cs = generateXConstraints(rs, vs);
      var solver = new vpsc_1.Solver(vs, cs);
      solver.solve();
      vs.forEach(function(v, i) {
        return rs[i].setXCentre(v.position());
      });
      vs = rs.map(function(r) {
        return new vpsc_1.Variable(r.cy());
      });
      cs = generateYConstraints(rs, vs);
      solver = new vpsc_1.Solver(vs, cs);
      solver.solve();
      vs.forEach(function(v, i) {
        return rs[i].setYCentre(v.position());
      });
    }
    exports.removeOverlaps = removeOverlaps;
    var IndexedVariable = function(_super) {
      __extends(IndexedVariable2, _super);
      function IndexedVariable2(index3, w) {
        var _this = _super.call(this, 0, w) || this;
        _this.index = index3;
        return _this;
      }
      return IndexedVariable2;
    }(vpsc_1.Variable);
    exports.IndexedVariable = IndexedVariable;
    var Projection = function() {
      function Projection2(nodes, groups2, rootGroup, constraints, avoidOverlaps) {
        var _this = this;
        if (rootGroup === void 0) {
          rootGroup = null;
        }
        if (constraints === void 0) {
          constraints = null;
        }
        if (avoidOverlaps === void 0) {
          avoidOverlaps = false;
        }
        this.nodes = nodes;
        this.groups = groups2;
        this.rootGroup = rootGroup;
        this.avoidOverlaps = avoidOverlaps;
        this.variables = nodes.map(function(v, i2) {
          return v.variable = new IndexedVariable(i2, 1);
        });
        if (constraints) this.createConstraints(constraints);
        if (avoidOverlaps && rootGroup && typeof rootGroup.groups !== "undefined") {
          nodes.forEach(function(v) {
            if (!v.width || !v.height) {
              v.bounds = new Rectangle(v.x, v.x, v.y, v.y);
              return;
            }
            var w2 = v.width / 2, h2 = v.height / 2;
            v.bounds = new Rectangle(v.x - w2, v.x + w2, v.y - h2, v.y + h2);
          });
          computeGroupBounds(rootGroup);
          var i = nodes.length;
          groups2.forEach(function(g) {
            _this.variables[i] = g.minVar = new IndexedVariable(i++, typeof g.stiffness !== "undefined" ? g.stiffness : 0.01);
            _this.variables[i] = g.maxVar = new IndexedVariable(i++, typeof g.stiffness !== "undefined" ? g.stiffness : 0.01);
          });
        }
      }
      Projection2.prototype.createSeparation = function(c2) {
        return new vpsc_1.Constraint(this.nodes[c2.left].variable, this.nodes[c2.right].variable, c2.gap, typeof c2.equality !== "undefined" ? c2.equality : false);
      };
      Projection2.prototype.makeFeasible = function(c2) {
        var _this = this;
        if (!this.avoidOverlaps) return;
        var axis = "x", dim = "width";
        if (c2.axis === "x") axis = "y", dim = "height";
        var vs = c2.offsets.map(function(o) {
          return _this.nodes[o.node];
        }).sort(function(a2, b) {
          return a2[axis] - b[axis];
        });
        var p = null;
        vs.forEach(function(v) {
          if (p) {
            var nextPos = p[axis] + p[dim];
            if (nextPos > v[axis]) {
              v[axis] = nextPos;
            }
          }
          p = v;
        });
      };
      Projection2.prototype.createAlignment = function(c2) {
        var _this = this;
        var u = this.nodes[c2.offsets[0].node].variable;
        this.makeFeasible(c2);
        var cs = c2.axis === "x" ? this.xConstraints : this.yConstraints;
        c2.offsets.slice(1).forEach(function(o) {
          var v = _this.nodes[o.node].variable;
          cs.push(new vpsc_1.Constraint(u, v, o.offset, true));
        });
      };
      Projection2.prototype.createConstraints = function(constraints) {
        var _this = this;
        var isSep = function(c2) {
          return typeof c2.type === "undefined" || c2.type === "separation";
        };
        this.xConstraints = constraints.filter(function(c2) {
          return c2.axis === "x" && isSep(c2);
        }).map(function(c2) {
          return _this.createSeparation(c2);
        });
        this.yConstraints = constraints.filter(function(c2) {
          return c2.axis === "y" && isSep(c2);
        }).map(function(c2) {
          return _this.createSeparation(c2);
        });
        constraints.filter(function(c2) {
          return c2.type === "alignment";
        }).forEach(function(c2) {
          return _this.createAlignment(c2);
        });
      };
      Projection2.prototype.setupVariablesAndBounds = function(x0, y0, desired, getDesired) {
        this.nodes.forEach(function(v, i) {
          if (v.fixed) {
            v.variable.weight = v.fixedWeight ? v.fixedWeight : 1e3;
            desired[i] = getDesired(v);
          } else {
            v.variable.weight = 1;
          }
          var w = (v.width || 0) / 2, h = (v.height || 0) / 2;
          var ix = x0[i], iy = y0[i];
          v.bounds = new Rectangle(ix - w, ix + w, iy - h, iy + h);
        });
      };
      Projection2.prototype.xProject = function(x0, y0, x3) {
        if (!this.rootGroup && !(this.avoidOverlaps || this.xConstraints)) return;
        this.project(x0, y0, x0, x3, function(v) {
          return v.px;
        }, this.xConstraints, generateXGroupConstraints, function(v) {
          return v.bounds.setXCentre(x3[v.variable.index] = v.variable.position());
        }, function(g) {
          var xmin = x3[g.minVar.index] = g.minVar.position();
          var xmax = x3[g.maxVar.index] = g.maxVar.position();
          var p2 = g.padding / 2;
          g.bounds.x = xmin - p2;
          g.bounds.X = xmax + p2;
        });
      };
      Projection2.prototype.yProject = function(x0, y0, y3) {
        if (!this.rootGroup && !this.yConstraints) return;
        this.project(x0, y0, y0, y3, function(v) {
          return v.py;
        }, this.yConstraints, generateYGroupConstraints, function(v) {
          return v.bounds.setYCentre(y3[v.variable.index] = v.variable.position());
        }, function(g) {
          var ymin = y3[g.minVar.index] = g.minVar.position();
          var ymax = y3[g.maxVar.index] = g.maxVar.position();
          var p2 = g.padding / 2;
          g.bounds.y = ymin - p2;
          ;
          g.bounds.Y = ymax + p2;
        });
      };
      Projection2.prototype.projectFunctions = function() {
        var _this = this;
        return [function(x0, y0, x3) {
          return _this.xProject(x0, y0, x3);
        }, function(x0, y0, y3) {
          return _this.yProject(x0, y0, y3);
        }];
      };
      Projection2.prototype.project = function(x0, y0, start2, desired, getDesired, cs, generateConstraints2, updateNodeBounds, updateGroupBounds) {
        this.setupVariablesAndBounds(x0, y0, desired, getDesired);
        if (this.rootGroup && this.avoidOverlaps) {
          computeGroupBounds(this.rootGroup);
          cs = cs.concat(generateConstraints2(this.rootGroup));
        }
        this.solve(this.variables, cs, start2, desired);
        this.nodes.forEach(updateNodeBounds);
        if (this.rootGroup && this.avoidOverlaps) {
          this.groups.forEach(updateGroupBounds);
          computeGroupBounds(this.rootGroup);
        }
      };
      Projection2.prototype.solve = function(vs, cs, starting, desired) {
        var solver = new vpsc_1.Solver(vs, cs);
        solver.setStartingPositions(starting);
        solver.setDesiredPositions(desired);
        solver.solve();
      };
      return Projection2;
    }();
    exports.Projection = Projection;
  }
});

// node_modules/webcola/dist/src/pqueue.js
var require_pqueue = __commonJS({
  "node_modules/webcola/dist/src/pqueue.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PairingHeap = function() {
      function PairingHeap2(elem) {
        this.elem = elem;
        this.subheaps = [];
      }
      PairingHeap2.prototype.toString = function(selector) {
        var str = "", needComma = false;
        for (var i = 0; i < this.subheaps.length; ++i) {
          var subheap = this.subheaps[i];
          if (!subheap.elem) {
            needComma = false;
            continue;
          }
          if (needComma) {
            str = str + ",";
          }
          str = str + subheap.toString(selector);
          needComma = true;
        }
        if (str !== "") {
          str = "(" + str + ")";
        }
        return (this.elem ? selector(this.elem) : "") + str;
      };
      PairingHeap2.prototype.forEach = function(f) {
        if (!this.empty()) {
          f(this.elem, this);
          this.subheaps.forEach(function(s) {
            return s.forEach(f);
          });
        }
      };
      PairingHeap2.prototype.count = function() {
        return this.empty() ? 0 : 1 + this.subheaps.reduce(function(n, h) {
          return n + h.count();
        }, 0);
      };
      PairingHeap2.prototype.min = function() {
        return this.elem;
      };
      PairingHeap2.prototype.empty = function() {
        return this.elem == null;
      };
      PairingHeap2.prototype.contains = function(h) {
        if (this === h) return true;
        for (var i = 0; i < this.subheaps.length; i++) {
          if (this.subheaps[i].contains(h)) return true;
        }
        return false;
      };
      PairingHeap2.prototype.isHeap = function(lessThan) {
        var _this = this;
        return this.subheaps.every(function(h) {
          return lessThan(_this.elem, h.elem) && h.isHeap(lessThan);
        });
      };
      PairingHeap2.prototype.insert = function(obj, lessThan) {
        return this.merge(new PairingHeap2(obj), lessThan);
      };
      PairingHeap2.prototype.merge = function(heap2, lessThan) {
        if (this.empty()) return heap2;
        else if (heap2.empty()) return this;
        else if (lessThan(this.elem, heap2.elem)) {
          this.subheaps.push(heap2);
          return this;
        } else {
          heap2.subheaps.push(this);
          return heap2;
        }
      };
      PairingHeap2.prototype.removeMin = function(lessThan) {
        if (this.empty()) return null;
        else return this.mergePairs(lessThan);
      };
      PairingHeap2.prototype.mergePairs = function(lessThan) {
        if (this.subheaps.length == 0) return new PairingHeap2(null);
        else if (this.subheaps.length == 1) {
          return this.subheaps[0];
        } else {
          var firstPair = this.subheaps.pop().merge(this.subheaps.pop(), lessThan);
          var remaining = this.mergePairs(lessThan);
          return firstPair.merge(remaining, lessThan);
        }
      };
      PairingHeap2.prototype.decreaseKey = function(subheap, newValue, setHeapNode, lessThan) {
        var newHeap = subheap.removeMin(lessThan);
        subheap.elem = newHeap.elem;
        subheap.subheaps = newHeap.subheaps;
        if (setHeapNode !== null && newHeap.elem !== null) {
          setHeapNode(subheap.elem, subheap);
        }
        var pairingNode = new PairingHeap2(newValue);
        if (setHeapNode !== null) {
          setHeapNode(newValue, pairingNode);
        }
        return this.merge(pairingNode, lessThan);
      };
      return PairingHeap2;
    }();
    exports.PairingHeap = PairingHeap;
    var PriorityQueue = function() {
      function PriorityQueue2(lessThan) {
        this.lessThan = lessThan;
      }
      PriorityQueue2.prototype.top = function() {
        if (this.empty()) {
          return null;
        }
        return this.root.elem;
      };
      PriorityQueue2.prototype.push = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var pairingNode;
        for (var i = 0, arg; arg = args[i]; ++i) {
          pairingNode = new PairingHeap(arg);
          this.root = this.empty() ? pairingNode : this.root.merge(pairingNode, this.lessThan);
        }
        return pairingNode;
      };
      PriorityQueue2.prototype.empty = function() {
        return !this.root || !this.root.elem;
      };
      PriorityQueue2.prototype.isHeap = function() {
        return this.root.isHeap(this.lessThan);
      };
      PriorityQueue2.prototype.forEach = function(f) {
        this.root.forEach(f);
      };
      PriorityQueue2.prototype.pop = function() {
        if (this.empty()) {
          return null;
        }
        var obj = this.root.min();
        this.root = this.root.removeMin(this.lessThan);
        return obj;
      };
      PriorityQueue2.prototype.reduceKey = function(heapNode, newKey, setHeapNode) {
        if (setHeapNode === void 0) {
          setHeapNode = null;
        }
        this.root = this.root.decreaseKey(heapNode, newKey, setHeapNode, this.lessThan);
      };
      PriorityQueue2.prototype.toString = function(selector) {
        return this.root.toString(selector);
      };
      PriorityQueue2.prototype.count = function() {
        return this.root.count();
      };
      return PriorityQueue2;
    }();
    exports.PriorityQueue = PriorityQueue;
  }
});

// node_modules/webcola/dist/src/shortestpaths.js
var require_shortestpaths = __commonJS({
  "node_modules/webcola/dist/src/shortestpaths.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var pqueue_1 = require_pqueue();
    var Neighbour = /* @__PURE__ */ function() {
      function Neighbour2(id3, distance) {
        this.id = id3;
        this.distance = distance;
      }
      return Neighbour2;
    }();
    var Node = /* @__PURE__ */ function() {
      function Node2(id3) {
        this.id = id3;
        this.neighbours = [];
      }
      return Node2;
    }();
    var QueueEntry = /* @__PURE__ */ function() {
      function QueueEntry2(node, prev, d) {
        this.node = node;
        this.prev = prev;
        this.d = d;
      }
      return QueueEntry2;
    }();
    var Calculator = function() {
      function Calculator2(n, es, getSourceIndex, getTargetIndex, getLength) {
        this.n = n;
        this.es = es;
        this.neighbours = new Array(this.n);
        var i = this.n;
        while (i--) this.neighbours[i] = new Node(i);
        i = this.es.length;
        while (i--) {
          var e = this.es[i];
          var u = getSourceIndex(e), v = getTargetIndex(e);
          var d = getLength(e);
          this.neighbours[u].neighbours.push(new Neighbour(v, d));
          this.neighbours[v].neighbours.push(new Neighbour(u, d));
        }
      }
      Calculator2.prototype.DistanceMatrix = function() {
        var D2 = new Array(this.n);
        for (var i = 0; i < this.n; ++i) {
          D2[i] = this.dijkstraNeighbours(i);
        }
        return D2;
      };
      Calculator2.prototype.DistancesFromNode = function(start2) {
        return this.dijkstraNeighbours(start2);
      };
      Calculator2.prototype.PathFromNodeToNode = function(start2, end) {
        return this.dijkstraNeighbours(start2, end);
      };
      Calculator2.prototype.PathFromNodeToNodeWithPrevCost = function(start2, end, prevCost) {
        var q = new pqueue_1.PriorityQueue(function(a2, b) {
          return a2.d <= b.d;
        }), u = this.neighbours[start2], qu = new QueueEntry(u, null, 0), visitedFrom = {};
        q.push(qu);
        while (!q.empty()) {
          qu = q.pop();
          u = qu.node;
          if (u.id === end) {
            break;
          }
          var i = u.neighbours.length;
          while (i--) {
            var neighbour = u.neighbours[i], v = this.neighbours[neighbour.id];
            if (qu.prev && v.id === qu.prev.node.id) continue;
            var viduid = v.id + "," + u.id;
            if (viduid in visitedFrom && visitedFrom[viduid] <= qu.d) continue;
            var cc = qu.prev ? prevCost(qu.prev.node.id, u.id, v.id) : 0, t = qu.d + neighbour.distance + cc;
            visitedFrom[viduid] = t;
            q.push(new QueueEntry(v, qu, t));
          }
        }
        var path = [];
        while (qu.prev) {
          qu = qu.prev;
          path.push(qu.node.id);
        }
        return path;
      };
      Calculator2.prototype.dijkstraNeighbours = function(start2, dest) {
        if (dest === void 0) {
          dest = -1;
        }
        var q = new pqueue_1.PriorityQueue(function(a2, b) {
          return a2.d <= b.d;
        }), i = this.neighbours.length, d = new Array(i);
        while (i--) {
          var node = this.neighbours[i];
          node.d = i === start2 ? 0 : Number.POSITIVE_INFINITY;
          node.q = q.push(node);
        }
        while (!q.empty()) {
          var u = q.pop();
          d[u.id] = u.d;
          if (u.id === dest) {
            var path = [];
            var v = u;
            while (typeof v.prev !== "undefined") {
              path.push(v.prev.id);
              v = v.prev;
            }
            return path;
          }
          i = u.neighbours.length;
          while (i--) {
            var neighbour = u.neighbours[i];
            var v = this.neighbours[neighbour.id];
            var t = u.d + neighbour.distance;
            if (u.d !== Number.MAX_VALUE && v.d > t) {
              v.d = t;
              v.prev = u;
              q.reduceKey(v.q, v, function(e, q2) {
                return e.q = q2;
              });
            }
          }
        }
        return d;
      };
      return Calculator2;
    }();
    exports.Calculator = Calculator;
  }
});

// node_modules/webcola/dist/src/geom.js
var require_geom = __commonJS({
  "node_modules/webcola/dist/src/geom.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d2, b10) {
          d2.__proto__ = b10;
        } || function(d2, b10) {
          for (var p in b10) if (b10.hasOwnProperty(p)) d2[p] = b10[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var rectangle_1 = require_rectangle();
    var Point = /* @__PURE__ */ function() {
      function Point2() {
      }
      return Point2;
    }();
    exports.Point = Point;
    var LineSegment = /* @__PURE__ */ function() {
      function LineSegment2(x1, y1, x22, y22) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x22;
        this.y2 = y22;
      }
      return LineSegment2;
    }();
    exports.LineSegment = LineSegment;
    var PolyPoint = function(_super) {
      __extends(PolyPoint2, _super);
      function PolyPoint2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      return PolyPoint2;
    }(Point);
    exports.PolyPoint = PolyPoint;
    function isLeft(P0, P1, P2) {
      return (P1.x - P0.x) * (P2.y - P0.y) - (P2.x - P0.x) * (P1.y - P0.y);
    }
    exports.isLeft = isLeft;
    function above(p, vi, vj) {
      return isLeft(p, vi, vj) > 0;
    }
    function below(p, vi, vj) {
      return isLeft(p, vi, vj) < 0;
    }
    function ConvexHull(S) {
      var P = S.slice(0).sort(function(a2, b) {
        return a2.x !== b.x ? b.x - a2.x : b.y - a2.y;
      });
      var n = S.length, i;
      var minmin = 0;
      var xmin = P[0].x;
      for (i = 1; i < n; ++i) {
        if (P[i].x !== xmin) break;
      }
      var minmax = i - 1;
      var H = [];
      H.push(P[minmin]);
      if (minmax === n - 1) {
        if (P[minmax].y !== P[minmin].y) H.push(P[minmax]);
      } else {
        var maxmin, maxmax = n - 1;
        var xmax = P[n - 1].x;
        for (i = n - 2; i >= 0; i--) if (P[i].x !== xmax) break;
        maxmin = i + 1;
        i = minmax;
        while (++i <= maxmin) {
          if (isLeft(P[minmin], P[maxmin], P[i]) >= 0 && i < maxmin) continue;
          while (H.length > 1) {
            if (isLeft(H[H.length - 2], H[H.length - 1], P[i]) > 0) break;
            else H.length -= 1;
          }
          if (i != minmin) H.push(P[i]);
        }
        if (maxmax != maxmin) H.push(P[maxmax]);
        var bot = H.length;
        i = maxmin;
        while (--i >= minmax) {
          if (isLeft(P[maxmax], P[minmax], P[i]) >= 0 && i > minmax) continue;
          while (H.length > bot) {
            if (isLeft(H[H.length - 2], H[H.length - 1], P[i]) > 0) break;
            else H.length -= 1;
          }
          if (i != minmin) H.push(P[i]);
        }
      }
      return H;
    }
    exports.ConvexHull = ConvexHull;
    function clockwiseRadialSweep(p, P, f) {
      P.slice(0).sort(function(a2, b) {
        return Math.atan2(a2.y - p.y, a2.x - p.x) - Math.atan2(b.y - p.y, b.x - p.x);
      }).forEach(f);
    }
    exports.clockwiseRadialSweep = clockwiseRadialSweep;
    function tangent_PointPolyC(P, V) {
      var Vclosed = V.slice(0);
      Vclosed.push(V[0]);
      return {
        rtan: Rtangent_PointPolyC(P, Vclosed),
        ltan: Ltangent_PointPolyC(P, Vclosed)
      };
    }
    function Rtangent_PointPolyC(P, V) {
      var n = V.length - 1;
      var a2, b, c2;
      var upA, dnC;
      if (below(P, V[1], V[0]) && !above(P, V[n - 1], V[0])) return 0;
      for (a2 = 0, b = n; ; ) {
        if (b - a2 === 1) if (above(P, V[a2], V[b])) return a2;
        else return b;
        c2 = Math.floor((a2 + b) / 2);
        dnC = below(P, V[c2 + 1], V[c2]);
        if (dnC && !above(P, V[c2 - 1], V[c2])) return c2;
        upA = above(P, V[a2 + 1], V[a2]);
        if (upA) {
          if (dnC) b = c2;
          else {
            if (above(P, V[a2], V[c2])) b = c2;
            else a2 = c2;
          }
        } else {
          if (!dnC) a2 = c2;
          else {
            if (below(P, V[a2], V[c2])) b = c2;
            else a2 = c2;
          }
        }
      }
    }
    function Ltangent_PointPolyC(P, V) {
      var n = V.length - 1;
      var a2, b, c2;
      var dnA, dnC;
      if (above(P, V[n - 1], V[0]) && !below(P, V[1], V[0])) return 0;
      for (a2 = 0, b = n; ; ) {
        if (b - a2 === 1) if (below(P, V[a2], V[b])) return a2;
        else return b;
        c2 = Math.floor((a2 + b) / 2);
        dnC = below(P, V[c2 + 1], V[c2]);
        if (above(P, V[c2 - 1], V[c2]) && !dnC) return c2;
        dnA = below(P, V[a2 + 1], V[a2]);
        if (dnA) {
          if (!dnC) b = c2;
          else {
            if (below(P, V[a2], V[c2])) b = c2;
            else a2 = c2;
          }
        } else {
          if (dnC) a2 = c2;
          else {
            if (above(P, V[a2], V[c2])) b = c2;
            else a2 = c2;
          }
        }
      }
    }
    function tangent_PolyPolyC(V, W, t13, t22, cmp1, cmp2) {
      var ix1, ix2;
      ix1 = t13(W[0], V);
      ix2 = t22(V[ix1], W);
      var done = false;
      while (!done) {
        done = true;
        while (true) {
          if (ix1 === V.length - 1) ix1 = 0;
          if (cmp1(W[ix2], V[ix1], V[ix1 + 1])) break;
          ++ix1;
        }
        while (true) {
          if (ix2 === 0) ix2 = W.length - 1;
          if (cmp2(V[ix1], W[ix2], W[ix2 - 1])) break;
          --ix2;
          done = false;
        }
      }
      return {
        t1: ix1,
        t2: ix2
      };
    }
    exports.tangent_PolyPolyC = tangent_PolyPolyC;
    function LRtangent_PolyPolyC(V, W) {
      var rl = RLtangent_PolyPolyC(W, V);
      return {
        t1: rl.t2,
        t2: rl.t1
      };
    }
    exports.LRtangent_PolyPolyC = LRtangent_PolyPolyC;
    function RLtangent_PolyPolyC(V, W) {
      return tangent_PolyPolyC(V, W, Rtangent_PointPolyC, Ltangent_PointPolyC, above, below);
    }
    exports.RLtangent_PolyPolyC = RLtangent_PolyPolyC;
    function LLtangent_PolyPolyC(V, W) {
      return tangent_PolyPolyC(V, W, Ltangent_PointPolyC, Ltangent_PointPolyC, below, below);
    }
    exports.LLtangent_PolyPolyC = LLtangent_PolyPolyC;
    function RRtangent_PolyPolyC(V, W) {
      return tangent_PolyPolyC(V, W, Rtangent_PointPolyC, Rtangent_PointPolyC, above, above);
    }
    exports.RRtangent_PolyPolyC = RRtangent_PolyPolyC;
    var BiTangent = /* @__PURE__ */ function() {
      function BiTangent2(t13, t22) {
        this.t1 = t13;
        this.t2 = t22;
      }
      return BiTangent2;
    }();
    exports.BiTangent = BiTangent;
    var BiTangents = /* @__PURE__ */ function() {
      function BiTangents2() {
      }
      return BiTangents2;
    }();
    exports.BiTangents = BiTangents;
    var TVGPoint = function(_super) {
      __extends(TVGPoint2, _super);
      function TVGPoint2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      return TVGPoint2;
    }(Point);
    exports.TVGPoint = TVGPoint;
    var VisibilityVertex = /* @__PURE__ */ function() {
      function VisibilityVertex2(id3, polyid, polyvertid, p) {
        this.id = id3;
        this.polyid = polyid;
        this.polyvertid = polyvertid;
        this.p = p;
        p.vv = this;
      }
      return VisibilityVertex2;
    }();
    exports.VisibilityVertex = VisibilityVertex;
    var VisibilityEdge = function() {
      function VisibilityEdge2(source, target) {
        this.source = source;
        this.target = target;
      }
      VisibilityEdge2.prototype.length = function() {
        var dx = this.source.p.x - this.target.p.x;
        var dy = this.source.p.y - this.target.p.y;
        return Math.sqrt(dx * dx + dy * dy);
      };
      return VisibilityEdge2;
    }();
    exports.VisibilityEdge = VisibilityEdge;
    var TangentVisibilityGraph = function() {
      function TangentVisibilityGraph2(P, g0) {
        this.P = P;
        this.V = [];
        this.E = [];
        if (!g0) {
          var n = P.length;
          for (var i = 0; i < n; i++) {
            var p = P[i];
            for (var j = 0; j < p.length; ++j) {
              var pj = p[j], vv = new VisibilityVertex(this.V.length, i, j, pj);
              this.V.push(vv);
              if (j > 0) this.E.push(new VisibilityEdge(p[j - 1].vv, vv));
            }
            if (p.length > 1) this.E.push(new VisibilityEdge(p[0].vv, p[p.length - 1].vv));
          }
          for (var i = 0; i < n - 1; i++) {
            var Pi = P[i];
            for (var j = i + 1; j < n; j++) {
              var Pj = P[j], t = tangents(Pi, Pj);
              for (var q in t) {
                var c2 = t[q], source = Pi[c2.t1], target = Pj[c2.t2];
                this.addEdgeIfVisible(source, target, i, j);
              }
            }
          }
        } else {
          this.V = g0.V.slice(0);
          this.E = g0.E.slice(0);
        }
      }
      TangentVisibilityGraph2.prototype.addEdgeIfVisible = function(u, v, i1, i2) {
        if (!this.intersectsPolys(new LineSegment(u.x, u.y, v.x, v.y), i1, i2)) {
          this.E.push(new VisibilityEdge(u.vv, v.vv));
        }
      };
      TangentVisibilityGraph2.prototype.addPoint = function(p, i1) {
        var n = this.P.length;
        this.V.push(new VisibilityVertex(this.V.length, n, 0, p));
        for (var i = 0; i < n; ++i) {
          if (i === i1) continue;
          var poly = this.P[i], t = tangent_PointPolyC(p, poly);
          this.addEdgeIfVisible(p, poly[t.ltan], i1, i);
          this.addEdgeIfVisible(p, poly[t.rtan], i1, i);
        }
        return p.vv;
      };
      TangentVisibilityGraph2.prototype.intersectsPolys = function(l, i1, i2) {
        for (var i = 0, n = this.P.length; i < n; ++i) {
          if (i != i1 && i != i2 && intersects(l, this.P[i]).length > 0) {
            return true;
          }
        }
        return false;
      };
      return TangentVisibilityGraph2;
    }();
    exports.TangentVisibilityGraph = TangentVisibilityGraph;
    function intersects(l, P) {
      var ints = [];
      for (var i = 1, n = P.length; i < n; ++i) {
        var int = rectangle_1.Rectangle.lineIntersection(l.x1, l.y1, l.x2, l.y2, P[i - 1].x, P[i - 1].y, P[i].x, P[i].y);
        if (int) ints.push(int);
      }
      return ints;
    }
    function tangents(V, W) {
      var m2 = V.length - 1, n = W.length - 1;
      var bt = new BiTangents();
      for (var i = 0; i < m2; ++i) {
        for (var j = 0; j < n; ++j) {
          var v1 = V[i == 0 ? m2 - 1 : i - 1];
          var v2 = V[i];
          var v3 = V[i + 1];
          var w1 = W[j == 0 ? n - 1 : j - 1];
          var w2 = W[j];
          var w3 = W[j + 1];
          var v1v2w2 = isLeft(v1, v2, w2);
          var v2w1w2 = isLeft(v2, w1, w2);
          var v2w2w3 = isLeft(v2, w2, w3);
          var w1w2v2 = isLeft(w1, w2, v2);
          var w2v1v2 = isLeft(w2, v1, v2);
          var w2v2v3 = isLeft(w2, v2, v3);
          if (v1v2w2 >= 0 && v2w1w2 >= 0 && v2w2w3 < 0 && w1w2v2 >= 0 && w2v1v2 >= 0 && w2v2v3 < 0) {
            bt.ll = new BiTangent(i, j);
          } else if (v1v2w2 <= 0 && v2w1w2 <= 0 && v2w2w3 > 0 && w1w2v2 <= 0 && w2v1v2 <= 0 && w2v2v3 > 0) {
            bt.rr = new BiTangent(i, j);
          } else if (v1v2w2 <= 0 && v2w1w2 > 0 && v2w2w3 <= 0 && w1w2v2 >= 0 && w2v1v2 < 0 && w2v2v3 >= 0) {
            bt.rl = new BiTangent(i, j);
          } else if (v1v2w2 >= 0 && v2w1w2 < 0 && v2w2w3 >= 0 && w1w2v2 <= 0 && w2v1v2 > 0 && w2v2v3 <= 0) {
            bt.lr = new BiTangent(i, j);
          }
        }
      }
      return bt;
    }
    exports.tangents = tangents;
    function isPointInsidePoly(p, poly) {
      for (var i = 1, n = poly.length; i < n; ++i) if (below(poly[i - 1], poly[i], p)) return false;
      return true;
    }
    function isAnyPInQ(p, q) {
      return !p.every(function(v) {
        return !isPointInsidePoly(v, q);
      });
    }
    function polysOverlap(p, q) {
      if (isAnyPInQ(p, q)) return true;
      if (isAnyPInQ(q, p)) return true;
      for (var i = 1, n = p.length; i < n; ++i) {
        var v = p[i], u = p[i - 1];
        if (intersects(new LineSegment(u.x, u.y, v.x, v.y), q).length > 0) return true;
      }
      return false;
    }
    exports.polysOverlap = polysOverlap;
  }
});

// node_modules/webcola/dist/src/handledisconnected.js
var require_handledisconnected = __commonJS({
  "node_modules/webcola/dist/src/handledisconnected.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var packingOptions = {
      PADDING: 10,
      GOLDEN_SECTION: (1 + Math.sqrt(5)) / 2,
      FLOAT_EPSILON: 1e-4,
      MAX_INERATIONS: 100
    };
    function applyPacking(graphs, w, h, node_size, desired_ratio, centerGraph) {
      if (desired_ratio === void 0) {
        desired_ratio = 1;
      }
      if (centerGraph === void 0) {
        centerGraph = true;
      }
      var init_x = 0, init_y = 0, svg_width = w, svg_height = h, desired_ratio = typeof desired_ratio !== "undefined" ? desired_ratio : 1, node_size = typeof node_size !== "undefined" ? node_size : 0, real_width = 0, real_height = 0, min_width = 0, global_bottom = 0, line = [];
      if (graphs.length == 0) return;
      calculate_bb(graphs);
      apply(graphs, desired_ratio);
      if (centerGraph) {
        put_nodes_to_right_positions(graphs);
      }
      function calculate_bb(graphs2) {
        graphs2.forEach(function(g) {
          calculate_single_bb(g);
        });
        function calculate_single_bb(graph) {
          var min_x = Number.MAX_VALUE, min_y = Number.MAX_VALUE, max_x = 0, max_y = 0;
          graph.array.forEach(function(v) {
            var w2 = typeof v.width !== "undefined" ? v.width : node_size;
            var h2 = typeof v.height !== "undefined" ? v.height : node_size;
            w2 /= 2;
            h2 /= 2;
            max_x = Math.max(v.x + w2, max_x);
            min_x = Math.min(v.x - w2, min_x);
            max_y = Math.max(v.y + h2, max_y);
            min_y = Math.min(v.y - h2, min_y);
          });
          graph.width = max_x - min_x;
          graph.height = max_y - min_y;
        }
      }
      function put_nodes_to_right_positions(graphs2) {
        graphs2.forEach(function(g) {
          var center = {
            x: 0,
            y: 0
          };
          g.array.forEach(function(node) {
            center.x += node.x;
            center.y += node.y;
          });
          center.x /= g.array.length;
          center.y /= g.array.length;
          var corner = {
            x: center.x - g.width / 2,
            y: center.y - g.height / 2
          };
          var offset = {
            x: g.x - corner.x + svg_width / 2 - real_width / 2,
            y: g.y - corner.y + svg_height / 2 - real_height / 2
          };
          g.array.forEach(function(node) {
            node.x += offset.x;
            node.y += offset.y;
          });
        });
      }
      function apply(data, desired_ratio2) {
        var curr_best_f = Number.POSITIVE_INFINITY;
        var curr_best = 0;
        data.sort(function(a2, b) {
          return b.height - a2.height;
        });
        min_width = data.reduce(function(a2, b) {
          return a2.width < b.width ? a2.width : b.width;
        });
        var left = x1 = min_width;
        var right = x22 = get_entire_width(data);
        var iterationCounter = 0;
        var f_x1 = Number.MAX_VALUE;
        var f_x2 = Number.MAX_VALUE;
        var flag = -1;
        var dx = Number.MAX_VALUE;
        var df = Number.MAX_VALUE;
        while (dx > min_width || df > packingOptions.FLOAT_EPSILON) {
          if (flag != 1) {
            var x1 = right - (right - left) / packingOptions.GOLDEN_SECTION;
            var f_x1 = step(data, x1);
          }
          if (flag != 0) {
            var x22 = left + (right - left) / packingOptions.GOLDEN_SECTION;
            var f_x2 = step(data, x22);
          }
          dx = Math.abs(x1 - x22);
          df = Math.abs(f_x1 - f_x2);
          if (f_x1 < curr_best_f) {
            curr_best_f = f_x1;
            curr_best = x1;
          }
          if (f_x2 < curr_best_f) {
            curr_best_f = f_x2;
            curr_best = x22;
          }
          if (f_x1 > f_x2) {
            left = x1;
            x1 = x22;
            f_x1 = f_x2;
            flag = 1;
          } else {
            right = x22;
            x22 = x1;
            f_x2 = f_x1;
            flag = 0;
          }
          if (iterationCounter++ > 100) {
            break;
          }
        }
        step(data, curr_best);
      }
      function step(data, max_width) {
        line = [];
        real_width = 0;
        real_height = 0;
        global_bottom = init_y;
        for (var i = 0; i < data.length; i++) {
          var o = data[i];
          put_rect(o, max_width);
        }
        return Math.abs(get_real_ratio() - desired_ratio);
      }
      function put_rect(rect, max_width) {
        var parent = void 0;
        for (var i = 0; i < line.length; i++) {
          if (line[i].space_left >= rect.height && line[i].x + line[i].width + rect.width + packingOptions.PADDING - max_width <= packingOptions.FLOAT_EPSILON) {
            parent = line[i];
            break;
          }
        }
        line.push(rect);
        if (parent !== void 0) {
          rect.x = parent.x + parent.width + packingOptions.PADDING;
          rect.y = parent.bottom;
          rect.space_left = rect.height;
          rect.bottom = rect.y;
          parent.space_left -= rect.height + packingOptions.PADDING;
          parent.bottom += rect.height + packingOptions.PADDING;
        } else {
          rect.y = global_bottom;
          global_bottom += rect.height + packingOptions.PADDING;
          rect.x = init_x;
          rect.bottom = rect.y;
          rect.space_left = rect.height;
        }
        if (rect.y + rect.height - real_height > -packingOptions.FLOAT_EPSILON) real_height = rect.y + rect.height - init_y;
        if (rect.x + rect.width - real_width > -packingOptions.FLOAT_EPSILON) real_width = rect.x + rect.width - init_x;
      }
      ;
      function get_entire_width(data) {
        var width = 0;
        data.forEach(function(d) {
          return width += d.width + packingOptions.PADDING;
        });
        return width;
      }
      function get_real_ratio() {
        return real_width / real_height;
      }
    }
    exports.applyPacking = applyPacking;
    function separateGraphs(nodes, links) {
      var marks = {};
      var ways = {};
      var graphs = [];
      var clusters = 0;
      for (var i = 0; i < links.length; i++) {
        var link = links[i];
        var n1 = link.source;
        var n2 = link.target;
        if (ways[n1.index]) ways[n1.index].push(n2);
        else ways[n1.index] = [n2];
        if (ways[n2.index]) ways[n2.index].push(n1);
        else ways[n2.index] = [n1];
      }
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (marks[node.index]) continue;
        explore_node(node, true);
      }
      function explore_node(n, is_new) {
        if (marks[n.index] !== void 0) return;
        if (is_new) {
          clusters++;
          graphs.push({
            array: []
          });
        }
        marks[n.index] = clusters;
        graphs[clusters - 1].array.push(n);
        var adjacent = ways[n.index];
        if (!adjacent) return;
        for (var j = 0; j < adjacent.length; j++) {
          explore_node(adjacent[j], false);
        }
      }
      return graphs;
    }
    exports.separateGraphs = separateGraphs;
  }
});

// node_modules/webcola/dist/src/layout.js
var require_layout2 = __commonJS({
  "node_modules/webcola/dist/src/layout.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var powergraph = require_powergraph();
    var linklengths_1 = require_linklengths();
    var descent_1 = require_descent();
    var rectangle_1 = require_rectangle();
    var shortestpaths_1 = require_shortestpaths();
    var geom_1 = require_geom();
    var handledisconnected_1 = require_handledisconnected();
    var EventType;
    (function(EventType2) {
      EventType2[EventType2["start"] = 0] = "start";
      EventType2[EventType2["tick"] = 1] = "tick";
      EventType2[EventType2["end"] = 2] = "end";
    })(EventType = exports.EventType || (exports.EventType = {}));
    function isGroup(g) {
      return typeof g.leaves !== "undefined" || typeof g.groups !== "undefined";
    }
    var Layout = function() {
      function Layout2() {
        var _this = this;
        this._canvasSize = [1, 1];
        this._linkDistance = 20;
        this._defaultNodeSize = 10;
        this._linkLengthCalculator = null;
        this._linkType = null;
        this._avoidOverlaps = false;
        this._handleDisconnected = true;
        this._running = false;
        this._nodes = [];
        this._groups = [];
        this._rootGroup = null;
        this._links = [];
        this._constraints = [];
        this._distanceMatrix = null;
        this._descent = null;
        this._directedLinkConstraints = null;
        this._threshold = 0.01;
        this._visibilityGraph = null;
        this._groupCompactness = 1e-6;
        this.event = null;
        this.linkAccessor = {
          getSourceIndex: Layout2.getSourceIndex,
          getTargetIndex: Layout2.getTargetIndex,
          setLength: Layout2.setLinkLength,
          getType: function(l) {
            return typeof _this._linkType === "function" ? _this._linkType(l) : 0;
          }
        };
      }
      Layout2.prototype.on = function(e, listener) {
        if (!this.event) this.event = {};
        if (typeof e === "string") {
          this.event[EventType[e]] = listener;
        } else {
          this.event[e] = listener;
        }
        return this;
      };
      Layout2.prototype.trigger = function(e) {
        if (this.event && typeof this.event[e.type] !== "undefined") {
          this.event[e.type](e);
        }
      };
      Layout2.prototype.kick = function() {
        while (!this.tick()) ;
      };
      Layout2.prototype.tick = function() {
        if (this._alpha < this._threshold) {
          this._running = false;
          this.trigger({
            type: EventType.end,
            alpha: this._alpha = 0,
            stress: this._lastStress
          });
          return true;
        }
        var n = this._nodes.length, m2 = this._links.length;
        var o, i;
        this._descent.locks.clear();
        for (i = 0; i < n; ++i) {
          o = this._nodes[i];
          if (o.fixed) {
            if (typeof o.px === "undefined" || typeof o.py === "undefined") {
              o.px = o.x;
              o.py = o.y;
            }
            var p = [o.px, o.py];
            this._descent.locks.add(i, p);
          }
        }
        var s1 = this._descent.rungeKutta();
        if (s1 === 0) {
          this._alpha = 0;
        } else if (typeof this._lastStress !== "undefined") {
          this._alpha = s1;
        }
        this._lastStress = s1;
        this.updateNodePositions();
        this.trigger({
          type: EventType.tick,
          alpha: this._alpha,
          stress: this._lastStress
        });
        return false;
      };
      Layout2.prototype.updateNodePositions = function() {
        var x3 = this._descent.x[0], y3 = this._descent.x[1];
        var o, i = this._nodes.length;
        while (i--) {
          o = this._nodes[i];
          o.x = x3[i];
          o.y = y3[i];
        }
      };
      Layout2.prototype.nodes = function(v) {
        if (!v) {
          if (this._nodes.length === 0 && this._links.length > 0) {
            var n = 0;
            this._links.forEach(function(l) {
              n = Math.max(n, l.source, l.target);
            });
            this._nodes = new Array(++n);
            for (var i = 0; i < n; ++i) {
              this._nodes[i] = {};
            }
          }
          return this._nodes;
        }
        this._nodes = v;
        return this;
      };
      Layout2.prototype.groups = function(x3) {
        var _this = this;
        if (!x3) return this._groups;
        this._groups = x3;
        this._rootGroup = {};
        this._groups.forEach(function(g) {
          if (typeof g.padding === "undefined") g.padding = 1;
          if (typeof g.leaves !== "undefined") {
            g.leaves.forEach(function(v, i) {
              if (typeof v === "number") (g.leaves[i] = _this._nodes[v]).parent = g;
            });
          }
          if (typeof g.groups !== "undefined") {
            g.groups.forEach(function(gi, i) {
              if (typeof gi === "number") (g.groups[i] = _this._groups[gi]).parent = g;
            });
          }
        });
        this._rootGroup.leaves = this._nodes.filter(function(v) {
          return typeof v.parent === "undefined";
        });
        this._rootGroup.groups = this._groups.filter(function(g) {
          return typeof g.parent === "undefined";
        });
        return this;
      };
      Layout2.prototype.powerGraphGroups = function(f) {
        var g = powergraph.getGroups(this._nodes, this._links, this.linkAccessor, this._rootGroup);
        this.groups(g.groups);
        f(g);
        return this;
      };
      Layout2.prototype.avoidOverlaps = function(v) {
        if (!arguments.length) return this._avoidOverlaps;
        this._avoidOverlaps = v;
        return this;
      };
      Layout2.prototype.handleDisconnected = function(v) {
        if (!arguments.length) return this._handleDisconnected;
        this._handleDisconnected = v;
        return this;
      };
      Layout2.prototype.flowLayout = function(axis, minSeparation) {
        if (!arguments.length) axis = "y";
        this._directedLinkConstraints = {
          axis,
          getMinSeparation: typeof minSeparation === "number" ? function() {
            return minSeparation;
          } : minSeparation
        };
        return this;
      };
      Layout2.prototype.links = function(x3) {
        if (!arguments.length) return this._links;
        this._links = x3;
        return this;
      };
      Layout2.prototype.constraints = function(c2) {
        if (!arguments.length) return this._constraints;
        this._constraints = c2;
        return this;
      };
      Layout2.prototype.distanceMatrix = function(d) {
        if (!arguments.length) return this._distanceMatrix;
        this._distanceMatrix = d;
        return this;
      };
      Layout2.prototype.size = function(x3) {
        if (!x3) return this._canvasSize;
        this._canvasSize = x3;
        return this;
      };
      Layout2.prototype.defaultNodeSize = function(x3) {
        if (!x3) return this._defaultNodeSize;
        this._defaultNodeSize = x3;
        return this;
      };
      Layout2.prototype.groupCompactness = function(x3) {
        if (!x3) return this._groupCompactness;
        this._groupCompactness = x3;
        return this;
      };
      Layout2.prototype.linkDistance = function(x3) {
        if (!x3) {
          return this._linkDistance;
        }
        this._linkDistance = typeof x3 === "function" ? x3 : +x3;
        this._linkLengthCalculator = null;
        return this;
      };
      Layout2.prototype.linkType = function(f) {
        this._linkType = f;
        return this;
      };
      Layout2.prototype.convergenceThreshold = function(x3) {
        if (!x3) return this._threshold;
        this._threshold = typeof x3 === "function" ? x3 : +x3;
        return this;
      };
      Layout2.prototype.alpha = function(x3) {
        if (!arguments.length) return this._alpha;
        else {
          x3 = +x3;
          if (this._alpha) {
            if (x3 > 0) this._alpha = x3;
            else this._alpha = 0;
          } else if (x3 > 0) {
            if (!this._running) {
              this._running = true;
              this.trigger({
                type: EventType.start,
                alpha: this._alpha = x3
              });
              this.kick();
            }
          }
          return this;
        }
      };
      Layout2.prototype.getLinkLength = function(link) {
        return typeof this._linkDistance === "function" ? +this._linkDistance(link) : this._linkDistance;
      };
      Layout2.setLinkLength = function(link, length) {
        link.length = length;
      };
      Layout2.prototype.getLinkType = function(link) {
        return typeof this._linkType === "function" ? this._linkType(link) : 0;
      };
      Layout2.prototype.symmetricDiffLinkLengths = function(idealLength, w) {
        var _this = this;
        if (w === void 0) {
          w = 1;
        }
        this.linkDistance(function(l) {
          return idealLength * l.length;
        });
        this._linkLengthCalculator = function() {
          return linklengths_1.symmetricDiffLinkLengths(_this._links, _this.linkAccessor, w);
        };
        return this;
      };
      Layout2.prototype.jaccardLinkLengths = function(idealLength, w) {
        var _this = this;
        if (w === void 0) {
          w = 1;
        }
        this.linkDistance(function(l) {
          return idealLength * l.length;
        });
        this._linkLengthCalculator = function() {
          return linklengths_1.jaccardLinkLengths(_this._links, _this.linkAccessor, w);
        };
        return this;
      };
      Layout2.prototype.start = function(initialUnconstrainedIterations, initialUserConstraintIterations, initialAllConstraintsIterations, gridSnapIterations, keepRunning, centerGraph) {
        var _this = this;
        if (initialUnconstrainedIterations === void 0) {
          initialUnconstrainedIterations = 0;
        }
        if (initialUserConstraintIterations === void 0) {
          initialUserConstraintIterations = 0;
        }
        if (initialAllConstraintsIterations === void 0) {
          initialAllConstraintsIterations = 0;
        }
        if (gridSnapIterations === void 0) {
          gridSnapIterations = 0;
        }
        if (keepRunning === void 0) {
          keepRunning = true;
        }
        if (centerGraph === void 0) {
          centerGraph = true;
        }
        var i, j, n = this.nodes().length, N = n + 2 * this._groups.length, m2 = this._links.length, w = this._canvasSize[0], h = this._canvasSize[1];
        var x3 = new Array(N), y3 = new Array(N);
        var G = null;
        var ao = this._avoidOverlaps;
        this._nodes.forEach(function(v, i2) {
          v.index = i2;
          if (typeof v.x === "undefined") {
            v.x = w / 2, v.y = h / 2;
          }
          x3[i2] = v.x, y3[i2] = v.y;
        });
        if (this._linkLengthCalculator) this._linkLengthCalculator();
        var distances;
        if (this._distanceMatrix) {
          distances = this._distanceMatrix;
        } else {
          distances = new shortestpaths_1.Calculator(N, this._links, Layout2.getSourceIndex, Layout2.getTargetIndex, function(l) {
            return _this.getLinkLength(l);
          }).DistanceMatrix();
          G = descent_1.Descent.createSquareMatrix(N, function() {
            return 2;
          });
          this._links.forEach(function(l) {
            if (typeof l.source == "number") l.source = _this._nodes[l.source];
            if (typeof l.target == "number") l.target = _this._nodes[l.target];
          });
          this._links.forEach(function(e) {
            var u = Layout2.getSourceIndex(e), v = Layout2.getTargetIndex(e);
            G[u][v] = G[v][u] = e.weight || 1;
          });
        }
        var D2 = descent_1.Descent.createSquareMatrix(N, function(i2, j2) {
          return distances[i2][j2];
        });
        if (this._rootGroup && typeof this._rootGroup.groups !== "undefined") {
          var i = n;
          var addAttraction = function(i2, j2, strength, idealDistance) {
            G[i2][j2] = G[j2][i2] = strength;
            D2[i2][j2] = D2[j2][i2] = idealDistance;
          };
          this._groups.forEach(function(g) {
            addAttraction(i, i + 1, _this._groupCompactness, 0.1);
            x3[i] = 0, y3[i++] = 0;
            x3[i] = 0, y3[i++] = 0;
          });
        } else this._rootGroup = {
          leaves: this._nodes,
          groups: []
        };
        var curConstraints = this._constraints || [];
        if (this._directedLinkConstraints) {
          this.linkAccessor.getMinSeparation = this._directedLinkConstraints.getMinSeparation;
          curConstraints = curConstraints.concat(linklengths_1.generateDirectedEdgeConstraints(n, this._links, this._directedLinkConstraints.axis, this.linkAccessor));
        }
        this.avoidOverlaps(false);
        this._descent = new descent_1.Descent([x3, y3], D2);
        this._descent.locks.clear();
        for (var i = 0; i < n; ++i) {
          var o = this._nodes[i];
          if (o.fixed) {
            o.px = o.x;
            o.py = o.y;
            var p = [o.x, o.y];
            this._descent.locks.add(i, p);
          }
        }
        this._descent.threshold = this._threshold;
        this.initialLayout(initialUnconstrainedIterations, x3, y3);
        if (curConstraints.length > 0) this._descent.project = new rectangle_1.Projection(this._nodes, this._groups, this._rootGroup, curConstraints).projectFunctions();
        this._descent.run(initialUserConstraintIterations);
        this.separateOverlappingComponents(w, h, centerGraph);
        this.avoidOverlaps(ao);
        if (ao) {
          this._nodes.forEach(function(v, i2) {
            v.x = x3[i2], v.y = y3[i2];
          });
          this._descent.project = new rectangle_1.Projection(this._nodes, this._groups, this._rootGroup, curConstraints, true).projectFunctions();
          this._nodes.forEach(function(v, i2) {
            x3[i2] = v.x, y3[i2] = v.y;
          });
        }
        this._descent.G = G;
        this._descent.run(initialAllConstraintsIterations);
        if (gridSnapIterations) {
          this._descent.snapStrength = 1e3;
          this._descent.snapGridSize = this._nodes[0].width;
          this._descent.numGridSnapNodes = n;
          this._descent.scaleSnapByMaxH = n != N;
          var G0 = descent_1.Descent.createSquareMatrix(N, function(i2, j2) {
            if (i2 >= n || j2 >= n) return G[i2][j2];
            return 0;
          });
          this._descent.G = G0;
          this._descent.run(gridSnapIterations);
        }
        this.updateNodePositions();
        this.separateOverlappingComponents(w, h, centerGraph);
        return keepRunning ? this.resume() : this;
      };
      Layout2.prototype.initialLayout = function(iterations, x3, y3) {
        if (this._groups.length > 0 && iterations > 0) {
          var n = this._nodes.length;
          var edges = this._links.map(function(e) {
            return {
              source: e.source.index,
              target: e.target.index
            };
          });
          var vs = this._nodes.map(function(v) {
            return {
              index: v.index
            };
          });
          this._groups.forEach(function(g, i) {
            vs.push({
              index: g.index = n + i
            });
          });
          this._groups.forEach(function(g, i) {
            if (typeof g.leaves !== "undefined") g.leaves.forEach(function(v) {
              return edges.push({
                source: g.index,
                target: v.index
              });
            });
            if (typeof g.groups !== "undefined") g.groups.forEach(function(gg) {
              return edges.push({
                source: g.index,
                target: gg.index
              });
            });
          });
          new Layout2().size(this.size()).nodes(vs).links(edges).avoidOverlaps(false).linkDistance(this.linkDistance()).symmetricDiffLinkLengths(5).convergenceThreshold(1e-4).start(iterations, 0, 0, 0, false);
          this._nodes.forEach(function(v) {
            x3[v.index] = vs[v.index].x;
            y3[v.index] = vs[v.index].y;
          });
        } else {
          this._descent.run(iterations);
        }
      };
      Layout2.prototype.separateOverlappingComponents = function(width, height, centerGraph) {
        var _this = this;
        if (centerGraph === void 0) {
          centerGraph = true;
        }
        if (!this._distanceMatrix && this._handleDisconnected) {
          var x_1 = this._descent.x[0], y_1 = this._descent.x[1];
          this._nodes.forEach(function(v, i) {
            v.x = x_1[i], v.y = y_1[i];
          });
          var graphs = handledisconnected_1.separateGraphs(this._nodes, this._links);
          handledisconnected_1.applyPacking(graphs, width, height, this._defaultNodeSize, 1, centerGraph);
          this._nodes.forEach(function(v, i) {
            _this._descent.x[0][i] = v.x, _this._descent.x[1][i] = v.y;
            if (v.bounds) {
              v.bounds.setXCentre(v.x);
              v.bounds.setYCentre(v.y);
            }
          });
        }
      };
      Layout2.prototype.resume = function() {
        return this.alpha(0.1);
      };
      Layout2.prototype.stop = function() {
        return this.alpha(0);
      };
      Layout2.prototype.prepareEdgeRouting = function(nodeMargin) {
        if (nodeMargin === void 0) {
          nodeMargin = 0;
        }
        this._visibilityGraph = new geom_1.TangentVisibilityGraph(this._nodes.map(function(v) {
          return v.bounds.inflate(-nodeMargin).vertices();
        }));
      };
      Layout2.prototype.routeEdge = function(edge, ah, draw) {
        if (ah === void 0) {
          ah = 5;
        }
        var lineData = [];
        var vg2 = new geom_1.TangentVisibilityGraph(this._visibilityGraph.P, {
          V: this._visibilityGraph.V,
          E: this._visibilityGraph.E
        }), port1 = {
          x: edge.source.x,
          y: edge.source.y
        }, port2 = {
          x: edge.target.x,
          y: edge.target.y
        }, start2 = vg2.addPoint(port1, edge.source.index), end = vg2.addPoint(port2, edge.target.index);
        vg2.addEdgeIfVisible(port1, port2, edge.source.index, edge.target.index);
        if (typeof draw !== "undefined") {
          draw(vg2);
        }
        var sourceInd = function(e) {
          return e.source.id;
        }, targetInd = function(e) {
          return e.target.id;
        }, length = function(e) {
          return e.length();
        }, spCalc = new shortestpaths_1.Calculator(vg2.V.length, vg2.E, sourceInd, targetInd, length), shortestPath = spCalc.PathFromNodeToNode(start2.id, end.id);
        if (shortestPath.length === 1 || shortestPath.length === vg2.V.length) {
          var route = rectangle_1.makeEdgeBetween(edge.source.innerBounds, edge.target.innerBounds, ah);
          lineData = [route.sourceIntersection, route.arrowStart];
        } else {
          var n = shortestPath.length - 2, p = vg2.V[shortestPath[n]].p, q = vg2.V[shortestPath[0]].p, lineData = [edge.source.innerBounds.rayIntersection(p.x, p.y)];
          for (var i = n; i >= 0; --i) lineData.push(vg2.V[shortestPath[i]].p);
          lineData.push(rectangle_1.makeEdgeTo(q, edge.target.innerBounds, ah));
        }
        return lineData;
      };
      Layout2.getSourceIndex = function(e) {
        return typeof e.source === "number" ? e.source : e.source.index;
      };
      Layout2.getTargetIndex = function(e) {
        return typeof e.target === "number" ? e.target : e.target.index;
      };
      Layout2.linkId = function(e) {
        return Layout2.getSourceIndex(e) + "-" + Layout2.getTargetIndex(e);
      };
      Layout2.dragStart = function(d) {
        if (isGroup(d)) {
          Layout2.storeOffset(d, Layout2.dragOrigin(d));
        } else {
          Layout2.stopNode(d);
          d.fixed |= 2;
        }
      };
      Layout2.stopNode = function(v) {
        v.px = v.x;
        v.py = v.y;
      };
      Layout2.storeOffset = function(d, origin) {
        if (typeof d.leaves !== "undefined") {
          d.leaves.forEach(function(v) {
            v.fixed |= 2;
            Layout2.stopNode(v);
            v._dragGroupOffsetX = v.x - origin.x;
            v._dragGroupOffsetY = v.y - origin.y;
          });
        }
        if (typeof d.groups !== "undefined") {
          d.groups.forEach(function(g) {
            return Layout2.storeOffset(g, origin);
          });
        }
      };
      Layout2.dragOrigin = function(d) {
        if (isGroup(d)) {
          return {
            x: d.bounds.cx(),
            y: d.bounds.cy()
          };
        } else {
          return d;
        }
      };
      Layout2.drag = function(d, position) {
        if (isGroup(d)) {
          if (typeof d.leaves !== "undefined") {
            d.leaves.forEach(function(v) {
              d.bounds.setXCentre(position.x);
              d.bounds.setYCentre(position.y);
              v.px = v._dragGroupOffsetX + position.x;
              v.py = v._dragGroupOffsetY + position.y;
            });
          }
          if (typeof d.groups !== "undefined") {
            d.groups.forEach(function(g) {
              return Layout2.drag(g, position);
            });
          }
        } else {
          d.px = position.x;
          d.py = position.y;
        }
      };
      Layout2.dragEnd = function(d) {
        if (isGroup(d)) {
          if (typeof d.leaves !== "undefined") {
            d.leaves.forEach(function(v) {
              Layout2.dragEnd(v);
              delete v._dragGroupOffsetX;
              delete v._dragGroupOffsetY;
            });
          }
          if (typeof d.groups !== "undefined") {
            d.groups.forEach(Layout2.dragEnd);
          }
        } else {
          d.fixed &= ~6;
        }
      };
      Layout2.mouseOver = function(d) {
        d.fixed |= 4;
        d.px = d.x, d.py = d.y;
      };
      Layout2.mouseOut = function(d) {
        d.fixed &= ~4;
      };
      return Layout2;
    }();
    exports.Layout = Layout;
  }
});

// node_modules/webcola/dist/src/adaptor.js
var require_adaptor = __commonJS({
  "node_modules/webcola/dist/src/adaptor.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d2, b10) {
          d2.__proto__ = b10;
        } || function(d2, b10) {
          for (var p in b10) if (b10.hasOwnProperty(p)) d2[p] = b10[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var layout_1 = require_layout2();
    var LayoutAdaptor = function(_super) {
      __extends(LayoutAdaptor2, _super);
      function LayoutAdaptor2(options) {
        var _this = _super.call(this) || this;
        var self2 = _this;
        var o = options;
        if (o.trigger) {
          _this.trigger = o.trigger;
        }
        if (o.kick) {
          _this.kick = o.kick;
        }
        if (o.drag) {
          _this.drag = o.drag;
        }
        if (o.on) {
          _this.on = o.on;
        }
        _this.dragstart = _this.dragStart = layout_1.Layout.dragStart;
        _this.dragend = _this.dragEnd = layout_1.Layout.dragEnd;
        return _this;
      }
      LayoutAdaptor2.prototype.trigger = function(e) {
      };
      ;
      LayoutAdaptor2.prototype.kick = function() {
      };
      ;
      LayoutAdaptor2.prototype.drag = function() {
      };
      ;
      LayoutAdaptor2.prototype.on = function(eventType, listener) {
        return this;
      };
      ;
      return LayoutAdaptor2;
    }(layout_1.Layout);
    exports.LayoutAdaptor = LayoutAdaptor;
    function adaptor(options) {
      return new LayoutAdaptor(options);
    }
    exports.adaptor = adaptor;
  }
});

// node_modules/webcola/dist/src/d3v3adaptor.js
var require_d3v3adaptor = __commonJS({
  "node_modules/webcola/dist/src/d3v3adaptor.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d2, b10) {
          d2.__proto__ = b10;
        } || function(d2, b10) {
          for (var p in b10) if (b10.hasOwnProperty(p)) d2[p] = b10[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var layout_1 = require_layout2();
    var D3StyleLayoutAdaptor = function(_super) {
      __extends(D3StyleLayoutAdaptor2, _super);
      function D3StyleLayoutAdaptor2() {
        var _this = _super.call(this) || this;
        _this.event = d3.dispatch(layout_1.EventType[layout_1.EventType.start], layout_1.EventType[layout_1.EventType.tick], layout_1.EventType[layout_1.EventType.end]);
        var d3layout = _this;
        var drag;
        _this.drag = function() {
          if (!drag2) {
            var drag2 = d3.behavior.drag().origin(layout_1.Layout.dragOrigin).on("dragstart.d3adaptor", layout_1.Layout.dragStart).on("drag.d3adaptor", function(d) {
              layout_1.Layout.drag(d, d3.event);
              d3layout.resume();
            }).on("dragend.d3adaptor", layout_1.Layout.dragEnd);
          }
          if (!arguments.length) return drag2;
          this.call(drag2);
        };
        return _this;
      }
      D3StyleLayoutAdaptor2.prototype.trigger = function(e) {
        var d3event = {
          type: layout_1.EventType[e.type],
          alpha: e.alpha,
          stress: e.stress
        };
        this.event[d3event.type](d3event);
      };
      D3StyleLayoutAdaptor2.prototype.kick = function() {
        var _this = this;
        d3.timer(function() {
          return _super.prototype.tick.call(_this);
        });
      };
      D3StyleLayoutAdaptor2.prototype.on = function(eventType, listener) {
        if (typeof eventType === "string") {
          this.event.on(eventType, listener);
        } else {
          this.event.on(layout_1.EventType[eventType], listener);
        }
        return this;
      };
      return D3StyleLayoutAdaptor2;
    }(layout_1.Layout);
    exports.D3StyleLayoutAdaptor = D3StyleLayoutAdaptor;
    function d3adaptor2() {
      return new D3StyleLayoutAdaptor();
    }
    exports.d3adaptor = d3adaptor2;
  }
});

// node_modules/webcola/dist/src/d3v4adaptor.js
var require_d3v4adaptor = __commonJS({
  "node_modules/webcola/dist/src/d3v4adaptor.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d2, b10) {
          d2.__proto__ = b10;
        } || function(d2, b10) {
          for (var p in b10) if (b10.hasOwnProperty(p)) d2[p] = b10[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var layout_1 = require_layout2();
    var D3StyleLayoutAdaptor = function(_super) {
      __extends(D3StyleLayoutAdaptor2, _super);
      function D3StyleLayoutAdaptor2(d3Context) {
        var _this = _super.call(this) || this;
        _this.d3Context = d3Context;
        _this.event = d3Context.dispatch(layout_1.EventType[layout_1.EventType.start], layout_1.EventType[layout_1.EventType.tick], layout_1.EventType[layout_1.EventType.end]);
        var d3layout = _this;
        var drag;
        _this.drag = function() {
          if (!drag2) {
            var drag2 = d3Context.drag().subject(layout_1.Layout.dragOrigin).on("start.d3adaptor", layout_1.Layout.dragStart).on("drag.d3adaptor", function(d) {
              layout_1.Layout.drag(d, d3Context.event);
              d3layout.resume();
            }).on("end.d3adaptor", layout_1.Layout.dragEnd);
          }
          if (!arguments.length) return drag2;
          arguments[0].call(drag2);
        };
        return _this;
      }
      D3StyleLayoutAdaptor2.prototype.trigger = function(e) {
        var d3event = {
          type: layout_1.EventType[e.type],
          alpha: e.alpha,
          stress: e.stress
        };
        this.event.call(d3event.type, d3event);
      };
      D3StyleLayoutAdaptor2.prototype.kick = function() {
        var _this = this;
        var t = this.d3Context.timer(function() {
          return _super.prototype.tick.call(_this) && t.stop();
        });
      };
      D3StyleLayoutAdaptor2.prototype.on = function(eventType, listener) {
        if (typeof eventType === "string") {
          this.event.on(eventType, listener);
        } else {
          this.event.on(layout_1.EventType[eventType], listener);
        }
        return this;
      };
      return D3StyleLayoutAdaptor2;
    }(layout_1.Layout);
    exports.D3StyleLayoutAdaptor = D3StyleLayoutAdaptor;
  }
});

// node_modules/webcola/dist/src/d3adaptor.js
var require_d3adaptor = __commonJS({
  "node_modules/webcola/dist/src/d3adaptor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var d3v3 = require_d3v3adaptor();
    var d3v4 = require_d3v4adaptor();
    function d3adaptor2(d3Context) {
      if (!d3Context || isD3V3(d3Context)) {
        return new d3v3.D3StyleLayoutAdaptor();
      }
      return new d3v4.D3StyleLayoutAdaptor(d3Context);
    }
    exports.d3adaptor = d3adaptor2;
    function isD3V3(d3Context) {
      var v3exp = /^3\./;
      return d3Context.version && d3Context.version.match(v3exp) !== null;
    }
  }
});

// node_modules/webcola/dist/src/gridrouter.js
var require_gridrouter = __commonJS({
  "node_modules/webcola/dist/src/gridrouter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var rectangle_1 = require_rectangle();
    var vpsc_1 = require_vpsc();
    var shortestpaths_1 = require_shortestpaths();
    var NodeWrapper = /* @__PURE__ */ function() {
      function NodeWrapper2(id3, rect, children2) {
        this.id = id3;
        this.rect = rect;
        this.children = children2;
        this.leaf = typeof children2 === "undefined" || children2.length === 0;
      }
      return NodeWrapper2;
    }();
    exports.NodeWrapper = NodeWrapper;
    var Vert = /* @__PURE__ */ function() {
      function Vert2(id3, x3, y3, node, line) {
        if (node === void 0) {
          node = null;
        }
        if (line === void 0) {
          line = null;
        }
        this.id = id3;
        this.x = x3;
        this.y = y3;
        this.node = node;
        this.line = line;
      }
      return Vert2;
    }();
    exports.Vert = Vert;
    var LongestCommonSubsequence = function() {
      function LongestCommonSubsequence2(s, t) {
        this.s = s;
        this.t = t;
        var mf = LongestCommonSubsequence2.findMatch(s, t);
        var tr = t.slice(0).reverse();
        var mr = LongestCommonSubsequence2.findMatch(s, tr);
        if (mf.length >= mr.length) {
          this.length = mf.length;
          this.si = mf.si;
          this.ti = mf.ti;
          this.reversed = false;
        } else {
          this.length = mr.length;
          this.si = mr.si;
          this.ti = t.length - mr.ti - mr.length;
          this.reversed = true;
        }
      }
      LongestCommonSubsequence2.findMatch = function(s, t) {
        var m2 = s.length;
        var n = t.length;
        var match = {
          length: 0,
          si: -1,
          ti: -1
        };
        var l = new Array(m2);
        for (var i = 0; i < m2; i++) {
          l[i] = new Array(n);
          for (var j = 0; j < n; j++) if (s[i] === t[j]) {
            var v = l[i][j] = i === 0 || j === 0 ? 1 : l[i - 1][j - 1] + 1;
            if (v > match.length) {
              match.length = v;
              match.si = i - v + 1;
              match.ti = j - v + 1;
            }
            ;
          } else l[i][j] = 0;
        }
        return match;
      };
      LongestCommonSubsequence2.prototype.getSequence = function() {
        return this.length >= 0 ? this.s.slice(this.si, this.si + this.length) : [];
      };
      return LongestCommonSubsequence2;
    }();
    exports.LongestCommonSubsequence = LongestCommonSubsequence;
    var GridRouter = function() {
      function GridRouter2(originalnodes, accessor, groupPadding) {
        var _this = this;
        if (groupPadding === void 0) {
          groupPadding = 12;
        }
        this.originalnodes = originalnodes;
        this.groupPadding = groupPadding;
        this.leaves = null;
        this.nodes = originalnodes.map(function(v, i) {
          return new NodeWrapper(i, accessor.getBounds(v), accessor.getChildren(v));
        });
        this.leaves = this.nodes.filter(function(v) {
          return v.leaf;
        });
        this.groups = this.nodes.filter(function(g) {
          return !g.leaf;
        });
        this.cols = this.getGridLines("x");
        this.rows = this.getGridLines("y");
        this.groups.forEach(function(v) {
          return v.children.forEach(function(c2) {
            return _this.nodes[c2].parent = v;
          });
        });
        this.root = {
          children: []
        };
        this.nodes.forEach(function(v) {
          if (typeof v.parent === "undefined") {
            v.parent = _this.root;
            _this.root.children.push(v.id);
          }
          v.ports = [];
        });
        this.backToFront = this.nodes.slice(0);
        this.backToFront.sort(function(x3, y3) {
          return _this.getDepth(x3) - _this.getDepth(y3);
        });
        var frontToBackGroups = this.backToFront.slice(0).reverse().filter(function(g) {
          return !g.leaf;
        });
        frontToBackGroups.forEach(function(v) {
          var r = rectangle_1.Rectangle.empty();
          v.children.forEach(function(c2) {
            return r = r.union(_this.nodes[c2].rect);
          });
          v.rect = r.inflate(_this.groupPadding);
        });
        var colMids = this.midPoints(this.cols.map(function(r) {
          return r.pos;
        }));
        var rowMids = this.midPoints(this.rows.map(function(r) {
          return r.pos;
        }));
        var rowx = colMids[0], rowX = colMids[colMids.length - 1];
        var coly = rowMids[0], colY = rowMids[rowMids.length - 1];
        var hlines = this.rows.map(function(r) {
          return {
            x1: rowx,
            x2: rowX,
            y1: r.pos,
            y2: r.pos
          };
        }).concat(rowMids.map(function(m2) {
          return {
            x1: rowx,
            x2: rowX,
            y1: m2,
            y2: m2
          };
        }));
        var vlines = this.cols.map(function(c2) {
          return {
            x1: c2.pos,
            x2: c2.pos,
            y1: coly,
            y2: colY
          };
        }).concat(colMids.map(function(m2) {
          return {
            x1: m2,
            x2: m2,
            y1: coly,
            y2: colY
          };
        }));
        var lines = hlines.concat(vlines);
        lines.forEach(function(l) {
          return l.verts = [];
        });
        this.verts = [];
        this.edges = [];
        hlines.forEach(function(h) {
          return vlines.forEach(function(v) {
            var p = new Vert(_this.verts.length, v.x1, h.y1);
            h.verts.push(p);
            v.verts.push(p);
            _this.verts.push(p);
            var i = _this.backToFront.length;
            while (i-- > 0) {
              var node = _this.backToFront[i], r = node.rect;
              var dx = Math.abs(p.x - r.cx()), dy = Math.abs(p.y - r.cy());
              if (dx < r.width() / 2 && dy < r.height() / 2) {
                p.node = node;
                break;
              }
            }
          });
        });
        lines.forEach(function(l, li) {
          _this.nodes.forEach(function(v2, i2) {
            v2.rect.lineIntersections(l.x1, l.y1, l.x2, l.y2).forEach(function(intersect, j) {
              var p = new Vert(_this.verts.length, intersect.x, intersect.y, v2, l);
              _this.verts.push(p);
              l.verts.push(p);
              v2.ports.push(p);
            });
          });
          var isHoriz = Math.abs(l.y1 - l.y2) < 0.1;
          var delta = function(a2, b) {
            return isHoriz ? b.x - a2.x : b.y - a2.y;
          };
          l.verts.sort(delta);
          for (var i = 1; i < l.verts.length; i++) {
            var u = l.verts[i - 1], v = l.verts[i];
            if (u.node && u.node === v.node && u.node.leaf) continue;
            _this.edges.push({
              source: u.id,
              target: v.id,
              length: Math.abs(delta(u, v))
            });
          }
        });
      }
      GridRouter2.prototype.avg = function(a2) {
        return a2.reduce(function(x3, y3) {
          return x3 + y3;
        }) / a2.length;
      };
      GridRouter2.prototype.getGridLines = function(axis) {
        var columns = [];
        var ls = this.leaves.slice(0, this.leaves.length);
        while (ls.length > 0) {
          var overlapping = ls.filter(function(v) {
            return v.rect["overlap" + axis.toUpperCase()](ls[0].rect);
          });
          var col = {
            nodes: overlapping,
            pos: this.avg(overlapping.map(function(v) {
              return v.rect["c" + axis]();
            }))
          };
          columns.push(col);
          col.nodes.forEach(function(v) {
            return ls.splice(ls.indexOf(v), 1);
          });
        }
        columns.sort(function(a2, b) {
          return a2.pos - b.pos;
        });
        return columns;
      };
      GridRouter2.prototype.getDepth = function(v) {
        var depth = 0;
        while (v.parent !== this.root) {
          depth++;
          v = v.parent;
        }
        return depth;
      };
      GridRouter2.prototype.midPoints = function(a2) {
        var gap = a2[1] - a2[0];
        var mids = [a2[0] - gap / 2];
        for (var i = 1; i < a2.length; i++) {
          mids.push((a2[i] + a2[i - 1]) / 2);
        }
        mids.push(a2[a2.length - 1] + gap / 2);
        return mids;
      };
      GridRouter2.prototype.findLineage = function(v) {
        var lineage = [v];
        do {
          v = v.parent;
          lineage.push(v);
        } while (v !== this.root);
        return lineage.reverse();
      };
      GridRouter2.prototype.findAncestorPathBetween = function(a2, b) {
        var aa = this.findLineage(a2), ba = this.findLineage(b), i = 0;
        while (aa[i] === ba[i]) i++;
        return {
          commonAncestor: aa[i - 1],
          lineages: aa.slice(i).concat(ba.slice(i))
        };
      };
      GridRouter2.prototype.siblingObstacles = function(a2, b) {
        var _this = this;
        var path = this.findAncestorPathBetween(a2, b);
        var lineageLookup = {};
        path.lineages.forEach(function(v) {
          return lineageLookup[v.id] = {};
        });
        var obstacles = path.commonAncestor.children.filter(function(v) {
          return !(v in lineageLookup);
        });
        path.lineages.filter(function(v) {
          return v.parent !== path.commonAncestor;
        }).forEach(function(v) {
          return obstacles = obstacles.concat(v.parent.children.filter(function(c2) {
            return c2 !== v.id;
          }));
        });
        return obstacles.map(function(v) {
          return _this.nodes[v];
        });
      };
      GridRouter2.getSegmentSets = function(routes, x3, y3) {
        var vsegments = [];
        for (var ei = 0; ei < routes.length; ei++) {
          var route = routes[ei];
          for (var si = 0; si < route.length; si++) {
            var s = route[si];
            s.edgeid = ei;
            s.i = si;
            var sdx = s[1][x3] - s[0][x3];
            if (Math.abs(sdx) < 0.1) {
              vsegments.push(s);
            }
          }
        }
        vsegments.sort(function(a2, b) {
          return a2[0][x3] - b[0][x3];
        });
        var vsegmentsets = [];
        var segmentset = null;
        for (var i = 0; i < vsegments.length; i++) {
          var s = vsegments[i];
          if (!segmentset || Math.abs(s[0][x3] - segmentset.pos) > 0.1) {
            segmentset = {
              pos: s[0][x3],
              segments: []
            };
            vsegmentsets.push(segmentset);
          }
          segmentset.segments.push(s);
        }
        return vsegmentsets;
      };
      GridRouter2.nudgeSegs = function(x3, y3, routes, segments, leftOf, gap) {
        var n = segments.length;
        if (n <= 1) return;
        var vs = segments.map(function(s) {
          return new vpsc_1.Variable(s[0][x3]);
        });
        var cs = [];
        for (var i = 0; i < n; i++) {
          for (var j = 0; j < n; j++) {
            if (i === j) continue;
            var s1 = segments[i], s2 = segments[j], e1 = s1.edgeid, e22 = s2.edgeid, lind = -1, rind = -1;
            if (x3 == "x") {
              if (leftOf(e1, e22)) {
                if (s1[0][y3] < s1[1][y3]) {
                  lind = j, rind = i;
                } else {
                  lind = i, rind = j;
                }
              }
            } else {
              if (leftOf(e1, e22)) {
                if (s1[0][y3] < s1[1][y3]) {
                  lind = i, rind = j;
                } else {
                  lind = j, rind = i;
                }
              }
            }
            if (lind >= 0) {
              cs.push(new vpsc_1.Constraint(vs[lind], vs[rind], gap));
            }
          }
        }
        var solver = new vpsc_1.Solver(vs, cs);
        solver.solve();
        vs.forEach(function(v, i2) {
          var s = segments[i2];
          var pos = v.position();
          s[0][x3] = s[1][x3] = pos;
          var route = routes[s.edgeid];
          if (s.i > 0) route[s.i - 1][1][x3] = pos;
          if (s.i < route.length - 1) route[s.i + 1][0][x3] = pos;
        });
      };
      GridRouter2.nudgeSegments = function(routes, x3, y3, leftOf, gap) {
        var vsegmentsets = GridRouter2.getSegmentSets(routes, x3, y3);
        for (var i = 0; i < vsegmentsets.length; i++) {
          var ss = vsegmentsets[i];
          var events = [];
          for (var j = 0; j < ss.segments.length; j++) {
            var s = ss.segments[j];
            events.push({
              type: 0,
              s,
              pos: Math.min(s[0][y3], s[1][y3])
            });
            events.push({
              type: 1,
              s,
              pos: Math.max(s[0][y3], s[1][y3])
            });
          }
          events.sort(function(a2, b) {
            return a2.pos - b.pos + a2.type - b.type;
          });
          var open = [];
          var openCount = 0;
          events.forEach(function(e) {
            if (e.type === 0) {
              open.push(e.s);
              openCount++;
            } else {
              openCount--;
            }
            if (openCount == 0) {
              GridRouter2.nudgeSegs(x3, y3, routes, open, leftOf, gap);
              open = [];
            }
          });
        }
      };
      GridRouter2.prototype.routeEdges = function(edges, nudgeGap, source, target) {
        var _this = this;
        var routePaths = edges.map(function(e) {
          return _this.route(source(e), target(e));
        });
        var order = GridRouter2.orderEdges(routePaths);
        var routes = routePaths.map(function(e) {
          return GridRouter2.makeSegments(e);
        });
        GridRouter2.nudgeSegments(routes, "x", "y", order, nudgeGap);
        GridRouter2.nudgeSegments(routes, "y", "x", order, nudgeGap);
        GridRouter2.unreverseEdges(routes, routePaths);
        return routes;
      };
      GridRouter2.unreverseEdges = function(routes, routePaths) {
        routes.forEach(function(segments, i) {
          var path = routePaths[i];
          if (path.reversed) {
            segments.reverse();
            segments.forEach(function(segment) {
              segment.reverse();
            });
          }
        });
      };
      GridRouter2.angleBetween2Lines = function(line1, line2) {
        var angle1 = Math.atan2(line1[0].y - line1[1].y, line1[0].x - line1[1].x);
        var angle2 = Math.atan2(line2[0].y - line2[1].y, line2[0].x - line2[1].x);
        var diff = angle1 - angle2;
        if (diff > Math.PI || diff < -Math.PI) {
          diff = angle2 - angle1;
        }
        return diff;
      };
      GridRouter2.isLeft = function(a2, b, c2) {
        return (b.x - a2.x) * (c2.y - a2.y) - (b.y - a2.y) * (c2.x - a2.x) <= 0;
      };
      GridRouter2.getOrder = function(pairs2) {
        var outgoing = {};
        for (var i = 0; i < pairs2.length; i++) {
          var p = pairs2[i];
          if (typeof outgoing[p.l] === "undefined") outgoing[p.l] = {};
          outgoing[p.l][p.r] = true;
        }
        return function(l, r) {
          return typeof outgoing[l] !== "undefined" && outgoing[l][r];
        };
      };
      GridRouter2.orderEdges = function(edges) {
        var edgeOrder = [];
        for (var i = 0; i < edges.length - 1; i++) {
          for (var j = i + 1; j < edges.length; j++) {
            var e = edges[i], f = edges[j], lcs = new LongestCommonSubsequence(e, f);
            var u, vi, vj;
            if (lcs.length === 0) continue;
            if (lcs.reversed) {
              f.reverse();
              f.reversed = true;
              lcs = new LongestCommonSubsequence(e, f);
            }
            if ((lcs.si <= 0 || lcs.ti <= 0) && (lcs.si + lcs.length >= e.length || lcs.ti + lcs.length >= f.length)) {
              edgeOrder.push({
                l: i,
                r: j
              });
              continue;
            }
            if (lcs.si + lcs.length >= e.length || lcs.ti + lcs.length >= f.length) {
              u = e[lcs.si + 1];
              vj = e[lcs.si - 1];
              vi = f[lcs.ti - 1];
            } else {
              u = e[lcs.si + lcs.length - 2];
              vi = e[lcs.si + lcs.length];
              vj = f[lcs.ti + lcs.length];
            }
            if (GridRouter2.isLeft(u, vi, vj)) {
              edgeOrder.push({
                l: j,
                r: i
              });
            } else {
              edgeOrder.push({
                l: i,
                r: j
              });
            }
          }
        }
        return GridRouter2.getOrder(edgeOrder);
      };
      GridRouter2.makeSegments = function(path) {
        function copyPoint(p) {
          return {
            x: p.x,
            y: p.y
          };
        }
        var isStraight = function(a3, b10, c3) {
          return Math.abs((b10.x - a3.x) * (c3.y - a3.y) - (b10.y - a3.y) * (c3.x - a3.x)) < 1e-3;
        };
        var segments = [];
        var a2 = copyPoint(path[0]);
        for (var i = 1; i < path.length; i++) {
          var b = copyPoint(path[i]), c2 = i < path.length - 1 ? path[i + 1] : null;
          if (!c2 || !isStraight(a2, b, c2)) {
            segments.push([a2, b]);
            a2 = b;
          }
        }
        return segments;
      };
      GridRouter2.prototype.route = function(s, t) {
        var _this = this;
        var source = this.nodes[s], target = this.nodes[t];
        this.obstacles = this.siblingObstacles(source, target);
        var obstacleLookup = {};
        this.obstacles.forEach(function(o) {
          return obstacleLookup[o.id] = o;
        });
        this.passableEdges = this.edges.filter(function(e) {
          var u2 = _this.verts[e.source], v2 = _this.verts[e.target];
          return !(u2.node && u2.node.id in obstacleLookup || v2.node && v2.node.id in obstacleLookup);
        });
        for (var i = 1; i < source.ports.length; i++) {
          var u = source.ports[0].id;
          var v = source.ports[i].id;
          this.passableEdges.push({
            source: u,
            target: v,
            length: 0
          });
        }
        for (var i = 1; i < target.ports.length; i++) {
          var u = target.ports[0].id;
          var v = target.ports[i].id;
          this.passableEdges.push({
            source: u,
            target: v,
            length: 0
          });
        }
        var getSource = function(e) {
          return e.source;
        }, getTarget = function(e) {
          return e.target;
        }, getLength = function(e) {
          return e.length;
        };
        var shortestPathCalculator = new shortestpaths_1.Calculator(this.verts.length, this.passableEdges, getSource, getTarget, getLength);
        var bendPenalty = function(u2, v2, w) {
          var a2 = _this.verts[u2], b = _this.verts[v2], c2 = _this.verts[w];
          var dx = Math.abs(c2.x - a2.x), dy = Math.abs(c2.y - a2.y);
          if (a2.node === source && a2.node === b.node || b.node === target && b.node === c2.node) return 0;
          return dx > 1 && dy > 1 ? 1e3 : 0;
        };
        var shortestPath = shortestPathCalculator.PathFromNodeToNodeWithPrevCost(source.ports[0].id, target.ports[0].id, bendPenalty);
        var pathPoints = shortestPath.reverse().map(function(vi) {
          return _this.verts[vi];
        });
        pathPoints.push(this.nodes[target.id].ports[0]);
        return pathPoints.filter(function(v2, i2) {
          return !(i2 < pathPoints.length - 1 && pathPoints[i2 + 1].node === source && v2.node === source || i2 > 0 && v2.node === target && pathPoints[i2 - 1].node === target);
        });
      };
      GridRouter2.getRoutePath = function(route, cornerradius, arrowwidth, arrowheight) {
        var result = {
          routepath: "M " + route[0][0].x + " " + route[0][0].y + " ",
          arrowpath: ""
        };
        if (route.length > 1) {
          for (var i = 0; i < route.length; i++) {
            var li = route[i];
            var x3 = li[1].x, y3 = li[1].y;
            var dx = x3 - li[0].x;
            var dy = y3 - li[0].y;
            if (i < route.length - 1) {
              if (Math.abs(dx) > 0) {
                x3 -= dx / Math.abs(dx) * cornerradius;
              } else {
                y3 -= dy / Math.abs(dy) * cornerradius;
              }
              result.routepath += "L " + x3 + " " + y3 + " ";
              var l = route[i + 1];
              var x0 = l[0].x, y0 = l[0].y;
              var x1 = l[1].x;
              var y1 = l[1].y;
              dx = x1 - x0;
              dy = y1 - y0;
              var angle = GridRouter2.angleBetween2Lines(li, l) < 0 ? 1 : 0;
              var x22, y22;
              if (Math.abs(dx) > 0) {
                x22 = x0 + dx / Math.abs(dx) * cornerradius;
                y22 = y0;
              } else {
                x22 = x0;
                y22 = y0 + dy / Math.abs(dy) * cornerradius;
              }
              var cx = Math.abs(x22 - x3);
              var cy = Math.abs(y22 - y3);
              result.routepath += "A " + cx + " " + cy + " 0 0 " + angle + " " + x22 + " " + y22 + " ";
            } else {
              var arrowtip = [x3, y3];
              var arrowcorner1, arrowcorner2;
              if (Math.abs(dx) > 0) {
                x3 -= dx / Math.abs(dx) * arrowheight;
                arrowcorner1 = [x3, y3 + arrowwidth];
                arrowcorner2 = [x3, y3 - arrowwidth];
              } else {
                y3 -= dy / Math.abs(dy) * arrowheight;
                arrowcorner1 = [x3 + arrowwidth, y3];
                arrowcorner2 = [x3 - arrowwidth, y3];
              }
              result.routepath += "L " + x3 + " " + y3 + " ";
              if (arrowheight > 0) {
                result.arrowpath = "M " + arrowtip[0] + " " + arrowtip[1] + " L " + arrowcorner1[0] + " " + arrowcorner1[1] + " L " + arrowcorner2[0] + " " + arrowcorner2[1];
              }
            }
          }
        } else {
          var li = route[0];
          var x3 = li[1].x, y3 = li[1].y;
          var dx = x3 - li[0].x;
          var dy = y3 - li[0].y;
          var arrowtip = [x3, y3];
          var arrowcorner1, arrowcorner2;
          if (Math.abs(dx) > 0) {
            x3 -= dx / Math.abs(dx) * arrowheight;
            arrowcorner1 = [x3, y3 + arrowwidth];
            arrowcorner2 = [x3, y3 - arrowwidth];
          } else {
            y3 -= dy / Math.abs(dy) * arrowheight;
            arrowcorner1 = [x3 + arrowwidth, y3];
            arrowcorner2 = [x3 - arrowwidth, y3];
          }
          result.routepath += "L " + x3 + " " + y3 + " ";
          if (arrowheight > 0) {
            result.arrowpath = "M " + arrowtip[0] + " " + arrowtip[1] + " L " + arrowcorner1[0] + " " + arrowcorner1[1] + " L " + arrowcorner2[0] + " " + arrowcorner2[1];
          }
        }
        return result;
      };
      return GridRouter2;
    }();
    exports.GridRouter = GridRouter;
  }
});

// node_modules/webcola/dist/src/layout3d.js
var require_layout3d = __commonJS({
  "node_modules/webcola/dist/src/layout3d.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var shortestpaths_1 = require_shortestpaths();
    var descent_1 = require_descent();
    var rectangle_1 = require_rectangle();
    var linklengths_1 = require_linklengths();
    var Link3D = function() {
      function Link3D2(source, target) {
        this.source = source;
        this.target = target;
      }
      Link3D2.prototype.actualLength = function(x3) {
        var _this = this;
        return Math.sqrt(x3.reduce(function(c2, v) {
          var dx = v[_this.target] - v[_this.source];
          return c2 + dx * dx;
        }, 0));
      };
      return Link3D2;
    }();
    exports.Link3D = Link3D;
    var Node3D = /* @__PURE__ */ function() {
      function Node3D2(x3, y3, z) {
        if (x3 === void 0) {
          x3 = 0;
        }
        if (y3 === void 0) {
          y3 = 0;
        }
        if (z === void 0) {
          z = 0;
        }
        this.x = x3;
        this.y = y3;
        this.z = z;
      }
      return Node3D2;
    }();
    exports.Node3D = Node3D;
    var Layout3D = function() {
      function Layout3D2(nodes, links, idealLinkLength) {
        var _this = this;
        if (idealLinkLength === void 0) {
          idealLinkLength = 1;
        }
        this.nodes = nodes;
        this.links = links;
        this.idealLinkLength = idealLinkLength;
        this.constraints = null;
        this.useJaccardLinkLengths = true;
        this.result = new Array(Layout3D2.k);
        for (var i = 0; i < Layout3D2.k; ++i) {
          this.result[i] = new Array(nodes.length);
        }
        nodes.forEach(function(v, i2) {
          for (var _i = 0, _a = Layout3D2.dims; _i < _a.length; _i++) {
            var dim = _a[_i];
            if (typeof v[dim] == "undefined") v[dim] = Math.random();
          }
          _this.result[0][i2] = v.x;
          _this.result[1][i2] = v.y;
          _this.result[2][i2] = v.z;
        });
      }
      ;
      Layout3D2.prototype.linkLength = function(l) {
        return l.actualLength(this.result);
      };
      Layout3D2.prototype.start = function(iterations) {
        var _this = this;
        if (iterations === void 0) {
          iterations = 100;
        }
        var n = this.nodes.length;
        var linkAccessor = new LinkAccessor();
        if (this.useJaccardLinkLengths) linklengths_1.jaccardLinkLengths(this.links, linkAccessor, 1.5);
        this.links.forEach(function(e) {
          return e.length *= _this.idealLinkLength;
        });
        var distanceMatrix = new shortestpaths_1.Calculator(n, this.links, function(e) {
          return e.source;
        }, function(e) {
          return e.target;
        }, function(e) {
          return e.length;
        }).DistanceMatrix();
        var D2 = descent_1.Descent.createSquareMatrix(n, function(i2, j) {
          return distanceMatrix[i2][j];
        });
        var G = descent_1.Descent.createSquareMatrix(n, function() {
          return 2;
        });
        this.links.forEach(function(_a) {
          var source = _a.source, target = _a.target;
          return G[source][target] = G[target][source] = 1;
        });
        this.descent = new descent_1.Descent(this.result, D2);
        this.descent.threshold = 1e-3;
        this.descent.G = G;
        if (this.constraints) this.descent.project = new rectangle_1.Projection(this.nodes, null, null, this.constraints).projectFunctions();
        for (var i = 0; i < this.nodes.length; i++) {
          var v = this.nodes[i];
          if (v.fixed) {
            this.descent.locks.add(i, [v.x, v.y, v.z]);
          }
        }
        this.descent.run(iterations);
        return this;
      };
      Layout3D2.prototype.tick = function() {
        this.descent.locks.clear();
        for (var i = 0; i < this.nodes.length; i++) {
          var v = this.nodes[i];
          if (v.fixed) {
            this.descent.locks.add(i, [v.x, v.y, v.z]);
          }
        }
        return this.descent.rungeKutta();
      };
      Layout3D2.dims = ["x", "y", "z"];
      Layout3D2.k = Layout3D2.dims.length;
      return Layout3D2;
    }();
    exports.Layout3D = Layout3D;
    var LinkAccessor = function() {
      function LinkAccessor2() {
      }
      LinkAccessor2.prototype.getSourceIndex = function(e) {
        return e.source;
      };
      LinkAccessor2.prototype.getTargetIndex = function(e) {
        return e.target;
      };
      LinkAccessor2.prototype.getLength = function(e) {
        return e.length;
      };
      LinkAccessor2.prototype.setLength = function(e, l) {
        e.length = l;
      };
      return LinkAccessor2;
    }();
  }
});

// node_modules/webcola/dist/src/batch.js
var require_batch = __commonJS({
  "node_modules/webcola/dist/src/batch.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var layout_1 = require_layout2();
    var gridrouter_1 = require_gridrouter();
    function gridify(pgLayout, nudgeGap, margin, groupMargin) {
      pgLayout.cola.start(0, 0, 0, 10, false);
      var gridrouter = route(pgLayout.cola.nodes(), pgLayout.cola.groups(), margin, groupMargin);
      return gridrouter.routeEdges(pgLayout.powerGraph.powerEdges, nudgeGap, function(e) {
        return e.source.routerNode.id;
      }, function(e) {
        return e.target.routerNode.id;
      });
    }
    exports.gridify = gridify;
    function route(nodes, groups2, margin, groupMargin) {
      nodes.forEach(function(d) {
        d.routerNode = {
          name: d.name,
          bounds: d.bounds.inflate(-margin)
        };
      });
      groups2.forEach(function(d) {
        d.routerNode = {
          bounds: d.bounds.inflate(-groupMargin),
          children: (typeof d.groups !== "undefined" ? d.groups.map(function(c2) {
            return nodes.length + c2.id;
          }) : []).concat(typeof d.leaves !== "undefined" ? d.leaves.map(function(c2) {
            return c2.index;
          }) : [])
        };
      });
      var gridRouterNodes = nodes.concat(groups2).map(function(d, i) {
        d.routerNode.id = i;
        return d.routerNode;
      });
      return new gridrouter_1.GridRouter(gridRouterNodes, {
        getChildren: function(v) {
          return v.children;
        },
        getBounds: function(v) {
          return v.bounds;
        }
      }, margin - groupMargin);
    }
    function powerGraphGridLayout(graph, size, grouppadding) {
      var powerGraph;
      graph.nodes.forEach(function(v, i) {
        return v.index = i;
      });
      new layout_1.Layout().avoidOverlaps(false).nodes(graph.nodes).links(graph.links).powerGraphGroups(function(d) {
        powerGraph = d;
        powerGraph.groups.forEach(function(v) {
          return v.padding = grouppadding;
        });
      });
      var n = graph.nodes.length;
      var edges = [];
      var vs = graph.nodes.slice(0);
      vs.forEach(function(v, i) {
        return v.index = i;
      });
      powerGraph.groups.forEach(function(g) {
        var sourceInd = g.index = g.id + n;
        vs.push(g);
        if (typeof g.leaves !== "undefined") g.leaves.forEach(function(v) {
          return edges.push({
            source: sourceInd,
            target: v.index
          });
        });
        if (typeof g.groups !== "undefined") g.groups.forEach(function(gg) {
          return edges.push({
            source: sourceInd,
            target: gg.id + n
          });
        });
      });
      powerGraph.powerEdges.forEach(function(e) {
        edges.push({
          source: e.source.index,
          target: e.target.index
        });
      });
      new layout_1.Layout().size(size).nodes(vs).links(edges).avoidOverlaps(false).linkDistance(30).symmetricDiffLinkLengths(5).convergenceThreshold(1e-4).start(100, 0, 0, 0, false);
      return {
        cola: new layout_1.Layout().convergenceThreshold(1e-3).size(size).avoidOverlaps(true).nodes(graph.nodes).links(graph.links).groupCompactness(1e-4).linkDistance(30).symmetricDiffLinkLengths(5).powerGraphGroups(function(d) {
          powerGraph = d;
          powerGraph.groups.forEach(function(v) {
            v.padding = grouppadding;
          });
        }).start(50, 0, 100, 0, false),
        powerGraph
      };
    }
    exports.powerGraphGridLayout = powerGraphGridLayout;
  }
});

// node_modules/webcola/dist/index.js
var require_dist = __commonJS({
  "node_modules/webcola/dist/index.js"(exports) {
    "use strict";
    function __export2(m2) {
      for (var p in m2) if (!exports.hasOwnProperty(p)) exports[p] = m2[p];
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    __export2(require_adaptor());
    __export2(require_d3adaptor());
    __export2(require_descent());
    __export2(require_geom());
    __export2(require_gridrouter());
    __export2(require_handledisconnected());
    __export2(require_layout2());
    __export2(require_layout3d());
    __export2(require_linklengths());
    __export2(require_powergraph());
    __export2(require_pqueue());
    __export2(require_rbtree());
    __export2(require_rectangle());
    __export2(require_shortestpaths());
    __export2(require_vpsc());
    __export2(require_batch());
  }
});

// node_modules/@angular/animations/fesm2022/animations.mjs
var AnimationBuilder = class _AnimationBuilder {
  static ɵfac = function AnimationBuilder_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AnimationBuilder)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _AnimationBuilder,
    factory: () => (() => inject(BrowserAnimationBuilder))(),
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnimationBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root",
      useFactory: () => inject(BrowserAnimationBuilder)
    }]
  }], null, null);
})();
var AnimationFactory = class {
};
var BrowserAnimationBuilder = class _BrowserAnimationBuilder extends AnimationBuilder {
  animationModuleType = inject(ANIMATION_MODULE_TYPE, {
    optional: true
  });
  _nextAnimationId = 0;
  _renderer;
  constructor(rootRenderer, doc) {
    super();
    const typeData = {
      id: "0",
      encapsulation: ViewEncapsulation.None,
      styles: [],
      data: {
        animation: []
      }
    };
    this._renderer = rootRenderer.createRenderer(doc.body, typeData);
    if (this.animationModuleType === null && !isAnimationRenderer(this._renderer)) {
      throw new RuntimeError(3600, (typeof ngDevMode === "undefined" || ngDevMode) && "Angular detected that the `AnimationBuilder` was injected, but animation support was not enabled. Please make sure that you enable animations in your application by calling `provideAnimations()` or `provideAnimationsAsync()` function.");
    }
  }
  build(animation2) {
    const id3 = this._nextAnimationId;
    this._nextAnimationId++;
    const entry = Array.isArray(animation2) ? sequence(animation2) : animation2;
    issueAnimationCommand(this._renderer, null, id3, "register", [entry]);
    return new BrowserAnimationFactory(id3, this._renderer);
  }
  static ɵfac = function BrowserAnimationBuilder_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BrowserAnimationBuilder)(ɵɵinject(RendererFactory2), ɵɵinject(DOCUMENT));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _BrowserAnimationBuilder,
    factory: _BrowserAnimationBuilder.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrowserAnimationBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: RendererFactory2
  }, {
    type: Document,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
var BrowserAnimationFactory = class extends AnimationFactory {
  _id;
  _renderer;
  constructor(_id, _renderer) {
    super();
    this._id = _id;
    this._renderer = _renderer;
  }
  create(element, options) {
    return new RendererAnimationPlayer(this._id, element, options || {}, this._renderer);
  }
};
var RendererAnimationPlayer = class {
  id;
  element;
  _renderer;
  parentPlayer = null;
  _started = false;
  constructor(id3, element, options, _renderer) {
    this.id = id3;
    this.element = element;
    this._renderer = _renderer;
    this._command("create", options);
  }
  _listen(eventName, callback) {
    return this._renderer.listen(this.element, `@@${this.id}:${eventName}`, callback);
  }
  _command(command, ...args) {
    issueAnimationCommand(this._renderer, this.element, this.id, command, args);
  }
  onDone(fn) {
    this._listen("done", fn);
  }
  onStart(fn) {
    this._listen("start", fn);
  }
  onDestroy(fn) {
    this._listen("destroy", fn);
  }
  init() {
    this._command("init");
  }
  hasStarted() {
    return this._started;
  }
  play() {
    this._command("play");
    this._started = true;
  }
  pause() {
    this._command("pause");
  }
  restart() {
    this._command("restart");
  }
  finish() {
    this._command("finish");
  }
  destroy() {
    this._command("destroy");
  }
  reset() {
    this._command("reset");
    this._started = false;
  }
  setPosition(p) {
    this._command("setPosition", p);
  }
  getPosition() {
    return unwrapAnimationRenderer(this._renderer)?.engine?.players[this.id]?.getPosition() ?? 0;
  }
  totalTime = 0;
};
function issueAnimationCommand(renderer, element, id3, command, args) {
  renderer.setProperty(element, `@@${id3}:${command}`, args);
}
function unwrapAnimationRenderer(renderer) {
  const type = renderer.ɵtype;
  if (type === 0) {
    return renderer;
  } else if (type === 1) {
    return renderer.animationRenderer;
  }
  return null;
}
function isAnimationRenderer(renderer) {
  const type = renderer.ɵtype;
  return type === 0 || type === 1;
}

// node_modules/d3-selection/src/namespaces.js
var xhtml = "http://www.w3.org/1999/xhtml";
var namespaces_default = {
  svg: "http://www.w3.org/2000/svg",
  xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

// node_modules/d3-selection/src/namespace.js
function namespace_default(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces_default.hasOwnProperty(prefix) ? {
    space: namespaces_default[prefix],
    local: name
  } : name;
}

// node_modules/d3-selection/src/creator.js
function creatorInherit(name) {
  return function() {
    var document2 = this.ownerDocument, uri = this.namespaceURI;
    return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name) : document2.createElementNS(uri, name);
  };
}
function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
function creator_default(name) {
  var fullname = namespace_default(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}

// node_modules/d3-selection/src/selector.js
function none() {
}
function selector_default(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}

// node_modules/d3-selection/src/selection/select.js
function select_default(select) {
  if (typeof select !== "function") select = selector_default(select);
  for (var groups2 = this._groups, m2 = groups2.length, subgroups = new Array(m2), j = 0; j < m2; ++j) {
    for (var group3 = groups2[j], n = group3.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group3[i]) && (subnode = select.call(node, node.__data__, i, group3))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }
  return new Selection(subgroups, this._parents);
}

// node_modules/d3-selection/src/array.js
function array(x3) {
  return x3 == null ? [] : Array.isArray(x3) ? x3 : Array.from(x3);
}

// node_modules/d3-selection/src/selectorAll.js
function empty() {
  return [];
}
function selectorAll_default(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}

// node_modules/d3-selection/src/selection/selectAll.js
function arrayAll(select) {
  return function() {
    return array(select.apply(this, arguments));
  };
}
function selectAll_default(select) {
  if (typeof select === "function") select = arrayAll(select);
  else select = selectorAll_default(select);
  for (var groups2 = this._groups, m2 = groups2.length, subgroups = [], parents = [], j = 0; j < m2; ++j) {
    for (var group3 = groups2[j], n = group3.length, node, i = 0; i < n; ++i) {
      if (node = group3[i]) {
        subgroups.push(select.call(node, node.__data__, i, group3));
        parents.push(node);
      }
    }
  }
  return new Selection(subgroups, parents);
}

// node_modules/d3-selection/src/matcher.js
function matcher_default(selector) {
  return function() {
    return this.matches(selector);
  };
}
function childMatcher(selector) {
  return function(node) {
    return node.matches(selector);
  };
}

// node_modules/d3-selection/src/selection/selectChild.js
var find = Array.prototype.find;
function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}
function childFirst() {
  return this.firstElementChild;
}
function selectChild_default(match) {
  return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
}

// node_modules/d3-selection/src/selection/selectChildren.js
var filter = Array.prototype.filter;
function children() {
  return Array.from(this.children);
}
function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}
function selectChildren_default(match) {
  return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}

// node_modules/d3-selection/src/selection/filter.js
function filter_default(match) {
  if (typeof match !== "function") match = matcher_default(match);
  for (var groups2 = this._groups, m2 = groups2.length, subgroups = new Array(m2), j = 0; j < m2; ++j) {
    for (var group3 = groups2[j], n = group3.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group3[i]) && match.call(node, node.__data__, i, group3)) {
        subgroup.push(node);
      }
    }
  }
  return new Selection(subgroups, this._parents);
}

// node_modules/d3-selection/src/selection/sparse.js
function sparse_default(update) {
  return new Array(update.length);
}

// node_modules/d3-selection/src/selection/enter.js
function enter_default() {
  return new Selection(this._enter || this._groups.map(sparse_default), this._parents);
}
function EnterNode(parent, datum2) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum2;
}
EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function(child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function(selector) {
    return this._parent.querySelector(selector);
  },
  querySelectorAll: function(selector) {
    return this._parent.querySelectorAll(selector);
  }
};

// node_modules/d3-selection/src/constant.js
function constant_default(x3) {
  return function() {
    return x3;
  };
}

// node_modules/d3-selection/src/selection/data.js
function bindIndex(parent, group3, enter, update, exit, data) {
  var i = 0, node, groupLength = group3.length, dataLength = data.length;
  for (; i < dataLength; ++i) {
    if (node = group3[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (; i < groupLength; ++i) {
    if (node = group3[i]) {
      exit[i] = node;
    }
  }
}
function bindKey(parent, group3, enter, update, exit, data, key) {
  var i, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group3.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
  for (i = 0; i < groupLength; ++i) {
    if (node = group3[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group3) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (i = 0; i < groupLength; ++i) {
    if ((node = group3[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
      exit[i] = node;
    }
  }
}
function datum(node) {
  return node.__data__;
}
function data_default(value, key) {
  if (!arguments.length) return Array.from(this, datum);
  var bind = key ? bindKey : bindIndex, parents = this._parents, groups2 = this._groups;
  if (typeof value !== "function") value = constant_default(value);
  for (var m2 = groups2.length, update = new Array(m2), enter = new Array(m2), exit = new Array(m2), j = 0; j < m2; ++j) {
    var parent = parents[j], group3 = groups2[j], groupLength = group3.length, data = arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
    bind(parent, group3, enterGroup, updateGroup, exitGroup, data, key);
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength) ;
        previous._next = next || null;
      }
    }
  }
  update = new Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}
function arraylike(data) {
  return typeof data === "object" && "length" in data ? data : Array.from(data);
}

// node_modules/d3-selection/src/selection/exit.js
function exit_default() {
  return new Selection(this._exit || this._groups.map(sparse_default), this._parents);
}

// node_modules/d3-selection/src/selection/join.js
function join_default(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter) enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update) update = update.selection();
  }
  if (onexit == null) exit.remove();
  else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

// node_modules/d3-selection/src/selection/merge.js
function merge_default(context) {
  var selection2 = context.selection ? context.selection() : context;
  for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m2 = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m2; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge2 = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge2[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Selection(merges, this._parents);
}

// node_modules/d3-selection/src/selection/order.js
function order_default() {
  for (var groups2 = this._groups, j = -1, m2 = groups2.length; ++j < m2; ) {
    for (var group3 = groups2[j], i = group3.length - 1, next = group3[i], node; --i >= 0; ) {
      if (node = group3[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
}

// node_modules/d3-selection/src/selection/sort.js
function sort_default(compare) {
  if (!compare) compare = ascending;
  function compareNode(a2, b) {
    return a2 && b ? compare(a2.__data__, b.__data__) : !a2 - !b;
  }
  for (var groups2 = this._groups, m2 = groups2.length, sortgroups = new Array(m2), j = 0; j < m2; ++j) {
    for (var group3 = groups2[j], n = group3.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group3[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }
  return new Selection(sortgroups, this._parents).order();
}
function ascending(a2, b) {
  return a2 < b ? -1 : a2 > b ? 1 : a2 >= b ? 0 : NaN;
}

// node_modules/d3-selection/src/selection/call.js
function call_default() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

// node_modules/d3-selection/src/selection/nodes.js
function nodes_default() {
  return Array.from(this);
}

// node_modules/d3-selection/src/selection/node.js
function node_default() {
  for (var groups2 = this._groups, j = 0, m2 = groups2.length; j < m2; ++j) {
    for (var group3 = groups2[j], i = 0, n = group3.length; i < n; ++i) {
      var node = group3[i];
      if (node) return node;
    }
  }
  return null;
}

// node_modules/d3-selection/src/selection/size.js
function size_default() {
  let size = 0;
  for (const node of this) ++size;
  return size;
}

// node_modules/d3-selection/src/selection/empty.js
function empty_default() {
  return !this.node();
}

// node_modules/d3-selection/src/selection/each.js
function each_default(callback) {
  for (var groups2 = this._groups, j = 0, m2 = groups2.length; j < m2; ++j) {
    for (var group3 = groups2[j], i = 0, n = group3.length, node; i < n; ++i) {
      if (node = group3[i]) callback.call(node, node.__data__, i, group3);
    }
  }
  return this;
}

// node_modules/d3-selection/src/selection/attr.js
function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}
function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}
function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}
function attr_default(name, value) {
  var fullname = namespace_default(name);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
}

// node_modules/d3-selection/src/window.js
function window_default(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}

// node_modules/d3-selection/src/selection/style.js
function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}
function styleFunction(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}
function style_default(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
  return node.style.getPropertyValue(name) || window_default(node).getComputedStyle(node, null).getPropertyValue(name);
}

// node_modules/d3-selection/src/selection/property.js
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}
function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}
function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}
function property_default(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}

// node_modules/d3-selection/src/selection/classed.js
function classArray(string) {
  return string.trim().split(/^|\s+/);
}
function classList(node) {
  return node.classList || new ClassList(node);
}
function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};
function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}
function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}
function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}
function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}
function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}
function classed_default(name, value) {
  var names = classArray(name + "");
  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}

// node_modules/d3-selection/src/selection/text.js
function textRemove() {
  this.textContent = "";
}
function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}
function text_default(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
}

// node_modules/d3-selection/src/selection/html.js
function htmlRemove() {
  this.innerHTML = "";
}
function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}
function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}
function html_default(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}

// node_modules/d3-selection/src/selection/raise.js
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}
function raise_default() {
  return this.each(raise);
}

// node_modules/d3-selection/src/selection/lower.js
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function lower_default() {
  return this.each(lower);
}

// node_modules/d3-selection/src/selection/append.js
function append_default(name) {
  var create2 = typeof name === "function" ? name : creator_default(name);
  return this.select(function() {
    return this.appendChild(create2.apply(this, arguments));
  });
}

// node_modules/d3-selection/src/selection/insert.js
function constantNull() {
  return null;
}
function insert_default(name, before) {
  var create2 = typeof name === "function" ? name : creator_default(name), select = before == null ? constantNull : typeof before === "function" ? before : selector_default(before);
  return this.select(function() {
    return this.insertBefore(create2.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

// node_modules/d3-selection/src/selection/remove.js
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}
function remove_default() {
  return this.each(remove);
}

// node_modules/d3-selection/src/selection/clone.js
function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function clone_default(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}

// node_modules/d3-selection/src/selection/datum.js
function datum_default(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}

// node_modules/d3-selection/src/selection/on.js
function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}
function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {
      type: t,
      name
    };
  });
}
function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m2 = on.length, o; j < m2; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}
function onAdd(typename, value, options) {
  return function() {
    var on = this.__on, o, listener = contextListener(value);
    if (on) for (var j = 0, m2 = on.length; j < m2; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o = {
      type: typename.type,
      name: typename.name,
      value,
      listener,
      options
    };
    if (!on) this.__on = [o];
    else on.push(o);
  };
}
function on_default(typename, value, options) {
  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;
  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m2 = on.length, o; j < m2; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }
  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
  return this;
}

// node_modules/d3-selection/src/selection/dispatch.js
function dispatchEvent(node, type, params) {
  var window2 = window_default(node), event = window2.CustomEvent;
  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window2.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type, false, false);
  }
  node.dispatchEvent(event);
}
function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}
function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}
function dispatch_default(type, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
}

// node_modules/d3-selection/src/selection/iterator.js
function* iterator_default() {
  for (var groups2 = this._groups, j = 0, m2 = groups2.length; j < m2; ++j) {
    for (var group3 = groups2[j], i = 0, n = group3.length, node; i < n; ++i) {
      if (node = group3[i]) yield node;
    }
  }
}

// node_modules/d3-selection/src/selection/index.js
var root = [null];
function Selection(groups2, parents) {
  this._groups = groups2;
  this._parents = parents;
}
function selection() {
  return new Selection([[document.documentElement]], root);
}
function selection_selection() {
  return this;
}
Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: select_default,
  selectAll: selectAll_default,
  selectChild: selectChild_default,
  selectChildren: selectChildren_default,
  filter: filter_default,
  data: data_default,
  enter: enter_default,
  exit: exit_default,
  join: join_default,
  merge: merge_default,
  selection: selection_selection,
  order: order_default,
  sort: sort_default,
  call: call_default,
  nodes: nodes_default,
  node: node_default,
  size: size_default,
  empty: empty_default,
  each: each_default,
  attr: attr_default,
  style: style_default,
  property: property_default,
  classed: classed_default,
  text: text_default,
  html: html_default,
  raise: raise_default,
  lower: lower_default,
  append: append_default,
  insert: insert_default,
  remove: remove_default,
  clone: clone_default,
  datum: datum_default,
  on: on_default,
  dispatch: dispatch_default,
  [Symbol.iterator]: iterator_default
};
var selection_default = selection;

// node_modules/d3-selection/src/select.js
function select_default2(selector) {
  return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root);
}

// node_modules/d3-selection/src/local.js
var nextId = 0;
function local() {
  return new Local();
}
function Local() {
  this._ = "@" + (++nextId).toString(36);
}
Local.prototype = local.prototype = {
  constructor: Local,
  get: function(node) {
    var id3 = this._;
    while (!(id3 in node)) if (!(node = node.parentNode)) return;
    return node[id3];
  },
  set: function(node, value) {
    return node[this._] = value;
  },
  remove: function(node) {
    return this._ in node && delete node[this._];
  },
  toString: function() {
    return this._;
  }
};

// node_modules/d3-ease/src/cubic.js
function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

// node_modules/d3-ease/src/poly.js
var exponent = 3;
var polyIn = function custom(e) {
  e = +e;
  function polyIn2(t) {
    return Math.pow(t, e);
  }
  polyIn2.exponent = custom;
  return polyIn2;
}(exponent);
var polyOut = function custom2(e) {
  e = +e;
  function polyOut2(t) {
    return 1 - Math.pow(1 - t, e);
  }
  polyOut2.exponent = custom2;
  return polyOut2;
}(exponent);
var polyInOut = function custom3(e) {
  e = +e;
  function polyInOut2(t) {
    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
  }
  polyInOut2.exponent = custom3;
  return polyInOut2;
}(exponent);

// node_modules/d3-ease/src/sin.js
var pi = Math.PI;
var halfPi = pi / 2;
function sinInOut(t) {
  return (1 - Math.cos(pi * t)) / 2;
}

// node_modules/d3-ease/src/math.js
function tpmt(x3) {
  return (Math.pow(2, -10 * x3) - 9765625e-10) * 1.0009775171065494;
}

// node_modules/d3-ease/src/bounce.js
var b1 = 4 / 11;
var b2 = 6 / 11;
var b3 = 8 / 11;
var b4 = 3 / 4;
var b5 = 9 / 11;
var b6 = 10 / 11;
var b7 = 15 / 16;
var b8 = 21 / 22;
var b9 = 63 / 64;
var b0 = 1 / b1 / b1;

// node_modules/d3-ease/src/back.js
var overshoot = 1.70158;
var backIn = function custom4(s) {
  s = +s;
  function backIn2(t) {
    return (t = +t) * t * (s * (t - 1) + t);
  }
  backIn2.overshoot = custom4;
  return backIn2;
}(overshoot);
var backOut = function custom5(s) {
  s = +s;
  function backOut2(t) {
    return --t * t * ((t + 1) * s + t) + 1;
  }
  backOut2.overshoot = custom5;
  return backOut2;
}(overshoot);
var backInOut = function custom6(s) {
  s = +s;
  function backInOut2(t) {
    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
  }
  backInOut2.overshoot = custom6;
  return backInOut2;
}(overshoot);

// node_modules/d3-ease/src/elastic.js
var tau = 2 * Math.PI;
var amplitude = 1;
var period = 0.3;
var elasticIn = function custom7(a2, p) {
  var s = Math.asin(1 / (a2 = Math.max(1, a2))) * (p /= tau);
  function elasticIn2(t) {
    return a2 * tpmt(- --t) * Math.sin((s - t) / p);
  }
  elasticIn2.amplitude = function(a3) {
    return custom7(a3, p * tau);
  };
  elasticIn2.period = function(p2) {
    return custom7(a2, p2);
  };
  return elasticIn2;
}(amplitude, period);
var elasticOut = function custom8(a2, p) {
  var s = Math.asin(1 / (a2 = Math.max(1, a2))) * (p /= tau);
  function elasticOut2(t) {
    return 1 - a2 * tpmt(t = +t) * Math.sin((t + s) / p);
  }
  elasticOut2.amplitude = function(a3) {
    return custom8(a3, p * tau);
  };
  elasticOut2.period = function(p2) {
    return custom8(a2, p2);
  };
  return elasticOut2;
}(amplitude, period);
var elasticInOut = function custom9(a2, p) {
  var s = Math.asin(1 / (a2 = Math.max(1, a2))) * (p /= tau);
  function elasticInOut2(t) {
    return ((t = t * 2 - 1) < 0 ? a2 * tpmt(-t) * Math.sin((s - t) / p) : 2 - a2 * tpmt(t) * Math.sin((s + t) / p)) / 2;
  }
  elasticInOut2.amplitude = function(a3) {
    return custom9(a3, p * tau);
  };
  elasticInOut2.period = function(p2) {
    return custom9(a2, p2);
  };
  return elasticInOut2;
}(amplitude, period);

// node_modules/d3-dispatch/src/index.js
var src_exports = {};
__export(src_exports, {
  dispatch: () => dispatch_default2
});

// node_modules/d3-dispatch/src/dispatch.js
var noop = {
  value: () => {
  }
};
function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}
function Dispatch(_) {
  this._ = _;
}
function parseTypenames2(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {
      type: t,
      name
    };
  });
}
Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._, T = parseTypenames2(typename + "", _), t, i = -1, n = T.length;
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
      return;
    }
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
    }
    return this;
  },
  copy: function() {
    var copy3 = {}, _ = this._;
    for (var t in _) copy3[t] = _[t].slice();
    return new Dispatch(copy3);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};
function get(type, name) {
  for (var i = 0, n = type.length, c2; i < n; ++i) {
    if ((c2 = type[i]).name === name) {
      return c2.value;
    }
  }
}
function set(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({
    name,
    value: callback
  });
  return type;
}
var dispatch_default2 = dispatch;

// node_modules/d3-timer/src/index.js
var src_exports2 = {};
__export(src_exports2, {
  interval: () => interval_default,
  now: () => now,
  timeout: () => timeout_default,
  timer: () => timer,
  timerFlush: () => timerFlush
});

// node_modules/d3-timer/src/timer.js
var frame = 0;
var timeout = 0;
var interval = 0;
var pokeDelay = 1e3;
var taskHead;
var taskTail;
var clockLast = 0;
var clockNow = 0;
var clockSkew = 0;
var clock = typeof performance === "object" && performance.now ? performance : Date;
var setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
  setTimeout(f, 17);
};
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time2) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time2 = (time2 == null ? now() : +time2) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time2;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};
function timer(callback, delay, time2) {
  var t = new Timer();
  t.restart(callback, delay, time2);
  return t;
}
function timerFlush() {
  now();
  ++frame;
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(void 0, e);
    t = t._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now2 = clock.now(), delay = now2 - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now2;
}
function nap() {
  var t03, t13 = taskHead, t22, time2 = Infinity;
  while (t13) {
    if (t13._call) {
      if (time2 > t13._time) time2 = t13._time;
      t03 = t13, t13 = t13._next;
    } else {
      t22 = t13._next, t13._next = null;
      t13 = t03 ? t03._next = t22 : taskHead = t22;
    }
  }
  taskTail = t03;
  sleep(time2);
}
function sleep(time2) {
  if (frame) return;
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time2 - clockNow;
  if (delay > 24) {
    if (time2 < Infinity) timeout = setTimeout(wake, time2 - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}

// node_modules/d3-timer/src/timeout.js
function timeout_default(callback, delay, time2) {
  var t = new Timer();
  delay = delay == null ? 0 : +delay;
  t.restart((elapsed) => {
    t.stop();
    callback(elapsed + delay);
  }, delay, time2);
  return t;
}

// node_modules/d3-timer/src/interval.js
function interval_default(callback, delay, time2) {
  var t = new Timer(), total = delay;
  if (delay == null) return t.restart(callback, delay, time2), t;
  t._restart = t.restart;
  t.restart = function(callback2, delay2, time3) {
    delay2 = +delay2, time3 = time3 == null ? now() : +time3;
    t._restart(function tick(elapsed) {
      elapsed += total;
      t._restart(tick, total += delay2, time3);
      callback2(elapsed);
    }, delay2, time3);
  };
  t.restart(callback, delay, time2);
  return t;
}

// node_modules/d3-transition/src/transition/schedule.js
var emptyOn = dispatch_default2("start", "end", "cancel", "interrupt");
var emptyTween = [];
var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;
function schedule_default(node, name, id3, index3, group3, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id3 in schedules) return;
  create(node, id3, {
    name,
    index: index3,
    // For context during callback.
    group: group3,
    // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}
function init(node, id3) {
  var schedule = get2(node, id3);
  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
  return schedule;
}
function set2(node, id3) {
  var schedule = get2(node, id3);
  if (schedule.state > STARTED) throw new Error("too late; already running");
  return schedule;
}
function get2(node, id3) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id3])) throw new Error("transition not found");
  return schedule;
}
function create(node, id3, self2) {
  var schedules = node.__transition, tween;
  schedules[id3] = self2;
  self2.timer = timer(schedule, 0, self2.time);
  function schedule(elapsed) {
    self2.state = SCHEDULED;
    self2.timer.restart(start2, self2.delay, self2.time);
    if (self2.delay <= elapsed) start2(elapsed - self2.delay);
  }
  function start2(elapsed) {
    var i, j, n, o;
    if (self2.state !== SCHEDULED) return stop();
    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self2.name) continue;
      if (o.state === STARTED) return timeout_default(start2);
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      } else if (+i < id3) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }
    timeout_default(function() {
      if (self2.state === STARTED) {
        self2.state = RUNNING;
        self2.timer.restart(tick, self2.delay, self2.time);
        tick(elapsed);
      }
    });
    self2.state = STARTING;
    self2.on.call("start", node, node.__data__, self2.index, self2.group);
    if (self2.state !== STARTING) return;
    self2.state = STARTED;
    tween = new Array(n = self2.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self2.tween[i].value.call(node, node.__data__, self2.index, self2.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }
  function tick(elapsed) {
    var t = elapsed < self2.duration ? self2.ease.call(null, elapsed / self2.duration) : (self2.timer.restart(stop), self2.state = ENDING, 1), i = -1, n = tween.length;
    while (++i < n) {
      tween[i].call(node, t);
    }
    if (self2.state === ENDING) {
      self2.on.call("end", node, node.__data__, self2.index, self2.group);
      stop();
    }
  }
  function stop() {
    self2.state = ENDED;
    self2.timer.stop();
    delete schedules[id3];
    for (var i in schedules) return;
    delete node.__transition;
  }
}

// node_modules/d3-transition/src/interrupt.js
function interrupt_default(node, name) {
  var schedules = node.__transition, schedule, active, empty2 = true, i;
  if (!schedules) return;
  name = name == null ? null : name + "";
  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) {
      empty2 = false;
      continue;
    }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }
  if (empty2) delete node.__transition;
}

// node_modules/d3-transition/src/selection/interrupt.js
function interrupt_default2(name) {
  return this.each(function() {
    interrupt_default(this, name);
  });
}

// node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

// node_modules/d3-color/src/color.js
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex = /^#([0-9a-f]{3,8})$/;
var reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
var reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
var reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
var reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
var reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
var reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define_default(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format2) {
  var m2, l;
  format2 = (format2 + "").trim().toLowerCase();
  return (m2 = reHex.exec(format2)) ? (l = m2[1].length, m2 = parseInt(m2[1], 16), l === 6 ? rgbn(m2) : l === 3 ? new Rgb(m2 >> 8 & 15 | m2 >> 4 & 240, m2 >> 4 & 15 | m2 & 240, (m2 & 15) << 4 | m2 & 15, 1) : l === 8 ? rgba(m2 >> 24 & 255, m2 >> 16 & 255, m2 >> 8 & 255, (m2 & 255) / 255) : l === 4 ? rgba(m2 >> 12 & 15 | m2 >> 8 & 240, m2 >> 8 & 15 | m2 >> 4 & 240, m2 >> 4 & 15 | m2 & 240, ((m2 & 15) << 4 | m2 & 15) / 255) : null) : (m2 = reRgbInteger.exec(format2)) ? new Rgb(m2[1], m2[2], m2[3], 1) : (m2 = reRgbPercent.exec(format2)) ? new Rgb(m2[1] * 255 / 100, m2[2] * 255 / 100, m2[3] * 255 / 100, 1) : (m2 = reRgbaInteger.exec(format2)) ? rgba(m2[1], m2[2], m2[3], m2[4]) : (m2 = reRgbaPercent.exec(format2)) ? rgba(m2[1] * 255 / 100, m2[2] * 255 / 100, m2[3] * 255 / 100, m2[4]) : (m2 = reHslPercent.exec(format2)) ? hsla(m2[1], m2[2] / 100, m2[3] / 100, 1) : (m2 = reHslaPercent.exec(format2)) ? hsla(m2[1], m2[2] / 100, m2[3] / 100, m2[4]) : named.hasOwnProperty(format2) ? rgbn(named[format2]) : format2 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a2) {
  if (a2 <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a2);
}
function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define_default(Rgb, rgb, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a2 = clampa(this.opacity);
  return `${a2 === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a2 === 1 ? ")" : `, ${a2})`}`;
}
function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a2) {
  if (a2 <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a2);
}
function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min2 = Math.min(r, g, b), max2 = Math.max(r, g, b), h = NaN, s = max2 - min2, l = (max2 + min2) / 2;
  if (s) {
    if (r === max2) h = (g - b) / s + (g < b) * 6;
    else if (g === max2) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max2 + min2 : 2 - max2 - min2;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default(Hsl, hsl, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const a2 = clampa(this.opacity);
    return `${a2 === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a2 === 1 ? ")" : `, ${a2})`}`;
  }
}));
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

// node_modules/d3-color/src/math.js
var radians = Math.PI / 180;
var degrees = 180 / Math.PI;

// node_modules/d3-color/src/lab.js
var K = 18;
var Xn = 0.96422;
var Yn = 1;
var Zn = 0.82521;
var t0 = 4 / 29;
var t1 = 6 / 29;
var t2 = 3 * t1 * t1;
var t3 = t1 * t1 * t1;
function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) return hcl2lab(o);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r = rgb2lrgb(o.r), g = rgb2lrgb(o.g), b = rgb2lrgb(o.b), y3 = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x3, z;
  if (r === g && g === b) x3 = z = y3;
  else {
    x3 = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y3 - 16, 500 * (x3 - y3), 200 * (y3 - z), o.opacity);
}
function lab(l, a2, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a2, b, opacity == null ? 1 : opacity);
}
function Lab(l, a2, b, opacity) {
  this.l = +l;
  this.a = +a2;
  this.b = +b;
  this.opacity = +opacity;
}
define_default(Lab, lab, extend(Color, {
  brighter(k) {
    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker(k) {
    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb() {
    var y3 = (this.l + 16) / 116, x3 = isNaN(this.a) ? y3 : y3 + this.a / 500, z = isNaN(this.b) ? y3 : y3 - this.b / 200;
    x3 = Xn * lab2xyz(x3);
    y3 = Yn * lab2xyz(y3);
    z = Zn * lab2xyz(z);
    return new Rgb(lrgb2rgb(3.1338561 * x3 - 1.6168667 * y3 - 0.4906146 * z), lrgb2rgb(-0.9787684 * x3 + 1.9161415 * y3 + 0.033454 * z), lrgb2rgb(0.0719453 * x3 - 0.2289914 * y3 + 1.4052427 * z), this.opacity);
  }
}));
function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}
function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}
function lrgb2rgb(x3) {
  return 255 * (x3 <= 31308e-7 ? 12.92 * x3 : 1.055 * Math.pow(x3, 1 / 2.4) - 0.055);
}
function rgb2lrgb(x3) {
  return (x3 /= 255) <= 0.04045 ? x3 / 12.92 : Math.pow((x3 + 0.055) / 1.055, 2.4);
}
function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
  var h = Math.atan2(o.b, o.a) * degrees;
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}
function hcl(h, c2, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c2, l, opacity == null ? 1 : opacity);
}
function Hcl(h, c2, l, opacity) {
  this.h = +h;
  this.c = +c2;
  this.l = +l;
  this.opacity = +opacity;
}
function hcl2lab(o) {
  if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
  var h = o.h * radians;
  return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}
define_default(Hcl, hcl, extend(Color, {
  brighter(k) {
    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
  },
  darker(k) {
    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
  },
  rgb() {
    return hcl2lab(this).rgb();
  }
}));

// node_modules/d3-color/src/cubehelix.js
var A = -0.14861;
var B = 1.78277;
var C = -0.29227;
var D = -0.90649;
var E = 1.97294;
var ED = E * D;
var EB = E * B;
var BC_DA = B * C - D * A;
function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB), bl = b - l, k = (E * (g - l) - C * bl) / D, s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), h = s ? Math.atan2(k, bl) * degrees - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}
function cubehelix(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}
function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default(Cubehelix, cubehelix, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * radians, l = +this.l, a2 = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh2 = Math.cos(h), sinh2 = Math.sin(h);
    return new Rgb(255 * (l + a2 * (A * cosh2 + B * sinh2)), 255 * (l + a2 * (C * cosh2 + D * sinh2)), 255 * (l + a2 * (E * cosh2)), this.opacity);
  }
}));

// node_modules/d3-interpolate/src/basis.js
function basis(t13, v0, v1, v2, v3) {
  var t22 = t13 * t13, t32 = t22 * t13;
  return ((1 - 3 * t13 + 3 * t22 - t32) * v0 + (4 - 6 * t22 + 3 * t32) * v1 + (1 + 3 * t13 + 3 * t22 - 3 * t32) * v2 + t32 * v3) / 6;
}
function basis_default(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/constant.js
var constant_default2 = (x3) => () => x3;

// node_modules/d3-interpolate/src/color.js
function linear2(a2, d) {
  return function(t) {
    return a2 + t * d;
  };
}
function exponential(a2, b, y3) {
  return a2 = Math.pow(a2, y3), b = Math.pow(b, y3) - a2, y3 = 1 / y3, function(t) {
    return Math.pow(a2 + t * b, y3);
  };
}
function hue(a2, b) {
  var d = b - a2;
  return d ? linear2(a2, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant_default2(isNaN(a2) ? b : a2);
}
function gamma(y3) {
  return (y3 = +y3) === 1 ? nogamma : function(a2, b) {
    return b - a2 ? exponential(a2, b, y3) : constant_default2(isNaN(a2) ? b : a2);
  };
}
function nogamma(a2, b) {
  var d = b - a2;
  return d ? linear2(a2, d) : constant_default2(isNaN(a2) ? b : a2);
}

// node_modules/d3-interpolate/src/rgb.js
var rgb_default = function rgbGamma(y3) {
  var color2 = gamma(y3);
  function rgb2(start2, end) {
    var r = color2((start2 = rgb(start2)).r, (end = rgb(end)).r), g = color2(start2.g, end.g), b = color2(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
    return function(t) {
      start2.r = r(t);
      start2.g = g(t);
      start2.b = b(t);
      start2.opacity = opacity(t);
      return start2 + "";
    };
  }
  rgb2.gamma = rgbGamma;
  return rgb2;
}(1);
function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color2;
    for (i = 0; i < n; ++i) {
      color2 = rgb(colors[i]);
      r[i] = color2.r || 0;
      g[i] = color2.g || 0;
      b[i] = color2.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color2.opacity = 1;
    return function(t) {
      color2.r = r(t);
      color2.g = g(t);
      color2.b = b(t);
      return color2 + "";
    };
  };
}
var rgbBasis = rgbSpline(basis_default);
var rgbBasisClosed = rgbSpline(basisClosed_default);

// node_modules/d3-interpolate/src/number.js
function number_default(a2, b) {
  return a2 = +a2, b = +b, function(t) {
    return a2 * (1 - t) + b * t;
  };
}

// node_modules/d3-interpolate/src/string.js
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB = new RegExp(reA.source, "g");
function zero(b) {
  return function() {
    return b;
  };
}
function one(b) {
  return function(t) {
    return b(t) + "";
  };
}
function string_default(a2, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
  a2 = a2 + "", b = b + "";
  while ((am = reA.exec(a2)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs;
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s[i]) s[i] += bm;
      else s[++i] = bm;
    } else {
      s[++i] = null;
      q.push({
        i,
        x: number_default(am, bm)
      });
    }
    bi = reB.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs;
    else s[++i] = bs;
  }
  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
    for (var i2 = 0, o; i2 < b; ++i2) s[(o = q[i2]).i] = o.x(t);
    return s.join("");
  });
}

// node_modules/d3-interpolate/src/transform/decompose.js
var degrees2 = 180 / Math.PI;
var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose_default(a2, b, c2, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a2 * a2 + b * b)) a2 /= scaleX, b /= scaleX;
  if (skewX = a2 * c2 + b * d) c2 -= a2 * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c2 * c2 + d * d)) c2 /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a2 * d < b * c2) a2 = -a2, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a2) * degrees2,
    skewX: Math.atan(skewX) * degrees2,
    scaleX,
    scaleY
  };
}

// node_modules/d3-interpolate/src/transform/parse.js
var svgNode;
function parseCss(value) {
  const m2 = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m2.isIdentity ? identity : decompose_default(m2.a, m2.b, m2.c, m2.d, m2.e, m2.f);
}
function parseSvg(value) {
  if (value == null) return identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
  value = value.matrix;
  return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
}

// node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }
  function translate2(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({
        i: i - 4,
        x: number_default(xa, xb)
      }, {
        i: i - 2,
        x: number_default(ya, yb)
      });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate2(a2, b, s, q) {
    if (a2 !== b) {
      if (a2 - b > 180) b += 360;
      else if (b - a2 > 180) a2 += 360;
      q.push({
        i: s.push(pop(s) + "rotate(", null, degParen) - 2,
        x: number_default(a2, b)
      });
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }
  function skewX(a2, b, s, q) {
    if (a2 !== b) {
      q.push({
        i: s.push(pop(s) + "skewX(", null, degParen) - 2,
        x: number_default(a2, b)
      });
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }
  function scale2(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({
        i: i - 4,
        x: number_default(xa, xb)
      }, {
        i: i - 2,
        x: number_default(ya, yb)
      });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a2, b) {
    var s = [], q = [];
    a2 = parse(a2), b = parse(b);
    translate2(a2.translateX, a2.translateY, b.translateX, b.translateY, s, q);
    rotate2(a2.rotate, b.rotate, s, q);
    skewX(a2.skewX, b.skewX, s, q);
    scale2(a2.scaleX, a2.scaleY, b.scaleX, b.scaleY, s, q);
    a2 = b = null;
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

// node_modules/d3-interpolate/src/zoom.js
var epsilon2 = 1e-12;
function cosh(x3) {
  return ((x3 = Math.exp(x3)) + 1 / x3) / 2;
}
function sinh(x3) {
  return ((x3 = Math.exp(x3)) - 1 / x3) / 2;
}
function tanh(x3) {
  return ((x3 = Math.exp(2 * x3)) - 1) / (x3 + 1);
}
var zoom_default = function zoomRho(rho, rho2, rho4) {
  function zoom(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
    if (d2 < epsilon2) {
      S = Math.log(w1 / w0) / rho;
      i = function(t) {
        return [ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(rho * t * S)];
      };
    } else {
      var d1 = Math.sqrt(d2), b02 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b12 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b02 * b02 + 1) - b02), r1 = Math.log(Math.sqrt(b12 * b12 + 1) - b12);
      S = (r1 - r0) / rho;
      i = function(t) {
        var s = t * S, coshr0 = cosh(r0), u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
        return [ux0 + u * dx, uy0 + u * dy, w0 * coshr0 / cosh(rho * s + r0)];
      };
    }
    i.duration = S * 1e3 * rho / Math.SQRT2;
    return i;
  }
  zoom.rho = function(_) {
    var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
    return zoomRho(_1, _2, _4);
  };
  return zoom;
}(Math.SQRT2, 2, 4);

// node_modules/d3-interpolate/src/hsl.js
function hsl2(hue2) {
  return function(start2, end) {
    var h = hue2((start2 = hsl(start2)).h, (end = hsl(end)).h), s = nogamma(start2.s, end.s), l = nogamma(start2.l, end.l), opacity = nogamma(start2.opacity, end.opacity);
    return function(t) {
      start2.h = h(t);
      start2.s = s(t);
      start2.l = l(t);
      start2.opacity = opacity(t);
      return start2 + "";
    };
  };
}
var hsl_default = hsl2(hue);
var hslLong = hsl2(nogamma);

// node_modules/d3-interpolate/src/hcl.js
function hcl2(hue2) {
  return function(start2, end) {
    var h = hue2((start2 = hcl(start2)).h, (end = hcl(end)).h), c2 = nogamma(start2.c, end.c), l = nogamma(start2.l, end.l), opacity = nogamma(start2.opacity, end.opacity);
    return function(t) {
      start2.h = h(t);
      start2.c = c2(t);
      start2.l = l(t);
      start2.opacity = opacity(t);
      return start2 + "";
    };
  };
}
var hcl_default = hcl2(hue);
var hclLong = hcl2(nogamma);

// node_modules/d3-interpolate/src/cubehelix.js
function cubehelix2(hue2) {
  return function cubehelixGamma(y3) {
    y3 = +y3;
    function cubehelix3(start2, end) {
      var h = hue2((start2 = cubehelix(start2)).h, (end = cubehelix(end)).h), s = nogamma(start2.s, end.s), l = nogamma(start2.l, end.l), opacity = nogamma(start2.opacity, end.opacity);
      return function(t) {
        start2.h = h(t);
        start2.s = s(t);
        start2.l = l(Math.pow(t, y3));
        start2.opacity = opacity(t);
        return start2 + "";
      };
    }
    cubehelix3.gamma = cubehelixGamma;
    return cubehelix3;
  }(1);
}
var cubehelix_default = cubehelix2(hue);
var cubehelixLong = cubehelix2(nogamma);

// node_modules/d3-transition/src/transition/tween.js
function tweenRemove(id3, name) {
  var tween0, tween1;
  return function() {
    var schedule = set2(this, id3), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }
    schedule.tween = tween1;
  };
}
function tweenFunction(id3, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error();
  return function() {
    var schedule = set2(this, id3), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = {
        name,
        value
      }, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }
    schedule.tween = tween1;
  };
}
function tween_default(name, value) {
  var id3 = this._id;
  name += "";
  if (arguments.length < 2) {
    var tween = get2(this.node(), id3).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }
  return this.each((value == null ? tweenRemove : tweenFunction)(id3, name, value));
}
function tweenValue(transition3, name, value) {
  var id3 = transition3._id;
  transition3.each(function() {
    var schedule = set2(this, id3);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });
  return function(node) {
    return get2(node, id3).value[name];
  };
}

// node_modules/d3-transition/src/transition/interpolate.js
function interpolate_default(a2, b) {
  var c2;
  return (typeof b === "number" ? number_default : b instanceof color ? rgb_default : (c2 = color(b)) ? (b = c2, rgb_default) : string_default)(a2, b);
}

// node_modules/d3-transition/src/transition/attr.js
function attrRemove2(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS2(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant2(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrConstantNS2(fullname, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrFunction2(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attrFunctionNS2(fullname, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attr_default2(name, value) {
  var fullname = namespace_default(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate_default;
  return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS2 : attrFunction2)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS2 : attrRemove2)(fullname) : (fullname.local ? attrConstantNS2 : attrConstant2)(fullname, i, value));
}

// node_modules/d3-transition/src/transition/attrTween.js
function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}
function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}
function attrTweenNS(fullname, value) {
  var t03, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t03 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t03;
  }
  tween._value = value;
  return tween;
}
function attrTween(name, value) {
  var t03, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t03 = (i0 = i) && attrInterpolate(name, i);
    return t03;
  }
  tween._value = value;
  return tween;
}
function attrTween_default(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  var fullname = namespace_default(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}

// node_modules/d3-transition/src/transition/delay.js
function delayFunction(id3, value) {
  return function() {
    init(this, id3).delay = +value.apply(this, arguments);
  };
}
function delayConstant(id3, value) {
  return value = +value, function() {
    init(this, id3).delay = value;
  };
}
function delay_default(value) {
  var id3 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id3, value)) : get2(this.node(), id3).delay;
}

// node_modules/d3-transition/src/transition/duration.js
function durationFunction(id3, value) {
  return function() {
    set2(this, id3).duration = +value.apply(this, arguments);
  };
}
function durationConstant(id3, value) {
  return value = +value, function() {
    set2(this, id3).duration = value;
  };
}
function duration_default(value) {
  var id3 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id3, value)) : get2(this.node(), id3).duration;
}

// node_modules/d3-transition/src/transition/ease.js
function easeConstant(id3, value) {
  if (typeof value !== "function") throw new Error();
  return function() {
    set2(this, id3).ease = value;
  };
}
function ease_default(value) {
  var id3 = this._id;
  return arguments.length ? this.each(easeConstant(id3, value)) : get2(this.node(), id3).ease;
}

// node_modules/d3-transition/src/transition/easeVarying.js
function easeVarying(id3, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (typeof v !== "function") throw new Error();
    set2(this, id3).ease = v;
  };
}
function easeVarying_default(value) {
  if (typeof value !== "function") throw new Error();
  return this.each(easeVarying(this._id, value));
}

// node_modules/d3-transition/src/transition/filter.js
function filter_default2(match) {
  if (typeof match !== "function") match = matcher_default(match);
  for (var groups2 = this._groups, m2 = groups2.length, subgroups = new Array(m2), j = 0; j < m2; ++j) {
    for (var group3 = groups2[j], n = group3.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group3[i]) && match.call(node, node.__data__, i, group3)) {
        subgroup.push(node);
      }
    }
  }
  return new Transition(subgroups, this._parents, this._name, this._id);
}

// node_modules/d3-transition/src/transition/merge.js
function merge_default2(transition3) {
  if (transition3._id !== this._id) throw new Error();
  for (var groups0 = this._groups, groups1 = transition3._groups, m0 = groups0.length, m1 = groups1.length, m2 = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m2; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge2 = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge2[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Transition(merges, this._parents, this._name, this._id);
}

// node_modules/d3-transition/src/transition/on.js
function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}
function onFunction(id3, name, listener) {
  var on0, on1, sit = start(name) ? init : set2;
  return function() {
    var schedule = sit(this, id3), on = schedule.on;
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
    schedule.on = on1;
  };
}
function on_default2(name, listener) {
  var id3 = this._id;
  return arguments.length < 2 ? get2(this.node(), id3).on.on(name) : this.each(onFunction(id3, name, listener));
}

// node_modules/d3-transition/src/transition/remove.js
function removeFunction(id3) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id3) return;
    if (parent) parent.removeChild(this);
  };
}
function remove_default2() {
  return this.on("end.remove", removeFunction(this._id));
}

// node_modules/d3-transition/src/transition/select.js
function select_default3(select) {
  var name = this._name, id3 = this._id;
  if (typeof select !== "function") select = selector_default(select);
  for (var groups2 = this._groups, m2 = groups2.length, subgroups = new Array(m2), j = 0; j < m2; ++j) {
    for (var group3 = groups2[j], n = group3.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group3[i]) && (subnode = select.call(node, node.__data__, i, group3))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule_default(subgroup[i], name, id3, i, subgroup, get2(node, id3));
      }
    }
  }
  return new Transition(subgroups, this._parents, name, id3);
}

// node_modules/d3-transition/src/transition/selectAll.js
function selectAll_default3(select) {
  var name = this._name, id3 = this._id;
  if (typeof select !== "function") select = selectorAll_default(select);
  for (var groups2 = this._groups, m2 = groups2.length, subgroups = [], parents = [], j = 0; j < m2; ++j) {
    for (var group3 = groups2[j], n = group3.length, node, i = 0; i < n; ++i) {
      if (node = group3[i]) {
        for (var children2 = select.call(node, node.__data__, i, group3), child, inherit2 = get2(node, id3), k = 0, l = children2.length; k < l; ++k) {
          if (child = children2[k]) {
            schedule_default(child, name, id3, k, children2, inherit2);
          }
        }
        subgroups.push(children2);
        parents.push(node);
      }
    }
  }
  return new Transition(subgroups, parents, name, id3);
}

// node_modules/d3-transition/src/transition/selection.js
var Selection2 = selection_default.prototype.constructor;
function selection_default2() {
  return new Selection2(this._groups, this._parents);
}

// node_modules/d3-transition/src/transition/style.js
function styleNull(name, interpolate) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}
function styleRemove2(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant2(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = styleValue(this, name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function styleFunction2(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function styleMaybeRemove(id3, name) {
  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove2;
  return function() {
    var schedule = set2(this, id3), on = schedule.on, listener = schedule.value[key] == null ? remove2 || (remove2 = styleRemove2(name)) : void 0;
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);
    schedule.on = on1;
  };
}
function style_default2(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate_default;
  return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove2(name)) : typeof value === "function" ? this.styleTween(name, styleFunction2(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant2(name, i, value), priority).on("end.style." + name, null);
}

// node_modules/d3-transition/src/transition/styleTween.js
function styleInterpolate(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}
function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}
function styleTween_default(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}

// node_modules/d3-transition/src/transition/text.js
function textConstant2(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction2(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}
function text_default2(value) {
  return this.tween("text", typeof value === "function" ? textFunction2(tweenValue(this, "text", value)) : textConstant2(value == null ? "" : value + ""));
}

// node_modules/d3-transition/src/transition/textTween.js
function textInterpolate(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}
function textTween(value) {
  var t03, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t03 = (i0 = i) && textInterpolate(i);
    return t03;
  }
  tween._value = value;
  return tween;
}
function textTween_default(value) {
  var key = "text";
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, textTween(value));
}

// node_modules/d3-transition/src/transition/transition.js
function transition_default() {
  var name = this._name, id0 = this._id, id1 = newId();
  for (var groups2 = this._groups, m2 = groups2.length, j = 0; j < m2; ++j) {
    for (var group3 = groups2[j], n = group3.length, node, i = 0; i < n; ++i) {
      if (node = group3[i]) {
        var inherit2 = get2(node, id0);
        schedule_default(node, name, id1, i, group3, {
          time: inherit2.time + inherit2.delay + inherit2.duration,
          delay: 0,
          duration: inherit2.duration,
          ease: inherit2.ease
        });
      }
    }
  }
  return new Transition(groups2, this._parents, name, id1);
}

// node_modules/d3-transition/src/transition/end.js
function end_default() {
  var on0, on1, that = this, id3 = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = {
      value: reject
    }, end = {
      value: function() {
        if (--size === 0) resolve();
      }
    };
    that.each(function() {
      var schedule = set2(this, id3), on = schedule.on;
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }
      schedule.on = on1;
    });
    if (size === 0) resolve();
  });
}

// node_modules/d3-transition/src/transition/index.js
var id = 0;
function Transition(groups2, parents, name, id3) {
  this._groups = groups2;
  this._parents = parents;
  this._name = name;
  this._id = id3;
}
function transition2(name) {
  return selection_default().transition(name);
}
function newId() {
  return ++id;
}
var selection_prototype = selection_default.prototype;
Transition.prototype = transition2.prototype = {
  constructor: Transition,
  select: select_default3,
  selectAll: selectAll_default3,
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: filter_default2,
  merge: merge_default2,
  selection: selection_default2,
  transition: transition_default,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: on_default2,
  attr: attr_default2,
  attrTween: attrTween_default,
  style: style_default2,
  styleTween: styleTween_default,
  text: text_default2,
  textTween: textTween_default,
  remove: remove_default2,
  tween: tween_default,
  delay: delay_default,
  duration: duration_default,
  ease: ease_default,
  easeVarying: easeVarying_default,
  end: end_default,
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};

// node_modules/d3-transition/src/selection/transition.js
var defaultTiming = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut
};
function inherit(node, id3) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id3])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id3} not found`);
    }
  }
  return timing;
}
function transition_default2(name) {
  var id3, timing;
  if (name instanceof Transition) {
    id3 = name._id, name = name._name;
  } else {
    id3 = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }
  for (var groups2 = this._groups, m2 = groups2.length, j = 0; j < m2; ++j) {
    for (var group3 = groups2[j], n = group3.length, node, i = 0; i < n; ++i) {
      if (node = group3[i]) {
        schedule_default(node, name, id3, i, group3, timing || inherit(node, id3));
      }
    }
  }
  return new Transition(groups2, this._parents, name, id3);
}

// node_modules/d3-transition/src/selection/index.js
selection_default.prototype.interrupt = interrupt_default2;
selection_default.prototype.transition = transition_default2;

// node_modules/transformation-matrix/src/identity.js
function identity2() {
  return {
    a: 1,
    c: 0,
    e: 0,
    b: 0,
    d: 1,
    f: 0
  };
}

// node_modules/transformation-matrix/src/utils.js
function isUndefined(val) {
  return typeof val === "undefined";
}

// node_modules/transformation-matrix/src/translate.js
function translate(tx, ty = 0) {
  return {
    a: 1,
    c: 0,
    e: tx,
    b: 0,
    d: 1,
    f: ty
  };
}

// node_modules/transformation-matrix/src/transform.js
function transform(...matrices) {
  matrices = Array.isArray(matrices[0]) ? matrices[0] : matrices;
  const multiply = (m1, m2) => {
    return {
      a: m1.a * m2.a + m1.c * m2.b,
      c: m1.a * m2.c + m1.c * m2.d,
      e: m1.a * m2.e + m1.c * m2.f + m1.e,
      b: m1.b * m2.a + m1.d * m2.b,
      d: m1.b * m2.c + m1.d * m2.d,
      f: m1.b * m2.e + m1.d * m2.f + m1.f
    };
  };
  switch (matrices.length) {
    case 0:
      throw new Error("no matrices provided");
    case 1:
      return matrices[0];
    case 2:
      return multiply(matrices[0], matrices[1]);
    default: {
      const [m1, m2, ...rest] = matrices;
      const m3 = multiply(m1, m2);
      return transform(m3, ...rest);
    }
  }
}

// node_modules/transformation-matrix/src/rotate.js
var {
  cos,
  sin,
  PI
} = Math;

// node_modules/transformation-matrix/src/scale.js
function scale(sx, sy = void 0, cx = void 0, cy = void 0) {
  if (isUndefined(sy)) sy = sx;
  const scaleMatrix = {
    a: sx,
    c: 0,
    e: 0,
    b: 0,
    d: sy,
    f: 0
  };
  if (isUndefined(cx) || isUndefined(cy)) {
    return scaleMatrix;
  }
  return transform([translate(cx, cy), scaleMatrix, translate(-cx, -cy)]);
}

// node_modules/transformation-matrix/src/skew.js
var {
  tan
} = Math;

// node_modules/transformation-matrix/src/toString.js
function toSVG(matrix) {
  return toString(matrix);
}
function toString(matrix) {
  return `matrix(${matrix.a},${matrix.b},${matrix.c},${matrix.d},${matrix.e},${matrix.f})`;
}

// node_modules/transformation-matrix/src/smoothMatrix.js
function smoothMatrix(matrix, precision = 1e10) {
  return {
    a: Math.round(matrix.a * precision) / precision,
    b: Math.round(matrix.b * precision) / precision,
    c: Math.round(matrix.c * precision) / precision,
    d: Math.round(matrix.d * precision) / precision,
    e: Math.round(matrix.e * precision) / precision,
    f: Math.round(matrix.f * precision) / precision
  };
}

// node_modules/transformation-matrix/src/fromTransformAttribute.autogenerated.js
function peg$subclass(child, parent) {
  function C2() {
    this.constructor = child;
  }
  C2.prototype = parent.prototype;
  child.prototype = new C2();
}
function peg$SyntaxError(message, expected, found, location) {
  var self2 = Error.call(this, message);
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(self2, peg$SyntaxError.prototype);
  }
  self2.expected = expected;
  self2.found = found;
  self2.location = location;
  self2.name = "SyntaxError";
  return self2;
}
peg$subclass(peg$SyntaxError, Error);
function peg$padEnd(str, targetLength, padString) {
  padString = padString || " ";
  if (str.length > targetLength) {
    return str;
  }
  targetLength -= str.length;
  padString += padString.repeat(targetLength);
  return str + padString.slice(0, targetLength);
}
peg$SyntaxError.prototype.format = function(sources) {
  var str = "Error: " + this.message;
  if (this.location) {
    var src = null;
    var k;
    for (k = 0; k < sources.length; k++) {
      if (sources[k].source === this.location.source) {
        src = sources[k].text.split(/\r\n|\n|\r/g);
        break;
      }
    }
    var s = this.location.start;
    var offset_s = this.location.source && typeof this.location.source.offset === "function" ? this.location.source.offset(s) : s;
    var loc = this.location.source + ":" + offset_s.line + ":" + offset_s.column;
    if (src) {
      var e = this.location.end;
      var filler = peg$padEnd("", offset_s.line.toString().length, " ");
      var line = src[s.line - 1];
      var last = s.line === e.line ? e.column : line.length + 1;
      var hatLen = last - s.column || 1;
      str += "\n --> " + loc + "\n" + filler + " |\n" + offset_s.line + " | " + line + "\n" + filler + " | " + peg$padEnd("", s.column - 1, " ") + peg$padEnd("", hatLen, "^");
    } else {
      str += "\n at " + loc;
    }
  }
  return str;
};
peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
    literal: function(expectation) {
      return '"' + literalEscape(expectation.text) + '"';
    },
    class: function(expectation) {
      var escapedParts = expectation.parts.map(function(part) {
        return Array.isArray(part) ? classEscape(part[0]) + "-" + classEscape(part[1]) : classEscape(part);
      });
      return "[" + (expectation.inverted ? "^" : "") + escapedParts.join("") + "]";
    },
    any: function() {
      return "any character";
    },
    end: function() {
      return "end of input";
    },
    other: function(expectation) {
      return expectation.description;
    }
  };
  function hex2(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }
  function literalEscape(s) {
    return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
      return "\\x0" + hex2(ch);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
      return "\\x" + hex2(ch);
    });
  }
  function classEscape(s) {
    return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
      return "\\x0" + hex2(ch);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
      return "\\x" + hex2(ch);
    });
  }
  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }
  function describeExpected(expected2) {
    var descriptions = expected2.map(describeExpectation);
    var i, j;
    descriptions.sort();
    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }
    switch (descriptions.length) {
      case 1:
        return descriptions[0];
      case 2:
        return descriptions[0] + " or " + descriptions[1];
      default:
        return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
    }
  }
  function describeFound(found2) {
    return found2 ? '"' + literalEscape(found2) + '"' : "end of input";
  }
  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

// node_modules/d3-array/src/ascending.js
function ascending2(a2, b) {
  return a2 == null || b == null ? NaN : a2 < b ? -1 : a2 > b ? 1 : a2 >= b ? 0 : NaN;
}

// node_modules/d3-array/src/descending.js
function descending(a2, b) {
  return a2 == null || b == null ? NaN : b < a2 ? -1 : b > a2 ? 1 : b >= a2 ? 0 : NaN;
}

// node_modules/d3-array/src/bisector.js
function bisector(f) {
  let compare1, compare2, delta;
  if (f.length !== 2) {
    compare1 = ascending2;
    compare2 = (d, x3) => ascending2(f(d), x3);
    delta = (d, x3) => f(d) - x3;
  } else {
    compare1 = f === ascending2 || f === descending ? f : zero2;
    compare2 = f;
    delta = f;
  }
  function left(a2, x3, lo = 0, hi = a2.length) {
    if (lo < hi) {
      if (compare1(x3, x3) !== 0) return hi;
      do {
        const mid = lo + hi >>> 1;
        if (compare2(a2[mid], x3) < 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }
  function right(a2, x3, lo = 0, hi = a2.length) {
    if (lo < hi) {
      if (compare1(x3, x3) !== 0) return hi;
      do {
        const mid = lo + hi >>> 1;
        if (compare2(a2[mid], x3) <= 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }
  function center(a2, x3, lo = 0, hi = a2.length) {
    const i = left(a2, x3, lo, hi - 1);
    return i > lo && delta(a2[i - 1], x3) > -delta(a2[i], x3) ? i - 1 : i;
  }
  return {
    left,
    center,
    right
  };
}
function zero2() {
  return 0;
}

// node_modules/d3-array/src/number.js
function number(x3) {
  return x3 === null ? NaN : +x3;
}

// node_modules/d3-array/src/bisect.js
var ascendingBisect = bisector(ascending2);
var bisectRight = ascendingBisect.right;
var bisectLeft = ascendingBisect.left;
var bisectCenter = bisector(number).center;

// node_modules/d3-array/src/blur.js
var blur2 = Blur2(blurf);
var blurImage = Blur2(blurfImage);
function Blur2(blur3) {
  return function(data, rx, ry = rx) {
    if (!((rx = +rx) >= 0)) throw new RangeError("invalid rx");
    if (!((ry = +ry) >= 0)) throw new RangeError("invalid ry");
    let {
      data: values,
      width,
      height
    } = data;
    if (!((width = Math.floor(width)) >= 0)) throw new RangeError("invalid width");
    if (!((height = Math.floor(height !== void 0 ? height : values.length / width)) >= 0)) throw new RangeError("invalid height");
    if (!width || !height || !rx && !ry) return data;
    const blurx = rx && blur3(rx);
    const blury = ry && blur3(ry);
    const temp = values.slice();
    if (blurx && blury) {
      blurh(blurx, temp, values, width, height);
      blurh(blurx, values, temp, width, height);
      blurh(blurx, temp, values, width, height);
      blurv(blury, values, temp, width, height);
      blurv(blury, temp, values, width, height);
      blurv(blury, values, temp, width, height);
    } else if (blurx) {
      blurh(blurx, values, temp, width, height);
      blurh(blurx, temp, values, width, height);
      blurh(blurx, values, temp, width, height);
    } else if (blury) {
      blurv(blury, values, temp, width, height);
      blurv(blury, temp, values, width, height);
      blurv(blury, values, temp, width, height);
    }
    return data;
  };
}
function blurh(blur3, T, S, w, h) {
  for (let y3 = 0, n = w * h; y3 < n; ) {
    blur3(T, S, y3, y3 += w, 1);
  }
}
function blurv(blur3, T, S, w, h) {
  for (let x3 = 0, n = w * h; x3 < w; ++x3) {
    blur3(T, S, x3, x3 + n, w);
  }
}
function blurfImage(radius) {
  const blur3 = blurf(radius);
  return (T, S, start2, stop, step) => {
    start2 <<= 2, stop <<= 2, step <<= 2;
    blur3(T, S, start2 + 0, stop + 0, step);
    blur3(T, S, start2 + 1, stop + 1, step);
    blur3(T, S, start2 + 2, stop + 2, step);
    blur3(T, S, start2 + 3, stop + 3, step);
  };
}
function blurf(radius) {
  const radius0 = Math.floor(radius);
  if (radius0 === radius) return bluri(radius);
  const t = radius - radius0;
  const w = 2 * radius + 1;
  return (T, S, start2, stop, step) => {
    if (!((stop -= step) >= start2)) return;
    let sum2 = radius0 * S[start2];
    const s0 = step * radius0;
    const s1 = s0 + step;
    for (let i = start2, j = start2 + s0; i < j; i += step) {
      sum2 += S[Math.min(stop, i)];
    }
    for (let i = start2, j = stop; i <= j; i += step) {
      sum2 += S[Math.min(stop, i + s0)];
      T[i] = (sum2 + t * (S[Math.max(start2, i - s1)] + S[Math.min(stop, i + s1)])) / w;
      sum2 -= S[Math.max(start2, i - s0)];
    }
  };
}
function bluri(radius) {
  const w = 2 * radius + 1;
  return (T, S, start2, stop, step) => {
    if (!((stop -= step) >= start2)) return;
    let sum2 = radius * S[start2];
    const s = step * radius;
    for (let i = start2, j = start2 + s; i < j; i += step) {
      sum2 += S[Math.min(stop, i)];
    }
    for (let i = start2, j = stop; i <= j; i += step) {
      sum2 += S[Math.min(stop, i + s)];
      T[i] = sum2 / w;
      sum2 -= S[Math.max(start2, i - s)];
    }
  };
}

// node_modules/internmap/src/index.js
var InternMap = class extends Map {
  constructor(entries, key = keyof) {
    super();
    Object.defineProperties(this, {
      _intern: {
        value: /* @__PURE__ */ new Map()
      },
      _key: {
        value: key
      }
    });
    if (entries != null) for (const [key2, value] of entries) this.set(key2, value);
  }
  get(key) {
    return super.get(intern_get(this, key));
  }
  has(key) {
    return super.has(intern_get(this, key));
  }
  set(key, value) {
    return super.set(intern_set(this, key), value);
  }
  delete(key) {
    return super.delete(intern_delete(this, key));
  }
};
function intern_get({
  _intern,
  _key
}, value) {
  const key = _key(value);
  return _intern.has(key) ? _intern.get(key) : value;
}
function intern_set({
  _intern,
  _key
}, value) {
  const key = _key(value);
  if (_intern.has(key)) return _intern.get(key);
  _intern.set(key, value);
  return value;
}
function intern_delete({
  _intern,
  _key
}, value) {
  const key = _key(value);
  if (_intern.has(key)) {
    value = _intern.get(key);
    _intern.delete(key);
  }
  return value;
}
function keyof(value) {
  return value !== null && typeof value === "object" ? value.valueOf() : value;
}

// node_modules/d3-array/src/array.js
var array2 = Array.prototype;
var slice = array2.slice;
var map = array2.map;

// node_modules/d3-array/src/ticks.js
var e10 = Math.sqrt(50);
var e5 = Math.sqrt(10);
var e2 = Math.sqrt(2);
function tickSpec(start2, stop, count2) {
  const step = (stop - start2) / Math.max(0, count2), power = Math.floor(Math.log10(step)), error = step / Math.pow(10, power), factor = error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1;
  let i1, i2, inc;
  if (power < 0) {
    inc = Math.pow(10, -power) / factor;
    i1 = Math.round(start2 * inc);
    i2 = Math.round(stop * inc);
    if (i1 / inc < start2) ++i1;
    if (i2 / inc > stop) --i2;
    inc = -inc;
  } else {
    inc = Math.pow(10, power) * factor;
    i1 = Math.round(start2 / inc);
    i2 = Math.round(stop / inc);
    if (i1 * inc < start2) ++i1;
    if (i2 * inc > stop) --i2;
  }
  if (i2 < i1 && 0.5 <= count2 && count2 < 2) return tickSpec(start2, stop, count2 * 2);
  return [i1, i2, inc];
}
function tickIncrement(start2, stop, count2) {
  stop = +stop, start2 = +start2, count2 = +count2;
  return tickSpec(start2, stop, count2)[2];
}
function tickStep(start2, stop, count2) {
  stop = +stop, start2 = +start2, count2 = +count2;
  const reverse2 = stop < start2, inc = reverse2 ? tickIncrement(stop, start2, count2) : tickIncrement(start2, stop, count2);
  return (reverse2 ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
}

// node_modules/d3-array/src/shuffle.js
var shuffle_default = shuffler(Math.random);
function shuffler(random) {
  return function shuffle(array3, i0 = 0, i1 = array3.length) {
    let m2 = i1 - (i0 = +i0);
    while (m2) {
      const i = random() * m2-- | 0, t = array3[m2 + i0];
      array3[m2 + i0] = array3[i + i0];
      array3[i + i0] = t;
    }
    return array3;
  };
}

// node_modules/d3-scale/src/init.js
function initRange(domain, range2) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(domain);
      break;
    default:
      this.range(range2).domain(domain);
      break;
  }
  return this;
}

// node_modules/d3-scale/src/ordinal.js
var implicit = Symbol("implicit");
function ordinal() {
  var index3 = new InternMap(), domain = [], range2 = [], unknown = implicit;
  function scale2(d) {
    let i = index3.get(d);
    if (i === void 0) {
      if (unknown !== implicit) return unknown;
      index3.set(d, i = domain.push(d) - 1);
    }
    return range2[i % range2.length];
  }
  scale2.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [], index3 = new InternMap();
    for (const value of _) {
      if (index3.has(value)) continue;
      index3.set(value, domain.push(value) - 1);
    }
    return scale2;
  };
  scale2.range = function(_) {
    return arguments.length ? (range2 = Array.from(_), scale2) : range2.slice();
  };
  scale2.unknown = function(_) {
    return arguments.length ? (unknown = _, scale2) : unknown;
  };
  scale2.copy = function() {
    return ordinal(domain, range2).unknown(unknown);
  };
  initRange.apply(scale2, arguments);
  return scale2;
}

// node_modules/d3-format/src/formatDecimal.js
function formatDecimal_default(x3) {
  return Math.abs(x3 = Math.round(x3)) >= 1e21 ? x3.toLocaleString("en").replace(/,/g, "") : x3.toString(10);
}
function formatDecimalParts(x3, p) {
  if (!isFinite(x3) || x3 === 0) return null;
  var i = (x3 = p ? x3.toExponential(p - 1) : x3.toExponential()).indexOf("e"), coefficient = x3.slice(0, i);
  return [coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient, +x3.slice(i + 1)];
}

// node_modules/d3-format/src/exponent.js
function exponent_default(x3) {
  return x3 = formatDecimalParts(Math.abs(x3)), x3 ? x3[1] : NaN;
}

// node_modules/d3-format/src/formatGroup.js
function formatGroup_default(grouping, thousands) {
  return function(value, width) {
    var i = value.length, t = [], j = 0, g = grouping[0], length = 0;
    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }
    return t.reverse().join(thousands);
  };
}

// node_modules/d3-format/src/formatNumerals.js
function formatNumerals_default(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

// node_modules/d3-format/src/formatSpecifier.js
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}
formatSpecifier.prototype = FormatSpecifier.prototype;
function FormatSpecifier(specifier) {
  this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
  this.align = specifier.align === void 0 ? ">" : specifier.align + "";
  this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === void 0 ? void 0 : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === void 0 ? "" : specifier.type + "";
}
FormatSpecifier.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};

// node_modules/d3-format/src/formatTrim.js
function formatTrim_default(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".":
        i0 = i1 = i;
        break;
      case "0":
        if (i0 === 0) i0 = i;
        i1 = i;
        break;
      default:
        if (!+s[i]) break out;
        if (i0 > 0) i0 = 0;
        break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

// node_modules/d3-format/src/formatPrefixAuto.js
var prefixExponent;
function formatPrefixAuto_default(x3, p) {
  var d = formatDecimalParts(x3, p);
  if (!d) return prefixExponent = void 0, x3.toPrecision(p);
  var coefficient = d[0], exponent2 = d[1], i = exponent2 - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent2 / 3))) * 3) + 1, n = coefficient.length;
  return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x3, Math.max(0, p + i - 1))[0];
}

// node_modules/d3-format/src/formatRounded.js
function formatRounded_default(x3, p) {
  var d = formatDecimalParts(x3, p);
  if (!d) return x3 + "";
  var coefficient = d[0], exponent2 = d[1];
  return exponent2 < 0 ? "0." + new Array(-exponent2).join("0") + coefficient : coefficient.length > exponent2 + 1 ? coefficient.slice(0, exponent2 + 1) + "." + coefficient.slice(exponent2 + 1) : coefficient + new Array(exponent2 - coefficient.length + 2).join("0");
}

// node_modules/d3-format/src/formatTypes.js
var formatTypes_default = {
  "%": (x3, p) => (x3 * 100).toFixed(p),
  "b": (x3) => Math.round(x3).toString(2),
  "c": (x3) => x3 + "",
  "d": formatDecimal_default,
  "e": (x3, p) => x3.toExponential(p),
  "f": (x3, p) => x3.toFixed(p),
  "g": (x3, p) => x3.toPrecision(p),
  "o": (x3) => Math.round(x3).toString(8),
  "p": (x3, p) => formatRounded_default(x3 * 100, p),
  "r": formatRounded_default,
  "s": formatPrefixAuto_default,
  "X": (x3) => Math.round(x3).toString(16).toUpperCase(),
  "x": (x3) => Math.round(x3).toString(16)
};

// node_modules/d3-format/src/identity.js
function identity_default(x3) {
  return x3;
}

// node_modules/d3-format/src/locale.js
var map3 = Array.prototype.map;
var prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function locale_default(locale3) {
  var group3 = locale3.grouping === void 0 || locale3.thousands === void 0 ? identity_default : formatGroup_default(map3.call(locale3.grouping, Number), locale3.thousands + ""), currencyPrefix = locale3.currency === void 0 ? "" : locale3.currency[0] + "", currencySuffix = locale3.currency === void 0 ? "" : locale3.currency[1] + "", decimal = locale3.decimal === void 0 ? "." : locale3.decimal + "", numerals = locale3.numerals === void 0 ? identity_default : formatNumerals_default(map3.call(locale3.numerals, String)), percent = locale3.percent === void 0 ? "%" : locale3.percent + "", minus = locale3.minus === void 0 ? "−" : locale3.minus + "", nan = locale3.nan === void 0 ? "NaN" : locale3.nan + "";
  function newFormat(specifier, options) {
    specifier = formatSpecifier(specifier);
    var fill = specifier.fill, align = specifier.align, sign = specifier.sign, symbol = specifier.symbol, zero3 = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
    if (type === "n") comma = true, type = "g";
    else if (!formatTypes_default[type]) precision === void 0 && (precision = 12), trim = true, type = "g";
    if (zero3 || fill === "0" && align === "=") zero3 = true, fill = "0", align = "=";
    var prefix = (options && options.prefix !== void 0 ? options.prefix : "") + (symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : ""), suffix = (symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "") + (options && options.suffix !== void 0 ? options.suffix : "");
    var formatType = formatTypes_default[type], maybeSuffix = /[defgprs%]/.test(type);
    precision = precision === void 0 ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format2(value) {
      var valuePrefix = prefix, valueSuffix = suffix, i, n, c2;
      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;
        var valueNegative = value < 0 || 1 / value < 0;
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
        if (trim) value = formatTrim_default(value);
        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;
        valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" && !isNaN(value) && prefixExponent !== void 0 ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c2 = value.charCodeAt(i), 48 > c2 || c2 > 57) {
              valueSuffix = (c2 === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }
      if (comma && !zero3) value = group3(value, Infinity);
      var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
      if (comma && zero3) value = group3(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;
        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;
        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;
        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }
      return numerals(value);
    }
    format2.toString = function() {
      return specifier + "";
    };
    return format2;
  }
  function formatPrefix2(specifier, value) {
    var e = Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3, k = Math.pow(10, -e), f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier), {
      suffix: prefixes[8 + e / 3]
    });
    return function(value2) {
      return f(k * value2);
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix2
  };
}

// node_modules/d3-format/src/defaultLocale.js
var locale;
var format;
var formatPrefix;
defaultLocale({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function defaultLocale(definition) {
  locale = locale_default(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}

// node_modules/d3-time/src/interval.js
var t02 = /* @__PURE__ */ new Date();
var t12 = /* @__PURE__ */ new Date();
function timeInterval(floori, offseti, count2, field) {
  function interval2(date) {
    return floori(date = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+date)), date;
  }
  interval2.floor = (date) => {
    return floori(date = /* @__PURE__ */ new Date(+date)), date;
  };
  interval2.ceil = (date) => {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };
  interval2.round = (date) => {
    const d0 = interval2(date), d1 = interval2.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };
  interval2.offset = (date, step) => {
    return offseti(date = /* @__PURE__ */ new Date(+date), step == null ? 1 : Math.floor(step)), date;
  };
  interval2.range = (start2, stop, step) => {
    const range2 = [];
    start2 = interval2.ceil(start2);
    step = step == null ? 1 : Math.floor(step);
    if (!(start2 < stop) || !(step > 0)) return range2;
    let previous;
    do
      range2.push(previous = /* @__PURE__ */ new Date(+start2)), offseti(start2, step), floori(start2);
    while (previous < start2 && start2 < stop);
    return range2;
  };
  interval2.filter = (test) => {
    return timeInterval((date) => {
      if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
    }, (date, step) => {
      if (date >= date) {
        if (step < 0) while (++step <= 0) {
          while (offseti(date, -1), !test(date)) {
          }
        }
        else while (--step >= 0) {
          while (offseti(date, 1), !test(date)) {
          }
        }
      }
    });
  };
  if (count2) {
    interval2.count = (start2, end) => {
      t02.setTime(+start2), t12.setTime(+end);
      floori(t02), floori(t12);
      return Math.floor(count2(t02, t12));
    };
    interval2.every = (step) => {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval2 : interval2.filter(field ? (d) => field(d) % step === 0 : (d) => interval2.count(0, d) % step === 0);
    };
  }
  return interval2;
}

// node_modules/d3-time/src/millisecond.js
var millisecond = timeInterval(() => {
}, (date, step) => {
  date.setTime(+date + step);
}, (start2, end) => {
  return end - start2;
});
millisecond.every = (k) => {
  k = Math.floor(k);
  if (!isFinite(k) || !(k > 0)) return null;
  if (!(k > 1)) return millisecond;
  return timeInterval((date) => {
    date.setTime(Math.floor(date / k) * k);
  }, (date, step) => {
    date.setTime(+date + step * k);
  }, (start2, end) => {
    return (end - start2) / k;
  });
};
var milliseconds = millisecond.range;

// node_modules/d3-time/src/duration.js
var durationSecond = 1e3;
var durationMinute = durationSecond * 60;
var durationHour = durationMinute * 60;
var durationDay = durationHour * 24;
var durationWeek = durationDay * 7;
var durationMonth = durationDay * 30;
var durationYear = durationDay * 365;

// node_modules/d3-time/src/second.js
var second = timeInterval((date) => {
  date.setTime(date - date.getMilliseconds());
}, (date, step) => {
  date.setTime(+date + step * durationSecond);
}, (start2, end) => {
  return (end - start2) / durationSecond;
}, (date) => {
  return date.getUTCSeconds();
});
var seconds = second.range;

// node_modules/d3-time/src/minute.js
var timeMinute = timeInterval((date) => {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond);
}, (date, step) => {
  date.setTime(+date + step * durationMinute);
}, (start2, end) => {
  return (end - start2) / durationMinute;
}, (date) => {
  return date.getMinutes();
});
var timeMinutes = timeMinute.range;
var utcMinute = timeInterval((date) => {
  date.setUTCSeconds(0, 0);
}, (date, step) => {
  date.setTime(+date + step * durationMinute);
}, (start2, end) => {
  return (end - start2) / durationMinute;
}, (date) => {
  return date.getUTCMinutes();
});
var utcMinutes = utcMinute.range;

// node_modules/d3-time/src/hour.js
var timeHour = timeInterval((date) => {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond - date.getMinutes() * durationMinute);
}, (date, step) => {
  date.setTime(+date + step * durationHour);
}, (start2, end) => {
  return (end - start2) / durationHour;
}, (date) => {
  return date.getHours();
});
var timeHours = timeHour.range;
var utcHour = timeInterval((date) => {
  date.setUTCMinutes(0, 0, 0);
}, (date, step) => {
  date.setTime(+date + step * durationHour);
}, (start2, end) => {
  return (end - start2) / durationHour;
}, (date) => {
  return date.getUTCHours();
});
var utcHours = utcHour.range;

// node_modules/d3-time/src/day.js
var timeDay = timeInterval((date) => date.setHours(0, 0, 0, 0), (date, step) => date.setDate(date.getDate() + step), (start2, end) => (end - start2 - (end.getTimezoneOffset() - start2.getTimezoneOffset()) * durationMinute) / durationDay, (date) => date.getDate() - 1);
var timeDays = timeDay.range;
var utcDay = timeInterval((date) => {
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCDate(date.getUTCDate() + step);
}, (start2, end) => {
  return (end - start2) / durationDay;
}, (date) => {
  return date.getUTCDate() - 1;
});
var utcDays = utcDay.range;
var unixDay = timeInterval((date) => {
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCDate(date.getUTCDate() + step);
}, (start2, end) => {
  return (end - start2) / durationDay;
}, (date) => {
  return Math.floor(date / durationDay);
});
var unixDays = unixDay.range;

// node_modules/d3-time/src/week.js
function timeWeekday(i) {
  return timeInterval((date) => {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setDate(date.getDate() + step * 7);
  }, (start2, end) => {
    return (end - start2 - (end.getTimezoneOffset() - start2.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}
var timeSunday = timeWeekday(0);
var timeMonday = timeWeekday(1);
var timeTuesday = timeWeekday(2);
var timeWednesday = timeWeekday(3);
var timeThursday = timeWeekday(4);
var timeFriday = timeWeekday(5);
var timeSaturday = timeWeekday(6);
var timeSundays = timeSunday.range;
var timeMondays = timeMonday.range;
var timeTuesdays = timeTuesday.range;
var timeWednesdays = timeWednesday.range;
var timeThursdays = timeThursday.range;
var timeFridays = timeFriday.range;
var timeSaturdays = timeSaturday.range;
function utcWeekday(i) {
  return timeInterval((date) => {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, (start2, end) => {
    return (end - start2) / durationWeek;
  });
}
var utcSunday = utcWeekday(0);
var utcMonday = utcWeekday(1);
var utcTuesday = utcWeekday(2);
var utcWednesday = utcWeekday(3);
var utcThursday = utcWeekday(4);
var utcFriday = utcWeekday(5);
var utcSaturday = utcWeekday(6);
var utcSundays = utcSunday.range;
var utcMondays = utcMonday.range;
var utcTuesdays = utcTuesday.range;
var utcWednesdays = utcWednesday.range;
var utcThursdays = utcThursday.range;
var utcFridays = utcFriday.range;
var utcSaturdays = utcSaturday.range;

// node_modules/d3-time/src/month.js
var timeMonth = timeInterval((date) => {
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
}, (date, step) => {
  date.setMonth(date.getMonth() + step);
}, (start2, end) => {
  return end.getMonth() - start2.getMonth() + (end.getFullYear() - start2.getFullYear()) * 12;
}, (date) => {
  return date.getMonth();
});
var timeMonths = timeMonth.range;
var utcMonth = timeInterval((date) => {
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCMonth(date.getUTCMonth() + step);
}, (start2, end) => {
  return end.getUTCMonth() - start2.getUTCMonth() + (end.getUTCFullYear() - start2.getUTCFullYear()) * 12;
}, (date) => {
  return date.getUTCMonth();
});
var utcMonths = utcMonth.range;

// node_modules/d3-time/src/year.js
var timeYear = timeInterval((date) => {
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
}, (date, step) => {
  date.setFullYear(date.getFullYear() + step);
}, (start2, end) => {
  return end.getFullYear() - start2.getFullYear();
}, (date) => {
  return date.getFullYear();
});
timeYear.every = (k) => {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : timeInterval((date) => {
    date.setFullYear(Math.floor(date.getFullYear() / k) * k);
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setFullYear(date.getFullYear() + step * k);
  });
};
var timeYears = timeYear.range;
var utcYear = timeInterval((date) => {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCFullYear(date.getUTCFullYear() + step);
}, (start2, end) => {
  return end.getUTCFullYear() - start2.getUTCFullYear();
}, (date) => {
  return date.getUTCFullYear();
});
utcYear.every = (k) => {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : timeInterval((date) => {
    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setUTCFullYear(date.getUTCFullYear() + step * k);
  });
};
var utcYears = utcYear.range;

// node_modules/d3-time/src/ticks.js
function ticker(year, month, week, day, hour, minute) {
  const tickIntervals = [[second, 1, durationSecond], [second, 5, 5 * durationSecond], [second, 15, 15 * durationSecond], [second, 30, 30 * durationSecond], [minute, 1, durationMinute], [minute, 5, 5 * durationMinute], [minute, 15, 15 * durationMinute], [minute, 30, 30 * durationMinute], [hour, 1, durationHour], [hour, 3, 3 * durationHour], [hour, 6, 6 * durationHour], [hour, 12, 12 * durationHour], [day, 1, durationDay], [day, 2, 2 * durationDay], [week, 1, durationWeek], [month, 1, durationMonth], [month, 3, 3 * durationMonth], [year, 1, durationYear]];
  function ticks2(start2, stop, count2) {
    const reverse2 = stop < start2;
    if (reverse2) [start2, stop] = [stop, start2];
    const interval2 = count2 && typeof count2.range === "function" ? count2 : tickInterval(start2, stop, count2);
    const ticks3 = interval2 ? interval2.range(start2, +stop + 1) : [];
    return reverse2 ? ticks3.reverse() : ticks3;
  }
  function tickInterval(start2, stop, count2) {
    const target = Math.abs(stop - start2) / count2;
    const i = bisector(([, , step2]) => step2).right(tickIntervals, target);
    if (i === tickIntervals.length) return year.every(tickStep(start2 / durationYear, stop / durationYear, count2));
    if (i === 0) return millisecond.every(Math.max(tickStep(start2, stop, count2), 1));
    const [t, step] = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
    return t.every(step);
  }
  return [ticks2, tickInterval];
}
var [utcTicks, utcTickInterval] = ticker(utcYear, utcMonth, utcSunday, unixDay, utcHour, utcMinute);
var [timeTicks, timeTickInterval] = ticker(timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute);

// node_modules/d3-time-format/src/locale.js
function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date.setFullYear(d.y);
    return date;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}
function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date.setUTCFullYear(d.y);
    return date;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}
function newDate(y3, m2, d) {
  return {
    y: y3,
    m: m2,
    d,
    H: 0,
    M: 0,
    S: 0,
    L: 0
  };
}
function formatLocale(locale3) {
  var locale_dateTime = locale3.dateTime, locale_date = locale3.date, locale_time = locale3.time, locale_periods = locale3.periods, locale_weekdays = locale3.days, locale_shortWeekdays = locale3.shortDays, locale_months = locale3.months, locale_shortMonths = locale3.shortMonths;
  var periodRe = formatRe(locale_periods), periodLookup = formatLookup(locale_periods), weekdayRe = formatRe(locale_weekdays), weekdayLookup = formatLookup(locale_weekdays), shortWeekdayRe = formatRe(locale_shortWeekdays), shortWeekdayLookup = formatLookup(locale_shortWeekdays), monthRe = formatRe(locale_months), monthLookup = formatLookup(locale_months), shortMonthRe = formatRe(locale_shortMonths), shortMonthLookup = formatLookup(locale_shortMonths);
  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "g": formatYearISO,
    "G": formatFullYearISO,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "q": formatQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };
  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "g": formatUTCYearISO,
    "G": formatUTCFullYearISO,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "q": formatUTCQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };
  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "g": parseYear,
    "G": parseFullYear,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "q": parseQuarter,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);
  function newFormat(specifier, formats2) {
    return function(date) {
      var string = [], i = -1, j = 0, n = specifier.length, c2, pad2, format2;
      if (!(date instanceof Date)) date = /* @__PURE__ */ new Date(+date);
      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad2 = pads[c2 = specifier.charAt(++i)]) != null) c2 = specifier.charAt(++i);
          else pad2 = c2 === "e" ? " " : "0";
          if (format2 = formats2[c2]) c2 = format2(date, pad2);
          string.push(c2);
          j = i + 1;
        }
      }
      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }
  function newParse(specifier, Z) {
    return function(string) {
      var d = newDate(1900, void 0, 1), i = parseSpecifier(d, specifier, string += "", 0), week, day;
      if (i != string.length) return null;
      if ("Q" in d) return new Date(d.Q);
      if ("s" in d) return new Date(d.s * 1e3 + ("L" in d ? d.L : 0));
      if (Z && !("Z" in d)) d.Z = 0;
      if ("p" in d) d.H = d.H % 12 + d.p * 12;
      if (d.m === void 0) d.m = "q" in d ? d.q : 0;
      if ("V" in d) {
        if (d.V < 1 || d.V > 53) return null;
        if (!("w" in d)) d.w = 1;
        if ("Z" in d) {
          week = utcDate(newDate(d.y, 0, 1)), day = week.getUTCDay();
          week = day > 4 || day === 0 ? utcMonday.ceil(week) : utcMonday(week);
          week = utcDay.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = localDate(newDate(d.y, 0, 1)), day = week.getDay();
          week = day > 4 || day === 0 ? timeMonday.ceil(week) : timeMonday(week);
          week = timeDay.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
      }
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }
      return localDate(d);
    };
  }
  function parseSpecifier(d, specifier, string, j) {
    var i = 0, n = specifier.length, m2 = string.length, c2, parse;
    while (i < n) {
      if (j >= m2) return -1;
      c2 = specifier.charCodeAt(i++);
      if (c2 === 37) {
        c2 = specifier.charAt(i++);
        parse = parses[c2 in pads ? specifier.charAt(i++) : c2];
        if (!parse || (j = parse(d, string, j)) < 0) return -1;
      } else if (c2 != string.charCodeAt(j++)) {
        return -1;
      }
    }
    return j;
  }
  function parsePeriod(d, string, i) {
    var n = periodRe.exec(string.slice(i));
    return n ? (d.p = periodLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseShortWeekday(d, string, i) {
    var n = shortWeekdayRe.exec(string.slice(i));
    return n ? (d.w = shortWeekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseWeekday(d, string, i) {
    var n = weekdayRe.exec(string.slice(i));
    return n ? (d.w = weekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseShortMonth(d, string, i) {
    var n = shortMonthRe.exec(string.slice(i));
    return n ? (d.m = shortMonthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseLocaleDateTime(d, string, i) {
    return parseSpecifier(d, locale_dateTime, string, i);
  }
  function parseLocaleDate(d, string, i) {
    return parseSpecifier(d, locale_date, string, i);
  }
  function parseLocaleTime(d, string, i) {
    return parseSpecifier(d, locale_time, string, i);
  }
  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }
  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }
  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }
  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }
  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }
  function formatQuarter(d) {
    return 1 + ~~(d.getMonth() / 3);
  }
  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }
  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }
  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }
  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }
  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }
  function formatUTCQuarter(d) {
    return 1 + ~~(d.getUTCMonth() / 3);
  }
  return {
    format: function(specifier) {
      var f = newFormat(specifier += "", formats);
      f.toString = function() {
        return specifier;
      };
      return f;
    },
    parse: function(specifier) {
      var p = newParse(specifier += "", false);
      p.toString = function() {
        return specifier;
      };
      return p;
    },
    utcFormat: function(specifier) {
      var f = newFormat(specifier += "", utcFormats);
      f.toString = function() {
        return specifier;
      };
      return f;
    },
    utcParse: function(specifier) {
      var p = newParse(specifier += "", true);
      p.toString = function() {
        return specifier;
      };
      return p;
    }
  };
}
var pads = {
  "-": "",
  "_": " ",
  "0": "0"
};
var numberRe = /^\s*\d+/;
var percentRe = /^%/;
var requoteRe = /[\\^$*+?|[\]().{}]/g;
function pad(value, fill, width) {
  var sign = value < 0 ? "-" : "", string = (sign ? -value : value) + "", length = string.length;
  return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}
function requote(s) {
  return s.replace(requoteRe, "\\$&");
}
function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}
function formatLookup(names) {
  return new Map(names.map((name, i) => [name.toLowerCase(), i]));
}
function parseWeekdayNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}
function parseWeekdayNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.u = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberISO(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.V = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}
function parseFullYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}
function parseYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), i + n[0].length) : -1;
}
function parseZone(d, string, i) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}
function parseQuarter(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
}
function parseMonthNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}
function parseDayOfMonth(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}
function parseDayOfYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}
function parseHour24(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}
function parseMinutes(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}
function parseSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}
function parseMilliseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}
function parseMicroseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 6));
  return n ? (d.L = Math.floor(n[0] / 1e3), i + n[0].length) : -1;
}
function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}
function parseUnixTimestamp(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = +n[0], i + n[0].length) : -1;
}
function parseUnixTimestampSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.s = +n[0], i + n[0].length) : -1;
}
function formatDayOfMonth(d, p) {
  return pad(d.getDate(), p, 2);
}
function formatHour24(d, p) {
  return pad(d.getHours(), p, 2);
}
function formatHour12(d, p) {
  return pad(d.getHours() % 12 || 12, p, 2);
}
function formatDayOfYear(d, p) {
  return pad(1 + timeDay.count(timeYear(d), d), p, 3);
}
function formatMilliseconds(d, p) {
  return pad(d.getMilliseconds(), p, 3);
}
function formatMicroseconds(d, p) {
  return formatMilliseconds(d, p) + "000";
}
function formatMonthNumber(d, p) {
  return pad(d.getMonth() + 1, p, 2);
}
function formatMinutes(d, p) {
  return pad(d.getMinutes(), p, 2);
}
function formatSeconds(d, p) {
  return pad(d.getSeconds(), p, 2);
}
function formatWeekdayNumberMonday(d) {
  var day = d.getDay();
  return day === 0 ? 7 : day;
}
function formatWeekNumberSunday(d, p) {
  return pad(timeSunday.count(timeYear(d) - 1, d), p, 2);
}
function dISO(d) {
  var day = d.getDay();
  return day >= 4 || day === 0 ? timeThursday(d) : timeThursday.ceil(d);
}
function formatWeekNumberISO(d, p) {
  d = dISO(d);
  return pad(timeThursday.count(timeYear(d), d) + (timeYear(d).getDay() === 4), p, 2);
}
function formatWeekdayNumberSunday(d) {
  return d.getDay();
}
function formatWeekNumberMonday(d, p) {
  return pad(timeMonday.count(timeYear(d) - 1, d), p, 2);
}
function formatYear(d, p) {
  return pad(d.getFullYear() % 100, p, 2);
}
function formatYearISO(d, p) {
  d = dISO(d);
  return pad(d.getFullYear() % 100, p, 2);
}
function formatFullYear(d, p) {
  return pad(d.getFullYear() % 1e4, p, 4);
}
function formatFullYearISO(d, p) {
  var day = d.getDay();
  d = day >= 4 || day === 0 ? timeThursday(d) : timeThursday.ceil(d);
  return pad(d.getFullYear() % 1e4, p, 4);
}
function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+")) + pad(z / 60 | 0, "0", 2) + pad(z % 60, "0", 2);
}
function formatUTCDayOfMonth(d, p) {
  return pad(d.getUTCDate(), p, 2);
}
function formatUTCHour24(d, p) {
  return pad(d.getUTCHours(), p, 2);
}
function formatUTCHour12(d, p) {
  return pad(d.getUTCHours() % 12 || 12, p, 2);
}
function formatUTCDayOfYear(d, p) {
  return pad(1 + utcDay.count(utcYear(d), d), p, 3);
}
function formatUTCMilliseconds(d, p) {
  return pad(d.getUTCMilliseconds(), p, 3);
}
function formatUTCMicroseconds(d, p) {
  return formatUTCMilliseconds(d, p) + "000";
}
function formatUTCMonthNumber(d, p) {
  return pad(d.getUTCMonth() + 1, p, 2);
}
function formatUTCMinutes(d, p) {
  return pad(d.getUTCMinutes(), p, 2);
}
function formatUTCSeconds(d, p) {
  return pad(d.getUTCSeconds(), p, 2);
}
function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}
function formatUTCWeekNumberSunday(d, p) {
  return pad(utcSunday.count(utcYear(d) - 1, d), p, 2);
}
function UTCdISO(d) {
  var day = d.getUTCDay();
  return day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
}
function formatUTCWeekNumberISO(d, p) {
  d = UTCdISO(d);
  return pad(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
}
function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}
function formatUTCWeekNumberMonday(d, p) {
  return pad(utcMonday.count(utcYear(d) - 1, d), p, 2);
}
function formatUTCYear(d, p) {
  return pad(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCYearISO(d, p) {
  d = UTCdISO(d);
  return pad(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCFullYear(d, p) {
  return pad(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCFullYearISO(d, p) {
  var day = d.getUTCDay();
  d = day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
  return pad(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCZone() {
  return "+0000";
}
function formatLiteralPercent() {
  return "%";
}
function formatUnixTimestamp(d) {
  return +d;
}
function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1e3);
}

// node_modules/d3-time-format/src/defaultLocale.js
var locale2;
var timeFormat;
var timeParse;
var utcFormat;
var utcParse;
defaultLocale2({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function defaultLocale2(definition) {
  locale2 = formatLocale(definition);
  timeFormat = locale2.format;
  timeParse = locale2.parse;
  utcFormat = locale2.utcFormat;
  utcParse = locale2.utcParse;
  return locale2;
}

// node_modules/d3-time-format/src/isoFormat.js
var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";
function formatIsoNative(date) {
  return date.toISOString();
}
var formatIso = Date.prototype.toISOString ? formatIsoNative : utcFormat(isoSpecifier);

// node_modules/d3-time-format/src/isoParse.js
function parseIsoNative(string) {
  var date = new Date(string);
  return isNaN(date) ? null : date;
}
var parseIso = +/* @__PURE__ */ new Date("2000-01-01T00:00:00.000Z") ? parseIsoNative : utcParse(isoSpecifier);

// node_modules/@swimlane/ngx-graph/fesm2022/swimlane-ngx-graph.mjs
var dagre = __toESM(require_dagre(), 1);

// node_modules/d3-force/src/index.js
var src_exports3 = {};
__export(src_exports3, {
  forceCenter: () => center_default,
  forceCollide: () => collide_default,
  forceLink: () => link_default,
  forceManyBody: () => manyBody_default,
  forceRadial: () => radial_default,
  forceSimulation: () => simulation_default,
  forceX: () => x_default2,
  forceY: () => y_default2
});

// node_modules/d3-force/src/center.js
function center_default(x3, y3) {
  var nodes, strength = 1;
  if (x3 == null) x3 = 0;
  if (y3 == null) y3 = 0;
  function force() {
    var i, n = nodes.length, node, sx = 0, sy = 0;
    for (i = 0; i < n; ++i) {
      node = nodes[i], sx += node.x, sy += node.y;
    }
    for (sx = (sx / n - x3) * strength, sy = (sy / n - y3) * strength, i = 0; i < n; ++i) {
      node = nodes[i], node.x -= sx, node.y -= sy;
    }
  }
  force.initialize = function(_) {
    nodes = _;
  };
  force.x = function(_) {
    return arguments.length ? (x3 = +_, force) : x3;
  };
  force.y = function(_) {
    return arguments.length ? (y3 = +_, force) : y3;
  };
  force.strength = function(_) {
    return arguments.length ? (strength = +_, force) : strength;
  };
  return force;
}

// node_modules/d3-quadtree/src/add.js
function add_default(d) {
  const x3 = +this._x.call(null, d), y3 = +this._y.call(null, d);
  return add(this.cover(x3, y3), x3, y3, d);
}
function add(tree, x3, y3, d) {
  if (isNaN(x3) || isNaN(y3)) return tree;
  var parent, node = tree._root, leaf = {
    data: d
  }, x0 = tree._x0, y0 = tree._y0, x1 = tree._x1, y1 = tree._y1, xm, ym, xp, yp, right, bottom, i, j;
  if (!node) return tree._root = leaf, tree;
  while (node.length) {
    if (right = x3 >= (xm = (x0 + x1) / 2)) x0 = xm;
    else x1 = xm;
    if (bottom = y3 >= (ym = (y0 + y1) / 2)) y0 = ym;
    else y1 = ym;
    if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = leaf, tree;
  }
  xp = +tree._x.call(null, node.data);
  yp = +tree._y.call(null, node.data);
  if (x3 === xp && y3 === yp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;
  do {
    parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
    if (right = x3 >= (xm = (x0 + x1) / 2)) x0 = xm;
    else x1 = xm;
    if (bottom = y3 >= (ym = (y0 + y1) / 2)) y0 = ym;
    else y1 = ym;
  } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | xp >= xm));
  return parent[j] = node, parent[i] = leaf, tree;
}
function addAll(data) {
  var d, i, n = data.length, x3, y3, xz = new Array(n), yz = new Array(n), x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (i = 0; i < n; ++i) {
    if (isNaN(x3 = +this._x.call(null, d = data[i])) || isNaN(y3 = +this._y.call(null, d))) continue;
    xz[i] = x3;
    yz[i] = y3;
    if (x3 < x0) x0 = x3;
    if (x3 > x1) x1 = x3;
    if (y3 < y0) y0 = y3;
    if (y3 > y1) y1 = y3;
  }
  if (x0 > x1 || y0 > y1) return this;
  this.cover(x0, y0).cover(x1, y1);
  for (i = 0; i < n; ++i) {
    add(this, xz[i], yz[i], data[i]);
  }
  return this;
}

// node_modules/d3-quadtree/src/cover.js
function cover_default(x3, y3) {
  if (isNaN(x3 = +x3) || isNaN(y3 = +y3)) return this;
  var x0 = this._x0, y0 = this._y0, x1 = this._x1, y1 = this._y1;
  if (isNaN(x0)) {
    x1 = (x0 = Math.floor(x3)) + 1;
    y1 = (y0 = Math.floor(y3)) + 1;
  } else {
    var z = x1 - x0 || 1, node = this._root, parent, i;
    while (x0 > x3 || x3 >= x1 || y0 > y3 || y3 >= y1) {
      i = (y3 < y0) << 1 | x3 < x0;
      parent = new Array(4), parent[i] = node, node = parent, z *= 2;
      switch (i) {
        case 0:
          x1 = x0 + z, y1 = y0 + z;
          break;
        case 1:
          x0 = x1 - z, y1 = y0 + z;
          break;
        case 2:
          x1 = x0 + z, y0 = y1 - z;
          break;
        case 3:
          x0 = x1 - z, y0 = y1 - z;
          break;
      }
    }
    if (this._root && this._root.length) this._root = node;
  }
  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  return this;
}

// node_modules/d3-quadtree/src/data.js
function data_default2() {
  var data = [];
  this.visit(function(node) {
    if (!node.length) do
      data.push(node.data);
    while (node = node.next);
  });
  return data;
}

// node_modules/d3-quadtree/src/extent.js
function extent_default(_) {
  return arguments.length ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}

// node_modules/d3-quadtree/src/quad.js
function quad_default(node, x0, y0, x1, y1) {
  this.node = node;
  this.x0 = x0;
  this.y0 = y0;
  this.x1 = x1;
  this.y1 = y1;
}

// node_modules/d3-quadtree/src/find.js
function find_default(x3, y3, radius) {
  var data, x0 = this._x0, y0 = this._y0, x1, y1, x22, y22, x32 = this._x1, y32 = this._y1, quads = [], node = this._root, q, i;
  if (node) quads.push(new quad_default(node, x0, y0, x32, y32));
  if (radius == null) radius = Infinity;
  else {
    x0 = x3 - radius, y0 = y3 - radius;
    x32 = x3 + radius, y32 = y3 + radius;
    radius *= radius;
  }
  while (q = quads.pop()) {
    if (!(node = q.node) || (x1 = q.x0) > x32 || (y1 = q.y0) > y32 || (x22 = q.x1) < x0 || (y22 = q.y1) < y0) continue;
    if (node.length) {
      var xm = (x1 + x22) / 2, ym = (y1 + y22) / 2;
      quads.push(new quad_default(node[3], xm, ym, x22, y22), new quad_default(node[2], x1, ym, xm, y22), new quad_default(node[1], xm, y1, x22, ym), new quad_default(node[0], x1, y1, xm, ym));
      if (i = (y3 >= ym) << 1 | x3 >= xm) {
        q = quads[quads.length - 1];
        quads[quads.length - 1] = quads[quads.length - 1 - i];
        quads[quads.length - 1 - i] = q;
      }
    } else {
      var dx = x3 - +this._x.call(null, node.data), dy = y3 - +this._y.call(null, node.data), d2 = dx * dx + dy * dy;
      if (d2 < radius) {
        var d = Math.sqrt(radius = d2);
        x0 = x3 - d, y0 = y3 - d;
        x32 = x3 + d, y32 = y3 + d;
        data = node.data;
      }
    }
  }
  return data;
}

// node_modules/d3-quadtree/src/remove.js
function remove_default3(d) {
  if (isNaN(x3 = +this._x.call(null, d)) || isNaN(y3 = +this._y.call(null, d))) return this;
  var parent, node = this._root, retainer, previous, next, x0 = this._x0, y0 = this._y0, x1 = this._x1, y1 = this._y1, x3, y3, xm, ym, right, bottom, i, j;
  if (!node) return this;
  if (node.length) while (true) {
    if (right = x3 >= (xm = (x0 + x1) / 2)) x0 = xm;
    else x1 = xm;
    if (bottom = y3 >= (ym = (y0 + y1) / 2)) y0 = ym;
    else y1 = ym;
    if (!(parent = node, node = node[i = bottom << 1 | right])) return this;
    if (!node.length) break;
    if (parent[i + 1 & 3] || parent[i + 2 & 3] || parent[i + 3 & 3]) retainer = parent, j = i;
  }
  while (node.data !== d) if (!(previous = node, node = node.next)) return this;
  if (next = node.next) delete node.next;
  if (previous) return next ? previous.next = next : delete previous.next, this;
  if (!parent) return this._root = next, this;
  next ? parent[i] = next : delete parent[i];
  if ((node = parent[0] || parent[1] || parent[2] || parent[3]) && node === (parent[3] || parent[2] || parent[1] || parent[0]) && !node.length) {
    if (retainer) retainer[j] = node;
    else this._root = node;
  }
  return this;
}
function removeAll(data) {
  for (var i = 0, n = data.length; i < n; ++i) this.remove(data[i]);
  return this;
}

// node_modules/d3-quadtree/src/root.js
function root_default() {
  return this._root;
}

// node_modules/d3-quadtree/src/size.js
function size_default2() {
  var size = 0;
  this.visit(function(node) {
    if (!node.length) do
      ++size;
    while (node = node.next);
  });
  return size;
}

// node_modules/d3-quadtree/src/visit.js
function visit_default(callback) {
  var quads = [], q, node = this._root, child, x0, y0, x1, y1;
  if (node) quads.push(new quad_default(node, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
      var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[3]) quads.push(new quad_default(child, xm, ym, x1, y1));
      if (child = node[2]) quads.push(new quad_default(child, x0, ym, xm, y1));
      if (child = node[1]) quads.push(new quad_default(child, xm, y0, x1, ym));
      if (child = node[0]) quads.push(new quad_default(child, x0, y0, xm, ym));
    }
  }
  return this;
}

// node_modules/d3-quadtree/src/visitAfter.js
function visitAfter_default(callback) {
  var quads = [], next = [], q;
  if (this._root) quads.push(new quad_default(this._root, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    var node = q.node;
    if (node.length) {
      var child, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[0]) quads.push(new quad_default(child, x0, y0, xm, ym));
      if (child = node[1]) quads.push(new quad_default(child, xm, y0, x1, ym));
      if (child = node[2]) quads.push(new quad_default(child, x0, ym, xm, y1));
      if (child = node[3]) quads.push(new quad_default(child, xm, ym, x1, y1));
    }
    next.push(q);
  }
  while (q = next.pop()) {
    callback(q.node, q.x0, q.y0, q.x1, q.y1);
  }
  return this;
}

// node_modules/d3-quadtree/src/x.js
function defaultX(d) {
  return d[0];
}
function x_default(_) {
  return arguments.length ? (this._x = _, this) : this._x;
}

// node_modules/d3-quadtree/src/y.js
function defaultY(d) {
  return d[1];
}
function y_default(_) {
  return arguments.length ? (this._y = _, this) : this._y;
}

// node_modules/d3-quadtree/src/quadtree.js
function quadtree(nodes, x3, y3) {
  var tree = new Quadtree(x3 == null ? defaultX : x3, y3 == null ? defaultY : y3, NaN, NaN, NaN, NaN);
  return nodes == null ? tree : tree.addAll(nodes);
}
function Quadtree(x3, y3, x0, y0, x1, y1) {
  this._x = x3;
  this._y = y3;
  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  this._root = void 0;
}
function leaf_copy(leaf) {
  var copy3 = {
    data: leaf.data
  }, next = copy3;
  while (leaf = leaf.next) next = next.next = {
    data: leaf.data
  };
  return copy3;
}
var treeProto = quadtree.prototype = Quadtree.prototype;
treeProto.copy = function() {
  var copy3 = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1), node = this._root, nodes, child;
  if (!node) return copy3;
  if (!node.length) return copy3._root = leaf_copy(node), copy3;
  nodes = [{
    source: node,
    target: copy3._root = new Array(4)
  }];
  while (node = nodes.pop()) {
    for (var i = 0; i < 4; ++i) {
      if (child = node.source[i]) {
        if (child.length) nodes.push({
          source: child,
          target: node.target[i] = new Array(4)
        });
        else node.target[i] = leaf_copy(child);
      }
    }
  }
  return copy3;
};
treeProto.add = add_default;
treeProto.addAll = addAll;
treeProto.cover = cover_default;
treeProto.data = data_default2;
treeProto.extent = extent_default;
treeProto.find = find_default;
treeProto.remove = remove_default3;
treeProto.removeAll = removeAll;
treeProto.root = root_default;
treeProto.size = size_default2;
treeProto.visit = visit_default;
treeProto.visitAfter = visitAfter_default;
treeProto.x = x_default;
treeProto.y = y_default;

// node_modules/d3-force/src/constant.js
function constant_default3(x3) {
  return function() {
    return x3;
  };
}

// node_modules/d3-force/src/jiggle.js
function jiggle_default(random) {
  return (random() - 0.5) * 1e-6;
}

// node_modules/d3-force/src/collide.js
function x(d) {
  return d.x + d.vx;
}
function y(d) {
  return d.y + d.vy;
}
function collide_default(radius) {
  var nodes, radii, random, strength = 1, iterations = 1;
  if (typeof radius !== "function") radius = constant_default3(radius == null ? 1 : +radius);
  function force() {
    var i, n = nodes.length, tree, node, xi, yi, ri, ri2;
    for (var k = 0; k < iterations; ++k) {
      tree = quadtree(nodes, x, y).visitAfter(prepare);
      for (i = 0; i < n; ++i) {
        node = nodes[i];
        ri = radii[node.index], ri2 = ri * ri;
        xi = node.x + node.vx;
        yi = node.y + node.vy;
        tree.visit(apply);
      }
    }
    function apply(quad, x0, y0, x1, y1) {
      var data = quad.data, rj = quad.r, r = ri + rj;
      if (data) {
        if (data.index > node.index) {
          var x3 = xi - data.x - data.vx, y3 = yi - data.y - data.vy, l = x3 * x3 + y3 * y3;
          if (l < r * r) {
            if (x3 === 0) x3 = jiggle_default(random), l += x3 * x3;
            if (y3 === 0) y3 = jiggle_default(random), l += y3 * y3;
            l = (r - (l = Math.sqrt(l))) / l * strength;
            node.vx += (x3 *= l) * (r = (rj *= rj) / (ri2 + rj));
            node.vy += (y3 *= l) * r;
            data.vx -= x3 * (r = 1 - r);
            data.vy -= y3 * r;
          }
        }
        return;
      }
      return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r;
    }
  }
  function prepare(quad) {
    if (quad.data) return quad.r = radii[quad.data.index];
    for (var i = quad.r = 0; i < 4; ++i) {
      if (quad[i] && quad[i].r > quad.r) {
        quad.r = quad[i].r;
      }
    }
  }
  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length, node;
    radii = new Array(n);
    for (i = 0; i < n; ++i) node = nodes[i], radii[node.index] = +radius(node, i, nodes);
  }
  force.initialize = function(_nodes, _random) {
    nodes = _nodes;
    random = _random;
    initialize();
  };
  force.iterations = function(_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };
  force.strength = function(_) {
    return arguments.length ? (strength = +_, force) : strength;
  };
  force.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : constant_default3(+_), initialize(), force) : radius;
  };
  return force;
}

// node_modules/d3-force/src/link.js
function index2(d) {
  return d.index;
}
function find2(nodeById, nodeId) {
  var node = nodeById.get(nodeId);
  if (!node) throw new Error("node not found: " + nodeId);
  return node;
}
function link_default(links) {
  var id3 = index2, strength = defaultStrength, strengths, distance = constant_default3(30), distances, nodes, count2, bias, random, iterations = 1;
  if (links == null) links = [];
  function defaultStrength(link) {
    return 1 / Math.min(count2[link.source.index], count2[link.target.index]);
  }
  function force(alpha) {
    for (var k = 0, n = links.length; k < iterations; ++k) {
      for (var i = 0, link, source, target, x3, y3, l, b; i < n; ++i) {
        link = links[i], source = link.source, target = link.target;
        x3 = target.x + target.vx - source.x - source.vx || jiggle_default(random);
        y3 = target.y + target.vy - source.y - source.vy || jiggle_default(random);
        l = Math.sqrt(x3 * x3 + y3 * y3);
        l = (l - distances[i]) / l * alpha * strengths[i];
        x3 *= l, y3 *= l;
        target.vx -= x3 * (b = bias[i]);
        target.vy -= y3 * b;
        source.vx += x3 * (b = 1 - b);
        source.vy += y3 * b;
      }
    }
  }
  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length, m2 = links.length, nodeById = new Map(nodes.map((d, i2) => [id3(d, i2, nodes), d])), link;
    for (i = 0, count2 = new Array(n); i < m2; ++i) {
      link = links[i], link.index = i;
      if (typeof link.source !== "object") link.source = find2(nodeById, link.source);
      if (typeof link.target !== "object") link.target = find2(nodeById, link.target);
      count2[link.source.index] = (count2[link.source.index] || 0) + 1;
      count2[link.target.index] = (count2[link.target.index] || 0) + 1;
    }
    for (i = 0, bias = new Array(m2); i < m2; ++i) {
      link = links[i], bias[i] = count2[link.source.index] / (count2[link.source.index] + count2[link.target.index]);
    }
    strengths = new Array(m2), initializeStrength();
    distances = new Array(m2), initializeDistance();
  }
  function initializeStrength() {
    if (!nodes) return;
    for (var i = 0, n = links.length; i < n; ++i) {
      strengths[i] = +strength(links[i], i, links);
    }
  }
  function initializeDistance() {
    if (!nodes) return;
    for (var i = 0, n = links.length; i < n; ++i) {
      distances[i] = +distance(links[i], i, links);
    }
  }
  force.initialize = function(_nodes, _random) {
    nodes = _nodes;
    random = _random;
    initialize();
  };
  force.links = function(_) {
    return arguments.length ? (links = _, initialize(), force) : links;
  };
  force.id = function(_) {
    return arguments.length ? (id3 = _, force) : id3;
  };
  force.iterations = function(_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };
  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default3(+_), initializeStrength(), force) : strength;
  };
  force.distance = function(_) {
    return arguments.length ? (distance = typeof _ === "function" ? _ : constant_default3(+_), initializeDistance(), force) : distance;
  };
  return force;
}

// node_modules/d3-force/src/lcg.js
var a = 1664525;
var c = 1013904223;
var m = 4294967296;
function lcg_default() {
  let s = 1;
  return () => (s = (a * s + c) % m) / m;
}

// node_modules/d3-force/src/simulation.js
function x2(d) {
  return d.x;
}
function y2(d) {
  return d.y;
}
var initialRadius = 10;
var initialAngle = Math.PI * (3 - Math.sqrt(5));
function simulation_default(nodes) {
  var simulation, alpha = 1, alphaMin = 1e-3, alphaDecay = 1 - Math.pow(alphaMin, 1 / 300), alphaTarget = 0, velocityDecay = 0.6, forces = /* @__PURE__ */ new Map(), stepper = timer(step), event = dispatch_default2("tick", "end"), random = lcg_default();
  if (nodes == null) nodes = [];
  function step() {
    tick();
    event.call("tick", simulation);
    if (alpha < alphaMin) {
      stepper.stop();
      event.call("end", simulation);
    }
  }
  function tick(iterations) {
    var i, n = nodes.length, node;
    if (iterations === void 0) iterations = 1;
    for (var k = 0; k < iterations; ++k) {
      alpha += (alphaTarget - alpha) * alphaDecay;
      forces.forEach(function(force) {
        force(alpha);
      });
      for (i = 0; i < n; ++i) {
        node = nodes[i];
        if (node.fx == null) node.x += node.vx *= velocityDecay;
        else node.x = node.fx, node.vx = 0;
        if (node.fy == null) node.y += node.vy *= velocityDecay;
        else node.y = node.fy, node.vy = 0;
      }
    }
    return simulation;
  }
  function initializeNodes() {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.index = i;
      if (node.fx != null) node.x = node.fx;
      if (node.fy != null) node.y = node.fy;
      if (isNaN(node.x) || isNaN(node.y)) {
        var radius = initialRadius * Math.sqrt(0.5 + i), angle = i * initialAngle;
        node.x = radius * Math.cos(angle);
        node.y = radius * Math.sin(angle);
      }
      if (isNaN(node.vx) || isNaN(node.vy)) {
        node.vx = node.vy = 0;
      }
    }
  }
  function initializeForce(force) {
    if (force.initialize) force.initialize(nodes, random);
    return force;
  }
  initializeNodes();
  return simulation = {
    tick,
    restart: function() {
      return stepper.restart(step), simulation;
    },
    stop: function() {
      return stepper.stop(), simulation;
    },
    nodes: function(_) {
      return arguments.length ? (nodes = _, initializeNodes(), forces.forEach(initializeForce), simulation) : nodes;
    },
    alpha: function(_) {
      return arguments.length ? (alpha = +_, simulation) : alpha;
    },
    alphaMin: function(_) {
      return arguments.length ? (alphaMin = +_, simulation) : alphaMin;
    },
    alphaDecay: function(_) {
      return arguments.length ? (alphaDecay = +_, simulation) : +alphaDecay;
    },
    alphaTarget: function(_) {
      return arguments.length ? (alphaTarget = +_, simulation) : alphaTarget;
    },
    velocityDecay: function(_) {
      return arguments.length ? (velocityDecay = 1 - _, simulation) : 1 - velocityDecay;
    },
    randomSource: function(_) {
      return arguments.length ? (random = _, forces.forEach(initializeForce), simulation) : random;
    },
    force: function(name, _) {
      return arguments.length > 1 ? (_ == null ? forces.delete(name) : forces.set(name, initializeForce(_)), simulation) : forces.get(name);
    },
    find: function(x3, y3, radius) {
      var i = 0, n = nodes.length, dx, dy, d2, node, closest;
      if (radius == null) radius = Infinity;
      else radius *= radius;
      for (i = 0; i < n; ++i) {
        node = nodes[i];
        dx = x3 - node.x;
        dy = y3 - node.y;
        d2 = dx * dx + dy * dy;
        if (d2 < radius) closest = node, radius = d2;
      }
      return closest;
    },
    on: function(name, _) {
      return arguments.length > 1 ? (event.on(name, _), simulation) : event.on(name);
    }
  };
}

// node_modules/d3-force/src/manyBody.js
function manyBody_default() {
  var nodes, node, random, alpha, strength = constant_default3(-30), strengths, distanceMin2 = 1, distanceMax2 = Infinity, theta2 = 0.81;
  function force(_) {
    var i, n = nodes.length, tree = quadtree(nodes, x2, y2).visitAfter(accumulate);
    for (alpha = _, i = 0; i < n; ++i) node = nodes[i], tree.visit(apply);
  }
  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length, node2;
    strengths = new Array(n);
    for (i = 0; i < n; ++i) node2 = nodes[i], strengths[node2.index] = +strength(node2, i, nodes);
  }
  function accumulate(quad) {
    var strength2 = 0, q, c2, weight = 0, x3, y3, i;
    if (quad.length) {
      for (x3 = y3 = i = 0; i < 4; ++i) {
        if ((q = quad[i]) && (c2 = Math.abs(q.value))) {
          strength2 += q.value, weight += c2, x3 += c2 * q.x, y3 += c2 * q.y;
        }
      }
      quad.x = x3 / weight;
      quad.y = y3 / weight;
    } else {
      q = quad;
      q.x = q.data.x;
      q.y = q.data.y;
      do
        strength2 += strengths[q.data.index];
      while (q = q.next);
    }
    quad.value = strength2;
  }
  function apply(quad, x1, _, x22) {
    if (!quad.value) return true;
    var x3 = quad.x - node.x, y3 = quad.y - node.y, w = x22 - x1, l = x3 * x3 + y3 * y3;
    if (w * w / theta2 < l) {
      if (l < distanceMax2) {
        if (x3 === 0) x3 = jiggle_default(random), l += x3 * x3;
        if (y3 === 0) y3 = jiggle_default(random), l += y3 * y3;
        if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
        node.vx += x3 * quad.value * alpha / l;
        node.vy += y3 * quad.value * alpha / l;
      }
      return true;
    } else if (quad.length || l >= distanceMax2) return;
    if (quad.data !== node || quad.next) {
      if (x3 === 0) x3 = jiggle_default(random), l += x3 * x3;
      if (y3 === 0) y3 = jiggle_default(random), l += y3 * y3;
      if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
    }
    do
      if (quad.data !== node) {
        w = strengths[quad.data.index] * alpha / l;
        node.vx += x3 * w;
        node.vy += y3 * w;
      }
    while (quad = quad.next);
  }
  force.initialize = function(_nodes, _random) {
    nodes = _nodes;
    random = _random;
    initialize();
  };
  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default3(+_), initialize(), force) : strength;
  };
  force.distanceMin = function(_) {
    return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
  };
  force.distanceMax = function(_) {
    return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
  };
  force.theta = function(_) {
    return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
  };
  return force;
}

// node_modules/d3-force/src/radial.js
function radial_default(radius, x3, y3) {
  var nodes, strength = constant_default3(0.1), strengths, radiuses;
  if (typeof radius !== "function") radius = constant_default3(+radius);
  if (x3 == null) x3 = 0;
  if (y3 == null) y3 = 0;
  function force(alpha) {
    for (var i = 0, n = nodes.length; i < n; ++i) {
      var node = nodes[i], dx = node.x - x3 || 1e-6, dy = node.y - y3 || 1e-6, r = Math.sqrt(dx * dx + dy * dy), k = (radiuses[i] - r) * strengths[i] * alpha / r;
      node.vx += dx * k;
      node.vy += dy * k;
    }
  }
  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length;
    strengths = new Array(n);
    radiuses = new Array(n);
    for (i = 0; i < n; ++i) {
      radiuses[i] = +radius(nodes[i], i, nodes);
      strengths[i] = isNaN(radiuses[i]) ? 0 : +strength(nodes[i], i, nodes);
    }
  }
  force.initialize = function(_) {
    nodes = _, initialize();
  };
  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default3(+_), initialize(), force) : strength;
  };
  force.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : constant_default3(+_), initialize(), force) : radius;
  };
  force.x = function(_) {
    return arguments.length ? (x3 = +_, force) : x3;
  };
  force.y = function(_) {
    return arguments.length ? (y3 = +_, force) : y3;
  };
  return force;
}

// node_modules/d3-force/src/x.js
function x_default2(x3) {
  var strength = constant_default3(0.1), nodes, strengths, xz;
  if (typeof x3 !== "function") x3 = constant_default3(x3 == null ? 0 : +x3);
  function force(alpha) {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.vx += (xz[i] - node.x) * strengths[i] * alpha;
    }
  }
  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length;
    strengths = new Array(n);
    xz = new Array(n);
    for (i = 0; i < n; ++i) {
      strengths[i] = isNaN(xz[i] = +x3(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
    }
  }
  force.initialize = function(_) {
    nodes = _;
    initialize();
  };
  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default3(+_), initialize(), force) : strength;
  };
  force.x = function(_) {
    return arguments.length ? (x3 = typeof _ === "function" ? _ : constant_default3(+_), initialize(), force) : x3;
  };
  return force;
}

// node_modules/d3-force/src/y.js
function y_default2(y3) {
  var strength = constant_default3(0.1), nodes, strengths, yz;
  if (typeof y3 !== "function") y3 = constant_default3(y3 == null ? 0 : +y3);
  function force(alpha) {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.vy += (yz[i] - node.y) * strengths[i] * alpha;
    }
  }
  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length;
    strengths = new Array(n);
    yz = new Array(n);
    for (i = 0; i < n; ++i) {
      strengths[i] = isNaN(yz[i] = +y3(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
    }
  }
  force.initialize = function(_) {
    nodes = _;
    initialize();
  };
  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default3(+_), initialize(), force) : strength;
  };
  force.y = function(_) {
    return arguments.length ? (y3 = typeof _ === "function" ? _ : constant_default3(+_), initialize(), force) : y3;
  };
  return force;
}

// node_modules/@swimlane/ngx-graph/fesm2022/swimlane-ngx-graph.mjs
var import_webcola = __toESM(require_dist(), 1);
var _c0 = ["linkTemplate"];
var _c1 = ["nodeTemplate"];
var _c2 = ["clusterTemplate"];
var _c3 = ["defsTemplate"];
var _c4 = ["miniMapNodeTemplate"];
var _c5 = ["nodeElement"];
var _c6 = ["linkElement"];
var _c7 = ["*"];
var _c8 = (a0) => ({
  $implicit: a0
});
function GraphComponent__svg_g_2__svg_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementContainer(0, 19);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.defsTemplate);
  }
}
function GraphComponent__svg_g_2__svg_path_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "path", 20);
  }
  if (rf & 2) {
    const link_r3 = ctx.$implicit;
    ɵɵattribute("d", link_r3.textPath)("id", link_r3.id);
  }
}
function GraphComponent__svg_g_2__svg_g_7__svg_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementContainer(0, 24);
  }
  if (rf & 2) {
    const node_r5 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.clusterTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c8, node_r5));
  }
}
function GraphComponent__svg_g_2__svg_g_7__svg_g_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "g", 25);
    ɵɵelement(1, "rect");
    ɵɵelementStart(2, "text", 26);
    ɵɵtext(3);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const node_r5 = ɵɵnextContext().$implicit;
    ɵɵadvance();
    ɵɵattribute("width", node_r5.dimension.width)("height", node_r5.dimension.height)("fill", node_r5.data == null ? null : node_r5.data.color);
    ɵɵadvance();
    ɵɵattribute("x", 10)("y", node_r5.dimension.height / 2);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", node_r5.label, " ");
  }
}
function GraphComponent__svg_g_2__svg_g_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "g", 21, 1);
    ɵɵlistener("click", function GraphComponent__svg_g_2__svg_g_7_Template_g_click_0_listener() {
      const node_r5 = ɵɵrestoreView(_r4).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onClick(node_r5));
    });
    ɵɵtemplate(2, GraphComponent__svg_g_2__svg_g_7__svg_ng_container_2_Template, 1, 4, "ng-container", 22)(3, GraphComponent__svg_g_2__svg_g_7__svg_g_3_Template, 4, 6, "g", 23);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const node_r5 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassProp("old-node", ctx_r1.animate && ctx_r1.oldClusters.has(node_r5.id));
    ɵɵproperty("id", node_r5.id);
    ɵɵattribute("transform", node_r5.transform);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.clusterTemplate && !node_r5.hidden);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.clusterTemplate);
  }
}
function GraphComponent__svg_g_2__svg_g_9__svg_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementContainer(0, 24);
  }
  if (rf & 2) {
    const node_r7 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.nodeTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c8, node_r7));
  }
}
function GraphComponent__svg_g_2__svg_g_9__svg_g_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "g", 29);
    ɵɵelement(1, "rect");
    ɵɵelementStart(2, "text", 26);
    ɵɵtext(3);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const node_r7 = ɵɵnextContext().$implicit;
    ɵɵadvance();
    ɵɵattribute("width", node_r7.dimension.width)("height", node_r7.dimension.height)("fill", node_r7.data == null ? null : node_r7.data.color);
    ɵɵadvance();
    ɵɵattribute("x", 10)("y", node_r7.dimension.height / 2);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", node_r7.label, " ");
  }
}
function GraphComponent__svg_g_2__svg_g_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "g", 27, 2);
    ɵɵlistener("click", function GraphComponent__svg_g_2__svg_g_9_Template_g_click_0_listener() {
      const node_r7 = ɵɵrestoreView(_r6).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onClick(node_r7));
    })("mousedown", function GraphComponent__svg_g_2__svg_g_9_Template_g_mousedown_0_listener($event) {
      const node_r7 = ɵɵrestoreView(_r6).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onNodeMouseDown($event, node_r7));
    });
    ɵɵtemplate(2, GraphComponent__svg_g_2__svg_g_9__svg_ng_container_2_Template, 1, 4, "ng-container", 22)(3, GraphComponent__svg_g_2__svg_g_9__svg_g_3_Template, 4, 6, "g", 28);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const node_r7 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassProp("old-node", ctx_r1.animate && ctx_r1.oldCompoundNodes.has(node_r7.id));
    ɵɵproperty("id", node_r7.id);
    ɵɵattribute("transform", node_r7.transform);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.nodeTemplate && !node_r7.hidden);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.nodeTemplate);
  }
}
function GraphComponent__svg_g_2__svg_g_11__svg_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementContainer(0, 24);
  }
  if (rf & 2) {
    const link_r8 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.linkTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c8, link_r8));
  }
}
function GraphComponent__svg_g_2__svg_g_11__svg_path_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "path", 32);
  }
  if (rf & 2) {
    const link_r8 = ɵɵnextContext().$implicit;
    ɵɵattribute("d", link_r8.line);
  }
}
function GraphComponent__svg_g_2__svg_g_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "g", 30, 3);
    ɵɵtemplate(2, GraphComponent__svg_g_2__svg_g_11__svg_ng_container_2_Template, 1, 4, "ng-container", 22)(3, GraphComponent__svg_g_2__svg_g_11__svg_path_3_Template, 1, 1, "path", 31);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const link_r8 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("id", link_r8.id);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.linkTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.linkTemplate);
  }
}
function GraphComponent__svg_g_2__svg_g_14__svg_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementContainer(0, 24);
  }
  if (rf & 2) {
    const node_r10 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.nodeTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c8, node_r10));
  }
}
function GraphComponent__svg_g_2__svg_g_14__svg_circle_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "circle", 34);
  }
  if (rf & 2) {
    const node_r10 = ɵɵnextContext().$implicit;
    ɵɵattribute("cx", node_r10.dimension.width / 2)("cy", node_r10.dimension.height / 2)("fill", node_r10.data == null ? null : node_r10.data.color);
  }
}
function GraphComponent__svg_g_2__svg_g_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = ɵɵgetCurrentView();
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "g", 27, 2);
    ɵɵlistener("click", function GraphComponent__svg_g_2__svg_g_14_Template_g_click_0_listener() {
      const node_r10 = ɵɵrestoreView(_r9).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onClick(node_r10));
    })("mousedown", function GraphComponent__svg_g_2__svg_g_14_Template_g_mousedown_0_listener($event) {
      const node_r10 = ɵɵrestoreView(_r9).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onNodeMouseDown($event, node_r10));
    });
    ɵɵtemplate(2, GraphComponent__svg_g_2__svg_g_14__svg_ng_container_2_Template, 1, 4, "ng-container", 22)(3, GraphComponent__svg_g_2__svg_g_14__svg_circle_3_Template, 1, 3, "circle", 33);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const node_r10 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassProp("old-node", ctx_r1.animate && ctx_r1.oldNodes.has(node_r10.id));
    ɵɵproperty("id", node_r10.id);
    ɵɵattribute("transform", node_r10.transform);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.nodeTemplate && !node_r10.hidden);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.nodeTemplate);
  }
}
function GraphComponent__svg_g_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "g", 8);
    ɵɵlistener("touchstart", function GraphComponent__svg_g_2_Template_g_touchstart_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onTouchStart($event));
    })("touchend", function GraphComponent__svg_g_2_Template_g_touchend_0_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onTouchEnd());
    });
    ɵɵelementStart(1, "defs");
    ɵɵtemplate(2, GraphComponent__svg_g_2__svg_ng_container_2_Template, 1, 1, "ng-container", 9)(3, GraphComponent__svg_g_2__svg_path_3_Template, 1, 2, "path", 10);
    ɵɵelementEnd();
    ɵɵelementStart(4, "rect", 11);
    ɵɵlistener("mousedown", function GraphComponent__svg_g_2_Template_rect_mousedown_4_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.isPanning = true);
    });
    ɵɵelementEnd();
    ɵɵprojection(5);
    ɵɵelementStart(6, "g", 12);
    ɵɵtemplate(7, GraphComponent__svg_g_2__svg_g_7_Template, 4, 6, "g", 13);
    ɵɵelementEnd();
    ɵɵelementStart(8, "g", 14);
    ɵɵtemplate(9, GraphComponent__svg_g_2__svg_g_9_Template, 4, 6, "g", 15);
    ɵɵelementEnd();
    ɵɵelementStart(10, "g", 16);
    ɵɵtemplate(11, GraphComponent__svg_g_2__svg_g_11_Template, 4, 3, "g", 17);
    ɵɵelementEnd();
    ɵɵelementStart(12, "g", 18, 0);
    ɵɵtemplate(14, GraphComponent__svg_g_2__svg_g_14_Template, 4, 6, "g", 15);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵattribute("transform", ctx_r1.transform);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.defsTemplate);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r1.graph.edges);
    ɵɵadvance();
    ɵɵattribute("width", ctx_r1.dims.width * 100)("height", ctx_r1.dims.height * 100)("transform", "translate(" + (-ctx_r1.dims.width || 0) * 50 + "," + (-ctx_r1.dims.height || 0) * 50 + ")");
    ɵɵadvance(3);
    ɵɵproperty("ngForOf", ctx_r1.graph.clusters)("ngForTrackBy", ctx_r1.trackNodeBy);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r1.graph.compoundNodes)("ngForTrackBy", ctx_r1.trackNodeBy);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r1.graph.edges)("ngForTrackBy", ctx_r1.trackLinkBy);
    ɵɵadvance(3);
    ɵɵproperty("ngForOf", ctx_r1.graph.nodes)("ngForTrackBy", ctx_r1.trackNodeBy);
  }
}
function GraphComponent__svg_g_5__svg_g_4__svg_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementContainer(0, 24);
  }
  if (rf & 2) {
    const node_r12 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.miniMapNodeTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c8, node_r12));
  }
}
function GraphComponent__svg_g_5__svg_g_4__svg_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementContainer(0, 24);
  }
  if (rf & 2) {
    const node_r12 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.nodeTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c8, node_r12));
  }
}
function GraphComponent__svg_g_5__svg_g_4__svg_circle_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "circle", 34);
  }
  if (rf & 2) {
    const node_r12 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵattribute("cx", node_r12.dimension.width / 2 / ctx_r1.minimapScaleCoefficient)("cy", node_r12.dimension.height / 2 / ctx_r1.minimapScaleCoefficient)("fill", node_r12.data == null ? null : node_r12.data.color);
  }
}
function GraphComponent__svg_g_5__svg_g_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "g", 40, 2);
    ɵɵtemplate(2, GraphComponent__svg_g_5__svg_g_4__svg_ng_container_2_Template, 1, 4, "ng-container", 22)(3, GraphComponent__svg_g_5__svg_g_4__svg_ng_container_3_Template, 1, 4, "ng-container", 22)(4, GraphComponent__svg_g_5__svg_g_4__svg_circle_4_Template, 1, 3, "circle", 33);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const node_r12 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassProp("old-node", ctx_r1.animate && ctx_r1.oldNodes.has(node_r12.id));
    ɵɵproperty("id", node_r12.id);
    ɵɵattribute("transform", node_r12.transform);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.miniMapNodeTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.miniMapNodeTemplate && ctx_r1.nodeTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.nodeTemplate && !ctx_r1.miniMapNodeTemplate);
  }
}
function GraphComponent__svg_g_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = ɵɵgetCurrentView();
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "g", 35)(1, "rect", 36);
    ɵɵlistener("mousedown", function GraphComponent__svg_g_5_Template_rect_mousedown_1_listener($event) {
      ɵɵrestoreView(_r11);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onMinimapPanTo($event));
    });
    ɵɵelementEnd();
    ɵɵelementStart(2, "g")(3, "g", 37);
    ɵɵtemplate(4, GraphComponent__svg_g_5__svg_g_4_Template, 5, 7, "g", 38);
    ɵɵelementEnd();
    ɵɵelementStart(5, "rect", 39);
    ɵɵlistener("mousedown", function GraphComponent__svg_g_5_Template_rect_mousedown_5_listener() {
      ɵɵrestoreView(_r11);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onMinimapDragMouseDown());
    });
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵattribute("transform", ctx_r1.minimapTransform)("clip-path", "url(#" + ctx_r1.minimapClipPathId + ")");
    ɵɵadvance();
    ɵɵattribute("width", ctx_r1.graphDims.width / ctx_r1.minimapScaleCoefficient)("height", ctx_r1.graphDims.height / ctx_r1.minimapScaleCoefficient);
    ɵɵadvance();
    ɵɵstyleProp("transform", "translate(" + -ctx_r1.minimapOffsetX / ctx_r1.minimapScaleCoefficient + "px," + -ctx_r1.minimapOffsetY / ctx_r1.minimapScaleCoefficient + "px)");
    ɵɵadvance();
    ɵɵstyleProp("transform", "scale(" + 1 / ctx_r1.minimapScaleCoefficient + ")");
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r1.graph.nodes)("ngForTrackBy", ctx_r1.trackNodeBy);
    ɵɵadvance();
    ɵɵclassProp("panning", ctx_r1.isMinimapPanning);
    ɵɵattribute("transform", "translate(" + ctx_r1.panOffsetX / ctx_r1.zoomLevel / -ctx_r1.minimapScaleCoefficient + "," + ctx_r1.panOffsetY / ctx_r1.zoomLevel / -ctx_r1.minimapScaleCoefficient + ")")("width", ctx_r1.width / ctx_r1.minimapScaleCoefficient / ctx_r1.zoomLevel)("height", ctx_r1.height / ctx_r1.minimapScaleCoefficient / ctx_r1.zoomLevel);
  }
}
var cache = {};
function id2() {
  let newId2 = ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
  newId2 = `a${newId2}`;
  if (!cache[newId2]) {
    cache[newId2] = true;
    return newId2;
  }
  return id2();
}
var PanningAxis;
(function(PanningAxis2) {
  PanningAxis2["Both"] = "both";
  PanningAxis2["Horizontal"] = "horizontal";
  PanningAxis2["Vertical"] = "vertical";
})(PanningAxis || (PanningAxis = {}));
var MiniMapPosition;
(function(MiniMapPosition2) {
  MiniMapPosition2["UpperLeft"] = "UpperLeft";
  MiniMapPosition2["UpperRight"] = "UpperRight";
})(MiniMapPosition || (MiniMapPosition = {}));
function throttle(context, func, wait, options) {
  options = options || {};
  let args;
  let result;
  let timeout2 = null;
  let previous = 0;
  function later() {
    previous = options.leading === false ? 0 : +/* @__PURE__ */ new Date();
    timeout2 = null;
    result = func.apply(context, args);
  }
  return function(..._arguments) {
    const now2 = +/* @__PURE__ */ new Date();
    if (!previous && options.leading === false) {
      previous = now2;
    }
    const remaining = wait - (now2 - previous);
    args = _arguments;
    if (remaining <= 0) {
      clearTimeout(timeout2);
      timeout2 = null;
      previous = now2;
      result = func.apply(context, args);
    } else if (!timeout2 && options.trailing !== false) {
      timeout2 = setTimeout(later, remaining);
    }
    return result;
  };
}
function throttleable(duration, options) {
  return function innerDecorator(target, key, descriptor) {
    return {
      configurable: true,
      enumerable: descriptor.enumerable,
      get: function getter() {
        Object.defineProperty(this, key, {
          configurable: true,
          enumerable: descriptor.enumerable,
          value: throttle(this, descriptor.value, duration, options)
        });
        return this[key];
      }
    };
  };
}
var colorSets = [{
  name: "vivid",
  selectable: true,
  group: "Ordinal",
  domain: ["#647c8a", "#3f51b5", "#2196f3", "#00b862", "#afdf0a", "#a7b61a", "#f3e562", "#ff9800", "#ff5722", "#ff4514"]
}, {
  name: "natural",
  selectable: true,
  group: "Ordinal",
  domain: ["#bf9d76", "#e99450", "#d89f59", "#f2dfa7", "#a5d7c6", "#7794b1", "#afafaf", "#707160", "#ba9383", "#d9d5c3"]
}, {
  name: "cool",
  selectable: true,
  group: "Ordinal",
  domain: ["#a8385d", "#7aa3e5", "#a27ea8", "#aae3f5", "#adcded", "#a95963", "#8796c0", "#7ed3ed", "#50abcc", "#ad6886"]
}, {
  name: "fire",
  selectable: true,
  group: "Ordinal",
  domain: ["#ff3d00", "#bf360c", "#ff8f00", "#ff6f00", "#ff5722", "#e65100", "#ffca28", "#ffab00"]
}, {
  name: "solar",
  selectable: true,
  group: "Continuous",
  domain: ["#fff8e1", "#ffecb3", "#ffe082", "#ffd54f", "#ffca28", "#ffc107", "#ffb300", "#ffa000", "#ff8f00", "#ff6f00"]
}, {
  name: "air",
  selectable: true,
  group: "Continuous",
  domain: ["#e1f5fe", "#b3e5fc", "#81d4fa", "#4fc3f7", "#29b6f6", "#03a9f4", "#039be5", "#0288d1", "#0277bd", "#01579b"]
}, {
  name: "aqua",
  selectable: true,
  group: "Continuous",
  domain: ["#e0f7fa", "#b2ebf2", "#80deea", "#4dd0e1", "#26c6da", "#00bcd4", "#00acc1", "#0097a7", "#00838f", "#006064"]
}, {
  name: "flame",
  selectable: false,
  group: "Ordinal",
  domain: ["#A10A28", "#D3342D", "#EF6D49", "#FAAD67", "#FDDE90", "#DBED91", "#A9D770", "#6CBA67", "#2C9653", "#146738"]
}, {
  name: "ocean",
  selectable: false,
  group: "Ordinal",
  domain: ["#1D68FB", "#33C0FC", "#4AFFFE", "#AFFFFF", "#FFFC63", "#FDBD2D", "#FC8A25", "#FA4F1E", "#FA141B", "#BA38D1"]
}, {
  name: "forest",
  selectable: false,
  group: "Ordinal",
  domain: ["#55C22D", "#C1F33D", "#3CC099", "#AFFFFF", "#8CFC9D", "#76CFFA", "#BA60FB", "#EE6490", "#C42A1C", "#FC9F32"]
}, {
  name: "horizon",
  selectable: false,
  group: "Ordinal",
  domain: ["#2597FB", "#65EBFD", "#99FDD0", "#FCEE4B", "#FEFCFA", "#FDD6E3", "#FCB1A8", "#EF6F7B", "#CB96E8", "#EFDEE0"]
}, {
  name: "neons",
  selectable: false,
  group: "Ordinal",
  domain: ["#FF3333", "#FF33FF", "#CC33FF", "#0000FF", "#33CCFF", "#33FFFF", "#33FF66", "#CCFF33", "#FFCC00", "#FF6600"]
}, {
  name: "picnic",
  selectable: false,
  group: "Ordinal",
  domain: ["#FAC51D", "#66BD6D", "#FAA026", "#29BB9C", "#E96B56", "#55ACD2", "#B7332F", "#2C83C9", "#9166B8", "#92E7E8"]
}, {
  name: "night",
  selectable: false,
  group: "Ordinal",
  domain: ["#2B1B5A", "#501356", "#183356", "#28203F", "#391B3C", "#1E2B3C", "#120634", "#2D0432", "#051932", "#453080", "#75267D", "#2C507D", "#4B3880", "#752F7D", "#35547D"]
}, {
  name: "nightLights",
  selectable: false,
  group: "Ordinal",
  domain: ["#4e31a5", "#9c25a7", "#3065ab", "#57468b", "#904497", "#46648b", "#32118d", "#a00fb3", "#1052a2", "#6e51bd", "#b63cc3", "#6c97cb", "#8671c1", "#b455be", "#7496c3"]
}];
var ColorHelper = class {
  scale;
  colorDomain;
  domain;
  customColors;
  constructor(scheme, domain, customColors) {
    if (typeof scheme === "string") {
      scheme = colorSets.find((cs) => {
        return cs.name === scheme;
      });
    }
    this.colorDomain = scheme.domain;
    this.domain = domain;
    this.customColors = customColors;
    this.scale = this.generateColorScheme(scheme, this.domain);
  }
  generateColorScheme(scheme, domain) {
    if (typeof scheme === "string") {
      scheme = colorSets.find((cs) => {
        return cs.name === scheme;
      });
    }
    return ordinal().range(scheme.domain).domain(domain);
  }
  getColor(value) {
    if (value === void 0 || value === null) {
      throw new Error("Value can not be null");
    }
    if (typeof this.customColors === "function") {
      return this.customColors(value);
    }
    const formattedValue = value.toString();
    let found;
    if (this.customColors && this.customColors.length > 0) {
      found = this.customColors.find((mapping) => {
        return mapping.name.toLowerCase() === formattedValue.toLowerCase();
      });
    }
    if (found) {
      return found.value;
    } else {
      return this.scale(value);
    }
  }
};
function calculateViewDimensions({
  width,
  height
}) {
  let chartWidth = width;
  let chartHeight = height;
  chartWidth = Math.max(0, chartWidth);
  chartHeight = Math.max(0, chartHeight);
  return {
    width: Math.floor(chartWidth),
    height: Math.floor(chartHeight)
  };
}
var VisibilityObserver = class _VisibilityObserver {
  element;
  zone;
  visible = new EventEmitter();
  timeout;
  isVisible = false;
  constructor(element, zone) {
    this.element = element;
    this.zone = zone;
    this.runCheck();
  }
  destroy() {
    clearTimeout(this.timeout);
  }
  onVisibilityChange() {
    this.zone.run(() => {
      this.isVisible = true;
      this.visible.emit(true);
    });
  }
  runCheck() {
    const check = () => {
      if (!this.element) {
        return;
      }
      const {
        offsetHeight,
        offsetWidth
      } = this.element.nativeElement;
      if (offsetHeight && offsetWidth) {
        clearTimeout(this.timeout);
        this.onVisibilityChange();
      } else {
        clearTimeout(this.timeout);
        this.zone.runOutsideAngular(() => {
          this.timeout = setTimeout(() => check(), 100);
        });
      }
    };
    this.zone.runOutsideAngular(() => {
      this.timeout = setTimeout(() => check());
    });
  }
  static ɵfac = function VisibilityObserver_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VisibilityObserver)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _VisibilityObserver,
    selectors: [["visibility-observer"]],
    outputs: {
      visible: "visible"
    },
    standalone: false
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VisibilityObserver, [{
    type: Directive,
    args: [{
      // tslint:disable-next-line:directive-selector
      selector: "visibility-observer",
      standalone: false
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: NgZone
  }], {
    visible: [{
      type: Output
    }]
  });
})();
var Orientation;
(function(Orientation2) {
  Orientation2["LEFT_TO_RIGHT"] = "LR";
  Orientation2["RIGHT_TO_LEFT"] = "RL";
  Orientation2["TOP_TO_BOTTOM"] = "TB";
  Orientation2["BOTTOM_TO_TOM"] = "BT";
})(Orientation || (Orientation = {}));
var Alignment;
(function(Alignment2) {
  Alignment2["CENTER"] = "C";
  Alignment2["UP_LEFT"] = "UL";
  Alignment2["UP_RIGHT"] = "UR";
  Alignment2["DOWN_LEFT"] = "DL";
  Alignment2["DOWN_RIGHT"] = "DR";
})(Alignment || (Alignment = {}));
var DagreLayout = class {
  defaultSettings = {
    orientation: Orientation.LEFT_TO_RIGHT,
    marginX: 20,
    marginY: 20,
    edgePadding: 100,
    rankPadding: 100,
    nodePadding: 50,
    multigraph: true,
    compound: true
  };
  settings = {};
  dagreGraph;
  dagreNodes;
  dagreEdges;
  run(graph) {
    this.createDagreGraph(graph);
    dagre.layout(this.dagreGraph);
    graph.edgeLabels = this.dagreGraph._edgeLabels;
    for (const dagreNodeId in this.dagreGraph._nodes) {
      const dagreNode = this.dagreGraph._nodes[dagreNodeId];
      const node = graph.nodes.find((n) => n.id === dagreNode.id);
      node.position = {
        x: dagreNode.x,
        y: dagreNode.y
      };
      node.dimension = {
        width: dagreNode.width,
        height: dagreNode.height
      };
    }
    return graph;
  }
  updateEdge(graph, edge) {
    const sourceNode = graph.nodes.find((n) => n.id === edge.source);
    const targetNode = graph.nodes.find((n) => n.id === edge.target);
    const dir = sourceNode.position.y <= targetNode.position.y ? -1 : 1;
    const startingPoint = {
      x: sourceNode.position.x,
      y: sourceNode.position.y - dir * (sourceNode.dimension.height / 2)
    };
    const endingPoint = {
      x: targetNode.position.x,
      y: targetNode.position.y + dir * (targetNode.dimension.height / 2)
    };
    edge.points = [startingPoint, endingPoint];
    return graph;
  }
  createDagreGraph(graph) {
    const settings = Object.assign({}, this.defaultSettings, this.settings);
    this.dagreGraph = new dagre.graphlib.Graph({
      compound: settings.compound,
      multigraph: settings.multigraph
    });
    this.dagreGraph.setGraph({
      rankdir: settings.orientation,
      marginx: settings.marginX,
      marginy: settings.marginY,
      edgesep: settings.edgePadding,
      ranksep: settings.rankPadding,
      nodesep: settings.nodePadding,
      align: settings.align,
      acyclicer: settings.acyclicer,
      ranker: settings.ranker,
      multigraph: settings.multigraph,
      compound: settings.compound
    });
    this.dagreGraph.setDefaultEdgeLabel(() => {
      return {
        /* empty */
      };
    });
    this.dagreNodes = graph.nodes.map((n) => {
      const node = Object.assign({}, n);
      node.width = n.dimension.width;
      node.height = n.dimension.height;
      node.x = n.position.x;
      node.y = n.position.y;
      return node;
    });
    this.dagreEdges = graph.edges.map((l) => {
      const newLink = Object.assign({}, l);
      if (!newLink.id) {
        newLink.id = id2();
      }
      return newLink;
    });
    for (const node of this.dagreNodes) {
      if (!node.width) {
        node.width = 20;
      }
      if (!node.height) {
        node.height = 30;
      }
      this.dagreGraph.setNode(node.id, node);
    }
    for (const edge of this.dagreEdges) {
      if (settings.multigraph) {
        this.dagreGraph.setEdge(edge.source, edge.target, edge, edge.id);
      } else {
        this.dagreGraph.setEdge(edge.source, edge.target);
      }
    }
    return this.dagreGraph;
  }
};
var DagreClusterLayout = class {
  defaultSettings = {
    orientation: Orientation.LEFT_TO_RIGHT,
    marginX: 20,
    marginY: 20,
    edgePadding: 100,
    rankPadding: 100,
    nodePadding: 50,
    multigraph: true,
    compound: true
  };
  settings = {};
  dagreGraph;
  dagreNodes;
  dagreClusters;
  dagreEdges;
  run(graph) {
    this.createDagreGraph(graph);
    dagre.layout(this.dagreGraph);
    graph.edgeLabels = this.dagreGraph._edgeLabels;
    const dagreToOutput = (node) => {
      const dagreNode = this.dagreGraph._nodes[node.id];
      return __spreadProps(__spreadValues({}, node), {
        position: {
          x: dagreNode.x,
          y: dagreNode.y
        },
        dimension: {
          width: dagreNode.width,
          height: dagreNode.height
        }
      });
    };
    graph.clusters = (graph.clusters || []).map(dagreToOutput);
    graph.nodes = graph.nodes.map(dagreToOutput);
    return graph;
  }
  updateEdge(graph, edge) {
    const sourceNode = graph.nodes.find((n) => n.id === edge.source);
    const targetNode = graph.nodes.find((n) => n.id === edge.target);
    const dir = sourceNode.position.y <= targetNode.position.y ? -1 : 1;
    const startingPoint = {
      x: sourceNode.position.x,
      y: sourceNode.position.y - dir * (sourceNode.dimension.height / 2)
    };
    const endingPoint = {
      x: targetNode.position.x,
      y: targetNode.position.y + dir * (targetNode.dimension.height / 2)
    };
    edge.points = [startingPoint, endingPoint];
    return graph;
  }
  createDagreGraph(graph) {
    const settings = Object.assign({}, this.defaultSettings, this.settings);
    this.dagreGraph = new dagre.graphlib.Graph({
      compound: settings.compound,
      multigraph: settings.multigraph
    });
    this.dagreGraph.setGraph({
      rankdir: settings.orientation,
      marginx: settings.marginX,
      marginy: settings.marginY,
      edgesep: settings.edgePadding,
      ranksep: settings.rankPadding,
      nodesep: settings.nodePadding,
      align: settings.align,
      acyclicer: settings.acyclicer,
      ranker: settings.ranker,
      multigraph: settings.multigraph,
      compound: settings.compound
    });
    this.dagreGraph.setDefaultEdgeLabel(() => {
      return {
        /* empty */
      };
    });
    this.dagreNodes = graph.nodes.map((n) => {
      const node = Object.assign({}, n);
      node.width = n.dimension.width;
      node.height = n.dimension.height;
      node.x = n.position.x;
      node.y = n.position.y;
      return node;
    });
    this.dagreClusters = graph.clusters || [];
    this.dagreEdges = graph.edges.map((l) => {
      const newLink = Object.assign({}, l);
      if (!newLink.id) {
        newLink.id = id2();
      }
      return newLink;
    });
    for (const node of this.dagreNodes) {
      this.dagreGraph.setNode(node.id, node);
    }
    for (const cluster of this.dagreClusters) {
      this.dagreGraph.setNode(cluster.id, cluster);
      cluster.childNodeIds.forEach((childNodeId) => {
        this.dagreGraph.setParent(childNodeId, cluster.id);
      });
    }
    for (const edge of this.dagreEdges) {
      if (settings.multigraph) {
        this.dagreGraph.setEdge(edge.source, edge.target, edge, edge.id);
      } else {
        this.dagreGraph.setEdge(edge.source, edge.target);
      }
    }
    return this.dagreGraph;
  }
};
var DEFAULT_EDGE_NAME = "\0";
var EDGE_KEY_DELIM = "";
var DagreNodesOnlyLayout = class {
  defaultSettings = {
    orientation: Orientation.LEFT_TO_RIGHT,
    marginX: 20,
    marginY: 20,
    edgePadding: 100,
    rankPadding: 100,
    nodePadding: 50,
    curveDistance: 20,
    multigraph: true,
    compound: true
  };
  settings = {};
  dagreGraph;
  dagreNodes;
  dagreEdges;
  run(graph) {
    this.createDagreGraph(graph);
    dagre.layout(this.dagreGraph);
    graph.edgeLabels = this.dagreGraph._edgeLabels;
    for (const dagreNodeId in this.dagreGraph._nodes) {
      const dagreNode = this.dagreGraph._nodes[dagreNodeId];
      const node = graph.nodes.find((n) => n.id === dagreNode.id);
      node.position = {
        x: dagreNode.x,
        y: dagreNode.y
      };
      node.dimension = {
        width: dagreNode.width,
        height: dagreNode.height
      };
    }
    for (const edge of graph.edges) {
      this.updateEdge(graph, edge);
    }
    return graph;
  }
  updateEdge(graph, edge) {
    const sourceNode = graph.nodes.find((n) => n.id === edge.source);
    const targetNode = graph.nodes.find((n) => n.id === edge.target);
    const rankAxis = this.settings.orientation === "BT" || this.settings.orientation === "TB" ? "y" : "x";
    const orderAxis = rankAxis === "y" ? "x" : "y";
    const rankDimension = rankAxis === "y" ? "height" : "width";
    const dir = sourceNode.position[rankAxis] <= targetNode.position[rankAxis] ? -1 : 1;
    const startingPoint = {
      [orderAxis]: sourceNode.position[orderAxis],
      [rankAxis]: sourceNode.position[rankAxis] - dir * (sourceNode.dimension[rankDimension] / 2)
    };
    const endingPoint = {
      [orderAxis]: targetNode.position[orderAxis],
      [rankAxis]: targetNode.position[rankAxis] + dir * (targetNode.dimension[rankDimension] / 2)
    };
    const curveDistance = this.settings.curveDistance || this.defaultSettings.curveDistance;
    edge.points = [startingPoint, {
      [orderAxis]: startingPoint[orderAxis],
      [rankAxis]: startingPoint[rankAxis] - dir * curveDistance
    }, {
      [orderAxis]: endingPoint[orderAxis],
      [rankAxis]: endingPoint[rankAxis] + dir * curveDistance
    }, endingPoint];
    const edgeLabelId = `${edge.source}${EDGE_KEY_DELIM}${edge.target}${EDGE_KEY_DELIM}${DEFAULT_EDGE_NAME}`;
    const matchingEdgeLabel = graph.edgeLabels[edgeLabelId];
    if (matchingEdgeLabel) {
      matchingEdgeLabel.points = edge.points;
    }
    return graph;
  }
  createDagreGraph(graph) {
    const settings = Object.assign({}, this.defaultSettings, this.settings);
    this.dagreGraph = new dagre.graphlib.Graph({
      compound: settings.compound,
      multigraph: settings.multigraph
    });
    this.dagreGraph.setGraph({
      rankdir: settings.orientation,
      marginx: settings.marginX,
      marginy: settings.marginY,
      edgesep: settings.edgePadding,
      ranksep: settings.rankPadding,
      nodesep: settings.nodePadding,
      align: settings.align,
      acyclicer: settings.acyclicer,
      ranker: settings.ranker,
      multigraph: settings.multigraph,
      compound: settings.compound
    });
    this.dagreGraph.setDefaultEdgeLabel(() => {
      return {
        /* empty */
      };
    });
    this.dagreNodes = graph.nodes.map((n) => {
      const node = Object.assign({}, n);
      node.width = n.dimension.width;
      node.height = n.dimension.height;
      node.x = n.position.x;
      node.y = n.position.y;
      return node;
    });
    this.dagreEdges = graph.edges.map((l) => {
      const newLink = Object.assign({}, l);
      if (!newLink.id) {
        newLink.id = id2();
      }
      return newLink;
    });
    for (const node of this.dagreNodes) {
      if (!node.width) {
        node.width = 20;
      }
      if (!node.height) {
        node.height = 30;
      }
      this.dagreGraph.setNode(node.id, node);
    }
    for (const edge of this.dagreEdges) {
      if (settings.multigraph) {
        this.dagreGraph.setEdge(edge.source, edge.target, edge, edge.id);
      } else {
        this.dagreGraph.setEdge(edge.source, edge.target);
      }
    }
    return this.dagreGraph;
  }
};
function toD3Node(maybeNode) {
  if (typeof maybeNode === "string") {
    return {
      id: maybeNode,
      x: 0,
      y: 0
    };
  }
  return maybeNode;
}
var D3ForceDirectedLayout = class {
  defaultSettings = {
    force: simulation_default().force("charge", manyBody_default().strength(-150)).force("collide", collide_default(5)),
    forceLink: link_default().id((node) => node.id).distance(() => 100)
  };
  settings = {};
  inputGraph;
  outputGraph;
  d3Graph;
  outputGraph$ = new Subject();
  draggingStart;
  run(graph) {
    this.inputGraph = graph;
    this.d3Graph = {
      nodes: [...this.inputGraph.nodes.map((n) => __spreadValues({}, n))],
      edges: [...this.inputGraph.edges.map((e) => __spreadValues({}, e))]
    };
    this.outputGraph = {
      nodes: [],
      edges: [],
      edgeLabels: []
    };
    this.outputGraph$.next(this.outputGraph);
    this.settings = Object.assign({}, this.defaultSettings, this.settings);
    if (this.settings.force) {
      this.settings.force.nodes(this.d3Graph.nodes).force("link", this.settings.forceLink.links(this.d3Graph.edges)).alpha(0.5).restart().on("tick", () => {
        this.outputGraph$.next(this.d3GraphToOutputGraph(this.d3Graph));
      });
    }
    return this.outputGraph$.asObservable();
  }
  updateEdge(graph, edge) {
    const settings = Object.assign({}, this.defaultSettings, this.settings);
    if (settings.force) {
      settings.force.nodes(this.d3Graph.nodes).force("link", settings.forceLink.links(this.d3Graph.edges)).alpha(0.5).restart().on("tick", () => {
        this.outputGraph$.next(this.d3GraphToOutputGraph(this.d3Graph));
      });
    }
    return this.outputGraph$.asObservable();
  }
  d3GraphToOutputGraph(d3Graph) {
    this.outputGraph.nodes = this.d3Graph.nodes.map((node) => __spreadProps(__spreadValues({}, node), {
      id: node.id || id2(),
      position: {
        x: node.x,
        y: node.y
      },
      dimension: {
        width: node.dimension && node.dimension.width || 20,
        height: node.dimension && node.dimension.height || 20
      },
      transform: `translate(${node.x - (node.dimension && node.dimension.width || 20) / 2 || 0}, ${node.y - (node.dimension && node.dimension.height || 20) / 2 || 0})`
    }));
    this.outputGraph.edges = this.d3Graph.edges.map((edge) => __spreadProps(__spreadValues({}, edge), {
      source: toD3Node(edge.source).id,
      target: toD3Node(edge.target).id,
      points: [{
        x: toD3Node(edge.source).x,
        y: toD3Node(edge.source).y
      }, {
        x: toD3Node(edge.target).x,
        y: toD3Node(edge.target).y
      }]
    }));
    this.outputGraph.edgeLabels = this.outputGraph.edges;
    return this.outputGraph;
  }
  onDragStart(draggingNode, $event) {
    this.settings.force.alphaTarget(0.3).restart();
    const node = this.d3Graph.nodes.find((d3Node) => d3Node.id === draggingNode.id);
    if (!node) {
      return;
    }
    this.draggingStart = {
      x: $event.x - node.x,
      y: $event.y - node.y
    };
    node.fx = $event.x - this.draggingStart.x;
    node.fy = $event.y - this.draggingStart.y;
  }
  onDrag(draggingNode, $event) {
    if (!draggingNode) {
      return;
    }
    const node = this.d3Graph.nodes.find((d3Node) => d3Node.id === draggingNode.id);
    if (!node) {
      return;
    }
    node.fx = $event.x - this.draggingStart.x;
    node.fy = $event.y - this.draggingStart.y;
  }
  onDragEnd(draggingNode, $event) {
    if (!draggingNode) {
      return;
    }
    const node = this.d3Graph.nodes.find((d3Node) => d3Node.id === draggingNode.id);
    if (!node) {
      return;
    }
    this.settings.force.alphaTarget(0);
    node.fx = void 0;
    node.fy = void 0;
  }
};
function toNode(nodes, nodeRef) {
  if (typeof nodeRef === "number") {
    return nodes[nodeRef];
  }
  return nodeRef;
}
var ColaForceDirectedLayout = class {
  defaultSettings = {
    force: (0, import_webcola.d3adaptor)(__spreadValues(__spreadValues(__spreadValues({}, src_exports), src_exports3), src_exports2)).linkDistance(150).avoidOverlaps(true),
    viewDimensions: {
      width: 600,
      height: 600
    }
  };
  settings = {};
  inputGraph;
  outputGraph;
  internalGraph;
  outputGraph$ = new Subject();
  draggingStart;
  run(graph) {
    this.inputGraph = graph;
    if (!this.inputGraph.clusters) {
      this.inputGraph.clusters = [];
    }
    this.internalGraph = {
      nodes: [...this.inputGraph.nodes.map((n) => __spreadProps(__spreadValues({}, n), {
        width: n.dimension ? n.dimension.width : 20,
        height: n.dimension ? n.dimension.height : 20
      }))],
      groups: [...this.inputGraph.clusters.map((cluster) => ({
        padding: 5,
        groups: cluster.childNodeIds.map((nodeId) => this.inputGraph.clusters.findIndex((node) => node.id === nodeId)).filter((x3) => x3 >= 0),
        leaves: cluster.childNodeIds.map((nodeId) => this.inputGraph.nodes.findIndex((node) => node.id === nodeId)).filter((x3) => x3 >= 0)
      }))],
      links: [...this.inputGraph.edges.map((e) => {
        const sourceNodeIndex = this.inputGraph.nodes.findIndex((node) => e.source === node.id);
        const targetNodeIndex = this.inputGraph.nodes.findIndex((node) => e.target === node.id);
        if (sourceNodeIndex === -1 || targetNodeIndex === -1) {
          return void 0;
        }
        return __spreadProps(__spreadValues({}, e), {
          source: sourceNodeIndex,
          target: targetNodeIndex
        });
      }).filter((x3) => !!x3)],
      groupLinks: [...this.inputGraph.edges.map((e) => {
        const sourceNodeIndex = this.inputGraph.nodes.findIndex((node) => e.source === node.id);
        const targetNodeIndex = this.inputGraph.nodes.findIndex((node) => e.target === node.id);
        if (sourceNodeIndex >= 0 && targetNodeIndex >= 0) {
          return void 0;
        }
        return e;
      }).filter((x3) => !!x3)]
    };
    this.outputGraph = {
      nodes: [],
      clusters: [],
      edges: [],
      edgeLabels: []
    };
    this.outputGraph$.next(this.outputGraph);
    this.settings = Object.assign({}, this.defaultSettings, this.settings);
    if (this.settings.force) {
      this.settings.force = this.settings.force.nodes(this.internalGraph.nodes).groups(this.internalGraph.groups).links(this.internalGraph.links).alpha(0.5).on("tick", () => {
        if (this.settings.onTickListener) {
          this.settings.onTickListener(this.internalGraph);
        }
        this.outputGraph$.next(this.internalGraphToOutputGraph(this.internalGraph));
      });
      if (this.settings.viewDimensions) {
        this.settings.force = this.settings.force.size([this.settings.viewDimensions.width, this.settings.viewDimensions.height]);
      }
      if (this.settings.forceModifierFn) {
        this.settings.force = this.settings.forceModifierFn(this.settings.force);
      }
      this.settings.force.start();
    }
    return this.outputGraph$.asObservable();
  }
  updateEdge(graph, edge) {
    const settings = Object.assign({}, this.defaultSettings, this.settings);
    if (settings.force) {
      settings.force.start();
    }
    return this.outputGraph$.asObservable();
  }
  internalGraphToOutputGraph(internalGraph) {
    this.outputGraph.nodes = internalGraph.nodes.map((node) => __spreadProps(__spreadValues({}, node), {
      id: node.id || id2(),
      position: {
        x: node.x,
        y: node.y
      },
      dimension: {
        width: node.dimension && node.dimension.width || 20,
        height: node.dimension && node.dimension.height || 20
      },
      transform: `translate(${node.x - (node.dimension && node.dimension.width || 20) / 2 || 0}, ${node.y - (node.dimension && node.dimension.height || 20) / 2 || 0})`
    }));
    this.outputGraph.edges = internalGraph.links.map((edge) => {
      const source = toNode(internalGraph.nodes, edge.source);
      const target = toNode(internalGraph.nodes, edge.target);
      return __spreadProps(__spreadValues({}, edge), {
        source: source.id,
        target: target.id,
        points: [source.bounds.rayIntersection(target.bounds.cx(), target.bounds.cy()), target.bounds.rayIntersection(source.bounds.cx(), source.bounds.cy())]
      });
    }).concat(internalGraph.groupLinks.map((groupLink) => {
      const sourceNode = internalGraph.nodes.find((foundNode) => foundNode.id === groupLink.source);
      const targetNode = internalGraph.nodes.find((foundNode) => foundNode.id === groupLink.target);
      const source = sourceNode || internalGraph.groups.find((foundGroup) => foundGroup.id === groupLink.source);
      const target = targetNode || internalGraph.groups.find((foundGroup) => foundGroup.id === groupLink.target);
      return __spreadProps(__spreadValues({}, groupLink), {
        source: source.id,
        target: target.id,
        points: [source.bounds.rayIntersection(target.bounds.cx(), target.bounds.cy()), target.bounds.rayIntersection(source.bounds.cx(), source.bounds.cy())]
      });
    }));
    this.outputGraph.clusters = internalGraph.groups.map((group3, index3) => {
      const inputGroup = this.inputGraph.clusters[index3];
      return __spreadProps(__spreadValues({}, inputGroup), {
        dimension: {
          width: group3.bounds ? group3.bounds.width() : 20,
          height: group3.bounds ? group3.bounds.height() : 20
        },
        position: {
          x: group3.bounds ? group3.bounds.x + group3.bounds.width() / 2 : 0,
          y: group3.bounds ? group3.bounds.y + group3.bounds.height() / 2 : 0
        }
      });
    });
    this.outputGraph.edgeLabels = this.outputGraph.edges;
    return this.outputGraph;
  }
  onDragStart(draggingNode, $event) {
    const nodeIndex = this.outputGraph.nodes.findIndex((foundNode) => foundNode.id === draggingNode.id);
    const node = this.internalGraph.nodes[nodeIndex];
    if (!node) {
      return;
    }
    this.draggingStart = {
      x: node.x - $event.x,
      y: node.y - $event.y
    };
    node.fixed = 1;
    this.settings.force.start();
  }
  onDrag(draggingNode, $event) {
    if (!draggingNode) {
      return;
    }
    const nodeIndex = this.outputGraph.nodes.findIndex((foundNode) => foundNode.id === draggingNode.id);
    const node = this.internalGraph.nodes[nodeIndex];
    if (!node) {
      return;
    }
    node.x = this.draggingStart.x + $event.x;
    node.y = this.draggingStart.y + $event.y;
  }
  onDragEnd(draggingNode, $event) {
    if (!draggingNode) {
      return;
    }
    const nodeIndex = this.outputGraph.nodes.findIndex((foundNode) => foundNode.id === draggingNode.id);
    const node = this.internalGraph.nodes[nodeIndex];
    if (!node) {
      return;
    }
    node.fixed = 0;
  }
};
var layouts = {
  dagre: DagreLayout,
  dagreCluster: DagreClusterLayout,
  dagreNodesOnly: DagreNodesOnlyLayout,
  d3ForceDirected: D3ForceDirectedLayout,
  colaForceDirected: ColaForceDirectedLayout
};
var LayoutService = class _LayoutService {
  getLayout(name) {
    if (layouts[name]) {
      return new layouts[name]();
    } else {
      throw new Error(`Unknown layout type '${name}'`);
    }
  }
  static ɵfac = function LayoutService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LayoutService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _LayoutService,
    factory: _LayoutService.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutService, [{
    type: Injectable
  }], null, null);
})();
var MouseWheelDirective = class _MouseWheelDirective {
  mouseWheelUp = new EventEmitter();
  mouseWheelDown = new EventEmitter();
  onMouseWheelChrome(event) {
    this.mouseWheelFunc(event);
  }
  onMouseWheelFirefox(event) {
    this.mouseWheelFunc(event);
  }
  onWheel(event) {
    this.mouseWheelFunc(event);
  }
  onMouseWheelIE(event) {
    this.mouseWheelFunc(event);
  }
  mouseWheelFunc(event) {
    if (window.event) {
      event = window.event;
    }
    const delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail || event.deltaY || event.deltaX));
    const isWheelMouseUp = event.wheelDelta ? delta > 0 : delta < 0;
    const isWheelMouseDown = event.wheelDelta ? delta < 0 : delta > 0;
    if (isWheelMouseUp) {
      this.mouseWheelUp.emit(event);
    } else if (isWheelMouseDown) {
      this.mouseWheelDown.emit(event);
    }
    event.returnValue = false;
    if (event.preventDefault) {
      event.preventDefault();
    }
  }
  static ɵfac = function MouseWheelDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MouseWheelDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MouseWheelDirective,
    selectors: [["", "mouseWheel", ""]],
    hostBindings: function MouseWheelDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("mousewheel", function MouseWheelDirective_mousewheel_HostBindingHandler($event) {
          return ctx.onMouseWheelChrome($event);
        })("DOMMouseScroll", function MouseWheelDirective_DOMMouseScroll_HostBindingHandler($event) {
          return ctx.onMouseWheelFirefox($event);
        })("wheel", function MouseWheelDirective_wheel_HostBindingHandler($event) {
          return ctx.onWheel($event);
        })("onmousewheel", function MouseWheelDirective_onmousewheel_HostBindingHandler($event) {
          return ctx.onMouseWheelIE($event);
        });
      }
    },
    outputs: {
      mouseWheelUp: "mouseWheelUp",
      mouseWheelDown: "mouseWheelDown"
    },
    standalone: false
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MouseWheelDirective, [{
    type: Directive,
    args: [{
      selector: "[mouseWheel]",
      standalone: false
    }]
  }], null, {
    mouseWheelUp: [{
      type: Output
    }],
    mouseWheelDown: [{
      type: Output
    }],
    onMouseWheelChrome: [{
      type: HostListener,
      args: ["mousewheel", ["$event"]]
    }],
    onMouseWheelFirefox: [{
      type: HostListener,
      args: ["DOMMouseScroll", ["$event"]]
    }],
    onWheel: [{
      type: HostListener,
      args: ["wheel", ["$event"]]
    }],
    onMouseWheelIE: [{
      type: HostListener,
      args: ["onmousewheel", ["$event"]]
    }]
  });
})();
var NgxGraphStates;
(function(NgxGraphStates2) {
  NgxGraphStates2["Init"] = "init";
  NgxGraphStates2["Subscribe"] = "subscribe";
  NgxGraphStates2["Transform"] = "transform";
  NgxGraphStates2["Output"] = "output";
})(NgxGraphStates || (NgxGraphStates = {}));
var GraphComponent = class _GraphComponent {
  el;
  zone;
  cd;
  layoutService;
  nodes = [];
  clusters = [];
  compoundNodes = [];
  links = [];
  activeEntries = [];
  curve;
  draggingEnabled = true;
  nodeHeight;
  nodeMaxHeight;
  nodeMinHeight;
  nodeWidth;
  nodeMinWidth;
  nodeMaxWidth;
  panningEnabled = true;
  panningAxis = PanningAxis.Both;
  enableZoom = true;
  zoomSpeed = 0.1;
  minZoomLevel = 0.1;
  maxZoomLevel = 4;
  autoZoom = false;
  panOnZoom = true;
  animate = false;
  autoCenter = false;
  update$;
  center$;
  zoomToFit$;
  panToNode$;
  layout;
  layoutSettings;
  enableTrackpadSupport = false;
  showMiniMap = false;
  miniMapMaxWidth = 100;
  miniMapMaxHeight;
  miniMapPosition = MiniMapPosition.UpperRight;
  view;
  scheme = "cool";
  customColors;
  deferDisplayUntilPosition = false;
  centerNodesOnPositionChange = true;
  enablePreUpdateTransform = true;
  select = new EventEmitter();
  activate = new EventEmitter();
  deactivate = new EventEmitter();
  zoomChange = new EventEmitter();
  clickHandler = new EventEmitter();
  stateChange = new EventEmitter();
  linkTemplate;
  nodeTemplate;
  clusterTemplate;
  defsTemplate;
  miniMapNodeTemplate;
  nodeElements;
  linkElements;
  chartWidth;
  isMouseMoveCalled = false;
  graphSubscription = new Subscription();
  colors;
  dims;
  seriesDomain;
  transform;
  isPanning = false;
  isDragging = false;
  draggingNode;
  initialized = false;
  graph;
  graphDims = {
    width: 0,
    height: 0
  };
  _oldLinks = [];
  oldNodes = /* @__PURE__ */ new Set();
  oldClusters = /* @__PURE__ */ new Set();
  oldCompoundNodes = /* @__PURE__ */ new Set();
  transformationMatrix = identity2();
  _touchLastX = null;
  _touchLastY = null;
  minimapScaleCoefficient = 3;
  minimapTransform;
  minimapOffsetX = 0;
  minimapOffsetY = 0;
  isMinimapPanning = false;
  minimapClipPathId;
  width;
  height;
  resizeSubscription;
  visibilityObserver;
  destroy$ = new Subject();
  constructor(el, zone, cd, layoutService) {
    this.el = el;
    this.zone = zone;
    this.cd = cd;
    this.layoutService = layoutService;
  }
  groupResultsBy = (node) => node.label;
  /**
   * Get the current zoom level
   */
  get zoomLevel() {
    return this.transformationMatrix.a;
  }
  /**
   * Set the current zoom level
   */
  set zoomLevel(level) {
    this.zoomTo(Number(level));
  }
  /**
   * Get the current `x` position of the graph
   */
  get panOffsetX() {
    return this.transformationMatrix.e;
  }
  /**
   * Set the current `x` position of the graph
   */
  set panOffsetX(x3) {
    this.panTo(Number(x3), null);
  }
  /**
   * Get the current `y` position of the graph
   */
  get panOffsetY() {
    return this.transformationMatrix.f;
  }
  /**
   * Set the current `y` position of the graph
   */
  set panOffsetY(y3) {
    this.panTo(null, Number(y3));
  }
  /**
   * Angular lifecycle event
   *
   *
   * @memberOf GraphComponent
   */
  ngOnInit() {
    if (this.update$) {
      this.update$.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.update();
      });
    }
    if (this.center$) {
      this.center$.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.center();
      });
    }
    if (this.zoomToFit$) {
      this.zoomToFit$.pipe(takeUntil(this.destroy$)).subscribe((options) => {
        this.zoomToFit(options ? options : {});
      });
    }
    if (this.panToNode$) {
      this.panToNode$.pipe(takeUntil(this.destroy$)).subscribe((nodeId) => {
        this.panToNodeId(nodeId);
      });
    }
    this.minimapClipPathId = `minimapClip${id2()}`;
    this.stateChange.emit({
      state: NgxGraphStates.Subscribe
    });
  }
  ngOnChanges(changes) {
    this.basicUpdate();
    const {
      layoutSettings
    } = changes;
    this.setLayout(this.layout);
    if (layoutSettings) {
      this.setLayoutSettings(this.layoutSettings);
    }
    if (this.layout && this.nodes.length && this.links.length) {
      this.update();
    }
  }
  setLayout(layout2) {
    this.initialized = false;
    if (!layout2) {
      layout2 = "dagre";
    }
    if (typeof layout2 === "string") {
      this.layout = this.layoutService.getLayout(layout2);
      this.setLayoutSettings(this.layoutSettings);
    }
  }
  setLayoutSettings(settings) {
    if (this.layout && typeof this.layout !== "string") {
      this.layout.settings = settings;
    }
  }
  /**
   * Angular lifecycle event
   *
   *
   * @memberOf GraphComponent
   */
  ngOnDestroy() {
    this.unbindEvents();
    if (this.visibilityObserver) {
      this.visibilityObserver.visible.unsubscribe();
      this.visibilityObserver.destroy();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * Angular lifecycle event
   *
   *
   * @memberOf GraphComponent
   */
  ngAfterViewInit() {
    this.bindWindowResizeEvent();
    this.visibilityObserver = new VisibilityObserver(this.el, this.zone);
    this.visibilityObserver.visible.subscribe(this.update.bind(this));
    setTimeout(() => this.update());
  }
  /**
   * Base class update implementation for the dag graph
   *
   * @memberOf GraphComponent
   */
  update() {
    this.basicUpdate();
    if (!this.curve) {
      this.curve = bundle_default.beta(1);
    }
    this.zone.run(() => {
      this.dims = calculateViewDimensions({
        width: this.width,
        height: this.height
      });
      this.seriesDomain = this.getSeriesDomain();
      this.setColors();
      this.createGraph();
      this.updateTransform();
      if (!this.initialized) {
        this.stateChange.emit({
          state: NgxGraphStates.Init
        });
      }
      this.initialized = true;
    });
  }
  /**
   * Creates the dagre graph engine
   *
   * @memberOf GraphComponent
   */
  createGraph() {
    this.graphSubscription.unsubscribe();
    this.graphSubscription = new Subscription();
    const initializeNode = (n) => {
      if (!n.meta) {
        n.meta = {};
      }
      if (!n.id) {
        n.id = id2();
      }
      if (!n.dimension) {
        n.dimension = {
          width: this.nodeWidth ? this.nodeWidth : 30,
          height: this.nodeHeight ? this.nodeHeight : 30
        };
        n.meta.forceDimensions = false;
      } else {
        n.meta.forceDimensions = n.meta.forceDimensions === void 0 ? true : n.meta.forceDimensions;
      }
      if (!n.position) {
        n.position = {
          x: 0,
          y: 0
        };
        if (this.deferDisplayUntilPosition) {
          n.hidden = true;
        }
      }
      n.data = n.data ? n.data : {};
      return n;
    };
    const initializeEdge = (e) => {
      if (!e.id) {
        e.id = id2();
      }
      return e;
    };
    this.graph = {
      nodes: this.nodes.map((n) => initializeNode(n)),
      clusters: this.clusters.map((n) => initializeNode(n)),
      compoundNodes: this.compoundNodes.map((n) => initializeNode(n)),
      edges: this.links.map((e) => initializeEdge(e))
    };
    requestAnimationFrame(() => this.draw());
  }
  /**
   * Draws the graph using dagre layouts
   *
   *
   * @memberOf GraphComponent
   */
  draw() {
    const result = this.layout.run(this.graph);
    const result$ = result instanceof Observable ? result : of(result);
    this.graphSubscription.add(result$.subscribe((graph) => {
      this.graph = graph;
      this.tick();
    }));
  }
  tick() {
    const oldNodes = /* @__PURE__ */ new Set();
    const oldClusters = /* @__PURE__ */ new Set();
    const oldCompoundNodes = /* @__PURE__ */ new Set();
    this.graph.nodes.forEach((n) => {
      n.transform = `translate(${n.position.x - (this.centerNodesOnPositionChange ? n.dimension.width / 2 : 0) || 0}, ${n.position.y - (this.centerNodesOnPositionChange ? n.dimension.height / 2 : 0) || 0})`;
      if (!n.data) {
        n.data = {};
      }
      n.data.color = this.colors.getColor(this.groupResultsBy(n));
      if (this.deferDisplayUntilPosition) {
        n.hidden = false;
      }
      oldNodes.add(n.id);
    });
    (this.graph.clusters || []).forEach((n) => {
      n.transform = `translate(${n.position.x - (this.centerNodesOnPositionChange ? n.dimension.width / 2 : 0) || 0}, ${n.position.y - (this.centerNodesOnPositionChange ? n.dimension.height / 2 : 0) || 0})`;
      if (!n.data) {
        n.data = {};
      }
      n.data.color = this.colors.getColor(this.groupResultsBy(n));
      if (this.deferDisplayUntilPosition) {
        n.hidden = false;
      }
      oldClusters.add(n.id);
    });
    (this.graph.compoundNodes || []).forEach((n) => {
      n.transform = `translate(${n.position.x - (this.centerNodesOnPositionChange ? n.dimension.width / 2 : 0) || 0}, ${n.position.y - (this.centerNodesOnPositionChange ? n.dimension.height / 2 : 0) || 0})`;
      if (!n.data) {
        n.data = {};
      }
      n.data.color = this.colors.getColor(this.groupResultsBy(n));
      if (this.deferDisplayUntilPosition) {
        n.hidden = false;
      }
      oldCompoundNodes.add(n.id);
    });
    setTimeout(() => {
      this.oldNodes = oldNodes;
      this.oldClusters = oldClusters;
      this.oldCompoundNodes = oldCompoundNodes;
    }, 500);
    const newLinks = [];
    for (const edgeLabelId in this.graph.edgeLabels) {
      const edgeLabel = this.graph.edgeLabels[edgeLabelId];
      const normKey = edgeLabelId.replace(/[^\w-]*/g, "");
      const isMultigraph = this.layout && typeof this.layout !== "string" && this.layout.settings && this.layout.settings.multigraph;
      let oldLink = isMultigraph ? this._oldLinks.find((ol) => `${ol.source}${ol.target}${ol.id}` === normKey) : this._oldLinks.find((ol) => `${ol.source}${ol.target}` === normKey);
      const linkFromGraph = isMultigraph ? this.graph.edges.find((nl) => `${nl.source}${nl.target}${nl.id}` === normKey) : this.graph.edges.find((nl) => `${nl.source}${nl.target}` === normKey);
      if (!oldLink) {
        oldLink = linkFromGraph || edgeLabel;
      } else if (oldLink.data && linkFromGraph && linkFromGraph.data && JSON.stringify(oldLink.data) !== JSON.stringify(linkFromGraph.data)) {
        oldLink.data = linkFromGraph.data;
      }
      oldLink.oldLine = oldLink.line;
      const points = edgeLabel.points;
      const line = this.generateLine(points);
      const newLink = Object.assign({}, oldLink);
      newLink.line = line;
      newLink.points = points;
      this.updateMidpointOnEdge(newLink, points);
      const textPos = points[Math.floor(points.length / 2)];
      if (textPos) {
        newLink.textTransform = `translate(${textPos.x || 0},${textPos.y || 0})`;
      }
      newLink.textAngle = 0;
      if (!newLink.oldLine) {
        newLink.oldLine = newLink.line;
      }
      this.calcDominantBaseline(newLink);
      newLinks.push(newLink);
    }
    this.graph.edges = newLinks;
    if (this.graph.edges) {
      this._oldLinks = this.graph.edges.map((l) => {
        const newL = Object.assign({}, l);
        newL.oldLine = l.line;
        return newL;
      });
    }
    this.applyNodeDimensions();
    this.redrawLines();
    this.updateMinimap();
    requestAnimationFrame(() => {
      this.applyNodeDimensions();
      this.redrawLines();
      this.updateMinimap();
      if (this.autoZoom) {
        this.zoomToFit({
          autoCenter: this.autoCenter ? this.autoCenter : false
        });
      } else if (this.autoCenter) {
        this.center();
      }
      this.stateChange.emit({
        state: NgxGraphStates.Output
      });
    });
    this.cd.markForCheck();
  }
  getMinimapTransform() {
    switch (this.miniMapPosition) {
      case MiniMapPosition.UpperLeft: {
        return "";
      }
      case MiniMapPosition.UpperRight: {
        return "translate(" + (this.dims.width - this.graphDims.width / this.minimapScaleCoefficient) + ",0)";
      }
      default: {
        return "";
      }
    }
  }
  updateGraphDims() {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (let i = 0; i < this.graph.nodes.length; i++) {
      const node = this.graph.nodes[i];
      minX = node.position.x < minX ? node.position.x : minX;
      minY = node.position.y < minY ? node.position.y : minY;
      maxX = node.position.x + node.dimension.width > maxX ? node.position.x + node.dimension.width : maxX;
      maxY = node.position.y + node.dimension.height > maxY ? node.position.y + node.dimension.height : maxY;
    }
    minX -= 100;
    minY -= 100;
    maxX += 100;
    maxY += 100;
    this.graphDims.width = maxX - minX;
    this.graphDims.height = maxY - minY;
    this.minimapOffsetX = minX;
    this.minimapOffsetY = minY;
  }
  updateMinimap() {
    if (this.graph.nodes && this.graph.nodes.length) {
      this.updateGraphDims();
      if (this.miniMapMaxWidth) {
        this.minimapScaleCoefficient = this.graphDims.width / this.miniMapMaxWidth;
      }
      if (this.miniMapMaxHeight) {
        this.minimapScaleCoefficient = Math.max(this.minimapScaleCoefficient, this.graphDims.height / this.miniMapMaxHeight);
      }
      this.minimapTransform = this.getMinimapTransform();
    }
  }
  /**
   * Measures the node element and applies the dimensions
   *
   * @memberOf GraphComponent
   */
  applyNodeDimensions() {
    if (this.nodeElements && this.nodeElements.length) {
      this.nodeElements.forEach((elem) => {
        const nativeElement = elem.nativeElement;
        const node = this.graph.nodes.find((n) => n.id === nativeElement.id);
        if (!node) {
          return;
        }
        let dims;
        try {
          dims = nativeElement.getBBox();
          if (!dims.width || !dims.height) {
            return;
          }
        } catch (ex) {
          return;
        }
        if (this.nodeHeight) {
          node.dimension.height = node.dimension.height && node.meta.forceDimensions ? node.dimension.height : this.nodeHeight;
        } else {
          node.dimension.height = node.dimension.height && node.meta.forceDimensions ? node.dimension.height : dims.height;
        }
        if (this.nodeMaxHeight) {
          node.dimension.height = Math.max(node.dimension.height, this.nodeMaxHeight);
        }
        if (this.nodeMinHeight) {
          node.dimension.height = Math.min(node.dimension.height, this.nodeMinHeight);
        }
        if (this.nodeWidth) {
          node.dimension.width = node.dimension.width && node.meta.forceDimensions ? node.dimension.width : this.nodeWidth;
        } else {
          if (nativeElement.getElementsByTagName("text").length) {
            let maxTextDims;
            try {
              for (const textElem of nativeElement.getElementsByTagName("text")) {
                const currentBBox = textElem.getBBox();
                if (!maxTextDims) {
                  maxTextDims = currentBBox;
                } else {
                  if (currentBBox.width > maxTextDims.width) {
                    maxTextDims.width = currentBBox.width;
                  }
                  if (currentBBox.height > maxTextDims.height) {
                    maxTextDims.height = currentBBox.height;
                  }
                }
              }
            } catch (ex) {
              return;
            }
            node.dimension.width = node.dimension.width && node.meta.forceDimensions ? node.dimension.width : maxTextDims.width + 20;
          } else {
            node.dimension.width = node.dimension.width && node.meta.forceDimensions ? node.dimension.width : dims.width;
          }
        }
        if (this.nodeMaxWidth) {
          node.dimension.width = Math.max(node.dimension.width, this.nodeMaxWidth);
        }
        if (this.nodeMinWidth) {
          node.dimension.width = Math.min(node.dimension.width, this.nodeMinWidth);
        }
      });
    }
  }
  /**
   * Redraws the lines when dragged or viewport updated
   *
   * @memberOf GraphComponent
   */
  redrawLines(_animate = this.animate) {
    this.linkElements.forEach((linkEl) => {
      const edge = this.graph.edges.find((lin) => lin.id === linkEl.nativeElement.id);
      if (edge) {
        const linkSelection = select_default2(linkEl.nativeElement).select(".line");
        linkSelection.attr("d", edge.oldLine).transition().ease(sinInOut).duration(_animate ? 500 : 0).attr("d", edge.line);
        const textPathSelection = select_default2(this.el.nativeElement).select(`#${edge.id}`);
        textPathSelection.attr("d", edge.oldTextPath).transition().ease(sinInOut).duration(_animate ? 500 : 0).attr("d", edge.textPath);
        this.updateMidpointOnEdge(edge, edge.points);
      }
    });
  }
  /**
   * Calculate the text directions / flipping
   *
   * @memberOf GraphComponent
   */
  calcDominantBaseline(link) {
    const firstPoint = link.points[0];
    const lastPoint = link.points[link.points.length - 1];
    link.oldTextPath = link.textPath;
    if (lastPoint.x < firstPoint.x) {
      link.dominantBaseline = "text-before-edge";
      link.textPath = this.generateLine([...link.points].reverse());
    } else {
      link.dominantBaseline = "text-after-edge";
      link.textPath = link.line;
    }
  }
  /**
   * Generate the new line path
   *
   * @memberOf GraphComponent
   */
  generateLine(points) {
    const lineFunction = line_default().x((d) => d.x).y((d) => d.y).curve(this.curve);
    return lineFunction(points);
  }
  /**
   * Zoom was invoked from event
   *
   * @memberOf GraphComponent
   */
  onZoom($event, direction) {
    if (this.enableTrackpadSupport && !$event.ctrlKey) {
      this.pan($event.deltaX * -1, $event.deltaY * -1);
      return;
    }
    const zoomFactor = 1 + (direction === "in" ? this.zoomSpeed : -this.zoomSpeed);
    const newZoomLevel = this.zoomLevel * zoomFactor;
    if (newZoomLevel <= this.minZoomLevel || newZoomLevel >= this.maxZoomLevel) {
      return;
    }
    if (!this.enableZoom) {
      return;
    }
    if (this.panOnZoom === true && $event) {
      const mouseX = $event.clientX;
      const mouseY = $event.clientY;
      const svg = this.el.nativeElement.querySelector("svg");
      const svgGroup = svg.querySelector("g.chart");
      const point2 = svg.createSVGPoint();
      point2.x = mouseX;
      point2.y = mouseY;
      const svgPoint = point2.matrixTransform(svgGroup.getScreenCTM().inverse());
      this.pan(svgPoint.x, svgPoint.y, true);
      this.zoom(zoomFactor);
      this.pan(-svgPoint.x, -svgPoint.y, true);
    } else {
      this.zoom(zoomFactor);
    }
  }
  /**
   * Pan by x/y
   *
   * @param x
   * @param y
   */
  pan(x3, y3, ignoreZoomLevel = false) {
    const zoomLevel = ignoreZoomLevel ? 1 : this.zoomLevel;
    this.transformationMatrix = transform(this.transformationMatrix, translate(x3 / zoomLevel, y3 / zoomLevel));
    this.updateTransform();
  }
  /**
   * Pan to a fixed x/y
   *
   */
  panTo(x3, y3) {
    if (x3 === null || x3 === void 0 || isNaN(x3) || y3 === null || y3 === void 0 || isNaN(y3)) {
      return;
    }
    const panX = -this.panOffsetX - x3 * this.zoomLevel + this.dims.width / 2;
    const panY = -this.panOffsetY - y3 * this.zoomLevel + this.dims.height / 2;
    this.transformationMatrix = transform(this.transformationMatrix, translate(panX / this.zoomLevel, panY / this.zoomLevel));
    this.updateTransform();
  }
  /**
   * Zoom by a factor
   *
   */
  zoom(factor) {
    this.transformationMatrix = transform(this.transformationMatrix, scale(factor, factor));
    this.zoomChange.emit(this.zoomLevel);
    this.updateTransform();
  }
  /**
   * Zoom to a fixed level
   *
   */
  zoomTo(level) {
    this.transformationMatrix.a = isNaN(level) ? this.transformationMatrix.a : Number(level);
    this.transformationMatrix.d = isNaN(level) ? this.transformationMatrix.d : Number(level);
    this.zoomChange.emit(this.zoomLevel);
    if (this.enablePreUpdateTransform) {
      this.updateTransform();
    }
    this.update();
  }
  /**
   * Drag was invoked from an event
   *
   * @memberOf GraphComponent
   */
  onDrag(event) {
    if (!this.draggingEnabled) {
      return;
    }
    const node = this.draggingNode;
    if (this.layout && typeof this.layout !== "string" && this.layout.onDrag) {
      this.layout.onDrag(node, event);
    }
    node.position.x += event.movementX / this.zoomLevel;
    node.position.y += event.movementY / this.zoomLevel;
    const x3 = node.position.x - (this.centerNodesOnPositionChange ? node.dimension.width / 2 : 0);
    const y3 = node.position.y - (this.centerNodesOnPositionChange ? node.dimension.height / 2 : 0);
    node.transform = `translate(${x3}, ${y3})`;
    for (const link of this.graph.edges) {
      if (link.target === node.id || link.source === node.id || link.target.id === node.id || link.source.id === node.id) {
        if (this.layout && typeof this.layout !== "string") {
          const result = this.layout.updateEdge(this.graph, link);
          const result$ = result instanceof Observable ? result : of(result);
          this.graphSubscription.add(result$.subscribe((graph) => {
            this.graph = graph;
            this.redrawEdge(link);
          }));
        }
      }
    }
    this.redrawLines(false);
    this.updateMinimap();
  }
  redrawEdge(edge) {
    const line = this.generateLine(edge.points);
    this.calcDominantBaseline(edge);
    edge.oldLine = edge.line;
    edge.line = line;
  }
  /**
   * Update the entire view for the new pan position
   *
   *
   * @memberOf GraphComponent
   */
  updateTransform() {
    this.transform = toSVG(smoothMatrix(this.transformationMatrix, 100));
    this.stateChange.emit({
      state: NgxGraphStates.Transform
    });
  }
  /**
   * Node was clicked
   *
   *
   * @memberOf GraphComponent
   */
  onClick(event) {
    this.select.emit(event);
  }
  /**
   * Node was focused
   *
   *
   * @memberOf GraphComponent
   */
  onActivate(event) {
    if (this.activeEntries.indexOf(event) > -1) {
      return;
    }
    this.activeEntries = [event, ...this.activeEntries];
    this.activate.emit({
      value: event,
      entries: this.activeEntries
    });
  }
  /**
   * Node was defocused
   *
   * @memberOf GraphComponent
   */
  onDeactivate(event) {
    const idx = this.activeEntries.indexOf(event);
    this.activeEntries.splice(idx, 1);
    this.activeEntries = [...this.activeEntries];
    this.deactivate.emit({
      value: event,
      entries: this.activeEntries
    });
  }
  /**
   * Get the domain series for the nodes
   *
   * @memberOf GraphComponent
   */
  getSeriesDomain() {
    return this.nodes.map((d) => this.groupResultsBy(d)).reduce((nodes, node) => nodes.indexOf(node) !== -1 ? nodes : nodes.concat([node]), []).sort();
  }
  /**
   * Tracking for the link
   *
   *
   * @memberOf GraphComponent
   */
  trackLinkBy(index3, link) {
    return link.id;
  }
  /**
   * Tracking for the node
   *
   *
   * @memberOf GraphComponent
   */
  trackNodeBy(index3, node) {
    return node.id;
  }
  /**
   * Sets the colors the nodes
   *
   *
   * @memberOf GraphComponent
   */
  setColors() {
    this.colors = new ColorHelper(this.scheme, this.seriesDomain, this.customColors);
  }
  /**
   * On mouse move event, used for panning and dragging.
   *
   * @memberOf GraphComponent
   */
  onMouseMove($event) {
    this.isMouseMoveCalled = true;
    if ((this.isPanning || this.isMinimapPanning) && this.panningEnabled) {
      this.panWithConstraints(this.panningAxis, $event);
    } else if (this.isDragging && this.draggingEnabled) {
      this.onDrag($event);
    }
  }
  onMouseDown(event) {
    this.isMouseMoveCalled = false;
  }
  graphClick(event) {
    if (!this.isMouseMoveCalled) this.clickHandler.emit(event);
  }
  /**
   * On touch start event to enable panning.
   *
   * @memberOf GraphComponent
   */
  onTouchStart(event) {
    this._touchLastX = event.changedTouches[0].clientX;
    this._touchLastY = event.changedTouches[0].clientY;
    this.isPanning = true;
  }
  /**
   * On touch move event, used for panning.
   *
   */
  onTouchMove($event) {
    if (this.isPanning && this.panningEnabled) {
      const clientX = $event.changedTouches[0].clientX;
      const clientY = $event.changedTouches[0].clientY;
      const movementX = clientX - this._touchLastX;
      const movementY = clientY - this._touchLastY;
      this._touchLastX = clientX;
      this._touchLastY = clientY;
      this.pan(movementX, movementY);
    }
  }
  /**
   * On touch end event to disable panning.
   *
   * @memberOf GraphComponent
   */
  onTouchEnd() {
    this.isPanning = false;
  }
  /**
   * On mouse up event to disable panning/dragging.
   *
   * @memberOf GraphComponent
   */
  onMouseUp(event) {
    this.isDragging = false;
    this.isPanning = false;
    this.isMinimapPanning = false;
    if (this.layout && typeof this.layout !== "string" && this.layout.onDragEnd) {
      this.layout.onDragEnd(this.draggingNode, event);
    }
  }
  /**
   * On node mouse down to kick off dragging
   *
   * @memberOf GraphComponent
   */
  onNodeMouseDown(event, node) {
    if (!this.draggingEnabled) {
      return;
    }
    this.isDragging = true;
    this.draggingNode = node;
    if (this.layout && typeof this.layout !== "string" && this.layout.onDragStart) {
      this.layout.onDragStart(node, event);
    }
  }
  /**
   * On minimap drag mouse down to kick off minimap panning
   *
   * @memberOf GraphComponent
   */
  onMinimapDragMouseDown() {
    this.isMinimapPanning = true;
  }
  /**
   * On minimap pan event. Pans the graph to the clicked position
   *
   * @memberOf GraphComponent
   */
  onMinimapPanTo(event) {
    const x3 = event.offsetX - (this.dims.width - (this.graphDims.width + this.minimapOffsetX) / this.minimapScaleCoefficient);
    const y3 = event.offsetY + this.minimapOffsetY / this.minimapScaleCoefficient;
    this.panTo(x3 * this.minimapScaleCoefficient, y3 * this.minimapScaleCoefficient);
    this.isMinimapPanning = true;
  }
  /**
   * Center the graph in the viewport
   */
  center() {
    this.panTo(this.graphDims.width / 2, this.graphDims.height / 2);
  }
  /**
   * Zooms to fit the entire graph
   */
  zoomToFit(zoomOptions) {
    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height
    });
    this.updateGraphDims();
    const heightZoom = this.dims.height / this.graphDims.height;
    const widthZoom = this.dims.width / this.graphDims.width;
    let zoomLevel = Math.min(heightZoom, widthZoom, 1);
    if (zoomLevel < this.minZoomLevel) {
      zoomLevel = this.minZoomLevel;
    }
    if (zoomLevel > this.maxZoomLevel) {
      zoomLevel = this.maxZoomLevel;
    }
    if (zoomOptions?.force === true || zoomLevel !== this.zoomLevel) {
      this.zoomLevel = zoomLevel;
      if (zoomOptions?.autoCenter !== true) {
        this.updateTransform();
      }
      if (zoomOptions?.autoCenter === true) {
        this.center();
      }
      this.zoomChange.emit(this.zoomLevel);
    }
  }
  /**
   * Pans to the node
   * @param nodeId
   */
  panToNodeId(nodeId) {
    const node = this.graph.nodes.find((n) => n.id === nodeId);
    if (!node) {
      return;
    }
    this.panTo(node.position.x, node.position.y);
  }
  getCompoundNodeChildren(ids) {
    return this.nodes.filter((node) => ids.includes(node.id));
  }
  panWithConstraints(key, event) {
    let x3 = event.movementX;
    let y3 = event.movementY;
    if (this.isMinimapPanning) {
      x3 = -this.minimapScaleCoefficient * x3 * this.zoomLevel;
      y3 = -this.minimapScaleCoefficient * y3 * this.zoomLevel;
    }
    switch (key) {
      case PanningAxis.Horizontal:
        this.pan(x3, 0);
        break;
      case PanningAxis.Vertical:
        this.pan(0, y3);
        break;
      default:
        this.pan(x3, y3);
        break;
    }
  }
  updateMidpointOnEdge(edge, points) {
    if (!edge || !points) {
      return;
    }
    if (points.length % 2 === 1) {
      edge.midPoint = points[Math.floor(points.length / 2)];
    } else {
      if (this.layout?.settings?.properties?.["elk.direction"]) {
        this._calcMidPointElk(edge, points);
      } else {
        const _first = points[points.length / 2];
        const _second = points[points.length / 2 - 1];
        edge.midPoint = {
          x: (_first.x + _second.x) / 2,
          y: (_first.y + _second.y) / 2
        };
      }
    }
  }
  _calcMidPointElk(edge, points) {
    let _firstX = null;
    let _secondX = null;
    let _firstY = null;
    let _secondY = null;
    const orientation = this.layout.settings?.properties["elk.direction"];
    const hasBend = orientation === "RIGHT" ? points.some((p) => p.y !== points[0].y) : points.some((p) => p.x !== points[0].x);
    if (hasBend) {
      _firstX = points[points.length - 1];
      _secondX = points[points.length - 2];
      _firstY = points[points.length - 1];
      _secondY = points[points.length - 2];
    } else {
      if (orientation === "RIGHT") {
        _firstX = points[0];
        _secondX = points[points.length - 1];
        _firstY = points[points.length / 2];
        _secondY = points[points.length / 2 - 1];
      } else {
        _firstX = points[points.length / 2];
        _secondX = points[points.length / 2 - 1];
        _firstY = points[0];
        _secondY = points[points.length - 1];
      }
    }
    edge.midPoint = {
      x: (_firstX.x + _secondX.x) / 2,
      y: (_firstY.y + _secondY.y) / 2
    };
  }
  basicUpdate() {
    if (this.view) {
      this.width = this.view[0];
      this.height = this.view[1];
    } else {
      const dims = this.getContainerDims();
      if (dims) {
        this.width = dims.width;
        this.height = dims.height;
      }
    }
    if (!this.width) {
      this.width = 600;
    }
    if (!this.height) {
      this.height = 400;
    }
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    if (this.cd) {
      this.cd.markForCheck();
    }
  }
  getContainerDims() {
    let width;
    let height;
    const hostElem = this.el.nativeElement;
    if (hostElem.parentNode !== null) {
      const dims = hostElem.parentNode.getBoundingClientRect();
      width = dims.width;
      height = dims.height;
    }
    if (width && height) {
      return {
        width,
        height
      };
    }
    return null;
  }
  /**
   * Checks if the graph has dimensions
   */
  hasGraphDims() {
    return this.graphDims.width > 0 && this.graphDims.height > 0;
  }
  /**
   * Checks if all nodes have dimension
   */
  hasNodeDims() {
    return this.graph.nodes?.every((node) => node.dimension.width > 0 && node.dimension.height > 0);
  }
  /**
   * Checks if all compound nodes have dimension
   */
  hasCompoundNodeDims() {
    return this.graph.compoundNodes?.every((node) => node.dimension.width > 0 && node.dimension.height > 0);
  }
  /**
   * Checks if all clusters have dimension
   */
  hasClusterDims() {
    return this.graph.clusters?.every((node) => node.dimension.width > 0 && node.dimension.height > 0);
  }
  /**
   * Checks if the graph and all nodes have dimension.
   */
  hasDims() {
    return this.hasGraphDims() && this.hasNodeDims() && ((this.compoundNodes?.length ? this.hasCompoundNodeDims() : true) || (this.clusters?.length ? this.hasClusterDims() : true));
  }
  unbindEvents() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
  bindWindowResizeEvent() {
    const source = fromEvent(window, "resize");
    const subscription = source.pipe(debounceTime(200)).subscribe((e) => {
      this.update();
      if (this.cd) {
        this.cd.markForCheck();
      }
    });
    this.resizeSubscription = subscription;
  }
  static ɵfac = function GraphComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GraphComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(LayoutService));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _GraphComponent,
    selectors: [["ngx-graph"]],
    contentQueries: function GraphComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c0, 5);
        ɵɵcontentQuery(dirIndex, _c1, 5);
        ɵɵcontentQuery(dirIndex, _c2, 5);
        ɵɵcontentQuery(dirIndex, _c3, 5);
        ɵɵcontentQuery(dirIndex, _c4, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.linkTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.nodeTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.clusterTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.defsTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.miniMapNodeTemplate = _t.first);
      }
    },
    viewQuery: function GraphComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c5, 5);
        ɵɵviewQuery(_c6, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.nodeElements = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.linkElements = _t);
      }
    },
    hostBindings: function GraphComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("mousemove", function GraphComponent_mousemove_HostBindingHandler($event) {
          return ctx.onMouseMove($event);
        }, false, ɵɵresolveDocument)("mousedown", function GraphComponent_mousedown_HostBindingHandler($event) {
          return ctx.onMouseDown($event);
        }, false, ɵɵresolveDocument)("click", function GraphComponent_click_HostBindingHandler($event) {
          return ctx.graphClick($event);
        }, false, ɵɵresolveDocument)("touchmove", function GraphComponent_touchmove_HostBindingHandler($event) {
          return ctx.onTouchMove($event);
        }, false, ɵɵresolveDocument)("mouseup", function GraphComponent_mouseup_HostBindingHandler($event) {
          return ctx.onMouseUp($event);
        }, false, ɵɵresolveDocument);
      }
    },
    inputs: {
      nodes: "nodes",
      clusters: "clusters",
      compoundNodes: "compoundNodes",
      links: "links",
      activeEntries: "activeEntries",
      curve: "curve",
      draggingEnabled: "draggingEnabled",
      nodeHeight: "nodeHeight",
      nodeMaxHeight: "nodeMaxHeight",
      nodeMinHeight: "nodeMinHeight",
      nodeWidth: "nodeWidth",
      nodeMinWidth: "nodeMinWidth",
      nodeMaxWidth: "nodeMaxWidth",
      panningEnabled: "panningEnabled",
      panningAxis: "panningAxis",
      enableZoom: "enableZoom",
      zoomSpeed: "zoomSpeed",
      minZoomLevel: "minZoomLevel",
      maxZoomLevel: "maxZoomLevel",
      autoZoom: "autoZoom",
      panOnZoom: "panOnZoom",
      animate: "animate",
      autoCenter: "autoCenter",
      update$: "update$",
      center$: "center$",
      zoomToFit$: "zoomToFit$",
      panToNode$: "panToNode$",
      layout: "layout",
      layoutSettings: "layoutSettings",
      enableTrackpadSupport: "enableTrackpadSupport",
      showMiniMap: "showMiniMap",
      miniMapMaxWidth: "miniMapMaxWidth",
      miniMapMaxHeight: "miniMapMaxHeight",
      miniMapPosition: "miniMapPosition",
      view: "view",
      scheme: "scheme",
      customColors: "customColors",
      deferDisplayUntilPosition: "deferDisplayUntilPosition",
      centerNodesOnPositionChange: "centerNodesOnPositionChange",
      enablePreUpdateTransform: "enablePreUpdateTransform",
      groupResultsBy: "groupResultsBy",
      zoomLevel: "zoomLevel",
      panOffsetX: "panOffsetX",
      panOffsetY: "panOffsetY"
    },
    outputs: {
      select: "select",
      activate: "activate",
      deactivate: "deactivate",
      zoomChange: "zoomChange",
      clickHandler: "clickHandler",
      stateChange: "stateChange"
    },
    standalone: false,
    features: [ɵɵNgOnChangesFeature],
    ngContentSelectors: _c7,
    decls: 6,
    vars: 11,
    consts: [["nodeGroup", ""], ["clusterElement", ""], ["nodeElement", ""], ["linkElement", ""], ["mouseWheel", "", 1, "ngx-graph-outer", 3, "mouseWheelUp", "mouseWheelDown"], [1, "ngx-graph"], ["class", "graph chart", 3, "touchstart", "touchend", 4, "ngIf"], ["class", "minimap", 4, "ngIf"], [1, "graph", "chart", 3, "touchstart", "touchend"], [3, "ngTemplateOutlet", 4, "ngIf"], ["class", "text-path", 4, "ngFor", "ngForOf"], [1, "panning-rect", 3, "mousedown"], [1, "clusters"], ["class", "node-group", 3, "old-node", "id", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "compound-nodes"], ["class", "node-group", 3, "old-node", "id", "click", "mousedown", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "links"], ["class", "link-group", 3, "id", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "nodes"], [3, "ngTemplateOutlet"], [1, "text-path"], [1, "node-group", 3, "click", "id"], [3, "ngTemplateOutlet", "ngTemplateOutletContext", 4, "ngIf"], ["class", "node cluster", 4, "ngIf"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "node", "cluster"], ["alignment-baseline", "central"], [1, "node-group", 3, "click", "mousedown", "id"], ["class", "node compound-node", 4, "ngIf"], [1, "node", "compound-node"], [1, "link-group", 3, "id"], ["class", "edge", 4, "ngIf"], [1, "edge"], ["r", "10", 4, "ngIf"], ["r", "10"], [1, "minimap"], [1, "minimap-background", 3, "mousedown"], [1, "minimap-nodes"], ["class", "node-group", 3, "old-node", "id", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "minimap-drag", 3, "mousedown"], [1, "node-group", 3, "id"]],
    template: function GraphComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, "div", 4);
        ɵɵlistener("mouseWheelUp", function GraphComponent_Template_div_mouseWheelUp_0_listener($event) {
          return ctx.onZoom($event, "in");
        })("mouseWheelDown", function GraphComponent_Template_div_mouseWheelDown_0_listener($event) {
          return ctx.onZoom($event, "out");
        });
        ɵɵnamespaceSVG();
        ɵɵelementStart(1, "svg", 5);
        ɵɵtemplate(2, GraphComponent__svg_g_2_Template, 15, 14, "g", 6);
        ɵɵelementStart(3, "clipPath");
        ɵɵelement(4, "rect");
        ɵɵelementEnd();
        ɵɵtemplate(5, GraphComponent__svg_g_5_Template, 6, 15, "g", 7);
        ɵɵelementEnd()();
      }
      if (rf & 2) {
        ɵɵstyleProp("width", ctx.width, "px");
        ɵɵproperty("@animationState", "active")("@.disabled", !ctx.animate);
        ɵɵadvance();
        ɵɵattribute("width", ctx.width)("height", ctx.height);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.initialized && ctx.graph);
        ɵɵadvance();
        ɵɵattribute("id", ctx.minimapClipPathId);
        ɵɵadvance();
        ɵɵattribute("width", ctx.graphDims.width / ctx.minimapScaleCoefficient)("height", ctx.graphDims.height / ctx.minimapScaleCoefficient);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.showMiniMap);
      }
    },
    dependencies: [NgForOf, NgIf, NgTemplateOutlet, MouseWheelDirective],
    styles: [".minimap .minimap-background{fill:#0000001a}.minimap .minimap-drag{fill:#0003;stroke:#fff;stroke-width:1px;stroke-dasharray:2px;stroke-dashoffset:2px;cursor:pointer}.minimap .minimap-drag.panning{fill:#0000004d}.minimap .minimap-nodes{opacity:.5;pointer-events:none}.graph{-webkit-user-select:none;user-select:none}.graph .edge{stroke:#666;fill:none}.graph .edge .edge-label{stroke:none;font-size:12px;fill:#251e1e}.graph .panning-rect{fill:#0000;cursor:move}.graph .node-group.old-node{transition:transform .5s ease-in-out}.graph .node-group .node:focus{outline:none}.graph .compound-node rect{opacity:.5}.graph .cluster rect{opacity:.2}\n"],
    encapsulation: 2,
    data: {
      animation: [trigger("animationState", [transition(":enter", [style({
        opacity: 0
      }), animate("500ms 100ms", style({
        opacity: 1
      }))])])]
    },
    changeDetection: 0
  });
};
__decorate([throttleable(500)], GraphComponent.prototype, "updateMinimap", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GraphComponent, [{
    type: Component,
    args: [{
      selector: "ngx-graph",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      animations: [trigger("animationState", [transition(":enter", [style({
        opacity: 0
      }), animate("500ms 100ms", style({
        opacity: 1
      }))])])],
      standalone: false,
      template: `<div
  class="ngx-graph-outer"
  [style.width.px]="width"
  [@animationState]="'active'"
  [@.disabled]="!animate"
  (mouseWheelUp)="onZoom($event, 'in')"
  (mouseWheelDown)="onZoom($event, 'out')"
  mouseWheel
>
  <svg:svg class="ngx-graph" [attr.width]="width" [attr.height]="height">
    <svg:g
      *ngIf="initialized && graph"
      [attr.transform]="transform"
      (touchstart)="onTouchStart($event)"
      (touchend)="onTouchEnd()"
      class="graph chart"
    >
      <defs>
        <ng-container *ngIf="defsTemplate" [ngTemplateOutlet]="defsTemplate"></ng-container>
        <svg:path
          class="text-path"
          *ngFor="let link of graph.edges"
          [attr.d]="link.textPath"
          [attr.id]="link.id"
        ></svg:path>
      </defs>

      <svg:rect
        class="panning-rect"
        [attr.width]="dims.width * 100"
        [attr.height]="dims.height * 100"
        [attr.transform]="'translate(' + (-dims.width || 0) * 50 + ',' + (-dims.height || 0) * 50 + ')'"
        (mousedown)="isPanning = true"
      />

      <ng-content></ng-content>

      <svg:g class="clusters">
        <svg:g
          #clusterElement
          *ngFor="let node of graph.clusters; trackBy: trackNodeBy"
          class="node-group"
          [class.old-node]="animate && oldClusters.has(node.id)"
          [id]="node.id"
          [attr.transform]="node.transform"
          (click)="onClick(node)"
        >
          <ng-container
            *ngIf="clusterTemplate && !node.hidden"
            [ngTemplateOutlet]="clusterTemplate"
            [ngTemplateOutletContext]="{ $implicit: node }"
          ></ng-container>
          <svg:g *ngIf="!clusterTemplate" class="node cluster">
            <svg:rect
              [attr.width]="node.dimension.width"
              [attr.height]="node.dimension.height"
              [attr.fill]="node.data?.color"
            />
            <svg:text alignment-baseline="central" [attr.x]="10" [attr.y]="node.dimension.height / 2">
              {{ node.label }}
            </svg:text>
          </svg:g>
        </svg:g>
      </svg:g>

      <svg:g class="compound-nodes">
        <svg:g
          #nodeElement
          *ngFor="let node of graph.compoundNodes; trackBy: trackNodeBy"
          class="node-group"
          [class.old-node]="animate && oldCompoundNodes.has(node.id)"
          [id]="node.id"
          [attr.transform]="node.transform"
          (click)="onClick(node)"
          (mousedown)="onNodeMouseDown($event, node)"
        >
          <ng-container
            *ngIf="nodeTemplate && !node.hidden"
            [ngTemplateOutlet]="nodeTemplate"
            [ngTemplateOutletContext]="{ $implicit: node }"
          ></ng-container>
          <svg:g *ngIf="!nodeTemplate" class="node compound-node">
            <svg:rect
              [attr.width]="node.dimension.width"
              [attr.height]="node.dimension.height"
              [attr.fill]="node.data?.color"
            />
            <svg:text alignment-baseline="central" [attr.x]="10" [attr.y]="node.dimension.height / 2">
              {{ node.label }}
            </svg:text>
          </svg:g>
        </svg:g>
      </svg:g>

      <svg:g class="links">
        <svg:g #linkElement *ngFor="let link of graph.edges; trackBy: trackLinkBy" class="link-group" [id]="link.id">
          <ng-container
            *ngIf="linkTemplate"
            [ngTemplateOutlet]="linkTemplate"
            [ngTemplateOutletContext]="{ $implicit: link }"
          ></ng-container>
          <svg:path *ngIf="!linkTemplate" class="edge" [attr.d]="link.line" />
        </svg:g>
      </svg:g>

      <svg:g class="nodes" #nodeGroup>
        <svg:g
          #nodeElement
          *ngFor="let node of graph.nodes; trackBy: trackNodeBy"
          class="node-group"
          [class.old-node]="animate && oldNodes.has(node.id)"
          [id]="node.id"
          [attr.transform]="node.transform"
          (click)="onClick(node)"
          (mousedown)="onNodeMouseDown($event, node)"
        >
          <ng-container
            *ngIf="nodeTemplate && !node.hidden"
            [ngTemplateOutlet]="nodeTemplate"
            [ngTemplateOutletContext]="{ $implicit: node }"
          ></ng-container>
          <svg:circle
            *ngIf="!nodeTemplate"
            r="10"
            [attr.cx]="node.dimension.width / 2"
            [attr.cy]="node.dimension.height / 2"
            [attr.fill]="node.data?.color"
          />
        </svg:g>
      </svg:g>
    </svg:g>

    <svg:clipPath [attr.id]="minimapClipPathId">
      <svg:rect
        [attr.width]="graphDims.width / minimapScaleCoefficient"
        [attr.height]="graphDims.height / minimapScaleCoefficient"
      ></svg:rect>
    </svg:clipPath>

    <svg:g
      class="minimap"
      *ngIf="showMiniMap"
      [attr.transform]="minimapTransform"
      [attr.clip-path]="'url(#' + minimapClipPathId + ')'"
    >
      <svg:rect
        class="minimap-background"
        [attr.width]="graphDims.width / minimapScaleCoefficient"
        [attr.height]="graphDims.height / minimapScaleCoefficient"
        (mousedown)="onMinimapPanTo($event)"
      ></svg:rect>

      <svg:g
        [style.transform]="
          'translate(' +
          -minimapOffsetX / minimapScaleCoefficient +
          'px,' +
          -minimapOffsetY / minimapScaleCoefficient +
          'px)'
        "
      >
        <svg:g class="minimap-nodes" [style.transform]="'scale(' + 1 / minimapScaleCoefficient + ')'">
          <svg:g
            #nodeElement
            *ngFor="let node of graph.nodes; trackBy: trackNodeBy"
            class="node-group"
            [class.old-node]="animate && oldNodes.has(node.id)"
            [id]="node.id"
            [attr.transform]="node.transform"
          >
            <ng-container
              *ngIf="miniMapNodeTemplate"
              [ngTemplateOutlet]="miniMapNodeTemplate"
              [ngTemplateOutletContext]="{ $implicit: node }"
            ></ng-container>
            <ng-container
              *ngIf="!miniMapNodeTemplate && nodeTemplate"
              [ngTemplateOutlet]="nodeTemplate"
              [ngTemplateOutletContext]="{ $implicit: node }"
            ></ng-container>
            <svg:circle
              *ngIf="!nodeTemplate && !miniMapNodeTemplate"
              r="10"
              [attr.cx]="node.dimension.width / 2 / minimapScaleCoefficient"
              [attr.cy]="node.dimension.height / 2 / minimapScaleCoefficient"
              [attr.fill]="node.data?.color"
            />
          </svg:g>
        </svg:g>

        <svg:rect
          [attr.transform]="
            'translate(' +
            panOffsetX / zoomLevel / -minimapScaleCoefficient +
            ',' +
            panOffsetY / zoomLevel / -minimapScaleCoefficient +
            ')'
          "
          class="minimap-drag"
          [class.panning]="isMinimapPanning"
          [attr.width]="width / minimapScaleCoefficient / zoomLevel"
          [attr.height]="height / minimapScaleCoefficient / zoomLevel"
          (mousedown)="onMinimapDragMouseDown()"
        ></svg:rect>
      </svg:g>
    </svg:g>
  </svg:svg>
</div>
`,
      styles: [".minimap .minimap-background{fill:#0000001a}.minimap .minimap-drag{fill:#0003;stroke:#fff;stroke-width:1px;stroke-dasharray:2px;stroke-dashoffset:2px;cursor:pointer}.minimap .minimap-drag.panning{fill:#0000004d}.minimap .minimap-nodes{opacity:.5;pointer-events:none}.graph{-webkit-user-select:none;user-select:none}.graph .edge{stroke:#666;fill:none}.graph .edge .edge-label{stroke:none;font-size:12px;fill:#251e1e}.graph .panning-rect{fill:#0000;cursor:move}.graph .node-group.old-node{transition:transform .5s ease-in-out}.graph .node-group .node:focus{outline:none}.graph .compound-node rect{opacity:.5}.graph .cluster rect{opacity:.2}\n"]
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: NgZone
  }, {
    type: ChangeDetectorRef
  }, {
    type: LayoutService
  }], {
    nodes: [{
      type: Input
    }],
    clusters: [{
      type: Input
    }],
    compoundNodes: [{
      type: Input
    }],
    links: [{
      type: Input
    }],
    activeEntries: [{
      type: Input
    }],
    curve: [{
      type: Input
    }],
    draggingEnabled: [{
      type: Input
    }],
    nodeHeight: [{
      type: Input
    }],
    nodeMaxHeight: [{
      type: Input
    }],
    nodeMinHeight: [{
      type: Input
    }],
    nodeWidth: [{
      type: Input
    }],
    nodeMinWidth: [{
      type: Input
    }],
    nodeMaxWidth: [{
      type: Input
    }],
    panningEnabled: [{
      type: Input
    }],
    panningAxis: [{
      type: Input
    }],
    enableZoom: [{
      type: Input
    }],
    zoomSpeed: [{
      type: Input
    }],
    minZoomLevel: [{
      type: Input
    }],
    maxZoomLevel: [{
      type: Input
    }],
    autoZoom: [{
      type: Input
    }],
    panOnZoom: [{
      type: Input
    }],
    animate: [{
      type: Input
    }],
    autoCenter: [{
      type: Input
    }],
    update$: [{
      type: Input
    }],
    center$: [{
      type: Input
    }],
    zoomToFit$: [{
      type: Input
    }],
    panToNode$: [{
      type: Input
    }],
    layout: [{
      type: Input
    }],
    layoutSettings: [{
      type: Input
    }],
    enableTrackpadSupport: [{
      type: Input
    }],
    showMiniMap: [{
      type: Input
    }],
    miniMapMaxWidth: [{
      type: Input
    }],
    miniMapMaxHeight: [{
      type: Input
    }],
    miniMapPosition: [{
      type: Input
    }],
    view: [{
      type: Input
    }],
    scheme: [{
      type: Input
    }],
    customColors: [{
      type: Input
    }],
    deferDisplayUntilPosition: [{
      type: Input
    }],
    centerNodesOnPositionChange: [{
      type: Input
    }],
    enablePreUpdateTransform: [{
      type: Input
    }],
    select: [{
      type: Output
    }],
    activate: [{
      type: Output
    }],
    deactivate: [{
      type: Output
    }],
    zoomChange: [{
      type: Output
    }],
    clickHandler: [{
      type: Output
    }],
    stateChange: [{
      type: Output
    }],
    linkTemplate: [{
      type: ContentChild,
      args: ["linkTemplate"]
    }],
    nodeTemplate: [{
      type: ContentChild,
      args: ["nodeTemplate"]
    }],
    clusterTemplate: [{
      type: ContentChild,
      args: ["clusterTemplate"]
    }],
    defsTemplate: [{
      type: ContentChild,
      args: ["defsTemplate"]
    }],
    miniMapNodeTemplate: [{
      type: ContentChild,
      args: ["miniMapNodeTemplate"]
    }],
    nodeElements: [{
      type: ViewChildren,
      args: ["nodeElement"]
    }],
    linkElements: [{
      type: ViewChildren,
      args: ["linkElement"]
    }],
    groupResultsBy: [{
      type: Input
    }],
    zoomLevel: [{
      type: Input,
      args: ["zoomLevel"]
    }],
    panOffsetX: [{
      type: Input,
      args: ["panOffsetX"]
    }],
    panOffsetY: [{
      type: Input,
      args: ["panOffsetY"]
    }],
    updateMinimap: [],
    onMouseMove: [{
      type: HostListener,
      args: ["document:mousemove", ["$event"]]
    }],
    onMouseDown: [{
      type: HostListener,
      args: ["document:mousedown", ["$event"]]
    }],
    graphClick: [{
      type: HostListener,
      args: ["document:click", ["$event"]]
    }],
    onTouchMove: [{
      type: HostListener,
      args: ["document:touchmove", ["$event"]]
    }],
    onMouseUp: [{
      type: HostListener,
      args: ["document:mouseup", ["$event"]]
    }]
  });
})();
var GraphModule = class _GraphModule {
  static ɵfac = function GraphModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GraphModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _GraphModule,
    declarations: [GraphComponent, MouseWheelDirective, VisibilityObserver],
    imports: [CommonModule],
    exports: [GraphComponent, MouseWheelDirective]
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [LayoutService],
    imports: [CommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GraphModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [GraphComponent, MouseWheelDirective, VisibilityObserver],
      exports: [GraphComponent, MouseWheelDirective],
      providers: [LayoutService]
    }]
  }], null, null);
})();
var NgxGraphModule = class _NgxGraphModule {
  static ɵfac = function NgxGraphModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgxGraphModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _NgxGraphModule,
    imports: [CommonModule],
    exports: [GraphModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, GraphModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxGraphModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      exports: [GraphModule]
    }]
  }], null, null);
})();
export {
  Alignment,
  ColaForceDirectedLayout,
  D3ForceDirectedLayout,
  DagreClusterLayout,
  DagreLayout,
  DagreNodesOnlyLayout,
  GraphComponent,
  GraphModule,
  LayoutService,
  MiniMapPosition,
  MouseWheelDirective,
  NgxGraphModule,
  NgxGraphStates,
  Orientation,
  PanningAxis,
  toD3Node,
  toNode
};
/*! Bundled license information:

@angular/animations/fesm2022/animations.mjs:
  (**
   * @license Angular v19.2.18
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=@swimlane_ngx-graph.js.map
