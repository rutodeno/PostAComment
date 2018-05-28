$(document).ready(function () {

    var postId = 0;
   
    $("#chirp-submit").on("click", function (event) {
        event.preventDefault();

        var newChirp = {
            author: $("#author").val().trim(),
            body: $("#chirp-box").val().trim(),
            created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        };

        console.log(newChirp);
        

        $.post("/api/new", newChirp)
            .then(function () {
                var row = $("<div>");
                row.addClass("chirp");

                row.append("<p>" + newChirp.author + " chirped: </p>");
                row.append("<p>" + newChirp.body + "</p>");
                row.append("<p>At " + moment(newChirp.created_at).format("h:mma on dddd") + "</p>");

                $("#chirp-area").prepend(row);
                location.reload();
            })

        $("#author").val("");
        $("#chirp-box").val("");
    });
    
    // using $(document) worked in this example. Surprising
    $(document).on("click", "#replybtn", function(event) {
        event.preventDefault();
    
        var replyComment = {
            author: $("#author").val().trim(),
            replybody: $("#ourComment").val().trim(),
            replyTo: postId,

        };
        console.log(replyComment);
    });

    // When the page loads, grab and display all of our chirps

    $.get("/api/all", function (data) {

        //console.log(data)
        if (data.length !== 0) {
            for (var i = 0; i < data.length; i++) {
                var row = $("<div>");
                row.addClass("chirp");

                console.log("dataId: "+data[i].id);

                row.append("<p><strong>" + data[i].author + "</strong> posted.. </p>");
                row.append("<p>" + data[i].body + "</p>");
                row.append("<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>");

                var showcomment =$("<div>"); // showing comments
                showcomment.addClass("showr");
                showcomment.append('<button><strong>reply</strong></button>')
                row.append(showcomment);

                var hidecomment = $("<div>"); // hiding comments
                hidecomment.addClass("hidr")
                hidecomment.append("<button><strong>hide</strong></button>")
                row.append(hidecomment);

                textBox(row, showcomment, hidecomment);
                
                $("#chirp-area").prepend(row);
            };
        };
    });


    //generating text boxes
    function textBox (row, showcomment, hidecomment) {

        var reply = $("<div>");
        $(showcomment).on("click", function (event) {

            reply.addClass("replybox");
            reply.html( '<form action="#" id="replyform" >'+
                                '<textarea class="span10" id="ourComment" name="Comment" rows="3"></textarea><br>'+
                                '<button class="btn btn-primary" id="replybtn" >Reply</button>'+
                                '</form>');

            $(reply).show("slow");     // showing  
            
            event.preventDefault();
        });

        $(hidecomment).on("click", function () {
            $(reply).hide("fast"); // hiding
        });


        $(row).append(reply);
    };

});
