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
  };
  Numessage.remoteMethod(
      'updateInsert', 
      {
        accepts: {arg: 'data', type: 'object'},
        returns: {arg: 'numessages', type: 'object'}
      }
  );

  //remotemethod for findBy
  Numessage.findBy = function(data, cb) {
  	console.log(JSON.stringify(data));

  	var conditionSiteId={
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
  	Nusite.find(conditionSiteId,function(err,nusites){
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

			var condMain={}
			condMain.or=[]
			condMain.or.push(conditionKey)

			if(data.subscribe){
				var condSubscribe = {}
				condSubscribe.and=[]
				condSubscribe.and.push({"site_id":{"inq":data.subscribe}})
				condSubscribe.and.push({"fun": "Public"})
				condMain.or.push(condSubscribe)
			}

			var filter = {}
			filter.where = data.where
			filter.where.and.push(condMain)

			//condition for searchtext 
			if( data.searchtext ){
				//console.log(data.searchtext);
				var searcharray = data.searchtext.replace(/[.,?!;()"'+-]/g, " ").replace(/\s+/g, " ").split(" ");//?'+'
				console.log('searcharray='+searcharray)
				var orCondition = {"or":[]}
				for(var i=0;i<searcharray.length;i++){
					var insideOrCondition={"or":[]}
					insideOrCondition.or.push({"owner": searcharray[i] })
					insideOrCondition.or.push({"tag": {"inq": [searcharray[i]] }})
					insideOrCondition.or.push({"filename":{"like": searcharray[i] } })
					insideOrCondition.or.push({"title":{"like":searcharray[i] } })
					insideOrCondition.or.push({"description":{ "like":searcharray[i] } } )
					console.log(insideOrCondition)
					orCondition.or.push(insideOrCondition)
				}
				//console.log(orCondition)
				filter.where.and.push(orCondition)
			}

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

			var moment = require('moment')
			var start=moment()
			Numessage.find(filter,function(err,numessages){
				var end=moment()
				console.log("moment end.diff(start)="+end.diff(start))
				console.log('numessages.length='+numessages.length)
				cb(err,numessages)
			});

  	});
      
    };    
    Numessage.remoteMethod(
        'findBy', 
        {
          accepts: {arg: 'data', type: 'object'},
          returns: {arg: 'numessages', type: 'object'}
        }
    );

    //remotemethod for findGroupBy
		Numessage.findGroupBy = function(data, cb) {
			console.log(JSON.stringify(data));

			if(data.where.and){
				//convert upload_time string to date
				for(var i=0 ;i<data.where.and.length;i++ ){
					if(data.where.and[i].upload_time){
						
						if(data.where.and[i].upload_time.gt){
							console.log(data.where.and[i].upload_time.gt);
							data.where.and[i].upload_time.gt=new Date(data.where.and[i].upload_time.gt)
							//console.log(typeof data.where.and[i].upload_time.gt);
						}
						if(data.where.and[i].upload_time.lt){
							console.log(data.where.and[i].upload_time.lt);
							data.where.and[i].upload_time.lt=new Date(data.where.and[i].upload_time.lt)
							//console.log(typeof data.where.and[i].upload_time.lt);	
						}
					}	
				}
			}	  	

			//condition for find by site_id
	  	var conditionSiteId={
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
			};

			//get Nusite model
			var Nusite=Numessage.app.models.Nusite;

			//find Nusite by site_id
	  	Nusite.find(conditionSiteId,function(err,nusites){
	  		var siteIds=[]
	  		nusites.forEach(function(nusite) {
	    		//console.log(nusite);
	    		siteIds.push(nusite.site_id)
				});
				siteIds.push(data.acn)
				siteIds.push(data.email)
				console.log(siteIds)

				var conditionKey = {"key": {"inq": siteIds } }

				var filter = {}	
				filter.where = data.where
				filter.where.and.push(conditionKey)
				console.log(JSON.stringify(filter.where))
				
				var connector = Numessage.getDataSource().connector;
				var matchWhere = connector.buildWhere(Numessage.modelName,filter.where)
				console.log(JSON.stringify(matchWhere) )

				var groups={}
				groups.owners=[]
				groups.siteids=[]

				var numessageCollection = Numessage.getDataSource().connector.collection(Numessage.modelName);

				//groupby owner by mongodb aggregation
	    	numessageCollection.aggregate([
	    		{$match: matchWhere },
	    		{$group: { _id: "$owner", total: { $sum: 1 } } }
	      ], function(err, groupByRecords) {
	      	if(err){
	      		console.log(err)
	      		cb(err,groupByRecords)
	      	}
	    		console.log("owners="+JSON.stringify(groupByRecords))
	    		groups.owners = groupByRecords

	    		//groupby siteid by mongodb aggregation
		    	numessageCollection.aggregate([
		    		{$match: matchWhere },
		    		{$group: { _id: "$site_id", total: { $sum: 1 } } }
		      ], function(err, groupByRecords) {
		      	if(err){
		      		console.log(err)
		      		cb(err,groupByRecords)
		      	}
		    		console.log("siteids="+JSON.stringify(groupByRecords))
		    		groups.siteids = groupByRecords
		    		cb(err,groups);
		    	});	 

		    	});//end fine  	

			});//endfind Nusite by site_id	

		};
    Numessage.remoteMethod(
        'findGroupBy', 
        {
          accepts: {arg: 'data', type: 'object'},
          returns: {arg: 'groups', type: 'object'}
        }
    );

    //remotemethod for urlStartsWith
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

    };
    Numessage.remoteMethod(
        'urlStartsWith', 
        {
          accepts: {arg: 'data', type: 'object'},
          returns: {arg: 'numessages', type: 'string'},
          http: { verb: 'del'}
        }
    );


};
