import{_ as t,c as n,al as o,o as i}from"./chunks/framework.NFAqBSgQ.js";const c=JSON.parse('{"title":"README","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/sam34/boards/sam4e-ek/README.md","filePath":"en/platforms/arm/sam34/boards/sam4e-ek/README.md"}'),a={name:"en/platforms/arm/sam34/boards/sam4e-ek/README.md"};function r(s,e,l,d,u,p){return i(),n("div",null,e[0]||(e[0]=[o(`<h1 id="readme" tabindex="-1">README <a class="header-anchor" href="#readme" aria-label="Permalink to &quot;README&quot;">​</a></h1><p>This README discusses issues unique to NuttX configurations for the Atmel SAM4E-EK development. This board features the SAM4E16 MCU running at 96 or 120MHz.</p><h1 id="contents" tabindex="-1">Contents <a class="header-anchor" href="#contents" aria-label="Permalink to &quot;Contents&quot;">​</a></h1><ul><li>Atmel Studio 6.1</li><li>Loading Code with J-Link</li><li>Loading Code OpenOCD</li><li>Writing to FLASH using SAM-BA</li><li>LEDs</li><li>Serial Console</li><li>Networking Support</li><li>AT25 Serial FLASH</li><li>USB Full-Speed Device</li><li>HSMCI</li><li>Touchscreen</li><li>ILI9325/41-Based LCD</li><li>SAM4E-EK-specific Configuration Options</li><li>Configurations</li></ul><h1 id="atmel-studio-6-1" tabindex="-1">Atmel Studio 6.1 <a class="header-anchor" href="#atmel-studio-6-1" aria-label="Permalink to &quot;Atmel Studio 6.1&quot;">​</a></h1><p>You can use Atmel Studio 6.1 to load and debug code.</p><ul><li><p>To load code into FLASH:</p><p>Tools menus: Tools -&gt; Device Programming.</p><p>Configure the debugger and chip and you are in business.</p></li><li><p>Debugging the NuttX Object File:</p><ol><li><p>Rename object file from nuttx to nuttx.elf. That is an extension that will be recognized by the file menu.</p></li><li><p>Select the project name, the full path to the NuttX object (called just nuttx with no extension), and chip. Take the time to resolve all of the source file linkages or else you will not have source level debug!</p><p>File menu: File -&gt; Open -&gt; Open object file for debugging</p><ul><li>Select nuttx.elf object file</li><li>Select AT91SAM4E16</li><li>Select files for symbols as desired</li><li>Select debugger</li></ul></li><li><p>Debug menu: Debug -&gt; Start debugging and break</p><ul><li>This will reload the nuttx.elf file into FLASH</li></ul></li></ol><p>STATUS: At this point, Atmel Studio 6.1 claims that my object files are not readable. A little more needs to be done to wring out this procedure.</p></li></ul><h1 id="loading-code-with-j-link" tabindex="-1">Loading Code with J-Link <a class="header-anchor" href="#loading-code-with-j-link" aria-label="Permalink to &quot;Loading Code with J-Link&quot;">​</a></h1><h2 id="loading-code-with-the-segger-tools-and-gdb" tabindex="-1">Loading code with the Segger tools and GDB <a class="header-anchor" href="#loading-code-with-the-segger-tools-and-gdb" aria-label="Permalink to &quot;Loading code with the Segger tools and GDB&quot;">​</a></h2><pre><code>1) Change directories into the directory where you built NuttX.
2) Start the GDB server and wait until it is ready to accept GDB
   connections.
3) Then run GDB like this:

     $ arm-none-eabi-gdb
     (gdb) target remote localhost:2331
     (gdb) mon reset
     (gdb) load nuttx
     (gdb) ... start debugging ...
</code></pre><p>Loading code using J-Link Commander ----------------------------------</p><pre><code>J-Link&gt; r
J-Link&gt; loadbin &lt;file&gt; &lt;address&gt;
J-Link&gt; setpc &lt;address of __start&gt;
J-Link&gt; ... start debugging ...
</code></pre><p>STATUS: As of this writing, I have not been successful writing to FLASH using the GDB server; the write succeeds with no complaints, but the contents of the FLASH memory remain unchanged. This may be because of issues with GPNVM1 settings and flash lock bits? In any event, the GDB server works great for debugging after writing the program to FLASH using SAM-BA.</p><h1 id="loading-code-openocd" tabindex="-1">Loading Code OpenOCD <a class="header-anchor" href="#loading-code-openocd" aria-label="Permalink to &quot;Loading Code OpenOCD&quot;">​</a></h1><p>OpenOCD scripts are available in the boards/sam4e-ek/tools directory. These scripts were used with OpenOCD 0.8.0. If you use a version after OpenOCD 0.8.0, then you should comment out the following lines in the openocd.cfg file:</p><pre><code># set CHIPNAME SAM4E16E
# source [find target/at91sam4sXX.cfg]
</code></pre><p>And uncomment this line:</p><pre><code>source [find board/atmel_sam4e_ek.cfg]
</code></pre><p>This have been reported to work under Linux, but I have not been successful using it under Windows OpenOCD 0.8.0 with libUSB. I get</p><pre><code>Open On-Chip Debugger 0.8.0 (2014-04-28-08:42)
...
Error: libusb_open() failed with LIBUSB_ERROR_NOT_SUPPORTED
Error: Cannot find jlink Interface! Please check connection and permissions.
...
</code></pre><p>This is telling me that the Segger J-Link USB driver is incompatible with libUSB. It may be necessary to replace the Segger J-Link driver with the driver from libusb-win32-device-bin on sourceforge.</p><pre><code>- Go into Control Panel/System/Device Manager and update the J-Link
  driver to point at the new jlink.inf file made with the
  libusb-win32/bin inf-wizard.  Browse to the unsigned driver
  pointed to by the inf, libusb0.dll from the libusb-win32-device-bin
  distribution to complete the installation.

- The Segger driver appeared under &quot;Universal Serial Bus Controllers&quot;
  in Device Manager (winXP) while the libusb-win32 driver appears as
  new top level Dev Mgr category &quot;LibUSB-Win32 Devices&quot;.
</code></pre><h1 id="writing-to-flash-using-sam-ba" tabindex="-1">Writing to FLASH using SAM-BA <a class="header-anchor" href="#writing-to-flash-using-sam-ba" aria-label="Permalink to &quot;Writing to FLASH using SAM-BA&quot;">​</a></h1><p>Assumed starting configuration:</p><pre><code>1. You have installed the J-Link USB driver
</code></pre><p>Using SAM-BA to write to FLASH:</p><pre><code>1. Start the SAM-BA application, selecting (1) the SAM-ICE/J-Link
   port, and (2) board = at91sam4e16-ek.
2. The SAM-BA menu should appear.
3. Select the FLASH tab and enable FLASH access
4. &quot;Send&quot; the file to flash
5. Enable &quot;Boot from Flash (GPNVM1)
6. Reset the board.
</code></pre><p>STATUS: Works great!</p><h1 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h1><p>The SAM4E-EK board has three, user-controllable LEDs labelled D2 (blue), D3 (amber), and D4 (green) on the board. Usage of these LEDs is defined in include/board.h and src/up_leds.c. They are encoded as follows:</p><pre><code>SYMBOL              Meaning                 D3*     D2      D4
------------------- ----------------------- ------- ------- -------
LED_STARTED         NuttX has been started  OFF     OFF     OFF
LED_HEAPALLOCATE    Heap has been allocated OFF     OFF     ON
LED_IRQSENABLED     Interrupts enabled      OFF     ON      OFF
LED_STACKCREATED    Idle stack created      OFF     ON      ON
LED_INIRQ           In an interrupt**       N/C     FLASH   N/C
LED_SIGNAL          In a signal handler***  N/C     N/C     FLASH
LED_ASSERTION       An assertion failed     FLASH   N/C     N/C
LED_PANIC           The system has crashed  FLASH   N/C     N/C
</code></pre><ul><li>If D2 and D4 are statically on, then NuttX probably failed to boot and these LEDs will give you some indication of where the failure was ** The normal state is D3=OFF, D4=ON and D2 faintly glowing. This faint glow is because of timer interrupts that result in the LED being illuminated on a small proportion of the time. *** D4 may also flicker normally if signals are processed.</li></ul><h1 id="serial-console" tabindex="-1">Serial Console <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;Serial Console&quot;">​</a></h1><p>By default, all of these configurations use UART0 for the NuttX serial console. UART0 corresponds to the DB-9 connector J17 labelled &quot;DBGU&quot;. This is a male connector and will require a female-to-female, NUL modem cable to connect to a PC.</p><p>An alternate is USART1 which connects to the other DB-9 connector labelled &quot;USART1&quot;. USART1 is not enabled by default unless specifically noted otherwise in the configuration description. A NUL modem cable must be used with the port as well.</p><p>NOTE: To avoid any electrical conflict, the RS232 and RS485 transceiver are isolated from the receiving line PA21.</p><ul><li>Chose RS485 channel: Close 1-2 pins on JP11 and set PA23 to high level</li><li>Chose RS232 channel: Close 2-3 pins on JP11 and set PA23 to low level</li></ul><p>By default serial console is configured for 115000, 8-bit, 1 stop bit, and no parity.</p><h1 id="networking-support" tabindex="-1">Networking Support <a class="header-anchor" href="#networking-support" aria-label="Permalink to &quot;Networking Support&quot;">​</a></h1><p>Networking support via the can be added to NSH by selecting the following configuration options.</p><p>Selecting the EMAC peripheral -----------------------------</p><p>System Type -&gt; SAM34 Peripheral Support CONFIG_SAM34_EMAC=y : Enable the EMAC peripheral</p><p>System Type -&gt; EMAC device driver options CONFIG_SAM34_EMAC_NRXBUFFERS=16 : Set aside some RS and TX buffers CONFIG_SAM34_EMAC_NTXBUFFERS=4 CONFIG_SAM34_EMAC_PHYADDR=1 : KSZ8051 PHY is at address 1 CONFIG_SAM34_EMAC_AUTONEG=y : Use autonegotiation CONFIG_SAM34_EMAC_MII=y : Only the MII interface is supported CONFIG_SAM34_EMAC_PHYSR=30 : Address of PHY status register on KSZ8051 CONFIG_SAM34_EMAC_PHYSR_ALTCONFIG=y : Needed for KSZ8051 CONFIG_SAM34_EMAC_PHYSR_ALTMODE=0x7 : &quot; &quot; &quot; &quot; &quot; &quot; CONFIG_SAM34_EMAC_PHYSR_10HD=0x1 : &quot; &quot; &quot; &quot; &quot; &quot; CONFIG_SAM34_EMAC_PHYSR_100HD=0x2 : &quot; &quot; &quot; &quot; &quot; &quot; CONFIG_SAM34_EMAC_PHYSR_10FD=0x5 : &quot; &quot; &quot; &quot; &quot; &quot; CONFIG_SAM34_EMAC_PHYSR_100FD=0x6 : &quot; &quot; &quot; &quot; &quot; &quot;</p><p>PHY selection. Later in the configuration steps, you will need to select the KSZ8051 PHY for EMAC (See below)</p><p>Networking Support CONFIG_NET=y : Enable Neworking CONFIG_NET_SOCKOPTS=y : Enable socket operations CONFIG_NET_ETH_PKTSIZE=562 : Maximum packet size 1518 is more standard CONFIG_NET_TCP=y : Enable TCP/IP networking CONFIG_NET_TCPBACKLOG=y : Support TCP/IP backlog CONFIG_NET_UDP=y : Enable UDP networking CONFIG_NET_BROADCAST=y : Needed for DNS name resolution CONFIG_NET_ICMP=y : Enable ICMP networking CONFIG_NET_ICMP_SOCKET=y : Needed for NSH ping command : Defaults should be okay for other options Device drivers -&gt; Network Device/PHY Support CONFIG_NETDEVICES=y : Enabled PHY selection CONFIG_ETH0_PHY_KSZ8051=y : Select the KSZ8051 PHY (for EMAC)</p><p>Application Configuration -&gt; Network Utilities CONFIG_NETDB_DNSCLIENT=y : Enable host address resolution CONFIG_NETUTILS_TELNETD=y : Enable the Telnet daemon CONFIG_NETUTILS_TFTPC=y : Enable TFTP data file transfers for get and put commands CONFIG_NETUTILS_NETLIB=y : Network library support is needed CONFIG_NETUTILS_WEBCLIENT=y : Needed for wget support : Defaults should be okay for other options Application Configuration -&gt; NSH Library CONFIG_NSH_TELNET=y : Enable NSH session via Telnet CONFIG_NSH_IPADDR=0x0a000002 : Select a fixed IP address CONFIG_NSH_DRIPADDR=0x0a000001 : IP address of gateway/host PC CONFIG_NSH_NETMASK=0xffffff00 : Netmask CONFIG_NSH_NOMAC=y : Need to make up a bogus MAC address : Defaults should be okay for other options</p><p>You can also enable enable the DHCPC client for networks that use dynamically assigned address:</p><p>Application Configuration -&gt; Network Utilities CONFIG_NETUTILS_DHCPC=y : Enables the DHCP client</p><p>Networking Support CONFIG_NET_UDP=y : Depends on broadcast UDP</p><p>Application Configuration -&gt; NSH Library CONFIG_NET_BROADCAST=y CONFIG_NSH_DHCPC=y : Tells NSH to use DHCPC, not : the fixed addresses</p><p>Using the network with NSH --------------------------</p><p>So what can you do with this networking support? First you see that NSH has several new network related commands:</p><pre><code>ifconfig, ifdown, ifup:  Commands to help manage your network
get and put:             TFTP file transfers
wget:                    HTML file transfers
ping:                    Check for access to peers on the network
Telnet console:          You can access the NSH remotely via telnet.
</code></pre><p>You can also enable other add on features like full FTP or a Web Server or XML RPC and others. There are also other features that you can enable like DHCP client (or server) or network name resolution.</p><p>By default, the IP address of the SAM4E-EK will be 10.0.0.2 and it will assume that your host is the gateway and has the IP address 10.0.0.1.</p><pre><code>nsh&gt; ifconfig
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
</code></pre><p>NOTE: In this configuration is is normal to have packet loss &gt; 0% the first time you ping due to the default handling of the ARP table.</p><p>On the host side, you should also be able to ping the SAM4E-EK:</p><pre><code>$ ping 10.0.0.2
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
</code></pre><p>NOTE: If you enable this feature, you experience a delay on booting. That is because the start-up logic waits for the network connection to be established before starting NuttX. In a real application, you would probably want to do the network bringup on a separate thread so that access to the NSH prompt is not delayed.</p><p>This delay will be especially long if the board is not connected to a network because additional time will be required to fail with timeout errors.</p><p>This delay will be especially long if the board is not connected to a network. On the order of a minute! You will probably think that NuttX has crashed! And then, when it finally does come up, the network will not be available.</p><h2 id="network-initialization-thread" tabindex="-1">Network Initialization Thread <a class="header-anchor" href="#network-initialization-thread" aria-label="Permalink to &quot;Network Initialization Thread&quot;">​</a></h2><p>There is a configuration option enabled by CONFIG_NSH_NETINIT_THREAD that will do the NSH network bring-up asynchronously in parallel on a separate thread. This eliminates the (visible) networking delay altogether. This current implementation, however, has some limitations:</p><pre><code>- If no network is connected, the network bring-up will fail and
  the network initialization thread will simply exit.  There are no
  retries and no mechanism to know if the network initialization was
  successful (it could perform a network Ioctl to see if the link is
  up and it now, keep trying, but it does not do that now).

- Furthermore, there is currently no support for detecting loss of
  network connection and recovery of the connection (similarly, this
  thread could poll periodically for network status, but does not).
</code></pre><p>Both of these shortcomings could be eliminated by enabling the network monitor. See the SAMA5 configurations for a description of what it would take to incorporate the network monitor feature.</p><h1 id="at25-serial-flash" tabindex="-1">AT25 Serial FLASH <a class="header-anchor" href="#at25-serial-flash" aria-label="Permalink to &quot;AT25 Serial FLASH&quot;">​</a></h1><p>Connections -----------</p><p>Both the SAM4E-EK include an Atmel AT25DF321A, 32-megabit, 2.7-volt SPI serial flash. The SPI connection is as follows:</p><pre><code>------ ------- ---------------
SAM4E  AT25    SAM4E
GPIO   PIN     FUNCTION
------ ------- ---------------
PA13   SI      MOSI
PA12   SO      MIS0
PA14   SCK     SPCK
PA5    /CS     NPCS3 (pulled high externally)
------ ------- ---------------
</code></pre><p>Configuration -------------</p><p>Support for the serial FLASH can be enabled in these configurations. These are the relevant configuration settings. These settings (1) Enable SPI0, (2) Enable DMAC0 to support DMA transfers on SPI for best performance, (3) Enable the AT25 Serial FLASH, and (3) Set up NuttX to configure the file system on the AT25 FLASH:</p><pre><code>System Type -&gt; ATSAM3/4 Peripheral Support
  CONFIG_SAM34_SPI0=y                   : Enable SPI0
  CONFIG_SAM34_DMAC0=y                  : Enable DMA controller 0

System Type -&gt; SPI device driver options
  CONFIG_SAM34_SPI_DMA=y                : Use DMA for SPI transfers
  CONFIG_SAM34_SPI_DMATHRESHOLD=4       : Don&#39;t DMA for small transfers

Device Drivers -&gt; SPI Driver Support
  CONFIG_SPI=y                          : Enable SPI support
  CONFIG_SPI_EXCHANGE=y                 : Support the exchange method

Device Drivers -&gt; Memory Technology Device (MTD) Support
  CONFIG_MTD=y                          : Enable MTD support
  CONFIG_MTD_AT25=y                     : Enable the AT25 driver
  CONFIG_AT25_SPIMODE=0                 : Use SPI mode 0
  CONFIG_AT25_SPIFREQUENCY=20000000     : Use SPI frequency 12MHz

The AT25 is capable of operation at 20MHz.  However, if you experience
any issues with the AT25, then lower this frequency may give more
predictable performance.

File Systems -&gt; FAT
  CONFIG_FS_FAT=y                       : Enable and configure FAT
  CONFIG_FAT_LCNAMES=y                  : Upper/lower case names
  CONFIG_FAT_LFN=y                      : Long file name support (See NOTE)
  CONFIG_FAT_MAXFNAME=32                : Limit filename sizes to 32 bytes

NOTE: Use care if you plan to use FAT long file name feature in a product;
There are issues with certain Microsoft patents on the long file name
technology.

Application Configuration -&gt; NSH Library
  CONFIG_NSH_ARCHINIT=y                 : NSH board-initialization

Board Selection
  CONFIG_SAM4EEK_AT25_BLOCKMOUNT=y       : Mounts AT25 for NSH
  CONFIG_SAM4EEK_AT25_FTL=y             : Create block driver for FAT
</code></pre><p>You can then format the AT25 FLASH for a FAT file system and mount the file system at /mnt/at25 using these NSH commands:</p><pre><code>nsh&gt; mkfatfs /dev/mtdblock0
nsh&gt; mount -t vfat /dev/mtdblock0 /mnt/at25
</code></pre><p>Then you an use the FLASH as a normal FAT file system:</p><pre><code>nsh&gt; echo &quot;This is a test&quot; &gt;/mnt/at25/atest.txt
nsh&gt; ls -l /mnt/at25
/mnt/at25:
 -rw-rw-rw-      16 atest.txt
nsh&gt; cat /mnt/at25/atest.txt
This is a test
</code></pre><h1 id="usb-full-speed-device" tabindex="-1">USB Full-Speed Device <a class="header-anchor" href="#usb-full-speed-device" aria-label="Permalink to &quot;USB Full-Speed Device&quot;">​</a></h1><h2 id="basic-usb-full-speed-device-configuration" tabindex="-1">Basic USB Full-Speed Device Configuration <a class="header-anchor" href="#basic-usb-full-speed-device-configuration" aria-label="Permalink to &quot;Basic USB Full-Speed Device Configuration&quot;">​</a></h2><p>Support the USB full-speed device (UDP) driver can be enabled with these NuttX configuration settings.</p><pre><code>Device Drivers -&gt; USB Device Driver Support
  CONFIG_USBDEV=y                       : Enable USB device support
  CONFIG_USBDEV_DUALSPEED=n             : Device does not support High-Speed
  CONFIG_USBDEV_DMA=n                   : Device does not use DMA

System Type -&gt; ATSAM3/4 Peripheral Support
  CONFIG_SAM34_UDP=y                    : Enable UDP Full Speed USB device

Application Configuration -&gt; NSH Library
  CONFIG_NSH_ARCHINIT=y                 : NSH board-initialization
</code></pre><p>Mass Storage Class ------------------</p><p>The Mass Storage Class (MSC) class driver can be selected for use with UDP. Note: The following assumes that the internal AT25 Serial FLASH is configured to support a FAT file system through an FTL layer as described about under &quot;AT25 Serial FLASH&quot;.</p><pre><code>Device Drivers -&gt; USB Device Driver Support
  CONFIG_USBMSC=y                       : Enable the USB MSC class driver
  CONFIG_USBMSC_EPBULKOUT=1             : Use EP1 for the BULK OUT endpoint
  CONFIG_USBMSC_EPBULKIN=2              : Use EP2 for the BULK IN endpoint
  CONFIG_USBMSC_BULKINREQLEN=64         : (Defaults for full speed)
  CONFIG_USBMSC_BULKOUTREQLEN=64        :
                                        : Defaults for other settings as well?
Board Selection
  CONFIG_SAM4EEK_AT25_BLOCKDEVICE=y     : Export AT25 serial FLASH device
  CONFIG_SAM4EEK_HSMCI_BLOCKDEVICE=n    : Don&#39;t export HSMCI SD card
</code></pre><p>Note: If properly configured, you could export the HSMCI SD card instead of the internal AT25 Serial FLASH.</p><p>The following setting enables an add-on that can can be used to control the USB MSC device. It will add two new NSH commands:</p><pre><code>a. msconn will connect the USB serial device and export the AT25
   to the host, and
b. msdis which will disconnect the USB serial device.

Application Configuration -&gt; System Add-Ons:
  CONFIG_SYSTEM_USBMSC=y                : Enable the USBMSC add-on
  CONFIG_SYSTEM_USBMSC_NLUNS=1          : One LUN
  CONFIG_SYSTEM_USBMSC_DEVMINOR1=0      : Minor device zero
  CONFIG_SYSTEM_USBMSC_DEVPATH1=&quot;/dev/mtdblock0&quot;
                                        : Use a single, LUN:  The AT25
                                        : block driver.
NOTES:

a. To prevent file system corruption, make sure that the AT25 is un-
   mounted *before* exporting the mass storage device to the host:

     nsh&gt; umount /mnt/at25
     nsh&gt; mscon

   The AT25 can be re-mounted after the mass storage class is disconnected:

    nsh&gt; msdis
    nsh&gt; mount -t vfat /dev/mtdblock0 /mnt/at25

b. If you change the value CONFIG_SYSTEM_USBMSC_DEVPATH1, then you
   can export other file systems:

    &quot;/dev/mmcsd0&quot; would export the HSMCI SD slot (not currently available,
    see the &quot;HSMCI&quot; section).

    &quot;/dev/ram0&quot; could even be used to export a RAM disk.  But you would
     first have to use mkrd to create the RAM disk and mkfatfs to put
     a FAT file system on it.
</code></pre><p>STATUS:</p><p>2014-3-25: Marginally functional. Very slow to come up. USB analyzer shows several resets before the host decides that it is happy with the device. There are no obvious errors in the USB data capture. Testing is insufficient. This needs to be revisited.</p><pre><code>          Last tested at 96MHz with the CMCC disabled.
</code></pre><p>CDC/ACM Serial Device Class ---------------------------</p><p>This will select the CDC/ACM serial device. Defaults for the other options should be okay.</p><pre><code>Device Drivers -&gt; USB Device Driver Support
  CONFIG_CDCACM=y                       : Enable the CDC/ACM device
  CONFIG_CDCACM_EPINTIN=1               : Select endpoint numbers
  CONFIG_CDCACM_EPBULKOUT=2
  CONFIG_CDCACM_EPBULKIN=3
</code></pre><p>The following setting enables an example that can can be used to control the CDC/ACM device. It will add two new NSH commands:</p><pre><code>a. sercon will connect the USB serial device (creating /dev/ttyACM0), and
b. serdis which will disconnect the USB serial device (destroying
    /dev/ttyACM0).

Application Configuration -&gt; Examples:
  CONFIG_SYSTEM_CDCACM=y                : Enable an CDC/ACM example
  CONFIG_SYSTEM_CDCACM_DEVMINOR=0       : Use /dev/ttyUSB0
</code></pre><p>NOTES:</p><ol><li><p>You cannot have both the CDC/ACM and the MSC class drivers enabled simultaneously in the way described here. If you want to use both, then you will need to consider a USB &quot;composite&quot; devices that support supports both interfaces. There are no instructures here for setting up the USB composite device, but there are other examples in the NuttX board support directories that can be used for reference.</p></li><li><p>Linux supports the CDC/ACM driver out of the box. Windows, on the other than requires that you first install a serial driver (a .inf file).</p></li><li><p>There is hand-shaking to pace incoming serial data. As a result, you may experience data loss due to RX overrun errors. The overrun errors occur when more data is received than can be buffered in memory on the target.</p><p>At present, the only workaround is to increase the amount of buffering in the target. That allow the target to accept short bursts of larger volumes of data (but would still fail on sustained, high speed incoming data. The following configuration options can be changed to increase the buffering.</p><ol><li><p>RX buffer size. All incoming data is buffered by the serial driver until it can be read by the application. The default size of this RX buffer is only 256 but can be increased as you see fit:</p><p>CONFIG_CDCACM_RXBUFSIZE=256 : Default RX buffer size is only 256 bytes</p></li><li><p>Upstream from the RX buffers are USB read request buffers. Each buffer is the maximum size of one USB packet (64 byte) and that cannot really be changed. But if you want to increase this upstream buffering capability, you can increase the number of available read requests. The default is four, providing an additional buffering capability of of 4*64=256 bytes.</p><p>Each read request receives data from USB, copies the data into the serial RX buffer, and then is available to receive more data. This recycling of read requests stalls as soon as the serial RX buffer is full. Data loss occurs when there are no available read requests to accept the next packet from the host. So increasing the number of read requests can also help to minimize RX overrun:</p><p>CONFIG_CDCACM_NRDREQS=4 : Default is only 4 read requests</p></li></ol></li></ol><p>STATUS:</p><p>2013-2-23: Checks out OK. See discussion of the usbnsh configuration below.</p><p>Debugging USB Device --------------------</p><p>There is normal console debug output available that can be enabled with CONFIG_DEBUG_FEATURES + CONFIG_DEBUG_USB. However, USB device operation is very time critical and enabling this debug output WILL interfere with the operation of the UDP. USB device tracing is a less invasive way to get debug information: If tracing is enabled, the USB device will save encoded trace output in in-memory buffer; if the USB monitor is also enabled, that trace buffer will be periodically emptied and dumped to the system logging device (the serial console in this configuration):</p><pre><code>Device Drivers -&gt; &quot;USB Device Driver Support:
  CONFIG_USBDEV_TRACE=y                   : Enable USB trace feature
  CONFIG_USBDEV_TRACE_NRECORDS=256        : Buffer 256 records in memory
  CONFIG_USBDEV_TRACE_STRINGS=y           : (optional)

If you get data loss in the trace buffer, then you may want to increase the
CONFIG_USBDEV_TRACE_NRECORDS.  I have used buffers up to 4096 records to
avoid data loss.

Application Configuration -&gt; NSH LIbrary:
  CONFIG_NSH_USBDEV_TRACE=n               : No builtin tracing from NSH
  CONFIG_NSH_ARCHINIT=y                   : Automatically start the USB monitor

Application Configuration -&gt; System NSH Add-Ons:
  CONFIG_USBMONITOR=y              : Enable the USB monitor daemon
  CONFIG_USBMONITOR_STACKSIZE=2048 : USB monitor daemon stack size
  CONFIG_USBMONITOR_PRIORITY=50    : USB monitor daemon priority
  CONFIG_USBMONITOR_INTERVAL=1     : Dump trace data every second
  CONFIG_USBMONITOR_TRACEINIT=y    : Enable TRACE output
  CONFIG_USBMONITOR_TRACECLASS=y
  CONFIG_USBMONITOR_TRACETRANSFERS=y
  CONFIG_USBMONITOR_TRACECONTROLLER=y
  CONFIG_USBMONITOR_TRACEINTERRUPTS=y
</code></pre><p>NOTE: If USB debug output is also enabled, both outputs will appear on the serial console. However, the debug output will be asynchronous with the trace output and, hence, difficult to interpret.</p><h1 id="hsmci" tabindex="-1">HSMCI <a class="header-anchor" href="#hsmci" aria-label="Permalink to &quot;HSMCI&quot;">​</a></h1><p>Enabling HSMCI support. The SAM3U-KE provides a an SD memory card slot. Support for the SD slot can be enabled with the following settings:</p><pre><code>System Type-&gt;ATSAM3/4 Peripheral Support
  CONFIG_SAM34_HSMCI=y                    : Enable HSMCI support
  CONFIG_SAM34_DMAC0=y                    : DMAC support is needed by HSMCI

System Type
  CONFIG_SAM34_GPIO_IRQ=y                 : PIO interrupts needed
  CONFIG_SAM34_GPIOA_IRQ=y                : Card detect pin is on PIOA

Device Drivers -&gt; MMC/SD Driver Support
  CONFIG_MMCSD=y                          : Enable MMC/SD support
  CONFIG_MMCSD_NSLOTS=1                   : One slot per driver instance
  CONFIG_MMCSD_HAVE_CARDDETECT=y          : Supports card-detect PIOs
  CONFIG_MMCSD_SDIO=y                     : SDIO-based MMC/SD support
  CONFIG_MMCSD_MULTIBLOCK_LIMIT=1         : Probably works but is untested

  CONFIG_SDIO_DMA=y                       : Use SDIO DMA
  CONFIG_SDIO_BLOCKSETUP=y                : Needs to know block sizes

Library Routines
  CONFIG_SCHED_WORKQUEUE=y                : Driver needs work queue support
                                          : Defaults for other settings okay

Application Configuration -&gt; NSH Library
  CONFIG_NSH_ARCHINIT=y                   : NSH board-initialization
  CONFIG_NSH_MMCSDSLOTNO=0                : Only one slot, slot 0
</code></pre><p>After an SD card is successfully initialized, the block device /dev/mmcsd0 will be available. To mount the SD card, use the following NSH command:</p><pre><code>nsh&gt; mount -t vfat /dev/mmcsd0 /mnt/sdcard
</code></pre><p>The SD card contents will then be available under /mnt/sdcard.</p><p>NOTES:</p><ol><li><p>DMA is not currently functional and without DMA, there may not be reliable data transfers at high speeds due to data overrun problems. The current HSMCI driver supports DMA via the DMAC. However, the data sheet only discusses PDC-based HSMCI DMA (although there is a DMA channel interface definition for HSMCI).</p><p>Bottom line: Untested and probably not usable on the SAM4E-EK in its current form.</p></li></ol><h1 id="touchscreen" tabindex="-1">Touchscreen <a class="header-anchor" href="#touchscreen" aria-label="Permalink to &quot;Touchscreen&quot;">​</a></h1><p>The NSH configuration can be used to verify the ADS7843E touchscreen on the SAM4E-EK LCD. With these modifications, you can include the touchscreen test program at apps/examples/touchscreen as an NSH built-in application. You can enable the touchscreen and test by modifying the default configuration in the following ways:</p><pre><code>Device Drivers
  CONFIG_SPI=y                          : Enable SPI support
  CONFIG_SPI_EXCHANGE=y                 : The exchange() method is supported

  CONFIG_INPUT=y                        : Enable support for input devices
  CONFIG_INPUT_ADS7843E=y               : Enable support for the ADS7843E
  CONFIG_ADS7843E_SPIDEV=0              : Use SPI CS 0 for communication
  CONFIG_ADS7843E_SPIMODE=0             : Use SPI mode 0
  CONFIG_ADS7843E_FREQUENCY=1000000     : SPI BAUD 1MHz
  CONFIG_ADS7843E_SWAPXY=y              : If landscape orientation
  CONFIG_ADS7843E_THRESHX=51            : These will probably need to be tuned
  CONFIG_ADS7843E_THRESHY=39

System Type -&gt; Peripherals:
  CONFIG_SAM34_SPI0=y                   : Enable support for SPI

System Type:
  CONFIG_SAM34_GPIO_IRQ=y               : GPIO interrupt support
  CONFIG_SAM34_GPIOA_IRQ=y              : Enable GPIO interrupts from port A

Library Support:
  CONFIG_SCHED_WORKQUEUE=y              : Work queue support required

Application Configuration:
  CONFIG_EXAMPLES_TOUCHSCREEN=y         : Enable the touchscreen built-in test

Defaults should be okay for related touchscreen settings.  Touchscreen
debug output on UART0 can be enabled with:

Build Setup:
  CONFIG_DEBUG_FEATURES=y               : Enable debug features
  CONFIG_DEBUG_INFO=y                   : Enable verbose debug output
  CONFIG_DEBUG_INPUT=y                  : Enable debug output from input devices

STATUS: Verified 2014-05-14
</code></pre><h1 id="ili9325-41-based-lcd" tabindex="-1">ILI9325/41-Based LCD <a class="header-anchor" href="#ili9325-41-based-lcd" aria-label="Permalink to &quot;ILI9325/41-Based LCD&quot;">​</a></h1><p>The SAM4E-EK carries a TFT transmissive LCD module with touch panel, FTM280C34D. Its integrated driver IC is either a ILI9325 ILI9342 (the original schematics said ILI9325, but I learned the hard way that I had an ILI9341-based LCD). The LCD display area is 2.8 inches diagonally measured, with a native resolution of 240 x 320 dots.</p><p>Connectivity ------------</p><pre><code>The SAM4E16 communicates with the LCD through PIOC where an 8-bit
parallel &quot;8080-like&quot; protocol data bus has to be implemented in
software.

---- ----- --------- --------------------------------
PIN  PIO   SIGNAL    NOTES
---- ----- --------- --------------------------------
  1                  VDD
  2  PC7   DB17
  3  PC6   DB16
  4  PC5   DB15
  5  PC4   DB14
  6  PC3   DB13
  7  PC2   DB12
  8  PC1   DB11
  9  PC0   DB10
 10        DB9       Pulled low
 11        DB8       Pulled low
 12        DB7       Pulled low
 13        DB6       Pulled low
 14        DB5       Pulled low
 15        DB4       Pulled low
 16        DB3       Pulled low
 17        DB2       Pulled low
 18        DB1       Pulled low
 19        DB0       Pulled low
---- ----- --------- --------------------------------
 20                  VDD
 21  PC11  RD
 22  PC8   WR
 23  PC19  RS
 24  PD18  CS        Via J8, pulled high.
 25        RESET     Connects to NSRST
 26        IM0       Pulled high
 27        IM1       Grounded
 28        GND
---- ----- --------- --------------------------------
 29 [PC13] LED-A     Backlight controls:  PC13 enables
 30 [PC13] LEDK1       AAT3155 charge pump that drives
 31 [PC13] LEDK2       the backlight LEDs
 32 [PC13] LEDK3
 33 [PC13] LEDK4
 34 [PC13] LEDK1
---- ----- --------- --------------------------------
 35        Y+        These go to the ADS7843
 36        Y-          touchscreen controller.
 37        X+
 38        X-
 39        NC
---- ----- --------- --------------------------------
</code></pre><p>Jumpers -------</p><p>Make sure the JP8 is closed. This connects PD18 as the LCD CS.</p><p>Backlight ---------</p><pre><code>LCD backlight is made of 4 white chip LEDs in parallel, driven by an
AAT3155 charge pump, MN4. The AAT3155 is controlled by the SAM3U4E
through a single line Simple Serial Control (S2Cwire) interface, which
permits to enable, disable, and set the LED drive current (LED
brightness control) from a 32-level logarithmic scale. Four resistors
R93/R94/R95/R96 are implemented for optional current limitation.
</code></pre><p>Configuration -------------</p><pre><code>This is the basic configuration that enables the ILI9341-based LCD.
Of course additional settings would be necessary to enable the graphic
capabilities to do anything with the LCD.

   System Type -&gt; AT91SAM3/4 Configuration Options
     CONFIG_SAM34_SMC=y                : SMC support

   Device Drivers -&gt; LCD Driver Support
     CONFIG_LCD=y                      : Enable LCD support
     CONFIG_LCD_MAXCONTRAST=1          : Value should not matter
     CONFIG_LCD_MAXPOWER=64            : Must be &gt; 16
     CONFIG_LCD_LANDSCAPE=y            : Landscape orientation

   Board Selection
     CONFIG_SAM4EEK_LCD_ILI9341=y      : For the ILI9341-based LCD
     CONFIG_SAM4EEK_LCD_RGB565=y       : Color resolution
     CONFIG_SAM4EEK_LCD_BGCOLOR=0x00   : Initial background color
</code></pre><p>STATUS:</p><pre><code>2014-8-20:  Updated.  The ILI9341 LCD has some basic functionality.
Certainly it can transfer and display data fine.  But there are some
issues with the geometry of data that appears on the LCD..

The LCD backlight is functional.
</code></pre><h1 id="sam4e-ek-specific-configuration-options" tabindex="-1">SAM4E-EK-specific Configuration Options <a class="header-anchor" href="#sam4e-ek-specific-configuration-options" aria-label="Permalink to &quot;SAM4E-EK-specific Configuration Options&quot;">​</a></h1><pre><code>CONFIG_ARCH - Identifies the arch/ subdirectory.  This should
   be set to:

   CONFIG_ARCH=arm

CONFIG_ARCH_family - For use in C code:

   CONFIG_ARCH_ARM=y

CONFIG_ARCH_architecture - For use in C code:

   CONFIG_ARCH_CORTEXM3=y

CONFIG_ARCH_CHIP - Identifies the arch/*/chip subdirectory

   CONFIG_ARCH_CHIP=&quot;sam34&quot;

CONFIG_ARCH_CHIP_name - For use in C code to identify the exact
   chip:

   CONFIG_ARCH_CHIP_SAM34
   CONFIG_ARCH_CHIP_SAM3U
   CONFIG_ARCH_CHIP_ATSAM3U4

CONFIG_ARCH_BOARD - Identifies the boards/ subdirectory and
   hence, the board that supports the particular chip or SoC.

   CONFIG_ARCH_BOARD=sam4e-ek (for the SAM4E-EK development board)

CONFIG_ARCH_BOARD_name - For use in C code

   CONFIG_ARCH_BOARD_SAM4EEK=y

CONFIG_ARCH_LOOPSPERMSEC - Must be calibrated for correct operation
   of delay loops

CONFIG_ENDIAN_BIG - define if big endian (default is little
   endian)

CONFIG_RAM_SIZE - Describes the installed DRAM (SRAM in this case):

   CONFIG_RAM_SIZE=0x00020000 (128Kb)

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
</code></pre><p>Individual subsystems can be enabled:</p><pre><code>CONFIG_SAM34_SPI0          - Serial Peripheral Interface 0 (SPI0)
CONFIG_SAM34_SPI1          - Serial Peripheral Interface 1 (SPI1)
CONFIG_SAM34_SSC           - Synchronous Serial Controller (SSC)
CONFIG_SAM34_TC0           - Timer/Counter 0 (TC0)
CONFIG_SAM34_TC1           - Timer/Counter 1 (TC1)
CONFIG_SAM34_TC2           - Timer/Counter 2 (TC2)
CONFIG_SAM34_TC3           - Timer/Counter 3 (TC3)
CONFIG_SAM34_TC4           - Timer/Counter 4 (TC4)
CONFIG_SAM34_TC5           - Timer/Counter 5 (TC5)
CONFIG_SAM34_TC6           - Timer/Counter 6 (TC6)
CONFIG_SAM34_TC7           - Timer/Counter 7 (TC6)
CONFIG_SAM34_TC8           - Timer/Counter 6 (TC8)
CONFIG_SAM34_PWM           - Pulse Width Modulation (PWM) Controller
CONFIG_SAM34_TWIM0         - Two-wire Master Interface 0 (TWIM0)
CONFIG_SAM34_TWIS0         - Two-wire Slave Interface 0 (TWIS0)
CONFIG_SAM34_TWIM1B        - Two-wire Master Interface 1 (TWIM1)
CONFIG_SAM34_TWIS1         - Two-wire Slave Interface 1 (TWIS1)
CONFIG_SAM34_UART0         - UART 0
CONFIG_SAM34_UART1         - UART 1
CONFIG_SAM34_USART0        - USART 0
CONFIG_SAM34_USART1        - USART 1
CONFIG_SAM34_USART2        - USART 2
CONFIG_SAM34_USART3        - USART 3
CONFIG_SAM34_AFEC0         - Analog Front End 0
CONFIG_SAM34_AFEC1         - Analog Front End 1
CONFIG_SAM34_DACC          - Digital-to-Analog Converter
CONFIG_SAM34_ACC           - Analog Comparator
CONFIG_SAM34_EMAC          - Ethernet MAC
CONFIG_SAM34_CAN0          - CAN 0
CONFIG_SAM34_CAN1          - CAN 1
CONFIG_SAM34_SMC           - Static Memory Controller
CONFIG_SAM34_NAND          - NAND support
CONFIG_SAM34_PDCA          - Peripheral DMA controller
CONFIG_SAM34_DMAC0         - DMA controller
CONFIG_SAM34_UDP           - USB 2.0 Full-Speed device
CONFIG_SAM34_CHIPID        - Chip ID
CONFIG_SAM34_RTC           - Real Time Clock
CONFIG_SAM34_RTT           - Real Time Timer
CONFIG_SAM34_WDT           - Watchdog Timer
CONFIG_SAM34_EIC           - Interrupt controller
CONFIG_SAM34_HSMCI         - High Speed Multimedia Card Interface
</code></pre><p>Some subsystems can be configured to operate in different ways. The drivers need to know how to configure the subsystem.</p><pre><code>CONFIG_SAM34_GPIOA_IRQ
CONFIG_SAM34_GPIOB_IRQ
CONFIG_SAM34_GPIOC_IRQ
CONFIG_SAM34_GPIOD_IRQ
CONFIG_SAM34_GPIOE_IRQ
CONFIG_SAM34_GPIOF_IRQ
CONFIG_SAM34_GPIOG_IRQ
CONFIG_SAM34_GPIOH_IRQ
CONFIG_SAM34_GPIOJ_IRQ
CONFIG_SAM34_GPIOK_IRQ
CONFIG_SAM34_GPIOL_IRQ
CONFIG_SAM34_GPIOM_IRQ
CONFIG_SAM34_GPION_IRQ
CONFIG_SAM34_GPIOP_IRQ
CONFIG_SAM34_GPIOQ_IRQ

CONFIG_USART0_SERIALDRIVER
CONFIG_USART1_SERIALDRIVER
CONFIG_USART2_SERIALDRIVER
CONFIG_USART3_SERIALDRIVER
</code></pre><p>SAM3U specific device driver settings</p><pre><code>CONFIG_U[S]ARTn_SERIAL_CONSOLE - selects the USARTn (n=0,1,2,3) or UART
       m (m=4,5) for the console and ttys0 (default is the USART1).
CONFIG_U[S]ARTn_RXBUFSIZE - Characters are buffered as received.
   This specific the size of the receive buffer
CONFIG_U[S]ARTn_TXBUFSIZE - Characters are buffered before
   being sent.  This specific the size of the transmit buffer
CONFIG_U[S]ARTn_BAUD - The configure BAUD of the UART.  Must be
CONFIG_U[S]ARTn_BITS - The number of bits.  Must be either 7 or 8.
CONFIG_U[S]ARTn_PARTIY - 0=no parity, 1=odd parity, 2=even parity
CONFIG_U[S]ARTn_2STOP - Two stop bits
</code></pre><p>LCD Options. Other than the standard LCD configuration options (see boards/README.txt), the SAM4E-EK driver also supports:</p><pre><code>CONFIG_LCD_LANDSCAPE - Define for 320x240 display &quot;landscape&quot;
  support. Default is this 320x240 &quot;landscape&quot; orientation
CONFIG_LCD_RLANDSCAPE - Define for 320x240 display &quot;reverse
  landscape&quot; support.
CONFIG_LCD_PORTRAIT - Define for 240x320 display &quot;portrait&quot;
  orientation support.
CONFIG_LCD_RPORTRAIT - Define for 240x320 display &quot;reverse
  portrait&quot; orientation support.
</code></pre><h1 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h1><h2 id="information-common-to-all-configurations" tabindex="-1">Information Common to All Configurations <a class="header-anchor" href="#information-common-to-all-configurations" aria-label="Permalink to &quot;Information Common to All Configurations&quot;">​</a></h2><p>Each SAM4E-EK configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh sam4e-ek:&lt;subdir&gt;
</code></pre><p>Before building, make sure the PATH environment variable includes the correct path to the directory than holds your toolchain binaries.</p><p>And then build NuttX by simply typing the following. At the conclusion of the make, the nuttx binary will reside in an ELF file called, simply, nuttx.</p><pre><code>make
</code></pre><p>The <code>&lt;subdir&gt;</code> that is provided above as an argument to the tools/configure.sh must be is one of the following.</p><p>NOTES:</p><ol><li>These configurations use the mconf-based configuration tool. To change any of these configurations using that tool, you should:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- --&gt;</span></span></code></pre></div><pre><code>a. Build and install the kconfig-mconf tool.  See nuttx/README.txt
   see additional README.txt files in the NuttX tools repository.

b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the
   reconfiguration process.
</code></pre><ol start="2"><li><p>Unless stated otherwise, all configurations generate console output on UART0 (J3).</p></li><li><p>All of these configurations are set up to build under Linux using the EABI buildroot toolchain (unless stated otherwise in the description of the configuration). That build selection can easily be reconfigured using &#39;make menuconfig&#39;. Here are the relevant current settings:</p><p>Build Setup: CONFIG_HOST_LINUX=y : Linux or other pure POSIX invironment</p><p>System Type -&gt; Toolchain: CONFIG_ARM_TOOLCHAIN_BUILDROOT=y : Buildroot toolchain CONFIG_ARM_TOOLCHAIN_BUILDROOT_OABI=n : EABI (Not OABI</p><p>If you want to use the Atmel GCC toolchain, for example, here are the steps to do so:</p><p>Build Setup: CONFIG_HOST_WINDOWS=y : Windows CONFIG_HOST_CYGWIN=y : Using Cygwin or other POSIX environment</p><p>System Type -&gt; Toolchain: CONFIG_ARM_TOOLCHAIN_GNU_EABI=y : General GCC EABI toolchain under windows</p><p>Library Routines -&gt; CONFIG_ARCH_SIZET_LONG=n : size_t is an unsigned int, not long</p><p>This re-configuration should be done before making NuttX or else the subsequent &#39;make&#39; will fail. If you have already attempted building NuttX then you will have to 1) &#39;make distclean&#39; to remove the old configuration, 2) &#39;tools/configure.sh sam4e-ek/ksnh&#39; to start with a fresh configuration, and 3) perform the configuration changes above.</p><p>Also, make sure that your PATH variable has the new path to your Atmel tools. Try &#39;which arm-none-eabi-gcc&#39; to make sure that you are selecting the right tool.</p><p>See also the &quot;NOTE about Windows native toolchains&quot; in the section call &quot;GNU Toolchain Options&quot; above.</p></li></ol><p>Configuration sub-directories -----------------------------</p><p>nsh: Configures the NuttShell (nsh) located at examples/nsh. The Configuration enables both the serial and telnetd NSH interfaces.</p><pre><code>NOTES:

1. This configuration runs with a CPU clock of 120MHz and with the
   the CMCC enabled.  If you disable these, then you must also
   re-calibrate the delay loop.

2. Default stack sizes are large and should really be tuned to reduce
   the RAM footprint:

     CONFIG_ARCH_INTERRUPTSTACK=2048
     CONFIG_IDLETHREAD_STACKSIZE=1024
     CONFIG_INIT_STACKSIZE=2048
     CONFIG_PTHREAD_STACK_DEFAULT=2048
     ... and others ...

3. NSH built-in applications are supported.

   Binary Formats:
     CONFIG_BUILTIN=y                    : Enable support for built-in programs

   Application Configuration:
     CONFIG_NSH_BUILTIN_APPS=y           : Enable starting apps from NSH command line

4. This configuration has the network enabled by default.  This can be
   easily disabled or reconfigured (See see the network related
   configuration settings above in the section entitled &quot;Networking&quot;).

   NOTE: In boot-up sequence is very simple in this example; all
   initialization is done sequentially (vs. in parallel) and so you will
   not see the NSH prompt until all initialization is complete.  The
   network bring-up in particular will add some delay before the NSH
   prompt appears.  In a real application, you would probably want to
   do the network bringup on a separate thread so that access to the
   NSH prompt is not delayed.

   This delay will be especially long if the board is not connected to
   a network because additional time will be required to fail with
   timeout errors.  This delay can be eliminated, however, if you enable
   an NSH initialization option as described above in a paragraph
   entitled, &quot;Network Initialization Thread.&quot;

   STATUS:
   2014-3-13: The basic NSH serial console is working.  Network support
              has been verified.

5. This configuration supports a network with fixed IP address.  You
   may have to change these settings for your network:

   CONFIG_NSH_IPADDR=0x0a000002        : IP address: 10.0.0.2
   CONFIG_NSH_DRIPADDR=0x0a000001      : Gateway:    10.0.0.1
   CONFIG_NSH_NETMASK=0xffffff00       : Netmask:    255.255.255.0

   You can also enable enable the DHCPC client for networks that use
   dynamically assigned address:

   CONFIG_NETUTILS_DHCPC=y             : Enables the DHCP client
   CONFIG_NET_UDP=y                    : Depends on broadcast UDP
   CONFIG_NET_BROADCAST=y
   CONFIG_NSH_DHCPC=y                  : Tells NSH to use DHCPC, not
                                       : the fixed addresses

6. This configuration has the DMA-based SPI0 and AT25 Serial FLASH
   support enabled by default.  This can be easily disabled or
   reconfigured (See see the configuration settings and usage notes
   above in the section entitled &quot;AT25 Serial FLASH&quot;).

   To mount the AT25 Serial FLASH as a FAT file system:

     nsh&gt;mount -t vfat /dev/mtdblock0 /mnt/at25

   STATUS:
   2014-3-14: The DMA-based SPI appears to be functional and can be used
              to support a FAT file system on the AT25 Serial FLASH.

7. USB device support is not enabled in this configuration by default.
   To add USB device support to this configuration, see the instructions
   above under &quot;USB Full-Speed Device.&quot;

   STATUS:
   2014-3-21: USB support is partially functional.  Additional test and
              integration is required. See STATUS in the &quot;USB Full-Speed
              Device&quot; for further information
   2014-3-22: USB seems to work properly (there are not obvious errors
              in a USB bus capture.  However, as of this data the AT25
              does not mount on either the Linux or Windows host.  This
              needs to be retested.

8. Enabling HSMCI support. The SAM3U-KE provides a an SD memory card
   slot.  Support for the SD slot can be enabled following the
   instructions provided above in the paragraph entitled &quot;HSMCI.&quot;

9. This configuration has been used for verifying the touchscreen on
   on the SAM4E-EK LCD module.

   The NSH configuration can be used to verify the ADS7843E touchscreen on
   the SAM4E-EK LCD.  With these modifications, you can include the touchscreen
   test program at apps/examples/touchscreen as an NSH built-in application.
   You can enable the touchscreen and test by modifying the default
   configuration in the following ways:

   Device Drivers
     CONFIG_SPI=y                      : Enable SPI support
     CONFIG_SPI_EXCHANGE=y             : The exchange() method is supported

     CONFIG_INPUT=y                    : Enable support for input devices
     CONFIG_INPUT_ADS7843E=y           : Enable support for the ADS7843E
     CONFIG_ADS7843E_SPIDEV=0          : Use SPI CS 0 for communication
     CONFIG_ADS7843E_SPIMODE=0         : Use SPI mode 0
     CONFIG_ADS7843E_FREQUENCY=1000000 : SPI BAUD 1MHz
     CONFIG_ADS7843E_SWAPXY=y          : If landscape orientation
     CONFIG_ADS7843E_THRESHX=51        : These will probably need to be tuned
     CONFIG_ADS7843E_THRESHY=39

   System Type -&gt; Peripherals:
     CONFIG_SAM34_SPI0=y               : Enable support for SPI

   System Type:
     CONFIG_SAM34_GPIO_IRQ=y           : GPIO interrupt support
     CONFIG_SAM34_GPIOA_IRQ=y          : Enable GPIO interrupts from port A

   Library Support:
     CONFIG_SCHED_WORKQUEUE=y          : Work queue support required

   Application Configuration:
     CONFIG_EXAMPLES_TOUCHSCREEN=y     : Enable the touchscreen built-in test

   Defaults should be okay for related touchscreen settings.  Touchscreen
   debug output on UART0 can be enabled with:

   Build Setup:
     CONFIG_DEBUG_FEATURES=y           : Enable debug features
     CONFIG_DEBUG_INFO=y               : Enable verbose debug output
     CONFIG_DEBUG_INPUT=y              : Enable debug output from input devices
</code></pre><ol start="10"><li><p>This configuration can be re-configured to test the on-board LCD module.</p><p>System Type -&gt; AT91SAM3/4 Configuration Options CONFIG_SAM34_SMC=y : SMC support</p><p>Device Drivers -&gt; LCD Driver Support CONFIG_LCD=y : Enable LCD support CONFIG_LCD_MAXCONTRAST=1 : Value should not matter CONFIG_LCD_MAXPOWER=64 : Must be &gt; 16 CONFIG_LCD_LANDSCAPE=y : Landscape orientation</p><p>Board Selection CONFIG_SAM4EEK_LCD_ILI9341=y : For the ILI9341-based LCD CONFIG_SAM4EEK_LCD_RGB565=y : Color resolution CONFIG_SAM4EEK_LCD_BGCOLOR=0x00 : Initial background color</p><p>Graphics Support CONFIG_NX=y : Enable Graphics support CONFIG_NX_LCDDRIVER=y : LCD graphics device</p><p>Graphics Support -&gt; Supported Pixel Depths CONFIG_NX_DISABLE_1BPP=y : Only 16BPP supported CONFIG_NX_DISABLE_2BPP=y CONFIG_NX_DISABLE_4BPP=y CONFIG_NX_DISABLE_8BPP=y CONFIG_NX_DISABLE_24BPP=y CONFIG_NX_DISABLE_32BPP=y</p><p>Graphics Support -&gt; Font Selections CONFIG_NXFONTS_CHARBITS=7 CONFIG_NXFONT_SANS23X27=y CONFIG_NXFONT_SANS22X29B=y</p><p>Application Configuration -&gt; Examples CONFIG_EXAMPLES_NXLINES=y CONFIG_EXAMPLES_NXLINES_BGCOLOR=0x0320 CONFIG_EXAMPLES_NXLINES_LINEWIDTH=16 CONFIG_EXAMPLES_NXLINES_LINECOLOR=0xffe0 CONFIG_EXAMPLES_NXLINES_BORDERWIDTH=4 CONFIG_EXAMPLES_NXLINES_BORDERCOLOR=0xffe0 CONFIG_EXAMPLES_NXLINES_CIRCLECOLOR=0xf7bb CONFIG_EXAMPLES_NXLINES_BPP=16</p><p>STATUS: 2014-30-24: DMA is not currently functional and without DMA, there may not be reliable data transfers at high speeds due to data overrun problems. The current HSMCI driver supports DMA via the DMAC. However, the data sheet only discusses PDC-based HSMCI DMA (although there is a DMA channel interface definition for HSMCI). So this is effort is dead-in-the-water for now. 2014-05-15: The HSCMCI driver has been recently updated to support PCD DMA. That modified driver, however, has not yet been tested with the SAM4E-EK</p><p>2014-05-14: The touchscreen interface was successfully verified.</p><p>2014-08-20: The LCD interface is fully implemented and data appears to be transferred okay. However, there are errors in geometry that leave the LCD unusable still.</p><pre><code>          The LCD backlight appears to be functional.
</code></pre></li></ol><p>usbnsh:</p><pre><code>This is another NSH example.  If differs from the &#39;nsh&#39; configuration
in that this configurations uses a USB serial device for console I/O.

STATUS:
  2014-3-23: This configuration appears to be fully functional.

NOTES:

1. See the NOTES in the description of the nsh configuration.  Those
   notes all apply here as well.  Some additional notes unique to
   the USB console version follow:

2. The configuration differences between this configuration and the
   nsh configuration is:

   a. USB device support is enabled as described in the paragraph
      entitled &quot;USB Full-Speed Device&quot;,

   b. The CDC/ACM serial class is enabled as described in the paragraph
      &quot;CDC/ACM Serial Device Class&quot;.

   c. The serial console is disabled:

      RTOS Features:
        CONFIG_DEV_CONSOLE=n           : No console at boot time

      Driver Support -&gt; USB Device Driver Support
        CONFIG_UART0_SERIAL_CONSOLE=n  : UART0 is not the console
        CONFIG_NO_SERIAL_CONSOLE=y     : There is no serial console

      Driver Support -&gt; USB Device Driver Support
        CONFIG_CDCACM_CONSOLE=y        : USB CDC/ACM console

   d. Support for debug output on UART0 is provided as described in the
      next note.

3. If you send large amounts of data to the target, you may see data
   loss due to RX overrun errors.  See the NOTES in the section entitled
   &quot;CDC/ACM Serial Device Class&quot; for an explanation and some possible
   work-arounds.

3. This configuration does have UART0 output enabled and set up as
   the system logging device:

       File Systems -&gt; Advanced SYSLOG Features
         CONFIG_SYSLOG_CHAR=y          : Use a character device for system logging
         CONFIG_SYSLOG_DEVPATH=&quot;/dev/ttyS0&quot; : UART0 will be /dev/ttyS0

   However, there is nothing to generate SYSLOG output in the default
   configuration so nothing should appear on UART0 unless you enable
   some debug output or enable the USB monitor.

   NOTE:  Using the SYSLOG to get debug output has limitations.  Among
   those are that you cannot get debug output from interrupt handlers.
   So, in particularly, debug output is not a useful way to debug the
   USB device controller driver.  Instead, use the USB monitor with
   USB debug off and USB trace on (see below).

4. Enabling USB monitor SYSLOG output.  See the paragraph entitle
   &quot;Debugging USB Device&quot; for a summary of the configuration settings
   needed to enable the USB monitor and get USB debug data out UART0.

5. By default, this configuration uses the CDC/ACM serial device to
   provide the USB console.  This works out-of-the-box for Linux.
   Windows, on the other hand, will require a CDC/ACM device driver
   (.inf file).

5. Using the Prolifics PL2303 Emulation

   You could also use the non-standard PL2303 serial device instead of
   the standard CDC/ACM serial device by changing:

    CONFIG_CDCACM=n                    : Disable the CDC/ACM serial device class
    CONFIG_CDCACM_CONSOLE=n            : The CDC/ACM serial device is NOT the console
    CONFIG_PL2303=y                    : The Prolifics PL2303 emulation is enabled
    CONFIG_PL2303_CONSOLE=y            : The PL2303 serial device is the console
</code></pre><p>nxwm:</p><pre><code>This is a special configuration setup for the NxWM window manager
UnitTest.  It integrates support for both the SAM4E-EK ILI9341 LCDC and
the SAM4E-EK ADS7843E touchscreen controller and provides a more
advanced graphics demo. It provides an interactive windowing experience.

The NxWM window manager is a tiny window manager tailored for use
with smaller LCDs.  It supports a task, a start window, and
multiple application windows with toolbars.  However, to make the best
use of the visible LCD space, only one application window is visible at
at time.

The NxWM window manager can be found here:

  apps/graphics/NxWidgets/nxwm

The NxWM unit test can be found at:

  apps/graphics/NxWidgets/UnitTests/nxwm

STATUS:
2014-08-20. I have seen the demo work well but it is not thoroughly
            exercised.  I suspect some touchscreen issues.
2014-10-11. Today&#39;s build crashes in nxwm_main on startup.
</code></pre>`,161)]))}const S=t(a,[["render",r]]);export{c as __pageData,S as default};
