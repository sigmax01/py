function umami() {
  if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
    var script = document.createElement("script");
    script.defer = true;
    script.src = "https://umami.ricolxwz.io/script.js";
    script.setAttribute(
      "data-website-id",
      "74101f67-1f26-4304-9dbe-2cdce6835eda"
    );
    document.head.appendChild(script);
  }
}
umami();