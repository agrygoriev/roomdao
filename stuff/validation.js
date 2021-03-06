! function() {
    function a() {
        void 0 !== window.jQuery && (ml_jQuery = window.jQuery.noConflict(!0)), b()
    }

    function b() {
        var a = ["//static.mailerlite.com/js/w/ml_jQuery.inputmask.bundle.min.js?v3.3.1"];
        for (var b in a)
            if (a.hasOwnProperty(b)) {
                var d = document.createElement("script");
                d.setAttribute("type", "text/javascript"), d.setAttribute("src", a[b]), b == a.length - 1 && (d.onload = c, d.onreadystatechange = function() {
                    "complete" != this.readyState && "loaded" != this.readyState || c()
                }), document.getElementsByTagName("head")[0].appendChild(d)
            }
    }

    function c() {
        ml_jQuery(".ml-subscribe-form form").each(function() {
            var a = ml_jQuery(this),
                b = ml_jQuery(this).closest(".ml-subscribe-form"),
                c = a.data("code"),
                e = (window.webform_data && window.webform_data[c] && window.webform_data[c], ml_jQuery(this).find("button.primary")),
                f = ml_jQuery(this).find("button.loading"),
                g = f.length > 0;
            if (a.find(".ml-validate-date input").inputmask(void 0, {
                    oncomplete: function() {
                        ml_jQuery(this).closest(".ml-validate-date").addClass("ml-validate-date-valid")
                    },
                    onincomplete: function() {
                        ml_jQuery(this).closest(".ml-validate-date").removeClass("ml-validate-date-valid")
                    },
                    oncleared: function() {
                        ml_jQuery(this).closest(".ml-validate-date").removeClass("ml-validate-date-valid")
                    },
                    onKeyValidation: function(a, b) {
                        ml_jQuery(this).closest(".ml-validate-date").removeClass("ml-validate-date-valid")
                    }
                }), a.find(".ml-validate-phone input").inputmask(void 0, {
                    oncomplete: function() {
                        ml_jQuery(this).closest(".ml-validate-phone").addClass("ml-validate-phone-valid")
                    },
                    onincomplete: function() {
                        ml_jQuery(this).closest(".ml-validate-phone").removeClass("ml-validate-phone-valid")
                    },
                    oncleared: function() {
                        ml_jQuery(this).closest(".ml-validate-phone").removeClass("ml-validate-phone-valid")
                    },
                    onKeyValidation: function(a, b) {
                        ml_jQuery(this).closest(".ml-validate-phone").removeClass("ml-validate-phone-valid")
                    }
                }), void 0 === a.data("ml-submit-bound") || !a.data("ml-submit-bound")) {
                a.data("ml-submit-bound", 1), b.find(".ml-block-success").bind("click", function() {
                    b.find(".ml-block-success").hide(), b.find(".ml-block-form").find('input[type="text"]').val("");
                    var a = b.find(".ml-block-form").find('input[type="checkbox"]');
                    void 0 !== a.prop ? a.prop("checked", !1) : a.attr("checked", !1), b.find(".ml-block-form").show()
                }), ml_jQuery(":submit", a).click(function() {
                    a.find('input[type="hidden"].ml-submit-hidden-value').remove(), ml_jQuery(this).attr("name") && a.append(ml_jQuery('<input type="hidden" class="ml-submit-hidden-value">').attr({
                        name: ml_jQuery(this).attr("name"),
                        value: ml_jQuery(this).attr("value")
                    }))
                }), a.bind("submit", function(c) {
                    if (c.preventDefault(), a.data("loading")) return !1;
                    if (a.find(".ml-error").removeClass("ml-error"), d(a)) {
                        g && (e.hide(), f.show());
                        var h = a.serialize();
                        h += "&ajax=1";
                        var i = a.attr("action");
                        a.data("loading", !0), ml_jQuery.ajax({
                            type: "GET",
                            url: i,
                            data: h,
                            dataType: "jsonp",
                            success: function(c) {
                                if (a.data("loading", !1), g && (e.show(), f.hide()), c.success) {
                                    "function" == typeof window.ml_webform_after_success && window.ml_webform_after_success();
                                    var d = "ml_webform_success_" + b.attr("id").substr(5);
                                    "function" == typeof window[d] ? window[d]() : (b.find(".ml-block-success").show(), b.find(".ml-block-form").hide()), window != window.parent && window.parent.postMessage("mlWebformSubmitSuccess-" + b.attr("id").substr(5), "*")
                                } else void 0 !== c.errors && (void 0 !== c.errors.groups && c.errors.groups && a.find(".ml-block-groups").addClass("ml-error"), void 0 !== c.errors.fields && c.errors.fields && ml_jQuery.each(c.errors.fields, function(b, c) {
                                    a.find(".ml-field-" + b).addClass("ml-error")
                                }))
                            },
                            error: function(b, c, d) {
                                a.data("loading", !1), g && (e.show(), f.hide())
                            }
                        })
                    }
                });
                var h = a.attr("data-id"),
                    i = a.attr("data-code");
                h && ((new Image).src = "https://track.mailerlite.com/webforms/o/" + h + "/" + i + "?v" + Math.floor(Date.now() / 1e3))
            }
            window != window.parent && (ml_jQuery(document).on("click", ".overlay, .ml-subscribe-close", function() {
                window.parent.postMessage("mlCloseIframe-" + a.data("code"), "*")
            }), ml_jQuery(".ml-subscribe-form").bind("click", function(a) {
                var b = a.target || a.srcElement;
                ml_jQuery(b).is("div.ml-subscribe-close") || a.stopPropagation()
            }))
        })
    }

    function d(a) {
        var b = !0;
        return a.find(".ml-validate-required").each(function(a, c) {
            var d = !1;
            ml_jQuery(c).find('input[type="text"], input[type="email"], select').each(function(a, b) {
                void 0 !== ml_jQuery(b).val() && "" !== ml_jQuery(b).val() && (d = !0)
            }), ml_jQuery(c).find('input[type="checkbox"]').each(function(a, b) {
                void 0 !== ml_jQuery(b).prop ? ml_jQuery(b).prop("checked") && (d = !0) : ml_jQuery(b).attr("checked") && (d = !0)
            }), d || (ml_jQuery(c).addClass("ml-error"), b = !1)
        }), a.find(".ml-validate-email").each(function(a, c) {
            var d = !0;
            ml_jQuery(c).find('input[type="text"], input[type="email"]').each(function(a, b) {
                void 0 === ml_jQuery(b).val() || "" === ml_jQuery(b).val() || e(ml_jQuery(b).val()) || (d = !1)
            }), d || (ml_jQuery(c).addClass("ml-error"), b = !1)
        }), a.find(".ml-validate-date").each(function(a, c) {
            var d = !0;
            ml_jQuery(c).find('input[type="text"]').each(function(a, b) {
                void 0 === ml_jQuery(b).val() || "" === ml_jQuery(b).val() || ml_jQuery(c).hasClass("ml-validate-date-valid") || (d = !1)
            }), d || (ml_jQuery(c).addClass("ml-error"), b = !1)
        }), a.find(".ml-validate-phone").each(function(a, c) {
            var d = !0;
            ml_jQuery(c).find('input[type="text"]').each(function(a, b) {
                void 0 === ml_jQuery(b).val() || "" === ml_jQuery(b).val() || ml_jQuery(c).hasClass("ml-validate-phone-valid") || (d = !1)
            }), d || (ml_jQuery(c).addClass("ml-error"), b = !1)
        }), b
    }

    function e(a) {
        return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]){2,40}$/.test(a.trim())
    }
    if (void 0 !== window.ml_jQuery) return void b();
    if (void 0 !== window.jQuery) return window.ml_jQuery = window.jQuery, void b();
    var f = document.createElement("script");
    f.setAttribute("type", "text/javascript"), f.setAttribute("src", "//cdn.mailerlite.com/ajax/libs/jquery/1.8.3/jquery.min.js"), f.onload = a, f.onreadystatechange = function() {
        "complete" != this.readyState && "loaded" != this.readyState || a()
    }, document.getElementsByTagName("head")[0].appendChild(f)
}();