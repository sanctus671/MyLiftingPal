$(document).ready(function(){
    //test for mobile
    var isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    if (isMobile){
        $('#mobileModal').modal();
    }

    $('.accept-mobile').on("click", function(){
        if (navigator.userAgent.toLowerCase() === "android"){
            window.location.href = 'http://play.google.com/';
        }
        else if (navigator.userAgent.toLowerCase() === "iphone" || navigator.userAgent.toLowerCase() === "ipad" || navigator.userAgent.toLowerCase() === "ipod"){
            window.location.href = 'http://store.apple.com/';
        }
        else if (navigator.userAgent.toLowerCase() === "windows"){
            window.location.href = 'http://windows.microsoft.com/en-nz/windows-8/apps';
        }
        else{
            window.location.href = 'http://play.google.com/';
        }
    });
    
    $('.terms').on("click", function(){
        $('#tosModal').modal();
    });
    $('.forgot-pass').on("click", function(){
        $('#forgotModal').modal();
    }); 
    
    $('.reset-password').on("click", function(){
        //console.log("send reset email");
    });
    
    
    
});   
    
    
    
var mlpObject = mlp('d22c3cf2949cd85a21ddcf725f71dcef');




$(".register-form").hide();
$(".main-logout-content").hide();

if ($.cookie('mlpsession') !== undefined){
        $(".main-login-content").hide();
        $(".main-logout-content").show();

}

if (mlpObject.session !== ""){
        $(".main-login-content").hide();
        $(".main-logout-content").show();
}


$(".change-to-login").click(function(){
	$(".register-form").hide();
	$(".login-form").fadeIn("slow");
});
$(".change-to-register").click(function(){
	$(".login-form").hide();
	$(".register-form").fadeIn("slow");
});


$(".logout-button").click(function(){
	mlpObject.logout();
	$(".main-logout-content").hide();
	$(".main-login-content").fadeIn("slow");
	
});

$(".register-form").on("submit",function(e){
	e.preventDefault();
	var form = $(this);
    var username = $('.username', form).val();
	var email = $('.email', form).val();
	var password = $('.password', form).val();	
	var password2 = $('.password2', form).val();
	if (password != password2){
		$('.info', form).html("Passwords didn't match");
		return;
	}
        if (password.length < 6){
		$('.info', form).html("Password must be at least 6 characters");
		return;            
        }
	
	mlpObject.createUser({email:email, username:username, password:password});
	if (mlpObject.result["success"] == true){
		$('.info', form).html("");
		$(".register-form").hide();
		$(".login-form").fadeIn("slow");		
	}
	else{
		$('.info', form).html(mlpObject.result["errormsg"]);
	}

});


$(".login-form").on("submit",function(e){
	e.preventDefault();
	var form = $(this);
    var username = $('.username', form).val();
	var password = $('.password', form).val();	
	mlpObject.login({username:username, password:password});
	if (mlpObject.result["success"] === true){
		document.location.href="index.html";
		$('.info', form).html("");
		//$(".main-login-content").hide();
		//$(".main-logout-content").fadeIn("slow");		
		
	}
	else{
		
                if (mlpObject.result["errormsg"].indexOf("You are already logged in as") > -1){
                    $(".main-login-content").hide();
                    $(".main-logout-content").show();                    
                }
                else{
                    $('.info', form).html(mlpObject.result["errormsg"]);
                }
	}
});

$(".forgot-pass").click(function(){

});

