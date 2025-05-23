import{_ as o,c as t,al as n,o as a}from"./chunks/framework.NFAqBSgQ.js";const p=JSON.parse('{"title":"README","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/samd2l2/boards/arduino-m0/README.md","filePath":"en/platforms/arm/samd2l2/boards/arduino-m0/README.md"}'),i={name:"en/platforms/arm/samd2l2/boards/arduino-m0/README.md"};function s(r,e,l,d,u,c){return a(),t("div",null,e[0]||(e[0]=[n(`<h1 id="readme" tabindex="-1">README <a class="header-anchor" href="#readme" aria-label="Permalink to &quot;README&quot;">​</a></h1><p>This README discusses issues unique to NuttX configurations for the Arduino M0. I used a compatible board called Wemos SAMD21 M0 board, but there are other equivalent boards, like the RobotDyn SAMD21 M0.</p><p>Unfortunately because the Arduino.cc vs Arduino.org conflict in the past, we have three types of boards: Arduino Zero, Arduino M0 and Arduino M0 Pro.</p><p>The Wemos SAMD21 M0 is compatible with Arduino M0, but not exactly a clone.</p><p>You have two options to program it: using the SWD (EDBG) connector that comes in the board or the Arduino M0 bootloader that comes flashed on it. Currently only SWD programming is supported. Bootloader skip area should be implemented to avoid overwriting the bootloader area.</p><p>The board uses the ATSAMD21G18A MCU and can work over the Native USB Port.</p><h1 id="contents" tabindex="-1">Contents <a class="header-anchor" href="#contents" aria-label="Permalink to &quot;Contents&quot;">​</a></h1><ul><li>STATUS/ISSUES</li><li>LEDs</li><li>Serial Consoles</li><li>Configurations</li></ul><h1 id="status-issues" tabindex="-1">STATUS/ISSUES <a class="header-anchor" href="#status-issues" aria-label="Permalink to &quot;STATUS/ISSUES&quot;">​</a></h1><p>Because the Arduino M0 doesn&#39;t have a 12MHz crystal, it uses the internal RC oscillator.</p><h1 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h1><p>There is one yellow LED available on the Arduino M0 and it can be turned on and off. The LED can be activated by driving the connected PA17 I/O line to high level.</p><p>When CONFIG_ARCH_LEDS is defined in the NuttX configuration, NuttX will control the LED as follows:</p><pre><code>SYMBOL              Meaning                 LED0
------------------- ----------------------- ------
LED_STARTED         NuttX has been started  OFF
LED_HEAPALLOCATE    Heap has been allocated OFF
LED_IRQSENABLED     Interrupts enabled      OFF
LED_STACKCREATED    Idle stack created      ON
LED_INIRQ           In an interrupt         N/C
LED_SIGNAL          In a signal handler     N/C
LED_ASSERTION       An assertion failed     N/C
LED_PANIC           The system has crashed  FLASH
</code></pre><p>Thus is LED is statically on, NuttX has successfully booted and is, apparently, running normally. If LED is flashing at approximately 2Hz, then a fatal error has been detected and the system has halted.</p><h1 id="serial-consoles" tabindex="-1">Serial Consoles <a class="header-anchor" href="#serial-consoles" aria-label="Permalink to &quot;Serial Consoles&quot;">​</a></h1><p>SERCOM5 ------</p><p>SERCOM5 is available on pins PB22 (TXD) and PB23 (RXD). You will need to solder a two pins header to RXD and TXD labels, near to ICSP pin header.</p><pre><code>PIN   GPIO Function
----  ---- ------------------
 37   PB22 SERCOM5 / USART RX
 38   PB23 SERCOM5 / USART TX
</code></pre><p>If you have a 3.3V USB/Serial adapter then this is the most convenient serial console to use (because you don&#39;t lose the console device each time you lose the USB connection). It is the default in all of these configurations. An option is to use the virtual COM port.</p><p>Native USB Port ---------------</p><p>You can access the NSH shell directly using the USB connector. All you need to do is use the &quot;usbnsh&quot; board profile.</p><h1 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h1><p>Each Arduino M0 configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh arduino-m0:&lt;subdir&gt;
</code></pre><p>Before building, make sure the PATH environment variable include the correct path to the directory than holds your toolchain binaries.</p><p>And then build NuttX by simply typing the following. At the conclusion of the make, the nuttx binary will reside in an ELF file called, simply, nuttx.</p><pre><code>make
</code></pre><p>The <code>&lt;subdir&gt;</code> that is provided above as an argument to the tools/configure.sh must be is one of the following.</p><p>NOTE: These configurations use the mconf-based configuration tool. To change any of these configurations using that tool, you should:</p><pre><code>a. Build and install the kconfig-mconf tool.  See nuttx/README.txt
   see additional README.txt files in the NuttX tools repository.

b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the
   reconfiguration process.
</code></pre><p>NOTES:</p><ol><li>These configurations use the mconf-based configuration tool. To change any of these configurations using that tool, you should:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- --&gt;</span></span></code></pre></div><pre><code>a. Build and install the kconfig-mconf tool.  See nuttx/README.txt
   see additional README.txt files in the NuttX tools repository.

b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the
   reconfiguration process.
</code></pre><h2 id="configuration-sub-directories" tabindex="-1">Configuration sub-directories <a class="header-anchor" href="#configuration-sub-directories" aria-label="Permalink to &quot;Configuration sub-directories&quot;">​</a></h2><p>nsh: This configuration directory will built the NuttShell. See NOTES above and below:</p><pre><code>NOTES:

1. This configuration is set up to build on Windows using the Cygwin
   environment using the ARM EABI toolchain.  This can be easily
   changed as described above under &quot;Configurations.&quot;

2. By default, this configuration provides a serial console on SERCOM5
   at 115200 8N1 via RXD/TXD pads:

   PIN   EXT3 GPIO Function
   ----  ---- ------------------
    37   PB22 SERCOM5 / USART RX
    38   PB23 SERCOM5 / USART TX
</code></pre><p>usbnsh: This configuration directory will build the NuttShell to work over USB. It uses the internal SAMD21 USB port working as CDC/ACM Serial/Modem.</p><pre><code>Using the configuration you don&#39;t need to solder the header pins RXD/TXD
to get access the NSH terminal.
</code></pre>`,40)]))}const f=o(i,[["render",s]]);export{p as __pageData,f as default};
