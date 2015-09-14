    var data; 

    d3.json("static/data/words.json", function(error, json) {
      if (error) return console.warn(error);
      data = json; 
      createWordVisualization(data);
    })

    function createWordVisualization(words){
      var w = 3600; 

      var h = 900;

      var svg = d3.select("#wordSquares")
            			.append("svg")
            			.attr("width", w)
            			.attr("height", h)

      svg.selectAll("div")
          .data(words)
          .enter()
          .append("rect")
          // .attr('transform','translate(100,1)')
          .attr("x", function(d, i) {
            return i*(w/50);
          })
          .attr("y", function(d){
            return (h-(850) 
              );
          })
          .attr("width", 40)
          .attr("id", function(d, i){return "rect"+i} )
          .attr("class", function(d, i){return d.Pos +" rectangle" + " " + d.word})
          .attr("height", function(d, i){
            return "100px" 
          })
          .style("fill", "black"); 

      $(".rectangle").mouseover(function() {
          var classNames = $(this).attr("class").split(" ");
          var word = classNames[2];
          $("#wordtext").text(word)
        })

      // var rectangleMoveX = function(arrOfIds, arrItem, idXPosition, dur){
      //   var move_item = d3.select(arrOfIds[arrItem])
      //   var x_pos = parseFloat(move_first_neighbor.attr("x"))+idXPosition;
      //   return {"item": move_item, "x_pos": x_pos, "xTransition":idXPosition}
      // }

      //is it worth refactoring this? See code above.
      $('.rectangle').mouseover(function () {
          var rect = d3.select("#"+this.id)
          rect.transition()
              .duration(80)
              .attr("width", 58)
              .attr("height", function(d, i){
                  return "100px" 
                })
              .style("fill", function(d, i) {return d.color}); 
          var ids = get_neighboring_ids(rect_id);
          var move_first_neighbor = d3.select(ids[0])
          var move_second_neighbor = d3.select(ids[1])
          var move_third_neighbor = d3.select(ids[2])
          var x_pos_1 = parseFloat(move_first_neighbor.attr("x"))+14;
          var x_pos_2 = parseFloat(move_second_neighbor.attr("x"))+12;
          var x_pos_3 = parseFloat(move_third_neighbor.attr("x"))+10;
         move_first_neighbor
              .transition()
              .duration(200)
              .attr("x", x_pos_1);
          move_second_neighbor
              .transition()
              .duration(100)
              .attr("x", x_pos_2);
          move_third_neighbor
              .transition()
              .duration(200)
              .attr("x", x_pos_3);
        });

        $('.rectangle').mouseleave(function () {
            var rect = d3.select("#"+this.id)
            rect.transition()
                .duration(50)
                .attr("width", 40)
                .attr("height", function(d, i){
                  return "100px" 
                })
                .style("fill", "black"); 
            var rect_id = this.id;
            var ids = get_neighboring_ids(rect_id);
            var move_first_neighbor = d3.select(ids[0])
            var move_second_neighbor = d3.select(ids[1])
            var move_third_neighbor = d3.select(ids[2])
            var x_pos_1 = parseFloat(move_first_neighbor.attr("x"))-14;
            var x_pos_2 = parseFloat(move_second_neighbor.attr("x"))-12;
            var x_pos_3 = parseFloat(move_third_neighbor.attr("x"))-10;
            move_first_neighbor
                .transition()
                .duration(200)
                .attr("x", x_pos_1);
            move_second_neighbor
                .transition()
                .duration(100)
                .attr("x", x_pos_2);
            move_third_neighbor
                .transition()
                .duration(200)
                .attr("x", x_pos_3);
          });

      }

    function get_neighboring_ids(element){
      var x
      if (element.length ==5){ x=1 }
      else if(element.length ==6){ x=2 }
      else if(element.length==7){ x=3}
      var curr_id_num  = parseInt(element.slice(-x));
      var ids = [];
      for(var i=1; i<4; i++){
        ids.push("#rect"+(curr_id_num+i));
      }
      return ids;
    }

    $(document).ready(function(){

        var hideWordsWithoutSynonyms = function(arr){
            for (var i=0; i<arr.length; i++){
                if (!arr[i].Synonyms){
                  $("."+arr[i].word).toggleClass("hidden");
            }
          }
        }

        $(".synonyms").click(function (hideWordsWithoutSynonyms){
           hideWordsWithoutSynonyms(words);
        });

        $(".colorkey").click(function (e) {
          //add label 
          var color = $(this).css("background-color");
          var currClasses = $(this).attr("class");
          var targetClass = currClasses.split(" ");
          var target = "."+targetClass[0]
          var changeColor = d3.selectAll(target);
          changeColor.transition()
                    .duration(1000)
                    .style("fill", color);
          });

        $("#submittext").click(function (e, getWord){
          $("#inputBox").hide();
          $("#submittext").hide();
          var value = $("textarea").val().length; //this is the length of the text 
          if (value>300){
              getWord(words);
          }
        });
         
    
        var getWord = function(data) { 
          if(data){
            console.log(data.length)
          }
          var formValue = $("#inputBox").val().split(" ");
          // var textarr = formValue.split(" ");
          // var numWordsTotal = formValue.length;
          // var paragraphOfCommonWordsArray = [];
          var wordsWithoutSynonyms = 0;
          while(formValue.length){ 
                var word = formValue.pop().toLowerCase();
                console.log(word);
                // wordLower = word.toLowerCase()
            for (var i=0; i<arr.length; i++){
                if (wordLower==arr[i].Word){
                  console.log("yup a match")
                  if(!arr[i].Synonyms){
                    wordsWithoutSynonyms +=1;
                  }
                  // paragraphOfCommonWordsArray.push(wordLower);
                  // console.log(paragraphOfCommonWordsArray);
                  var classes = $("."+wordLower).attr("class");
                  $("."+word).css("fill", "red");
                     $("#paragraph").text("Of your " + num1 +" words, " + num2 +" are in the set of 600 most common words<br>Of these,");
                  }
                else{
                  console.log("nope");
                }
            }
          }
              // console.log(numWordsTotal, paragraphOfCommonWordsArray);    //should not be 0  
              // addText(numWordsTotal, paragraphOfCommonWordsArray.length);
        // $("#paragraph").text("Of your " + num1 +" words, " + num2 +" are in the set of 600 most common words"+<br>+"Of these,"+);
        }
     });