
```
systemctl disable cloud-init
systemctl disable cloud-config.service
systemctl disable cloud-init-local.service
systemctl disable cloud-final.service 
systemctl stop cloud-init
systemctl stop cloud-config.service
systemctl stop cloud-init-local.service
systemctl stop cloud-final.service 
rm -rf /var/lib/cloud/
rm -rf /etc/network/interfaces.d/50-cloud-init



cp /etc/netplan/50-cloud-init.yaml /etc/netplan/01-manual.yaml
echo "network: {config: disabled}" > /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg
rm /etc/netplan/50-cloud-init.yaml
netplan apply
ip a
```