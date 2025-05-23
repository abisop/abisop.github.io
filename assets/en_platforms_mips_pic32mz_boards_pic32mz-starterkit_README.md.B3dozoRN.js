import{_ as t,c as i,al as o,o as n}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"boards/pic32mz-starterkit README","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/mips/pic32mz/boards/pic32mz-starterkit/README.md","filePath":"en/platforms/mips/pic32mz/boards/pic32mz-starterkit/README.md"}'),a={name:"en/platforms/mips/pic32mz/boards/pic32mz-starterkit/README.md"};function r(s,e,l,h,d,c){return n(),i("div",null,e[0]||(e[0]=[o(`<h1 id="boards-pic32mz-starterkit-readme" tabindex="-1">boards/pic32mz-starterkit README <a class="header-anchor" href="#boards-pic32mz-starterkit-readme" aria-label="Permalink to &quot;boards/pic32mz-starterkit README&quot;">​</a></h1><p>This README file discusses the port of NuttX to the Microchip PIC32MZ Embedded Connectivity (EC) Starter Kit.</p><h1 id="contents" tabindex="-1">Contents <a class="header-anchor" href="#contents" aria-label="Permalink to &quot;Contents&quot;">​</a></h1><p>Port Status Board Overview On Board Debug Support Creating Compatible NuttX HEX files Tool Issues Serial Console LEDs Configurations</p><h1 id="port-status" tabindex="-1">Port Status <a class="header-anchor" href="#port-status" aria-label="Permalink to &quot;Port Status&quot;">​</a></h1><p>As of this writing (2015-03-01), the basic port is complete including minimal support for the NuttShell (NSH) over UART1. No testing has yet been performed due to seemingly insurmountable debug problems:</p><p>Thusfar, no one has been successful using NuttX with MPLABX. All debug is being performed using a J-Link debugger via some custom interconnect boards.</p><p>Patches were provided by Kristopher Tate on 2015-03-21 that support the serial console with the NuttShell, completing the basic bring-up.</p><h1 id="board-overview" tabindex="-1">Board Overview <a class="header-anchor" href="#board-overview" aria-label="Permalink to &quot;Board Overview&quot;">​</a></h1><p>There are two configurations of the Microchip PIC32MZ Embedded Connectivity (EC) Starter Kit:</p><ol><li>The PIC32MZ Embedded Connectivity Starter Kit based on the PIC32MZ2048ECH144-I/PH chip (DM320006), and</li><li>The PIC32MZ Embedded Connectivity Starter Kit based on the PIC32MZ2048ECM144-I/PH w/Crypto Engine (DM320006-C)</li></ol><p>See www.microchip.com for further information.</p><p>Key features of the PIC32MZ Starter Kit include;</p><ul><li>On-board crystal or oscillator for precision microcontroller clocking (24 MHz).</li><li>32 kHz oscillator for RTCC and Timer1 (optional).</li><li>Three push button switches for user-defined inputs.</li><li>Three user-defined indicator LEDs.</li><li>USB Type A receptacle connectivity for PIC32 host-based applications.</li><li>USB Type micro-AB receptacle for OTG and USB device connectivity for PIC32 OTG/device-based applications.</li><li>Daughter board connectors for flexible Ethernet PHY options.</li><li>50 MHz Ethernet PHY oscillator.</li><li>External 4 GB SQI memory for expanded memory applications.</li><li>PIC24FJ256GB106 USB microcontroller for on-board debugging.</li><li>USB connectivity for on-board debugger communications.</li><li>Regulated +3.3V power supply for powering the starter kit through USB or expansion board.</li><li>Connector for various expansion boards.</li></ul><p>The PIC32MZ starter kit comes complete with a LAN8740 PHY daughter board.</p><p>Testing was performed with the following additional hardware:</p><ul><li>Microchip PIC32MZ Embedded Connectivity (EC) Adapter Board (AC320006) that allows connection of the PIC32MZEC Starter Kit to the Microchip Multimedia Expansion Board (MEB, DM320005) or PIC32 I/O Expansion Board (DM320002). These were previously used with the PIC32MX bringup.</li><li>Microchip Multimedia Expansion Board II (MEB II, DM320005-2).</li></ul><h1 id="on-board-debug-support" tabindex="-1">On Board Debug Support <a class="header-anchor" href="#on-board-debug-support" aria-label="Permalink to &quot;On Board Debug Support&quot;">​</a></h1><p>The starter kit includes a PIC24FJ256GB106 USB microcontroller that provides debugger connectivity over USB. The PIC24FJ256GB106 is hard-wired to the PIC32 device to provide protocol translation through the I/O pins of the PIC24FJ256GB106 to the ICSP™ pins of the PIC32 device.</p><p>If MPLAB® REAL ICE™ or MPLAB ICD 3 is used with the starter kit, disconnect the onboard debugger from the PIC32 device by removing the jumper JP2. When the on-board debugger is required, replace the jumper JP2. When the jumper JP2 is installed, pin 1 must be connected to pin 3 and pin 2 must be connected to pin 4.</p><h1 id="creating-compatible-nuttx-hex-files" tabindex="-1">Creating Compatible NuttX HEX files <a class="header-anchor" href="#creating-compatible-nuttx-hex-files" aria-label="Permalink to &quot;Creating Compatible NuttX HEX files&quot;">​</a></h1><p>Intel Hex Format Files: -----------------------</p><pre><code>When NuttX is built it will produce two files in the top-level NuttX
directory:

1) nuttx - This is an ELF file, and
2) nuttx.hex - This is an Intel Hex format file.  This is controlled by
   the setting CONFIG_INTELHEX_BINARY in the .config file.

The PICkit tool wants an Intel Hex format file to burn into FLASH. However,
there is a problem with the generated nutt.hex: The tool expects the nuttx.hex
file to contain physical addresses.  But the nuttx.hex file generated from the
top-level make will have address in the KSEG0 and KSEG1 regions.
</code></pre><p>tools/pic32/mkpichex: ----------------------</p><pre><code>There is a simple tool in the NuttX tools/pic32 directory that can be
used to solve both issues with the nuttx.hex file.  But, first, you must
build the tool:

  cd tools/pic32
  make -f Makefile.host

Now you will have an executable file called mkpichex (or mkpichex.exe on
Cygwin).  This program will take the nutt.hex file as an input, it will
convert all of the KSEG0 and KSEG1 addresses to physical address, and
it will write the modified file, replacing the original nuttx.hex.

To use this file, you need to do the following things:

  export PATH=???  # Add the NuttX tools/pic32 directory to your
                   # PATH variable
  make             # Build nuttx and nuttx.hex
  mkpichex $PWD    #  Convert addresses in nuttx.hex.  $PWD is the path
                   # to the top-level build directory.  It is the only
                   # required input to mkpichex.

  This procedure is automatically performed at the end of a build.
</code></pre><h1 id="tool-issues" tabindex="-1">Tool Issues <a class="header-anchor" href="#tool-issues" aria-label="Permalink to &quot;Tool Issues&quot;">​</a></h1><h2 id="pinquino-toolchain" tabindex="-1">Pinquino Toolchain <a class="header-anchor" href="#pinquino-toolchain" aria-label="Permalink to &quot;Pinquino Toolchain&quot;">​</a></h2><p>If you use the Pinguino toolchain, you will probably see this error:</p><p>C:<code>\\pinguino-11</code><code>\\compilers</code><code>\\p32</code><code>\\bin</code><code>\\p32</code>-ld.exe: target elf32-tradlittlemips not found</p><p>This is due to linker differences in the toolchains. The linker script at boards/pic32mz-starterkit has:</p><pre><code>OUTPUT_FORMAT(&quot;elf32-tradlittlemips&quot;)
</code></pre><p>This error can be eliminated with the Pinguino toolchain by changing this to:</p><pre><code>OUTPUT_FORMAT(&quot;elf32-littlemips&quot;)
</code></pre><p>Mentor Toolchain ----------------</p><pre><code>https://sourcery.mentor.com/GNUToolchain/release2934 tools.
</code></pre><p>If you use this toolchain, you will need to add CROSSDEV=mips-sde-elf- to your Make.defs file.</p><h2 id="icd3" tabindex="-1">ICD3 <a class="header-anchor" href="#icd3" aria-label="Permalink to &quot;ICD3&quot;">​</a></h2><p>The onboard debugger is Slow and one is better off using an ICD3. By removing jumper JP2, I can disable the on-board OpenHCD debugger an enable the RJ11 debug connector. My ICD 3 does seems to work properly using this configuration, at least in the sense that it is recognized by both MPLABX IDE and IPE.</p><h2 id="segger-j-link" tabindex="-1">Segger J-Link <a class="header-anchor" href="#segger-j-link" aria-label="Permalink to &quot;Segger J-Link&quot;">​</a></h2><p>If using a Jlink that only these versions work with PIC32:</p><pre><code>J-Link BASE / EDU V9 or later
J-Link ULTRA+ / PRO V4 or later
</code></pre><p>Oddly, you must use the G version in the command:</p><pre><code>JLinkGDBServer  -device PIC32MZ2048ECG144 -if 2-wire-JTAG-PIC32 -speed 12000

