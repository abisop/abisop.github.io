import{_ as t,c as n,al as o,o as i}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"ST B-L475E-IOT01A","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/stm32l4/boards/b-l475e-iot01a/index.md","filePath":"en/platforms/arm/stm32l4/boards/b-l475e-iot01a/index.md"}'),s={name:"en/platforms/arm/stm32l4/boards/b-l475e-iot01a/index.md"};function a(r,e,l,h,d,p){return i(),n("div",null,e[0]||(e[0]=[o(`<h1 id="st-b-l475e-iot01a" tabindex="-1">ST B-L475E-IOT01A <a class="header-anchor" href="#st-b-l475e-iot01a" aria-label="Permalink to &quot;ST B-L475E-IOT01A&quot;">​</a></h1><p>chip:stm32, chip:stm32l4, chip:stm32l475</p><p>This page discusses the port of NuttX to the STMicro B-L475E-IOT01A Discovery kit powered by STM32L475VG Cortex-M4. This board targets IoT nodes with a choice of connectivity options including WiFi, Bluetooth LE, NFC, and sub-GHZ RF at 868 or 915 MHz, as well as a long list of various environmental sensors.</p><h2 id="board-features" tabindex="-1">Board Features <a class="header-anchor" href="#board-features" aria-label="Permalink to &quot;Board Features&quot;">​</a></h2><p>B-L475E-IOT01A Discovery kit key features and specifications:</p><ul><li>MCU: STM32L475 Series MCU based on ARM Cortex-M4 core with 1 MB Flash memory, 128 KB SRAM</li><li>Storage: 64 Mbit (8MB)  Quad-SPI Flash memory (Macronix)</li><li>Connectivity: <ul><li>Bluetooth 4.1 LE module (SPBTLE-RF)</li><li>Sub-GHz (868 or 915 MHz) low-power-programmable RF module (SPSGRF-868 or SPSGRF-915)</li><li>Wi-Fi module based on Inventek ISM43362-M3G-L44 (802.11 b/g/n compliant)</li><li>Dynamic NFC tag based on M24SR with its printed NFC antenna</li></ul></li><li>Sensors: <ul><li>2x digital omni-directional microphones (MP34DT01)</li><li>Capacitive digital sensor for relative humidity and temperature (HTS221)</li><li>3-axis magnetometer (LIS3MDL)</li><li>3D accelerometer and 3D gyroscope (LSM6DSL)</li><li>260-1260 hPa absolute digital output barometer (LPS22HB)</li><li>Time-of-Flight and gesture-detection sensor (VL53L0X</li></ul></li><li>USB -- 1x micro USB OTG port (Full speed)</li><li>Expansion -- Arduino UNO V3 headers, PMOD header</li><li>Debugging -- On-board ST-LINK/V2-1 debugger/programmer with USB re-enumeration capability: mass storage, virtual COM port and debug port</li><li>Misc -- 2 push-buttons (user and reset)</li><li>Power Supply -- 5V via ST LINK USB VBUS or external sources</li></ul><p>The board supports ARM mbed online compiler, but can also be programmed using IDEs such as IAR, Keil, and GCC-based IDEs. STMicro also provides HAL libraries and code samples as part of the STM32Cube Package, as well as X-CUBE-AWS expansion software to connect to the Amazon Web Services (AWS) IoT platform.</p><p>NOTES:</p><ol><li><p>The board usese Wi-Fi® module Inventek ISM43362-M3G-L44 (802.11 b/g/n compliant), which consists of BCM43362 and STM32F205 host processor that has a standard SPI or UART interface capability. It means you will only use AT command to talk with Wi-Fi® module by SPI. All the tcp/ip stack is built-in STM32F205 in Wi-Fi® module.</p><p>This cannot integrate cleanly with the NuttX network stack. A USERSOCK option was recently added that would permit implementation of the Inventek support in an applications. But that would then preclude the 6LoWPAN integration into IPv6.</p></li><li><p>The board uses Bluetooth® V4.1 module (SPBTLE-RF), which has built-in BLE stack. Similar with wifi, you only use simple AT command to talk with this BLE module.</p></li><li><p>STMicro provides contiki 6lowpan for mesh. <a href="http://www.st.com/en/embedded-software/osxcontiki6lp.html" target="_blank" rel="noreferrer">http://www.st.com/en/embedded-software/osxcontiki6lp.html</a> but mesh network is not popular in the market, star network is the mainstream for its simplicity and robustness.</p></li></ol><h2 id="leds-and-buttons" tabindex="-1">LEDs and Buttons <a class="header-anchor" href="#leds-and-buttons" aria-label="Permalink to &quot;LEDs and Buttons&quot;">​</a></h2><p>The black button B1 located on top side is the reset of the STM32L475VGT6.</p><p>The blue button B1 located top side is available to be used as a digital input or as alternate function Wake-up. When the button is depressed the logic state is &quot;0&quot;, otherwise the logic state is &quot;1&quot;.</p><p>Two green LEDs (LD1 and LD2), located on the top side are available for the user. To light a LED a high logic state &quot;1&quot; should be written in the corresponding GPIO.:</p><pre><code>Reference Color Name    Comment
  B2      blue  Wake-up Alternate function Wake-up
  LD1     green LED1    PA5 (alternate with ARD.D13)
  LD2     green LED2    PB14
