import{_ as o,c as a,al as t,o as n}from"./chunks/framework.NFAqBSgQ.js";const p=JSON.parse('{"title":"README","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/avr/atmega/boards/arduino-mega2560/README.md","filePath":"en/platforms/avr/atmega/boards/arduino-mega2560/README.md"}'),i={name:"en/platforms/avr/atmega/boards/arduino-mega2560/README.md"};function r(s,e,l,d,c,u){return n(),a("div",null,e[0]||(e[0]=[t(`<h1 id="readme" tabindex="-1">README <a class="header-anchor" href="#readme" aria-label="Permalink to &quot;README&quot;">​</a></h1><p>This is the README file for the port of NuttX to the Arduino Mega 2560 Rev3.</p><pre><code>https://www.arduino.cc/en/Main/ArduinoBoardMega2560
</code></pre><p>The board is based on ATMega2560 chip from Atmel</p><p><a href="http://www.atmel.com/devices/atmega2560.aspx" target="_blank" rel="noreferrer">http://www.atmel.com/devices/atmega2560.aspx</a></p><h1 id="contents" tabindex="-1">Contents <a class="header-anchor" href="#contents" aria-label="Permalink to &quot;Contents&quot;">​</a></h1><p>o Toolchain o Serial Console o Configurations</p><h1 id="toolchain" tabindex="-1">Toolchain <a class="header-anchor" href="#toolchain" aria-label="Permalink to &quot;Toolchain&quot;">​</a></h1><p>Right now only Atmel&#39;s AVR8 Toolchain is supported. You can get it from</p><pre><code>http://www.atmel.com/tools/atmelavrtoolchainforwindows.aspx
</code></pre><p>It is basically WinAVR compatible so sub-projects may define WinAVR as a tool-chain but specify path to the Atmel AVR8 in path. See arduino-mega2560/hello for example.</p><h1 id="serial-console" tabindex="-1">Serial Console <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;Serial Console&quot;">​</a></h1><p>The serial console is available on USART0. You will need to connect an RS-232 shield or an external RS-232 driver as follows:</p><pre><code>TXD: TX0-&gt;1
RXD: RX0-&gt;0
GND: Power GND
+5V: Power +5V
</code></pre><p>You will then need to use a terminal program configured at 38400 8N1.</p><h1 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h1><h2 id="common-configuration-notes" tabindex="-1">Common Configuration Notes <a class="header-anchor" href="#common-configuration-notes" aria-label="Permalink to &quot;Common Configuration Notes&quot;">​</a></h2><p>1. Each Arduino MEGA2560 configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>   tools/configure.sh arduino-mega2560:&lt;subdir&gt;

 Where &lt;subdir&gt; is one of the configuration sub-directories described in
 the following paragraph.
</code></pre><ol start="2"><li><p>These configurations use the mconf-based configuration tool. To change a configurations using that tool, you should:</p><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository.</p><p>b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</p></li><li><p>By default, all configurations assume the Atmel Studio AVR8 toolchain under Cygwin with Windows. This is easily reconfigured:</p><p>CONFIG_HOST_WINDOWS=y CONFIG_WINDOWS_CYGWIN=y CONFIG_AVR_BUILDROOT_TOOLCHAIN=y</p></li></ol><h2 id="configuration-sub-directories" tabindex="-1">Configuration Sub-Directories <a class="header-anchor" href="#configuration-sub-directories" aria-label="Permalink to &quot;Configuration Sub-Directories&quot;">​</a></h2><p>hello: The simple apps/examples/hello &quot;Hello, World!&quot; example.</p><p>nsh: This is a reduce NuttShell (NSH) configuration using apps/example/nsh. The serial console is provided on USART0 and can be accessed via an external RS-232 driver as described above under &quot;Serial Console&quot;.</p><pre><code>NOTES:

1. As of 2015-01-16, the default static memory usage is:

     $ size nuttx.elf
      text    data     bss     dec     hex filename
     34348    2117     944   37409    9221 nuttx.elf

   And dynamic, heap usage:

     nsh&gt; free
                  total       used       free    largest
     Mem:          4736       1768       2968       2968

   There is plenty of FLASH space but not a lot of free SRAM. This
   SRAM usage is due primarily to constant strings defined by NSH.

   NOTE: I investigated the possibility of adding IPTR/IOBJ
   qualifiers in the NSH library and moving the strings to FLASH.
   This is still a possibility but would requires some extensive
   changes to NSH.
</code></pre>`,24)]))}const f=o(i,[["render",r]]);export{p as __pageData,f as default};
