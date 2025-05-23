import{_ as t,c as n,al as o,o as i}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"README.txt","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/tiva/boards/dk-tm4c129x/README.md","filePath":"en/platforms/arm/tiva/boards/dk-tm4c129x/README.md"}'),a={name:"en/platforms/arm/tiva/boards/dk-tm4c129x/README.md"};function r(s,e,d,l,h,p){return i(),n("div",null,e[0]||(e[0]=[o(`<h1 id="readme-txt" tabindex="-1">README.txt <a class="header-anchor" href="#readme-txt" aria-label="Permalink to &quot;README.txt&quot;">​</a></h1><p>This README file discusses the port of NuttX to the Texas Instruments DK-TM4C129X Connected Development Kit.</p><h2 id="description" tabindex="-1">Description <a class="header-anchor" href="#description" aria-label="Permalink to &quot;Description&quot;">​</a></h2><p>The Tiva™ C Series TM4C129X Connected Development Kit highlights the 120-MHz Tiva C Series TM4C129XNCZAD ARM® Cortex™-M4 based microcontroller, including an integrated 10/100 Ethernet MAC + PHY as well as many other key features.</p><p>Features --------</p><pre><code>- Color LCD interface
- USB 2.0 OTG | Host | Device port
- TI wireless EM connection
- BoosterPack and BoosterPack XL interfaces
- Quad SSI-supported 512-Mbit Flash memory
- MicroSD slot
- Expansion interface headers: MCU high-speed USB ULPI port,
  Ethernet RMII and MII ports External peripheral interface for
  memories, parallel peripherals, and other system functions.
- In-Circuit Debug Interface (ICDI)
</code></pre><p>Contents - Using OpenOCD and GDB with ICDI - Buttons and LEDs - Serial Console - Networking Support - Timers - Temperature Sensor - DK-TM4129X Configuration Options - Configurations</p><h1 id="using-openocd-and-gdb-with-icdi" tabindex="-1">Using OpenOCD and GDB with ICDI <a class="header-anchor" href="#using-openocd-and-gdb-with-icdi" aria-label="Permalink to &quot;Using OpenOCD and GDB with ICDI&quot;">​</a></h1><p>Building OpenOCD under Cygwin:</p><pre><code>Refer to boards/olimex-lpc1766stk/README.txt
</code></pre><p>Installing OpenOCD in Linux:</p><pre><code>  sudo apt-get install openocd

You can also build openocd from its source:

  git clone http://git.code.sf.net/p/openocd/code openocd
  cd openocd
</code></pre><p>Helper Scripts:</p><pre><code>I have been using the on-board In-Circuit Debug Interface (ICDI) interface.
OpenOCD requires a configuration file.  I keep the one I used last here:

  boards/arm/tiva/dk-tm4c129x/tools/dk-tm4c129x.cfg

However, the &quot;correct&quot; configuration script to use with OpenOCD may
change as the features of OpenOCD evolve.  So you should at least
compare that dk-tm4c129x.cfg file with configuration files in
/usr/share/openocd/scripts.  As of this writing, the configuration
files of interest were:

  /usr/local/share/openocd/scripts/board/dk-tm4c129x.cfg
  /usr/local/share/openocd/scripts/interface/ti-icdi.cfg
  /usr/local/share/openocd/scripts/target/stellaris_icdi.cfg

There is also a script on the tools/ directory that I use to start
the OpenOCD daemon on my system called oocd.sh.  That script will
probably require some modifications to work in another environment:

- Possibly the value of OPENOCD_PATH and TARGET_PATH
- It assumes that the correct script to use is the one at
  boards/arm/tiva/dk-tm4c129x/tools/dk-tm4c129x.cfg
</code></pre><p>Starting OpenOCD</p><pre><code>If you are in the top-level NuttX build directory then you should
be able to start the OpenOCD daemon like:

  oocd.sh $PWD

Assuming that you have included the path to the oocd.sh script,
boards/arm/tiva/dk-tm4c129x/tools, in PATH variable.

Note that OpenOCD needs to be run with administrator privileges in
some environments (sudo).
</code></pre><p>Connecting GDB</p><pre><code>Once the OpenOCD daemon has been started, you can connect to it via
GDB using the following GDB command:

  arm-nuttx-elf-gdb
  (gdb) target remote localhost:3333

NOTE:  The name of your GDB program may differ.  For example, with the
CodeSourcery toolchain, the ARM GDB would be called arm-none-eabi-gdb.

After starting GDB, you can load the NuttX ELF file:

  (gdb) symbol-file nuttx
  (gdb) monitor reset
  (gdb) monitor halt
  (gdb) load nuttx

NOTES:

