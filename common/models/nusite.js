module.exports = function(Nusite) {
	Nusite.validatesUniquenessOf('site_id');

	Nusite.updateInsert = function(data, cb) {

		console.log('site_id='+data.site_id)

		Nusite.findOne(
			{
				where: {
					site_id: data.site_id
				} 
			}, 
			function(err,nusiteInstance) { 
				//console.log(err)
				//console.log(siteInstance)
				if(nusiteInstance && nusiteInstance.id){
					console.log("existed="+nusiteInstance.id);
					data.id=nusiteInstance.id
					Nusite.updateAll({_id:nusiteInstance.id}, data, function(err,obj){
						if(err){
							console.log(err)
						}
						console.log(obj)
						cb(err, obj);
					});
				}
				else{
					Nusite.create(data, function(err,obj){
						if(err){
							console.log(err)	
						}
						console.log(obj)
						cb(err, obj);
					});
				}

				// Nusite.upsert(data, function(err,obj){
				// 		//console.log(err)
				// 		//console.log(obj)
				// 		cb(err, obj);
				// });
			
			}
		);
  }
     
  Nusite.remoteMethod(
      'updateInsert', 
      {
        accepts: {arg: 'data', type: 'object'},
        returns: {arg: 'nusite', type: 'object'}
      }
  );

};
