import{_ as o,c as n,al as t,o as a}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"README","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/sam34/boards/flipnclick-sam3x/README.md","filePath":"en/platforms/arm/sam34/boards/flipnclick-sam3x/README.md"}'),i={name:"en/platforms/arm/sam34/boards/flipnclick-sam3x/README.md"};function r(s,e,l,d,c,h){return a(),n("div",null,e[0]||(e[0]=[t(`<h1 id="readme" tabindex="-1">README <a class="header-anchor" href="#readme" aria-label="Permalink to &quot;README&quot;">​</a></h1><p>This README discusses issues unique to NuttX configurations for the Mikroe Flip&amp;Click SAM3X board. This board is an Arduino-Due work-alike with four Mikroe Click bus interfaces. Like the Arduino-Due, this board features the Atmel ATSAM3X8E MCU running at 84 MHz.</p><p>Thanks to John Legg for contributing the Flip&amp;Click SAM3X board!</p><h1 id="contents" tabindex="-1">Contents <a class="header-anchor" href="#contents" aria-label="Permalink to &quot;Contents&quot;">​</a></h1><ul><li>STATUS</li><li>Buttons and LEDs</li><li>Serial Consoles</li><li>SPI</li><li>I2C</li><li>SSD1306 OLED</li><li>Loading Code</li><li>Flip&amp;Click SAM3X-specific Configuration Options</li><li>Configurations</li></ul><h1 id="status" tabindex="-1">STATUS <a class="header-anchor" href="#status" aria-label="Permalink to &quot;STATUS&quot;">​</a></h1><p>2018-01-07: Created the configuration. At present it does not work; I believe because of tool-related issues. See discussion under &quot;Loading Code&quot; below. 2018-01-24: I ordered a JTAG connector and soldered that to the Flip&#39;n&#39;Click and I am now successfully able to load code. The NSH configuration appears to be fully functional. 2018-02-11: Added the nxlines configuration to test the custom HiletGo OLED on a Click proto board. This is the same logic from the Flip&amp;Click PIC32MZ and the result is the same: No complaints from the software, but nothing appears on the OLED. There is, most likely, an error in my custom HiletGo Click. Damn!</p><h1 id="buttons-and-leds" tabindex="-1">Buttons and LEDs <a class="header-anchor" href="#buttons-and-leds" aria-label="Permalink to &quot;Buttons and LEDs&quot;">​</a></h1><h2 id="buttons" tabindex="-1">Buttons <a class="header-anchor" href="#buttons" aria-label="Permalink to &quot;Buttons&quot;">​</a></h2><p>There are no buttons on the Flip&amp;Click SAM3X board.</p><h2 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h2><p>There are four LEDs on the top, blue side of the board. Only one can be controlled by software:</p><pre><code>LED L - PB27 (PWM13)
</code></pre><p>There are also four LEDs on the back, white side of the board:</p><pre><code>LED A - PC6
LED B - PC5
LED C - PC7
LED D - PC8
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
</code></pre><p>Thus if LED L is glowing faintly and all other LEDs are off (except LED D which was left on but is no longer controlled by NuttX and so may be in any state), NuttX has successfully booted and is, apparently, running normally and taking interrupts. If any of LEDs A-D are statically set, then NuttX failed to boot and the LED indicates the initialization phase where the failure occurred. If LED L is flashing at approximately 2Hz, then a fatal error has been detected and the system has halted.</p><p>NOTE: After booting, LEDs A-D are no longer used by the system and may be controlled the application.</p><h1 id="serial-consoles" tabindex="-1">Serial Consoles <a class="header-anchor" href="#serial-consoles" aria-label="Permalink to &quot;Serial Consoles&quot;">​</a></h1><p>The SAM3X has a UART and 4 USARTS. The Programming port uses a USB-to- serial chip connected to the first of the MCU (RX0 and TX0 on PA8 and PA9, respectively). The output from that port is visible using the Arduino tool.</p><p>[NOTE: My experience so far: I get serial output on the virtual COM port via the UART, but I receive no serial input for keyboard data entered in the PC serial terminal. I have not investigated this problem. It may be something as simple as the Rx pin configuration. Instead, I just switched to USART0.]</p><p>Other convenient U[S]ARTs that may be used as the Serial console include:</p><ol><li><p>An Arduino Serial Shield. The RX and TX pins are available on the Arduino connector D0 and D1 pins, respectively. These are connected to USART0, RXD0 and TXD0 which are PA10 and PA11, respectively.</p></li><li><p>Mikroe Click Serial Shield. There are four Click bus connectors with serial ports available as follows:</p><p>Click A: USART0 RXD0 and TXD0 which are, again, PA10 and PA11. Click B: USART1 RXD1 and TXD1 which are PA12 and PA13, respectively. Click C: USART3 RXD3 and TXD3 which are PD5 and PD4, respectively. Click D: USART3 RXD3 and TXD3 which are, again, PD5 and PD4.</p></li></ol><p>Other serial ports are probably available on the Arduino connector. I will leave that as an exercise for the interested reader.</p><p>The outputs from these pins is 3.3V. You will need to connect RS232 transceiver to get the signals to RS232 levels (or connect to the USB virtual COM port in the case of UART0).</p><p>Any of UART and USART0-3 may be used as a serial console. UART0 would be the preferred default console setting. However, due to the communication problems mentioned above, USART0 is used as the default serial console in all configurations. But that is easily changed by modifying the configuration as described under &quot;Configurations&quot; below.</p><h1 id="spi" tabindex="-1">SPI <a class="header-anchor" href="#spi" aria-label="Permalink to &quot;SPI&quot;">​</a></h1><p>SPI0 is available on the Arduino compatible SPI connector (but no SPI is available on pins D10-D13 of the main Arduino Shield connectors where you might expect them). The SPI connector is configured as follows:</p><pre><code> Pin Board Signal SAM3X  Pin Board Signal SAM3X
 --- ------------ -----  --- ------------ -----
  1  SPI0_MISO    PA25    2  VCC-5V       N/A
  3  SPI0_SCK     PA27    4  SPI0_MOSI    PA26
  5  MRST         NRSTB   6  GND          N/A
