(function() {
  $(".like-btn").on("click", function(event) {
    event.preventDefault();

    const resource = $(this).data("resource-type");
    const id = $(this).data("id");
    const concatId = "#likes-"+id;

    switch (resource) {
      case "comment":
        $.ajax({
          url: `/comments/${id}/likes`,
          type: "POST",
          success: function(response) {
            $(concatId).text(response.likes+" Likes");
          }
        });
        break;
      case "post":
        $.ajax({
          url: `/posts/${id}/likes`,
          type: "POST",
          success: function(response) {
            $(concatId).text(response.likes+" Likes");
          }
        });
        break;
      default:
        break;
    }
  });
})();
