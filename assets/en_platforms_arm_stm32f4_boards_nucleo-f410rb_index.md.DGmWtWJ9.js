import{_ as n,c as o,al as a,o as t}from"./chunks/framework.NFAqBSgQ.js";const h=JSON.parse('{"title":"ST Nucleo F410RB","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/stm32f4/boards/nucleo-f410rb/index.md","filePath":"en/platforms/arm/stm32f4/boards/nucleo-f410rb/index.md"}'),i={name:"en/platforms/arm/stm32f4/boards/nucleo-f410rb/index.md"};function r(s,e,l,d,c,u){return t(),o("div",null,e[0]||(e[0]=[a(`<h1 id="st-nucleo-f410rb" tabindex="-1">ST Nucleo F410RB <a class="header-anchor" href="#st-nucleo-f410rb" aria-label="Permalink to &quot;ST Nucleo F410RB&quot;">​</a></h1><p>chip:stm32, chip:stm32f4, chip:stm32f401</p><p>This page discusses issues unique to NuttX configurations for the ST Nucleo F410RB board from ST Micro. See</p><blockquote><p><a href="http://www.st.com/en/evaluation-tools/nucleo-f410rb.html" target="_blank" rel="noreferrer">http://www.st.com/en/evaluation-tools/nucleo-f410rb.html</a></p></blockquote><p>NucleoF410RB:</p><ul><li>Microprocessor: 32-bit ARM Cortex M4 at 100MHz STM32F410RB</li><li>Memory: 128 KB Flash and 32 KB SRAM</li><li>ADC: 1x12-bit, 2.4 MSPS A/D converter: up to 16 channels</li><li>DAC: 1x12-bit, 2.4 MSPS A/D converter: up to 1 channels</li><li>DMA: 16-stream DMA controllers with FIFOs and burst support</li><li>Timers: Up to 11 timers: up to 5 16-bit, 1 32-bit timers, two watchdog timers, and a SysTick timer</li><li>GPIO: Up to 81 I/O ports with interrupt capability</li><li>I2C: Up to 3 I2C interfaces</li><li>USARTs: Up to 3 USARTs</li><li>SPIs: Up to 4 SPIs (2 I2S)</li><li>CRC calculation unit</li><li>RTC</li><li>Peripherals: 1 led, 1 push button</li><li>Debug: Serial wire debug and JTAG interfaces</li><li>Expansion I/F Ardino and Morpho Headers</li></ul><p>Uses a STM32F103 to provide a ST-Link for programming, debug similar to the OpenOcd FTDI function - USB to JTAG front-end.</p><p>See <a href="https://os.mbed.com/platforms/ST-Nucleo-F410RB" target="_blank" rel="noreferrer">https://os.mbed.com/platforms/ST-Nucleo-F410RB</a> for more information about this board.</p><h2 id="hardware" tabindex="-1">Hardware <a class="header-anchor" href="#hardware" aria-label="Permalink to &quot;Hardware&quot;">​</a></h2><h3 id="buttons" tabindex="-1">Buttons <a class="header-anchor" href="#buttons" aria-label="Permalink to &quot;Buttons&quot;">​</a></h3><p>B1 USER: the user button is connected to the I/O PC13 (pin 2) of the STM32 microcontroller.</p><h3 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h3><p>The Nucleo F410RB provide a single user LED, LD2. LD2 is the green LED connected to Arduino signal D13 corresponding to MCU I/O PA5 (pin 21) or PB13 (pin 34) depending on the STM32target.</p><ul><li>When the I/O is HIGH value, the LED is on.</li><li>When the I/O is LOW, the LED is off.</li></ul><p>These LEDs are not used by the board port unless CONFIG_ARCH_LEDS is defined. In that case, the usage by the board port is defined in include/board.h and src/sam_leds.c. The LEDs are used to encode OS-related events as follows when the red LED (PE24) is available:</p><pre><code>SYMBOL                Meaning                   LD2
-------------------  -----------------------  -----------
LED_STARTED          NuttX has been started     OFF
LED_HEAPALLOCATE     Heap has been allocated    OFF
LED_IRQSENABLED      Interrupts enabled         OFF
LED_STACKCREATED     Idle stack created         ON
LED_INIRQ            In an interrupt            No change
LED_SIGNAL           In a signal handler        No change
LED_ASSERTION        An assertion failed        No change
LED_PANIC            The system has crashed     Blinking
LED_IDLE             MCU is is sleep mode       Not used

Thus if LD2, NuttX has successfully booted and is, apparently, running
normally.  If LD2 is flashing at approximately 2Hz, then a fatal error
has been detected and the system has halted.
</code></pre><h2 id="serial-consoles" tabindex="-1">Serial Consoles <a class="header-anchor" href="#serial-consoles" aria-label="Permalink to &quot;Serial Consoles&quot;">​</a></h2><h3 id="usart1" tabindex="-1">USART1 <a class="header-anchor" href="#usart1" aria-label="Permalink to &quot;USART1&quot;">​</a></h3><p>Pins and Connectors:</p><pre><code>RXD: PA11  CN10 pin 14
     PB7   CN7 pin 21
TXD: PA10  CN9 pin 3, CN10 pin 33
     PB6   CN5 pin 3, CN10 pin 17

NOTE:  You may need to edit the include/board.h to select different USART1
pin selections.
</code></pre><p>TTL to RS-232 converter connection:</p><pre><code>Nucleo CN10 STM32F410RB
----------- ------------
Pin 21 PA9  USART1_RX   *Warning you make need to reverse RX/TX on
Pin 33 PA10 USART1_TX    some RS-232 converters
Pin 20 GND
Pin 8  U5V
</code></pre><p>To configure USART1 as the console:</p><pre><code>CONFIG_STM32_USART1=y
CONFIG_USART1_SERIALDRIVER=y
CONFIG_USART1_SERIAL_CONSOLE=y
CONFIG_USART1_RXBUFSIZE=256
CONFIG_USART1_TXBUFSIZE=256
CONFIG_USART1_BAUD=115200
CONFIG_USART1_BITS=8
CONFIG_USART1_PARITY=0
CONFIG_USART1_2STOP=0
</code></pre><h3 id="usart2" tabindex="-1">USART2 <a class="header-anchor" href="#usart2" aria-label="Permalink to &quot;USART2&quot;">​</a></h3><p>Pins and Connectors:</p><pre><code>RXD: PA3   CN9 pin 1 (See SB13, 14, 62, 63). CN10 pin 37
     PD6
TXD: PA2   CN9 pin 2(See SB13, 14, 62, 63). CN10 pin 35
     PD5

UART2 is the default in all of these configurations.
</code></pre><p>TTL to RS-232 converter connection:</p><pre><code>Nucleo CN9  STM32F410RB
----------- ------------
Pin 1  PA3  USART2_RX   *Warning you make need to reverse RX/TX on
Pin 2  PA2  USART2_TX    some RS-232 converters
</code></pre><p>Solder Bridges. This configuration requires:</p><ul><li>SB62 and SB63 Closed: PA2 and PA3 on STM32 MCU are connected to D1 and D0 (pin 7 and pin 8) on Arduino connector CN9 and ST Morpho connector CN10 as USART signals. Thus SB13 and SB14 should be OFF.</li><li>SB13 and SB14 Open: PA2 and PA3 on STM32F103C8T6 (ST-LINK MCU) are disconnected to PA3 and PA2 on STM32 MCU.</li></ul><p>To configure USART2 as the console:</p><pre><code>CONFIG_STM32_USART2=y
CONFIG_USART2_SERIALDRIVER=y
CONFIG_USART2_SERIAL_CONSOLE=y
CONFIG_USART2_RXBUFSIZE=256
CONFIG_USART2_TXBUFSIZE=256
CONFIG_USART2_BAUD=115200
CONFIG_USART2_BITS=8
CONFIG_USART2_PARITY=0
CONFIG_USART2_2STOP=0
</code></pre><h3 id="usart6" tabindex="-1">USART6 <a class="header-anchor" href="#usart6" aria-label="Permalink to &quot;USART6&quot;">​</a></h3><p>Pins and Connectors:</p><pre><code>RXD: PC7    CN5 pin2, CN10 pin 19
     PA12   CN10, pin 12
TXD: PC6    CN10, pin 4
     PA11   CN10, pin 14
</code></pre><p>To configure USART6 as the console:</p><pre><code>CONFIG_STM32_USART6=y
CONFIG_USART6_SERIALDRIVER=y
CONFIG_USART6_SERIAL_CONSOLE=y
CONFIG_USART6_RXBUFSIZE=256
CONFIG_USART6_TXBUFSIZE=256
CONFIG_USART6_BAUD=115200
CONFIG_USART6_BITS=8
CONFIG_USART6_PARITY=0
CONFIG_USART6_2STOP=0
</code></pre><h3 id="virtual-com-port" tabindex="-1">Virtual COM Port <a class="header-anchor" href="#virtual-com-port" aria-label="Permalink to &quot;Virtual COM Port&quot;">​</a></h3><p>Yet another option is to use UART2 and the USB virtual COM port. This option may be more convenient for long term development, but is painful to use during board bring-up.</p><blockquote><p>Solder Bridges. This configuration requires:</p><ul><li>SB62 and SB63 Open: PA2 and PA3 on STM32 MCU are disconnected to D1 and D0 (pin 7 and pin 8) on Arduino connector CN9 and ST Morpho connector CN10.</li><li>SB13 and SB14 Closed: PA2 and PA3 on STM32F103C8T6 (ST-LINK MCU) are connected to PA3 and PA2 on STM32 MCU to have USART communication between them. Thus SB61, SB62 and SB63 should be OFF.</li></ul><p>Configuring USART2 is the same as given above.</p><p>Question: What BAUD should be configure to interface with the Virtual COM port? 115200 8N1?</p></blockquote><h3 id="default" tabindex="-1">Default <a class="header-anchor" href="#default" aria-label="Permalink to &quot;Default&quot;">​</a></h3><p>As shipped, SB62 and SB63 are open and SB13 and SB14 closed, so the virtual COM port is enabled.</p><h2 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h2><h3 id="nsh" tabindex="-1">nsh <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh&quot;">​</a></h3><p>Configures the NuttShell (nsh) located at apps/examples/nsh for the Nucleo-F410RB board. The Configuration enables the serial interfaces on UART2. Support for builtin applications is enabled, but in the base configuration no builtin applications are selected (see NOTES below).</p><p>NOTES:</p><ol><li>This configuration uses the mconf-based configuration tool. To change this configuration using that tool, you should: a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository. b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</li></ol>`,48)]))}const S=n(i,[["render",r]]);export{h as __pageData,S as default};