1. Loading the symbol-file is only useful if you have built NuttX to
   include debug symbols (by setting CONFIG_DEBUG_SYMBOLS=y in the
   .config file).
2. The MCU must be halted prior to loading code using &#39;mon reset&#39;
   as described below.

OpenOCD will support several special &#39;monitor&#39; commands.  These
GDB commands will send comments to the OpenOCD monitor.  Here
are a couple that you will need to use:

 (gdb) monitor reset
 (gdb) monitor halt

NOTES:

1. The MCU must be halted using &#39;mon halt&#39; prior to loading code.
2. Reset will restart the processor after loading code.
3. The &#39;monitor&#39; command can be abbreviated as just &#39;mon&#39;.
</code></pre><h1 id="buttons-and-leds" tabindex="-1">Buttons and LEDs <a class="header-anchor" href="#buttons-and-leds" aria-label="Permalink to &quot;Buttons and LEDs&quot;">​</a></h1><h2 id="buttons" tabindex="-1">Buttons <a class="header-anchor" href="#buttons" aria-label="Permalink to &quot;Buttons&quot;">​</a></h2><p>There are three push buttons on the board.</p><pre><code>--- ------------ -----------------
Pin Pin Function Jumper
--- ------------ -----------------
PP1 Select SW4   J37 pins 1 and 2
PN3 Up SW2       J37 pins 3 and 4
PE5 Down SW3     J37 pins 5 and 6
--- ------------ -----------------
</code></pre><h2 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h2><p>The development board has one tri-color user LED.</p><pre><code>--- ------------ -----------------
Pin Pin Function Jumper
--- ------------ -----------------
PN5 Red LED      J36 pins 1 and 2
PQ4 Blue LED     J36 pins 3 and 4
PQ7 Green LED    J36 pins 5 and 6
--- ------------ -----------------
</code></pre><p>If CONFIG_ARCH_LEDS is not defined, this LED is not used by the NuttX logic. APIs are provided to support application control of the LED in that case (in include/board.h and src/tm4c_userleds.c).</p><p>If CONFIG_ARCH_LEDS is defined then the usage of the LEDs by NuttX is defined in include/board.h and src/tm4c_autoleds.c. The LEDs are used to encode OS-related events as follows:</p><pre><code>SYMBOL                Meaning                     LED state
-------------------  -----------------------  -------- --------
LED_STARTED          NuttX has been started     Blue
LED_HEAPALLOCATE     Heap has been allocated    (No change)
LED_IRQSENABLED      Interrupts enabled         (No change)
LED_STACKCREATED     Idle stack created         Green
LED_INIRQ            In an interrupt            (No change)
LED_SIGNAL           In a signal handler        (No change)
LED_ASSERTION        An assertion failed        (No change)
LED_PANIC            The system has crashed     Blinking OFF/RED
LED_IDLE             MCU is is sleep mode       (Not used)
</code></pre><p>Thus if the LED is GREEN then NuttX has successfully booted and is, apparently, running normally. If the LED is flashing OFF/RED at approximately 2Hz, then a fatal error has been detected and the system has halted.</p><h1 id="serial-console" tabindex="-1">Serial Console <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;Serial Console&quot;">​</a></h1><p>By default, all configurations use UART0 which connects to the USB VCOM on the DEBUG port on the TM4C123 ICDI interface:</p><pre><code>UART0 RX - PA.0
UART0 TX - PA.1
</code></pre><p>However, if you use an external RS232 driver, then other options are available. If your serial terminal loses connection with the USB serial port each time you power cycle the board, the VCOM option can be very painful.</p><p>UART0 TTL level signals are also available at J3 (also at J1):</p><pre><code>DEBUG_TX - J3, pin 13.  Labelled PA1
DEBUG_RX - J3, pin 15.  Labelled PA0
</code></pre><p>Remove the jumper between pins 13-14 and 15-16 to disconnect UART0 from the TM4C123 ICDI chip; Connect your external RS-232 driver at pins 13 and 16. 5v, 3.3v, AND GND are arvailable nearby at J10.</p><h1 id="networking-support" tabindex="-1">Networking Support <a class="header-anchor" href="#networking-support" aria-label="Permalink to &quot;Networking Support&quot;">​</a></h1><p>Networking support via the can be added to NSH by selecting the following configuration options.</p><p>Selecting the EMAC peripheral -----------------------------</p><p>System Type -&gt; SAM34 Peripheral Support CONFIG_TIVA_ETHERNET=y : Enable the EMAC peripheral</p><p>System Type -&gt; EMAC device driver options CONFIG_TIVA_EMAC_NRXDESC=8 : Set aside some RX and TX descriptors/buffers CONFIG_TIVA_EMAC_NTXDESC=4 CONFIG_TIVA_AUTONEG=y : Use autonegotiation CONFIG_TIVA_PHY_INTERNAL=y : Use the internal PHY CONFIG_TIVA_BOARDMAC=y : Use the MAC address in the FLASH USER0/1 registers</p><p>Networking Support CONFIG_NET=y : Enable Neworking CONFIG_NET_ETHERNET=y : Support Ethernet data link CONFIG_NET_SOCKOPTS=y : Enable socket operations CONFIG_NET_ETH_PKTSIZE=590 : Maximum packet size 1518 is more standard CONFIG_NET_ARP=y : Enable ARP CONFIG_NET_ARPTAB_SIZE=16 : ARP table size CONFIG_NET_ARP_IPIN=y : Enable ARP address harvesting CONFIG_NET_ARP_SEND=y : Send ARP request before sending data CONFIG_NET_TCP=y : Enable TCP/IP networking CONFIG_NET_TCP_WRITE_BUFFERS=y : Support TCP write-buffering CONFIG_NET_TCPBACKLOG=y : Support TCP/IP backlog CONFIG_NET_MAX_LISTENPORTS=20 : CONFIG_NET_UDP=y : Enable UDP networking CONFIG_NET_BROADCAST=y : Needed for DNS name resolution CONFIG_NET_ICMP=y : Enable ICMP networking CONFIG_NET_ICMP_SOCKET=y : Needed for NSH ping command : Defaults should be okay for other options Application Configuration -&gt; Network Utilities CONFIG_NETDB_DNSCLIENT=y : Enable host address resolution CONFIG_NETUTILS_TELNETD=y : Enable the Telnet daemon CONFIG_NETUTILS_TFTPC=y : Enable TFTP data file transfers for get and put commands CONFIG_NETUTILS_NETLIB=y : Network library support is needed CONFIG_NETUTILS_WEBCLIENT=y : Needed for wget support : Defaults should be okay for other options Application Configuration -&gt; NSH Library CONFIG_NSH_TELNET=y : Enable NSH session via Telnet CONFIG_NSH_IPADDR=0x0a000002 : Select a fixed IP address CONFIG_NSH_DRIPADDR=0x0a000001 : IP address of gateway/host PC CONFIG_NSH_NETMASK=0xffffff00 : Netmask CONFIG_NSH_NOMAC=y : Need to make up a bogus MAC address : Defaults should be okay for other options</p><p>You can also enable the DHCPC client for networks that use dynamically assigned address:</p><p>Application Configuration -&gt; Network Utilities CONFIG_NETUTILS_DHCPC=y : Enables the DHCP client</p><p>Networking Support CONFIG_NET_UDP=y : Depends on broadcast UDP</p><p>Application Configuration -&gt; NSH Library CONFIG_NET_BROADCAST=y CONFIG_NSH_DHCPC=y : Tells NSH to use DHCPC, not : the fixed addresses</p><p>Using the network with NSH --------------------------</p><p>So what can you do with this networking support? First you see that NSH has several new network related commands:</p><pre><code>ifconfig, ifdown, ifup:  Commands to help manage your network
get and put:             TFTP file transfers
wget:                    HTML file transfers
ping:                    Check for access to peers on the network
Telnet console:          You can access the NSH remotely via telnet.
</code></pre><p>You can also enable other add on features like full FTP or a Web Server or XML RPC and others. There are also other features that you can enable like DHCP client (or server) or network name resolution.</p><p>By default, the IP address of the DK-TM4C129X will be 10.0.0.2 and it will assume that your host is the gateway and has the IP address 10.0.0.1.</p><pre><code>nsh&gt; ifconfig
eth0    HWaddr 00:e0:de:ad:be:ef at UP
        IPaddr:10.0.0.2 DRaddr:10.0.0.1 Mask:255.255.255.0
