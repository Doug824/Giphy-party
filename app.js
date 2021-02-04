const $gifArea = $("#giphys");
const $searchInput = $("#search");

/* use ajax to add gif */
function addGif(res) {
  let numResults = res.data.length;
  if (numResults) {
    let randomIdx = Math.floor(Math.random() * numResults);
    let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
    let $newGif = $("<img>", { src: res.data[randomIdx].images.original.url,
      class: "w-100"
    });
    $newCol.append($newGif);
    $gifArea.append($newCol);
  }
}

/* handle form submission */
$("form").on("#add", async function(evt) {
  evt.preventDefault();
  let searchTerm = $searchInput.val();
  $searchInput.val("");
  const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: {
      q: searchTerm,
      api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
    }
  });
  addGif(response.data);
});

$("#remove").on("click", function() {
  $gifArea.empty();
});

/* add a try catch to catch the error of undefined*/
/* add a loader for when its still grabbing the image */