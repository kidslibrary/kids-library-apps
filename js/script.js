// Modals
var common = {
    'open': function (value) {
        location.href = value;
    },
    'setLang': function (value) {
        common.setCookie('lang', value, 365);
        location.reload();
    },
    'setCookie': function (cookieName, cookieValue, nDays) {
        var today = new Date();
        var expire = new Date();

        if (!nDays)
            nDays = 1;

        expire.setTime(today.getTime() + 3600000 * 24 * nDays);
        document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + expire.toGMTString();
    },
    'openModal': function (class_name) {
        $('#' + class_name).arcticmodal();
    },
    'promo': function (str) {
        $.ajax({
            url: '/ajax/promo.php',
            type: 'post',
            data: $(str).serialize(),
            beforeSend: function () {
                $('.promo__loader').show();
            },
            complete: function () {
                $('.promo__loader').hide();
            },
            success: function (json) {
                if(json){
                    $(str).parent('.promo__body').find('.promo__message').css('display','block').html(json);

                    if(json == 'Код успешно активирован'){
                        //console.log(json);
                        yaCounter36549430.reachGoal('promocode');
                    }
                }
            }
        });
        return false;
    },
    'callback': function (str) {
        $.ajax({
            url: '/ajax/form.php',
            type: 'post',
            data: $(str).serialize(),
            beforeSend: function () {
                $('.support__loader').show();
				$(str).find('[type="submit"]').hide();
            },
            complete: function () {
                $('.support__loader').hide();
				$(str).find('[type="submit"]').show();
            },
            success: function (json) {
                if(json){
                    $(str).find('.support__message').css('display','block').html(json);
                }
            }
        });
        return false;
    }
};

