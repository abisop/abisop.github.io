import{_ as t,c as n,al as o,o as a}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"ST STM3220G-EVAL","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/stm32f2/boards/stm3220g-eval/index.md","filePath":"en/platforms/arm/stm32f2/boards/stm3220g-eval/index.md"}'),i={name:"en/platforms/arm/stm32f2/boards/stm3220g-eval/index.md"};function s(r,e,l,p,d,h){return a(),n("div",null,e[0]||(e[0]=[o(`<h1 id="st-stm3220g-eval" tabindex="-1">ST STM3220G-EVAL <a class="header-anchor" href="#st-stm3220g-eval" aria-label="Permalink to &quot;ST STM3220G-EVAL&quot;">​</a></h1><p>chip:stm32, chip:stm32f2, chip:stm32f207, ethernet</p><p>This page discusses issues unique to NuttX configurations for the STMicro STM3220G-EVAL development board.</p><h2 id="ethernet" tabindex="-1">Ethernet <a class="header-anchor" href="#ethernet" aria-label="Permalink to &quot;Ethernet&quot;">​</a></h2><p>The Ethernet driver is configured to use the MII interface:</p><p>Board Jumper Settings:</p><blockquote><p>Jumper Description</p><hr><p>JP8 To enable MII, JP8 should not be fitted. JP6 2-3: Enable MII interface mode JP5 2-3: Provide 25 MHz clock for MII or 50 MHz clock for RMII by MCO at PA8 SB1 Not used with MII</p></blockquote><h2 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h2><p>The STM3220G-EVAL board has four LEDs labeled LD1, LD2, LD3 and LD4 on the board.. These LEDs are not used by the board port unless CONFIG_ARCH_LEDS is defined. In that case, the usage by the board port is defined in include/board.h and src/up_leds.c. The LEDs are used to encode OS-relatedevents as follows:</p><blockquote><p>SYMBOL Meaning LED1[1] LED2 LED3 LED4</p><hr><p>LED_STARTED NuttX has been started ON OFF OFF OFF LED_HEAPALLOCATE Heap has been allocated OFF ON OFF OFF LED_IRQSENABLED Interrupts enabled ON ON OFF OFF LED_STACKCREATED Idle stack created OFF OFF ON OFF LED_INIRQ In an interrupt[2] ON N/C N/C OFF LED_SIGNAL In a signal handler[3] N/C ON N/C OFF LED_ASSERTION An assertion failed ON ON N/C OFF LED_PANIC LED_IDLE The system has crashed STM32 is is sleep mode N/C N/C N/C ON</p></blockquote><p>[1] If LED1, LED2, LED3 are statically on, then NuttX probably failed to boot and these LEDs will give you some indication of where the failure was</p><p>[2] The normal state is LED3 ON and LED1 faintly glowing. This faint glow is because of timer interrupts that result in the LED being illuminated on a small proportion of the time.</p><p>[3] LED2 may also flicker normally if signals are processed.</p><h2 id="pwm" tabindex="-1">PWM <a class="header-anchor" href="#pwm" aria-label="Permalink to &quot;PWM&quot;">​</a></h2><p>The STM3220G-Eval has no real on-board PWM devices, but the board can be configured to output a pulse train using timer output pins. The following pins have been use to generate PWM output (see board.h for some other candidates):</p><p>TIM4 CH2. Pin PD13 is used by the FSMC (FSMC_A18) and is also connected to the Motor Control Connector (CN5) just for this purpose. If FSMC is not enabled, then FSMC_A18 will not be used (and will be tri-stated from the LCD).</p><p>CONFIGURATION:</p><pre><code>CONFIG_STM32_TIM4=y
CONFIG_PWM=n
CONFIG_PWM_PULSECOUNT=n
CONFIG_STM32_TIM4_PWM=y
CONFIG_STM32_TIM4_CHANNEL=2
</code></pre><p>ACCESS:</p><pre><code>Daughterboard Extension Connector, CN3, pin 32
Ground is available on CN3, pin1
</code></pre><p>NOTE: TIM4 hardware will not support pulse counting.</p><p>TIM8 CH4: Pin PC9 is used by the microSD card (MicroSDCard_D1) and I2S (I2S_CKIN) but can be completely disconnected from both by opening JP16.</p><p>CONFIGURATION:</p><pre><code>CONFIG_STM32_TIM8=y
CONFIG_PWM=n
CONFIG_PWM_PULSECOUNT=y
CONFIG_STM32_TIM8_PWM=y
CONFIG_STM32_TIM8_CHANNEL=4
</code></pre><p>ACCESS:</p><pre><code>Daughterboard Extension Connector, CN3, pin 17
Ground is available on CN3, pin1
</code></pre><h2 id="can" tabindex="-1">CAN <a class="header-anchor" href="#can" aria-label="Permalink to &quot;CAN&quot;">​</a></h2><p>Connector 10 (CN10) is DB-9 male connector that can be used with CAN1 or CAN2.:</p><pre><code>JP10 connects CAN1_RX or CAN2_RX to the CAN transceiver
JP3 connects CAN1_TX or CAN2_TX to the CAN transceiver
</code></pre><p>CAN signals are then available on CN10 pins:</p><pre><code>CN10 Pin 7 = CANH
CN10 Pin 2 = CANL
</code></pre><p>Mapping to STM32 GPIO pins:</p><pre><code>PD0   = FSMC_D2 &amp; CAN1_RX
PD1   = FSMC_D3 &amp; CAN1_TX
PB13  = ULPI_D6 &amp; CAN2_TX
PB5   = ULPI_D7 &amp; CAN2_RX
</code></pre><h2 id="fsmc-sram" tabindex="-1">FSMC SRAM <a class="header-anchor" href="#fsmc-sram" aria-label="Permalink to &quot;FSMC SRAM&quot;">​</a></h2><h3 id="on-board-sram" tabindex="-1">On-board SRAM <a class="header-anchor" href="#on-board-sram" aria-label="Permalink to &quot;On-board SRAM&quot;">​</a></h3><p>A 16 Mbit SRAM is connected to the STM32F407IGH6 FSMC bus which shares the same I/Os with the CAN1 bus. Jumper settings:</p><pre><code>JP1: Connect PE4 to SRAM as A20
JP2: onnect PE3 to SRAM as A19
</code></pre><p>JP3 and JP10 must not be fitted for SRAM and LCD application. JP3 and JP10 select CAN1 or CAN2 if fitted; neither if not fitted.</p><p>The on-board SRAM can be configured by setting:</p><pre><code>CONFIG_STM32_FSMC=y
CONFIG_STM32_EXTERNAL_RAM=y
CONFIG_HEAP2_BASE=0x64000000
CONFIG_HEAP2_SIZE=2097152
CONFIG_MM_REGIONS=2
</code></pre><h3 id="sram-configurations" tabindex="-1">SRAM Configurations <a class="header-anchor" href="#sram-configurations" aria-label="Permalink to &quot;SRAM Configurations&quot;">​</a></h3><p>There are 2 possible SRAM configurations:</p><pre><code>Configuration 1. System SRAM (only)
                 CONFIG_MM_REGIONS == 1
