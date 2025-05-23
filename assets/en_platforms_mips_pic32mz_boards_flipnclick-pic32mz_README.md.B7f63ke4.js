import{_ as t,c as o,al as i,o as n}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"boards/mips/pic32mz/flipnclick-pic32mz README","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/mips/pic32mz/boards/flipnclick-pic32mz/README.md","filePath":"en/platforms/mips/pic32mz/boards/flipnclick-pic32mz/README.md"}'),a={name:"en/platforms/mips/pic32mz/boards/flipnclick-pic32mz/README.md"};function r(s,e,l,h,d,p){return n(),o("div",null,e[0]||(e[0]=[i(`<h1 id="boards-mips-pic32mz-flipnclick-pic32mz-readme" tabindex="-1">boards/mips/pic32mz/flipnclick-pic32mz README <a class="header-anchor" href="#boards-mips-pic32mz-flipnclick-pic32mz-readme" aria-label="Permalink to &quot;boards/mips/pic32mz/flipnclick-pic32mz README&quot;">​</a></h1><p>This README file discusses the port of NuttX to the Mikroe Flip&amp;Click PIC32MZ board. That board features the PIC32MZ2048EFH100 MCU.</p><p>Thanks to John Legg for contributing the Flip&amp;Click PIC32MZ board!</p><h1 id="contents" tabindex="-1">Contents <a class="header-anchor" href="#contents" aria-label="Permalink to &quot;Contents&quot;">​</a></h1><p>Port Status On Board Debug Support Using the mikroProg Creating Compatible NuttX HEX files Tool Issues Serial Console SPI LEDs SSD1306 OLED Configurations</p><h1 id="port-status" tabindex="-1">Port Status <a class="header-anchor" href="#port-status" aria-label="Permalink to &quot;Port Status&quot;">​</a></h1><p>2018-01-07: Added architecture support for the PIC32MZ2048EFH100 used on the Flip&amp;Click PIC32MZ board. 2018-01-08: Created the basic board configuration for the Mikroe Flip&amp;Click PIC32MZ board. No testing has yet been performed. At this point, I have not even figured out how I am going to load and debug new firmware. 2018-02-08: I received a mikroProg PIC32 debugger (Thanks go to John Legg of the Debug Shop!). 2018-02-09: The NSH configuration is now functional, but only with the RS-232 Click in mikroBUS slot B. There is, apparently, some mis- information about how UART4 RX is connected in mikroBUS slot A; I cannot receive serial there. But life is good in slot B. 2018-02-10: Added the nxlines configuration to test the custom HiletGo OLED on a Click proto board. Debug output indicates that the example is running error free yet nothing appears on the OLED in mikroBUS slot A. I tried slot D with same result. I also ported the configuration to the Flip&amp;Click SAM3X and got the same result. There could be SPI issues on the PIC32MX, but more likely that there is an error in my custom HiletGo Click. Damn!</p><h1 id="on-board-debug-support" tabindex="-1">On Board Debug Support <a class="header-anchor" href="#on-board-debug-support" aria-label="Permalink to &quot;On Board Debug Support&quot;">​</a></h1><p>There are several debug options:</p><ol><li><p>Using the Arduino IDE (chipKIT core). This is available on the USB-UART port between the C and D MikroBUS sockets. Usage is described in the Flip&amp;Click User Manual.</p><p>I don&#39;t think trying to use the Arduino IDE is a good option.</p></li><li><p>Using the mikroC USB HID bootloader. This is is available on the USB port between the A and B MikroBUS sockets. Usage is described in the Flip&amp;Click User Manual.</p><p>There is a simple application available at Mikroe that will allow you to write .hex files via the USB HID bootloader. However, in order to use the bootloader, you will have to control the memory map so that the downloaded code does not clobber the bootloader code FLASH, data memory, exception vectors, etc.</p><p>At this point, I have found no documentation describing how to build the code outside of the Mikroe toolchain for use with the Mikroe bootloader.</p></li><li><p>There is an undocumented and unpopulated PICKit3 connector between the B and C mikroBUS sockets.</p></li><li><p>There is an undocumented and unpopulated mikroProg connector between the A and D mikroBUS sockets.</p><p>Since 3) and 4) are undocumented, this would require some research and would, most likely, clobber the USB HID bootloader (and possibly the Arduino support as well).</p></li></ol><h1 id="using-the-mikroprog" tabindex="-1">Using the mikroProg <a class="header-anchor" href="#using-the-mikroprog" aria-label="Permalink to &quot;Using the mikroProg&quot;">​</a></h1><p>WARNINGS:</p><ol><li><p>Following there steps will most certainly overwrite the bootloader that was factory installed in FLASH!</p></li><li><p>Due to the position and orientation of the mikroProg connector you may lose functionality: If you attach mikroProg to the red side of the board, you will not be able to use the Arduino Shield Connector while the mikroProg connected. If you attach mikroProg to the white side of the board, you will similarly lose access to mikroBUS connectors A and D.</p><p>Hindsight is 20/20 and in retrospect I would look for a right handler header to priven the mikroProg connector from interfering with the Arduino connection.</p></li></ol><p>Hardware setup --------------</p><p>You will need to add a five pin header to the mikroProg connector between the A and D mikroBUS sockets.</p><p>Connect the mikroProg to the outer 5 pins of the mikroProg&#39;s 10-pin connector to the 5-pin header, respecting the pin 1 position: The colored wire on the ribbon cable should be on the same side as the tiny arrow on the board indicating pin 1.</p><p>Connect the mikroProg to your computer with the provided USB cable; also power the Flip&#39;n&#39;Clip board with another USB cable connected to the computer. Either USB port will provide power.</p><p>Installing the Software -----------------------</p><p>From the mikroProg website <a href="https://www.mikroe.com/mikroprog-pic-dspic-pic32" target="_blank" rel="noreferrer">https://www.mikroe.com/mikroprog-pic-dspic-pic32</a> Download:</p><pre><code> Drivers for mikroProg Suite
 https://download.mikroe.com/setups/drivers/mikroprog/pic-dspic-pic32/mikroprog-pic-dspic-pic32-drivers.zip

 mikroProg Suite for PIC, dsPIC, PIC32 v260
 https://download.mikroe.com/setups/programming-software/mikroprog/pic-dspic-pic32/mikroprog-suite-pic-dspic-pic32-programming-software-setup-v260.zip
