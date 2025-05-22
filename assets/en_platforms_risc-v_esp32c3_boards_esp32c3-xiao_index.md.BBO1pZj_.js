import{_ as a,c as n,al as e,o as p}from"./chunks/framework.NFAqBSgQ.js";const i="/assets/xiao-esp32c3.BXmu2fYT.jpg",m=JSON.parse('{"title":"Seeed Studio XIAO ESP32C3","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/risc-v/esp32c3/boards/esp32c3-xiao/index.md","filePath":"en/platforms/risc-v/esp32c3/boards/esp32c3-xiao/index.md"}'),t={name:"en/platforms/risc-v/esp32c3/boards/esp32c3-xiao/index.md"};function l(o,s,c,r,d,h){return p(),n("div",null,s[0]||(s[0]=[e('<h1 id="seeed-studio-xiao-esp32c3" tabindex="-1">Seeed Studio XIAO ESP32C3 <a class="header-anchor" href="#seeed-studio-xiao-esp32c3" aria-label="Permalink to &quot;Seeed Studio XIAO ESP32C3&quot;">​</a></h1><p>The <a href="https://wiki.seeedstudio.com/xiao_esp32c3_getting_started/" target="_blank" rel="noreferrer">Seeed Studio XIAO ESP32C3</a> is a general purpose board supplied by Seeed Studio and it is compatible with the Espressif ESP32C3 ecosystem, sharing the same MCU as ESP32-C3-DevKitC.</p><p><img src="'+i+`" alt="" class="align-center"></p><h2 id="features" tabindex="-1">Features <a class="header-anchor" href="#features" aria-label="Permalink to &quot;Features&quot;">​</a></h2><ul><li>32­bit RISC­-V single ­core processor that operates at up to 160 MHz</li><li>400KB of SRAM, and 4MB of on-board flash memory</li><li>USB Type-C interface</li><li>Wireless: Complete 2.4GHz Wi-Fi subsystem;</li><li>BLE: Bluetooth 5.0, Bluetooth mesh</li><li>1x UART, 1x I2C, 1x SPI,11x GPIO(PWM), 4x ADC</li><li>1 RESET button, 1 BOOT button</li></ul><h2 id="nsh-console" tabindex="-1">NSH Console <a class="header-anchor" href="#nsh-console" aria-label="Permalink to &quot;NSH Console&quot;">​</a></h2><p>The NuttShell (NSH) console is available over USB using the CDC/ACM serial interface. To access the console, connect via a terminal emulator at 115200 baud, 8 data bits, no parity, and 1 stop bit (115200-8N1).</p><h2 id="buttons" tabindex="-1">Buttons <a class="header-anchor" href="#buttons" aria-label="Permalink to &quot;Buttons&quot;">​</a></h2><p>The RESET and BOOT buttons can be used to enter &quot;Bootloader&quot; mode by press and hold the BOOT key while powering up and then press the RESET key once.</p><h2 id="pin-mapping" tabindex="-1">Pin Mapping <a class="header-anchor" href="#pin-mapping" aria-label="Permalink to &quot;Pin Mapping&quot;">​</a></h2><p>Pads numbered anticlockwise from USB connector.</p><p>Pad Signal Notes</p><hr><p>0 GPIO02 D0/A0 1 GPIO03 D1/A1 2 GPIO04 D2/A2 3 GPIO05 D3/A3 4 GPIO06 D4/SDA 5 GPIO07 D5/SCL 6 GPIO21 D6/Default TX for UART0 serial console 7 GPIO20 D7/Default RX for UART0 serial console 8 GPIO08 D8/SCK 9 GPIO09 D9/MISO 10 GPIO10 D10/MOSI 11 12 3V3 Ground Power output to peripherals 13 VIN +5V Supply to board</p><h2 id="power-supply" tabindex="-1">Power Supply <a class="header-anchor" href="#power-supply" aria-label="Permalink to &quot;Power Supply&quot;">​</a></h2><p>The working voltage of the MCU is 3.3V. Voltage input connected to general I/O pins may cause chip damage if it&#39;s higher than 3.3V.</p><h2 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-label="Permalink to &quot;Installation&quot;">​</a></h2><ol><li>Configure and build NuttX:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> git clone https://github.com/apache/nuttx.git nuttx</span></span>
<span class="line"><span> git clone https://github.com/apache/nuttx-apps.git apps</span></span>
<span class="line"><span> cd nuttx</span></span>
<span class="line"><span> make distclean</span></span>
<span class="line"><span> ./tools/configure.sh xiao-esp32c3:usbnsh</span></span>
<span class="line"><span> make V=1</span></span></code></pre></div><p>2. Connect the Seeed Studio XIAO ESP32C3, and enter &quot;Bootloader&quot; mode, then, flash the <code>nuttx.hex</code> file using <code>esptool</code>: (<a href="https://docs.espressif.com/projects/esptool/en/latest/esp32/" target="_blank" rel="noreferrer">https://docs.espressif.com/projects/esptool/en/latest/esp32/</a>)</p><p>Example command:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>make flash ESPTOOL_PORT=/dev/ttyACM0 ESPTOOL_BINDIR=./</span></span></code></pre></div><h2 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h2><h3 id="nsh" tabindex="-1">nsh <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh&quot;">​</a></h3><p>Basic NuttShell configuration using serial (console enabled in UART0, exposed via pins D6/TX and D7/RX, at 115200 bps).</p><h3 id="usbnsh" tabindex="-1">usbnsh <a class="header-anchor" href="#usbnsh" aria-label="Permalink to &quot;usbnsh&quot;">​</a></h3><p>Basic NuttShell configuration using CDC/ACM serial (console enabled in USB Port, at 115200 bps).</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>NuttShell (NSH) NuttX-12.8.0</span></span>
<span class="line"><span>nsh&gt; uname -a</span></span>
<span class="line"><span>NuttX 12.8.0 2c845426da-dirty Apr  6 2025 22:53:57 xtensa esp32c3-xiao</span></span></code></pre></div><h3 id="gpio" tabindex="-1">gpio <a class="header-anchor" href="#gpio" aria-label="Permalink to &quot;gpio&quot;">​</a></h3><p>This configuration enabled NuttShell via USB and enabled gpio example.</p><p>Testing gpios:</p><p>PIN/GPIO Mode Device</p><hr><p>D0/GPIO2 Output /dev/gpio0 D1/GPIO3 Input /dev/gpio1</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>nsh&gt; gpio -o 1 /dev/gpio0</span></span>
<span class="line"><span>Driver: /dev/gpio0</span></span>
<span class="line"><span>  Output pin:    Value=1</span></span>
<span class="line"><span>  Writing:       Value=1</span></span>
<span class="line"><span>  Verify:        Value=1</span></span>
<span class="line"><span>nsh&gt; </span></span>
<span class="line"><span>nsh&gt; gpio -o 0 /dev/gpio0</span></span>
<span class="line"><span>Driver: /dev/gpio0</span></span>
<span class="line"><span>  Output pin:    Value=1</span></span>
<span class="line"><span>  Writing:       Value=0</span></span>
<span class="line"><span>  Verify:        Value=0</span></span>
<span class="line"><span>nsh&gt; gpio -w 1 /dev/gpio1</span></span>
<span class="line"><span>Driver: /dev/gpio1</span></span>
<span class="line"><span>  Interrupt pin: Value=0</span></span>
<span class="line"><span>  Verify:        Value=1</span></span></code></pre></div><h3 id="wifi" tabindex="-1">wifi <a class="header-anchor" href="#wifi" aria-label="Permalink to &quot;wifi&quot;">​</a></h3><p>This configuration enables a wlan network interface that can be configured and initialized using below commands:</p><pre><code>nsh&gt; ifup wlan0
nsh&gt; wapi psk wlan0 mypasswd 3
nsh&gt; wapi essid wlan0 myssid 1
nsh&gt; renew wlan0
</code></pre><p>In this case a connection to AP with SSID <code>myssid</code> is done, using <code>mypasswd</code> as password. IP address is obtained via DHCP using <code>renew</code> command. You can check the result by running <code>ifconfig</code> afterwards.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>NuttShell (NSH) NuttX-12.8.0</span></span>
<span class="line"><span>nsh&gt; uname -a</span></span>
<span class="line"><span>NuttX  12.9.0 6b4bc72626-dirty Apr 26 2025 17:40:37 risc-v esp32c3-xiao</span></span>
<span class="line"><span>nsh&gt; ?</span></span>
<span class="line"><span>help usage:  help [-v] [&lt;cmd&gt;]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    .           cp          expr        pkill       pwd         uname       </span></span>
<span class="line"><span>    [           cmp         false       ls          rm          umount      </span></span>
<span class="line"><span>    ?           dirname     fdinfo      mkdir       rmdir       unset       </span></span>
<span class="line"><span>    alias       date        free        mkrd        set         uptime      </span></span>
<span class="line"><span>    unalias     df          help        mount       sleep       usleep      </span></span>
<span class="line"><span>    arp         dmesg       hexdump     mv          source      watch       </span></span>
<span class="line"><span>    basename    echo        ifconfig    nslookup    test        xd          </span></span>
<span class="line"><span>    break       env         ifdown      pidof       time        wait        </span></span>
<span class="line"><span>    cat         exec        ifup        printf      true        </span></span>
<span class="line"><span>    cd          exit        kill        ps          truncate    </span></span>
<span class="line"><span></span></span>
<span class="line"><span>Builtin Apps:</span></span>
<span class="line"><span>    dd           getprime     ostest       rand         sh           </span></span>
<span class="line"><span>    dumpstack    nsh          ping         renew        wapi         </span></span>
<span class="line"><span>nsh&gt; wapi psk wlan0 nuttxpwd 3</span></span>
<span class="line"><span>nsh&gt; wapi essid wlan0 nuttxnw 1</span></span>
<span class="line"><span>nsh&gt; renew wlan0</span></span>
<span class="line"><span>nsh&gt; ifconfig</span></span>
<span class="line"><span>wlan0   Link encap:Ethernet HWaddr a0:85:e3:0e:4a:30 at RUNNING mtu 576</span></span>
<span class="line"><span>        inet addr:192.168.59.144 DRaddr:192.168.59.134 Mask:255.255.255.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>nsh&gt; ping 8.8.8.8</span></span>
<span class="line"><span>PING 8.8.8.8 56 bytes of data</span></span>
<span class="line"><span>56 bytes from 8.8.8.8: icmp_seq=0 time=50.0 ms</span></span>
<span class="line"><span>56 bytes from 8.8.8.8: icmp_seq=1 time=40.0 ms</span></span>
<span class="line"><span>56 bytes from 8.8.8.8: icmp_seq=2 time=30.0 ms</span></span>
<span class="line"><span>56 bytes from 8.8.8.8: icmp_seq=3 time=60.0 ms</span></span>
<span class="line"><span>56 bytes from 8.8.8.8: icmp_seq=4 time=100.0 ms</span></span>
<span class="line"><span>56 bytes from 8.8.8.8: icmp_seq=5 time=100.0 ms</span></span>
<span class="line"><span>56 bytes from 8.8.8.8: icmp_seq=6 time=140.0 ms</span></span>
<span class="line"><span>56 bytes from 8.8.8.8: icmp_seq=7 time=40.0 ms</span></span>
<span class="line"><span>56 bytes from 8.8.8.8: icmp_seq=8 time=50.0 ms</span></span>
<span class="line"><span>56 bytes from 8.8.8.8: icmp_seq=9 time=30.0 ms</span></span>
<span class="line"><span>10 packets transmitted, 10 received, 0% packet loss, time 10100 ms</span></span>
<span class="line"><span>rtt min/avg/max/mdev = 30.000/64.000/140.000/34.985 ms</span></span>
<span class="line"><span>nsh&gt; nslookup google.com</span></span>
<span class="line"><span>Host: google.com Addr: 142.251.128.238</span></span>
<span class="line"><span>nsh&gt; nslookup nuttx.apache.org</span></span>
<span class="line"><span>Host: nuttx.apache.org Addr: 151.101.2.132</span></span>
<span class="line"><span>nsh&gt;</span></span></code></pre></div><h3 id="ble" tabindex="-1">ble <a class="header-anchor" href="#ble" aria-label="Permalink to &quot;ble&quot;">​</a></h3><p>This configuration is used to enable the Bluetooth Low Energy (BLE) of ESP32-C3 chip.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>NuttShell (NSH) NuttX-12.8.0</span></span>
<span class="line"><span>nsh&gt; bt bnep0 scan start</span></span>
<span class="line"><span>nsh&gt; bt bnep0 scan stop</span></span>
<span class="line"><span>nsh&gt; bt bnep0 scan get</span></span>
<span class="line"><span>Scan result:</span></span>
<span class="line"><span> 1.     addr:            a0:46:5a:22:ea:c4 type: 0</span></span>
<span class="line"><span>        rssi:            -92</span></span>
<span class="line"><span>        response type:   0</span></span>
<span class="line"><span>        advertiser data: 02 01 02 19 16 f1 fc 04 f9 6e e8 58 e6 33 58 26                         c5 4b bd 91 1c e0 4f b2 d9 51 455</span></span>
<span class="line"><span> 2.     addr:            a0:46:5a:22:ea:c4 type: 0</span></span>
<span class="line"><span>        rssi:            -91</span></span>
<span class="line"><span>        response type:   0</span></span>
<span class="line"><span>        advertiser data: 02 01 02 19 16 f1 fc 04 f9 6e e8 58 e6 33 58 26                         c5 4b bd 91 1c e0 4f b2 d9 51 455</span></span>
<span class="line"><span> 3.     addr:            a0:46:5a:22:ea:c4 type: 0</span></span>
<span class="line"><span>        rssi:            -100</span></span>
<span class="line"><span>        response type:   0</span></span>
<span class="line"><span>        advertiser data: 02 01 02 19 16 f1 fc 04 f9 6e e8 58 e6 33 58 26                         c5 4b bd 91 1c e0 4f b2 d9 51 455</span></span>
<span class="line"><span> 4.     addr:            a0:46:5a:22:ea:c4 type: 0</span></span>
<span class="line"><span>        rssi:            -100</span></span>
<span class="line"><span>        response type:   4</span></span>
<span class="line"><span>        advertiser data:</span></span>
<span class="line"><span> 5.     addr:            a0:46:5a:22:ea:c4 type: 0</span></span>
<span class="line"><span>        rssi:            -97</span></span>
<span class="line"><span>        response type:   0</span></span>
<span class="line"><span>        advertiser data: 02 01 02 19 16 f1 fc 04 f9 6e e8 58 e6 33 58 26</span></span></code></pre></div>`,43)]))}const g=a(t,[["render",l]]);export{m as __pageData,g as default};
