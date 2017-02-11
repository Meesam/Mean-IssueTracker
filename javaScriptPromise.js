var Q=require('q');

function CheckValue(a,b) {
	var deffered=Promise.defer();
    if(a >b){
    	var c=a+b;
    	deffered.resolve(c);
    } else{
    	deffered.reject(a-b);
    }
	return deffered.promise;
}

function doSomeStuff(val){
   var deffered=Promise.defer();
   if(val >0){
   	console.log('val are ' + val);
    deffered.resolve(val);
   } else{
   	 console.log('Got some err');
   	 deffered.reject('Fail');
   }
   return deffered.promise;
}



// First way to implement promise without any library
CheckValue(2,1)
.then(function(data){
  console.log(data);
  doSomeStuff(data).then(function(){
  	 console.log('finised');
  })	
})
.catch(function(err){
  console.log('err ' + err);
})

// Second way to implement promise without any library
CheckValue(2,1)
.then(doSomeStuff)
.catch(function(err){
  console.log('err ' + err);
})

//  implement promise with q library   

Q()
.then(CheckValue(10,5))
.then(doSomeStuff)
.fail(function(err){
	console.log('Error is ' + err)
});    