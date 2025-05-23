import{_ as t,c as o,al as i,o as n}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/lpc214x/boards/mcu123-lpc214x/README.md","filePath":"en/platforms/arm/lpc214x/boards/mcu123-lpc214x/README.md"}'),a={name:"en/platforms/arm/lpc214x/boards/mcu123-lpc214x/README.md"};function r(s,e,l,c,p,d){return n(),o("div",null,e[0]||(e[0]=[i(`<p>README ^^^^^^</p><p>This README discusses issues unique to NuttX configurations for the MCU-123 LPC2148 development board.</p><h2 id="contents" tabindex="-1">Contents <a class="header-anchor" href="#contents" aria-label="Permalink to &quot;Contents&quot;">​</a></h2><p>o Development Environment o GNU Toolchain Options o NuttX buildroot Toolchain o Flash Tools - In System Programming (ISP) Mode - LPC21ISP (Linux) - FlashMagic (Windows/MAC) - OpenOCD o ARM/LPC214X-specific Configuration Options o Configurations</p><p>Development Environment ^^^^^^^^^^^^^^^^^^^^^^^</p><p>Either Linux or Cygwin on Windows can be used for the development environment. The source has been built only using the GNU toolchain (see below). Other toolchains will likely cause problems.</p><p>GNU Toolchain Options ^^^^^^^^^^^^^^^^^^^^^</p><p>The NuttX make system has been modified to support the following different toolchain options.</p><ol><li>The NuttX buildroot Toolchain (see below), or</li><li>The GNU EABI toolchain,</li></ol><p>All testing has been conducted using the NuttX buildroot toolchain. To use the CodeSourcery or devkitARM GNU toolchain, you simply need to build the system as follows:</p><pre><code> make                         # Will build for the NuttX buildroot toolchain
 make CROSSDEV=arm-eabi-      # Will build for the devkitARM toolchain
 make CROSSDEV=arm-none-eabi- # Will build for the ARM EABI toolchain
 make CROSSDEV=arm-nuttx-elf- # Will build for the NuttX buildroot toolchain