</code></pre><p>These LEDs are not used by the board port unless CONFIG_ARCH_LEDS is selected. In that case, the usage by the board port is defined in include/board.h and src/lpc31_leds.c. The LEDs are used to encode OS-related events as follows:</p><pre><code>SYMBOL                Meaning                   LED2     LED1
-------------------  -----------------------  -------- --------
LED_STARTED          NuttX has been started     OFF      OFF
LED_HEAPALLOCATE     Heap has been allocated    OFF      OFF
LED_IRQSENABLED      Interrupts enabled         OFF      OFF
LED_STACKCREATED     Idle stack created         ON       OFF
LED_INIRQ            In an interrupt            N/C      N/C
LED_SIGNAL           In a signal handler        N/C      N/C
LED_ASSERTION        An assertion failed        N/C      N/C
LED_PANIC            The system has crashed     N/C      Blinking
LED_IDLE             MCU is is sleep mode         Not used
</code></pre><p>Thus if LED2 is statically on, NuttX has successfully booted and is, apparently, running normmally. If LED1 is flashing at approximately 2Hz, then a fatal error has been detected and the system has halted.</p><p>NOTE: That LED2 is not used after completion of booting and may be used by other board-specific logic.</p><p>Of course, if CONFIG_ARCH_LEDS is not selected, then both LEDs are available for use by other logic.</p><h2 id="serial-console" tabindex="-1">Serial Console <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;Serial Console&quot;">​</a></h2><h3 id="arduino-serial-shield" tabindex="-1">Arduino Serial Shield <a class="header-anchor" href="#arduino-serial-shield" aria-label="Permalink to &quot;Arduino Serial Shield&quot;">​</a></h3><p>An TLL-to-RS232 Converter shield may be used with UART4:</p><pre><code>UART4:

-------------- ----------------  ------------------
STM32L475VGTx   Board Signal     Arduino Connector
-------------- ----------------  ------------------
UART4_RX PA1   ARD.D0-UART4_RX   CN3 pin1 RX/D0
UART4_TX PA0   ARD.D1-UART4_TX   CN3 pin2 TX/D1
-------------- ----------------  ------------------
</code></pre><h3 id="virtual-com-port" tabindex="-1">Virtual COM Port <a class="header-anchor" href="#virtual-com-port" aria-label="Permalink to &quot;Virtual COM Port&quot;">​</a></h3><p>The serial interface USART1 is directly available as a virtual COM port of the PC connected to the ST-LINK/V2-1 USB connector CN7. :</p><pre><code>USART1:

