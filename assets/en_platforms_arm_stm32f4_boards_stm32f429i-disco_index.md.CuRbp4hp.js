import{_ as n,c as t,al as o,o as a}from"./chunks/framework.NFAqBSgQ.js";const c=JSON.parse('{"title":"ST STM32F429I-DISCO","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/stm32f4/boards/stm32f429i-disco/index.md","filePath":"en/platforms/arm/stm32f4/boards/stm32f429i-disco/index.md"}'),i={name:"en/platforms/arm/stm32f4/boards/stm32f429i-disco/index.md"};function s(r,e,l,d,h,p){return a(),t("div",null,e[0]||(e[0]=[o(`<h1 id="st-stm32f429i-disco" tabindex="-1">ST STM32F429I-DISCO <a class="header-anchor" href="#st-stm32f429i-disco" aria-label="Permalink to &quot;ST STM32F429I-DISCO&quot;">​</a></h1><p>chip:stm32, chip:stm32f4, chip:stm32f429</p><p>This page discusses issues unique to NuttX configurations for the STMicro STM32F429I-DISCO development board featuring the STM32F429ZIT6 MCU. The STM32F429ZIT6 is a 180MHz Cortex-M4 operation with 2Mbit Flash memory and 256kbytes. The board features:</p><ul><li>On-board ST-LINK/V2 for programming and debugging,</li><li>On-board 64 Mbits (8 Mbytes) External SDRAM (1 Mbit x 16-bit x 4-bank)</li><li>L3GD20, ST MEMS motion sensor, 3-axis digital output gyroscope,</li><li>TFT 2.4&quot; LCD, 262K color RGB, 240 x 320 pixels</li><li>Touchscreen controller</li><li>Two user LEDs and two push-buttons,</li><li>USB OTG FS with micro-AB connector, and</li><li>Easy access to most MCU pins.</li></ul><p>NOTE: Includes basic NSH command support with full 8MByte SDRAM + the</p><p>: internal 256K. Unsupported are the LCD and USB interfaces.</p><pre><code>The board pin configuration to support on-board SDRAM and LCD
prevents use of the OTG FS module which is normally used for USB NSH
sessions. Instead, the board routes the OTG HS pins to the USB OTG
connector.

The NSH configuration / testing that has been done so far was
performed by connecting an external RS-232 line driver to pins PA9
(TX) and PA10 (RX) and configuring USART1 as the NSH console.
</code></pre><p>Refer to the <a href="http://www.st.com" target="_blank" rel="noreferrer">http://www.st.com</a> website for further information about this board (search keyword: 429i-disco)</p><p>NOTE: This port was based on the original discovery kit, STM32F429I-DISCO. That board has been superseded by the new STM32F429I-DISC1.</p><h2 id="setup-and-programming-flash" tabindex="-1">Setup and Programming Flash <a class="header-anchor" href="#setup-and-programming-flash" aria-label="Permalink to &quot;Setup and Programming Flash&quot;">​</a></h2><p>I use a USB cable to power and program it. And I use a USB/Serial connected to pins PA9 and PA10 for the serial console (See the section &quot;UARTs&quot; below).</p><p>FLASH may be programmed:</p><ul><li><p>Via USB using STM32 ST-Link Utility</p></li><li><p>Via USB using OpenOCD. This command may be used to flash the firmware using OpenOCD:</p><pre><code> sudo openocd -f interface/stlink-v2.cfg -f target/stm32f4x.cfg -c init -c &quot;reset halt&quot; -c &quot;flash write_image erase nuttx.bin 0x08000000&quot;
</code></pre></li><li><p>Via JTAG/SWD connected to the SWD connector CN2.</p><p>CN4 Jumpers. Remove jumpers to enable signals at SWD connector CN2.:</p><pre><code>SWD 6-Pin STM32F429i-Discovery Connector CN2
Pin   Signal Name       Description
----- ------ ---------- ------------------------------
Pin 1 AIN_1  VDD_TARGET VDD from application
Pin 2 T_JCLK SWCLK      SWD Clock
Pin 3 GND    GND        Ground
Pin 4 T_JTMS SWDIO      SWD data input/output
Pin 5 T_NRST NRST       Reset of target MCU
Pin 6 T_SWO  SWO        Reserved

SWD 20-pin J-Link Connector
Pin    Name      Type   Description
------ --------- ------ ------------------------------
Pin  1 VTref     Input  Target reference voltage
Pin  2 Vsupply   NC     Not connected in J-Link
Pin  3 Not used  NC     Not used in J-Link
Pin  5 Not used  NC     Not used in J-Link
Pin  7 SWDIO     I/O    Bi-directional data pin
Pin  9 SWCLK     Output Clock signal to target CPU
Pin 11 Not used  NC     Not used in J-Link
Pin 13 SWO       Output Serial wire output trace port
Pin 15 RESET     I/O    Target CPU reset signal (nRST)
Pin 17 Not used  NC     Not connected in J-Link
Pin 19 5V-Supply Output Supplies power to some boards.

Pins 4, 45, 8, 10, 12, 14, 16, 18 and 20 are GND pins in J-Link.  They
should also be connected to ground in the target system.
</code></pre></li></ul><h2 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h2><p>The STM32F429I-DISCO board has two user LEDs; green, and red on the board. These LEDs are not used by the board port unless CONFIG_ARCH_LEDS is defined. In that case, the usage by the board port is defined in include/board.h and src/up_leds.c. The LEDs are used to encode OS-related events as follows:</p><pre><code>SYMBOL                Meaning                 LED1*    LED2
                                              green    red
-------------------  -----------------------  -------  -------
LED_STARTED          NuttX has been started   ON       OFF
LED_HEAPALLOCATE     Heap has been allocated  OFF      ON
LED_IRQSENABLED      Interrupts enabled       ON       ON
LED_STACKCREATED     Idle stack created       OFF      ON
LED_INIRQ            In an interrupt**        ON       ON
LED_SIGNAL           In a signal handler      N/C      ON
LED_ASSERTION        An assertion failed      ON       ON
LED_PANIC            The system has crashed   ON       BLINK
LED_IDLE             STM32 is is sleep mode   (Optional, not used)

* In normal mode, LED1 will be on and LED2 might flicker a bit as IRQs
  and SIGNALS are processed.
* If LED1 is on and LED2 is blinking, then NuttX probably failed to boot
  or is in a PANIC condition.
</code></pre><h2 id="uarts" tabindex="-1">UARTs <a class="header-anchor" href="#uarts" aria-label="Permalink to &quot;UARTs&quot;">​</a></h2><p>On the STM32F429I-DISCO board, because of pin mappings to support the onboard SDRAM and LCD, the only UARTs that have both RX and TX pins available are USART1 and UART5. Other USARTS could be used for RX or TX only, or they could be used for full-duplex if the other pin functions aren&#39;t being used (i.e. LCD or SDRAM).</p><h3 id="uart-usart-pins" tabindex="-1">UART/USART PINS <a class="header-anchor" href="#uart-usart-pins" aria-label="Permalink to &quot;UART/USART PINS&quot;">​</a></h3><h3 id="default-serial-console" tabindex="-1">Default Serial Console <a class="header-anchor" href="#default-serial-console" aria-label="Permalink to &quot;Default Serial Console&quot;">​</a></h3><p>USART1 is enabled as the serial console in all configurations (see */defconfig). USART1 RX and TX are configured on pins PA10 and PA9, respectively (see include/board.h).:</p><pre><code>Header 32X2 P1
--------------
Pin 1  5V
Pin 51 PA10
Pin 52 PA9
Pin 63 GND
</code></pre><p>If solder bridges SB11 and SB12 are closed, then USART1 will be connected to the ST-Link and should be available over USB as a virtual COM interface.</p><h2 id="timer-inputs-outputs" tabindex="-1">Timer Inputs/Outputs <a class="header-anchor" href="#timer-inputs-outputs" aria-label="Permalink to &quot;Timer Inputs/Outputs&quot;">​</a></h2><p>::</p><p>:</p><pre><code>TIM1

:   CH1 PA8\\[1\\], PE9\\[1\\] CH2 PA9, PE11\\[1\\] CH3 PA10, PE13\\[1\\]
    CH4 PA11\\[1\\], PE14\\[1\\]

TIM2

:   CH1 PA0\\[1\\], PA15\\[1\\], PA5 CH2 PA1\\[1\\], PB3\\[1\\] CH3
    PA2\\[1\\], PB10\\[1\\] CH4 PA3\\[1\\], PB11\\[1\\]

TIM3

:   CH1 PA6\\[1\\], PB4, PC6\\[1\\] CH2 PA7\\[1\\], PB5\\[1\\], PC7\\[1\\] CH3
    PB0\\[1\\], PC8 CH4 PB1\\[1\\], PC9\\[1\\]

TIM4

:   CH1 PB6\\[1\\], PD12\\[1\\] CH2 PB7, PD13\\[1\\] CH3 PB8\\[1\\],
    PD14\\[1\\] CH4 PB9\\[1\\], PD15\\[1\\]

TIM5

:   CH1 PA0\\[1\\], PH10\\[1\\] CH2 PA1\\[1\\], PH11\\[1\\] CH3 PA2\\[1\\],
    PH12\\[1\\] CH4 PA3\\[1\\], PI0\\[2\\]

TIM8

:   CH1 PC6\\[1\\], PI5\\[2\\] CH2 PC7\\[1\\], PI6\\[2\\] CH3 PC8, PI7\\[2\\]
    CH4 PC9\\[1\\], PI2\\[2\\]

TIM9

:   CH1 PA2\\[1\\], PE5 CH2 PA3\\[1\\], PE6

TIM10

:   CH1 PB8\\[1\\], PF6

TIM11

:   CH1 PB9\\[1\\], PF7\\[1\\]

TIM12

:   CH1 PH6\\[1\\], PB14\\[1\\] CH2 PC15\\[1\\], PH9\\[1\\]

TIM13

:   CH1 PA6\\[1\\], PF8\\[1\\]

TIM14

:   CH1 PA7\\[1\\], PF9\\[1\\]

\\[1\\] Indicates pins that have other on-board functions and should
be used only with care (See table 6 in the STM32F429I-DISCO User
Guide). The rest are free I/O pins (This need to be updated. They
are incorrect!) \\[2\\] Port I pins are not supported by the MCU
</code></pre><h2 id="fmc-sdram" tabindex="-1">FMC SDRAM <a class="header-anchor" href="#fmc-sdram" aria-label="Permalink to &quot;FMC SDRAM&quot;">​</a></h2><h3 id="on-board-sdram" tabindex="-1">On-board SDRAM <a class="header-anchor" href="#on-board-sdram" aria-label="Permalink to &quot;On-board SDRAM&quot;">​</a></h3><p>The STM32F429I-DISCO has 8 MBytes on-board SDRAM connected to the MCU&#39;s SDRAM Bank 2 connections (Bank 6 of the FMC). This means the 8 MiB (when enabled) is mapped to address 0xD0000000-0xD07FFFFF. The port for the STM32F429I-DISCO board includes support for using the onboard 8M SDRAM.</p><h3 id="configuration-options" tabindex="-1">Configuration Options <a class="header-anchor" href="#configuration-options" aria-label="Permalink to &quot;Configuration Options&quot;">​</a></h3><p>Internal SRAM is available in all members of the STM32 family. The F4 family also contains internal CCM SRAM. This SRAM is different because it cannot be used for DMA. So if DMA needed, then the following should be defined to exclude CCM SRAM from the heap:</p><pre><code>CONFIG_STM32_CCMEXCLUDE    : Exclude CCM SRAM from the HEAP
</code></pre><p>In addition to internal SRAM, SRAM may also be available through the FMC. In order to use FMC SDRAM, the following additional things need to be present in the NuttX configuration file:</p><pre><code>CONFIG_STM32_FMC=y          : Enables the FMC and the 8MiB SDRAM
CONFIG_STM32_EXTERNAL_RAM=y : Indicates that RAM is available via the
                              FMC (as opposed to an LCD or FLASH).
CONFIG_HEAP2_BASE           : The base address of the RAM in the FMC
                              address space.  This should be 0xD0000000.
CONFIG_HEAP2_SIZE           : The size of the RAM in the FMC
                              address space.  This should be 8388608.
CONFIG_MM_REGIONS           : Must be set to a large enough value to
                              include the FMC SDRAM (1, 2 or 3 depending
                              if the CCM RAM and/or FMC SDRAM are enabled).
</code></pre><h3 id="sram-configurations" tabindex="-1">SRAM Configurations <a class="header-anchor" href="#sram-configurations" aria-label="Permalink to &quot;SRAM Configurations&quot;">​</a></h3><p>There are 4 possible SRAM configurations:</p><pre><code>Configuration 1. System SRAM (only)
                 CONFIG_MM_REGIONS == 1
                 CONFIG_STM32_EXTERNAL_RAM NOT defined
                 CONFIG_STM32_CCMEXCLUDE defined
Configuration 2. System SRAM and CCM SRAM
                 CONFIG_MM_REGIONS == 2
                 CONFIG_STM32_EXTERNAL_RAM NOT defined
                 CONFIG_STM32_CCMEXCLUDE NOT defined
Configuration 3. System SRAM and FMC SDRAM
                 CONFIG_MM_REGIONS == 2
                 CONFIG_STM32_EXTERNAL_RAM defined
                 CONFIG_STM32_CCMEXCLUDE defined
Configuration 4. System SRAM, CCM SRAM, and FMC SDRAM
                 CONFIG_MM_REGIONS == 3
                 CONFIG_STM32_EXTERNAL_RAM defined
                 CONFIG_STM32_CCMEXCLUDE NOT defined
</code></pre><h2 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h2><p>Each STM32F429I-DISCO configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh stm32f429i-disco:&lt;subdir&gt;
</code></pre><p>Where &lt;subdir&gt; is one of the following:</p><h3 id="extflash" tabindex="-1">extflash: <a class="header-anchor" href="#extflash" aria-label="Permalink to &quot;extflash:&quot;">​</a></h3><p>This is another NSH example. If differs from other &#39;nsh&#39; configurations in that this configuration defines an external 8 MByte SPI FLASH (the SST25VF064C part from Silicon Storage Technology, Inc.) which must be be connected to the Discovery board&#39;s SPI4 pins on the expansion pins. Additionally, this demo uses UART1 for the console</p><p>NOTES:</p><ol><li><p>This configuration assumes an SST25VF064C 8Mbyte SPI FLASH is connected to SPI4 on the following Discovery board Pins:</p><pre><code>SCK:   Port PE2   Board Connector P1, Pin 15
MOSI:  Port PE6   Board Connector P1, Pin 11
MISO:  Port PE5   Board Connector P1, Pin 14
CS:    Port PE4   Board Connector P1, Pin 13
</code></pre></li><li><p>This configuration does have UART1 output enabled and set up as the system logging device. To use this UART, you must add an external RS-232 line driver to the UART1 pins of the DISCO board on PA9 and PA10 of connector P1.</p></li></ol><h3 id="fb" tabindex="-1">fb <a class="header-anchor" href="#fb" aria-label="Permalink to &quot;fb&quot;">​</a></h3><p>STM32F429I-DISCO LTDC Framebuffer demo example. This is a simple configuration used for some basic (non-graphic) debug of the framebuffer character drivers using apps/examples/fb. It simply opens the framebuffer device and draws concentric rectangles of different colors in the framebuffer:</p><pre><code>nsh&gt; fb
</code></pre><p>Also included is the touchscreen test of apps/examples/touchscreen. This example will simply open the touchscreen driver then collect and display touch inputs:</p><pre><code>nsh&gt; tc 1
tc_main: nsamples: 1
tc_main: Initializing external touchscreen device
tc_main: Opening /dev/input0
Sample     :
   npoints : 1
Point 1    :
        id : 0
     flags : 3c
         x : 2296
         y : 2311
         h : 0
         w : 0
  pressure : 1
Terminating!
nsh&gt;
</code></pre><h3 id="lgvl" tabindex="-1">lgvl <a class="header-anchor" href="#lgvl" aria-label="Permalink to &quot;lgvl&quot;">​</a></h3><p>STM32F429I-DISCO LittlevGL demo example.</p><p>The ltdc is initialized during boot up. Interaction with NSH is via the serial console at 115200 8N1 baud. From the nsh command line execute the lvgldemo example:</p><pre><code>nsh&gt; lvgldemo
</code></pre><p>The test will execute the calibration process and then run the LittlevGL demo project.</p><h3 id="nsh" tabindex="-1">nsh <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh&quot;">​</a></h3><p>Configures the NuttShell (nsh) located at apps/examples/nsh. The Configuration enables the serial interfaces on UART2. Support for builtin applications is enabled, but in the base configuration no builtin applications are selected (see NOTES below).</p><p>NOTES:</p><ol><li><p>This configuration uses the mconf-based configuration tool. To change this configuration using that tool, you should:</p><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository. b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</p></li><li><p>By default, this configuration uses the ARM EABI toolchain for Windows and builds under Cygwin (or probably MSYS). That can easily be reconfigured, of course.:</p><pre><code>CONFIG_HOST_WINDOWS=y                   : Builds under Windows
CONFIG_WINDOWS_CYGWIN=y                 : Using Cygwin
CONFIG_ARM_TOOLCHAIN_GNU_EABI=y      : GNU EABI toolchain for Windows
</code></pre></li><li><p>This example supports the PWM test (apps/examples/pwm) but this must be manually enabled by selecting:</p><pre><code>CONFIG_PWM=y              : Enable the generic PWM infrastructure
CONFIG_STM32_TIM4=y       : Enable TIM4
CONFIG_STM32_TIM4_PWM=y   : Use TIM4 to generate PWM output
</code></pre><p>See also apps/examples/README.txt</p><p>Special PWM-only debug options:</p><pre><code>CONFIG_DEBUG_PWM_INFO
</code></pre></li><li><p>This example supports the Quadrature Encode test (apps/examples/qencoder) but this must be manually enabled by selecting:</p><pre><code>CONFIG_EXAMPLES_QENCODER=y : Enable the apps/examples/qencoder
CONFIG_SENSORS=y           : Enable support for sensors
CONFIG_SENSORS_QENCODER=y          : Enable the generic Quadrature Encoder infrastructure
CONFIG_STM32_TIM8=y        : Enable TIM8
CONFIG_STM32_TIM2=n        : (Or optionally TIM2)
CONFIG_STM32_TIM8_QE=y     : Use TIM8 as the quadrature encoder
CONFIG_STM32_TIM2_QE=y     : (Or optionally TIM2)
</code></pre><p>See also apps/examples/README.txt. Special debug options:</p><pre><code>CONFIG_DEBUG_SENSORS
</code></pre></li><li><p>This example supports the watchdog timer test (apps/examples/watchdog) but this must be manually enabled by selecting:</p><pre><code>CONFIG_EXAMPLES_WATCHDOG=y : Enable the apps/examples/watchdog
CONFIG_WATCHDOG=y          : Enables watchdog timer driver support
CONFIG_STM32_WWDG=y        : Enables the WWDG timer facility, OR
CONFIG_STM32_IWDG=y        : Enables the IWDG timer facility (but not both)
</code></pre><p>The WWDG watchdog is driven off the (fast) 42MHz PCLK1 and, as result, has a maximum timeout value of 49 milliseconds. for WWDG watchdog, you should also add the following to the configuration file:</p><pre><code>CONFIG_EXAMPLES_WATCHDOG_PINGDELAY=20
CONFIG_EXAMPLES_WATCHDOG_TIMEOUT=49
</code></pre><p>The IWDG timer has a range of about 35 seconds and should not be an issue.</p></li><li><p>USB Support (CDC/ACM device):</p><pre><code>CONFIG_STM32_OTGFS=y          : STM32 OTG FS support
CONFIG_USBDEV=y               : USB device support must be enabled
CONFIG_CDCACM=y               : The CDC/ACM driver must be built
CONFIG_NSH_BUILTIN_APPS=y     : NSH built-in application support must be enabled
CONFIG_NSH_ARCHINIT=y         : To perform USB initialization
</code></pre></li><li><p>Using the USB console.</p><p>The STM32F429I-DISCO NSH configuration can be set up to use a USB CDC/ACM (or PL2303) USB console. The normal way that you would configure the the USB console would be to change the .config file like this:</p><pre><code>CONFIG_STM32_OTGFS=y           : STM32 OTG FS support
CONFIG_USART2_SERIAL_CONSOLE=n : Disable the USART2 console
CONFIG_DEV_CONSOLE=n           : Inhibit use of /dev/console by other logic
CONFIG_USBDEV=y                : USB device support must be enabled
CONFIG_CDCACM=y                : The CDC/ACM driver must be built
CONFIG_CDCACM_CONSOLE=y        : Enable the CDC/ACM USB console.
</code></pre><p>NOTE: When you first start the USB console, you have hit ENTER a few times before NSH starts. The logic does this to prevent sending USB data before there is anything on the host side listening for USB serial input.</p></li><li><p>Here is an alternative USB console configuration. The following configuration will also create a NSH USB console but this version will use /dev/console. Instead, it will use the normal /dev/ttyACM0 USB serial device for the console:</p><pre><code>CONFIG_STM32_OTGFS=y           : STM32 OTG FS support
CONFIG_USART2_SERIAL_CONSOLE=y : Keep the USART2 console
CONFIG_DEV_CONSOLE=y           : /dev/console exists (but NSH won&#39;t use it)
CONFIG_USBDEV=y                : USB device support must be enabled
CONFIG_CDCACM=y                : The CDC/ACM driver must be built
CONFIG_CDCACM_CONSOLE=n        : Don&#39;t use the CDC/ACM USB console.
CONFIG_NSH_USBCONSOLE=y        : Instead use some other USB device for the console
</code></pre><p>The particular USB device that is used is:</p><pre><code>CONFIG_NSH_USBCONDEV=&quot;/dev/ttyACM0&quot;
</code></pre><p>The advantage of this configuration is only that it is easier to bet working. This alternative does has some side effects:</p><ul><li>When any other device other than /dev/console is used for a user interface, linefeeds (n) will not be expanded to carriage return / linefeeds (rn). You will need to set your terminal program to account for this.</li><li>/dev/console still exists and still refers to the serial port. So you can still use certain kinds of debug output (see include/debug.h, all debug output from interrupt handlers will be lost.</li><li>But don&#39;t enable USB debug output! Since USB is console is used for USB debug output and you are using a USB console, there will be infinite loops and deadlocks: Debug output generates USB debug output which generatates USB debug output, etc. If you want USB debug output, you should consider enabling USB trace (CONFIG_USBDEV_TRACE) and perhaps the USB monitor (CONFIG_USBMONITOR).</li></ul><p>See the usbnsh configuration below for more information on configuring USB trace output and the USB monitor.</p></li><li><p>USB OTG FS Host Support. The following changes will enable support for a USB host on the STM32F429I-DISCO, including support for a mass storage class driver:</p><p>Device Drivers -&gt; CONFIG_USBDEV=n : Make sure the USB device support is disabled CONFIG_USBHOST=y : Enable USB host support CONFIG_USBHOST_ISOC_DISABLE=y</p><p>Device Drivers -&gt; USB Host Driver Support CONFIG_USBHOST_MSC=y : Enable the mass storage class</p><p>System Type -&gt; STM32 Peripheral Support CONFIG_STM32_OTGHS=y : Enable the STM32 USB OTG FH block (FS mode) CONFIG_STM32_SYSCFG=y : Needed for all USB OTF HS support</p><p>RTOS Features -&gt; Work Queue Support CONFIG_SCHED_WORKQUEUE=y : High priority worker thread support is required CONFIG_SCHED_HPWORK=y : for the mass storage class driver.</p><p>File Systems -&gt; CONFIG_FS_FAT=y : Needed by the USB host mass storage class.</p><p>Board Selection -&gt; CONFIG_BOARDCTL=y : Needed for CONFIG_NSH_ARCHINIT</p><p>Application Configuration -&gt; NSH Library CONFIG_NSH_ARCHINIT=y : Architecture specific USB initialization : is needed for NSH</p><p>With those changes, you can use NSH with a FLASH pen driver as shown belong. Here NSH is started with nothing in the USB host slot:</p><p>NuttShell (NSH) NuttX-x.yy nsh&gt; ls /dev /dev: console null ttyS0</p><p>After inserting the FLASH drive, the /dev/sda appears and can be mounted like this:</p><p>nsh&gt; ls /dev /dev: console null sda ttyS0 nsh&gt; mount -t vfat /dev/sda /mnt/stuff nsh&gt; ls /mnt/stuff /mnt/stuff: -rw-rw-rw- 16236 filea.c</p><p>And files on the FLASH can be manipulated to standard interfaces:</p><p>nsh&gt; echo &quot;This is a test&quot; &gt;/mnt/stuff/atest.txt nsh&gt; ls /mnt/stuff /mnt/stuff: -rw-rw-rw- 16236 filea.c -rw-rw-rw- 16 atest.txt nsh&gt; cat /mnt/stuff/atest.txt This is a test nsh&gt; cp /mnt/stuff/filea.c fileb.c nsh&gt; ls /mnt/stuff /mnt/stuff: -rw-rw-rw- 16236 filea.c -rw-rw-rw- 16 atest.txt -rw-rw-rw- 16236 fileb.c</p><p>To prevent data loss, don&#39;t forget to un-mount the FLASH drive before removing it:</p><p>nsh&gt; umount /mnt/stuff</p></li><li><p>I used this configuration to test the USB hub class. I did this testing with the following changes to the configuration (in addition to those listed above for base USB host/mass storage class support):</p><blockquote><p>Drivers -&gt; USB Host Driver Support CONFIG_USBHOST_HUB=y : Enable the hub class CONFIG_USBHOST_ASYNCH=y : Asynchronous I/O supported needed for hubs</p><p>Board Selection -&gt; CONFIG_STM32F429IDISCO_USBHOST_STACKSIZE=2048 (bigger than it needs to be)</p><p>RTOS Features -&gt; Work Queue Support CONFIG_SCHED_LPWORK=y : Low priority queue support is needed CONFIG_SCHED_LPNTHREADS=1 CONFIG_SCHED_LPWORKSTACKSIZE=1024</p></blockquote><p>NOTES:</p></li><li><p>It is necessary to perform work on the low-priority work queue (vs. the high priority work queue) because deferred hub-related work requires some delays and waiting that is not appropriate on the high priority work queue.</p></li><li><p>Stack usage make increase when USB hub support is enabled because the nesting depth of certain USB host class logic can increase.</p><p>STATUS: 2015-04-30 Appears to be fully functional.</p></li></ol><h3 id="nx" tabindex="-1">nx <a class="header-anchor" href="#nx" aria-label="Permalink to &quot;nx&quot;">​</a></h3><p>This a simple test using the graphic example at apps/example/nx. This configuration illustrates the use of the LCD with the lower performance SPI interface.</p><h3 id="nxwm" tabindex="-1">nxwm <a class="header-anchor" href="#nxwm" aria-label="Permalink to &quot;nxwm&quot;">​</a></h3><p>This is a special configuration setup for the NxWM window manager UnitTest.</p><p>NOTES:</p><ol><li><p>The NxWM window manager can be found here:</p><pre><code>apps/graphics/NxWidgets/nxwm
</code></pre><p>The NxWM unit test can be found at:</p><pre><code>apps/graphics/NxWidgets/UnitTests/nxwm
</code></pre></li></ol><p>STATUS: 17-01-08: There are instabilities in this configuration that make it not usable on this platform. While the equivalent configuration works on other platforms, this one does not: The calculator display does not form properly. There are fails in the NxTerm display, usually around the point where the display should scroll up.</p><p>Update: With all optimizations disabled, the issue seems to go away. So this is most likely due to using high levels of optimization with a bleeding edge GCC toolchain.</p><p>17-11-15: The original configuration used the slower SPI LCD interface. The configuration was converted to use the high performance LTDC frame buffer interface. Performance is now excellent and I see none of the instabilities mentioned above even at high levels of optimization.</p><p>The difficulty that I experienced was touching the tiny icons on the menus. The touscreen controller (along with my fat fingers) does not appear to have sufficient precision to work in this way. Larger icons would likely make the interface easier to use.</p><h3 id="usbnsh" tabindex="-1">usbnsh <a class="header-anchor" href="#usbnsh" aria-label="Permalink to &quot;usbnsh&quot;">​</a></h3><p>This is another NSH example. If differs from other &#39;nsh&#39; configurations in that this configurations uses a USB serial device for console I/O. Such a configuration is useful on the stm32f429i-disco which has no builtin RS-232 drivers.</p><p>NOTES:</p><ol><li>This configuration uses the mconf-based configuration tool. To change this configuration using that tool, you should: a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository. b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</li><li>This configuration does have UART1 output enabled and set up as the system logging device. To use this UART, you must add an external RS-232 line driver to the UART1 pins of the DISCO board on PA9 and PA10 of connector P1.</li></ol><h3 id="usbmsc" tabindex="-1">usbmsc <a class="header-anchor" href="#usbmsc" aria-label="Permalink to &quot;usbmsc&quot;">​</a></h3><p>This is an example of enabling the FS OTG port on the DISCO board for mass storage use. It provides an NSH session on UART1 to allow accessing the connected USB mass storage device. Such a configuration is useful on the stm32f429i-disco which has no onboard SD card or mass storage solution.</p><p>NOTES:</p><ol><li><p>This configuration uses UART1 as the system console. To use this UART, you must add an external RS-232 line driver to the UART1 pins of the DISCO board on PA9 and PA10 of connector P1.</p></li><li><p>The mass storage device will appear as /dev/sda and supports FAT formatted &quot;thumb&quot; flash drives with:</p><pre><code>nsh&gt; mount -t vfat /dev/sda /mount_name
</code></pre></li></ol><h2 id="stm32f429i-disco-ltdc-framebuffer-demo-example" tabindex="-1">STM32F429I-DISCO LTDC Framebuffer demo example <a class="header-anchor" href="#stm32f429i-disco-ltdc-framebuffer-demo-example" aria-label="Permalink to &quot;STM32F429I-DISCO LTDC Framebuffer demo example&quot;">​</a></h2><p>STM32F429I-DISCO LTDC Framebuffer demo example</p><h3 id="configure-and-build" tabindex="-1">Configure and build <a class="header-anchor" href="#configure-and-build" aria-label="Permalink to &quot;Configure and build&quot;">​</a></h3><p>::</p><p>: cd tools ./configure -a &lt;appdir&gt; stm32f429i-disco/fb cd .. make</p><h3 id="framebuffer-calculation" tabindex="-1">Framebuffer calculation <a class="header-anchor" href="#framebuffer-calculation" aria-label="Permalink to &quot;Framebuffer calculation&quot;">​</a></h3><p>Use the helper script boards/stm32f429i-disco/tools/fbcalc.sh for calculating the heap2 and framebuffer memory region. The script assumes that all overlay buffers (LTDC and DMA2D) located in heap2 memory region starting at address 0xD0000000. When changing the display size (when using a custom display), DMA2D overlay size or the pixel format you have to recalculate the heap2 settings. In this configuration all overlays (LTDC and DMA2D) positioned at the end of heap2.</p><h3 id="configuration" tabindex="-1">Configuration <a class="header-anchor" href="#configuration" aria-label="Permalink to &quot;Configuration&quot;">​</a></h3><p>This configuration provides 2 LTDC (visible overlays) and 2 DMA2D overlays with pixel format RGB565 and a resolution of 240x320.</p><h3 id="loading" tabindex="-1">Loading <a class="header-anchor" href="#loading" aria-label="Permalink to &quot;Loading&quot;">​</a></h3><p>st-flash write nuttx.bin 0x8000000</p><h3 id="executing" tabindex="-1">Executing <a class="header-anchor" href="#executing" aria-label="Permalink to &quot;Executing&quot;">​</a></h3><p>The ltdc is initialized during boot up. Interaction with NSH is via the serial console at 115200 8N1 baud. From the nsh commandline execute the fb example:</p><pre><code>nsh&gt; fb
</code></pre><p>The test will put a pattern of concentric squares in the framebuffer and terminate.</p><p>You can also test overlay hardware acceleration functionality by executing the following command (shows a commandline help):</p><pre><code>nsh&gt; fboverlay
</code></pre>`,95)]))}const f=n(i,[["render",s]]);export{c as __pageData,f as default};
