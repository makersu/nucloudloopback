nucloudloopback
===============
#Environment
```
>sudo apt-get update
>sudo apt-get install -y mongodb
>sudo apt-get install nodejs
>sudo apt-get install npm
>npm install -g strongloop
```

#installation & run
```
>git clone https://github.com/makersu/nucloudloopback.git
>cd nucloudloopback
>npm install
>mongod &
>slc run
```

#update
```
>mongo
>>use nucloudloopback
>>db.dropDatabase()
>git pull
>slc run
```

#json
```
#create numessage
Request URL: http://0.0.0.0:3000/api/numessages
Request Method: POST
Parameter: data
Value:
{
  "url": "http://ookon_test001.nuweb.cc/Site/wheeg7/Forum/forum_view.php?mode=far&path=GROUP_NEWS/&f=2014113&i=1",
  "view_path": "",
  "mode": "update",
  "upload_time": "2014-12-02T10:04:57Z",
  "page_name": "forum_view.php?mode=far&path=GROUP_NEWS/&f=2014113&i=1",
  "filename": "",
  "title": "",
  "allow": "ALLOW_ALL,wheeg7.ookon_test001",
  "owner": "wheechen",
  "last_acn": "",
  "dir_type": "",
  "type": "BBS",
  "description": "ggggggguuu",
  "share_code": "n1247F5D401E260B010764WW",
  "share_date": null,
  "share": "",
  "use_acn": "",
  "use_date": "",
  "fun": "use_acn,share",
  "key": ["wheeg7.ookon_test001","wheechen2@gmail.com"],
  "images": "",
  "atc": "",
  "tag": ["marksu","yuminsu@gmail.com","nu12427","wkchiang@cs.ccu.edu.tw","singling@ccu.edu.tw","nu14916"],
  "time":"2014-12-02T10:04:57Z",
  "mtime":"2014-12-02T10:04:57Z"
}
Value:
{
  "url": "http://tw212.nuweb.cc/Site/yy0265-yahoo_com_tw/Driver/dir_TaIzwz/file_I9hlU1.docx",
  "view_path": "aæß™∫∫ÙØ∏@ccu/∫Ù∏Ùµw∫–/∏Í¶w§uß@∞È-103¶®™G∫[104≥¯ßiÆ—/¶®§j_104¶~¥£Æ◊≠pµeÆ—(¶®§j).docx",
  "mode": "del",
  "upload_time": "2014-11-13T11:39:23Z",
  "page_name": "file_I9hlU1.docx",
  "filename": "¶®§j_104¶~¥£Æ◊≠pµeÆ—(¶®§j).docx",
  "title": "¶®§j_104¶~¥£Æ◊≠pµeÆ—(¶®§j).docx",
  "allow": "ALLOW_NONE,yy0265-yahoo_com_tw.tw212",
  "owner": "yy0265-yahoo_com_tw",
  "last_acn": "yy0265-yahoo_com_tw",
  "dir_type": "",
  "type": "Document",
  "description": "description",
  "share_code": "uj2D7E53450E210207341B5E01041D5F4C0F3D041167",
  "share_date": "2014-11-06T15:15:12Z",
  "share": "",
  "use_acn": "",
  "use_date": "",
  "fun": "use_acn",
  "key": ["nu14915","yungru-ccu_edu_tw","nu12427","wkchiang@cs.ccu.edu.tw","singling@ccu.edu.tw","nu14916"],
  "images": "",
  "atc": "",
  "time":"2014-11-06T15:15:12Z",
  "mtime":"2014-11-06T15:15:12Z"
}

#query/search filter
Request URL: 
http://0.0.0.0:3000/api/numessages
Request Method: 
GET
Parameter: 
filter
Value: { "where": { "owner": "yy0265-yahoo_com_tw" } }
Value: { "where": { "owner": {"neq":"yy0265-yahoo_com_tw" } } }
Value: { "where": { "key": {"inq": ["nu12427"]}}}
Value: { "where": { "key": {"nin": ["nu12427"]}}}
Value: { "where": { "upload_time": {"gt": "2014-12-01T00:00:00.000Z"}}}
Value: { "where": { "upload_time": {"lt": "2014-12-01T00:00:00.000Z"}}}
Value: { "where": { "key":{"like":"whee"} } }
Value: { "where": { "key":{"nlike":"whee"} } }
#search by keywork(e.g., wheechen)
{
  "where": {
  	"and": [
    	  { "upload_time": {"gt": "2014-12-01T00:00:00.000Z"}},
    	  { "or": [ {"owner": "wheechen" }, {"tag":"wheechen"}, {"filename":{"like":"wheechen"} }, {"title":{"like":"wheechen"} }, {"description":{"like":"wheechen"} } 
    	    ] 
    	  }
	]
  }
}	

##pagination
{ "where": { "or": [{ "key": {"inq": ["wheeg7.ookon_test001"]}}, { "key":{"like":"whee"} }] },
  "order": "upload_time desc",
  "skip":0,
  "limit":50
}

#find numessage by acn/email
Request URL:
http://0.0.0.0:3000/api/numessages/findBy
Parameter: data
Value:
{
	"acn":"jason",
	"email":"jason@gmail.com",
	"searchtext":"wheechen mark",
	"where": {
		"and": [
			{ "owner": "jason"}, 
			{ "upload_time": {"gt": "2014-12-01T00:00:00.000Z"}}
		]
	},
	"order": "upload_time desc",
  	"skip":0,
  	"limit":50
}

{
	"where": {
  	"and": [
    	{ "upload_time": {"gt": "2014-12-01T00:00:00.000Z"}},
    	{ "or": [
	    	{ "or": [ {"owner": "wheechen" }, 
	    						{"tag":"wheechen"},
	    						{"filename":{"like":"wheechen"} },
	    						{"title":{"like":"wheechen"} },
	    						{"description":{"like":"wheechen"} }   
	  						] 
	    	},
	    	{ "or": [ {"owner": "mark" }, 
	    						{"tag":"mark"},
	    						{"filename":{"like":"mark"} },
	    						{"title":{"like":"mark"} },
	    						{"description":{"like":"mark"} }   
	  						] 
	    	}
	    ]}	
		]
	}
}

//
{
	"where": {
  	"and": [
    	{ "upload_time": {"gt": "2014-12-01T00:00:00.000Z"}},

	    	{ "or": [ {"owner": "wheechen" }, 
	    						{"tag":"wheechen"},
	    						{"filename":{"like":"wheechen"} },
	    						{"title":{"like":"wheechen"} },
	    						{"description":{"like":"wheechen"} }   
	  						] 
	    	},
	    	{ "or": [ {"owner": "mark" }, 
	    						{"tag":"mark"},
	    						{"filename":{"like":"mark"} },
	    						{"title":{"like":"mark"} },
	    						{"description":{"like":"mark"} }   
	  						] 
	    	}
	    
		]
	}
}

#update or insert numessage
Request URL:
http://0.0.0.0:3000/api/numessages/updateInsert
Request Method: 
POST
Parameters:
{ data: {
  "url": "http://tw212.nuweb.cc/Site/yy0265-yahoo_com_tw/Driver/dir_TaIzwz/file_I9hlU1.docx",
  "view_path": "aæß™∫∫ÙØ∏@ccu/∫Ù∏Ùµw∫–/∏Í¶w§uß@∞È-103¶®™G∫[104≥¯ßiÆ—/¶®§j_104¶~¥£Æ◊≠pµeÆ—(¶®§j).docx",
  "mode": "del",
  "upload_time": "2014-11-13T11:39:23Z",
  "page_name": "file_I9hlU1.docx",
  "filename": "¶®§j_104¶~¥£Æ◊≠pµeÆ—(¶®§j).docx",
  "title": "¶®§j_104¶~¥£Æ◊≠pµeÆ—(¶®§j).docx",
  "allow": "ALLOW_NONE,yy0265-yahoo_com_tw.tw212",
  "owner": "yy0265-yahoo_com_tw",
  "last_acn": "yy0265-yahoo_com_tw",
  "dir_type": "",
  "type": "Document",
  "description": "description",
  "share_code": "uj2D7E53450E210207341B5E01041D5F4C0F3D041167",
  "share_date": "2014-11-06T15:15:12Z",
  "share": "",
  "use_acn": "",
  "use_date": "",
  "fun": "use_acn",
  "key": ["nu14915","yungru-ccu_edu_tw","nu12427","wkchiang@cs.ccu.edu.tw","singling@ccu.edu.tw","nu14916"],
  "images": "",
  "atc": "",
  "time":"2014-11-06T15:15:12Z",
  "mtime":"2014-11-06T15:15:12Z"
  } 
}

#delete all numessages which url start with 
Request URL:
http://10.0.0.104:3000/api/numessages/urlStartsWith
Request Method: 
DEL
Parameters:
{ data: {
		{"url":"http://mmookon_test001.nuweb.cc/"}	
	}
}


```

