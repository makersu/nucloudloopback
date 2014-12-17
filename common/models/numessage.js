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

/*
    Numessage.greet = function(data, cb) {
    	console.log(new RegExp(data.url))

    	//var whereUrl={ "url": data.url }



    	//var whereUrl={ "url": { "like": "http://ookon_test001.nuweb.cc/Site/wheeg7/Forum/forum_view.php?mode=far&path=GROUP_NEWS/&f=2014113&i=1" } }

			//var whereUrlDir = {}

			//var wherefind = {"where": whereUrl}


			var whereurl={ "where": { "url": { "like": "http://ookon_test001.nuweb.cc" } } }
			var wherekey={ "where": { "key":{"like":"whee"} } }
			var where=whereurl
			//where['limit']=1
			where.skip=1

			console.log(where)

			//var where={ "where": { "url":{"like":"http:"} } }

			Numessage.find( where,function(err,numessages){
				
				cb(err,numessages)

			});

    }
     
    Numessage.remoteMethod(
        'greet', 
        {
          accepts: {arg: 'data', type: 'object'},
          returns: {arg: 'numessages', type: 'string'}
        }
    );
*/

};