</code></pre><p>SPI0 is also available on each of the mikroBUS Click connectors (in addition to 5V and GND). The connectivity differs only in the chip select pin:</p><pre><code> MikroBUS A:              MikroBUS B:
 Pin  Board Signal SAM3X  Pin  Board Signal SAM3X
 ---- ------------ -----  ---- ------------ -----
 CS   SPI0_CS0     PA28   CS   PA29         PA29
 SCK  SPI0_SCK     PA27   SCK  SPI0_SCK     PA27
 MISO SPI0_MISO    PA25   MISO SPI0_MISO    PA25
 MOSI SPI0_MOSI    PA26   MOSI SPI0_MOSI    PA26

 MikroBUS C:              MikroBUS D:
 Pin  Board Signal SAM3X  Pin  Board Signal SAM3X
 ---- ------------ -----  ---- ------------ -----
 CS   SPI0_CS2     PB21   CS   SPI0_CS3     PB23
 SCK  SPI0_SCK     PA27   SCK  SPI0_SCK     PA27
 MISO SPI0_MISO    PA25   MISO SPI0_MISO    PA25
 MOSI SPI0_MOSI    PA26   MOSI SPI0_MOSI    PA26
</code></pre><h1 id="i2c" tabindex="-1">I2C <a class="header-anchor" href="#i2c" aria-label="Permalink to &quot;I2C&quot;">​</a></h1><p>I2C0 is available on pins D16-D17 of the Arduino Shield connectors where you would expect them. The SPI connector is configured as follows:</p><pre><code> Pin Label J1 Board Signal SAM3X
 --- ----- -- ------------ -----
 D16 SCL1  8  I2C0_SCL     PA17
 D17 SDA1  7  I2C0_SDA     PA18
