import{_ as n,c as a,al as o,o as t}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"README","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/efm32/boards/olimex-efm32g880f128-stk/README.md","filePath":"en/platforms/arm/efm32/boards/olimex-efm32g880f128-stk/README.md"}'),i={name:"en/platforms/arm/efm32/boards/olimex-efm32g880f128-stk/README.md"};function r(s,e,l,d,h,E){return t(),a("div",null,e[0]||(e[0]=[o(`<h1 id="readme" tabindex="-1">README <a class="header-anchor" href="#readme" aria-label="Permalink to &quot;README&quot;">​</a></h1><p>This README file discusses the port of NuttX to the Olimex EFM32G880F128-STK development board. This board features:</p><pre><code>• EFM32G880F128
  - 32 bit Cortex-M3™
  - 128KiB Program Flash, 16KiB Bytes RAM
  - 85 GPIO, 8 Channel DMA
  - 12 bit ADC 1Msps
  - 3xUART/SPI, 2x low power UART
  - I2C
  - 3x 16bit TIMERS
  - 3x2 CC-PWM
  - SSC
  - RTC
  - WDT
  - Up to 32MHz operation
• 32.768 kHz crystal
• 32 MHz crystal
• LCD custom display
• DEBUG connector with ARM 2x10 pin layout for programming/debugging
  with ARM-JTAG-EW
• UEXT connector
• EXT extension connector
• RS232 connector and driver
• Power jack
• Lithium coin battery holder
• RESET circuit , RESET button
• Four user buttons
• Buzzer
• On-board voltage regulator 3.3V with up to 800mA current
• Power supply filtering capacitor
• Extension headers for some of the uC ports + RST and power supply
</code></pre><h1 id="status" tabindex="-1">STATUS <a class="header-anchor" href="#status" aria-label="Permalink to &quot;STATUS&quot;">​</a></h1><p>I created this configuration with good intentions but was stopped because I do not have a SWD tool that I can use with the board -- and I am not likely to get one soon.</p><h1 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h1><p>The EFM32G880F128-STK has no user controllable LEDs.</p><h1 id="buttons" tabindex="-1">Buttons <a class="header-anchor" href="#buttons" aria-label="Permalink to &quot;Buttons&quot;">​</a></h1><p>The Olimex board has four buttons, BUT1-4. Each is grounded and so should have a weak pull-up so that it will be sensed as &quot;1&quot; when open and &quot;0&quot; when closed.</p><hr><p>PIN CONNECTIONS</p><hr><p>PE0/PCNT0_S0IN/U0_TX BUT1, EXT-18 BUT2, PE1/PCNT0_S1IN/U0_RX EXT-19 BUT3, EXT-20 PE2/ACMP0_O E3/ACMP1_O BUT4, EXT-21</p><hr><h1 id="serial-console" tabindex="-1">Serial Console <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;Serial Console&quot;">​</a></h1><h2 id="pin-availability" tabindex="-1">Pin Availability <a class="header-anchor" href="#pin-availability" aria-label="Permalink to &quot;Pin Availability&quot;">​</a></h2><p>The EFM32G890F128 support the following options for serial output. NOTE (1) that not all of these pins are available for use as a serial console, however. And (2) not all pins made available by the board.</p><pre><code>EFM32 PIN  GPIO NOTES/CONFLICTS/AVAILABILITY
------- -- ---- ----------------------------------------------
 US0_RX #0 PE11 SEG7 (LCD)
 US0_RX #1 PE6  COM2 (LCD)
 US0_RX #2 PC10 **AVAILABLE at EXT-12**

 US0_TX #0 PE10 SEG6 (LCD)
 US0_TX #1 PE7  COM3 (LCD)
 US0_TX #2 PC11 **AVAILABLE at EXT-13**
------- -- ----
 US1_RX #0 PC1  **AVAILABLE at EXT-5**
 US1_RX #1 PD1  MISO1, Available at UEXT-7

 US1_TX #0 PC0  **AVAILABLE at EXT-4**
 US1_TX #1 PD0  MOSI1, Available at UEXT-8
------- -- ----
 US2_RX #0 PC3  **AVAILABLE at EXT-7**
 US2_RX #1 PB4  SEG21 (LCD)

 US2_TX #0 PC2  **AVAILABLE at EXT-6**
 US2_TX #1 PB3  SEG20 (LCD)
------- -- ----
  U0_RX #0 PF7  SEG25 (LCD)
  U0_RX #1 PE1  **AVAILABLE at EXT-19**
  U0_RX #2 PA4  SEG18 (LCD)
  U0_RX #3 PC15 DBG_SWV

  U0_TX #0 PF6  SEG24 (LCD)
  U0_TX #1 PE0  **AVAILABLE at EXT-18**
  U0_TX #2 PA3  SEG17 (LCD)
  U0_TX #3 PC14 **AVAILABLE at EXT-16**
------- -- ----
LEU0_RX #0 PD5  LEU0_RX, Available at UEXT-4
LEU0_RX #1 PB14 HFXTAL_N
LEU0_RX #2 PE15 SEG11 (LCD)

LEU0_TX #0 PD4  LEU0_TX, Available at UEXT-3
LEU0_TX #1 PB13 HFXTAL_P
LEU0_TX #2 PE14 SEG10 (LCD)
------- -- ----
LEU1_RX #0 PC7  LEU1_RX to DB-9 connector
LEU1_RX #1 PA6  SEG19 (LCD)

LEU1_TX #0 PC6  LEU1_TX to DB-9 connector
LEU1_TX #1 PA5  SEG18 (LCD)
------- -- ----
</code></pre><h2 id="rs-232-driver-db-9-connector" tabindex="-1">RS-232 Driver/DB-9 Connector <a class="header-anchor" href="#rs-232-driver-db-9-connector" aria-label="Permalink to &quot;RS-232 Driver/DB-9 Connector&quot;">​</a></h2><p>LEUART1 is available on through an RS232 driver on DB-9 connector. Unfortunately, there is no LEUART serial driver available in NuttX as of this writing.</p><h2 id="default-serial-console" tabindex="-1">Default Serial Console <a class="header-anchor" href="#default-serial-console" aria-label="Permalink to &quot;Default Serial Console&quot;">​</a></h2><p>LEUART1 is configured as the default serial console at 2400 8N1 on pins PC6 and PC7.</p><h1 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h1><p>Each EFM32G880F128-STK configuration is maintained in a sub-director and can be selected as follow:</p><pre><code>tools/configure.sh olimex-efm32g880f128-stk:&lt;subdir&gt;
</code></pre><p>Where <code>&lt;subdir&gt;</code> is one of the following:</p><h2 id="nsh" tabindex="-1">nsh: <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh:&quot;">​</a></h2><p>Configures the NuttShell (nsh) located at apps/examples/nsh. The Configuration enables the serial interfaces on LEUART1. Support for builtin applications is enabled, but in the base configuration no builtin applications are selected (see NOTES below).</p><pre><code>NOTES:

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
</code></pre>`,29)]))}const T=n(i,[["render",r]]);export{u as __pageData,T as default};
