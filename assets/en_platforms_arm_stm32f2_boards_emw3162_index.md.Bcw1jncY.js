import{_ as t,c as a,al as o,o as r}from"./chunks/framework.NFAqBSgQ.js";const m=JSON.parse('{"title":"emw3162","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/stm32f2/boards/emw3162/index.md","filePath":"en/platforms/arm/stm32f2/boards/emw3162/index.md"}'),n={name:"en/platforms/arm/stm32f2/boards/emw3162/index.md"};function i(s,e,l,c,h,u){return r(),a("div",null,e[0]||(e[0]=[o(`<h1 id="emw3162" tabindex="-1">emw3162 <a class="header-anchor" href="#emw3162" aria-label="Permalink to &quot;emw3162&quot;">​</a></h1><p>chip:stm32, chip:stm32f2, chip:stm32f205</p><p>EMW3162 board (<a href="https://www.waveshare.com/EMW3162.htm" target="_blank" rel="noreferrer">https://www.waveshare.com/EMW3162.htm</a>) features the STM32F205RG MCU and Broadcom BCM43362KUBG Wi-Fi chip. The STM32F205RG is a 120 MHz Cortex-M3 operation with 1MB Flash memory and 128KB RAM.</p><h2 id="configuring-nuttx-for-the-emw3162-board" tabindex="-1">Configuring NuttX for the EMW3162 board <a class="header-anchor" href="#configuring-nuttx-for-the-emw3162-board" aria-label="Permalink to &quot;Configuring NuttX for the EMW3162 board&quot;">​</a></h2><pre><code> cd nuttx
 make apps_distclean
 make distclean
 ./tools/configure.sh emw3162:wlan
</code></pre><h2 id="configuring-nuttx-to-use-your-wireless-router-aka-access-point" tabindex="-1">Configuring NuttX to use your Wireless Router (aka Access Point) <a class="header-anchor" href="#configuring-nuttx-to-use-your-wireless-router-aka-access-point" aria-label="Permalink to &quot;Configuring NuttX to use your Wireless Router (aka Access Point)&quot;">​</a></h2><pre><code> make menuconfig
</code></pre><p>Browse the menus this way:</p><pre><code>Application Configuration  ---&gt;
    NSH Library  ---&gt;
        Networking Configuration  ---&gt;
            WAPI Configuration  ---&gt;
                (myApSSID) SSID
                (mySSIDpassphrase) Passprhase
</code></pre><p>Replace the SSID from myApSSID with your wireless router name and the Passprhase with your WiFi password.</p><p>Exit and save.</p><p>Finally just compile NuttX:</p><pre><code> make
</code></pre><h2 id="programming-flash" tabindex="-1">Programming Flash <a class="header-anchor" href="#programming-flash" aria-label="Permalink to &quot;Programming Flash&quot;">​</a></h2><p>Flash memory can be programmed by stlink toolset (<a href="https://github.com/stlink-org/stlink" target="_blank" rel="noreferrer">https://github.com/stlink-org/stlink</a>) and ST-LINK V2 programmer (via SWD interface) as follows:</p><pre><code> sudo st-flash write nuttx.bin 0x8000000
</code></pre><h2 id="nsh-via-telnet" tabindex="-1">NSH via telnet <a class="header-anchor" href="#nsh-via-telnet" aria-label="Permalink to &quot;NSH via telnet&quot;">​</a></h2><p>After you successfully downloaded nuttx.bin, reset the board and it automatically connects to the corresponding wifi AP. You may login your router to see its IP address. Assume that it&#39;s 192.168.1.111</p><p>Open a terminal on your computer and telnet your EMW3162 board:</p><pre><code> telnet 192.168.1.111
Trying 192.168.1.111...
Connected to 192.168.1.111.
Escape character is &#39;^]&#39;

NuttShell (NSH) NuttX-10.1.0-RC1
nsh&gt;
</code></pre><h2 id="serial-console-configuration" tabindex="-1">Serial console configuration <a class="header-anchor" href="#serial-console-configuration" aria-label="Permalink to &quot;Serial console configuration&quot;">​</a></h2><p>Connect a USB/Serial 3.3V dongle to GND, TXD and RXD pins of EMW3162 board. Then use some serial console client (minicom, picocom, teraterm, etc) confi-gured to 115200 8n1 without software or hardware flow control.</p><p>Reset the board and you should see NuttX starting in the serial.</p>`,23)]))}const p=t(n,[["render",i]]);export{m as __pageData,p as default};
