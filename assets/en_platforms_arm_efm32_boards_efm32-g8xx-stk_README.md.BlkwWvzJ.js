import{_ as t,c as a,al as n,o}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"README","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/efm32/boards/efm32-g8xx-stk/README.md","filePath":"en/platforms/arm/efm32/boards/efm32-g8xx-stk/README.md"}'),s={name:"en/platforms/arm/efm32/boards/efm32-g8xx-stk/README.md"};function i(r,e,l,d,h,c){return o(),a("div",null,e[0]||(e[0]=[n(`<h1 id="readme" tabindex="-1">README <a class="header-anchor" href="#readme" aria-label="Permalink to &quot;README&quot;">​</a></h1><p>This README file discusses the port of NuttX to the Silicon Labs EFM32™ Gecko Starter Kit (EFM32-G8XX-STK). The Gecko Starter Kit features:</p><pre><code>• EFM32G890F128 MCU with 128 kB flash and 16 kB RAM
•   32.768 kHz crystal (LXFO)
•   32 MHz crystal (HXFO)
• Advanced Energy Monitoring
• Touch slider
• 4x40 LCD
• 4 User LEDs
• 2 pushbutton switches
• Reset button and a switch to disconnect the battery.
• On-board SEGGER J-Link USB emulator
• ARM 20 pin JTAG/SWD standard Debug in/out connector
</code></pre><h1 id="contents" tabindex="-1">CONTENTS <a class="header-anchor" href="#contents" aria-label="Permalink to &quot;CONTENTS&quot;">​</a></h1><pre><code>• Status
• LEDs
• Serial Console
• Using the J-Link GDB Server
• Configurations
</code></pre><h1 id="status" tabindex="-1">STATUS <a class="header-anchor" href="#status" aria-label="Permalink to &quot;STATUS&quot;">​</a></h1><p>2014-10-28. At this point all basic boot operations are successful: The LEDs work and the application tasks appear to be successfully started. LED2 is on and LED0 is glowing (meaning that interrupts are being processed). However, I get no output on PE0. Data appears to be sent (at least by efm32_lowputc()). However, no signal activity is present on PE0.</p><p>2014-10-29: The NuttX is running on the EFM32 Gecko Starter Kit. There are not many peripherals to test in that configuration, but the NuttShell (NSH) is working over LEUART0 at 2400 baud (certainly that could go up to 4800. The documentation says that 9600 is also possible on the LEUART, but I am not sure how).</p><pre><code>I originally planned to use UART0 at 115200 baud, but I never could get
any output from the board.  I reviewd my pin configuration and clocking
carefully and the USART seems to think it is working correctly.  So I
am thinking that there is some board issue that prohibits that option
(probably because UART0 is used with the board controller???).  Pins
are not available for other U[S]ARTs on the board.

