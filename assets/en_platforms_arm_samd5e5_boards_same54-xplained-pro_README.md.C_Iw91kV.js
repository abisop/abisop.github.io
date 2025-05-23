import{_ as t,c as o,al as a,o as n}from"./chunks/framework.NFAqBSgQ.js";const p=JSON.parse('{"title":"README","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/samd5e5/boards/same54-xplained-pro/README.md","filePath":"en/platforms/arm/samd5e5/boards/same54-xplained-pro/README.md"}'),i={name:"en/platforms/arm/samd5e5/boards/same54-xplained-pro/README.md"};function r(s,e,l,d,u,c){return n(),o("div",null,e[0]||(e[0]=[a(`<h1 id="readme" tabindex="-1">README <a class="header-anchor" href="#readme" aria-label="Permalink to &quot;README&quot;">​</a></h1><p>This directory contains the port of NuttX to the Microchip SAME54 Xplained Pro board. This board is powered by an ATSAME54P20A:</p><p>o Cortex M4 core running at 120 MHz o Hardware DSP and floating point support o 1 MB flash, 256 KB RAM o 32-bit, 3.3V logic and power o Dual 1 MSPS DAC (A0 and A1) o Dual 1 MSPS ADC (8 analog pins) o 8 x hardware SERCOM (I2C, SPI or UART) o 16 x PWM outputs o Stereo I2S input/output with MCK pin o 14-bit Parallel capture controller (for camera/video in) o Built in crypto engines with AES (256 bit), true RNG, Pubkey controller o 10/100 Ethernet MAC o Dual SD/MMC controller o Dual CAN bus interfaces o 100-TQFP</p><h1 id="contents" tabindex="-1">Contents <a class="header-anchor" href="#contents" aria-label="Permalink to &quot;Contents&quot;">​</a></h1><p>o STATUS o Serial Console o LEDs o Run from SRAM o Configurations</p><h1 id="status" tabindex="-1">STATUS <a class="header-anchor" href="#status" aria-label="Permalink to &quot;STATUS&quot;">​</a></h1><p>2019-09-17: Board port started based on Metro M4 board.</p><p>WARNING: If you decide to invest the time to discover whey the XOSC32K clock source is not working, be certain to use the SRAM configuration. That configuration in FLASH is most likely lock up your board irrecoverably is there are any start-up errors!</p><h1 id="serial-console" tabindex="-1">Serial Console <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;Serial Console&quot;">​</a></h1><p>The onboard debugger on the SAME54 Xplained Pro provides a virtual serial interface over the DEBUG USB port. The pins on the SAME54 are as follows:</p><pre><code>----------------- -----------
SAMD5E5           FUNCTION
----------------- -----------
PB24 SERCOM2 PAD1 RXD
PB25 SERCOM2 PAD0 TXD
</code></pre><p>An external RS-232 or serial-to-USB adapter can be connected on pins PA22 and PA23:</p><pre><code>----------------- ---------
SAMD5E5           FUNCTION
----------------- ---------
PA23 SERCOM3 PAD1 RXD
PA22 SERCOM3 PAD0 TXD
</code></pre><h1 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h1><p>The SAME54 Xplained Pro has three LEDs, but only one is controllable by software:</p><pre><code>1. LED0 near the edge of the board

----------------- -----------
SAMD5E5           FUNCTION
----------------- -----------
PC18              GPIO output
</code></pre><h1 id="run-from-sram" tabindex="-1">Run from SRAM <a class="header-anchor" href="#run-from-sram" aria-label="Permalink to &quot;Run from SRAM&quot;">​</a></h1><p>I bricked my first Metro M4 board because there were problems in the bring-up logic. These problems left the chip in a bad state that was repeated on each reset because the code was written into FLASH and I was unable to ever connect to it again via SWD.</p><p>To make the bring-up less risky, I added a configuration option to build the code to execution entirely out of SRAM. By default, the setting CONFIG_SAME54_XPLAINED_PRO_RUNFROMFLASH=y is used and the code is built to run out of FLASH. If CONFIG_SAME54_XPLAINED_PRO_RUNFROMSRAM=y is selected instead, then the code is built to run out of SRAM.</p><p>To use the code in this configuration, the program must be started a little differently:</p><pre><code>gdb&gt; mon reset
gdb&gt; mon halt
gdb&gt; load nuttx             &lt;&lt; Load NuttX into SRAM
gdb&gt; file nuttx             &lt;&lt; Assuming debug symbols are enabled
gdb&gt; mon memu32 0x20000000  &lt;&lt; Get the address of initial stack
gdb&gt; mon reg sp 0x200161c4  &lt;&lt; Set the initial stack pointer using this address
gdb&gt; mon memu32 0x20000004  &lt;&lt; Get the address of __start entry point
gdb&gt; mon reg pc 0x20000264  &lt;&lt; Set the PC using this address (without bit 0 set)
gdb&gt; si                     &lt;&lt; Step in just to make sure everything is okay
gdb&gt; [ set breakpoints ]
gdb&gt; c                      &lt;&lt; Then continue until you hit a breakpoint
</code></pre><p>Where 0x200161c4 and 0x20000264 are the values of the initial stack and the __start entry point that I read from SRAM</p><h1 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h1><p>Each SAME54 Xplained Pro configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh [OPTIONS] same54-xplained-pro:&lt;subdir&gt;
</code></pre><p>Do &#39;tools/configure.sh -h&#39; for the list of options. If you are building under Windows with Cygwin, you would need the -c option, for example.</p><p>Before building, make sure that the PATH environmental variable includes the correct path to the directory than holds your toolchain binaries.</p><p>And then build NuttX by simply typing the following. At the conclusion of the make, the nuttx binary will reside in an ELF file called, simply, nuttx.</p><pre><code>make
</code></pre><p>The <code>&lt;subdir&gt;</code> that is provided above as an argument to the tools/configure.sh must be is one of configurations listed in the following paragraph.</p><p>NOTES:</p><ol><li>These configurations use the mconf-based configuration tool. To change any of these configurations using that tool, you should:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- --&gt;</span></span></code></pre></div><pre><code>a. Build and install the kconfig-mconf tool.  See nuttx/README.txt
   see additional README.txt files in the NuttX tools repository.

b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the
   reconfiguration process.
</code></pre><ol start="2"><li><p>Unless stated otherwise, all configurations generate console output on SERCOM2 which is available via USB debug.</p></li><li><p>Unless otherwise stated, the configurations are setup build under Linux with a generic ARM EABI toolchain:</p></li></ol><h2 id="configuration-sub-directories" tabindex="-1">Configuration sub-directories <a class="header-anchor" href="#configuration-sub-directories" aria-label="Permalink to &quot;Configuration sub-directories&quot;">​</a></h2><p>nsh: This configuration directory will built the NuttShell. See NOTES for common configuration above and the following:</p><pre><code>NOTES:

1. The CMCC (Cortex M Cache Controller) is enabled.
</code></pre>`,38)]))}const b=t(i,[["render",r]]);export{p as __pageData,b as default};
