import{_ as t,c as o,al as n,o as i}from"./chunks/framework.NFAqBSgQ.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/c5471/boards/c5471evm/README.md","filePath":"en/platforms/arm/c5471/boards/c5471evm/README.md"}'),r={name:"en/platforms/arm/c5471/boards/c5471evm/README.md"};function s(a,e,c,d,l,u){return i(),o("div",null,e[0]||(e[0]=[n(`<p>README ^^^^^^</p><p>Toolchain ^^^^^^^^^</p><p>A GNU GCC-based toolchain is assumed. The PATH environment variable should be modified to point to the correct path to the SH toolchain (if different from the default).</p><p>If you have no ARM toolchain, one can be downloaded from the NuttX Bitbucket download site (<a href="https://bitbucket.org/nuttx/buildroot/downloads/" target="_blank" rel="noreferrer">https://bitbucket.org/nuttx/buildroot/downloads/</a>).</p><ol><li><p>You must have already configured NuttX in <code>&lt;some-dir&gt;</code>nuttx.</p><p>tools/configure.sh c5471evm:<code>&lt;sub-dir&gt;</code></p></li><li><p>Download the latest buildroot package into <code>&lt;some-dir&gt;</code></p></li><li><p>unpack</p></li><li><p>cd <code>&lt;some-dir&gt;</code>/buildroot</p></li><li><p>cp boards/arm-defconfig .config</p></li><li><p>make oldconfig</p></li><li><p>make</p></li><li><p>Make sure that the PATH variable includes the path to the newly built binaries.</p></li></ol><p>Issues ^^^^^^</p><p>Title: UART RECONFIGURATION Description: UART re-configuration is untested and conditionally compiled out. Status: Open Priority: Medium. ttyS1 is not configured, but not used; ttyS0 is configured by the bootloader</p><p>ARM/C5471-specific Configuration Options ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^</p><pre><code>CONFIG_ARCH - Identifies the arch/ subdirectory.  This should
   be set to:

   CONFIG_ARCH=arm

CONFIG_ARCH_family - For use in C code:

   CONFIG_ARCH_ARM=y

CONFIG_ARCH_architecture - For use in C code:

   CONFIG_ARCH_ARM7TDMI=y

CONFIG_ARCH_CHIP - Identifies the arch/*/chip subdirectory

   CONFIG_ARCH_CHIP=c5471

CONFIG_ARCH_CHIP_name - For use in C code

   CONFIG_ARCH_CHIP_C5471

CONFIG_ARCH_BOARD - Identifies the boards/ subdirectory and
   hence, the board that supports the particular chip or SoC.

   CONFIG_ARCH_BOARD=c5471evm (for the Spectrum Digital C5471 EVM)

CONFIG_ARCH_BOARD_name - For use in C code

   CONFIG_ARCH_BOARD_C5471EVM (for the Spectrum Digital C5471 EVM)

CONFIG_ARCH_LOOPSPERMSEC - Must be calibrated for correct operation
   of delay loops

CONFIG_ENDIAN_BIG - define if big endian (default is little
   endian)

CONFIG_ROM_VECTORS - should be defined for the C5471 because the
   interrupt vectors are in ROM

CONFIG_ARCH_LEDS - Use LEDs to show state. Unique to boards that
   have LEDs

CONFIG_ARCH_INTERRUPTSTACK - This architecture supports an interrupt
   stack. If defined, this symbol is the size of the interrupt
   stack in bytes.  If not defined, the user task stacks will be
  used during interrupt handling.

CONFIG_ARCH_STACKDUMP - Do stack dumps after assertions
</code></pre><p>C5471 specific device driver settings</p><pre><code>CONFIG_SERIAL_IRDA_CONSOLE - selects the IRDA UART for the
   console ant ttys0 (default is the modem UART).
CONFIG_UART_*_HWFLOWCONTROL - enables hardware flow control
CONFIG_UART_*_RXBUFSIZE - Characters are buffered as received.
   This specific the size of the receive buffer
CONFIG_UART_*_TXBUFSIZE - Characters are buffered before
   being sent.  This specific the size of the transmit buffer
CONFIG_UART_*_BAUD - The configure BAUD of the UART.  Must be
CONFIG_UART_*_BITS - The number of bits.  Must be either 7 or 8.
CONFIG_UART_*_PARTIY - 0=no parity, 1=odd parity, 2=even parity
CONFIG_UART_*_2STOP - Two stop bits
</code></pre><p>C5471 Ethernet Driver settings</p><pre><code>CONFIG_C5471_NET_STATS
CONFIG_C5471_PHY_AC101L or C5471_PHY_LU3X31T_T64
CONFIG_C5471_AUTONEGOTIATION
CONFIG_C5471_BASET100
CONFIG_C5471_BASET10
</code></pre><p>Configurations ^^^^^^^^^^^^^^</p><h2 id="common-configuration-notes" tabindex="-1">Common Configuration Notes <a class="header-anchor" href="#common-configuration-notes" aria-label="Permalink to &quot;Common Configuration Notes&quot;">​</a></h2><ol><li><p>Each C5471 configuration is maintained in a sub-directory and can be selected as follow:</p><p>tools/configure.sh c5471evm:<code>&lt;subdir&gt;</code></p><p>Where <code>&lt;subdir&gt;</code> is one of the configuration sub-directories described in the following paragraph.</p></li><li><p>These configurations use the mconf-based configuration tool. To change a configurations using that tool, you should:</p><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository.</p><p>b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</p></li><li><p>By default, all configurations assume the NuttX Buildroot toolchain under Linux (should work under Windows with Cygwin as well). This is easily reconfigured:</p><p>CONFIG_HOST_LINUX=y CONFIG_ARM_TOOLCHAIN_BUILDROOT=y</p></li></ol><h2 id="configuration-sub-directories" tabindex="-1">Configuration Sub-Directories <a class="header-anchor" href="#configuration-sub-directories" aria-label="Permalink to &quot;Configuration Sub-Directories&quot;">​</a></h2><p>nettest</p><pre><code>This configuration enables networking using the c5471&#39;s built-in Ethernet
interface.  It uses examples/nettest to exercise the TCP/IP network.
</code></pre><p>nsh</p><pre><code>This configuration file builds NSH (examples/nsh) using the TELNET server
front end
</code></pre><p>httpd</p><pre><code>This configuration uses the tiny webserver for uIP.
</code></pre>`,23)]))}const _=t(r,[["render",s]]);export{h as __pageData,_ as default};
