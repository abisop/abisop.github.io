import{_ as n,c as t,al as o,o as i}from"./chunks/framework.NFAqBSgQ.js";const h=JSON.parse('{"title":"HY-MiniSTM32V","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/stm32f1/boards/hymini-stm32/index.md","filePath":"en/platforms/arm/stm32f1/boards/hymini-stm32/index.md"}'),a={name:"en/platforms/arm/stm32f1/boards/hymini-stm32/index.md"};function r(s,e,l,_,d,C){return i(),t("div",null,e[0]||(e[0]=[o(`<h1 id="hy-ministm32v" tabindex="-1">HY-MiniSTM32V <a class="header-anchor" href="#hy-ministm32v" aria-label="Permalink to &quot;HY-MiniSTM32V&quot;">​</a></h1><p>chip:stm32, chip:stm32f1, chip:stm32f103</p><p>This page discusses issues unique to NuttX configurations for the HY-MiniSTM32V development board.</p><h2 id="st-bootloader" tabindex="-1">ST Bootloader <a class="header-anchor" href="#st-bootloader" aria-label="Permalink to &quot;ST Bootloader&quot;">​</a></h2><p>A bootloader code is available in an internal boot ROM memory (called &#39;system memory&#39; in STM documentation) in all STM32 MCUs. For the F103xx this bootloader can be used to upload &amp; flash a firmware image through the USART1.</p><p>Notes:</p><ul><li>The bootloader is activated by the BOOT0 / BOOT1 pins after a MCU reset. See STM application note 2606 for more details.</li><li>On the hymini-stm32 board the USART1 is connected to a PL2303 USB&lt;-&gt;serial converter.</li></ul><p>To enter bootloader mode in the hymini-stm32 board:</p><ul><li>Press the &#39;boot0&#39; button (located next to &#39;reset&#39; button)</li><li>While boot0 button is pressed, reset the board through the reset button.</li><li>Once you pressed / released the &#39;reset&#39; button, the MCU has (re)started in bootloader mode (and you can then release the boot0 button).</li></ul><p>A flash utility must be used on your development workstation to upload / flash a firmware image. (The &#39;stm32flash&#39; open source tool, available at <a href="http://stm32flash.googlecode.com/" target="_blank" rel="noreferrer">http://stm32flash.googlecode.com/</a> has been used successfully).</p><h2 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h2><p>The HY-MiniSTM32 board provides only two controllable LEDs labeled LED1 and LED2. Usage of these LEDs is defined in include/board.h and src/up_leds.c. They are encoded as follows:</p><pre><code>=================== ======================= ======= =======
SYMBOL              Meaning                 LED1*   LED2
=================== ======================= ======= =======
LED_STARTED         NuttX has been started  OFF     OFF
LED_HEAPALLOCATE    Heap has been allocated ON      OFF
LED_IRQSENABLED     Interrupts enabled      OFF     ON
LED_STACKCREATED    Idle stack created      ON      OFF
LED_INIRQ           In an interrupt**       OFF     N/C
LED_SIGNAL          In a signal handler***  N/C     ON
LED_ASSERTION       An assertion failed     ON      ON
LED_PANIC           The system has crashed  BLINK   BLINK
LED_IDLE            STM32 is is sleep mode  (Optional, not used)
=================== ======================= ======= =======

* If NuttX starts correctly, normal state is to have LED1 on and LED2 off.
** LED1 is turned off during interrupt.
*** LED2 is turned on during signal handler.
</code></pre><h2 id="rtc" tabindex="-1">RTC <a class="header-anchor" href="#rtc" aria-label="Permalink to &quot;RTC&quot;">​</a></h2><p>The STM32 RTC may configured using the following settings.:</p><pre><code>CONFIG_RTC - Enables general support for a hardware RTC. Specific
  architectures may require other specific settings.
CONFIG_RTC_HIRES - The typical RTC keeps time to resolution of 1
  second, usually supporting a 32-bit time_t value.  In this case,
  the RTC is used to &amp;quot;seed&amp;quot; the normal NuttX timer and the
  NuttX timer provides for higher resolution time. If CONFIG_RTC_HIRES
  is enabled in the NuttX configuration, then the RTC provides higher
  resolution time and completely replaces the system timer for purpose of
  date and time.
  CONFIG_RTC_FREQUENCY - If CONFIG_RTC_HIRES is defined, then the
  frequency of the high resolution RTC must be provided.  If CONFIG_RTC_HIRES
  is not defined, CONFIG_RTC_FREQUENCY is assumed to be one.
CONFIG_RTC_ALARM - Enable if the RTC hardware supports setting of an alarm.
  A callback function will be executed when the alarm goes off
</code></pre><p>In hi-res mode, the STM32 RTC operates only at 16384Hz. Overflow interrupts are handled when the 32-bit RTC counter overflows every 3 days and 43 minutes. A BKP register is incremented on each overflow interrupt creating, effectively, a 48-bit RTC counter.</p><p>In the lo-res mode, the RTC operates at 1Hz. Overflow interrupts are not handled (because the next overflow is not expected until the year 2106.</p><p>WARNING: Overflow interrupts are lost whenever the STM32 is powered down. The overflow interrupt may be lost even if the STM32 is powered down only momentarily. Therefore hi-res solution is only useful in systems where the power is always on.</p><h2 id="hy-mini-specific-configuration-options" tabindex="-1">HY-Mini specific Configuration Options <a class="header-anchor" href="#hy-mini-specific-configuration-options" aria-label="Permalink to &quot;HY-Mini specific Configuration Options&quot;">​</a></h2><pre><code>CONFIG_ARCH - Identifies the arch/ subdirectory.  This should be set to:

       CONFIG_ARCH=arm

CONFIG_ARCH_family - For use in C code:

       CONFIG_ARCH_ARM=y

CONFIG_ARCH_architecture - For use in C code:

       CONFIG_ARCH_CORTEXM3=y

CONFIG_ARCH_CHIP - Identifies the arch/*/chip subdirectory

       CONFIG_ARCH_CHIP=stm32

CONFIG_ARCH_CHIP_name - For use in C code to identify the exact chip:

       CONFIG_ARCH_CHIP_STM32F103VC

CONFIG_ARCH_BOARD_STM32_CUSTOM_CLOCKCONFIG - Enables special STM32 clock
configuration features.

       CONFIG_ARCH_BOARD_STM32_CUSTOM_CLOCKCONFIG=n

CONFIG_ARCH_BOARD - Identifies the boards/ subdirectory and
hence, the board that supports the particular chip or SoC.

       CONFIG_ARCH_BOARD=hymini-stm32v (for the HY-Mini development board)

CONFIG_ARCH_BOARD_name - For use in C code

       CONFIG_ARCH_BOARD_HYMINI_STM32V=y

CONFIG_ARCH_LOOPSPERMSEC - Must be calibrated for correct operation
of delay loops

CONFIG_ENDIAN_BIG - define if big endian (default is little
endian)

CONFIG_RAM_SIZE - Describes the installed DRAM (SRAM in this case):

       CONFIG_RAM_SIZE=0x0000C000 (48Kb)

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

Individual subsystems can be enabled:
    AHB
    ---
    CONFIG_STM32_DMA1
    CONFIG_STM32_DMA2
    CONFIG_STM32_CRC
    CONFIG_STM32_FSMC
    CONFIG_STM32_SDIO

    APB1
    ----
    CONFIG_STM32_TIM2
    CONFIG_STM32_TIM3    (required for PWM control of LCD backlight)
    CONFIG_STM32_TIM4
    CONFIG_STM32_TIM5
    CONFIG_STM32_TIM6
    CONFIG_STM32_TIM7
    CONFIG_STM32_IWDG
    CONFIG_STM32_WWDG
    CONFIG_STM32_IWDG
    CONFIG_STM32_SPI2
    CONFIG_STM32_SPI4
    CONFIG_STM32_USART2
    CONFIG_STM32_USART3
    CONFIG_STM32_UART4
    CONFIG_STM32_UART5
    CONFIG_STM32_I2C1
    CONFIG_STM32_I2C2
    CONFIG_STM32_USB
    CONFIG_STM32_CAN1
    CONFIG_STM32_BKP
    CONFIG_STM32_PWR
    CONFIG_STM32_DAC
    CONFIG_STM32_USB

    APB2
    ----
    CONFIG_STM32_ADC1
    CONFIG_STM32_ADC2
    CONFIG_STM32_TIM1
    CONFIG_STM32_SPI1
    CONFIG_STM32_TIM8
    CONFIG_STM32_USART1
    CONFIG_STM32_ADC3

  Timer and I2C devices may need to the following to force power to be applied
  unconditionally at power up.  (Otherwise, the device is powered when it is
  initialized).

    CONFIG_STM32_FORCEPOWER

  The Timer3 alternate mapping is required for PWM control of LCD backlight

    CONFIG_STM32_TIM3_PARTIAL_REMAP=y

  Timer devices may be used for different purposes.  One special purpose is
  to generate modulated outputs for such things as motor control.  If CONFIG_STM32_TIMn
  is defined (as above) then the following may also be defined to indicate that
  the timer is intended to be used for pulsed output modulation, ADC conversion,
  or DAC conversion.  Note that ADC/DAC require two definition:  Not only do you have
  to assign the timer (n) for used by the ADC or DAC, but then you also have to
  configure which ADC or DAC (m) it is assigned to.

    CONFIG_STM32_TIMn_PWM   Reserve timer n for use by PWM, n=1,..,8
    CONFIG_STM32_TIMn_ADC   Reserve timer n for use by ADC, n=1,..,8
    CONFIG_STM32_TIMn_ADCm  Reserve timer n to trigger ADCm, n=1,..,8, m=1,..,3
    CONFIG_STM32_TIMn_DAC   Reserve timer n for use by DAC, n=1,..,8
    CONFIG_STM32_TIMn_DACm  Reserve timer n to trigger DACm, n=1,..,8, m=1,..,2

  Others alternate pin mappings available:

    CONFIG_STM32_TIM1_FULL_REMAP
    CONFIG_STM32_TIM1_PARTIAL_REMAP
    CONFIG_STM32_TIM2_FULL_REMAP
    CONFIG_STM32_TIM2_PARTIAL_REMAP_1
    CONFIG_STM32_TIM2_PARTIAL_REMAP_2
    CONFIG_STM32_TIM3_FULL_REMAP
    CONFIG_STM32_TIM3_PARTIAL_REMAP
    CONFIG_STM32_TIM4_REMAP
    CONFIG_STM32_USART1_REMAP
    CONFIG_STM32_USART2_REMAP
    CONFIG_STM32_USART3_FULL_REMAP
    CONFIG_STM32_USART3_PARTIAL_REMAP
    CONFIG_STM32_SPI1_REMAP
    CONFIG_STM32_SPI3_REMAP
    CONFIG_STM32_I2C1_REMAP
    CONFIG_STM32_CAN1_REMAP1
    CONFIG_STM32_CAN1_REMAP2
    CONFIG_STM32_CAN2_REMAP

  STM32F103V specific device driver settings

    CONFIG_U[S]ARTn_SERIAL_CONSOLE - selects the USARTn (n=1,2,3) or UART
       m (m=4,5) for the console and ttys0 (default is the USART1).

       Note: USART1 is connected to a PL2303 serial to USB converter.
       So USART1 is available through USB port labeled CN3 on the board.

    CONFIG_U[S]ARTn_RXBUFSIZE - Characters are buffered as received.
       This specific the size of the receive buffer
    CONFIG_U[S]ARTn_TXBUFSIZE - Characters are buffered before
       being sent.  This specific the size of the transmit buffer
    CONFIG_U[S]ARTn_BAUD - The configure BAUD of the UART.  Must be
    CONFIG_U[S]ARTn_BITS - The number of bits.  Must be either 7 or 8.
    CONFIG_U[S]ARTn_PARTIY - 0=no parity, 1=odd parity, 2=even parity
    CONFIG_U[S]ARTn_2STOP - Two stop bits

    CONFIG_STM32_SPI_INTERRUPTS - Select to enable interrupt driven SPI
      support. Non-interrupt-driven, poll-waiting is recommended if the
      interrupt rate would be to high in the interrupt driven case.
    CONFIG_STM32_SPIx_DMA - Use DMA to improve SPIx transfer performance.
      Cannot be used with CONFIG_STM32_SPI_INTERRUPT.

    CONFIG_SDIO_DMA - Support DMA data transfers.  Requires CONFIG_STM32_SDIO
      and CONFIG_STM32_DMA2.
    CONFIG_STM32_SDIO_PRI - Select SDIO interrupt priority.  Default: 128
    CONFIG_STM32_SDIO_DMAPRIO - Select SDIO DMA interrupt priority.
      Default:  Medium
    CONFIG_STM32_SDIO_WIDTH_D1_ONLY - Select 1-bit transfer mode.  Default:
      4-bit transfer mode.
    CONFIG_MMCSD_HAVE_CARDDETECT - Select if SDIO driver card detection
      is 100% accurate  (it is on the  HY-MiniSTM32V)

  HY-MiniSTM32V CAN Configuration

    CONFIG_CAN - Enables CAN support (one or both of CONFIG_STM32_CAN1 or
      CONFIG_STM32_CAN2 must also be defined)
    CONFIG_CAN_EXTID - Enables support for the 29-bit extended ID.  Default
      Standard 11-bit IDs.
    CONFIG_CAN_TXFIFOSIZE - The size of the circular tx buffer
      of CAN messages.
      Default: 8
    CONFIG_CAN_RXFIFOSIZE - The size of the circular rx buffer
      of CAN messages.
      Default: 8
    CONFIG_CAN_NPENDINGRTR - The size of the list of pending RTR requests.
      Default: 4
    CONFIG_CAN_LOOPBACK - A CAN driver may or may not support a loopback
      mode for testing. The STM32 CAN driver does support loopback mode.
    CONFIG_STM32_CAN1_BAUD - CAN1 BAUD rate.  Required if CONFIG_STM32_CAN1
      is defined.
    CONFIG_STM32_CAN2_BAUD - CAN1 BAUD rate.  Required if CONFIG_STM32_CAN2
      is defined.
    CONFIG_STM32_CAN_TSEG1 - The number of CAN time quanta in segment 1.
      Default: 6
    CONFIG_STM32_CAN_TSEG2 - the number of CAN time quanta in segment 2.
      Default: 7
    CONFIG_STM32_CAN_REGDEBUG - If CONFIG_DEBUG_FEATURES is set, this will generate an
      dump of all CAN registers.

  HY-MiniSTM32V LCD Hardware Configuration.  The HY-Mini board may be delivered with
  either an SSD1289 or an R61505U LCD controller.

    CONFIG_LCD_R61505U - Selects the R61505U LCD controller.
    CONFIG_LCD_SSD1289 - Selects the SSD1289 LCD controller.

  The following options apply for either LCD controller:

    CONFIG_NX_LCDDRIVER - To be defined to include LCD driver
    CONFIG_LCD_LANDSCAPE - Define for 320x240 display &quot;landscape&quot;
      support. In this orientation, the HY-MiniSTM32V&#39;s
      LCD used connector is at the right of the display.
      Default is this 320x240 &quot;landscape&quot; orientation
    CONFIG_LCD_PORTRAIT - Define for 240x320 display &quot;portrait&quot;
      orientation support.  In this orientation, the HY-MiniSTM32V&#39;s
      LCD used connector is at the bottom of the display. Default is
      320x240 &quot;landscape&quot; orientation.
    CONFIG_LCD_RPORTRAIT - Define for 240x320 display &quot;reverse
      portrait&quot; orientation support.  In this orientation, the
      HY-MiniSTM32V&#39;s LCD used connector is at the top of the display.
      Default is 320x240 &quot;landscape&quot; orientation.
    CONFIG_LCD_BACKLIGHT - Define to support an adjustable backlight
      using timer 3.  The granularity of the settings is determined
      by CONFIG_LCD_MAXPOWER.  Requires CONFIG_STM32_TIM3.
</code></pre><h2 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h2><p>NOTES:</p><ul><li>All configurations described below are using the mconf-based configuration tool. To change their configuration using that tool, you should: a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository. b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</li><li>All configurations use a generic GNU EABI toolchain for Linux by default.</li><li>They are all configured to generate a binary image that can be flashed through the STM32 internal bootloader.</li></ul><p>Each HY-MiniSTM32V configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh hymini-stm32v:&lt;subdir&gt;
</code></pre><p>Where &lt;subdir&gt; is one of the following:</p><h3 id="nsh-and-nsh2" tabindex="-1">nsh and nsh2 <a class="header-anchor" href="#nsh-and-nsh2" aria-label="Permalink to &quot;nsh and nsh2&quot;">​</a></h3><p>Configure the NuttShell (nsh) located at examples/nsh.</p><p>Differences between the two NSH configurations:</p><pre><code>=========== ======================= ================================
            nsh                     nsh2
=========== ======================= ================================
Serial      Debug output: USART1    Debug output: USART1
Console:    NSH output:   USART1    NSH output:   USART1 (2)
=========== ======================= ================================
microSD     Yes (5)                 Yes (5)
Support
=========== ======================= ================================
FAT FS      CONFIG_FAT_LCNAMES=y    CONFIG_FAT_LCNAMES=y
Config      CONFIG_FAT_LFN=n        CONFIG_FAT_LFN=y (3)
=========== ======================= ================================
LCD Driver  No                      Yes
Support
=========== ======================= ================================
RTC Support No                      Yes
=========== ======================= ================================
Support for No                      Yes
Built=in
Apps
=========== ======================= ================================
Built=in    None                    apps/examples/nx
Apps                                apps/examples/nxhello
                                    apps/system/usbmsc (4)
                                    apps/examples/nximage
=========== ======================= ================================

(1) You will probably need to the PATH environment variable to set
    up the correct PATH variable for whichever toolchain you may use.
(2) When any other device other than /dev/console is used for a user
    interface, (1) linefeeds (\\n) will not be expanded to carriage return
    / linefeeds \\r\\n). You will need to configure your terminal program
    to account for this. And (2) input is not automatically echoed so
    you will have to turn local echo on.
(3) Microsoft holds several patents related to the design of
    long file names in the FAT file system.  Please refer to the
    details in the top-level NOTICE file.  Please do not use FAT
    long file name unless you are familiar with these patent issues.
(4) When built as an NSH add-on command (CONFIG_NSH_BUILTIN_APPS=y),
    Caution should be used to assure that the SD drive is not in use when
    the USB storage device is configured.  Specifically, the SD driver
    should be unmounted like::

      nsh&gt; mount -t vfat /dev/mmcsd0 /mnt/sdcard # Card is mounted in NSH
      ...
      nsh&gt; umount /mnd/sdcard                    # Unmount before connecting USB!!!
      nsh&gt; msconn                                # Connect the USB storage device
      ...
      nsh&gt; msdis                                 # Disconnect USB storate device
      nsh&gt; mount -t vfat /dev/mmcsd0 /mnt/sdcard # Restore the mount

    Failure to do this could result in corruption of the SD card format.
(5) Option CONFIG_NSH_ARCHINIT must be enabled in order to call the SDIO slot
    initialization code.
</code></pre><h3 id="usbmsc" tabindex="-1">usbmsc <a class="header-anchor" href="#usbmsc" aria-label="Permalink to &quot;usbmsc&quot;">​</a></h3><p>This configuration directory exercises the USB mass storage class driver at system/usbmsc. See examples/README.txt for more information.</p><h3 id="usbnsh" tabindex="-1">usbnsh <a class="header-anchor" href="#usbnsh" aria-label="Permalink to &quot;usbnsh&quot;">​</a></h3><p>This is another NSH example. If differs from other &#39;nsh&#39; configurations in that this configurations uses a USB serial device for console I/O.</p><p>NOTES:</p><ol><li><p>This configuration does have UART2 output enabled and set up as the system logging device:</p><pre><code>CONFIG_SYSLOG_CHAR=y               : Use a character device for system logging
CONFIG_SYSLOG_DEVPATH=&quot;/dev/ttyS0&quot; : UART2 will be /dev/ttyS0
</code></pre><p>However, there is nothing to generate SYSLOG output in the default configuration so nothing should appear on UART2 unless you enable some debug output or enable the USB monitor.</p></li><li><p>Enabling USB monitor SYSLOG output. If tracing is enabled, the USB device will save encoded trace output in in-memory buffer; if the USB monitor is enabled, that trace buffer will be periodically emptied and dumped to the system logging device (UART2 in this configuration):</p><pre><code>CONFIG_USBDEV_TRACE=y                   : Enable USB trace feature
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

Using the Prolifics PL2303 Emulation
------------------------------------
You could also use the non-standard PL2303 serial device instead of
the standard CDC/ACM serial device by changing::

CONFIG_CDCACM=y               : Disable the CDC/ACM serial device class
CONFIG_CDCACM_CONSOLE=y       : The CDC/ACM serial device is NOT the console
CONFIG_PL2303=y               : The Prolifics PL2303 emulation is enabled
CONFIG_PL2303_CONSOLE=y       : The PL2303 serial device is the console
</code></pre></li></ol><h3 id="usbserial" tabindex="-1">usbserial <a class="header-anchor" href="#usbserial" aria-label="Permalink to &quot;usbserial&quot;">​</a></h3><p>This configuration directory exercises the USB serial class driver at examples/usbserial. See examples/README.txt for more information.:</p><pre><code>CONFIG_HOST_LINUX=y                      : Linux host
CONFIG_ARM_TOOLCHAIN_GNU_EABI=y       : GNU EABI toolchain for Linux
</code></pre><p>USB debug output can be enabled as by changing the following settings in the configuration file:</p><pre><code>-CONFIG_DEBUG_FEATURES=n
-CONFIG_DEBUG_INFO=n
-CONFIG_DEBUG_USB=n
+CONFIG_DEBUG_FEATURES=y
+CONFIG_DEBUG_INFO=y
+CONFIG_DEBUG_USB=y

-CONFIG_EXAMPLES_USBSERIAL_TRACEINIT=n
-CONFIG_EXAMPLES_USBSERIAL_TRACECLASS=n
-CONFIG_EXAMPLES_USBSERIAL_TRACETRANSFERS=n
-CONFIG_EXAMPLES_USBSERIAL_TRACECONTROLLER=n
-CONFIG_EXAMPLES_USBSERIAL_TRACEINTERRUPTS=n
+CONFIG_EXAMPLES_USBSERIAL_TRACEINIT=y
+CONFIG_EXAMPLES_USBSERIAL_TRACECLASS=y
+CONFIG_EXAMPLES_USBSERIAL_TRACETRANSFERS=y
+CONFIG_EXAMPLES_USBSERIAL_TRACECONTROLLER=y
+CONFIG_EXAMPLES_USBSERIAL_TRACEINTERRUPTS=y
</code></pre><p>By default, the usbserial example uses the Prolific PL2303 serial/USB converter emulation. The example can be modified serial/USB converter emulation. The example can be modified to use the CDC/ACM serial class by making the following changes to the configuration file:</p><pre><code>-CONFIG_PL2303=y
+CONFIG_PL2303=n

-CONFIG_CDCACM=n
+CONFIG_CDCACM=y
</code></pre>`,44)]))}const c=n(a,[["render",r]]);export{h as __pageData,c as default};
