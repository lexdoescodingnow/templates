(function () {
  var styles = [
    {
      id: "bh-bread-css",
      url: "https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/bread/bread-thread.css"
    },
    {
      id: "bh-bread-variants-css",
      url: "https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/bread/bread-thread-variants.css"
    }
  ];
  var fallbackOne = "https://64.media.tumblr.com/4b9f6869cdd371235ba9a12091b546c4/28f1d1e1daf62e6a-a4/s400x600/52382865280e2e0fee3086648869f23a49833f37.gifv";
  var fallbackTwo = "https://64.media.tumblr.com/dbc34ae8aad7f3815c607cb8ac934edd/3c4ae6bd64c3cd79-6f/s540x810/375361ee5b6813fdfd2e42b2bd3c3394c2c75624.gifv";
  var fallbackCopy = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus velit sed augue fermentum, vitae tincidunt sem pulvinar. <b>Some things are better shared warm</b>, before the moment has time to cool.</p><p><i>Praesent vitae nibh vel erat consequat commodo.</i> Sed ullamcorper, justo vitae porttitor feugiat, neque lorem <u>malesuada erat</u>, vitae facilisis augue arcu sed nibh.</p>";
  var variants = {
    standard: {
      kicker: "collective bake · no. 024",
      subtitle: "proofed slowly · made to be shared",
      stamp: "fresh daily",
      detail: "warm · familiar · yours"
    },
    single: {
      kicker: "single frame · no. 024",
      subtitle: "one good thing · made to linger",
      stamp: "one serving",
      detail: "warm · familiar · yours"
    },
    rounded: {
      kicker: "soft batch · no. 024",
      subtitle: "rounded gently · made to be shared",
      stamp: "soft proof",
      detail: "warm · familiar · yours"
    },
    scroll: {
      kicker: "long form · no. 024",
      subtitle: "slow proof · room to unfold",
      stamp: "keep reading",
      detail: "warm · familiar · yours"
    },
    split: {
      kicker: "two-part bake · no. 024",
      subtitle: "divided neatly · shared completely",
      stamp: "side by side",
      detail: "warm · familiar · yours"
    }
  };
  var isToken = function (value) {
    return /^\s*\[[^\]]+\]\s*$/.test(value || "");
  };

  styles.forEach(function (style) {
    if (!document.getElementById(style.id)) {
      var link = document.createElement("link");
      link.id = style.id;
      link.rel = "stylesheet";
      link.href = style.url;
      document.head.appendChild(link);
    }
  });

  Array.prototype.forEach.call(document.querySelectorAll(".bh-bread:not([data-bh-ready])"), function (root) {
    var variantName = (root.getAttribute("data-variant") || "standard").trim().toLowerCase();
    var variant = variants[variantName] || variants.standard;
    var source = root.querySelector(".bh-bread-text");
    var gifOne = (root.getAttribute("data-gif-one") || "").trim();
    var gifTwo = (root.getAttribute("data-gif-two") || "").trim();
    var name = (root.getAttribute("data-name") || "").trim();
    var card = document.createElement("div");

    if (!variants[variantName]) {
      variantName = "standard";
    }

    root.setAttribute("data-bh-ready", "true");
    root.setAttribute("data-bh-variant", variantName);

    if (source) {
      source.hidden = true;
    }

    card.className = "bh-bread-card bh-bread-card--" + variantName;
    card.innerHTML = "<div class=\"bh-bread-head\"><div class=\"bh-bread-heading\"><div class=\"bh-bread-kicker\"></div><div class=\"bh-bread-title bread-display\">bread</div><div class=\"bh-bread-subtitle\"></div></div><div class=\"bh-bread-icon\"></div></div><div class=\"bh-bread-media\"><div class=\"bh-bread-photo\"><img data-bh-bread-gif=\"one\" alt=\"\"></div><div class=\"bh-bread-photo\"><img data-bh-bread-gif=\"two\" alt=\"\"></div><div class=\"bh-bread-stamp\"><strong></strong><span></span></div></div><div class=\"bh-bread-body\"></div><div class=\"bh-bread-foot\"><div class=\"bh-bread-mark\">some recipes are meant to be shared</div><div class=\"bh-bread-name\"></div></div>";

    var imageOne = card.querySelector('[data-bh-bread-gif="one"]');
    var imageTwo = card.querySelector('[data-bh-bread-gif="two"]');
    var body = card.querySelector(".bh-bread-body");
    var nameTarget = card.querySelector(".bh-bread-name");

    card.querySelector(".bh-bread-kicker").textContent = variant.kicker;
    card.querySelector(".bh-bread-subtitle").textContent = variant.subtitle;
    card.querySelector(".bh-bread-stamp strong").textContent = variant.stamp;
    card.querySelector(".bh-bread-stamp span").textContent = variant.detail;

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

    body.innerHTML = !source || !source.innerHTML.trim() || isToken(source.textContent.trim()) ? fallbackCopy : source.innerHTML;
    nameTarget.textContent = !name || isToken(name) ? "character name" : name;
    root.appendChild(card);
  });
}());