
将 OpenClaw 接入飞书是一个非常实用的选择。得益于 OpenClaw 内置的官方飞书插件以及**长连接（WebSocket）**机制，你完全不需要准备带有公网 IP 的服务器或配置复杂的 Webhook，直接在本地或内网环境就能跑通。

以下是完整的 Channels 配置文件配置与接入流程：

### 第一步：在飞书端准备应用并获取凭证

1. 登录 [飞书开放平台](https://open.feishu.cn/app)，点击**创建企业自建应用**。
    
2. 在左侧导航栏找到“添加应用能力”，添加**机器人 (Bot)** 能力。
    
3. 进入**权限管理**，搜索并开通以下核心权限（为了方便后续发文件或读文档，建议一并开通相关权限）：
    
    - `im:message` (获取单聊、群聊消息)
        
    - `im:message.group_at_msg` (获取群组中 @ 机器人的消息)
        
    - `im:message.p2p_msg` (获取用户发给机器人的单聊消息)
        
    - `aily:file:read` / `aily:file:write` (文件读写权限)
        
4. 进入**版本管理与发布**，创建并发布一个新版本，让权限生效。
    
5. 在**凭证与基础信息**页面，记下你的 **App ID**（通常以 `cli_` 开头）和 **App Secret**。
    

---

### 第二步：在 OpenClaw 中配置 Channels

你可以通过命令行快捷配置，也可以直接修改配置文件，两者效果相同。

**方法 A：通过命令行写入（推荐，最不容易出错）**

在你的终端中运行以下命令，将凭证写入 OpenClaw 即可：

Bash

```
openclaw config set channels.feishu.enabled true --json
openclaw config set channels.feishu.appId "cli_你的AppID"
openclaw config set channels.feishu.appSecret "你的AppSecret"
```

**方法 B：直接修改 JSON 配置文件**

如果你更喜欢手动改文件，请找到 OpenClaw 的全局配置文件（通常位于 `~/.openclaw/config.json` 或你的 Workspace 目录下），在 `channels` 对象中补充 `feishu` 节点：

JSON

```
{
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "cli_你的AppID",
      "appSecret": "你的AppSecret"
    }
  }
}
```

> **非常重要：** 配置写好后，必须**重启 OpenClaw 的网关**，让应用拿着密钥去向飞书发起握手。
> 
> 执行命令：`openclaw gateway restart`

---

### 第三步：在飞书端开启长连接与事件订阅

飞书的规则是**“必须先让机器人在线并验证身份，才能配置长连接订阅”**。既然上一步我们已经重启了 Gateway，现在就可以去开启订阅了：

1. 回到飞书开放平台，进入左侧的**事件与回调**。
    
2. 找到**订阅方式**，将其修改为 **“使用长连接接收事件”**。 _(切勿选择 Webhook，否则会导致无法接收消息)_
    
3. 在下方点击“添加事件”，搜索并添加 `im.message.receive_v1`（接收消息）事件。
    
4. 点击保存。
    

---

### 第四步：检查与验证运行状态

在终端中输入状态检查命令：

Bash

```
openclaw status
```

如果配置正确，你应该能在返回的表格面板中看到飞书通道点亮：

| **渠道 (Channel)** | **状态 (Status)** | **健康度 (Health)** | **备注 (Notes)** |
| ---------------- | --------------- | ---------------- | -------------- |
| Feishu           | ON              | OK               | configured     |
|                  |                 |                  |                |


- 有可能会遇到 【飞书中设置使用 长连接 接收事件】失败的情况，有可能是下面的原因：

> [!NOTE]
> **OpenClaw 的飞书插件根本没有加载成功，因此长连接（WebSocket）没有建立。**
> 
> 日志中的核心报错是这一句： `Error: Cannot find module '@larksuiteoapi/node-sdk'`
> 
> 这意味着你的 OpenClaw 环境中缺少了飞书官方的 Node.js SDK 依赖包。我们需要手动将这个缺失的依赖安装上。
> 
> 以下是修复这个问题的具体步骤：
> 
> ### 1. 安装缺失的依赖包
> 
> 你的 OpenClaw 是安装在 `/opt/homebrew/` 下的（通常是 macOS 的 Homebrew 环境）。你需要进入 OpenClaw 的根目录并安装这个飞书模块。
> 
> 打开终端，依次执行以下命令：
> 
>1. 进入 OpenClaw 的全局安装目录
> cd /opt/homebrew/lib/node_modules/openclaw/
> 
> 2. 安装缺失的飞书 SDK
> npm install @larksuiteoapi/node-sdk
>
> 
> _(注：由于你是通过 Homebrew 安装的 Node，通常不需要加 `sudo`，直接执行即可。)_
> 
> ### 2. 重启 OpenClaw 服务
> 
> 依赖安装完成后，当前的 OpenClaw 进程不会自动识别，你必须重启 OpenClaw 的 gateway 或主服务。
>
> 
> 根据你的启动方式重启 OpenClaw，例如：
> 如果你是用 pm2 管理的：pm2 restart openclaw
> 如果是直接运行的，请先 Ctrl+C 终止，然后重新启动
> 
> 
> ### 3. 观察启动日志
> 
> 重启后，再次查看 OpenClaw 的日志。 如果修复成功，你不应该再看到 `[plugins] feishu failed to load` 的报错。你应该能看到类似“feishu plugin loaded”或“websocket connected”的成功提示。
> 
> ### 4. 在飞书后台重新保存
> 
> 确认 OpenClaw 端没有报错且正在运行后：
> 
> 3. 回到飞书开发者后台的“事件订阅”页面。
>     
> 4. 确保选择的是“长连接”。
>     
> 5. 再次点击**保存**。这一次飞书就能成功检测到 OpenClaw 建立的连接了。


- 飞书中给机器人发送消息后，有时候会报错回复
```

OpenClaw: access not configured.

Your Feishu user id: ou_b4b13f080ae93b7d6f7805778de28b24

Pairing code: VVZTK29W

Ask the bot owner to approve with:ope
```

解决方式：

> [!NOTE]
> 问题在于 OpenClaw 默认开启了安全限制，**不允许未经授权的用户直接私聊调用你的自建大模型**（毕竟大模型算力宝贵，需要防止被乱刷）。
> 
> 在群聊里能回复，很可能是因为群聊的鉴权逻辑不同（比如允许群内所有人使用，或者你之前已经授权过那个群组），而单聊（P2P）时，OpenClaw 发现你的飞书 User ID (`ou_b4b13f080ae93b7d6f7805778de28b24`) 不在它的私聊白名单里，所以拦截了请求并要求进行“配对认证”（Pairing）。
> 
> ##### 解决步骤：执行配对授权命令
> 
> 系统已经把放行命令告诉你了，你只需要以管理员身份执行这条命令即可：
> 
> `openclaw pairing approve feishu VVZTK29W`