-------------- ---------------- --------------
STM32L475VGTx  Board Signal     STM32F103CBT6
-------------- ---------------- --------------
USART1_TX PB6  ST-LINK-UART1_TX USART2_RX PA3
UAART1_RX PB7  ST-LINK-UART1_RX USART2_TX PA2
-------------- ---------------- --------------
</code></pre><p>The virtual COM port settings are configured as: 115200 b/s, 8 bits data, no parity, 1 stop bit, no flow control.</p><h3 id="other-options" tabindex="-1">Other Options <a class="header-anchor" href="#other-options" aria-label="Permalink to &quot;Other Options&quot;">​</a></h3><p>USART2 - Available on CN10 if solder bridges closed:</p><pre><code>-------------- ----------------  ---------------------------
STM32L475VGTx  Board Signal      PMOD / Solder Bridges
-------------- ----------------  ---------------------------
USART2_RX PD4  PMOD-UART2_RX     CN10 pin1 or 2 (SB12, SB14)
USART2_TX PD5  PMOD-UART2_TX     CN10 pin2 TX/D1 (SB20)
-------------- ----------------  ---------------------------
</code></pre><p>USART3 - Dedicated to ISM43362-M3G-L44 Serial-to-Wifi Module:</p><pre><code>-------------- ----------------  ------------------
STM32L475VGTx  Board Signal      Arduino Connector
-------------- ----------------  ------------------
USART3_RX PD9  INTERNAL-UART3_RX CN3 pin1 RX/D0
USART3_TX PD8  INTERNAL-UART3_TX CN3 pin2 TX/D1
-------------- ----------------  ------------------
</code></pre><h2 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h2><h3 id="information-common-to-all-configurations" tabindex="-1">Information Common to All Configurations <a class="header-anchor" href="#information-common-to-all-configurations" aria-label="Permalink to &quot;Information Common to All Configurations&quot;">​</a></h3><p>Each B-L475E-IOT01A configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh [-l|c|n] /b-l475e-iot01a:&lt;subdir&gt;

Where:
-l selects the Linux (l) host environment.  The [-c|u|n] options
   select one of the Windows environments.  Default:  Use host setup
   in the defconfig file
[-c|n] selects the Windows host and a Windows environment:
  Cygwin (c), or Windows native (n). Default Cygwin
</code></pre><p>Before building, make sure that:</p><ol><li>The PATH environment variable include the correct path to the directory than holds your toolchain binaries.</li><li>Check the .config file. Make sure that the configuration is set for your build platform (e.g., Linux vs. Windows) and that the toolchain is set for the toolchain type you are using.</li></ol><p>The &lt;subdir&gt; that is provided above as an argument to the tools/configure.sh must be is one of those listed below.</p><p>And then build NuttX by simply typing the following. At the conclusion of the make, the nuttx binary will reside in an ELF file called, simply, nuttx.:</p><pre><code>make
</code></pre><p>NOTES:</p><ol><li><p>These configurations use the mconf-based configuration tool. To change any of these configurations using that tool, you should:</p><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository. b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</p></li><li><p>Unless stated otherwise, all configurations generate console output on USART1 (i.e., for ST-Link Virtual COM port). The relevant configuration settings are listed below:</p><pre><code>CONFIG_STM32_USART1=y
CONFIG_STM32_USART1_SERIALDRIVER=y
CONFIG_STM32_USART=y

CONFIG_USART1_SERIALDRIVER=y
CONFIG_USART1_SERIAL_CONSOLE=y

