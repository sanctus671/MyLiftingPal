/*! myliftingpal v1.0.1 | (c) 2014 Taylor Hamling | taylorhamling.com */

function mlp(key){
   var self = {};
   self.key = key;
   self.url = 'http://www.myliftingpal.net/api/index.php';
   self.result = [];
   self.session = '';
		if (self.session === '' && $.cookie("mlpsession") !== undefined){
			self.session = $.cookie("mlpsession");
		} 
    
   function loginCb(data){
       self.result = $.parseJSON(data);
       if (self.result["success"] === true){
	   self.session = self.result["data"]["sessionid"];
	   $.cookie("mlpsession", self.session, {expires: 30});
	   }
       return self;
   }    
    
   function cb(data){
       self.result = $.parseJSON(data);
       return self;
   }
   
    self.call = function(controller, action, parameters, callback){
        var initialParameters = {key:self.key, session: self.session, controller : controller, action:action};
        var allParamters = $.extend(initialParameters, parameters);
        $.ajax({
            type: 'post',
            url: self.url,
            async: false,
            data: allParamters,
            success: callback,
			error:  function( jqXHR, textStatus, errorThrown ){console.log(errorThrown)}
      });         
    };
   
   
   self.login = function(username, password){
        self.call('authentication','login', {username:username, password: password}, loginCb); 
		return self;		
   };

   self.logout = function(){
		
        self.call('authentication','logout', {}, cb); 
		self.session = ''
		$.removeCookie("mlpsession");	
		return self;		
   };  
    
   self.createUser = function(email,username,password){
       self.call('create','createuser', {email:email, username:username, password: password}, cb);
	   return self;
   };
   
  
   
   self.createexercise = function(name,musclegroup,type){
       self.call('create','createexercise', {name:name,musclegroup:musclegroup,type:type}, cb);
	   return self;
   };
       
   self.addstats = function(exerciseid, onerm){
       self.call('create','addstats', {exerciseid:exerciseid, onerm:onerm}, cb);
	   return self;
   };
   
   self.createworkout = function(name){
       self.call('create','createworkout', {name:name}, cb);
	   return self;
   };
   
   self.addexercise = function(exerciseid, workoutid,ordering, reps, sets, rpe, weight, percentage){
       self.call('create','addexercise', {exerciseid:exerciseid, workoutid:workoutid, ordering:ordering, reps:reps, sets:sets, rpe:rpe, weight:weight, percentage:percentage}, cb);
	   return self;
   };
   
   self.createprogram = function(name, duration){
       self.call('create','createprogram', {name:name, duration:duration}, cb);
	   return self;
   };
   
   self.addworkout = function(workoutid, programid, ordering, day){
       self.call('create','addworkout', {workoutid:workoutid, programid:programid, ordering:ordering, day:day}, cb);
	   return self;
   };
   
   self.addResults = function(data){
       //exerciseid, workoutid, programid, reps, sets, rpe, weight, percentage
       self.call('create','addresults', data, cb);
	   return self;
   };
   
   self.deleteuser = function(id){
       self.call('edit','deleteuser', {id:id}, cb);
	   return self;
   };
   
   self.deletexercise = function(id){
       self.call('edit','deleteexercise', {id:id}, cb);
	   return self;
   };
   
   self.removestats = function(id){
       self.call('edit','removestats', {id:id}, cb);
	   return self;
   };
   
   self.deleteworkout = function(id){
       self.call('edit','deleteworkout', {id:id}, cb);
	   return self;
   };
   
   self.removeexercise = function(id){
       self.call('edit','removeexercise', {id:id}, cb);
	   return self;
   };
   
   self.deleteprogram = function(id){
       self.call('edit','deleteprogram', {id:id}, cb);
	   return self;
   };
   
   self.removeworkout = function(id){
       self.call('edit','removeworkout', {id:id}, cb);
	   return self;
   };
   
   self.removeResults = function(data){
       //id
       self.call('edit','removeresults', data, cb);
	   return self;
   };
   
   self.updateuser = function(id,email,username,password){
       self.call('edit','updateuser', {id:id,email:email,username:username,password:password}, cb);
	   return self;
   };
   
   self.updateexercise = function(id, name,musclegroup,type){
       self.call('edit','updateexercise', {id:id, name:name,musclegroup:musclegroup,type:type}, cb);
	   return self;
   };
   
   self.changestats = function(id, exerciseid, onerm){
       self.call('edit','changestats', {id:id, exerciseid:exerciseid, onerm:onerm}, cb);
	   return self;
   };
   
   self.updateworkout = function(id, name){
       self.call('edit','updateworkout', {id:id, name:name}, cb);
	   return self;
   };
   
   self.changeexercise = function(id, exerciseid, workoutid, ordering, reps, sets, rpe,weight,percentage){
       self.call('edit','changeexercise', {id:id, exerciseid:exerciseid, workoutid:workoutid, ordering:ordering, reps:reps, sets:sets, rpe:rpe, weight:weight, percentage:percentage}, cb);
	   return self;
   };
   
   self.updateprogram = function(id, name, duration){
       self.call('edit','updateprogram', {id:id, name:name, duration:duration}, cb);
	   return self;
   };
   
   self.changeworkout = function(id, workoutid, programid, ordering, day){
       self.call('edit','changeworkout', {id:id, workoutid:workoutid, programid:programid, ordering:ordering, day:day}, cb);
	   return self;
   };
   
   self.changeResults = function(data){
       //id, exerciseid, workoutid, programid, reps, sets, rpe, weight, percentage
       self.call('edit','changeresults', data, cb);
           return self;
    };
   
   self.getUsers = function(data){
       //id, email, username
       self.call('view','getusers', data, cb);
	   return self;
   };

   self.getUser = function(){ 
       self.call('view','getuser', {sessionid:self.session}, cb);
	   return self;
   }; 
   
   self.getExercises = function(data){
       //id, name,musclegroup,type,userid
       self.call('view','getexercises', data, cb);
	   return self;
   };
   
   self.selectstats = function(id, exerciseid){
       self.call('view','selectstats', {id:id, exerciseid:exerciseid}, cb);
	   return self;
   };
   
   self.getworkouts = function(id, name,userid){
       self.call('view','getworkouts', {id:id, name:name,userid:userid}, cb);
	   return self;
   };
   
   self.selectExercises = function(id, workoutid){
       self.call('view','selectexercises', {id:id, workoutid:workoutid}, cb);
	   return self;
   };
   
   self.getprograms = function(id, name, userid){
       self.call('view','getprograms', {id:id, name:name,userid:userid}, cb);
	   return self;
   };
   
   self.selectworkouts = function(id, programid){
       self.call('view','selectworkouts', {id:id, programid:programid}, cb);
	   return self;
   };
   
   self.selectResults = function(data){
       //id,exerciseid,workoutid,programid,userid,reps,sets,rpe,weight,percent,assigneddate
       self.call('view','selectresults', data, cb);
	   return self;
   };
   

   return self;
}