Configuration 2. System SRAM and FSMC SRAM
                 CONFIG_MM_REGIONS == 2
                 CONFIG_STM32_EXTERNAL_RAM defined
</code></pre><h2 id="i-o-expanders" tabindex="-1">I/O Expanders <a class="header-anchor" href="#i-o-expanders" aria-label="Permalink to &quot;I/O Expanders&quot;">​</a></h2><p>The STM3220G-EVAL has two STMPE811QTR I/O expanders on board both connected to the STM32 via I2C1. They share a common interrupt line: PI2.</p><p>STMPE811 U24, I2C address 0x41 (7=bit)</p><p>+------------------+---------+------------------+------------------+ | STPE11 | PIN | BOARD SIGNAL | BOARD CONNECTION | +==================+=========+==================+==================+ | Y- | . | TouchScreen_Y- | LCD Connector XL | +------------------+---------+------------------+------------------+ | X- | . | TouchScreen_X- | LCD Connector XR | +------------------+---------+------------------+------------------+ | Y+ | . | TouchScreen_Y+ | LCD Connector XD | +------------------+---------+------------------+------------------+ | X+ IN3 IN2 IN1 | ### | TouchScreen_X+ | LCD Connector XU | | IN0 | # . {#s | EXP_IO9 | | | | ection} | EXP_IO10 | | | | | EXP_IO11 | | | | ##### | EXP_IO12 | | | | . {#sec | | | | | tion-1} | | | +------------------+---------+------------------+------------------+</p><p>STMPE811 U29, I2C address 0x44 (7-bit)</p><p>+----------------+----------------+----------------+----------------+ | STPE11 | PIN | BOARD SIGNAL | BOARD | | | | | CONNECTION | +================+================+================+================+ | Y-X-Y+ X+ IN3 | #### | EXP_IO1 | | | | | EXP_IO3 | | | | #### | EXP_IO4 | | | | | EXP_IO6 | | | | ##### | EXP_IO7 | | +----------------+----------------+----------------+----------------+</p><h2 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h2><p>Each STM3220G-EVAL configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh stm3220g-eval:&lt;subdir&gt;
</code></pre><p>Where &lt;subdir&gt; is one of the following:</p><h3 id="dhcpd" tabindex="-1">dhcpd: <a class="header-anchor" href="#dhcpd" aria-label="Permalink to &quot;dhcpd:&quot;">​</a></h3><p>This builds the DHCP server using the apps/examples/dhcpd application (for execution from FLASH.) See apps/examples/README.txt for information about the dhcpd example.</p><p>NOTES:</p><ol><li><p>This configuration uses the mconf-based configuration tool. To change this configurations using that tool, you should:</p><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository. b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</p></li><li><p>The server address is 10.0.0.1 and it serves IP addresses in the range 10.0.0.2 through 10.0.0.17 (all of which, of course, are configurable).</p></li><li><p>Default build environment (also easily reconfigured):</p><pre><code>CONFIG_HOST_WINDOWS=y
CONFIG_WINDOWS_CYGWIN=y
CONFIG_ARM_TOOLCHAIN_GNU_EABI=y
</code></pre></li></ol><h3 id="nettest" tabindex="-1">nettest: <a class="header-anchor" href="#nettest" aria-label="Permalink to &quot;nettest:&quot;">​</a></h3><p>This configuration directory may be used to verify networking performance using the STM32&#39;s Ethernet controller. It uses apps/examples/nettest to exercise the TCP/IP network.:</p><pre><code>CONFIG_EXAMPLES_NETTEST_SERVER=n                       : Target is configured as the client
CONFIG_EXAMPLES_NETTEST_PERFORMANCE=y                  : Only network performance is verified.
CONFIG_EXAMPLES_NETTEST_IPADDR=(10&lt;&lt;24|0&lt;&lt;16|0&lt;&lt;8|2)   : Target side is IP: 10.0.0.2
CONFIG_EXAMPLES_NETTEST_DRIPADDR=(10&lt;&lt;24|0&lt;&lt;16|0&lt;&lt;8|1) : Host side is IP: 10.0.0.1
CONFIG_EXAMPLES_NETTEST_CLIENTIP=(10&lt;&lt;24|0&lt;&lt;16|0&lt;&lt;8|1) : Server address used by which ever is client.
</code></pre><p>NOTES:</p><ol><li><p>This configuration uses the mconf-based configuration tool. To change this configuration using that tool, you should:</p><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository. b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</p></li><li><p>Default build environment:</p><pre><code>CONFIG_HOST_WINDOWS=y                    : Windows
CONFIG_WINDOWS_CYGWIN=y                  : Under Cygwin
CONFIG_ARM_TOOLCHAIN_GNU_EABI=y       : GNU EABI toolchain for Windows

