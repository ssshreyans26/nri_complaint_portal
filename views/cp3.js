
console.log("cp3.js working fine");
// $(document).ready(function(e){
//     console.log("jqury loaded");
    $(document).ready(function(){
        $(document).on("click","button",function(){
          console.log(this.id);
          var str = this.id;
          
          $.ajax({
              type: "POST",
              url: '/status' ,
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
          ev.preventDefault();
        });
      });
