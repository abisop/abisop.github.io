import{_ as t,c as n,al as o,o as i}from"./chunks/framework.NFAqBSgQ.js";const c=JSON.parse('{"title":"stm32f103-minimum","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/stm32f1/boards/stm32f103-minimum/index.md","filePath":"en/platforms/arm/stm32f1/boards/stm32f103-minimum/index.md"}'),a={name:"en/platforms/arm/stm32f1/boards/stm32f103-minimum/index.md"};function r(s,e,l,u,p,d){return i(),n("div",null,e[0]||(e[0]=[o(`<h1 id="stm32f103-minimum" tabindex="-1">stm32f103-minimum <a class="header-anchor" href="#stm32f103-minimum" aria-label="Permalink to &quot;stm32f103-minimum&quot;">​</a></h1><p>chip:stm32, chip:stm32f1, chip:stm32f103</p><p>This page discusses issues unique to NuttX configurations for the STM32F103C8T6 Minimum System Development Board for ARM Microcontroller.</p><h2 id="stm32f103c8t6-minimum-system-development-boards" tabindex="-1">STM32F103C8T6 Minimum System Development Boards: <a class="header-anchor" href="#stm32f103c8t6-minimum-system-development-boards" aria-label="Permalink to &quot;STM32F103C8T6 Minimum System Development Boards:&quot;">​</a></h2><p>This STM32F103C8T6 minimum system development board is available from several vendors on the net, and may be sold under different names or no name at all. It is based on a STM32F103C8T6 and has a DIP-40 form-factor.</p><p>There are four versions of very similar boards: Red, Blue, RoboDyn Black and Black. See: <a href="https://wiki.stm32duino.com/index.php?title=Blue_Pill" target="_blank" rel="noreferrer">https://wiki.stm32duino.com/index.php?title=Blue_Pill</a><a href="https://wiki.stm32duino.com/index.php?title=Red_Pill" target="_blank" rel="noreferrer">https://wiki.stm32duino.com/index.php?title=Red_Pill</a><a href="https://wiki.stm32duino.com/index.php?title=RobotDyn_Black_Pill" target="_blank" rel="noreferrer">https://wiki.stm32duino.com/index.php?title=RobotDyn_Black_Pill</a><a href="https://wiki.stm32duino.com/index.php?title=Black_Pill" target="_blank" rel="noreferrer">https://wiki.stm32duino.com/index.php?title=Black_Pill</a></p><p>The Red Board:</p><p>Good things about the red board:</p><ul><li>1.5k pull up resistor on the PA12 pin (USB D+) which you can programmatically drag down for automated USB reset.</li><li>large power capacitors and LDO power.</li><li>User LED on PC13</li></ul><p>Problems with the red board:</p><ul><li>Silk screen is barely readable, the text is chopped off on some of the pins</li><li>USB connector only has two anchor points and it is directly soldered on the surface</li><li>Small reset button with hardly any resistance</li></ul><p>The Blue Board:</p><p>Good things about the blue board:</p><ul><li></li></ul><pre><code>Four soldered anchor point on the USB connector. What you can\\&#39;t tell

:   from this picture is that there is a notch in the PCB board and
    the USB connector sits down inside it some. This provides some
    lateral stability that takes some of the stress off the solder
    points.
</code></pre><ul><li><p>It has nice clear readable silkscreen printing.</p></li><li><p>It also a larger reset button.</p></li><li><p>User LED on PC13</p></li></ul><p>Problems with the blue board:</p><ul><li></li></ul><pre><code>Probably won\\&#39;t work as a USB device if it has a 10k pull-up on PA12. You

:   have to check the pull up on PA12 (USB D+). If it has a 10k
    pull-up resistor, you will need to replace it with a 1.5k one to
    use the native USB.
</code></pre><ul><li>Puny voltage regulator probably 100mA.</li></ul><p>A schematic for the blue board is available here: <a href="http://www.stm32duino.com/download/file.php?id=276" target="_blank" rel="noreferrer">http://www.stm32duino.com/download/file.php?id=276</a></p><p>The Black Board:</p><ul><li>User LED is on PB12.</li><li>Mounting holes.</li></ul><p>Both Boards:</p><p>Nice features common to both:</p><ul><li>SWD pins broken out and easily connected (VCC, GND, SWDIO, SWCLK)</li><li>USB 5V is broken out with easy access.</li><li>Power LED</li><li>You can probably use more flash (128k) than officially documented for the chip (stm32f103c8t6 64k), I was able to load 115k of flash on mine and it seemed to work.</li></ul><p>Problems with both boards:</p><ul><li>No preloaded bootloader (this isn&#39;t really a problem as the entire 64k of flash is available for use)</li><li>No user button</li></ul><p>This is the board pinout based on its form-factor for the Blue board:</p><h2 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h2><p>The STM32F103 Minimum board has only one software controllable LED. This LED can be used by the board port when CONFIG_ARCH_LEDS option is enabled.</p><p>If enabled the LED is simply turned on when the board boots successfully, and is blinking on panic / assertion failed.</p><h2 id="uarts" tabindex="-1">UARTs <a class="header-anchor" href="#uarts" aria-label="Permalink to &quot;UARTs&quot;">​</a></h2><h3 id="uart-usart-pins" tabindex="-1">UART/USART PINS <a class="header-anchor" href="#uart-usart-pins" aria-label="Permalink to &quot;UART/USART PINS&quot;">​</a></h3><h3 id="default-usart-uart-configuration" tabindex="-1">Default USART/UART Configuration <a class="header-anchor" href="#default-usart-uart-configuration" aria-label="Permalink to &quot;Default USART/UART Configuration&quot;">​</a></h3><p>USART1 (RX &amp; TX only) is available through pins PA9 (TX) and PA10 (RX).</p><h2 id="timer-inputs-outputs" tabindex="-1">Timer Inputs/Outputs <a class="header-anchor" href="#timer-inputs-outputs" aria-label="Permalink to &quot;Timer Inputs/Outputs&quot;">​</a></h2><h2 id="using-128kib-of-flash-instead-of-64kib" tabindex="-1">Using 128KiB of Flash instead of 64KiB <a class="header-anchor" href="#using-128kib-of-flash-instead-of-64kib" aria-label="Permalink to &quot;Using 128KiB of Flash instead of 64KiB&quot;">​</a></h2><p>Some people figured out that the STM32F103C8T6 has 128KiB of internal memory instead of 64KiB as documented in the datasheet and reported by its internal register.</p><p>In order to enable 128KiB you need modify the linker script to reflect this new size. Open the boards/arm/stm32/stm32f103-minimum/scripts/ld.script and replace:</p><pre><code>flash (rx) : ORIGIN = 0x08000000, LENGTH = 64K
</code></pre><p>with:</p><pre><code>flash (rx) : ORIGIN = 0x08000000, LENGTH = 128K
</code></pre><p>Enable many NuttX features (ie. many filesystems and applications) to get a large binary image with more than 64K.</p><p>We will use OpenOCD to write the firmware in the STM32F103C8T6 Flash. Use a up to dated OpenOCD version (ie. openocd-0.9).</p><p>You will need to create a copy of original openocd/scripts/target/stm32f1x.cfg to openocd/scripts/target/stm32f103c8t6.cfg and edit the later file replacing:</p><pre><code>flash bank _FLASHNAME stm32f1x 0x08000000 0 0 0 _TARGETNAME
</code></pre><p>with:</p><pre><code>flash bank _FLASHNAME stm32f1x 0x08000000 0x20000 0 0 _TARGETNAME
</code></pre><p>We will use OpenOCD with STLink-V2 programmer, but it will work with other programmers (JLink, Versaloon, or some based on FTDI FT232, etc).</p><p>Open a terminal and execute:</p><pre><code> sudo openocd -f interface/stlink-v2.cfg -f target/stm32f103c8t6.cfg
</code></pre><p>Now in other terminal execute:</p><pre><code> telnet localhost 4444

Trying 127.0.0.1...
Connected to localhost.
Escape character is &#39;^]&#39;.
Open On-Chip Debugger

&gt; reset halt
stm32f1x.cpu: target state: halted
target halted due to debug-request, current mode: Thread
xPSR: 0x01000000 pc: 0x080003ac msp: 0x20000d78

&gt; flash write_image erase nuttx.bin 0x08000000
auto erase enabled
device id = 0x20036410
ignoring flash probed value, using configured bank size
flash size = 128kbytes
stm32f1x.cpu: target state: halted
target halted due to breakpoint, current mode: Thread
xPSR: 0x61000000 pc: 0x2000003a msp: 0x20000d78
wrote 92160 bytes from file nuttx.bin in 4.942194s (18.211 KiB/s)

&gt; reset run
&gt; exit
</code></pre><p>Now NuttX should start normally.</p><h2 id="nintendo-wii-nunchuck" tabindex="-1">Nintendo Wii Nunchuck: <a class="header-anchor" href="#nintendo-wii-nunchuck" aria-label="Permalink to &quot;Nintendo Wii Nunchuck:&quot;">​</a></h2><p>There is a driver on NuttX to support Nintendo Wii Nunchuck Joystick. If you want to use it please select these options:</p><ul><li><p>Enable the I2C1 at System Type -&gt; STM32 Peripheral Support, it will enable:</p><blockquote><p>CONFIG_STM32_I2C1=y</p></blockquote></li><li><p>Enable to Custom board/driver initialization at RTOS Features -&gt; RTOS hooks</p><blockquote><p>CONFIG_BOARD_LATE_INITIALIZE=y</p></blockquote></li><li><p>Enable the I2C Driver Support at Device Drivers, it will enable this symbol:</p><blockquote><p>CONFIG_I2C=y</p></blockquote></li><li><p>Nintendo Wii Nunchuck Joystick at Device Drivers -&gt; [*] Input Device Support</p><blockquote><p>CONFIG_INPUT=y</p><p>: CONFIG_INPUT_NUNCHUCK=y</p></blockquote></li><li><p>Enable the Nunchuck joystick example at Application Configuration -&gt; Examples</p><p>CONFIG_EXAMPLES_NUNCHUCK=y</p><p>: CONFIG_EXAMPLES_NUNCHUCK_DEVNAME=&quot;/dev/nunchuck0&quot;</p></li></ul><p>You need to connect GND and +3.3V pins from Nunchuck connector to GND and 3.3V of stm32f103-minimum respectively (Nunchuck also can work connected to 5V, but I don&#39;t recommend it). Connect I2C Clock from Nunchuck to SCK (PB6) and the I2C Data to SDA (PB7).</p><h2 id="quadrature-encoder" tabindex="-1">Quadrature Encoder: <a class="header-anchor" href="#quadrature-encoder" aria-label="Permalink to &quot;Quadrature Encoder:&quot;">​</a></h2><p>The nsh configuration has been used to test the Quadrature Encoder (QEncoder, QE) with the following modifications to the configuration file:</p><ul><li><p>These setting enable support for the common QEncode upper half driver:</p><blockquote><p>CONFIG_SENSORS=y</p><p>: CONFIG_SENSORS_QENCODER=y</p></blockquote></li><li></li></ul><pre><code>This is a board setting that selected timer 4 for use with the

:   quadrature encode:

    CONFIG\\_STM32F103MINIMUM\\_QETIMER=4
</code></pre><ul><li><p>These settings enable the STM32 Quadrature encoder on timer 4:</p><blockquote><p>CONFIG_STM32_TIM4_CAP=y CONFIG_STM32_TIM4_QE=y CONFIG_STM32_TIM4_QECLKOUT=2800000 CONFIG_STM32_QENCODER_FILTER=y CONFIG_STM32_QENCODER_SAMPLE_EVENT_6=y CONFIG_STM32_QENCODER_SAMPLE_FDTS_4=y</p></blockquote></li><li><p>These settings enable the test case at apps/examples/qencoder:</p><blockquote><p>CONFIG_EXAMPLES_QENCODER=y CONFIG_EXAMPLES_QENCODER_DELAY=100 CONFIG_EXAMPLES_QENCODER_DEVPATH=&quot;/dev/qe0&quot;</p></blockquote></li></ul><p>In this configuration, the QEncoder inputs will be on the TIM4 inputs of PB6 and PB7.</p><h2 id="spi-nor-flash-support" tabindex="-1">SPI NOR Flash support: <a class="header-anchor" href="#spi-nor-flash-support" aria-label="Permalink to &quot;SPI NOR Flash support:&quot;">​</a></h2><p>We can use an extern SPI NOR Flash with STM32F103-Minimum board. In this case we tested the Winboard W25Q32FV (32Mbit = 4MiB).</p><p>You can connect the W25Q32FV module in the STM32F103 Minimum board this way: connect PA5 (SPI1 CLK) to CLK; PA7 (SPI1 MOSI) to DI; PA6 (SPI MISO) to DO; PA4 to /CS; Also connect 3.3V to VCC and GND to GND.</p><p>You can start with default &quot;stm32f103-minimum/nsh&quot; configuration option and enable/disable these options using &quot;make menuconfig&quot; :</p><pre><code>System Type  ---&gt;
    STM32 Peripheral Support  ---&gt;
        [*] SPI1

Board Selection  ---&gt;
    [*] MTD driver for external 4Mbyte W25Q32FV FLASH on SPI1
    (0)   Minor number for the FLASH /dev/smart entry
    [*]   Enable partition support on FLASH
    (1024,1024,1024,1024) Flash partition size list

RTOS Features  ---&gt;
    Stack and heap information  ---&gt;
            (512) Idle thread stack size
            (1024) Main thread stack size
            (256) Minimum pthread stack size
            (1024) Default pthread stack size

Device Drivers  ---&gt;
    -*- Memory Technology Device (MTD) Support  ---&gt;
            [*]   Support MTD partitions
            -*-   SPI-based W25 FLASH
            (0)     W25 SPI Mode
            (20000000) W25 SPI Frequency

File Systems  ---&gt;
    [ ] Disable pseudo-filesystem operations
    -*- SMART file system
    (0xff) FLASH erased state
    (16)  Maximum file name length

Memory Management  ---&gt;
    [*] Small memory model

Also change the boards/arm/stm32/stm32f103-minimum/scripts/ld.script file to use 128KB
of Flash instead 64KB (since this board has a hidden 64KB flash) :

MEMORY
{
    flash (rx) : ORIGIN = 0x08000000, LENGTH = 128K
    sram (rwx) : ORIGIN = 0x20000000, LENGTH = 20K
}

Then after compiling and flashing the file nuttx.bin you can format and mount
the flash this way:

nsh&gt; mksmartfs /dev/smart0p0
nsh&gt; mksmartfs /dev/smart0p1
nsh&gt; mksmartfs /dev/smart0p2
nsh&gt; mksmartfs /dev/smart0p3

nsh&gt; mount -t smartfs /dev/smart0p0 /mnt
nsh&gt; ls /mnt
/mnt:

nsh&gt; echo &quot;Testing&quot; &gt; /mnt/file.txt

nsh&gt; ls /mnt
/mnt:
 file.txt

nsh&gt; cat /mnt/file.txt
Testing

nsh&gt;
</code></pre><h2 id="sdcard-support" tabindex="-1">SDCard support: <a class="header-anchor" href="#sdcard-support" aria-label="Permalink to &quot;SDCard support:&quot;">​</a></h2><p>Only STM32F103xx High-density devices has SDIO controller. STM32F103C8T6 is a Medium-density device, but we can use SDCard over SPI.</p><p>You can do that enabling these options:</p><pre><code>CONFIG_FS_FAT=y

CONFIG_MMCSD=y
CONFIG_MMCSD_NSLOTS=1
CONFIG_MMCSD_SPI=y
CONFIG_MMCSD_SPICLOCK=20000000
CONFIG_MMCSD_SPIMODE=0

CONFIG_STM32_SPI=y
CONFIG_STM32_SPI1=y

CONFIG_SPI=y
CONFIG_SPI_CALLBACK=y
CONFIG_SPI_EXCHANGE=y
</code></pre><p>And connect a SDCard/SPI board on SPI1. Connect the CS pin to PA4, SCK to PA5, MOSI to PA7 and MISO to PA6. Note: some chinese boards use MOSO instead of MISO.</p><h2 id="nokia-5110-lcd-display-support" tabindex="-1">Nokia 5110 LCD Display support: <a class="header-anchor" href="#nokia-5110-lcd-display-support" aria-label="Permalink to &quot;Nokia 5110 LCD Display support:&quot;">​</a></h2><p>You can connect a low cost Nokia 5110 LCD display in the STM32F103 Minimum board this way: connect PA5 (SPI1 CLK) to CLK; PA7 (SPI1 MOSI) to DIN; PA4 to CE; PA3 to RST; PA2 to DC. Also connect 3.3V to VCC and GND to GND.</p><p>You can start with default &quot;stm32f103-minimum/nsh&quot; configuration option and enable these options using &quot;make menuconfig&quot; :</p><pre><code>System Type  ---&gt;
    STM32 Peripheral Support  ---&gt;
        [*] SPI1

Device Drivers  ---&gt;
    -*- SPI Driver Support  ---&gt;
        [*]   SPI exchange
        [*]   SPI CMD/DATA

Device Drivers  ---&gt;
    LCD Driver Support  ---&gt;
        [*] Graphic LCD Driver Support  ---&gt;
            [*]   Nokia 5110 LCD Display (Phillips PCD8544)
            (1)     Number of PCD8544 Devices
            (84)    PCD8544 X Resolution
            (48)    PCD8544 Y Resolution

Graphics Support  ---&gt;
    [*] NX Graphics
    (1)   Number of Color Planes

    (0x0) Initial background color
        Supported Pixel Depths  ---&gt;
            [ ] Disable 1 BPP
    [*]   Packed MS First

    Font Selections  ---&gt;
        (7) Bits in Character Set
        [*] Mono 5x8

Application Configuration  ---&gt;
    Examples  ---&gt;
        [*] NX graphics &quot;Hello, World!&quot; example
        (1)   Bits-Per-Pixel

After compiling and flashing the nuttx.bin inside the board, reset it.
You should see it:

NuttShell (NSH)
nsh&gt; ?
help usage:  help [-v] [&lt;cmd&gt;]

  [           dd          free        mb          source      usleep
  ?           echo        help        mh          sleep       xd
  cat         exec        hexdump     mw          test
  cd          exit        kill        pwd         true
  cp          false       ls          set         unset

Builtin Apps:
  nxhello

Now just run nxhello and you should see &quot;Hello World&quot; in the display:

nsh&gt; nxhello
</code></pre><h2 id="hyt271-sensor-support" tabindex="-1">HYT271 sensor support <a class="header-anchor" href="#hyt271-sensor-support" aria-label="Permalink to &quot;HYT271 sensor support&quot;">​</a></h2><p>The existing sensor configuration allows connecting several sensors of type hyt271 on i2c bus number 2. For full feature support, be able to change the i2c address of the sensor, the following hardware setup is necessary.:</p><pre><code>----------                                            -----------
|        |------ GND ------------------------ GND ----|         |
|        |                                            |         |
|        |                                            |         |
|        |                                            |         |
|        |---- POWIN A00 ------.                      |         |
|        |                     |                      |         |
|        |                    4.7k                    |         |
|        |                     |                      |         |
| STM32  |--- POWOUT A01 ------.------.------ VDD ----| HYT271  |
|        |                     |      |               |         |
|        |                    2.2k    |               |         |
|        |                     |      |               |         |
|        |----- SDA2 B11 ------.----  | ----- SDA ----|         |
|        |                            |               |         |
|        |                           2.2k             |         |
|        |                            |               |         |
|        |----- SCL2 B10 -------------.------ SCL ----|         |
|        |                                            |         |
---------                                             -----------
</code></pre><h2 id="ds18b20-sensor-support" tabindex="-1">DS18B20 sensor support <a class="header-anchor" href="#ds18b20-sensor-support" aria-label="Permalink to &quot;DS18B20 sensor support&quot;">​</a></h2><p>The existing sensor configuration allows connecting several sensors of type ds18b20 on 1wire bus number 2. The following hardware setup is necessary.:</p><pre><code>---------                                            -----------
|       |------ GND ----------.------------- GND ----|         |
|       |                                            |         |
|       |                                            |         |
|       |                                            |         |
|       |------ VDD ----------.------------- VDD ----|         |
| STM32 |                     |                      | DS18B20 |
|       |                    4.7k                    |         |
|       |                     |                      |         |
|       |----- TX2 A02 -------.------.------- DQ ----|         |
|       |                                            |         |
--------                                             -----------
</code></pre><h2 id="usb-console-support" tabindex="-1">USB Console support <a class="header-anchor" href="#usb-console-support" aria-label="Permalink to &quot;USB Console support&quot;">​</a></h2><p>The STM32F103C8 has a USB Device controller, then we can use NuttX support to USB Device. We can the console over USB enabling these options:</p><pre><code>System Type  ---&gt;
  STM32 Peripheral Support  ---&gt;
    [*] USB Device

It will enable:  CONFIG_STM32_USB=y

Board Selection  ---&gt;
  -*- Enable boardctl() interface
  [*]   Enable USB device controls

It will enable: CONFIG_BOARDCTL_USBDEVCTRL=y

Device Drivers  ---&gt;
  -*- USB Device Driver Support  ---&gt;
    [*]   USB Modem (CDC/ACM) support  ---&gt;

It will enable:  CONFIG_CDCACM=y and many default options.

Device Drivers  ---&gt;
  -*- USB Device Driver Support  ---&gt;
    [*]   USB Modem (CDC/ACM) support  ---&gt;
      [*]   CDC/ACM console device

It will enable: CONFIG_CDCACM_CONSOLE=y

Device Drivers  ---&gt;
  [*] Serial Driver Support  ---&gt;
    Serial console (No serial console)  ---&gt;
      (X) No serial console
</code></pre><p>It will enable: CONFIG_NO_SERIAL_CONSOLE=y</p><p>After flashing the firmware in the board, unplug and plug it in the computer and it will create a /dev/ttyACM0 device in the Linux. Use minicom with this device to get access to NuttX NSH console (press Enter three times to start)</p><h2 id="mcp2515-external-module" tabindex="-1">MCP2515 External Module <a class="header-anchor" href="#mcp2515-external-module" aria-label="Permalink to &quot;MCP2515 External Module&quot;">​</a></h2><p>You can use an external MCP2515 (tested with NiRen MCP2515_CAN module) to get CAN Bus working on STM32F103C8 chip (remember the internal CAN cannot work with USB at same time because they share the SRAM buffer).</p><p>You can connect the MCP2515 module in the STM32F103 Minimum board this way: connect PA5 (SPI1 CLK) to SCK; PA7 (SPI1 MOSI) to SI; PA6 (SPI MISO) to SO; PA4 to CS; B0 to INT. Also connect 5V to VCC and GND to GND.</p><p>Note: Although MCP2515 can work with 2.7V-5.5V it is more stable when using it on BluePill board on 5V.</p><p>Testing: you will need at least 2 boards each one with a MCP2515 module connected to it. Connect CAN High from the first module to the CAN High of the second module, and the CAN Low from the first module to the CAN Low of the second module.</p><p>You need to modify the &quot;CAN example&quot; application on menuconfig and create two firmware versions: the first firmware will be Read-only and the second one Write-only. Flash the first firmware in the first board and the second firmware in the second board. Now you can start the both boards, run the &quot;can&quot; command in the Write-only board and then run the &quot;can&quot; command in the Read-only board. You should see the data coming.</p><h2 id="stm32f103-minimum-specific-configuration-options" tabindex="-1">STM32F103 Minimum - specific Configuration Options <a class="header-anchor" href="#stm32f103-minimum-specific-configuration-options" aria-label="Permalink to &quot;STM32F103 Minimum - specific Configuration Options&quot;">​</a></h2><h2 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h2><h3 id="instantiating-configurations" tabindex="-1">Instantiating Configurations <a class="header-anchor" href="#instantiating-configurations" aria-label="Permalink to &quot;Instantiating Configurations&quot;">​</a></h3><p>Each STM32F103 Minimum configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh STM32F103 Minimum:&lt;subdir&gt;
</code></pre><p>Where &lt;subdir&gt; is one of the following:</p><h3 id="configuration-directories" tabindex="-1">Configuration Directories <a class="header-anchor" href="#configuration-directories" aria-label="Permalink to &quot;Configuration Directories&quot;">​</a></h3><h3 id="nsh" tabindex="-1">nsh <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh&quot;">​</a></h3><p>Configures the NuttShell (nsh) located at apps/examples/nsh. This configuration enables a console on UART1. Support for builtin applications is enabled, but in the base configuration no builtin applications are selected.</p><h3 id="jlx12864g" tabindex="-1">jlx12864g <a class="header-anchor" href="#jlx12864g" aria-label="Permalink to &quot;jlx12864g&quot;">​</a></h3><p>This is a config example to use the JLX12864G-086 LCD module. To use this LCD you need to connect PA5 (SPI1 CLK) to SCK; PA7 (SPI1 MOSI) to SDA; PA4 to CS; PA3 to RST; PA2 to RS.</p><h3 id="nrf24" tabindex="-1">nrf24 <a class="header-anchor" href="#nrf24" aria-label="Permalink to &quot;nrf24&quot;">​</a></h3><p>This is a config example to test the nrf24 terminal example. You will need two stm32f103-minimum board each one with a nRF24L01 module connected this way: connect PB1 to nRF24 CE pin; PA4 to CSN; PA5 (SPI1 CLK) to SCK; PA7 (SPI1 MOSI) to MOSI; PA6 (SPI1 MISO) to MISO; PA0 to IRQ.</p><h3 id="usbnsh" tabindex="-1">usbnsh <a class="header-anchor" href="#usbnsh" aria-label="Permalink to &quot;usbnsh&quot;">​</a></h3><p>This is another NSH example. If differs from other &#39;nsh&#39; configurations in that this configurations uses a USB serial device for console I/O.</p><p>NOTES:</p><ol><li><p>This configuration uses the mconf-based configuration tool. To change this configuration using that tool, you should:</p><blockquote><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository. b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</p></blockquote></li><li></li></ol><pre><code>By default, this configuration uses the ARM EABI toolchain

:   for Windows and builds under Cygwin (or probably MSYS). That can
    easily be reconfigured, of course.

    CONFIG\\_HOST\\_WINDOWS=y : Builds under Windows
    CONFIG\\_WINDOWS\\_CYGWIN=y : Using Cygwin
    CONFIG\\_ARM\\_TOOLCHAIN\\_GNU\\_EABI=y : GNU EABI toolchain for
    Windows
</code></pre><ol start="3"><li></li></ol><pre><code>This configuration does have UART2 output enabled and set up as

:   the system logging device:

    CONFIG\\_SYSLOG\\_CHAR=y : Use a character device for system
    logging CONFIG\\_SYSLOG\\_DEVPATH=\\&quot;/dev/ttyS0\\&quot; : UART2 will be
    /dev/ttyS0

    However, there is nothing to generate SYSLOG output in the
    default configuration so nothing should appear on UART2 unless
    you enable some debug output or enable the USB monitor.
</code></pre><ol start="4"><li><p>Enabling USB monitor SYSLOG output. If tracing is enabled, the USB device will save encoded trace output in in-memory buffer; if the USB monitor is enabled, that trace buffer will be periodically emptied and dumped to the system logging device (UART2 in this configuration):</p><pre><code>CONFIG_USBDEV_TRACE=y                   : Enable USB trace feature
CONFIG_USBDEV_TRACE_NRECORDS=128        : Buffer 128 records in memory
CONFIG_NSH_USBDEV_TRACE=n               : No builtin tracing from NSH
CONFIG_NSH_ARCHINIT=y                   : Automatically start the USB monitor
CONFIG_USBMONITOR=y              : Enable the USB monitor daemon
CONFIG_USBMONITOR_STACKSIZE=2048 : USB monitor daemon stack size
CONFIG_USBMONITOR_PRIORITY=50    : USB monitor daemon priority
CONFIG_USBMONITOR_INTERVAL=2     : Dump trace data every 2 seconds

CONFIG_USBMONITOR_TRACEINIT=y    : Enable TRACE output
CONFIG_USBMONITOR_TRACECLASS=y
CONFIG_USBMONITOR_TRACETRANSFERS=y
CONFIG_USBMONITOR_TRACECONTROLLER=y
CONFIG_USBMONITOR_TRACEINTERRUPTS=y
</code></pre></li><li><p>By default, this project assumes that you are <em>NOT</em> using the DFU bootloader.</p></li></ol><h3 id="using-the-prolifics-pl2303-emulation" tabindex="-1">Using the Prolifics PL2303 Emulation <a class="header-anchor" href="#using-the-prolifics-pl2303-emulation" aria-label="Permalink to &quot;Using the Prolifics PL2303 Emulation&quot;">​</a></h3><p>You could also use the non-standard PL2303 serial device instead of the standard CDC/ACM serial device by changing:</p><pre><code>CONFIG_CDCACM=y               : Disable the CDC/ACM serial device class
CONFIG_CDCACM_CONSOLE=y       : The CDC/ACM serial device is NOT the console
CONFIG_PL2303=y               : The Prolifics PL2303 emulation is enabled
CONFIG_PL2303_CONSOLE=y       : The PL2303 serial device is the console
</code></pre><h3 id="veml6070" tabindex="-1">veml6070 <a class="header-anchor" href="#veml6070" aria-label="Permalink to &quot;veml6070&quot;">​</a></h3><p>This is a config example to use the Vishay VEML6070 UV-A sensor. To use this sensor you need to connect PB6 (I2C1 CLK) to SCL; PB7 (I2C1 SDA) to SDA of sensor module. I used a GY-VEML6070 module to test this driver.</p>`,122)]))}const m=t(a,[["render",r]]);export{c as __pageData,m as default};