</code></pre><p>Install the mikroProg Suite. From things I have read, I gather that you must be Administrator when installing the tool The instructions say that it will automatically install the drivers. It did not for me.</p><p>To install the drivers... You will find several directories under mikroprog-pic-dspic-pic32-drivers/. Select the correct directory and run the .EXE file you find there.</p><p>When I started the mikroProg suite, it could not find the USB driver. After a few frustrating hours of struggling with the drivers, I found that if I start the mikroProg suite as a normal user, it does not find the driver. But if I instead start the mikroProg suite as Administrator... There it is! A little awkward but works just fine.</p><h1 id="creating-compatible-nuttx-hex-files" tabindex="-1">Creating Compatible NuttX HEX files <a class="header-anchor" href="#creating-compatible-nuttx-hex-files" aria-label="Permalink to &quot;Creating Compatible NuttX HEX files&quot;">​</a></h1><p>Intel Hex Format Files: -----------------------</p><pre><code>When NuttX is built it will produce two files in the top-level NuttX
directory:

1) nuttx - This is an ELF file, and
2) nuttx.hex - This is an Intel Hex format file.  This is controlled by
   the setting CONFIG_INTELHEX_BINARY in the .config file.

The PICkit tool wants an Intel Hex format file to burn into FLASH. However,
there is a problem with the generated nutt.hex: The tool expects the nuttx.hex
file to contain physical addresses.  But the nuttx.hex file generated from the
top-level make will have address in the KSEG0 and KSEG1 regions.
</code></pre><p>tools/pic32/mkpichex: ----------------------</p><pre><code>There is a simple tool in the NuttX tools/pic32 directory that can be
used to solve both issues with the nuttx.hex file.  But, first, you must
build the tool:

  cd tools/pic32
  make -f Makefile.host

