function umami() {
  if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
    var script = document.createElement("script");
    script.defer = true;
    script.src = "https://umami.ricolxwz.io/script.js";
    script.setAttribute(
      "data-website-id",
      "4c728c19-9b08-4190-9565-a5abbb00b221"
    );
    document.head.appendChild(script);
  }
}
umami();