(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
})({
    1: [function(require, module, exports) {
        "use strict";
        var utils = require("./utils");
        window.mp = {
            track: function() {},
            track_links: function() {}
        };
      
        $(function() {
            if (typeof mixpanel === "object") window.mp = mixpanel;
            var ui = {
                body: $("body"),
                document: $(document),
                footerSection: $(".footer-section"),
                footerHeadingLinks: $(".footer-section > h4 > a"),
                hamburger: $(".hamburger"),
                menu: $(".lyr-navigation > .container > ul")
            };
            if (utils.isMobile) {
                ui.body.addClass("is-mobile");
                ui.footerSection.click(function(e) {
                    $(e.currentTarget).find("ul").slideToggle()
                });
                ui.footerHeadingLinks.click(function(e) {
                    e.preventDefault()
                })
            }
            ui.hamburger.on("click", function() {
                ui.menu.toggleClass("nav-active")
            });
            ui.document.on("scroll", function() {
                if (ui.document.scrollTop() > 100 + ui.menu.height()) {
                    ui.menu.removeClass("nav-active")
                }
                ui.menu.css("top", 80 - ui.document.scrollTop() + "px")
            })
        })
    }, {
        "./pages/about": 2,
        "./pages/contact": 3,
        "./pages/designkit": 4,
        "./pages/features": 5,
        "./pages/jobs": 6,
        "./pages/landing": 7,
        "./pages/plans": 8,
        "./pages/press": 9,
        "./pages/trunkclub": 10,
        "./pages/usecases": 11,
        "./utils": 12
    }],
    2: [function(require, module, exports) {
        "use strict";
        module.exports = function() {
            var ui = {};
            $(function() {
                mp.track("Visitors: about page")
            })
        }
    }, {}],
    3: [function(require, module, exports) {
        "use strict";
        module.exports = function() {
            $(function() {
                mp.track("Visitors: contact page");
                var ui = {
                    form: $("form"),
                    hero: $(".contact-hero"),
                    success: $(".contact-success"),
                    button: $("button"),
                    selectCountry: $(".select-country"),
                    selectState: $(".select-state")
                };
                ui.selectCountry.on("change", function() {
                    if (this.value === "United States") {
                        ui.selectState.show();
                        ui.selectState.attr("required", true)
                    } else {
                        ui.selectState.hide();
                        ui.selectState.attr("required", false)
                    }
                });
                ui.form.submit(function() {
                    var params = {};
                    $.map(ui.form.serializeArray(), function(p) {
                        return params[p.name] = p.value
                    });
                    ui.button.attr("disabled", true);
                    $.ajax({
                        url: "/api/contact",
                        type: "POST",
                        data: JSON.stringify(params),
                        contentType: "application/json; charset=utf-8"
                    }).success(function() {
                        ui.hero.fadeOut();
                        ui.form.fadeOut(function() {
                            ui.success.fadeIn()
                        });
                        ga("send", "event", "sales", "contact", "success")
                    }).fail(function() {
                        alert("There was an error submitting your information. Try again later.");
                        ui.button.attr("disabled", false);
                        ga("send", "event", "sales", "contact", "failure")
                    });
                    return false
                })
            })
        }
    }, {}],
    4: [function(require, module, exports) {
        "use strict";
        var utils = require("../utils");
        module.exports = function() {
            var ui = {};
            $(function() {
                mp.track("Visitors: messaging design kit page");
                ui = {
                    download: $(".js-download"),
                    modal: $(".modal-dialog"),
                    modalClose: $(".modal-close"),
                    modalDiv: $(".modal-dialog > div"),
                    modalH: $(".modal-dialog h4"),
                    success: $(".modal-dialog .success"),
                    form: $(".modal-dialog form"),
                    inputs: $('.modal-dialog input[type="text"]'),
                    button: $(".modal-dialog button"),
                    selects: $(".modal-dialog select")
                };
                ui.modal.click(modalToggle);
                ui.modalClose.click(modalToggle);
                ui.download.click(modalToggle);
                ui.modalDiv.click(function(e) {
                    e.stopPropagation()
                });
                ui.form.submit(function(e) {
                    e.preventDefault();
                    ui.button.attr("disabled", true);
                    var payload = {};
                    ui.inputs.each(function(i, input) {
                        payload[input.name] = input.value
                    });
                    if (!utils.isEmail(payload.email)) {
                        ui.form.find('input[name="email"]').focus();
                        ui.button.attr("disabled", false);
                        alert("Invalid email address.");
                        return
                    }
                    ui.selects.each(function(i, select) {
                        payload[select.name] = $(this).find("option:selected").val()
                    });
                    postMdk(payload)
                })
            });

            function modalToggle() {
                ui.modal.toggleClass("show");
                ui.inputs.get(0).focus()
            }

          
        }
    }, {
        "../utils": 12
    }],
    5: [function(require, module, exports) {
        "use strict";
        module.exports = function() {
            var ui = {};
            var animatePhone = null;
            var animate = {
                phone: function() {
                    ui.phoneSplit.addClass("animate");
                    setTimeout(function() {
                        ui.phoneSplit.removeClass("animate")
                    }, 1600);
                    return true
                }
            };
            $(function() {
                mp.track("Visitors: features page");
                mp.track_links(".component-join-now .signup-action", "Signup: features page");
                mp.track_links(".component-join-now .sales-action", "Sales: features page");
                ui = {
                    window: $(window),
                    document: $(document),
                    phoneSplit: $(".phone-ui"),
                    phoneHandle: $(".phone-split-handle")
                };
                ui.phoneHandle.bind("mousedown", function(e) {
                    e.preventDefault();
                    $(this).data("sliding", true)
                });
                ui.document.bind("mousemove", function(e) {
                    e.preventDefault();
                    if (ui.phoneHandle.data("sliding") === true) {
                        var offs = e.pageX - ui.phoneSplit.offset().left;
                        if (offs > 302) return;
                        ui.phoneSplit.width(offs)
                    }
                }).bind("mouseup", function(e) {
                    e.preventDefault();
                    ui.phoneHandle.data("sliding", false)
                }).bind("scroll", function() {
                    if (ui.window.scrollTop() >= 3e3 && !animatePhone) animatePhone = animate.phone()
                })
            })
        }
    }, {}],
    6: [function(require, module, exports) {
        "use strict";
        module.exports = function(options) {
            options = options || {};
            $(function() {
                mp.track("Visitors: jobs page");
                if (options.life) lifeAnimate($(".jobs-life img:first-child"));
                if (options.apply) applyForm()
            })
        };

        function lifeAnimate($imgs) {
            $imgs.each(function(i, img) {
                lifeAnimateInit($(img))
            })
        }

        function lifeAnimateInit($img) {
            setTimeout(lifeAnnimateImg, randomInterval(5e3, 2e4), $img)
        }

        function lifeAnnimateImg($img) {
            $img.css("opacity", $img.css("opacity") == 1 ? 0 : 1);
            lifeAnimateInit($img)
        }

        function randomInterval(from, to) {
            return Math.floor(Math.random() * (to - from + 1) + from)
        }

        function applyForm() {
            var REQIRED = ["resume", "first_name", "last_name", "email"];
            var $form = $(".apply-form form");
            var $success = $(".apply-success");
            $form.find("input").keypress(clearInvalid).change(clearInvalid);
            $form.find("textarea").keypress(clearInvalid);
            $form.ajaxForm({
                url: "/api/jobs/apply",
                beforeSubmit: function() {
                    var valid = true;
                    $form.find("input").each(function() {
                        var $input = $(this);
                        if (REQIRED.indexOf($input.attr("name")) !== -1) {
                            if (!$input.val()) {
                                valid = false;
                                $input.addClass("invalid").focus();
                                return false
                            }
                        }
                    });
                    return valid
                },
                success: function() {
                    $form.fadeOut(function() {
                        $success.fadeIn()
                    })
                },
                error: function(err) {
                    if (err.status === 413) alert("Resume file too big. Maximum 4Mb.");
                    else alert("Oops, there was an error :(\nTry again later.")
                }
            })
        }

        function clearInvalid() {
            $(this).removeClass("invalid")
        }
    }, {}],
    7: [function(require, module, exports) {
        "use strict";
        module.exports = function() {
            var ui = {};
            $(function() {
                mp.track("Visitors: landing page");
                mp.track_links(".landing-hero .signup-action", "Signup: landing page");
                ui = {
                    heroGraphics: $(".graphics"),
                    heroImgs: $(".graphics img"),
                    banners: $(".landing-banner .banner")
                };
                ui.heroImgs.imagesLoaded(function() {
                    ui.heroGraphics.addClass("loaded")
                });
                animateBanner()
            });
            var bannerActive = 0;

            function animateBanner() {
                ui.banners.hide();
                ui.banners.eq(bannerActive).fadeIn();
                bannerActive++;
                if (bannerActive >= ui.banners.length) bannerActive = 0;
                setTimeout(animateBanner, 4e3)
            }
        }
    }, {}],
    8: [function(require, module, exports) {
        "use strict";
        module.exports = function() {
            var ui = {};
            $(function() {
                mp.track("Visitors: plans page");
                mp.track_links(".plans-hero .signup-action", "Signup: plans free");
                mp.track_links(".plans-hero .signup-action-standard", "Signup: plans standard");
                mp.track_links(".plans-hero .sales-action", "Sales: plans page")
            })
        }
    }, {}],
    9: [function(require, module, exports) {
        "use strict";
        module.exports = function() {
            var ui = {};
            $(function() {
                mp.track("Visitors: press page")
            })
        }
    }, {}],
    10: [function(require, module, exports) {
        module.exports = function() {
            var ui = {};
            var sections = ["onboarding", "review", "pov", "checkout"];
            var intervalId = null;
            var activeSection = 0;
            var activeImg = 0;
            var inView = false;
            $(function() {
                ui = {
                    window: $(window),
                    document: $(document),
                    li: $(".trunkclub.experience li"),
                    images: $(".trunkclub.experience .images"),
                    imagesItems: $(".trunkclub.experience .images > div")
                };
                ui.li.mouseenter(function() {
                    clearTimeout(intervalId);
                    activeSection = sections.indexOf($(this).data("section"));
                    animateSection()
                });
                ui.document.bind("scroll", function() {
                    if (!inView && ui.window.scrollTop() >= 2800) {
                        inView = true;
                        clearTimeout(intervalId);
                        animateSection()
                    }
                })
            });

            function animateSection() {
                ui.li.removeClass("active");
                ui.li.eq(activeSection).addClass("active");
                ui.imagesItems.hide();
                ui.images.find("." + sections[activeSection]).fadeIn();
                activeImg = 0;
                animateImages()
            }

            function animateImages() {
                activeImg++;
                if (activeImg > 3) {
                    clearTimeout(intervalId);
                    activeSection++;
                    if (activeSection >= sections.length) activeSection = 0;
                    animateSection();
                    return
                }
                var section = ui.images.find("." + [sections[activeSection]]);
                if (section.length) section.removeClass("img1 img2 img3").addClass("img" + activeImg);
                intervalId = setTimeout(animateImages, 3e3)
            }
        }
    }, {}],
    12: [function(require, module, exports) {
        var EMAIL_REGEX = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i);
        exports.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        exports.isEmail = function(val) {
            if (typeof val !== "string") return false;
            return EMAIL_REGEX.test(val)
        }
    }, {}]
}, {}, [1]);
