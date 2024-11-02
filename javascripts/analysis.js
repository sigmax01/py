function umami() {
  if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
    var script = document.createElement("script");
    script.defer = true;
    script.src = "https://cloud.umami.is/script.js";
    script.setAttribute(
      "data-website-id",
      "c3b1bdf6-f012-4d09-a9d1-d51591e1f06b"
    );
    document.head.appendChild(script);
  }
}
umami();