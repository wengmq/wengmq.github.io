
```shell
systemctl disable cloud-init
systemctl disable cloud-config.service
systemctl disable cloud-init-local.ser
systemctl disable cloud-final.service 
systemctl stop cloud-init
systemctl stop cloud-config.service
systemctl stop cloud-init-local.ser
systemctl stop cloud-final.service 
rm -rf /var/lib/cloud/
rm -rf /etc/network/interfaces.d/50-cloud-init

sudo tee /etc/network/interfaces > /dev/null <<EOF
auto lo
iface lo inet loopback

auto eth0
iface eth0 inet static
address 192.168.1.54
netmask 255.255.255.0
 
auto eth1
iface eth1 inet static
address 82.27.183.94
netmask 255.255.255.224
gateway 82.27.183.65
dns-nameservers 8.8.8.8

EOF

sudo systemctl restart networking
sudo reboot
```