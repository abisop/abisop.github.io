import{_ as t,c as o,al as n,o as i}from"./chunks/framework.NFAqBSgQ.js";const p=JSON.parse('{"title":"README","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/a1x/boards/pcduino-a10/README.md","filePath":"en/platforms/arm/a1x/boards/pcduino-a10/README.md"}'),a={name:"en/platforms/arm/a1x/boards/pcduino-a10/README.md"};function r(l,e,s,c,d,h){return i(),o("div",null,e[0]||(e[0]=[n(`<h1 id="readme" tabindex="-1">README <a class="header-anchor" href="#readme" aria-label="Permalink to &quot;README&quot;">​</a></h1><p>This directory contains the port of NuttX to the pcDuino v1 board See <a href="http://www.pcduino.com/" target="_blank" rel="noreferrer">http://www.pcduino.com/</a> for information about pcDuino Lite, v1, and v2. These boards are based around the Allwinner A10 Cortex-A8 CPU. I have not compared these boards in detail, but I believe that the differences are cosmetic. This port was developed on the v1 board, but the others may be compatible:</p><p>pcDuino Lite (See <a href="http://www.pcduino.com/?page%5C_id=1707" target="_blank" rel="noreferrer">http://www.pcduino.com/?page\\_id=1707</a>)</p><pre><code>ITEMS                DETAILS
-------------------- ---------------------------------------------------
CPU                  1GHz ARM Cortex A8
GPU                  OpenGL ES2.0, OpenVG 1.1 Mali 400 core
DRAM                 512B
Onboard Storage      NO Flash, microSD card (TF) slot for up to 32GB
Video Output         HDMI
Extension Interface  2.54mm Headers
Network interface    10/100Mbps RJ45 and USB WiFi extension (not included)
Power                5V, 2000mA
Overall Size         125mm X 52mm
</code></pre><p>pcDuino v1 (<a href="http://www.pcduino.com/?page%5C_id=12" target="_blank" rel="noreferrer">http://www.pcduino.com/?page\\_id=12</a>)</p><pre><code>ITEMS                DETAILS
-------------------- ---------------------------------------------------
Items                Details
CPU                  1GHz ARM Cortex A8
GPU                  OpenGL ES2.0, OpenVG 1.1 Mali 400 core
</code></pre><ul><li>DRAM 1GB</li><li>Onboard Storage 2GB Flash, microSD card (TF) slot for up to 32GB Video Output HDMI Extension Interface 2.54mm Headers Network interface 10/100Mbps RJ45 and USB WiFi extension (not included) Power 5V, 2000mA Overall Size 125mm X 52mm</li></ul><p>pcDuino v2 (<a href="http://www.pcduino.com/?page%5C_id=1618" target="_blank" rel="noreferrer">http://www.pcduino.com/?page\\_id=1618</a>)</p><pre><code>ITEMS                DETAILS
-------------------- ---------------------------------------------------
Items                Details
CPU                  1GHz ARM Cortex A8
GPU                  OpenGL ES2.0, OpenVG 1.1 Mali 400 core
DRAM                 1GB
Onboard Storage      2GB Flash, microSD card (TF) slot for up to 32GB
Video Output         HDMI
</code></pre><ul><li>Extension Interface Arduino Headers</li><li>Network interface 10/100Mbps RJ45 and on-board WiFi module Power 5V, 2000mA Overall Size 125mm X 52mm</li></ul><p>Main features of the Allwinner A10 (See <a href="http://www.allwinnertech.com/en/product/a10.html" target="_blank" rel="noreferrer">http://www.allwinnertech.com/en/product/a10.html</a>):</p><p>CPU - ARM Cortex™-A8 - 32KB I-Cache - 32KB D-Cache - 256KB L2 Cache</p><p>GPU - ARM Mali-400</p><p>Video - UHD 2160P video decoding - 3D video decoding - Support various video decoding formats, including VP8, AVS, H. 264 MVC, VC-1, MPEG-1,2,4, etc - H.264 HP video encoding up to 1080p @ 30 fps or dual-channel 720p @ 30 fps</p><p>Display - Multi-channel HD display - Integrated HDMI 1.4 - YPbPr, CVBS, VGA - Multiple LCD interfaces, including CPU, RGB, LVDS up to Full HD</p><p>Memory - 32-bit DDR2/DDR3 - Memory capacity up to 16G bits - SLC/MLC/TLC/DDR NAND - 8 flash chips, 64-bit ECC</p><pre><code>    Memory capacity up to 64GB
    Support NAND of 5xnm, 4xnm, 3xnm, 2xnm, etc
    Support NAND of Samsung, Toshiba, Hynix, etc
</code></pre><p>Boot Devices - NAND Flash - SPI NOR Flash - SD Card - USB</p><h1 id="contents" tabindex="-1">Contents <a class="header-anchor" href="#contents" aria-label="Permalink to &quot;Contents&quot;">​</a></h1><ul><li>pcDuino v1 Connectors</li><li>Serial Console</li><li>LEDs</li><li>Buttons</li><li>JTAG</li><li>Booting NuttX from an SD card</li><li>Configurations</li></ul><h1 id="pcduino-v1-connectors" tabindex="-1">pcDuino v1 Connectors <a class="header-anchor" href="#pcduino-v1-connectors" aria-label="Permalink to &quot;pcDuino v1 Connectors&quot;">​</a></h1><h2 id="top" tabindex="-1">TOP <a class="header-anchor" href="#top" aria-label="Permalink to &quot;TOP&quot;">​</a></h2><p>- HDMI - RJ45 - USB Host (2)</p><ul><li>J11 <ol><li>UART-Rx / GPIO0 UART2_RX</li><li>UART-Tx / GPIO1 UART2_TX</li><li>GPIO3 / GPIO2 GPIO2</li><li>PWM0 / GPIO3 PWM0</li><li>GPIO4 GPIO3</li><li>PWM1 / GPIO5 PWM1</li><li>PWM2 /GPIO6 PWM2</li><li>GPIO7 GPIO4</li></ol></li><li>J8 <ol><li>GPIO8 GPIO5</li><li>PWM3 / GPIO9 PWM3</li><li>SPI_CS / GPIO10 / PWM4 SPI0_CS</li><li>SPI_MOSI / GPIO11 / PWM5 SPI0_MOSI</li><li>SPI_MISO / GPIO12 SPI0_MISO</li><li>SPI_CLK / GPIO13 SPI0_CLK</li><li>Gnd</li><li>ARef</li><li>I2C-SDA TWI2_SDA</li><li>I2C-SCK TWI2_SCK</li></ol></li><li>J12 <ol><li>ADC0</li><li>ADC1</li><li>ADC2</li><li>ADC3</li><li>ADC4</li><li>ADC5</li></ol></li><li>J9 <ol><li>5V</li><li>Gnd</li><li>Gnd</li><li>5V</li><li>3.3V</li><li>Reset</li><li>5V</li><li>NC</li></ol></li><li>J5 Debug Port <ol><li>Rx UART0-RX</li><li>Gnd GND</li><li>Tx UART0-TX</li></ol></li><li>J6 SPI2 <ol><li>SPI2_MISO</li><li>DC_5V</li><li>SPI2_CLK</li><li>SPI2_MOSI</li><li>RESET#</li><li>GND</li></ol></li><li>J7 SPI0 <ol><li>SPI0_MISO</li><li>DC_5V</li><li>SPI0_CLK</li><li>SPI0_MOSI</li><li>RESET#</li><li>GND</li></ol></li><li>J10 <ol><li>GPIO6</li><li>GPIO8</li><li>GPIO7</li><li>GPIO9</li></ol></li></ul><h2 id="bottom" tabindex="-1">Bottom <a class="header-anchor" href="#bottom" aria-label="Permalink to &quot;Bottom&quot;">​</a></h2><p>- USB OTG - DC Power IN (USB) - microSD card slot</p><h1 id="serial-console" tabindex="-1">Serial Console <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;Serial Console&quot;">​</a></h1><ol><li><p>UART0 is available on J5 Debug Port.</p><p>J15 Pin 1 Rx UART0-RX UART0_RX/IR1_RX/PB23 J15 Pin 3 Tx UART0-TX UART0_TX/IR1_TX/PB22</p></li><li><p>UART2 is available on J11</p><p>J11 Pin1 UART-Rx / GPIO0 UART2_RX EINT31/SPI1_MISO/UART2_RX/PI19 J11 Pin2 UART-Tx / GPIO1 UART2_TX EINT30/SPI1_MOSI/UART2_TX/PI18</p></li></ol><p>By default, the serial console will be provided on UART0 in all of these configurations.</p><h1 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h1><p>The pcDuino v1 has four green LEDs; three can be controlled from software. Two are tied to ground and, hence, illuminated by driving the output pins to a high value:</p><pre><code>1. LED1 SPI0_CLK  SPI0_CLK/UART5_RX/EINT23/PI11
2. LED5 IPSOUT    From the PMU (not controllable by software)
</code></pre><p>And two are pull high and, hence, illuminated by grounding the output:</p><pre><code>3. LED3 RX_LED    LCD1_D16/ATAD12/KP_IN6/SMC_DET/EINT16/CSI1_D16/PH16
4. LED4 TX_LED    LCD1_D15/ATAD11/KP_IN5/SMC_VPPPP/EINT15/CSI1_D15/PH15
</code></pre><p>These LEDs are not used by the board port unless CONFIG_ARCH_LEDS is defined. In that case, the usage by the board port is defined in include/board.h and src/stm32_leds.c. The LEDs are used to encode OS-related events as follows:</p><pre><code>SYMBOL            Meaning                      LED state
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
</code></pre><p>After booting, LED1 and 3 are not longer used by the system and can be used for other purposes by the application (Of course, all LEDs are available to the application if CONFIG_ARCH_LEDS is not defined.</p><h1 id="buttons" tabindex="-1">Buttons <a class="header-anchor" href="#buttons" aria-label="Permalink to &quot;Buttons&quot;">​</a></h1><p>There are a total of five switches on-board. All pulled high and, hence, will be sensed as low when closed.</p><pre><code>SW1 Reset     (not available to software)
SW2 UBOOT     UBOOT_SEL (?)
SW3 Key_Back  LCD1_D17/ATAD13/KP_IN7/SMC_VCCEN/EINT17/CSI1_D17/PH17
SW4 Key_Home  LCD1_D18/ATAD14/KP_OUT0/SMC_SLK/EINT18/CSI1_D18/PH18
SW5 Key_Menu  LCD1_D19/ATAD15/KP_OUT1/SMC_SDA/EINT19/CSI1_D19/PH19
</code></pre><h1 id="jtag" tabindex="-1">JTAG <a class="header-anchor" href="#jtag" aria-label="Permalink to &quot;JTAG&quot;">​</a></h1><p>A. I didn&#39;t get success testing J-Link with pcDuino, it is reading TDI always as 1.</p><pre><code> I think the main problem is because pcDuino JTAG doesn&#39;t have RESET
 (no trst or srst). I tried to connect the JTAG reset to Power_Reset
 of pcDuino, but it didn&#39;t work.
</code></pre><p>B. Notice that the OlinuxIno JTAG does have a reset line called RESET_N. But it is nothing special. It just connects to the RESET# pin C14 on the A10. The pcDuino also brings out the RESET# on several connectors.</p><pre><code> So it seems like you could get the reset line if you need it, just not
 from the set of JTAG pads.
</code></pre><p>A. I discovered the issue in the JTAG, it was not working because JTAG_SEL was not tied to GND.</p><pre><code>I compared the Olimex schematic with pcDuino and noticed there is a
R64 resister that is not placed in the board.

It was a little bit difficult to find this resistor, because it is
&quot;hidden&quot; among the capacitors in the bottom of the board.

After short circuiting the resistor PADs the JTAG started to work,
well, JLinkExe now recognize it, but OpenOCD is not working yet.
</code></pre><h1 id="booting-nuttx-from-an-sd-card" tabindex="-1">Booting NuttX from an SD card <a class="header-anchor" href="#booting-nuttx-from-an-sd-card" aria-label="Permalink to &quot;Booting NuttX from an SD card&quot;">​</a></h1><p>These are the steps to get U-Boot booting from SD Card:</p><pre><code>1. Get the U-Boot sources for the pcDuino

   $ git clone https://github.com/yuq/u-boot-sunxi.git

2. Build U-Boot.  We really only want the SPL program; this builds
   the whole thing:

   $ cd u-boot-sunxi
   $ make pcduino CROSS_COMPILE=arm-none-eabi-

   At the conclusion of a success bin, you will find the u-boot binary
   at ./u-boot.bin and the SPL binary at ./spl/sunxi-spl.bin

   NOTES:
   a. You may need to use a different tool prefix for the CROSS_COMPILE=
      value, depending upon what toolchain you have installed and upon
      which platform your are working.
   b. When I try this on Cygwin, I get a make failure that is, apparently,
      due to some script incompatibility.

3. Insert a FLASH stick.  Use dmesg to get the name of the new USB
   device.  Make sure that it is not mounted, then (assuming that the
   USB device is /dev/sdb):

   $ sudo dd if=./spl/sunxi-spl.bin of=/dev/sdb bs=1024 seek=8
   $ sudo dd if=nuttx.bin of=/dev/sdb bs=1024 seek=32

4. Remove the FLASH stick from the host pc.  Insert into the pcDuino
   microSD slot.  Reset the pcDuino and NuttX should be running.
</code></pre><p>Reference: <a href="https://www.olimex.com/wiki/Bare%5C_Metal%5C_programming%5C_A13%5C#Stand%5C_alone%5C_program%5C_running%5C_with%5C_uboot" target="_blank" rel="noreferrer">https://www.olimex.com/wiki/Bare\\_Metal\\_programming\\_A13\\#Stand\\_alone\\_program\\_running\\_with\\_uboot</a></p><h1 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h1><h2 id="information-common-to-all-configurations" tabindex="-1">Information Common to All Configurations <a class="header-anchor" href="#information-common-to-all-configurations" aria-label="Permalink to &quot;Information Common to All Configurations&quot;">​</a></h2><p>Each pcDuino configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh [OPTIONS] pcduino-a10:&lt;subdir&gt;
</code></pre><p>Where [OPTIONS] include -l to configure for a Linux host platform and -c means to configure for a Windows Cygwin host platform. -h will give you the list of all options.</p><p>Before building, make sure the PATH environment variable includes the correct path to the directory than holds your toolchain binaries.</p><p>And then build NuttX by simply typing the following. At the conclusion of the make, the nuttx binary will reside in an ELF file called, simply, nuttx.</p><pre><code>make
</code></pre><p>The <code>&lt;subdir&gt;</code> that is provided above as an argument to the tools/configure.sh must be is one of the following.</p><p>NOTES:</p><ol><li>These configurations use the mconf-based configuration tool. To change any of these configurations using that tool, you should:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- --&gt;</span></span></code></pre></div><pre><code>a. Build and install the kconfig-mconf tool.  See nuttx/README.txt
   see additional README.txt files in the NuttX tools repository.

b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the
   reconfiguration process.
</code></pre><ol start="2"><li><p>Unless stated otherwise, all configurations generate console output on UART0.</p></li><li><p>All of these configurations use the Code Sourcery for Windows toolchain (unless stated otherwise in the description of the configuration). That toolchain selection can easily be reconfigured using &#39;make menuconfig&#39;. Here are the relevant current settings:</p><p>Build Setup: CONFIG_HOST_WINDOWS=y : Microsoft Windows CONFIG_WINDOWS_CYGWIN=y : Using Cygwin or other POSIX environment</p><p>System Type -&gt; Toolchain: CONFIG_ARM_TOOLCHAIN_GNU_EABI=y : GNU EABI toolchain</p></li></ol><p>Configuration Sub-directories -----------------------------</p><p>nsh:</p><pre><code>This configuration directory provide the NuttShell (NSH).  There are

STATUS:
  This configuration builds and runs, but only if the patch at
  nuttx/boards/arm/a1x/pcduino-a10/nsh/pcduino-140107.patch is applied.  This patchfile
  contains some fixes that are as-of-yet not well understood and so cannot be checked
  in.  Below is a summary of the kludges currently in this patch file:

  a) nuttx/arch/arm/src/armv7-a/arm_head.S: Initializes the MMU so that A10
     peripherals can be accessed very early.  This is not normally necessary, but
     is required because of certain debug statements that seem to be necessary
     in a1x_boot.c (see the next item).

  b) nuttx/arch/arm/src/a1x/a1x_boot.c:  This file contains several arbitrary
     statements that just output debug information.  Some of these can be removed,
     but if you remove all of the debug output, the pcDuino will not boot.  No
     idea yet why.

  c) nuttx/arch/arm/src/armv7-a/arm_mmu.c:  After setting a page table entry
     for the MMU, the MMU&#39;s TLBs are flushed for that memory region.  That
     flushing must currently be commented out.  Why?  I am not sure, but I
     think that this is because TLBs are being flushed why they are in use.  For
     the pcDuino, we are executing out of SDRAM so when the TLBs for the SDRAM
     region are invalidated that cause a crash.  That has not been proven,
     however.
</code></pre>`,68)]))}const m=t(a,[["render",r]]);export{p as __pageData,m as default};
