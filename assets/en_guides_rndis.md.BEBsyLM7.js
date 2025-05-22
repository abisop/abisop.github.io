import{_ as n,c as a,al as e,o as p}from"./chunks/framework.NFAqBSgQ.js";const h=JSON.parse('{"title":"How to use RNDIS","description":"","frontmatter":{},"headers":[],"relativePath":"en/guides/rndis.md","filePath":"en/guides/rndis.md"}'),t={name:"en/guides/rndis.md"};function i(o,s,l,c,r,d){return p(),a("div",null,s[0]||(s[0]=[e(`<h1 id="how-to-use-rndis" tabindex="-1">How to use RNDIS <a class="header-anchor" href="#how-to-use-rndis" aria-label="Permalink to &quot;How to use RNDIS&quot;">​</a></h1><p>This guide explains the steps needed to get USB RNDIS working, using the STM32F4Discovery board as example.</p><p>If you don&#39;t know RNDIS, it is a way to share Ethernet-like connection over USB port without using any external device to it. Just a USB cable between your board (that has USB Device) and your computer.</p><p>WARNING: RNDIS is going to be removed from Linux kernel because they understand it as an insecure protocol. That said use it aware of this risk and also be aware that it was tested up to Ubuntu 22.04 LTS and couldn&#39;t work in future versions.</p><h2 id="compiling" tabindex="-1">Compiling <a class="header-anchor" href="#compiling" aria-label="Permalink to &quot;Compiling&quot;">​</a></h2><ol><li><p>Configure the RNDIS</p><p>There is a sample configuration to use RNDIS on stm32f4discovery board. If your board doesn&#39;t save a sample example then you need to create a configuration by yourself looking this config.</p><p>Just use <code>stm32f4discovery:rndis</code> board profile for this purpose.</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> cd nuttx</span></span>
<span class="line"><span> ./tools/configure.sh stm32f4discovery:rndis</span></span></code></pre></div></blockquote></li><li><p>Compile</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> make -j</span></span></code></pre></div></blockquote></li></ol><h2 id="flashing" tabindex="-1">Flashing <a class="header-anchor" href="#flashing" aria-label="Permalink to &quot;Flashing&quot;">​</a></h2><ol><li><p>Flash the generated nuttx.bin to your board:</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  sudo openocd -f interface/stlink.cfg -f target/stm32f4x.cfg -c init -c &quot;reset halt&quot; -c &quot;flash write_image erase nuttx.bin 0x08000000&quot;</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>Open On-Chip Debugger 0.11.0</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>Info : STLINK V2J14S0 (API v2) VID:PID 0483:3748</span></span>
<span class="line"><span>Info : Target voltage: 3.203144</span></span>
<span class="line"><span>Info : stm32f4x.cpu: hardware has 6 breakpoints, 4 watchpoints</span></span>
<span class="line"><span>Info : starting gdb server for stm32f4x.cpu on 3333</span></span>
<span class="line"><span>Info : Listening on port 3333 for gdb connections</span></span>
<span class="line"><span>target halted due to debug-request, current mode: Thread </span></span>
<span class="line"><span>xPSR: 0x01000000 pc: 0x08000188 msp: 0x20003f24</span></span>
<span class="line"><span>Info : device id = 0x10036413</span></span>
<span class="line"><span>Info : flash size = 1024 kbytes</span></span>
<span class="line"><span>auto erase enabled</span></span>
<span class="line"><span>wrote 262144 bytes from file nuttx.bin in 11.043253s (23.182 KiB/s)</span></span>
<span class="line"><span>Info : Listening on port 6666 for tcl connections</span></span>
<span class="line"><span>Info : Listening on port 4444 for telnet connections</span></span></code></pre></div></blockquote></li></ol><h2 id="setup-rndis-in-your-computer" tabindex="-1">Setup RNDIS in your computer <a class="header-anchor" href="#setup-rndis-in-your-computer" aria-label="Permalink to &quot;Setup RNDIS in your computer&quot;">​</a></h2><blockquote><p>These steps show how to connect your board to your Linux machine.</p></blockquote><p>Add Mac and Windows instructions</p><ol><li><p>Reset your board</p></li><li><p>Plug a USB cable from the STM32F4Discovery&#39;s microUSB to your computer</p></li><li><p>Confirm that your board was detected as a USB RNDIS device:</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> dmesg</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>[ 1099.821480] usb 3-3: new full-speed USB device number 12 using xhci_hcd</span></span>
<span class="line"><span>[ 1099.972379] usb 3-3: New USB device found, idVendor=584e, idProduct=5342, bcdDevice= 0.01</span></span>
<span class="line"><span>[ 1099.972389] usb 3-3: New USB device strings: Mfr=1, Product=2, SerialNumber=3</span></span>
<span class="line"><span>[ 1099.972393] usb 3-3: Product: RNDIS gadget</span></span>
<span class="line"><span>[ 1099.972396] usb 3-3: Manufacturer: NuttX</span></span>
<span class="line"><span>[ 1099.972398] usb 3-3: SerialNumber: 1234</span></span>
<span class="line"><span>[ 1099.988952] usbcore: registered new interface driver cdc_ether</span></span>
<span class="line"><span>[ 1099.990144] rndis_host 3-3:1.0: skipping garbage</span></span>
<span class="line"><span>[ 1099.990641] rndis_host 3-3:1.0: dev can&#39;t take 1558 byte packets (max 660), adjusting MTU to 602</span></span>
<span class="line"><span>[ 1099.992089] rndis_host 3-3:1.0 eth0: register &#39;rndis_host&#39; at usb-0000:00:14.0-3, RNDIS device, a0:e0:de:ad:ca:fe</span></span>
<span class="line"><span>[ 1099.992102] usbcore: registered new interface driver rndis_host</span></span>
<span class="line"><span>[ 1099.994026] usbcore: registered new interface driver rndis_wlan</span></span>
<span class="line"><span>[ 1099.997001] rndis_host 3-3:1.0 enxa0e0deadcafe: renamed from eth0</span></span></code></pre></div></blockquote></li><li><p>Configure your Linux distro to share network to this USB RNDIS device:</p><p>Click in the top right corner of your Ubuntu and go to:</p><p>NuttX Ethernet -&gt; Wired Settings</p><p>Click in the &#39;Gear icon&#39; and in the tab &quot;IPv4&quot; select: &quot;Shared to other computers&quot;</p><p>Click on &quot;Apply&quot;</p><p>Disconnect and connect the USB cable to force it to get IP.</p></li><li><p>Identify what IP address your board got:</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> tail -f /var/log/syslog</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>Jan 28 10:30:24 dev dnsmasq-dhcp[35526]: DHCPDISCOVER(enxa0e0deadcafe) 00:e0:de:ad:ca:fe </span></span>
<span class="line"><span>Jan 28 10:30:24 dev dnsmasq-dhcp[35526]: DHCPOFFER(enxa0e0deadcafe) 10.42.0.86 00:e0:de:ad:ca:fe </span></span>
<span class="line"><span>Jan 28 10:30:24 dev dnsmasq-dhcp[35526]: DHCPREQUEST(enxa0e0deadcafe) 10.42.0.86 00:e0:de:ad:ca:fe </span></span>
<span class="line"><span>Jan 28 10:30:24 dev dnsmasq-dhcp[35526]: DHCPACK(enxa0e0deadcafe) 10.42.0.86 00:e0:de:ad:ca:fe nuttx</span></span>
<span class="line"><span>Jan 28 10:30:29 dev systemd[1]: NetworkManager-dispatcher.service: Deactivated successfully.</span></span>
<span class="line"><span>^C</span></span></code></pre></div></blockquote></li><li><p>Ping this IP to confirm it is working:</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> ping 10.42.0.86</span></span>
<span class="line"><span>PING 10.42.0.86 (10.42.0.86) 56(84) bytes of data.</span></span>
<span class="line"><span>64 bytes from 10.42.0.86: icmp_seq=1 ttl=64 time=0.809 ms</span></span>
<span class="line"><span>64 bytes from 10.42.0.86: icmp_seq=2 ttl=64 time=0.849 ms</span></span>
<span class="line"><span>^C</span></span>
<span class="line"><span>--- 10.42.0.86 ping statistics ---</span></span>
<span class="line"><span>2 packets transmitted, 2 received, 0% packet loss, time 1027ms</span></span>
<span class="line"><span>rtt min/avg/max/mdev = 0.809/0.829/0.849/0.020 ms</span></span></code></pre></div></blockquote></li><li><p>Connect to your board over telnet:</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> telnet 10.42.0.86</span></span>
<span class="line"><span>Trying 10.42.0.86...</span></span>
<span class="line"><span>Connected to 10.42.0.86.</span></span>
<span class="line"><span>Escape character is &#39;^]&#39;.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>NuttShell (NSH) NuttX-12.0.0</span></span>
<span class="line"><span>nsh&gt;</span></span></code></pre></div></blockquote></li></ol>`,12)]))}const g=n(t,[["render",i]]);export{h as __pageData,g as default};