DMA and USART-based SPI supported are included, but not yet tested.
</code></pre><p>2014-10-29: Calibrated the delays loops.</p><p>2014-10-29: The start-up time is long -- about a second. I have traced this to the default delay in bringing up the LFCLK in efm32_clockconfig. The default, reset setting of the LFXOTIMEOUT field of the CMU_CTRL register is 3 which corresponds to a delay of 32768 cycles, or a full second. I have not experimented to see if this delay can be reduced.</p><h1 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h1><p>The EFM32 Gecko Start Kit has four yellow LEDs. These LEDs are connected as follows:</p><hr><p>EFM32 PIN BOARD SIGNALS</p><hr><p>C0/USART1_TX#0/PCNT0_S0IN#2/ACMP0_CH0 MCU_PC0 UIF_LED0 C1/USART1_RX#0/PCNT0_S1IN#2/ACMP0_CH1 MCU_PC1 UIF_LED1 C2/USART2_TX#0/ACMP0_CH2 MCU_PC2 UIF_LED2 C3/USART2_RX#0/ACMP0_CH3 MCU_PC3 UIF_LED3</p><hr><p>All LEDs are grounded and so are illuminated by outputting a high value to the LED.</p><p>These LEDs are not used by the board port unless CONFIG_ARCH_LEDS is defined. In that case, the usage by the board port is defined in include/board.h and src/efm32_autoleds.c. The LEDs are used to encode OS-related events as follows:</p><pre><code>SYMBOL             Meaning                 LED0*  LED1   LED2   LED3
----------------- -----------------------  ------ -----  -----  ------
LED_STARTED       NuttX has been started   ON     OFF    OFF    OFF
LED_HEAPALLOCATE  Heap has been allocated  OFF    ON     OFF    OFF
LED_IRQSENABLED   Interrupts enabled       ON     ON     OFF    OFF
LED_STACKCREATED  Idle stack created       OFF    OFF    ON     OFF
LED_INIRQ         In an interrupt**        ON     N/C    N/C    OFF
LED_SIGNAL        In a signal handler***   N/C    ON     N/C    OFF
LED_ASSERTION     An assertion failed      ON     ON     N/C    OFF
LED_PANIC         The system has crashed   N/C    N/C    N/C    ON
LED_IDLE          STM32 is is sleep mode   (Optional, not used)
</code></pre><ul><li>If LED0, LED1, LED2 are statically on, then NuttX probably failed to boot and these LEDs will give you some indication of where the failure was ** The normal state is LED2 ON and LED3 faintly glowing. This faint glow is because of timer interrupt that result in the LED being illuminated on a small proportion of the time. *** LED1 may also flicker normally if signals are processed.</li></ul><h1 id="serial-console" tabindex="-1">SERIAL CONSOLE <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;SERIAL CONSOLE&quot;">​</a></h1><h2 id="pin-availability" tabindex="-1">Pin Availability <a class="header-anchor" href="#pin-availability" aria-label="Permalink to &quot;Pin Availability&quot;">​</a></h2><p>The EFM32G890F128 support the following options for serial output. NOTE (1) that not all of these pins are available for use as a serial console, however. And (2) not all pins made available by the board.</p><pre><code>EFM32 PIN  GPIO NOTES/CONFLICTS/AVAILABILITY
------- -- ---- ----------------------------------------------
 US0_RX #0 PE11 LCD_PE11, LCD_SEG7
 US0_RX #1 PE6  LCD_PE6, LCD_COM2
 US0_RX #2 PC10 UIF_SLIDER2

 US0_TX #0 PE10 LCD_PE10, LCD_SEGG
 US0_TX #1 PE7  LCD_PE7, LCD_COM3
 US0_TX #2 PC11 UIF_SLIDER3
------- -- ----
 US1_RX #0 PC1  UIF_LED1
 US1_RX #1 PD1  Not connected on this board

 US1_TX #0 PC0  UIF_LED0
 US1_TX #1 PD0  Not connected on this board
------- -- ----
 US2_RX #0 PC3  UIF_LED3
 US2_RX #1 PB4  LCD_PB4, LCD_SEG21

 US2_TX #0 PC2  UIF_LED2
 US2_TX #1 PB3  LCD_PB3, LCD_SEG20
------- -- ----
  U0_RX #0 PF7  LCD_PF7, LCD_SEG25
  U0_RX #1 PE1  **AVAILABLE at TP130** (if BC_EN is low, see below)
  U0_RX #2 PA4  LCD_PA4, LCD_SEG17
  U0_RX #3 PC15 MCUDBG_TDO_SWO

  U0_TX #0 PF6  LCD_PF6, LCD_SEG24
  U0_TX #1 PE0  **AVAILABLE at TP129** (if BC_EN is low, see below)
  U0_TX #2 PA3  LCD_PA3, LCD_SEG16
  U0_TX #3 PC14 **AVAILABLE at TP117**
------- -- ----
LEU0_RX #0 PD5  **AVAILABLE at TP123 and EXP port pin 14**
LEU0_RX #1 PB14 CTRLMCU_SPI_MISO
LEU0_RX #2 PE15 LCD_PE15, LCD_SEG11

LEU0_TX #0 PD4  **AVAILABLE at TP122 and EXP port pin 12**
LEU0_TX #1 PB13 CTRLMCU_SPI_SCK
LEU0_TX #2 PE14 LCD_PE14, LCD_SEG10
------- -- ----
LEU1_RX #0 PC7  DEBUG_MCU_SW_ENABLE
LEU1_RX #1 PA6  DEBUG_TDI_IN

