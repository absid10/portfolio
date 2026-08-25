/***************************************************
==================== JS INDEX ======================
****************************************************

01. PreLoader Js
02. Sticky Js
03. Menu Controls JS
04. offcanvas Menu JS
05. offcanvas two Menu JS
06. Sidebar Js
07. AOS Js
08. Backtotop Js
09. Magnific Popup Js
10. Counter Js
11. Feature Widget Animation Js
12. Service Two Images Hover Animation Js
13. Bg Image For Attribute  Js
14. Mouse active Js





****************************************************/

(function ($) {
  "use strict";

  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////
  // 01. PreLoader Js
  document.addEventListener("DOMContentLoaded", () => {
    // Create GSAP timeline
    const tl = gsap.timeline();
    const svg = document.getElementById("preloaderSvg");
    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";
    
    if (svg) {
      tl.to(".preloader-heading .load-text, .preloader-heading .cont", {
        delay: 0.8,
        y: -80,
        opacity: 0,
        duration: 0.5,
      })
        // SVG curve animation
        .to(svg, {
          duration: 0.5,
          attr: { d: curve },
          ease: "power2.inOut",
        })
        // Flatten SVG
        .to(svg, {
          duration: 0.5,
          attr: { d: flat },
          ease: "power2.inOut",
        })
        // Slide preloader up
        .to(".preloader", {
          y: "-130%",
          duration: 0.7,
          ease: "power4.inOut",
        })
        // Remove from DOM flow completely
        .set(".preloader", {
          display: "none",
          zIndex: -1,
          pointerEvents: "none",
        });
    }

    // Safety fallback to guarantee preloader dismisses
    setTimeout(() => {
      $(".preloader").fadeOut(300, function () {
        $(this).css({ display: "none", zIndex: -1, pointerEvents: "none" });
      });
    }, 3000);
  });

  ////////////////////////////////////////////////////
  // Helper: Universal Section Scroll
  function scrollToSection(targetId) {
    if (!targetId || targetId === "#") return;
    var $target = $(targetId);
    if (!$target.length) return;

    if (window.smoother && typeof window.smoother.scrollTo === "function") {
      window.smoother.scrollTo($target[0], true, "top 80px");
    } else {
      var targetTop = $target.offset().top - 80;
      $("html, body").stop().animate({
        scrollTop: targetTop
      }, 700);
    }
  }

  ////////////////////////////////////////////////////
  // 02. Smart Sticky Header & Floating Social Dock
  let lastScrollTop = 0;
  $(window).on("scroll", function () {
    let st = $(this).scrollTop();
    if (st > 100) {
      $(".header").addClass("fixed-header");
      if (st > lastScrollTop && st > 150) {
        // Scroll Down -> Hide Header
        $(".header").addClass("header-hidden");
      } else if (st < lastScrollTop) {
        // Scroll Up -> Show Header
        $(".header").removeClass("header-hidden");
      }
    } else {
      $(".header").removeClass("fixed-header header-hidden");
    }

    // Toggle Floating Social Dock (only visible when scrolled > 180px)
    if (st > 180) {
      $(".social-sidebar").addClass("social-sidebar-visible");
    } else {
      $(".social-sidebar").removeClass("social-sidebar-visible");
    }

    lastScrollTop = st;
  });

  // Mobile / Touch click toggle for social dock
  $(".social-sidebar-trigger").on("click", function (e) {
    e.stopPropagation();
    $(".social-sidebar").toggleClass("expanded");
  });
  $(document).on("click", function () {
    $(".social-sidebar").removeClass("expanded");
  });

  ////////////////////////////////////////////////////
  // 03. Menu Controls JS
  $(".tw-hamburger-toggle").on("click", function () {
    $(".tw-header-side-menu").slideToggle("tw-header-side-menu");
  });
  if ($(".tw-main-menu-content").length && $(".tw-main-menu-mobile").length) {
    let navContent = document.querySelector(".tw-main-menu-content").outerHTML;
    let mobileNavContainer = document.querySelector(".tw-main-menu-mobile");
    mobileNavContainer.innerHTML = navContent;
    let arrow = $(".tw-main-menu-mobile .has-dropdown > a");
    arrow.each(function () {
      let self = $(this);
      let arrowBtn = document.createElement("BUTTON");
      arrowBtn.classList.add("dropdown-toggle-btn");
      arrowBtn.innerHTML = "<i class='ph ph-caret-right'></i>";
      self.append(function () {
        return arrowBtn;
      });
      self.find("button").on("click", function (e) {
        e.preventDefault();
        let self = $(this);
        self.toggleClass("dropdown-opened");
        self.parent().toggleClass("expanded");
        self
          .parent()
          .parent()
          .addClass("dropdown-opened")
          .siblings()
          .removeClass("dropdown-opened");
        self.parent().parent().children(".tw-submenu").slideToggle();
      });
    });
  }

  ////////////////////////////////////////////////////
  // 04. offcanvas Menu JS
  $(document).on("click", ".tw-offcanvas-open-btn", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(".tw-offcanvas-2-area").addClass("opened");

    setTimeout(() => {
      $(".tw-text-hover-effect-word").addClass("animated-text");
    }, 900);
  });

  ////////////////////////////////////////////////////
  // 05. offcanvas two Menu JS
  $(document).on("click", ".tw-offcanvas-2-close-btn", function (e) {
    e.preventDefault();
    e.stopPropagation();
    setTimeout(() => {
      $(".tw-text-hover-effect-word").removeClass("animated-text");
    }, 1200);

    $(".tw-offcanvas-2-area").removeClass("opened");
    $(".body-overlay").removeClass("opened");
  });

  // Auto-close offcanvas overlay and smooth scroll on link click
  $(document).on("click", ".tw-offcanvas-2-area a, .tw-main-menu-mobile a", function (e) {
    var href = $(this).attr("href");
    
    // Close offcanvas overlay immediately
    $(".tw-offcanvas-2-area").removeClass("opened");
    $(".body-overlay").removeClass("opened");
    $(".tw-text-hover-effect-word").removeClass("animated-text");

    // If anchor link on current page, smooth scroll to target section
    if (href && href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      scrollToSection(href);
    }
  });

  // Smooth scroll for all hash links on page (excluding modal triggers)
  $(document).on("click", "a[href^='#']:not(.header-profile-avatar):not(.google-profile-avatar):not(.open-resume-btn)", function (e) {
    var targetId = $(this).attr("href");
    if (targetId && targetId !== "#" && $(targetId).length) {
      e.preventDefault();
      scrollToSection(targetId);
    }
  });

  // Initial page load hash navigation (e.g., coming from projects.html to index.html#contact)
  if (window.location.hash) {
    setTimeout(function () {
      scrollToSection(window.location.hash);
    }, 600);
  }

  ////////////////////////////////////////////////////
  // 06. Sidebar Js
  $(".tw-menu-bar").on("click", function () {
    $(".twoffcanvas").addClass("opened");
    $(".body-overlay").addClass("apply");
  });
  $(".close-btn").on("click", function () {
    $(".twoffcanvas").removeClass("opened");
    $(".body-overlay").removeClass("apply");
  });
  $(".body-overlay").on("click", function () {
    $(".twoffcanvas").removeClass("opened");
    $(".body-overlay").removeClass("apply");
  });

  ////////////////////////////////////////////////////
  // 07. AOS Js
  AOS.init({
    once: false, // animation will happen every time you scroll
    offset: 0, // start animation when element enters the viewport
    anchorPlacement: "top-bottom", // when the bottom of the element hits the bottom of the screen
  });

  // 08. Backtotop Js
  function back_to_top() {
    var btn = $("#back_to_top");
    var btn_wrapper = $(".back-to-top-wrapper");
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 300) {
        btn_wrapper.addClass("back-to-top-btn-show");
      } else {
        btn_wrapper.removeClass("back-to-top-btn-show");
      }
    });

    btn.on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 300);
    });
  }
  back_to_top();

  ////////////////////////////////////////////////////
  // 09. Magnific Popup Js
  $(".open-popup").magnificPopup({
    type: "iframe",
    removalDelay: 300,
    mainClass: "mfp-fade",
  });

  ////////////////////////////////////////////////////
  // 10. Counter Js
  new PureCounter();
  new PureCounter({
    filesizing: true,
    selector: ".filesizecount",
    pulse: 2,
  });

  ////////////////////////////////////////////////////
  // 11. Feature Widget Animation Js
  function service_animation() {
    var active_bg = $(".feature-widget .active-bg");
    var element = $(".feature-widget .current");
    $(".feature-widget .feature-2-item").on("mouseenter", function () {
      var e = $(this);
      activeService(active_bg, e);
    });
    $(".feature-widget").on("mouseleave", function () {
      element = $(".feature-widget .current");
      activeService(active_bg, element);
      element.closest(".feature-2-item").siblings().removeClass("mleave");
    });
    activeService(active_bg, element);
  }
  service_animation();
  function activeService(active_bg, e) {
    if (!e.length) {
      return false;
    }
    var topOff = e.offset().top;
    var height = e.outerHeight();
    var menuTop = $(".feature-widget").offset().top;
    e.closest(".feature-2-item").removeClass("mleave");
    e.closest(".feature-2-item").siblings().addClass("mleave");
    active_bg.css({ top: topOff - menuTop + "px", height: height + "px" });
  }
  $(".feature-widget .feature-2-item").on("click", function () {
    $(".feature-widget .feature-2-item").removeClass("current");
    $(this).addClass("current");
  });

  ////////////////////////////////////////////////////
  // 12. Service Two Images Hover Animation Js
  $(".service-two-list-wrap .service-two-list-item").on(
    "mouseenter",
    function () {
      $("#service-two-thumb").removeClass().addClass($(this).attr("rel"));
      $(this).addClass("active").siblings().removeClass("active");
    },
  );

  ////////////////////////////////////////////////////
  // 13. Bg Image For Attribute  Js
  $(".bg-img").each(function () {
    var img = $(this).data("background-image");
    if (img) {
      $(this).css("background-image", "url('" + img + "')");
    }
  });

  ////////////////////////////////////////////////////
  // 14. Mouse active Js
  $(document).ready(function () {
    $(".service-ip-wrapper").on("mouseenter", function () {
      $(this).addClass("active").siblings().removeClass("active");
    });

    $(".service-ip-wrapper").on("mouseenter", function () {
      $(this).addClass("active");
      $(this)
        .parent()
        .siblings()
        .find(".service-ip-wrapper")
        .removeClass("active");
    });
  });

  $(document).ready(function () {
    function initRipples() {
      $(".ripple-image").each(function () {
        var $container = $(this);
        var $img = $container.find("img").first();

        if ($img.length === 0) return;

        var img = new Image();
        img.src = $img.attr("src");

        img.onload = function () {
          var imgURL = img.src;

          $container.css({
            "background-image": "url(" + imgURL + ")",
            "background-size": "cover",
            "background-position": "center center",
          });

          // init ripples plugin
          if (typeof $container.ripples === "function") {
            $container.ripples({
              resolution: 400,
              perturbance: 0.03,
              imageUrl: imgURL,
            });
          }

          $img.hide();
        };
      });
    }

    initRipples();
  });

  // 15. Side Floating Index Navigator JS
  $(document).ready(function () {
    var $sideNav = $("#side-index-nav");
    if (!$sideNav.length) return;

    var sections = ["#hero", "#about", "#skills", "#projects", "#experience", "#certifications", "#github", "#contact"];

    function updateSideNav() {
      var scrollPos = $(window).scrollTop();

      // Show side index when scrolled down past 250px
      if (scrollPos > 250) {
        $sideNav.addClass("visible");
      } else {
        $sideNav.removeClass("visible");
      }

      // Determine active section accurately
      var checkPos = scrollPos + 220;
      var currentSection = "#hero";

      sections.forEach(function (secId) {
        var $sec = $(secId);
        if ($sec.length) {
          var top = $sec.offset().top;
          if (checkPos >= top) {
            currentSection = secId;
          }
        }
      });

      // Update active class only on navigation items (do not affect action buttons)
      $(".side-index-item[data-target]").removeClass("active");
      $(".side-index-item[data-target='" + currentSection + "']").addClass("active");
    }

    $(window).on("scroll resize", updateSideNav);
    updateSideNav();

    // Click to scroll to target section accurately
    $(".side-index-item[data-target]").on("click", function (e) {
      e.preventDefault();
      var targetId = $(this).data("target");
      var $target = $(targetId);
      if ($target.length) {
        var targetOffset = $target.offset().top - 60;
        $("html, body").stop().animate({
          scrollTop: targetOffset
        }, 500);
      }
    });
  });

  // 16. Google Account Profile Modal Handler
  $(document).ready(function () {
    var $modal = $("#google-account-modal");

    $(document).on("click", ".header-profile-avatar, .hero-profile-avatar, .google-profile-avatar", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $("#google-account-modal").addClass("active");
      document.body.style.overflow = "hidden";
    });

    $(document).on("click", "#close-account-modal", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $("#google-account-modal").removeClass("active");
      document.body.style.overflow = "";
    });

    $(document).on("click", "#google-account-modal", function (e) {
      if ($(e.target).is("#google-account-modal")) {
        $("#google-account-modal").removeClass("active");
        document.body.style.overflow = "";
      }
    });

    $(document).on("click", "#modal-view-projects", function (e) {
      e.preventDefault();
      $("#google-account-modal").removeClass("active");
      document.body.style.overflow = "";
      scrollToSection("#projects");
    });
  });

  // 17. In-Page Resume PDF Viewer Modal Handler
  $(document).ready(function () {
    var $resumeModal = $("#resume-modal");

    $(document).on("click", ".open-resume-btn", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $("#google-account-modal").removeClass("active");
      $(".tw-offcanvas-2-area").removeClass("opened");
      $(".body-overlay").removeClass("opened");
      $("#resume-modal").addClass("active");
      document.body.style.overflow = "hidden";
    });

    $(document).on("click", "#close-resume-modal", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $("#resume-modal").removeClass("active");
      document.body.style.overflow = "";
    });

    $(document).on("click", "#resume-modal", function (e) {
      if ($(e.target).is("#resume-modal")) {
        $("#resume-modal").removeClass("active");
        document.body.style.overflow = "";
      }
    });

    $(document).on("keydown", function (e) {
      if (e.key === "Escape") {
        $("#resume-modal").removeClass("active");
        $("#google-account-modal").removeClass("active");
        $(".tw-offcanvas-2-area").removeClass("opened");
        document.body.style.overflow = "";
      }
    });
  });
})(jQuery);
