
    function showGameCanvas(){
       $("#gameCanvas .box").each(function(e){
          $(this).css("visibility","hidden");
        })
        $("#gameCanvas").delay(200).fadeIn(200);  
    }

    function setRandomBoxes(randomNumbers){
        for(var i = 0; i< randomNumbers.length; i++){
            $(`#${randomNumbers[i]}`).css("visibility","visible").find("span").hide();
            console.log(randomNumbers[i]);
         }
       var delay = 500;
         for(var i = 1; i<=randomNumbers.length; i++){
            $(`#${randomNumbers[i-1]} > span`).html(`${i}`).css("visibility","visible").delay(`${delay}`).fadeIn(1).delay(100).fadeOut(100);
            delay += 200;
         }
    }

    function setRandomNumbersToBox(difficulty){

        var nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];
        var randomNumbers = [];

        for(var i = 0; i<difficulty; i++){
             var number = Math.floor(Math.random() * nums.length);
            randomNumbers.push(nums[number]);
            nums.splice(number, 1);
        }
            return randomNumbers;
    }

    function boxesClicked(randomNumbers, difficulty){
        var flag = false;
        console.log(difficulty);
        var value = 1;
        for(var i  = 0 ; i < difficulty; i++){
            $(`#${randomNumbers[i]}`).click(function(){
                if($(this).find("span").html() == value){
                        flag = true;
                        $(this).html(`<span class="check"><img src='img/true.png'></span>`);
                        value += 1;
                } else {
                    flag = false;
                    $(".box").off("click");
                    $(this).html(`<span class="check"><img src='img/false2.png'></span>`);
                    $("#result").append(`<p style="color:red">FAILED</p>
                    <p>You failed in level ${difficulty}. <br> F5 to restart game.</p>`);
                }
                if(value === 5){
                    $(".box").off("click");
                    $("#result").append(`<p style="color:green">Congratulations</p>
                    <p>You completed level ${difficulty}.<br> F5 to restart game.</p>`);
                }
            })   
        }
    }

    $(function(){
    
        $("#container").animate({left : '500px'}, 2000);
        
        difficulty = 4;
        var randomNumbers;

        $("#difficulty").change(function(e){
            difficulty = $(this).val();    
        })
        
        for(var i = 0; i<20; i++){
            $("#gameCanvas").append(`<div class="box" id="${i+1}"><span>${i+1}</span></div>`);
        }
            $("#start").click(function(){
            $("#container").css("display","inline-block").fadeOut(1500);
            showGameCanvas();
            randomNumbers =  setRandomNumbersToBox(difficulty);
            setRandomBoxes(randomNumbers);
            boxesClicked(randomNumbers, difficulty);
    });
});


