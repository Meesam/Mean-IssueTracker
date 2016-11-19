(function () {
	'use strict';

exports.globalObject=function(curObject) {
	let globalObject={};
	if(curObject==null){
         return null;
	}
	else{
		let globalObject={
			Status:curObject.status,
			Count:curObject.count,
			objdata:curObject.data,
			token:curObject.tokenvalue
		};
		return globalObject;
	}
};
})();