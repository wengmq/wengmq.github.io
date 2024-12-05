- 内存、CPU、网卡名称/数量等这些需要按需求修改

```
<domain type='kvm' id='7'>
 <name>vm_ows_16c_16g_sys500G</name>
 <memory unit='KiB'>16777216</memory>
 <currentMemory unit='KiB'>16777216</currentMemory>
 <vcpu placement='static'>16</vcpu>
 <resource>
  <partition>/machine</partition>
 </resource>
 <os>
  <type arch='x86_64' machine='pc-i440fx-rhel7.0.0'>hvm</type>
  <boot dev='hd'/>
 </os>
 <features>
  <acpi/>
  <apic/>
 </features>
 <cpu>
  <topology sockets='2' cores='8' threads='1'/>
 </cpu>
 <clock offset='utc'>
  <timer name='rtc' tickpolicy='catchup'/>
  <timer name='pit' tickpolicy='delay'/>
  <timer name='hpet' present='no'/>
 </clock>
 <on_poweroff>destroy</on_poweroff>
 <on_reboot>restart</on_reboot>
 <on_crash>destroy</on_crash>
 <pm>
  <suspend-to-mem enabled='no'/>
  <suspend-to-disk enabled='no'/>
 </pm>
 <devices>
  <emulator>/usr/libexec/qemu-kvm</emulator>
  <disk type='file' device='disk'>
   <driver name='qemu' type='qcow2'/>
   <source file='/kvm0/iso.d/ows_sys_centos7_500G.img'/>
   <backingStore/>
   <target dev='hda' bus='ide'/>
   <alias name='ide0-0-0'/>
   <address type='drive' controller='0' bus='0' target='0' unit='0'/>
  </disk>
  <controller type='usb' index='0' model='ich9-ehci1'>
   <alias name='usb'/>
   <address type='pci' domain='0x0000' bus='0x00' slot='0x05' function='0x7'/>
  </controller>
  <controller type='usb' index='0' model='ich9-uhci1'>
   <alias name='usb'/>
   <master startport='0'/>
   <address type='pci' domain='0x0000' bus='0x00' slot='0x05' function='0x0' multifunction='on'/>
  </controller>
  <controller type='usb' index='0' model='ich9-uhci2'>
   <alias name='usb'/>
   <master startport='2'/>
   <address type='pci' domain='0x0000' bus='0x00' slot='0x05' function='0x1'/>
  </controller>
  <controller type='usb' index='0' model='ich9-uhci3'>
   <alias name='usb'/>
   <master startport='4'/>
   <address type='pci' domain='0x0000' bus='0x00' slot='0x05' function='0x2'/>
  </controller>
  <controller type='pci' index='0' model='pci-root'>
   <alias name='pci.0'/>
  </controller>
  <controller type='ide' index='0'>
   <alias name='ide'/>
   <address type='pci' domain='0x0000' bus='0x00' slot='0x01' function='0x1'/>
  </controller>
  <interface type='bridge'>
   <source bridge='kvm-br'/>
   <virtualport type='openvswitch'>
   </virtualport>
   <target dev='vnet0'/>
   <model type='virtio'/>
   <alias name='net0'/>
   <address type='pci' domain='0x0000' bus='0x00' slot='0x03' function='0x0'/>
  </interface>

  <serial type='pty'>
   <source path='/dev/pts/7'/>
   <target type='isa-serial' port='0'>
    <model name='isa-serial'/>
   </target>
   <alias name='serial0'/>
  </serial>
  <console type='pty' tty='/dev/pts/7'>
   <source path='/dev/pts/7'/>
   <target type='serial' port='0'/>
   <alias name='serial0'/>
  </console>
  <input type='mouse' bus='ps2'>
   <alias name='input0'/>
  </input>
  <input type='keyboard' bus='ps2'>
   <alias name='input1'/>
  </input>
  <graphics type='vnc' port='5900' autoport='yes' listen='127.0.0.1'>
   <listen type='address' address='127.0.0.1'/>
  </graphics>
  <video>
   <model type='cirrus' vram='16384' heads='1' primary='yes'/>
   <alias name='video0'/>
   <address type='pci' domain='0x0000' bus='0x00' slot='0x02' function='0x0'/>
  </video>
  <memballoon model='virtio'>
   <alias name='balloon0'/>
   <address type='pci' domain='0x0000' bus='0x00' slot='0x06' function='0x0'/>
  </memballoon>
 </devices>
 <seclabel type='dynamic' model='dac' relabel='yes'>
  <label>+107:+107</label>
  <imagelabel>+107:+107</imagelabel>
 </seclabel>
</domain>

```