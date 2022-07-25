$("#get").on("click", function () {
  $.get(`/teams/${$("#in").val()}`, function (res) {
    render(res);
  });
});

render = function (res) {
  $("#container").empty();
  res.forEach((a) => {
    const src = $("#tamplete").html();
    const tamp = Handlebars.compile(src);
    const newHTML = tamp(a);
    $("#container").append(newHTML);
  });
};
