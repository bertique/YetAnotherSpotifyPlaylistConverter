// Config
var trackRegex = /\s*(\d+\.)?\s?(.+) - (.+)/g;

console.log('This would be the main JS file.');

var spotifyApi = new SpotifyWebApi();
 var output = "";
function init () {
	 $("#convert-playlist").click(function(){
        convertPlaylist();
    });
}


function searchTracks(arr) {
	var i = 1;
    return arr.reduce(function(promise, email) {
        return promise.then(function() {
            return spotifyApi.searchTracks(email, {market: "US",limit: 1}).then(function(data) {
            if(data.tracks.items[0]  != null) {
            console.log(data.tracks.items[0].uri);
            $("#main-output").append(i++ +". "+ data.tracks.items[0].uri +"<br>");
			output +=","+data.tracks.items[0].uri.split(":")[2];
			}
			else {
				$("#main-output").append(i++ +". "+ "not found"+"<br>");
			}
            }, function(err) {});
        });
    }, Promise.resolve());
}


function convertPlaylist () {
	var inputText = $("#main-input").val();
  var m;
  var cleanedInput = [];
 
  console.log('got input'+inputText);
  while ((m = trackRegex.exec(inputText)) !== null) {
    if (m.index === trackRegex.lastIndex) {
        trackRegex.lastIndex++;
    }
    if(m.length === 4) {
		var itemtopush = m[3]+" - "+m[2].replace(/\s+[&\[(].+[\])]|&/g,"")
		cleanedInput.push(itemtopush);
		console.log(itemtopush);
		
	}
  }
  searchTracks(cleanedInput).then(function() {
     var ifrm = document.createElement("IFRAME");	
   ifrm.setAttribute("src", "https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:"+output); 
   ifrm.style.width = 300+"px"; 
   ifrm.style.height = 380+"px"; 
   document.getElementById("main-output").appendChild(ifrm); 
});
}
      