import{_ as o,c as t,al as n,o as a}from"./chunks/framework.NFAqBSgQ.js";const p=JSON.parse('{"title":"README","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/am335x/boards/beaglebone-black/README.md","filePath":"en/platforms/arm/am335x/boards/beaglebone-black/README.md"}'),r={name:"en/platforms/arm/am335x/boards/beaglebone-black/README.md"};function i(s,e,l,c,d,h){return a(),t("div",null,e[0]||(e[0]=[n(`<h1 id="readme" tabindex="-1">README <a class="header-anchor" href="#readme" aria-label="Permalink to &quot;README&quot;">​</a></h1><p>This directory contains the port of NuttX to the Beaglebone Black board See <a href="http://beagleboard.org" target="_blank" rel="noreferrer">http://beagleboard.org</a> for information about Beaglebone Black. This board is based around the TI AM335x Sitara Cortex-A8 CPU. This port was developed on the rev. C of the board:</p><p>Beaglebone Black (See <a href="http://beagleboard.org/black" target="_blank" rel="noreferrer">http://beagleboard.org/black</a>)</p><pre><code>ITEMS                DETAILS
-------------------- ---------------------------------------------------
CPU                  1GHz ARM Cortex-A8
GPU                  SG530 3D, 20M Polygons/S
DRAM                 512MB DDR3 800MHz
Onboard Storage      4GB, 8bit Embedded MMC, microSD card (TF) slot for up to 32GB
Video Output         HDMI
Extension Interface  2.54mm Headers, 92 pins
Network interface    10/100Mbps RJ45
Power                5V, 1000mA
Overall Size         3.4&quot; X 2.15&quot;
</code></pre><p>Main features of the TI AM335x Sitara (See <a href="http://www.ti.com/product/am3358" target="_blank" rel="noreferrer">http://www.ti.com/product/am3358</a>):</p><p>CPU - ARM Cortex-A8 - 32KB I-Cache - 32KB D-Cache - 256KB L2 Cache with ECC</p><p>FPU - NEON SIMD Coprocessor</p><p>Memory - 176KB of On-Chip Boot ROM - 64KB of Dedicated RAM - 64KB of General-Purpose On-Chip Memory Controller (OCMC) RAM - 16-bit DDR2/DDR3</p><ul><li>Memory capacity up to 8G bits - 8-Bit and 16-Bit Asynchronous Memory Interface with up to Seven Chip Selects (NAND, NOR, Muxed-NOR, SRAM)</li></ul><p>Boot Devices - NAND Flash - SPI NOR Flash - SD Card - UART</p><p>TODO:</p><h1 id="contents" tabindex="-1">Contents <a class="header-anchor" href="#contents" aria-label="Permalink to &quot;Contents&quot;">​</a></h1><ul><li>Beaglebone black Rev.C Connectors</li><li>Serial Console</li><li>LEDs</li><li>Buttons</li><li>JTAG</li><li>Booting NuttX from an SD card</li><li>Configurations</li></ul><h1 id="beaglebone-black-rev-c-connectors" tabindex="-1">Beaglebone black Rev.C Connectors <a class="header-anchor" href="#beaglebone-black-rev-c-connectors" aria-label="Permalink to &quot;Beaglebone black Rev.C Connectors&quot;">​</a></h1><h1 id="serial-console" tabindex="-1">Serial Console <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;Serial Console&quot;">​</a></h1><p>By default, the serial console will be provided on UART0 in all of these configurations.</p><p>UART0 is available on the 6-pin Debug connector:</p><pre><code>Pin 1: GND
Pin 2: N/C
Pin 3: N/C
Pin 4: B_UART0_RX / UART0_RX / PIN E15
Pin 5: B_UART0_TX / UART0_TX / PIN E16
Pin 6: N/C

PIN E16: UART0_TXD/SPI1_CS1/DCAN0_RX/I2C2_SCL/ECAP1_IN_PWM1_OUT/
         PR1_PRU1_PRU_R30_15/PR1_PRU1_PRU_R31_15/GPIO1_11
PIN E15: UART0_RXD/SPI1_CS0/DCAN0_TX/I2C2_SDA/ECAP2_IN_PWM2_OUT/
         PR1_PRU1_PRU_R30_14/PR1_PRU1_PRU_R31_14/GPIO1_10
</code></pre><h1 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h1><p>The Beaglebone black Rev. C has four blue LEDs; three can be controlled from software. Two are tied to ground and, hence, illuminated by driving the output pins to a high value:</p><pre><code>1. LED0 GPMC_A5   GPMC_A5/GMII2_TXD0/RGMII2_TD0/RMII2_TXD0/GPMC_A21/
                  PR1_MII1_RXD3/eQEP1B_IN/GPIO1_21
2. LED1 GPMC_A6   GPMC_A6/GMII2_TXCLK/RGMII2_TCLK/MMC2_DAT4/GPMC_A22/
                  PR1_MII1_RXD2/eQEP1_INDEX/GPIO1_22
3. LED2 GPMC_A7   GPMC_A7/GMII2_RXCLK/RGMII2_RCLK/MMC2_DAT5/GPMC_A23/
                  PR1_MII1_RXD1/eQEP1_STROBE/GPIO1_23
4. LED3 GPMC_A8   GPMC_A8/GMII2_RXD3/RGMII2_RD3/MMC2_DAT6/GPMC_A24/
                  PR1_MII1_RXD0/MCASP0_ACLKX/GPIO1_24
</code></pre><p>These LEDs are not used by the board port unless CONFIG_ARCH_LEDS is defined. In that case, the usage by the board port is defined in include/board.h and src/am335x_leds.c. The LEDs are used to encode OS-related events as follows:</p><pre><code>SYMBOL            Meaning                      LED state
                                           LED1 LED3 LED4
----------------- -----------------------  ---- ---- ------------
LED_STARTED       NuttX has been started   ON   OFF  OFF
LED_HEAPALLOCATE  Heap has been allocated  OFF  ON   OFF
LED_IRQSENABLED   Interrupts enabled       ON   ON   OFF
LED_STACKCREATED  Idle stack created       ON   ON   OFF
LED_INIRQ         In an interrupt          N/C  N/C  Soft glow
LED_SIGNAL        In a signal handler      N/C  N/C  Soft glow
LED_ASSERTION     An assertion failed      N/C  N/C  Soft glow
LED_PANIC         The system has crashed   N/C  N/C  2Hz Flashing
LED_IDLE          MCU is is sleep mode         Not used
</code></pre><p>After booting, LED1 and 3 are not longer used by the system and can be used for other purposes by the application (Of course, all LEDs are available to the application if CONFIG_ARCH_LEDS is not defined.</p><h1 id="buttons" tabindex="-1">Buttons <a class="header-anchor" href="#buttons" aria-label="Permalink to &quot;Buttons&quot;">​</a></h1><h1 id="jtag" tabindex="-1">JTAG <a class="header-anchor" href="#jtag" aria-label="Permalink to &quot;JTAG&quot;">​</a></h1><h1 id="booting-nuttx-from-an-sd-card" tabindex="-1">Booting NuttX from an SD card <a class="header-anchor" href="#booting-nuttx-from-an-sd-card" aria-label="Permalink to &quot;Booting NuttX from an SD card&quot;">​</a></h1><p>These are the steps to get U-Boot booting from SD Card:</p><pre><code>1. Configure and build the NuttX Beaglebone Black configuration.  You
   should have a file called nuttx.bin when the build completes.

2. Insert a FLASH stick into the host PC and format it for FAT32 FS.

3. Copy nuttx.bin into FLASH stick root.

4. Remove the FLASH stick from the host PC.  Insert into the Beaglebone
   Black microSD slot.

5. Connect a RS-232 Converted or USB serial adapter onto the Beaglebone
   Black board and open a serial terminal on the host PC to communicate
   with the target.

6. Reset the Stop Beaglebone Black boot.  You should see output from
   U-boot in the serial console.  Stop the normal boot-up sequence
   after the U-Boot prompt before Linux is started.:

     Hit any key to stop autoboot: 0
     U-Boot#

7. Load NuttX into memory from the U-Boot prompt and run

     U-Boot# load mmc 0 0x8a000000 nuttx.bin
     U-Boot# go 0x8a000000

   If your are running the &#39;nsh&#39; configuration you then should see:

     NuttShell (NSH)
     nsh&gt;
</code></pre><h1 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h1><h2 id="information-common-to-all-configurations" tabindex="-1">Information Common to All Configurations <a class="header-anchor" href="#information-common-to-all-configurations" aria-label="Permalink to &quot;Information Common to All Configurations&quot;">​</a></h2><p>Each Beaglebone Black configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh [OPTIONS] beaglebone-black:&lt;subdir&gt;
</code></pre><p>Where [OPTIONS] include -l to configure for a Linux host platform and -c means to configure for a Windows Cygwin host platform. -h will give you the list of all options.</p><p>Before building, make sure the PATH environment variable includes the correct path to the directory than holds your toolchain binaries.</p><p>And then build NuttX by simply typing the following. At the conclusion of the make, the nuttx binary will reside in an ELF file called, simply, nuttx.</p><pre><code>make
</code></pre><p>The <code>&lt;subdir&gt;</code> that is provided above as an argument to the tools/configure.sh must be is one of the following.</p><p>NOTES:</p><ol><li>These configurations use the mconf-based configuration tool. To change any of these configurations using that tool, you should:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- --&gt;</span></span></code></pre></div><pre><code>a. Build and install the kconfig-mconf tool.  See nuttx/README.txt
   see additional README.txt files in the NuttX tools repository.

b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the
   reconfiguration process.
</code></pre><ol start="2"><li><p>Unless stated otherwise, all configurations generate console output on UART0.</p></li><li><p>All of these configurations use the Code Sourcery for Windows toolchain (unless stated otherwise in the description of the configuration). That toolchain selection can easily be reconfigured using &#39;make menuconfig&#39;. Here are the relevant current settings:</p><p>Build Setup: CONFIG_HOST_WINDOWS=y : Microsoft Windows CONFIG_WINDOWS_CYGWIN=y : Using Cygwin or other POSIX environment</p><p>System Type -&gt; Toolchain: CONFIG_ARM_TOOLCHAIN_GNU_EABI=y : GNU EABI toolchain</p></li></ol><p>Configuration Sub-directories -----------------------------</p><p>lcd:</p><pre><code>This is an NSH configuration based on the nsh configuration belong but
with LCD support enabled.  This configuration will be used for developing
and verifying basic LCD functionality.

NOTES:

1. The framebuffer is assumed to reside at address 0x80000000 and has a
   maximum size 0x0a000000, although probably less than 1Mb will actually
   be used for the framebuffer.

2. The HDMI interface is assumed.  The TDA19988 HDMI interface is enabled.

STATUS:
2019-07-09:  This is very much a work in progress and not suitable for
   any use other than testing.
</code></pre><p>nsh:</p><pre><code>This configuration directory provide the NuttShell (NSH).  There are

STATUS:
  2019-01-06:  Work in progress. Till now it is possible to pass arm_boot(), but
    Prefetch abort is met when devnull_register() call is done. Have no idea why.
    I was able to trace down to _inode_search() call. If I put any debug statement
    like &quot;arm_lowputc(&#39;0&#39;);&quot; right after &quot;desc-&gt;node = node;&quot; statement at line 425
    the code does not crash.
  2019-01-09:  The NSH configuration is now functional.
  2019-01-16:  Correct timer interrupts by switching to DMTimer2 (DMTimer1ms is
    not initialized by U-Boot).
</code></pre>`,48)]))}const b=o(r,[["render",i]]);export{p as __pageData,b as default};