Now you will have an executable
file called mkpichex (or mkpichex.exe on
Cygwin).  This program will take the nutt.hex file as an input, it will
convert all of the KSEG0 and KSEG1 addresses to physical address, and
it will write the modified file, replacing the original nuttx.hex.

To use this file, you need to do the following things:

  export PATH=???  # Add the NuttX tools/pic32mx directory to your
                   # PATH variable
  make             # Build nuttx and nuttx.hex
  mkpichex $PWD    # Convert addresses in nuttx.hex.  $PWD is the path
                   # to the top-level build directory.  It is the only
                   # required input to mkpichex.

  This procedure is automatically performed at the end of a build.
</code></pre><h1 id="tool-issues" tabindex="-1">Tool Issues <a class="header-anchor" href="#tool-issues" aria-label="Permalink to &quot;Tool Issues&quot;">​</a></h1><h2 id="segger-j-link" tabindex="-1">Segger J-Link <a class="header-anchor" href="#segger-j-link" aria-label="Permalink to &quot;Segger J-Link&quot;">​</a></h2><p>If using a Jlink that only these versions work with PIC32:</p><pre><code>J-Link BASE / EDU V9 or later
J-Link ULTRA+ / PRO V4 or later
</code></pre><p>This is the command to use:</p><pre><code>JLinkGDBServer -device PIC32MZ2048EFH100 -if 2-wire-JTAG-PIC32 -speed 12000
</code></pre><h1 id="serial-console" tabindex="-1">Serial Console <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;Serial Console&quot;">​</a></h1><p>[REVISIT: I am not sure if the USB VCOM ports are available to the software. That is likely another serial port option].</p><p>Convenient U[S]ARTs that may be used as the Serial console include:</p><ol><li><p>An Arduino Serial Shield. The RX and TX pins are available on the Arduino connector D0 and D1 pins, respectively. These are connected to UART5, UART5_RX and UART5_TX which are RD14 and RD15, respectively.</p></li><li><p>Mikroe Click Serial Shield. There are four Click bus connectors with serial ports available as follows:</p><p>Click A: UART4 UART4_RX and UART4_TX which are RG9 and RE3, respectively. Click B: UART3 UART3_RX and UART3_TX which are RF0 and RF1, respectively. Click C: UART1 UART1_RX and UART1_TX which are RC1 and RE5, respectively. Click D: UART2 UART2_RX and UART2_TX which are RC3 and RC2, respectively.</p></li></ol><p>Other serial ports are probably available on the Arduino connector. I will leave that as an exercise for the interested reader.</p><p>The outputs from these pins is 3.3V. You will need to connect RS232 transceiver to get the signals to RS-232 levels. The simplest options are an expensive Arduino RS-232 shield or a Mikroe RS-232 Click board.</p><p>STATUS: I have been unable to get the RS-232 Click to work in the mikroBUS A slot. The PIC32MZ did not receive serial input. It appears that there is an error in the some documentation: Either RG9 is not connected to UART4_RX or the PPS bit definitions are documented incorrectly for UART4.</p><p>Switching to UART3 eliminates the problem and the serial console is fully functional. I have not tried the other options of UART1, 2, or 5.</p><h1 id="spi" tabindex="-1">SPI <a class="header-anchor" href="#spi" aria-label="Permalink to &quot;SPI&quot;">​</a></h1><p>SPI3 is available on pins D10-D13 of the Arduino Shield connectors where you would expect them. The SPI connector is configured as follows:</p><pre><code> Pin J1 Board Signal PIC32MZ
 --- -- ------------ -------
 D10 8  SPI3_SCK     RB14
 D11 7  SPI3_MISO    RB9
 D12 6  SPI3_MOSI    RB10
 D13 5  SPI3_SS      RB9
