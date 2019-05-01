
console.log("cp3.js working fine");
// $(document).ready(function(e){
//     console.log("jqury loaded");
    $(document).ready(function(){
        $(document).on("click","button",function(e){
          // console.log(this.id);
          
          e.preventDefault();
          var str = this.id;
          $.ajax({
              type: "POST",
              url: 'http://localhost:8000/status' ,
              contentType: 'application/json',
              processData: false,
              data: JSON.stringify({data: str}),
              success: function(data) {
                console.log("Successfully saved the matched beans to the user.");
            }
        }).done(function ( ) {
            console.log("OK");
        }).fail(function ( jqXHR, textStatus, errorThrown ) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
          })
        });
      });
