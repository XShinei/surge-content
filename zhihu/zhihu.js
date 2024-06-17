if (!$response.body) $done({});

const url = $request.url;
const obj = JSON.parse($response.body);

if (url.includes('topstory/recommend')) {
  obj.data = obj.data.filter(x => !x.adjson);
}
else if (url.includes('root/tab')) {
  if('tab_list' in obj){
    obj.tab_list = obj.tab_list.filter(x => x.tab_type !== 'activity');
  }
  
  if ('top_activity' in obj) {
    delete obj.top_activity;
  }
}
else if (url.includes('next-render')) {
  if(Array.isArray(obj.data)){
    obj.data = obj.data.filter(x => x.type !== 'ad');
  }
}

$done({ body: JSON.stringify(obj) });