(function() {
  $(".like-btn").on("click", function(event) {
    event.preventDefault();

    const resource = $(this).data("resource-type");
    const id = $(this).data("id");

    switch (resource) {
      case "comment":
        $.ajax({
          url: "comments/${id}/likes",
          type: "POST"
        }).done(function(response) {
          console.log(response);
        });
        break;
      case "post":
        $.ajax({
          url: "posts/${id}/likes",
          type: "POST"
        }).done(function(response) {
          console.log(response);
        });
        break;
      default:
        break;
    }
  });
})();