#nucomment
```
#create nucomment
Request URL:
http://0.0.0.0:3000/api/numessages/5486ac92c83d2d5f5aafa8d8/nucomments
Request Method:
POST
Parameter: data
Value:
{
  "url": "http://ookon_test001.nuweb.cc/Site/wheeg7/Forum/forum_view.php?mode=far&path=GROUP_NEWS/&f=2014113&i=1",
  "uid": "wheechen",
  "upload_time": "2014-12-02T10:04:57Z",
  "time":"2014-12-02T10:04:57Z",
  "owner": "wheechen",
  "content": "ggggggguuu",
  "atc": ""
}

#get uncomment
Request URL:
http://0.0.0.0:3000/api/numessages/5486ac92c83d2d5f5aafa8d8/nucomments
Response Body:
[
  {
    "url": "http://ookon_test001.nuweb.cc/Site/wheeg7/Forum/forum_view.php?mode=far&path=GROUP_NEWS/&f=2014113&i=1",
    "uid": "wheechen",
    "upload_time": "2014-12-02T10:04:57.000Z",
    "time": "2014-12-02T10:04:57.000Z",
    "owner": "wheechen",
    "content": "ggggggguuu",
    "atc": "",
    "id": "5486aca9c83d2d5f5aafa8d9",
    "numessageId": "5486ac92c83d2d5f5aafa8d8"
  }
]
```
#nusite
```
#create
Request URL:
http://0.0.0.0:3000/api/nusites
Request Method:
POST
Parameter: data
Value:
{
  "site_id": "jason_group1.ookon_test001",
  "public": false,
  "use_acn": [
    "jason",
    "nu_12385"
  ],
  "share": [
    ""
  ],
  "site_acn": "jason_group1",
  "cs_acn": "ookon_test001",
  "name": "jason_group1",
  "owner": "jason",
  "owner_info": "1:jason:jason.monkia@gmail.com:Jason",
  "manager": ["jason"],
  "time": "2014-05-11T23:58:00.000Z",
  "status": "A",
  "type": "1"
}

#get
Request URL
http://0.0.0.0:3000/api/nusites
Response Body
[
  {
    "site_id": "jason_group1.ookon_test001",
    "public": true,
    "use_acn": [
      "jason",
      "mmmm"
    ],
    "share": [
      ""
    ],
    "site_acn": "jason_group1",
    "cs_acn": "ookon_test001",
    "name": "jason_group1",
    "owner": "jason",
    "owner_info": "1:jason:jason.monkia@gmail.com:Jason",
    "manager": ["jason"],
    "time": "2014-05-11T23:58:00.000Z",
    "status": "A",
    "type": "1",
    "id": "5489146e5aaa8a08091bdce8"
  }
]

#get filter
Request URL:
http://0.0.0.0:3000/api/nusites
filter:
{
	"fields":"site_id", 
	"where": { "or" : [
			{"use_acn": {"inq": ["mark"]}},
			{"share": {"inq": ["mark"]}}
		]
	}
}
```

#mongo
```
export LC_ALL=C

rs.initiate(null)
rs.add("192.168.4.41:27017")
rs.add("192.168.4.42:27017")
rs.add("192.168.4.43:27017")
rs.addArb("192.168.4.93:27017")

rs.slaveOk()
```

#deploy
```
#build

#process manager(slc pm -l 7777)
$ sudo slc pm-install --port 7777
$ sudo start strong-pm
$ tail -f /var/log/upstart/strong-pm.log

#deploy
$ slc deploy http://localhost:7777

#slc arc

```
