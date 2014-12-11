module.exports = function(Numessage) {

	Numessage.validatesUniquenessOf('url');

	Numessage.updateInsert = function(data, cb) {

		console.log('url='+data.url)

		Numessage.findOne(
			{
				where: {
					url: data.url
				} 
			}, 
			function(err,numessageInstance) { 

				if(numessageInstance && numessageInstance.id){
					console.log("existed="+numessageInstance.id);
					data.id=numessageInstance.id
				}

				Numessage.upsert(data, function(err,obj){
						//console.log(err)
						//console.log(obj)
						cb(err, obj);
				});
			
			}
		);
  }
     
  Numessage.remoteMethod(
      'updateInsert', 
      {
        accepts: {arg: 'data', type: 'object'},
        returns: {arg: 'numessage', type: 'object'}
      }
  );

};