CONFIG_USART1_RXBUFSIZE=256
CONFIG_USART1_TXBUFSIZE=256
CONFIG_USART1_BAUD=115200
CONFIG_USART1_BITS=8
CONFIG_USART1_PARITY=0
CONFIG_USART1_2STOP=0
</code></pre></li><li><p>All of these configurations are set up to build under Windows using the &quot;GNU Tools for ARM Embedded Processors&quot; that is maintained by ARM (unless stated otherwise in the description of the configuration).</p><blockquote><p><a href="https://developer.arm.com/open-source/gnu-toolchain/gnu-rm" target="_blank" rel="noreferrer">https://developer.arm.com/open-source/gnu-toolchain/gnu-rm</a></p></blockquote><p>That toolchain selection can easily be reconfigured using &#39;make menuconfig&#39;. Here are the relevant current settings:</p><p>Build Setup:</p><pre><code>CONFIG_HOST_WINDOWS=y               : Window environment
CONFIG_WINDOWS_CYGWIN=y             : Cywin under Windows
</code></pre><p>System Type -&gt; Toolchain:</p><pre><code>CONFIG_ARM_TOOLCHAIN_GNU_EABI=y  : GNU ARM EABI toolchain
</code></pre></li></ol><h3 id="configuration-sub-directories" tabindex="-1">Configuration sub-directories <a class="header-anchor" href="#configuration-sub-directories" aria-label="Permalink to &quot;Configuration sub-directories&quot;">​</a></h3><h3 id="nsh" tabindex="-1">nsh: <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh:&quot;">​</a></h3><p>Configures the NuttShell (nsh) located at examples/nsh. This configuration is focused on low level, command-line driver testing.</p><h3 id="spirit-6lowpan" tabindex="-1">spirit-6lowpan <a class="header-anchor" href="#spirit-6lowpan" aria-label="Permalink to &quot;spirit-6lowpan&quot;">​</a></h3><p>This is another version of nsh that is similar to the above &#39;nsh&#39; configuration but is focused on testing the Spirit1 integration with the 6LoWPAN network stack. It supports point-to-point, 6LoWPAN communications between two b-l47e-iot01a boards. Additional differences from the &#39;nsh&quot; configuration are summarized below:</p><p>NOTES:</p><ol><li><p>You must must have two b-l475e-iot01a boards.</p></li><li><p>IPv6 networking is enabled with TCP/IP, UDP, 6LoWPAN, and NSH Telnet support.</p></li><li><p>Configuration instructions: NSH does not configuration or bring up the network. Currently that must be done manually. The configurations steps are:</p><p>a) Assign a unique 8-bit node address to the Spirit1 board in the WPAN:</p><pre><code>    nsh&gt; ifconfig wpan0 hw 37

Where 37 the address is an example. It should be different for
each radio, but in the the range 1..ed and ef..fe (ee and ff are
the reserved for multicast and broadcast addresses,
respectively. Zero is a valid address but not recommended).
</code></pre><p>b) Bring each the network up on each board in the WPAN:</p><pre><code>    nsh&gt; ifup wpan0

You can entry nsh\\&gt; ifconfig to see if the node address and
derived IPv4 are set correctly (the IPv6 address will not be
determined until the network is UP).
</code></pre></li><li><p>examples/udp is enabled. This will allow two Spirit1 nodes to exchange UDP packets. Basic instructions:</p><p>On the server node:</p><pre><code>nsh&gt; ifconfig
nsh&gt; udpserver &amp;
</code></pre><p>The ifconfig command will show the IP address of the server. Then on the client node use this IP address to start the client:</p><pre><code>nsh&gt; udpclient &lt;server-ip&gt; &amp;
</code></pre><p>Where &lt;server-ip&gt; is the IP address of the server that you got above. NOTE: There is no way to stop the UDP test once it has been started other than by resetting the board.</p></li><li><p>examples/nettest is enabled. This will allow two Spirit1 nodes to exchange TCP packets. Basic instructions:</p><p>On the server node:</p><pre><code>nsh&gt; ifconfig
nsh&gt; tcpserver &amp;
</code></pre><p>The ifconfig command will show the IP address of the server. Then on the client node use this IP address to start the client:</p><pre><code>nsh&gt; tcpclient &lt;server-ip&gt; &amp;
</code></pre><p>Where &lt;server-ip&gt; is the IP address of the server that you got above. NOTE: Unlike the UDP test, there the TCP test will terminate automatically when the packet exchange is complete.</p></li><li><p>The NSH Telnet daemon (server) is enabled. However, it cannot be started automatically. Rather, it must be started AFTER the network has been brought up using the NSH &#39;telnetd&#39; command. You would want to start the Telent daemon only if you want the node to serve Telent connections to an NSH shell on the node.:</p><pre><code>nsh&gt; ifconfig
nsh&gt; telnetd
</code></pre><p>Note the &#39;ifconfig&#39; is executed to get the IP address of the node. This address derives from the 8-bit node address that was assigned when the node was configured.</p></li><li><p>This configuration also includes the Telnet client program. This will allow you to execute a NSH one a node from the command line on a different node. Like:</p><pre><code>nsh&gt; telnet &lt;server-ip&gt;
</code></pre><p>Where &lt;server-ip&gt; is the IP address of the server that you got for the ifconfig comma on the remote node. Once the telnet session has been started, you can end the session with:</p><pre><code>nsh&gt; exit
</code></pre><p>STATUS:</p><blockquote><p>2017-08-01: Testing began. The Spirit1 no configurations with no</p><p>: errors, but there are no tests yet in place to exercise it.</p><p>2017-08-02: The nettest, udp, telnet test programs were added.</p><p>2017-08-03: Successfully exchanging packets, but there there are</p><p>: issues with address filtering, CRC calculation, and data integrity (like bad UDP checksums). Lot&#39;s more to be done!</p><p>2017-08-04: Fixed some of the address filtering issues: In Basic</p><p>: packets, need to force the Spirit to send the destination address. This fixes address filtering. But...</p><pre><code>Converted to STack vs Basic packets. We need to do this
because the Basic packets do not provide the source node
address. Now correctly gets the source node address and
uncompresses the source IP address.

