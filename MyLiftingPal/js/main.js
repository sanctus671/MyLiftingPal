
    
//declare namespace

var mlpObject = mlp('d22c3cf2949cd85a21ddcf725f71dcef');

var selectedPaginatedItems = $('input:checked');

if (mlpObject.session === ''){
	document.location.href="login.html";
}



	$(document).ready(function(){
	
		//INITIALISE MLP
		
		
		
		
		//SET USER DATA
		var userData = mlpObject.getUser().result;
		if (userData["success"] === true){
		
			$(".userid").html(userData["data"]["id"]);


                        $(".units").html(userData["data"]["units"]);
                        var username = userData["data"]["username"];
			$(".username").html(username.charAt(0).toUpperCase() + username.slice(1));
                        //$('textarea.search-form').val(userData["data"]["note"]);
                        $('.user-dp').css({'background-image': 'url(' + userData["data"]["dp"] + ')'});
                        var totalRequests = userData["data"]["requests"].length;
                        $('.request-total').html(totalRequests);
                        if (totalRequests > 0){
                            $('.request-total').css({'background-color' : 'red'});
                        }
                        
                        setInterval(function(){
                            var requests = mlpObject.getRequests().result["data"];
                            var totalRequests = requests.length;
                            $('.request-total').html(totalRequests);
                            if (totalRequests > 0){
                                $('.badge.request-total').css({'background-color' : 'red'});
                            }
                            else{
                                $('.badge.request-total').css({'background-color' : ''});
                            }
                        },120000);
                            
                        

                        
		}
                else{
                    $.removeCookie('mlpsession');
                    document.location.href="login.html";
                }
		
		
		
		//INITIALISE SLIDER
		$('.navbar-brand').bigSlide({speed:200, easyClose:false});
	
	
		//REGISTER NAV CLICK EVENTS
                /*
		$("textarea.search-form").on("change",function(e){
			mlpObject.updateUser({id:$(".userid").html(), note: $('textarea.search-form').val()});
		});
            */
		$(".search-btn.findusers-mainnav").on("click",function(e){
                        $('.navbar-brand.menu-open').click();
                        setTimeout(function(){load('search', searchPage_Load)},'300');
		});
                
                $('.search-form.findusers-mainnav').keypress(function(e) {
                    if(e.which === 13) {
                        $('.search-btn.findusers-mainnav').click();
                    }
                });   
                
                $('.friend-requests').on("click",function(e){
                    e.preventDefault();
                    load('search', searchPage_Load);
                });
		
		$(".user-profile").on("click",function(e){
                    e.preventDefault();
                        $('.dropdown-toggle i:last').removeClass('fa-caret-up');
			$('.dropdown-toggle i:last').addClass('fa-caret-down');
                        
                        setTimeout(function(){load('profile', myProfile_Load)},'500');
		});
		
		$(".user-settings").on("click",function(e){
                    e.preventDefault();
                        $('.dropdown-toggle i:last').removeClass('fa-caret-up');
			$('.dropdown-toggle i:last').addClass('fa-caret-down');                        
                        setTimeout(function(){load('settings', mySettings_Load)},'500');
		});
		
		$(".logout").on("click",function(e){
			mlpObject.logout();
			document.location.href="login.html";
		});
		
		$(".help").on("click",function(e){
                    e.preventDefault();
			load('help', helpPage_Load);
		});
		
		$(".mydiary").on("click",function(e){
                    e.preventDefault();
                        setTimeout(function(){load('mydiary', myDiary_Load,{date:moment()});},'300');
		});

		$(".myexercises").on("click",function(e){
                    e.preventDefault();
                        setTimeout(function(){load('myexercises', myExercises_Load);},'300');
		});	
		
		$(".myworkouts").on("click",function(e){
                    e.preventDefault();
                        setTimeout(function(){load('myworkouts', myWorkouts_Load);},'300');
		});

		$(".myprograms").on("click",function(e){
                    e.preventDefault();
                        setTimeout(function(){load('myprograms', myPrograms_Load);},'300');
		});	

		$(".mystats").on("click",function(e){
                    e.preventDefault();
                        load('mystats', myStats_Load);
		});	

		$(".terms").on("click",function(e){
                    e.preventDefault();
			load('terms', termsPage_Load);
		});	
		
		$(".privacy").on("click",function(e){
                    e.preventDefault();
			load('privacy', privacyPage_Load);
		});

		$(".contactus").on("click",function(e){
                    e.preventDefault();
			load('contact', contactPage_Load);
		});	

		$(".api").on("click",function(e){
                    e.preventDefault();
			load('api', apiPage_Load);
		});	
                
                $("#menu").hover(
                function(){
                    if ($(".navbar-brand").css('margin-left') === "0px"){
                        $('.navbar-brand').addClass("animated wobble");
                    }
                },
                function(){
                    $('.navbar-brand').removeClass("animated wobble");                   
                });
		
	
		//CARET CHANGING
		
		//toggleCaret(".navbar-brand", ".navbar-brand i", "fa-caret-left", "fa-caret-right");
		toggleCaret(".dropdown-toggle", ".dropdown i:last", "fa-caret-up", "fa-caret-down");
                //toggleCaret(".panel-close", ".navbar-brand i", "fa-caret-left", "fa-caret-right");


		
		// ADD SLIDEDOWN ANIMATION TO DROPDOWN
		$('.navbar-right .dropdown').on('show.bs.dropdown', function(e){
                        $('.navbar-right .dropdown i:last').addClass("fa-caret-up");
                        $('.navbar-right .dropdown i:last').removeClass("fa-caret-down");
			$(this).find('.dropdown-menu').first().stop(true, true).slideDown();
		});

		// ADD SLIDEUP ANIMATION TO DROPDOWN
		$('.navbar-right .dropdown').on('hide.bs.dropdown', function(e){
                        $('.navbar-right .dropdown i:last').removeClass("fa-caret-up");
                        $('.navbar-right .dropdown i:last').addClass("fa-caret-down");                   
			$(this).find('.dropdown-menu').first().stop(true, true).slideUp();
		});
                
                //TOOLTIP
                if(!('ontouchstart' in window)){
                    $("[title]").tooltip();
                }
		
		//REGISTER MEDIA QUERIES
		
		//for navbar pushing menu  
		enquire.register("screen and (max-width: 860px)", {
			match : function() {
				$(".navbar-right").addClass("wrap push");
			},  
			unmatch : function() {
				$(".navbar-right").removeClass("wrap push");
			}
		},true); 		
		
		

                //ROUTING
                
                

		  
		//INITIAL LOAD OF MY DIARY
		setupRoutes();
		
                if (moment(userData["data"]["created"]).diff(moment(),'days') == 0 && $.cookie("mlptutorial") === undefined){
                    //first login
                    function startPage_Load(){
                        $('#helpModal').modal();
                    }
                    
                    $.get( "start.html", function( data ) {
                        $('#helpModal').html(data);
                        startPage_Load();
                    });
                    
                    
                }		
  

  
});
/* MAIN LOADER FUNCTION */

function confirmCallback(page,pageLoader,data){
    load(page,pageLoader,data);
}

function load(page,pageLoader,data){


    
    //check your not in the middle of creating an exercise
    if ($('.current-page').html() === 'myexercises' && $('.current-page').html() !== page && ($('.myexercises-new-name').val().length > 0 || $('.myexercises-new-muscle :selected').length > 0 || $('.myexercises-new-type :selected').length > 0)){
        
        $('.accept-move').unbind();
        $('#confirmModal').modal();
        $('.accept-move').on('click', function () {
            $('.myexercises-new-name').val('');
            $('.myexercises-new-muscle :selected').removeAttr("selected");
            $('.myexercises-new-type :selected').removeAttr("selected");
            load(page,pageLoader,data);
        });   
        $(".loader").hide();
        return;
    }
    
    //check your not in the middle of creating a workout
    if ($('.current-page').html() === 'myworkouts' && $('.current-page').html() !== page && ($('.myworkouts-new-name').val().length > 0 || $('.new-workout.myexercises-list tr').length > 0)){
        $('.accept-move').unbind();
        $('#confirmModal').modal();
        $('.accept-move').on('click', function () {
            $('.myworkouts-new-name').val('');
            $('.new-workout.myexercises-list').html('');
            load(page,pageLoader,data);
        });    
        $(".loader").hide();
        return;
    }
    
    //check your not in the middle of creating a program
    if ($('.current-page').html() === 'myprograms'  && $('.current-page').html() !== page && ($('.myprograms-new-name').val().length > 0 || $('.myprograms-new-duration').val().length > 0)){
        $('.accept-move').unbind();
        $('#confirmModal').modal();
        $('.accept-move').on('click', function () {
            $('.myprograms-new-name').val('');
            $('.myprograms-new-duration').val('');
            load(page,pageLoader,data);
        }); 
        $(".loader").hide();
        return;
    }    
    
    $(".loader").show(); 
    
    //change route

    var isCorrect = (page === "mydiary" || typeof data === "undefined" || typeof data['id'] === "undefined"); //checking if user is going through another persons diary
    if (page === 'viewprofile' || page === 'viewdiary' || !isCorrect){
        if (!isCorrect){
            page = 'viewdiary';
        }
        page = page + "/" + data['id'];}
    $('.current-page').html(page);
    window.location.hash = page;
    
    
    
    $('.sidebar-menu-item').removeClass('active');
    if (page === 'mydiary' || page === 'myexercises' || page === 'myworkouts' || page === 'myprograms' || page === 'mystats'){
        $('.' + page).addClass('active');
    }
    
    pageLoader(data);
    

            
    
    
    $(".loader").hide(); 
}

/* END MAIN LOADER FUNCTION */




/*LOADERS FOR NON-MAIN PAGES*/	

function profilePage_Load(data){
    var id = data["id"];
    $.get( "viewprofile.html", function( data ) {
        $( ".load-into-container" ).html( data ); 
        
        var userId = id;
        if (mlpObject.getUsers({id:userId}).result["success"] === true){
            myProfile_MainClickRegisterFunction();
            var profileData = mlpObject.result["data"];
            myProfile_appendHTML(profileData);

            
            var removeText = 'Withdraw request';
            for (var x in profileData["acceptedfriends"]){
                
                if (profileData["acceptedfriends"][x]["friendid"] === profileData["userid"]){
                    $('.profile-info').append('<a href="#viewdiary/' + profileData["userid"] + '" class="btn btn-primary view-diary' + profileData["userid"] + '">View diary</a><br/>');
                    
                    removeText = 'Remove friend';
                    
                    $('.view-diary' + profileData["userid"]).on("click",function(e){
                       e.preventDefault();
                       load('viewdiary',diaryPage_Load, {'id':profileData["userid"],'date': moment()});
                       
                    });
                }
            }            
            
            if (profileData["friends"].indexOf(profileData["userid"]) > -1 ){   
                $('.profile-friend-button').html('<button onclick="searchPage_RemoveFriend(' + profileData["userid"] + ')" class="btn btn-danger remove-friend" style="margin-bottom: 10px;">' + removeText + '</button>');
            }
            else{
                $('.profile-friend-button').html('<button onclick="searchPage_AddFriend(' + profileData["userid"] + ')" class="btn btn-success add-friend" style="margin-bottom: 10px;">Add friend</button>')
            }
            $('.profile-info').addClass('user-' + profileData["userid"]);


            
         
            
        }
        else{
           $('.bottom-right').notify({type: 'danger', message: {text:'Failed to load profile' }}).show();
        }        
        

    });    
}

function diaryPage_Load(data){
    var id = data["id"];
    var date = data["date"];

    $('.sidebar-menu-item').removeClass('active');
    var date = moment(date).format('YYYY-MM-DD');
    $.get( "viewdiary.html", function( data ) {
        $( ".load-into-container" ).html( data ); 

                //TOOLTIPS

                $("[data-toggle='tooltip']").tooltip();
                               
                
                //set the date
                $( ".selected-date").html(moment(date).format('dddd, MMMM Do, YYYY'));
                $( ".selected-date-hidden").html(date);
                //load datepicker
                $('.input-group.date').datepicker({
                    orientation: "top left",
                    todayHighlight: true,
                    autoclose: true
                });
                
               

                $(".change-date-left").on("click",function(e){
                        load('diarypage', diaryPage_Load, {'id':id,'date':moment($(".selected-date-hidden").text()).subtract(1, 'days').calendar('YYYY-MM-DD')});
                });		
                $(".change-date-right").on("click",function(e){
                        $(".loader").show();
                        load('diarypage', diaryPage_Load, {'id':id,'date':moment($(".selected-date-hidden").text()).add(1, 'days').calendar('YYYY-MM-DD')});
                });		
                $(".change-date-input").on("change",function(e){
                        $(".loader").show();
                        load('diarypage', diaryPage_Load, {'id':id,'date':moment($(".change-date-input").val())});
                });                
                
                
                
                var results = mlpObject.selectResults({assigneddate : date, userid: id}).result;
                
                
                if (results["success"] === true){
                    
                    $('.diary-username').html(results["data"][0]["username"]);
                    var exercises = [];
                    for (var index in results["data"]){
                        var resultsObject = results["data"][index];
                        var exerciseName = results["data"][index]["name"];
                        
                        var recordData = results["data"][index]["records"]
                        var records = ["Best reps with " + recordData["amrap"]["weight"] + $('.units').html() + ": " + recordData["amrap"]["reps"] + "@rpe" + recordData["amrap"]["rpe"] , 
                                       recordData["overall"]["rep"] + "RM: " + recordData["overall"]["max"] + $('.units').html(), 
                                       "Best volume for " + resultsObject["reps"] + " rep sets: " + recordData["backoffs"]["best"] + $('.units').html(), 
                                       "Last time you did " + recordData["history"]["sets"] + "x" +  recordData["history"]["reps"] + " using " + recordData["history"]["weight"] + $('.units').html()]; 
                        if (exerciseName in exercises){
                            exercises[exerciseName].push({id:resultsObject["id"], exercise:exerciseName, exerciseid:resultsObject["exerciseid"], reps:resultsObject["reps"], set:resultsObject["sets"], weight: resultsObject["weight"], rpe: resultsObject["rpe"], onerm: resultsObject["percentage"], notes : resultsObject["notes"], records: records});
                        }
                        else{
                            exercises[exerciseName] = [{id:resultsObject["id"], exercise:exerciseName, exerciseid:resultsObject["exerciseid"], reps:resultsObject["reps"], set:resultsObject["sets"], weight: resultsObject["weight"], rpe: resultsObject["rpe"], onerm: resultsObject["percentage"], notes : resultsObject["notes"], records: records}];
                        }
                    }
                    
                }
                else{
                    if ($('.diary-username').html() === "Not Loaded"){
                        if (mlpObject.getUsers({id:id}).result["success"] === true){
                            $('.diary-username').html(mlpObject.result["data"]["username"]);
                        }
                    }
                    $('.my-exercises').html('<span style="display: block;text-align:center;margin-top:-10px;">Slack off day</span>')
                }
                //sort by set    
                for (var exercise in exercises){
                    myDiary_appendHTML(exercises[exercise].sort(function (a, b) {
                        if (a.set > b.set) {
                            return 1;
                        }
                        if (a.set < b.set) {
                            return -1;
                        }
                        // a must be equal to b
                        return 0;
                    }));
   
                }
                
                $('.details.add').remove();
                if(!('ontouchstart' in window)){
                    $("[title]").tooltip();
                }

    });    
}



function searchPage_Load(){

    $.get( "search.html", function( data ) {
        $( ".load-into-container" ).html( data ); 
        
        $('.search-btn.findusers-search').on('click', function(){
            //search users and append html
            var searchTerm = $('.search-form.findusers-search').val();
            if (searchTerm === ""){
                $('.search-results').html('');
                return;
            }
            mlpObject.getUsers({username:searchTerm});
            if (mlpObject.result["success"] === true){
                $('.add-friend').unbind();
                $('.remove-friend').unbind();
                $('.search-results').html('');
                for(var x in mlpObject.result["data"]){
                    searchPage_appendHTML(mlpObject.result["data"][x]);
                }
            }
            else{
                $('.search-results').html('<span style="font-weight:bold;text-align:center;">No users found</span>');
                $('.bottom-right').notify({type: 'danger', message: {text:'No users found' }}).show();
            }
            
            searchPage_UpdateRequests();
            

            
        });
        
        $('.search-form.findusers-search').keypress(function(e) {
            if(e.which === 13) {
                $('.search-btn.findusers-search').click();
            }
        });
        
        if ($(".search-form.findusers-mainnav").val() !== ""){
            $('.search-form.findusers-search').val($(".search-form.findusers-mainnav").val());  
            $('.search-btn.findusers-search').click();
        }
        else{
            searchPage_UpdateRequests();
        }
        
        $('.invite-form').on('submit', function(e){
            e.preventDefault();
            mlpObject.inviteFriend({email:$('.searchpage-inviteemail').val()});
            if (mlpObject.result["success"] === true){
                $('.bottom-right').notify({type: 'info', message: {text:'Invite sent' }}).show();
            }
            else{
                $('.bottom-right').notify({type: 'danger', message: {text:'Failed to send invite' }}).show();
            }
        });
        
        
        
    });
    
    
}
function searchPage_RemoveFriend(id){
    mlpObject.removeFriend({friendid:id});
    if (mlpObject.result["success"] === true){

        $('.bottom-right').notify({type: 'info', message: {text:'Friend removed' }}).show();
        $('.user-' + id + ' .search-add').html('<button onclick="searchPage_AddFriend(' + id + ')" class="btn btn-success add-friend" style="margin-bottom: 10px;">Add friend</button>');
        searchPage_UpdateRequests();
    }
    else{
        $('.bottom-right').notify({type: 'danger', message: {text:'Failed to remove friend' }}).show();
    }
     
    
}

function searchPage_AddFriend(id){
    mlpObject.addFriend({friendid:id});
    if (mlpObject.result["success"] === true){
        $('.bottom-right').notify({type: 'info', message: {text:'Friend request sent' }}).show();
        $('.user-' + id + ' .search-add').html('<button onclick="searchPage_RemoveFriend(' + id + ')" class="btn btn-danger remove-friend" style="margin-bottom: 10px;">Remove friend</button>');
        searchPage_UpdateRequests();
    }
    else{
        $('.bottom-right').notify({type: 'danger', message: {text:'Failed to add friend' }}).show();
    }   
    
}

