import{_ as t,c as o,al as n,o as i}from"./chunks/framework.NFAqBSgQ.js";const p=JSON.parse('{"title":"STM32F3Discovery","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/stm32f3/boards/stm32f3discovery/index.md","filePath":"en/platforms/arm/stm32f3/boards/stm32f3discovery/index.md"}'),a={name:"en/platforms/arm/stm32f3/boards/stm32f3discovery/index.md"};function s(r,e,l,d,c,h){return i(),o("div",null,e[0]||(e[0]=[n(`<h1 id="stm32f3discovery" tabindex="-1">STM32F3Discovery <a class="header-anchor" href="#stm32f3discovery" aria-label="Permalink to &quot;STM32F3Discovery&quot;">​</a></h1><p>chip:stm32, chip:stm32f3, chip:stm32f303</p><p>This README discusses issues unique to NuttX configurations for the STMicro STM32F3Discovery development board.</p><h2 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h2><p>The STM32F3Discovery board has ten LEDs. Two of these are controlled by logic on the board and are not available for software control:</p><pre><code>LD1 PWR:   red LED indicates that the board is powered.
LD2 COM:   LD2 default status is red. LD2 turns to green to indicate that
         communications are in progress between the PC and the ST-LINK/V2.
</code></pre><p>And eight can be controlled by software:</p><pre><code>User LD3:  red LED is a user LED connected to the I/O PE9 of the
         STM32F303VCT6.
User LD4:  blue LED is a user LED connected to the I/O PE8 of the
         STM32F303VCT6.
User LD5:  orange LED is a user LED connected to the I/O PE10 of the
         STM32F303VCT6.
User LD6:  green LED is a user LED connected to the I/O PE15 of the
         STM32F303VCT6.
User LD7:  green LED is a user LED connected to the I/O PE11 of the
         STM32F303VCT6.
User LD8:  orange LED is a user LED connected to the I/O PE14 of the
         STM32F303VCT6.
User LD9:  blue LED is a user LED connected to the I/O PE12 of the
         STM32F303VCT6.
User LD10: red LED is a user LED connected to the I/O PE13 of the
         STM32F303VCT6.
</code></pre><p>These LEDs are not used by the board port unless CONFIG_ARCH_LEDS is defined. In that case, the usage by the board port is defined in include/board.h and src/up_leds.c. The LEDs are used to encode OS-related events as follows:</p><blockquote><p>SYMBOL Meaning LED state</p><hr><p>LED_STARTED NuttX has been started LD3 ON LED_HEAPALLOCATE Heap has been allocated LD4 ON LED_IRQSENABLED Interrupts enabled LD4 ON LED_STACKCREATED Idle stack created LD6 ON LED_INIRQ In an interrupt LD7 should glow LED_SIGNAL In a signal handler LD8 might glow LED_ASSERTION An assertion failed LD9 ON while handling the assertion LED_PANIC The system has crashed LD10 Blinking at 2Hz LED_IDLE STM32 is is sleep mode (Optional, not used)</p></blockquote><h2 id="serial-console" tabindex="-1">Serial Console <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;Serial Console&quot;">​</a></h2><p>The STM32F3Discovery has no on-board RS-232 driver, however USART2 is configuration as the serial console in all configurations that use a serial console.</p><p>There are many options for USART2 RX and TX pins. They configured to use PA2 (TX) and PA3 (RX) for connection to an external serial device because of the following settings in the include/board.h file:</p><pre><code>#define GPIO_USART2_RX GPIO_USART2_RX_2
#define GPIO_USART2_TX GPIO_USART2_TX_2
</code></pre><p>This can be found on the board at:</p><pre><code>TX, PA2, Connector P1, pin 14
RX, PA3, Connector P1, pin 11
</code></pre><h2 id="fpu" tabindex="-1">FPU <a class="header-anchor" href="#fpu" aria-label="Permalink to &quot;FPU&quot;">​</a></h2><h3 id="fpu-configuration-options" tabindex="-1">FPU Configuration Options <a class="header-anchor" href="#fpu-configuration-options" aria-label="Permalink to &quot;FPU Configuration Options&quot;">​</a></h3><p>There are two version of the FPU support built into the STM32 port.</p><ol><li><p>Non-Lazy Floating Point Register Save</p><p>In this configuration floating point register save and restore is implemented on interrupt entry and return, respectively. In this case, you may use floating point operations for interrupt handling logic if necessary. This FPU behavior logic is enabled by default with:</p><pre><code>CONFIG_ARCH_FPU=y
</code></pre></li><li><p>Lazy Floating Point Register Save.</p><p>An alternative implementation only saves and restores FPU registers only on context switches. This means: (1) floating point registers are not stored on each context switch and, hence, possibly better interrupt performance. But, (2) since floating point registers are not saved, you cannot use floating point operations within interrupt handlers.</p><p>This logic can be enabled by simply adding the following to your .config file:</p><pre><code>CONFIG_ARCH_FPU=y
</code></pre></li></ol><h2 id="debugging" tabindex="-1">Debugging <a class="header-anchor" href="#debugging" aria-label="Permalink to &quot;Debugging&quot;">​</a></h2><p>If you are going to use a debugger, you should make sure that the following settings are selection in your configuration file:</p><pre><code>CONFIG_DEBUG_SYMBOLS=y : Enable debug symbols in the build
</code></pre><h3 id="stm32-st-link-utility" tabindex="-1">STM32 ST-LINK Utility <a class="header-anchor" href="#stm32-st-link-utility" aria-label="Permalink to &quot;STM32 ST-LINK Utility&quot;">​</a></h3><p>For simply writing to FLASH, I use the STM32 ST-LINK Utility. At least version 2.4.0 is required (older versions do not recognize the STM32 F3 device). This utility is available from free from the STMicro website.</p><h3 id="openocd" tabindex="-1">OpenOCD <a class="header-anchor" href="#openocd" aria-label="Permalink to &quot;OpenOCD&quot;">​</a></h3><p>I am told that OpenOCD will work with the ST-Link, but I have never tried it.</p><h3 id="https-github-com-texane-stlink" tabindex="-1"><a href="https://github.com/texane/stlink" target="_blank" rel="noreferrer">https://github.com/texane/stlink</a> <a class="header-anchor" href="#https-github-com-texane-stlink" aria-label="Permalink to &quot;&lt;https://github.com/texane/stlink&gt;&quot;">​</a></h3><p>This is an open source server for the ST-Link that I have never used.</p><p>It is also possible to use an external debugger such as the Segger JLink (EDU or commercial models) provided:</p><ol><li><p>The CN4 jumpers are removed to disconnect the on-board STLinkV2 from the STM32F3.</p></li><li><p>The appropriate (20 pin connector to flying wire) adapter is used to connect the debugger to the required pins on the expansion headers (see below).</p><p>Note that the 1x6 header on the STLinkV2 side of the board labeled &quot;SWD&quot; is for the STLink micro (STM32F1) and is not connected to the STM32F3.</p></li><li><p>OpenOCD version 0.9.0 or later is used. Earlier versions support either JTAG only or are buggy for SWD.</p></li></ol><p>The signals used with external (SWD) debugging are:</p><pre><code>VREF (3V)
GROUND (GND)
SWCLK (PA14)
SWIO (PA13)
SWO (PB3)
RESET (NRST)
</code></pre><h2 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h2><p>Each STM32F3Discovery configuration is maintained in a sub-directory and can be selected as follow:</p><blockquote><p>tools/configure.sh STM32F3Discovery:&lt;subdir&gt;</p></blockquote><p>Where &lt;subdir&gt; is one of the following:</p><p>nsh: ---Configures the NuttShell (nsh) located at apps/examples/nsh. The Configuration enables the serial interfaces on USART2. Support for builtin applications is enabled, but in the base configuration no builtin applications are selected (see NOTES below).</p><p>NOTES:</p><ol><li></li></ol><pre><code>This configuration uses the mconf-based configuration tool. To

:   change this configuration using that tool, you should:

    a.  Build and install the kconfig-mconf tool. See
        nuttx/README.txt see additional README.txt files in the
        NuttX tools repository.
    b.  Execute \\&#39;make menuconfig\\&#39; in nuttx/ in order to start the
        reconfiguration process.
</code></pre><ol start="2"><li></li></ol><pre><code>By default, this configuration uses the ARM EABI toolchain

:   for Windows and builds under Cygwin (or probably MSYS). That can
    easily be reconfigured, of course.

    CONFIG\\_HOST\\_WINDOWS=y : Builds under Windows
    CONFIG\\_WINDOWS\\_CYGWIN=y : Using Cygwin
    CONFIG\\_ARM\\_TOOLCHAIN\\_GNU\\_EABI=y : GNU EABI toolchain for
    Windows
</code></pre><ol start="3"><li><p>This configuration includes USB Support (CDC/ACM device):</p><pre><code>CONFIG_STM32_USB=y            : STM32 USB device support
CONFIG_USBDEV=y               : USB device support must be enabled
CONFIG_CDCACM=y               : The CDC/ACM driver must be built
CONFIG_NSH_BUILTIN_APPS=y     : NSH built-in application support must be enabled
CONFIG_NSH_ARCHINIT=y         : To perform USB initialization
</code></pre><p>The CDC/ACM example is included as two NSH &quot;built-in&quot; commands.:</p><pre><code>CONFIG_SYSTEM_CDCACM=y      : Enable apps/system/cdcacm
</code></pre><p>The two commands are:</p><pre><code>sercon : Connect the serial device a create /dev/ttyACM0
serdis : Disconnect the serial device.
</code></pre><p>NOTE: The serial connections/disconnections do not work as advertised. This is because the STM32F3Discovery board does not provide circuitry for control of the &quot;soft connect&quot; USB pullup. As a result, the host PC does not know the USB has been logically connected or disconnected. You have to follow these steps to use USB:</p><blockquote><ol><li>Start NSH with USB disconnected</li><li>enter to &#39;sercon&#39; command to start the CDC/ACM device, then</li><li>Connect the USB device to the host.</li></ol></blockquote><p>and to close the connection:</p><blockquote><ol start="4"><li>Disconnect the USB device from the host</li><li>Enter the &#39;serdis&#39; command</li></ol></blockquote></li><li><p>This example can support the watchdog timer test (apps/examples/watchdog) but this must be enabled by selecting:</p><pre><code>CONFIG_EXAMPLES_WATCHDOG=y : Enable the apps/examples/watchdog
CONFIG_WATCHDOG=y          : Enables watchdog timer driver support
CONFIG_STM32_WWDG=y        : Enables the WWDG timer facility, OR
CONFIG_STM32_IWDG=y        : Enables the IWDG timer facility (but not both)
</code></pre><p>The WWDG watchdog is driven off the (fast) 42MHz PCLK1 and, as result, has a maximum timeout value of 49 milliseconds. For WWDG watchdog, you should also add the following to the configuration file:</p><pre><code>CONFIG_EXAMPLES_WATCHDOG_PINGDELAY=20
CONFIG_EXAMPLES_WATCHDOG_TIMEOUT=49
</code></pre><p>The IWDG timer has a range of about 35 seconds and should not be an issue.</p></li></ol><h3 id="usbnsh" tabindex="-1">usbnsh: <a class="header-anchor" href="#usbnsh" aria-label="Permalink to &quot;usbnsh:&quot;">​</a></h3><p>This is another NSH example. If differs from other &#39;nsh&#39; configurations in that this configurations uses a USB serial device for console I/O. Such a configuration is useful on the stm32f3discovery which has no builtin RS-232 drivers.</p><p>Status: As of this writing, this configuration has not ran properly. There appears to be some kind of driver-related issue.</p><p>NOTES:</p><ol><li><p>This configuration uses the mconf-based configuration tool. To change this configuration using that tool, you should:</p><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository. b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</p></li><li><p>By default, this configuration uses the ARM EABI toolchain for Windows and builds under Cygwin (or probably MSYS). That can easily be reconfigured, of course.</p><p>Build Setup::</p><p>: CONFIG_HOST_WINDOWS=y : Builds under Windows CONFIG_WINDOWS_CYGWIN=y : Using Cygwin</p><p>System Type::</p><p>: CONFIG_ARM_TOOLCHAIN_GNU_EABI=y : GNU EABI toolchain for Windows</p></li><li></li></ol><pre><code>This configuration does have USART2 output enabled and set up as

:   the system logging device:

    Device Drivers -\\&gt; System Logging Device Options::

    :   CONFIG\\_SYSLOG\\_CHAR=y : Use a character device for system
        logging CONFIG\\_SYSLOG\\_DEVPATH=\\&quot;/dev/ttyS0\\&quot; : USART2 will
        be /dev/ttyS0

    However, there is nothing to generate SYSLOG output in the
    default configuration so nothing should appear on USART2 unless
    you enable some debug output or enable the USB monitor.

    NOTE: Using the SYSLOG to get debug output has limitations.
    Among those are that you cannot get debug output from interrupt
    handlers. So, in particularly, debug output is not a useful way
    to debug the USB device controller driver. Instead, use the USB
    monitor with USB debug off and USB trance on (see below).
</code></pre><ol start="4"><li></li></ol><pre><code>Enabling USB monitor SYSLOG output. If tracing is enabled, the USB

:   device will save encoded trace output in in-memory buffer; if
    the USB monitor is enabled, that trace buffer will be
    periodically emptied and dumped to the system logging device
    (USART2 in this configuration):

    &gt; Device Drivers -\\&gt; \\&quot;USB Device Driver Support::
    &gt;
    &gt; :   CONFIG\\_USBDEV\\_TRACE=y : Enable USB trace feature
    &gt;     CONFIG\\_USBDEV\\_TRACE\\_NRECORDS=256 : Buffer 128 records
    &gt;     in memory
    &gt;
    &gt; Application Configuration -\\&gt; NSH LIbrary::
    &gt;
    &gt; :   CONFIG\\_NSH\\_USBDEV\\_TRACE=n : No builtin tracing from NSH
    &gt;     CONFIG\\_NSH\\_ARCHINIT=y : Automatically start the USB
    &gt;     monitor
    &gt;
    &gt; Application Configuration -\\&gt; System NSH Add-Ons::
    &gt;
    &gt; :   CONFIG\\_USBMONITOR=y : Enable the USB monitor daemon
    &gt;     CONFIG\\_USBMONITOR\\_STACKSIZE=2048 : USB monitor daemon
    &gt;     stack size CONFIG\\_USBMONITOR\\_PRIORITY=50 : USB monitor
    &gt;     daemon priority CONFIG\\_USBMONITOR\\_INTERVAL=1 : Dump
    &gt;     trace data every second CONFIG\\_USBMONITOR\\_TRACEINIT=y :
    &gt;     Enable TRACE output CONFIG\\_USBMONITOR\\_TRACECLASS=y
    &gt;     CONFIG\\_USBMONITOR\\_TRACETRANSFERS=y
    &gt;     CONFIG\\_USBMONITOR\\_TRACECONTROLLER=y
    &gt;     CONFIG\\_USBMONITOR\\_TRACEINTERRUPTS=y

    NOTE: USB debug output also be enabled in this case. Both will
    appear on the serial SYSLOG output. However, the debug output
    will be asynchronous with the trace output and, hence, difficult
    to interpret.
</code></pre><ol start="5"><li><p>The STM32F3Discovery board does not provide circuitry for control of the &quot;soft connect&quot; USB pullup. As a result, the host PC does not know the USB has been logically connected or disconnected. You have to follow these steps to use USB:</p><ol><li>Start NSH with USB disconnected, then</li><li>Connect the USB device to the host.</li></ol></li><li><p>Using the Prolifics PL2303 Emulation</p><p>You could also use the non-standard PL2303 serial device instead of the standard CDC/ACM serial device by changing:</p><pre><code>Drivers-&gt;USB Device Driver Support
    CONFIG_CDCACM=n               : Disable the CDC/ACM serial device class
    CONFIG_CDCACM_CONSOLE=n       : The CDC/ACM serial device is NOT the console
    CONFIG_PL2303=y               : The Prolifics PL2303 emulation is enabled
    CONFIG_PL2303_CONSOLE=y       : The PL2303 serial device is the console
</code></pre></li></ol>`,53)]))}const g=t(a,[["render",s]]);export{p as __pageData,g as default};
