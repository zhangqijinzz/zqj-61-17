import type { TreeHolePost } from "../types"

export const treeHolePosts: TreeHolePost[] = [
  {
    id: "post-1",
    authorCharacter: "knight",
    authorNickname: "铁甲老爸",
    content: "今天女儿第一次来月经了，我一个人手忙脚乱地去便利店买卫生巾。站在货架前看了十分钟不知道选哪个，最后问了收银台的小姐姐才买到。回来路上差点哭出来——她妈妈不在，这些事只能我一个人扛。但看到女儿害怕的样子，我知道我必须坚强。各位单亲爸爸，一定要提前做好准备啊！",
    tags: ["初潮", "求帮助", "生活技能"],
    replies: [
      {
        id: "reply-1-1",
        authorCharacter: "guardian",
        authorNickname: "守护者阿明",
        content: "兄弟辛苦了！建议你在家备一个'女生应急包'，里面有卫生巾、暖宝宝、备用内裤。我去超市买卫生巾的时候脸也是红的，但为了女儿，脸红算什么！",
        createdAt: "2026-06-12T20:30:00Z"
      },
      {
        id: "reply-1-2",
        authorCharacter: "ranger",
        authorNickname: "独行者老张",
        content: "我经历过一样的事！建议提前看看关于青春期的书，至少了解一下周期、注意事项之类的。别全靠百度，有些信息不靠谱。我买了一本《给女孩的身体书》，父女一起看的。",
        createdAt: "2026-06-12T21:15:00Z"
      }
    ],
    createdAt: "2026-06-12T19:00:00Z",
    likes: 42
  },
  {
    id: "post-2",
    authorCharacter: "guardian",
    authorNickname: "守护者阿明",
    content: "女儿学校有同学被霸凌了，她回来跟我说心里很害怕。我问她有没有人欺负她，她说没有，但我还是担心。有没有爸爸遇到过类似情况？怎么判断孩子在学校安不安全？",
    tags: ["校园霸凌", "求帮助", "安全"],
    replies: [
      {
        id: "reply-2-1",
        authorCharacter: "warrior",
        authorNickname: "勇士小刚",
        content: "注意几个信号：孩子突然不想上学、书包东西经常不见、衣服有不明破损、睡眠变差、成绩突降。如果发现这些，不要直接问'有没有被欺负'，可以先聊'学校今天怎么样'，让她自己说出来。",
        createdAt: "2026-06-13T10:20:00Z"
      },
      {
        id: "reply-2-2",
        authorCharacter: "knight",
        authorNickname: "铁甲老爸",
        content: "跟班主任保持沟通很重要。不用天天问，但至少让老师知道你是关心孩子在校情况的家长。这样如果有问题，老师也会更及时地通知你。",
        createdAt: "2026-06-13T11:05:00Z"
      }
    ],
    createdAt: "2026-06-13T09:30:00Z",
    likes: 35
  },
  {
    id: "post-3",
    authorCharacter: "warrior",
    authorNickname: "勇士小刚",
    content: "昨晚和女儿大吵一架。她要参加同学聚会，我说太晚了不行，她摔门进了房间。我知道我可能管太严了，但一个女孩子晚上出门我真的很担心。怎么在保护和放手之间找平衡啊？",
    tags: ["青春期", "情绪", "沟通"],
    replies: [
      {
        id: "reply-3-1",
        authorCharacter: "ranger",
        authorNickname: "独行者老张",
        content: "我的经验是：不要一刀切禁止，而是谈条件。比如可以参加，但几点之前必须回来、要保持电话畅通、聚会地点要告诉我。给她一定的自主权，同时让她知道你的底线。",
        createdAt: "2026-06-13T22:00:00Z"
      },
      {
        id: "reply-3-2",
        authorCharacter: "guardian",
        authorNickname: "守护者阿明",
        content: "吵架之后最重要的是修复关系。不管谁对谁错，先去敲个门说'爸爸刚才说话太急了，我们重新聊聊好不好'。你先让步不是认输，是成熟。",
        createdAt: "2026-06-13T23:10:00Z"
      },
      {
        id: "reply-3-3",
        authorCharacter: "knight",
        authorNickname: "铁甲老爸",
        content: "可以和女儿一起约定一个'父女协议'，把双方都能接受的规则写下来。让她参与制定规则，比单方面宣布禁令有效得多。",
        createdAt: "2026-06-14T08:30:00Z"
      }
    ],
    createdAt: "2026-06-13T21:00:00Z",
    likes: 28
  },
  {
    id: "post-4",
    authorCharacter: "ranger",
    authorNickname: "独行者老张",
    content: "分享一下：我和女儿约定了每晚散步20分钟。一开始她还不情愿，觉得和爸爸散步很无聊。但坚持了一个月后，她居然主动来叫我'爸，散步去！'散步的时候她会跟我说学校的事、朋友的事、甚至小秘密。这个习惯救了我们的父女关系！",
    tags: ["分享", "沟通", "习惯"],
    replies: [
      {
        id: "reply-4-1",
        authorCharacter: "warrior",
        authorNickname: "勇士小刚",
        content: "这个方法好！我也要试试。不过我女儿现在和我正冷战，不知道她愿不愿意……",
        createdAt: "2026-06-14T14:20:00Z"
      },
      {
        id: "reply-4-2",
        authorCharacter: "ranger",
        authorNickname: "独行者老张",
        content: "刚开始就说'陪爸爸走一圈消消食'，不要说'我们来谈心'。低压力的开始更容易被接受。等她习惯了，自然就会聊开了。",
        createdAt: "2026-06-14T15:00:00Z"
      }
    ],
    createdAt: "2026-06-14T13:00:00Z",
    likes: 56
  },
  {
    id: "post-5",
    authorCharacter: "knight",
    authorNickname: "铁甲老爸",
    content: "今天给女儿扎了人生第一个像样的麻花辫！虽然有点歪，但她照镜子的时候笑了，说'爸爸扎的比我自己扎的好看'。那一刻觉得，之前看视频练了一个星期都值了。单亲爸爸们，别觉得扎辫子是小事，对女儿来说这是爸爸用心的证明！",
    tags: ["分享", "生活技能", "扎辫子"],
    replies: [
      {
        id: "reply-5-1",
        authorCharacter: "guardian",
        authorNickname: "守护者阿明",
        content: "恭喜出师！我到现在还只会马尾辫，明天开始练麻花辫！有没有推荐的教程？",
        createdAt: "2026-06-15T09:30:00Z"
      },
      {
        id: "reply-5-2",
        authorCharacter: "warrior",
        authorNickname: "勇士小刚",
        content: "我女儿说她同学都以为她妈妈扎的辫子，她骄傲地说'是我爸扎的！'哈哈，那一刻我感觉自己是全世界最帅的爸爸。",
        createdAt: "2026-06-15T10:15:00Z"
      }
    ],
    createdAt: "2026-06-15T08:00:00Z",
    likes: 73
  },
  {
    id: "post-6",
    authorCharacter: "guardian",
    authorNickname: "守护者阿明",
    content: "女儿最近总是关在房间里，问什么都说'没事'。我知道青春期需要空间，但我好怕和她越来越远。有时候在门外站半天也不知道该不该敲门。有类似经历的吗？你们是怎么处理的？",
    tags: ["青春期", "情绪", "求帮助"],
    replies: [
      {
        id: "reply-6-1",
        authorCharacter: "ranger",
        authorNickname: "独行者老张",
        content: "我女儿也经历过这个阶段。我的做法是：不硬闯她的空间，但保持小的连接。比如在她门口放一盘水果、一张'想你了'的便签。让她知道你一直在，但不会逼迫她。",
        createdAt: "2026-06-15T19:20:00Z"
      },
      {
        id: "reply-6-2",
        authorCharacter: "knight",
        authorNickname: "铁甲老爸",
        content: "还可以试试写纸条或发微信，有时候文字比面对面更容易表达。我女儿好几次都是通过微信才愿意告诉我心里话的。",
        createdAt: "2026-06-15T20:00:00Z"
      }
    ],
    createdAt: "2026-06-15T18:30:00Z",
    likes: 31
  },
  {
    id: "post-7",
    authorCharacter: "warrior",
    authorNickname: "勇士小刚",
    content: "发现女儿手机里和一个男同学聊天很频繁，心里咯噔一下。想问她但怕她觉得我偷窥隐私，不问又担心。各位爸爸们，你们怎么看早恋这个问题？",
    tags: ["早恋", "青春期", "求帮助"],
    replies: [
      {
        id: "reply-7-1",
        authorCharacter: "knight",
        authorNickname: "铁甲老爸",
        content: "首先，千万不要偷看手机！一旦被发现，信任就没了。我建议找个合适的机会自然聊这个话题，比如看了一部青春电影之后聊价值观。重点是引导她思考什么是健康的感情，而不是禁止。",
        createdAt: "2026-06-16T11:00:00Z"
      },
      {
        id: "reply-7-2",
        authorCharacter: "guardian",
        authorNickname: "守护者阿明",
        content: "我的原则是：不禁止、不鼓励、多关注。她愿意告诉你就听着，不要急着评价。如果她的学习和生活没有受影响，就给她空间。但如果出现了问题，再温和地介入。",
        createdAt: "2026-06-16T12:30:00Z"
      },
      {
        id: "reply-7-3",
        authorCharacter: "ranger",
        authorNickname: "独行者老张",
        content: "想想你当年那个年纪，是不是也有心动的人？这是正常的成长经历。我们要做的不是阻止她心动，而是教会她如何面对心动。把担心转化为关心，把禁止转化为引导。",
        createdAt: "2026-06-16T14:00:00Z"
      }
    ],
    createdAt: "2026-06-16T10:00:00Z",
    likes: 44
  },
  {
    id: "post-8",
    authorCharacter: "ranger",
    authorNickname: "独行者老张",
    content: "今天女儿期中考试考了班级第十名，比上次进步了8名！我想起之前她压力大到哭的样子，就帮她定了学习计划，教她番茄工作法，每天散步聊天减压。最关键的是我告诉她'不管考第几名，你都是爸爸最骄傲的女儿'。看到她的笑容，我觉得这半年的努力都值了。",
    tags: ["分享", "学业压力", "成长"],
    replies: [
      {
        id: "reply-8-1",
        authorCharacter: "warrior",
        authorNickname: "勇士小刚",
        content: "番茄工作法？这个我也要试试！我女儿最近也学习效率很低，老是走神。",
        createdAt: "2026-06-16T20:00:00Z"
      }
    ],
    createdAt: "2026-06-16T18:00:00Z",
    likes: 61
  },
  {
    id: "post-9",
    authorCharacter: "knight",
    authorNickname: "铁甲老爸",
    content: "深夜emo时间……女儿今天问我'妈妈为什么不在我身边'，我愣了半天不知道怎么回答。最后只说了句'妈妈有她的原因，但爸爸会一直在'。她点了点头没再追问，但我看到她眼圈红了。做单亲爸爸最难的不是做饭洗衣，而是这些无法替代的角色。有时候真的很无力。",
    tags: ["情绪", "单亲", "深夜"],
    replies: [
      {
        id: "reply-9-1",
        authorCharacter: "guardian",
        authorNickname: "守护者阿明",
        content: "兄弟，你答得已经很好了。没有完美的答案，但你的陪伴就是最好的回答。我女儿也问过类似的问题，我说'我们家虽然只有爸爸，但爸爸给你的爱不会少'。她抱了我好久。",
        createdAt: "2026-06-17T00:30:00Z"
      },
      {
        id: "reply-9-2",
        authorCharacter: "warrior",
        authorNickname: "勇士小刚",
        content: "我们都经历过这样的夜晚。不要一个人扛，这个树洞就是我们的避风港。你做得已经很好了，真的。",
        createdAt: "2026-06-17T01:15:00Z"
      },
      {
        id: "reply-9-3",
        authorCharacter: "ranger",
        authorNickname: "独行者老张",
        content: "我看过一本书说，单亲家庭的孩子不一定会有缺失感，关键在于留下的那个家长是否给足了爱。你的女儿有你，这就是最大的幸运。别太苛责自己。",
        createdAt: "2026-06-17T07:00:00Z"
      }
    ],
    createdAt: "2026-06-16T23:00:00Z",
    likes: 89
  },
  {
    id: "post-10",
    authorCharacter: "guardian",
    authorNickname: "守护者阿明",
    content: "来分享一个实用tips！我在家里冰箱上贴了一张'家庭应急卡'，上面有我的电话、爷爷奶奶的电话、家庭地址、最近医院地址。还和女儿约了一个'家庭暗号'，如果她在电话里用这个暗号，就说明她遇到危险了。虽然希望永远用不上，但有备无患！",
    tags: ["分享", "安全", "生活技能"],
    replies: [
      {
        id: "reply-10-1",
        authorCharacter: "knight",
        authorNickname: "铁甲老爸",
        content: "这个太实用了！我马上就做一张。家庭暗号这个主意太好了，比什么安全软件都管用。",
        createdAt: "2026-06-17T16:00:00Z"
      },
      {
        id: "reply-10-2",
        authorCharacter: "warrior",
        authorNickname: "勇士小刚",
        content: "我再加一条：教女儿用手机发定位。现在手机都有'共享位置'功能，紧急情况下很实用。不过前提是她愿意——所以日常信任是基础。",
        createdAt: "2026-06-17T17:30:00Z"
      }
    ],
    createdAt: "2026-06-17T15:00:00Z",
    likes: 47
  }
]
