import{_ as t,c as n,al as o,o as i}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"ST STM3240G-EVAL","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/stm32f4/boards/stm3240g-eval/index.md","filePath":"en/platforms/arm/stm32f4/boards/stm3240g-eval/index.md"}'),a={name:"en/platforms/arm/stm32f4/boards/stm3240g-eval/index.md"};function s(r,e,l,d,h,c){return i(),n("div",null,e[0]||(e[0]=[o(`<h1 id="st-stm3240g-eval" tabindex="-1">ST STM3240G-EVAL <a class="header-anchor" href="#st-stm3240g-eval" aria-label="Permalink to &quot;ST STM3240G-EVAL&quot;">​</a></h1><p>chip:stm32, chip:stm32f4, chip:stm32f407, ethernet</p><p>This page discusses issues unique to NuttX configurations for the STMicro STM3240G-EVAL development board.</p><h2 id="ethernet" tabindex="-1">Ethernet <a class="header-anchor" href="#ethernet" aria-label="Permalink to &quot;Ethernet&quot;">​</a></h2><p>The Ethernet driver is configured to use the MII interface:</p><p>Board Jumper Settings:</p><pre><code>Jumper  Description
JP8     To enable MII, JP8 should not be fitted.
JP6     2-3: Enable MII interface mode
JP5     2-3: Provide 25 MHz clock for MII or 50 MHz clock for RMII by MCO at PA8
SB1     Not used with MII
</code></pre><h2 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h2><p>The STM3240G-EVAL board has four LEDs labeled LD1, LD2, LD3 and LD4 on the board.. These LEDs are not used by the board port unless CONFIG_ARCH_LEDS is defined. In that case, the usage by the board port is defined in include/board.h and src/up_leds.c. The LEDs are used to encode OS-relatedevents as follows:</p><pre><code>SYMBOL               Meaning                 LED1[1]   LED2    LED3    LED4
-------------------  ----------------------- ------- ------- ------- ------
LED_STARTED          NuttX has been started  ON      OFF     OFF     OFF
LED_HEAPALLOCATE     Heap has been allocated OFF     ON      OFF     OFF
LED_IRQSENABLED      Interrupts enabled      ON      ON      OFF     OFF
LED_STACKCREATED     Idle stack created      OFF     OFF     ON      OFF
LED_INIRQ            In an interrupt[2]       ON      N/C     N/C     OFF
LED_SIGNAL           In a signal handler[3]  N/C     ON      N/C     OFF
LED_ASSERTION        An assertion failed     ON      ON      N/C     OFF
LED_PANIC            The system has crashed  N/C     N/C     N/C     ON
LED_IDLE             STM32 is is sleep mode  (Optional, not used)
</code></pre><p>[1] If LED1, LED2, LED3 are statically on, then NuttX probably failed to boot and these LEDs will give you some indication of where the failure was</p><p>[2] The normal state is LED3 ON and LED1 faintly glowing. This faint glow is because of timer interrupts that result in the LED being illuminated on a small proportion of the time.</p><p>[3] LED2 may also flicker normally if signals are processed.</p><h2 id="pwm" tabindex="-1">PWM <a class="header-anchor" href="#pwm" aria-label="Permalink to &quot;PWM&quot;">​</a></h2><p>The STM3240G-Eval has no real on-board PWM devices, but the board can be configured to output a pulse train using timer output pins. The following pins have been use to generate PWM output (see board.h for some other candidates):</p><p>TIM4 CH2. Pin PD13 is used by the FSMC (FSMC_A18) and is also connected to the Motor Control Connector (CN5) just for this purpose. If FSMC is not enabled, then FSMC_A18 will not be used (and will be tri-stated from the LCD).</p><p>CONFIGURATION:</p><pre><code>CONFIG_STM32_TIM4=y
CONFIG_PWM=n
CONFIG_PWM_PULSECOUNT=n
CONFIG_STM32_TIM4_PWM=y
CONFIG_STM32_TIM4_CHANNEL=2
</code></pre><p>ACCESS:</p><pre><code>Daughter board Extension Connector, CN3, pin 32
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
</code></pre><p>CAN signals are then available on CN10 pins::</p><pre><code>CN10 Pin 7 = CANH
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
CONFIG_MM_REGIONS=2 (or =3, see below)
</code></pre><h3 id="configuration-options" tabindex="-1">Configuration Options <a class="header-anchor" href="#configuration-options" aria-label="Permalink to &quot;Configuration Options&quot;">​</a></h3><p>Internal SRAM is available in all members of the STM32 family. The F4 family also contains internal CCM SRAM. This SRAM is different because it cannot be used for DMA. So if DMA needed, then the following should be defined to exclude CCM SRAM from the heap:</p><pre><code>CONFIG_STM32_CCMEXCLUDE    : Exclude CCM SRAM from the HEAP
</code></pre><p>In addition to internal SRAM, SRAM may also be available through the FSMC. In order to use FSMC SRAM, the following additional things need to be present in the NuttX configuration file:</p><pre><code>CONFIG_STM32_FSMC=y         : Enables the FSMC
CONFIG_STM32_EXTERNAL_RAM=y : Indicates that SRAM is available via the
                              FSMC (as opposed to an LCD or FLASH).
