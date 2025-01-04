

命令：
	- -f指定nginx日志文件路径（默认日志格式）
	- -o指定生成的路径位置
 ```
goaccess -f /usr/local/openresty/nginx/logs/access.log \
         --log-format='%h %^ %^ [%d:%t %^] "%r" %s %b "%R" "%u"' \
         --date-format='%d/%b/%Y' \
         --time-format='%T' \
         -o /usr/local/openresty/nginx/html/goc.html

```