(function () {
  function setupFaceTimeReactions(root) {
    if (!root || root.getAttribute("data-ft-react-ready") === "1") {
      return;
    }

    var button = root.querySelector(".ft-react-button");
    var layer = root.querySelector(".ft-reactions");

    if (!button || !layer) {
      return;
    }

    root.setAttribute("data-ft-react-ready", "1");

    button.addEventListener("click", function (event) {
      event.preventDefault();

      var emojis = ["\uD83D\uDC99", "\uD83D\uDC9C", "\uD83D\uDC97", "\uD83D\uDE0A", "\u263A\uFE0F", "\u2728", "\u2661", "\u2665"];

      for (var index = 0; index < 8; index += 1) {
        var reaction = document.createElement("span");
        var x = 18 + Math.random() * 64;
        var drift = -34 + Math.random() * 68;
        var size = 18 + Math.random() * 13;
        var delay = index * 0.045;

        reaction.className = "ft-reaction";
        reaction.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        reaction.style.setProperty("--x", x + "%");
        reaction.style.setProperty("--drift", drift + "px");
        reaction.style.setProperty("--size", size + "px");
        reaction.style.setProperty("--delay", delay + "s");

        layer.appendChild(reaction);

        window.setTimeout(function (node) {
          if (node && node.parentNode) {
            node.parentNode.removeChild(node);
          }
        }, 2100, reaction);
      }
    });
  }

  var templates = document.querySelectorAll(".ft-social-template");

  for (var i = 0; i < templates.length; i += 1) {
    setupFaceTimeReactions(templates[i]);
  }
})();
