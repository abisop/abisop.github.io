import{_ as t,c as n,al as o,o as i}from"./chunks/framework.NFAqBSgQ.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/lpc17xx/boards/lpcxpresso-lpc1768/README.md","filePath":"en/platforms/arm/lpc17xx/boards/lpcxpresso-lpc1768/README.md"}'),s={name:"en/platforms/arm/lpc17xx/boards/lpcxpresso-lpc1768/README.md"};function a(r,e,l,p,d,c){return i(),n("div",null,e[0]||(e[0]=[o(`<p>README ^^^^^^</p><p>README for NuttX port to the Embedded Artists&#39; base board with the NXP the LPCXpresso daughter board.</p><p>Contents ^^^^^^^^</p><p>LCPXpresso LPC1768 Board Embedded Artist&#39;s Base Board Code Red IDE LEDs LPCXpresso Configuration Options Configurations</p><p>LCPXpresso LPC1768 Board ^^^^^^^^^^^^^^^^^^^^^^^^</p><p>Pin Description Connector On Board Base Board</p><hr><hr><p>P0[0]/RD1/TXD3/SDA1 J6-9 I2C E2PROM SDA TXD3/SDA1 P0[1]/TD1/RXD3/SCL J6-10 RXD3/SCL1 P0[2]/TXD0/AD0[7] J6-21 P0[3]/RXD0/AD0[6] J6-22 P0[4]/I2SRX-CLK/RD2/CAP2.0 J6-38 CAN_RX2 P0[5]/I2SRX-WS/TD2/CAP2.1 J6-39 CAN_TX2 P0[6]/I2SRX_SDA/SSEL1/MAT2[0] J6-8 SSEL1, OLED CS P0[7]/I2STX_CLK/SCK1/MAT2[1] J6-7 SCK1, OLED SCK P0[8]/I2STX_WS/MISO1/MAT2[2] J6-6 MISO1 P0[9]/I2STX_SDA/MOSI1/MAT2[3] J6-5 MOSI1, OLED data in P0[10] J6-40 TXD2/SDA2 P0[11] J6-41 RXD2/SCL2 P0[15]/TXD1/SCK0/SCK J6-13 TXD1/SCK0 P0[16]/RXD1/SSEL0/SSEL J6-14 RXD1/SSEL0 P0[17]/CTS1/MISO0/MISO J6-12 MISO0 P0[18]/DCD1/MOSI0/MOSI J6-11 MOSI0 P0[19]/DSR1/SDA1 PAD17 N/A P0[20]/DTR1/SCL1 PAD18 I2C E2PROM SCL N/A P0[21]/RI1/MCIPWR/RD1 J6-23 P0[22]/RTS1/TD1 J6-24 LED P0[23]/AD0[0]/I2SRX_CLK/CAP3[0] J6-15 AD0.0 P0[24]/AD0[1]/I2SRX_WS/CAP3[1] J6-16 AD0.1 P0[25]/AD0[2]/I2SRX_SDA/TXD3 J6-17 AD0.2 P0[26]/AD0[3]/AOUT/RXD3 J6-18 AD0.3/AOUT / RGB LED P0[27]/SDA0/USB_SDA J6-25 P0[28]/SCL0 J6-26 P0[29]/USB_D+ J6-37 USB_D+ P0[30]/USB_D- J6-36 USB_D-</p><p>P1[0]/ENET-TXD0 J6-34? TXD0 TX-(Ethernet PHY) P1[1]/ENET_TXD1 J6-35? TXD1 TX+(Ethernet PHY) P1[4]/ENET_TX_EN TXEN N/A P1[8]/ENET_CRS CRS_DV/MODE2 N/A P1[9]/ENET_RXD0 J6-32? RXD0/MODE0 RD-(Ethernet PHY) P1[10]/ENET_RXD1 J6-33? RXD1/MODE1 RD+(Ethernet PHY) P1[14]/ENET_RX_ER RXER/PHYAD0 N/A P1[15]/ENET_REF_CLK REFCLK N/A P1[16]/ENET_MDC MDC N/A P1[17]/ENET_MDIO MDIO N/A P1[18]/USB_UP_LED/PWM1[1]/CAP1[0] PAD1 N/A P1[19]/MC0A/USB_PPWR/N_CAP1.1 PAD2 N/A P1[20]/MCFB0/PWM1.2/SCK0 PAD3 N/A P1[21]/MCABORT/PWM1.3/SSEL0 PAD4 N/A P1[22]/MC0B/USB-PWRD/MAT1.0 PAD5 N/A P1[23]/MCFB1/PWM1.4/MISO0 PAD6 N/A P1[24]/MCFB2/PWM1.5/MOSI0 PAD7 N/A P1[25]/MC1A/MAT1.1 PAD8 N/A P1[26]/MC1B/PWM1.6/CAP0.0 PAD9 N/A P1[27]/CLKOUT/USB-OVRCR-N/CAP0.1 PAD10 N/A P1[28]/MC2A/PCAP1.0/MAT0.0 PAD11 N/A P1[29]/MC2B/PCAP1.1/MAT0.1 PAD12 N/A P1[30]/VBUS/AD0[4] J6-19 AD0.4 P1[31]/SCK1/AD0[5] J6-20 AD0.5</p><p>P2[0]/PWM1.1/TXD1 J6-42 PWM1.1 / RGB LED / RS422 RX P2[1]/PWM1.2/RXD1 J6-43 PWM1.2 / OLED voltage / RGB LED P2[2]/PWM1.3/CTS1/TRACEDATA[3] J6-44 PWM1.3 P2[3]/PWM1.4/DCD1/TRACEDATA[2] J6-45 PWM1.4 P2[4]/PWM1.5/DSR1/TRACEDATA[1] J6-46 PWM1.5 P2[5]/PWM1[6]/DTR1/TRACEDATA[0] J6-47 PWM1.6 P2[6]/PCAP1[0]/RI1/TRACECLK J6-48 P2[7]/RD2/RTS1 J6-49 OLED command/data P2[8]/TD2/TXD2 J6-50 P2[9]/USB_CONNECT/RXD2 PAD19 USB Pullup N/A P2[10]/EINT0/NMI J6-51 P2[11]/EINT1/I2STX_CLK J6-52 P2[12]/EINT2/I2STX_WS j6-53 P2[13]/EINT3/I2STX_SDA J6-27</p><p>P3[25]/MAT0.0/PWM1.2 PAD13 N/A P3[26]/STCLK/MAT0.1/PWM1.3 PAD14 N/A</p><p>P4[28]/RX-MCLK/MAT2.0/TXD3 PAD15 N/A P4[29]/TX-MCLK/MAT2.1/RXD3 PAD16 N/A</p><p>Embedded Artist&#39;s Base Board ^^^^^^^^^^^^^^^^^^^^^^^^^^^^</p><h2 id="jumpers" tabindex="-1">Jumpers <a class="header-anchor" href="#jumpers" aria-label="Permalink to &quot;Jumpers&quot;">​</a></h2><p>There are many jumpers on the base board. A usable combination is the default jumper settings WITH the two J54 jumpers both removed. Those jumpers are for ISP support and will cause the board to reset.</p><p>To use the SD, J55 must be set to provide chip select PIO1_11 signal as the SD slot chip select.</p><h2 id="sd-slot" tabindex="-1">SD Slot <a class="header-anchor" href="#sd-slot" aria-label="Permalink to &quot;SD Slot&quot;">​</a></h2><pre><code>   Base-board  J4/J6 LPC1768
</code></pre><p>SD Signal Pin Pin</p><hr><p>CS PIO1_11* 55 P2.2 DIN PIO0_9-MOSI 5 P0.9 MOSI1 DOUT PIO0_8-MISO 6 P0.8 MISO1 CLK PIO2_11-SCK 7 P0.9 SCK1 CD PIO2_10 52 P2.11</p><p>These jumper settings are required:</p><p>*J55 must be set to provide chip select PIO1_11 signal as the SD slot chip select.</p><h2 id="usb-device" tabindex="-1">USB Device <a class="header-anchor" href="#usb-device" aria-label="Permalink to &quot;USB Device&quot;">​</a></h2><p>Base-board J4/J6 LPC1768 Signal Pin Pin ------------------- ----- -------- PIO0_6-USB_CONNECT* 23 P0.21 USB_DM 36 USB_D- USB_DP 37 USB_D+ PIO0_3-VBUS_SENSE** 39 P0.5</p><p>These jumper settings are listed for information only. They are <em>not</em> required for use with NuttX and LPCXpresso. The configurable pins (P0.21 and P0.5) are not used!</p><p>*J14 must be set to permit GPIO control of the USB connect pin **J12 must be set to permit GPIO control of the USB vbus sense pin J23 is associated the LEDs used for USB support</p><p>Here is a more detailed pin mapping:</p><p>---------------------------------------------+------+----------------------------------------------- LPCXpresso | J4/6 | Base Board ---------------------------------------------| |----------------------------------------------- LPC1768 Signal | | Signal Connection ------------------------------ --------------+------+------------------- --------------------------- P0.29/USB-D+ P0[29]/USB-D+ | 37 | USB_DP USB D+ P0.30/USB-D- P0[30]/USB-D- | 36 | USB_DM USB D- P1.18/USB-UP-LED/PWM1.1/CAP1.0 PAD1 | N/A | N/A N/A P1.30/VBUS/AD0.4 P1[30] | 19 | PIO1_3 (Not used on board) P2.9/USB-CONNECT/RXD2* PAD19 | N/A | N/A N/A ------------------------------ --------------+------+------------------- --------------------------- P0.21/RI1/RD1 P0[21] | 23 | PIO0_6-USB_CONNECT VBUS via J14 and transistor P0.5/I2SRX-WS/TD2/CAP2.1 P0[5] | 39 | PIO0_3-VBUS_SENSE VBUS via J12 ------------------------------ --------------+------+------------------- ---------------------------</p><p>*P2.9 connects to a transistor driven USB-D+ pullup on the LPCXpresso board.</p><h2 id="_96x64-white-oled-with-i2c-spi-interface" tabindex="-1">96x64 White OLED with I2C/SPI interface <a class="header-anchor" href="#_96x64-white-oled-with-i2c-spi-interface" aria-label="Permalink to &quot;96x64 White OLED with I2C/SPI interface&quot;">​</a></h2><p>The OLED display can be connected either to the SPI-bus or the I2C-bus.</p><p>Jumper Settings:</p><pre><code>- For the SPI interface (default), insert jumpers in J42, J43, J45 pin1-2
  and J46 pin 1-2.
