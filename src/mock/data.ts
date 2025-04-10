import Mock from 'mockjs'
const Random = Mock.Random

//纵览数据
export const overview = Mock.mock({
  "code": 200,
  "data": {
    "file": Random.float(60, 100, 2, 2) + 'M',
    "article|0-50": 0,
    "gallery|0-50": 0,
    "diary|0-50": 0,
  }
})

//访问量
export const visit = Mock.mock({
  "data|30": [
    {
      //时间
      "date": "@datetime('MM-dd')",
      "count|10-100": 12,
    }
  ]
})

//数据监测
export const survey = Mock.mock({
  "data": {
    "device": [
      {
        "key": 'mobile',
        "name": '移动端',
        "value|30-120": 50,
      },
      {
        "key": 'pc',
        "name": '电脑端',
        "value|30-120": 40,
      }
    ],
    "website": [
      {
        "key": 'home',
        "name": '首页',
        "value|30-120": 50,
      },
      {
        "key": 'project',
        "name": '项目',
        "value|30-120": 40,
      }, {
        "key": 'diary',
        "name": '日记',
        "value|30-120": 40,
      }, {
        "key": 'photo',
        "name": '摄影',
        "value|30-120": 40,
      }
    ]
  }
})

//评论
export const comment = Mock.mock({
  "data": {
    "count": 123,
    "list|123": [{
      "id|+1": 0,
      "article": {
        "id|+1": 2,
        "title": "@ctitle(3,12)",
      },
      "user": {
        "id|+1": 3,
        "name": "@ctitle(3,12)",
        "imgurl": "https://bucket.redeyes.top/avater.webp",
      },
      "comment": "@cparagraph(1, 4)",
      "moment": "@datetime()",
      "complaint|0-12": 0,
    }]
  }
})

//文章状态
export const state = Mock.mock({
  "data": [
    {
      "id": 0,
      "name": "已发布",
      "value|0-30": 4,
    }, {
      "id": 1,
      "name": "未发布",
      "value|0-30": 4,
    }
  ]
})


//分组
export const subset = Mock.mock({
  "data": {
    "count": 123,
    "list|4": [{
      "id|+1": 0,
      "name": "@ctitle(2,5)",
      "value|0-30": 4,
      "moment": "@datetime()",
    }]
  }
})


//标签
export const mklabel = Mock.mock({
  "data": {
    "count": 123,
    "list|12": [{
      "id|+1": 0,
      "name": "@ctitle(2,5)",
      "moment": "@datetime()",
    }]
  }
})

//图片合集
const photos = [
  "a.jpg",
  "b.jpg",
  "c.jpg",
  "d.jpg",
  "e.jpg",
  "f.jpg",
  "g.jpg",
  "h.jpg",
  "i.jpg",
  "j.jpg",
  "k.jpg",
  "l.jpg",
  "m.jpg",
  "n.jpg",
  "o.jpg",
  "p.jpg",
  "q.jpg",
];

const photoarr = [
  ["a.jpg"],
  ["b.jpg", "c.jpg"],
  ["d.jpg", "e.jpg", "f.jpg"],
  ["g.jpg", "h.jpg", "i.jpg"],
  ["j.jpg", "k.jpg", "l.jpg"],
]

//文件数据 
export const mkfile = Mock.mock({
  "count": 64,
  "list|64": [
    {
      "id|+1": 0,
      "url|1": photos,
      "fileName": "@ctitle(2, 12)",
      "format": "jpeg",
      "subsetId|0-4": 3,
    }
  ]
})


//文章数据
export const mkarticle = Mock.mock({
  "count": 64,
  "list|64": [
    {
      "id|+1": 0,
      "cover|1": photos,
      "title": "@ctitle(4, 12)",
      "moment": "@datetime()",
      "label|0-3": ["@ctitle(2, 4)"],
      "introduce": "@cparagraph(1, 4)",
      "views|12-429": 122,
      "comment|8-24": 12,
      "praise|8-123": 42,
      "subsetId|0-4": 0,
      "state|0-1": 0,
    }
  ]
})


//图库数据
export const mkgallery = Mock.mock({
  "count": 64,
  "list|64": [
    {
      "id|+1": 0,
      "cover|1": photos,
      "title": "@ctitle(4, 12)",
      "moment": "@datetime()",
      "label|0-3": ["@ctitle(2, 4)"],
      "introduce": "@cparagraph(1, 4)",
      "views|12-429": 122,
      "comment|8-24": 12,
      "praise|8-123": 42,
      "subsetId|0-4": 0,
      "content|1": photoarr,
    }
  ]
})

//日记数据
export const mkdiary = Mock.mock({
  "count": 64,
  "list|64": [
    {
      "id|+1": 0,
      "title": "@ctitle(4, 12)",
      "moment": "@datetime()",
      "weatherId|0-7": 0,
      "content": "@cparagraph(2, 10)",
      "picture|1": photoarr,
    }
  ]
})

//图片列表
export const mphotos = Mock.mock({
  "data|6": [
    {
      "id|+1": 0,
      "url|1": photos,
    }
  ]
})
