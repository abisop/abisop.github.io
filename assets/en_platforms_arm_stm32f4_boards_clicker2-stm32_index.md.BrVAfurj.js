import{_ as t,c as n,al as o,o as i}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"Mikroe Clicker2 STM32","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/stm32f4/boards/clicker2-stm32/index.md","filePath":"en/platforms/arm/stm32f4/boards/clicker2-stm32/index.md"}'),a={name:"en/platforms/arm/stm32f4/boards/clicker2-stm32/index.md"};function s(r,e,l,h,d,c){return i(),n("div",null,e[0]||(e[0]=[o(`<h1 id="mikroe-clicker2-stm32" tabindex="-1">Mikroe Clicker2 STM32 <a class="header-anchor" href="#mikroe-clicker2-stm32" aria-label="Permalink to &quot;Mikroe Clicker2 STM32&quot;">​</a></h1><p>chip:stm32, chip:stm32f4, chip:stm32f407</p><p>This is the page file for the port of NuttX to the Mikroe Clicker2 STM32 board based on the STMicro STM32F407VGT6 MCU.</p><p>Reference: <a href="https://shop.mikroe.com/development-boards/starter/clicker-2/stm32f4" target="_blank" rel="noreferrer">https://shop.mikroe.com/development-boards/starter/clicker-2/stm32f4</a></p><h2 id="contents" tabindex="-1">Contents <a class="header-anchor" href="#contents" aria-label="Permalink to &quot;Contents&quot;">​</a></h2><ul><li>Serial Console</li><li>LEDs</li><li>Buttons</li><li>Using JTAG</li><li>Configurations</li></ul><h2 id="serial-console" tabindex="-1">Serial Console <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;Serial Console&quot;">​</a></h2><p>The are no RS-232 drivers on-board. An RS-232 Click board is available: <a href="https://shop.mikroe.com/click/interface/rs232" target="_blank" rel="noreferrer">https://shop.mikroe.com/click/interface/rs232</a> or you can cannot an off-board TTL-to-RS-232 converter as follows:</p><pre><code>USART2:  mikroBUS1 PD6/RX and PD5/TX
USART3:  mikroBUS2 PD9/RX and PD8TX

GND, 3.3V, and 5V.  Are also available
</code></pre><p>By default, USART3 on mikroBUS2 is used as the serial console in each configuration unless stated otherwise in the description of the configuration.</p><h2 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h2><p>The Mikroe Clicker2 STM32 has two user controllable LEDs:</p><pre><code>LD1/PE12, Active high output illuminates
LD2/PE15, Active high output illuminates
</code></pre><p>If CONFIG_ARCH_LEDS is not defined, then the user can control the LEDs in any way. If CONFIG_ARCH_LEDs is defined, then NuttX will control the 2 LEDs on board the Clicker2 for STM32. The following definitions describe how NuttX controls the LEDs:</p><blockquote><p>SYMBOL Meaning LD1 LD2</p><hr><p>LED_STARTED NuttX has been started OFF OFF LED_HEAPALLOCATE Heap has been allocated OFF OFF LED_IRQSENABLED Interrupts enabled OFF OFF LED_STACKCREATED Idle stack created ON OFF LED_INIRQ In an interrupt N/C ON LED_SIGNAL In a signal handler N/C N/C LED_ASSERTION An assertion failed N/C N/C LED_PANIC The system has crashed OFF Blinking LED_IDLE STM32 is is sleep mode N/U N/U</p></blockquote><p>Thus is LD1 is illuminated, the Clicker2 has completed boot-up. IF LD2 is glowly softly, then interrupts are being taken; the level of illumination depends amount of time processing interrupts. If LD1 is off and LD2 is blinking at about 2Hz, then the system has crashed.</p><h2 id="buttons" tabindex="-1">Buttons <a class="header-anchor" href="#buttons" aria-label="Permalink to &quot;Buttons&quot;">​</a></h2><p>The Mikroe Clicker2 STM32 has two buttons available to software:</p><pre><code>T2/E0, Low sensed when pressed
T3/PA10, Low sensed when pressed
</code></pre><h2 id="using-jtag" tabindex="-1">Using JTAG <a class="header-anchor" href="#using-jtag" aria-label="Permalink to &quot;Using JTAG&quot;">​</a></h2><p>The Clicker2 comes with the mikroBootloader installed. That bootloader has not been used and is possibly incompatible with the Clicker2-STM32 linker script at boards/arm/stm32/clicker2-stm32/scripts/flash.ld. Often code must be built to execute at an offset in to FLASH when a bootloader is used. Certainly that is the case for the ST-Micro DFU bootloader but I am not aware of the requirements for use with the mikroBootloader.</p><p>JTAG has been used in the development of this board support. The Clicker2-STM32 board offers a 2x5 JTAG connector. You may use Dupont jumpers to connect this port to JTAG as described here:</p><blockquote><p><a href="https://www.mikroe.com/how-to-use-st-link-v2-with-clicker-2-for-stm32-a-detailed-walkthrough/" target="_blank" rel="noreferrer">https://www.mikroe.com/how-to-use-st-link-v2-with-clicker-2-for-stm32-a-detailed-walkthrough/</a><a href="http://www.playembedded.org/blog/en/2016/02/06/mikroe-clicker-2-for-stm32-and-stlink-v2/" target="_blank" rel="noreferrer">http://www.playembedded.org/blog/en/2016/02/06/mikroe-clicker-2-for-stm32-and-stlink-v2/</a></p></blockquote><p>NOTE that the FLASH probably has read protection enabled locked. You may need to follow the instructions at the second link to unlock it. You can also use the STM32 ST-Link CLI tool on Windows to remove the read protection using the -OB command:</p><pre><code> ./ST-LINK_CLI.exe -c SN=53FF6F064966545035320387 SWD LPM
STM32 ST-LINK CLI v2.3.0
STM32 ST-LINK Command Line Interface

