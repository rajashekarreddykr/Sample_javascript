function b() {
    return new Promise((resolve, reject) => {
      let val = Math.floor(Math.random() * 7);
      if (val != 0 && val != 5) {
        resolve(val);
        //console.log(val);
      } else {
        resolve("Out");
        //console.log("Out");
      }
      reject("error")
    })
  }
  
  async function a() {
    let details = {
      score: 0,
      wickets: 0,
      balls: 0,
      summary: ""
    };
    for (let i = 0; i < 50; i++) {
      let temp = await b();
      
      //console.log(temp);
        
      if (temp != "Out" && details.wickets !=10) {
        details.summary += temp + ", ";
        details.score = details.score + temp;
        details.balls = details.balls + 1;
      } else {
        if (details.wickets == 10) {
          break;
        } else {
          details.wickets = details.wickets + 1;
          details.balls = details.balls + 1;
        }
      }
    }
  
    console.log(details);
    return details;
  }
  
  var fp = 0;
  var sp = 0;
  
  function aa() {
    document.getElementById("play").disabled=true;
    document.getElementById("summary").innerHTML ="";
    a().then((d) => {
      fp = d.score;
      document.getElementById("fp").innerHTML = "Score: " + d.score + "<br>Wickets: " + d.wickets + "<br>Balls: " + d.balls;
      document.getElementById("summary").innerHTML ="Loading..."
      setTimeout(() => {
        document.getElementById("summary").innerHTML = "Player 1 > " + d.summary;
      }, 3000);
    }).then(a().then((d) => {
      sp = d.score;
      document.getElementById("sp").innerHTML = "Score: " + d.score + "<br>Wickets: " + d.wickets + "<br>Balls: " + d.balls;
      setTimeout(() => {
        document.getElementById("summary").innerHTML += "<br>Player 2 > " + d.summary;
        document.getElementById("play").disabled=false;
      }, 5000);
    })).then(() => {
      if (fp > sp) {
        document.getElementById("result").innerHTML = "Player 1 Won the match by " + (fp - sp) + " runs";
      } else if (sp > fp) {
        document.getElementById("result").innerHTML = "Player 2 Won the match by " + (sp - fp) + " runs";
      } else {
        document.getElementById("result").innerHTML = "MATCH TIED"
      }
    }).
    catch((e) => {
      console.log(e);
    })
  
  }
  
