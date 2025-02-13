
- `/etc/crontab` 文件包含了系统级别的 cron 任务配置

- 使用 `sudo crontab -e` 命令编辑的文件是当前用户的 crontab 文件，而不是系统级别的文件。这个文件通常位于 `/var/spool/cron/crontabs` 目录下，以当前用户的用户名命名。例如，如果当前用户是 `root`，那么对应的 crontab 文件就是 `/var/spool/cron/crontabs/root`。

	- 注意，这个文件不应该直接手动编辑，而应该使用 `sudo crontab -e` 命令来进行编辑。这样做的原因是编辑过程中会进行一些检查，以确保文件格式正确，避免由于格式错误导致的问题。

- crontab语法：
```
# Example of job definition:
# .---------------- minute (0 - 59)
# |  .------------- hour (0 - 23)
# |  |  .---------- day of month (1 - 31)
# |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
# |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
# |  |  |  |  |
# *  *  *  *  * user-name  command to be executed

```

| 特殊<br>符号 | 描述                                                                                               |
| -------- | ------------------------------------------------------------------------------------------------ |
| *        | 代表任何时刻都接受的意思。举例来说，范例一内那个日、月、周都是*，就代表着不论何月、何日的礼拜几的12：00都执行后续命令的意思。                                |
| ,        | 代表分隔时段的意思。举例来说，如果要执行的工作是3：00与6：00时，就会是：0 3,6 * * * command时间还是有五列，不过第二列是 3,6 ，代表3与6都适用           |
| -        | 代表一段时间范围内，举例来说，8点到12点之间的每小时的20分都进行一项工作：20 8-12 * * * command仔细看到第二列变成8-12.代表 8,9,10,11,12 都适用的意思 |
| /n       | 那个n代表数字，即是每隔n单位间隔的意思，例如每五分钟进行一次，则：*/5 * * * * command用*与/5来搭配，也可以写成0-59/5，意思相同                   |

- crontab示例：

| 例子             | 描述                               |
| -------------- | -------------------------------- |
| * * * * *      | 每分钟                              |
| */5 */5 * * *  | 每隔 5 分钟, 每隔 5 小时                 |
| 1 1-10 * * *   | 在每小时的第 1 分钟, 在 01:00 和 10:59 之间  |
| 0 1,2 * * *    | 在 01:00 和 02:00                  |
| 1 2 3 4,6,10 * | 在02:01, 限每月 3 号, 仅于四月, 六月, 和 十月份 |
| 0 * L * *      | 每小时, 限每月的最后一天                    |
| 0 1 * * 0      | 在01:00, 仅星期日                     |
| 0 1 * * 7      | 在01:00, 仅星期日                     |
| 0 1 * * 1      | 在01:00, 仅星期一                     |
| 0 1 * * 2-5    | 在01:00, 星期二至星期五                  |
|                |                                  |
