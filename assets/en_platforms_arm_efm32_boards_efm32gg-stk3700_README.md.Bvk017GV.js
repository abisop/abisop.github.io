import{_ as t,c as a,al as n,o}from"./chunks/framework.NFAqBSgQ.js";const p=JSON.parse('{"title":"README","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/efm32/boards/efm32gg-stk3700/README.md","filePath":"en/platforms/arm/efm32/boards/efm32gg-stk3700/README.md"}'),s={name:"en/platforms/arm/efm32/boards/efm32gg-stk3700/README.md"};function i(r,e,l,d,c,h){return o(),a("div",null,e[0]||(e[0]=[n(`<h1 id="readme" tabindex="-1">README <a class="header-anchor" href="#readme" aria-label="Permalink to &quot;README&quot;">​</a></h1><p>This README file discusses the port of NuttX to the Silicon Labs EFM32™ Giant Gecko Starter Kit (EFM32GG-STK3400). The Giant Gecko Starter Kit features:</p><pre><code>• EFM32GG990F1024 MCU with 1 MB flash and 128 kB RAM
•   32.768 kHz crystal (LXFO)
•   48 MHz crystal (HXFO)
• 32 MB NAND flash
• Advanced Energy Monitoring
• Touch slider
• 8x20 LCD
• 2 user LEDs
• 2 user buttons
• USB interface for Host/Device/OTG
• Ambient light sensor and inductive-capacitive metal sensor
• EFM32 OPAMP footprint
• 20 pin expansion header
• Breakout pads for easy access to I/O pins
• Power sources (USB and CR2032 battery)
• Backup Capacitor for RTC mode
• Integrated Segger J-Link USB debugger/emulator
</code></pre><h1 id="status" tabindex="-1">STATUS <a class="header-anchor" href="#status" aria-label="Permalink to &quot;STATUS&quot;">​</a></h1><p>2014-11-02: Completed the basic NSH configuration for the EFM32 Giant Gecko Starter Kit. 2014-11-12: The basic NSH configuration is functional with a serial console on LEUART0. 2014-11-14: LEUART0 BAUD increased from 2400 to 9600. Calibrated delay loop. 2014-11-18: Added basic drivers for USB device and host. The initial port is a simple leverage from the STM32 which appears to use the same IP. The current state is just the STM32 USB drivers with the appropriate. The USB drivers still lack EFM32 initialization logic and are, of course, completely untested.</p><h1 id="leds-and-buttons" tabindex="-1">LEDs and Buttons <a class="header-anchor" href="#leds-and-buttons" aria-label="Permalink to &quot;LEDs and Buttons&quot;">​</a></h1><h2 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h2><p>The EFM32 Giant Gecko Start Kit has two yellow LEDs marked LED0 and LED1. These LEDs are controlled by GPIO pins on the EFM32. The LEDs are connected to pins PE2 and PE3 in an active high configuration:</p><hr><p>EFM32 PIN BOARD SIGNALS</p><hr><h2 id="e2-bck-vout-ebi-a09-0-mcu-pe2-uif-led0-tim3-cc2-1-u1-tx-3-acmp0-o-1-e3-bck-stat-ebi-a10-0-u1-rx-3-mcu-pe3uif-led1-acmp1-o-1" tabindex="-1">E2/BCK_VOUT/EBI_A09 #0/ MCU_PE2 UIF_LED0 TIM3_CC2 #1/U1_TX #3/ACMP0_O #1 E3/BCK_STAT/EBI_A10 #0/U1_RX #3/ MCU_PE3 UIF_LED1 ACMP1_O #1 ------------------------------------- <a class="header-anchor" href="#e2-bck-vout-ebi-a09-0-mcu-pe2-uif-led0-tim3-cc2-1-u1-tx-3-acmp0-o-1-e3-bck-stat-ebi-a10-0-u1-rx-3-mcu-pe3uif-led1-acmp1-o-1" aria-label="Permalink to &quot;E2/BCK\\_VOUT/EBI\\_A09 \\#0/ MCU\\_PE2 UIF\\_LED0 TIM3\\_CC2 \\#1/U1\\_TX
\\#3/ACMP0\\_O \\#1 E3/BCK\\_STAT/EBI\\_A10 \\#0/U1\\_RX \\#3/ MCU\\_PE3
UIF\\_LED1 ACMP1\\_O \\#1 -------------------------------------&quot;">​</a></h2><p>All LEDs are grounded and so are illuminated by outputting a high value to the LED.</p><p>These LEDs are not used by the board port unless CONFIG_ARCH_LEDS is defined. In that case, the usage by the board port is defined in include/board.h and src/efm32_autoleds.c. The LEDs are used to encode OS-related events as follows:</p><p>These LEDs are not used by the board port unless CONFIG_ARCH_LEDS is defined. In that case, the usage by the board port is defined in include/board.h and src/up_leds.c. The LEDs are used to encode OS-related events as follows:</p><pre><code>SYMBOL               Meaning                      LED state
                                                LED0     LED1
-------------------  -----------------------  -------- --------
LED_STARTED          NuttX has been started     OFF      OFF
LED_HEAPALLOCATE     Heap has been allocated    OFF      OFF
LED_IRQSENABLED      Interrupts enabled         OFF      OFF
LED_STACKCREATED     Idle stack created         ON       OFF
LED_INIRQ            In an interrupt              No change
LED_SIGNAL           In a signal handler          No change
LED_ASSERTION        An assertion failed          No change
LED_PANIC            The system has crashed     OFF      Blinking
LED_IDLE             STM32 is is sleep mode       Not used
</code></pre><p>Thus if LED0 statically on, NuttX has successfully booted and is, apparently, running normally. If LED1 is flashing at approximately 2Hz, then a fatal error has been detected and the system has halted.</p><h2 id="buttons" tabindex="-1">Buttons <a class="header-anchor" href="#buttons" aria-label="Permalink to &quot;Buttons&quot;">​</a></h2><p>The EFM32 Giant Gecko Start Kit has two buttons marked PB0 and PB1. They are connected to the EFM32, and are debounced by RC filters with a time constant of 1ms. The buttons are connected to pins PB9 and PB10:</p><pre><code>------------------------------------- --------------------
EFM32 PIN                             BOARD SIGNALS
------------------------------------- --------------------
B9/EBI_A03/U1_TX #2                   MCU_PB9  UIF_PB0
B10/EBI_A04/U1_RX #2                  MCU_PB10 UIF_PB1
------------------------------------- --------------------
</code></pre><p>Buttons are connected to ground so they will read low when closed.</p><h1 id="serial-console" tabindex="-1">Serial Console <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;Serial Console&quot;">​</a></h1><h2 id="default-serial-console" tabindex="-1">Default Serial Console <a class="header-anchor" href="#default-serial-console" aria-label="Permalink to &quot;Default Serial Console&quot;">​</a></h2><p>LEUART0 is configured as the default serial console at 9600 8N1 on pins PD5 and PD4.</p><pre><code> ---------- ---- ----------- -----------
 SIGNAL     PGIO EXP Header  Test Point
 ---------- ---- ----------- -----------
 LEUART0_TX PD4  Pin 12      TPJ122
 LEUART0_RX PD5  Pin 14      TPJ123
 ---------- ---- ----------- -----------
</code></pre><p>It should also be possible to use UART0 is configured at 115200 8N1 on pins PE0 and PE1.</p><h2 id="communication-through-the-board-controller" tabindex="-1">Communication through the Board Controller <a class="header-anchor" href="#communication-through-the-board-controller" aria-label="Permalink to &quot;Communication through the Board Controller&quot;">​</a></h2><p>The kit contains a board controller that is responsible for performing various board level tasks, such as handling the debugger and the Advanced Energy Monitor. An interface is provided between the EFM32 and the board controller in the form of a UART connection. The connection is enabled by setting the EFM_BC_EN (PF7) line high, and using the lines EFM_BC_TX (PE0) and EFM_BC_RX (PE1) for communicating.</p><h1 id="using-the-j-link-gdb-server" tabindex="-1">USING THE J-LINK GDB SERVER <a class="header-anchor" href="#using-the-j-link-gdb-server" aria-label="Permalink to &quot;USING THE J-LINK GDB SERVER&quot;">​</a></h1><ol><li><p>Star the J-Link GDB server. You should see the start-up configuration window. SelectL</p><p>a. Target device = EFM32GG990F1024 b. Select Target interface = SWD</p></li><li><p>Press OK. The GDB server should start and the last message in the Log output should be &quot;Waiting for GDB connection&quot;.</p></li><li><p>In a terminal window, start GDB:</p><p>arm-none-eabi-gdb</p></li><li><p>Connect to the J-Link GDB server:</p></li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- --&gt;</span></span></code></pre></div><pre><code> (gdb) target remote localhost:2331
</code></pre><ol start="5"><li>Load and run nuttx</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- --&gt;</span></span></code></pre></div><pre><code> (gdb) mon halt
 (gdb) load nuttx
 (gdb) mon reset go
</code></pre><p>I had to tinker with the setup a few times repeating the same steps above before things finally began to work. Don&#39;t know why.</p><p>To debug code already burned into FLASH:</p><ol><li><p>Start the GDB server as above.</p></li><li><p>In a terminal window, start GDB:</p><p>arm-none-eabi-gdb</p></li><li><p>Connect to the J-Link GDB serer:</p></li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- --&gt;</span></span></code></pre></div><pre><code> (gdb) target remote local host
</code></pre><ol start="3"><li>Load the nuttx symbol file, reset, and debug</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- --&gt;</span></span></code></pre></div><pre><code> (gdb) mon halt
 (gdb) file nuttx
 (gdb) mon reset
 (gdb) s
 ...
</code></pre><h1 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h1><p>Each EFM32 Giant Gecko Starter Kit configuration is maintained in a sub- directory and can be selected as follow:</p><pre><code>tools/configure.sh efm32gg-stk3700:&lt;subdir&gt;
</code></pre><p>If this is a Windows native build, then configure.bat should be used instead of configure.sh:</p><pre><code>configure.bat efm32gg-stk3700\\&lt;subdir&gt;
</code></pre><p>Where <code>&lt;subdir&gt;</code> is one of the following:</p><h2 id="nsh" tabindex="-1">nsh: <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh:&quot;">​</a></h2><p>Configures the NuttShell (nsh) located at apps/examples/nsh. The Configuration enables the serial interfaces on LEUART0 at 9600 8N1.</p><pre><code>NOTES:

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
</code></pre>`,52)]))}const b=t(s,[["render",i]]);export{p as __pageData,b as default};
