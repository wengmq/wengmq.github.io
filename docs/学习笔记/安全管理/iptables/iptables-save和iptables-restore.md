
`iptables-restore` 和 `iptables-save` 是两个用于管理 `iptables` 规则的命令，主要区别在于它们的功能：

---

### **1. iptables-save**

- **功能**：将当前 `iptables` 的规则保存到文件中，生成一个规则快照。
- **使用场景**：用于备份当前的防火墙规则，以便稍后可以恢复或在其他系统上复用。
- **输出**：规则以纯文本形式输出，格式为 `iptables-restore` 能直接解析的配置文件。

#### 示例：

将当前规则保存到 `/etc/sysconfig/iptables`：

`iptables-save > /etc/sysconfig/iptables`

保存结果类似以下内容：

*filter
:INPUT ACCEPT [0:0]
:FORWARD ACCEPT [0:0]
:OUTPUT ACCEPT [0:0]
-A INPUT -p tcp --dport 22 -j ACCEPT
COMMIT


---

### **2. iptables-restore**

- **功能**：从文件中加载 `iptables` 规则，替换当前规则。
- **使用场景**：用于恢复之前保存的规则，或者加载事先配置好的规则文件。
- **输入**：需要一个通过 `iptables-save` 或手工编写的规则文件。

#### 示例：

从 `/etc/sysconfig/iptables` 加载规则：

`iptables-restore < /etc/sysconfig/iptables`

---

### **主要区别**

|**命令**|**功能**|**用途**|
|---|---|---|
|`iptables-save`|导出当前规则为配置文件|用于备份规则或传输规则|
|`iptables-restore`|从文件导入规则，覆盖现有规则|用于恢复或应用规则文件|

---

### **常见工作流程**

1. **保存规则**：
    
    `iptables-save > /etc/sysconfig/iptables`
    
2. **修改规则文件（可选）**： 编辑 `/etc/sysconfig/iptables`，添加或修改规则。
3. **恢复规则**：
    `iptables-restore < /etc/sysconfig/iptables`
    

---

### 注意事项

1. 使用 `iptables-restore` 会覆盖当前所有规则，请确保加载的规则文件是正确的。
2. `iptables-save` 保存的规则文件是机器可读的，但可以手动编辑以调整规则。
3. `iptables-save` 和 `iptables-restore` 通常和 `/etc/sysconfig/iptables` 配合使用，用于持久化规则。