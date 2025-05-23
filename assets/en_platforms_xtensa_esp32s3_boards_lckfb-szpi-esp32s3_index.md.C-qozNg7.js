import{_ as t,c as n,al as a,o}from"./chunks/framework.NFAqBSgQ.js";const s="/assets/lckfb-szpi-esp32s3-white.42qYgOr0.png",r="/assets/lckfb-szpi-esp32s3-lcd.ZwD8k7el.jpg",i="/assets/lckfb-szpi-esp32s3-lvgl.Dkj09S1u.jpg",m=JSON.parse('{"title":"LCKFB SZPI ESP32-S3","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/xtensa/esp32s3/boards/lckfb-szpi-esp32s3/index.md","filePath":"en/platforms/xtensa/esp32s3/boards/lckfb-szpi-esp32s3/index.md"}'),c={name:"en/platforms/xtensa/esp32s3/boards/lckfb-szpi-esp32s3/index.md"};function d(l,e,p,h,u,f){return o(),n("div",null,e[0]||(e[0]=[a('<h1 id="lckfb-szpi-esp32-s3" tabindex="-1">LCKFB SZPI ESP32-S3 <a class="header-anchor" href="#lckfb-szpi-esp32-s3" aria-label="Permalink to &quot;LCKFB SZPI ESP32-S3&quot;">​</a></h1><p>chip:esp32, chip:esp32s3</p><p>The <a href="https://wiki.lckfb.com/zh-hans/szpi-esp32s3/" target="_blank" rel="noreferrer">LCKFB SZPI ESP32-S3</a> is a development board for the ESP32-S3 SoC from Jialichuang, based on a ESP32-S3-WROOM-1 module.</p><hr><h2 id="" tabindex="-1"><img src="'+s+`" alt="" class="align-center"> <a class="header-anchor" href="#" aria-label="Permalink to &quot;![](lckfb-szpi-esp32s3-white.png){.align-center}&quot;">​</a></h2><h2 id="features" tabindex="-1">Features <a class="header-anchor" href="#features" aria-label="Permalink to &quot;Features&quot;">​</a></h2><p>The development board almost includes all the achievable functions of the ESP32-S3, maximizing the performance of the ESP32-S3. It features a color screen display (2 inches), complete audio input (2 microphones) and output (speaker) functions. Combined with its integrated motion sensors, as well as Wi-Fi and Bluetooth capabilities, it can be used to create more practical and interesting IoT applications. There are two expansion interfaces available for connecting additional external sensor modules and actuators. The development board is compact in size (69x41x14mm), and the shell is designed without screws, allowing for easy opening and installation by hand without the need for tools such as a screwdriver.</p><h2 id="serial-console" tabindex="-1">Serial Console <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;Serial Console&quot;">​</a></h2><p>UART0 is, by default, the serial console. It connects to the on-board CP2102 converter and is available on the USB connector USB CON8 (J1).</p><p>It will show up as /dev/ttyUSB[n] where [n] will probably be 0.</p><h2 id="buttons" tabindex="-1">Buttons <a class="header-anchor" href="#buttons" aria-label="Permalink to &quot;Buttons&quot;">​</a></h2><h3 id="board-buttons" tabindex="-1">Board Buttons <a class="header-anchor" href="#board-buttons" aria-label="Permalink to &quot;Board Buttons&quot;">​</a></h3><p>There are two buttons labeled Boot and EN. The EN button is not available to software. It pulls the chip enable line that doubles as a reset line.</p><p>The BOOT button is connected to IO0. On reset it is used as a strapping pin to determine whether the chip boots normally or into the serial bootloader. After reset, however, the BOOT button can be used for software input.</p><h2 id="i2s" tabindex="-1">I2S <a class="header-anchor" href="#i2s" aria-label="Permalink to &quot;I2S&quot;">​</a></h2><p>ESP32-S3 has two I2S peripherals accessible using either the generic I2S audio driver or a specific audio codec driver (<a href="https://www.cirrus.com/products/cs4344-45-48/" target="_blank" rel="noreferrer">CS4344</a> bindings are available at the moment). The generic I2S audio driver enables the use of both the receiver module (RX) and the transmitter module (TX) without using any specific codec. Also, it&#39;s possible to use the I2S character device driver to bypass the audio subsystem and write directly to the I2S peripheral.</p><p>The following configurations use the I2S peripheral::</p><p>: - <code>platforms/xtensa/esp32s3/boards/esp32s3-devkit/index:audio</code>{.interpreted-text role=&quot;ref&quot;} - <code>platforms/xtensa/esp32s3/boards/esp32s3-devkit/index:nxlooper</code>{.interpreted-text role=&quot;ref&quot;}</p><h2 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h2><p>All of the configurations presented below can be tested by running the following commands:</p><pre><code> ./tools/configure.sh lckfb-szpi-esp32s3:&lt;config_name&gt;
 make flash ESPTOOL_PORT=/dev/ttyUSB0 -j
</code></pre><p>Where &lt;config_name&gt; is the name of board configuration you want to use, i.e.: nsh, buttons, wifi... Then use a serial console terminal like <code>picocom</code> configured to 115200 8N1.</p><h3 id="nsh" tabindex="-1">nsh <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh&quot;">​</a></h3><p>Basic NuttShell configuration (console enabled in UART0, exposed via USB connection by means of CP2102 converter, at 115200 bps).</p><h3 id="usb-device" tabindex="-1">usb_device <a class="header-anchor" href="#usb-device" aria-label="Permalink to &quot;usb\\_device&quot;">​</a></h3><p>Basic NuttShell configuration console and USB CDCACM enabled.</p><p>You can run the configuration and compilation procedure:</p><pre><code> ./tools/configure.sh lckfb-szpi-esp32s3:usb_device
 make -j16
 make flash ESPTOOL_PORT=/dev/ttyUSBx
</code></pre><p>And then run the usbserial command at device side:</p><pre><code>nsh&gt; usbserial &amp;
</code></pre><p>Finally check dmesg and content at host side:</p><pre><code> sudo dmesg -c
[1768234.376415] usb 1-9.3.3: new full-speed USB device number 87 using xhci_hcd
[1768234.468015] usb 1-9.3.3: New USB device found, idVendor=0525, idProduct=a4a7, bcdDevice= 1.01
[1768234.468020] usb 1-9.3.3: New USB device strings: Mfr=1, Product=2, SerialNumber=3
[1768234.468021] usb 1-9.3.3: Product: CDC/ACM Serial
[1768234.468022] usb 1-9.3.3: Manufacturer: NuttX
[1768234.468023] usb 1-9.3.3: SerialNumber: 0
[1768234.478806] cdc_acm 1-9.3.3:1.0: ttyACM5: USB ACM device

 sudo minicom -D /dev/ttyACM5 -b 115200
</code></pre><h3 id="adb" tabindex="-1">adb <a class="header-anchor" href="#adb" aria-label="Permalink to &quot;adb&quot;">​</a></h3><p>Basic NuttShell configuration console enabled over USB Device (USB ADB).</p><p>You can run the configuration and compilation procedure:</p><pre><code> ./tools/configure.sh lckfb-szpi-esp32s3:adb
 make -j16
 make flash ESPTOOL_PORT=/dev/ttyUSBx
</code></pre><p>Then run the adb command:</p><pre><code> adb -s 1234 shell
nsh&gt; uname -a
NuttX 0.0.0  Mar 21 2025 14:25:36 xtensa lckfb-szpi-esp32s3
</code></pre><h3 id="txtable" tabindex="-1">txtable <a class="header-anchor" href="#txtable" aria-label="Permalink to &quot;txtable&quot;">​</a></h3><p>Basic TXTABLE(Text based Partition Table) configuration console enabled over USB ADB.</p><p>You can run the configuration and compilation procedure:</p><pre><code> ./tools/configure.sh -l lckfb-szpi-esp32s3:txtable
 make -j16
 make flash ESPTOOL_PORT=/dev/ttyUSBx
</code></pre><p>Then check the partition:</p><pre><code>nsh&gt; ls -l /dev/
/dev:
 dr--r--r--           0 adb0/
 crw-rw-rw-           0 console
 frw-rw-rw-     1044480 data
 frw-rw-rw-     1048576 esp32s3flash
 c-w--w--w-           0 log
 crw-rw-rw-           0 null
 crw-rw-rw-           0 ptmx
 dr--r--r--           0 pts/
 brw-rw-rw-        1024 ram0
 crw-rw-rw-           0 ttyS0
 frw-rw-rw-        4096 txtable
 crw-rw-rw-           0 zero
</code></pre><h3 id="fastboot" tabindex="-1">fastboot <a class="header-anchor" href="#fastboot" aria-label="Permalink to &quot;fastboot&quot;">​</a></h3><p>The basic Fastboot configuration is based on lckfb-szpi-esp32s3:usb_device. More details about usage of fastboot, please refer to <a href="https://nuttx.apache.org/docs/latest/applications/system/fastboot/index.html" target="_blank" rel="noreferrer">fastbootd --- NuttX latest documentation</a>.</p><p>You can run the configuration and compilation procedure:</p><pre><code> ./tools/configure.sh -l lckfb-szpi-esp32s3:fastboot
 make flash ESPTOOL_PORT=/dev/ttyUSBx -j
</code></pre><p>To test it, just run the following (<strong>Default is host side</strong>):</p><ol><li><p>Install fastboot tool:</p><pre><code>sudo apt install fastboot
</code></pre></li><li><p>List devices running fastboot:</p><pre><code>fastboot devices
</code></pre></li></ol><blockquote><p>Example:</p><pre><code> fastboot devices
1234    fastboot
</code></pre></blockquote><ol start="3"><li><p>Display given variable:</p><pre><code>fastboot getvar &lt;NAME&gt;
</code></pre></li></ol><blockquote><p>Example:</p><pre><code># Display the &quot;kernel&quot; variable::
 fastboot -s 1234 getvar kernel
Kernel: NuttX
Finished. Total time: 0.000s
</code></pre></blockquote><ol start="4"><li><p>Flash given partition:</p><pre><code>fastboot flash PARTITION FILENAME
</code></pre></li></ol><blockquote><p>Example (Flash test.img to partition ram10):</p><pre><code># 1. Generate a test image
 dd if=/dev/random of=test.img bs=1 count=128

# 2. Create a RAM disk (Device side)
nsh&gt; mkrd -m 10 -s 512 640
nsh&gt; ls -l /dev/ram10
 brw-rw-rw-      327680 /dev/ram10

# 3. Flash test.img to partition ram10
 fastboot flash ram10 ./test.img
Sending &#39;ram10&#39; (0 KB)                             OKAY [  0.001s]
Writing &#39;ram10&#39;                                    OKAY [  0.001s]
Finished. Total time: 0.003s

# 4. Hexdump the test.img and partition ram10, and compare

## Host side
 hexdump test.img
0000000 b1e8 b297 4ac5 9dfa d170 244e 4f83 0f93
0000010 1bf7 0b19 7bde 5543 0520 9719 746d 54fc
0000020 369d 72b3 f2e6 f463 c8e9 24c8 c876 e820
0000030 384d 07ab 52ca 2b24 dee7 0404 2663 91e4
0000040 6752 3611 aece b543 5194 2224 d1d5 8144
0000050 ff44 3bc9 5155 b393 1efb 9e88 2de9 3669
0000060 d010 2770 9192 2532 ccf5 591f 39ea 2431
0000070 2e3f feb0 87ef 9bdf 7dd4 2e79 64de edf6
0000080

## Device side
nsh&gt; hexdump /dev/ram10 count=128
/dev/ram10 at 00000000:
0000: e8 b1 97 b2 c5 4a fa 9d 70 d1 4e 24 83 4f 93 0f .....J..p.N.O..
0010: f7 1b 19 0b de 7b 43 55 20 05 19 97 6d 74 fc 54 .....{CU ...mt.T
0020: 9d 36 b3 72 e6 f2 63 f4 e9 c8 c8 24 76 c8 20 e8 .6.r..c....v. .
0030: 4d 38 ab 07 ca 52 24 2b e7 de 04 04 63 26 e4 91 M8...R+....c&amp;..
0040: 52 67 11 36 ce ae 43 b5 94 51 24 22 d5 d1 44 81 Rg.6..C..Q&quot;..D.
0050: 44 ff c9 3b 55 51 93 b3 fb 1e 88 9e e9 2d 69 36 D..;UQ.......-i6
0060: 10 d0 70 27 92 91 32 25 f5 cc 1f 59 ea 39 31 24 ..p&#39;..2%...Y.91
0070: 3f 2e b0 fe ef 87 df 9b d4 7d 79 2e de 64 f6 ed ?........}y..d..
</code></pre></blockquote><h3 id="pca9557" tabindex="-1">pca9557 <a class="header-anchor" href="#pca9557" aria-label="Permalink to &quot;pca9557&quot;">​</a></h3><p>Basic NuttShell configuration console and I/O expander driver PCA9557 enabled.</p><p>You can run the configuration and compilation procedure:</p><pre><code> ./tools/configure.sh lckfb-szpi-esp32s3:pca9557
 make flash -j(nproc) ESPTOOL_PORT=/dev/ttyUSB0
</code></pre><p>Then test gpio2(pin9(P2) of PCA9557):</p><pre><code># With hardware check, the pin levels meet the expected requirements.

# Output low
nsh&gt; echo 0 &gt; /dev/gpio2
nsh&gt; cat /dev/gpio2
0

# Output high
nsh&gt; echo 1 &gt; /dev/gpio2
nsh&gt; cat /dev/gpio2
1
</code></pre><h3 id="pwm" tabindex="-1">pwm <a class="header-anchor" href="#pwm" aria-label="Permalink to &quot;pwm&quot;">​</a></h3><p>Basic NuttShell configuration console and LEDC(PWM) enabled.</p><p>You can run the configuration and compilation procedure:</p><pre><code> ./tools/configure.sh lckfb-szpi-esp32s3:pwm
 make flash -j(nproc) ESPTOOL_PORT=/dev/ttyUSB0
</code></pre><p>Then test LEDC(PWM) with pin42(backlight of LCD):</p><pre><code># Backlight 0%
nsh&gt; pwm -d 100
pwm_main: starting output with frequency: 100 duty: 0000ffff
pwm_main: stopping output

# Backlight 10%
nsh&gt; pwm -d 90
pwm_main: starting output with frequency: 100 duty: 0000e666
pwm_main: stopping output

# Backlight 100%
nsh&gt; pwm -d 0
pwm_main: starting output with frequency: 100 duty: 00000000
pwm_main: stopping output
</code></pre><h3 id="psram" tabindex="-1">psram <a class="header-anchor" href="#psram" aria-label="Permalink to &quot;psram&quot;">​</a></h3><p>Basic NuttShell configuration console and PSRAM(Pseudo Static Random Access Memory) enabled.</p><p>You can run the configuration and compilation procedure:</p><pre><code> ./tools/configure.sh lckfb-szpi-esp32s3:psram
 make flash -j(nproc) ESPTOOL_PORT=/dev/ttyUSB0
</code></pre><p>Then comparing memory size with the basic &quot;nsh&quot; config:</p><pre><code># lckfb-szpi-esp32s3:nsh
nsh&gt; free
   total       used       free    maxused    maxfree  nused  nfree name
     332948     161500     171448     178280     171448     39      1 Umem

# lckfb-szpi-esp32s3:psram
nsh&gt; free
      total       used       free    maxused    maxfree  nused  nfree name
    8785268     161516    8623752     161888    8388592     41      2 Umem
</code></pre><h3 id="gpio" tabindex="-1">gpio <a class="header-anchor" href="#gpio" aria-label="Permalink to &quot;gpio&quot;">​</a></h3><p>Basic NuttShell configuration console and GPIO enabled.</p><p>Num Type Func / Location</p><hr><p>IO39 Output LCD SPI D/C IO10 Input GP1.25-5P expansion interface 1 (left side, near the speaker) IO11 Interrupt GP1.25-5P expansion interface 1 (left side, near the speaker)</p><p>You can run the configuration and compilation procedure:</p><pre><code> ./tools/configure.sh lckfb-szpi-esp32s3:gpio
 make flash -j(nproc) ESPTOOL_PORT=/dev/ttyUSB0
</code></pre><p>Then test gpio39(IO39):</p><pre><code># With hardware check, the pin levels meet the expected requirements.

# Output high
nsh&gt; echo 1 &gt; /dev/gpio39
nsh&gt; cat /dev/gpio39
1

# Output low
nsh&gt; echo 0 &gt; /dev/gpio39
nsh&gt; cat /dev/gpio39
0
</code></pre><h3 id="lcd" tabindex="-1">lcd <a class="header-anchor" href="#lcd" aria-label="Permalink to &quot;lcd&quot;">​</a></h3><p>Basic NuttShell configuration console and LCD enabled.</p><p><img src="`+r+`" alt="" class="align-center"></p><p>You can run the configuration and compilation procedure:</p><pre><code> ./tools/configure.sh lckfb-szpi-esp32s3:lcd
 make flash -j(nproc) ESPTOOL_PORT=/dev/ttyUSB0
</code></pre><p>Then run the fb command:</p><pre><code>nsh&gt; fb
VideoInfo:
      fmt: 11
     xres: 240
     yres: 320
  nplanes: 1
PlaneInfo (plane 0):
    fbmem: 0x3fc8e9f8
    fblen: 153600
   stride: 480
  display: 0
      bpp: 16
Mapped FB: 0x3fc8e9f8
 0: (  0,  0) (240,320)
 1: ( 21, 29) (198,262)
 2: ( 42, 58) (156,204)
 3: ( 63, 87) (114,146)
 4: ( 84,116) ( 72, 88)
 5: (105,145) ( 30, 30)
Test finished
nsh&gt;
</code></pre><h3 id="lvgl" tabindex="-1">lvgl <a class="header-anchor" href="#lvgl" aria-label="Permalink to &quot;lvgl&quot;">​</a></h3><p>Basic NuttShell configuration console and LVGL(Light and Versatile Graphics Library) enabled.</p><p><img src="`+i+`" alt="" class="align-center"></p><p>You can run the configuration and compilation procedure:</p><pre><code> ./tools/configure.sh -l lckfb-szpi-esp32s3:lvgl
 make flash -j(nproc) ESPTOOL_PORT=/dev/ttyUSB0
</code></pre><p>Then run the lvgldemo command:</p><pre><code>nsh&gt; lvgldemo
[LVGL] [User]   (6.560, +6560)   check_stack_size: tid: 2, Stack size : 16328 lv_nuttx_entry.c:297
[LVGL] [User]   (6.560, +0)      lv_nuttx_lcd_create: lcd /dev/lcd0 opening lv_nuttx_lcd.c:77
[LVGL] [User]   (6.560, +0)      lv_nuttx_lcd_create: lcd /dev/lcd0 open success lv_nuttx_lcd.c:84
[LVGL] [Warn]   (6.570, +10)     lv_demo_widgets: LV_FONT_MONTSERRAT_18 is not enabled for the widgets demo. Using LV_FONT_DEFAULT instead. lv_demo_widgets.c:156
[LVGL] [Warn]   (6.580, +10)     lv_demo_widgets: LV_FONT_MONTSERRAT_12 is not enabled for the widgets demo. Using LV_FONT_DEFAULT instead. lv_demo_widgets.c:161
</code></pre>`,96)]))}const g=t(c,[["render",d]]);export{m as __pageData,g as default};
