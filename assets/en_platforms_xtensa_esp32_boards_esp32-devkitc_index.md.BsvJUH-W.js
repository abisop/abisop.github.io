import{_ as a,c as o,al as n,o as i}from"./chunks/framework.NFAqBSgQ.js";const r="/assets/esp32-core-board-v2.DJpIpdy3.jpg",s="/assets/esp32-devkitc-v4-front.D-5helGL.jpg",d="/assets/esp32-audio-config-file.BWOmnNZB.png",t="/assets/esp32-brickmatch-game-schematic.DUfKVyW8.jpg",g=JSON.parse('{"title":"ESP32 DevKitC","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/xtensa/esp32/boards/esp32-devkitc/index.md","filePath":"en/platforms/xtensa/esp32/boards/esp32-devkitc/index.md"}'),c={name:"en/platforms/xtensa/esp32/boards/esp32-devkitc/index.md"};function p(h,e,l,u,m,f){return i(),o("div",null,e[0]||(e[0]=[n('<h1 id="esp32-devkitc" tabindex="-1">ESP32 DevKitC <a class="header-anchor" href="#esp32-devkitc" aria-label="Permalink to &quot;ESP32 DevKitC&quot;">​</a></h1><p>chip:esp32, chip:esp32wroom32</p><p>The <a href="https://docs.espressif.com/projects/esp-idf/en/latest/esp32/hw-reference/modules-and-boards.html#esp32-devkitc-v4" target="_blank" rel="noreferrer">ESP32 DevKitC</a> is a development board for the ESP32 SoC from Espressif, based on a ESP-WROOM-32 module. You can find the original V2 version and the newer V4 variant. They are pin compatible.</p><hr><p><img src="'+r+'" alt="ESP32 DevKitC/Core V2" class="align-center"> <img src="'+s+`" alt="ESP32 DevKitC V4" class="align-center"></p><hr><h2 id="features" tabindex="-1">Features <a class="header-anchor" href="#features" aria-label="Permalink to &quot;Features&quot;">​</a></h2><blockquote><ul><li>ESP32 WROOM Module</li><li>USB-to-UART bridge via micro USB port</li><li>Power LED</li><li>EN and BOOT buttons (BOOT accessible to user)</li><li>SPI FLASH (size varies according to model</li></ul></blockquote><h2 id="serial-console" tabindex="-1">Serial Console <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;Serial Console&quot;">​</a></h2><p>UART0 is, by default, the serial console. It connects to the on-board CP2102 converter and is available on the USB connector USB CON8 (J1).</p><p>It will show up as /dev/ttypUSB[n] where [n] will probably be 0 (is it 1 on my PC because I have a another device at ttyUSB0).</p><h2 id="buttons-and-leds" tabindex="-1">Buttons and LEDs <a class="header-anchor" href="#buttons-and-leds" aria-label="Permalink to &quot;Buttons and LEDs&quot;">​</a></h2><h3 id="board-buttons" tabindex="-1">Board Buttons <a class="header-anchor" href="#board-buttons" aria-label="Permalink to &quot;Board Buttons&quot;">​</a></h3><p>There are two buttons labeled Boot and EN. The EN button is not available to software. It pulls the chip enable line that doubles as a reset line.</p><p>The BOOT button is connected to IO0. On reset it is used as a strapping pin to determine whether the chip boots normally or into the serial bootloader. After reset, however, the BOOT button can be used for software input.</p><h3 id="board-leds" tabindex="-1">Board LEDs <a class="header-anchor" href="#board-leds" aria-label="Permalink to &quot;Board LEDs&quot;">​</a></h3><p>There are several on-board LEDs for that indicate the presence of power and USB activity. None of these are available for use by software.</p><h2 id="ethernet" tabindex="-1">Ethernet <a class="header-anchor" href="#ethernet" aria-label="Permalink to &quot;Ethernet&quot;">​</a></h2><p>ESP32 has a 802.11 hardware MAC, so just connects to external PHY chip. Due to the limited number of GPIOs in ESP32, it&#39;s recommended to use RMII to connect to an external PHY chip. Current driver also only supports RMII option.</p><p>The RMII GPIO pins are fixed, but the SMI and functional GPIO pins are optional.</p><p>RMII GPIO pins are as following:</p><p>ESP32 GPIO PHY Chip GPIO</p><hr><p>IO25 RXD[0] IO26 RXD[1] IO27 CRS_DV IO0 REF_CLK IO19 TXD[0] IO21 TX_EN IO22 TXD[1]</p><p>SMI GPIO pins (default option) are as following:</p><p>ESP32 GPIO PHY Chip GPIO</p><hr><p>IO18 MDIO IO23 MDC</p><p>Functional GPIO pins(default option) are as following:</p><p>ESP32 GPIO PHY Chip GPIO</p><hr><p>IO5 Reset_N</p><p>Espressif has an <a href="https://docs.espressif.com/projects/esp-idf/en/latest/esp32/hw-reference/esp32/get-started-ethernet-kit.html" target="_blank" rel="noreferrer">official Ethernet development board</a>.</p><p>This driver has been tested according to this board and ESP32 core board</p><ul><li>LAN8720 module. If users have some issue about using this driver, please refer the upper official document, specially the issue that GPIO0 causes failing to bring the ESP32 chip up.</li></ul><h2 id="i2s" tabindex="-1">I2S <a class="header-anchor" href="#i2s" aria-label="Permalink to &quot;I2S&quot;">​</a></h2><p>ESP32 has two I2S peripherals accessible using either the generic I2S audio driver or a specific audio codec driver (<a href="https://www.cirrus.com/products/cs4344-45-48/" target="_blank" rel="noreferrer">CS4344</a> bindings are available at the moment). The generic I2S audio driver enables using both the receiver module (RX) and the transmitter module (TX) without using any specific codec. Also, it&#39;s possible to use the I2S character device driver to bypass the audio subsystem and write directly to the I2S peripheral.</p><p>Note</p><p>The I2S peripheral is able to work on two functional modes internally: 16 and 32-bit width. ESP32&#39;s I2S driver, however, uses an internal buffer to enable inserting padding bytes and provide the ability to play 8, 16, 24 or 32-bits/sample audio files. Sample rate and data width are automatically set by the upper half audio driver.</p><p>Note</p><p>Also, it&#39;s possible to use 8, 16, 24, and 32-bit-widths writing directly to the I2S character device. Just make sure to set the bit-width:</p><pre><code> make menuconfig
</code></pre><p>-&gt; System Type</p><p>:</p><pre><code>-\\&gt; ESP32 Peripheral Selection

:   

    -\\&gt; I2S

    :   

        -\\&gt; I2S0/1

        :   -\\&gt; Bit Width
</code></pre><p>And make sure the data stream buffer being written to the I2S peripheral is aligned to the next boundary i.e. 16 bits for the 8 and 16-bit-widths and 32 bits for 24 and 32-bit-widths.</p><p>The following configurations use the I2S peripheral::</p><p>: - <code>platforms/xtensa/esp32/boards/esp32-devkitc/index:audio</code>{.interpreted-text role=&quot;ref&quot;} - <code>platforms/xtensa/esp32/boards/esp32-devkitc/index:i2schar</code>{.interpreted-text role=&quot;ref&quot;} - <code>platforms/xtensa/esp32/boards/esp32-devkitc/index:nxlooper</code>{.interpreted-text role=&quot;ref&quot;}</p><h2 id="pin-mapping" tabindex="-1">Pin Mapping <a class="header-anchor" href="#pin-mapping" aria-label="Permalink to &quot;Pin Mapping&quot;">​</a></h2><p>To be updated</p><p>Pin Signal Notes</p><hr><p>? ? ?</p><h2 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h2><p>All of the configurations presented below can be tested by running the following commands:</p><pre><code> ./tools/configure.sh esp32-devkitc:&lt;config_name&gt;
 make flash ESPTOOL_PORT=/dev/ttyUSB0 -j
</code></pre><p>Where &lt;config_name&gt; is the name of board configuration you want to use, i.e.: nsh, buttons, wifi... Then use a serial console terminal like <code>picocom</code> configured to 115200 8N1.</p><h3 id="adc" tabindex="-1">adc <a class="header-anchor" href="#adc" aria-label="Permalink to &quot;adc&quot;">​</a></h3><p>The <code>adc</code> configuration enables the ADC driver and the ADC example application. ADC Unit 1 is registered to <code>/dev/adc0</code> with channels 0, 3 and 4 enabled by default. Currently, the ADC operates in oneshot mode.</p><p>More ADC channels can be enabled or disabled in <code>ADC Configuration</code> menu.</p><p>This example shows channels 0 and 4 connected to GND and channel 3 to 3.3 V (all readings show in units of mV):</p><pre><code>nsh&gt; adc -n 1
adc_main: g_adcstate.count: 1
adc_main: Hardware initialized. Opening the ADC device: /dev/adc0
Sample:
1: channel: 0 value: 142
2: channel: 3 value: 3441
3: channel: 4 value: 142
</code></pre><h3 id="audio" tabindex="-1">audio <a class="header-anchor" href="#audio" aria-label="Permalink to &quot;audio&quot;">​</a></h3><p>This configuration uses the I2S0 peripheral and an externally connected audio codec to play an audio file streamed over an HTTP connection while connected to a Wi-Fi network.</p><p><strong>Audio Codec Setup</strong></p><p>The CS4344 audio codec is connected on the following pins:</p><p>ESP32 Pin CS4344 Pin Description</p><hr><p>0 MCLK Master Clock 4 SCLK Serial Clock 5 LRCK Left Right Clock (Word Select) 18 SDIN Serial Data In on CS4344. (DOUT on ESP32)</p><p><strong>Simple HTTP server</strong></p><p>Prepare a PCM-encoded ([.wav]{.title-ref}) audio file with 16 or 24 bits/sample (sampled at 16~48kHz). This file must be placed into a folder in a computer that could be accessed on the same Wi-Fi network the ESP32 will be connecting to.</p><p>Python provides a simple HTTP server. <code>cd</code> to the audio file folder on the PC and run:</p><pre><code> python3 -m http.server
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/)
</code></pre><p>Look for your PC IP address and test playing the prepared audio on your browser:</p><p><img src="`+d+`" alt="" class="align-center"></p><p>After successfully built and flashed, connect the board to the Wi-Fi network:</p><pre><code>nsh&gt; wapi psk wlan0 mypasswd 3
nsh&gt; wapi essid wlan0 myssid 1
nsh&gt; renew wlan0
</code></pre><p>Once connected, open NuttX&#39;s player and play the file according to its file name and the IP address of the HTTP server:</p><pre><code>nsh&gt; nxplayer
nxplayer&gt; play http://192.168.1.239:8000/tones.wav
</code></pre><h3 id="autopm" tabindex="-1">autopm <a class="header-anchor" href="#autopm" aria-label="Permalink to &quot;autopm&quot;">​</a></h3><p>This configuration makes the device automatically enter the low power consumption mode when in the idle state, powering off the cpu and other peripherals.</p><p>In minimum power save mode, the station wakes up every DTIM to receive a beacon. The broadcast data will not be lost because it is transmitted after DTIM. However, it can not save much more power if DTIM is short as the DTIM is determined by the access point.</p><h3 id="ble" tabindex="-1">ble <a class="header-anchor" href="#ble" aria-label="Permalink to &quot;ble&quot;">​</a></h3><p>This configuration is used to enable Bluetooth Low Energy support for this board. You can scan for Bluetooth devices using the following commands:</p><pre><code>NuttShell (NSH) NuttX-10.2.0
nsh&gt; ifconfig
bnep0   Link encap:UNSPEC at DOWN
        inet addr:0.0.0.0 DRaddr:0.0.0.0 Mask:0.0.0.0
wlan0   Link encap:Ethernet HWaddr ac:67:b2:53:8b:ec at UP
        inet addr:10.0.0.2 DRaddr:10.0.0.1 Mask:255.255.255.0
nsh&gt; bt bnep0 scan start
nsh&gt; bt bnep0 scan stop
nsh&gt; bt bnep0 scan get
Scan result:
1.     addr:           63:14:2f:b9:9f:83 type: 1
      rssi:            -90
      response type:   3
      advertiser data: 1e ff 06 00 01 09 20 02 7c 33 a3 a7 cd c9 44 5b
2.     addr:           52:ca:05:b5:ad:77 type: 1
      rssi:            -82
      response type:   3
      advertiser data: 1e ff 06 00 01 09 20 02 03 d1 21 57 bf 19 b3 7a
3.     addr:           46:8e:b2:cd:94:27 type: 1
      rssi:            -92
      response type:   2
      advertiser data: 02 01 1a 09 ff c4 00 10 33 14 12 16 80 02 0a d4
4.     addr:           46:8e:b2:cd:94:27 type: 1
      rssi:            -92
      response type:   4
      advertiser data: 18 09 5b 4c 47 5d 20 77 65 62 4f 53 20 54 56 20
5.     addr:           63:14:2f:b9:9f:83 type: 1
      rssi:            -80
      response type:   3
    advertiser data: 1e ff 06 00 01 09 20 02 7c 33 a3 a7 cd c9 44 5b
</code></pre><h3 id="blewifi" tabindex="-1">blewifi <a class="header-anchor" href="#blewifi" aria-label="Permalink to &quot;blewifi&quot;">​</a></h3><p>Combines the capabilities of the <code>ble</code> and <code>wifi</code> configurations. ESP32 has only one 2.4 GHz ISM band RF module, which is shared by Bluetooth (BT &amp; BLE) and Wi-Fi, so Bluetooth can&#39;t receive or transmit data while Wi-Fi is receiving or transmitting data and vice versa. Under such circumstances, ESP32 uses the time-division multiplexing method to receive and transmit packets.</p><h3 id="bmp280" tabindex="-1">bmp280 <a class="header-anchor" href="#bmp280" aria-label="Permalink to &quot;bmp280&quot;">​</a></h3><p>This configuration enables the use of the BMP280 temperature and pressure sensor over I2C. You can check that the sensor is working by using the <code>sensortest</code> application:</p><pre><code>nsh&gt; sensortest baro0
baro0: timestamp:66870000 value1:1008.37 value2:31.70
baro0: timestamp:66890000 value1:1008.31 value2:31.70
</code></pre><h3 id="brickmatch" tabindex="-1">brickmatch <a class="header-anchor" href="#brickmatch" aria-label="Permalink to &quot;brickmatch&quot;">​</a></h3><p>This configuration enables brickmatch game using LCD screen (APA102) and gesture sensor (APDS9960). Alternatively, you can use led matrix (ws2812) by enabling [GAMES_BRICKMATCH_USE_LED_MATRIX]{.title-ref} option for output device. Also for input device selection you can enable [GAMES_BRICKMATCH_USE_DJOYSTICK]{.title-ref} to use joystick, [GAMES_BRICKMATCH_USE_GPIO]{.title-ref} to use gpio and [GAMES_BRICKMATCH_USE_CONSOLEKEY]{.title-ref} to use serial console.</p><p>You can run the game by using <code>brick</code> command:</p><pre><code>nsh&gt; brick
</code></pre><p>Here is the sample wiring diagram that demonstrates how to wire ws2812 with buttons for brickmatch example:</p><p><img src="`+t+`" alt="" class="align-center"></p><h3 id="buttons" tabindex="-1">buttons <a class="header-anchor" href="#buttons" aria-label="Permalink to &quot;buttons&quot;">​</a></h3><p>This configuration shows the use of the buttons subsystem. It can be used by executing the <code>buttons</code> application and pressing on any of the available board buttons:</p><pre><code>nsh&gt; buttons
buttons_main: Starting the button_daemon
buttons_main: button_daemon started
button_daemon: Running
button_daemon: Opening /dev/buttons
button_daemon: Supported BUTTONs 0x01
nsh&gt; Sample = 1
Sample = 0
</code></pre><h3 id="capture" tabindex="-1">capture <a class="header-anchor" href="#capture" aria-label="Permalink to &quot;capture&quot;">​</a></h3><p>The capture configuration enables the capture driver and the capture example, allowing the user to measure duty cycle and frequency of a signal. Default pin is GPIO 14 with an internal pull-up resistor enabled. When connecting a 50 Hz pulse with 50% duty cycle, the following output is expected:</p><pre><code>nsh&gt; cap
cap_main: Hardware initialized. Opening the capture device: /dev/capture0
cap_main: Number of samples: 0
pwm duty cycle: 50 %
pwm frequency: 50 Hz
pwm duty cycle: 50 %
pwm frequency: 50 Hz
</code></pre><h3 id="coremark" tabindex="-1">coremark <a class="header-anchor" href="#coremark" aria-label="Permalink to &quot;coremark&quot;">​</a></h3><p>This configuration sets the CoreMark benchmark up for running on the maximum number of cores for this system. It also enables some optimization flags and disables the NuttShell to get the best possible score.</p><p>Note</p><p>As the NSH is disabled, the application will start as soon as the system is turned on.</p><h3 id="cxx" tabindex="-1">cxx <a class="header-anchor" href="#cxx" aria-label="Permalink to &quot;cxx&quot;">​</a></h3><p>Development environment ready for C++ applications. You can check if the setup was successful by running <code>cxxtest</code>:</p><pre><code>nsh&gt; cxxtest
Test ofstream ================================
printf: Starting test_ostream
printf: Successfully opened /dev/console
cout: Successfully opened /dev/console
Writing this to /dev/console
Test iostream ================================
Hello, this is only a test
Print an int: 190
Print a char: d
Test std::vector =============================
v1=1 2 3
Hello World Good Luck
Test std::map ================================
Test C++17 features ==========================
File /proc/meminfo exists!
Invalid file! /invalid
File /proc/version exists!
</code></pre><h3 id="dac" tabindex="-1">dac <a class="header-anchor" href="#dac" aria-label="Permalink to &quot;dac&quot;">​</a></h3><p>This configuration enables DAC and registers a <a href="https://github.com/apache/nuttx-apps/tree/master/examples/dac" target="_blank" rel="noreferrer">DAC example application</a>.</p><p>Note</p><p>The DAC module is hard-wired to pins 25 (channel 0) and 26 (channel 1). The default device name is <code>/dev/dac0</code> and can be changed in the config menu.</p><p>Note</p><p>The DAC channels in <a href="https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/peripherals/dac.html" target="_blank" rel="noreferrer">IDF</a> are numbered <code>channel 1</code> (pin 25) and <code>channel 2</code> (pin 26).</p><p>Note</p><p>Max value 255 should be close to VRef (3.3V) but it probably will not. You can more realistically expect to get voltage around 3.09V.</p><p>With this example you can use (not only) the following commands:</p><p>For a multimeter, you can use the command:</p><p><code>dac -d 5000 -s 32 test</code></p><p>For oscilloscope or anything else with tracing:</p><p><code>dac -d 0 -s 4 test</code></p><p>For more info about the example capabilities invoke help message by typing</p><p><code>dac -h</code></p><h3 id="efuse" tabindex="-1">efuse <a class="header-anchor" href="#efuse" aria-label="Permalink to &quot;efuse&quot;">​</a></h3><p>A <code>wifi</code> configuration with the eFuse driver enabled. It can be accessed through the <code>/dev/efuse</code> device file.</p><h3 id="elf" tabindex="-1">elf <a class="header-anchor" href="#elf" aria-label="Permalink to &quot;elf&quot;">​</a></h3><p>This configuration uses apps/examples/elf in order to test the ELF loader. It can be tested by executing the <code>elf</code> application.</p><h3 id="espnow" tabindex="-1">espnow <a class="header-anchor" href="#espnow" aria-label="Permalink to &quot;espnow&quot;">​</a></h3><p>WARNING: espnow and wifi are using the same hardware on the esp32. When a connection to a accespoint is made while espnow is operational the espnow connection will break if the accesspoint wants to use a different wifi channel.</p><p>A <code>espnow</code> setup can be used to create a 6lowpan network of esp32 nodes. A sample configuration is found in <code>esp32-devkitc:espnow</code>. The node address can be changed under <code>ESP32 Peripherals</code> option <code>Espnow</code>. The node address is direct related to the ipv6 address of the node. Changing the ipv6 address also changes the node address.</p><p>To test the communication using <code>udpserver</code> and <code>udpclient</code> two nodes need to be prepared with different ipv6 address.</p><p>The server node is assigned the node address <code>0x000a</code> and the udp server is started using:</p><p>The client node can use the default node address (<code>0xfffe</code>) and the updclient can be started using:</p><p>The server node will show the incoming messages:</p><p>The sample configuration also allows a telnet session over espnow:</p><p>On the server (node <code>0x000a</code>):</p><p>On the client (node <code>Oxfffe</code>):</p><h3 id="i2schar" tabindex="-1">i2schar <a class="header-anchor" href="#i2schar" aria-label="Permalink to &quot;i2schar&quot;">​</a></h3><p>This configuration enables the I2S character device and the i2schar example app, which provides an easy-to-use way of testing the I2S peripherals (I2S0 and I2S1), enabling both the TX and the RX for those peripherals.</p><p><strong>I2S0 pinout</strong></p><p>ESP32 Pin Signal Pin Description</p><hr><p>0 MCLK Master Clock 4 BCLK Bit Clock (SCLK) 5 WS Word Select (LRCLK) 18 DOUT Data Out 19 DIN Data IN</p><p><strong>I2S1 pinout</strong></p><p>ESP32 Pin Signal Pin Description</p><hr><p>22 BCLK Bit Clock (SCLK) 23 WS Word Select (LRCLK) 25 DOUT Data Out 26 DIN Data IN</p><p>After successfully built and flashed, run on the boards&#39;s terminal:</p><pre><code>i2schar -p /dev/i2schar[0-1]
</code></pre><p>The corresponding output should show related debug information.</p><h3 id="knsh" tabindex="-1">knsh <a class="header-anchor" href="#knsh" aria-label="Permalink to &quot;knsh&quot;">​</a></h3><p>This is identical to the nsh configuration except that (1) NuttX is built as PROTECTED mode, monolithic module and the user applications are built separately and, as a consequence, (2) some features that are only available in the FLAT build are disabled.</p><p>Protected Mode support for ESP32 relies on the PID Controller peripheral for implementing isolation between Kernel and Userspace.</p><p>By working together with the MMU and Static MPUs of the ESP32, the PID Controller is able to restrict the application access to peripherals, on-chip memories (Internal ROM and Internal SRAM) and off-chip memories (External Flash and PSRAM).</p><p>Warning</p><p>* The PID Controller driver is in <strong>EXPERIMENTAL</strong> state, so please consider the Protected Mode feature for ESP32 a <strong>Proof-of-Concept</strong>. * The PID Controller <strong>does not</strong> prevent the application from accessing CPU System Registers.</p><h3 id="leds" tabindex="-1">leds <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;leds&quot;">​</a></h3><p>This configuration uses the on-board LED (or an external LED connected to GPIO2) to demonstrate the use of the userleds subsystem:</p><pre><code>nsh&gt; leds
leds_main: Starting the led_daemon
leds_main: led_daemon started
led_daemon (pid# 3): Running
led_daemon: Opening /dev/userleds
led_daemon: Supported LEDs 0x01
led_daemon: LED set 0x01
led_daemon: LED set 0x00
led_daemon: LED set 0x01
led_daemon: LED set 0x00
led_daemon: LED set 0x01
</code></pre><h3 id="max6675" tabindex="-1">max6675 <a class="header-anchor" href="#max6675" aria-label="Permalink to &quot;max6675&quot;">​</a></h3><p>This configuration enables the use of the MAX6675 temperature sensor over SPI. The following pin configuration is used to connect the sensor:</p><p>Pin Signal</p><hr><p>15 CS 14 SCK 12 MISO</p><p>You can check that the sensor is working by using the <code>max6675</code> application:</p><pre><code>nsh&gt; max6675
Unable to open file /dev/temp1
Unable to open file /dev/temp2
Unable to open file /dev/temp3
Starting...
Channel SSP0/SPI1 Device 0: Temperature = 24!
Channel SSP0/SPI1 Device 1: Not enabled!
Channel SSP1/SPI2 Device 0: Not enabled!
Channel SSP1/SPI2 Device 1: Not enabled!
</code></pre><h3 id="mcp2515" tabindex="-1">mcp2515 <a class="header-anchor" href="#mcp2515" aria-label="Permalink to &quot;mcp2515&quot;">​</a></h3><p>This config is used to communicate with MCP2515 CAN over SPI chip. SPI3 is used and kept with the default IOMUX pins, i.e.:</p><p>Pin Signal</p><hr><p>5 CS 18 SCK 23 MOSI 19 MISO</p><p>The MCP2515 interrupt (INT) pin is connected to the pin 22 of the ESP32-Devkit.</p><h3 id="mcuboot-nsh" tabindex="-1">mcuboot_nsh <a class="header-anchor" href="#mcuboot-nsh" aria-label="Permalink to &quot;mcuboot\\_nsh&quot;">​</a></h3><p>This configuration is the same as the <code>nsh</code> configuration, but it generates the application image in a format that can be used by MCUboot. It also makes the <code>make bootloader</code> command to build the MCUboot bootloader image using the Espressif HAL.</p><h3 id="mcuboot-slot-confirm" tabindex="-1">mcuboot_slot_confirm <a class="header-anchor" href="#mcuboot-slot-confirm" aria-label="Permalink to &quot;mcuboot\\_slot\\_confirm&quot;">​</a></h3><p>This configuration is used to represent an MCUboot update image that needs to be confirmed after flashing. The image can be confirmed by using the following command:</p><pre><code>nsh&gt; mcuboot_confirm
Application Image successfully confirmed!
</code></pre><p>For more information, check <a href="https://www.youtube.com/watch?v=Vzy0rl-ixbc" target="_blank" rel="noreferrer">this demo</a>.</p><h3 id="mcuboot-update-agent" tabindex="-1">mcuboot_update_agent <a class="header-anchor" href="#mcuboot-update-agent" aria-label="Permalink to &quot;mcuboot\\_update\\_agent&quot;">​</a></h3><p>This configuration is used to represent an MCUboot image that contains an update agent to perform OTA updates. First, you will have to setup a HTTP server to provide the update image. To do that, we can run a simple Python server on the same folder that contains our binary file on the computer:</p><pre><code>sudo python -m http.server 8080
</code></pre><p>After this, we can use NSH to connect to our network and use the agent to perform the firmware update:</p><pre><code>nsh&gt; ifup wlan0
nsh&gt; wapi mode wlan0 2
nsh&gt; wapi psk wlan0 mypasswd 3
nsh&gt; wapi essid wlan0 myssid 1
nsh&gt; renew wlan0
nsh&gt; mcuboot_agent http://&lt;SERVER_IP&gt;:8080/nuttx.bin
</code></pre><p>For more information, check <a href="https://www.youtube.com/watch?v=Vzy0rl-ixbc" target="_blank" rel="noreferrer">this demo</a>.</p><h3 id="modbus" tabindex="-1">modbus <a class="header-anchor" href="#modbus" aria-label="Permalink to &quot;modbus&quot;">​</a></h3><p>This configurations shows how to use this device as a ModBus RTU Slave. After configuring the desired pins on menuconfig and wiring the RS485 converter, you can enable the ModBus to respond to queries:</p><pre><code>nsh&gt; modbus -e
</code></pre><p>Now you will be able to read the ModBus registers using an application like <code>mbpoll</code>. For more information, check <a href="https://www.youtube.com/watch?v=bLUGLJIjt4E" target="_blank" rel="noreferrer">this video</a>.</p><h3 id="module" tabindex="-1">module <a class="header-anchor" href="#module" aria-label="Permalink to &quot;module&quot;">​</a></h3><p>This config is to run apps/examples/module.</p><h3 id="motor" tabindex="-1">motor <a class="header-anchor" href="#motor" aria-label="Permalink to &quot;motor&quot;">​</a></h3><p>The motor configuration enables the MCPWM peripheral with support to brushed DC motor control.</p><p>It creates a <code>/dev/motor0</code> device with speed and direction control capabilities by using two GPIOs (GPIO15 and GPIO16) for PWM output. PWM frequency is configurable from 25 Hz to 3 kHz, however it defaults to 1 kHz. There is also support for an optional fault GPIO (defaults to GPIO10), which can be used for quick motor braking. All GPIOs are configurable in <code>menuconfig</code>.</p><h3 id="mqttc" tabindex="-1">mqttc <a class="header-anchor" href="#mqttc" aria-label="Permalink to &quot;mqttc&quot;">​</a></h3><p>This configuration tests the MQTT-C publisher example.</p><p>From the host, start the broker and subscribe to the <code>test</code> topic. Using <code>mosquitto</code> this should be:</p><pre><code> mosquitto&amp;
 mosquitto_sub -t test
</code></pre><p>From the NSH, connect to an access point:</p><pre><code>nsh&gt; wapi psk wlan0 mypasswd 3
nsh&gt; wapi essid wlan0 myssid 1
nsh&gt; renew wlan0
</code></pre><p>Publish to the broker:</p><pre><code>nsh&gt; mqttc_pub -h 192.168.1.11
</code></pre><p>The default behavior is to publish the message <code>test</code>. The following should be outputted:</p><pre><code>nsh&gt; mqttc_pub -h 192.168.1.11
     Success: Connected to broker!
     Success: Published to broker!

     Disconnecting from 192.168.1.11
</code></pre><p>From the host the message <code>test</code> should be outputted.</p><h3 id="ms5611" tabindex="-1">ms5611 <a class="header-anchor" href="#ms5611" aria-label="Permalink to &quot;ms5611&quot;">​</a></h3><p>This configuration enables the use of the MS5611 pressure sensor over I2C. You can check that the sensor is working by using the <code>sensortest</code> application:</p><pre><code>nsh&gt; sensortest baro0
baro0: timestamp:66870000 value1:1008.37 value2:31.70
baro0: timestamp:66890000 value1:1008.31 value2:31.70
</code></pre><h3 id="nsh" tabindex="-1">nsh <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh&quot;">​</a></h3><p>Basic NuttShell configuration (console enabled in UART0, exposed via USB connection by means of CP2102 converter, at 115200 bps).</p><h3 id="nxdiag" tabindex="-1">nxdiag <a class="header-anchor" href="#nxdiag" aria-label="Permalink to &quot;nxdiag&quot;">​</a></h3><p>This configuration enables the NuttX diagnostics tool. By default, it will gather information about the NuttX system, its configuration, the compilation and linking flags used, the host system PATH and Espressif specific information. It can be used by executing the <code>nxdiag</code> application:</p><pre><code>nsh&gt; nxdiag --all
Nxdiag Report:

NuttX RTOS info:
        Hostname:
        Release: 10.4.0
        Build: 75e13a67ba-dirty May 24 2023 14:53:27
        Arch: xtensa
        Config: esp32-devkitc:nxdiag

NuttX CFLAGS:
        -fno-common
        -Wall
        ...
</code></pre><h3 id="nxlooper" tabindex="-1">nxlooper <a class="header-anchor" href="#nxlooper" aria-label="Permalink to &quot;nxlooper&quot;">​</a></h3><p>This configuration uses the I2S1 peripheral as an I2S receiver and the I2S0 peripheral as an I2S transmitter. The idea is to capture an I2S data frame using an I2S peripheral and reproduce the captured data on the other.</p><p><strong>Receiving data on I2S1</strong></p><p>The I2S1 will act as a receiver (master mode), capturing data from DIN, which needs to be connected to an external source as follows:</p><p>ESP32 Pin Signal Pin Description</p><hr><p>22 BCLK Bit Clock (SCLK) 23 WS Word Select (LRCLK) 26 DIN Data IN</p><p><strong>Transmitting data on I2S0</strong></p><p>The I2S0 will act as a transmitter (master mode), replicating the data captured on I2S1. The pinout for the transmitter is as follows:</p><p>ESP32 Pin Signal Pin Description</p><hr><p>0 MCLK Master Clock 4 BCLK Bit Clock (SCLK) 5 WS Word Select (LRCLK) 18 DOUT Data Out</p><p>Note</p><p>The audio codec CS4344 can be connected to the transmitter pins to reproduce the captured data if the receiver&#39;s source is an audio data.</p><p><strong>nxlooper</strong></p><p>The <code>nxlooper</code> application captures data from the audio device with receiving capabilities (the I2S1 on this example) and forwards the audio data frame to the audio device with transmitting capabilities (the I2S0 on this example).</p><p>After successfully built and flashed, run on the boards&#39; terminal:</p><pre><code>nsh&gt; nxlooper
nxlooper&gt; loopback
</code></pre><p>Note</p><p><code>loopback</code> command default arguments for the channel configuration, the data width and the sample rate are, respectively, 2 channels, 16 bits/sample and 48KHz. These arguments can be supplied to select different audio formats, for instance:</p><p>nxlooper&gt; loopback 2 8 44100</p><h3 id="oneshot" tabindex="-1">oneshot <a class="header-anchor" href="#oneshot" aria-label="Permalink to &quot;oneshot&quot;">​</a></h3><p>This config demonstrate the use of oneshot timers present on the ESP32. To test it, just run the <code>oneshot</code> example:</p><pre><code>nsh&gt; oneshot
Opening /dev/oneshot
Maximum delay is 4294967295999999
Starting oneshot timer with delay 2000000 microseconds
Waiting...
Finished
</code></pre><h3 id="ostest" tabindex="-1">ostest <a class="header-anchor" href="#ostest" aria-label="Permalink to &quot;ostest&quot;">​</a></h3><p>This is the NuttX test at <code>apps/testing/ostest</code> that is run against all new architecture ports to assure a correct implementation of the OS. The default version is for a single CPU but can be modified for an SMP test by adding:</p><pre><code>CONFIG_SMP=y
CONFIG_SMP_NCPUS=2
CONFIG_SPINLOCK=y
</code></pre><h3 id="pm" tabindex="-1">pm <a class="header-anchor" href="#pm" aria-label="Permalink to &quot;pm&quot;">​</a></h3><p>This configuration enables the CPU power management through governors.</p><h3 id="psram" tabindex="-1">psram <a class="header-anchor" href="#psram" aria-label="Permalink to &quot;psram&quot;">​</a></h3><p>This config tests the PSRAM driver over SPIRAM interface. You can use the ramtest command to test the PSRAM memory. We are testing only 64KB on this example (64 * 1024), but you can change this number to 2MB or 4MB depending on PSRAM chip used on your board:</p><pre><code>nsh&gt; ramtest -w 0x3F800000 65536
RAMTest: Marching ones: 3f800000 65536
RAMTest: Marching zeroes: 3f800000 65536
RAMTest: Pattern test: 3f800000 65536 55555555 aaaaaaaa
RAMTest: Pattern test: 3f800000 65536 66666666 99999999
RAMTest: Pattern test: 3f800000 65536 33333333 cccccccc
RAMTest: Address-in-address test: 3f800000 65536
</code></pre><h3 id="psram-usrheap" tabindex="-1">psram_usrheap <a class="header-anchor" href="#psram-usrheap" aria-label="Permalink to &quot;psram\\_usrheap&quot;">​</a></h3><p>This configuration works just like <code>psram</code> but allocating the user heap on the PSRAM.</p><h3 id="pwm" tabindex="-1">pwm <a class="header-anchor" href="#pwm" aria-label="Permalink to &quot;pwm&quot;">​</a></h3><p>This configuration demonstrates the use of PWM through a LED connected to GPIO12. To test it, just execute the <code>pwm</code> application:</p><pre><code>nsh&gt; pwm
pwm_main: starting output with frequency: 10000 duty: 00008000
pwm_main: stopping output
</code></pre><p>qencoder ---</p><p>This configuration demonstrates the use of Quadrature Encoder connected to pins GPIO10 and GPIO11. You can start measurement of pulses using the following command (by default, it will open <code>\\dev\\qe0</code> device and print 20 samples using 1 second delay):</p><pre><code>nsh&gt; qe
</code></pre><h3 id="random" tabindex="-1">random <a class="header-anchor" href="#random" aria-label="Permalink to &quot;random&quot;">​</a></h3><p>This configuration shows the use of the ESP32&#39;s True Random Number Generator with entropy sourced from Wi-Fi and Bluetooth noise. To test it, just run <code>rand</code> to get 32 randomly generated bytes:</p><pre><code>nsh&gt; rand
Reading 8 random numbers
Random values (0x3ffe0b00):
0000  98 b9 66 a2 a2 c0 a2 ae 09 70 93 d1 b5 91 86 c8  ..f......p......
0010  8f 0e 0b 04 29 64 21 72 01 92 7c a2 27 60 6f 90  ....)d!r..|.&#39;\`o.
</code></pre><h3 id="rmt" tabindex="-1">rmt <a class="header-anchor" href="#rmt" aria-label="Permalink to &quot;rmt&quot;">​</a></h3><p>This configuration enables usage of Remote Control Transceiver (RMT) module and example <code>ws2812esp32</code> demonstrating the usage of <strong>RMT</strong> by driving RGB LEDs. To test the module connect a Data pin of RGB LED compatible with WS2812 to ESP32 GPIO 4 and run:</p><pre><code>nsh&gt; ws2812esp32 0 &lt;number_of_leds_on_strip&gt;
</code></pre><h3 id="rtc" tabindex="-1">rtc <a class="header-anchor" href="#rtc" aria-label="Permalink to &quot;rtc&quot;">​</a></h3><p>This configuration demonstrates the use of the RTC driver through alarms. You can set an alarm, check its progress and receive a notification after it expires:</p><pre><code>nsh&gt; alarm 10
alarm_daemon started
alarm_daemon: Running
Opening /dev/rtc0
Alarm 0 set in 10 seconds
nsh&gt; alarm -r
Opening /dev/rtc0
Alarm 0 is active with 10 seconds to expiration
nsh&gt; alarm_daemon: alarm 0 received
</code></pre><h3 id="smp" tabindex="-1">smp <a class="header-anchor" href="#smp" aria-label="Permalink to &quot;smp&quot;">​</a></h3><p>Another NSH configuration, similar to nsh, but also enables SMP operation. It differs from the nsh configuration only in these additional settings:</p><p>SMP is enabled:</p><pre><code>CONFIG_SMP=y
CONFIG_SMP_NCPUS=2
CONFIG_SPINLOCK=y
</code></pre><p>The apps/testing/smp test is included:</p><pre><code>CONFIG_TESTING_SMP=y
CONFIG_TESTING_SMP_NBARRIER_THREADS=8
CONFIG_TESTING_SMP_PRIORITY=100
CONFIG_TESTING_SMP_STACKSIZE=2048
</code></pre><h3 id="snake" tabindex="-1">snake <a class="header-anchor" href="#snake" aria-label="Permalink to &quot;snake&quot;">​</a></h3><p>This configuration enables snake game using led matrix (ws2812) and gpio pins. Alternatively, you can use serial console for input with enabling [GAMES_SNAKE_USE_CONSOLEKEY]{.title-ref} option.</p><p>You can run the game by using <code>snake</code> command:</p><pre><code>nsh&gt; snake
</code></pre><p>Here is the sample wiring diagram that demonstrates how to wire ws2812 with buttons for snake example:</p><p><img src="`+t+`" alt="" class="align-center"></p><h3 id="sotest" tabindex="-1">sotest <a class="header-anchor" href="#sotest" aria-label="Permalink to &quot;sotest&quot;">​</a></h3><p>This config is to run <code>apps/examples/sotest</code>.</p><h3 id="spiflash" tabindex="-1">spiflash <a class="header-anchor" href="#spiflash" aria-label="Permalink to &quot;spiflash&quot;">​</a></h3><p>This config tests the external flash memory that comes with the ESP32 module connected through SPI1.</p><p>By default a SmartFS file system is selected. Once booted you can use the following commands to mount the file system:</p><pre><code>nsh&gt; mksmartfs /dev/smart0
nsh&gt; mount -t smartfs /dev/smart0 /mnt
</code></pre><p>Note that mksmartfs is only needed the first time.</p><h3 id="sta-softap" tabindex="-1">sta_softap <a class="header-anchor" href="#sta-softap" aria-label="Permalink to &quot;sta\\_softap&quot;">​</a></h3><p>With this configuration you can run these commands to be able to connect your smartphone or laptop to your board:</p><pre><code>nsh&gt; ifup wlan1
nsh&gt; dhcpd_start wlan1
nsh&gt; wapi psk wlan1 mypasswd 3
nsh&gt; wapi essid wlan1 nuttxap 1
</code></pre><p>In this case, you are creating the access point <code>nuttxapp</code> in your board and to connect to it on your smartphone you will be required to type the password <code>mypasswd</code> using WPA2.</p><p>Tip</p><p>Please refer to <code>ESP32 Wi-Fi SoftAP Mode &lt;esp32_wi-fi_softap&gt;</code>{.interpreted-text role=&quot;ref&quot;} for more information.</p><p>The <code>dhcpd_start</code> is necessary to let your board to associate an IP to your smartphone.</p><h3 id="tickless" tabindex="-1">tickless <a class="header-anchor" href="#tickless" aria-label="Permalink to &quot;tickless&quot;">​</a></h3><p>This configuration enables the support for tickless scheduler mode.</p><h3 id="timer" tabindex="-1">timer <a class="header-anchor" href="#timer" aria-label="Permalink to &quot;timer&quot;">​</a></h3><p>This config test the general use purpose timers. It includes the 4 timers, adds driver support, registers the timers as devices and includes the timer example.</p><p>To test it, just run the following:</p><pre><code>nsh&gt; timer -d /dev/timerx
</code></pre><p>Where x in the timer instance.</p><h3 id="twai" tabindex="-1">twai <a class="header-anchor" href="#twai" aria-label="Permalink to &quot;twai&quot;">​</a></h3><p>This configuration enables the support for the TWAI (Two-Wire Automotive Interface) driver. You can test it by connecting TWAI RX and TWAI TX pins which are GPIO0 and GPIO2 by default to a external transceiver or connecting TWAI RX to TWAI TX pin by enabling the <code>Device Drivers -&gt; CAN Driver Support -&gt; CAN loopback mode</code> option and running the <code>can</code> example:</p><pre><code>nsh&gt; can
nmsgs: 0
min ID: 1 max ID: 2047
Bit timing:
  Baud: 1000000
  TSEG1: 15
  TSEG2: 4
    SJW: 3
  ID:    1 DLC: 1
</code></pre><h3 id="wamr-wasi-debug" tabindex="-1">wamr_wasi_debug <a class="header-anchor" href="#wamr-wasi-debug" aria-label="Permalink to &quot;wamr\\_wasi\\_debug&quot;">​</a></h3><p>This config is an example to use wasm-micro-runtime. It can run both of wasm bytecode and AoT compiled modules.</p><p>This example uses littlefs on ESP32&#39;s SPI flash to store wasm modules.</p><ol><li><p>Create a littlefs image which contains wasm modules.</p><p><a href="https://github.com/jrast/littlefs-python/blob/master/examples/mkfsimg.py" target="_blank" rel="noreferrer">https://github.com/jrast/littlefs-python/blob/master/examples/mkfsimg.py</a> is used in the following example:</p><pre><code>% python3 mkfsimg.py \\
  --img-filename ..../littlefs.bin \\
  --img-size 2621440 \\
  --block-size 4096 \\
  --prog-size 256 \\
  --read-size 256 \\
  --name-max 32 \\
  --disk-version 2.0 \\
  ..../wasm_binary_directory
</code></pre></li><li><p>Write the NuttX image and the filesystem to ESP32:</p><pre><code>% esptool.py \\
  --chip esp32 \\
  --port /dev/tty.SLAB_USBtoUART \\
  --baud 921600 \\
  write_flash \\
  0x1000 ..../bootloader-esp32.bin \\
  0x8000 ..../partition-table-esp32.bin \\
  0x10000 nuttx.bin \\
  0x180000 ..../littlefs.bin
</code></pre></li><li><p>Mount the filesystem and run a wasm module on it:</p><pre><code>nsh&gt; mount -t littlefs /dev/esp32flash /mnt
nsh&gt; iwasm /mnt/....
</code></pre></li></ol><h3 id="wifi" tabindex="-1">wifi <a class="header-anchor" href="#wifi" aria-label="Permalink to &quot;wifi&quot;">​</a></h3><p>Enables Wi-Fi support. You can define your credentials this way:</p><pre><code> make menuconfig
-&gt; Application Configuration
    -&gt; Network Utilities
        -&gt; Network initialization (NETUTILS_NETINIT [=y])
            -&gt; WAPI Configuration
</code></pre><p>Or if you don&#39;t want to keep it saved in the firmware you can do it at runtime:</p><pre><code>nsh&gt; wapi psk wlan0 mypasswd 3
nsh&gt; wapi essid wlan0 myssid 1
nsh&gt; renew wlan0
</code></pre><p>Tip</p><p>Please refer to <code>ESP32 Wi-Fi Station Mode &lt;esp32_wi-fi_sta&gt;</code>{.interpreted-text role=&quot;ref&quot;} for more information.</p><h3 id="wifi-smp" tabindex="-1">wifi_smp <a class="header-anchor" href="#wifi-smp" aria-label="Permalink to &quot;wifi\\_smp&quot;">​</a></h3><p>This configuration is similar to <code>wifi</code>. It also enables multiple cores on the CPU.</p><h3 id="watchdog" tabindex="-1">watchdog <a class="header-anchor" href="#watchdog" aria-label="Permalink to &quot;watchdog&quot;">​</a></h3><p>This config test the watchdog timers. It includes the 2 MWDTS, adds driver support, registers the WDTs as devices and includes the watchdog example.</p><p>To test it, just run the following:</p><pre><code>nsh&gt; wdog -i /dev/watchdogx
</code></pre><p>Where x is the watchdog instance.</p><h3 id="watcher" tabindex="-1">watcher <a class="header-anchor" href="#watcher" aria-label="Permalink to &quot;watcher&quot;">​</a></h3><p>This configuration is an example of monitoring watchdog interrupts. To test it, enable the watcher daemon with <code>watcher</code> and monitor the tasks using <code>watched</code>:</p><pre><code>nsh&gt; watcher
Watcher Daemon has started!
nsh&gt; watched
Starting watched tasks
Creating Watched Task 1 - It will not feed the dog
Creating Watched Task 2 - It will feed the dog
Creating Watched Task 3 - It will feed the dog
Creating Watched Task 4 - It will not feed the dog
nsh&gt; *** Printing Tasks Status ***
Watched Task 1 starved the dog.
Watched Task 2 fed the dog.
Watched Task 3 fed the dog.
Watched Task 4 fed the dog.
*** Printing Tasks Status ***
Watched Task 1 starved the dog.
Watched Task 2 fed the dog.
Watched Task 3 fed the dog.
Watched Task 4 starved the dog.
</code></pre><h3 id="wifinsh" tabindex="-1">wifinsh <a class="header-anchor" href="#wifinsh" aria-label="Permalink to &quot;wifinsh&quot;">​</a></h3><p>The <code>wifinsh</code> is similar to the <code>wifi</code> board example, but it will connect automatically to your Access Point (Wi-Fi Router) and will run telnet daemon in the board. Then you can connect to your board from your computer using the telnet program.</p><p>After configuring the <code>esp32-devkit:wifinsh</code> you need to define your creden-tials in the menuconfig. You can define your credentials this way:</p><pre><code> make menuconfig
-&gt; Application Configuration
    -&gt; Network Utilities
        -&gt; Network initialization (NETUTILS_NETINIT [=y])
            -&gt; WAPI Configuration
</code></pre><p>Find your board IP using <code>nsh&gt; ifconfig</code> and then from your computer:</p><pre><code> telnet 192.168.x.y
</code></pre><p>Where x and y are the last two numbers of the IP that your router gave to your board.</p><h3 id="wifishare" tabindex="-1">wifishare <a class="header-anchor" href="#wifishare" aria-label="Permalink to &quot;wifishare&quot;">​</a></h3><p>The <code>wifishare</code> let your ESP32 board to work as Access Point (WiFi Router) and WiFi Station at same time. This way your board will connect to a real WiFi Router (from your ISP for example) and will offer WiFi connection to other devices and share WiFi connection with them.</p><p>After configuring the <code>esp32-devkit:wifishare</code> you need to define your credentials in the menuconfig. You can define your credentials this way:</p><pre><code> make menuconfig
-&gt; Application Configuration
    -&gt; Network Utilities
        -&gt; Network initialization (NETUTILS_NETINIT [=y])
            -&gt; WAPI Configuration
</code></pre><p>After compile and flash your board you need to confirm you have two interfaces:</p><pre><code>nsh&gt; ifconfig
wlan0   Link encap:Ethernet HWaddr bc:dd:c2:d4:a9:ec at RUNNING mtu 1504
        inet addr:192.168.0.7 DRaddr:192.168.0.1 Mask:255.255.255.0

wlan1   Link encap:Ethernet HWaddr bc:dd:c2:d4:a9:ed at DOWN mtu 1504
        inet addr:0.0.0.0 DRaddr:0.0.0.0 Mask:0.0.0.0
</code></pre><p>Now you need to configure your wlan1 to become a WiFi Access Point:</p><pre><code>nsh&gt; dhcpd_start wlan1
nsh&gt; wapi psk wlan1 mypasswd 3
nsh&gt; wapi essid wlan1 nuttxap 1
</code></pre><p>And you need to make the route to your WiFi Router (i.e. 192.168.0.1) the default route:</p><pre><code>nsh&gt; addroute default 192.168.0.1 wlan0
nsh&gt; route
SEQ   TARGET          NETMASK         ROUTER
   1. 0.0.0.0         0.0.0.0         192.168.0.1
</code></pre><p>Finally we will setup an iptables rule to NAT the wlan0 interface:</p><pre><code>nsh&gt; iptables -t nat -A POSTROUTING -o wlan0 -j MASQUERADE
</code></pre><p>After connectig a client (i.e. Linux computer) to the [nuttxap]{.title-ref} Access Point you can confirm it is working this way:</p><pre><code> ifconfig
lo: flags=73&lt;UP,LOOPBACK,RUNNING&gt;  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10&lt;host&gt;
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 5666  bytes 547514 (547.5 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 5666  bytes 547514 (547.5 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

wlp0s20f3: flags=4163&lt;UP,BROADCAST,RUNNING,MULTICAST&gt;  mtu 1500
        inet 10.0.0.4  netmask 255.255.255.0  broadcast 10.0.0.255
        inet6 xxxx::xxxx:xxx:xxxx:xx  prefixlen 64  scopeid 0x20&lt;link&gt;
        ether xx:xx:xx:xx:xx:xx  txqueuelen 1000  (Ethernet)
        RX packets 127217  bytes 146539379 (146.5 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 37079  bytes 23604536 (23.6 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

 ping 10.0.0.1
PING 10.0.0.1 (10.0.0.1) 56(84) bytes of data.
64 bytes from 10.0.0.1: icmp_seq=1 ttl=64 time=3.28 ms
64 bytes from 10.0.0.1: icmp_seq=2 ttl=64 time=9.72 ms
64 bytes from 10.0.0.1: icmp_seq=3 ttl=64 time=2.63 ms
64 bytes from 10.0.0.1: icmp_seq=4 ttl=64 time=18.9 ms
64 bytes from 10.0.0.1: icmp_seq=5 ttl=64 time=4.82 ms

 ping 8.8.8.8
PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=111 time=63.0 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=111 time=51.4 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=111 time=55.0 ms
64 bytes from 8.8.8.8: icmp_seq=4 ttl=111 time=64.3 ms
64 bytes from 8.8.8.8: icmp_seq=5 ttl=111 time=52.8 ms
</code></pre><p>That is it. You can use this 8.8.8.8 as DNS to resolve names.</p><h2 id="debugging-with-openocd" tabindex="-1">Debugging with OpenOCD <a class="header-anchor" href="#debugging-with-openocd" aria-label="Permalink to &quot;Debugging with OpenOCD&quot;">​</a></h2><h3 id="akizukidenshi-ft232hl" tabindex="-1">Akizukidenshi FT232HL <a class="header-anchor" href="#akizukidenshi-ft232hl" aria-label="Permalink to &quot;Akizukidenshi FT232HL&quot;">​</a></h3><p>Akizukidenshi&#39;s FT232HL, a FT232H based JTAG adapter (<a href="http://akizukidenshi.com/catalog/g/gK-06503/" target="_blank" rel="noreferrer">http://akizukidenshi.com/catalog/g/gK-06503/</a>) with JP3 and JP4 closed, and connected to ESP32 as:</p><p>+------------------+-------------+ | ESP32-DevKitC V4 | FT232HL | +=======+==========+=============+ | J2 | J3 | J2 | +-------+----------+-------------+ | IO13 | | AD0 (TCK) | +-------+----------+-------------+ | IO12 | | AD1 (TDI) | +-------+----------+-------------+ | | IO15 | AD2 (TDO) | +-------+----------+-------------+ | IO14 | | AD3 (TMS) | +-------+----------+-------------+ | GND | | GND | +-------+----------+-------------+</p><p>can be used with ESP-IDF version of openocd with:</p><pre><code>% openocd -f board/esp32-wrover-kit-1.8v.cfg
</code></pre>`,347)]))}const w=a(c,[["render",p]]);export{g as __pageData,w as default};
