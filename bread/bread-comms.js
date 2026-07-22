(function () {
  var cssId = "bh-bread-comms-css";
  var cssUrl = "https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/bread/bread-comms.css";
  var fallbackMessages = [
    "Are you still awake?",
    "I brought something warm home. <b>Do not eat without me.</b>",
    "<i>Five minutes</i>, promise."
  ];
  var isToken = function (value) {
    return /^\s*\[[^\]]+\]\s*$/.test(value || "");
  };
  var normaliseSide = function (value) {
    value = (value || "").toLowerCase();
    return value === "received" || value === "incoming" || value === "left" ? "received" : "sent";
  };

  if (!document.getElementById(cssId)) {
    var link = document.createElement("link");
    link.id = cssId;
    link.rel = "stylesheet";
    link.href = cssUrl;
    document.head.appendChild(link);
  }

  Array.prototype.forEach.call(document.querySelectorAll(".bh-bread-comms:not([data-bh-ready])"), function (root) {
    root.setAttribute("data-bh-ready", "true");

    var source = root.querySelector(".bh-bread-comms-text");
    var name = (root.getAttribute("data-name") || "").trim();
    var avatar = (root.getAttribute("data-avatar") || "").trim();
    var time = (root.getAttribute("data-time") || "").trim();
    var side = normaliseSide(root.getAttribute("data-side"));
    var status = (root.getAttribute("data-status") || "").trim();
    var messages = [];
    var card = document.createElement("div");

    if (source) {
      source.hidden = true;
    }

    if (!name || isToken(name)) {
      name = "character name";
    }
    if (!time || isToken(time)) {
      time = "now";
    }
    if (!status || isToken(status)) {
      status = "active now · warm line";
    }

    if (source && source.innerHTML.trim() && !isToken(source.textContent.trim())) {
      Array.prototype.forEach.call(source.children, function (child) {
        if (child.innerHTML.trim()) {
          messages.push({
            html: child.innerHTML,
            side: normaliseSide(child.getAttribute("data-side") || side),
            time: (child.getAttribute("data-time") || time).trim()
          });
        }
      });

      if (!messages.length) {
        messages.push({ html: source.innerHTML, side: side, time: time });
      }
    }

    if (!messages.length) {
      Array.prototype.forEach.call(fallbackMessages, function (html) {
        messages.push({ html: html, side: side, time: time });
      });
    }

    card.className = "bh-bread-comms-card";
    card.innerHTML = "<div class=\"bh-bread-comms-head\"><div class=\"bh-bread-comms-avatar\"><div class=\"bh-bread-comms-avatar-core\"></div></div><div class=\"bh-bread-comms-contact\"><span class=\"bh-bread-comms-name\"></span><span class=\"bh-bread-comms-status\"></span></div><div class=\"bh-bread-comms-brand\">breadline</div></div><div class=\"bh-bread-comms-chat\"><div class=\"bh-bread-comms-date\">today · freshly delivered</div><div class=\"bh-bread-comms-stream\"></div></div><div class=\"bh-bread-comms-compose\"><div class=\"bh-bread-comms-input\"></div><span class=\"bh-bread-comms-send\"></span></div>";

    card.querySelector(".bh-bread-comms-name").textContent = name;
    card.querySelector(".bh-bread-comms-status").textContent = status;
    card.querySelector(".bh-bread-comms-input").textContent = "message " + name;

    if (avatar && !isToken(avatar)) {
      card.querySelector(".bh-bread-comms-avatar-core").style.backgroundImage = "url(\"" + avatar.replace(/\"/g, "%22") + "\")";
    }

    var stream = card.querySelector(".bh-bread-comms-stream");
    Array.prototype.forEach.call(messages, function (message, index) {
      var row = document.createElement("div");
      row.className = "bh-bread-comms-row is-" + message.side;
      row.innerHTML = "<div class=\"bh-bread-comms-bubble\"></div>";
      row.querySelector(".bh-bread-comms-bubble").innerHTML = message.html;

      if (index === messages.length - 1) {
        var meta = document.createElement("span");
        meta.className = "bh-bread-comms-meta";
        meta.textContent = (message.time || time) + (message.side === "sent" ? " · delivered warm" : " · received");
        row.appendChild(meta);
      }

      stream.appendChild(row);
    });

    root.appendChild(card);
  });
}());