</code></pre><p>I2C0 and I2C1 are also available on the mikroBUS Click connectors (in addition to 5V and GND). The connectors A and B share I2C0 with the Arduino shield connector. Connectors C and D both connect to I2C1:</p><pre><code> MikroBUS A:              MikroBUS B:
 Pin  Board Signal SAM3X  Pin  Board Signal SAM3X
 ---- ------------ -----  ---- ------------ -------
 SCL  I2C0_SCL     PA17   SCL  I2C0_SCL    PA17
 SDA  I2C0_SDA     PA1    SDA  I2C0_SDA    PA18

 MikroBUS C:              MikroBUS D:
 Pin  Board Signal SAM3X  Pin  Board Signal SAM3X
 ---- ------------ -----  ---- ------------ -------
 SCL  I2C1_SCL     PB13   SCL  I2C1_SCL     PB13
 SDA  I2C1_SDA     PB12   SDA  I2C1_SDA     PB12
</code></pre><h1 id="ssd1306-oled" tabindex="-1">SSD1306 OLED <a class="header-anchor" href="#ssd1306-oled" aria-label="Permalink to &quot;SSD1306 OLED&quot;">​</a></h1><h2 id="hardware" tabindex="-1">Hardware <a class="header-anchor" href="#hardware" aria-label="Permalink to &quot;Hardware&quot;">​</a></h2><p>The HiletGo is a 128x64 OLED that can be driven either via SPI or I2C (SPI is the default and is what is used here). I have mounted the OLED on a proto click board. The OLED is connected as follows:</p><p>OLED ALIAS DESCRIPTION PROTO CLICK</p><hr><p>GND Ground GND VCC Power Supply 5V (3-5V) D0 SCL,CLK,SCK Clock SCK D1 SDA,MOSI Data MOSI,SDI RES RST,RESET Reset RST (GPIO OUTPUT) DC AO Data/Command INT (GPIO OUTPUT) CS Chip Select CS (GPIO OUTPUT)</p><p>NOTE that this is a write-only display (MOSI only)!</p><h1 id="loading-code" tabindex="-1">Loading Code <a class="header-anchor" href="#loading-code" aria-label="Permalink to &quot;Loading Code&quot;">​</a></h1><p>[NOTE: This text was mostly copied from the Arduino Due README.txt. I believe, however, that there have been significant changes to the tool environment such that Bossac may no longer be usable. I don&#39;t know that for certain and perhaps someone with more knowledge of the tools than I could make this work. See STATUS below for the current issues that I see.]</p><h2 id="installing-the-arduino-usb-driver-under-windows" tabindex="-1">Installing the Arduino USB Driver under Windows <a class="header-anchor" href="#installing-the-arduino-usb-driver-under-windows" aria-label="Permalink to &quot;Installing the Arduino USB Driver under Windows&quot;">​</a></h2><ol><li><p>Download the Windows version of the Arduino software, not the 1.0.x release but the latest (1.5.x or later) that supports the Arduino Due. When the download finishes, unzip the downloaded file.</p><p>In the current 1.8.x release, the Arduino Due support is not included in the base package but can be added by selecting the &quot;Boards Manager&quot; from the &quot;Tools&quot; menu.</p></li><li><p>Connect the Flip&amp;Click to your computer with a USB cable via the Programming port.</p></li><li><p>The Windows driver installation should fail.</p></li><li><p>Open the Device Manager</p></li><li><p>Look for the listing named &quot;Ports (COM &amp; LPT)&quot;. You should see an open port named &quot;Arduino Due Prog. Port&quot;. Right click and select &quot;Update driver&quot;.</p></li><li><p>Select the &quot;Browse my computer for Driver software&quot; option.</p></li><li><p>Right click on the &quot;Arduino Due Prog. Port&quot; and choose &quot;Update Driver Software&quot;.</p></li><li><p>Navigate to the folder with the Arduino IDE you downloaded and unzipped earlier. Locate and select the &quot;Drivers&quot; folder in the main Arduino folder (not the &quot;FTDI USB Drivers&quot; sub-directory).</p></li></ol><h2 id="loading-nuttx-to-the-flip-click-using-bossa" tabindex="-1">Loading NuttX to the Flip&amp;Click Using Bossa <a class="header-anchor" href="#loading-nuttx-to-the-flip-click-using-bossa" aria-label="Permalink to &quot;Loading NuttX to the Flip&amp;Click Using Bossa&quot;">​</a></h2><p>Arduino uses BOSSA under the hood to load code and you can use BOSSA outside of Arduino.</p><p>Where do you get it?</p><pre><code>Generic BOSSA installation files are available here:
https://github.com/shumatech/BOSSA (formerly at
http://sourceforge.net/projects/b-o-s-s-a/?source=dlp)

Pre-built binaries are available: https://github.com/shumatech/BOSSA/releases

The original Arduino DUE used a patched version of BOSSA available
as source code here: https://github.com/shumatech/BOSSA/tree/arduino
But that has most likely been incorporated into the main github
repository.

But, fortunately, since you already installed Arduino, you already have
BOSSA installed.  In my installation, it is here:

C:\\Program Files (x86)\\Arduino\\arduino-1.5.2\\hardware\\tools\\bossac.exe
</code></pre><p>General Procedure</p><pre><code>1) Erase the FLASH and put the Flip&amp;Click in bootloader mode
2) Write the file to FLASH
3) Configure to boot from FLASH
4) Reset the Flip&amp;Click
</code></pre><p>Erase FLASH and Put the Flip&amp;Click in Bootloader Mode</p><pre><code>This is accomplished by simply configuring the programming port in 1200
baud and sending something on the programming port.  Here is some sample
output from a Windows CMD.exe shell.  NOTE that my Arduino programming
port shows up as COM7.  It may be different on your system.

