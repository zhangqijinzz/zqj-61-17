import type { Scenario } from "../types"

export const scenarios: Scenario[] = [
  {
    id: "scenario-menarche",
    title: "初潮来临",
    description: "女儿第一次来月经，作为爸爸的你该如何应对这个重要时刻？这个场景帮助你了解如何用温暖和专业的方式陪伴女儿度过初潮。",
    ageRange: "9-12岁",
    theme: "生理成长",
    difficulty: "medium",
    emoji: "🌺",
    scenes: [
      {
        id: "menarche-scene-1",
        narration: "周末的早晨，你正在厨房准备早餐，突然听到卫生间传来女儿惊慌的叫声。你走过去，女儿打开一条门缝，眼眶红红的，小声说：'爸爸，我……我流血了……'她的声音在发抖，脸上写满了恐惧和无助。",
        backgroundEmotion: "紧张不安",
        options: [
          {
            id: "menarche-1-a",
            text: "深呼吸，轻声说：'别害怕，这是正常的，爸爸马上帮你。'然后迅速去便利店买卫生巾。",
            consequence: "女儿的情绪稍有缓和，但你对买卫生巾这件事还是有点尴尬。",
            feedback: "你的冷静回应很好！女儿需要的是安全感。不过，平时最好提前准备好物资，避免手忙脚乱。",
            nextSceneId: "menarche-scene-2",
            isRecommended: true
          },
          {
            id: "menarche-1-b",
            text: "有些慌张地说：'啊？那个……你等一下，我打电话给你姑姑问问怎么办！'",
            consequence: "女儿看到你慌张的样子，变得更加不安，觉得这件事好像很严重。",
            feedback: "你的出发点是好的，但女儿此刻最需要的是你的镇定。她正在从你的反应中判断这件事是否可怕。",
            nextSceneId: "menarche-scene-2",
            isRecommended: false
          },
          {
            id: "menarche-1-c",
            text: "平静地说：'这是女孩子长大的标志，是一件值得庆祝的事哦。你先换上干净的内裤，爸爸给你准备需要的东西。'",
            consequence: "女儿虽然还有些紧张，但听到你说这是正常的事，明显松了一口气。",
            feedback: "非常棒！你不仅提供了安全感，还用正面的方式重新定义了这个经历，这是最理想的回应。",
            nextSceneId: "menarche-scene-2",
            isRecommended: true
          }
        ]
      },
      {
        id: "menarche-scene-2",
        narration: "你从便利店回来，把卫生巾递给女儿。女儿接过去后小声问：'爸爸，这个怎么用啊？'她低着头，耳朵都红了。你知道这是她第一次面对这些东西，需要你的指引。",
        backgroundEmotion: "羞涩忐忑",
        options: [
          {
            id: "menarche-2-a",
            text: "把包装盒上的使用说明撕下来从门缝递进去：'上面有图示说明，你照着做就行。有什么问题再叫爸爸。'",
            consequence: "女儿照着说明笨拙地操作，花了很久才弄好，但至少自己完成了。",
            feedback: "让女儿自己看说明是不错的做法，但如果能提前学习一下，用更通俗易懂的方式讲解，会让她少一些挫败感。",
            nextSceneId: "menarche-scene-3",
            isRecommended: false
          },
          {
            id: "menarche-2-b",
            text: "提前看了教学视频，隔着门耐心地用简单的话语讲解步骤：'先把粘贴条贴在内裤中间，有棉的一面朝上……'",
            consequence: "女儿按照你的指引顺利完成，出来时虽然还有点不好意思，但明显安心了许多。",
            feedback: "太棒了！你提前做了功课，用简单清晰的语言帮助女儿。这让她感到被支持和理解。",
            nextSceneId: "menarche-scene-3",
            isRecommended: true
          },
          {
            id: "menarche-2-c",
            text: "'这个……爸爸也不太懂，要不我请隔壁阿姨来帮你？'",
            consequence: "女儿立刻拒绝：'不要！我不要别人知道！'她关上门，独自在里面捣鼓了很久。",
            feedback: "尊重女儿不想让外人知道的意愿是对的，但把问题推给别人会让女儿觉得爸爸靠不住。作为单亲爸爸，这些知识储备很重要。",
            nextSceneId: "menarche-scene-3",
            isRecommended: false
          }
        ]
      },
      {
        id: "menarche-scene-3",
        narration: "晚上，女儿在沙发上依偎着你看电视，突然小声说：'爸爸，我以后每个月都会这样吗？好烦啊……'她的语气里有对未来的担忧和对身体变化的不安。",
        backgroundEmotion: "忧虑困惑",
        options: [
          {
            id: "menarche-3-a",
            text: "笑着说：'是的，这说明你在健康地长大。爸爸虽然不能替你经历这些，但会一直在你身边。要不要一起去买个小蛋糕庆祝一下？'",
            consequence: "女儿被你的话逗笑了，之前的忧虑消散了大半，开心地和你一起出门买蛋糕。",
            feedback: "完美！你用温暖幽默的方式化解了女儿的焦虑，还把一个她可能觉得'麻烦'的事情变成了值得纪念的时刻。",
            nextSceneId: "menarche-scene-4",
            isRecommended: true
          },
          {
            id: "menarche-3-b",
            text: "认真地说：'是的，这是正常的生理现象。爸爸给你买了一本关于青春期的书，你可以看看，有什么不懂的再问我。'",
            consequence: "女儿接过书翻了翻，虽然觉得有点枯燥，但还是认真看了几页。",
            feedback: "提供书籍是好的补充，但仅仅靠书可能不够。孩子更希望从你的态度中感受到这件事的正常和自然。",
            nextSceneId: "menarche-scene-4",
            isRecommended: false
          },
          {
            id: "menarche-3-c",
            text: "叹口气说：'唉，做女孩子确实不容易。爸爸也觉得挺心疼你的。'",
            consequence: "女儿感受到你的心疼，但同时也觉得这件事好像真的很苦、很不好。",
            feedback: "你的关心是真实的，但过度心疼可能会强化女儿'这是坏事'的感受。试着用更积极的方式看待成长。",
            nextSceneId: "menarche-scene-4",
            isRecommended: false
          }
        ]
      },
      {
        id: "menarche-scene-4",
        narration: "几天后，女儿在上学前突然慌张地跑来找你：'爸爸，我今天不想去学校，万一在学校来了怎么办？'她紧紧攥着书包带，脸上写满了担忧。这是她第一次带着这个'新情况'面对外面的世界。",
        backgroundEmotion: "恐惧退缩",
        options: [
          {
            id: "menarche-4-a",
            text: "'我理解你的担心。来，爸爸帮你准备一个随身小包，放上卫生巾和备用内裤，放在书包最里面。这样你就不用担心了。'",
            consequence: "女儿看着你仔细帮她准备小包，紧张感缓解了很多，最后鼓起勇气出了门。",
            feedback: "非常实用且贴心的做法！你不仅解决了实际问题，更让女儿感受到被保护和被支持。这种'准备好了'的感觉能大大减轻焦虑。",
            nextSceneId: "menarche-scene-5",
            isRecommended: true
          },
          {
            id: "menarche-4-b",
            text: "'没什么好怕的，同学们也都经历过，你不用太紧张。快去上学吧！'",
            consequence: "女儿虽然出了门，但一整天都提心吊胆，不敢上体育课，也不敢多喝水。",
            feedback: "轻视女儿的担忧并不能消除她的恐惧。对于她来说这是全新的体验，需要具体的帮助而不是简单的鼓励。",
            nextSceneId: "menarche-scene-5",
            isRecommended: false
          },
          {
            id: "menarche-4-c",
            text: "'好吧，那今天就在家休息一天也行。'然后帮女儿跟老师请假。",
            consequence: "女儿在家休息了一天，但问题并没有解决，明天她依然会担心同样的事情。",
            feedback: "逃避不是长久之计。偶尔休息可以，但更重要的是帮助女儿建立应对能力和信心。",
            nextSceneId: "menarche-scene-5",
            isRecommended: false
          }
        ]
      },
      {
        id: "menarche-scene-5",
        narration: "一个月后，女儿放学回来，平静地对你说：'爸爸，今天又来了。我已经知道怎么处理了。'她笑了笑，'上次你教我准备的小包真的很有用。'看着女儿从容的样子，你感到一种温暖的成就感。",
        backgroundEmotion: "成长释然",
        options: [
          {
            id: "menarche-5-a",
            text: "摸摸女儿的头说：'我的女儿真的长大了，爸爸为你骄傲。今晚想吃什么？爸爸给你做！'",
            consequence: "女儿开心地点了菜，父女俩度过了一个温馨的夜晚。",
            feedback: "简单而温暖的回应。你肯定了女儿的成长，也让她知道无论发生什么，爸爸永远在身边。这就是最好的陪伴。",
            nextSceneId: null,
            isRecommended: true
          },
          {
            id: "menarche-5-b",
            text: "'太好了！你看，没有什么好怕的吧？'然后继续忙自己的事情。",
            consequence: "女儿点了点头，虽然有些失落你没多聊几句，但还是自己回房间了。",
            feedback: "肯定了女儿的进步是好的，但这个时刻值得更多的关注和庆祝。不要让成长中的里程碑轻易溜走。",
            nextSceneId: null,
            isRecommended: false
          }
        ]
      }
    ]
  },
  {
    id: "scenario-bullying",
    title: "校园霸凌",
    description: "发现女儿可能在学校遭受霸凌，作为爸爸的你该如何敏锐察觉、正确应对？这个场景帮助你学会保护孩子的同时，也教会她自我保护。",
    ageRange: "6-12岁",
    theme: "安全守护",
    difficulty: "hard",
    emoji: "🛡️",
    scenes: [
      {
        id: "bullying-scene-1",
        narration: "最近一周，你发现女儿变了。以前回家总是叽叽喳喳讲学校的事，现在越来越沉默。今天她回来时，校服袖口有一道明显的墨水痕迹，书包侧袋的水壶也不见了。你问她怎么了，她只是说'没事'就躲进了房间。",
        backgroundEmotion: "隐忍压抑",
        options: [
          {
            id: "bullying-1-a",
            text: "没有追问，而是在她房门口放了一杯温牛奶和一张纸条：'爸爸在客厅，想聊天随时来。'",
            consequence: "女儿在房间里待了很久，睡前出来喝了牛奶，小声说了一句'谢谢爸爸'。",
            feedback: "给了女儿空间，同时传达了'我在'的信号。但仅靠等待可能不够，需要持续观察并适时主动沟通。",
            nextSceneId: "bullying-scene-2",
            isRecommended: true
          },
          {
            id: "bullying-1-b",
            text: "直接推开她的房门追问：'到底怎么回事？谁弄的？你是不是被欺负了？'",
            consequence: "女儿被吓到了，含着泪摇头说'没有'，把被子蒙住头不再理你。",
            feedback: "你的焦急可以理解，但强迫沟通可能让女儿更加封闭。被霸凌的孩子往往害怕说出真相，需要更温和的方式。",
            nextSceneId: "bullying-scene-2",
            isRecommended: false
          },
          {
            id: "bullying-1-c",
            text: "先不动声色，悄悄联系班主任了解情况，同时观察几天再说。",
            consequence: "班主任说会注意一下，但两天过去了，女儿的状态没有好转，甚至开始说肚子疼不想上学。",
            feedback: "联系老师是必要的步骤，但不宜过度依赖。孩子也需要你直接的关注和情感支持，不要只在外围解决问题。",
            nextSceneId: "bullying-scene-2",
            isRecommended: false
          }
        ]
      },
      {
        id: "bullying-scene-2",
        narration: "第三天晚上，你轻轻敲门进女儿房间，坐在床边说：'最近你好像不太开心，爸爸有点担心。不管发生了什么，你都不会有麻烦，爸爸永远站在你这边。'沉默了一会儿，女儿终于小声说：'班上有几个同学总叫我外号……还藏我的东西……'",
        backgroundEmotion: "脆弱袒露",
        options: [
          {
            id: "bullying-2-a",
            text: "强压怒火，声音却保持平稳：'谢谢你告诉爸爸。这不是你的错。能多告诉爸爸一些吗？'",
            consequence: "女儿感受到了你的支持，慢慢说出了更多细节：谁在欺负她、持续了多久、具体做了什么。",
            feedback: "非常正确的做法！先控制自己的情绪，让女儿知道说出来是安全的。'不是你的错'这句话至关重要。",
            nextSceneId: "bullying-scene-3",
            isRecommended: true
          },
          {
            id: "bullying-2-b",
            text: "立刻愤怒地说：'什么？！谁敢欺负我女儿！明天我就去学校找他们算账！'",
            consequence: "女儿害怕地拉住你：'不要！你去了他们会更欺负我的！求你了爸爸别去！'",
            feedback: "你的愤怒是出于爱，但冲动的行动可能让情况更糟。孩子最怕的就是事情闹大后遭到报复，需要更冷静的策略。",
            nextSceneId: "bullying-scene-3",
            isRecommended: false
          },
          {
            id: "bullying-2-c",
            text: "安慰说：'别理他们就好了，同学之间打打闹闹很正常。你要学会坚强一点。'",
            consequence: "女儿眼里的光暗了下去，低下头不再说话。她觉得连爸爸也不理解自己。",
            feedback: "这是最需要避免的回应！将霸凌等同于'打打闹闹'是否定了孩子的感受。这会让她觉得说出真相也没有用。",
            nextSceneId: "bullying-scene-3",
            isRecommended: false
          }
        ]
      },
      {
        id: "bullying-scene-3",
        narration: "了解情况后，你决定和学校沟通。女儿紧张地拉着你的衣角：'爸爸，你能不能不要让老师叫他们过来？我好怕……'",
        backgroundEmotion: "恐惧担忧",
        options: [
          {
            id: "bullying-3-a",
            text: "'爸爸会和老师单独沟通，不会当着全班的面说。我会让老师用不暴露你的方式处理。你觉得这样好吗？'",
            consequence: "女儿想了想，点了点头。你跟老师约了放学后单独见面。",
            feedback: "尊重女儿的意愿，同时找到可行的方案。让她参与决策过程，能帮助她恢复对生活的掌控感。",
            nextSceneId: "bullying-scene-4",
            isRecommended: true
          },
          {
            id: "bullying-3-b",
            text: "'不用担心，爸爸会处理好的。'然后直接去找了校长反映情况。",
            consequence: "学校很重视，但处理过程中不可避免地让女儿被'特殊关注'，她觉得在学校更不自在了。",
            feedback: "解决问题的同时要注意保护孩子的日常社交环境。过于高调的处理可能让孩子承受额外压力。",
            nextSceneId: "bullying-scene-4",
            isRecommended: false
          }
        ]
      },
      {
        id: "bullying-scene-4",
        narration: "学校介入后，霸凌的情况明显好转了。但有一天，女儿回来问你：'爸爸，如果以后又有人欺负我，我该怎么办？'她的大眼睛里带着认真和不安。",
        backgroundEmotion: "求知防备",
        options: [
          {
            id: "bullying-4-a",
            text: "'首先，大声说'停下来，我不喜欢你这样'。然后立刻走开去找老师。回家后一定要告诉爸爸。记住，寻求帮助不是软弱，是勇敢。'",
            consequence: "女儿认真地重复了一遍你的话，然后说：'我记住了。'你看到她的眼神里多了一份坚定。",
            feedback: "非常棒！你给了女儿具体可行的方法，同时重新定义了'勇敢'的含义。这会成为她一生的自我保护意识。",
            nextSceneId: "bullying-scene-5",
            isRecommended: true
          },
          {
            id: "bullying-4-b",
            text: "'如果有人欺负你，就打回去！不能让人家觉得你好欺负！'",
            consequence: "女儿犹豫了一下：'可是老师说不能打架……'",
            feedback: "以暴制暴可能让问题升级，而且女儿显然也不认同这种方式。教孩子自我保护需要更全面的方法。",
            nextSceneId: "bullying-scene-5",
            isRecommended: false
          },
          {
            id: "bullying-4-c",
            text: "'放心，有爸爸在呢，不会再让你被欺负了。'",
            consequence: "女儿虽然点了点头，但她心里还是不安——爸爸不可能时时刻刻在身边。",
            feedback: "你的保护是重要的，但孩子也需要自己面对世界的能力。帮助她建立内在的力量比外在的保护更持久。",
            nextSceneId: "bullying-scene-5",
            isRecommended: false
          }
        ]
      },
      {
        id: "bullying-scene-5",
        narration: "几个月后，女儿在饭桌上突然笑着说：'今天有个新转来的同学被取外号，我站起来说了那样做不对。其他同学也跟着说了。'你看着女儿坚定的样子，知道这段经历虽然痛苦，但也让她变得更加坚强和善良。",
        backgroundEmotion: "坚韧成长",
        options: [
          {
            id: "bullying-5-a",
            text: "眼眶微热，但笑着说：'爸爸真的为你骄傲。你能用自己的经历帮助别人，这是最了不起的勇气。'",
            consequence: "女儿骄傲地挺了挺胸，父女俩相视而笑。曾经的伤痛，已经化为了力量。",
            feedback: "你肯定了女儿从受害者到保护者的转变，这是创伤后成长最美的样子。你的陪伴和支持，是这一切的起点。",
            nextSceneId: null,
            isRecommended: true
          },
          {
            id: "bullying-5-b",
            text: "'做得好！不过你也要注意安全，别让自己又成为目标了。'",
            consequence: "女儿愣了一下，然后默默点了点头。她为你感到骄傲的时刻被泼了一点冷水。",
            feedback: "提醒注意安全不是错，但时机很重要。在这个值得庆祝的时刻，先完全肯定她的勇气更重要。",
            nextSceneId: null,
            isRecommended: false
          }
        ]
      }
    ]
  },
  {
    id: "scenario-puberty-emotion",
    title: "青春期情绪风暴",
    description: "女儿进入青春期后情绪波动剧烈，时而暴躁时而低落，作为爸爸的你该如何理解和应对？学会做她的情绪避风港。",
    ageRange: "12-16岁",
    theme: "情感成长",
    difficulty: "medium",
    emoji: "🌪️",
    scenes: [
      {
        id: "puberty-scene-1",
        narration: "周末下午，你好心提醒女儿该写作业了，她突然像被踩了尾巴一样大喊：'你能不能别管我！烦死了！'然后'砰'的一声关上了房门。你站在走廊里，一头雾水——昨天还好好的，怎么今天就炸了？",
        backgroundEmotion: "暴躁易怒",
        options: [
          {
            id: "puberty-1-a",
            text: "深呼吸，没有追上去。在门外平静地说：'爸爸不是要管你，只是提醒一下。你先休息，需要什么叫我。'",
            consequence: "门后安静了一阵。半小时后，女儿悄悄出来倒了杯水，经过你身边时小声说了句'对不起'。",
            feedback: "非常好的处理！青春期的孩子需要空间和尊重。你没有和她对峙，也没有委屈退让，保持了温和的边界感。",
            nextSceneId: "puberty-scene-2",
            isRecommended: true
          },
          {
            id: "puberty-1-b",
            text: "敲着门严厉地说：'你怎么跟爸爸说话的？出来道歉！我哪句话说错了？'",
            consequence: "门内传来更大的哭声：'你永远都不理解我！'父女之间的墙又厚了一层。",
            feedback: "青春期的情绪爆发不是针对你的，而是荷尔蒙和学习压力的综合产物。强硬对抗只会让冲突升级。",
            nextSceneId: "puberty-scene-2",
            isRecommended: false
          },
          {
            id: "puberty-1-c",
            text: "叹口气走开，心想：算了，青春期都这样，随她去吧。",
            consequence: "女儿确实渐渐平静了，但她学会了'发脾气就能让爸爸退缩'，类似的情况越来越频繁。",
            feedback: "不追击是对的，但完全放任不是。青春期需要的是'温和而坚定'的陪伴，不是'不管不问'的缺席。",
            nextSceneId: "puberty-scene-2",
            isRecommended: false
          }
        ]
      },
      {
        id: "puberty-scene-2",
        narration: "晚上，你端了女儿爱吃的水果进她房间。她正趴在桌上，眼睛红红的。你放下水果刚要走，她突然开口：'爸爸，我是不是很讨厌？我自己都讨厌自己……有时候莫名其妙就发火，发完又后悔。'她的声音又气又委屈。",
        backgroundEmotion: "自我怀疑",
        options: [
          {
            id: "puberty-2-a",
            text: "坐下来认真地看着她：'你一点都不讨厌。你现在正在经历很多变化，情绪起伏是正常的，不是你的错。发完火能意识到并道歉，这已经很了不起了。'",
            consequence: "女儿的眼泪终于掉了下来，但这次是释然的泪。她靠在你肩头安静了好一会儿。",
            feedback: "你的回应让她明白：情绪本身不可怕，重要的是如何面对。'不是你的错'这句话对她意义重大。",
            nextSceneId: "puberty-scene-3",
            isRecommended: true
          },
          {
            id: "puberty-2-b",
            text: "'知道后悔就好，以后要注意控制自己的脾气。爸爸也是为了你好才提醒你的。'",
            consequence: "女儿点了点头，但眼里的委屈并没有消散。她觉得你在说教而不是理解她。",
            feedback: "虽然道理没错，但此刻她需要的是被理解而非被教育。先接纳情绪，再讨论行为。",
            nextSceneId: "puberty-scene-3",
            isRecommended: false
          }
        ]
      },
      {
        id: "puberty-scene-3",
        narration: "又过了几天，你下班回家发现女儿一个人坐在阳台上发呆，饭也没吃。问她怎么了，她只说'没什么，就是觉得活着好累'。这句话让你心里一紧。",
        backgroundEmotion: "低落消沉",
        options: [
          {
            id: "puberty-3-a",
            text: "坐到她旁边，不急着说话，就安静地陪着她。过了一会儿轻声问：'想和爸爸说说吗？不勉强，爸爸就在这里。'",
            consequence: "女儿沉默了很久，然后慢慢说出了最近学习压力很大、和好朋友闹了矛盾、觉得自己什么都做不好。",
            feedback: "有时候最好的帮助就是安静地陪伴。你不急于解决问题，而是让她感到安全，这比任何建议都有用。",
            nextSceneId: "puberty-scene-4",
            isRecommended: true
          },
          {
            id: "puberty-3-b",
            text: "紧张地问：'你说活着好累是什么意思？你是不是有想不开的念头？你告诉爸爸！'",
            consequence: "女儿被你的反应吓到了，赶紧说'没有没有'，然后迅速封闭了自己。",
            feedback: "你的担心是合理的，但过度反应会让孩子不敢再表达真实感受。先倾听再评估，如果确实有严重迹象再寻求专业帮助。",
            nextSceneId: "puberty-scene-4",
            isRecommended: false
          },
          {
            id: "puberty-3-c",
            text: "'累了就好好休息，明天又是新的一天。来，爸爸给你做你最爱吃的红烧肉！'",
            consequence: "女儿勉强笑了笑，吃了饭，但心里的话还是没有说出来。",
            feedback: "美食可以短暂缓解情绪，但无法替代真正的倾听和交流。物质安慰之后，别忘了情感上的连接。",
            nextSceneId: "puberty-scene-4",
            isRecommended: false
          }
        ]
      },
      {
        id: "puberty-scene-4",
        narration: "女儿慢慢愿意和你分享更多了。一天她问你：'爸爸，你觉得人一定要开心吗？我有时候觉得自己好像失去了快乐的能力。'这次她说得很平静，但你听出了其中的认真。",
        backgroundEmotion: "思考迷茫",
        options: [
          {
            id: "puberty-4-a",
            text: "'人不一定要一直开心，各种情绪都有存在的意义。难过的时候允许自己难过，就像下雨天不用逼自己假装出太阳。但如果你发现连续很久都感受不到快乐，一定要告诉爸爸，我们可以一起想办法，也可以找专业人士聊聊。'",
            consequence: "女儿认真地点了点头：'我明白了，不开心也没关系。'你看到她的肩膀放松了下来。",
            feedback: "你既接纳了她当下的情绪，又为她设置了安全底线——如果情况持续，会寻求专业帮助。这是最健康的情绪教育。",
            nextSceneId: "puberty-scene-5",
            isRecommended: true
          },
          {
            id: "puberty-4-b",
            text: "'当然不是啊！你看爸爸有时候也会难过，这是正常的。别想太多，多出去走走就好了。'",
            consequence: "女儿礼貌地笑了笑，但你知道她并没有被说服。",
            feedback: "简化问题无法带来真正的释然。承认情绪的复杂性，才能帮助孩子建立健康的情绪认知。",
            nextSceneId: "puberty-scene-5",
            isRecommended: false
          }
        ]
      },
      {
        id: "puberty-scene-5",
        narration: "又过了一个月，你和女儿建立了每晚散步二十分钟的习惯。虽然不是每天都能聊深入的话题，但那些并肩走在夕阳下的时光，成了你们之间最珍贵的默契。一天散步时，女儿突然说：'爸爸，谢谢你一直陪着我。虽然我还是会情绪不好，但至少现在我知道，不管怎样，回家都有一盏灯亮着。'",
        backgroundEmotion: "温暖感恩",
        options: [
          {
            id: "puberty-5-a",
            text: "握了握她的手：'这盏灯永远为你亮着。不管你多大，爸爸都是你的后盾。走吧，我们去买那个你念叨了好久的冰淇淋。'",
            consequence: "女儿笑了，挽住你的胳膊，脚步轻快地走向冰淇淋店。晚风温柔，一切都在慢慢变好。",
            feedback: "你用行动告诉她：陪伴不需要多宏大的承诺，日常的坚守就是最深的爱。青春期是一场风暴，而你，是她的避风港。",
            nextSceneId: null,
            isRecommended: true
          },
          {
            id: "puberty-5-b",
            text: "笑着说：'看吧，爸爸说得对吧，什么事都会过去的。'",
            consequence: "女儿笑了笑没说话。她感谢的不是你的道理，而是你一直都在。",
            feedback: "在这个温暖的时刻，不需要总结道理。纯粹地享受这份父女之间的连接，就是最好的回应。",
            nextSceneId: null,
            isRecommended: false
          }
        ]
      }
    ]
  },
  {
    id: "scenario-first-crush",
    title: "早恋困惑",
    description: "发现女儿似乎有了心仪的男生，作为爸爸该如何处理？这个场景帮助你在保护女儿的同时，建立信任和沟通的桥梁。",
    ageRange: "12-16岁",
    theme: "情感引导",
    difficulty: "hard",
    emoji: "💕",
    scenes: [
      {
        id: "crush-scene-1",
        narration: "最近你注意到女儿有些不一样：开始偷偷对着手机笑，出门前照镜子的时间变长了，写作业时会不自觉地发呆微笑。今天你在整理房间时，无意中看到她日记本翻开的一页，上面写着'他今天看了我一眼，心跳好快……'",
        backgroundEmotion: "甜蜜隐秘",
        options: [
          {
            id: "crush-1-a",
            text: "轻轻合上日记本，放回原位，什么也没说。在心里记住这个阶段到了，找合适的机会自然地聊聊。",
            consequence: "女儿回来没有发现异样。你有了心理准备，开始留意合适的聊天时机。",
            feedback: "尊重隐私是最基本的原则。偷看日记已经是边界问题了，不再扩散是正确的补救。接下来需要自然地引导沟通。",
            nextSceneId: "crush-scene-2",
            isRecommended: true
          },
          {
            id: "crush-1-b",
            text: "等女儿回来后，试探性地问：'最近是不是有喜欢的男孩子了？跟爸爸说说？'",
            consequence: "女儿的脸瞬间涨红，又惊又怒：'你偷看我日记？！'她摔门进了房间。",
            feedback: "不管你的出发点多么关心，侵犯隐私会直接摧毁信任。一旦信任崩塌，她更不可能向你敞开心扉。",
            nextSceneId: "crush-scene-2",
            isRecommended: false
          },
          {
            id: "crush-1-c",
            text: "内心警铃大作：早恋绝对不行！必须扼杀在摇篮里！第二天严肃地跟她谈话。",
            consequence: "女儿被你吓到了，表面答应不再来往，实际上学会了更好地隐瞒。",
            feedback: "强硬禁止只会把事情推向地下。青春期的感情是自然的成长经历，需要的不是围堵而是引导。",
            nextSceneId: "crush-scene-2",
            isRecommended: false
          }
        ]
      },
      {
        id: "crush-scene-2",
        narration: "周末一起看电影时，你挑了一部关于青春成长的影片。看完后，你自然地聊起电影里的角色：'你觉得电影里的男生怎么样？如果将来有男孩子对你好，你希望他是什么样的人？'",
        backgroundEmotion: "好奇探索",
        options: [
          {
            id: "crush-2-a",
            text: "认真倾听女儿的回答，然后分享自己的看法：'爸爸觉得，一个值得喜欢的人，首先应该尊重你、让你成为更好的自己。你觉得呢？'",
            consequence: "女儿想了想，说：'嗯……他好像确实会鼓励我。'然后有些不好意思地低头了。",
            feedback: "你通过讨论价值观而非盘问具体对象，让女儿在安全的环境下思考什么是健康的感情。这是最高明的引导方式。",
            nextSceneId: "crush-scene-3",
            isRecommended: true
          },
          {
            id: "crush-2-b",
            text: "'现在谈恋爱太早了，你的任务是好好学习。等你上了大学再说这些。'",
            consequence: "女儿翻了个白眼：'你又来了。'然后不再接话。",
            feedback: "说教式回应会直接关闭沟通通道。比起告诉孩子'不该'，不如帮助她理解'怎样才是好的'。",
            nextSceneId: "crush-scene-3",
            isRecommended: false
          }
        ]
      },
      {
        id: "crush-scene-3",
        narration: "又过了一周，女儿主动来找你：'爸爸，我好像喜欢上了一个人……'她的脸红到了耳根，但眼神里有期待也有不安，'你会不会生气？'",
        backgroundEmotion: "忐忑期待",
        options: [
          {
            id: "crush-3-a",
            text: "微笑着说：'爸爸怎么会生气呢？喜欢一个人是很美好的事。谢谢你愿意告诉爸爸，这说明你信任我。能跟爸爸说说他是什么样的吗？'",
            consequence: "女儿开心地和你聊了很久，从他的性格到他们是怎么认识的。你第一次觉得女儿真的把你当朋友了。",
            feedback: "你的接纳让女儿敞开了心扉。当孩子觉得不会被评判时，才会主动分享。这就是信任的力量。",
            nextSceneId: "crush-scene-4",
            isRecommended: true
          },
          {
            id: "crush-3-b",
            text: "'不会生气，但爸爸有些担心。你们现在还小，很多事情处理不好会受伤的。'",
            consequence: "女儿的表情暗了下来：'我就知道你会这样说……'她转身离开了。",
            feedback: "担心是爱的表现，但表达方式很重要。先完全接纳，再在合适的时机温柔引导。一开始就泼冷水只会让孩子后悔向你敞开。",
            nextSceneId: "crush-scene-4",
            isRecommended: false
          }
        ]
      },
      {
        id: "crush-scene-4",
        narration: "女儿跟你分享了她的'小秘密'之后，你了解到那个男生是同班同学，学习不错，对女儿也很友好。但你也注意到女儿最近花在学习上的时间少了，成绩有些下滑。",
        backgroundEmotion: "矛盾纠结",
        options: [
          {
            id: "crush-4-a",
            text: "'爸爸很高兴你愿意跟我分享这些。我有个小建议：喜欢一个人的同时，也要让自己变得更优秀，这样你才会更有魅力。不如我们定个小目标，期中考试进步5名，爸爸请你和你的好朋友一起吃披萨？'",
            consequence: "女儿想了想，觉得这个提议挺好的，开始重新规划学习和'社交'的时间。",
            feedback: "你巧妙地将学习和成长融入了她的情感世界，没有对立，而是融合。这比'学习重要还是他重要'的二选一高明太多。",
            nextSceneId: "crush-scene-5",
            isRecommended: true
          },
          {
            id: "crush-4-b",
            text: "'你看，成绩都下降了。我就说现在不适合吧。从明天开始手机没收，放学必须直接回家。'",
            consequence: "女儿含着泪夺门而出。你觉得是在保护她，但她觉得你不理解也不尊重她。",
            feedback: "惩罚式管理只会制造更多冲突。控制手机不能控制心动，还会失去女儿的信任。她需要的是引导而非围堵。",
            nextSceneId: "crush-scene-5",
            isRecommended: false
          }
        ]
      },
      {
        id: "crush-scene-5",
        narration: "期中考试后，女儿兴冲冲地拿着成绩单跑来找你：'爸爸！我进步了8名！'她的眼睛亮晶晶的，'而且……他跟我说我最近变厉害了。'你看着女儿既骄傲又害羞的样子，忍不住笑了。",
        backgroundEmotion: "自信绽放",
        options: [
          {
            id: "crush-5-a",
            text: "'那当然，我女儿本来就很厉害！披萨必须安排上。记住，好的感情会让你变成更好的自己——你做到了。'",
            consequence: "女儿开心地抱住你。你意识到，与其围堵她的感情，不如教会她什么是健康的喜欢。",
            feedback: "你用最温暖的方式完成了最艰难的教育。让女儿在体验中学习，在信任中成长，这就是单亲爸爸的育儿智慧。",
            nextSceneId: null,
            isRecommended: true
          },
          {
            id: "crush-5-b",
            text: "'不错不错，继续保持。不过记住，学习才是最重要的。'",
            consequence: "女儿点了点头，但那个闪闪发光的瞬间被你的提醒淡化了。",
            feedback: "成绩进步值得庆祝，感情中的正向成长也值得肯定。不要在每个高光时刻都加一个'但是'。",
            nextSceneId: null,
            isRecommended: false
          }
        ]
      }
    ]
  },
  {
    id: "scenario-academic-pressure",
    title: "学业压力",
    description: "女儿面临考试压力，学习效率下降，情绪焦虑。作为爸爸，如何帮她找到平衡点，既不施加压力又能提供有效支持？",
    ageRange: "8-15岁",
    theme: "学习成长",
    difficulty: "easy",
    emoji: "📚",
    scenes: [
      {
        id: "academic-scene-1",
        narration: "期中考试临近，女儿每天晚上都学到很晚。今晚已经十一点了，她的房间灯还亮着。你推门进去，看到她趴在桌上，面前摊着数学卷子，眼圈发红，手边的草稿纸揉了一团又一团。'我就是算不出来……'她抬头看你，眼里满是挫败。",
        backgroundEmotion: "焦虑挫败",
        options: [
          {
            id: "academic-1-a",
            text: "'已经十一点了，你的大脑也需要休息。来，先把作业收起来，喝杯热牛奶，明天早起精神好了再看，说不定就开窍了。'",
            consequence: "女儿虽然不太情愿，但还是听了你的话。第二天早上重新看那道题，确实更容易理解了。",
            feedback: "你帮助女儿认识到休息也是学习的一部分。疲劳状态下效率很低，休息后思路更清晰，这是科学的学习方法。",
            nextSceneId: "academic-scene-2",
            isRecommended: true
          },
          {
            id: "academic-1-b",
            text: "'让爸爸看看这题……嗯，你应该先用这个公式……'然后坐下来帮她解题。",
            consequence: "你花了一个小时帮她解完了题，但她似乎并没有真正理解，只是抄了你的解法。",
            feedback: "直接帮解题看似帮忙，实际剥夺了她独立思考的机会。更好的方式是引导她自己找到解题思路。",
            nextSceneId: "academic-scene-2",
            isRecommended: false
          },
          {
            id: "academic-1-c",
            text: "'这么简单的题都不会？上课有没有认真听？'",
            consequence: "女儿的眼泪瞬间掉下来，把卷子一推说'我就是这样笨！'然后跑回房间反锁了门。",
            feedback: "否定和批评只会加重焦虑。孩子需要的是支持和鼓励，而不是在受挫时被质疑能力。",
            nextSceneId: "academic-scene-2",
            isRecommended: false
          }
        ]
      },
      {
        id: "academic-scene-2",
        narration: "第二天，女儿情绪稍微好了一些，但还是忧心忡忡：'爸爸，如果我考不好怎么办？我们班好多人都报了补习班，就我没有……'",
        backgroundEmotion: "焦虑不安",
        options: [
          {
            id: "academic-2-a",
            text: "'考试只是检验学习的一种方式，不是衡量你价值的标准。我们不需要和别人比补习班的数量，找到适合你的学习方法才最重要。来，我们一起分析一下你最需要提升的地方，制定一个学习计划怎么样？'",
            consequence: "女儿认真听了你的话，和你一起梳理了各科的薄弱点，制定了一个务实的学习计划。",
            feedback: "你帮助女儿从'和别人比'转向'关注自己的进步'，并且把焦虑转化为具体的行动计划。这是解决压力的根本之道。",
            nextSceneId: "academic-scene-3",
            isRecommended: true
          },
          {
            id: "academic-2-b",
            text: "'那我们也报个补习班吧，别落后了。爸爸出钱。'",
            consequence: "女儿虽然去了补习班，但额外的课程让她更累了，学习效率反而更低。",
            feedback: "补习班不是万能药。在不了解孩子真正需求的情况下盲目报班，可能适得其反。先找到问题根源再对症下药。",
            nextSceneId: "academic-scene-3",
            isRecommended: false
          }
        ]
      },
      {
        id: "academic-scene-3",
        narration: "你发现女儿虽然制定了计划，但执行起来很困难。她经常坐在书桌前发呆，或者学了半小时就开始走神。你意识到，她可能需要的不只是计划，还有更具体的时间管理和学习方法。",
        backgroundEmotion: "迷茫低效",
        options: [
          {
            id: "academic-3-a",
            text: "'爸爸教你一个方法，叫番茄工作法。专注学25分钟，然后休息5分钟。4个番茄之后休息长一点。我们来试试看？'",
            consequence: "女儿尝试了番茄工作法，发现确实更容易集中注意力。一天下来完成了比之前多一倍的内容，她很惊喜。",
            feedback: "具体的方法比空泛的'你要努力'有效百倍。帮助孩子建立好的学习习惯，是比催促更持久的支持。",
            nextSceneId: "academic-scene-4",
            isRecommended: true
          },
          {
            id: "academic-3-b",
            text: "'你就是不够自律。我每天监督你学习，手机没收，电视线拔了。'",
            consequence: "在严格监督下，女儿的'学习时间'增加了，但实际效率并没有提升，而且充满了抵触情绪。",
            feedback: "外部强制不能代替内在动力。高压管控可能短期有效，但长期来看会让孩子失去自主学习的能力和意愿。",
            nextSceneId: "academic-scene-4",
            isRecommended: false
          },
          {
            id: "academic-3-c",
            text: "'学习计划你自己安排吧，爸爸相信你。'然后不再过问。",
            consequence: "女儿确实需要空间，但完全放任让她又陷入了混乱。她其实需要一些具体的帮助。",
            feedback: "信任和放任是两回事。青春期的孩子既需要自主空间，也需要适度的引导和支持。关键是找到平衡。",
            nextSceneId: "academic-scene-4",
            isRecommended: false
          }
        ]
      },
      {
        id: "academic-scene-4",
        narration: "考试前一天晚上，女儿紧张得睡不着觉，跑来找你：'爸爸，我害怕明天考砸了。如果我考不好，你会不会失望？'",
        backgroundEmotion: "恐惧期盼",
        options: [
          {
            id: "academic-4-a",
            text: "轻轻抱了抱她：'爸爸永远不会因为成绩对你失望。你努力的过程比分数重要得多。不管考多少分，你都是爸爸最骄傲的女儿。现在闭上眼睛，想象明天考完试我们一起去吃你最爱的火锅，好不好？'",
            consequence: "女儿紧绷的身体慢慢放松了，靠在你肩上渐渐有了困意。那一晚她睡得还算安稳。",
            feedback: "你给了女儿最需要的安全感——无条件的爱。当孩子确信自己不会被成绩定义时，反而能以更轻松的心态面对挑战。",
            nextSceneId: null,
            isRecommended: true
          },
          {
            id: "academic-4-b",
            text: "'怎么会考砸呢？你复习了这么久，肯定没问题的。别胡思乱想，快去睡觉！'",
            consequence: "女儿点了点头回房间了，但翻来覆去很久才睡着。她担心的事并没有被真正回应。",
            feedback: "用'肯定没问题'来否定她的担忧，虽然出发点是安慰，但孩子感受到的是'我不允许你害怕'。接纳恐惧比否定恐惧更有力量。",
            nextSceneId: null,
            isRecommended: false
          }
        ]
      }
    ]
  }
]