Than can, of course, be easily changes by reconfiguring per Note 1.
</code></pre></li></ol><h3 id="nsh" tabindex="-1">nsh: <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh:&quot;">​</a></h3><p>Configures the NuttShell (nsh) located at apps/examples/nsh. The Configuration enables both the serial and telnet NSH interfaces.:</p><pre><code>CONFIG_ARM_TOOLCHAIN_GNU_EABI=y            : GNU EABI toolchain for Windows
CONFIG_NSH_DHCPC=n                            : DHCP is disabled
CONFIG_NSH_IPADDR=(192&lt;&lt;24|168&lt;&lt;16|13&lt;&lt;8|161) : Target IP address 192.168.8.161
CONFIG_NSH_DRIPADDR=(192&lt;&lt;24|168&lt;&lt;16|13&lt;&lt;8|1) : Host IP address 192.168.8.1
</code></pre><p>NOTES:</p><ol><li><p>This configuration uses the mconf-based configuration tool. To change this configurations using that tool, you should:</p><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository. b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</p></li><li><p>This example assumes that a network is connected. During its initialization, it will try to negotiate the link speed. If you have no network connected when you reset the board, there will be a long delay (maybe 30 seconds?) before anything happens. That is the timeout before the networking finally gives up and decides that no network is available.</p></li><li><p>This example supports the ADC test (apps/examples/adc) but this must be manually enabled by selecting:</p><pre><code>CONFIG_ADC=y             : Enable the generic ADC infrastructure
CONFIG_STM32_ADC3=y      : Enable ADC3
CONFIG_STM32_TIM1=y      : Enable Timer 1
CONFIG_STM32_TIM1_ADC=y  : Indicate that timer 1 will be used to trigger an ADC
CONFIG_STM32_TIM1_ADC3=y : Assign timer 1 to drive ADC3 sampling
CONFIG_STM32_ADC3_SAMPLE_FREQUENCY=100 : Select a sampling frequency

