import{_ as t,c as n,al as o,o as i}from"./chunks/framework.NFAqBSgQ.js";const p=JSON.parse('{"title":"README","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/samv7/boards/same70-xplained/README.md","filePath":"en/platforms/arm/samv7/boards/same70-xplained/README.md"}'),a={name:"en/platforms/arm/samv7/boards/same70-xplained/README.md"};function r(s,e,l,d,h,u){return i(),n("div",null,e[0]||(e[0]=[o(`<h1 id="readme" tabindex="-1">README <a class="header-anchor" href="#readme" aria-label="Permalink to &quot;README&quot;">​</a></h1><p>This README file discusses the port of NuttX to the Atmel SAM E70 Xplained Evaluation Kit (ATSAME70-XPLD). This board features the ATSAME70Q21 Cortex-M7 microcontroller.</p><h1 id="contents" tabindex="-1">Contents <a class="header-anchor" href="#contents" aria-label="Permalink to &quot;Contents&quot;">​</a></h1><ul><li>Status/Open Issues</li><li>Serial Console</li><li>SD card</li><li>Automounter</li><li>LEDs and Buttons</li><li>AT24MAC402 Serial EEPROM</li><li>Program FLASH Access</li><li>Networking</li><li>USBHS Device Controller Driver</li><li>MCAN1 Loopback Test</li><li>SPI Slave</li><li>Click Shield</li><li>Tickless OS</li><li>Debugging</li><li>Using OpenOCD and GDB to flash via the EDBG chip</li><li>Configurations</li></ul><h1 id="status-open-issues" tabindex="-1">Status/Open Issues <a class="header-anchor" href="#status-open-issues" aria-label="Permalink to &quot;Status/Open Issues&quot;">​</a></h1><p>2015-11-30: The basic NSH configuration is function with serial console via the EDBG VCOM and LED and buttons support. SDRAM and the HSMCI SD card slot also appear to be fully functional.</p><p>See also Documentation/platforms/arm/samv7/boards/samv71-xult/README.txt</p><h1 id="serial-console" tabindex="-1">Serial Console <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;Serial Console&quot;">​</a></h1><p>The SAME70-XPLD has no on-board RS-232 drivers so it will be necessary to use either the VCOM or an external RS-232 driver. Here are some options.</p><ul><li><p>Arduino Serial Shield: One option is to use an Arduino-compatible serial shield. This will use the RXD and TXD signals available at pins 0 an 1, respectively, of the Arduino &quot;Digital Low&quot; connector. On the SAME70-XPLD board, this corresponds to UART3:</p><hr><p>Pin on SAME70 Arduino Arduino SAME70 J503 PIO Name Pin Function</p><hr><p>1 2 PD28 D0/RX0 0 1 URXD3 PD30 D1/TX0 UTXD3</p><hr><p>In this configuration, an external RS232 driver can also be used instead of the shield. Simply connext as follows:</p><hr><p>Arduino RS-232 Pin Label Connection</p><hr><p>D0 (RXD) RX TX GND D1 (TXD) Vcc GND 5VO</p><hr></li><li><p>Arduino Communications. Additional UART/USART connections are available on the Arduino Communications connection J505 and J507:</p><hr><p>Connector SAME70 Pin Description</p><hr><p>J503 1 J503 URXD3 PD28 Standard Arduino serial (D0/RXD) 2 UTXD3 PD30 Standard Arduino serial (D1/TXD)</p><hr><h2 id="j505-3-urxd4-pd18-arduino-d19-j505-4-utxd4-pd19-arduino-d18-j505-5rxd2-pd15-arduino-d17-j505-6-txd2-pd16-arduino-d16-j505-7-rxd0-pb0arduino-d15-j505-8-txd0-pb1-arduino-d14-j507-27-rxd1-pa21-arduino-d46-j50728-txd1-pb4-arduino-d47" tabindex="-1">J505 3 URXD4 PD18 Arduino D19 J505 4 UTXD4 PD19 Arduino D18 J505 5 RXD2 PD15 Arduino D17 J505 6 TXD2 PD16 Arduino D16 J505 7 RXD0 PB0 Arduino D15 J505 8 TXD0 PB1 Arduino D14 --------- ---------- -------------------------------- J507 27 RXD1 PA21 Arduino D46 J507 28 TXD1 PB4 Arduino D47 --------- ---------- <a class="header-anchor" href="#j505-3-urxd4-pd18-arduino-d19-j505-4-utxd4-pd19-arduino-d18-j505-5rxd2-pd15-arduino-d17-j505-6-txd2-pd16-arduino-d16-j505-7-rxd0-pb0arduino-d15-j505-8-txd0-pb1-arduino-d14-j507-27-rxd1-pa21-arduino-d46-j50728-txd1-pb4-arduino-d47" aria-label="Permalink to &quot;J505 3 URXD4 PD18 Arduino D19 J505 4 UTXD4 PD19 Arduino D18 J505 5
RXD2 PD15 Arduino D17 J505 6 TXD2 PD16 Arduino D16 J505 7 RXD0 PB0
Arduino D15 J505 8 TXD0 PB1 Arduino D14 --------- ----------
-------------------------------- J507 27 RXD1 PA21 Arduino D46 J507
28 TXD1 PB4 Arduino D47 --------- ----------&quot;">​</a></h2></li><li><p>SAMV7-XULT EXTn connectors. USART pins are also available the EXTn connectors. The following are labelled in the User Guide for USART functionality:</p><p>SAME70 Xpl ained Conne ctors</p><hr><p>Connector SAME70 Pin Description</p><p>J401 13 RXD0 PB0 EXT1 UART_RX J401 14 TXD0 PB1 EXT1 UART_7X --------- ---------- -------------------------------- J402 13 RXD1 PA21 EXT2 UART_RX J402 14 TXD1 PB4 EXT2 UART_TX ---------</p><hr></li><li><p>VCOM. The Virtual Com Port gateway is available on USART1:</p><p>EDBG VCOM Interfa ce</p><hr><p>EDBG Signal SAME70</p><p>EDBG_CDC_UART_RX TXD1 PB4 EDBG_CDC_UART_TX RXD1 PA21</p><hr></li></ul><p>Any of these options can be selected as the serial console by:</p><ol><li>Enabling the UART/USART peripheral in the &quot;System Type -&gt; Peripheral Selection&quot; menu, then</li><li>Configuring the peripheral in the &quot;Drivers -&gt; Serial Configuration&quot; menu.</li></ol><p>NOTE: If USART1 is used (TXD1, RXD1), then PB4 must be reconfigured in the SUPC. Normally, PB4 is TDI. When it is reconfigured for use with USART1, the capability to debug is lost! If you plan to debug you should most certainly not use USART1.</p><h1 id="sd-card" tabindex="-1">SD Card <a class="header-anchor" href="#sd-card" aria-label="Permalink to &quot;SD Card&quot;">​</a></h1><h2 id="card-slot" tabindex="-1">Card Slot <a class="header-anchor" href="#card-slot" aria-label="Permalink to &quot;Card Slot&quot;">​</a></h2><p>The SAM E70 Xplained has one standard SD card connector that is connected to the High Speed Multimedia Card Interface (HSMCI) of the SAM E70. SD card connector:</p><hr><p>SAME70 SAME70 Shared functionality Pin Function</p><hr><p>PA30 MCDA0 (DAT0) PA31 MCDA1 (DAT1) PA26 MCDA2 (DAT2) PA27 MCDA3 (DAT3) PA25 MCCK (CLK) Shield PA28 MCCDA (CMD) PC16 Card Detect (C/D) Shield</p><hr><h2 id="configuration-settings" tabindex="-1">Configuration Settings <a class="header-anchor" href="#configuration-settings" aria-label="Permalink to &quot;Configuration Settings&quot;">​</a></h2><p>Enabling HSMCI support. The SAMV7-XULT provides a one, full-size SD memory card slots. The full size SD card slot connects via HSMCI0. Support for the SD slots can be enabled with the following settings:</p><p>System Type-&gt;SAMV7 Peripheral Selection CONFIG_SAMV7_HSMCI0=y : To enable HSMCI0 support CONFIG_SAMV7_XDMAC=y : XDMAC is needed by HSMCI0/1</p><p>System Type CONFIG_SAMV7_GPIO_IRQ=y : PIO interrupts needed CONFIG_SAMV7_GPIOD_IRQ=y : Card detect pin is on PD18</p><p>Device Drivers -&gt; MMC/SD Driver Support CONFIG_MMCSD=y : Enable MMC/SD support CONFIG_MMSCD_NSLOTS=1 : One slot per driver instance CONFIG_MMCSD_MULTIBLOCK_LIMIT=1 : (REVISIT) CONFIG_MMCSD_HAVE_CARDDETECT=y : Supports card-detect PIOs CONFIG_MMCSD_MMCSUPPORT=n : Interferes with some SD cards CONFIG_MMCSD_SPI=n : No SPI-based MMC/SD support CONFIG_MMCSD_SDIO=y : SDIO-based MMC/SD support CONFIG_SDIO_DMA=y : Use SDIO DMA CONFIG_SDIO_BLOCKSETUP=y : Needs to know block sizes</p><p>RTOS Features -&gt; Work Queue Support CONFIG_SCHED_WORKQUEUE=y : Driver needs work queue support</p><p>Application Configuration -&gt; NSH Library CONFIG_NSH_ARCHINIT=y : NSH board-initialization, OR CONFIG_BOARD_LATE_INITIALIZE=y</p><h2 id="using-the-sd-card" tabindex="-1">Using the SD card <a class="header-anchor" href="#using-the-sd-card" aria-label="Permalink to &quot;Using the SD card&quot;">​</a></h2><ol><li><p>After booting, the HSCMI device will appear as /dev/mmcsd0.</p></li><li><p>If you try mounting an SD card with nothing in the slot, the mount will fail:</p><p>nsh&gt; mount -t vfat /dev/mmcsd0 /mnt/sd0 nsh: mount: mount failed: 19</p><p>NSH can be configured to provide errors as strings instead of numbers. But in this case, only the error number is reported. The error numbers can be found in nuttx/include/errno.h:</p><p>#define ENODEV 19 #define ENODEV_STR &quot;No such device&quot;</p><p>So the mount command is saying that there is no device or, more correctly, that there is no card in the SD card slot.</p></li><li><p>Inserted the SD card. Then the mount should succeed.</p><p>nsh&gt; mount -t vfat /dev/mmcsd0 /mnt/sd0 nsh&gt; ls /mnt/sd1 /mnt/sd1: atest.txt nsh&gt; cat /mnt/sd1/atest.txt This is a test</p><p>NOTE: See the next section entitled &quot;Auto-Mounter&quot; for another way to mount your SD card.</p></li><li><p>Before removing the card, you must umount the file system. This is equivalent to &quot;ejecting&quot; or &quot;safely removing&quot; the card on Windows: It flushes any cached data to an SD card and makes the SD card unavailable to the applications.</p><p>nsh&gt; umount -t /mnt/sd0</p><p>It is now safe to remove the card. NuttX provides into callbacks that can be used by an application to automatically unmount the volume when it is removed. But those callbacks are not used in these configurations.</p></li></ol><h1 id="auto-mounter" tabindex="-1">Auto-Mounter <a class="header-anchor" href="#auto-mounter" aria-label="Permalink to &quot;Auto-Mounter&quot;">​</a></h1><p>NuttX implements an auto-mounter than can make working with SD cards easier. With the auto-mounter, the file system will be automatically mounted when the SD card is inserted into the HSMCI slot and automatically unmounted when the SD card is removed.</p><p>Here is a sample configuration for the auto-mounter:</p><pre><code>File System Configuration
  CONFIG_FS_AUTOMOUNTER=y

Board-Specific Options
  CONFIG_SAMV7_HSMCI0_AUTOMOUNT=y
  CONFIG_SAMV7_HSMCI0_AUTOMOUNT_FSTYPE=&quot;vfat&quot;
  CONFIG_SAMV7_HSMCI0_AUTOMOUNT_BLKDEV=&quot;/dev/mmcsd0&quot;
  CONFIG_SAMV7_HSMCI0_AUTOMOUNT_MOUNTPOINT=&quot;/mnt/sdcard&quot;
  CONFIG_SAMV7_HSMCI0_AUTOMOUNT_DDELAY=1000
  CONFIG_SAMV7_HSMCI0_AUTOMOUNT_UDELAY=2000
</code></pre><p>WARNING: SD cards should never be removed without first unmounting them. This is to avoid data and possible corruption of the file system. Certainly this is the case if you are writing to the SD card at the time of the removal. If you use the SD card for read-only access, however, then I cannot think of any reason why removing the card without mounting would be harmful.</p><h1 id="leds-and-buttons" tabindex="-1">LEDs and Buttons <a class="header-anchor" href="#leds-and-buttons" aria-label="Permalink to &quot;LEDs and Buttons&quot;">​</a></h1><h2 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h2><p>A single LED is available driven by PC8.</p><p>This LED is not used by the board port unless CONFIG_ARCH_LEDS is defined. In that case, the usage by the board port is defined in include/board.h and src/sam_autoleds.c. The LED is used to encode OS-related events as follows:</p><hr><p>SYMBOL Meaning LED</p><hr><p>LED_STARTED NuttX has been started OFF OFF OFF ON LED_HEAPALLOCATE Heap has been allocated N/C N/C N/C LED_IRQSENABLED Interrupts enabled Idle FLASH LED_STACKCREATED stack created In an<br> LED_INIRQ interrupt In a signal<br> LED_SIGNAL handler An assertion<br> LED_ASSERTION failed The system has<br> LED_PANIC crashed</p><p>us if the LED is tically on, NuttX has ccessfully sta parently, su rmally. If the LED booted and is, running no z, then is f r has been lashing at a fatal erro detected and approximately the system has halted.</p><h2 id="ttons" tabindex="-1">ttons <a class="header-anchor" href="#ttons" aria-label="Permalink to &quot;ttons&quot;">​</a></h2><p>SAM E70 Xplained contains two mechanical buttons. One button is the RESET button connected to the SAM E70 reset line and the other, PA11, is a generic user configurable button. When a button is pressed it will drive the I/O line to GND.</p><p>NOTE: There are no pull-up resistors connected to the generic user buttons so it is necessary to enable the internal pull-up in the SAM E70 to use the button.</p><h1 id="at24mac402-serial-eeprom" tabindex="-1">AT24MAC402 Serial EEPROM <a class="header-anchor" href="#at24mac402-serial-eeprom" aria-label="Permalink to &quot;AT24MAC402 Serial EEPROM&quot;">​</a></h1><h2 id="ethernet-mac-address" tabindex="-1">Ethernet MAC Address <a class="header-anchor" href="#ethernet-mac-address" aria-label="Permalink to &quot;Ethernet MAC Address&quot;">​</a></h2><p>The SAM E70 Xplained features one external AT24MAC402 serial EEPROM with an EIA-48 MAC address connected to the SAM E70 through I2C. This device contains a MAC address for use with the Ethernet interface.</p><p>Connectivity:</p><hr><p>SAME70 SAME70 I2C Pin Function Function</p><hr><p>PA03 TWID0 SDA SCL PA04 TWICK0</p><hr><p>I2C address:</p><p>The 7-bit addresses of the AT24 part are 0b1010AAA for the normal 2Kbit memory and 0b1011aaa for the &quot;extended memory&quot; where aaa is the state of the A0, A1, and A3 pins on the part. On the SAME70-XPLD board, these are all pulled high so the full, 7-bit address is 0x5f.</p><h2 id="configuration" tabindex="-1">Configuration <a class="header-anchor" href="#configuration" aria-label="Permalink to &quot;Configuration&quot;">​</a></h2><p>System Type -&gt; SAMV7 Peripheral Support CONFIG_SAMV7_TWIHS0=y : Used to access the EEPROM CONFIG_SAMV7_TWIHS0_FREQUENCY=100000</p><p>Device drivers -&gt; Memory Technology Devices CONFIG_MTD_AT24XX=y : Enable the AT24 device driver CONFIG_AT24XX_SIZE=2 : Normal EEPROM is 2Kbit (256b) CONFIG_AT24XX_ADDR=0x57 : Normal EEPROM address */ CONFIG_AT24XX_EXTENDED=y : Supports an extended memory region CONFIG_AT24XX_EXTSIZE=160 : Extended address up to 0x9f</p><h2 id="mtd-configuration-data" tabindex="-1">MTD Configuration Data <a class="header-anchor" href="#mtd-configuration-data" aria-label="Permalink to &quot;MTD Configuration Data&quot;">​</a></h2><p>The AT24 EEPROM can also be used to storage of up to 256 bytes of configuration data:</p><p>Device drivers -&gt; Memory Technology Devices</p><p>The configuration data device will appear at /dev/config.</p><h1 id="networking" tabindex="-1">Networking <a class="header-anchor" href="#networking" aria-label="Permalink to &quot;Networking&quot;">​</a></h1><h2 id="ksz8081rnaca-connections" tabindex="-1">KSZ8081RNACA Connections <a class="header-anchor" href="#ksz8081rnaca-connections" aria-label="Permalink to &quot;KSZ8081RNACA Connections&quot;">​</a></h2><hr><p>SAME70 SAME70 Ethernet Pin Function Function</p><hr><p>PD0 PD1 GTXCK REF_CLK PD2 PD3 GTXEN GTX0 TXEN TXD0 PD4 PD5 GTX1 GRXDV TXD1 PD6 PD7 GRX0 GRX1 CRS_DV PD8 PD9 GRXER GMDC RXD0 RXD1 PA14 GMDIO GPIO RXER MDC PC10 GPIO MDIO INTERRUPT RESET</p><hr><h2 id="selecting-the-gmac-peripheral" tabindex="-1">Selecting the GMAC peripheral <a class="header-anchor" href="#selecting-the-gmac-peripheral" aria-label="Permalink to &quot;Selecting the GMAC peripheral&quot;">​</a></h2><p>System Type -&gt; SAMV7 Peripheral Support CONFIG_SAMV7_EMAC0=y : Enable the GMAC peripheral (aka, EMAC0) CONFIG_SAMV7_TWIHS0=y : We will get the MAC address from the AT24 EEPROM CONFIG_SAMV7_TWIHS0_FREQUENCY=100000</p><p>System Type -&gt; EMAC device driver options CONFIG_SAMV7_EMAC0_NRXBUFFERS=16 : Set aside some RS and TX buffers CONFIG_SAMV7_EMAC0_NTXBUFFERS=8 CONFIG_SAMV7_EMAC0_RMII=y : The RMII interfaces is used on the board CONFIG_SAMV7_EMAC0_AUTONEG=y : Use autonegotiation CONFIG_SAMV7_EMAC0_PHYADDR=1 : KSZ8061 PHY is at address 1 CONFIG_SAMV7_EMAC0_PHYSR=30 : Address of PHY status register on KSZ8061 CONFIG_SAMV7_EMAC0_PHYSR_ALTCONFIG=y : Needed for KSZ8061 CONFIG_SAMV7_EMAC0_PHYSR_ALTMODE=0x7 : &quot; &quot; &quot; &quot; &quot; &quot; CONFIG_SAMV7_EMAC0_PHYSR_10HD=0x1 : &quot; &quot; &quot; &quot; &quot; &quot; CONFIG_SAMV7_EMAC0_PHYSR_100HD=0x2 : &quot; &quot; &quot; &quot; &quot; &quot; CONFIG_SAMV7_EMAC0_PHYSR_10FD=0x5 : &quot; &quot; &quot; &quot; &quot; &quot; CONFIG_SAMV7_EMAC0_PHYSR_100FD=0x6 : &quot; &quot; &quot; &quot; &quot; &quot;</p><p>PHY selection. Later in the configuration steps, you will need to select the KSZ8061 PHY for EMAC (See below)</p><p>Networking Support CONFIG_NET=y : Enable Neworking CONFIG_NET_SOCKOPTS=y : Enable socket operations CONFIG_NET_ETH_PKTSIZE=562 : Maximum packet size 1518 is more standard CONFIG_NET_ARP=y : ARP support should be enabled CONFIG_NET_ARP_SEND=y : Use ARP to get peer address before sending CONFIG_NET_TCP=y : Enable TCP/IP networking CONFIG_NET_TCPBACKLOG=y : Support TCP/IP backlog CONFIG_NET_TCP_WRITE_BUFFERS=y : Enable TCP write buffering CONFIG_NET_UDP=y : Enable UDP networking CONFIG_NET_BROADCAST=y : Support UDP broadcast packets CONFIG_NET_ICMP=y : Enable ICMP networking CONFIG_NET_ICMP_SOCKET=y : Needed for NSH ping command : Defaults should be okay for other options Device drivers -&gt; Network Device/PHY Support CONFIG_NETDEVICES=y : Enabled PHY selection CONFIG_ETH0_PHY_KSZ8061=y : Select the KSZ8061 PHY used with EMAC0</p><p>Device drivers -&gt; Memory Technology Devices CONFIG_MTD_AT24XX=y : Enable the AT24 device driver CONFIG_AT24XX_SIZE=2 : Normal EEPROM is 2Kbit (256b) CONFIG_AT24XX_ADDR=0x57 : Normal EEPROM address */ CONFIG_AT24XX_EXTENDED=y : Supports an extended memory region CONFIG_AT24XX_EXTSIZE=160 : Extended address up to 0x9f</p><p>RTOS Features -&gt;Work Queue Support CONFIG_SCHED_WORKQUEUE=y : Work queue support is needed CONFIG_SCHED_HPWORK=y CONFIG_SCHED_HPWORKSTACKSIZE=2048 : Might need to be increased</p><p>Application Configuration -&gt; Network Utilities CONFIG_NETDB_DNSCLIENT=y : Enable host address resolution CONFIG_NETUTILS_TELNETD=y : Enable the Telnet daemon CONFIG_NETUTILS_TFTPC=y : Enable TFTP data file transfers for get and put commands CONFIG_NETUTILS_NETLIB=y : Network library support is needed CONFIG_NETUTILS_WEBCLIENT=y : Needed for wget support : Defaults should be okay for other options Application Configuration -&gt; NSH Library CONFIG_NSH_TELNET=y : Enable NSH session via Telnet CONFIG_NSH_IPADDR=0x0a000002 : Select an IP address CONFIG_NSH_DRIPADDR=0x0a000001 : IP address of gateway/host PC CONFIG_NSH_NETMASK=0xffffff00 : Netmask CONFIG_NSH_NOMAC=n : We will get the IP address from EEPROM : Defaults should be okay for other options</p><h2 id="cache-related-issues" tabindex="-1">Cache-Related Issues <a class="header-anchor" href="#cache-related-issues" aria-label="Permalink to &quot;Cache-Related Issues&quot;">​</a></h2><p>I- and D-Caches can be enabled but the D-Cache must be enabled in write- through mode. This is to work around issues with the RX and TX descriptors with are 8-bytes in size. But the D-Cache cache line size is 32-bytes. That means that you cannot reload, clean or invalidate a descriptor without also effecting three neighboring descriptors. Setting write through mode eliminates the need for cleaning the D-Cache. If only reloading and invalidating are done, then there is no problem.</p><h2 id="using-the-network-with-nsh" tabindex="-1">Using the network with NSH <a class="header-anchor" href="#using-the-network-with-nsh" aria-label="Permalink to &quot;Using the network with NSH&quot;">​</a></h2><p>So what can you do with this networking support? First you see that NSH has several new network related commands:</p><p>ifconfig, ifdown, ifup: Commands to help manage your network get and put: TFTP file transfers wget: HTML file transfers ping: Check for access to peers on the network Telnet console: You can access the NSH remotely via telnet.</p><p>You can also enable other add on features like full FTP or a Web Server or XML RPC and others. There are also other features that you can enable like DHCP client (or server) or network name resolution.</p><p>By default, the IP address of the SAME70-XPLD will be 10.0.0.2 and it will assume that your host is the gateway and has the IP address 10.0.0.1.</p><p>nsh&gt; ifconfig eth0 HWaddr 00:e0🇩🇪ad:be:ef at UP IPaddr:10.0.0.2 DRaddr:10.0.0.1 Mask:255.255.255.0</p><p>You can use ping to test for connectivity to the host (Careful, Window firewalls usually block ping-related ICMP traffic). On the target side, you can:</p><p>nsh&gt; ping 10.0.0.1 PING 10.0.0.1 56 bytes of data 56 bytes from 10.0.0.1: icmp_seq=1 time=0 ms 56 bytes from 10.0.0.1: icmp_seq=2 time=0 ms 56 bytes from 10.0.0.1: icmp_seq=3 time=0 ms 56 bytes from 10.0.0.1: icmp_seq=4 time=0 ms 56 bytes from 10.0.0.1: icmp_seq=5 time=0 ms 56 bytes from 10.0.0.1: icmp_seq=6 time=0 ms 56 bytes from 10.0.0.1: icmp_seq=7 time=0 ms 56 bytes from 10.0.0.1: icmp_seq=8 time=0 ms 56 bytes from 10.0.0.1: icmp_seq=9 time=0 ms 56 bytes from 10.0.0.1: icmp_seq=10 time=0 ms 10 packets transmitted, 10 received, 0% packet loss, time 10100 ms</p><p>NOTE: In this configuration is is normal to have packet loss &gt; 0% the first time you ping due to the default handling of the ARP table.</p><p>On the host side, you should also be able to ping the SAME70-XPLD:</p><p>$ ping 10.0.0.2</p><p>You can also log into the NSH from the host PC like this:</p><p>$ telnet 10.0.0.2 Trying 10.0.0.2... Connected to 10.0.0.2. Escape character is &#39;^]&#39;. sh_telnetmain: Session [3] Started</p><p>NuttShell (NSH) NuttX-7.9 nsh&gt; help help usage: help [-v] [<code>&lt;cmd&gt;</code>]</p><pre><code>[           echo        ifconfig    mkdir       mw          sleep
?           exec        ifdown      mkfatfs     ping        test
cat         exit        ifup        mkfifo      ps          umount
cp          free        kill        mkrd        put         usleep
cmp         get         losetup     mh          rm          wget
dd          help        ls          mount       rmdir       xd
df          hexdump     mb          mv          source
</code></pre><p>Builtin Apps: nsh&gt;</p><p>NOTE: If you enable this feature, you experience a delay on booting. That is because the start-up logic waits for the network connection to be established before starting NuttX. In a real application, you would probably want to do the network bringup on a separate thread so that access to the NSH prompt is not delayed.</p><p>This delay will be especially long if the board is not connected to a network. On the order of a minute! You will probably think that NuttX has crashed! And then, when it finally does come up, the network will not be available.</p><h2 id="network-initialization-thread" tabindex="-1">Network Initialization Thread <a class="header-anchor" href="#network-initialization-thread" aria-label="Permalink to &quot;Network Initialization Thread&quot;">​</a></h2><p>There is a configuration option enabled by CONFIG_NSH_NETINIT_THREAD that will do the NSH network bring-up asynchronously in parallel on a separate thread. This eliminates the (visible) networking delay altogether. This networking initialization feature by itself has some limitations:</p><ul><li><p>If no network is connected, the network bring-up will fail and the network initialization thread will simply exit. There are no retries and no mechanism to know if the network initialization was successful.</p></li><li><p>Furthermore, there is no support for detecting loss of the network connection and recovery of networking when the connection is restored.</p></li></ul><p>Both of these shortcomings can be eliminated by enabling the network monitor:</p><h2 id="network-monitor" tabindex="-1">Network Monitor <a class="header-anchor" href="#network-monitor" aria-label="Permalink to &quot;Network Monitor&quot;">​</a></h2><p>By default the network initialization thread will bring-up the network then exit, freeing all of the resources that it required. This is a good behavior for systems with limited memory.</p><p>If the CONFIG_NSH_NETINIT_MONITOR option is selected, however, then the network initialization thread will persist forever; it will monitor the network status. In the event that the network goes down (for example, if a cable is removed), then the thread will monitor the link status and attempt to bring the network back up. In this case the resources required for network initialization are never released.</p><p>Pre-requisites:</p><ul><li><p>CONFIG_NSH_NETINIT_THREAD as described above.</p></li><li><p>CONFIG_NETDEV_PHY_IOCTL. Enable PHY IOCTL commands in the Ethernet device driver. Special IOCTL commands must be provided by the Ethernet driver to support certain PHY operations that will be needed for link management. There operations are not complex and are implemented for the Atmel SAMV7 family.</p></li><li><p>CONFIG_ARCH_PHY_INTERRUPT. This is not a user selectable option. Rather, it is set when you select a board that supports PHY interrupts. In most architectures, the PHY interrupt is not associated with the Ethernet driver at all. Rather, the PHY interrupt is provided via some board-specific GPIO and the board-specific logic must provide support for that GPIO interrupt. To do this, the board logic must do two things:</p><p>(1) It must provide the function arch_phy_irq() as described and prototyped in the nuttx/include/nuttx/arch.h, and (2) it must select CONFIG_ARCH_PHY_INTERRUPT in the board configuration file to advertise that it supports arch_phy_irq(). This logic can be found at nuttx/boards/arm/samv7/same70-xplained/src/sam_ethernet.c.</p></li><li><p>One other thing: UDP support is required.</p></li></ul><p>Given those prerequisites, the network monitor can be selected with these additional settings.</p><p>Networking Support -&gt; Networking Device Support CONFIG_NETDEV_PHY_IOCTL=y : Enable PHY ioctl support</p><p>Application Configuration -&gt; NSH Library -&gt; Networking Configuration CONFIG_NSH_NETINIT_THREAD : Enable the network initialization thread CONFIG_NSH_NETINIT_MONITOR=y : Enable the network monitor CONFIG_NSH_NETINIT_RETRYMSEC=2000 : Configure the network monitor as you like</p><h1 id="usbhs-device-controller-driver" tabindex="-1">USBHS Device Controller Driver <a class="header-anchor" href="#usbhs-device-controller-driver" aria-label="Permalink to &quot;USBHS Device Controller Driver&quot;">​</a></h1><p>The USBHS device controller driver is enabled with he following configuration settings:</p><p>Device Drivers -&gt; USB Device Driver Support CONFIG_USBDEV=y : Enable USB device support For full-speed/low-power mode: CONFIG_USBDEV_DUALSPEED=n : Disable High speed support For high-speed/normal mode: CONFIG_USBDEV_DUALSPEED=y : Enable High speed support CONFIG_USBDEV_DMA=y : Enable DMA methods CONFIG_USBDEV_MAXPOWER=100 : Maximum power consumption CONFIG_USBDEV_SELFPOWERED=y : Self-powered device</p><p>System Type -&gt; SAMV7 Peripheral Selection CONFIG_SAMV7_USBDEVHS=y</p><p>System Type -&gt; SAMV7 USB High Sppeed Device Controller (DCD options For full-speed/low-power mode: CONFIG_SAMV7_USBDEVHS_LOWPOWER=y : Select low power mode For high-speed/normal mode: CONFIG_SAMV7_USBDEVHS_LOWPOWER=n : Don&#39;t select low power mode CONFIG_SAMV7_USBHS_NDTDS=32 : Number of DMA transfer descriptors CONFIG_SAMV7_USBHS_PREALLOCATE=y : Pre-allocate descriptors</p><p>As discussed in the SAMV71-XULT README, this driver will not work correctly if the write back data cache is enabled. You must have:</p><pre><code>CONFIG_ARMV7M_DCACHE_WRITETHROUGH=y
</code></pre><p>In order to be usable, you must all enabled some class driver(s) for the USBHS device controller. Here, for example, is how to configure the CDC/ACM serial device class:</p><p>Device Drivers -&gt; USB Device Driver Support CONFIG_CDCACM=y : USB Modem (CDC ACM) support CONFIG_CDCACM_EP0MAXPACKET=64 : Endpoint 0 packet size CONFIG_CDCACM_EPINTIN=1 : Interrupt IN endpoint number CONFIG_CDCACM_EPINTIN_FSSIZE=64 : Full speed packet size CONFIG_CDCACM_EPINTIN_HSSIZE=64 : High speed packet size CONFIG_CDCACM_EPBULKOUT=3 : Bulk OUT endpoint number CONFIG_CDCACM_EPBULKOUT_FSSIZE=64 : Full speed packet size CONFIG_CDCACM_EPBULKOUT_HSSIZE=512 : High speed packet size CONFIG_CDCACM_EPBULKIN=2 : Bulk IN endpoint number CONFIG_CDCACM_EPBULKIN_FSSIZE=64 : Full speed packet size CONFIG_CDCACM_EPBULKIN_HSSIZE=512 : High speed packet size CONFIG_CDCACM_NWRREQS=4 : Number of write requests CONFIG_CDCACM_NRDREQS=8 : Number of read requests CONFIG_CDCACM_BULKIN_REQLEN=96 : Size of write request buffer (for full speed) CONFIG_CDCACM_BULKIN_REQLEN=768 : Size of write request buffer (for high speed) CONFIG_CDCACM_RXBUFSIZE=257 : Serial read buffer size CONFIG_CDCACM_TXBUFSIZE=193 : Serial transmit buffer size (for full speed) CONFIG_CDCACM_TXBUFSIZE=769 : Serial transmit buffer size (for high speed) CONFIG_CDCACM_VENDORID=0x0525 : Vendor ID CONFIG_CDCACM_PRODUCTID=0xa4a7 : Product ID CONFIG_CDCACM_VENDORSTR=&quot;NuttX&quot; : Vendor string CONFIG_CDCACM_PRODUCTSTR=&quot;CDC/ACM Serial&quot; : Product string</p><p>Device Drivers -&gt; Serial Driver Support CONFIG_SERIAL_REMOVABLE=y : Support for removable serial device</p><p>The CDC/ACM application provides commands to connect and disconnect the CDC/ACM serial device:</p><pre><code>CONFIG_SYSTEM_CDCACM=y                     : Enable connect/disconnect support
CONFIG_SYSTEM_CDCACM_DEVMINOR=0            : Use device /dev/ttyACM0
CONFIG_CDCACM_RXBUFSIZE=???                : A large RX may be needed
</code></pre><p>If you include this CDC/ACM application, then you can connect the CDC/ACM serial device to the host by entering the command &#39;sercon&#39; and you detach the serial device with the command &#39;serdis&#39;. If you do no use this application, they you will have to write logic in your board initialization code to initialize and attach the USB device.</p><h1 id="mcan1-loopback-test" tabindex="-1">MCAN1 Loopback Test <a class="header-anchor" href="#mcan1-loopback-test" aria-label="Permalink to &quot;MCAN1 Loopback Test&quot;">​</a></h1><h2 id="mcan1" tabindex="-1">MCAN1 <a class="header-anchor" href="#mcan1" aria-label="Permalink to &quot;MCAN1&quot;">​</a></h2><p>SAM E70 Xplained has two MCAN modules that performs communication according to ISO11898-1 (Bosch CAN specification 2.0 part A,B) and Bosch CAN FD specification V1.0. MCAN1 is connected to an on-board ATA6561 CAN physical-layer transceiver.</p><pre><code>------- -------- -------- -------------
SAM E70 FUNCTION ATA6561  SHARED
PIN              FUNCTION FUNCTIONALITY
------- -------- -------- -------------
PC14    CANTX1   TXD      Shield
PC12    CANRX1   RXD      Shield
------- -------- -------- -------------
</code></pre><h2 id="enabling-mcan1" tabindex="-1">Enabling MCAN1 <a class="header-anchor" href="#enabling-mcan1" aria-label="Permalink to &quot;Enabling MCAN1&quot;">​</a></h2><p>These modifications may be applied to the same70-xplained/nsh configuration in order to enable MCAN1:</p><pre><code>Device Drivers -&gt; CAN Driver support
   CONFIG_CAN=y                            # Enable the upper-half CAN driver
   CONFIG_CAN_TXFIFOSIZE=8
   CONFIG_CAN_RXFIFOSIZE=8
   CONFIG_CAN_NPENDINGRTR=4

System Type -&gt; SAMV7 Peripheral Selections
   CONFIG_SAMV7_MCAN1=y                    # Enable MCAN1 as the lower-half

System Type -&gt; MCAN device driver options
   CONFIG_SAMV7_MCAN_CLKSRC_MAIN=y         # Use the MAIN clock as the source
   CONFIG_SAMV7_MCAN_CLKSRC_PRESCALER=1

System Type -&gt;MCAN device driver options -&gt; MCAN1 device driver options
   CONFIG_SAMV7_MCAN1_ISO11899_1=y         # Loopback test only support ISO11899-1
   CONFIG_SAMV7_MCAN1_LOOPBACK=y           # Needed for loopback test
   CONFIG_SAMV7_MCAN1_BITRATE=500000       # Not critical for loopback test
   CONFIG_SAMV7_MCAN1_PROPSEG=2            # Bit timing setup
   CONFIG_SAMV7_MCAN1_PHASESEG1=11         # &quot; &quot; &quot;    &quot; &quot;   &quot;
   CONFIG_SAMV7_MCAN1_PHASESEG2=11         # &quot; &quot; &quot;    &quot; &quot;   &quot;
   CONFIG_SAMV7_MCAN1_FSJW=4               # &quot; &quot; &quot;    &quot; &quot;   &quot;
   CONFIG_SAMV7_MCAN1_FBITRATE=2000000     # CAN_FD BTW mode is not used
   CONFIG_SAMV7_MCAN1_FPROPSEG=2           # &quot;    &quot; &quot; &quot; &quot;  &quot; &quot;&quot; &quot; &quot; &quot;  &quot;
   CONFIG_SAMV7_MCAN1_FPHASESEG1=4         # &quot;    &quot; &quot; &quot; &quot;  &quot; &quot;&quot; &quot; &quot; &quot;  &quot;
   CONFIG_SAMV7_MCAN1_FPHASESEG2=4         # &quot;    &quot; &quot; &quot; &quot;  &quot; &quot;&quot; &quot; &quot; &quot;  &quot;
   CONFIG_SAMV7_MCAN1_FFSJW=2              # &quot;    &quot; &quot; &quot; &quot;  &quot; &quot;&quot; &quot; &quot; &quot;  &quot;
   CONFIG_SAMV7_MCAN1_NSTDFILTERS=0        # Filters are not used in the loopback test
   CONFIG_SAMV7_MCAN1_NEXTFILTERS=0        # &quot;     &quot; &quot; &quot; &quot; &quot; &quot;  &quot; &quot;&quot; &quot; &quot; &quot;      &quot; &quot;  &quot;
   CONFIG_SAMV7_MCAN1_RXFIFO0_32BYTES=y    # Each RX FIFO0 element is 32 bytes
   CONFIG_SAMV7_MCAN1_RXFIFO0_SIZE=8       # There are 8 queue elements
   CONFIG_SAMV7_MCAN1_RXFIFO0_32BYTES=y    # Each RX FIFO1 element is 32 bytes
   CONFIG_SAMV7_MCAN1_RXFIFO0_SIZE=8       # There are 8 queue elements
   CONFIG_SAMV7_MCAN1_RXBUFFER_32BYTES=y   # Each RX BUFFER is 32 bytes
   CONFIG_SAMV7_MCAN1_TXBUFFER_32BYTES=y   # Each TX BUFFER is 32 bytes
   CONFIG_SAMV7_MCAN1_TXFIFOQ_SIZE=8       # There are 8 queue elements
   CONFIG_SAMV7_MCAN1_TXEVENTFIFO_SIZE=0   # The event FIFO is not used

Enabling the CAN Loopback Test
------------------------------
Application Configuration -&gt; Examples -&gt; CAN Example
  CONFIG_EXAMPLES_CAN=y                    # Enables the CAN test

Enabling CAN Debug Output
-------------------------
Build Setup -&gt; Debug Options
  CONFIG_DEBUG_FEATURES=y                  # Enables general debug features
  CONFIG_DEBUG_INFO=y                      # Enables verbose output
  CONFIG_DEBUG_CAN_INFO=y                  # Enables debug output from CAN

  CONFIG_STACK_COLORATION=y                # Monitor stack usage
  CONFIG_DEBUG_SYMBOLS=y                   # Needed only for use with a debugger
  CONFIG_DEBUG_NOOPT=y                     # Disables optimization

System Type -&gt; MCAN device driver options
 CONFIG_SAMV7_MCAN_REGDEBUG=y              # Super low level register debug output
</code></pre><h1 id="spi-slave" tabindex="-1">SPI Slave <a class="header-anchor" href="#spi-slave" aria-label="Permalink to &quot;SPI Slave&quot;">​</a></h1><p>An interrupt driven SPI slave driver as added on 2015-08-09 but has not been verified as of this writing. See discussion in include/nuttx/spi/slave.h and below.</p><p>I do not yet have a design that supports SPI slave DMA. And, under certain, very limited conditions, I think it can be done. Those certain conditions are:</p><p>a) The master does not tie the chip select to ground. The master must raise chip select at the end of the transfer. Then I do not need to know the length of the transfer; I can cancel the DMA when the chip is de-selected.</p><p>b) The protocol includes a dummy read after sending the command. This is very common in SPI device and should not be an issue if it is specified. This dummy read time provides time to set up the DMA. So the protocol would be:</p><pre><code>i)  Master drops the chip select.
ii) Master sends the command which will indicate whether the master
    is reading, writing, or exchanging data. The master discards the
    garbage return value.
iii) Slave is interrupted when the command word is received. The SPI
     device then decodes the command word and setups up the
     subsequent DMA.
iv) Master sends a dummy word and discards the return value. During
    the bit times to shift the dummy word, the slave has time to set
    up the DMA.
v)  Master then reads or writes (or exchanges) the data If the DMA
    is in place, the transfer should continue normally.
vi) At the end of the data transfer the master raises the chip
    select.
</code></pre><p>c) There are limitations in the word time, i.e., the time between the interrupt for each word shifted in from the master.</p><p>The controller driver will get events after the receipt of each word in ii), iv), and v). The time between each word will be:</p><pre><code>word-time = nbits * bit time + inter-word-gap
</code></pre><p>So for an 8 bit interface at 20MHz, the words will be received from the master a 8 * 50nsec = 400 nsec + inter-word-gap. That is the time during which the dummy word would be shifted and during which we receive the interrupt for the command word, interpret the command word, and to set up the DMA for the remaining word transfer. I don&#39;t think that is possible, at least not at 20 MHz.</p><p>That is far too fast even for the interrupt driven solution that I have in place now. It could not work at 20MHz. If we suppose that interrupt processing is around 1 usec, then an 8 bit interface could not have bit times more than 125 nsec or 8 KHz. Interrupt handling should be faster than 1 usec, but not a lot faster. I have not benchmarked it. NuttX also supports special, zero latency interrupts that could bring the interrupt time down even more.</p><p>Note that we would also have a little more processing time if you used 16-bit SPI word size.</p><p>Note also that the interrupt driven approach would have this same basic performance limitation with the additional disadvantage that:</p><p>a) The driver will receive two interrupts per word exchanged:</p><pre><code>i)  One interrupt will be received when the word is shifted in from
    the master (at the end of 8-bit times). This is a data received
    interrupt.

ii) And another interrupt when the next words moved to the shift-out
    register, freeing up the transmit holding register. This is the
    data sent interrupt.

The ii) event should be very soon after the i) event.

Without DMA, the only way to reduce the interrupt rate would be to
add interrupt-level polling to detect the when transmit holding
register is available. That is not really a good idea.
</code></pre><p>b) It will hog all of the CPU for the duration of the transfer).</p><h1 id="click-shield" tabindex="-1">Click Shield <a class="header-anchor" href="#click-shield" aria-label="Permalink to &quot;Click Shield&quot;">​</a></h1><p>In the mrf24j40-starhub configuration, a click shield from MikroElectronika was used along with a Click &quot;Bee&quot; module. The click shield supports two click shields and the following tables describe the relationship between the pins on each click shield, the Arduino connector and the SAME70 pins.</p><hr><p>mikroBUS1 Arduino SAME70 mikroBUS2 Arduino SAME70</p><hr><p>AN HD1 A0 AN0 Pin 1 AD0 PD26 AN HD1 A1 AN1 Pin 2 AD1 PC31 RST HD1 A3 Pin 4 AD3 PA19 RST HD1 A2 Pin 3 AD2 PD30 CS HD4 D10 SPI-SS Pin 8 D10 PD25 CS HD4 D9 Pin 9 D9 PC9 SCK HD4 D13 SPI-SCK Pin 5 D13 PD22 SCK Same MISO HD4 D12 SPI-MISO Pin 6 D12 PD20 MISO Same MOSI HD4 D11 SPI-MOSI Pin 7 D11 PD21 MOSI Same 3.3V N/A 3.3V N/A GND N/A GND N/A PWM HD3 D6 PWMA Pin 2 D6 PC19 PWM HD3 D5 PWMB Pin 5 D5 PD11 INT HD3 D2 INT0 Pin 6 D2 PA5 INT HD3 D3 INT1 Pin 5 D3 PA6 RX HD3 D0 HDR-RX* Pin 8 D0 PD28 RX Same TX HD3 D1 HDR-TX* Pin 7 D1 PD30 TX Same SCL HD1 A5 I2C-SCL Pin 5 AD5 PC30 SDA Same SDA HD1 A4 I2C-SDA Pin 6 AD4 PC13 SCL Same 5V N/A 5V N/A GND N/A GND N/A --------- ---------------------- -------- ---------</p><hr><ul><li>Depends upon setting of SW1, UART vs PROG.</li></ul><hr><p>PIN PORT SHIELD FUNCTION SAME70PIN CONFIGURATION</p><hr><p>AD0 PD26 microBUS2 Analog TD PD26 *** Not an AFE pin *** AD1 PC31 microBUS2 Analog PC31 AFE1_AD6 GPIO_AFE1_AD6 AD2 PD30 microBUS2 GPIO reset output PD30 AD3 PA19 microBUS1 GPIO reset output PA19 AD4 PC13 (both) I2C-SDA PC13 *** Does not support I2C SDA *** AD5 PC30 (both) I2C-SCL PC30 *** Does not support I2C SCL *** AD6 PA17 *** Not used *** AD7 PC12 *** Not used *** D0 PD28 (both) HDR_RX PD28 URXD3 GPIO_UART3_RXD D1 PD30 (both) HDR_TX PD30 UTXD3 GPIO_UART3_TXD_1 D2 PA5 microBUS1 GPIO interrupt input PA5 D3 PA6 microBUS2 GPIO interrupt input PA6 D4 PD27 *** Not used *** D5 PD11 microBUS2 PWMB PD11 PWMC0_H0 D6 PC19 microBUS1 PWMA PC19 PWMC0_H2 D7 PA2 *** Not used *** D8 PA17 *** Not used *** D9 PC9 microBUS2 CS GPIO output PC9 D10 PD25 microBUS1 CS GPIO output PD25 SPI0_NPCS1 D11 PD21 (both) SPI-MOSI PD21 SPI0_MOSI GPIO_SPI0_MOSI D12 PD20 (both) SPI-MISO PD20 SPI0_MISO GPIO_SPI0_MISO D13 PD22 (both) SPI-SCK PD22 SPI0_SPCK GPIO_SPI0_SPCK</p><p>NOTE: The click shield fits close to the Arduino connect and cannot be installed directly because it hits the RJ45 connector. You have to get some extra Arduino connectors to raise the Click shield so that it clears the RJ45.</p><p>This may be a problem only for me because the Arduino connectors that I soldered onto the SAME70-Xplained are short (around 10mm clearance from the board). Taller headers might clear the RJ45 connector (around 15mm).</p><p>NOTE: Mikroelektronika provides two different click shields: A UNO style shield with two click mikroBUSes and a larger Mega shield with three click mikroBUSes. The above discusses on the UNO shield. I know that the serial ports, at least, differ on the two shields.</p><p>UPDATE: And it appears that the Mega shield is <em>not</em> compatible with the SAME70-Xplained. I am told that the SPI in mikroBUS slots does not connect to pins on the SAME70-Xplained that can support the SPI communications. Avoid this triple mikroBUS shield!</p><h1 id="tickless-os" tabindex="-1">Tickless OS <a class="header-anchor" href="#tickless-os" aria-label="Permalink to &quot;Tickless OS&quot;">​</a></h1><h2 id="background" tabindex="-1">Background <a class="header-anchor" href="#background" aria-label="Permalink to &quot;Background&quot;">​</a></h2><p>By default, a NuttX configuration uses a periodic timer interrupt that drives all system timing. The timer is provided by architecture-specific code that calls into NuttX at a rate controlled by CONFIG_USEC_PER_TICK. The default value of CONFIG_USEC_PER_TICK is 10000 microseconds which corresponds to a timer interrupt rate of 100 Hz.</p><p>An option is to configure NuttX to operation in a &quot;tickless&quot; mode. Some limitations of default system timer are, in increasing order of importance:</p><ul><li>Overhead: Although the CPU usage of the system timer interrupt at 100Hz is really very low, it is still mostly wasted processing time. One most timer interrupts, there is really nothing that needs be done other than incrementing the counter.</li><li>Resolution: Resolution of all system timing is also determined by CONFIG_USEC_PER_TICK. So nothing that be time with resolution finer than 10 milliseconds be default. To increase this resolution, CONFIG_USEC_PER_TICK an be reduced. However, then the system timer interrupts use more of the CPU bandwidth processing useless interrupts.</li><li>Power Usage: But the biggest issue is power usage. When the system is IDLE, it enters a light, low-power mode (for ARMs, this mode is entered with the wfi or wfe instructions for example). But each interrupt awakens the system from this low power mode. Therefore, higher rates of interrupts cause greater power consumption.</li></ul><p>The so-called Tickless OS provides one solution to issue. The basic concept here is that the periodic, timer interrupt is eliminated and replaced with a one-shot, interval timer. It becomes event driven instead of polled: The default system timer is a polled design. On each interrupt, the NuttX logic checks if it needs to do anything and, if so, it does it.</p><p>Using an interval timer, one can anticipate when the next interesting OS event will occur, program the interval time and wait for it to fire. When the interval time fires, then the scheduled activity is performed.</p><h2 id="configuration-1" tabindex="-1">Configuration <a class="header-anchor" href="#configuration-1" aria-label="Permalink to &quot;Configuration&quot;">​</a></h2><p>The following configuration options will enable support for the Tickless OS for the SAMV7 platforms using TC0 channels 0-3 (other timers or timer channels could be used making the obvious substitutions):</p><pre><code>RTOS Features -&gt; Clocks and Timers
  CONFIG_SCHED_TICKLESS=y          : Configures the RTOS in tickless mode
  CONFIG_SCHED_TICKLESS_ALARM=n    : (option not implemented)
  CONFIG_SCHED_TICKLESS_LIMIT_MAX_SLEEP=y

System Type -&gt; SAMV7 Peripheral Support
  CONFIG_SAMV7_TC0=y               : Enable TC0 (TC channels 0-3

System Type -&gt; Timer/counter Configuration
  CONFIG_SAMV7_ONESHOT=y           : Enables one-shot timer wrapper
  CONFIG_SAMV7_FREERUN=y           : Enabled free-running timer wrapper
  CONFIG_SAMV7_TICKLESS_ONESHOT=0  : Selects TC0 channel 0 for the one-shot
  CONFIG_SAMV7_TICKLESS_FREERUN=1  : Selects TC0 channel 1 for the free-
                                   : running timer
</code></pre><p>The resolution of the clock is provided by the CONFIG_USEC_PER_TICK setting in the configuration file.</p><p>NOTE: In most cases, the slow clock will be used as the timer/counter input. The SAME70-Xplained board has pads for a 32.768KHz crystal, however, the boad ships with that position unpopulated. So, be default this will probably end up using the slow RC oscillator which will give you very bad timing.</p><p>If you add a crystal to your board, you can select to use it with the definition BOARD_HAVE_SLOWXTAL in the boards/arm/samv7/same70-xplained/board.h file.</p><p>The slow clock has a resolution of about 30.518 microseconds. Ideally, the value of CONFIG_USEC_PER_TICK should be the exact clock resolution. Otherwise there will be cumulative timing inaccuracies. But a choice choice of:</p><pre><code>CONFIG_USEC_PER_TICK=31
</code></pre><p>will have an error of 0.6% and will have inaccuracies that will effect the time due to long term error build-up.</p><p>Using the slow clock input, the Tickless support is functional, however, there are inaccuracies in delays. For example,</p><pre><code>nsh&gt; sleep 10
</code></pre><p>results in a delay of maybe 5.4 seconds. But the timing accuracy is correct if all competing uses of the interval timer are disabled (mostly from the high priority work queue). Therefore, I conclude that this inaccuracy is due to the inaccuracies in the representation of the clock rate. 30.518 usec cannot be represented accurately. Each timing calculation results in a small error. When the interval timer is very busy, long delays will be divided into many small pieces and each small piece has a large error in the calculation. The cumulative error is the cause of the problem.</p><p>Solution: The same70-xplained/src/sam_boot.c file has additional logic to enable the programmable clock PCK6 as a clock source for the timer/counters if the Tickless mode is selected. The ideal frequency would be:</p><pre><code>frequency = 1,000,000 / CONFIG_USEC_PER_TICK
</code></pre><p>The main crystal is selected as the frequency source. The maximum prescaler value is 256 so the minimum frequency is 46,875 Hz which corresponds to a period of 21.3 microseconds. A value of CONFIG_USEC_PER_TICK=20, or 50KHz, would give an exact solution with a divider of 240.</p><h2 id="same70-timer-usage" tabindex="-1">SAME70 Timer Usage <a class="header-anchor" href="#same70-timer-usage" aria-label="Permalink to &quot;SAME70 Timer Usage&quot;">​</a></h2><p>This current implementation uses two timers: A one-shot timer to provide the timed events and a free running timer to provide the current time. Since timers are a limited resource, that could be an issue on some systems.</p><p>We could do the job with a single timer if we were to keep the single timer in a free-running at all times. The SAME70 timer/counters have 16-bit counters with the capability to generate a compare interrupt when the timer matches a compare value but also to continue counting without stopping (giving another, different interrupt when the timer rolls over from 0xffff to zero). So we could potentially just set the compare at the number of ticks you want PLUS the current value of timer. Then you could have both with a single timer: An interval timer and a free- running counter with the same timer! In this case, you would want to to set CONFIG_SCHED_TICKLESS_ALARM in the NuttX configuration.</p><p>Patches are welcome!</p><h1 id="debugging" tabindex="-1">Debugging <a class="header-anchor" href="#debugging" aria-label="Permalink to &quot;Debugging&quot;">​</a></h1><h2 id="edbg" tabindex="-1">EDBG <a class="header-anchor" href="#edbg" aria-label="Permalink to &quot;EDBG&quot;">​</a></h2><p>The on-board EDBG appears to work only with Atmel Studio. You can however, simply connect a SAM-ICE or J-Link to the JTAG/SWD connector on the board and that works great. The only tricky thing is getting the correct orientation of the JTAG connection.</p><h2 id="j-link-jtag" tabindex="-1">J-Link/JTAG <a class="header-anchor" href="#j-link-jtag" aria-label="Permalink to &quot;J-Link/JTAG&quot;">​</a></h2><p>I have been using Atmel Studio to write code to flash then I use the Segger J-Link GDB server to debug. I have been using the &#39;Device Programming&#39; I available under the Atmel Studio &#39;Tool&#39; menu. I have to disconnect the SAM-ICE while programming with the EDBG. I am sure that you could come up with a GDB server-only solution if you wanted.</p><p>I run GDB like this from the directory containing the NuttX ELF file:</p><pre><code>arm-none-eabi-gdb
(gdb) target remote localhost:2331
(gdb) mon reset
(gdb) file nuttx
(gdb) ... start debugging ...
</code></pre><h2 id="openocd-edbg" tabindex="-1">OpenOCD/EDBG <a class="header-anchor" href="#openocd-edbg" aria-label="Permalink to &quot;OpenOCD/EDBG&quot;">​</a></h2><p>Current OpenOCD also works with SAME70-Xplained via EDBG, but I have not used OpenOCD with the board.</p><h2 id="sam-ba" tabindex="-1">SAM-BA <a class="header-anchor" href="#sam-ba" aria-label="Permalink to &quot;SAM-BA&quot;">​</a></h2><p>SAM-BA is another option. With SAM-BA, you can load code into FLASH over a serial port or USB connection by booting into the ROM bootloader.</p><h2 id="cmsis-dap-programmer" tabindex="-1">CMSIS-DAP Programmer <a class="header-anchor" href="#cmsis-dap-programmer" aria-label="Permalink to &quot;CMSIS-DAP Programmer&quot;">​</a></h2><p>Another useful tool for CMSIS-DAP programmer (formerly Atmel EDBG programmer) available at:</p><pre><code>https://github.com/ataradov/edbg
</code></pre><p>This is a simple command line utility for programming ARM-based MCUs (currently only Atmel) though CMSIS-DAP SWD interface. It works on Linux, macOS and Windows. Very useful to around especially if you have the following issue:</p><h2 id="booting-to-flash-or-the-rom-bootloader" tabindex="-1">Booting to FLASH or the ROM Bootloader <a class="header-anchor" href="#booting-to-flash-or-the-rom-bootloader" aria-label="Permalink to &quot;Booting to FLASH or the ROM Bootloader&quot;">​</a></h2><p>If you use EDBG or JTAG to load code into FLASH, you may be puzzled why the code does not run. It may be that you are booting into the ROM bootloader instead of FLASH. That can be fixed by modifying the SAME70&#39;s GPNVM bits.</p><p>If your SAME70 is booting in ROM by default, the GPNVM bits will probably looking something like:</p><pre><code>$ edbg.exe -F r,:, -t atmel_cm7
GPNVM Bits: 0x40
</code></pre><p>Where bit 1 = 0 boots into the ROM bootloader and bit 1 = 1 boots into FLASH. You want:</p><pre><code>$ edbg.exe -F r,:, -t atmel_cm7
GPNVM Bits: 0x42
</code></pre><p>If you are trying to use SAM-BA, you might have the opposity problem: The board might be booting into FLASH when you need it to boot into the ROM bootloader.</p><p>That GPNVM bit can be changed using CMSIS-DAP programmer, Atmel studio, or using this OpenOCD setup:</p><pre><code>atsamv gpnvm [(&#39;clr&#39;|&#39;set&#39;|&#39;show&#39;) bitnum]
  Without arguments, shows all bits in the gpnvm register.
  Otherwise, clears, sets, or shows one General Purpose Non-Volatile
  Memory (gpnvm) bit.
</code></pre><p>Perhaps SAM-BA supports a way to do this as well???</p><h1 id="using-openocd-and-gdb-to-flash-via-the-edbg-chip" tabindex="-1">Using OpenOCD and GDB to flash via the EDBG chip <a class="header-anchor" href="#using-openocd-and-gdb-to-flash-via-the-edbg-chip" aria-label="Permalink to &quot;Using OpenOCD and GDB to flash via the EDBG chip&quot;">​</a></h1><p>Building OpenOCD under Cygwin:</p><pre><code>Refer to boards/olimex-lpc1766stk/README.txt
</code></pre><p>Installing OpenOCD in Linux (but see note below):</p><pre><code>sudo apt-get install openocd
</code></pre><p>NOTE: At the time of writing installing the above openocd package from the distribution (Ubuntu 14.04) was not enough to get the latest openocd version supporting the SAME70 Xplained.</p><p>The code was obtained from the OpenOCD git repository, available at <a href="https://github.com/ntfreak/openocd" target="_blank" rel="noreferrer">https://github.com/ntfreak/openocd</a>.</p><pre><code>git clone https://github.com/ntfreak/openocd.git
</code></pre><p>Then follow the directions of the &quot;Building OpenOCD&quot; section of their README, but be sure to configure including the CMSIS-DAP interface:</p><pre><code>./bootstrap
./configure --enable-cmsis-dap
make
sudo make install
</code></pre><p>If your configure step fails, you might be missing some dependencies, i.e.:</p><pre><code>sudo apt-get install libhidapi-dev
</code></pre><p>Helper Scripts.</p><pre><code>OpenOCD requires a configuration file.  I keep the one I used last here:

  boards/arm/samv7/common/tools/atmel_same70_xplained.cfg

However, the &quot;correct&quot; configuration script to use with OpenOCD may
change as the features of OpenOCD evolve.  So you should at least
compare that atmel_same70_xplained.cfg file with configuration files in
/usr/share/openocd/scripts.  As of this writing, the configuration
files of interest were:

  /usr/share/openocd/scripts/interface/cmsis-dap.cfg
  /usr/share/openocd/scripts/board/atmel_same70_xplained.cfg
  /usr/share/openocd/scripts/target/atsamv.cfg

There is also a script on the tools/ directory that I use to start
the OpenOCD daemon on my system called oocd.sh.  That script will
probably require some modifications to work in another environment:

- Possibly the value of OPENOCD_PATH, TARGET_PATH and TARGET_BOARD
- It assumes that the correct script to use is the one at
  boards/arm/samv7/common/tools/atmel_\${TARGET_BOARD}.cfg
</code></pre><p>Starting OpenOCD</p><pre><code>Then you should be able to start the OpenOCD daemon like:

  boards/arm/samv7/common/tools/oocd.sh $PWD
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
</code></pre><h1 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h1><h2 id="information-common-to-all-configurations" tabindex="-1">Information Common to All Configurations <a class="header-anchor" href="#information-common-to-all-configurations" aria-label="Permalink to &quot;Information Common to All Configurations&quot;">​</a></h2><p>Each SAME70-XPLD configuration is maintained in a sub-directory and can be selected as follow:</p><p>tools/configure.sh same70-xplained:<code>&lt;subdir&gt;</code></p><p>Before building, make sure that the PATH environment variable include the correct path to the directory than holds your toolchain binaries.</p><p>And then build NuttX by simply typing the following. At the conclusion of the make, the nuttx binary will reside in an ELF file called, simply, nuttx.</p><p>make oldconfig make</p><p>The <code>&lt;subdir&gt;</code> that is provided above as an argument to the tools/configure.sh must be is one of the following.</p><p>NOTES:</p><ol><li>These configurations use the mconf-based configuration tool. To change any of these configurations using that tool, you should:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- --&gt;</span></span></code></pre></div><pre><code>a. Build and install the kconfig-mconf tool.  See nuttx/README.txt
   see additional README.txt files in the NuttX tools repository.

b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the
   reconfiguration process.
</code></pre><ol start="2"><li><p>Unless stated otherwise, all configurations generate console output on USART1 (the EDBG VCOM)</p><p>NOTE: When USART1 is used, the pin PB4 is reconfigured. Normally, PB4 is TDI. When it is reconfigured for use with USART1, the capability to debug is lost! If you plan to debug you should most certainly not use USART1. UART3 might be a good option (the Arduino RXD/TXD):</p><p>-CONFIG_SAMV7_USART1=y -CONFIG_USART1_SERIALDRIVER=y -CONFIG_USART1_SERIAL_CONSOLE=y -CONFIG_USART1_RXBUFSIZE=256 -CONFIG_USART1_TXBUFSIZE=256 -CONFIG_USART1_BAUD=115200 -CONFIG_USART1_BITS=8 -CONFIG_USART1_PARITY=0 -CONFIG_USART1_2STOP=0</p><p>+CONFIG_SAMV7_UART3=y +CONFIG_UART3_SERIAL_CONSOLE=y +CONFIG_UART3_RXBUFSIZE=256 +CONFIG_UART3_TXBUFSIZE=256 +CONFIG_UART3_BAUD=115200 +CONFIG_UART3_BITS=8 +CONFIG_UART3_PARITY=0 +CONFIG_UART3_2STOP=0</p><p>UART3 is not the default because (1) the placement of the RJ-45 connector makes it difficult to install Arduino shield cards and (2) the Arduino connectors are not populated on the board as it comes from the factory.</p></li><li><p>All of these configurations are set up to build under Windows using the &quot;GNU Tools for ARM Embedded Processors&quot; that is maintained by ARM (unless stated otherwise in the description of the configuration).</p><p><a href="https://developer.arm.com/open-source/gnu-toolchain/gnu-rm" target="_blank" rel="noreferrer">https://developer.arm.com/open-source/gnu-toolchain/gnu-rm</a></p><p>That toolchain selection can easily be reconfigured using &#39;make menuconfig&#39;. Here are the relevant current settings:</p><p>Build Setup: CONFIG_HOST_WINDOWS=y : Window environment CONFIG_WINDOWS_CYGWIN=y : Cywin under Windows</p><p>System Type -&gt; Toolchain: CONFIG_ARM_TOOLCHAIN_GNU_EABI=y : GNU ARM EABI toolchain</p><p>NOTE: As of this writing, there are issues with using this tool at the -Os level of optimization. This has not been proven to be a compiler issue (as least not one that might not be fixed with a well placed volatile qualifier). However, in any event, it is recommend that you use not more that -O2 optimization.</p></li></ol><h2 id="configuration-sub-directories" tabindex="-1">Configuration sub-directories <a class="header-anchor" href="#configuration-sub-directories" aria-label="Permalink to &quot;Configuration sub-directories&quot;">​</a></h2><p>adc</p><pre><code>This is a basic nsh configuration (se below) with added example for
ADC (AFEC) driver. Data can be read through channel AFE0_AD0 by
running application &quot;adc&quot; in NuttShell.

The ADC is triggered by Timer/counter at 1 kHz frequency and uses
DMA to transfer samples. Number of transferred samples can be set
by configuring CONFIG_SAMV7_AFEC_DMASAMPLES.
</code></pre><p>can</p><pre><code>An nsh configuration (see below) with added support for MCAN driver.
The purpose of the configuration is mainly to track whether changes
to SAMv7 MCAN driver do not cause build errors and warnings.
</code></pre><p>mrf24j40-starhub</p><pre><code>This configuration implements a hub node in a 6LoWPAN start network.
It is intended for the us the mrf24j40-starpoint configuration with
the clicker2-stm32 configurations.  Essentially, the SAME70 Xplained
plays the roll of the hub in the configuration and the clicker2-stm32
boards are the endpoints in the start.

NOTES:

1. The serial console is configured by default for use with and Arduino
   serial shield (UART3).  You will need to reconfigure if you will
   to use a different U[S]ART.

2. This configuration derives from the netnsh configuration, but adds
   support for IPv6, 6LoWPAN, and the MRF24J40 IEEE 802.15.4 radio.

3. This configuration uses the Mikroe BEE MRF24j40 click boards and
   connects to the SAMV71-XULT using a click shield as described above.

4. You must must have also have at least two clicker2-stm32 boards each
   with an  MRF24J40 BEE click board in order to run these tests.

5. The network initialization thread is NOT enabled.  As a result, the
   startup will hang if the Ethernet cable is not plugged in.  For more
   information, see the paragraphs above entitled &quot;Network Initialization
   Thread&quot; and &quot;Network Monitor&quot;.

6. Telnet:  The clicker2-stm32 star point configuration supports the
   Telnet daemon, but not the Telnet client; the star hub configuration
   supports both the Telnet client and the Telnet daemon.  Therefore,
   the star hub can Telnet to any point in the star, but the star
   endpoints cannot initiate telnet sessions.  Any host connected via
   Ethernet can Telnet to the SAME70 Xplained hub or to any Clicker2
   point in the star.

7. TCP and UDP Tests:  The same TCP and UDP tests as described for
   the clicker2-stm32 mrf24j40-starpoint configuration are supported on
   the star endpoints, but NOT on the star hub.  Therefore, all network
   testing is between endpoints with the hub acting, well, only like a
   hub.

   The nsh&gt; dmesg command can be use at any time on any endpoint node
   to see any debug output that you have selected.  Debug output on the
   hub will be presented on stdout.

   Telenet sessions may be initiated only from the hub to a star
   endpoint:

     C: nsh&gt; telnet &lt;server-ip&gt; &lt;-- Runs the Telnet client

   Where &lt;server-ip&gt; is the IP address of either the E1 or I2 endpoints.

STATUS:
  2017-08-16:  Configurations added.  Initially, I saw hangs i
    mrf24j40_reset() before the NSH appears on the serial console.
    Unlike the SAMV71-XULT, the SPI looks clean, but was hanging
    nevertheless.

    Then, on subsequent testing, it &quot;magically&quot; started behaving
    properaly and seems quite stable now.. although I did nothing to
    solve the problem.  Perhaps the radio was in a bad state for awhile;
    perhaps something I did masked the problem.  However, all is well
    for the time being.

    No significant functional testing has yet been performed.

  2017-08-26:  There was only a single buffer for reassemblying larger
    packets.  This could be a problem issue for the hub configuration
    which really needs the capability concurrently reassemble multiple
    incoming streams.  The design was extended to support multiple
    reassembly buffers but have not yet been verified on this platform.
</code></pre><p>netnsh:</p><pre><code>Configures the NuttShell (nsh) located at examples/nsh.  There are two
very similar NSH configurations:

  - nsh.  This configuration is focused on low level, command-line
    driver testing.  It has no network.
  - netnsh.  This configuration is focused on network testing and
    has only limited command support.

NOTES:

1. The serial console is configured by default for use with the EDBG VCOM
   (USART1).  You will need to reconfigure if you will to use a different
   U[S]ART.  See &quot;Information Common to All Configurations&quot; above.

2. Default stack sizes are large and should really be tuned to reduce
   the RAM footprint:

     CONFIG_SCHED_HPWORKSTACKSIZE=2048
     CONFIG_IDLETHREAD_STACKSIZE=1024
     CONFIG_INIT_STACKSIZE=2048
     CONFIG_PTHREAD_STACK_MIN=256
     CONFIG_PTHREAD_STACK_DEFAULT=2048
     CONFIG_POSIX_SPAWN_DEFAULT_STACKSIZE=2048
     CONFIG_SYSTEM_TELNETD_STACKSIZE=2048
     CONFIG_SYSTEM_TELNETD_SESSION_STACKSIZE=2048

3. NSH built-in applications are supported.  There are, however, no
   enabled built-in applications.

   Binary Formats:
     CONFIG_BUILTIN=y           : Enable support for built-in programs

   Application Configuration:
     CONFIG_NSH_BUILTIN_APPS=y  : Enable starting apps from NSH command line

4. The network initialization thread and the NSH network monitor are
   enabled in this configuration. As a result, networking initialization
   is performed asynchronously with NSH bring-up.  For more information,
   see the paragraphs above entitled &quot;Network Initialization Thread&quot; and
   &quot;Network Monitor&quot;.

5. SDRAM is NOT enabled in this configuration.

6. TWI/I2C

   TWIHS0 is enabled in this configuration.  The SAM E70 Xplained
   supports one devices on the one on-board I2C device on the TWIHS0 bus:
   The AT24MAC402 serial EEPROM described above.
   Relevant configuration settings:

     CONFIG_SAMV7_TWIHS0=y
     CONFIG_SAMV7_TWIHS0_FREQUENCY=100000

     CONFIG_I2C=y

7. TWIHS0 is used to support 256 byte non-volatile storage.  This EEPROM
   holds the assigned MAC address which is necessary for networking. The
   EEPROM is also available for storage of configuration data using the
   MTD configuration as described above under the heading, &quot;MTD
   Configuration Data&quot;.

8. Support for HSMCI is built-in by default. The SAME70-XPLD provides
   one full-size SD memory card slot.  Refer to the section entitled
   &quot;SD card&quot; for configuration-related information.

   See &quot;Open Issues&quot; above for issues related to HSMCI.

   The auto-mounter is not enabled.  See the section above entitled
   &quot;Auto-Mounter&quot;.

9. Performance-related Configuration settings:

   CONFIG_ARMV7M_ICACHE=y                : Instruction cache is enabled
   CONFIG_ARMV7M_DCACHE=y                : Data cache is enabled
   CONFIG_ARMV7M_DCACHE_WRITETHROUGH=y   : Write through mode
   CONFIG_ARCH_FPU=y                     : H/W floating point support is enabled
   CONFIG_ARCH_DPFPU=y                   : 64-bit H/W floating point support is enabled

   # CONFIG_ARMV7M_ITCM is not set       : Support not yet in place
   # CONFIG_ARMV7M_DTCM is not set       : Support not yet in place

   I- and D-Caches are enabled but the D-Cache must be enabled in write-
   through mode.  This is to work around issues with the RX and TX
   descriptors with are 8-bytes in size.  But the D-Cache cache line
   size is 32-bytes.  That means that you cannot reload, clean or
   invalidate a descriptor without also effecting three neighboring
   descriptors. Setting write through mode eliminates the need for
   cleaning the D-Cache.  If only reloading and invalidating are done,
   then there is no problem.

   Stack sizes are also large to simplify the bring-up and should be
   tuned for better memory usages.

STATUS:
2015-03-29:  I- and D-caches are currently enabled, but as noted
  above, the D-Cache must be enabled in write-through mode.  Also -Os
  optimization is not being used (-O2).  If the cache is enabled in
  Write-Back mode or if higher levels of optimization are enabled, then
  there are failures when trying to ping the target from a host.
</code></pre><p>nsh:</p><pre><code>Configures the NuttShell (nsh) located at examples/nsh.  There are two
very similar NSH configurations:

  - nsh.  This configuration is focused on low level, command-line
    driver testing.  It has no network.
  - netnsh.  This configuration is focused on network testing and
    has only limited command support.

NOTES:

1. The serial console is configured by default for use with the EDBG VCOM
   (USART1).  You will need to reconfigure if you will to use a different
   U[S]ART.  See &quot;Information Common to All Configurations&quot; above.

2. Default stack sizes are large and should really be tuned to reduce
   the RAM footprint:

     CONFIG_ARCH_INTERRUPTSTACK=2048
     CONFIG_IDLETHREAD_STACKSIZE=1024
     CONFIG_INIT_STACKSIZE=2048
     CONFIG_PTHREAD_STACK_DEFAULT=2048
     ... and others ...

3. NSH built-in applications are supported.

   Binary Formats:
     CONFIG_BUILTIN=y           : Enable support for built-in programs

   Application Configuration:
     CONFIG_NSH_BUILTIN_APPS=y  : Enable starting apps from NSH command line

4. SDRAM is enabled in this configuration.  Here are the relevant
   configuration settings:

   System Type
     CONFIG_SAMV7_SDRAMC=y
     CONFIG_SAMV7_SDRAMSIZE=2097152

   SDRAM is not added to the heap in this configuration.  To do that
   you would need to set CONFIG_SAMV7_SDRAMHEAP=y and CONFIG_MM_REGIONS=2.
   Instead, the SDRAM is set up so that is can be used with a destructive
   RAM test enabled with this option:

   Application Configuration:
     CONFIG_TESTING_RAMTEST=y

   The RAM test can be executed as follows:

     nsh&gt; ramtest -w 70000000 2097152

     NuttShell (NSH) NuttX-7.8
     nsh&gt; ramtest -w 70000000 2097152
     RAMTest: Marching ones: 70000000 2097152
     RAMTest: Marching zeroes: 70000000 2097152
     RAMTest: Pattern test: 70000000 2097152 55555555 aaaaaaaa
     RAMTest: Pattern test: 70000000 2097152 66666666 99999999
     RAMTest: Pattern test: 70000000 2097152 33333333 cccccccc
     RAMTest: Address-in-address test: 70000000 2097152
     nsh&gt;

5. TWI/I2C

   TWIHS0 is enabled in this configuration.  The SAM E70 Xplained
   supports one device on the one on-board I2C device on the TWIHS0 bus:
   The AT24MAC402 serial EEPROM described above.

   In this configuration, the I2C tool at apps/system/i2ctool is
   enabled.  This tools supports interactive access to I2C devices on
   the enabled TWIHS bus.  Relevant configuration settings:

     CONFIG_SAMV7_TWIHS0=y
     CONFIG_SAMV7_TWIHS0_FREQUENCY=100000

     CONFIG_I2C=y

     CONFIG_SYSTEM_I2CTOOL=y
     CONFIG_I2CTOOL_MINBUS=0
     CONFIG_I2CTOOL_MAXBUS=0
     CONFIG_I2CTOOL_MINADDR=0x03
     CONFIG_I2CTOOL_MAXADDR=0x77
     CONFIG_I2CTOOL_MAXREGADDR=0xff
     CONFIG_I2CTOOL_DEFFREQ=400000

   Example usage:

     nsh&gt; i2c
     Usage: i2c &lt;cmd&gt; [arguments]
     Where &lt;cmd&gt; is one of:

       Show help     : ?
       List buses    : bus
       List devices  : dev [OPTIONS] &lt;first&gt; &lt;last&gt;
       Read register : get [OPTIONS] [&lt;repetitions&gt;]
       Show help     : help
       Write register: set [OPTIONS] &lt;value&gt; [&lt;repetitions&gt;]
       Verify access : verf [OPTIONS] [&lt;value&gt;] [&lt;repetitions&gt;]

     Where common &quot;sticky&quot; OPTIONS include:
       [-a addr] is the I2C device address (hex).  Default: 03 Current: 03
       [-b bus] is the I2C bus number (decimal).  Default: 0 Current: 0
       [-r regaddr] is the I2C device register address (hex).  Default: 00 Current: 00
       [-w width] is the data width (8 or 16 decimal).  Default: 8 Current: 8
       [-s|n], send/don&#39;t send start between command and data.  Default: -n Current: -n
       [-i|j], Auto increment|don&#39;t increment regaddr on repetitions.  Default: NO Current: NO
       [-f freq] I2C frequency.  Default: 400000 Current: 400000

     NOTES:
     o An environment variable like $PATH may be used for any argument.
     o Arguments are &quot;sticky&quot;.  For example, once the I2C address is
       specified, that address will be reused until it is changed.

     WARNING:
     o The I2C dev command may have bad side effects on your I2C devices.
       Use only at your own risk.
     nsh&gt; i2c bus
      BUS   EXISTS?
     Bus 0: YES
     nsh&gt; i2c dev 3 77
          0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
     00:          -- -- -- -- -- -- -- -- -- -- -- -- --
     10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
     20: -- -- -- -- -- -- -- -- 28 -- -- -- -- -- -- --
     30: -- -- -- -- -- -- -- 37 -- -- -- -- -- -- -- --
     40: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
     50: -- -- -- -- -- -- -- 57 -- -- -- -- -- -- -- 5f
     60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
     70: -- -- -- -- -- -- -- --

   Where 0x28 is the address of TWI interface to the EDBG and 0x57 and
   0x5f are the addresses of the AT24 EEPROM (I am not sure what the
   other address, 0x37, is as this writing).

6. TWIHS0 is also used to support 256 byte non-volatile storage for
   configuration data using the MTD configuration as described above
   under the heading, &quot;MTD Configuration Data&quot;.

7. Support for HSMCI is built-in by default. The SAME70-XPLD provides
   one full-size SD memory card slot.  Refer to the section entitled
   &quot;SD card&quot; for configuration-related information.

   See &quot;Open Issues&quot; above for issues related to HSMCI.

   The auto-mounter is not enabled.  See the section above entitled
   &quot;Auto-Mounter&quot;.

8. Performance-related Configuration settings:

   CONFIG_ARMV7M_ICACHE=y                : Instruction cache is enabled
   CONFIG_ARMV7M_DCACHE=y                : Data cache is enabled
   CONFIG_ARMV7M_DCACHE_WRITETHROUGH=n   : Write back mode
   CONFIG_ARCH_FPU=y                     : H/W floating point support is enabled
   CONFIG_ARCH_DPFPU=y                   : 64-bit H/W floating point support is enabled

   # CONFIG_ARMV7M_ITCM is not set       : Support not yet in place
   # CONFIG_ARMV7M_DTCM is not set       : Support not yet in place

   Stack sizes are also large to simplify the bring-up and should be
   tuned for better memory usages.

STATUS:
2015-03-28: HSMCI TX DMA is disabled.  There are some issues with the TX
  DMA that need to be corrected.
</code></pre><p>twm4nx:</p><pre><code>This configuration exercises the port of TWM to NuttX.  A description of
that port is available at apps/graphics/twm4nx/README.txt.  This
configuration uses the NuttX VNC server to provide a remote desktop for
use with VNC client on a PC.  No display, mouse, or keyboard devices are
needed.

NOTES:

1. Network configuration:  IP address 10.0.0.2.  The is easily changed
   via &#39;make menuconfig&#39;.  The VNC server address is 10.0.0.2:5900.

2. The default (local) framebuffer configuration is 800x600 with 16-bit
   RGB color.

3. There are complicated interactions between VNC and the network
   configuration.  The CONFIG_VNCSERVER_UPDATE_BUFSIZE determines the
   size of update messages.  That is 1024 bytes in that configuration
   (the full message with the header will be a little larger).  The
   CONFIG_NET_ETH_PKTSIZE is set to 590 so that a full update will
   require several packets.

   Write buffering also effects network performance.  This will break
   up the large updates into small (196 byte) groups.  When we run out
   of read-ahead buffers, then partial updates may be sent causing a
   loss of synchronization.

STATUS:
  2019-04-28:  Configuration created.  Not verified.
  2019-05-04:  Only partially functional.  VNC is a difficult way to
     debug Twm4Nx because it has its own level of complexities due to
     networking, mysterious VNC client behavior, and fragile VNC
     configurations.  I am setting this on the shelf for the time
     being.  I will stabilize Twm4Nx on another platform first.  Just
     too many degrees of freedom.
  2019-05-04:  Testing on hardware reveals that VNC is the source of
     most of the issues.  Things look good on real, local hardware
     (see boards/lpcxpresso-lpc54628/twm4nx).  VNC is just not mature
     enough for this kind of usage at this time.
</code></pre><p>mcuboot-loader: This configuration exercises the port of MCUboot loader to NuttX.</p><pre><code>In this configuration both primary, secondary and scratch partitions are
mapped into the internal flash.
Relevant configuration settings:

  CONFIG_BOARD_LATE_INITIALIZE=y

  CONFIG_BOOT_MCUBOOT=y
  CONFIG_MCUBOOT_BOOTLOADER=y
  CONFIG_MCUBOOT_ENABLE_LOGGING=y

  CONFIG_SAMV7_FORMAT_MCUBOOT=y
  CONFIG_INIT_ENTRYPOINT=&quot;mcuboot_loader_main&quot;
</code></pre><p>mcuboot-slot-confirm: This configuration exercises the MCUboot compatible application slot confirm example.</p><pre><code>Generate signed binaries for MCUboot compatible application:
  ./apps/boot/mcuboot/mcuboot/scripts/imgtool.py sign \\
    --key apps/boot/mcuboot/mcuboot/root-rsa-2048.pem --align 8 \\
    --version 1.0.0 --header-size 0x200 --pad-header --slot-size 0xe0000 \\
    nuttx/nuttx.bin signed_app_1_0_0.bin

Relevant configuration settings:

  CONFIG_BOARD_LATE_INITIALIZE=y

  CONFIG_EXAMPLES_MCUBOOT_SLOT_CONFIRM=y

  CONFIG_SAMV7_FORMAT_MCUBOOT=y
  CONFIG_INIT_ENTRYPOINT=&quot;mcuboot_confirm_main&quot;
</code></pre><p>pysim: This configuration includes support for pysimCoder application (for further information regarding NuttX and pysimCoder please refer to NuttX documentation).</p><pre><code>Following peripherals are included:

  ADC - AFEC0 - channels 0, 6 and 8
  PWM - PWM0  - channels 0, 1, 2
  Ethernet - TCP and UPD support
</code></pre><p>pwm: This configuration is an example of PWM driver. The multichannel option is set on and PWM is generated on channels 0, 1 and 2 for driver PWM0.</p>`,266)]))}const m=t(a,[["render",r]]);export{p as __pageData,m as default};
