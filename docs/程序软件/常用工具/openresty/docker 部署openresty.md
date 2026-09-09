

## docker-compose.yml文件
```yml
services:
  openresty:
    # 使用最新的官方 Alpine 稳定版镜像，内存占用极小且兼顾高性能
    image: openresty/openresty:1.31.1.1-1-alpine
    container_name: openresty
    restart: always
    
    ports:
      - "80:80"
      - "443:443"
      
    volumes:
      # 域名子配置文件目录：便于按模块/域名拆分 conf 文件
      - /opt/openresty/conf.d:/etc/nginx/conf.d
      # 日志目录持久化：保障容器重建后日志不丢失
      - /opt/openresty/logs:/usr/local/openresty/nginx/logs
      # 静态资源根目录
      - /opt/openresty/html:/usr/local/openresty/nginx/html
      # 自定义 Lua 脚本扩展目录
      - /opt/openresty/lua:/usr/local/openresty/site/lualib/custom:ro

      # 【备选方案】：若已按照“全量复制”步骤将整个 openresty 目录导出到 /opt/openresty/，
      # 可直接取消下面这行注释，并注释掉上面所有的 volumes 映射：
      # - /opt/openresty:/usr/local/openresty

    networks:
      openresty_net:
        # 在 10.20.0.0/24 网段中指定固定 IP，确保同网段其他微服务或容器可以通过静态 IP 稳定访问
        ipv4_address: 10.20.0.10

networks:
  openresty_net:
    driver: bridge
    ipam:
      driver: default
      config:
        # 显式定义网段为 10.20.0.0/24 及网关
        - subnet: 10.20.0.0/24
          gateway: 10.20.0.1

```