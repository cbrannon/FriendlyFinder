$(document).ready(() => {
    $("#submit").on("click", (event) => {
        event.preventDefault();
        if (!$('#name').val() || !$('#photo').val()) {
            // tell them they cant submit b/c name is required
            if (!$('#photo').val()) {
                $("#photo").parent("div").addClass("has-warning");
                location.href = "#title";
            }

            if (!$('#name').val()) {
                $("#name").parent("div").addClass("has-warning");
                location.href = "#title";
            }

            return false;
        } else {
            $("#name").parent("div").removeClass("has-warning");
            $("#photo").parent("div").removeClass("has-warning");
        }
        var userData = {
            "name": $("#name").val(),
            "photo": $("#photo").val(),
            "scores": []
        }

        function setScores() {
            for (var i = 1; i < 11; i++) {
                let currentID = "#question" + i;
                userData.scores.push(parseInt($(currentID).val()[0]));
            }
        }
        
        setScores();
        
        $.post("http://localhost:8080/api/friends", userData, function(data){
            console.log(data);
        }).done(function(data) {
            console.log(data);
            $("#friend-name").text(data.name);
            $("#friend-photo").attr("src", data.photo);
            $("#myModal").modal();
        });
    });
});