! function(e) {
    function a(e, t) { var i = e.find(".premium-progressbar-container"),
            a = i.data("settings"),
            n = a.progress_length,
            r = a.speed,
            o = a.type; if ("line" === o) { var l = i.find(".premium-progressbar-bar");
            a.gradient && l.css("background", "linear-gradient(-45deg, " + a.gradient + ")"), l.animate({ width: n + "%" }, r) } else if ("circle" === o) 100 < n && (n = 100), i.prop({ counter: 0 }).animate({ counter: n }, { duration: r, easing: "linear", step: function(e) { var t = 3.6 * e;
                i.find(".premium-progressbar-right-label span").text(Math.ceil(e) + "%"), i.find(".premium-progressbar-circle-left").css("transform", "rotate(" + t + "deg)"), 180 < t && (i.find(".premium-progressbar-circle").css({ "-webkit-clip-path": "inset(0)", "clip-path": "inset(0)" }), i.find(".premium-progressbar-circle-right").css("visibility", "visible")) } });
        else { l = i.find(".premium-progressbar-bar-wrap"); var s = i.outerWidth(),
                d = a.dot || 25,
                m = a.spacing || 10,
                c = Math.ceil(s / (d + m)),
                u = c * (n / 100),
                p = Math.floor(u),
                f = 100 * (u - p);
            l.attr("data-circles", c), l.attr("data-total-fill", p), l.attr("data-partial-fill", f); for (var h = "progress-segment", g = 0; g < c; g++) { h = "progress-segment"; var v = "";
                g < p ? v = "<div class='segment-inner'></div>" : g === p && (v = "<div class='segment-inner'></div>"), l.append("<div class='" + h + "'>" + v + "</div>") } "frontend" !== t && y(e) } }

    function t(e, t) { var i = e.find(".premium-progressbar-container").data("settings").type; "dots" === i && a(e, "frontend"), elementorFrontend.waypoint(e, function() {
            ("dots" !== i ? a : y)(t(this)) }, { offset: Waypoint.viewportHeight() - 150, triggerOnce: !0 }) }

    function i(e, t) { var i, a, n = e.find(".premium-video-box-container"),
            r = n.find(".premium-video-box-video-container"),
            o = (n.find(".premium-video-box-inner-wrap"), n.data("type")),
            l = n.data("thumbnail");

        function s() { if (!n.hasClass("playing")) { if (n.addClass("playing"), "self" === o) t(i).get(0).play(), r.css({ opacity: "1", visibility: "visible" });
                else { var e = t("<iframe/>");
                    checkRel = a.indexOf("rel=0"), e.attr("src", a), e.attr("frameborder", "0"), e.attr("allowfullscreen", "1"), e.attr("allow", "autoplay;encrypted-media;"), r.css("background", "#000"), r.html(e) }
                n.find(".premium-video-box-image-container, .premium-video-box-play-icon-container, .premium-video-box-description-container").remove(), "vimeo" === o && n.find(".premium-video-box-vimeo-wrap").remove() } } "self" === o ? (i = r.find("video"), a = i.attr("src")) : (a = r.data("src"), l && -1 === a.indexOf("autoplay=1") ? a += "&autoplay=1" : s()), n.on("click", function() { s() }) }

    function n(t, l) { var a = t.find(".premium-gallery-container"),
            s = a.data("settings"),
            e = s.img_size,
            i = elementorFrontend.getCurrentDeviceMode(),
            n = s.load_more,
            r = null,
            o = null,
            d = !1,
            m = s.minimum,
            c = s.click_images,
            u = m,
            p = s.ltr_mode,
            f = s.shuffle; if ("metro" === e) { var h = a.width(),
                g = Math.floor(h / 12),
                v = null;

            function y() { i = elementorFrontend.getCurrentDeviceMode(), h = a.width(), g = Math.floor(h / 12), v = "", "tablet" === i ? v = "_tablet" : "mobile" === i && (v = "_mobile"), a.find(".premium-gallery-item").each(function(e, t) { var i = l(t).data("metro")["cells" + v],
                        a = l(t).data("metro")["vcells" + v]; "" != i && null != i || (i = l(t).data("metro").cells), "" != a && null != a || (a = l(t).data("metro").vcells), l(t).css({ width: Math.ceil(i * g), height: Math.ceil(a * g) }) }), r = g }
            y(), e = "masonry", l(window).resize(function() { y(), b.isotope({ itemSelector: ".premium-gallery-item", masonry: { columnWidth: r } }) }) } var b = a.isotope({ itemSelector: ".premium-gallery-item", percentPosition: !0, animationOptions: { duration: 750, easing: "linear" }, filter: s.active_cat, layoutMode: e, originLeft: p, masonry: { columnWidth: r }, sortBy: s.sort_by }); if (b.imagesLoaded().progress(function() { b.isotope("layout") }), l(window).on("load", function() { b.isotope("layout") }), n && (a.parent().find(".premium-gallery-load-more div").addClass("premium-gallery-item-hidden"), a.find(".premium-gallery-item").length > m)) {
            function w(e) { var t = a.data("isotope");
                a.find(".premium-gallery-item-hidden").removeClass("premium-gallery-item-hidden"), a.parent().find(".premium-gallery-load-more").removeClass("premium-gallery-item-hidden"); var i = t.filteredItems.slice(e, t.filteredItems.length).map(function(e) { return e.element });
                l(i).addClass("premium-gallery-item-hidden"), b.isotope("layout"), 0 == i && a.parent().find(".premium-gallery-load-more").addClass("premium-gallery-item-hidden") }
            a.parent().find(".premium-gallery-load-more").removeClass("premium-gallery-item-hidden"), a.find(".premium-gallery-item:gt(" + (m - 1) + ")").addClass("premium-gallery-item-hidden"), a.parent().on("click", ".premium-gallery-load-more-btn", function() { d ? (u = m, d = !1) : u = u, u += c, l.ajax({ url: w(u), beforeSend: function() { a.parent().find(".premium-gallery-load-more div").removeClass("premium-gallery-item-hidden") }, success: function() { a.parent().find(".premium-gallery-load-more div").addClass("premium-gallery-item-hidden") } }) }) } "yes" !== s.light_box && a.find(".premium-gallery-video-wrap").each(function(e, r) { var o = l(r).data("type");
            l(r).closest(".premium-gallery-item").on("click", function() { var e = l(this); if (e.find(".pa-gallery-img-container").css("background", "#000"), e.find("img, .pa-gallery-icons-caption-container, .pa-gallery-icons-wrapper").css("visibility", "hidden"), "style3" !== s.skin && e.find(".premium-gallery-caption").css("visibility", "hidden"), "hosted" !== o) { var t = e.find(".premium-gallery-iframe-wrap"),
                        i = t.data("src");
                    i = i.replace("&mute", "&autoplay=1&mute"); var a = l("<iframe/>");
                    a.attr("src", i), a.attr("frameborder", "0"), a.attr("allowfullscreen", "1"), a.attr("allow", "autoplay;encrypted-media;"), t.html(a), a.css("visibility", "visible") } else { var n = l(r).find("video");
                    n.get(0).play(), n.css("visibility", "visible") } }) }), t.find(".premium-gallery-cats-container li a").click(function(e) { return e.preventDefault(), d = !0, t.find(".premium-gallery-cats-container li .active").removeClass("active"), l(this).addClass("active"), o = l(this).attr("data-filter"), b.isotope({ filter: o }), f && b.isotope("shuffle"), n && w(m), !1 }), "default" === s.lightbox_type && t.find(".premium-img-gallery a[data-rel^='prettyPhoto']").prettyPhoto({ theme: s.theme, hook: "data-rel", opacity: .7, show_title: !1, deeplinking: !1, overlay_gallery: s.overlay, custom_markup: "", default_width: 900, default_height: 506, social_tools: "" }) }

    function r(e, a) { var n = e.find(".premium-counter");
        elementorFrontend.waypoint(n, function() { var e = n.data(),
                t = n.find(".premium-counter-init"),
                i = n.find(".icon");
            a(t).numerator(e), a(i).addClass("animated " + i.data("animation")) }) }

    function o(e, t) { var l = e.find(".premium-fancy-text-wrapper"),
            s = l.data("settings"); if ("typing" === s.effect) { var i = [];
            s.strings.forEach(function(e) { i.push(e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")) }), l.find(".premium-fancy-text").typed({ strings: i, typeSpeed: s.typeSpeed, backSpeed: s.backSpeed, startDelay: s.startDelay, backDelay: s.backDelay, showCursor: s.showCursor, cursorChar: s.cursorChar, loop: s.loop }) } else if ("slide" === s.effect) l.find(".premium-fancy-text").vTicker({ speed: s.speed, showItems: s.showItems, pause: s.pause, mousePause: s.mousePause, direction: "up" });
        else {! function() { var t = l.find(".premium-fancy-list-items"),
                    i = 1,
                    e = s.delay || 2500,
                    a = s.count; if (a) var n = 1,
                    r = l.find(".premium-fancy-list-items").length; var o = setInterval(function() { var e = ""; "custom" === s.effect && (e = "animated " + s.animation), t.eq(i).addClass("premium-fancy-item-visible " + e).removeClass("premium-fancy-item-hidden"), t.filter(function(e) { return e !== i }).addClass("premium-fancy-item-hidden").removeClass("premium-fancy-item-visible " + e), i++, t.length === i && (i = 0), a && r * a === ++n && clearInterval(o) }, e) }() } }

    function l(e, r) { e.find(".premium-countdown").each(function() { var e = r(this).data("settings"),
                t = e.label1,
                i = e.label2,
                a = t.split(","),
                n = i.split(","); "onExpiry" === e.event ? r(this).find(".premium-countdown-init").pre_countdown({ labels: n, labels1: a, until: new Date(e.until), format: e.format, padZeroes: !0, timeSeparator: e.separator, onExpiry: function() { r(this).html(e.text) }, serverSync: function() { return new Date(e.serverSync) } }) : "expiryUrl" === e.event && r(this).find(".premium-countdown-init").pre_countdown({ labels: n, labels1: a, until: new Date(e.until), format: e.format, padZeroes: !0, timeSeparator: e.separator, expiryUrl: e.text, serverSync: function() { return new Date(e.serverSync) } }), times = r(this).find(".premium-countdown-init").pre_countdown("getTimes"), times.every(function(e) { return 0 == e }) && ("onExpiry" === e.event && r(this).find(".premium-countdown-init").html(e.text), "expiryUrl" === e.event && (0 < r("body").find("#elementor").length ? r(this).find(".premium-countdown-init").html("<h1>You can not redirect url from elementor Editor!!</h1>") : window.location.href = e.text)) }) }

    function s(e, c) { var u = e.find(".premium-carousel-wrapper"),
            p = c(u).data("settings");

        function n(e) { var t = u.find(".premium-carousel-template"); "init" === e && (t = t.not(".slick-current")), t.find(".animated").each(function(e, t) { var i = c(t).data("settings"); if (i && (i._animation || i.animation)) { var a = i._animation || i.animation;
                    c(t).removeClass("animated " + a).addClass("elementor-invisible") } }) } if (elementorFrontend.isEditMode() && u.find(".item-wrapper").each(function(e, i) { var t = c(i).data("template");
                void 0 !== t && c.ajax({ type: "GET", url: PremiumSettings.ajaxurl, dataType: "html", data: { action: "get_elementor_template_content", templateID: t } }).success(function(e) { var t = JSON.parse(e).data;
                    void 0 !== t.template_content && (c(i).html(t.template_content), u.find(".premium-carousel-inner").slick("refresh")) }) }), u.on("init", function(e) { e.preventDefault(), setTimeout(function() { n("init") }, 500), c(this).find("item-wrapper.slick-active").each(function() { var e = c(this);
                    e.addClass(e.data("animation")) }), c(".slick-track").addClass("translate") }), u.find(".premium-carousel-inner").slick({ vertical: p.vertical, slidesToScroll: p.slidesToScroll, slidesToShow: p.slidesToShow, responsive: [{ breakpoint: p.tabletBreak, settings: { slidesToShow: p.slidesTab, slidesToScroll: p.slidesTab } }, { breakpoint: p.mobileBreak, settings: { slidesToShow: p.slidesMob, slidesToScroll: p.slidesMob } }], useTransform: !0, fade: p.fade, infinite: p.infinite, speed: p.speed, autoplay: p.autoplay, autoplaySpeed: p.autoplaySpeed, draggable: p.draggable, touchMove: p.touchMove, rtl: p.rtl, adaptiveHeight: p.adaptiveHeight, pauseOnHover: p.pauseOnHover, centerMode: p.centerMode, centerPadding: p.centerPadding, arrows: p.arrows, nextArrow: p.nextArrow, prevArrow: p.prevArrow, dots: p.dots, customPaging: function() { return '<i class="' + p.customPaging + '" ></i > ' } }), u.on("afterChange", function(e, t, i) { var a, n, r = t.options.slidesToScroll,
                    o = (a = t.options.slidesToShow, (n = c(window).width()) > p.tabletBreak && (a = p.slidesDesk), n <= p.tabletBreak && (a = p.slidesTab), n <= p.mobileBreak && (a = p.slidesMob), a),
                    l = t.options.centerMode,
                    s = i + o - 1; if (u.find(".slick-active .elementor-invisible").each(function(e, t) { var i = c(t).data("settings"); if (i && (i._animation || i.animation)) { var a = i._animation_delay ? i._animation_delay : 0,
                                n = i._animation || i.animation;
                            setTimeout(function() { c(t).removeClass("elementor-invisible").addClass(n + " animated") }, a) } }), 1 === r) { if (!0 == !l) { var d = c(this).find("[data-slick-index='" + s + "']"); "null" != p.animation && d.find("p, h1, h2, h3, h4, h5, h6, span, a, img, i, button").addClass(p.animation).removeClass("premium-carousel-content-hidden") } } else
                    for (var m = r + i; 0 <= m; m--) d = c(this).find("[data-slick-index='" + m + "']"), "null" != p.animation && d.find("p, h1, h2, h3, h4, h5, h6, span, a, img, i, button").addClass(p.animation).removeClass("premium-carousel-content-hidden") }), u.on("beforeChange", function(e, t, i) { n(); var a = c(this).find("[data-slick-index='" + i + "']"); "null" != p.animation && a.siblings().find("p, h1, h2, h3, h4, h5, h6, span, a, img, i, button").removeClass(p.animation).addClass("premium-carousel-content-hidden") }), p.vertical) { var t = -1;
            elementorFrontend.elements.$window.on("load", function() { u.find(".slick-slide").each(function() { c(this).height() > t && (t = c(this).height()) }), u.find(".slick-slide").each(function() { c(this).height() < t && c(this).css("margin", Math.ceil((t - c(this).height()) / 2) + "px 0") }) }) } var i = { element: c("a.ver-carousel-arrow"), getWidth: function() { return this.element.outerWidth() / 2 }, setWidth: function(e) { "vertical" == (e = e || "vertical") ? this.element.css("margin-left", "-" + this.getWidth() + "px"): this.element.css("margin-top", "-" + this.getWidth() + "px") } };
        i.setWidth(), i.element = c("a.carousel-arrow"), i.setWidth("horizontal") }

    function d(e, t) { var i = e.find(".premium-banner"),
            a = i.find("img"); if (i.data("box-tilt")) { var n = i.data("box-tilt-reverse");
            UniversalTilt.init({ elements: i, settings: { reverse: n }, callbacks: { onMouseLeave: function(e) { e.style.boxShadow = "0 45px 100px rgba(255, 255, 255, 0)" }, onDeviceMove: function(e) { e.style.boxShadow = "0 45px 100px rgba(255, 255, 255, 0.3)" } } }) }
        i.find(".premium-banner-ib").hover(function() { a.addClass("active") }, function() { a.removeClass("active") }) }

    function m(e, t) { var i = e.find(".premium-modal-box-container"),
            a = i.data("settings"); "pageload" === a.trigger && t(document).ready(function(e) { setTimeout(function() { i.find(".premium-modal-box-modal").modal() }, 1e3 * a.delay) }) }

    function c(i, a) { var n = i.find(".premium-blog-wrap"),
            e = n.find(".premium-blog-post-outer-container"),
            t = n.data("carousel"),
            r = n.data("grid"),
            o = n.data("layout"); if (1 === e.first().find(".premium-blog-meta-separator").length ? e.find(".premium-blog-meta-separator").remove() : e.find(".fa-user").length || e.each(function(e, t) { a(t).find(".premium-blog-meta-separator").first().remove() }), i.find(".premium-blog-cats-container li a").click(function(e) { e.preventDefault(), i.find(".premium-blog-cats-container li .active").removeClass("active"), a(this).addClass("active"); var t = a(this).attr("data-filter"); return n.isotope({ filter: t, layoutMode: "even" === o ? "fitRows" : "masonry" }), !1 }), "masonry" === o && !t) { var l = i.find(".category.active").data("filter");
            n.imagesLoaded(function() { n.isotope({ itemSelector: ".premium-blog-post-outer-container", percentPosition: !0, filter: l, animationOptions: { duration: 750, easing: "linear", queue: !1 } }) }) } if (t && r) { var s = n.data("play"),
                d = n.data("speed"),
                m = n.data("fade"),
                c = n.data("center"),
                u = n.data("slides-spacing"),
                p = n.data("arrows"),
                f = n.data("dots"),
                h = n.data("col"),
                g = n.data("col-tablet"),
                v = n.data("col-mobile"),
                y = null,
                b = null;
            p ? (y = '<a type="button" data-role="none" class="carousel-arrow carousel-prev" aria-label="Next" role="button" style=""><i class="fas fa-angle-left" aria-hidden="true"></i></a>', b = '<a type="button" data-role="none" class="carousel-arrow carousel-next" aria-label="Next" role="button" style=""><i class="fas fa-angle-right" aria-hidden="true"></i></a>') : y = "", a(n).slick({ infinite: !0, slidesToShow: h, slidesToScroll: h, responsive: [{ breakpoint: 1025, settings: { slidesToShow: g, slidesToScroll: 1 } }, { breakpoint: 768, settings: { slidesToShow: v, slidesToScroll: 1 } }], autoplay: s, autoplaySpeed: d, nextArrow: b, prevArrow: y, fade: m, centerMode: c, centerPadding: u + "px", draggable: !0, dots: f, customPaging: function() { return '<i class="fas fa-circle"></i>' } }) } if ("even" === o && n.data("equal")) { var w = new Array;
            n.find(".premium-blog-content-wrapper").each(function(e, t) { var i = a(t).outerHeight();
                w.push(i) }); var x = Math.max.apply(null, w);
            n.find(".premium-blog-content-wrapper").css("height", x + "px") } }

    function u(e, t) { var i = e.find(".premium-image-scroll-container"),
            a = i.find(".premium-image-scroll-overlay"),
            n = i.find(".premium-image-scroll-vertical"),
            r = i.data("settings"),
            o = i.find("img"),
            l = r.direction,
            s = r.reverse,
            d = null;

        function m() { o.css("transform", ("vertical" === l ? "translateY" : "translateX") + "( -" + d + "px)") }

        function c() { o.css("transform", ("vertical" === l ? "translateY" : "translateX") + "(0px)") }

        function u() { d = "vertical" === l ? o.height() - i.height() : o.width() - i.width() } "scroll" === r.trigger ? (i.addClass("premium-container-scroll"), "vertical" === l ? n.addClass("premium-image-scroll-ver") : i.imagesLoaded(function() { a.css({ width: o.width(), height: o.height() }) })) : ("yes" === s && i.imagesLoaded(function() { i.addClass("premium-container-scroll-instant"), u(), m() }), "vertical" === l && n.removeClass("premium-image-scroll-ver"), i.mouseenter(function() { i.removeClass("premium-container-scroll-instant"), u(), ("yes" === s ? c : m)() }), i.mouseleave(function() {
            ("yes" === s ? m : c)() })) }

    function p(e, t) { var i = e.find(".premium-cf7-container").find('input[type="text"], input[type="email"], textarea, input[type="password"], input[type="date"], input[type="number"], input[type="tel"], input[type="file"], input[type="url"]');
        i.wrap("<span class='wpcf7-span'>"), i.on("focus blur", function() { t(this).closest(".wpcf7-span").toggleClass("is-focused") }) }

    function f(e, i) { var t = e.find(".multiple-persons"); if (t.length) { if (t.data("carousel")) { var a = t.data("play"),
                    n = t.data("speed"),
                    r = t.data("rtl"),
                    o = t.data("col");
                t.slick({ infinite: !0, slidesToShow: o, slidesToScroll: o, responsive: [{ breakpoint: 1025, settings: { slidesToShow: 1, slidesToScroll: 1 } }, { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } }], autoplay: a, autoplaySpeed: n, rtl: r, nextArrow: '<a type="button" data-role="none" class="carousel-arrow carousel-next" aria-label="Next" role="button" style=""><i class="fas fa-angle-right" aria-hidden="true"></i></a>', prevArrow: '<a type="button" data-role="none" class="carousel-arrow carousel-prev" aria-label="Next" role="button" style=""><i class="fas fa-angle-left" aria-hidden="true"></i></a>', draggable: !0, pauseOnHover: !0 }) } if (!t.hasClass("premium-person-style1") && "yes" === t.data("persons-equal")) { var l = new Array;
                t.find(".premium-person-container").each(function(e, t) { i(t).imagesLoaded(function() {}).done(function() { var e = i(t).find(".premium-person-image-container").outerHeight();
                        l.push(e) }) }), t.imagesLoaded(function() {}).done(function() { var e = Math.max.apply(null, l);
                    t.find(".premium-person-image-wrap").css("height", e + "px") }) } } }

    function h(e, a) { var t = e.find(".premium-title-container"),
            i = t.find(".premium-title-text"); if (t.hasClass("style9") && e.find(".premium-title-style9").each(function() { var e = a(this),
                    t = 1e3 * e.attr("data-blur-delay");
                e.attr("data-animation-blur", "process"), e.find(".premium-title-style9-letter").each(function(e, t) { var i;
                    e += 1, i = a("body").hasClass("rtl") ? .2 / e + "s" : e / 20 + "s", a(t).css({ "-webkit-animation-delay": i, "animation-delay": i }) }), setInterval(function() { e.attr("data-animation-blur", "done"), setTimeout(function() { e.attr("data-animation-blur", "process") }, 150) }, t) }), t.hasClass("style8")) { var n = 1e3 * i.attr("data-shiny-delay"),
                r = 1e3 * i.attr("data-shiny-dur");! function e() { i.get(0).setAttribute("data-animation", "shiny"), setTimeout(function() { i.removeAttr("data-animation") }, r), setTimeout(e, n) }() } }

    function g(e, i) { var a = e.find(".premium-icon-list-box");
        a.find(".premium-icon-list-content").each(function(e, t) { if (a.data("list-animation") && " " != a.data("list-animation")) new Waypoint({ element: t, handler: function() { var e = i(this.element),
                        t = e.data("delay");
                    setTimeout(function() { e.next(".premium-icon-list-divider , .premium-icon-list-divider-inline").css("opacity", "1"), e.next(".premium-icon-list-divider-inline , .premium-icon-list-divider").addClass("animated " + a.data("list-animation")), e.css("opacity", "1"), e.addClass("animated " + a.data("list-animation")) }, t), this.destroy() }, offset: Waypoint.viewportHeight() - 150 }) }) } var y = function(e) { var t = e.find(".premium-progressbar-container").data("settings"),
            n = e.find(".premium-progressbar-bar-wrap"),
            i = n.data(),
            r = t.speed,
            o = 0,
            l = i.totalFill,
            s = i.circles,
            d = i.partialFill;! function e(t) { var i = n.find(".progress-segment").eq(t),
                a = 100;
            t === l && (a = d);
            i.find(".segment-inner").animate({ width: a + "%" }, r / s, function() {++o <= l && e(o) }) }(o) };
    e(window).on("elementor/frontend/init", function() { elementorFrontend.hooks.addAction("frontend/element_ready/premium-addon-video-box.default", i), elementorFrontend.hooks.addAction("frontend/element_ready/premium-img-gallery.default", n), elementorFrontend.hooks.addAction("frontend/element_ready/premium-addon-fancy-text.default", o), elementorFrontend.hooks.addAction("frontend/element_ready/premium-counter.default", r), elementorFrontend.hooks.addAction("frontend/element_ready/premium-addon-title.default", h), elementorFrontend.hooks.addAction("frontend/element_ready/premium-countdown-timer.default", l), elementorFrontend.hooks.addAction("frontend/element_ready/premium-carousel-widget.default", s), elementorFrontend.hooks.addAction("frontend/element_ready/premium-addon-banner.default", d), elementorFrontend.hooks.addAction("frontend/element_ready/premium-addon-modal-box.default", m), elementorFrontend.hooks.addAction("frontend/element_ready/premium-addon-blog.default", c), elementorFrontend.hooks.addAction("frontend/element_ready/premium-image-scroll.default", u), elementorFrontend.hooks.addAction("frontend/element_ready/premium-contact-form.default", p), elementorFrontend.hooks.addAction("frontend/element_ready/premium-addon-person.default", f), elementorFrontend.hooks.addAction("frontend/element_ready/premium-icon-list.default", g), elementorFrontend.isEditMode() ? elementorFrontend.hooks.addAction("frontend/element_ready/premium-addon-progressbar.default", a) : elementorFrontend.hooks.addAction("frontend/element_ready/premium-addon-progressbar.default", t) }) }(jQuery);