// MarionetteJS (Backbone.Marionette)
// ----------------------------------
// v2.4.2
//
// Copyright (c)2015 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
//
// http://marionettejs.com


/*!
 * Includes BabySitter
 * https://github.com/marionettejs/backbone.babysitter/
 *
 * Includes Wreqr
 * https://github.com/marionettejs/backbone.wreqr/
 */


(function(t, e) {
    if ("function" == typeof define && define.amd) define(["backbone", "underscore"], function(i, n) { return t.Marionette = t.Mn = e(t, i, n) });
    else if ("undefined" != typeof exports) {
        var i = require("backbone"),
            n = require("underscore");
        module.exports = e(t, i, n)
    } else t.Marionette = t.Mn = e(t, t.Backbone, t._)
})(this, function(t, e, i) {
    "use strict";
    (function(t, e) {
        var i = t.ChildViewContainer;
        return t.ChildViewContainer = function(t, e) {
            var i = function(t) { this._views = {}, this._indexByModel = {}, this._indexByCustom = {}, this._updateLength(), e.each(t, this.add, this) };
            e.extend(i.prototype, { add: function(t, e) { var i = t.cid; return this._views[i] = t, t.model && (this._indexByModel[t.model.cid] = i), e && (this._indexByCustom[e] = i), this._updateLength(), this }, findByModel: function(t) { return this.findByModelCid(t.cid) }, findByModelCid: function(t) { var e = this._indexByModel[t]; return this.findByCid(e) }, findByCustom: function(t) { var e = this._indexByCustom[t]; return this.findByCid(e) }, findByIndex: function(t) { return e.values(this._views)[t] }, findByCid: function(t) { return this._views[t] }, remove: function(t) { var i = t.cid; return t.model && delete this._indexByModel[t.model.cid], e.any(this._indexByCustom, function(t, e) { return t === i ? (delete this._indexByCustom[e], !0) : void 0 }, this), delete this._views[i], this._updateLength(), this }, call: function(t) { this.apply(t, e.tail(arguments)) }, apply: function(t, i) { e.each(this._views, function(n) { e.isFunction(n[t]) && n[t].apply(n, i || []) }) }, _updateLength: function() { this.length = e.size(this._views) } });
            var n = ["forEach", "each", "map", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "toArray", "first", "initial", "rest", "last", "without", "isEmpty", "pluck", "reduce"];
            return e.each(n, function(t) {
                i.prototype[t] = function() {
                    var i = e.values(this._views),
                        n = [i].concat(e.toArray(arguments));
                    return e[t].apply(e, n)
                }
            }), i
        }(t, e), t.ChildViewContainer.VERSION = "0.1.7", t.ChildViewContainer.noConflict = function() { return t.ChildViewContainer = i, this }, t.ChildViewContainer
    })(e, i),
    function(t, e) {
        var i = t.Wreqr,
            n = t.Wreqr = {};
        return t.Wreqr.VERSION = "1.3.3", t.Wreqr.noConflict = function() { return t.Wreqr = i, this }, n.Handlers = function(t, e) {
            var i = function(t) { this.options = t, this._wreqrHandlers = {}, e.isFunction(this.initialize) && this.initialize(t) };
            return i.extend = t.Model.extend, e.extend(i.prototype, t.Events, {
                setHandlers: function(t) {
                    e.each(t, function(t, i) {
                        var n = null;
                        e.isObject(t) && !e.isFunction(t) && (n = t.context, t = t.callback), this.setHandler(i, t, n)
                    }, this)
                },
                setHandler: function(t, e, i) {
                    var n = { callback: e, context: i };
                    this._wreqrHandlers[t] = n, this.trigger("handler:add", t, e, i)
                },
                hasHandler: function(t) { return !!this._wreqrHandlers[t] },
                getHandler: function(t) { var e = this._wreqrHandlers[t]; if (e) return function() { return e.callback.apply(e.context, arguments) } },
                removeHandler: function(t) { delete this._wreqrHandlers[t] },
                removeAllHandlers: function() { this._wreqrHandlers = {} }
            }), i
        }(t, e), n.CommandStorage = function() {
            var i = function(t) { this.options = t, this._commands = {}, e.isFunction(this.initialize) && this.initialize(t) };
            return e.extend(i.prototype, t.Events, {
                getCommands: function(t) { var e = this._commands[t]; return e || (e = { command: t, instances: [] }, this._commands[t] = e), e },
                addCommand: function(t, e) {
                    var i = this.getCommands(t);
                    i.instances.push(e)
                },
                clearCommands: function(t) {
                    var e = this.getCommands(t);
                    e.instances = []
                }
            }), i
        }(), n.Commands = function(t, e) {
            return t.Handlers.extend({
                storageType: t.CommandStorage,
                constructor: function(e) { this.options = e || {}, this._initializeStorage(this.options), this.on("handler:add", this._executeCommands, this), t.Handlers.prototype.constructor.apply(this, arguments) },
                execute: function(t) {
                    t = arguments[0];
                    var i = e.rest(arguments);
                    this.hasHandler(t) ? this.getHandler(t).apply(this, i) : this.storage.addCommand(t, i)
                },
                _executeCommands: function(t, i, n) {
                    var r = this.storage.getCommands(t);
                    e.each(r.instances, function(t) { i.apply(n, t) }), this.storage.clearCommands(t)
                },
                _initializeStorage: function(t) {
                    var i, n = t.storageType || this.storageType;
                    i = e.isFunction(n) ? new n : n, this.storage = i
                }
            })
        }(n, e), n.RequestResponse = function(t, e) { return t.Handlers.extend({ request: function(t) { return this.hasHandler(t) ? this.getHandler(t).apply(this, e.rest(arguments)) : void 0 } }) }(n, e), n.EventAggregator = function(t, e) { var i = function() {}; return i.extend = t.Model.extend, e.extend(i.prototype, t.Events), i }(t, e), n.Channel = function() {
            var i = function(e) { this.vent = new t.Wreqr.EventAggregator, this.reqres = new t.Wreqr.RequestResponse, this.commands = new t.Wreqr.Commands, this.channelName = e };
            return e.extend(i.prototype, {
                reset: function() { return this.vent.off(), this.vent.stopListening(), this.reqres.removeAllHandlers(), this.commands.removeAllHandlers(), this },
                connectEvents: function(t, e) { return this._connect("vent", t, e), this },
                connectCommands: function(t, e) { return this._connect("commands", t, e), this },
                connectRequests: function(t, e) { return this._connect("reqres", t, e), this },
                _connect: function(t, i, n) {
                    if (i) {
                        n = n || this;
                        var r = "vent" === t ? "on" : "setHandler";
                        e.each(i, function(i, s) { this[t][r](s, e.bind(i, n)) }, this)
                    }
                }
            }), i
        }(n), n.radio = function(t, e) {
            var i = function() { this._channels = {}, this.vent = {}, this.commands = {}, this.reqres = {}, this._proxyMethods() };
            e.extend(i.prototype, { channel: function(t) { if (!t) throw Error("Channel must receive a name"); return this._getChannel(t) }, _getChannel: function(e) { var i = this._channels[e]; return i || (i = new t.Channel(e), this._channels[e] = i), i }, _proxyMethods: function() { e.each(["vent", "commands", "reqres"], function(t) { e.each(n[t], function(e) { this[t][e] = r(this, t, e) }, this) }, this) } });
            var n = { vent: ["on", "off", "trigger", "once", "stopListening", "listenTo", "listenToOnce"], commands: ["execute", "setHandler", "setHandlers", "removeHandler", "removeAllHandlers"], reqres: ["request", "setHandler", "setHandlers", "removeHandler", "removeAllHandlers"] },
                r = function(t, i, n) { return function(r) { var s = t._getChannel(r)[i]; return s[n].apply(s, e.rest(arguments)) } };
            return new i
        }(n, e), t.Wreqr
    }(e, i);
    var n = t.Marionette,
        r = t.Mn,
        s = e.Marionette = {};
    s.VERSION = "2.4.2", s.noConflict = function() { return t.Marionette = n, t.Mn = r, this }, e.Marionette = s, s.Deferred = e.$.Deferred, s.extend = e.Model.extend, s.isNodeAttached = function(t) { return e.$.contains(document.documentElement, t) }, s.mergeOptions = function(t, e) { t && i.extend(this, i.pick(t, e)) }, s.getOption = function(t, e) { return t && e ? t.options && void 0 !== t.options[e] ? t.options[e] : t[e] : void 0 }, s.proxyGetOption = function(t) { return s.getOption(this, t) }, s._getValue = function(t, e, n) { return i.isFunction(t) && (t = n ? t.apply(e, n) : t.call(e)), t }, s.normalizeMethods = function(t) { return i.reduce(t, function(t, e, n) { return i.isFunction(e) || (e = this[e]), e && (t[n] = e), t }, {}, this) }, s.normalizeUIString = function(t, e) { return t.replace(/@ui\.[a-zA-Z_$0-9]*/g, function(t) { return e[t.slice(4)] }) }, s.normalizeUIKeys = function(t, e) { return i.reduce(t, function(t, i, n) { var r = s.normalizeUIString(n, e); return t[r] = i, t }, {}) }, s.normalizeUIValues = function(t, e, n) {
        return i.each(t, function(r, o) {
            i.isString(r) ? t[o] = s.normalizeUIString(r, e) : i.isObject(r) && i.isArray(n) && (i.extend(r, s.normalizeUIValues(i.pick(r, n), e)), i.each(n, function(t) {
                var n = r[t];
                i.isString(n) && (r[t] = s.normalizeUIString(n, e))
            }))
        }), t
    }, s.actAsCollection = function(t, e) {
        var n = ["forEach", "each", "map", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "toArray", "first", "initial", "rest", "last", "without", "isEmpty", "pluck"];
        i.each(n, function(n) {
            t[n] = function() {
                var t = i.values(i.result(this, e)),
                    r = [t].concat(i.toArray(arguments));
                return i[n].apply(i, r)
            }
        })
    };
    var o = s.deprecate = function(t, e) { i.isObject(t) && (t = t.prev + " is going to be removed in the future. " + "Please use " + t.next + " instead." + (t.url ? " See: " + t.url : "")), void 0 !== e && e || o._cache[t] || (o._warn("Deprecation warning: " + t), o._cache[t] = !0) };
    o._warn = "undefined" != typeof console && (console.warn || console.log) || function() {}, o._cache = {}, s._triggerMethod = function() {
            function t(t, e, i) { return i.toUpperCase() }
            var e = /(^|:)(\w)/gi;
            return function(n, r, s) {
                var o = 3 > arguments.length;
                o && (s = r, r = s[0]);
                var h, a = "on" + r.replace(e, t),
                    d = n[a];
                return i.isFunction(d) && (h = d.apply(n, o ? i.rest(s) : s)), i.isFunction(n.trigger) && (o + s.length > 1 ? n.trigger.apply(n, o ? s : [r].concat(i.drop(s, 0))) : n.trigger(r)), h
            }
        }(), s.triggerMethod = function() { return s._triggerMethod(this, arguments) }, s.triggerMethodOn = function(t) { var e = i.isFunction(t.triggerMethod) ? t.triggerMethod : s.triggerMethod; return e.apply(t, i.rest(arguments)) }, s.MonitorDOMRefresh = function(t) {
            function e() { t._isShown = !0, r() }

            function n() { t._isRendered = !0, r() }

            function r() { t._isShown && t._isRendered && s.isNodeAttached(t.el) && i.isFunction(t.triggerMethod) && t.triggerMethod("dom:refresh") }
            t.on({ show: e, render: n })
        },
        function(t) {
            function e(e, n, r, s) {
                var o = s.split(/\s+/);
                i.each(o, function(i) {
                    var s = e[i];
                    if (!s) throw new t.Error('Method "' + i + '" was configured as an event handler, but does not exist.');
                    e.listenTo(n, r, s)
                })
            }

            function n(t, e, i, n) { t.listenTo(e, i, n) }

            function r(t, e, n, r) {
                var s = r.split(/\s+/);
                i.each(s, function(i) {
                    var r = t[i];
                    t.stopListening(e, n, r)
                })
            }

            function s(t, e, i, n) { t.stopListening(e, i, n) }

            function o(e, n, r, s, o) {
                if (n && r) {
                    if (!i.isObject(r)) throw new t.Error({ message: "Bindings must be an object or function.", url: "marionette.functions.html#marionettebindentityevents" });
                    r = t._getValue(r, e), i.each(r, function(t, r) { i.isFunction(t) ? s(e, n, r, t) : o(e, n, r, t) })
                }
            }
            t.bindEntityEvents = function(t, i, r) { o(t, i, r, n, e) }, t.unbindEntityEvents = function(t, e, i) { o(t, e, i, s, r) }, t.proxyBindEntityEvents = function(e, i) { return t.bindEntityEvents(this, e, i) }, t.proxyUnbindEntityEvents = function(e, i) { return t.unbindEntityEvents(this, e, i) }
        }(s);
    var h = ["description", "fileName", "lineNumber", "name", "message", "number"];
    return s.Error = s.extend.call(Error, {
        urlRoot: "http://marionettejs.com/docs/v" + s.VERSION + "/",
        constructor: function(t, e) {
            i.isObject(t) ? (e = t, t = e.message) : e || (e = {});
            var n = Error.call(this, t);
            i.extend(this, i.pick(n, h), i.pick(e, h)), this.captureStackTrace(), e.url && (this.url = this.urlRoot + e.url)
        },
        captureStackTrace: function() { Error.captureStackTrace && Error.captureStackTrace(this, s.Error) },
        toString: function() { return this.name + ": " + this.message + (this.url ? " See: " + this.url : "") }
    }), s.Error.extend = s.extend, s.Callbacks = function() { this._deferred = s.Deferred(), this._callbacks = [] }, i.extend(s.Callbacks.prototype, {
        add: function(t, e) {
            var n = i.result(this._deferred, "promise");
            this._callbacks.push({ cb: t, ctx: e }), n.then(function(i) { e && (i.context = e), t.call(i.context, i.options) })
        },
        run: function(t, e) { this._deferred.resolve({ options: t, context: e }) },
        reset: function() {
            var t = this._callbacks;
            this._deferred = s.Deferred(), this._callbacks = [], i.each(t, function(t) { this.add(t.cb, t.ctx) }, this)
        }
    }), s.Controller = function(t) { this.options = t || {}, i.isFunction(this.initialize) && this.initialize(this.options) }, s.Controller.extend = s.extend, i.extend(s.Controller.prototype, e.Events, { destroy: function() { return s._triggerMethod(this, "before:destroy", arguments), s._triggerMethod(this, "destroy", arguments), this.stopListening(), this.off(), this }, triggerMethod: s.triggerMethod, mergeOptions: s.mergeOptions, getOption: s.proxyGetOption }), s.Object = function(t) { this.options = i.extend({}, i.result(this, "options"), t), this.initialize.apply(this, arguments) }, s.Object.extend = s.extend, i.extend(s.Object.prototype, e.Events, { initialize: function() {}, destroy: function() { return this.triggerMethod("before:destroy"), this.triggerMethod("destroy"), this.stopListening(), this }, triggerMethod: s.triggerMethod, mergeOptions: s.mergeOptions, getOption: s.proxyGetOption, bindEntityEvents: s.proxyBindEntityEvents, unbindEntityEvents: s.proxyUnbindEntityEvents }), s.Region = s.Object.extend({
        constructor: function(t) {
            if (this.options = t || {}, this.el = this.getOption("el"), this.el = this.el instanceof e.$ ? this.el[0] : this.el, !this.el) throw new s.Error({ name: "NoElError", message: 'An "el" must be specified for a region.' });
            this.$el = this.getEl(this.el), s.Object.call(this, t)
        },
        show: function(t, e) {
            if (this._ensureElement()) {
                this._ensureViewIsIntact(t);
                var n = e || {},
                    r = t !== this.currentView,
                    o = !!n.preventDestroy,
                    h = !!n.forceShow,
                    a = !!this.currentView,
                    d = r && !o,
                    l = r || h;
                if (a && this.triggerMethod("before:swapOut", this.currentView, this, e), this.currentView && delete this.currentView._parent, d ? this.empty() : a && l && this.currentView.off("destroy", this.empty, this), l) {
                    t.once("destroy", this.empty, this), t.render(), t._parent = this, a && this.triggerMethod("before:swap", t, this, e), this.triggerMethod("before:show", t, this, e), s.triggerMethodOn(t, "before:show", t, this, e), a && this.triggerMethod("swapOut", this.currentView, this, e);
                    var c = s.isNodeAttached(this.el),
                        u = [],
                        g = i.extend({ triggerBeforeAttach: this.triggerBeforeAttach, triggerAttach: this.triggerAttach }, n);
                    return c && g.triggerBeforeAttach && (u = this._displayedViews(t), this._triggerAttach(u, "before:")), this.attachHtml(t), this.currentView = t, c && g.triggerAttach && (u = this._displayedViews(t), this._triggerAttach(u)), a && this.triggerMethod("swap", t, this, e), this.triggerMethod("show", t, this, e), s.triggerMethodOn(t, "show", t, this, e), this
                }
                return this
            }
        },
        triggerBeforeAttach: !0,
        triggerAttach: !0,
        _triggerAttach: function(t, e) {
            var n = (e || "") + "attach";
            i.each(t, function(t) { s.triggerMethodOn(t, n, t, this) }, this)
        },
        _displayedViews: function(t) { return i.union([t], i.result(t, "_getNestedViews") || []) },
        _ensureElement: function() { if (i.isObject(this.el) || (this.$el = this.getEl(this.el), this.el = this.$el[0]), !this.$el || 0 === this.$el.length) { if (this.getOption("allowMissingEl")) return !1; throw new s.Error('An "el" ' + this.$el.selector + " must exist in DOM") } return !0 },
        _ensureViewIsIntact: function(t) { if (!t) throw new s.Error({ name: "ViewNotValid", message: "The view passed is undefined and therefore invalid. You must pass a view instance to show." }); if (t.isDestroyed) throw new s.Error({ name: "ViewDestroyedError", message: 'View (cid: "' + t.cid + '") has already been destroyed and cannot be used.' }) },
        getEl: function(t) { return e.$(t, s._getValue(this.options.parentEl, this)) },
        attachHtml: function(t) { this.$el.contents().detach(), this.el.appendChild(t.el) },
        empty: function(t) {
            var e = this.currentView,
                i = s._getValue(t, "preventDestroy", this);
            return e ? (e.off("destroy", this.empty, this), this.triggerMethod("before:empty", e), i || this._destroyView(), this.triggerMethod("empty", e), delete this.currentView, i && this.$el.contents().detach(), this) : void 0
        },
        _destroyView: function() {
            var t = this.currentView;
            t.destroy && !t.isDestroyed ? t.destroy() : t.remove && (t.remove(), t.isDestroyed = !0)
        },
        attachView: function(t) { return this.currentView = t, this },
        hasView: function() { return !!this.currentView },
        reset: function() { return this.empty(), this.$el && (this.el = this.getOption('el')), delete this.$el, this }
    }, {
        buildRegion: function(t, e) { if (i.isString(t)) return this._buildRegionFromSelector(t, e); if (t.selector || t.el || t.regionClass) return this._buildRegionFromObject(t, e); if (i.isFunction(t)) return this._buildRegionFromRegionClass(t); throw new s.Error({ message: "Improper region configuration type.", url: "marionette.region.html#region-configuration-types" }) },
        _buildRegionFromSelector: function(t, e) { return new e({ el: t }) },
        _buildRegionFromObject: function(t, e) {
            var n = t.regionClass || e,
                r = i.omit(t, "selector", "regionClass");
            return t.selector && !r.el && (r.el = t.selector), new n(r)
        },
        _buildRegionFromRegionClass: function(t) { return new t }
    }), s.RegionManager = s.Controller.extend({ constructor: function(t) { this._regions = {}, this.length = 0, s.Controller.call(this, t), this.addRegions(this.getOption("regions")) }, addRegions: function(t, e) { return t = s._getValue(t, this, arguments), i.reduce(t, function(t, n, r) { return i.isString(n) && (n = { selector: n }), n.selector && (n = i.defaults({}, n, e)), t[r] = this.addRegion(r, n), t }, {}, this) }, addRegion: function(t, e) { var i; return i = e instanceof s.Region ? e : s.Region.buildRegion(e, s.Region), this.triggerMethod("before:add:region", t, i), i._parent = this, this._store(t, i), this.triggerMethod("add:region", t, i), i }, get: function(t) { return this._regions[t] }, getRegions: function() { return i.clone(this._regions) }, removeRegion: function(t) { var e = this._regions[t]; return this._remove(t, e), e }, removeRegions: function() { var t = this.getRegions(); return i.each(this._regions, function(t, e) { this._remove(e, t) }, this), t }, emptyRegions: function() { var t = this.getRegions(); return i.invoke(t, "empty"), t }, destroy: function() { return this.removeRegions(), s.Controller.prototype.destroy.apply(this, arguments) }, _store: function(t, e) { this._regions[t] || this.length++, this._regions[t] = e }, _remove: function(t, e) { this.triggerMethod("before:remove:region", t, e), e.empty(), e.stopListening(), delete e._parent, delete this._regions[t], this.length--, this.triggerMethod("remove:region", t, e) } }), s.actAsCollection(s.RegionManager.prototype, "_regions"), s.TemplateCache = function(t) { this.templateId = t }, i.extend(s.TemplateCache, {
        templateCaches: {},
        get: function(t, e) { var i = this.templateCaches[t]; return i || (i = new s.TemplateCache(t), this.templateCaches[t] = i), i.load(e) },
        clear: function() {
            var t, e = i.toArray(arguments),
                n = e.length;
            if (n > 0)
                for (t = 0; n > t; t++) delete this.templateCaches[e[t]];
            else this.templateCaches = {}
        }
    }), i.extend(s.TemplateCache.prototype, { load: function(t) { if (this.compiledTemplate) return this.compiledTemplate; var e = this.loadTemplate(this.templateId, t); return this.compiledTemplate = this.compileTemplate(e, t), this.compiledTemplate }, loadTemplate: function(t) { var i = e.$(t).html(); if (!i || 0 === i.length) throw new s.Error({ name: "NoTemplateError", message: 'Could not find template: "' + t + '"' }); return i }, compileTemplate: function(t, e) { return i.template(t, e) } }), s.Renderer = { render: function(t, e) { if (!t) throw new s.Error({ name: "TemplateNotFoundError", message: "Cannot render the template since its false, null or undefined." }); var n = i.isFunction(t) ? t : s.TemplateCache.get(t); return n(e) } }, s.View = e.View.extend({
        isDestroyed: !1,
        constructor: function(t) { i.bindAll(this, "render"), t = s._getValue(t, this), this.options = i.extend({}, i.result(this, "options"), t), this._behaviors = s.Behaviors(this), e.View.call(this, this.options), s.MonitorDOMRefresh(this) },
        getTemplate: function() { return this.getOption("template") },
        serializeModel: function(t) { return t.toJSON.apply(t, i.rest(arguments)) },
        mixinTemplateHelpers: function(t) { t = t || {}; var e = this.getOption("templateHelpers"); return e = s._getValue(e, this), i.extend(t, e) },
        normalizeUIKeys: function(t) { var e = i.result(this, "_uiBindings"); return s.normalizeUIKeys(t, e || i.result(this, "ui")) },
        normalizeUIValues: function(t, e) {
            var n = i.result(this, "ui"),
                r = i.result(this, "_uiBindings");
            return s.normalizeUIValues(t, r || n, e)
        },
        configureTriggers: function() { if (this.triggers) { var t = this.normalizeUIKeys(i.result(this, "triggers")); return i.reduce(t, function(t, e, i) { return t[i] = this._buildViewTrigger(e), t }, {}, this) } },
        delegateEvents: function(t) { return this._delegateDOMEvents(t), this.bindEntityEvents(this.model, this.getOption("modelEvents")), this.bindEntityEvents(this.collection, this.getOption("collectionEvents")), i.each(this._behaviors, function(t) { t.bindEntityEvents(this.model, t.getOption("modelEvents")), t.bindEntityEvents(this.collection, t.getOption("collectionEvents")) }, this), this },
        _delegateDOMEvents: function(t) {
            var n = s._getValue(t || this.events, this);
            n = this.normalizeUIKeys(n), i.isUndefined(t) && (this.events = n);
            var r = {},
                o = i.result(this, "behaviorEvents") || {},
                h = this.configureTriggers(),
                a = i.result(this, "behaviorTriggers") || {};
            i.extend(r, o, n, h, a), e.View.prototype.delegateEvents.call(this, r)
        },
        undelegateEvents: function() { return e.View.prototype.undelegateEvents.apply(this, arguments), this.unbindEntityEvents(this.model, this.getOption("modelEvents")), this.unbindEntityEvents(this.collection, this.getOption("collectionEvents")), i.each(this._behaviors, function(t) { t.unbindEntityEvents(this.model, t.getOption("modelEvents")), t.unbindEntityEvents(this.collection, t.getOption("collectionEvents")) }, this), this },
        _ensureViewIsIntact: function() { if (this.isDestroyed) throw new s.Error({ name: "ViewDestroyedError", message: 'View (cid: "' + this.cid + '") has already been destroyed and cannot be used.' }) },
        destroy: function() { if (this.isDestroyed) return this; var t = i.toArray(arguments); return this.triggerMethod.apply(this, ["before:destroy"].concat(t)), this.isDestroyed = !0, this.triggerMethod.apply(this, ["destroy"].concat(t)), this.unbindUIElements(), this.isRendered = !1, this.remove(), i.invoke(this._behaviors, "destroy", t), this },
        bindUIElements: function() { this._bindUIElements(), i.invoke(this._behaviors, this._bindUIElements) },
        _bindUIElements: function() {
            if (this.ui) {
                this._uiBindings || (this._uiBindings = this.ui);
                var t = i.result(this, "_uiBindings");
                this.ui = {}, i.each(t, function(t, e) { this.ui[e] = this.$(t) }, this)
            }
        },
        unbindUIElements: function() { this._unbindUIElements(), i.invoke(this._behaviors, this._unbindUIElements) },
        _unbindUIElements: function() { this.ui && this._uiBindings && (i.each(this.ui, function(t, e) { delete this.ui[e] }, this), this.ui = this._uiBindings, delete this._uiBindings) },
        _buildViewTrigger: function(t) {
            var e = i.isObject(t),
                n = i.defaults({}, e ? t : {}, { preventDefault: !0, stopPropagation: !0 }),
                r = e ? n.event : t;
            return function(t) {
                t && (t.preventDefault && n.preventDefault && t.preventDefault(), t.stopPropagation && n.stopPropagation && t.stopPropagation());
                var e = { view: this, model: this.model, collection: this.collection };
                this.triggerMethod(r, e)
            }
        },
        setElement: function() { var t = e.View.prototype.setElement.apply(this, arguments); return i.invoke(this._behaviors, "proxyViewProperties", this), t },
        triggerMethod: function() { var t = s._triggerMethod(this, arguments); return this._triggerEventOnBehaviors(arguments), this._triggerEventOnParentLayout(arguments[0], i.rest(arguments)), t },
        _triggerEventOnBehaviors: function(t) { for (var e = s._triggerMethod, i = this._behaviors, n = 0, r = i && i.length; r > n; n++) e(i[n], t) },
        _triggerEventOnParentLayout: function(t, e) {
            var n = this._parentLayoutView();
            if (n) {
                var r = s.getOption(n, "childViewEventPrefix"),
                    o = r + ":" + t;
                s._triggerMethod(n, [o, this].concat(e));
                var h = s.getOption(n, "childEvents"),
                    a = n.normalizeMethods(h);
                a && i.isFunction(a[t]) && a[t].apply(n, [this].concat(e))
            }
        },
        _getImmediateChildren: function() { return [] },
        _getNestedViews: function() { var t = this._getImmediateChildren(); return t.length ? i.reduce(t, function(t, e) { return e._getNestedViews ? t.concat(e._getNestedViews()) : t }, t) : t },
        _getAncestors: function() { for (var t = [], e = this._parent; e;) t.push(e), e = e._parent; return t },
        _parentLayoutView: function() { var t = this._getAncestors(); return i.find(t, function(t) { return t instanceof s.LayoutView }) },
        normalizeMethods: s.normalizeMethods,
        mergeOptions: s.mergeOptions,
        getOption: s.proxyGetOption,
        bindEntityEvents: s.proxyBindEntityEvents,
        unbindEntityEvents: s.proxyUnbindEntityEvents
    }), s.ItemView = s.View.extend({
        constructor: function() { s.View.apply(this, arguments) },
        serializeData: function() { if (!this.model && !this.collection) return {}; var t = [this.model || this.collection]; return arguments.length && t.push.apply(t, arguments), this.model ? this.serializeModel.apply(this, t) : { items: this.serializeCollection.apply(this, t) } },
        serializeCollection: function(t) { return t.toJSON.apply(t, i.rest(arguments)) },
        render: function() { return this._ensureViewIsIntact(), this.triggerMethod("before:render", this), this._renderTemplate(), this.isRendered = !0, this.bindUIElements(), this.triggerMethod("render", this), this },
        _renderTemplate: function() {
            var t = this.getTemplate();
            if (t !== !1) {
                if (!t) throw new s.Error({ name: "UndefinedTemplateError", message: "Cannot render the template since it is null or undefined." });
                var e = this.mixinTemplateHelpers(this.serializeData()),
                    i = s.Renderer.render(t, e, this);
                return this.attachElContent(i), this
            }
        },
        attachElContent: function(t) { return this.$el.html(t), this }
    }), s.CollectionView = s.View.extend({
        childViewEventPrefix: "childview",
        sort: !0,
        constructor: function() { this.once("render", this._initialEvents), this._initChildViewStorage(), s.View.apply(this, arguments), this.on({ "before:show": this._onBeforeShowCalled, show: this._onShowCalled, "before:attach": this._onBeforeAttachCalled, attach: this._onAttachCalled }), this.initRenderBuffer() },
        initRenderBuffer: function() { this._bufferedChildren = [] },
        startBuffering: function() { this.initRenderBuffer(), this.isBuffering = !0 },
        endBuffering: function() {
            var t, e = this._isShown && s.isNodeAttached(this.el);
            this.isBuffering = !1, this._isShown && this._triggerMethodMany(this._bufferedChildren, this, "before:show"), e && this._triggerBeforeAttach && (t = this._getNestedViews(), this._triggerMethodMany(t, this, "before:attach")), this.attachBuffer(this, this._createBuffer()), e && this._triggerAttach && (t = this._getNestedViews(), this._triggerMethodMany(t, this, "attach")), this._isShown && this._triggerMethodMany(this._bufferedChildren, this, "show"), this.initRenderBuffer()
        },
        _triggerMethodMany: function(t, e, n) {
            var r = i.drop(arguments, 3);
            i.each(t, function(t) { s.triggerMethodOn.apply(t, [t, n, t, e].concat(r)) })
        },
        _initialEvents: function() { this.collection && (this.listenTo(this.collection, "add", this._onCollectionAdd), this.listenTo(this.collection, "remove", this._onCollectionRemove), this.listenTo(this.collection, "reset", this.render), this.getOption("sort") && this.listenTo(this.collection, "sort", this._sortViews)) },
        _onCollectionAdd: function(t, e, n) {
            var r;
            if (r = void 0 !== n.at ? n.at : i.indexOf(this._filteredSortedModels(), t), this._shouldAddChild(t, r)) {
                this.destroyEmptyView();
                var s = this.getChildView(t);
                this.addChild(t, s, r)
            }
        },
        _onCollectionRemove: function(t) {
            var e = this.children.findByModel(t);
            this.removeChildView(e), this.checkEmpty()
        },
        _onBeforeShowCalled: function() { this._triggerBeforeAttach = this._triggerAttach = !1, this.children.each(function(t) { s.triggerMethodOn(t, "before:show", t) }) },
        _onShowCalled: function() { this.children.each(function(t) { s.triggerMethodOn(t, "show", t) }) },
        _onBeforeAttachCalled: function() { this._triggerBeforeAttach = !0 },
        _onAttachCalled: function() { this._triggerAttach = !0 },
        render: function() { return this._ensureViewIsIntact(), this.triggerMethod("before:render", this), this._renderChildren(), this.isRendered = !0, this.triggerMethod("render", this), this },
        reorder: function() {
            var t = this.children,
                e = this._filteredSortedModels(),
                n = i.find(e, function(e) { return !t.findByModel(e) });
            if (n) this.render();
            else {
                var r = i.map(e, function(e, i) { var n = t.findByModel(e); return n._index = i, n.el });
                this.triggerMethod("before:reorder"), this._appendReorderedChildren(r), this.triggerMethod("reorder")
            }
        },
        resortView: function() { s.getOption(this, "reorderOnSort") ? this.reorder() : this.render() },
        _sortViews: function() {
            var t = this._filteredSortedModels(),
                e = i.find(t, function(t, e) { var i = this.children.findByModel(t); return !i || i._index !== e }, this);
            e && this.resortView()
        },
        _emptyViewIndex: -1,
        _appendReorderedChildren: function(t) { this.$el.append(t) },
        _renderChildren: function() { this.destroyEmptyView(), this.destroyChildren({ checkEmpty: !1 }), this.isEmpty(this.collection) ? this.showEmptyView() : (this.triggerMethod("before:render:collection", this), this.startBuffering(), this.showCollection(), this.endBuffering(), this.triggerMethod("render:collection", this), this.children.isEmpty() && this.showEmptyView()) },
        showCollection: function() {
            var t, e = this._filteredSortedModels();
            i.each(e, function(e, i) { t = this.getChildView(e), this.addChild(e, t, i) }, this)
        },
        _filteredSortedModels: function() { var t, e = this.getViewComparator(); return t = e ? i.isString(e) || 1 === e.length ? this.collection.sortBy(e, this) : i.clone(this.collection.models).sort(i.bind(e, this)) : this.collection.models, this.getOption("filter") && (t = i.filter(t, function(t, e) { return this._shouldAddChild(t, e) }, this)), t },
        showEmptyView: function() {
            var t = this.getEmptyView();
            if (t && !this._showingEmptyView) {
                this.triggerMethod("before:render:empty"), this._showingEmptyView = !0;
                var i = new e.Model;
                this.addEmptyView(i, t), this.triggerMethod("render:empty")
            }
        },
        destroyEmptyView: function() { this._showingEmptyView && (this.triggerMethod("before:remove:empty"), this.destroyChildren(), delete this._showingEmptyView, this.triggerMethod("remove:empty")) },
        getEmptyView: function() { return this.getOption("emptyView") },
        addEmptyView: function(t, e) {
            var n, r = this._isShown && !this.isBuffering && s.isNodeAttached(this.el),
                o = this.getOption("emptyViewOptions") || this.getOption("childViewOptions");
            i.isFunction(o) && (o = o.call(this, t, this._emptyViewIndex));
            var h = this.buildChildView(t, e, o);
            h._parent = this, this.proxyChildEvents(h), this._isShown && s.triggerMethodOn(h, "before:show", h), this.children.add(h), r && this._triggerBeforeAttach && (n = [h].concat(h._getNestedViews()), h.once("render", function() { this._triggerMethodMany(n, this, "before:attach") }, this)), this.renderChildView(h, this._emptyViewIndex), r && this._triggerAttach && (n = [h].concat(h._getNestedViews()), this._triggerMethodMany(n, this, "attach")), this._isShown && s.triggerMethodOn(h, "show", h)
        },
        getChildView: function() { var t = this.getOption("childView"); if (!t) throw new s.Error({ name: "NoChildViewError", message: 'A "childView" must be specified' }); return t },
        addChild: function(t, e, i) {
            var n = this.getOption("childViewOptions");
            n = s._getValue(n, this, [t, i]);
            var r = this.buildChildView(t, e, n);
            return this._updateIndices(r, !0, i), this.triggerMethod("before:add:child", r), this._addChildView(r, i), this.triggerMethod("add:child", r), r._parent = this, r
        },
        _updateIndices: function(t, e, i) { this.getOption("sort") && (e && (t._index = i), this.children.each(function(i) { i._index >= t._index && (i._index += e ? 1 : -1) })) },
        _addChildView: function(t, e) {
            var i, n = this._isShown && !this.isBuffering && s.isNodeAttached(this.el);
            this.proxyChildEvents(t), this._isShown && !this.isBuffering && s.triggerMethodOn(t, "before:show", t), this.children.add(t), n && this._triggerBeforeAttach && (i = [t].concat(t._getNestedViews()), t.once("render", function() { this._triggerMethodMany(i, this, "before:attach") }, this)), this.renderChildView(t, e), n && this._triggerAttach && (i = [t].concat(t._getNestedViews()), this._triggerMethodMany(i, this, "attach")), this._isShown && !this.isBuffering && s.triggerMethodOn(t, "show", t)
        },
        renderChildView: function(t, e) { return t.render(), this.attachHtml(this, t, e), t },
        buildChildView: function(t, e, n) { var r = i.extend({ model: t }, n); return new e(r) },
        removeChildView: function(t) { return t && (this.triggerMethod("before:remove:child", t), t.destroy ? t.destroy() : t.remove && t.remove(), delete t._parent, this.stopListening(t), this.children.remove(t), this.triggerMethod("remove:child", t), this._updateIndices(t, !1)), t },
        isEmpty: function() { return !this.collection || 0 === this.collection.length },
        checkEmpty: function() { this.isEmpty(this.collection) && this.showEmptyView() },
        attachBuffer: function(t, e) { t.$el.append(e) },
        _createBuffer: function() { var t = document.createDocumentFragment(); return i.each(this._bufferedChildren, function(e) { t.appendChild(e.el) }), t },
        attachHtml: function(t, e, i) { t.isBuffering ? t._bufferedChildren.splice(i, 0, e) : t._insertBefore(e, i) || t._insertAfter(e) },
        _insertBefore: function(t, e) { var i, n = this.getOption("sort") && this.children.length - 1 > e; return n && (i = this.children.find(function(t) { return t._index === e + 1 })), i ? (i.$el.before(t.el), !0) : !1 },
        _insertAfter: function(t) { this.$el.append(t.el) },
        _initChildViewStorage: function() { this.children = new e.ChildViewContainer },
        destroy: function() { return this.isDestroyed ? this : (this.triggerMethod("before:destroy:collection"), this.destroyChildren({ checkEmpty: !1 }), this.triggerMethod("destroy:collection"), s.View.prototype.destroy.apply(this, arguments)) },
        destroyChildren: function(t) {
            var e = t || {},
                n = !0,
                r = this.children.map(i.identity);
            return i.isUndefined(e.checkEmpty) || (n = e.checkEmpty), this.children.each(this.removeChildView, this), n && this.checkEmpty(), r
        },
        _shouldAddChild: function(t, e) { var n = this.getOption("filter"); return !i.isFunction(n) || n.call(this, t, e, this.collection) },
        proxyChildEvents: function(t) {
            var e = this.getOption("childViewEventPrefix");
            this.listenTo(t, "all", function() {
                var n = i.toArray(arguments),
                    r = n[0],
                    s = this.normalizeMethods(i.result(this, "childEvents"));
                n[0] = e + ":" + r, n.splice(1, 0, t), s !== void 0 && i.isFunction(s[r]) && s[r].apply(this, n.slice(1)), this.triggerMethod.apply(this, n)
            })
        },
        _getImmediateChildren: function() { return i.values(this.children._views) },
        getViewComparator: function() { return this.getOption("viewComparator") }
    }), s.CompositeView = s.CollectionView.extend({
        constructor: function() { s.CollectionView.apply(this, arguments) },
        _initialEvents: function() { this.collection && (this.listenTo(this.collection, "add", this._onCollectionAdd), this.listenTo(this.collection, "remove", this._onCollectionRemove), this.listenTo(this.collection, "reset", this._renderChildren), this.getOption("sort") && this.listenTo(this.collection, "sort", this._sortViews)) },
        getChildView: function() { var t = this.getOption("childView") || this.constructor; return t },
        serializeData: function() { var t = {}; return this.model && (t = i.partial(this.serializeModel, this.model).apply(this, arguments)), t },
        render: function() {
            return this._ensureViewIsIntact(), this._isRendering = !0, this.resetChildViewContainer(), this.triggerMethod("before:render", this), this._renderTemplate(), this._renderChildren(), this._isRendering = !1, this.isRendered = !0, this.triggerMethod("render", this), this
        },
        _renderChildren: function() {
            (this.isRendered || this._isRendering) && s.CollectionView.prototype._renderChildren.call(this)
        },
        _renderTemplate: function() {
            var t = {};
            t = this.serializeData(), t = this.mixinTemplateHelpers(t), this.triggerMethod("before:render:template");
            var e = this.getTemplate(),
                i = s.Renderer.render(e, t, this);
            this.attachElContent(i), this.bindUIElements(), this.triggerMethod("render:template")
        },
        attachElContent: function(t) { return this.$el.html(t), this },
        attachBuffer: function(t, e) {
            var i = this.getChildViewContainer(t);
            i.append(e)
        },
        _insertAfter: function(t) {
            var e = this.getChildViewContainer(this, t);
            e.append(t.el)
        },
        _appendReorderedChildren: function(t) {
            var e = this.getChildViewContainer(this);
            e.append(t)
        },
        getChildViewContainer: function(t) { if (t.$childViewContainer) return t.$childViewContainer; var e, i = s.getOption(t, "childViewContainer"); if (i) { var n = s._getValue(i, t); if (e = "@" === n.charAt(0) && t.ui ? t.ui[n.substr(4)] : t.$(n), 0 >= e.length) throw new s.Error({ name: "ChildViewContainerMissingError", message: 'The specified "childViewContainer" was not found: ' + t.childViewContainer }) } else e = t.$el; return t.$childViewContainer = e, e },
        resetChildViewContainer: function() { this.$childViewContainer && (this.$childViewContainer = void 0) }
    }), s.LayoutView = s.ItemView.extend({
        regionClass: s.Region,
        options: { destroyImmediate: !1 },
        childViewEventPrefix: "childview",
        constructor: function(t) { t = t || {}, this._firstRender = !0, this._initializeRegions(t), s.ItemView.call(this, t) },
        render: function() { return this._ensureViewIsIntact(), this._firstRender ? this._firstRender = !1 : this._reInitializeRegions(), s.ItemView.prototype.render.apply(this, arguments) },
        destroy: function() { return this.isDestroyed ? this : (this.getOption("destroyImmediate") === !0 && this.$el.remove(), this.regionManager.destroy(), s.ItemView.prototype.destroy.apply(this, arguments)) },
        showChildView: function(t, e) { return this.getRegion(t).show(e) },
        getChildView: function(t) { return this.getRegion(t).currentView },
        addRegion: function(t, e) { var i = {}; return i[t] = e, this._buildRegions(i)[t] },
        addRegions: function(t) { return this.regions = i.extend({}, this.regions, t), this._buildRegions(t) },
        removeRegion: function(t) { return delete this.regions[t], this.regionManager.removeRegion(t) },
        getRegion: function(t) { return this.regionManager.get(t) },
        getRegions: function() { return this.regionManager.getRegions() },
        _buildRegions: function(t) { var e = { regionClass: this.getOption("regionClass"), parentEl: i.partial(i.result, this, "el") }; return this.regionManager.addRegions(t, e) },
        _initializeRegions: function(t) {
            var e;
            this._initRegionManager(), e = s._getValue(this.regions, this, [t]) || {};
            var n = this.getOption.call(t, "regions");
            n = s._getValue(n, this, [t]), i.extend(e, n), e = this.normalizeUIValues(e, ["selector", "el"]), this.addRegions(e)
        },
        _reInitializeRegions: function() { this.regionManager.invoke("reset") },
        getRegionManager: function() { return new s.RegionManager },
        _initRegionManager: function() { this.regionManager = this.getRegionManager(), this.regionManager._parent = this, this.listenTo(this.regionManager, "before:add:region", function(t) { this.triggerMethod("before:add:region", t) }), this.listenTo(this.regionManager, "add:region", function(t, e) { this[t] = e, this.triggerMethod("add:region", t, e) }), this.listenTo(this.regionManager, "before:remove:region", function(t) { this.triggerMethod("before:remove:region", t) }), this.listenTo(this.regionManager, "remove:region", function(t, e) { delete this[t], this.triggerMethod("remove:region", t, e) }) },
        _getImmediateChildren: function() { return i.chain(this.regionManager.getRegions()).pluck("currentView").compact().value() }
    }), s.Behavior = s.Object.extend({ constructor: function(t, e) { this.view = e, this.defaults = i.result(this, "defaults") || {}, this.options = i.extend({}, this.defaults, t), this.ui = i.extend({}, i.result(e, "ui"), i.result(this, "ui")), s.Object.apply(this, arguments) }, $: function() { return this.view.$.apply(this.view, arguments) }, destroy: function() { return this.stopListening(), this }, proxyViewProperties: function(t) { this.$el = t.$el, this.el = t.el } }), s.Behaviors = function(t, e) {
        function i(t, n) { return e.isObject(t.behaviors) ? (n = i.parseBehaviors(t, n || e.result(t, "behaviors")), i.wrap(t, n, e.keys(o)), n) : {} }

        function n(t, e) { this._view = t, this._behaviors = e, this._triggers = {} }

        function r(t) { return t._uiBindings || t.ui }
        var s = /^(\S+)\s*(.*)$/,
            o = {
                behaviorTriggers: function(t, e) { var i = new n(this, e); return i.buildBehaviorTriggers() },
                behaviorEvents: function(i, n) {
                    var o = {};
                    return e.each(n, function(i, n) {
                        var h = {},
                            a = e.clone(e.result(i, "events")) || {};
                        a = t.normalizeUIKeys(a, r(i));
                        var d = 0;
                        e.each(a, function(t, r) {
                            var o = r.match(s),
                                a = o[1] + "." + [this.cid, n, d++, " "].join(""),
                                l = o[2],
                                c = a + l,
                                u = e.isFunction(t) ? t : i[t];
                            h[c] = e.bind(u, i)
                        }, this), o = e.extend(o, h)
                    }, this), o
                }
            };
        return e.extend(i, {
            behaviorsLookup: function() { throw new t.Error({ message: "You must define where your behaviors are stored.", url: "marionette.behaviors.html#behaviorslookup" }) },
            getBehaviorClass: function(e, n) { return e.behaviorClass ? e.behaviorClass : t._getValue(i.behaviorsLookup, this, [e, n])[n] },
            parseBehaviors: function(t, n) {
                return e.chain(n).map(function(n, r) {
                    var s = i.getBehaviorClass(n, r),
                        o = new s(n, t),
                        h = i.parseBehaviors(t, e.result(o, "behaviors"));
                    return [o].concat(h)
                }).flatten().value()
            },
            wrap: function(t, i, n) { e.each(n, function(n) { t[n] = e.partial(o[n], t[n], i) }) }
        }), e.extend(n.prototype, {
            buildBehaviorTriggers: function() { return e.each(this._behaviors, this._buildTriggerHandlersForBehavior, this), this._triggers },
            _buildTriggerHandlersForBehavior: function(i, n) {
                var s = e.clone(e.result(i, "triggers")) || {};
                s = t.normalizeUIKeys(s, r(i)), e.each(s, e.bind(this._setHandlerForBehavior, this, i, n))
            },
            _setHandlerForBehavior: function(t, e, i, n) {
                var r = n.replace(/^\S+/, function(t) { return t + "." + "behaviortriggers" + e });
                this._triggers[r] = this._view._buildViewTrigger(i)
            }
        }), i
    }(s, i), s.AppRouter = e.Router.extend({
        constructor: function(t) {
            this.options = t || {}, e.Router.apply(this, arguments);
            var i = this.getOption("appRoutes"),
                n = this._getController();
            this.processAppRoutes(n, i), this.on("route", this._processOnRoute, this)
        },
        appRoute: function(t, e) {
            var i = this._getController();
            this._addAppRoute(i, t, e)
        },
        _processOnRoute: function(t, e) {
            if (i.isFunction(this.onRoute)) {
                var n = i.invert(this.getOption("appRoutes"))[t];
                this.onRoute(t, n, e)
            }
        },
        processAppRoutes: function(t, e) {
            if (e) {
                var n = i.keys(e).reverse();
                i.each(n, function(i) { this._addAppRoute(t, i, e[i]) }, this)
            }
        },
        _getController: function() { return this.getOption("controller") },
        _addAppRoute: function(t, e, n) {
            var r = t[n];
            if (!r) throw new s.Error('Method "' + n + '" was not found on the controller');
            this.route(e, n, i.bind(r, t))
        },
        mergeOptions: s.mergeOptions,
        getOption: s.proxyGetOption,
        triggerMethod: s.triggerMethod,
        bindEntityEvents: s.proxyBindEntityEvents,
        unbindEntityEvents: s.proxyUnbindEntityEvents
    }), s.Application = s.Object.extend({
        constructor: function(t) { this._initializeRegions(t), this._initCallbacks = new s.Callbacks, this.submodules = {}, i.extend(this, t), this._initChannel(), s.Object.call(this, t) },
        execute: function() { this.commands.execute.apply(this.commands, arguments) },
        request: function() { return this.reqres.request.apply(this.reqres, arguments) },
        addInitializer: function(t) { this._initCallbacks.add(t) },
        start: function(t) { this.triggerMethod("before:start", t), this._initCallbacks.run(t, this), this.triggerMethod("start", t) },
        addRegions: function(t) { return this._regionManager.addRegions(t) },
        emptyRegions: function() { return this._regionManager.emptyRegions() },
        removeRegion: function(t) { return this._regionManager.removeRegion(t) },
        getRegion: function(t) { return this._regionManager.get(t) },
        getRegions: function() { return this._regionManager.getRegions() },
        module: function(t, e) {
            var n = s.Module.getClass(e),
                r = i.toArray(arguments);
            return r.unshift(this), n.create.apply(n, r)
        },
        getRegionManager: function() { return new s.RegionManager },
        _initializeRegions: function(t) {
            var e = i.isFunction(this.regions) ? this.regions(t) : this.regions || {};
            this._initRegionManager();
            var n = s.getOption(t, "regions");
            return i.isFunction(n) && (n = n.call(this, t)), i.extend(e, n), this.addRegions(e), this
        },
        _initRegionManager: function() { this._regionManager = this.getRegionManager(), this._regionManager._parent = this, this.listenTo(this._regionManager, "before:add:region", function() { s._triggerMethod(this, "before:add:region", arguments) }), this.listenTo(this._regionManager, "add:region", function(t, e) { this[t] = e, s._triggerMethod(this, "add:region", arguments) }), this.listenTo(this._regionManager, "before:remove:region", function() { s._triggerMethod(this, "before:remove:region", arguments) }), this.listenTo(this._regionManager, "remove:region", function(t) { delete this[t], s._triggerMethod(this, "remove:region", arguments) }) },
        _initChannel: function() { this.channelName = i.result(this, "channelName") || "global", this.channel = i.result(this, "channel") || e.Wreqr.radio.channel(this.channelName), this.vent = i.result(this, "vent") || this.channel.vent, this.commands = i.result(this, "commands") || this.channel.commands, this.reqres = i.result(this, "reqres") || this.channel.reqres }
    }), s.Module = function(t, e, n) { this.moduleName = t, this.options = i.extend({}, this.options, n), this.initialize = n.initialize || this.initialize, this.submodules = {}, this._setupInitializersAndFinalizers(), this.app = e, i.isFunction(this.initialize) && this.initialize(t, e, this.options) }, s.Module.extend = s.extend, i.extend(s.Module.prototype, e.Events, {
        startWithParent: !0,
        initialize: function() {},
        addInitializer: function(t) { this._initializerCallbacks.add(t) },
        addFinalizer: function(t) { this._finalizerCallbacks.add(t) },
        start: function(t) { this._isInitialized || (i.each(this.submodules, function(e) { e.startWithParent && e.start(t) }), this.triggerMethod("before:start", t), this._initializerCallbacks.run(t, this), this._isInitialized = !0, this.triggerMethod("start", t)) },
        stop: function() { this._isInitialized && (this._isInitialized = !1, this.triggerMethod("before:stop"), i.invoke(this.submodules, "stop"), this._finalizerCallbacks.run(void 0, this), this._initializerCallbacks.reset(), this._finalizerCallbacks.reset(), this.triggerMethod("stop")) },
        addDefinition: function(t, e) { this._runModuleDefinition(t, e) },
        _runModuleDefinition: function(t, n) {
            if (t) {
                var r = i.flatten([this, this.app, e, s, e.$, i, n]);
                t.apply(this, r)
            }
        },
        _setupInitializersAndFinalizers: function() { this._initializerCallbacks = new s.Callbacks, this._finalizerCallbacks = new s.Callbacks },
        triggerMethod: s.triggerMethod
    }), i.extend(s.Module, {
        create: function(t, e, n) {
            var r = t,
                s = i.drop(arguments, 3);
            e = e.split(".");
            var o = e.length,
                h = [];
            return h[o - 1] = n, i.each(e, function(e, i) {
                var o = r;
                r = this._getModule(o, e, t, n), this._addModuleDefinition(o, r, h[i], s)
            }, this), r
        },
        _getModule: function(t, e, n, r) {
            var s = i.extend({}, r),
                o = this.getClass(r),
                h = t[e];
            return h || (h = new o(e, n, s), t[e] = h, t.submodules[e] = h), h
        },
        getClass: function(t) { var e = s.Module; return t ? t.prototype instanceof e ? t : t.moduleClass || e : e },
        _addModuleDefinition: function(t, e, i, n) {
            var r = this._getDefine(i),
                s = this._getStartWithParent(i, e);
            r && e.addDefinition(r, n), this._addStartWithParent(t, e, s)
        },
        _getStartWithParent: function(t, e) { var n; return i.isFunction(t) && t.prototype instanceof s.Module ? (n = e.constructor.prototype.startWithParent, i.isUndefined(n) ? !0 : n) : i.isObject(t) ? (n = t.startWithParent, i.isUndefined(n) ? !0 : n) : !0 },
        _getDefine: function(t) { return !i.isFunction(t) || t.prototype instanceof s.Module ? i.isObject(t) ? t.define : null : t },
        _addStartWithParent: function(t, e, i) { e.startWithParent = e.startWithParent && i, e.startWithParent && !e.startWithParentIsConfigured && (e.startWithParentIsConfigured = !0, t.addInitializer(function(t) { e.startWithParent && e.start(t) })) }
    }), s
});
// Backbone.Radio v1.0.1
! function(e, n) { "object" == typeof exports && "undefined" != typeof module ? module.exports = n(require("underscore"), require("backbone")) : "function" == typeof define && define.amd ? define(["underscore", "backbone"], n) : e.Backbone.Radio = n(e._, e.Backbone) }(this, function(e, n) {
    "use strict";

    function t(e, n, t, r) { var s = e[n]; return t && t !== s.callback && t !== s.callback._callback || r && r !== s.context ? void 0 : (delete e[n], !0) }

    function r(n, r, s, i) { n || (n = {}); for (var a = r ? [r] : e.keys(n), u = !1, o = 0, c = a.length; c > o; o++) r = a[o], n[r] && t(n, r, s, i) && (u = !0); return u }

    function s(n) { return c[n] || (c[n] = e.partial(u.log, n)) }

    function i(n) { return e.isFunction(n) ? n : function() { return n } }
    var a = n.Radio,
        u = n.Radio = {};
    u.VERSION = "1.0.1", u.noConflict = function() { return n.Radio = a, this }, u.DEBUG = !1, u._debugText = function(e, n, t) { return e + (t ? " on the " + t + " channel" : "") + ': "' + n + '"' }, u.debugLog = function(e, n, t) { u.DEBUG && console && console.warn && console.warn(u._debugText(e, n, t)) };
    var o = /\s+/;
    u._eventsApi = function(n, t, r, s) {
        if (!r) return !1;
        var i = {};
        if ("object" == typeof r) {
            for (var a in r) {
                var u = n[t].apply(n, [a, r[a]].concat(s));
                o.test(a) ? e.extend(i, u) : i[a] = u
            }
            return i
        }
        if (o.test(r)) { for (var c = r.split(o), l = 0, h = c.length; h > l; l++) i[c[l]] = n[t].apply(n, [c[l]].concat(s)); return i }
        return !1
    }, u._callHandler = function(e, n, t) {
        var r = t[0],
            s = t[1],
            i = t[2];
        switch (t.length) {
            case 0:
                return e.call(n);
            case 1:
                return e.call(n, r);
            case 2:
                return e.call(n, r, s);
            case 3:
                return e.call(n, r, s, i);
            default:
                return e.apply(n, t)
        }
    };
    var c = {};
    e.extend(u, {
        log: function(n, t) {
            var r = e.rest(arguments, 2);
            console.log("[" + n + '] "' + t + '"', r)
        },
        tuneIn: function(e) { var n = u.channel(e); return n._tunedIn = !0, n.on("all", s(e)), this },
        tuneOut: function(e) { var n = u.channel(e); return n._tunedIn = !1, n.off("all", s(e)), delete c[e], this }
    }), u.Requests = {
        request: function(n) {
            var t = e.rest(arguments),
                r = u._eventsApi(this, "request", n, t);
            if (r) return r;
            var s = this.channelName,
                i = this._requests;
            if (s && this._tunedIn && u.log.apply(this, [s, n].concat(t)), i && (i[n] || i["default"])) { var a = i[n] || i["default"]; return t = i[n] ? t : arguments, u._callHandler(a.callback, a.context, t) }
            u.debugLog("An unhandled request was fired", n, s)
        },
        reply: function(e, n, t) { return u._eventsApi(this, "reply", e, [n, t]) ? this : (this._requests || (this._requests = {}), this._requests[e] && u.debugLog("A request was overwritten", e, this.channelName), this._requests[e] = { callback: i(n), context: t || this }, this) },
        replyOnce: function(n, t, r) {
            if (u._eventsApi(this, "replyOnce", n, [t, r])) return this;
            var s = this,
                a = e.once(function() { return s.stopReplying(n), i(t).apply(this, arguments) });
            return this.reply(n, a, r)
        },
        stopReplying: function(e, n, t) { return u._eventsApi(this, "stopReplying", e) ? this : (e || n || t ? r(this._requests, e, n, t) || u.debugLog("Attempted to remove the unregistered request", e, this.channelName) : delete this._requests, this) }
    }, u._channels = {}, u.channel = function(e) { if (!e) throw new Error("You must provide a name for the channel."); return u._channels[e] ? u._channels[e] : u._channels[e] = new u.Channel(e) }, u.Channel = function(e) { this.channelName = e }, e.extend(u.Channel.prototype, n.Events, u.Requests, { reset: function() { return this.off(), this.stopListening(), this.stopReplying(), this } });
    var l, h, f = [n.Events, u.Commands, u.Requests];
    e.each(f, function(n) { e.each(n, function(n, t) { u[t] = function(n) { return h = e.rest(arguments), l = this.channel(n), l[t].apply(l, h) } }) }), u.reset = function(n) {
        var t = n ? [this._channels[n]] : this._channels;
        e.invoke(t, "reset")
    };
    var p = u;
    return p
});
/* 
 * The MIT License (MIT)
 * 
 * Copyright (c) Ankit
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/** math-expression-evaluator version 1.2.16
 Dated:2017-02-02 */
