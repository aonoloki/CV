document.addEventListener("DOMContentLoaded", function() {
    function k(a) {
        if (Array.isArray(a)) {
            for (var b = 0, c = Array(a.length); b < a.length; b++)
                c[b] = a[b];
            return c
        }
        return Array.from(a)
    }
    var l = function(a, b) {
        return [].concat(k(a)).pop() === b
    }
      , q = function(a, b) {
        var c = b.map(function(a) {
            a = a.getBoundingClientRect();
            return Object.freeze({
                width: a.width,
                height: a.height
            })
        });
        b.forEach(function(a, b) {
            var e = c[b];
            a.style.position = "absolute";
            a.style.top = "calc(50% - " + e.height / 2 + "px)";
            a.style.left = "calc(50% - " + e.width / 2 + "px)"
        });
        a.style.overflow = "hidden";
        "static" == getComputedStyle(a).getPropertyValue("position") && (a.style.position = "relative")
    }
      , m = function(a, b, c) {
        a = Object.freeze({
            x: a.clientX - b.left - b.width / 2,
            y: a.clientY - b.top - b.height / 2
        });
        c = 1 - .2 * c;
        return Object.freeze({
            x: a.x * (1 - Math.abs(a.x) / b.width) * .2 * c,
            y: a.y * (1 - Math.abs(a.y) / b.height) * .2 * c
        })
    };
    Object.freeze([].concat(k(document.getElementsByClassName("parallax")))).forEach(function(a) {
        var b = a.getBoundingClientRect()
          , c = Object.freeze([].concat(k(a.getElementsByTagName("img"))))
          , n = function(e) {
            return c.forEach(function(f, h) {
                var d = m(e, b, h)
                  , g = d.x
                  , d = d.y;
                f.style.transform = "translate(" + g + "px, " + d + "px)";
                l(c, f) && (a.style.transform = "perspective(800px) rotateX(" + d + "deg) rotateY(" + -g + "deg)")
            })
        }
          , p = Object.freeze({
            enter: function(e) {
                animate.stop([a].concat(k(c)));
                c.forEach(function(f, h) {
                    var d = m(e, b, h)
                      , g = d.x
                      , d = d.y;
                    animate({
                        el: f,
                        translateX: g,
                        translateY: d,
                        easing: "easeOutQuad",
                        duration: 150
                    });
                    l(c, f) && animate({
                        el: a,
                        perspective: [800, 800],
                        rotateX: d,
                        rotateY: -g,
                        easing: "easeOutQuad",
                        duration: 150,
                        complete: function() {
                            return a.addEventListener("mousemove", n)
                        }
                    })
                })
            },
            leave: function(e) {
                return c.forEach(function(f, h) {
                    var d = m(e, b, h)
                      , g = d.x
                      , d = d.y;
                    animate({
                        el: f,
                        translateX: [g, 0],
                        translateY: [d, 0]
                    });
                    l(c, f) && animate({
                        el: a,
                        perspective: [800, 800],
                        rotateX: [d, 0],
                        rotateY: [-g, 0],
                        complete: function() {
                            return a.removeEventListener("mousemove", n)
                        }
                    })
                })
            }
        });
        q(a, c);
        Object.keys(p).forEach(function(b) {
            return a.addEventListener("mouse" + b, p[b])
        })
    })
});