</code></pre><p>SPI1 and SPI2 are also available on the mikroBUS Click connectors (in addition to 5V and GND). The connectivity between connectors A and B and between C and D differs only in the chip select pin:</p><pre><code> MikroBUS A:                 MikroBUS B:
 Pin  Board Signal PIC32MZ  Pin  Board Signal PIC32MZ
 ---- ------------ -------  ---- ------------ -------
 CS   SPI2_SS1     RA0      CS   SPI2_SS0     RE4
 SCK  SPI2_SCK     RG6      SCK  SPI2_SCK     RG6
 MISO SPI2_MISO    RC4      MISO SPI2_MISO    RC4
 MOSI SPI2_MOSI    RB5      MOSI SPI2_MOSI    RB5

 MikroBUS C:                 MikroBUS D:
 Pin  Board Signal PIC32MZ  Pin  Board Signal PIC32MZ
 ---- ------------ -------  ---- ------------ -------
 CS   SPI1_SS0     RD12     CS   SPI1_SS1     RD13
 SCK  SPI1_SCK     RD1      SCK  SPI1_SCK     RD1
 MISO SPI1_MISO    RD2      MISO SPI1_MISO    RD2
 MOSI SPI1_MOSI    RD3      MOSI SPI1_MOSI    RD3
</code></pre><h1 id="leds-and-buttons" tabindex="-1">LEDs and Buttons <a class="header-anchor" href="#leds-and-buttons" aria-label="Permalink to &quot;LEDs and Buttons&quot;">​</a></h1><p>LEDs ----</p><p>There are four LEDs on the top, red side of the board. Only one can be controlled by software:</p><pre><code>LED L - RB14 (SPI3_SCK)
</code></pre><p>There are also four LEDs on the back, white side of the board:</p><pre><code>LED A - RA6
LED B - RA7
LED C - RE0
LED D - RE1
</code></pre><p>A high output value illuminates the LEDs.</p><p>These LEDs are available to the application and are all available to the application unless CONFIG_ARCH_LEDS is defined. In that case, the usage by the board port is defined in include/board.h and src/sam_autoleds.c. The LEDs are used to encode OS-related events as follows:</p><pre><code>SYMBOL           MEANING                        LED STATE
                                          L   A   B   C   D