! function(a) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = a();
    else if ("function" == typeof define && define.amd) define([], a);
    else {
        var b;
        b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, b.mexp = a()
    }
}(function() {
    return function a(b, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!b[g]) { var i = "function" == typeof require && require; if (!h && i) return i(g, !0); if (f) return f(g, !0); var j = new Error("Cannot find module '" + g + "'"); throw j.code = "MODULE_NOT_FOUND", j }
                var k = c[g] = { exports: {} };
                b[g][0].call(k.exports, function(a) { var c = b[g][1][a]; return e(c ? c : a) }, k, k.exports, a, b, c, d)
            }
            return c[g].exports
        }
        for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
        return e
    }({
        1: [function(a, b, c) {
            var d = a("./postfix_evaluator.js");
            d.prototype.formulaEval = function() { "use strict"; for (var a, b, c, d = [], e = this.value, f = 0; f < e.length; f++) 1 === e[f].type || 3 === e[f].type ? d.push({ value: 3 === e[f].type ? e[f].show : e[f].value, type: 1 }) : 13 === e[f].type ? d.push({ value: e[f].show, type: 1 }) : 0 === e[f].type ? d[d.length - 1] = { value: e[f].show + ("-" != e[f].show ? "(" : "") + d[d.length - 1].value + ("-" != e[f].show ? ")" : ""), type: 0 } : 7 === e[f].type ? d[d.length - 1] = { value: (1 != d[d.length - 1].type ? "(" : "") + d[d.length - 1].value + (1 != d[d.length - 1].type ? ")" : "") + e[f].show, type: 7 } : 10 === e[f].type ? (a = d.pop(), b = d.pop(), "P" === e[f].show || "C" === e[f].show ? d.push({ value: "<sup>" + b.value + "</sup>" + e[f].show + "<sub>" + a.value + "</sub>", type: 10 }) : d.push({ value: (1 != b.type ? "(" : "") + b.value + (1 != b.type ? ")" : "") + "<sup>" + a.value + "</sup>", type: 1 })) : 2 === e[f].type || 9 === e[f].type ? (a = d.pop(), b = d.pop(), d.push({ value: (1 != b.type ? "(" : "") + b.value + (1 != b.type ? ")" : "") + e[f].show + (1 != a.type ? "(" : "") + a.value + (1 != a.type ? ")" : ""), type: e[f].type })) : 12 === e[f].type && (a = d.pop(), b = d.pop(), c = d.pop(), d.push({ value: e[f].show + "(" + c.value + "," + b.value + "," + a.value + ")", type: 12 })); return d[0].value }, b.exports = d
        }, { "./postfix_evaluator.js": 5 }],
        2: [function(a, b, c) {
            function d(a, b) { for (var c = 0; c < a.length; c++) a[c] += b; return a }

            function e(a, b, c, d) {
                for (var e = 0; e < d; e++)
                    if (a[c + e] !== b[e]) return !1;
                return !0
            }
            var f = a("./math_function.js"),
                g = ["sin", "cos", "tan", "pi", "(", ")", "P", "C", "asin", "acos", "atan", "7", "8", "9", "int", "cosh", "acosh", "ln", "^", "root", "4", "5", "6", "/", "!", "tanh", "atanh", "Mod", "1", "2", "3", "*", "sinh", "asinh", "e", "log", "0", ".", "+", "-", ",", "Sigma", "n", "Pi", "pow"],
                h = ["sin", "cos", "tan", "&pi;", "(", ")", "P", "C", "asin", "acos", "atan", "7", "8", "9", "Int", "cosh", "acosh", " ln", "^", "root", "4", "5", "6", "&divide;", "!", "tanh", "atanh", " Mod ", "1", "2", "3", "&times;", "sinh", "asinh", "e", " log", "0", ".", "+", "-", ",", "&Sigma;", "n", "&Pi;", "pow"],
                j = [f.math.sin, f.math.cos, f.math.tan, "PI", "(", ")", f.math.P, f.math.C, f.math.asin, f.math.acos, f.math.atan, "7", "8", "9", Math.floor, f.math.cosh, f.math.acosh, Math.log, Math.pow, Math.sqrt, "4", "5", "6", f.math.div, f.math.fact, f.math.tanh, f.math.atanh, f.math.mod, "1", "2", "3", f.math.mul, f.math.sinh, f.math.asinh, "E", f.math.log, "0", ".", f.math.add, f.math.sub, ",", f.math.sigma, "n", f.math.Pi, Math.pow],
                k = { 0: 11, 1: 0, 2: 3, 3: 0, 4: 0, 5: 0, 6: 0, 7: 11, 8: 11, 9: 1, 10: 10, 11: 0, 12: 11, 13: 0 },
                l = [0, 0, 0, 3, 4, 5, 10, 10, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 10, 0, 1, 1, 1, 2, 7, 0, 0, 2, 1, 1, 1, 2, 0, 0, 3, 0, 1, 6, 9, 9, 11, 12, 13, 12, 8],
                m = { 0: !0, 1: !0, 3: !0, 4: !0, 6: !0, 8: !0, 9: !0, 12: !0, 13: !0 },
                n = { 0: !0, 1: !0, 2: !0, 3: !0, 4: !0, 5: !0, 6: !0, 7: !0, 8: !0, 9: !0, 10: !0, 11: !0, 12: !0, 13: !0 },
                o = { 0: !0, 3: !0, 4: !0, 8: !0, 12: !0, 13: !0 },
                p = {},
                q = { 0: !0, 1: !0, 3: !0, 4: !0, 6: !0, 8: !0, 12: !0, 13: !0 },
                r = { 1: !0 },
                s = [
                    [],
                    ["1", "2", "3", "7", "8", "9", "4", "5", "6", "+", "-", "*", "/", "(", ")", "^", "!", "P", "C", "e", "0", ".", ",", "n"],
                    ["pi", "ln", "Pi"],
                    ["sin", "cos", "tan", "Del", "int", "Mod", "log", "pow"],
                    ["asin", "acos", "atan", "cosh", "root", "tanh", "sinh"],
                    ["acosh", "atanh", "asinh", "Sigma"]
                ];
            f.addToken = function(a) {
                for (i = 0; i < a.length; i++) {
                    x = a[i].token.length;
                    var b = -1;
                    if (x < s.length)
                        for (y = 0; y < s[x].length; y++)
                            if (a[i].token === s[x][y]) { b = g.indexOf(s[x][y]); break }
                    b === -1 ? (g.push(a[i].token), l.push(a[i].type), s.length <= a[i].token.length && (s[a[i].token.length] = []), s[a[i].token.length].push(a[i].token), j.push(a[i].value), h.push(a[i].show)) : (g[b] = a[i].token, l[b] = a[i].type, j[b] = a[i].value, h[b] = a[i].show)
                }
            }, f.lex = function(a, b) {
                "use strict";
                var c, i, t, u, v = [{ type: 4, value: "(", show: "(", pre: 0 }],
                    w = [],
                    x = a,
                    y = 0,
                    z = m,
                    A = 0,
                    B = p,
                    C = "";
                "undefined" != typeof b && f.addToken(b);
                var D = {};
                for (i = 0; i < x.length; i++)
                    if (" " != x[i]) {
                        c = "";
                        a: for (t = x.length - i > s.length - 2 ? s.length - 1 : x.length - i; t > 0; t--)
                            for (u = 0; u < s[t].length; u++)
                                if (e(x, s[t][u], i, t)) { c = s[t][u]; break a }
                        if (i += c.length - 1, "" === c) throw new f.exception("Can't understand after " + x.slice(i));
                        var E = g.indexOf(c),
                            F = c,
                            G = l[E],
                            H = j[E],
                            I = k[G],
                            J = h[E],
                            K = v[v.length - 1];
                        for (L = w.length; L--;)
                            if (0 === w[L] && [0, 2, 3, 5, 9, 11, 12, 13].indexOf(G) !== -1) {
                                if (z[G] !== !0) throw new f.exception(c + " is not allowed after " + C);
                                v.push({ value: ")", type: 5, pre: 0, show: ")" }), z = n, B = q, d(w, -1).pop()
                            }
                        if (z[G] !== !0) throw new f.exception(c + " is not allowed after " + C);
                        if (B[G] === !0 && (G = 2, H = f.math.mul, J = "&times;", I = 3, i -= c.length), D = { value: H, type: G, pre: I, show: J }, 0 === G) z = m, B = p, d(w, 2).push(2), v.push(D), v.push({ value: "(", type: 4, pre: 0, show: "(" });
                        else if (1 === G) 1 === K.type ? (K.value += H, d(w, 1)) : v.push(D), z = n, B = o;
                        else if (2 === G) z = m, B = p, d(w, 2), v.push(D);
                        else if (3 === G) v.push(D), z = n, B = q;
                        else if (4 === G) y += w.length, w = [], A++, z = m, B = p, v.push(D);
                        else if (5 === G) {
                            if (!A) throw new f.exception("Closing parenthesis are more than opening one, wait What!!!");
                            for (; y--;) v.push({ value: ")", type: 5, pre: 0, show: ")" });
                            y = 0, A--, z = n, B = q, v.push(D)
                        } else if (6 === G) {
                            if (K.hasDec) throw new f.exception("Two decimals are not allowed in one number");
                            1 !== K.type && (K = { value: 0, type: 1, pre: 0 }, v.push(K), d(w, -1)), z = r, d(w, 1), B = p, K.value += H, K.hasDec = !0
                        } else 7 === G && (z = n, B = q, d(w, 1), v.push(D));
                        8 === G ? (z = m, B = p, d(w, 4).push(4), v.push(D), v.push({ value: "(", type: 4, pre: 0, show: "(" })) : 9 === G ? (9 === K.type ? K.value === f.math.add ? (K.value = H, K.show = J, d(w, 1)) : K.value === f.math.sub && "-" === J && (K.value = f.math.add, K.show = "+", d(w, 1)) : 5 !== K.type && 7 !== K.type && 1 !== K.type && 3 !== K.type && 13 !== K.type ? "-" === F && (z = m, B = p, d(w, 2).push(2), v.push({ value: f.math.changeSign, type: 0, pre: 21, show: "-" }), v.push({ value: "(", type: 4, pre: 0, show: "(" })) : (v.push(D), d(w, 2)), z = m, B = p) : 10 === G ? (z = m, B = p, d(w, 2), v.push(D)) : 11 === G ? (z = m, B = p, v.push(D)) : 12 === G ? (z = m, B = p, d(w, 6).push(6), v.push(D), v.push({ value: "(", type: 4, pre: 0 })) : 13 === G && (z = n, B = q, v.push(D)), d(w, -1), C = c
                    }
                for (var L = w.length; L--;) 0 === w[L] && (v.push({ value: ")", show: ")", type: 5, pre: 3 }), d(w, -1).pop());
                if (z[5] !== !0) throw new f.exception("complete the expression");
                for (; A--;) v.push({ value: ")", show: ")", type: 5, pre: 3 });
                return v.push({ type: 5, value: ")", show: ")", pre: 0 }), new f(v)
            }, b.exports = f
        }, { "./math_function.js": 3 }],
        3: [function(a, b, c) {
            var d = function(a) { this.value = a };
            d.math = {
                isDegree: !0,
                acos: function(a) { return d.math.isDegree ? 180 / Math.PI * Math.acos(a) : Math.acos(a) },
                add: function(a, b) { return a + b },
                asin: function(a) { return d.math.isDegree ? 180 / Math.PI * Math.asin(a) : Math.asin(a) },
                atan: function(a) { return d.math.isDegree ? 180 / Math.PI * Math.atan(a) : Math.atan(a) },
                acosh: function(a) { return Math.log(a + Math.sqrt(a * a - 1)) },
                asinh: function(a) { return Math.log(a + Math.sqrt(a * a + 1)) },
                atanh: function(a) { return Math.log((1 + a) / (1 - a)) },
                C: function(a, b) {
                    var c = 1,
                        e = a - b,
                        f = b;
                    f < e && (f = e, e = b);
                    for (var g = f + 1; g <= a; g++) c *= g;
                    return c / d.math.fact(e)
                },
                changeSign: function(a) { return -a },
                cos: function(a) { return d.math.isDegree && (a = d.math.toRadian(a)), Math.cos(a) },
                cosh: function(a) { return (Math.pow(Math.E, a) + Math.pow(Math.E, -1 * a)) / 2 },
                div: function(a, b) { return a / b },
                fact: function(a) { if (a % 1 !== 0) return "NAN"; for (var b = 1, c = 2; c <= a; c++) b *= c; return b },
                inverse: function(a) { return 1 / a },
                log: function(a) { return Math.log(a) / Math.log(10) },
                mod: function(a, b) { return a % b },
                mul: function(a, b) { return a * b },
                P: function(a, b) { for (var c = 1, d = Math.floor(a) - Math.floor(b) + 1; d <= Math.floor(a); d++) c *= d; return c },
                Pi: function(a, b, c) { for (var d = 1, e = a; e <= b; e++) d *= Number(c.postfixEval({ n: e })); return d },
                pow10x: function(a) { for (var b = 1; a--;) b *= 10; return b },
                sigma: function(a, b, c) { for (var d = 0, e = a; e <= b; e++) d += Number(c.postfixEval({ n: e })); return d },
                sin: function(a) { return d.math.isDegree && (a = d.math.toRadian(a)), Math.sin(a) },
                sinh: function(a) { return (Math.pow(Math.E, a) - Math.pow(Math.E, -1 * a)) / 2 },
                sub: function(a, b) { return a - b },
                tan: function(a) { return d.math.isDegree && (a = d.math.toRadian(a)), Math.tan(a) },
                tanh: function(a) { return d.sinha(a) / d.cosha(a) },
                toRadian: function(a) { return a * Math.PI / 180 }
            }, d.exception = function(a) { this.message = a }, b.exports = d
        }, {}],
        4: [function(a, b, c) {
            var d = a("./lexer.js");
            d.prototype.toPostfix = function() {
                "use strict";
                for (var a, b, c, e, f, g = [], h = [{ value: "(", type: 4, pre: 0 }], i = this.value, j = 1; j < i.length; j++)
                    if (1 === i[j].type || 3 === i[j].type || 13 === i[j].type) 1 === i[j].type && (i[j].value = Number(i[j].value)), g.push(i[j]);
                    else if (4 === i[j].type) h.push(i[j]);
                else if (5 === i[j].type)
                    for (; 4 !== (b = h.pop()).type;) g.push(b);
                else if (11 === i[j].type) {
                    for (; 4 !== (b = h.pop()).type;) g.push(b);
                    h.push(b)
                } else {
                    a = i[j], e = a.pre, f = h[h.length - 1], c = f.pre;
                    var k = "Math.pow" == f.value && "Math.pow" == a.value;
                    if (e > c) h.push(a);
                    else {
                        for (; c >= e && !k || k && e < c;) b = h.pop(), f = h[h.length - 1], g.push(b), c = f.pre, k = "Math.pow" == a.value && "Math.pow" == f.value;
                        h.push(a)
                    }
                }
                return new d(g)
            }, b.exports = d
        }, { "./lexer.js": 2 }],
        5: [function(a, b, c) {
            var d = a("./postfix.js");
            d.prototype.postfixEval = function(a) {
                "use strict";
                a = a || {}, a.PI = Math.PI, a.E = Math.E;
                for (var b, c, e, f = [], g = this.value, h = "undefined" != typeof a.n, i = 0; i < g.length; i++) 1 === g[i].type ? f.push({ value: g[i].value, type: 1 }) : 3 === g[i].type ? f.push({ value: a[g[i].value], type: 1 }) : 0 === g[i].type ? "undefined" == typeof f[f.length - 1].type ? f[f.length - 1].value.push(g[i]) : f[f.length - 1].value = g[i].value(f[f.length - 1].value) : 7 === g[i].type ? "undefined" == typeof f[f.length - 1].type ? f[f.length - 1].value.push(g[i]) : f[f.length - 1].value = g[i].value(f[f.length - 1].value) : 8 === g[i].type ? (b = f.pop(), c = f.pop(), f.push({ type: 1, value: g[i].value(c.value, b.value) })) : 10 === g[i].type ? (b = f.pop(), c = f.pop(), "undefined" == typeof c.type ? (c.value = c.concat(b), c.value.push(g[i]), f.push(c)) : "undefined" == typeof b.type ? (b.unshift(c), b.push(g[i]), f.push(b)) : f.push({ type: 1, value: g[i].value(c.value, b.value) })) : 2 === g[i].type || 9 === g[i].type ? (b = f.pop(), c = f.pop(), "undefined" == typeof c.type ? (console.log(c), c = c.concat(b), c.push(g[i]), f.push(c)) : "undefined" == typeof b.type ? (b.unshift(c), b.push(g[i]), f.push(b)) : f.push({ type: 1, value: g[i].value(c.value, b.value) })) : 12 === g[i].type ? (b = f.pop(), "undefined" != typeof b.type && (b = [b]), c = f.pop(), e = f.pop(), f.push({ type: 1, value: g[i].value(e.value, c.value, new d(b)) })) : 13 === g[i].type && (h ? f.push({ value: a[g[i].value], type: 3 }) : f.push([g[i]]));
                if (f.length > 1) throw new d.exception("Uncaught Syntax error");
                return f[0].value > 1e15 ? "Infinity" : Number(f[0].value.toFixed(15)).toPrecision()
            }, d.eval = function(a, b, c) { return "undefined" == typeof b ? this.lex(a).toPostfix().postfixEval() : "undefined" == typeof c ? "undefined" != typeof b.length ? this.lex(a, b).toPostfix().postfixEval() : this.lex(a).toPostfix().postfixEval(b) : this.lex(a, b).toPostfix().postfixEval(c) }, b.exports = d
        }, { "./postfix.js": 4 }]
    }, {}, [1])(1)
});
// TODO: Fix error collecting.
//window.onerror = function(message, url, lineNumber) {
//  var data;
//
//  data = {
//  	'action': 'nf_log_js_error',
//  	'security': nfFrontEnd.ajaxNonce,
//  	'message': message,
//  	'url': url,
//  	'lineNumber': lineNumber
//  };
//
//  jQuery.ajax({
//	    url: nfFrontEnd.adminAjax,
//	    type: 'POST',
//	    data: data,
//	    cache: false,
//	   	success: function( data, textStatus, jqXHR ) {
//	   		try {
//		   		
//	   		} catch( e ) {
//	   			console.log( e );
//	   			console.log( 'Parse Error' );
//				console.log( e );
//	   		}
//
//	    },
//	    error: function( jqXHR, textStatus, errorThrown ) {
//	        // Handle errors here
//	        console.log('ERRORS: ' + errorThrown);
//			console.log( jqXHR );
//
//			try {
//			
//			} catch( e ) {
//				console.log( 'Parse Error' );
//			}
//		}
//	});
//  return false;
//};  

