import{_ as a,c as n,al as e,o as p}from"./chunks/framework.NFAqBSgQ.js";const t="/assets/xiao-esp32s3.BvFYOxRJ.jpg",g=JSON.parse('{"title":"Seeed Studio XIAO ESP32S3","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/xtensa/esp32s3/boards/esp32s3-xiao/index.md","filePath":"en/platforms/xtensa/esp32s3/boards/esp32s3-xiao/index.md"}'),i={name:"en/platforms/xtensa/esp32s3/boards/esp32s3-xiao/index.md"};function l(o,s,d,r,c,u){return p(),n("div",null,s[0]||(s[0]=[e('<h1 id="seeed-studio-xiao-esp32s3" tabindex="-1">Seeed Studio XIAO ESP32S3 <a class="header-anchor" href="#seeed-studio-xiao-esp32s3" aria-label="Permalink to &quot;Seeed Studio XIAO ESP32S3&quot;">​</a></h1><p>chip:esp32, chip:esp32s3</p><p>The <a href="https://wiki.seeedstudio.com/xiao_esp32s3_getting_started/" target="_blank" rel="noreferrer">Seeed Studio XIAO ESP32S3</a> is a general purpose board supplied by Seeed Studio and it is compatible with the Espressif ESP32S3 ecosystem, sharing the same MCU as ESP32-S3-DevKitC.</p><p><img src="'+t+`" alt="" class="align-center"></p><h2 id="features" tabindex="-1">Features <a class="header-anchor" href="#features" aria-label="Permalink to &quot;Features&quot;">​</a></h2><ul><li>ESP32-S3R8 Xtensa LX7 dual-core, 32-bit processor that operates at up to 240 MHz</li><li>On-chip 8M PSRAM &amp; 8MB Flash</li><li>USB Type-C interface</li><li>Wireless: Complete 2.4GHz Wi-Fi subsystem;</li><li>BLE: Bluetooth 5.0, Bluetooth mesh</li><li>1x UART, 1x I2C, 1x I2S, 1x SPI, 11x GPIOs (PWM), 9x ADC</li><li>1 user LED, 1 power LED</li><li>1 RESET button, 1 BOOT button</li></ul><h2 id="nsh-console" tabindex="-1">NSH Console <a class="header-anchor" href="#nsh-console" aria-label="Permalink to &quot;NSH Console&quot;">​</a></h2><p>The NuttShell (NSH) console is available over USB using the CDC/ACM serial interface. To access the console, connect via a terminal emulator at 115200 baud, 8 data bits, no parity, and 1 stop bit (115200-8N1).</p><h2 id="user-led" tabindex="-1">User LED <a class="header-anchor" href="#user-led" aria-label="Permalink to &quot;User LED&quot;">​</a></h2><p>The USER LED, a yellow LED located on the XIAO ESP32S3 board, is connected to GPIO21 as indicated in the board&#39;s schematic. This LED can be controlled through NuttX by configuring GPIO21 as an output and toggling its state.</p><h2 id="buttons" tabindex="-1">Buttons <a class="header-anchor" href="#buttons" aria-label="Permalink to &quot;Buttons&quot;">​</a></h2><p>The RESET and BOOT buttons can be used to enter &quot;Bootloader&quot; mode by press and hold the BOOT key while powering up and then press the RESET key once.</p><h2 id="pin-mapping" tabindex="-1">Pin Mapping <a class="header-anchor" href="#pin-mapping" aria-label="Permalink to &quot;Pin Mapping&quot;">​</a></h2><p>Pads numbered anticlockwise from USB connector.</p><p>Pad Signal Notes</p><hr><p>0 GPIO01 D0/A0 1 GPIO02 D1/A1 2 GPIO03 D2/A2 3 GPIO04 D3/A3 4 GPIO05 D4/SDA 5 GPIO06 D5/SCL 6 GPIO43 D6/Default TX for UART0 serial console 7 GPIO44 D7/Default RX for UART0 serial console 8 GPIO07 D8/SCK 9 GPIO08 D9/MISO 10 GPIO09 D10/MOSI 11 12 3V3 Ground Power output to peripherals 13 VIN +5V Supply to board</p><h2 id="power-supply" tabindex="-1">Power Supply <a class="header-anchor" href="#power-supply" aria-label="Permalink to &quot;Power Supply&quot;">​</a></h2><p>The working voltage of the MCU is 3.3V. Voltage input connected to general I/O pins may cause chip damage if it&#39;s higher than 3.3V.</p><h2 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-label="Permalink to &quot;Installation&quot;">​</a></h2><ol><li>Configure and build NuttX:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> git clone https://github.com/apache/nuttx.git nuttx</span></span>
<span class="line"><span> git clone https://github.com/apache/nuttx-apps.git apps</span></span>
<span class="line"><span> cd nuttx</span></span>
<span class="line"><span> make distclean</span></span>
<span class="line"><span> ./tools/configure.sh xiao-esp32s3:usbnsh</span></span>
<span class="line"><span> make V=1</span></span></code></pre></div><p>2. Connect the Seeed Studio XIAO ESP32S3, and enter &quot;Bootloader&quot; mode, then, flash the <code>nuttx.hex</code> file using <code>esptool</code>: (<a href="https://docs.espressif.com/projects/esptool/en/latest/esp32/" target="_blank" rel="noreferrer">https://docs.espressif.com/projects/esptool/en/latest/esp32/</a>)</p><p>Example command:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>make flash ESPTOOL_PORT=/dev/ttyACM0 ESPTOOL_BINDIR=./</span></span></code></pre></div><h2 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h2><h3 id="usbnsh" tabindex="-1">usbnsh <a class="header-anchor" href="#usbnsh" aria-label="Permalink to &quot;usbnsh&quot;">​</a></h3><p>Basic NuttShell configuration using CDC/ACM serial (console enabled in USB Port, at 115200 bps).</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>NuttShell (NSH) NuttX-12.8.0</span></span>
<span class="line"><span>nsh&gt; uname -a</span></span>
<span class="line"><span>NuttX 12.8.0 2c845426da-dirty Apr  6 2025 22:53:57 xtensa esp32s3-xiao</span></span></code></pre></div><h3 id="combo" tabindex="-1">combo <a class="header-anchor" href="#combo" aria-label="Permalink to &quot;combo&quot;">​</a></h3><p>This configuration enabled NuttShell via USB and enabled led and gpio examples:</p><p>Testing leds:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>nsh&gt; leds</span></span>
<span class="line"><span>leds_main: Starting the led_daemon</span></span>
<span class="line"><span>leds_main: led_daemon started</span></span>
<span class="line"><span></span></span>
<span class="line"><span>led_daemon (pid# 10): Running</span></span>
<span class="line"><span>led_daemon: Opening /dev/userleds</span></span>
<span class="line"><span>led_daemon: Supported LEDs 0x01</span></span>
<span class="line"><span>led_daemon: LED set 0x01</span></span>
<span class="line"><span>nsh&gt; led_daemon: LED set 0x00</span></span>
<span class="line"><span>led_daemon: LED set 0x01</span></span>
<span class="line"><span>led_daemon: LED set 0x00</span></span>
<span class="line"><span>led_daemon: LED set 0x01</span></span>
<span class="line"><span>led_daemon: LED set 0x00</span></span></code></pre></div><p>Testing gpios:</p><p>PIN/GPIO Mode Device</p><hr><p>D1/GPIO2 Output /dev/gpio0 D0/GPIO1 Input /dev/gpio1 D2/GPIO3 Input /dev/gpio2</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>nsh&gt; ls /dev</span></span>
<span class="line"><span>/dev:</span></span>
<span class="line"><span> console</span></span>
<span class="line"><span> gpio0</span></span>
<span class="line"><span> gpio1</span></span>
<span class="line"><span> gpio2</span></span>
<span class="line"><span> null</span></span>
<span class="line"><span> ttyACM0</span></span>
<span class="line"><span> ttyS0</span></span>
<span class="line"><span> userleds</span></span>
<span class="line"><span> zero</span></span>
<span class="line"><span>nsh&gt; gpio -o 1 /dev/gpio0</span></span>
<span class="line"><span>Driver: /dev/gpio0</span></span>
<span class="line"><span>  Output pin:    Value=0</span></span>
<span class="line"><span>  Writing:       Value=1</span></span>
<span class="line"><span>  Verify:        Value=1</span></span>
<span class="line"><span>nsh&gt; gpio -o 0 /dev/gpio0</span></span>
<span class="line"><span>  Driver: /dev/gpio0</span></span>
<span class="line"><span>  Output pin:    Value=1</span></span>
<span class="line"><span>  Writing:       Value=0</span></span>
<span class="line"><span>  Verify:        Value=0</span></span>
<span class="line"><span>nsh&gt; gpio /dev/gpio1</span></span>
<span class="line"><span>Driver: /dev/gpio1</span></span>
<span class="line"><span>  Input pin:     Value=0</span></span>
<span class="line"><span>nsh&gt; gpio /dev/gpio1</span></span>
<span class="line"><span>Driver: /dev/gpio1</span></span>
<span class="line"><span>  Input pin:     Value=1</span></span>
<span class="line"><span>nsh&gt; gpio /dev/gpio1</span></span>
<span class="line"><span>Driver: /dev/gpio1</span></span>
<span class="line"><span>  Input pin:     Value=0</span></span>
<span class="line"><span>nsh&gt; gpio -w 1 /dev/gpio2</span></span>
<span class="line"><span>Driver: /dev/gpio2</span></span>
<span class="line"><span>  Interrupt pin: Value=0</span></span>
<span class="line"><span>  Verify:        Value=1</span></span>
<span class="line"><span>nsh&gt; gpio -w 1 /dev/gpio2</span></span>
<span class="line"><span>Driver: /dev/gpio2</span></span>
<span class="line"><span>  Interrupt pin: Value=0</span></span>
<span class="line"><span>  Verify:        Value=1</span></span></code></pre></div>`,38)]))}const b=a(i,[["render",l]]);export{g as __pageData,b as default};
