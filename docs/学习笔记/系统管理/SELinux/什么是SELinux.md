
参考：https://redhat.com/zh/topics/linux/what-is-selinux

## SELinux 简介

在centos中，selinux是“Security Enhanced Linux”的缩写，是安全加强的linux，是一个linux内核模块，也是linux的一个安全子系统；SELinux主要作用是最大限度地减小系统中服务进程可访问的资源。

安全增强型 Linux（SELinux）是一种采用[安全](https://www.redhat.com/zh/topics/security)架构的 [Linux® 系统](https://www.redhat.com/zh/topics/linux/what-is-linux)，它能够让管理员更好地管控哪些人可以访问系统。它最初是作为 [Linux 内核](https://www.redhat.com/zh/topics/linux/what-is-the-linux-kernel)的一系列[补丁](https://www.redhat.com/zh/topics/linux/what-is-linux-kernel-live-patching)，由美国国家安全局（NSA）利用 Linux 安全模块（LSM）开发而成。  

SELinux 于 2000 年发布到[开源](https://www.redhat.com/zh/topics/open-source/what-is-open-source)社区，并于 2003 年集成到上游 Linux 内核中。

[免费试用支持 SELinux 的操作系统](https://www.redhat.com/zh/technologies/linux-platforms/enterprise-linux/server/trial "产品 | 红帽企业 Linux | 试用")

## SELinux 的工作原理

SELinux 定义了每个人对系统上的应用、进程和文件的访问控制。利用安全策略（一组告知 SELinux 哪些能访问，哪些不能访问的规则）来强制执行策略所允许的访问。 

当应用或进程（称为主体）发出访问对象（如文件）的请求时，SELinux 会检查访问向量缓存（AVC），其中缓存有主体和对象的访问权限。

如果 SELinux 无法根据缓存对权限做出访问决定，它会将请求发送到安全服务器。安全服务器随即检查应用或进程和文件的安全环境，确认其是否匹配 SELinux 策略数据库的安全环境。之后便根据检查授予权限或拒绝。 

如果被拒绝，/var/log.messages 中将会显示消息"avc: denied"。

### 如何配置 SELinux

您可以通过多种方式来配置 SELinux，以保护您的系统。最常见的是目标策略或多级安全防护（MLS）。

目标策略为默认选项，它涵盖了多种流程、任务和服务。MLS 则极为复杂，通常只有政府机构才会使用。 

您可以查看 /etc/sysconfig/selinux 文件，以判断系统所采用的配置方式。该文件中有一部分会显示 SELinux 是处于允许模式、强制模式还是处于禁用状态，以及要加载哪个策略。

### SELinux 标签和类型强制访问控制

类型强制访问控制和标签是 SELinux 中最为重要的两个概念。

SELinux 可作为标签系统运行，也就是说，系统中的所有文件、进程和端口都具有与之关联的 SELinux 标签。标签可以按照逻辑将目标组合分类。在启动过程中，[内核](https://www.redhat.com/zh/topics/linux/what-is-the-linux-kernel)负责管理标签。

标签的格式为 user:role:type:level（level 为可选项）。User、role 和 level 用于类似 MLS 的更高级的 SELinux 实施中。标签类型对于目标策略而言最为重要。 

SELinux 利用类型强制访问控制来强制执行系统中定义的策略。类型强制访问控制是 SELinux 策略的一部分，它定义了特定类型的进程能否访问标记为特定类型的文件。

### 如何启用 SELinux

如果您的环境中禁用了 SELinux，则可以通过编辑 /etc/selinux/config 并设置 SELINUX=permissive 来启用 SElinux。由于 SELinux 当前尚未启用，因此最好不要将其设为立即强制执行，因为此时系统可能会出现误标记的事件，它会妨碍系统的正常启动。  

您可以在根目录中创建名为 .autorelabel 的空文件，然后重新启动，以此来强制系统自动[重新标记文件系统](https://access.redhat.com/solutions/24845)。如果系统中错误过多，应在允许模式下重新启动，以确保启动成功。重新标记所有内容后，利用 /etc/selinux/config 将 SELinux 设置为强制模式并重新启动，或运行 setenforce 1。

如果系统管理员不太熟悉命令行，还可以选择用于管理 SELinux 的图形工具。 

针对 [Linux 发行版](https://www.redhat.com/zh/topics/linux/whats-the-best-linux-distro-for-you)中内置的系统，SELinux 提供了一道额外的防护层。保持开启 SELinux，就能在系统遭到破坏时保护您的系统。

[了解红帽企业 Linux 如何帮助提升安全防护水平](https://www.redhat.com/zh/resources/expand-innovation-and-efficiency-with-linux-ebook)

## 自主访问控制（DAC）与强制访问控制（MAC）

传统上， Linux 和 UNIX 系统都采用 DAC，而 SELinux 是 Linux 采用 MAC 系统的示例。 

对于 DAC 而言，文件和进程都有相应的所有者。您可以让用户拥有某个文件，让群组拥有某个文件，或让其他人（可以是其他任何人）拥有某个文件。用户可以更改自己文件的权限。

根用户对 DAC 系统拥有完全访问控制权。如果您拥有根访问权限，则可以访问其他任何用户的文件，或在系统上执行任何操作。 

但在像 SELinux 这样的 MAC 系统上，访问权限有相应的管理设置策略。即使主目录上的 DAC 设置发生更改，SELinux 策略也会阻止其他用户或进程访问目录，从而保证系统的安全。 

SELinux 策略可以让您针对性设置，并且涵盖大量进程。您可以对 SELinux 进行更改，以限制用户、文件、目录等等之间的访问。

[操作系统为什么如此重要？](https://www.redhat.com/zh/resources/why-operating-system-matters-ebook)

## 如何处理 SELinux 错误

当 SELinux 发生错误，您需要及时采取对策。常见问题不外乎以下 4 种：

1. **标签错误。**如果标签不正确，您可以使用工具来修复标签。
2. **策略需要修复。**可能是指您需要将所做的更改通知给 SELinux，或是可能需要调整策略。您可以利用布尔值或策略模块对其进行修复。
3. **策略中存在错误。**可能是策略中存在需要消除的错误。
4. **系统已损坏。**尽管 SELinux 在很多情况下可以保护您的系统，但系统仍存在受损的可能。如果您怀疑是这种情况，请立即采取相应的措施。

### 什么是布尔值？

布尔值是 SELinux 中功能的开/关设置。开/关 SELinux 功能的设置有数百种，而且许多设置已预定义。您可以通过运行 getsebool -a，找出系统中已设置的布尔值。