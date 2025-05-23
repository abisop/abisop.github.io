import{_ as n,c as t,al as o,o as i}from"./chunks/framework.NFAqBSgQ.js";const c=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/sam34/boards/sam3u-ek/README.md","filePath":"en/platforms/arm/sam34/boards/sam3u-ek/README.md"}'),a={name:"en/platforms/arm/sam34/boards/sam3u-ek/README.md"};function s(r,e,l,u,d,h){return i(),t("div",null,e[0]||(e[0]=[o(`<p>README ^^^^^^</p><p>This README discusses issues unique to NuttX configurations for the Atmel SAM3U-EK development board featuring the ATAM3U. This board features the ATSAM3U4E MCU running at 96MHz.</p><p>Contents ^^^^^^^^</p><ul><li>AtmelStudio 6.1</li><li>LEDs</li><li>Serial Console</li><li>SAM3U-EK-specific Configuration Options</li><li>Configurations</li></ul><p>AtmelStudio 6.1 ^^^^^^^^^^^^^^^</p><p>You can use AtmelStudio6.1 to load and debug code.</p><ul><li><p>To load code:</p><p>Tools -&gt; Device Programming</p><p>Configure the debugger and chip and you are in business.</p></li><li><p>To Debug Code:</p><p>File -&gt; Open -&gt; Open Object File for Debugging</p><p>Select the project name, the full path to the NuttX object (called just nuttx with no extension), and chip. Take the time to resolve all of the source file linkages or else you will not have source level debug!</p></li></ul><p>LEDs ^^^^</p><p>The SAM3U-EK board has four LEDs labeled LD1, LD2, LD3 and LD4 on the the board. Usage of these LEDs is defined in include/board.h and src/up_leds.c. They are encoded as follows:</p><pre><code>SYMBOL              Meaning                 LED0*   LED1    LED2
------------------- ----------------------- ------- ------- -------
LED_STARTED         NuttX has been started  OFF     OFF     OFF
LED_HEAPALLOCATE    Heap has been allocated OFF     OFF     ON
LED_IRQSENABLED     Interrupts enabled      OFF     ON      OFF
LED_STACKCREATED    Idle stack created      OFF     ON      ON
LED_INIRQ           In an interrupt**       N/C     FLASH   N/C
LED_SIGNAL          In a signal handler***  N/C     N/C     FLASH
LED_ASSERTION       An assertion failed     FLASH   N/C     N/C
LED_PANIC           The system has crashed  FLASH   N/C     N/C
</code></pre><ul><li>If LED1 and LED2 are statically on, then NuttX probably failed to boot and these LEDs will give you some indication of where the failure was ** The normal state is LED0=OFF, LED2=ON and LED1 faintly glowing. This faint glow is because of timer interrupts that result in the LED being illuminated on a small proportion of the time. *** LED2 may also flicker normally if signals are processed.</li></ul><p>Serial Console ^^^^^^^^^^^^^^</p><p>By default, all of these configurations use UART0 for the NuttX serial console. UART0 corresponds to the DB-9 connector labelled &quot;UART&quot;. This is a male connector and will require a female-to-female, NUL modem cable to connect to a PC.</p><p>An alternate is USART1 which connects to the other DB-9 connector labeled &quot;USART&quot;. USART1 is not enabled by default unless specifically noted otherwise in the configuration description. A NUL modem cable must be used with the port as well.</p><p>NOTE: One of the USART1 pins is shared with the audio CODEC. The audio CODEC cannot be used of USART1 is enabled.</p><p>By default serial console is configured for 115000, 8-bit, 1 stop bit, and no parity.</p><p>SAM3U-EK-specific Configuration Options ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^</p><pre><code>CONFIG_ARCH - Identifies the arch/ subdirectory.  This should
   be set to:

   CONFIG_ARCH=arm

CONFIG_ARCH_family - For use in C code:

   CONFIG_ARCH_ARM=y

CONFIG_ARCH_architecture - For use in C code:

   CONFIG_ARCH_CORTEXM3=y