Even though we have PIC32MZ2048ECM144 parts on our board. (JLinkGDBServer
will except anything and just mess up your weekend)
</code></pre><h1 id="serial-console" tabindex="-1">Serial Console <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;Serial Console&quot;">​</a></h1><h2 id="meb-ii" tabindex="-1">MEB-II <a class="header-anchor" href="#meb-ii" aria-label="Permalink to &quot;MEB-II&quot;">​</a></h2><p>By default, the UART1 is configured for the pins used by the MEB-II board. The UART1 signals are available at the MEB-II PICTail connector:</p><pre><code>--------------- --------- -------------- ------------
PIC32MZ PIN     CONNECTOR MEB-II PIN     PICTAIL PIN
FUNCTION        J1        NAME           J2
--------------- --------- -------------- ------------
RPA14/SCL1/RA14 124       SCL1/TOUCH_SCL 4
RPA15/SDA1/RA15 126       SDA1/TOUCH_SDA 6
                          +3.3V          1,26
                          GND            28
--------------- --------- -------------- ------------
</code></pre><p>This pin selection is controlled by these definitions in pic32mz-starterkit/include/board.h:</p><pre><code>#define BOARD_U1RX_PPS  U1RXR_RPA14
#define BOARD_U1TX_PPS  U1TX_RPA15R
</code></pre><h2 id="pic32mx-i-o-expansion-board-with-adapter-board" tabindex="-1">PIC32MX I/O Expansion Board with Adapter Board <a class="header-anchor" href="#pic32mx-i-o-expansion-board-with-adapter-board" aria-label="Permalink to &quot;PIC32MX I/O Expansion Board with Adapter Board&quot;">​</a></h2><p>If the MEB-II UART configuration when used with the I/O Expansion board (with the adapter), then UART will be on J11 with Pin 35 being U1RX (into MZ) and Pin 37 being TU1X (out of MZ).</p><h2 id="directly-from-the-adapter-board" tabindex="-1">Directly from the Adapter Board <a class="header-anchor" href="#directly-from-the-adapter-board" aria-label="Permalink to &quot;Directly from the Adapter Board&quot;">​</a></h2><p>But you can get serial port directly from the PIC32MZ Embedded Connectivity (EC) Adapter Board (AC320006). The Microchip adapter board brings out UART signals as follows:</p><p>JP7 redirects J1 U3_TX to either J2 SOSCO/RC14 or U1_TX:</p><pre><code>Adapter
-----------------------------------------------------------------------
JP7, Pin 1: J2 Pin 32, SOSCO/RC14
     Pin 2: J1 Pin 17, U3_TX
     Pin 3: J2 Pin 90, U1_TX

PIC32MZ Starter Kit
-----------------------------------------------------------------------
            J1 Pin 17, SOSCO/RC14  PIC32MZ SOSCO/RPC14/T1CK/RC14

RPC14 supports U1RX, U4RX, and U3TX
</code></pre><p>JP8 redirects J1 RB3/AN3/SDO4/WIFI_SDI to either J2 AN3/SDO4/WIFI_SDI or U3_RX:</p><pre><code>Adapter                                        PIC32MZ Starter Kit
---------------------------------------------- -------------------------
JP8, Pin 1: J2, Pin 66,  AN3/SDO4/WIFI_SDI
     Pin 2: J1, Pin 105, RB3/AN3/SDO4/WIFI_SDI
     Pin 3: J2, Pin 88,  U3_RX

PIC32MZ Starter Kit
-----------------------------------------------------------------------
            J1, Pin 105, AN3/C2INA/RPB3/RB3