In addition, to avoid packet loss due to data overrun, I
enabled the AutoAck, TX retries, the RX timeout options.

With these changes (along with other, significant bugfixes),
both the UDP test is now fully functional. CRC filtering still
must be disabled.
</code></pre><p>2017-08-05: Add the Telnet client problem. Verified HC06 tests with</p><p>: no debug output; verified Telnet seessions between two spirit nodes.</p><pre><code>At this point everything seems functional, but somewhat
reliable. Sometimes things seem to initialize in a bad state.

2017-08-06: Reducing the FIFO to 94 bytes fixed the problem with the

:   2 byte CRC.
</code></pre><p>Test Matrix: The following configurations have been tested successfully (with CRC disabled):</p><pre><code>=========== ===== ===== ======
COMPRESSION UDP   TCP   Telnet
=========== ===== ===== ======
hc06        08/04 08/04 08/05
hc1
ipv6
=========== ===== ===== ======

Other configuration options have not been specifically addressed
(such non-compressable ports, non-MAC based IPv6 addresses, etc.)
</code></pre></blockquote></li></ol><p>spirit-starhub and spirit-starpoint</p><p>These two configurations implement hub and and star endpoint in a star topology. Both configurations derive from the spirit-6lowpan configuration and most of the notes there apply here as well.</p><ol><li><p>You must must have three b-l475e-iot01a boards in order to run these tests: One that serves as the star hub and at least two star endpoints.</p></li><li><p>The star point configuration differs from the primarily in the spirit-6lowpan in following is also set:</p><pre><code>CONFIG_NET_STAR=y
CONFIG_NET_STARPOINT=y
</code></pre><p>The CONFIG_NET_STARPOINT selection informs the endpoint that it must send all frames to the hub of the star, rather than directly to the recipient.</p><p>The star hub configuration, on the other hand, differs from the spirit-6lowpan in these fundamental ways:</p><pre><code>CONFIG_NET_STAR=y
CONFIG_NET_STARHUB=y
CONFIG_NET_IPFORWARD=y
</code></pre><p>The CONFIG_NET_IPFORWARD selection informs the hub that if it receives any packets that are not destined for the hub, it should forward those packets appropriately.</p></li><li><p>TCP and UDP Tests: The same TCP and UDP tests as described for the spirit-6lowpan configuration are supported on the star endpoints, but NOT on the star hub. Therefore, all network testing is between endpoints with the hub acting, well, only like a hub.</p><p>Each node in the configuration must be manually initialized. Ideally, this would be automatically initialized with software logic and configuration data in non-volatilbe memory. The the procedure is manual in this example. These are the basic initialization steps with E1 and E2 representing the two star endpoints and C representing the star hub:</p><pre><code>C:  nsh&gt; ifup wpan0           &lt;-- Brings up the network on the hub
C:  nsh&gt; telnetd              &lt;-- Starts the Telnet daemon on the hub
C:  nsh&gt; ifconfig             &lt;-- To get the IP address of the hub

E1: nsh&gt; ifconfig wpan0 hw 37 &lt;-- Sets E1 endpoint node address
E1: nsh&gt; ifup wpan0           &lt;-- Brings up the network on the E1 node
E1: nsh&gt; telnetd              &lt;-- Starts the Telnet daemon on the E1 node
E1: nsh&gt; ifconfig             &lt;-- To get the IP address of E1 endpoint

