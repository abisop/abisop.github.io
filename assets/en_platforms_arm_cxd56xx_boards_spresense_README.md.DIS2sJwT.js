import{_ as n,c as o,al as t,o as s}from"./chunks/framework.NFAqBSgQ.js";const h=JSON.parse('{"title":"README","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/cxd56xx/boards/spresense/README.md","filePath":"en/platforms/arm/cxd56xx/boards/spresense/README.md"}'),a={name:"en/platforms/arm/cxd56xx/boards/spresense/README.md"};function r(i,e,d,c,p,l){return s(),o("div",null,e[0]||(e[0]=[t(`<h1 id="readme" tabindex="-1">README <a class="header-anchor" href="#readme" aria-label="Permalink to &quot;README&quot;">​</a></h1><p>Spresense is a compact development board based on Sony&#39;s power-efficient multicore microcontroller CXD5602. It allows developers to create IoT applications in a very short time and is supported by the Arduino IDE as well as the more advanced NuttX based SDK.</p><ul><li>Integrated GPS The embedded GNSS with support for GPS, QZSS and GLONASS enables applications where tracking is required.</li><li>Hi-res audio output and multi mic inputs Advanced 192kHz/24 bit audio codec and amplifier for audio output, and support for up to 8 mic input channels.</li><li>Multicore microcontroller Spresense is powered by Sony&#39;s CXD5602 microcontroller (ARM® Cortex®-M4F × 6 cores), with a clock speed of 156 MHz.</li></ul><p>Refer to <a href="https://developer.sony.com/develop/spresense/" target="_blank" rel="noreferrer">https://developer.sony.com/develop/spresense/</a> for further information about this board.</p><p>NOTICE:</p><p>To run the nuttx, bootloader for Spresense SDK 2.1.0 or later must be installed.</p><h2 id="configuration-sub-directories" tabindex="-1">Configuration sub-directories <a class="header-anchor" href="#configuration-sub-directories" aria-label="Permalink to &quot;Configuration sub-directories&quot;">​</a></h2><p>elf</p><pre><code>This is a configuration to test apps/examples/elf.
</code></pre><p>module</p><pre><code>This is a configuration to test apps/examples/module.
</code></pre><p>posix_spawn</p><pre><code>This is a configuration to test apps/examples/posix_spawn.
</code></pre><p>smp</p><pre><code>This is a configuration to run Spresense in SMP mode.
</code></pre><p>wifi</p><pre><code>This is a configuration for Spresense + Wi-Fi addon (Telit GS2200M) module.
With this configuration, (1) you can connect Spresense to an existing Wi-Fi
access point (2.4GHz 802.11b/g/n are supported) or (2) you can make
Spresense as a Wi-Fi access point. In both cases, you can login to the
Spresense with telnet, also access to a webserver (NOTE: this case you need
an extension board with microSDHC card)

(1) Station (STA) mode

To run the module in Station mode (i.e. to connect to an existing Wi-Fi
access point), You need to specify SSID with passcode.

  nsh&gt; gs2200m ssid-to-connect passcode &amp;

If the connection succeeded, IP address is statically assigned.

  nsh&gt; ifconfig
  wlan0   Link encap:Ethernet HWaddr 3c:95:09:00:69:92 at UP
  inet    addr:10.0.0.2 DRaddr:10.0.0.1 Mask:255.255.255.0

Then, you can run DHCP client (renew command) to obtain IP address as well
as DNS server information. (NOTE: In current configuration, DHCP client on
GS2200M is disabled. If you enable the internal DHCP client, you can not
use DNS client on NuttX)

  nsh&gt; renew wlan0 &amp;
  renew [6:100]
  nsh&gt; ifconfig
  wlan0   Link encap:Ethernet HWaddr 3c:95:09:00:69:92 at UP
  inet    addr:192.168.1.101 DRaddr:192.168.1.1 Mask:255.255.255.0

Now, you can run telnetd and webserver on Spresense.

  nsh&gt; telnetd &amp;
  telnetd [7:100]
  nsh&gt; webserver &amp;
  webserver [9:100]
  nsh&gt; Starting webserver

Also, you can run NTP client to adjust the RTC on Spresense. (NOTE: we
assume your network can access to pool.ntp.org, otherwise, you can specify
CONFIG_NETUTILS_NTPCLIENT_SERVER)

  nsh&gt; date
  Jan 01 00:00:36 1970
  nsh&gt; ntpcstart
  Started the NTP daemon as PID=11
  nsh&gt; date
  Jul 30 06:42:13 2019

(2) Access Point (AP) mode

To run the module in AP mode, you need to specify SSID to advertise and
WPA2-PSK passphrase or WEP-key. (NOTE: in AP mode, you can also specify
channel number to use. Also, you need to set CONFIG_WL_GS2200M_ENABLE_WEP=y
if you want to use WEP instead of WPA2-PSK)

  nsh&gt; gs2200m -a ssid-to-advertise 8-to-63-wpa2-psk-passphrase &amp;
  or
  nsh&gt; gs2200m -a ssid-to-advertise 10-hex-digits-wep-key &amp;

If the module was initialized in AP mode, you can see a new IP address is
assigned.

  nsh&gt; ifconfig
  wlan0   Link encap:Ethernet HWaddr 3c:95:09:00:69:93 at UP
  inet    addr:192.168.11.1 DRaddr:192.168.11.1 Mask:255.255.255.0

Now you can connect your PC to the AP with the above SSID and WPA2-PSK
passphrase or WEP-key which you specified.
</code></pre>`,17)]))}const m=n(a,[["render",r]]);export{h as __pageData,m as default};