CONFIG_HEAP2_BASE           : The base address of the SRAM in the FSMC
                             address space
CONFIG_HEAP2_SIZE           : The size of the SRAM in the FSMC
                              address space
CONFIG_MM_REGIONS           : Must be set to a large enough value to
                              include the FSMC SRAM
</code></pre><h3 id="sram-configurations" tabindex="-1">SRAM Configurations <a class="header-anchor" href="#sram-configurations" aria-label="Permalink to &quot;SRAM Configurations&quot;">​</a></h3><p>There are 4 possible SRAM configurations:</p><pre><code>Configuration 1. System SRAM (only)
                 CONFIG_MM_REGIONS == 1
                 CONFIG_STM32_EXTERNAL_RAM NOT defined
                 CONFIG_STM32_CCMEXCLUDE defined
Configuration 2. System SRAM and CCM SRAM
                 CONFIG_MM_REGIONS == 2
                 CONFIG_STM32_EXTERNAL_RAM NOT defined
                 CONFIG_STM32_CCMEXCLUDE NOT defined
Configuration 3. System SRAM and FSMC SRAM
                 CONFIG_MM_REGIONS == 2
                 CONFIG_STM32_EXTERNAL_RAM defined
                 CONFIG_STM32_CCMEXCLUDE defined
Configuration 4. System SRAM, CCM SRAM, and FSMC SRAM
                 CONFIG_MM_REGIONS == 3
                 CONFIG_STM32_ETXERNAL_RAM defined
                 CONFIG_STM32_CCMEXCLUDE NOT defined
</code></pre><h2 id="i-o-expanders" tabindex="-1">I/O Expanders <a class="header-anchor" href="#i-o-expanders" aria-label="Permalink to &quot;I/O Expanders&quot;">​</a></h2><p>The STM3240G-EVAL has two STMPE811QTR I/O expanders on board both connected to the STM32 via I2C1. They share a common interrupt line: PI2.</p><p>STMPE811 U24, I2C address 0x41 (7-bit)</p><p>+-------------------+-----+-------------------+-------------------+ | STPE11 | PIN | BOARD SIGNAL | BOARD CONNECTION | +===================+=====+===================+===================+ | &gt; Y-X-Y+ X+ IN3 | | TouchScreen | LCD Connector XL | | &gt; IN2 IN1 IN0 | | _Y-TouchScreen_ | LCD Connector XR | | | | X-TouchScreen_Y+ | LCD Connector XD | | | | TouchScreen_X+ | LCD Connector XU | | | | EXP_IO9 | | | | | EXP_IO10 | | | | | EXP_IO11 | | | | | EXP_IO12 | | +-------------------+-----+-------------------+-------------------+</p><p>STMPE811 U29, I2C address 0x44 (7-bit)</p><p>+-------------------+-----+-------------------+------------------+ | STPE11 | PIN | BOARD SIGNAL | BOARD CONNECTION | +===================+=====+===================+==================+ | &gt; Y-X-Y+ X+ IN3 | | EXP_IO1 EXP_IO2 | | | &gt; IN2 IN1 IN0 | | EXP_IO3 EXP_IO4 | | | | | EXP_IO5 EXP_IO6 | | | | | EXP_IO7 EXP_IO8 | | +-------------------+-----+-------------------+------------------+</p><h2 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h2><p>Each STM3240G-EVAL configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh stm3240g-eval:&lt;subdir&gt;
</code></pre><p>Where &lt;subdir&gt; is one of the following:</p><h3 id="dhcpd" tabindex="-1">dhcpd <a class="header-anchor" href="#dhcpd" aria-label="Permalink to &quot;dhcpd&quot;">​</a></h3><p>This builds the DHCP server using the apps/examples/dhcpd application (for execution from FLASH.) See apps/examples/README.txt for information about the dhcpd example.</p><p>NOTES:</p><ol><li></li></ol><pre><code>This configuration uses the mconf-based configuration tool. To

