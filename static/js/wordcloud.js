
    var width = 750,
    height = 500;

    var fill = d3.scale.category20();

  d3.layout.cloud().size([width, height])
      .words(w_list.map(function(d) {
        return {text: d, size: 10 + Math.random() * 90};
      }))
      .rotate(function() { return ~~(Math.random() * 2) * 90; })
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw)
      .start();

  function draw(words) {
    d3.select("#word-cloud").append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate("+(width/2)+","+(height/2)+")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .on('mouseover', function(d,i){
//        alert("hovered");
            console.log(d);
            console.log(i);
//        console.log(this);
//        this.style("font-size", function(d) { return (d.size+10) + "px"; })
        })
        .text(function(d) { return d.text; })
        .on('click', function(d,i){
        alert("clicked");
        console.log(d);
        console.log(i);
        if (d.text !== '') {
            $.ajax({
                url: '/recollect',
                type: 'post',
                data: {
                    text: d.text,
                },
                success: function (data) {
                    alert("here......");
                    console.log(data);
                    load_tweets_table(data.tweets)

                },
                error: function (data) {
                    alert("there is some error");
                    console.log(data);
                }
            });
        }


//        function postData(input) {
//            $.ajax({
//                type: "POST",
//                url: "/recollect_tweets.py",
//                data: { param: d.text },
//                success: callbackFunc
//                });
//            }
//           function callbackFunc(response) {
//            // do something with the response
//                console.log(response);
//            }
//            postData('data to process');
        });
  }

  function load_tweets_table(tweets){
        alert("here in load_tweets_table()");
        tweets.forEach(function(tweet){
        $("#tweetTable-body").append(
                `<tr><td>${tweet[0]}</td><td style="width:45px">${tweet[1]}</td></tr>`
            );
        })
  }