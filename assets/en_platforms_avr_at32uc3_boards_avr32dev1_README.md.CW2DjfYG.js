import{_ as t,c as o,al as n,o as i}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/avr/at32uc3/boards/avr32dev1/README.md","filePath":"en/platforms/avr/at32uc3/boards/avr32dev1/README.md"}'),a={name:"en/platforms/avr/at32uc3/boards/avr32dev1/README.md"};function r(s,e,l,h,d,c){return i(),o("div",null,e[0]||(e[0]=[n(`<p>README ^^^^^^</p><p>This is the README file for the NuttX port to the Atmel AVR32DEV1 board.</p><p>Contents ^^^^^^^^</p><ul><li>GPIO Pin Configuration</li><li>Serial Connection</li><li>Toolchains</li><li>Development Environment</li><li>GNU Toolchains</li><li>IDEs <ul><li>Makefile Build</li><li>Native Build</li></ul></li><li>AVR32 Bootloader <ul><li>Boot Sequence</li><li>Link Address</li><li>Entering the ISP</li><li>BatchISP</li></ul></li><li>Reset</li><li>Make Tip</li><li>AVR32DEV1 Configuration Options</li><li>Configurations</li></ul><p>GPIO Pin Configuration ^^^^^^^^^^^^^^^^^^^^^^</p><p>The only GPIO pin usage is for LEDs (2) and Buttons (2):</p><p>PIN 13 PA7 LED1 PIN 14 PA8 LED2 PIN 24 PB2 KEY1 PIN 25 PB3 KEY2</p><p>(See boards/avr/at32uc3/avr32dev1/src/avr32dev1.h). And also for crystals (4), JTAG (1), and USB (1):</p><p>PIN 30 PA11 XIN32 PIN 31 PA12 XOUT32 PIN 35 PA15 EVTO (JTAG) PIN 39 PA18 X1IN PIN 40 PA19 X1OUT PIN 61 PA26 ID (USB)</p><p>All GPIO pins are brought out through connectors J1 (PINS 33-64) and J2 (PINS 1-32).</p><p>NOTE: There seems to be some difference in labeling for OSC0 and OSC1 between MCUZone.com and Atmel:</p><p>Oscillator pinout</p><hr><p>QFP48 QFP64 Pad Oscillator AVR32DEV1 PIN PIN PIN LABEL</p><p>30 39 PA18 XIN0 X1IN (12MHz) 41 PA28 XIN1 PA28 (no crystal) 22 30 PA11 XIN32 XIN32 (32KHz) 31 40 PA19 XOUT0 X1OUT (12Mhz) 42 PA29 XOUT1 PA29 (no crystal) 23 31 PA12 XOUT32 XOUT32 (32 Khz) ----- ----- ----</p><hr><p>NOTE 1: These crystal inputs/outputs are analog signals and my assumption is that they need no pin multiplexing setting to enable them for the external crystal function.</p><p>NOTE 2: There is no support for OSC1.</p><p>NOTE 3: There are solder pads for the 32KHz OSC32, but the crystal is not populated on my board. Therefore, the RTC will have to run from the (uncalibrated) RCOSC.</p><p>Serial Connection ^^^^^^^^^^^^^^^^^</p><p>USART1 is the default USART1 used in the configuration files to provide a serial console (of course, that can be easily changed by editing the configuration file). The AVR32DEV1 board has no RS-232 drivers or connectors on board. I use an off-board MAX232 module that I got on eBay (search for MAX232 if you want to find one). I connect the MAX232 board as follows:</p><p>In boards/avr/at32uc3/avr32dev/include/board.h:</p><p>#define PINMUX_USART1_RXD PINMUX_USART1_RXD_1 #define PINMUX_USART1_TXD PINMUX_USART1_TXD_1</p><p>In arch/avr/src/at32uc3/at32uc3b_pinmux.h:</p><p>#define PINMUX_USART1_RXD_1 (GPIO_PERIPH | GPIO_FUNCD | GPIO_PORTA | 17) #define PINMUX_USART1_TXD_1 (GPIO_PERIPH | GPIO_FUNCA | GPIO_PORTA | 23)</p><p>PA17 and PA23 are available from the AVR32DEV1:</p><p>FUNC GPIO PIN Header 16X2 (J1) MX232 Board</p><hr><p>RXD PA17 PIN37 Pin 5 PIN4 RXD (5V TTL/CMOS) TXD PA23 PIN47 Pin 15 PIN3 TXD (5V TTL/CMOS) PIN2 GND PIN1 VCC (5V)</p><p>Voltage on GPIO Pins with respect to Ground for TCK, RESET_N, PA03-PA08, PA11-PA12, PA18-PA19, PA28-PA31............................-0.3 to 3.6V Other Pins ............................................... -0.3 to 5.5V</p><p>I get the 5V from another USB port (using the 5V power cable that normally provides the extra current needed by my USB IDE drive).</p><p>Development Environment ^^^^^^^^^^^^^^^^^^^^^^^</p><p>Linux, macOS or Cygwin on Windows can be used for the development environment. The source has been built only using the GNU toolchain (see below). Other toolchains will likely cause problems. Testing was performed using the Cygwin environment.</p><p>GNU Toolchains ^^^^^^^^^^^^^^</p><p>Atmel Toolchain:</p><p>The build logic in these directories assume that you are using the GNU toolchain with the Atmel patches. The patch file, pre-patched tool sources,and pre-built binaries are available from the Atmel website.</p><pre><code>CONFIG_AVR32_AVRTOOLSW=y  # Use the windows version
CONFIG_AVR32_AVRTOOLSL=y  # Use the Linux version
</code></pre><p>NOTE: The NuttX builtroot cannot be used to build the AVR32 toolchain. This is because the Atmel patches that add support for the AVR32 are not included in the NuttX buildroot.</p><p>WinAVR:</p><p>Another option for use under Windows is WinAVR: <a href="http://sourceforge.net/projects/winavr/files/" target="_blank" rel="noreferrer">http://sourceforge.net/projects/winavr/files/</a>. WinAVR includes the AVR32 toolchain as well as the AVR toolchain and various support libraries and header files.</p><p>AVR32 Toolchain Builder:</p><p>A third option is to build the toolchain yourself. For macOS and Linux systems, this Makefile will build a complete gcc-4.4.3 toolchain:</p><pre><code>https://github.com/jsnyder/avr32-toolchain
</code></pre><p>By default the toolchain installs into \${HOME}/avr-32-tools-<code>&lt;somedate&gt;</code> and the bin subdirectory must be added to your path before compiling.</p><p>IDEs ^^^^</p><p>NuttX is built using command-line make. It can be used with an IDE, but some effort will be required to create the project.</p><h2 id="makefile-build" tabindex="-1">Makefile Build <a class="header-anchor" href="#makefile-build" aria-label="Permalink to &quot;Makefile Build&quot;">​</a></h2><p>Under Eclipse, it is pretty easy to set up an &quot;empty makefile project&quot; and simply use the NuttX makefile to build the system. That is almost for free under Linux. Under Windows, you will need to set up the &quot;Cygwin GCC&quot; empty makefile project in order to work with Windows (Google for &quot;Eclipse Cygwin&quot; - there is a lot of help on the internet).</p><h2 id="native-build" tabindex="-1">Native Build <a class="header-anchor" href="#native-build" aria-label="Permalink to &quot;Native Build&quot;">​</a></h2><p>Here are a few tips before you start that effort:</p><ol><li>Select the toolchain that you will be using in your .config file</li><li>Start the NuttX build at least one time from the Cygwin command line before trying to create your project. This is necessary to create certain auto-generated files and directories that will be needed.</li><li>Set up include paths: You will need include/, arch/avr/src/at32uc3, arch/avr/src/common, arch/arm/src/avr, and sched/.</li><li>All assembly files need to have the definition option -D <strong>ASSEMBLY</strong> on the command line.</li></ol><p>Startup files will probably cause you some headaches. The NuttX startup file is arch/avr/src/avr3/up_nommuhead.S.</p><p>AVR32 Bootloader ^^^^^^^^^^^^^^^^</p><p>Boot Sequence -------------</p><pre><code>&quot;An AVR UC3 part having the bootloader programmed resets as any other
 part at 80000000h. Bootloader execution begins here. The bootloader
 first performs the boot process to know whether it should start the
 USB DFU ISP or the application. If the tested conditions indicate
 that the USB DFU ISP should be started, then execution continues in
 the bootloader area, i.e. between 80000000h and 80002000h, else
 the bootloader launches the application at 80002000h.&quot;
