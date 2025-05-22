import{_ as n,c as t,al as a,o}from"./chunks/framework.NFAqBSgQ.js";const s="/assets/linum-stm32h753bi-top.DZJYyqS9.jpg",r="/assets/linum-stm32h753bi-bottom.DcytT1cN.jpg",b=JSON.parse('{"title":"linum-stm32h753bi","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/stm32h7/boards/linum-stm32h753bi/index.md","filePath":"en/platforms/arm/stm32h7/boards/linum-stm32h753bi/index.md"}'),i={name:"en/platforms/arm/stm32h7/boards/linum-stm32h753bi/index.md"};function d(c,e,h,l,p,m){return o(),t("div",null,e[0]||(e[0]=[a('<h1 id="linum-stm32h753bi" tabindex="-1">linum-stm32h753bi <a class="header-anchor" href="#linum-stm32h753bi" aria-label="Permalink to &quot;linum-stm32h753bi&quot;">​</a></h1><p>chip:stm32, chip:stm32h7, chip:stm32h753</p><p>This page discusses issues unique to NuttX configurations for the LINUM-STM32H753BI board.</p><p><img src="'+s+'" alt="" class="align-center"></p><p><img src="'+r+`" alt="" class="align-center"></p><h2 id="board-information" tabindex="-1">Board information <a class="header-anchor" href="#board-information" aria-label="Permalink to &quot;Board information&quot;">​</a></h2><p>This board was release by Witte Tenology in 2023 and developed based on STM32H753BI microcontroller. The board has 2 expansion connectors used by the LCD display with touchscreen and another for access to other peripherals of microcontroller.</p><p>The board features:</p><p>: - 8 to 52V power supply - SWD Pins for use as STLink (Pin header) and TC2030-IDC 6-Pin Tag-Connect Plug-of-Nails™ Connector - Crystal for HS 25MHz - Crystal for RTC 32.768KHz - 1 UART serial for debug - 1 Led RGB - 1 Buzzer without internal oscillator - 1 Mono audio up to 3W - 1 Ethernet 10/100 - 1 MicroSD connector supporting 1 or 4-bit bus - 1 USB 2.0 Host/Device - 1 EEPROM memory with 512K bits - 1 External SRAM memory with 8MB - 1 NOR memory with 16MB - 2 On-board RS232 Transceiver with RTS/CTS - 2 On-board RS485 Transceiver - 2 On-board CAN-FD Transceiver</p><p>Expansion connector 1 features:</p><p>: - 1 Display RBG 565 - 1 Capacitive Touchscreen sensor</p><p>Expansion connector 2 features.</p><p>: - 1 SPI - 1 I2C - 1 One Wire - 2 DACs - 6 PWM Channels - 10 ADCs</p><p>Board documentation: <a href="https://wittetech.com/" target="_blank" rel="noreferrer">https://wittetech.com/</a></p><h2 id="board-leds" tabindex="-1">BOARD-LEDs <a class="header-anchor" href="#board-leds" aria-label="Permalink to &quot;BOARD-LEDs&quot;">​</a></h2><p>The LINUM-STM32H753BI has 3 software controllable LEDs.</p><blockquote><p>LED RGB PINS</p><hr><p>LED_R PG2 LED_G PG3 LED_B PB2</p></blockquote><h2 id="uart-usart" tabindex="-1">UART/USART <a class="header-anchor" href="#uart-usart" aria-label="Permalink to &quot;UART/USART&quot;">​</a></h2><p>The LINUM-STM32H753BI used the USART1 for serial debug messages.</p><h3 id="usart1" tabindex="-1">USART1 <a class="header-anchor" href="#usart1" aria-label="Permalink to &quot;USART1&quot;">​</a></h3><blockquote><p>USART1 PINS</p><hr><p>TX PB14 RX PB15</p></blockquote><p>The LINUM-STM32H753BI board has two on-board RS-232 transceiver connected to USART2 and USART3.</p><blockquote><p>USART2 PINS</p><hr><p>TXD PD5 RXD PD6 CTS PD3 RTS PD4</p><p>USART3 PINS</p><hr><p>TXD PB10 RXD PB11 CTS PD11 RTS PD12</p></blockquote><p>The LINUM-STM32H753BI board has two on-board RS-485 transceiver connected to USART4 and USART6.</p><blockquote><p>UART4 PINS</p><hr><p>TXD PB9 RXD PB8 DE PA15</p><p>USART6 PINS</p><hr><p>TXD PC6 RXD PC7 DE PG12</p></blockquote><h2 id="sdmmc" tabindex="-1">SDMMC <a class="header-anchor" href="#sdmmc" aria-label="Permalink to &quot;SDMMC&quot;">​</a></h2><p>The LINUM-STM32H753BI has one SDCard slot connected as below:</p><blockquote><p>SDMMC1 PINS</p><hr><p>SDMMC_D0 PC8 SDMMC_D1 PC9 SDMMC_D2 PC10 SDMMC_D3 PC11 SDMMC_DK PC12</p><p>GPIO PINS</p><hr><p>SDCARD_DETECTED PG7 SDCARD_PWR_EN PD7</p></blockquote><h2 id="ethernet" tabindex="-1">ETHERNET <a class="header-anchor" href="#ethernet" aria-label="Permalink to &quot;ETHERNET&quot;">​</a></h2><p>The LINUM-STM32H753BI has a ethernet connection using the transceiver KSZ8081RNACA.</p><blockquote><p>ETH PINS</p><hr><p>ETH_REF_CLK PA1 ETH_MDIO PA2 ETH_CRS_DV PA7 ETH_MDC PC1 ETH_RXD0 PC4 ETH_RXD1 PC5 ETH_TX_EN PG11 ETH_TXD0 PG13 ETH_TXD1 PG14 ETH_CLK PA8 ETH_RESET PI4</p></blockquote><h2 id="can-fd" tabindex="-1">CAN-FD <a class="header-anchor" href="#can-fd" aria-label="Permalink to &quot;CAN-FD&quot;">​</a></h2><p>The LINUM-STM32H753BI board has two on-board CAN-FD transceiver connected to FDCAN1 and FDCAN2.</p><blockquote><p>FDCAN1 PINS</p><hr><p>TXD PH13 RXD PH14 STD PI2</p><p>FDCAN2 PINS</p><hr><p>TXD PB13 RXD PB12 STD PE3</p></blockquote><h2 id="usb" tabindex="-1">USB <a class="header-anchor" href="#usb" aria-label="Permalink to &quot;USB&quot;">​</a></h2><p>The LINUM-STM32H753BI has one usb port.</p><blockquote><p>USB PINS</p><hr><p>USB_VBUS PA9 USB_N PA11 USB_P PA12 USB_EN PI12 USB_FLT PI13</p></blockquote><h2 id="quadspi" tabindex="-1">QUADSPI <a class="header-anchor" href="#quadspi" aria-label="Permalink to &quot;QUADSPI&quot;">​</a></h2><p>The LINUM-STM32H753BI board has one NOR memory connected to QUADSPI. The NOR memory used is the W25Q128JV with 16MB</p><blockquote><p>QUADSPI PINS</p><hr><p>IO0 PF8 IO1 PF9 IO2 PF7 IO3 PF6 CLK PF10 NCS PG6</p></blockquote><h2 id="i2c3" tabindex="-1">I2C3 <a class="header-anchor" href="#i2c3" aria-label="Permalink to &quot;I2C3&quot;">​</a></h2><p>The LINUM-STM32H753BI connects the EEPROM memory and the touchscreen sensor to I2C3.</p><blockquote><p>I2C3 PINS</p><hr><p>SCL PH7 SDA PH8</p></blockquote><h3 id="eeprom-memory" tabindex="-1">EEPROM MEMORY <a class="header-anchor" href="#eeprom-memory" aria-label="Permalink to &quot;EEPROM MEMORY&quot;">​</a></h3><p>EEPROM memory used is the 24LC256 with 256Kb with the control bytes value 0x54.</p><h3 id="touchscreen-sensor" tabindex="-1">TOUCHSCREEN SENSOR <a class="header-anchor" href="#touchscreen-sensor" aria-label="Permalink to &quot;TOUCHSCREEN SENSOR&quot;">​</a></h3><p>The touchscreen sensor used is the FT5X06.</p><blockquote><p>GPIO PINS</p><hr><p>TS_RESET PI7 TS_ISR PH9</p></blockquote><h2 id="i2c4" tabindex="-1">I2C4 <a class="header-anchor" href="#i2c4" aria-label="Permalink to &quot;I2C4&quot;">​</a></h2><p>The I2C4 is available for general use on the expansion connector.</p><blockquote><p>I2C4 PINS</p><hr><p>SCL PH11 SDA PH12</p></blockquote><h2 id="external-sdram" tabindex="-1">External SDRAM <a class="header-anchor" href="#external-sdram" aria-label="Permalink to &quot;External SDRAM&quot;">​</a></h2><p>The LINUM-STM32H753BI has a external SDRAM with 16Mbits connected to FMC peripheral.</p><blockquote><p>FMC PINS</p><hr><p>FMC_A0 PJ12 FMC_A1 PF1 FMC_A2 PF2 FMC_A3 PF3 FMC_A4 PF4 FMC_A5 PF5 FMC_A6 PF12 FMC_A7 PF13 FMC_A8 PF14 FMC_A9 PF15 FMC_A10 PG0 FMC_A11 PG1 FMC_BA0 PG4 FMC_BA1 PG5 FMC_D0 PD14 FMC_D1 PD15 FMC_D2 PD0 FMC_D3 PD1 FMC_D4 PE7 FMC_D5 PE8 FMC_D6 PE9 FMC_D7 PE10 FMC_D8 PE11 FMC_D9 PE12 FMC_D10 PE13 FMC_D11 PE14 FMC_D12 PE15 FMC_D13 PD8 FMC_D14 PD9 FMC_D15 PD10 FMC_NBL0 PE0 FMC_NBL1 PE1 FMC_SDCKE0 PC3 FMC_SDCLK PG8 FMC_SDNCAS PG15 FMC_SDNEO PC2 FMC_SDNRAS PF11 FMC_SDNWE PC0</p></blockquote><h2 id="lcd" tabindex="-1">LCD <a class="header-anchor" href="#lcd" aria-label="Permalink to &quot;LCD&quot;">​</a></h2><p>The LINUM-STM32H753BI use the LTDC to support one LCD with RGB connection.</p><blockquote><p>LTDC PINS</p><hr><p>LTDC_B0 PF0 LTDC_B1 PJ13 LTDC_B2 PJ14 LTDC_B3 PJ15 LTDC_B4 PK3 LTDC_B5 PK4 LTDC_B6 PK5 LTDC_B7 PK6 LTDC_CLK PI14 LTDC_DE PK7 LTDC_G0 PJ7 LTDC_G1 PJ8 LTDC_G2 PJ9 LTDC_G3 PJ10 LTDC_G4 PJ11 LTDC_G5 PK0 LTDC_G6 PK1 LTDC_G7 PK2 LTDC_HSYNC PI10 LTDC_R0 PI15 LTDC_R1 PJ0 LTDC_R2 PJ1 LTDC_R3 PJ2 LTDC_R4 PJ3 LTDC_R5 PJ4 LTDC_R6 PJ5 LTDC_R7 PJ6 LTDC_VSYNC PI9 PWM_BACKLIGHT PH6</p></blockquote><h2 id="i2s" tabindex="-1">I2S <a class="header-anchor" href="#i2s" aria-label="Permalink to &quot;I2S&quot;">​</a></h2><p>The LINUM-STM32H753BI has one I2S output.</p><blockquote><p>I2S2 PINS</p><hr><p>I2S2_WS PI0 I2S2_CK PI1 I2S2_SDO PI3</p></blockquote><h2 id="pwm" tabindex="-1">PWM <a class="header-anchor" href="#pwm" aria-label="Permalink to &quot;PWM&quot;">​</a></h2><p>The LINUM-STM32H753BI has a buzzer without internal oscillator connected to PB7</p><blockquote><p>GPIO PINS</p><hr><p>BUZZER PB7</p></blockquote><hr><p>Each linum-stm32h753bi configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh linum-stm32h753bi:&lt;subdir&gt;

Where &lt;subdir&gt; is one of the following:
</code></pre><h3 id="configuration-directories" tabindex="-1">Configuration Directories <a class="header-anchor" href="#configuration-directories" aria-label="Permalink to &quot;Configuration Directories&quot;">​</a></h3><h3 id="nsh" tabindex="-1">nsh <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh&quot;">​</a></h3><p>Configures the NuttShell (nsh) located at apps/examples/nsh. This configuration enables a serial console on UART1.</p><h3 id="usbnsh" tabindex="-1">usbnsh <a class="header-anchor" href="#usbnsh" aria-label="Permalink to &quot;usbnsh&quot;">​</a></h3><p>Configures the NuttShell (nsh) located at apps/examples/nsh. This configuration enables a serial console over USB.</p><p>After flashing and reboot your board you should see in your dmesg logs:</p><pre><code> sudo dmesg | tail
[ 9180.937813] usb 3-1.1.2: SerialNumber: 0
[ 9180.946974] cdc_acm 3-1.1.2:1.0: ttyACM0: USB ACM device
[ 9715.123387] usb 3-1.1.2: USB disconnect, device number 20
[ 9717.393142] usb 3-1.1.2: new full-speed USB device number 21 using xhci_hcd
[ 9717.494824] usb 3-1.1.2: New USB device found, idVendor=0525, idProduct=a4a7, bcdDevice= 1.01
[ 9717.494834] usb 3-1.1.2: New USB device strings: Mfr=1, Product=2, SerialNumber=3
[ 9717.494837] usb 3-1.1.2: Product: CDC/ACM Serial
[ 9717.494840] usb 3-1.1.2: Manufacturer: NuttX
[ 9717.494842] usb 3-1.1.2: SerialNumber: 0
[ 9717.504192] cdc_acm 3-1.1.2:1.0: ttyACM0: USB ACM device
</code></pre><p>You may need to press ENTER 3 times before the NSH show up.</p><h3 id="modbus-slave" tabindex="-1">modbus_slave <a class="header-anchor" href="#modbus-slave" aria-label="Permalink to &quot;modbus\\_slave&quot;">​</a></h3><p>Configures the ModBus RTU Slave located at apps/examples/modbus. This configuration enables a RS485 on USART6.</p><p>After configuring the desired pins on menuconfig and wiring the RS485 converter, you can enable the ModBus to respond to queries:</p><pre><code>nsh&gt; modbus -e
</code></pre><p>In your pc you will be able to read the ModBus registers using an application like <code>mbpoll</code>:</p><pre><code> mbpoll -a 10 -b 38400 -t 3 -r 1000 -c 4 /dev/ttyUSB1 -R
</code></pre><h3 id="modbus-master" tabindex="-1">modbus_master <a class="header-anchor" href="#modbus-master" aria-label="Permalink to &quot;modbus\\_master&quot;">​</a></h3><p>Configures the ModBus RTU Master located at apps/examples/modbusmaster. This configuration enables a RS485 on USART6.</p><p>After configuring the desired pins on menuconfig and wiring the RS485 converter, you can enable the ModBus Master to create queries for device with address 10:</p><pre><code>nsh&gt; mbmaster
</code></pre><p>In your pc you will be able to create a ModBus Slave with address 10 using an application like <code>diagslave</code>:</p><pre><code> sudo diagslave -a 10 -b 38400 /dev/ttyUSB0
</code></pre><h3 id="sdcard" tabindex="-1">sdcard <a class="header-anchor" href="#sdcard" aria-label="Permalink to &quot;sdcard&quot;">​</a></h3><p>Configures the NuttShell (nsh) and enables SD card support. The board has an onboard microSD slot that should be automatically registered as the block device /dev/mmcsd0 when an SD card is present.</p><p>The SD card can then be mounted by the NSH commands:</p><pre><code>nsh&gt; mount -t vfat /dev/mmcsd0 /mnt
nsh&gt; mount
nsh&gt; echo &quot;Hello World!!&quot; &gt; /mnt/test_file.txt
nhs&gt; ls /mnt/
test_file.txt
nsh&gt; cat /mnt/test_file.txt
Hello World!!
</code></pre><h3 id="eeprom" tabindex="-1">eeprom <a class="header-anchor" href="#eeprom" aria-label="Permalink to &quot;eeprom&quot;">​</a></h3><p>Use <strong>dd</strong> command to write and read data from EEPROM as below::</p><pre><code>nsh&gt; dd if=/dev/console of=/dev/eeprom bs=1 count=35
Witte-Tech Linum-STM32H753BI board
nsh&gt; dd if=/dev/eeprom of=/dev/console bs=4 count=35
Witte-Tech Linum-STM32H753BI board
nsh&gt;
</code></pre><h3 id="buzzer" tabindex="-1">buzzer <a class="header-anchor" href="#buzzer" aria-label="Permalink to &quot;buzzer&quot;">​</a></h3><p>This example use the timer 4 with channel 2 to generate a PWM output signal on buzzer pin:</p><pre><code>nsh&gt; ls /dev
/dev:
console
null
pwm0
rtc0
ttyS0
nsh&gt; pwm -d 75 -t 3
pwm_main: starting output with frequency: 100 duty: 0000bfff
pwm_main: stopping output
nsh&gt; pwm -f 300 -t 3
pwm_main: starting output with frequency: 300 duty: 0000bfff
pwm_main: stopping output
</code></pre><h3 id="leds" tabindex="-1">leds <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;leds&quot;">​</a></h3><p>Example to blink the RBG led of board, using this example the board led status support stop to work:</p><pre><code># turn on led red
printf \\x00000001 &gt; /dev/userleds

# turn on led green
printf \\x00000002 &gt; /dev/userleds

# turn on led blue
printf \\x00000004 &gt; /dev/userleds

# Run blink leds sample
nsh&gt; leds
leds_main: Starting the led_daemon
leds_main: led_daemon started

led_daemon (pid# 3): Running
led_daemon: Opening /dev/userleds
led_daemon: Supported LEDs 0x07
led_daemon: LED set 0x01
nsh&gt; led_daemon: LED set 0x02
led_daemon: LED set 0x03
led_daemon: LED set 0x04
led_daemon: LED set 0x05
led_daemon: LED set 0x06
led_daemon: LED set 0x07
led_daemon: LED set 0x06
led_daemon: LED set 0x05
led_daemon: LED set 0x04
led_daemon: LED set 0x03
led_daemon: LED set 0x02
led_daemon: LED set 0x01
</code></pre><h3 id="zmodem" tabindex="-1">zmodem <a class="header-anchor" href="#zmodem" aria-label="Permalink to &quot;zmodem&quot;">​</a></h3><p>This example use the nsh via usb and the SDCard to storage the files exchanged. By default the zmodem lib use the path /tmp to storage the files.</p><p>Sending files to target:</p><pre><code># Mount the SDCard at /tmp
nsh&gt; mount -t vfat /dev/mmcsd0 /tmp

# Waiting for a new file.
nsh&gt; rz

# Transmitting a file to target.
my_pc sz --zmodem nuttx_logo.txt &gt; /dev/ttyACM0 &lt; /dev/ttyACM0

# Check if the file was received
nsh&gt; ls -l /tmp
/tmp:
-rw-rw-rw-        1942 nuttx_logo.txt
</code></pre><p>Transmitting a file to PC:</p><pre><code># Sending the file nuttx_logo.txt to PC
nsh&gt; sz -x 1 /tmp/nuttx_logo.txt
**B00000000000000

# Using zmodem to receive a file from target
my_pc/temp rz &gt; /dev/ttyACM0 &lt; /dev/ttyACM0
Receiving: nuttx_logo.txt
Bytes received:    1942/   1942   BPS:124544

Transfer complete
my_pc/temp ls -l
-rw-------  1 nuttx nuttx    1942 abr  6 16:07 nuttx_logo.txt
</code></pre><p>If you don&#39;t have a SDCard on your board, you can mount the TMPFS at /tmp and transfer files to it, but you cannot transfer big files because TMPFS could use the free RAM of your board:</p><pre><code>nsh&gt; mount -t tmpfs /tmp
</code></pre><h3 id="nxffs" tabindex="-1">nxffs <a class="header-anchor" href="#nxffs" aria-label="Permalink to &quot;nxffs&quot;">​</a></h3><p>This example use the flash memory W25Q128JV via qspi with the nxffs file system:</p><pre><code>NuttShell (NSH) NuttX-12.5.1-RC0
nsh&gt; ls
/:
dev/
w25/
nsh&gt; cd /w25
nsh&gt; echo &quot;hello world!&quot; &gt; message.txt
nsh&gt; ls
/w25:
message.txt
nsh&gt; cat message.txt
hello world!
</code></pre><h3 id="littlefs" tabindex="-1">littlefs <a class="header-anchor" href="#littlefs" aria-label="Permalink to &quot;littlefs&quot;">​</a></h3><p>This example use the flash memory W25Q128JV via qspi with the littlefs file system:</p><pre><code>NuttShell (NSH) NuttX-12.5.1-RC0
nsh&gt; ls
/:
dev/
w25/
nsh&gt; cd /w25
nsh&gt; mkdir folder1
nsh&gt; cd folder1
nsh&gt; echo &quot;hello world!!!!&quot; &gt; message.txt
nsh&gt; cat message.txt
hello world!!!!
nsh&gt; ls
/w25/folder1:
.
..
message.txt
</code></pre><h3 id="rndis" tabindex="-1">rndis <a class="header-anchor" href="#rndis" aria-label="Permalink to &quot;rndis&quot;">​</a></h3><p>This example use ethernet over usb and show how configure ip and download file with wget command from server.</p><p>After flash the board check if the linux found and recognized the new network driver:</p><pre><code> sudo dmesg | tail
[30260.873245] rndis_host 3-1.3:1.0 enxa0e0deadbeef: unregister &#39;rndis_host&#39; usb-0000:00:14.0-1.3, RNDIS device
[30265.461419] usb 3-1.3: new full-speed USB device number 34 using xhci_hcd
[30265.563354] usb 3-1.3: New USB device found, idVendor=584e, idProduct=5342, bcdDevice= 0.01
[30265.563359] usb 3-1.3: New USB device strings: Mfr=1, Product=2, SerialNumber=3
[30265.563361] usb 3-1.3: Product: RNDIS gadget
[30265.563362] usb 3-1.3: Manufacturer: NuttX
[30265.563363] usb 3-1.3: SerialNumber: 1234
[30265.572179] rndis_host 3-1.3:1.0: dev can&#39;t take 1558 byte packets (max 660), adjusting MTU to 602
[30265.573517] rndis_host 3-1.3:1.0 eth0: register &#39;rndis_host&#39; at usb-0000:00:14.0-1.3, RNDIS device, a0:e0:de:ad:be:ef
[30265.584924] rndis_host 3-1.3:1.0 enxa0e0deadbeef: renamed from eth0

 ifconfig
enxa0e0deadbeef: flags=4163&lt;UP,BROADCAST,RUNNING,MULTICAST&gt;  mtu 602
inet 10.42.0.1  netmask 255.255.255.0  broadcast 10.42.0.255
ether a0:e0:de:ad:be:ef  txqueuelen 1000  (Ethernet)
RX packets 87  bytes 10569 (10.5 KB)
RX errors 0  dropped 0  overruns 0  frame 0
TX packets 99  bytes 22896 (22.8 KB)
TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
</code></pre><p><strong>OBS:</strong> In network settings of PC enable &quot;Shared to other computers&quot;</p><p>Configure the IP of target:</p><pre><code>nsh&gt; ifconfig eth0 10.42.0.2
nsh&gt; ifconfig
lo  Link encap:Local Loopback at RUNNING mtu 1518
inet addr:127.0.0.1 DRaddr:127.0.0.1 Mask:255.0.0.0

eth0    Link encap:Ethernet HWaddr 00:e0:de:ad:be:ef at UP mtu 576
inet addr:10.42.0.2 DRaddr:10.42.0.1 Mask:255.255.255.0

            IPv4   TCP   UDP  ICMP
Received     012a  0000  0126  0000
Dropped      0004  0000  0000  0000
  IPv4        VHL: 0000   Frg: 0001
  Checksum   0000  0000  0000  ----
  TCP         ACK: 0000   SYN: 0000
              RST: 0000  0000
  Type       0000  ----  ----  0000
Sent         0000  0000  0000  0000
  Rexmit     ----  0000  ----  ----
nsh&gt; 
</code></pre><p>Testing communication with PC using ping command:</p><pre><code>nsh&gt; ping 10.42.0.1
PING 10.42.0.1 56 bytes of data
56 bytes from 10.42.0.1: icmp_seq=0 time=0.0 ms
56 bytes from 10.42.0.1: icmp_seq=1 time=0.0 ms
56 bytes from 10.42.0.1: icmp_seq=2 time=0.0 ms
56 bytes from 10.42.0.1: icmp_seq=3 time=0.0 ms
56 bytes from 10.42.0.1: icmp_seq=4 time=0.0 ms
56 bytes from 10.42.0.1: icmp_seq=5 time=0.0 ms
56 bytes from 10.42.0.1: icmp_seq=6 time=0.0 ms
56 bytes from 10.42.0.1: icmp_seq=7 time=0.0 ms
56 bytes from 10.42.0.1: icmp_seq=8 time=0.0 ms
56 bytes from 10.42.0.1: icmp_seq=9 time=0.0 ms
10 packets transmitted, 10 received, 0% packet loss, time 10100 ms
rtt min/avg/max/mdev = 0.000/0.000/0.000/0.000 ms
</code></pre><p>In your pc you will be able connect to target using telnet and access their shell nsh:</p><pre><code> telnet 10.42.0.2
Trying 10.42.0.2...
Connected to 10.42.0.2.
Escape character is &#39;^]&#39;.

NuttShell (NSH) NuttX-12.5.1
nsh&gt; uname -a
NuttX  12.5.1 c148e8f2af-dirty Apr 28 2024 10:27:50 arm linum-stm32h753bi
nsh&gt; exit
Connection closed by foreign host.
</code></pre><p>Testing wget to download file from server:</p><pre><code># PC: Creating a http server and sharing local folder.
 sudo python3 -m http.server 80 -d ./

# log of server
Serving HTTP on 0.0.0.0 port 80 (http://0.0.0.0:80/) ...
10.42.0.2 - - [28/Apr/2024 16:14:39] &quot;GET /nuttx_logo.txt HTTP/1.0&quot; 200 -

# Using wget on target
nsh&gt; mount -t tmpfs /tmp
nsh&gt; cd /tmp
nsh&gt; pwd
/tmp
nsh&gt; wget http://10.42.0.1/nuttx_logo.txt
nsh&gt; ls
/tmp:
nuttx_logo.txt
</code></pre><h3 id="usbmsc-sdcard" tabindex="-1">usbmsc-sdcard <a class="header-anchor" href="#usbmsc-sdcard" aria-label="Permalink to &quot;usbmsc-sdcard&quot;">​</a></h3><p>This example uses the USB Mass Storage with SD Card.</p><p>Enable the USB Mass Storage with the command <strong>msconn</strong>:</p><pre><code>nsh&gt; msconn
mcsonn_main: Creating block drivers
mcsonn_main: handle=0x38003020
mcsonn_main: Bind LUN=0 to /dev/mmcsd0
mcsonn_main: Connected
</code></pre><p>After that check if your PC recognized the usb driver:</p><pre><code> sudo dmesg | tail
[sudo] password for jaga:
[27219.361934] usbcore: registered new interface driver uas
[27220.378231] scsi 0:0:0:0: Direct-Access     NuttX    Mass Storage     0101 PQ: 0 ANSI: 2
[27220.378646] sd 0:0:0:0: Attached scsi generic sg0 type 0
[27220.379203] sd 0:0:0:0: [sda] 1930240 512-byte logical blocks: (988 MB/943 MiB)
[27220.597414] sd 0:0:0:0: [sda] Write Protect is off
[27220.597419] sd 0:0:0:0: [sda] Mode Sense: 0f 00 00 00
[27220.817620] sd 0:0:0:0: [sda] Write cache: enabled, read cache: enabled, doesn&#39;t support DPO or FUA
[27221.265245]  sda: sda1
[27221.266103] sd 0:0:0:0: [sda] Attached SCSI removable disk
[27228.147377] FAT-fs (sda1): Volume was not properly unmounted. Some data may be corrupt. Please run fsck.
</code></pre><p><strong>OBS:</strong> This example disable the macro CONFIG_STM32H7_SDMMC_IDMA, for more information read the file: arch/arm/stm32h7/stm32_sdmmc.c</p><h3 id="netnsh" tabindex="-1">netnsh <a class="header-anchor" href="#netnsh" aria-label="Permalink to &quot;netnsh&quot;">​</a></h3><p>This configuration is focused on network testing using the ethernet periferal:</p><pre><code> nsh&gt; ifconfig
  eth0  Link encap:Ethernet HWaddr 00:e0:de:ad:be:ef at UP mtu 1486
    inet addr:192.168.1.6 DRaddr:192.168.1.1 Mask:255.255.255.0

              IPv4   TCP   UDP  ICMP
  Received     01b9  0025  0194  0000
  Dropped      0000  0000  0000  0000
    IPv4        VHL: 0000   Frg: 0000
    Checksum   0000  0000  0000  ----
    TCP         ACK: 0000   SYN: 0000
                RST: 0000  0000
    Type       0000  ----  ----  0000
  Sent         0028  0025  0003  0000
    Rexmit     ----  0000  ----  ----

  nsh&gt; ping google.com
  PING 142.251.129.110 56 bytes of data
  56 bytes from 142.251.129.110: icmp_seq=0 time=10.0 ms
  56 bytes from 142.251.129.110: icmp_seq=1 time=0.0 ms
  56 bytes from 142.251.129.110: icmp_seq=2 time=0.0 ms
  56 bytes from 142.251.129.110: icmp_seq=3 time=0.0 ms
  56 bytes from 142.251.129.110: icmp_seq=4 time=0.0 ms
  56 bytes from 142.251.129.110: icmp_seq=5 time=0.0 ms
  56 bytes from 142.251.129.110: icmp_seq=6 time=0.0 ms
  56 bytes from 142.251.129.110: icmp_seq=7 time=0.0 ms
  56 bytes from 142.251.129.110: icmp_seq=8 time=0.0 ms
  56 bytes from 142.251.129.110: icmp_seq=9 time=0.0 ms
  10 packets transmitted, 10 received, 0% packet loss, time 10100 ms
  rtt min/avg/max/mdev = 0.000/1.000/10.000/3.000 ms
</code></pre><h3 id="qencoder" tabindex="-1">qencoder <a class="header-anchor" href="#qencoder" aria-label="Permalink to &quot;qencoder&quot;">​</a></h3><p>Configures and enables TIM5 on CH1(PA0) and CH2(PH11) to handle Quadrature Encoder:</p><pre><code>nsh&gt; qe
qe_main: Hardware initialized. Opening the encoder device: /dev/qe0
qe_main: Number of samples: 0
qe_main:   1. 1
qe_main:   2. 2
qe_main:   3. 3
qe_main:   4. 2
qe_main:   5. 1
</code></pre><h3 id="sdram" tabindex="-1">sdram <a class="header-anchor" href="#sdram" aria-label="Permalink to &quot;sdram&quot;">​</a></h3><p>This configuration uses the FMC peripheral to connect to external SDRAM with 8 MB and add it to the nuttx heap.</p><p>To test the sdram use the command <strong>ramtest</strong>:</p><pre><code>nsh&gt; free
                total       used       free    maxused    maxfree  nused  nfree
      Umem:    9397168       5488    9391680       5880    8388592     28      5
nsh&gt; ramtest -w -a 0xc0000000 -s 8388608
RAMTest: Marching ones: c0000000 8388608
RAMTest: Marching zeroes: c0000000 8388608
RAMTest: Pattern test: c0000000 8388608 55555555 aaaaaaaa
RAMTest: Pattern test: c0000000 8388608 66666666 99999999
RAMTest: Pattern test: c0000000 8388608 33333333 cccccccc
RAMTest: Address-in-address test: c0000000 8388608
</code></pre><h3 id="mfrc522" tabindex="-1">mfrc522 <a class="header-anchor" href="#mfrc522" aria-label="Permalink to &quot;mfrc522&quot;">​</a></h3><p>Configures the board to use the SPI4 and enables RFID driver with MFRC522:</p><pre><code>nsh&gt; ls /dev/
/dev:
console
null
rfid0
rtc0
ttyS0
nsh&gt; rfid_readuid
Trying to READ: Card is not present!
Trying to READ: Card is not present!
Trying to READ: RFID CARD UID = 0x3DB3F169

======== =====
MFRC522  PINS
======== =====
SCK      PE2
MISO     PE5
MOSI     PE6
CS       PE4
======== =====
</code></pre><h3 id="lvgl" tabindex="-1">lvgl <a class="header-anchor" href="#lvgl" aria-label="Permalink to &quot;lvgl&quot;">​</a></h3><p>Configures the board to use display of 7 inch with lvgl example. The touch screen functionality is implemented using the FT5X06 capacitive touch controller connected to I2C3 interface, with interrupt handling configured on pin PH9 for touch event detection.</p><p>To verify if the touch controller is functioning correctly, use the <strong>tc</strong> command.:</p><pre><code>nsh&gt; tc 2
tc_main: nsamples: 2
tc_main: Opening /dev/input0
Sample     :
  npoints : 1
Point 1    :
        id : 0
    flags : 19
        x : 0
        y : 52
        h : 0
        w : 0
  pressure : 0
timestamp : 0
Sample     :
  npoints : 1
Point 1    :
        id : 0
    flags : 1a
        x : 0
        y : 52
        h : 0
        w : 0
  pressure : 0
timestamp : 0
Terminating!
</code></pre><p>To verify if the display is functioning correctly, use the <strong>fb</strong> command. You should see the display change colors.:</p><pre><code>nsh&gt; fb
VideoInfo:
      fmt: 11
    xres: 1024
    yres: 600
  nplanes: 1
noverlays: 1
OverlayInfo (overlay 0):
    fbmem: 0xc0000000
    fblen: 1228800
  stride: 2048
  overlay: 0
      bpp: 16
    blank: 0
chromakey: 0x00000000
    color: 0x00000000
  transp: 0xff
    mode: 0
    area: (0,0) =&gt; (1024,600)
    accl: 1
PlaneInfo (plane 0):
    fbmem: 0xc0000000
    fblen: 1228800
  stride: 2048
  display: 0
      bpp: 16
Mapped FB: 0xc0000000
0: (  0,  0) (1024,600)
1: ( 93, 54) (838,492)
2: (186,108) (652,384)
3: (279,162) (466,276)
4: (372,216) (280,168)
5: (465,270) ( 94, 60)
Test finished
</code></pre><p>Once the <strong>fd</strong> command works, run the lvgl examples. :</p><pre><code>nsh&gt; lvgldemo
nsh&gt; lvgldemo benchmark
</code></pre><p><strong>WARNING:</strong> For this example, the total SDRAM size was reduced from 8M to 6M and the LTDC base address was moved to address 0xC0600000 to avoid video memory invasion since the SDRAM was mapped to use the nuttx heap. If using the example with 2 layers, the reserved value will need to be doubled.</p><h3 id="tone" tabindex="-1">tone <a class="header-anchor" href="#tone" aria-label="Permalink to &quot;tone&quot;">​</a></h3><p>This example demonstrates how to use PWM4 and Timer17 to play music using the Tone library and the board&#39;s buzzer.</p><h3 id="socketcan" tabindex="-1">socketcan <a class="header-anchor" href="#socketcan" aria-label="Permalink to &quot;socketcan&quot;">​</a></h3><p>This example demonstrates how to use the CAN-FD peripherals can0 and can1 with the SocketCAN protocol.:</p><pre><code># Configure the can0 and can1 to send messages
nsh&gt; ifup can0
ifup can0...OK
nsh&gt; ifup can1
ifup can1 ...OK
nsh&gt; cansend can0 123#DEADBEEF
nsh&gt; cansend can1 5A1#11.2233.44556677.88

# Reset the board and configure the can0 peripheral to receive messages
nsh&gt; ifup can0
ifup can0...OK
nsh&gt; candump can0
  can0  051   [8]  00 11 22 33 44 55 66 77
  can0  051  [16]  00 11 22 33 44 55 66 77 88 99 AA BB CC DD EE FF
</code></pre>`,160)]))}const f=n(i,[["render",d]]);export{b as __pageData,f as default};