</code></pre><p>You can use ping to test for connectivity to the host (Careful, Window firewalls usually block ping-related ICMP traffic). On the target side, you can:</p><pre><code>nsh&gt; ping 10.0.0.1
PING 10.0.0.1 56 bytes of data
56 bytes from 10.0.0.1: icmp_seq=1 time=0 ms
56 bytes from 10.0.0.1: icmp_seq=2 time=0 ms
56 bytes from 10.0.0.1: icmp_seq=3 time=0 ms
56 bytes from 10.0.0.1: icmp_seq=4 time=0 ms
56 bytes from 10.0.0.1: icmp_seq=5 time=0 ms
56 bytes from 10.0.0.1: icmp_seq=6 time=0 ms
56 bytes from 10.0.0.1: icmp_seq=7 time=0 ms
56 bytes from 10.0.0.1: icmp_seq=8 time=0 ms
56 bytes from 10.0.0.1: icmp_seq=9 time=0 ms
56 bytes from 10.0.0.1: icmp_seq=10 time=0 ms
10 packets transmitted, 10 received, 0% packet loss, time 10100 ms
</code></pre><p>NOTE: In this configuration it is normal to have packet loss &gt; 0% the first time you ping due to the default handling of the ARP table.</p><p>On the host side, you should also be able to ping the DK-TM4C129X:</p><pre><code>$ ping 10.0.0.2
</code></pre><p>You can also log into the NSH from the host PC like this:</p><pre><code>$ telnet 10.0.0.2
Trying 10.0.0.2...
Connected to 10.0.0.2.
Escape character is &#39;^]&#39;.
sh_telnetmain: Session [3] Started

