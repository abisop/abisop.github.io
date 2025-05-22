import{_ as t,c as a,al as n,o}from"./chunks/framework.NFAqBSgQ.js";const s="/assets/ESP32-C3-DevKitC-02-v1.1.DqUUwuPA.png",r="/assets/ESP32-C3-DevKitM-1-v1.0.DDeUOQlK.png",f=JSON.parse('{"title":"ESP32-C3 DevKit","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/risc-v/esp32c3-legacy/boards/esp32c3-devkit/index.md","filePath":"en/platforms/risc-v/esp32c3-legacy/boards/esp32c3-devkit/index.md"}'),i={name:"en/platforms/risc-v/esp32c3-legacy/boards/esp32c3-devkit/index.md"};function c(d,e,h,l,p,u){return o(),a("div",null,e[0]||(e[0]=[n('<h1 id="esp32-c3-devkit" tabindex="-1">ESP32-C3 DevKit <a class="header-anchor" href="#esp32-c3-devkit" aria-label="Permalink to &quot;ESP32-C3 DevKit&quot;">​</a></h1><p>The ESP32-C3 DevKit is an entry-level development board equipped with either an ESP32-C3-WROOM-02 or an ESP32-C3-MINI-1. ESP32-C3-WROOM-02 and ESP32-C3-MINI-1 are SoMs based on the RISC-V ESP32-C3 CPU.</p><p>Most of the I/O pins are broken out to the pin headers on both sides for easy interfacing. Developers can either connect peripherals with jumper wires or mount ESP32-C3 DevKit on a breadboard.</p><hr><p><img src="'+s+'" alt="ESP32-C3-DevKitC-02" class="align-center"> <img src="'+r+`" alt="ESP32-C3-DevKitM-1" class="align-center"></p><hr><h2 id="buttons-and-leds" tabindex="-1">Buttons and LEDs <a class="header-anchor" href="#buttons-and-leds" aria-label="Permalink to &quot;Buttons and LEDs&quot;">​</a></h2><h3 id="board-buttons" tabindex="-1">Board Buttons <a class="header-anchor" href="#board-buttons" aria-label="Permalink to &quot;Board Buttons&quot;">​</a></h3><p>There are two buttons labeled Boot and RST. The RST button is not available to software. It pulls the chip enable line that doubles as a reset line.</p><p>The BOOT button is connected to IO9. On reset it is used as a strapping pin to determine whether the chip boots normally or into the serial bootloader. After reset, however, the BOOT button can be used for software input.</p><h3 id="board-leds" tabindex="-1">Board LEDs <a class="header-anchor" href="#board-leds" aria-label="Permalink to &quot;Board LEDs&quot;">​</a></h3><p>There is one on-board LED that indicates the presence of power. Another WS2812 LED is connected to GPIO8 and is available for software.</p><h2 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h2><p>All of the configurations presented below can be tested by running the following commands:</p><pre><code> ./tools/configure.sh esp32c3-devkit:&lt;config_name&gt;
 make flash ESPTOOL_PORT=/dev/ttyUSB0 -j
</code></pre><p>Where &lt;config_name&gt; is the name of board configuration you want to use, i.e.: nsh, buttons, wifi... Then use a serial console terminal like <code>picocom</code> configured to 115200 8N1.</p><h3 id="adc" tabindex="-1">adc <a class="header-anchor" href="#adc" aria-label="Permalink to &quot;adc&quot;">​</a></h3><p>This configuration demonstrates the use of the internal Analog to Digital Converter (ADC). To check it, you can execute the <code>adc</code> application:</p><pre><code>nsh&gt; adc
adc_main: g_adcstate.count: 0
adc_main: Hardware initialized. Opening the ADC device: /dev/adc0
Sample:
1: channel: 0 value: 870
Sample:
1: channel: 0 value: 870
Sample:
1: channel: 0 value: 865
Sample:
1: channel: 0 value: 859
</code></pre><h3 id="autopm" tabindex="-1">autopm <a class="header-anchor" href="#autopm" aria-label="Permalink to &quot;autopm&quot;">​</a></h3><p>This configuration makes the device automatically enter the low power consumption mode when in the idle state, powering off the cpu and other peripherals.</p><p>In minimum power save mode, the station wakes up every DTIM to receive a beacon. The broadcast data will not be lost because it is transmitted after DTIM. However, it can not save much more power if DTIM is short as the DTIM is determined by the access point.</p><h3 id="ble" tabindex="-1">ble <a class="header-anchor" href="#ble" aria-label="Permalink to &quot;ble&quot;">​</a></h3><p>This configuration is used to enable the Bluetooth Low Energy (BLE) of ESP32-C3 chip.</p><p>To test it, just run the following commands below.</p><p>Confirm that bnep interface exist:</p><pre><code>nsh&gt; ifconfig
bnep0   Link encap:UNSPEC at DOWN
    inet addr:0.0.0.0 DRaddr:0.0.0.0 Mask:0.0.0.0
</code></pre><p>Get basic information from it:</p><pre><code>nsh&gt; bt bnep0 info
Device: bnep0
BDAddr: 86:f7:03:09:41:4d
Flags:  0000
Free:   20
  ACL:  20
  SCO:  0
Max:
  ACL:  24
  SCO:  0
MTU:
  ACL:  70
  SCO:  70
Policy: 0
Type:   0
</code></pre><p>Start the scanning process:</p><pre><code>nsh&gt; bt bnep0 scan start
</code></pre><p>Wait a little bit before stopping it.</p><p>Then after some minutes stop it:</p><pre><code>nsh&gt; bt bnep0 scan stop
</code></pre><p>Get the list of BLE devices found around you:</p><pre><code>nsh&gt; bt bnep0 scan get
Scan result:
1.     addr:           d7:c4:e6:xx:xx:xx type: 0
       rssi:            -62
       response type:   4
       advertiser data: 10 09 4d 69 20 XX XX XX XX XX XX XX XX XX XX 20                      e
2.     addr:           cb:23:18:xx:xx:xx type: 0
       rssi:            -60
       response type:   0
       advertiser data: 02 01 06 1b ff XX XX XX ff ff ff ff ff ff ff ff                      8
3.     addr:           cb:23:18:xx:xx:xx type: 0
       rssi:            -60
       response type:   4
       advertiser data: 10 09 4d 69 20 XX XX XX XX XX XX XX XX XX XX 20                      e
4.     addr:           d7:c4:e6:xx:xx:xx type: 0
       rssi:            -62
       response type:   0
       advertiser data: 02 01 06 1b ff XX XX XX ff ff ff ff ff ff ff ff                      e
5.     addr:           d7:c4:e6:xx:xx:xx type: 0
       rssi:            -62
       response type:   4
       advertiser data: 10 09 4d 69 20 XX XX XX XX XX XX XX XX XX XX 20                      e
nsh&gt;
</code></pre><h3 id="bmp180" tabindex="-1">bmp180 <a class="header-anchor" href="#bmp180" aria-label="Permalink to &quot;bmp180&quot;">​</a></h3><p>This configuration enables the use of the BMP180 pressure sensor over I2C. You can check that the sensor is working by using the <code>bmp180</code> application:</p><pre><code>nsh&gt; bmp180
Pressure value = 91531
Pressure value = 91526
Pressure value = 91525
</code></pre><h3 id="coremark" tabindex="-1">coremark <a class="header-anchor" href="#coremark" aria-label="Permalink to &quot;coremark&quot;">​</a></h3><p>This configuration sets the CoreMark benchmark up for running on the maximum number of cores for this system. It also enables some optimization flags and disables the NuttShell to get the best possible score.</p><p>Note</p><p>As the NSH is disabled, the application will start as soon as the system is turned on.</p><h3 id="crypto" tabindex="-1">crypto <a class="header-anchor" href="#crypto" aria-label="Permalink to &quot;crypto&quot;">​</a></h3><p>This configuration enables support for the cryptographic hardware and the <code>/dev/crypto</code> device file.</p><h3 id="cxx" tabindex="-1">cxx <a class="header-anchor" href="#cxx" aria-label="Permalink to &quot;cxx&quot;">​</a></h3><p>Development environment ready for C++ applications. You can check if the setup was successful by running <code>cxxtest</code>:</p><pre><code>nsh&gt; cxxtest
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
</code></pre><h3 id="efuse" tabindex="-1">efuse <a class="header-anchor" href="#efuse" aria-label="Permalink to &quot;efuse&quot;">​</a></h3><p>This configuration demonstrates the use of the eFuse driver. It can be accessed through the <code>/dev/efuse</code> device file.</p><h3 id="elf" tabindex="-1">elf <a class="header-anchor" href="#elf" aria-label="Permalink to &quot;elf&quot;">​</a></h3><p>This configuration uses <code>apps/examples/elf</code> in order to test the ELF loader. It can be tested by executing the <code>elf</code> application.</p><h4 id="gpio" tabindex="-1">gpio <a class="header-anchor" href="#gpio" aria-label="Permalink to &quot;gpio&quot;">​</a></h4><p>This is a test for the GPIO driver. It uses GPIO1 and GPIO2 as outputs and GPIO9 as an interrupt pin.</p><p>At the nsh, we can turn the outputs on and off with the following:</p><pre><code>nsh&gt; gpio -o 1 /dev/gpio0
nsh&gt; gpio -o 1 /dev/gpio1

nsh&gt; gpio -o 0 /dev/gpio0
nsh&gt; gpio -o 0 /dev/gpio1
</code></pre><p>We can use the interrupt pin to send a signal when the interrupt fires:</p><pre><code>nsh&gt; gpio -w 14 /dev/gpio2
</code></pre><p>The pin is configured as a rising edge interrupt, so after issuing the above command, connect it to 3.3V.</p><h3 id="knsh" tabindex="-1">knsh <a class="header-anchor" href="#knsh" aria-label="Permalink to &quot;knsh&quot;">​</a></h3><p>This is identical to the nsh configuration except that (1) NuttX is built as PROTECTED mode, monolithic module and the user applications are built separately and, as a consequence, (2) some features that are only available in the FLAT build are disabled.</p><p>Protected Mode support for ESP32-C3 relies on the RISC-V Physical Memory Protection (PMP) for implementing isolation between Kernel and Userspace. The Kernel configures the PMP to restrict the application access to selected peripherals and specific regions of on-chip memories (Internal ROM and Internal SRAM) and of the External Flash.</p><h3 id="lvgl" tabindex="-1">lvgl <a class="header-anchor" href="#lvgl" aria-label="Permalink to &quot;lvgl&quot;">​</a></h3><p>This is a demonstration of the LVGL graphics library running on the NuttX LCD driver. You can find LVGL here:</p><pre><code>https://www.lvgl.io/
https://github.com/lvgl/lvgl
</code></pre><p>This configuration uses the LVGL demonstration at [apps/examples/lvgldemo]{.title-ref}.</p><h3 id="mcuboot-slot-confirm" tabindex="-1">mcuboot_slot_confirm <a class="header-anchor" href="#mcuboot-slot-confirm" aria-label="Permalink to &quot;mcuboot\\_slot\\_confirm&quot;">​</a></h3><p>This configuration is used to represent an MCUboot update image that needs to be confirmed after flashing. The image can be confirmed by using the following command:</p><pre><code>nsh&gt; mcuboot_confirm
Application Image successfully confirmed!
</code></pre><p>For more information, check <a href="https://www.youtube.com/watch?v=Vzy0rl-ixbc" target="_blank" rel="noreferrer">this demo</a>.</p><h3 id="module" tabindex="-1">module <a class="header-anchor" href="#module" aria-label="Permalink to &quot;module&quot;">​</a></h3><p>This config is to run <code>apps/examples/module</code>.</p><h3 id="nsh" tabindex="-1">nsh <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh&quot;">​</a></h3><p>Basic configuration to run the NuttShell (nsh).</p><h3 id="nvcfgdata" tabindex="-1">nvcfgdata <a class="header-anchor" href="#nvcfgdata" aria-label="Permalink to &quot;nvcfgdata&quot;">​</a></h3><p>This configuration enables the MTD failsafe mode. You can test it by running the <code>mtdconfig_fs_test</code> application:</p><pre><code>nsh&gt; mtdconfig_fs_test
test_nvs_mount: test begin
test_nvs_mount: success
test_nvs_write: test begin
test_nvs_write: success
test_nvs_corrupt_expire: test begin
test_nvs_corrupt_expire: success
test_nvs_corrupted_write: test begin
test_nvs_corrupted_write: success
test_nvs_gc: test begin
test_nvs_gc: success
test_nvs_gc_3sectors: test begin
test_nvs_gc_3sectors: success
test_nvs_corrupted_sector_close: test begin
test_nvs_corrupted_sector_close: success
test_nvs_full_sector: test begin
test_nvs_full_sector: success
test_nvs_gc_corrupt_close_ate: test begin
test_nvs_gc_corrupt_close_ate: success
test_nvs_gc_corrupt_ate: test begin
test_nvs_gc_corrupt_ate: success
test_nvs_gc_touched_deleted_ate: test begin
test_nvs_gc_touched_deleted_ate: success
test_nvs_gc_touched_expired_ate: test begin
test_nvs_gc_touched_expired_ate: success
test_nvs_gc_not_touched_expired_ate: test begin
test_nvs_gc_not_touched_expired_ate: success

Final memory usage:
VARIABLE  BEFORE   AFTER    DELTA
======== ======== ======== ========
arena       5bf30    5bf30        0
ordblks         1        1        0
mxordblk    59100    59100        0
uordblks     2e30     2e30        0
fordblks    59100    59100        0
</code></pre><h3 id="oneshot" tabindex="-1">oneshot <a class="header-anchor" href="#oneshot" aria-label="Permalink to &quot;oneshot&quot;">​</a></h3><p>This config demonstrate the use of oneshot timers present on the ESP32. To test it, just run the <code>oneshot</code> example:</p><pre><code>nsh&gt; oneshot
Opening /dev/oneshot
Maximum delay is 4294967295999999
Starting oneshot timer with delay 2000000 microseconds
Waiting...
Finished
</code></pre><h3 id="ostest" tabindex="-1">ostest <a class="header-anchor" href="#ostest" aria-label="Permalink to &quot;ostest&quot;">​</a></h3><p>This is the NuttX test at <code>apps/testing/ostest</code> that is run against all new architecture ports to assure a correct implementation of the OS.</p><h3 id="pm" tabindex="-1">pm <a class="header-anchor" href="#pm" aria-label="Permalink to &quot;pm&quot;">​</a></h3><p>This configuration enables the CPU power management through governors.</p><h3 id="pwm" tabindex="-1">pwm <a class="header-anchor" href="#pwm" aria-label="Permalink to &quot;pwm&quot;">​</a></h3><p>This configuration demonstrates the use of PWM through a LED connected to GPIO2. To test it, just execute the <code>pwm</code> application:</p><pre><code>nsh&gt; pwm
pwm_main: starting output with frequency: 10000 duty: 00008000
pwm_main: stopping output
</code></pre><h3 id="random" tabindex="-1">random <a class="header-anchor" href="#random" aria-label="Permalink to &quot;random&quot;">​</a></h3><p>This configuration shows the use of the ESP32-C3&#39;s True Random Number Generator with entropy sourced from Wi-Fi and Bluetooth noise. To test it, just run <code>rand</code> to get 32 randomly generated bytes:</p><pre><code>nsh&gt; rand
Reading 8 random numbers
Random values (0x3ffe0b00):
0000  98 b9 66 a2 a2 c0 a2 ae 09 70 93 d1 b5 91 86 c8  ..f......p......
0010  8f 0e 0b 04 29 64 21 72 01 92 7c a2 27 60 6f 90  ....)d!r..|.&#39;\`o.
</code></pre><h3 id="romfs" tabindex="-1">romfs <a class="header-anchor" href="#romfs" aria-label="Permalink to &quot;romfs&quot;">​</a></h3><p>This configuration enables the ROMFS file system. You can test it by running the <code>romfs</code> example:</p><pre><code>nsh&gt; romfs
Mounting ROMFS filesystem at target=/usr/local/share with source=/dev/ram1
Traversing directory: /usr/local/share
  DIRECTORY: /usr/local/share/adir/
Traversing directory: /usr/local/share/adir
  FILE: /usr/local/share/adir/anotherfile.txt/
  DIRECTORY: /usr/local/share/adir/subdir/
Traversing directory: /usr/local/share/adir/subdir
  FILE: /usr/local/share/adir/subdir/subdirfile.txt/
Continuing directory: /usr/local/share/adir
  FILE: /usr/local/share/adir/yafile.txt/
Continuing directory: /usr/local/share
  FILE: /usr/local/share/afile.txt/
  FILE: /usr/local/share/hfile/
PASSED
</code></pre><h3 id="rtc" tabindex="-1">rtc <a class="header-anchor" href="#rtc" aria-label="Permalink to &quot;rtc&quot;">​</a></h3><p>This configuration demonstrates the use of the RTC driver through alarms. You can set an alarm, check its progress and receive a notification after it expires:</p><pre><code>nsh&gt; alarm 10
alarm_daemon started
alarm_daemon: Running
Opening /dev/rtc0
Alarm 0 set in 10 seconds
nsh&gt; alarm -r
Opening /dev/rtc0
Alarm 0 is active with 10 seconds to expiration
nsh&gt; alarm_daemon: alarm 0 received
</code></pre><h3 id="sotest" tabindex="-1">sotest <a class="header-anchor" href="#sotest" aria-label="Permalink to &quot;sotest&quot;">​</a></h3><p>This config is to run apps/examples/sotest.</p><h3 id="spiflash" tabindex="-1">spiflash <a class="header-anchor" href="#spiflash" aria-label="Permalink to &quot;spiflash&quot;">​</a></h3><p>This config tests the external SPI that comes with the ESP32-C3 module connected through SPI1.</p><p>By default a SmartFS file system is selected. Once booted you can use the following commands to mount the file system:</p><pre><code>nsh&gt; mksmartfs /dev/smart0
nsh&gt; mount -t smartfs /dev/smart0 /mnt
</code></pre><p>Note that mksmartfs is only needed the first time.</p><h3 id="sta-softap" tabindex="-1">sta_softap <a class="header-anchor" href="#sta-softap" aria-label="Permalink to &quot;sta\\_softap&quot;">​</a></h3><p>With this configuration you can run these commands to be able to connect your smartphone or laptop to your board:</p><pre><code>nsh&gt; ifup wlan1
nsh&gt; dhcpd_start wlan1
nsh&gt; wapi psk wlan1 mypasswd 3
nsh&gt; wapi essid wlan1 nuttxap 1
</code></pre><p>In this case, you are creating the access point <code>nuttxapp</code> in your board and to connect to it on your smartphone you will be required to type the password <code>mypasswd</code> using WPA2. The <code>dhcpd_start</code> is necessary to let your board to associate an IP to your smartphone.</p><h3 id="tickless" tabindex="-1">tickless <a class="header-anchor" href="#tickless" aria-label="Permalink to &quot;tickless&quot;">​</a></h3><p>This configuration enables the support for tickless scheduler mode.</p><h3 id="timer" tabindex="-1">timer <a class="header-anchor" href="#timer" aria-label="Permalink to &quot;timer&quot;">​</a></h3><p>This config test the general use purpose timers. It includes the 4 timers, adds driver support, registers the timers as devices and includes the timer example.</p><p>To test it, just run the following:</p><pre><code>nsh&gt; timer -d /dev/timerx
</code></pre><p>Where x in the timer instance.</p><h3 id="twai" tabindex="-1">twai <a class="header-anchor" href="#twai" aria-label="Permalink to &quot;twai&quot;">​</a></h3><p>This configuration enables the support for the TWAI (Two-Wire Automotive Interface) driver. You can test it by running the <code>can</code> example:</p><pre><code>nsh&gt; can
nmsgs: 0
min ID: 1 max ID: 2047
Bit timing:
  Baud: 1000000
  TSEG1: 15
  TSEG2: 4
    SJW: 3
  ID:    1 DLC: 1
</code></pre><h3 id="uid" tabindex="-1">uid <a class="header-anchor" href="#uid" aria-label="Permalink to &quot;uid&quot;">​</a></h3><p>Enables support for the [BOARDIOC_UNIQUEID boardctl()]{.title-ref} command.</p><h3 id="usbconsole" tabindex="-1">usbconsole <a class="header-anchor" href="#usbconsole" aria-label="Permalink to &quot;usbconsole&quot;">​</a></h3><p>This configuration tests the built-in USB-to-serial converter found in ESP32-C3 (revision 3). <code>esptool</code> can be used to check the version of the chip and if this feature is supported. Running <code>esptool.py -p &lt;port&gt; chip_id</code> should have <code>Chip is ESP32-C3 (revision 3)</code> in its output. When connecting the board a new device should appear, a <code>/dev/ttyACMX</code> on Linux or a <code>/dev/cu.usbmodemXXX</code> om macOS. This can be used to flash and monitor the device with the usual commands:</p><pre><code>make download ESPTOOL_PORT=/dev/ttyACM0
minicom -D /dev/ttyACM0
</code></pre><h3 id="watchdog" tabindex="-1">watchdog <a class="header-anchor" href="#watchdog" aria-label="Permalink to &quot;watchdog&quot;">​</a></h3><p>This configuration tests the watchdog timers. It includes the 2 MWDTS, adds driver support, registers the WDTs as devices and includes the watchdog example application.</p><p>To test it, just run the following command:</p><pre><code>nsh&gt; wdog -i /dev/watchdogX
</code></pre><p>Where X is the watchdog instance.</p><h3 id="watcher" tabindex="-1">watcher <a class="header-anchor" href="#watcher" aria-label="Permalink to &quot;watcher&quot;">​</a></h3><p>This configuration tests the watchdog timers in the capture mode. It includes the 2 MWDTS, adds driver support, registers the WDTs as devices and includes the watcher and watched example applications.</p><p>To test it, just run the following command:</p><pre><code>nsh&gt; watcher
nsh&gt; watched
</code></pre><h3 id="wifi" tabindex="-1">wifi <a class="header-anchor" href="#wifi" aria-label="Permalink to &quot;wifi&quot;">​</a></h3><p>Enables Wi-Fi support. You can define your credentials this way:</p><pre><code> make menuconfig
-&gt; Application Configuration
    -&gt; Network Utilities
        -&gt; Network initialization (NETUTILS_NETINIT [=y])
            -&gt; WAPI Configuration
</code></pre><p>Or if you don&#39;t want to keep it saved in the firmware you can do it at runtime:</p><pre><code>nsh&gt; wapi psk wlan0 mypasswd 3
nsh&gt; wapi essid wlan0 myssid 1
nsh&gt; renew wlan0
</code></pre><h2 id="romfs-txt" tabindex="-1">ROMFS.txt <a class="header-anchor" href="#romfs-txt" aria-label="Permalink to &quot;ROMFS.txt&quot;">​</a></h2>`,137)]))}const g=t(i,[["render",c]]);export{f as __pageData,g as default};
