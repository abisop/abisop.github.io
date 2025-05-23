import{_ as t,c as o,al as n,o as a}from"./chunks/framework.NFAqBSgQ.js";const p=JSON.parse('{"title":"mikroe-stm32f4","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/stm32f4/boards/mikroe-stm32f4/index.md","filePath":"en/platforms/arm/stm32f4/boards/mikroe-stm32f4/index.md"}'),i={name:"en/platforms/arm/stm32f4/boards/mikroe-stm32f4/index.md"};function s(r,e,l,h,d,u){return a(),o("div",null,e[0]||(e[0]=[n(`<h1 id="mikroe-stm32f4" tabindex="-1">mikroe-stm32f4 <a class="header-anchor" href="#mikroe-stm32f4" aria-label="Permalink to &quot;mikroe-stm32f4&quot;">​</a></h1><p>chip:stm32, chip:stm32f4, chip:stm32f407</p><p>This page discusses issues unique to NuttX configurations for the MikroElektronika Mikromedia for STM32F4 development board. This is another board support by NuttX that uses the same STM32F407VGT6 MCU as does the STM32F4-Discovery board. This board, however, has very different on-board peripherals than does the STM32F4-Discovery:</p><ul><li>TFT display with touch panel,</li><li>VS1053 stereo audio codec with headphone jack,</li><li>SD card slot,</li><li>Serial FLASH memory,</li><li>USB OTG FS with micro-AB connector, and</li><li>Battery connect and batter charger circuit.</li></ul><p>See the <a href="http://www.mikroe.com/mikromedia/stm32-m4/" target="_blank" rel="noreferrer">http://www.mikroe.com/mikromedia/stm32-m4/</a> for more information about this board.</p><h2 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h2><p>The Mikroe-STM32F4 board has no user accessible LEDs onboard, only a power and &quot;charging&quot; LED. All visual user output must be performed through the TFT display.</p><p>External LEDs could be added via the expansion headers on the side of the board, but as this would be a custom configuration, LEDs are not supported in this port.</p><h2 id="pwm" tabindex="-1">PWM <a class="header-anchor" href="#pwm" aria-label="Permalink to &quot;PWM&quot;">​</a></h2><p>The Mikroe-STM32F4 has no real on-board PWM devices, but it does have PWM pins routed to the expansion I/O headers on the side of the board.</p><h2 id="uarts" tabindex="-1">UARTs <a class="header-anchor" href="#uarts" aria-label="Permalink to &quot;UARTs&quot;">​</a></h2><p>The Mikroe-STM32F4 board has no onboard RS-232 line driver, however the expansion I/O header provides access to USART2 on pins PD5/PD6. The port includes support for USART2 configured as /dev/ttyS0.</p><h3 id="usart2" tabindex="-1">USART2 <a class="header-anchor" href="#usart2" aria-label="Permalink to &quot;USART2&quot;">​</a></h3><p>UART/USART PINS</p><hr><p>RX PD6 TX PD5</p><h3 id="default-usart-uart-configuration" tabindex="-1">Default USART/UART Configuration <a class="header-anchor" href="#default-usart-uart-configuration" aria-label="Permalink to &quot;Default USART/UART Configuration&quot;">​</a></h3><p>USART2 is enabled in all configurations (see */defconfig). RX and TX are configured on pins PD6 and PD5, respectively (see include/board.h).</p><h2 id="timer-inputs-outputs" tabindex="-1">Timer Inputs/Outputs <a class="header-anchor" href="#timer-inputs-outputs" aria-label="Permalink to &quot;Timer Inputs/Outputs&quot;">​</a></h2><p>::</p><p>:</p><pre><code>TIM1

:   CH1 PA8, PE9 CH2 PA9\\[1\\], PE11 CH3 PA10\\[1\\], PE13 CH4
    PA11\\[1\\], PE14

TIM2

:   CH1 PA0\\[1\\], PA15, PA5\\[1\\] CH2 PA1, PB3\\[1\\] CH3 PA2,
    PB10\\[1\\] CH4 PA3, PB11

TIM3

:   CH1 PA6\\[1\\], PB4, PC6 CH2 PA7\\[1\\], PB5, PC7\\[1\\] CH3 PB0, PC8
    CH4 PB1, PC9

TIM4

:   CH1 PB6\\[1\\], PD12\\[1\\] CH2 PB7, PD13\\[1\\] CH3 PB8, PD14\\[1\\]
    CH4 PB9\\[1\\], PD15\\[1\\]

TIM5

:   CH1 PA0\\[1\\], PH10\\[2\\] CH2 PA1, PH11\\[2\\] CH3 PA2, PH12\\[2\\]
    CH4 PA3, PI0

TIM8

:   CH1 PC6, PI5 CH2 PC7\\[1\\], PI6 CH3 PC8, PI7 CH4 PC9, PI2

TIM9

:   CH1 PA2, PE5 CH2 PA3, PE6

TIM10

:   CH1 PB8, PF6

TIM11

:   CH1 PB9\\[1\\], PF7

TIM12

:   CH1 PH6\\[2\\], PB14 CH2 PC15, PH9\\[2\\]

TIM13

:   CH1 PA6\\[1\\], PF8

TIM14

:   CH1 PA7\\[1\\], PF9

\\[1\\] Indicates pins that have other on-board functions and should
be used only with care (See table 5 in the Mikroe-STM32F4 User
Guide). The rest are free I/O pins. \\[2\\] Port H pins are not
supported by the MCU
</code></pre><h2 id="mio283qt-2-mio283qt-9a" tabindex="-1">MIO283QT-2/MIO283QT-9A <a class="header-anchor" href="#mio283qt-2-mio283qt-9a" aria-label="Permalink to &quot;MIO283QT-2/MIO283QT-9A&quot;">​</a></h2><p>The original Mikroe-SMT32F4 board as an on-board MIO283QT-2 TFT LCD that can be configured and used. This is a 320x240 resolution display with color capability to 262K colors, though the mio283qt-2 driver in NuttX only supports 16-bit color depth, or 65K colors. Changes to both the mio283qt-2 driver and the driver interface layer would need to be made to support 24 BPP mode.</p><p>UPDATE: New boards now support a MIO283QT-9A TFT LCD that is not compatible with the MIO283QT-2. It uses a different LCD controller. The default in all of these configurations is the MIO283QT-2. But MIO283QT-9A is also supported and you can switch from the MIO283QT-2 to the MIO283QT-9A by simply modifying the NuttX configuration</p><h2 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h2><p>Each Mikroe-STM32F4 configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh mikroe-stm32f4:&lt;subdir&gt;
</code></pre><p>If this is a Windows native build, then configure.bat should be used instead of configure.sh:</p><pre><code>configure.bat Mikroe-STM32F4\\&lt;subdir&gt;
</code></pre><p>Where &lt;subdir&gt; is one of the following:</p><h3 id="fulldemo" tabindex="-1">fulldemo <a class="header-anchor" href="#fulldemo" aria-label="Permalink to &quot;fulldemo&quot;">​</a></h3><p>This is an example that includes an NSH shell over USB that also enables all features of the Mikroe-STM32F4 board including the LCD, on-board 1M Flash with SMART filesystem, Aux RS-232 serial port on the expansion header, etc. A couple of the NX graphics commands are made available via the NSH prompt for performing LCD demonstrations, and the nximage example is used as a splash-screen at startup.</p><h3 id="kostest" tabindex="-1">kostest <a class="header-anchor" href="#kostest" aria-label="Permalink to &quot;kostest&quot;">​</a></h3><p>NOTE: This configuration compiles, but has not been fully tested on the hardware yet.</p><p>This configuration directory, performs a simple OS test using apps/examples/ostest with NuttX build as a kernel-mode monolithic module and the user applications are built separately. Is is recommended to use a special make command; not just &#39;make&#39; but make with the following two arguments:</p><pre><code>make pass1 pass2
</code></pre><p>In the normal case (just &#39;make&#39;), make will attempt to build both user-and kernel-mode blobs more or less interleaved. This actual works! However, for me it is very confusing so I prefer the above make command: Make the user-space binaries first (pass1), then make the kernel-space binaries (pass2)</p><p>NOTES:</p><ol><li><p>This configuration uses the mconf-based configuration tool. To change this configuration using that tool, you should:</p><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository.</p><p>b.</p><pre><code>Execute \\&#39;make menuconfig\\&#39; in nuttx/ in order to start the

:   reconfiguration process.
</code></pre></li><li><p>This is the default platform/toolchain in the configuration:</p><pre><code>CONFIG_HOST_WINDOWS=y                   : Windows
CONFIG_WINDOWS_CYGWIN=y                 : Cygwin environment on Windows
CONFIG_ARM_TOOLCHAIN_GNU_EABI=y      : GNU EABI toolchain for Windows

This is easily changed by modifying the configuration.
</code></pre></li><li><p>At the end of the build, there will be several files in the top-level NuttX build directory:</p><pre><code>PASS1:
  nuttx_user.elf    - The pass1 user-space ELF file
  nuttx_user.hex    - The pass1 Intel HEX format file (selected in defconfig)
  User.map          - Symbols in the user-space ELF file

PASS2:
  nuttx             - The pass2 kernel-space ELF file
  nuttx.hex         - The pass2 Intel HEX file (selected in defconfig)
  System.map        - Symbols in the kernel-space ELF file
</code></pre></li><li><p>Combining .hex files. If you plan to use the STM32 ST-Link Utility to load the .hex files into FLASH, then you need to combine the two hex files into a single .hex file. Here is how you can do that.</p><p>a. The &#39;tail&#39; of the nuttx.hex file should look something like this (with my comments added):</p><pre><code>     tail nuttx.hex
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
</code></pre><p>b. The &#39;head&#39; of the nuttx_user.hex file should look something like this (again with my comments added):</p><pre><code>     head nuttx_user.hex
    # 04, Extended Linear Address Record
    :02 0000 04 0801 F1
    # 00, data records
    :10 8000 00 BD89 01084C800108C8110208D01102087E
    :10 8010 00 0010 00201C1000201C1000203C16002026
    :10 8020 00 4D80 01085D80010869800108ED83010829
    ...

    Nothing needs to be done here.  The nuttx_user.hex file should
    be fine.
</code></pre><p>c. Combine the edited nuttx.hex and un-edited nuttx_user.hex file to produce a single combined hex file:</p><pre><code>     cat nuttx.hex nuttx_user.hex &gt;combined.hex

    Then use the combined.hex file with the STM32 ST-Link tool.  If
    you do this a lot, you will probably want to invest a little time
    to develop a tool to automate these steps.
</code></pre></li></ol><h3 id="nsh" tabindex="-1">nsh <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh&quot;">​</a></h3><p>This is an NSH example that uses USART2 as the console. Note that the Mikroe-STM32F4 board doesn&#39;t actually have onboard line drivers or a connector for USART2, but it does route the USART2 signals to the expansion header. To use this demo, you would need to connect an external 3.3V RS-232 line driver to the USART&#39;s I/O lines on the expansion header.</p><p>NOTE: This demo doesn&#39;t quite work yet. I can get output to the USART, but so far, I have not gotten nsh to actually come up.</p><h3 id="nx" tabindex="-1">nx <a class="header-anchor" href="#nx" aria-label="Permalink to &quot;nx&quot;">​</a></h3><p>An example using the NuttX graphics system (NX). This example focuses on general window controls, movement, mouse and keyboard input.:</p><pre><code>CONFIG_LCD_LANDSCAPE=y        : 320x240 landscape orientation
CONFIG_LCD_MIO283QT2=y        : MIO283QT-2 is the default
</code></pre><p>You can the newer MIO283QT-9A by enabling it in the configuration.:</p><pre><code>CONFIG_LCD_MIO283QT2=n         : Disable the MIO283QT-2
CONFIG_LCD_MIO283QT9A=y        : Enable the MIO283QT-9A
</code></pre><h3 id="nxlines" tabindex="-1">nxlines <a class="header-anchor" href="#nxlines" aria-label="Permalink to &quot;nxlines&quot;">​</a></h3><p>An example using the NuttX graphics system (NX). This example focuses on placing lines on the background in various orientations using the on-board TFT LCD.:</p><pre><code>CONFIG_LCD_LANDSCAPE=y        : 320x240 landscape orientation
CONFIG_LCD_MIO283QT2=y        : MIO283QT-2 is the default
</code></pre><p>You can the newer MIO283QT-9A by enabling it in the configuration.:</p><pre><code>CONFIG_LCD_MIO283QT2=n         : Disable the MIO283QT-2
CONFIG_LCD_MIO283QT9A=y        : Enable the MIO283QT-9A
</code></pre><h3 id="nxtext" tabindex="-1">nxtext <a class="header-anchor" href="#nxtext" aria-label="Permalink to &quot;nxtext&quot;">​</a></h3><p>Another example using the NuttX graphics system (NX). This example focuses on placing text on the background while pop-up windows occur. Text should continue to update normally with or without the popup windows present.</p><h3 id="usbnsh" tabindex="-1">usbnsh <a class="header-anchor" href="#usbnsh" aria-label="Permalink to &quot;usbnsh&quot;">​</a></h3><p>This is another NSH example. If differs from other &#39;nsh&#39; configurations in that this configurations uses a USB serial device for console I/O. Such a configuration is useful on the stm32f4discovery which has no builtin RS-232 drivers.</p><p>NOTES:</p><ol><li><p>This configuration uses the mconf-based configuration tool. To change this configuration using that tool, you should:</p><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository. b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</p></li><li><p>By default, this configuration uses the ARM EABI toolchain for Windows and builds under Cygwin (or probably MSYS). That can easily be reconfigured, of course.:</p><pre><code>CONFIG_HOST_WINDOWS=y                   : Builds under Windows
CONFIG_WINDOWS_CYGWIN=y                 : Using Cygwin
CONFIG_ARM_TOOLCHAIN_GNU_EABI=y      : GNU EABI toolchain for Windows
</code></pre></li><li><p>This configuration does have UART2 output enabled and set up as the system logging device:</p><pre><code>CONFIG_SYSLOG_CHAR=y               : Use a character device for system logging
CONFIG_SYSLOG_DEVPATH=&quot;/dev/ttyS0&quot; : UART2 will be /dev/ttyS0

However, there is nothing to generate SYSLOG output in the default
configuration so nothing should appear on UART2 unless you enable
some debug output or enable the USB monitor.
</code></pre></li><li><p>Enabling USB monitor SYSLOG output. If tracing is enabled, the USB device will save encoded trace output in in-memory buffer; if the USB monitor is enabled, that trace buffer will be periodically emptied and dumped to the system logging device (UART2 in this configuration):</p><pre><code>CONFIG_USBDEV_TRACE=y                   : Enable USB trace feature
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
</code></pre>`,62)]))}const m=t(i,[["render",s]]);export{p as __pageData,m as default};
