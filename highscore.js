const highScoreList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//make highscore list of usernames and their scores appear on highscores page
highScoreList.innerHTML = highScores
    .map(score => { //.map function states that you take an array of items (usernames and scores) and convert those items into something else. in this case you covert the array into html string.
        return `<li class="high-score>${score.name} - ${score.score}</li>`;// we want the usernames and their scores listed as list items as an array
    })
    .join("")