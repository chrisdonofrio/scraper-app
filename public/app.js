$(document).ready(function() {
  $.getJSON("/showArticles", function(response) {
    response.forEach(function(article) {
      var newDiv = "<div class='col md-6'>";
      newDiv += "<div class='article-div'>";
      newDiv += "<div class='article-title'>";
      newDiv += "<h3>"+article.title+"</h3>";
      newDiv += "</div>";
      newDiv += "<div class='article-link'>";
      newDiv += "<a href=" + article.link + ">" + "View Article" + "</a>";
      newDiv += "</div>";

    $(".row").append(newDiv);

    });
  });
});