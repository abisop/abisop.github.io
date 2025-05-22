import{_ as r,c as t,al as o,o as a}from"./chunks/framework.NFAqBSgQ.js";const s="/assets/usbmonitor_wireshark_linux_example_adb.DkoZLqtG.png",b=JSON.parse('{"title":"USB Monitor support","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/drivers/special/usbmonitor.md","filePath":"en/components/drivers/special/usbmonitor.md"}'),i={name:"en/components/drivers/special/usbmonitor.md"};function n(l,e,d,p,c,u){return a(),t("div",null,e[0]||(e[0]=[o(`<h1 id="usb-monitor-support" tabindex="-1">USB Monitor support <a class="header-anchor" href="#usb-monitor-support" aria-label="Permalink to &quot;USB Monitor support&quot;">​</a></h1><h2 id="wireshark" tabindex="-1">Wireshark <a class="header-anchor" href="#wireshark" aria-label="Permalink to &quot;Wireshark&quot;">​</a></h2><p>The wireshark software USB capture can capture URBs (USB Request Blocks) rather than raw USB packets when device connect to host directly. To capture raw USB packets, a sniffer is needed.</p><h3 id="linux" tabindex="-1">Linux <a class="header-anchor" href="#linux" aria-label="Permalink to &quot;Linux&quot;">​</a></h3><ol><li><p>Install Wireshark:</p><pre><code>sudo apt update
sudo apt install wireshark
</code></pre></li><li><p>(Optional) Configure Wireshark</p></li></ol><blockquote><p>Wireshark official documentation: <a href="https://wiki.wireshark.org/CaptureSetup/USB" target="_blank" rel="noreferrer">https://wiki.wireshark.org/CaptureSetup/USB</a></p></blockquote><ol start="3"><li><p>Load the usbmon kernel module and run Wireshark:</p><pre><code>sudo modprobe usbmon
sudo wireshark
</code></pre></li><li><p>Find bus the device connects:</p><pre><code> adb devices -l
List of devices attached
1234                   device usb:1-9.4 product:adb dev model:adb_board device:NuttX device transport_id:1000

 dmesg
[3713722.861582] usb 1-9.4: New USB device found, idVendor=18d1, idProduct=4e11, bcdDevice= 1.01

 lsusb
Bus 001 Device 035: ID 18d1:4e11 Google Inc. Nexus One
</code></pre></li><li><p>Filter address</p></li></ol><blockquote><ul><li>Select usbmon (Bus 001): usbmon1</li><li>Wireshark filter (Bus 001 Device 035): usb.addr[0:4] == &quot;1.35&quot;</li></ul></blockquote><ol start="6"><li>Example</li></ol><blockquote><p>Capturing ADB packets with filter (usb.addr[0:4] == &quot;1.35&quot;), on board <a href="https://nuttx.apache.org/docs/latest/platforms/xtensa/esp32s3/boards/esp32s3-devkit/index.html#adb" target="_blank" rel="noreferrer">ESP32S3-DevKit:ADB</a>:</p><pre><code>adb -s 1234 shell ls /dev/
</code></pre><p>The example PcapNg(Packet CAPture Next Generation) file can be downloaded from <code>here &lt;./usbmonitor_wireshark_linux_example_adb.pcapng&gt;</code>{.interpreted-text role=&quot;download&quot;}.</p></blockquote><p><img src="`+s+`" alt="Wireshark
Capturing" class="align-center"></p>`,11)]))}const m=r(i,[["render",n]]);export{b as __pageData,m as default};