</code></pre><p>Of course, hard coding this CROSS_COMPILE value in Make.defs file will save some repetitive typing.</p><p>NuttX buildroot Toolchain ^^^^^^^^^^^^^^^^^^^^^^^^^</p><p>A GNU GCC-based toolchain is assumed. The PATH environment variable should be modified to point to the correct path to the Cortex-M3 GCC toolchain (if different from the default in your PATH variable).</p><p>If you have no Cortex-M3 toolchain, one can be downloaded from the NuttX Bitbucket download site (<a href="https://bitbucket.org/nuttx/buildroot/downloads/" target="_blank" rel="noreferrer">https://bitbucket.org/nuttx/buildroot/downloads/</a>). This GNU toolchain builds and executes in the Linux or Cygwin environment.</p><ol><li><p>You must have already configured NuttX in <code>&lt;some-dir&gt;</code>/nuttx.</p><p>tools/configure.sh eagle100:<code>&lt;sub-dir&gt;</code></p></li><li><p>Download the latest buildroot package into <code>&lt;some-dir&gt;</code></p></li><li><p>unpack the buildroot tarball. The resulting directory may have versioning information on it like buildroot-x.y.z. If so, rename <code>&lt;some-dir&gt;</code>/buildroot-x.y.z to <code>&lt;some-dir&gt;</code>/buildroot.</p></li><li><p>cd <code>&lt;some-dir&gt;</code>/buildroot</p></li><li><p>cp boards/arm7tdmi-defconfig-4.3.3 .config</p></li><li><p>make oldconfig</p></li><li><p>make</p></li><li><p>Make sure that the PATH variable includes the path to the newly built binaries.</p></li></ol><p>See the file boards/README.txt in the buildroot source tree. That has more detailed PLUS some special instructions that you will need to follow if you are building a Cortex-M3 toolchain for Cygwin under Windows.</p><p>Flash Tools ^^^^^^^^^^^</p><h2 id="in-system-programming-isp-mode" tabindex="-1">In System Programming (ISP) Mode <a class="header-anchor" href="#in-system-programming-isp-mode" aria-label="Permalink to &quot;In System Programming (ISP) Mode&quot;">​</a></h2><ol><li><p>Make sure you exit minicom (or whatever terminal emulator you are using). It will interfere with the download.</p></li><li><p>On the MCU123 board, I need to put a jumper on JP3-INT. On that board, JP3-INT is connected to P0.14 of LPC214x. When P0.14 is low and RTS is changed from high to low, the LPC214x will enter ISP (In System Programming) state.</p><p>J2-RST: When J2 is shorted, the reset pin of CPU is controlled by the DTR signal of UART0. Short J2 to enable ISP automatic download.</p><p>Alternatively, you can just press the INT1 button while resetting. The LEDs will be off if the LPC2148 successfully enters ISP mode.</p></li></ol><p>Resetting the board will enter ISP mode when the jumper is connected.</p><h2 id="lpc21isp-linux" tabindex="-1">LPC21ISP (Linux) <a class="header-anchor" href="#lpc21isp-linux" aria-label="Permalink to &quot;LPC21ISP (Linux)&quot;">​</a></h2><p>(ca. 2008) I use the lpc21isp tool to load NuttX into FLASH. In the older version 1.60 of lpc21isp for Linux, I had to make several changes. This changesi are shown in lpc21ips-1.60.diff.</p><p>I use the script lpc21isp.sh to perform the actual download. You will probably have to make some changes to this script in order to use it. For example, the path to the built lpc21isp binary will most likely have to change. Then move this script to the top level NuttX directory and simply execute it to load NuttX onto the board (after entering ISP mode).</p><p>Here are the detailed steps I use:</p><ol><li><p>Setup ISP (In System Programming) mode (see above).</p></li><li><p>Start lpc21isp.sh</p></li><li><p>Reset the board to</p></li></ol><h2 id="flashmagic-windows-mac" tabindex="-1">FlashMagic (Windows/MAC) <a class="header-anchor" href="#flashmagic-windows-mac" aria-label="Permalink to &quot;FlashMagic (Windows/MAC)&quot;">​</a></h2><p>(ca. 2012) You download FlashMagic for Windows or MAC here: <a href="http://www.flashmagictool.com" target="_blank" rel="noreferrer">http://www.flashmagictool.com</a></p><ol><li><p>Setup ISP (In System Programming) mode (see above).</p></li><li><p>Start FlashMagic and setup communication parameters.</p><p>Device: LPC2148 COM Port: (will vary with PC) Baud: 38400 (I am sure it can go faster). Interface: None (ISP) Oscillator (MHz): 12</p><p>Check &quot;Erase all Flash+Code Rd Prot&quot;</p></li><li><p>Select the nuttx.hex file</p></li><li><p>Options: Verify after programming</p></li><li><p>Start and reset the board to entry ISP mode. Or hold the INT1 button down after reset after you press start.</p></li></ol><p>NOTE: FlashMagic will complain if the data section overlaps 0x4000000-0x400001ff.</p><h2 id="openocd" tabindex="-1">OpenOCD <a class="header-anchor" href="#openocd" aria-label="Permalink to &quot;OpenOCD&quot;">​</a></h2><p>I have the (really old) Olimex software installed at C:/gccfd. Under Cygwin, I can do the following:</p><ol><li><p>Create a .cfg file:</p><p>$ cat /cygdrive/c/gccfd/openocd/lib/openocd/interface/arm-usb-ocd.cfg /cygdrive/c/gccfd/openocd/lib/openocd/target/lpc2148.cfg &gt; lpc2148.cfg</p></li><li><p>Start OpenOCD:</p><p>/cygdrive/c/gccfd/openocd/bin/openocd-ftd2xx.exe -f lpc2148.cfg -s . &amp;</p></li><li><p>Start arm-*-gdb (whichever GDB your toolchain uses).</p></li></ol><p>ARM/LPC214X-specific Configuration Options ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^</p><pre><code>CONFIG_ARCH - Identifies the arch/ subdirectory.  This should
   be set to:

   CONFIG_ARCH=arm

CONFIG_ARCH_family - For use in C code:

   CONFIG_ARCH_ARM=y

CONFIG_ARCH_architecture - For use in C code:

   CONFIG_ARCH_ARM7TDMI=y

CONFIG_ARCH_CHIP - Identifies the arch/*/chip subdirectory

   CONFIG_ARCH_CHIP=lpc214x

CONFIG_ARCH_CHIP_name - For use in C code

   CONFIG_ARCH_CHIP_LPC214X

CONFIG_ARCH_BOARD - Identifies the boards/ subdirectory and
   hence, the board that supports the particular chip or SoC.

   CONFIG_ARCH_BOARD=mcu123-lpc214x

CONFIG_ARCH_BOARD_name - For use in C code

   CONFIG_ARCH_BOARD_MCU123_LPC214X (for theMCU123 LPC214x board)

CONFIG_ARCH_LOOPSPERMSEC - Must be calibrated for correct operation
   of delay loops

CONFIG_ENDIAN_BIG - define if big endian (default is little
   endian)

CONFIG_RAM_SIZE - Describes the installed RAM.

CONFIG_RAM_START - The start address of installed RAM

CONFIG_ARCH_LEDS - Use LEDs to show state. Unique to boards that
   have LEDs

CONFIG_ARCH_INTERRUPTSTACK - This architecture supports an interrupt
   stack. If defined, this symbol is the size of the interrupt
   stack in bytes.  If not defined, the user task stacks will be
  used during interrupt handling.

CONFIG_ARCH_STACKDUMP - Do stack dumps after assertions
</code></pre><p>LPC2148 specific chip initialization</p><pre><code>These provide register setup values:
CONFIG_EXTMEM_MODE, CONFIG_RAM_MODE, CONFIG_CODE_BASE, CONFIG_PLL_SETUP,
CONFIG_MAM_SETUP, CONFIG_APBDIV_SETUP, CONFIG_EMC_SETUP, CONFIG_BCFG0_SETUP,
CONFIG_BCFG1_SETUP, CONFIG_BCFG2_SETUP, CONFIG_BCFG3_SETUP, CONFIG_ADC_SETUP

CONFIG_LPC214x_FIO - Enable fast GPIO (vs. legacy, &quot;old&quot; GPIO).
</code></pre><p>LPC214X specific device driver settings</p><pre><code>CONFIG_UARTn_SERIAL_CONSOLE - selects the UARTn for the
   console and ttys0 (default is the UART0).

CONFIG_UARTn_RXBUFSIZE - Characters are buffered as received.
   This specific the size of the receive buffer

CONFIG_UARTn_TXBUFSIZE - Characters are buffered before
   being sent.  This specific the size of the transmit buffer

CONFIG_UARTn_BAUD - The configure BAUD of the UART.

CONFIG_UARTn_BITS - The number of bits.  Must be either 7 or 8.

CONFIG_UARTn_PARTIY - 0=no parity, 1=odd parity, 2=even parity, 3=mark 1, 4=space 0

CONFIG_UARTn_2STOP - Two stop bits
</code></pre><p>LPC214X USB Configuration</p><pre><code>CONFIG_LPC214X_USBDEV_FRAME_INTERRUPT
   Handle USB Start-Of-Frame events.
   Enable reading SOF from interrupt handler vs. simply reading on demand.
   Probably a bad idea... Unless there is some issue with sampling the SOF
   from hardware asynchronously.

CONFIG_LPC214X_USBDEV_EPFAST_INTERRUPT
   Enable high priority interrupts.  I have no idea why you might want to
   do that

CONFIG_LPC214X_USBDEV_NDMADESCRIPTORS
   Number of DMA descriptors to allocate in the 8Kb USB RAM.  This is a
   tradeoff between the number of DMA channels that can be supported vs
   the size of the DMA buffers available.

CONFIG_LPC214X_USBDEV_DMA
   Enable lpc214x-specific DMA support
</code></pre><p>Configurations ^^^^^^^^^^^^^^</p><ol><li><p>Each NXP LPC214x configuration is maintained in a sub-directory and can be selected as follow:</p><p>tools/configure.sh mcu123-lpc214x:<code>&lt;subdir&gt;</code></p><p>Where <code>&lt;subdir&gt;</code> is one of the configuration sub-directories described in the following paragraph.</p></li><li><p>These configurations use the mconf-based configuration tool. To change a configurations using that tool, you should:</p><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository.</p><p>b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</p></li><li><p>By default, all configurations assume the NuttX Buildroot toolchain under Linux (should work under Windows with Cygwin as well). This is easily reconfigured:</p><p>CONFIG_HOST_LINUX=y CONFIG_ARM_TOOLCHAIN_BUILDROOT=y</p></li></ol><h2 id="composite" tabindex="-1">composite: <a class="header-anchor" href="#composite" aria-label="Permalink to &quot;composite:&quot;">​</a></h2><p>A simple test of the USB Composite Device (see apps/examples/README.txt and apps/system/composite)</p><p>NOTE: I could not get this to work! Perhaps this is a consequence of the last USB driver checking (r4359). But backing this change out did not fix the configuration.</p><h2 id="nsh" tabindex="-1">nsh: <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh:&quot;">​</a></h2><p>Configures the NuttShell (nsh) located at examples/nsh. The Configuration enables only the serial NSH interfaces.</p><h2 id="usbserial" tabindex="-1">usbserial: <a class="header-anchor" href="#usbserial" aria-label="Permalink to &quot;usbserial:&quot;">​</a></h2><p>This configuration directory exercises the USB serial class driver at examples/usbserial. See examples/README.txt for more information.</p><p>NOTE: If you have problems with this configuration, perhaps it is a consequence of the last USB driver checking (r4359)</p><h2 id="usbmsc" tabindex="-1">usbmsc: <a class="header-anchor" href="#usbmsc" aria-label="Permalink to &quot;usbmsc:&quot;">​</a></h2><p>This configuration directory exercises the USB mass storage class driver at system/usbmsc. See examples/README.txt for more information.</p><p>NOTE: If you have problems with this configuration, perhaps it is a consequence of the last USB driver checking (r4359)</p>`,54)]))}const f=t(a,[["render",r]]);export{u as __pageData,f as default};