LEU1_TX #0 PC6  DEBUG_DH_SW_ENABLE
LEU1_TX #1 PA5  DEBUG_TMS_SWDIO_IN
------- -- ----
</code></pre><h2 id="default-serial-console" tabindex="-1">Default Serial Console <a class="header-anchor" href="#default-serial-console" aria-label="Permalink to &quot;Default Serial Console&quot;">​</a></h2><p>LEUART0 is configured as the default serial console at 2400 8N1 on pins PD5 and PD4. It certainly be possible to go to 4800 baud and the documentation claims that 9600 baud is possible (although I am not sure how).</p><p>It should also be possible to use UART0 is configured at 115200 8N1 on pins PE0 and PE1. However, my attempts to use USART0 were unsuccessful -- I see no activity on PE0 and PE1 and have not yet figured out why that is.</p><h2 id="communication-through-the-board-controller" tabindex="-1">Communication through the Board Controller <a class="header-anchor" href="#communication-through-the-board-controller" aria-label="Permalink to &quot;Communication through the Board Controller&quot;">​</a></h2><p>The control MCU acts as a board controller (BC). There is a UART connection between the EFM and the BC. The connection is made by setting the EFM_BC_EN (PD13) line high. The EFM can then use the BSP to send commands to the BC. When EFM_BC_EN is low, EFM_BC_TX and EFM_BC_RX can be used by other applications.</p><h1 id="using-the-j-link-gdb-server" tabindex="-1">USING THE J-LINK GDB SERVER <a class="header-anchor" href="#using-the-j-link-gdb-server" aria-label="Permalink to &quot;USING THE J-LINK GDB SERVER&quot;">​</a></h1><ol><li><p>Star the J-Link GDB server. You should see the start-up configuration window. SelectL</p><p>a. Target device = EFM32G880F128 b. Select Target interface = SWD</p></li><li><p>Press OK. The GDB server should start and the last message in the Log output should be &quot;Waiting for GDB connection&quot;.</p></li><li><p>In a terminal window, start GDB:</p><p>arm-none-eabi-gdb</p></li><li><p>Connect to the J-Link GDB server:</p></li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- --&gt;</span></span></code></pre></div><pre><code> (gdb) target remote localhost:2331
</code></pre><ol start="5"><li>Load and run nuttx</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- --&gt;</span></span></code></pre></div><pre><code> (gdb) mon halt
 (gdb) load nuttx
 (gdb) mon reset go
</code></pre><p>I had to tinker with the setup a few times repeating the same steps above before things finally began to work. Don&#39;t know why.</p><p>To debug code already burned into FLASH:</p><ol><li><p>Start the GDB server as above.</p></li><li><p>In a terminal window, start GDB:</p><p>arm-none-eabi-gdb</p></li><li><p>Connect to the J-Link GDB serer:</p></li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- --&gt;</span></span></code></pre></div><pre><code> (gdb) target remote local host
</code></pre><ol start="3"><li>Load the nuttx symbol file, reset, and debug</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- --&gt;</span></span></code></pre></div><pre><code> (gdb) mon halt
 (gdb) file nuttx
 (gdb) mon reset
 (gdb) s
 ...
</code></pre><h1 id="configurations" tabindex="-1">CONFIGURATIONS <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;CONFIGURATIONS&quot;">​</a></h1><p>Each EFM32 Gecko Starter Kit configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh efm32-g8xx-stk:&lt;subdir&gt;
</code></pre><p>If this is a Windows native build, then configure.bat should be used instead of configure.sh:</p><pre><code>configure.bat efm32-g8xx-stk\\&lt;subdir&gt;
</code></pre><p>Where <code>&lt;subdir&gt;</code> is one of the following:</p><h2 id="nsh" tabindex="-1">nsh: <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh:&quot;">​</a></h2><p>Configures the NuttShell (nsh) located at apps/examples/nsh. The Configuration enables the serial interfaces on LEUART0 at 2400 8N1.</p><pre><code>NOTES:

1. This configuration uses the mconf-based configuration tool.  To
   change this configuration using that tool, you should:

   a. Build and install the kconfig-mconf tool.  See nuttx/README.txt
      see additional README.txt files in the NuttX tools repository.

   b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the
      reconfiguration process.

2. By default, this configuration uses the ARM EABI toolchain
   for Windows and builds under Cygwin (or probably MSYS).  That
   can easily be reconfigured, of course.

   CONFIG_HOST_WINDOWS=y                   : Builds under Windows
   CONFIG_WINDOWS_CYGWIN=y                 : Using Cygwin
   CONFIG_ARM_TOOLCHAIN_GNU_EABI=y      : GNU EABI toolchain for Windows
</code></pre>`,55)]))}const E=t(s,[["render",i]]);export{u as __pageData,E as default};