ST-LINK SN : 53FF6F064966545035320387
ST-LINK Firmware version : V2J24S4
Connected via SWD.
SWD Frequency = 4000K.
Target voltage = 3.2 V.
Connection mode : Normal.
Debug in Low Power mode enabled.
Device ID:0x413
Device family :STM32F40xx/F41xx

 ./ST-LINK_CLI.exe -OB RDP=0
STM32 ST-LINK CLI v2.3.0
STM32 ST-LINK Command Line Interface

ST-LINK SN : 53FF6F064966545035320387
ST-LINK Firmware version : V2J24S4
Connected via SWD.
SWD Frequency = 4000K.
Target voltage = 3.2 V.
Connection mode : Normal.
Device ID:0x413
Device family :STM32F40xx/F41xx
Updating option bytes...
Option bytes updated successfully.
</code></pre><p>NOTE:</p><ol><li><p>You can get the ST-Link Utilities here: <a href="http://www.st.com/en/embedded-software/stsw-link004.html" target="_blank" rel="noreferrer">http://www.st.com/en/embedded-software/stsw-link004.html</a></p></li><li><p>The ST-LINK Utility command line interface is located at: [Install_Directory]STM32 ST-LINK UtilityST-LINK UtilityST-LINK_CLI.exe</p></li><li><p>You can get a summary of all of the command options by running ST-LINK_CLI.exe with no arguments.</p></li><li><p>You can get the serial number of the ST-Link when from the information window if you connect via the ST-Link Utility:</p><pre><code>11:04:28 : ST-LINK SN : 53FF6F064966545035320387
11:04:28 : ST-LINK Firmware version : V2J24S4
11:04:28 : Connected via SWD.
11:04:28 : SWD Frequency = 100 KHz.
11:04:28 : Connection mode : Normal.
11:04:28 : Debug in Low Power mode enabled.
11:04:30 : Device ID:0x413
11:04:30 : Device family :STM32F40xx/F41xx
11:04:30 : Can not read memory!
           Disable Read Out Protection and retry.
</code></pre></li></ol><p>You can avoid the mess of jumpers using the mikroProg to ST-Link v2 adapter along with a 2x5, 10-wire ribbon cable connector:</p><blockquote><p><a href="https://shop.mikroe.com/add-on-boards/adapter/mikroprog-st-link-v2-adapter" target="_blank" rel="noreferrer">https://shop.mikroe.com/add-on-boards/adapter/mikroprog-st-link-v2-adapter</a></p></blockquote><p>Then you can use the ST-Link Utility or other debugger software to write the NuttX binary to FLASH. OpenOCD can be used with the ST-Link to provide a debug environment. The debug adaptor is NOT compatible with other JTAG debuggers such as the Segger J-Link.</p><h2 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h2><h3 id="information-common-to-all-configurations" tabindex="-1">Information Common to All Configurations <a class="header-anchor" href="#information-common-to-all-configurations" aria-label="Permalink to &quot;Information Common to All Configurations&quot;">​</a></h3><p>Each Clicker2 configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh clicker2-stm32:&lt;subdir&gt;
</code></pre><p>Before building, make sure the PATH environment variable includes the correct path to the directory than holds your toolchain binaries.</p><p>And then build NuttX by simply typing the following. At the conclusion of the make, the nuttx binary will reside in an ELF file called, simply, nuttx.:</p><pre><code>make oldconfig
make
</code></pre><p>The &lt;subdir&gt; that is provided above as an argument to the tools/configure.sh must be is one of the following.</p><p>NOTES:</p><ol><li><p>These configurations use the mconf-based configuration tool. To change any of these configurations using that tool, you should:</p><blockquote><p>a. Build and install the kconfig-mconf tool. See nuttx/README.txt see additional README.txt files in the NuttX tools repository. b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</p></blockquote></li><li><p>Unless stated otherwise, all configurations generate console output on USART3, channel 0) as described above under &quot;Serial Console&quot;. The relevant configuration settings are listed below:</p><pre><code>CONFIG_STM32_USART3=y
CONFIG_STM32_USART3_SERIALDRIVER=y
CONFIG_STM32_USART=y

