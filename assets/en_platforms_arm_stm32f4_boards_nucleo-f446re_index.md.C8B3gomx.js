import{_ as n,c as t,al as o,o as a}from"./chunks/framework.NFAqBSgQ.js";const h=JSON.parse('{"title":"ST Nucleo F446RE","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/stm32f4/boards/nucleo-f446re/index.md","filePath":"en/platforms/arm/stm32f4/boards/nucleo-f446re/index.md"}'),i={name:"en/platforms/arm/stm32f4/boards/nucleo-f446re/index.md"};function r(s,e,l,d,u,c){return a(),t("div",null,e[0]||(e[0]=[o(`<h1 id="st-nucleo-f446re" tabindex="-1">ST Nucleo F446RE <a class="header-anchor" href="#st-nucleo-f446re" aria-label="Permalink to &quot;ST Nucleo F446RE&quot;">​</a></h1><p>chip:stm32, chip:stm32f4, chip:stm32f446</p><p>This page discusses issues unique to NuttX configurations for the ST NucleoF446RE boards from ST Micro. See</p><blockquote><p><a href="https://www.st.com/en/evaluation-tools/nucleo-f446re.html" target="_blank" rel="noreferrer">https://www.st.com/en/evaluation-tools/nucleo-f446re.html</a></p></blockquote><p>NucleoF446RE:</p><ul><li>Microprocessor: 32-bit ARM Cortex M4 at 180MHz STM32F446RE</li><li>Memory: 512 KB Flash and 128 KB SRAM</li><li>ADC: 1×12-bit, 2.4 MSPS A/D converter: up to 10 channels</li><li>DMA: 16-stream DMA controllers with FIFOs and burst support</li><li>Timers: Up to 11 timers: up to six 16-bit, two 32-bit timers, two watchdog timers, and a SysTick timer</li><li>GPIO: Up to 81 I/O ports with interrupt capability</li><li>I2C: Up to 3 × I2C interfaces</li><li>USARTs: Up to 3 USARTs</li><li>USARTs: Up to 3 USARTs</li><li>SPIs: Up to 4 SPIs (2 I2S)</li><li>SDIO interface</li><li>USB: USB 2.0 full-speed device/host/OTG controller with on-chip PHY</li><li>CRC calculation unit</li><li>RTC</li></ul><p>The NucleoF446RE also has additional DMA and SPI peripheral capabilities.</p><p>Board features, however, are identical:</p><ul><li>Peripherals: 1 led, 1 push button</li><li>Debug: Serial wire debug and JTAG interfaces</li><li>Expansion I/F Ardino and Morpho Headers</li></ul><p>Uses a STM32F103 to provide a ST-Link for programming, debug similar to the OpenOcd FTDI function - USB to JTAG front-end.</p><p>See <a href="https://os.mbed.com/platforms/ST-Nucleo-F446RE/" target="_blank" rel="noreferrer">https://os.mbed.com/platforms/ST-Nucleo-F446RE/</a> for more information about this board.</p><h2 id="mbed" tabindex="-1">mbed <a class="header-anchor" href="#mbed" aria-label="Permalink to &quot;mbed&quot;">​</a></h2><p>The Nucleo-F401RE includes boot loader from mbed:</p><blockquote><p><a href="https://mbed.org/platforms/ST-Nucleo-F401RE/" target="_blank" rel="noreferrer">https://mbed.org/platforms/ST-Nucleo-F401RE/</a><a href="https://mbed.org/handbook/Homepage" target="_blank" rel="noreferrer">https://mbed.org/handbook/Homepage</a></p></blockquote><p>Using the mbed loader:</p><ol><li>Connect the Nucleo-F4x1RE to the host PC using the USB connector.</li><li>A new file system will appear called NUCLEO; open it with Windows Explorer (assuming that you are using Windows).</li><li>Drag and drop nuttx.bin into the MBED window. This will load the nuttx.bin binary into the Nucleo-F4x1RE. The NUCLEO window will close then re-open and the Nucleo-F4x1RE will be running the new code.</li></ol><h2 id="hardware" tabindex="-1">Hardware <a class="header-anchor" href="#hardware" aria-label="Permalink to &quot;Hardware&quot;">​</a></h2><h3 id="buttons" tabindex="-1">Buttons <a class="header-anchor" href="#buttons" aria-label="Permalink to &quot;Buttons&quot;">​</a></h3><p>B1 USER: the user button is connected to the I/O PC13 (pin 2) of the STM32 microcontroller.</p><h3 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h3><p>The Nucleo F446RE provides a single user LED, LD2. LD2 is the green LED connected to Arduino signal D13 corresponding to MCU I/O PA5 (pin 21) or PB13 (pin 34) depending on the STM32target.</p><ul><li>When the I/O is HIGH value, the LED is on.</li><li>When the I/O is LOW, the LED is off.</li></ul><p>These LEDs are not used by the board port unless CONFIG_ARCH_LEDS is defined. In that case, the usage by the board port is defined in include/board.h and src/sam_leds.c. The LEDs are used to encode OS-related events as follows when the red LED (PE24) is available:</p><pre><code>SYMBOL                Meaning                   LD2
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
</code></pre><p>Thus if LD2, NuttX has successfully booted and is, apparently, running normally. If LD2 is flashing at approximately 2Hz, then a fatal error has been detected and the system has halted.</p><h2 id="serial-consoles" tabindex="-1">Serial Consoles <a class="header-anchor" href="#serial-consoles" aria-label="Permalink to &quot;Serial Consoles&quot;">​</a></h2><h3 id="usart1" tabindex="-1">USART1 <a class="header-anchor" href="#usart1" aria-label="Permalink to &quot;USART1&quot;">​</a></h3><p>Pins and Connectors:</p><pre><code>RXD: PA11  CN10 pin 14
     PB7   CN7 pin 21
TXD: PA10  CN9 pin 3, CN10 pin 33
     PB6   CN5 pin 3, CN10 pin 17

NOTE:  You may need to edit the include/board.h to select different USART1
pin selections.
</code></pre><p>TTL to RS-232 converter connection:</p><pre><code>Nucleo CN10 STM32F4x1RE
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
</code></pre><p>TTL to RS-232 converter connection:</p><pre><code>Nucleo CN9  STM32F4x1RE
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
</code></pre><h3 id="virtual-com-port" tabindex="-1">Virtual COM Port <a class="header-anchor" href="#virtual-com-port" aria-label="Permalink to &quot;Virtual COM Port&quot;">​</a></h3><p>Yet another option is to use UART2 and the USB virtual COM port. This option may be more convenient for long term development, but is painful to use during board bring-up.</p><p>Solder Bridges. This configuration requires:</p><ul><li>SB62 and SB63 Open: PA2 and PA3 on STM32 MCU are disconnected to D1 and D0 (pin 7 and pin 8) on Arduino connector CN9 and ST Morpho connector CN10.</li><li>SB13 and SB14 Closed: PA2 and PA3 on STM32F103C8T6 (ST-LINK MCU) are connected to PA3 and PA2 on STM32 MCU to have USART communication between them. Thus SB61, SB62 and SB63 should be OFF.</li></ul><p>Configuring USART2 is the same as given above.</p><p>Question: What BAUD should be configure to interface with the Virtual COM port? 115200 8N1?</p><h3 id="default" tabindex="-1">Default <a class="header-anchor" href="#default" aria-label="Permalink to &quot;Default&quot;">​</a></h3><p>As shipped, SB62 and SB63 are open and SB13 and SB14 closed, so the virtual COM port is enabled.</p><h2 id="shields" tabindex="-1">Shields <a class="header-anchor" href="#shields" aria-label="Permalink to &quot;Shields&quot;">​</a></h2><h3 id="rs-232-from-cutedigi-com" tabindex="-1">RS-232 from Cutedigi.com <a class="header-anchor" href="#rs-232-from-cutedigi-com" aria-label="Permalink to &quot;RS-232 from Cutedigi.com&quot;">​</a></h3><p>Supports a single RS-232 connected via:</p><pre><code>Nucleo CN9  STM32F4x1RE  Cutedigi
----------- ------------ --------
Pin 1  PA3  USART2_RX    RXD
Pin 2  PA2  USART2_TX    TXD
</code></pre><p>Support for this shield is enabled by selecting USART2 and configuring SB13, 14, 62, and 63 as described above under &quot;Serial Consoles&quot;</p><h3 id="itead-joystick-shield" tabindex="-1">Itead Joystick Shield <a class="header-anchor" href="#itead-joystick-shield" aria-label="Permalink to &quot;Itead Joystick Shield&quot;">​</a></h3><p>See <a href="http://imall.iteadstudio.com/im120417014.html" target="_blank" rel="noreferrer">http://imall.iteadstudio.com/im120417014.html</a> for more information about this joystick.</p><p>Itead Joystick Connection:</p><pre><code>--------- ----------------- ---------------------------------
ARDUINO   ITEAD             NUCLEO-F4x1
PIN NAME  SIGNAL            SIGNAL
--------- ----------------- ---------------------------------
 D3       Button E Output   PB3
 D4       Button D Output   PB5
 D5       Button C Output   PB4
 D6       Button B Output   PB10
 D7       Button A Output   PA8
 D8       Button F Output   PA9
 D9       Button G Output   PC7
 A0       Joystick Y Output PA0  ADC1_0
 A1       Joystick X Output PA1  ADC1_1
--------- ----------------- ---------------------------------

All buttons are pulled on the shield.  A sensed low value indicates
when the button is pressed.

NOTE: Button F cannot be used with the default USART1 configuration
because PA9 is configured for USART1_RX by default.  Use select
different USART1 pins in the board.h file or select a different
USART or select CONFIG_NUCLEO_F401RE_AJOY_MINBUTTONS which will
eliminate all but buttons A, B, and C.
</code></pre><p>Itead Joystick Signal interpretation:</p><pre><code>--------- ----------------------- ---------------------------
BUTTON     TYPE                    NUTTX ALIAS
--------- ----------------------- ---------------------------
Button A  Large button A          JUMP/BUTTON 3
Button B  Large button B          FIRE/BUTTON 2
Button C  Joystick select button  SELECT/BUTTON 1
Button D  Tiny Button D           BUTTON 6
Button E  Tiny Button E           BUTTON 7
Button F  Large Button F          BUTTON 4
Button G  Large Button G          BUTTON 5
--------- ----------------------- ---------------------------
</code></pre><p>Itead Joystick configuration settings:</p><pre><code>System Type -&gt; STM32 Peripheral Support
  CONFIG_STM32_ADC1=y              : Enable ADC1 driver support

Drivers
  CONFIG_ANALOG=y                  : Should be automatically selected
  CONFIG_ADC=y                     : Should be automatically selected
  CONFIG_INPUT=y                   : Select input device support
  CONFIG_INPUT_AJOYSTICK=y         : Select analog joystick support
</code></pre><p>There is nothing in the configuration that currently uses the joystick. For testing, you can add the following configuration options to enable the analog joystick example at apps/examples/ajoystick:</p><pre><code>CONFIG_NSH_ARCHINIT=y
CONFIG_EXAMPLES_AJOYSTICK=y
CONFIG_EXAMPLES_AJOYSTICK_DEVNAME=&quot;/dev/ajoy0&quot;
</code></pre><p>STATUS: 2014-12-04:</p><ul><li>Without ADC DMA support, it is not possible to sample both X and Y with a single ADC. Right now, only one axis is being converted.</li><li>There is conflicts with some of the Arduino data pins and the default USART1 configuration. I am currently running with USART1 but with CONFIG_NUCLEO_F401RE_AJOY_MINBUTTONS to eliminate the conflict.</li><li>Current showstopper: I appear to be getting infinite interrupts as soon as joystick button interrupts are enabled.</li></ul><h2 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h2><h3 id="nsh" tabindex="-1">nsh: <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh:&quot;">​</a></h3><p>Configures the NuttShell (nsh) located at apps/examples/nsh for the Nucleo-F446RE board. The Configuration enables the serial interfaces on UART2. Support for builtin applications is enabled, but in the base configuration no builtin applications are selected (see NOTES below).</p><p>NOTES:</p><ol><li><p>This configuration uses the mconf-based configuration tool. To change this configuration using that tool, you should:</p><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository. b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</p></li><li><p>By default, this configuration uses the ARM EABI toolchain for Linux. That can easily be reconfigured, of course.:</p><pre><code>CONFIG_HOST_LINUX=y                     : Builds under Linux
CONFIG_ARM_TOOLCHAIN_GNU_EABI=y      : GNU EABI toolchain for Linux
</code></pre></li><li><p>Although the default console is USART2 (which would correspond to the Virtual COM port) I have done all testing with the console device configured for USART1 (see instruction above under &quot;Serial Consoles). I have been using a TTL-to-RS-232 converter connected as shown below:</p><pre><code>Nucleo CN10 STM32F446RE
----------- ------------
Pin 21 PA9  USART1_RX   *Warning you make need to reverse RX/TX on
Pin 33 PA10 USART1_TX    some RS-232 converters
Pin 20 GND
Pin 8  U5V
</code></pre></li></ol><h3 id="can" tabindex="-1">can <a class="header-anchor" href="#can" aria-label="Permalink to &quot;can&quot;">​</a></h3><p>This is basically an nsh configuration (see above) with added support for CAN driver. Both CAN 1 (RX: PB_8, TX: PB_9) and CAN 2 (RX: PB_5, TX: PB_6) are turn on.</p><p>Functionality of CAN driver can be tested by calling application &quot;can&quot; in NuttShell. This application sends 100 messages over CAN 1.</p><h3 id="dac" tabindex="-1">dac <a class="header-anchor" href="#dac" aria-label="Permalink to &quot;dac&quot;">​</a></h3><p>This is an nsh configuration (see above) with added support for digital analog converter driver.</p><p>Functionality of DAC driver can be tested by calling application &quot;dac&quot; in NuttShell. GPIO_DAC1_OUT1 pin is set on PA_4.</p><h3 id="gpio" tabindex="-1">gpio <a class="header-anchor" href="#gpio" aria-label="Permalink to &quot;gpio&quot;">​</a></h3><p>This is an nsh configuration (see above) with added support for GPIO driver and GPIO test application &quot;gpio&quot;. Three pins are configured for testing purposes:</p><pre><code>PA_7 - GPIO_INPUT
PB_6 - GPIO_OUTPUT
PC_7 - GPIO_INPUT_INTERRUPT
</code></pre><h3 id="ihm08m1-f32-and-ihm08m1-b16" tabindex="-1">ihm08m1_f32 and ihm08m1_b16 <a class="header-anchor" href="#ihm08m1-f32-and-ihm08m1-b16" aria-label="Permalink to &quot;ihm08m1\\_f32 and ihm08m1\\_b16&quot;">​</a></h3><p>These examples are dedicated for the X-NUCLEO-IHM08M1 expansion board with L6398 gate drivers and discrete transistors.</p><p>WARNING: L6398 gate drivers require channel 2 negative polarisation and negative sign for the deadtime. Make sure that your gate drivers logic is compatible with this configuration.</p><p>X-NUCLEO-IHM08M1 must be configured to work with FOC and 3-shunt resistors. See ST documentation for details.</p><p>Pin configuration for the X-NUCLEO-IHM08M1 (TIM1 configuration):</p><pre><code>Board Function   Chip Function      Chip Pin Number
-------------   ----------------   -----------------
Phase U high     TIM1_CH1           PA8
Phase U low      TIM1_CH1N          PA7
Phase V high     TIM1_CH2           PA9
Phase V low      TIM1_CH2N          PB0
Phase W high     TIM1_CH3           PA10
Phase W low      TIM1_CH3N          PB1
Current U        ADC1_IN0           PA0
Current V        ADC1_IN11          PC1
Current W        ADC1_IN10          PC0
Temperature      ADC1_IN12          PC2
VBUS             ADC1_IN1           PA1
BEMF1            (NU)               PC3
BEMF2            (NU)               PC4
BEMF3            (NU)               PC5
LED              GPIO_PB2           PB2
+3V3 (CN7_16)
GND (CN7_20)
GPIO_BEMF        (NU)               PC9
ENCO_A/HALL_H1   TIM2_CH1           PA15
ENCO_B/HALL_H2   TIM2_CH2           PB3
ENCO_Z/HALL_H3   TIM2_CH3           PB10
DAC              (NU)               PA5
GPIO3            (NU)               PB13
CPOUT            (NU)               PA12
BKIN1            (NU)               PA6
BKIN2            (NU)               PA11
BKIN3            (NU)               PB14
POT/DAC          DAC1_CH1/ADC1_IN4  PA4
CURR_REF         (NU)               PB4
DEBUG0           GPIO               PB12
DEBUG1           GPIO               PB9
DEBUG2           GPIO               PC6
DEBUG3           GPIO               PB5
DEBUG4           GPIO               PC8

Current shunt resistance              = 0.01
Current sense gain                    = -5.18 (inverted current)
Vbus sense gain = 9.31k/(9.31k+169k)  = 0.0522
Vbus min                              = 10V
Vbus max                              = 48V
Iout max                              = 15A RMS

IPHASE_RATIO = 1/(R_shunt*gain) = -19.3
VBUS_RATIO   = 1/VBUS_gain      = 19.152

For now only 3-shunt resistors configuration is supported.
</code></pre><h3 id="lcd" tabindex="-1">lcd <a class="header-anchor" href="#lcd" aria-label="Permalink to &quot;lcd&quot;">​</a></h3><p>This is basically an nsh configuration (see above) with added support of ILI9225 176x220 TFT display and test framebuffer application.</p><p>Display connection is set to SPI 3 and pinout is following:</p><pre><code>CS    D8
RST   D6
RS    D7
SDA   D4
CLK   D3
</code></pre><p>Framebuffer application can be started from terminal by typing &quot;fb&quot;.</p><h3 id="pwm" tabindex="-1">pwm <a class="header-anchor" href="#pwm" aria-label="Permalink to &quot;pwm&quot;">​</a></h3><p>This is an nsh configuration (see above) with added capability of pulse width modulation. PWM output is on Timer 3 channel 1, which is pin PA_6 (D12) on Nucleo board. Example program can be stared by &quot;pwm&quot; command.</p>`,99)]))}const T=n(i,[["render",r]]);export{h as __pageData,T as default};
