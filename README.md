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
Value: { "where": { "key": {"inq": ["nu12427"]}}}
Value: { "where": { "upload_time": {"gt": "2014-12-01T00:00:00.000Z"}}}
Value: { "where": { "key":"wheeg7.ookon_test001,wheechen2@gmail.com"} }
Value: { "where": { "key":{"like":"whee"} } }

Response Body:
[
  {
    "url": "http://ookon_test001.nuweb.cc/Site/wheeg7/Forum/forum_view.php?mode=far&path=GROUP_NEWS/&f=2014113&i=1",
    "view_path": "",
    "mode": "update",
    "upload_time": "2014-12-02T10:04:57.000Z",
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
    "key": [
      "wheeg7.ookon_test001",
      "wheechen2@gmail.com"
    ],
    "images": "",
    "atc": "",
    "tag": null,
    "time": "2014-12-02T10:04:57.000Z",
    "mtime": "2014-12-02T10:04:57.000Z",
    "id": "5486ac92c83d2d5f5aafa8d8"
  }
]
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

#find by acn/email
Request URL:
http://0.0.0.0:3000/api/numessages/findBy
Request Method: 
POST
Parameters:
{ data : {"acn":"mark","email":"yuminsu@gmail.com"} }

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
  "manager": "jason",
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
