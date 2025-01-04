
- 中文说明文档： https://gofrp.org/zh-cn/docs/overview/
- github：[https://github.com/fatedier/frp?tab=readme-ov-file](https://github.com/fatedier/frp?tab=readme-ov-file)


## frp 是什么？[](https://gofrp.org/zh-cn/docs/overview/#frp-%E6%98%AF%E4%BB%80%E4%B9%88)

frp 是一款高性能的反向代理应用，专注于内网穿透。它支持多种协议，包括 TCP、UDP、HTTP、HTTPS 等，并且具备 P2P 通信功能。使用 frp，您可以安全、便捷地将内网服务暴露到公网，通过拥有公网 IP 的节点进行中转。

## 为什么选择 frp？[](https://gofrp.org/zh-cn/docs/overview/#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%80%89%E6%8B%A9-frp)

通过在具有公网 IP 的节点上部署 frp 服务端，您可以轻松地将内网服务穿透到公网，并享受以下专业特性：

- 多种协议支持：客户端服务端通信支持 TCP、QUIC、KCP 和 Websocket 等多种协议。
- TCP 连接流式复用：在单个连接上承载多个请求，减少连接建立时间，降低请求延迟。
- 代理组间的负载均衡。
- 端口复用：多个服务可以通过同一个服务端端口暴露。
- P2P 通信：流量不必经过服务器中转，充分利用带宽资源。
- 客户端插件：提供多个原生支持的客户端插件，如静态文件查看、HTTPS/HTTP 协议转换、HTTP、SOCKS5 代理等，以便满足各种需求。
- 服务端插件系统：高度可扩展的服务端插件系统，便于根据自身需求进行功能扩展。
- 用户友好的 UI 页面：提供服务端和客户端的用户界面，使配置和监控变得更加方便。