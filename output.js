//Wed Aug 14 2024 03:56:39 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("屈臣氏-撸猫猫"),
  Notify = 1,
  debug = 0,
  {
    log
  } = console;
let ckStr = process.env.qlmhd,
  msg = "",
  newurl = "https://watsonscat.watsonsvip.com.cn/prd/api/",
  newdata = "",
  fooddata = "",
  qlm_headers = "",
  login_state = 0,
  userShape = 0,
  moodNum = 0,
  familyBucketStatus = 1,
  travelStatus = 0,
  Version = "\n 逐鹿少年   2023/5/5     屈臣氏-撸猫脚本";
async function tips(_0x19615d) {
  console.log("" + Version);
  msg += Version + " \n";
  console.log("==================================================\n 脚本执行 - 北京时间(UTC+8): " + new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).toLocaleString() + " \n==================================================");
  console.log("\n=================== 共找到 " + _0x19615d.length + " 个账号 ===================");
  debugLog("【debug】 这是你的账号数组:\n " + _0x19615d);
}
!(async () => {
  let _0x2965e4 = await getCks(ckStr, "qlmhd");
  await tips(_0x2965e4);
  for (let _0x4ec0d5 = 0; _0x4ec0d5 < _0x2965e4.length; _0x4ec0d5++) {
    let _0x417e6e = _0x4ec0d5 + 1;
    console.log("------------- 开始【第 " + _0x417e6e + " 个账号】-------------");
    ck = _0x2965e4[_0x4ec0d5].split("&");
    let _0x4d29fa = ck[0],
      _0xb4e7ed = ck[1],
      _0x3bf296 = ck[2],
      _0x14cf6f = ck[3];
    newdata = "{\"provider\":\"web\",\"data\":{\"openid\":\"300012\"},\"extra\":{\"token\":\"" + _0x4d29fa + "\",\"unionId\":\"" + _0xb4e7ed + "\",\"userId\":\"" + _0x3bf296 + "\",\"openId\":\"" + _0x14cf6f + "\"}}";
    debugLog("【debug】 这是你第 " + _0x417e6e + " 账号信息:\n " + ck);
    await start();
  }
  await SendMsg(msg);
})().catch(_0x953e2d => $.logErr(_0x953e2d)).finally(() => $.done());
async function start() {
  qlm_headers = "";
  log("====>开始 获取用户信息");
  msg += "====>开始 获取用户信息 \n";
  await getuserinfo();
  await $.wait(2 * 1000);
  if (login_state == 1) {
    log("====>开始 每日签到");
    msg += "====>开始 每日签到 \n";
    await signList();
    await $.wait(2 * 1000);
    if (userShape == 0 || userShape == 3) {} else (userShape == 1 || userShape == 2) && (log("====>开始 解除状态"), msg += "====>开始 解除状态 \n", await wakeUpCat(userShape), await $.wait(2 * 1000));
    if (familyBucketStatus != 1) {
      log("====>开始 领取小鱼干");
      msg += "====>开始 领取小鱼干 \n";
      await familyBucket();
      await $.wait(2 * 1000);
    }
    log("====>开始 执行任务");
    msg += "====>开始 执行任务 \n";
    await tasklist();
    await $.wait(2 * 1000);
    if (travelStatus == 1) {
      log(" ❌旅行中，无法进行其他动作❗");
      msg += " ❌旅行中，无法进行其他动作❗ \n";
    } else {
      if (travelStatus == 2) {
        log("====>开始 领取旅行奖励 ");
        msg += "====>开始 领取旅行奖励";
        await $.wait(2000);
        await getBackpack();
      }
      log("====>开始 撸猫");
      msg += "====>开始 撸猫 \n";
      await rollCat();
      await $.wait(2 * 1000);
      log("====>开始 喂猫");
      msg += "====>开始 喂猫 \n";
      await levelup();
      await $.wait(2 * 1000);
      travelStatus == 4 ? (log("  ❌猫猫今天太累了，明天再出门吧❗ \n"), msg += "  ❌猫猫今天太累了，明天再出门吧❗ \n") : (log("====>开始 丢骰子游戏"), msg += "====>开始 丢骰子游戏 \n", await rollingDice(), await $.wait(2 * 1000));
    }
  } else log("登录失败");
}
async function getuserinfo() {
  var _0x2f9c44 = {
    "url": newurl + "authorizations",
    "headers": {
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6763",
      "Content-Type": "application/json",
      "Accept": "*/*",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Dest": "empty",
      "Accept-Language": "zh-CN,zh",
      "Accept-Encoding": "gzip, deflate, br",
      "Cookie": ""
    },
    "body": newdata
  };
  return new Promise(_0x526160 => {
    $.post(_0x2f9c44, async (_0x3c5c7a, _0x4baf7a, _0x212976) => {
      try {
        debug && (log("\n\n 【debug】===============这是 返回data=============="), log(_0x212976), log("======"), log(JSON.stringify(_0x4baf7a)));
        let _0x10ebfb = JSON.parse(_0x212976),
          _0x3a84e3 = JSON.parse(JSON.stringify(_0x4baf7a)),
          _0x1989ab = _0x3a84e3.headers["set-cookie"][0].split(";"),
          _0x3131c0 = _0x10ebfb.token;
        qlm_headers = {
          "Authorization": "Bearer " + _0x3131c0,
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6763",
          "Content-Type": "application/json",
          "Accept": "*/*",
          "Sec-Fetch-Site": "same-origin",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Dest": "empty",
          "Accept-Language": "zh-CN,zh",
          "Accept-Encoding": "gzip, deflate, br",
          "Cookie": _0x1989ab[0]
        };
        if (!_0x10ebfb.code) {
          log("【猫名称】： " + _0x10ebfb.userInfo.catName);
          msg += "【猫名称】： " + _0x10ebfb.userInfo.catName + "\n";
          log("【喵喵币】： " + _0x10ebfb.userInfo.coin);
          msg += "【喵喵币】： " + _0x10ebfb.userInfo.coin + "\n";
          log("【小鱼干】： " + _0x10ebfb.userInfo.fishNum);
          msg += "【小鱼干】： " + _0x10ebfb.userInfo.fishNum + "\n";
          log("【心情值】： " + _0x10ebfb.userInfo.moodNum);
          msg += "【心情值】： " + _0x10ebfb.userInfo.moodNum + "\n";
          log("【猫等级】： Lv:" + _0x10ebfb.levelInfo.level + ",经验值：" + _0x10ebfb.userInfo.levelExp + "/" + _0x10ebfb.levelInfo.feedNum);
          msg += "【猫等级】： Lv:" + _0x10ebfb.levelInfo.level + ",经验值：" + _0x10ebfb.userInfo.levelExp + "/" + _0x10ebfb.levelInfo.feedNum + "\n";
          moodNum = Number(_0x10ebfb.userInfo.moodNum);
          userShape = _0x10ebfb.userInfo.userShape;
          if (userShape == 0 || userShape == 3) log("【猫状态】： 状态正常"), msg += "【猫状态】： 状态正常\n";else {
            if (userShape == 1 || userShape == 2) log("【猫状态】： 状态异常，待解除"), msg += "【猫状态】： 状态异常，待解除\n";else userShape == 4 ? (log("【猫状态】： 猫猫出门旅行了"), msg += "【猫状态】： 猫猫出门旅行了\n") : log(_0x10ebfb.message);
          }
          familyBucketStatus = _0x10ebfb.userInfo.familyBucketStatus;
          if (familyBucketStatus != 1) log("【每日小鱼干】：未领取"), msg += "【每日小鱼干】：未领取 \n";else {
            log("【每日小鱼干】：已领取");
            msg += "【每日小鱼干】：已领取 \n";
          }
          travelStatus = _0x10ebfb.travelInfo.travelStatus;
          if (travelStatus == 2) log("【旅行状态】：待领取奖励"), msg += "【旅行状态】：待领取奖励 \n";else travelStatus == 1 ? (log("【旅行状态】：旅行中,结束时间:" + _0x10ebfb.travelInfo.endTime), msg += "【旅行状态】：旅行中,结束时间:" + _0x10ebfb.travelInfo.endTime + " \n") : (log("【旅行状态】：未旅行，背包无奖励"), msg += "【旅行状态】：未旅行，背包无奖励 \n");
          login_state = 1;
        } else log(_0x10ebfb.message);
      } catch (_0x21be19) {
        log(_0x3c5c7a, _0x4baf7a);
        log("异常，原因：" + _0x21be19 + "，返回：" + _0x212976);
      } finally {
        _0x526160();
      }
    });
  });
}
async function signList() {
  let _0x34778e = {
      "url": newurl + "daily_signs/signList",
      "headers": qlm_headers
    },
    _0x1ac8c8 = await httpGet(_0x34778e, "签到天数获取");
  for (let _0x198585 = 0; _0x198585 < 3; _0x198585++) {
    if (_0x1ac8c8[_0x198585].signStatus == 0) {
      await signIn(_0x1ac8c8[_0x198585].day);
      break;
    } else {
      if (_0x1ac8c8[_0x198585].signStatus == 1) {
        log(" 已签到" + _0x1ac8c8[_0x198585].day + "天");
        msg += "  已签到" + _0x1ac8c8[_0x198585].day + "天\n";
        break;
      }
    }
  }
}
async function signIn(_0x2818a9) {
  let _0x41ce00 = {
      "url": newurl + "daily_signs/signDay",
      "headers": qlm_headers,
      "body": "{\"day\":" + _0x2818a9 + "}"
    },
    _0x548aca = await httpPost(_0x41ce00, "每日签到");
  _0x548aca.code == 0 ? (prize = Number(_0x548aca.result.rewardAmount) / 100, log("  成功签到" + _0x2818a9 + "天,奖励小鱼干: " + prize), msg += "  成功签到" + _0x2818a9 + "天,奖励小鱼干: " + prize + "\n") : (log("  签到错误: " + _0x548aca.message), msg += "  签到错误: " + _0x548aca.message + "\n");
}
async function userinfo() {
  let _0x3df5db = {
      "url": newurl + "users",
      "headers": qlm_headers
    },
    _0x2a5780 = await httpGet(_0x3df5db, "获取猫猫状态");
  console.log(_0x2a5780);
  console.log("  名称： " + _0x2a5780.userInfo.catName);
  console.log("  喵币： " + _0x2a5780.userInfo.coin);
  console.log("  鱼干： " + _0x2a5780.userInfo.fishNum);
  console.log("  心情值： " + _0x2a5780.userInfo.moodNum);
  console.log("  等级： Lv:" + _0x2a5780.levelInfo.level + ",经验值：" + _0x2a5780.userInfo.levelExp + "/" + _0x2a5780.levelInfo.feedNum);
  moodNum = Number(_0x2a5780.userInfo.moodNum);
  if (_0x2a5780.userInfo.userShape == 0 || _0x2a5780.userInfo.userShape == 3) console.log("  猫状态 心情很好");else {
    if (_0x2a5780.userInfo.userShape == 1 || _0x2a5780.userInfo.userShape == 2) {
      console.log("  猫状态 状态异常，待解除");
      console.log("➡️开始 解除状态");
      await wakeUpCat(_0x2a5780.userInfo.userShape);
      await $.wait(2 * 1000);
    } else {
      if (_0x2a5780.userInfo.userShape == 4) {
        return console.log("  猫状态 猫猫出门旅行了"), lx_status = false;
      } else console.log(_0x2a5780.message);
    }
  }
  if (_0x2a5780.userInfo.familyBucketStatus != 1) console.log("➡️开始 领取小鱼干"), await familyBucket(), await $.wait(2 * 1000);else console.log("  已领取每日小鱼干");
  if (_0x2a5780.travelInfo.travelStatus == 2) {
    await $.wait(2000);
    await getBackpack();
  } else {
    if (_0x2a5780.travelInfo.travelStatus == 1) return console.log(" 【旅行】旅行中,结束时间:" + _0x2a5780.travelInfo.endTime + " "), lx_status = false;else console.log("  未旅行，背包无奖励 ");
  }
}
async function getBackpack() {
  let _0x283a3c = {
      "url": newurl + "travel/getBackpack",
      "headers": qlm_headers,
      "body": "{}"
    },
    _0x106c97 = await httpPost(_0x283a3c, "打开旅行背包");
  if (!_0x106c97.code) {
    log("  城市" + _0x106c97.city.province + "-" + _0x106c97.city.address + "-" + _0x106c97.city.name + ",喵币: " + _0x106c97.itemInfo.name + ",碎片: " + _0x106c97.fragment.name + _0x106c97.fragment.limit + "个,纪念品: " + _0x106c97.keepsake.name);
    msg += "  城市" + _0x106c97.city.province + "-" + _0x106c97.city.address + "-" + _0x106c97.city.name + ",喵币: " + _0x106c97.itemInfo.name + ",碎片: " + _0x106c97.fragment.name + _0x106c97.fragment.limit + "个,纪念品: " + _0x106c97.keepsake.name;
  } else console.log(" " + resultmessage), msg += " " + resultmessage;
}
async function tasklist() {
  let _0x385a95 = {
      "url": newurl + "missions",
      "headers": qlm_headers
    },
    _0x5f5b25 = await httpGet(_0x385a95, "获取任务列表"),
    _0x215e92 = _0x5f5b25.missions;
  for (let _0x29f1f4 = 0; _0x29f1f4 < _0x215e92.length; _0x29f1f4++) {
    let _0x58f873 = _0x215e92[_0x29f1f4].state,
      _0x3c8fcf = _0x215e92[_0x29f1f4].id,
      _0x3418c8 = _0x215e92[_0x29f1f4].title,
      _0x4bcb71 = _0x215e92[_0x29f1f4].progress,
      _0x21b4e8 = _0x215e92[_0x29f1f4].total,
      _0x3b7140 = Number(_0x21b4e8) - Number(_0x4bcb71);
    if (_0x58f873 == 1) {
      log(" " + _0x3418c8 + ": 任务未完成,开始执行任务");
      if (_0x21b4e8 = 4) for (let _0x3614c5 = 0; _0x3614c5 < _0x3b7140; _0x3614c5++) {
        await dotask(_0x3c8fcf);
        await $.wait(2000);
        await dotask_prize(_0x3c8fcf, _0x3418c8);
        await $.wait(2000);
      } else await dotask(_0x3c8fcf), await $.wait(2000), await dotask_prize(_0x3c8fcf, _0x3418c8), await $.wait(1000);
    } else {
      if (_0x58f873 == 2) {
        log("  " + _0x3418c8 + ": 任务已完成,待领取奖励");
        if (_0x21b4e8 > 1) {
          for (let _0x328e1e = 0; _0x328e1e < _0x3b7140; _0x328e1e++) {
            await dotask(_0x3c8fcf);
            await $.wait(2000);
            await dotask_prize(_0x3c8fcf, _0x3418c8);
            await $.wait(2000);
          }
        } else await dotask_prize(_0x3c8fcf, _0x3418c8), await $.wait(2000);
      } else _0x58f873 == 3 ? (log("  " + _0x3418c8 + ": 任务已完成,已领取奖励"), msg += "  " + _0x3418c8 + ": 任务已完成,已领取奖励\n") : log(" 没有可执行的任务了,明天再来吧~!");
    }
  }
}
async function dotask(_0x5dc930) {
  let _0x5e57fc = {
    "url": newurl + "missions/accomplishMission",
    "headers": qlm_headers,
    "body": "{\"missionsId\":" + _0x5dc930 + "}"
  };
  return new Promise(_0x515006 => {
    $.post(_0x5e57fc, async (_0x5cded3, _0x5d50ad, _0x45ff3f) => {
      try {
        debug && (log("\n\n 【debug】===============这是 返回data=============="), log("======"));
        let _0x3e88d7 = JSON.parse(_0x45ff3f);
        _0x3e88d7 == undefined ? log(" 任务已执行，待领取奖励 ") : log(_0x3e88d7.msg);
      } catch (_0x268371) {} finally {
        _0x515006();
      }
    });
  });
}
async function dotask_prize(_0x2a9939, _0x420712) {
  let _0x38f53f = {
      "url": newurl + "missions/receiveReward",
      "headers": qlm_headers,
      "body": JSON.stringify({
        "missionsId": _0x2a9939
      })
    },
    _0x5d7ce9 = await httpPost(_0x38f53f, "任务-领取任务奖励");
  if (!_0x5d7ce9.code) log(" " + _0x420712 + ":已完成,收取" + _0x5d7ce9.fishNum + "小鱼干  "), msg += " " + _0x420712 + ":已完成, 成功收取" + _0x5d7ce9.fishNum + "小鱼干 \n";else log(_0x5d7ce9.message);
}
async function wakeUpCat(_0x97ccc) {
  let _0x51e596 = {
      "url": newurl + "users/wakeUpCat",
      "headers": qlm_headers,
      "body": "{\"userShape\":" + _0x97ccc + ",\"userId\":0}"
    },
    _0x79acc6 = await httpPost(_0x51e596, "解除状态");
  if (_0x79acc6.userShape != null) log("  已解除猫猫状态"), msg += "  已解除猫猫状态 \n";else log(_0x79acc6.message);
}
async function familyBucket() {
  let _0x6b697e = {
      "url": newurl + "users/familyBucket",
      "headers": qlm_headers,
      "body": "{}"
    },
    _0x41edd9 = await httpPost(_0x6b697e, "领每日小鱼干");
  if (!_0x41edd9.code) log("  领取小鱼干：Lv:" + _0x41edd9.fishNum + ",已领取：" + _0x41edd9.dayStatus + "天"), msg += "  领取小鱼干：Lv:" + _0x41edd9.fishNum + ",已领取：" + _0x41edd9.dayStatus + "天\n";else log(_0x41edd9.message);
}
async function getfish(_0x2fd3fb) {
  let _0xdec43c = {
      "url": newurl + "users/getFish",
      "headers": qlm_headers
    },
    _0x3bf595 = await httpGet(_0xdec43c, "获取小鱼干数量");
  if (_0x3bf595.fishNum != null) log("  小鱼干数量：Lv:" + _0x3bf595.fishNum), msg += "  小鱼干数量：Lv:" + _0x3bf595.fishNum;else log(_0x3bf595.message);
}
async function levelup() {
  let _0x203fd1 = {
      "url": newurl + "levelup",
      "headers": qlm_headers,
      "body": "{}"
    },
    _0x3b8140 = await httpPost(_0x203fd1, "喂小鱼干");
  if (_0x3b8140.isLevelUp == false) log("  猫猫等级:Lv" + _0x3b8140.updateUserInfo.level + ",当前经验值:" + _0x3b8140.updateUserInfo.levelExp + "，剩余小鱼干:" + _0x3b8140.updateUserInfo.fishNum + " "), msg += "  猫猫等级:Lv" + _0x3b8140.updateUserInfo.level + ",当前经验值:" + _0x3b8140.updateUserInfo.levelExp + "，剩余小鱼干:" + _0x3b8140.updateUserInfo.fishNum + "\n";else {
    if (_0x3b8140.isLevelUp == true) _0x3b8140.nextLevelInfo.reward.itemType == "fishNum" ? (log("  猫猫已升级Lv" + _0x3b8140.updateUserInfo.level + "，奖励:" + _0x3b8140.nextLevelInfo.reward.itemNum + "小鱼干"), msg += "  猫猫已升级Lv" + _0x3b8140.updateUserInfo.level + "，奖励:" + _0x3b8140.nextLevelInfo.reward.itemNum + "小鱼干\n") : (log("  猫猫已升级Lv" + _0x3b8140.updateUserInfo.level + "，奖励说明:" + _0x3b8140.nextLevelInfo.reward), msg += " 猫猫已升级Lv" + _0x3b8140.updateUserInfo.level + "，请到小程序查看奖励\n");else log(_0x3b8140.message);
  }
}
async function rollCat() {
  let _0x2f839d = {
      "url": newurl + "captures/rollCat",
      "headers": qlm_headers,
      "body": "{\"limit\":\"7\",\"isFirst\":0,\"sign\":\"33E72CB7A27777D215542D19C6BB7DCB\"}"
    },
    _0x10bc0c = Math.ceil((100 - moodNum) / 7),
    _0xfe398c = 0;
  log("  猫猫心情值:" + moodNum + ",将撸猫:" + _0x10bc0c + "次 ");
  msg += "  猫猫心情值:" + moodNum + ",将撸猫:" + _0x10bc0c + "次 \n";
  for (let _0x6c25e4 = 0; _0x6c25e4 < _0x10bc0c; _0x6c25e4++) {
    let _0x13014a = await httpPost(_0x2f839d, "撸一下猫猫");
    if (_0x13014a.code != 400) {
      log("  猫猫增加心情值:" + _0x13014a.moodInfo.moodNum + ",收获喵币：" + _0x13014a.coinInfo.coin);
      msg += "  猫猫增加心情值:" + _0x13014a.moodInfo.moodNum + ",收获喵币：" + _0x13014a.coinInfo.coin + "\n";
      _0xfe398c = _0xfe398c + Number(_0x13014a.coinInfo.coin);
      await $.wait(2000);
    } else {
      log("  " + _0x13014a.message);
      break;
    }
  }
}
async function rollingDice() {
  let _0x53cbdc = {
      "url": newurl + "travel/rollingDice",
      "headers": qlm_headers,
      "body": "{\"steps\":0}"
    },
    _0x113b14 = 1,
    _0x56e9c0 = 0;
  for (; _0x113b14 > _0x56e9c0;) {
    await $.wait(2000);
    let _0x4bd493 = await httpPost(_0x53cbdc, "丢骰子");
    if (_0x4bd493.code == 400) {
      log("  " + _0x4bd493.message);
      _0x56e9c0 = 1;
      if (travelStatus == 1) log("  ❌旅行中，无法进行其他动作❗"), msg += "  ❌旅行中，无法进行其他动作❗\n";else {
        if (travelStatus == 4) log("  ❌猫猫今天太累了，明天再出门吧❗ \n"), msg += "  ❌猫猫今天太累了，明天再出门吧❗ \n";else {
          log("====>开始 猫猫旅行");
          msg += "====>开始 猫猫旅行 \n";
          await goTravel();
          await $.wait(2000);
        }
      }
    } else log("  【丢骰子】步数:" + _0x4bd493.diceNum + ";奖品状态:" + _0x4bd493.itemType + ";格子id:" + _0x4bd493.rewardInfo.latticeId + ";获取食物id:" + _0x4bd493.rewardInfo.prop + ";食物数量:" + _0x4bd493.rewardInfo.propNum);
  }
}
async function goTravel() {
  await getfood();
  await $.wait(1000);
  let _0x2e5727 = {
      "url": newurl + "travel/goTravel",
      "headers": qlm_headers,
      "body": fooddata
    },
    _0x2eab8b = await httpPost(_0x2e5727, "开始旅行");
  log(_0x2eab8b);
  if (_0x2eab8b.code == 200) log("  旅行状态:" + _0x2eab8b.msg), msg += "  旅行状态:" + _0x2eab8b.msg + "\n";else {
    if (_0x2eab8b.code == 400) log("  旅行状态:" + _0x2eab8b.message), msg += "  旅行状态:" + _0x2eab8b.message + "\n";else log(_0x2eab8b.message);
  }
}
async function getfood() {
  let _0x49cd38 = {
      "url": newurl + "travel/food",
      "headers": qlm_headers
    },
    _0x27dac4 = await httpGet(_0x49cd38, "食物背包"),
    _0x5411a3 = _0x27dac4.foodList;
  if (_0x5411a3.length >= 1) {
    log("====>背包检测:背包食物足够,将开始旅行");
    msg += "====>背包检测:背包食物足够,将开始旅行\n";
    foodId = _0x5411a3[0].foodId;
    foodlv = _0x5411a3[0].level;
    fooddata = "{\"foodInfo\":[{\"foodId\":" + foodId + ",\"level\":" + foodlv + "}]}";
  } else log("====>背包检测:食物不够1份,不满足旅行"), msg += "====>背包检测:食物不够1份,不满足旅行\n";
}
async function getCks(_0x2700a6, _0x1aec80) {
  return new Promise(_0x1984d1 => {
    let _0x3a56f2 = [];
    if (_0x2700a6) {
      if (_0x2700a6.indexOf("@") !== -1) _0x2700a6.split("@").forEach(_0x182cd6 => {
        _0x3a56f2.push(_0x182cd6);
      });else _0x2700a6.indexOf("\n") !== -1 ? _0x2700a6.split("\n").forEach(_0x593dcb => {
        _0x3a56f2.push(_0x593dcb);
      }) : _0x3a56f2.push(_0x2700a6);
      _0x1984d1(_0x3a56f2);
    } else console.log("\n 【" + $.name + "】：未填写变量 " + _0x1aec80);
  });
}
async function SendMsg(_0x2fcfc1) {
  if (!_0x2fcfc1) return;
  if (Notify > 0) {
    if ($.isNode()) {
      let _0x399594 = require("./sendNotify");
      await _0x399594.sendNotify($.name, _0x2fcfc1);
    } else $.msg(_0x2fcfc1);
  } else console.log(_0x2fcfc1);
}
async function httpGet(_0xd25c29, _0x49cbfb, _0x555361 = 3 * 1000) {
  return new Promise(_0x4f4b07 => {
    let _0x10cfab = _0xd25c29;
    if (!_0x49cbfb) {
      let _0x21423f = arguments.callee.toString(),
        _0x4bc795 = /function\s*(\w*)/i,
        _0x45862a = _0x4bc795.exec(_0x21423f);
      _0x49cbfb = _0x45862a[1];
    }
    debug && (console.log("\n 【debug】=============== 这是 " + _0x49cbfb + " 请求 url ==============="), console.log(_0x10cfab));
    $.get(_0x10cfab, async (_0x548411, _0x3a5d8e, _0x2419b3) => {
      try {
        debug && (console.log("\n\n 【debug】===============这是 " + _0x49cbfb + " 返回data=============="), console.log(_0x2419b3), console.log("======"), console.log(JSON.parse(_0x2419b3)));
        let _0x391149 = JSON.parse(_0x2419b3);
        _0x4f4b07(_0x391149);
      } catch (_0x58d4c7) {
        console.log(_0x548411, _0x3a5d8e);
        console.log("\n " + _0x49cbfb + " 失败了!请稍后尝试!!");
        msg += "\n " + _0x49cbfb + " 失败了!请稍后尝试!!";
      } finally {
        _0x4f4b07();
      }
    }, _0x555361);
  });
}
async function httpPost(_0x58f648, _0x2c16ee, _0x55815d = 3 * 1000) {
  return new Promise(_0x5a6a98 => {
    let _0x46d4b8 = _0x58f648;
    if (!_0x2c16ee) {
      let _0x7a5c51 = arguments.callee.toString(),
        _0x5beeb5 = /function\s*(\w*)/i,
        _0x39964f = _0x5beeb5.exec(_0x7a5c51);
      _0x2c16ee = _0x39964f[1];
    }
    debug && (console.log("\n 【debug】=============== 这是 " + _0x2c16ee + " 请求 url ==============="), console.log(_0x46d4b8));
    $.post(_0x46d4b8, async (_0x4e0f35, _0x33071c, _0x1b826c) => {
      try {
        debug && (console.log("\n\n 【debug】===============这是 " + _0x2c16ee + " 返回data=============="), console.log(_0x1b826c), console.log("======"), console.log(JSON.parse(_0x1b826c)));
        let _0x461fa8 = JSON.parse(_0x1b826c);
        _0x5a6a98(_0x461fa8);
      } catch (_0x4fed09) {
        console.log(_0x4e0f35, _0x33071c);
        console.log("\n " + _0x2c16ee + " 失败了!请稍后尝试!!");
        msg += "\n " + _0x2c16ee + " 失败了!请稍后尝试!!";
      } finally {
        _0x5a6a98();
      }
    }, _0x55815d);
  });
}
function debugLog(..._0x38a9bc) {
  debug && console.log(..._0x38a9bc);
}
function MD5Encrypt(_0x2e3f91) {
  function _0x23dfd1(_0x3004f9, _0x13f142) {
    return _0x3004f9 << _0x13f142 | _0x3004f9 >>> 32 - _0x13f142;
  }
  function _0x31ded9(_0x44e1af, _0x2a4660) {
    var _0x1e733e, _0x667e58, _0x3e9745, _0x5ab5a3, _0x4123e6;
    return _0x3e9745 = 2147483648 & _0x44e1af, _0x5ab5a3 = 2147483648 & _0x2a4660, _0x1e733e = 1073741824 & _0x44e1af, _0x667e58 = 1073741824 & _0x2a4660, _0x4123e6 = (1073741823 & _0x44e1af) + (1073741823 & _0x2a4660), _0x1e733e & _0x667e58 ? 2147483648 ^ _0x4123e6 ^ _0x3e9745 ^ _0x5ab5a3 : _0x1e733e | _0x667e58 ? 1073741824 & _0x4123e6 ? 3221225472 ^ _0x4123e6 ^ _0x3e9745 ^ _0x5ab5a3 : 1073741824 ^ _0x4123e6 ^ _0x3e9745 ^ _0x5ab5a3 : _0x4123e6 ^ _0x3e9745 ^ _0x5ab5a3;
  }
  function _0x35e569(_0x564ad7, _0x3fb5f2, _0x5a1d98) {
    return _0x564ad7 & _0x3fb5f2 | ~_0x564ad7 & _0x5a1d98;
  }
  function _0x1ad963(_0x19b19c, _0x57988d, _0x4ba3fe) {
    return _0x19b19c & _0x4ba3fe | _0x57988d & ~_0x4ba3fe;
  }
  function _0x46c146(_0x4bacab, _0x45ed38, _0x41b55e) {
    return _0x4bacab ^ _0x45ed38 ^ _0x41b55e;
  }
  function _0x5111ec(_0x2ea02b, _0x502cc2, _0x2efa77) {
    return _0x502cc2 ^ (_0x2ea02b | ~_0x2efa77);
  }
  function _0xd82ad(_0x375556, _0x29571b, _0x37acbf, _0x2cc47e, _0x16220f, _0x50961c, _0x4d9172) {
    return _0x375556 = _0x31ded9(_0x375556, _0x31ded9(_0x31ded9(_0x35e569(_0x29571b, _0x37acbf, _0x2cc47e), _0x16220f), _0x4d9172)), _0x31ded9(_0x23dfd1(_0x375556, _0x50961c), _0x29571b);
  }
  function _0x19ee98(_0x49e829, _0x4a4659, _0x81dc8b, _0x37e072, _0x812698, _0x59e952, _0x1bdae1) {
    return _0x49e829 = _0x31ded9(_0x49e829, _0x31ded9(_0x31ded9(_0x1ad963(_0x4a4659, _0x81dc8b, _0x37e072), _0x812698), _0x1bdae1)), _0x31ded9(_0x23dfd1(_0x49e829, _0x59e952), _0x4a4659);
  }
  function _0x1824ef(_0x4942c7, _0x14188c, _0x200a63, _0x1e923f, _0xbfe495, _0xf26769, _0x2e5ccf) {
    return _0x4942c7 = _0x31ded9(_0x4942c7, _0x31ded9(_0x31ded9(_0x46c146(_0x14188c, _0x200a63, _0x1e923f), _0xbfe495), _0x2e5ccf)), _0x31ded9(_0x23dfd1(_0x4942c7, _0xf26769), _0x14188c);
  }
  function _0x48b072(_0x6d2570, _0x218b41, _0x16da14, _0x2b9f75, _0x3698d4, _0x3a2723, _0x36d06f) {
    return _0x6d2570 = _0x31ded9(_0x6d2570, _0x31ded9(_0x31ded9(_0x5111ec(_0x218b41, _0x16da14, _0x2b9f75), _0x3698d4), _0x36d06f)), _0x31ded9(_0x23dfd1(_0x6d2570, _0x3a2723), _0x218b41);
  }
  function _0x49b4be(_0x5ab028) {
    for (var _0x4adf23, _0xf6b196 = _0x5ab028.length, _0x4fe59b = _0xf6b196 + 8, _0x4a52bc = (_0x4fe59b - _0x4fe59b % 64) / 64, _0x43510d = 16 * (_0x4a52bc + 1), _0x5efb5d = new Array(_0x43510d - 1), _0x160f55 = 0, _0x3a361a = 0; _0xf6b196 > _0x3a361a;) _0x4adf23 = (_0x3a361a - _0x3a361a % 4) / 4, _0x160f55 = _0x3a361a % 4 * 8, _0x5efb5d[_0x4adf23] = _0x5efb5d[_0x4adf23] | _0x5ab028.charCodeAt(_0x3a361a) << _0x160f55, _0x3a361a++;
    return _0x4adf23 = (_0x3a361a - _0x3a361a % 4) / 4, _0x160f55 = _0x3a361a % 4 * 8, _0x5efb5d[_0x4adf23] = _0x5efb5d[_0x4adf23] | 128 << _0x160f55, _0x5efb5d[_0x43510d - 2] = _0xf6b196 << 3, _0x5efb5d[_0x43510d - 1] = _0xf6b196 >>> 29, _0x5efb5d;
  }
  function _0x5dc8ee(_0x69cae) {
    var _0x2aa2b3,
      _0x2e66ab,
      _0x5d118a = "",
      _0x17a825 = "";
    for (_0x2e66ab = 0; 3 >= _0x2e66ab; _0x2e66ab++) _0x2aa2b3 = _0x69cae >>> 8 * _0x2e66ab & 255, _0x17a825 = "0" + _0x2aa2b3.toString(16), _0x5d118a += _0x17a825.substr(_0x17a825.length - 2, 2);
    return _0x5d118a;
  }
  function _0x1c8a41(_0x13fcb6) {
    _0x13fcb6 = _0x13fcb6.replace(/\r\n/g, "\n");
    for (var _0x16311f = "", _0x47afa8 = 0; _0x47afa8 < _0x13fcb6.length; _0x47afa8++) {
      var _0x342099 = _0x13fcb6.charCodeAt(_0x47afa8);
      128 > _0x342099 ? _0x16311f += String.fromCharCode(_0x342099) : _0x342099 > 127 && 2048 > _0x342099 ? (_0x16311f += String.fromCharCode(_0x342099 >> 6 | 192), _0x16311f += String.fromCharCode(63 & _0x342099 | 128)) : (_0x16311f += String.fromCharCode(_0x342099 >> 12 | 224), _0x16311f += String.fromCharCode(_0x342099 >> 6 & 63 | 128), _0x16311f += String.fromCharCode(63 & _0x342099 | 128));
    }
    return _0x16311f;
  }
  var _0x4a1fca,
    _0x8fb1b7,
    _0x32934e,
    _0x2ff94f,
    _0xd70e15,
    _0x350e47,
    _0x2eaa42,
    _0x55a3e6,
    _0x1e5e30,
    _0x23b461 = [],
    _0x28fec9 = 7,
    _0x8f04e0 = 12,
    _0x20b880 = 17,
    _0x5a2f43 = 22,
    _0xac495f = 5,
    _0x3e31f1 = 9,
    _0x4a9b4d = 14,
    _0x4e19d1 = 20,
    _0xaa1262 = 4,
    _0x5ed5b7 = 11,
    _0x3900c4 = 16,
    _0x452428 = 23,
    _0x57a1dd = 6,
    _0x464cd0 = 10,
    _0x1b2668 = 15,
    _0x5c19d8 = 21;
  for (_0x2e3f91 = _0x1c8a41(_0x2e3f91), _0x23b461 = _0x49b4be(_0x2e3f91), _0x350e47 = 1732584193, _0x2eaa42 = 4023233417, _0x55a3e6 = 2562383102, _0x1e5e30 = 271733878, _0x4a1fca = 0; _0x4a1fca < _0x23b461.length; _0x4a1fca += 16) _0x8fb1b7 = _0x350e47, _0x32934e = _0x2eaa42, _0x2ff94f = _0x55a3e6, _0xd70e15 = _0x1e5e30, _0x350e47 = _0xd82ad(_0x350e47, _0x2eaa42, _0x55a3e6, _0x1e5e30, _0x23b461[_0x4a1fca + 0], _0x28fec9, 3614090360), _0x1e5e30 = _0xd82ad(_0x1e5e30, _0x350e47, _0x2eaa42, _0x55a3e6, _0x23b461[_0x4a1fca + 1], _0x8f04e0, 3905402710), _0x55a3e6 = _0xd82ad(_0x55a3e6, _0x1e5e30, _0x350e47, _0x2eaa42, _0x23b461[_0x4a1fca + 2], _0x20b880, 606105819), _0x2eaa42 = _0xd82ad(_0x2eaa42, _0x55a3e6, _0x1e5e30, _0x350e47, _0x23b461[_0x4a1fca + 3], _0x5a2f43, 3250441966), _0x350e47 = _0xd82ad(_0x350e47, _0x2eaa42, _0x55a3e6, _0x1e5e30, _0x23b461[_0x4a1fca + 4], _0x28fec9, 4118548399), _0x1e5e30 = _0xd82ad(_0x1e5e30, _0x350e47, _0x2eaa42, _0x55a3e6, _0x23b461[_0x4a1fca + 5], _0x8f04e0, 1200080426), _0x55a3e6 = _0xd82ad(_0x55a3e6, _0x1e5e30, _0x350e47, _0x2eaa42, _0x23b461[_0x4a1fca + 6], _0x20b880, 2821735955), _0x2eaa42 = _0xd82ad(_0x2eaa42, _0x55a3e6, _0x1e5e30, _0x350e47, _0x23b461[_0x4a1fca + 7], _0x5a2f43, 4249261313), _0x350e47 = _0xd82ad(_0x350e47, _0x2eaa42, _0x55a3e6, _0x1e5e30, _0x23b461[_0x4a1fca + 8], _0x28fec9, 1770035416), _0x1e5e30 = _0xd82ad(_0x1e5e30, _0x350e47, _0x2eaa42, _0x55a3e6, _0x23b461[_0x4a1fca + 9], _0x8f04e0, 2336552879), _0x55a3e6 = _0xd82ad(_0x55a3e6, _0x1e5e30, _0x350e47, _0x2eaa42, _0x23b461[_0x4a1fca + 10], _0x20b880, 4294925233), _0x2eaa42 = _0xd82ad(_0x2eaa42, _0x55a3e6, _0x1e5e30, _0x350e47, _0x23b461[_0x4a1fca + 11], _0x5a2f43, 2304563134), _0x350e47 = _0xd82ad(_0x350e47, _0x2eaa42, _0x55a3e6, _0x1e5e30, _0x23b461[_0x4a1fca + 12], _0x28fec9, 1804603682), _0x1e5e30 = _0xd82ad(_0x1e5e30, _0x350e47, _0x2eaa42, _0x55a3e6, _0x23b461[_0x4a1fca + 13], _0x8f04e0, 4254626195), _0x55a3e6 = _0xd82ad(_0x55a3e6, _0x1e5e30, _0x350e47, _0x2eaa42, _0x23b461[_0x4a1fca + 14], _0x20b880, 2792965006), _0x2eaa42 = _0xd82ad(_0x2eaa42, _0x55a3e6, _0x1e5e30, _0x350e47, _0x23b461[_0x4a1fca + 15], _0x5a2f43, 1236535329), _0x350e47 = _0x19ee98(_0x350e47, _0x2eaa42, _0x55a3e6, _0x1e5e30, _0x23b461[_0x4a1fca + 1], _0xac495f, 4129170786), _0x1e5e30 = _0x19ee98(_0x1e5e30, _0x350e47, _0x2eaa42, _0x55a3e6, _0x23b461[_0x4a1fca + 6], _0x3e31f1, 3225465664), _0x55a3e6 = _0x19ee98(_0x55a3e6, _0x1e5e30, _0x350e47, _0x2eaa42, _0x23b461[_0x4a1fca + 11], _0x4a9b4d, 643717713), _0x2eaa42 = _0x19ee98(_0x2eaa42, _0x55a3e6, _0x1e5e30, _0x350e47, _0x23b461[_0x4a1fca + 0], _0x4e19d1, 3921069994), _0x350e47 = _0x19ee98(_0x350e47, _0x2eaa42, _0x55a3e6, _0x1e5e30, _0x23b461[_0x4a1fca + 5], _0xac495f, 3593408605), _0x1e5e30 = _0x19ee98(_0x1e5e30, _0x350e47, _0x2eaa42, _0x55a3e6, _0x23b461[_0x4a1fca + 10], _0x3e31f1, 38016083), _0x55a3e6 = _0x19ee98(_0x55a3e6, _0x1e5e30, _0x350e47, _0x2eaa42, _0x23b461[_0x4a1fca + 15], _0x4a9b4d, 3634488961), _0x2eaa42 = _0x19ee98(_0x2eaa42, _0x55a3e6, _0x1e5e30, _0x350e47, _0x23b461[_0x4a1fca + 4], _0x4e19d1, 3889429448), _0x350e47 = _0x19ee98(_0x350e47, _0x2eaa42, _0x55a3e6, _0x1e5e30, _0x23b461[_0x4a1fca + 9], _0xac495f, 568446438), _0x1e5e30 = _0x19ee98(_0x1e5e30, _0x350e47, _0x2eaa42, _0x55a3e6, _0x23b461[_0x4a1fca + 14], _0x3e31f1, 3275163606), _0x55a3e6 = _0x19ee98(_0x55a3e6, _0x1e5e30, _0x350e47, _0x2eaa42, _0x23b461[_0x4a1fca + 3], _0x4a9b4d, 4107603335), _0x2eaa42 = _0x19ee98(_0x2eaa42, _0x55a3e6, _0x1e5e30, _0x350e47, _0x23b461[_0x4a1fca + 8], _0x4e19d1, 1163531501), _0x350e47 = _0x19ee98(_0x350e47, _0x2eaa42, _0x55a3e6, _0x1e5e30, _0x23b461[_0x4a1fca + 13], _0xac495f, 2850285829), _0x1e5e30 = _0x19ee98(_0x1e5e30, _0x350e47, _0x2eaa42, _0x55a3e6, _0x23b461[_0x4a1fca + 2], _0x3e31f1, 4243563512), _0x55a3e6 = _0x19ee98(_0x55a3e6, _0x1e5e30, _0x350e47, _0x2eaa42, _0x23b461[_0x4a1fca + 7], _0x4a9b4d, 1735328473), _0x2eaa42 = _0x19ee98(_0x2eaa42, _0x55a3e6, _0x1e5e30, _0x350e47, _0x23b461[_0x4a1fca + 12], _0x4e19d1, 2368359562), _0x350e47 = _0x1824ef(_0x350e47, _0x2eaa42, _0x55a3e6, _0x1e5e30, _0x23b461[_0x4a1fca + 5], _0xaa1262, 4294588738), _0x1e5e30 = _0x1824ef(_0x1e5e30, _0x350e47, _0x2eaa42, _0x55a3e6, _0x23b461[_0x4a1fca + 8], _0x5ed5b7, 2272392833), _0x55a3e6 = _0x1824ef(_0x55a3e6, _0x1e5e30, _0x350e47, _0x2eaa42, _0x23b461[_0x4a1fca + 11], _0x3900c4, 1839030562), _0x2eaa42 = _0x1824ef(_0x2eaa42, _0x55a3e6, _0x1e5e30, _0x350e47, _0x23b461[_0x4a1fca + 14], _0x452428, 4259657740), _0x350e47 = _0x1824ef(_0x350e47, _0x2eaa42, _0x55a3e6, _0x1e5e30, _0x23b461[_0x4a1fca + 1], _0xaa1262, 2763975236), _0x1e5e30 = _0x1824ef(_0x1e5e30, _0x350e47, _0x2eaa42, _0x55a3e6, _0x23b461[_0x4a1fca + 4], _0x5ed5b7, 1272893353), _0x55a3e6 = _0x1824ef(_0x55a3e6, _0x1e5e30, _0x350e47, _0x2eaa42, _0x23b461[_0x4a1fca + 7], _0x3900c4, 4139469664), _0x2eaa42 = _0x1824ef(_0x2eaa42, _0x55a3e6, _0x1e5e30, _0x350e47, _0x23b461[_0x4a1fca + 10], _0x452428, 3200236656), _0x350e47 = _0x1824ef(_0x350e47, _0x2eaa42, _0x55a3e6, _0x1e5e30, _0x23b461[_0x4a1fca + 13], _0xaa1262, 681279174), _0x1e5e30 = _0x1824ef(_0x1e5e30, _0x350e47, _0x2eaa42, _0x55a3e6, _0x23b461[_0x4a1fca + 0], _0x5ed5b7, 3936430074), _0x55a3e6 = _0x1824ef(_0x55a3e6, _0x1e5e30, _0x350e47, _0x2eaa42, _0x23b461[_0x4a1fca + 3], _0x3900c4, 3572445317), _0x2eaa42 = _0x1824ef(_0x2eaa42, _0x55a3e6, _0x1e5e30, _0x350e47, _0x23b461[_0x4a1fca + 6], _0x452428, 76029189), _0x350e47 = _0x1824ef(_0x350e47, _0x2eaa42, _0x55a3e6, _0x1e5e30, _0x23b461[_0x4a1fca + 9], _0xaa1262, 3654602809), _0x1e5e30 = _0x1824ef(_0x1e5e30, _0x350e47, _0x2eaa42, _0x55a3e6, _0x23b461[_0x4a1fca + 12], _0x5ed5b7, 3873151461), _0x55a3e6 = _0x1824ef(_0x55a3e6, _0x1e5e30, _0x350e47, _0x2eaa42, _0x23b461[_0x4a1fca + 15], _0x3900c4, 530742520), _0x2eaa42 = _0x1824ef(_0x2eaa42, _0x55a3e6, _0x1e5e30, _0x350e47, _0x23b461[_0x4a1fca + 2], _0x452428, 3299628645), _0x350e47 = _0x48b072(_0x350e47, _0x2eaa42, _0x55a3e6, _0x1e5e30, _0x23b461[_0x4a1fca + 0], _0x57a1dd, 4096336452), _0x1e5e30 = _0x48b072(_0x1e5e30, _0x350e47, _0x2eaa42, _0x55a3e6, _0x23b461[_0x4a1fca + 7], _0x464cd0, 1126891415), _0x55a3e6 = _0x48b072(_0x55a3e6, _0x1e5e30, _0x350e47, _0x2eaa42, _0x23b461[_0x4a1fca + 14], _0x1b2668, 2878612391), _0x2eaa42 = _0x48b072(_0x2eaa42, _0x55a3e6, _0x1e5e30, _0x350e47, _0x23b461[_0x4a1fca + 5], _0x5c19d8, 4237533241), _0x350e47 = _0x48b072(_0x350e47, _0x2eaa42, _0x55a3e6, _0x1e5e30, _0x23b461[_0x4a1fca + 12], _0x57a1dd, 1700485571), _0x1e5e30 = _0x48b072(_0x1e5e30, _0x350e47, _0x2eaa42, _0x55a3e6, _0x23b461[_0x4a1fca + 3], _0x464cd0, 2399980690), _0x55a3e6 = _0x48b072(_0x55a3e6, _0x1e5e30, _0x350e47, _0x2eaa42, _0x23b461[_0x4a1fca + 10], _0x1b2668, 4293915773), _0x2eaa42 = _0x48b072(_0x2eaa42, _0x55a3e6, _0x1e5e30, _0x350e47, _0x23b461[_0x4a1fca + 1], _0x5c19d8, 2240044497), _0x350e47 = _0x48b072(_0x350e47, _0x2eaa42, _0x55a3e6, _0x1e5e30, _0x23b461[_0x4a1fca + 8], _0x57a1dd, 1873313359), _0x1e5e30 = _0x48b072(_0x1e5e30, _0x350e47, _0x2eaa42, _0x55a3e6, _0x23b461[_0x4a1fca + 15], _0x464cd0, 4264355552), _0x55a3e6 = _0x48b072(_0x55a3e6, _0x1e5e30, _0x350e47, _0x2eaa42, _0x23b461[_0x4a1fca + 6], _0x1b2668, 2734768916), _0x2eaa42 = _0x48b072(_0x2eaa42, _0x55a3e6, _0x1e5e30, _0x350e47, _0x23b461[_0x4a1fca + 13], _0x5c19d8, 1309151649), _0x350e47 = _0x48b072(_0x350e47, _0x2eaa42, _0x55a3e6, _0x1e5e30, _0x23b461[_0x4a1fca + 4], _0x57a1dd, 4149444226), _0x1e5e30 = _0x48b072(_0x1e5e30, _0x350e47, _0x2eaa42, _0x55a3e6, _0x23b461[_0x4a1fca + 11], _0x464cd0, 3174756917), _0x55a3e6 = _0x48b072(_0x55a3e6, _0x1e5e30, _0x350e47, _0x2eaa42, _0x23b461[_0x4a1fca + 2], _0x1b2668, 718787259), _0x2eaa42 = _0x48b072(_0x2eaa42, _0x55a3e6, _0x1e5e30, _0x350e47, _0x23b461[_0x4a1fca + 9], _0x5c19d8, 3951481745), _0x350e47 = _0x31ded9(_0x350e47, _0x8fb1b7), _0x2eaa42 = _0x31ded9(_0x2eaa42, _0x32934e), _0x55a3e6 = _0x31ded9(_0x55a3e6, _0x2ff94f), _0x1e5e30 = _0x31ded9(_0x1e5e30, _0xd70e15);
  var _0x2dca5c = _0x5dc8ee(_0x350e47) + _0x5dc8ee(_0x2eaa42) + _0x5dc8ee(_0x55a3e6) + _0x5dc8ee(_0x1e5e30);
  return _0x2dca5c.toLowerCase();
}
function Env(_0x3f3cf4, _0x18708e) {
  "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
  class _0x50080a {
    constructor(_0x26be5d) {
      this.env = _0x26be5d;
    }
    ["send"](_0x30c4d9, _0x152d50 = "GET") {
      _0x30c4d9 = "string" == typeof _0x30c4d9 ? {
        "url": _0x30c4d9
      } : _0x30c4d9;
      let _0x3429fe = this.get;
      return "POST" === _0x152d50 && (_0x3429fe = this.post), new Promise((_0x1e7774, _0x340c5e) => {
        _0x3429fe.call(this, _0x30c4d9, (_0x31de70, _0x38e3c7, _0x9746d9) => {
          _0x31de70 ? _0x340c5e(_0x31de70) : _0x1e7774(_0x38e3c7);
        });
      });
    }
    ["get"](_0xaed17b) {
      return this.send.call(this.env, _0xaed17b);
    }
    ["post"](_0x593dd7) {
      return this.send.call(this.env, _0x593dd7, "POST");
    }
  }
  return new class {
    constructor(_0x1a8aa0, _0x36147d) {
      this.name = _0x1a8aa0;
      this.http = new _0x50080a(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.startTime = new Date().getTime();
      Object.assign(this, _0x36147d);
      this.log("", "🔔" + this.name + ", 开始!");
    }
    ["isNode"]() {
      return "undefined" != typeof module && !!module.exports;
    }
    ["isQuanX"]() {
      return "undefined" != typeof $task;
    }
    ["isSurge"]() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }
    ["isLoon"]() {
      return "undefined" != typeof $loon;
    }
    ["toObj"](_0x152e07, _0x2585a2 = null) {
      try {
        return JSON.parse(_0x152e07);
      } catch {
        return _0x2585a2;
      }
    }
    ["toStr"](_0x4d337e, _0x5c5b89 = null) {
      try {
        return JSON.stringify(_0x4d337e);
      } catch {
        return _0x5c5b89;
      }
    }
    ["getjson"](_0x1d6236, _0x52dfe8) {
      let _0x53501c = _0x52dfe8;
      const _0x14f53f = this.getdata(_0x1d6236);
      if (_0x14f53f) try {
        _0x53501c = JSON.parse(this.getdata(_0x1d6236));
      } catch {}
      return _0x53501c;
    }
    ["setjson"](_0x5af9bc, _0x2ef9ed) {
      try {
        return this.setdata(JSON.stringify(_0x5af9bc), _0x2ef9ed);
      } catch {
        return !1;
      }
    }
    ["getScript"](_0x4ba75f) {
      return new Promise(_0x34d18a => {
        this.get({
          "url": _0x4ba75f
        }, (_0x3c4df5, _0x13b2c7, _0x221037) => _0x34d18a(_0x221037));
      });
    }
    ["runScript"](_0x58f075, _0x13a1e4) {
      return new Promise(_0x4dade2 => {
        let _0x598444 = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        _0x598444 = _0x598444 ? _0x598444.replace(/\n/g, "").trim() : _0x598444;
        let _0xda89e9 = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        _0xda89e9 = _0xda89e9 ? 1 * _0xda89e9 : 20;
        _0xda89e9 = _0x13a1e4 && _0x13a1e4.timeout ? _0x13a1e4.timeout : _0xda89e9;
        const [_0x3615ad, _0x40c3bc] = _0x598444.split("@"),
          _0x4acc82 = {
            "url": "http://" + _0x40c3bc + "/v1/scripting/evaluate",
            "body": {
              "script_text": _0x58f075,
              "mock_type": "cron",
              "timeout": _0xda89e9
            },
            "headers": {
              "X-Key": _0x3615ad,
              "Accept": "*/*"
            }
          };
        this.post(_0x4acc82, (_0x5d3144, _0x181542, _0x55d638) => _0x4dade2(_0x55d638));
      }).catch(_0x21a50c => this.logErr(_0x21a50c));
    }
    ["loaddata"]() {
      if (!this.isNode()) return {};
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x111931 = this.path.resolve(this.dataFile),
          _0x5a075b = this.path.resolve(process.cwd(), this.dataFile),
          _0x7ea5a0 = this.fs.existsSync(_0x111931),
          _0x334688 = !_0x7ea5a0 && this.fs.existsSync(_0x5a075b);
        if (!_0x7ea5a0 && !_0x334688) return {};
        {
          const _0xe291e = _0x7ea5a0 ? _0x111931 : _0x5a075b;
          try {
            return JSON.parse(this.fs.readFileSync(_0xe291e));
          } catch (_0x26c5e8) {
            return {};
          }
        }
      }
    }
    ["writedata"]() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x45c2c8 = this.path.resolve(this.dataFile),
          _0x2f3030 = this.path.resolve(process.cwd(), this.dataFile),
          _0x3fa173 = this.fs.existsSync(_0x45c2c8),
          _0x1cde68 = !_0x3fa173 && this.fs.existsSync(_0x2f3030),
          _0xdbb2d0 = JSON.stringify(this.data);
        _0x3fa173 ? this.fs.writeFileSync(_0x45c2c8, _0xdbb2d0) : _0x1cde68 ? this.fs.writeFileSync(_0x2f3030, _0xdbb2d0) : this.fs.writeFileSync(_0x45c2c8, _0xdbb2d0);
      }
    }
    ["lodash_get"](_0x41604b, _0x25e58a, _0x4d8ebd) {
      const _0x41231c = _0x25e58a.replace(/\[(\d+)\]/g, ".$1").split(".");
      let _0x100b64 = _0x41604b;
      for (const _0x3f927d of _0x41231c) if (_0x100b64 = Object(_0x100b64)[_0x3f927d], void 0 === _0x100b64) return _0x4d8ebd;
      return _0x100b64;
    }
    ["lodash_set"](_0x30b363, _0x3a0c88, _0x48bf59) {
      return Object(_0x30b363) !== _0x30b363 ? _0x30b363 : (Array.isArray(_0x3a0c88) || (_0x3a0c88 = _0x3a0c88.toString().match(/[^.[\]]+/g) || []), _0x3a0c88.slice(0, -1).reduce((_0x3b1441, _0x4d8e9f, _0x41da43) => Object(_0x3b1441[_0x4d8e9f]) === _0x3b1441[_0x4d8e9f] ? _0x3b1441[_0x4d8e9f] : _0x3b1441[_0x4d8e9f] = Math.abs(_0x3a0c88[_0x41da43 + 1]) >> 0 == +_0x3a0c88[_0x41da43 + 1] ? [] : {}, _0x30b363)[_0x3a0c88[_0x3a0c88.length - 1]] = _0x48bf59, _0x30b363);
    }
    ["getdata"](_0xa4300a) {
      let _0x3bb074 = this.getval(_0xa4300a);
      if (/^@/.test(_0xa4300a)) {
        const [, _0x138ccd, _0x165240] = /^@(.*?)\.(.*?)$/.exec(_0xa4300a),
          _0x11ef67 = _0x138ccd ? this.getval(_0x138ccd) : "";
        if (_0x11ef67) try {
          const _0x31c508 = JSON.parse(_0x11ef67);
          _0x3bb074 = _0x31c508 ? this.lodash_get(_0x31c508, _0x165240, "") : _0x3bb074;
        } catch (_0xb9a599) {
          _0x3bb074 = "";
        }
      }
      return _0x3bb074;
    }
    ["setdata"](_0x5cd002, _0x284d40) {
      let _0xc9deef = false;
      if (/^@/.test(_0x284d40)) {
        const [, _0x1a4af8, _0x23a19a] = /^@(.*?)\.(.*?)$/.exec(_0x284d40),
          _0x32eccf = this.getval(_0x1a4af8),
          _0x1cc912 = _0x1a4af8 ? "null" === _0x32eccf ? null : _0x32eccf || "{}" : "{}";
        try {
          const _0x243795 = JSON.parse(_0x1cc912);
          this.lodash_set(_0x243795, _0x23a19a, _0x5cd002);
          _0xc9deef = this.setval(JSON.stringify(_0x243795), _0x1a4af8);
        } catch (_0x1e65c3) {
          const _0x278559 = {};
          this.lodash_set(_0x278559, _0x23a19a, _0x5cd002);
          _0xc9deef = this.setval(JSON.stringify(_0x278559), _0x1a4af8);
        }
      } else _0xc9deef = this.setval(_0x5cd002, _0x284d40);
      return _0xc9deef;
    }
    ["getval"](_0x91f468) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(_0x91f468) : this.isQuanX() ? $prefs.valueForKey(_0x91f468) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x91f468]) : this.data && this.data[_0x91f468] || null;
    }
    ["setval"](_0x25554c, _0x3a96d1) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(_0x25554c, _0x3a96d1) : this.isQuanX() ? $prefs.setValueForKey(_0x25554c, _0x3a96d1) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x3a96d1] = _0x25554c, this.writedata(), !0) : this.data && this.data[_0x3a96d1] || null;
    }
    ["initGotEnv"](_0x29c13b) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      _0x29c13b && (_0x29c13b.headers = _0x29c13b.headers ? _0x29c13b.headers : {}, void 0 === _0x29c13b.headers.Cookie && void 0 === _0x29c13b.cookieJar && (_0x29c13b.cookieJar = this.ckjar));
    }
    ["get"](_0x2776c3, _0x50009b = () => {}) {
      _0x2776c3.headers && (delete _0x2776c3.headers["Content-Type"], delete _0x2776c3.headers["Content-Length"]);
      this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (_0x2776c3.headers = _0x2776c3.headers || {}, Object.assign(_0x2776c3.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(_0x2776c3, (_0x5b203d, _0x51f77f, _0x250ec3) => {
        !_0x5b203d && _0x51f77f && (_0x51f77f.body = _0x250ec3, _0x51f77f.statusCode = _0x51f77f.status);
        _0x50009b(_0x5b203d, _0x51f77f, _0x250ec3);
      })) : this.isQuanX() ? (this.isNeedRewrite && (_0x2776c3.opts = _0x2776c3.opts || {}, Object.assign(_0x2776c3.opts, {
        "hints": !1
      })), $task.fetch(_0x2776c3).then(_0x6f2936 => {
        const {
          statusCode: _0x15e34b,
          statusCode: _0x5651ef,
          headers: _0x5c133e,
          body: _0x847b1c
        } = _0x6f2936;
        _0x50009b(null, {
          "status": _0x15e34b,
          "statusCode": _0x5651ef,
          "headers": _0x5c133e,
          "body": _0x847b1c
        }, _0x847b1c);
      }, _0x4db5d6 => _0x50009b(_0x4db5d6))) : this.isNode() && (this.initGotEnv(_0x2776c3), this.got(_0x2776c3).on("redirect", (_0x3cc76c, _0x1f3f5c) => {
        try {
          if (_0x3cc76c.headers["set-cookie"]) {
            const _0x5e6c6a = _0x3cc76c.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            _0x5e6c6a && this.ckjar.setCookieSync(_0x5e6c6a, null);
            _0x1f3f5c.cookieJar = this.ckjar;
          }
        } catch (_0x4dbc8f) {
          this.logErr(_0x4dbc8f);
        }
      }).then(_0x2d36c1 => {
        const {
          statusCode: _0x42c6b2,
          statusCode: _0x5542f0,
          headers: _0x5c8dde,
          body: _0x3e0001
        } = _0x2d36c1;
        _0x50009b(null, {
          "status": _0x42c6b2,
          "statusCode": _0x5542f0,
          "headers": _0x5c8dde,
          "body": _0x3e0001
        }, _0x3e0001);
      }, _0x20ad06 => {
        const {
          message: _0x39a5ee,
          response: _0x27f08d
        } = _0x20ad06;
        _0x50009b(_0x39a5ee, _0x27f08d, _0x27f08d && _0x27f08d.body);
      }));
    }
    ["post"](_0x22ee9f, _0x283e9d = () => {}) {
      if (_0x22ee9f.body && _0x22ee9f.headers && !_0x22ee9f.headers["Content-Type"] && (_0x22ee9f.headers["Content-Type"] = "application/json"), _0x22ee9f.headers && delete _0x22ee9f.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (_0x22ee9f.headers = _0x22ee9f.headers || {}, Object.assign(_0x22ee9f.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.post(_0x22ee9f, (_0x26d16d, _0x3075c6, _0x3c287d) => {
        !_0x26d16d && _0x3075c6 && (_0x3075c6.body = _0x3c287d, _0x3075c6.statusCode = _0x3075c6.status);
        _0x283e9d(_0x26d16d, _0x3075c6, _0x3c287d);
      });else {
        if (this.isQuanX()) _0x22ee9f.method = "POST", this.isNeedRewrite && (_0x22ee9f.opts = _0x22ee9f.opts || {}, Object.assign(_0x22ee9f.opts, {
          "hints": !1
        })), $task.fetch(_0x22ee9f).then(_0x53183d => {
          const {
            statusCode: _0x4c1374,
            statusCode: _0x1b4353,
            headers: _0x556e69,
            body: _0x15cd57
          } = _0x53183d;
          _0x283e9d(null, {
            "status": _0x4c1374,
            "statusCode": _0x1b4353,
            "headers": _0x556e69,
            "body": _0x15cd57
          }, _0x15cd57);
        }, _0x25ecc2 => _0x283e9d(_0x25ecc2));else {
          if (this.isNode()) {
            this.initGotEnv(_0x22ee9f);
            const {
              url: _0x46c431,
              ..._0x2f35c1
            } = _0x22ee9f;
            this.got.post(_0x46c431, _0x2f35c1).then(_0x33b8b7 => {
              const {
                statusCode: _0x25f647,
                statusCode: _0x20dde7,
                headers: _0x2e8de0,
                body: _0x1afbaa
              } = _0x33b8b7;
              _0x283e9d(null, {
                "status": _0x25f647,
                "statusCode": _0x20dde7,
                "headers": _0x2e8de0,
                "body": _0x1afbaa
              }, _0x1afbaa);
            }, _0x1d9e8c => {
              const {
                message: _0x5dd1bc,
                response: _0x5be0cf
              } = _0x1d9e8c;
              _0x283e9d(_0x5dd1bc, _0x5be0cf, _0x5be0cf && _0x5be0cf.body);
            });
          }
        }
      }
    }
    ["time"](_0x111412, _0xcbd676 = null) {
      const _0x32b125 = _0xcbd676 ? new Date(_0xcbd676) : new Date();
      let _0xb9185d = {
        "M+": _0x32b125.getMonth() + 1,
        "d+": _0x32b125.getDate(),
        "H+": _0x32b125.getHours(),
        "m+": _0x32b125.getMinutes(),
        "s+": _0x32b125.getSeconds(),
        "q+": Math.floor((_0x32b125.getMonth() + 3) / 3),
        "S": _0x32b125.getMilliseconds()
      };
      /(y+)/.test(_0x111412) && (_0x111412 = _0x111412.replace(RegExp.$1, (_0x32b125.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let _0x135518 in _0xb9185d) new RegExp("(" + _0x135518 + ")").test(_0x111412) && (_0x111412 = _0x111412.replace(RegExp.$1, 1 == RegExp.$1.length ? _0xb9185d[_0x135518] : ("00" + _0xb9185d[_0x135518]).substr(("" + _0xb9185d[_0x135518]).length)));
      return _0x111412;
    }
    ["msg"](_0x5b6495 = _0x3f3cf4, _0x318b92 = "", _0x482bbe = "", _0x401476) {
      const _0x13b5ce = _0x532b8a => {
        if (!_0x532b8a) return _0x532b8a;
        if ("string" == typeof _0x532b8a) return this.isLoon() ? _0x532b8a : this.isQuanX() ? {
          "open-url": _0x532b8a
        } : this.isSurge() ? {
          "url": _0x532b8a
        } : void 0;
        if ("object" == typeof _0x532b8a) {
          if (this.isLoon()) {
            let _0x25aee9 = _0x532b8a.openUrl || _0x532b8a.url || _0x532b8a["open-url"],
              _0x859f15 = _0x532b8a.mediaUrl || _0x532b8a["media-url"];
            return {
              "openUrl": _0x25aee9,
              "mediaUrl": _0x859f15
            };
          }
          if (this.isQuanX()) {
            let _0x27307d = _0x532b8a["open-url"] || _0x532b8a.url || _0x532b8a.openUrl,
              _0x48ef1f = _0x532b8a["media-url"] || _0x532b8a.mediaUrl;
            return {
              "open-url": _0x27307d,
              "media-url": _0x48ef1f
            };
          }
          if (this.isSurge()) {
            let _0xc7b71 = _0x532b8a.url || _0x532b8a.openUrl || _0x532b8a["open-url"];
            return {
              "url": _0xc7b71
            };
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(_0x5b6495, _0x318b92, _0x482bbe, _0x13b5ce(_0x401476)) : this.isQuanX() && $notify(_0x5b6495, _0x318b92, _0x482bbe, _0x13b5ce(_0x401476))), !this.isMuteLog) {
        let _0x281c1b = ["", "==============📣系统通知📣=============="];
        _0x281c1b.push(_0x5b6495);
        _0x318b92 && _0x281c1b.push(_0x318b92);
        _0x482bbe && _0x281c1b.push(_0x482bbe);
        console.log(_0x281c1b.join("\n"));
        this.logs = this.logs.concat(_0x281c1b);
      }
    }
    ["log"](..._0x17ce78) {
      _0x17ce78.length > 0 && (this.logs = [...this.logs, ..._0x17ce78]);
      console.log(_0x17ce78.join(this.logSeparator));
    }
    ["logErr"](_0x4cb2bd, _0x214bd6) {
      const _0x26981e = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      _0x26981e ? this.log("", "❗️" + this.name + ", 错误!", _0x4cb2bd.stack) : this.log("", "❗️" + this.name + ", 错误!", _0x4cb2bd);
    }
    ["wait"](_0xb64920) {
      return new Promise(_0x49a4fe => setTimeout(_0x49a4fe, _0xb64920));
    }
    ["done"](_0x1dddd4 = {}) {
      const _0x287edf = new Date().getTime(),
        _0x585d51 = (_0x287edf - this.startTime) / 1000;
      this.log("", "🔔" + this.name + ", 结束! 🕛 " + _0x585d51 + " 秒");
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(_0x1dddd4);
    }
  }(_0x3f3cf4, _0x18708e);
}