See also apps/examples/README.txt

General debug for analog devices (ADC/DAC)::

CONFIG_DEBUG_ANALOG
</code></pre></li><li><p>This example supports the PWM test (apps/examples/pwm) but this must be manually enabled by selecting eeither:</p><pre><code>CONFIG_PWM=y                : Enable the generic PWM infrastructure
CONFIG_PWM_PULSECOUNT=n     : Disable to support for TIM1/8 pulse counts
CONFIG_STM32_TIM4=y         : Enable TIM4
CONFIG_STM32_TIM4_PWM=y     : Use TIM4 to generate PWM output
CONFIG_STM32_TIM4_CHANNEL=2 : Select output on TIM4, channel 2
</code></pre><p>If CONFIG_STM32_FSMC is disabled, output will appear on CN3, pin 32. Ground is available on CN3, pin1.</p><p>Or..:</p><pre><code>CONFIG_PWM=y                : Enable the generic PWM infrastructure
CONFIG_PWM_PULSECOUNT=y     : Enable to support for TIM1/8 pulse counts
CONFIG_STM32_TIM8=y         : Enable TIM8
CONFIG_STM32_TIM8_PWM=y     : Use TIM8 to generate PWM output
CONFIG_STM32_TIM8_CHANNEL=4 : Select output on TIM8, channel 4
</code></pre><p>If CONFIG_STM32_FSMC is disabled, output will appear on CN3, pin 17 Ground is available on CN23 pin1.</p><p>See also include/board.h and apps/examples/README.txt</p><p>Special PWM-only debug options:</p><pre><code>CONFIG_DEBUG_PWM_INFO
</code></pre></li></ol><p>5. This example supports the CAN loopback test (apps/examples/can) but this must be manually enabled by selecting:</p><pre><code>CONFIG_CAN=y             : Enable the generic CAN infrastructure
CONFIG_CAN_EXTID=y or n  : Enable to support extended ID frames
CONFIG_STM32_CAN1=y      : Enable CAN1
CONFIG_CAN_LOOPBACK=y    : Enable CAN loopback mode

