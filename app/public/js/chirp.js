$(document).ready(function () {



    $("#chirp-submit").on("click", function (event) {
        event.preventDefault();

        var newChirp = {
            author: $("#author").val().trim(),
            body: $("#chirp-box").val().trim(),
            created_at: moment().format("YYYY-MM-DD HH:mm:ss")
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



    // When the page loads, grab and display all of our chirps

    $.get("/api/all", function (data) {


        //console.log(data)
        if (data.length !== 0) {
            for (var i = 0; i < data.length; i++) {
                var row = $("<div>");
                row.addClass("chirp");

                row.append("<p><strong>" + data[i].author + "</strong> posted.. </p>");
                row.append("<p>" + data[i].body + "</p>");
                row.append("<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>");

                var showcomment =$("<div>"); // showing comments
                showcomment.addClass("showr");
                showcomment.append('<p><strong>show</strong></p>')
                row.append(showcomment);

                var hidecomment = $("<div>");
                hidecomment.addClass("hidr")
                hidecomment.append("<p><strong>hide</strong></p>")
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
            reply.html( '<form action="#" id="replyform" method ="POST">'+
                                '<textarea class="span10" name="Comment" rows="3"></textarea><br>'+
                                '<input class="btn btn-primary" id="replybtn" type="submit" value="reply">'+
                                '</form>');

            $(reply).show("slow");     // showing  
            
            event.preventDefault();
        });

        $(hidecomment).on("click", function () {
            $(reply).hide("fast"); // hiding
        });

        $(row).append(reply)
    }

});


