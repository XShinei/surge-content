if (!$response.body) $done({});

const url = $request.url;
let obj = JSON.parse($response.body);

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
else if (url.includes('people/self')) {
  processPeopleSelf();
}
else if (url.includes('api/v4/videos')) {
  obj = {};
}

const processPeopleSelf = () => {
  try {
    if (
      obj &&
      obj["id"] &&
      obj.hasOwnProperty("vip_info") &&
      obj["vip_info"].hasOwnProperty("is_vip")
    ) {
      if (obj["vip_info"]["is_vip"] === false) {
        obj["vip_info"]["is_vip"] = true;
        obj["vip_info"]["vip_type"] = 2;
        obj["vip_info"]["vip_icon"] = {
          url: "https://picx.zhimg.com/v2-aa8a1823abfc46f14136f01d55224925.jpg?source=88ceefae",
          night_mode_url:
            "https://picx.zhimg.com/v2-aa8a1823abfc46f14136f01d55224925.jpg?source=88ceefae",
        };
        obj["vip_info"]["vip_icon_v2"] = {
          url: "https://picx.zhimg.com/v2-aa8a1823abfc46f14136f01d55224925.jpg?source=88ceefae",
          night_mode_url:
            "https://picx.zhimg.com/v2-aa8a1823abfc46f14136f01d55224925.jpg?source=88ceefae",
        };
        obj["vip_info"]["entrance"] = {
          icon: {
            url: "https://pic3.zhimg.com/v2-5b7012c8c22fd520f5677305e1e551bf.png",
            night_mode_url:
              "https://pic4.zhimg.com/v2-e51e3252d7a2cb016a70879defd5da0b.png",
          },
          title: "盐选会员 为你严选好内容",
          expires_day: "2099-12-31",
          sub_title: null,
          button_text: "首月 9 元",
          jump_url: "zhihu://vip/purchase",
          button_jump_url: "zhihu://vip/purchase",
          sub_title_new: null,
          identity: "super_svip",
        };
        obj["vip_info"]["entrance_new"] = {
          left_button: {
            title: "精选会员内容",
            description: "为您严选好内容",
            jump_url: "zhihu://market/home",
          },
          right_button: {
            title: "开通盐选会员",
            description: "畅享 10w+ 场优质内容等特权",
            jump_url: "zhihu://vip/purchase",
          },
        };
        obj["vip_info"]["entrance_v2"] = {
          title: "我的超级盐选会员",
          sub_title: "畅享 5000W+ 优质内容",
          jump_url: "zhihu://market/home",
          button_text: "查看会员",
          sub_title_color: "#F8E2C4",
          sub_title_list: ["畅享 5000W+ 优质内容"],
          card_jump_url: "zhihu://market/home",
        };
      }
    }

    console.log('info people/self: ');
    console.log(obj);
  } catch (err) {
    console.log('error people/self: ');
    console.log(err);
  }
};

console.log('debug: ');
console.log(url);
console.log(obj);
console.log(url.includes('api/v4/videos'));

$done({ body: JSON.stringify(obj) });