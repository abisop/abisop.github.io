import{_ as n,c as t,al as i,o as a}from"./chunks/framework.NFAqBSgQ.js";const c=JSON.parse('{"title":"Shenzhou IV","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/stm32f1/boards/shenzhou/index.md","filePath":"en/platforms/arm/stm32f1/boards/shenzhou/index.md"}'),o={name:"en/platforms/arm/stm32f1/boards/shenzhou/index.md"};function s(r,e,l,p,h,d){return a(),t("div",null,e[0]||(e[0]=[i(`<h1 id="shenzhou-iv" tabindex="-1">Shenzhou IV <a class="header-anchor" href="#shenzhou-iv" aria-label="Permalink to &quot;Shenzhou IV&quot;">​</a></h1><p>chip:stm32, chip:stm32f1, chip:stm32f107</p><p>This page discusses issues unique to NuttX configurations for the Shenzhou IV development board from www.armjishu.com featuring the STMicro STM32F107VCT MCU. As of this writing, there are five models of the Shenzhou board:</p><ol><li>Shenzhou I (STM32F103RB)</li><li>Shenzhou II (STM32F103VC)</li><li>Shenzhou III (STM32F103ZE)</li><li>Shenzhou IV (STM32F107VC)</li><li>Shenzhou king ((STM32F103ZG, core board + IO expansion board)).</li></ol><p>Support is currently provided for the Shenzhou IV only. Features of the Shenzhou IV board include:</p><ul><li><p>STM32F107VCT</p></li><li><p>10/100M PHY (DM9161AEP)</p></li><li><p>TFT LCD Connector</p></li><li><p>USB OTG</p></li><li><p>CAN (CAN1=2)</p></li><li><p>USART connectos (USART1-2)</p></li><li><p>RS-485</p></li><li><p>SD card slot</p></li><li><p>Audio DAC (PCM1770)</p></li><li><p>SPI Flash (W25X16)</p></li><li><p>(4) LEDs (LED1-4)</p></li><li><p>2.4G Wireless (NRF24L01 SPI module)</p></li><li><p>315MHz Wireless (module)</p></li><li><p>(4) Buttons (KEY1-4, USERKEY2, USERKEY, TEMPER, WAKEUP)</p></li><li><p>VBUS/external +4V select</p></li><li><p>5V/3.3V power conversion</p></li><li><p>Extension connector</p></li><li><p>JTAG</p></li></ul><h2 id="stm32f107vct-pin-usage" tabindex="-1">STM32F107VCT Pin Usage <a class="header-anchor" href="#stm32f107vct-pin-usage" aria-label="Permalink to &quot;STM32F107VCT Pin Usage&quot;">​</a></h2><h2 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h2><p>The Shenzhou board has four LEDs labeled LED1, LED2, LED3 and LED4 on the board. These LEDs are not used by the board port unless CONFIG_ARCH_LEDS is defined. In that case, the usage by the board port is defined in include/board.h and src/up_leds.c. The LEDs are used to encode OS-related events as follows:</p><pre><code>SYMBOL               Meaning                 LED1*   LED2    LED3    LED4****
-------------------  ----------------------- ------- ------- ------- ------
LED_STARTED          NuttX has been started  ON      OFF     OFF     OFF
LED_HEAPALLOCATE     Heap has been allocated OFF     ON      OFF     OFF
LED_IRQSENABLED      Interrupts enabled      ON      ON      OFF     OFF
LED_STACKCREATED     Idle stack created      OFF     OFF     ON      OFF
LED_INIRQ            In an interrupt**       ON      N/C     N/C     OFF
LED_SIGNAL           In a signal handler***  N/C     ON      N/C     OFF
LED_ASSERTION        An assertion failed     ON      ON      N/C     OFF
LED_PANIC            The system has crashed  N/C     N/C     N/C     ON
LED_IDLE             STM32 is is sleep mode  (Optional, not used)

* If LED1, LED2, LED3 are statically on, then NuttX probably failed to boot
and these LEDs will give you some indication of where the failure was
** The normal state is LED1 ON and LED1 faintly glowing.  This faint glow
is because of timer interrupts that result in the LED being illuminated
on a small proportion of the time.
*** LED2 may also flicker normally if signals are processed.
**** LED4 may not be available if RS-485 is also used. For RS-485, it will
then indicate the RS-485 direction.
</code></pre><h2 id="shenzhou-specific-configuration-options" tabindex="-1">Shenzhou-specific Configuration Options <a class="header-anchor" href="#shenzhou-specific-configuration-options" aria-label="Permalink to &quot;Shenzhou-specific Configuration Options&quot;">​</a></h2><h2 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h2><p>Each Shenzhou configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh shenzhou:&lt;subdir&gt;
</code></pre><p>Where &lt;subdir&gt; is one of the following:</p><h3 id="nsh" tabindex="-1">nsh <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh&quot;">​</a></h3><p>Configures the NuttShell (nsh) located at apps/examples/nsh. The Configuration enables both the serial and telnet NSH interfaces.:</p><pre><code>CONFIG_ARM_TOOLCHAIN_GNU_EABI=y        : GNU EABI toolchain for Windows
CONFIG_NSH_DHCPC=n                        : DHCP is disabled
CONFIG_NSH_IPADDR=0x0a000002              : Target IP address 10.0.0.2
CONFIG_NSH_DRIPADDR=0x0a000001            : Host IP address 10.0.0.1
</code></pre><p>NOTES:</p><ol><li><p>This example assumes that a network is connected. During its initialization, it will try to negotiate the link speed. If you have no network connected when you reset the board, there will be a long delay (maybe 30 seconds?) before anything happens. That is the timeout before the networking finally gives up and decides that no network is available.</p></li><li><p>Enabling the ADC example:</p><p>The only internal signal for ADC testing is the potentiometer input:</p><pre><code>ADC1_IN10(PC0) Potentiometer
</code></pre><p>External signals are also available on CON5 CN14:</p><pre><code>ADC_IN8 (PB0) CON5 CN14 Pin2
ADC_IN9 (PB1) CON5 CN14 Pin1
</code></pre><p>The signal selection is hard-coded in boards/arm/stm32/shenzhou/src/up_adc.c: The potentiometer input (only) is selected.</p><p>These selections will enable sampling the potentiometer input at 100Hz using Timer 1:</p><pre><code>CONFIG_ANALOG=y                        : Enable analog device support
CONFIG_ADC=y                           : Enable generic ADC driver support
CONFIG_ADC_DMA=n                       : ADC DMA is not supported
CONFIG_STM32_ADC1=y                    : Enable ADC 1
CONFIG_STM32_TIM1=y                    : Enable Timer 1
CONFIG_STM32_TIM1_ADC=y                : Use Timer 1 for ADC
CONFIG_STM32_TIM1_ADC1=y               : Allocate Timer 1 to ADC 1
CONFIG_STM32_ADC1_SAMPLE_FREQUENCY=100 : Set sampling frequency to 100Hz
CONFIG_STM32_ADC1_TIMTRIG=0            : Trigger on timer output 0
CONFIG_STM32_FORCEPOWER=y              : Apply power to TIM1 a boot up time
CONFIG_EXAMPLES_ADC=y                  : Enable the apps/examples/adc built-in
</code></pre></li></ol><h3 id="nxwm" tabindex="-1">nxwm <a class="header-anchor" href="#nxwm" aria-label="Permalink to &quot;nxwm&quot;">​</a></h3><p>This is a special configuration setup for the NxWM window manager UnitTest. The NxWM window manager can be found here:</p><pre><code>apps/graphics/NxWidgets/nxwm
</code></pre><p>The NxWM unit test can be found at:</p><pre><code>apps/graphics/NxWidgets/UnitTests/nxwm
</code></pre><p>NOTE: JP6 selects between the touchscreen interrupt and the MII interrupt. It should be positioned 1-2 to enable the touchscreen interrupt.</p><p>NOTE: Reading from the LCD is not currently supported by this configuration. The hardware will support reading from the LCD and drivers/lcd/ssd1289.c also supports reading from the LCD. This limits some graphics capabilities.</p><p>Reading from the LCD is not supported only because it has not been tested. If you get inspired to test this feature, you can turn the LCD read functionality on by setting:</p><pre><code>-CONFIG_LCD_NOGETRUN=y
+# CONFIG_LCD_NOGETRUN is not set

-CONFIG_NX_WRITEONLY=y
+# CONFIG_NX_WRITEONLY is not set
</code></pre><h3 id="thttpd" tabindex="-1">thttpd <a class="header-anchor" href="#thttpd" aria-label="Permalink to &quot;thttpd&quot;">​</a></h3><p>This builds the THTTPD web server example using the THTTPD and the apps/examples/thttpd application.</p><p>NOTE: This example can only be built using the older toolchains due to incompatibilities introduced in later GCC releases.</p>`,32)]))}const C=n(o,[["render",s]]);export{c as __pageData,C as default};
