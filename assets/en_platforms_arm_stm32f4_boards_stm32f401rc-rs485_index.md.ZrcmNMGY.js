import{_ as n,c as t,al as a,o as r}from"./chunks/framework.NFAqBSgQ.js";const o="/assets/stm32f401rc_rs485.Ii3Ku_QY.jpg",s="/assets/mfrc522_image.CfLbDbQU.jpg",S=JSON.parse('{"title":"stm32f401rc-rs485","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/stm32f4/boards/stm32f401rc-rs485/index.md","filePath":"en/platforms/arm/stm32f4/boards/stm32f401rc-rs485/index.md"}'),i={name:"en/platforms/arm/stm32f4/boards/stm32f401rc-rs485/index.md"};function l(d,e,c,h,p,u){return r(),t("div",null,e[0]||(e[0]=[a('<h1 id="stm32f401rc-rs485" tabindex="-1">stm32f401rc-rs485 <a class="header-anchor" href="#stm32f401rc-rs485" aria-label="Permalink to &quot;stm32f401rc-rs485&quot;">​</a></h1><p>chip:stm32, chip:stm32f4, chip:stm32f401</p><p>This page discusses issues unique to NuttX configurations for the NuttX STM32F4-RS485 development board.</p><p><img src="'+o+`" alt="" class="align-center"></p><h2 id="board-information" tabindex="-1">Board information <a class="header-anchor" href="#board-information" aria-label="Permalink to &quot;Board information&quot;">​</a></h2><p>This board was release on NuttX International Workshop 2023 and developed based on STM32F401RCT6 microcontroller.</p><p>STM32F401RCT6 microcontroller features:</p><p>: - Arm 32-bit Cortex®-M4 CPU with FPU - 256 Kbytes of Flash memory - 64 Kbytes of SRAM - Serial wire debug (SWD) &amp; JTAG interfaces - Up to 81 I/O ports with interrupt capability - Up to 11 communication interfaces - Up to 3 I2C interfaces - Up to 3 USARTs - Up to 4 SPIs - SDIO interface - USB 2.0 full-speed device/host/OTG controller with on-chip PHY</p><p>The board features:</p><ul><li>Digital I2C Temperature Sensor (TMP75)</li><li>2K bits (256x8) I2C EEPROM</li><li>On-board RS485 Transceiver</li><li>Two Analog Input Stages with Amplifier Buffer</li><li>Two Analog Output Stages with Amplifier Buffer</li><li>MicroSD Connector supporting 1 or 4-bit bus</li><li>Four User LEDs</li><li>Four User Buttons</li><li>USB for DFU (Device Firmware Update) and USB device functionality, as well as powering the board</li><li>Onboard voltage regulator from 5V to 3.3V</li><li>SWD Pins for use as STLink (Pin header) and TC2030-IDC 6-Pin Tag-Connect Plug-of-Nails™ Connector</li><li>Crystal for HS 8MHz</li><li>Crystal for RTC 32.768KHz</li></ul><p>Board documentation: <a href="https://github.com/lucaszampar/NuttX_STM32F4_RS485_DevBoard" target="_blank" rel="noreferrer">https://github.com/lucaszampar/NuttX_STM32F4_RS485_DevBoard</a></p><p>As F4 series have a USB DFuSe-capable BootROM [AN2606], the board can be flashed via [dfu-util]{.title-ref} over USB, or via [stm32flash]{.title-ref} over UART without any debuggers.</p><h2 id="leds" tabindex="-1">LEDs <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;LEDs&quot;">​</a></h2><p>The STM32F4-RS485 has 4 software controllable LEDs.</p><p>LED PINS</p><hr><p>LED_1 PC0 LED_2 PC1 LED_4 PC2 LED_5 PC3</p><h2 id="user-buttons" tabindex="-1">User Buttons <a class="header-anchor" href="#user-buttons" aria-label="Permalink to &quot;User Buttons&quot;">​</a></h2><p>The STM32F4-RS485 has 4 user switches.</p><p>SWITCH PINS LABEL</p><hr><p>SWIO_1 PB13 SW3 SWIO_2 PB14 SW4 SWIO_3 PB15 SW5 SWIO_4 PC6 SW6[1]</p><p>[1] The switch SWIO_4 (SW6) is disabled due a conflict with PIN PC6 when using USART6.</p><h2 id="uarts" tabindex="-1">UARTs <a class="header-anchor" href="#uarts" aria-label="Permalink to &quot;UARTs&quot;">​</a></h2><p>The STM32F4-RS485 has 1 USART available for user.</p><h3 id="usart6" tabindex="-1">USART6 <a class="header-anchor" href="#usart6" aria-label="Permalink to &quot;USART6&quot;">​</a></h3><p>UART/USART PINS</p><hr><p>TX PC6 [1] RX PC7 CK PA8</p><p>[1] Warning you make need to reverse RX/TX on some RS-232 converters</p><h2 id="sdcard-support" tabindex="-1">SDCard support <a class="header-anchor" href="#sdcard-support" aria-label="Permalink to &quot;SDCard support&quot;">​</a></h2><p>The STM32F4-RS485 has 1 SDCard slot connected as below:</p><p>SDIO PINS</p><hr><p>SDIO_D0 PC8 SDIO_D1 PC9 SDIO_D2 PC10 SDIO_D3 PC11 SDIO_DK PC12</p><h2 id="eeprom" tabindex="-1">EEPROM <a class="header-anchor" href="#eeprom" aria-label="Permalink to &quot;EEPROM&quot;">​</a></h2><p>The STM32F4-RS485 development board has serial EEPROM HX24LC02B, with 2k bits (256x8) and internally organized with 32 pages of 8 bytes each. It is connected through I2C as below:</p><p>I2C PINS</p><hr><p>SDA PB7 SCL PB8</p><p>Users can enable EERPOM support on STM32F4-RS485 by following below configuration:</p><ul><li><p>Configure basic nsh:</p><pre><code>./tools/configure.sh -l stm32f401rc-rs485:nsh
</code></pre></li><li><p>Enable the following configs:</p><pre><code>CONFIG_DEV_ZERO=y
CONFIG_EEPROM=y
CONFIG_FS_PROCFS=y
CONFIG_I2C=y
CONFIG_I2C_EE_24XX=y
CONFIG_STM32_I2C1=y
</code></pre></li><li><p>Build and flash the STM32F4-RS485.</p></li><li><p>Use dd command to write and read data from EEPROM as below:</p><pre><code>nsh&gt; dd if=/dev/zero of=/dev/eeprom
nsh: dd: write failed: 1
nsh&gt; dd if=/dev/console of=/dev/eeprom bs=1 count=4
(type &quot;Hello&quot;)
nsh&gt; dd if=/dev/eeprom of=/dev/console bs=4 count=1
Hellonsh&gt;
</code></pre></li></ul><h2 id="temperature-sensor" tabindex="-1">Temperature Sensor <a class="header-anchor" href="#temperature-sensor" aria-label="Permalink to &quot;Temperature Sensor&quot;">​</a></h2><p>The STM32F4-RS485 development board has a temperature sensor TMP75 (compatible with LM75) connected through I2C as below:</p><p>I2C PINS</p><hr><p>SDA PB7 SCL PB8</p><h2 id="rs485-transceiver" tabindex="-1">RS485 Transceiver <a class="header-anchor" href="#rs485-transceiver" aria-label="Permalink to &quot;RS485 Transceiver&quot;">​</a></h2><p>The STM32F4-RS485 development board has a half-duplex RS-485 transceiver, the BL3085B it is connected through USART2 as below:</p><p>USART2 PINS</p><hr><p>USART2_RX RO USART2_RTS DE, /RE USART2_RX DI</p><h2 id="a-d-converter" tabindex="-1">A/D Converter <a class="header-anchor" href="#a-d-converter" aria-label="Permalink to &quot;A/D Converter&quot;">​</a></h2><p>The STM32F4-RS485 development board has two Analog to Digital converters with Amplifier Buffer (1COS724SR) and connected as below:</p><p>PWM PINS</p><hr><p>PWM_1 PB6 PWM_2 PA6</p><h2 id="d-c-converter" tabindex="-1">D/C Converter <a class="header-anchor" href="#d-c-converter" aria-label="Permalink to &quot;D/C Converter&quot;">​</a></h2><p>The STM32F4-RS485 development board has two Digital to Analog converters with Amplifier Buffer (1COS724SR) and connected as below:</p><p>ADC PINS</p><hr><p>ADC_1 PA0 ADC_2 PA4</p><h2 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h2><p>Each stm32f401rc-rs485 configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh stm32f401rc-rs485:&lt;subdir&gt;
</code></pre><p>Where &lt;subdir&gt; is one of the following:</p><h3 id="configuration-directories" tabindex="-1">Configuration Directories <a class="header-anchor" href="#configuration-directories" aria-label="Permalink to &quot;Configuration Directories&quot;">​</a></h3><h3 id="nsh" tabindex="-1">nsh <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh&quot;">​</a></h3><p>Configures the NuttShell (nsh) located at apps/examples/nsh. This configuration enables a serial console on USART6.</p><h3 id="usbnsh" tabindex="-1">usbnsh <a class="header-anchor" href="#usbnsh" aria-label="Permalink to &quot;usbnsh&quot;">​</a></h3><p>Configures the NuttShell (nsh) located at apps/examples/nsh. This configuration enables a serial console over USB.</p><p>After flashing and reboot your board you should see in your dmesg logs:</p><pre><code>[ 2638.948089] usb 1-1.4: new full-speed USB device number 16 using xhci_hcd
[ 2639.054432] usb 1-1.4: New USB device found, idVendor=0525, idProduct=a4a7, bcdDevice= 1.01
[ 2639.054437] usb 1-1.4: New USB device strings: Mfr=1, Product=2, SerialNumber=3
[ 2639.054438] usb 1-1.4: Product: CDC/ACM Serial
[ 2639.054440] usb 1-1.4: Manufacturer: NuttX
[ 2639.054441] usb 1-1.4: SerialNumber: 0
[ 2639.074861] cdc_acm 1-1.4:1.0: ttyACM0: USB ACM device
[ 2639.074886] usbcore: registered new interface driver cdc_acm
[ 2639.074887] cdc_acm: USB Abstract Control Model driver for USB modems and ISDN adapters
</code></pre><p>You may need to press <strong>ENTER</strong> 3 times before the NSH show up.</p><h3 id="sdcard" tabindex="-1">sdcard <a class="header-anchor" href="#sdcard" aria-label="Permalink to &quot;sdcard&quot;">​</a></h3><p>Configures the NuttShell (nsh) and enables SD card support. The stm32f401rc-rs485 has an onboard microSD slot that should be automatically registered as the block device /dev/mmcsd0 when an SD card is present. The SD card can then be mounted by the NSH commands:</p><pre><code>nsh&gt; mount -t procfs /proc
nsh&gt; mount -t vfat /dev/mmcsd0 /mnt
</code></pre><h3 id="modbus-slave" tabindex="-1">modbus_slave <a class="header-anchor" href="#modbus-slave" aria-label="Permalink to &quot;modbus\\_slave&quot;">​</a></h3><p>Configures the NuttShell (nsh) and enables modbus in slave mode. This configuration enables a serial console on USART6. The RS-485 is connected to USART2. Follow below procedure to use modbus test application, you will need a USB to RS-485 converter to connect the board to a PC via RS-485.</p><p>NuttShell configuration:</p><p>Run modbus application at NSH:</p><pre><code>nsh&gt; modbus -help
USAGE: modbus [-d|e|s|q|h]

Where:
  -d : Disable protocol stack
  -e : Enable the protocol stack
  -s : Show current status
  -q : Quit application
  -h : Show this information

nsh&gt; modbus -e
</code></pre><p>PC Configuration:</p><p>Download and install mbpoll application:</p><pre><code>sudo apt install mbpoll
</code></pre><p>Check which TTY USB port is being used by you USB to RS-485 converter:</p><pre><code>sudo dmesg
[99846.668209] usb 1-1.3: Product: USB Serial
[99846.676313] ch341 1-1.3:1.0: ch341-uart converter detected
[99846.677454] usb 1-1.3: ch341-uart converter now attached to ttyUSB1
</code></pre><p>Run the mbpoll as below:</p><pre><code>mbpoll -a 10 -b 38400 -t 3 -r 1000 -c 4 /dev/ttyUSB1 -R
</code></pre><p>At PC terminal you will see the mbpoll application receiving the random values generated by STM32F401RC-RS485 and transmitted over RS-485:</p><pre><code>mbpoll 1.0-0 - FieldTalk(tm) Modbus(R) Master Simulator
Copyright © 2015-2019 Pascal JEAN, https://github.com/epsilonrt/mbpoll
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it
under certain conditions; type &#39;mbpoll -w&#39; for details.

Protocol configuration: Modbus RTU
Slave configuration...: address = [10]
                        start reference = 1000, count = 4
Communication.........: /dev/ttyUSB1,      38400-8E1
                        t/o 1.00 s, poll rate 1000 ms
Data type.............: 16-bit register, input register table
-- Polling slave 10... Ctrl-C to stop)
[1000]:  58080 (-7456)
[1001]:  0
[1002]:  0
[1003]:  0
-- Polling slave 10... Ctrl-C to stop)
[1000]:  6100
[1001]:  0
[1002]:  0
[1003]:  0
-- Polling slave 10... Ctrl-C to stop)
[1000]:  51010 (-14526)
[1001]:  0
[1002]:  0
[1003]:  0
-- Polling slave 10... Ctrl-C to stop)
[1000]:  12528
[1001]:  0
[1002]:  0
[1003]:  0
</code></pre><h3 id="modbus-master" tabindex="-1">modbus_master <a class="header-anchor" href="#modbus-master" aria-label="Permalink to &quot;modbus\\_master&quot;">​</a></h3><p>Configures the NuttShell (nsh) and enables modbus in master mode. This configuration enables a serial console on USART6. The RS-485 is connected to USART2. Follow below procedure to use modbusmaster test application, you will need a USB to RS-485 converter to connect the board to a PC via RS-485.</p><p>PC Configuration:</p><p>Download and install diagslave application from <a href="https://www.modbusdriver.com/diagslave.html" target="_blank" rel="noreferrer">https://www.modbusdriver.com/diagslave.html</a>.</p><p>Check which TTY USB port is being used by you USB to RS-485 converter:</p><pre><code>sudo dmesg
[99846.668209] usb 1-1.3: Product: USB Serial
[99846.676313] ch341 1-1.3:1.0: ch341-uart converter detected
[99846.677454] usb 1-1.3: ch341-uart converter now attached to ttyUSB1
</code></pre><p>Run the diagslave as below:</p><pre><code>sudo diagslave -a 10 -b 38400 /dev/ttyUSB1
</code></pre><p>At PC terminal you will see the diagslave application listening to address 10, notice that this address is configurable via MODBUSMASTER_SLAVEADDR:</p><pre><code>diagslave 3.4 - FieldTalk(tm) Modbus(R) Diagnostic Slave Simulator
Copyright (c) 2002-2021 proconX Pty Ltd
Visit https://www.modbusdriver.com for Modbus libraries and tools.

Protocol configuration: Modbus RTU, frame tolerance = 0ms
Slave configuration: address = 10, master activity t/o = 3.00s
Serial port configuration: /dev/ttyUSB1, 38400, 8, 1, even

Server started up successfully.
Listening to network (Ctrl-C to stop)
Slave  10: readHoldingRegisters from 2, 1 references
.......
</code></pre><p>NuttShell configuration:</p><p>Run modbusmaster application at NSH:</p><pre><code>NuttShell (NSH) NuttX-12.4.0
nsh&gt; modbusmaster
Initializing modbus master...
Creating poll thread.
Sending 100 requests to slave 10
mbmaster_main: Exiting poll thread.
Modbus master statistics:
Requests count:  100
Responses count: 100
Errors count:    0
Deinitializing modbus master...
</code></pre><p>The application modbusmaster will send 100 requests, you can check on diagslave:</p><pre><code>Server started up successfully.
Listening to network (Ctrl-C to stop)
Slave  10: readHoldingRegisters from 2, 1 references
Slave  10: readHoldingRegisters from 2, 1 references
Slave  10: readHoldingRegisters from 2, 1 references
Slave  10: readHoldingRegisters from 2, 1 references
Slave  10: readHoldingRegisters from 2, 1 references
Slave  10: readHoldingRegisters from 2, 1 references
Slave  10: readHoldingRegisters from 2, 1 references
</code></pre><h3 id="lm75" tabindex="-1">lm75 <a class="header-anchor" href="#lm75" aria-label="Permalink to &quot;lm75&quot;">​</a></h3><p>Configures the NuttShell (nsh) over USB Serial (check usbserial configuration) and enables temperature sensor LM75. NSH commands:</p><pre><code>nsh&gt; lm75 -help
Usage: temp [OPTIONS]
  [-n count] selects the samples to collect.  Default: 1 Current: 100
  [-h] shows this message and exits
nsh&gt; lm75 -n 3
30.13 degrees Celsius
30.13 degrees Celsius
30.13 degrees Celsius
</code></pre><h3 id="adc" tabindex="-1">adc <a class="header-anchor" href="#adc" aria-label="Permalink to &quot;adc&quot;">​</a></h3><p>Configures the NuttShell (nsh) over USB Serial (check usbserial configuration) and enables ADC 1 on channels 0 and 4. NSH commands:</p><pre><code>nsh&gt; adc -h
Usage: adc [OPTIONS]

Arguments are &quot;sticky&quot;.  For example, once the ADC device is
specified, that device will be reused until it is changed.

&quot;sticky&quot; OPTIONS include:
  [-p devpath] selects the ADC device.  Default: /dev/adc0 Current: /dev/adc0
  [-n count] selects the samples to collect.  Default: 1 Current: 0
  [-h] shows this message and exits
nsh&gt; adc -n 2
adc_main: g_adcstate.count: 2
adc_main: Hardware initialized. Opening the ADC device: /dev/adc0
Sample:
1: channel: 0 value: 2684
Sample:
1: channel: 4 value: 2682
</code></pre><p>Currently there is a bug that causes the application to always read the same value for channel 0 and 4. If you want to read the value from channel 2, you will need to enable the config &quot;ADC1 Scan Mode&quot;.</p><h3 id="dac" tabindex="-1">dac <a class="header-anchor" href="#dac" aria-label="Permalink to &quot;dac&quot;">​</a></h3><p>Configures the NuttShell (nsh) over USB Serial (check usbserial configuration) and enables PWM 3 on channel 1. Use pwm command on NSH to change dutty cycle, frequency and duration, use dac_out_2 to measure the output voltage. NSH commands:</p><pre><code>nsh&gt; pwm -h
Usage: pwm [OPTIONS]

Arguments are &quot;sticky&quot;.  For example, once the PWM frequency is
specified, that frequency will be reused until it is changed.

&quot;sticky&quot; OPTIONS include:
  [-p devpath] selects the PWM device.  Default: /dev/pwm0 Current: NONE
  [-f frequency] selects the pulse frequency.  Default: 100 Hz Current: 100 Hz
  [-d duty] selects the pulse duty as a percentage.  Default: 50 % Current: 50 %
  [-t duration] is the duration of the pulse train in seconds.  Default: 5 Current: 5
  [-h] shows this message and exits
nsh&gt; pwm -d 50 -t 3
pwm_main: starting output with frequency: 50 duty: 00007fff
pwm_main: stopping output
</code></pre><h3 id="qencoder" tabindex="-1">qencoder <a class="header-anchor" href="#qencoder" aria-label="Permalink to &quot;qencoder&quot;">​</a></h3><p>Configures the NuttShell (nsh) over USB Serial (check usbserial configuration) and enables Timer 3 on channels 1 and 2 to handle Quadrature Encoder. NSH commands:</p><pre><code>nsh&gt; qe -help

Usage: qe [OPTIONS]

OPTIONS include:
  [-p devpath] QE device path
  [-n samples] Number of samples
  [-t msec]    Delay between samples (msec)
  [-r]         Reset the position to zero
  [-h]         Shows this message and exits
  nsh&gt; qe -p /dev/qe0 -n 5 -t 100 -r
  nsh: qe: too many arguments
  qe_main: Hardware initialized. Opening the encoder device: /dev/qe0
  qe_main: Resetting the count...
  qe_main: Number of samples: 5
  qe_main:   1. 0
  qe_main:   2. 0
  qe_main:   3. 4
  qe_main:   4. 2
  qe_main:   5. 2
  Terminating!
</code></pre><h3 id="rndis" tabindex="-1">rndis <a class="header-anchor" href="#rndis" aria-label="Permalink to &quot;rndis&quot;">​</a></h3><p>Configures the NuttShell (nsh), enables a serial console on USART6 and enables RNDIS over USB. NSH commands:</p><pre><code>nsh&gt; mount -t procfs /proc
nsh&gt; ping -h

Usage: ping [-c &lt;count&gt;] [-i &lt;interval&gt;] [-W &lt;timeout&gt;] [-s &lt;size&gt;] &lt;hostname&gt;
ping -h

Where:
&lt;hostname&gt; is either an IPv4 address or the name of the remote host
that is requested the ICMPv4 ECHO reply.
-c &lt;count&gt; determines the number of pings.  Default 10.
-i &lt;interval&gt; is the default delay between pings (milliseconds).
Default 1000.
-W &lt;timeout&gt; is the timeout for wait response (milliseconds).
Default 1000.
-s &lt;size&gt; specifies the number of data bytes to be sent.  Default 56.
-h shows this text and exits.

nsh&gt; ping 10.42.0.1
PING 10.42.0.1 56 bytes of data
56 bytes from 10.42.0.1: icmp_seq=0 time=0.0 ms
56 bytes from 10.42.0.1: icmp_seq=1 time=0.0 ms
...
10 packets transmitted, 10 received, 0% packet loss, time 10100 ms
rtt min/avg/max/mdev = 0.000/0.000/0.000/0.000 ms
</code></pre><h3 id="usbmsc" tabindex="-1">usbmsc <a class="header-anchor" href="#usbmsc" aria-label="Permalink to &quot;usbmsc&quot;">​</a></h3><p>Configures the NuttShell (nsh), enables a serial console on USART6 and enables USB Mass Storage. NSH commands:</p><pre><code>nsh&gt; msconn
mcsonn_main: Creating block drivers
mcsonn_main: Configuring with NLUNS=1
mcsonn_main: handle=0x20004c10
mcsonn_main: Bind LUN=0 to /dev/mmcsd0
mcsonn_main: Connected

nsh&gt; msdis
</code></pre><h3 id="hcs04" tabindex="-1">hcs04 <a class="header-anchor" href="#hcs04" aria-label="Permalink to &quot;hcs04&quot;">​</a></h3><p>Configures the NuttShell (nsh) over USB Serial (check usbserial configuration) and enables ultrasonic sensor HC-SR04:</p><pre><code>nsh&gt; cat /dev/dist0
6241 --&gt; value 
6227
6241
6255
</code></pre><p>You can convert the value using following:</p><pre><code>Convert to cm: value/58
Convert to inches: value/148
</code></pre><h3 id="ssd1309" tabindex="-1">ssd1309 <a class="header-anchor" href="#ssd1309" aria-label="Permalink to &quot;ssd1309&quot;">​</a></h3><p>This config is used to enable support to the transparent OLED display powered by SSD1309. The resolution of this display is 128x64 (although the effective view is 128x56).</p><p>You can wire the display to your board this way:</p><p>OLED PINS</p><hr><p>CS PB7 DC PB8 RESET PB6 SDA PA7 SCK PA5</p><p>The board profile configures the NSH over USB and you can use the fb command to test:</p><pre><code>NuttShell (NSH) NuttX-12.5.1
nsh&gt; fb
VideoInfo:
      fmt: 0
     xres: 128
     yres: 64
  nplanes: 1
PlaneInfo (plane 0):
    fbmem: 0x200034f8
    fblen: 1024
   stride: 16
  display: 0
      bpp: 1
Mapped FB: 0x200034f8
 0: (  0,  0) (128, 64)
 1: ( 11,  5) (106, 54)
 2: ( 22, 10) ( 84, 44)
 3: ( 33, 15) ( 62, 34)
 4: ( 44, 20) ( 40, 24)
 5: ( 55, 25) ( 18, 14)
Test finished
nsh&gt;
</code></pre><h3 id="telnetd" tabindex="-1">telnetd <a class="header-anchor" href="#telnetd" aria-label="Permalink to &quot;telnetd&quot;">​</a></h3><p>Configures the NuttShell (nsh), enables a serial console on USART6, enables RNDIS over USB and enables Device Configuration over Telnet. NSH commands:</p><pre><code>nsh&gt; mount -t procfs /proc
nsh&gt; ifcong
</code></pre><p>Get the ip address assigned to eth0 and convert to hexadecimal, for example 192.168.1.2 becomes 0xC0A80102, than configure CONFIG_NETINIT_IPADDR and CONFIG_EXAMPLES_TELNETD_IPADDR, also configure the router address, in this example it woukd be 0xC0A80101. After theses changes rebuild and load the new firmware on your board:</p><pre><code>nsh&gt; mount -t procfs /proc
nsh&gt; telnetd
</code></pre><p>At your host PC, telnet to IP address for the board:</p><pre><code> telnet 192.168.01.02
</code></pre><p>Now you will be able to access the Device Configuration over Telnet:</p><pre><code>Device Configuration over Telnet
You can add functions to setup your device
Type &#39;?&#39; and press &lt;enter&gt; for help
cfg&gt; ?
Available commands:
help, ?   - show help
reset     - reset the board
exit      - exit shell
</code></pre><h3 id="max7219" tabindex="-1">max7219 <a class="header-anchor" href="#max7219" aria-label="Permalink to &quot;max7219&quot;">​</a></h3><p>Configures the NuttShell (nsh) over USB Serial (check usbserial configuration) and enables LCD driver with MAX7219 for 8x8 LED matrix:</p><pre><code>NuttShell (NSH) NuttX-12.5.1                                      
nsh&gt; 
nsh&gt; nxhello
nxhello_main: NX handle=0x20005420
nxhello_main: Set background color=0
nxhello_listener: Connected
nxhello_main: Screen resolution (32,8)
nxhello_hello: Position (3,0)
nxhello_main: Disconnect from the server
nsh&gt;
</code></pre><p>MAX7219 PINS</p><hr><p>CS PC4 DIN PA7 Clk PA5</p><p>As this LED matrix can be combined either horizontally or vertically, you can configure this using menuconfig:</p><pre><code>Number of 8x8 LEDs matrices in the horizontal (width)
Number of 8x8 LEDs matrices in the vertical (height)
</code></pre><h3 id="mfrc522" tabindex="-1">mfrc522 <a class="header-anchor" href="#mfrc522" aria-label="Permalink to &quot;mfrc522&quot;">​</a></h3><p>Configures the NuttShell (nsh) over USB Serial (check usbserial configuration) and enables RFID driver with MFRC522:</p><pre><code>nsh&gt; rfid_readuid
Trying to READ: Card is not present!
Trying to READ: Card is not present!
Trying to READ: RFID CARD UID = 0x3DB3F169
</code></pre><p>MFRC522 PINS</p><hr><p>SCK PA5 MISO PA6 MOSI PA7 CS PC5</p><p>The board used is based on MFRC522 NXP IC that supports contactless communication at 13.56 MHz and ISO/IEC 14443 A/MIFARE and NTAG.</p><p><img src="`+s+`" alt="" class="align-center"></p><h3 id="bmp280" tabindex="-1">bmp280 <a class="header-anchor" href="#bmp280" aria-label="Permalink to &quot;bmp280&quot;">​</a></h3><p>Configures the NuttShell (nsh) over USB Serial (check usbserial configuration) and enables BMP280 Digital Pressure Sensor. BMP280 has an I2C address that can be configure by SDO. Connecting SDO to GND results in slave address 0x76, connection it to VDD results in slave address 0x77. This can be configured by enabling BMP280_I2C_ADDR_76 or BMP280_I2C_ADDR_77. This configuration uses I2C1 and slave address 0x77.</p><p>SENSOR PINS</p><hr><p>SDA PA7 SCK PB8</p><p>NSH commands:</p><pre><code>NuttShell (NSH) NuttX-12.6.0-RC1
nsh&gt; bmp280
Absolute pressure [hPa] = 911.400024
Temperature [C] = 26.110001
nsh&gt; bmp280
Absolute pressure [hPa] = 932.650024
Temperature [C] = 24.490000
</code></pre><p>There is a known issue where every time the sensor is initialized, the first measurement is wrong, please check <a href="https://github.com/apache/nuttx/issues/12421" target="_blank" rel="noreferrer">https://github.com/apache/nuttx/issues/12421</a> for the latest updates on this issue.</p><h3 id="lcd1602" tabindex="-1">lcd1602 <a class="header-anchor" href="#lcd1602" aria-label="Permalink to &quot;lcd1602&quot;">​</a></h3><p>This configuration sets up the NuttShell (NSH) interface over USB Serial (refer to the usbserial configuration for details). It also enables I2C1 and the driver for an alphanumeric/segment LCD. Specifically, the setup supports a 16x2 LCD screen based on the HD44780 controller, which is interfaced using an I2C adapter known as the LCD Backpack, utilizing the PCF8574 chip.</p><p>LCD PINS</p><hr><p>SDA PA7 SCK PB8</p><p>NSH commands:</p><pre><code>nsh&gt; slcd &quot;Hello NuttX&quot;
Opening /dev/slcd0 for read/write access
Attributes:
  rows: 2 columns: 16 nbars: 0
  max contrast: 0 max brightness: 1
Clear screen
WRITING:
0000: 1b5b46                                                            .[F 
Set brightness to 1
Print [Hello NuttX]
WRITING:
0000: 1b5b471b5b30304c1b5b4548656c6c6f 204e75747458                     .[G.[00L.[EHello  NuttX
Test complete
nsh&gt;
</code></pre><h3 id="ws2812" tabindex="-1">ws2812 <a class="header-anchor" href="#ws2812" aria-label="Permalink to &quot;ws2812&quot;">​</a></h3><p>This configuration sets up the NuttShell (NSH) interface over USB Serial (refer to the usbserial configuration for details). It also enables the driver for an addressable LED WS2812 and the SPI1. The MOSI pin from SPI must be connected to DIN on WS2812 module and the number of LEDs can be configured using CONFIG_WS2812_LED_COUNT.</p><p>WS2812 PINS</p><hr><p>DIN PA7</p><p>NSH commands:</p><pre><code>NuttShell (NSH) NuttX-12.7.0-RC0
nsh&gt; ws2812
</code></pre><h2 id="bmp180" tabindex="-1">bmp180 <a class="header-anchor" href="#bmp180" aria-label="Permalink to &quot;bmp180&quot;">​</a></h2><p>The BMP180 is a digital barometric pressure sensor that provides pressure and temperature readings over I2C. It is commonly used in weather monitoring, altimetry, and embedded sensor applications.</p><p>This guide describes how to configure and use the BMP180 sensor in NuttX with two available drivers: the <strong>regular driver</strong> and the <strong>UORB driver</strong>. It also includes example NSH commands and the required hardware pin configuration.</p><h3 id="initial-setup" tabindex="-1">Initial Setup <a class="header-anchor" href="#initial-setup" aria-label="Permalink to &quot;Initial Setup&quot;">​</a></h3><p>Ensure the NuttShell (NSH) is configured either over USB Serial (configure <code>usbnsh</code>) or via UART (configure <code>nsh</code>) to perform board-level configuration.</p><h3 id="regular-driver" tabindex="-1">Regular Driver <a class="header-anchor" href="#regular-driver" aria-label="Permalink to &quot;Regular Driver&quot;">​</a></h3><p>This driver offers basic access to the BMP180 sensor values directly through a command-line utility.</p><p><strong>Enable the following options using \`\`make menuconfig\`\`:</strong></p><pre><code>CONFIG_ARCH_BOARD_COMMON=y
CONFIG_STM32_I2C1=y
CONFIG_EXAMPLES_BMP180=y
CONFIG_SENSORS=y
CONFIG_SENSORS_BMP180=y
</code></pre><p><strong>NSH usage:</strong></p><pre><code>NuttShell (NSH) NuttX-12.8.0
nsh&gt; bmp180
Pressure value = 93592
Pressure value = 93591
Pressure value = 93595
</code></pre><p>This output shows raw pressure values (in Pascals).</p><h3 id="uorb-driver" tabindex="-1">UORB Driver <a class="header-anchor" href="#uorb-driver" aria-label="Permalink to &quot;UORB Driver&quot;">​</a></h3><p>This driver integrates the sensor into the UORB publish/subscribe system. It supports high-level features such as scheduling and multi-sensor handling.</p><p><strong>Enable the following options using \`\`make menuconfig\`\`:</strong></p><pre><code>CONFIG_ARCH_BOARD_COMMON=y
CONFIG_STM32_I2C1=y
CONFIG_LIBC_FLOATINGPOINT=y
CONFIG_SENSORS=y
CONFIG_SENSORS_BMP180=y
CONFIG_SENSORS_BMP180_UORB=y
CONFIG_SYSTEM_SENSORTEST=y
CONFIG_SYSTEM_SENSORTEST_PROGNAME=&quot;sensor&quot;
CONFIG_SCHED_WORKQUEUE=y
CONFIG_SCHED_LPWORK=y
</code></pre><p><strong>NSH usage:</strong></p><pre><code>NuttShell (NSH) NuttX-12.8.0
nsh&gt; sensor baro0
SensorTest: Test /dev/uorb/sensor_baro0 with interval(1000000us), latency(0us)
baro0: timestamp:2170620000 value1:935.92 value2:224.00
baro0: timestamp:2171630000 value1:935.92 value2:224.00
baro0: timestamp:2172640000 value1:935.89 value2:224.00
</code></pre><ul><li><code>value1</code> corresponds to pressure in hPa (hectopascals).</li><li><code>value2</code> corresponds to temperature in tenths of degrees Celsius (e.g., 224.00 = 22.4°C).</li></ul><p>Connect the BMP180 sensor to the STM32 board using the I2C interface.</p><hr><p>SENSOR PIN</p><hr><p>SDA PB7</p><h2 id="scl-pb8" tabindex="-1">SCL PB8 <a class="header-anchor" href="#scl-pb8" aria-label="Permalink to &quot;SCL      PB8&quot;">​</a></h2><h2 id="st7735" tabindex="-1">ST7735 <a class="header-anchor" href="#st7735" aria-label="Permalink to &quot;ST7735&quot;">​</a></h2><p>This example shows how to bring up and use a ST7735-based TFT LCD display in NuttX.</p><p>How to add support for the ST7735 display to a new board in NuttX:</p><ol><li><strong>LCD Initialization:</strong> Implement LCD initialization/uninitialization in [stm32_lcd_st7735.c]{.title-ref} to handle the display. You can copy this from another board that supports ST7735.</li><li><strong>Update CMakeLists.txt and Make.defs:</strong> Add [stm32_lcd_st7735.c]{.title-ref} if [CONFIG_LCD_ST7735]{.title-ref} is enabled.</li><li><strong>SPI Initialization:</strong> Ensure SPI is configured in [stm32_spi.c]{.title-ref} for the ST7735.</li><li><strong>Board Setup:</strong> Configure GPIO pins for RESET, DC, and CS.</li></ol><p>You can wire the display to your board this way:</p><hr><p>LCD PIN</p><hr><p>CS PB7</p><p>DC PB8</p><p>RESET PB6</p><p>SDA (MOSI) PA7</p><h2 id="sck-sclk-pa5" tabindex="-1">SCK (SCLK) PA5 <a class="header-anchor" href="#sck-sclk-pa5" aria-label="Permalink to &quot;SCK (SCLK)   PA5&quot;">​</a></h2><p>Note</p><p>The ST7735 uses the SPI interface. <code>SDA</code> corresponds to SPI <code>MOSI</code> (Master Out Slave In), and <code>SCK</code> corresponds to SPI <code>SCLK</code> (Serial Clock).</p><h3 id="enable-the-following-options-using-make-menuconfig" tabindex="-1">Enable the following options using <code>make menuconfig</code>: <a class="header-anchor" href="#enable-the-following-options-using-make-menuconfig" aria-label="Permalink to &quot;Enable the following options using \`make menuconfig\`:&quot;">​</a></h3><pre><code>CONFIG_DRIVERS_VIDEO=y
CONFIG_EXAMPLES_FB=y
CONFIG_LCD=y
CONFIG_LCD_FRAMEBUFFER=y
CONFIG_LCD_ST7735=y
CONFIG_SPI_CMDDATA=y
CONFIG_STM32_SPI1=y
CONFIG_VIDEO_FB=y
</code></pre><h3 id="nsh-usage" tabindex="-1">NSH usage <a class="header-anchor" href="#nsh-usage" aria-label="Permalink to &quot;NSH usage&quot;">​</a></h3><pre><code>NuttShell (NSH) NuttX-12.9.0
nsh&gt; fb
VideoInfo:
      fmt: 11
     xres: 160
     yres: 128
  nplanes: 1
PlaneInfo (plane 0):
    fbmem: 0x20003598
    fblen: 40960
   stride: 320
  display: 0
      bpp: 16
Mapped FB: 0x20003598
 0: (  0,  0) (160,128)
 1: ( 14, 11) (132,106)
 2: ( 28, 22) (104, 84)
 3: ( 42, 33) ( 76, 62)
 4: ( 56, 44) ( 48, 40)
 5: ( 70, 55) ( 20, 18)
Test finished
</code></pre>`,229)]))}const b=n(i,[["render",l]]);export{S as __pageData,b as default};
