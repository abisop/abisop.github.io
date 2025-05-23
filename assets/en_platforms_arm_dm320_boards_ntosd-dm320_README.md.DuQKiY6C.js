import{_ as t,c as o,al as i,o as n}from"./chunks/framework.NFAqBSgQ.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/dm320/boards/ntosd-dm320/README.md","filePath":"en/platforms/arm/dm320/boards/ntosd-dm320/README.md"}'),r={name:"en/platforms/arm/dm320/boards/ntosd-dm320/README.md"};function a(s,e,d,c,l,p){return n(),o("div",null,e[0]||(e[0]=[i(`<p>README ^^^^^^</p><p>This is the README file for the port of NuttX to the Neuros OSD.</p><p>CONTENTS ^^^^^^^^ - Dev vs. Production Neuros OSD v1.0 boards - Development Environment - GNU Toolchain Options - IDEs - NuttX buildroot Toolchain - ARM/DM320-specific Configuration Options - Configurations - Configuration Options - Issues</p><p>Dev vs. Production Neuros OSD v1.0 boards ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^</p><p>This port supports both the original Neuros OSD v1.0 Dev Board. This port has recently been extended to V1.0 Production board (and that is now the default configuration). References:</p><pre><code>http://www.neurostechnology.com/neuros-developer-community
http://wiki.neurostechnology.com/index.php/OSD_1.0_Developer_Home
http://wiki.neurostechnology.com/index.php/DM320_Platform_development
</code></pre><p>There are some differences between the Dev Board and the currently available commercial v1.0 Boards, most notably in the amount of memory: 8Mb FLASH and 32Mb RAM vs. 16Mb and 64Mb as in the production board. See the following for more information:</p><pre><code> http://wiki.neurostechnology.com/index.php/OSD_Developer_Board_v1
</code></pre><p>NuttX operates on the ARM9EJS of this dual core processor. The DSP is available and unused.</p><p>STATUS: This port is code complete, verified, and included in the NuttX 0.2.1 release.</p><p>Development Environment ^^^^^^^^^^^^^^^^^^^^^^^</p><p>Either Linux or Cygwin on Windows can be used for the development environment. The source has been built only using the GNU toolchain (see below). Other toolchains will likely cause problems.</p><p>GNU Toolchain Options ^^^^^^^^^^^^^^^^^^^^^</p><p>The NuttX make system has been modified to support the following different toolchain options.</p><ol><li>The NuttX buildroot Toolchain (see below), or</li><li>Any generic arm-none-eabi GNU toolchain.</li></ol><p>All testing has been conducted using the NuttX buildroot toolchain. To use a different toolchain, you simply need to modify the configuration. As an example:</p><pre><code>CONFIG_ARM_TOOLCHAIN_GNU_EABI : Generic arm-none-eabi toolchain
</code></pre><h2 id="generic-arm-none-eabi-gnu-toolchain" tabindex="-1">Generic arm-none-eabi GNU Toolchain <a class="header-anchor" href="#generic-arm-none-eabi-gnu-toolchain" aria-label="Permalink to &quot;Generic arm-none-eabi GNU Toolchain&quot;">​</a></h2><p>There are a number of toolchain projects providing support for ARMv4/v5 class processors, including:</p><pre><code>GCC ARM Embedded
  https://developer.arm.com/open-source/gnu-toolchain/gnu-rm
