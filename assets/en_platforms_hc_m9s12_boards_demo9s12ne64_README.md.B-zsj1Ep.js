import{_ as t,c as o,al as i,o as n}from"./chunks/framework.NFAqBSgQ.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/hc/m9s12/boards/demo9s12ne64/README.md","filePath":"en/platforms/hc/m9s12/boards/demo9s12ne64/README.md"}'),r={name:"en/platforms/hc/m9s12/boards/demo9s12ne64/README.md"};function a(s,e,l,d,c,p){return n(),o("div",null,e[0]||(e[0]=[i(`<p>README ^^^^^^</p><p>This README discusses issues unique to NuttX configurations for the Freescale DEMO9S12NE64 development board.</p><p>CONTENTS ^^^^^^^^ o MC9S12NE64 Features o Development Environment o NuttX Buildroot Toolchain o FreeScale HCS12 Serial Monitor o Soft Registers o HCS12/DEMO9S12NEC64-specific Configuration Options o Configurations</p><p>MC9S12NE64 Features ^^^^^^^^^^^^^^^^^^^</p><p>o 16-bit HCS12 core - HCS12 CPU - Upward compatible with M68HC11 instruction set - Interrupt stacking and programmer&#39;s model identical to M68HC11 - Instruction queue - Enhanced indexed addressing - Memory map and interface (MMC) - Interrupt control (INT) - Background debug mode (BDM) - Enhanced debug12 module, including breakpoints and change-of-flow trace buffer (DBG) - Multiplexed expansion bus interface (MEBI) - available only in 112-pin package version o Wakeup interrupt inputs - Up to 21 port bits available for wakeup interrupt function with digital filtering o Memory - 64K bytes of FLASH EEPROM - 8K bytes of RAM o Analog-to-digital converter (ATD) - One 8-channel module with 10-bit resolution - External conversion trigger capability o Timer module (TIM)</p><ul><li>4-channel timer - Each channel configurable as either input capture or output compare - Simple PWM mode - Modulo reset of timer counter - 16-bit pulse accumulator - External event counting - Gated time accumulation o Serial interfaces - Two asynchronous serial communications interface (SCI) - One synchronous serial peripheral interface (SPI) - One inter-IC bus (IIC) o Ethernet Media access controller (EMAC) - IEEE 802.3 compliant - Medium-independent interface (MII) - Full-duplex and half-duplex modes - Flow control using pause frames - MII management function - Address recognition - Frames with broadcast address are always accepted or always rejected - Exact match for single 48-bit individual (unicast) address - Hash (64-bit hash) check of group (multicast) addresses - Promiscuous mode o Ethertype filter o Loopback mode o Two receive and one transmit Ethernet buffer interfaces o Ethernet 10/100 Mbps transceiver (EPHY) - IEEE 802.3 compliant - Digital adaptive equalization - Half-duplex and full-duplex</li><li>Auto-negotiation next page ability - Baseline wander (BLW) correction</li><li>125-MHz clock generator and timing recovery - Integrated wave-shaping circuitry - Loopback modes o CRG (clock and reset generator module) - Windowed COP watchdog - Real-time interrupt - Clock monitor - Pierce oscillator - Phase-locked loop clock frequency multiplier - Limp home mode in absence of external clock - 25-MHz crystal oscillator reference clock o Operating frequency - 50 MHz equivalent to 25 MHz bus speed for single chip - 32 MHz equivalent to 16 MHz bus speed in expanded bus modes o Internal 2.5-V regulator - Supports an input voltage range from 3.3 V ± 5% - Low-power mode capability - Includes low-voltage reset (LVR) circuitry o 80-pin TQFP-EP or 112-pin LQFP package - Up to 70 I/O pins with 3.3 V input and drive capability (112-pin package) - Up to two dedicated 3.3 V input only lines (IRQ, XIRQ) o Development support - Single-wire background debug™ mode (BDM) - On-chip hardware breakpoints</li><li>Enhanced DBG debug features</li></ul><p>Development Environment ^^^^^^^^^^^^^^^^^^^^^^^</p><p>Either Linux or Cygwin on Windows can be used for the development environment. The source has been built only using the GNU toolchain (see below). Other toolchains will likely cause problems.</p><p>NuttX Buildroot Toolchain ^^^^^^^^^^^^^^^^^^^^^^^^^</p><p>A GNU GCC-based toolchain is assumed. The PATH environment variable should be modified to point to the correct path to the HC12 GCC toolchain (if different from the default in your PATH variable).</p><p>If you have no HC12 toolchain, one can be downloaded from the NuttX Bitbucket download site (<a href="https://bitbucket.org/nuttx/buildroot/downloads/" target="_blank" rel="noreferrer">https://bitbucket.org/nuttx/buildroot/downloads/</a>). This GNU toolchain builds and executes in the Linux or Cygwin environments.</p><ol><li><p>You must have already configured NuttX in <code>&lt;some-dir&gt;</code>/nuttx.</p><p>tools/configure.sh demo9s12nec64:<code>&lt;sub-dir&gt;</code></p></li><li><p>Download the latest buildroot package into <code>&lt;some-dir&gt;</code></p></li><li><p>unpack the buildroot tarball. The resulting directory may have versioning information on it like buildroot-x.y.z. If so, rename <code>&lt;some-dir&gt;</code>/buildroot-x.y.z to <code>&lt;some-dir&gt;</code>/buildroot.</p></li><li><p>cd <code>&lt;some-dir&gt;</code>/buildroot</p></li><li><p>cp boards/m9s12x-defconfig-3.3.6 .config</p></li><li><p>make oldconfig</p></li><li><p>make</p><p>If the make fails because it can&#39;t find the file to download, you may have to locate the file on the internet and download it into the archives/ directory manually. For example, binutils-2.18 can be found here: <a href="http://ftp.gnu.org/gnu/binutils/" target="_blank" rel="noreferrer">http://ftp.gnu.org/gnu/binutils/</a></p></li><li><p>Make sure that the PATH variable includes the path to the newly built binaries.</p></li></ol><p>See the file boards/README.txt in the buildroot source tree. That has more detailed PLUS some special instructions that you will need to follow if you are building a Cortex-M3 toolchain for Cygwin under Windows.</p><p>FreeScale HCS12 Serial Monitor ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^</p><p>General: The NuttX HCS12 port is configured to use the Freescale HCS serial monitor. This monitor supports primitive debug commands that allow FLASH/EEPROM programming and debugging through an RS-232 serial interface. The serial monior is 2Kb in size and resides in FLASH at addresses 0xf800-0xffff. The monitor does not use any RAM other than the stack itself.</p><p>AN2458 The serial monitor is described in detail in Freescale Application Note AN2458.pdf.</p><p>COP: The serial monitor uses the COP for the cold reset function and should not be used by the application without some precautions (see AN2458).</p><p>Clocking: The serial monitor sets the operating frequency to 24 MHz. This is not altered by the NuttX start-up; doing so would interfere with the operation of the serial monitor.</p><p>Memory Configuration: Registers: o Register space is located at 0x0000-0x03ff. FLASH: o FLASH memory is any address greater than 0x4000. All paged addresses are assumed to be FLASH memory. o Application code should exclude the 0xf780-0xff7f memory. SRAM: o RAM ends at 0x3FFF and builds down to the limit of the device&#39;s available RAM. o The serial monitor&#39;s stack pointer is set to the end of RAM+1 (0x4000). EEPROM: o EEPROM (if the target device has any) is limited to the available space between the registers and the RAM (0x0400 to start of RAM). External Devices: o External devices attached to the multiplexed external bus interface are not supported</p><p>Serial Communications: The serial monitor uses RS-232 serial communications through SCI0 at 115,200 baud. The monitor must have exclusive use of this interface. Access to the serial port is available through a monitor jump table.</p><p>Interrupts: The serial monitor redirects interrupt vectors to an unprotected portion of FLASH just before the protected monitor program (0xf780-0xf7fe). The monitor will automatically redirect vector programming operations to these user vectors. The user code should therefore keep the normal (non-monitor) vector locations (0xff80-0xfffe).</p><p>Soft Registers ^^^^^^^^^^^^^^</p><p>The mc68hcs12 compilation is prone to errors like the following:</p><pre><code>CC:  lib_b16sin.c
lib_b16sin.c: In function \`b16sin&#39;:
lib_b16sin.c:110: error: unable to find a register to spill in class \`S_REGS&#39;
lib_b16sin.c:110: error: this is the insn:
(insn:HI 41 46 44 8 (parallel [
            (set (subreg:SI (reg:DI 58 [ rad ]) 4)
                (reg/v:SI 54 [ rad ]))
            (clobber (scratch:HI))
        ]) 20 {movsi_internal} (insn_list 46 (nil))
    (expr_list:REG_UNUSED (scratch:HI)
        (expr_list:REG_NO_CONFLICT (reg/v:SI 54 [ rad ])
            (nil))))
lib_b16sin.c:110: confused by earlier errors, bailing out
</code></pre><p>There are several ways that this error could be fixed:</p><ol><li><p>Increase the number of soft registers (i.e., &quot;fake&quot; registers defined at fixed memory locations). This can be done by adding something like -msoft-reg-count=4 to the CFLAGS. This approach was not taken because:</p><ul><li>This slows hcs12 performance</li><li>All of these soft registers wouil have to be saved and restored on every interrupt and context switch.</li></ul></li><li><p>Lowering the optimization level by dropping -Os to -O2 or, more likely, by removing -fomit-frame-pointer. Also not desirable because 99% of the files that do not have this problem also increase in size. Special case compilation with reduced optimization levels just for the files that need it could be done, but this would complicate the make system.</p></li><li><p>Restructuring files to reduce the complexity. If you add local variables to hold intermediate computational results, this error can be eliminated. This is the approach taken in NuttX. It has disadvantages only in that</p><p>(1) it takes some effort and good guessing to eliminate the problem, and (2) the problem is not really eliminated -- it can and will re-occur when files are changed or new files are added.</p></li><li><p>Many files are built that are needed by DEM09S12NE64. Another very simple option if those problem files are needed is to just remove the offending files from the Make.defs file so that they no longer cause a problem.</p></li></ol><p>HCS12/DEMO9S12NEC64-specific Configuration Options ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^</p><pre><code>CONFIG_ARCH - Identifies the arch/ subdirectory.  This should
   be set to:

   CONFIG_ARCH=hc

CONFIG_ARCH_family - For use in C code:

   CONFIG_ARCH_HC=y

CONFIG_ARCH_architecture - For use in C code:

   CONFIG_ARCH_HCS12=y

CONFIG_ARCH_CHIP - Identifies the arch/*/chip subdirectory

   CONFIG_ARCH_CHIP=mc92s12nec64

CONFIG_ARCH_CHIP_name - For use in C code

   CONFIG_ARCH_CHIP_MCS92S12NEC64

CONFIG_ARCH_BOARD - Identifies the boards/ subdirectory and
   hence, the board that supports the particular chip or SoC.

   CONFIG_ARCH_BOARD=demo9s12nec64

CONFIG_ARCH_BOARD_name - For use in C code

   CONFIG_ARCH_BOARD_DEMOS92S12NEC64 (for the Freescale DEMO9S12NE64 development board)

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
</code></pre><p>GPIO Interrupts</p><pre><code>CONFIG_HCS12_GPIOIRQ - Enable general support for GPIO IRQs
CONFIG_HCS12_PORTG_INTS - Enable PortG IRQs
CONFIG_HCS12_PORTH_INTS - Enable PortH IRQs
CONFIG_HCS12_PORTJ_INTS - Enable PortJ IRQs
</code></pre><p>HCS12 build options:</p><pre><code>CONFIG_HCS12_SERIALMON - Indicates that the target systems uses
  the Freescale serial bootloader.

CONFIG_HCS12_NONBANKED - Indicates that the target systems does not
  support banking.  Only short calls are made; one fixed page is
  presented in the paging window.  Only 48Kb of FLASH is usable
  in this configuration: pages 3e, 3d, then 3f will appear as a
  contiguous address space in memory.
</code></pre><p>HCS12 Sub-system support</p><pre><code>CONFIG_HCS12_SCI0
CONFIG_HCS12_SCI1
</code></pre><p>HCS12 specific device driver settings:</p><pre><code>CONFIG_SCIn_SERIAL_CONSOLE - selects SCIn for the console and ttys0
  (default is the SCI0).

CONFIG_SCIn_RXBUFSIZE - Characters are buffered as received.
   This specific the size of the receive buffer

CONFIG_SCIn_TXBUFSIZE - Characters are buffered before
   being sent.  This specific the size of the transmit buffer

CONFIG_SCIn_BAUD - The configure BAUD of the UART.

CONFIG_SCIn_BITS - The number of bits.  Must be either 7 or 8.

CONFIG_SCIn_PARTIY - 0=no parity, 1=odd parity, 2=even parity, 3=mark 1, 4=space 0

CONFIG_SCIn_2STOP - Two stop bits
</code></pre><p>Configurations ^^^^^^^^^^^^^^</p><h2 id="common-configuration-notes" tabindex="-1">Common Configuration Notes <a class="header-anchor" href="#common-configuration-notes" aria-label="Permalink to &quot;Common Configuration Notes&quot;">​</a></h2><ol><li><p>Each Freescale HCS12 configuration is maintained in a sub-directory and can be selected as follow:</p><p>tools/configure.sh demo9s12nec64:<code>&lt;subdir&gt;</code></p><p>Where <code>&lt;subdir&gt;</code> is one of the configuration sub-directories described in the following paragraph.</p></li><li><p>These configurations use the mconf-based configuration tool. To change a configurations using that tool, you should:</p><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository.</p><p>b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</p></li><li><p>By default, all configurations assume that you are building under Linux (should work under Windows with Cygwin as well). This is easily reconfigured:</p><p>CONFIG_HOST_LINUX=y</p></li></ol><h2 id="configuration-sub-directories" tabindex="-1">Configuration Sub-Directories <a class="header-anchor" href="#configuration-sub-directories" aria-label="Permalink to &quot;Configuration Sub-Directories&quot;">​</a></h2><p>ostest</p><pre><code>This configuration directory, performs a simple OS test using
examples/ostest.
</code></pre>`,42)]))}const f=t(r,[["render",a]]);export{h as __pageData,f as default};
