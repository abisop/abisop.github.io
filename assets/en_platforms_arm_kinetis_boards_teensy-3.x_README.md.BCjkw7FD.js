import{_ as n,c as t,al as o,o as a}from"./chunks/framework.NFAqBSgQ.js";const p=JSON.parse('{"title":"README","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/kinetis/boards/teensy-3.x/README.md","filePath":"en/platforms/arm/kinetis/boards/teensy-3.x/README.md"}'),i={name:"en/platforms/arm/kinetis/boards/teensy-3.x/README.md"};function s(r,e,l,h,d,c){return a(),t("div",null,e[0]||(e[0]=[o(`<h1 id="readme" tabindex="-1">README <a class="header-anchor" href="#readme" aria-label="Permalink to &quot;README&quot;">​</a></h1><p>This is a README file for the port of NuttX to the Teensy-3.1 from PJRC (<a href="https://www.pjrc.com/" target="_blank" rel="noreferrer">https://www.pjrc.com/</a>). The Teensy-3.1 features the Freescale MK20DX256VLH7 chip (now NXP). The MK20DX256VLH7 is a 64-pin Cortex-M4 running at 72MHz. It has 256KiB of program FLASH memory and 64KiB of SRAM. For more information about the Teensy 3.1, see</p><pre><code>https://www.pjrc.com/teensy/teensy31.html
https://www.pjrc.com/store/teensy31.html
</code></pre><p>This board configuration can also be used with the older Teensy-3.0. The Teensy-3.0 has the same schematic (although some pins are not used on the Teensy-3.0). The primary difference is that the Teensy 3.0 has a MK20DX128VLH5 with slightly less capability. There are many difference between the MK20DX256VLH7 and the MK20DX128VLH5 but the basic differences that effect how you configure NuttX are:</p><pre><code>--------------- -------------- -------------- ---------------------------
Feature         Teensy 3.0     Teensy 3.1     Teensy 3.0 CONFIGURATION
--------------- -------------- -------------- ---------------------------
Processor
  Core          MK20DX128VLH5  MK20DX256VLH7  CONFIG_ARCH_CHIP_MK20DX128VLH5=y
  Rated Speed    48 MHz         72 MHz        See Note 1
  Overclockable  96 MHz         96 MHz        CONFIG_TEENSY_3X_OVERCLOCK=y
Flash Memory    128 KB         256 KB         See Note 1
SRAM             16 KB          64 KB         CONFIG_RAM_SIZE=16384 and
                                              see Note 2
--------------- -------------- -------------- ---------------------------
</code></pre><p>NOTES: 1. Settings in boards/arm/kinetis/teensy-3.x/include/board.h will automatically select the correct clocking based on CONFIG_ARCH_CHIP_MK20DX128VLH5=y. 2. The linker script at boards/arm/kinetis/teensy-3.x/scripts/mk30dx128vlh5.ld will automatically be selected when CONFIG_ARCH_CHIP_MK20DX128VLH5=y. It will use the correct FLASH and SRAM sizes.</p><p>The initial Teensy-3.1 port is largely the effort of Jakob Odersky. <a href="https://github.com/jodersky/nuttx/tree/teensy31-7.6" target="_blank" rel="noreferrer">https://github.com/jodersky/nuttx/tree/teensy31-7.6</a> and <a href="https://github.com/jodersky/px4-nuttx" target="_blank" rel="noreferrer">https://github.com/jodersky/px4-nuttx</a></p><h1 id="contents" tabindex="-1">Contents <a class="header-anchor" href="#contents" aria-label="Permalink to &quot;Contents&quot;">​</a></h1><p>o STATUS o Pin Configuration o Serial Console o LEDs o Using the Halfkey Loader o Debugging o Teensy-3.1 Configuration settings o Configurations</p><h1 id="status" tabindex="-1">STATUS <a class="header-anchor" href="#status" aria-label="Permalink to &quot;STATUS&quot;">​</a></h1><p>2015-06-11: After some extended tinkering with the PLL setup, the Teensy-3.1 is fully functional using the basic NSH configuration. 2015-06-12: Fix LED (need high drive strength). Calibrate delay loop.</p><h1 id="pin-configuration" tabindex="-1">Pin Configuration <a class="header-anchor" href="#pin-configuration" aria-label="Permalink to &quot;Pin Configuration&quot;">​</a></h1><p>Nearly all pins are available to the user. The few port pins used on board are listed below:</p><pre><code>----- --------------------------------------
P0RT  BOARD USAGE
----- --------------------------------------
PTA0  MINI54TAN / Bootloader
PTA1  MINI54TAN / Bootloader
PTA2  MINI54TAN / Bootloader
PTA3  MINI54TAN / Bootloader
PTA18 16MHz XTAL  (XTAL32 is not populated).
PTA19 16MHz XTAL
PTB1  MINI54TAN / Bootloader
PTB2  MINI54TAN / Bootloader
PTC5  LED
----- --------------------------------------
</code></pre><h1 id="serial-console" tabindex="-1">Serial Console <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;Serial Console&quot;">​</a></h1><p>The K20 has three UARTs with pin availability as follows:</p><pre><code>--------- ------ ----------- -------------------------
UART      PORT   BOARD       PJRC PINOUT DESCRIPTION
FUNCTION         LABEL
--------- ------ ----------- -------------------------
UART0_RX  PTA1   (See above) MINI54TAN / Bootloader
          PTB16  Pin 0       RX1 / Touch
          PTD6   Pin 21 / A7 RX1 / CS / PWM
UART0_TX  PTA2   (See above) MINI54TAN / Bootloader
          PTB17  Pin 1       TX1 / Touch
          PTD7   Pin 5       TX1 / PWM
--------- ------ ----------- -------------------------
UART1_RX  PTC3   Pin 9       RX2 / CS / PWM
          PTE1   Pad 26      (Pad on back of board)
UART1_TX  PTC4   Pin 10      TX2 / CS / PWM
          PTE0   Pad 31      (Pad on back of board)
--------- ------ ----------- -------------------------
UART2_RX  PTD2   Pin 7       RX3 / DOUT
UART2_TX  PTD3   Pin 8       TX3 / DIN
--------- ------ ----------- -------------------------
</code></pre><p>The default serial console is UART0 on pins 0 (RX) and 1 (TX).</p><h1 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h1><p>A single LED is available driven by PTC5. The LED is grounded so bringing PTC5 high will illuminate the LED.</p><p>When CONFIG_ARCH_LEDS is defined in the NuttX configuration, NuttX will control the LED as follows:</p><pre><code>SYMBOL              Meaning                 LED
------------------- ----------------------- ------
LED_STARTED         NuttX has been started  OFF
LED_HEAPALLOCATE    Heap has been allocated OFF
LED_IRQSENABLED     Interrupts enabled      OFF
LED_STACKCREATED    Idle stack created      ON
LED_INIRQ           In an interrupt         N/C
LED_SIGNAL          In a signal handler     N/C
LED_ASSERTION       An assertion failed     N/C
LED_PANIC           The system has crashed  FLASH
</code></pre><p>Thus is LED is statically on, NuttX has successfully booted and is, apparently, running normally. If LED is flashing at approximately 2Hz, then a fatal error has been detected and the system has halted.</p><h1 id="using-the-halfkey-loader" tabindex="-1">Using the Halfkey Loader <a class="header-anchor" href="#using-the-halfkey-loader" aria-label="Permalink to &quot;Using the Halfkey Loader&quot;">​</a></h1><p>See <a href="https://www.pjrc.com/teensy/first%5C_use.html" target="_blank" rel="noreferrer">https://www.pjrc.com/teensy/first\\_use.html</a><a href="https://www.pjrc.com/teensy/loader%5C_cli.html" target="_blank" rel="noreferrer">https://www.pjrc.com/teensy/loader\\_cli.html</a></p><h1 id="debugging" tabindex="-1">Debugging <a class="header-anchor" href="#debugging" aria-label="Permalink to &quot;Debugging&quot;">​</a></h1><p>And, at this point, I don&#39;t know how to debug the board. There is no way to connect a JTAG SWD debugger, at least not without cutting leads to the MINI54TAN device:</p><pre><code>See: http://mcuoneclipse.com/2014/08/09/hacking-the-teensy-v3-1-for-swd-debugging/
</code></pre><h1 id="teensy-3-1-configuration-settings" tabindex="-1">Teensy-3.1 Configuration settings <a class="header-anchor" href="#teensy-3-1-configuration-settings" aria-label="Permalink to &quot;Teensy-3.1 Configuration settings&quot;">​</a></h1><pre><code>CONFIG_ARCH - Identifies the arch/ subdirectory.  This should
   be set to:

   CONFIG_ARCH=arm

CONFIG_ARCH_family - For use in C code:

   CONFIG_ARCH_ARM=y

CONFIG_ARCH_architecture - For use in C code:

   CONFIG_ARCH_CORTEXM4=y

CONFIG_ARCH_CHIP - Identifies the arch/*/chip subdirectory

   CONFIG_ARCH_CHIP=&quot;kinetis&quot;

CONFIG_ARCH_CHIP_name - For use in C code to identify the exact
   chip:

   CONFIG_ARCH_CHIP_MK20DX256VLH7=y

CONFIG_ARCH_BOARD - Identifies the boards/ subdirectory and
   hence, the board that supports the particular chip or SoC.

   CONFIG_ARCH_BOARD=&quot;teensy-3.x&quot;

CONFIG_ARCH_BOARD_name - For use in C code

   CONFIG_ARCH_BOARD_TEENSY_3X=y

CONFIG_ARCH_LOOPSPERMSEC - Must be calibrated for correct operation
   of delay loops

CONFIG_ENDIAN_BIG - define if big endian (default is little
   endian)

CONFIG_RAM_SIZE - Describes the installed DRAM (SRAM in this case):

   CONFIG_RAM_SIZE=0x00008000 (32Kb)

CONFIG_RAM_START - The start address of installed DRAM

   CONFIG_RAM_START=0x20000000

CONFIG_ARCH_LEDS - Use LEDs to show state. Unique to boards that
   have LEDs

CONFIG_ARCH_INTERRUPTSTACK - This architecture supports an interrupt
   stack. If defined, this symbol is the size of the interrupt
    stack in bytes.  If not defined, the user task stacks will be
  used during interrupt handling.

CONFIG_ARCH_STACKDUMP - Do stack dumps after assertions
</code></pre><p>Individual subsystems can be enabled:</p><pre><code>To be provided
</code></pre><h1 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h1><h2 id="common-configuration-information" tabindex="-1">Common Configuration Information <a class="header-anchor" href="#common-configuration-information" aria-label="Permalink to &quot;Common Configuration Information&quot;">​</a></h2><p>Each Teensy-3.x configurations are maintained in sub-directories and can be selected as follow:</p><pre><code>tools/configure.sh teensy-3.x:&lt;subdir&gt;
make oldconfig
</code></pre><p>Before building, make sure that your PATH environment variable includes the correct path to the directory than holds your toolchain binaries.</p><p>If this is a Windows native build, then configure.bat should be used instead of configure.sh:</p><pre><code>configure.bat teensy-3.x\\&lt;subdir&gt;
</code></pre><p>And then build NuttX by simply typing the following. At the conclusion of the make, the nuttx binary will reside in an ELF file called, simply, nuttx.</p><pre><code>make oldconfig
make
</code></pre><p>The <code>&lt;subdir&gt;</code> that is provided above as an argument to the tools/configure.sh must be is one of the directories listed below.</p><p>NOTES:</p><ol><li>These configurations use the mconf-based configuration tool. To change any of these configurations using that tool, you should:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- --&gt;</span></span></code></pre></div><pre><code>a. Build and install the kconfig-mconf tool.  See nuttx/README.txt
   see additional README.txt files in the NuttX tools repository.

b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the
   reconfiguration process.
</code></pre><ol start="2"><li><p>Unless stated otherwise, all configurations generate console output on [To be provided].</p></li><li><p>All of these configurations are set up to build under Windows using the &quot;GNU Tools for ARM Embedded Processors&quot; that is maintained by ARM (unless stated otherwise in the description of the configuration).</p><p><a href="https://developer.arm.com/open-source/gnu-toolchain/gnu-rm" target="_blank" rel="noreferrer">https://developer.arm.com/open-source/gnu-toolchain/gnu-rm</a></p><p>That toolchain selection can easily be reconfigured using &#39;make menuconfig&#39;. Here are the relevant current settings:</p><p>Build Setup: CONFIG_HOST_WINDOWS=y : Window environment CONFIG_WINDOWS_CYGWIN=y : Cywin under Windows</p><p>System Type -&gt; Toolchain: CONFIG_ARM_TOOLCHAIN_GNU_EABI=y : GNU ARM EABI toolchain</p><p>NOTE: As of this writing, there are issues with using this tool at the -Os level of optimization. This has not been proven to be a compiler issue (as least not one that might not be fixed with a well placed volatile qualifier). However, in any event, it is recommend that you use not more that -O2 optimization.</p></li></ol><p>Configuration sub-directories -----------------------------</p><p>nsh:</p><pre><code>Configures the NuttShell (nsh) located at apps/examples/nsh.

NOTES:

1. This configuration uses the mconf-based configuration tool.  To
   change this configuration using that tool, you should:

   a. Build and install the kconfig-mconf tool.  See nuttx/README.txt
      see additional README.txt files in the NuttX tools repository.

   b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the
      reconfiguration process.

2. By default, this configuration uses the ARM EABI toolchain
   for Windows and builds under Cygwin (or probably MSYS).  That
   can easily be reconfigured, of course.

   CONFIG_HOST_WINDOWS=y                   : Builds under Windows
   CONFIG_WINDOWS_CYGWIN=y                 : Using Cygwin
   CONFIG_ARM_TOOLCHAIN_GNU_EABI=y      : GNU EABI toolchain for Windows
</code></pre><p>Support for builtin applications is enabled, but in the base configuration no builtin applications are selected (see NOTES below).</p>`,51)]))}const f=n(i,[["render",s]]);export{p as __pageData,f as default};