To enter boot mode, set the baud to 1200 and send anything to the
programming port:

  C:\\Program Files (x86)\\Arduino\\arduino-1.5.2\\hardware\\tools&gt;mode com26:1200,n,8,1

  Status for device COM7:
  ------------------------
      Baud:            1200
      Parity:          None
      Data Bits:       8
      Stop Bits:       1
      Timeout:         ON
      XON/XOFF:        OFF
      CTS handshaking: OFF
      DSR handshaking: OFF
      DSR sensitivity: OFF
      DTR circuit:     ON
      RTS circuit:     ON

  C:\\Program Files (x86)\\Arduino\\arduino-1.5.2\\hardware\\tools&gt;bossac.exe --port=COM7 --usb-port=false -i
      Device       : ATSAM3X8
      Version      : v1.1 Dec 15 2010 19:25:04
      Address      : 0x80000
      Pages        : 2048
      Page Size    : 256 bytes
      Total Size   : 512KB
      Planes       : 2
      Lock Regions : 32
      Locked       : none
      Security     : false
      Boot Flash   : false
</code></pre><p>Writing FLASH and Setting FLASH Boot Mode</p><pre><code>In a Cygwin BaSH shell:

  export PATH=&quot;/cygdrive/c/Program Files (x86)/Arduino/arduino-1.5.2/hardware/tools&quot;:$PATH

Erasing, writing, and verifying FLASH with bossac:

  $ bossac.exe --port=COM7 --usb-port=false -e -w -v -b nuttx.bin -R
  Erase flash
  Write 86588 bytes to flash
  [==============================] 100% (339/339 pages)
  Verify 86588 bytes of flash
  [==============================] 100% (339/339 pages)
  Verify successful
  Set boot flash true
  CPU reset.

Some things that can go wrong:

  $ bossac.exe --port=COM7 --usb-port=false -e -w -v -b nuttx.bin -R
  No device found on COM7

This error means that there is code running on the Flip&amp;Click already
so the bootloader cannot connect. Press reset and try again

  $ bossac.exe --port=COM7 --usb-port=false -e -w -v -b nuttx.bin -R
  No device found on COM7

Sill No connection because the board does not jump to bootloader after
reset.  Set the baud to 1200 and send something then try again

  $ bossac.exe --port=COM7 --usb-port=false -e -w -v -b nuttx.bin -R
  Erase flash
  Write 86588 bytes to flash
  [==============================] 100% (339/339 pages)
  Verify 86588 bytes of flash
  [==============================] 100% (339/339 pages)
  Verify successful
  Set boot flash true
  CPU reset.
</code></pre><p>Other useful bossac operations.</p><pre><code>a) Write code to FLASH don&#39;t change boot mode and don&#39;t reset.  This lets
   you examine the FLASH contents that you just loaded while the bootloader
   is still active.

   $ bossac.exe --port=COM7 --usb-port=false -e -w -v --boot=0 nuttx.bin
   Write 64628 bytes to flash
   [==============================] 100% (253/253 pages)
   Verify 64628 bytes of flash
   [==============================] 100% (253/253 pages)
   Verify successful