E2: nsh&gt; ifconfig wpan0 hw 38 &lt;-- Sets E2 endpoint node address
E2: nsh&gt; ifup wpan0           &lt;-- Brings up the network on the E2 node
E2: nsh&gt; telnetd              &lt;-- Starts the Telnet daemon on the E2 node
E2: nsh&gt; ifconfig             &lt;-- To get the IP address of E2 endpoint
</code></pre><p>It is not necessary to set the hub node address, that will automatically be set to CONFIG_SPIRIT_HUBNODE when the hub boots. CONFIG_SPIRIT_HUBNODE is the &quot;well-known&quot; address of the star hub.</p><p>The modified usage of the TCP test is then show below:</p><pre><code>E1: nsh&gt; tcpserver &amp;
E2: nsh&gt; tcpclient &lt;server-ip&gt; &amp;
</code></pre><p>Where &lt;server-ip&gt; is the IP address of the E1 endpoint.</p><p>Similarly for the UDP test:</p><pre><code>E1: nsh&gt; udpserver &amp;
E2: nsh&gt; udpclient &lt;server-ip&gt; &amp;
</code></pre><p>Telenet sessions may be initiated from the any node to any other node:</p><blockquote><p>XX: nsh&gt; telnet &lt;server-ip&gt; &lt;-- Runs the Telnet client on any node XX</p></blockquote><p>Where &lt;server-ip&gt; is the IP address of either the E1 or E2 endpoints or of the star hub.</p></li><li><p>Hub UDP Test. The hub of the star does not support the same level of test as for the endpoint-to-endpoint tests described above. The primary role of the hub is packet forwarding. The hub does support to test applications, however: (1) A Telnet client that will permit the hub to establish remote NSH sesstions with any endpoint, and (2) A special version of the udpclient program to support testing of Spirit broadcast.</p><p>IPv6 does not support &quot;broadcast&quot; in the same since as IPv4. IPv6 supports only multicast. The special multicast address, ff02::1 is the &quot;all-nodes address&quot; and is functionally equivalent to broadcast.</p><p>The spirit radios do support both multicast and broadcast with the special addresses 0xee and 0xff, respectively. So the Spirit driver will map the all-nodes IPv6 to the Spirit destination address 0xff and the packet will be broadcast to all Spirit nodes.</p><p>Here are the procedures for using the test:</p><pre><code>C:  nsh&gt; ifup wpan0           &lt;-- Brings up the network on the hub

E1: nsh&gt; ifconfig wpan0 hw 37 &lt;-- Sets E1 endpoint node address
E1: nsh&gt; ifup wpan0           &lt;-- Brings up the network on the E1 node
E1: udpserver &amp;               &lt;-- Start the UDP server

E2: nsh&gt; ifconfig wpan0 hw 38 &lt;-- Sets E2 endpoint node address
E2: nsh&gt; ifup wpan0           &lt;-- Brings up the network on the E2 node
E2: udpserver &amp;               &lt;-- Start the UDP server

C:  udpclient &amp;               &lt;-- Starts the UDP client side of the test
</code></pre><p>The client will broadcast the UDP packets and, as each UDP packet is sent, it will be received by BOTH endpoints.</p><blockquote><p>STATUS:</p><p>:</p><pre><code>2017-08-05: Configurations added. Early testing suggests that there is

:   a problem when packets are received from multiple sources
    at high rates: New incoming packets appear to cause RX
    FIFO errors and the driver does not recover well.

2017-08-06: The RX FIFO errors are worse when debug is enabled. This led