</code></pre><p>Link Address ------------</p><p>The linker scripts (ld.script) assume that you are using the DFU bootloader. The bootloader resides at 0x8000:0000 and so the ld.script files link the application to execute after the bootloader at 0x8000:2000. To link so that NuttX boots directly without using the bootloader, change the flash definition from:</p><pre><code>flash (rxai!w)  : ORIGIN = 0x80002000, LENGTH = 256K - 8K
</code></pre><p>to: flash (rxai!w) : ORIGIN = 0x80000000, LENGTH = 256K</p><p>Or to use the MSC bootloader:</p><pre><code>flash (rxai!w)  : ORIGIN = 0x80008000, LENGTH = 256K - 32K
</code></pre><p>Entering the ISP ----------------</p><p>In order to use the USB port to download the FLASH(ISP), you need to use the S3(PA13) to make CPU return to boot status. In this mode, the on chip bootloader will run, making the ISP possible.</p><p>BatchISP --------</p><p>Unlike other Atmel parts, the AVR32 will not work with the FLIP GUI program. Instead, you must use the command-line loader call BatchISP. If need to download FLIP from the atmel.com website, install the USB driver in the FLIP usb directory. Then in the bin directory where you installed FLIP, you will also find batchisp.exe.</p><p>NOTE: You will need to set the PATH environment variable to include the path to the BatchISP bin directory.</p><p>Notes from &quot;AVR32 UC3 USB DFU Bootloader&quot; (doc7745.pdf)</p><p>&quot;To launch BatchISP, open a command prompt. Windows or Cygwin command prompt can be used provided that the bin folder of the FLIP installation directory is in the PATH (Windows&#39; or Cygwin&#39;s) environment variable. When running BatchISP on AT32UC3xxxxx, the target part has to be specified with -device at32uc3xxxxx and the communication port with -hardware usb. Commands can then be placed after -operation. These commands are executed in order. BatchISP options can be placed in a text file invoked using -cmdfile rather than on the command line.</p><p>&quot;BatchISP works with an internal ISP buffer per target memory. These ISP buffers can be filled from several sources. All target operations (program, verify, read) are performed using these buffers.&quot;</p><p>The following BatchISP command line will erase FLASH, write the nuttx binary into FLASH, and reset the AVR32. This command line is available in the script config/avr32dev1/tools/doisp.sh:</p><pre><code> batchisp -device at32uc3b0256 -hardware usb -operation erase f memory flash \\
 blankcheck loadbuffer nuttx.elf program verify start reset 0
</code></pre><p>&quot;BatchISP main commands available on AT32UC3xxxxx are:</p><ul><li>ASSERT { PASS | FAIL } changes the displayed results of the following operations according to the expected behavior.</li><li>ONFAIL { ASK | ABORT | RETRY | IGNORE } changes the interactive behavior of BatchISP in case of failure.</li><li>WAIT <code>&lt;Nsec&gt;</code> inserts a pause between two ISP operations.</li><li>ECHO <code>&lt;comment&gt;</code> displays a message.</li><li>ERASE F erases internal flash contents, except the bootloader.</li><li>MEMORY { FLASH | SECURITY | CONFIGURATION | BOOTLOADER | SIGNATURE | USER } selects a target memory on which to apply the following operations.</li><li>ADDRANGE <code>&lt;addrMin&gt;</code> <code>&lt;addrMax&gt;</code> selects in the current target memory an address range on which to apply the following operations.</li><li>BLANKCHECK checks that the selected address range is erased.</li><li>FILLBUFFER <code>&lt;data&gt;</code> fills the ISP buffer with a byte value.</li><li>LOADBUFFER { <code>&lt;in_elffile&gt;</code> | <code>&lt;in_hexfile&gt;</code> } loads the ISP buffer from an input file.</li><li>PROGRAM programs the selected address range with the ISP buffer.</li><li>VERIFY verifies that the selected address range has the same contents as the ISP buffer.</li><li>READ reads the selected address range to the ISP buffer.</li><li>SAVEBUFFER <code>&lt;out_hexfile&gt;</code> { HEX386 | HEX86 } saves the ISP buffer to an output file.</li><li>START { RESET | NORESET } 0 starts the execution of the programmed application with an optional hardware reset of the target.</li></ul><p>&quot;The AT32UC3xxxxx memories made available by BatchISP are:</p><ul><li>FLASH: This memory is the internal flash array of the target, including the bootloader protected area. E.g. on AT32UC3A0512 (512-kB internal flash), addresses from 0 to 0x7FFFF can be accessed in this memory.</li><li>SECURITY: This memory contains only one byte. The least significant bit of this byte reflects the value of the target Security bit which can only be set to 1. Once set, the only accepted commands will be ERASE and START. After an ERASE command, all commands are accepted until the end of the non-volatile ISP session, even if the Security bit is set.</li><li>CONFIGURATION: This memory contains one byte per target general-purpose fuse bit. The least significant bit of each byte reflects the value of the corresponding GP fuse bit.</li><li>BOOTLOADER: This memory contains three bytes concerning the ISP: the ISP version in BCD format without the major version number (always 1), the ISP ID0 and the ISP ID1.</li><li>SIGNATURE: This memory contains four bytes concerning the part: the product manufacturer ID, the product family ID, the product ID and the product revision.</li><li>USER: This memory is the internal flash User page of the target, with addresses from 0 to 0x1FF.</li></ul><p>&quot;For further details about BatchISP commands, launch batchisp -h or see the help files installed with FLIP ...&quot;</p><p>Reset ^^^^^</p><p>I don&#39;t trust the reset button -- if you reset and something weird happens, try a full power cycle.</p><p>Make Tip ^^^^^^^^</p><p>Because this build uses a native Windows toolchain and the native Windows tools do not understand Cygwin&#39;s symbolic links, the NuttX make system does something weird: It copies the configuration directories instead of linking to them (it could, perhaps, use the NTFS &#39;mklink&#39; command, but it doesn&#39;t).</p><p>A consequence of this is that you can easily get confused when you edit a file in one of the &quot;linked&quot; directories, re-build NuttX, and then not see your changes when you run the program. That is because build is still using the version of the file in the copied directory, not your modified file! To work around this annoying behavior, do the following when you re-build:</p><p>make clean_context all &lt;-- Remove and re-copy all of the directories, then make all doisp.sh &lt;-- Load the code onto the board.</p><p>AVR32DEV1 Configuration Options ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^</p><pre><code>CONFIG_ARCH - Identifies the arch/ subdirectory.  This should
   be set to:

   CONFIG_ARCH=avr

CONFIG_ARCH_family - For use in C code:

   CONFIG_ARCH_AVR=y

CONFIG_ARCH_architecture - For use in C code:

   CONFIG_ARCH_FAMILY_AVR32=y

CONFIG_ARCH_CHIP - Identifies the arch/*/chip subdirectory

   CONFIG_ARCH_CHIP=at32uc3

CONFIG_ARCH_CHIP_name - For use in C code to identify the exact
   chip:

   CONFIG_ARCH_CHIP_AT32UC3B0256

CONFIG_ARCH_BOARD - Identifies the boards/ subdirectory and
   hence, the board that supports the particular chip or SoC.

   CONFIG_ARCH_BOARD=avr32dev1 (for the AV32DEV1 board)

CONFIG_ARCH_BOARD_name - For use in C code

   CONFIG_ARCH_BOARD_AVR32DEV1

CONFIG_ARCH_LOOPSPERMSEC - Must be calibrated for correct operation
   of delay loops

CONFIG_ENDIAN_BIG - define if big endian (default is little
   endian)

CONFIG_RAM_SIZE - Describes the installed DRAM (SRAM in this case):

   CONFIG_RAM_SIZE=0x00010000 (64Kb)

CONFIG_RAM_START - The start address of installed DRAM

   CONFIG_RAM_START=0x20000000

CONFIG_ARCH_LEDS - Use LEDs to show state. Unique to boards that
   have LEDs

CONFIG_ARCH_INTERRUPTSTACK - This architecture supports an interrupt
   stack. If defined, this symbol is the size of the interrupt
    stack in bytes.  If not defined, the user task stacks will be
  used during interrupt handling.

CONFIG_ARCH_STACKDUMP - Do stack dumps after assertions

CONFIG_ARCH_LEDS -  Use LEDs to show state. Unique to board architecture.
</code></pre><p>Individual subsystems can be enabled:</p><pre><code>CONFIG_AVR32_GPIOIRQ - GPIO interrupt support
CONFIG_AVR32_GPIOIRQSETA - Set of GPIOs on PORTA that support interrupts
CONFIG_AVR32_GPIOIRQSETB - Set of GPIOs on PORTB that support interrupts

CONFIG_AVR32_USARTn - Enable support for USARTn
CONFIG_AVR32_USARTn_RS232 - Configure USARTn as an RS232 interface.
CONFIG_AVR32_USARTn_SPI - Configure USARTn as an SPI interface.
CONFIG_AVR32_USARTn_RS485 - Configure USARTn as an RS485 interface.
CONFIG_AVR32_USARTn_MAN - Configure USARTn as an Manchester interface.
CONFIG_AVR32_USARTn_MODEM - Configure USARTn as an Modem interface.
CONFIG_AVR32_USARTn_IRDA - Configure USARTn as an IRDA interface.
CONFIG_AVR32_USARTn_ISO786 - Configure USARTn as an ISO786 interface.
</code></pre><p>AT32UC3B0256 specific device driver settings</p><pre><code>CONFIG_USARTn_SERIAL_CONSOLE - selects the USARTn for the
   console and ttys0 (default is the USART0).
CONFIG_USARTn_RXBUFSIZE - Characters are buffered as received.
   This specific the size of the receive buffer
CONFIG_USARTn_TXBUFSIZE - Characters are buffered before
   being sent.  This specific the size of the transmit buffer
CONFIG_USARTn_BAUD - The configure BAUD of the USART.  Must be
CONFIG_USARTn_BITS - The number of bits.  Must be either 7 or 8.
CONFIG_USARTn_PARTIY - 0=no parity, 1=odd parity, 2=even parity
CONFIG_USARTn_2STOP - Two stop bits
</code></pre><p>Configurations ^^^^^^^^^^^^^^</p><h2 id="common-configuration-notes" tabindex="-1">Common Configuration Notes <a class="header-anchor" href="#common-configuration-notes" aria-label="Permalink to &quot;Common Configuration Notes&quot;">​</a></h2><ol><li><p>Each Atmel AVR32DEV configuration is maintained in a sub-directory and can be selected as follow:</p><p>tools/configure.sh avr32dev1:<code>&lt;subdir&gt;</code></p><p>Where <code>&lt;subdir&gt;</code> is one of the configuration sub-directories described in the following paragraph.</p></li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- --&gt;</span></span></code></pre></div><pre><code>(Use configure.bat instead of configure.sh in a native Windows environment).
</code></pre><ol start="2"><li><p>These configurations use the mconf-based configuration tool. To change a configurations using that tool, you should:</p><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository.</p><p>b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</p></li><li><p>By default, all configurations assume the AVR toolchain under Cygwin with Windows. This is easily reconfigured:</p><p>CONFIG_HOST_WINDOWS=y CONFIG_WINDOWS_CYGWIN=y CONFIG_AVR32_AVRTOOLSW=y</p></li></ol><h2 id="configuration-sub-directories" tabindex="-1">Configuration Sub-Directories <a class="header-anchor" href="#configuration-sub-directories" aria-label="Permalink to &quot;Configuration Sub-Directories&quot;">​</a></h2><p>nsh:</p><pre><code>Configures the NuttShell (nsh) located at examples/nsh.  The
Configuration enables only the serial NSH interface.
</code></pre><p>ostest:</p><pre><code>This configuration directory, performs a simple OS test using
examples/ostest.

NOTE: Round-robin scheduling is disabled in this test because
the RR test in examples/ostest declares data structures that
are too large for the poor little uc3 SRAM.
</code></pre>`,99)]))}const f=t(a,[["render",r]]);export{u as __pageData,f as default};