b) Verify the FLASH contents (the bootloader must be running)

   $ bossac.exe --port=COM7 --usb-port=false -v nuttx.bin
   Verify 64628 bytes of flash
   [==============================] 100% (253/253 pages)
   Verify successful

c) Read from FLASH to a file  (the bootloader must be running):

   $ bossac.exe --port=COM7 --usb-port=false --read=4096 nuttx.dump
   Read 4096 bytes from flash
   [==============================] 100% (16/16 pages)

d) Change to boot from FLASH

   $ bossac.exe --port=COM7 --usb-port=false --boot=1
   Set boot flash true
</code></pre><p>STATUS: At present this procedure does not work. I do the following:</p><pre><code>a) Open TeraTerm, select COM7 at 1200 baud, type a few ENTERs, and
   close teraterm.

b) Execute the following command which claims to have successfully
   written to FLASH.

   bossac.exe --info --debug --port COM7 --usb-port=0 --erase --write --verify -b nuttx.bin -R

   But the code does not boot.  There is no indication of life.

c) Repeat a) then

   bossac.exe --info --debug --port COM7 --usb-port=0 --verify -b nuttx.bin

   And it says that the content of the FLASH is not good.
</code></pre><h2 id="uploading-nuttx-to-the-flip-click-using-jtag" tabindex="-1">Uploading NuttX to the Flip&amp;Click Using JTAG <a class="header-anchor" href="#uploading-nuttx-to-the-flip-click-using-jtag" aria-label="Permalink to &quot;Uploading NuttX to the Flip&amp;Click Using JTAG&quot;">​</a></h2><p>The JTAG/SWD signals are brought out to a 10-pin header JTAG connector:</p><pre><code>PIN SIGNAL         JTAG STANDARD     NOTES
--- -------------- ----------------- --------------------------------
 1  VCC-3.3V       VTref
 2  JTAG_TMS       SWDIO/TMS         SAM3X pin 31, Pulled up on board
 3  GND            GND
 4  JTAG_TCK       SWDCLK/TCK        SAM3X pin 28, Pulled up on board
 5  GND            GND
 6  JTAG_TDO       SWO/EXta/TRACECTL SAM3X pin 30, Pulled up on board
 7  N/C            Key
 8  JTAG_TDI       NC/EXTb/TDI       SAM3X pin 29, Pulled up on board
 9  GND            GNDDetect
