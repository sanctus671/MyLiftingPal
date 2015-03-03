//Facebook

window.fbAsyncInit = function() {
    FB.init({
    appId      : '1538067003114411',
    cookie     : true,                       
    xfbml      : true, 
    version    : 'v2.1'
    });
    

  };
  

function fb_login(){
    FB.login(function(response) {

        if (response.authResponse) {

            //console.log(response); // dump complete info
            access_token = response.authResponse.accessToken; //get access token
            user_id = response.authResponse.userID; //get FB UID

            FB.api('/me', function(response) {
                mlpObject.updateUser({id:$(".userid").html(), fbid: response["id"]});
                if (mlpObject.result["success"] === true){
                    $('.fb-button').attr("disabled", "true");
                    $('.fb-button').css({"background-color": "#ccc",'cursor': 'default'});
                    $('.profile-facebook').html(' Connected');
                    
                }
                else{
                    $('.bottom-right').notify({message: { type: 'danger', text: 'Failed to connect to Facebook' }}).show();
                }
            });

        } else {
            //user hit cancel button
            //console.log('User cancelled login or did not fully authorize.');

        }
    }, {
        scope: 'publish_stream,email'
    });
}



function fb_feed(url, caption, picture){
    var data = {method: 'feed', caption:caption};
    if (url.indexOf("youtube.com") > -1){
        //is a youtube video
        var link = url.split("&")[0];
        var id = url.split("=")[1];
        var source = 'www.youtube.com/v/' + id;
        picture = 'img.youtube.com/vi/' + id + '/default.jpg';
        data["source"] = source;
        data["link"] = link;
        data["picture"] = picture;
    }
    else{
        //error, not a youtube video
        if (url !== ''){
            //they entered an invalid link
            $('.bottom-right').notify({message: { type: 'info', text: 'Not a valid youtube video link' }}).show();
        }
        var url = 'www.myliftingpal.net';
        data["link"] = url;
        if (picture !== ''){
            if (!checkURL(picture)){
                $('.bottom-right').notify({message: { type: 'info', text: 'Enter a valid image' }}).show();
                //picture = 'www.myliftingpal.net/website/images/icongp.png';
                //data["picture"] = picture;
            }
            else{
                data["picture"] = picture;
            }
        }
        else{
            //picture = 'www.myliftingpal.net/website/images/icongp.png';
            //data["picture"] = picture;
        }
        
    }

    FB.ui(
      data,
      function(response) {
        if (response && !response.error_code) {
          $('.bottom-right').notify({message: { type: 'info', text: 'Successfully posted to Faceook' }}).show();
        } else {
          $('.bottom-right').notify({message: { type: 'info', text: 'Failed posting to Faceook' }}).show();
        }
      }
    );
}



(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return;
js = d.createElement(s); js.id = id;
js.src = "//connect.facebook.net/en_US/sdk.js";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


//Google plus 

var runCount = 0;
function signinCallback(authResult) {
    //console.log(runCount);
    if (runCount < 1){runCount +=1 ;return;}

    if (authResult['status']['signed_in']) {
        var accessToken = authResult['access_token']
        $.getJSON('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + accessToken, function(data) {

                mlpObject.updateUser({id:$(".userid").html(), gpid: data["id"]});
                if (mlpObject.result["success"] === true){
                    $('.gp-button').attr("disabled", "true");
                    $('.gp-button').css({"background-color": "#ccc",'cursor': 'default'});
                    $('.profile-gplus').html(' Connected');
                    
                }
                else{
                    $('.bottom-right').notify({message: { type: 'danger', text: 'Failed to connect to Google+' }}).show();
                }

        });

    } else {
        //console.log('User cancelled login or did not fully authorize.');
    }
}

function gp_share(){
    $('.bottom-right').notify({message: { type: 'info', text: 'Shared to Google+' }}).show();
}




