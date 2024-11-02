function umami() {
  if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
    var script = document.createElement("script");
    script.defer = true;
    script.src = "https://umami.ricolxwz.io/script.js";
    script.setAttribute(
      "data-website-id",
      "a918fbbd-f71b-49a6-8e66-3caddd16f722"
    );
    document.head.appendChild(script);
  }
}
umami();