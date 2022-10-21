module.exports = {
  'GET /jsbridge/weseeLive/getLiveInfo': {
    user: 'rocketliu',
  },
  'GET /jsbrdige/LAZOLOZEventHandler/getDeviceInfo' : {
    androidId: '7669b14bfd10e88f',
    appNames: 'Lazada', // 用户手机上安装的App名称，以逗号分隔
    appPackageNames: 'com.lazada.android, ctrip.android.view', // 用户手机上安装的App报名，以逗号分隔
    appSignatures: '701478a1e.....', // 用户手机上安装的App 签名信息 (MD5)
    appVersions: '3.12.5.7.1,3.6,3.7.1,....', // 用户手机上安装的App版本号，以逗号分隔
    board: 'thyme', // 主板型号名称
    brand: 'Xiaomi',
    cpuAbi: 'arm64-v8a', // cpu 指令集信息
    device: 'thyme', // 设备名称
    ethIp: '192.168.3.8', // local IP
    fingerprint: 'Xiaomi/thyme/....',
    isRoot: false, // 是否刷机取得 root 权限
    manufacturer: 'Xiaomi', // 设备制作商
    model: 'M2102J5SC',
    product: 'thyme', // 设备产品名
    trueIp: '119.123.69.123', // 外网IP，获取HTTP层的IP  （ 请求：https://ifconfig.me/ip ）
    utdid: 'YjQrR/UHEewDAKdSEBI/8u8f', // 集团内部生成的"设备号"
    imei: '', // 设备序列号
  },
  'GET /list': (req, res, ctx) => {
    return res(
      ctx.delay(2000),
      ctx.status(200),
      ctx.json({
        code: '203',
      })
    );
  },
};