NuttShell (NSH) NuttX-6.31
nsh&gt; help
help usage:  help [-v] [&lt;cmd&gt;]

  [           echo        ifconfig    mkdir       mw          sleep
  ?           exec        ifdown      mkfatfs     ping        test
  cat         exit        ifup        mkfifo      ps          umount
  cp          free        kill        mkrd        put         usleep
  cmp         get         losetup     mh          rm          wget
  dd          help        ls          mount       rmdir       xd
  df          hexdump     mb          mv          source

Builtin Apps:
nsh&gt;
</code></pre><p>NOTE: If you enable this networking as described above, you will experience a delay on booting NSH. That is because the start-up logic waits for the network connection to be established before starting NuttX. In a real application, you would probably want to do the network bringup on a separate thread so that access to the NSH prompt is not delayed.</p><p>This delay will be especially long if the board is not connected to a network. On the order of minutes! You will probably think that NuttX has crashed! And then, when it finally does come up after numerous timeouts and retries, the network will not be available -- even if the network cable is plugged in later.</p><p>The long delays can be eliminated by using a separate network initialization thread discussed below. Recovering after the network becomes available requires the network monitor feature, also discussed below.</p><h2 id="network-initialization-thread" tabindex="-1">Network Initialization Thread <a class="header-anchor" href="#network-initialization-thread" aria-label="Permalink to &quot;Network Initialization Thread&quot;">​</a></h2><p>There is a configuration option enabled by CONFIG_NSH_NETINIT_THREAD that will do the NSH network bring-up asynchronously in parallel on a separate thread. This eliminates the (visible) networking delay altogether. This current implementation, however, has some limitations:</p><pre><code>- If no network is connected, the network bring-up will fail and
  the network initialization thread will simply exit.  There are no
  retries and no mechanism to know if the network initialization was
  successful (it could perform a network Ioctl to see if the link is
  up and it now, keep trying, but it does not do that now).

- Furthermore, there is currently no support for detecting loss of
  network connection and recovery of the connection (similarly, this
  thread could poll periodically for network status, but does not).
</code></pre><p>Both of these shortcomings could be eliminated by enabling the network monitor:</p><h2 id="network-monitor" tabindex="-1">Network Monitor <a class="header-anchor" href="#network-monitor" aria-label="Permalink to &quot;Network Monitor&quot;">​</a></h2><p>By default the network initialization thread will bring-up the network then exit, freeing all of the resources that it required. This is a good behavior for systems with limited memory.</p><p>If the CONFIG_NSH_NETINIT_MONITOR option is selected, however, then the network initialization thread will persist forever; it will monitor the network status. In the event that the network goes down (for example, if a cable is removed), then the thread will monitor the link status and attempt to bring the network back up. In this case the resources required for network initialization are never released.</p><p>Pre-requisites:</p><pre><code>- CONFIG_NSH_NETINIT_THREAD as described above.

- CONFIG_TIVA_PHY_INTERRUPTS=y.  The TM4C129X EMAC block supports PHY
  interrupts.  This is true whether the TM4C internal PHY is used or
  if an external PHY is used.  If this option is selected, then support
  for the PHY interrupt will be built in and the following additional
  settings will be automatically selected:

    CONFIG_NETDEV_PHY_IOCTL. Enable PHY IOCTL commands in the Ethernet
    device driver. Special IOCTL commands must be provided by the Ethernet
    driver to support certain PHY operations that will be needed for link
    management. These operations are not complex and are implemented for
    the Atmel SAMA5 family.

    CONFIG_ARCH_PHY_INTERRUPT. This is not a user selectable option.
    Rather, it is set when you select a board that supports PHY
    interrupts.  In most architectures, the PHY interrupt is not
    associated with the Ethernet driver at all; the Tiva architecture is
    an exception. For most other architectures, the PHY interrupt is
    provided via some board-specific GPIO.  In any event, the board-
    specific logic must provide support for the PHY interrupt. To do
    this, the board logic must do two things: (1) It must provide the
    function arch_phy_irq() as described and prototyped in the
    nuttx/include/nuttx/arch.h, and (2) it must select
    CONFIG_ARCH_PHY_INTERRUPT in the board configuration file to
    advertise that it supports arch_phy_irq().

    One other thing: UDP support is required (CONFIG_NET_UDP).
</code></pre><p>Given those prerequisites, the network monitor can be selected with these additional settings.</p><pre><code>System Type -&gt; Tiva Ethernet Configuration
  CONFIG_TIVA_PHY_INTERRUPTS=y          : Enable PHY interrupt support
  CONFIG_ARCH_PHY_INTERRUPT=y           : (auto-selected)
  CONFIG_NETDEV_PHY_IOCTL=y             : (auto-selected)

Application Configuration -&gt; NSH Library -&gt; Networking Configuration
  CONFIG_NSH_NETINIT_THREAD             : Enable the network initialization thread
  CONFIG_NSH_NETINIT_MONITOR=y          : Enable the network monitor
  CONFIG_NSH_NETINIT_RETRYMSEC=2000     : Configure the network monitor as you like
</code></pre><h1 id="timers" tabindex="-1">Timers <a class="header-anchor" href="#timers" aria-label="Permalink to &quot;Timers&quot;">​</a></h1><p>Tiva timers may be enabled in 32-bit periodic mode using these settings.</p><p>This settings enables the &quot;upper half&quot; timer driver:</p><pre><code>Devices Drivers -&gt; Timer Support
  CONFIG_TIMER=y
</code></pre><p>These settings enable Tiva timer driver support</p><pre><code>System Type -&gt; Tiva/Stellaris Peripheral Support
  CONFIG_TIVA_TIMER1=y     : For timer 1

System Type -&gt; Tiva Timer Configuration (using Timer 1)
  CONFIG_TIVA_TIMER_32BIT=y
  CONFIG_TIVA_TIMER32_PERIODIC=y
</code></pre><p>These setting enable board-specific logic to initialize the timer logic (using Timer 1):</p><pre><code>Board Selection -&gt; Timer driver selection
  CONFIG_DK_TM4C129X_TIMER1=y
  CONFIG_DK_TM4C129X_TIMER_DEVNAME=&quot;/dev/timer0&quot;
  CONFIG_DK_TM4C129X_TIMER_TIMEOUT=10000
</code></pre><p>There is a simple example at apps/examples/timer that can be used to exercise the timers. The following configuration options can be selected to enable that example:</p><pre><code>Application Configure -&gt; Examples -&gt; Timer Example
  CONFIG_EXAMPLES_TIMER=y
  CONFIG_EXAMPLES_TIMER_DEVNAME=&quot;/dev/timer0&quot;
  CONFIG_EXAMPLES_TIMER_DELAY=100000
  CONFIG_EXAMPLES_TIMER_NSAMPLES=20
</code></pre><h1 id="temperature-sensor" tabindex="-1">Temperature Sensor <a class="header-anchor" href="#temperature-sensor" aria-label="Permalink to &quot;Temperature Sensor&quot;">​</a></h1><h2 id="tmp-1000-temperature-sensor-driver" tabindex="-1">TMP-1000 Temperature Sensor Driver <a class="header-anchor" href="#tmp-1000-temperature-sensor-driver" aria-label="Permalink to &quot;TMP-1000 Temperature Sensor Driver&quot;">​</a></h2><p>Support for the on-board TMP-100 temperature sensor is available. This uses the driver for the compatible LM-75 part. To set up the temperature sensor, add the following to the NuttX configuration file:</p><pre><code>System Type -&gt; Tiva/Stellaris Peripheral Selection
  CONFIG_TIVA_I2C6=y

Drivers -&gt; I2C Support
  CONFIG_I2C=y

Drivers -&gt; Sensors
  CONFIG_SENSORS_LM75=y
  CONFIG_LM75_I2C=y

Applications -&gt; NSH Library
  CONFIG_NSH_ARCHINIT=y
</code></pre><p>Then you can implement logic like the following to use the temperature sensor:</p><pre><code>#include &lt;nuttx/sensors/lm75.h&gt;
#include &lt;arch/board/board.h&gt;

ret = tiva_tmp100_initialize(&quot;/dev/temp&quot;);      /* Register the temperature sensor */
fd  = open(&quot;/dev/temp&quot;, O_RDONLY);              /* Open the temperature sensor device */
ret = ioctl(fd, SNIOC_FAHRENHEIT, 0);           /* Select Fahrenheit */
bytesread = read(fd, buffer, 8*sizeof(b16_t));  /* Read (8) temperature samples */
</code></pre><p>More complex temperature sensor operations are also available. See the IOCTL commands enumerated in include/nuttx/sensors/lm75.h. Also read the descriptions of the tiva_tmp100_initialize() and tiva_tmp100_attach() interfaces in the arch/board/board.h file (sames as boards/arm/tiva/dk-tm4c129x/include/board.h).</p><h2 id="nsh-command-line-application" tabindex="-1">NSH Command Line Application <a class="header-anchor" href="#nsh-command-line-application" aria-label="Permalink to &quot;NSH Command Line Application&quot;">​</a></h2><p>There is a tiny NSH command line application at examples/system/lm75 that will read the current temperature from an LM75 compatible temperature sensor and print the temperature on stdout in either units of degrees Fahrenheit or Centigrade. This tiny command line application is enabled with the following configuration options:</p><pre><code>Library
  CONFIG_LIBM=y
  CONFIG_LIBC_FLOATINGPOINT=y

Applications -&gt; NSH Library
  CONFIG_NSH_ARCHINIT=y

Applications -&gt; System Add-Ons
  CONFIG_SYSTEM_LM75=y
  CONFIG_SYSTEM_LM75_DEVNAME=&quot;/dev/temp&quot;
  CONFIG_SYSTEM_LM75_FAHRENHEIT=y  (or CENTIGRADE)
  CONFIG_SYSTEM_LM75_STACKSIZE=1024
  CONFIG_SYSTEM_LM75_PRIORITY=100
</code></pre><h1 id="dk-tm4129x-configuration-options" tabindex="-1">DK-TM4129X Configuration Options <a class="header-anchor" href="#dk-tm4129x-configuration-options" aria-label="Permalink to &quot;DK-TM4129X Configuration Options&quot;">​</a></h1><pre><code>CONFIG_ARCH - Identifies the arch/ subdirectory.  This should
   be set to:

   CONFIG_ARCH=arm

CONFIG_ARCH_family - For use in C code:

   CONFIG_ARCH_ARM=y

CONFIG_ARCH_architecture - For use in C code:

   CONFIG_ARCH_CORTEXM4=y

CONFIG_ARCH_CHIP - Identifies the arch/*/chip subdirectory

   CONFIG_ARCH_CHIP=&quot;tiva&quot;

CONFIG_ARCH_CHIP_name - For use in C code to identify the exact
   chip:

CONFIG_ARCH_CHIP_TM4C129XNCZAD

CONFIG_ARCH_BOARD - Identifies the boards/ subdirectory and
   hence, the board that supports the particular chip or SoC.

   CONFIG_ARCH_BOARD=dk-tm4c129x (for the DK-TM4129X)

CONFIG_ARCH_BOARD_name - For use in C code

   CONFIG_ARCH_BOARD_DK_TM4C129X

CONFIG_ARCH_LOOPSPERMSEC - Must be calibrated for correct operation
   of delay loops

CONFIG_ENDIAN_BIG - define if big endian (default is little
   endian)

CONFIG_RAM_SIZE - Describes the installed DRAM (SRAM in this case):

   CONFIG_RAM_SIZE=0x00008000 (32Kb)

CONFIG_RAM_START - The start address of installed DRAM

   CONFIG_RAM_START=0x20000000

CONFIG_ARCH_LEDS - Use LEDs to show state. Unique to boards that
   have LEDs

CONFIG_ARCH_INTERRUPTSTACK - This architecture supports an interrupt
   stack. If defined, this symbol is the size of the interrupt
   stack in bytes.  If not defined, the user task stacks will be
   used during interrupt handling.

CONFIG_ARCH_STACKDUMP - Do stack dumps after assertions

CONFIG_ARCH_LEDS -  Use LEDs to show state. Unique to board architecture.
</code></pre><p>There are configurations for disabling support for interrupts GPIO ports. Only GPIOP and GPIOQ pins can be used as interrupting sources on the TM4C129X. Additional interrupt support can be disabled if desired to reduce memory footprint.</p><pre><code>CONFIG_TIVA_GPIOP_IRQS=y
CONFIG_TIVA_GPIOQ_IRQS=y
</code></pre><p>TM4C129X specific device driver settings</p><pre><code>CONFIG_UARTn_SERIAL_CONSOLE - selects the UARTn for the
   console and ttys0 (default is the UART0).
CONFIG_UARTn_RXBUFSIZE - Characters are buffered as received.
   This specific the size of the receive buffer
CONFIG_UARTn_TXBUFSIZE - Characters are buffered before
   being sent.  This specific the size of the transmit buffer
CONFIG_UARTn_BAUD - The configure BAUD of the UART.  Must be
CONFIG_UARTn_BITS - The number of bits.  Must be either 7 or 8.
CONFIG_UARTn_PARTIY - 0=no parity, 1=odd parity, 2=even parity
CONFIG_UARTn_2STOP - Two stop bits

CONFIG_TIVA_SSI0 - Select to enable support for SSI0
CONFIG_TIVA_SSI1 - Select to enable support for SSI1
CONFIG_SSI_POLLWAIT - Select to disable interrupt driven SSI support.
  Poll-waiting is recommended if the interrupt rate would be to
  high in the interrupt driven case.
CONFIG_SSI_TXLIMIT - Write this many words to the Tx FIFO before
  emptying the Rx FIFO.  If the SPI frequency is high and this
  value is large, then larger values of this setting may cause
  Rx FIFO overrun errors.  Default: half of the Tx FIFO size (4).

CONFIG_TIVA_ETHERNET - This must be set (along with CONFIG_NET)
  to build the Tiva Ethernet driver
CONFIG_TIVA_ETHLEDS - Enable to use Ethernet LEDs on the board.
CONFIG_TIVA_BOARDMAC - If the board-specific logic can provide
  a MAC address (via tiva_ethernetmac()), then this should be selected.
CONFIG_TIVA_ETHHDUPLEX - Set to force half duplex operation
CONFIG_TIVA_ETHNOAUTOCRC - Set to suppress auto-CRC generation
CONFIG_TIVA_ETHNOPAD - Set to suppress Tx padding
CONFIG_TIVA_MULTICAST - Set to enable multicast frames
CONFIG_TIVA_PROMISCUOUS - Set to enable promiscuous mode
CONFIG_TIVA_BADCRC - Set to enable bad CRC rejection.
CONFIG_TIVA_DUMPPACKET - Dump each packet received/sent to the console.
</code></pre><h1 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h1><p>Each DK-TM4C129X configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh dk-tm4c129x:&lt;subdir&gt;
</code></pre><p>Where <code>&lt;subdir&gt;</code> is one of the following:</p><h2 id="nsh" tabindex="-1">nsh: <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh:&quot;">​</a></h2><p>Configures the NuttShell (nsh) located at apps/examples/nsh. The configuration enables the serial VCOM interfaces on UART0. Support for builtin applications is enabled, but in the base configuration no builtin applications are selected.</p><pre><code>NOTES:

1. This configuration uses the mconf-based configuration tool.  To
   change this configuration using that tool, you should:

   a. Build and install the kconfig-mconf tool.  See nuttx/README.txt
      see additional README.txt files in the NuttX tools repository.

   b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the
      reconfiguration process.

2. By default, this configuration uses the ARM EABI toolchain
   for Windows and builds under Cygwin (or probably MSYS).  That
   can easily be reconfigured, of course.

   CONFIG_HOST_WINDOWS=y                   : Windows
   :CONFIG_WINDOWS_CYGWIN=y                : Cygwin under Windows
   CONFIG_ARM_TOOLCHAIN_GNU_EABI=y      : GNU EABI toolchain for Windows
   CONFIG_RAW_BINARY=y                     : Output formats: ELF and raw binary

3. Default stack sizes are large and should really be tuned to reduce
   the RAM footprint:

     CONFIG_SCHED_HPWORKSTACKSIZE=2048
     CONFIG_IDLETHREAD_STACKSIZE=1024
     CONFIG_INIT_STACKSIZE=2048
     CONFIG_PTHREAD_STACK_DEFAULT=2048
     CONFIG_POSIX_SPAWN_DEFAULT_STACKSIZE=2048
     CONFIG_SYSTEM_TELNETD_STACKSIZE=2048
     CONFIG_SYSTEM_TELNETD_SESSION_STACKSIZE=2048

4. This configuration has the network enabled by default.  See the
   paragraph &quot;Using the network with NSH&quot; above).

   Networking can be easily be disabled or reconfigured (See see the
   network related configuration settings above in the section entitled
   &quot;Networking&quot;).

   By default, this configuration assumes a 10.0.0.xx network.  It
   uses a fixed IP address of 10.0.0.2 and assumes that the host is
   at 10.0.0.1 and that the host provides the default router.  The
   network mask is 255.255.255.0.  These address can be changed by
   modifying the settings in the configuration.  DHCPC can be enabled
   be modifying this default configuration (See the &quot;Networking&quot;
   section above).

   The network initialization thread is enabled in this example.  NSH
   will create a separate thread when it starts to initialize the
   network.  This eliminates start-up delays to bring the network.  This
   feature may be disabled by reverting the configuration described above
   under &quot;Network Initialization Thread&quot;

   The persistent network monitor thread is also available in this
   configuration.  The network monitor will monitor changes in the
   link status and gracefully take the network down when the link is
   lost (for example, if the cable is disconnected) and bring the
   network back up when the link becomes available again (for example,
   if the cable is reconnected).  The paragraph &quot;Network Monitor&quot; above
   for additional information.

5. I2C6 and support for the on-board TMP-100 temperature sensor are
   enabled.  Also enabled is the NSH &#39;temp&#39; command that will show the
   current temperature on the command line like:

   nsh&gt; temp
   80.60 degrees Fahrenheit

   [80.6 F in January.  I love living in Costa Rica1]

   The default units is degrees Fahrenheit, but that is easily
   reconfigured.  See the discussin above in the paragraph entitled
   &quot;Temperature Sensor&quot;.
</code></pre><h2 id="ipv6" tabindex="-1">ipv6: <a class="header-anchor" href="#ipv6" aria-label="Permalink to &quot;ipv6:&quot;">​</a></h2><p>This is another version of the NuttShell configuration. It is very similar to the nsh configuration except that it has IPv6 enabled and IPv4 disabled. Several network utilities that are not yet available under IPv6 are disabled.</p><pre><code>NOTES:

1. As of 2015-01-23, this configuration was identical to the nsh
   configuration other than using IPv6.  So all of the notes above
   regarding the nsh configuration apply.

   Telnet does work with IPv6 but is not enabled in this
   configuration (but could be).

2. This configuration can be modified to that both IPv4 and IPv6
   are support.  Here is a summary of the additional configuration
   settings required to support both IPv4 and IPv6:

     CONFIG_NET_IPv4=y
     CONFIG_NET_ARP=y
     CONFIG_NET_ARP_SEND=y (optional)
     CONFIG_NET_ICMP=y
     CONFIG_NET_ICMP_SOCKET=y

     CONFIG_NETDB_DNSCLIENT=y
     CONFIG_NETUTILS_TELNETD=y

     CONFIG_NSH_IPADDR=0x0a000002
     CONFIG_NSH_DRIPADDR=0x0a000001
     CONFIG_NSH_NETMASK=0xffffff00
     CONFIG_NSH_TELNET=y

   Then from NSH, you have both ping and ping6 commands:

     nsh&gt; ping 10.0.0.1
     nsh&gt; ping6 fc00::1

   And from the host you can do similar:

     ping 10.0.0.2
     ping6 fc00::2   (Linux)
     ping -6 fc00::2 (Windows cmd)

   and Telnet is now enabled and works from the host... but only using
   IPv6 addressing:

     telnet fc00::2

   That is because the Telnet daemon will default to IPv6 and there is
   no Telnet option to let you select which if both IPv4 and IPv6 are
   enabled.

3. You can enable IPv6 autonomous address configuration with the
   following changes to the configuration:

   + CONFIG_NET_ICMPv6_AUTOCONF=y
   + CONFIG_ICMPv6_AUTOCONF_DELAYMSEC=100
   + CONFIG_ICMPv6_AUTOCONF_MAXTRIES=5

   - CONFIG_NSH_DRIPv6ADDR_1=0xfc00
   - CONFIG_NSH_DRIPv6ADDR_2=0x0000
   - CONFIG_NSH_DRIPv6ADDR_3=0x0000
   - CONFIG_NSH_DRIPv6ADDR_4=0x0000
   - CONFIG_NSH_DRIPv6ADDR_5=0x0000
   - CONFIG_NSH_DRIPv6ADDR_6=0x0000
   - CONFIG_NSH_DRIPv6ADDR_7=0x0000
   - CONFIG_NSH_DRIPv6ADDR_8=0x0001

   - CONFIG_NSH_IPv6ADDR_1=0xfc00
   - CONFIG_NSH_IPv6ADDR_2=0x0000
   - CONFIG_NSH_IPv6ADDR_3=0x0000
   - CONFIG_NSH_IPv6ADDR_4=0x0000
   - CONFIG_NSH_IPv6ADDR_5=0x0000
   - CONFIG_NSH_IPv6ADDR_6=0x0000
   - CONFIG_NSH_IPv6ADDR_7=0x0000
   - CONFIG_NSH_IPv6ADDR_8=0x0002
   - CONFIG_NSH_IPv6NETMASK_1=0xffff
   - CONFIG_NSH_IPv6NETMASK_2=0xffff
   - CONFIG_NSH_IPv6NETMASK_3=0xffff
   - CONFIG_NSH_IPv6NETMASK_4=0xffff
   - CONFIG_NSH_IPv6NETMASK_5=0xffff
   - CONFIG_NSH_IPv6NETMASK_6=0xffff
   - CONFIG_NSH_IPv6NETMASK_7=0xffff
   - CONFIG_NSH_IPv6NETMASK_8=0xff80
</code></pre>`,109)]))}const _=t(a,[["render",r]]);export{u as __pageData,_ as default};
