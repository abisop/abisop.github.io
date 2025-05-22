import{_ as o,c as t,al as n,o as i}from"./chunks/framework.NFAqBSgQ.js";const p=JSON.parse('{"title":"ST Nucleo F767ZI","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/stm32f7/boards/nucleo-f767zi/index.md","filePath":"en/platforms/arm/stm32f7/boards/nucleo-f767zi/index.md"}'),a={name:"en/platforms/arm/stm32f7/boards/nucleo-f767zi/index.md"};function r(s,e,l,c,u,h){return i(),t("div",null,e[0]||(e[0]=[n(`<h1 id="st-nucleo-f767zi" tabindex="-1">ST Nucleo F767ZI <a class="header-anchor" href="#st-nucleo-f767zi" aria-label="Permalink to &quot;ST Nucleo F767ZI&quot;">​</a></h1><p>chip:stm32, chip:stm32f7, chip:stm32f767</p><p>This page discusses issues unique to NuttX configurations for the STMicro Nucleo-144 board. See ST document STM32 Nucleo-144 boards (UM1974):</p><p><a href="https://www.st.com/resource/en/user_manual/dm00244518.pdf" target="_blank" rel="noreferrer">https://www.st.com/resource/en/user_manual/dm00244518.pdf</a></p><h2 id="board-features" tabindex="-1">Board Features <a class="header-anchor" href="#board-features" aria-label="Permalink to &quot;Board Features&quot;">​</a></h2><ul><li>Peripherals: 8 leds, 2 push button (3 LEDs, 1 button) under software control</li><li>Debug: STLINK/V2-1 debugger/programmer Uses a STM32F103CB to provide a ST-Link for programming, debug similar to the OpenOcd FTDI function - USB to JTAG front-end.</li><li>Expansion I/F: ST Zio and Extended Arduino and Morpho Headers</li></ul><p>ST Nucleo F7467ZI board from ST Micro is supported. See</p><p><a href="http://www.st.com/content/st_com/en/products/evaluation-tools/product-evaluation-tools/mcu-eval-tools/stm32-mcu-eval-tools/stm32-mcu-nucleo/nucleo-f767zi.html" target="_blank" rel="noreferrer">http://www.st.com/content/st_com/en/products/evaluation-tools/product-evaluation-tools/mcu-eval-tools/stm32-mcu-eval-tools/stm32-mcu-nucleo/nucleo-f767zi.html</a></p><p>The Nucleo F767ZI order part number is NUCLEO-F767ZI. It is one member of the STM32 Nucleo-144 board family.</p><h2 id="nucleo-f767zi-features" tabindex="-1">NUCLEO-F767ZI Features <a class="header-anchor" href="#nucleo-f767zi-features" aria-label="Permalink to &quot;NUCLEO-F767ZI Features&quot;">​</a></h2><ul><li>Microprocessor: STM32F767ZIT6 Core: ARM 32-bit Cortex®-M7 CPU with DPFPU, L1-cache: 16KB data cache and 16KB instruction cache, up to 216 MHz, MPU, and DSP instructions.</li><li>Memory: 2048 KB Flash 512KB of SRAM (including 128KB of data TCM RAM) <ul><li>16KB of instruction TCM RAM + 4KB of backup SRAM</li></ul></li><li>ADC: 3×12-bit, 2.4 MSPS ADC: up to 24 channels and 7.2 MSPS in triple interleaved mode</li><li>DMA: 2 X 16-stream DMA controllers with FIFOs and burst support</li><li>Timers: Up to 18 timers: up to thirteen 16-bit (1x 16-bit low power), two 32-bit timers, 2x watchdogs, SysTick</li><li>GPIO: 114 I/O ports with interrupt capability</li><li>LCD: LCD-TFT Controller with (DMA2D), Parallel interface</li><li>I2C: 4 × I2C interfaces (SMBus/PMBus)</li><li>U[S]ARTs: 4 USARTs, 4 UARTs (27 Mbit/s, ISO7816 interface, LIN, IrDA, modem control)</li><li>SPI/12Ss: 6/3 (simplex) (up to 50 Mbit/s), 3 with muxed simplex I2S for audio class accuracy via internal audio PLL or external clock</li><li>QSPI: Dual mode Quad-SPI</li><li>SAIs: 2 Serial Audio Interfaces</li><li>CAN: 3 X CAN interface</li><li>SDMMC interface</li><li>SPDIFRX interface</li><li>USB: USB 2.0 full/High-speed device/host/OTG controller with on-chip PHY</li><li>10/100 Ethernet: MAC with dedicated DMA: supports IEEE 1588v2 hardware, MII/RMII</li><li>Camera Interface: 8/14 Bit</li><li>CRC calculation unit</li><li>TRG: True random number generator</li><li>RTC subsecond accuracy, hardware calendar</li></ul><p>For pinout and details Check NUCLEO-F767ZI page on developer.mbed.org: <a href="https://os.mbed.com/platforms/ST-Nucleo-F767ZI/" target="_blank" rel="noreferrer">https://os.mbed.com/platforms/ST-Nucleo-F767ZI/</a></p><p>Also <a href="https://developer.mbed.org/platforms/ST-Nucleo-F746ZG" target="_blank" rel="noreferrer">https://developer.mbed.org/platforms/ST-Nucleo-F746ZG</a> may contain some related useful information.</p><h3 id="hardware" tabindex="-1">Hardware <a class="header-anchor" href="#hardware" aria-label="Permalink to &quot;Hardware&quot;">​</a></h3><p>GPIO - there are 144 I/O lines on the STM32F7xxZxT6 with various pins pined out on the Nucleo 144.</p><p>See <a href="https://developer.mbed.org/platforms/ST-Nucleo-F746ZG/" target="_blank" rel="noreferrer">https://developer.mbed.org/platforms/ST-Nucleo-F746ZG/</a> for slick graphic pinouts.</p><p>Keep in mind that:</p><ul><li>The I/O is 3.3 Volt not 5 Volt like on the Arduino products.</li><li>The Nucleo-144 board family has 3 pages of Solder Bridges AKA Solder Blobs (SB) that can alter the factory configuration. We will note SB in effect but will assume the factory default settings.</li></ul><p>Our main concern is establishing a console and LED utilization for debugging. Because so many pins can be multiplexed with so many functions, the above mentioned graphic may be helpful in identifying a serial port.</p><p>There are 5 choices that can be made from the menuconfig:</p><pre><code>CONFIG_NUCLEO_CONSOLE_ARDUINO or CONFIG_NUCLEO_CONSOLE_MORPHO or
CONFIG_NUCLEO_CONSOLE_MORPHO_UART4 or CONFIG_NUCLEO_CONSOLE_VIRTUAL or
CONFIG_NUCLEO_CONSOLE_NONE
</code></pre><p>The CONFIG_NUCLEO_CONSOLE_NONE makes no preset for the console. You should still visit the U[S]ART selection and Device Drivers to disable any U[S]ART remaining.</p><p>The CONFIG_NUCLEO_CONSOLE_ARDUINO configurations assume that you are using a standard Arduino RS-232 shield with the serial interface with RX on pin D0 and TX on pin D1 from USART6:</p><pre><code>-------- ---------------
            STM32F7
ARDUIONO FUNCTION  GPIO
-- ----- --------- -----
DO RX    USART6_RX PG9
D1 TX    USART6_TX PG14
-- ----- --------- -----
</code></pre><p>The CONFIG_NUCLEO_CONSOLE_MORPHO configurations uses Serial Port 8 (USART8) with TX on PE1 and RX on PE0.:</p><pre><code>Serial
------
SERIAL_RX         PE_0
SERIAL_TX         PE_1
</code></pre><p>The CONFIG_NUCLEO_CONSOLE_MORPHO_UART4 configurations uses Serial Port 4 (UART4) with TX on PA1 and RX on PA0. Zero Ohm resistor / solder short at SB13 must be removed/open. (Disables Ethernet MII clocking.):</p><pre><code>Serial
------
SERIAL_RX         PA_1  CN11 30
SERIAL_TX         PA_0  CN11 28
</code></pre><p>The CONFIG_NUCLEO_CONSOLE_VIRTUAL configurations uses Serial Port 3 (USART3) with TX on PD8 and RX on PD9.:</p><pre><code>Serial
------
SERIAL_RX         PD9
SERIAL_TX         PD8
</code></pre><p>These signals are internally connected to the on board ST-Link.</p><p>Of course if your design has used those pins you can choose a completely different U[S]ART to use as the console. In that Case, you will need to edit the include/board.h to select different U[S]ART and / or pin selections.</p><h2 id="buttons" tabindex="-1">Buttons <a class="header-anchor" href="#buttons" aria-label="Permalink to &quot;Buttons&quot;">​</a></h2><p>B1 USER: the user button is connected to the I/O PC13 (Tamper support, SB173 ON and SB180 OFF)</p><h2 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h2><p>The Board provides a 3 user LEDs, LD1-LD3:</p><pre><code>LED1 (Green)      PB_0  (SB120 ON and SB119 OFF)
LED2 (Blue)       PB_7  (SB139 ON)
LED3 (Red)        PB_14 (SP118 ON)
</code></pre><ul><li>When the I/O is HIGH value, the LEDs are on.</li><li>When the I/O is LOW, the LEDs are off.</li></ul><p>These LEDs are not used by the board port unless CONFIG_ARCH_LEDS is defined. In that case, the usage by the board port is defined in include/board.h and src/stm32_autoleds.c. The LEDs are used to encode OS related events as follows when the LEDs are available:</p><blockquote><p>SYMBOL Meaning RED GREEN BLUE</p><hr><p>LED_STARTED NuttX has been started OFF OFF OFF LED_HEAPALLOCATE Heap has been allocated OFF OFF ON LED_IRQSENABLED Interrupts enabled OFF ON OFF LED_STACKCREATED Idle stack created OFF ON ON LED_INIRQ In an interrupt NC NC ON (momentary) LED_SIGNAL In a signal handler NC ON OFF (momentary) LED_ASSERTION An assertion failed ON NC ON (momentary) LED_PANIC The system has crashed ON OFF OFF (flashing 2Hz) LED_IDLE MCU is is sleep mode ON OFF OFF</p></blockquote><p>OFF - means that the OS is still initializing. Initialization is very fast</p><p>: so if you see this at all, it probably means that the system is hanging up somewhere in the initialization phases.</p><p>GREEN - This means that the OS completed initialization.</p><p>BLUE - Whenever and interrupt or signal handler is entered, the BLUE LED is</p><p>: illuminated and extinguished when the interrupt or signal handler exits.</p><p>VIOLET - If a recovered assertion occurs, the RED and blue LED will be</p><p>: illuminated briefly while the assertion is handled. You will probably never see this.</p><p>Flashing RED - In the event of a fatal crash, all other LEDs will be</p><p>: extinguished and RED LED will FLASH at a 2Hz rate.</p><pre><code>Thus if the GREEN LED is lit, NuttX has successfully booted and is,
apparently, running normally. If the RED LED is flashing at
approximately 2Hz, then a fatal error has been detected and the
system has halted.
</code></pre><h3 id="serial-consoles" tabindex="-1">Serial Consoles <a class="header-anchor" href="#serial-consoles" aria-label="Permalink to &quot;Serial Consoles&quot;">​</a></h3><h2 id="usart6-config-nucleo-console-arduino" tabindex="-1">USART6 (CONFIG_NUCLEO_CONSOLE_ARDUINO) <a class="header-anchor" href="#usart6-config-nucleo-console-arduino" aria-label="Permalink to &quot;USART6 (CONFIG\\_NUCLEO\\_CONSOLE\\_ARDUINO)&quot;">​</a></h2><blockquote><p>ARDUINO FUNCTION GPIO</p><hr><p>DO RX USART6_RX PG9 D1 TX USART6_TX PG14</p></blockquote><p>You must use a 3.3 TTL to RS-232 converter or a USB to 3.3V TTL</p><pre><code>Nucleo 144           FTDI TTL-232R-3V3
-------------       -------------------
TXD - D1-TXD   -    RXD - Pin 5 (Yellow)
RXD - D0-RXD   -    TXD - Pin 4 (Orange)
GND   GND      -    GND   Pin 1  (Black)
-------------       -------------------

*Note you will be reverse RX/TX
</code></pre><p>Use make menuconfig to configure USART6 as the console:</p><pre><code>CONFIG_STM32F7_USART6=y
CONFIG_USARTs_SERIALDRIVER=y
CONFIG_USARTS_SERIAL_CONSOLE=y
CONFIG_USART6_RXBUFSIZE=256
CONFIG_USART6_TXBUFSIZE=256
CONFIG_USART6_BAUD=115200
CONFIG_USART6_BITS=8
CONFIG_USART6_PARITY=0
CONFIG_USART6_2STOP=0
</code></pre><h2 id="usart8-config-nucleo-console-morpho" tabindex="-1">USART8 (CONFIG_NUCLEO_CONSOLE_MORPHO) <a class="header-anchor" href="#usart8-config-nucleo-console-morpho" aria-label="Permalink to &quot;USART8 (CONFIG\\_NUCLEO\\_CONSOLE\\_MORPHO)&quot;">​</a></h2><p>Pins and Connectors:</p><pre><code>FUNC GPIO  Connector
               Pin NAME
---- ---   ------- ----
TXD: PE1   CN11-61, PE1
RXD: PE0   CN12-64, PE0
           CN10-33, D34
---- ---   ------- ----
</code></pre><p>You must use a 3.3 TTL to RS-232 converter or a USB to 3.3V TTL:</p><pre><code>Nucleo 144           FTDI TTL-232R-3V3
-------------       -------------------
TXD - CN11-61   -   RXD - Pin 5 (Yellow)
RXD - CN12-64   -   TXD - Pin 4 (Orange)
GND   CN12-63   -   GND   Pin 1  (Black)
-------------       -------------------

*Note you will be reverse RX/TX
</code></pre><p>Use make menuconfig to configure USART8 as the console:</p><pre><code>CONFIG_STM32F7_UART8=y
CONFIG_UART8_SERIALDRIVER=y
CONFIG_UART8_SERIAL_CONSOLE=y
CONFIG_UART8_RXBUFSIZE=256
CONFIG_UART8_TXBUFSIZE=256
CONFIG_UART8_BAUD=115200
CONFIG_UART8_BITS=8
CONFIG_UART8_PARITY=0
CONFIG_UART8_2STOP=0
</code></pre><h2 id="virtual-com-port-config-nucleo-console-virtual" tabindex="-1">Virtual COM Port (CONFIG_NUCLEO_CONSOLE_VIRTUAL) <a class="header-anchor" href="#virtual-com-port-config-nucleo-console-virtual" aria-label="Permalink to &quot;Virtual COM Port (CONFIG\\_NUCLEO\\_CONSOLE\\_VIRTUAL)&quot;">​</a></h2><p>Yet another option is to use USART3 and the USB virtual COM port. This option may be more convenient for long term development, but is painful to use during board bring-up.</p><p>Solder Bridges. This configuration requires:</p><pre><code>PD8 USART3 TX SB5 ON and SB7 OFF (Default)
PD9 USART3 RX SB6 ON and SB4 OFF (Default)
</code></pre><p>Configuring USART3 is the same as given above but add the S and #3.</p><p>Question: What BAUD should be configure to interface with the Virtual COM port? 115200 8N1?</p><p>Default:</p><p>As shipped, SB4 and SB7 are open and SB5 and SB6 closed, so the virtual COM port is enabled.</p><h2 id="spi" tabindex="-1">SPI <a class="header-anchor" href="#spi" aria-label="Permalink to &quot;SPI&quot;">​</a></h2><p>Since this board is so generic, having a quick way to set the SPI configuration seams in order. So the board provides a quick test that can be selected vi CONFIG_NUCLEO_SPI_TEST that will initialize the selected buses (SPI1-SPI3) and send some text on the bus at application initialization time board_app_initialize.</p><h2 id="sdio" tabindex="-1">SDIO <a class="header-anchor" href="#sdio" aria-label="Permalink to &quot;SDIO&quot;">​</a></h2><p>To test the SD performance one can use a SparkFun microSD Sniffer from <a href="https://www.sparkfun.com/products/9419" target="_blank" rel="noreferrer">https://www.sparkfun.com/products/9419</a> or similar board and connect it as follows:</p><pre><code>VCC    V3.3 CN11  16
GND    GND  CN11-8
CMD    PD2  CN11-4
CLK    PC12 CN11-3
DAT0 - PC8  CN12-2
DAT1 - PC9  CN12-1
DAT2   PC10 CN11-1
CD     PC11 CN11-2
</code></pre><h3 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h3><h2 id="nsh" tabindex="-1">nsh <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh&quot;">​</a></h2><p>Configures the NuttShell (nsh) located at apps/examples/nsh for the Nucleo-144 boards. The Configuration enables the serial interfaces on USART6. Support for builtin applications is enabled, but in the base configuration no builtin applications are selected (see NOTES below).</p><p>NOTES:</p><ol><li><p>This configuration uses the mconf-based configuration tool. To change this configuration using that tool, you should:</p><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository.</p><p>b. If this is the initial configuration then execute:</p><pre><code>    ./tools/configure.sh nucleo-f767zi:nsh

in nuttx/ in order to start configuration process. Caution:
Doing this step more than once will overwrite .config with the
contents of the nucleo-f767zi/nsh/defconfig file.
</code></pre><p>c. Execute &#39;make oldconfig&#39; in nuttx/ in order to refresh the configuration.</p><p>d. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</p><p>e. Save the .config file to reuse it in the future starting at step d.</p></li><li><p>By default, this configuration uses the ARM GNU toolchain for Linux. That can easily be reconfigured, of course.:</p><pre><code>CONFIG_HOST_LINUX=y                     : Builds under Linux
CONFIG_ARM_TOOLCHAIN_GNU_EABI=y      : ARM GNU for Linux
</code></pre></li><li></li></ol><pre><code>The serial console may be configured to use either USART3 (which would

:   correspond to the Virtual COM port) or with the console device
    configured for USART6 to support an Arduino serial shield (see
    instructions above under \\&quot;Serial Consoles). You will need to
    check the defconfig file to see how the console is set up and,
    perhaps, modify the configuration accordingly.

    To select the Virtual COM port:

        -CONFIG_NUCLEO_CONSOLE_ARDUINO
        +CONFIG_NUCLEO_CONSOLE_VIRTUAL=y
        -CONFIG_USART6_SERIAL_CONSOLE=y
        +CONFIG_USART3_SERIAL_CONSOLE=y

    To select the Arduino serial shield:

        -CONFIG_NUCLEO_CONSOLE_VIRTUAL=y
        +CONFIG_NUCLEO_CONSOLE_ARDUINO
        -CONFIG_USART3_SERIAL_CONSOLE=y
        +CONFIG_USART6_SERIAL_CONSOLE=y

    Default values for other settings associated with the select
    USART should be correct.
</code></pre><h2 id="evalos" tabindex="-1">evalos: <a class="header-anchor" href="#evalos" aria-label="Permalink to &quot;evalos:&quot;">​</a></h2><p>This configuration is designed to test the features of the board.</p><ul><li>Configures the NuttShell (nsh) located at apps/examples/nsh for the Nucleo-144 boards. The console is available on serial interface USART3, which is accessible over the USB ST-Link interface.</li><li>Configures nsh with advanced features such as autocompletion.</li><li>Configures the on-board LEDs to work with the &#39;leds&#39; example app.</li><li>Configures the &#39;helloxx&#39; example app.</li><li>Adds character device for i2c1</li><li>Tries to register mpu60x0 IMU to i2c1</li></ul><p>NOTES:</p><ol><li><p>This configuration uses the mconf-based configuration tool. To change this configuration using that tool, you should:</p><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository.</p><p>b. If this is the initial configuration then execute:</p><pre><code>    ./tools/configure.sh nucleo-f767zi:evalos

in nuttx/ in order to start configuration process. Caution:
Doing this step more than once will overwrite .config with the
contents of the nucleo-f767zi/evalos/defconfig file.
</code></pre><p>c. Execute &#39;make oldconfig&#39; in nuttx/ in order to refresh the configuration.</p><p>d. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</p><p>e. Save the .config file to reuse it in the future starting at step d.</p></li><li><p>By default, this configuration uses the ARM GNU toolchain for Linux. That can easily be reconfigured, of course.:</p><pre><code>CONFIG_HOST_LINUX=y                     : Builds under Linux
CONFIG_ARM_TOOLCHAIN_GNU_EABI=y      : ARM GNU for Linux
</code></pre></li></ol>`,88)]))}const f=o(a,[["render",r]]);export{p as __pageData,f as default};