var nfRadio = Backbone.Radio;

nfRadio.channel('form').on('render:view', function() {
    jQuery('.g-recaptcha').each(function() {
        var callback = jQuery(this).data('callback');
        var fieldID = jQuery(this).data('fieldid');
        if (typeof window[callback] !== 'function') {
            window[callback] = function(response) {
                nfRadio.channel('recaptcha').request('update:response', response, fieldID);
            };
        }
    });
});

var nfRecaptcha = Marionette.Object.extend({
    initialize: function() {
        /*
         * If we've already rendered our form view, render our recaptcha fields.
         */
        if (0 != jQuery('.g-recaptcha').length) {
            this.renderCaptcha();
        }
        /*
         * We haven't rendered our form view, so hook into the view render radio message, and then render.
         */
        this.listenTo(nfRadio.channel('form'), 'render:view', this.renderCaptcha);
        this.listenTo(nfRadio.channel('captcha'), 'reset', this.renderCaptcha);
    },

    renderCaptcha: function() {
        jQuery('.g-recaptcha').each(function() {
            var opts = {
                fieldid: jQuery(this).data('fieldid'),
                size: jQuery(this).data('size'),
                theme: jQuery(this).data('theme'),
                sitekey: jQuery(this).data('sitekey'),
                callback: jQuery(this).data('callback')
            };

            var grecaptchaID = grecaptcha.render(jQuery(this)[0], opts);

            if (opts.size === 'invisible') {
                try {
                    grecaptcha.execute(grecaptchaID);
                } catch (e) {
                    console.log('Notice: Error trying to execute grecaptcha.');
                }
            }
        });
    }

});

var nfRenderRecaptcha = function() {
    new nfRecaptcha();
}