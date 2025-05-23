import{_ as t,c as a,al as n,o}from"./chunks/framework.NFAqBSgQ.js";const s="/assets/esp-wrover-kit-v4.1-layout-back.mq6a854I.png",i="/assets/esp-wrover-kit-v4.1-layout-front.ChU2mR11.png",b=JSON.parse('{"title":"ESP-WROVER-KIT","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/xtensa/esp32/boards/esp32-wrover-kit/index.md","filePath":"en/platforms/xtensa/esp32/boards/esp32-wrover-kit/index.md"}'),r={name:"en/platforms/xtensa/esp32/boards/esp32-wrover-kit/index.md"};function d(l,e,h,c,p,u){return o(),a("div",null,e[0]||(e[0]=[n('<h1 id="esp-wrover-kit" tabindex="-1">ESP-WROVER-KIT <a class="header-anchor" href="#esp-wrover-kit" aria-label="Permalink to &quot;ESP-WROVER-KIT&quot;">​</a></h1><p>chip:esp32, chip:esp32wrover32</p><p>The <a href="https://docs.espressif.com/projects/esp-idf/en/latest/esp32/hw-reference/esp32/get-started-wrover-kit.html" target="_blank" rel="noreferrer">ESP-WROVER-KIT</a> is a development board for the ESP32 SoC from Espressif, based on a ESP32-WROVER-B module.</p><hr><p><img src="'+s+'" alt="ESP-WROVER-KIT board layout - front" class="align-center"> <img src="'+i+`" alt="ESP-WROVER-KIT board layout - back" class="align-center"></p><hr><h2 id="features" tabindex="-1">Features <a class="header-anchor" href="#features" aria-label="Permalink to &quot;Features&quot;">​</a></h2><blockquote><ul><li>ESP32-WROVER-B module</li><li>LCD screen</li><li>MicroSD card slot</li></ul></blockquote><p>Its another distinguishing feature is the embedded FTDI FT2232HL chip, an advanced multi-interface USB bridge. This chip enables to use JTAG for direct debugging of ESP32 through the USB interface without a separate JTAG debugger. ESP-WROVER-KIT makes development convenient, easy, and cost-effective.</p><p>Most of the ESP32 I/O pins are broken out to the board&#39;s pin headers for easy access.</p><h2 id="serial-console" tabindex="-1">Serial Console <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;Serial Console&quot;">​</a></h2><p>UART0 is, by default, the serial console. It connects to the on-board FT2232HL converter and is available on the USB connector USB CON8 (J5).</p><p>It will show up as /dev/ttyUSB[n] where [n] will probably be 1, since the first interface ([n] == 0) is dedicated to the USB-to-JTAG interface.</p><h2 id="buttons-and-leds" tabindex="-1">Buttons and LEDs <a class="header-anchor" href="#buttons-and-leds" aria-label="Permalink to &quot;Buttons and LEDs&quot;">​</a></h2><h3 id="board-buttons" tabindex="-1">Board Buttons <a class="header-anchor" href="#board-buttons" aria-label="Permalink to &quot;Board Buttons&quot;">​</a></h3><p>There are two buttons labeled Boot and EN. The EN button is not available to software. It pulls the chip enable line that doubles as a reset line.</p><p>The BOOT button is connected to IO0. On reset it is used as a strapping pin to determine whether the chip boots normally or into the serial bootloader. After reset, however, the BOOT button can be used for software input.</p><h3 id="board-leds" tabindex="-1">Board LEDs <a class="header-anchor" href="#board-leds" aria-label="Permalink to &quot;Board LEDs&quot;">​</a></h3><p>There are several on-board LEDs for that indicate the presence of power and USB activity.</p><p>There is an RGB LED available for software.</p><h2 id="pin-mapping" tabindex="-1">Pin Mapping <a class="header-anchor" href="#pin-mapping" aria-label="Permalink to &quot;Pin Mapping&quot;">​</a></h2><p>Pin Signal Notes</p><hr><p>0 2 4 5 18 19 21 22 23 25 RGB LED Red / BOOT Button RGB LED Green RGB LED Blue LCD Backlight LCD Reset LCD Clock LCD D/C LCD CS LCD MOSI LCD MISO</p><h2 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h2><p>All of the configurations presented below can be tested by running the following commands:</p><pre><code> ./tools/configure.sh esp32-wrover-kit:&lt;config_name&gt;
 make flash ESPTOOL_PORT=/dev/ttyUSB1 -j
</code></pre><p>Where &lt;config_name&gt; is the name of board configuration you want to use, i.e.: nsh, buttons, wifi... Then use a serial console terminal like <code>picocom</code> configured to 115200 8N1.</p><h3 id="autopm" tabindex="-1">autopm <a class="header-anchor" href="#autopm" aria-label="Permalink to &quot;autopm&quot;">​</a></h3><p>This configuration makes the device automatically enter the low power consumption mode when in the idle state, powering off the cpu and other peripherals.</p><p>In minimum power save mode, the station wakes up every DTIM to receive a beacon. The broadcast data will not be lost because it is transmitted after DTIM. However, it can not save much more power if DTIM is short as the DTIM is determined by the access point.</p><h3 id="bmp180" tabindex="-1">bmp180 <a class="header-anchor" href="#bmp180" aria-label="Permalink to &quot;bmp180&quot;">​</a></h3><p>This configuration enables the use of the BMP180 pressure sensor over I2C. You can check that the sensor is working by using the <code>bmp180</code> application:</p><pre><code>nsh&gt; bmp180
Pressure value = 91531
Pressure value = 91526
Pressure value = 91525
</code></pre><h3 id="buttons" tabindex="-1">buttons <a class="header-anchor" href="#buttons" aria-label="Permalink to &quot;buttons&quot;">​</a></h3><p>This configuration shows the use of the buttons subsystem. It can be used by executing the <code>buttons</code> application and pressing on any of the available board buttons:</p><pre><code>nsh&gt; buttons
buttons_main: Starting the button_daemon
buttons_main: button_daemon started
button_daemon: Running
button_daemon: Opening /dev/buttons
button_daemon: Supported BUTTONs 0x01
nsh&gt; Sample = 1
Sample = 0
</code></pre><h3 id="gpio" tabindex="-1">gpio <a class="header-anchor" href="#gpio" aria-label="Permalink to &quot;gpio&quot;">​</a></h3><p>This is a test for the GPIO driver. It includes the 3 LEDs and one, arbitrary, GPIO. For this example, GPIO22 was used (defined by the board implementation). At the nsh, we can turn LEDs on and off with the following:</p><pre><code>nsh&gt; gpio -o 1 /dev/gpio0
nsh&gt; gpio -o 0 /dev/gpio0
</code></pre><p>We can use the interrupt pin to send a signal when the interrupt fires:</p><pre><code>nsh&gt; gpio -w 14 /dev/gpio2
</code></pre><p>The pin is configured to as a rising edge interrupt, so after issuing the above command, connect it to 3.3V.</p><h3 id="lcd1602" tabindex="-1">lcd1602 <a class="header-anchor" href="#lcd1602" aria-label="Permalink to &quot;lcd1602&quot;">​</a></h3><p>This configuration is used to demonstrate the use of an LCD1602 display with the ESP32-WROVER-KIT. You can run an example by executing the following commands:</p><pre><code>nsh&gt; slcd
Opening /dev/slcd0 for read/write access
Attributes:
rows: 2 columns: 16 nbars: 0
max contrast: 0 max brightness: 1
Clear screen
WRITING:
0000: 1b5b46                                                            .[F
Set brightness to 1
Print [Hello]
WRITING:
0000: 1b5b471b5b30304c1b5b4548656c6c6f                                  .[G.[00L.[EHello
</code></pre><h3 id="leds" tabindex="-1">leds <a class="header-anchor" href="#leds" aria-label="Permalink to &quot;leds&quot;">​</a></h3><p>This configuration demonstrates the use of the on-board RGB LED with the [userleds]{.title-ref} subsystem. To check the included example, you can execute the following application:</p><pre><code>nsh&gt; leds
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
</code></pre><h3 id="lua" tabindex="-1">lua <a class="header-anchor" href="#lua" aria-label="Permalink to &quot;lua&quot;">​</a></h3><p>This configuration demonstrates the use of the of the Lua interpreter on NuttX. To execute it, just run the <code>lua</code> application.</p><h3 id="lvgl" tabindex="-1">lvgl <a class="header-anchor" href="#lvgl" aria-label="Permalink to &quot;lvgl&quot;">​</a></h3><p>This is a demonstration of the LVGL graphics library running on the NuttX LCD driver. You can find LVGL here:</p><pre><code>https://www.lvgl.io/
https://github.com/lvgl/lvgl
</code></pre><p>This configuration uses the LVGL demonstration at [apps/examples/lvgldemo]{.title-ref}.</p><h3 id="mmcsdspi" tabindex="-1">mmcsdspi <a class="header-anchor" href="#mmcsdspi" aria-label="Permalink to &quot;mmcsdspi&quot;">​</a></h3><p>This configuration is used to mount a FAT/FAT32 SD Card into the OS&#39; filesystem. To access the card&#39;s files, execute the following commands:</p><pre><code>nsh&gt; mount -t vfat /dev/mmcsd0 /mnt
nsh&gt; ls /mnt/
/mnt:
song_16_88200_2ch.wav
song_16_96000_2ch.wav
song_24_44100_2ch.wav
song_32_44100_2ch.wav
</code></pre><h3 id="nsh" tabindex="-1">nsh <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh&quot;">​</a></h3><p>Basic NuttShell configuration (console enabled in UART0, exposed via USB connection by means of FT2232HL converter, at 115200 bps).</p><h3 id="nx" tabindex="-1">nx <a class="header-anchor" href="#nx" aria-label="Permalink to &quot;nx&quot;">​</a></h3><p>This config adds a set of tests using the graphic examples at <code>apps/example/nx</code>.</p><p>This configuration illustrates the use of the LCD with the lower performance SPI interface.</p><h3 id="oneshot" tabindex="-1">oneshot <a class="header-anchor" href="#oneshot" aria-label="Permalink to &quot;oneshot&quot;">​</a></h3><p>This config demonstrate the use of oneshot timers present on the ESP32. To test it, just run the <code>oneshot</code> example:</p><pre><code>nsh&gt; oneshot
Opening /dev/oneshot
Maximum delay is 4294967295999999
Starting oneshot timer with delay 2000000 microseconds
Waiting...
Finished
</code></pre><h3 id="rtc" tabindex="-1">rtc <a class="header-anchor" href="#rtc" aria-label="Permalink to &quot;rtc&quot;">​</a></h3><p>This configuration demonstrates the use of the RTC driver through alarms. You can set an alarm, check its progress and receive a notification after it expires:</p><pre><code>nsh&gt; alarm 10
alarm_daemon started
alarm_daemon: Running
Opening /dev/rtc0
Alarm 0 set in 10 seconds
nsh&gt; alarm -r
Opening /dev/rtc0
Alarm 0 is active with 10 seconds to expiration
nsh&gt; alarm_daemon: alarm 0 received
</code></pre><h3 id="wifi" tabindex="-1">wifi <a class="header-anchor" href="#wifi" aria-label="Permalink to &quot;wifi&quot;">​</a></h3><p>Enables Wi-Fi support. You can define your credentials this way:</p><pre><code> make menuconfig
-&gt; Application Configuration
    -&gt; Network Utilities
        -&gt; Network initialization (NETUTILS_NETINIT [=y])
            -&gt; WAPI Configuration
</code></pre><p>Or if you don&#39;t want to keep it saved in the firmware you can do it at runtime:</p><pre><code>nsh&gt; wapi psk wlan0 mypasswd 3
nsh&gt; wapi essid wlan0 myssid 1
nsh&gt; renew wlan0
</code></pre><p>Tip</p><p>Please refer to <code>ESP32 Wi-Fi Station Mode &lt;esp32_wi-fi_sta&gt;</code>{.interpreted-text role=&quot;ref&quot;} for more information.</p>`,76)]))}const f=t(r,[["render",d]]);export{b as __pageData,f as default};