See also apps/examples/README.txt

Special CAN-only debug options::

CONFIG_DEBUG_CAN_INFO
CONFIG_STM32_CAN_REGDEBUG
</code></pre><p>6. This example can support an FTP client. In order to build in FTP client support simply reconfigure NuttX, adding:</p><pre><code>CONFIG_NETUTILS_FTPC=y
CONFIG_EXAMPLES_FTPC=y
</code></pre><p>7. This example can support an FTP server. In order to build in FTP server support simply add the following lines in the NuttX configuration file:</p><pre><code>CONFIG_NETUTILS_FTPD=y
CONFIG_EXAMPLES_FTPD=y
</code></pre><p>8. This example supports the watchdog timer test (apps/examples/watchdog) but this must be manually enabled by selecting:</p><pre><code>CONFIG_WATCHDOG=y         : Enables watchdog timer driver support
CONFIG_STM32_WWDG=y       : Enables the WWDG timer facility, OR
CONFIG_STM32_IWDG=y       : Enables the IWDG timer facility (but not both)

The WWDG watchdog is driven off the (fast) 42MHz PCLK1 and, as result,
has a maximum timeout value of 49 milliseconds.  For WWDG watchdog, you
should also add the following to the configuration file::

CONFIG_EXAMPLES_WATCHDOG_PINGDELAY=20
CONFIG_EXAMPLES_WATCHDOG_TIMEOUT=49

The IWDG timer has a range of about 35 seconds and should not be an issue.
</code></pre><ol start="9"><li>Adding LCD and graphics support:</li></ol><p>Enable the application configurations that you want to use. As examples:</p><pre><code>CONFIG_EXAMPLES_NX=y      : Pick one or more
CONFIG_EXAMPLES_NXHELLO=y :
CONFIG_EXAMPLES_NXIMAGE=y :
CONFIG_EXAMPLES_NXLINES=y :

defconfig (nuttx/.config)::

CONFIG_STM32_FSMC=y       : FSMC support is required for the LCD
CONFIG_NX=y               : Enable graphics support
CONFIG_MM_REGIONS=2       : When FSMC is enabled, so is the on-board SRAM memory region
</code></pre><ol start="10"><li><p>USB OTG FS Device or Host Support:</p><pre><code>CONFIG_USBDEV             : Enable USB device support, OR
CONFIG_USBHOST            : Enable USB host support (but not both)

CONFIG_STM32_OTGFS        : Enable the STM32 USB OTG FS block
CONFIG_STM32_SYSCFG       : Needed for all USB OTF FS support

CONFIG_SCHED_WORKQUEUE    : Worker thread support is required for the mass
                            storage class (both host and device).
CONFIG_NSH_ARCHINIT       : Architecture specific USB initialization
                            is needed
</code></pre></li><li><p>This configuration requires that jumper JP22 be set to enable RS-232 operation.</p></li></ol><h3 id="nsh2" tabindex="-1">nsh2: <a class="header-anchor" href="#nsh2" aria-label="Permalink to &quot;nsh2:&quot;">​</a></h3><p>This is an alternative NSH configuration. One limitation of the STM3220G-EVAL board is that you cannot have both a UART-based NSH console and SDIO support. The nsh2 differs from the nsh configuration in the following ways:</p><pre><code>-CONFIG_STM32_USART3=y      : USART3 is disabled
+CONFIG_STM32_USART3=n

-CONFIG_STM32_SDIO=n        : SDIO is enabled
+CONFIG_STM32_SDIO=y
</code></pre><p>Logically, these are the only differences: This configuration has SDIO (and the SD card) enabled and the serial console disabled. There is ONLY a Telnet console!.</p><p>There are some special settings to make life with only a Telnet:</p><pre><code>CONFIG_RAMLOG=y - Enable the RAM-based logging feature.
CONFIG_CONSOLE_SYSLOG=y - Use the RAM logger as the default console.
  This means that any console output from non-Telnet threads will
  go into the circular buffer in RAM.
