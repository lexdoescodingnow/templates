(function () {
  var cssId = "bh-bread-buds-css";
  var cssUrl = "https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/bread/bread-buds.css";
  var fallbackOne = "https://64.media.tumblr.com/4b9f6869cdd371235ba9a12091b546c4/28f1d1e1daf62e6a-a4/s400x600/52382865280e2e0fee3086648869f23a49833f37.gifv";
  var fallbackTwo = "https://64.media.tumblr.com/dbc34ae8aad7f3815c607cb8ac934edd/3c4ae6bd64c3cd79-6f/s540x810/375361ee5b6813fdfd2e42b2bd3c3394c2c75624.gifv";
  var fallbackCopy = "<p>He caught the look and paused at the door, one hand still curled around the handle. <b>All right.</b> He could give them another minute. Maybe two.</p><p><i>Then they really did have to go.</i></p>";
  var allowed = ["standard", "portrait", "duo", "minimal", "strip"];
  var isToken = function (value) {
    return /^\s*\[[^\]]+\]\s*$/.test(value || "");
  };
  var wordCount = function (html) {
    var temp = document.createElement("div");
    temp.innerHTML = html || "";
    var text = (temp.textContent || temp.innerText || "").replace(/\s+/g, " ").trim();
    return text ? text.split(" ").length : 0;
  };

  if (!document.getElementById(cssId)) {
    var link = document.createElement("link");
    link.id = cssId;
    link.rel = "stylesheet";
    link.href = cssUrl;
    document.head.appendChild(link);
  }

  Array.prototype.forEach.call(document.querySelectorAll(".bh-bread-bud:not([data-bh-ready])"), function (root) {
    root.setAttribute("data-bh-ready", "true");

    var source = root.querySelector(".bh-bread-bud-text");
    var variant = (root.getAttribute("data-variant") || "standard").trim().toLowerCase();
    var gifOne = (root.getAttribute("data-gif-one") || "").trim();
    var gifTwo = (root.getAttribute("data-gif-two") || "").trim();
    var name = (root.getAttribute("data-name") || "").trim();
    var limit = 100;
    var card = document.createElement("div");

    if (allowed.indexOf(variant) === -1) {
      variant = "standard";
    }

    if (source) {
      source.hidden = true;
    }

    card.className = "bh-bread-bud-card bh-bread-bud-card--" + variant;
    card.innerHTML = "<div class=\"bh-bread-bud-head\"><div class=\"bh-bread-bud-seed\"></div><div class=\"bh-bread-bud-brand\"><span>quick reply</span><strong>bud</strong></div><div class=\"bh-bread-bud-identity\"><span class=\"bh-bread-bud-name\"></span><em class=\"bh-bread-bud-limit\">one hundred words or less</em></div></div><div class=\"bh-bread-bud-layout\"><div class=\"bh-bread-bud-media\"><div class=\"bh-bread-bud-photo bh-bread-bud-photo--one\"><img data-bh-bud-gif=\"one\" alt=\"\"></div><div class=\"bh-bread-bud-photo bh-bread-bud-photo--two\"><img data-bh-bud-gif=\"two\" alt=\"\"></div><div class=\"bh-bread-bud-chip\">small scene · quick growth</div></div><div class=\"bh-bread-bud-copy\"><div class=\"bh-bread-bud-body\"></div></div></div><div class=\"bh-bread-bud-foot\"><div class=\"bh-bread-bud-state\">in bud</div><div class=\"bh-bread-bud-meter\"><span></span></div><div class=\"bh-bread-bud-count\"></div></div>";

    var imageOne = card.querySelector('[data-bh-bud-gif="one"]');
    var imageTwo = card.querySelector('[data-bh-bud-gif="two"]');
    var body = card.querySelector(".bh-bread-bud-body");
    var nameTarget = card.querySelector(".bh-bread-bud-name");
    var countTarget = card.querySelector(".bh-bread-bud-count");
    var meter = card.querySelector(".bh-bread-bud-meter span");
    var copy = !source || !source.innerHTML.trim() || isToken(source.textContent.trim()) ? fallbackCopy : source.innerHTML;
    var count = wordCount(copy);
    var percent = Math.min(100, Math.round((count / limit) * 100));

    imageOne.src = !gifOne || isToken(gifOne) ? fallbackOne : gifOne;
    imageTwo.src = !gifTwo || isToken(gifTwo) ? fallbackTwo : gifTwo;
    imageOne.onerror = function () {
      this.onerror = null;
      this.src = fallbackOne;
    };
    imageTwo.onerror = function () {
      this.onerror = null;
      this.src = fallbackTwo;
    };

    body.innerHTML = copy;
    nameTarget.textContent = !name || isToken(name) ? "character name" : name;
    countTarget.innerHTML = "<strong>" + count + "</strong> / " + limit;
    meter.style.width = percent + "%";

    if (count > limit) {
      card.classList.add("is-over");
    }

    root.appendChild(card);
  });
}());