CONFIG_USART3_SERIALDRIVER=y
CONFIG_USART3_SERIAL_CONSOLE=y

CONFIG_USART3_RXBUFSIZE=256
CONFIG_USART3_TXBUFSIZE=256
CONFIG_USART3_BAUD=115200
CONFIG_USART3_BITS=8
CONFIG_USART3_PARITY=0
CONFIG_USART3_2STOP=0
</code></pre></li><li><p>All of these configurations are set up to build under Linux using the &quot;GNU Tools for ARM Embedded Processors&quot; that is maintained by ARM (unless stated otherwise in the description of the configuration).</p><blockquote><p><a href="https://developer.arm.com/open-source/gnu-toolchain/gnu-rm" target="_blank" rel="noreferrer">https://developer.arm.com/open-source/gnu-toolchain/gnu-rm</a></p></blockquote><p>That toolchain selection can easily be reconfigured using &#39;make menuconfig&#39;. Here are the relevant current settings:</p><p>Build Setup:</p><pre><code>CONFIG_HOST_LINUX  =y               : Linux environment
</code></pre><p>System Type -&gt; Toolchain::</p><p>: CONFIG_ARM_TOOLCHAIN_GNU_EABI=y : GNU ARM EABI toolchain</p></li></ol><h3 id="configuration-sub-directories" tabindex="-1">Configuration sub-directories <a class="header-anchor" href="#configuration-sub-directories" aria-label="Permalink to &quot;Configuration sub-directories&quot;">​</a></h3><h3 id="knsh" tabindex="-1">knsh <a class="header-anchor" href="#knsh" aria-label="Permalink to &quot;knsh&quot;">​</a></h3><p>This is identical to the nsh configuration below except that NuttX is built as a protected mode, monolithic module and the user applications are built separately.</p><p>It is recommends to use a special make command; not just &#39;make&#39; but make with the following two arguments:</p><pre><code>make pass1 pass2
</code></pre><p>In the normal case (just &#39;make&#39;), make will attempt to build both user-and kernel-mode blobs more or less interleaved. This actual works! However, for me it is very confusing so I prefer the above make command: Make the user-space binaries first (pass1), then make the kernel-space binaries (pass2)</p><p>NOTES:</p><ol><li><p>At the end of the build, there will be several files in the top-level NuttX build directory:</p><blockquote><p>PASS1:</p><pre><code>nuttx_user.elf    - The pass1 user-space ELF file
nuttx_user.hex    - The pass1 Intel HEX format file (selected in defconfig)
User.map          - Symbols in the user-space ELF file
</code></pre><p>PASS2:</p><pre><code>nuttx             - The pass2 kernel-space ELF file
nuttx.hex         - The pass2 Intel HEX file (selected in defconfig)
System.map        - Symbols in the kernel-space ELF file
</code></pre><p>The J-Link programmer will accept files in .hex, .mot, .srec, and .bin formats. The St-Link programmer will accept files in hex and .bin formats.</p></blockquote></li><li><p>Combining .hex files. If you plan to use the .hex files with your debugger or FLASH utility, then you may need to combine the two hex files into a single .hex file. Here is how you can do that.</p><p>a. The &#39;tail&#39; of the nuttx.hex file should look something like this (with my comments added):</p><pre><code>     tail nuttx.hex
    # 00, data records
    ...
    :10 9DC0 00 01000000000800006400020100001F0004
    :10 9DD0 00 3B005A0078009700B500D400F300110151
    :08 9DE0 00 30014E016D0100008D
    # 05, Start Linear Address Record
    :04 0000 05 0800 0419 D2
    # 01, End Of File record
    :00 0000 01 FF

    Use an editor such as vi to remove the 05 and 01 records.
</code></pre><p>b.</p><pre><code>The \\&#39;head\\&#39; of the nuttx\\_user.hex file should look something like

:   this (again with my comments added):

         head nuttx_user.hex
        # 04, Extended Linear Address Record
        :02 0000 04 0801 F1
        # 00, data records
        :10 8000 00 BD89 01084C800108C8110208D01102087E
        :10 8010 00 0010 00201C1000201C1000203C16002026
        :10 8020 00 4D80 01085D80010869800108ED83010829
        ...

    Nothing needs to be done here. The nuttx\\_user.hex file
    should be fine.
</code></pre><p>c. Combine the edited nuttx.hex and un-edited nuttx_user.hex file to produce a single combined hex file:</p><pre><code>     cat nuttx.hex nuttx_user.hex &gt;combined.hex

    Then use the combined.hex file with the to write the FLASH image.
    If you do this a lot, you will probably want to invest a little time
    to develop a tool to automate these steps.
</code></pre></li></ol><h3 id="mrf24j40-mac" tabindex="-1">mrf24j40-mac <a class="header-anchor" href="#mrf24j40-mac" aria-label="Permalink to &quot;mrf24j40-mac&quot;">​</a></h3><p>This is a version of nsh that was used for testing the MRF24J40 MAC be as a character device. The most important configuration differences are summarized below:</p><ol><li><p>Support for the BEE click and SPI are in enabled in the mikroBUS1 slot:</p><blockquote><p>CONFIG_CLICKER2_STM32_MB1_BEE=y CONFIG_CLICKER2_STM32_MB1_SPI=y</p></blockquote></li><li><p>SPI support and STM32 SPI3, in particular, are enabled:</p><blockquote><p>CONFIG_SPI=y CONFIG_SPI_EXCHANGE=y</p><p>CONFIG_STM32_SPI=y CONFIG_STM32_SPI3=y</p></blockquote></li><li><p>Support for the IEEE802.15.4 &quot;upper half&quot; character driver is enabled:</p><blockquote><p>CONFIG_WIRELESS=y CONFIG_WIRELESS_IEEE802154=y CONFIG_IEEE802154_MAC_DEV=y CONFIG_IEEE802154_NTXDESC=3 CONFIG_IEEE802154_IND_PREALLOC=20 CONFIG_IEEE802154_IND_IRQRESERVE=10 CONFIG_IEEE802154_DEFAULT_EADDR=0x00fade00deadbeef</p></blockquote></li><li><p>Support for the lower half MRF24J40 character driver is enabled</p><blockquote><p>CONFIG_DRIVERS_WIRELESS=y CONFIG_DRIVERS_IEEE802154=y CONFIG_IEEE802154_MRF24J40=y</p></blockquote></li><li><p>Support for the i8sak test program at apps/ieee802154 is enabled:</p><blockquote><p>CONFIG_IEEE802154_LIBMAC=y CONFIG_IEEE802154_LIBUTILS=y CONFIG_IEEE802154_I8SAK=y CONFIG_IEEE802154_I8SAK_PRIORITY=100 CONFIG_IEEE802154_I8SAK_STACKSIZE=2048</p></blockquote></li><li></li></ol><pre><code>Initialization hooks are provided to enable the MRF24J40 and to

:   register the radio character driver.

    &gt; CONFIG\\_NSH\\_ARCHINIT=y
</code></pre><ol start="7"><li></li></ol><pre><code>Configuration instructions: WPAN configuration must be performed

:   using the i8sak program. Detailed instructions are provided in a
    README.txt file at apps/wireless/ieee802154/i8sak. You should
    make sure that you are familiar with the content of that
    README.txt file.

    Here is a quick \\&quot;cheat sheet\\&quot; for associated to setting up a
    coordinator and associating with the WPAN:

1.  Configure the Coordinator. On coordinator device do:

    &gt; nsh\\&gt; i8 /dev/ieee0 startpan cd:ab nsh\\&gt; i8 acceptassoc

2.  

    Associate an endpoint device with the WPAN. On the endpoint

    :   device:

        nsh\\&gt; i8 /dev/ieee0 assoc
</code></pre><h3 id="mrf24j40-6lowpan" tabindex="-1">mrf24j40-6lowpan <a class="header-anchor" href="#mrf24j40-6lowpan" aria-label="Permalink to &quot;mrf24j40-6lowpan&quot;">​</a></h3><p>This is another version of nsh that is very similar to the mrf24j40-mac configuration but is focused on testing the IEEE 802.15.4 MAC integration with the 6LoWPAN network stack. It derives directly from the mrf24j40-mac and all NOTES provided there apply. Additional differences are summarized below:</p><p>NOTES:</p><ol><li></li></ol><pre><code>You must have two clicker2-stm32 boards each with an MRF24J40 click

:   board in order to run these tests.
</code></pre><ol start="2"><li></li></ol><pre><code>This configuration differs from the mrf24j40-mac configuration in

:   that this configuration, like the usbnsh configuration, uses a
    USB serial device for console I/O. Such a configuration is
    useful on the Clicker2 STM32 which has no builtin RS-232 drivers
    and eliminates the tangle of cables and jumpers needed to debug
    multi-board setups.

    Most other NOTES for the usbnsh configuration should apply.
    Specific differences between the usbnsh or mrf24j40-mac
    configurations and this configuration are listed in these NOTES.
</code></pre><ol start="3"><li></li></ol><pre><code>On most serial terminal programs that I have used, the USB

:   connection will be lost when the target board is reset. When
    that happens, you may have to reset your serial terminal program
    to adapt to the new USB connection. Using TeraTerm, I actually
    have to exit the serial program and restart it in order to
    detect and select the re-established USB serial connection.
</code></pre><ol start="4"><li></li></ol><pre><code>This configuration does NOT have USART3 output enabled. This

:   configuration supports logging of debug output to a circular
    buffer in RAM. This feature is discussed fully in this Wiki
    page: &lt;https://cwiki.apache.org/confluence/display/NUTTX/SYSLOG&gt;
    . Relevant configuration settings are summarized below:

        Device Drivers:
        CONFIG_RAMLOG=y             : Enable the RAM-based logging feature.
        CONFIG_RAMLOG_SYSLOG=y      : This enables the RAM-based logger as the
        system logger.
        CONFIG_RAMLOG_NONBLOCKING=y : Needs to be non-blocking for dmesg
        CONFIG_RAMLOG_BUFSIZE=8192  : Buffer size is 8KiB

    NOTE: This RAMLOG feature is really only of value if debug
    output is enabled. But, by default, no debug output is disabled
    in this configuration. Therefore, there is no logic that will
    add anything to the RAM buffer. This feature is configured and
    in place only to support any future debugging needs that you may
    have.

    If you don\\&#39;t plan on using the debug features, then by all
    means disable this feature and save 8KiB of RAM!

    NOTE: There is an issue with capturing data in the RAMLOG: If
    the system crashes, all of the crash dump information will go
    into the RAMLOG and you will be unable to access it! You can
    tell that the system has crashed because (a) it will be
    unresponsive and (b) the LD2 will be blinking at about 2Hz.
</code></pre><ol start="5"><li><p>IPv6 networking is enabled with TCP/IP, UDP, 6LoWPAN, and NSH Telnet support.</p></li><li><p>Configuration instructions: Basic PAN configuration is similar to the mrf24j40-mac configuration with the exception that you use the network interface name &#39;wpan0&#39;. This tells the i8sak app to use a socket instead of a character device to perform the IOCTL operations with the MAC. Additionally, after the PAN has been configured with the i8sak utility, you must explicitly bring the network up on each node:</p><pre><code>nsh&gt; ifup wpan0
</code></pre></li><li><p>examples/udp is enabled. This will allow two MRF24J40 nodes to exchange UDP packets. Basic instructions:</p><p>On the server node:</p><pre><code>nsh&gt; ifconfig
nsh&gt; udpserver &amp;
</code></pre><p>The ifconfig command will show the IP address of the server. Then on the client node use this IP address to start the client:</p><pre><code>nsh&gt; udpclient &lt;server-ip&gt; &amp;
</code></pre><p>Where &lt;server-ip&gt; is the IP address of the server that you got above. NOTE: There is no way to stop the UDP test once it has been started other than by resetting the board.</p><p>Cheat Sheet. Here is a concise summary of all all the steps needed to run the UDP test (C=Coordinator; E=Endpoint):</p><pre><code>C: nsh&gt; i8 wpan0 startpan cd:ab
C: nsh&gt; i8 acceptassoc
E: nsh&gt; i8 wpan0 assoc
C: nsh&gt; ifup wpan0
C: nsh&gt; ifconfig          &lt;-- To get the &lt;server-ip&gt;
E: nsh&gt; ifup wpan0
C: nsh&gt; udpserver &amp;
E: nsh&gt; udpclient &lt;server-ip&gt; &amp;
</code></pre><p>The nsh&gt; dmesg command can be use at any time on any node to see any debug output that you have selected.</p></li><li><p>examples/nettest is enabled. This will allow two MRF24J40 nodes to exchange TCP packets. Basic instructions:</p><p>On the server node:</p><pre><code>nsh&gt; ifconfig
nsh&gt; tcpserver &amp;
</code></pre><p>The ifconfig command will show the IP address of the server. Then on the client node use this IP address to start the client:</p><pre><code>nsh&gt; tcpclient &lt;server-ip&gt; &amp;
</code></pre><p>Where &lt;server-ip&gt; is the IP address of the server that you got above. NOTE: Unlike the UDP test, there the TCP test will terminate automatically when the packet exchange is complete.</p><p>Cheat Sheet. Here is a concise summary of all all the steps needed to run the TCP test (C=Coordinator; E=Endpoint):</p><pre><code>C: nsh&gt; i8 wpan0 startpan cd:ab
C: nsh&gt; i8 acceptassoc
E: nsh&gt; i8 wpan0 assoc
C: nsh&gt; ifup wpan0
C: nsh&gt; ifconfig          &lt;-- To get the &lt;server-ip&gt;
E: nsh&gt; ifup wpan0
C: nsh&gt; tcpserver &amp;
E: nsh&gt; tcpclient &lt;server-ip&gt; &amp;
</code></pre><p>The nsh&gt; dmesg command can be use at any time on any node to see any debug output that you have selected.</p></li><li><p>The NSH Telnet daemon (server) is enabled. However, it cannot be started automatically. Rather, it must be started AFTER the network has been brought up using the NSH &#39;telnetd&#39; command. You would want to start the Telent daemon only if you want the node to serve Telent connections to an NSH shell on the node.:</p><pre><code>nsh&gt; ifconfig
nsh&gt; telnetd
</code></pre><p>Note the &#39;ifconfig&#39; is executed to get the IP address of the node. This is necessary because the IP address is assigned by the the Coordinator and may not be known a priori.</p></li><li><p>This configuration also includes the Telnet client program. This will allow you to execute a NSH one a node from the command line on a different node. Like:</p><pre><code>nsh&gt; telnet &lt;server-ip&gt;
</code></pre><p>Where &lt;server-ip&gt; is the IP address of the server that you got for the ifconfig comma on the remote node. Once the telnet session has been started, you can end the session with:</p><pre><code>nsh&gt; exit
</code></pre><p>Cheat Sheet. Here is a concise summary of all all the steps needed to run the TCP test (C=Coordinator; E=Endpoint):</p><pre><code>C: nsh&gt; i8 wpan0 startpan
C: nsh&gt; i8 acceptassoc
E: nsh&gt; i8 wpan0 assoc
C: nsh&gt; ifup wpan0
C: nsh&gt; ifconfig           &lt;-- To get the &lt;server-ip&gt;
E: nsh&gt; ifup wpan0
C: nsh&gt; telnetd            &lt;-- Starts the Telnet daemon
E: nsh&gt; telnet &lt;server-ip&gt; &lt;-- Runs the Telnet client
</code></pre><p>STATUS:</p><blockquote><p>2017-06-21: Basic UDP functionality has been achieved with HC06</p><p>: compression and short address. Additional testing is required for other configurations (see text matrix below).</p><p>2017-06-23: Added test for TCP functionality. As of yet unverified.</p><p>2017-06-24: There are significant problems with the 6LoWPAN TCP send</p><p>: logic. A major redesign was done to better handle ACKs and retransmissions, and to work with TCP dynamic windowing.</p><p>2017-05-25: After some rather extensive debug, the TCP test was made</p><p>: to with (HC06 and short addressing).</p><p>2017-06-26: Verified with HC06 and extended addressing and HC1 with</p><p>: both addressing modes.</p><p>2017-06-27: Added the Telnet client application to the configuration.</p><p>: Initial testing reveal a problem that required re-design of the Telnet daemon: It did not yet support IPv6! But after adding this support, Telnet worked just fine.</p><p>Test Matrix: The following configurations have been tested:</p><pre><code>=========== ========== ==== ====
COMPRESSION ADDRESSING UDP  TCP
=========== ========== ==== ====
hc06        short      6/21 6/25
            extended   6/22 6/26
hc1         short      6/23 6/26
            extended   6/23 6/26
ipv6        short      ---  ---
            extended   ---  ---
telnet      short      N/A  6/27 (hc06)
            extended   N/A  ---
=========== ========== ==== ====

Other configuration options have not been specifically addressed
(such non-compressable ports, non-MAC based IPv6 addresses, etc.)

One limitation of this test is that it only tests NuttX 6LoWPAN
against NuttX 6LoWPAN.  It does not prove that NuttX 6LoWPAN is
compatible with other implementations of 6LoWPAN.  The tests could
potentially be verifying only that the design is implemented
incorrectly in compatible way on both the client and server sides.
</code></pre></blockquote></li></ol><h3 id="mrf24j40-starhub-and-mrf24j40-starpoint" tabindex="-1">mrf24j40-starhub and mrf24j40-starpoint <a class="header-anchor" href="#mrf24j40-starhub-and-mrf24j40-starpoint" aria-label="Permalink to &quot;mrf24j40-starhub and mrf24j40-starpoint&quot;">​</a></h3><p>These two configurations implement hub and and star endpoint in a star topology. Both configurations derive from the mrf24j40-6lowpan configuration and most of the notes there apply here as well.</p><ol><li></li></ol><pre><code>You must have three clicker2-stm32 boards each with an MRF24J40

:   click board in order to run these tests: One that serves as the
    star hub and at least two star endpoints.
</code></pre><ol start="2"><li></li></ol><pre><code>The star point configuration differs from the primarily in the

:   mrf24j40-6lowpan in following is also set:

    &gt; CONFIG\\_NET\\_STAR=y CONFIG\\_NET\\_STARPOINT=y

    The CONFIG\\_NET\\_STARPOINT selection informs the endpoint that
    it must send all frames to the hub of the star, rather than
    directly to the recipient.

    The star hub configuration, on the other hand, differs from the
    mrf24j40-6lowpan in these fundamental ways:

    &gt; CONFIG\\_NET\\_STAR=y CONFIG\\_NET\\_STARHUB=y
    &gt; CONFIG\\_NET\\_IPFORWARD=y

    The CONFIG\\_NET\\_IPFORWARD selection informs the hub that if it
    receives any packets that are not destined for the hub, it
    should forward those packets appropriately.
</code></pre><ol start="3"><li></li></ol><pre><code>Telnet: The star point configuration supports the Telnet daemon,

:   but not the Telnet client; the star hub configuration supports
    the Telnet client, but not the Telnet daemon. Therefore, the
    star hub can Telnet to any point in the star, the star endpoints
    cannot initiate telnet sessions.
</code></pre><ol start="4"><li></li></ol><pre><code>TCP and UDP Tests: The same TCP and UDP tests as described for

:   the mrf24j40-6lowpan configuration are supported on the star
    endpoints, but NOT on the star hub. Therefore, all network
    testing is between endpoints with the hub acting, well, only
    like a hub.

    The modified usage of the TCP test is show below with E1 E2
    representing the two star endpoints and C: representing the
    coordinator/hub.:

        C:  nsh&gt; i8 wpan0 startpan cd:ab
        C:  nsh&gt; i8 acceptassoc
        E1: nsh&gt; i8 wpan0 assoc
        E2: nsh&gt; i8 wpan0 assoc
        C:  nsh&gt; ifup wpan0
        E1: nsh&gt; ifup wpan0
        E1: nsh&gt; ifconfig           &lt;-- To get the IP address of E1 endpoint
        E1: nsh&gt; telnetd            &lt;-- Starts the Telnet daemon
        E2: nsh&gt; ifup wpan0
        E2: nsh&gt; ifconfig           &lt;-- To get the IP address of E2 endpoint
        E2: nsh&gt; telnetd            &lt;-- Starts the Telnet daemon
        E1: nsh&gt; tcpserver &amp;
        E2: nsh&gt; tcpclient &lt;server-ip&gt; &amp;

    Where \\&lt;server-ip\\&gt; is the IP address of the E1 endpoint.

    Similarly for the UDP test::

        E1: nsh&gt; udpserver &amp;
        E2: nsh&gt; udpclient &lt;server-ip&gt; &amp;

    The nsh\\&gt; dmesg command can be use at any time on any node to
    see any debug output that you have selected.

    Telenet sessions may be initiated only from the hub to a star
    endpoint:

        C: nsh&gt; telnet &lt;server-ip&gt; &lt;-- Runs the Telnet client

    Where \\&lt;server-ip\\&gt; is the IP address of either the E1 or E2
    endpoints.

    STATUS: 2017-06-29: Configurations added. Initial testing
    indicates that the TCP Telnet client can successfully establish
    sessions with the two star endpoints. When testing
    communications between the two star endpoints via the hub, the
    frames are correctly directed to the hub. However, they are not
    being forwarded to the other endpoint.

    2017-06-30: The failure to forward is understood: When the star

    :   endpoint sent the IPv6 destination address, the HC06
        compression logic elided the address \\-- meaning that it
        could be reconstructed based on the receiver\\&#39;s assigned
        short address. However, when intercepted by the hub, the
        uncompressed address does not know the short address of the
        recipient and instead uses the short address of the hub.
        This means two things: (1) it looks like the hub address is
        the destination address, and (2) the uncompressed UDP packet
        has a bad checksum.

        This required a change to assure that the destination IPv6
        address is not elided in the case of the star endpoint
        configuration. After some additional fixes for byte ordering
        in 16-bit and 64-bit compressed IPv6 addresses, then all
        tests are working as expected: TCP, UDP, Telnet.

    2017-08-05: It looks like I have lost one of my Clicker2-STM32 boards.

    :   This means that I will not be able to do any regression
        testing as changes are made to the radio interfaces and
        6LoWPAN :(

    2017-08-26: There was only a single buffer for reassemblying larger

    :   packets. This could be a problem issue for the hub
        configuration which really needs the capability concurrently
        reassemble multiple incoming streams. The design was
        extended to support multiple reassembly buffers but have not
        yet been verified on this platform.
</code></pre><h3 id="nsh" tabindex="-1">nsh <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh&quot;">​</a></h3><p>Configures the NuttShell (nsh) located at examples/nsh. This configuration is focused on low level, command-line driver testing. It has no network.</p><p>NOTES:</p><ol><li><p>Support for NSH built-in applications is provided:</p><p>Binary Formats:</p><pre><code>CONFIG_BUILTIN=y           : Enable support for built-in programs
</code></pre><p>Application Configuration:</p><pre><code>CONFIG_NSH_BUILTIN_APPS=y  : Enable starting apps from NSH command line
</code></pre><p>No built applications are enabled in the base configuration, however.</p></li><li><p>C++ support for applications is enabled:</p><pre><code>CONFIG_HAVE_CXX=y
CONFIG_HAVE_CXXINITIALIZE=y
</code></pre></li></ol><h3 id="usbnsh" tabindex="-1">usbnsh <a class="header-anchor" href="#usbnsh" aria-label="Permalink to &quot;usbnsh&quot;">​</a></h3><p>This is another NSH example. If differs from other &#39;nsh&#39; configurations n that this configurations uses a USB serial device for console I/O. Such a configuration is useful on the Clicker2 STM32 which has no builtin RS-232 drivers.</p><p>NOTES:</p><ol><li></li></ol><pre><code>One most serial terminal programs that I have used, the USB

:   connection will be lost when the target board is reset. When
    that happens, you may have to reset your serial terminal program
    to adapt to the new USB connection. Using TeraTerm, I actually
    have to exit the serial program and restart it in order to
    detect and select the re-established USB serial connection.
</code></pre><ol start="2"><li></li></ol><pre><code>This configuration does have USART3 output enabled and set up as

:   the system logging device:

        CONFIG_SYSLOG_CHAR=y               : Use a character device for system logging
        CONFIG_SYSLOG_DEVPATH=&quot;/dev/ttyS0&quot; : USART3 will be /dev/ttyS0

    However, there is nothing to generate SYSLOG output in the
    default configuration so nothing should appear on USART3 unless
    you enable some debug output or enable the USB monitor.
</code></pre><ol start="3"><li></li></ol><pre><code>Enabling USB monitor SYSLOG output. If tracing is enabled, the USB

:   device will save encoded trace output in in-memory buffer; if
    the USB monitor is enabled, that trace buffer will be
    periodically emptied and dumped to the system logging device
    (USART3 in this configuration):

        CONFIG_USBDEV_TRACE=y            : Enable USB trace feature
        CONFIG_USBDEV_TRACE_NRECORDS=128 : Buffer 128 records in memory
        CONFIG_NSH_USBDEV_TRACE=n        : No builtin tracing from NSH
        CONFIG_NSH_ARCHINIT=y            : Automatically start the USB monitor
        CONFIG_USBMONITOR=y              : Enable the USB monitor daemon
        CONFIG_USBMONITOR_STACKSIZE=2048 : USB monitor daemon stack size
        CONFIG_USBMONITOR_PRIORITY=50    : USB monitor daemon priority
        CONFIG_USBMONITOR_INTERVAL=2     : Dump trace data every 2 seconds

        CONFIG_USBMONITOR_TRACEINIT=y    : Enable TRACE output
        CONFIG_USBMONITOR_TRACECLASS=y
        CONFIG_USBMONITOR_TRACETRANSFERS=y
        CONFIG_USBMONITOR_TRACECONTROLLER=y
        CONFIG_USBMONITOR_TRACEINTERRUPTS=y
</code></pre><h3 id="using-the-prolifics-pl2303-emulation" tabindex="-1">Using the Prolifics PL2303 Emulation <a class="header-anchor" href="#using-the-prolifics-pl2303-emulation" aria-label="Permalink to &quot;Using the Prolifics PL2303 Emulation&quot;">​</a></h3><p>You could also use the non-standard PL2303 serial device instead of the standard CDC/ACM serial device by changing:</p><pre><code>CONFIG_CDCACM=n               : Disable the CDC/ACM serial device class
CONFIG_CDCACM_CONSOLE=n       : The CDC/ACM serial device is NOT the console
CONFIG_PL2303=y               : The Prolifics PL2303 emulation is enabled
CONFIG_PL2303_CONSOLE=y       : The PL2303 serial device is the console
</code></pre>`,92)]))}const m=t(a,[["render",s]]);export{u as __pageData,m as default};