CONFIG_RAMLOG_SYSLOG - This enables the RAM-based logger as the
  system logger.  This means that (1) in addition to the console
  output from other tasks, ALL of the debug output will also to
  to the circular buffer in RAM, and (2) NSH will now support a
  command called &#39;dmesg&#39; that can be used to dump the RAM log.
</code></pre><p>There are a few other configuration differences as necessary to support this different device configuration. Just the do the &#39;diff&#39; if you are curious.</p><p>NOTES:</p><ol><li><p>This configuration uses the mconf-based configuration tool. To change this configurations using that tool, you should:</p><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository. b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</p></li><li><p>See the notes for the nsh configuration. Most also apply to the nsh2 configuration.</p></li><li><p>RS-232 is disabled, but Telnet is still available for use as a console. Since RS-232 and SDIO use the same pins (one controlled by JP22), RS232 and SDIO cannot be used concurrently.</p></li><li><p>This configuration requires that jumper JP22 be set to enable SDIO operation. To enable MicroSD Card, which shares same I/Os with RS-232, JP22 is not fitted.</p></li><li><p>In order to use SDIO without overruns, DMA must be used.</p></li><li><p>Another SDIO/DMA issue. This one is probably a software bug. This is the bug as stated in the TODO list:</p><p>&quot;If you use a large I/O buffer to access the file system, then the MMCSD driver will perform multiple block SD transfers. With DMA ON, this seems to result in CRC errors detected by the hardware during the transfer. Workaround: CONFIG_MMCSD_MULTIBLOCK_LIMIT=1&quot;</p><p>For this reason, CONFIG_MMCSD_MULTIBLOCK_LIMIT=1 appears in the defconfig file.</p></li><li><p>Another DMA-related concern. I see this statement in the reference manual: &quot;The burst configuration has to be selected in order to respect the AHB protocol, where bursts must not cross the 1 KB address boundary because the minimum address space that can be allocated to a single slave is 1 KB. This means that the 1 KB address boundary should not be crossed by a burst block transfer, otherwise an AHB error would be generated, that is not reported by the DMA registers.&quot;</p><p>There is nothing in the DMA driver to prevent this now.</p></li></ol><h3 id="nxwm" tabindex="-1">nxwm: <a class="header-anchor" href="#nxwm" aria-label="Permalink to &quot;nxwm:&quot;">​</a></h3><p>This is a special configuration setup for the NxWM window manager UnitTest. The NxWM window manager can be found here:</p><pre><code>apps/graphics/NxWidgets/nxwm
</code></pre><p>The NxWM unit test can be found at:</p><pre><code>apps/graphics/NxWidgets/UnitTests/nxwm
</code></pre><p>NOTES:</p><ol><li>This configuration uses the mconf-based configuration tool. To change this configuration using that tool, you should: a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository. b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</li><li>This configuration is currently set up to build under Cygwin on a Windows machine using the ARM EABI GCC Windows toolchain. That configuration can be easy changed as described in Note 1.</li></ol><h3 id="telnetd" tabindex="-1">telnetd: <a class="header-anchor" href="#telnetd" aria-label="Permalink to &quot;telnetd:&quot;">​</a></h3><p>A simple test of the Telnet daemon(see apps/netutils/README.txt, apps/examples/README.txt, and apps/examples/telnetd). This is the same daemon that is used in the nsh configuration so if you use NSH, then you don&#39;t care about this. This test is good for testing the Telnet daemon only because it works in a simpler environment than does the nsh configuration.</p><p>NOTES:</p><ol><li><p>This configuration uses the mconf-based configuration tool. To change this configurations using that tool, you should:</p><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository. b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</p></li><li><p>Default build environment (easily reconfigured):</p><pre><code>CONFIG_HOST_WINDOWS=y
CONFIG_WINDOWS_CYGWIN=y
CONFIG_ARM_TOOLCHAIN_GNU_EABI=y
</code></pre></li></ol>`,99)]))}const N=t(i,[["render",s]]);export{u as __pageData,N as default};