CONFIG_ARCH_CHIP - Identifies the arch/*/chip subdirectory

   CONFIG_ARCH_CHIP=&quot;sam34&quot;

CONFIG_ARCH_CHIP_name - For use in C code to identify the exact
   chip:

   CONFIG_ARCH_CHIP_SAM34
   CONFIG_ARCH_CHIP_SAM3U
   CONFIG_ARCH_CHIP_ATSAM3U4

CONFIG_ARCH_BOARD - Identifies the boards/ subdirectory and
   hence, the board that supports the particular chip or SoC.

   CONFIG_ARCH_BOARD=sam3u-ek (for the SAM3U-EK development board)

CONFIG_ARCH_BOARD_name - For use in C code

   CONFIG_ARCH_BOARD_SAM3UEK=y

CONFIG_ARCH_LOOPSPERMSEC - Must be calibrated for correct operation
   of delay loops

CONFIG_ENDIAN_BIG - define if big endian (default is little
   endian)

CONFIG_RAM_SIZE - Describes the installed DRAM (SRAM in this case):

   CONFIG_RAM_SIZE=0x0000c000 (48Kb)

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
</code></pre><p>Individual subsystems can be enabled:</p><pre><code>CONFIG_SAM34_RTC           - Real Time Clock
CONFIG_SAM34_RTT           - Real Time Timer
CONFIG_SAM34_WDT           - Watchdog Timer
CONFIG_SAM34_UART0         - UART 0
CONFIG_SAM34_SMC           - Static Memory Controller
CONFIG_SAM34_USART0        - USART 0
CONFIG_SAM34_USART1        - USART 1
CONFIG_SAM34_USART2        - USART 2
CONFIG_SAM34_USART3        - USART 3
CONFIG_SAM34_HSMCI         - High Speed Multimedia Card Interface
CONFIG_SAM34_TWI0          - Two-Wire Interface 0
CONFIG_SAM34_TWI1          - Two-Wire Interface 1
CONFIG_SAM34_SPI0           - Serial Peripheral Interface
CONFIG_SAM34_SSC           - Synchronous Serial Controller
CONFIG_SAM34_TC0           - Timer Counter 0
CONFIG_SAM34_TC1           - Timer Counter 1
CONFIG_SAM34_TC2           - Timer Counter 2
CONFIG_SAM34_PWM           - Pulse Width Modulation Controller
CONFIG_SAM34_ADC12B        - 12-bit ADC Controller
CONFIG_SAM34_ADC           - 10-bit ADC Controller
CONFIG_SAM34_DMAC0         - DMA Controller
CONFIG_SAM34_UDPHS         - USB Device High Speed
</code></pre><p>Some subsystems can be configured to operate in different ways. The drivers need to know how to configure the subsystem.</p><pre><code>CONFIG_SAM34_GPIOA_IRQ
CONFIG_SAM34_GPIOB_IRQ
CONFIG_SAM34_GPIOC_IRQ
CONFIG_USART0_SERIALDRIVER
CONFIG_USART1_SERIALDRIVER
CONFIG_USART2_SERIALDRIVER
CONFIG_USART3_SERIALDRIVER
CONFIG_SAM34_NAND          - NAND memory
</code></pre><p>SAM3U specific device driver settings</p><pre><code>CONFIG_U[S]ARTn_SERIAL_CONSOLE - selects the USARTn (n=0,1,2,3) or UART
       m (m=4,5) for the console and ttys0 (default is the USART1).
CONFIG_U[S]ARTn_RXBUFSIZE - Characters are buffered as received.
   This specific the size of the receive buffer
CONFIG_U[S]ARTn_TXBUFSIZE - Characters are buffered before
   being sent.  This specific the size of the transmit buffer
CONFIG_U[S]ARTn_BAUD - The configure BAUD of the UART.  Must be
CONFIG_U[S]ARTn_BITS - The number of bits.  Must be either 7 or 8.
CONFIG_U[S]ARTn_PARTIY - 0=no parity, 1=odd parity, 2=even parity
CONFIG_U[S]ARTn_2STOP - Two stop bits
</code></pre><p>LCD Options. Other than the standard LCD configuration options (see boards/README.txt), the SAM3U-EK driver also supports:</p><pre><code>CONFIG_LCD_PORTRAIT - Present the display in the standard 240x320
   &quot;Portrait&quot; orientation.  Default:  The display is rotated to
   support a 320x240 &quot;Landscape&quot; orientation.
</code></pre><p>Configurations ^^^^^^^^^^^^^^</p><h2 id="information-common-to-all-configurations" tabindex="-1">Information Common to All Configurations <a class="header-anchor" href="#information-common-to-all-configurations" aria-label="Permalink to &quot;Information Common to All Configurations&quot;">​</a></h2><p>Each SAM3U-EK configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh sam3u-ek:&lt;subdir&gt;
</code></pre><p>Before building, make sure the PATH environment variable includes the correct path to the directory than holds your toolchain binaries.</p><p>And then build NuttX by simply typing the following. At the conclusion of the make, the nuttx binary will reside in an ELF file called, simply, nuttx.</p><pre><code>make
</code></pre><p>The <code>&lt;subdir&gt;</code> that is provided above as an argument to the tools/configure.sh must be is one of the following.</p><p>NOTES:</p><ol><li>These configurations use the mconf-based configuration tool. To change any of these configurations using that tool, you should:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- --&gt;</span></span></code></pre></div><pre><code>a. Build and install the kconfig-mconf tool.  See nuttx/README.txt
   see additional README.txt files in the NuttX tools repository.

b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the
   reconfiguration process.
</code></pre><ol start="2"><li><p>Unless stated otherwise, all configurations generate console output on UART0 (J3).</p></li><li><p>Unless otherwise stated, the configurations are setup for Linux (or any other POSIX environment like Cygwin under Windows):</p><p>Build Setup: CONFIG_HOST_LINUX=y : Linux or other POSIX environment</p></li><li><p>All of these configurations use the older, OABI, buildroot toolchain (unless stated otherwise in the description of the configuration). That toolchain selection can easily be reconfigured using &#39;make menuconfig&#39;. Here are the relevant current settings:</p><p>Build Setup: CONFIG_HOST_LINUX=y : Linux or other pure POSIX invironment : (including Cygwin) System Type -&gt; Toolchain: CONFIG_ARM_TOOLCHAIN_BUILDROOT=y : Buildroot toolchain CONFIG_ARM_TOOLCHAIN_BUILDROOT_OABI=y : Older, OABI toolchain</p><p>If you want to use the Atmel GCC toolchain, for example, here are the steps to do so:</p><p>Build Setup: CONFIG_HOST_WINDOWS=y : Windows CONFIG_HOST_CYGWIN=y : Using Cygwin or other POSIX environment</p><p>System Type -&gt; Toolchain: CONFIG_ARM_TOOLCHAIN_GNU_EABI=y : General GCC EABI toolchain under windows</p><p>Library Routines -&gt; CONFIG_ARCH_SIZET_LONG=n : size_t is an unsigned int, not long</p><p>This re-configuration should be done before making NuttX or else the subsequent &#39;make&#39; will fail. If you have already attempted building NuttX then you will have to 1) &#39;make distclean&#39; to remove the old configuration, 2) &#39;tools/configure.sh sam3u-ek/ksnh&#39; to start with a fresh configuration, and 3) perform the configuration changes above.</p><p>Also, make sure that your PATH variable has the new path to your Atmel tools. Try &#39;which arm-none-eabi-gcc&#39; to make sure that you are selecting the right tool.</p><p>See also the &quot;NOTE about Windows native toolchains&quot; in the section call &quot;GNU Toolchain Options&quot; above.</p></li></ol><p>Configuration sub-directories -----------------------------</p><p>knsh: This is identical to the nsh configuration below except that NuttX is built as a kernel-mode, monolithic module and the user applications are built separately. It is recommends to use a special make command; not just &#39;make&#39; but make with the following two arguments:</p><pre><code>    make pass1 pass2

In the normal case (just &#39;make&#39;), make will attempt to build both user-
and kernel-mode blobs more or less interleaved.  This actual works!
However, for me it is very confusing so I prefer the above make command:
Make the user-space binaries first (pass1), then make the kernel-space
binaries (pass2)

NOTES:

1. At the end of the build, there will be several files in the top-level
   NuttX build directory:

   PASS1:
     nuttx_user.elf    - The pass1 user-space ELF file
     nuttx_user.hex    - The pass1 Intel HEX format file (selected in defconfig)
     User.map          - Symbols in the user-space ELF file

   PASS2:
     nuttx             - The pass2 kernel-space ELF file
     nuttx.hex         - The pass2 Intel HEX file (selected in defconfig)
     System.map        - Symbols in the kernel-space ELF file

   The J-Link programmer will accept files in .hex, .mot, .srec, and .bin
   formats.

2. Combining .hex files.  If you plan to use the .hex files with your
   debugger or FLASH utility, then you may need to combine the two hex
   files into a single .hex file.  Here is how you can do that.

   a. The &#39;tail&#39; of the nuttx.hex file should look something like this
      (with my comments added):

        $ tail nuttx.hex
        # 00, data records
        ...
        :10 9DC0 00 01000000000800006400020100001F0004
        :10 9DD0 00 3B005A0078009700B500D400F300110151
        :08 9DE0 00 30014E016D0100008D
        # 05, Start Linear Address Record
        :04 0000 05 0800 0419 D2
        # 01, End Of File record
        :00 0000 01 FF

      Use an editor such as vi to remove the 05 and 01 records.

   b. The &#39;head&#39; of the nuttx_user.hex file should look something like
      this (again with my comments added):

        $ head nuttx_user.hex
        # 04, Extended Linear Address Record
        :02 0000 04 0801 F1
        # 00, data records
        :10 8000 00 BD89 01084C800108C8110208D01102087E
        :10 8010 00 0010 00201C1000201C1000203C16002026
        :10 8020 00 4D80 01085D80010869800108ED83010829
        ...

      Nothing needs to be done here.  The nuttx_user.hex file should
      be fine.

   c. Combine the edited nuttx.hex and un-edited nuttx_user.hex
      file to produce a single combined hex file:

      $ cat nuttx.hex nuttx_user.hex &gt;combined.hex

   Then use the combined.hex file with the to write the FLASH image.
   If you do this a lot, you will probably want to invest a little time
   to develop a tool to automate these steps.
</code></pre><p>nsh: Configures the NuttShell (nsh) located at examples/nsh. The Configuration enables both the serial and telnetd NSH interfaces.</p><pre><code>NOTES:

1. NSH built-in applications are supported.  However, there are
   no built-in applications built with the default configuration.

   Binary Formats:
     CONFIG_BUILTIN=y                    : Enable support for built-in programs

   Application Configuration:
     CONFIG_NSH_BUILTIN_APPS=y           : Enable starting apps from NSH command line

2. This configuration has been used for verifying the touchscreen on
   on the SAM3U-EK LCD.  With these modifications, you can include the
   touchscreen test program at apps/examples/touchscreen as an NSH built-in
   application.  You can enable the touchscreen and test by modifying the
   default configuration in the following ways:

      Device Drivers
        CONFIG_SPI=y                      : Enable SPI support
        CONFIG_SPI_EXCHANGE=y             : The exchange() method is supported

        CONFIG_INPUT=y                    : Enable support for input devices
        CONFIG_INPUT_ADS7843E=y           : Enable support for the XPT2046
        CONFIG_ADS7843E_SPIDEV=2          : Use SPI CS 2 for communication
        CONFIG_ADS7843E_SPIMODE=0         : Use SPI mode 0
        CONFIG_ADS7843E_FREQUENCY=1000000 : SPI BAUD 1MHz
        CONFIG_ADS7843E_SWAPXY=y          : If landscpe orientation
        CONFIG_ADS7843E_THRESHX=51        : These will probably need to be tuned
        CONFIG_ADS7843E_THRESHY=39

      System Type -&gt; Peripherals:
        CONFIG_SAM34_SPI0=y               : Enable support for SPI

      System Type:
        CONFIG_SAM34_GPIO_IRQ=y           : GPIO interrupt support
        CONFIG_SAM34_GPIOA_IRQ=y          : Enable GPIO interrupts from port A

      Library Support:
        CONFIG_SCHED_WORKQUEUE=y          : Work queue support required

      Application Configuration:
        CONFIG_EXAMPLES_TOUCHSCREEN=y     : Enable the touchscreen built-int test

      Defaults should be okay for related touchscreen settings.  Touchscreen
      debug output on UART0 can be enabled with:

      Build Setup:
        CONFIG_DEBUG_FEATURES=y           : Enable debug features
        CONFIG_DEBUG_INFO=y               : Enable verbose debug output
        CONFIG_DEBUG_INPUT=y              : Enable debug output from input devices

3. Enabling HSMCI support. The SAM3U-KE provides a an SD memory card
   slot.  Support for the SD slot can be enabled with the following
   settings:

   System Type-&gt;ATSAM3/4 Peripheral Support
     CONFIG_SAM34_HSMCI=y                 : Enable HSMCI support
     CONFIG_SAM34_DMAC0=y                 : DMAC support is needed by HSMCI

   System Type
     CONFIG_SAM34_GPIO_IRQ=y              : PIO interrupts needed
     CONFIG_SAM34_GPIOA_IRQ=y             : Card detect pin is on PIOA

   Device Drivers -&gt; MMC/SD Driver Support
     CONFIG_MMCSD=y                       : Enable MMC/SD support
     CONFIG_MMSCD_NSLOTS=1                : One slot per driver instance
     CONFIG_MMCSD_HAVE_CARDDETECT=y        : Supports card-detect PIOs
     CONFIG_MMCSD_SDIO=y                  : SDIO-based MMC/SD support
     CONFIG_SDIO_DMA=y                    : Use SDIO DMA
     CONFIG_SDIO_BLOCKSETUP=y             : Needs to know block sizes

   Library Routines
     CONFIG_SCHED_WORKQUEUE=y             : Driver needs work queue support

   Application Configuration -&gt; NSH Library
     CONFIG_NSH_ARCHINIT=y                : NSH board-initialization

STATUS:
  2013-6-28: The touchscreen is functional.
  2013-6-29: Hmmm... but there appear to be conditions when the
    touchscreen driver locks up.  Looks like some issue with
    managing the interrupts.
  2013-6-30:  Those lock-ups appear to be due to poorly placed
    debug output statements.  If you do not enable debug output,
    the touchscreen is rock-solid.
  2013-8-10:  Added the comments above above enabling HSMCI memory
    card support and verified that the configuration builds without
    error.  However, that configuration has not yet been tested (and
    is may even be incomplete).
</code></pre><p>nx: Configures to use examples/nx using the HX834x LCD hardware on the SAM3U-EK development board.</p><p>nxwm: This is a special configuration setup for the NxWM window manager UnitTest. It includes support for both the HX834x LCD and the ADS7843E touchscreen controller on board the SAM3U-EK board.</p><pre><code>The NxWM window manager is a tiny window manager tailored for use
with smaller LCDs.  It supports a toolchain, a start window, and
multiple application windows.  However, to make the best use of
the visible LCD space, only one application window is visible at
at time.

The NxWM window manager can be found here:

  apps/graphics/NxWidgets/nxwm

The NxWM unit test can be found at:

  apps/graphics/NxWidgets/UnitTests/nxwm

STATUS:

1. 2013-6-28:  Created the configuration but have not yet done
   anything with it.

2. 2013-6-29:  Various changes to get a clean build of this
   configuration. Still untested.

3. 20113-6-30:  I cannot load this program using AtmelStudio6.1.
   The total size with DEBUG on is 138.9 KB.  I have verified
   that the first 128KB may have been written correctly, but then
   the code above 128KB wraps and overwrites the code at the
   beginning of FLASH, trashing the FLASH images.

   Bottom line:  Still untested.
</code></pre>`,47)]))}const C=n(a,[["render",s]]);export{c as __pageData,C as default};