:   me to believe that the cause of the RX FIFO errors was due
    to too many interactions by the LP and HP work queue. I
    restructured the tasking to reduce the amount of
    interlocking, but this did not eliminate the RX FIFO
    errors.

    Hmmm.. this statement appears in the STMicro driver:
    \\&quot;Sometimes Spirit1 seems to NOT deliver (correctly) the
    \\&#39;IRQ\\_RX\\_DATA\\_READY\\&#39; event for packets which have a
    length which is close to a multiple of RX FIFO size.
    Furthermore, in these cases also the content delivery
    seems to be compromised as well as the generation of RX/TX
    FIFO errors. This can be avoided by reducing the maximum
    packet length to a value which is lower than the RX FIFO
    size.\\&quot;

    I tried implementing the RX FIFO almost full water mark
    thinking this might be a work around\\... it is not. Still
    RX FIFO errors. From my reading, the only known
    work-around is to reduce the maximum packet size so that
    it is smaller than 96. I tried setting the maximum packet
    length to 84 and that did NOT eliminate the RX FIFO error.

    At the end of the TCP test, the \\&quot;nsh\\&gt; ifconfig\\&quot; command
    shows that there were two TX timeouts. Perhaps this is
    related? I found that the TX timeout was not being
    cancelled. It must be canceled on each TX completed or TX
    error. This DID eliminate the RX FIFO error, but now the
    test hangs and does not complete.

    Another Errata: \\&quot;Using the STack packet format and no CRC
    field, the reading from RX FIFO to the last received byte,
    is not possible. \\...\\&quot; Workaround: \\&quot;By configuring the
    packet handler with at least one byte of CRC, the problem
    is solved. If the CRC is not required in the application,
    configure one byte of CRC in the receiver only, to read
    the payload correctly from RX FIFO.\\&quot;

    Reducing the FIFO to 94 bytes fixed the problem with the 2
    byte CRC but did not resolve that occasional RX FIFO
    error.

2017-08-07: The hang noted yesterday was due to logic that did not

:   restart the poll timer in the event that Spirit was not
    ready when the time expired. Just unconditionally
    performing the poll fixed this.

    Then I noticed several assertions. In a busy radio
    environment, there are many race conditions. Most
    typically, just when the driver is setting up to perform a
    transmission, the hardware commits to a reception. The
    symptom is that the driver times out out waiting to go
    into the TX state (because it is in the RX state). The
    logic needed to be beefed up to handle this routinely
    without asserting and without leaving the Spirit in a bad
    state.

    The TCP test beats the radio very hard and it is actually
    heartening that there are no failures that lead to data
    loss in this environment. I would say it is functional but
    fragile in this usage, but probably robust in a less busy
    environment.

2017-08-08: Added broadcast packet transfers using the hub-based

:   broadcast UDP client. This appears to be a problem the
    HC06 compression and/or decompression. The decompression
    logic comes up with the destination address of
    ff02::ff00:00fe:3500 (which derives from the receiving
    node address of 37) instead of the all-nodes multicast
    address of ff02::0001. It is then out of sync with the
    IPHC headers and is unable to uncompress the rest of the
    packet correctly.

    Trying again with HC1 compression, I see other issues. The
    first frame is received correctly, but the following
    frames have an incorrect packet length and generate RX
    FIFO errors. Forcing the send size to 12 bytes of payload
    in apps/examples/udp (vs 96), eliminates this problem and
    the broadcast works well.

    There is probably another issue related to broadcast TX
    setup: If we are sending to the multicast or broadcast
    address, should we not also disable ACKs, retries, and RX
    timeouts? What will happen if multiple radios ACK? At a
    minimum it could keep the driver unnecessarily busy. There
    is some prototype code to do just this in the driver, but
    does not seem to work.

2017-08-26: There was only a single buffer for reassemblying larger

:   packets. This could be a problem issue for the hub
    configuration which really needs the capability
    concurrently reassemble multiple incoming streams. The
    design was extended to support multiple reassembly
    buffers.

    Initial testing shows the same basic behavior as noted
    before: The UDP test works and TCP test (usually) works.
    There are, however, are errors in reported by the hub in
    the TCP test. Occasionally the test will hang when the
    server echoes the data back to the client. These errors
    are presumably the result of ACKs from the receiver
    colliding with frames from the sender.

    Needs more investigation.

2017-09-08: The HC06 all nodes address decode problem mentioned on

:   2017-08-08 has been corrected. The behavior in the test
    case has not yet been reverified. I suspect that there
    made to some radio configuration problems that are causing
    the RX FIFO errors and the strange broadcast behavior. I
    recently got an STEVAL-IDS001V5M sniffer that should tell
    me what is going on. But I have not yet had sufficient
    free time to continue this testing.
</code></pre></blockquote></li></ol>`,53)]))}const m=t(s,[["render",a]]);export{u as __pageData,m as default};
