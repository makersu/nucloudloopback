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
  	console.log(JSON.stringify(data));

  	var whereSiteId={
			"fields":"site_id", 
			"where": { "or" : [
					{"use_acn": {"inq": [data.acn]}},
					{"share": {"inq": [data.email]}},
					{"manager":data.acn},
					{"manager":data.email},
					{"owner":data.acn},
					{"owner":data.email}
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
			siteIds.push(data.acn)
			siteIds.push(data.email)
			console.log(siteIds)

			var conditionKey =
				{"key": {"inq": siteIds } }


			var filter = {}	
			filter.where = data.where
			filter.where.and.push(conditionKey)

			if(data.order){
				filter.order = data.order
			}
			
			if(data.skip>=0){
				filter.skip = data.skip
			}
			
			if(data.limit){
				filter.limit = data.limit
			}
			
			console.log(JSON.stringify(filter));

			Numessage.find(filter,function(err,numessages){
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


    Numessage.urlStartsWith = function(data, cb) {
    	console.log(data.url)
    	var urlQueryString=data.url
    	urlQueryString=urlQueryString.replace(/\?/g, '\\\?');

    	urlQueryString = '^'+urlQueryString;

   		var whereurl={ "url": { "like": urlQueryString } } 

			console.log(whereurl)

			Numessage.destroyAll( whereurl,function(err,numessages){
				
				cb(err,numessages)

			});

    }
     
    Numessage.remoteMethod(
        'urlStartsWith', 
        {
          accepts: {arg: 'data', type: 'object'},
          returns: {arg: 'numessages', type: 'string'},
          http: { verb: 'del'}
        }
    );


};