function searchPage_appendHTML(data){
    var userid = $('.userid').html();
    if (data["userid"] === userid){
        return;
    }
    var html = '<div class="row user-' + data["userid"] + '">' + 
        '<div class="col-xs-6">' + 
            '<div class="profle-picture" style="border-radius:20px;  float:right;  overflow:hidden;margin-top: 15px;">' + 
                '<img src="' + encodeURI(data["dp"].replace(/['"]+/g, '')) + '" style="vertical-align:bottom;padding:0px;display: inline-block;" class="search-dp"><br>' + 
            '</div>' + 
        '</div>' + 
        '<div class="col-xs-6" style="padding: 1em 0;">' + 
            '<div class="search-id" style="display:none;">' + data["userid"] + '</div>' + 
            '<div style="margin-bottom: 10px;"><h3 class="search-username"  style="margin-top: 0px;display:inline;">' + data["username"] + '</h3></div>';
        var removeText = 'Withdraw request';
  
        for (var x in data["acceptedfriends"]){

            if (data["acceptedfriends"][x]["friendid"] === data["userid"]){
                removeText = 'Remove friend';
            }
        }    
        
        if (data["friends"].indexOf(data["userid"]) > -1 ){    
            html = html + '<div class="search-add"><button onclick="searchPage_RemoveFriend(' + data["userid"] + ')" class="btn btn-danger remove-friend" style="margin-bottom: 10px;">' + removeText + '</button></div>';
        }
        else{
            html = html + '<div class="search-add"><button onclick="searchPage_AddFriend(' + data["userid"] + ')" class="btn btn-success add-friend" style="margin-bottom: 10px;">Add friend</button></div>';
        }
            html = html + '<div class="search-view"><a href="#viewprofile/' + data["userid"] + '" class="btn btn-primary view-profile' + data["userid"] + '">View profile</a></div>' + 
        '</div>' + 
    '</div>' + 
    '<hr>  ' ;
    
    $('.search-results').append(html);
    
    $('.view-profile' + data["userid"]).on("click",function(e){
       e.preventDefault();
       load('viewprofile',profilePage_Load, {'id':data["userid"]});
       
    });    
    

    
}

function searchPage_UpdateRequests(){
    $('.request-results').html("");
    if (mlpObject.getRequests().result["success"] === true){
        $('.request-total').html(mlpObject.result["data"].length)
        for(var x in mlpObject.result["data"]){
            searchPage_appendRequestHTML(mlpObject.result["data"][x]);
        }                
    }
    else{
        $('.bottom-right').notify({type: 'danger', message: {text:'No requests' }}).show();
    }    
}

function searchPage_appendRequestHTML(data){
    var html = '<div class="row user-' + data["userid"] + '">' + 
        '<div class="col-xs-6">' + 
            '<div class="profle-picture" style="border-radius:20px;  float:right;  overflow:hidden;margin-top: 15px;">' + 
                '<img src="' + encodeURI(data["dp"].replace(/['"]+/g, '')) + '" style="vertical-align:bottom;padding:0px;display: inline-block;" class="search-dp"><br>' + 
            '</div>' + 
        '</div>' + 
        '<div class="col-xs-6" style="padding: 1em 0;text-align: left;">' + 
            '<div class="search-id" style="display:none;">' + data["userid"] + '</div>' + 
            '<div style="margin-bottom: 10px;"><h3 class="search-username"  style="margin-top: 0px;display:inline;">' + data["username"] + '</h3></div>' + 
            '<div class="search-add"><button onclick="searchPage_AddFriend(' + data["userid"] + ')" class="btn btn-success add-friend" style="margin-bottom: 10px;">Accept</button>' + 
            '<button onclick="searchPage_RemoveFriend(' + data["userid"] + ')" class="btn btn-danger add-friend" style="margin-bottom: 10px;margin-left: 10px;">Reject</button></div>' +             
            '<div class="search-view"><a href="#viewprofile/' + data["userid"] + '" class="btn btn-primary view-profile' + data["userid"]  + '">View profile</a></div>' + 
        '</div>' + 
    '</div>' + 
    '<hr>  ' ;
    
    $('.request-results').append(html);
    
    $('.view-profile' + data["userid"]).on("click",function(e){
       e.preventDefault();
       load('viewprofile',profilePage_Load, {'id':data["userid"]});
       
    });
    
    
}


function helpPage_Load(){

    $.get( "help.html", function( data ) {
        $( ".load-into-container" ).html( data ); 
        moveScroller("#helpnav-anchor", "#helpnav");
        helpPage_MuscleModal();

    });
}

function helpPage_MuscleModal(){
    $('.bodyarea-val').on('change', function (e) {
        
        var optionSelected = $("option:selected", this);
        var valueSelected = this.value;
        var currentResults = $('.current-results').html();
        $('.bodyarea').hide();
        $('.current-results').html(valueSelected.split(' ')[0]);
        if (valueSelected === "Upper Body"){
            $('.iscircular').show();
        }
        else if (valueSelected === "Lower Body"){
            $('.iscircular').show();
        }
        else{
            $('.result-container').css({"padding":"0 15px"});
            $('.current-results').append(', Rectus Abdominis');
            $('.current-results').css({"font-weight":"bold"});
        }
        
        

    }); 
    $('.iscircular-val').on('change', function (e) {
        var optionSelected = $("option:selected", this);
        var valueSelected = this.value;
        var currentResults = $('.current-results').html();
        $('.iscircular').hide();
        if (valueSelected === "Yes"){
            if (currentResults === "Upper"){
                $('.ismovingaway').show();
            }
            else{
                $('.ismovingaway').show();
                
            }
            $('.current-results').append(", Isolation");
            
        }
        else{
            if (currentResults === "Upper"){
                $('.ismovingaway').show();
            }
            else{
                $('.israisingheel').show();
              
            }
            $('.current-results').append(", Compound");
        }
        
        

    }); 
    $('.ismovingaway-val').on('change', function (e) {
        var optionSelected = $("option:selected", this);
        var valueSelected = this.value;
        var currentResults = $('.current-results').html();
        $('.ismovingaway').hide();
        
        if (currentResults === "Upper, Isolation"){
            if(valueSelected === "Yes"){
                $('.current-results').append(", Shoulders, Triceps, Deltoids");
                $('.result-container').css({"padding":"0 15px"});
                $('.current-results').css({"font-weight":"bold"});                 
            }
            else{
                $('.current-results').append(", Bicep, Pectoralis");
                $('.result-container').css({"padding":"0 15px"});
                $('.current-results').css({"font-weight":"bold"});                 
            }
        }
        else if (currentResults === "Lower, Isolation"){
             if(valueSelected === "Yes"){
                $('.current-results').append(", Legs, Quadriceps");
                $('.result-container').css({"padding":"0 15px"});
                $('.current-results').css({"font-weight":"bold"});  
            }
            else{
                $('.current-results').append(", Legs, Hamstrings, Gluteus");
                $('.result-container').css({"padding":"0 15px"});
                $('.current-results').css({"font-weight":"bold"});                  
            }           
        }
        else if (currentResults === "Upper, Compound"){
            if(valueSelected === "Yes"){
                $('.current-results').append(", Push, Press, Deltoids, Triceps, Pectoralis");
                $('.result-container').css({"padding":"0 15px"});
                $('.current-results').css({"font-weight":"bold"});                  
            }
            else{
                $('.current-results').append(", Pull, Latissimus Dorsi, Trapezius, Rhomboids");
                $('.result-container').css({"padding":"0 15px"});
                $('.current-results').css({"font-weight":"bold"});                  
            }            
        }
        
        

    }); 
    $('.israisingheel-val').on('change', function (e) {
        var optionSelected = $("option:selected", this);
        var valueSelected = this.value;
        var currentResults = $('.current-results').html();
        $('.israisingheel').hide();
        if (valueSelected === "Yes"){
            $('.current-results').append(", Legs, Gastrocnemius, Soleus");
            $('.result-container').css({"padding":"0 15px"});
            $('.current-results').css({"font-weight":"bold"});   
        }
        else{
            $('.current-results').append(", Legs, Quadriceps, Hamstrings");
            $('.result-container').css({"padding":"0 15px"});
            $('.current-results').css({"font-weight":"bold"});              
        }

    }); 
    
    
}

function termsPage_Load(){

    $.get( "terms.html", function( data ) {
        $( ".load-into-container" ).html( data );  

    });
}

function privacyPage_Load(){

    $.get( "privacy.html", function( data ) {
        $( ".load-into-container" ).html( data ); 

    });
}


function contactPage_Load(){

    $.get( "contact.html", function( data ) {
        $( ".load-into-container" ).html( data ); 

    });
}

function apiPage_Load(){


    $.get( "api.html", function( data ) {
        $( ".load-into-container" ).html( data );
        

    });
    

}


/*END LOADERS FOR NON-MAIN PAGES*/	






/*MY PROFILE FUNCTIONS */

function myProfile_Load(){

    $.get( "profile.html", function( data ) {
        
        $( ".load-into-container" ).html( data );  
        var userId = $(".userid").html();
        if (mlpObject.getUsers({id:userId}).result["success"] === true){
            myProfile_MainClickRegisterFunction();
            var profileData = mlpObject.result["data"];
            myProfile_appendHTML(profileData);
            
            
        }
        else{
           $('.bottom-right').notify({type: 'danger', message: {text:'Failed to load profile' }}).show();
        }
        if(!('ontouchstart' in window)){
            $("[title]").tooltip({delay: { show: 500, hide: 0 } });
        }        

    });

}
function myProfile_OnermCalc(type){
    $('.modal-new-' + type + '-item .calculate-onerm').unbind("click");
    $('.modal-new-' + type + '-item .calculate-onerm').on("click", function(e){
        var e = $(e.target);
        var exerciseId = e.closest('.row').attr('class').split(" ")[2].split("-")[1];
        var calculatedMax = 0;
        if (mlpObject.getMax({exerciseid:exerciseId}).result["success"] === true){
            calculatedMax = mlpObject.result["data"]["onerm"];
        }
        else{
           $('.bottom-right').notify({type: 'danger', message: {text:'Failed to find a max' }}).show();
        }
        $('.' + type + 'exercise-' + exerciseId + ' .onerm').val(calculatedMax);

    });    
}
function myProfile_MainClickRegisterFunction(){
    $('.btn-circle-main').on("click",function(){
        myDiary_NewModelInitialiseExercises();
        $('.modal-new-inputs.modal-new-main').html(
                '<div class="modal-new-input"><select class="form-control type" style="width: 70%;"><option>Actual</option><option>Estimated</option></select></div>' +
                '<div class="modal-new-input"><a href="javascript:void(0);" class="btn btn-primary calculate-onerm" title="Automatically calculates your one rep max based on your diary entries">Calculate</a></div>' +
                '<div class="modal-new-input"><input type="number" class="form-control onerm" placeholder="1RM" step="0.01" min="0"></div>'
                );
        
        myProfile_OnermCalc('recent');
        
        $('#newModal').modal();
        
        $('.search-btn, .pagination.search').on("click", function(){
            $('.modal-exercises .modal-new-search-item .modal-new-inputs.modal-new-main').html(
                '<div class="modal-new-input"><select class="form-control type" style="width: 70%;"><option>Actual</option><option>Estimated</option></select></div>' +
                '<div class="modal-new-input"><a href="javascript:void(0);" class="btn btn-primary calculate-onerm" title="Automatically calculates your one rep max based on your diary entries">Calculate</a></div>' +
                '<div class="modal-new-input"><input type="number" class="form-control onerm" placeholder="1RM" step="0.01" min="0"></div>'
                );   
            myProfile_OnermCalc('search');       
        });
        
        
        $('.pagination.recent').on("click", function(){
            $('.modal-exercises .modal-new-recent-item .modal-new-inputs.modal-new-main').html(
                '<div class="modal-new-input"><select class="form-control type" style="width: 70%;"><option>Actual</option><option>Estimated</option></select></div>' +
                '<div class="modal-new-input"><a href="javascript:void(0);" class="btn btn-primary calculate-onerm" title="Automatically calculates your one rep max based on your diary entries">Calculate</a></div>' +
                '<div class="modal-new-input"><input type="number" class="form-control onerm" placeholder="1RM" step="0.01"></div>'
                );   
            myProfile_OnermCalc('recent');        
        });        
        
        
    });
    

    
    $('.accept-add').on("click", function(e){
            //add new checked items before doing final add
            $('.modal-new-checkbox:checked').each(function(){
                var $this = $(this); 
                var found = false;
                selectedPaginatedItems.each(function(){
                    if ($this.attr('class') === $(this).attr('class')){
                        found = true;
                        return false;                
                    }  
                });
                 if (found === false){
                    selectedPaginatedItems.push(this);
                }        
            });     
            
            var selectedItems = selectedPaginatedItems;

            selectedItems.each(function() {
                var currentElement = $(this);
                var className = currentElement.attr('class').split(' ')[1];
                
                
                    var exerciseid = className.split('-')[1];
                    

                    var onerm = $("." + className + " .onerm").val();
                    var type = $("." + className + " .type").val();
                    if (mlpObject.addStats({exerciseid: exerciseid, onerm: onerm, type: type}).result["success"] === false){
                       $('.bottom-right').notify({type: 'danger', message: {text:'Failed to add a max' }}).show();
                    };                    
                    

                });
                
            $('.bottom-right').notify({type: 'info', message: {text: 'Maxes added' }}).show(); 
            $('body').removeClass('modal-open');
            $('body').css('padding-right','0px');            
            load('profile', myProfile_Load);            
       
    });
    
    $('.delete-account').on("click", function(){
        $('#profile-deleteModal').modal();
    });
    
    $('.accept-delete').on("click", function(){
        mlpObject.deleteUser({id:$(".userid").html()});
        mlpObject.logout();
        document.location.href="login.html";
    });
    
    $('.edit-profile').on("click", function(){
        $('#profile-editModal').modal();
    });    
    
    $('.accept-edit').on("click", function(){
        var weight = $('.edit-profile-weight').val();
        var gender = $('.edit-profile-gender').val();
        var age = $('.edit-profile-age').val();    
        var about = $('.edit-profile-about').val();
        var why = $('.edit-profile-why').val();
        var goals = $('.edit-profile-goals').val(); 
        mlpObject.updateProfile({userid:$(".userid").html(), weight:weight, gender:gender, age:age, about:about, why:why, goals:goals});
        if (mlpObject.result["success"] === true){
            $('.bottom-right').notify({type: 'info', message: {text: 'Profile updated' }}).show();
            $('body').removeClass('modal-open');
            $('body').css('padding-right','0px');            
            load('profile', myProfile_Load);
        }
        else{
           $('.bottom-right').notify({type: 'danger', message: {text:'Error updating profile' }}).show();
        }

    });    
    
    $('.change-dp').on("click", function(){
        $('#profile-imageModal').modal();
    });    
    
    $('.accept-image-edit').on("click", function(){
      
        
        
        if (!checkURL($('.edit-profile-url').val())){
            $('.bottom-right').notify({type: 'info', message: {text: 'Enter a valid image' }}).show();
            return;
        }
        
        var img = new Image();
        img.src = $('.edit-profile-url').val(); 
        img.onload = function() {
            
            if (this.width === 120 || this.height === 120){
                mlpObject.updateProfile({userid:$(".userid").html(), dp:'"' + $('.edit-profile-url').val() + '"'});
                if (mlpObject.result["success"] === true){
                    $('.user-dp').css({'background-image': 'url(' + $('.edit-profile-url').val() + ')'});
                    $('.bottom-right').notify({type: 'info', message: {text: 'Profile picture updated' }}).show();
                    $('body').removeClass('modal-open');
                    $('body').css('padding-right','0px');                    
                    load('profile',myProfile_Load);
                }
                else{
                   $('.bottom-right').notify({type: 'danger', message: {text:'Error updating profile picture' }}).show();
                }                
                
            }
            else{
                $('.bottom-right').notify({type: 'info', message: {text: 'Image needs to be 120x120' }}).show();
            }
            
        };
                 
        
        
       
        
    });      
    
}

function myProfile_appendHTML(data){
    $('.profile-dp').attr("src",data["dp"].split('"')[1]);
    $('.profile-username').html(data["username"]);
    $('.profile-email').html(data["email"]);
    $('.weight').html(data["weight"] + data["units"]);
    $('.gender').html(data["gender"]);
    $('.age').html(data["age"]);
    
    if (data["fbid"] !== null){
        $('.profile-facebook').html(' Connected');
        $('.fb-button').css({'background-color': '#ccc'});
        $('.fb-button').attr("disabled", "true");
        
    }
    if (data["gpid"] !== null){
        $('.profile-gplus').html(' Connected');
        $('.gp-button').css({'background-color': '#ccc','cursor': 'default'});
        $('.gp-button').attr("disabled", "true");
    } 
    
    $('.profile-about').html(data["about"]);
    $('.profile-why').html(data["why"]);
    $('.profile-goals').html(data["goals"]);
    
    for (var x in data["stats"]){
        var stat = data["stats"][x];
        $('.profile-maxes').append('<div class="profile-max-' + stat["exerciseid"] + '">' + stat["name"] + ': '+ stat["onerm"] + data["units"] + ' (' + stat["type"] + ')');
    }
    
    
    $('.edit-profile-weight').val(data["weight"]);
    $('.edit-profile-gender').val(data["gender"]);
    $('.edit-profile-age').val(data["age"]);    
    $('.edit-profile-about').val(data["about"]);
    $('.edit-profile-why').val(data["why"]);
    $('.edit-profile-goals').val(data["goals"]);    
    $('.edit-profile-url').val(data["dp"].split('"')[1]); 
    
    var html = ''
    for (var x in data["acceptedfriends"]){
        var friend = data["acceptedfriends"][x];
        if (x % 3 == 0){
            
            if (x != 0){
                html = html + '</div>';
            }
            html = html +  '<div class="row">';
        }
        html = html + '<div class="col-md-4">' +
                            '<div class="friends-picture" style="border-radius:10px;  float:right;  overflow:hidden;">' +
                                '<a href="#viewprofile/' + friend["friendid"] + '" onclick="load(\'viewprofile\',profilePage_Load, {\'id\':' + friend["friendid"] + '});return false;"><img src="' + friend["dp"].replace(/['"]+/g, "") + '" style="width:60px;height:60px; vertical-align:bottom;padding:0px;display: inline-block;" class="friends-dp"></a><br/>' +
                            '</div>' +
                            '<div class="friends-username" style="margin-left: -25px;margin-top: 40px;">' +
                            '<a href="#viewprofile/' + friend["friendid"] + '" onclick="load(\'viewprofile\',profilePage_Load, {\'id\':' + friend["friendid"] + '});return false;" style="" class="friends-username-text">' + friend["username"] + '</a>' +
                            '</div>' +
                       '</div>';
    }
    
    html = html + '</div>';
    
    
    $('.profile-friends').html(html);
    
    
}
/*END MY PROFILE FUNCTIONS /*




/*MY SETTINGS FUNCTIONS */

function mySettings_Load(){

    $.get( "settings.html", function( data ) {
        $( ".load-into-container" ).html( data ); 
        $('.new-unit').val($('.units').html());
        mySettings_MainClickRegisterFunction();

    });
}

function mySettings_MainClickRegisterFunction(){
    $('.password-change').on("click", function(e){
        e.preventDefault();
        var userId = $(".userid").html();
        var oldPassword = $('.new-password-current').val();
	var password = $('.new-password').val();	
	var password2 = $('.new-password-repeat').val();
	if (password !== password2){
           $('.bottom-right').notify({type: 'danger', message: {text:"Passwords didn't match" }}).show();
            return;
	}
        if (password.length < 6){
           $('.bottom-right').notify({type: 'danger', message: {text:"Password must be at least 6 characters" }}).show();
            return;            
        }
        mlpObject.updateUser({id:userId, password:password, oldpassword: oldPassword});
        if (mlpObject.result["success"] === true){
            $('.bottom-right').notify({type: 'info', message: {text: "Password changed" }}).show();
            $('.new-password-current').val('');
            $('.new-password').val('');
            $('.new-password-repeat').val('');
            $('.change-password').slideToggle();
        }
        else{
           $('.bottom-right').notify({type: 'danger', message: {text:"Current password was incorrect" }}).show();
        }
        
        
    });
    
    $('.email-change').on("click", function(e){
        e.preventDefault();
        var userId = $(".userid").html();
        var password = $('.new-email-password').val();
	var email = $('.new-email').val();   
        
        mlpObject.updateUser({id:userId, password:password, email:email});
        
        if (mlpObject.result["success"] === true){
            $('.bottom-right').notify({type: 'info', message: {text: "Email changed" }}).show();
            $('.new-email-password').val('');
            $('.new-email').val('');
            $('.change-email').slideToggle();
        }
        else{
            if (mlpObject.result["data"] === "Password was incorrect"){
               $('.bottom-right').notify({type: 'danger', message: {text:"Password was incorrect" }}).show();
            }
            else{
               $('.bottom-right').notify({type: 'danger', message: {text:"Failed updating email" }}).show();
            }
        }        
        
    });
    $('.pref-change').on("click", function(e){
        e.preventDefault();
        var userId = $(".userid").html();
        var preferences = parseInt($('.new-pref').val());
        mlpObject.updateSettings({userid:userId,emailpreferences:preferences});
        if (mlpObject.result["success"] === true){
            $('.bottom-right').notify({type: 'info', message: {text: "Email preferences changed" }}).show();
            $('.change-preferences').slideToggle();
        }
        else{
           $('.bottom-right').notify({type: 'danger', message: {text:"Failed to update email preferences" }}).show();
        }        
    });
    
    $('.unit-change').on("click", function(e){
        e.preventDefault();
        var userId = $(".userid").html();
        var units = $('.new-unit').val();
        mlpObject.updateSettings({userid:userId,units:units});
        if (mlpObject.result["success"] === true){
            $('.units').html(units);
            $('.bottom-right').notify({type: 'info', message: {text: "Units changed" }}).show();
            $('.change-units').slideToggle();
        }
        else{
           $('.bottom-right').notify({type: 'danger', message: {text:"Failed to update units" }}).show();
        }                 
    });    
    
    
}


/*END MY SETTINGS FUNCTIONS /*


/*MY STATS FUNCTIONS */

function myStats_Load(){ 
    
    $.get( "mystats.html", function( data ) {
        $( ".load-into-container" ).html( data ); 
        //TOOLTIPS
        $("[data-toggle='tooltip']").tooltip();
        myStats_MainClickRegisterFunction();
        
        var metric = $('.mystats-metric').val();
        var timeframe = $('.duration-button.active').html();
        var exercise = $('.search-form.mystats-search').val();
        var type = $('.mystats-type').val();
        var accumulation = $('.mystats-accumulation').val();
        
        var options = {metric:metric,timeframe:timeframe,name:exercise,type:type,accumulation:accumulation};

        mlpObject.getData(options);
        
        if (mlpObject.result["success"] === true){

            //$('.bottom-right').notify({type: 'info', message: {text: 'Graph loaded' }}).show();
            if (exercise === ''){
                $('.mystats-currentview').html(metric + " for " + type.toLowerCase());
            }
            else{
                $('.mystats-currentview').html(metric + " for " + exercise.toLowerCase());
            }
            for (var index in mlpObject.result["data"]){
                var date = mlpObject.result["data"][index]["x"];
                var value = mlpObject.result["data"][index]["y"];
                mlpObject.result["data"][index]["x"] = new Date(date);
                mlpObject.result["data"][index]["y"] = parseInt(value);
            }
            myStats_LoadGraph(mlpObject.result["data"]); 
        }
        else{

            //$('.bottom-right').notify({message: { type: 'danger', text: 'No data to load' }}).show();

        }
        
        


    });
}

function myStats_MainClickRegisterFunction(){
    $('.mystats-update').on("click", function(){
        var metric = $('.mystats-metric').val();
        var timeframe = $('.duration-button.active').html();
        var exercise = $('.search-form.mystats-search').val();
        var type = $('.mystats-type').val();
        var accumulation = $('.mystats-accumulation').val();
        
        var options = {metric:metric,timeframe:timeframe,name:exercise,type:type,accumulation:accumulation};
        mlpObject.getData(options);
        
        if (mlpObject.result["success"] === true){

            $('.bottom-right').notify({type: 'info', message: {text: 'Graph loaded' }}).show();
            if (exercise === ''){
                $('.mystats-currentview').html(metric + " for " + type.toLowerCase());
            }
            else{
                $('.mystats-currentview').html(metric + " for " + exercise.toLowerCase());
            }
            for (var index in mlpObject.result["data"]){
                var date = mlpObject.result["data"][index]["x"];
                var value = mlpObject.result["data"][index]["y"];
                mlpObject.result["data"][index]["x"] = new Date(date);
                mlpObject.result["data"][index]["y"] = parseInt(value);
            }            
            myStats_LoadGraph(mlpObject.result["data"]); 
        }
        else{

           $('.bottom-right').notify({type: 'danger', message: {text:'No data to load' }}).show();
        }
        
    });
    
    $('.mystats-type').on("change", function(){
       $('.search-form.mystats-search').val('');
        
    }); 
    
    $('.search-form.mystats-search').on("change", function(){
       $('.mystats-type').val('');
        
    }); 
    
   
    
    
    $('.search-btn.mystats-search').on("click", function(){
        $('.mystats-modal.search-form').val($('.search-form.mystats-search').val());
        $('.modal-new-search-term').html($('.mystats-modal.search-form').val());
        if ($('.search-form.mystats-search').val() !== ''){
            
            $('.mystats-modal.search-btn').click();
        }
       $('#newModal').modal();
        
    });
    $('.search-form.mystats-search').keypress(function(e) {
        if(e.which === 13) {
            $('.search-btn.mystats-search').click();
        }
    });     
    
    $('.mystats-modal.search-form').keypress(function(e) {
        if(e.which === 13) {
            $('.mystats-modal.search-btn').click();
        }
    }); 
    
    
    $('.mystats-select-btn').on("click", function(){
        $('.search-form.mystats-search').val($('input[name=radio-exercise-select]:checked', '.modal-search-results').val());
        $('.mystats-type').val('');
        $('.mystats-update').click();
        
    });   
    
    
    $('.mystats-modal.search-btn').on("click", function(){
        $('.modal-new-search-term').html($('.mystats-modal.search-form').val());
        $('.modal-search-results').html('');
        mlpObject.getExercises({name:$('.mystats-modal.search-form').val()});
        if (mlpObject.result["success"] === true){
            for (var index in mlpObject.result["data"]){
                if (index > 9){
                    break;
                }
                myStats_appendExerciseSelectModalHTML(mlpObject.result["data"][index]);
            }
        }
        else{
           $('.bottom-right').notify({type: 'danger', message: {text:'No exercises found' }}).show();
        }
        
    });    
    
    
    
    $('.duration-button').on("click", function(e){
        var e = $(e.target);
        var clickedClass = e.attr('class').split(' ')[3];
        $('.duration-button').removeClass('active');
        $('.' + clickedClass).addClass('active');
        
        $('.mystats-update').click();
    });     
    

    $('.mystats-metric').on("change", function(e){
        $('.mystats-update').click();
    });     
    
    
    $('#newModal').on('hidden.bs.modal', function () {
            $('.modal-search-results').html('');
            
    });    
    
    
}

function myStats_appendExerciseSelectModalHTML(data){
    var html =  '<div class="row" style="padding:10px 0;">'
                    + '<input type="radio" name="radio-exercise-select" class="selected-exercise" style="margin-right: 10px;" value="' + data["name"] + '">'
                    + data["name"]    
                    + '</div>'  ;
    $('.modal-search-results').append(html);     
}


function myStats_LoadGraph(data){
    var chart = new CanvasJS.Chart("chartContainer",
        {
        axisX:{      
            valueFormatString: "DD MMM YYYY" ,
        },
        axisY: {
          valueFormatString: "#,###"
      }  ,             
            
            data: [
            {

             
                
                type: "line",
                dataPoints: data
            }
            ]
        }); 
    
    chart.render();
}


/*END MY STATS FUNCTIONS /*


/*MY EXERCISES FUNCTIONS*/


function myExercises_Load(){
 
    
    $.get( "myexercises.html", function( data ) {
        $( ".load-into-container" ).html( data ); 
        //TOOLTIPS
        $("[data-toggle='tooltip']").tooltip();        
        myExercises_MainClickRegisterFunction();
        var userId = $(".userid").html();
        mlpObject.getExercises({userid:userId});
        if (mlpObject.result["success"] === true){
            var dataArray = mlpObject.result["data"];
        }
        else{
            console.log("Failed to get exercises, maybe you dont have any!");
            //$('.bottom-right').notify({message: { type: 'danger', text: 'Failed to load exercises' }}).show();
        }        
        
        

        for (var x in dataArray){
            myExercises_appendHTML(dataArray[x]);
        }
        
        if(!('ontouchstart' in window)){
            $("[title]").tooltip({delay: { show: 500, hide: 0 } });
        } 
        

    });    
}


function myExercises_MainClickRegisterFunction(){
        $(".myexercises-addtoModal-accept").on("click",function(e){
            var exerciseId = $('.myexercises-addtoModal-id').html();
            var data = {"sets":'1', "exerciseid":exerciseId, "assigneddate" : moment().format('YYYY-MM-DD'),weight:'0',reps:'0',rpe:'0',percentage:'0' };
            if (mlpObject.addResults(data).result["success"] === false){
                $('.bottom-right').notify({type: 'info', message: {text: 'Failed to add this exercise to your diary' }}).show();
            }
            else{
                $('.bottom-right').notify({type: 'info', message: {text: 'Exercise added to your diary' }}).show();
            }
        });
        
        
	$(".myexercises-create").on("click",function(e){

            e.preventDefault();
            var exerciseName = $('.myexercises-new-name').val();
            if (exerciseName === ""){
               $('.bottom-right').notify({type: 'danger', message: {text:'Enter an exercise name' }}).show();
 
                return;
            }
            
            var exerciseMuscle = '';
            var exerciseMuscles = $('.myexercises-new-muscle').val();
            for (var index in exerciseMuscles){
                if (index != 0){
                    exerciseMuscle = exerciseMuscle + ', ';
                }
                exerciseMuscle = exerciseMuscle + exerciseMuscles[index];
            }
            
            var exerciseType = '';
            var exerciseTypes = $('.myexercises-new-type').val();
            for (var index in exerciseTypes){
                if (index != 0){
                    exerciseType = exerciseType + ', ';
                }
                exerciseType = exerciseType + exerciseTypes[index];
            }            
            

            mlpObject.createExercise({name: exerciseName, musclegroup: exerciseMuscle, type: exerciseType});
            if (mlpObject.result["success"] === true){
                $('.bottom-right').notify({type: 'info', message: {text: 'New exercise added' }}).show();
                
            }
            
            else{
                $('.bottom-right').notify({type: 'danger', message: {text:'Exercise already exists!' }}).show();
            }

            load('myexercises', myExercises_Load);

                
	}); 

        $('.myexercises-search.search-form').keypress(function(e) {
            if(e.which === 13) {
                $('.myexercises-search.search-btn').click();
            }
        });
    
	$(".myexercises-search.search-btn").on("click",function(e){
            var searchTerm = $('.myexercises-search.search-form').val();
            var userId = $(".userid").html();

            $(".myexercises-list").html("");
            mlpObject.getExercises({userid:userId, name: searchTerm})
            if (mlpObject.result["success"] === true){
                var dataArray = mlpObject.result["data"];
            }
            else{
                $(".myexercises-list").html('<span style="font-weight:bold;text-align:center;">No exercises found</span>');
               $('.bottom-right').notify({type: 'danger', message: {text:'No exercises found' }}).show();
            }

            for (var x in dataArray){
                myExercises_appendHTML(dataArray[x]);
            }            
            
            
                
	}); 

	$(".myexercises-editModal-accept-edit").on("click",function(e){


            var exerciseId = $(".myexercises-editModal-id").html();
            var exerciseName = $('.myexercises-editModal-name').val();
            
            
            
            var exerciseMuscle = '';
            var exerciseMuscles = $('.myexercises-editModal-muscle').val();    
            for (var index in exerciseMuscles){
                if (index != 0){
                    exerciseMuscle = exerciseMuscle + ', ';
                }
                exerciseMuscle = exerciseMuscle + exerciseMuscles[index];
            }
            
            var exerciseType = '';
            var exerciseTypes = $('.myexercises-editModal-type').val();
            for (var index in exerciseTypes){
                if (index != 0){
                    exerciseType = exerciseType + ', ';
                }
                exerciseType = exerciseType + exerciseTypes[index];
            }
            
            
            mlpObject.updateExercise({id:exerciseId, name: exerciseName, musclegroup: exerciseMuscle, type: exerciseType});
            if (mlpObject.result["success"] === true){
                $('.myexercises-' + exerciseId + ' .myexercises-more').html(exerciseName + ' ' + $('.myexercises-' + exerciseId + ' .myexercises-more i')[0].outerHTML);
                $('.myexercises-' + exerciseId + ' .myexercises-moredata').html(exerciseType + '<br/>' + exerciseMuscle);
                $('.bottom-right').notify({type: 'info', message: {text: 'Exercise changed' }}).show();
            }
            else{
               $('.bottom-right').notify({type: 'danger', message: {text:'Failed to change exercise' }}).show();
            }  
            //load('myexercises',myExercises_Load);
            $('body').removeClass('modal-open');
            $('body').css('padding-right','0px');
             
            
	});         
        
        
	$(".myexercises-deleteModal-accept-delete").on("click",function(e){
            var exerciseId = $(".myexercises-deleteModal-id").html();
            mlpObject.deleteExercise({id:exerciseId});
            if (mlpObject.result["success"] === true){
                $('.myexercises-' + exerciseId).remove();
                $('.bottom-right').notify({type: 'info', message: {text: 'Exercise deleted' }}).show();
            }
            else{
               $('.bottom-right').notify({type: 'danger', message: {text:'Failed to delete exercise' }}).show();
            }
            
            //load('myexercises',myExercises_Load);
            $('body').removeClass('modal-open');
            $('body').css('padding-right','0px');            
            
                          
	});  
        
        
      
}




function myExercises_appendHTML(dataArray){

    var exerciseId = dataArray["id"];
    var className = "myexercises-" + exerciseId;
    $(".myexercises-list").append(myExercises_generateHTML(dataArray));

	$("." + className + " .myexercises-edit").on("click",function(e){
            //bring up modal to edit
            $(".myexercises-editModal-id").html(exerciseId);
            $(".myexercises-editModal-name").val(dataArray["name"]);
            $(".myexercises-editModal-muscle").val(dataArray["musclegroup"].split(", "));
            $(".myexercises-editModal-type").val(dataArray["type"].split(", "));          
            $('#myexercises-editModal').modal();
                
	});   
        
	$("." + className + " .myexercises-delete").on("click",function(e){
            //bring up modal to confirm delete
            $(".myexercises-deleteModal-id").html(exerciseId);

            $('#myexercises-deleteModal').modal();
                
	});   
        
	$("." + className + " .myexercises-addresults").on("click",function(e){
            //bring up modal to suggest where to add exercise to (workouts or diary)
            $(".myexercises-addtoModal-id").html(exerciseId);

            $('#myexercises-addtoModal').modal();
                
	});         
        
        
	$("." + className + " .myexercises-more").on("click",function(e){ 
            //toggle dropdown with more info
            $("." + className + " .myexercises-moredata").slideToggle();
                
	});  
        
        toggleCaret("." + className + " .myexercises-more", "." + className + " .myexercises-more i", "fa-caret-up", "fa-caret-down");
        
}

function myExercises_generateHTML(dataArray){

    var exerciseId = dataArray["id"];
    var exerciseName = dataArray["name"];
    var exerciseType = dataArray["type"];
    var exerciseMuscle = dataArray["musclegroup"];
    var html = 
            '<tr class="myexercises-' + exerciseId + '" style="border-top: 1px solid #ddd;">' + 
            '<th scope="row" style="line-height: 30px;"><a href="javascript:void(0);" class="myexercises-more">' + exerciseName + ' <i class="fa fa-caret-down"></i></a>\n\
            <div class="myexercises-moredata" style="font-weight: initial; display:none;">' + exerciseType + '<br/>' + exerciseMuscle + '</div></th>' + 
            '<td style="float:right; border-top:none;">' + 
            '<a href="javascript:void(0);" class="btn btn-default btn-circle myexercises-addresults" style="margin-right: 2px;" title="Add this exercise to your diary"><i class="fa fa-plus"></i></a>'+
            '<a href="javascript:void(0);" class="btn btn-primary btn-circle myexercises-edit" style="margin-right: 2px;" title="Edit exercise"><i class="fa fa-pencil-square-o"></i></a>';
    
            if (true){
                html = html + '<a href="javascript:void(0);" class="btn btn-danger btn-circle myexercises-delete" title="Delete exercise"><i class="fa fa-times"></i></a>'
            }
            html = html + '</td>' + 
            '</tr >';            
  
    
    
    return html;
    
    
}






/* END MY EXERCISES FUNCTIONS*/



/* MY WORKOUTS FUNCTIONS*/


function myWorkouts_Load(){
     
    $.get( "myworkouts.html", function( data ) {
        $( ".load-into-container" ).html( data );  
        var dataArray = mlpObject.getWorkouts({userid:$('.userid').html()}).result["data"];
        if (mlpObject.result["success"] === false){
            console.log("Failed to get workouts. Maybe you don't have any!");
        }
        //dataArray[] = [{exerciseid:'1',ordering:"1",percentage:"80",reps:"5",rpe:"6",sets:"2",weight:"90"},{exerciseid:'2',ordering:"1",percentage:"80",reps:"5",rpe:"6",sets:"2",weight:"90"}];
        for (var x in dataArray){
            myWorkouts_appendHTML(dataArray[x]);
        }
        myWorkouts_MainClickRegisterFunction();
        
        if(!('ontouchstart' in window)){
            $("[title]").tooltip({delay: { show: 500, hide: 0 } });
        } 
    });
    
    
}

function myWorkouts_MainClickRegisterFunction(){
    $(".myworkouts-addtoModal-accept").on("click",function(e){
        var workoutId = $('.addto-workout-id').html();
        var data = {"workoutid":workoutId, "assigneddate" : moment().format('YYYY-MM-DD')};
        if (mlpObject.addResults(data).result["success"] === false){
            $('.bottom-right').notify({type: 'info', message: {text: 'Failed to add this workout to your diary' }}).show();
        }
        else{
            $('.bottom-right').notify({type: 'info', message: {text: 'Workout added to your diary' }}).show();
        }
    });
    
    $('.myworkouts-search.search-form').keypress(function(e) {
        if(e.which === 13) {
            $('.myworkouts-search.search-btn').click();
        }
    });    
    $('.myworkouts-search.search-btn').on('click',function(){
        var searchTerm = $('.myworkouts-search.search-form').val();
        mlpObject.getWorkouts({name:searchTerm, userid:$('.userid').html()});
        if (mlpObject.result["success"] === true){
            $('.myworkouts-list').html('');
            var dataArray = mlpObject.result["data"];
            for (var x in dataArray){
                myWorkouts_appendHTML(dataArray[x]);
            }            
        }
        else{
            $('.myworkouts-list').html('<span style="font-weight:bold;text-align:center;">No workouts found</span>');
           $('.bottom-right').notify({type: 'danger', message: {text:'No workouts found' }}).show();
        }
        
        
    });
    
    $('.pagination').on("click",function(e){
        setTimeout(function(){$('.modal-exercises .extra-input').html('<input min="1" type="number" class="form-control sets" placeholder="Sets" step="1">');},500);
    });
    
    //new workout - add exercise
    $('.myworkouts-addexercise').on("click",function(e){
        $('.accept-add').addClass('new-workout');
        myDiary_NewModelInitialise(); 
        $('#newModal .search-btn').on("click",function(e){
            setTimeout(function(){$('.extra-input').html('<input min="1" type="number" class="form-control sets" placeholder="Sets" step="1">');},500);
        });
        $('.extra-input').html('<input min="1" type="number" class="form-control sets" placeholder="Sets" step="1">');
        $('.new-workout.accept-add').on("click",function(e){
            //add new checked items before doing final add
            $('.modal-new-checkbox:checked').each(function(){
                var $this = $(this); 
                var found = false;
                selectedPaginatedItems.each(function(){
                    if ($this.attr('class') === $(this).attr('class')){
                        found = true;
                        return false;                
                    }  
                });
                 if (found === false){
                    selectedPaginatedItems.push(this);
                }        
            });     
            
            var selectedItems = selectedPaginatedItems;
                
            selectedItems.each(function() {
                var currentElement = $(this);
                var className = currentElement.attr('class').split(' ')[1];

                var exerciseid = className.split('-')[1];
                
                var sets = $("." + className + " .sets").val();
                if (sets === ''){
                    sets = "1";
                }

                var name = $("." + className + " .modal-new-exercise-name").html();
                var weight = $("." + className + " .weight").val();
                var reps = $("." + className + " .reps").val();
                var rpe = $("." + className + " .rpe").val();
                var percentage = $("." + className + " .percentage").val();

                var data = {"sets":sets, "exerciseid":exerciseid, "name":name};
                if (weight !== undefined ){data["weight"] = weight;};
                if (reps !== undefined ){data["reps"] = reps;};
                if (rpe !== undefined ){data["rpe"] = rpe;};
                if (percentage !== undefined ){data["percentage"] = percentage;};

                myWorkouts_NewWorkoutAddExercise(data);
            
            });
            $('.bottom-right').notify({type: 'info', message: {text: 'Exercises added' }}).show();
        });        
        
        $( "#newModal" ).modal();
        $('#newModal').on('hidden.bs.modal', function () {
            $('.new-workout.accept-add').unbind();
            $('.accept-add').removeClass('new-workout');
            
        });        
    });
    
    

    
    $('.myworkouts-create').on("click",function(e){
        e.preventDefault();
        var workoutName = $('.myworkouts-new-name').val();
        if (workoutName === ''){
           $('.bottom-right').notify({type: 'danger', message: {text:'No name was given for the workout' }}).show();
            return;
        }
        var result = mlpObject.createWorkout({name:workoutName}).result;
        if (result["success"] === true){
            var workoutId = result["data"]["id"];
            var order = 1;
            $('.new-workout.myexercises-list tr').each(function(){
                var currentElement = $(this);
                var exerciseId = currentElement.find('.id').html();            
                var sets = currentElement.find('.sets').html();
                var reps = currentElement.find('.reps').html();
                var weight = currentElement.find('.weight').html();
                var rpe = currentElement.find('.rpe').html();
                var percentage = currentElement.find('.percentage').html();
                mlpObject.addExercise({exerciseid:exerciseId, workoutid:workoutId,ordering:order, reps:reps, sets:sets, rpe:rpe, weight:weight, percentage:percentage});
                if (mlpObject.result["success"] === false){
                   $('.bottom-right').notify({type: 'danger', message: {text:'There was an error when creating the workout' }}).show();
                }
                order +=1;
            });
            $('.new-workout.myexercises-list').html('');
            $('.myworkouts-new-name').val('');
            $('.bottom-right').notify({type: 'info', message: {text: 'Workout created' }}).show();
            load('myworkouts',myWorkouts_Load);
        }
        else{
           $('.bottom-right').notify({type: 'danger', message: {text:'Unable to create workout' }}).show();
        }
    });
    
     
    
    
    
    
	
    
    
    $('.myworkouts-editModal-accept-edit').on("click",function(e){  

        var workoutName = $('.edit-workout-name').val();
        var workoutId = $('.myworkouts-editModal-workoutid').html();
        mlpObject.updateWorkout({id:workoutId,name:workoutName});
        if (mlpObject.result["success"] === true){
            $('.bottom-right').notify({type: 'info', message: {text: 'Workout changed' }}).show();
            //load('myworkouts',myWorkouts_Load);
            $('.myworkouts-workout-' + workoutId + ' .myexercises-more').html(workoutName + ' ' + $('.myworkouts-workout-'  + workoutId + ' .myexercises-more i')[0].outerHTML);
            $('body').removeClass('modal-open');
            $('body').css('padding-right','0px');
        }
        else{
           $('.bottom-right').notify({type: 'danger', message: {text:'Failed to change workout' }}).show();
        }
        

    });  
    
    
    $('.myworkouts-accept-delete').on("click",function(e){
        var workoutId = $('.delete-workout-id').html();
        mlpObject.deleteWorkout({id:workoutId});
        if (mlpObject.result["success"] === true){
            $('.bottom-right').notify({type: 'info', message: {text: 'Workout deleted' }}).show();
            $('.myworkouts-workout-' + workoutId).remove();
            //load('myworkouts',myWorkouts_Load);
            $('body').removeClass('modal-open');
            $('body').css('padding-right','0px');
        }
        else{
           $('.bottom-right').notify({type: 'danger', message: {text:'Failed to delete workout' }}).show();
        }
        
       
    });
    
    
    $(".myworkouts-exercise-accept-delete").on("click",function(e){

        var id = $('.delete-id').html();
        mlpObject.removeExercise({id:id});
        if (mlpObject.result["success"] === true){
            $('.bottom-right').notify({type: 'info', message: {text: 'Exercise removed' }}).show();
            //load('myworkouts',myWorkouts_Load);
            $('.myworkouts-myexercises-' + $('.exercisedata-id').html()).remove();
            $('body').removeClass('modal-open');
            $('body').css('padding-right','0px');
        }
        else{
           $('.bottom-right').notify({type: 'danger', message: {text:'Failed to remove exercise' }}).show();
        }
        
         
        });    
    
        
}

function myWorkouts_NewWorkoutAddExercise(data){

   var random = Math.floor(Math.random() * 100000);
   
   
    var html = 
            '<tr class="myworkouts-myexercises-' + data["exerciseid"] + random + '" style="border-top: 0px;">' +
                '<td scope="row" style="line-height: 30px; border-top: 0px;">' +
                        '<a href="javascript:void(0);" class="exercise' + data["exerciseid"] + random + '">' + data["name"] + ' <i class="fa fa-caret-down"></i></a>' +
                        '<a href="javascript:void(0);" class="btn btn-default btn-circle myworkouts-myexercises-delete" style="float: right;">' +
                            '<i class="fa fa-remove"></i>' +
                        '</a>' +
                        '<a href="javascript:void(0);" class="btn btn-default btn-circle myworkouts-myexercises-edit" style="float:right;">' +
                            '<i class="fa fa-pencil-square-o"></i>' +
                        '</a>' +
                        '<br/>' +
                        '<div class="exercise-data" style="margin-left:8px;display:none;">' +
                            '<div class="id" style="display:none;">' + data["exerciseid"] + '</div>' +
                            '<strong>Sets:</strong> <div class="sets" style="display:inline;">' + data["sets"] + '</div><br/>' +
                            '<strong>Reps:</strong> <div class="reps" style="display:inline;">' + data["reps"] + '</div><br/>' +
                            '<strong>Weight:</strong> <div class="weight" style="display:inline;">' + data["weight"] + '</div><br/>' +
                            '<strong>RPE:</strong> <div class="rpe" style="display:inline;">' + data["rpe"] + '</div><br/>' +
                            '<strong>%1RM:</strong> <div class="percentage" style="display:inline;">' + data["percentage"] + '</div>' +
                        '</div>' +
                '</td>' +
            '</tr>';
    $('.new-workout.myexercises-list').append(html);
    $(".new-workout .exercise" + data["exerciseid"] + random).on("click", function(){
        $(".new-workout .myworkouts-myexercises-" + data["exerciseid"] + random + " .exercise-data").slideToggle();
    });
    toggleCaret(".new-workout .exercise" + data["exerciseid"] +  random, ".new-workout .exercise" + data["exerciseid"] +  random + " i", "fa-caret-up", "fa-caret-down");
    $(".new-workout .myworkouts-myexercises-" + data["exerciseid"] +  random + " .myworkouts-myexercises-edit").on("click", function(){
        $( ".edit-exercise-reps" ).val(data["reps"]);
        $( ".edit-exercise-sets" ).val(data["sets"]);
        $( ".edit-exercise-rpe" ).val(data["rpe"]);
        $( ".edit-exercise-weight" ).val(data["weight"]);
        $( ".edit-exercise-percentage" ).val(data["percentage"]);
        $( "#myworkouts-exercise-editModal" ).modal();
        $(".myworkouts-exercise-editModal-accept-edit").on("click",function(){
            $(".new-workout .myworkouts-myexercises-"+ data["exerciseid"] +  random + " .reps").html($( ".edit-exercise-reps" ).val());
            $(".new-workout .myworkouts-myexercises-"+ data["exerciseid"] +  random + " .sets").html($( ".edit-exercise-sets" ).val());
            $(".new-workout .myworkouts-myexercises-"+ data["exerciseid"] +  random + " .rpe").html($( ".edit-exercise-rpe" ).val());
            $(".new-workout .myworkouts-myexercises-"+ data["exerciseid"] +  random + " .weight").html($( ".edit-exercise-weight" ).val());
            $(".new-workout .myworkouts-myexercises-"+ data["exerciseid"] +  random + " .percentage").html($( ".edit-exercise-percentage" ).val());
            $('.bottom-right').notify({type: 'info', message: {text: 'Exercise details changed' }}).show();
        });
        $('#myworkouts-exercise-editModal').on('hidden.bs.modal', function () {
            $(".myworkouts-exercise-editModal-accept-edit").unbind();
        });
        
    });
    
    $(".new-workout .myworkouts-myexercises-" + data["exerciseid"] + random + " .myworkouts-myexercises-delete").on("click", function(){       
            $(".new-workout .myworkouts-myexercises-" + data["exerciseid"] +  random).remove();
            $('.bottom-right').notify({type: 'info', message: {text: 'Exercise removed' }}).show();
        });
        
    $(".workout-table").tableDnD();
        
           
    
    
    
    
}

function myWorkouts_ExerciseClickRegisterFunction(exercise,workoutId){
    toggleCaret(".myworkouts-workout-" + workoutId + " .myworkouts-exercise" + exercise["exerciseid"], ".myworkouts-workout-" + workoutId + " .myworkouts-exercise" + exercise["exerciseid"] + " i", "fa-caret-up", "fa-caret-down");
    
    $(".myworkouts-workout-" + workoutId + " .myworkouts-exercise" + exercise["exerciseid"]).on('click',function(e){
        $(".myworkouts-workout-" + workoutId + " .exercise-data" + exercise["exerciseid"]).slideToggle();
    });   
    $(".myworkouts-workout-" + workoutId + " .myworkouts-myexercises-" + exercise["exerciseid"] + " .myworkouts-myexercises-edit").on('click',function(e){
        

        $( ".edit-exercise-reps" ).val(exercise["reps"]);
        $( ".edit-exercise-sets" ).val(exercise["sets"]);
        $( ".edit-exercise-rpe" ).val(exercise["rpe"]);
        $( ".edit-exercise-weight" ).val(exercise["weight"]);
        $( ".edit-exercise-percentage" ).val(exercise["percentage"]);
        $( "#myworkouts-exercise-editModal" ).modal();
        $(".myworkouts-exercise-editModal-accept-edit").on("click",function(){

            var id = exercise["id"];
            var reps = $( ".edit-exercise-reps" ).val();
            var sets = $( ".edit-exercise-sets" ).val();
            var rpe = $( ".edit-exercise-rpe" ).val();
            var weight = $( ".edit-exercise-weight" ).val();
            var percentage = $( ".edit-exercise-percentage" ).val();
            mlpObject.changeExercise({id:id,reps:reps,sets:sets,rpe:rpe,weight:weight,percentage:percentage});
            

            
            if (mlpObject.result["success"] === true){
                $('.exercise-data' + exercise["exerciseid"] + ' .sets').html(sets);
                $('.exercise-data' + exercise["exerciseid"] + ' .reps').html(reps);
                $('.exercise-data' + exercise["exerciseid"] + ' .weight').html(weight);
                $('.exercise-data' + exercise["exerciseid"] + ' .rpe').html(rpe);
                $('.exercise-data' + exercise["exerciseid"] + ' .percentage').html(percentage);                
                
                $('.bottom-right').notify({type: 'info', message: {text: 'Exercise details changed' }}).show();
                //load('myworkouts',myWorkouts_Load);
                $('body').removeClass('modal-open');
                $('body').css('padding-right','0px');
                               
            }
            else{
               $('.bottom-right').notify({type: 'danger', message: {text:'Failed to change exercise' }}).show();
            }

        });
        $('#myworkouts-exercise-editModal').on('hidden.bs.modal', function () {
            $(".myworkouts-exercise-editModal-accept-edit").unbind();
        });        
        
        
        
        $('#myworkouts-exercise-editModal').modal();
        
        
    });      
    
    $(".myworkouts-workout-" + workoutId + " .myworkouts-myexercises-" + exercise["exerciseid"] + " .myworkouts-myexercises-delete").on('click',function(e){
        $('.exercisedata-id').html(exercise["exerciseid"]);
        $('.delete-id').html(exercise["id"]);
        $('#myworkouts-exercise-deleteModal').modal();
        
    });      
    
}




function myWorkouts_appendHTML(dataArray){
    var exercises = dataArray["exercises"]

    for (var x in exercises){
        var exerciseId = exercises[x]["exerciseid"];
        var name = exercises[x]["name"];
        exercises[x]["name"] = name;
    }
    var html = myWorkouts_generateHTML(dataArray,exercises);
    $('.myworkouts-list').append(html);
    
    //$(".dnd-exerciselist").tableDnD();
    
    toggleCaret(".myworkouts-workout-" + dataArray["id"] + " .myexercises-more", ".myworkouts-workout-" + dataArray["id"] + " .myexercises-more i", "fa-caret-up", "fa-caret-down");
    $(".myworkouts-workout-" + dataArray["id"] + " .myexercises-more").on('click',function(){
        $(".myworkouts-workout-" + dataArray["id"] + " .exercise-section").slideToggle();
    });
    
    $(".myworkouts-workout-" + dataArray["id"] + " .myworkouts-edit").on('click',function(){

        $('.myworkouts-editModal-workoutid').html(dataArray["id"]);
        $('.edit-workout-name').val(dataArray["name"]);
        $('#myworkouts-editModal').modal();
    }); 
    
    $(".myworkouts-workout-" + dataArray["id"] + " .myworkouts-delete").on('click',function(){

        $('.delete-workout-id').html(dataArray["id"]);
        $('#myworkouts-deleteModal').modal();
    });     
    $(".myworkouts-workout-" + dataArray["id"] + " .myworkouts-addresults").on('click',function(){
        $('.addto-workout-id').html(dataArray["id"]);
        $('#myworkouts-addtoModal').modal();
    });      
    
    
   $(".myworkouts-workout-" + dataArray["id"] + " .myworkouts-workout-addexercise").on('click',function(){
       $('.accept-add').addClass('existing-workout');
        myDiary_NewModelInitialise();
        $('.extra-input').html('<input min="1" type="number" class="form-control sets" placeholder="Sets" step="1">');
        $( "#newModal" ).modal();
       $('.existing-workout.accept-add').on("click",function(e){


            var selectedItems = $('.modal-new-checkbox:checked');
                
            selectedItems.each(function() {
                var currentElement = $(this);
                var className = currentElement.attr('class').split(' ')[1];

                var exerciseid = className.split('-')[1];
            
                var sets = $("." + className + " .sets").val();
                if (sets === ''){
                    sets = "1";
                }
                var name = $("." + className + " .modal-new-exercise-name").html();
                var weight = $("." + className + " .weight").val();
                var reps = $("." + className + " .reps").val();
                var rpe = $("." + className + " .rpe").val();
                var percentage = $("." + className + " .percentage").val();

                var data = {sets:sets, exerciseid:exerciseid, name:name, workoutid:dataArray["id"]};
                if (weight !== undefined ){data["weight"] = weight;};
                if (reps !== undefined ){data["reps"] = reps;};
                if (rpe !== undefined ){data["rpe"] = rpe;};
                if (percentage !== undefined ){data["percentage"] = percentage;};
                
                if (mlpObject.addExercise(data).result["success"] === false){
                   $('.bottom-right').notify({type: 'danger', message: {text:'Failed to add ' +  data["name"]}}).show();
                }
                else{
                    data["id"] = mlpObject.result["data"]["id"];
                    myWorkouts_ExistingWorkoutAddExercise(data);
                }
            
            });
            $('.bottom-right').notify({type: 'info', message: {text: 'Exercises added' }}).show();
            //load('myworkouts',myWorkouts_Load);
            $('body').removeClass('modal-open');
            $('body').css('padding-right','0px');

        });         
        
        
        
        
        $('#newModal').on('hidden.bs.modal', function () {
            $('.existing-workout.accept-add').unbind();
            $('.accept-add').removeClass('existing-workout');
            
        })  
        
     
        
        
        
    });      
    
    
    for (var y in exercises){
        myWorkouts_ExerciseClickRegisterFunction(exercises[y],dataArray["id"]);

        
    }
    
 
      
}

function myWorkouts_generateHTML(workout,exercises){
    var html =
            '<tr class="myworkouts-workout-' + workout["id"] +'">' +
                '<th><a href="javascript:void(0);" class="myexercises-more">' + workout["name"] + ' <i class="fa fa-caret-down"></i></a>';
                if (true){
                    html = html + '<a href="javascript:void(0);" class="btn btn-danger btn-circle myworkouts-delete" style="float:right;" title="Delete workout"><i class="fa fa-remove"></i></a>';
                }
                    html = html + '<a href="javascript:void(0);" class="btn btn-primary btn-circle myworkouts-edit" style="float:right;margin-right: 2px;" title="Edit workout"><i class="fa fa-pencil-square-o"></i></a>' +
                    '<a href="javascript:void(0);" class="btn btn-default btn-circle myworkouts-addresults" style="float:right;margin-right: 2px;" title="Add this workout to your diary"><i class="fa fa-plus"></i></a>' +
                    '<div class="exercise-section" style="width:100%;display:none;">  '   +  
                    '<table class="table dnd-exerciselist" style="font-weight:initial;margin: 0 auto; width: 90%;">' +
                        '<tbody class="myexercises-list"> ';
    for (var x in exercises){ 
                        var random = Math.floor(Math.random() * 10000);
                        html = html +    '<tr class="myworkouts-myexercises-' + exercises[x]["exerciseid"] + random + '" style="border-top: 0px;">' +
                                '<td scope="row" style="line-height: 30px; border-top: 0px; ">' +
                                    '<a href="javascript:void(0);" class="myworkouts-exercise' + exercises[x]["exerciseid"]  + random + '">' + exercises[x]["name"] +' <i class="fa fa-caret-down"></i></a>' +
                                        '<a href="javascript:void(0);" class="btn btn-default btn-circle myworkouts-myexercises-delete" style="float:right;" title="Remove exercise from workout">' +
                                            '<i class="fa fa-remove"></i>' +
                                        '</a>' +
                                        '<a href="javascript:void(0);" class="btn btn-default btn-circle myworkouts-myexercises-edit" style="float:right;" title="Edit details for this exercise">' +
                                            '<i class="fa fa-pencil-square-o"></i>' +
                                        '</a>'  + 
                                            '<div class="exercise-data' + exercises[x]["exerciseid"] + random + '" style="margin-left: 8px; display:none;">'  + 
                                                '<div class="id" style="display:none;">' + exercises[x]["id"] +'</div>'  + 
                                                '<strong>Sets:</strong><div class="sets" style="display:inline;">' + exercises[x]["sets"] +'</div><br/>'  + 
                                                '<strong>Reps:</strong> <div class="reps" style="display:inline;">' + exercises[x]["reps"] +'</div><br/>'  + 
                                                '<strong>Weight:</strong> <div class="weight" style="display:inline;">' + exercises[x]["weight"] +'</div><br/>'  + 
                                                '<strong>RPE:</strong> <div class="rpe" style="display:inline;">' + exercises[x]["rpe"] +'</div><br/>'  + 
                                                '<strong>%1RM:</strong> <div class="percentage" style="display:inline;">' + exercises[x]["percentage"] +'</div> '  + 
                                            '</div>'   +                                              
                                '</td>' +
                            '</tr>';
                        exercises[x]["exerciseid"] = exercises[x]["exerciseid"] + random;
                        }
        html = html +                
                        '</tbody>' +     
                    '</table> ' +                        
                    '<div style="padding: 20px 0px;margin-left: 40%;">' +     
                        '<a href="javascript:void(0);" class="btn btn-default myworkouts-workout-addexercise btn-circle-main" title="Add an exercise to this workout"><i class="fa fa-plus fa-2x" style="line-height: 1.9 !important;"></i></a> '   +      
                    '</div> '    +                     
                    '</div>' +     
                '</th>' +     
           ' </tr>  ' ;
           
           return html;
            
 
}

function myWorkouts_ExistingWorkoutAddExercise(data){
    var random = Math.floor(Math.random() * 10000);
    var html  = '<tr class="myworkouts-myexercises-' + data["exerciseid"] + random + '" style="border-top: 0px;">' +
            '<td scope="row" style="line-height: 30px; border-top: 0px; ">' +
                '<a href="javascript:void(0);" class="myworkouts-exercise' + data["exerciseid"]  + random + '">' + data["name"] +' <i class="fa fa-caret-down"></i></a>' +
                    '<a href="javascript:void(0);" class="btn btn-default btn-circle myworkouts-myexercises-delete" style="float:right;" title="Remove exercise from workout">' +
                        '<i class="fa fa-remove"></i>' +
                    '</a>' +
                    '<a href="javascript:void(0);" class="btn btn-default btn-circle myworkouts-myexercises-edit" style="float:right;" title="Edit details for this exercise">' +
                        '<i class="fa fa-pencil-square-o"></i>' +
                    '</a>'  + 
                        '<div class="exercise-data' + data["exerciseid"] + random + '" style="margin-left: 8px; display:none;">'  + 
                            '<div class="id" style="display:none;">' + data["id"] +'</div>'  + 
                            '<strong>Sets:</strong><div class="sets" style="display:inline;">' + data["sets"] +'</div><br/>'  + 
                            '<strong>Reps:</strong> <div class="reps" style="display:inline;">' + data["reps"] +'</div><br/>'  + 
                            '<strong>Weight:</strong> <div class="weight" style="display:inline;">' + data["weight"] +'</div><br/>'  + 
                            '<strong>RPE:</strong> <div class="rpe" style="display:inline;">' + data["rpe"] +'</div><br/>'  + 
                            '<strong>%1RM:</strong> <div class="percentage" style="display:inline;">' + data["percentage"] +'</div> '  + 
                        '</div>'   +                                              
            '</td>' +
        '</tr>';    
    $('.myworkouts-workout-' + data["workoutid"] + ' .myexercises-list').append(html);
    data["exerciseid"] = data["exerciseid"] + random;
    myWorkouts_ExerciseClickRegisterFunction(data,data["workoutid"]);
}

/* END MY WORKOUTS FUNCTIONS */

/* MY PROGRAMS FUNCTIONS */
function myPrograms_Load(){
    
    $.get( "myprograms.html", function( data ) {
        $( ".load-into-container" ).html( data );  
        $(".new-program-table").tableDnD();
        myPrograms_MainClickRegisterFunction();
        
        
        var dataArray = mlpObject.getPrograms({userid:$('.userid').html()}).result["data"];
        if (mlpObject.result["success"] === false){
            console.log("Failed to get workouts. Maybe you don't have any!");
        }
        //dataArray[] = [{exerciseid:'1',ordering:"1",percentage:"80",reps:"5",rpe:"6",sets:"2",weight:"90"},{exerciseid:'2',ordering:"1",percentage:"80",reps:"5",rpe:"6",sets:"2",weight:"90"}];
        for (var x in dataArray){
            myPrograms_appendHTML(dataArray[x]);
        }
        
        if(!('ontouchstart' in window)){
            $("[title]").tooltip({delay: { show: 500, hide: 0 } });
        } 


    });    
        
}

function myPrograms_appendHTML(dataArray){
    var workouts = dataArray["workouts"];
    var takenDays = {};
    for (var workout in workouts){
        takenDays[workouts[workout]["day"]] = workout ;
    }
    

    var html = '<tr class="myprograms-program-' + dataArray["id"] + '">' +
                '<th>' +
                    '<a href="javascript:void(0);" class="myprograms-more">' +
                        dataArray["name"] + ' <i class="fa fa-caret-down"></i>' +
                    '</a>' +
                    '<a href="javascript:void(0);" class="btn btn-danger btn-circle myprograms-delete" style="float:right;margin-right: 2px;" title="Delete this program">' +
                        '<i class="fa fa-remove"></i>' +
                    '</a>' +
                    '<a href="javascript:void(0);" class="btn btn-primary btn-circle myprograms-edit" style="float:right;margin-right: 2px;" title="Edit this program">' +
                        '<i class="fa fa-pencil-square-o"></i>' +
                    '</a>' +  
                    '<a href="javascript:void(0);" class="btn btn-default btn-circle myprograms-addresults" style="float:right;margin-right: 2px;" title="Add this program to your diary"><i class="fa fa-plus"></i></a>'+
                    '<div class="myprograms-toggle" style="margin-top: 10px;margin-bottom:10px;width: 100%;display:none;">' +
                    '<table class="table" style="margin-bottom: 0px;width: 29%;display: inline-block;">' +
                    '<tbody class="myprograms-days">';          
    for (var x = 1; x <= parseInt(dataArray["duration"]); x++){
        html = html + '<tr>' +
                      '<th style="border-top: 0px; height: 50px;vertical-align: middle;">Day ' + x + ': </th>' +
                      '</tr>';
    }      
    
    html = html + '</tbody></table>' +
                '<table class="table myprograms-table" style="margin-bottom: 0px;width: 68%;display: inline-block;">' +
                    '<tbody class="myprograms myprograms-list"> ';
    for (var x = 1; x <= parseInt(dataArray["duration"]); x++){  
        if (x in takenDays){
            
            var workoutId = workouts[takenDays[x]]["workoutid"];
            var workoutDetails = workouts[takenDays[x]];
            html = html + '<tr id="workoutprogram-id-' + workouts[takenDays[x]]["id"] + '" class="workout' + workoutId + '" >' + 
                            '<td style="border-top: 0px; height: 50px; vertical-align: middle;" class="myprograms-workout">' + 
                                workoutDetails['name'] + '<span style="display:none;" class="myprogram-workoutid">' + workoutId + '</span>' +
                            '</td>' +
                            '<td style="border-top: 0px;"><a href="javascript:void(0);" onclick="myPrograms_RemoveWorkout(' + workouts[takenDays[x]]["id"] +')" class="btn btn-danger btn-circle myprograms-myworkouts-delete delete-' + workouts[takenDays[x]]["id"] +'" style="float: right;" title="Remove workout from program"><i class="fa fa-remove"></i></a>' +
                            '</td></tr>';
        

        }
        else{
            html = html + '<tr>' +
                          '<td style="border-top: 0px; height: 50px;vertical-align: middle;">' +
                                '<a href="javascript:void(0);" onclick="myPrograms_AddWorkout(' + dataArray["id"] +', ' + x +')" class="btn btn-primary myprograms-add-day-' + x + '">' +
                                    '<i class="fa fa-plus"></i> Add Workout' +
                                '</a>' +
                          '</td>' +
                        '</tr>';
            $('.myprograms-program-' + dataArray["id"] + ' .myprograms-add-day-' + x).on('click', function(){

            });                
                        
        }
    }

    html = html +  '</tbody>' +
                '</table>' +
        '</div>'+
    '</th>' +
    '</tr>';
    
    $('.myprograms-main.myprograms-list').append(html);
    toggleCaret('.myprograms-program-' + dataArray["id"] + ' .myprograms-more', '.myprograms-program-' + dataArray["id"] + ' .myprograms-more i', "fa-caret-up", "fa-caret-down");
    $('.myprograms-program-' + dataArray["id"] + ' .myprograms-more').on('click', function(){
       $('.myprograms-program-' + dataArray["id"] + ' .myprograms-toggle').slideToggle();
    });
    
    $('.myprograms-program-' + dataArray["id"] + ' .myprograms-delete').on('click', function(){
       $('#myprograms-deleteModal .delete-program-id').html(dataArray["id"]);
       $('#myprograms-deleteModal').modal();
    });    
    
    $('.myprograms-program-' + dataArray["id"] + ' .myprograms-edit').on('click', function(){
       $('#myprograms-editModal .myprograms-editModal-programid').html(dataArray["id"]);
       $('#myprograms-editModal .edit-program-name').val(dataArray["name"]);
       $('#myprograms-editModal .form-control.myprograms-edit-duration').val(dataArray["duration"]);
       $('#myprograms-editModal .input-group-addon.myprograms-edit-duration').val("Days");
       $('#myprograms-editModal').modal();
    });    
    
    $('.myprograms-program-' + dataArray["id"] + ' .myprograms-addresults').on('click', function(){
       $('#myprograms-addtoModal .addto-program-id').html(dataArray["id"]);
       $('#myprograms-addtoModal').modal();
       checkboxToRadio();
    });       

}

function myPrograms_AddWorkout(programId, day){
    $('.accept-add').addClass('existing-program');
    myDiary_NewModelInitialiseWorkouts(true); 

    $('.existing-program.accept-add').on("click",function(e){

        var selectedItems = $('.modal-new-checkbox:checked');

        selectedItems.each(function() {
            var currentElement = $(this);
            var className = currentElement.attr('class').split(' ')[1];

            //adding a workout
            var workoutid = className.split('-')[1];
            var workoutName = currentElement.parent().find('.modal-new-workout-name').html();

            var data = {programid: programId, workoutid: workoutid, day: day};

            mlpObject.addWorkout(data);
            if (mlpObject.result["success"] === false){
               $('.bottom-right').notify({type: 'danger', message: {text:'Failed to add workout' }}).show();
            }
            else{
                var html = '<tr id="workoutprogram-id-' + mlpObject.result["data"]["id"] + '" class="workout' + workoutid + '" >' + 
                                '<td style="border-top: 0px; height: 50px; vertical-align: middle;" class="myprograms-workout">' + 
                                    workoutName + '<span style="display:none;" class="myprogram-workoutid">' + workoutid + '</span>' +
                                '</td>' +
                                '<td style="border-top: 0px;"><a href="javascript:void(0);" onclick="myPrograms_RemoveWorkout(' + mlpObject.result["data"]["id"] +')" class="btn btn-danger btn-circle myprograms-myworkouts-delete delete-' + mlpObject.result["data"]["id"] +'" style="float: right;" title="Remove workout from program"><i class="fa fa-remove"></i></a>' +
                                '</td></tr>';                
    
                $('.myprograms-program-' + programId + ' .myprograms-list tr').eq(day - 1).replaceWith(html);
            }

        });
        $('.bottom-right').notify({type: 'info', message: {text: 'Workout added' }}).show();
        $('body').removeClass('modal-open');
        $('body').css('padding-right','0px');
        //load('myprograms',myPrograms_Load);

    });        

    $( "#newModal" ).modal();
    checkboxToRadio();
    $('#newModal').on('hidden.bs.modal', function () {
    $('.existing-program.accept-add').unbind();
    $('.accept-add').removeClass('existing-program');

    });    
}

function myPrograms_RemoveWorkout(id){
    $('#myprograms-workout-deleteModal .delete-id').html(id);
    $('#myprograms-workout-deleteModal').modal();
    
}

function myPrograms_MainClickRegisterFunction(){
    $(".myprograms-addtoModal-accept").on("click",function(e){
        var programId = $('.addto-program-id').html();
        var data = {"programid":programId, "assigneddate" : moment().format('YYYY-MM-DD')};
        if (mlpObject.addResults(data).result["success"] === false){
            $('.bottom-right').notify({type: 'info', message: {text: 'Failed to add this program to your diary' }}).show();
        }
        else{
            $('.bottom-right').notify({type: 'info', message: {text: 'Program added to your diary' }}).show();
        }
    });    
    
    
    $('.myprograms-new-duration').change(function(){
        myPrograms_AdjustProgramsCalendarTable();
    });
    
    $('.myprograms-create').on('click', function(e){
        e.preventDefault();

        var programName = $('.myprograms-new-name').val();
        if (programName === ""){
           $('.bottom-right').notify({type: 'danger', message: {text:'Enter a program name' }}).show();
            return;            
        }
        var duration = $('.new-program.myprograms-list tr').length;
        var programData = {name:programName, duration:duration};
        mlpObject.createProgram(programData);
        if (mlpObject.result["success"] === false){
           $('.bottom-right').notify({type: 'danger', message: {text:'Failed to create program' }}).show();
            return;
        }
        var programId = mlpObject.result["data"]["id"];
        var order = 1;
        $('.new-program.myprograms-list tr').each(function(){
            var currentItem = $(this);           
            var workoutid = currentItem.find('.workoutid').html();
            if (workoutid){
                var day = currentItem.attr('id');
                var workoutData = {workoutid: workoutid, programid: programId, day: day, ordering: order};
                mlpObject.addWorkout(workoutData);
                if (mlpObject.result["success"] === false){
                   $('.bottom-right').notify({type: 'danger', message: {text:'Error adding workout to program' }}).show();
                }
                order +=1;
            }
            });
        $('.bottom-right').notify({type: 'info', message: {text: 'Program created' }}).show(); 
        /*
        $('.myprograms-new-name').val('');
        $('input.myprograms-new-duration').val('');
        $('select.myprograms-new-duration').val('Days');
    
        $('.new-program.myprograms-list').html('');
        $('.days').html('');
        */
        load('myprograms',myPrograms_Load);
        });
        
        
        
    $('.myprograms-workout-accept-delete').on('click',function(){
        var id = $('#myprograms-workout-deleteModal .delete-id').html();
        var programid = $('#workoutprogram-id-' + id).parent().parent().parent().parent().parent().attr('class').split('-')[2]
        
        mlpObject.removeWorkout({id:id});
        if (mlpObject.result["success"] === false){
           $('.bottom-right').notify({type: 'danger', message: {text:'Failed to remove workout' }}).show();

            return;
        }
        var day = $( ".myprograms-program-" + programid + " .myprograms-list tr" ).index( $('#workoutprogram-id-' + id) ) + 1;
        var html = '<tr>' +
                          '<td style="border-top: 0px; height: 50px;vertical-align: middle;">' +
                                '<a href="javascript:void(0);" onclick="myPrograms_AddWorkout(' + programid +', ' + day +')" class="btn btn-primary myprograms-add-day-' + day + '">' +
                                    '<i class="fa fa-plus"></i> Add Workout' +
                                '</a>' +
                          '</td>' +
                        '</tr>';               
                
        $('#workoutprogram-id-' + id).replaceWith(html);        
        
        
        $('.bottom-right').notify({type: 'info', message: {text: 'Workout removed' }}).show();
        $('body').removeClass('modal-open');
        $('body').css('padding-right','0px');
        //load('myprograms',myPrograms_Load);
        
    });
    
    $('#myprograms-deleteModal .myprograms-accept-delete').on('click',function(){

        mlpObject.deleteProgram({id:$('#myprograms-deleteModal .delete-program-id').html()});
        if (mlpObject.result["success"] === false){
           $('.bottom-right').notify({type: 'danger', message: {text:'Failed to delete program' }}).show();

            return;
        }
        $('.myprograms-program-' + $('#myprograms-deleteModal .delete-program-id').html()).remove();
        $('.bottom-right').notify({type: 'info', message: {text: 'Program deleted' }}).show();
        $('body').removeClass('modal-open');
        $('body').css('padding-right','0px');
        //load('myprograms',myPrograms_Load);
         
    });
    
    
    $('#myprograms-editModal .myprograms-editModal-accept-edit').on('click',function(){
        var programId = $('#myprograms-editModal .myprograms-editModal-programid').html();
        var name = $('#myprograms-editModal .edit-program-name').val();
        var duration = $('#myprograms-editModal .form-control.myprograms-edit-duration').val();
        var units = $('#myprograms-editModal .input-group-addon.myprograms-edit-duration').val();    
        if (units === "Weeks"){
            duration = duration * 7;            
        }
        else if (units === "Months"){
            duration = duration * 28;
        }
        
        
        mlpObject.updateProgram({id:programId, name:name, duration:duration});
        
        if (mlpObject.result["success"] === false){
           $('.bottom-right').notify({type: 'danger', message: {text:'Failed to update program' }}).show();

            return;
        }
        $('.myprograms-program-' + programId + ' .myprograms-more').html(name + ' ' + $('.myprograms-program-'  + programId + ' .myprograms-more i')[0].outerHTML);
        //if duration > myprograms-list length then add blanks to end of list
        var currentDuration = $( ".myprograms-program-" + programId + " .myprograms-list tr" ).length;
        if (duration > currentDuration){
            while (duration > currentDuration){
                currentDuration += 1; 
                $( ".myprograms-program-" + programId + " .myprograms-list" ).append('<tr>' +
                          '<td style="border-top: 0px; height: 50px;vertical-align: middle;">' +
                                '<a href="javascript:void(0);" onclick="myPrograms_AddWorkout(' + programId +', ' + currentDuration +')" class="btn btn-primary myprograms-add-day-' + currentDuration + '">' +
                                    '<i class="fa fa-plus"></i> Add Workout' +
                                '</a>' +
                          '</td>' +
                        '</tr>');
                $( ".myprograms-program-" + programId + " .myprograms-days" ).append('<tr>' +
                      '<th style="border-top: 0px; height: 50px;vertical-align: middle;">Day ' + currentDuration + ': </th>' +
                      '</tr>');
                                   
            }            

        }
        else if (duration < currentDuration){
            
            while (duration < currentDuration){
                $( ".myprograms-program-" + programId + " .myprograms-list tr:last-child" ).remove();
                $( ".myprograms-program-" + programId + " .myprograms-days tr:last-child" ).remove();
                currentDuration -= 1;                
            }
        }
        //else if duration < program-list then remove tr's until its equal to duration
        //else do nothing
        $('.bottom-right').notify({type: 'info', message: {text: 'Program updated' }}).show();
        $('body').removeClass('modal-open');
        $('body').css('padding-right','0px');
        //load('myprograms',myPrograms_Load);            
    });
    
    $('.myprograms-search.search-form').keypress(function(e) {
        if(e.which === 13) {
            $('.myprograms-search.search-btn').click();
        }
    });    
    
    
    $('.myprograms-search.search-btn').on('click',function(){
        var searchTerm = $('.myprograms-search.search-form').val();
        mlpObject.getPrograms({name:searchTerm, userid:$('.userid').html()});
        if (mlpObject.result["success"] === true){
            $('.myprograms-main.myprograms-list').html('');
            var dataArray = mlpObject.result["data"];
            for (var x in dataArray){
                myPrograms_appendHTML(dataArray[x]);
            }            
        }
        else{
            $('.myprograms-main.myprograms-list').html('<span style="font-weight:bold;text-align:center;">No programs found</span>');
           $('.bottom-right').notify({type: 'danger', message: {text:'No programs found' }}).show();
        }
        
        
    });  
    
    $('#newModal .search-btn-workouts').click(function(){
        setTimeout(function(){checkboxToRadio();},500);
    });
    
    $('.search-workouts.pagination').click(function(){
        setTimeout(function(){checkboxToRadio();},500);
    });
    
    
}


function myPrograms_NewProgramRemoveWorkout(day){
        $('#' + day).html('<td style="border-top: 0px; height: 50px;vertical-align: middle;">' +
                                '<a href="javascript:void(0);" onclick="myPrograms_NewProgramModal(' + day + ')" class="btn btn-primary"><i class="fa fa-plus"></i> ' +
                                    'Add Workout</a>' +
                            '</td>');

   
}

function myPrograms_NewProgramModal(day){
        $('.accept-add').addClass('new-program');
        myDiary_NewModelInitialiseWorkouts(true); 

        $('.new-program.accept-add').on("click",function(e){

            var selectedItems = $('.modal-new-checkbox:checked');
                
            selectedItems.each(function() {
                var currentElement = $(this);
                var className = currentElement.attr('class').split(' ')[1];

                //adding a workout
                var workoutid = className.split('-')[1];
                var workoutName = currentElement.parent().find('.modal-new-workout-name').html();
                
                var data = {workoutid: workoutid, name: workoutName, day: day};

                myPrograms_NewProgramAddWorkout(data);
            
            });
            $('.bottom-right').notify({type: 'info', message: {text: 'Workout added' }}).show();
        });        
        
        $( "#newModal" ).modal();
        checkboxToRadio();
        $('#newModal').on('hidden.bs.modal', function () {
            $('.new-program.accept-add').unbind();
            $('.accept-add').removeClass('new-program');
            
        });     
}

function  myPrograms_NewProgramAddWorkout(data){
    $('#' + data['day']).html('<td style="border-top: 0px; height: 50px; vertical-align: middle;" class="newprogram-workout">' + 
                                data['name'] + '<span style="display:none;" class="workoutid">' + data['workoutid'] + '</span>' +
                            '</td>' +
                            '<td style="border-top: 0px;"><a href="javascript:void(0);" onclick = "myPrograms_NewProgramRemoveWorkout(' + data['day'] + ')" class="btn btn-danger btn-circle myworkouts-myexercises-delete" style="float: right;" title="Remove workout from program"><i class="fa fa-remove"></i></a>' +
                            '</td>');
}

function myPrograms_AdjustProgramsCalendarTable(){

    var oldDays = $('.new-program.myprograms-list tr').length;

    var newDays = parseInt($('input.myprograms-new-duration').val());
    if ($('select.myprograms-new-duration').val() === "Weeks" && newDays){
        newDays = newDays * 7;
    } 
    else if ($('select.myprograms-new-duration').val() === "Months"){
        newDays = newDays * 28;
    }
    
    if (newDays > 1000 || newDays < 0){
        return;
    }
    
    if (oldDays > newDays){
        
        while (oldDays > newDays){
        $('.new-program.myprograms-list').children().eq(oldDays - 1).remove();
        $('.days').children().eq(oldDays - 1).remove();
        oldDays -=1;
        }
    }
    else if (oldDays < newDays){
        while (oldDays < newDays){
            oldDays +=1;
            $('.new-program.myprograms-list').append('<tr id="' + oldDays + '">' +
                            '<td style="border-top: 0px; height: 50px;vertical-align: middle;">' +
                                '<a href="javascript:void(0);" onclick="myPrograms_NewProgramModal(' + oldDays + ')" class="btn btn-primary"><i class="fa fa-plus"></i> ' +
                                    'Add Workout</a>' +
                            '</td>' + 
                        '</tr>');
            $('.days').append('<tr><th style="border-top: 0px; height: 50px;vertical-align: middle;">Day ' + oldDays + ': </th></tr>');  

            }
    }
    $(".new-program-table").tableDnD();
}

/* END MY PROGRAMS FUNCTIONS */

/*MY DIARY FUNCTIONS*/

//click register functions
function myDiary_MainClickRegisterFunction(){

        $(".sync-mfp").on("click",function(){
            var w = window.open("mfp.html", "Login to MyFitnessPal", "width=970, height=600");
            w.addEventListener('load', function(){

                $(w.document.body).find('#mfp-login').submit(function(e){
                    e.preventDefault();
                    $('.show-sync').show();
                    var username = $(w.document.body).find('#mfp-login #username').val();
                    var password = $(w.document.body).find('#mfp-login #password').val();
                    w.close();
                    setTimeout(function(){
                        mlpObject.syncMfp({username:username,password:password,date: $('.selected-date-hidden').html()});
                        if (mlpObject.result["success"] === true){
                            $('.bottom-right').notify({type: 'info', message: {text:'Diary synced with MyFitnessPal' }}).show();
                        }
                        else{
                            $('.bottom-right').notify({type: 'danger', message: {text:'Failed to sync with MyFitnessPal' }}).show();
                        }
                        $('.show-sync').hide();
                    },250);

                });                
            });


        });
        
        function updatedisplay(watch) {
            document.getElementById('watchdisplay').innerHTML = watch.toString() + "." + parseInt(watch.getElapsed().milliseconds/100);
        }
        var myWatch = new Stopwatch(updatedisplay, 50);  
        
        $('.start-watch').on("click",function(e){
            myWatch.start();
        });
    
        $('.stop-watch').on("click",function(e){
            myWatch.stop();
        }); 
        
        $('.reset-watch').on("click",function(e){
            myWatch.reset();
            $('#watchdisplay').html('00:00:00.0');
        });         
        
    
    
        $(".calculate-max").on("click",function(e){
            e.preventDefault();
            var reps = parseInt($('.reps-performed').val());
            var weight = parseInt($('.weight-lifted').val());
            var max = 0;
            if (reps < 10){
                max = Math.round(weight/(1.0278-0.0278*reps)) + $(".units").html();
            }
            else if (reps === 10){
                max = Math.round(weight/0.75) + $(".units").html();
            }
            else {
                max = "Enter a rep range between 1 to 10";
            }            
            $('.calculated-max').html(max);
            }); 
    
	$(".generate-report").on("submit",function(e){
                e.preventDefault();
                mlpObject.getReport({reportstart:moment($('.start-date').val()).format('YYYY-MM-DD'), reportend:moment($('.end-date').val()).format('YYYY-MM-DD'), reporttype: "excel"});
                if (mlpObject.result["success"] === false){
                    $('.bottom-right').notify({type: 'danger', message: {text:'No data found' }}).show();
                    return;
                }
                $('.generate-button').hide();
                $('.download-button').attr("href", "http://www.myliftingpal.net/api/" + mlpObject.result["data"]);
                $('.download-button').fadeIn();

	});
        
    $('#reportModal').on('hidden.bs.modal', function () {
        if ($('.download-button').attr("href") !== "#"){
            var name = $('.download-button').attr("href").split("temp")[1];
            $('.download-button').attr("href", "#");
            $('.download-button').hide();
            $('.generate-button').show();
            mlpObject.removeReport({name: "temp" + name});
    }
        

    });         
        
	$(".btn-circle-main").on("click",function(e){
 
                myDiary_NewModelInitialise();              
                $('#newModal').modal();
	});	

        $(".modal-tab-exercises").on("click",function(e){   
            $( ".modal-tab-workouts" ).removeClass( "active" );
            $( ".modal-tab-programs" ).removeClass( "active" );
            $( ".modal-tab-exercises" ).addClass( "active" );
            $( ".modal-workouts" ).hide(); 
            $( ".modal-exercises" ).show();  
            $( ".modal-programs" ).hide();             
        });



        $(".modal-tab-workouts").on("click",function(e){   
            $( ".modal-tab-workouts" ).addClass( "active" );
            $( ".modal-tab-programs" ).removeClass( "active" );
            $( ".modal-tab-exercises" ).removeClass( "active" );   
            $( ".modal-workouts" ).show(); 
            $( ".modal-exercises" ).hide();  
            $( ".modal-programs" ).hide(); 
        });     
        
        $(".modal-tab-programs").on("click",function(e){   
            $( ".modal-tab-workouts" ).removeClass( "active" );
            $( ".modal-tab-programs" ).addClass( "active" );
            $( ".modal-tab-exercises" ).removeClass( "active" ); 
            $( ".modal-workouts" ).hide(); 
            $( ".modal-exercises" ).hide();  
            $( ".modal-programs" ).show();             
        });    
        
        
	$(".accept-delete").on("click",function(e){
                $('#deleteModal').modal('hide');
                $('body').removeClass('modal-open');
                $('body').css('padding-right','0px');

                var id = $(".delete-result-id").text();
                
                mlpObject.removeResults({id:id});
                if (mlpObject.result["success"] === true){
                    if ($('.set-' + id).parent().attr('class') === "old-set"){
                        $('.set-' + id).next().remove();
                        $('.set-' + id).remove();
                        
                    }
                    else{
                        load('mydiary',myDiary_Load, {'date':moment($(".selected-date-hidden").text())});
                    }
                    
                    $('.bottom-right').notify({type: 'info', message: {text: 'Set deleted' }}).show();
                    //console.log("trying to delete for: " + exerciseName + " id number: " + id);
                }
                else{
                   $('.bottom-right').notify({type: 'danger', message: {text:'There was an error deleting set' }}).show();
                }

	}); 
        
        $('.accept-delete-exercise').on("click",function(e){
                $('#deleteModal').modal('hide');
                $('body').removeClass('modal-open');
                $('body').css('padding-right','0px');
                var exerciseid = $(".delete-exercise-result-id").text();
                var assigneddate = $(".selected-date-hidden").text();
                mlpObject.removeResults({exerciseid:exerciseid, assigneddate:assigneddate});
                if (mlpObject.result["success"] === true){
                    $('.exercise-' + exerciseid).remove();
                    //load('mydiary',myDiary_Load, {'date':moment(assigneddate)});
                    $('.bottom-right').notify({type: 'info', message: {text: 'Exercise deleted' }}).show();

                }
                else{
                   $('.bottom-right').notify({type: 'danger', message: {text:'Failed to delete exercise' }}).show();
                }
               
        });
        
	$(".accept-edit").on("click",function(e){
            
                $('#editModal').modal('hide');
                $('body').removeClass('modal-open');
                $('body').css('padding-right','0px');            

                
                var id = $(".edit-result-id").text();
                var reps = $(".edit-result-reps").val();
                var set = $(".edit-result-set").val();
                var rpe = $(".edit-result-rpe").val();
                var weight = $(".edit-result-weight").val();
                var percentage = $(".edit-result-percentage").val();  
                

                
                mlpObject.changeResults({id:id, reps:reps, sets:set, rpe:rpe, weight:weight, percentage:percentage});
                if (mlpObject.result["success"] === true){
                    $('.set-' + id + ' .reps').html(reps);
                    $('.set-' + id + ' .set').html(set);
                    $('.set-' + id + ' .weight').html(weight + $('.units').html());
                    $('.set-' + id + ' .rpe').html(rpe);
                    $('.set-' + id + ' .percentage').html(percentage + '%');

                    //load('mydiary',myDiary_Load, {'date':moment($(".selected-date-hidden").text())});
                    $('.bottom-right').notify({type: 'info', message: {text: 'Set updated' }}).show();
                }  
                else{
                    $('.bottom-right').notify({message: { type: 'warning', text: 'There was an error upating the set' }}).show();
                }

                
	});  
        
        $(".accept-add").on("click",function(e){
            $('#newModal').modal('hide');
            $('body').removeClass('modal-open');
            $('body').css('padding-right','0px');            

            //add new checked items before doing final add
            $('.modal-new-checkbox:checked').each(function(){
                var $this = $(this); 
                var found = false;
                selectedPaginatedItems.each(function(){
                    if ($this.attr('class') === $(this).attr('class')){
                        found = true;
                        return false;                
                    }  
                });
                 if (found === false){
                    selectedPaginatedItems.push(this);
                }        
            });     
            
            var selectedItems = selectedPaginatedItems;

            selectedItems.each(function() {
                var currentElement = $(this);
                var className = currentElement.attr('class').split(' ')[1];
                
                if (className.split('-')[0] === "recentprogram" || className.split('-')[0] === "searchprogram"){

                    
                    //adding a workout
                    var programid = className.split('-')[1];
                    if (mlpObject.addResults({programid: programid, assigneddate : $(".selected-date-hidden").text()}).result["success"] === false){
                        $('.bottom-right').notify({type: 'info', message: {text: 'Failed to add program' }}).show();
                    }   
                    else{
                        $('.bottom-right').notify({type: 'info', message: {text: 'Program added' }}).show();
                    }
                    
                    
                    
                    
                }
                
                
                
                else if (className.split('-')[0] === "recentworkout" || className.split('-')[0] === "searchworkout"){
                    //adding a workout
                    var workoutid = className.split('-')[1];
                    
                    if (mlpObject.addResults({workoutid: workoutid, assigneddate : $(".selected-date-hidden").text()}).result["success"] === false){
                        $('.bottom-right').notify({type: 'info', message: {text: 'Failed to add workout' }}).show();
                    }   
                    else{
                        $('.bottom-right').notify({type: 'info', message: {text: 'Workout added' }}).show();
                    }

                }
                else{
                    //adding an exercise
                    var exerciseid = className.split('-')[1];
                    var diaryClassName = $("." + className + " .modal-new-exercise-name").html().split(" ").join("");
                    var set = parseInt($("." + diaryClassName + " .added .set").html()) + 1;

                    if (set < 1 || isNaN(set)){
                        set = 1;
                    }
                    var weight = $("." + className + " .weight").val();
                    var reps = $("." + className + " .reps").val();
                    var rpe = $("." + className + " .rpe").val();
                    var percentage = $("." + className + " .percentage").val();

                    var data = {"sets":set, "exerciseid":exerciseid, "assigneddate" : $(".selected-date-hidden").text()};
                    if (weight !== undefined ){data["weight"] = weight;};
                    if (reps !== undefined ){data["reps"] = reps;};
                    if (rpe !== undefined ){data["rpe"] = rpe;};
                    if (percentage !== undefined ){data["percentage"] = percentage;};

                    if (mlpObject.addResults(data).result["success"] === false){
                        $('.bottom-right').notify({type: 'info', message: {text: 'Failed to add an exercise' }}).show();
                    }
                    else{
                        $('.bottom-right').notify({type: 'info', message: {text: 'Exercise added' }}).show();
                    }
                }
            });
            $('.modal-new-checkbox').prop('checked', false);
            selectedPaginatedItems = $('.modal-new-checkbox:checked');
            load('mydiary',myDiary_Load, {'date':moment($(".selected-date-hidden").text())});
            
        });
	
	$(".change-date-left").on("click",function(e){

		load('mydiary',myDiary_Load, {'date':moment($(".selected-date-hidden").text()).subtract(1, 'days').calendar('YYYY-MM-DD')});
	});		
	$(".change-date-right").on("click",function(e){

		load('mydiary',myDiary_Load, {'date':moment($(".selected-date-hidden").text()).add(1, 'days').calendar('YYYY-MM-DD')});
	});		
	$(".change-date-input").on("change",function(e){
                $(".change-date-input").unbind();
		load('mydiary',myDiary_Load, {'date':moment($(".change-date-input").val())});
	});
        


}


function myDiary_Load(data){

        var date = moment(data['date']).format('YYYY-MM-DD');
        $.get( "mydiary.html", function( data ) {
                $( ".load-into-container" ).html( data );
                //TOOLTIPS
                $("[data-toggle='tooltip']").tooltip();
                //set the date
                $( ".selected-date").html(moment(date).format('dddd, MMMM Do, YYYY'));
                $( ".selected-date-hidden").html(date);
                //load datepicker
                $('.input-group.date').datepicker({
                    orientation: "top left",
                    todayHighlight: true,
                    autoclose: true
                });
                
                // ADD SLIDEDOWN ANIMATION TO DROPDOWN
                $('.load-into-container .dropdown').unbind();
		$('.load-into-container .dropdown').on('show.bs.dropdown', function(e){
                        $($('.load-into-container .dropdown i')[1]).addClass("fa-caret-up");
                        $($('.load-into-container .dropdown i')[1]).removeClass("fa-caret-down");                    
			$(this).find('.dropdown-menu').first().stop(true, true).slideDown();
		});

		// ADD SLIDEUP ANIMATION TO DROPDOWN
		$('.load-into-container .dropdown').on('hide.bs.dropdown', function(e){
                        $($('.load-into-container .dropdown i')[1]).removeClass("fa-caret-up");
                        $($('.load-into-container .dropdown i')[1]).addClass("fa-caret-down");                    
			$(this).find('.dropdown-menu').first().stop(true, true).slideUp();
		});
                
               
                
                
                myDiary_MainClickRegisterFunction();
                var results = mlpObject.selectResults({assigneddate : date}).result;
                
                
                if (results["success"] === true){
                    var exercises = [];
                    for (var index in results["data"]){
                        var resultsObject = results["data"][index];
                        var exerciseName = results["data"][index]["name"];
                        
                        var recordData = results["data"][index]["records"]
                        var records = ["Best reps with " + recordData["amrap"]["weight"] + $('.units').html() + ": " + recordData["amrap"]["reps"] + "@rpe" + recordData["amrap"]["rpe"] , 
                                       recordData["overall"]["rep"] + "RM: " + recordData["overall"]["max"] + $('.units').html(), 
                                       "Best volume for " + resultsObject["reps"] + " rep sets: " + recordData["backoffs"]["best"] + $('.units').html(), 
                                       "Last time you did " + recordData["history"]["sets"] + "x" +  recordData["history"]["reps"] + " using " + recordData["history"]["weight"] + $('.units').html()]; 
                        if (exerciseName in exercises){
                            exercises[exerciseName].push({id:resultsObject["id"], exercise:exerciseName, exerciseid:resultsObject["exerciseid"], reps:resultsObject["reps"], set:resultsObject["sets"], weight: resultsObject["weight"], rpe: resultsObject["rpe"], onerm: resultsObject["percentage"], notes : resultsObject["notes"], records: records});
                        }
                        else{
                            exercises[exerciseName] = [{id:resultsObject["id"], exercise:exerciseName, exerciseid:resultsObject["exerciseid"], reps:resultsObject["reps"], set:resultsObject["sets"], weight: resultsObject["weight"], rpe: resultsObject["rpe"], onerm: resultsObject["percentage"], notes : resultsObject["notes"], records: records}];
                        }
                    }
                    
                }
                else{
                    $('.my-exercises').html('<span style="display: block;text-align:center;margin-top:-10px;">Rest day is it?</span>')
                }
                //sort by set    
                for (var exercise in exercises){
                    myDiary_appendHTML(exercises[exercise].sort(function (a, b) {
                        if (a.set > b.set) {
                            return 1;
                        }
                        if (a.set < b.set) {
                            return -1;
                        }
                        // a must be equal to b
                        return 0;
                    }));
   
                }
                
                if(!('ontouchstart' in window)){
                    $("[title]").tooltip({delay: { show: 500, hide: 0 } });
                } 

        });    
    
    
    
}

function myDiary_ExerciseClickRegisterFunction(e){


	var parent = $(e);
	if ($(e).hasClass("fa")){
		parent =  $(e).parent();
	}

	var exerciseName = parent.closest(".added-exercise").attr("class").split(" ")[1];

	if (parent.hasClass( "added" )){
		$("." + exerciseName + " .view-added").slideToggle();
	}
	else if (parent.hasClass( "log" )){
		$("." + exerciseName + " .view-log").slideToggle();
	}
	else if (parent.hasClass( "old" )){
		$("." + exerciseName + " .view-old").slideToggle();
	}
	else if (parent.hasClass( "exercise-delete" )){
                $('.delete-exercise-result-id').html($("." + exerciseName + " .exerciseid").text());
                $('#deleteExerciseModal').modal();      
	}
	
	else if (parent.hasClass( "exercise-settings" )){
		if(parent.closest(".old-set").hasClass("old-set")){
			parent.closest(".old-set").find(".view-exercise-settings").slideToggle();
		}
		else{
		$("." + exerciseName + " > .view-exercise-settings").slideToggle();
		}
	
	}
	else if (parent.hasClass("save-form")){
                var exerciseid = $("." + exerciseName + " .exerciseid").text();
                var assigneddate = $(".selected-date-hidden").text();
                var reps = $("." + exerciseName + " .details.reps input").val();
                var set = $("." + exerciseName + " .details.set input").val();
                var rpe = $("." + exerciseName + " .details.rpe input").val();
                var weight = $("." + exerciseName + " .details.weight input").val();
                var percentage = $("." + exerciseName + " .details.percentage input").val();
                
                mlpObject.addResults({exerciseid:exerciseid, reps:reps, sets:set, rpe:rpe, weight:weight, percentage:percentage, assigneddate: assigneddate});
                if (mlpObject.result["success"] === true){
                    $("." + exerciseName + " .view-added").slideToggle();
                    load('mydiary',myDiary_Load, {'date':moment(assigneddate)});
                    $('.bottom-right').notify({type: 'info', message: { text: 'New set added' }}).show();

                }
                else{
                    $('.bottom-right').notify({type: 'danger', message: {text: 'Failed to add set' }}).show();
                }

	
	}
	
	
	else if (parent.hasClass("note")){
                var id = $("." + exerciseName + " .id :first").text();
                var notes = $("." + exerciseName + " .note :first").val();

                mlpObject.changeResults({id:id, notes:notes});
                if (mlpObject.result["success"] === false){
                    console.log("There was an error saving notes for: " + exerciseName + " id number: " + id);
                }                

	
	}	
	
	else if (parent.hasClass("edit")){
                var exerciseid = $("." + exerciseName + " .exerciseid").text();
                var assigneddate = $(".selected-date-hidden").text();
                var id,reps,set,weight,percentage;
                if(parent.closest(".old-set").hasClass("old-set")){  
                    //editing an old set
                    id = parent.closest(".old-set").find(".details.id").text();
                    reps = parent.closest(".old-set").find(".details.reps").text();
                    set = parent.closest(".old-set").find(".details.set").text();
                    rpe = parent.closest(".old-set").find(".details.rpe").text();
                    weight = parent.closest(".old-set").find(".details.weight").text();
                    percentage = parent.closest(".old-set").find(".details.percentage").text();                      
                    
                    
                } 
                else{
                    //editing the main/latest set
                    id = $("." + exerciseName + " .added .id :first").text();
                    reps = $("." + exerciseName + " .added .reps :first").text();
                    set = $("." + exerciseName + " .added .set :first").text();
                    rpe = $("." + exerciseName + " .added .rpe :first").text();
                    weight = $("." + exerciseName + " .added .weight :first").text();
                    percentage = $("." + exerciseName + " .added .percentage :first").text();                      
   
                }
                $(".edit-result-id").html(id);
                $(".edit-result-reps").val(reps);
                $(".edit-result-set").val(set);
                $(".edit-result-rpe").val(rpe);
                $(".edit-result-weight").val(weight.replace($(".units").html(),''));
                $(".edit-result-percentage").val(percentage.replace('%',''));
                

            
                $('#editModal').modal();

	}	

	else if (parent.hasClass("delete")){
                var id = 0;
		if(parent.closest(".old-set").hasClass("old-set")){
			id = parent.closest(".old-set").find(".id").text();
		}
		else{
                        id = $("." + exerciseName + " .id :first").text();
		}
                $(".delete-result-id").html(id);
                $('#deleteModal').modal();

	
	}

	else if (parent.hasClass("view-notes")){
                var id = 0;
		if(parent.closest(".old-set").hasClass("old-set")){
			id = parent.closest(".old-set").find(".id").text();
		}
		else{
                        id = $("." + exerciseName + " .id :first").text();
		}
                
                var results = mlpObject.selectResults({id : id}).result;
                if(results["success"] === true){
                    var note = results["data"][0]["notes"];
                    $(".modal-notes-contents").html(note);
                    $('#notesModal').modal();
                }
                else{
                   $('.bottom-right').notify({type: 'danger', message: {text:'Note cannot be loaded' }}).show();
                }
	
	}
	
	else if (parent.hasClass("share-set")){
	
		//share click register
	
	}	

	
}

//HTML generating functions

function myDiary_NewModelInitialise(){
    myDiary_NewModelInitialiseExercises();
    myDiary_NewModelInitialiseWorkouts(false);
    myDiary_NewModelInitialisePrograms();
    

    
}




function myDiary_NewModelInitialisePrograms(){
    
//TODO
    if (mlpObject.selectResults({limit:35,type:"programs"}).result["success"] === true){
        var recentPrograms = mlpObject.result["data"];
        
        myDiary_NewModelAddRecentPrograms(recentPrograms, 1);
    }
    else{
        $('.modal-new-recent-items-programs').html('You have not added any programs! Use the search and find some, or <a href="javascript:void(0);" onclick="$(\'body\').removeClass(\'modal-open\');$(\'body\').css(\'padding-right\',\'0px\');$(\'.loader\').show();myPrograms_Load();">create one</a>.');
    }
    
    $('.search-form-programs').keypress(function(e) {
        if(e.which === 13) {
            $('.search-programs .search-btn-programs').click();
        }
    });
    //register search function
    $('.search-programs .search-btn-programs').click(function(){
        
        var searchTerm = $('.search-programs .search-form-programs').val();
        $('.modal-new-search-term-program').html(searchTerm);
 //TODO

        if (mlpObject.getPrograms({name:searchTerm}).result["success"] === true){
            var searchedPrograms = mlpObject.result["data"];
            $('.search-programs').append('<div class="total-programs" style="display:none;">' + Object.keys(mlpObject.result["data"]).length + '</div>');
            myDiary_NewModelAddSearchPrograms(searchedPrograms, 1);
        }
        else{
            $('.modal-search-results-programs').html('No results for this program. <a href="javascript:void(0);" onclick="$(\'body\').removeClass(\'modal-open\');$(\'body\').css(\'padding-right\',\'0px\');$(\'.loader\').show();load(\'myprograms\',myPrograms_Load);">Create it?</a>');
      
        }
        
        
        
    }); 
    
    
    $('#newModal').on('hidden.bs.modal', function () {
        $('.search-form-programs').unbind();
        $('.search-programs .search-btn-programs').unbind();
    });    
        
}

function myDiary_NewModelAddSearchPrograms(searchedPrograms, page){
    $('.modal-new-checkbox:checked').each(function(){
        var $this = $(this); 
        var found = false;
        selectedPaginatedItems.each(function(){
            if ($this.attr('class') === $(this).attr('class')){
                found = true;
                return false;                
            }  
        });
         if (found === false){
            selectedPaginatedItems.push(this);
        }        
    });    
    $(".search-programs .current-page-programs").html(page);
    var html = '';   

 
    
    
    for (var x in searchedPrograms){  
        var program = searchedPrograms[x];
        if (x >= 6*page){break;}
        if (x >= (6*page - 6)){        
        
      //TODO  
        html = html + 
            '<div class="row modal-new-search-item-programs searchprogram-' + program["id"] + '" style="padding: 5px 0;">' +
            '<input type="checkbox" value="" class="modal-new-checkbox searchprogram-' + program["id"] + '"> <div class="modal-new-program-name" style="display: inline;">' + program["name"] + '</div>' +
            '<div class="modal-new-input" style="margin-top: 5px; margin-right:40px;"><a href="javascript:void(0);" class=" modal-new-workouts-link" onclick="javascript:$(\'.modal-new-search-item-programs.searchprogram-' + program["id"] + ' .modal-new-workouts\').slideToggle();">Workouts <i class="fa fa-caret-down"></i></a>' +
            '<div class="modal-new-workouts" style="display:none;width: 150%;">';
        var currentWorkout = "";
        for (var y in program["workouts"]){  

            var exercise = program["workouts"][y];
            if (currentWorkout !== exercise["workoutname"]){
                if (currentWorkout !== ""){
                    html = html + '</span><br/>';
                }
                html = html + '<span class="program-workout' + exercise["workoutid"] + '"><em>Day ' +  exercise["day"] + ': </em><strong>' 
                + exercise["workoutname"] + '</strong><br/>';
                currentWorkout = exercise["workoutname"];
            }
            html = html + '<span class="workout-exercise' + exercise["exerciseid"] + '">' 
                    + exercise["name"] +
                    '<br/><div class="exercise-details" style="display:none;">' +
                        '<div class="workoutid">' + exercise["workoutid"] + '</div>' +
                        '<div class="id">' + exercise["exerciseid"] + '</div>' +
                        '<div class="reps">' + exercise["reps"] + '</div>' +
                        '<div class="sets">' + exercise["sets"] + '</div>' +
                        '<div class="weight">' + exercise["weight"] + '</div>' +
                        '<div class="rpe">' + exercise["rpe"] + '</div>' +
                        '<div class="percentage">' + exercise["percentage"] + '</div>' + 
                        '<div class="day">' + exercise["day"] + '</div>' + 
                        '</div></span>';
        }
        html = html +
            '</div></div>' +
            '</div>'; 
        }

    
    }
    
    $('.modal-search-results-programs').html(html);
 

    var pages = Math.ceil(Object.keys(searchedPrograms).length / 6);
    if (pages === 0){return;};
    html = ''; 
    
    html = html + '<li>' +
    '<a href="javascript:void(0);"  onclick="javascript:myDiary_NewModelChangeSearchPagePrograms(0)" ' ;
    if (page == 1){html = html + 'disabled';}
    html = html + ' aria-label="Previous"> ' +
    '<span aria-hidden="true">&laquo;</span>' +
    '</a>' +
    '</li>';
    
    x = (Math.floor((page - 1)/4.0) * 4)+1;
    if (x < 1){x = 1;};


    var endx = x + 4;
    while (x <= pages && x < endx){
    html = html + '<li><a href="javascript:void(0);" ';
    if (x == page) {html = html + 'style="background-color:#eee"';};
    html = html + ' onclick="javascript:myDiary_NewModelChangeSearchPagePrograms(' + x + ')">' + x + '</a></li>';
        x += 1;
    }
    
    html = html + '<li>' +
    '<a href="javascript:void(0);" onclick="javascript:myDiary_NewModelChangeSearchPagePrograms(6)"  ';
    if (page == pages){html = html + 'disabled';}
    html = html + ' aria-label="Next">' +
    '<span aria-hidden="true">&raquo;</span>' +
    '</a>' +
    '</li>';
    
    $('.pagination.search-programs').html(html);
    
    selectedPaginatedItems.each(function(){
        var $this = $(this); 
        $('.modal-new-checkbox').each(function(){
            if ($this.attr('class') === $(this).attr('class')){
                $(this).prop('checked', true);
            }
            
        });
        
    }); 
    
    //add to check if user unchecks
    $('.modal-new-checkbox').unbind();
    $('.modal-new-checkbox').on('change', function(){

        if (!$(this).is(':checked')){
            var $this = $(this);
            selectedPaginatedItems.each(function(x){
                if ($this.attr('class') === $(this).attr('class')){
                    selectedPaginatedItems.splice(x, 1);
            }
            
        });
        
        }                   
    });        
     
 
    
    if (pages === 1){
        $('.pagination.search-programs').css({"padding-left":"92px"});
    }
    if (pages === 2){
        $('.pagination.search-programs').css({"padding-left":"88px"});
    }
    if (pages === 3){
        $('.pagination.search-programs').css({"padding-left":"74px"});
    }
    if (pages === 4){
        $('.pagination.search-programs').css({"padding-left":"44px"});
    }      
}

function myDiary_NewModelChangeSearchPagePrograms(pageNumber){
    if (pageNumber >= 6){
        var currentPage = parseInt($(".search-programs .current-page-programs").html());
        if (parseInt($('.total-programs').html()) <= currentPage*6){
            return;
        }
        else{
            pageNumber = parseInt($(".search-programs .current-page-programs").html()) + 1;         
        } 
    }
    
    else if(pageNumber <= 0){
        pageNumber = parseInt($(".search-programs .current-page-programs").html()) - 1;
        if (pageNumber < 1){return;};
    }
    
    
    
    var searchTerm = $('.modal-new-search-term-program').html();


//TODO
    if (mlpObject.getPrograms({name:searchTerm}).result["success"] === true){
        var searchedPrograms = mlpObject.result["data"];

        myDiary_NewModelAddSearchPrograms(searchedPrograms, pageNumber);
    }
    
    

    
}


function myDiary_NewModelAddRecentPrograms(recentPrograms, page){
    $('.modal-new-checkbox:checked').each(function(){
        var $this = $(this); 
        var found = false;
        selectedPaginatedItems.each(function(){
            if ($this.attr('class') === $(this).attr('class')){
                found = true;
                return false;                
            }  
        });
         if (found === false){
            selectedPaginatedItems.push(this);
        }        
    });    
    
    $(".recent-programs .current-page-programs").html(page);
    
    //TODO
    var html = '';
    for (var x in recentPrograms){
        var program = recentPrograms[x];
        if (x >= 7*page){break;}
        if (x >= (7*page - 7)){
        html = html + 
            '<div class="row modal-new-recent-item-programs recentprogram-' + program["programid"] + '" style="padding: 5px 0;">' +
            '<input type="checkbox" value="" class="modal-new-checkbox recentprogram-' + program["programid"] + '"> <div class="modal-new-program-name" style="display: inline;">' + program["name"] + '</div>' +
            '<div class="modal-new-input" style="margin-top: 5px; margin-right:40px;"><a href="javascript:void(0);" class=" modal-new-workouts-link" onclick="javascript:$(\'.modal-new-recent-item-programs.recentprogram-' + program["programid"] + ' .modal-new-workouts\').slideToggle();">Workouts <i class="fa fa-caret-down"></i></a>' +
            '<div class="modal-new-workouts" style="display:none;width: 150%;">';
        var currentWorkout = "";
        for (var y in program["workouts"]){  
            var exercise = program["workouts"][y];
            if (currentWorkout !== exercise["workoutname"]){
                if (currentWorkout !== ""){
                    html = html + '</span><br/>';
                }
                html = html + '<span class="program-workout' + exercise["workoutid"] + '"><em>Day ' +  exercise["day"] + ': </em><strong>' 
                + exercise["workoutname"] + '</strong><br/>';
                currentWorkout = exercise["workoutname"];
            }
            html = html + '<span class="workout-exercise' + exercise["exerciseid"] + '">' 
                    + exercise["name"] +
                    '<br/><div class="exercise-details" style="display:none;">' +
                        '<div class="workoutid">' + exercise["workoutid"] + '</div>' +
                        '<div class="id">' + exercise["exerciseid"] + '</div>' +
                        '<div class="reps">' + exercise["reps"] + '</div>' +
                        '<div class="sets">' + exercise["sets"] + '</div>' +
                        '<div class="weight">' + exercise["weight"] + '</div>' +
                        '<div class="rpe">' + exercise["rpe"] + '</div>' +
                        '<div class="percentage">' + exercise["percentage"] + '</div>' + 
                        '<div class="day">' + exercise["day"] + '</div>' + 
                        '</div></span>';
        }
        html = html +
            '</div></div>' +
            '</div>'; 
        }

    }
    
    $('.modal-new-recent-items-programs').html(html);    
    
    var pages = Math.ceil(Object.keys(recentPrograms).length / 7);
    if (pages === 0){return;};
    html = ''; 
    
    html = html + '<li>' +
    '<a href="javascript:void(0);"  onclick="javascript:myDiary_NewModelChangeRecentPagePrograms(0)" ' ;
    if (page == 1){html = html + 'disabled';}
    html = html + ' aria-label="Previous"> ' +
    '<span aria-hidden="true">&laquo;</span>' +
    '</a>' +
    '</li>';
    
    x = 1;
    while (x <= pages  && x < 5){
    html = html + '<li><a href="javascript:void(0);" ';
    if (x == page) {html = html + 'style="background-color:#eee"';};
    html = html + ' onclick="javascript:myDiary_NewModelChangeRecentPagePrograms(' + x + ')">' + x + '</a></li>';
        x += 1;
    }
    
    html = html + '<li>' +
    '<a href="javascript:void(0);" onclick="javascript:myDiary_NewModelChangeRecentPagePrograms(6)"  ';
    if (page == pages){html = html + 'disabled';}
    html = html + ' aria-label="Next">' +
    '<span aria-hidden="true">&raquo;</span>' +
    '</a>' +
    '</li>';
    
    $('.pagination.recent-programs').html(html);    
    selectedPaginatedItems.each(function(){
        var $this = $(this); 
        $('.modal-new-checkbox').each(function(){
            if ($this.attr('class') === $(this).attr('class')){
                $(this).prop('checked', true);
            }
            
        });
        
    }); 
    
    //add to check if user unchecks
    $('.modal-new-checkbox').unbind();
    $('.modal-new-checkbox').on('change', function(){

        if (!$(this).is(':checked')){
            var $this = $(this);
            selectedPaginatedItems.each(function(x){
                if ($this.attr('class') === $(this).attr('class')){
                    selectedPaginatedItems.splice(x, 1);
            }
            
        });
        
        }                   
    });     
    
    
    if (pages === 1){
        $('.pagination.recent-programs').css({"padding-left":"92px"});
    }
    if (pages === 2){
        $('.pagination.recent-programs').css({"padding-left":"88px"});
    }
    if (pages === 3){
        $('.pagination.recent-programs').css({"padding-left":"74px"});
    }
    if (pages === 4){
        $('.pagination.recent-programs').css({"padding-left":"44px"});
    }    
}


function myDiary_NewModelChangeRecentPagePrograms(pageNumber){
    if (pageNumber >= 6){
        pageNumber = parseInt($(".recent-programs .current-page-programs").html()) + 1;
        if (pageNumber > ($('.pagination.recent-programs').children().length - 2)){return;};
    }
    else if(pageNumber <= 0){
        pageNumber = parseInt($(".recent-programs .current-page-programs").html()) - 1;
        if (pageNumber < 1){return;};
    }

    //TODO
    if (mlpObject.selectResults({limit:35,type:"programs"}).result["success"] === true){
    var recentPrograms = mlpObject.result["data"];
    myDiary_NewModelAddRecentPrograms(recentPrograms, pageNumber);
    }
    
    
    

}











function myDiary_NewModelInitialiseWorkouts(radio){
    

    if (mlpObject.selectResults({limit:35,type:"workouts"}).result["success"] === true){
        var recentWorkouts = mlpObject.result["data"];
        myDiary_NewModelAddRecentWorkouts(recentWorkouts, 1, radio);
    }
    else{
        $('.modal-new-recent-items-workouts').html('You have not added any workouts! Use the search and find some, or <a href="javascript:void(0);" onclick="$(\'body\').removeClass(\'modal-open\');$(\'body\').css(\'padding-right\',\'0px\');$(\'.loader\').show();myWorkouts_Load();">create one</a>.');
    }    
    $('.search-form-workouts').keypress(function(e) {
        if(e.which === 13) {
            $('.search-workouts .search-btn-workouts').click();
        }
    });
    //register search function
    $('.search-workouts .search-btn-workouts').click(function(){
        
        var searchTerm = $('.search-workouts .search-form-workouts').val();
        $('.modal-new-search-term-workout').html(searchTerm);
 

        if (mlpObject.getWorkouts({name:searchTerm}).result["success"] === true){
            var searchedWorkouts = mlpObject.result["data"];
            $('.search-workouts').append('<div class="total-workouts" style="display:none;">' + Object.keys(mlpObject.result["data"]).length + '</div>');
            myDiary_NewModelAddSearchWorkouts(searchedWorkouts, 1, radio);
        }
        else{

            $('.modal-search-results-workouts').html('No results for this workout. <a href="javascript:void(0);" onclick="$(\'body\').removeClass(\'modal-open\');$(\'body\').css(\'padding-right\',\'0px\');$(\'.loader\').show();load(\'myworkouts\',myWorkouts_Load);">Create it?</a>');
            
        }
        
        
        
    }); 
    
    $('#newModal').on('hidden.bs.modal', function () {
        $('.search-form-workouts').unbind();
        $('.search-workouts .search-btn-workouts').unbind();
    });    
    
        
}

function myDiary_NewModelAddSearchWorkouts(searchedWorkouts, page, radio){
    $('.modal-new-checkbox:checked').each(function(){
        var $this = $(this); 
        var found = false;
        selectedPaginatedItems.each(function(){
            if ($this.attr('class') === $(this).attr('class')){
                found = true;
                return false;                
            }  
        });
         if (found === false){
            selectedPaginatedItems.push(this);
        }        
    });    
    
    
    $(".search-workouts .current-page-workouts").html(page);
    var html = '';   
   
    
    
    for (var x in searchedWorkouts){  
        var workout = searchedWorkouts[x];
        if (x >= 6*page){break;}
        if (x >= (6*page - 6)){        
        
        
        html = html + 
            '<div class="row modal-new-search-item-workouts searchworkout-' + workout["id"] + '" style="padding: 5px 0;">' +
            '<input type="checkbox" value="" class="modal-new-checkbox searchworkout-' + workout["id"] + '"> <div class="modal-new-workout-name" style="display: inline;">' + workout["name"] + '</div>' +
            '<div class="modal-new-input" style="margin-top: 5px; margin-right:40px;"><a href="javascript:void(0);" class=" modal-new-exercises-link" onclick="javascript:$(\'.modal-new-search-item-workouts.searchworkout-' + workout["id"] + ' .modal-new-exercises\').slideToggle();">Exercises <i class="fa fa-caret-down"></i></a>' +
            '<div class="modal-new-exercises" style="display:none;width: 150%;">';
        for (var y in workout["exercises"]){    
            var exercise = workout["exercises"][y];
            html = html + '<span class="workout-exercise' + exercise["exerciseid"] + '">' 
                    + exercise["name"] +
                    '<br/><div class="exercise-details" style="display:none;">' +
                        '<div class="id">' + exercise["exerciseid"] + '</div>' +
                        '<div class="reps">' + exercise["reps"] + '</div>' +
                        '<div class="sets">' + exercise["sets"] + '</div>' +
                        '<div class="weight">' + exercise["weight"] + '</div>' +
                        '<div class="rpe">' + exercise["rpe"] + '</div>' +
                        '<div class="percentage">' + exercise["percentage"] + '</div>' + 
                        '</div></span>';
        }
        html = html +
            '</div></div>' +
            '</div>'; 
        }

    
    }
    
    $('.modal-search-results-workouts').html(html);
    if (radio){checkboxToRadio();}
    var pages = Math.ceil(Object.keys(searchedWorkouts).length / 6);

    if (pages === 0){return;};
    html = ''; 

    html = html + '<li>' +
    '<a href="javascript:void(0);"  onclick="javascript:myDiary_NewModelChangeSearchPageWorkouts(0, ' + radio + ')" ' ;
    if (page == 1){html = html + 'disabled';}
    html = html + ' aria-label="Previous"> ' +
    '<span aria-hidden="true">&laquo;</span>' +
    '</a>' +
    '</li>';

    x = (Math.floor((page - 1)/4.0) * 4)+1;
    if (x < 1){x = 1;};


    var endx = x + 4;
    while (x <= pages && x < endx){
    html = html + '<li><a href="javascript:void(0);" ';
    if (x == page) {html = html + 'style="background-color:#eee"';};
    html = html + ' onclick="javascript:myDiary_NewModelChangeSearchPageWorkouts(' + x + ', ' + radio + ')">' + x + '</a></li>';
        x += 1;
    }
    
    html = html + '<li>' +
    '<a href="javascript:void(0);" onclick="javascript:myDiary_NewModelChangeSearchPageWorkouts(6, ' + radio + ')" ';
    if (page == pages){html = html + 'disabled';}
    html = html + ' aria-label="Next">' +
    '<span aria-hidden="true">&raquo;</span>' +
    '</a>' +
    '</li>';
    
    $('.pagination.search-workouts').html(html);
    selectedPaginatedItems.each(function(){
        var $this = $(this); 
        $('.modal-new-checkbox').each(function(){
            if ($this.attr('class') === $(this).attr('class')){
                $(this).prop('checked', true);
            }
            
        });
        
    }); 
    
    //add to check if user unchecks
    $('.modal-new-checkbox').unbind();
    $('.modal-new-checkbox').on('change', function(){

        if (!$(this).is(':checked')){
            var $this = $(this);
            selectedPaginatedItems.each(function(x){
                if ($this.attr('class') === $(this).attr('class')){
                    selectedPaginatedItems.splice(x, 1);
            }
            
        });
        
        }                   
    });     
    
    
    if (pages === 1){
        $('.pagination.search-workouts').css({"padding-left":"92px"});
    }
    if (pages === 2){
        $('.pagination.search-workouts').css({"padding-left":"88px"});
    }
    if (pages === 3){
        $('.pagination.search-workouts').css({"padding-left":"74px"});
    }
    if (pages === 4){
        $('.pagination.search-workouts').css({"padding-left":"44px"});
    }      
}

function myDiary_NewModelChangeSearchPageWorkouts(pageNumber, radio){
    if (pageNumber >= 6){
        var currentPage = parseInt($(".search-workouts .current-page-workouts").html());
        if (parseInt($('.total-workouts').html()) <= currentPage*6){
            return;
        }
        else{
            pageNumber = parseInt($(".search-workouts .current-page-workouts").html()) + 1;         
        }

    }
    else if(pageNumber <= 0){
        pageNumber = parseInt($(".search-workouts .current-page-workouts").html()) - 1;
        if (pageNumber < 1){return;};
    }
    
    
    
    var searchTerm = $('.modal-new-search-term-workout').html();



    if (mlpObject.getWorkouts({name:searchTerm}).result["success"] === true){
        var searchedWorkouts = mlpObject.result["data"];

        myDiary_NewModelAddSearchWorkouts(searchedWorkouts, pageNumber, radio);
    }
    
    

    
}


function myDiary_NewModelAddRecentWorkouts(recentWorkouts, page, radio){
    $('.modal-new-checkbox:checked').each(function(){
        var $this = $(this); 
        var found = false;
        selectedPaginatedItems.each(function(){
            if ($this.attr('class') === $(this).attr('class')){
                found = true;
                return false;                
            }  
        });
         if (found === false){
            selectedPaginatedItems.push(this);
        }        
    });
    
    $(".recent-workouts .current-page-workouts").html(page);    
    var html = '';
    for (var x in recentWorkouts){
        var workout = recentWorkouts[x];
        if (x >= 7*page){break;}
        if (x >= (7*page - 7)){
        html = html + 
            '<div class="row modal-new-recent-item-workouts recentworkout-' + workout["workoutid"] + '" style="padding: 5px 0;">' +
            '<input type="checkbox" value="" class="modal-new-checkbox recentworkout-' + workout["workoutid"] + '"> <div class="modal-new-workout-name" style="display: inline;">' + workout["name"] + '</div>' +
            '<div class="modal-new-input" style="margin-top: 5px; margin-right:40px;"><a href="javascript:void(0);" class=" modal-new-exercises-link" onclick="javascript:$(\'.modal-new-recent-item-workouts.recentworkout-' + workout["workoutid"] + ' .modal-new-exercises\').slideToggle();">Exercises <i class="fa fa-caret-down"></i></a>' +
            '<div class="modal-new-exercises" style="display:none;width: 150%;">';
        for (var y in workout["exercises"]){    
            var exercise = workout["exercises"][y];
            html = html + '<span class="workout-exercise' + exercise["exerciseid"] + '">' 
                    + exercise["name"] +
                    '<br/><div class="exercise-details" style="display:none;">' +
                        '<div class="id">' + exercise["exerciseid"] + '</div>' +
                        '<div class="reps">' + exercise["reps"] + '</div>' +
                        '<div class="sets">' + exercise["sets"] + '</div>' +
                        '<div class="weight">' + exercise["weight"] + '</div>' +
                        '<div class="rpe">' + exercise["rpe"] + '</div>' +
                        '<div class="percentage">' + exercise["percentage"] + '</div>' + 
                        '</div></span>';
        }
        html = html +
            '</div></div>' +
            '</div>'; 
        }

    }
    
    $('.modal-new-recent-items-workouts').html(html);    
    if (radio){checkboxToRadio();}
    var pages = Math.ceil(Object.keys(recentWorkouts).length / 6);

    if (pages === 0){return;};
    html = ''; 

    html = html + '<li>' +
    '<a href="javascript:void(0);"  onclick="javascript:myDiary_NewModelChangeRecentPageWorkouts(0, ' + radio + ')" ' ;
    if (page == 1){html = html + 'disabled';}
    html = html + ' aria-label="Previous"> ' +
    '<span aria-hidden="true">&laquo;</span>' +
    '</a>' +
    '</li>';
    
    x = 1;
    while (x <= pages && x < 5){
    html = html + '<li><a href="javascript:void(0);" ';
    if (x == page) {html = html + 'style="background-color:#eee"';};
    html = html + ' onclick="javascript:myDiary_NewModelChangeRecentPageWorkouts(' + x + ', ' + radio + ')">' + x + '</a></li>';
        x += 1;
    }
    
    html = html + '<li>' +
    '<a href="javascript:void(0);" onclick="javascript:myDiary_NewModelChangeRecentPageWorkouts(6, ' + radio + ')" ';
    if (page == pages){html = html + 'disabled';}
    html = html + ' aria-label="Next">' +
    '<span aria-hidden="true">&raquo;</span>' +
    '</a>' +
    '</li>';
    
    $('.pagination.recent-workouts').html(html);    
    selectedPaginatedItems.each(function(){
        var $this = $(this); 
        $('.modal-new-checkbox').each(function(){
            if ($this.attr('class') === $(this).attr('class')){
                $(this).prop('checked', true);
            }
            
        });
        
    }); 
    
    //add to check if user unchecks
    $('.modal-new-checkbox').unbind();
    $('.modal-new-checkbox').on('change', function(){

        if (!$(this).is(':checked')){
            var $this = $(this);
            selectedPaginatedItems.each(function(x){
                if ($this.attr('class') === $(this).attr('class')){
                    selectedPaginatedItems.splice(x, 1);
            }
            
        });
        
        }                   
    });     
    
    if (pages === 1){
        $('.pagination.recent-workouts').css({"padding-left":"92px"});
    }
    if (pages === 2){
        $('.pagination.recent-workouts').css({"padding-left":"88px"});
    }
    if (pages === 3){
        $('.pagination.recent-workouts').css({"padding-left":"74px"});
    }
    if (pages === 4){
        $('.pagination.recent-workouts').css({"padding-left":"44px"});
    }    
}


function myDiary_NewModelChangeRecentPageWorkouts(pageNumber){
    if (pageNumber >= 6){

        pageNumber = parseInt($(".recent-workouts .current-page-workouts").html()) + 1;
        if (pageNumber > ($('.pagination.recent-workouts').children().length - 2)){return;};
    }
    else if(pageNumber <= 0){
        pageNumber = parseInt($(".recent-workouts .current-page-workouts").html()) - 1;
        if (pageNumber < 1){return;};
    }


    if (mlpObject.selectResults({limit:35,type:"workouts"}).result["success"] === true){
    var recentWorkouts = mlpObject.result["data"];
    myDiary_NewModelAddRecentWorkouts(recentWorkouts, pageNumber);
    }
    
    
    

}


function myDiary_NewModelInitialiseExercises(){

    
    //get recent exercises (max:35) ordered by date they were added
    //exerciseid : exercise name
    var recentExercises = {};
    var details = {};
    var recentResults = mlpObject.selectResults({limit:35,type:"exercises"}).result;
    
    if (recentResults["success"] === true){
        var recentResult;
        for(recentResult in recentResults["data"]){
            recentExercises[recentResults["data"][recentResult]["exerciseid"]] = recentResults["data"][recentResult]["name"];
            details[recentResults["data"][recentResult]["exerciseid"]] = recentResults["data"][recentResult]["details"];
        }
        myDiary_NewModelAddRecent(recentResults["data"], details, 1);
    }
    else{
        $('.modal-new-recent-items').html('You have not added any exercises! Use the search and find some, or <a href="javascript:void(0);" onclick="$(\'body\').removeClass(\'modal-open\');$(\'body\').css(\'padding-right\',\'0px\');$(\'.loader\').show();myExercises_Load();">create one</a>.');
    }
    
    $('.search-form').keypress(function(e) {
        if(e.which === 13) {
            $('.search-exercises .search-btn').click();
        }
    });
    //register search function
    $('.search-exercises .search-btn').click(function(){

        var searchTerm = $('.search-exercises .search-form').val();
        $('.modal-new-search-term').html(searchTerm);
        //get all exercises that match criteria in format same as recent exercises
        var searchedExercises = {};
        var searchResults = mlpObject.getExercises({name:searchTerm}).result;
        if (searchResults["success"] === true){
            var searchResult;
            for(searchResult in searchResults["data"]){
                searchedExercises[searchResults["data"][searchResult]["id"]] = searchResults["data"][searchResult]["name"];
            }
            $('.search-exercises').append('<div class="total-exercises" style="display:none;">' + Object.keys(mlpObject.result["data"]).length + '</div>');
        }
        myDiary_NewModelAddSearch(searchedExercises, 1);
        
        
    });   
    
   
    
    $('#newModal').on('hidden.bs.modal', function () {
        $('.modal-new-checkbox').prop('checked', false);
        selectedPaginatedItems = $('.modal-new-checkbox:checked');
        $('.saved-exercise-data').html('');
        $('.search-form').unbind();
        $('.search-exercises .search-btn').unbind();
    });     
    
    
}

function myDiary_NewModelAddRecent(recentExercises, details, page){
    
    
    if ($('.saved-exercise-data').length < 1){
        $('.modal-content').append("<div class='saved-exercise-data' style='display:none;'></div>");
    }    

    //add new checked items before changing page
    $('.modal-new-checkbox:checked').each(function(){
        var $this = $(this); 
        var found = false;
        var dataClass = '.modal-new-recent-item.' + $this.attr('class').split(' ')[1];
        selectedPaginatedItems.each(function(){
            if ($this.attr('class') === $(this).attr('class')){
                $('.saved-exercise-data ' + dataClass + ' .reps').val($('.modal-new-recent-items ' + dataClass + ' .reps').val());
                $('.saved-exercise-data ' + dataClass + ' .weight').val($('.modal-new-recent-items ' + dataClass + ' .weight').val());
                $('.saved-exercise-data ' + dataClass + ' .rpe').val($('.modal-new-recent-items ' + dataClass + ' .rpe').val());
                $('.saved-exercise-data ' + dataClass + ' .percentage').val($('.modal-new-recent-items ' + dataClass + ' .percentage').val());


                if ($('.modal-new-recent-items ' + dataClass + ' .sets').val() !== undefined){
                    $('.saved-exercise-data ' + dataClass + ' .sets').val($('.modal-new-recent-items ' + dataClass + ' .sets').val());

                }
                if ($('.modal-new-recent-items ' + dataClass + ' .onerm').val() !== undefined){
                    $('.saved-exercise-data ' + dataClass + ' .onerm').val($('.modal-new-recent-items ' + dataClass + ' .onerm').val());
                    $('.saved-exercise-data ' + dataClass + ' .type').val($('.modal-new-recent-items ' + dataClass + ' .type').val());

                }                
                
                found = true;
                return false;
                
            }  
        });
         if (found === false){
            selectedPaginatedItems.push(this);
            
            $this.remove();
            $('.saved-exercise-data').append('<div class="' + dataClass.split('.').join(' ') + '">' + $(dataClass).html() + '</div>');
                $('.saved-exercise-data ' + dataClass + ' .reps').val($('.modal-new-recent-items ' + dataClass + ' .reps').val());
                $('.saved-exercise-data ' + dataClass + ' .weight').val($('.modal-new-recent-items ' + dataClass + ' .weight').val());
                $('.saved-exercise-data ' + dataClass + ' .rpe').val($('.modal-new-recent-items ' + dataClass + ' .rpe').val());
                $('.saved-exercise-data ' + dataClass + ' .percentage').val($('.modal-new-recent-items ' + dataClass + ' .percentage').val());  

                if ($('.modal-new-recent-items ' + dataClass + ' .sets').val() !== undefined){
                    
                    $('.saved-exercise-data ' + dataClass + ' .sets').val($('.modal-new-recent-items ' + dataClass + ' .sets').val());

                }   
                
                if ($('.modal-new-recent-items ' + dataClass + ' .onerm').val() !== undefined){
                    $('.saved-exercise-data ' + dataClass + ' .onerm').val($('.modal-new-recent-items ' + dataClass + ' .onerm').val());
                    $('.saved-exercise-data ' + dataClass + ' .type').val($('.modal-new-recent-items ' + dataClass + ' .type').val());

                }                 
            
        }        
    });
    
    
    
    
    $(".recent-exercises .current-page").html(page);    
    var html = '';
    var x = 0;
    for (var index in recentExercises){
        var exerciseId = recentExercises[index]["exerciseid"];
        var name = recentExercises[index]["name"];
        if (x >= 7*page){break;}
        if (x >= (7*page - 7)){
        if (details[exerciseId]['weight'] < 1 || details[exerciseId]['weight'] === undefined){details[exerciseId]['weight'] = '';}
        if (details[exerciseId]['reps'] < 1 || details[exerciseId]['reps'] === undefined){details[exerciseId]['reps'] = '';}
        if (details[exerciseId]['rpe'] < 1 || details[exerciseId]['rpe'] === undefined){details[exerciseId]['rpe'] = '';}
        if (details[exerciseId]['percentage'] < 1 || details[exerciseId]['percentage'] === undefined){details[exerciseId]['percentage'] = '';}
        html = html + 
            '<div class="row modal-new-recent-item recentexercise-' + exerciseId + '">' +
            '<input type="checkbox" value="" class="modal-new-checkbox recentexercise-' + exerciseId + '"> <div class="modal-new-exercise-name">' + name + '</div>' +
            '<div class="modal-new-inputs modal-new-main">' +
            '<a href="javascript:void(0);" class="modal-new-input modal-new-more-link" onclick="javascript:$(\'.modal-new-recent-item.recentexercise-' + exerciseId + ' .modal-new-more\').slideToggle();">More <i class="fa fa-caret-down"></i></a>' +
            '<div class="modal-new-input"><input title="Weight" min="0" type="number" class="form-control weight" placeholder="Weight" step="0.01" value="' + details[exerciseId]['weight'] + '"></div>' +
            '<div class="modal-new-input"><input title="Reps" min="0" type="number" class="form-control reps" placeholder="Reps" step="0.1" value="' + details[exerciseId]['reps'] + '"></div>  ' +
            '</div>' +
            '<div class="modal-new-inputs modal-new-more">' +
            '<div class="modal-new-input extra-input">&nbsp;</div>' +
            '<div class="modal-new-input"><input title="RPE" min="0" type="number" class="form-control rpe" placeholder="RPE" step="0.1" value="' + details[exerciseId]['rpe'] + '"></div>' +
            '<div class="modal-new-input"><input title="%1RM" min="0" type="number" class="form-control percentage" placeholder="%1RM" step="0.01" value="' + details[exerciseId]['percentage'] + '"></div>' +
            '</div>' +
            '</div>'; 
        }
        x += 1;
    }
    
    $('.modal-new-recent-items').html(html);
    //if(!('ontouchstart' in window)){
        $("[title]").tooltip({delay: { show: 0, hide: 0 } });
    //}    
    var pages = Math.ceil(Object.keys(recentExercises).length / 7);
    if (pages === 0){return;};
    html = ''; 
    
    html = html + '<li>' +
    '<a href="javascript:void(0);"  onclick="javascript:myDiary_NewModelChangeRecentPage(0)" ' ;
    if (page == 1){html = html + 'disabled';}
    html = html + ' aria-label="Previous"> ' +
    '<span aria-hidden="true">&laquo;</span>' +
    '</a>' +
    '</li>';
    
    x = 1;
    while (x <= pages  && x < 5){
    html = html + '<li><a href="javascript:void(0);" ';
    if (x == page) {html = html + 'style="background-color:#eee"';};
    html = html + ' onclick="javascript:myDiary_NewModelChangeRecentPage(' + x + ')">' + x + '</a></li>';
        x += 1;
    }
    
    html = html + '<li>' +
    '<a href="javascript:void(0);" onclick="javascript:myDiary_NewModelChangeRecentPage(6)"  ';
    if (page == pages){html = html + 'disabled';}
    html = html + ' aria-label="Next">' +
    '<span aria-hidden="true">&raquo;</span>' +
    '</a>' +
    '</li>';
    
    $('.pagination.recent').html(html);  
    
    
    
    
    
    
    //get all currently selected items (from previous pages etc..) and check if any elements exist in this page that need to be checked
    
    
    
    selectedPaginatedItems.each(function(){
        var $this = $(this); 
        $('.modal-new-checkbox').each(function(){
            if ($this.attr('class') === $(this).attr('class')){
                $(this).prop('checked', true);
                $('.modal-new-recent-items .modal-new-recent-item.' + $this.attr('class').split(' ')[1] + ' .reps').val($('.saved-exercise-data .modal-new-recent-item.' + $this.attr('class').split(' ')[1] + ' .reps').val());
                $('.modal-new-recent-items .modal-new-recent-item.' + $this.attr('class').split(' ')[1] + ' .weight').val($('.saved-exercise-data .modal-new-recent-item.' + $this.attr('class').split(' ')[1] + ' .weight').val());
                $('.modal-new-recent-items .modal-new-recent-item.' + $this.attr('class').split(' ')[1] + ' .rpe').val($('.saved-exercise-data .modal-new-recent-item.' + $this.attr('class').split(' ')[1] + ' .rpe').val());
                $('.modal-new-recent-items .modal-new-recent-item.' + $this.attr('class').split(' ')[1] + ' .percentage').val($('.saved-exercise-data .modal-new-recent-item.' + $this.attr('class').split(' ')[1] + ' .percentage').val());
                setTimeout(function(){

                if ($('.saved-exercise-data .modal-new-recent-item.' + $this.attr('class').split(' ')[1] + ' .sets').val() !== undefined){

                    $('.modal-new-recent-items .modal-new-recent-item.' + $this.attr('class').split(' ')[1] + ' .sets').val($('.saved-exercise-data .modal-new-recent-item.' + $this.attr('class').split(' ')[1] + ' .sets').val());
                }  
            },750);
                setTimeout(function(){
            
                if ($('.saved-exercise-data .modal-new-recent-item.' + $this.attr('class').split(' ')[1] + ' .onerm').val() !== undefined){
                    $('.modal-new-recent-items .modal-new-recent-item.' + $this.attr('class').split(' ')[1] + ' .onerm').val($('.saved-exercise-data .modal-new-recent-item.' + $this.attr('class').split(' ')[1] + ' .onerm').val());
                    $('.modal-new-recent-items .modal-new-recent-item.' + $this.attr('class').split(' ')[1] + ' .type').val($('.saved-exercise-data .modal-new-recent-item.' + $this.attr('class').split(' ')[1] + ' .type').val());

                }             
            },100);
            
            
            }
            
        });
        
    });
    
    //add to check if user unchecks
    $('.modal-new-checkbox').unbind();
    $('.modal-new-checkbox').on('change', function(){
        $('.modal-new-checkbox').unbind();
        if (!$(this).is(':checked')){
            var $this = $(this);
            selectedPaginatedItems.each(function(x){
                if ($this.attr('class') === $(this).attr('class')){
                    selectedPaginatedItems.splice(x, 1);
                    $('.saved-exercise-data .modal-new-recent-item.' + $this.attr('class').split(' ')[1]).remove();
            }
            
        });
        
        }                   
    });     
    if (pages === 1){
        $('.pagination.recent').css({"padding-left":"92px"});
    }
    if (pages === 2){
        $('.pagination.recent').css({"padding-left":"88px"});
    }
    if (pages === 3){
        $('.pagination.recent').css({"padding-left":"74px"});
    }
    if (pages === 4){
        $('.pagination.recent').css({"padding-left":"44px"});
    }
    
    
}


function myDiary_NewModelChangeRecentPage(pageNumber){
    if (pageNumber >= 6){
        pageNumber = parseInt($(".recent-exercises .current-page").html()) + 1;
        if (pageNumber > ($('.pagination.recent').children().length - 2)){return;};
    }
    else if(pageNumber <= 0){
        pageNumber = parseInt($(".recent-exercises .current-page").html()) - 1;
        if (pageNumber < 1){return;};
    }


    var recentExercises = {};
    var details = {};
    var recentResults = mlpObject.selectResults({limit:35,type:"exercises"}).result;
    
    if (recentResults["success"] === true){
        var recentResult;
        for(recentResult in recentResults["data"]){
            recentExercises[recentResults["data"][recentResult]["exerciseid"]] = recentResults["data"][recentResult]["name"];
            details[recentResults["data"][recentResult]["exerciseid"]] = recentResults["data"][recentResult]["details"];
        }    
        myDiary_NewModelAddRecent(recentResults["data"], details, pageNumber);  
    }
    
    
    

}


function myDiary_NewModelAddSearch(searchedExercises, page){
    if ($('.saved-exercise-data').length < 1){
        $('.modal-content').append("<div class='saved-exercise-data' style='display:none;'></div>");
    }    
    
    
    //add new checked items before changing page
    $('.modal-new-checkbox:checked').each(function(){
        var $this = $(this); 
        var found = false;
        var dataClass = '.modal-new-search-item.' + $this.attr('class').split(' ')[1];
        selectedPaginatedItems.each(function(){
            if ($this.attr('class') === $(this).attr('class')){
                $('.saved-exercise-data ' + dataClass + ' .reps').val($('.modal-search-results ' + dataClass + ' .reps').val());
                $('.saved-exercise-data ' + dataClass + ' .weight').val($('.modal-search-results ' + dataClass + ' .weight').val());
                $('.saved-exercise-data ' + dataClass + ' .rpe').val($('.modal-search-results ' + dataClass + ' .rpe').val());
                $('.saved-exercise-data ' + dataClass + ' .percentage').val($('.modal-search-results ' + dataClass + ' .percentage').val());  
                if ($('.modal-search-results ' + dataClass + ' .sets').val() !== undefined){
                    
                    $('.saved-exercise-data ' + dataClass + ' .sets').val($('.modal-search-results ' + dataClass + ' .sets').val());

                }
                
                if ($('.modal-search-results ' + dataClass + ' .onerm').val() !== undefined){
                    $('.saved-exercise-data ' + dataClass + ' .onerm').val($('.modal-search-results ' + dataClass + ' .onerm').val());
                    $('.saved-exercise-data ' + dataClass + ' .type').val($('.modal-search-results ' + dataClass + ' .type').val());

                }                 
                
                found = true;
                return false;
                
            }  
        });
         if (found === false){
            selectedPaginatedItems.push(this);
            
            $this.remove();
            $('.saved-exercise-data').append('<div class="' + dataClass.split('.').join(' ') + '">' + $(dataClass).html() + '</div>');
                $('.saved-exercise-data ' + dataClass + ' .reps').val($('.modal-search-results ' + dataClass + ' .reps').val());
                $('.saved-exercise-data ' + dataClass + ' .weight').val($('.modal-search-results ' + dataClass + ' .weight').val());
                $('.saved-exercise-data ' + dataClass + ' .rpe').val($('.modal-search-results ' + dataClass + ' .rpe').val());
                $('.saved-exercise-data ' + dataClass + ' .percentage').val($('.modal-search-results ' + dataClass + ' .percentage').val()); 
                if ($('.modal-search-results ' + dataClass + ' .sets').val() !== undefined){
                    
                    $('.saved-exercise-data ' + dataClass + ' .sets').val($('.modal-search-results ' + dataClass + ' .sets').val());

                } 
                
                if ($('.modal-search-results ' + dataClass + ' .onerm').val() !== undefined){
                    $('.saved-exercise-data ' + dataClass + ' .onerm').val($('.modal-search-results ' + dataClass + ' .onerm').val());
                    $('.saved-exercise-data ' + dataClass + ' .type').val($('.modal-search-results ' + dataClass + ' .type').val());

                }                 
                
            
        }        
    });
    $(".search-exercises .current-page").html(page);
    var html = '';    
    var exerciseId;
    var x = 0;
    if (Object.keys(searchedExercises).length < 1){
        html = html + 'No results for this exercise. <a href="javascript:void(0);" onclick="$(\'body\').removeClass(\'modal-open\');$(\'body\').css(\'padding-right\',\'0px\');$(\'.loader\').show();load(\'myexercises\',myExercises_Load);">Create it?</a>';
    }
    for (exerciseId in searchedExercises){   
        if (x >= 6*page){break;}
        if (x >= (6*page - 6)){        
        
        
        html = html +    
            '<div class="row modal-new-search-item searchexercise-' + exerciseId + '">' +
            '<input type="checkbox" value="" class="modal-new-checkbox searchexercise-' + exerciseId + '"> <div class="modal-new-exercise-name">' + searchedExercises[exerciseId] + '</div>' +
            '<div class="modal-new-inputs modal-new-main">' +
            '<a href="javascript:void(0);" class="modal-new-input modal-new-more-link" onclick="javascript:$(\'.modal-new-search-item.searchexercise-' + exerciseId + ' .modal-new-more\').slideToggle();">More <i class="fa fa-caret-down"></i></a>' +
            '<div class="modal-new-input"><input title="Weight" step="0.01" min="0" type="number" class="form-control weight" placeholder="Weight" required></div>' +
            '<div class="modal-new-input"><input title="Reps" step="0.1" min="0" type="number" class="form-control reps" placeholder="Reps" required></div>' +
            '</div>' +
            '<div class="modal-new-inputs modal-new-more">' +
            '<div class="modal-new-input extra-input">&nbsp;</div> '  +
            '<div class="modal-new-input"><input title="RPE" step="0.1" min="0" type="number" class="form-control rpe" placeholder="RPE" required></div>' +
            '<div class="modal-new-input"><input title="%1RM" step="0.01" min="0" type="number" class="form-control percentage" placeholder="%1RM" required></div>' +
            '</div>' +
            '</div>'; 
        }
    
        x += 1;    

    }
    
    $('.modal-search-results').html(html);
    //if(!('ontouchstart' in window)){
        $("[title]").tooltip({delay: { show: 0, hide: 0 } });
    //}     
    
    var pages = Math.ceil(Object.keys(searchedExercises).length / 6);
    if (pages === 0){return;};
    html = ''; 
    
    html = html + '<li>' +
    '<a href="javascript:void(0);"  onclick="javascript:myDiary_NewModelChangeSearchPage(0)" ' ;
    if (page == 1){html = html + 'disabled';}
    html = html + ' aria-label="Previous"> ' +
    '<span aria-hidden="true">&laquo;</span>' +
    '</a>' +
    '</li>';
    
    x = (Math.floor((page - 1)/4.0) * 4)+1;
    if (x < 1){x = 1;};


    var endx = x + 4;
    while (x <= pages && x < endx){
    html = html + '<li><a href="javascript:void(0);" ';
    if (x == page) {html = html + 'style="background-color:#eee"';};
    html = html + ' onclick="javascript:myDiary_NewModelChangeSearchPage(' + x + ')">' + x + '</a></li>';
        x += 1;
    }
    
    html = html + '<li>' +
    '<a href="javascript:void(0);" onclick="javascript:myDiary_NewModelChangeSearchPage(6)"  ';
    if (page == pages){html = html + 'disabled';}
    html = html + ' aria-label="Next">' +
    '<span aria-hidden="true">&raquo;</span>' +
    '</a>' +
    '</li>';
    
    $('.pagination.search').html(html);
    selectedPaginatedItems.each(function(){
        var $this = $(this); 
        $('.modal-new-checkbox').each(function(){
            if ($this.attr('class') === $(this).attr('class')){
                $(this).prop('checked', true);
                $('.modal-search-results .modal-new-search-item.' + $this.attr('class').split(' ')[1] + ' .reps').val($('.saved-exercise-data .modal-new-search-item.' + $this.attr('class').split(' ')[1] + ' .reps').val());
                $('.modal-search-results .modal-new-search-item.' + $this.attr('class').split(' ')[1] + ' .weight').val($('.saved-exercise-data .modal-new-search-item.' + $this.attr('class').split(' ')[1] + ' .weight').val());
                $('.modal-search-results .modal-new-search-item.' + $this.attr('class').split(' ')[1] + ' .rpe').val($('.saved-exercise-data .modal-new-search-item.' + $this.attr('class').split(' ')[1] + ' .rpe').val());
                $('.modal-search-results .modal-new-search-item.' + $this.attr('class').split(' ')[1] + ' .percentage').val($('.saved-exercise-data .modal-new-search-item.' + $this.attr('class').split(' ')[1] + ' .percentage').val());
                setTimeout(function(){

                if ($('.saved-exercise-data .modal-new-search-item.' + $this.attr('class').split(' ')[1] + ' .sets').val() !== undefined){

                    $('.modal-search-results .modal-new-search-item.' + $this.attr('class').split(' ')[1] + ' .sets').val($('.saved-exercise-data .modal-new-search-item.' + $this.attr('class').split(' ')[1] + ' .sets').val());
                }  
            },750);                
                setTimeout(function(){
            
                if ($('.saved-exercise-data .modal-new-search-item.' + $this.attr('class').split(' ')[1] + ' .onerm').val() !== undefined){
                    $('.modal-search-results .modal-new-search-item.' + $this.attr('class').split(' ')[1] + ' .onerm').val($('.saved-exercise-data .modal-new-search-item.' + $this.attr('class').split(' ')[1] + ' .onerm').val());
                    $('.modal-search-results .modal-new-search-item.' + $this.attr('class').split(' ')[1] + ' .type').val($('.saved-exercise-data .modal-new-search-item.' + $this.attr('class').split(' ')[1] + ' .type').val());

                }             
            },100);                
            }
            
        });
        
    }); 
    
    //add to check if user unchecks
    $('.modal-new-checkbox').unbind();
    $('.modal-new-checkbox').on('change', function(){
$('.modal-new-checkbox').unbind();
        if (!$(this).is(':checked')){
            var $this = $(this);
            selectedPaginatedItems.each(function(x){
                if ($this.attr('class') === $(this).attr('class')){
                    selectedPaginatedItems.splice(x, 1);
                    $('.saved-exercise-data .modal-new-search-item.' + $this.attr('class').split(' ')[1]).remove();
            }
            
        });
        
        }                   
    });     
    
    if (pages === 1){
        $('.pagination.search').css({"padding-left":"92px"});
    }
    if (pages === 2){
        $('.pagination.search').css({"padding-left":"88px"});
    }
    if (pages === 3){
        $('.pagination.search').css({"padding-left":"74px"});
    }
    if (pages === 4){
        $('.pagination.search').css({"padding-left":"44px"});
    }    
}

function myDiary_NewModelChangeSearchPage(pageNumber){
    if (pageNumber >= 6){
        var currentPage = parseInt($(".search-exercises .current-page").html());
        if (parseInt($('.total-exercises').html()) <= currentPage*6){
            return;
        }
        else{
            pageNumber = parseInt($(".search-exercises .current-page").html()) + 1;         
        }

    }   
    
    else if(pageNumber <= 0){
        pageNumber = parseInt($(".search-exercises .current-page").html()) - 1;
        if (pageNumber < 1){return;};
    }
    
    
    
    var searchTerm = $('.modal-new-search-term').html();
    //get all exercises that match criteria in format same as recent exercises
    var searchedExercises = {};   
    var searchResults = mlpObject.getExercises({name:searchTerm}).result;
    if (searchResults["success"] === true){
        var searchResult;
        for(searchResult in searchResults["data"]){
            searchedExercises[searchResults["data"][searchResult]["id"]] = searchResults["data"][searchResult]["name"];
        }
    
    
        myDiary_NewModelAddSearch(searchedExercises, pageNumber);
        
    }

    
}







function myDiary_appendHTML(dataArray){
	var className = dataArray[0]["exercise"].split(" ").join("");
	$(".my-exercises").append(myDiary_generateHTML(dataArray));
	
	$("." + className + " .old").on("click",function(e){
		myDiary_ExerciseClickRegisterFunction(e.target);
	});		
	
	$("." + className + " .btn-circle").on("click",function(e){
		myDiary_ExerciseClickRegisterFunction(e.target);
	});
	$("." + className + " .btn-options").on("click",function(e){
		myDiary_ExerciseClickRegisterFunction(e.target);
	});	
	
	$("." + className + " .save-form").on("submit",function(e){
		e.preventDefault();
		myDiary_ExerciseClickRegisterFunction(e.target);
	});
	
	$(".note").handleKeyboardChange(1000).change(function(e){
    myDiary_ExerciseClickRegisterFunction(e.target);// value has changed!
	});
	
	toggleCaret("." + className + " .old", "." + className + " .old i", "fa-caret-up", "fa-caret-down");
	
	$("." + className + " .view-added").hide();
	$("." + className + " .view-log").hide();
	$("." + className + " .view-exercise-settings").hide();
	$("." + className + " .view-old").hide();
}



		
function myDiary_generateHTML(dataArrayOriginal){
        var dataArray = JSON.parse(JSON.stringify(dataArrayOriginal)); //clone array so pops dont affect the global array
        var totalVolume = 0;

        for (var index in dataArrayOriginal){
            totalVolume += parseInt(dataArrayOriginal[index]["reps"]) * 1 * parseInt(dataArrayOriginal[index]["weight"]);
        }
	var lastSet = dataArray.pop();
        console.log(dataArray.length);
	var constructedHTML = "";
        if (lastSet["notes"] === null){lastSet["notes"] = '';}
	constructedHTML = constructedHTML + '<div class="added-exercise ' + lastSet["exercise"].split(" ").join("") + ' exercise-' + lastSet["exerciseid"] + '">' +
		'<div class="added row set-' + lastSet["id"] + '">' +
			'<div class="col-xs-6 exercise">';
                        if (dataArray.length > 0 ){
                            constructedHTML = constructedHTML + '<a href="javascript:void(0);" title="Expand all sets" class="topset old ' + lastSet["exercise"].split(" ").join("") + '">' + lastSet["exercise"] + ' <i class="fa fa-caret-down"></i></a>';
                        }
                        else{
                            constructedHTML = constructedHTML + '<span class="topset old ' + lastSet["exercise"].split(" ").join("") + '"">' + lastSet["exercise"] + '</span>';
                        }
                        
                        constructedHTML = constructedHTML + '</div>' +	
			'<div class="col-xs-1 details exerciseid" style="display:none;">' + lastSet["exerciseid"] + '</div>' +
                        '<div class="col-xs-1 details id" style="display:none;">' + lastSet["id"] + '</div>' +
                        '<div class="col-xs-1 details reps">' + lastSet["reps"] + '</div>' +
			'<div class="col-xs-1 details set">' + lastSet["set"] + '</div>' +
			'<div class="col-xs-1 details weight">' + lastSet["weight"] + $(".units").html() + '</div>' +
			'<div class="col-xs-1 details rpe">' + lastSet["rpe"] + '</div>' +
			'<div class="col-xs-1 details percentage">' + lastSet["onerm"] + '%</div>' +
			'<div class="col-xs-1 details add">' + 
				'<a href="javascript:void(0);" class="btn btn-default btn-circle added" title="Add a new set to this exercise" style="margin-right: 2px;" data-toggle="button"><i class="fa fa-plus" ></i></a>' + 
                                '<a href="javascript:void(0);" class="btn btn-danger btn-circle exercise-delete" title="Delete exercise from your diary" style="margin-right: 2px;"><i class="fa fa-times"></i></a>' + 
				'<a href="javascript:void(0);" class="btn btn-success btn-circle log" title="View exercise log" style="margin-right: 2px;" data-toggle="button"><i class="fa fa-book"></i></a>' + 
				'<a href="javascript:void(0);" class="btn btn-primary btn-circle exercise-settings" title="View settings for this set" data-toggle="button"><i class="fa fa-cog"></i></a>' + 
                                
			'</div>' + 		
        '</div>' +
		'<div class="view-added row">' +
			'<div class="col-xs-6 headers" style="line-height:70px;"><i class="fa fa-plus"></i> New Set</div>' + 
			'<form role="form" class="save-form"><div class="form-group">';

                        if (lastSet["reps"] == 0){
                            lastSet["reps"] = '';
                        }
                        if (lastSet["weight"] == 0){
                            lastSet["weight"] = '';
                        }
                        if (lastSet["rpe"] == 0){
                            lastSet["rpe"] = '';
                        }
                        if (lastSet["onerm"] == 0){
                            lastSet["onerm"] = '';
                        }      
                        
			constructedHTML = constructedHTML + '<div class="col-xs-1 details reps"><input type="number" min="0" class="form-control" placeholder="Reps" step="0.1" value="' + lastSet["reps"] + '"></div>' +
			'<div class="col-xs-1 details set"><input type="number" class="form-control" min="0" placeholder="Set" value="' + (parseInt(lastSet["set"]) + 1) + '" required></div>' +
			'<div class="col-xs-1 details weight"><input type="number" class="form-control" min="0" placeholder="Weight" step="0.01" value="' + lastSet["weight"] + '"></div>' +
			'<div class="col-xs-1 details rpe"><input type="number" class="form-control" min="0" placeholder="RPE" step="0.1" value="' + lastSet["rpe"] + '"></div>' +
			'<div class="col-xs-1 details percentage"><input type="number" class="form-control" min="0" placeholder="%1RM" step="0.01" value="' + lastSet["onerm"] + '"></div>' +
			'<div class="col-xs-1"><button type="submit" class="btn btn-primary save" title="Add set to diary"><i class="fa fa-plus"></i> Add</button></div>' +
			'</div></form>'	+	
        '</div>' +  
	    '<div class="view-log row">' + 
                        '<div class="row" style="text-align:left;padding-left:15px;">' + 
                            '<div class="col-xs-4 col-xs-offset-7" style="margin-left: 60.5%;">' + 
                                '<span style="font-size: 16px;">Current Volume Total: ' + totalVolume + $(".units").html() + ' <a href="#mydiary" title="Reload diary" onclick="load(\'mydiary\', myDiary_Load,{date:\''+ $('.selected-date-hidden').html() + '\'});"><i class="fa fa-refresh"></i></a></span>' + 
                            '</div>'  +  
                        '</div>'  +    
			'<div class="col-xs-6 headers">Exercise Log</div>' + 
			'<form role="form"><div class="form-group">' + 
			'<div class="col-xs-5"><textarea class="form-control note" rows="5" placeholder="Write notes about this set...">' + lastSet["notes"] + '</textarea></div>' + 
			'</div></form>' + 	
			'<div class="col-xs-4 history"><div class="headers">Records <i class="fa fa-trophy"></i></div>' + 
					'<div class="row records">' + lastSet["records"][0] + '</div>' + 
					'<div class="row records">' + lastSet["records"][1] + '</div>' + 
					'<div class="row records">' + lastSet["records"][2] + '</div>' + 
					'<div class="row records">' + lastSet["records"][3] + '</div>' + 
			'</div>' +	
        '</div>' +
		'<div class="view-exercise-settings row">' +
			'<div class="col-xs-6 headers">Settings</div>' +
			'<div class="col-xs-2 " style="width:15%"><a href="javascript:void(0);" class="btn btn-primary btn-options edit" title="Edit this set"><i class="fa fa-pencil-square-o"></i> Edit Set</a></div>' +
			'<div class="col-xs-2" style="width:15%"><a href="javascript:void(0);" class="btn btn-danger btn-options delete" title="Delete this set"><i class="fa fa-times"></i> Delete Set</a></div>' +
			'<div class="col-xs-2" style="width:15%"><a href="javascript:void(0);" class="btn btn-success btn-options view-notes" title="View your notes for this set"><i class="fa fa-book"></i> View Notes</a></div>' +
			'<div class="col-xs-2" style="width:15%"><a href="javascript:void(0);" class="btn btn-default btn-options share-set" title="Share this set" onclick="$(\'.share' + lastSet["id"] + '\').slideToggle();"><i class="fa fa-share-alt"></i> Share Set</a>' +
                            '<div class="share' + lastSet["id"] + '" style="display:none;margin-top:5px;text-align:center;">' +
                                '<a style="padding: 5px;margin-left: -10px;" href="javascript:void(0);" onclick="fb_feed(\'\', \'I just got a set of ' + lastSet["reps"] + ' reps with ' + lastSet["weight"] + $('.units').html() + ' on ' + lastSet["exercise"] + '!\',\'\')"><i style="color:#3B5998;" class="fa fa-facebook-square fa-3x"></i></a>' +                               
                                '<a href="https://plus.google.com/share?url=www.myliftingpal.net" onclick="javascript:window.open(this.href,\'\', \'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600\');gp_share();return false;">' +
                                    '<i style="color:#db5a3c;" class="fa fa-google-plus-square fa-3x"></i></a> '  +                
                            '</div>' +         
                        '</div>' +	
        '</div>' +
	    '<div class="view-old">';
		
		while(dataArray.length){  
			var oldSet = dataArray.pop();
			constructedHTML = constructedHTML +	
			'<div class="old-set">' +
			'<div class="added row set-' + oldSet["id"] + ' ">' +
				'<div class="col-xs-6 exercise">' + ' ' + '</div>' +
                                '<div class="col-xs-1 details id" style="display:none;">' + oldSet["id"] + '</div>' +
				'<div class="col-xs-1 details reps">' + oldSet["reps"] + '</div>' +
				'<div class="col-xs-1 details set">' + oldSet["set"] + '</div>' +
				'<div class="col-xs-1 details weight">' + oldSet["weight"] + $(".units").html() + '</div>' +
				'<div class="col-xs-1 details rpe">' + oldSet["rpe"] + '</div>' +
				'<div class="col-xs-1 details percentage">' + oldSet["onerm"] + '%</div>' +
				'<div class="col-xs-1 details add">' +
					'<a href="javascript:void(0);" class="btn btn-primary btn-circle exercise-settings" title="View settings for this set" data-toggle="button"><i class="fa fa-cog"></i></a>' +
				'</div>' +			
            '</div>' +	  
			'<div class="view-exercise-settings row">' +	
				'<div class="col-xs-6 headers">Settings</div>' +	
				'<div class="col-xs-2" style="width:15%"><a href="javascript:void(0);" class="btn btn-primary btn-options edit" title="Edit this set"><i class="fa fa-pencil-square-o"></i> Edit Set</a></div>' +	
				'<div class="col-xs-2" style="width:15%"><a href="javascript:void(0);" class="btn btn-danger btn-options delete" title="Delete this set"><i class="fa fa-times"></i> Delete Set</a></div>' +	
				'<div class="col-xs-2" style="width:15%"><a href="javascript:void(0);" class="btn btn-success btn-options view-notes" title="View your notes for this set"><i class="fa fa-book"></i> View Notes</a></div>' +	
				'<div class="col-xs-2" style="width:15%"><a href="javascript:void(0);" class="btn btn-default btn-options share-set" title="Share this set" onclick="$(\'.share' + oldSet["id"] + '\').slideToggle();"><i class="fa fa-share-alt"></i> Share Set</a>' +
                                    '<div class="share' + oldSet["id"] + '" style="display:none;margin-top:5px;text-align:center;">' +
                                        '<a style="padding: 5px;margin-left: -10px;" href="javascript:void(0);" onclick="fb_feed(\'\', \'I just got a set of ' + oldSet["reps"] + ' reps with ' + oldSet["weight"] + $('.units').html() + ' on ' + lastSet["exercise"] + '!\',\'\')"><i style="color:#3B5998;" class="fa fa-facebook-square fa-3x"></i></a>' +                               
                                        '<a href="https://plus.google.com/share?url=www.myliftingpal.net" onclick="javascript:window.open(this.href,\'\', \'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600\');gp_share();return false;">' +
                                            '<i style="color:#db5a3c;" class="fa fa-google-plus-square fa-3x"></i></a> '  +                
                                    '</div>' +    
                                '</div>' +    
			'</div>' +
			'</div>';	  
		}
		
	    constructedHTML = constructedHTML  +	
		'</div>' +
	  '<hr/>' +
	  '</div>';
	  
	  return constructedHTML;
}	

/*END MY DIARY FUNCTIONS*/




/* GENERAL HELPER FUNCTIONS */


function toggleCaret(hrefClass, caretClass, caretClass1, caretClass2){
 
	$(hrefClass).on("click",function(e){
		if ($(caretClass).hasClass(caretClass1)){
			$(caretClass).removeClass(caretClass1);
			$(caretClass).addClass(caretClass2);
		}
		else{
			$(caretClass).removeClass(caretClass2);
			$(caretClass).addClass(caretClass1);
		}
		
		
	});
	}


function checkboxToRadio(){
    $("input:checkbox").on('click', function() {
  // in the handler, 'this' refers to the box clicked on

  var $box = $(this);
  if ($box.is(":checked")) {
    // the name of the box is retrieved using the .attr() method
    // as it is assumed and expected to be immutable
    var group = "input:checkbox";
    // the checked state of the group/box on the other hand will change
    // and the current value is retrieved using .prop() method
    $(group).prop("checked", false);
    $box.prop("checked", true);
  } else {
    $box.prop("checked", false);
  }
});
}


function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

function moveScroller(anchor, main) {
    var move = function() {
        if ($(anchor).length < 1){
            $(window).unbind();
            return;
        }
        var st = $(window).scrollTop();
        var ot = $(anchor).offset().top;
        var s = $(main);
        if(st > ot) {
            s.css({
                position: "fixed",
                top: "0px",
                right: "58px"
            });
        } else {
            if(st <= ot) {
                s.css({
                    position: "absolute",
                    top: "",
                    right: "100px"
                });
            }
        }
    };
    $(window).scroll(move);
    move();
}

function scrollTo(anchor){
    $(document.body).animate({
        'scrollTop':   $(anchor).offset().top
    }, 500);    
}

function getAllowChangePage(){
    if ($('.myexercises-new-name').val() || $('.myexercises-new-muscle').val() || $('.myexercises-new-type').val() || $('.myworkouts-new-name').val() || $('.myprograms-new-name').val() || $('.myprograms-new-duration').val() || $('.new-workout.myexercises-list tr').length > 0){
        var returnResult = false;
        $('#confirmModal').modal();
        $('.stay-on-page').click(function(){returnResult = false;});
        $('.accept-move').click(function(){returnResult = true;});
        $('#confirmModal').on('hidden.bs.modal', function () {
            $('#confirmModal').unbind();
            return returnResult;
        });       
    }
    return true;
}


function setupRoutes(){
    var currentLocation = window.location.hash.substr(1).split("/")[0];
    
    if (currentLocation === "mydiary"){
        load('mydiary',myDiary_Load, {'date':moment()});
    }
    else if (currentLocation === "myexercises"){
        load('myexercises',myExercises_Load);
    }
    else if (currentLocation === "myworkouts"){
        load('myworkouts',myWorkouts_Load);
    }
    else if (currentLocation === "myprograms"){
        load('myprograms',myPrograms_Load);
    }
    else if (currentLocation === "mystats"){
        load('mystats',myStats_Load);
    }
    else if (currentLocation === "search"){

        load('search',searchPage_Load);

    }    
    else if (currentLocation === "help"){
        load('help',helpPage_Load);
    }
    
    else if (currentLocation === "terms"){
        load('terms',termsPage_Load);
    }
    else if (currentLocation === "privacy"){
        load('privacy',privacyPage_Load);
    }
    else if (currentLocation === "contact"){
        load('contact',contactPage_Load);
    }
    else if (currentLocation === "api"){
        load('api',apiPage_Load);
    }
    else if (currentLocation === "profile"){
        load('profile',myProfile_Load);
    }
    else if (currentLocation === "viewprofile"){
        var userid = window.location.hash.substr(1).split("/")[1];
        if (userid === undefined || isNaN(userid) || !isFinite(userid)){
            load('mydiary',myDiary_Load, {'date':moment()});
        }
        else{
            load('viewprofile',profilePage_Load, {'id':window.location.hash.substr(1).split("/")[1]});
        }
    }
    else if (currentLocation === "viewdiary"){
        var userid = window.location.hash.substr(1).split("/")[1];
        if (userid === undefined || isNaN(userid) || !isFinite(userid)){
            load('mydiary',myDiary_Load, {'date':moment()});
        }
        else{
            load('viewdiary',diaryPage_Load, {'id':window.location.hash.substr(1).split("/")[1],'date': moment()});
        }
    }    
    
    else if (currentLocation === "settings"){
        load('settings',mySettings_Load);
    }
    else {
        load('mydiary', myDiary_Load, {'date':moment()});
    }
    
    $(window).on('hashchange', function(e) {
        if (window.location.hash.substr(1).split("/")[0] !== $('.current-page').html().split("/")[0]){

            location.reload();
        }
    });
}
/*END GENERAL HELPER FUNCTIONS */