10  MRST           nReset
</code></pre><p>NOTE: The 10-pin JTAG connector is not populated on the Flip&amp;Click SAM3X. This is the part number for the SMD connector recommended by ARM.com: Samtec FTSH-105-01-L-DV-K. For example:</p><p><a href="https://www.digikey.com/product-detail/en/samtec-inc/FTSH-105-01-L-DV-K/SAM8799-ND/1875039" target="_blank" rel="noreferrer">https://www.digikey.com/product-detail/en/samtec-inc/FTSH-105-01-L-DV-K/SAM8799-ND/1875039</a></p><p>You should be able to use a 10- to 20-pin adapter to connect a SAM-ICE or J-Link debugger to the Flip&amp;Click SAM3X. I have this Olimex adapter: <a href="https://www.olimex.com/Products/ARM/JTAG/ARM-JTAG-20-10/" target="_blank" rel="noreferrer">https://www.olimex.com/Products/ARM/JTAG/ARM-JTAG-20-10/</a> . I have been loading code and debugging with no problems using JTAG.</p><h1 id="flip-click-sam3x-specific-configuration-options" tabindex="-1">Flip&amp;Click SAM3X-specific Configuration Options <a class="header-anchor" href="#flip-click-sam3x-specific-configuration-options" aria-label="Permalink to &quot;Flip&amp;Click SAM3X-specific Configuration Options&quot;">​</a></h1><p>CONFIG_ARCH - Identifies the arch/ subdirectory. This should be set to:</p><pre><code>CONFIG_ARCH=arm
</code></pre><p>CONFIG_ARCH_family - For use in C code:</p><pre><code>CONFIG_ARCH_ARM=y
</code></pre><p>CONFIG_ARCH_architecture - For use in C code:</p><pre><code>CONFIG_ARCH_CORTEXM3=y
</code></pre><p>CONFIG_ARCH_CHIP - Identifies the arch/*/chip subdirectory</p><pre><code>CONFIG_ARCH_CHIP=&quot;sam34&quot;
</code></pre><p>CONFIG_ARCH_CHIP_name - For use in C code to identify the exact chip:</p><pre><code>CONFIG_ARCH_CHIP_SAM34
CONFIG_ARCH_CHIP_SAM3X
CONFIG_ARCH_CHIP_ATSAM3X8E
</code></pre><p>CONFIG_ARCH_BOARD - Identifies the boards/ subdirectory and hence, the board that supports the particular chip or SoC.</p><pre><code>CONFIG_ARCH_BOARD=flipnclick-sam3x (for the Flip&amp;Click SAM3X development board)
</code></pre><p>CONFIG_ARCH_BOARD_name - For use in C code</p><pre><code>CONFIG_ARCH_BOARD_FLIPNCLICK_SAM3X=y
</code></pre><p>CONFIG_ARCH_LOOPSPERMSEC - Must be calibrated for correct operation of delay loops</p><p>CONFIG_RAM_SIZE - Describes the installed DRAM (SRAM in this case):</p><pre><code>CONFIG_RAM_SIZE=65536 (64Kb)
</code></pre><p>CONFIG_RAM_START - The start address of installed DRAM</p><pre><code>CONFIG_RAM_START=0x20000000
</code></pre><p>CONFIG_ARCH_LEDS - Use LEDs to show state. Unique to boards that have LEDs</p><p>Individual subsystems can be enabled:</p><pre><code>CONFIG_SAM34_ADC12B      - 12-bit Analog To Digital Converter
CONFIG_SAM34_CAN0        - CAN Controller 0
CONFIG_SAM34_CAN1        - CAN Controller 1
CONFIG_SAM34_DACC        - Digital To Analog Converter
CONFIG_SAM34_DMAC0       - DMA Controller
CONFIG_SAM34_EMAC        - Ethernet MAC
CONFIG_SAM34_HSMCI       - High Speed Multimedia Card Interface
CONFIG_SAM34_PWM         - Pulse Width Modulation
CONFIG_SAM34_RTC         - Real Time Clock
CONFIG_SAM34_RTT         - Real Time Timer
CONFIG_SAM34_SDRAMC      - SDRAM Controller
CONFIG_SAM34_SMC         - Static Memory Controller
CONFIG_SAM34_SPI0        - Serial Peripheral Interface 0
CONFIG_SAM34_SPI1        - Serial Peripheral Interface 1
CONFIG_SAM34_SSC         - Synchronous Serial Controller
CONFIG_SAM34_TC0         - Timer Counter 0
CONFIG_SAM34_TC1         - Timer Counter 1
CONFIG_SAM34_TC2         - Timer Counter 2
CONFIG_SAM34_TC3         - Timer Counter 3
CONFIG_SAM34_TC4         - Timer Counter 4
CONFIG_SAM34_TC5         - Timer Counter 5
CONFIG_SAM34_TC6         - Timer Counter 6
CONFIG_SAM34_TC7         - Timer Counter 7
CONFIG_SAM34_TC8         - Timer Counter 8
CONFIG_SAM34_TRNG        - True Random Number Generator
CONFIG_SAM34_TWIM/S0     - Two-Wire Interface 0 (master/slave)
CONFIG_SAM34_TWIM/S1     - Two-Wire Interface 1 (master/slave)
CONFIG_SAM34_UART0       - UART 0
CONFIG_SAM34_UOTGHS      - USB OTG High Speed
CONFIG_SAM34_USART0      - USART 0
CONFIG_SAM34_USART1      - USART 1
CONFIG_SAM34_USART2      - USART 2
CONFIG_SAM34_USART3      - USART 3
CONFIG_SAM34_WDT         - Watchdog Timer
</code></pre><p>Some subsystems can be configured to operate in different ways. The drivers need to know how to configure the subsystem.</p><pre><code>CONFIG_SAM34_GPIOA_IRQ
CONFIG_SAM34_GPIOB_IRQ
CONFIG_SAM34_GPIOC_IRQ
CONFIG_SAM34_GPIOD_IRQ
CONFIG_SAM34_GPIOE_IRQ
CONFIG_SAM34_GPIOF_IRQ
</code></pre><h1 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h1><p>Each Flip&amp;Click SAM3X configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh [OPTIONS] flipnclick-sam3x:&lt;subdir&gt;
</code></pre><p>Where typical options are -l to configure to build on Linux or -c to configure for Cygwin under Linux. &#39;tools/configure.sh -h&#39; will show you all of the options.</p><p>Before building, make sure the PATH environment variable includes the correct path to the directory than holds your toolchain binaries.</p><p>And then build NuttX by simply typing the following. At the conclusion of the make, the nuttx binary will reside in an ELF file called, simply, nuttx.</p><pre><code>make
</code></pre><p>The <code>&lt;subdir&gt;</code> that is provided above as an argument to the tools/configure.sh must be is one of the following.</p><p>NOTES:</p><ol><li>These configurations use the mconf-based configuration tool. To change any of these configurations using that tool, you should:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- --&gt;</span></span></code></pre></div><pre><code>a. Build and install the kconfig-mconf tool.  See nuttx/README.txt
   see additional README.txt files in the NuttX tools repository.

b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the
   reconfiguration process.
</code></pre><ol start="2"><li><p>Unless stated otherwise, all configurations generate console output on USART0 which is available either on the Arduion Shield connector or on mikroBUS A as described above in the section entitled &quot;Serial Consoles&quot;.</p></li><li><p>Unless otherwise stated, the configurations are setup for Cygwin under Windows:</p><p>Build Setup: CONFIG_HOST_WINDOWS=y : Microsoft Windows CONFIG_WINDIWS_CYGWIN=y : Cygwin under Windows</p></li><li><p>All of these configurations are set up to build under Windows using the &quot;GNU Tools for ARM Embedded Processors&quot; that is maintained by ARM (unless stated otherwise in the description of the configuration).</p><p><a href="https://developer.arm.com/open-source/gnu-toolchain/gnu-rm" target="_blank" rel="noreferrer">https://developer.arm.com/open-source/gnu-toolchain/gnu-rm</a></p><p>That toolchain selection can easily be reconfigured using &#39;make menuconfig&#39;. Here are the relevant current settings:</p><p>System Type -&gt; Toolchain: CONFIG_ARM_TOOLCHAIN_GNU_EABI=y : GNU ARM EABI toolchain for Windows</p></li></ol><h2 id="configuration-sub-directories" tabindex="-1">Configuration sub-directories <a class="header-anchor" href="#configuration-sub-directories" aria-label="Permalink to &quot;Configuration sub-directories&quot;">​</a></h2><p>nsh: This configuration directory will build the NuttShell. See NOTES above.</p><pre><code>NOTES:
1. NSH built-in applications are supported.  However, there are
   no built-in applications built with the default configuration.

   Binary Formats:
     CONFIG_BUILTIN=y                    : Enable support for built-in programs

   Application Configuration:
     CONFIG_NSH_BUILTIN_APPS=y           : Enable starting apps from NSH command line
</code></pre><p>nxlines</p><pre><code>This is an NSH configuration that supports the NX graphics example at
apps/examples/nxlines as a built-in application.

NOTES:

1. This configuration derives from the nsh configuration.  All of the
   notes there apply here as well.

2. The default configuration assumes there is the custom HiletGo OLED
   in the mikroBUS B slot (and a Mikroe RS-232 Click card in the
   mikroBUS A slot).  That is easily changed by reconfiguring, however.
   See the section entitled &quot;HiletGo OLED&quot; for information about this
   custom click card.
</code></pre><p>STATUS: 2018-02-11: No complaints from the software, but nothing appears on the OLED. There is, most likely, an error in my custom HiletGo Click. Damn!</p>`,113)]))}const S=o(i,[["render",r]]);export{u as __pageData,S as default};