</code></pre><p>Others exist for various Linux distributions, MacPorts, etc. Any version based on GCC 4.6.3 or later should work.</p><p>IDEs ^^^^</p><p>NuttX is built using command-line make. It can be used with an IDE, but some effort will be required to create the project.</p><h2 id="makefile-build" tabindex="-1">Makefile Build <a class="header-anchor" href="#makefile-build" aria-label="Permalink to &quot;Makefile Build&quot;">​</a></h2><p>Under Eclipse, it is pretty easy to set up an &quot;empty makefile project&quot; and simply use the NuttX makefile to build the system. That is almost for free under Linux. Under Windows, you will need to set up the &quot;Cygwin GCC&quot; empty makefile project in order to work with Windows (Google for &quot;Eclipse Cygwin&quot; - there is a lot of help on the internet).</p><h2 id="native-build" tabindex="-1">Native Build <a class="header-anchor" href="#native-build" aria-label="Permalink to &quot;Native Build&quot;">​</a></h2><p>Here are a few tips before you start that effort:</p><ol><li>Select the toolchain that you will be using in your .config file</li><li>Start the NuttX build at least one time from the Cygwin command line before trying to create your project. This is necessary to create certain auto-generated files and directories that will be needed.</li><li>Set up include paths: You will need include/, arch/arm/src/dm320, arch/arm/src/common, arch/arm/src/arm, and sched/.</li><li>All assembly files need to have the definition option -D <strong>ASSEMBLY</strong> on the command line.</li></ol><p>Startup files will probably cause you some headaches. The NuttX startup file is arch/arm/src/arm/up_head.S. You may have to build the NuttX one time from the Cygwin command line in order to obtain the pre-built startup object needed by the IDE.</p><p>NuttX buildroot Toolchain ^^^^^^^^^^^^^^^^^^^^^^^^^</p><p>A GNU GCC-based toolchain is assumed. The PATH environment variable should be modified to point to the correct path to the ARM926 GCC toolchain (if different from the default).</p><p>If you have no ARM toolchain, one can be downloaded from the NuttX Bitbucket download site (<a href="https://bitbucket.org/nuttx/buildroot/downloads/" target="_blank" rel="noreferrer">https://bitbucket.org/nuttx/buildroot/downloads/</a>).</p><ol><li><p>You must have already configured NuttX in <code>&lt;some-dir&gt;</code>nuttx.</p><p>tools/configure.sh ntosd-dm320:<code>&lt;sub-dir&gt;</code></p></li><li><p>Download the latest buildroot package into <code>&lt;some-dir&gt;</code></p></li><li><p>unpack</p></li><li><p>cd <code>&lt;some-dir&gt;</code>/buildroot</p></li><li><p>cp boards/arm-defconfig .config OR cp boards/arm926t_defconfig-4.2.4 .config</p></li><li><p>make oldconfig</p></li><li><p>make</p></li><li><p>Make sure that the PATH variable includes the path to the newly built binaries.</p></li></ol><p>ARM/DM320-specific Configuration Options ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^</p><pre><code>CONFIG_ARCH - Identifies the arch/ subdirectory.  This should
   be set to:

   CONFIG_ARCH=arm

CONFIG_ARCH_family - For use in C code:

   CONFIG_ARCH_ARM=y

CONFIG_ARCH_architecture - For use in C code:

   CONFIG_ARCH_ARM926EJS=y

CONFIG_ARCH_CHIP - Identifies the arch/*/chip subdirectory

   CONFIG_ARCH_CHIP=dm320

CONFIG_ARCH_CHIP_name - For use in C code

   CONFIG_ARCH_CHIP_DM320

CONFIG_ARCH_BOARD - Identifies the boards/ subdirectory and
   hence, the board that supports the particular chip or SoC.

   CONFIG_ARCH_BOARD=ntosd-dm320

CONFIG_ARCH_BOARD_name - For use in C code

   CONFIG_ARCH_BOARD_NTOSD_DM320 (for the Spectrum Digital C5471 EVM)

CONFIG_ARCH_LOOPSPERMSEC - Must be calibrated for correct operation
   of delay loops

CONFIG_ENDIAN_BIG - define if big endian (default is little
   endian)

CONFIG_RAM_SIZE - Describes the installed DRAM.

CONFIG_RAM_START - The start address of installed DRAM

CONFIG_RAM_VSTART - The startaddress of DRAM (virtual)

CONFIG_ARCH_LEDS - Use LEDs to show state. Unique to boards that
   have LEDs

CONFIG_ARCH_INTERRUPTSTACK - This architecture supports an interrupt
   stack. If defined, this symbol is the size of the interrupt
   stack in bytes.  If not defined, the user task stacks will be
  used during interrupt handling.

CONFIG_ARCH_STACKDUMP - Do stack dumps after assertions
</code></pre><p>DM320 specific device driver settings</p><pre><code>CONFIG_UARTn_SERIAL_CONSOLE - selects the UARTn for the
   console and ttys0 (default is the UART0).
CONFIG_UARTn_RXBUFSIZE - Characters are buffered as received.
   This specific the size of the receive buffer
CONFIG_UARTn_TXBUFSIZE - Characters are buffered before
   being sent.  This specific the size of the transmit buffer
CONFIG_UARTn_BAUD - The configure BAUD of the UART.  Must be
CONFIG_UARTn_BITS - The number of bits.  Must be either 7 or 8.
CONFIG_UARTn_PARTIY - 0=no parity, 1=odd parity, 2=even parity
CONFIG_UARTn_2STOP - Two stop bits
</code></pre><p>DM320 USB Configuration</p><pre><code>CONFIG_DM320_GIO_USBATTACH
   GIO that detects USB attach/detach events
CONFIG_DM320_GIO_USBDPPULLUP
   GIO
CONFIG_DMA320_USBDEV_DMA
   Enable DM320-specific DMA support
CONFIG_DM320_GIO_USBATTACH=6
</code></pre><p>Configurations ^^^^^^^^^^^^^^</p><h2 id="common-configuration-notes" tabindex="-1">Common Configuration Notes <a class="header-anchor" href="#common-configuration-notes" aria-label="Permalink to &quot;Common Configuration Notes&quot;">​</a></h2><ol><li><p>Each Neuros OSD configuration is maintained in a sub-directory and can be selected as follow:</p><p>tools/configure.sh ntosd-dm320:<code>&lt;subdir&gt;</code></p><p>Where <code>&lt;subdir&gt;</code> is one of the configuration sub-directories described in the following paragraph.</p></li><li><p>These configurations use the mconf-based configuration tool. To change a configurations using that tool, you should:</p><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository.</p><p>b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</p></li><li><p>By default, all configurations assume the ARM EABI toolchain under Linux. This is easily reconfigured:</p><p>CONFIG_HOST_LINUX=y CONFIG_ARM_TOOLCHAIN_GNU_EABI=y</p></li></ol><h2 id="configuration-sub-directories" tabindex="-1">Configuration Sub-Directories <a class="header-anchor" href="#configuration-sub-directories" aria-label="Permalink to &quot;Configuration Sub-Directories&quot;">​</a></h2><p>nettest</p><pre><code>This alternative configuration directory may be used to
enable networking using the OSDs DM9000A Ethernet interface.
It uses examples/nettest to exercise the TCP/IP network.
</code></pre><p>nsh</p><pre><code>Configures the NuttShell (nsh) located at examples/nsh.  The
Configuration enables both the serial and telnetd NSH interfaces.
</code></pre><p>poll</p><pre><code>This configuration exercises the poll()/select() text at
examples/poll
</code></pre><p>udp</p><pre><code>This alternative configuration directory is similar to nettest
except that it uses examples/udp to exercise UDP.
</code></pre><p>webserver</p><pre><code>This configuration file demonstrates the tiny webserver
at examples/webserver.
</code></pre><p>Configuration Options ^^^^^^^^^^^^^^^^^^^^^</p><p>In additional to the common configuration options listed in the file boards/README.txt, there are other configuration options specific to the DM320:</p><p>CONFIG_ARCH - identifies the arch subdirectory and, hence, the processor architecture. CONFIG_ARCH_name - for use in C code. This identifies the particular chip or SoC that the architecture is implemented in. CONFIG_ARCH_CHIP - Identifies the arch/*/chip subdirectory CONFIG_ARCH_CHIP_name - For use in C code CONFIG_ARCH_BOARD - identifies the boards/ subdirectory and, hence, the board that supports the particular chip or SoC. CONFIG_ENDIAN_BIG</p><ul><li>define if big endian (default is little endian) CONFIG_ARCH_BOARD_name - for use in C code CONFIG_BOARD_LOOPSPERMSEC - for delay loops CONFIG_ARCH_LEDS - Use LEDs to show state. CONFIG_RAM_SIZE - Describes the internal DRAM. CONFIG_RAM_START - The start address of internal DRAM CONFIG_ARCH_STACKDUMP - Do stack dumps after assertions</li></ul><p>DM320 specific device driver settings</p><p>CONFIG_UARTn_SERIAL_CONSOLE - selects the UARTn for the console and ttys0 (default is the UART0). CONFIG_UARTn_RXBUFSIZE - Characters are buffered as received. This specific the size of the receive buffer CONFIG_UARTn_TXBUFSIZE - Characters are buffered before being sent. This specific the size of the transmit buffer CONFIG_UARTn_BAUD - The configure BAUD of the UART. Must be CONFIG_UARTn_BITS - The number of bits. Must be either 7 or 8. CONFIG_UARTn_PARTIY - 0=no parity, 1=odd parity, 2=even parity CONFIG_UARTn_2STOP - Two stop bits</p><p>DM320 USB Configuration</p><p>CONFIG_DM320_GIO_USBATTACH GIO that detects USB attach/detach events CONFIG_DM320_GIO_USBDPPULLUP GIO connected to D+. Support software connect/disconnect. CONFIG_DMA320_USBDEV_DMA Enable DM320-specific DMA support</p><p>Neuros OSD Configuration Options</p><p>CONFIG_ARCH_NTOSD_DEVBOARD - Selects the old NTOSD development board. The default is the production OSD board which differs in several ways.</p><p>Issues ^^^^^^</p><p>Title: DEBUG ISSUES Description: config/ntos-dm320: It seems that when a lot of debug statements are added, the system no longer boots. This is suspected to be a stack problem: Making the stack bigger or removing arrays on the stack seems to fix the problem (might also be the bootloader overwriting memory) Status: Open Priority: Medium</p><p>Title: USB DEVICE DRIVER UNTESTED Description: A USB device controller driver was added but has never been tested. Status: Open Priority: Medium</p><p>Title: FRAMEBUFFER DRIVER UNTESTED Description: A framebuffer &quot;driver&quot; was added, however, it remains untested. Status: Open Priority: Medium</p><p>Title: VIDEO ENCODER DRIVER Description: In order to use the framebuffer &quot;driver&quot; additional video encoder logic is required to setup composite video output or to interface with an LCD. Status: Open Priority: Medium (high if you need to use the framebuffer driver)</p>`,68)]))}const f=t(r,[["render",a]]);export{h as __pageData,f as default};