RPB3 supports U3RX, U1TX, and U5TX
</code></pre><p>Thus UART1 or UART3 could be used as a serial console if only the PIC32MZEC Adapter Board is connected.</p><p>The default serial configuration here in these configurations is UART1 using RPC14 and RPB3. That UART selection can be change by running &#39;make menuconfig&#39;. The UART pin selections would need to be changed by editing boards/pc32mz-starterkit/include/board.h.</p><p>If using a AC320006 by itself, JP7 pin 2 and JP8 pin 2 is where you would connect a 3.3 Volt TTL serial interface.</p><p>For a configuration using UART1 connect: TX to AC320006-JP7 pin 2 which is PIC32MZ pin 106 (RPC14) used as U1RX RX to AC320006-JP8 pin 2 which is PIC32MZ pin 31 (RPB3)) used as U1TX</p><p>For a configuration using For UART3 connect: TX to AC320006-JP8 pin 2 which is PIC32MZ pin 31 (RPB3)) used as U3RX RX to AC320006-JP7 pin 2 which is PIC32MZ pin 106 (RPC14) used as U3TX</p><p>If using a AC320006 plugged into a DM320002 then regardless of which UART, UART1 or UART3 is configured in software, the jumpers on the AC320006 are the same, just the signal directions and UART changes.</p><pre><code>                                      UART1   UART3
</code></pre><p>AC320006-JP7 connect pin 2 to pin 3. U1RX U3TX AC320006-JP8 connect pin 2 to pin 3. U1TX U3RX</p><p>For the default configuration using UART1 the PIC32MZ pin 106 (RPC14) will be configured as U1RX and is tied to the AC320006&#39;s JP7 Pin 2. With the jumpers as listed above, once the AC320006 is plugged into the DM320002, the PIC32MZ U1RX will be connected to the DM320002&#39;s J11 pin 43. The DM320002&#39;s J11 pin 43 should then be connected to the TX of a 3.3 volt TTL serial converter such as a FTDI TTL232RG. For the FTDI TTL232RG TX is the orange wire.</p><p>Likewise the PIC32MZ pin 31 (RPB3) will be configured as U1TX and is tied to the AC320006&#39;s JP8 Pin 2. With the jumpers as listed above, once the AC320006 is plugged into the DM320002, the PIC32MZ&#39; U1TX will be connected to the DM320002&#39;s J11 pin 41. The DM320002&#39;s J11 pin 41 should then be connected to the RX signal of a 3.3 volt TTL serial converter. For the FTDI TTL232RG RX is the yellow wire.</p><p>For the alternate configuration using UART3 the PIC32MZ pin 106 (RPC14) will be configured as U3TX and is tied to the AC320006&#39;s JP7 Pin 2. With the jumpers as listed above, once the AC320006 is plugged into the DM320002, the PIC32MZ U3TX will be connected to the DM320002&#39;s J11 pin 43. The DM320002&#39;s J11 pin 43 should then be connected to the RX of a 3.3 volt TTL serial converter such as a FTDI TTL232RG. For the FTDI TTL232RG TX is the yellow wire.</p><p>Likewise the PIC32MZ pin 31 (RPB3) will be configured as U3RX and is tied to the AC320006&#39;s JP8 Pin 2. With the jumpers as listed above, once the AC320006 is plugged into the DM320002, the PIC32MZ&#39; U3RX will be connected to the DM320002&#39;s J11 pin 41. The DM320002&#39;s J11 pin 41 should then be connected to the TX signal of a 3.3 volt TTL serial converter. For the FTDI TTL232RG RX is the orange wire.</p><h2 id="board-h-header-file-changes" tabindex="-1">board.h Header File Changes <a class="header-anchor" href="#board-h-header-file-changes" aria-label="Permalink to &quot;board.h Header File Changes&quot;">​</a></h2><p>The board configuration is currently set up to use the Serial console on the MEB-II board. If you want to use the adapter board directly, you willneed to change pic32mz-starterkit/include/board.h as follows:</p><pre><code>-#define BOARD_U1RX_PPS  U1RXR_RPA14
-#define BOARD_U1TX_PPS  U1TX_RPA15R
+#define BOARD_U1RX_PPS  U1RXR_RPC14
+#define BOARD_U1TX_PPS  U1TX_RPB3R
</code></pre><h1 id="leds-and-buttons" tabindex="-1">LEDs and Buttons <a class="header-anchor" href="#leds-and-buttons" aria-label="Permalink to &quot;LEDs and Buttons&quot;">​</a></h1><h2 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h2><p>The PIC32MZ Ethernet Starter kit has 3 user LEDs labelled LED1-3 on the board:</p><p>PIN LED Notes</p><hr><p>RH0 LED1 High illuminates (RED) RH1 LED3 High illuminates (YELLOW) RH2 LED2 High illuminates (GREEN)</p><p>If CONFIG_ARCH_LEDS is defined, then NuttX will control these LEDs as follows:</p><pre><code> ON                          OFF    
</code></pre><hr><pre><code> LED1   LED2   LED3   LED1   LED2   LED3
</code></pre><p>LED_STARTED 0 OFF OFF OFF --- --- --- LED_HEAPALLOCATE 1 ON OFF N/C --- --- --- LED_IRQSENABLED 2 OFF ON N/C --- --- --- LED_STACKCREATED 3 ON ON N/C --- --- --- LED_INIRQ 4 N/C N/C ON N/C N/C OFF LED_SIGNAL 4 N/C N/C ON N/C N/C OFF LED_ASSERTION 4 N/C N/C ON N/C N/C OFF LED_PANIC 5 ON N/C N/C OFF N/C N/C</p><p>Buttons -------</p><p>The PIC32MZ Ethernet Starter kit has 3 user push buttons labelled SW1-3 on the board:</p><p>PIN LED Notes</p><hr><p>RB12 SW1 Active-low RB13 SW2 Active-low RB14 SW3 Active-low</p><p>The switches do not have any debounce circuitry and require internal pull- up resistors. When Idle, the switches are pulled high (+3.3V), and they are grounded when pressed.</p><h1 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h1><h2 id="information-common-to-all-configurations" tabindex="-1">Information Common to All Configurations <a class="header-anchor" href="#information-common-to-all-configurations" aria-label="Permalink to &quot;Information Common to All Configurations&quot;">​</a></h2><p>Each PIC32MZ configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh [OPTIONS] pic32mz-starterkit:&lt;subdir&gt;
</code></pre><p>Where typical options are -l to configure to build on Linux or -c to configure for Cygwin under Linux. &#39;tools/configure.sh -h&#39; will show you all of the options.</p><p>Before building, make sure the PATH environment variable includes the correct path to the directory than holds your toolchain binaries.</p><p>And then build NuttX by simply typing the following. At the conclusion of the make, the nuttx binary will reside in an ELF file called, simply, nuttx.</p><pre><code>make
</code></pre><p>The <code>&lt;subdir&gt;</code> that is provided above as an argument to the tools/configure.sh must be is one of the following.</p><h2 id="configuration-directories" tabindex="-1">Configuration Directories <a class="header-anchor" href="#configuration-directories" aria-label="Permalink to &quot;Configuration Directories&quot;">​</a></h2><p>nsh:</p><pre><code>This is the NuttShell (NSH) using the NSH startup logic at
apps/examples/nsh.

NOTES:

1. This configuration uses the mconf-based configuration tool.  To
   change this configurations using that tool, you should:

   a. Build and install the kconfig-mconf tool.  See nuttx/README.txt
      see additional README.txt files in the NuttX tools repository.

   b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the
      reconfiguration process.

2. Serial Output

   The OS test produces all of its test output on the serial console.
   This configuration has UART1 enabled as a serial console.  This
   can easily be changed by reconfiguring with &#39;make menuconfig&#39;.

3. Toolchain

   By default, the Pinguino MIPs tool chain is used.  This toolchain
   selection can easily be changed with &#39;make menuconfig&#39;.

4. Default configuration:  These are other things that you may want to
   change in the configuration:

   CONFIG_ARCH_CHIP_PIC32MZ2048ECM=y : Assumes part with Crypto Engine
   CONFIG_PIC32MZ_DEBUGGER_ENABLE=n  : Debugger is disabled
   CONFIG_PIC32MZ_TRACE_ENABLE=n     : Trace is disabled
   CONFIG_PIC32MZ_JTAG_ENABLE=n      : JTAG is disabled
</code></pre>`,101)]))}const b=t(a,[["render",r]]);export{u as __pageData,b as default};