- For I2C interface, insert jumpers in J45 pin 2-3, J46 pin 2-3 and J47.

In either case insert a jumper in J44 in order to allow PIO1_10 to control
the OLED-voltage.
</code></pre><p>Jumper Signal Control:</p><pre><code>J42: Short: SPI Open: I2C (Default: inserted)

J44: Allow control of OLED voltage (Default: inserted)

  PIO1_10--------&gt;J44 ----------&gt;FAN5331

Common Reset:

  PIO0_0-RESET ---------------&gt; RES#

J43: Select OLED chip select
J58: For embed (Default: not inserted)

  PIO0_2---------------&gt;J43 ----&gt;CS#
  PIO2_7---------&gt;J58 -&gt;J43 ----&gt;D/C#
  PIO0_8-MISO --------^

J45: Select SPI or I2C clock (Default: SPI clock)

  PIO2_11-SCK----&gt;J45 ----------&gt; D0
  PIO0_4-SCL------------^

J46: Select serial data input (Default: SPI MOSI)

  PIO0_9-MOSI----&gt;J46 ----------&gt; D1
  I2C_SDA---------------^

J47: Allow I2C bi-directional communications (Default: SPI unidirectional)

  PIO0_5-SDA----&gt;J47 ----------&gt; D2

LPCXpresso Signals

  ----------------------------+-------+-------------- ----------------------------------------
  LPC1758 Pin                 | J4/6  | Base Board    Description
  ----------------------------+-------+-------------- ----------------------------------------
  P2.1/PWM1.2/RXD1            |  43   | PIO1_10       FAN5331 Power Control (SHDN#)
  RESET_N                     |   4   | PIO0_0-RESET  OLED reset (RES#) -- Resets EVERYTHING
  P0.6/I2SRX-SDA/SSEL1/MAT2.0 |   8   | PIO0_2        OLED chip select (CS#)
  P2.7/RD2/RTS1               |  49   | PIO2_7        OLED command/data (D/C#)
  P0.7/I2STX-CLK/SCK1/MAT2.1  |   7   | PIO2_11-SCK   OLED clock (D0)
  P0.9/I2STX-SDA/MOSI1/MAT2.3 |   5   | PIO0_9-MOSI   OLED data in (D1)
  ----------------------------+-------+-------------- ----------------------------------------
</code></pre><p>Code Red IDE ^^^^^^^^^^^^</p><p>NuttX is built using command-line make. It can be used with an IDE, but some effort will be required to create the project.</p><h2 id="makefile-build" tabindex="-1">Makefile Build <a class="header-anchor" href="#makefile-build" aria-label="Permalink to &quot;Makefile Build&quot;">​</a></h2><p>Under Linux Eclipse, it is pretty easy to set up an &quot;empty makefile project&quot; and simply use the NuttX makefile to build the system. That is almost for free under Linux. Under Windows, you will need to set up the &quot;Cygwin GCC&quot; empty makefile project in order to work with Windows (Google for &quot;Eclipse Cygwin&quot; - there is a lot of help on the internet).</p><h2 id="native-build" tabindex="-1">Native Build <a class="header-anchor" href="#native-build" aria-label="Permalink to &quot;Native Build&quot;">​</a></h2><p>Here are a few tips before you start that effort:</p><ol><li>Select the toolchain that you will be using in your .config file</li><li>Start the NuttX build at least one time from the Cygwin command line before trying to create your project. This is necessary to create certain auto-generated files and directories that will be needed.</li><li>Set up include paths: You will need include/, arch/arm/src/lpc17xx_40xx, arch/arm/src/common, arch/arm/src/armv7-m, and sched/.</li><li>All assembly files need to have the definition option -D <strong>ASSEMBLY</strong> on the command line.</li></ol><p>Startup files will probably cause you some headaches. The NuttX startup file is arch/arm/src/lpc17x/lpc17_40_vectors.S.</p><h2 id="using-code-red-gnu-tools-from-cygwin" tabindex="-1">Using Code Red GNU Tools from Cygwin <a class="header-anchor" href="#using-code-red-gnu-tools-from-cygwin" aria-label="Permalink to &quot;Using Code Red GNU Tools from Cygwin&quot;">​</a></h2><p>Under Cygwin, the Code Red command line tools (e.g., arm-non-eabi-gcc) cannot be executed because they only have execute privileges for Administrators. I worked around this by:</p><p>Opening a native Cygwin RXVT as Administrator (Right click, &quot;Run as administrator&quot;), then executing &#39;chmod 755 *.exe&#39; in the following directories:</p><p>/cygdrive/c/nxp/lpcxpreeso_3.6/bin, and /cygdrive/c/nxp/lpcxpreeso_3.6/Tools/bin</p><p>Command Line Flash Programming ------------------------------</p><p>If using LPCLink as your debug connection, first of all boot the LPC-Link using the script:</p><pre><code>bin\\Scripts\\bootLPCXpresso type
</code></pre><p>where type = winusb for Windows XP, or type = hid for Windows Vista / 7.</p><p>Now run the flash programming utility with the following options</p><pre><code>flash_utility wire -ptarget -flash-load[-exec]=filename [-load-base=base_address]
</code></pre><p>Where flash_utility is one of:</p><pre><code>crt_emu_lpc11_13 (for LPC11xx or LPC13xx parts)
crt_emu_cm3_nxp (for LPC17xx/LPC40xx parts)
crt_emu_a7_nxp (for LPC21/22/23/24 parts)
crt_emu_a9_nxp (for LPC31/32 and LPC29xx parts)
crt_emu_cm3_lmi (for TI Stellaris parts)
</code></pre><p>wire is one of:</p><pre><code>(empty) (for Red Probe+, Red Probe, RDB1768v1, or TI Stellaris evaluation boards)
-wire=hid (for RDB1768v2 without upgraded firmware)
-wire=winusb (for RDB1768v2 with upgraded firmware)
-wire=winusb (for LPC-Link on Windows XP)
-wire=hid (for LPC-Link on Windows Vista/ Windows 7)
</code></pre><p>target is the target chip name. For example LPC1343, LPC1114/301, LPC1768 etc.</p><p>filename is the file to flash program. It may be an executable (axf) or a binary (bin) file. If using a binary file, the base_address must be specified.</p><p>base_address is the base load address when flash programming a binary file. It should be specified as a hex value with a leading 0x.</p><p>Note: - flash-load will leave the processor in a stopped state - flash-load-exec will start execution of application as soon as download has completed.</p><p>Examples To load the executable file app.axf and start it executing on an LPC1758 target using Red Probe, use the following command line:</p><pre><code>  crt_emu_cm3_nxp -pLPC1758 -flash-load-exec=app.axf

To load the binary file binary.bin to address 0x1000 to an LPC1343 target
using LPC-Link on Windows XP, use the following command line:

  crt_emu_lpc11_13_nxp -wire=hid -pLPC1343 -flash-load=binary.bin -load-base=0x1000
</code></pre><p>tools/flash.sh --------------</p><p>All of the above steps are automated in the bash script flash.sh that can be found in the boards/arm/lpc17xx_40xx/lpcxpresso/tools directory.</p><p>LEDs ^^^^</p><p>If CONFIG_ARCH_LEDS is defined, then support for the LPCXpresso LEDs will be included in the build. See:</p><ul><li><p>boards/arm/lpc17xx_40xx/lpcxpresso-lpc1768/include/board.h - Defines LED constants, types and prototypes the LED interface functions.</p></li><li><p>boards/arm/lpc17xx_40xx/lpcxpresso-lpc1768/src/lpcxpresso-lpc1768.h - GPIO settings for the LEDs.</p></li><li><p>boards/arm/lpc17xx_40xx/lpcxpresso-lpc1768/src/up_leds.c - LED control logic.</p></li></ul><p>The LPCXpresso LPC1768 has a single LEDs (there are more on the Embedded Artists base board, but those are not controlled by NuttX). Usage this single LED by NuttX is as follows:</p><ul><li><p>The LED is not illuminated until the LPCXpresso completes initialization.</p><p>If the LED is stuck in the OFF state, this means that the LPCXpresso did not complete initialization.</p></li><li><p>Each time the OS enters an interrupt (or a signal) it will turn the LED OFF and restores its previous stated upon return from the interrupt (or signal).</p><p>The normal state, after initialization will be a dull glow. The brightness of the glow will be inversely related to the proportion of time spent within interrupt handling logic. The glow may decrease in brightness when the system is very busy handling device interrupts and increase in brightness as the system becomes idle.</p><p>Stuck in the OFF state suggests that that the system never completed initialization; Stuck in the ON state would indicated that the system initialized, but is not taking interrupts.</p></li><li><p>If a fatal assertion or a fatal unhandled exception occurs, the LED will flash strongly as a slow, 2Hz rate.</p></li></ul><p>LPCXpresso Configuration Options ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^</p><p>General Architecture Settings:</p><pre><code>CONFIG_ARCH - Identifies the arch/ subdirectory.  This should
 be set to:

   CONFIG_ARCH=arm

CONFIG_ARCH_family - For use in C code:

   CONFIG_ARCH_ARM=y

CONFIG_ARCH_architecture - For use in C code:

   CONFIG_ARCH_CORTEXM3=y

CONFIG_ARCH_CHIP - Identifies the arch/*/chip subdirectory

   CONFIG_ARCH_CHIP=lpc17xx

CONFIG_ARCH_CHIP_name - For use in C code to identify the exact
   chip:

   CONFIG_ARCH_CHIP_LPC1768=y

CONFIG_ARCH_BOARD - Identifies the boards/ subdirectory and
   hence, the board that supports the particular chip or SoC.

   CONFIG_ARCH_BOARD=lpcxpresso-lpc1768

CONFIG_ARCH_BOARD_name - For use in C code

   CONFIG_ARCH_BOARD_LPCEXPRESSO=y

CONFIG_ARCH_LOOPSPERMSEC - Must be calibrated for correct operation
   of delay loops

CONFIG_ENDIAN_BIG - define if big endian (default is little
   endian)

CONFIG_RAM_SIZE - Describes the installed DRAM (CPU SRAM in this case):

   CONFIG_RAM_SIZE=(32*1024) (32Kb)

   There is an additional 32Kb of SRAM in AHB SRAM banks 0 and 1.

CONFIG_RAM_START - The start address of installed DRAM

   CONFIG_RAM_START=0x10000000

CONFIG_ARCH_LEDS - Use LEDs to show state. Unique to boards that
   have LEDs

CONFIG_ARCH_INTERRUPTSTACK - This architecture supports an interrupt
   stack. If defined, this symbol is the size of the interrupt
   stack in bytes.  If not defined, the user task stacks will be
   used during interrupt handling.

CONFIG_ARCH_STACKDUMP - Do stack dumps after assertions

CONFIG_ARCH_LEDS -  Use LEDs to show state. Unique to board architecture.

Individual subsystems can be enabled:
  CONFIG_LPC17_40_MAINOSC=y
  CONFIG_LPC17_40_PLL0=y
  CONFIG_LPC17_40_PLL1=n
  CONFIG_LPC17_40_ETHERNET=n
  CONFIG_LPC17_40_USBHOST=n
  CONFIG_LPC17_40_USBOTG=n
  CONFIG_LPC17_40_USBDEV=n
  CONFIG_LPC17_40_UART0=y
  CONFIG_LPC17_40_UART1=n
  CONFIG_LPC17_40_UART2=n
  CONFIG_LPC17_40_UART3=n
  CONFIG_LPC17_40_CAN1=n
  CONFIG_LPC17_40_CAN2=n
  CONFIG_LPC17_40_SPI=n
  CONFIG_LPC17_40_SSP0=n
  CONFIG_LPC17_40_SSP1=n
  CONFIG_LPC17_40_I2C0=n
  CONFIG_LPC17_40_I2C1=n
  CONFIG_LPC17_40_I2S=n
  CONFIG_LPC17_40_TMR0=n
  CONFIG_LPC17_40_TMR1=n
  CONFIG_LPC17_40_TMR2=n
  CONFIG_LPC17_40_TMR3=n
  CONFIG_LPC17_40_RIT=n
  CONFIG_LPC17_40_PWM0=n
  CONFIG_LPC17_40_MCPWM=n
  CONFIG_LPC17_40_QEI=n
  CONFIG_LPC17_40_RTC=n
  CONFIG_LPC17_40_WDT=n
  CONFIG_LPC17_40_ADC=n
  CONFIG_LPC17_40_DAC=n
  CONFIG_LPC17_40_GPDMA=n
  CONFIG_LPC17_40_FLASH=n
</code></pre><p>LPC17xx/LPC40xx specific device driver settings</p><pre><code>CONFIG_UARTn_SERIAL_CONSOLE - selects the UARTn for the
   console and ttys0 (default is the UART0).
CONFIG_UARTn_RXBUFSIZE - Characters are buffered as received.
   This specific the size of the receive buffer
CONFIG_UARTn_TXBUFSIZE - Characters are buffered before
   being sent.  This specific the size of the transmit buffer
CONFIG_UARTn_BAUD - The configure BAUD of the UART.  Must be
CONFIG_UARTn_BITS - The number of bits.  Must be either 7 or 8.
CONFIG_UARTn_PARTIY - 0=no parity, 1=odd parity, 2=even parity
CONFIG_UARTn_2STOP - Two stop bits
</code></pre><p>LPC17xx/LPC40xx specific CAN device driver settings. These settings all require CONFIG_CAN:</p><pre><code>CONFIG_CAN_EXTID - Enables support for the 29-bit extended ID.  Default
  Standard 11-bit IDs.
CONFIG_LPC17_40_CAN1_BAUD - CAN1 BAUD rate.  Required if CONFIG_LPC17_40_CAN1
  is defined.
CONFIG_LPC17_40_CAN2_BAUD - CAN1 BAUD rate.  Required if CONFIG_LPC17_40_CAN2
  is defined.
CONFIG_LPC17_40_CAN1_DIVISOR - CAN1 is clocked at CCLK divided by this
  number. (the CCLK frequency is divided by this number to get the CAN
  clock). Options = {1,2,4,6}. Default: 4.
CONFIG_LPC17_40_CAN2_DIVISOR - CAN2 is clocked at CCLK divided by this
  number.  (the CCLK frequency is divided by this number to get the CAN
  clock).  Options = {1,2,4,6}. Default: 4.
CONFIG_LPC17_40_CAN_TSEG1 - The number of CAN time quanta in segment 1.
  Default: 6
CONFIG_LPC17_40_CAN_TSEG2 = the number of CAN time quanta in segment 2.
  Default: 7
</code></pre><p>LPC17xx/LPC40xx specific PHY/Ethernet device driver settings. These setting also require CONFIG_NET and CONFIG_LPC17_40_ETHERNET.</p><pre><code>CONFIG_ETH0_PHY_KS8721 - Selects Micrel KS8721 PHY
CONFIG_LPC17_40_PHY_AUTONEG - Enable auto-negotiation
CONFIG_LPC17_40_PHY_SPEED100 - Select 100Mbit vs. 10Mbit speed.
CONFIG_LPC17_40_PHY_FDUPLEX - Select full (vs. half) duplex

CONFIG_LPC17_40_EMACRAM_SIZE - Size of EMAC RAM.  Default: 16Kb
CONFIG_LPC17_40_ETH_NTXDESC - Configured number of Tx descriptors. Default: 18
CONFIG_LPC17_40_ETH_NRXDESC - Configured number of Rx descriptors. Default: 18
CONFIG_LPC17_40_ETH_WOL - Enable Wake-up on Lan (not fully implemented).
CONFIG_NET_REGDEBUG - Enabled low level register debug.  Also needs
  CONFIG_DEBUG_FEATURES.
CONFIG_NET_DUMPPACKET - Dump all received and transmitted packets.
  Also needs CONFIG_DEBUG_FEATURES.
CONFIG_LPC17_40_ETH_HASH - Enable receipt of near-perfect match frames.
CONFIG_LPC17_40_MULTICAST - Enable receipt of multicast (and unicast) frames.
  Automatically set if CONFIG_NET_MCASTGROUP is selected.
</code></pre><p>LPC17xx/LPC40xx USB Device Configuration</p><pre><code>CONFIG_LPC17_40_USBDEV_FRAME_INTERRUPT
  Handle USB Start-Of-Frame events.
  Enable reading SOF from interrupt handler vs. simply reading on demand.
  Probably a bad idea... Unless there is some issue with sampling the SOF
  from hardware asynchronously.
CONFIG_LPC17_40_USBDEV_EPFAST_INTERRUPT
  Enable high priority interrupts.  I have no idea why you might want to
  do that
CONFIG_LPC17_40_USBDEV_NDMADESCRIPTORS
  Number of DMA descriptors to allocate in SRAM.
CONFIG_LPC17_40_USBDEV_DMA
  Enable lpc17xx/lpc40xx-specific DMA support
CONFIG_LPC17_40_USBDEV_NOVBUS
  Define if the hardware implementation does not support the VBUS signal
CONFIG_LPC17_40_USBDEV_NOLED
  Define if the hardware  implementation does not support the LED output
</code></pre><p>LPC17xx/LPC40xx USB Host Configuration (the LPCXpresso does not support USB Host)</p><pre><code>CONFIG_LPC17_40_OHCIRAM_SIZE
  Total size of OHCI RAM (in AHB SRAM Bank 1)
CONFIG_LP17_USBHOST_NEDS
  Number of endpoint descriptors
CONFIG_LP17_USBHOST_NTDS
  Number of transfer descriptors
CONFIG_LPC17_40_USBHOST_TDBUFFERS
  Number of transfer descriptor buffers
CONFIG_LPC17_40_USBHOST_TDBUFSIZE
  Size of one transfer descriptor buffer
CONFIG_LPC17_40_USBHOST_IOBUFSIZE
  Size of one end-user I/O buffer.  This can be zero if the
  application can guarantee that all end-user I/O buffers
  reside in AHB SRAM.
</code></pre><p>Configurations ^^^^^^^^^^^^^^</p><p>Each LPCXpresso configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh lpcxpresso-lpc1768:&lt;subdir&gt;
</code></pre><p>Where <code>&lt;subdir&gt;</code> is one of the following:</p><p>dhcpd: This builds the DHCP server using the apps/examples/dhcpd application (for execution from FLASH.) See apps/examples/README.txt for information about the dhcpd example.</p><pre><code>NOTES:

1. This configuration uses the mconf-based configuration tool.  To
   change this configurations using that tool, you should:

   a. Build and install the kconfig-mconf tool.  See nuttx/README.txt
      see additional README.txt files in the NuttX tools repository.

   b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the
      reconfiguration process.

2. Jumpers: Nothing special.  Use the default base board jumper
   settings.
</code></pre><p>nsh: Configures the NuttShell (nsh) located at apps/examples/nsh. The Configuration enables both the serial and telnet NSH interfaces.</p><pre><code>NOTES:

1. This configuration uses the mconf-based configuration tool.  To
   change this configurations using that tool, you should:

   a. Build and install the kconfig-mconf tool.  See nuttx/README.txt
      see additional README.txt files in the NuttX tools repository.

   b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the
      reconfiguration process.

2. This configuration has been used for testing the microSD card.
   This support is, however, disabled in the base configuration.

   At last attempt, the SPI-based mircroSD does not work at
   higher frequencies.  Setting the SPI frequency to 400000
   removes the problem.   There must be some more optimal
   value that could be determined with additional experimentation.

   Jumpers: J55 must be set to provide chip select PIO1_11 signal as
   the SD slot chip select.
</code></pre><p>nx: And example using the NuttX graphics system (NX). This example uses the UG-9664HSWAG01 driver.</p><pre><code>NOTES:

1. This configuration uses the mconf-based configuration tool.  To
   change this configurations using that tool, you should:

   a. Build and install the kconfig-mconf tool.  See nuttx/README.txt
      see additional README.txt files in the NuttX tools repository.

   b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the
      reconfiguration process.

2. Jumpers:  There are several jumper settings needed by the OLED.
   All are the default settings:

     J42: Close to select the SPI interface (Default: closed)
     J43: Close to support OLED command/data select (Default: closed)
     J44: Close to allow control of OLED voltage (Default: closed)
     J45: Close to select SPI clock (Default: closed)
     J46: Close SPI data input (MOSI) (Default:closed)
</code></pre><p>thttpd: This builds the THTTPD web server example using the THTTPD and the apps/examples/thttpd application.</p><pre><code>NOTES:

1. This configuration uses the mconf-based configuration tool.  To
   change this configurations using that tool, you should:

   a. Build and install the kconfig-mconf tool.  See nuttx/README.txt
      see additional README.txt files in the NuttX tools repository.

   b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the
      reconfiguration process.

2. You will need to build the NXFLAT toolchain as described above in
   order to use this example.

3. Build setup (easily reconfigured):

   CONFIG_HOST_LINUX=y                 : Linux
   CONFIG_ARM_TOOLCHAIN_GNU_EABI=y  : GNU EABI toolchain for Linux

4. Jumpers: Nothing special.  Use the default base board jumper
   settings.
</code></pre><p>usbmsc: This configuration directory exercises the USB mass storage class driver at apps/system/usbmsc. See apps/examples/README.txt for more information.</p><pre><code>NOTES:

1. This configuration uses the mconf-based configuration tool.  To
   change this configurations using that tool, you should:

   a. Build and install the kconfig-mconf tool.  See nuttx/README.txt
      see additional README.txt files in the NuttX tools repository.

   b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the
      reconfiguration process.

2. At present, the value for the SD SPI frequency is too high and the
   SD will fail.  Setting that frequency to 400000 removes the problem.
   TODO:  Tune this frequency to some optimal value.

3. Jumpers: J55 must be set to provide chip select PIO1_11 signal as
   the SD slot chip select.
</code></pre>`,99)]))}const u=t(s,[["render",a]]);export{_ as __pageData,u as default};