---------------- ----------------------- --- --- --- --- ---
LED_STARTED      NuttX has been started  OFF ON  OFF OFF OFF
LED_HEAPALLOCATE Heap has been allocated OFF OFF ON  OFF OFF
LED_IRQSENABLED  Interrupts enabled      OFF OFF OFF ON  OFF
LED_STACKCREATED Idle stack created      OFF OFF OFF OFF ON
LED_INIRQ        In an interrupt         GLO N/C N/C N/C N/C
LED_SIGNAL       In a signal handler     GLO N/C N/C N/C N/C
LED_ASSERTION    An assertion failed     GLO N/C N/C N/C N/C
LED_PANIC        The system has crashed  2Hz N/C N/C N/C N/C
LED_IDLE         MCU is is sleep mode    ---- Not used -----
</code></pre><p>Thus if LED L is glowing faintly and all other LEDs are off (except LED D which was left on but is no longer controlled by NuttX and so may be in any state), NuttX has successfully booted and is, apparently, running normally and taking interrupts. If any of LEDs A-D are statically set, then NuttX failed to boot and the LED indicates the initialization phase where the failure occurred. If LED L is flashing at approximately 2Hz, then a fatal error has been detected and the system has halted.</p><p>NOTE: After booting, LEDs A-D are no longer used by the system and may be controlled the application.</p><p>Buttons -------</p><p>The Flip&amp;Click PIC32MZ has 2 user push buttons labeled T1 and T2 on the white side of the board:</p><p>PIN LED Notes</p><hr><p>RD10 T1 Sensed low when closed RD11 T2 Sensed low when closed</p><p>The switches have external pull-up resistors. The switches are pulled high (+3.3V) and grounded when pressed.</p><h1 id="ssd1306-oled" tabindex="-1">SSD1306 OLED <a class="header-anchor" href="#ssd1306-oled" aria-label="Permalink to &quot;SSD1306 OLED&quot;">​</a></h1><h2 id="hardware" tabindex="-1">Hardware <a class="header-anchor" href="#hardware" aria-label="Permalink to &quot;Hardware&quot;">​</a></h2><p>The HiletGo is a 128x64 OLED that can be driven either via SPI or I2C (SPI is the default and is what is used here). I have mounted the OLED on a proto click board. The OLED is connected as follows:</p><p>OLED ALIAS DESCRIPTION PROTO CLICK</p><hr><p>GND Ground GND VCC Power Supply 5V (3-5V) D0 SCL,CLK,SCK Clock SCK D1 SDA,MOSI Data MOSI,SDI RES RST,RESET Reset RST (GPIO OUTPUT) DC AO Data/Command INT (GPIO OUTPUT) CS Chip Select CS (GPIO OUTPUT)</p><p>NOTE that this is a write-only display (MOSI only)!</p><h1 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h1><h2 id="information-common-to-all-configurations" tabindex="-1">Information Common to All Configurations <a class="header-anchor" href="#information-common-to-all-configurations" aria-label="Permalink to &quot;Information Common to All Configurations&quot;">​</a></h2><ol><li><p>Each PIC32MZ configuration is maintained in a sub-directory and can be selected as follow:</p><p>tools/configure.sh flipnclick-pic32mz:<code>&lt;subdir&gt;</code></p><p>Where typical options are -l to configure to build on Linux or -c to configure for Cygwin under Linux. &#39;tools/configure.sh -h&#39; will show you all of the options.</p><p>Before building, make sure the PATH environment variable includes the correct path to the directory than holds your toolchain binaries.</p><p>And then build NuttX by simply typing the following. At the conclusion of the make, the nuttx binary will reside in an ELF file called, simply, nuttx.</p><p>make</p><p>The <code>&lt;subdir&gt;</code> that is provided above as an argument to the tools/configure.sh must be is one of the directories listed in the following paragraph.</p></li><li><p>These configurations uses the mconf-based configuration tool. To change this configurations using that tool, you should:</p><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository.</p><p>b. Execute &#39;make menuconfig&#39; in the top-level nuttx in order to start the reconfiguration process.</p></li></ol><h2 id="configuration-directories" tabindex="-1">Configuration Directories <a class="header-anchor" href="#configuration-directories" aria-label="Permalink to &quot;Configuration Directories&quot;">​</a></h2><p>Where <code>&lt;subdir&gt;</code> is one of the following:</p><p>nsh:</p><pre><code>This is the NuttShell (NSH) using the NSH startup logic at
apps/examples/nsh.

NOTES:

1. Serial Console.  UART3 is configured as the Serial Console.  This
   assumes that you will be using a Mikroe RS-232 Click card in the
   mikroBUS B slot.  Other serial consoles may be selected by re-
   configuring (see the section &quot;Serial Consoles&quot; above).

2. Toolchain

   By default, the Pinguino MIPs tool chain is used.  This toolchain
   selection can easily be changed with &#39;make menuconfig&#39;.

3. Default configuration:  These are other things that you may want to
   change in the configuration:

   CONFIG_PIC32MZ_DEBUGGER_ENABLE=n  : Debugger is disabled
   CONFIG_PIC32MZ_TRACE_ENABLE=n     : Trace is disabled
   CONFIG_PIC32MZ_JTAG_ENABLE=n      : JTAG is disabled
</code></pre><p>nxlines</p><pre><code>This is an NSH configuration that supports the NX graphics example at
apps/examples/nxlines as a built-in application.

NOTES:

1. This configuration derives from the nsh configuration.  All of the
   notes there apply here as well.

2. The default configuration assumes there is the custom HiletGo OLED
   in the mikroBUS A slot (and a Mikroe RS-232 Click card in the
   mikroBUS B slot).  That is easily changed by reconfiguring, however.
   See the section entitled &quot;HiletGo OLED&quot; for information about this
   custom click card.

STATUS:

2018-02-10:  The debug output indicates that the nxlines example is
  running with no errors, however, nothing appears on the OLED display.
  I tried slot D with same result.  I also ported the configuration to
  the Flip&amp;Click SAM3X and got the same result.  There could be SPI issues
  on the PIC32MX, but more likely that there is an error in my custom
  HiletGo Click.  Damn!
</code></pre>`,80)]))}const m=t(a,[["render",r]]);export{u as __pageData,m as default};
