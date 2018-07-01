globals = {}
var resultToken = true; // for form validation

function httpGetAsync(theUrl, callback){
             var xmlHttp = new XMLHttpRequest();
             xmlHttp.onreadystatechange = function(){ 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                 callback(xmlHttp.responseText);
            }
            xmlHttp.open("GET", theUrl, true); // true for asynchronous 
            xmlHttp.send(null);
}

$(function() {

  /*httpGetAsync("http://localhost:8080/airlineReservation/airports?$select=name,id",function(res){
        var result = [];
        res = JSON.parse(res);
        for(var i = 0 ; i < res.length; i++){
          var x = {};
        x["label"] = res[i]["name"];
        x["id"] = res[i]["id"];
        result.push(x);
        }
        $('#source').autocomplete({
    source: result,
    minLength: 3,
    select: function(event, ui){
      globals.source = ui.item.id
    }
    });
    $('#destination').autocomplete({
    source: result,
    minLength: 3,
    select: function(event, ui){
      globals.destination = ui.item.id
    }
  });
    console.log("fetched and return populated for autosearch");
}); */

  // IATA Code must be in paranthesis in beginning
   
  //jquery UI Init
  
	
/*  $('.date-picker').datepicker();
  $('.flight-class').selectmenu();

  //inc+dec
	$('#inc_a').click(incrementPassCount);
	$('#inc_c').click(incrementPassCount);
	$('#inc_f').click(incrementPassCount);
	$('#dec_a').click(decrementPassCount);
	$('#dec_f').click(decrementPassCount);
	$('#dec_c').click(decrementPassCount);
	defaultPassCount();
	//one-way / round-trip disable return date-picker
$('input[name=tripType]').change(function(){
  $(".returnDateContainer").show();
  var value = $('input[name=tripType]:checked').val();
  if(value=='oneway'){
    $(".returnDateContainer").hide();
  }
});
*/

//modify search
    /*
$('.sf-modify').on( "click", function( event ) {
  $('.sf-results').fadeOut('slow', function(){
    $('.sf-modify').fadeOut(100, function(){
      $('.search-flights').fadeIn('slow');
    });
  });
});

*/
//bypass Submit Action and handle with ajax
    $('.sf-submit').on('click', function( event ) {
        resultToken=true;
        event.preventDefault();
        //reset val-error
        $('.val-error').removeClass("val-error");

        var paramsArr = $('form').serialize().split('&');
        console.log(paramsArr);
        var dataObj = {};
        //pushing data from paramsArr to dataObj
        console.log("Logging paramsArr");
        console.log(paramsArr);
        for(var i=0;i<paramsArr.length;i++){
            if(paramsArr[i].split('=')[0]=='first_name'){
                dataObj['physician_fn']=paramsArr[i].split('=')[1];
                var doc_fn = dataObj['physician_fn'];
            }
            else if(paramsArr[i].split('=')[0]=='middle_name'){
                dataObj['physician_mn']=paramsArr[i].split('=')[1];
                var doc_mn = dataObj['physician_mn'];
            }
            else if(paramsArr[i].split('=')[0]=='last_name'){
                dataObj['physician_ln']=paramsArr[i].split('=')[1];
                var doc_ln = dataObj['physician_ln']
            }
        }

        var query_param = "first_name="+dataObj['physician_fn'];
        if(doc_mn!=null) {
            query_param = query_param + "&" + "middle_name=" + doc_mn;
        }
        if(doc_ln!=null){
            query_param = query_param +"&"+"last_name="+doc_ln;
        }
        console.log("final query_param is "+query_param);
        //calling the searchDoc router
        var resultURL = "/findPhysicians/search?"+query_param;

        if(resultToken){
            $('.search-flights').fadeOut('slow', function(){
                $('.sf-results').fadeIn('slow', function(){
                    // this is where you load
                    $('.sf-results').load(resultURL,function () {

                    });
                });
            });
        }

        /*

         var params = paramsArr;

         console.log("final query_param is"+query_param);
         console.log(dataObj);



         var resultURL = "/airlineReservation/schedules?"+query_param; // replace results.php with router such as /showResults

         //fade-out search flights
         if(resultToken){
           $('.search-flights').fadeOut('slow', function(){
             $('.sf-modify').fadeIn('slow');
             $('.sf-results').fadeIn('slow', function(){
               // this is where you load
               $('.sf-results').load(resultURL, function(){
                 // handle final callbacks here

               });
             });
           });
         }
         */
    });

$('.sf-cancel').on('click', function( event ) {
  resultToken=true;


  /*=========== Load Result ===============*/

  var resultURL = "/airlineReservation/cancel?"; // replace results.php with router such as /showResults

  //fade-out search flights
  if(resultToken){
    $('.search-flights').fadeOut('slow', function(){
      $('.sf-results').fadeIn('slow', function(){
        // this is where you load
        $('.sf-results').load(resultURL, function(){
          // handle final callbacks here

        });
      });
    });
  }
});

$('.sf-home').on('click', function( event ) {
  location.reload();
});

});
