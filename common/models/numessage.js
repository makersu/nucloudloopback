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
        returns: {arg: 'numessages', type: 'object'}
      }
  );


  Numessage.findBy = function(data, cb) {
  	console.log(data.acn)
  	console.log(data.email)

  	var whereSiteId={
			"fields":"site_id", 
			"where": { "or" : [
					{"use_acn": {"inq": ["mark"]}},
					{"share": {"inq": ["mark"]}}
				]
			}
		}


		var Nusite=Numessage.app.models.Nusite

		//console.log(Nusite)
  	Nusite.find(whereSiteId,function(err,nusites){
  		var siteIds=[]
  		nusites.forEach(function(nusite) {
    		//console.log(nusite);
    		siteIds.push(nusite.site_id)
			});
			console.log(siteIds)

			var whereKey =
				{ "where": { "key": {"inq": siteIds }}}

			Numessage.find(whereKey,function(err,numessages){
				console.log(numessages.length)
				cb(err,numessages)
			});

  	});
      
    }
     
    Numessage.remoteMethod(
        'findBy', 
        {
          accepts: {arg: 'data', type: 'object'},
          returns: {arg: 'numessages', type: 'object'}
        }
    );


};