:   change this configurations using that tool, you should:

    a.  Build and install the kconfig-mconf tool. See
        nuttx/README.txt see additional README.txt files in the
        NuttX tools repository.
    b.  Execute \\&#39;make menuconfig\\&#39; in nuttx/ in order to start the
        reconfiguration process.
</code></pre><ol start="2"><li></li></ol><pre><code>The server address is 10.0.0.1 and it serves IP addresses in the range

:   10.0.0.2 through 10.0.0.17 (all of which, of course, are
    configurable).
</code></pre><ol start="3"><li><p>Default build environment (also easily reconfigured):</p><pre><code>CONFIG_HOST_WINDOWS=y
CONFIG_WINDOWS_CYGWIN=y
CONFIG_ARM_TOOLCHAIN_GNU_EABI=y
</code></pre></li></ol><h3 id="discover" tabindex="-1">discover <a class="header-anchor" href="#discover" aria-label="Permalink to &quot;discover&quot;">​</a></h3><p>This configuration exercises netutils/discover utility using apps/examples/discover. This example initializes and starts the UDP discover daemon. This daemon is useful for discovering devices in local networks, especially with DHCP configured devices. It listens for UDP broadcasts which also can include a device class so that groups of devices can be discovered. It is also possible to address all classes with a kind of broadcast discover.</p><p>Configuration settings that you may need to change for your environment:</p><pre><code>CONFIG_ARM_TOOLCHAIN_GNU_EABI=y      - GNU EABI toolchain for Linux
CONFIG_EXAMPLES_DISCOVER_DHCPC=y        - DHCP Client
CONFIG_EXAMPLES_DISCOVER_IPADDR         - (not defined)
CONFIG_EXAMPLES_DISCOVER_DRIPADDR       - Router IP address
</code></pre><p>NOTE: This configuration uses to the kconfig-mconf configuration tool to control the configuration. See the section entitled &quot;NuttX Configuration Tool&quot; in the top-level README.txt file.</p><h3 id="fb" tabindex="-1">fb <a class="header-anchor" href="#fb" aria-label="Permalink to &quot;fb&quot;">​</a></h3><p>A simple NSH configuration used for some basic (non-graphic) debug of the framebuffer character driver at drivers/video/fb.c. NOTE that the STM3240G-EVAL LCD driver does not support a framebuffer! It interfaces with the LCD through a parallel FSMC interface. This configuration uses the LCD framebuffer front end at drivers/lcd/lcd_framebuffer to convert the LCD interface into a compatible framebuffer interface.</p><p>This examples supports the framebuffer test at apps/examples/fb. That test simply draws a pattern into the framebuffer and updates the LCD.</p><p>This example also supports the pdcurses library at apps/graphics/pdcurses and the demo programs at apps/examples/pdcurses. This is a good test of the use of the framebuffer driver in an application. Many of the pdcurses demos requires user interaction via a mouse, keyboard, or joystick. No input devices are currently present in the configuration so no such interaction is possible.</p><p>The STM3240G-EVAL does provide a on-board discrete joystick (djoystick) that could be used for this interaction. However, those discrete inputs do not go directly to the STM32 but rather go indirectly through an I/O expander. I just have not had the motivation to deal with that yet.</p><p>STATUS: 2017-09-17: This configuration appears to be fully functional. 2017-11-25: Non-interactive pdcurses examples added.</p><h3 id="knxwm" tabindex="-1">knxwm <a class="header-anchor" href="#knxwm" aria-label="Permalink to &quot;knxwm&quot;">​</a></h3><p>This is identical to the nxwm configuration below except that NuttX is built as a kernel-mode, monolithic module and the user applications are built separately. Is is recommended to use a special make command; not just &#39;make&#39; but make with the following two arguments:</p><pre><code>make pass1 pass2
</code></pre><p>In the normal case (just &#39;make&#39;), make will attempt to build both user-and kernel-mode blobs more or less interleaved. This actual works! However, for me it is very confusing so I prefer the above make command: Make the user-space binaries first (pass1), then make the kernel-space binaries (pass2)</p><p>NOTES:</p><ol><li></li></ol><pre><code>This configuration uses the mconf-based configuration tool. To

:   change this configuration using that tool, you should:

    a.  Build and install the kconfig-mconf tool. See
        nuttx/README.txt see additional README.txt files in the
        NuttX tools repository.
    b.  Execute \\&#39;make menuconfig\\&#39; in nuttx/ in order to start the
        reconfiguration process.
</code></pre><ol start="2"><li><p>This is the default platform/toolchain in the configuration:</p><blockquote><p>CONFIG_HOST_WINDOWS=y : Windows CONFIG_WINDOWS_CYGWIN=y : Cygwin environment on Windows CONFIG_ARM_TOOLCHAIN_BUILDROOT=y : NuttX EABI buildroot toolchain CONFIG_ARCH_SIZET_LONG=y : size_t is long (maybe?)</p><p>This is easily changed by modifying the configuration.</p></blockquote></li><li></li></ol><pre><code>In addition to the protected mode build, this NxWM configuration

:   differences from the nxwm configuration in that:

    a.  Networking is disabled. There are issues with some of the
        network-related NSH commands and with Telnet in the
        protected build (see the top-level TODO file). Without these
        NSH commands, there is no use for networking in this
        configuration.

    b.  The NxTerm windows are disabled. There are also issues with
        the NxTerm build now.

        NOTE: Those issues have been resolved. However, this
        configuration has not yet be re-verified with NxTerm
        enabled.

    c.  The initialization sequence is quite different: NX and the
        touchscreen are initialized in kernel mode by logic in this
        src/ directory before the NxWM application is started.
</code></pre><ol start="4"><li></li></ol><pre><code>At the end of the build, there will be several files in the top-level

:   NuttX build directory:

    PASS1:

    :   nuttx\\_user.elf - The pass1 user-space ELF file
        nuttx\\_user.hex - The pass1 Intel HEX format file (selected
        in defconfig) User.map - Symbols in the user-space ELF file

    PASS2:

    :   nuttx - The pass2 kernel-space ELF file nuttx.hex - The
        pass2 Intel HEX file (selected in defconfig) System.map -
        Symbols in the kernel-space ELF file
</code></pre><ol start="5"><li></li></ol><pre><code>Combining .hex files. If you plan to use the STM32 ST-Link Utility to

:   load the .hex files into FLASH, then you need to combine the two
    hex files into a single .hex file. Here is how you can do that.

    a.  The \\&#39;tail\\&#39; of the nuttx.hex file should look something
        like this (with my comments added):

        &gt; \\ tail nuttx.hex \\# 00, data records \\... :10 9DC0 00
        &gt; 01000000000800006400020100001F0004 :10 9DD0 00
        &gt; 3B005A0078009700B500D400F300110151 :08 9DE0 00
        &gt; 30014E016D0100008D \\# 05, Start Linear Address Record :04
        &gt; 0000 05 0800 0419 D2 \\# 01, End Of File record :00 0000 01
        &gt; FF

        Use an editor such as vi to remove the 05 and 01 records.

    b.  The \\&#39;head\\&#39; of the nuttx\\_user.hex file should look
        something like this (again with my comments added):

        &gt; \\ head nuttx\\_user.hex \\# 04, Extended Linear Address
        &gt; Record :02 0000 04 0801 F1 \\# 00, data records :10 8000 00
        &gt; BD89 01084C800108C8110208D01102087E :10 8010 00 0010
        &gt; 00201C1000201C1000203C16002026 :10 8020 00 4D80
        &gt; 01085D80010869800108ED83010829 \\...

        Nothing needs to be done here. The nuttx\\_user.hex file
        should be fine.

    c.  Combine the edited nuttx.hex and un-edited nuttx\\_user.hex
        file to produce a single combined hex file:

        \\ cat nuttx.hex nuttx\\_user.hex \\&gt;combined.hex

    Then use the combined.hex file with the STM32 ST-Link tool. If
    you do this a lot, you will probably want to invest a little
    time to develop a tool to automate these steps.

    STATUS: 2014-10-11: This worked at one time, but today I am
    getting a failure inside of the GCC library. This occurred with
    the computations at the end of touchscreen calibration. The
    NuttX code seems to be working correctly, but there is some
    problem with how the GCC integer math is hooked in??? I did not
    dig into this very deeply.
</code></pre><h3 id="nettest" tabindex="-1">nettest <a class="header-anchor" href="#nettest" aria-label="Permalink to &quot;nettest&quot;">​</a></h3><p>This configuration directory may be used to verify networking performance using the STM32&#39;s Ethernet controller. It uses apps/examples/nettest to exercise the TCP/IP network.:</p><pre><code>CONFIG_ARM_TOOLCHAIN_GNU_EABI=y                     : GNU EABI toolchain for Windows
CONFIG_EXAMPLES_NETTEST_SERVER=n                       : Target is configured as the client
CONFIG_EXAMPLES_NETTEST_PERFORMANCE=y                  : Only network performance is verified.
CONFIG_EXAMPLES_NETTEST_IPADDR=(10&lt;&lt;24|0&lt;&lt;16|0&lt;&lt;8|2)   : Target side is IP: 10.0.0.2
CONFIG_EXAMPLES_NETTEST_DRIPADDR=(10&lt;&lt;24|0&lt;&lt;16|0&lt;&lt;8|1) : Host side is IP: 10.0.0.1
CONFIG_EXAMPLES_NETTEST_CLIENTIP=(10&lt;&lt;24|0&lt;&lt;16|0&lt;&lt;8|1) : Server address used by which ever is client.
</code></pre><p>NOTES:</p><ol><li>This configuration uses the mconf-based configuration tool. To change this configurations using that tool, you should: a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository. b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</li></ol><h3 id="nsh" tabindex="-1">nsh <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh&quot;">​</a></h3><p>Configures the NuttShell (nsh) located at apps/examples/nsh. The Configuration enables both the serial and telnet NSH interfaces.:</p><pre><code>CONFIG_ARM_TOOLCHAIN_GNU_EABI=y         : GNU EABI toolchain for Windows
 CONFIG_NSH_DHCPC=n                        : DHCP is disabled
 CONFIG_NSH_IPADDR=(10&lt;&lt;24|0&lt;&lt;16|0&lt;&lt;8|2)   : Target IP address 10.0.0.2
 CONFIG_NSH_DRIPADDR=(10&lt;&lt;24|0&lt;&lt;16|0&lt;&lt;8|1) : Host IP address 10.0.0.1
</code></pre><p>NOTES:</p><ol><li></li></ol><pre><code>This configuration uses the mconf-based configuration tool. To

:   change this configurations using that tool, you should:

    a.  Build and install the kconfig-mconf tool. See
        nuttx/README.txt see additional README.txt files in the
        NuttX tools repository.
    b.  Execute \\&#39;make menuconfig\\&#39; in nuttx/ in order to start the
        reconfiguration process.
</code></pre><ol start="2"><li></li></ol><pre><code>This example assumes that a network is connected. During its

:   initialization, it will try to negotiate the link speed. If you
    have no network connected when you reset the board, there will
    be a long delay (maybe 30 seconds?) before anything happens.
    That is the timeout before the networking finally gives up and
    decides that no network is available.
</code></pre><ol start="3"><li><p>This example supports the ADC test (apps/examples/adc) but this must be manually enabled by selecting:</p><pre><code>CONFIG_ADC=y             : Enable the generic ADC infrastructure
CONFIG_STM32_ADC3=y      : Enable ADC3
CONFIG_STM32_TIM1=y      : Enable Timer 1
CONFIG_STM32_TIM1_ADC=y  : Indicate that timer 1 will be used to trigger an ADC
CONFIG_STM32_TIM1_ADC3=y : Assign timer 1 to drive ADC3 sampling
CONFIG_STM32_ADC3_SAMPLE_FREQUENCY=100 : Select a sampling frequency

See also apps/examples/README.txt

General debug for analog devices (ADC/DAC):

CONFIG_DEBUG_ANALOG
</code></pre></li><li><p>This example supports the PWM test (apps/examples/pwm) but this must be manually enabled by selecting eeither:</p><pre><code>CONFIG_PWM=y                : Enable the generic PWM infrastructure
CONFIG_PWM_PULSECOUNT=n     : Disable to support for TIM1/8 pulse counts
CONFIG_STM32_TIM4=y         : Enable TIM4
CONFIG_STM32_TIM4_PWM=y     : Use TIM4 to generate PWM output
CONFIG_STM32_TIM4_CHANNEL=2 : Select output on TIM4, channel 2

If CONFIG_STM32_FSMC is disabled, output will appear on CN3, pin 32.
Ground is available on CN3, pin1.

Or..

CONFIG_PWM=y                : Enable the generic PWM infrastructure
CONFIG_PWM_PULSECOUNT=y     : Enable to support for TIM1/8 pulse counts
CONFIG_STM32_TIM8=y         : Enable TIM8
CONFIG_STM32_TIM8_PWM=y     : Use TIM8 to generate PWM output
CONFIG_STM32_TIM8_CHANNEL=4 : Select output on TIM8, channel 4

If CONFIG_STM32_FSMC is disabled, output will appear on CN3, pin 17
Ground is available on CN23 pin1.

See also include/board.h and apps/examples/README.txt

Special PWM-only debug options:

CONFIG_DEBUG_PWM_INFO
</code></pre></li><li><p>This example supports the CAN loopback test (apps/examples/can) but this must be manually enabled by selecting:</p><pre><code>CONFIG_CAN=y             : Enable the generic CAN infrastructure
CONFIG_CAN_EXTID=y or n  : Enable to support extended ID frames
CONFIG_STM32_CAN1=y      : Enable CAN1
CONFIG_CAN_LOOPBACK=y    : Enable CAN loopback mode

See also apps/examples/README.txt

Special CAN-only debug options:

CONFIG_DEBUG_CAN_INFO
CONFIG_STM32_CAN_REGDEBUG
</code></pre></li><li></li></ol><pre><code>This example can support an FTP client. In order to build in FTP client

:   support simply uncomment the following lines in the defconfig
    file (before configuring) or in the .config file (after
    configuring):

    CONFIG\\_NETUTILS\\_FTPC=y CONFIG\\_EXAMPLES\\_FTPC=y
</code></pre><ol start="7"><li></li></ol><pre><code>This example can support an FTP server. In order to build in FTP server

:   support simply add the following lines in the defconfig file
    (before configuring) or in the .config file (after configuring):

    CONFIG\\_NETUTILS\\_FTPD=y CONFIG\\_EXAMPLES\\_FTPD=y
</code></pre><ol start="8"><li></li></ol><pre><code>This example supports the watchdog timer test (apps/examples/watchdog)

:   but this must be manually enabled by selecting:

    CONFIG\\_WATCHDOG=y : Enables watchdog timer driver support
    CONFIG\\_STM32\\_WWDG=y : Enables the WWDG timer facility, OR
    CONFIG\\_STM32\\_IWDG=y : Enables the IWDG timer facility (but not
    both)

    The WWDG watchdog is driven off the (fast) 42MHz PCLK1 and, as
    result, has a maximum timeout value of 49 milliseconds. For WWDG
    watchdog, you should also add the following to the configuration
    file:

    CONFIG\\_EXAMPLES\\_WATCHDOG\\_PINGDELAY=20
    CONFIG\\_EXAMPLES\\_WATCHDOG\\_TIMEOUT=49

    The IWDG timer has a range of about 35 seconds and should not be
    an issue.
</code></pre><ol start="9"><li><p>Adding LCD and graphics support:</p><blockquote><p>defconfig (nuttx/.config):</p><p>CONFIG_EXAMPLES_nx=y : Pick one or more CONFIG_EXAMPLES_nxhello=y : CONFIG_EXAMPLES_nximage : CONFIG_EXAMPLES_nxlines :</p><p>CONFIG_STM32_FSMC=y : FSMC support is required for the LCD CONFIG_NX=y : Enable graphics support CONFIG_MM_REGIONS=3 : When FSMC is enabled, so is the on-board SRAM memory region</p></blockquote></li><li><p>USB OTG FS Device or Host Support</p><blockquote><p>CONFIG_USBDEV : Enable USB device support, OR CONFIG_USBHOST : Enable USB host support CONFIG_STM32_OTGFS : Enable the STM32 USB OTG FS block CONFIG_STM32_SYSCFG : Needed CONFIG_SCHED_WORKQUEUE : Worker thread support is required</p></blockquote></li><li><p>USB OTG FS Host Support. The following changes will enable support for a USB host on the STM32F4Discovery, including support for a mass storage class driver:</p><pre><code>CONFIG_USBDEV=n          : Make sure the USB device support is disabled
CONFIG_USBHOST=y         : Enable USB host support
CONFIG_STM32_OTGFS=y     : Enable the STM32 USB OTG FS block
CONFIG_STM32_SYSCFG=y    : Needed for all USB OTF FS support
CONFIG_SCHED_WORKQUEUE=y : Worker thread support is required for the mass
                          storage class driver.
CONFIG_NSH_ARCHINIT=y    : Architecture specific USB initialization
                          is needed for NSH
CONFIG_FS_FAT=y          : Needed by the USB host mass storage class.
</code></pre><p>With those changes, you can use NSH with a FLASH pen driver as shown belong. Here NSH is started with nothing in the USB host slot:</p><pre><code>NuttShell (NSH) NuttX-x.yy
nsh&gt; ls /dev
/dev:
 console
 null
 ttyS0
</code></pre><p>After inserting the FLASH drive, the /dev/sda appears and can be mounted like this:</p><pre><code>nsh&gt; ls /dev
/dev:
 console
 null
 sda
 ttyS0
nsh&gt; mount -t vfat /dev/sda /mnt/stuff
nsh&gt; ls /mnt/stuff
/mnt/stuff:
 -rw-rw-rw-   16236 filea.c

And files on the FLASH can be manipulated to standard interfaces:

nsh&gt; echo &quot;This is a test&quot; &gt;/mnt/stuff/atest.txt
nsh&gt; ls /mnt/stuff
/mnt/stuff:
 -rw-rw-rw-   16236 filea.c
 -rw-rw-rw-      16 atest.txt
nsh&gt; cat /mnt/stuff/atest.txt
This is a test
nsh&gt; cp /mnt/stuff/filea.c fileb.c
nsh&gt; ls /mnt/stuff
/mnt/stuff:
 -rw-rw-rw-   16236 filea.c
 -rw-rw-rw-      16 atest.txt
 -rw-rw-rw-   16236 fileb.c

To prevent data loss, don&#39;t forget to un-mount the FLASH drive
before removing it:

nsh&gt; umount /mnt/stuff
</code></pre></li><li><p>By default, this configuration supports /dev/random using the STM32&#39;s RNG hardware. This can be disabled as follows:</p><pre><code>-CONFIG_STM32_RNG=y
+CONFIG_STM32_RNG=n

-CONFIG_DEV_RANDOM=y
+CONFIG_DEV_RANDOM=n
</code></pre></li><li><p>This configuration requires that jumper JP22 be set to enable RS-232 operation.</p></li></ol><h3 id="nsh2" tabindex="-1">nsh2 <a class="header-anchor" href="#nsh2" aria-label="Permalink to &quot;nsh2&quot;">​</a></h3><p>This is an alternative NSH configuration. One limitation of the STM3240G-EVAL board is that you cannot have both a UART-based NSH console and SDIO support. The nsh2 differs from the nsh configuration in the following ways:</p><pre><code>-CONFIG_STM32_USART3=y      : USART3 is disabled
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
</code></pre><p>There are a few other configuration differences as necessary to support this different device configuration. Just the do the &#39;diff&#39; if you are curious.</p><p>NOTES:</p><ol><li></li></ol><pre><code>This configuration uses the mconf-based configuration tool. To

:   change this configurations using that tool, you should:

    a.  Build and install the kconfig-mconf tool. See
        nuttx/README.txt see additional README.txt files in the
        NuttX tools repository.
    b.  Execute \\&#39;make menuconfig\\&#39; in nuttx/ in order to start the
        reconfiguration process.
</code></pre><ol start="2"><li></li></ol><pre><code>See the notes for the nsh configuration. Most also apply to the nsh2

:   configuration. Like the nsh configuration, this configuration
    can be modified to support a variety of additional tests.
</code></pre><ol start="3"><li></li></ol><pre><code>RS-232 is disabled, but Telnet is still available for use as a console.

:   Since RS-232 and SDIO use the same pins (one controlled by
    JP22), RS232 and SDIO cannot be used concurrently.
</code></pre><ol start="4"><li></li></ol><pre><code>This configuration requires that jumper JP22 be set to enable SDIO

:   operation. To enable MicroSD Card, which shares same I/Os with
    RS-232, JP22 is not fitted.
</code></pre><ol start="5"><li></li></ol><pre><code>In order to use SDIO without overruns, DMA must be used. The STM32 F4

:   has 192Kb of SRAM in two banks: 112Kb of \\&quot;system\\&quot; SRAM located
    at 0x2000:0000 and 64Kb of \\&quot;CCM\\&quot; SRAM located at 0x1000:0000.
    It appears that you cannot perform DMA from CCM SRAM. The work
    around that I have now is simply to omit the 64Kb of CCM SRAM
    from the heap so that all memory is allocated from System SRAM.
    This is done by setting:

    CONFIG\\_MM\\_REGIONS=1

    Then DMA works fine. The downside is, of course, is that we lose
    64Kb of precious SRAM.
</code></pre><ol start="6"><li></li></ol><pre><code>Another SDIO/DMA issue. This one is probably a software bug. This is

:   the bug as stated in the TODO list:

    \\&quot;If you use a large I/O buffer to access the file system, then the

    :   MMCSD driver will perform multiple block SD transfers. With
        DMA ON, this seems to result in CRC errors detected by the
        hardware during the transfer. Workaround:
        CONFIG\\_MMCSD\\_MULTIBLOCK\\_LIMIT=1\\&quot;

    For this reason, CONFIG\\_MMCSD\\_MULTIBLOCK\\_LIMIT=1 appears in
    the defconfig file.
</code></pre><ol start="7"><li></li></ol><pre><code>Another DMA-related concern. I see this statement in the reference

:   manual: \\&quot;The burst configuration has to be selected in order to
    respect the AHB protocol, where bursts must not cross the 1 KB
    address boundary because the minimum address space that can be
    allocated to a single slave is 1 KB. This means that the 1 KB
    address boundary should not be crossed by a burst block
    transfer, otherwise an AHB error would be generated, that is not
    reported by the DMA registers.\\&quot;

    There is nothing in the DMA driver to prevent this now.
</code></pre><h3 id="nxterm" tabindex="-1">nxterm <a class="header-anchor" href="#nxterm" aria-label="Permalink to &quot;nxterm&quot;">​</a></h3><p>This is yet another NSH configuration. This NSH configuration differs from the others, however, in that it uses the NxTerm driver to host the NSH shell.</p><p>NOTES:</p><ol><li></li></ol><pre><code>This configuration uses the mconf-based configuration tool. To

:   change this configurations using that tool, you should:

    a.  Build and install the kconfig-mconf tool. See
        nuttx/README.txt see additional README.txt files in the
        NuttX tools repository.
    b.  Execute \\&#39;make menuconfig\\&#39; in nuttx/ in order to start the
        reconfiguration process.
</code></pre><ol start="2"><li></li></ol><pre><code>Some of the differences in this configuration and the normal nsh

:   configuration include these settings in the defconfig file:

    These select NX Multi-User mode:

    &gt; CONFG\\_NX\\_MULTIUSER=y CONFIG\\_DISABLE\\_MQUEUE=n

    The following definition in the defconfig file to enables the
    NxTerm driver:

    &gt; CONFIG\\_NXTERM=y

    And this selects examples/nxterm instead of examples/nsh:

    &gt; CONFIG\\_EXAMPLES\\_NXTERM=y

    LCD Orientation:

    &gt; CONFIG\\_LCD\\_LANDSCAPE=y : 320x240 landscape
</code></pre><ol start="3"><li><p>Default build environment (also easily reconfigured):</p><blockquote><p>CONFIG_HOST_WINDOWS=y : Windows CONFIG_WINDOWS_CYGWIN=y : With Cygwin CONFIG_ARM_TOOLCHAIN_GNU_EABI=y : GNU EABI toolchain for Windows</p></blockquote></li></ol><h3 id="nxwm" tabindex="-1">nxwm <a class="header-anchor" href="#nxwm" aria-label="Permalink to &quot;nxwm&quot;">​</a></h3><p>This is a special configuration setup for the NxWM window manager UnitTest. The NxWM window manager can be found here:</p><pre><code>apps/graphics/NxWidgets/nxwm
</code></pre><p>The NxWM unit test can be found at:</p><pre><code>apps/graphics/NxWidgets/UnitTests/nxwm
</code></pre><h3 id="telnetd" tabindex="-1">telnetd <a class="header-anchor" href="#telnetd" aria-label="Permalink to &quot;telnetd&quot;">​</a></h3><p>A simple test of the Telnet daemon(see apps/netutils/README.txt, apps/examples/README.txt, and apps/examples/telnetd). This is the same daemon that is used in the nsh configuration so if you use NSH, then you don&#39;t care about this. This test is good for testing the Telnet daemon only because it works in a simpler environment than does the nsh configuration.</p><p>NOTES:</p><ol><li><p>This configuration uses the mconf-based configuration tool. To change this configurations using that tool, you should:</p><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository. b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</p></li><li><p>Default build environment (easily reconfigured):</p><pre><code>CONFIG_HOST_WINDOWS=y
CONFIG_WINDOWS_CYGWIN=y
CONFIG_ARM_TOOLCHAIN_GNU_EABI=y
</code></pre></li></ol><h3 id="xmlrpc" tabindex="-1">xmlrpc <a class="header-anchor" href="#xmlrpc" aria-label="Permalink to &quot;xmlrpc&quot;">​</a></h3><p>An example configuration for the Embeddable Lightweight XML-RPC Server at apps/examples/xmlrpc. See [<a href="http://www.drdobbs.com/web-development/%5C%5C" target="_blank" rel="noreferrer">http://www.drdobbs.com/web-development/\\\\</a>](<a href="http://www.drdobbs.com/web-development/%5C" target="_blank" rel="noreferrer">http://www.drdobbs.com/web-development/\\</a>) an-embeddable-lightweight-xml-rpc-server/184405364 for more info. Contributed by Max Holtzberg.</p>`,151)]))}const f=t(a,[["render",s]]);export{u as __pageData,f as default};
