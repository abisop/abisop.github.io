import{_ as o,c as t,al as n,o as a}from"./chunks/framework.NFAqBSgQ.js";const p=JSON.parse('{"title":"Particle.io Photon","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/stm32f2/boards/photon/index.md","filePath":"en/platforms/arm/stm32f2/boards/photon/index.md"}'),i={name:"en/platforms/arm/stm32f2/boards/photon/index.md"};function r(s,e,l,u,d,h){return a(),t("div",null,e[0]||(e[0]=[n(`<h1 id="particle-io-photon" tabindex="-1">Particle.io Photon <a class="header-anchor" href="#particle-io-photon" aria-label="Permalink to &quot;Particle.io Photon&quot;">​</a></h1><p>chip:stm32, chip:stm32f2, chip:stm32f205</p><p>This page discusses issues unique to NuttX configurations for the Particle.io Photon board featuring the STM32F205RG MCU. The STM32F205RG is a 120 MHz Cortex-M3 operation with 1MB Flash memory and 128KB RAM. The board includes a Broadcom BCM43362 WiFi.</p><h2 id="selecting-the-photon-board-on-nuttx" tabindex="-1">Selecting the Photon board on NuttX <a class="header-anchor" href="#selecting-the-photon-board-on-nuttx" aria-label="Permalink to &quot;Selecting the Photon board on NuttX&quot;">​</a></h2><p>NOTICE: We will not discuss about toolchains and environment configuration here, please take a look at STM32F4Discovery board README or other STM32 board because it should work for Photon board as well.</p><p>Let us to consider that you cloned the nuttx and apps repositories, then follow these steps:</p><ol><li><p>Clear your build system before to start:</p><pre><code> make apps_distclean
 make distclean
</code></pre></li><li><p>Enter inside nuttx/tools and configure to use the Photon board:</p><pre><code> cd nuttx
 tools/configure.sh photon:wlan
</code></pre></li></ol><h2 id="configuring-nuttx-to-use-your-wireless-router-aka-access-point" tabindex="-1">Configuring NuttX to use your Wireless Router (aka Access Point) <a class="header-anchor" href="#configuring-nuttx-to-use-your-wireless-router-aka-access-point" aria-label="Permalink to &quot;Configuring NuttX to use your Wireless Router (aka Access Point)&quot;">​</a></h2><p>Since you are already in the root of nuttx/ repository, execute make menuconfig to define your Wireless Router and your password:</p><pre><code> make menuconfig
</code></pre><p>Browser the menus this way:</p><pre><code>Application Configuration  ---&gt;
    NSH Library  ---&gt;
        Networking Configuration  ---&gt;
            WAPI Configuration  ---&gt;
                (myApSSID) SSID
                (mySSIDpassphrase) Passprhase
</code></pre><p>Replace the SSID from myApSSID with your wireless router name and the Passprhase with your WiFi password.</p><p>Exit and save your configuration.</p><p>Finally just compile NuttX:</p><pre><code> make
</code></pre><h2 id="flashing-nuttx-in-the-photon-board" tabindex="-1">Flashing NuttX in the Photon board <a class="header-anchor" href="#flashing-nuttx-in-the-photon-board" aria-label="Permalink to &quot;Flashing NuttX in the Photon board&quot;">​</a></h2><p>Connect the Photon board in your computer using a MicroUSB cable. Press and hold both board&#39;s buttons (SETUP and RESET), then release the RESET button, the board will start blinking in the Purple color, waiting until it starts blinking in Yellow color. Now you can release the SETUP button as well.</p><ol><li><p>You can verify if DFU mode in your board is working, using this command:</p><pre><code> sudo dfu-util -l
dfu-util 0.8

Copyright 2005-2009 Weston Schmidt, Harald Welte and OpenMoko Inc.
Copyright 2010-2014 Tormod Volden and Stefan Schmidt
This program is Free Software and has ABSOLUTELY NO WARRANTY
Please report bugs to dfu-util@lists.gnumonks.org

Found DFU: [2b04:d006] ver=0200, devnum=15, cfg=1, intf=0, alt=1, name=&quot;@DCT Flash   /0x00000000/01*016Kg&quot;, serial=&quot;00000000010C&quot;
Found DFU: [2b04:d006] ver=0200, devnum=15, cfg=1, intf=0, alt=0, name=&quot;@Internal Flash   /0x08000000/03*016Ka,01*016Kg,01*064Kg,07*128Kg&quot;, serial=&quot;00000000010C&quot;
</code></pre></li><li><p>Flash the nuttx.bin inside the Internal Flash:</p><pre><code> sudo dfu-util -d 2b04:d006 -a 0 -s 0x08020000 -D nuttx.bin

dfu-util 0.8

Copyright 2005-2009 Weston Schmidt, Harald Welte and OpenMoko Inc.
Copyright 2010-2014 Tormod Volden and Stefan Schmidt
This program is Free Software and has ABSOLUTELY NO WARRANTY
Please report bugs to dfu-util@lists.gnumonks.org

dfu-util: Invalid DFU suffix signature
dfu-util: A valid DFU suffix will be required in a future dfu-util release!!!
Opening DFU capable USB device...
ID 2b04:d006
Run-time device DFU version 011a
Claiming USB DFU Interface...
Setting Alternate Setting #0 ...
Determining device status: state = dfuIDLE, status = 0
dfuIDLE, continuing
DFU mode device DFU version 011a
Device returned transfer size 4096
DfuSe interface name: &quot;Internal Flash   &quot;
Downloading to address = 0x08020000, size = 331348
Download   [=========================] 100%       331348 bytes
Download done.
File downloaded successfully
</code></pre></li><li><p>Restore the original firmware If you config to use the stock bootloader of Photon, you may reload the original firmware with dfu-utils as you like. Otherwise you must have backuped the whole image beforehand, and reload it via SWD debug port.</p></li></ol><h2 id="nsh-via-telnet" tabindex="-1">NSH via telnet <a class="header-anchor" href="#nsh-via-telnet" aria-label="Permalink to &quot;NSH via telnet&quot;">​</a></h2><p>After you successfully downloaded nuttx.bin, reset the board and it automatically connects to the corresponding wifi AP. You may login your router to see its IP address. Assume that it&#39;s 192.168.1.111</p><p>Open a terminal on your computer and telnet your Photon:</p><pre><code> telnet 192.168.1.111
Trying 192.168.1.111...
Connected to 192.168.1.111.
Escape character is &#39;^]&#39;

NuttShell (NSH) NuttX-7.24
nsh&gt;
</code></pre><h2 id="serial-console-configuration" tabindex="-1">Serial console configuration <a class="header-anchor" href="#serial-console-configuration" aria-label="Permalink to &quot;Serial console configuration&quot;">​</a></h2><p>Connect a USB/Serial 3.3V dongle to GND, TX and RX pins of Photon board. Then use some serial console client (minicom, picocom, teraterm, etc) confi-gured to 115200 8n1 without software or hardware flow control.</p><p>Reset the board and you should see NuttX starting in the serial.</p>`,26)]))}const f=o(i,[["render",r]]);export{p as __pageData,f as default};
